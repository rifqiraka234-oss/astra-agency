# RULES. The operative card.

**This file outranks every other document in the repo except a live instruction from Raka
in the current conversation.** Where any other doc disagrees with a number or a ban here,
this file wins and that doc is wrong and should be corrected.

It exists because the rules were spread across fourteen documents totalling about 139,000
tokens, the same ban was restated in twenty places, and three documents gave three
different word ceilings while two of them each claimed to outrank the other. A rule nobody
can find is not a rule.

**Read this in full. It is the only doc that has to be read in full every session.**
Everything else is reference, opened when the task needs it.

---

## 0. The gate that comes before everything

**Never send, ship or state as true anything you have not checked on this pass.** Three
checks, and they are three different ACTIONS, not three readings.

1. **Source.** Reopen the thing. The URL, the thread, the file. Not your notes on it.
2. **Opposite.** Actively try to prove the claim FALSE. Open the page that would disprove
   it. Open the href, not the label. Recount the number on the page it came from.
3. **Independent.** Confirm a second way that does not share a failure mode with the first.
   A screenshot against a grep. A thread pull against a state file. Two results from the
   same tool are one check, not two.

**Absence claims ship with a positive control.** "There is no X" is worthless until the
method has been shown to find X when X is there. `tools/site-audit.js` now does this
automatically and prints VOID when its own detector fails.

**Evidence ranking. Never skip a rung upward.**

1. The live page or thread, opened now. A screenshot for anything visual or about emptiness.
2. The statutory record. Companies House, KVK, Bundesanzeiger, KBO, Infogreffe, the Impressum.
3. A raw tool response read in full, not its summary.
4. My own state files and notes. A CANDIDATE list, never proof of what happened.
5. My own memory. Not evidence, ever.
6. A summary written after a context compaction. The least reliable thing here, because it
   is a lossy compression of rung 5 that carries conclusions with the evidence stripped off.

**Being lazy is prohibited.** If a tool, an API call or a fetch can settle it, it settles
it. Token cost is never a reason to skip a check. An inference that turns out right is
still a process failure.

**Nothing crosses a context compaction without being reopened.** A draft is copied from
its file byte for byte, never retyped. A count is rebuilt from the system of record until
the arithmetic closes. "We already checked that" is the most dangerous sentence there is,
and if the check is not in a file it did not happen.

**Three sentences you may never write.** "Your website isn't working." "Your page is
empty." Anything you did not open, fetch, count or click on this pass.

### 0A. The unloaded screen (Raka, 2026-09-22)

**Our reader failing to load something is never evidence about their site.** This has now
nearly shipped twice. Chromium reported HTTP 415 on six of nine images on `dariuz.nl` and
a message saying six of nine images were broken was one step from being sent. Direct curl
returned `200 image/png` for the same files. The same URL returns an image, a 415 or an
HTML page depending only on the `Accept` header we send. Separately, `dialogue.earth`
returned 403 on every attempt, and Raka's own screenshots show a full, modern, 20 year old
newsroom with a live story grid.

**`node tools/site-audit.js` now re-fetches every failed same origin asset through a
second independent path and prints `RENDER NOT TRUSTED` when the failure turns out to be
ours.** When that fires, **every visual, asset, layout, breakage and emptiness finding in
that run is void, and the screenshots are unusable for that site** because they are missing
real assets. Do not reason around it. Do not "just check the screenshot", the screenshot is
the thing that is wrong.

**The second render path exists, so use it before blocking (2026-09-23).** On wlfm.de,
Chromium alone failed 16 requests with `ERR_TOO_MANY_RETRIES`, a proxy fault. Rendering with
every wlfm.de request served by curl gave 63 served, 0 errors and a page that could be read.
Undecoded images in that render can be lazy loading or hidden slides, never a finding alone.

**The three states, and only one of them lets you write a sentence.**

| State | What you may say |
|---|---|
| Rendered, guard quiet, screenshot opened | Describe what you saw |
| `RENDER NOT TRUSTED` | **Nothing yet.** Run `node tools/render-via-curl.js <url> <tag>`, the second render path, which serves every request to their own host through curl. If it reports **0 curl errors**, read every part it writes and describe what you saw. If not, `BLOCKED_NEEDS_INFO` and Raka opens it |
| A bot wall or a 403 | **Nothing, in either direction.** Row is `BLOCKED_NEEDS_INFO` and Raka opens it |
| Asset failed here **and** failed the independent re-fetch | It is theirs, and still open the screenshot before writing it |

**A blocked page is not a weak page.** A wall, a challenge, a timeout or a void render says
we could not look. It never says the site is thin, dated, broken or empty.

### 0B. Presumption (Raka, 2026-09-22)

**A field in lemlist is a claim, not a fact, and it is often stale.** Two of the five leads
in the first batch had wrong company data and both would have produced an embarrassing
message.

- **Adrian Steele.** `companyName` Mercian Labels, `jobTitle` Director. He had **sold the
  company and resigned**, per Companies House. His own tagline said "Former Owner".
- **Romain Coquio.** `companyDomain` `carrefour.fr`, a multinational he does not own, while
  his tagline named a different employer.

**So before any research, reconcile the record against itself.** It costs one read and it
catches this class of error before a single page is fetched.

1. **Read the tagline against `companyName`.** They disagreed on both failures above, and
   in both cases the tagline was right. "Former", "ex", "previously" and a different
   employer name are all stop signs.
2. **Separate the business they OWN from the job they HOLD.** `jobTitle` naming a different
   company than `companyName` means stop and resolve it. Tim Balogun's said "Founder -
   London Makers" against `companyName` HF Mencap, and the answer was that London Makers is
   a programme inside HF Mencap and he is its CEO.
3. **Confirm the domain is actually theirs.** A corporate or franchise domain is not the
   lead's website and cannot be rebuilt by them.
4. **For any owner or founder claim, check the statutory record** before building an angle
   on it. Companies House, KVK, societe.com, the Impressum. It outranks lemlist every time.

**If the record cannot be reconciled with evidence, the row is `BLOCKED_NEEDS_INFO` and
stays untouched.** Never pick the plausible reading.

---

## 1. Sending

**Every outward message needs Raka's explicit word, every time.** Editing instructions are
edits, not authorisation. "Make it English", "shorter", "less cheesy" all mean redraft and
show again. A batch approval covers that batch only and never rolls forward.

**LOAD THE WHOLE CHAT BEFORE ANY MESSAGE. MANDATORY, no exceptions (Raka, 2026-09-21).**
Before a nudge, a reply, a follow up, a delivery or any next message to anyone, load
**every message in that thread, in both directions, ours and theirs, from the very first
one.** Not the last message. Not the preview. Not what a state file says. Not what a
summary of an earlier session says. The whole conversation.

**The mechanics, verified today, and there is a trap in them.**
`get_inbox_conversation` returns **newest first**, **ten per page**, and `limit` is hard
capped at 10, so a `limit` of 50 is refused. **Any thread longer than ten messages
therefore hides its own beginning on page 1.** Page through with `page` until
`pagination.nextPage` is null, and check `pagination.totalItems` against what you actually
read.

**This is about to bite.** Niklas Hanf's thread sits at exactly 10 activities right now.
The next message in it pushes it to 11, and from that moment page 1 no longer contains the
connect note or the start of the conversation.

**Why it is mandatory rather than advisable.** The beginning of a thread holds what was
promised, what was already offered and declined, and what we swore we would not do again.
Michele Legoratto and Antanas Juodiskis were both told in writing that a message was the
last one. Jack Coulthard was told "one more nudge and then I will leave it be" and then
nudged again ten days later. Every one of those is invisible from the last message alone.

**Before any send, in order.**
1. **Load the whole thread, paged to exhaustion**, immediately before sending. Not the
   preview, not a bulk activities pull, not a state file. If a real message exists, this is
   a Stalled lead and it does NOT get a cold opener. If a closing nudge was sent, or we
   promised to stop, **the thread is finished and gets nothing.**
2. Copy the text out of the drafts file verbatim. Never compose at send time.
3. Send with `contactId`, channel `linkedin`, `sendUserId: usr_27bdxG7jzTn2rucGB`.
4. Re-pull the thread to confirm it landed.
5. Write the queue row in the SAME commit as the send, with `domain`, `openerText` in full
   and a `claims` list each written so a later session can re-test it.

**Also Raka's call, never yours.** Flipping a campaign to running. Deleting anything.
Quoting outside the public 5,000 to 50,000 euro band.

---

## 2. The message. One number per rule.

**Opener length is 90 to 145 words.** This supersedes the 65 word ceiling in
`docs/enrichment-pipeline-spec.md` and `docs/astra-master-context.md` section 9, and the
90 to 150 general guidance in that same doc. Those three numbers contradicted each other
and two of them each claimed precedence. **90 to 145 is the number.** The floor came down from 100 on 2026-09-22, because the plain block one removes about fourteen words from every opener and the substance now sits in blocks two to four. The roast register
may run to about 180 because the evidence is the joke.

**The opener template. THE first message, Raka's, adopted 2026-09-22. Filled EXACTLY.**
Only the brackets change. Everything outside them is fixed wording. He rejected a version
that added a clause to block two and reworded the brand line.

```
Hi [name], saw [company], looks interesting!

However, your [surface] is [the critical flaw]. This causes [stakeholder] to [impact].

I run Astra agency. We build [xyz] for brands like Unilever, AXA, Pertamina. I [proof].

Shall I build the [thing] so [stakeholder achieves goal], and send it over?
```

**Full spec in `docs/opener-template.md`, read it before drafting any opener.** It lists
the eleven inputs, the source for each, the rules block by block, the research that fills
the flaw, how to match the proof, and what to do when the template cannot be filled. The
short version.

- **Block two is exactly two sentences.** One or two flaws, overarching across every page,
  critically poor, and it must pass the positive control, render trust, the tweak test and
  the red team. Then `This causes [stakeholder] to [impact]`, and **the impact is aimed at
  their MOST CURRENT goal**, found and dated by research, never a timeless generic cost.
- **The current goal is INFERRED from linked clues, never read off one source (Raka,
  2026-09-22).** Open all eight clue sources, starting with the lead's own lemlist `jobDescription` and `summary`, in `docs/opener-template.md` section 3A, the
  whole site and newsletter, company LinkedIn posts, the owner's own pages, job openings
  read in full, and a web and news search of the company and the owner. Write each clue
  with its URL and date, link two or more that agree, try to break it, grade it. **The
  clue never appears in the message.** No "I saw you're hiring", only the consequence.
- **No website at all, and only once that is earned by search**, block two becomes one
  sentence, "I couldn't find your website, and that [impact to their most current goal]." 
- **The brand line is fixed text.** "Unilever, AXA, Pertamina", never reworded or trimmed.
- **One proof, and it carries the argument.** The experience AND why it bears, in one line.
- **Block two's stakeholder is block four's stakeholder**, and block four's thing fixes
  block two's flaw.

**Hard bans in outreach prose.** No colon character anywhere. No em dash, en dash or
hyphen, with one exemption, a hyphen inside a real proper noun such as Mercedes-Benz or
Witt-Dörring. Exactly one exclamation mark and it lives in block one. Contractions must be
present. English always, whatever language the lead or their site is in.

**Tag every draft with its shape, in the heading above the fenced block.** One of
OPENER, REPLY, NUDGE, CLOSER, BOOKING, DELIVERY or CORRECTION. The tool reads the tag and
applies that shape's rules. **An untagged draft is treated as an OPENER**, which is how
35 perfectly good replies got reported as gate failures on 2026-09-22 and several were
mangled into four block openers to satisfy rules that never applied to them. A reply is
not an opener. A correction may quote the accounts it is retracting.

**Run `python3 tools/check-drafts.py <file>` before showing any batch.** It exits non zero
on failure. It covers every mechanical rule above plus pass 4 across the batch. Passes 1,
2 and 3 stay human, read it aloud, check the credential is the reason we can do the offer,
check block four names a thing.

**The five other shapes**, each with its own rules, all in `CLAUDE.md`. Reply variant.
Nudge, the only place an emoji is allowed. Closing nudge, the only place urgency is
allowed. Artefact delivery. Never resend a URL to someone who already has it.

---

## 3. Research

**Order.** The person first, never the company's HTML. What are they measured on. Separate
the business they OWN from the job they HOLD. Pull the statutory filing. Then the site,
rendered and LOOKED at before any grep. Then the impact on that person's number. Then
widen only if the site is genuinely fine.

**Reconcile the lemlist record against itself before fetching anything.** Section 0B. The
tagline against `companyName`, the business owned against the job held, and the domain
actually being theirs.

**Run `node tools/site-audit.js <url> <tag>` and open BOTH screenshots.** If it prints
`RENDER NOT TRUSTED`, stop, the run is void and so are the screenshots. See section 0A. The five angles
are dated looks, stack and social, GDPR, a shortcoming against their target, and
certificates. Order of force is usually 4, 3, 1, 2, 5.

**Before ANY absence claim about a website, run a plain web search for the company's own
site FIRST (Raka, 2026-09-22).** Relatiq was one approval away from a message saying the
company had no website. Five DNS paths agreed `relatiq.nl` had no A record, and a search
returned `www.relatiq.nl` with detailed content only a crawler that read the page could
have, calendar integration and named customer types. A search is the cheapest way to find
a site and it was the one thing never run. Also checked in that pass, `relatiq.app`, which
is a different company entirely, a consumer app that reads your texts for attachment
styles. **A plausible TLD is the wrong domain trap wearing a new hat.**

**Never guess** a domain, a nav path or a social handle. Take every URL from their own HTML
or a search result, then fetch it and confirm the page names the right company.

**A link to a bare platform homepage is not a social presence.** It is an unconfigured
theme placeholder. The audit tool now shouts about this.

**A fetch failure is UNKNOWN and retryable, never "no angle".** A TLS error seen through
our proxy is never evidence about their certificate. Always load a control host through the
same path in the same minute.

**No manufactured pain.** `NO_STRONG_ANGLE` is a real, correct outcome. Climbing the so
what ladder means tracing a verified defect to its real consequence, never inflating a
small true thing into a big false one.

**The tweak test.** If their existing web person could fix it in an afternoon, it is a task,
not an angle. Use the defect as proof and sell the structural thing behind it.

**Money figures. The general numbers rule is SCRAPPED (Raka, 2026-09-22).** Do not put a
figure in a message to make it feel researched, to set a scene or to show we did the work.

**The only number allowed is one that quantifies what they are forgoing, losing or being
hurt by.** His words, "only numbers rule IF WE WANT TO CALCULATE HOW MUCH OF [METRIC] ARE
THEY FORGONING/LOSING/HURTING". Everything else comes out.

This is tighter than what it replaces and it would have stopped the error that caused it.
The Hounds for Heroes message carried £255,378 of fundraising spend and a £76,600 deficit.
Neither was a loss we were quantifying, both were context, so both now fail on sight.

- **Never from filed accounts, a balance sheet or a statement of financial activities.**
  A line in a financial statement is a label over a breakdown and the breakdown is the
  source. We read "raising funds" as money spent driving people to a donate page. Note 7
  said 88 percent of it was staff and support costs and the advertising line was £14,142.
  We read "donations and legacies" as donate page income. Note 3 said £258,203 of it was
  legacies. The arithmetic closed perfectly, which is exactly what made it feel checked.
- **Inputs stay theirs and published**, a price list, a rate card, their own headline.
  Show the sum. Anchor deliberately low. Never model a conversion rate, a traffic figure
  or a margin.
- **Never quantify a credibility, positioning or brand problem.** No honest figure exists
  behind one.
- **`tools/check-drafts.py` enforces this.** Any currency figure fails the batch unless
  the drafts file carries a `LOSS FIGURE` block naming the metric being lost and the
  source of every input, and it hard fails any figure sitting next to accounts language.

---

## 4. lemlist

**Full field map in `docs/lemlist-field-index.md`, section 1 is a reverse lookup.**

The four that cost us leads.

- **Acceptance is `channelMetrics.linkedinInvitationAccepted` and the
  `linkedinInviteAccepted` activity.** Never a timestamp heuristic.
- **`lastSentMessagePreview` lies.** It has shown the connect note at the exact second a
  real opener went out. Only `get_inbox_conversation` per contact is reliable.
- **`get_inbox_conversation` is capped at 10 per page, newest first.** `limit` above 10 is
  refused. **Page until `nextPage` is null**, or a thread over ten messages will hide its
  own beginning, which is exactly where the promises live. See section 1.
- **The activities endpoint is reliable for acceptances and NOT for sends.** It silently
  omits real messages.
- **Names are abbreviated** to an initial. Key on `contactId` or `linkedinUrl`, never a name.

---

## 5. Building

Read Stage L of `docs/prototype-build-spec.md` before any build. Verify by cold load with
error capture, never by forcing reveal state. Every image fetched and byte matched. Every
section screenshotted and actually looked at. Never caption a photograph as the client's
premises, staff or customers. The delivery partner disclosure travels with Unilever, GPay
and MWX, always.

---

## 6. Where everything else lives

| Need | File |
|---|---|
| Operating procedure, all five message shapes, the corrections history | `CLAUDE.md` |
| Which lemlist field answers which question | `docs/lemlist-field-index.md` |
| How to research a prospect to the evidence standard | `docs/astra-prospect-research-master.md` |
| Choosing the angle, the G/O/I/B library | `docs/astra-commercial-angle-master.md` |
| Business identity, ICP, pricing, Raka's credentials in section 2A | `docs/astra-master-context.md` |
| How the writing must read | `docs/writing-standard-anti-ai.md` and `docs/NO-AI-SLOP.md` |
| Build and craft bar | `docs/prototype-build-spec.md` plus its round 3 addendum |
| The three pipelines | the enrichment and inbox triage specs |
