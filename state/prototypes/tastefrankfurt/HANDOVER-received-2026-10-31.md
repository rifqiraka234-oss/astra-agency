# Handover, the Taste Frankfurt prototype and plan

Built by Astra for Erik Schmidt-Lange and Frederik Schreier, Taste Frankfurt, Langen. October 2026. Two folders,
`tastefrankfurt-prototype/` and `tastefrankfurt-plan/`, both static, both run from the folder with any static server and
deploy to Netlify as they are. Nothing was deployed and nothing was sent to Erik. Astra deploys them as
astra-tastefrankfurt-prototype and astra-tastefrankfurt-plan.

## Who it's for and the one action

The company planner in Frankfurt and Rhein-Main booking the Christmas party, the summer party or a reception, on a work
laptop or a phone. The one action is one enquiry, opened from every Anfragen on every page, the header, the bar, the hero
button that names the occasion, "Für euch auch" on every case and one in every section. It arrives filled in with what
they chose on the way, in their own field names, on their own chalk board.

## What's real and what's a mock

- **Real.** Every photo and both films are theirs. Every line of theirs, every dish, drink and dessert, every case and
  every price comes from their own pages (`offer.json`, read on 29 Oct). Their 24 hour answer, their lead time, their
  space figures, their twelve cities.
- **A Richtwert.** The guide price is their own band, guests times 45 to 65 € net, 40 € from for receptions and lunches,
  95 to 180 € for weddings, never below their 1.800 € minimum. Labelled "Richtwert aus unseren Preisen 2026, netto. Dein
  Angebot kommt persönlich, binnen 24 Stunden." It's never a final price, their own "Persönliche Beratung statt
  Preisrechner" stays the finish.
- **A mock.** The enquiry. Nothing is sent anywhere, the form ends on their chalk board turning round with the time the
  answer is due. On a live site it posts to the same place their form does today.

## The pages

`/` Home, `/weihnachtsfeier/`, `/menues/`, `/referenzen/`, `/ueber-uns/`, `/kontakt/` (the form full page, for their
old links, `?anlass=weihnachtsfeier` still sets the occasion), `404.html`. German first with an English switch, the same
page in both. `robots.txt`, a `_headers` with `X-Robots-Tag: noindex, nofollow` and a robots meta tag on every page.
`_redirects` keeps two of their old addresses working and answers 404 for `HANDOVER.md`, `research/` and `qa/`, so they travel
in the folder without being served. The plan folder does the same for its `qa/`.

## Every photo and film, and whose it is

All theirs, from tastefrankfurt.com/wp-content/uploads/2026/, ids as in their `media.json`. Their photos carry every
screen, as Raka's brief asks, at least 40 percent of every screen and 60 percent of every opening, measured by
`qa/imagery.js` at every screen and every half screen of every page.
- 27 photos, 000, 015, 018 (cropped without the fritz-kola tray), 041, 042 (cropped above the counter, without the branded
  spritz bottles used as vases), 043, 045, 046, 048, 049, 062, 063, 066, 075, 077, 078 (cropped without the Lillet bottle),
  079, 080, 083 (cropped above the Aperol bottles and the older apron mark), 084, 085, 093, 094, 097, 098, 101, 102.
- Cut out of their photos, 003 (the burger, and its three layers), 000, 063, 073, 077, 080, 085, 093.
- Films F1 (tone mapped from HDR, 68 frames for the scroll, the top tenth of each frame never drawn, a tent banner sits there
  in the last frames) and F2 (the rooftop).
- Dropped for marks, 050 (fritz-kola bar mats), 070 (the older diamond mark), 047 (a "Hello, Havas!" screen), 040 (the older
  mark on the Bosch counters), 072 (bottle labels on the bar), 100, 005, 034, 086, 091. Client signs in their own event
  photos stay as their proof. None of the dropped files, no uncropped original of a cropped photo and none of the film loops the scroll
  frames replaced is in
  this folder, they are kept in `_research/build/retired-media` with the working files.
- No outside media on either site. The licence checked stock from the earlier rounds is retired.
- Fonts Mona Sans, Fragment Mono and Caveat, SIL OFL 1.1, licences in `fonts/`. Libraries GSAP 3.13 and ScrollTrigger
  (GreenSock's no charge standard licence), Lenis (MIT), Matter.js (MIT), licences in `js/vendor/`.

## What Erik should confirm

- **Lead time.** 3 to 4 weeks on /weihnachtsfeier/ and 20 other pages, 4 to 6 weeks on the home and four others. The
  prototype uses 3 to 4, from their Christmas page.
- **The guide band for Christmas.** The prototype uses their general 45 to 65 € band for a Weihnachtsfeier, and 40 € from
  for receptions and lunches.
- **The places.** Büro, Innenhof, Halle, Firmengelände, Dachterrasse and Eventlocation, each with their own photo. The
  Christmas page uses their four, Eventlocation, Büro, Warenlager and Firmengelände.
- **Their own sentences with a colon in the middle** read here with a comma, "Toppings nach Wahl, Chili, Mango-Chutney",
  so the copy rules hold. Their meaning is unchanged.
- **The finish wording.** "Angefragt für [Firma]" rather than "Reserviert", since nothing is booked until they confirm.
- **Weddings.** 094 is their own Hochzeit photo. A daylight wedding photo of theirs would sit better on the private strip.

## What they'd swap in

- Winter footage of their own stand, for the Christmas page and the film section in December.
- A Bosch photo without the older diamond mark, so Bosch can join the photo stories.
- A team photo without bottles in front, so the team section can show all of it.
- A wedding photo by day.

## The checks

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

## Lighthouse

Lighthouse 12.8.2 on 30 Oct, the final build, served locally, phone at its default throttling. SEO reads 66 on every page because every page is noindex on purpose.

| Page | Phone | LCP | TBT | CLS | Desktop | Accessibility | Best practices |
|---|---|---|---|---|---|---|---|
| Home | 78 | 5.5 s | 70 ms | 0.007 | 99 | 100 | 100 |
| /weihnachtsfeier/ | 94 | 3.0 s | 0 ms | 0 | 98 | 100 | 100 |
| /menues/ | 91 | 3.5 s | 0 ms | 0 | 99 | 100 | 100 |
| /referenzen/ | 96 | 2.7 s | 0 ms | 0 | 100 | 100 | 100 |
| /ueber-uns/ | 84 | 4.0 s | 0 ms | 0 | 100 | 100 | 100 |
| /kontakt/ | 97 | 2.6 s | 0 ms | 0 | 100 | 100 | 100 |
| The plan | 87 | 4.0 s | 0 ms | 0 | 100 | 100 | 100 |

What got Home from 61 to 78 on a phone. The three faces are cut to the characters the site shows (Mona Sans 166 to 65 kB, Caveat 169 to 67, Fragment Mono 44 to 21, `_tools/subset-fonts.py`, the full files in `_downloads/fonts-full`). LIVE is drawn once from its svg into an image, a phone painted the svg pattern of their bowls slowly. Home and the Christmas page serve WebP, a phone's software renderer held the first frame for AVIF decodes. On a phone the scripts start once the page has loaded and painted, and the burger is sized by the stylesheet the way the script fits it, so nothing moves when the script arrives.

## The plan

`tastefrankfurt-plan/`, nine chapters in English, written to Erik and Frederik. Every figure lives in `plan.json` with its
source and the date read, and `qa/sums.js` recomputes every one from that file, with a planted fault it catches. The
screenshots of their site were taken on 30 Oct 2026 (`shots/`). The price is 500 € and the weeks are 4, both
Raka's. The email button reads `RAKA_EMAIL`, to fill in at deploy.

## Anything we couldn't do

- Reviews. Naboo shows 5 from 13, but the review texts weren't in the page, so the site shows no customer's words.
- The plan's "today" screenshots show their site as it was on 30 Oct. If it changes before the plan goes out, retake them.
