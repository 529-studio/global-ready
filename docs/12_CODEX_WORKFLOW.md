# Global-Ready SDLC and Codex Workflow

Status: Repository-local SDLC baseline
Last updated: 2026-08-24

This workflow is local, deterministic, and zero-cost. It adds no product
behavior, hosted service, provider call, or paid API dependency.

## 1. What each layer does

| Layer | Purpose | Location |
|---|---|---|
| AGENTS | Durable repository constraints and nearest-directory conventions | `AGENTS.md`, `backend/AGENTS.md`, `frontend/AGENTS.md` |
| Skills | Reusable procedures with precise trigger and non-trigger boundaries | `.agents/skills/` |
| Harness | One command interface shared by humans, Codex, and CI | `scripts/verify.sh` |
| Hooks | Reviewed local lifecycle guardrails around commands and stopping | `.codex/hooks.json` and `.codex/hooks/` |

The root `AGENTS.md` always applies. The backend or frontend file supplements
it only while work is inside that architectural boundary. A closer file has
higher precedence but must not weaken repository-wide security or domain
constraints.

## 2. Verification commands

Run these from the repository root:

```bash
./scripts/verify.sh fast
./scripts/verify.sh docs
./scripts/verify.sh full
./scripts/verify.sh smoke
```

CI additionally runs the same backend/frontend components directly through
`./scripts/verify.sh backend` and `./scripts/verify.sh frontend`. These are
scoped forms of the logic already composed by `full`; they do not define a
second build path.

- `fast` reads staged, unstaged, and untracked paths and checks only affected
  backend, frontend, or documentation/tooling areas. With no diff it checks all
  areas. Set `VERIFY_BASE_REF` in CI to include a branch comparison.
- `docs` validates required contracts, local Markdown links, SRS-to-RTM IDs,
  the two skill manifests, hook shape/fixtures, and both Compose profiles.
- `full` runs the Gradle check, deterministic npm install plus frontend check,
  and the documentation/contract gate.
- `smoke` builds and starts an isolated Compose project on high temporary
  ports, verifies backend health, OpenAPI, and frontend HTTP, then removes only
  its own containers/network/temporary database volume. It supplies no Gemini
  key and does not stop or restart another Compose project.

The harness detects the owner's default Colima socket for Testcontainers. CI
uses Node `24.19.0`; when the active local Node differs, frontend verification
runs in a temporary pinned Node container without changing host `node_modules`.
Docker Compose v2 (`docker compose`) and the standalone `docker-compose`
executable are both supported. The developer baseline is macOS plus Linux CI;
on Windows, run the root harness from WSL or Git Bash.

## 3. Repository skills

Use `/skills` in Codex to inspect discovered skills. The two initial skills are:

- `$global-ready-ticket-manager` for milestone/backlog/Issue/Project planning;
- `$global-ready-issue-delivery` for implementing or reviewing one specific
  ready issue.

An explicit `$skill-name` always requests that skill. Codex may select it
implicitly only when the prompt matches its `description`. Trigger fixtures
cover explicit, implicit, negative, and incomplete-input cases in
`scripts/fixtures/skill-trigger-cases.json`.

The ticket manager remains read-only until the exact phrase
`APPROVE BOARD WRITE`. The delivery skill does not create backlog and stops for
HUMAN-FIRST design approval on lifecycle, transaction, idempotency, token,
expiry, security, and migration decisions.

## 4. Reviewing and trusting hooks

Project hooks are code from the checkout. Codex ignores new or changed project
hooks until a human reviews and trusts them.

1. Review `.codex/hooks.json`, both `.codex/hooks/*.mjs` files, and the fixture
   tests. Confirm every command resolves from `git rev-parse --show-toplevel`.
2. Run `node --test .codex/hooks/tests/hooks.test.mjs`.
3. Open `/hooks` in Codex, inspect the two discovered hooks, and trust only the
   reviewed project configuration.

The synchronous `PreToolUse` guard denies broad recursive deletion,
`git reset --hard`, `git clean -fdx`, force push, direct push to `main` or
`master`, Compose volume deletion, and common attempts to print environment or
credential data. Safe commands return no special approval and continue through
Codex's normal permission checks. The hook is a guardrail, not a security
boundary.

The `Stop` guard does nothing when no tracked file changed. With a tracked diff
it runs only `fast`. A failure may request one continuation; when
`stop_hook_active` is already true it never requests another, preventing a
loop. Untracked files are intentionally excluded from the automatic Stop gate,
but explicit `fast` includes them.

## 5. Disable and recover

To start one Codex session with hooks disabled while investigating reviewed
hook code:

```bash
codex --disable hooks --cd .
```

A user may also set `features.hooks = false` in personal Codex configuration.
Do not add an inline hook representation to `.codex/config.toml`; this project
uses only `.codex/hooks.json` for hook definitions.

If a hook prevents legitimate work:

1. copy the denial reason, but never sensitive command output;
2. run the denied command only after checking whether a safer scoped form
   exists;
3. disable hooks for one session if the hook itself must be repaired;
4. update the fixture first, then the guard, and rerun `./scripts/verify.sh docs`;
5. reopen `/hooks` and trust the changed code only after review.

Do not bypass a denial to force-push, delete volumes, reveal credentials, or
erase user changes.

## 6. Inspect effective instructions

From the repository root:

```bash
codex --cd . --ask-for-approval never \
  "List every AGENTS.md instruction source you loaded and summarize the effective verification commands."
```

Run the same command from `backend/` or `frontend/` to confirm the nearest
instruction file is added to the root source. Official behavior is described
in the OpenAI documentation for
[AGENTS.md](https://developers.openai.com/codex/guides/agents-md),
[skills](https://developers.openai.com/codex/skills), and
[hooks](https://developers.openai.com/codex/hooks).

## 7. Delivery lifecycle

| Status | Entry condition | Exit evidence | Primary owner |
|---|---|---|---|
| Backlog | Canonical need is captured without a readiness claim | Technical scope, dependencies, acceptance criteria, issue-specific DoD and metadata are complete | Project Manager / ticket-manager skill |
| Ready | No unresolved decision blocks the work; HUMAN-FIRST design approval is recorded where applicable | One issue is selected and one branch exists from current `dev` | Human owner |
| In Progress | Assignee is actively delivering only that issue | Local issue-specific checks and `fast` pass; PR contract is filled | Human or Codex according to AI Mode |
| Review | A PR links the issue and exposes test, contract, privacy and recovery evidence | Required CI and human review pass with no unresolved P0/P1 finding | Human reviewer, with optional Codex review |
| Done | The PR is merged and the issue is closed | Merged source, CI result, Project fields, docs/RTM and issue DoD are read back | Human owner / built-in Project automation |

Moving a card never substitutes for the gate evidence. A HUMAN-FIRST item must
not be implemented by Codex before its issue-specific owner checkpoint, even
when Project Status is accidentally set to Ready.

## 8. Issue, branch, and pull-request flow

1. Create an Issue with one of the YAML forms in `.github/ISSUE_TEMPLATE/` or
   refine it with `$global-ready-ticket-manager`. Blank Issues are disabled.
2. Confirm the Issue has exact evidence, requirements, AI Mode, dependencies,
   product acceptance criteria, and its own Definition of Done.
3. Set Status to Ready only after blockers and HUMAN-FIRST decisions are
   resolved. Start Codex delivery by supplying exactly one Issue number or URL
   and asking it to use `$global-ready-issue-delivery`.
4. Branch from current `dev`. Use one branch per Issue, for example
   `feat/2-draft-session-domain`, `fix/12-expiry-boundary`, or
   `chore/13-ci-hardening`. Do not push directly to `dev`.
5. Open one PR using `.github/pull_request_template.md`. Use `Closes #N` when
   merge will fully satisfy the Issue; otherwise describe the partial link
   without closing it.
6. Put the Project item in Review, resolve P0/P1 findings, merge only after CI
   and required human review pass, then read back the merged evidence before
   accepting Done.

The feature, bug, and technical-chore forms all require outcome, current
evidence, technical impact, behavior-based acceptance criteria, issue-specific
DoD, requirement/ADR IDs, AI Mode, risks/recovery, and non-goals. They are an
intake floor, not a substitute for technical backlog refinement.

## 9. Deterministic CI and dependencies

`.github/workflows/ci.yml` runs on pull requests and pushes to the default
branch `dev`. It grants only `contents: read`, cancels superseded runs, and has
explicit job timeouts. Official GitHub actions are pinned to immutable commit
SHAs with their reviewed release versions recorded in comments.

The jobs call the root harness:

- Backend: Gradle `check`, including the existing PostgreSQL Testcontainers
  integration tests;
- Frontend: deterministic `npm ci`, lint, strict typecheck, and production
  build with the repository-pinned Node version;
- Documentation and contracts: Markdown/RTM/API markers, skills, hooks, Compose
  configuration, and repository SDLC policy;
- Clean-clone smoke: an isolated Compose project with ephemeral local
  PostgreSQL and the application images.

CI explicitly selects the fake AI provider and supplies an empty Gemini key.
It uses no repository secret, hosted database, live provider, deployment,
artifact upload, automatic fix, auto-merge, or auto-deploy. `pull_request` is
used instead of `pull_request_target`, so forked code receives no elevated
repository token or secret context.

`.github/dependabot.yml` checks only ecosystems present here: Gradle, npm,
GitHub Actions, and Docker/Compose definitions. Checks run weekly in small
grouped batches with at most two open version-update PRs per ecosystem.
Dependabot PRs receive the same CI and human review as any other dependency
change; nothing auto-merges.

## 10. Project automation (applied external settings)

The owner approved the external settings write on 2026-08-24. Project
**Global-Ready Delivery** now uses these built-in workflows:

1. **Auto-add to project** watches repository `529-studio/global-ready` with
   filter `is:issue is:open label:project:global-ready`.
2. **Item added to project** sets newly added Issues and pull requests to
   `Status: Backlog`.
3. **Item closed** applies to Issues and sets `Status: Done`.
4. The pre-existing **Auto-add sub-issues to project** workflow remains
   enabled.

**Auto-archive items** remains deferred. It may use
   `is:closed reason:completed updated:<@today-1m` only after the first real
   Issue completes the lifecycle and its readback remains visible long enough
   to review.

Do not add a GraphQL Action, PAT, GitHub App, or Project secret for these
rules. GitHub's built-in workflows are the smaller zero-cost mechanism. Do not
rename or delete any existing field. The current `Backlog`, `Ready`,
`In Progress`, `Review`, and `Done` options remain canonical.

## 11. Human and Codex responsibilities

- `AI-IMPLEMENT`: Codex may implement the approved Issue within its exact
  contract; a human still reviews the PR and dependencies.
- `HUMAN-FIRST`: the owner approves and understands the design before code,
  and explicitly reviews domain/security behavior before merge. This includes
  aggregates, lifecycle, validation, transactions, idempotency, anonymous
  tokens, expiry, migrations, and provider interfaces.
- `AI-REVIEW`: Codex inspects evidence and reports findings; it does not fold
  opportunistic fixes into a review Issue.

If the repository is connected to Codex cloud, a maintainer may request an
additional review by commenting `@codex review` on a PR. That review is
advisory and is never a required status check. HUMAN-FIRST review remains a
human responsibility. This repository intentionally contains no
`openai/codex-action`, paid API credential, automatic code generation,
automatic fix, or automatic merge workflow.

## 12. Documentation and traceability rule

Every product Issue lists requirement IDs. When externally observable
behavior, API, data ownership, state, security, or provider boundaries change,
the same PR updates the relevant canonical contract and
`docs/09_TRACEABILITY.md`. A decision that changes an approved architecture
constraint needs an ADR or explicit amendment; a status/evidence change belongs
in the readiness/changelog document. Documentation-only chores must state why
no product requirement mapping applies.

Never rewrite canonical behavior only to match an accidental implementation.
Report the conflicting file, symbol/test, requirement and behavior, then
resolve it through the owner-approved Issue.

Every commit also maintains a truthful area ledger. Update
`backend/PROJECT_STATUS.md` for backend changes and
`frontend/PROJECT_STATUS.md` for frontend changes; update both for a
cross-cutting change that affects both delivery surfaces. The entry names the
capability or limitation, verification evidence and Issue/PR or canonical
decision. The documentation gate checks this rule once the ledger files exist.

## 13. Failure, incident, and recovery procedure

1. Stop delivery and keep the Issue out of Done when CI, privacy review, a
   migration, or a P0/P1 finding fails.
2. Preserve safe redacted evidence: command, exit code, failing test/job, and
   commit. Never copy sensitive logs or provider payloads.
3. Disable or revert the smallest Issue-scoped change. Never edit an applied
   Flyway migration; use an approved additive recovery migration.
4. Revoke exposed credentials outside the repository if an exposure is
   suspected, then remove leaked material from normal history through an
   owner-approved incident procedure.
5. Rerun the issue-specific checks and required root harness gates. Read back
   the merged result and Project state before restoring Done.

The zero-cost boundary is firm: local/GitHub-hosted compute, ephemeral local
PostgreSQL, deterministic fake AI, and no automatic deployment. Real Gemini
evaluation is manual and opt-in. Codex cloud review or scheduled tasks may use
the owner's Codex quota, so neither is part of baseline CI or maintenance
automation.
