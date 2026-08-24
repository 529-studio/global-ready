# Frontend Project Status

Status: M1 application shell complete; M2 setup flow not started
Last updated: 2026-08-24

## Current capability

- Node 24.19.0, Next.js 16.3.2 App Router, React 19.2.8 and strict TypeScript.
- Static M1 checkpoint page with truthful local/zero-cost messaging.
- Deterministic lint, type generation/typecheck and production build.
- No anonymous access storage, setup form, interview state, speech controls,
  turns or report UI yet.

## Current delivery boundary

The next frontend work is the M2 browser token boundary in Issue #9, followed
by the setup/READY flow in Issue #10 after their native blockers and required
HUMAN-FIRST approvals are complete.

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
| 2026-08-24 | Recorded the approved built-in Project intake, Backlog and Done automation; no frontend runtime behavior changed. | GitHub Project workflow UI; GraphQL workflow readback | Project #1 / PR #12 |
| 2026-08-24 | Established the frontend status ledger and confirmed that PR #12 changes workflow only, not product UI. | `./scripts/verify.sh frontend`; `./scripts/verify.sh full`; `./scripts/verify.sh smoke` | PR #12 |
