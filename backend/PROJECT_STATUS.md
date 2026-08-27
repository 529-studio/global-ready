# Backend Project Status

Status: M1 foundation complete; canonical v0.3 shadowing boundary approved
Last updated: 2026-08-27

## Current capability

- Java 25 and Spring Boot 4.1.1 modular-monolith scaffold.
- Spring MVC, validation, JPA, Flyway and PostgreSQL/Testcontainers wiring.
- Actuator health and OpenAPI endpoints.
- Application health contributor reports `UP` in `zero-cost-local` mode.
- Structured ECS logging, correlation IDs and an injected UTC `Clock`.
- No anonymous access, InterviewSession, turn, report, fake gateway or Gemini
  implementation yet.

## Current delivery boundary

The backend runtime remains at M1. Canonical v0.3 sets the next product boundary
as a public, read-only Spring shadowing exercise metadata/content-contract API;
the browser, not Spring or the database, carries media bytes. Issue #17 changes
documentation only, so that API is not implemented yet and M0.3 remains in
progress. M2 implementation proceeds through separately scoped, approved v0.3
Issues rather than the stale interview-first Issue #2 path.

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
| 2026-08-27 | Established v0.3 product authority and ADR-0005 for shadowing-first, Spring metadata, direct media, privacy, rights, and M2/M3 cut lines; backend product runtime remains unchanged and M0.3 is still in progress. | `./scripts/verify.sh docs` | Issue #17 / owner-approved `docs/13_SHADOWING_FIRST_IMPLEMENTATION_PLAN.md` |
| 2026-08-27 | Preserved the owner-approved architecture/TDD instruction seed and non-canonical shadowing design input before coordinated v0.3 adoption; backend runtime remains M1. | `./scripts/verify.sh docs`; `git diff --check` | Issue #17 / M0.3 approved design seed |
| 2026-08-25 | Established human architecture authority and a RED-GREEN-REFACTOR delivery contract; no backend runtime behavior changed. | `./scripts/verify.sh docs`; `./scripts/verify.sh fast` | Owner development-style decision / `docs/12_CODEX_WORKFLOW.md` |
| 2026-08-25 | Recorded that the shadowing-first v0.3 proposal is non-canonical and blocks stale M2 backend implementation pending external audit; backend runtime is unchanged. | `./scripts/verify.sh docs` | Owner-approved audit-plan decision / `docs/13_SHADOWING_FIRST_IMPLEMENTATION_PLAN.md` |
| 2026-08-24 | Recorded the approved built-in Project intake, Backlog and Done automation; no backend runtime behavior changed. | GitHub Project workflow UI; GraphQL workflow readback | Project #1 / PR #12 |
| 2026-08-24 | Added the explicit application health contributor while retaining `/actuator/health` as the canonical endpoint. | `./scripts/verify.sh backend`; `./scripts/verify.sh full`; `./scripts/verify.sh smoke` | PR #12 |
