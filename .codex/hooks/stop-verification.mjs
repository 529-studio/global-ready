#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { execFileSync, spawnSync } from "node:child_process";
import { pathToFileURL } from "node:url";

export function decideStop(input, dependencies) {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return { systemMessage: "Stop hook input was malformed; verification was not claimed." };
  }
  if (input.stop_hook_active === true) {
    return { systemMessage: "Fast verification already requested one continuation; stopping without a loop." };
  }
  if (!dependencies.hasTrackedChanges()) return {};

  const result = dependencies.runFast();
  if (result.status === 0) return {};
  return {
    decision: "block",
    reason: "Tracked files changed and ./scripts/verify.sh fast failed. Fix the reported check, then summarize the result.",
  };
}

export function handleStopInput(rawInput, dependencies) {
  let input;
  try {
    input = JSON.parse(rawInput);
  } catch {
    return { systemMessage: "Stop hook input was malformed; verification was not claimed or retried." };
  }
  return decideStop(input, dependencies);
}

function gitRoot() {
  return execFileSync("git", ["rev-parse", "--show-toplevel"], { encoding: "utf8" }).trim();
}

function trackedChanges(root) {
  const unstaged = spawnSync("git", ["-C", root, "diff", "--quiet"], { stdio: "ignore" });
  if (unstaged.status === 1) return true;
  if (unstaged.status !== 0) throw new Error("Unable to inspect unstaged changes");
  const staged = spawnSync("git", ["-C", root, "diff", "--cached", "--quiet"], { stdio: "ignore" });
  if (staged.status === 1) return true;
  if (staged.status !== 0) throw new Error("Unable to inspect staged changes");
  return false;
}

function main() {
  const rawInput = fs.readFileSync(0, "utf8");
  let root;
  try {
    root = gitRoot();
  } catch {
    process.stdout.write(
      `${JSON.stringify({ systemMessage: "Stop hook could not resolve the Git root; verification was not claimed." })}\n`,
    );
    return;
  }

  const output = handleStopInput(rawInput, {
    hasTrackedChanges: () => trackedChanges(root),
    runFast: () =>
      spawnSync(path.join(root, "scripts/verify.sh"), ["fast"], {
        cwd: root,
        env: { ...process.env, CODEX_STOP_HOOK: "1" },
        stdio: ["ignore", "inherit", "inherit"],
        timeout: 110_000,
      }),
  });
  process.stdout.write(`${JSON.stringify(output)}\n`);
}

const invokedPath = process.argv[1] ? pathToFileURL(path.resolve(process.argv[1])).href : "";
if (invokedPath === import.meta.url) {
  try {
    main();
  } catch {
    process.stdout.write(
      `${JSON.stringify({ decision: "block", reason: "Stop verification guard failed before verification could complete." })}\n`,
    );
  }
}
