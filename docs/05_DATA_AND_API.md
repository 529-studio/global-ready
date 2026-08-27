# Data and API Contract

Status: Canonical planning contract v0.3
Last updated: 2026-08-27

This document defines the planned M2 public exercise contract and preserves the
interview data/API contract for a separately approved M3 or conditional later
milestone. The current runtime is M1: no shadowing endpoint is implemented.
Generated OpenAPI becomes executable authority only when the relevant endpoint
is implemented; material divergence requires an owner-approved spec delta.

## 1. M2 public shadowing exercise contract

The API uses this convention:

- base path: `/api/v1`;

M2 defines
`GET /shadowing-exercises/{exerciseId}` as a public, read-only metadata/content
request. The complete planned path is
`GET /api/v1/shadowing-exercises/{exerciseId}`.

M2 requires no authentication, anonymous access token, account, cookie, or
`Idempotency-Key` because the operation reads public content and creates no
learner state. Spring returns JSON metadata; the browser requests the referenced
media and captions directly. The backend never proxies media bytes. M2 adds no table or migration,
and it adds no learner attempt, progress, transcript,
audio, report, AI-provider, or STT boundary.

### 1.1 Successful response

An available, active, fully validated exercise returns `200 application/json`
with this stable planning shape:

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

The two `synthetic-documentation-example-not-an-asset-hash` values are
documentation literals, never accepted asset hashes. Content validation must
require real SHA-256 values that match the exact approved artifacts before any
human media is made available.

The response is a public contract, not a learner record. `media.url` and
`media.captionsUrl` reference browser-direct resources; Spring and PostgreSQL
must not upload, store, serve, stream, or proxy their bytes.

### 1.2 Unknown or inactive exercise

An unknown or inactive exercise returns correlated `404
application/problem+json` and does not reveal unpublished content:

```json
{
  "type": "https://global-ready.dev/problems/shadowing-exercise-not-found",
  "title": "Shadowing exercise not found",
  "status": 404,
  "detail": "The requested shadowing exercise is unavailable.",
  "instance": "/api/v1/shadowing-exercises/unknown",
  "code": "SHADOWING_EXERCISE_NOT_FOUND",
  "correlationId": "7ca...",
  "retryable": false
}
```

### 1.3 Invalid manifest

A manifest with invalid cue order/identity/timing/text/role, a WebVTT mismatch,
unsupported publication status, incomplete rights metadata, duration drift, or
an artifact hash mismatch fails closed. It is never exposed as a partial `200`
response. The adapter may make it unavailable during startup/build validation
or return a correlated non-content-leaking server problem; the implementation
Issue must choose and test one representation without weakening the gate.

## 2. Future adaptive interview data model (M3+)

Everything from this section onward is a retained planning contract for M3 or
a conditional later adaptive interview milestone. It is not implemented by M1,
does not apply to M2, and must not be used to infer an M2 database, token,
idempotency, provider, or report boundary.

### 2.1 AnonymousAccessGrant

Security infrastructure issued before a session exists.

```text
id: UUID
tokenHash: fixed-length bytes/string, unique
sessionId: nullable UUID, unique after binding
sessionCreationIdempotencyKeyHash: nullable string
sessionCreationRequestFingerprint: nullable string
issuedAt: Instant
unboundExpiresAt: Instant
createdAt: Instant
```

Rules:

- generate at least 256 random bits with a cryptographically secure generator;
- return the raw token only on issuance;
- store only a one-way hash;
- set `unboundExpiresAt = issuedAt + 15 minutes` and reject the grant at or after that time;
- after binding, authorisation lifetime is derived from the bound session's `expiresAt`;
- one grant binds to at most one session.

### 2.2 CandidateContext

An owned value object persisted within the session row, not a reusable entity.

```text
targetRole: string
profileText: text
jobDescriptionText: nullable text
interviewLanguage: fixed EN
feedbackLanguage: fixed VI
frozenAt: nullable Instant
```

Context is editable only when `frozenAt == null` and session state is `DRAFT`.

### 2.3 InterviewSession

```text
id: UUID
mode: fixed PROJECT_DEEP_DIVE
state: DRAFT | READY | ACTIVE | ENDED | ABANDONED
targetRole: string
profileText: text
jobDescriptionText: nullable text
contextFrozenAt: nullable Instant
maxTurns: fixed 6
answeredTurnCount: integer
startIdempotencyKeyHash: nullable string
startRequestFingerprint: nullable string
rubricVersion: fixed string
promptVersion: fixed string
startedAt: nullable Instant
endedAt: nullable Instant
createdAt: Instant
updatedAt: Instant
expiresAt: Instant
version: long
```

`EXPIRED` is an effective state computed when `now >= expiresAt`; it does not need to be written before purge.

### 2.4 InterviewTurn

```text
id: UUID
sessionId: UUID
sequenceNumber: integer 1..6
status: AWAITING_ANSWER | ANSWERED | CANCELLED
questionText: text
questionKind: INITIAL | FOLLOW_UP | NEXT_TOPIC
candidateFinalText: nullable text
inputSource: nullable BROWSER_STT | TEXT
answerIdempotencyKeyHash: nullable string
answerRequestFingerprint: nullable string
nextPromptStatus: NOT_REQUESTED | PENDING | COMPLETE | FAILED | CANCELLED
providerOperationRef: nullable string
providerErrorCategory: nullable string
askedAt: Instant
answeredAt: nullable Instant
nextPromptCompletedAt: nullable Instant
createdAt: Instant
updatedAt: Instant
version: long
```

Constraints:

- unique `(session_id, sequence_number)`;
- sequence between 1 and 6;
- answered text is non-blank only when status is `ANSWERED`;
- only one open `AWAITING_ANSWER` turn per active session, enforced in application logic and concurrency tests;
- provider error metadata contains category/code only, never provider payload.

### 2.5 InterviewReport

```text
id: UUID
sessionId: UUID, unique
status: PENDING | COMPLETE | FAILED
generationIdempotencyKeyHash: string
generationRequestFingerprint: string
rubricVersion: string
generatorVersion: string
providerOperationRef: nullable string
providerErrorCategory: nullable string
overallSummary: nullable text
strengths: nullable JSONB
priorities: nullable JSONB
answerFeedback: nullable JSONB
evidenceCoverage: nullable JSONB
createdAt: Instant
updatedAt: Instant
version: long
```

API status `NOT_STARTED` means no report row exists.

### 2.6 Relationships

```text
AnonymousAccessGrant 1 ---- 0..1 InterviewSession
InterviewSession     1 ---- 0..6 InterviewTurn
InterviewSession     1 ---- 0..1 InterviewReport
```

Foreign keys delete dependent turns and report with the session. Session deletion also deletes or explicitly removes its bound access grant in the same use case.

No `CandidateSubject`, reusable profile, transcript-segment, audio, provider-session, or usefulness-feedback table exists.

## 3. Future interview data safety and indexes (M3+)

Required database constraints/indexes:

- unique access token hash;
- unique access-grant/session binding;
- unique turn sequence per session;
- unique report per session;
- index `interview_session(expires_at)` for cleanup;
- optimistic `version` on session, turn, and report where concurrent updates are possible;
- database checks for maximum turn sequence and non-negative answered count;
- `ON DELETE CASCADE` from session to turn/report.

Sensitive text remains in PostgreSQL for at most the logical session lifetime and is never duplicated into idempotency response blobs.

## 4. API conventions

The base path and ProblemDetail/correlation rules apply to M2. The bearer-token
and idempotency conventions below apply only to future adaptive interview
operations; they do not apply to the public M2 GET.

- base path: `/api/v1`;
- JSON: camelCase;
- identifiers: UUID;
- timestamps: ISO-8601 UTC;
- access: `Authorization: Bearer <anonymous-token>`;
- mutating single-use operations require an `Idempotency-Key` header;
- idempotency keys are opaque and unique per operation;
- request fingerprints are computed from canonical relevant input;
- errors use `application/problem+json` with Spring `ProblemDetail`;
- public DTOs never expose JPA entities, token hashes, request fingerprints, or provider SDK types.

Example error:

```json
{
  "type": "https://global-ready.dev/problems/session-invalid-state",
  "title": "Session state conflict",
  "status": 409,
  "detail": "The session cannot be started from its current state.",
  "instance": "/api/v1/interview-sessions/4b7.../start",
  "code": "SESSION_INVALID_STATE",
  "correlationId": "7ca...",
  "retryable": false
}
```

Errors never echo candidate text, tokens, provider payloads, or stack traces.

## 5. Future adaptive interview endpoint contract (M3+)

The retained endpoints in this section remain planned rather than implemented.
They are future-scoped and are not mapped to M2.

### 5.1 Anonymous access

#### `POST /access-grants`

Issues an unbound grant. No account or invite code.

Response `201`:

```json
{
  "accessToken": "returned-once-secret",
  "unboundExpiresAt": "2026-08-24T01:15:00Z"
}
```

The browser stores the token only in `sessionStorage`. This endpoint is rate-limited only in a public deployment.

### 5.2 Sessions

#### `POST /interview-sessions`

Requires bearer token and a session-creation `Idempotency-Key`. Atomically creates `DRAFT` and binds the caller's grant.

Request:

```json
{
  "targetRole": "Java Backend Engineer",
  "profileText": "Pasted CV or project context...",
  "jobDescriptionText": "Optional pasted JD..."
}
```

Response `201`:

```json
{
  "id": "uuid",
  "state": "DRAFT",
  "mode": "PROJECT_DEEP_DIVE",
  "maxTurns": 6,
  "answeredTurnCount": 0,
  "createdAt": "2026-08-24T00:00:00Z",
  "expiresAt": "2026-08-25T00:00:00Z"
}
```

#### `GET /interview-sessions/{sessionId}`

Returns owned unexpired session summary, context while accessible, current/open turn, report status, and timestamps. It never returns token metadata or provider raw data.

#### `PATCH /interview-sessions/{sessionId}/context`

Edits target role/profile/JD only in `DRAFT`. The request includes `expectedVersion`; a stale version returns `409 SESSION_VERSION_CONFLICT`. Idempotency is not required because the request replaces the complete context.

#### `POST /interview-sessions/{sessionId}/prepare`

Validates context, freezes it, and transitions `DRAFT -> READY`. Repeated call in `READY` returns the existing result.

#### `POST /interview-sessions/{sessionId}/start`

Requires a start-specific `Idempotency-Key`. Transitions to `ACTIVE`, generates/stores exactly one first turn outside the state transaction, and returns it.

Successful response:

```json
{
  "sessionState": "ACTIVE",
  "turn": {
    "id": "uuid",
    "sequenceNumber": 1,
    "questionText": "Tell me about the project and the problem it solved.",
    "status": "AWAITING_ANSWER"
  }
}
```

If provider generation fails, return a retryable problem. Reusing the same start key resumes generation and cannot create two turn-1 rows.

#### `POST /interview-sessions/{sessionId}/end`

Ends early. It cancels an unanswered open turn and returns `ENDED` when at least two answers exist, otherwise `ABANDONED`. Repeated calls return the terminal result.

#### `DELETE /interview-sessions/{sessionId}`

Deletes the session aggregate and access grant. Returns `204`. A repeated request from the same client may receive `204` only while the server can safely recognise the deletion operation; otherwise non-enumerating `404` is acceptable.

There is no list/history endpoint.

### 5.3 Turns

#### `PUT /interview-sessions/{sessionId}/turns/{turnId}/answer`

Requires an answer-specific `Idempotency-Key`.

Request:

```json
{
  "finalText": "I built the order workflow using Spring Boot...",
  "inputSource": "BROWSER_STT"
}
```

Behaviour:

1. authorise and reject expired/non-active/wrong-open-turn requests;
2. persist the final answer and increment answered count in a short transaction;
3. if this is turn six, transition to `ENDED` and return without provider call;
4. otherwise call the interview gateway outside a transaction;
5. create exactly one next turn in a second transaction;
6. on provider failure, mark next-prompt status `FAILED` while preserving the answer;
7. if the session ends or expires while generation is in flight, discard provider output and never create or reopen a turn.

Successful response:

```json
{
  "acceptedTurn": {
    "id": "uuid",
    "sequenceNumber": 1,
    "status": "ANSWERED"
  },
  "nextTurn": {
    "id": "uuid",
    "sequenceNumber": 2,
    "questionText": "Why did you choose that transaction boundary?",
    "status": "AWAITING_ANSWER"
  },
  "sessionState": "ACTIVE",
  "turnLimitReached": false
}
```

Provider failure response uses `502` or `503` ProblemDetail extensions:

```json
{
  "code": "NEXT_PROMPT_GENERATION_FAILED",
  "retryable": true,
  "answerSaved": true,
  "acceptedTurnId": "uuid"
}
```

Retry the same endpoint with the same key and payload. The backend resumes only next-prompt generation.

#### `GET /interview-sessions/{sessionId}/turns`

Returns ordered turns. Candidate final text appears only for answered turns. Interim STT never appears.

There is no candidate-facing interviewer-output write endpoint.

### 5.4 Report

#### `POST /interview-sessions/{sessionId}/report`

Requires a report-specific `Idempotency-Key`. Valid only for unexpired `ENDED` with at least two answered turns.

The backend persists `PENDING`, calls the report gateway outside a transaction, validates output, then stores `COMPLETE` or `FAILED`. Reusing the same key resumes a retryable failure.

#### `GET /interview-sessions/{sessionId}/report`

Returns `NOT_STARTED` when no row exists, or the persisted status/result.

There is no usefulness-feedback endpoint.

## 6. Future interview report schema (M3+)

```json
{
  "sessionId": "uuid",
  "status": "COMPLETE",
  "rubricVersion": "communication-v1",
  "overallSummaryVi": "Bạn giải thích rõ vai trò của mình...",
  "strengths": [
    {
      "titleVi": "Nêu rõ quyền sở hữu công việc",
      "evidenceTurnIds": ["uuid"],
      "explanationVi": "..."
    }
  ],
  "priorities": [
    {
      "dimension": "STRUCTURE",
      "titleVi": "Nêu kết quả trước",
      "evidenceTurnIds": ["uuid"],
      "explanationVi": "...",
      "nextAttemptActionVi": "..."
    }
  ],
  "answerFeedback": [
    {
      "turnId": "uuid",
      "observationsVi": ["..."],
      "improvedOutlineEn": [
        "Result",
        "Context and responsibility",
        "Decision and trade-off",
        "Measured outcome"
      ],
      "technicalCorrectness": "NOT_VERIFIED"
    }
  ],
  "evidenceCoverage": {
    "sufficient": true,
    "missingDimensions": []
  },
  "limitationsVi": "Hệ thống không xác minh tính đúng kỹ thuật hoặc mức độ sẵn sàng tuyển dụng."
}
```

Validation:

- one to three priorities;
- every evidence turn ID belongs to the session and is answered;
- no numeric score;
- no full sample answer;
- required Vietnamese and English fields are non-blank;
- invalid structured output is not persisted as `COMPLETE`.

## 7. Future interview idempotency rules (M3+)

| Operation | Key storage | Same key + same fingerprint | Same key + different fingerprint |
|---|---|---|---|
| Create session | Session/binding metadata | Return existing session | `409 IDEMPOTENCY_KEY_REUSED` |
| Start | Session start metadata | Return/resume first turn | `409` |
| Submit answer | Target turn | Return/resume saved operation | `409` |
| Generate report | Report | Return/resume report | `409` |

Keys are not reused across rows or operation types. Raw key values are not logged; storage may use a stable hash.

## 8. Future interview retention (M3+)

| Data | Policy |
|---|---|
| Raw audio | Never enters persistence. |
| Interim STT | Browser memory only. |
| Candidate context | Owned by session; inaccessible after 24h; purged with session. |
| Final answers/questions | Owned by session; inaccessible after 24h; purged with session. |
| Report | Owned by session; inaccessible after 24h; purged with session. |
| Access token | Raw value browser-only; hash invalid after session expiry and removed during purge. |
| Operational logs | IDs, sizes, status, duration, and error category only; environment retention policy applies. |
