# Changelog and Implementation Readiness

Status: Canonical v0.3
Date: 2026-08-28

## 1. v0.1 -> v0.2 changes

### Product

- Reframed from commercial/private-alpha validation to a zero-cost Java/Spring
  portfolio project.
- Made the owner the primary user; removed the tester gate and product-growth
  metrics.
- Fixed one `PROJECT_DEEP_DIVE` mode and a maximum of six turns.
- Fixed English interview output and Vietnamese feedback.
- Removed account/history, mode/difficulty/duration selection, transcript
  correction, weakest-question retry, usefulness rating, numeric score, and
  full sample answer.

### Voice and providers

- Removed direct provider WebRTC, backend audio relay, temporary audio storage,
  provider browser credentials, `VoiceSessionGateway`, and
  `TranscriptGateway`.
- Selected Chrome speech recognition and browser speech synthesis with
  mandatory text/visible-prompt fallback.
- Reduced backend ports to `InterviewResponseGateway` and
  `ReportGenerationGateway`.
- Made deterministic fake adapters default and Gemini opt-in.

### Domain and lifecycle

- Replaced `CandidateSubject` and reusable `CandidateProfile` with
  session-owned `CandidateContext`.
- Made `InterviewSession` the aggregate root.
- Split session lifecycle from report lifecycle.
- Session states are `DRAFT -> READY -> ACTIVE -> ENDED|ABANDONED`, with
  effective `EXPIRED`.
- Report states are `NOT_STARTED -> PENDING -> COMPLETE|FAILED`.
- Moved context freeze from “after start” to `READY`.
- Defined two answered turns as minimum report evidence.

### Persistence, API, and reliability

- Removed duplicated transcript-segment persistence; ordered turns are the
  final transcript.
- Removed the client-facing interviewer-output write endpoint.
- Defined answer-first persistence and two short transactions around provider
  calls.
- Defined operation-specific idempotency keys and request fingerprints.
- Defined anonymous bearer token issuance, hash-only storage, one-session
  binding, and expiry.
- Replaced 30-day/indefinite policies with one fixed session TTL of 24 hours.
- Distinguished immediate logical expiry from best-effort physical purge.

### Milestones

- M1 was the mechanical scaffold only.
- The former M2 was the first human-first Java domain checkpoint.
- The former M3 proved one answer and provider-failure recovery before broad
  multi-turn/report work.
- Public hosting and rate limiting were conditional, not completion blockers.

## 2. v0.2 -> v0.3 changes

### Product and delivery order

- Changed the active product loop to guided imitation, optional repetition,
  independent transfer, and reflection for workplace/interview English.
- Defined M0.3 as one canonical/workflow-only delta with no product source.
- Defined M2 as the pilot MVP: one Spring metadata/content-contract endpoint
  plus browser-direct deterministic media, transient transfer, and reflection.
- Defined M3 as the first portfolio/CV MVP, with persistence, transactions,
  idempotency, PostgreSQL/Testcontainers, security/privacy, and recovery only
  where the M2 go/no-go establishes product value.
- Moved scenario packs, post-shadow STT, adaptive interview, reports,
  retention/deletion, deployment, and portfolio hardening to conditional later
  milestones.

### Owner decisions adopted

| ID | Adopted v0.3 authority |
|---|---|
| D-032 | Shadowing uses guided imitation, optional repetition, independent transfer, and reflection. |
| D-033 | M2 includes a public read-only Spring shadowing metadata/content-contract API. |
| D-034 | Browsers fetch media/captions directly; backend and database carry no media bytes. |
| D-035 | One versioned manifest is authoritative and WebVTT is derived and bijection-validated. |
| D-036 | Repetition is optional in M2. |
| D-037 | A reset/start/no-forward-seek/current native-ended generation gates transfer. |
| D-038 | M2 learner text is transient; privacy is app-controlled and source concealment is UI/accessibility-tree only. |
| D-039 | Real human media is fail-closed on releases, rights, notice, record ID, and multi-artifact hashes. |
| D-040 | M2 is the pilot MVP and M3 is the portfolio/CV MVP. |
| D-041 | M2 frontend evidence uses Vitest, React Testing Library, and one focused Playwright Chromium flow. |

ADR-0005 records the Spring metadata, browser-direct media, manifest/WebVTT,
playback-generation, transient privacy, UI-only concealment, and no-migration
recovery boundary. Retained D-009 through D-030 apply to future persisted or
adaptive interview work unless a global privacy, no-score, or fake-provider
rule explicitly applies earlier.

### External audit disposition

| Finding | v0.3 closure |
|---|---|
| GR-A01 | Kept Spring metadata in M2 and made product-justified persistence/transaction evidence the M3 portfolio gate. |
| GR-A02 | Replaced fixed controlled repetition with optional repetition. |
| GR-A03 | Replaced percentage/tolerance coverage with generation-based reset/start/no-forward-seek/native-ended semantics; speaking remains self-attested. |
| GR-A04 | Scoped privacy to intentional application behaviour and documented the browser/OS boundary. |
| GR-A05 | Defined transcript/source hiding as product-UI/accessibility-tree concealment, never security, anti-cheat, or DRM. |
| GR-A06 | Added private releases, explicit rights, media notice, non-personal record ID, hashes, and deterministic-fixture fallback. |
| GR-A07 | Coordinated canonical documents, workflow contracts, status ledgers, validation, and historical guidance. |
| GR-A08 | Limited evidence to an owner formative pilot without learning-speed, retention, pronunciation, or population claims. |
| GR-A09 | Made one manifest authoritative and WebVTT derived with bijection validation. |
| GR-A10 | Added browser transport, generation lifecycle, media error, MIME/range, and clean-clone evidence boundaries. |
| GR-A11 | Added captions, non-colour speaker semantics, keyboard/focus/error/reduced-motion checks, and live-region restraint. |
| GR-A12 | Left exact symbols, reducer internals, codec, media budget, provider, and rendering optimisation to later approved Issues. |
| GR-A13 | Removed stale Issues #2–#11 from active M2 selection pending a separately approved backlog migration. |

## 3. Explicit sign-offs incorporated

The v0.2 session/report state split, context freeze, anonymous-token, no-raw-
audio, six-turn, report-schema, no-score, fake-provider, and zero-cost rules
remain available for their applicable future milestones. The owner also
approved D-032 through D-041, ADR-0005, the media-rights gate, HUMAN-FIRST
architecture/privacy/security decisions, RED/GREEN/REFACTOR evidence, human
review, and manual merge with no auto-merge.

## 4. Remaining decisions and blockers

No unresolved product or architecture decision blocks M0.3 canonical closure
or deterministic M2 backlog planning. Real human media remains blocked until
its rights/provenance gate passes. A public storage provider, post-shadow STT,
the exact M3 persisted product boundary, and conditional adaptive/report/
retention work require later owner decisions and do not block the local M2
fixture path.

M2 product coding is not authorised by specification readiness alone. It waits
for this coordinated canonical PR to be manually merged and for a separately
approved backlog write that creates implementation-ready M2 Issues.

## 5. v0.3 readiness checklist

- [x] Product Brief, decisions, SRS, architecture, API/data, open questions,
  milestone rules/plan, RTM, changelog, and M1 handoff agree on M0.3 -> M2 ->
  M3 -> conditional later ordering.
- [x] D-032 through D-041 and ADR-0005 define the owner-approved boundary.
- [x] FR-100–FR-109, BR-100–BR-103, NFR-050–NFR-054, and AS-09–AS-14 map to
  milestones, planned evidence, and reviewers.
- [x] M2 Spring responses contain metadata only and the browser requests media
  and captions directly.
- [x] Playback completion is system-observed while speaking is self-attested.
- [x] Learner privacy and transcript/source concealment are scoped to
  application-controlled and UI/accessibility-tree guarantees.
- [x] The real-human-media gate requires rights, notice, non-personal record,
  and matching multi-artifact hashes.
- [x] M1 facts and future interview contracts are preserved without reporting
  them as current M2 implementation.
- [x] No paid provider, cloud credential, public hosting, or real-media network
  dependency is required for clean clone or normal CI.
- [x] HUMAN-FIRST architecture review, executable RED/GREEN evidence, status
  ledgers, human review, and manual merge are explicit.
- [x] Product source, dependencies, migrations, media assets, CI/hooks, cloud
  settings, and GitHub backlog state remain unchanged by M0.3.

## 6. Gate result

**CANONICAL v0.3 READY; M2 BACKLOG NOT YET APPROVED**

The specification is ready for owner review and manual merge. Product coding
still waits for the canonical PR merge and a separately approved backlog write.
This readiness result does not implement the M2 endpoint, `/practice` route,
media fixture, learner state, or any persisted M3 capability.

## 7. Implementation evidence boundary

M1 remains the current runtime. Its 2026-08-24 generation limitations are
preserved in `docs/11_M1_IMPLEMENTATION_HANDOFF.md`. Later repository evidence
at audit baseline `29732f9d3198e3f1a66149051dee0cb552f3f63d` records green
backend, frontend, documentation/contracts, and isolated clean-clone smoke CI.
No shadowing product behaviour is claimed by that evidence.

## 8. M0.3 delivery evidence

The local Issue #17 branch has completed documentation/workflow checks only.
It adds no product endpoint, `/practice` route, media asset, cloud setting,
board write, deployment, or auto-merge configuration. The final owner review
must read back the manual merge and, separately, the later ticket-manager Phase
A proposal before any M2 implementation Issue becomes Ready.
