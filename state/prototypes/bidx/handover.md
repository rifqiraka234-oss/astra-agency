# BidX, the outreach system sketch. Handover, 21 Oct 2026

Internal. For Raka and the next builder, never for the client.

## What's live

- The desk, the thing promised, https://astra-bidx-prototype.netlify.app/desk/
- The public side it runs on, https://astra-bidx-prototype.netlify.app/
  - /guides/ with three long guides, Smart grants are closed, BridgeAI Deployment Catalyst, Investor Partnerships
  - /calls/ with a page for each of the 31 Innovate UK competitions on the Innovation Funding Service
  - /fit/ the seven question fit check, the founder's eight dots, matching calls, booking or email
- Netlify project astra-bidx-prototype, id a067db1c-6da3-487e-8556-1b01bbac0000, deploys 6ad85af98c800e2f20111c45 then 6ad85d255e6cbbaa04b44884 (contractions in the sample
  messages and bumps), then 6ad8714dc92da7d5be0b9c97 (the How it works view, home labels removed, "before you"
  rewritten), then 6ad89800c01f7d8cae1bb80e (LinkedIn limits), then 6ad8caee416cdb4f878bb07b and
  6ad8cf1a9581f3e89564ecda (the go to market pivot, see below), each verified the same way, every file fetched and
  matched. The last one, 21 Oct afternoon, 60 served files, 39 pages identical by visible text, 21 assets by sha256.
  Team SSO switched off, no password. Every page carries noindex, nofollow.
- Source, state/prototypes/bidx/build (python3 build.py writes ../site). The deployed folder is ../site.

## How it works view (added 21 Oct, Raka asked how it runs on lemlist)

A swimlane diagram, lemlist, Claude, the BidX team and bidx.ai, eight steps from Find to Learn, and the working day.
Every lemlist feature named is one lemlist's own tools describe, People Database, watch lists including website
visits, external signals, custom fields, campaign sequence, daily limit, sending hours, inbox with interest score,
webhooks, campaign stats. The sidebar shows "lemlist, connected" as a design state, and the footnote now says the
connections shown are sample data. The sketch is not connected to lemlist, and the delivery message doesn't say it is.

## The one thread

The 17 Oct opener said the blog has no posts and every page leads to the one funding call, so founders who aren't
already looking for grant help likely never come across BidX. It offered "a content and outreach system that
publishes grant guides founders search for and reaches 30 to 50 matching startups a day for those funding calls".

- Guides founders search for. Three guides written from the funders' own pages plus a page per open call.
- 30 to 50 matching startups a day. The desk picks 35 by default from a 30 to 50 slider, up to 20 by LinkedIn and the
  rest by email, each matched to an open call through eight checks drawn as BidX's own logo dots, each with a first
  message in Simon's voice.
- For those funding calls. Every CTA is BidX's real booking widget,
  https://get.bidx.ai/widget/bookings/book-your-free-consultation-and-win-100k-2m-funding
- The loop closes. Guide readers come back to the desk as a signal, replies land in the Inbox with intent tags and a
  slot picker, Results shows the funnel and a month planner.

## QA, what was actually run

| Check | Result |
|---|---|
| Cold load, every page at 1440 | 39 of 39, zero page errors, zero console errors, zero failed requests, every reveal fired |
| Overflow at 1024, 768, 390, 360 | 180 page and width checks, zero overflow (two real bugs fixed, the brief button and a desk select) |
| No JavaScript | 39 pages, nothing hidden, all 7 desk views and all 7 fit questions readable |
| Interactions | 48 of 48, desk approve, skip with reasons, keyboard j and A, search, tabs, approve all, inbox booking and reply, switches, planner, hash links, fit check green and red paths and email form, both calculators, strand tabs, film play and pause, filters and empty state, mobile menu |
| Simulated clock | 09:00 and 12:00 on 21 Oct and 09:00 on 29 Oct. Counts, lists and the call's own page agree, a closed call drops off (bug found and fixed, a call closed after 11am showed "00 days left") |
| axe 4.10.2, WCAG 2 A and AA plus best practice | 15 pages and desk views, zero violations after fixes |
| Copy | zero colons, zero dashes in rendered text, no exclamation marks, NO-AI-SLOP section 8 words clean in our copy |
| I14 grep | every hit is real copy, funder call names, a fit answer "A prototype", plus the one desk footnote |
| C5 no swap | side by side with Garnish, Healthy Secrets, JustClaims v3, Negentien80. See below |
| Live | 61 files fetched. 39 pages identical to the build by visible text, 21 assets identical by sha256. Chromium on the live URL, all 200, no errors, no broken images, fonts loaded, film playing |
| Live data | the IFS listing re-read at 06:2x UTC on 21 Oct. Same 31 competitions, all 31 closing dates match, four statuses changed overnight (BridgeAI's three strands and the concrete cohort opened) and were updated |

## Score, G1, honest

| Dimension | Weight | Score | Why |
|---|---|---|---|
| Brand specificity | 15 | 14 | The logo's eight dots are the fit signal everywhere, their colours, their CTA wording, process, stats, quotes, founders, their booking link |
| Narrative and pacing | 15 | 14 | Deadline, Smart closed, good applications lose, fewer SMEs winning, five days, proof, founders, call |
| Imagery and art direction | 15 | 11 | The major visuals are real data, the call board, 218 dot chart, regional bars, odds bars, the desk. The three guide films are licensed stock, topical but not BidX's own, and BidX has no photography of its own |
| Workflow and business completeness | 15 | 14 | Sources, fit, pick, draft, sequence, approve or skip, inbox, booking, results, guides pipeline, public pages feeding signals |
| Real proof and human trust | 15 | 13 | Their own quotes and bios, BidX's own Innovate UK award with a Gateway to Research link, every funder figure sourced and dated. No portraits, their site has none to verify against |
| Buyer fit and objections | 10 | 9 | Caps of 30 to 50, the 90 day rule, a never picked list, one bump then stop, nothing goes without approval |
| Conversion completeness | 5 | 4 | Real booking link. The fit check email form confirms on screen and sends nowhere |
| Interaction and accessibility | 5 | 5 | Keyboard, axe clean, no JS fallbacks, reduced motion respected |
| Technical reliability | 5 | 5 | See QA |
| **Total** | **100** | **89** | **One under the 90 bar. The gap is imagery.** |

I searched 84 more Mixkit clips for a better BridgeAI film. The robot and production line footage that fits is all
under the Mixkit Restricted License, and the eight Free ones fit worse than the circuit board. So it stays, and the
score stays 89 rather than being nudged up. No hard failure in G2 trips.

## C5, the no swap test

Logo removed heroes of this build and the last four were laid side by side. BidX reads as its own thing, white page,
navy call board, the eight dot glyph. The nearest neighbour is JustClaims v3, which also leans on a deadline
countdown, but in black and yellow flip digits on an editorial layout. Here the countdown is the client's core fact,
every call closes at 11am, and the dot numerals come from BidX's logo. Question 3, could this be sold to one of the
last three by swapping text and colour, is no.

## Things that must not surprise anyone

1. **The desk's founders, companies, replies and results are sample data.** Names were checked against Companies
   House and the clashes dropped. The desk says so in one footnote. The delivery message doesn't, the artefact does.
2. **Funder text is punctuation normalised.** Innovate UK's own words on the call pages and in the guides had their
   colons and dashes turned into commas, full stops or "to", words untouched, so the no colon and no dash rule holds
   on every page. A call's brief is linked on every call page for the exact wording.
3. **One client quote was touched the same way.** "non-dilutive" became "non dilutive" in the CBC testimonial.
4. **Flock and CBC are unconfirmed.** The Flock £600K quote is very likely Aaron's own company (Commute Automation,
   trading as Flock, £128,198 in the UKRI data). Neither is named beyond what BidX's own site says.
5. **Simon's credentials are as BidX states them**, not independently verified.
6. **BidX's own award.** £99,350 in 2024, project 10105102, AI Solutions to improve productivity in key sectors,
   confirmed in the UKRI funded projects list and separately in the Gateway to Research API and public page. The
   competition reference says BRIDGE, but the page never calls it BridgeAI, because that rests on a code alone.
7. **Dates.** Guides say "Updated 20 October 2026" and the call pages "read on 20 October 2026", both true. Call
   counts and countdowns are worked out on the visitor's clock, so they stay right as calls close. The EIC "next
   batch 3 November" line goes stale after 3 November.
8. **The fit check email form sends nothing.** It validates and thanks the visitor. Wiring it is a build item.

## Side findings for Raka, not in the build

- On bidx.ai/lp1, 5 of 7 booking buttons lead to an invalid Calendly link.
- BidX's own homepage still advertises Innovate UK Growth Catalyst (£900K) and Innovation Loans. Growth Catalyst has
  no round open ("Further competitions subject to confirmation") and Innovation Loans are paused until January 2027.
- BidX started as AI for construction bids (the 2024 award), which fits "AI trained on nearly 1,000 winning bids".

## Asset provenance

| Asset | Source | Licence |
|---|---|---|
| team film and poster | Mixkit 4809, Business people at work meeting | Mixkit Free, copyrightNotice "Free", rechecked 21 Oct |
| board film and poster | Mixkit 101084, Two Hands Working on a Motherboard | Mixkit Free, rechecked 21 Oct |
| lab film and poster | Mixkit 4773, Female scientist observing through a microscope | Mixkit Free, rechecked 21 Oct |
| Host Grotesk, Doto, Martian Mono | Google Fonts | SIL Open Font License |
| BidX logo | bidx.ai, Logo-Ligth-Bidx.svg | the client's own |
| Call data | Innovation Funding Service, 31 competition pages | Open Government Licence v3.0 |
| Smart figures | Ipsos for Innovate UK, Smart grants impact evaluation and technical annex, July 2026 | OGL |
| SME and award rate figures | UKRI investment and outputs, April 2015 to March 2026 | OGL |
| Regional counts | our count of distinct company numbers in Innovate UK funded projects since 2004, updated 12 Oct 2026 | OGL |

## The delivery

Drafted in state/drafted_2026-10-21-aaron-delivery.md, rewritten 21 Oct after the pivot, 79 words, check-drafts.py
PASS. It's about the outreach system only, the guides line was cut. Not sent. Needs Raka's word.
Re-pull the thread and fetch the live desk again immediately before sending.


## Red team, 21 Oct (Raka asked how strong it is)

Material strong, pitch middling. He said yes only after a bump, the named problem isn't urgent for him, and he can
build this kind of thing himself. Objections, most damaging first, and what was done.

1. **LinkedIn volume.** The desk said 30 to 50 a day from Simon's LinkedIn. lemlist's own help centre (articles
   8514157 and 13673146) puts LinkedIn at roughly 100 invitations a rolling week, so 20 a day, and says 30 a day gets
   accounts restricted. Free accounts get 3 invites with a note a month. FIXED, deploy 6ad89800c01f7d8cae1bb80e. 20
   founders a day go by LinkedIn, the other 20 by email from Simon's address with a subject line, an opt out and an
   email sequence. Setup states the limit and the Premium or Sales Navigator need. All 40 notes are under the 200
   character cap, longest 170.
2. **"I can build this myself."** For the call. The work is the content kept current, the fit logic and the daily
   tuning. A one call pilot (BridgeAI, closes 8 Dec) is Raka's call.
3. **The BidX app is ignored.** app.bidx.ai loads, no public sign up URL found (/signup and /register 404). Raka's call,
   a plain link in the sketch or raise it on the call.
4. **Can these founders pay the £3K to £15K upfront fee.** The eight checks test grant match funding, not the fee. Raka's
   call whether to reword the Can fund its share check.
5. **Assessor grade accuracy.** Home said a score above 70 "counts as a pass", the source says "typically considered a
   passing score". FIXED to "typically a pass". Also fixed, a founder's signal said they read an EIC guide that is only
   Planned on the desk's own Guides board, now the Smart grants guide, which covers the EIC.
6. **Proof it works.** Results are sample. Astra's own lemlist numbers would answer it on a call, but they tell him our
   own outreach runs this way. Raka's call.


## The go to market pivot, 21 Oct afternoon (Raka, "yes make those changes")

Why. The research in research/gtm/ showed Aaron already runs the content side at GrantUp (212 grant pages in its
sitemap), both founders now run Panda, an app builder that sells against agencies, and BidX's own channels are quiet
(Meta ads stopped 12 Dec 2025). So the desk now leads with who to reach and when, not with content.

What changed on the desk.
- Today puts past Innovate UK winners whose project is ending (tagged Past winner) and founders who just filed new
  shares (tagged Just raised) first. 9 of the 35 carry a tag, the rest come from hires and guide reads.
- The Calls view has an Outreach column. Start the week a call opens, stop three weeks before it closes, with the
  briefing and results dates from the Innovation Funding Service (data/timeline.json). The rolling EIC says so. The
  three calls that closed at 11am on 21 Oct show Too close to start, then drop off.
- No founder is picked for a call inside three weeks of closing. Checked from the Calls view, all 35 sit on calls In
  the window, Opened this week or the EIC.
- A Partners view, 7 partners. Every fact reopened on 21 Oct two ways (curl and a browser fingerprint). Ryan was taken
  off, its innovationfunding.com page sells Grant Funding, so it's a competitor, not a partner. Leyton UK stays, its UK
  homepage has no grants link and no use of the word (patent box links found as the control) and /uk/grants/ 301s
  to patent box.
- Setup has writing capacity (12 a month) and the LinkedIn limit. Sources include UKRI's funded projects file and
  Companies House share filings.

Things the desk now does on a later date, so it never contradicts itself.
- A picked founder whose call slips inside three weeks of closing is held, with a banner on their card and a line
  under the headline. The Ready, headline and nav counts follow. First hold is 28 Oct 11am (Efficient AI, 3
  founders), then 4 Nov (Battery investor call), then most of the list around 10 to 12 Nov.
- The EIC founders are held once the 3 November 5pm batch passes, because their message names that batch.
- The guide's EIC line and the fit check roll to the next first Tuesday, the EIC's own rule ("batched for
  evaluation every first Tuesday of the month at 5pm Brussels time", eic.ec.europa.eu, reopened 21 Oct).
- Tested with a simulated clock at 21 Oct 3pm, 28 Oct, 3 Nov 4.59pm, 4 Nov, 5 Nov, 12 Nov, 2 Dec, 1 Mar and 7 Apr
  2027. Held rows used to fade the whole row, which failed contrast, now only the dots fade, axe clean.

Fixed on the way.
- The no JavaScript date said Tuesday 20 October, now Wednesday 21 October.
- Three calls closing 4 November (CfI battery dual use, DRIVE35, Future Leaders) flipped to Closing soon on the IFS
  listing during the day, updated. The listing was re-read at about 14.10 UTC, 28 open, every closing date matched.

QA after the pivot. 48 of 48 interactions, axe clean on 17 pages and views plus the held state at 1440 and 390, no
overflow at 1024, 768, 390 and 360, zero page errors on 39 pages, zero colons and dashes in rendered text, the
simulated clock agrees across calls, home and desk.

Numbers, said carefully. Repeat winners were counted a third time after the context reset, 42.0, 46.1 and 43.1%
against the earlier 44.0, 46.7 and 46.0%, and 1,115 against 1,012 with projects ending in six months. Different
filters. The desk doesn't print these, the notes say "over 4 in 10" and "over 1,000".

Call prep for Raka is in call-prep.md.
