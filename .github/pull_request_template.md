## Linked issue

<!-- Use `Closes #N` when this PR fully delivers one issue. Do not combine unrelated issues. -->

Closes #

## Delivery contract

- AI Mode: <!-- HUMAN-FIRST | AI-IMPLEMENT | AI-REVIEW -->
- Requirement IDs: <!-- FR/BR/NFR/AS IDs, or justified none -->
- ADR IDs: <!-- applicable ADRs, or none -->
- Project status expected after opening: Review

## Scoped change

<!-- Summarize the observable outcome and the exact modules/layers changed. Explain why every changed area belongs to the linked issue. -->

## Verification evidence

<!-- List commands actually run, exit status, and named behavior covered. Never paste candidate content, tokens, environment files, or provider payloads. -->

| Command or check | Result and evidence |
|---|---|
| `./scripts/verify.sh fast` | |
| Issue-specific test/check | |

## Architecture and TDD evidence

- Architecture owner/approved decision or ADR:
- Architecture boundaries checked:
- RED — test/check command and intended failure reason:
- GREEN — minimal implementation command/result:
- REFACTOR — cleanup performed with tests remaining green, or justified none:
- Manual boundary evidence that deterministic tests cannot prove:

<!-- Do not commit a deliberate failing test state or paste sensitive failure output. Documentation/media/config-only changes may use a failing validator or observable check instead of a meaningless unit test. -->

## Contract and data impact

- API/request/response/ProblemDetail impact:
- Domain state or invariant impact:
- Persistence/schema/Flyway impact:
- Transaction, idempotency, retry, and expiry impact:
- Compatibility or dependency impact:

## Privacy and security review

- [ ] No token, CV/JD text, candidate answer, raw provider payload, raw audio, `.env` content, or credential appears in source, fixtures, diff, artifacts, or logs.
- [ ] Authentication, ownership, expiry, redaction, and transaction rules were not weakened.
- [ ] Fake provider remains the default; automated checks require no live provider or hosted database.
- Reviewer/evidence:

## Human review gate

- [ ] This PR is not HUMAN-FIRST.
- [ ] Or, for HUMAN-FIRST: the owner explicitly reviewed the domain/security design and the relevant aggregate, lifecycle, transaction, idempotency, token, expiry, or migration behavior.
- Human reviewer and approved checkpoint:

## UI evidence

<!-- Add screenshots for visible changes using synthetic data, or explain why screenshots do not apply. -->

## Risks and recovery

- Regression risks:
- Disable/revert/migration recovery:

## Documentation and traceability

- [ ] API/data model/ADR/RTM/changelog updated where externally visible behavior changed.
- [ ] Documentation is unchanged because the issue has no contract or traceability impact; rationale:
- [ ] `backend/PROJECT_STATUS.md` and/or `frontend/PROJECT_STATUS.md` is updated
      for every affected delivery surface in this commit/PR.

## Unverified items

<!-- State every check not run and why. Write “None” only when all issue-specific gates ran. -->

## Final scope checks

- [ ] One issue, one branch, no unrelated diff.
- [ ] No unapproved dependency, auto-merge, auto-deploy, paid API action, or secret.
- [ ] Acceptance criteria and issue-specific Definition of Done were read back against this diff.
