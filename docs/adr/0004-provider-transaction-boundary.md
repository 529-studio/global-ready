# ADR-0004: Provider calls outside database transactions

Status: Accepted  
Date: 2026-08-24

## Context

Gemini latency and failures are external to PostgreSQL. Holding a JPA transaction open during network I/O consumes connections, holds locks, and still cannot atomically roll back the remote system.

## Decision

Use two short local transactions around every provider call:

1. authorise, validate, persist candidate work or report intent, and commit;
2. call the provider without an active database transaction;
3. persist success or failure in a second transaction.

Operation-specific idempotency keys and explicit intermediate statuses resume a failed provider stage without duplicating the accepted answer, next turn, or report.

## Consequences

- candidate answers survive provider failure;
- partial local state is intentional and observable;
- retries require explicit state/idempotency design;
- unique constraints and optimistic locking protect concurrent requests;
- no claim of distributed atomicity is made.

