# Open Questions

Status: v0.2 — no implementation blockers  
Last updated: 2026-08-24

All product and architecture choices needed for M1 and M2 are resolved in `02_ASSUMPTIONS_AND_DECISIONS.md`.

The items below are implementation-time checks or optional later decisions. They must not expand MVP scope silently.

## 1. Checks at scaffold time

### Q-101 — Exact supported versions

Confirm from official compatibility documentation:

- Spring Boot line that supports Java 25;
- stable Next.js and supported Node.js versions;
- PostgreSQL image major version;
- Testcontainers and OpenAPI library versions.

Pin exact versions. Do not silently downgrade Java 25.

### Q-102 — Local container experience

Verify whether the owner's Colima/Docker environment can build both applications within reasonable memory. If not, keep PostgreSQL in Compose and run frontend/backend directly during development. This changes developer convenience, not architecture.

## 2. Checks before M3 real voice/provider work

### Q-201 — Chrome speech recognition quality

Run a documented manual corpus containing Vietnamese-accented English and Java/Spring vocabulary. Record:

- support/permission behaviour;
- final transcript quality;
- technical-term failure examples;
- whether manual text fallback is usable.

Failure does not block the MVP because text fallback is mandatory.

### Q-202 — Gemini configuration

At M3, check current official Gemini documentation for:

- available free-tier text model;
- structured-output support;
- request/rate limits;
- data-use and retention terms;
- Java integration option;
- timeout and retry guidance.

The fake adapter remains the required default. Do not hard-code a model name from an older document.

### Q-203 — Structured report reliability

Use a small synthetic manual evaluation corpus in M5. Decide whether strict schema prompting plus validation is sufficient. A repair call may be added only if measured failures justify its extra quota and complexity.

## 3. Checks only before optional public deployment

### Q-301 — Hosting and sleeping cleanup

Select hosting only after checking current free allowances. A platform that sleeps is acceptable if documentation preserves the distinction between immediate logical expiry and best-effort physical purge.

### Q-302 — Rate limiting

If a public Gemini-backed demo is enabled, choose the smallest in-process limiter that protects anonymous grant creation and provider operations. Do not add Redis for the MVP.

### Q-303 — Demo data policy

Use synthetic/anonymised CV, JD, transcript, and report data unless current provider and hosting policies have been reviewed for real personal data.

## 4. Explicitly deferred product questions

These do not block implementation:

- more interview modes;
- difficulty/duration controls;
- PDF upload;
- account/history;
- transcript correction;
- weakest-question retry;
- mobile/browser expansion;
- public sharing;
- numeric scoring;
- paid hosting or paid AI.

