# Honey It's Handled, handover (26 Oct 2026)

One file for both builds. The prototype agent writes its own section, the plan's section is below. Neither overwrites
the other.

## The prototype (written by the prototype agent, 26 Oct 2026)

**Flag first, budget.** A one person consumer business, a sole trader since 1 January 2026 (KBO 1032.568.265), one paid
private event of her own (Cinco Cero) and the Pro League Awards on her Events page. RULES 0G and the GTM plan say one
screen and the call ask without a budget sign. Raka asked for this build by name ("leeetss draft for elise!!!!!"), so
it's built. No price for her services anywhere, she publishes none.

### Live

| What | URL | Deploy |
|---|---|---|
| The prototype, her site with the wedding story | https://astra-honeyitshandled-prototype.netlify.app/ (planned) | **NOT DEPLOYED**, project d75c0db1-46e6-4842-b787-b1e2d9102daf |

**NOT DEPLOYED, Netlify credits exceeded.** Three attempts from a clean copy of site/, 13.30.57 (6adf56116776ca7b25090af8),
13.31.19 (6adf562769aa40225bab75d7) and 13.31.46 (6adf5645f14efef1f2724cf7) UTC, every one "Skipped due to account credit
usage exceeded", state error, skipped true. The build is fine. The project is created, team SSO came up on and was
switched off before the first attempt, and the project record confirms it off. noindex three ways (meta, X-Robots-Tag in
netlify.toml, robots.txt). research/PROTOTYPE_LIVE.txt is **not written**, it waits for a verified deploy.

When Netlify takes deploys again. Copy site/ to a clean folder, run the deploy-site command for the project id above from
it, then `python3 qa/livehash.py` (every file hashed against the deploy, a 404 control, the title), cold loads at 1440
and 390 with `node qa/shots.js https://astra-honeyitshandled-prototype.netlify.app/ <out> 1440,390` looked at, `node
qa/func.js https://astra-honeyitshandled-prototype.netlify.app` against the live URL, Lighthouse on the live URL, then
write research/PROTOTYPE_LIVE.txt (one line, the URL and the deploy id) so the plan can take its screenshots.

### The idea

Her own promise, "from your first idea to the final dance", run as the couple's own year, in the three colours she named
for her brand on 17 June, "Something Off-White. Something Blue. Something Red." The hero asks "When's your I do?" and the
date the couple gives (drag it, step it a week, pick it, or "No date yet") is written onto a card that rises out of her red
envelope. Scroll, and every day from today to that date is one ink stroke, and the strokes draw her own HH monogram one day
at a time. Then the guests fill a hall of round tables beside her two real nights, her own Cinco Cero film plays inside her
HH, her red spreads through the paper on the day itself with her line "The details are mine, the moment is yours.", and the
enquiry, "Tell me everything.", arrives already written. Sending folds the card into her envelope and presses her HH
sticker on it, "Consider it handled."

**Signature moments.** The envelope that opens on your date. Your days drawn as her HH (one stroke a day, split red for
days Elise carries and pale blue for yours when the help changes). The hall of tables with Cinco Cero's 125 and the Pro
League Awards' 570+ ringed. Her own aftermovie inside her HH. Her red blooming through the paper. The letter sealed with her
sticker. A planner page with 17 tabs for "Usually found with 17 tabs open".

### Who it's for and the one action

**Who.** A couple in Antwerp or elsewhere in Flanders, usually the bride first, marrying in 2027 or 2028, with no planner
yet, who found Elise on Instagram, Google, at an event or through a friend. Second visitor, someone planning a birthday, a
dinner or a company night. **The one action.** Send Elise the wedding enquiry, as one of her first couples when the date is
in 2027 or 2028, with the date, here or abroad, the guests and the help already written in. "Tell me everything" is on the
first screen beside the date, under the drawing, under the red line, under the launch offer, in the header and in the bar.
The second visitor's link ("Planning a birthday, a dinner or a company night? Tell me about it") sets Private Event in the
same letter. Four lines in research/four-lines.md, the flow table in research/flow.md.

English only. Her site has a Dutch mirror, but the page's own lines (the hero, the drawing, the letter's prefilled text) are
ours, and a Dutch version written by us wouldn't reach the bar. Her own /nl copy is there for the launch version.

### Sources

- Every fact and line, build/data/site.json, each with the page it came from. Her site read 11.55 to 12.00 UTC (all nine
  sitemap pages, English and Dutch, raw HTML and full renders at 1440, every part looked at) and again 13.27 to 13.35 UTC
  before the build that ships. She moved her event pages at about 12.50 UTC to /events, /cincocero and /proleagueawards.
  Every quoted line was rechecked on the new addresses at 13.34 and 13.35 UTC and holds word for word.
- Her Instagram through /embed/ at 12.03 UTC, 137 followers, 6 posts, newest 15 Sep 2026, captions read in full (the
  palette line is the 17 June post).
- Her marks traced from her own PNGs, build/art/trace.py. Her colours from her Wix palette variables.
- Art research, research/award.md (58 renders across two passes, fonts pulled off 13 wedding and event planners and 3
  paper and object houses). Art plan, research/art-direction.md.

### Her words, and where we changed them

Used word for word, "I think ahead, so you don't have
to.", "The details are mine, the moment is yours.", "The person behind the handled.", "Tell me everything.", "Consider it
handled", "You say I do" and "I'll handle the rest." (the end of /weddings), her Pro League sentence, Jan Geysen's words up
to their first exclamation mark, the Cinco Cero brief line, the next steps on /contact, the launch offer. Changed, and she
should see these before launch.
- Full planning, "I'll guide you through the entire journey" became "I'll guide you through all of it" (our banned word list).
- The four steps, "&" written out, "tailored" and "a focus on experience" cut, "pleople" and "possibillities" fixed.
- Partial planning, "Already on your way, but need" became "Already on your way and need".
- "A little more Elise", "Usally" fixed, "&" written out, "Non-negotiable" written "Non negotiable" (our no dash rule).
- The launch offer, "recieve" fixed. "Can't wait to hear from you! Elise" lost its exclamation mark.
- Ours, not hers, "When's your I do?", "How many people are coming?", "Wedding planner in Antwerp, here and abroad", the
  count lines, the hall comparisons, the letter's prefilled first lines and every label.

### What must not be read as fact

- The split in the drawing for partial planning (half the days) and for wedding day coordination (the last 8 weeks) is an
  example, and the page says so under the drawing. Her pages give the idea, not the weeks.
- "No date yet" counts to 1 July of the chosen year.
- The hall is our drawing, tables of ten in rows, not her venue or her floor plan. The rings mark where 125 and 570 guests
  would end on that drawing.
- The Pro League Awards are her page's words and nothing more. Nothing says who ran the night or her role in it.
- Her launch offer's terms beyond her own sentence (the size of the discount) aren't stated, because she doesn't state them.
- The envelope, the card and the paper are our drawing of her stationery. The HH and the wordmark are her own artwork,
  traced. Dancing Script on the card is the script her own site loads, not proven to be her sticker's face.
- Nothing is sent. The letter says so, the note bar says so, and the fallback opens the visitor's own email to
  info@honeyitshandled.com with the whole request in it.

### Every photo, and the film

All from honeyitshandled.com, downloaded 26 Oct 2026 from the files her pages serve (static.wixstatic.com/media/<id>).
build/media/manifest.json has each one's id, page, alt text there, sha256 of the original and crop.

| On the page | Her file | Where it sits on her site | Notes |
|---|---|---|---|
| Elise with a book on her head | 42a973_b81dcffa835148faa694db932822a92f | /about, alt "Honey it's Handled - Elise Laeven" | Next to her own words only |
| Elise on her phone | 42a973_05bb1bcabb13435d9f57c052465e628f | /contact, alt "Honey it's Handled_Elise Laeven" | |
| The Cinco Cero sign | 42a973_427f62a1f26148caaf6c412ba7c974b6 | home glimpse, a Cinco Cero photo by its name | Beside Jan Geysen's words, it shows the sign, not a person |
| Her sticker on red tiles | 42a973_68e0f87cfc4b49038f8572369a98e84f | /weddings, alt "HIH-ENVELOPPE-1" | Her own branding |
| The Handelsbeurs roof and galleries | 42a973_f181779ca0d8460eb26ea5d57717a6ca | Pro League Awards 011, by Kaat DM | **Cropped to the top 65.5%**, the ground floor arcade carries a Pro League and sponsor wall (Coca-Cola and others). The coats of arms in the roof are the building's |
| Tables from above | 42a973_f107cefb41c441579cfb9880226dd3a9 | Pro League Awards 035, by Kaat DM | **Cropped to the top 47.5%**, leaving out the nearest table card ("TABLE 25" with an unreadable mark). The far cards are a few pixels |
| Film, the disco ball and the dance floor | 42a973_5f3af2a4edee4ae89f88decc764ab82c | the Cinco Cero aftermovie, 76.35 s | 44.0 to 46.6 s and 56.1 to 57.7 s, 960 by 540, no sound, plays only on screen, never under reduced motion or data saver |

Credits on the page, "Photos by Kaat DM." under the Pro League Awards and in the footer. Left out on purpose, the photos on
/weddings (alt "Honey it's Handled_Wedding"), whose origin isn't stated, six of them 735 or 736 px wide, the width Pinterest
serves. Nothing on the page is captioned or implied as her wedding, her couple or her client beyond what her pages say.
Cinco Cero is only ever "A 50th birthday".

### QA that ran, all local on 26 Oct, last on build hash 7f9c854b40137c58 (unchanged across the chain, 13.44 to 13.47 UTC)

Scripts in qa/, served from site/ on 127.0.0.1:8711, today fixed with ?today=2026-10-26.
- Functional, qa/func.js, **28 of 28**. Every expected value worked out in the test from site.json and date sums. The date
  writing the card, count, bar and letter, the arrows, the drag, one stroke a day (229 for 12 June 2027) all inked at the
  end and half at half, partial and day coordination splits, 125 and 600 guests and the two rings, abroad writing
  Destination Wedding, the offer only for 2027 and 2028, no date yet, an edited letter kept, an empty letter caught, the
  sealed letter with the whole request in the mail, the private event route, the bar stepping aside, the hero call landing
  on the letter, the film, reduced motion complete and still, no overflow at nine widths from 1920 to 320, the sticker never
  on the card's words, notes never overlapping, the phone menu, the first screen holding the question, the date and the
  call, the red spreading as the day arrives, no script errors. **Plant mode, 27 of 28 caught**, the script error check
  passes by design.
- Copy, qa/copy.js, **clean** over 247 unique lines in every reachable state (the drawing walked, 12 state changes, the
  letter's errors, sent, the phone menu), no dashes, colons, banned words, hedges, uncontracted verbs or exclamation marks,
  869 contractions. **Plant, 6 of 6 kinds found.**
- axe, qa/axe.js, **15 runs clean** (1440 and 390, motion on after a full scroll and reduced, back at the top, no date yet,
  menu open, the letter with an error, sealed). **Plant, 15 of 15 reported.**
- Guide walk, qa/guide-walk.js, **0 half screens without a way to the letter** at 390 and 1440, from the top to the footer.
- Lighthouse local, phone 81 to 86 across three runs (LCP 4.0 s simulated, CLS 0), desktop 100, accessibility and best
  practices 100, SEO 66 is the noindex.
- The last change (a function renamed in js/art.js) was followed by func 28 of 28, plant 27 of 28, copy clean, axe 15 of 15
  and the walk with 0 gaps, on the hash above. The earlier chain at 13.35 to 13.40 on 5af3c3cf3c6fbaea gave the same,
  plus copy plant 6 of 6 and axe plant 15 of 15.
- Every section screenshotted at 1440 and 390 and looked at, the states (partial, day coordination, the bloom, the film
  playing, sealing, sealed), and the whole page without script and under reduced motion (7 of 7 images load, every word
  there, the drawing complete).

### Hiccups, each with the rule it leaves

| Hiccup | Rule |
|---|---|
| `var go` (the envelope's opener) and `function go()` (the art loop's start) in one scope. The var assignment replaced the function, the loop never started and the red never bloomed, while every test that set state directly still passed | Name every function in an art script for what it does (openSoon, startArt), and test a scroll scene on a fresh page started by a real wheel, with a plant that blocks the start |
| Potrace traced the paper, not the mark, and the mask lookup rejected pixels at x just below zero, so the drawing used 16 of 27 hatch lines | Trace with the mark as foreground and a padding margin, and test edge lookups with a real coordinate that rounds to zero |
| Her Pro League hall photo carries a sponsor wall in the ground floor arcade, only visible at full size | Zoom every event photo at full resolution for walls, screens and table cards before it ships |
| The sealed envelope showed the card's top corners, the pocket's V started a third of the way down | Draw the pocket from the top corners, as a real envelope is |
| The bar treated a call hidden under itself as on screen and stepped aside, leaving a half screen with no action | A call counts as on screen only between the header and the bar |
| Wix answered 429 to curl on four of seven pages at 13.27 | Reread through Chromium with pauses, never call a page unchanged off a 429 |

### Rebuild

`/usr/local/bin/python3 build/build.py` writes site/. One time steps, already run, `art/trace.py` (her marks),
`art/prep_media.py` (needs the originals in the session scratchpad, the build keeps resized copies), `art/make_fibre.py`.
Fonts are OFL with their licences in build/fonts.

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
