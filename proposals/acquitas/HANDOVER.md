# Handover: Acquitas Partners proposal

Two-page A4 proposal for Kyson Charles, Acquitas Partners. Files: `proposal.html`, `proposal.pdf` (2 pages), `img/concept-site.png`, `img/value-calculator.png`, `page-1.png`, `page-2.png`.

## Changes since the first version (9 October, per Raka's note)

1. "How we build it" on the website now says up to two rounds of changes are included. Wording is Raka's, exact.
2. The hosting sentence is removed. Nothing in the proposal mentions hosting, a hosting price or the platform the site runs on (grep for "hosting", "netlify", "platform" returns nothing).

## Correction to the first version

The first version I handed over said both pages were clean. That was wrong. Measured in Chromium, page 1 overflowed its 297mm height by about 700px and page 2 by about 340px. The overflow was clipped, so the concept screenshot, the "How we build it" text and the last rows of the options table were cut off in the PDF. The PDF still counted two pages, which hid the problem.

Fixed by tightening type and spacing, making the "What's included" list two columns as the brief specifies, placing the website screenshot beside its "How we build it" text, cutting the summary heading, and shortening some copy (the brief allows shortening). Options table descriptions are now one line each, as the brief specifies. Both pages now end inside the page with the bottom margin intact (measured: page 1 ends at 1091px and page 2 at 1090px of 1123px).

## Checks

- **Site recheck (3.1):** no "Kyson" on the home or about page; "achieve better exits" absent. Both sentences used as the brief allows.
- **Screenshots (3.2):** concept site shows the Acquitas hero; value calculator shows the sliders and the £9.7m to £12.6m range. Both viewed.
- **PDF page count (3.5):** 2.
- **Page visuals (3.5):** both pages viewed after the fix. Nothing cut off, prices aligned, illustration labelled "ILLUSTRATION".
- **Banned words, phrases, hedges, paired adjectives (3.6.1):** the section 8 grep returns none. Uncontracted verbs: none.
- **Colons (3.6.2):** none in visible text except in email and web addresses.
- **Dashes and hyphens (3.6.3):** none in visible text. Checked by Unicode code point, since a bash bracket match gave false positives on the euro sign.
- **Contractions (3.6.4):** 28 distinct, well over the minimum of 10.
- **Jargon (3.6.5):** none of the banned words from brief section 1.
- **Numbers (3.6.6):** every number is a fact, a price, a date, a step number or a clearly marked example (the "22 years" and "35 staff" in the illustration card).
- **Other rules:** no emoji, no exclamation marks, no dashes in prose, no development team location, no revision count beyond the two rounds Raka approved, no testimonials or results.

## Not done

- Nothing outward was sent. Nothing was pushed to any lead.

## For Raka to decide

- The "Your new website" price, €2,500, is shown as "half to start and half at launch" in the summary. That split came from the brief, not from the call notes. Please confirm it.
- The illustration card's content is fictional. It is labelled as an example on the page.
