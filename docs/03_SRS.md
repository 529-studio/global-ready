# Software Requirements Specification

Product: Global-Ready  
Status: Canonical v0.2  
Last updated: 2026-08-24  
Audience: Owner, implementation assistant, reviewer

## 1. Purpose

This SRS defines the zero-cost MVP behaviour of Global-Ready. Requirements marked `MUST` form the implementation baseline. `SHOULD` items may be moved only through an explicit spec delta. Deferred requirements are not part of MVP acceptance.

## 2. Definitions

| Term | Meaning |
|---|---|
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

- **Candidate:** creates, performs, ends, reviews, and deletes one interview.
- **Browser:** performs speech recognition and speech synthesis and renders the UI.
- **Backend:** owns access, state, persistence, orchestration, expiry, and provider calls.
- **Text AI provider:** generates interviewer prompts and reports from bounded, untrusted inputs.

The browser or its vendor may process microphone input. Global-Ready itself must not upload or persist raw audio.

## 4. Primary journeys

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

### 5.1 Anonymous access and privacy

- **FR-001 MUST:** The system shall issue a high-entropy anonymous access token without requiring an account or invite code.
- **FR-002 MUST:** An unbound access grant shall expire after 15 minutes, bind to at most one interview session, and authorise only that session after binding.
- **FR-003 MUST:** The UI shall show consent before microphone capture, stating that Global-Ready stores no audio and that browser/vendor speech processing may occur.
- **FR-004 MUST:** The candidate shall be able to delete the owned session and all dependent context, turns, report, idempotency metadata, and access grant.
- **FR-005 MUST:** The application shall never persist raw audio, audio blobs, audio URLs, or browser interim transcript text.
- **FR-006 MUST:** The system shall set session `expiresAt` once at creation to `createdAt + 24h`.
- **FR-007 MUST:** Every owned read and write shall reject a logically expired session even if physical purge has not yet run.

### 5.2 Candidate context

- **FR-010 MUST:** The candidate shall provide a non-blank target role.
- **FR-011 MUST:** The candidate shall paste non-blank CV, profile, or project text.
- **FR-012 MUST:** The candidate may paste a job description.
- **FR-013 MUST:** The system shall validate blank input, configured length limits, control characters, and malformed requests before persistence or provider use.
- **FR-014 MUST:** Interview prompts and reports shall not assert candidate experience absent from the supplied context or completed answers.
- **FR-015 MUST:** Candidate context shall be editable only while the session is `DRAFT`.
- **FR-016 MUST:** Candidate context shall become immutable when the session enters `READY`.

### 5.3 Session configuration and lifecycle

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

### 5.4 Device readiness and browser voice

- **FR-030 MUST:** The UI shall request microphone permission only after an explicit user action.
- **FR-031 MUST:** The UI shall distinguish denied, unavailable, unsupported, and runtime microphone/STT failures and show recovery guidance.
- **FR-032 MUST:** Text input shall be available for every candidate answer, including when speech recognition is unavailable.
- **FR-033 MUST:** The browser shall offer interviewer speech through `speechSynthesis`; visible interviewer text shall remain available when TTS fails.
- **FR-034 SHOULD:** The setup flow should provide a short microphone/STT test before starting.

### 5.5 Interview execution and recovery

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

### 5.6 Transcript

- **FR-060 MUST:** Each persisted turn shall contain sequence, interviewer prompt, final candidate answer, input source, and timing/status metadata.
- **FR-061 MUST:** Interim speech-recognition text shall remain client-side and shall never overwrite persisted final text.
- **FR-062 MUST:** The report input transcript shall be derived from ordered answered turns.
- **FR-063 MUST:** The MVP shall not edit or correct a persisted final transcript.
- **FR-064 MUST:** Relevant technical terms from candidate context should be included in bounded provider context where supported.
- **FR-065 MUST:** Missing or blank final text shall not count as an answered turn or report evidence.

### 5.7 Feedback and report

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

### 5.8 Retention and deletion

- **FR-090 MUST:** Cleanup shall select sessions whose `expiresAt` is not after the injected application clock.
- **FR-091 MUST:** Cleanup shall physically delete the session aggregate and bound access grant by database cascade.
- **FR-092 MUST:** Cleanup shall be safe to rerun and shall run on a schedule and once at application startup.
- **FR-093 MUST:** Manual deletion and cleanup commands shall be safe to retry. After the access grant has been deleted, a repeated client request may receive the same success result or a non-enumerating not-found result.
- **FR-094 MUST:** The UI and documentation shall not promise exact physical purge timing while the service is stopped or asleep.

## 6. Business rules

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

## 10. Deferred requirements

- file upload and parsing;
- additional modes, difficulty, and duration choices;
- pause/resume and transcript correction;
- raw audio replay/storage;
- session history and cross-session comparison;
- weakest-question retry;
- usefulness feedback;
- numeric scoring and full sample answers;
- public deployment and persistent distributed rate limiting;
- mobile/browser compatibility outside desktop Chrome.

Deferred items have no requirement IDs in the MVP traceability matrix.
