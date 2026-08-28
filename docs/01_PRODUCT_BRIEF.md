# Product Brief

Status: Canonical v0.3
Last updated: 2026-08-27

## 1. Product statement

Global-Ready helps a Vietnamese software developer practise workplace and
interview English through one active shadowing exercise before expanding into
an adaptive project deep-dive interview. The first product promise is modest:
help the learner imitate a useful communication shape, transfer it to an
independent response, and reflect without numeric scoring or a claim that the
application verifies speech.

## 2. Why this project exists

The primary goal is a zero-cost portfolio and relearning project that should:

- restore practical Java and Spring Boot skills after a long gap;
- validate whether one active speaking-practice loop is worth continuing;
- demonstrate state modelling, persistence, API design, failure recovery,
  testing, and external-provider integration only as later milestones justify
  those capabilities;
- produce a project the owner can explain and defend in an interview; and
- replace a weaker capstone entry on the CV only after the implementation and
  evidence are real.

## 3. Primary learner

The owner is the primary learner: a Vietnamese software developer who can read
technical English but hesitates when explaining work, clarifying requirements,
giving a status update, disagreeing in review, or answering an interview
question. An optional secondary learner is a Vietnamese fresher or junior
developer with the same practice need.

No account, team, recruiter, or long-term history model is required for the
pilot.

## 4. Active core loop

```text
guided imitation -> optional repetition -> independent transfer -> reflection
```

1. Guided imitation presents one versioned developer dialogue, identifies the
   target role, and follows the reference media clock.
2. Optional repetition lets the learner pause, replay, move backward, or
   change playback rate without imposing an unevidenced replay count.
3. Independent transfer begins only after one valid, system-observed complete
   reference playback. The learner then speaks by self-attestation or enters
   transient text while source text is concealed by the product UI.
4. Reflection restores the source and asks the learner to review context,
   decision or action, reasoning or evidence, and result or next step.

The system observes reference playback, not whether the learner spoke or how
well the learner pronounced the response. Transcript concealment is a
self-regulated UI affordance, not authentication, anti-cheat, or content
security.

## 5. Product principles

1. **Active practice before expansion:** validate one complete learning loop
   before adding breadth.
2. **Evidence before claims:** formative owner evidence may guide the next
   milestone but does not prove universal learning effectiveness.
3. **Rehearsal before correction:** the learner responds independently before
   comparing with the source.
4. **No scoring:** no numeric score, pronunciation score, or hiring-readiness
   claim is part of the product promise.
5. **Small and defensible:** prefer one complete flow over broad features.
6. **Privacy by enforceable boundary:** M2 intentionally does not persist,
   log, analytics-track, or transmit learner transfer content; it does not
   promise control over browser, operating-system, IME, extension, or recovery
   behaviour.
7. **Zero-cost default:** a clean clone and deterministic verification require
   no paid service, cloud credential, or hosted media provider.
8. **Learning value matters:** backend and frontend code should remain simple
   enough for the owner to trace and explain.

## 6. Milestone cut lines

### M2 pilot MVP

M2 is one developer-dialogue pilot backed by a public, read-only Spring
metadata/content-contract API. The browser loads reference media and captions
directly from a repository-local static origin or a future approved public
origin. The backend and database never upload, store, proxy, stream, or carry
media bytes.

M2 includes:

- one versioned exercise manifest and derived WebVTT;
- guided imitation, optional replay, pause, backward seek, and playback-rate
  control;
- a complete-pass reference-playback gate followed by independent transfer;
- transient text or speaking self-attestation and four-part reflection;
- deterministic Spring, frontend, browser, content, and clean-clone evidence;
  and
- truthful accessibility, privacy, media-rights, and recovery boundaries.

M2 excludes:

- speech-to-text (STT), microphone capture, speech verification, raw audio,
  pronunciation assessment, and numeric scoring;
- accounts, anonymous session tokens, learner history, progress sync,
  persisted attempts, and reports;
- CV/job-description input and adaptive interview turns;
- scenario packs or a content marketplace;
- deployment, cloud SDKs, signed URL services, and public hosting; and
- selection or configuration of an object-storage provider or CDN.

### M3 portfolio/CV MVP

M3 is the first portfolio/CV cut line. It must add a product-justified Spring
persistence, transaction, idempotency, recovery, and integration-test slice
that the owner can explain. This meaningful backend evidence precedes any
scenario-pack or STT expansion.

The adaptive project deep-dive interview remains a later product direction.
Its candidate context, anonymous access, expiry, provider, turn, and report
contracts are retained for future persisted work rather than treated as M2
requirements.

## 7. M2 owner go/no-go rubric

After completing the clean-clone pilot, the owner records:

- activation difficulty;
- confidence before and after practice;
- whether the four-part communication shape appears in the independent
  transfer response;
- confusing controls, timing, or instructions; and
- whether the flow feels like active practice rather than passive viewing.

This formative pilot informs whether to continue, revise, or stop the product
direction. It does not prove learning speed, retention, pronunciation quality,
or population-level effectiveness.

## 8. Engineering and portfolio acceptance

The M2 pilot is successful when:

1. the owner can run one exercise from a clean clone without a paid dependency
   or cloud credential;
2. Spring serves only the public exercise metadata/content contract while the
   browser requests media and captions directly;
3. the learner can identify the target role, optionally repeat material,
   complete independent transfer without source text in the product UI, and
   use the source for reflection;
4. deterministic tests prove content consistency, playback-gate state,
   application-controlled privacy, and the real browser transport boundary;
5. no real human media is published without the approved rights and provenance
   gate; and
6. the owner can explain the M2 request flow, media boundary, state transitions,
   privacy limitations, and recovery strategy.

These are pilot and portfolio criteria, not claims of product-market fit or
learning superiority.

## 9. Key risks and fallbacks

| Risk | Required fallback |
|---|---|
| The exercise feels passive or confusing | Use the owner rubric to revise or stop before adding scenarios or STT. |
| Browser media playback or captions fail | Show truthful recovery UI and keep transfer locked; deterministic local fixtures remain the clean-clone path. |
| UI concealment is mistaken for secure content protection | State that public API, WebVTT, caches, and developer tools may expose source content. |
| Transient learner text is mistaken for secure erasure | Promise only no intentional application persistence, logging, analytics, or transmission. |
| Rights evidence for real human media is incomplete | Do not commit or publish the asset; continue with a deterministic non-person fixture. |
| A future public media provider adds cost or credentials | Keep provider selection outside M2 and preserve repository-local zero-cost verification. |
| Portfolio claims outrun backend evidence | Treat M3, not M2, as the first portfolio/CV cut line. |
