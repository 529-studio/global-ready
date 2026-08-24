#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

function commandName(token) {
  return path.basename(token ?? "").toLowerCase();
}

function tokensFor(segment) {
  return (segment.match(/"(?:\\.|[^"\\])*"|'[^']*'|[^\s;&|]+/gu) ?? []).map((token) => {
    if ((token.startsWith('"') && token.endsWith('"')) || (token.startsWith("'") && token.endsWith("'"))) {
      return token.slice(1, -1);
    }
    return token;
  });
}

function isSensitiveFile(token) {
  const normal = token.toLowerCase();
  if (/(^|\/)\.env\.?(?:example|sample|template)$/u.test(normal)) return false;
  return (
    /(^|\/)\.env(?:$|\.[^/]+$)/u.test(normal) ||
    /(^|\/)(?:credentials|hosts\.yml|\.npmrc|\.pypirc)$/u.test(normal) ||
    normal.includes("/.aws/credentials")
  );
}

function riskyRemovalTarget(token, repositoryRoot) {
  const target = token.replace(/\/+$/u, "") || "/";
  const literals = new Set([
    "/",
    ".",
    "./",
    "..",
    "../",
    "~",
    "$HOME",
    "${HOME}",
    "$CODEX_HOME",
    "${CODEX_HOME}",
    "*",
    "./*",
    "../*",
    "/*",
    "~/*",
  ]);
  if (literals.has(token) || literals.has(target)) return true;
  if (/^\$\{?(?:HOME|CODEX_HOME)\}?\/?\*?$/u.test(token)) return true;
  if (repositoryRoot && path.isAbsolute(target) && path.resolve(target) === path.resolve(repositoryRoot)) {
    return true;
  }
  return false;
}

function inspectSegment(segment, repositoryRoot) {
  const tokens = tokensFor(segment);
  const lower = tokens.map((token) => token.toLowerCase());

  for (let index = 0; index < tokens.length; index += 1) {
    if (commandName(tokens[index]) !== "rm") continue;
    const remainder = tokens.slice(index + 1);
    const options = remainder.filter((token) => token.startsWith("-"));
    const recursive = options.some(
      (option) => option === "--recursive" || (/^-[^-]*[rR]/u.test(option)),
    );
    const targets = remainder.filter((token) => !token.startsWith("-"));
    if (
      recursive &&
      (targets.some((target) => riskyRemovalTarget(target, repositoryRoot)) ||
        /git\s+rev-parse\s+--show-toplevel/iu.test(segment))
    ) {
      return "Broad recursive deletion is blocked";
    }
  }

  for (let index = 0; index < lower.length - 1; index += 1) {
    if (lower[index] !== "git") continue;
    const operation = lower[index + 1];
    const args = lower.slice(index + 2);
    if (operation === "reset" && args.includes("--hard")) {
      return "git reset --hard is blocked";
    }
    if (operation === "clean") {
      const optionLetters = args
        .filter((argument) => argument.startsWith("-") && !argument.startsWith("--"))
        .join("")
        .toLowerCase();
      const force = optionLetters.includes("f") || args.includes("--force");
      const directories = optionLetters.includes("d") || args.includes("--directories");
      const ignored = optionLetters.includes("x") || args.includes("--ignored");
      if (force && directories && ignored) return "git clean -fdx is blocked";
    }
    if (operation === "push") {
      if (args.some((argument) => argument === "-f" || argument.startsWith("--force"))) {
        return "Force push is blocked";
      }
      const protectedRef = /^(?:[^:]*:)?(?:refs\/heads\/)?(?:main|master)$/u;
      if (args.some((argument) => protectedRef.test(argument))) {
        return "Direct push to main or master is blocked";
      }
    }
  }

  for (let index = 0; index < lower.length; index += 1) {
    if (lower[index] !== "docker" && lower[index] !== "docker-compose") continue;
    const args = lower.slice(index + 1);
    const composeOffset = lower[index] === "docker" && args[0] === "compose" ? 1 : 0;
    const composeArgs = args.slice(composeOffset);
    if (
      composeArgs.includes("down") &&
      (composeArgs.includes("-v") || composeArgs.includes("--volumes"))
    ) {
      return "docker compose down with volume deletion is blocked";
    }
  }

  const printCommands = new Set(["awk", "cat", "grep", "head", "less", "more", "rg", "sed", "tail"]);
  for (let index = 0; index < tokens.length; index += 1) {
    const name = commandName(tokens[index]);
    if (printCommands.has(name) && tokens.slice(index + 1).some(isSensitiveFile)) {
      return "Printing environment or credential files is blocked";
    }
    if (name === "printenv") return "Printing process environment is blocked";
    if (name === "gh" && lower[index + 1] === "auth" && lower[index + 2] === "token") {
      return "Printing the GitHub authentication token is blocked";
    }
    if (name === "env") {
      const remainder = tokens.slice(index + 1);
      const hasCommand = remainder.some(
        (token) => !token.startsWith("-") && !/^[A-Za-z_][A-Za-z0-9_]*=/u.test(token),
      );
      if (!hasCommand) return "Printing process environment is blocked";
    }
  }

  if (
    /\b(?:echo|printf)\b[^;&|\n]*\$\{?[A-Za-z_][A-Za-z0-9_]*(?:TOKEN|SECRET|PASSWORD|API_KEY|PRIVATE_KEY)\}?/iu.test(
      segment,
    )
  ) {
    return "Printing a credential environment variable is blocked";
  }

  return null;
}

export function evaluateCommand(command, repositoryRoot = process.cwd()) {
  for (const segment of command.split(/[;&|\n]+/u)) {
    const reason = inspectSegment(segment, repositoryRoot);
    if (reason) return reason;
  }
  return null;
}

function denial(reason) {
  return {
    hookSpecificOutput: {
      hookEventName: "PreToolUse",
      permissionDecision: "deny",
      permissionDecisionReason: reason,
    },
  };
}

export function handlePreToolInput(rawInput, repositoryRoot = process.cwd()) {
  let input;
  try {
    input = JSON.parse(rawInput);
  } catch {
    return denial("Malformed PreToolUse hook input was denied safely");
  }

  const command = input?.tool_input?.command;
  if (input?.hook_event_name !== "PreToolUse" || typeof command !== "string" || !command.trim()) {
    return denial("Incomplete PreToolUse hook input was denied safely");
  }

  const reason = evaluateCommand(command, repositoryRoot);
  return reason ? denial(reason) : {};
}

async function main() {
  const rawInput = fs.readFileSync(0, "utf8");
  process.stdout.write(`${JSON.stringify(handlePreToolInput(rawInput))}\n`);
}

const invokedPath = process.argv[1] ? pathToFileURL(path.resolve(process.argv[1])).href : "";
if (invokedPath === import.meta.url) {
  main().catch(() => {
    process.stdout.write(`${JSON.stringify(denial("PreToolUse guard failed safely"))}\n`);
  });
}
