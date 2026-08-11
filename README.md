# Astra Agency — Automated Outreach Routines

Three related, unattended, resumable Claude Code routines that run against
lemlist, Netlify, Google Calendar and Gmail:

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
and send. A genuine "yes, send it over" hands off to routine 3 below.

- **Spec:** [`docs/inbox-triage-spec.md`](docs/inbox-triage-spec.md) — the full requirements.
- **State:** `state/inbox_checkpoint.json`, `state/inbox_digest_log.jsonl`,
  `state/silent_accepted_queue.jsonl`.
- **Logs:** `logs/inbox/YYYY-MM-DD.md` — the actual digest sent to Raka each day.

This routine only tiers and suggests. It never sends anything itself unless
Raka explicitly approves a specific batch in the moment.

## 3. Prototype build and meeting booking
Researches a company, builds a genuinely bespoke single-file HTML
prototype for whatever was actually promised in the outreach thread, hosts
it on Netlify under a named subdomain, and sends it back. A decline routes
to a new angle rather than a repeat; a booked meeting triggers an automatic
brief, by email and saved in this repo, so Raka knows what to expect before
every call.

- **Spec:** [`docs/prototype-build-spec.md`](docs/prototype-build-spec.md) — the research and build quality bar.
- **Mechanics:** the "Prototype build and meeting booking" section of
  [`CLAUDE.md`](CLAUDE.md) — hosting convention, retry-on-decline rule, and
  the meeting brief procedure.
- **State:** `state/prototypes.jsonl`, `state/meetings.jsonl`.
- **Logs:** `logs/meetings/YYYY-MM-DD-[Company].md` — one brief per booked meeting.

The end goal of every reply this repo produces, prototype or not, is a
booked meeting. This routine is where that goal actually gets automated.

## Shared operating playbook

- **[`CLAUDE.md`](CLAUDE.md)** — the concrete procedure a Claude Code session
  (interactive or a Cloud Routine firing) follows for all three routines,
  with live lemlist IDs, hosting conventions, and state file formats.
- **[`docs/astra-master-context.md`](docs/astra-master-context.md)** — who
  ASTRA is, who it sells to, its four service lines and pricing, and the
  voice/message rules behind every outreach message any routine drafts.
  Read this before drafting a message, not just the pipeline mechanics.
- **State lives in git** because Cloud Routine firings get a fresh, stateless
  container each time; the committed `state/` and `logs/` files are the only
  thing that persists between runs.

## Status

Enrichment pipeline code and playbook are built; a manual dry run is done on
a handful of real contacts and reviewed by Raka before the daily Cloud
Routine runs unattended (see the latest entry under `logs/runs/`).

Inbox triage spec and playbook are built and has run live at least once,
see the latest entry under `logs/inbox/`.

Prototype build and meeting booking spec and playbook are built as of
2026-08-12, not yet run against a real lead, `state/prototypes.jsonl` and
`state/meetings.jsonl` are currently empty.
