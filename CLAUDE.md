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

## Pre-flight capability check (run before every run, before step 1)

Learned the hard way on the 2026-08-12 pilot: do not pull any contact or
company data until these two checks pass. See
`docs/session-notes/2026-08-12-pilot-run-retrospective.md` for the full
incident writeup.

1. **WebFetch egress check.** Call `WebFetch` once against any known-good
   URL. If it returns `EGRESS_BLOCKED` (or otherwise fails) for a domain
   that has no reason to be blocked, this environment's network policy does
   not permit the outbound access Stage 2 requires. **Stop immediately.** Do
   not pull contacts, do not build company maps, do not fall back to
   research from `WebSearch` snippets alone — that violates the "never
   fabricate a website observation" guardrail and the spec's explicit
   "load real pages, not just search snippets" rule for Stage 2. Report the
   exact error payload to Raka and wait for the environment to be fixed.
2. **lemlist company-data check.** Call `search_companies` once and confirm
   what fields actually come back (see note below — as of 2026-08-12 it is
   only `id`/`name`/`domain`/`crmSyncStatus`, never description/founded
   date/industry/location). If this has changed, update the note below and
   the cost assumptions in the spec's "Input pre-filter" section
   accordingly.

Only proceed to step 1 once both checks pass.

### Known gap: lemlist company data is sparser than the spec assumes

Verified on 2026-08-12: `search_companies` (and every other lemlist tool
available to this pipeline, including the raw `call_api` fallback) only
ever returns `id`, `name`, `domain`, and `crmSyncStatus` for a company —
never `companyDescription`, `companyFoundedOn`, `companyIndustry`, or
`companyLocation`, and `domain` itself is frequently empty. There is no
`GET /companies/{companyId}` endpoint in the lemlist API, and
`search_companies` has no `id` filter — the only way to resolve a specific
`companyId` to a name/domain is to paginate the full company list and match
locally (cap `limit` at 200 per call; `limit=500` reliably exceeds the tool
output token limit and gets redirected to a scratch file instead of
returned inline).

Practical consequence: the spec's "Input pre-filter" cost-saver (treating
`companyFoundedOn`/`companyDescription` as pre-populated hints that reduce
how much fresh research Stage 1/2 need) **does not apply in this
environment**. Budget for full-from-scratch research on every contact,
including finding the company website via search when lemlist's `domain`
field is blank, unless a future check of this section confirms lemlist has
started returning richer company data.

### If Stage 2 is unavailable pipeline-wide

If the WebFetch check in step 1 above fails, do not process any contacts
through the pipeline and do not bulk-route them to `tier2_queue.jsonl` as
`MANUAL_REVIEW` — that would misrepresent "the site was never checked" as
"the site was checked and came back uncertain." Halt the run, leave state
files untouched, and write a short note under `logs/runs/YYYY-MM-DD.md`
recording that the run did not proceed and why.

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
   - Everything else that isn't EXCLUDE (`businessLaunchStatus = DO_NOT_USE`,
     `campaignEligibility = MANUAL_REVIEW`, or LOW website confidence) →
     append to `state/tier2_queue.jsonl`.
6. Add the contact ID to `checkpoint.json`'s `lastProcessedContactIds` and
   update `lastRunAt`/`totalProcessed` as you go (so a crash mid batch loses
   at most the in flight contact, not the whole run).
7. At the end of the run, for every Tier 1 contact collected in step 5:
   verify `connectionMessage` and `firstMessage` are non empty and contain no
   hyphen/en dash/em dash, then import into `cam_Co5CJXrpPFf5MRAfD` via
   `import_leads_to_campaign` (CSV upload, `columnMapping` mapping the
   `connectionMessage` and `firstMessage` CSV headers to those exact custom
   variable names — do not rename them). On the very first batch of Tier 1
   imports ever run, stop after importing and ask Raka to confirm the
   `{{connectionMessage}}`/`{{firstMessage}}` fields rendered correctly on a
   couple of test leads in lemlist before trusting future runs to import
   unattended, per the spec's explicit warning about field name mismatches.
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
