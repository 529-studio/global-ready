# Milestone Plan

Status: Canonical v0.2  
Last updated: 2026-08-24

No calendar estimate is attached. Finish and review one checkpoint before opening the next.

## M0 — Specification closure

**Objective:** establish one contradiction-free implementation contract.

**Outcome:** canonical v0.2 docs, ADRs, traceability, and readiness checklist.

**Requirements:** all requirements at planning level.

**Tasks**

- Apply approved scope and architecture decisions.
- Remove WebRTC/audio storage/account/history/scoring assumptions.
- Define state, TTL, API ownership, idempotency, and provider transaction boundaries.
- Record deferred work and implementation-time checks.

**Definition of done**

- all MUST requirements map to M1–M7;
- no unresolved P0 question;
- no stale v0.1 requirement appears in canonical docs;
- readiness document states `SPEC READY FOR IMPLEMENTATION`.

**Classification:** `AI-IMPLEMENT` docs, owner approval.

## M1 — Reproducible monorepo scaffold

**Objective:** create a clean-clone development skeleton without implementing domain behaviour.

**Demo:** PostgreSQL starts; backend health and OpenAPI endpoints respond; frontend renders a Global-Ready scaffold page; backend/frontend tests and builds pass independently.

**Requirements:** NFR-021, NFR-040, NFR-041, NFR-043, NFR-044.

**Backend**

- Java 25 Spring Boot Gradle project.
- Spring MVC, validation, actuator, JPA, Flyway, PostgreSQL, test dependencies.
- Virtual threads configured.
- `local` configuration with environment overrides.
- Health endpoint through Actuator.
- One context-load test and one Testcontainers database/migration integration test.
- No empty domain entities or premature repositories.

**Frontend**

- Stable pinned Next.js App Router + TypeScript project.
- Minimal landing page describing zero-cost local mode.
- Lint, route-type generation, type-check, and production-build scripts.
- Environment placeholder for backend base URL.

**Repository/infrastructure**

- Compose PostgreSQL plus optional app services/profile.
- `.env.example`, `.gitignore`, root README, and common commands.
- CI workflow for independent backend/frontend checks if the repository is connected to GitHub.

**Privacy/observability**

- correlation-ID and safe structured logging baseline;
- no request-body logging;
- secret placeholders only.

**Tests**

- Gradle wrapper test/package;
- Flyway applies to a disposable PostgreSQL container;
- frontend lint/type/build;
- Compose configuration validates.

**Non-goals:** session tables, access token logic, provider adapters, voice UI.

**Definition of done:** clean documented commands pass without Gemini key.

**Classification:** `AI-IMPLEMENT`; owner reviews every dependency and command.

## M2 — Anonymous draft session and domain rules

**Objective:** implement the first meaningful Spring slice without any AI provider.

**Demo:** issue access, create/edit a draft session, prepare it, observe frozen context, reject foreign/expired access, and delete it.

**Requirements:** FR-001–FR-016, FR-020–FR-025, FR-004, FR-006–FR-007, BR-001–BR-004, BR-011–BR-012, NFR-022–NFR-025, NFR-042, NFR-046.

**HUMAN-FIRST backend**

- `InterviewSession` aggregate and `CandidateContext` value object.
- explicit enum plus central transition methods; no sealed-interface ceremony required;
- anonymous token generation/hash/binding;
- draft create/read/context update/prepare/delete use cases;
- operation-specific session-creation idempotency;
- injected `Clock` and logical-expiry checks;
- ProblemDetail mapping;
- first real Flyway migration and JPA mappings.

**AI-REVIEW**

- state/validation/ownership/expiry edge cases;
- transaction and constraint review;
- missing unit/integration tests.

**Frontend**

- setup form and fixed-configuration summary;
- session token in `sessionStorage`;
- draft/ready/error screens.

**Tests**

- valid and invalid transitions;
- context cannot change after `READY`;
- same/different idempotency payload;
- token isolation and expiry boundary;
- cascade manual deletion;
- no raw context in logs.

**Non-goals:** start, turns, Gemini, report, speech.

**Definition of done:** Checkpoint B review can answer: “Is context genuinely immutable at READY, and can another/expired token access it?”

## M3 — One complete browser/text turn with failure recovery

**Objective:** prove the riskiest end-to-end interaction while preserving the final answer.

**Demo:** start a ready session, hear/read a first fake question, answer via Chrome STT or text, persist it, and receive one next fake question; injected provider failure leaves the answer safe and retry resumes.

**Requirements:** FR-030–FR-034, FR-040–FR-050, FR-060–FR-065, BR-005–BR-006, NFR-001, NFR-003–NFR-005.

**HUMAN-FIRST backend**

- `InterviewTurn`, turn states, and first/next prompt orchestration;
- `InterviewResponseGateway` interface;
- two-transaction flow around external call;
- start/answer idempotency and request fingerprints;
- next-prompt failure/resume behaviour.

**AI-IMPLEMENT after interface approval**

- deterministic fake gateway;
- DTO mapping, synthetic fixtures, browser API wrappers.

**Frontend**

- explicit interview reducer;
- capability detection, permission handling, final/interim distinction;
- text fallback;
- speech synthesis and visible prompt;
- saved-answer/retry UI.

**Manual spike**

- Chrome Vietnamese-accented English/Java vocabulary corpus;
- record limitations in README; do not block text flow.

**Tests**

- answer commit precedes provider call;
- provider call observes no active DB transaction;
- failure preserves answer;
- same-key retry creates one next turn;
- foreign/expired/session-state rejection;
- browser unsupported fallback.

**Non-goals:** Gemini, more than two turns, report.

## M4 — Six-turn lifecycle and optional Gemini interviewer

**Objective:** complete the bounded interview loop and add a real provider without making it required.

**Demo:** fake mode completes six turns and auto-ends; Gemini mode can be exercised manually with an environment key.

**Requirements:** FR-021, FR-026–FR-029, FR-043–FR-050, BR-007, NFR-004, NFR-006.

**HUMAN-FIRST**

- turn sequence/cap rules;
- end early and cancel unanswered turn;
- optimistic locking and unique-sequence recovery;
- bounded transient retry policy;
- prompt-context construction and size limits.

**Provider**

- one Gemini adapter implementing `InterviewResponseGateway`;
- explicit `gemini` profile and missing-key startup validation;
- model ID from configuration, not hard-coded into domain;
- safe prompt delimiters and prompt version metadata.

**Tests**

- no seventh turn under concurrent submission;
- early end produces `ENDED` or `ABANDONED` by evidence count;
- five simultaneous fake sessions do not mix data;
- adapter fixture tests only in CI;
- manual Gemini evaluation uses synthetic context.

**Non-goals:** Gemini Live, WebRTC, live-provider CI tests.

## M5 — Grounded report

**Objective:** generate and display a useful report without scores or fabricated evidence.

**Demo:** an ended two-to-six-turn fake session returns Vietnamese feedback, one-to-three priorities, valid turn evidence, and English improved outlines.

**Requirements:** FR-070–FR-079, BR-008–BR-010, NFR-001, NFR-040, NFR-042.

**HUMAN-FIRST**

- report state and generation use case;
- `ReportGenerationGateway` interface;
- evidence sufficiency and evidence-ID validator;
- pending/complete/failed and idempotent retry;
- report transaction boundary.

**AI-IMPLEMENT after schema approval**

- deterministic fake report fixture;
- JSON DTO/schema parsing and UI components.

**Gemini**

- extend the one Gemini adapter to report generation;
- strict structured output when supported;
- invalid output becomes `FAILED`; add a repair call only after measured need.

**Tests**

- report blocked for DRAFT/READY/ACTIVE/ABANDONED/expired;
- one report per session;
- one-to-three priorities;
- invalid/foreign evidence IDs rejected;
- no score or sample-answer field;
- provider failure does not change session `ENDED`.

## M6 — Retention, deletion, and privacy hardening

**Objective:** make the 24-hour policy observable and testable.

**Demo:** an injected clock expires a session immediately; startup/scheduled cleanup removes all rows; repeated cleanup is safe.

**Requirements:** FR-004–FR-007, FR-090–FR-094, BR-012, NFR-021–NFR-026, NFR-046.

**Tasks**

- scheduled and startup cleanup in bounded batches;
- cascade and access-grant deletion integration tests;
- query/application audit for expiry enforcement;
- structured cleanup metrics;
- token/log/redaction tests;
- public-only in-memory rate limiting if a public deployment is actually enabled.

**Non-goals:** always-on cleanup guarantee, Redis/distributed scheduler, encryption-platform work for local PostgreSQL.

## M7 — Portfolio hardening and defence

**Objective:** make the project reproducible, honest, and interview-defensible.

**Demo:** clean-clone fake E2E plus an owner-led architecture/code walkthrough.

**Requirements:** NFR-020 when publicly deployed, NFR-041–NFR-045 and all acceptance scenarios.

**Tasks**

- text-fallback E2E for the fake path;
- OpenAPI drift check;
- dependency/security scan;
- README architecture and sequence diagrams;
- synthetic screenshots/demo recording;
- manual Gemini and Chrome evaluation notes;
- limitations and zero-cost deployment notes;
- CV bullets backed by implemented facts;
- owner defence questions covering JVM/Spring/JPA/transactions/concurrency/security.

**Definition of done**

- AS-01 through AS-08 pass or have documented manual evidence;
- clean clone requires no API key;
- owner can implement/explain a small change without AI;
- only then may the project replace capstone wording on the CV.

## MVP cut line

If time/quota is constrained, keep M1–M3 and fake-provider text flow first. Chrome STT/TTS, Gemini, public hosting, rate limiting, UI polish, and report repair calls may be delayed without invalidating the backend learning checkpoint. A CV replacement still requires the completed M7 evidence.

## First implementation checkpoint

Start with M1 only as AI-generated mechanical scaffold. Then stop for owner review before human-first M2. Do not generate M2 domain logic in the same unattended pass.
