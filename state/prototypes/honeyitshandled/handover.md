# Honey It's Handled, handover (26 Oct 2026)

One file for both builds. The prototype agent writes its own section, the plan's section is below. Neither overwrites
the other.

## The prototype v2, the art build (26 Oct 2026, evening)

**Flag first, budget.** A one person consumer business, a sole trader since 1 January 2026 (KBO 1032.568.265), one paid
private event of her own (Cinco Cero) and the Pro League Awards on her pages. RULES 0G and the GTM plan say one screen and
the call ask without a budget sign. Raka asked for this build by name and sent v1 back for its look, so v2 is built. No
price for her services anywhere, she publishes none.

v1 (build/, site/) is kept untouched for comparison. v2 is build-v2/ writing site-v2/. Raka's words on v1 and the brief
are research/v2-brief.md, the art plan research/art-direction-v2.md, the four lines and the flow research/flow-v2.md.

### Where it is

**NOT DEPLOYED**, Netlify is refusing deploys (account credits exceeded), so nothing was sent to it. One self contained
file for Raka to open from disk,
`/tmp/claude-0/-home-user-astra-agency/24052593-7323-58b2-9e3f-744f7080d43c/scratchpad/bundle/honey-its-handled-prototype-v2.html`
(13.1 MB, 52 files inlined by tools/bundle-site.py, sha256 starts f02f5e62c79d34f2). Opened from disk at 1440 and 390
with error and request capture, 0 script errors, 0 failed loads, 0 requests outside the file, 13 of 13 visible images
decoded (the other 4 belong to the paths and the sealed state not on screen), both fonts loaded, the lacquer drawn, the
mirror ball turning, the film playing inside the figures. The scratchpad is session storage, so the file has to be copied
out before the session ends, or rebuilt with `python3 tools/bundle-site.py state/prototypes/honeyitshandled/site-v2 <out>`.
When Netlify takes deploys again, deploy site-v2/ to the existing project d75c0db1-46e6-4842-b787-b1e2d9102daf (v1's
project, SSO already off) only once Raka has picked v2, then run the live checks in v1's section with the -v2 scripts.

### The idea, in two sentences

Her own post of 15 Sep is the page, "It starts long before the guests arrive. With an idea. And a lot of little decisions.
Every detail considered. So when the doors open... there's nothing left to do but celebrate.", run in the three colours
she named on 17 June, off white for the idea, blue for the decisions behind the scenes, red for the night. The visitor
says what they're celebrating on the first screen, every section answers that visitor in her words and her pictures, and
the enquiry arrives already written in her red room under a mirror ball made of her own photos.

### The signature moments

1. **Her HH in living lacquer.** Her traced monogram poured in her red as glossy liquid (WebGL), settling, rippling like
   honey under the hand, the light in it turning with the path chosen. Rests once settled, a hand wakes it.
2. **Behind the curtain.** A room she set for Cinco Cero (the company path gets the Handelsbeurs) full bleed, the pointer a
   lens onto the same room as a cyanotype in her blue with her own words pinned to it, plus a planner's card with the
   visitor's own date, guests and help. "See what Elise sees" flips the whole photo, which is the phone and keyboard route.
3. **Seventeen tabs.** "Usually found with 17 tabs open" as a planner with 17 index tabs, each a thing her pages say she
   handles. The tabs are the control for the help, and a big 17 fills in her red as she takes them on.
4. **The doors are her HH.** Two tall lacquer doors carrying the halves of her monogram swing open on scroll, light comes
   through the gap, her night is behind them.
5. **Her nights as architecture.** 570+ cut out of the dark as a window onto the Handelsbeurs that opens into the full
   photo as you scroll, and 125 with the Cinco Cero aftermovie from her page playing inside the figures. The visitor's
   number is a third figure dragged along a line with 125 and 570 marked.
6. **Elise as stickers.** Her studio photos cut out with her white die cut edge, slapped onto her blue round "Type A, so
   you don't have to be.", drifting with the pointer, and her "A little more Elise" lines as stickers that peel.
7. **The final dance.** A mirror ball of facets cut from 30 of her photos turns and throws light over her red. Sending
   folds the letter into her envelope and stamps her HH on it, "Consider it handled."

### Who it's for and the one action, per visitor

The first screen asks "What are we celebrating?" and the answer sets the words, the photo under the lens, the door's night,
the order of her nights, the help options, the form type, the letter and every button.
- **The couple** (Our wedding). Proof, her launch offer under the date for 2027 and 2028 and her years in events, then
  Cinco Cero first. Action, "Tell me everything", Wedding or Destination Wedding, as one of her first couples when the
  date qualifies.
- **The host** (A birthday or a dinner). Proof, Cinco Cero and Jan Geysen's words first. Action, "Plan my celebration",
  Private Event, the occasion from her own list.
- **The company** (A company event). Proof, the Pro League Awards '26 and 570+ first, and "Elise in your team" as its own
  choice (her freelance event manager offer). Action, "Hire Elise for your event", Corporate Event.
The header carries Weddings, Events, About and "Tell me everything". The bar at the foot carries the choice so far and
the path's own button, and steps aside for every visible button to the letter and for the letter's fields.

### Sources and when they were read

Her site, all nine sitemap pages, 15.34 to 15.36 UTC and again 17.49 UTC before the final build (all seven text pages
unchanged between the two reads). Her Instagram through /embed/ at 15.42 UTC, 137 followers, 6 posts, newest 15 Sep, all
six captions. 43 of her lines used on the page checked mechanically against the 17.49 read and the captions, 0 missing.
Every fact and line with its source, build-v2/data/site.json. Art research, 34 award sites (FWA, CSS Design Awards,
recent.design, Awwwards and siteinspire refused us) and 26 fashion and event houses rendered 15.36 to 15.56 UTC, written
up with the fonts pulled off each in research/art-direction-v2.md.

### Her words, and where we changed them

Word for word, her 15 Sep post lines as headings, "The details are mine, the moment is yours.", "Tell me everything.",
"Consider it handled", "Type A, so you don't have to be.", her line on the name, her Pro League page sentences, Cinco Cero's
brief line, her 10 Sep caption, "And then, the night came alive." (8 Sep, the emoji left out), Jan Geysen's first sentence
with his own exclamation mark, the four next steps, the launch offer, "Don't worry if you don't have all the answers yet.
That's what I'm here for." Changed, as in v1, "the entire journey" to "all of it", ", but need" to " and need", "recieve"
and "Usally" fixed, "&" written out, "Non-negotiable" without its hyphen. New in v2, her Events list "Bespoke celebrations"
became "Something of your own" and "a full event from concept to execution" became "A full event, from the first idea to
the final guest leaving" (her own words from the same page), both for our banned word and range rules. The company and
private help lines ("Elise takes the tabs you hand her and runs them on the night") are ours in her terms.

### What must not be read as fact

- The pins on the cyanotype are her own words about that night placed on the parts of the photo they describe (the
  string lights, the buffet, the DJ booth). Where exactly each happened in the room is our placing.
- The planner's card lines (timeline open before breakfast, she knows where the florist is, the missing place card
  noticed, plan B ready) are her About page sentence turned into a card, not a real run sheet.
- The 17 tabs are things her pages say she handles, not her service list. Which tabs she takes on a partial plan is the
  visitor's choice, the letter leaves the rest to the first conversation.
- The guests line and its words ("a long table or a few round ones") are ours.
- The Pro League Awards are her page's words and nothing more. Nothing says who hired her or her role that night.
- Her launch offer's size isn't stated because she doesn't state it. The page never says a date is free.
- The mirror ball, the doors, the planner and the lacquer are our objects made from her marks and photos. The HH and
  wordmark are her artwork traced in v1.
- Nothing is sent. The letter says so, the note says so, and the fallback opens the visitor's own email with the whole
  request in it.

### Every photo and the film

All from honeyitshandled.com, the files her pages serve, downloaded 26 Oct. build-v2/media/manifest.json has each one's
id, the page it's on today, its alt there, the sha256 of the original and every crop or edit.

| On the page | Her file | Where it is on her site | Notes |
|---|---|---|---|
| The tent under the lens, and its cyanotype | 42a973_3eba9b82 | /gallerycincocero | Set and empty, no people. The cyanotype is ours |
| The Handelsbeurs (lens on the company path, behind the doors, the 570+ window, full bleed) | 42a973_f181779c | /pro-league-awards, by Kaat DM | **Top 65.5% only**, as v1, clear of the sponsor wall in the arcade |
| The mirror ball behind the doors | 42a973_2dc29647 | / and /cincocero | Guests seen from behind in silhouette |
| The Cinco Cero sign at night, a heat lamp | 42a973_427f62a1, 42a973_aaf72253 | / and /cincocero | Beside Jan Geysen's words, neither shows a person |
| Elise with a book on her head | 42a973_b81dcffa | /about | **Edited.** The Apple mark on her laptop lid is painted out (OpenCV inpaint from the lid). v1 shipped it with the mark. She should know |
| Elise on her phone, sitting, walking | 42a973_05bb1bca, 42a973_6059565d, 42a973_bcd60d05 | /contact, /, /about | Cut out with BiRefNet, white sticker edge ours |
| Her open envelope sticker | 42a973_79da123c | /about and /contact | The sealed state |
| Mirror ball facets | 30 of her photos, list in the manifest | Cinco Cero, Pro League (roof, galleries and set tables only), Elise, her stationery | 128 px squares (media/facets.jpg, looked at), no stage screen or sponsor wall. A few table tiles carry a table number card a few pixels high, and some Cinco Cero tiles show guests, each 10 to 20 px on the ball |
| Film | 42a973_5f3af2a4 | /cincocero aftermovie | v1's 4.2 s cut of the mirror ball and dance floor, no sound, plays only on screen, never under reduced motion or data saver |

Left out on purpose, her /weddings photos (origin unknown, Pinterest widths), every Pro League photo with the stage
screen, red carpet wall, trophies or table cards, the Pro League aftermovie (sponsor walls and identifiable guests), and
42a973_ae0d2b8e (Elise with the laptop's Apple mark front on).

### QA that ran, all local, on one build

QA_RESULTS_V2

### The banned Claude tells, item by item (RULES section 5)

- Serif headline with an italic second half. None, the only serif is her own traced wordmark.
- Small uppercase kicker with a dash. None. Two lines in wide caps (her story line on the hero, her line on the name),
  neither sits over a heading.
- Pill buttons with a sliding arrow. None, every button square. The "A little more Elise" stickers have a 7 px die cut
  radius because her stickers do, and they're stickers, not buttons in the layout.
- Cream and indigo chapters taking turns. No, the ground runs once from off white to blue to red.
- Gradients, glows, overlays on photos. The gradients are lacquer, the light through the doors and the room light under the
  ball. Captions on photos get a shade only where the words sit. No overlay darkens any photo.
- Count up numbers with a source line under each. None count up. 570+ and 125 are windows onto her photo and film.
- Three pillars, four facts with top rules, chips, a marquee, a floating pill, cute illustration scenes. None. The tabs
  are the planner's index tabs and the pins are notes on a photo, the two places that come closest, flagged here.
- Rounded cards with soft shadows. The planner's card under the lens is a square paper sheet with a hard short shadow,
  held over a photo. Flagged.
- Honey v1's tells. One texture under every section, no, each chapter has its own material. A kicker over every heading,
  no. The same two column grid, still present in four places (hero, the date, the tabs, the text under her nights)
  between full bleed scenes, flagged. Photos in boxes, the main photos are full bleed, two small Cinco Cero photos sit
  beside Jan Geysen's words. Motion only fades, no. Her vibe, the wit lines, stickers, lacquer and the fiesta light.
  Every visitor has a path and an action, yes.
- Screenshots beside v1 (scratchpad honey-v2/shots/v1-v2.jpg). v1 is one pale marble page of serif italic and small boxed
  photos. v2 is the lacquer HH, the doors, the figures with her film, the stickers and the ball. Those are the screens
  someone would screenshot.

### Hiccups, each with the rule it leaves

Written up for everyone in docs/build-and-deck.md, "Honey It's Handled v2".

### Rebuild

`/usr/local/bin/python3 build-v2/build.py` writes site-v2/ (deterministic, the same hash twice). One time steps, already
run, `art/prep_v2.py` (needs the originals in the session scratchpad, rembg and opencv, each cut out runs in its own
process), `art/figures.py` (the 125, 570+ and 17 outlines from Mona Sans), `art/ball_still.py` (the still mirror ball).
QA scripts qa/*-v2.js, server `python3 -m http.server 8741 -d <abs path to site-v2>`.

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

## Main session review, 26 Oct ~14.05 UTC

- Looked at the cold load locally, 16 screens at 1440 and 19 at 390, no script errors. The flow holds, the action bar is
  on every screen.
- Every line used as hers rechecked on her live pages (about, contact, cincocero, events, weddings by curl since the
  render hit Wix's "checking your request" screen) and her Instagram embed. All found, apart from typo fixes the handover
  already lists.
- **Fixed.** Jan Geysen's quote ended in a full stop we added. His page has "Honey it's Handled!", so the build now quotes
  it with his exclamation mark, and qa/copy.js exempts that one verbatim quote. Copy audit clean, plant mode caught all 6
  planted kinds, func.js 28 of 28. Rebuilt, hash 2852d3adc9d4a05f.
- Her Pro League page moved again, /proleagueawards now 301s to /pro-league-awards (~14.00 UTC). The page doesn't link to
  her pages, so only source notes are affected. The "by Kaat DM" credit is in her own image file names.
- Still not deployed, Netlify refused a fresh plan deploy at 13.49 UTC (6adf5a72898eed5fe66cf267), same credits error.

## Plan deployed, 26 Oct ~19.45 UTC (main session)

Raka added Netlify credit. Plan deployed from a clean copy of site-plan, deploy 6adfa9d2bfc231ced8bd639b, live at
https://astra-honeyitshandled-plan.netlify.app/ . 29 of 29 site files hashed equal to the deploy (the deploy tool's local
.netlify/state.json isn't served), 404 control 404, x-robots-tag noindex, cold loads at 1440 and 390 with no script errors
and every image decoded, qa/plan-honey-func.js against the live URL 21 of 21. The new site chapter is still the labelled
placeholder, it waits for the v2 prototype to go live, then the screenshots are retaken and the plan redeployed.
