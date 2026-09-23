# CustomKit, handover. 2026-09-23 (v2, full redesign)

Two artefacts, both live and verified.

| | URL | Netlify site id |
|---|---|---|
| Website prototype | https://astra-customkit-prototype.netlify.app | c5948901-c964-416d-a491-e14cb7428807 |
| Analysis deck | https://astra-customkit-deck.netlify.app | 6c3f4481-a25b-4593-94f0-e2bbbe5dc98a |

Deploy ids for v2 are in `state/prototypes.jsonl`. Team SSO is off on both projects.

## What changed in v2, and why

Raka's note on v1: customkit.com and customkit.uk are themselves AI generated, so a prototype
that took their colours and fonts still looked like Lovable. He asked for a full redesign,
thought outside the AI box, with the two sites combined.

- **Art direction.** A matchday programme crossed with a factory spec sheet. Paper
  #f1eee6, ink #111, cobalt #2b3bff and lime #dcf74a as flat blocks, 1.5px ink rules, square
  corners, no shadows on cards. Reference sites looked at first: Satisfy, Mundial, Bandit,
  Soar, Pas Normal Studios. Every colour pair passes AA (cobalt on paper 5.7, lime on ink 15.7).
- **Type.** Big Shoulders Display for headlines, Archivo for text, IBM Plex Mono for labels,
  all OFL, self hosted from Fontsource.
- **One site, two front doors.** The homepage splits into Teams (kit designer, club prices,
  from 10 garments) and Brands (white label, drops, webstores, brand design). teams.html
  carries the customkit.uk content, the sports, the price list, the training bundle and the
  free mockup, in their own words. clubs.html and the welcome pop up are gone.
- **Motion.** Wipe reveals, split flap lead time numbers, door kits that recolour through club
  colourways, a sports ticker, a scroll progress line and hover states that fill in lime.
  Everything respects reduced motion (checked, flaps render final, ticker stops).
- **Photography.** Stock photos are printed as cobalt or lime duotones. Two were dropped because
  they carried other brands, a VISA logo on a golf polo and FORZA PADEL on a ball. Retouching
  them left visible patches, so the padel slot is now a to scale court plan drawn in SVG and
  golf uses the clean golfer shot. The brand design hero is cropped so an Acne Studios book is
  out of frame.

## How it was verified

- **Cold load QA**, `tools/deck-qa/qa.js` with `PAGE=` on all 11 pages. Zero page errors,
  console errors and bad responses, every reveal fired (index 47 of 47), every image decoded,
  no page overflow at 420px (the only wide element is the ticker, which is clipped).
  Deck 77 of 77 reveals and 26 of 26 images.
- **Interactions, end to end.** Kit room set to Hoops in navy and white, centre pixel
  29,45,77, carried into the brief page. The brief form blocks an empty step, a bad email and
  a short description, then confirms. Package buttons preselect. Door canvas changes colourway.
  Brands dropdown opens on click and closes on Escape. Rail buttons scroll. Phone menu opens.
- **Copy.** Zero banned words, dashes, colons or exclamation marks outside verbatim quotes,
  proven against a control file. Every heading is a claim.
- **Claims.** Every number re-traced this session to customkit.com, customkit.uk,
  design.customkit.com, Trustpilot (re-rendered) or Companies House. The two caught on the
  redesign pass, "nine reviews on Trustpilot" (it has 54, nine since April) and "13 colours"
  (our swatch set, not their range), are fixed.
- **Portrait.** `img/chris.jpg` unchanged, sha256 37d2a0a6..., the file that passed
  `tools/verify_portraits.py`.

## Must change before the site goes live

1. **Forms.** Start a project and the brand design booking confirm but post nowhere. Wire them
   to hello@customkit.com or the CRM, and the card payment step the booking copy promises.
2. **Remove `noindex, nofollow`** from every page.
3. **og:url and og:image** point at the Netlify domain.
4. **Photography.** Swap the stock and the court plan for real finished orders as they ship.
5. **Footer links** to terms, privacy, returns, blog and supplier application point at the
   current customkit.com pages.
6. **customkit.uk** should redirect to teams.html if the sites are merged for real.

## Choices Chris should confirm

- **One minimum per garment**, from his own pages. Team kit 10 garments, golf 15, white label
  and drops 25, merchandise 50. "No minimum", on 23 .com pages, isn't used.
- **One schedule.** 24 hours, 48 hours, 5 to 7 working days, 4 to 6 weeks.
- **"Join 500+ brands" is left out.**
- **Candice's review** is quoted without its emoji.
- **"Co founder and CEO"** is from his LinkedIn tagline. His founder page says "Founder".
- **The training bundle** (£189 per player against £217) is from customkit.uk/bundles, which
  doesn't say whether VAT is included, so the site doesn't either.
