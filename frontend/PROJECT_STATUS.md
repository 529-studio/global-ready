# Frontend Project Status

Status: M1 application shell complete; shadowing-first v0.3 proposal awaiting external audit
Last updated: 2026-08-25

## Current capability

- Node 24.19.0, Next.js 16.3.2 App Router, React 19.2.8 and strict TypeScript.
- Static M1 checkpoint page with truthful local/zero-cost messaging.
- Deterministic lint, type generation/typecheck and production build.
- No anonymous access storage, setup form, interview state, speech controls,
  turns or report UI yet.

## Current delivery boundary

The frontend remains at the M1 shell. The proposed next boundary is a
frontend-only synchronized shadowing pilot, but
`docs/13_SHADOWING_FIRST_IMPLEMENTATION_PLAN.md` is not canonical. Do not
implement Issues #9 or #10, media/player code, or a replacement M2 until the
external audit is dispositioned and the canonical v0.3 delta is owner-approved.

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
| 2026-08-27 | Preserved the owner-approved architecture/TDD instruction seed and non-canonical shadowing design input before coordinated v0.3 adoption; frontend runtime remains M1. | `./scripts/verify.sh docs`; `git diff --check` | Issue #17 / M0.3 approved design seed |
| 2026-08-25 | Established human architecture authority and a RED-GREEN-REFACTOR delivery contract; no frontend runtime behavior changed. | `./scripts/verify.sh docs`; `./scripts/verify.sh fast` | Owner development-style decision / `docs/12_CODEX_WORKFLOW.md` |
| 2026-08-25 | Recorded the non-canonical shadowing-first proposal and paused the stale interview-first frontend boundary pending external audit; frontend runtime is unchanged. | `./scripts/verify.sh docs` | Owner-approved audit-plan decision / `docs/13_SHADOWING_FIRST_IMPLEMENTATION_PLAN.md` |
| 2026-08-24 | Recorded the approved built-in Project intake, Backlog and Done automation; no frontend runtime behavior changed. | GitHub Project workflow UI; GraphQL workflow readback | Project #1 / PR #12 |
| 2026-08-24 | Established the frontend status ledger and confirmed that PR #12 changes workflow only, not product UI. | `./scripts/verify.sh frontend`; `./scripts/verify.sh full`; `./scripts/verify.sh smoke` | PR #12 |
