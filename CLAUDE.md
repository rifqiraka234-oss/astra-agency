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
  — **critical, changes Stage 1 entirely (2026-08-11):** Raka built this
  list by filtering lemlist for companies created in 2026. Every contact
  in it is already a confirmed recent launch — that's the point of the
  list. There is no need to hunt a contact's bio/tagline/summary for a
  recency phrase before treating `businessLaunchStatus = QUALIFIED`; list
  membership itself is the evidence. Default every contact to `QUALIFIED`,
  `businessLaunchConfidence = MEDIUM`, `howLongAgoBusinessWasCreated =
  "recently"` (exact month is essentially never knowable from this alone,
  so don't claim one) unless something *specifically contradicts* a 2026
  founding — e.g. the contact's own bio says "27 years' experience", "since
  2012", "established", lists multiple older sister companies, or is
  clearly an employee describing someone else's company. Those are real
  counter-evidence and should still route to EXCLUDE/DO_NOT_USE. This
  means Stage 1 is rarely the bottleneck anymore — **spend the research
  budget on Stage 2 (the website check) instead**, which is now the actual
  decision point for INCLUDE vs EXCLUDE on nearly every contact.
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
- `state/tier2_queue.md` — human readable mirror of `tier2_queue.jsonl`,
  regenerated (fully overwritten, not appended) every time the JSONL
  changes. Raka reads this one, not the JSON — one table row per contact
  (name, company, why it's stuck, what's been tried) grouped under a short
  header explaining these are genuinely blocked, not just under-researched
  (see "Always try to find a way" below). Keep it short enough to skim in
  under a minute.
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
3. For each new contact, pull its full lemlist record via
   `call_api GET /contacts/{id}` (load the `api-reference` skill first,
   once per session) — **not** a company lookup, see the Efficiency
   playbook below for why. Read `fields.summary`, `fields.tagline`, and
   `fields.jobDescription`: these usually name the company and often
   contain a genuine recency signal ("I founded X this year", "in
   Gründung", "we launched on..."). Apply the input pre filter from the
   spec conceptually — carry forward only what's needed for Stage 1/2/4,
   don't quote the raw dump back into state files.
4. Run Stage 1 through Stage 5 exactly as specified in
   `docs/enrichment-pipeline-spec.md` for each contact, using WebSearch/
   WebFetch for research (see search budget in the Efficiency playbook).
   Treat the contact's own self-reported `summary`/`tagline` language as a
   starting hypothesis per the spec, never as unverified fact — it still
   needs at least one independent corroboration attempt before HIGH
   confidence.
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
   Before parking a contact in Tier 2/REVIEW, apply the "Always try to
   find a way" rule below — most rows resolve to a confident `INCLUDE`
   or `EXCLUDE` with a bit more digging, and `NO_WEBSITE` is itself a
   confident, good answer, not a reason to give up.
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
MANUAL_REVIEW/DO_NOT_USE after applying "Always try to find a way" above
(Tier 2/INCLUDE rows no longer wait here, see above) — this should be a
short list. Once a week, regenerate `state/tier2_queue.md` and point Raka
at it directly (not per contact prompts, not a JSON dump): counts by
reason, and for each contact why it's genuinely stuck and what's already
been tried. Wait for a single go/no go. On approval, import the approved
subset the same way as Tier 1 (step 7 above), append every row (approved
and rejected) to `state/tier2_history.jsonl` with a `decision` field, and
truncate both `state/tier2_queue.jsonl` and `state/tier2_queue.md` to
empty. Commit and push.

## Standing spot check

Weekly, independent of the Tier 2 review: pull 5 to 10 `TIER_1` rows from
`state/enriched_leads.jsonl` that were actually imported and confirm in
lemlist they actually sent, surface them to Raka for a quick skim. This is
informational only, never blocks anything.

## Always try to find a way (learned 2026-08-11)

`NO_WEBSITE` is a good outcome, not a failure to find something. A
confirmed absence of a website is exactly the defensible gap Stage 3
wants — it's as usable as PLACEHOLDER/BASIC for a Tier 2/INCLUDE draft,
often with the cleanest angle of all ("there's nothing to find you with
yet"). Don't treat "couldn't find a site" as a research dead end that
routes to Tier 2/REVIEW by default. The mindset is: keep trying to reach a
confident `INCLUDE` or `EXCLUDE` before accepting `MANUAL_REVIEW`.

When the first pass (per the search budget below) doesn't resolve a
contact, spend 2-3 more targeted searches before giving up — this
consistently resolves most of what would otherwise sit in the queue:
- A company registry search (Companies House for UK, KVK for NL, a
  Handelsregister/Zefix equivalent elsewhere) — confirms the company is
  real and sometimes gives an exact founding date.
- The contact's other social presence (X/Twitter, Instagram, a personal
  portfolio site) — sometimes surfaces a company site or launch post that
  a plain web search misses.
- A direct domain guess and fetch (company-name.com/.co.uk/.nl/.fr) —
  faster than another round of search when a name is distinctive.
- If a contact's own claimed self-report conflicts with something else
  found (an old "preparing to launch" mention vs. a current "already
  operating" bio, for instance), treat the contact's own *current*
  profile as the primary source — people update their own bios; a stale
  cached mention doesn't override that.

Only stop at `MANUAL_REVIEW` for reasons that no amount of searching
fixes: the underlying fact is genuinely undisclosed by the business
itself (e.g. "details not yet revealed"), the venture is explicitly
pre-commercial with no product or customers yet (early-stage R&D, not a
going concern to pitch a website fix to), or there's a real, irreconcilable
conflict in what's found. Write the *reason* it's stuck (not just "low
confidence") into `businessLaunchSource`/`websiteAnalysisSource` so the
next pass — or Raka reading `tier2_queue.md` — knows whether it's worth
trying again.

## Efficiency playbook (learned 2026-08-10/11, read before starting a run)

The single biggest cost driver is **WebSearch/WebFetch research per
contact**, not lemlist API calls — lemlist pulls are cheap and paginated.
Don't try to save cost by feeding contacts from a manually uploaded
CSV/XLSX instead of `search_contacts`; it doesn't reduce the actual cost
(research is identical either way) and it breaks the point of this being
an unattended Cloud Routine (no human is there to upload a file each day).
CSV input stays what the spec says it is: fine for one-off manual test
runs, never the standing source.

- **There is no lemlist company-record lookup.** `search_companies` only
  returns `id`/`name`/`domain`/`crmSyncStatus` — no description, founded
  date, or industry — and there is no `GET /companies/{id}` endpoint
  (`call_api` will reject it, the catalog only has `GET /companies` list
  and `/notes`). Don't spend a call rediscovering this. Go straight to
  `call_api GET /contacts/{id}` for the full lemlist-enriched contact
  record (`summary`/`tagline`/`jobDescription` usually name the company),
  then corroborate with WebSearch/WebFetch. If a contact's record has none
  of those three fields and no company name anywhere, that's a fast
  `EXCLUDE` (no identifiable company) — don't burn a search on it.
- **Cap research per contact.** Since list membership already confirms the
  launch (see Live configuration above), research is mostly Stage 2 now:
  one WebSearch to find the company's site/domain and confirm identity,
  one more only if the first was ambiguous, one WebFetch on the actual
  site if a domain was found. If a second targeted search for a
  website/domain comes up empty, conclude `NO_WEBSITE` — that's a
  confident, good finding (see "Always try to find a way" above), not a
  reason to keep trying domain variations. Diminishing returns past ~3
  tool calls per contact. Only spend extra effort re-verifying launch
  recency when the contact's own bio actively contradicts a 2026 founding
  (established language, decades of experience, sister companies, etc).
- **Batch tool calls aggressively.** Pull a full page of contacts, then
  fire all the `GET /contacts/{id}` calls for that page in one message
  (parallel), then all the WebSearches for the promising ones in one
  message, then all the WebFetches. Don't go contact-by-contact
  sequentially.
- **Commit once per batch (~15-20 contacts), not per contact.** The spec's
  "or after every contact for a long batch" is about crash resilience for
  a genuinely long unattended run, not a reason to commit after every
  single row in an interactive session.
- **Talk less mid-run.** Don't narrate every batch to Raka. Only surface:
  a Tier 1/Tier 2-INCLUDE hit as it happens (or batch these and mention
  once at the end), a genuine blocker, or the final end-of-session tally
  (processed / tier breakdown / queue size / remaining count). The run log
  file is the detailed record — the chat reply doesn't need to duplicate it.
- **Standing rule (2026-08-11): never reply with prose unless something
  actually needs Raka's input** (a genuine blocker, a question, a rule
  change confirmation). Routine batch results go in a compact markdown
  table only — columns: Name, Company, Research finding, Outcome, Tier,
  Connection message, First message (blank the last two for EXCLUDE rows).
  No summary paragraph above or below the table. This is a standing
  reporting format, not a one-off for a single run.

## Message style (read before drafting any connectionMessage/firstMessage)

The messages must read like a real person wrote them, not an AI. Concretely:

- Open the first sentence of `firstMessage` as a flat observation, not a
  compound "doing X by Y, treating Z like W" construction. Say what you saw,
  plainly, then the one detail worth noting. Bad (tongue twisty, AI sounding):
  "Building Studio Piero as a sibling duo around brand strategy and art
  direction, treating identity like something that's cultivated not just
  designed, is a nice angle." Good (plain, direct): "Saw Studio Piero,
  treating identity like something that's cultivated not just designed is a
  nice angle."
- The message should center their problem, not our observation about them.
  Name the actual gap (no website, broken site, no way to find them) as
  something that's costing them real opportunity right now, specific to what
  they do, not a generic "you're missing a website" line. The ask at the end
  should feel like a genuine, low pressure offer to fix a real problem they
  have, not a sales pitch.
- Avoid AI tells: no "however," as a pivot word, no listy triple adjectives,
  no overly polished parallel structure, no em dash cadence rebuilt with
  commas. Write like a founder messaging another founder, short sentences,
  a little casual.
- Read every drafted message back before finalizing and ask: would a real
  small business owner write this to a stranger on LinkedIn? If it sounds
  like copy, rewrite it.

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
