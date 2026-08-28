# Backend instructions

These instructions supplement the repository root instructions for `backend/`.

- Use Java 25, the checked-in Gradle Wrapper, Spring MVC, JPA, Flyway, and
  PostgreSQL versions already selected by the build.
- Keep the backend a package-by-feature modular monolith under
  `com.globalready`; controllers call application use cases, not repositories.
- Do not create empty layers or provider abstractions ahead of their milestone.
- Keep domain/application types independent of JPA and provider SDK types.

## M2 shadowing boundary

- The M2 `com.globalready.shadowing` module serves a public, read-only exercise
  metadata/content contract only; it does not implement learner sessions.
- Spring must not transport media bytes. The backend and database never upload,
  store, proxy, stream, or persist video, image, caption, or audio bytes; the
  browser requests approved media/captions directly.
- Do not add a repository, JPA entity, Flyway migration, transaction, token,
  provider adapter, or learner persistence to the M2 shadowing module. Existing
  M1 JPA/Flyway/PostgreSQL wiring remains unchanged until an approved persisted
  product milestone needs it.
- Validate the manifest/content contract fail-closed and use deterministic
  fixture plus JUnit/MockMvc evidence for success, safe `ProblemDetail` errors,
  and the browser-direct boundary.

## Future adaptive interview boundary

- Aggregate lifecycle, validation, transactions, idempotency, access tokens,
  expiry, security, and migrations are HUMAN-FIRST work only after a separately
  approved adaptive or persisted milestone opens.
- Use an injected `Clock` for time-sensitive behavior. Keep external provider
  calls outside database transactions and logs free of sensitive content.
- Follow RED -> GREEN -> REFACTOR for backend behavior. Start with the smallest
  failing domain/unit, API slice, or PostgreSQL integration test that proves
  the Issue outcome; do not mock away transactions, constraints, ownership,
  expiry, idempotency, or migration behavior that the test must establish.
- Run backend-only checks from this directory with
  `./gradlew --no-daemon check`; use the root harness for repository gates.
- Every commit that changes backend source, tests, build/runtime configuration,
  API/data contracts, or these instructions must update
  `backend/PROJECT_STATUS.md` with evidence in the same commit.
