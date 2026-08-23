# ADR-0003: Session aggregate and fixed 24-hour retention

Status: Accepted  
Date: 2026-08-24

## Context

The MVP has no account, reusable profile, or session history. CV/JD, turns, and report should not consume long-term database storage.

## Decision

Make `InterviewSession` the aggregate root. Store `CandidateContext` as its owned value object; own up to six turns and at most one report. Set `expiresAt = createdAt + 24h` once. Reject all access immediately at expiry and physically purge by scheduled/startup cleanup.

## Consequences

- ownership and cascade deletion are simple;
- context freezes at `READY`;
- a separate candidate/profile model is unnecessary;
- activity does not extend retention;
- physical purge is best-effort while a zero-cost service is offline, but logical access expiry is deterministic.

