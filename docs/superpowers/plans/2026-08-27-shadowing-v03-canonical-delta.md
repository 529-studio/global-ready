# Shadowing v0.3 Canonical Delta Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the active interview-first v0.2 planning contract with one internally consistent v0.3 shadowing-first canonical contract and its repository workflow enforcement, without changing product source or GitHub state.

**Architecture:** This is one HUMAN-FIRST M0.3 documentation/workflow Issue delivered on one branch and one manually merged PR. Canonical documents define a Spring read-only shadowing content API, browser-direct media, transient learner state, media-rights gates, an M2 pilot MVP, and an M3 Spring portfolio gate; executable documentation checks prevent the repository, templates, and skills from drifting back to the old boundary.

**Tech Stack:** Markdown, Node.js 24 documentation validator, GitHub Issue Form YAML, GitHub PR Markdown, repository `AGENTS.md` and `SKILL.md` instructions, Bash verification harness, existing GitHub Actions CI.

**Spec:** `docs/13_SHADOWING_FIRST_IMPLEMENTATION_PLAN.md`

## Global Constraints

- Execute only after one implementation-ready HUMAN-FIRST M0.3 GitHub Issue exists and the owner has approved its architecture checkpoint; the current Issues #2–#11 are not that Issue.
- Use one dedicated Issue branch. Preserve the current dirty edits in `AGENTS.md`, nested instructions, `docs/12_CODEX_WORKFLOW.md`, the PR template, both status ledgers, and the approved design file.
- Do not change backend or frontend product source, dependencies, lockfiles, Dockerfiles, Compose services, CI job topology, Dependabot cadence, hooks, GitHub settings, Issues, Project fields, or storage providers.
- Do not commit, push, open a PR, or write GitHub state unless the owner separately authorises that external write.
- Every authorised commit in this plan updates both `backend/PROJECT_STATUS.md` and `frontend/PROJECT_STATUS.md` with the resulting contract capability, exact verification evidence, and the M0.3 Issue/canonical-decision reference.
- Keep Java 25, Spring Boot 4.1.1, Node 24.19.0, Next.js 16.3.2, React 19.2.8, PostgreSQL/Testcontainers, fake-provider defaults, zero-cost CI, human review, manual merge, and no auto-merge unchanged.
- Media bytes never enter the database or backend transport. The backend exposes metadata/content contracts only; browser media requests go directly to a deterministic local/static origin or a separately approved object store.
- M2 contains no learner account, token, attempt persistence, CV/JD input, STT, microphone capture, AI call, report, progress history, or media upload.
- Application privacy claims are scoped to intentional app persistence, logging, analytics, and transmission. Transcript hiding is UI/accessibility-tree concealment, not access control or DRM.
- Production behavior follows RED -> GREEN -> REFACTOR. This documentation/workflow Issue uses failing drift/contract checks before content changes instead of meaningless unit tests; never commit the deliberate RED state.
- `APPROVE BOARD WRITE` is still required for any later backlog migration. Superseded Issues are never marked Done. Auto-merge is prohibited at every stage.

---

## File Responsibility Map

### Canonical product and architecture

- `docs/01_PRODUCT_BRIEF.md`: product promise, target learner, M2 pilot success, pilot/CV cut lines.
- `docs/02_ASSUMPTIONS_AND_DECISIONS.md`: authoritative owner decisions D-032 through D-041 and explicit scope of retained interview decisions.
- `docs/03_SRS.md`: v0.3 journeys, requirements, business rules, non-functional boundaries, and acceptance scenarios.
- `docs/04_ARCHITECTURE.md`: Spring shadowing module, manifest/VTT authority, browser-direct media, frontend state boundary, and retained future interview architecture.
- `docs/05_DATA_AND_API.md`: public exercise response/error contract and explicit no-M2-persistence/no-media-byte boundary.
- `docs/06_OPEN_QUESTIONS.md`: non-blocking pilot, content, storage, M3, and future-STT questions with fallbacks.
- `docs/adr/0005-shadowing-content-and-media-boundary.md`: durable architecture decision and consequences.

### Milestones, traceability, and readiness

- `docs/07_MILESTONE_RULES.md`: architecture authority, TDD evidence, rights gate, manual merge, and generalized checkpoint rules.
- `docs/08_MILESTONE_PLAN.md`: M0.3 canonical closure, M2 pilot MVP, M3 portfolio/CV MVP, conditional later milestones.
- `docs/09_TRACEABILITY.md`: every v0.3 MUST/rule/scenario mapped to milestone, automated/manual evidence, and reviewer.
- `docs/10_CHANGELOG_AND_READINESS.md`: v0.2 -> v0.3 audit decisions, current readiness, and honest limitations.
- `docs/11_M1_IMPLEMENTATION_HANDOFF.md`: dated addendum preserving M1 facts while replacing the stale next gate.
- `docs/13_SHADOWING_FIRST_IMPLEMENTATION_PLAN.md`: historical design/audit record pointing to adopted canonical sources after the delta lands.

### Repository operating contract

- `README.md`: current product direction, clean-clone commands, pilot/CV boundaries, and media/storage constraints.
- `AGENTS.md`, `backend/AGENTS.md`, `frontend/AGENTS.md`: effective agent instructions with M2-specific and future-interview scopes.
- `docs/12_CODEX_WORKFLOW.md`: human/Codex responsibilities, Issue/branch/PR flow, TDD, rights, status, and manual-merge rules.
- `CLAUDE_MILESTONE_PROMPT.md`: historical banner that prevents the old WebRTC/private-alpha prompt from acting as current authority.
- `MEDIA_NOTICE.md`: code/media license separation and public non-personal attestation requirements; it contains no participant identity or private release.

### Intake and enforcement

- `.github/ISSUE_TEMPLATE/feature.yml`, `bug.yml`, `technical-chore.yml`: required architecture/TDD/media-rights intake evidence.
- `.github/pull_request_template.md`: RED/GREEN/REFACTOR, architecture approval, media rights, privacy, recovery, and manual-merge evidence.
- `.agents/skills/global-ready-ticket-manager/SKILL.md`: v0.3 next-boundary discovery, stale-backlog handling, and board-write gate.
- `.agents/skills/global-ready-issue-delivery/SKILL.md`: approved-design, TDD, rights, status-ledger, and HUMAN-FIRST delivery stops.
- `scripts/fixtures/skill-trigger-cases.json`: explicit, implicit, incomplete, and negative routing fixtures for both skills.
- `scripts/docs-check.mjs`: mechanical canonical markers, requirement/RTM coverage, templates, skills, historical prompt, media notice, status discipline, and no-auto-merge drift checks.
- `backend/PROJECT_STATUS.md`, `frontend/PROJECT_STATUS.md`: actual capability, next delivery boundary, verification, and per-commit evidence.

---

### Task 1: Establish v0.3 authority and ADR

**Files:**

- Modify: `scripts/docs-check.mjs`
- Modify: `docs/01_PRODUCT_BRIEF.md`
- Modify: `docs/02_ASSUMPTIONS_AND_DECISIONS.md`
- Create: `docs/adr/0005-shadowing-content-and-media-boundary.md`
- Modify: `backend/PROJECT_STATUS.md`
- Modify: `frontend/PROJECT_STATUS.md`

**Interfaces:**

- Consumes: owner-approved decisions in `docs/13_SHADOWING_FIRST_IMPLEMENTATION_PLAN.md` sections 1–8 and 11.
- Produces: canonical D-032 through D-041 and ADR-0005, which Tasks 2–7 reference by exact ID.

- [ ] **Step 1: Add the authority drift check and establish RED**

Add this reusable helper after `requireFile` in `scripts/docs-check.mjs`:

```js
function requireMarkers(file, markers) {
  const absolute = path.join(root, file);
  if (!fs.existsSync(absolute)) return;
  const content = fs.readFileSync(absolute, "utf8");
  for (const marker of markers) {
    if (!content.includes(marker)) errors.push(`${file} is missing canonical marker: ${marker}`);
  }
}
```

Add `docs/06_OPEN_QUESTIONS.md`, `docs/07_MILESTONE_RULES.md`,
`docs/11_M1_IMPLEMENTATION_HANDOFF.md`,
`docs/13_SHADOWING_FIRST_IMPLEMENTATION_PLAN.md`, and ADR-0002 through
ADR-0005 to `requiredFiles`, then add these checks:

```js
requireMarkers("docs/01_PRODUCT_BRIEF.md", [
  "Status: Canonical v0.3",
  "guided imitation -> optional repetition -> independent transfer -> reflection",
  "M2 pilot MVP",
  "M3 portfolio/CV MVP",
]);
requireMarkers("docs/02_ASSUMPTIONS_AND_DECISIONS.md", [
  "Status: Canonical v0.3",
  "D-032",
  "D-041",
  "optional repetition",
]);
requireMarkers("docs/adr/0005-shadowing-content-and-media-boundary.md", [
  "# ADR-0005:",
  "Status: Accepted",
  "backend never uploads, stores, proxies, or streams media bytes",
]);
```

Run: `./scripts/verify.sh docs`
Expected: exit non-zero because v0.2 markers remain and ADR-0005 is missing. Confirm the failure names only the intended new markers/files.

- [ ] **Step 2: Rewrite the Product Brief around the approved promise**

Keep the zero-cost portfolio goal, owner as primary learner, no-scoring rule,
and later adaptive interview. Replace the active core loop with this exact
sequence and define both cut lines:

```text
guided imitation -> optional repetition -> independent transfer -> reflection
```

State that M2 is one developer-dialogue pilot backed by a Spring metadata API,
that the browser loads media directly, and that M3 is the first portfolio/CV
cut line with meaningful persistence/transaction/idempotency evidence. Move
pause/replay/rate control into M2 and move STT, accounts, progress, reports,
scenario packs, deployment, and storage-provider selection out of M2.

Define the M2 owner go/no-go rubric with activation difficulty, confidence
before/after practice, whether the four-part shape appears in transfer,
confusing controls/timing/instructions, and whether the flow feels active rather
than passive. State that this formative pilot does not prove learning speed,
retention, pronunciation quality, or population-level effectiveness.

- [ ] **Step 3: Add authoritative decisions D-032 through D-041**

Append these decisions to the table in `docs/02_ASSUMPTIONS_AND_DECISIONS.md`:

```markdown
| D-032 | The first product loop is guided imitation, optional repetition, independent transfer, and reflection for workplace/interview English. | Validates active speaking practice without claiming universal learning superiority. |
| D-033 | M2 includes a public read-only Spring shadowing exercise metadata/content-contract API. | Keeps Java/Spring in the first product slice without inventing persistence. |
| D-034 | Browsers fetch reference media/captions directly; the backend and database never carry media bytes. | Avoids backend bandwidth/storage coupling and database BLOBs. |
| D-035 | One versioned manifest is the exercise source of truth and WebVTT is derived and bijection-validated. | Prevents script, role, timing, and caption drift. |
| D-036 | Repetition is optional in M2. | A fixed replay count lacks pilot evidence. |
| D-037 | Transfer unlocks only after reset, start, no forward seek, and a non-stale native ended event in one playback generation. | Creates a testable reference-playback gate without claiming speech verification. |
| D-038 | M2 learner text is transient application state; privacy claims cover intentional app behavior, and transcript hiding is UI-only concealment. | Browser/OS/extension behavior and public VTT cannot be secured by React state. |
| D-039 | Real human media requires private releases, explicit public/redistribution rights, media-specific notice, non-personal record ID, and multi-artifact hashes. | Public Git history and object storage require provenance beyond a checksum. |
| D-040 | M2 is the pilot MVP; M3 is the portfolio/CV MVP and precedes scenario-pack or STT expansion. | Preserves both product validation and Spring learning value. |
| D-041 | Frontend M2 verification uses Vitest, React Testing Library, and one focused Playwright Chromium flow. | Pure logic stays deterministic while one test proves the real browser boundary. |
```

Add a scope paragraph immediately after the decision table: D-009 through
D-030 remain authoritative only for future adaptive interview/persisted work
unless a global privacy/no-score/fake-provider rule explicitly applies to M2.

- [ ] **Step 4: Create ADR-0005**

Use sections `Context`, `Decision`, `Consequences`, and `Recovery`. Record:

- package boundary `com.globalready.shadowing`;
- `GET /api/v1/shadowing-exercises/{exerciseId}` as public metadata only;
- one manifest source, derived WebVTT, media clock, and generation-based
  complete-pass gate;
- direct browser media requests and no database/backend media bytes;
- transient no-capture M2 learner state and UI-only concealment;
- no selected cloud provider and no cloud credential in clean clone/CI;
- recovery by disabling/removing the M2 route/API without data migration.

Do not fix exact Java class names, reducer names, codec, resolution, file-size
budget, object-store provider, or rendering callback in the ADR.

- [ ] **Step 5: Turn GREEN and record the intermediate boundary**

Update both status ledgers to `Last updated: 2026-08-27` and add this evidence
row, tailored only by “backend”/“frontend” wording:

```markdown
| 2026-08-27 | Established v0.3 product authority and ADR-0005 for shadowing-first, Spring metadata, direct media, privacy, rights, and M2/M3 cut lines; product runtime remains unchanged and M0.3 is still in progress. | `./scripts/verify.sh docs` | M0.3 canonical-delta Issue / owner-approved `docs/13_SHADOWING_FIRST_IMPLEMENTATION_PLAN.md` |
```

Run: `./scripts/verify.sh docs`
Expected: exit 0 with all hook fixtures passing.

- [ ] **Step 6: Commit only with explicit commit authorisation**

```bash
git add scripts/docs-check.mjs docs/01_PRODUCT_BRIEF.md docs/02_ASSUMPTIONS_AND_DECISIONS.md docs/adr/0005-shadowing-content-and-media-boundary.md backend/PROJECT_STATUS.md frontend/PROJECT_STATUS.md
git commit -m "docs: establish shadowing v0.3 authority"
```

If commit authority is absent, stop after GREEN and report the exact prepared
commit command without executing it.

---

### Task 2: Canonicalize requirements, architecture, API, and traceability

**Files:**

- Modify: `scripts/docs-check.mjs`
- Modify: `docs/03_SRS.md`
- Modify: `docs/04_ARCHITECTURE.md`
- Modify: `docs/05_DATA_AND_API.md`
- Modify: `docs/06_OPEN_QUESTIONS.md`
- Modify: `docs/09_TRACEABILITY.md`
- Modify: `backend/PROJECT_STATUS.md`
- Modify: `frontend/PROJECT_STATUS.md`

**Interfaces:**

- Consumes: D-032 through D-041 and ADR-0005.
- Produces: FR-100–FR-109, BR-100–BR-103, NFR-050–NFR-054, AS-09–AS-14, and the public exercise response/error contract.

- [ ] **Step 1: Extend contract checks and establish RED**

Add canonical marker checks for:

```js
requireMarkers("docs/03_SRS.md", [
  "Status: Canonical v0.3",
  "FR-100 MUST",
  "FR-109 MUST",
  "BR-100",
  "BR-103",
  "NFR-050 MUST",
  "NFR-054 MUST",
  "AS-09",
  "AS-14",
]);
requireMarkers("docs/04_ARCHITECTURE.md", [
  "com.globalready.shadowing",
  "browser-direct media",
  "ADR-0005",
]);
requireMarkers("docs/05_DATA_AND_API.md", [
  "`GET /shadowing-exercises/{exerciseId}`",
  "M2 adds no table or migration",
  "never proxies media bytes",
]);
requireMarkers("docs/09_TRACEABILITY.md", [
  "FR-100–FR-109",
  "BR-100–BR-103",
  "NFR-050–NFR-054",
  "AS-09–AS-14",
]);
```

Also append `` "`GET /shadowing-exercises/{exerciseId}`" `` to
`requiredContractMarkers` without removing retained future interview endpoints.

Run: `./scripts/verify.sh docs`
Expected: exit non-zero listing the new SRS/architecture/API/RTM markers.

- [ ] **Step 2: Add the M2 journey and exact requirement IDs to the SRS**

Add definitions for `Shadowing exercise`, `Playback generation`, `Independent
transfer`, and `UI concealment`. Add an M2 journey matching design section 5.
Add these requirements with normative language:

```markdown
- **FR-100 MUST:** The browser shall load one available public shadowing exercise contract from Spring without learner identity or attempt persistence.
- **FR-101 MUST:** Audible reference playback shall start only after an explicit learner action.
- **FR-102 MUST:** Guided imitation shall identify the active speaker and target developer cue from the media/WebVTT clock.
- **FR-103 MUST:** The learner may pause, move backward, change supported rate, and optionally repeat reference material without a mandatory replay count.
- **FR-104 MUST:** Transfer shall unlock only after a playback generation is reset to the beginning, started, not forward-seeked, and completed by a non-stale native ended event.
- **FR-105 MUST:** A forward seek, reset, source replacement, unmount, or fatal media error shall invalidate the current playback generation.
- **FR-106 MUST:** During transfer, transcript, cue text, key chunks, and reveal controls shall not be rendered or exposed in the product accessibility tree.
- **FR-107 MUST:** The learner shall complete transfer through speaking self-attestation or non-empty transient text; the system shall not claim speech verification.
- **FR-108 MUST:** After transfer completion, the source and four-part reflection checklist shall become available.
- **FR-109 MUST:** Media/caption loading failures shall keep transfer locked and provide truthful retry or fatal-error guidance.
```

Add these business rules:

```markdown
- **BR-100:** Playback completion is scoped to one source generation and stale events cannot complete a newer generation.
- **BR-101:** Reference playback is system-observed; learner speaking is self-attested.
- **BR-102:** The versioned manifest is the exercise source of truth and WebVTT is derived with one-to-one cue validation.
- **BR-103:** M2 creates no persisted learner attempt, progress, transcript, audio, or report.
```

Add these non-functional requirements:

```markdown
- **NFR-050 MUST:** The M2 application shall not intentionally persist, log, analytics-track, or transmit learner transfer content.
- **NFR-051 MUST:** Clean clone and CI shall run with deterministic local media/caption fixtures and no provider or cloud-storage key.
- **NFR-052 MUST:** Human media publication shall fail closed without approved rights metadata, media notice, release-record reference, and matching artifact hashes.
- **NFR-053 MUST:** Essential M2 controls, state, errors, transfer concealment, text fallback, and reflection shall be keyboard and accessibility-tree usable without live-region spam or visual-only instruction.
- **NFR-054 MUST:** The backend and database shall not upload, store, proxy, stream, or persist video, image, caption, or audio bytes.
```

Add AS-09 through AS-14 for complete pass, forward-seek invalidation,
privacy/concealment, media failure/retry, clean-clone direct delivery, and
rights/integrity fail-closed behavior using these exact scenarios:

```markdown
### AS-09 — Complete reference pass

Given a ready exercise, when the learner resets, starts from the beginning,
does not seek forward, and the current playback generation receives a native
ended event, then transfer becomes available and the UI states only that
reference playback completed.

### AS-10 — Forward seek invalidates completion

Given an active playback generation, when the learner seeks forward, then that
generation cannot unlock transfer and a new pass must restart from the
beginning.

### AS-11 — Transfer privacy and concealment

Given transfer mode, when the rendered UI, accessibility tree, application
storage, URL, logs, analytics, and app-originated network sinks are inspected,
then source content is absent from the UI/accessibility tree and learner text
is absent from every intentional persistence, logging, analytics, and
transmission sink.

### AS-12 — Media failure and stale recovery

Given a media/caption failure, when Retry resets the exercise, then transfer
remains locked and late events from the failed generation cannot mutate the
new generation.

### AS-13 — Zero-key direct media path

Given a clean clone with no Gemini or cloud-storage key, when the fixture
exercise runs, then Spring serves metadata, the browser fetches media/captions
directly, and no hosted media/provider service is required.

### AS-14 — Rights and integrity fail closed

Given incomplete rights metadata or an artifact hash mismatch, when content
validation runs, then the human media asset is rejected and the deterministic
fixture remains available for automated verification.
```

Retain v0.2 interview requirements under an explicit “future adaptive
interview contract” scope rather than deleting their history or reporting them
implemented.

- [ ] **Step 3: Define architecture boundaries without premature symbols**

Add architecture sections for:

- `com.globalready.shadowing` API/application-domain/content-adapter boundary;
- manifest source of truth and derived WebVTT validation;
- Spring response metadata versus browser-direct media requests;
- frontend API adapter, playback state machine, media adapter, guided view,
  transfer view, and reflection view;
- event sequence for reset/start/no-forward-seek/native-ended completion;
- transient privacy and UI-only concealment threat boundary;
- Vitest/RTL/Playwright plus MockMvc verification levels.

Update the ADR index to include ADR-0005. Preserve the interview aggregate,
provider, transaction, token, expiry, and report sections with an explicit M3+
future-adaptive scope.

- [ ] **Step 4: Add the public exercise API contract**

Under base path `/api/v1`, define `GET
/shadowing-exercises/{exerciseId}` with no auth or idempotency key in M2. Use
this stable response shape as the planning contract:

```json
{
  "id": "architecture-trade-off",
  "version": 1,
  "title": "Explain an architecture trade-off",
  "targetRole": "DEVELOPER",
  "media": {
    "url": "/media/shadowing/architecture-trade-off-v1.mp4",
    "captionsUrl": "/media/shadowing/architecture-trade-off-v1.vtt",
    "expectedDurationMs": 45000,
    "assetVersion": "v1",
    "sha256": "synthetic-documentation-example-not-an-asset-hash"
  },
  "cues": [
    {
      "id": "cue-001",
      "startMs": 0,
      "endMs": 4000,
      "speaker": "DEVELOPER",
      "text": "I chose the modular approach because the transaction boundary stays explicit.",
      "intentVi": "Nêu quyết định và lý do",
      "keyChunks": ["I chose", "because", "transaction boundary"]
    }
  ],
  "transfer": {
    "prompt": "Explain a trade-off from your own project.",
    "checklist": ["Context", "Decision or action", "Reasoning or evidence", "Result or next step"]
  },
  "rights": {
    "recordId": "FIXTURE-NONPERSON-001",
    "publicationScope": "PUBLIC_REPOSITORY_AND_DEMO",
    "coveredAssetSha256": "synthetic-documentation-example-not-an-asset-hash",
    "status": "CLEARED"
  }
}
```

State explicitly that the example hashes are documentation literals and never
accepted asset hashes. Specify correlated `404 application/problem+json` for
unknown/inactive exercise and fail-closed validation for an invalid manifest.
State “M2 adds no table or migration” and “the backend never proxies media
bytes.”

- [ ] **Step 5: Rebuild RTM and open-question scope**

Map:

- FR-100–FR-109 and BR-100–BR-103 to M2;
- NFR-050–NFR-054 to M0.3/M2 as applicable;
- AS-09–AS-14 to named MockMvc, Vitest, RTL, Playwright, content-validator,
  smoke, and manual owner evidence;
- retained interview IDs to M3 or conditional later milestones, never M2.

Add reviewer columns with `HUMAN-FIRST` for architecture/privacy/rights and
`AI-IMPLEMENT` or `AI-REVIEW` only for approved deterministic mechanics.

Replace stale open-question claims with Q-401 learning generalisability,
Q-402 future R2/GCS selection, Q-403 real human content production, Q-404 M3
persisted product boundary, and Q-405 post-shadow STT. Record the deterministic
fixture, no-cloud, text fallback, and defer-expansion fallbacks so none blocks
M0.3 or M2 fixture implementation.

- [ ] **Step 6: Turn GREEN, update status, and commit if authorised**

Add one dated status row to both ledgers stating that the v0.3 SRS/API/RTM now
define the Spring metadata/direct-media M2 boundary while runtime remains M1.

Run: `./scripts/verify.sh docs`
Expected: exit 0; RTM mechanically covers every SRS ID and the API marker check
retains both shadowing and future interview endpoints.

```bash
git add scripts/docs-check.mjs docs/03_SRS.md docs/04_ARCHITECTURE.md docs/05_DATA_AND_API.md docs/06_OPEN_QUESTIONS.md docs/09_TRACEABILITY.md backend/PROJECT_STATUS.md frontend/PROJECT_STATUS.md
git commit -m "docs: define shadowing requirements and contracts"
```

Execute the commit only with explicit commit authorisation.

---

### Task 3: Reorder milestones and reconcile readiness

**Files:**

- Modify: `scripts/docs-check.mjs`
- Modify: `docs/07_MILESTONE_RULES.md`
- Modify: `docs/08_MILESTONE_PLAN.md`
- Modify: `docs/09_TRACEABILITY.md`
- Modify: `docs/10_CHANGELOG_AND_READINESS.md`
- Modify: `docs/11_M1_IMPLEMENTATION_HANDOFF.md`
- Modify: `backend/PROJECT_STATUS.md`
- Modify: `frontend/PROJECT_STATUS.md`

**Interfaces:**

- Consumes: v0.3 IDs and boundaries from Task 2.
- Produces: one unambiguous M0.3 -> M2 -> M3 ordering and honest current readiness gate.

- [ ] **Step 1: Add milestone drift markers and establish RED**

Require these markers:

```js
requireMarkers("docs/07_MILESTONE_RULES.md", [
  "Status: Canonical v0.3",
  "RED -> GREEN -> REFACTOR",
  "media-rights gate",
  "manual merge",
]);
requireMarkers("docs/08_MILESTONE_PLAN.md", [
  "## M0.3 — Shadowing canonical closure",
  "## M2 — Shadowing pilot MVP",
  "## M3 — Spring portfolio/CV MVP",
  "M2 go/no-go",
]);
requireMarkers("docs/10_CHANGELOG_AND_READINESS.md", [
  "v0.2 -> v0.3",
  "CANONICAL v0.3 READY; M2 BACKLOG NOT YET APPROVED",
]);
requireMarkers("docs/11_M1_IMPLEMENTATION_HANDOFF.md", [
  "2026-08-27 addendum",
  "M2 — Shadowing pilot MVP",
]);
```

Run: `./scripts/verify.sh docs`
Expected: exit non-zero naming the four stale milestone/readiness documents.

- [ ] **Step 2: Generalize milestone rules**

Replace “Which v0.2 requirement requires it?” with “Which current canonical
requirement or approved ADR requires it?” Add rules that:

- owner approval precedes architecture/public-contract/security/privacy/media
  rights changes;
- production behavior records RED/GREEN/REFACTOR evidence;
- documentation/config work uses executable validation when practical;
- every real human asset passes the media-rights gate;
- one Issue maps to one branch/PR and every commit updates the applicable
  status ledger;
- human review and manual merge are mandatory; auto-merge never runs.

Replace checkpoints with M1 scaffold, M0.3 canonical, M2 shadowing pilot, M3
portfolio, and conditional later adaptive/report/privacy checkpoints.

- [ ] **Step 3: Rewrite the milestone plan**

Preserve M1 as completed evidence. Define:

- M0.3: canonical/workflow-only delta, no product source;
- M2: one Spring metadata + browser-direct-media shadowing exercise, transient
  transfer/reflection, deterministic fixture, and owner go/no-go;
- M3: product-justified Spring persistence, transactions, idempotency,
  PostgreSQL/Testcontainers, security/privacy, and recovery;
- conditional later milestones: scenario pack, post-shadow STT, adaptive
  interview, reports, retention/deletion, and portfolio hardening.

Define “pilot MVP = M2” and “portfolio/CV MVP = M3.” Do not invent M3
persistence solely to demonstrate JPA. Retain global no-score, text fallback,
fake-provider, privacy, and zero-cost rules.

- [ ] **Step 4: Reconcile RTM, changelog, and M1 handoff**

Ensure every Task 2 requirement maps to the rewritten milestones. Add a v0.2
-> v0.3 changelog section covering GR-A01–GR-A13 and owner decisions. Set the
readiness result to:

```text
CANONICAL v0.3 READY; M2 BACKLOG NOT YET APPROVED
```

This means the specification is ready but product coding still waits for the
canonical PR merge and a separately approved backlog write.

Add a `2026-08-27 addendum` to the M1 handoff. Preserve all original dated
generation limitations, then record the later successful CI/clean-clone
evidence already cited by the audit and replace only the stale “anonymous draft
session” next gate with M2 shadowing pilot planning.

- [ ] **Step 5: Turn GREEN, update status, and commit if authorised**

Add one dated row to both ledgers for the approved M0.3/M2/M3 ordering and the
remaining no-backlog/no-product-code limitation.

Run: `./scripts/verify.sh docs`
Expected: exit 0 and no stale active milestone marker.

```bash
git add scripts/docs-check.mjs docs/07_MILESTONE_RULES.md docs/08_MILESTONE_PLAN.md docs/09_TRACEABILITY.md docs/10_CHANGELOG_AND_READINESS.md docs/11_M1_IMPLEMENTATION_HANDOFF.md backend/PROJECT_STATUS.md frontend/PROJECT_STATUS.md
git commit -m "docs: reorder shadowing delivery milestones"
```

Execute the commit only with explicit commit authorisation.

---

### Task 4: Define media licensing and attestation without adding media

**Files:**

- Create: `MEDIA_NOTICE.md`
- Modify: `README.md`
- Modify: `scripts/docs-check.mjs`
- Modify: `backend/PROJECT_STATUS.md`
- Modify: `frontend/PROJECT_STATUS.md`

**Interfaces:**

- Consumes: D-034, D-035, D-039, ADR-0005, and NFR-052/NFR-054.
- Produces: a public media-rights contract usable by future M2 content Issues without storing private releases or selecting cloud storage.

- [ ] **Step 1: Add media notice checks and establish RED**

Add `MEDIA_NOTICE.md` to `requiredFiles` and require:

```js
requireMarkers("MEDIA_NOTICE.md", [
  "Source-code license does not grant media rights",
  "Private release records stay outside Git",
  "PUBLIC_REPOSITORY_AND_DEMO",
  "SHA-256",
  "No approved human media assets are present",
]);
```

Run: `./scripts/verify.sh docs`
Expected: exit non-zero because `MEDIA_NOTICE.md` is missing.

- [ ] **Step 2: Create the media notice contract**

State that MIT covers source code only unless an asset entry explicitly says
otherwise. State that no approved human media asset is present at M0.3. Define
one registry row per future asset with these non-personal fields:

```markdown
| Asset ID | Version | Media license | Release-record ID | Publication scope | MP4 SHA-256 | Manifest SHA-256 | WebVTT SHA-256 | Script SHA-256 | Status |
```

Allowed publication scope is `PUBLIC_REPOSITORY_AND_DEMO`. `Status` is
`FIXTURE` or `CLEARED`; an absent/mismatched field is not publishable. Explicitly
state “Private release records stay outside Git,” list record/edit/public-demo/
redistribution rights, and state that deletion from HEAD cannot guarantee
revocation from history/forks/caches.

Document that the deterministic non-person fixture may be committed for tests
and that a storage provider remains unselected.

- [ ] **Step 3: Link the contract from README and turn GREEN**

Add a short README media boundary that links `MEDIA_NOTICE.md`, states “Source-
code license does not grant media rights,” and repeats that database/backend
transport never carries media bytes.

Add one status-ledger row per surface: media publication now has a documented
gate, but no real human media, cloud storage, or product code was added.

Run: `./scripts/verify.sh docs`
Expected: exit 0 and local Markdown link validation succeeds.

- [ ] **Step 4: Commit if authorised**

```bash
git add MEDIA_NOTICE.md README.md scripts/docs-check.mjs backend/PROJECT_STATUS.md frontend/PROJECT_STATUS.md
git commit -m "docs: define media rights and provenance gate"
```

Execute the commit only with explicit commit authorisation.

---

### Task 5: Align repository instructions and historical sources

**Files:**

- Modify: `README.md`
- Modify: `AGENTS.md`
- Modify: `backend/AGENTS.md`
- Modify: `frontend/AGENTS.md`
- Modify: `docs/12_CODEX_WORKFLOW.md`
- Modify: `CLAUDE_MILESTONE_PROMPT.md`
- Modify: `scripts/docs-check.mjs`
- Modify: `backend/PROJECT_STATUS.md`
- Modify: `frontend/PROJECT_STATUS.md`

**Interfaces:**

- Consumes: all canonical decisions and milestones from Tasks 1–4.
- Produces: effective human/Codex instructions that select M2 shadowing and cannot interpret old interview/WebRTC material as current authority.

- [ ] **Step 1: Add instruction-source drift checks and establish RED**

Add `CLAUDE_MILESTONE_PROMPT.md` to `requiredFiles` and require:

```js
requireMarkers("AGENTS.md", [
  "## M2 shadowing invariants",
  "## Future adaptive interview invariants",
  "Auto-merge must never be enabled",
]);
requireMarkers("backend/AGENTS.md", [
  "metadata/content contract",
  "must not transport media bytes",
]);
requireMarkers("frontend/AGENTS.md", [
  "UI-only concealment",
  "must not claim speech verification",
]);
requireMarkers("docs/12_CODEX_WORKFLOW.md", [
  "Media-rights gate",
  "M2 shadowing Issue",
  "Auto-merge must never be enabled",
]);
requireMarkers("CLAUDE_MILESTONE_PROMPT.md", [
  "HISTORICAL NON-CANONICAL PROMPT",
  "Do not use this file to select current work",
]);
```

Run: `./scripts/verify.sh docs`
Expected: exit non-zero naming the missing v0.3 instruction markers.

- [ ] **Step 2: Scope root and nested AGENTS instructions**

Preserve the approved architecture authority and TDD edits already in the
working tree. Rename the current global domain section to `Future adaptive
interview invariants` and state it applies only once that canonical milestone
opens. Add `M2 shadowing invariants` with:

- Spring owns metadata/content contract only;
- browser fetches media/captions directly;
- no database/backend media bytes;
- manifest source, derived WebVTT, complete-pass generation semantics;
- speaking self-attestation and UI-only concealment;
- no M2 learner persistence/capture/provider;
- rights gate before real human asset merge;
- Vitest/RTL/Playwright plus MockMvc planned evidence;
- auto-merge never enabled.

In backend instructions, forbid media byte transport and JPA use in the M2
shadowing module. In frontend instructions, require transient text, scoped
privacy copy, UI-only concealment, no speech-verification claim, browser event
cleanup, and direct media requests.

- [ ] **Step 3: Align workflow documentation and README**

Update README’s product statement, repository map, M1 boundaries, MVP section,
documentation list, CV rule, and next gate. Preserve exact run/verify commands
and actual locked versions.

In `docs/12_CODEX_WORKFLOW.md`, preserve existing hook/project/CI details and
the local architecture/TDD additions. Add:

- canonical design -> implementation plan -> one ready Issue -> branch -> RED/
  GREEN/REFACTOR -> PR -> human review -> manual merge;
- the M2 media-rights gate and public-attestation/private-release split;
- status-ledger evidence for every commit;
- no board mutation without exact approval;
- no auto-merge, deploy, paid API, Codex Action, or required Codex review.

- [ ] **Step 4: Quarantine the stale Claude prompt**

Prepend this banner without rewriting the historical prompt body:

```markdown
> **HISTORICAL NON-CANONICAL PROMPT**
>
> This file records superseded private-alpha/WebRTC planning assumptions.
> Do not use this file to select current work. Current authority is
> `docs/01_PRODUCT_BRIEF.md` through `docs/12_CODEX_WORKFLOW.md`, their ADRs,
> and current source/test evidence.
```

- [ ] **Step 5: Turn GREEN, update status, and commit if authorised**

Update the top status line in both ledgers from “awaiting external audit” to
“M0.3 canonical delta in progress; product runtime remains M1.” Replace the
frontend-only wording with the approved Spring metadata + frontend direct-media
boundary. Add one dated instruction-alignment row to each ledger.

Run: `./scripts/verify.sh docs`
Expected: exit 0; existing 14 hook tests remain green.

```bash
git add README.md AGENTS.md backend/AGENTS.md frontend/AGENTS.md docs/12_CODEX_WORKFLOW.md CLAUDE_MILESTONE_PROMPT.md scripts/docs-check.mjs backend/PROJECT_STATUS.md frontend/PROJECT_STATUS.md
git commit -m "docs: align repository workflow with shadowing v0.3"
```

Execute the commit only with explicit commit authorisation.

---

### Task 6: Enforce v0.3 intake and Issue delivery

**Files:**

- Modify: `.github/ISSUE_TEMPLATE/feature.yml`
- Modify: `.github/ISSUE_TEMPLATE/bug.yml`
- Modify: `.github/ISSUE_TEMPLATE/technical-chore.yml`
- Modify: `.github/pull_request_template.md`
- Modify: `.agents/skills/global-ready-ticket-manager/SKILL.md`
- Modify: `.agents/skills/global-ready-issue-delivery/SKILL.md`
- Modify: `scripts/fixtures/skill-trigger-cases.json`
- Modify: `scripts/docs-check.mjs`
- Modify: `backend/PROJECT_STATUS.md`
- Modify: `frontend/PROJECT_STATUS.md`

**Interfaces:**

- Consumes: v0.3 canonical/current-evidence priority, TDD contract, rights gate, HUMAN-FIRST boundary, and approved milestone order.
- Produces: deterministic intake/delivery prompts that require the same evidence as the canonical contract.

- [ ] **Step 1: Strengthen template/skill checks and establish RED**

Extend `requiredIssueFormMarkers` with:

```js
"id: architecture_decision",
"id: tdd_evidence",
"id: media_rights",
```

Extend `requiredPrMarkers` with:

```js
"Media rights and content provenance",
"RED — test/check command and intended failure reason",
"Auto-merge is disabled",
```

For each repository skill, require `RED -> GREEN -> REFACTOR`,
`PROJECT_STATUS.md`, `media-rights`, and `Auto-merge` markers. Preserve the
existing exact-two-skills and four-case fixture checks.

Extend the CI forbidden-marker check with `auto-merge`, `automerge`, and
`gh pr merge --auto` so repository workflow files cannot silently enable it.

Run: `./scripts/verify.sh docs`
Expected: exit non-zero listing missing form/template/skill markers.

- [ ] **Step 2: Add required Issue Form fields**

Add these required fields to all three forms, adapting descriptions for
feature, bug, or chore without changing the IDs:

```yaml
  - type: textarea
    id: architecture_decision
    attributes:
      label: Architecture decision and approval
      description: Cite the canonical boundary/ADR and owner approval, or prove that no architecture/public-contract/security/privacy decision changes.
    validations:
      required: true

  - type: textarea
    id: tdd_evidence
    attributes:
      label: RED, GREEN, and refactor evidence plan
      description: Name the smallest failing test/check, intended failure reason, passing command, and refactor verification. Documentation/config work uses an executable validator when practical.
    validations:
      required: true

  - type: textarea
    id: media_rights
    attributes:
      label: Media rights and content provenance
      description: Cite the MEDIA_NOTICE asset/release/hash evidence, or explain why no media/content asset is added or changed.
    validations:
      required: true
```

- [ ] **Step 3: Complete the PR template contract**

Preserve the local `Architecture and TDD evidence` section. Add:

```markdown
## Media rights and content provenance

- Media/content assets changed, or justified none:
- `MEDIA_NOTICE.md` asset/release-record entry:
- MP4/manifest/WebVTT/script SHA-256 readback:
- [ ] No private release, participant identity, credential, or unapproved asset is in Git or artifacts.
```

Add final checks:

```markdown
- [ ] Auto-merge is disabled; merge remains an explicit human action.
- [ ] Browser/backend/database media-byte boundary remains unchanged, or an owner-approved ADR is linked.
```

- [ ] **Step 4: Update both repository skills and fixtures**

Ticket-manager additions:

- treat canonical v0.3 + current source as authority and flag Issues #2–#11 as
  stale until approved migration;
- require media-rights/content-integrity scope and M2 no-persistence boundary;
- require Issue-specific RED/GREEN/REFACTOR and status-ledger evidence;
- keep Phase A read-only and exact board-write approval;
- prohibit auto-merge.

Issue-delivery additions:

- require the approved design/ADR and RED test/check before production change;
- stop for rights/privacy/public-contract changes not approved by the Issue;
- verify no backend/database media bytes and no M2 learner persistence;
- require affected status ledgers in every commit;
- prohibit auto-merge even when all checks pass.

Update the ticket-manager implicit fixture to mention “canonical v0.3 next
unfinished milestone” and the issue-delivery implicit fixture to mention RED/
GREEN evidence and status-ledger readback. Preserve exactly explicit,
implicit, incomplete, and negative cases for each skill.

- [ ] **Step 5: Turn GREEN, update status, and commit if authorised**

Add one status row per surface describing enforceable v0.3 intake/delivery
evidence with no GitHub setting or board mutation.

Run: `./scripts/verify.sh docs`
Expected: exit 0; both skills have exactly four trigger fixtures and all Issue
Forms/PR markers pass.

```bash
git add .github/ISSUE_TEMPLATE/feature.yml .github/ISSUE_TEMPLATE/bug.yml .github/ISSUE_TEMPLATE/technical-chore.yml .github/pull_request_template.md .agents/skills/global-ready-ticket-manager/SKILL.md .agents/skills/global-ready-issue-delivery/SKILL.md scripts/fixtures/skill-trigger-cases.json scripts/docs-check.mjs backend/PROJECT_STATUS.md frontend/PROJECT_STATUS.md
git commit -m "docs: enforce shadowing delivery contracts"
```

Execute the commit only with explicit commit authorisation.

---

### Task 7: Reconcile the design record and prove the complete M0.3 delta

**Files:**

- Modify: `docs/13_SHADOWING_FIRST_IMPLEMENTATION_PLAN.md`
- Modify: `docs/10_CHANGELOG_AND_READINESS.md`
- Modify: `backend/PROJECT_STATUS.md`
- Modify: `frontend/PROJECT_STATUS.md`
- Verify unchanged: `.github/workflows/ci.yml`
- Verify unchanged: `.github/dependabot.yml`
- Verify unchanged: `.codex/hooks.json`
- Verify unchanged: `.codex/hooks/pre-tool-use.mjs`
- Verify unchanged: `.codex/hooks/stop-verification.mjs`
- Verify unchanged: `backend/src/**`
- Verify unchanged: `frontend/src/**`

**Interfaces:**

- Consumes: all prior task outputs.
- Produces: a self-consistent, fully verified M0.3 canonical delta ready for owner review and manual PR merge; it does not authorise M2 code or board mutation.

- [ ] **Step 1: Mark the design as adopted input, not competing authority**

Change the design status to state that its approved decisions were incorporated
into canonical v0.3, that canonical docs/ADRs now take precedence, and that the
file remains an audit/disposition record. Do not delete GR-A01–GR-A13 closure
evidence or rewrite it as product implementation evidence.

- [ ] **Step 2: Finalize honest readiness and status ledgers**

Keep the changelog gate text:

```text
CANONICAL v0.3 READY; M2 BACKLOG NOT YET APPROVED
```

Set backend status to “M1 runtime complete; canonical M2 Spring shadowing
content-contract boundary ready for backlog planning.” Set frontend status to
“M1 shell complete; canonical M2 shadowing practice boundary ready for backlog
planning.” In both, state explicitly that no M2 product behavior exists yet.

Add a final ledger row listing the exact verification commands actually run.
If any command fails because of the environment, record the failure and keep
the readiness gate blocked rather than writing a passing claim.

- [ ] **Step 3: Scan for active contradictions and secrets**

Run:

```bash
rg -n "Status: Canonical v0\.2|awaiting external audit|frontend-only synchronized shadowing|Only then open M2: anonymous draft session|M2 — Anonymous draft session" README.md AGENTS.md backend frontend docs .agents .github CLAUDE_MILESTONE_PROMPT.md
```

Expected: no active-current claim. Historical v0.2 text is allowed only inside
clearly dated changelog/audit/history sections or below the historical prompt
banner.

Run:

```bash
rg -n "ghp_[A-Za-z0-9]+|github_pat_[A-Za-z0-9_]+|AIza[0-9A-Za-z_-]+|OPENAI_API_KEY=|GEMINI_API_KEY=[^[:space:]]+" README.md AGENTS.md backend frontend docs .agents .github MEDIA_NOTICE.md CLAUDE_MILESTONE_PROMPT.md
```

Expected: no secret/token match. Empty-key CI configuration is allowed and
must remain empty.

- [ ] **Step 4: Prove YAML, drift checks, and unchanged automation**

Run:

```bash
ruby -e 'require "yaml"; Dir[".github/ISSUE_TEMPLATE/*.yml", ".github/workflows/*.yml", ".github/dependabot.yml"].each { |f| YAML.load_file(f); puts "yaml ok: #{f}" }'
```

Expected: exit 0 and one `yaml ok` line per YAML file.

Run:

```bash
git diff --exit-code origin/dev...HEAD -- .github/workflows/ci.yml .github/dependabot.yml .codex/hooks.json .codex/hooks/pre-tool-use.mjs .codex/hooks/stop-verification.mjs backend/src frontend/src
```

Expected: exit 0, proving no CI topology, dependency automation, hook behavior,
or product source changed.

- [ ] **Step 5: Run every required repository gate**

Run in order from repository root:

```bash
./scripts/verify.sh fast
./scripts/verify.sh full
./scripts/verify.sh docs
./scripts/verify.sh smoke
git diff --check
```

Expected: every command exits 0. `fast`/`full` use the repository’s locked
backend/frontend tooling, `docs` passes all contract/hook checks, and `smoke`
uses fake/no-key configuration with ephemeral PostgreSQL. No live provider or
hosted media service is called.

- [ ] **Step 6: Review scope and commit the final reconciliation if authorised**

Run:

```bash
git status --short
git diff --stat origin/dev...HEAD
git diff --stat
git diff origin/dev...HEAD -- README.md AGENTS.md backend/AGENTS.md frontend/AGENTS.md docs .agents .github scripts MEDIA_NOTICE.md CLAUDE_MILESTONE_PROMPT.md backend/PROJECT_STATUS.md frontend/PROJECT_STATUS.md
git diff -- README.md AGENTS.md backend/AGENTS.md frontend/AGENTS.md docs .agents .github scripts MEDIA_NOTICE.md CLAUDE_MILESTONE_PROMPT.md backend/PROJECT_STATUS.md frontend/PROJECT_STATUS.md
```

Confirm every changed file appears in this plan, product source is absent,
both ledgers contain exact evidence, no external setting changed, and no
unapproved dependency/media asset exists.

```bash
git add docs/13_SHADOWING_FIRST_IMPLEMENTATION_PLAN.md docs/10_CHANGELOG_AND_READINESS.md backend/PROJECT_STATUS.md frontend/PROJECT_STATUS.md
git commit -m "docs: finalize shadowing v0.3 readiness"
```

Execute the commit only with explicit commit authorisation.

- [ ] **Step 7: Prepare the human-review handoff without external writes**

Prepare a PR body using `.github/pull_request_template.md` with:

- the assigned M0.3 Issue closure reference;
- D-032–D-041, FR-100–FR-109, BR-100–BR-103, NFR-050–NFR-054,
  AS-09–AS-14, and ADR-0005;
- RED/GREEN evidence from each task;
- exact fast/full/docs/smoke exit results;
- confirmation that CI/Dependabot/hooks/product source are unchanged;
- confirmation that no media asset, secret, cloud setting, auto-merge, deploy,
  board write, or storage provider was added;
- remaining limitation: M2 backlog and product work are still unapproved.

Do not push, open the PR, merge, or modify GitHub settings unless the owner
explicitly authorises each external write. Merge remains manual even after all
checks pass.

---

## Plan Completion Evidence

Before calling this plan implemented, read back these outcomes:

- canonical sources consistently say v0.3 and select shadowing M2;
- retained interview invariants are explicitly future-scoped;
- Spring owns metadata only and browser media delivery is direct;
- database/backend media-byte prohibition appears in decisions, ADR,
  architecture, API, SRS, instructions, intake, and review contract;
- optional repetition and generation-based playback completion match across
  Product Brief, SRS, ADR, RTM, and design record;
- privacy and transcript wording are scoped to app-controlled/UI-only claims;
- rights/NOTICE/release/hash gate exists without any private record or real
  media asset;
- M2 pilot and M3 portfolio cut lines agree across all planning documents;
- Issue Forms, PR template, and both skills require architecture, TDD, rights,
  status, human review, and manual merge evidence;
- old Issues #2–#11 are identified as stale but remain unchanged pending a new
  ticket-manager Phase A and exact board-write approval;
- fast, full, docs, and smoke all have observed zero exit status;
- no product source, automation topology, paid provider, deploy, auto-fix, or
  auto-merge change appears in the diff.
