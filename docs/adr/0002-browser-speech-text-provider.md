# ADR-0002: Browser speech with server-side text generation

Status: Accepted  
Date: 2026-08-24

## Context

The MVP must cost zero by default and support a voice-like interview without storing large audio data. A realtime voice provider/WebRTC design would add credentials, streaming topology, quota, and privacy complexity.

## Decision

Use desktop Chrome speech recognition for candidate STT and browser speech synthesis for interviewer TTS. Persist only final text. Keep text input and visible prompts as mandatory fallbacks. Generate interviewer prompts and reports through two backend ports with deterministic fake adapters by default and optional Gemini text adapters.

## Consequences

- the backend has no audio endpoint, WebSocket, WebRTC, or object storage;
- no raw audio retention policy is needed because audio is never persisted by the app;
- Chrome/browser vendor processing must be disclosed;
- recognition quality is browser-dependent and tested manually;
- the full fake/text path works without an API key.

