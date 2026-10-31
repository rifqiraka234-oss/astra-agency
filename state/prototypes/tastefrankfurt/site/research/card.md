# The build card, Taste Frankfurt (filled 29 Oct 2026, the full build on direction A, 30 Oct)

Brief `BRIEF-for-builder.md` and prompt v2 from `rifqiraka234-oss/astra-agency` branch `claude/workflow-docs-update-cxm8ih`,
identical to the second zip, then Raka's notes of 30 Oct in the chat. A more exclusive face, push the design further,
no dark photo at the top, then his own brief, "it's making like a 100 euro website ... would this pass for a 25,000 euro
site". Three hero directions were sent and he picked **A, the burger**. The research for that round, 24 award level sites
and 19 Astra builds rendered on 30 Oct, is in `research/bar.md`. The rest of the research record is `research/notes.md`,
the flow tables `research/flow.md`.

## A. The visitor and the action

**1. Who lands, and what they think, in order.**
- **The company planner** (office manager, HR, team assistant, event manager at a Rhein-Main company of 30 to 300),
  booking the Christmas party now, on a work laptop or a phone, from Google. In order: have they done this for companies
  like ours, what's it like, would it work at our place, how many and what do people eat, roughly what per head and is
  there a minimum, who answers. Sources: brief section 8, /weihnachtsfeier/ FAQ, /catering-preise/, /kontakt/,
  /erik-schmidt-lange/.
- **The brand or event planner** (their Porsche, Tatort, Bosch and Messe work). Can they do 2,000 (Städel Night), several
  stations, do they look right in front of our brand.
- **The private host** (a wedding or a big birthday, weddings 95 to 180 € per head).

**2. The action, and its selector.** One enquiry for all three. Every control that opens it carries `[data-anfragen]`,
the header, the bar, the hero button that names the chosen occasion ("Weihnachtsfeier anfragen", "Plan your summer
party"), "Für euch auch" on every case, and one in every section of every page. On /kontakt/ the same form is the page.
The second visitor gets 0176 34877333 in the menu and the foot.

**3. The flow tables.** `research/flow.md`.

**4. The one state, and the drawer arriving filled in.** `anfrage = { anlass, ort, platz, flaeche, datum, uhrzeit,
gaeste, linie, speisen[], getraenke[], desserts[], bar, firma, name, email, telefon, nachricht }` in sessionStorage
`tf.anfrage`, in a try and catch, across all pages. Written by the hero occasions, the place scene, the space planner,
the guest number, the menu lines, the counter (a dish thrown onto the chalk board), every "Zur Anfrage" on /menues/, the
December string of lights, the Glühwein and cocktail bar picks and the form itself. Read by the header button, the bar
(the party, one bulb lit per answer, the time the answer is due), the chalk boards, the guide price graph and the drawer.
Field names as their live form, `Name`, `email`, `Telefon`, `Wunschdatum`, `Uhrzeit`, `Anzahl_Gaeste`,
`Ausgewaehlte_Speisen`, `Ausgewaehlte_Menues`, `Anfragequelle`, `Nachricht`, `Datenschutz`, plus `Anlass`, `Firma`,
`Platz`, `Linie`, `Bar` and a hidden `Ort` that carries the place, indoors or out, and the space ("Innenhof, draußen,
Platz ca. 6 x 4 m"). The link `/kontakt/?anlass=weihnachtsfeier` from their own site still sets the occasion.

**4b. The pages.** A header on every page, DE and EN, the enquiry button with the live state, a full screen menu on a phone.

| Page | One job | Opens on | Sections |
|---|---|---|---|
| `/` | Their burger, whose parties, their film, your place, how many and what, the price, who answers, private | their burger, cut out of 003 | 8 |
| `/weihnachtsfeier/` | Their private Christmas market at your company | 018, their office counter with fir garland | 9 |
| `/menues/` | Every line, dish, drink and dessert in their words, their guide prices | 048, their bowls | 7 |
| `/referenzen/` | Their eight cases, each a story | 045, Porsche, changing to each case | 3 |
| `/ueber-uns/` | Erik and Frederik, their region, how a day goes | 083, the team | 4 |
| `/kontakt/` | The same form, full page, for their old links | 084, their chalk board | 1 |
| `404.html` | The burger fell apart | their burger layers | 1 |

## B. The idea and the feeling

**5. The feeling.** Raka's words. "be an artist ... shapes, gradients, animations photos, GRAPHICS", "something that
they've never seen before", chic and simple, no dark photo at the top. So the page is warm and bright, bun gold, crumb
and kraft, their food large and cut out, their own film, their own events, and something you've not seen before moving
on every screen.

**6. The one idea, in their words.** "Wir kochen live bei euch vor Ort" (/weihnachtsfeier/). Their mark is a burger in
three strokes, so the site is built from their own burger. It lands bun by bun, opens along the wave of their mark, and
that wave carries their events, opens their photos and their film, and draws their region.

**7. Their mark as the hero object.** Their own Black Angus burger (photo 003) cut out and split into three layers along
the wave of their mark, three periods across, the way the mark draws a top bun, a wave and a bottom bun. Their wordmark
file `taste-frankfurt-logo-scaled.webp` sits untouched in the header, shown in their brown ink by a CSS filter.

**8. Three signature moments, made from their material.**
- **The burger.** On a sweep the colour of its bun, their burger lands bun by bun in front of LIVE, the letters filled
  with their own bowl station (048). Scrolling, the page holds while the burger steps back and opens along their wave,
  their own lines between the layers, "Live vom Plancha-Grill", "Burger aus Black Angus Beef", "Für 30 bis 2.000 Gäste".
  It turns a little with the cursor, each layer at its own depth. On a phone the burger is there from the first paint,
  cut by both edges like a product shot, and only settles, since the script often arrives late on a phone. Measured against Crav Burgers (Awwwards SOTD 13 Jun
  2026) and Shopify Editions Winter 26 (cut outs layered in depth).
- **Their events through their wave.** Porsche, the Städel, DeLonghi, DSV and Instone pass through one giant wave cut
  from the page as you scroll, each photo tilting down to their stand, a string of bulbs on its top edge, the company
  name written along its lower edge. Measured against Lando Norris (strokes and masks) and Délice (food in brand shapes).
- **Their film along their counter, and their dishes on it.** Their film F1, tone mapped from HDR, opens along the wave
  and moves frame by frame as you scroll, the line changing under it. Further down their dishes, cut out of their own
  photos, fall onto their counter in photo 075 with real physics (Matter.js), the chosen line's dishes land, the old
  ones fly off, a dish thrown onto their chalk board goes into the enquiry. Measured against Apple AirPods Pro (pinned,
  scroll scrubbed), Bruno Simon and Agrumea Farm (things that fall and settle).
- On the other pages their photos open along the wave, a string of lights catches over the Christmas opening, steam
  rises off their Glühwein urns in 098, their dishes pass in depth over "Live vom Plancha-Grill", December is a string
  of 31 bulbs you tap, their region is one string of lights from Langen through their twelve cities, and on /referenzen/
  pointing at a name brings its own event photo.
Under reduced motion every moment has a still state, the burger assembled with its three lines beside it, the photos
open, the dishes placed. Without JavaScript the burger, the photos, every word, every price and every case are there.

**9. Is the art in this build?** On every screen of every page.

## C. The look

**10. Type.** Mona Sans, variable, 800 to 900 at 75 to 78% width for the big lines, 125% for LIVE, against Fragment Mono
for figures, labels and sources, as Raka's own brief sets them. Caveat ("Tafel") only on their chalk boards. All SIL OFL
1.1, licences in `fonts/`. Ysabeau, tried on Raka's first note, is retired with his pick of A.

**11. The colour script, from their material.** Bun gold #eca852 with its light #f8d9a4 and crust #d9852a from their burger
(003), crumb #fbf4e8 and #f4e7d1, kraft #d8b585 from their boats and bowls, oak #c9a27a from their counter top (075), brown
ink #2a1709 for type. Their chalk board #1d1f1b with its frame #9a6234 only in the drawer and on the counter. The page
moves from bun gold to crumb to kraft and back to bun gold at the foot, never cream and indigo taking turns.

**12. What changed, in one line.** From a page that lists what they offer, to their own burger opening along their own
mark, their events, film and dishes carrying every screen, and an enquiry that builds itself as you choose.

**13. Every photo and film, all theirs, from tastefrankfurt.com/wp-content/uploads/2026/.** 27 of their photos and both films.
Raka's brief point 3, at least 40 percent of every screen photo, film, 3D or their mark and the opening at least 60, holds
on every screen and every half screen of every page at 1440 and 390 (`qa/imagery.js`, the same 24 by 16 grid check-build
uses for the first screen, with a plant that hides every picture). Three devices carry it. A chapter's photo stays at full
height while its words pass, on a phone as a band on top. FAQs, prices, December, the space planner, who answers and the
form sit on a panel over one of their photos held full bleed. Their three lines are a triptych of their own photos, and
the three cases without a photo sit beside their burger, cut by the edge, closing a layer for each case.
- Photos 000, 015, 018 (cropped, without the fritz-kola tray at its right edge), 041, 042 (cropped above the counter,
  without the branded spritz bottles used as vases), 043, 045, 046, 048, 049, 062, 063, 066, 075, 077, 078 (cropped,
  without the Lillet bottle), 079, 080, 083 (cropped above the Aperol bottles and the older apron mark), 084, 085, 093,
  094, 097, 098, 101, 102.
- Cut out of their photos, 003 (the burger and its three layers), 000 (Flammkuchen), 063 (Schaschlik), 073 (the dessert
  jars, cut inside the fritz-kola bottles behind them), 077 (Poffertjes), 080 (Waffeln), 085 (burger and fries), 093 (two
  bowls, cut away from the apron behind them).
- Film F1, 6.8 s from 8.0 s, the bowl station, tone mapped from HLG HDR with zscale and Hable, 68 frames as WebP for the
  scroll, 3.5 MB at 1120 px and 2.5 MB at 640 px for phones, loaded only when the section is near. Its wide opening is
  not used, it shows bottle labels and an apron with another company's mark. Film F2, the rooftop, 1.28 MB H.264 and
  0.92 MB VP9, plays only on screen, never under reduced motion or data saver.
- Zoomed for marks and dropped, 050 (fritz-kola bar mats), 070 (the older diamond mark on an apron), 047 (the Yahoo
  screen says "Hello, Havas!", Yahoo is named in text), 040 (the older mark on both Bosch counters, Bosch in text), 072
  (bottle labels on the bar), 100,
  005, 034, 086, 091. Client signs in their own event photos stay as their proof (PORSCHE on 045, DSV on 041).
- No stock on the site. The frost and the other licence checked items from the earlier rounds are retired.
- Libraries, GSAP 3.13 with ScrollTrigger (GreenSock's no charge standard licence), Lenis 1.3 (MIT), Matter.js 0.20 (MIT),
  self hosted with their licences in `js/vendor/`.

**14. Not one item from section 15, and the checks pass.** 

Every check below ran on the final build on 30 Oct, and each one has a planted fault it must catch, run in the same pass.

- **`qa/check.js`, all seven pages.** The walk to the enquiry at 390 and 1440, the copy in German and English (no dashes,
  no colons in prose, the banned words, one exclamation mark at most, contractions), overflow at 320, 360, 390, 430, 768,
  1024, 1440 and 1920 and after a resize to 320, console and network errors with every picture decoded, axe at the top,
  middle and end in both languages, both sizes and both motion modes, the page without JavaScript, and reduced motion.
  70 checks pass, 42 planted faults caught (the bar and buttons hidden, a dash and banned words planted, a heading forced
  wider than a phone, a photo blocked, an alt removed and the h1 made dark).
- **`qa/sums.js`.** 30 random parties agree with `offer.json` to the euro on the page, the chalk board and the hidden
  fields, the one state carries from Home through /menues/ to the drawer on /referenzen/, and every line, dish, drink
  and dessert is on /menues/ in both languages. Three plants caught (47 € in place of 45 €, a field that never updates,
  the Currywurst taken out).
- **`qa/imagery.js`, Raka's point 3.** Every screen and every half screen of every page at 1440 and 390, the openings 61
  to 97 percent photo, film or their mark, the least of all other screens 41 percent. The plant hides every picture and
  is caught on 31 of 31 screens.
- **`qa/contrast.js`.** Every hero word at least 4.5 to 1 against the brightest tenth of the pixels behind it, six
  occasions, both sizes, both languages, the worst 6.35 to 1. The plant, a grey pin, is caught at 1.16.
- **`_tools/hero-clash.js`.** No layer of the burger and no letter of LIVE over a hero word at any of 13 scroll steps, at
  ten screen sizes from 360 x 740 to 1920 x 1080.
- **check-build**, Astra's look gate, exits 0 on all six pages. Nothing it bans, no italic halves, kickers, pills, chips, arrows, soft shadow cards, marquees or count ups, no half screen without a way to the enquiry, and the first screens 61 to 80 percent picture at 1440 and 64 to 97 on a phone.
- **The plan.** `tastefrankfurt-plan/qa/sums.js` recomputes 20 slider positions, the findings, the price and the weeks from `plan.json`, the plant (a 1,700 € minimum) caught. `qa/copy.js` holds its 1,103 words to the same copy rules, the plant caught.

**15. The AI default, and the departure.** 12 AI built caterer sites rendered on 29 Oct (`research/notes.md` section 2).
Cream pages with a centred serif headline and an italic half, pill buttons with arrows, stock buffets under a dark
overlay, three service cards. This build opens on their own burger on bun gold, square buttons cut like the top bun of
their mark, their own photos and film edge to edge, their events through their wave, an enquiry that fills itself in.

**16. Beyond the top 50.** 24 award level sites rendered on 30 Oct with the move worth taking from each (`research/bar.md`),
beside the 47 of 29 Oct. Moves taken, a product cut out and set in giant type (Crav), cut outs in depth (Shopify Editions),
scroll scrubbed film (Apple AirPods), food in brand shapes (Délice), things that fall and settle (Bruno Simon, Agrumea),
type on a path (Agrumea).
