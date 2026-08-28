# Backend Project Status

Status: M1 runtime complete; canonical M2 Spring shadowing content-contract boundary ready for backlog planning
Last updated: 2026-08-28

## Current capability

- Java 25 and Spring Boot 4.1.1 modular-monolith scaffold.
- Spring MVC, validation, JPA, Flyway and PostgreSQL/Testcontainers wiring.
- Actuator health and OpenAPI endpoints.
- Application health contributor reports `UP` in `zero-cost-local` mode.
- Structured ECS logging, correlation IDs and an injected UTC `Clock`.
- No anonymous access, InterviewSession, turn, report, fake gateway or Gemini
  implementation yet.

## Current delivery boundary

The backend M1 runtime is complete. Canonical v0.3 defines the next boundary as
a public, read-only Spring shadowing exercise metadata/content-contract API;
the browser, not Spring or the database, carries media bytes. No M2 endpoint,
persistence, or media transport exists yet. M2 implementation may start only
after the canonical PR is manually merged and ticket-manager Phase A receives
the exact `APPROVE BOARD WRITE` approval to create implementation-ready M2
Issues. Until then no M2 backlog is approved, and interview-first Issue #2
remains stale rather than active work.

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
| 2026-08-28 | Reconciled the M0.3 design record as adopted audit input and set the honest runtime gate: M1 backend is complete, M2 Spring metadata is ready only for backlog planning, and no M2 endpoint, persistence, or media transport exists. | `./scripts/verify.sh fast`; `./scripts/verify.sh full`; `./scripts/verify.sh docs`; `./scripts/verify.sh smoke`; `git diff --check` | Issue #17 / Task 7 |
| 2026-08-28 | Added M0.3 delivery-contract intake checks for architecture approval, executable RED/GREEN/refactor evidence, media-rights provenance, status-ledger readback, and explicit manual-merge policy; backend runtime remains M1 and no M2 endpoint, persistence, or media transport was added. | `./scripts/verify.sh docs`; `git diff --check` | Issue #17 / Task 6 |
| 2026-08-28 | Corrected the current delivery boundary so manual canonical merge and separately approved ticket-manager Phase A are explicit prerequisites for ready M2 Issues; backend runtime remains M1, no M2 backlog/product endpoint exists, and Issue #2 remains stale. | `./scripts/verify.sh docs`; `git diff --check` | Issue #17 / Task 5 fix round 1 |
| 2026-08-28 | Aligned effective repository instructions with the M2 Spring metadata/content-contract and browser-direct-media boundary; backend runtime remains M1 and no M2 endpoint, persistence, media transport, or backlog implementation exists. | `./scripts/verify.sh docs`; `git diff --check` | Issue #17 / Task 5 instruction alignment |
| 2026-08-28 | Corrected the empty media registry so no sentinel row can evade the required provenance fields; no real human media, cloud storage, or product code was added, and backend runtime remains M1. | `./scripts/verify.sh docs`; `git diff --check` | Issue #17 / Task 4 fix round 1 / D-039 |
| 2026-08-28 | Defined the fail-closed media publication and non-personal provenance gate; no real human media, cloud storage, or product code was added, and backend runtime remains M1. | `./scripts/verify.sh docs`; `git diff --check` | Issue #17 / D-034, D-035, D-039 / ADR-0005 |
| 2026-08-28 | Clarified that M0.3 completes at manual canonical merge plus post-merge readback, while ticket-manager Phase A and exact board approval remain a separate prerequisite for M2 product coding; backend runtime remains M1, with no M2 backlog or product endpoint implemented. | `./scripts/verify.sh docs`; `git diff --check` | Issue #17 / Task 3 fix round 1 |
| 2026-08-27 | Recorded the approved M0.3 canonical closure, M2 shadowing pilot MVP, and product-justified M3 portfolio/CV ordering; backend runtime remains M1, no M2 backlog is approved, and no M2 product endpoint exists. | `./scripts/verify.sh docs`; `git diff --check` | Issue #17 / M0.3–M3 owner-approved cut lines |
| 2026-08-27 | Corrected the canonical system-context diagram so Spring receives only public exercise metadata while browser media/caption requests terminate at the deterministic or separately approved media origin; backend runtime remains M1 and no endpoint exists yet. | `./scripts/verify.sh docs`; `git diff --check` | Issue #17 / ADR-0005 / Task 2 fix round 1 |
| 2026-08-27 | Defined canonical v0.3 SRS, architecture, public exercise API, and RTM for Spring metadata with browser-direct media; backend runtime remains M1 and the planned M2 GET is not implemented. | `./scripts/verify.sh docs` | Issue #17 / D-032–D-041 / ADR-0005 |
| 2026-08-27 | Established v0.3 product authority and ADR-0005 for shadowing-first, Spring metadata, direct media, privacy, rights, and M2/M3 cut lines; backend product runtime remains unchanged and M0.3 is still in progress. | `./scripts/verify.sh docs` | Issue #17 / owner-approved `docs/13_SHADOWING_FIRST_IMPLEMENTATION_PLAN.md` |
| 2026-08-27 | Preserved the owner-approved architecture/TDD instruction seed and non-canonical shadowing design input before coordinated v0.3 adoption; backend runtime remains M1. | `./scripts/verify.sh docs`; `git diff --check` | Issue #17 / M0.3 approved design seed |
| 2026-08-25 | Established human architecture authority and a RED-GREEN-REFACTOR delivery contract; no backend runtime behavior changed. | `./scripts/verify.sh docs`; `./scripts/verify.sh fast` | Owner development-style decision / `docs/12_CODEX_WORKFLOW.md` |
| 2026-08-25 | Recorded that the shadowing-first v0.3 proposal is non-canonical and blocks stale M2 backend implementation pending external audit; backend runtime is unchanged. | `./scripts/verify.sh docs` | Owner-approved audit-plan decision / `docs/13_SHADOWING_FIRST_IMPLEMENTATION_PLAN.md` |
| 2026-08-24 | Recorded the approved built-in Project intake, Backlog and Done automation; no backend runtime behavior changed. | GitHub Project workflow UI; GraphQL workflow readback | Project #1 / PR #12 |
| 2026-08-24 | Added the explicit application health contributor while retaining `/actuator/health` as the canonical endpoint. | `./scripts/verify.sh backend`; `./scripts/verify.sh full`; `./scripts/verify.sh smoke` | PR #12 |
