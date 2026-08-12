# Session retrospective — 2026-08-10 through 2026-08-12

Detailed record of what happened across the first three days of running the
enrichment pipeline: what was built, what went wrong, what was fixed (both
Raka directed and self initiated), and open recommendations. This is a
point in time log, not a living doc — `CLAUDE.md` is the living operating
playbook this retrospective feeds into.

## Timeline of work

### 2026-08-10 — first run ever
- Checkpoint started empty. Processed 50 contacts from `New Businesses`.
- Discovered there is no lemlist company record lookup endpoint
  (`search_companies` only returns id/name/domain/crmSyncStatus, no
  `GET /companies/{id}`). Worked around this by using each contact's own
  `GET /contacts/{id}` record (`summary`/`tagline`/`jobDescription`) plus
  independent web research instead.
- Result: 1 INCLUDE, 7 MANUAL_REVIEW, 42 EXCLUDE, 0 Tier 1 imports. Every
  contact with a verifiably recent launch already had a strong, fully built
  website, so nothing cleared the Tier 1 bar.

### 2026-08-11 — rule changes and volume
- Raka changed the Tier 2 rule mid session: Tier 2 rows that resolve to a
  confident `INCLUDE` now import immediately instead of waiting for the
  weekly digest. Rows that stay MANUAL_REVIEW/DO_NOT_USE still wait and
  still get no drafted message.
- Adopted "always try to find a way": before parking a contact in
  MANUAL_REVIEW, spend 2 to 3 more targeted searches (company registries,
  other social presence, direct domain guesses) rather than giving up
  after one search. `NO_WEBSITE` reclassified as a good, actionable
  finding rather than a research dead end.
- Raka asked to reflect on efficiency and update the playbook accordingly.
  Added the "Efficiency playbook" section: cap research per contact, batch
  tool calls aggressively, commit per batch not per contact, and — the
  biggest change — a standing rule to reply with a compact markdown table
  only (Name, Company, Research finding, Outcome, Tier, Connection
  message, First message) and no prose narration for routine batch work.
- Raka revealed the source list itself is pre filtered to companies
  created in 2026. This meant Stage 1 (launch verification) had been
  redundant research for most of the run — list membership alone is
  Stage 1 evidence. Rewrote "Live configuration" to default every contact
  to `QUALIFIED` / MEDIUM confidence / "recently" unless something
  specifically contradicts it, and reoriented the research budget almost
  entirely onto Stage 2 (website check).
- Went back and re researched 13 contacts from the prior batch whose
  EXCLUDE reasoning had been "no recency signal found" — reasoning that
  became moot once the prefilter was known. 3 resolved to genuine
  NO_WEBSITE INCLUDEs and were imported (TRIXEA, Studio Piero, La Maison
  du Detailing); 7 stayed EXCLUDE with corrected reasoning (site already
  strong/decent, not a recency problem).

### 2026-08-12 — pagination bug and message quality
- Verified the 3 newly imported leads rendered correctly in lemlist
  (`connectionMessage`/`firstMessage` show real text, not
  `{{placeholder}}` syntax).
- Persisted the corrected batch to `enriched_leads.jsonl`, committed and
  pushed.
- Pulled the next batch and discovered `search_contacts` pagination
  overlaps unpredictably against this list — successive offset windows
  return many already seen IDs, not a clean next slice. Had to dedupe
  fetched IDs against `checkpoint.json` by ID rather than trust offset
  math, to find the actual new contacts.
- Mid research on that new batch, Raka flagged that the drafted messages
  read as AI written — specifically a tongue twisty compound opening
  sentence style ("Building Studio Piero as a sibling duo around brand
  strategy and art direction, treating identity like something that's
  cultivated not just designed, is a nice angle.") instead of a plain,
  direct observation. Also flagged the messages should center the
  contact's problem and entice a yes, not center our observation about
  them.
- Added a "Message style" section to `CLAUDE.md`: plain observation
  openers, problem centered framing, a list of AI tells to avoid, and a
  before/after example.

## What Raka explicitly told me to change

- Tier 2/INCLUDE should auto import immediately instead of waiting for
  the weekly digest (2026-08-11).
- Always try harder before parking something in MANUAL_REVIEW; NO_WEBSITE
  is a good outcome, not a failure (2026-08-11).
- Mirror `tier2_queue.jsonl` as a human readable `tier2_queue.md` (2026-08-11).
- Never reply with prose unless something needs Raka's input; routine
  batch results go in a compact table only (2026-08-11).
- The source list is pre filtered to 2026 created companies; update the
  playbook and stop treating Stage 1 as a research bottleneck (2026-08-11).
- Messages must not sound AI written: no tongue twisty compound openers,
  say what was observed plainly, and center the contact's problem with an
  enticing, low pressure ask (2026-08-12).

## What I changed on my own initiative (not directly instructed)

- Documented the missing company lookup endpoint workaround so future
  sessions do not waste a call rediscovering it (2026-08-10).
- Added the specific list of legitimate reasons to stay at MANUAL_REVIEW
  (genuinely undisclosed facts, pre commercial ventures, real conflicts in
  evidence) so "always try to find a way" does not turn into fabricating
  claims just to avoid the queue.
- Added the "batch tool calls aggressively" and "commit per batch not per
  contact" efficiency notes after noticing sequential, one at a time
  processing was slow.
- When retrying blocked `import_leads_to_campaign` calls after the auto
  mode safety classifier stopped them, explained the block transparently
  to Raka each time rather than silently working around it with a
  different tool or approach.

## Mistakes and shortcomings

1. **The AI sounding message problem existed in every batch drafted this
   session, including leads already imported.** I did not catch this
   myself; Raka had to point it out on 2026-08-12. The fix is now
   documented for future drafts, but it does not retroactively fix
   messages already sitting on imported leads (see recommendation 6
   below).
2. **Pagination/dedup blind spot.** I did not realize `search_contacts`
   offsets overlap unpredictably on this list until 2026-08-12, three
   days into the run. Earlier batches likely repeated some fetch work
   without me noticing, burning calls.
3. **Import before persist sequencing.** The working pattern all session
   has been: draft messages, build CSV, import to campaign, and only
   afterward update `enriched_leads.jsonl` and commit. If a crash happens
   between those two steps, a lead is live in lemlist but unrecorded in
   the audit trail. Never actually happened, but it is backwards from a
   resilience standpoint.
4. **Word count overruns.** Several early firstMessage drafts exceeded the
   65 word cap (up to 79 words) and needed rework, checked ad hoc with a
   one off Python script each time rather than a standardized step.
5. **Talked too much early on.** Before the 2026-08-11 table only rule,
   batch results were narrated in prose, which is exactly what prompted
   Raka to set that rule.
6. **Classifier blocks cost turns.** `import_leads_to_campaign` was
   blocked twice by the auto mode safety classifier on same turn
   MANUAL_REVIEW to INCLUDE batches. Handled correctly (explained, then
   plain retried, no workaround) but this is a recurring pattern worth
   anticipating rather than re discovering each time.

## Open recommendations

These are proposed, not yet all applied — see "Applied to CLAUDE.md"
below for which ones were folded into the playbook on 2026-08-12.

1. Document the pagination/dedup behavior so it is not re discovered on
   a future container spin up.
2. Make the word count + dash check a required procedural step, not an
   ad hoc script written fresh each time.
3. Flip import sequencing: write the row to `enriched_leads.jsonl` with
   `importedToCampaign: pending` before calling
   `import_leads_to_campaign`, then flip to `true` after success.
4. Expand the message style section with 2 to 3 more before/after
   examples beyond the single Studio Piero one, so the rule is harder to
   drift from over many future sessions.
5. Add an explicit carve out on the table only reporting rule: it applies
   to routine batch results, not to meta or reflective conversations like
   this retrospective, rule changes, or genuine blockers.
6. Flag that messages drafted before 2026-08-12 predate the message style
   fix and may read as AI written; worth a pass to reword before the 3
   already imported leads (TRIXEA, Studio Piero, La Maison du Detailing)
   actually send, since the campaign is still in draft status and nothing
   has gone out yet.
