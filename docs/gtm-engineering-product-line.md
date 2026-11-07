# The GTM engineering product line, first thinking (5 Nov 2026)

Raka, 5 Nov, "I want to basically sell the GTM engineering stuff ... teaching GTM engineering, levelling up your GTM
engineering skills, the revenue analysis ... strategy session ... GTM automation and outbound and loyalty flow
engineering ... maintenance and also the CRO part time ... or part time RevOps manager". A friend asked him to teach
him GTM engineering, and he's been thinking about a course.

This is a thinking doc, not a decision. Prices below are my suggestions for him to change. Nothing here goes to a lead.

## Why this fits us better than it might look

1. **Raka's own record is a GTM record.** Global GTM and Campaign Manager at Betty Blocks (ICP segmentation,
   enrichment, scoring, routing, follow up loops, playbooks across SDR, AE, Marketing and RevOps). Sales and Channel
   Operations Manager at efficy, a CRM vendor. Data and insights lead at Heineken, 23 markets. Source,
   `docs/astra-master-context.md` section 2A. The website work borrows his credibility, this spends it directly.
2. **We've been running a GTM engine on ourselves for four months, and it's all in this repo.** Research agents, the
   enrichment pipeline, the opener template with machine checked gates (`tools/check-drafts.py`), per thread lemlist
   pulls (`tools/lemlist.py`), inbox triage every two hours, a weekly scorecard, A/B tested openers. The numbers in
   `docs/gtm-plan.md`, 330 cold pitches to 25 Oct, yes rate 4% in September and 15% in October, reply rate 30% in
   October. That's a case study and a curriculum, already written.
3. **The ICP we already target is the buyer.** Tier 1 in the GTM plan is owners of B2B companies, 5 to 50 staff, in
   NL, Flanders, DACH and the UK. Those companies need pipeline more than they need a new homepage, and "more meetings
   with the right people" touches how they make money, which is the RULES 0E bar.

**The honest gap.** We have no paid project yet (gtm-plan, still true in the 2 Nov logs). So the proof is of the
process and the reply rates, not of revenue closed. Every claim about our own engine has to say that, or it'll fall
over on the first call.

## The one thing to avoid, the menu

HotGreen got a proposal with everything in it and took nothing (gtm-plan section 6). Six offers on one page is that
menu again. So the line is split by **who's buying**, and each buyer gets one door.

| Buyer | What they want | Their door |
|---|---|---|
| A person who wants to become a GTM engineer (Raka's friend, SDRs, marketers, ops people) | A skill and a job | The course |
| A practitioner already doing it | To get better and faster | The level up |
| A company that wants its team to do it | Trained people, in house | Team training |
| A B2B owner who wants more pipeline | Meetings and revenue | The Revenue Health Check |

Two sides, then. **Learn** (the academy) and **Revenue Engine** (done for you). They don't share a pitch, a page or a
campaign.

## Learn, the academy side

| Offer | Shape | Suggested price | Notes |
|---|---|---|---|
| GTM Engineering Foundations | 4 to 6 week cohort, live sessions plus builds, each student ships a working outbound engine on their own target list | €400 to €750 a person | The friend is student one. Run it free or cheap for him, record it, turn it into the course |
| Level Up | Shorter, advanced. AI research agents, enrichment and scoring, quality gates, reply handling, measuring what works | €750 to €1,500 a person | Where the repo's tooling is the material |
| Team training | Foundations or Level Up delivered to one company's team, on their own CRM and their own ICP | €3,000 to €8,000 a programme | The bridge to the Revenue Engine side, a trained team still needs the system built |

The curriculum, roughly, in the order we actually learned it.

1. ICP and the list. Who to target, and the targeting analysis that showed consumer says yes and can't pay.
2. Research that holds up. Source ranking, the falsification pass, never trusting a snippet.
3. The message. One problem start to finish, the opener template, why fixed wording beats clever wording.
4. Automation and AI agents. Enrichment, research at scale, the checks that stop an agent sending nonsense.
5. The inbox. Replies, nudges, follow up limits, getting to the call.
6. Measuring it. The scorecard, A/B tests, reading a reply rate honestly.

Everything in the repo is real client and lead data, so course material is rebuilt on made up companies. No lead
names, threads or screenshots leave the repo.

## Revenue Engine, the done for you side

A ladder, so a business can start small and each step sells the next.

| Step | What it is | Suggested price |
|---|---|---|
| 1. Revenue Health Check | The deep analysis. ICP, funnel and conversion by stage, the process today, the stack and the data in it, where deals stall, the recommended process, flows and connections. Ends in a strategy session where we walk them through it and name the one thing to build first | €1,500 to €3,500, credited against step 2 if they go ahead |
| 2. Build | The engine itself. AI powered outbound, enrichment and scoring, lead routing, follow up and reply flows, CRM hygiene, and the loyalty side (onboarding, retention, reactivation and referral flows for existing customers) | €4,000 to €15,000, scoped from the Health Check |
| 3. Run | Monthly maintenance, monitoring, list refreshes, prompt and message updates, a monthly numbers review | €750 to €2,000 a month |
| 4. Fractional RevOps or CRO | Raka part time, a day or two a week, owning the revenue process and the team running it | €2,500 to €5,000 a month |

The strategy session on its own (the €375 one from the Acquitas proposal, `logs/meetings/2026-10-07-Acquitas-proposal.md`)
can stay as the small paid start the GTM plan asks for, but the Health Check is the real front door.

## Things Raka has to decide, or check

1. **efficy.** He's employed there as Sales and Channel Operations Manager. A fractional RevOps or CRO role, and
   possibly a paid course on CRM and GTM, could collide with his contract (side work, non compete, IP). Worth reading
   the contract before step 4 is offered to anyone.
2. **Capacity.** Only Raka has this skill on the team. The course scales, the fractional seat doesn't. I'd cap
   fractional at one client until the rest runs.
3. **Which tools we teach and build on.** What we actually run is lemlist, Claude agents and git state files. If the
   offer names Clay, HubSpot, n8n or Make, we should have built on them first, or we're selling something we haven't
   done.
4. **The brand.** Inside Astra (a "Revenue" line next to Grow, Optimise, Innovate, Build Squad) or a separate name for
   the academy, since course buyers aren't agency buyers. My lean is the academy under Raka's own name, because
   people buy a course from a person, and Revenue Engine under Astra.
5. **The targeting rule flips for the academy.** The GTM plan says don't pitch agencies, growth consultants and
   recruiters because they sell what we sell. For the course they're exactly who buys. Separate campaign, separate
   rules.
6. **The prices.** Everything above is my starting point, his call as always.

## A first month, if he wants to start

1. **Week 1.** Teach the friend. Two or three sessions on Foundations, recorded, with his questions written down. That
   tests the curriculum before anyone pays.
2. **Week 1 to 2.** Write our own case study, "how we built our outbound engine", with the real numbers and the
   honest caveat on revenue. It's the proof for both sides.
3. **Week 2.** Build the base deck (outline below) and one landing page per side.
4. **Week 3.** Offer the Health Check to three Tier 1 B2B owners already in a warm thread, as the new angle when the
   website angle doesn't fit.
5. **Week 4.** Open a small paid Foundations cohort, 5 to 8 people, announced through Raka's LinkedIn. His posts on AI
   agents doing real work while he's at the gym are already this audience.

## The base deck, an outline

1. The problem. B2B teams buy tools and still don't get meetings.
2. What GTM engineering is, in one plain sentence.
3. Who we are. Raka's record (Betty Blocks, efficy, Heineken) and the team.
4. Our own engine, the case study with real numbers.
5. Learn. Foundations, Level Up, team training.
6. Revenue Engine. Health Check, Build, Run, Fractional.
7. How a Health Check works, step by step, and what they get at the end.
8. Prices, or "from" prices.
9. How to start. One step per buyer.

The deck follows `docs/build-and-deck.md` and the no Claude look rules once the structure is agreed.

## The base deck, built 5 Nov

Google Slides, in the Astra deck's own style (Inter, navy, greige, the arches, the deck's own photos):
https://docs.google.com/presentation/d/12EGOK5OpWevHEMVFIiIKWJu1zmtJ861KIHznGSzMRNo/edit

15 slides. The generator is `tools/gtm-deck-slides.py` and the image crops are in `assets/gtm-deck/`, served to Slides from
this public repo by commit SHA. Prices on slides 10, 11 and 12 are the suggestions above and still need Raka's numbers.
To confirm with Raka: "Leexi" as the call tool, raka@astraagency.nl as the contact, and naming efficy while he works there.

## The academy pitch deck, built 6 Nov

Raka, 6 Nov, "make the deck ... really pitch winning and sales winning ... tell the whole story of what we can do."
Google Slides, same style as the base deck:
https://docs.google.com/presentation/d/1M3L_h7B8XYm7RVROspqOejHmEKbkHZd4xmUuYL1XeW0/edit

15 slides. Cover, why now, the chain of nine steps every sale runs on, who teaches it, Astra's own engine as the proof
(330 researched first messages 14 Jul to 25 Oct, 15% yes in October against 4% in September, 7 meetings by 25 Oct),
the GTM Engineering Score and its four bands, the three levels, what you build at each level, the two role courses, how
every course works, the two formats, prices, the done for you tiers (Health Check €1,500 to €3,500, Engine Build from
€4,000, Run and RevOps from €750 a month), who it's for and who it isn't, and where to start.

The generator is `tools/gtm-academy-deck-slides.py`. Every slide was checked as a thumbnail after the build, and three
were fixed by hand (noted in the generator's docstring). Every price on it matches the course files in `docs/academy/`.

## The academy deck rebuilt in Canva, in the brand fonts (6 Nov)

Raka, 6 Nov, "so hard to read still ... use the right fonts ... be creative with the shapes ... the use of images
is going to be really strong." The brand deck's fonts (The Seasons, Solomon Sans, Cerebri Sans, Open Sauce One) are
licensed Canva fonts that Google Slides can't load, so the deck was rebuilt inside a copy of the brand deck in Canva:
https://www.canva.com/d/7D6fXoMiAz6BSh6 (design DAHaJAXOLEs, 15 slides). Working copy with the unused brand pages
at the end is DAHaJIb3fbg. The original brand deck DAG8WBvhY7s was not touched.

How it was built, for the next session. Text added through the Canva API gets Canva's default font, so every line
on the slides reuses an existing brand text box (replace or find and replace keeps its font). replace_text on a box
that was a bullet list can add a bullet to a heading; format_text list_level 0 removes it. Some stock photos in the
brand deck render with a Canva watermark in API previews (MAGgACgERsk was swapped for MAG9YVoETeY); check the
exported PDF before sending.

## The academy deck in Google Slides, off Luna's template (6 Nov, current version)

Raka, 6 Nov, "yes do it in slides off luna's template", after pointing out that the Schumacher deck works in Slides
with lookalike fonts. This replaces the Canva build as the version to use.
https://docs.google.com/presentation/d/1BHyetlHNCWacOaHR2en3xzXN1SS8t_egIVJDv7nXcXA/edit (15 slides).

It is a copy of Luna's template, so it keeps her Sora and Cormorant Garamond type, her arches, plates and photos.
Order. Cover, Why GTM engineering now, One chain six links, Who teaches it, Our own engine (330, 15%, 7), Your
free GTM score, Three levels one ladder, What you build, By role, How every course works, Two ways to learn, The
prices, Rather have it built, Is this for you, Start here.

How it was built. Every line is a replaceAllText scoped to one slide with pageObjectIds, replaced run by run so the
bold sans and italic serif accents carry over. Order matters, a long sentence before any short word inside it, and
a short pattern like "For " hits every run on the slide (it changed three card subtitles once, reverted). Slides
reorder one slide per updateSlidesPosition request, since a multi slide move must already be in presentation order.
All 15 thumbnails checked after the last edit, and a full text pull showed no dashes and no colons outside "1:1".

Still open for Raka. "RAKA TO ADD a photo of you" sits on the photo band on Who teaches it. "RAKA TO CONFIRM these
prices" sits under the price table, together with the efficy line on the bio. The Canva copies DAHaJAXOLEs and
DAHaJIb3fbg can be deleted in Canva, the API has no delete.

## The academy deck, final shape: two doors in Canva (6 Nov, current version)

Raka, 6 Nov, "I prefer the Canva one, but ... free license pictures ... tell the whole story ... I teach you or I build
you ... full offerings." This supersedes the Slides version above. Canva design DAHaJAXOLEs, 18 pages, edited in place
on his choice, saved after he approved the preview.

Order. Cover (learn it, or have it built), Why now, The chain, Who teaches it, Our own engine, Two ways in (I teach
you, I build it for you), then the teach door (Score, Three levels, What you build, Role courses with team seats, How
every course works, Self learn or 1:1, Prices), then the build door (Rather have it built, Everything we build, How a
build runs), Which door is yours, Start here (free score, Health Check, or a call).

The part time RevOps lead is on the slides at €2,500 to €5,000 a month, Raka's call on 6 Nov. The efficy contract
question in "Things Raka has to decide" still stands.

Every photo is CC0, found through Openverse. Burst photos come from burst.shopifycdn.com at 2400 px. The rawpixel ones
use the editor_1024 size, because rawpixel's image_1300 size carries a faint tiled watermark (checked 6 Nov). The page
7 and page 8 Architect picture is "Illuminated Night Sky with Stars over Mount Erciyes" (Wikimedia, CC0). A first
batch of uploads with the watermark sits unused in Raka's Canva uploads and can be deleted there.

| Slot | Photo | Licence | Source |
|---|---|---|---|
| p1 | View woman working laptop desk | cc0 | https://www.rawpixel.com/image/8809250/photo-image-books-hands-social-media |
| p2 | Free winter snow trees photo | cc0 | https://www.rawpixel.com/image/5912015/image-cloud-public-domain-leaf |
| p3 | Free networking cables image | cc0 | https://www.rawpixel.com/image/5927852/photo-image-background-public-domain-technology |
| p4 | Rose shadow wall | cc0 | https://www.rawpixel.com/image/6037632/photo-image-flower-public-domain-shadow |
| p5 | Free networking cables image | cc0 | https://www.rawpixel.com/image/5918994/image-background-public-domain-technology |
| p6 | Free forest path image | cc0 | https://www.rawpixel.com/image/5928071/photo-image-background-public-domain-trees |
| p7a | Skye, United Kingdom | cc0 | https://www.rawpixel.com/image/3301336/free-photo-image-cottage-building-cabin |
| p7b | Salento Quindio - Valle del | cc0 | https://www.rawpixel.com/image/6077773/salento-quindio-valle-del-cocora |
| p7c | Steep slopes rocky mountains Ollantaytambo | cc0 | https://www.rawpixel.com/image/3304206/free-photo-image-painting-cloudy-adventure |
| p7d | Misty fog wraps snowy mountain | cc0 | https://www.rawpixel.com/image/3296422/free-photo-image-nature-adelboden-alp |
| p8a | Free afterglow sky image | cc0 | https://www.rawpixel.com/image/5908179/photo-image-cloud-public-domain-sky |
| p8b | Night Sky Stars Over Lake | cc0 | https://www.rawpixel.com/image/5970221/night-sky-stars-over-lake |
| p8c | An aircraft in the sky | cc0 | https://www.rawpixel.com/image/431934/free-photo-image-sky-clouds-flying-above |
| p9 | untitled | cc0 | https://www.rawpixel.com/image/5938597/free-public-domain-cc0-photo |
| p10 | High clouds forming sky | cc0 | https://www.rawpixel.com/image/444767/white-cloud-blue-sky |
| p12 | blue night sky star light | cc0 | https://www.rawpixel.com/image/3283556/free-photo-image-usa-countryside-forest-america |
| p15 | NRCS snow survey shop at the headquarters | cc0 | https://www.rawpixel.com/image/3334995/free-photo-image-garage-bozeman-cc0 |
| p16 | untitled | cc0 | https://www.rawpixel.com/image/5907674/free-public-domain-cc0-photo |
| p18 | Shadow window frame plants pots | cc0 | https://www.rawpixel.com/image/3282454/free-photo-image-shadow-window-tablecloth |

Canva API notes. merge-designs takes one operation per call. A copy of a page comes from inserting the same design's
pages and moving them. crop_media takes the image box (top, left, width, height) relative to the element.
find_and_replace_text "For " style patterns hit every run in the element, so keep finds specific.

## GTM automation, the flow rebuilt (6 Nov, current version)

Raka, 6 Nov. Call it GTM automation, make the problem bigger (you're winning now, what about next quarter and next
year), add group packages and team seminars, show the curriculum in full, list everything we build, use Eten Maar,
Betty Blocks and efficy as proof, then "I don't feel like the flow of it ... reanalyze it". Our Own Engine is dropped.
Same Canva design DAHaJAXOLEs, saved after he approved the preview and the page moves. 22 pages.

| # | Page | Job in the story |
|---|---|---|
| 1 | Cover | GTM automation, taught or built |
| 2 | Why GTM automation now | The pain, this quarter is fine, next year the manual way hits its limit |
| 3 | What GTM automation runs | What it is, the six links |
| 4 | Who's behind it | Raka |
| 5 | Proof from real work | Eten Maar, Betty Blocks, efficy |
| 6 | Two ways in | I teach you, or I build it for you |
| 7 | I teach you, pick your path | Sell better, a GTM career, train your team |
| 8 | Every course, step by step | The format |
| 9 | The score | Find your level |
| 10 | Three levels, one ladder | The career path |
| 11 to 13 | Level 1, 2, 3 | Curriculum module by module, from docs/academy |
| 14 | Want to sell better? | GTM Seller and GTM Leader modules |
| 15 | For your team | Seminar and group package, €3,000 to €8,000 per team |
| 16 | Two ways to learn | Self learn or 1:1 |
| 17 | The ladder in prices | Teaching prices |
| 18 | I build it for you | Health Check, Engine Build, Run or Direct |
| 19 | Everything we build | Campaigns, AI agents, lead to loyalty, forecasting, feedback loops |
| 20 | How a build runs | Health Check, seminar, build, hand over, run, Fractional RevOps Director |
| 21 | Which door is yours? | Self select |
| 22 | Start here | Score, Health Check, or a call |

Facts and where they come from. "€0 to €100K revenue in a year" for Eten Maar is Raka's own statement on 6 Nov, not
recorded anywhere else in the repo. "GTM engineering and RevOps job postings rose 205% in 2025" is Bloomberry
(https://bloomberry.com/blog/i-analyzed-1000-gtm-engineering-jobs-here-is-what-i-learned/), January to September 2025
against the same months of 2024, checked on the page 6 Nov. Team pricing €3,000 to €8,000 is Raka's pick from the
earlier suggestion. The efficy contract question still stands for the Fractional RevOps Director offer.

Canva API lesson. replace_text on a text box with mixed bold and normal runs drops the brand font to Canva's default,
and format_text cannot set a font back. For those boxes, change each run with find_and_replace_text instead.

## New prices in the deck, and a costs page (6 Nov, later the same day)

Raka set the prices on 6 Nov, and they're saved in Canva design DAHaJAXOLEs, which now has 25 pages. The full sheet with
the course pitches is `docs/gtm-automation-prices-draft.md`, and the preview is `docs/gtm-deck-preview-v3.png`.

| Page | What changed |
|---|---|
| 2 | New. What Is GTM Automation, five plain lines and "In one line" |
| 3 | New. Why Now, 67% (Gartner, 9 Mar 2026), 70% and 84% (Salesforce State of Sales), 205% (Bloomberry) |
| 4 | Problem page retitled What Breaks Next Year |
| 9 | Seller and Engineer tracks from €125 a level, Train your team from €500 |
| 12 | Ladder page renamed The Engineer Track |
| 16 | Seller Track, Levels 1 Find, 2 Reach, 3 Scale at €125 or €1,000. GTM Leader €500 or €2,000 |
| 17 | Seminar €125 per person per hour, one topic. Group package €600 per person per level, from 4 people |
| 19 | Every level €125 or €1,000 with Raka, all three €299 or €2,500, same on both tracks |
| 20 | Health Check free, Strategy €750, builds from €650, automations €150, AI agent €1,000, full engine around €4,000, Run €750 a month, directing €120 an hour |
| 21 | New. What It Costs, three example builds at €800, €2,700 and €4,750 then €750 a month. Illustrations, not client jobs |
| 23 | How a build runs. Health Check free, then Strategy, Build, Hand over with a seminar, Run, Direct |
| 25 | Start Here says the Health Check is free |

Still open. Seller Level 3 (the AI research assistant) has no lessons written yet, because `docs/academy/gtm-seller.md`
is one course of five modules that splits cleanly only into Levels 1 and 2. The academy files still carry the old prices
(€149, €199, €249 and so on), and the deck is now the current source until they're updated.

## The GTM Engine Check, live (7 Nov)

https://astra-gtm-check.netlify.app, Netlify site id 60f7b7d5-f6dd-4e49-8c05-d51c0637285d, deploy 6aeec88062875d0b80ef14df,
team login switched off. Source is `artifacts/gtm-check-site/`, deployed from a clean folder of index.html, img, fonts
and netlify.toml. Live check on 7 Nov: index.html byte identical to the deployed file (sha256 35f0e197...dd04d), all
17 images and fonts 200 and byte identical, title right, Open Sauce One loaded in Chromium, no page errors.

Two paths, For me and For my team, four chapters each. Psychology built in on purpose: goal first, honesty prompts,
a live tally and findings count, a worry question, a self set value used as the price anchor, an engine label.
Money figures come from the visitor's answers. Assumptions are a system takes over 50% of admin (slider), fast
follow up saves 8 in 10 cold leads, 46 working weeks. Maturity weights target and speed 1.3, message and measure 1.1,
data and loyalty 1, signals 0.9, our judgement, not calibrated yet. Prices are the 6 Nov list.

Brand. The six deck colours only. Open Sauce One for every face, Raka's call on 7 Nov, because Solomon Sans and The
Seasons are licensed for Canva use only (see `artifacts/gtm-check-site/FONTS.md`).

Open. No lead capture yet. Not yet tested with real prospects, so the scoring is uncalibrated.

## GTM Engine Check v3, five languages and results sent to Raka (7 Nov)

Deploy 6aeed9b5ebda28e1872ff73a on https://astra-gtm-check.netlify.app.
- Languages. English, Dutch, French, German, Italian in `i18n.js`. Picked from ?lang=, then the visitor's last choice,
  then the browser's languages, else English, with a switcher on every screen. Numbers and euros in the local format,
  number fields read 1.234,5 the local way. Product names stay English as in the deck.
- Sent to Raka. Netlify Forms, form `gtm-check` (id 6aeed9baf6cbe219d8351988), forms enabled on the site. Every
  finished check posts once, kind "completed", without a name. The report has an optional "Send my report to Raka"
  form, kind "contact", with name, email, company and a consent tick it won't send without. The footer says answers go
  to Astra without a name.
- Phone scroll. The overflow clip on html and body is gone (the likely iPhone cause, not reproducible in Chromium),
  the 1px overflow it hid no longer exists, the question photo is shorter on phones.
- Fixes found while testing. A hidden follow up answer (key person share) no longer counts once its trigger is unticked.
  Inputs capped at a billion, hostile inputs fall back to the shown default.
- Tests. `tests/check.js` walks every path in every language, half on an emulated iPhone, with hostile number inputs,
  intercepts the posts and fails on NaN, undefined, null, Infinity, empty money figures, dashes, colons, a missing or
  empty post, a contact sent without consent, a language switch that posts again, a phone swipe that doesn't scroll,
  sideways scroll, and page errors. Last run 50 runs, 100 posts, 0 problems. Both planted faults (NaN money, no post)
  were caught. check-build.js passes.
- Live check. 18 of 18 files byte identical except index.html, where Netlify rewrote the form tag (expected). Netlify
  detected the form with all fields and the honeypot. A test from the live page returned 200 twice and moved the
  form's last_submission_at, but the verified count stayed 0, so Netlify's spam filter held the two test entries
  (data centre IP, example.com address). Real submissions may also land in Spam now and then.

For Raka to do in Netlify (no API for it). Forms, gtm-check, Form notifications, add an email notification to
rifqiraka234@gmail.com. Check the Spam tab now and then and mark real ones as verified. The two test entries there can
be deleted.
