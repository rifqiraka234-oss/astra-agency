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
  "lastRunAt": "<ISO8601>", "totalProcessed": N }`. Before pulling contacts
  from lemlist each run, load this file and skip any contact ID already in
  `lastProcessedContactIds` (lemlist's `New Businesses` list was bulk
  imported with identical `createdAt` timestamps on every row, so filtering
  by "added since last run" via date does not work for this list — dedupe by
  contact ID against this checkpoint instead).
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
   `search_contacts` (paginate with `limit`/`offset`), skip any contact ID
   already in the checkpoint's `lastProcessedContactIds`.
3. For each new contact, look up its linked company (`companyId`) to get
   `companyName`, `companyDomain`/website, `companyDescription`,
   `companyFoundedOn`, `companyIndustry`, `companyLocation` (fallback to the
   contact's own `location` field if company location is empty). Apply the
   input pre filter from the spec: only carry the 11 listed fields forward,
   nothing else.
4. Run Stage 1 through Stage 5 exactly as specified in
   `docs/enrichment-pipeline-spec.md` for each contact, using WebSearch/
   WebFetch for research. Use `companyFoundedOn`/`companyDescription` as
   starting hypotheses per the spec, never as unverified fact.
5. Append the result to `state/enriched_leads.jsonl`. Route:
   - `EXCLUDE` → record only, never imported.
   - Tier 1 (`campaignEligibility = INCLUDE` AND `businessLaunchStatus =
     QUALIFIED` with HIGH or MEDIUM `businessLaunchConfidence` AND
     `websiteAnalysisConfidence = HIGH`) → collect for import this run.
   - Tier 2 / INCLUDE (`campaignEligibility = INCLUDE` but short of the Tier 1
     confidence bar — e.g. MEDIUM website/launch confidence) → as of
     2026-08-11, Raka approved skipping the weekly wait for this subset only:
     these have real, non-fabricated `connectionMessage`/`firstMessage`
     already drafted (Stage 4 only ever runs for INCLUDE), so collect them
     for import this run alongside Tier 1, same verification and same
     import call. Still record `tier: TIER_2` in `enriched_leads.jsonl` for
     the audit trail, but do not leave them sitting in `tier2_queue.jsonl`
     waiting on a digest.
   - Tier 2 / REVIEW (`businessLaunchStatus = DO_NOT_USE`, `campaignEligibility
     = MANUAL_REVIEW`, or LOW website confidence, i.e. anything not
     confirmed as `INCLUDE`) → append to `state/tier2_queue.jsonl` as before.
     These never get a drafted message and never get auto-imported — the
     underlying facts are exactly what's unverified, so writing a
     congratulations message here would violate the no-fabrication
     guardrail below. They only leave the queue by being re-researched to a
     confident `INCLUDE`/`EXCLUDE`, or via the weekly digest.
6. Add the contact ID to `checkpoint.json`'s `lastProcessedContactIds` and
   update `lastRunAt`/`totalProcessed` as you go (so a crash mid batch loses
   at most the in flight contact, not the whole run).
7. At the end of the run, for every Tier 1 and Tier 2/INCLUDE contact
   collected in step 5: verify `connectionMessage` and `firstMessage` are
   non empty and contain no hyphen/en dash/em dash, then import into
   `cam_Co5CJXrpPFf5MRAfD` via
   `import_leads_to_campaign` (CSV upload, `columnMapping` mapping the
   `connectionMessage` and `firstMessage` CSV headers to those exact custom
   variable names — do not rename them). On the very first batch of Tier 1
   imports ever run, stop after importing and ask Raka to confirm the
   `{{connectionMessage}}`/`{{firstMessage}}` fields rendered correctly on a
   couple of test leads in lemlist before trusting future runs to import
   unattended, per the spec's explicit warning about field name mismatches.
8. Write `logs/runs/YYYY-MM-DD.md` with the run summary. Commit and push.

## Weekly Tier 2 review procedure

This now only covers `state/tier2_queue.jsonl` rows still stuck at
MANUAL_REVIEW/DO_NOT_USE (Tier 2/INCLUDE rows no longer wait here, see
above). Once a week, read the queue in full, present it as a single digest
to Raka (not per contact prompts): counts by reason
(`DO_NOT_USE` / `MANUAL_REVIEW` / `LOW website confidence`), and the full
list of contacts — most will have no drafted message, since the facts
weren't solid enough to write one without fabricating. Wait for a
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
