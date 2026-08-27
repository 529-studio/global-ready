# Architecture

Status: Canonical v0.3
Last updated: 2026-08-27

## 1. Architectural goals and milestone boundary

- run locally at zero monetary cost with deterministic fixtures;
- make M2 one Spring-backed shadowing pilot with browser-direct media;
- keep exercise content, WebVTT, timing, and integrity mechanically aligned;
- keep learner transfer state transient and privacy claims app-controlled;
- preserve the modular monolith and independent frontend/backend builds;
- retain the approved interview architecture for M3+ without reporting it as
  implemented or assigning it to M2.

The current runtime is the M1 scaffold. This document plans M2; it does not
claim that the shadowing endpoint, player, content adapter, or tests exist.
`ADR-0005` is the durable authority for the M2 content and media boundary.

## 2. M2 system context

```text
Desktop Chrome
├── Next.js /practice UI
├── API adapter ── GET public exercise metadata ──> Spring Boot modular monolith
│                                                    └── com.globalready.shadowing
├── playback state machine
└── media adapter + <video>/<track>
      └── direct media/caption GET/HEAD/range ─────> deterministic local/static media origin
                                                     or separately approved public media origin
```

Spring returns public exercise metadata and content fields. The browser, not
Spring or PostgreSQL, requests MP4 and WebVTT bytes directly from the local
fixture origin or a separately approved future public origin. M2 has no
learner identity, account, anonymous token, learner persistence, STT, AI
provider, report, media upload, media proxy, or media database table.

## 3. Technology baseline

| Area | Decision |
|---|---|
| Repository | Existing monorepo; independently buildable backend/frontend |
| Backend | Java 25, Spring Boot, Spring MVC, modular monolith |
| M2 persistence | None; existing JPA/Flyway/PostgreSQL scaffold is unchanged |
| API errors | Spring `ProblemDetail` with correlation ID |
| Frontend | Pinned Next.js, React, TypeScript, App Router |
| Media timing | `HTMLMediaElement` clock and derived WebVTT cues |
| M2 tests | JUnit/MockMvc, Vitest, React Testing Library, focused Playwright Chromium |
| Local orchestration | Existing Docker Compose and repository verification harness |

Exact production symbols, DTO/class names, reducer representation, player
adapter, codec profile, and generator language remain Issue-level choices.

## 4. Spring shadowing boundary

M2 adds `com.globalready.shadowing` inside the existing modular monolith:

```text
com.globalready.shadowing
├── api                 # public HTTP contract and ProblemDetail mapping
├── application-domain  # read/validate available exercise contract
└── content-adapter     # versioned manifest and configured public references
```

The names above describe responsibilities, not required Java symbols. The
boundary:

- loads one versioned manifest and validates it before exposure;
- returns public exercise metadata, ordered cues, transfer/reflection fields,
  media references, and rights/integrity status;
- rejects unknown/inactive content with correlated `404
  application/problem+json`;
- fails closed on an invalid manifest instead of serving a partial contract;
- does not depend on JPA, Flyway, provider ports, learner identity, or media
  byte transport in M2.

## 5. Manifest and WebVTT authority

One machine-readable manifest is the exercise source of truth. It owns stable
exercise/cue IDs, version, title, target role, ordered cue timing and speaker,
text, Vietnamese intent, key chunks, transfer prompt, four-part checklist,
expected duration, asset version/hash, and non-personal rights metadata.

WebVTT is derived from the manifest. Content validation proves a one-to-one
mapping across cue identity, order, speaker, text, start/end timing, expected
duration, version, and integrity evidence. Duplicate, missing, reordered,
overlapping, unsupported, empty, mismatched, or uncovered human-media content
fails closed. No second hand-edited script or caption source is authoritative.

## 6. Media delivery boundary

- Spring response JSON contains media and caption references but no bytes.
- The browser fetches those references directly.
- The deterministic repository fixture is the clean-clone and CI path.
- M2 selects no R2, GCS, Drive, CDN, object store, or hosted media service.
- The backend never uploads, stores, proxies, or streams media bytes.
- PostgreSQL never stores video, image, caption, or audio bytes.

A later public media origin requires a separate owner-approved decision and
must preserve the metadata-only Spring boundary unless an ADR changes it.

## 7. Frontend boundaries

The planned `/practice` feature has focused responsibilities:

- **API adapter:** fetches and validates the Spring response boundary;
- **playback state machine:** owns generation identity and valid transitions;
- **media adapter:** translates native media/track events without creating a
  second clock;
- **guided view:** identifies active speaker/cue and exposes playback controls;
- **transfer view:** removes source/reveal content and holds learner input only
  in route-owned memory;
- **reflection view:** restores source content and the four-part checklist.

The UI uses explicit data/events so pure playback behavior is testable without
a browser, while one focused browser flow proves the integrated boundary.

## 8. Playback sequence and recovery

```text
reset(source, generation N)
        |
        v
start from beginning
        |
        +-- forward seek / reset / source replace / unmount / fatal error
        |       -> invalidate generation N; transfer remains locked
        |
        +-- pause / buffering / backward seek / supported rate change
        |       -> generation N remains eligible
        |
        v
native ended(generation N)
        |
        +-- stale generation -> ignore
        +-- current + started + no forward seek -> unlock transfer
```

Completion means only that the system observed one complete reference
playback. It does not verify speaking, pronunciation, learning, or attention.
Retry creates a new generation, keeps transfer locked, and makes callbacks
from the failed generation stale.

The media clock and active WebVTT cue are the only timing authority. Audible
playback begins only after explicit learner action. Loading, play-promise,
caption, codec, and network failures produce truthful retry or fatal guidance;
invalid content never renders partially.

## 9. Privacy and UI concealment threat boundary

### 9.1 Application-controlled guarantees

M2 does not intentionally persist, log, analytics-track, or transmit learner
transfer content. It does not put that content in storage, cookies, URLs,
query strings, logs, console output, telemetry, provider payloads, form
navigation, fetch/XHR/beacon/WebSocket traffic, backend state, or files.
Transient text lives in route-owned application memory and is cleared on reset
or teardown. M2 does not capture learner audio.

### 9.2 UI-only concealment

During transfer, transcript, cue text, key chunks, and product reveal controls
are absent from the rendered product UI and product accessibility tree. Public
API/VTT content can remain visible through caches, developer tools, or a
modified client. This is UI concealment, not authentication, anti-cheat, DRM,
content security, or secure erasure.

The application cannot control browser history/form restoration, bfcache,
crash recovery, IMEs, spellcheck services, extensions, accessibility software,
the operating system, screenshots, or modified clients. Product language must
not promise control outside the application boundary.

## 10. Verification levels

| Level | Planned M2 evidence |
|---|---|
| MockMvc | stable public response; unknown/inactive correlated 404; invalid manifest fail-closed; no auth/idempotency requirement |
| Vitest | reset/start/ended success; forward-seek and invalidation events; stale generation; cue and media adapter logic |
| React Testing Library | guided/transfer/reflection states; accessibility-tree concealment; keyboard/text fallback; truthful errors; sink guards |
| Playwright Chromium | Spring metadata plus browser-direct media; explicit start; playback/transfer/reflection; retry/reset; app-controlled privacy sinks |
| Content validator | manifest/WebVTT one-to-one validation, hashes, rights metadata, deliberate invalid fixtures |
| Smoke | deterministic fixture MIME/range behavior and zero-key clean-clone path |
| Manual owner evidence | real Chrome timing/rates, keyboard/screen-reader use, media quality, and pilot go/no-go |

Vitest/RTL/Playwright are approved planning dependencies for later M2 Issues;
Issue #17 adds none of them.

## 11. Rights and integrity boundary

Real human media is rejected unless private releases cover every audible or
visible participant and the public contract includes approved publication
scope, media-specific notice, non-personal release-record reference, and
matching hashes for the exact media, manifest, VTT, and script/version. Private
releases and identities stay outside Git. A checksum proves integrity, not
rights. The deterministic non-person fixture remains the automated fallback.

## 12. Future adaptive interview architecture (M3+)

The following approved v0.2 contracts remain available for a separately
approved M3 or conditional later slice. They are not part of M2 and are not
reported as current runtime capability.

### 12.1 Aggregate and persistence

`InterviewSession` remains the aggregate root and owns one
`CandidateContext`, zero to six `InterviewTurn` values, and at most one
`InterviewReport`. Candidate context becomes immutable at `READY`. JPA,
PostgreSQL, Flyway, optimistic versioning, sequence uniqueness, and cascade
deletion apply only when this persisted interview boundary is activated.

### 12.2 State, token, and expiry

Session states remain `DRAFT`, `READY`, `ACTIVE`, `ENDED`, `ABANDONED`, and
effective `EXPIRED`; there is no session `FAILED`. Anonymous access tokens are
high entropy, session-scoped, returned once, stored only as hashes, omitted
from URLs/logs, and expire with the session. `InterviewSession.expiresAt` is
fixed at creation and every read/write rejects expiry immediately. Scheduled
physical purge remains best effort while the service is offline.

### 12.3 Provider and transaction boundary

`InterviewResponseGateway` and `ReportGenerationGateway` remain the
domain-oriented provider ports. Fake providers are deterministic/default and
Gemini is explicit opt-in. The backend commits an answer or report intent
before invoking a provider, invokes providers outside database transactions,
and uses a second short transaction for success/failure. Provider failure
preserves the answer and supports operation-specific idempotent retry.

### 12.4 Turns, idempotency, and reports

A session owns at most six turns and a follow-up consumes one turn. Creation,
start, turn submission, retry, and report generation use operation-specific
idempotency keys and request fingerprints. Report states remain
`NOT_STARTED`, `PENDING`, `COMPLETE`, and `FAILED`. Reports contain strengths,
one to three priorities, evidence turn IDs, and improved outlines, with no
numeric score or complete sample answer.

### 12.5 Future interview verification

When activated, this boundary requires aggregate/state unit tests,
Flyway/Testcontainers persistence tests, transaction/idempotency component
tests, bearer/expiry/ProblemDetail API tests, deterministic fake-provider
flows, and small manual Gemini/browser-speech evaluation. Text fallback and no
raw-audio persistence remain mandatory.

## 13. ADR index

- `ADR-0001`: modular monolith and monorepo;
- `ADR-0002`: browser speech plus text-provider topology (future M3+);
- `ADR-0003`: session aggregate and 24-hour retention (future M3+);
- `ADR-0004`: external provider calls outside transactions (future M3+);
- `ADR-0005`: shadowing content and media boundary (M2).
