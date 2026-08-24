# Requirement Traceability

Status: Canonical v0.2  
Last updated: 2026-08-24

## 1. Functional requirements

| Requirement | Milestone | Primary verification |
|---|---|---|
| FR-001–FR-003 | M2 | API/security integration and consent UI test |
| FR-004 | M2, M6 | Manual-delete and cascade integration tests |
| FR-005 | M1, M3, M6 | Schema/API inspection and no-audio tests |
| FR-006–FR-007 | M2, M6 | Injected-clock boundary tests |
| FR-010–FR-016 | M2 | Validation and context-freeze tests |
| FR-020–FR-025 | M2 | Fixed configuration and state-transition tests |
| FR-026–FR-029 | M4 | Early-end, evidence threshold, cap, status API tests |
| FR-030–FR-034 | M3 | Browser capability/manual and frontend tests |
| FR-040–FR-050 | M3, M4 | Orchestration, transaction, idempotency, and retry tests |
| FR-060–FR-065 | M3 | Turn persistence and transcript derivation tests |
| FR-070–FR-079 | M5 | Report eligibility/schema/evidence/retry tests |
| FR-090–FR-094 | M6 | Startup/scheduled/repeated cleanup tests |

## 2. Business rules

| Rule | Milestone | Primary verification |
|---|---|---|
| BR-001–BR-004 | M2 | Aggregate, binding, freeze, and fixed-expiry unit/integration tests |
| BR-005–BR-006 | M3 | Answer commit and provider-failure component tests |
| BR-007 | M4 | Turn-cap/concurrency tests |
| BR-008–BR-010 | M5 | Report evidence and schema validation |
| BR-011 | M2–M5 | Operation-specific idempotency tests |
| BR-012 | M2, M6 | Expired-resource and purge tests |

## 3. Non-functional requirements

| Requirement | Milestone | Primary verification |
|---|---|---|
| NFR-001 | M3, M5, M6 | Safe structured stage-duration events |
| NFR-002 | M7 | Local measurement report |
| NFR-003 | M3 | Frontend processing-state timer test |
| NFR-004 | M3, M4 | Provider client configuration/timeout tests |
| NFR-005 | M1 onward | CI configuration contains fake-only tests |
| NFR-006 | M4 | Five-session isolation test |
| NFR-020 | M7/public only | Deployment verification |
| NFR-021 | M1, M6 | Environment configuration and secret scan |
| NFR-022–NFR-025 | M2, M6 | Token/ownership/logging/expiry tests |
| NFR-026 | M6/public only | Conditional rate-limit test |
| NFR-040 | M1, M3, M5 | Dependency/package and adapter tests |
| NFR-041 | M1, M7 | OpenAPI endpoint and drift check |
| NFR-042 | M2–M6 | Core rule test suite |
| NFR-043 | M1 onward | Flyway/Testcontainers migration test |
| NFR-044 | M1 onward | Independent build jobs |
| NFR-045 | M3, M7 | Keyboard/text-fallback E2E |
| NFR-046 | M2, M6 | Injected-clock tests |

## 4. Acceptance scenarios

| Scenario | Milestone proving it |
|---|---|
| AS-01 Fake-provider happy path | M5, automated end-to-end in M7 |
| AS-02 Voice unavailable | M3, end-to-end in M7 |
| AS-03 Provider failure after answer | M3 |
| AS-04 Hallucination guard | M3 prompt fixtures and M5 report validation/manual corpus |
| AS-05 Turn cap | M4 |
| AS-06 Resource isolation | M2 |
| AS-07 Logical expiry and purge | M6 |
| AS-08 Idempotency conflict | M2/M3/M5 by operation |

## 5. Coverage result

- Every v0.2 `MUST` requirement is mapped.
- Conditional NFR-020 and NFR-026 activate only for public deployment.
- Targets and manual browser/model evaluations are not misrepresented as deterministic CI guarantees.
- Deferred features have no accidental milestone assignment.

