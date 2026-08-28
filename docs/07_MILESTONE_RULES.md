# Milestone Execution Rules

Status: Canonical v0.3
Last updated: 2026-08-27

## 1. Core rules

1. Work one milestone at a time and keep the repository buildable.
2. Do not implement a later milestone's abstraction “for future use.”
3. Map each task and acceptance test to requirement IDs and approved ADRs.
4. Owner approval precedes every architecture, public-contract, security,
   privacy, or media-rights change.
5. Production behaviour records RED -> GREEN -> REFACTOR evidence. Documentation
   and configuration work uses executable validation when practical.
6. Every real human asset passes the media-rights gate before it is merged.
7. Keep normal CI independent of Gemini, paid services, public hosting, and
   real-media network dependencies; fake providers and deterministic fixtures
   remain the default.
8. Keep privacy, error handling, observability, accessibility, and the mandatory
   text fallback with the feature that needs them. No milestone may introduce
   learner-audio persistence or a numeric score.
9. One Issue maps to one branch and one PR. Every commit updates the applicable
   backend and/or frontend status ledger with exact verification evidence.
10. Human review and manual merge are mandatory. Auto-merge never runs.
11. Material deviations require a current canonical delta or ADR before merge.

## 2. Required milestone shape

Every milestone records:

- objective and observable demo;
- requirements covered;
- prerequisites;
- backend/frontend/data tasks;
- automated and manual tests;
- privacy and observability;
- definition of done;
- non-goals;
- risk/fallback;
- `HUMAN-FIRST`, `AI-REVIEW`, and `AI-IMPLEMENT` labels.

## 3. Definition of done baseline

A milestone is done only when:

- its acceptance scenarios pass;
- both applications still build independently;
- relevant migrations are versioned;
- core domain rules have tests;
- API documentation reflects implemented behaviour;
- errors use stable ProblemDetail codes;
- no secret or sensitive content appears in normal logs;
- no live Gemini call occurs in CI;
- docs and ADRs reflect material changes;
- the owner can explain the implemented request flow.

## 4. Scope-control gate

Before accepting a task, ask:

1. Which current canonical requirement or approved ADR requires it?
2. Does it help the current milestone's demo?
3. Can the fake-provider path test it?
4. Does it add a new service, framework, account model, audio pipeline, or long-term data?

If answers are missing, defer it.

## 5. AI usage labels

### HUMAN-FIRST

- state transitions and aggregate behaviour;
- validation and use-case orchestration;
- JPA transaction boundaries;
- idempotency/expiry/ownership rules;
- provider port design;
- core JUnit tests.

### AI-REVIEW

- explain or critique an owner implementation;
- enumerate edge cases;
- review concurrency/security;
- suggest modern Java after a baseline exists.

### AI-IMPLEMENT

- Gradle/Next/Docker/CI scaffold;
- formatting and static-analysis configuration;
- OpenAPI and actuator wiring;
- synthetic fixtures and approved fake adapters;
- repetitive DTO/UI wiring;
- documentation.

## 6. Review checkpoints

- **Checkpoint A — M1 scaffold:** reproducible foundation and no product domain.
- **Checkpoint B — M0.3 canonical closure:** documentation/workflow-only delta,
  owner review, and manual merge; no product source.
- **Checkpoint C — M2 shadowing pilot:** one browser-direct-media exercise,
  transient transfer/reflection, deterministic fixture, and owner go/no-go.
- **Checkpoint D — M3 portfolio/CV:** product-justified Spring persistence,
  transactions, idempotency, PostgreSQL/Testcontainers, security/privacy, and
  recovery evidence.
- **Conditional later checkpoints:** scenario packs, post-shadow STT, adaptive
  interview, reports, retention/deletion, and portfolio hardening only after a
  separately approved product/design delta.

Review each checkpoint before starting the next one. No M2 product Issue starts
until the canonical PR is manually merged and its backlog is separately approved.

## 7. CV rule

Global-Ready may support portfolio/CV claims after M3 only with claims directly
demonstrated by code, tests, and the owner’s explanation. Do not claim users,
scale, accuracy, pronunciation quality, learning efficacy, or cost savings
without evidence.
