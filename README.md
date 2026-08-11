# Astra Agency — Automated Outreach Routines

Two related, unattended, resumable Claude Code routines that run against
lemlist:

## 1. Enrichment pipeline
Enriches new business sign-ups pulled from lemlist, producing verified
launch/website research and two drafted outreach messages per qualifying
contact, tiered for either automatic import or a weekly human approval
batch.

- **Spec:** [`docs/enrichment-pipeline-spec.md`](docs/enrichment-pipeline-spec.md) — the full requirements, verbatim.
- **State:** `state/checkpoint.json`, `state/enriched_leads.jsonl`,
  `state/tier2_queue.jsonl`, `state/tier2_history.jsonl`.
- **Logs:** `logs/failures.jsonl`, `logs/runs/YYYY-MM-DD.md`.

This pipeline drafts and stages messages only. It never flips the target
lemlist campaign to running and never causes a send by itself; a human
decides when sending actually starts.

## 2. Daily inbox triage
Reviews every active LinkedIn conversation across all running campaigns,
tiers each one (Hot / Warm / Silent accepted / Stalled / No action), and
produces a compact daily digest with suggested replies for Raka to approve
and send.

- **Spec:** [`docs/inbox-triage-spec.md`](docs/inbox-triage-spec.md) — the full requirements.
- **State:** `state/inbox_checkpoint.json`, `state/inbox_digest_log.jsonl`.
- **Logs:** `logs/inbox/YYYY-MM-DD.md` — the actual digest sent to Raka each day.

This routine only tiers and suggests. It never sends anything itself.

## Shared operating playbook

- **[`CLAUDE.md`](CLAUDE.md)** — the concrete procedure a Claude Code session
  (interactive or a Cloud Routine firing) follows for either routine, with
  live lemlist IDs and state file formats.
- **[`docs/astra-master-context.md`](docs/astra-master-context.md)** — who
  ASTRA is, who it sells to, its four service lines and pricing, and the
  voice/message rules behind every outreach message either routine drafts.
  Read this before drafting a message, not just the pipeline mechanics.
- **State lives in git** because Cloud Routine firings get a fresh, stateless
  container each time; the committed `state/` and `logs/` files are the only
  thing that persists between runs.

## Status

Enrichment pipeline code and playbook are built; a manual dry run is done on
a handful of real contacts and reviewed by Raka before the daily Cloud
Routine runs unattended (see the latest entry under `logs/runs/`).

Inbox triage spec and playbook are built; see the latest entry under
`logs/inbox/` for the first run's digest.
