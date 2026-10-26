# Honey It's Handled, handover (26 Oct 2026)

One file for both builds. The prototype agent writes its own section, the plan's section is below. Neither overwrites
the other.

## The plan (written by the plan agent, 26 Oct 2026)

**Flag first, budget.** A one person consumer business, a sole trader since 1 January 2026, one paid private event
(Cinco Cero) plus the Pro League Awards on her Events page. RULES 0G and the GTM plan say one screen and the call ask
without a budget sign. Raka asked for this build by name, so it's built. **No Astra price anywhere in the plan.** The end
chapter says we'll send "a clear scope, price and timeline" after a call, with no figure. Prices are Raka's call.

### Live

| What | URL | Deploy |
|---|---|---|
| The plan, in Astra's voice | https://astra-honeyitshandled-plan.netlify.app/ (planned) | **NOT DEPLOYED**, project a52bb636-5cd8-4a72-8320-4c749e803253 |

**NOT DEPLOYED, Netlify credits exceeded at 12.55 to 13.31 UTC.** Four attempts, deploys 6adf4db5c1bd1d283872b283 (12.55),
6adf4dcf51e73ade4fc6b14f (12.55), 6adf561ed5e4d73c324d4feb (13.31) and 6adf56760dcca14e306ac725 (13.32), every one
"Skipped due to account credit usage exceeded", state error, skipped true. Nothing wrong with the build. The project is
created and team SSO is off (checked in the project's access controls after the change). noindex three ways in the build
(meta, X-Robots-Tag in netlify.toml, robots.txt). When credits are back, deploy site-plan/ from a clean copy with the
deploy-site command, then run the live checks in "What's left" below.

### Who it's for and the one action

Elise reads it, after she said "You can always give me advice if you want to". The one action is a call, "Email Raka" in
the header on every screen and at the end, with "The new site" beside it. Same mailto as the Fae Club plan.

### The idea

Her own palette from her brand reveal of 17 June 2026, "Something Off-White. Something Blue. Something Red.", is the
colour script. Off white for reading, one blue band for the two chapters that carry the argument (the market and when
couples decide), and her red only for the last chapter, the call. Her HH monogram, cut from her own logo file, is the
cover's hero object, filled with moving silk in her colours. The small HH in the header fills with red as she reads.
Mona Sans and Fragment Mono (OFL), her serif stays in her logo files.

### Chapters

1. Today. Her site as it stood this morning, four screenshots (home, the launch offer, Events with two nights, Jan
   Geysen's words), the facts from KBO, Instagram and LinkedIn, her launch offer line in her red.
2. The market. Statbel 2024, 7,919 weddings in the province of Antwerp, the most in ten years. A field of dots, one per
   wedding, her couples in red. Place (city, province, Flanders) and couples a year (1 to 20) are controls. The ten year
   line and the 4,390 weddings registered abroad (destination weddings are on her form).
3. When they decide. Flemish weddings by month, the year as a bar chart. Year (2027, 2028) and months ahead the planner is
   booked (6 to 24) are controls, marks at 12, 18 and 24 from Wedding Dreamworx, Blossoms Together and Art of Events.
   At 12 months, 91% of a 2027 year has reached its booking month by October 2026.
4. Who else they see. Wedding Dreamworx, Salon Weddings (stopping, announced 24 Nov 2025), Flowerytales and Bliss
   Weddings beside her. A chart with two views (weddings told, Instagram followers) and a table, every cell opened today.
5. The money. House of Weddings' survey, about €31,750 for engaged couples. Planner prices as published (Bring us a dream
   from €350 to €10,000, Flowerytales from €3,150 and €5,950 excl. VAT). A budget slider runs Wedding Dreamworx's 15% rule.
6. Why now. Dated, Marry Me Mechelen 1 Nov, Trouw & Trends tickets 16 Nov, December proposals, Het Bruidsparadijs 31 Jan,
   Trouw & Trends Brasschaat 21 Feb (Bliss Weddings will be there) and Mechelen 28 Feb. Behind it, Salon Weddings stopping,
   Statbel's rise, Blossoms Together. A red silk ribbon draws itself down the timeline.
7. The new site. **A labelled placeholder for now** ("Placeholder. The screens of the new site arrive here once it's live.
   Until then this chapter is a placeholder with no screenshots in it."). research/PROTOTYPE_LIVE.txt didn't exist by 13.32
   UTC. The chapter's words describe the prototype from its own flow.md and get reread against the final build.
8. The first couples. Six channels from her own form's question plus the launch offer, each with a sourced fact, what
   we'd do and the number to watch. Four of her own Cinco Cero photos as prints, captioned as a 50th birthday.
9. 90 days. Twelve weeks, the site first, then the season, and five numbers to count.
10. The team, with the partner disclosure, "Built by Amwisesa, Astra's development partner".

### Sources

Plan data, build-plan/data/plan.json. Every figure with its URL, time read and three checks, research/plan-facts.md. Her
site was renamed while we worked (the event pages moved to /events, /cincocero and /proleagueawards at about 12.50 UTC),
the words were rechecked on the new addresses at 12.52.

### What must not be read as fact

- The field of dots places her couples at fixed example spots. They're a share, not addresses.
- The wedding year uses 2024's Flemish months as the shape of 2027 and 2028. Booking lead times are what two Flemish
  planners and one survey say, not a law. The survey (House of Weddings, over 1,000 respondents, more than 80% women) is
  self selected, and the plan says so under every chart that uses it.
- Wedding Dreamworx's 15% is its own rule of thumb for its clients, applied to a budget the reader sets.
- "Weddings told" counts wedding story pages on each site on 26 Oct. Bliss Weddings' gallery has no names, counted 0.
  Wedding Dreamworx's Instagram didn't load for us, so it has no bar, "Not read".
- The Pro League Awards are quoted from her own page. The plan doesn't say whose company ran the night.
- The 90 days and the channel ideas are our proposal, not her plan.
- Nothing in the plan is a price from Astra.

### QA that ran, all on 26 Oct

All local, on http://localhost:8731 serving site-plan/, before any deploy. Scripts in qa/.

- Functional, qa/plan-honey-func.js, **21 of 21**. Every expected value worked out in the test from data/plan.json. The
  field in 12 states (three places, 1, 7, 10 and 20 couples, "10 couples is 1 in 792"), red dots drawn and more of them
  for more couples (230 against 4,480 pixels), the wedding year in 10 states (2027 and 2028, 6, 12, 15, 18 and 24 months,
  2027 at 12 is 24,806 of 27,147, 91%), the copy's claims against the data (7,919 the most in ten years, +6.7%, +4.3%, 1 in
  792, nine in ten, 9% abroad), the rivals chart in both views, the money at four budgets with the marker's place and
  flip (€4,763 at €31,750), the no script page showing the same defaults as the script, every image decoded and every
  reveal fired, the header monogram full at the foot, the art waiting for a gesture and never under reduced motion, the
  placeholder labelled, no script errors. **Plant mode, 0 of 21**, every planted fault caught.
- The test found two real faults on its first run, both fixed. The new dots' grow animation could start before its own
  birth time and threw "radius is negative", which stopped the field redrawing. And Python's half to even rounding gave
  €4,762 in the static page against the browser's €4,763, now rounded half up in both.
- axe, qa/plan-honey-axe.js, **clean in 8 runs** (1280 and 390, reduced and full motion, default and switched controls,
  tables open). Plant, a low contrast line, reported in 8 of 8.
- Overflow, qa/plan-honey-overflow.js, **none at nine widths from 1920 to 320, both motion settings** (18 loads), each
  after the whole page was scrolled, every control in its widest state and a resize. Plant, a too wide block at 390,
  caught in both of its loads. The walk for a clipping parent stops below the body, which clips sideways overflow.
- Copy, qa/plan-honey-copy.js, **clean** in every reachable state at 1440 and 390, no dashes, colons, banned words,
  hedges, uncontracted verbs or exclamation marks. Plant, four kinds planted, four found. NO-AI-SLOP section 8 grep over
  the page text clean, prose sentence length stdev 8.2 words.
- Lighthouse local, phone 96 performance (LCP 2.7 s, TBT 90 ms, CLS 0), desktop 100, accessibility and best practices
  100 on both, SEO 66 is the noindex.
- Every chapter screenshotted at 1440 and 390 and looked at, plus the whole page without script and under reduced
  motion. Without script every chapter reads, the field shows its drawn default and the charts their default state.

### What's left, once Netlify takes deploys

1. Deploy site-plan/, then hash every live file against the deploy (30 files), fetch a 404 control, cold load at 1440 and
   390 with error capture, rerun plan-honey-func.js against the live URL, and Lighthouse on the live URL.
2. Once research/PROTOTYPE_LIVE.txt holds the prototype's URL, `node build-plan/shots/capture.js <url> build-plan/shots`,
   look at every screen, write each screen's heading and line into data/plan.json under built.shots (and phones), reread
   chapter VII's lede against the final build, rebuild, rerun the four QA scripts and redeploy.

### Rebuild

`python3 plan.py` in build-plan (needs Pillow, /usr/bin/python3 has it), writes site-plan/. The first run read today's
screenshots and her brand files from the session scratchpad and keeps resized copies in build-plan/media. Prototype
screens, `node build-plan/shots/capture.js <prototype url> build-plan/shots`, then put each screen's caption in
data/plan.json under built.shots and rebuild. The build switches from the placeholder to the screens on its own once
research/PROTOTYPE_LIVE.txt holds the prototype's URL. QA scripts in qa/, prefix plan-.
