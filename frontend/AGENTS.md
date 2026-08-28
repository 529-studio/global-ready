# Frontend instructions

These instructions supplement the repository root instructions for `frontend/`.

- Use Node 24.19.0, npm, the committed lockfile, Next.js App Router, and strict
  TypeScript versions already selected by the repository.
- Read the backend base URL from `NEXT_PUBLIC_API_BASE_URL`; never expose
  database or provider credentials to the browser.

## M2 shadowing boundary

- Request the public exercise metadata/content contract from Spring, then
  request approved media and captions directly from their configured origin.
  Never route media bytes through the backend.
- Keep learner transfer text transient in component/application memory. Do not
  intentionally persist, log, analytics-track, place in URLs, or transmit it;
  clear it on completion, reset, navigation, and unmount.
- Transcript hiding is UI-only concealment from the rendered UI and
  accessibility tree, not authentication, DRM, anti-cheat protection, or
  secure browser/OS erasure.
- Reference playback may be system-observed, but learner speaking is
  self-attested. The UI must not claim speech verification or pronunciation
  assessment; non-empty transient text remains the mandatory fallback.
- Remove media listeners and invalidate the active playback generation on
  reset, source replacement, unmount, or fatal error so stale browser events
  cannot unlock transfer.
- Use deterministic Vitest reducer/state evidence, React Testing Library
  component/accessibility evidence, and one focused Playwright Chromium flow.

## Future adaptive interview boundary

- Keep browser-only speech recognition and speech synthesis behind capability
  checks; visible text and text-answer fallback remain mandatory.
- Submit only final candidate text. Never send or persist raw audio or interim
  speech-recognition text.
- Keep anonymous access metadata out of URLs and sensitive interview content
  out of logs, build output, fixtures, and browser persistence.
- Follow RED -> GREEN -> REFACTOR for frontend behavior. Start with a failing
  reducer/component/contract test at the lowest useful level, use deterministic
  browser adapters, and retain explicit manual Chrome evidence for media,
  microphone, speech, accessibility, or timing behavior that CI cannot prove.
- Run frontend-only checks from this directory with `npm run check`; use the
  root harness for repository gates.
- Every commit that changes frontend source, tests, build/runtime
  configuration, visible behavior, or these instructions must update
  `frontend/PROJECT_STATUS.md` with evidence in the same commit.
