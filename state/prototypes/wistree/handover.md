# WisTree deck — handover and open items
Live: https://astra-wistree-deck.netlify.app
Restructured 2026-09-15 (v2). sha256 of deployed file
6cf41043f20768cede67eea974d53ce2ac98d8ec9c75ef5aae820d4356e99bd9 (34,455 bytes).
v1 was 8d16ca3d6ad53cbe8d313b7869701617b2278aab9622ce28f0dcde4515158a9c (37,749 bytes).

## Why v2 exists
v1 was built before checking it against the thread. Karim asked about the scale he is
building (a first indication of knowledge fragility plus a comparison against similar
companies), and what we promised him was a short deck on that. v1 opened with three
sections of site audit he never asked for, and only reached the scale in section 7.
v2 puts his own sentence first and demotes the site findings to an appendix, framed as
something noticed while researching and given free whether or not anything follows.

## Structure, v2
Hero, then:
1. Your order, not ours. His quote, split into the two jobs it contains.
2. How we would approach it. Three design calls, plus the Destatis figure.
3. Der Schnellcheck, gebaut. The working six question tool.
4. The comparison half. WiMa·Check comparison, why the benchmark is the defensible half.
5. Then step two. The three sketches bridging Schnellwert to the real WKI.
6. Next step. One ask, are these the right six questions.
Anhang. The seven site findings, free.

Cut from v1: What we looked at, What is strong, The problem in one line, The move,
Why us (the credential folded into section 6 instead).

## Must be fixed before this is used for anything beyond showing Karim
1. **The comparison curve in the WKI Schnellcheck is a placeholder shape, not data.**
   It is labelled as such inside the tool and again in section 6, and it must never
   ship to a real visitor as if it were a real distribution. Until WisTree has a real
   distribution from their pilots, the honest version shows the score alone.
2. **The scoring weights are ours.** Six questions, four options, 0 to 3 each, summed
   and scaled to 0 to 100. Karim owns the framework and the deck asks him to correct
   them. Nothing about the weighting is presented as validated.
3. **noindex is set** (`<meta name="robots" content="noindex,nofollow">`). That stays
   while this is a private deck.

## Still outstanding
Karim was asked "anything you'd want it to steer clear of?" and has not answered. This
deck has not been sent and must not be sent without Raka's explicit go.

## Verified at build time, 2026-09-15
Four homepage links to /die-cluue-methodik/ (404), /die-wistree-methodik/ (200),
the WKI typo appearing exactly once, zero forms and zero email inputs, the Calendly
live at 200, both partner logos present, job titles conflicting across two pages,
three freemail addresses on Kontakt, and zero citation markers on the homepage.
Destatis figure taken from the primary press release, not a secondary summary.

## QA record, v2
Cold load of the LIVE DOWNLOAD, nothing forced: 0 pageerrors, 0 console errors beyond
the Netlify HUD script 404ing when served locally, 44 of 44 reveal elements fired
naturally, 8 sections. Quiz exercised end to end, max path returns 100 / Kritisch with
the benchmark marker drawn. Single inline script block parses on the live file. No
horizontal overflow at 420px, tables scroll inside their own containers. Every section
screenshotted at 1400px and the hero at 420px.
Visible copy: 0 em dashes, 0 en dashes, 0 colons, 23 contractions, no banned terms.
Live file diff against the deployed file is 720 bytes of Netlify HUD markup only.
