# Astra Agency — Operating playbook

This repo drives three related automated routines:

1. The **contact enrichment pipeline**, described in
   `docs/enrichment-pipeline-spec.md`.
2. The **daily inbox triage**, described in `docs/inbox-triage-spec.md`.
3. The **prototype build and meeting booking pipeline**, described in
   `docs/prototype-build-spec.md` (the research and build quality bar) and
   the "Prototype build and meeting booking" section of this file below (the
   handoff, hosting, retry, and meeting/briefing mechanics).

All three specs are source of truth — read the relevant one in full before
running anything; this file is the concrete, repo-specific operating
procedure derived from them. They share the same message guardrails (no
dashes in outreach text, never fabricate) and the same git-committed
state-file pattern, since all three run as stateless Cloud Routine
containers.

Every word any of these routines sends or ships (LinkedIn messages, email,
prototype copy, meeting briefs, and the digests handed back to Raka) must
also follow **`docs/writing-standard-anti-ai.md`** — the standard for writing
like a competent person instead of like an AI assistant. Read it before
drafting anything external. It bans the validation tics, honesty theatre,
"not X but Y" structures, forced triads, corporate fog, and em dashes that
give AI writing away, and it sits alongside the existing no-dash and
no-fabrication rules.

**Draft before send, always, no exceptions (non negotiable).** In any
interactive session where Raka is in the loop, every outward message (LinkedIn
opener, reply, nudge, prototype send, email) is drafted and shown to Raka
first, and only sent after he explicitly says to send. A send is outward and
irreversible, so it needs his word every single time. Treat editing
instructions as edits, not authorisation: "make it English", "less cheesy",
"drop that phrase", "shorter" all mean redraft and show again, they do NOT
mean send. Batch approvals do not roll forward either, a "send these" covers
that batch only, not the next one. When in doubt, show the draft and wait. Do
not let momentum, a small edit, or an obvious next step talk you into sending
without an explicit go. (Logged 2026-09-05 after sending a batch off the
instruction "all in English", which was a language edit, not a send.)

The order is always **research first, diagnose second, sell third.** Before
diagnosing any lead, research it to the standard in
**`docs/astra-prospect-research-master.md`** — the canonical prospect-research
manual. It defines the source tiers (A primary through G search snippets), the
five-plus evidence lenses (site, company LinkedIn, founder activity, news/
change events, jobs, customer voice, records, tech, competitors), the
verified-fact vs company-claim vs observed-UX vs inference vs hypothesis
classification, the growth-evidence stack, the contradiction search, and the
confidence outcomes (`HIGH_CONFIDENCE_ANGLE` down to `NO_STRONG_ANGLE`). Do not
choose a final angle until its Minimum Research Stop Conditions are answered,
and never infer a problem from a single weak signal.

Before choosing what to pitch a given lead, read
**`docs/astra-commercial-angle-master.md`** — the canonical commercial
reasoning playbook. It is the layer between prospect research and the message,
and it governs angle selection for outreach openers, reply drafting, and
prototype decisions. Diagnose the business bottleneck first, generate two to
five candidate angles, score and red-team them, and pick the strongest, or
return `NO_STRONG_ANGLE` when the evidence does not justify one. Do not start
from a service and hunt for a reason to sell it, and never manufacture pain.
The angle library (G/O/I/B patterns), the evidence to problem to angle chain,
and the no-strong-angle rule live there.

Before drafting any outreach message in either routine, also read
**`docs/astra-master-context.md`** — the business identity, ideal client
profile, service lines (Grow / Optimise / Innovate / Build Squad), pricing
framework, voice and writing rules, and named-prospect history behind every
message this repo sends. It is the source of truth for *how* to write a
message and *which ASTRA service actually fits a given lead*; the two specs
above are the source of truth for the mechanical pipeline that gets a
message written and sent. If the master context and a spec ever disagree on
wording or a number, a live correction from Raka in the current conversation
outranks both (see the truth hierarchy at the top of that doc).

You are reading this either because a human started an interactive session
in this repo, or because a Cloud Routine fired a fresh session with no other
context. Everything you need is below and in the three docs above.

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
- `state/silent_accepted_queue.jsonl` — the Silent accepted backlog queue,
  one row per lead still awaiting a genuine opener. Current schema (as
  actually written, 2026-08-18): `name`, `companyName`, `leadId`,
  `campaignId`, `acceptedDate`, `lastActivityAt`, `source`, `needsLookup`,
  `openerDrafted`, `openerText`, `openerSentAt`, `research`, `status`.
  - `status` is the working state of each row and is the field to filter
    on: `UNRESEARCHED` (default), `SENT`, `NO_STRONG_ANGLE` (a real
    business with no honest angle, see Guardrails), `BLOCKED_NEEDS_INFO`
    (dead domain, wrong-company domain, or content unreadable), or
    `DO_NOT_CONTACT` (company shut down or otherwise off-limits).
  - `research` is the evidence trail: what was actually fetched and
    verified, and for a blocked row, exactly why it is blocked, so no
    future session re-probes the same dead end. Write it in full sentences,
    it is the only thing preventing repeated wasted work.
  - **Resolving a `needsLookup: true` row (name only, no id).** Do not
    paginate `search_campaign_leads` hunting for the name, that is roughly
    six 100-lead pages of context per campaign and the newest page is all
    recent imports rather than the accepted backlog. Instead call
    `get_inbox_conversations` with `listId: "sentOnly"` and
    `search: "<full name>"`. One small response returns `contactId` and
    `contactLinkedinUrl`, and `lastRepliedAt: null` alongside a
    `lastSentMessagePreview` that is still the connection note is direct
    proof the row really is Silent accepted rather than Stalled. `contactId`
    is also what `send_message` needs, so `leadId` is never required. Write
    back `contactId`, `linkedinUrl`, `inviteNoteSentAt`,
    `verifiedSilentAccepted: true`, and clear `needsLookup`.
  - Company name is usually absent on these rows. Recover it by web
    searching the person's name plus an ownership word in their own
    language (`oprichter` / `eigenaar` / `zaakvoerder` / `Gründer` /
    `founder`). If that returns nothing conclusive, or returns several
    unrelated people with the same name, the row is `NO_STRONG_ANGLE` with
    the ambiguity written into `research`. Never guess which business is
    theirs.
  Confirmed 2026-08-11: v0.1
  has no automated second-touch step, so this queue only shrinks when
  someone actually drafts and sends an opener, it will not resolve itself.
  A full 513-lead scan is expensive (11 `search_campaign_leads` calls with
  `include: ["activities"]`); do not repeat it daily. Re scan only when the
  queue needs refreshing (e.g. weekly, or after a batch of openers has been
  sent), and in between just note new accepts surfaced incidentally by the
  regular daily pull.
  - **Working batch size (confirmed by Raka, 2026-08-17):** research and
    send in batches of roughly 10 per session, real per-contact site
    research every time, no shortcuts. "Accurate and strong" beats volume;
    a smaller batch of verified sends is the standing instruction, not an
    exception.
  - **Wrong-domain trap, hit repeatedly, always verify by content:** a
    plausible guessed domain, or even a domain reported by a search result
    or a directory listing, regularly resolves to a real but *different*
    company that happens to share the name (confirmed cases: `prevent.de`
    redirects to an unrelated `ias-gruppe.de`; `thesalesacademy.nl` is
    "Salespiration" by a different founder; `mapler.com` serves an
    unrelated luxury hospitality brand, not Mapler AIx Inc). Never draft an
    opener from a domain guess or a search snippet alone, fetch it and
    confirm the actual page content names the right company/founder/
    product before using anything from it. If the fetched content doesn't
    match, or multiple unrelated companies share the name, mark
    `BLOCKED_NEEDS_INFO` with the reason and move on rather than guessing.
  - **Don't manufacture a problem for a genuinely strong site.** Not every
    accepted lead has a defensible angle. When research turns up a company
    with real named testimonials, real client logos, and no obvious gap
    (confirmed cases: NOMW Health, dotega, Snorly, Handsome Frank, Omnilabs),
    mark `NO_STRONG_ANGLE` rather than stretching a minor or invented friction
    into a pitch. A forced angle on a strong business reads as either
    wrong or insulting, neither books a meeting.
  - **But "strong on content" is not "strong site", so see it before you
    hold it (2026-09-03).** A content-only read (named clients, real
    testimonials) misses two real angles a screenshot catches: a site strong
    on substance but shipped on a decade-old theme (D&Z Domotica ran a ~2013
    ThemeForest theme with old Twitter/Google-Buzz icons, so the wrapper
    undersold 30 years of premium work), and a site whose homepage buries the
    work under copy (Raven Photography opened with two pricing paragraphs
    above the award-winning photos). Both were previously parked as
    `NO_STRONG_ANGLE`/blocked and both were real sends once actually looked at.
    Roast the visual era first (see the inbox triage spec's visual-era rule):
    curl the HTML to read the theme/generator/fonts, and screenshot anything
    that might be dated or thin before writing it off.
  - **Check the queue before researching or sending any lead (2026-09-03).**
    Before working a lead, grep `state/silent_accepted_queue.jsonl` (and
    `state/enriched_leads.jsonl`) for its name, company and `leadId`. If a
    prior session already reached a verdict, respect it or override it
    explicitly with new evidence, never research blind and silently contradict
    it. This session sent two leads (Chris/ExpoCall, Fleur/DCCI) that an
    earlier row had already marked `NO_STRONG_ANGLE`/skip, and re-derived
    OKOJU wrongly (called a DTC cookware brand a "consultant"), purely because
    the queue was not read first.
  - **Queue hygiene: the latest row per `leadId` is authoritative.** The file
    is append only. When you re-work a lead, append a row whose `research`
    note begins `SUPERSEDES prior <status>` with the reason, so the change is
    legible to the next session, and periodically dedup so stale contradictory
    rows do not mislead. The current verdict for any lead is its most recent
    row, not its first.
  - **A fetch failure is UNKNOWN and retryable, never "no angle."** A
    403 / 503 / JS-only shell / stuck redirect / Cloudflare wall means our
    fetcher could not read the page, not that the site is thin or absent.
    Retry with the render pipeline (curl-mirror the HTML and assets, then
    screenshot the local copy offline in Chromium, because the agent proxy
    resets live Chromium tunnels to most hosts). If every tool is walled
    (Cloudflare "Just a moment"), ask Raka to open it and screenshot it.
    D&Z, PolyML, Vimi Vino and Raven were all unblocked exactly this way.
  - **A live domain can still be "no real website" = a full build
    opportunity.** An expired SSL certificate (browsers show a full security
    block), a logo-only splash, or an "under construction" placeholder means
    visitors effectively see nothing. That is a build pitch, not a blocker.
    (Vimi Vino: just the logo on a dark square, plus an expired cert.)
  - **Anti-pattern 8 has a credibility exception.** For deep-tech and
    enterprise, the website is not the closing channel (deals come through BD
    and partnerships), but it IS the diligence and credibility surface an
    investor or strategic partner checks. A thin, abstract or dated site there
    is a real angle, framed as credibility, never as conversion. (PolyML took
    strategic industrial investment yet its homepage is abstract with stock
    photos and zero proof, so a partner doing diligence sees a research concept.)
  - **"No reply at all" is a separate bucket from Silent accepted, don't
    conflate them.** Silent accepted means the connection was accepted and
    zero real message was ever sent. A contact who *did* receive a real,
    researched first message and simply never replied is the Stalled tier
    (see the inbox triage spec's Step 3), not Silent accepted, even though
    both show up in lemlist's `sentOnly` inbox list alongside everyone
    whose connection invite hasn't even been accepted yet. Before drafting
    anything from the `sentOnly` list, pull the full thread per contact
    and only nudge the ones where a real, personalised pitch (not just the
    generic connect note) was actually sent, ideally 2 to 4 weeks ago with
    zero response since. A nudge for this bucket must reference the
    specific concept or gap from that original message, per the inbox
    triage spec's Step 4 stalled-nudge rule, never a generic "checking in."
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

## Prototype build and meeting booking

Full spec: `docs/prototype-build-spec.md` for the research/build quality bar
(read it in full before building anything). This section is the mechanics
around that spec: what triggers a build, how it gets hosted and sent, what
happens on a yes or a no, and how a booked meeting turns into a brief for
Raka. The end goal of every reply, prototype or not, is a booked meeting,
not just a good conversation.

### Live configuration

- **Hosting:** Netlify. Every prototype gets its own site, named
  `astra-[company-slug]-prototype` (lowercase, spaces to hyphens, strip
  anything that isn't alphanumeric or a hyphen), never a generic or
  auto-generated Netlify subdomain. Hyphens in this slug are a URL
  separator, not outreach prose, they are not covered by the no-dash
  guardrail. Confirm the actual deployed URL before sending it to anyone,
  concretely: fetch the live URL and check its byte size and a content
  hash (`sha256sum`) against the exact file that was deployed, and confirm
  the `<title>` matches, don't just eyeball that "a page loaded."
  - **The Netlify connector is not always available in this session type**
    (`enabledInChat: false`, no CLI, no token in the container, confirmed
    repeatedly). When that's the case, do not fabricate a placeholder URL
    or silently skip hosting: finish and QA the HTML, commit it into the
    repo (`state/prototypes/[company]/`, force-added past the working
    artifact `.gitignore` rule, see State files below), and hand off to a
    Netlify-enabled session with a self-contained prompt containing: the
    exact repo, branch, and file path; the file's byte size and content
    hash so the other session can verify it has the right file; the exact
    site name to create (`astra-[slug]-prototype`); explicit instructions
    not to edit the HTML; and a note that `state/prototypes/` is
    `.gitignore`d but these specific files are force-tracked, so a fresh
    clone will still contain them despite the ignore rule. Never send the
    live link to the lead yourself from a handoff session, that stays with
    whoever is actually driving outreach.
- **Meeting booking:** Google Calendar. Once a contact proposes or accepts a
  time (directly, or via a Calendly-style link they shared), create the
  event so it is on Raka's actual calendar, don't just reply with words and
  leave it unscheduled. Invite the contact's email if one is known from
  lemlist lead data; if only a LinkedIn identity is known, note that in the
  event description rather than guessing an email.
- **Meeting brief target:** email to `rifqiraka234@gmail.com` (Gmail), sent
  the moment a meeting is actually booked, not before. The same brief is
  also saved into this repo, see state files below, email and repo copy are
  both required, neither replaces the other.

### State files

- `state/prototypes.jsonl` — one row per prototype built (append only):
  `date`, `contactId`, `companyName`, `promisedConcept` (what was actually
  offered in the outreach thread, per the spec's Step 1), `angleNumber`
  (1 for the first attempt, 2+ for a retry after a decline, never reuse an
  angle number for a genuinely different angle), `netlifyUrl`,
  `researchSummaryPath`, `sentAt`, `outcome`
  (`pending` / `liked` / `declined` / `booked`). Update `outcome` in place
  as the thread progresses, this is the per-contact prototype history, so a
  retry after a decline can see exactly what angle already failed and must
  not repeat it.
- `state/meetings.jsonl` — one row per booked meeting (append only): `date`,
  `contactId`, `companyName`, `angleUsed` (prototype angle, or a plain
  description if no prototype was involved), `meetingDateTime`,
  `calendarEventId`, `briefEmailSentAt`, `briefFilePath`.
- `logs/meetings/YYYY-MM-DD-[Company].md` — the actual brief saved in the
  repo for every booked meeting, same content as the email. Never skip the
  repo copy even though the email also goes out, the repo copy is what
  survives if the email bounces or Raka is checking from a session instead
  of his inbox.
- Prototype HTML files and research summaries themselves are not committed
  to this repo, they live on Netlify and can be regenerated from
  `state/prototypes.jsonl` plus the spec if ever needed. Keep the repo to
  metadata and the meeting briefs, the same minimal-schema principle as the
  other two routines.

### Procedure

1. **Trigger.** Either a "Ready for a mockup" entry from that day's inbox
   triage digest, or a direct request from Raka naming a company.
2. **Build.** Follow `docs/prototype-build-spec.md` Steps 1 through 9 in
   full. Check `state/prototypes.jsonl` first for this contact, if an
   earlier attempt exists, the new angle must be genuinely different, not a
   reskin of the declined one.
3. **Host.** Deploy the single HTML file to a new Netlify site named per the
   convention above. Confirm the live URL actually loads and renders
   correctly (desktop and mobile) before sending it anywhere, do not send an
   unverified link.
4. **Send.** The message that links to the prototype still follows the
   outreach voice rules in `docs/astra-master-context.md` section 9 and the
   no-dash guardrail, low friction, references what was actually promised,
   includes the link. Append a row to `state/prototypes.jsonl` with
   `outcome: pending`.
5. **On a positive reply** (they like it, ask questions, want to talk):
   steer toward booking a time, offering a concrete next step rather than an
   open-ended "let me know your thoughts." Update `outcome` to `liked`. If
   they propose or accept a time, book it via Google Calendar immediately,
   don't leave a confirmed time unscheduled, then go to step 7.
6. **On a decline or no real engagement:** update `outcome` to `declined`,
   go back to Step 1 of the prototype spec and find a genuinely different
   angle for the same company, or a different ASTRA service line entirely
   (Grow / Optimise / Innovate / Build Squad, see
   `docs/astra-master-context.md` section 4) if the original angle was
   simply the wrong fit. Do not retry the identical concept hoping for a
   different result. If two distinct angles have both failed, this becomes
   a judgment call for Raka rather than a third automatic attempt, flag it
   in the next inbox triage digest instead of building again unprompted.
7. **On any booked meeting** (prototype-driven or not, a Hot/Warm reply that
   turns into a call counts too): create the Calendar event if not already
   done, then immediately:
   - Compose a short brief: who they are (name, company, one line on the
     business), the angle used (the prototype concept, or the conversation
     thread that led here), what was actually sent to them (the outreach
     message and/or prototype link), and the meeting date/time.
   - Send that brief by email to `rifqiraka234@gmail.com`.
   - Save the identical brief to `logs/meetings/YYYY-MM-DD-[Company].md`.
   - Append the row to `state/meetings.jsonl`.
   - Commit and push the state/log changes with a plain commit message like
     `prototype-pipeline: meeting booked with [Company], YYYY-MM-DD`.

### Guardrails

Everything in `docs/prototype-build-spec.md`'s own Guardrails section, plus:
never show a real person's photograph next to a name without verifying they
are the same person, mechanically, via `tools/verify_portraits.py` (pairing by
card containment on the client's own page, plus a byte match against what is
embedded in the built file); an unverifiable portrait is removed or replaced
with a designed treatment, never shipped on the assumption it is probably
right; never caption or alt-text a photograph as depicting the client's
premises, staff, customers, or product in use unless the client themselves
makes that claim about that image;
never send a Netlify link that hasn't been opened and visually checked;
never reuse a declined angle on a retry; never invent a meeting time or mark
one as booked without an actual Calendar event backing it; never skip the
repo copy of a meeting brief even when the email send succeeds.
