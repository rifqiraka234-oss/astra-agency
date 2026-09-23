# CustomKit, handover. 2026-09-23 (v3, people and motion on top of the v2 redesign)

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

## What changed in v3, and why

Raka's note on v2: "If you look at adidas or nike, its all about the feel ... They use pictures
and images and videos to showcase people ... It feels like this is just an e commerce website."

What the Nike and adidas work does, read before building. Nike's "You Can't Stop Us" and
"Dream Crazy" put ordinary and elite athletes at the centre and let footage carry the feeling,
with a short line of copy on top. adidas "You Got This" (2024) is built around grassroots and
everyday players and the feeling before the game, not the product. So the site now leads with
people playing, in motion, full bleed, and the copy is a short manifesto over it. Sources are
in research.md.

- **Homepage hero.** An 18.5 second reel, full bleed, under "Kit worth turning up in." Five
  shots, a team walking out, hands stacking, a kick, a team huddle and a golfer. Pause button,
  and it only plays while on screen. Reduced motion shows the poster frame and never plays.
- **The story, "It starts as an idea. It ends on a pitch."** Four sticky chapters, each with
  its own footage that swaps as you scroll. 01 a needle stitching, 02 a team huddle over the
  sample sign off line, 03 a team walking out, 04 a golfer. The copy on each is from
  CustomKit's own pages.
- **Teams and White label heroes** are now footage (team walking out, needle).
- **Every closing section** on make, white label, launch, process, founder and reviews sits on
  a cobalt duotone of a people shot, not a flat block.

### The footage, and what it is not

All seven clips are Mixkit, each item page's own `copyrightNotice` field reads `"Free"`, which
is the Mixkit free licence, commercial use, no attribution. Clips marked "Mixkit Restricted
License" were excluded (6652 and most of the sewing clips among them). Ids used, 4567 (walk),
43479 (hands), 4576 (kick), 4588 (stack), 2036 (golf), 51012 (needle).

Every frame was checked for third party logos. Rejected for logos, 43481, 43482, 43483,
43484, 43485, 43494, 43495, 43499 (molten banners, adidas boots), 44602 (adidas shirt), 609
(New Balance), 750 (branded jersey), 42541 (adidas stripe socks), 32807 and 747 (too close to
call). One small unreadable mark is visible on a green shirt in the walk clip.

**None of it is CustomKit's customers, staff or kit, and the site never says it is.** The
videos are decorative, `aria-hidden`, with no caption. The deck says the footage is licensed
stock until their own shoots replace it.

### Weight

Each clip ships as WebM (VP9) and MP4 (H.264, faststart) with a JPEG poster. A browser loads
one format, 5.5 MB for all WebM or 6.5 MB for all MP4 across the whole site, and the homepage
reel is 2.6 MB WebM. Videos use `preload="auto"` but only play in view. The Chromium used for QA
can't decode H.264, which is why WebM is listed first, and it proves the WebM path plays.

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
4. **Photography and footage.** Swap the stock photos, the seven stock clips and the court plan
   for CustomKit's own shoots of real teams in real finished orders. This matters more in v3, the
   whole feel of the homepage now rests on footage of people, and it should be their people.
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
