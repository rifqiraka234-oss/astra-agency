# BidX outreach system, research and art direction (2026-10-20)

Lead. Dr Aaron David Mason, co founder and director of BIDX LIMITED 15207532 (London), "Aaron Mason, PhD, Co Founder,
Product & AI" on https://bidx.ai/about-us . lemlist ctc_dWL5LypChqmTQ9QyZ, leadId lea_w3yYvHaqEqdqsYJcm, campaign W4 TEST
cam_iDMXXfaWWg8RkgHpi.

## What was promised, word for word (H1, the fidelity gate)

Our SKETCH opener, 17 Oct 13:15 UTC (act_MnQTNk42Xi4ket822):
"I'd suggest a content and outreach system that publishes grant guides founders search for and reaches 30 to 50
matching startups a day for those funding calls. ... Shall I send you a sketch of the BidX outreach system?"
His reply, 20 Oct 14:07 UTC (act_fJZZFdwe83einTZh7): "Sure send the sketch".

So the sketch is two things that work together, and nothing else.
1. The outreach desk, the internal tool that finds founders who fit a call that's open now and reaches 30 to 50 a
   day, every message drafted, replies routed to the free funding call.
2. The grant guides it publishes on bidx.ai, the content founders search for, each one ending at the funding call.

## Stage 0. Deliverable mode and the Site Completeness Contract

Mode, full prototype (two linked surfaces, an internal web app and the public guides it feeds).

| Route | What's on it | Status |
|---|---|---|
| `/desk/` Today | The day's run, from new companies found to the founders picked, drafted and approved, daily cap 30 to 50 | required, build |
| `/desk/` founder drawer | Why they fit (the eight dot fit check), the call matched, the drafted message, the follow up plan, approve or skip | required, build |
| `/desk/` Calls | Every open call with founders matched and the deadline | required, build |
| `/desk/` Inbox | Replies sorted by intent, suggested answers, booking straight into the funding call | required, build |
| `/desk/` Guides | The guide plan, which call each guide serves, its search, its stage, links to the live guides | required, build |
| `/desk/` Results | The funnel and a planner where you set the daily number and rates | required, build |
| `/desk/` Setup | Sources, the skip rules, voice and signature, sending hours, daily cap | required, build |
| `/` | bidx.ai home rebuilt around the guides and the open calls | required, build |
| `/guides/` | The guides library, search and filter | required, build |
| `/guides/<call>/` x3 | Three full guides on calls open now, facts from the funder's own pages | required, build |
| `/calls/` | Every open call, closing date, size, who can apply | required, build |
| `/fit/` | The fit check that ends in the booking | required, build |
| Real sending, LinkedIn and email accounts, CRM sync | Not part of a sketch | deferred |
| Login and accounts | Not part of a sketch | deferred |

## Business model (A4), from their own pages, 20 Oct

- What they sell. Grant writing for UK startups and SMEs, "Grant-Writer-Led Funding", "£100K - £2M Grant Funding
  Without Giving up Equity", every page ending in "Book FREE funding call" (https://bidx.ai/). A professional fee with a
  refund promise and a success fee ("If we cannot identify a suitable route at initial review, we refund the
  professional fee. No grant cash received, no success fee.").
- A platform too. https://bidx.ai/lp1 shows the BidX app (Home, Find opportunities, Pipeline, Content Library) and
  names "Opportunity finder", "Grant writer", "Grant analyser", "Compliance checker", "Opportunity alerts". The app
  lives at app.bidx.ai (their privacy and terms links point there).
- How founders reach them today. Two ad style landing pages (/lp1, /landing), a Google Ads tag (AW-16776043498) in the
  page head, and one booking widget (https://get.bidx.ai/widget/bookings/book-your-free-consultation-and-win-100k-2m-funding).
  The blog has no posts. So founders arrive by ads or by already searching for grant help.
- The buyers. UK founders, tech startups and SMEs. Proof on the home page, "BidX helped Flock win £600K after a failed
  Innovate UK application", "BidX helped us win £393K to accelerate growth for our energy startup", "BidX unlocked
  £250K in non-dilutive funding for CBC", plus "£125M+ secured • 312+ founders funded" (company reported).
- The team. Simon Dutta, MBA, FCIM, Co Founder, Growth & GTM, and Aaron Mason, PhD, Co Founder, Product & AI, who
  "directly leads BidX's AI and funding systems".

The job to be done (J1). Every working day, find the UK founders who fit a call that's open now, reach them before the
deadline in a message worth answering, and turn the answers into free funding calls, while the guides catch the
founders who are already searching.

## Brand evidence (A2)

- Logo, `Logo-Ligth-Bidx.svg`, eight dots in three columns, #FF3D57 red, #FFCA00 yellow, #00D747 green, and the BidX
  wordmark in #1E1E1E. Red and yellow on the left, green on the right, pointing forward.
- Their own red to green scale. The lp1 page shows a red, orange, green gauge for "Bid Success Rate : High" and a
  "Compliance checker" gauge per answer. The home page "Overall fit 92 / 100" card scores four criteria with ticks.
  Red, amber and green already mean fit in their own material.
- Site colours from the HTML, navy #24223E, indigo #272FA9 and #292FA2, green #52B35B and #75C27C, lilac #B2ADD1,
  blue #239DDB. Buttons run an indigo to green gradient. Fonts Poppins, Montserrat, Overpass (Brizy defaults).
- Vocabulary. "scoring signals", "reverse-engineers", "fundable", "high-fit grants", "funding route", "funding call",
  "win-ready", "assessor", "technical narrative". Founder facing, plain, British spelling.
- Site builder, Brizy cloud (becdn.net assets), the look of a template, gradient cards, Poppins.

## The governing concept (C1)

**BidX's logo is already a fit check, eight dots that go from red to green, so the whole system reads a founder the way
an assessor reads an application, dot by dot, until they turn green for a call that's open now.**

It controls
- iconography, every founder's fit is the logo's own eight dot shape, each dot one criterion, red, amber or green;
- UI demonstration, the fit breakdown, the board of open calls and the daily run all speak in dots;
- colour, red, amber and green mean fit and nothing else, BidX indigo means an action, ink is their wordmark black;
- typography, the deadlines and counts are set in a round dot matrix (Doto, ROND 100), the same circles as the logo;
- motion, dots only move when data changes, a criterion turning green, a counter, a countdown, never decoration;
- copy voice, assessor language, fit, score, signal, call, deadline, in plain British English;
- navigation and status, the sidebar and every status chip use the dot.

Three adjectives, from their evidence. Scored (their whole pitch is how grants are scored), direct ("Direct Access to
Grant Writers"), urgent (deadlines, "Grant cycles close fast").
Three anti adjectives. Gimmicky, salesy, template.
Why it must not look like generic SaaS. BidX's own site already is the template (gradient cards, Poppins), and the
AI kit (dark sky, glow, glass, bento, a pill above a centred headline, fade up on everything) is what a founder with a
prompt could make. The dots are theirs and nobody else's.

## Typography (C2)

- Host Grotesk (OFL, Google Fonts), headings and UI, 400 to 700. Rounded terminals that sit with the logo's circles,
  not Poppins, not Inter, not any of the last three builds (Jost for Healthy Secrets, Barlow and Newsreader for
  justclaims, Garnish's serif set).
- Doto (OFL, variable, ROND 100), round dot matrix for deadlines, counts and the board, numbers only, never body text.
- Martian Mono (OFL), timestamps, ids and data labels, small.
- All self hosted woff2, latin subset.

## Colour budget (I9)

Paper white, a cool mist (#F5F6FA, close to their #F8F9FE), ink #1E1E1E, navy #24223E for the one dark surface, BidX
indigo #272FA9 for actions and links. The logo's #FF3D57, #FFCA00 and #00D747 for dots only, with text safe shades
for words. Their indigo to green gradient once, on the brand moment, never on every button.

## Anti references

Their current site (gradient cards everywhere), the 2024 AI kit, the dated UK grant consultancies in the teardown
(Myriad, GrantTree, Ryan, stock teams in blue boxes), and Instrumentl and Grantable's cream and serif.


## Build, QA and score (21 Oct)

Built and live at https://astra-bidx-prototype.netlify.app/desk/ with the guides and call pages on the same site.
The full QA record, the G1 score (89 of 100, the gap is imagery), C5, I14, asset provenance, the things that must
not surprise anyone and the side findings are in handover.md. The IFS listing was re-read on 21 Oct, same 31 calls,
same closing dates, four statuses changed to Open now and were updated. BidX's own £99,350 Innovate UK award (2024,
project 10105102) was confirmed in the UKRI funded projects list and in Gateway to Research and is on the home page.
