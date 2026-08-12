# Astra Agency

Two separate systems live in this repository. They share nothing but the git
history.

## 1. Enrichment pipeline

Repeatable, unattended, resumable enrichment of new business sign-ups pulled
from lemlist, producing verified launch/website research and two drafted
outreach messages per qualifying contact, tiered for either automatic import
or a weekly human approval batch.

- **Spec:** [`docs/enrichment-pipeline-spec.md`](docs/enrichment-pipeline-spec.md) — the full requirements, verbatim.
- **Operating playbook:** [`CLAUDE.md`](CLAUDE.md) — the concrete procedure a
  Claude Code session (interactive or a Cloud Routine firing) follows, with
  live lemlist IDs and state file formats.
- **State:** `state/` — checkpoint, enriched leads log, Tier 2 review queue
  and history. This is the pipeline's database; it lives in git because
  Cloud Routine firings get a fresh, stateless container each time.
- **Logs:** `logs/` — per contact failures and daily run summaries.

This pipeline drafts and stages messages only. It never flips the target
lemlist campaign to running and never causes a send by itself; a human
decides when sending actually starts.

**Status:** pipeline code and playbook are built. Before the daily Cloud
Routine is scheduled to run unattended, a manual dry run is done on a handful
of real contacts and reviewed by Raka (see the latest entry under
`logs/runs/` for the dry run's output).

## 2. Autonomous reply agent

A guarded sales workflow that answers Lemlist conversations. Webhooks come in,
a deterministic controller decides what may happen, and Claude analyzes and
drafts inside limits the controller sets. Claude recommends; the controller
decides.

- **Documentation:** [`docs/reply-agent/`](docs/reply-agent/README.md)
- **Code:** `packages/` (core, db, integrations, prompts) and `apps/`
  (worker, dashboard)

```bash
cp .env.example .env
echo "ENCRYPTION_KEY=$(openssl rand -base64 32)" >> .env
echo "SESSION_SECRET=$(openssl rand -base64 32)" >> .env
npm run dashboard:hash-password        # paste OPERATOR_PASSWORD_HASH into .env
npm install
npm run dev                            # Postgres, migrations, seed, worker, dashboard
```

**Status:** built and tested; nothing has run against a live prospect. Every
live-action flag is `false` and `GLOBAL_KILL_SWITCH` is `true` by default, so
a fresh checkout cannot reach anyone. See
[`docs/reply-agent/status.md`](docs/reply-agent/status.md) for what is
complete, deferred and blocked on credentials, and
[`docs/reply-agent/runbook.md`](docs/reply-agent/runbook.md) for the operator
procedures.

There is deliberately no configuration flag anywhere that permits automatic
delivery of a prototype link. A prototype URL only ever leaves the system
through an authenticated operator approving one exact version of one exact
message.
