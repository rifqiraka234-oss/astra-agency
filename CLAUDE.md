# Astra Agency — Operating playbook

This repo drives two related automated routines:

1. The **contact enrichment pipeline**, described in
   `docs/enrichment-pipeline-spec.md`.
2. The **daily inbox triage**, described in `docs/inbox-triage-spec.md`.

Both specs are source of truth — read the relevant one in full before running
anything; this file is the concrete, repo-specific operating procedure
derived from them. They share the same message guardrails (no dashes, never
fabricate) and the same git-committed state-file pattern, since both run as
stateless Cloud Routine containers.

You are reading this either because a human started an interactive session
in this repo, or because a Cloud Routine fired a fresh session with no other
context. Everything you need is below and in the two spec files above.

## Enrichment pipeline

### Live configuration

- **Source contact list (lemlist):** `New Businesses` — `clt_Zzi8BjZSMvbEH9ihr`
- **Target campaign (lemlist):** `Small Business Owners v0.2 - Auto Enrichment Pipeline` — `cam_Co5CJXrpPFf5MRAfD`
  - Its sequence already uses `{{connectionMessage}}` (LinkedIn invite step),
    `{{firstMessage}}` (message step, +1 day after acceptance), and native
    `{{firstName}}` (the +3 day "have you seen this?" bump, no code involvement).
  - As of 2026-08-11 this campaign is **running** (Raka turned it on; it was
    draft when this playbook was first written). The pipeline does not
    change its status either way, that stays Raka's call, but leads imported
    into it now send on schedule rather than only queuing.
- **Custom lead fields written by this pipeline:** `connectionMessage`,
  `firstMessage`, `howLongAgoBusinessWasCreated`, `websiteAnalyses` (the last
  two already exist as custom fields on the team; the first two are created
  automatically the first time they're written via `update_lead_variables`
  or a CSV `columnMapping`).

### State files (this is how a stateless daily container resumes work)

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

### Daily run procedure

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

### Weekly Tier 2 review procedure

Once a week, read `state/tier2_queue.jsonl` in full, present it as a single
digest to Raka (not per contact prompts): counts by reason
(`DO_NOT_USE` / `MANUAL_REVIEW` / `LOW website confidence`), and the full
list of contacts with their generated messages where applicable. Wait for a
single go/no go. On approval, import the approved subset the same way as
Tier 1 (step 7 above), append every row (approved and rejected) to
`state/tier2_history.jsonl` with a `decision` field, and truncate
`state/tier2_queue.jsonl` to empty. Commit and push.

### Standing spot check

Weekly, independent of the Tier 2 review: pull 5 to 10 `TIER_1` rows from
`state/enriched_leads.jsonl` that were actually imported and confirm in
lemlist they actually sent, surface them to Raka for a quick skim. This is
informational only, never blocks anything.

### Guardrails (non negotiable, re read before generating any message)

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
- `cam_Co5CJXrpPFf5MRAfD` is now running (see Live configuration above), so
  Tier 1 imports into it send on schedule. Re confirm its status at the
  start of every run rather than trusting this note, since Raka can change
  it at any time.

## Daily inbox triage

Full spec: `docs/inbox-triage-spec.md`. Produces a digest of who Raka needs
to reply to across all active LinkedIn conversations. Never sends anything
itself.

### Live configuration

- **Active campaigns to cover:** any campaign with status `running` (check
  fresh each run via `get_campaigns` with no status filter, campaigns can
  change status between runs). As of 2026-08-11, both
  `cam_PryZp5LuvQv8NznHh` (`Small Business Owners v0.1 - Outreach Only`) and
  `cam_Co5CJXrpPFf5MRAfD` (`Small Business Owners v0.2 - Auto Enrichment
  Pipeline`) are running. Scope is status-driven, not a hardcoded ID list, so
  no code change is needed as campaigns turn on or off going forward.
- Do not cover `draft`, `paused`, `ended`, or `archived` campaigns, they have
  no live LinkedIn activity to triage.

### State files

- `state/inbox_checkpoint.json` — `{ "lastRunAt": "<ISO8601 or null>",
  "threads": { "<contactId>": { "lastSeenMessageId", "tier",
  "lastDigestDate", "campaignId" } } }`. `lastRunAt` feeds next run's
  `dateFilter.from` on `get_inbox_conversations`. The `threads` map is how a
  tier carries forward for an unchanged thread without re reading it.
- `state/silent_accepted_queue.jsonl` — the Silent accepted backlog queue
  (leadId, name, company, campaignId, acceptedDate, daysSinceAccept), one
  row per lead still awaiting a genuine opener. Confirmed 2026-08-11: v0.1
  has no automated second-touch step, so this queue only shrinks when
  someone actually drafts and sends an opener, it will not resolve itself.
  A full 513-lead scan is expensive (11 `search_campaign_leads` calls with
  `include: ["activities"]`); do not repeat it daily. Re scan only when the
  queue needs refreshing (e.g. weekly, or after a batch of openers has been
  sent), and in between just note new accepts surfaced incidentally by the
  regular daily pull.
- `state/inbox_digest_log.jsonl` — one JSON object per contact per run this
  routine actually reported on (append only): `date`, `contactId`,
  `companyName`, `tier`, `section` (matches the digest's own section names),
  and the suggested message text if one was drafted. This is the audit trail
  of every digest ever produced.
- `logs/inbox/YYYY-MM-DD.md` — the actual digest sent to Raka that day, in
  the exact output format from the spec. If nothing needed attention, this
  still gets written with the one-line "nothing today" note, so the run
  history has no silent gaps.

### Daily run procedure

1. `git pull`. Read `state/inbox_checkpoint.json`. First run ever: treat
   `lastRunAt` as absent and do one full pull to seed the checkpoint (this
   is the only run that isn't cheap).
2. `get_campaigns` (no status filter) to find every `running` campaign id.
3. `get_inbox_conversations` with `campaignFilter.in` set to those ids and
   `dateFilter.from` = the checkpoint's `lastRunAt` (omit `dateFilter` on the
   seed run). Paginate fully within this filtered result set.
4. For the Silent accepted cross check: call `get_contact_fields_schema`
   once, then `search_campaign_leads` per running campaign with `fields`
   including whichever field reflects LinkedIn connection status. Any
   connected lead whose contact ID is not in step 3's result set is a Silent
   accepted candidate this run.
5. For every contact surfaced by step 3 or step 4, run Steps 1 to 5 from the
   spec (reply status, context via `get_inbox_conversation`, tier, draft,
   mockup/research flags). For contacts not surfaced by either, carry their
   `tier` forward from `state/inbox_checkpoint.json` unchanged, no tool calls
   spent on them.
6. Update `state/inbox_checkpoint.json`: new `lastRunAt` (this run's start
   time), and each touched contact's `lastSeenMessageId`/`tier`.
7. Append every contact actually in today's digest to
   `state/inbox_digest_log.jsonl`.
8. Write `logs/inbox/YYYY-MM-DD.md` in the spec's output format and present
   it as this run's reply to Raka. Commit and push all state/log changes
   with a plain commit message like `inbox-triage: N contacts flagged,
   YYYY-MM-DD`.

### Guardrails

Same dash rule and no-fabrication rule as the enrichment pipeline (see
above), plus: never tier or draft off `aiLeadInterestLevel` alone, it is a
reading-priority hint, not evidence; never draft a reply for the No action
tier or include it in the digest; never send anything, this routine only
produces the digest.
