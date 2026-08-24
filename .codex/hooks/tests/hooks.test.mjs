import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { handlePreToolInput } from "../pre-tool-use.mjs";
import { handleStopInput } from "../stop-verification.mjs";

const directory = path.dirname(fileURLToPath(import.meta.url));
const fixtures = JSON.parse(fs.readFileSync(path.join(directory, "../fixtures/cases.json"), "utf8"));
const fakeRoot = "/workspace/global-ready";

for (const fixture of fixtures.preToolUse) {
  test(`PreToolUse: ${fixture.name}`, () => {
    const output = handlePreToolInput(JSON.stringify(fixture.input), fakeRoot);
    const decision = output.hookSpecificOutput?.permissionDecision ?? "allow";
    assert.equal(decision, fixture.decision);
  });
}

for (const fixture of fixtures.stop) {
  test(`Stop: ${fixture.name}`, () => {
    let fastRuns = 0;
    const output = handleStopInput(JSON.stringify(fixture.input), {
      hasTrackedChanges: () => fixture.trackedChanges,
      runFast: () => {
        fastRuns += 1;
        return { status: fixture.fastStatus };
      },
    });
    const decision = output.decision ?? "allow";
    assert.equal(decision, fixture.decision);
    assert.equal(fastRuns, fixture.name === "first failure" ? 1 : 0);
  });
}

test("Malformed PreToolUse input is denied without execution", () => {
  const output = handlePreToolInput(fixtures.malformedRawInput, fakeRoot);
  assert.equal(output.hookSpecificOutput?.permissionDecision, "deny");
});

test("Malformed Stop input cannot request a continuation loop", () => {
  const output = handleStopInput(fixtures.malformedRawInput, {
    hasTrackedChanges: () => {
      throw new Error("must not inspect changes");
    },
    runFast: () => {
      throw new Error("must not run verification");
    },
  });
  assert.equal(output.decision, undefined);
  assert.match(output.systemMessage, /malformed/u);
});
