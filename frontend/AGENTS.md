# Frontend instructions

These instructions supplement the repository root instructions for `frontend/`.

- Use Node 24.19.0, npm, the committed lockfile, Next.js App Router, and strict
  TypeScript versions already selected by the repository.
- Keep browser-only speech recognition and speech synthesis behind capability
  checks; visible text and text-answer fallback remain mandatory.
- Submit only final candidate text. Never send or persist raw audio or interim
  speech-recognition text.
- Keep anonymous access metadata out of URLs and sensitive interview content
  out of logs, build output, fixtures, and browser persistence.
- Read the backend base URL from `NEXT_PUBLIC_API_BASE_URL`; never expose
  database or provider credentials to the browser.
- Run frontend-only checks from this directory with `npm run check`; use the
  root harness for repository gates.
- Every commit that changes frontend source, tests, build/runtime
  configuration, visible behavior, or these instructions must update
  `frontend/PROJECT_STATUS.md` with evidence in the same commit.
