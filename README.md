# Global-Ready Planning Pack

Status: Draft v0.1  
Last updated: 2026-08-16

Global-Ready is an English interview-practice product for software developers. This pack is the source material for product brainstorming, milestone generation, and implementation planning.

## Recommended reading order

1. [`docs/01_PRODUCT_BRIEF.md`](docs/01_PRODUCT_BRIEF.md)
2. [`docs/02_ASSUMPTIONS_AND_DECISIONS.md`](docs/02_ASSUMPTIONS_AND_DECISIONS.md)
3. [`docs/03_SRS.md`](docs/03_SRS.md)
4. [`docs/04_ARCHITECTURE.md`](docs/04_ARCHITECTURE.md)
5. [`docs/05_DATA_AND_API.md`](docs/05_DATA_AND_API.md)
6. [`docs/06_OPEN_QUESTIONS.md`](docs/06_OPEN_QUESTIONS.md)
7. [`docs/07_MILESTONE_RULES.md`](docs/07_MILESTONE_RULES.md)
8. [`CLAUDE_MILESTONE_PROMPT.md`](CLAUDE_MILESTONE_PROMPT.md)

## Source-of-truth hierarchy

When documents conflict, use this order:

1. Approved decisions in `02_ASSUMPTIONS_AND_DECISIONS.md`
2. Product scope and requirements in `03_SRS.md`
3. Architecture constraints in `04_ARCHITECTURE.md`
4. Draft data/API contracts in `05_DATA_AND_API.md`
5. Suggestions produced by an AI assistant

An AI assistant must not silently change an approved requirement. It should list proposed changes under `SPEC DELTAS` for human approval.

## Intended workflow

1. Resolve the P0 questions in `06_OPEN_QUESTIONS.md`.
2. Update the decisions and SRS.
3. Give the pack and `CLAUDE_MILESTONE_PROMPT.md` to Claude.
4. Review Claude's assumptions and spec deltas before accepting milestones.
5. Implement one vertical slice at a time.
6. Keep backend core logic human-written first; use AI primarily for review, tests, infrastructure, and boilerplate.

## Current repository direction

The MVP should use one monorepo with independently buildable applications:

```text
global-ready/
├── backend/          # Java 25 + Spring Boot
├── frontend/         # Next.js + TypeScript
├── docs/
├── compose.yaml
├── .env.example
└── README.md
```

Monorepo does not imply a shared deployment. Frontend and backend can be deployed independently.
