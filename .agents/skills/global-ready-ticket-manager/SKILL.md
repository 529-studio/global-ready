---
name: global-ready-ticket-manager
description: Plan or refine the Global-Ready backlog, decompose the next canonical milestone, or inspect and manage GitHub Issues and GitHub Project/Kanban metadata with issue-specific acceptance criteria and Definition of Done. Use for project-management and backlog work, whether explicitly requested or implied. Do not use to implement or review one already-ready issue. All GitHub board writes require a two-phase dry-run and the exact phrase APPROVE BOARD WRITE.
---

# Global-Ready ticket manager

Plan only the next meaningful unfinished milestone. Produce actual repository
Issues when write approval exists; never substitute Project draft items.

Before planning, surface material assumptions, source conflicts, and trade-offs.
Prefer the smallest evidence-backed issue set and existing Project schema that
can deliver the milestone. Do not add speculative fields or future-milestone
work. Every proposed mutation must trace to verified evidence and a stated
success/read-back criterion.

Canonical v0.3 documents and current source are jointly authoritative. Treat
interview-first Issues #2–#11 as stale until an approved board migration says
otherwise. For shadowing M2, plan Spring metadata/content-contract work and
browser-direct media only: no learner persistence or backend/database media
bytes. Include media-rights and content-integrity evidence whenever an Issue
touches assets or content publication.

## Boundaries

Use this skill for backlog discovery, milestone decomposition, issue design,
acceptance criteria, Definition of Done, labels, milestones, dependencies, or
GitHub Project fields. Do not use it to write product code, review one issue's
diff, create a delivery branch, or redesign the full M1-M7 backlog.

If the repository, Project, milestone, or intended write scope cannot be
resolved safely, stay read-only and ask for the missing input. Never infer the
approval phrase from intent or from a similar sentence.

## Phase A: read-only proposal

1. Check `gh auth status` without displaying a token and resolve the repository
   with `gh repo view`.
2. Discover Projects accessible to the owner. If multiple Projects are
   plausible, stop and ask the user to select one.
3. Read Project fields/options/items, repository issues, milestones, labels,
   open pull requests, canonical product/architecture/API/milestone/RTM docs,
   current source/tests/build files, and recent Git history.
4. Separate implemented, implemented-but-unverified, missing, contradictory,
   and duplicate work using exact file, symbol, requirement, ADR, issue, or Git
   evidence.
5. Draft five to ten atomic issues for only the next unfinished milestone. Add
   a tracking issue only when it materially improves navigation.
6. Classify each issue as `AI-IMPLEMENT`, `HUMAN-FIRST`, or `AI-REVIEW` and Size
   `S`, `M`, or `L`. Lifecycle, transactions, idempotency, anonymous tokens,
   expiry, security, and migrations default to `HUMAN-FIRST`.
7. Show the full proposed Project schema delta, dependency-ordered summary,
   complete final body of every issue, exact mutation set, risks, ambiguities,
   and questions.
8. Stop. Do not make any GitHub write until the user replies exactly:
   `APPROVE BOARD WRITE`.

Every proposed issue body must contain these evidence-specific sections:

- Outcome
- Current evidence
- Technical scope
- Implementation constraints
- Non-goals
- Dependencies
- Test strategy
- Acceptance criteria
- Definition of Done
- Risks and recovery
- Delivery metadata

The Definition of Done must name issue-specific RED -> GREEN -> REFACTOR
evidence and the affected `PROJECT_STATUS.md` ledger readback. Do not approve
an Issue that omits the media-rights gate where media/content changes apply.

Do not invent paths or symbols. Mark a new symbol's exact name as an
implementation choice while naming its verified target module and
responsibility. Define product acceptance as observable behavior; define Done
as issue-specific objective evidence with exact verification commands.

## Phase B: approved write

Only after the exact approval phrase:

1. Re-read issues and Project items to detect drift since Phase A.
2. Apply only the approved missing schema/labels/options.
3. Create missing repository Issues with `gh issue create`, add each Issue to
   the selected Project, and set only approved field values.
4. Create supported relationships or record textual dependencies and disclose
   that limitation.
5. Read back every Issue and Project item. Verify body completeness, labels,
   fields, URLs, dependencies, and deduplication.
6. Return `Issue URL -> Project item ID -> field values -> dependencies`.

Never modify source, create a branch, push, open a pull request, auto-merge, or
print credentials as part of this skill.

Auto-merge must never be enabled; a human performs the final merge explicitly.
