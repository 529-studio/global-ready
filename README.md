# Global-Ready

> Practise clear workplace English through short, guided shadowing exercises.

[![CI](https://github.com/529-studio/global-ready/actions/workflows/ci.yml/badge.svg)](https://github.com/529-studio/global-ready/actions/workflows/ci.yml)
![Java](https://img.shields.io/badge/Java-25-007396?logo=openjdk&logoColor=white)
![Spring%20Boot](https://img.shields.io/badge/Spring%20Boot-4.1.1-6DB33F?logo=springboot&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-16.3.2-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19.2.8-149ECA?logo=react&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-18.6-4169E1?logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker%20Compose-local-2496ED?logo=docker&logoColor=white)
![Gradle](https://img.shields.io/badge/Gradle-9.3.0-02303A?logo=gradle&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-24.19.0-339933?logo=nodedotjs&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

Global-Ready is a local-first web application for Vietnamese software
developers who want to speak more confidently in day-to-day technical work and
interviews. It is being built as a publishable, zero-cost product: the runtime,
documentation, tests, and delivery workflow must be reproducible from a clean
clone.

## Highlights

- One command starts the frontend, Spring backend, and PostgreSQL locally.
- No API key, cloud account, hosted database, or paid AI provider is required.
- Health and OpenAPI endpoints make the backend observable from day one.
- The upcoming learning loop is guided imitation → optional repetition →
  independent transfer → reflection.
- Human review and manual merge are required; auto-merge is never enabled.

## Current product status

The repository currently delivers the M1 application foundation:

- Next.js application shell at `http://localhost:3000`;
- Spring Boot API foundation with Actuator health and OpenAPI;
- PostgreSQL, Flyway, JPA, validation, structured logging, and Testcontainers
  wiring;
- deterministic local and CI verification.

The next product milestone adds one shadowing exercise. Spring will expose
public exercise metadata only; the browser will fetch approved media and
captions directly. There is no exercise player, learner account, saved attempt,
speech capture, scoring, real media asset, cloud storage, or AI call yet.

## Run the application

This is the fastest way to run the complete stack.

### 1. Install prerequisites

- Docker Desktop, or [Colima](https://github.com/abiosoft/colima) with Docker;
- Docker Compose v2 (`docker compose`).

Check Docker before continuing:

```bash
docker info
docker compose version
```

### 2. Clone and start

```bash
git clone https://github.com/529-studio/global-ready.git
cd global-ready
docker compose --profile app up --build -d
```

The first run downloads pinned images and builds the backend and frontend. It
can take a few minutes. Watch startup progress if needed:

```bash
docker compose ps
docker compose logs -f backend
```

### 3. Confirm it is running

```bash
curl --fail http://localhost:8080/actuator/health
curl --fail http://localhost:8080/api-docs
```

Then open:

| Service | URL |
|---|---|
| Frontend | <http://localhost:3000> |
| Backend health | <http://localhost:8080/actuator/health> |
| OpenAPI JSON | <http://localhost:8080/api-docs> |
| Swagger UI | <http://localhost:8080/swagger-ui> |

### 4. Stop it

```bash
docker compose down
```

This removes this project's containers and network but keeps the named local
PostgreSQL volume for the next start.

## Develop locally

Use this mode when editing source: PostgreSQL stays in Docker while Spring and
Next.js run directly from the checkout.

### Prerequisites

| Tool | Required version | Check |
|---|---|---|
| JDK | 25 | `java --version` |
| Node.js | 24.19.0 | `node --version` |
| npm | supplied with Node | `npm --version` |
| Docker + Compose | current | `docker compose version` |

The backend uses the Gradle Wrapper, so no global Gradle installation is
needed. The frontend pins Node in [`frontend/.nvmrc`](frontend/.nvmrc).

### Terminal 1 — database

From the repository root:

```bash
docker compose up -d postgres
docker compose ps postgres
```

Wait until PostgreSQL is `healthy`.

### Terminal 2 — backend

```bash
cd backend
./gradlew bootRun
```

Confirm it is ready:

```bash
curl --fail http://localhost:8080/actuator/health
```

### Terminal 3 — frontend

```bash
cd frontend
nvm use
npm ci
npm run dev
```

Open <http://localhost:3000>. The page links to backend health using
`NEXT_PUBLIC_API_BASE_URL`, which defaults to `http://localhost:8080`.

When finished, stop the backend and frontend with `Ctrl+C`, then run this from
the repository root:

```bash
docker compose down
```

## Verify before a pull request

Run these commands from the repository root. They use the same harness as CI.

```bash
./scripts/verify.sh fast
./scripts/verify.sh full
./scripts/verify.sh docs
./scripts/verify.sh smoke
```

| Command | What it proves |
|---|---|
| `fast` | Affected backend/frontend/docs checks; with no diff it checks all areas. |
| `full` | Gradle checks, frontend lint/typecheck/build, documentation contracts, and hook fixtures. |
| `docs` | Markdown links, requirement traceability, issue/PR contracts, skills, hooks, and Compose configuration. |
| `smoke` | Clean container build and an isolated PostgreSQL/backend/frontend startup with no provider key. |

`full`, backend tests, and `smoke` need a running Docker daemon. The normal
test path uses deterministic configuration; it does not call Gemini or another
external AI provider.

## Configuration and ports

Defaults work without an `.env` file. To change ports or local database
credentials, copy the example:

```bash
cp .env.example .env
```

| Variable | Default | Used for |
|---|---:|---|
| `POSTGRES_DB` | `global_ready` | Local PostgreSQL database |
| `POSTGRES_USER` | `global_ready` | Local PostgreSQL user |
| `POSTGRES_PASSWORD` | `global_ready` | Local PostgreSQL password |
| `POSTGRES_PORT` | `5432` | PostgreSQL host port |
| `BACKEND_PORT` | `8080` | Spring host port |
| `FRONTEND_PORT` | `3000` | Next.js host port |
| `NEXT_PUBLIC_API_BASE_URL` | `http://localhost:8080` | Backend URL compiled into the frontend |

For a backend-port conflict, set both values below and rebuild the Docker
frontend because its public API URL is a build-time value:

```dotenv
BACKEND_PORT=8081
NEXT_PUBLIC_API_BASE_URL=http://localhost:8081
```

```bash
docker compose --profile app up --build -d
```

For direct local development, use matching values in each terminal:

```bash
cd backend && SERVER_PORT=8081 ./gradlew bootRun
```

```bash
cd frontend && NEXT_PUBLIC_API_BASE_URL=http://localhost:8081 npm run dev
```

## Architecture

```text
Browser ── frontend ── metadata/API requests ──> Spring Boot ──> PostgreSQL
   │
   └── future reference media + captions ──> approved static origin
```

The backend is a modular monolith. It never uploads, stores, proxies, or
streams reference-media bytes; future media and caption requests go from the
browser directly to an approved origin. Learner data is not persisted in the
next shadowing milestone.

```text
backend/     Spring Boot, Actuator, OpenAPI, JPA, Flyway, PostgreSQL tests
frontend/    Next.js App Router and TypeScript
docs/        Product contract, architecture, milestones, traceability, ADRs
scripts/     Shared local and CI verification harness
compose.yaml Local PostgreSQL + backend + frontend environment
```

Read [the architecture](docs/04_ARCHITECTURE.md) and
[ADR-0005](docs/adr/0005-shadowing-content-and-media-boundary.md) before
changing the media, persistence, or privacy boundary.

## Troubleshooting

### Docker or Testcontainers cannot connect

Start Docker Desktop, or start Colima on macOS:

```bash
colima start
docker info
```

The verification harness detects the usual Colima socket automatically. If a
custom Docker setup still fails, make sure the Docker daemon is available in
the same terminal that runs Gradle.

### `docker compose` is not available

Install the Docker Compose v2 plugin. If your machine only provides the legacy
`docker-compose` command, it is supported by `./scripts/verify.sh`; use that
command in manual Compose examples.

### A port is already in use

Set `BACKEND_PORT`, `FRONTEND_PORT`, or `POSTGRES_PORT` in `.env` to unused
values. Keep `NEXT_PUBLIC_API_BASE_URL` aligned with `BACKEND_PORT`, then
rebuild the frontend.

### Node version is wrong

```bash
cd frontend
nvm install
nvm use
node --version
```

The pinned version is `v24.19.0`. The harness can use a pinned Node container
when the local version differs, but using the pinned version is best for local
development.

## Publishing standards

Before publishing a change, keep the repository zero-cost and reproducible:

- do not commit secrets, `.env` files, user content, raw audio, or provider
  payloads;
- do not add automatic deployment, automatic code changes, or auto-merge;
- do not add real human media without the rights and provenance evidence in
  [MEDIA_NOTICE.md](MEDIA_NOTICE.md);
- use one Issue and one branch per change, add verification evidence to the PR,
  and require human review and manual merge.

## Learn more

- [Product brief](docs/01_PRODUCT_BRIEF.md)
- [Software requirements](docs/03_SRS.md)
- [Architecture](docs/04_ARCHITECTURE.md)
- [API and data contract](docs/05_DATA_AND_API.md)
- [Milestones](docs/08_MILESTONE_PLAN.md)
- [Traceability](docs/09_TRACEABILITY.md)
- [SDLC and Codex workflow](docs/12_CODEX_WORKFLOW.md)
- [Media rights and provenance](MEDIA_NOTICE.md)

The repository is licensed under the [MIT License](LICENSE). The code license
does not grant rights to media assets.
