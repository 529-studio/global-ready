# Assumptions and Decisions

Status: Canonical v0.2  
Last updated: 2026-08-24

This file has highest authority when planning documents disagree.

## 1. Approved decisions

| ID | Decision | Rationale |
|---|---|---|
| D-001 | Product name is **Global-Ready**. | Existing project identity. |
| D-002 | Treat the MVP as a zero-cost Java/Spring portfolio project, not a commercial launch. | Current budget and learning goal. |
| D-003 | Use one monorepo with independently buildable `backend/` and `frontend/`. | Solo cross-stack development without deployment coupling. |
| D-004 | Backend uses Java 25, Spring Boot, Spring MVC, virtual threads, JPA, Flyway, and PostgreSQL. | Modern imperative Spring learning path. |
| D-005 | Frontend uses a pinned stable Next.js release, TypeScript, and App Router. | Suitable browser support and existing familiarity. |
| D-006 | Use a modular monolith; do not introduce microservices or application-wide WebFlux. | No scale or team boundary justifies the complexity. |
| D-007 | Desktop Chrome is the supported MVP browser. | Keeps voice compatibility scope narrow. |
| D-008 | No user account, cross-session history, or reusable candidate profile. | Data is short-lived and the owner is the primary user. |
| D-009 | `InterviewSession` is the domain aggregate root. `CandidateContext` is a value object owned by it. | Simplifies lifecycle, ownership, and deletion. |
| D-010 | Mode is fixed to `PROJECT_DEEP_DIVE`; there is no mode, difficulty, or duration selector. | Keeps the portfolio loop focused. |
| D-011 | A session has at most six turns; a follow-up counts as a turn and the candidate may end early. | Deterministic acceptance tests and controlled provider use. |
| D-012 | A report requires at least two answered turns. Ending earlier produces `ABANDONED`. | Avoids confident feedback without evidence. |
| D-013 | Session state and report state are independent. | Provider/report failure must not corrupt the interview lifecycle. |
| D-014 | Session states are `DRAFT`, `READY`, `ACTIVE`, `ENDED`, `ABANDONED`, and effective `EXPIRED`. | Small, explicit lifecycle without a catch-all session `FAILED`. |
| D-015 | Report states are `NOT_STARTED`, `PENDING`, `COMPLETE`, and `FAILED`. | Report work can fail or retry after a valid ended session. |
| D-016 | Candidate context becomes immutable at the transition to `READY`. | Removes ambiguity about which context grounded the interview. |
| D-017 | Chrome speech recognition handles STT; browser speech synthesis handles TTS; text fallback is mandatory. | No app-level voice API cost or backend audio pipeline. |
| D-018 | The application never persists raw audio. | Lowest storage cost and privacy surface. |
| D-019 | Browser/vendor processing of speech is disclosed before microphone use. | “Not stored by this app” does not mean “never externally processed.” |
| D-020 | Only final candidate text is persisted; interim recognition text stays in browser memory. | Avoids noisy duplicate transcript data. |
| D-021 | Provider ports are `InterviewResponseGateway` and `ReportGenerationGateway`. | STT/TTS are browser capabilities, so voice/transcript server ports are unnecessary. |
| D-022 | The default application profile uses deterministic fake gateways. Gemini is an explicit opt-in adapter configured only by environment variables. | Clean clone and CI must work without money or a secret. |
| D-023 | Provider calls occur outside database transactions. Candidate answers and report intent are committed before external calls. | Preserves user work and avoids holding connections/locks during network I/O. |
| D-024 | Idempotency keys are operation-specific. Session creation, start, answer submission, and report generation never share a key. | Prevents duplicate resources without conflating independent operations. |
| D-025 | Anonymous access tokens are high entropy, stored only as a hash server-side, omitted from URLs/logs, and bind to one session. An unbound grant expires after 15 minutes; after binding, access expires with the session. | Minimal ownership boundary without accounts or abandoned unbound grants. |
| D-026 | `InterviewSession.expiresAt` is fixed at creation time as `createdAt + 24h`. Every read/write treats expired data as inaccessible immediately. | One deterministic TTL for CV/JD, turns, and report. |
| D-027 | Physical cascade deletion is scheduled and runs at startup, but is best-effort while the service is offline. | A zero-cost sleeping/offline service cannot guarantee wall-clock deletion execution. |
| D-028 | Feedback explanation is Vietnamese; interview prompts, candidate answers, and improved outlines are English. | Matches the owner’s learning workflow. |
| D-029 | Reports contain strengths, one to three priorities, evidence turn IDs, and improved outlines; no numeric score or full sample answer. | Actionable and grounded without false precision. |
| D-030 | Real-provider tests are a small manual evaluation corpus; normal CI uses fake/fixture-based tests. | Live model output is nondeterministic and quota-dependent. |
| D-031 | Local Docker is the required deployment target. Public hosting and public rate limiting are optional hardening. | Guarantees zero-cost completion. |

## 2. Implementation constraints

- Pin exact runtime and dependency versions when scaffolding; do not use unbounded `latest` application dependencies.
- Do not expose Gemini or database credentials to the browser.
- Do not place anonymous access tokens in query parameters, URLs, or logs.
- Do not store raw CV, JD, transcript, report, prompt, or provider payloads in normal logs.
- Treat CV, JD, transcript, and provider output as untrusted data.
- Do not hold a JPA transaction open across Gemini calls.
- Do not use `parallelStream()` for HTTP/provider work.
- Do not add Kafka, Redis, a queue, WebFlux, R2DBC, Kubernetes, or another backend service without an approved ADR and mapped requirement.
- Do not silently fall back from Java 25. If the selected Spring Boot line does not support it, stop and record the compatibility decision.

## 3. AI-assisted development policy

### HUMAN-FIRST

- aggregate and state-transition code;
- validation and use-case orchestration;
- transaction-boundary decisions;
- provider interfaces;
- idempotency and expiry rules;
- JUnit tests for core behaviour.

### AI-REVIEW

- edge cases, code review, and explanations;
- modern Java alternatives after an owner attempt;
- missing tests and concurrency review;
- security/dependency review.

### AI-IMPLEMENT

- repository scaffolding;
- Docker, CI, OpenAPI wiring, and formatting configuration;
- test fixtures and fake adapters after interfaces are human-approved;
- repetitive frontend wiring after behaviour is specified;
- documentation maintenance.

Code that is likely to become a Java/Spring interview question should be understood and, where practical, attempted by the owner before accepting generated implementation.

## 4. Resolved assumptions

The former alpha size, access gate, provider topology, audio-retention, transcript-retention, mode selection, and history assumptions are closed by D-002, D-007 through D-031. There are no unresolved product or architecture decisions blocking M1 or M2.
