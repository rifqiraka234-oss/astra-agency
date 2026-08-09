# Astra Agency — Automated Enrichment Pipeline (Claude Code build spec)

> Source of truth. This is the spec as provided by Raka. `CLAUDE.md` at the repo
> root is the operating playbook derived from it — if the two ever disagree,
> this file wins and `CLAUDE.md` should be corrected to match.

## Purpose
Take a raw contact list (new business sign-ups) and produce the same quality output already proven in `contacts-08-03-2026-enriched-complete.xlsx`, but as a repeatable, unattended, resumable script instead of manual chat-driven research. Output feeds directly into lemlist via its native import tools.

## Input
Do not source new contacts from a manually exported/uploaded CSV or XLSX for the recurring run. That creates a local file dependency, which blocks running this as a Cloud Routine (Anthropic's cloud-hosted scheduled agent runs against a fresh environment each time and cannot read files sitting on Raka's machine). Instead, each run should query lemlist directly via its API for contacts added since the last run (lemlist's contact/lead endpoints support filtering by added date). This keeps the whole pipeline API-driven end to end: pull from lemlist, enrich via web research, write back to lemlist, with no manual export/upload step ever required.

A manually provided CSV or XLSX (matching the "Source Data" sheet shape in the reference file, minimum fields firstName, lastName, companyName, companyWebsite, linkedinUrl) remains a valid input only for one-off manual test runs while building and validating the pipeline, not for the recurring automated run.

## Deployment: Cloud Routine, not local
Build and run this as a Claude Code **Cloud Routine**, not a local/desktop scheduled task. Reasoning specific to this pipeline: it is fully API-driven (lemlist API for contacts and campaign import, web search/fetch for research), it has no dependency on local files once sourced via the API as above, and cloud is the only mode that runs without Raka's machine being on, which is required to actually deliver "I don't need to do anything." Local scheduling would only be the better choice if the pipeline needed local-only files or tools, which it does not.

## Input pre-filter (token saving, do this before any AI call)
The real raw export (e.g. `contacts-08-02-2026.csv`) has 75 columns per contact. Most are empty lemlist internal tracking fields (signal data, campaign history, hubspot IDs) that are never used by this pipeline and should never reach a research or generation call. Before Stage 1 runs, strip every row down to this minimal object:

```
firstName, lastName, companyName, companyWebsite, linkedinUrl, jobTitle,
companyLocation (fallback to location if empty), companyFoundedOn,
companyDescription, companyIndustry
```

That is 11 fields instead of 75, roughly an 85% reduction in per-contact payload before enrichment even starts. Drop the rest at the file-reading step, do not carry them through the pipeline or write them back out.

Two of these kept fields double as a cost saver, not just context, because they are pre-populated by lemlist's own lighter enrichment on most rows (checked against a real batch: `companyFoundedOn` populated on 577/600 rows, `companyDescription` on 588/600):
- `companyFoundedOn` — treat as a starting hypothesis for Stage 1, not a verified fact. When present, do a lighter confirm-or-flag check (does other evidence agree or conflict) instead of a full from-zero search. Still never treat it as HIGH confidence without at least one independent check, lemlist's own auto-enrichment can be wrong.
- `companyDescription` — treat as a starting hypothesis for the company purpose used in Stage 4's opener. When present and it reads as genuine (not templated boilerplate), it can save a research call. Always sanity-check it against the live site rather than quoting it verbatim, it is company-reported, not verified.

This pre-filter and hint-reuse is the main lever for keeping the pipeline cheap at hundreds of rows. Do not skip Stage 1/2 verification entirely just because a hint exists, the hint only reduces how much fresh research is needed, it never replaces the confidence check.

## Per-contact pipeline (the loop)
For each contact, run through these stages. Checkpoint after every contact (write progress to disk / a resumable state file) so a 600-row batch can be interrupted and resumed without repeating work or burning duplicate API calls.

### Stage 1 — Business launch verification
- Search for confirmation of when the business actually started (founder announcement, incorporation date, "we launched" language, LinkedIn company page creation date).
- Output fields: `businessLaunchStatus` (QUALIFIED / UNVERIFIED / DO_NOT_USE), `businessStartDate`, `businessLaunchConfidence` (HIGH/MEDIUM/LOW), `businessLaunchSource`.
- Compute `howLongAgoBusinessWasCreated` using this fallback ladder, so a missing exact month doesn't block automation on its own:
  - **Exact month/date confidently found** → use the precise phrase ("6 months ago", "in March"). `businessLaunchConfidence = HIGH`.
  - **Clear evidence the business is genuinely new/recent (this year, "just launched," a fresh LinkedIn company page, a founder's "I started my own thing" post) but the exact month isn't pinned down** → use `"recently"` instead of guessing a month. `businessLaunchConfidence = MEDIUM`. This is still eligible for Tier 1 auto send, since "recently" makes no specific claim that can be wrong.
  - **No real evidence the business is new at all** → `businessLaunchStatus = DO_NOT_USE`. Do not send a launch congratulations of any kind, vague or specific. This is the only case that still blocks the connection invite, and it should route to manual review rather than being silently dropped.
- Rule: the ladder exists so "I don't know the exact month" and "I don't know if this business is even new" are never treated the same. Only the second one should slow anything down.

### Stage 2 — Website classification
- Visit the actual site (not just search snippets — load real pages).
- Classify into exactly one: NO_WEBSITE, NOT_WORKING, PLACEHOLDER, BASIC, DECENT, STRONG, UNKNOWN.
- Critical rule: if the site can't be accessed (bot-blocked, timeout, JS-only render failure), classify UNKNOWN — never NOT_WORKING. A research-environment access failure is not evidence the site is broken.
- Capture one specific, verified observation of what's actually wrong (not generic — e.g. "template Latin copy still visible on the About page", not "could look more professional"). Store as `verifiedWebsiteObservation`.
- Output fields: `websiteAnalyses` (the classification), `websiteOpportunity` (HIGH/MEDIUM/LOW/NONE), `websiteAnalysisConfidence`, `websiteAnalysisSource`.

### Stage 3 — Eligibility decision
Combine Stage 1 + Stage 2 into `campaignEligibility`:
- **INCLUDE**: launch verified AND site is NO_WEBSITE/PLACEHOLDER/BASIC (a defensible gap exists).
- **MANUAL_REVIEW**: plausible fit but launch date OR website read is uncertain enough to need a human check before sending.
- **EXCLUDE**: wrong entity, not a recent launch, competitor, or already a strong/decent site with no real angle. Set `exclusionReason`.

### Stage 4 — Message generation
Only for `campaignEligibility = INCLUDE`. Generate both messages using these exact templates (do not deviate from structure or tone):

**Connection invite:**
```
Hey [name], congrats on launching [company] [x] months ago, exciting times! I'm a business owner too, would love to connect and share ideas :)
```
- `[x] months ago` is replaced by whatever Stage 1's fallback ladder produced: a precise phrase ("6 months ago") when the month is known, or the word "recently" when the business is confirmed new but the exact month isn't (i.e. `[x] months ago` becomes just `recently`, so the line reads "congrats on launching [company] recently, exciting times!"). Never fabricate a specific month that wasn't actually found.

**First message (STRICT 65-word maximum, enforce as a hard ceiling, count and trim before output):**
```
Hey [name], thanks for connecting. I had a look at [company], and [specific genuine synthesis of what they do, framed as a real strength, not a generic paraphrase].

However, [specific structural problem], so [who is affected] can't easily [what becomes harder as a result].

Our agency sketched [specific named concept] that [what it does]. Want me to send it over?
```
This is an expanded version of the original 50 word template, raised to 65 words based on analysis of a real message that performed well (the Andy Olson / Indigenous Fishers First send). The structural upgrade from the original template: the opener leads with a genuine, specific synthesis rather than a bare "[company purpose]" restatement, and the roast clause now includes who is affected and what becomes harder, not just the flaw itself, this is the "so what" that makes the message feel considered rather than templated. Do not let this become an excuse to write a generic 107 word essay like a first draft might, the ceiling is real and every clause should still earn its place.

- `[specific genuine synthesis]` — one sentence that proves real understanding of the business, framed positively, pulled from actual research not boilerplate.
- `[specific structural problem]` — pulled directly from `verifiedWebsiteObservation`, one specific issue only.
- `[who is affected] / [what becomes harder]` — name the actual person or role who hits friction (a buyer, a funder, a visitor trying to do X) and the concrete decision or action that gets harder as a result. This is the cost of inaction, keep it to one clause.
- `[specific named concept]` — name the actual thing sketched (a project readiness flow, a buyer journey homepage, whatever fits), not "a better version of your site."
- Given the 65-word ceiling with several variable slots: if it doesn't fit, trim the cost-of-inaction clause down to its shortest real form before cutting the opener or the roast, those two carry the most weight.
- Never use hyphens, en dashes, or em dashes (-, –, —) anywhere in either message, in any field feeding into them, or in any generated text that touches a sent message. Rewrite around the dash instead of substituting a comma or colon if it changes meaning. Separate any multi sentence output with clear spacing, not run on clauses.

### Stage 5 — Write results
Append only the fields this pipeline actually generates back to the working file/state, do not carry the original 75 column row through: `firstName`, `companyName`, `businessLaunchStatus`, `businessStartDate`, `businessLaunchConfidence`, `businessLaunchSource`, `howLongAgoBusinessWasCreated`, `websiteAnalyses`, `websiteOpportunity`, `websiteAnalysisConfidence`, `websiteAnalysisSource`, `verifiedWebsiteObservation`, `campaignEligibility`, `exclusionReason`, `connectionMessage`, `firstMessage`, `researchDate`. Keep this write back schema stable and minimal so progress files and lemlist import payloads stay cheap at hundreds of rows, same schema as the reference `Enriched Leads` sheet, minus the noise columns.

## Batch orchestration
This pipeline should be built and deployed as a Claude Code **Routine** (the cloud hosted, scheduled agent feature), not a one off script you run by hand each time. A Routine runs unattended on a schedule without needing your computer on, which is the actual mechanism that makes this "I don't need to do anything." Do not use the lightweight CLI `/schedule` or `/loop` session scoped tasks for this, those are meant for short lived polling and auto expire after 7 days, which would silently stop this pipeline without warning.

Recommended cadence: **once daily**, not hourly or continuous. Reasons: it matches the weekly Tier 2 batch review rhythm below, it keeps LinkedIn sending volume steady and human paced rather than bursty (a real account safety concern for automated LinkedIn outreach), and it gives a natural daily checkpoint for the spot check step.

- Process contacts sequentially or in small parallel batches (respect rate limits on search/fetch).
- Persist a checkpoint (e.g. last completed row index or a per contact status file) so a crashed or interrupted run resumes cleanly rather than reprocessing or duplicating spend.
- Log failures per contact (e.g. site totally unreachable after retries) with reason, rather than silently skipping.
- At the end of a run, produce a summary: total processed, INCLUDE count, MANUAL_REVIEW count, EXCLUDE count, failures.

## Custom field names (critical, must match exactly)
The lemlist campaign sequence references two lead custom fields directly via Liquid syntax:
- `{{connectionMessage}}` — the connection request step
- `{{firstMessage}}` — the first message step (+1 day after acceptance)

Code must write generated message text into custom fields with these EXACT names when importing/updating a lead (`import_leads_to_campaign` / `import_contacts_from_csv` support setting custom fields per row). If the field name doesn't match exactly, the campaign step will send the literal text `{{connectionMessage}}` to a real person instead of their personalized message, so verify this on the first handful of test leads before trusting a full batch.

The third step, the "have you seen this" bump at +3 days, uses lemlist's native `{{firstName}}` field directly in the campaign step itself and needs no custom field or Code involvement.

## Hand-off to lemlist (no custom code needed here)
- Do NOT build custom lemlist integration code. Use lemlist's existing tools directly:
  - `import_contacts_from_csv` / `import_leads_to_campaign` for pushing rows into the target campaign.

### Auto-enrollment tiering (this is what makes the pipeline hands off)
- **Tier 1 — auto-enroll, no review.** `campaignEligibility = INCLUDE` AND `businessLaunchStatus = QUALIFIED` (HIGH or MEDIUM confidence, i.e. either an exact month or a confirmed "recently") AND `websiteAnalysisConfidence = HIGH`. These import straight into the live lemlist campaign and the existing sequence sends the connection invite and first message automatically, same as it already does today. Widening this from HIGH only to HIGH or MEDIUM on launch confidence is safe because the "recently" fallback never states an unverifiable specific claim, this should meaningfully grow the auto send volume.
- **Tier 2 — weekly batch approval.** `businessLaunchStatus = DO_NOT_USE` (no real evidence the business is new at all), `MANUAL_REVIEW` eligibility rows, or LOW website confidence. Accumulate these into a single weekly digest (one list, not per contact prompts) for a single go/no go from Raka, then import the approved batch.
- **EXCLUDE** rows are never imported, automatically or otherwise.
- Rationale for the split: a wrong launch date or a misread website can't be unsent once the connect message goes out, so the confidence signals already being computed in Stage 1/2 double as the automation gate — no extra logic needed, just a threshold on data already produced.

### Standing spot check (doesn't block anything, just quality control)
- Weekly, surface 5 to 10 messages that were actually sent from Tier 1 (not drafts, actual sent output) for a quick skim. This catches drift in roast quality or tone over time before it compounds across hundreds of contacts. No approval required to proceed — informational only.

## Guardrails
- Never use hyphens, en dashes, or em dashes (-, –, —) anywhere in generated messages. This applies globally, not just inside the two templates.
- Never fabricate a launch date, a website observation, or a company purpose — every claim in a generated message must trace back to something actually found in Stage 1 or 2.
- Re-verify before reuse: a batch run more than a couple of weeks old should not be trusted for outreach without re-checking launch status and site state, since both can change.
- No stats, no company reported claims stated as fact — keep the plain language purpose and the roast grounded in what was actually observed.
- This pipeline handles enrichment and message drafting only. It does not send anything — sending stays a separate, human approved step (same as the daily Cowork loop).
