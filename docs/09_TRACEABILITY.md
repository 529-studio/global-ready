# Requirement Traceability

Status: Canonical v0.3
Last updated: 2026-08-27

The current runtime remains M1. M0.3 canonicalises the planning contract; M2
implements the shadowing pilot only through separately approved Issues. The
retained adaptive interview requirements remain M3 or conditional later work
and are never M2 evidence.

Reviewer modes mean:

- `HUMAN-FIRST`: owner approval is required for product, architecture,
  privacy, accessibility, rights, security, data, or recovery boundaries;
- `AI-IMPLEMENT`: approved deterministic mechanics may be implemented with
  test-first evidence and human review;
- `AI-REVIEW`: Codex may inspect evidence but cannot authorise a boundary.

## 1. M2 shadowing functional requirements — FR-100–FR-109

| Requirement | Milestone | Planned evidence | Reviewer |
|---|---|---|---|
| FR-100 | M2 | MockMvc public-contract test; Playwright Spring metadata request; OpenAPI drift check | HUMAN-FIRST |
| FR-101 | M2 | React Testing Library explicit-start test; Playwright autoplay guard | HUMAN-FIRST |
| FR-102 | M2 | Vitest media/WebVTT cue-selection test; React Testing Library speaker/cue semantics; manual owner timing check | HUMAN-FIRST |
| FR-103 | M2 | Vitest pause/backward-seek/rate/repeat transitions; Playwright control flow | AI-IMPLEMENT |
| FR-104 | M2 | Vitest reset → start → no-forward-seek → current native-ended generation; Playwright complete pass | HUMAN-FIRST |
| FR-105 | M2 | Vitest forward-seek/reset/source-replacement/unmount/fatal-error invalidation and stale-event cases | HUMAN-FIRST |
| FR-106 | M2 | React Testing Library rendered/accessibility-tree absence; Playwright transfer concealment | HUMAN-FIRST |
| FR-107 | M2 | React Testing Library speaking self-attestation and non-empty transient-text paths; copy review forbidding speech-verification claims | HUMAN-FIRST |
| FR-108 | M2 | React Testing Library reflection transition and four-part checklist; Playwright end-to-end flow | AI-IMPLEMENT |
| FR-109 | M2 | Vitest media/caption failure state; React Testing Library truthful retry/fatal guidance; Playwright Retry/reset | HUMAN-FIRST |

## 2. M2 business rules — BR-100–BR-103

| Rule | Milestone | Planned evidence | Reviewer |
|---|---|---|---|
| BR-100 | M2 | Vitest generation-identity and stale-native-event tests | HUMAN-FIRST |
| BR-101 | M0.3, M2 | SRS/UI copy review; Vitest playback observation; React Testing Library self-attestation | HUMAN-FIRST |
| BR-102 | M0.3, M2 | Content-validator valid/invalid fixtures and manifest/WebVTT one-to-one drift check | HUMAN-FIRST |
| BR-103 | M0.3, M2 | Schema/migration diff inspection; storage/network/log guard tests; Playwright sink inspection | HUMAN-FIRST |

## 3. M2/global non-functional requirements — NFR-050–NFR-054

| Requirement | Milestone | Planned evidence | Reviewer |
|---|---|---|---|
| NFR-050 | M0.3, M2 | Privacy wording review; React Testing Library storage/URL/log/network guards; Playwright app-originated sink inspection | HUMAN-FIRST |
| NFR-051 | M0.3, M2 | `./scripts/verify.sh smoke`; zero-key CI; deterministic media/caption fixtures | AI-REVIEW |
| NFR-052 | M0.3, M2 | Content-validator missing-rights/mismatched-hash fixtures; media notice and manual owner rights approval | HUMAN-FIRST |
| NFR-053 | M2 | React Testing Library keyboard/accessibility-tree/error/text-fallback/reflection checks; Playwright and manual screen-reader/reduced-motion evidence | HUMAN-FIRST |
| NFR-054 | M0.3, M2 | Architecture/API review; schema/dependency diff inspection; MockMvc and Playwright route evidence proving browser-direct media | HUMAN-FIRST |

## 4. M2 acceptance scenarios — AS-09–AS-14

| Scenario | Milestone | Planned evidence | Reviewer |
|---|---|---|---|
| AS-09 | M2 | Vitest complete-generation test; React Testing Library truthful completion copy; focused Playwright complete pass | HUMAN-FIRST |
| AS-10 | M2 | Vitest forward-seek invalidation; focused Playwright restart requirement | HUMAN-FIRST |
| AS-11 | M2 | React Testing Library UI/accessibility-tree and app-sink guards; Playwright storage/URL/console/network inspection | HUMAN-FIRST |
| AS-12 | M2 | Vitest failed-generation/stale-event test; React Testing Library Retry lock; focused Playwright recovery | HUMAN-FIRST |
| AS-13 | M2 | MockMvc metadata contract; focused Playwright browser-direct requests; `./scripts/verify.sh smoke` with no provider/cloud key | AI-REVIEW |
| AS-14 | M0.3, M2 | Content-validator incomplete-rights and hash-mismatch fixtures; deterministic fallback check; manual owner rights evidence | HUMAN-FIRST |

## 5. Retained future adaptive interview contract

These mappings preserve v0.2 history without reporting it implemented. `M3+`
means the M3 portfolio gate or a later milestone selected by a separately
approved product/design delta. No row below maps to M2.

### 5.1 Functional requirements

| Requirement | Milestone | Future evidence | Reviewer |
|---|---|---|---|
| FR-001–FR-007 | M3+ | anonymous grant/token/consent/deletion/expiry API and integration tests | HUMAN-FIRST |
| FR-010–FR-016 | M3+ | validation, mutable-draft, and context-freeze unit/integration tests | HUMAN-FIRST |
| FR-020–FR-029 | M3+ | configuration, aggregate state-transition, early-end, cap, and status tests | HUMAN-FIRST |
| FR-030–FR-034 | Conditional post-M3 STT | browser capability/manual corpus, consent, recovery, visible/text fallback tests | HUMAN-FIRST |
| FR-040–FR-050 | M3+ | transaction, provider-failure, idempotency, timeout, and retry component tests | HUMAN-FIRST |
| FR-060–FR-065 | M3+ | turn persistence, final-text, transcript derivation, and blank-answer tests | HUMAN-FIRST |
| FR-070–FR-079 | Conditional report milestone after M3 | report eligibility/schema/evidence/no-score/no-sample/retry tests | HUMAN-FIRST |
| FR-090–FR-094 | Conditional retention milestone after M3 | injected-clock, startup/scheduled purge, cascade, and repeated-delete tests | HUMAN-FIRST |

### 5.2 Business rules

| Rule | Milestone | Future evidence | Reviewer |
|---|---|---|---|
| BR-001–BR-004 | M3+ | aggregate ownership, grant binding, context freeze, and fixed-expiry tests | HUMAN-FIRST |
| BR-005–BR-007 | M3+ | answer commit/provider failure, turn cap, and concurrency tests | HUMAN-FIRST |
| BR-008–BR-010 | Conditional report milestone after M3 | evidence ownership, schema, no-score, and no-complete-sample tests | HUMAN-FIRST |
| BR-011 | M3+ | operation-specific idempotency key/fingerprint tests | HUMAN-FIRST |
| BR-012 | Conditional retention milestone after M3 | logical-expiry and purge tests | HUMAN-FIRST |

### 5.3 Non-functional requirements

| Requirement | Milestone | Future/global evidence | Reviewer |
|---|---|---|---|
| NFR-001–NFR-004 | M3+ | content-safe stage-duration, local measurement, UI timer, and provider-timeout tests | HUMAN-FIRST |
| NFR-005 | M0.3 onward | CI inspection proving deterministic fake/no-live-Gemini path | AI-REVIEW |
| NFR-006 | M3+ | five-session fake-provider isolation test | HUMAN-FIRST |
| NFR-020 | Conditional public deployment | TLS verification | HUMAN-FIRST |
| NFR-021 | M0.3 onward | environment configuration and secret scan | AI-REVIEW |
| NFR-022–NFR-025 | M3+ | token hash/binding, URL/log exclusion, randomness, and expiry tests | HUMAN-FIRST |
| NFR-026 | Conditional public provider deployment | owner-approved rate-limit test | HUMAN-FIRST |
| NFR-040 | M3+ | package/dependency and provider adapter tests | HUMAN-FIRST |
| NFR-041 | M1 onward; M2 contract when implemented | generated OpenAPI and contract drift checks | AI-IMPLEMENT |
| NFR-042 | Relevant milestone | lowest-useful automated rule tests and owner boundary review | HUMAN-FIRST |
| NFR-043 | M1 onward; future schema changes | Flyway/Testcontainers migration test | HUMAN-FIRST |
| NFR-044 | M1 onward | independent backend/frontend build jobs | AI-REVIEW |
| NFR-045 | M3+ | keyboard and mandatory text-fallback E2E | HUMAN-FIRST |
| NFR-046 | M3+ | injected-clock expiry tests | HUMAN-FIRST |

### 5.4 Acceptance scenarios

| Scenario | Milestone | Future evidence | Reviewer |
|---|---|---|---|
| AS-01 | Conditional adaptive interview/report milestone after M3 | deterministic fake-provider end-to-end | HUMAN-FIRST |
| AS-02 | Conditional post-M3 STT | browser voice-unavailable/text-fallback E2E | HUMAN-FIRST |
| AS-03–AS-04 | M3+ / conditional report | provider-failure recovery and grounding/evidence fixtures | HUMAN-FIRST |
| AS-05–AS-06 | M3+ | turn-cap/concurrency and token-isolation integration tests | HUMAN-FIRST |
| AS-07 | Conditional retention milestone after M3 | logical-expiry and repeated-purge integration tests | HUMAN-FIRST |
| AS-08 | M3+ / conditional report | per-operation idempotency replay/conflict tests | HUMAN-FIRST |

## 6. Coverage result

- Every SRS functional, business-rule, non-functional, and acceptance-scenario
  ID is mechanically represented here.
- FR-100–FR-109, BR-100–BR-103, NFR-050–NFR-054, and AS-09–AS-14 define the
  current v0.3 M2 contract and its deterministic/manual evidence split.
- Architecture, privacy, accessibility, media-rights, data, security, and
  recovery decisions remain HUMAN-FIRST.
- Retained interview IDs are future-scoped to M3 or conditional later work and
  are not evidence of M2 or current implementation.
