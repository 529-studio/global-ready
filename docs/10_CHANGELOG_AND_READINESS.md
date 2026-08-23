# Changelog and Implementation Readiness

Status: Canonical v0.2  
Date: 2026-08-24

## 1. v0.1 → v0.2 changes

### Product

- Reframed from commercial/private-alpha validation to a zero-cost Java/Spring portfolio project.
- Made the owner the primary user; removed the tester gate and product-growth metrics.
- Fixed one `PROJECT_DEEP_DIVE` mode and a maximum of six turns.
- Fixed English interview output and Vietnamese feedback.
- Removed account/history, mode/difficulty/duration selection, transcript correction, weakest-question retry, usefulness rating, numeric score, and full sample answer.

### Voice and providers

- Removed direct provider WebRTC, backend audio relay, temporary audio storage, provider browser credentials, `VoiceSessionGateway`, and `TranscriptGateway`.
- Selected Chrome speech recognition and browser speech synthesis with mandatory text/visible-prompt fallback.
- Reduced backend ports to `InterviewResponseGateway` and `ReportGenerationGateway`.
- Made deterministic fake adapters default and Gemini opt-in.

### Domain and lifecycle

- Replaced `CandidateSubject` and reusable `CandidateProfile` with session-owned `CandidateContext`.
- Made `InterviewSession` the aggregate root.
- Split session lifecycle from report lifecycle.
- Session states are `DRAFT -> READY -> ACTIVE -> ENDED|ABANDONED`, with effective `EXPIRED`.
- Report states are `NOT_STARTED -> PENDING -> COMPLETE|FAILED`.
- Moved context freeze from “after start” to `READY`.
- Defined two answered turns as minimum report evidence.

### Persistence, API, and reliability

- Removed duplicated transcript-segment persistence; ordered turns are the final transcript.
- Removed the client-facing interviewer-output write endpoint.
- Defined answer-first persistence and two short transactions around provider calls.
- Defined operation-specific idempotency keys and request fingerprints.
- Defined anonymous bearer token issuance, hash-only storage, one-session binding, and expiry.
- Replaced 30-day/indefinite policies with one fixed session TTL of 24 hours.
- Distinguished immediate logical expiry from best-effort physical purge.

### Milestones

- M1 is mechanical scaffold only.
- M2 is the first human-first Java domain checkpoint.
- M3 proves one answer and provider-failure recovery before broad multi-turn/report work.
- Public hosting and rate limiting are conditional, not completion blockers.

## 2. Explicit sign-offs incorporated

- session/report state split: accepted;
- context freeze at `READY`: accepted;
- automatic anonymous access without invite code: accepted;
- no raw audio storage: accepted;
- fixed maximum of six turns: accepted;
- one to three report priorities: accepted;
- no numeric score/full sample answer: accepted;
- local-first zero-cost completion: accepted.

## 3. Remaining unresolved decisions

None block M1 or M2.

Implementation-time checks remain for exact dependency versions, Chrome STT quality, current Gemini model/quota/data terms, and optional hosting/rate limiting. They are recorded in `06_OPEN_QUESTIONS.md` and have defined fallbacks.

## 4. Implementation-readiness checklist

- [x] Product goal and supported user/browser are explicit.
- [x] MVP scope and deferred scope do not conflict.
- [x] Session, turn, report, and expiry states are explicit.
- [x] Aggregate ownership and cascade lifecycle are explicit.
- [x] Context freeze point is explicit.
- [x] Turn cap and minimum report evidence are explicit.
- [x] Voice topology and text fallback are explicit.
- [x] Provider ports and default/real profiles are explicit.
- [x] Provider transaction boundaries and recoverable partial states are explicit.
- [x] API ownership, idempotency, and error conventions are explicit.
- [x] Token scope/storage/expiry rules are explicit.
- [x] Data retention and offline-cleanup limitation are explicit.
- [x] Report schema excludes scoring and sample answers.
- [x] Every MVP requirement maps to a milestone and verification method.
- [x] No paid provider or public hosting is required for clean-clone acceptance.
- [x] Human-first versus AI-assisted implementation boundaries are explicit.

## 5. Gate result

**SPEC READY FOR IMPLEMENTATION**

M1 may start immediately. M2 may start after M1 passes its build/test checkpoint. M2 domain code should remain a separate human-first checkpoint rather than being generated as part of the scaffold.

## 6. Post-spec implementation checkpoint

The M1 scaffold was generated on 2026-08-24 without adding domain behaviour. Java 25 production and test sources compile, the correlation-ID unit tests pass, and the frontend lint/type/build gate passes. Full Testcontainers and Docker Compose runtime verification still needs a machine with Docker; see `11_M1_IMPLEMENTATION_HANDOFF.md`.
