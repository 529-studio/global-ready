# Milestone Execution Rules

Status: Canonical v0.2  
Last updated: 2026-08-24

## 1. Core rules

1. Work one milestone at a time and keep the repository buildable.
2. Do not implement a later milestone's abstraction “for future use.”
3. Map each task and acceptance test to requirement IDs.
4. Implement privacy, error handling, and observability with the feature that needs them.
5. Keep normal CI independent of Gemini, paid services, and public hosting.
6. Keep domain/application work human-first unless the owner explicitly asks Codex to implement it.
7. Provider network calls must remain outside database transactions.
8. No milestone may introduce audio persistence.
9. No seventh interview turn may be possible.
10. Material deviations require a spec delta or ADR before merge.

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

1. Which v0.2 requirement requires it?
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

- **Checkpoint A — M1:** clean scaffold, no domain code.
- **Checkpoint B — M2:** session aggregate, state/freeze/expiry/access rules.
- **Checkpoint C — M3:** one complete answer survives provider failure.
- **Checkpoint D — M4:** six-turn lifecycle and concurrency.
- **Checkpoint E — M5/M6:** grounded report and verified deletion.
- **Checkpoint F — M7:** portfolio evidence and owner defence.

Review each checkpoint before starting the next one. Do not generate the whole product in one Codex prompt.

## 7. CV rule

Global-Ready may replace the capstone on the CV only after M7 and only with claims demonstrated by code/tests. Do not claim production users, scale, accuracy, or cost savings without evidence.
