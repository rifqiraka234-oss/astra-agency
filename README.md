# Astra Agency — Automated Enrichment Pipeline

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

## Status

Pipeline code and playbook are built. Before the daily Cloud Routine is
scheduled to run unattended, a manual dry run is done on a handful of real
contacts and reviewed by Raka (see the latest entry under `logs/runs/` for
the dry run's output).
