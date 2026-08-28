# Frontend Project Status

Status: M1 application shell complete; canonical v0.3 shadowing boundary approved
Last updated: 2026-08-27

## Current capability

- Node 24.19.0, Next.js 16.3.2 App Router, React 19.2.8 and strict TypeScript.
- Static M1 checkpoint page with truthful local/zero-cost messaging.
- Deterministic lint, type generation/typecheck and production build.
- No anonymous access storage, setup form, interview state, speech controls,
  turns or report UI yet.

## Current delivery boundary

The frontend runtime remains at the M1 shell. Canonical v0.3 sets the next
product boundary as a `/practice` shadowing pilot backed by Spring metadata and
browser-direct media. Issue #17 changes documentation only, so the route and
player are not implemented yet and M0.3 remains in progress. M2 implementation
proceeds through separately scoped, approved v0.3 Issues rather than the stale
frontend-only Issues #9 and #10 path.

## Verification

Run from the repository root:

```bash
./scripts/verify.sh frontend
./scripts/verify.sh full
./scripts/verify.sh smoke
```

## Update rule

Every commit that changes frontend production code, tests, build/runtime
configuration, visible behavior, or frontend instructions must update this
file in the same commit. Record the new capability or limitation, exact
verification, and the Issue/PR or decision reference. Never include tokens,
CV/JD content, candidate answers, provider payloads, or environment-file
values.

## Change log

| Date | Change | Verification | Reference |
|---|---|---|---|
| 2026-08-28 | Defined the fail-closed media publication and non-personal provenance gate; no real human media, cloud storage, or product code was added, and frontend runtime remains the M1 shell. | `./scripts/verify.sh docs`; `git diff --check` | Issue #17 / D-034, D-035, D-039 / ADR-0005 |
| 2026-08-28 | Clarified that M0.3 completes at manual canonical merge plus post-merge readback, while ticket-manager Phase A and exact board approval remain a separate prerequisite for M2 product coding; frontend runtime remains the M1 shell, with no M2 backlog or `/practice` implementation. | `./scripts/verify.sh docs`; `git diff --check` | Issue #17 / Task 3 fix round 1 |
| 2026-08-27 | Recorded the approved M0.3 canonical closure, M2 shadowing pilot MVP, and product-justified M3 portfolio/CV ordering; frontend runtime remains the M1 shell, no M2 backlog is approved, and `/practice` does not exist. | `./scripts/verify.sh docs`; `git diff --check` | Issue #17 / M0.3–M3 owner-approved cut lines |
| 2026-08-27 | Corrected the canonical system-context diagram so the browser sends only exercise metadata requests to Spring and sends media/caption requests directly to the deterministic or separately approved media origin; frontend runtime remains the M1 shell and `/practice` is not implemented. | `./scripts/verify.sh docs`; `git diff --check` | Issue #17 / ADR-0005 / Task 2 fix round 1 |
| 2026-08-27 | Defined canonical v0.3 SRS, architecture, public exercise API, and RTM for Spring metadata with browser-direct media; frontend runtime remains the M1 shell and `/practice` is not implemented. | `./scripts/verify.sh docs` | Issue #17 / D-032–D-041 / ADR-0005 |
| 2026-08-27 | Established v0.3 product authority and ADR-0005 for shadowing-first, Spring metadata, direct media, privacy, rights, and M2/M3 cut lines; frontend product runtime remains unchanged and M0.3 is still in progress. | `./scripts/verify.sh docs` | Issue #17 / owner-approved `docs/13_SHADOWING_FIRST_IMPLEMENTATION_PLAN.md` |
| 2026-08-27 | Preserved the owner-approved architecture/TDD instruction seed and non-canonical shadowing design input before coordinated v0.3 adoption; frontend runtime remains M1. | `./scripts/verify.sh docs`; `git diff --check` | Issue #17 / M0.3 approved design seed |
| 2026-08-25 | Established human architecture authority and a RED-GREEN-REFACTOR delivery contract; no frontend runtime behavior changed. | `./scripts/verify.sh docs`; `./scripts/verify.sh fast` | Owner development-style decision / `docs/12_CODEX_WORKFLOW.md` |
| 2026-08-25 | Recorded the non-canonical shadowing-first proposal and paused the stale interview-first frontend boundary pending external audit; frontend runtime is unchanged. | `./scripts/verify.sh docs` | Owner-approved audit-plan decision / `docs/13_SHADOWING_FIRST_IMPLEMENTATION_PLAN.md` |
| 2026-08-24 | Recorded the approved built-in Project intake, Backlog and Done automation; no frontend runtime behavior changed. | GitHub Project workflow UI; GraphQL workflow readback | Project #1 / PR #12 |
| 2026-08-24 | Established the frontend status ledger and confirmed that PR #12 changes workflow only, not product UI. | `./scripts/verify.sh frontend`; `./scripts/verify.sh full`; `./scripts/verify.sh smoke` | PR #12 |
