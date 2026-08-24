# Global-Ready

Global-Ready is a zero-cost, local-first portfolio project for practising English software-engineering interviews while rebuilding modern Java/Spring skills.

Current source status: **M1 scaffold**. Canonical specification: **v0.2 — ready for implementation**. Interview domain behaviour begins in M2 and is intentionally not generated in this checkpoint.

## MVP in one sentence

One anonymous desktop-Chrome user pastes project context, completes up to six English project deep-dive turns through browser speech recognition or text, and receives evidence-grounded Vietnamese feedback; the app stores no audio and expires session data after 24 hours.

## Stack pinned on 2026-08-24

| Component | Version |
|---|---|
| Java | 25; Docker image Temurin 25.0.4+7 |
| Spring Boot | 4.1.1 |
| Gradle Wrapper | 9.3.0 |
| Springdoc OpenAPI | 3.0.3 |
| PostgreSQL | 18.6 |
| Node.js | 24.19.0 |
| Next.js | 16.3.2 |
| React | 19.2.8 |
| TypeScript | 5.9.3 |

Spring Boot 4.1.1 officially supports Java 17 through 26. Next.js requires Node.js 20.9 or later; this repository pins Node 24 for reproducibility.

## Repository

```text
global-ready/
├── backend/          Spring MVC, JPA, Flyway, Actuator, OpenAPI
├── frontend/         Next.js App Router and TypeScript
├── docs/             Canonical v0.2 specification and ADRs
├── compose.yaml
└── .env.example
```

## Required local tools

- JDK 25;
- Node.js 24.19.0 (the frontend includes `.nvmrc`);
- Docker Desktop or Colima with Docker CLI and Compose.

No Gemini key is needed for M1 or the future default fake-provider path.

If Docker runs through Colima, configure Testcontainers before running the
backend tests:

```bash
export DOCKER_HOST=unix:///Users/your-user/.colima/default/docker.sock
export TESTCONTAINERS_DOCKER_SOCKET_OVERRIDE=/var/run/docker.sock
```

## Run locally

Copy local configuration:

```bash
cp .env.example .env
```

Start PostgreSQL:

```bash
docker compose up -d postgres
```

Start the backend:

```bash
cd backend
./gradlew bootRun
```

Start the frontend in a second terminal:

```bash
cd frontend
nvm use
npm ci
npm run dev
```

Open:

- frontend: <http://localhost:3000>
- health: <http://localhost:8080/actuator/health>
- OpenAPI JSON: <http://localhost:8080/api-docs>
- Swagger UI: <http://localhost:8080/swagger-ui>

To build all application containers:

```bash
docker compose --profile app up --build
```

## Verify

Backend, including Testcontainers PostgreSQL:

```bash
cd backend
./gradlew test
```

Frontend:

```bash
cd frontend
npm run check
```

Compose:

```bash
docker compose config
docker compose --profile app config
```

## M1 boundaries

Included:

- reproducible backend/frontend scaffolds;
- pinned dependencies and container images;
- PostgreSQL/Flyway/Testcontainers wiring;
- health and OpenAPI endpoints;
- virtual threads;
- injected UTC `Clock`;
- ECS JSON logging with correlation IDs;
- safe environment configuration;
- frontend landing/checkpoint page;
- independent CI jobs.

Not implemented yet:

- anonymous access and session token;
- session/turn/report entities;
- migrations for domain tables;
- fake or Gemini gateways;
- speech recognition and synthesis UI;
- interview/report flow.

Those begin at M2/M3 according to [the milestone plan](docs/08_MILESTONE_PLAN.md).

## Documentation

Start with:

1. [approved decisions](docs/02_ASSUMPTIONS_AND_DECISIONS.md);
2. [SRS](docs/03_SRS.md);
3. [architecture](docs/04_ARCHITECTURE.md);
4. [data/API contract](docs/05_DATA_AND_API.md);
5. [milestone plan](docs/08_MILESTONE_PLAN.md);
6. [readiness gate](docs/10_CHANGELOG_AND_READINESS.md).
7. [M1 implementation handoff](docs/11_M1_IMPLEMENTATION_HANDOFF.md).

The old `CLAUDE_MILESTONE_PROMPT.md` is retained only as planning history.

## Privacy and zero-cost rules

- Never persist raw audio.
- Never log raw CV, JD, answers, report, provider prompts, tokens, or provider payloads.
- Keep the complete fake-provider path runnable without API keys.
- Use only synthetic/anonymised data for a public demo until current provider/hosting terms are reviewed.
- Public hosting is optional; local Docker is the acceptance environment.

## Dependency note

Next.js announced another security release for 2026-08-26. This scaffold pins the current registry release available on 2026-08-24. Run `npm audit` and upgrade to the patched supported release before any public deployment. ESLint 9 is retained because the current Next.js lint plugin chain does not yet accept ESLint 10 without invalid peer dependencies.

PostgreSQL 18 uses a version-specific `PGDATA` and its Docker volume is intentionally mounted at `/var/lib/postgresql`, not the pre-18 `/var/lib/postgresql/data` path.

## CV rule

Do not replace the capstone entry yet. Global-Ready becomes CV-ready only after M7 tests, demo evidence, limitations, and an owner-led code defence are complete.
