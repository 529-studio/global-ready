# Global-Ready repository instructions

## Sources of truth

- Canonical Product Brief, SRS, ADRs, domain/data model, API contract,
  milestone plan, requirement traceability matrix, and changelog define
  intended behavior.
- The current checkout, build files, tests, and Git history define the actual
  implementation state and exact commands.
- Never restore or copy implementation from an old ZIP or archived source.
- If source, tests, and canonical documentation disagree, report the exact
  files and behavior. Do not silently rewrite either side.

## Project constraints

- This is a zero-cost portfolio/capstone project.
- Preserve the existing monorepo and modular-monolith architecture.
- Do not introduce microservices, paid infrastructure, or paid SaaS.
- Use dependency and runtime versions already locked by the repository.
- Fake AI providers are the default clean-clone and CI configuration.
- Gemini is opt-in through explicit environment configuration.
- Real Gemini calls are never part of normal CI.

## M2 shadowing invariants

- Spring owns the public, read-only exercise metadata/content contract only.
- The browser fetches reference media and captions directly from the
  deterministic repository fixture or a separately approved public origin.
- The backend and database never upload, store, proxy, stream, or persist
  media bytes.
- One versioned manifest is the exercise source of truth; WebVTT is derived
  and must remain in one-to-one cue correspondence with it.
- Transfer unlocks only after reset, start, no forward seek, and the current
  playback generation's native `ended` event. Stale events cannot unlock a
  newer generation.
- Reference playback is system-observed. Speaking completion is self-attested,
  transcript hiding is UI-only concealment, and the product must not claim
  speech verification.
- M2 has no learner persistence, learner audio capture, STT, AI provider,
  anonymous session token, report, or backend/database media path.
- Every real human asset must pass the media-rights and provenance gate before
  merge; private releases remain outside Git.
- Planned evidence combines Spring JUnit/MockMvc contract tests, Vitest state
  tests, React Testing Library component/accessibility checks, and one focused
  Playwright Chromium flow.

## Future adaptive interview invariants

The invariants below apply only after a separately approved canonical adaptive
interview milestone opens. They do not describe M2 or the current M1 runtime.

- InterviewSession is the aggregate root.
- CandidateContext is an embedded/value object and becomes immutable at READY.
- A session owns its turns and at most one report.
- Session states are DRAFT, READY, ACTIVE, ENDED, ABANDONED, and EXPIRED.
  There is no session FAILED state.
- Report states are NOT_STARTED, PENDING, COMPLETE, and FAILED.
- A session has at most six turns. A follow-up consumes one turn.
  The candidate can end the interview early.
- The frontend submits only the candidate's final transcript.
- The backend persists and commits the answer before invoking the AI provider.
- Provider calls happen outside database transactions.
- Provider failure preserves the answer and supports idempotent retry.
- Session creation, session start, turn submission, retry, and report generation use
  operation-specific idempotency keys.
- expiresAt belongs to InterviewSession. Every read and write rejects an
  expired session immediately.
- Anonymous session tokens are high-entropy, session-scoped, expire with the
  session, are stored only as hashes, and are never logged or put in URLs.
- Reports contain one to three improvement priorities, no numeric score, and
  no complete sample answer.
- Raw audio is not persisted. Browser speech recognition may involve browser
  or vendor processing. Text input fallback is mandatory.
- Fake-provider tests are deterministic. Real Gemini behavior is checked with
  a small manual evaluation corpus.

## Security and privacy

- Never log tokens, CV/JD contents, candidate answers, raw provider payloads,
  raw audio, environment files, or credentials.
- Never print or copy GitHub or provider tokens into chat, files, test output,
  issue bodies, or pull requests.
- Do not add secrets to the repository.
- Do not weaken authentication, expiration, redaction, or transaction rules
  merely to make tests pass.

## Working agreement

- Read this file, the closest nested AGENTS.md, relevant canonical documents,
  and existing tests before editing.
- Inspect git status and preserve user changes.
- Work on one GitHub issue per branch.
- Keep changes inside the issue scope. Record unrelated findings separately.
- Do not commit, push, open a PR, modify GitHub Issues, or change Project fields
  unless the user explicitly authorizes that external write.
- GitHub board writes require the exact approval phrase:
  APPROVE BOARD WRITE
- Auto-merge must never be enabled; human review and manual merge are required.
- Changes to aggregates, state machines, transaction boundaries, idempotency,
  anonymous tokens, expiration, security, or database migrations are
  HUMAN-FIRST: propose the design and wait for human approval before coding.
- Do not claim completion for checks that were not run.

## Project status discipline

- Every repository commit made after the status-ledger baseline must update at
  least one of `backend/PROJECT_STATUS.md` or `frontend/PROJECT_STATUS.md`.
- A commit that changes a backend area must update the backend status file; a
  frontend change must update the frontend status file; a cross-cutting change
  affecting both delivery surfaces must update both.
- Record the resulting capability or limitation, exact verification evidence,
  and Issue/PR or canonical decision reference. Do not use a generic
  "status updated" entry.
- Status files must never contain tokens, credentials, CV/JD text, candidate
  answers, provider payloads, raw audio, or environment-file values.

## Architecture authority and development style

- The human owner is the final product and architecture authority. The owner
  approves canonical boundaries, ADRs, aggregate/state models, public API/data
  contracts, dependencies, security/privacy decisions, and recovery strategy.
- Codex may investigate evidence, present architectural options and trade-offs,
  and implement an approved design. It must not silently introduce a new
  architectural pattern, dependency, persistence boundary, or provider.
- An implementation conflict with an approved architecture or ADR stops the
  Issue. Report the exact conflict and obtain an owner-approved spec or ADR
  amendment before continuing.
- Production behavior changes follow test-driven development: establish the
  smallest failing test for the intended behavior or reproduced defect, make
  the minimum implementation pass, then refactor while the suite stays green.
- Confirm that the RED failure is caused by the missing behavior, not a broken
  fixture or environment. Do not commit the deliberate failing state.
- Use the lowest useful test level. Add integration/contract/manual evidence
  where a unit test cannot prove persistence, transaction, browser, provider,
  migration, accessibility, or clean-clone behavior.
- Documentation, media, and configuration-only work must define an executable
  validation first where practical; it must not invent a meaningless unit test
  merely to claim TDD.

## Verification commands

Run these exact commands from the repository root:

- Fast verification: `./scripts/verify.sh fast`
- Full verification: `./scripts/verify.sh full`
- Documentation/contract verification: `./scripts/verify.sh docs`
- Local clean-clone smoke run: `./scripts/verify.sh smoke`

## Definition of done

A task is done only when:

- Its acceptance criteria and issue-specific Definition of Done are met.
- Relevant tests were added or updated and the required commands exit zero.
- The diff was reviewed for scope, regressions, privacy, and secret leakage.
- API, data model, ADR, and traceability documentation are updated when
  externally visible behavior changes.
- The final report lists changed files, commands run, results, known risks,
  and anything not verified.
