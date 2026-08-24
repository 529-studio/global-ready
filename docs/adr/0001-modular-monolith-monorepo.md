# ADR-0001: Modular monolith in a monorepo

Status: Accepted  
Date: 2026-08-24

## Context

Global-Ready is a solo, zero-cost portfolio project with one browser client, one Java backend, and one PostgreSQL database. Frontend and backend change together but must remain independently buildable.

## Decision

Use one repository containing Next.js and one Spring Boot modular monolith. Organise backend code by feature. Do not use microservices, distributed messaging, Redis, Kubernetes, or application-wide WebFlux.

## Consequences

- cross-stack contract changes are reviewed together;
- local setup and CI stay small;
- feature boundaries remain visible in Java packages;
- applications can still deploy independently;
- a future service split requires a new measured need and ADR.

