# Architecture

Status: Canonical v0.2  
Last updated: 2026-08-24

## 1. Architectural goals

- run locally at zero monetary cost;
- provide a complete deterministic path without Gemini;
- keep Java/Spring domain behaviour visible and explainable;
- preserve answers across external-provider failures;
- isolate provider-specific code;
- make privacy and 24-hour expiry structural;
- avoid infrastructure unrelated to a one-developer portfolio project.

## 2. System context

```text
Desktop Chrome
├── Next.js UI
├── SpeechRecognition / webkitSpeechRecognition
├── speechSynthesis
├── text fallback
└── HTTPS/JSON
        |
        v
Spring Boot modular monolith
├── anonymous access and authorisation
├── interview session aggregate
├── turn orchestration
├── report orchestration
├── retention cleanup
├── fake provider adapters (default)
└── Gemini text adapter (opt-in)
        |
        +---- PostgreSQL
        |
        +---- Gemini text API (only in gemini profile)
```

There is no backend audio path, WebRTC connection, WebSocket, audio object store, or realtime voice-provider credential.

Chrome/browser infrastructure may process microphone audio for speech recognition. The application receives only text selected as final by the client and does not claim that browser speech processing is local or private.

## 3. Technology baseline

| Area | Decision |
|---|---|
| Repository | Monorepo |
| Backend | Java 25, Spring Boot, Gradle Wrapper |
| HTTP | Spring MVC with virtual threads enabled |
| Persistence | Spring Data JPA, PostgreSQL |
| Migrations | Flyway |
| API errors | Spring `ProblemDetail` |
| Contract | Backend OpenAPI |
| Frontend | Pinned stable Next.js, TypeScript, App Router |
| Browser voice | Chrome Speech Recognition and Speech Synthesis APIs |
| Provider HTTP | Imperative client or provider SDK inside adapter; bounded timeouts |
| Tests | JUnit 5, AssertJ, Testcontainers, frontend unit tests, browser E2E later |
| Local orchestration | Docker Compose |

Exact versions are recorded by build files at scaffold time. Java 25 is not silently downgraded.

## 4. Monorepo layout

```text
global-ready/
├── backend/
│   ├── gradle/
│   ├── gradlew
│   ├── build.gradle
│   └── src/
├── frontend/
│   ├── package.json
│   ├── package-lock.json
│   └── src/
├── docs/
│   └── adr/
├── compose.yaml
├── .env.example
└── README.md
```

No Nx or Turborepo is required. Each app owns its build and can deploy independently.

## 5. Backend boundaries

Use package-by-feature under `com.globalready`:

```text
com.globalready
├── access
│   ├── api
│   ├── application
│   └── infrastructure
├── interview
│   ├── api
│   ├── application
│   ├── domain
│   └── infrastructure
├── report
│   ├── application
│   ├── domain
│   └── infrastructure
├── provider
│   ├── fake
│   └── gemini
├── retention
└── shared
    ├── api
    ├── clock
    └── observability
```

Rules:

- controllers call application use cases, never repositories directly;
- the interview domain owns the aggregate and state transitions;
- JPA mappings and provider SDK types do not cross public API boundaries;
- `shared` contains only cross-cutting primitives, not miscellaneous business logic;
- no empty architectural layer is created solely to satisfy a diagram;
- asynchronous infrastructure is not introduced for MVP.

## 6. Domain shape

`InterviewSession` is the aggregate root:

```text
InterviewSession
├── CandidateContext (owned immutable-after-READY value object)
├── InterviewTurn[0..6]
└── InterviewReport[0..1]
```

An `AnonymousAccessGrant` is security infrastructure, not a reusable candidate identity or domain profile. It is unbound when issued and binds to exactly one session on idempotent session creation.

The persisted transcript is derived from ordered answered turns. A separate transcript-segment entity is intentionally omitted because interim browser text and transcript correction are out of scope.

## 7. Provider ports and profiles

Only two domain-oriented ports exist:

```java
interface InterviewResponseGateway {
    InterviewerPrompt generateNextPrompt(InterviewPromptContext context);
}

interface ReportGenerationGateway {
    GeneratedReport generateReport(ReportPromptContext context);
}
```

The signatures above are conceptual; exact Java records are human-first M3/M5 work.

Implementations:

- `fake` profile, enabled by default: deterministic responses suitable for clean clone, CI, and E2E;
- `gemini` profile, explicitly enabled: one adapter implementing both ports and reading its API key only from environment configuration.

Provider input builders:

- delimit CV, JD, and answers as untrusted data;
- enforce input-size bounds;
- include only required ordered turns;
- carry a prompt version;
- require structured evidence references for reports.

## 8. Critical sequences and transaction boundaries

### 8.1 Anonymous access and draft session

1. Browser requests an anonymous access grant.
2. Backend generates a cryptographically secure token, stores only its hash, and returns raw token once.
3. Browser keeps the token in `sessionStorage`, not a URL.
4. Browser creates a draft session with its access token and a session-creation idempotency key.
5. Backend binds the grant to the new session in one local transaction.

### 8.2 Prepare and start

1. Backend validates editable context in `DRAFT`.
2. One transaction freezes context and moves the session to `READY`.
3. Start request records an operation-specific key.
4. Backend moves to `ACTIVE` in a short transaction.
5. Backend calls `InterviewResponseGateway` outside the transaction for the first prompt.
6. A second short transaction stores turn 1.
7. If generation fails, the session remains `ACTIVE` and the same start operation can resume without a duplicate first turn.

### 8.3 Submit final answer and obtain next prompt

```text
Request: final text + input source + answer idempotency key
        |
        v
TX 1: authorise, validate, save answer, mark next-prompt PENDING, commit
        |
        v
External call: InterviewResponseGateway (no DB transaction)
        |
        +-- success --> TX 2: create exactly one next turn, mark COMPLETE
        |
        +-- failure --> TX 2: mark FAILED; answer remains saved
```

If the answer is the sixth, TX 1 ends the session and no provider call occurs. A retry of a failed provider stage reuses the saved answer and must not insert a duplicate turn. If the candidate ends or the session expires while the provider call is in flight, TX 2 discards the returned output, marks generation `CANCELLED` when the row remains accessible, and never reopens the session.

### 8.4 End and report

1. End command moves `ACTIVE` to `ENDED` or `ABANDONED` using answered-turn count.
2. Report request checks `ENDED`, evidence threshold, token ownership, expiry, and idempotency.
3. TX 1 creates/updates the report as `PENDING` and commits.
4. Backend calls `ReportGenerationGateway` outside a transaction.
5. Output is schema-validated, including evidence IDs.
6. TX 2 stores `COMPLETE` output or `FAILED` metadata.
7. Session remains `ENDED` in both cases.

## 9. Concurrency and consistency

- Use optimistic versioning on `InterviewSession` and `InterviewReport`.
- Protect sequence uniqueness with a database constraint on `(session_id, sequence_number)`.
- Protect one report with a unique `session_id`.
- Store operation-specific idempotency-key hashes and request fingerprints on the affected resource.
- Same key and same fingerprint returns or resumes the existing operation.
- Same key and different fingerprint returns `409`.
- A different key for an already completed single-use operation returns `409`.
- Use virtual threads for blocking request work; they improve concurrency while waiting but do not reduce provider latency.
- Never use `parallelStream()` in request/provider paths.

## 10. Expiry and deletion

`InterviewSession.expiresAt` is the only content-retention clock and equals `createdAt + 24h`.

Every repository query or application authorisation check must include logical expiry. The effective state becomes `EXPIRED` when `Clock.instant() >= expiresAt`, even before cleanup changes or deletes a row.

Cleanup:

1. runs once after application startup and on a schedule;
2. selects expired session IDs in bounded batches;
3. deletes aggregates and bound access grants by cascade/explicit batch;
4. is idempotent;
5. records counts and duration without content.

When the application is stopped, physical deletion cannot execute. This limitation is documented; no strict wall-clock purge claim is made.

## 11. Security boundaries

- bearer access token is accepted only in the `Authorization` header;
- token hashes are compared server-side and access-grant/session binding is verified;
- token, raw request content, provider prompts, and provider responses are excluded from logs;
- Gemini key and database password are environment-only;
- expired or foreign resources return a non-enumerating not-found/denied response;
- CORS is restricted to configured frontend origins;
- input sizes and provider output schemas are validated;
- browser data storage contains access metadata only, not CV/JD/transcript/report content;
- public deployment requires rate limiting, but local mode does not add Redis or distributed limits.

## 12. Observability

Minimum structured fields:

- correlation ID;
- pseudonymous session/turn/report ID;
- operation and state transition;
- duration;
- provider/profile/model identifier;
- outcome, retryability, and error category;
- request/response character count, never text;
- cleanup selected/deleted counts.

## 13. Testing strategy

| Level | Coverage |
|---|---|
| Unit | state transitions, context freeze, six-turn cap, evidence and expiry rules |
| Persistence integration | Flyway, constraints, cascades, optimistic locking, expired-query filtering |
| Application component | orchestration with fake gateways, two-transaction recovery, idempotent resume |
| API integration | bearer ownership, ProblemDetail errors, validation, OpenAPI |
| Frontend unit | interview reducer and browser-capability fallbacks |
| E2E | fake-provider setup → text turns → end → report → delete |
| Manual evaluation | Chrome STT vocabulary/accent behaviour and Gemini grounding/JSON reliability |

Normal CI uses fake gateways and synthetic data. Manual real-provider fixtures must not contain a real CV or confidential interview transcript.

## 14. Deployment direction

Required: local PostgreSQL plus independently runnable backend and frontend; Compose provides the reproducible integration path.

Optional: a free public demo using only synthetic/anonymised data. Current free-tier quotas, model availability, hosting sleep behaviour, and data terms must be checked at implementation/deployment time.

## 15. ADR index

- `ADR-0001`: modular monolith and monorepo;
- `ADR-0002`: browser speech plus text-provider topology;
- `ADR-0003`: session aggregate and 24-hour retention;
- `ADR-0004`: external provider calls outside database transactions.
