# Pilot run retrospective — 2026-08-12

Status: **Aborted before any contact was fully processed.** No leads were
imported, no messages were sent, no state files were modified. This document
is the full record of what happened, what went wrong, what was already
corrected during the session, and what still needs a decision from Raka.

## What happened, in order

1. **Checked repo state.** `git status` / `git log` showed a clean working
   tree on `claude/continue-previous-wh0q4y`, one prior commit that scaffolded
   the spec, the playbook, and empty state files. `state/checkpoint.json` had
   `lastProcessedContactIds: []`, `lastRunAt: null`, `totalProcessed: 0` — this
   was the very first real run.

2. **Read `docs/enrichment-pipeline-spec.md` in full** before touching
   anything, per the playbook's own instruction that it's the source of
   truth and must be read before running anything.

3. **Pulled contacts from lemlist.** `search_contacts` against the
   `New Businesses` list (`clt_Zzi8BjZSMvbEH9ihr`) returned 1099 total
   contacts; fetched the first 50.

4. **Attempted to resolve per-contact company data** the way the playbook's
   step 3 describes (`companyName`, `companyDomain`, `companyDescription`,
   `companyFoundedOn`, `companyIndustry`, `companyLocation`). Found that the
   only lemlist tool that returns company records (`search_companies`) only
   ever returns `id`, `name`, `domain`, and `crmSyncStatus` — never
   description, founded date, industry, or location — regardless of query.
   Confirmed via:
   - Inspecting `get_contact_fields_schema(entity="company")` — no such
     lookup exists.
   - `call_api` fallback: `GET /api/companies/{companyId}` does not exist in
     the lemlist OpenAPI spec at all; `GET /api/companies?id=...` is rejected
     because it's "covered by the `search_companies` tool," which itself
     doesn't expose those fields.
   - A live example: EVCP Installations UK LTD (`cpn_Qt8kNs87mxXaagy7b`) came
     back with an **empty** `domain` and no other fields.

   **This contradicts the spec's assumption** that `companyFoundedOn` and
   `companyDescription` are "pre-populated by lemlist's own lighter
   enrichment on most rows" (spec cites 577/600 and 588/600 rows on a real
   batch). In the tool surface available to this session, those fields are
   not retrievable at all — the hint-reuse cost-saver the spec relies on to
   keep the pipeline cheap does not work here.

5. **Stopped and asked before guessing at scope**, rather than picking an
   arbitrary batch size or silently deciding to full-research every contact.
   Asked Raka two questions:
   - How many contacts for this first pilot run? → **Answered: 25.**
   - Since `domain` is often blank, should the pipeline search for the
     website itself? → **Answered: yes.**

6. **Built a companyId → {name, domain} map** to unblock the 25-contact
   pilot despite the missing-fields gap. `search_companies` has no `id`
   filter, so the only way to resolve a specific `companyId` is to paginate
   the *entire* company list (1677 companies) and match locally:
   - First two pagination calls (`limit=500`, `offset=0` and `offset=500`)
     both exceeded the tool's output token limit and were auto-saved to
     scratch files instead of returned inline.
   - Read those files back with a Python script, merged with a third
     in-line page (`offset=1000` failed the same way, `offset=1500`
     returned inline), and matched all 25 target `companyId`s successfully
     — zero misses.
   - This work (~987 then 1486 companies mapped) is **not wasted** — it's
     saved in the scratchpad and can be reused once Stage 2 is unblocked —
     but it also means real tool budget was spent before the pipeline's
     actual blocker was discovered.

7. **Started real Stage 1/2 research** on contact #1 (Jamie H. / Revive Auto
   Repairs, `reviveautorepairs.co.uk`). `WebSearch` worked normally and
   surfaced real, useful signal (a franchise launch, trade press mentions).
   `WebFetch` on the company's own site failed immediately:
   ```json
   {"error_type":"EGRESS_BLOCKED","domain":"reviveautorepairs.co.uk","message":"Access to reviveautorepairs.co.uk is blocked by the network egress proxy."}
   ```
   Retried with the `www.` variant from the search result — same error.

8. **Ran a control test** to rule out a per-domain block: `WebFetch` against
   `en.wikipedia.org`, a domain with no reason to be blocked. Same error:
   ```json
   {"error_type":"EGRESS_BLOCKED","domain":"en.wikipedia.org","message":"Access to en.wikipedia.org is blocked by the network egress proxy."}
   ```
   This confirmed the block is **categorical and environment-wide**, not
   specific to any one site. Also checked the Bash-level proxy status
   (`curl "$HTTPS_PROXY/__agentproxy/status"`) — that proxy is a separate
   mechanism (governs git/Bash egress) and its `noProxy` allowlist doesn't
   explain the `WebFetch` tool's block either; the two are independent
   restrictions.

9. **Stopped the run entirely** rather than either fabricating website
   observations from `WebSearch` snippets (violates the guardrail against
   fabricating a website observation) or silently reclassifying every
   contact `UNKNOWN`/`MANUAL_REVIEW` without flagging that the check never
   actually happened. Reported the exact error payloads to Raka and asked
   how to proceed.

## Mistakes and shortcomings (self-assessed, not prompted)

- **No pre-flight capability check.** I went three steps deep — pulled 1099
  contacts, built a 25-company id→name/domain map spanning nearly the whole
  company database — before a single `WebFetch` call revealed the pipeline
  couldn't run Stage 2 at all in this environment. A one-line `WebFetch`
  probe at the very start would have surfaced this before any of that work
  was done.
- **Discovered the two capability gaps sequentially, not together.** The
  missing company-data fields (step 4) and the WebFetch block (steps 7–8)
  are both "can this environment actually do what the playbook assumes"
  questions. Both should have been checked in one pass before pulling real
  data.
- **Asked for a batch size (step 5) before confirming Stage 2 was even
  possible.** In hindsight that question was premature — it should have
  come after a capability check, not before.
- **Never verified the environment was actually provisioned the way the
  spec assumes.** The spec repeatedly asserts this pipeline is "fully
  API-driven" and needs a Cloud environment built for that; I ran against
  the live environment without first confirming its network policy matched
  that assumption.
- **Minor tool-usage waste:** used `search_companies` with `limit=500` from
  the start, which blew the per-call token budget twice and forced a
  file-read/Python-merge detour. A smaller page size (e.g. 200) would have
  avoided the truncation entirely.

## What was already fixed / improved during this session

- **Established a capability-check pattern** (probe before commit) even
  though it happened too late in this run — this is now documented as a
  concrete recommendation below, not just a lesson implicitly learned.
- **Confirmed and documented the real shape of lemlist's company data** as
  actually exposed through the available tools, replacing the spec's
  untested assumption with a verified fact (only `id`/`name`/`domain`/
  `crmSyncStatus` are retrievable; no description/founded/industry/location).
- **Built and preserved a reusable companyId → {name, domain} map** for the
  25-contact pilot set, so once Stage 2 is unblocked this doesn't need to be
  redone from scratch.
- **Avoided fabricating any research output.** At every point where real
  data wasn't available (company hints, website content), the run stopped
  and asked rather than inventing a plausible-sounding answer — consistent
  with the guardrail against fabricating launch dates, website observations,
  or company purpose.
- **Did not touch any state file or import any lead** while the pipeline was
  in a degraded/blocked state, so `state/checkpoint.json` and
  `state/enriched_leads.jsonl` remain accurate (empty, because nothing was
  actually processed) rather than silently recording partial or guessed
  results.

## Open items / decisions still needed from Raka

1. Confirm or fix the network egress policy on this Cloud environment so
   `WebFetch` can reach arbitrary external domains, OR explicitly accept a
   reduced-fidelity Stage 2 (search-snippets-only) with the understanding
   that it deviates from the spec, OR explicitly approve a Stage-1-only run
   with everything routed to `MANUAL_REVIEW`.
2. Decide whether the lemlist company-data gap (no description/founded/
   industry/location field ever retrievable) is permanent or a
   configuration issue on the lemlist side worth fixing — this determines
   whether the pipeline should be rewritten to always do full research (no
   hint-reuse discount) as a standing assumption, rather than an occasional
   fallback.

## Recommendations applied to `CLAUDE.md`

See the corresponding edit to the root `CLAUDE.md` in this same commit. In
summary, it now includes:

- A mandatory pre-flight capability check as step 0 of the daily run
  procedure (one `WebFetch` probe, one `search_companies` field check)
  before any contact data is pulled.
- An explicit note on the real (verified) shape of lemlist's company data,
  replacing the spec's untested hint-reuse assumption.
- An explicit environment precondition: this pipeline requires unrestricted
  `WebFetch` egress, checked before every run, not assumed from "it's a
  Cloud Routine."
- Guidance to cap `search_companies` pagination at `limit=200` to avoid
  tool output truncation.
- A rule that a pipeline-wide Stage 2 outage halts the run rather than
  bulk-routing every contact to `MANUAL_REVIEW`, so "couldn't check" is
  never silently recorded as "checked and uncertain."
