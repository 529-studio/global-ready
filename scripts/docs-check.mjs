#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const root = execFileSync("git", ["rev-parse", "--show-toplevel"], {
  cwd: scriptDirectory,
  encoding: "utf8",
}).trim();
const errors = [];

function relative(file) {
  return path.relative(root, file) || ".";
}

function requireFile(file) {
  const absolute = path.join(root, file);
  if (!fs.existsSync(absolute) || !fs.statSync(absolute).isFile()) {
    errors.push(`Missing required file: ${file}`);
  }
}

function requireMarkers(file, markers) {
  const absolute = path.join(root, file);
  if (!fs.existsSync(absolute)) return;
  const content = fs.readFileSync(absolute, "utf8");
  for (const marker of markers) {
    if (!content.includes(marker)) errors.push(`${file} is missing canonical marker: ${marker}`);
  }
}

function walk(directory, predicate, files = []) {
  if (!fs.existsSync(directory)) return files;
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if ([".git", ".gradle", ".next", "build", "node_modules"].includes(entry.name)) {
      continue;
    }
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(absolute, predicate, files);
    if (entry.isFile() && predicate(absolute)) files.push(absolute);
  }
  return files;
}

const requiredFiles = [
  "AGENTS.md",
  "backend/AGENTS.md",
  "backend/PROJECT_STATUS.md",
  "frontend/AGENTS.md",
  "frontend/PROJECT_STATUS.md",
  "backend/gradlew",
  "backend/gradle/wrapper/gradle-wrapper.properties",
  "frontend/package-lock.json",
  "frontend/.nvmrc",
  "compose.yaml",
  "docs/01_PRODUCT_BRIEF.md",
  "docs/02_ASSUMPTIONS_AND_DECISIONS.md",
  "docs/03_SRS.md",
  "docs/04_ARCHITECTURE.md",
  "docs/05_DATA_AND_API.md",
  "docs/06_OPEN_QUESTIONS.md",
  "docs/07_MILESTONE_RULES.md",
  "docs/08_MILESTONE_PLAN.md",
  "docs/09_TRACEABILITY.md",
  "docs/10_CHANGELOG_AND_READINESS.md",
  "docs/11_M1_IMPLEMENTATION_HANDOFF.md",
  "docs/12_CODEX_WORKFLOW.md",
  "docs/13_SHADOWING_FIRST_IMPLEMENTATION_PLAN.md",
  "docs/adr/0001-modular-monolith-monorepo.md",
  "docs/adr/0002-browser-speech-text-provider.md",
  "docs/adr/0003-session-aggregate-retention.md",
  "docs/adr/0004-provider-transaction-boundary.md",
  "docs/adr/0005-shadowing-content-and-media-boundary.md",
  ".codex/hooks.json",
  ".github/ISSUE_TEMPLATE/config.yml",
  ".github/ISSUE_TEMPLATE/feature.yml",
  ".github/ISSUE_TEMPLATE/bug.yml",
  ".github/ISSUE_TEMPLATE/technical-chore.yml",
  ".github/pull_request_template.md",
  ".github/dependabot.yml",
  ".github/workflows/ci.yml",
  "scripts/fixtures/skill-trigger-cases.json",
];
requiredFiles.forEach(requireFile);

requireMarkers("docs/01_PRODUCT_BRIEF.md", [
  "Status: Canonical v0.3",
  "guided imitation -> optional repetition -> independent transfer -> reflection",
  "M2 pilot MVP",
  "M3 portfolio/CV MVP",
]);
requireMarkers("docs/02_ASSUMPTIONS_AND_DECISIONS.md", [
  "Status: Canonical v0.3",
  "D-032",
  "D-041",
  "optional repetition",
]);
requireMarkers("docs/adr/0005-shadowing-content-and-media-boundary.md", [
  "# ADR-0005:",
  "Status: Accepted",
  "backend never uploads, stores, proxies, or streams media bytes",
]);
requireMarkers("docs/03_SRS.md", [
  "Status: Canonical v0.3",
  "FR-100 MUST",
  "FR-109 MUST",
  "BR-100",
  "BR-103",
  "NFR-050 MUST",
  "NFR-054 MUST",
  "AS-09",
  "AS-14",
]);
requireMarkers("docs/04_ARCHITECTURE.md", [
  "com.globalready.shadowing",
  "browser-direct media",
  "ADR-0005",
]);
requireMarkers("docs/05_DATA_AND_API.md", [
  "`GET /shadowing-exercises/{exerciseId}`",
  "M2 adds no table or migration",
  "never proxies media bytes",
]);
requireMarkers("docs/09_TRACEABILITY.md", [
  "FR-100–FR-109",
  "BR-100–BR-103",
  "NFR-050–NFR-054",
  "AS-09–AS-14",
]);
requireMarkers("docs/07_MILESTONE_RULES.md", [
  "Status: Canonical v0.3",
  "RED -> GREEN -> REFACTOR",
  "media-rights gate",
  "manual merge",
]);
requireMarkers("docs/08_MILESTONE_PLAN.md", [
  "## M0.3 — Shadowing canonical closure",
  "## M2 — Shadowing pilot MVP",
  "## M3 — Spring portfolio/CV MVP",
  "M2 go/no-go",
]);
requireMarkers("docs/10_CHANGELOG_AND_READINESS.md", [
  "v0.2 -> v0.3",
  "CANONICAL v0.3 READY; M2 BACKLOG NOT YET APPROVED",
]);
requireMarkers("docs/11_M1_IMPLEMENTATION_HANDOFF.md", [
  "2026-08-27 addendum",
  "M2 — Shadowing pilot MVP",
]);

function gitOutput(args) {
  return execFileSync("git", args, { cwd: root, encoding: "utf8" }).trim();
}

function gitLines(args) {
  const output = gitOutput(args);
  return output ? output.split(/\r?\n/u).filter(Boolean) : [];
}

function commitContainsStatusLedgers(commit) {
  try {
    execFileSync("git", ["cat-file", "-e", `${commit}:backend/PROJECT_STATUS.md`], {
      cwd: root,
      stdio: "ignore",
    });
    execFileSync("git", ["cat-file", "-e", `${commit}:frontend/PROJECT_STATUS.md`], {
      cwd: root,
      stdio: "ignore",
    });
    return true;
  } catch {
    return false;
  }
}

function filesChangedByCommit(commit) {
  const revision = gitLines(["rev-list", "--parents", "-n", "1", commit]);
  const parts = revision[0]?.split(/\s+/u) ?? [];
  if (parts.length > 1) return gitLines(["diff", "--name-only", parts[1], commit]);
  return gitLines(["diff-tree", "--root", "--no-commit-id", "--name-only", "-r", commit]);
}

function validateProjectStatusUpdate(files, context) {
  if (files.length === 0) return;

  const backendStatus = "backend/PROJECT_STATUS.md";
  const frontendStatus = "frontend/PROJECT_STATUS.md";
  const backendChanged = files.some((file) => file.startsWith("backend/") && file !== backendStatus);
  const frontendChanged = files.some((file) => file.startsWith("frontend/") && file !== frontendStatus);
  const backendStatusChanged = files.includes(backendStatus);
  const frontendStatusChanged = files.includes(frontendStatus);

  if (!backendStatusChanged && !frontendStatusChanged) {
    errors.push(`${context} changes repository state without updating a PROJECT_STATUS.md ledger`);
  }
  if (backendChanged && !backendStatusChanged) {
    errors.push(`${context} changes backend files without updating ${backendStatus}`);
  }
  if (frontendChanged && !frontendStatusChanged) {
    errors.push(`${context} changes frontend files without updating ${frontendStatus}`);
  }
}

const workingChanges = new Set([
  ...gitLines(["diff", "--name-only"]),
  ...gitLines(["diff", "--cached", "--name-only"]),
  ...gitLines(["ls-files", "--others", "--exclude-standard"]),
]);
if (
  fs.existsSync(path.join(root, "backend/PROJECT_STATUS.md")) &&
  fs.existsSync(path.join(root, "frontend/PROJECT_STATUS.md"))
) {
  validateProjectStatusUpdate([...workingChanges], "Working tree");
}

const verificationBase = process.env.VERIFY_BASE_REF?.trim();
if (verificationBase && !/^0+$/u.test(verificationBase)) {
  try {
    const commits = gitLines(["rev-list", "--reverse", `${verificationBase}..HEAD`]);
    for (const commit of commits) {
      if (!commitContainsStatusLedgers(commit)) continue;
      validateProjectStatusUpdate(filesChangedByCommit(commit), `Commit ${commit.slice(0, 12)}`);
    }
  } catch (error) {
    errors.push(`Unable to verify PROJECT_STATUS commit discipline: ${error.message}`);
  }
}

const agentsPath = path.join(root, "AGENTS.md");
if (fs.existsSync(agentsPath)) {
  const agents = fs.readFileSync(agentsPath, "utf8");
  if (agents.includes("<REPLACE>")) {
    errors.push("AGENTS.md still contains a verification-command placeholder");
  }
}

const markdownFiles = walk(root, (file) => file.endsWith(".md"));
const markdownLink = /!?\[[^\]]*\]\(([^)]+)\)/g;
for (const file of markdownFiles) {
  const content = fs.readFileSync(file, "utf8");
  for (const match of content.matchAll(markdownLink)) {
    let target = match[1].trim();
    if (target.startsWith("<") && target.includes(">")) {
      target = target.slice(1, target.indexOf(">"));
    } else {
      target = target.split(/\s+["']/u, 1)[0];
    }
    if (!target || target.startsWith("#") || /^[a-z][a-z0-9+.-]*:/iu.test(target)) {
      continue;
    }
    const withoutAnchor = target.split("#", 1)[0];
    if (!withoutAnchor) continue;
    let decoded;
    try {
      decoded = decodeURIComponent(withoutAnchor);
    } catch {
      errors.push(`${relative(file)} has an invalid encoded link: ${target}`);
      continue;
    }
    const resolved = path.resolve(path.dirname(file), decoded);
    if (!fs.existsSync(resolved)) {
      errors.push(`${relative(file)} links to missing path: ${target}`);
    }
  }
}

function expandRequirementIds(text) {
  const ids = new Set();
  const expression = /\b(FR|BR|NFR|AS)-(\d{2,3})(?:\s*[–—]\s*(?:(FR|BR|NFR|AS)-)?(\d{2,3}))?/gu;
  for (const match of text.matchAll(expression)) {
    const prefix = match[1];
    const startText = match[2];
    const start = Number(startText);
    const endPrefix = match[3] ?? prefix;
    const end = match[4] ? Number(match[4]) : start;
    if (endPrefix !== prefix || end < start || end - start > 200) continue;
    for (let value = start; value <= end; value += 1) {
      ids.add(`${prefix}-${String(value).padStart(startText.length, "0")}`);
    }
  }
  return ids;
}

const srsPath = path.join(root, "docs/03_SRS.md");
const rtmPath = path.join(root, "docs/09_TRACEABILITY.md");
if (fs.existsSync(srsPath) && fs.existsSync(rtmPath)) {
  const srsIds = expandRequirementIds(fs.readFileSync(srsPath, "utf8"));
  const rtmIds = expandRequirementIds(fs.readFileSync(rtmPath, "utf8"));
  for (const id of srsIds) {
    if (!rtmIds.has(id)) errors.push(`RTM does not mechanically cover ${id}`);
  }
}

const apiPath = path.join(root, "docs/05_DATA_AND_API.md");
if (fs.existsSync(apiPath)) {
  const api = fs.readFileSync(apiPath, "utf8");
  const requiredContractMarkers = [
    "base path: `/api/v1`",
    "`GET /shadowing-exercises/{exerciseId}`",
    "`POST /access-grants`",
    "`POST /interview-sessions`",
    "`PUT /interview-sessions/{sessionId}/turns/{turnId}/answer`",
    "`POST /interview-sessions/{sessionId}/report`",
  ];
  for (const marker of requiredContractMarkers) {
    if (!api.includes(marker)) errors.push(`API contract is missing marker: ${marker}`);
  }
}

const skillsRoot = path.join(root, ".agents/skills");
const expectedSkills = ["global-ready-issue-delivery", "global-ready-ticket-manager"];
if (fs.existsSync(skillsRoot)) {
  const actualSkills = fs
    .readdirSync(skillsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
  if (JSON.stringify(actualSkills) !== JSON.stringify(expectedSkills)) {
    errors.push(`Expected exactly two repository skills: ${expectedSkills.join(", ")}`);
  }
  for (const skill of expectedSkills) {
    const skillFile = path.join(skillsRoot, skill, "SKILL.md");
    requireFile(relative(skillFile));
    if (!fs.existsSync(skillFile)) continue;
    const content = fs.readFileSync(skillFile, "utf8");
    const frontmatter = content.match(/^---\r?\n([\s\S]*?)\r?\n---/u)?.[1] ?? "";
    if (!frontmatter.includes(`name: ${skill}`)) {
      errors.push(`${relative(skillFile)} has an invalid name`);
    }
    if (!/^description:\s+\S.+$/mu.test(frontmatter)) {
      errors.push(`${relative(skillFile)} needs a non-empty description`);
    }
  }
} else {
  errors.push("Missing .agents/skills");
}

const triggerFixturePath = path.join(root, "scripts/fixtures/skill-trigger-cases.json");
if (fs.existsSync(triggerFixturePath)) {
  try {
    const fixtures = JSON.parse(fs.readFileSync(triggerFixturePath, "utf8"));
    const expectedCases = ["explicit", "implicit", "incomplete", "negative"];
    for (const skill of expectedSkills) {
      const cases = fixtures
        .filter((fixture) => fixture.skill === skill)
        .map((fixture) => fixture.case)
        .sort();
      if (JSON.stringify(cases) !== JSON.stringify(expectedCases)) {
        errors.push(`${skill} trigger fixtures must cover explicit, implicit, incomplete and negative cases`);
      }
    }
    for (const fixture of fixtures) {
      if (!fixture.prompt?.trim() || !fixture.expected?.trim()) {
        errors.push(`Skill trigger fixture ${fixture.skill ?? "unknown"}/${fixture.case ?? "unknown"} is incomplete`);
      }
    }
  } catch (error) {
    errors.push(`Invalid skill trigger fixtures: ${error.message}`);
  }
}

const hooksPath = path.join(root, ".codex/hooks.json");
if (fs.existsSync(hooksPath)) {
  try {
    const configuration = JSON.parse(fs.readFileSync(hooksPath, "utf8"));
    const events = Object.keys(configuration.hooks ?? {}).sort();
    if (JSON.stringify(events) !== JSON.stringify(["PreToolUse", "Stop"])) {
      errors.push(".codex/hooks.json must define exactly PreToolUse and Stop");
    }
    if (configuration.hooks?.PreToolUse?.length !== 1 || configuration.hooks?.Stop?.length !== 1) {
      errors.push("Each hook event must have exactly one hook group");
    }
    if (configuration.hooks?.PreToolUse?.[0]?.matcher !== "Bash") {
      errors.push("PreToolUse must match Bash/unified exec");
    }
    for (const event of ["PreToolUse", "Stop"]) {
      const commands = configuration.hooks?.[event]?.[0]?.hooks ?? [];
      if (commands.length !== 1 || commands[0]?.type !== "command") {
        errors.push(`${event} must contain exactly one command hook`);
      }
    }
  } catch (error) {
    errors.push(`Invalid .codex/hooks.json: ${error.message}`);
  }
}

const issueForms = ["feature.yml", "bug.yml", "technical-chore.yml"];
const requiredIssueFormMarkers = [
  "id: outcome",
  "id: evidence",
  "id: technical_impact",
  "id: acceptance",
  "id: definition_of_done",
  "id: requirement_ids",
  "id: ai_mode",
  "id: non_goals",
  "id: risks",
];
for (const form of issueForms) {
  const formPath = path.join(root, ".github/ISSUE_TEMPLATE", form);
  if (!fs.existsSync(formPath)) continue;
  const content = fs.readFileSync(formPath, "utf8");
  for (const marker of requiredIssueFormMarkers) {
    if (!content.includes(marker)) errors.push(`${relative(formPath)} is missing required intake field ${marker}`);
  }
  for (const mode of ["HUMAN-FIRST", "AI-IMPLEMENT", "AI-REVIEW"]) {
    if (!content.includes(`- ${mode}`)) errors.push(`${relative(formPath)} is missing AI Mode ${mode}`);
  }
}

const issueConfigPath = path.join(root, ".github/ISSUE_TEMPLATE/config.yml");
if (fs.existsSync(issueConfigPath)) {
  const content = fs.readFileSync(issueConfigPath, "utf8");
  if (!/^blank_issues_enabled:\s*false$/mu.test(content)) {
    errors.push("Blank GitHub Issues must remain disabled");
  }
}

const pullRequestTemplatePath = path.join(root, ".github/pull_request_template.md");
if (fs.existsSync(pullRequestTemplatePath)) {
  const content = fs.readFileSync(pullRequestTemplatePath, "utf8");
  const requiredPrMarkers = [
    "Closes #",
    "AI Mode",
    "Requirement IDs",
    "ADR IDs",
    "Verification evidence",
    "Contract and data impact",
    "Privacy and security review",
    "Human review gate",
    "Risks and recovery",
    "Unverified items",
  ];
  for (const marker of requiredPrMarkers) {
    if (!content.includes(marker)) errors.push(`PR template is missing required marker: ${marker}`);
  }
}

const workflowPath = path.join(root, ".github/workflows/ci.yml");
if (fs.existsSync(workflowPath)) {
  const workflow = fs.readFileSync(workflowPath, "utf8");
  const requiredWorkflowMarkers = [
    "pull_request:",
    "- dev",
    "contents: read",
    "cancel-in-progress: true",
    "APP_AI_PROVIDER: fake",
    'GEMINI_API_KEY: ""',
    "timeout-minutes:",
    "./scripts/verify.sh backend",
    "./scripts/verify.sh frontend",
    "./scripts/verify.sh docs",
    "./scripts/verify.sh smoke",
  ];
  for (const marker of requiredWorkflowMarkers) {
    if (!workflow.includes(marker)) errors.push(`CI workflow is missing policy marker: ${marker}`);
  }
  if (/uses:\s*[^\s@]+@(?:v\d+|main|master)\b/mu.test(workflow)) {
    errors.push("CI actions must be pinned to immutable commit SHAs, not mutable tags or branches");
  }
  for (const match of workflow.matchAll(/uses:\s*([^\s@]+)@([^\s#]+)/gu)) {
    if (!/^[0-9a-f]{40}$/u.test(match[2])) {
      errors.push(`CI action ${match[1]} is not pinned to a full 40-character SHA`);
    }
  }
  const forbiddenWorkflowMarkers = [
    "pull_request_target:",
    "openai/codex-action",
    "OPENAI_API_KEY",
    "CODEX_API_KEY",
    "secrets.",
  ];
  for (const marker of forbiddenWorkflowMarkers) {
    if (workflow.includes(marker)) errors.push(`CI workflow contains forbidden zero-cost/security marker: ${marker}`);
  }
}

const dependabotPath = path.join(root, ".github/dependabot.yml");
if (fs.existsSync(dependabotPath)) {
  const dependabot = fs.readFileSync(dependabotPath, "utf8");
  for (const ecosystem of ["gradle", "npm", "github-actions", "docker"]) {
    if (!dependabot.includes(`package-ecosystem: ${ecosystem}`)) {
      errors.push(`Dependabot is missing present ecosystem: ${ecosystem}`);
    }
  }
  const schedules = dependabot.match(/interval:\s*weekly/gu) ?? [];
  if (schedules.length !== 4) errors.push("Every Dependabot ecosystem must use the weekly cadence");
  if (/auto-merge|automerge/iu.test(dependabot)) errors.push("Dependabot must not configure auto-merge");
}

if (errors.length > 0) {
  console.error(`docs: failed (${errors.length} issue${errors.length === 1 ? "" : "s"})`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`docs: ok (${markdownFiles.length} Markdown files, ${expectedSkills.length} skills)`);
