#!/usr/bin/env bash

set -euo pipefail

ROOT="$(git rev-parse --show-toplevel)"
MODE="${1:-}"

usage() {
  echo "Usage: ./scripts/verify.sh {fast|full|backend|frontend|docs|smoke}" >&2
  exit 2
}

require_command() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "verify: required command not found: $1" >&2
    exit 1
  fi
}

configure_testcontainers() {
  local colima_socket="${HOME:-}/.colima/default/docker.sock"
  if [[ -z "${DOCKER_HOST:-}" && -S "$colima_socket" ]]; then
    export DOCKER_HOST="unix://$colima_socket"
  fi
  if [[ "${DOCKER_HOST:-}" == *"/.colima/"* && -z "${TESTCONTAINERS_DOCKER_SOCKET_OVERRIDE:-}" ]]; then
    export TESTCONTAINERS_DOCKER_SOCKET_OVERRIDE="/var/run/docker.sock"
  fi
}

select_compose() {
  if command -v docker >/dev/null 2>&1 && docker compose version >/dev/null 2>&1; then
    COMPOSE=(docker compose)
  elif command -v docker-compose >/dev/null 2>&1; then
    COMPOSE=(docker-compose)
  else
    echo "verify: Docker Compose is required" >&2
    exit 1
  fi
}

node_is_pinned() {
  command -v node >/dev/null 2>&1 && command -v npm >/dev/null 2>&1 &&
    [[ "$(node --version | sed 's/^v//')" == "$(tr -d '[:space:]' < "$ROOT/frontend/.nvmrc")" ]]
}

frontend_in_pinned_container() {
  local npm_command="$1"
  local expected container status
  expected="$(tr -d '[:space:]' < "$ROOT/frontend/.nvmrc")"
  container="global-ready-node-check-$$"
  require_command docker
  require_command tar

  echo "verify: local Node does not match $expected; using pinned container"
  docker create \
    --name "$container" \
    --workdir /workspace \
    --env NEXT_TELEMETRY_DISABLED=1 \
    "node:${expected}-alpine3.24" \
    sh -lc "$npm_command" >/dev/null

  set +e
  COPYFILE_DISABLE=1 tar \
    -C "$ROOT/frontend" \
    --no-xattrs \
    --exclude='.DS_Store' \
    --exclude='.env' \
    --exclude='.env.*' \
    --exclude='.next' \
    --exclude='node_modules' \
    --exclude='tsconfig.tsbuildinfo' \
    -cf - . | docker cp - "$container:/workspace"
  status=$?
  if [[ $status -eq 0 ]]; then
    docker start --attach "$container"
    status=$?
  fi
  docker rm --force "$container" >/dev/null 2>&1
  set -e
  return "$status"
}

backend_fast() {
  echo "verify: backend fast"
  configure_testcontainers
  (cd "$ROOT/backend" && ./gradlew --no-daemon test)
}

backend_full() {
  echo "verify: backend full"
  configure_testcontainers
  (cd "$ROOT/backend" && ./gradlew --no-daemon check)
}

frontend_fast() {
  echo "verify: frontend fast"
  if node_is_pinned; then
    (cd "$ROOT/frontend" && npm ci --no-audit --no-fund && npm run lint && npm run typecheck)
  else
    frontend_in_pinned_container "npm ci --no-audit --no-fund && npm run lint && npm run typecheck"
  fi
}

frontend_full() {
  echo "verify: frontend full"
  if node_is_pinned; then
    (cd "$ROOT/frontend" && npm ci --no-audit --no-fund && npm run check)
  else
    frontend_in_pinned_container "npm ci --no-audit --no-fund && npm run check"
  fi
}

docs_check() {
  echo "verify: docs/contracts/hooks"
  require_command node
  node "$ROOT/scripts/docs-check.mjs"
  node --test "$ROOT/.codex/hooks/tests/hooks.test.mjs"
  select_compose
  "${COMPOSE[@]}" -f "$ROOT/compose.yaml" config >/dev/null
  "${COMPOSE[@]}" -f "$ROOT/compose.yaml" --profile app config >/dev/null
}

collect_changes() {
  {
    if [[ -n "${VERIFY_BASE_REF:-}" ]]; then
      git -C "$ROOT" diff --name-only "${VERIFY_BASE_REF}...HEAD"
    fi
    git -C "$ROOT" diff --name-only
    git -C "$ROOT" diff --cached --name-only
    git -C "$ROOT" ls-files --others --exclude-standard
  } | sed '/^$/d' | sort -u
}

fast() {
  local changed run_backend=false run_frontend=false run_docs=false
  changed="$(collect_changes)"

  if [[ -z "$changed" || "${VERIFY_ALL:-0}" == "1" ]]; then
    run_backend=true
    run_frontend=true
    run_docs=true
  else
    while IFS= read -r file; do
      case "$file" in
        AGENTS.md|*/AGENTS.md|README.md|docs/*|.agents/*|.codex/*|scripts/*|.github/*|.gitignore)
          run_docs=true
          ;;
        backend/*)
          run_backend=true
          ;;
        frontend/*)
          run_frontend=true
          ;;
        compose.yaml|.env.example)
          run_backend=true
          run_frontend=true
          run_docs=true
          ;;
        *)
          run_backend=true
          run_frontend=true
          run_docs=true
          ;;
      esac
    done <<< "$changed"
  fi

  $run_backend && backend_fast
  $run_frontend && frontend_fast
  $run_docs && docs_check
  echo "verify: fast ok"
}

full() {
  backend_full
  frontend_full
  docs_check
  echo "verify: full ok"
}

wait_for_http() {
  local url="$1" label="$2" attempts=0
  until curl -fsS --max-time 3 -o /dev/null "$url"; do
    attempts=$((attempts + 1))
    if (( attempts >= 60 )); then
      echo "verify: smoke timed out waiting for $label" >&2
      return 1
    fi
    sleep 1
  done
}

smoke() {
  require_command curl
  select_compose

  local offset=$(( $$ % 1000 ))
  local backend_port=$(( 18080 + offset ))
  local frontend_port=$(( 20080 + offset ))
  local postgres_port=$(( 22080 + offset ))
  local project="global-ready-smoke-$$"
  local volume="${project}_global-ready-postgres"

  smoke_compose() {
    env \
      POSTGRES_DB=global_ready_smoke \
      POSTGRES_USER=global_ready_smoke \
      POSTGRES_PASSWORD=global_ready_smoke \
      POSTGRES_PORT="$postgres_port" \
      BACKEND_PORT="$backend_port" \
      FRONTEND_PORT="$frontend_port" \
      NEXT_PUBLIC_API_BASE_URL="http://localhost:$backend_port" \
      APP_ENVIRONMENT=smoke \
      NEXT_TELEMETRY_DISABLED=1 \
      GEMINI_API_KEY= \
      "${COMPOSE[@]}" -f "$ROOT/compose.yaml" -p "$project" --profile app "$@"
  }

  cleanup_smoke() {
    local cleanup_status=0
    set +e
    smoke_compose down --remove-orphans >/dev/null 2>&1 || cleanup_status=1
    docker volume rm "$volume" >/dev/null 2>&1 || cleanup_status=1
    set -e
    return "$cleanup_status"
  }
  trap cleanup_smoke EXIT INT TERM

  echo "verify: isolated no-key smoke"
  smoke_compose up --build -d
  wait_for_http "http://localhost:$backend_port/actuator/health" "backend health"
  wait_for_http "http://localhost:$backend_port/api-docs" "OpenAPI"
  wait_for_http "http://localhost:$frontend_port" "frontend"
  curl -fsS --max-time 5 "http://localhost:$backend_port/api-docs" | grep -q '"title":"Global-Ready API"'
  echo "verify: smoke ok"

  if ! cleanup_smoke; then
    echo "verify: smoke passed but temporary resource cleanup failed" >&2
    return 1
  fi
  trap - EXIT INT TERM
}

case "$MODE" in
  fast) fast ;;
  full) full ;;
  backend) backend_full; echo "verify: backend ok" ;;
  frontend) frontend_full; echo "verify: frontend ok" ;;
  docs) docs_check; echo "verify: docs ok" ;;
  smoke) smoke ;;
  *) usage ;;
esac
