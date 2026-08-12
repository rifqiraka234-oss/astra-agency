# Astra Agency — Enrichment Pipeline: operating playbook

This repo drives the automated contact enrichment pipeline described in
`docs/enrichment-pipeline-spec.md` (source of truth — read it in full before
running anything; this file is the concrete, repo-specific operating
procedure derived from it).

You are reading this either because a human started an interactive session
in this repo, or because a Cloud Routine fired a fresh session with no other
context. Everything you need is below and in `docs/enrichment-pipeline-spec.md`.

## Live configuration

- **Source contact list (lemlist):** `New Businesses` — `clt_Zzi8BjZSMvbEH9ihr`
- **Target campaign (lemlist):** `Small Business Owners v0.2 - Auto Enrichment Pipeline` — `cam_Co5CJXrpPFf5MRAfD`
  - Its sequence already uses `{{connectionMessage}}` (LinkedIn invite step),
    `{{firstMessage}}` (message step, +1 day after acceptance), and native
    `{{firstName}}` (the +3 day "have you seen this?" bump, no code involvement).
  - This campaign is currently in **draft** status. Do not change its status.
    Turning it to `running` is Raka's call, not the pipeline's — importing
    leads into a draft campaign queues them without sending anything.
- **Custom lead fields written by this pipeline:** `connectionMessage`,
  `firstMessage`, `howLongAgoBusinessWasCreated`, `websiteAnalyses` (the last
  two already exist as custom fields on the team; the first two are created
  automatically the first time they're written via `update_lead_variables`
  or a CSV `columnMapping`).

## State files (this is how a stateless daily container resumes work)

Every Cloud Routine firing gets a fresh container. The only thing that
persists between firings is what's committed to this git branch. Treat these
files as the database:

- `state/checkpoint.json` — single object: `{ "lastProcessedContactIds": [...],
  "lastRunAt": "<ISO8601>", "totalProcessed": N, "firstTier1BatchConfirmed":
  false }`. Before pulling contacts from lemlist each run, load this file and
  skip any contact ID already in `lastProcessedContactIds` (lemlist's
  `New Businesses` list was bulk imported with identical `createdAt`
  timestamps on every row, so filtering by "added since last run" via date
  does not work for this list — dedupe by contact ID against this checkpoint
  instead). `firstTier1BatchConfirmed` starts `false`; flip it to `true` the
  moment Raka confirms the message fields rendered correctly in lemlist (see
  step 7 below) and commit that change immediately — this is how a future
  stateless container knows the one-time confirmation gate has already been
  passed and should not ask again.
- `state/enriched_leads.jsonl` — one JSON object per processed contact,
  append only, using exactly the Stage 5 write back schema from the spec
  plus `contactId`, `companyId`, and `tier` (`TIER_1` / `TIER_2` / `EXCLUDE`).
  This is the full audit trail of everything the pipeline has ever produced.
- `state/tier2_queue.jsonl` — subset of rows currently awaiting the weekly
  Raka go/no go. Cleared (not deleted, truncated to empty) once a batch is
  approved and imported; approved/rejected rows get appended to
  `state/tier2_history.jsonl` with a `decision` field for the record.
- `logs/failures.jsonl` — one entry per contact that could not be processed
  (site totally unreachable after retry, lemlist API error, etc), with
  `contactId`, `reason`, `timestamp`. Never silently drop a contact — either
  it ends up in `enriched_leads.jsonl` or in `failures.jsonl`.
- `logs/runs/YYYY-MM-DD.md` — human readable summary written at the end of
  every daily run: total processed, INCLUDE/MANUAL_REVIEW/EXCLUDE counts,
  Tier 1 auto imported count, failures, and any notable issues.

Commit and push all state file changes at the end of every run (or after
every contact for a long batch, so an interrupted run loses no work). Use a
plain commit message like `pipeline: process N contacts, YYYY-MM-DD`.

## Daily run procedure

1. `git pull` the working branch. Read `state/checkpoint.json`.
2. Pull contacts from `New Businesses` (`clt_Zzi8BjZSMvbEH9ihr`) via
   `search_contacts`. Use one call with a `limit` large enough to cover the
   batch rather than paging with `offset` — `offset`-based pages of this
   list have been observed to return overlapping/duplicate contacts, it is
   not stably ordered. Skip any contact ID already in the checkpoint's
   `lastProcessedContactIds`.
3. For each new contact, look up its linked company (`companyId`) to get
   `companyName` and `companyDomain`/website (via `search_companies` with a
   high `limit`, matched by `companyId`). The spec's pre-filter also lists
   `companyDescription`, `companyFoundedOn`, `companyIndustry`, and
   `companyLocation` as pre-populated cost-saving hints — as of 2026-08-09
   no working lemlist tool call was found that returns these fields (not
   `search_companies`, not `search_contacts`, not a direct company-by-ID
   `call_api` endpoint). If a future session finds the right call, use it
   and update this note; until then, skip straight to full Stage 1/2
   research for every contact rather than spending calls re-probing for
   these fields. Company location falls back to the contact's own
   `location` field if unavailable.
4. Run Stage 1 through Stage 5 exactly as specified in
   `docs/enrichment-pipeline-spec.md` for each contact, using WebSearch/
   WebFetch for research. Use `companyFoundedOn`/`companyDescription` as
   starting hypotheses per the spec when available, never as unverified
   fact.
   - **Before dispatching multiple parallel research agents**, run one
     direct `WebFetch` call yourself against any real external domain (not
     `curl`, not `WebSearch` — the actual tool the agents will depend on).
     `WebFetch` enforces its own separate, stricter egress policy from the
     session's general network proxy: a working `curl` through
     `HTTPS_PROXY` does **not** mean `WebFetch` can reach the same domain,
     and there is no local settings file that controls this. Confirming
     `WebFetch` directly first avoids every dispatched agent independently
     rediscovering the same block and burning redundant tokens on it — this
     happened twice in the 2026-08-09 session, once burning roughly 375k
     tokens across 5 agents on each occurrence. Never report network access
     as "fixed" based on a `curl` test alone; confirm with `WebFetch`
     itself.
   - If `WebFetch` is confirmed blocked, do not retry it or route around it
     silently. Ask Raka before falling back to workaround: fetch the page
     via `curl` (through the session's normal proxy) and read the raw HTML
     directly (strip `<script>`/`<style>`/tags, unescape entities) instead
     of relying on `WebFetch`'s AI-summarized output. This was proven to
     work on 2026-08-09 for Stage 2 website classification across 10 sites.
5. Append the result to `state/enriched_leads.jsonl`. Route:
   - `EXCLUDE` → record only, never imported.
   - Tier 1 (`campaignEligibility = INCLUDE` AND `businessLaunchStatus =
     QUALIFIED` with HIGH or MEDIUM `businessLaunchConfidence` AND
     `websiteAnalysisConfidence = HIGH`) → collect for import this run.
   - Everything else that isn't EXCLUDE (`businessLaunchStatus = DO_NOT_USE`,
     `campaignEligibility = MANUAL_REVIEW`, or LOW website confidence) →
     append to `state/tier2_queue.jsonl`.
6. Add the contact ID to `checkpoint.json`'s `lastProcessedContactIds` and
   update `lastRunAt`/`totalProcessed` as you go (so a crash mid batch loses
   at most the in flight contact, not the whole run).
7. At the end of the run, for every Tier 1 contact collected in step 5:
   verify `connectionMessage` and `firstMessage` are non empty, under the 65
   word ceiling on `firstMessage`, and contain no hyphen/en dash/em dash —
   check this with an actual word count and character scan, not by eye, then
   import into `cam_Co5CJXrpPFf5MRAfD` via `import_leads_to_campaign` (CSV
   upload, `columnMapping` mapping the `connectionMessage` and
   `firstMessage` CSV headers to those exact custom variable names — do not
   rename them). If `state/checkpoint.json`'s `firstTier1BatchConfirmed` is
   still `false`, this is the very first batch of Tier 1 imports ever run:
   stop after importing and ask Raka to confirm the
   `{{connectionMessage}}`/`{{firstMessage}}` fields rendered correctly on a
   couple of test leads in lemlist (verify via `search_campaign_leads` with
   `fields: ["connectionMessage", "firstMessage"]` against the API directly,
   not just by eyeballing the leads table — the message columns are not
   shown by default there). Once confirmed, set
   `firstTier1BatchConfirmed: true` in the checkpoint and commit it — future
   runs with this flag already `true` import unattended without stopping to
   ask again.
8. Write `logs/runs/YYYY-MM-DD.md` with the run summary. Commit and push.

## Weekly Tier 2 review procedure

Once a week, read `state/tier2_queue.jsonl` in full, present it as a single
digest to Raka (not per contact prompts): counts by reason
(`DO_NOT_USE` / `MANUAL_REVIEW` / `LOW website confidence`), and the full
list of contacts with their generated messages where applicable. Wait for a
single go/no go. On approval, import the approved subset the same way as
Tier 1 (step 7 above), append every row (approved and rejected) to
`state/tier2_history.jsonl` with a `decision` field, and truncate
`state/tier2_queue.jsonl` to empty. Commit and push.

## Standing spot check

Weekly, independent of the Tier 2 review: pull 5 to 10 `TIER_1` rows from
`state/enriched_leads.jsonl` that were actually imported and confirm in
lemlist they actually sent, surface them to Raka for a quick skim. This is
informational only, never blocks anything.

## Guardrails (non negotiable, re read before generating any message)

- Never use hyphens, en dashes, or em dashes (`-`, `–`, `—`) anywhere in
  `connectionMessage` or `firstMessage`, or in any field that feeds into
  them. Rewrite around the dash rather than substituting a comma or colon if
  it would change meaning.
- Never fabricate a launch date, website observation, or company purpose.
  Every claim must trace back to something actually found in Stage 1 or 2.
- A batch run more than a couple of weeks old should not be trusted for
  outreach without re checking launch status and site state.
- This pipeline drafts and stages messages. It does not flip the campaign to
  running and does not otherwise cause a send by itself; a human decides
  when the campaign actually sends.
- If the `cam_Co5CJXrpPFf5MRAfD` campaign is still in draft status, keep
  importing Tier 1 leads into it as normal, that's expected until Raka
  turns it on.
