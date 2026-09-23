# CustomKit, handover. 2026-09-23

Two artefacts, both live and verified.

| | URL | Netlify site id | Deploy id |
|---|---|---|---|
| Website prototype | https://astra-customkit-prototype.netlify.app | c5948901-c964-416d-a491-e14cb7428807 | 6ab3eb91b2ecea0d458eb4e1 |
| Analysis deck | https://astra-customkit-deck.netlify.app | 6c3f4481-a25b-4593-94f0-e2bbbe5dc98a | 6ab3ebab391bfc4c5e56876b |

Both projects came up with team SSO on by default, which would have locked Chris out. It was
switched off on both before the first deploy.

Source is in this folder. `build/pages/` holds the page bodies, `build/build.py` wraps them
in the shared header and footer and writes `site/`. A rebuild reproduces `site/` byte for
byte, checked 2026-09-23. Research, sources and the art direction are in `research.md`.

## How it was verified

- **Cold load QA**, `tools/deck-qa/qa.js` (now with a `PAGE=` option for multi page sites) on
  all 11 site pages and the deck. Zero page errors, zero console errors, zero bad responses,
  every reveal fired naturally, every image decoded, no horizontal overflow at 420px.
  Deck 74 of 74 reveals and 23 of 23 images.
- **Interactive parts, end to end.** Studio set to Hoops in navy and white, canvas centre
  pixel 29,45,77 (#1c2b4a is navy), the brief page showed the pick and filled the hidden
  field. The brief form blocks an empty step, a bad email and details under 20 characters,
  then confirms. Brand design package buttons preselect the package. Phone menu opens.
- **Live.** 41 site files and 26 deck files match the deployed copies, assets by sha256 and
  HTML by visible text, because Netlify rewrites links. A random path returns the designed
  404. Live render in Chromium, zero errors, 0 of 15, 0 of 2 and 0 of 23 images broken.
- **Portrait.** `tools/verify_portraits.py` PASS. `img/chris.jpg` (sha256 37d2a0a6...) is
  CustomKit's own founder photo from customkit.com/about/chris-flood, re-encoded with the
  tool's settings.
- **Copy.** Zero banned words, phrases or hedges from NO-AI-SLOP, zero colons, dashes and
  prose hyphens, zero exclamation marks outside verbatim customer quotes. The audit was
  proven against a control file that contains one of each.
- **Three recheck passes** on 2026-09-23, listed at the end of `research.md`. They caught
  and fixed seven claims (an unsourced "UK kit maker", "one page among 51", a samples row
  that was never a real conflict, an unnamed page, an inference about the product photos,
  a quote with its punctuation changed, and a padel minimum that doesn't exist).

## Must change before the site goes live

1. **Forms.** Start a project and the brand design booking show their confirmation screens
   but post nowhere. Wire them to hello@customkit.com or the CRM. The brand design
   confirmation promises card payment after the brief is confirmed, so the payment step has
   to exist.
2. **Remove `noindex, nofollow`** from every page.
3. **og:url and og:image** point at the Netlify domain. Change them to customkit.com.
4. **Photography.** Garment and workshop photos are Unsplash (ids in `research.md`), none
   captioned as CustomKit's work, staff or premises. Swap in real finished orders as they
   ship. The kit renders are CustomKit's own, from its kit designer.
5. **Terms, privacy, returns, blog and supplier links** in the footer point at the current
   customkit.com pages. Move them across with the site.

## Choices made that Chris should confirm

- **One minimum per garment**, taken from his own pages. Team kit 10 garments (kit
  designer), golf 15, white label and drops 25, merchandise 50. The site doesn't use "no
  minimum", which appears on 23 .com pages and conflicts with all four.
- **One schedule.** 24 hours to review, 48 hours to a proposal, 5 to 7 working days for
  samples, 4 to 6 weeks for the run, the figures most of his pages use. The 3 to 5 weeks, 2 to
  3 weeks and 3 to 4 weeks elsewhere aren't used.
- **"Join 500+ brands" is left out.** Companies House has the company registered on 9 Dec
  2025 and his LinkedIn page says pre-launch.
- **Candice's review** is quoted without its thumbs up emoji. Everything else in the nine
  reviews is byte for byte what Trustpilot shows.
- **"Co founder"** comes from his LinkedIn tagline ("Co-Founder & CEO") and Companies House
  (two directors). His own founder page says "Founder".
- **The welcome pop up** is replaced by a slim bar linking to a clubs page, which carries
  the kit designer's own price list (ex VAT, minimum 10 garments).
