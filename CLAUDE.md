# Astra Agency — Operating playbook

> **START HERE, and do these two things before anything else.**
>
> 1. **`python3 tools/preflight.py`.** It prints what is actually open right now, read
>    from disk rather than from memory, and the three rules that get broken most.
> 2. **Read `docs/RULES.md` in full.** It is one page, it is the only doc that has to be
>    read in full every session, and **it outranks every other document here including
>    this one.** Where a number or a ban in this file disagrees with it, RULES.md wins.
>
> This file is the operating procedure and the corrections history behind those rules.
> It is reference. Open the section you need, do not read it end to end.
>
> **The first message to any lead is Raka's opener template, filled EXACTLY (2026-09-22).**
> Fixed wording, only the brackets change. The spec, the eleven inputs it needs and the
> rules for every slot are in **`docs/opener-template.md`**. Read it before any opener.
> Section 3A is how the current goal is inferred from linked clues, and **section 3B is what
> the first run of it taught (2026-09-23)**, where new leads come from, the eighth clue
> source, checking the site where the goal lives, and how a whole site absence is earned.
>
> **The two tools that enforce rather than remind.** `node tools/site-audit.js <url>
> <tag>` runs a positive control on itself and voids its own absence findings when the
> detector fails. `python3 tools/check-drafts.py <file>` exits non zero, so it cannot be
> run and quietly ignored.

> **ALWAYS 3x CHECK EVERYTHING (Raka, 2026-09-21, said three times).** This is the
> first rule and it outranks every other line in this file. Before anything is sent,
> shipped, or reported back to Raka as true, run the three checks in **TRIPLE CHECK
> EVERYTHING** below. They are three different actions, never three readings. Reopen
> the source. Actively try to prove the claim false. Confirm it a second way that does
> not share a failure mode with the first. **Being lazy is prohibited**, so if a tool,
> an API call or a fetch can settle a question, it settles it, and the number of calls
> is never a reason to skip one. My own notes, state files and memory are a candidate
> list, never proof.
>
> **The three Raka named, because these are the ones that have cost us leads.** Pull the
> lemlist thread with `get_inbox_conversation` per contact, before research, before
> drafting and again before sending. Read the lemlist contact record rather than
> rebuilding the person from a name. Fetch, render and actually look at the website
> rather than working off a search snippet. Full procedure and the exact calls are in
> **The three places laziness actually happens** below.
>
> **No abbreviated version of any procedure in this file exists.** The judgement about
> when a shortcut is safe gets made with exactly the degraded context that causes the
> error, so the procedure runs in full every time, especially the parts that feel
> redundant. Nothing crosses a context compaction without being reopened, because a
> summary carries conclusions with their evidence stripped off and they feel identical
> to verified facts.

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

**Mandatory, no exceptions: `docs/NO-AI-SLOP.md`.** Every generated word
(outreach openers, replies, nudges, email, prototype and website copy, deck
copy, proposals, UI microcopy, and the digests handed back to Raka) must pass
the NO-AI-SLOP standard before it is shown or sent: the banned words, the
banned phrases, the banned sentence structures, the Claude-specific structural
tells (distributed hedging, the three-part default, metered sentence length,
paired adjectives, uncontracted verbs), the formatting bans, and the section 7
self-check. Run the section 8 grep over any HTML we ship. Core test: if a
sentence would read the same on 10,000 other companies' sites, cut it and write
the specific version. Where NO-AI-SLOP and Raka's live corrections differ,
Raka's stricter rule wins, so the total ban on the colon character and on every
dash (from `writing-standard-anti-ai.md`) overrides NO-AI-SLOP's "colons only
for lists." Read `docs/NO-AI-SLOP.md` in full alongside
`docs/writing-standard-anti-ai.md` before drafting anything external.

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

## TRIPLE CHECK EVERYTHING. The rule above every other rule (Raka, 2026-09-21, his capitals)

His words, "can you PLEAASE NEVER EVER MAKE ANY MISTAKES. UPDATE YOUR MD TO TRIPLE
CHECK EVERY SINGLE THING." This section outranks everything below it. Read it at the
start of every session and run it before every send, every audit and every answer.

**The one pattern behind every single error of 2026-09-21, and there were nine.** Not
one of them was carelessness in the moment. Every one was **trusting my own earlier
output instead of going back to the thing it came from.** A research note from an hour
ago, a regex result, a queue file I wrote myself, a tool's summary, a memory of a page.
Each felt like a fact and none of them was one.

| What was trusted | What it actually was | What it cost |
|---|---|---|
| A body height and a text length | Three tools all measuring the wrong thing | Told Niklas Hanf his own 10 question assessment was an empty page |
| `state/silent_accepted_queue.jsonl` | A file that does not cover July and August | 11 people pitched twice in one morning |
| My own regex for policy links | A pattern that did not match `/policies/` | Nearly told L'MANE they had no privacy pages when all four load |
| A company's listed name | Marketing, not an address list | "Three addresses" when Ciaccia Levi run two |
| A memory of a homepage | A memory | "The site embeds none of the 52 videos" when CoLean embeds one |
| A nav item's label | Not its href | Nearly told Red Rabbit a working button was broken |
| One failed curl | One failed curl | Nearly called the live, modern nextfood.ai dead |
| One `type=linkedinSent` bulk pull | An endpoint that under reports | A false all clear on the duplicate audit |
| `len(msg) > 200` as a filter | Dropped every record with an omitted body | A second false all clear on the same audit |
| A top line in a set of accounts | A label over a breakdown I never opened | Told a charity CEO her own accounts, wrong, and she corrected us |
| `check-drafts.py` without reading its own docstring | A tool with a `--replies` flag I never passed | Overrode shape gates by hand all session when a flag already existed |

### The three checks, and they are three different ACTIONS, not three readings

Reading the same draft three times is not triple checking, it is one check repeated.
Each pass has to attack the claim from a different direction or it adds nothing.

**Check 1, the source.** Open the thing again. The actual URL, the actual page, the
actual thread, the actual file. Not the note about it, not the audit summary, not what
you remember. Every sentence in the draft gets a named source you reopened on this pass.
If you cannot name it, the sentence is a memory and it is deleted.

**Check 2, the opposite.** Go and try to prove the claim FALSE. This is the one that
gets skipped, and it is the only one that has ever caught anything. Open the page that
would disprove it, in the site's own language, using the words that site would use. Open
the href, not the label. Recount the number on the page it came from. Click the gate you
did not click. Search their own HTML for the thing you say is missing.

**Check 3, the independent source.** Confirm it a second way that does not share a
failure mode with the first. A screenshot against a grep. A thread pull against a state
file. A control host against a fetch failure. An Impressum against what lemlist has.
**If both checks come from the same tool, that is one check, not two.**

### The ranking of evidence, and never skip a rung upwards

1. **The live page or thread, opened now.** Screenshot for anything visual, anything
   about emptiness, anything about how a site looks.
2. **The statutory record.** Companies House, KVK, Bundesanzeiger, the Impressum.
   It beats lemlist, the site's own marketing and every search snippet.
3. **A raw tool response, read in full.** Not its summary.
4. **My own state files and notes.** These are a CANDIDATE list and a research trail.
   They are never proof of what happened. `accepted_pool_v01.jsonl` says who accepted,
   it does not say who we have spoken to.
5. **My own memory of any of the above.** Not evidence. Ever.
6. **A conversation summary written after a context compaction.** The least reliable
   thing in this repo, because it is a lossy compression of rung 5. It carries
   conclusions with their evidence stripped off, and they feel exactly like verified
   facts. Everything in it is a lead to re check. See the context loss section below.

### The self reported source trap, which is the most expensive one

**Never audit my own work using my own record of it.** The duplicate send audit was run
against the queue file I wrote, so it repeated the queue file's blind spot and came back
clean twice. It only resolved when the count was rebuilt from lemlist's own listing and
reconciled thread by thread, and the arithmetic was made to close, 41 plus 6 minus 13
equals 34.

So when Raka asks "are you sure", the answer is never a restatement. It is a fresh pull
from the system of record, a positive control proving the method detects what it claims
to detect, and an arithmetic reconciliation that closes. **Say what you checked, not
that you checked.**

### The positive control, and it is not optional on any negative finding

A negative result is worthless until the method has been shown to produce a positive
one. Thirteen empty threads meant nothing until two threads with known sends were pulled
and came back full. An empty page proves nothing until a known good page renders through
the same path in the same minute. A "no privacy policy" proves nothing until the regex is
shown to match a site that has one.

**Every absence claim ships with its control, or it does not ship.**

### Zero mistake policy. Make the call, never infer (Raka, 2026-09-21)

His words, "every single thing you do, we do a 0 mistake policy. So I prohibit you to be
lazy and just do API calls or web searches to lemlist or whatever to make sure you're
100 percent accurate."

**So being lazy is prohibited, in writing, and here is what lazy actually looks like,
because it never looks like laziness at the time. It looks like being efficient.** Every
example below was a deliberate decision to save a call, and every one cost more than the
call would have.

| The shortcut taken | What it should have been | The damage |
|---|---|---|
| Inferred acceptance from `lastActivityAt` against `lastSentAt` | `get_campaigns_stats` and the `linkedinInviteAccepted` export, which store it as a fact | Told Raka the pool was "nearly exhausted" when 320 had accepted and 167 had been messaged. 85 leads sat untouched |
| One bulk `type=linkedinSent` pull to check 34 threads | 34 `get_inbox_conversation` calls | The endpoint under reports. A false all clear, twice, on eleven double pitches |
| Read `lastSentMessagePreview` off the list endpoint | Pull the thread | The preview shows the connect note at the exact second a real opener went out |
| Guessed `instagram.com/<companyname>` | Read the URL out of their own HTML | Audited an account that was not theirs. Ciaccia Levi is `ciaccialeviparistorino` |
| Guessed a nav path | Fetch the real nav from the HTML | An imaginary 404 on EduOs |
| A regex over the footer | Open the four policy URLs | Nearly told L'MANE they had no privacy pages when all four return 200 |
| Trusted one curl | Retry, then DNS, then plain http, then render | Nearly called the live, modern nextfood.ai dead |
| Grepped instead of looking | Screenshot | The bluedesk angle evaporated. The Solvio "empty page" reached a lead |

**The standing rule. If a tool can answer it, the tool answers it.** Never reason from a
pattern, a timestamp, a preview, a filename, a memory or a plausible guess when a call
would settle it. An inference that turns out right is still a process failure, because it
was right by luck and the same method will be wrong next time.

**And the cost argument is dead. Make the call.** The calls I have skipped to save context
have each cost far more than they would have. Thirteen thread pulls is a rounding error
next to one message that should not have been sent. Raka has said this twice now, so token
economy is never a reason to skip a verification, and "that would be a lot of calls" is
never a reason offered back to him.

**Three things this specifically requires, every time.**

1. **Per item, not in bulk, whenever the bulk endpoint can omit.** lemlist's activities
   endpoint under reports and its list endpoint's preview lies. Per contact pulls are the
   only reliable read of a thread, so 34 calls it is.
2. **A live fetch of anything a claim rests on, in the session it ships in.** Not the
   research note from an hour earlier. If the message says it, the page was opened on the
   pass immediately before showing it.
3. **Say the count.** When reporting back, name how many calls were made and what they
   covered, so the check is auditable rather than asserted. "Pulled all 34 threads, plus
   two positive controls" is a fact Raka can test. "Verified" is not.

**The one thing laziness is allowed to touch.** Nothing that reaches a lead, and nothing
in an answer to Raka. Internal scratch work, exploratory reads and first pass shortlisting
can be cheap, because a wrong shortlist costs a shortlist. The moment an output is going
outward or being reported as true, every rung of the evidence ladder gets climbed.

### The three places laziness actually happens, named by Raka (2026-09-21)

His words, "especially really don't be fucking lazy to check messages in lemlist or
check contact details in lemlist or do web searches of the website." He named three
because these are the three that have actually cost us leads. Each one below has the
exact call that settles it, so there is never a judgement about whether it is worth it.

#### 1. The messages. Pull the WHOLE thread, per contact, every single time

**MANDATORY, and it is the whole chat, not the last message (Raka, 2026-09-21).** Before
a nudge, a reply, a follow up, a delivery or any next message to anyone, load every
message in that thread in both directions, from the first one. His words, "MANDATORY to
load the whole chat of the person, all messages, ours sent and what they sent, so we have
fulllll context."

**The call is `get_inbox_conversation(contactId)`. One contact per call. There is no
bulk version of this that works.**

**And it pages, which is the trap. Verified 2026-09-21.** It returns **newest first**,
**ten per page**, and **`limit` is hard capped at 10**, a request for 50 is refused. So a
thread longer than ten messages **hides its own beginning on page 1**. Page with `page`
until `pagination.nextPage` is null and reconcile against `pagination.totalItems`.

**Niklas Hanf's thread is at exactly 10 right now**, so the next message in it pushes the
connect note and the opening exchange off page 1. That is not hypothetical, it is one
message away.

**The beginning of a thread is where the promises live**, which is why the last message is
never enough. Michele Legoratto and Antanas Juodiskis were both told in writing that a
message was the last one. Jack Coulthard was told "one more nudge and then I will leave it
be" and was nudged again ten days later. None of that is visible from the newest message.

Run it **before researching a lead**, **before drafting**, and **again immediately
before sending**. Three times, because the thread changes underneath you. A reply can
land between drafting and sending, and sending a cold opener on top of a reply is the
one outreach mistake with no recovery.

What is NOT allowed to stand in for it, all three proven wrong in production.

- **`lastSentMessagePreview` off `get_inbox_conversations`.** It showed the generic
  connect note for Carolien Leeraar, Andy Tidd and Patrick Killeen while all three
  threads held full researched openers. On 2026-09-21 it showed the connect note for
  Daniel Turner at the exact second a real opener went out.
- **A bulk `GET /api/activities?type=linkedinSent` pull.** It under reports. 298 records
  covering 12 July to 17 September and the 2 August messages to Naila, Olivier, Jean and
  Marlon were simply not in it, though their threads carry them.
- **`state/silent_accepted_queue.jsonl` or `state/accepted_pool_v01.jsonl`.** The pool
  says who accepted. It does not say who we have spoken to. That gap pitched eleven
  people twice in one morning.

**An empty thread is not proof of nothing, it is proof of nothing recorded.** The connect
note is not always written as an activity. Empty means Silent accepted is plausible, and
it means unknown, and it is only trustworthy as a negative once a positive control has
been pulled in the same session, a thread with a known send that comes back full.

**Before hunting for a field, read `docs/lemlist-field-index.md` (built 2026-09-21).** It
maps every lemlist endpoint and field to the question it answers, with the enums, the
counts and the traps, all pulled from live responses. Section 1 is a reverse lookup,
your question on the left and the exact call on the right. It exists so nobody spends
another session working out which field holds acceptance.

#### 2. The contact details. Read the record, never reconstruct the person

**The calls are `search_campaign_leads` for `firstName`, `lastName`, `companyName`,
`jobTitle`, `linkedinUrl` and `companyDomain`, and the acceptance export for the same
fields on accepted leads. Read them. Do not rebuild a person from a name and a guess.**

- **`jobTitle` decides whether the company is even the subject.** Owner, founder,
  eigenaar, Geschäftsführer, dirigeant and zaakvoerder mean we write about the business.
  A manager at somebody else's group is a different message entirely. And the business
  they OWN is not the job they HOLD, which is the rule that gets missed most.
- **`contactId` is what `send_message` needs**, never `leadId`. Check which one you are
  holding before every send.
- **When lemlist and the company's own statutory page disagree, the statutory page
  wins.** lemlist had Jochen under NF1 SmartTech and the domain is red-rabbit.de. The
  Impressum settled it. Never paper over a disagreement, go and resolve it.
- **Never guess which business is theirs**, and never pick the plausible one out of a
  search result. Several unrelated people share a name. If it cannot be tied to the
  person with evidence, the row is `BLOCKED_NEEDS_INFO` and it stays untouched.
- **Reconcile the record against itself BEFORE fetching a single page (Raka, 2026-09-22).**
  Two of the first five leads in the accepted backlog carried wrong company data, and both
  would have produced an embarrassing message. **Adrian Steele**, `companyName` Mercian
  Labels and `jobTitle` Director, had sold the company and resigned per Companies House,
  and his own tagline said "Former Owner". **Romain Coquio**, `companyDomain` `carrefour.fr`,
  a multinational he does not own, with a tagline naming a different employer. Both were
  visible in the lemlist record before any research happened. So the first action on every
  lead is four reads, not a fetch. Tagline against `companyName`, since when they disagree
  the tagline has been right both times and "former", "ex" and "previously" are stop signs.
  The business they OWN against the job they HOLD, which is how Tim Balogun's "Founder -
  London Makers" against `companyName` HF Mencap resolved into London Makers being a
  programme inside HF Mencap with him as CEO. The domain actually being theirs rather than a
  corporate or franchise page they cannot change. And for any owner or founder claim, the
  statutory record, which outranks lemlist every time.

#### 3. The website. Fetch it, render it, and LOOK at it

**Run `node tools/site-audit.js <url> <slug>` and then open both screenshots.** A search
snippet is not a website and a grep is not a look.

- **Never guess a domain.** A plausible domain regularly resolves to a real but different
  company with the same name. `prevent.de` redirects to an unrelated group,
  `thesalesacademy.nl` is a different founder's company, `mapler.com` is a luxury
  hospitality brand. Fetch it and confirm the page names the right company before a word
  of it is used.
- **Never guess a nav path.** Pull the real nav from the HTML. A guessed `/over-ons/`
  became an imaginary 404 on EduOs.
- **Never guess a social handle.** Take every social URL out of their own HTML or out of
  a search result. Ciaccia Levi is `ciaccialeviparistorino`, nothing like the guess, and
  the guessed URL returned a page about somebody else.
- **Never characterise a page, a video or a post you did not actually open.** Not the
  search summary of it. The thing.
- **Never write an absence claim off one page.** "There's no X" is the single likeliest
  sentence in any message to be false. Merkaardig's "missing" quiz is a working JS quiz.
  CoLean's site does embed a video. L'MANE's four policy pages all return 200.
- **Never call a site down, empty or broken from our side's failure.** One curl returning
  `000` is not evidence, nextfood.ai is live and modern. A TLS error through the egress
  proxy is never evidence about their certificate. Always load a control host through the
  same path in the same minute.
- **The unloaded screen, and it is now mechanically enforced (Raka, 2026-09-22).** On
  `dariuz.nl` Chromium reported HTTP 415 on six of nine images and a message saying six of
  nine were broken was one step from going out. Direct curl returned `200 image/png` for
  the same files, and the same URL returns an image, a 415 or an HTML page depending only
  on the `Accept` header we send. On `dialogue.earth` we got 403 twice while Raka's own
  screenshots show a full modern newsroom with a live story grid.
  **`tools/site-audit.js` now re-fetches every failed same origin asset through a second
  independent path and prints `RENDER NOT TRUSTED` when the failure is ours.** When it
  fires, every visual, asset, layout, breakage and emptiness finding in that run is void
  **and the screenshots are unusable for that site**, because they are missing real assets.
  The screenshot is not the fallback, it is the thing that is wrong. **The fallback is
  `node tools/render-via-curl.js <url> <slug>` (2026-09-23)**, which serves every request to
  their own host through curl. 0 curl errors means its parts can be read. Otherwise the row is
  `BLOCKED_NEEDS_INFO` and Raka opens it. A blocked page is never a weak page.

**And the web search rule underneath all three.** A search is how you FIND something to
open. It is never the thing itself. Anything taken from a snippet, a summary or a cached
description gets opened at its source before it can appear in a message.

### Why this keeps happening. Context loss, and the full approach rule (Raka, 2026-09-21)

His words, "I really prohibit you to do anything that skips the corner, always go full
approach. Because you lost context and you miss out on things." This is the mechanism
underneath every rule above, and it is worth stating plainly because it explains why
being careful is not enough on its own.

**A long session runs out of context and gets summarised. The summary is written by me,
from my own earlier output, and it is lossy by design.** Detail goes first, and the
detail is exactly where the evidence lives. What survives is the conclusion, stripped of
what it rested on. So after a compaction I am holding a confident sounding claim with no
source attached, and it feels identical to a fact I verified ten minutes ago. That is the
whole failure. Not carelessness, not haste. A conclusion that outlived its evidence.

**So a summary is the LEAST reliable source in this repo, below my own notes.** Add it to
the bottom of the evidence ladder. Anything arriving through a summary is a lead to
re check, never a finding to act on.

**The rule. Nothing crosses a context boundary without being reopened.** After any
compaction, before acting on anything the summary asserts:

- **A verdict on a lead** gets its thread pulled and its page refetched. Not reread from
  the summary.
- **A draft** gets copied out of the file it was saved in, byte for byte, never retyped
  from memory. The Ineke Geenen opener was retyped in Dutch at send time while the saved
  draft was correct and in English, and only a refusal caught it. Retyping skips all four
  read back passes.
- **A count, a list or an audit result** gets rebuilt from the system of record. The
  eleven duplicates were only settled by rebuilding the day's sends from lemlist's own
  listing until the arithmetic closed, 41 plus 6 minus 13 equals 34.
- **A "we already checked that"** is the single most dangerous sentence after a
  compaction. If the check is not in a file, it did not happen.

**The structural fix, and it is the one that actually works. Write it down at the moment
it is verified, not later.** Context will be lost, that is not preventable. What is
preventable is losing the evidence with it. So the state files are not bookkeeping, they
are the only memory that survives. At the moment a claim is verified, the URL, the page,
the number and the date go into the `claims` list on the queue row and into the research
note, written so a later session can re test it without rereading the site. "See inbox
thread" is not a research note, and it is why four leads could not be nudged at all.

**And the full approach rule, which is what he actually asked for.** There is no
abbreviated version of a procedure in this file. Not because a short version would
always be wrong, but because the judgement about when a short version is safe is made
with exactly the degraded context that causes the error. So the procedure runs in full
every time, including the parts that feel redundant, and especially the ones that feel
redundant because I think I already know the answer. Thinking I already know the answer
IS the symptom.

### Before anything leaves, the five questions

1. Did I open every source again on this pass, or am I working from notes?
2. Did I try to prove each claim wrong, and what specifically did I open to do it?
3. Is any claim resting on one tool, one fetch or one regex?
4. Does the arithmetic close, and does a control prove the method works?
5. Which sentence here am I least able to defend, and why is it still in.

**A shorter true message always beats a longer one with a soft claim in it. Delete, do
not soften.** And when the check turns up something I got wrong, say it plainly and
first, because Raka finding it himself is the only outcome worse than the error.

## Research method and the five angles

**Moved to `docs/research-and-angles.md`** so this file stays readable. The deep method behind the research rules in `docs/RULES.md` section 3. Open it when you are researching a lead. It is not needed for inbox triage, a build, or a pipeline run.

## Running a session on your own (written 2026-09-15 so nobody has to be told again)

Raka's standing goal is that a session needs no corrections and no extra guidance.
This is the operating loop. Follow it top to bottom when a session starts with no
specific instruction, and use the same order when he names a single task.

### Start of every session, before anything else

1. `git pull` the working branch.
2. Read `state/inbox_checkpoint.json`, and grep `state/silent_accepted_queue.jsonl`
   and `state/prototypes.jsonl` for anything with an open outcome.
3. Read the last two files in `logs/inbox/` so you know what the previous session
   already said and already promised.
4. Never re derive a verdict a previous session recorded. Respect it, or override it
   explicitly in writing with new evidence, per the queue hygiene rule.

### The order of work when nothing is specified

The pipeline is always short of one thing, a real message to someone who never got
one. Work in this priority order.

1. **Anything owed.** A promised artefact not yet built, a booked meeting with no
   brief, an `outcome: pending` older than a week.
2. **Replies waiting on us.** Threads where `isYourTurn` is true and the last
   message is theirs and carries real content. A two word thanks is not that.
3. **Stalled nudges.** Real researched message sent, two to four weeks, no reply.
   Re verify the original claim first, always.
4. **The Silent accepted backlog.** Batches of about ten, real research each.
5. **Enrichment pipeline** if new contacts have landed.

### The four hard gates, in order, on any outward work

**Gate 0, the triple check.** The section at the top of this file. Three different
actions, source then opposite then independent confirmation, plus a positive control on
every absence claim. It runs on every gate below and on every answer given back to Raka,
not only on messages.

**Gate 1, research.** `docs/astra-prospect-research-master.md` standard, then the
falsification pass. Open the page that would disprove the claim, not the page that
suggested it. Absence claims need at least two pages plus the page type the visitor
actually lands on. If it does not survive, rewrite the angle honestly or return
`NO_STRONG_ANGLE`.

**Gate 2, angle.** `docs/astra-commercial-angle-master.md`. Diagnose the bottleneck,
generate two to five candidates, red team them, pick one. Never start from a service
and hunt for a reason. Never manufacture pain.

**Gate 3, the four pass read back.** Below. It is a gate, not a polish step.

### What you may do without asking

Research, drafting, building, deploying to Netlify, writing state and logs,
committing and pushing. All of it. Raka does not want to be asked whether to
research something or whether to build the thing he already asked for.

### What always needs his explicit word

**Sending.** Every outward message, every time. Editing instructions are edits, not
authorisation. "Make it English", "less cheesy", "shorter", "keep it short" all mean
redraft and show again. A batch approval covers that batch only. This has been broken
once already, on 2026-09-05, off the instruction "all in English".

Also his call, not yours: flipping a campaign to running, deleting anything, and
quoting a price outside the public €5k to €50k band.

### How to report back

Lead with what changed and what is now true, not with what you did. Numbers where
they exist. Flag the one thing he would want to overrule **before** he finds it, and
say plainly when something failed rather than burying it. When an output is a file
or a page he should look at, send it or link it rather than describing it.

## The build toolchain and everything corrected across the WisTree deck

**Moved to `docs/build-and-deck.md`** so this file stays readable. Exact paths, rendering, QA, images, deploying, deck architecture, and the full audit of corrections Raka made across five deck rebuilds. Open it before building anything.

## The artefact delivery message (Raka, 2026-09-15). A fifth shape, for sending the thing.

Not an opener, not a reply, not a nudge, not a closer. This is the message that
carries a finished prototype or deck into a warm thread. Raka wrote the skeleton
himself and it is deliberately tiny.

```
[name], I spent the whole day building this.

[what they asked for, in one sentence, and the fact that it works]

Try it yourself.
[the URL, on its own line]

[one line on what else is in there]

What do you think?
```

Around 60 to 80 words. The one that shipped to Karim was 64.

- **The opening line is allowed to be a bit dramatic**, and it must be true. He
  did spend the day on it. Never claim effort that was not spent.
- **No exclamation marks, no emoji.** The opener template's one exclamation rule
  is for cold openers. This lands in a warm thread and the first line carries it.
- **The dash and colon bans are not relaxed.** The URL is exempt as a URL.
- **Verify the artefact is live immediately before sending.** Fetch it, confirm
  200, confirm the title is still theirs, confirm any images actually load. Same
  rule as the closing nudge.
- **Contractions, plural.** The first draft of the Karim message had zero, which
  is the single clearest machine tell. The shipped version had three in 64 words.
- **No honesty theatre.** "Two things I am not going to pretend about" was cut for
  announcing its own virtue. If a caveat matters, either say it plainly or let the
  artefact say it, and tell Raka which you chose.
- **Close on a real question**, not an ask for a meeting. "What do you think?"
  outperforms "shall we book a call?" here, because the artefact is the ask.

### Not cheesy, not AI sounding

Raka's edit note on the first Karim draft. What got cut, and why it is general.

| Cut | Why |
|---|---|
| "Which is the actual ask." | A fragment used as a pivot. Pure tic. |
| "Two things I am not going to pretend about." | Honesty theatre. |
| "if I have wandered somewhere you would rather I had not" | Twee. Became "if I've gone somewhere you'd rather I hadn't". |
| "since that is the part nobody else has" | Trailing explainer. Became "which is the bit nobody else is doing". |
| Every uncontracted verb | "that is", "I do not", "I am not going to". |

## The ship it checklist

Run this before showing Raka any artefact, and again before any link goes to a lead.
Every line is here because it failed at least once.

**Copy**
- [ ] Zero em dashes, en dashes and hyphens in prose. URLs and slugs exempt.
- [ ] Zero colons. The total ban outranks NO-AI-SLOP's "colons only for lists".
- [ ] Contractions present and plural. Zero contractions is the clearest machine tell.
- [ ] No banned words or phrases from `docs/NO-AI-SLOP.md`, section 8 grep run.
- [ ] No honesty theatre, no fragment pivots, no trailing "so" or "which is" explainers.
- [ ] Every heading claims something rather than labelling something.
- [ ] Nothing narrates the artefact inside the artefact.
- [ ] English, unless it is a working artefact a non English speaker will use, and
      then an English explanation sits beside it.

**Truth**
- [ ] Every factual claim traces to something actually fetched, with the page named.
- [ ] The falsification pass ran, against the page that could disprove it.
- [ ] The triple check ran. Source reopened, opposite attempted, confirmed a second
      way that does not share a failure mode with the first.
- [ ] Every absence claim carries a positive control proving the method detects the
      thing when it is there.
- [ ] Nothing rests on my own notes, my own state files or my own memory.
- [ ] Every number recounted on the page it came from, every href opened rather than
      its label read.
- [ ] `get_inbox_conversation` pulled for this contact in this session, and again
      immediately before the send. Never a preview, never a bulk activities pull.
- [ ] The lemlist contact record actually read, `jobTitle` checked to confirm the
      business is theirs, `contactId` in hand rather than `leadId`.
- [ ] The website fetched, rendered and both screenshots opened. No domain, nav path
      or social handle guessed. Nothing quoted from a search snippet unopened.
- [ ] Nothing invented is presented as real. Placeholder data is labelled inside the
      artefact and flagged in the handover.
- [ ] No client work claimed that was not delivered, and the delivery partner
      disclosure travels with Unilever, GPay and MWX.
- [ ] No person named with a role their own site contradicts.
- [ ] No photograph captioned as the client's premises, staff, customers or product.

**Build**
- [ ] Cold load, nothing forced. Zero page errors.
- [ ] Every reveal fired naturally. A count well short of the total means broken.
- [ ] Every image 200 and decoded, on a multi file deploy the assets too.
- [ ] No horizontal overflow at 420px outside a deliberate scroller.
- [ ] Every section screenshotted and actually looked at.
- [ ] Interactive parts exercised end to end, not assumed.

**Live**
- [ ] Live URL fetched, 200, `<title>` still theirs.
- [ ] Live HTML diffed against the deployed file. Only the Netlify HUD should differ.
- [ ] Every asset path fetched and byte matched.

**Record**
- [ ] `state/prototypes.jsonl` row written or updated.
- [ ] Handover written, including anything that must not ship as is.
- [ ] Committed and pushed. `state/prototypes/` is gitignored, so force add.

## lemlist, the older heuristics, kept as history

**Moved to `docs/lemlist-legacy-notes.md`** so this file stays readable. **Superseded by `docs/lemlist-field-index.md`, which was built by calling every endpoint.** This is the trail of how the answers were worked out the hard way, including heuristics that were later proven wrong. Kept so nobody re derives them. Do not act on it.

## Astra Agency, the company itself

**Moved to `docs/astra-company-profile.md`** so this file stays readable. Transcribed from `ASTRA_AGENCY_Deck_Short.pdf`. Identity, the two sided structure, the named delivered work and how it may be described, qualification, and the named contact. Open it when a message needs to say what Astra is or cite delivered work.

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
- **`cam_Co5CJXrpPFf5MRAfD` is paused as of 2026-09-16 and Raka has said all
  outreach goes out on v0.1.** Do not import Tier 1 into it while that holds.
  Stage the rows, say so in the run log, and leave the decision with him. Re
  confirm campaign status at the start of every run rather than trusting this
  note, since Raka can change it at any time.

## Daily inbox triage

Full spec: `docs/inbox-triage-spec.md`. Produces a digest of who Raka needs
to reply to across all active LinkedIn conversations. Never sends anything
itself.

### Live configuration

- **Active campaigns to cover:** any campaign with status `running` (check
  fresh each run via `get_campaigns` with no status filter, campaigns can
  change status between runs). Scope is status-driven, not a hardcoded ID list,
  so no code change is needed as campaigns turn on or off going forward.
- **As of 2026-09-16, `cam_PryZp5LuvQv8NznHh` (`v0.1 Outreach Only`) is the ONLY
  running campaign, and Raka's instruction is that all outreach now goes out on
  v0.1.** `cam_Co5CJXrpPFf5MRAfD` (`v0.2 Auto Enrichment Pipeline`) is **paused**,
  which reverses the 2026-08-11 note that had both running. So work v0.1 leads,
  pick batches from v0.1, and do not import into or resume v0.2. Restarting a
  campaign is Raka's call, never yours.
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
    on: `UNRESEARCHED` (default), `DRAFTED` (researched, opener written and
    shown to Raka, not yet approved, so never treat it as contacted),
    `SENT`, `NO_STRONG_ANGLE` (a real
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
  - **The queue's `status` goes stale, so trust threads over the file (2026-09-16).**
    A check found 37 rows marked `DRAFTED` with `openerText: null`, yet Andy Tidd and
    Patrick Killeen both had real openers in their threads from 14 Sep, and Marjorie
    Pigaux, Mark Preston, Mark-Paul Burgersdijk, Malcolm Amonoo, Clara Champion and
    Dr Ashish Rajput had all been nudged. The 14 Sep batches were sent without writing
    the status back. So **write the status back in the same commit as the send**, and
    before drawing any batch from the queue, reconcile the rows you intend to work
    against their actual threads. Also **key on `contactId`, not name**, because the
    queue stores "Andy Tidd" while lemlist returns "Andy Tidd Fbcs".
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

**Never audit a thread from the conversation list alone (2026-09-15).** Raka sent
a screenshot and asked "can you check if you're correct?" and the answer was no.
An audit had claimed eleven people said yes to an artefact and never received it.
Nine of the eleven had been delivered, several nudged two or three times. The
cause is a real limitation, **`get_inbox_conversations` only exposes
`lastSentMessagePreview`**, so a delivery followed later by a nudge is invisible
and the thread looks like it stopped at the nudge. Worse, `state/prototypes.jsonl`
already recorded the correct send date and had been read an hour earlier.

So any claim about what a thread contains needs `get_inbox_conversation` per
contact, and any claim about what was sent needs cross checking against the state
files we already keep. Follow up counts in particular cannot be derived from the
list endpoint at all. When Raka asks whether an output is correct, treat it as a
real question and go and check rather than defending the first answer.

**Every reply this routine drafts uses the opener template above (Raka,
2026-09-14), in its reply variant** ("Hi [name], [answer what they actually
said]. I saw [company] and [positive thing]!" then However, then This means,
then the Astra line with a matched credential, then the Shall I). The same
falsification standard applies before a drafted reply names any problem, so
open the page that would disprove the claim rather than the one that suggested
it. The one exception stays the "Reply in context, always" rule in
`docs/writing-standard-anti-ai.md`, a two word thanks gets a warm two line
answer, not a template.

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
  - **A deck with images is a multi file deploy, so verify the images too.**
    Fetch every asset path and confirm a 200 and the expected byte count, not
    just the HTML. A page that loads with five broken images is worse than no
    page. Then cold load the downloaded copy in Chromium with response capture
    and confirm every `<img>` decoded with a non zero natural width.
  - **A refused deploy may be billing, not the build.** On 2026-09-15 three
    consecutive deploys came back `Skipped due to account credit usage exceeded`
    with `state: error` and `skipped: true` (ids 6aa96a47494ba99baaeee4ee,
    6aa96a77000db62461acc87e, 6aa96b9cf7d18c7454c94f2e). Nothing was wrong with
    the HTML. It cleared on its own and the fourth attempt went straight through.
    So read the error before touching the build, and retry later rather than
    rewriting something that was never broken. There is no token in the
    container, only the site id, so a direct build free upload is not available
    as a workaround.
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

**Before building anything, clear the pre-build gate (Stage K of the prototype
spec, the decline post-mortem, 2026-09-05).** The prototypes that failed did
not fail on build quality, they failed upstream. All four must hold before a
line of HTML: (1) interest is real, not a reflexive "sure send it" (most cold
sends are ignored, not rejected, so earn a genuine reply first and honour the
`ONLY_AFTER_INTEREST` decision); (2) the problem is one the owner would name
unprompted, not a gap we invented (Diisco, Jori); (3) the build matches what
the lead is actually trying to do, not just the friction we noticed (Zynox
wanted a webshop, we built a catalog); (4) we can hit the craft and art
direction bar (Zynox liked the clarity, rejected the look; Toffe took three
rebuilds). If any gate fails, use a lighter touch or return `NO_STRONG_ANGLE`,
do not build.
