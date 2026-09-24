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

**Two more mandatory checks before any send (Raka, 2026-09-24).**

**A. We have never messaged this person before, checked four ways, not one.** His words, "before
sending the message mandatory to check that we haven't messaged to them before". One empty thread
isn't enough, because the same person can sit under a second contact, in another campaign, or in
an email thread.
1. `get_inbox_conversation` on the `contactId`, paged to exhaustion. Only the connect note may be
   there for an opener.
2. `get_inbox_conversations` with `search: "<full name>"` and again with the company name, no
   campaign filter, to catch a duplicate contact. Pull the thread of every hit.
3. `search_campaign_leads` with the `leadId` and `include: ["campaigns"]`, to see every campaign
   they're in, and pull the thread under any other contact it shows.
4. grep every state file, `silent_accepted_queue.jsonl`, `prototypes.jsonl`,
   `inbox_digest_log.jsonl`, `drafted_*.md`, `logs/`, for the name, the company, the
   `contactId`, the `leadId` and the LinkedIn slug. A SENT row anywhere stops the send until
   it's explained.
A positive control in the same minute, a thread known to be full coming back full.

**B. Every source the message rests on is reopened and still true.** His words, "mandatory to
check the sources again used in the message to be true, the inference may not be 100% true but
as long as the sources are true." Split the message into its FACTS and its INFERENCE.
- **Facts** are anything the lead could check, what their site says or doesn't say, a product
  name, a language, a post, a number, a date. Each one is reopened at its source in the minutes
  before sending and has to hold exactly as written. One fact that fails stops the send.
- **Inference** is the "This causes" and "Especially" reasoning, what we think it costs them. It
  can't be proven and doesn't need to be. It does need to follow from facts that are true.
- The gate's `claims` field lists every fact with its source URL, and the send record says
  when each was reopened. Lasse's PULSE claim failed exactly here and wasn't sent.

**Before any send, in order.**
0. **Checks A and B above.** Both, every time, written into the send record.
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

**Opener length is 95 to 170 words since 2026-09-24**, when Raka added block three and shortened block five. Before that it was 90 to 145, and the rest of this paragraph is that history. **Opener length was 90 to 145 words.** This supersedes the 65 word ceiling in
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

Especially, when you are [current goal, actions, company direction], the [problem growing bigger in the long run].

I run Astra agency. We build [xyz] for brands like Unilever, AXA, Pertamina. I [proof].

Shall I send you over what the [thing] looks like?
```

**Block five shortened by Raka, 2026-09-24**, "the cta should be shorter". It names the thing and
nothing else. The goal lives in block three, so it isn't repeated.

**Block three added by Raka, 2026-09-24.** One sentence. Where the company is heading now,
then the SAME block two problem getting bigger as they go there. Five blocks, always.

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
- **Block five's thing fixes block two's flaw** and serves block three's goal.

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
check block five names a thing.

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
premises, staff or customers. The partner disclosure travels with every partner project,
worded "Built by Amwisesa, Astra's development partner" (Raka, 2026-09-23). Before a site
plus deck job for a lead, read the SotoCat section at the end of `docs/build-and-deck.md`.

---

## 4A. Finding the angle. The biggest pain, not the first flaw (Raka, 2026-09-22 to 24)

Everything Raka said while working Ferry de Haas and the batches before him, in one place. The
detailed method is in `docs/opener-template.md` sections 3A and 3B. These are the rules.

**The principle, in his words.** "People pay for people who solve problems that are big and
painful." A broken button is real and small. **The angle is the biggest proven pain the owner has
right now, and we lead with it.**

1. **Look at four levels, every lead.** Him, his company, his region, his industry. Pain can sit in
   any of them. Ferry's biggest pain wasn't on any website, it was customs, every parcel to the US
   charged duties since Aug 2025 and new EU rules since Jul 2026, landing on a one man business.
2. **Research past the website.** Efficiency, regulations, costs, capacity, competition, hiring.
   **Astra builds apps and internal tools too**, not only websites, so a pain we fix with a tool is
   as good as one we fix with a page.
3. **Clues, then inference, never the clue in the message.** Read every source through fully, the
   whole site and newsletter, company LinkedIn posts, the owner's own pages, job ads in full, news
   on the company and on the owner, and the lead's own lemlist `jobDescription` and `summary`.
   Link them. A social media manager hire means expanding. A marketer who needs web design skills
   means the website needs changing. Sales hires plus partnerships means growing fast. **Say the
   consequence, never "I saw your job ad".**
4. **Put every pain in one table and judge it.** How big for him, how current, how well proven,
   can we build for it. The winner is the biggest one that's proven, not the easiest to spot.
5. **Frame the cost for who he is.** An incumbent, not technical owner, a logistics man, won't
   notice leads leaking through a web form. Say what it costs him in his own terms, hours, lost
   customers, stuck shipments.
6. **Use more sources when it matters, and check the numbers at source.** The trade association
   (evofenedex for Dutch logistics), the regulator or chamber (KVK), the supplier itself (DHL's own
   page), the statutory record. When two searches disagree on a number, open the source. A US
   tariff came back as 15% in one snippet and 10% in another, KVK settled it at 10%.
7. **Check nobody already solves it for him.** His franchisor, his supplier, his platform. Before
   pitching a customs tool to an InXpress franchisee, check what WebShipX already does.
8. **For a franchisee, the brand's site is his website.** It's what his customers see. Roast it
   like his own, every page. The offer is the thing he can own, like his local page or a tool.
9. **Biggest AND costliest, because that's what he'll pay to fix (Raka, 2026-09-24).** His words,
   "We always wanna angle out with the biggest and costliest pain points because that means
   they'd pay for us. If it's just a tiny fix then they're not gonna buy it." Same rule for website
   work and for apps and tools. The pain table gets two more columns, every lead.
   - **What it costs him in a year, in his terms.** Orders lost, a crew short, hours burnt, a
     market shrinking under him. Use his size from the register (staff, balance sheet) and the
     industry's own numbers. Internal estimates are labelled as estimates and never go in the
     message as a figure.
   - **The pay test.** Would he pay €5k to €50k to make it go away? A true flaw that's a tiny fix
     (a missing menu link, an old PDF, a cookie banner) fails even when it sits on his goal. A
     tiny flaw is only usable as the visible symptom of a costly pain, never as the pain itself.
   - **The impact sentence names the cost, not the inconvenience.** "Makers abroad can't read it"
     is an inconvenience. "The orders German makers are cutting stay lost" is a cost.
   - **If the only proven pain is small, the verdict is NO_STRONG_ANGLE**, however true it is.
   - **Report the table to Raka with the cost column filled**, and say which pain is costliest
     and whether it's proven, before any draft.
10. **Every page, many sources, judged as a whole (Raka, 2026-09-24).** His words, "Did you try
   to use a lot of sources?? Did you try to like read all pages of the website and analyse the
   whole thing as a whole instead of just one fix??" The first batch 6 pass read four pages of each
   site and five sources. That's not research, it's spotting.
   - **Crawl every page, and say the count.** Sitemaps, the WordPress API (`wp-json/wp/v2/types`
     shows custom types like `product`), or a link crawl for Webflow and the rest. wlfm.de was 108
     URLs including 95 products, sbzbv.nl was 32. Screenshot each page TYPE and look at it.
   - **Then judge the site as a whole.** What can each visitor do on it, a buyer abroad, a
     specifier, an applicant? What's missing across all pages, not on one.
   - **At least eight outside sources**, named in the drafts file. Statutory register and its
     history (North Data), the industry association, trade press, the company's LinkedIn, the
     owner's own pages, news on the company, their sales agent or distributors, competitors'
     sites, job boards, reviews. A walled source is written down as walled, never as empty.
   - **Break every count before using it.** "84 of 95 products have no datasheet" was wrong, the
     2023 catalogue covers 62 of them by article number. Cross check a number against every other
     place the same information could live.
   - **Report the counts to Raka** in one line, pages read and sources used.
11. **When the goal is growth, ask whether the INSIDE can carry it (Raka, 2026-09-24).** His words,
   "shouldn't scaling up their internal processes be a bigger priority? why didn't you think of
   it". On SBZ I found the goal, moving into defence, aerospace and export, and then pitched the
   website. I anchored on what I could see from outside, and the template's "your [surface] is"
   pulled me to a public page. Every time the goal is growth, run these before choosing an angle.
   - **Can they deliver more of it?** Quoting, design, work prep, planning, production, crews,
     compliance paperwork, invoicing. Where does each job queue?
   - **Who is the bottleneck?** Read the owner's own role title. Wessel's LinkedIn headline is
     "Werkvoorbereiding, planning, projectleiding/coördinatie", on top of owner, sales and the
     job ads. When sales, planning and hiring all run through one person, that person is the
     ceiling on growth, and an internal tool is the bigger sale.
   - **What changes with bigger clients?** Defence and aerospace bring bigger drawings, stricter
     documentation, security rules and longer projects. That's process load, not a web page.
   - **Internal tools are a first class angle**, quoting tools, planning boards, portals. Astra
     builds them. The flaw sentence names the process fact that's publicly true (every job custom,
     designed, quoted and planned from scratch) and the impact names the cost.
12. **The owner's own LinkedIn and posts are read by me, every lead, never handed to Raka (Raka,
   2026-09-24).** His words, "what did I tell you as well on looking on the owners linkedin posts?
   why do you keep on cutting corners?" I asked him to open Wessel's profile without trying a
   single route. LinkedIn returns 999 to WebFetch and curl, so that's the start, not the end.
   Try every route and write each result into the drafts file.
   1. WebFetch and curl on `/in/<slug>` and `/in/<slug>/recent-activity/all/`. Expect 999.
   2. A web search on `"<full name>" <company>`. The result TITLE is the profile headline, and
      it's a real clue (tier G, label it). Wessel's gave his actual job.
   3. A web search on `linkedin.com/posts <slug>` and `site:linkedin.com/posts "<company>"`.
   4. People data sites (rocketreach org chart, the company's team list) for role titles.
   5. The company page's posts through WebFetch, which does work.
   6. Instagram, Facebook, a personal site, podcasts, news quotes.
   Only when all six are written down as tried may Raka be asked, and then as "these six failed,
   can you open X", never as a substitute for doing it.

**Guardrails he added along the way.**
- **Don't overstate.** InXpress rebuilt its site and the old location links landed on a general
  page. "Your page is gone" overstated it and Raka caught it. Describe what a customer sees now.
- **Don't call a new site old.** InXpress's site was rebuilt in August 2026. It looks dated, it
  isn't old. Check the date before using the word.
- **What he calls a dated site.** "Squary, things in islands, it doesn't flow, a lot of gaps." Judge
  it from screenshots of every page, desktop and a real phone.
- **Odd findings aren't automatically the angle.** 130 casino spam posts on Ferry's own site were
  true and bizarre. Raka's call was to leave them out and roast the business. Record them, flag
  them, don't lead with them.
- **Every claim in a draft still gets reopened live in the minute before sending.**

## 4B. The research gate. Seven things, every lead, all mandatory (Raka, 2026-09-24)

His list, word for word in substance, "mandatory it always searched the website fully all
mandatory 2x and deep analyses, ensure that to check the owner's and the person we're talking
to's linkedin profile, mandatory to check the google news of the company, mandatory to check
regional and industry news of the company, mandatory to have 10+ sources, mandatory to judge and
analyse all the problems and then choose the most costly, the most hot, the most big, mandatory
to check the sources again and the thesis we're sending for accuracy and confidence."

**It is enforced, not remembered.** Every OPENER in a drafts file needs a ```gate block directly
above it. `tools/check-drafts.py` fails the draft when the gate is missing or thin, and it exits
non zero. There is no draft without a gate and no gate without the work.

1. **The whole website, twice, then a deep analysis.** Pass 1 crawls every page (sitemaps, the
   WordPress API and its `types`, or a link crawl) and reads all of them. Pass 2 reads the whole
   site AGAIN with fresh eyes and screenshots every page type, desktop and a real phone. Pass 2's
   page count can't be lower than pass 1's. Then the deep analysis, what the site does for each
   visitor as a whole, what's missing across all pages, how the business actually runs as its
   own pages describe it (quotes, delivery, terms, privacy policy, job ads).
2. **Two LinkedIn profiles, the owner AND the person we're messaging.** Often the same person,
   and then the gate says so, after checking the statutory record and the headline agree. When
   they differ (a director who isn't the owner, a son running a father's firm), both are read.
   Six routes each, RULES 4A rule 12, every result written down.
3. **Google News on the company**, and on the person. `python3 tools/news.py`, in the lead's own
   language, with its control query. An empty result only counts when the control came back full.
4. **Regional news and industry news.** The same tool runs both, their industry in their region,
   and their industry nationally. Plus the trade association and the trade press by name.
5. **Ten sources or more, across six domains or more.** Listed with URLs in the gate. Their own
   site counts once per page actually used, and a walled source is listed as walled, not as read.
6. **Judge every problem, then pick the most costly, the most hot, the most big.** The pain
   table from rule 9 with every pain found, at least three. The gate names how many were judged
   and why the winner wins, costliest, hottest (most urgent right now) or biggest.
7. **Recheck the sources and the thesis before it's shown, and again before it's sent.** Every
   claim reopened at its source, and the thesis, the one sentence we're betting on, tested for
   accuracy. The gate ends in a confidence. HIGH or MEDIUM can be shown. **LOW is not shown**,
   it goes back to research or becomes NO_STRONG_ANGLE. The Lasse PULSE claim was caught false at
   exactly this step, a 700 character read had called a bilingual PDF German only.

**The gate, copy this.**

```gate
lead: <name, company, contactId>
site pass 1: <N> pages, <how crawled>, every page read
site pass 2: <N> pages, second full read, screenshots of <page types>, desktop and phone
deep analysis: <the site as a whole and how the business runs, from its own pages>
owner linkedin: <six routes and what each returned>
contact linkedin: <same person as owner, how confirmed> | <six routes>
google news: tools/news.py <lang>, <queries and counts>, control <n>
regional news: tools/news.py <query>, <what came back>
industry news: tools/news.py <query>, <what came back>, plus <association or trade press>
sources:
1. https://...
(10 or more, 6 or more domains)
pains: <n> judged, <list>
chosen: <the pain>, <costliest | hottest | biggest>, <why>
claims: every FACT in the message, one per line, fact then source URL. Inference is not listed
recheck: every claim reopened <time>, thesis confidence <HIGH | MEDIUM>
```

**Report the gate to Raka in one line per lead**, pages read twice, profiles read, news checked,
source count, confidence. Say which item was walled and what was tried.

## 5A. Reporting to Raka. Plain words first (Raka, 2026-09-23)

His words, "whats the angle with ferry again? i dont get it. can you in general make things
more easier to understand". The Ferry write up was accurate and he still couldn't follow it,
because the point was buried under REST endpoints, author ids and render paths.

**Every lead in a report starts with the angle in one or two everyday sentences**, the way you'd
say it out loud to a friend. What the business is, what's wrong, why the owner would care.
"Ferry runs an express shipping business. Someone's been secretly adding casino articles to his
website, 130 so far. A customer who Googles him could find gambling pages with his name on them."

- **No jargon in the report.** Not render, REST API, 503, positive control, contactId, WP user
  id, curl, proxy. Say "our browser couldn't load it" or "I checked it a second way". The evidence
  still gets done in full and written into the drafts file, where it belongs.
- **Say what you did in one line, not the method.** "Checked three ways" beats a paragraph on
  which tools.
- **If the angle is weak or odd, say so plainly and first**, before the draft.
- **The same test applies to the message itself.** If Raka can't understand it, the lead won't.
  Plain words in the brackets, no clever phrasing.

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
