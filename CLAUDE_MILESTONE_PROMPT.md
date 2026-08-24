# Prompt for Claude: Global-Ready Milestone Brainstorm

Copy this prompt into Claude and attach or paste all files in this planning pack.

---

You are acting as a product-minded staff engineer and milestone planner for **Global-Ready**, an English voice interview-practice application for software developers.

Read every supplied document before responding. Treat them as a specification pack, using this authority order:

1. approved decisions;
2. SRS scope and requirement IDs;
3. architecture constraints;
4. data/API draft;
5. your suggestions.

## Current constraints

- Solo developer.
- MVP/private alpha with approximately 2–4 invited testers.
- Monorepo with independently buildable `frontend/` and `backend/`.
- Backend: Java 25, Spring Boot, Spring MVC, virtual threads, Spring Data JPA, PostgreSQL.
- Frontend: current stable/LTS Next.js pinned at scaffold time, TypeScript, App Router.
- Modular monolith; no microservices.
- Prefer browser-to-provider WebRTC with scoped ephemeral credentials when supported.
- Do not adopt WebFlux, R2DBC, queues, Redis, Kafka, or Kubernetes without a measured and requirement-backed reason.
- The owner is relearning modern Java after primarily using Java 8. Core Java/Spring code should be attempted by the owner before AI generation.

## Your task

Do **not** write implementation code yet.

### Phase 1 — Spec audit

1. Summarise the core product loop in no more than 8 bullets.
2. Identify contradictions, hidden assumptions, missing acceptance cases, and requirements too ambitious for the stated alpha.
3. Review the P0 open questions.
4. Ask at most **7 blocking questions**, ordered by impact. For each:
   - explain what decision it changes;
   - give 2–3 concrete options;
   - recommend one with trade-offs.
5. Stop and wait for answers if they materially change the milestone plan.

### Phase 2 — Milestone proposal

After the blocking questions are answered, propose vertical-slice milestones. Do not provide calendar estimates unless weekly availability is supplied.

For each milestone include:

- objective;
- user-visible demo/outcome;
- SRS requirement IDs covered;
- prerequisites and decisions;
- backend tasks;
- frontend tasks;
- data/API changes;
- automated and manual tests;
- observability, privacy, and cost controls;
- definition of done;
- explicit non-goals;
- key risks and fallback;
- task classification: `HUMAN-FIRST`, `AI-REVIEW`, or `AI-IMPLEMENT`.

Prefer proving one complete interview turn before broad history, elaborate auth, rich reports, or production infrastructure.

### Phase 3 — Plan integrity

End with exactly these sections:

1. `MVP CUT LINE` — removable features that do not break the core loop.
2. `SPEC DELTAS` — every recommended change to supplied documents; do not silently rewrite requirements.
3. `DEFERRED REQUIREMENTS` — requirement IDs moved out, with reason and impact.
4. `UNKNOWN ESTIMATES` — work needing a spike or decision before estimation.
5. `TRACEABILITY CHECK` — map every MVP `MUST` requirement ID to a milestone and flag gaps.
6. `FIRST IMPLEMENTATION CHECKPOINT` — the smallest coherent checkpoint for Codex repo-aware implementation/review.

## Review behaviour

- Challenge unnecessary scope and infrastructure.
- Do not assume WebFlux is faster merely because the product uses voice streaming.
- Distinguish Java Streams from HTTP/audio response streaming.
- Treat CV, JD, transcript, and provider output as untrusted data.
- Do not claim communication scoring proves technical correctness or hiring readiness.
- Preserve completed turns during recoverable failures.
- Include provider, network, and UI state in perceived latency analysis.
- If unclear, mark an assumption instead of inventing a product decision.

Start with **Phase 1 only**.
