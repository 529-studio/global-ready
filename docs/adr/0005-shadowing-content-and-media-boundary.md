# ADR-0005: Shadowing content and media boundary

Status: Accepted
Date: 2026-08-27

## Context

The M2 pilot must validate one active shadowing exercise while retaining a
meaningful Java/Spring slice and a zero-cost clean-clone path. Exercise script,
roles, timing, captions, media delivery, transfer gating, learner privacy, and
future storage could otherwise become competing sources of truth or create a
backend media pipeline that the pilot does not need.

The public exercise content and captions cannot be treated as secrets, and
transient browser state cannot guarantee secure erasure from the browser,
operating system, IME, extension, crash recovery, cache, or developer tools.

## Decision

- Introduce the M2 package boundary `com.globalready.shadowing` within the
  existing modular monolith.
- Plan `GET /api/v1/shadowing-exercises/{exerciseId}` as a public, read-only
  metadata/content-contract endpoint. It carries exercise metadata and public
  media/caption references only.
- Use one versioned exercise manifest as the content source of truth. Derive
  WebVTT from it and validate a bijection across cue identity, order, role,
  text, timing, duration, and integrity evidence.
- Treat the media clock and WebVTT cue timing as the timing authority. Transfer
  unlocks only after reset, start, no forward seek, and a non-stale native
  `ended` event in one playback generation. This observes a complete reference
  playback pass, not whether the learner spoke.
- The browser requests media and captions directly from a deterministic local
  fixture or future owner-approved public origin; the backend never uploads, stores, proxies, or streams media bytes, and the database never stores media
  bytes.
- M2 performs no learner audio capture. Learner text is transient application
  state that the application does not intentionally persist, log,
  analytics-track, or transmit. Transcript hiding is UI-only concealment, not
  authentication, anti-cheat, DRM, or content security.
- M2 selects no cloud or object-storage provider. A clean clone and CI contain
  no cloud credential, hosted-media requirement, or third-party media network
  dependency.

## Consequences

- Spring retains an explicit first-product role without inventing persistence,
  learner identity, JPA entities, or a media transport service.
- Media bandwidth, byte storage, codecs, and publication operations remain
  outside the backend and database boundary.
- Manifest/WebVTT drift and stale playback callbacks become mechanically
  testable.
- Public exercise assets remain inspectable through API responses, WebVTT,
  caches, and developer tools; product wording cannot promise content secrecy.
- Application-controlled privacy is narrow and testable, while browser/OS
  behaviour remains an explicit limitation.
- A later public media origin requires a separate owner-approved provider and
  rights decision without changing the M2 metadata-only Spring boundary.

## Recovery

Disable or remove the M2 `/practice` route and the planned shadowing metadata
API if the pilot, content, rights, privacy, or media boundary is rejected. M2
stores no learner attempt or media bytes, so recovery requires no data or
schema migration. The prior interview contracts remain future-scoped and can
continue under a separately approved milestone.
