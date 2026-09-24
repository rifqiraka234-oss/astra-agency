# The opener template. What it needs, and the rules for every slot.

**Raka's template, adopted as THE first message on 2026-09-22.** It replaces every earlier
opener shape. First sent in this form to Daan Erisman at tuftuf, 2026-09-22 19:15:48Z.

**It is filled exactly as written.** Raka rejected a version that added a clause to block
two and reworded the brand line, with "follow the fucking template i gave you". So the
wording outside the brackets is fixed. Only the brackets change.

```
Hi [name], saw [company], looks interesting!

However, your [surface] is [the critical flaw]. This causes [stakeholder] to [impact].

I run Astra agency. We build [xyz] for brands like Unilever, AXA, Pertamina. I [proof].

Shall I build the [thing] so [stakeholder achieves goal], and send it over?
```

The reference filled example, as sent.

```
Hi Daan, saw tuftuf, looks interesting!

However, your site is two pages with not a single photo of the room. This causes event planners booking for forty to two hundred guests to pick a venue they can actually see.

I run Astra agency. We build websites for brands like Unilever, AXA, Pertamina. I built a food brand from zero with my family and ran the inventory, so I know what an unsold night costs.

Shall I build the private events page so planners can see the room they're booking, and send it over?
```

### The no website variant, block two only (Raka, 2026-09-22)

When the lead genuinely has no website, block two is replaced with his exact words, one
sentence.

```
I couldn't find your website, and that [impact to their most current goal].
```

Everything else in the template stays as it is. It runs shorter, so its word floor is 70 rather than 88. **It is only used when "no website" has been
earned**, which after Relatiq means all of these, written into the queue row's `claims`.

1. **A plain web search for the company's site**, run FIRST, returning nothing live that is
   theirs. A search index entry that cannot be opened at source does not count as a site.
2. **lemlist's `companyDomain` fetched**, and it does not load, with a control host loading
   through the same path in the same minute.
3. **Every plausible other TLD checked and confirmed to be a different company or empty.**
   For Relatiq, `.io` was a data product, `.co` a LinkedIn CRM, `.app` a texting app.
4. **Their own LinkedIn company page or other profiles checked for a website link**, where it
   can be read.

If any of those turns up a site that is theirs, it is the normal template with that site.

---

## 1. The eleven inputs, where each comes from, and what goes wrong

You cannot fill a slot you have not researched. Every slot below names its source. **If a
slot has no source, the message does not get written.**

| # | Slot | What it is | Where it comes from | The trap, and the lead it cost |
|---|---|---|---|---|
| 1 | `[name]` | First name only | lemlist `firstName` | lemlist puts titles in it. Adrian Steele's `firstName` was "Dr". Abbreviated surnames are never used |
| 2 | `[company]` | The business they OWN, styled as they style it | lemlist `companyName`, reconciled per RULES.md 0B, then the statutory record for any owner claim | The business they own is not the job they hold. Steele had sold Mercian Labels, Mandy Kerley does not own Trickle |
| 3 | `[surface]` | `site` or `social media`, whichever is theirs and readable | A web search for the site FIRST, then their own HTML for social handles | lemlist `companyDomain` is wrong often. `carrefour.fr`, `trickle.works`, and `relatiq.nl`, which has no website on it |
| 4 | `[the critical flaw]` | One or two overarching things critically poor about the whole surface | Every published page, rendered and looked at, see section 3 | An absence claim with no positive control. Dariuz's "broken images" were our proxy |
| 5 | `[stakeholder]` | The specific party the business depends on | The site's own words, who it sells to and how | A generic "visitors". tuftuf's was event planners, from its own guest range field |
| 6 | `[impact]` | What that stakeholder does instead, landing on the lead's **most current goal** | Their current goal, found by research per section 3 step 8, dated, newest evidence first. The impact itself is inference, the only one allowed, and the owner must be able to test it | A timeless, generic cost. And a made up number, the money rule forbids modelling any rate or revenue |
| 7 | `[xyz]` | What we build, relevant to this lead | The offer in block four | Mismatch with block four |
| 8 | brand line | **Fixed.** "Unilever, AXA, Pertamina" | Raka's template, recorded in `docs/astra-company-profile.md` | Never reworded, never trimmed, never extended |
| 9 | `[proof]` | ONE personal credential of Raka's that makes the offer believable | `docs/astra-master-context.md` section 2A, matched per section 4 below | Decoration. The credential has to be the reason we can do the thing |
| 10 | `[thing]` | A concrete artefact a stranger could draw | Derived from the flaw in block two | A brochure. "A page that shows the room" priced itself low |
| 11 | `[stakeholder achieves goal]` | The SAME stakeholder as block two, now getting what the flaw was blocking | Mirrors block two | A different stakeholder from block two, which breaks the logic |

---

## 2. The rules, block by block

### Block one, `Hi [name], saw [company], looks interesting!`

- **Word for word.** No detail, no description, no compliment beyond "looks interesting".
- The only exclamation mark in the message lives here.

### Block two, exactly two sentences, nothing added

- **Sentence one is `However, your [surface] is [the critical flaw].`** One or two flaws,
  never three. The flaw must be **overarching**, true of the whole surface, never one page's
  nit. And **critically poor**, it touches money or trust, not taste.
- **Sentence two is `This causes [stakeholder] to [impact].`** The stakeholder is whoever is
  actually hurt, their customer, the owner themselves, the business, or any other party they
  depend on. **The impact lands on the most valuable goal or pain they have RIGHT NOW (Raka,
  2026-09-22).** Not a timeless cost that would be true of any business, the thing they are
  working on this month. Find it, section 3 step 8, then aim the impact at it.
- **No extra clauses.** No "while it sells", no "so your team loses". That was the draft Raka
  rejected.
- **What Raka calls a dated site, in his words (2026-09-23), pointing at nl.inxpress.com.**
  "Squary, things are in islands, it doesn't flow, a lot of gaps." So look for boxy cards and
  panels that sit as separate blocks, sections that don't lead into each other, and big empty
  gaps between them. That's a design flaw he recognises on sight, and it counts even when the copy
  and the facts are fine. Judge it from the screenshots, never from the HTML.
- **For a franchisee, the brand's site IS his website (Raka, 2026-09-24).** It's what his
  customers see when they look him up, so roast it like his own, every page. He can't rebuild
  head office's site, so the offer is the thing he can own, his local page.
- **A rebuild is not a breakage.** When InXpress rebuilt its site the old location links started
  landing on a general page. "Your page is gone" overstated that, Raka caught it. Describe what a
  customer sees now, not what disappeared.
- **The flaw survives four tests before it is written.**
  1. **Positive control** on any absence. "Not a single photo" shipped because the same sweep
     found 23 images on hfmencap.org.
  2. **Render trust.** `site-audit.js` must not print `RENDER NOT TRUSTED`. If it does, run
     `tools/render-via-curl.js` and only use a visual finding when that reports 0 curl errors.
  3. **The tweak test.** If their web person fixes it in an afternoon, it is a task and it
     cannot be the flaw. tuftuf's missing privacy policy and HF Mencap's missing cookie
     banner were both true and both held back for this reason.
  4. **The red team.** Is it deliberate? tuftuf's one screen club front is deliberate and was
     never the flaw. The private events buyer being shown no room is not a style choice.

### Block three, three sentences, the middle one fixed

- `I run Astra agency.` Fixed.
- `We build [xyz] for brands like Unilever, AXA, Pertamina.` Only `[xyz]` changes. Plain
  and short, "websites", "websites and apps", "booking tools".
- `I [proof].` One credential, and it has to carry the argument. Eten Maar "ran the
  inventory, so I know what an unsold night costs" works because a venue's unsold nights are
  inventory. "I had a food brand" alone would be decoration.

### Block four, one sentence

- `Shall I build the [thing] so [stakeholder achieves goal], and send it over?`
- `[thing]` names an artefact a stranger could sketch.
- The stakeholder is the one from block two, and the goal is the one the flaw was blocking.

### Across the whole message

- **Three consistency checks, and they are the ones a script cannot do.** The stakeholder
  in block two is the stakeholder in block four. The thing in block four fixes the flaw in
  block two. The `[xyz]` in block three covers the thing in block four.
- **The hard bans from RULES.md still hold.** No colon anywhere, no dash of any kind outside
  a proper noun, contractions present, English, four blocks.
- **Length falls out of the shape**, roughly 90 to 110 words. The gate's range is 88 to 150.

---

## 3. The research that fills `[the critical flaw]`, in order

This is where the template's "after a deep analysis of the whole website or social media,
all pages" gets done. Nothing in it is optional.

1. **Reconcile the lemlist record against itself**, RULES.md 0B. Tagline against
   `companyName`, owned against held, domain actually theirs.
2. **Web search for their site before touching `companyDomain`.** Relatiq was one approval
   from "you have no website" off DNS alone.
3. **Fetch the domain and confirm it names the right company.** A plausible TLD is often a
   different company. relatiq.io, relatiq.co and relatiq.app are three different businesses.
4. **List every published page, not just the nav.** The sitemap, and on WordPress
   `/wp-json/wp/v2/pages`, which is how tuftuf's unlinked `/friends/` page turned up.
5. **`node tools/site-audit.js` on every page, and open both screenshots of each.**
6. **Social handles only from their own HTML.** Try to read them. If it is a login wall, a
   401 or a 429, say nothing about social at all and use `site` as the surface.
7. **Find the revenue line in their own words.** Their form fields, their pricing, their
   CTAs. tuftuf's guest range and "For example €15,000" budget are what made the stake visible.
8. **Find their MOST CURRENT goal and pain by linking clues, then date it (Raka,
   2026-09-22).** Full method in **section 3A below**. It is not optional and it is not a
   single search. Every one of the eight clue sources gets opened and read through, the
   clues get written down with dates, and the goal is INFERRED from how they fit together.
   The impact in block two is then aimed at THAT goal.
9. **Pick the flaw that sits on that goal and that revenue line**, then run it through the
   four tests in section 2.
10. **Confirm it a second, independent way.** tuftuf's zero photos was an HTML sweep, the
    screenshots, and the CMS media library, three mechanisms that cannot fail together.
11. **Write every verified fact into the queue row's `claims` at the moment it is verified**,
    including the current goal, its source and its date.

---

## 3A. Clues to inference. How the current goal and pain are found (Raka, 2026-09-22)

His words, "these are just clues... that can be put together and you can infer something
out of it", "don't just skip around, you read through it and understand it and analyse
it", "linking it together, multifaceted".

**The principle.** No single source tells you what someone is trying to do this month.
Several sources each leave a clue, and the goal is what makes all of them make sense at
once. **A clue is evidence for the inference. It is never the content of the message.**

### The eight clue sources. All eight are opened, every lead, no skipping

| # | Source | How to get it | What to read for |
|---|---|---|---|
| 0 | **The lead's own lemlist `jobDescription` and `summary`** | The lead record, or the `linkedinInviteAccepted` activity, which carries it | Their mandate in their own words. The strongest single clue in batch 3, see 3B |
| 1 | **Their website, all of it** | Section 3 steps 3 to 5. Plus any news, blog, press, "updates" or newsletter archive, and the newsletter signup itself | Expansion plans, new locations, new products, what the main CTA pushes, what changed recently and what looks abandoned |
| 2 | **Their newsletter** | An archive page on the site, a Mailchimp or Substack archive linked from their HTML, a web search for `"<company>" newsletter` | What they tell existing customers they are doing next. This is usually the most honest statement of plans a small business publishes |
| 3 | **The company LinkedIn page, recent posts** | `companyLinkedinUrl` from lemlist, opened. If walled, a web search for `site:linkedin.com/posts "<company>"` and open each result | Launches, hires, wins, events, partnerships. The dates matter as much as the words |
| 4 | **The owners' own pages** | The lead's `linkedinUrl` and their summary in lemlist, their posts via search, any personal site, podcast, talk or interview | What they are up against. Their complaints, their asks, what they celebrate, what they keep coming back to |
| 5 | **Job openings** | Their careers page, the LinkedIn jobs tab, a web search for `"<company>" vacature` / `Stellenangebot` / `hiring` / `job`, Indeed, Werkzoeken, their own "we're hiring" bar | **Read the whole job description**, the requirements and the responsibilities, not the title. The requirements say what the business lacks |
| 6 | **A web and news search of the company name** | Plain web search, then a news search, in the site's own language | Funding, awards, grants, openings, closures, acquisitions, press features, local news |
| 7 | **A web and news search of the owner's name** | Name plus company, then name plus an ownership word in their language | Other ventures, interviews, talks, a recent move, the thing they're known for |

**Every source gets a written outcome in the research note**, including the empty ones.
"LinkedIn posts, walled, 401, nothing read" is an outcome. A source that was not opened
is written as not opened, and then it gets opened.

### How clues become an inference. Read, understand, then link

1. **Read each source through fully.** A job ad's title is not the clue, its requirements
   are. A post's headline is not the clue, what it announces and when is. Skimming is the
   failure Raka named.
2. **Write each clue down on its own line, with its source URL and its date.** No
   interpretation yet. `2026-08-14, company page post, signed distribution partnership
   with X` is a clue.
3. **Ask of each clue, "what does this mean for them".** One step of meaning, no more.
4. **Link them.** Look for two or more independent clues pointing the same way. That is
   the inference. Write it as one sentence naming the clues it rests on.
5. **Try to break it.** Is there a clue pointing the other way? A hiring spree and a
   closure notice in the same month is not expansion. Write the contradiction down.
6. **Grade it.** Two or more independent clues agreeing is `SUPPORTED`. One clue alone is
   `WEAK` and cannot carry the impact, fall back to the stage based analysis and say so.
   Contradicted is `UNRESOLVED`, and the impact stays generic to their revenue line.

### Raka's worked inferences, and the shape they all share

| Clues | What they mean | Inference |
|---|---|---|
| Hiring a social media manager | Someone is being paid to make them more visible | They're expanding and want to be found |
| A marketer role whose requirements include web design | The site is on the new hire's list of jobs | They know the website needs changing, and they are trying to solve it with a hire |
| Hiring salespeople, plus recent partnership announcements | More channels and more people to work them | They're expanding quickly, so anything that slows a new lead down costs them more now |

More in the same shape, so the method generalises.

| Clues | Inference |
|---|---|
| A new location announced, plus a site that still lists one address | The site hasn't caught up with the business |
| A newsletter promising a new product, plus no product page | The launch will land on a site that can't sell it |
| The founder posting about wanting bigger clients, plus a portfolio of small ones | They're trying to move upmarket and the proof points the other way |
| Funding or a grant, plus hiring | A growth push with a deadline on it |
| Every recent post about one service line | That line is where they want the next money from |

### What the inference is allowed to do in the message

- **It drives the `[impact]` slot and the `[thing]` in block four. That is all.**
- **The clue itself never appears.** Not "I saw your job opening for a marketer", not "I
  saw you're hiring", not "congrats on the partnership". Raka, "Don't use it as like, oh,
  if I saw your job opening for this". Quoting a clue reads as surveillance and swaps a
  diagnosis for a recital. The message states the consequence, the owner recognises it
  because it is true.
- **Block one stays word for word.** The inference never leaks into the compliment.
- **The owner must be able to test the impact** against their own experience. If only our
  research could confirm it, it is too clever and it gets rewritten plainer.

### The written record, in the queue row and the research note

```
clues
  <date> <source url> <what it says, no interpretation>
  ...
sources with nothing       <which of the eight, and why, eg walled 401>
inference                  <one sentence>, rests on clues <n> and <m>
contradictions             <none, or what points the other way>
grade                      SUPPORTED | WEAK | UNRESOLVED
impact aimed at            <the goal, in plain words>
```

**No inference, no impact.** If the grade is `WEAK` or `UNRESOLVED` and the stage based
analysis gives nothing better than a timeless cost, the lead is not ready.

---

## 3B. What the first run taught (batch 3, 2026-09-23, one sent out of five)

The method was run on five leads. Grzegorz Sobieszuk at PharmaSupport was sent, three were
genuinely no angle, one was not a lead. The worked example is in
`state/drafted_2026-09-23-batch3-new-accepts.md`. What it taught, in the order it comes up.

### Picking the batch

- **Take new leads from the acceptance count, never from an old "untouched" list.** Batch 2's
  file named five leads as untouched and all five already had queue rows. The reliable source is
  the difference. `get_campaigns_stats` gives `linkedinInvitationAccepted` now. The last audit
  gives the count then. `GET /api/activities?version=v2&type=linkedinInviteAccepted&campaignId=
  <id>&minDate=<audit date>` lists who accepted in between. **The arithmetic has to close**, 322
  plus 5 equals 327, before anyone is researched.
- **The activities record carries the whole lemlist lead**, `jobTitle`, `tagline`, `summary`,
  `jobDescription` and company fields. Read it there first, it saves a lookup per lead.

### Rule someone out on the record, before any fetch

Two of five went on the record alone, and both are cheap to spot.
- **A student or an employee is not a lead.** Oluchi Okafor's `summary` says Year 12 student.
- **An agency is a competitor.** Hula Hoop's `companyDescription` says brand strategy agency,
  80+ staff. Confirm with one fetch of their homepage title, then stop.

### The eighth clue source, and it was the strongest

**The lead's own lemlist `jobDescription` and `summary`.** People write their mandate there in
their own words. Grzegorz's said "growth journey to becoming a leading service provider ...
across Europe ... creating new service offerings, leading business development". That is a
stated goal, which is better than any inferred one. **Read it first, then look for independent
clues that agree.** It counts as one clue, never two, however many goals it names.

**The other sources that paid off.**
- **The company register via North Data**, for dates. It dated the takeover to 9 Dec 2025 and
  showed he holds his stake through his own holding company, which also settled ownership.
- **Third party employer profiles**, StudySmarter Talents, Indeed, Magnet.me. An employer profile
  on a graduate platform is a hiring clue that doesn't depend on LinkedIn at all.
- **WebFetch on a public company LinkedIn page** returned recent posts with relative ages. Treat
  the ages as approximate and say so.

### Check the site where the goal lives, not the whole site

Once the goal is inferred, the question is **whether the site serves that goal**, not whether it
has faults. QWIC's goal is dealer led growth in Germany. So the checks were qwic.de, the new
models on it (Elan 36 mentions, Signal 13), and the dealer locator. All three held up, so the
answer was no angle, although the site had a real GDPR fault. **A true fault that doesn't sit on
their current goal is not the flaw.** The flaw that was sent, no careers content, sits exactly
on PharmaSupport's goal of hiring scientists.

### An absence claim over a whole site, done properly

"Not a single line, on any page" was earned with four layers. Use the same four next time.
1. **Crawl every linked page**, DE and EN, not the nav alone. 107 fetched.
2. **Read every keyword hit in context.** German "stellen" is a verb far more often than a noun,
   and every hit on PharmaSupport was the verb. A count of hits is not a finding.
3. **Probe the likely unlinked paths**, `/karriere`, `/jobs`, `/stellenangebote`, `/career`,
   `/en/careers` and so on, with a path that exists as the control. All 404, `/team` 200.
4. **Search the index**, `site:domain` plus the terms, for pages the crawl can't reach.

**And pick a control that is KNOWN to have the thing.** The first control grep ran on qwic.nl
and found nothing, because QWIC's homepage doesn't link its careers page. A control that fails
proves nothing either way. hfmencap.org, whose homepage says "Work for us", was the valid one.

### Tool traps hit this run

- **A Playwright script written by hand must set `ignoreHTTPSErrors: true`.** Without it every
  page shows "Your connection is not private", which is the proxy's CA, never their certificate.
  site-audit already handles this. Ad hoc scripts don't.
- **Clear the temp file before every fetch in a loop.** A domain sweep reused the last page's
  title for two domains that returned 000. This is the second time. `rm -f` first, every loop.
- **A search tool you drove wrong is not a broken search.** Pressing Enter in QWIC's Mapbox
  search listed nothing, most likely because it wants a suggestion clicked. Never write "broken"
  about an interactive part you haven't driven the way a visitor would.

### Retrying blocked leads (batch 4, 2026-09-23), what changed the answers

Five blocked leads were retried. Every block turned out to rest on something other than the lead.
- **Re read the lemlist record before trusting an old block.** Paul Prescott was blocked on
  `raiseyourgame.co.uk`, a domain that isn't on his record, which gives `raise-your-game.com`.
  Emily Levy's `alquimialawyers.com` is dead but her firm moved to `alquimialegal.mx`. Debby Alles'
  name collision was settled by her own `companyDescription`. Use `search_campaign_leads` with
  the `id`, it returns the full record including every `experience` line.
- **A 503 can be the page itself.** The WordPress Under Construction Page plugin serves 503 on
  purpose. Aksonz was "503 on every fetch" for weeks and the page behind it is a placeholder.
- **When our proxy can't read a site, use a reader on another network.** (As of 2026-09-24
  r.jina.ai refuses our IP, see batch 6 below, so use `tools/render-via-curl.js` first.) `r.jina.ai/<url>` returns
  the text, and with the header `X-Return-Format: screenshot` a screenshot URL. Control it with a
  known site through the same reader. It is a separate path from curl, Chromium and WebFetch.
- **Counters in raw HTML start at zero.** "0 Prizes Won, £0 Money Raised" was a count up
  animation, 750 and £80,000 once rendered and scrolled. Never quote a number from HTML that a
  script animates.
- **A phone screenshot needs a phone user agent.** Wix and other builders pick the layout by user
  agent, so a 390px desktop browser got the desktop layout with text clipped off the edge. site-audit
  now shoots the phone view with a real iPhone profile.
- **Look for the other language before claiming there isn't one.** Wix Multilingual flags in the
  HTML meant `/en` existed, which killed "your site is Spanish only" before it was written.
- **Companies House name matches need the company, not the name.** The first "Neeraj Sharma"
  appointments page was a different man in Teesside. Search the company, then open its officers.

### Batch 5 (2026-09-23), three more traps and one new check

- **On WordPress, always list the posts and the users.** `wp-json/wp/v2/posts?per_page=100`
  with `X-WP-Total`, and `wp-json/wp/v2/users`. On ferrydehaas.nl this found 130 casino and
  betting posts by a second account, all in nine days, none linked from the homepage. The design
  looked fine. A render never shows this, and it's the most serious thing a site can have.
- **A video that won't play in our Chromium may play everywhere else.** The Chromium here has no
  H.264 codec, so "Media error, Format(s) not supported" on an mp4 that serves 200 video/mp4 is
  ours. Never report a video as broken off our render.
- **"LinkedIn invitation withdrawn" on an accepted lead is the campaign step, not the connection.**
  Read the lead's activity history, `GET /api/activities?version=v2&leadId=<id>`. An accept followed
  by `linkedinWithdrawInvitationDone` is still a connection.
- **A title is not ownership, even at a startup.** Shail Niazi's company was right all along, but
  he's its Chief Culture Officer and a government page names the CEO and co founder. Check who
  founded it before writing to a C level title.

### Research past the website, the business side (Raka, 2026-09-24)

His words, "find evidence pain points in his business that allows him to not reach certain goals
... internal apps for improvements ... efficiency, regulations". First run on Ferry de Haas.
Astra builds apps and tools as well as websites, so look for these too, every lead.

1. **What does the business actually do all day?** For a franchisee, read the franchisor's own
   description of the franchisee's job. InXpress franchisees sell and look after accounts, head
   office does billing. That says where his hours go.
2. **Their own tools, not just their homepage.** List every page, and click every button, booking
   links, sign up forms, portals. On ferrydehaas.nl the Book Consultation button on every page was
   dead, and four sign up pages he built in 2023 showed raw plugin code. Check whether anything
   links to a broken page before calling it a live loss. Unlinked means clue, not cost.
3. **The rules changing under their industry this year.** Search the trade association first
   (evofenedex for Dutch logistics), then the regulator. Date it. For Ferry, the EU dropped the
   €150 duty free limit on 1 July 2026, and more customs data is due from November.
4. **Costs moving against them or their customers.** Surcharges, prices, fees. Only use a number
   from the right source. DHL eCommerce's surcharge isn't DHL Express's.
5. **Tie it to their own words.** Ferry's LinkedIn leads with shipments stuck at customs, so a
   customs rule change lands on the exact problem he sells himself on.
6. **Grade each angle and recommend one.** A verified, visible problem beats a bigger inferred
   one. The bigger one goes into what we'd build, not into the flaw sentence.
7. **Then ask the question that decides it, is this the BIGGEST pain he has (Raka, 2026-09-24)?**
   His words, "people pay for people solve for problems that are big and painful". A broken
   button is real and small. Look at four levels, him, his company, his region, his industry,
   and put every pain in one table, size for him, how current, how well proven, can we build for
   it. Lead with the biggest one that's proven. For Ferry that was customs, every parcel to the US
   charged duties since Aug 2025 and new EU rules since Jul 2026, landing on a one man business,
   not his website. Also check his own franchisor or supplier isn't already solving it.
8. **Then the cost, and whether he'd pay (Raka, 2026-09-24).** "If it's just a tiny fix then
   they're not gonna buy it." For each pain, what it costs him a year and whether he'd pay €5k to
   €50k to fix it. Batch 6 is the worked example. The first drafts led with an old English PDF and
   a hidden jobs link, both true, both tiny. Re judged on cost, Lasse's pain is his home market
   shrinking under him (German furniture makers down, 40% on short time), and the German only site
   is just the symptom. SBZ's is crews, a busy order book across four countries in the tightest
   market for fitters there is. RULES.md 4A rule 9.

### Batch 6 (2026-09-24), what the business side run taught

- **Take the domain from the record every single time, even for a quick screenshot.** I shot
  `sbz.nl` from memory for SBZ B.V. and it's a pension fund. The record says `sbzbv.nl`. Read
  `companyDomain`, then pull the nav from that site's own HTML before opening any inner page.
- **Webflow's "No items found." is usually invisible.** It sits in `w-dyn-hide w-dyn-empty`,
  the hidden empty state of a CMS list. Check the class before calling a section empty.
- **Webflow scroll reveals render blank in our screenshots.** Parts of a full page render came
  back white. That's the reveal animation never firing, never an empty page. Read the HTML text.
- **A language claim needs a control that renders hreflang server side.** Wix adds it by script,
  so alquimialegal.mx returned nothing and failed as a control. A direct competitor that serves
  it, hera-online.de, worked, and doubles as the comparison.
- **Search a PDF, don't assume it.** An English catalogue existed, which nearly killed "German
  only". Opened with PyMuPDF, dated 1 May 2023, and it has none of the 2026/27 products. Strip
  spaces before searching, catalogue titles are letter spaced, and control with a word from its
  own contents page. pypdf is broken in this container, PyMuPDF works.
- **Where the industry is shrinking, look for where the lead is going instead.** German furniture
  makers are down, domestic worst. Lasse's fair in Italy, his English catalogue and his languages
  all point abroad, so the angle is the site failing the buyers he's chasing, not the downturn.
- **`curl --compressed`**, always. Without it some sites return gzip bytes that look like a broken
  page (Collier Pickard).
- **r.jina.ai now refuses our IP**, 401 with "bad IP reputation". Don't plan on it as the second
  path. `tools/render-via-curl.js` is the second path now.
- **A job ad is still a clue in the flaw sentence.** check-drafts flagged "vacancies" in block
  two. Describe what the site does to the people he's hiring, as with PharmaSupport.
- **Read the WHOLE document before saying what language it's in.** The PULSE PDFs open in
  German and switch to English halfway. A 700 character read called them German only, Raka
  approved that message, and only the pre send re check caught it. Search the full text for the
  other language's words ("Instruction", "Application") before any language claim.
- **An approved message that turns out false is not sent, and the fix needs his word again.**
- **An incumbent agency on the site is the "someone already solves it" rule.** A privacy or
  credit link to an active agency (avermann.eu on Schumacher) means they have a builder already.

### The pre send sequence that worked, keep it exactly

1. `get_inbox_conversation`, still empty.
2. Re-verify the claim live in the same minute, with its control, and the Impressum.
3. **Extract the text from the drafts file with a regex**, never retype it.
4. `send_message` with `contactId`, `linkedin`, `usr_27bdxG7jzTn2rucGB`.
5. Re-pull, confirm the body matches, record the activity id.
6. Queue row `SENT` with `openerText`, `openerSentAt` and `sentActivityId`, a `GATE ARCHIVED`
   marker on the drafts file, one commit.

---

## 4. Matching `[proof]` to the lead

From `docs/astra-master-context.md` section 2A. One per message. The line after "I" states
the experience AND why it bears on this lead, in the same sentence.

| Lead | Credential | Why it bears |
|---|---|---|
| Owner operator, hospitality, food, retail, venues | Eten Maar, built a food brand from zero with five relatives, owned pricing, inventory and unit economics | Same week they are having, and unsold stock is unsold nights |
| Dutch or European B2B software, SaaS, GTM | Betty Blocks, a year and a half on go to market | How buyers of that kind of product decide |
| Enterprise, operations, industrial, data | Heineken, global e business insights across 23 markets | Scale and process buys credibility with operators |
| Revenue or sales leadership | Betty Blocks and efficy, pipeline, routing, playbooks | Closest match to what we sell under Grow and Optimise |

**Never stretch it.** If none of these genuinely bears on the lead, the message is not ready.

---

## 5. When the template cannot be filled, and what to do instead

| Situation | Outcome |
|---|---|
| The business is not theirs, or cannot be tied to them | `BLOCKED_NEEDS_INFO`, or `DO_NOT_CONTACT` if they sold it |
| No readable surface, a Cloudflare wall or a void render | `BLOCKED_NEEDS_INFO`, Raka opens it |
| Genuinely strong surface, no flaw passes the four tests | `NO_STRONG_ANGLE`. Never force a flaw |
| Only a tweak level flaw exists | `NO_STRONG_ANGLE`, note the tweak as a later favour |
| No website at all, earned per the four checks above | **The no website variant.** Block two becomes "I couldn't find your website, and that [impact to their most current goal]." Everything else unchanged |

---

## 6. Before it is sent, unchanged from RULES.md section 1

Whole thread, paged to exhaustion, immediately before the send. Every claim re-verified live
in the same minute, with its control. Text copied out of the drafts file byte for byte.
`contactId`, `linkedin`, `usr_27bdxG7jzTn2rucGB`. Re-pull to confirm it landed. Queue row
written in the same commit.
