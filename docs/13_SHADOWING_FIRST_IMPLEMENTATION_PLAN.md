# Shadowing-First Architecture and Canonical Delta Plan

Status: Design sections owner-approved; written consolidation awaiting owner review; non-canonical until the coordinated v0.3 delta is merged
Design version: v0.3-draft.3
Date: 2026-08-27
Audit baseline: `29732f9d3198e3f1a66149051dee0cb552f3f63d`
Audience: Owner, external auditor, implementation planner, ticket manager, and reviewers

> This document resolves the external audit findings against v0.3-draft.2 and
> records the owner's architectural decisions. It does not by itself supersede
> canonical v0.2. Product source work remains blocked until one coordinated
> canonical v0.3 documentation/workflow change is approved and merged. GitHub
> backlog changes require their own Phase A dry run and exact
> `APPROVE BOARD WRITE` approval.

## 1. Executive decision

Global-Ready will validate a shadowing-first learning loop without abandoning
its Java/Spring portfolio objective. The first product milestone will deliver
one small full-stack exercise:

```text
guided imitation -> optional repetition -> independent transfer -> reflection
```

Spring owns the public exercise metadata and content contract. The browser
loads reference video and captions directly from a static origin or future
object storage. The backend never uploads, stores, proxies, or streams media
bytes, and the database never stores media BLOBs. A small deterministic test
fixture may be committed solely for clean-clone and automated verification.

This is a product hypothesis for Vietnamese developers practising workplace
and interview English. It is not a claim that shadowing is universally the
fastest language-learning method, that one exercise proves durable learning,
or that the application verifies speech or pronunciation.

## 2. Owner-approved decisions

The following decisions were approved after review of findings GR-A01 through
GR-A13:

1. M2 includes a Spring content-contract API rather than being frontend-only.
2. The M2 journey is guided imitation with optional repetition. It does not
   claim that a fixed replay count is pedagogically required.
3. Transfer unlocks after one system-observed complete reference playback pass.
   Speaking remains learner self-attestation, never system verification.
4. The application guarantees only that it does not intentionally persist,
   log, analytics-track, or transmit candidate transfer content. It does not
   promise secure erasure from the browser, OS, IME, extension, crash recovery,
   or session history.
5. Transcript hiding is self-regulated UI concealment, not access control,
   anti-cheat, or content security.
6. Real human media cannot be committed or published until the media-rights
   gate is satisfied. A deterministic non-person fixture may unblock code and
   automated tests.
7. M2 is the pilot MVP. M3 is the portfolio/CV MVP and must add a meaningful
   Spring persistence, transaction, idempotency, and integration-test slice
   before scenario-pack or STT expansion.
8. M2 uses Vitest, React Testing Library, and one focused Playwright Chromium
   flow in addition to Spring JUnit/MockMvc tests and repository harness modes.
9. The first API is `GET /api/v1/shadowing-exercises/{exerciseId}`. M2 is a
   public read-only content boundary with no account, anonymous token, learner
   attempt, or database requirement.
10. Auto-merge, auto-deploy, paid APIs, Codex Action, and required Codex review
    remain prohibited.

## 3. Product hypothesis and success boundary

### 3.1 Target learner

The initial learner is a Vietnamese software developer who can read technical
English but hesitates when explaining work, clarifying requirements, giving a
status update, disagreeing in review, or answering an interview question.

The first exercise rehearses a reusable communication shape:

1. context;
2. decision or action;
3. reasoning or evidence;
4. result or next step.

The initial content topic remains an architecture trade-off because it is
relevant to daily engineering discussion and interviews without requiring CV
or job-description input.

### 3.2 Pilot success

M2 succeeds only when the owner can complete one exercise from a clean clone,
understand which role to imitate, optionally replay material, produce an
independent response without source text in the product UI, and use the source
for reflection afterward.

The owner pilot records formative evidence:

- activation difficulty;
- confidence before and after the exercise;
- whether the four-part communication shape appears in the transfer response;
- confusing controls, timing, or instructions;
- whether the exercise feels like active practice rather than passive viewing.

This evidence supports a go/no-go decision. It does not establish learning
speed, retention, pronunciation quality, or population-level effectiveness.

## 4. M2 scope and non-goals

### 4.1 In scope

- one versioned developer-dialogue exercise;
- one Spring read-only exercise metadata/content-contract endpoint;
- one canonical exercise manifest and derived WebVTT;
- a reference media abstraction with a deterministic local test fixture;
- explicit-start playback with native controls;
- active speaker/cue presentation driven by the media clock;
- optional replay and playback-rate control;
- a complete-pass transfer gate;
- independent transfer using learner self-attestation or transient text;
- source comparison and a four-part reflection checklist;
- deterministic frontend, backend, contract, browser, and clean-clone checks;
- accessibility, privacy-boundary, rights, and recovery evidence.

### 4.2 Explicit non-goals

- microphone capture, raw audio persistence, speech recognition, pronunciation
  scoring, numeric scoring, or hiring-readiness scoring;
- candidate accounts, anonymous session tokens, learner history, progress sync,
  attempt persistence, reports, CV/JD input, or adaptive interview turns;
- media upload, backend media streaming, database BLOBs, cloud SDKs, signed URL
  services, CDN selection, or hosted storage credentials;
- external film clips, scraped subtitles, paid media, paid providers, paid CI,
  deployment, auto-merge, or automatic code generation;
- a scenario pack or claims about long-term learning effectiveness.

## 5. Learning journey and playback semantics

### 5.1 Journey

1. The learner opens `/practice` and receives exercise metadata from Spring.
2. The browser loads the reference media and derived captions directly from
   the configured public media origin.
3. The learner explicitly selects Start; autoplay is never assumed.
4. During guided imitation, the UI identifies the active speaker and makes the
   target developer line clear enough to follow synchronously.
5. The learner may pause, replay, move backward, or change playback rate.
6. After one valid complete playback pass, the UI enables independent transfer.
7. During transfer, the transcript, cue text, key chunks, and reveal controls
   are not rendered by the product UI or exposed in its accessibility tree.
8. The learner either selects `I finished speaking` or submits non-empty
   transient text.
9. The source returns for comparison and four-part self-review.

### 5.2 Complete-pass gate

A playback pass is valid only when all of the following are true:

- the application created a new pass generation by resetting the media to its
  beginning;
- playback started after that reset;
- no forward-seek event occurred in that generation;
- pause, buffering, backward seek, and playback-rate changes may occur;
- the current source did not change;
- a non-stale native `ended` event occurred for that generation.

No elapsed-time tolerance or interval-coverage percentage decides completion.
The gate uses the event sequence above, avoiding a second timing authority and
avoiding misleading “verified learning” language. A forward seek invalidates
the generation; the learner must restart from the beginning. Reset, source
replacement, component unmount, or fatal media error invalidates the current
generation. Generation identifiers prevent late callbacks from reopening
transfer after reset or source change.

The system observes reference playback only. It neither detects nor verifies
that the learner spoke.

### 5.3 Cue timing

`HTMLMediaElement.currentTime` and WebVTT cue timing are the media-time
authority. An application timer must not independently infer the active phrase.
The caption track remains in a mode that keeps active cues available. M2 rejects
overlapping dialogue cues rather than inventing priority. Caption load/error,
seek, waiting/stalled/playing, rate change, pause, ended, source replacement,
and play-promise rejection all have explicit state-machine events.

`requestVideoFrameCallback`, reducer/type names, codec tuning, and rendering
optimisations are Issue-level implementation choices. They are not canonical
product constraints.

## 6. Architecture and component boundaries

### 6.1 Spring content module

M2 introduces the package boundary `com.globalready.shadowing`, following the
existing modular-monolith convention. It contains API, application/domain, and
content-adapter responsibilities. Exact class/interface names are
implementation choices established by the delivery Issue and TDD.

The module:

- loads and validates versioned exercise metadata;
- resolves an approved public media reference using configuration;
- exposes the public read-only exercise contract;
- returns `application/problem+json` errors using Spring `ProblemDetail`;
- includes the existing correlation-ID behaviour;
- has no dependency on JPA, Flyway, AI providers, learner identity, or media
  byte transport in M2.

The first endpoint is:

```http
GET /api/v1/shadowing-exercises/{exerciseId}
```

An available exercise returns its ID/version, presentation metadata, ordered
cue/role contract, transfer prompt, reflection checklist, public media and
caption references, integrity/version metadata, and non-personal rights status.
An unknown or inactive exercise returns a correlated `404
application/problem+json`. Invalid content is rejected during validation and
must not be exposed as a partial response.

### 6.2 Canonical content and derived artifacts

One machine-readable exercise manifest is the content source of truth. It owns:

- stable exercise and cue IDs;
- version, title, scenario, and target role;
- ordered cue start/end, speaker, text, intent, and key chunks;
- transfer prompt and four-part reflection checklist;
- logical media reference, expected duration, and integrity metadata;
- a non-personal rights-record reference and permitted publication scope.

WebVTT is derived from that manifest. Build validation proves a bijection
between manifest cues and generated/committed WebVTT cues, including ID, order,
role, text, timing, duration, and hash. The build adapter may package the same
manifest for Spring and derive frontend assets, but duplicated hand-edited
content is forbidden. Exact paths and generator language are implementation
choices selected to fit the current Docker build contexts.

### 6.3 Media delivery boundary

The browser loads MP4/WebVTT directly from:

- deterministic frontend/static fixtures in local development and CI; or
- a future owner-approved object-storage public origin.

The database never stores video, images, captions, audio, or other media bytes.
The backend never uploads, stores, proxies, or streams them. A future database
may store only metadata such as a logical object key, asset version, checksum,
rights-record reference, and status after a separate approved design.

No R2, GCS, Drive, CDN, or storage provider is selected by M2. Clean clone and
CI contain no cloud SDK, provider key, hosted database dependency, or network
dependency on a third-party media origin.

### 6.4 Frontend components

The frontend adds a `/practice` route and focused units with these
responsibilities:

- API adapter: fetch and validate the Spring response boundary;
- playback state machine: accept media events and decide valid transitions;
- media adapter: translate browser media/track events without becoming a
  second clock;
- guided imitation view: show speaker/cue state and playback controls;
- transfer view: enforce UI concealment and transient learner input;
- reflection view: restore source material and show the four-part checklist.

The units communicate through explicit data/events so pure state behaviour can
be tested without a real browser, while one browser test proves integration.

## 7. Privacy and transcript threat boundaries

### 7.1 Application-controlled guarantees

M2 does not call `getUserMedia`, `SpeechRecognition`, `MediaRecorder`, an audio
upload endpoint, or an AI provider. The application does not intentionally:

- persist transfer text in localStorage, sessionStorage, IndexedDB, cookies,
  backend state, analytics, or files;
- place it in URLs, query strings, errors, logs, console output, telemetry, or
  provider payloads;
- transmit it using fetch, XHR, beacon, WebSocket, or form navigation.

Transfer text exists only in application memory and is cleared on exercise
reset and route-owned state teardown. Appropriate controls use
`autocomplete="off"` and, when it does not harm the intended input experience,
`spellcheck="false"` as browser hints.

### 7.2 Browser/OS boundary

The application cannot promise secure erasure or control browser form/history
restoration, bfcache, crash/session recovery, accessibility software, IMEs,
spellcheck services, extensions, the operating system, screenshots, or a
modified client. Documentation and UI copy must use the scoped guarantee above.

### 7.3 UI-only transcript concealment

During transfer, transcript/cue text/key chunks and product reveal controls are
not rendered and do not appear in the product accessibility tree. They return
only after self-attestation or non-empty transient text submission.

This is a self-regulated learning affordance. The public API, WebVTT, browser
cache, or developer tools may expose public exercise content, so the design
must not describe concealment as authentication, anti-cheat, DRM, or security.

## 8. Media rights and provenance gate

Automated product development may begin with a deterministic, rights-cleared
fixture that contains no identifiable real person. A human dialogue asset may
be committed or published only after all of these exist:

- private consent/release for every visible or audible participant;
- explicit rights to record, edit, publish in a public repository/demo, and
  redistribute the exact asset version;
- a media-specific license or NOTICE that is separate from the source-code MIT
  license;
- a non-personal public release-record ID linked to the asset version;
- SHA-256 values for MP4, manifest, VTT, and the approved script/version;
- validation that the attestation covers all visible/audible participants and
  the permitted publication scope.

Private releases and participant identities remain outside Git. A checksum is
an integrity link, not proof of rights by itself. Removing a file from the
latest revision is not treated as reliable revocation because Git history,
forks, caches, and downloaded copies may remain.

If the gate is incomplete or a covered hash differs, the real asset must not be
merged or published. Product source work continues against the fixture.

## 9. Accessibility and user-visible recovery

- Audible playback always follows an explicit user action.
- Native keyboard-operable media controls remain available.
- Custom controls expose accessible names, focus, state, and current value.
- Speaker identity uses text/icon semantics in addition to colour.
- Captions contain speaker labels and meaningful non-speech audio where needed.
- The first clip contains no visual-only instructional information; otherwise
  an equivalent alternative is required.
- Active cue changes do not produce live-region spam.
- Focus order, error announcements, reduced motion, and text fallback are
  verified.
- A rejected `play()` call, unavailable/corrupt media, caption load failure,
  unsupported codec, or network interruption produces truthful recovery UI.
- Recoverable failures offer Retry without unlocking transfer. Reset/source
  replacement clears stale state. Fatal contract/content failures do not render
  a partially trusted exercise.

## 10. Test-driven delivery and verification

### 10.1 TDD contract

Each production behaviour Issue follows RED -> GREEN -> REFACTOR:

1. establish the smallest failing test for the intended behaviour;
2. record why RED proves missing behaviour rather than a broken fixture or
   environment;
3. make the minimum implementation pass;
4. refactor while the relevant suite stays green;
5. do not commit the deliberate failing state.

Architecture approval remains independent of green tests. A test cannot
silently authorise a new dependency, public contract, persistence boundary,
privacy decision, or recovery strategy.

### 10.2 Backend tests

Spring JUnit and MockMvc tests cover:

- successful exercise response and stable API fields;
- unknown/inactive exercise `404 ProblemDetail` and correlation ID;
- invalid manifests rejected rather than partially served;
- ordered cues, supported roles, version/integrity fields, and configuration
  resolution;
- proof that the M2 content module has no JPA/media-stream/provider behaviour.

### 10.3 Frontend tests

The owner approves adding version-pinned Vitest, React Testing Library, DOM
test support, and Playwright as development dependencies. They do not introduce
a paid service or required secret.

Vitest covers the pure state machine and adapters, including:

- valid reset -> start -> ended completion;
- pause, buffering, backward seek, and rate-change continuity;
- forward-seek invalidation;
- reset, source replacement, unmount, and stale-generation events;
- track load/error, play-promise rejection, waiting/stalled/playing,
  pause/ended, and recoverable/fatal error paths;
- overlapping/missing/corrupt cue data and loop overshoot behaviour.

React Testing Library covers:

- guided, transfer, and reflection transitions;
- transcript absence from the rendered/accessibility tree during transfer;
- text fallback, focus order, accessible names/current values, error
  announcements, and reduced-motion behaviour;
- app-originated storage, URL, logging, and network guards.

One focused Playwright Chromium flow proves the deployed integration:

- frontend obtains the contract from Spring;
- the browser obtains fixture media/captions directly rather than through the
  backend;
- explicit Start, pause/resume, valid ended completion, transfer concealment,
  self-attestation/text fallback, reflection, Retry, and reset work;
- application-originated fetch/XHR/beacon/WebSocket, browser storage, URL, and
  console evidence contain no learner transfer content.

The browser test uses deterministic fixtures and does not claim to verify that
the learner spoke.

### 10.4 Content, container, and manual evidence

Content validation has deliberate invalid fixtures for duplicate/missing cue
IDs, ordering, overlap, empty text, unsupported role, timing, duration,
manifest/VTT mismatch, checksum mismatch, and incomplete rights metadata.

Container/smoke verification checks:

- frontend standalone packaging includes deterministic public fixtures;
- media and captions respond with correct MIME types;
- `HEAD` and `GET` work and video byte-range requests return `206` where seek
  support requires it;
- missing/corrupt assets fail visibly;
- backend API and OpenAPI are reachable;
- no provider key or hosted database/media service is required beyond the
  existing ephemeral PostgreSQL harness baseline.

Manual Chrome evidence covers real media/caption synchronisation at supported
rates, seek/replay, buffering, keyboard use, reduced motion, screen-reader
behaviour, speakers/headphones, and the owner pilot rubric. Manual evidence is
never reported as a deterministic CI guarantee.

All work remains integrated through the repository commands:

```bash
./scripts/verify.sh fast
./scripts/verify.sh full
./scripts/verify.sh docs
./scripts/verify.sh smoke
```

## 11. Milestones and delivery gates

### M0.3 — Canonical closure

Deliver one coordinated documentation/workflow PR that closes verified audit
findings, reconciles source evidence, and maps every new MUST to a milestone,
test/manual evidence, and responsible reviewer. No product source is included.

### M2 — Shadowing pilot MVP

Deliver one complete exercise with the Spring content API, direct deterministic
media delivery, guided imitation, optional repetition, complete-pass gate,
independent transfer, reflection, privacy/accessibility controls, and one
Playwright integration flow.

M2 ends with an owner go/no-go pilot. Failure recovery is to retain the M1
scaffold and revise or remove the shadowing feature without migrating learner
data because M2 persists none.

### M3 — Spring portfolio/CV MVP

Before scenario-pack or STT expansion, deliver one owner-approved vertical
slice that demonstrates meaningful Spring persistence, transaction boundaries,
idempotency, PostgreSQL/Testcontainers integration, security/privacy, and
recovery. The implementation plan must decide whether this is the adaptive
workplace/interview transfer boundary or another product-justified persisted
capability; it must not persist media bytes or invent progress storage merely
to demonstrate JPA.

Aggregate, state-machine, idempotency, anonymous-token, expiration, security,
and migration changes remain HUMAN-FIRST.

### Conditional later milestones

Scenario-pack expansion, post-shadow STT, adaptive interviews, reports, and
retention/deletion are re-planned only after M2 go/no-go and the M3 portfolio
gate. Text fallback, no numeric/pronunciation score, fake providers, manual
merge, and zero-cost operation remain global constraints.

## 12. Coordinated canonical and workflow delta

M0.3 changes only documentation and workflow contracts. Existing local edits
must be reconciled rather than overwritten.

| Source | Required v0.3 change |
|---|---|
| `docs/01_PRODUCT_BRIEF.md` | Adopt the shadowing-first journey, scoped hypothesis, pilot MVP, M3 portfolio gate, and corrected excluded scope. |
| `docs/02_ASSUMPTIONS_AND_DECISIONS.md` | Add owner decisions for optional repetition, Spring metadata, direct media, privacy/UI boundaries, rights, and milestone priority. Scope interview-only decisions to future adaptive work. |
| `docs/03_SRS.md` | Add testable M2 functional/non-functional requirements and acceptance scenarios; retain future interview requirements without reporting them implemented. |
| `docs/04_ARCHITECTURE.md` | Add the shadowing module, content source of truth, direct media boundary, timing/state authority, transient privacy boundary, and build validation. |
| `docs/05_DATA_AND_API.md` | Specify the read-only exercise API and no M2 persistence; prohibit media bytes in DB/backend transport. Preserve future interview API history. |
| `docs/06_OPEN_QUESTIONS.md` | Record resolved owner choices and keep learning generalisability, real-content quality, future storage, STT, and M3 persisted boundary explicitly open. |
| `docs/07_MILESTONE_RULES.md` | Generalise version wording and require human architecture approval plus RED/GREEN/REFACTOR evidence. |
| `docs/08_MILESTONE_PLAN.md` | Establish M0.3, M2 pilot MVP, M3 portfolio/CV MVP, go/no-go ordering, and conditional later expansion. |
| `docs/09_TRACEABILITY.md` | Map every approved requirement to milestone, automated/manual evidence, and AI/human reviewer. Preserve deferred mappings honestly. |
| `docs/10_CHANGELOG_AND_READINESS.md` | Record audit disposition and current gates; reconcile newer CI evidence without deleting dated historical limitations. |
| `docs/11_M1_IMPLEMENTATION_HANDOFF.md` | Add a dated addendum replacing the stale next-delivery boundary while preserving M1 facts. |
| `docs/12_CODEX_WORKFLOW.md` | Make owner architecture authority, TDD evidence, media-rights gate, one-Issue/branch, human review, manual merge, and no-auto-merge operational. |
| New ADR | Record Spring metadata/direct media, manifest/WebVTT authority, playback generation gate, transient no-capture state, and UI-only concealment. |
| `README.md` | Describe the current product direction, pilot/CV cut lines, commands, and zero-cost boundary. |
| Root/nested `AGENTS.md` | Scope interview invariants, add media/privacy rules, preserve owner architecture authority and TDD. Nested files remain only at real backend/frontend boundaries. |
| Status ledgers | Record the approved canonical boundary, exact evidence, and current limitation for each affected delivery surface. |
| `CLAUDE_MILESTONE_PROMPT.md` | Mark historical/non-canonical so old WebRTC/private-alpha assumptions cannot be selected as current work. |
| Issue forms and PR template | Require architecture/rights classification, RED and GREEN evidence, privacy/data/API impact, recovery, unverified items, and explicit human review for HUMAN-FIRST work. |
| Repository skills | Teach ticket planning and Issue delivery the new canonical/current-evidence boundary, rights gate, TDD evidence, and HUMAN-FIRST stops. Re-run explicit, implicit, negative, and incomplete-input skill tests. |
| `scripts/docs-check.mjs`, harness, CI, hooks | Update drift/contract checks and shared commands only where needed; preserve equivalent automation and never add paid providers, Codex Action, deploy, auto-fix, or auto-merge. |
| Code `LICENSE` plus media NOTICE | Keep MIT for code; define an asset-specific license/NOTICE and non-personal attestation contract before any human asset merge. |

The canonical PR must contain no product feature source. It requires owner
review and manual merge through the protected `dev` branch workflow.

## 13. Backlog disposition and delivery decomposition

### 13.1 Existing Issues #2–#11

No GitHub mutation is authorised by this plan.

| Issue | Approved planning disposition after canonical merge |
|---|---|
| #2 aggregate/context freeze | Defer for the future adaptive/persisted boundary and revalidate then. |
| #3 Flyway/JPA persistence | Rewrite after the M3 model is approved; do not implement the stale schema. |
| #4 anonymous access grant | Defer; preserve its security outcomes for a future persisted anonymous resource. |
| #5 draft interview creation | Rewrite under the future adaptive journey. |
| #6 ownership/expiry reads | Defer; retain only when a persisted protected resource exists. |
| #7 context edit/prepare | Rewrite after the adaptive setup journey is approved. |
| #8 deletion | Defer; preserve cascade/manual deletion outcomes for future persisted candidate content. |
| #9 browser token boundary | Defer; M2 has no learner token. |
| #10 setup/READY frontend | Supersede with the `/practice` shadowing flow and close as not planned with successor links after approval. |
| #11 old M2 checkpoint | Supersede with a shadowing sync/rights/privacy/accessibility/transfer checkpoint and close as not planned with successor links after approval. |

Deferred work must be removed from active M2 selection using an approved
milestone/label/status strategy. Superseded Issues are never marked Done. The
ticket manager must first produce a complete Phase A read-only mutation set;
every board write still requires exact `APPROVE BOARD WRITE`.

### 13.2 Planned work sequence

1. HUMAN-FIRST canonical v0.3 delta and ADR, followed by owner review/manual
   merge.
2. Ticket-manager Phase A for old-Issue disposition and an atomic M2 backlog.
3. HUMAN-FIRST media script, consent/release, NOTICE, provenance, and real-asset
   approval; deterministic fixture work may proceed independently.
4. Spring content contract and validation Issue.
5. Manifest-to-WebVTT/content integrity Issue.
6. Frontend playback state machine and browser adapter Issue.
7. Guided imitation UI Issue.
8. Transfer/privacy/reflection/accessibility Issue.
9. Container, Playwright, smoke, and owner-pilot checkpoint Issue.

Every product Issue has one branch and one PR, issue-specific acceptance
criteria/DoD, RED/GREEN evidence, relevant status-ledger updates, human review,
and manual merge. No implementation starts from this decomposition until the
canonical gate and approved backlog write are complete.

## 14. Requirement and acceptance baseline

The canonical SRS assigns final IDs. The behaviours below are the design input
and must not be copied into the SRS with conflicting IDs.

- Load one available public exercise contract from Spring without learner
  identity or persistence.
- Begin audible practice only after explicit Start.
- Permit optional repetition without claiming that repetition was completed.
- Unlock transfer only after a valid complete-pass generation.
- Never label learner speaking as system-observed or verified.
- Conceal source content at the product UI/accessibility layer during transfer
  and restore it for reflection afterward.
- Provide a non-empty transient text fallback to self-attested speaking.
- Never intentionally persist, log, analytics-track, or transmit learner
  transfer content in M2.
- Load reference media/captions directly, never through backend byte transport.
- Fail closed for invalid content/rights metadata and recover truthfully from
  browser media failures.
- Work from a clean clone with deterministic fixtures and no provider/cloud
  key.

Minimum observable acceptance scenarios include:

1. Given a ready exercise, when the learner resets, starts at the beginning,
   does not seek forward, and native playback ends, then transfer becomes
   available and the UI states only that reference playback completed.
2. Given an active pass, when the learner seeks forward, then the pass becomes
   invalid and transfer remains locked until a new complete pass.
3. Given transfer mode, when the UI is inspected visually and through its
   accessibility tree, then source transcript/cues/key chunks/reveal controls
   are absent.
4. Given transient text, when the learner resets or leaves route-owned state,
   then application memory clears it and no app-originated storage, URL, log,
   analytics, or network sink contains it.
5. Given media/caption failure, when Retry is offered, then transfer remains
   locked and stale events cannot change the new state generation.
6. Given a clean clone with no Gemini/cloud key, when all four harness modes
   run, then deterministic backend, frontend, docs, browser, and smoke checks
   require no paid or hosted media/provider service.

## 15. Risks and recovery

| Risk | Mitigation and recovery |
|---|---|
| Shadowing becomes passive viewing | Preserve independent transfer and reflection; use M2 go/no-go evidence rather than adding speculative features. |
| Spring API adds architecture without product value | Keep it read-only and focused on content validation/versioning; M3 must add product-justified depth, not demo-only persistence. |
| Browser events unlock transfer incorrectly | Use generation/event semantics, forward-seek invalidation, stale-event tests, and one real-browser flow. |
| Transcript/privacy wording overpromises | Use app-controlled and UI-only guarantees; document browser/OS boundaries. |
| Real media rights are incomplete | Block only the real asset; continue with the deterministic fixture. Never treat deletion from HEAD as revocation. |
| Content and VTT drift | Use one manifest source, derived WebVTT, bijection validation, and hashes. |
| Media storage choice delays work | Keep local deterministic delivery; defer R2/GCS selection and prohibit Drive as runtime origin unless a new approved design demonstrates suitability. |
| M2 delays Java/Spring portfolio value | Include Spring metadata in M2 and make meaningful Spring persistence/transaction evidence the M3 portfolio gate. |
| Test tooling becomes heavy or flaky | Keep most logic in Vitest/RTL, one focused Playwright flow, deterministic fixtures, explicit timeouts, and no external network. |
| Pivot causes old tickets to be implemented | Merge coordinated canonical truth first, mark historical prompt, update skills/status, and perform an approved board migration. |

Before canonical adoption, recovery is to reject or revert this plan; the M1
scaffold and canonical v0.2 remain authoritative. M2 has no learner persistence,
so feature rollback requires no data migration.

## 16. External audit disposition

| Finding | Decision and closure in this design |
|---|---|
| GR-A01 Java/Spring priority | Accepted. Spring metadata is in M2; meaningful persistence/transaction work is the M3 portfolio/CV gate. |
| GR-A02 controlled repetition | Accepted. Claim changed to guided imitation with optional repetition. |
| GR-A03 playback coverage | Accepted. Replaced ambiguous percentage/tolerance with reset-generation, no-forward-seek, native-ended semantics; speech is self-attested. |
| GR-A04 privacy absolutes | Accepted. Guarantees are scoped to intentional application behaviour with an explicit browser/OS threat boundary. |
| GR-A05 transcript security | Accepted. Defined as UI/accessibility-tree concealment, never security or anti-cheat. |
| GR-A06 media rights | Accepted. Added private releases, explicit rights, media NOTICE/license, non-personal record ID, multi-artifact hashes, and fixture fallback. |
| GR-A07 canonical/workflow matrix | Accepted. Expanded through docs 01–12, ADR, README, AGENTS, ledgers, stale prompt, templates, skills, checker/harness/CI/hooks, and media licensing. |
| GR-A08 evidence generalisability | Accepted. Retained only a scoped hypothesis and formative owner pilot. |
| GR-A09 content source of truth | Accepted. One manifest owns cue content; WebVTT is derived and bijection-validated. |
| GR-A10 media/Docker races | Accepted. Added transport, stale-generation, lifecycle, error, and range/MIME coverage. |
| GR-A11 accessibility | Accepted. Added non-speech captions, no visual-only instruction, focus/error/reduced-motion checks, and live-region restraint. |
| GR-A12 premature technical constraints | Accepted. Canonicalised outcomes/boundaries and left runner internals, exact symbols, codec/budget, and rendering optimisation to ADR/Issues where appropriate. |
| GR-A13 stale Issue selection | Accepted. Added dry-run migration, deferred separation, close-as-not-planned successor handling, and prohibition on marking superseded work Done. |

## 17. Final gates

This design is ready for owner review as the input to an implementation plan.
It is not yet permission to modify canonical documents, product source, GitHub
Issues, Project fields, repository settings, or external storage.

The next allowed sequence is:

1. owner reviews and approves this written design;
2. create a detailed implementation plan for the coordinated M0.3 canonical
   delta;
3. implement that documentation/workflow plan on one issue branch using TDD or
   executable validation where applicable;
4. owner reviews and manually merges the canonical PR;
5. ticket manager performs Phase A and waits for `APPROVE BOARD WRITE`;
6. only then begin one approved M2 product Issue per branch.

No auto-merge is permitted at any step.
