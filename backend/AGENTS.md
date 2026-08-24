# Backend instructions

These instructions supplement the repository root instructions for `backend/`.

- Use Java 25, the checked-in Gradle Wrapper, Spring MVC, JPA, Flyway, and
  PostgreSQL versions already selected by the build.
- Keep the backend a package-by-feature modular monolith under
  `com.globalready`; controllers call application use cases, not repositories.
- Do not create empty layers or provider abstractions ahead of their milestone.
- Keep domain/application types independent of JPA and provider SDK types.
- Aggregate lifecycle, validation, transactions, idempotency, access tokens,
  expiry, security, and migrations are HUMAN-FIRST work.
- Use an injected `Clock` for time-sensitive behavior. Keep external provider
  calls outside database transactions and logs free of sensitive content.
- Run backend-only checks from this directory with
  `./gradlew --no-daemon check`; use the root harness for repository gates.
- Every commit that changes backend source, tests, build/runtime configuration,
  API/data contracts, or these instructions must update
  `backend/PROJECT_STATUS.md` with evidence in the same commit.
