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

**What actually works on first touch (learned 2026-09-11 from real replies, not
theory).** The first message is the single biggest lever in the funnel, and the
reply data is blunt about it:

- The generic connect note ("saw your business and thought it was cool, I'm a
  business owner too, would love to connect and share ideas") reliably produces
  generic replies and a cold restart. One batch of six leads (Ramar/RentyFind,
  Jacqueline/Leadership Through Data, Fleur/DCCI, Karim, Sarim/Flochitect,
  Kyson/Acquitas) all came back with near-identical low-signal lines ("Thanks
  Raka", "nice to meet you, what business are you in?", "always great to connect
  with inspiring people"). It opens the door and hands us nothing to work with,
  every one forces us to restart the conversation from zero.
- Every thread that actually progressed turned on one specific, true observation
  about that lead's own business. Georgia/HotGreen replied "yes please" and told
  us they were mid redesign after we pointed out the CCEP trial and the raise
  were nowhere on their site. Ank/Tomatoworld booked a call after real
  engagement plus a tailored analysis. Antanas/Gravity Fellow replied "what is
  your offer" to a concrete investor homepage concept.
- Cold prototype sends before genuine interest mostly die (11 of 14 went silent,
  see Stage K). Rapport-only chit-chat dies the other way (polite warmth, then
  silence).

The rule, seen from the reply side: the first touch carries one specific
observation about their business that could only be written for them, enough to
earn a real reply. Never open with rapport filler, never open with a prototype.
Diagnose first, lead with the diagnosis, and hold the prototype or deck until
they have shown genuine interest (the ONLY_AFTER_INTEREST rule). Track what came
back, not just what was sent, so this stays evidence and not memory.

**Every reply has one job, earn a yes to sending something (Raka, 2026-09-13).**
A reply that produces a pleasant exchange and no artefact has failed. The aim
of any thread is to reach the point where the lead says "yes, send it over",
and the thing we send is either a prototype or a **research deck** of what we
found and what we would do about it. The deck is now a first class option
alongside the prototype, not a fallback, because the evidence says so. The
Tomatoworld deck produced a booked meeting, the HotGreen deck produced a warm
handover to the person actually running the redesign, and the Acquitas deck
went out on the back of an explicit "Go for it". A deck also suits leads where
a prototype would be wrong, which is most builders, consultants and technical
founders, and it is far cheaper to produce than a full build.

This does **not** licence cold sending. The Stage K data is unchanged, 11 of 14
unrequested prototype sends were ignored, so the `ONLY_AFTER_INTEREST` rule and
the Stage K pre build gate still hold. The change is about intent, every reply
should be steering toward the offer rather than drifting. In practice that
means each reply carries a concrete observation about their business plus the
ASTRA service line that actually fits (Grow / Optimise / Innovate / Build
Squad, and note that builders, consultants and technical founders usually want
Build Squad rather than a redesign), and closes by offering to put something
together. Use the prototype send convention, offer the specific journey ("I can
put together a quick version and send it over, want to see it?"), never a vague
"want me to?". Track in `state/prototypes.jsonl` what was offered, what came
back, and whether a deck or a prototype was the thing that moved it.

**Make them feel the cost of doing nothing (Raka, 2026-09-13).** An
observation on its own is trivia. The lead has to finish the message knowing
what staying exactly as they are will keep costing them, in their own business,
this month. Name the bill they are already paying without noticing. Studio Was
Here either turns down work that grows past design or hands it to a freelancer
it cannot control, and it is still their name on it when it slips. CLUUE has to
convince a Mittelstand manager he has a problem he cannot see before it can
sell him anything, which is the hardest sale there is, while the demographic
clock runs on his prospects. VDM Energy loses the homeowners who leave without
asking and spends real time quoting the ones who were only curious. NEWLENSE
makes a good reel, the click lands on a website that undoes it, and at the
monthly review it looks like the content underperformed rather than the site.

Two hard limits on this. The cost must trace to something actually verified in
research, never invented, and the no manufactured pain rule in
`docs/astra-commercial-angle-master.md` still outranks it, so a business with
no real gap gets `NO_STRONG_ANGLE` rather than a scary sentence. And it stays
plain and unbothered, never doom, never urgency theatre. State the bill, say
what we would build, offer to send it.

**Say what Astra actually sells, in plain words, in the message.** A lead who
has only had a connect note has no idea what we do, so a suggestion from us
reads as a stranger giving unsolicited advice. One short line, "I run Astra, we
build websites and the tools that sit on them", before the thing we would do
for them. Then name the artefact concretely, a working version of a specific
screen or a short deck, never a vague "something".

**Write every outward message in English, always (Raka, 2026-09-13).** This
replaces the earlier rule about matching the language of the previous message
in the thread. Dutch, German and French openers are no longer written, even
where the lead is Dutch and the last message we sent them was Dutch, and even
where their own site is in another language. Read their site in whatever
language it is in and quote a phrase from it where that is the evidence, but
write the message itself in English. (Logged after a batch was drafted in
Dutch purely because the leads were Dutch.)

**The ICP is not a country (Raka, 2026-09-13).** Section 3 of
`docs/astra-master-context.md` has never named a geography, and the pipeline
covers the UK, Germany, France, Belgium, the Netherlands, Canada and further
out. Do not preferentially pick Dutch leads when choosing a batch, and do not
treat "based near Raka" as a quality signal. Pick on fit to an ASTRA
proposition, commercial potential, visible urgency and access to the owner,
exactly as section 3 already says. A batch that comes out all one nationality
is a sign the selection was lazy rather than that the pipeline is Dutch.

**Working the Silent accepted backlog (Raka, 2026-09-13).** As of this date
`sentOnly` holds roughly 691 contacts and the queue has 135 worked rows, so
the great majority accepted the connection, received only the generic connect
note, and never heard anything worth replying to. That is the largest untapped
pool in the business and it only shrinks when someone drafts a real opener.
Work it in batches of about ten, each with real per contact research, and aim
the same way as any reply, at a yes to a prototype or a deck. Because these
people never replied, the opener carries the whole load, so it needs the
specific observation, the plain line about what Astra builds, the cost of
doing nothing, and the offer, in that order.

**The opener template (Raka, 2026-09-14). This is the current shape and it
outranks the 65 word template in `docs/astra-master-context.md` section 9.**

```
Hi [name], saw [company] and I find it [positive thing]!

However, [explain the problem in 1 sentence]. This means [cost of doing nothing].

I run Astra agency [what we can do for them specifically] after [my experience].

Shall I [what we are going to send them]?
```

Four blocks, roughly 100 to 120 words, exactly one exclamation mark and it
lives on the first line. What changed versus every earlier version, and the
reason he gave it, is the third block. **Every opener now spends one of Raka's
own credentials**, matched to the lead using the rules in
`docs/astra-master-context.md` section 2A, because a stranger's opinion about
your website is worth nothing until they have earned the right to it. Heineken
and the 23 markets for enterprise, industrial, engineering and operations led
buyers. Eten Maar for owner operators, founders and consumer brands, he built a
food brand from zero with his family and ran the pricing and the P&L. Betty
Blocks or efficy for B2B software, GTM, routing and audience problems. One
credential, never a list, and never stretched into something he did not do.

The opening line is a real, specific, casual reaction to something true about
their business, never reverent flattery and never a generic compliment. The
"However" sentence is one sentence. "This means" carries the cost of doing
nothing in the present tense. The close names the artefact concretely.

**The reply variant (Raka, 2026-09-14).** When the lead has written to us
first, only the first block changes. Answer their message, then go straight
into the same structure.

```
Hi [name], [answer what they actually said]. I saw [company] and [positive thing]!

However, [explain the problem in 1 sentence]. This means [cost of doing nothing].

I run Astra agency [what we can do for them specifically] after [my experience].

Shall I [what we are going to send them]?
```

Blocks two, three and four are unchanged, credential included. The only
difference is that the opener earns its place by responding to them rather
than by arriving cold. This does not override the reply rules in
`docs/writing-standard-anti-ai.md` ("Reply in context, always"), so if their
last message was a two word thanks, match that energy first and do not dump an
audit on them. The template is for a reply that is ready to carry an offer,
not for every message in a thread.

**Both versions are the standard everywhere (Raka, 2026-09-14).** These two
templates are now the shape for every first real message we send, whether the
lead has replied to us or not, and **the reply agent uses them too**. The daily
inbox triage drafts replies in this shape, the Silent accepted backlog work
uses it, and any batch of openers uses it. There is no separate house style
for replies any more.

**The nudge template (Raka, 2026-09-14). A third shape, for following up on
our own unanswered message, and the only place an emoji is allowed.**

```
[name], did you see this? 👀

[the cost of doing nothing, expanded, until they can actually feel it]

[the artefact, offered in one line, with a frictionless out]
```

This is NOT the opener template and must not be confused with it. It is for the
Stalled tier only, someone who received a real researched message and never
replied. Rules specific to it:

- **The eyes emoji is deliberate and is an explicit override** of the no emoji
  ban in `docs/NO-AI-SLOP.md` and `docs/writing-standard-anti-ai.md`, for this
  first line only. Raka's live instruction outranks both. Nothing else in the
  message carries an emoji. The v0.1 campaign's own automated bump step already
  used this exact line, so it is consistent with what these contacts have seen.
- **The no colon and no dash bans are NOT relaxed.** Only the emoji ban is.
- The middle block is the whole point. Do not restate the observation and stop,
  spend the words on what staying exactly as they are keeps costing, in their
  business, in the present tense, traced to something verified. Name who is
  being lost, at what moment, and why the loss is invisible to them.
- One exclamation mark is the opener template's rule, not this one. Nudges
  carry none.
- Close with the artefact named concretely plus an honest out, "yes or no is
  fine either way", which section 9 already endorses.

**The closing nudge template (Raka, 2026-09-15). A fourth shape, the last message
a thread ever gets, and the only place urgency framing is allowed.**

```
[name], you're about to miss [the easiest win] [company] will get all year.

[the artefact, built, live and theirs, described in their own specifics]
[the URL, on its own line]

[the loss, compounding, in their business, in the present tense]

If the timing isn't right I completely understand. But you're missing out on
[the specific impact].
```

**Who it is for, and nobody else.** A lead who asked for the artefact, received it,
and went quiet through at least one chase. Someone who never replied gets the nudge
template. Someone cold gets the opener. Someone who declined gets nothing.

- **It is genuinely last.** After this the thread is closed in
  `state/inbox_digest_log.jsonl` and never messaged again. Sending a further chase
  after promising this was the last one is the thing Michele Legoratto and Antanas
  Juodiskis were both told in writing, so it would be a broken promise on the record.
- **It deliberately runs hotter than `docs/writing-standard-anti-ai.md`,** which bans
  urgency framing and hype. Raka's live call on 2026-09-15 overrides that doc **for
  this shape only**. It is not licence for the house voice to drift, and the opener,
  reply and nudge templates keep the old restraint.
- **No emoji** (unlike the nudge) and **no exclamation marks**. The hook carries it.
- **The colon and dash bans are NOT relaxed.** The artefact URL is exempt as a URL,
  same as the Netlify slug rule.
- **Verify the artefact is still live before naming it.** Fetch the URL, confirm 200
  and that the `<title>` is still theirs. Pointing a closing message at a dead link is
  the worst possible last impression.
- **The middle block must compound.** Not "you are losing visitors" but the specific
  repeat loss. Di Lieto loses a standing weekly order rather than one tray, and their
  own Bake Off win is what delivers the chef to the page that fails them. Zenara buys
  the same customer back every month because matcha runs out monthly and there is no
  subscribe option.
- **End on the impact, never an ask.** The close names what they forfeit and stops.
  No "let me know", no "shall I". A closing message that begs is not a close.
- The four pass read back below still applies, and pass 4 matters most here because
  the hook line is the easiest thing in the whole playbook to write twice.

**Read every message back four times before it goes anywhere (Raka, 2026-09-14).
The two questions are his. Does this make sense? Does this sound weird?** This
is a hard gate on all three templates, not a polish step, and it comes after
the research is done and before the draft is shown or sent. Four separate
passes, because each one catches a different failure:

1. **Read it aloud, as one message.** Every sentence must parse on its own. If
   a clause dangles, or you have to reread to find the verb, it is broken.
2. **Read block three against block four.** The credential has to be the reason
   we can do the specific thing we are offering. If they have nothing to do
   with each other, the sentence is a non sequitur even when it is grammatical.
3. **Read block four alone and ask what arrives.** If a stranger could not draw
   the thing we are about to send, it is not named concretely enough.
4. **Read the whole batch in a column, blocks three and four side by side.** A
   batch that repeats the same closing line is a template, and Raka's rule
   against openers reading as a template applies to the last line as hard as
   the first.

The failures that produced this rule, all from the 2026-09-14 batches, and all
of them sent before anyone read them back:

- **Remarx.** "we build websites and the tools on them, so the one thing you
  say you don't do, after a year at Heineken where I sat on the side that had
  to justify picking a supplier." Three fragments stapled together. It does not
  parse. Pass 1 catches this instantly.
- **Navis Bio.** "we'd build the way in." Names nothing at all. Pass 3.
- **SURGEOR.** "we'd turn Siblu into a written engagement." Siblu is a client,
  not a thing you convert. It sounds wrong because it is wrong. Pass 1.
- **Motzu Labs.** "the page that lives after the show" is vague, and the
  credential spent was routing and follow up, which has nothing to do with
  building a post event page. Pass 2 and pass 3.
- **LIVSHO.** "after two years on the acquisition side of a B2B platform" is
  mush. It names no company and no thing he actually did, which is the whole
  point of spending a credential. Pass 2.
- **Bamboo Invest** got "rebuild the entry", **MicroMovements** got "build the
  business side its own proof", **Fervonic** got "the evidence layer under the
  claim". All three are abstractions where a page should be named. Pass 3.
- **Eleven of twelve** closed with the identical "Shall I put a version
  together and send it?" Pass 4.
- **Thrive and L'Office** were both offered a proof page and both spent the
  Eten Maar pricing and P&L credential, which is the credential for a pricing
  problem. Pass 2.

If a pass fails, rewrite and run all four again. A message that is factually
perfect and reads badly still loses the lead, because the reply is a judgement
about whether we are any good at this, and the message is the only sample of
our work they have seen.

**Never nudge without re-verifying the original claim first (Raka, 2026-09-14).**
A nudge repeats a month old observation, so it is the single easiest place to
say something that has stopped being true. On 2026-09-14, re-checking nine
stalled leads before drafting found that **Ad-Wise had rebuilt their entire
site and fixed the exact problem we flagged**, that half of the Infinity
Biosciences claim was no longer true, that the Edouard Koehn angle had always
been weak because selling through retailers is standard for haute horlogerie,
and that the DOCRA lead could not even be tied to a confirmed domain. Two of
nine were dropped and one became a short note congratulating them on the fix,
which is a better message than the nudge would have been. Re-verify, then
write. And when they have fixed it, say so and offer the next thing instead.

**Go beyond the website angle (Raka, 2026-09-14).** The "However" block does
not have to be a website problem. Earlier guidance in
`docs/astra-master-context.md` section 9 says the opener always names a
website problem and offers a prototype. That is now too narrow and this
supersedes it. Diagnose the actual business bottleneck per
`docs/astra-commercial-angle-master.md` and pitch whichever ASTRA line fits,
Grow, Optimise, Innovate or Build Squad. A missing internal workflow, an
operations gap, a routing or follow up problem, a proof or credibility gap, a
pricing or payer question left unanswered, or spare build capacity for another
agency are all valid "However" blocks. Worked examples from the 2026-09-14
batch, Nicura got a payer question rather than a design critique, Cryptofocus
got audience capture, JigiWeb got a Build Squad partnership rather than any
criticism of his site, and Emerge Numerics got a routing gap between two
properties they already own. What does not change is that the problem must be
specific, verified, and one the owner would recognise unprompted.

**The research bar is close to 100 percent certain (Raka, 2026-09-14), and it
is checked by trying to disprove your own claim.** A homepage read is not a
site read. Before any opener goes out, open the specific page that would make
the claim false, not the page that made you believe it. On 2026-09-14 a
falsification pass over 23 finished openers found **eight were factually
wrong** and one lead had to be dropped, all of them from claims taken off a
homepage summary. The failures worth memorising:

- Claimed a software site never linked the consultancy. Its `/services` page
  linked it in plain text. Only `/about` had been checked.
- Claimed "no name, no face" twice. Both companies named their founders with
  photographs on an About or A propos page.
- Claimed the only contact route was a phone number. There was a contact form,
  with a referrer type selector on it.
- Claimed no email capture anywhere. The newsletter sat on the contact page.
- Claimed no prices and no before and after photos on a clinic site. Both were
  on the individual treatment pages, just not the homepage.
- Claimed a portfolio had two projects. It had three, each with a gallery, plus
  a named testimonial. That lead was dropped rather than rewritten.

The checklist. Fetch every nav item and list the real URLs rather than guessing
paths. Open the page that could disprove the claim. Grep the raw HTML for the
thing you say is missing, using the words the site would actually use, in its
own language. On an absence claim, check at least two pages plus the page type
the user actually lands on, since an article page and a contact page differ. If
the claim survives all of that, write it. If it does not, rewrite the angle
honestly or return `NO_STRONG_ANGLE`, and never keep a broken claim because
the message reads well. Several corrected openers came out **stronger**,
because crediting what the lead already did right proves we actually looked.

**Never open with the gap ritual (Raka, 2026-09-13).**

**Never open with the gap ritual (Raka, 2026-09-13).** An earlier version of
this section told openers to start by acknowledging that we connected a while
back and never sent anything useful. That is deleted. Raka's words, "who would
say that, no human does that." Nobody announces their own neglect before
speaking. Open on the observation about their business, straight in, and vary
the first line lead to lead so a batch does not read as a template. The fact
that the thread is cold needs no narration, the specificity of the observation
carries it.

Getting lead data cheaply: `search_campaign_leads` with `campaignId` and a
`limit` returns a lean row per lead (name, company, job title, LinkedIn URL) at
roughly eighty tokens each, so a hundred at a time is affordable and is the
right way to pick a batch. The heavy full record with `companyDescription` and
`summary` comes back only when querying a single lead by `id`, so use that for
the ten you actually chose. Note that the connect note is not always written as
an activity, so `get_inbox_conversation` can return an empty list for a real
Silent accepted contact; that is not evidence of anything.

Retry the `BLOCKED_NEEDS_INFO` rows periodically, because some unblock on their
own. Spa Holistique Ayurveda sat blocked on a stuck redirect and now resolves,
though only at the locale path `/fr` since the root serves a client side
redirect. Most of the rest stay blocked for a better reason, genuine identity
ambiguity, and those stay untouched under the never guess rule.

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

**Before building any prototype, deck or site, read Stage L of
`docs/prototype-build-spec.md`** (the WOW bar and craft standard, written
2026-09-13 from the Acquitas build Raka drove through eight rounds). The test
is his: would this make the client think "holy shit I need to hire these
fuckers", AND does it continue the narrative we already told that person. The
rules that get broken most often are these. Never say in words that we
understand their business, prove it through how the thing is made. Every
section carries a real photograph or a real sourced graphic. Study actual
reference pages before art direction instead of designing from memory. The
hero needs more than one pass and must be seen at phone width. Production
ready means they can publish it next week, with any assumption flagged rather
than shipped silently. Audit copy phrase by phrase for things nobody would
say, and count the contractions. And verify by loading the page cold with
error capture, never by forcing reveal state, which is how a completely blank
deck once shipped to a client.

Raka's own background, and which credential to spend on which kind of lead,
is in **`docs/astra-master-context.md` section 2A**. Read it before writing a
message that needs to earn the right to an opinion.

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

### The three hard gates, in order, on any outward work

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

## The build toolchain (verified 2026-09-15, use these exact paths)

A fresh container has all of this. Do not go rediscovering it, and do not install
what is already here.

### Rendering and QA

- **Chromium** `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`
- **Playwright** `require('/opt/node22/lib/node_modules/playwright')`, launch with
  `args:['--no-sandbox']`
- **The agent proxy resets live Chromium tunnels to most hosts.** So never point the
  browser at a live site. Serve locally instead,
  `(cd <folder> && python3 -m http.server 8788 &)`. To QA something already
  deployed, `curl` the live HTML and every asset into a folder and serve that copy.
- **`tools/deck-qa/qa.js`** is the harness, committed so you do not rewrite it.
  `BASE=http://127.0.0.1:8788 node tools/deck-qa/qa.js`. It reports page errors,
  console errors, any response at 400 or above, how many reveals fired naturally,
  broken images, exercises an embedded quiz if `#opts` exists, and finds the element
  causing any 420px overflow while ignoring anything inside an `overflow-x:auto`
  scroller. Writes `qa-mobile.png`.
- **`tools/deck-qa/shots.js`** screenshots every section plus the full page, so you
  can actually look at what you built before Raka does.
- **Verify by cold load with error capture, never by forcing reveal state.** Forcing
  `.in` is how a completely blank deck once shipped to a client.

### Images

- **Photographs.** Unsplash is reachable. Find candidates with WebFetch on
  `https://unsplash.com/s/photos/<query>`, which returns real photo ids with alt
  text. Download with
  `https://images.unsplash.com/photo-<id>?w=1800&q=72&fm=jpg&fit=crop`. Curl the
  search page directly and you get nothing, the ids only come back through WebFetch.
- **Cropping and compression.** Pillow is installed. Crop to the aspect ratio you
  need with an anchor rather than resizing and squashing, then save JPEG at quality
  72 to 82, `optimize=True, progressive=True`. Keep a whole deck's imagery under
  about 1 MB.
- **Extracting real screenshots from a PDF.** PyMuPDF is installed as `pymupdf`.
  `page.get_images(full=True)` then `pymupdf.Pixmap(doc, xref)` pulls the embedded
  originals at full resolution, which is how the Unilever, GPay and MWX screenshots
  came out of the Astra deck. `page.get_text()` for the text layer and
  `page.get_pixmap(dpi=110)` to render a page when you need to see the layout.
  `pdftoppm` is **not** installed, so the Read tool cannot render a PDF directly.
- Note `pip install pypdf` fails in this container on a broken `cryptography`
  binding. `pymupdf` installs fine and does more anyway.

### Deploying

- Call the Netlify MCP deploy operation to get a fresh `npx` command with a
  `--proxy-path` token, then run it from a clean folder containing only what should
  ship. **The token expires**, so a `401 Unauthorized` means fetch a new command, not
  that anything is wrong.
- The folder needs `netlify.toml` with `[build]` and `publish = "."`.
- Then verify, every time, per the hosting rules below.

### Deck HTML, the architecture that works

One self contained HTML file, inline `<style>` and one inline `<script>`, plus an
`img/` folder when there is photography. No external CSS or JS.

- **Tokens on `:root`.** Ink, paper, one accent pulled from the client's own logo
  with Pillow, muted greys, a sans and a mono stack.
- **Sections alternate** dark, light, light2, so the eye gets a rhythm. A dark
  section holding a table puts the table in a white rounded box.
- **Reveals.** `.rv{opacity:0;transform:translateY(20px)}` plus `.rv.in`, driven by
  one `IntersectionObserver` over `.rv,h1,h2`. Hero lines use an `.ln>span`
  translate with staggered delays.
- **Tables must be wrapped** in `.tw{overflow-x:auto}` with `.tw table{min-width:520px}`,
  otherwise they blow out the mobile viewport.
- **Diagrams are inline SVG** with a `viewBox`, `role="img"` and a real `aria-label`.
  Give any SVG wider than the column a `min-width` and put it in a `.tw`.
- **Everything collapses to one column** under `@media(max-width:860px)`.

The gotchas that cost time on the WisTree build, all real:

- **Inserting a style block by replacing a common selector duplicates it** if that
  selector appears twice. `.shot` ended up defined twice and the second copy won.
  Anchor style insertions on something unique, and grep for duplicates after.
- **SVG text with a start anchor near the right edge clips.** Use
  `text-anchor="end"` and position from the right.
- **Images at different aspect ratios misalign the headings under them.** Fix a
  height and use `object-fit:contain` with a background, rather than letting each
  card size itself.
- **A background photograph plus a generative canvas fights itself.** Drop the canvas
  to about 0.2 opacity and push it to the edge, or lose one of them.
- **A band label placed at the same y as its boxes gets overlapped.** Lay diagram
  bands out with the label above the band, and check it rendered.

## Building a deck, everything Raka corrected across the WisTree build (2026-09-14 and 15)

One deck was rebuilt five times in two days. Every version failed on something he
had to point out, and one note he had to give **twice**. This section is that
whole audit so the next deck starts at v5 rather than v1.

### The alignment gate, before a single line of HTML

**Re read the actual thread and check the artefact answers two separate things.
What we promised to send, and what they asked for.** Those are not the same, and
v1 failed on both. Raka's question was "what did we say we want to send to karim
and what did karim say, does it align fully with what you created for the deck?"
The honest answer was no. We had promised a short deck on the scale he was
building. We built twelve sections, a third of which was an uninvited website
audit, and his actual question only appeared in section 7.

Run this before building, not after. Quote their own words back into the research
file, then check each planned section against them. A section that serves neither
the promise nor their question does not go in.

### The arc, which is Raka's and is now the default shape

Analysed, problem, prototype, infrastructure, what else we can build, who we are,
book a call. His words. A deck that only informs has failed. v2 was accurate,
narrow and sold nothing, which is its own kind of miss.

1. **What we looked at.** Their own words quoted back, and the research surface.
2. **What we found.** The problem, with the competitor or market evidence.
3. **The prototype.** The working thing, on the page, that they can use.
4. **What sits behind it.** The infrastructure, so they can see it is real work.
5. **Where else we could help.** The seeds, named concretely (see below).
6. **Who we are.** Astra, the delivery structure, real delivered work, and Raka.
7. **Next step.** One ask, and a booking link.

### Say what the thing actually is

**"Is it a dashboard, is it an app, is it a CRM or what?"** Raka, on finding
section 5 full of headings like "Capture, the expensive step". That names nothing.
A buyer cannot picture it, cannot price it, and cannot forward it to anyone.

Every offer carries a type and a plain name. Internal web app. Customer facing.
Dashboard. Email and in app. Customer portal. Onboarding flow. CRM hookup. The
worked fix, all four rewritten in one pass.

| Abstraction | What it should say |
|---|---|
| Capture, the expensive step | **Internal web app.** A review app for your team |
| Answers that show where they came from | **Customer facing.** The assistant your customers actually use |
| A knowledge map that draws itself | **Dashboard.** A dashboard the customer logs into |
| Alerts when knowledge is about to walk | **Email and in app.** Alerts when knowledge is about to walk |

The closing line names objects too, not categories. "A customer portal. An
onboarding flow. A CRM hookup so a finished check lands with the right person."

### Use images, and show what it would look like

**"Use images man!!! And also like the what else we can do make also how it looks
like!"** Stage L already said every section carries a real photograph or a real
sourced graphic. It was ignored for four versions. Three kinds of image, all of
which earned their place:

- **Real photography**, licence free, never captioned as the client's premises,
  staff or customers. The portrait guardrail in the Guardrails section still binds.
- **Real screenshots of real delivered work.** The Unilever, GPay and MWX images
  were extracted from `ASTRA_AGENCY_Deck_Short.pdf` with PyMuPDF. They turned a
  section of text boxes into actual proof. The "also by our delivery partner"
  disclosure travels with them, always.
- **UI mockups of the things we are offering to build.** Inline SVG, in the deck's
  palette, showing the actual screen. A review queue with a transcript on one side
  and drafted items on the other. An answer card with its source chips. A process
  map with criticality per node. An alert that names the step, the person count and
  the retirement window. Describing a dashboard is worth far less than drawing it.

### Language, and the note he had to give twice

**"Your language is too literate. Would you present that to someone on a deck? No.
Check your language again as if you're presenting it to an executive, because
most of them are."** The first pass at this was too gentle and he repeated the
note verbatim. Both passes are recorded here because the second caught what the
first left standing.

**Never narrate the artefact inside the artefact.** Do not tell the reader what
language something is in, that a list is below, that a section is coming, or how
we reached a decision. State the substance and stop.

| Wrote | Should have written |
|---|---|
| "The questions themselves are in German, because that is who answers them. Everything they ask about is below in English." | "Built from your own six methodology steps." |
| "What the six questions ask", over restated questions | "What it measures", over six named dimensions |
| "What the score says back" | "Where a score lands" |
| "Three calls we made" | "Three constraints" |
| "Not advice on what to build. Just the four things we would pick up first..." | Deleted. The heading already carried it. |
| "And who actually wrote this" | "Raka Mulya" |
| "Karim, you said you're building a scale that gives a first indication of knowledge fragility and compares a company against others its size." | "Karim, the scale you described has two halves." |
| "Two jobs, and they're not the same job." | "Two jobs in one sentence. The second is the one worth owning." |
| "The check is one file with no server." | Deleted. Implementation trivia. |
| "so selling something a buyer hasn't decided he needs yet is first hand rather than theoretical" | "Selling something a buyer hasn't decided he needs yet is not theory here." |

Three tells to grep for. **A heading that names a thing is weaker than one that
claims a thing.** **A sentence that tells the reader what is about to happen should
be deleted, because the next sentence is about to happen anyway.** And **a trailing
clause starting "so" or "which is" is usually the writer explaining what he just
said.**

The self check. Read every heading alone and rewrite any that labels instead of
asserts. Then read every sentence and delete any clause that would still be
obvious with it gone.

### English, always, and no error lists

**"Use English unless it's really needed in German, like the questionnaire. I
don't speak German btw."** The deck is English throughout, including every diagram
label. The only exception is a working artefact a non English speaker will
actually use, and when that happens **an English explanation sits beside it** so
Raka can read the whole thing. Concept mockups are English, because they are
sketches rather than shipping UI.

**"You don't need to show what's error like the 404s and all."** Broken links,
typos, conflicting job titles and freemail addresses do not go in a client deck.
They are research, they stay in `research.md`, and they can be handed over
separately as a favour. Putting them in front of the buyer reads as a telling off.

### Simpler, and shorter

**"It feels so wordy and just haaard to follow, it needs to flow well."** and
**"Language man, you don't need to over complicate things."** v3 was 2,472 words.
The version that shipped was about 1,600. One point per section, one idea per
paragraph, and the diagram carries what a paragraph would otherwise argue.

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

## Pulling data cheaply, the patterns that actually work

- **Picking a batch.** `search_campaign_leads` with `campaignId` and a `limit`
  returns a lean row at roughly eighty tokens. A hundred at a time is affordable.
  The heavy record with `companyDescription` comes back only per single lead by id,
  so spend that on the ten you chose.
- **Resolving a name with no id.** Do not paginate `search_campaign_leads`. Call
  `get_inbox_conversations` with `listId: "sentOnly"` and `search: "<full name>"`.
  One small response gives `contactId` and the LinkedIn URL, and `lastRepliedAt: null`
  beside a `lastSentMessagePreview` that is still the connect note proves the row is
  genuinely Silent accepted.
- **`contactId` is what `send_message` needs**, never `leadId`.
- **The list endpoint cannot tell you what a thread contains, and its preview can be
  flatly wrong.** It exposes only `lastSentMessagePreview`, and on 2026-09-16 that
  preview showed the generic **connect note** for Carolien Leeraar, Andy Tidd and
  Patrick Killeen while each thread actually held a full researched opener sent
  afterwards. Triaging from the list alone would have re messaged all three as
  though they had never been contacted, which is the one outreach mistake with no
  recovery. Any claim about history, and every follow up count, needs
  `get_inbox_conversation` per contact.
- **There is no LinkedIn connection status field.** `get_contact_fields_schema`
  returns none, standard or custom, so acceptance is not stored on the contact and
  **`sentOnly` mixes accepted contacts with invitations nobody has accepted yet**.
  The newest rows there are almost always the invite step firing, not new accepts.
  Checked 2026-09-16, Özgül Atay and Chris Berry both sat at the top of the list
  with a connect note preview and **zero activities** in the thread. Ordering
  `search_campaign_leads` newest first does not help either, that returns fresh
  imports with empty activities.
- **An empty `get_inbox_conversation` is genuinely ambiguous.** The connect note is
  not always written as an activity, so empty means unknown, never "pending" and
  never "nothing was sent". Say unknown rather than guessing.
- **`aiLeadInterestLevel` is a reading priority hint, never evidence.** It is the AI's
  read of one reply, and it is absent on any message that was not scored.
- **Fetch failures are UNKNOWN and retryable**, never "no angle". Retry with the
  render pipeline, mirror the HTML and assets and screenshot the local copy offline.

## Astra Agency, the company itself (from the official deck, given by Raka 2026-09-15)

Source: `ASTRA_AGENCY_Deck_Short.pdf`, 7 pages, the deck Astra actually sends
to prospects. Everything in this section is transcribed from it, not inferred.
This is now the source of truth for who Astra is, what it has delivered, and
who the named contact is. Where it and `docs/astra-master-context.md` disagree,
the disagreements are listed at the end of this section rather than silently
resolved.

**Identity and strapline.** ASTRA AGENCY. "Boutique digital & innovation
partner for Dutch businesses." Strapline **"Grow. Optimise. Innovate."**
Sub-line "Helping SMEs and agencies grow, optimise, and innovate with tailored,
affordable digital solutions." The cover credits **"JM Ventures x Amwisesa"**,
so Astra is a joint venture between those two entities and not a single shop.
The wordmark is ASTRA over AGENCY with a four-point star glyph between them.

**Mission.** "Helping businesses thrive through **tailored** and **affordable**
digital and innovation solutions."

**Vision.** "Becoming the **go-to** digital and innovation agency for Dutch
businesses that are not usually covered by the mainstream market."

**The five values, exactly as worded.** Trustworthiness. Craftsmanship.
Partnership. Transformation. Premium.

### The two-sided structure, which is the thing to actually understand

**Your boutique partner in the Netherlands.**
- ASTRA AGENCY is a boutique digital and innovation agency based in the
  Netherlands.
- "We speak your language", Dutch business context, Dutch/English
  communication.
- "We help you scope, prioritise and manage projects end-to-end."

**Our development powerhouse in Indonesia.**
- The delivery partner is named **Amwisesa** and has **10+ years of
  experience** building:
  - Web and mobile applications
  - Warehouse, franchise, retail and F&B management systems
  - Clinic, spa, fleet and leisure/park management platforms
- "Senior development teams in Indonesia, managed by ASTRA AGENCY in NL."

**The closing promise on that page**, which is the single best line for
outreach: "You get **Dutch project management and strategy**, with **proven
international development capacity**."

This matters commercially. Astra is not a freelancer and not a big agency. It
is Dutch strategy and project management in front of a senior offshore build
team with a decade of real systems behind it, which is exactly how it can hold
the "tailored and affordable" line without lying. When a lead needs to know we
can actually build the thing, this structure is the answer, not a credential.

### What we do, as the deck words it

Sub-line: "**Three** clear packages, **transparent** pricing ranges and one
trusted NL **point of contact**."

- **Grow Your Business.** "Customer-facing websites, portals, as well as
  **branding and social media strategy** that actually support sales."
- **Optimise Your Business.** "Internal tools, workflows and management
  systems that reduce manual work and costs."
- **Innovate Your Business.** "Sprints, roadmaps and **build squads** to turn
  ideas into tested concepts and real products."

### Selected work, and exactly how it may be described

The page is headed **"Selected Work (also by our delivery partner)"** and
"A few examples of what has been delivered so far". That parenthesis is a
disclosure and it must survive into anything we write. These are Amwisesa
deliveries as much as Astra ones, so **never present them as "our clients" or
as work Astra NL did alone.** The honest phrasing is "delivered by our
development partner" or "from our delivery partner's portfolio".

| Project | Described in the deck as |
|---|---|
| **Unilever 1001 Ramadhan Inspiration, Website Development** | "Handling 48 brands from Unilever to deliver innovative mobile & website interface." Screenshot shows a content and promo portal with login. |
| **GPay App** | "Building a mobile application system to drive customers to purchase with promotions." Screenshots show a wallet, balance, top up, transfer, cash out, bill payment and a cashback and points checkout. |
| **MWX AI Market** | "Developing web3 with interoperable blockchain protocols that can be used for SMEs." Screenshot shows an AI guided marketplace with priced product cards. |

This is the first real proof of delivery in the repo. Until now the only
buildable evidence we had was prospect prototypes we sent unrequested, which
are **not** client work and must never be described as such. Unilever, GPay
and MWX are the genuine article and can be named, with the delivery partner
disclosure attached.

### Is ASTRA AGENCY for you, the qualification page

**Good fit if:**
- You are an SME or mid-market organisation (or a busy agency / solo dev) with
  real customers.
- You feel the pain of manual work, outdated systems or a weak digital
  presence.
- You have ideas but limited internal capacity to scope and build them.
- You are ready to invest roughly **€5k to €50k** (or a matching monthly
  budget) to actually move forward.

**Probably not a fit if:**
- You just want a €999 template website.
- You do not have anyone internally who can own the project.
- You want everything "tomorrow" without touching your processes.

That "not a fit" list is a gift for outreach qualification. A lead with nobody
internal to own the project is a lead we should not be building a prototype
for, and it belongs in the Stage K pre-build gate reasoning.

### The next steps, the deck's own three-step close

1. **Free intake call (30 to 45 minutes).** "We walk through your business,
   challenges and ideas."
2. **Match with a starting point.** "This could be a Workflow Booster (O1), a
   Grow package, or an Innovation Sprint (I1)."
3. **Clear proposal.** "You receive a clear scope, pricing and timeline. No
   surprises."

Closing question on the page: "Interested in exploring a project together?"

### The named contact, which is NOT Raka

- **Joshua van Zeelt, ASTRA AGENCY**
- Email **josh@astraagency.nl**
- Phone **+31 6 26393388**
- LinkedIn **https://www.linkedin.com/in/joshua-van-zeelt/**
- The domain is therefore **astraagency.nl**.

Raka's LinkedIn lists him as **Advisor, Astra Agency**, and his own framing is
"helping my sister and my friend with starting their digital agency" (see
`docs/astra-master-context.md` section 2A). Joshua is the person on the deck.
So when outreach says "I run Astra agency", that is Raka's own chosen wording
in the opener template and stays as he wrote it, but **do not put Joshua's
contact details into a LinkedIn message from Raka**, and do not invent a title
for Raka that the deck does not give him. If a lead asks who else is involved,
the honest answer is a Dutch partner plus the Amwisesa delivery team.

### Where this deck and `docs/astra-master-context.md` disagree

Flagged, not resolved. A live correction from Raka outranks both.

1. **Three service lines or four.** The deck presents **three** ("Three clear
   packages") and folds **build squads inside Innovate**. The master context
   section 4 presents **four**, with Build Squad / Agency Partnership as its
   own proposition, and CLAUDE.md tells us to pitch Build Squad to builders,
   consultants and technical founders. Keep using four internally for angle
   selection, because that guidance is Raka's and is more recent, but know that
   the client-facing deck says three.
2. **Dutch or not.** The deck says "for **Dutch** businesses" three times, in
   the cover, the mission and the vision. CLAUDE.md records Raka's 2026-09-13
   instruction that **"The ICP is not a country"** and that picking Dutch leads
   preferentially is lazy selection. Raka's live instruction wins for choosing
   who to message. The deck's Dutch framing is still the right framing for a
   Dutch lead and should not be quoted at a German, French or Canadian one.
3. **Pricing.** The deck gives one public band, **€5k to €50k or a matching
   monthly budget**. The master context section 5 carries the detailed package
   table (Grow A through C, Optimise O1 through O3, Innovate I1 through I3,
   Build Squad at €10,000/mo). The detailed table is still internal and still
   "confirm before quoting". €5k to €50k is the only number that is already
   public, so it is the only one safe to state without checking.
4. **Named delivered work.** The master context had no client list. This deck
   supplies one. Use it, with the delivery-partner disclosure.

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
