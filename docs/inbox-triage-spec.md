# Astra Agency — Daily Inbox Triage (Claude Code Routine)

> Source of truth for this workflow, adapted from Raka's original
> `Claude_Code_Daily_Inbox_Triage_Spec.md` and rewritten against the concrete
> lemlist MCP tools available in this environment, plus the checkpoint/state
> pattern already proven by `docs/enrichment-pipeline-spec.md`. `CLAUDE.md` at
> the repo root is the operating playbook derived from this file — if the two
> ever disagree, this file wins and `CLAUDE.md` should be corrected to match.

## Purpose
Every day, review every active LinkedIn conversation across all campaigns,
understand the real context of each one, and produce a short digest of who
needs a reply and what to say. Raka reads the digest, approves or edits, and
sends. This routine never drafts a mockup and never sends anything itself, it
only tiers and suggests.

## What changed from the original spec, and why
The original spec's efficiency mechanism was "checkpoint per thread so an
unchanged thread costs nothing," which is correct in principle but under
specified: it didn't say how to *find* the changed threads without paging
through everything. Two concrete tools close that gap:

- **`get_inbox_conversations` takes a `dateFilter`.** Passing
  `dateFilter.from = <last run's timestamp>` returns only conversations with
  activity since then, server side, no local diffing needed. This replaces
  "paginate every page every day and diff against a local checkpoint" with
  "ask lemlist for only what changed." Still paginate fully within that
  filtered result set (a busy day can span more than one page), just not
  across the entire historical backlog every time.
- **`get_inbox_conversation` (singular) returns `aiLeadInterestLevel` /
  `aiLeadInterest` per reply**, lemlist's own sentiment score on the contact's
  latest message. Use this as a *first pass sort*, not a replacement for
  reading the thread: it separates "probably Hot or Warm, read this one
  carefully" from "probably Stalled or No action, skim to confirm" so
  research effort concentrates where it matters. Never tier or draft off the
  score alone, the actual thread text is still the source of truth per the
  guardrails below.

This keeps the original's core promise (a thread with zero change costs
nothing) while making "zero change" a single filtered API call instead of a
full re-page-and-diff every run.

## Coverage requirement (do not skip anyone)
Within the date-filtered result set, paginate through every page, not just
the first. The earlier manual check in this project found only 12 of 108 real
backlog contacts by stopping at page one; that mistake must not repeat here,
date filtering narrows the *set*, it does not excuse skipping pages *within*
it.

Cross check against the full lead list per campaign (`search_campaign_leads`
with `campaignIds`), not just the inbox conversation view, so a contact who
accepted the connection but has zero messages either way still gets
surfaced. Mechanism: call `get_contact_fields_schema` once (cache the result
across the whole run) to find whichever field reflects LinkedIn connection
status, then pull that field via `search_campaign_leads(..., fields: [...])`
for every lead in each active campaign. Any lead flagged as connected whose
contact ID does **not** appear anywhere in this run's inbox conversation pull
is a Silent accepted case, surface it even though it generated no inbox
activity to trigger the date filter.

## Token efficiency mechanism: checkpoint, do not re-read the unchanged
This is the main lever for keeping a daily run cheap, not shorter output
alone.

- Maintain `state/inbox_checkpoint.json`, keyed by campaign, storing
  `lastRunAt` (the timestamp fed into next run's `dateFilter.from`) and a
  `threads` map of `contactId -> { lastSeenMessageId, tier, lastDigestDate }`.
- On each run, call `get_inbox_conversations` with `dateFilter.from` set to
  the previous `lastRunAt` (first run ever: omit the filter and do a full
  pull once to seed the checkpoint). Only threads returned by that call, plus
  any Silent accepted contacts found via the cross check above, get analyzed
  this run.
- A thread absent from both the filtered pull and the Silent accepted cross
  check has not changed: skip it, and carry its `tier` forward unchanged from
  `state/inbox_checkpoint.json` into today's record in
  `state/inbox_digest_log.jsonl` without spending a single tool call re
  reading it.
- Only pull full thread history via `get_inbox_conversation` (not just the
  newest message) the first time a thread is seen, or when reconstructing
  context is genuinely needed to draft a reply. After that, a single call to
  the same tool (it always returns the fullest available page by default,
  paginate with `page` only if the thread is long and older context is
  needed) covering what's new since `lastSeenMessageId` is enough for most
  days.

## Step 1 — Determine reply status per contact
For every contact surfaced this run (from the date filtered inbox pull, or
from the Silent accepted cross check):
- Has the connection been accepted.
- Has there been any reply from the contact, and if so is the most recent
  message theirs (Raka's turn to respond) or Astra's (waiting on them).
- Is this a fresh accept with no message sent yet, an ongoing back and forth,
  a stalled thread that went quiet, or already fully resolved (they
  declined, or the conversation reached a natural close).

## Step 2 — Understand context (only for threads needing a decision)
Read the full thread, not just the latest message, for any contact where it
is currently Raka's turn to respond. Also pull whatever was actually pitched
or sent previously in that thread (the original observation, any concept or
mockup link already sent) so a suggested reply responds to what was really
said, not a generic guess. Do not fabricate context that is not in the
thread; if the history is ambiguous, flag it as needing Raka's own judgment
rather than guessing. Use `aiLeadInterestLevel`/`aiLeadInterest` (when
present) to prioritize which threads to read first, never as a substitute for
reading them.

## Step 3 — Tier
Use this tiering, matched to the manual triage pattern already proven in
this project:

- **Hot** — a clear yes, a direct question, or an explicit next step offered
  by the contact (book a call, send it over, what's the price). These need a
  reply today.
- **Warm** — a genuine but non-committal reply (interested tone, a soft
  question, general engagement) worth a considered response, not urgent.
- **Silent accepted** — accepted the connection, zero reply, first message
  never sent or a long gap since the last outbound touch. Needs an opening
  message, not a reply to something they said. This tier is the ongoing,
  permanent guard against the same 108-contact backlog situation
  reaccumulating in any campaign going forward. Once Raka approves a Silent
  accepted message it gets sent the same way any other approved outreach
  message would (manually, or via whatever explicit send step is in use at
  the time).
- **Stalled** — was an active conversation, has gone quiet for a meaningful
  stretch since Astra's last message. Optional light follow up, not urgent.
- **No action** — already resolved (explicit decline, conversation reached a
  natural close, or it is currently their turn and no reply is needed from
  Raka yet). Do not include these in the digest at all, they add nothing to
  review. Still record the tier in the checkpoint so tomorrow's run can carry
  it forward without re reading the thread.

## Step 4 — Draft the suggested message (always, for any tier where a reply is warranted)
Always include a suggested reply for any contact where one is actually
warranted, this is not optional and not limited to a shortlist of tiers.
Concretely: Hot, Warm, Stalled, and Silent accepted all get one. The only
exception is No Action, where by definition nothing needs a reply (already
declined, already closed, or genuinely still their turn). If it is ever
unclear whether a tier should get a suggested reply, default to drafting
one rather than skipping it silently, since a skipped suggestion reads to
Raka as "nothing to do here," not "not drafted yet."

This applies beyond the daily digest output format below too: any view
built over this inbox data (a one-off dashboard, an ad hoc summary, a
follow-up check) must carry a suggested reply alongside any thread flagged
as needing Raka's attention, not just a record of what the contact said.
Showing what they said without also showing or suggesting what to say back
is half the job.

**Render both sides of the exchange, never one side plus a timestamp
(learned the hard way, 2026-08-15).** A dashboard built over this data had
a column literally labelled "Our last message" that rendered only a time,
never the text, even though the full text was already present in the row's
own data. Raka's own reply to a prospect was completely invisible in a view
whose entire purpose was reviewing that conversation, and he caught it by
comparing against a phone screenshot rather than any self-review catching
it. For any view of a two-sided exchange:

- render **both** sides' actual text by default, labelled clearly (Them /
  Us), not one side's content plus the other side's metadata;
- compute and surface the **"whose turn is it"** signal directly (compare
  the two timestamps, later one wins) rather than making the reader diff
  two dates for every row — this is the single signal a triage view exists
  to provide, and it should generally be the default sort;
- treat "the data was technically present in the page" as no defence: if
  it is not rendered, it does not exist for the person reading it.

- **Name exemption (confirmed by Raka 2026-08-15):** hyphens that are part of a
  real proper noun are exempt from the dash rule. A company's registered name
  (Ad-Wise, Edouard Koehn) or a person's real surname (Witt-Dörring,
  Hurd-Watler) is written correctly, hyphen included. Never misspell someone's
  name to satisfy the guardrail. The rule still applies in full to ordinary
  prose, where a dash must be rewritten around rather than substituted.
- **Write plainly (confirmed by Raka 2026-08-15):** use short, everyday words a
  busy founder reads once and understands. Prefer the simple word over the
  impressive one. No jargon, no consultant register.
- No hyphens, en dashes, or em dashes anywhere, paragraphs separated by clear
  spacing, sound like Raka, not like an automated report. Same guardrail as
  every other message this pipeline produces (see
  `docs/enrichment-pipeline-spec.md` Stage 4).
- For Hot and Warm tiers, the message must actually respond to what the
  contact said, referencing their specific question or comment, not a
  generic template.
- For Silent accepted, use the same opener structure and 65 word ceiling as
  the first message template in the enrichment pipeline spec's Stage 4, only
  if that has genuinely not been sent yet, check the thread first rather
  than assuming. That template requires the same real research per contact
  (a genuine synthesis, a real structural problem, a named concept) that the
  enrichment pipeline does, it is not a lighter-weight version, drafting 40+
  of these is sized as its own batch job, not a same-day digest task. See
  `docs/astra-master-context.md` section 9 for voice and wording, and
  section 13 for prospects with an already-established angle or correction,
  do not re-derive an angle from scratch for someone already in that table.
- Stalled tier gets a short, low pressure optional nudge suggestion, not a
  hard sell. **Confirmed by Raka, 2026-08-18: a nudge must reference the
  specific concept, page, or gap from the original thread** (pull it from
  the actual last outbound message, not from memory), the same way a fresh
  first message would. A generic "checking in" or "have you seen this?"
  with no reference to what was actually pitched is not an acceptable
  nudge, it reads as automated precisely because it says nothing a person
  reading the thread wouldn't already know. Read the full thread before
  drafting a nudge, don't assume the preview text is enough context.

## Step 5 — Surface mockup ready leads separately
Any contact whose reply is a genuine yes to seeing a concept (send it over,
sure, show me, that sounds good) is a handoff to the prototype build
pipeline (`docs/prototype-build-spec.md` and the "Prototype build and
meeting booking" section of `CLAUDE.md`), not something this routine drafts
a reply for on its own. This is the single most valuable signal this triage
produces, it should never get buried inside a generic flagged note.

List these clearly in their own output section, separate from the four
message tiers, with enough of the original ask captured that the downstream
workflow does not have to re read the whole thread to know what was
promised (a homepage redesign, an interactive tool, whatever was actually
offered in that thread).

Separately, if a contact asks a question that would require new research or
a capability Astra does not have ready (pricing specifics, a claim that
needs verification, anything outside what the thread already supports), flag
that too, but keep it distinct from the mockup ready list, these are two
different kinds of follow up work.

## Output format (this is the only thing Raka actually reads)
Return only the tiering and message suggestions, nothing else, no research
narration, no step by step reasoning, no full thread reproduction. One
compact entry per contact needing attention, this section order, most
valuable first:

```
READY FOR A MOCKUP (send to the prototype workflow)
Andy Olson — Indigenous Fishers First
What they asked for: project readiness style tool for fisheries infrastructure
Their reply: "Feel free to send what you have."

HOT (reply needed today)
Sholi Loewenthal — Sense Future
Suggested reply: [message text]

WARM
[name] — [company]
Suggested reply: [message text]

SILENT ACCEPTED (opening message needed)
Erisan Olasheni — [company]
Suggested opener: [message text]

STALLED
[name] — [company]
Suggested nudge: [message text]

NEEDS RESEARCH (question outside what the thread supports, not draftable here)
[name] — [company] — [one line reason]
```

Contacts in the No action tier are not listed at all. If nothing needs
attention on a given day, the digest should say so in one line, not an empty
template.

## Guardrails
- Never use hyphens, en dashes, or em dashes anywhere in generated messages.
- Never fabricate what a contact said or what was previously sent, ground
  every suggested reply in the actual thread.
- Never draft a message promising a mockup or concept that does not exist
  yet, route it to the Ready for a mockup section instead.
- Never send anything. This routine only produces the digest, Raka approves
  and sends manually or via a separate explicit send step.
- Never tier or draft a reply off `aiLeadInterestLevel` alone; it is a
  prioritization hint for where to spend reading effort, not evidence.

## Deployment
Run as a Claude Code Cloud Routine, once daily, same reasoning as the
enrichment pipeline: fully API driven, needs no local files, and the
checkpoint file keeps each day's run cheap regardless of how large the total
conversation volume grows over time.
