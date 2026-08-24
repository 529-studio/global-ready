# Backend Project Status

Status: M1 foundation complete; M2 domain implementation not started
Last updated: 2026-08-24

## Current capability

- Java 25 and Spring Boot 4.1.1 modular-monolith scaffold.
- Spring MVC, validation, JPA, Flyway and PostgreSQL/Testcontainers wiring.
- Actuator health and OpenAPI endpoints.
- Application health contributor reports `UP` in `zero-cost-local` mode.
- Structured ECS logging, correlation IDs and an injected UTC `Clock`.
- No anonymous access, InterviewSession, turn, report, fake gateway or Gemini
  implementation yet.

## Current delivery boundary

The next canonical backend boundary is M2, beginning with GitHub Issue #2 and
its HUMAN-FIRST aggregate/state review. Do not implement a later Issue before
its native blockers and owner checkpoint are resolved.

## Verification

Run from the repository root:

```bash
./scripts/verify.sh backend
./scripts/verify.sh full
./scripts/verify.sh smoke
```

## Update rule

Every commit that changes backend production code, tests, build/runtime
configuration, contracts, or backend instructions must update this file in the
same commit. Record the new capability or limitation, exact verification, and
the Issue/PR or decision reference. Never copy credentials, candidate content,
provider payloads, or environment-file values here.

## Change log

| Date | Change | Verification | Reference |
|---|---|---|---|
| 2026-08-24 | Recorded the approved built-in Project intake, Backlog and Done automation; no backend runtime behavior changed. | GitHub Project workflow UI; GraphQL workflow readback | Project #1 / PR #12 |
| 2026-08-24 | Added the explicit application health contributor while retaining `/actuator/health` as the canonical endpoint. | `./scripts/verify.sh backend`; `./scripts/verify.sh full`; `./scripts/verify.sh smoke` | PR #12 |
