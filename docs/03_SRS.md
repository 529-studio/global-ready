# Software Requirements Specification

Product: Global-Ready  
Status: Canonical v0.3
Last updated: 2026-08-27
Audience: Owner, implementation assistant, reviewer

## 1. Purpose

This SRS defines the zero-cost Global-Ready product contract. The active M2
baseline is one public Spring-backed shadowing exercise with browser-direct
media and no learner persistence. Requirements marked `MUST` form the relevant
milestone baseline. The retained interview requirements are a **future adaptive
interview contract** for M3 or a conditional later milestone; they are neither
implemented by the current M1 runtime nor assigned to M2.

## 2. Definitions

| Term | Meaning |
|---|---|
| Shadowing exercise | A versioned public contract containing exercise metadata, ordered speaker cues, media/caption references, a transfer prompt, reflection checklist, and rights/integrity metadata. |
| Playback generation | One reset-scoped media attempt whose events become stale when a new generation begins or the source is invalidated. |
| Independent transfer | A response to a related prompt without source content in the product UI or accessibility tree; speaking is self-attested and text is transient. |
| UI concealment | Removal of source text and reveal controls from the rendered product UI and accessibility tree; it is not authentication, DRM, anti-cheat protection, or content secrecy. |
| Candidate context | Target role, pasted CV/project text, and optional pasted job description owned by one session. |
| Turn | One English interviewer prompt followed by one candidate answer. A follow-up is another turn. |
| Final transcript | The final candidate answer text persisted on a turn; interim browser STT text is not included. |
| Session | One anonymous project deep-dive interview and its owned context, turns, and report. |
| Access grant | An anonymous bearer token used to create and access one session; it is not an account. |
| Provider | A text-generation implementation behind an internal gateway, either fake or Gemini. |
| Report | Vietnamese feedback grounded in completed turns, with English improved outlines. |
| Logical expiry | Immediate rejection of reads and writes when current time is at or after `expiresAt`. |
| Physical purge | Cascade deletion performed by cleanup when the application is running. |

## 3. Actors and boundaries

### 3.1 M2 shadowing pilot

- **Learner:** follows the reference, optionally repeats it, completes an
  independent transfer, and reflects.
- **Browser:** requests metadata from Spring, fetches media/captions directly,
  owns playback state and transient learner input, and renders the UI.
- **Spring backend:** serves only the public exercise metadata/content contract.
- **Media origin:** supplies deterministic local media/caption fixtures in M2.

M2 has no learner account, anonymous token, attempt persistence, STT, AI
provider, report, or backend/database media-byte path. Application-controlled
privacy covers intentional persistence, logging, analytics, and transmission;
UI concealment covers only the product UI and accessibility tree.

### 3.2 Future adaptive interview boundary (M3+)

- **Candidate:** creates, performs, ends, reviews, and deletes one interview.
- **Browser:** performs speech recognition and speech synthesis and renders the UI.
- **Backend:** owns access, state, persistence, orchestration, expiry, and provider calls.
- **Text AI provider:** generates interviewer prompts and reports from bounded, untrusted inputs.

The browser or its vendor may process microphone input. Global-Ready itself must not upload or persist raw audio.

## 4. Primary journeys

### UJ-100 — Shadow, transfer, and reflect (M2)

1. The learner opens `/practice` and the browser loads one available public
   shadowing exercise contract from Spring.
2. The browser fetches reference media and derived WebVTT directly from the
   configured deterministic public origin.
3. The learner explicitly starts reference playback.
4. Guided imitation identifies the active speaker and target developer cue
   from the media/WebVTT clock; repetition, pausing, backward seeking, and
   supported rate changes are optional.
5. Transfer unlocks only after a new playback generation resets to the
   beginning, starts, is not forward-seeked, and receives its own native
   `ended` event.
6. During transfer, source text and reveal controls are absent from the product
   UI and accessibility tree.
7. The learner self-attests speaking completion or submits non-empty transient
   text; the system does not claim speech verification.
8. Source content returns with the four-part reflection checklist: Context,
   Decision or action, Reasoning or evidence, and Result or next step.

The journeys below are retained only as the **future adaptive interview
contract (M3+)**. They do not describe M2 or current implementation.

### UJ-01 — Prepare and start

1. Candidate opens the application and receives an anonymous access grant.
2. Candidate supplies target role, CV/project text, and optional JD text.
3. System creates a `DRAFT` session with a fixed 24-hour expiry.
4. Candidate reviews fixed mode, six-turn cap, consent, and context summary.
5. System validates and freezes the context, transitioning to `READY`.
6. Candidate explicitly requests microphone access or chooses text fallback.
7. System starts the session and returns the first interviewer prompt.

### UJ-02 — Complete a turn

1. Browser speaks one interviewer prompt.
2. Candidate answers through Chrome speech recognition or text.
3. Interim STT text is displayed only in browser memory.
4. Frontend submits final answer text once.
5. Backend commits the answer before calling the text provider.
6. Backend returns the next grounded prompt, or clearly reports a retryable provider failure while preserving the answer.

### UJ-03 — End and review

1. Candidate ends early or the sixth answered turn reaches the cap.
2. Sessions with at least two answered turns become `ENDED`; shorter sessions become `ABANDONED`.
3. Candidate requests report generation for an `ENDED` session.
4. System returns a grounded report or an independently retryable report failure.
5. Candidate can delete the whole session immediately.

## 5. Functional requirements

### 5.1 M2 shadowing pilot

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

### 5.2 Future adaptive interview contract (M3+)

FR-001 through FR-094 below preserve the approved interview history. They are
not M2 requirements and are not evidence that the current M1 runtime implements
an interview product.

#### 5.2.1 Anonymous access and privacy

- **FR-001 MUST:** The system shall issue a high-entropy anonymous access token without requiring an account or invite code.
- **FR-002 MUST:** An unbound access grant shall expire after 15 minutes, bind to at most one interview session, and authorise only that session after binding.
- **FR-003 MUST:** The UI shall show consent before microphone capture, stating that Global-Ready stores no audio and that browser/vendor speech processing may occur.
- **FR-004 MUST:** The candidate shall be able to delete the owned session and all dependent context, turns, report, idempotency metadata, and access grant.
- **FR-005 MUST:** The application shall never persist raw audio, audio blobs, audio URLs, or browser interim transcript text.
- **FR-006 MUST:** The system shall set session `expiresAt` once at creation to `createdAt + 24h`.
- **FR-007 MUST:** Every owned read and write shall reject a logically expired session even if physical purge has not yet run.

#### 5.2.2 Candidate context

- **FR-010 MUST:** The candidate shall provide a non-blank target role.
- **FR-011 MUST:** The candidate shall paste non-blank CV, profile, or project text.
- **FR-012 MUST:** The candidate may paste a job description.
- **FR-013 MUST:** The system shall validate blank input, configured length limits, control characters, and malformed requests before persistence or provider use.
- **FR-014 MUST:** Interview prompts and reports shall not assert candidate experience absent from the supplied context or completed answers.
- **FR-015 MUST:** Candidate context shall be editable only while the session is `DRAFT`.
- **FR-016 MUST:** Candidate context shall become immutable when the session enters `READY`.

#### 5.2.3 Session configuration and lifecycle

- **FR-020 MUST:** The MVP shall use the fixed mode `PROJECT_DEEP_DIVE`.
- **FR-021 MUST:** The session shall allow at most six turns; each follow-up counts toward that cap.
- **FR-022 MUST:** The MVP shall not expose mode, difficulty, or duration selectors.
- **FR-023 MUST:** Before preparation, the UI shall show the context summary, fixed mode, turn cap, language behaviour, and expiry notice.
- **FR-024 MUST:** A newly created session shall be `DRAFT`.
- **FR-025 MUST:** The backend shall enforce the approved state-transition table and reject invalid transitions with `409 Conflict`.
- **FR-026 MUST:** The candidate may end an `ACTIVE` session at any time.
- **FR-027 MUST:** Ending with two or more answered turns shall produce `ENDED`; ending with fewer shall produce `ABANDONED`.
- **FR-028 MUST:** The sixth accepted answer shall end the session automatically without generating a seventh prompt.
- **FR-029 MUST:** Session and report state shall be queried independently.

#### 5.2.4 Device readiness and browser voice

- **FR-030 MUST:** The UI shall request microphone permission only after an explicit user action.
- **FR-031 MUST:** The UI shall distinguish denied, unavailable, unsupported, and runtime microphone/STT failures and show recovery guidance.
- **FR-032 MUST:** Text input shall be available for every candidate answer, including when speech recognition is unavailable.
- **FR-033 MUST:** The browser shall offer interviewer speech through `speechSynthesis`; visible interviewer text shall remain available when TTS fails.
- **FR-034 SHOULD:** The setup flow should provide a short microphone/STT test before starting.

#### 5.2.5 Interview execution and recovery

- **FR-040 MUST:** The system shall present one interviewer prompt at a time.
- **FR-041 MUST:** The frontend shall submit only final candidate answer text and its input source, never raw audio.
- **FR-042 MUST:** The UI shall expose at least `READY`, `LISTENING`, `PROCESSING`, `SPEAKING`, `COMPLETED`, and `ERROR` states.
- **FR-043 MUST:** Every generated next prompt shall be grounded in immutable candidate context, the current answer, previous completed turns, or the project deep-dive objective.
- **FR-044 MUST:** Candidate context and answers shall be delimited as untrusted data in provider prompts and shall not be treated as system instructions.
- **FR-045 MUST:** The backend shall commit a valid final answer before invoking the provider for the next prompt.
- **FR-046 MUST:** The backend shall not hold a database transaction open across a provider network call.
- **FR-047 MUST:** When next-prompt generation fails, the accepted answer shall remain stored and the operation shall expose a retryable state without creating a duplicate turn.
- **FR-048 MUST:** Successful replay of the same answer operation and idempotency key shall return the existing result.
- **FR-049 MUST:** Reusing an idempotency key with a different request payload shall return a conflict.
- **FR-050 MUST:** Provider timeouts and retries shall be bounded. Only transient failures may retry, and a server-provided retry delay shall be respected when available.

#### 5.2.6 Transcript

- **FR-060 MUST:** Each persisted turn shall contain sequence, interviewer prompt, final candidate answer, input source, and timing/status metadata.
- **FR-061 MUST:** Interim speech-recognition text shall remain client-side and shall never overwrite persisted final text.
- **FR-062 MUST:** The report input transcript shall be derived from ordered answered turns.
- **FR-063 MUST:** The MVP shall not edit or correct a persisted final transcript.
- **FR-064 MUST:** Relevant technical terms from candidate context should be included in bounded provider context where supported.
- **FR-065 MUST:** Missing or blank final text shall not count as an answered turn or report evidence.

#### 5.2.7 Feedback and report

- **FR-070 MUST:** A report may be requested only for an `ENDED` session with at least two answered turns.
- **FR-071 MUST:** The report shall contain strengths and between one and three prioritised improvement areas.
- **FR-072 MUST:** Every strength, priority, and answer observation shall reference one or more valid evidence turn IDs.
- **FR-073 MUST:** Feedback dimensions shall cover relevance, structure, clarity, ownership, technical communication, and English expression when evidence exists.
- **FR-074 MUST:** The report shall state that technical correctness and hiring readiness are not verified.
- **FR-075 MUST:** Each priority shall include a Vietnamese explanation and a concrete next-attempt action.
- **FR-076 MUST:** Answer feedback shall include an improved English outline but no generated full sample answer.
- **FR-077 MUST:** The system shall mark insufficient evidence instead of inventing an observation.
- **FR-078 MUST:** Report generation shall be idempotent, schema-validated, and independently retryable.
- **FR-079 MUST:** Report status shall be `NOT_STARTED`, `PENDING`, `COMPLETE`, or `FAILED` without changing the session from `ENDED`.

#### 5.2.8 Retention and deletion

- **FR-090 MUST:** Cleanup shall select sessions whose `expiresAt` is not after the injected application clock.
- **FR-091 MUST:** Cleanup shall physically delete the session aggregate and bound access grant by database cascade.
- **FR-092 MUST:** Cleanup shall be safe to rerun and shall run on a schedule and once at application startup.
- **FR-093 MUST:** Manual deletion and cleanup commands shall be safe to retry. After the access grant has been deleted, a repeated client request may receive the same success result or a non-enumerating not-found result.
- **FR-094 MUST:** The UI and documentation shall not promise exact physical purge timing while the service is stopped or asleep.

## 6. Business rules

### 6.1 M2 shadowing pilot

- **BR-100:** Playback completion is scoped to one source generation and stale events cannot complete a newer generation.
- **BR-101:** Reference playback is system-observed; learner speaking is self-attested.
- **BR-102:** The versioned manifest is the exercise source of truth and WebVTT is derived with one-to-one cue validation.
- **BR-103:** M2 creates no persisted learner attempt, progress, transcript, audio, or report.

### 6.2 Future adaptive interview contract (M3+)

- **BR-001:** `InterviewSession` is the aggregate root and owns exactly one `CandidateContext`, zero to six turns, and at most one report.
- **BR-002:** An unbound access grant may create at most one session.
- **BR-003:** The context freeze point is the successful `DRAFT -> READY` transition.
- **BR-004:** A session expires at a fixed instant and activity does not extend it.
- **BR-005:** A turn is answered only after non-blank final text is committed.
- **BR-006:** A provider failure after answer commit cannot undo or duplicate that answer.
- **BR-007:** No seventh turn may be created.
- **BR-008:** At least two answered turns are required for a report.
- **BR-009:** Report evidence IDs must belong to the same session and reference answered turns.
- **BR-010:** Numeric scores and full sample answers do not exist in MVP schemas.
- **BR-011:** Operation-specific idempotency keys and request fingerprints are compared together.
- **BR-012:** Expired resources are inaccessible before physical deletion.

## 7. State models

All state models in this section belong to the future adaptive interview
contract (M3+), not M2. M2 uses only transient frontend playback/view state.

### 7.1 Session

```text
DRAFT -> READY -> ACTIVE -> ENDED
                    |
                    +---------> ABANDONED

At now >= expiresAt, any retained session is effectively EXPIRED.
```

Allowed commands:

| Current | Command | Next | Guard |
|---|---|---|---|
| `DRAFT` | prepare | `READY` | Context is valid; freeze it. |
| `READY` | start | `ACTIVE` | First prompt can be created or retried idempotently. |
| `ACTIVE` | submit sixth answer | `ENDED` | Answer is committed first. |
| `ACTIVE` | end | `ENDED` | At least two answered turns. |
| `ACTIVE` | end | `ABANDONED` | Fewer than two answered turns. |
| retained | clock reaches expiry | effective `EXPIRED` | Reject access immediately. |

No session `FAILED` state exists. Provider/report errors are operation or report states.

### 7.2 Turn

```text
AWAITING_ANSWER -> ANSWERED
AWAITING_ANSWER -> CANCELLED   # only when session ends before answering
```

The answered turn separately records next-prompt generation as `NOT_REQUESTED | PENDING | COMPLETE | FAILED | CANCELLED`. A retry resumes only the failed generation stage. `CANCELLED` means the session ended while generation was in flight, so returned provider output was discarded.

### 7.3 Report

```text
NOT_STARTED -> PENDING -> COMPLETE
                  |
                  v
                FAILED -> PENDING
```

## 8. Non-functional requirements

### M2 shadowing, privacy, accessibility, and delivery

- **NFR-050 MUST:** The M2 application shall not intentionally persist, log, analytics-track, or transmit learner transfer content.
- **NFR-051 MUST:** Clean clone and CI shall run with deterministic local media/caption fixtures and no provider or cloud-storage key.
- **NFR-052 MUST:** Human media publication shall fail closed without approved rights metadata, media notice, release-record reference, and matching artifact hashes.
- **NFR-053 MUST:** Essential M2 controls, state, errors, transfer concealment, text fallback, and reflection shall be keyboard and accessibility-tree usable without live-region spam or visual-only instruction.
- **NFR-054 MUST:** The backend and database shall not upload, store, proxy, stream, or persist video, image, caption, or audio bytes.

The older NFRs below remain global where applicable or belong to the future
adaptive interview contract (M3+); the RTM records their exact scope.

### Performance and reliability

- **NFR-001 MUST:** Record stage durations for final-answer persistence, provider generation, next-turn persistence, report generation, and cleanup without recording raw content.
- **NFR-002 TARGET:** Backend-owned non-provider operations should complete within 500 ms at p95 in local evaluation.
- **NFR-003 MUST:** The UI shall show processing feedback after 300 ms.
- **NFR-004 MUST:** Provider calls shall have explicit connect/read/overall timeouts.
- **NFR-005 MUST:** Normal CI shall make no live Gemini request.
- **NFR-006 MUST:** Five concurrent fake-provider sessions shall not mix data.

### Security and privacy

- **NFR-020 MUST:** Non-local public deployment shall use TLS.
- **NFR-021 MUST:** Secrets shall come from environment or platform secret configuration.
- **NFR-022 MUST:** Authorisation shall compare a hash of the presented anonymous token with the stored grant and verify session binding.
- **NFR-023 MUST:** Access tokens shall never appear in URL paths, query parameters, logs, or error bodies.
- **NFR-024 MUST:** Normal logs and traces shall exclude raw CV, JD, transcript, report, prompt, and provider response text.
- **NFR-025 MUST:** Anonymous tokens shall use cryptographically secure randomness, be stored only as hashes server-side, be scoped to one bound session, and become invalid at session expiry.
- **NFR-026 CONDITIONAL:** Public deployments shall rate-limit anonymous grant creation and Gemini-backed operations. Local-only mode does not require persistent rate limiting.

### Maintainability and usability

- **NFR-040 MUST:** Domain/application code shall not depend on provider SDK types.
- **NFR-041 MUST:** Public API behaviour shall have an OpenAPI contract.
- **NFR-042 MUST:** State, idempotency, ownership, expiry, and evidence rules shall have automated tests at the lowest useful level.
- **NFR-043 MUST:** Schema changes shall use Flyway migrations.
- **NFR-044 MUST:** Frontend and backend shall build independently.
- **NFR-045 MUST:** Keyboard use and visible text fallback shall cover the essential setup/interview/report flow.
- **NFR-046 MUST:** Production code shall use an injected `Clock` for expiry decisions.

## 9. Acceptance scenarios

AS-01 through AS-08 are retained future adaptive interview scenarios for M3+
or conditional later milestones. They are not M2 acceptance evidence.

### AS-01 — Fake-provider happy path

Given a clean local environment, when the candidate creates access and a session, freezes valid context, answers at least two turns, ends, and requests a report, then a deterministic grounded report is displayed without any API key.

### AS-02 — Voice unavailable

Given Chrome speech recognition is denied or unsupported, when the candidate continues with text, then the same interview/report flow remains usable and no audio is sent to the backend.

### AS-03 — Provider failure after answer

Given an active session, when a valid answer is committed and next-prompt generation fails, then the answer remains visible, no duplicate next turn exists, and the same idempotent operation can resume.

### AS-04 — Hallucination guard

Given neither context nor answers state team-lead experience, when interviewer/report fixtures are validated, then no accepted output asserts that experience and all report observations use valid evidence turn IDs.

### AS-05 — Turn cap

Given five answered turns and one open sixth turn, when the sixth answer is accepted, then the session becomes `ENDED` and no seventh turn is created.

### AS-06 — Resource isolation

Given two access grants bound to separate sessions, when either token requests the other session, then the server denies access without revealing whether sensitive content exists.

### AS-07 — Logical expiry and purge

Given a session clock has reached `expiresAt`, reads and writes are rejected immediately; when cleanup runs repeatedly, the session, turns, report, and access grant are physically removed without error.

### AS-08 — Idempotency conflict

Given an answer was accepted with an idempotency key, replaying the same payload returns the existing result while replaying a different payload with that key returns `409 Conflict`.

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

## 10. Deferred requirements

- file upload and parsing;
- additional modes, difficulty, and duration choices;
- future interview transcript correction;
- raw audio replay/storage;
- session history and cross-session comparison;
- weakest-question retry;
- usefulness feedback;
- numeric scoring and full sample answers;
- public deployment and persistent distributed rate limiting;
- mobile/browser compatibility outside desktop Chrome.

Deferred items have no requirement IDs in the MVP traceability matrix.
