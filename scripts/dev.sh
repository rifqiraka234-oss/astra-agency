#!/usr/bin/env bash
# One documented command that brings up the whole local stack:
# Postgres, migrations, the webhook receiver + worker, and the dashboard.
set -euo pipefail

cd "$(dirname "$0")/.."

if [[ ! -f .env ]]; then
  echo "No .env found. Copying .env.example -> .env (all live flags stay false)."
  cp .env.example .env
  echo
  echo "Generate the two required secrets and put them in .env before continuing:"
  echo "  ENCRYPTION_KEY=\$(openssl rand -base64 32)"
  echo "  SESSION_SECRET=\$(openssl rand -base64 32)"
  echo
fi

echo "==> Starting Postgres"
docker compose up -d postgres

echo "==> Waiting for Postgres to accept connections"
for _ in $(seq 1 40); do
  if docker compose exec -T postgres pg_isready -U astra -d astra_reply_agent >/dev/null 2>&1; then
    break
  fi
  sleep 1
done

echo "==> Applying migrations"
npm run db:migrate

echo "==> Seeding local fixtures"
npm run db:seed

echo "==> Starting worker (:3001) and dashboard (:3000)"
trap 'kill 0' EXIT INT TERM
npm run dev:worker &
npm run dev:dashboard &
wait
