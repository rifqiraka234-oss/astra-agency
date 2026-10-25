# Hooft & Petiet and ReShare Living Group, handover. 25 Oct 2026, v2

For Willem Straat's team at marketing@keypro.nl, on his instruction of 22 Oct ("Please sent you message to
marketing@keypro.nl") and Raka's of 25 Oct ("wait i think we needa send a prototype, thats my thing"). Our 14 Oct opener
offered "a modernised Hooft & Petiet site and a finished ReShare site, built as one family".

**v2 replaces v1, same URLs.** Raka's note on v1, 25 Oct, it reads as a typical Claude or ChatGPT site, a 500 euro site,
information without purpose. v2 was rebuilt from the visitor and the one action, after rendering 37 premium sites online
(28 loaded). The brief, the research and the plan are in research/v2/brief.md. v1 is in git history (build/ and the
commit f71d3e2), not on the web.

## Live

| Site | URL | Pages |
|---|---|---|
| Hooft & Petiet | https://astra-hooftenpetiet-prototype.netlify.app | / , /verkoopstyling/ , /offerte/ , and /en/ , /en/sales-styling/ , /en/quote/ |
| ReShare Living Group | https://astra-reshare-prototype.netlify.app | / and /en/ |

Netlify ids, astra-hooftenpetiet-prototype c8d94385-c7d6-43a5-b5b1-9b2b88901ed3 (v2 deploy 6adddb236e15f785d213e1d2),
astra-reshare-prototype 216660cc-b644-4e72-9ed5-cf4c6ecc79d3 (v2 deploy 6adddb2f3a3b5d519badd4c1). Team SSO off on both.
noindex on every page, X-Robots-Tag header, disallow robots.txt.

## Who it's for and what it asks them to do

**H&P.** The project leader at a housing association or renovation contractor who has to move residents out for weeks.
Their questions in order, can you have my homes ready on the contractor's date, will my residents be all right, what do
you take off my hands, have you done this for a corporation like mine, what will it cost. The home page answers them in
that order and the one action sits under the first photo, an availability bar (soort woning, aantal woningen, vanaf, hoe
lang) that carries the answers into the quote form. Estate agents go to verkoopstyling with the price on screen, the
others to a quiet "ook voor" row.

**ReShare.** Someone checking the group, often a buyer who has to purchase circular. The page explains the name in their
words, then sends them through one of two doors, KeyPro or Hooft & Petiet, or to contact@reshareliving.com.

## The design language

Warm white and ink, photography carries the colour, one flat field per site (a muted dusk version of H&P's indigo, a deep
green for ReShare that nods to KeyPro's teal), no gradients. Newsreader upright for H&P headlines, Albert Sans for
everything else and light as ReShare's display face, both OFL and self hosted. Square buttons, 48px, small tracked caps.
Logo in the middle. Seven sections on the H&P home where v1 had eleven. Only their 2026 photo shoot and their best styled
rooms. Images settle in once, nothing else moves.

## Checked, 25 Oct

- Every line traced to their own pages (research/research.md). New in v2, the residents' 8 to 8,5 from an independent
  bureau is their own post of 30 Jan 2020 and is dated on the page. Cazas is "al een aantal jaren" partner in their words.
- 16 page views screenshotted at 1440 and 390, plus 320, and looked at.
- Functional, 52 of 52 locally and 52 of 52 on the live URLs. The bar prefills the quote (type, number, month as a date,
  duration), every quote step validates, Enter can't submit early, the summary shows labels, nothing is sent, the
  calculator on their prices with weeks, the package link carries size and weeks into the quote, NL and EN number
  formats, the phone menu with focus moving in and Escape, no sideways scroll at nine widths, everything visible and every
  image decoded with no JavaScript and with reduced motion. Internal links, 26 checked locally, all 200.
- axe, WCAG 2.1 AA plus best practice, clean on all 16 views.
- Copy rules over every visible word, no dashes apart from Oud-West, no colons, no banned words, contractions in English.
  The two exclamation marks and "We have" sit inside residents' and HEF Wonen's own quotes.
- Live, 46 of 46 files on H&P and 16 of 16 on ReShare match the build (assets by sha256, HTML by visible text).

## Must not ship as is

- The prototype line at the top and in the footer stays while it's a pitch.
- Photos are their own, never captioned as a person or a place. Partner logos are 8 of the 25 on their homepage.
- The 8 to 8,5 dates from 2020. Use a newer measurement if they have one.

## Sending

Gmail draft r3040318523259070641 to marketing@keypro.nl, text in state/drafted_2026-10-22-willem.md, updated for v2.
NOT SENT. The Gmail connector wraps every link in a google.com/url redirect that expires after about a day, so Raka sending
it from Gmail himself with the links pasted fresh is the clean way.

## Rebuild

`python3 build2/build.py` regenerates site-hp and site-rs from build2/ (css/site.css, js/site.js, fonts, media, every word
of copy in build.py). Serve each folder at its root.
