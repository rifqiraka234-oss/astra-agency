# Build brief. The Taste Frankfurt prototype and plan, for Astra agency

Written 29 Oct 2026 for an AI build session. Everything you need is in this folder, this file plus `offer.json` (what
they sell, their prices and their own lines, each with its page), `media.json` (all 104 images and both films on their
site, what each one shows, ids matching the red numbers on `contact-sheets/`) and `contact-sheets/`. Read all of it
before you open a browser. It's long because every line in it is a note Raka (Astra's founder) has sent a build back
for. Following it is how this one ships in one go.

---

## 0. Read this first. What went wrong on the builds before you

Between 12 and 26 Oct, 12 prototypes took 30 versions. The rules already existed when most of them came back. The
first build was the safe one and the art came second, each note was fixed alone and the fix caused the next note, and
Raka saw a finished site before anyone checked the direction. Raka's words, "we cant do second or third runs of the
prototype building we needa do it in one go".

The last build (Charlie's Desserts, 29 Oct) passed every check and still came back, because it was one page of 25
screens with no header. His words.
- "do we not design a home page and different pages ... on the header as well and all?"
- "I'm also missing kind of like photos and videos and overall flow ... it's a bit too much and it should be more sleek
  the flow"

So this build starts where that one had to end up. **Real pages with a header from the first screen, a short home of
about 10 screens, their own photos and their own two films carrying every page, one job per section, less text.**

And the line that matters most. **You're an AI, and your default taste is the look Raka sends back.** When you judge
your own build you judge it with the taste that made it. Section 18A is how you get out of that. Do it before you
design anything.

---

## 1. The job in one paragraph

Erik Schmidt-Lange and Frederik Schreier run Taste Frankfurt, a young live cooking caterer from Langen, south of
Frankfurt. Their black counters and pavilions turn up at a company's office, courtyard, warehouse or rooftop and cook
burgers, Flammkuchen, bowls and Poffertjes in front of the guests, for 30 to 2,000 people. They've cooked for Porsche,
the Städel Museum's Städel Night (2,000 guests over two days), Bosch, Yahoo and DeLonghi. We told Erik that on a phone
his homepage shows Porsche and the Städel Night only in a slowly moving strip about four screens down, under reasons to
book that any caterer could give, so a team planner booking the Christmas party probably leaves before seeing who
they've cooked for. We offered "a Taste Frankfurt site that opens on your Porsche and Städel events in your own photos,
with the Christmas menus and prices one tap away". He said "Yeah of course I'm open to see your opinion:) thanks".
Build that site as a working prototype, German first with an English switch. A company planner lands, sees on the
first screen whose parties these two have cooked, answers their own five questions as they scroll (the occasion, the
guests, the menu line, inside or out, the bar), sees their published guide price for that, and sends an enquiry that
arrives already filled in, ending on the promise that Erik or Frederik answer within 24 hours. It has to look like a
25,000 euro site from a top studio, feel like standing at their counter on a cold evening with the lights on, and carry
one moment nobody has seen on a caterer's site. Beside it, a plan site in English, in Astra's voice, that shows what
the new site does, what runs underneath, the weeks to live and the cost (section 22). One build, approved in two looks,
no second version.

---

## 2. The order of work. Nothing goes live until step 9

1. **Read this whole brief and both json files.** Pull the Astra repo if you can (section 19), rules change during the
   day.
2. **Research for the build** (section 18). First the AI default, what a normal Claude or ChatGPT website for a caterer
   looks like, so you know exactly what not to make. Then their whole site and both films, five or more premium
   caterer and food event sites for the type, and award level sites rendered today for the art.
3. **Fill the build card** (section 20, A to D) with a source for every line. A line you can't answer sends you back
   to research, never to a guess.
4. **Build the first look only, locally.** The header (desktop and the phone menu), the first three screens of Home,
   and the ONE signature moment working (section 12). The enquiry drawer open on a phone.
5. **First look.** Send Raka the card's sections A to C, screenshots at 1440 by 900 and 390 by 844 of those screens,
   three frames of the moment mid motion, the drawer on a phone, and your first screen beside the AI default
   screenshots from 18A. Then STOP and wait for his go. A note here costs one screen, not a site.
6. **On his go, build the rest in one pass** to the card, every page, and the plan site (section 22) with it, its
   screenshots taken from the finished prototype.
7. **Run every check in section 19** until all pass, each with its planted failure caught, on both sites.
8. **Final look.** Every section of every page of both sites screenshotted at 1440 and 390, plus each page as ONE self
   contained HTML file (images and fonts inlined, opens offline by double click). Send those to Raka. Nothing deployed.
9. **On his "final"**, hand back both folders (section 21). Astra deploys them to Netlify itself. You don't deploy.

There is no calm version one. The art is in the first screen Raka sees.

---

## 3. Who we are, and the bar

**Astra agency** is Raka Mulya's studio in Amsterdam. It builds websites, apps and internal tools for brands like
Unilever, AXA and Pertamina, and finds small business clients through researched LinkedIn messages. When a lead says
yes to "Shall I send you a sketch?", we build the real thing, a working prototype on their own content, and send the
link. The prototype is the pitch. It has to make the owner think "I want that, now".

Raka judges every build himself. What he has sent builds back for is the whole of section 15. What he signed off, in
his words, "holy shit.. bro send it to him NOW" (BWILD v2, 26 Oct) and "Brooo amazing! Write in the mds to always make
these kind of plans and prototypes" (Saavedra v3, 25 Oct). Open these before designing, they're the bar.
- https://astra-saavedra-prototype.netlify.app/entreprises/ and https://astra-saavedra-plan.netlify.app/ , a caterer
  selling to companies, the closest to this job. One order carried down the page, the hero as the first input, the plan
  beside it with graphs you can move.
- https://astra-bwild-prototype.netlify.app/ , the art build he loved.
- https://astra-faeclub-prototype.netlify.app/ , the route to the action.
- https://astra-hertling-prototype.netlify.app/ , the reference for one idea from the lead's own promise and their logo
  as the hero object. Not for its type and buttons. Its italic headline halves, pill buttons, soft shadow boxes and
  count ups came before the 25 Oct rules and fail today.
- https://astra-charlies-prototype.netlify.app/ , look at it for what NOT to repeat in shape. One long page, no header,
  everything at once. Its art (the pour, the golden ticket) he liked.
All 200 on 29 Oct. Never copy their look. Copy what they do.

---

## 4. The lead and the business

**Erik Schmidt-Lange**, co-founder and co-owner. Impressum, "Verantwortlich Frederik Schreier und Erik Schmidt-Lange
Freddi On Tour Schloss Wolfsgarten 1 63225 Langen". His own page, "Ich bin Erik, Co-Founder von Taste Frankfurt.
Gemeinsam mit Frederik habe ich 2024 unser Catering-Unternehmen gegründet ... Persönliche Beratung statt anonymer
Catering-Industrie. Wer uns anfragt, spricht direkt mit uns." (https://tastefrankfurt.com/erik-schmidt-lange/).
**Frederik Schreier** is the other co-founder (https://tastefrankfurt.com/frederik-schreier/). Write for two young
owners who run every event themselves and know their margins. Never explain their own business to them.

**What they sell** (everything in `offer.json`, each with its page).
- Mobile live cooking from 30 to 2,000 guests across Rhein-Main, inside or out, with their own counters, pavilions,
  plancha grills and team. Setup and breakdown included.
- Three menu lines, freely combined, each vegetarian or vegan on request. **American** (Burger, Pommes, Poffertjes),
  **French** (Flammkuchen, Waffeln), **Fusion** (Bowls, Schaschlik, Desserts im Glas). Dishes, drinks and desserts on
  their own pages, each with "Zur Anfrage hinzufügen".
- Drinks from softdrinks to Sekt and wine, Glühwein and Punsch in winter, a mobile cocktail bar with a bartender, a
  specialty coffee bar.
- **Christmas right now.** "Weihnachtsfeier Catering für Firmen in Frankfurt", "Dein privater Weihnachtsmarkt direkt
  bei dir vor Ort", live cooking from the plancha, Poffertjes, Churros, Waffeln, a Glühwein stand, decoration. Eight
  Christmas photos uploaded in October 2026. No goose or roast, they say so.
- **Prices they publish** (https://tastefrankfurt.com/catering-preise/), net per person, guide values. Lunch from 40 €,
  summer party with burger station from 45 € (80 guests), gala from 60 €, wedding with bar from 90 €. "Die meisten
  Events landen zwischen 45 € und 65 € pro Person netto." Minimum order 1.800 € netto. Offer within 24 hours, not
  binding, with a full cost breakdown.
- **Their cases**, as their own text names them. Porsche Sommerfest (100), Städel Night (2.000 Gäste an 2 Tagen), Yahoo
  Lunch Event (100), Tatort Filmpremiere (cast and crew), Bosch Roadshow (60), DeLonghi Lunch Meeting (150), DSV
  Kundenevent (80), Instone Richtfest & Grundsteinlegung (70). Plus Monzapark, Panasonic and the J.P. Morgan run in
  photo captions and one page.

**Audience.** Company planners in Frankfurt and Rhein-Main (office managers, HR, team assistants, event managers) on a
phone and on a work laptop, arriving from Google ("Weihnachtsfeier Catering Frankfurt", their city pages) and from
event marketplaces. Instagram is quiet (92 followers, 7 posts, newest 5 May 2026), so design for search and for the
laptop as much as the phone.

**Rivals, for your teardown only, never named on the site.** we celebrate (Foodprnt GmbH, Frankfurt, food trucks), FLOW
THE KITCHEN, plus the big Frankfurt party services. Taste Frankfurt should make each of them look like a template.

---

## 5. The conversation so far, and the promise

Our first message on LinkedIn, 26 Oct 2026, word for word.

> Hi Erik, Taste Frankfurt looks cool!
>
> However, your homepage on a phone shows Porsche and the Städel Night only in a slowly moving strip about four screens
> down. The reasons to book you read Maximale Flexibilität, Mit Herz and Qualität & Zufriedenheit. So someone planning
> their team's Christmas party probably leaves before seeing who you've cooked for.
>
> I'd suggest a Taste Frankfurt site that opens on your Porsche and Städel events in your own photos, with the
> Christmas menus and prices one tap away.
>
> At Astra agency we make websites for brands like Unilever, AXA, Pertamina.
>
> Shall I send you a sketch of the Taste Frankfurt site for company events?

A plain bump on 29 Oct, and his reply the same morning, "Yeah of course I'm open to see your opinion:) thanks".

**So the prototype must prove five things on sight, and nothing on it may contradict our message.**
1. **It opens on their company events in their own photos.** Porsche and the Städel on the first or second screen at
   both sizes, never in a moving strip.
2. **The Christmas menus and their prices are one tap away** from anywhere, as real text.
3. **The reasons to book are theirs and specific** (who they've cooked for, live at your place, the two founders answer
   you themselves within 24 hours), never "Flexibilität, Herz, Qualität".
4. **A company planner can send a complete enquiry** in a few taps, already filled in from what they chose.
5. **It's a new design language**, made for company events, that feels like their counter on a winter evening.

---

## 6. Their site today, and what changes

https://tastefrankfurt.com , WordPress with the Astra theme (no link to us), built in May 2026 by an outside studio
(footer "Erstellt mit ♥ von WOLQE"), 57 pages, all German, still being edited (Christmas photos in October, sitemap
lastmod 20 Oct 2026). Read 26 Oct and again 29 Oct.
- **Home, on a phone** (measured 26 Oct at 390 by 844, page 7,518 px). Hero photo of staff at a buffet with "Mobiles
  Live-Cooking & Catering: Wir machen dein Event in Hessen zum Highlight" and ANFRAGEN, four tall food cards, then the
  client strip, where "Porsche Sommerfest" and "Städel Night" first show at y 3,552, 4.2 screens down, moving sideways
  (`.tf-kunden__track` with `animation: tfkunden-scroll 600s linear infinite`). Then eight occasion tiles, "Warum Taste
  Frankfurt" (Maximale Flexibilität, Mit Herz, Qualität & Zufriedenheit), a map, an FAQ.
- The same strip and the same "Warum" block sit on 17 of their 57 pages (recounted 29 Oct). Catering-Preise isn't in the menu and the
  home doesn't link to it. No review or customer quote on any page.
- They do a lot well, so never call any of it missing. Guide prices per head, dishes added straight to the enquiry, a
  five question Konzept-Finder, answers within 24 hours including weekends, 57 pages built for search (7 city pages, 12
  guides).
- The look. Manrope and Syne, black and lime (#a8c97a), small uppercase kickers with a rule in front, cards with a hard
  white offset shadow, lime icon squares, headlines ending in a full stop. Every one of those is on our banned list,
  so none of it carries over.

**The trap.** The site is five months old and was paid for. Never call it old, new, outdated, generic, broken or AI
made, never name or judge the studio. The prototype shows a different way, it doesn't knock theirs.

**What changes, in one line.** From a template that lists what they offer, to their counter at your company, lit up,
showing whose parties they've cooked and building your enquiry as you scroll.

**Keep their addresses.** Use their own slugs for the pages you build (`/weihnachtsfeier/`, `/menues/`, `/ueber-uns/`,
`/kontakt/`), so the plan can say every address stays.

---

## 7. Their material. Use all of it, the photos and films carry every page

### The mark and the logo
- **Wordmark** https://tastefrankfurt.com/wp-content/uploads/2026/05/taste-frankfurt-logo-scaled.webp , 2560 by 1020,
  white on transparent. The mark, then "Taste Frankfurt" over "catering". Keep it as their logo, never retype it.
- **The mark alone** https://tastefrankfurt.com/wp-content/uploads/2026/05/tf-favicon-clean.png , 512 by 512, black.
  **A burger drawn in three strokes, a top bun, a wave, a bottom bun.** Trace it to a clean SVG. It's the hero object
  (section 12). Look at `contact-sheets/logo-and-mark.jpg`.
- Some older photos show a diamond with a fork and knife and "TASTE ON TOUR" on aprons (006, 060, 067). That's an older
  mark. Crop it out or don't use the photo.

### Their photos. 92 photos, all looked at, listed in `media.json`
Their own photos on their own site, theirs to use on their own site. The best, by job.

| Job | Ids | Why |
|---|---|---|
| Christmas at night, the hero | 101, 103, 097, 096, 102, 094, 068, 021 | Their black pavilion and counters under string lights and garland, a tree, guests in coats. 101 and 103 are the strongest. 103 is a lone guest at the counter in the dark, the mood of the whole site |
| Christmas indoors | 043 (Monzapark, tree, star, chalk board), 100 and 018 (office counter, fir garland, Weckgläser), 098 (chalk board "Kinderpunsch Glühwein", Glühwein urns) | For the office and event location choice |
| Their cases | 045 Porsche, 046 Städel, 040 Bosch, 047 Yahoo, 079 DeLonghi, 041 DSV, 042 Instone | Their own event photos. Caption with the company only (their alt texts name some events two ways, see 16.4) |
| Company scale | 062, 005, 091, 086 | Long queues in office courtyards and on rooftops, people in business dress |
| Live cooking, hands and food | 050 (the station from above), 048, 031, 003, 000, 020, 080, 015, 049, 070, 025, 011 | The appetite. 050 from above is unusual and strong |
| Their chalk boards | 084 (BLACK ANGUS BURGER, POMMES), 098, 043, 074 | A real motif of theirs, see 12 |
| The team | 083, 038 | No names. Never caption anyone as Erik or Frederik (081 and 082 are captioned "Erik" and "Frederik" on their site but each shows several people) |
| Summer and drinks | 078, 072, 002, 086, 034 | Second visitor paths |

Skip or crop for marks. 024, 032, 067 (Corona as the subject), 099 (a Nutella jar as the subject), 002 and 073
(fritz-kola), 013 (ROCKET grinder), 064 (another firm's booth sign), 089 (a client's own staff posing), 095 (an
OpenStreetMap map, needs attribution, draw your own). The banners 023, 024, 030, 039, 069, 090 are 486 px tall, too thin
for full bleed. Zoom every photo you use for brand marks on bottles, cups and screens.

### Their two films. Use both
- **F1** https://tastefrankfurt.com/wp-content/uploads/2026/05/taste-frankfurt-sommerfest-15s.mp4 , 1920 by 1080, 15 s.
  Their live cooking station at a summer party, a queue, staff building bowls and handing one over. Live cooking,
  full bleed, where "we cook in front of your guests" is the point.
- **F2** https://tastefrankfurt.com/wp-content/uploads/2026/05/taste-frankfurt-rooftop-trimmed-v2.mp4 , 1920 by 1080,
  8.5 s. A rooftop on an office building at golden hour, guests round their counters, towers behind. Nobody
  recognisable. The strongest full bleed they have, for company evenings and summer.
- Frames of both are on `contact-sheets/video_sheet.jpg`. Recompress each (H.264 and a WebM, under 3 MB where you can),
  a poster frame, muted, played only on screen, never under reduced motion or data saver.
- There's no winter film of theirs. If a Christmas moment needs motion, make it from their own night photos first (the
  bulbs in 101 or 103 lighting one by one, steam over the Glühwein urns in 098). Only then licence checked stock, read on
  its own page, never captioned or claimed as theirs, no faces, no brands.

### Shapes that are already theirs. Build the page out of these, not out of rectangles
1. **The three strokes of the mark.** Top bun, wave, bottom bun.
2. **The black pavilion**, its roof edge and four legs, the frame every outdoor photo of theirs is built around.
3. **The string lights**, a sagging line of warm bulbs, which is the mark's wave.
4. **The black counter** with "Taste Frankfurt." on its front and a wooden top.
5. **The chalk A board** with the menu written by hand.
6. **Kraft boats and bowls, Weckgläser.**
7. **Garland and a star**, their own Christmas dressing.

### Colours, sampled from their photos and logo (re-sample, these are a start)
| Role | Hex | From |
|---|---|---|
| Night | #0f0e0b to #16130f | 101, 103 |
| Counter graphite | #2f2d2b | 079, 098 |
| Oak counter top | #b7aa94, #816f56 | 075, 079 |
| Bulb light | #e7d9b4 | the string lights in 101 and 103 |
| Their lime | #a8c97a | their site's accent. Their brand, but their template's colour too, so a whisper at most |
| Black and white | #0a0a0a, #ffffff | their logo |
Photography carries the colour.

---

## 8. Who lands, what they think, the one action (refine in the card)

**Visitor 1, the company planner. Most of the traffic, and the one the message was about.** An office manager, HR
person, team assistant or event manager at a Rhein-Main company of 30 to 300 people, planning the team Christmas party
right now (or the summer party in spring), on a laptop at work or a phone on the way home, arriving from Google.
- Thinking, in order. Have they done this for companies like ours? Would it work at our place (the office, the
  courtyard, the warehouse)? What do people eat, and is vegetarian and vegan covered? Roughly what does it cost per head,
  and is there a minimum? Can they still do a date in December? How fast do I get an offer, and who do I deal with?
- Goal. A Christmas party the team talks about in January, no organising headache, inside the budget, easy to get
  signed off.
- **The one action. Send the enquiry.** Occasion, date, guests, place, menu line, bar, name and company, arriving
  already filled in. The answer comes from Erik or Frederik within 24 hours.

**Visitor 2, the brand or event planner.** An agency or marketing team planning a showroom opening, a premiere, a
roadshow or a trade fair (their Porsche, Tatort, Bosch and Messe work).
- Thinking. Can they handle 500 or 2,000? Do they look good in front of our brand? Can they run several stations?
- **The action. The same enquiry, with Empfang / Messe / Lunch and the guest count set**, or a call to 0176 34877333.

**Visitor 3, the private host.** A wedding or a big birthday (their own pages, weddings 95 to 180 € per head).
- **The action. The enquiry with Hochzeit or Geburtstag set.** A clear path from Home, never the main story.

Every visitor gets their own route and button. The enquiry action is never more than half a screen away anywhere on any
page, at 390 and at 1440, and not only in the header.

---

## 9. Pages and the header. Decide this first

Raka's note on Charlie's v1, "do we not design a home page and different pages ... on the header as well". So.
- **A header on every page.** Slim, over the hero, solid once scrolled. Their logo (home link), then Weihnachtsfeier,
  Menüs & Preise, Referenzen, Über uns, the language switch (DE, EN), and at the right the enquiry button carrying the
  live state ("80 Gäste · Anfragen"). On a phone, the logo, a Menü button that opens a full screen solid panel, and
  Anfragen.
- **Five pages, their own slugs.**
  - `/` **Home.** About 10 screens at 1440, 12 to 14 at 390. The hero (section 12), their cases, the five questions as
    you scroll, the one full bleed film moment, the guide price, the two founders, the private path, the foot.
  - `/weihnachtsfeier/` **The Christmas party.** Their private Christmas market at your company. Place, December date,
    guests, live cooking, Glühwein stand, desserts, the guide price, the enquiry. It opens on 101 or 103.
  - `/menues/` **Menüs & Preise.** The three lines, every dish, drink and dessert as text in their words, each with
    "Zur Anfrage", and their guide prices and what's included (it carries what's on their /catering-preise/ today).
  - `/referenzen/` **Their events.** The eight cases, each a short story in their own photo, the number of guests from
    their text, and "Für euch auch" into the enquiry with that occasion set.
  - `/ueber-uns/` **Erik and Frederik.** "Wer uns anfragt, spricht direkt mit uns." The team in 083, the region drawn
    as their own map, how a day with them goes.
- **The enquiry is a drawer, not a page.** Every Anfragen (header, bar, any section) slides up one panel holding the
  whole state, with name, company, email and phone to add, and it ends on the finish moment (section 12). Same on every
  page. `/kontakt/` exists too, as the same form full page, for their old links.
- **One state across pages.** Keep it in sessionStorage (in a try and catch, the page still works without it), so the
  bar, the chalk board and the drawer keep the answers from page to page.
- **Ten sections at most on any page.** Each one does one job. Nothing said twice on one screen.

---

## 10. The flow table for Home (the draft, refine it in the card, write one for /weihnachtsfeier/ too)

| Step | The visitor's question | What they see and do | The moment that answers it |
|---|---|---|---|
| 1 Hero | "Is this the right kind of caterer for our party?" | Full bleed, their stand at night. Their mark, their line, and the first question, "Was feiert ihr?", with the occasions as big tappable words (Weihnachtsfeier first, then Firmenfeier, Sommerfest, Empfang & Messe, and Hochzeit and Geburtstag smaller). Anfragen in the page | The mark becomes their stand (section 12). Tapping an occasion relights the scene with their own photo of that occasion and writes it into the state |
| 2 Their events | "Have they done this for companies like ours?" | Porsche, Städel, Bosch, Yahoo, DeLonghi as their own photos, big, one at a time, the guests from their text ("2.000 Gäste an 2 Tagen") | Never a strip, never logos. A case you can step through, each photo full bleed |
| 3 At your place | "Would it work at ours?" | Choose the place. Büro, Innenhof, Lager, Firmengelände, Dachterrasse, Eventlocation (their own words on /weihnachtsfeier/). Each shows their real photo of their stand in that kind of place, and their line on space, "ca. 3 x 5 Meter, ab 160 x 160 cm" | The stand assembles in the place you chose |
| 4 Live, in front of your guests | "What's it actually like?" | Their film F1 or F2 full bleed, a few words | Film, once, where it means something |
| 5 How many, which line | "What do people eat, how many of us?" | Guests as a giant number to drag (30 to 2,000), the three lines as their own dishes in their own photos, vegetarian and vegan on every line | Their chalk board writes the chosen line by hand |
| 6 What it costs | "Roughly what are we looking at?" | Their published guide for this, net per head, the minimum, what's included, and one line "Dein Angebot kommt persönlich, binnen 24 Stunden" | A graph that's a control. Guests along the bottom, their 45 to 65 € band, the 1.800 € minimum as a floor you can see |
| 7 Who you deal with | "Who answers me?" | Erik and Frederik by name in text, "Wer uns anfragt, spricht direkt mit uns", the team photo 083 unnamed | The time their answer is due, counted from now ("Antwort bis morgen, 18.40 Uhr") |
| 8 Private | "And for a wedding?" | One quiet strip, Hochzeit and Geburtstag with their own guide, into the enquiry with that occasion | |
| 9 Foot | "Anything else?" | Phone, email, region, the prototype note, the language switch | The bar is still there |

---

## 11. The one idea and the one state

**The one idea, from their own words.** "Dein privater Weihnachtsmarkt direkt bei dir vor Ort" and "Wir kochen live bei
euch vor Ort" (their Christmas page), with "Frisch vor Ort gekocht von 30 bis 2.000 Gästen" (their home). Their stand
comes to you and the lights go on at your place. Every chapter is that stand at someone's company, Porsche's, the
Städel's, yours. If another caterer could use the idea with the nouns swapped, it's not the idea. Their mark, their
pavilion, their string lights, their chalk boards and their photos make it theirs. Confirm it or find a better line of
theirs in research, and name its source in the card.

**The one state, built from their own Konzept-Finder.** Their site already asks five questions on a separate quiz page
(`offer.json` konzept_finder). This site asks the same five down the page and never asks twice.
```
anfrage = { anlass, ort (indoor | outdoor | beides), platz (buero | innenhof | lager | firmengelaende | dachterrasse | location),
            datum, uhrzeit, gaeste, linie (american | french | fusion | unklar), speisen[], getraenke[], desserts[],
            bar (cocktail | sekt_wein_soft | keine | unklar), firma, name, email, telefon, nachricht }
```
- Every control writes it and every display reads it. The hero, the place scene, the chalk board, the guide price, the
  bar at the bottom, the drawer and the hidden form fields all agree. Nothing is typed twice.
- **Name the form fields exactly as their live form does** (`Name`, `email`, `Telefon`, `Wunschdatum`, `Uhrzeit`,
  `Anzahl_Gaeste`, `Ausgewaehlte_Speisen`, `Ausgewaehlte_Menues`, `Nachricht`, plus `Anlass`), so the plan can say the
  enquiry lands in their inbox the way it does today, only complete.
- **The bar at the bottom carries the request, not a price.** "Weihnachtsfeier · Innenhof · 80 Gäste · Anfragen". On a
  phone it leads with the guests and the button, because an ellipsis must never eat the one thing it's for. It steps
  aside where an Anfragen button or the drawer is on screen.

**The guide price, exactly, and why it's careful.** Their quiz page says "Persönliche Beratung statt Preisrechner",
personal advice instead of a price calculator. That's their choice, so the site never becomes a calculator and never
shows a final price. It shows only what they publish.
- The band. Guests times 45 € to guests times 65 € net ("Die meisten Events landen zwischen 45 € und 65 € pro Person
  netto"), never below the 1.800 € netto minimum. For a lunch, from 40 €. For a wedding, 95 to 180 €. Their example
  rows (lunch 40, summer party 45, gala 60, wedding 90) as they write them.
- Every figure labelled "Richtwert aus unseren Preisen 2026, netto. Dein Angebot kommt persönlich, binnen 24 Stunden."
  (English, "Guide from our 2026 prices, net. Your offer comes from us personally, within 24 hours.")
- No VAT sums, no tax advice, no per item prices (they don't publish any), no discounts.

---

## 12. The signature moments

### First look moment. The mark becomes their stand (build this one first)
Their mark is a burger in three strokes. Their stand is three lines too, the pavilion's roof edge, a sagging string of
lights, the counter. On load (and on scroll back to the top) the three strokes draw large in the dark, then move apart
into the stand. The top bun stroke lifts and flattens into the pavilion roof, the wave stretches into the string of
lights and each bulb switches on one by one in warm light, the bottom bun stroke slides into the counter with
"Taste Frankfurt." on its front. Then their own night photo (101 or 103) is revealed exactly behind it, the drawn lines
landing on the real roof, lights and counter, and the drawing hands over to the photo. It's made only from their mark and
their photo, and it says what they do (they bring the stand, the lights go on) before a word is read.
- Align the drawn strokes to the real lines in the photo by measuring them, at both crops (1440 and 390). On a phone use
  a portrait crop of the same photo, or 096.
- The bulbs are light, not dots. Bloom that's made from the bulb colour, a little flicker as each catches, light falling
  on the counter top. Never a generic glow.
- Choosing an occasion in the hero replays a short version over their photo of that occasion.
- Under reduced motion, the finished state at once, the photo with the mark as a still line drawing.
- Measure it against the award sites you render in 18A. Name them in the card.

### The place scene. "Bei euch"
On Home step 3 and on /weihnachtsfeier/, the visitor picks where the party is and sees their own photo of their stand in
that kind of place (Büro 100 or 075, Innenhof 097 or 079, Lager or a hall 043, Firmengelände 103, Dachterrasse F2 or
005, Eventlocation 046). The stand's strokes from the hero draw in over it again, small. If they don't have a true photo
of one kind of place, leave that choice out rather than fake it.

### The finish. Their chalk board
Their chalk A boards are real (084 "BLACK ANGUS BURGER", 098 "Kinderpunsch Glühwein"). As the visitor answers, a board
beside the drawer writes their party in chalk, stroke by stroke, the occasion, the date, the guests, the line and its
dishes, Glühwein if chosen. Sending the enquiry ends on the board turned to face you, "Reserviert für [Firma], [Datum]",
and under it the time Erik or Frederik answer by, counted 24 hours from now in Frankfurt time. Chalk lettering needs a
licence you can prove (OFL or drawn as strokes), only on the board, never as site type.

### Optional, only if each earns its place
- Steam rising off the Glühwein urns in 098 as the page turns to evening.
- The guest number dragging people into the queue at their counter (their own queue photos as a mask, not icons).
- Their region drawn as a single string of lights from Langen through the cities they list.
- The plancha. Burgers hitting the grill as the menu line is chosen, sound off by default.

Every moment has a still state and none plays under reduced motion. Heavy work (WebGL, canvas, film) starts after the
page has loaded and rests when it's off screen.

---

## 13. Art direction

**The feeling.** A company Christmas party in the cold, the moment you step into the warm light at the counter. Steam,
sizzle, string lights, everyone standing together for once. Premium and grown up, the way a good hotel bar feels, not a
Christmas market stall and not a street food truck. In summer the same counter at golden hour on a roof. The photos do
the appetite and the warmth, the light and motion do the wonder.

**Their pictures at the centre of everything.** Full bleed and large, one at a time, never shrunk into a grid of
boxes. Never darkened under a grey overlay. Each page opens on one of theirs (Home 101 or 103, Weihnachtsfeier 097 or
103, Menüs 050, Referenzen 045, Über uns 083).

**A colour script, not a palette.** The page runs like an evening at a company. Dusk at the top (their night photo, the
bulbs coming on), into the warm light of the counter (oak, bulb, steam) through the menu and the price, and back out
into the dark at the foot with the lights still on. Bulb light is the one colour that means "this is Taste Frankfurt".
Their lime only as a whisper, if at all. Never black and lime as the system (that's their template).

**Gradients, reinvented, not deleted.** No purple to blue hero, no glow behind a card. Gradients that are real light.
The warm fall off round a bulb, dusk going to night across the page, steam, the sheen on the oak top.

**Motion with weight.** Strokes that draw and move apart, bulbs that catch, chalk that writes, photos that hand over to
each other through their own shapes (the pavilion roof, the counter edge). Never only fades.

**Type.** Pull the font names off five or more premium caterer, restaurant group and food event sites today (18B) and
pair to them with fonts you may ship (OFL, licence file in the folder). The default that has passed Raka is one grotesk
plus a quiet mono, Mona Sans for everything (headlines at weight 500 to 560 with tight tracking, its condensed width for
the big guest number and prices) and Fragment Mono for prices, times, the date and the guest count. Their site's Manrope
and Syne are out. German words are long ("Weihnachtsfeier", "Mindestauftragswert"), so test every heading at 320 with
hyphenation off and no word cut across lines.

**Buttons.** Square, or one of their own shapes (the counter's front, a chalk board's frame). Sized and placed on
purpose. One word where you can, "Anfragen", "Senden", "Zur Anfrage".

**Layout.** Simple and uncluttered. Edge to edge chapters, no cards floating on a grey page, no repeated two column
grid. Each section moves the visitor one step toward the enquiry.

**The test before Raka sees it.** Put your screenshots beside Saavedra v3 and BWILD v2 and beside the AI default sites
from 18A. Would this pass for a 25,000 euro site from a top studio? Would anyone screenshot it and send it to a
colleague? If the honest answer is "probably", it's a no. Go further.

---

## 14. Copy

**Language.** German first, an English switch in the header, the same page in both. The German is what Erik's
customers read, the English is so Raka can judge it. Never nest one language inside another, build the two side by
side, and never let a CSS selector reach into both. Numbers in German style (1.800 €, 45 bis 65 €), the narrow no break
space replaced with a plain no break space.

**Their voice.** They say "du" to the planner and "ihr" and "euch" for the team ("Wir kochen live bei euch vor Ort",
"Dein Event? Unser Job!"). Warm, direct, a little proud of the food. Read every page of theirs and write like them,
shorter. Use their own lines wherever they fit, copied exactly from the page, never from memory (`offer.json`
their_lines).

**Hard rules for every word on both sites.** Astra's house rules, checked by grep before each look.
- No dashes in prose (hyphen, en dash, em dash). Rewrite around them. Their own names and terms that carry one stay as
  they write them ("Live-Cooking", "Rhein-Main", "Cous-Cous", "Mango-Chutney"), nothing else.
- No colons in prose. Times as "18 Uhr", "18.30".
- English with contractions everywhere (it's, you'll, we're, don't). In German write it the way they talk, not the
  way a brochure does.
- At most one exclamation mark on the whole site (their "Dein Event? Unser Job!" counts if you use it). No emoji.
- Sentence case headings. Every heading says something only Taste Frankfurt could say, never a label like "Über uns" as
  the only words, "Unsere Leistungen", "Warum wir", "Our services".
- Never these words, in either language. delve, leverage, utilize, harness, unlock, unleash, empower, elevate,
  streamline, transform, supercharge, seamless, robust, cutting edge, bespoke, tailored, holistic, innovative,
  unparalleled, comprehensive, curated, immersive, landscape, journey, testament, synergy, solutions, furthermore,
  moreover, additionally, indulge, mouthwatering, unvergesslich, Genuss pur, kulinarische Reise, Rundum-sorglos,
  für jeden Geschmack, mit Liebe gemacht, das gewisse Etwas, Erlebnis der Extraklasse. Unless you're quoting them.
- No "nicht nur X, sondern Y" or "not just X, it's Y". No rule of three adjective lists. No rhetorical question openers
  (the hero's "Was feiert ihr?" is a real question the visitor answers, that's fine). No fragments for punch. No
  "Egal ob du X oder Y bist". Vary sentence length hard.
- **Never "Maximale Flexibilität", "Mit Herz" or "Qualität & Zufriedenheit"** as reasons, those are the lines our
  message pointed at.
- If a sentence would read the same on another caterer's site, delete it and write the Taste Frankfurt version.

**The prototype note**, small, in the foot and in the drawer, both languages. "Ein Prototyp von Astra agency für Taste
Frankfurt. Preise sind Richtwerte aus eurer Preisseite. Hier wird keine echte Anfrage verschickt." / "A prototype by
Astra agency for Taste Frankfurt. Prices are guide values from your price page. Nothing here sends a real enquiry."

---

## 15. The Claude look. Every item here has sent a build back

Raka's words across 12 builds. "a typical Claude and ChatGPT website where all the stylings and the positionings are the
same and like the buttons are the same ... it just feels like it's a 500 euro website". "it feels like it's so plain and
basic ... It needs to have a wow effect ... something that they've never seen before". "i feel like this is a normal
CLAUDE website. look you need to be an artist, use your creativity, creations, shapes, gradients, animations photos,
GRAPHICS, to tell the story". "it doesn't give me wedding vibes ... It's not exclusive". "the choice of fonts! They look
cheap as f. Not exclusive". "does this website make it super easy to tell the story and guide the intended audience to
the intended action?". And on Charlie's, "it's a bit too much and it should be more sleek the flow".

**Banned, all of it.**
- A serif headline with an italic second half. Any headline mixing roman and italic.
- A small uppercase kicker over headings, with or without a rule in front (their site does this on every section).
- Pill shaped buttons, and any arrow glyph in a button or link (their "Anfragen →" too).
- Rounded cards with soft shadows, cards with a hard offset shadow (theirs), chips and tags, a floating pill.
- Icon squares (their lime ones), line icon rows.
- Cream and indigo (or light and dark) chapters taking turns down the page.
- Generic gradients, glows, gradient overlays on photos, a dark overlay on every photo.
- Big count up numbers. Three pillars of bullets ("Flexibilität, Herz, Qualität" is exactly this). Four facts with top
  rules.
- A logo or word marquee, a moving client strip (theirs is the thing we pointed at).
- Cute SVG illustration scenes, their own illustrations (035 to 037).
- One texture under every section. The same two column grid again and again.
- Their photos shrunk into boxes. A graphic that reads as a chart when it's meant to be a picture.
- Motion that's only fades.
- More than 10 sections on any page. One long page instead of pages.
- Headlines ending in a full stop as a style (theirs).
- Fonts Inter, Space Grotesk, Montserrat, Poppins, Archivo, Nunito, Roboto, Open Sans, Lato, Raleway, DM Sans, Plus
  Jakarta Sans, Manrope, Syne, Anton, Bebas Neue, Oswald, Libre Caslon, Playfair Display, DM Serif Display.
- A hero that's under a quarter their picture, film or mark at either size. Aim for over a third.
- A half screen anywhere, at 390 or 1440, with no way to the enquiry except the header.

---

## 16. Truth and legal. Never break these

1. **Every price comes from `offer.json`** (their /catering-preise/ and /weihnachtsfeier/ pages). Never invent one, never
   a per dish price, never a final price, never a discount. Every figure labelled a Richtwert, net.
2. **Every claim about them is in their own words somewhere on their site.** If a capability isn't on their pages (an
   availability calendar, online payment, a booking that confirms itself), it isn't on the prototype. Lead times as
   they state them (3 to 4 weeks on /weihnachtsfeier/, their home says 4 to 6, use 3 to 4 and list the mismatch in the
   handover).
3. **No reviews or quotes** unless you opened them at the source with the reviewer's own words and name as shown. Naboo
   shows 5 from 13 reviews (https://www.naboo.app/en-us/explorer/restaurants/taste-frankfurt , read 29 Oct). The rating
   may appear with its link and the date you read it, nothing more unless you can read the reviews there.
4. **Cases exactly as their text names them** (Porsche Sommerfest, 100 Personen, and so on). Their image alt texts
   disagree with each other (the Porsche photo is "Porsche Showroom Opening" on one page and "Porsche Sommerfest" on
   another, the Bosch one "Roadshow" and "Sommerfest", the Städel one "Kuratierter Empfang" and "Städel Night"). So a
   photo is captioned with the company only, and the event line sits as text beside it, never as the photo's caption.
5. **No people named on a photo.** Erik and Frederik are named in text only, never under a photo. No photo is captioned
   as them or as any staff member or guest.
6. **Third party marks.** Client names in our type, never their logos (their site's logo files 051 to 059 stay unused).
   A client's sign in their own event photo (the PORSCHE lettering on 045, the BOSCH flag on 040) is their proof and may
   stay. Drink, food and machine brands as the subject (Corona, Nutella, fritz-kola, ROCKET) are cropped out or the
   photo is skipped.
7. **Licence checked media only** for anything not theirs. The source page read, its licence written down (on Mixkit
   read each item's copyrightNotice, some are "Restricted"), never captioned or implied as Taste Frankfurt's, no faces,
   no brands. The handover lists each one.
8. **Nothing that dates.** No "Weihnachten 2026" countdown, no "new" badges, no named December dates as booked or free.
9. **Never anything from section 23 on either site.**
10. **Never knock their current site or its studio** on either site.

---

## 17. Technical

- **A static site.** HTML, CSS and vanilla JS, or a small build step that outputs static files. It must run from the
  folder with any static server and deploy to Netlify as is. No external CDNs at runtime, fonts and libraries self
  hosted in the folder.
- **The enquiry works end to end as a mock.** Every question, the drawer, name, company, email and phone, send, the
  chalk board finish. Nothing is sent anywhere. The hidden fields named as in section 11. Every control name unique
  across the page.
- **Phone first and laptop too.** Test at 320, 360, 390, 430, 768, 1024, 1440 and 1920. No horizontal scroll at any
  width (test `scrollTo(200, y)` and read scrollX at 320 and 360) and after a resize from 1440 to 320. Dragging the guest
  number is sideways only, so the page still scrolls.
- **Performance.** Phone Lighthouse performance 75 or better. Images in AVIF or WebP at the sizes shown, lazy below the
  fold. Film only where it means something, a poster always, never autoplayed under reduced motion or data saver,
  codecs named in each source's type. WebGL and canvas start after load, rest when off screen, cap at 30 frames a second
  on slow devices.
- **Accessibility.** axe clean at the top, middle and end of every page, both motion modes, both sizes. Text contrast
  measured from pixels on photos. Never dim text to show state. Never make the h1 inert.
- **Reduced motion.** Every moment has a designed still state.
- **noindex.** A robots meta tag, a `robots.txt` that disallows all, and a `_headers` file with
  `X-Robots-Tag: noindex, nofollow`. A favicon from their mark. A `404.html` in the site's style.
- **Known traps from past builds.** clip-path hides but doesn't contain, so animated content inside a clipped shape gets
  overflow hidden too. A full screen decorative canvas gets `pointer-events:none`. Sticky layers with negative margins
  can escape their section, give the section `overflow:clip`. Keyframe and custom property names are global, so grep
  before adding one. Inline SVGs drawn twice need unique ids. On a bilingual build every descendant `span` selector is a
  bug, use child selectors. A hidden tooltip is display none, not opacity 0. No `scroll-behavior:smooth` (it fools the
  checks). No inline grid styles, every grid `minmax(0,1fr)`. Every evaluate in a test that waits on a frame has its own
  timeout.

---

## 18. Research you still do, today, before the card

### 18A. Go beyond the normal Claude or ChatGPT website. Research the default first, then leave it behind

Raka's words on builds that came back. "think outside of your AI box ... it still feels like the lovable and AI stuff".
"take like the top 50 companies in the world ... Check their website ... Does it tell a story? What kind of media do you
need to tell the story?". "we have just taken what they've done and put an icing cake on it ... You didn't redesign it".

1. **Map the AI default for exactly this brief.** Render ten or more sites made with AI site builders and templates
   (Lovable, v0, Bolt, Framer AI, Wix AI, Durable, the catering and event templates of Squarespace, Webflow and Wix) and,
   if you can, ask a plain chat model for "a website for a live cooking event caterer in Frankfurt" and screenshot what
   it gives. Write the pattern list. Expect a dark hero photo with a centred headline and a grey overlay, "Unvergessliche
   Momente" copy, pill buttons, a three up "Our services" grid, rounded cards with icons, a logo strip, a testimonial
   carousel, count up stats ("500+ Events"), Inter or Manrope or Montserrat. Their current site is most of this list.
2. **Go beyond the top 50.** Render 50 of the best sites in the world, not only caterers. Restaurant groups, hotel bars,
   food and drink brands, event and festival sites, product launch pages, Awwwards and FWA winners, studios known for
   light, WebGL, line drawing and scroll scenes. Script it, one run, a screenshot of each at 1440 and 390. Get past bot
   walls with a real browser TLS fingerprint before you give up on one, and name the ones that stayed walled. Report how
   many actually rendered, never "top 50 studied" when 30 did.
3. **Fingerprint them, don't just look.** Count at runtime while scrolling. WebGL canvases, videos, sticky and pinned
   scenes, clip-path masks, blend modes, animation libraries, words on the first screen, how each moves a visitor to its
   action.
4. **For each, the one move worth taking**, and what kind of media tells each part of the story. Every chapter gets a
   different medium (a line drawing that becomes a photo, a place picker, film, a drag number, chalk writing, a graph you
   move). Two chapters in a row with the same medium reads as a template.
5. **The departure table**, in the card. Left, every pattern from step 1. Right, what this build does instead, made
   from their material. A redesign changes four things at once or it isn't one. Palette and type, the page grammar, the
   story spine, and the media.
6. **The red team before the first look.** Write five lines describing how a default AI would have built this home.
   Then put your first screen beside your step 1 screenshots and the best of step 2. If yours sits closer to step 1,
   start again before Raka sees it.

### 18B. The lead and the field

1. **Their site, opened yourself.** All 57 pages (https://tastefrankfurt.com/page-sitemap.xml), both films, the
   Konzept-Finder clicked through. Reopen every value you use from `offer.json`.
2. **Type and premium look.** Render five or more premium caterers, restaurant groups and food event companies and write
   down the faces each uses. Candidates, drop any that don't load. Käfer (feinkost-kaefer.de), Kofler & Kompanie,
   Rhubarb London, Create Food, Social Pantry, Lettice Events, Bubble Food, Searcys, Mustard Catering, Ottolenghi, Soho
   House, Ace Hotel, the 25hours hotels. Add your own finds.
3. **The art.** Within the 50 of 18A, at least 20 award level sites, weighted to food, drink, hospitality and events
   with real light, line drawing and scroll scenes. One line per site on the technique worth taking. The signature
   moment is measured against these.
4. **The rivals** in section 4, so the card can say in one line why Taste Frankfurt beats every one.
5. **Media.** Any licence checked film or photo you'll add, with its page and licence.
Record everything with its URL in `research/notes.md` in the build folder.

---

## 19. Checks before each look. Each one with a planted failure it must catch

A check that can't fail proves nothing. For every check, plant the fault (add a pill button, break a price, hide the
bar) and confirm the check fails, then remove the plant.
1. **The walk.** Scroll every page half a screen at a time at 390 and 1440. Every step has a visible enquiry action that
   isn't the header (the bar counts). Print each step.
2. **The hero.** At 1440 by 900 and 390 by 844, the share of the first screen that is their photo, film or mark, by hit
   testing. Under 25% fails, under 35% needs a reason in the card.
3. **The look.** Computed fonts against the banned list. Roman and italic mixed in a heading. Kickers above headings.
   Pill radius on buttons and links. Arrow glyphs. Soft or offset shadow boxes. Count ups. Marquees. Sections per page.
   Light and dark chapters taking turns.
4. **The sums.** A script that reads `offer.json` on its own, drives 30 random answers through the page (occasions,
   guests from 30 to 2,000, lines, places, bars), and compares its own guide band and minimum with the page, the drawer
   and the hidden fields, to the euro. Plant a wrong per head figure and watch it fail.
5. **The state.** Answers made on Home are still there on /menues/ and in the drawer on /referenzen/, and the hidden
   fields carry them. Plant a field that doesn't update.
6. **The menu.** Every line, dish, drink and dessert in `offer.json` on /menues/ as text, in both languages. Count them.
7. **The copy.** Grep the built text in both languages for dashes outside their own terms, colons in prose, emoji, more
   than one exclamation mark, the banned words, uncontracted English ("it is", "do not", "you will", "we are",
   "that is"), and "Maximale Flexibilität", "Mit Herz", "Qualität & Zufriedenheit".
8. **Overflow** at every width in section 17, after a resize too, and no German word cut across lines.
9. **Errors.** Cold load with no forced state, zero console errors, zero failed requests, every image decoded, every
   film loaded only when near the screen.
10. **axe** at three scroll points per page, both motion modes, both sizes, both languages.
11. **Reduced motion and no JavaScript.** The page still reads and still shows the menus, the guide prices and their
    cases.
12. **Lighthouse** phone and desktop, numbers in the handover.
If you have the Astra repo (`rifqiraka234-oss/astra-agency`, branch `claude/workflow-docs-update-cxm8ih`), also run
`node tools/check-build.js <folder> --action "<every Anfragen control's CSS>" --shots <dir>` for the first look and
`--sections <dir>` for the final look, on every page. It must exit 0 with every plant caught.
`python3 tools/bundle-site.py` makes the one file HTML. Passing it proves the build has none of the template tells. It
doesn't prove the build is good, BWILD v1 passed every check and still came back.

---

## 20. The build card. Fill it before any code, send A to C with the first look

**A. The visitor and the action**
1. Who lands, by role, and what they're thinking in order. The second and third visitor too.
2. The one action for each, and the CSS selector that finds every control for it.
3. The flow tables (Home and /weihnachtsfeier/), refined.
4. The one state, and how the drawer arrives filled in.
4b. The pages and the header. Each page's one job, its first photo, its section count, the home's screen count at 1440
    and 390.

**B. The idea and the feeling**
5. The feeling a buyer of a Taste Frankfurt Christmas party expects, and how the hero shows it.
6. The one idea in their own words, with its source.
7. Their mark as the hero object, which file, and how it becomes the hero.
8. The signature moment, made from their material, and the award sites rendered today it was measured against.
9. Is the art in this first build? (It must be.)

**C. The look**
10. Type. Five premium sites in the field, their faces, our pair and its licence.
11. The colour script from their material.
12. What changed from their site, in one line.
13. Every photo and film used, its id, whose it is, licence, marks and faces checked.
14. Not one item from section 15, and the checks in section 19 pass.
15. The AI default (18A step 1, how many sites, the pattern list) and the departure table (18A step 5).
16. Beyond the top 50 (18A steps 2 to 4), how many rendered, which stayed walled, the moves taken and from where.

**D. The test**
17. Screenshots beside Saavedra v3, BWILD v2 and the AI default screenshots. Would this pass for a 25,000 euro studio
    site? Would anyone screenshot it? Does it sit closer to the best of the 50 than to the AI default? Is it sleek, or
    is it everything at once? Say why, honestly.

---

## 21. What you hand back

**At the first look.** `card.md` (A to C, with lines 15 and 16), a contact sheet of the AI default sites beside your
first screen, the header and Home's first three screens at 1440 and 390, three frames of the moment, the drawer open on
a phone. Then wait.

**At the final look.** Every section of every page at 1440 and 390, both languages for Home, and the one file HTML per
page. Then wait for "final".

**On "final", one folder, zipped**, `tastefrankfurt-prototype/`, every page at its path.
```
tastefrankfurt-prototype/
  index.html  weihnachtsfeier/  menues/  referenzen/  ueber-uns/  kontakt/  404.html
  css/ js/ media/ fonts/        self hosted, licences in fonts/
  offer.json                    the data the pages read
  _headers _redirects robots.txt favicon
  research/card.md research/notes.md research/flow.md
  qa/                           the check scripts and their last output, plants included
  HANDOVER.md
```
**And the plan, its own folder**, `tastefrankfurt-plan/`.
```
tastefrankfurt-plan/
  index.html css/ js/ media/ fonts/
  plan.json        every figure and line with its source URL and the date read
  shots/           today's screenshots of their site and six from the final prototype
  _headers robots.txt favicon
  qa/              the sums test (recomputes every number from plan.json), with its plant
```
**HANDOVER.md** (one, for both sites) says, in plain words. Who it's for and the one action. What's real and what's a
Richtwert or a mock. Every photo and film used and whose it is, every outside one with its licence. Every assumption
Erik should confirm (the lead time, 3 to 4 or 4 to 6 weeks, which places they'd show, whether the guide band fits
Christmas, any dish or drink you grouped). What they'd swap in (winter footage of their own stand, a photo for any place
you left out). The check results with numbers. Anything you couldn't do.

---

## 22. The plan site

Built in step 6 with the rest of the prototype, shown in the final look, handed back as `tastefrankfurt-plan/` and
deployed by Astra as astra-tastefrankfurt-plan. A short site in English, in Astra's voice ("we"), written to Erik and
Frederik ("you"), owners who know their margins, so it never explains their business to them. Same look and copy rules
as the prototype, its own art in the same world (their night, their bulbs, their strokes). One bright chapter only, the
one that carries the argument. Graphs are controls. Every figure lives in `plan.json` with its source and the date read,
and a test recomputes every sum from that file with a planted fault it must catch. Nine chapters at most.

1. **Cover.** "Prepared by Astra for Erik Schmidt-Lange and Frederik Schreier, [month] 2026." A headline about company
   planners seeing whose parties you've cooked before anything else, a short lede, then what we found, at most four lines,
   each with its source under it, re-measured on the day you build. Where Porsche and the Städel first appear on a phone.
   The same three reasons on 17 of 57 pages. The price page with no link from the home. No customer's words anywhere
   while Naboo shows 5 from 13.
2. **Today.** Screenshots of their site taken on the day you build (the home's first screen and the screen where the
   client strip starts, phone and desktop, the price page), each captioned with what a planner sees there. Never "old",
   "outdated", "broken", "generic" or "AI", never the studio's name. It's five months old.
3. **A planner's evening.** A control. Follow one planner from a Google search for "Weihnachtsfeier Catering Frankfurt"
   through today's home and through the new one, screen by screen, to a sent enquiry. Built from their real pages.
4. **What one company party is worth.** A control, the bright chapter. Sliders for guests (30 to 300), the per head
   figure inside their published 45 to 65 € band, and the number of extra company events a season. It shows the
   turnover from their own published numbers, the 1.800 € minimum as a visible floor, and how many such events the site
   costs. Label it turnover, not profit, the defaults are examples ("move these to your own numbers"), never their own
   enquiry or booking counts. Context, with sources you reopen, companies plan Christmas parties around the 110 € per
   employee tax line, up to two events a year (IHK, https://www.ihk-muenchen.de/ratgeber/recht/arbeitsrecht/bestehende-arbeitsverhaeltnisse-kuendigung-sozialversicherung/weihnachtsfeier/ ),
   no tax advice.
5. **The build.** Six screenshots retaken from the final prototype (the hero, the mark becoming the stand, a case, the
   place scene, the guide price, the chalk board), one line each.
6. **What runs underneath.** Proposed, and chosen with you. Pages your team edits (menus, prices, photos, the Christmas
   page) without a developer. Every one of today's 57 addresses kept or redirected one to one, so the city pages and
   guides keep their search traffic. The enquiry arriving in your inbox complete, the same fields as today plus where it
   came from. Reviews from where clients already leave them, shown with permission. Your films and photos fast on a
   phone. Enquiries counted by source from the first day. Never name or judge the current studio or platform.
7. **The cost.** The figure Raka gives you (`plan.json` price_eur). Ask him in the chat before the final look, don't
   guess it. Headline "€[price] for the whole site." One price for everything in this plan, half to start and half when
   it's live. Then what's included, the site from the prototype with every moment and everything in chapter 6. Then
   "Not in the price, hosting and any paid tools, and your ad spend." No smaller option. In euros.
8. **Weeks to live.** The number of weeks Raka gives you, split into the content and the hero first, then the pages,
   the enquiry and the redirects, then the test week and live.
9. **Who builds it, and next.** The team, copied exactly as below. Then "Next, a call." with one line, "Twenty minutes
   to walk through the site and the plan and settle where to start", and an email button to Raka (leave the address as
   `RAKA_EMAIL`, Astra fills it in at deploy). The foot, "Prepared by Astra for Taste Frankfurt, [month] 2026.
   Screenshots of tastefrankfurt.com taken [the date you took them]. Each figure names its source underneath."

**The team, word for word.**
- "Astra plans and builds websites, apps and the systems around them. Astra and Amwisesa work as one team, Astra on
  strategy and project management, Amwisesa building."
- "The team has built for Unilever, Pertamina, the World Bank, Nestlé, IKEA, Panasonic, AXA, AIA, Bank Mandiri and
  Telkom."
- "Built by Amwisesa, Astra's development partner, often through the brand's own agency." (This line must always sit
  with the brand list.)
- **Raka Mulya.** "Go to market architect and entrepreneur. Your contact at Astra." "Led global ebusiness data and
  insights at Heineken across 23 markets, and ran global go to market for Betty Blocks, the low code platform. Now runs
  sales and channel operations at efficy, a European CRM company. He also founded a stroopwafel brand from nothing and
  scaled it." https://www.linkedin.com/in/raka-mulya-b92885196/
- **Joshua van Zeelt.** "Founder of Astra Agency and JML Agency." "Builds custom websites, software and apps from the
  first conversation to launch. Studied artificial intelligence at VU Amsterdam and holds an MSc in Strategic
  Entrepreneurship from RSM Erasmus. Spent seven years coordinating projects at Schiphol, where he helped develop an asset
  app that forecasts maintenance." https://www.linkedin.com/in/joshua-van-zeelt/
No photos of either unless Raka supplies them. Panasonic is in the team's brand list and is also a Taste Frankfurt
client, keep them apart, never imply a link.

---

## 23. Only for Raka, never on either site

- **The trap.** The site is five months old, built by WOLQE in May 2026 and still edited. Erik's likeliest no is "we
  only had it built in May". The prototype answers it by showing a different way to sell company events, never by
  knocking theirs.
- **Their model.** "Persönliche Beratung statt Preisrechner". The site keeps the personal offer as the finish and shows
  only their own published guide figures.
- **The price and the weeks** are Raka's. Nothing goes in plan.json until he says.
- **The delivery message, drafted, sent only by Raka** after both live links are checked. The price stays on the plan
  page, never in the message. His thread is in English.

```
Erik, here's what I offered, a Taste Frankfurt site for company events that opens on your Porsche and Städel events, with the Christmas menus and prices one tap away.

Try it yourself.
https://astra-tastefrankfurt-prototype.netlify.app

I've also written the plan behind it, with what it takes to go live and the cost.
https://astra-tastefrankfurt-plan.netlify.app

What do you think?
```
