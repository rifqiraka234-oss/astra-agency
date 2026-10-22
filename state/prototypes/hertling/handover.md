# Systemhaus-Hertling, handover. 22 Oct 2026, v3

## What it is, in plain words

Noah Hertling runs a one person IT firm in Reinbek, registered April 2026. Our 7 Oct message said Hamburg firms
comparing IT partners pick the ones that show proof, and he has none yet, no Google reviews, one LinkedIn follower, a
homepage that names no client. He said yes to seeing "the Hertling online presence that wins Hamburg clients".

Two things are built. His site, rebuilt so it looks like a firm worth a contract and walks every visitor to a first
conversation with him. And a growth plan for him, on its own site in Astra's voice, that says where he stands, what the
market and the firms around him look like, and what to do in his first 90 days.

## Why v3 (Raka, 22 Oct morning)

"It looks like something out of the 2010s. Needa make it more sleek man. No islands and all. Colours. Gradients.
Animations pictures ... And also the web strategy, is this the best you can do? ... it needs to be done €6000 euro worth
at least."

What v3 changes, and why.

| Change | Why |
|---|---|
| The whole page runs night to daylight, his promise as the colour story (research/art-direction-v3.md) | One idea a visitor feels without reading, the black box opening |
| Chapters edge to edge, no cards on a grey page | Raka's "no islands", the v2 look read as a 2015 theme |
| The hero is his logo drawn as a network, lit by the pointer | His mark and his promise in the first second, no stock |
| The black box turns to glass on scroll, the network and change log appear inside it | Shows what "documented" means instead of saying it |
| Four Bausteine as one full screen film or photo each, each with its own call button | Pictures and motion, and a door to the call at every service |
| Hamburg at blue hour behind his card, "Von Reinbek aus. Für Hamburg und Umgebung." | Local and premium, and his face is the one thing still missing |
| Geist, Geist Mono and Instrument Serif italic, signal blue and ice on near black | Type and colour of the 2026 product sites in the teardown |
| v2's "Kommt Ihnen das bekannt vor?" is gone | It was Matic-Tec's own section heading, copying a rival isn't positioning |
| The presence sketch is replaced by a 12 chapter growth plan with charts computed from sourced data | Raka, "is this the best you can do" |

## Links

- Site, https://astra-hertling-prototype.netlify.app/ (noindex, SSO off, forms on). Netlify project
  astra-hertling-prototype, id ddfbb769-744c-46cb-9780-caead079d70a. v3 deploy 6ad9c4894138f06f055da7cd. Earlier, v1
  6ad914d70552650b29ea252b, v2 6ad925fc0a94a08e345fc045.
- Growth plan, https://astra-hertling-presence.netlify.app/. Netlify project astra-hertling-presence, id
  75256c91-c631-4bdb-a4d0-33882f720a18. v3 deploy 6ad9c4a487342a00c2125006.
- Source state/prototypes/hertling/build. `python3 plan_page.py` writes pages/presence.html from data/plan.json, then
  `python3 build.py` writes ../site and ../site-presence. No dependencies beyond Python 3. v2's pages and CSS are kept
  in build/v2pages.
- Research, research.md (the lead), research/strategy-facts.md (every plan figure, reopened 22 Oct), research/
  art-direction-v3.md, research/teardown/TEARDOWN.md, research/assets/ASSETS.md and research/assets/v3/ (manifest,
  contact sheets, rejects).
- Delivery draft, state/drafted_2026-10-22-noah-delivery-v3.md. NOT SENT.

## The site, chapter by chapter

Home. 0 night, his headline "Ihre IT läuft. Auch wenn gerade niemand hinschaut." over his logo as a lit network, the
booking button and his number with a live line. 1 ink, an office after hours on film and four questions nobody asks
until something stops, one Eurostat figure counted up. 2 the black box turning to glass. 3 the four Bausteine, film or
photo, each with "Über Ihr ... sprechen". 4 the documentation window, five tabs, flattening as it arrives. 5 Hamburg at
blue hour, his card, "16 km Luftlinie bis in die Innenstadt". 6 three steps on the band from his logo. 7 the self check
as a dial filling to an example result. 8 daylight, the booking form and the FAQ. Footer back to night, his name huge.

Leistungen, the four Bausteine with demos (WLAN planner, support timeline, permissions matrix, backup calendar).
Selbsttest, ten questions. Über uns, Schloss Reinbek in autumn beside the headline, his values and register facts.
Kontakt, his card and the form. Bewertung, Impressum, Datenschutz. German first, every line in English (switch in the
header, inside the menu below 400px wide).

## The growth plan, chapter by chapter

Cover with three numbers (0 Google reviews, 1 LinkedIn follower, 0 clients named on his site). 01 where he stands,
today's screenshots. 02 the market, businesses by size in Hamburg and Stormarn, three Eurostat rings, and the Microsoft
end of support dates as "deadlines that make firms call". 03 the competition, the Google Maps ratings around Reinbek and
a wall of 17 Hamburg firms. 04 positioning. 05 the journey from search to referral, built and next. 06 the new site in
five screenshots. 07 town pages, with a Glinde sketch. 08 Google and reviews, the profile sketch and the review card. 09
LinkedIn, three posts from his own profile. 10 offer and worth, the offer ladder, six published competitor prices and a
calculator. 11 the first 90 days and what gets measured. 12 the team. Then "Give us thirty minutes."

Facts changed today after reopening every source (research/strategy-facts.md, plus my own rechecks in the QA record).
- hagel's 29 euros is its new Kjello line. Its managed care starts at 50 euros a workstation a month and projects are
  140 an hour. The calculator now starts at 50.
- "4 of 17 publish a price" only holds as "on the homepage or one click away". Base2 IT Consult in Wentorf posts 125
  euros an hour on a notice no menu links to. Both now said on the page.
- The ratings chart is rebuilt from today's "IT Systemhaus Reinbek" search (IT-Reinbek 5,0, Sellenschlo 5,0, IT-TEC
  4,9 sponsored, Base2 4,7, RA-MICRO 4,0, Hertling no reviews). The 21 Oct Hamburg list no longer showed every firm
  rated, so it's not used.
- "Zuverlässig on 9 of 17 homepages" didn't survive a recount (7 visible, 10 in raw HTML). The number is cut.
- Market heading now "Three in four already buy their IT help in" (Eurostat 75.98 percent, 2024 survey). The rings are
  75.98, 15.55 and 20.69.
- Wall column one rechecked site by site today. Eight show reviews or clients (Arconda's client logos load by script,
  Sellenschlo's logos are partners, not clients). Five write about documentation, none shows any.
- His homepage, 268 words, the logo the only picture. His Leistungen page has four stock photos, so the plan says "no
  photo of you", not "no face". WordPress's sample page and first post are live and in his sitemap.

## What's his and what's ours

His, word for word or nearly, every service line, the four values, the founding sentence, the hero headline, his hours,
address, phone, mail and register data.

Ours, and he has to say yes to each, marked [CONFIRM].

1. [CONFIRM] The first conversation as the main offer, with a callback time choice and "Noah Hertling meldet sich
   persönlich". Nothing says it's free.
2. [CONFIRM] The three start steps (Kennenlerngespräch, Bestandsaufnahme, Laufende Betreuung).
3. [CONFIRM] FAQ "Wem gehört die Dokumentation? Ihnen. Sie bekommen sie vollständig, auch wenn Sie später den Anbieter
   wechseln." A commitment he hasn't made.
4. [CONFIRM] FAQ "Was kostet das?" says a quote follows the first conversation. The plan shows what six rivals publish
   and suggests a fixed price stock take. His call.
5. [CONFIRM] Über uns "Und wenn Noah mal ausfällt? Dann steht alles in der Dokumentation."
6. [CONFIRM] The self check is our idea, scored in the browser, nothing sent until the visitor sends the form.
7. [CONFIRM] FAQ "Für wen passt das eher nicht? Für Firmen, die rund um die Uhr Bereitschaft brauchen."
8. [CONFIRM] The four questions in chapter 1 and the "Typische Anlässe" on Leistungen are typical reasons firms call,
   written by us, set as unnamed quotes on purpose.
9. [CONFIRM] The plan's three LinkedIn posts are in his voice, and the positioning line is ours. The plan says both.
10. [CONFIRM] Practices in the documentation sample are example data, labelled, not claims about how he works.

## Example data, and where it's labelled

One made up office runs through the hero network ("Beispielnetzwerk"), the black box, the WLAN planner, the support
timeline, the permissions matrix, the backup calendar, the documentation ("Beispielbüro") and the self check dial
(example result). Each carries a visible label, and the footer says plans, logs and results show example data. The real
figures are Eurostat 20.69 percent on the home page and 33.88 percent on the self check, both refetched from the
Eurostat API on 22 Oct.

## Legal pages [CONFIRM with his advisor]

Unchanged from v2. § 5 DDG instead of the repealed TMG, the closed EU OS platform link removed, Datenschutz with three
true sections for this build. New in v3, a Bildnachweis entry in the Impressum for the two photos below.

## Before it goes on his own domain

- Remove the noindex meta and the X-Robots-Tag header.
- Wire the form to his WordPress handler. Here it posts to Netlify Forms as "termin".
- Replace the Google button on /bewertung/ with his own review link, and regenerate the review card QR for his domain.
- A real photo of Noah is still the one thing that would lift trust most, and only he can add it.

## Assets and licences

- Films, Mixkit free licence, the same five clips as v2, each fetched singly and its licence reread (ASSETS.md). None
  is captioned as his office, staff or clients.
- Hamburg at blue hour (home, chapter 5), "Hafen City (Unsplash)" by Claudio Testa on Wikimedia Commons, CC0. Commons'
  {{Unsplash}} template says it was on Unsplash before 5 June 2017 and dates it 11 Sep 2016, which I read on the file
  page myself. Residual doubt, Unsplash's own page was behind a bot wall, so the date couldn't be read a second way.
  Unsplash's current licence would allow this use anyway. Credited in the Impressum as a courtesy.
- Schloss Reinbek (Über uns), Matthias v.d. Elbe, CC BY-SA 3.0, licence reread on the file page. Credited on the hero
  and in the Impressum with links, and it's resized, which the credit says.
- Stills from v2, Wikimedia Commons CC0. net-switch and sec-drive are used. rain.*, cld-roof.jpg and sup-desk.jpg are in
  the deploy and unused.
- Fonts, Geist, Geist Mono, Instrument Serif, SIL Open Font License, self hosted.
- The imagery agent kept 10 more stills and 6 more clips (research/assets/v3/manifest.json), unused for now. Its notes
  matter if any is picked later. Clip 4547 ends in a high five, trim before 26 s. The men in 39843 and 100326 are stock
  models and must never read as Noah.

## QA record v3, 22 Oct

- Copy audit, every visible string, alt, aria label and meta, both languages, both sites, 0 flags. A planted control
  page tripped 10 flags across every category in the same session.
- axe 4.10, WCAG 2.2 AA plus best practice, 10 pages, 2 languages, 1440 and 390, 40 runs, 0 violations. Fixed on the
  way, the plan's competitor table (real table roles), the occupied switch ports (deeper blue for white 10px numbers),
  the "Built" chips, the phone sketch caption, and the support timeline now honours reduced motion.
- Overflow, console errors and failed requests, 10 pages, 2 languages, 9 widths from 1920 to 320, 180 loads, 0. Fixed,
  the header menu button cut off at 360 and below (the language switch moves into the menu under 400px), the Über uns
  headline at 320, a Leistungen demo at 320, the ratings label at 768.
- Text spilling out of its box, 80 loads, control caught 80 of 80, 0 spills. Fixed, the glass box heading at 1440 and
  1024, and the brand name in the plan table at 1024.
- Header, 42 checks, 0. Hero, 9 sizes, both languages, 18 of 18.
- Booking form, 29 of 29 with POSTs intercepted. WLAN planner 51 to 96 to 99 percent at 1440 and 390, documentation tabs
  and ports by mouse and keyboard, self check end to end, each including the language switch through the phone menu.
- No JavaScript, nothing hidden. Films play only for the chosen Baustein and never under reduced motion.
- Live, both sites hashed file by file. Site 48 of 50 identical, home and Kontakt differ only by Netlify's form rewrite,
  the other is the deploy tool's own note. Plan 31 of 31. Cold loads at 1440 and 390, titles right, 0 broken images.
  A film request aborted mid scroll on one pass (net::ERR_ABORTED), the file serves 200 at the right size.
- "16 km Luftlinie" rechecked, 16.3 km from Birkenweg to Hamburg's Rathaus (Nominatim, great circle).

## G1 score v3, honest

| Dimension | Weight | v2 | v3 | Why |
|---|---|---|---|---|
| Brand specificity | 15 | 14 | 15 | His logo is the hero, his promise is the colour story, his town in two photos |
| Narrative and pacing | 15 | 14 | 14 | Night to daylight in eight chapters, one action throughout |
| Imagery and art direction | 15 | 13 | 14 | Full bleed film and photos, a real art direction. Still no photo of him |
| Workflow completeness | 15 | 14 | 14 | Find, compare, self check, book. No prices |
| Real proof and human trust | 15 | 12 | 12 | Register, contact, live hours, labelled samples. No face, no client yet |
| Buyer fit and objections | 10 | 9 | 9 | Single or ongoing, on site or remote, hours, ownership, cost, who it's not for |
| Conversion completeness | 5 | 5 | 5 | One action everywhere, three field form, prefill, fallback, phone bar |
| Interaction and accessibility | 5 | 5 | 5 | axe 0, keyboard on every control, reduced motion honoured |
| Technical reliability | 5 | 5 | 5 | Every file verified live on both sites |
| Total | 100 | 91 | 93 | |

The gap left is the same two things, a photo of Noah at work and a first client who agrees to be named. Only he can
close it.
