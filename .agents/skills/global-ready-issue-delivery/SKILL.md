---
name: global-ready-issue-delivery
description: Implement or review one specific Global-Ready GitHub issue from evidence through scoped verification and pull-request readiness. Use only when an issue number or unambiguous single issue is supplied or can be resolved. Enforce one issue per branch, nearest AGENTS.md instructions, requirement traceability, and HUMAN-FIRST approval gates. Do not use for backlog creation, milestone decomposition, Project/Kanban redesign, or generic repository setup.
---

# Global-Ready issue delivery

Deliver or review exactly one issue without expanding its contract.

Before acting, state the testable outcome, material assumptions, and evidence
that will prove success. Ask only when an unresolved choice would materially
change scope or require new authority. Prefer the smallest change that satisfies
the issue: add no speculative abstraction, drive-by refactor, formatting churn,
or adjacent cleanup. Every changed line must trace to the issue; remove only
orphans introduced by this change. For a defect, reproduce it with the lowest
useful failing test before fixing it when feasible.

## Entry gate

Require an issue number, URL, or one unambiguous issue already established in
the conversation. If it is missing, ambiguous, not implementation-ready, or
has a blocking unresolved decision, stop and request the missing contract. Do
not create or redesign backlog items with this skill.

Before editing:

1. Read the issue and its acceptance criteria, Definition of Done, AI Mode,
   dependencies, requirement/ADR IDs, and linked discussion.
2. Read root and nearest `AGENTS.md`, relevant canonical documents, current
   source/tests, build files, and recent Git history.
3. Inspect `git status`; preserve user changes and report overlap.
4. Verify the branch represents only this issue. Propose the git-flow branch
   name if one does not exist, but do not commit, push, or open a PR without
   explicit authorization.
5. Compare issue claims with implementation evidence. Report contradictions
   instead of silently choosing a side.
6. Confirm the approved canonical boundary or ADR. For an M2 shadowing Issue,
   stop if the proposed change adds learner persistence, backend/database media
   bytes, or a rights/privacy/public-contract decision without owner approval.
7. Establish RED -> GREEN -> REFACTOR evidence before production behavior.
   Documentation/configuration-only work uses the smallest executable validator
   that can fail for the intended missing contract.

## HUMAN-FIRST stop

Before coding any decision that changes an aggregate, state transition,
transaction boundary, idempotency/retry behavior, anonymous token, expiry,
security boundary, or database migration, present the design and wait for
explicit human approval. `HUMAN-FIRST` issues also require the owner checkpoint
specified by the issue even when the implementation seems obvious.

## Scoped delivery

- Implement only the issue outcome and acceptance criteria; record unrelated
  findings separately.
- Follow the established modular-monolith and monorepo boundaries and locked
  versions. Add no dependency unless the issue requires and justifies it.
- Keep fake providers deterministic and default; never call Gemini in normal
  verification.
- Add or update tests at the lowest useful level, including specified failure,
  privacy, idempotency, concurrency, and recovery paths.
- Update API/data/ADR/RTM docs only when the externally visible contract or
  mapped evidence changes.
- Verify media-rights/provenance evidence for changed content assets; never put
  private release records or participant identities in Git.
- Update every affected `PROJECT_STATUS.md` ledger in each commit with the
  capability/limitation, verification evidence, and Issue/decision reference.
- For review-only requests, do not edit. Report findings by severity with
  exact file/line evidence and missing verification.

## Verification and handoff

Run the issue-specific commands plus the measured repository `fast` gate.
Run `full`, `docs`, or `smoke` when the issue's Definition of Done or risk
surface requires them. Never claim an unrun check passed.

Before declaring PR readiness:

1. Review the diff for issue scope, regressions, sensitive data, secrets,
   dependency drift, API/schema compatibility, and unapproved decisions.
2. Map acceptance criteria and requirement IDs to exact tests/evidence.
3. Report changed files, commands and exit results, known risks, recovery,
   documentation updates, and anything not verified.
4. Prepare a scoped PR summary with `Closes #N` when appropriate, but do not
   perform external writes without explicit authorization.

Auto-merge must never be enabled. Human review and an explicit human merge are
required even when every automated check passes.
