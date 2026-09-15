# WisTree deck — handover and open items
Live: https://astra-wistree-deck.netlify.app
Built 2026-09-15. sha256 of deployed file 8d16ca3d6ad53cbe8d313b7869701617b2278aab9622ce28f0dcde4515158a9c (37,749 bytes).

## Must be fixed before this is used for anything beyond showing Karim
1. **The comparison curve in the WKI Schnellcheck is a placeholder shape, not data.**
   It is labelled as such inside the tool and again in section 11, and it must never
   ship to a real visitor as if it were a real distribution. Until WisTree has a real
   distribution from their pilots, the honest version shows the score alone.
2. **The scoring weights are ours.** Six questions, four options, 0 to 3 each, summed
   and scaled to 0 to 100. Karim owns the framework and the deck asks him to correct
   them. Nothing about the weighting is presented as validated.
3. **noindex is set** (`<meta name="robots" content="noindex,nofollow">`). That stays
   while this is a private deck.

## Verified at build time, 2026-09-15
Four homepage links to /die-cluue-methodik/ (404), /die-wistree-methodik/ (200),
the WKI typo appearing exactly once, zero forms and zero email inputs, the Calendly
live at 200, both partner logos present, job titles conflicting across two pages,
three freemail addresses on Kontakt, and zero citation markers on the homepage.
Destatis figure taken from the primary press release, not a secondary summary.

## QA record
Cold load of the LIVE DOWNLOAD, nothing forced: 0 pageerrors, 0 console errors,
62 of 62 reveal elements fired naturally, 12 sections with real height, 10,502
characters of body text. Quiz exercised end to end, max path returns 100 / Kritisch
with the benchmark marker drawn. Single inline script block parses on the live file.
No horizontal overflow at 420px. Hero checked at 1400px and 420px after a second pass.
Visible copy: 0 em dashes, 0 en dashes, 23 contractions, no banned terms.
