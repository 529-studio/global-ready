# M1 Implementation Handoff

Status: Scaffold generated; local Docker gate pending  
Date: 2026-08-24  
Authority: progress record only; current requirements are in canonical v0.3 documents

## Scope completed

- Java 25 / Spring Boot 4.1.1 Gradle backend with MVC, validation, Actuator, JPA, Flyway, PostgreSQL, Springdoc, virtual threads, injected UTC `Clock`, structured logs, and correlation IDs.
- Next.js 16.3.2 App Router frontend with a minimal M1 checkpoint page.
- Exact dependency and container-image pins, Gradle Wrapper, `.nvmrc`, lockfile, environment example, Dockerfiles, Compose, and independent GitHub Actions jobs.
- Testcontainers PostgreSQL 18.6 wiring, context test, database/Flyway integration test, and correlation-ID unit tests.
- No session, turn, report, provider, token, or speech domain implementation.

## Verification evidence in the generation environment

| Gate | Result |
|---|---|
| Backend production sources compile with Java 25 | Passed |
| Backend test sources compile with Java 25 | Passed |
| `CorrelationIdFilterTests` | Passed: 2 tests |
| Frontend ESLint | Passed |
| Next route-type generation | Passed |
| TypeScript `--noEmit` | Passed |
| Next production build | Passed |
| Compose and CI YAML parsing | Passed |
| Full Spring context + PostgreSQL Testcontainers | Not run: Docker unavailable in generation environment |
| `docker compose config` semantic validation | Not run: Docker Compose unavailable in generation environment |

The PostgreSQL 18 volume target is `/var/lib/postgresql`. Do not change it to the pre-18 `/var/lib/postgresql/data` path.

## Owner acceptance commands

Run from the repository root on a machine with JDK 25, Node 24, and Docker:

```bash
cp .env.example .env
docker compose config
docker compose --profile app config
docker compose up -d postgres

cd backend
./gradlew check

cd ../frontend
npm ci
npm run check
```

Then verify:

- `http://localhost:8080/actuator/health` returns an up status while the backend is running;
- `http://localhost:8080/api-docs` returns OpenAPI JSON;
- `http://localhost:3000` renders the M1 page;
- stopping and recreating the PostgreSQL container retains a deliberately created test database object through the named volume.

## Review before M2

This 2026-08-24 review list is retained as generation history; the addendum
below supersedes its former M2 boundary.

- Explain why M1 contains no empty domain entities or repositories.
- Review every dependency and confirm it has a near-term M2/M3 use.
- Confirm no request body, token, CV, JD, answer, or provider payload is logged.
- Confirm the fake-provider path will remain the clean-clone default.
- Keep M2 domain modelling owner-led and use AI for critique/tests rather than unattended aggregate generation.

## Next gate

M1 becomes fully accepted when the Docker-backed commands pass and the owner
has reviewed the scaffold. The current next-delivery boundary is defined by the
dated addendum below rather than the former anonymous-draft-session plan.

## 2026-08-27 addendum

The tables above preserve the exact limitations of the 2026-08-24 generation
environment: Docker-backed Testcontainers and Compose semantic validation were
not run in that environment. Later verification did not rewrite that dated
fact.

Subsequent repository evidence closed the M1 acceptance gap:

- PR #12 status-ledger evidence records successful backend, frontend, full,
  and isolated clean-clone smoke verification;
- the Issue #17 audit baseline
  `29732f9d3198e3f1a66149051dee0cb552f3f63d` records green backend, frontend,
  documentation/contracts, and clean-clone smoke CI; and
- M1 still contains no shadowing, learner, interview, provider, token, report,
  or other product-domain behaviour.

### M2 — Shadowing pilot MVP

Canonical v0.3 replaces the stale anonymous-draft-session next gate with
planning for one shadowing exercise: a public read-only Spring metadata/content
API, browser-direct deterministic media and derived captions, optional
repetition, complete-pass gating, transient independent transfer, and
reflection. The backend and database do not carry media bytes.

M2 product coding still waits for the coordinated canonical PR to be manually
merged and a separately approved, implementation-ready M2 backlog. M0.3 adds no
endpoint, `/practice` route, dependency, migration, media asset, cloud setting,
or learner persistence. M3 remains the first portfolio/CV cut line for
product-justified persistence, transactions, idempotency,
PostgreSQL/Testcontainers, security/privacy, and recovery evidence.
