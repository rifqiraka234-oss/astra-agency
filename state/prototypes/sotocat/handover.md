# SotoCat, handover. 2026-09-23

Two artefacts, both live and verified.

| | URL | Netlify site id | Deploy id |
|---|---|---|---|
| Website prototype | https://astra-sotocat-prototype.netlify.app | aae9b53e-9667-4099-84a8-fce834168dcc | 6ab39016e4c6abd1fc590595 |
| Analysis deck | https://astra-sotocat-deck.netlify.app | d84ecf40-3f06-4170-b93f-4d59f64d0928 | 6ab39cedd52989def176cb26 (section 10 rebuilt, bios rewritten 2026-09-23) |

Both projects were created with team SSO on by default, which would have locked Sergey
out. It was switched off on both, matching astra-wistree-deck.

Source is in this folder, `site/` and `deck/`. The site pages are assembled by a small
build script from shared header, footer and page bodies, then committed as finished HTML,
so what is here is what shipped.

## How it was verified

- Every page rendered cold at 1440 and 390 in Chromium. Zero page errors, zero console
  errors, no horizontal overflow, every image decoded. `tools/deck-qa/qa.js` on both, site
  15 of 15 images, deck 21 of 21 images and 75 of 75 reveals.
- Every interactive part exercised end to end, first locally and then on the live URL.
  The demo plays all six stages, pause holds, rail and replay work, the calculator sums
  check by hand, the pricing input hits all eight brackets, the three step trial blocks
  bad input, and all four forms validate and confirm.
- Live check. Every asset byte matches the deployed file. The site HTML differs only by
  Netlify's pretty URL rewriting (index.html links become /, attribute quotes normalised),
  and the visible text of all ten pages is identical to the build. Live scripts parse.
  /pricing and /pricing.html both return 200, and a random path returns the designed 404.
- Portrait. `tools/verify_portraits.py` PASS. The shipped `img/sergey.jpg` (sha256 6c580ce3...)
  byte matches SotoCat's own photo of Sergey inside his card on sotocat.com/team, re
  encoded with the tool's own settings. The tool was run on the page body, because the
  first hits for the surname sit in the page's meta tags rather than a card.
- Copy. Zero banned words or phrases from NO-AI-SLOP, zero colons, em dashes, en dashes and
  hyphens in visible text, zero exclamation marks, 113 contractions on the site and 34 in
  the deck. The only uncontracted verbs are inside Sergey's verbatim quote and his post titles.

## Must change before the site goes live

1. **Forms.** Start trial, sign in, contact, contractor join and landlord early access show
   their confirmation screens but post nowhere. Point them at SotoCat's portal, Stripe and
   CRM. The confirmation copy promises an email, so that has to be true once wired.
2. **Landlord survey button.** It links to https://sotocat.com/ because today that is where
   the survey card opens. Swap it for the survey plugin's own trigger on the new site.
3. **Terms of use.** The current terms name PropCat Limited, 15785231. They need to name
   SotoCat Limited, 17067432. The new footer already carries the right company details.
4. **Remove `noindex, nofollow`** from every page.
5. **og:image** points at the Netlify domain. Change it to sotocat.com on launch.
6. **App links.** None are on the site, because /apps/ says the app is still coming. Add
   the App Store and Google Play links when it is out.
7. **Analytics.** The site sets no cookies and loads nothing third party, and the FAQ now
   says so. If analytics goes back on, it has to wait for consent and that FAQ line changes.

## Carried over from SotoCat's own site, and they should confirm

- The compliance answer in the FAQ, cross referencing tenancy agreements against current
  regulation such as the Landlord and Tenant Act. From their FAQ.
- "SotoCat encrypts the data it holds". Their FAQ says end to end encryption and GDPR
  compliance. Softened, not dropped.
- Video guides. Their FAQ points to a Guides section, and /guides/ is a 404 today.
- Billing details at sign up, then 90 days free. Their FAQ describes a billing page step.
- Onboarding and staff training included in the fee. From their FAQ.
- "No minimum term" is derived from their "Cancel anytime".
- The calculator keeps their own 50% assumption, now shown as a setting the visitor can
  change. It is SotoCat's figure, not ours.

## Deliberate choices a reviewer should know about

- **Removed the 70%, 50% and 95% headline numbers.** No source exists on the site. The facts
  strip uses things that are true today, 7 steps, 24/7 reporting, 90 days free, £1.65 a unit.
- **Steps 4 and 7 are tagged "coming in a future release"**, matching SotoCat's own
  "introduced in future iterations".
- **Demo data is made up and labelled** inside the artefact. Amira K., Flat 3, 41 Arlington
  Road, Okafor Plumbing, Northside Heating, K and M Services, Bramwell Plumbing, Hannah.
- **The landlord survey questions were not used.** The plugin's config is marked
  confidential, so only the public card text appears anywhere.
- **Their FAQ contradictions were fixed**, 30 against 90 day trial and "launch in Q3 2025".
- **The call back slots copy theirs exactly**, including the missing 15.00 to 16.00.
- **Photography.** Unsplash License. None is captioned as SotoCat's staff, customers or
  premises. Ids are in research.md.

## The deck

Eleven sections in Raka's arc. The evidence screenshots were taken on 2026-09-23. The
landlord version sketches in section 09 are labelled as sketches. Section 10 was rebuilt on
2026-09-23 from the partner's credentials PDF (`docs/partner/amwisesa-credentials.md`). Nine
projects, Unilever Bango and 1001 Ramadhan, Pertamina, World Bank, Bank Danamon, CIMB Niaga,
Singtel, Informa and GPay, plus 16 brand names and 6 agencies, all carrying "Delivered by our
development partner, Amwisesa, often through the brand's own agency." MWX was dropped to make
room. The only award quoted is the 2015 Smarties for Bango, checked on MMA's own winners page
and Liputan6. Raka is the contact, at rifqiraka234@gmail.com, on his instruction "email me".
Both bios were rewritten on Raka's instruction to sound senior. Josh's comes from his own
LinkedIn, which Raka pasted, recorded in `docs/astra-company-profile.md`.

## The tool change made during this job

`tools/check-drafts.py` flagged the colon and hyphens inside the two URLs in the delivery
draft, although CLAUDE.md exempts URLs. It now strips links before the colon and dash
checks. A control with a prose colon and a prose hyphen still fails.
