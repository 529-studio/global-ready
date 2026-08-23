# Product Brief

Status: Canonical v0.2  
Last updated: 2026-08-24

## 1. Product statement

Global-Ready helps a software developer rehearse a project deep-dive interview in English. The candidate supplies a target role, CV/project context, and an optional job description; the application asks grounded follow-up questions and returns concise Vietnamese feedback backed by the candidate's actual answers.

## 2. Why this project exists

The primary goal is no longer commercial validation. This is a zero-cost portfolio and relearning project that should:

- restore practical Java and Spring Boot skills after a long gap;
- demonstrate state modelling, persistence, API design, failure recovery, testing, and external-provider integration;
- produce a project the owner can explain and defend in an interview;
- eventually replace a weaker capstone entry on the CV only after the implementation and evidence are real.

## 3. Primary user

The owner is the primary user. The optional secondary user is a Vietnamese fresher or junior developer preparing for an English-speaking software-engineering interview.

No account, team, recruiter, or long-term history model is required.

## 4. Core loop

1. Open the desktop Chrome application and receive anonymous access.
2. Paste a target role, CV/project context, and optional job description.
3. Review the fixed interview configuration and privacy notice.
4. Start one `PROJECT_DEEP_DIVE` session.
5. Answer at most six English questions using browser speech recognition or text fallback.
6. Hear each interviewer question through browser text-to-speech.
7. End early or reach the turn cap.
8. Receive Vietnamese strengths, one to three priorities, answer evidence, and improved English outlines.
9. Delete the session manually or allow it to expire after 24 hours.

## 5. Product principles

1. **Evidence before praise:** feedback must cite supplied context or an answer turn.
2. **Rehearsal before correction:** the candidate answers before seeing an improved outline.
3. **Small and defensible:** prefer one complete flow over broad features.
4. **Privacy by structure:** the application never persists raw audio and expires session data after 24 hours.
5. **Failure is visible:** provider, microphone, and transcript failures must not look like successful feedback.
6. **Zero-cost default:** a clean clone works with fake providers and local PostgreSQL.
7. **Learning value matters:** backend code should be simple enough for the owner to trace and explain.

## 6. MVP scope

### Included

- desktop Chrome;
- anonymous, session-scoped access;
- paste-only candidate context and optional JD;
- fixed English project deep-dive mode;
- maximum six question/answer turns, including follow-ups;
- Chrome `SpeechRecognition` where available;
- text answer fallback;
- browser `speechSynthesis` for interviewer output;
- deterministic fake AI provider by default;
- optional Gemini text provider for question/report generation;
- persisted final transcript represented by interview turns;
- Vietnamese report with evidence and improved English outlines;
- manual deletion and 24-hour logical expiry;
- best-effort physical cleanup while the application is running;
- local Docker development and optional public demo.

### Excluded

- accounts, cross-device identity, or session history;
- CV/PDF upload or parsing;
- multiple interview modes, difficulty, or duration selectors;
- raw audio recording, upload, replay, or object storage;
- realtime full-duplex voice, WebRTC, or backend audio streaming;
- transcript correction;
- pause/resume;
- retrying the three weakest questions;
- numeric scores or hiring-readiness claims;
- full sample answers;
- usefulness ratings and analytics dashboards;
- recruiter/admin portals;
- microservices, WebFlux, queues, Redis, Kafka, or Kubernetes;
- guaranteed public hosting.

## 7. Engineering and portfolio acceptance

The MVP is successful when:

1. a clean clone can run frontend, backend, and PostgreSQL locally without a paid dependency;
2. the fake-provider path completes setup, at least two turns, session ending, and report display deterministically;
3. the real Gemini path can be demonstrated manually when a valid free-tier key is configured;
4. state, idempotency, expiry, ownership, and provider-failure rules have automated tests;
5. logs contain operational metadata but no raw CV, JD, transcript, or report text;
6. the owner can draw the request flow and explain transaction boundaries, JPA mappings, and failure recovery without relying on generated documentation;
7. README evidence includes architecture, test commands, screenshots or a short demo, and honest limitations.

These are portfolio criteria, not claims of product-market fit.

## 8. Key risks and fallbacks

| Risk | Required fallback |
|---|---|
| Chrome speech recognition is unavailable or inaccurate | Text input remains available for every answer. |
| Browser/vendor speech processing has privacy implications | Consent states that the app stores no audio but browser/vendor processing may occur. |
| Gemini free-tier limits or availability change | Fake provider remains the default and the complete local demo still works. |
| Provider output invents experience | Structured evidence references, prompt boundaries, validation, and manual evaluation corpus. |
| Free hosting sleeps and cleanup does not run exactly on time | Access is rejected immediately after `expiresAt`; purge runs on schedule and startup when service is available. |
| AI-generated code weakens learning | Domain/application work remains human-first and is reviewed in small checkpoints. |
