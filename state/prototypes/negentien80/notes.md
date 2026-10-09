# Negentien80 curtain calculator, build notes

Lead: Ramona Hendriks, co owner Negentien80 B.V. (and owner Woonwinkel Schijndel), ctc_hfHQfM3u3veSXZgS2.
Build date 2026-10-09. Netlify site astra-negentien80-prototype. Built by a sub agent from scratchpad/nudge9/build_common.md.

## What it is

A seven step curtain price calculator in Dutch for negentien80.nl, ending in a prijsindicatie incl. btw and an
appointment request routed to the nearest of their 11 full service dealers by postcode or town. An English notes panel
for Ramona and Raka sits below it. Single page, their logo, colours, type and photography.

## Client facts used, each fetched 2026-10-09 13.24 UTC by curl (200), text extracted from the raw HTML

| Fact on the page | Source |
|---|---|
| "in een zevental stappen de prijs van jouw gordijnen", for consumers too | https://negentien80.nl/n80/ (2022 timeline entry) |
| 11 full service dealers, names, street addresses, postcodes, towns, website links | https://negentien80.nl/full-service-dealers/ (names and addresses), Info hrefs on the same page |
| Their route, Advies (dealer, prijsindicatie), Inmeten (bij akkoord, by Negentien80), Realisatie (atelier), Montage (op locatie) | https://negentien80.nl/ accordion "Hoe gaat ons full-service concept precies in zijn werk?" |
| Four curtain collections and their one line descriptions, N80, N80 Basics, N80 Red Label (brandvertragend), JAB x N80 | https://negentien80.nl/collectie/ |
| Fabric photos per collection (Bordeaux-02, Krefeld-02-aangepast, Idaho-022, Nebraska-075 in DOM order under each heading) | https://negentien80.nl/collectie/ img src, mapped by DOM order to the h-tags |
| Interior photos DSC09040bw-scaled.jpg (hero), DSC04499bw-scaled.jpg | https://negentien80.nl/ homepage slider (data-lazyload) and page images |
| Logo Favicon-NEGENTIEN80-1-aangepast.png (header logo on their site, all five logo slots use it), favicon cropped-...-32x32.png copied byte for byte | https://negentien80.nl/ q_logo block |
| Footer, Molendijk-Zuid 18, 5482 WZ Schijndel, +31 (0) 73 205 40 03, info@negentien80.nl | footer on every page |
| Brand, black #000 and white, off white #f8f8f7 section ground, greys #777 and #d4d4d4, Space Grotesk 400 with uppercase small labels | style_dynamic.css (Space Grotesk 13x, weight 400, uppercase 9x), post-13665.css (#f8f8f7), homepage render |

Discrepancy flagged, not resolved. Snoeijen Luijten. The dealers page says "Snoeijen Luijten Interieur, Kapelstraat 65", the
N80 Full service page says "Snoeijen Luijten Interieurwerken, Kapelstraat 63". The build shows the dealers page version
(the page the brief named). PDOK resolves Kapelstraat 65, 5591HD Heeze as a real address. Ramona should confirm.

The old calculator. web.archive.org reset the connection twice at 13.27 UTC (the capture URL and the root), example.com
returned 200 through the same curl path in the same minute, so that's our failure. Not retried further per the brief.
Step structure taken from the 30 Sep gate note (state/drafted_2026-09-30-evening-accepts.md line 39, "choose code, plooi,
rail, zoom, sizes, Totaal incl. btw, Plan inmeetafspraak") plus the teardown below. Fabric code names were NOT used. The
image file names hint at fabric names (Bordeaux, Krefeld, Idaho, Nebraska) but a filename isn't a claim on their page, so
the page uses the collection names only.

## Public numbers on the page

1. CBS StatLine 83693NED, "Consumentenvertrouwen, economisch klimaat en koopbereidheid; gecorrigeerd", series
   GunstigeTijdVoorGroteAankopen_8 (saldo positive minus negative answers), Jan 2024 to Sep 2026. Table modified
   2026-09-22T06:30. Pulled from https://opendata.cbs.nl/ODataApi/odata/83693NED/TypedDataSet on 2026-10-09. Sep 2026
   is -35, the low is -45 in May 2026, and every month from Jan 2024 to Sep 2026 is negative (smallest gap -26 Dec 2025).
   Shown in the English panel as "points more people call it a bad time than a good time" so no minus signs are needed.
2. 21% btw. https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/zakelijk/btw/tarieven_en_vrijstellingen/
   "Het algemene btw-tarief is 21%." Confirmed twice, WebFetch and curl raw HTML grep, 2026-10-09.
3. Map. CBS gebiedsindelingen 2024, provincie_gegeneraliseerd, via PDOK WFS, CC BY 4.0. Dealer positions from PDOK
   Locatieserver (address lookups, all 11 resolved, two to the A suffix of the same number, Busselbundersweg 1A and
   Marktstraat 5A). Postcode fallback table, CBS postcode4 2024 via PDOK WFS, 4,071 areas, centroid of the largest polygon.

## Teardown (rendered in Chromium 2026-10-09, fold plus full page plus a runtime fingerprint, screenshots in scratchpad n80b/tear)

18 pages from 15 sites rendered and looked at. Not rendered, auping configurator (502 through our proxy), karwei.nl, gamma.nl,
voordeelgordijnen.nl (429 to curl_cffi), raamdecoratie.com and luxaflex.nl (403). dealers.sunway.nl is a dealer login, not a
locator.

| Site | What it does well |
|---|---|
| Kwantum product page (kwantum.nl/gordijn-doris-naturel-4324198) | "al vanaf 21,50" per metre price up front, one orange "Maak op maat" button, home measuring and fitting named next to the price |
| Kwantum op maat configurator (op-maat.kwantum.nl) | Six numbered steps in the page head, materiaal, maakwijze, afmetingen, verdeling, afwerking, samenvatting, and a "v.a." price on every fabric tile |
| Kwantum gordijnen op maat guide | Long buying guide with stepwise measuring help and price examples, teaches before it sells |
| Leen Bakker gordijnen op maat | Category opens with service tiles, "Advies en inmeetservice, Maak hier een afspraak", so booking sits beside the fabrics |
| Praxis maatwerk | Shows its in store configurator kiosk in the hero photo, the tool itself is the promise |
| Vadain homepage | Wholesale curtain brand that sells via dealers, "Sampleservice" and "Verkooppunten" are the two highlighted nav buttons |
| Vadain verkooppunten | "Vind een winkel in jouw buurt", postcode or plaats field, collection filter checkboxes, map beside the search |
| Vadain confectie guide | Names every pleat (enkele, dubbele of vlinderplooi, triplooi, retourplooi, wave, ringen) with a photo each, the vocabulary a Dutch shopper expects |
| Sunway | Dutch window brand, film hero and collection grid, dealer network behind a login rather than a public finder |
| Montis 3D configureren | Line drawn sofa modules on a flat brand colour as the hero, configuration as a design act |
| Montis dealers | Location field plus dealer type checkboxes, results list with km and a world map of pins |
| Pastoe store locator | Split screen, list on the left, dark map on the right, physical stores and web shops toggle |
| The Shade Store custom drapes | "Prices from $545" on each style, three equal buttons, swatches, free measure, design consult |
| Loom Decor pinch pleat drapery | Every option inline on the product page, panel type as pictograms, width, length, fraction, lining, room label, price on top |
| Hillarys curtains | "How our service works" strip, browse and free samples, book a local advisor, they measure and fit |
| Hillarys arrange an appointment | Four step stepper (products, address, date and time, contact), product tiles as line icons, a "what to expect" panel beside the form |
| JAB Anstoetz curtains | The fabric house Negentien80 works with, large editorial fabric photography, restrained type |
| Apple buy MacBook Air (NL) | Sticky product image, option groups stacked as you scroll, "Model. Kies je formaat." two tone headings, price delta on each card, total at the end |
| Dunelm curtains | Made to measure as one entry in a long category list, a reminder that a lone tool gets buried |

What carried into the build. A step index the shopper can see before starting (Kwantum), a sticky live preview with stacked
option groups and a running total (Apple, Loom), pleat names in the Dutch trade vocabulary with a picture each (Vadain),
postcode or plaats search with a map and a ranked list with km (Vadain, Montis, Pastoe), and a "what happens next" route next
to the booking form (Hillarys).

## Art direction (written before the HTML)

- Their marks. The N80 logo file, black on white, inverted with a CSS filter on the dark panel. Space Grotesk 300 to 500 from
  Google Fonts (their typeface), IBM Plex Mono for measurements and the ticket (our grammar). Black, white, #f8f8f7, #d4d4d4
  from their CSS. One linen tone sampled from their own N80 fabric photo (mean #9a8f72), used for marks only, never for text.
- Metaphor from their world. A maatbrief, the workroom ticket a confectie atelier works from. The summary under the preview is
  that ticket, and the appointment request sends it to the dealer. Mono type, hairlines, numbered rows.
- Signature scene. A live SVG of a window and their curtain, drawn from the shopper's own inputs. Width and height set the
  proportions, the collection sets the fabric (their photo as the cloth), the pleat sets the heading and the hem line, the
  lining sets how much light comes through, the plooifactor sets the number of folds, the rail draws as ceiling rail, wall
  rail, rod with finials or a dashed existing rail, the length option lifts, touches or pools the hem. A slider opens and
  closes the curtains.
- Rhythm. Photo hero, white route section, off white calculator, white price, white appointment with a linen map, black English
  notes, off white footer.
- Every section carries a visual. Hero photo, route diagram, live preview plus option drawings and fabric photos, cost bar,
  map, CBS chart.

## Price model (all example figures, labelled on the page as voorbeeldprijzen)

All in integer cents and tenths of a metre so rounding is exact.

- Fabric metres. Per panel, rail width / panels x plooifactor + 10 cm side hem. Finished length = height input + length
  option (1 cm above floor -1, on the floor 0, pooling +5). Up to 290 cm finished length it's room height fabric, metres =
  total width rounded up to the next 10 cm. Above 290 cm it's banen of 140 cm (137 cm usable), banen per panel rounded up,
  metres = banen x (finished length + 25 cm), rounded up to 10 cm.
- Lines. Fabric, making, lining and hem are metres x price per metre. Rail is rail width rounded up to 10 cm x price per metre.
  Measuring and fitting is one fixed EUR 95. Total incl. btw. Btw share = total x 21/121, rounded to the cent.
- Example prices per metre, collections N80 34,95, Basics 39,95, Red Label 49,95, JAB x N80 69,95. Making, enkele plooi 12,50,
  dubbele plooi 15,00, wave 17,50, ringen 19,50. Lining, lichtdempend 14,95, verduisterend 19,95. Rail, plafondrail 29,95,
  wandrail 34,95, roede 44,95, eigen rail 0. Hem, loodveter 0, zoom van 10 cm 3,50.

## QA results (local http server, then live)

- Cold load, nothing forced, 1440 and 390. 0 page errors, 0 console errors or warnings, 0 failed requests, 0 responses >= 400.
  7 of 7 img elements decoded (logo twice, hero, four fabric photos), plus 4 fabric tiles inside the SVG.
- Script parse. `node --check` on the inline script of the local file and of the downloaded live HTML, both OK. One syntax
  error was caught by the cold load during the build (a string concatenation slip) and fixed before deploy.
- Overflow. scrollWidth equals clientWidth at 390 and 1440. A long URL in the English list overflowed at 390 in round one,
  fixed with link text and overflow-wrap.
- Three input sets typed and clicked through the UI, read back, each matching a hand calculation to the cent.
  A defaults (N80, 300 x 260, 2 panels, enkele plooi, no lining, 2,0, plafondrail, loodveter, 1 cm above floor) EUR 479,04, btw 83,14.
  B (JAB x N80, 420 x 275, 1 panel, wave, verduisterend, 2,5, roede, zoom 10 cm, pooling) EUR 1.459,33, btw 253,27, and the
  "wave hangt aan een rail" hint shows.
  C (Red Label, 250 x 310, 2 panels, dubbele plooi, lichtdempend, 2,0, wandrail, loodveter, on the floor) switches to 4 banen,
  13,4 m, EUR 1.253,04, btw 217,47.
  D (Basics, 180 cm plus two +10 clicks = 200, 240, ringen, roede, 1,8) EUR 410,81, btw 71,30, checked by hand after.
  E (width 20, then blur) shows the error while typing and restores 300 on blur.
- Dealer finder, 10 inputs. Positive control 5481 EH (De Woonwinkel's own postcode) returns De Woonwinkel at under 1 km.
  1017 Contempera 1,4 km (PC4 table, no PDOK call). Utrecht Studio Uijterwaal 23 km. 9711 AB Studio Uijterwaal 139 km.
  Eindhoven Snoeijen Luijten 11 km. 's-Hertogenbosch Luxx Living Studio 2,4 km. 5402 Chapter One 1,6 km. xyzqq gives the
  not found message and the form stays locked. With api.pdok.nl blocked, 5481 EH falls back to the PC4 table (1,5 km) and
  Uden falls back to the dealer town list. All rerun against the live URL, same results, so PDOK CORS works from netlify.app.
- Form. Empty submit shows three errors. Filled submit shows the confirmation with the maatbrief and "Concept, er is niets
  verstuurd". Nothing is sent or stored.
- Screenshots of every section at 1440 and 390, looked at, round by round (v2 to v9 plus live). Fixes made from looking. The
  preview read as a woven blind (texture scale, fold count, weak shading), card names wrapped badly, lining icons blew up on
  phones, the map was unreadable in a narrow column, the hero card first landed on the text, its label was white on white,
  the English source note and the footer note had the wrong size or width.
- Phone price bar. Shows a live mini drawing and the total while the calculator is on screen, hidden at the hero and at the
  price section.
- NO-AI-SLOP section 8 grep (script extracted from docs/NO-AI-SLOP.md) over the visible text, after a search, a hint state,
  a banen state and a submitted form. Banned words none, phrases none, hedges none, paired adjectives none, uncontracted none,
  em dashes none, emoji none, exclamation marks 0. Over the raw HTML the only hits are CSS and SVG `transform` and JS `!`.
  Sentence length stdev isn't meaningful on a UI made of one word labels.
- Colon and dash audit over 375 unique visible lines (plus alt, aria, placeholder, title, option text, SVG text). 0 colons,
  0 dash characters. Allowed proper nouns and addresses, Molendijk-Zuid, 's-Hertogenbosch, Net Iets-Anders, Noord-Brabant,
  Overtoom 135-137. Control strings, the detector caught 1 of 1 colon and 4 of 4 dash forms (hyphen, en, em, minus).
  The stepper minus glyph was replaced by a drawn icon so no minus sign remains.
- English contractions 5 (it's x2, That's, doesn't, nothing's).
- Static rules. One self contained index.html with inline CSS and JS, meta charset utf-8, favicon (their own file), no
  scroll-behavior smooth, 0 inline grid styles, every grid track minmax(0,1fr), noindex.
- Links opened. Every external href and dealer website fetched. Chapter One's listed /nl URL is a 404 on their side, so the
  root from the N80 Full service page is used. tozwinkel.nl failed certificate checks over https from our side and forwards
  to tozliving.com over http, so tozliving.com is used (confirmed Toz Living, Weijen 24 Nistelrode). netiets-anders.nl is
  behind Cloudflare to our Chromium, 200 through tools/fetch-walled.py as Safari, title "Woonwinkel | Net Iets-Anders".
  vevloeren.nl titles itself "JB Vloeren Boxtel" but its text names Van Eijndhoven Vloeren, Industrieweg 23 Boxtel.
  The CBS StatLine link renders the table "Consumentenvertrouwen, economisch klimaat en koopbereidheid; gecorrigeerd".

## Dealer data corrections made, for Ramona to confirm

1. Snoeijen Luijten. Dealers page says Kapelstraat 65. Their own site (interieurwerkopmaat.nl footer and /contact/) and the
   N80 Full service page say Kapelstraat 63. The tool uses 63 (PDOK resolves 63a, a few metres from 65).
2. Chapter One. Dealers page link https://chapterone.nl/nl returns 404. Tool uses https://chapterone.nl/.
3. Toz Living. Dealers page link https://www.tozwinkel.nl/. Tool uses https://tozliving.com/. Not claimed anywhere on the
   page that their certificate is broken, only that the old domain forwards.
The page itself only says, in the English notes, that the tool follows the dealer's own website where the two lists differ.

## Live

- URL https://astra-negentien80-prototype.netlify.app
- Netlify site id 186fe2d9-731d-4e87-9e0d-a3f4bdd59595, deploy id 6ac8f765b353570b875b781e (state ready), team SSO off,
  password off (set after deploy, confirmed in the update response).
- index.html sha256 b6699e7cc4364b0f2aebcac22755afaa096df9889cb75a28c07e8506c1fc84aa, 157,297 bytes. Live HTML fetched
  unauthenticated is byte identical (same sha256, 0 diff lines, no HUD injected). 12 of 12 assets 200 and byte matched,
  hashes in build/asset-sha256.txt. build/build.py reproduces the shipped index.html byte for byte.
- Live cold load in Chromium at 1440 and 390, 0 page errors, fonts loaded, input sets A to C match, dealer finder works.

## Must not ship as is (everything labelled example, plus assumptions)

1. Every price. Fabric per metre per collection, making per pleat, lining, rail, hem, and the EUR 95 measuring and fitting fee.
2. The calculation assumptions. 290 cm room height limit, 140 cm banen (137 usable), 10 cm side hem per panel, 25 cm cut
   allowance, rounding up to 10 cm, plooifactor range 1,5 to 3,0 with 2,0 default.
3. The option sets and their one line descriptions. Pleats (enkele, dubbele, wave, ringen), linings (geen, lichtdempend,
   verduisterend), rails (plafond, wand, roede, eigen), hems (loodveter, zoom 10 cm), lengths. These are trade standard
   choices, not Negentien80's confirmed range. Same for the two hints (wave on a rail, ringen on a roede).
4. "Inmeten en montage zitten altijd in je prijsindicatie" is our assumption about their consumer pricing.
5. The route copy paraphrases their homepage (Advies, Inmeten, Realisatie, Montage) and "Na je akkoord meten wij in, maken we
   je gordijnen en hangen we ze op" follows their homepage and N80 Full service text. Ramona should confirm that's the
   consumer flow too.
6. "Je kleur kies je straks samen met de dealer, met de stalen in de hand" leans on their dealer sample service.
7. The appointment form sends and stores nothing. It needs wiring to each dealer, consent and privacy wording, and the
   preference options (doordeweeks overdag, avond, zaterdag) are ours.
8. The three dealer data corrections above.
9. The noindex tag, the "Concept door Astra" tag, the concept lines and the English panel come off at launch.
10. The window drawing is an illustration built from their fabric photos, not a render of a specific fabric or colour.

## Not verified

- The old calculator's real seven steps and fabric codes. web.archive.org reset the connection (twice, control 200). Steps
  were designed from the teardown and the 30 Sep gate note instead.
- Net Iets-Anders' address on its own site (the homepage text didn't show it). Its identity is confirmed by the title.
- tozwinkel.nl's certificate. Only seen failing from our side, so nothing is claimed about it.
- Tested in Chromium only. No Safari or iOS run. No Lighthouse run.
