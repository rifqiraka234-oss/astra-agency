# Honey It's Handled, handover (26 Oct 2026)

One file for both builds. The prototype agent writes its own section, the plan's section is below. Neither overwrites
the other. Newest prototype first, v3 then v2 then v1.

## The prototype v3, a wedding (26 Oct 2026, late evening)

**Flag first, budget.** A one person consumer business, a sole trader since 1 January 2026 (KBO 1032.568.265), one paid
private event of her own (Cinco Cero) and the Pro League Awards on her pages. RULES 0G and the GTM plan say one screen and
the call ask without a budget sign. Raka asked for this build by name ("Put it into HTML. Let's redo it again"), so v3 is
built. No price for her services anywhere, she publishes none. **Not deployed.** Raka wants the HTML first, v2 stays live
at https://astra-honeyitshandled-prototype.netlify.app/ untouched, and nothing has been sent to Elise.

v1 (build/, site/) and v2 (build-v2/, site-v2/) are untouched. v3 is build-v3/ writing site-v3/. Raka's words on v2 and the
brief are research/v3-brief.md, the art research and media research/art-direction-v3.md, the four lines and the flow
research/flow-v3.md.

### Where it is

One self contained file, for opening from disk,
`/tmp/claude-0/-home-user-astra-agency/24052593-7323-58b2-9e3f-744f7080d43c/scratchpad/bundle/honey-its-handled-prototype-v3.html`
(20,930,289 bytes, 20.9 MB, 52 files embedded, so the film needed no further compression, sha256 starting f880f341cc3ca4d5). The scratchpad is session storage, so copy the file out or rebuild it with
`python3 tools/bundle-site.py state/prototypes/honeyitshandled/site-v3 <out>`. Both pages live in that one file, the Events
page is the same document at #events (`/#events` once deployed, netlify.toml redirects /events there).

### The idea, in two sentences

Her launch offer asks "a few special couples" to be her very first weddings, so the site is her invitation, a wedding film
under her wordmark, then her own rhyme from 17 June, "Something Off-White. Something Blue. Something Red.", as three
chapters of one couple's year with her (the dress and the first idea, the planning behind the scenes at blue hour, the day
itself in candlelight and petals). The enquiry is the reply card, all three colours at once, an off white card on her blue
with the couple's names in red foil script, sealed with her HH pressed in red wax.

### The hero film

Four slow cuts from one Mixkit wedding shoot, crossfaded into a 12.8 s loop that ends on the frame it starts from, no
sound. A bride's lace sleeves and orchid bouquet (5184), a lace dress being buttoned (5183), her hand on his shoulder
(5206), a rose and white flowers in candle light on the table (5224, its first five seconds only, the later frames show a
menu card with a printed monogram). No face in any frame. 1600 by 900 webm and mp4, and a 540 by 960 phone cut cropped
round each subject. Each item's own page reads "Free Download ... for commercial or personal use, under the Mixkit Stock
Video Free License" and `copyrightNotice` "Free", read 19.57 UTC, links in the table below.

### The magical moments

1. **The veil.** A sheer tulle veil drawn in WebGL hangs over the dress film, folds falling from a crown above the screen,
   a fine net, a scalloped lace hem, moving in a slow wind and round the pointer. Scrolling lifts it from the hem, the
   centre first, and "Something Off-White." arrives on an ivory swatch once the dress is clear.
2. **Seventeen lights at blue hour.** Her "Usually found with 17 tabs open" as 17 candle lights hanging among glass globes,
   breathing, each one a thing her pages say she handles. Her three ways to help are a menu card in her blue ink, choosing
   one lights what she'd hold, tapping a light hands it over or back.
3. **Petals that part.** Petals in her red, her powder blue and ivory fall over the candles and part round the pointer or
   a finger, into the final dance in silhouette at dusk.
4. **Foil names.** The couple types their names on the card and they appear in Pinyon Script in red foil that catches the
   light as the pointer moves.
5. **The wax seal.** Sending presses her HH into red wax across the card's lower edge, with a squash and a settle.
   "Consider it handled."

### Who it's for and the one action, per page

- **The wedding page.** A couple, usually the bride first, in Antwerp or elsewhere in Flanders, marrying in 2027 or 2028,
  no planner yet. One action, reply to the invitation as one of her first couples ("Be one of our first couples" on the
  film, at the end of the final dance and under Elise, "Be one of the first" in the header and the bar, "Reply" on the phone bar). The card arrives
  written, date, here or abroad, guests, the help and the lights handed over, and the message in her form's words. The
  quiet second path is "Planning an event?" on the film and Events in the menu.
- **The Events page.** A host or a company. "Events, beautifully handled." over her Cinco Cero tent, then Cinco Cero (a 50th
  birthday, 28 August 2026, 125 guests, her brief line, Jan Geysen's first two sentences, her photos and her aftermovie
  cut), the Pro League Awards '26 (her page's three sentences, photos by Kaat DM), and Elise in your team (her own phrase,
  "an experienced freelance event manager to strengthen your team"). Each ends on its own button, "Plan a private event",
  "Plan a company event", "Ask Elise to join your team", which sets the enquiry (Private Event, Corporate Event, Corporate
  Event with the freelance line). "Tell me about your event" is on the first screen, in the header and the bar ("Enquire" on the phone bar).

### Sources and when they were read

Her site, all nine sitemap pages (lastmod 26 Oct), curl 19.44 to 19.45 UTC and Chromium 19.47 to 19.49 UTC. Her Instagram
through /embed/ at 19.47 UTC, 137 followers, posts_count 7, the embed now shows the newest six (a new Pro League post at
17.52 UTC today), and her 17 June brand reveal through its own /p/DZsg-pLCDT6/embed/captioned/ at 19.47 UTC. Every line with
its source is in build-v3/data/site.json. 59 of her strings checked mechanically against those reads, 50 word for word and
9 with the documented changes below. Art research, 40 sites tried and 35 rendered 19.51 to 19.54 UTC (12 wedding planners, 18 couture and
hotel houses, 10 award level wedding sites from CSS Design Awards' own search and two candle houses), fonts pulled off each,
in research/art-direction-v3.md.

### Her words, and where we changed them

Word for word, her film line "For the moments you'll never want to forget." (sentence case), "Be one of our first couples"
(her announcement bar), the launch offer heading and paragraph, "Saying 'I do' in 2027 or 2028? We'll love to hear all about
your plans.", "Something Off-White. Something Blue. Something Red.", "From the first idea to the final dance, every detail
thoughtfully considered.", "Don't worry if you don't have all the answers yet. That's what I'm here for.", "I think ahead, so
you don't have to.", "How I can help", her partial planning and day coordination lines, "The details are mine, the moment is
yours.", "You say 'I do'. I'll handle the rest.", "Type A, so you don't have to be.", her MEET ELISE lines, "Tell me
everything.", the Pinterest line, "Consider it handled", her four next steps, Jan Geysen's sentences with his own
exclamation marks, her events heading and lines, Cinco Cero's brief, the Pro League sentences. Changed, she should see
these. "recieve" fixed in the launch offer, "Usally" fixed, "&" written out in her two lists, "Bespoke celebrations" became
"Something of your own" (banned word, as v2). Her own full planning line says "the entire journey", and "journey" is on our
banned list, so under Full planning sits another line of hers from the same /weddings page ("From finding the right setting
and bringing together a dream team of suppliers ... I'm there to bring it all together."), our placing. "Off-White" keeps
her hyphen, the copy audit allows that one line as her own words, nothing else.

### What must not be read as fact

- **Every film and wedding photo on the wedding page is stock**, Mixkit and Unsplash, standing in for her own. None is her
  wedding, her couple, her venue or her work, nothing captions or implies it, the note on the film and the footer say so,
  and she'd replace them with footage from her first couples, which is what her launch offer collects.
- The date 12 June 2027 and 100 guests are the page's example, not her availability. The page never says a date is free.
- The 17 lights are things her pages say she handles, not a service list. The six lit for day coordination (timelines,
  suppliers, the flow of the evening, place cards, plan B, plan B for plan B) are our example.
- The card's wording ("are saying I do", "and would love Elise's full planning", "as one of her first couples") is ours.
- Her launch offer's size isn't stated, and "a few" couples is her number, we never give one.
- The Pro League Awards are her page's words and nothing more, nothing says who hired her or her role that night.
- Cinco Cero is only ever "A 50th birthday". Jan Geysen is quoted on the wedding page as "on his 50th birthday, Cinco Cero".
- "Elise in your team", "She also joins production teams as ..." and its next line are ours round her own phrase.
- The veil, the lights, the menu card, the invitation card and the wax seal are our objects. Her HH and wordmark are her
  artwork, traced in v1.
- Nothing is sent. The card's note says so, the footer says so, and the fallback opens the visitor's own email with the
  whole request in it.

### Every stock item, with its licence page

Films, Mixkit Stock Video Free License, each item page's `copyrightNotice` read "Free" and its download box "Free Download,
Download this free stock video clip for commercial or personal use, under the Mixkit Stock Video Free License" at 19.57
UTC, each 1080p file fetched singly at 20.14 UTC, sha256 in build-v3/media/manifest.json. The licence on
https://mixkit.co/license/#videoFree reads "can be used in your commercial and non-commercial projects, for free ...
Attribution is not required".

| On the page | Item | Licence page | Cut |
|---|---|---|---|
| Hero, cut 1 and the loop's tail | Mixkit 5184, Bride at her wedding holding bouquet | https://mixkit.co/free-stock-video/bride-at-her-wedding-holding-bouquet-5184/ | 2.0 to 6.0 s |
| Hero, cut 2 | Mixkit 5183, Bridesmaid helping to put on a wedding dress | https://mixkit.co/free-stock-video/bridesmaid-helping-to-put-on-a-wedding-dress-5183/ | 3.0 to 7.0 s |
| Hero, cut 3 | Mixkit 5206, A bride's hand on the groom's shoulder at their wedding | https://mixkit.co/free-stock-video/a-brides-hand-on-the-grooms-shoulder-at-their-wedding-5206/ | 1.0 to 5.0 s |
| Hero, cut 4 | Mixkit 5224, Sequence of a decorated wedding table | https://mixkit.co/free-stock-video/sequence-of-a-decorated-wedding-table-5224/ | 0.5 to 4.5 s, clear of the monogrammed menu cards |
| Something Off-White, under the veil | Mixkit 5190, Beautiful wedding dress hanging in a white room | https://mixkit.co/free-stock-video/beautiful-wedding-dress-hanging-in-a-white-room-5190/ | 6.5 to 12.5 s, forward then back |
| Something Blue, under the lights | Mixkit 5213, Decorations on the ceiling of a wedding party | https://mixkit.co/free-stock-video/decorations-on-the-ceiling-of-a-wedding-party-5213/ | 8.4 to 14.4 s, forward then back, graded to her blue |
| Something Red, under the petals | Mixkit 51655, A romantic dinner table adorned with lit candles, rose petals | https://mixkit.co/free-stock-video/a-romantic-dinner-table-adorned-with-lit-candles-rose-petals-51655/ | 2.0 to 8.5 s, forward then back |
| The final dance | Mixkit 101211, Couple silhouette at colorful sunset | https://mixkit.co/free-stock-video/couple-silhouette-at-colorful-sunset-101211/ | 0.3 to 8.5 s, forward then back |

Stills, the Unsplash License, each photo page reads "Free to use under the Unsplash License" (read between 20.04 and 20.19
UTC, neither is Unsplash+), the licence on https://unsplash.com/license reads "Commercial and non-commercial purposes, No permission needed".
Fetched singly from images.unsplash.com, the og:image of each page.

| On the page | Item | Licence page |
|---|---|---|
| Off White, left | Unsplash DTLT9ESXM9s, grayscale photo of beaded lace gown, by Wedding Photography, 24 April 2018 | https://unsplash.com/photos/grayscale-photo-of-beaded-lace-gown-DTLT9ESXM9s |
| Off White, right | Unsplash HqatjVNJ31A, a white dress with lace, by Meg Jenson, 12 August 2022 | https://unsplash.com/photos/a-white-dress-with-lace-HqatjVNJ31A |

Left out, and why. Seven of the 70 Mixkit items read were "Mixkit Restricted License", personal use only, though their
JSON-LD licence link says videoFree, among them the best veil film (8888, Bride tosses veil while dressing for wedding),
two candle films (17426, 29425) and the light leaks (48495). Pexels walls us (Cloudflare on curl, tools/fetch-walled.py on
all three fingerprints and Chromium), so no Pexels item, since its own page couldn't be read. Films with faces of models
(40584, 40590, 4639 and the like) stay out.

### Her own pictures

| On the page | Her file | Where it is on her site today | Notes |
|---|---|---|---|
| Elise in black and white, large | 42a973_8887369f | /weddings, alt "Honey it's Handled_Elise Laeven" | Zoomed at full size, a plain belt buckle, no marks, no edit |
| Elise sitting | 42a973_6059565d | / (home), the same alt | Zoomed, no marks, no edit |
| Events, the tent before the guests | 42a973_3eba9b82 | /gallerycincocero | As v2, set and empty |
| Events, the Cinco Cero sign and a heat lamp | 42a973_427f62a1, 42a973_aaf72253 | / and /cincocero, /cincocero | As v2, no people |
| Events, the Handelsbeurs roof and the tables | 42a973_f181779c, 42a973_9e35ce1e | /pro-league-awards, / (glimpse) | **Cropped** as v2, top 65.5% and top half, clear of the sponsor wall and the printed menu cards. "Photos by Kaat DM." under them |
| Events, film | 42a973_5f3af2a4 | /cincocero aftermovie | v2's 4.2 s cut, no sound, "From her Cinco Cero aftermovie." |

Left out on purpose, her /weddings photos and the two card photos on her home page (alts "Honey it's Handled_Wedding" and
"_Private Events", origin not stated), and 42a973_b81dcffa and 42a973_ae0d2b8e (the Apple mark on her laptop), so v3 needs no
edit to any photo of hers.

### QA, all on one build (site-v3 files hash 4e5bbb643a618f11 at the start and the end of every run, 22.04 to 22.28 UTC)

| Test | Result | Its plant |
|---|---|---|
| Functional, qa/func-v3.js, 30 checks, every expected value worked out from site.json and date sums | 30 of 30 pass | 30 of 30 planted faults caught |
| Films, inside the functional test | A fresh page fetches only the hero film, a chapter film loads near the screen, plays on it and pauses off it, reduced motion and data saver fetch no film at all | caught |
| The phone bar, new tonight, every state on both pages at 320, 360, 390 and 430 | Nothing cut, the bar at most 69 px tall | the ellipsis put back, caught |
| Copy, qa/copy-v3.js, every reachable state, 326 unique lines | Clean, no dash, colon, banned word, hedge, uncontracted verb or exclamation outside Jan Geysen's own sentences and "Something Off-White." | 6 of 6 planted faults reported |
| axe, 33 runs, 1440 and 390, motion on and reduced, both pages, menus open, errors shown, sealed | 33 of 33 clean | 33 of 33 report the plant |
| Overflow, 9 widths from 1920 to 320, motion on and reduced, both pages, plus a sideways pan | 0 of 18 loads | both 390 loads overflow |
| Guide walk, both pages at 390 and 1440 | 0 half screens without a way to the reply. First screens carry "Be one of our first couples" and "Tell me about your event" | 22 gaps found |
| Contrast over film and photos, measured from pixels, 14 lines times 4 | 56 measured, 0 below the line, the closest 5.23 to 1 against 4.5 (the small capitals under her wordmark, over the phone film) | 18 below the line |
| Lighthouse, phone three runs | Performance 95, 94, 94, LCP 2.8 to 2.9 s, TBT 0 ms, CLS 0, accessibility 100, best practices 100 | |
| Lighthouse, desktop and the Events page on a phone | 100 (LCP 0.6 s) and 91 (LCP 3.4 s), accessibility and best practices 100 | |
| SEO | 66 everywhere, the only failed audit is is-crawlable, the noindex on purpose | |
| The bundle from disk, 1440 and 390 | 0 errors, 0 failed requests, 0 requests outside the file, 9 of 9 visible images decoded, 6 of 6 on Events, all five wedding films and the Events film played, the veil and petals drew, all three fonts loaded | |

Every section was looked at at 1440 and 390 on both pages (session scratchpad honey-v3/shots/final, every 0.8 screen,
0 errors, 0 failed requests). The first full chain ran clean on the build before tonight's bar fix (hash
bfd7e59d593baa3e), the looking found the phone bar cutting the Events date ("Sat 20 Mar 20...") and the help in most
states at 320 and 360, so the bar was fixed, a test was added for it and the whole chain ran again on the new build.

### The banned Claude tells, item by item (RULES section 5)

Checked on the final build against the computed styles and the HTML, not from memory.

| Tell | v3 |
|---|---|
| A serif headline with an italic second half | None. No `font-style:italic` anywhere in the CSS, Fraunces is upright everywhere |
| A small uppercase kicker with a dash over a heading | None. A script walked all 12 headings and legends on the wedding page and 6 on Events and found no small capitals line in the 60 px above any of them. The small capitals left are field labels, the menu, the event links and the meta lines under the event headings |
| Pill buttons with a sliding arrow | None. Every button and field is square (`border-radius:0`), the only rounded things are the candle flames and globes |
| Cream and indigo chapters taking turns | No. Ivory, her powder blue #D3E9EE and her red #962122, each once, in the order of her rhyme. The page does go back to ivory for Elise and to blue for the reply card, flagged below |
| Gradients, glows, gradient overlays on photos | Partly. The glows behind the chapter titles are gone, the titles sit on flat swatches. Three dark scrims remain at the foot of film where words sit on it (the hero, the final dance, the Events tent), for contrast, and they're the generic overlay the rule names. The gradients that are ours are the veil, the candle flames, the foil on the names and the dusk sky fading from ivory into the blue film |
| Big count up numbers with a source line | None. "Elise holds 6 of 17." is a sentence that changes as lights are handed over, nothing counts up |
| Three pillars of bullets, four facts with top rules | No pillars. Her three ways to help are one menu card you choose from. Her four next steps are a numbered list (01 to 04) without rules, the closest thing to a template part on the page |
| Rounded cards with soft shadows | Square deckled paper, but the menu card and the reply card do carry drop shadows, they're paper objects lying on the scene. Flagged |
| A logo marquee | None. No third party logo in any frame |
| Cute SVG illustration scenes | None. The only drawn SVGs are her HH, her wordmark and the wax seal |
| Chips and tags | The date, place and guest controls are square bordered picks inside a sentence, not chips |
| A floating pill | None. The bar is a full width strip on the bottom edge |
| Eleven sections on a home page | Seven, film, invitation, three chapters, Elise, the reply |
| One texture under every section | Grain sits only on the films and on the card paper |
| A kicker over every heading | None, as above |
| The same two column grid again and again | The three chapters are full screen scenes, each built differently (veil on film, lights on a stage, petals then the dance). Elise and the Events parts share a 12 column grid |
| Her photos shrunk into boxes | Her two portraits are large in the Elise section. Her Events photos are in a two up pair and a strip, the plainest part of v3 |
| A graphic that reads as a chart | None |
| Motion that's only fades | The veil lifts in WebGL, candles breathe and flicker, petals fall and part, the foil moves with the pointer, the seal presses. Each has a still state under reduced motion |
| The brand's own vibe nowhere | Her rhyme is the structure, her "17 tabs open" is the blue chapter, her "Consider it handled" is the send |
| Every visitor gets a path | Couples get the card, hosts and companies get Events with three buttons of their own, each setting the enquiry |
| A display serif as the voice (out unless the lead's brand uses one) | Fraunces carries the headings. Her own wordmark is high contrast serif lettering (v1 research), and every expensive wedding and hotel house rendered today sets a thin serif large, so it's paired to her field, not a default. Figtree, her own site's sans, carries the text |

### Beside v2, honestly

Sheets in the session scratchpad, honey-v3/shots/fin/v2-v3.jpg (v2 live on the left, v3 on the right, 1440) and
honey-v3/shots/final (every 0.8 screen of both v3 pages at 1440 and 390, taken from the final build).

- **Does it feel like a wedding.** Yes, from the first frame. v2 opens on a giant red HH and "What are we celebrating?",
  then a disco ball, "125" and "570+" in huge numbers on black and red, which is her two nights and reads as a nightclub.
  v3 is lace, an orchid bouquet, a dress being buttoned, her hand on his shoulder, candles, rose petals and a couple at dusk, then a reply
  card with their names in script and her seal. Nobody would take it for anything but a wedding planner.
- **Magical.** Yes, more than any build so far for her. The veil lifting off the dress, the candle lights at blue hour
  and the petals parting round the hand are the three moments people would show someone else. The card with foil names
  and the seal is the finish.
- **Exclusive.** Mostly. The thin serif with air round it, square buttons, three colours and the invitation framing
  ("Will you be one of our first 'I do'?") read as a house that picks its couples. What pulls it down is the stock film,
  Mixkit clips that are a little soft and milky at 1440, and the blue globe film, which is busy behind the menu card.
- **Screenshot worthy.** The hero frame, the three line rhyme on ivory, Something Red over the candles and the dance at
  dusk, yes. The reply card, yes.
- **Where v2 was better.** v2 had more of Elise's own punch, her HH huge, "Type A" with her cut out photo, the numbers of
  her real nights. v3 trades that energy for romance, and her wit now lives in the copy and the 17 lights only.
- **What I'd still change.** The Off White chapter holds the same pale dress for about three screens while the veil lifts,
  and the pinned scenes make the wedding page 13.7 screens at 1440, where the luxury sites measured today ran five to
  nine. The Events page is plainer than the wedding page, her photos in a pair and a strip with the aftermovie loop as
  its only motion. Three dark scrims are still under words on film. And everything that looks like a wedding is stock,
  so the site only becomes hers once her first couples' footage replaces it.

### Hiccups, each with the rule it leaves

Written up for everyone in docs/build-and-deck.md, "Honey It's Handled v3".

### Rebuild

`/usr/local/bin/python3 build-v3/build.py` writes site-v3/ and asserts unique ids before it writes. One time step, already
run, `build-v3/art/prep_v3.py` (needs the Mixkit and Unsplash files fetched into the session scratchpad, honey-v3/media-src,
and v2's folder of her originals, ffmpeg with VP9 and x264, Pillow; VP9 isn't byte identical run to run, so hash media after
the last prep). Fonts are OFL with their licences in build-v3/fonts. QA scripts qa/*-v3.js, server
`python3 -m http.server 8762 -d <abs path to site-v3>`, chain in the session scratchpad honey-v3/tools/chain.sh.

## The prototype v2, the art build (26 Oct 2026, evening)

**Flag first, budget.** A one person consumer business, a sole trader since 1 January 2026 (KBO 1032.568.265), one paid
private event of her own (Cinco Cero) and the Pro League Awards on her pages. RULES 0G and the GTM plan say one screen and
the call ask without a budget sign. Raka asked for this build by name and sent v1 back for its look, so v2 is built. No
price for her services anywhere, she publishes none.

v1 (build/, site/) is kept untouched for comparison. v2 is build-v2/ writing site-v2/. Raka's words on v1 and the brief
are research/v2-brief.md, the art plan research/art-direction-v2.md, the four lines and the flow research/flow-v2.md.

### Where it is

| What | URL | Deploy |
|---|---|---|
| The prototype v2 | https://astra-honeyitshandled-prototype.netlify.app/ | 6adfaa7fe2823bf3291bc4c3, published 19.31.25 UTC, project d75c0db1-46e6-4842-b787-b1e2d9102daf |

Live once Raka added Netlify credit. The main session deployed the same build ten seconds earlier (6adfaa753440aa05579d2204,
see its note at the foot), and Netlify reported this deploy's files as "already uploaded by a previous deploy", so both are
the same files. research/PROTOTYPE_LIVE.txt holds the URL and 6adfaa7fe2823bf3291bc4c3. Live checks on this deploy, all
on 26 Oct 19.31 to 19.40 UTC. 56 of 57 files hashed byte equal against the deployed copy (404.html differs only where
Netlify's pretty URLs rewrote its `index.html#...` links to `/#...`, the deploy tool's .netlify/state.json isn't served),
404 control 404 with our page, x-robots-tag noindex, title hers. Cold loads at 1440 (21 screens) and 390 (23 screens) with
error capture, 0 script errors, every screen looked at. qa/func-v2.js against the live URL 36 of 36. Lighthouse live,
phone 80, 87 and 84 over three runs (LCP 2.3 to 2.6 s, TBT 400 to 730 ms, CLS 0), desktop 98, accessibility and best
practices 100, SEO 66 is the noindex. The one failed request in the screenshot runs is the browser aborting the film's
first range request when the script switches it from preload none to auto, the film then plays (func-v2 checks it).

One self contained file as well, for opening from disk,
`/tmp/claude-0/-home-user-astra-agency/24052593-7323-58b2-9e3f-744f7080d43c/scratchpad/bundle/honey-its-handled-prototype-v2.html`
(13.1 MB, 52 files inlined by tools/bundle-site.py from the final site-v2, sha256 starts 3b7213366a8b991e). Opened from
disk at 1440 and 390 with error and request capture, 0 script errors, 0 failed loads, 0 requests outside the file, 13 of
13 visible images decoded (the other 4 belong to the paths and the sealed state not on screen), both fonts loaded, the
lacquer drawn, the mirror ball turning, the film playing inside the figures. The scratchpad is session storage, so copy
the file out or rebuild it with `python3 tools/bundle-site.py state/prototypes/honeyitshandled/site-v2 <out>`.

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

### QA that ran, local, on one build

The final chain ran 19.18.45 to 19.27.32 UTC on site-v2 files hash a4b70703b0b62f23 (build.py's own hash
2d1917ce7bb6871c, the same twice), unchanged from start to end, served on 127.0.0.1:8743, today fixed with
?today=2026-10-26. Scripts in qa/, suffix -v2.
- **Functional, qa/func-v2.js, 36 of 36.** Every expected value worked out in the test from build-v2/data/site.json and
  date sums. The film not fetched before it's near, the defaults (date, weekday, 229 days, letter, bar), the no script page
  saying what the script says, a week later and a picked date reaching every display, no date yet and 2029, the launch
  offer for 2027 and 2028 only, abroad writing Destination Wedding, full planning holding 17 of 17 with the 17 full, a tab
  tapped turning it into partial planning, chosen tabs written into the letter in order, day coordination with the day
  tab out, the private and company paths with their own button on every visible call, form type and letter, the company
  path meeting the Pro League Awards first and the Handelsbeurs under the lens and behind the doors, guests and their
  words against 125 and 570, the guest steps clamped, an edited letter kept and rewritten on request, an empty letter caught
  with the reason, a sealed letter with the whole request in the mail, the lacquer drawn in her red (pixels read back
  after a real hand wakes it), the bar off on the first screen and on mid page, the lens following the pointer and
  flipping, the doors open by the end of their scroll, the 570+ opening into the full photo, the film playing only on
  screen, the mirror ball drawn, the header tone over her nights and the letter, reduced motion (doors open, tabs out,
  stickers on, film never loaded), the first screen holding the question, three answers and the call at 1440, 390 and
  320, no script errors. **Plant mode 36 of 36 caught** (run 19.28 UTC on the same files, after three blind plants were
  fixed, see the hiccups). Against the live URL, 36 of 36.
- **Copy, qa/copy-v2.js, clean** over 373 unique lines in every reachable state (26 state changes across the three paths,
  the lens flipped, four letter errors, sealed, the phone menu, the 404 page), no dashes, colons, banned words, hedges,
  uncontracted verbs or exclamation marks (Jan Geysen's sentence exempt as his own words), 2,514 contractions. **Plant 6
  of 6 kinds found.**
- **axe, qa/axe-v2.js, 23 of 23 runs clean** (1440 and 390, motion after a full scroll and reduced, back at the top, the
  private and company paths, day coordination, no date yet, the lens flipped, the phone menu, the letter with an error,
  sealed). **Plant, 23 of 23 reported.**
- **Overflow, qa/overflow-v2.js, none at nine widths from 1920 to 320, both motion settings** (18 loads, each scrolled
  through, five wide states, the lens flipped and a resize). **Plant, both 390 loads caught.**
- **Guide walk, qa/guide-walk-v2.js, 0 half screens without a way to the letter** on all three paths at 390 and 1440, the
  first screen holding each path's own call. **Plant (bar off), 54 gaps found.**
- **Lighthouse local**, phone 73, 78 and 80 over three runs (LCP 3.1 to 3.2 s simulated, TBT 510 to 830 ms on SwiftShader,
  CLS 0), desktop 98. Live numbers are in "Where it is". It was 63 before the lacquer stopped building its field with a
  pixel loop and learned to rest.
- **Looked at by eye**, every section at 1440 and 390 in all three paths, the help states, the lens and its flip, no date
  yet, sealing and sealed, the whole page without script (17 of 17 images decoded, every scene in its still state) and
  under reduced motion (the two images not loaded are the company lens and the envelope, both hidden in that state).
- Her lines, 43 quoted on the page checked mechanically against her pages read at 17.49 UTC and her six captions, 0
  missing.

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

## Prototype v2 deployed, 26 Oct ~19.50 UTC (main session, on Raka's "deploy the v2 proto")

site-v2 as built at 19.17 UTC, deployed to project d75c0db1-46e6-4842-b787-b1e2d9102daf, deploy 6adfaa753440aa05579d2204,
live at https://astra-honeyitshandled-prototype.netlify.app/ . 56 of 57 files hash equal to the deploy, 404.html differs
only where Netlify's pretty URLs rewrote its index.html#... links to /#..., 404 control 404, x-robots-tag noindex. Cold
loads at 1440 and 390, no script errors, 17 of 17 images decoded, qa/func-v2.js against the live URL 36 of 36. The night
film serves 200 at full size (the screenshot run's failed request was the browser aborting it mid scroll). Her lines
"Type A, so you don't have to be." and the HONEY and IT'S HANDLED lines checked word for word in her 17 June 2026
Instagram brand reveal. The v2 builder is still finishing its own QA and redeploys only if it changes the build.

## v3 live and the plan retaken, 27 Oct ~07.45 UTC (main session, on Raka's "Put it to netlify and draft smth for her")

- Prototype v3 deployed from a clean copy of site-v3 to d75c0db1-46e6-4842-b787-b1e2d9102daf, deploy
  6ae051dc51001439eeaa49bb, replacing v2 at https://astra-honeyitshandled-prototype.netlify.app/ . 58 of 58 files hashed
  equal, 404 control 404, noindex on, cold loads at 1440 and 390 with no script errors and every image decoded,
  qa/func-v3.js on the live URL 30 of 30. research/PROTOTYPE_LIVE.txt now holds that deploy.
- Plan, chapter VII rewritten for v3 (heading, lede, seven captions, two phone frames) from screens captured on the live
  v3 with build-plan/shots/capture-v3.js, and every line that described v1 corrected (the letter is now the reply card,
  the Instagram and roadmap lines post the site one colour at a time, the guest card carries the new site). plan.py had
  a quoting bug in the never run chapter VII path ("It's" inside a single quoted f-string on Python 3.11), fixed with the
  typographic apostrophe. QA locally, func 21 of 21 (plant 0 of 21), copy clean (plant 4 of 4 kinds), axe 8 runs clean
  (plant 8 of 8), overflow none (plant 2 failing loads). Deployed, deploy 6ae0548da53f9773d78c2c63, 47 of 47 files hashed
  equal, 404 control 404, plan-honey-func.js on the live URL 21 of 21.
- Delivery drafted, state/drafted_2026-10-27-elise-delivery.md, not sent.
