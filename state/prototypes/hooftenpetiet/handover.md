# Hooft & Petiet and ReShare Living Group, handover. 25 Oct 2026

For Willem Straat's team at marketing@keypro.nl, on his instruction of 22 Oct ("Please sent you message to
marketing@keypro.nl") and Raka's of 25 Oct ("wait i think we needa send a prototype, thats my thing"). Our 14 Oct opener
offered "a modernised Hooft & Petiet site and a finished ReShare site, built as one family". This is that, built and live.

## Live

| Site | URL | Pages |
|---|---|---|
| Hooft & Petiet | https://astra-hooftenpetiet-prototype.netlify.app | / , /verkoopstyling/ , /offerte/ , and /en/ , /en/sales-styling/ , /en/quote/ |
| ReShare Living Group | https://astra-reshare-prototype.netlify.app | / and /en/ |

Netlify ids, astra-hooftenpetiet-prototype c8d94385-c7d6-43a5-b5b1-9b2b88901ed3 (deploy 6addc73eac3224c7e3fc5418),
astra-reshare-prototype 216660cc-b644-4e72-9ed5-cf4c6ecc79d3 (deploy 6addc7541ec60705edf2e854). Team SSO switched off on
both. noindex on every page, X-Robots-Tag noindex header and a disallow robots.txt.

## What it is

**Hooft & Petiet, one idea, "alleen de koffer nog uitpakken"** (Brenda de Wilde, their Cazas page).
1. Hero. Their house mark, lime roof and square with the ampersand, opens as you scroll into a full bleed room of theirs.
   "Wij maken van elke woning een thuis." ends on "Direct bewoonbaar, zodra de sleutel omgaat."
2. Why now. 180.000 corporatiewoningen still on E, F or G at the end of 2022, all to go by 2028 (Volkshuisvesting
   Nederland). A day and night bar shows logeer, rust and wissel, keyboard tabs.
3. An SVG floor plan of an empty home furnishes itself in their own four steps as you scroll, and ends with a suitcase in
   the hall and "Alleen de koffer nog uitpakken."
4. Brenda's quote, their photo strip, beheer in three pillars, the projects as a log (Portaal 570, HEF Wonen 12 of 45,
   Stadgenoot, Cazas) with Danny Mooren's and Thierry Farla's quotes, seven service bands, the partner marquee, a band
   handing over to ReShare, MVO, and a lime close with a starter form that carries type and number into the quote page.
5. Verkoopstyling, a price calculator on their own published prices (2.150, 2.549, 3.150, 3.550, 250 m² op aanvraag,
   plus 99,99 per week), and a gallery of their own styling photos.
6. Offerte, a three step quote request on their real form fields (the ten project types, stijl, personen, ruimten,
   datum, oppervlak, the seven pakketten) with a review step. It sends nothing and says so on the page.

**ReShare, one idea, "meubels meerdere levens geven"** (their mission).
1. Re, Share and Living explained in their own words, KeyPro's teal ring orbiting behind.
2. A loop scene, one sofa round the circle through magazijn, logeerwoning, expatwoning, verkoopstyling and on again, the
   life counter going 1 to 4. Labelled on the page as an example.
3. Why now (EEB 10 million tonnes, 50% circulair inkopen in 2030 as KeyPro words it, 2028), Willem's quote from the
   launch, the two companies side by side, group figures, one way of working, their five mission points, contact.

Every fact and its source is in research/research.md. The art direction and the 50 site teardown are in
research/art-direction.md and research/teardown/.

## Checked, 25 Oct

- Copy traced phrase by phrase to the crawl of their own pages. Three lines did not trace and were rewritten (a
  "sleutelpunt" for the projectwoning, a "binnen een werkdag" reply time on the quote page, "uw bestaande meubilair").
  Group figures attributed where they came from, the 2 vestigingen are KeyPro's, Utrecht is H&P's, so it reads 3 steden.
- 16 page views screenshotted at 1440 and 390 and every frame looked at, twice, after two rounds of fixes.
- Functional, 42 of 42 pass. Starter form to quote with prefill, every quote step and its validation, the summary, the
  no send, zero non GET requests, the price calculator at every size and with weeks, NL and EN number formats, the tabs
  by keyboard, the phone menu and Escape, 32 internal links 200 and every anchor present, no horizontal overflow at 320,
  360, 390, 414, 768, 1024, 1280, 1440 and 1920, and everything visible with no JavaScript and with reduced motion.
- Every image decodes after a scroll, with and without JavaScript, 64 on the H&P home, 10 on verkoopstyling, 10 on ReShare.
- axe, WCAG 2.1 AA plus best practice, clean on 12 views after fixing small source text contrast, the footer language
  switch, heading order and the prototype pill's landmark.
- Copy rules over all visible text, no dashes apart from Oud-West, no colons, no banned words or phrases, contractions in
  every English page. The one exclamation mark is Thierry Farla's own.
- Live, 80 of 80 files on H&P and 29 of 29 on ReShare verified (assets by sha256, HTML by visible text, since Netlify
  rewrites HTML), cold render of 6 live pages at both widths with 0 errors and 0 broken images.

## Must not ship as is

- The prototype pill and the footer line say this is a prototype by Astra agency. Keep them while it's a pitch.
- Photos are their own, taken from hooftenpetiet.nl, never captioned with a person or a place. The partner logos are 23
  of the 25 on their own homepage (BNS and HomePlan not used), shown under "Onze partners" as their homepage does.
- The 180.000 is a 2022 figure and is dated on the page. Refresh it from the Aedes benchmark before a real launch.

## Sending, and the Gmail link problem

The email to marketing@keypro.nl is a Gmail draft, id r3040318523259070641, text in state/drafted_2026-10-22-willem.md.
NOT SENT. The Gmail connector rewrites every link it writes into a google.com/url redirect with a ust stamp about 24
hours ahead, in the stored draft and in what it sends. Proven 25 Oct on the raw MIME of the 08.51 UTC meeting brief and on
the 9 Oct Acquitas reply, where our link is wrapped and the links quoted from Kyson's mail are not. After the stamp passes,
a click shows Google's redirect notice first. So this email is best sent by Raka from Gmail itself with the two links
pasted fresh, or the links go on LinkedIn to Willem instead.

## Rebuild

`python3 build/build.py` regenerates site-hp and site-rs from build/ (css, js, fonts, media, and every word of copy in
build.py). Serve each folder at its root, the pages use absolute paths.
