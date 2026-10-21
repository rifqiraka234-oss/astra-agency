# BidX, the outreach system sketch. Handover, 21 Oct 2026

Internal. For Raka and the next builder, never for the client.

## What's live

- The desk, the thing promised, https://astra-bidx-prototype.netlify.app/desk/
- The public side it runs on, https://astra-bidx-prototype.netlify.app/
  - /guides/ with three long guides, Smart grants are closed, BridgeAI Deployment Catalyst, Investor Partnerships
  - /calls/ with a page for each of the 31 Innovate UK competitions on the Innovation Funding Service
  - /fit/ the seven question fit check, the founder's eight dots, matching calls, booking or email
- Netlify project astra-bidx-prototype, id a067db1c-6da3-487e-8556-1b01bbac0000, deploys 6ad85af98c800e2f20111c45 then 6ad85d255e6cbbaa04b44884 (contractions in the sample
  messages and bumps), the second verified the same way as the first.
  Team SSO switched off, no password. Every page carries noindex, nofollow.
- Source, state/prototypes/bidx/build (python3 build.py writes ../site). The deployed folder is ../site.

## The one thread

The 17 Oct opener said the blog has no posts and every page leads to the one funding call, so founders who aren't
already looking for grant help likely never come across BidX. It offered "a content and outreach system that
publishes grant guides founders search for and reaches 30 to 50 matching startups a day for those funding calls".

- Guides founders search for. Three guides written from the funders' own pages plus a page per open call.
- 30 to 50 matching startups a day. The desk picks 40 by default from a 30 to 50 slider, each matched to an open
  call through eight checks drawn as BidX's own logo dots, each with a first message in Simon's voice.
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

Drafted in state/drafted_2026-10-21-aaron-delivery.md, 82 words, check-drafts.py PASS. Not sent. Needs Raka's word.
Re-pull the thread and fetch the live desk again immediately before sending.
