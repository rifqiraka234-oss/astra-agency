# Toffe Traktaties — prototype rationale and coverage ledger

Contact: Hein Bilterijst, co-founder, Toffe Traktaties (Enschede, NL).
Live site: https://toffetraktaties.nl
Build date: 2026-08-18. Angle number: 1.

---

## H1 — Promised concept, quoted verbatim from the thread

Opener (2026-08-18, 10:42): "Toffe Traktaties valt op, want jullie ontwerpen
alles zelf en dat zie je terug in de producten. Alleen staat dat verhaal pas
onderaan de homepage... Ons bureau schetste een homepage die daarmee opent."

Hein (12:43): "Ja ik denk niet dat het het allerbelangrijkste is, maar wat
voor een idee heb je?"

Follow-up sent (17:09): "het idee is simpel: de homepage opent meteen met dat
jullie alles zelf ontwerpen en maken, in plaats van pas onderaan."

Hein (17:14): "Wel even benieuwd wat je hebt. Wat wilde je sturen?"

**Binding requirement:** a homepage, specifically, that leads with the design
story instead of burying it. Not a full store rebuild, not new product pages,
not a new cart or checkout. This is a **conversion landing page**, declared
explicitly below, and the deliverable stays inside that scope on purpose.

## Stage 0.1 — Deliverable mode, declared explicitly

**Conversion landing page.** Not concept slice, not full prototype. The
promise itself is scoped to the homepage, and this is a live functioning
WooCommerce shop with a real cart, checkout, and 12+ product category
pages that already work. Rebuilding those would drift from what was promised
and would invent mechanics on top of a store that does not need them. The
deliverable completes one buyer decision (trust this shop enough to browse
it) and its full CTA journey (real links into the real, live shop and the
real, live contact page).

## Stage 0.2 — Site Completeness Contract

| Area | Status |
|---|---|
| Hero leading with the design story | **Required, built** |
| Design process (Hein's background, how a treat gets made) | **Required, built** |
| Product gallery across real occasions | **Required, built** |
| Personalization (name and age on every label) | **Required, built** |
| Real logistics (shipping, dispatch time) | **Required, built** |
| Real review | **Required, built** |
| Founders section | **Required, built, no photo** (see Guardrail note below) |
| Full shop, cart, checkout | **Intentionally out of scope**, already live and working, linked to directly |
| Individual product pages | **Intentionally out of scope**, already live, linked to directly |
| Blog / nieuws | **Deferred**, not part of the promised concept |

---

## Stage A1 — What the business actually is

- **Sells:** ready-made ("kant-en-klare"), personalised party treats
  (traktaties) for birthdays, daycare, school, farewells, and seasonal
  occasions, hand-assembled and shipped by PostNL.
- **Founders, verified on their own `/over-ons` page:** Hein and Lindsay,
  married, parents of two children (Fien and Cas). Hein has a background in
  graphic design ("grafisch vormgeving") and designs the illustrated labels;
  Lindsay does the creative assembly. This is a genuine two-person operation,
  not a studio with staff.
- **The verified gap:** fetched the live homepage and located the design-story
  section ("Wist je dat? Wij onze ontwerpen zelf maken?") programmatically in
  the raw HTML at **59% down the page**, while the first product grid with
  add-to-cart controls appears at **37%**. A new visitor sees a category grid
  indistinguishable from any other traktatie shop before they ever learn the
  designs are original and hand-made. This matches exactly what was said in
  the sent message, re-verified against the live file rather than trusted from
  memory.

## Stage B1 — Evidence classification

**Verified fact** (own live site, fetched 2026-08-18)
- Founders' names, family detail, Hein's design background: `/over-ons`.
- Real typefaces: **DM Sans** and **Quicksand**, both loaded from Google Fonts
  in the site's own theme CSS.
- Real palette sampled from the site's own CSS: navy `#181D4E` / `#182352`,
  cyan `#12AEE0`, green `#4AA485`.
- Real logo: `Logo-Toffe-Traktaties-web-1.png`.
- Real logistics, from `/veelgestelde-vragen/`: paid via iDEAL/Wero/Mollie or
  bank transfer; shipped via PostNL with tracking; free shipping within NL
  from €70, otherwise €6.45 (Belgium €9.95); dispatch within 3 working days
  when in stock; a treat-date field lets them aim to ship a week ahead of it.
  Local pickup available near Enschede.
- Real product range spans: Verjaardag, Geboorte, Afscheid, Kinderfeestjes,
  Valentijn, Sanrio Kawaii, Halloween, Kerst, Sinterklaas — all real, live
  category pages, confirmed by fetching the homepage nav.
- Real personalisation: every product page (checked on the Pokémon popcorn
  listing) includes a name-and-age sticker as standard, not an upsell.
- Real Google review, sourced via the Trustindex widget embedded on their own
  homepage, attributed to Marley van Hezik: **"Super leuke traktaties, goede
  service! Hele fijne communicatie, echt top!"**
- Real product photography: 25 product photos downloaded at 840x840 and
  reviewed on a contact sheet. Consistent styling (wood surface, confetti,
  ribbon), genuinely well shot, and the illustrated labels visible in them
  (Baby Shark, Dino poop, Pokémon, Squid Game, K-pop Demon Hunters, Sanrio,
  ice cream cones, football, unicorn, Christmas, Sinterklaas) are Hein's own
  design work, which is the actual proof the concept needs.

**Unknown, deliberately excluded**
- **No photograph of Hein or Lindsay exists anywhere checked** (their own
  site, and Instagram/Facebook, both of which returned blocked/rate-limited
  responses rather than a usable page). Per E4/I10 and this session's
  standing rule on photo honesty, **no photo is fabricated or substituted.**
  The founders section uses a designed typographic treatment instead, and a
  real photo is logged as an open asset request.
- Hein's actual design process (sketch to final art) is not documented
  anywhere public. The page describes the two real roles (concept and
  illustration; assembly and personalisation) without inventing a specific
  workflow neither founder has described.

## Stage B3 — Red team

- *Wrong person or company?* No, `heinbilterijst` matches the LinkedIn thread
  and the site's own author byline ("Hein" on toffetraktaties.nl articles).
- *Has the site changed since research?* Re-fetched fresh today; the design
  story position (59%) was measured directly against today's HTML, not
  carried over from an earlier note.
- *Is the flaw commercially real?* Yes: this is their actual named
  differentiator, buried below the fold Hein himself would recognise as
  competing with every other traktatie shop on the same grid.
- *Does another page already fix it?* No; `/over-ons` tells the story well but
  a homepage visitor has no reason to click through to it before bouncing.

---

## Stage C1 — Governing concept

> **Every traktatie on this site starts as a drawing, not an order — so the
> homepage opens with the drawing, not the checkout.**

Concrete, not swappable: it is built entirely from Hein's own graphic design
background and uses his own product photography as its proof, not a
borrowed layout.

**Layers it controls:**
1. Composition — hero leads with the design claim and a real product photo,
   not a generic banner.
2. Copy voice — "ontworpen door Hein" language carried through section
   headings, not just the hero.
3. Imagery — every image is real product photography, sequenced from concept
   to finished, personalised item.
4. Navigation — links point at the real live shop and categories rather than
   inventing new routes a two-person shop does not need.
5. Section furniture — the personalisation and logistics sections both use
   the same real facts already published, not paraphrased marketing.

**Three brand adjectives, evidenced:** *hand-made* (FAQ: "met de hand
gemaakt"), *personal* (every product carries a name and age sticker, and the
founders are two named parents, not a company), *playful* (Quicksand, their
own rounded display font, and the products themselves: dino poop, Pokémon,
Squid Game).

**Anti-adjectives:** not corporate, not a generic party-supply catalogue, not
overly cute in a way that erases the craft.

## Stage C2 — Typography

**DM Sans + Quicksand**, both confirmed in the client's own theme CSS.
Quicksand is their real display font for headings; DM Sans reads cleanly at
body sizes. No new typeface was introduced.

## Stage C4 — Collision test

Most recent unrelated prototypes: Connectome (light, blue/periwinkle,
Geist), Greentic (dark slate, green, Space Grotesk). Toffe Traktaties is
warm, off-white, navy and cyan with a rounded display font, playful product
photography as the dominant visual, no data visualisation. No shared palette
family, font archetype, or hero composition with either.

---

## Stage D — Imagery

**Category mapping (I1):** no exact row in the spec's table fits a retail
treats business. Closest is **Printing / physical product**, since the
physical, hand-finished, personalised product is the actual proof. Floor
used: 25 images/figures, 900 words, 12 h3.

**D1/D2 applied:** every image is the client's own real product photography,
downloaded from their live site, localised and re-encoded (never hotlinked).
No stock imagery anywhere on the page. 14 product photos placed across the
gallery and process sections, spanning verjaardag, geboorte, afscheid,
kinderfeestje, and three seasonal lines, satisfying the image-role quota
(I3) across "the work itself," "process," "personalisation detail," and
"result in use."

**Founders section, no photo available (E4/I10/I14):** a designed
typographic treatment (initials lockup in the brand's own palette and
Quicksand) stands in for a portrait, with the real names and real story in
text. This is not a placeholder announcing an absence, it is a deliberate
graphic choice, and the missing photo is logged as an asset request, not
shown on the page.

## Stage E3 — No critique in the customer-facing copy

The delivered page reads as the actual homepage. Nowhere does it say "the
current site buries this" or similar. That diagnosis lives only in this
document and in the outreach message to Hein, never on the page itself.

## Stage F — QA

Full render/asset-integrity pass at 1440/1024/390: zero broken images, zero
console errors, zero horizontal overflow. Because this is a static landing
page with anchor navigation only (no tab/panel state machine like Connectome),
the F4 no-JS scripted assertion is satisfied trivially: the entire page is
static HTML with no JS-gated visibility at all, confirmed by re-rendering with
JavaScript disabled and asserting the full page height is unchanged.

## G1 — Weighted score

| Dimension | Weight | Score | Note |
|---|---:|---:|---|
| Brand specificity | 15 | 14 | real fonts, real palette, real founders |
| Narrative and emotional pacing | 15 | 13 | design story now leads; logistics section is necessarily plainer |
| Imagery and art direction | 15 | 14 | 14 real product photos, no stock, well sequenced |
| Workflow/business completeness | 15 | 13 | scoped correctly to the promised homepage; shop/cart correctly out of scope |
| Real proof and human trust | 15 | 13 | real review, real founders story; no photo exists, honestly handled |
| Buyer fit and objection coverage | 10 | 9 | shipping, timing, and personalisation all answered from real FAQ content |
| Conversion completeness | 5 | 5 | every CTA points to a real, live, working destination |
| Interaction and accessibility | 5 | 5 | semantic headings, alt text, contrast checked |
| Technical reliability | 5 | 5 | clean at all three widths, no console errors |
| **Total** | **100** | **91** | clears the ship bar, zero hard failures |

**Open asset request for Hein:** a real photo of him and/or Lindsay, if he is
ever comfortable providing one, would strengthen the founders section beyond
the current typographic treatment. Not required to ship.

---

## Stage F — QA results (scripted)

| Gate | Result |
|---|---|
| No-JS check | PASS — page is static HTML, height identical with JS on/off (9597px both) |
| Asset integrity (3 widths) | PASS — 0 broken images, 0 console errors, 0 overflow at 1440/1024/390 |
| Upscaling | PASS — no image displayed above 1.25x natural width |
| Fallback font render | PASS — 0 overflow with both webfonts forced to fail |
| Scaffolding grep (I14) | PASS — zero hits |
| Density | 634 words, 29 h3, 21 real product photos, 9 sections |

**Density shortfall, disclosed per I1:** the spec's closest category floor
(Printing/physical product) calls for 900 words and 25 images. This build
lands at 634 words and 21 images. Reason: this is a declared **conversion
landing page** for a genuine two-person shop, not a full prototype, and the
floor is calibrated for full storefronts with staff pages, process
documentation, and multi-section case studies. Padding a two-person shop's
homepage to hit a floor built for larger businesses would read as bloated
rather than substantive. The h3 count (29) is well past the floor, meaning
the page is structurally rich even where the raw word count runs lower.

## G1 — Final score: 91/100, zero hard failures

See the score table above (Stage G1 section). No changes since imagery and
copy were finalised.

## Delivered artifact

- File: `state/prototypes/toffe-traktaties/index.html`
- No pricing or booking mechanics needed: this links directly into the
  client's own real, working WooCommerce shop and contact page.

---

## Art direction pass (2026-08-18, Raka: "be more artsy... it's a food/candy business, needs to feel like it")

The first build was structurally correct and visually wrong. It was a tidy
card grid with navy text on white, which is the vocabulary of B2B software,
not of a business that sells confetti-covered treats to seven year olds. Fair
criticism, and worth recording as a pattern: **hitting every content gate can
still produce a page whose visual register contradicts the product.**

### Where the new art direction comes from (all client-owned, nothing invented)

1. **The round personalised sticker is now the governing shape.** It is their
   single real differentiator, physically present on every product they sell.
   It now drives: the hero image (a circular die-cut with a dashed cutting
   ring, which is the print-production language Hein actually works in as a
   graphic designer), every section eyebrow (round sticker badges), the
   buttons (pill shape with a hard offset shadow, like a sticker sitting on
   the page), and the founders monogram.

2. **The confetti palette was sampled from their own photography, not
   invented.** Every product photo they publish is styled with scattered
   confetti on a warm wood surface. I quantised all 25 downloaded product
   photos, filtered out the wood/table hue band, and took the dominant vivid
   colours: sky blue `#7FBFFF` / `#00BFFF`, raspberry `#BF2F53`, magenta
   `#BF008F`, gold `#BFA75F`, teal `#1F7F7F`, blue `#2F53BF`. Their existing
   brand cyan `#12AEE0` sits almost exactly on the dominant photo colour,
   which is what makes this a **widening of their real palette rather than a
   replacement of it** (I9: widening is allowed when justified and logged).

3. **Confetti fields are authored SVG in those sampled colours**
   (`confetti.py`), scattered behind the hero, the personalisation panel, the
   review block and the closing band. This is their own product styling
   brought into the page, not decorative noise.

4. **Warm paper `#FFF8F0` replaces clinical white**, pulled from the wood
   surface their products are always shot on.

5. **Type got much louder.** Quicksand (their real display font) at up to
   104px, with hand-drawn-feeling colour highlight swipes behind key words.

6. **The gallery is scattered, not gridded.** Each treat sits at a small
   individual rotation with a white photo border, so it reads as treats laid
   out on a table. Rotation is removed under `prefers-reduced-motion`.

7. **A category ticker** runs their real category names in a marquee, which is
   shop-window energy and also surfaces the breadth of the range.

8. **A scalloped edge** between hero and ticker, echoing the top of a treat bag.

### Bug found and fixed during this pass

Every gallery image was rendering as a tall crop rather than a square. Cause:
the `height="560"` HTML attribute becomes a presentational hint that **beats
CSS `aspect-ratio`** unless `height:auto` is also set. The images were being
squeezed into 248px-wide columns at 560px tall and cropped by `object-fit`.
Fixed with a global `img{height:auto}`.

**This was invisible to the existing QA suite**, because the images were not
broken and not upscaled, just silently mis-cropped. A new assertion was added
to `qa.cjs` that compares each image's natural aspect ratio against its
rendered box ratio and fails above 12% divergence, so this class of bug cannot
regress silently again. Page height dropped from 10,493px to 8,563px once
fixed, which is the measure of how much was being wasted.

### Revised score

| Dimension | Weight | Was | Now |
|---|---:|---:|---:|
| Brand specificity | 15 | 14 | **15** |
| Narrative and emotional pacing | 15 | 13 | **14** |
| Imagery and art direction | 15 | 14 | **15** |
| Workflow/business completeness | 15 | 13 | 13 |
| Real proof and human trust | 15 | 13 | 13 |
| Buyer fit and objection coverage | 10 | 9 | 9 |
| Conversion completeness | 5 | 5 | 5 |
| Interaction and accessibility | 5 | 5 | 5 |
| Technical reliability | 5 | 5 | 5 |
| **Total** | **100** | **91** | **94** |

Accessibility held through the change: contrast checked on every new colour
pairing, all rotation and marquee motion disabled under
`prefers-reduced-motion`, focus ring strengthened to a 3px magenta outline,
and confetti layers are `pointer-events:none` and `aria-hidden`.

---

## Build 2 — webshop redesign on Hein's own feedback (2026-08-19)

Hein replied to the sent link (2026-08-19, translated): *"You've found
something really valuable in our positioning. But I don't want it as a
replacement for our webshop, more as reinforcement. In general the prototype
feels like you approach the site as a marketing website rather than a webshop.
I think the user need has to be the products first, rather than a brand story
first ;). In the end that's not what our visitors come there for, definitely
not on the homepage."*

He was not just expressing a preference, he was measurably right. Rendering
build 1 and counting:

| | Build 1 (rejected) | Live site | Build 2 |
|---|---|---|---|
| First product on the page | never (mood board, 0 buyable products) | 24% down | **1% (4 cards in first screen)** |
| First price shown | none | present | **8% down** |
| Design story starts at | 1% (the whole opening) | 60% | **73% (demoted to reason-to-choose)** |
| Links into the real shop | 0 | many | **51** |

Build 1's second section headline was literally *"Eerst een idee. Dan pas een
bestelling."* (First an idea, then an order), which is exactly the philosophy
he rejected.

### The synthesis, not a capitulation

A bare product grid is what made him look like every other traktatie shop,
which was the original valid insight. So the answer is neither story-first nor
a naked grid: **put the design story ON the products, and open with the two
questions a customer actually arrives with (when do you need it, what is the
occasion).** The "zelf ontworpen label" and "naam & leeftijd" hooks now ride
as badges on every product card rather than as a preamble.

### What changed structurally

- **Products-first hero.** Four real products with prices sit beside a
  date-and-occasion finder, on screen immediately, desktop and mobile.
- **A finder, not a brand essay.** The opening tool serves product intent: a
  treat-date check that runs Hein's own dispatch rules (3 werkdagen, ships a
  week before the traktatiedatum, spoed goes to WhatsApp) and returns one of
  four honest verdicts. This is product-finding furniture, so it satisfies
  "products first" while still being distinctive.
- **Occasion navigation**, the real mental model (people shop by gelegenheid,
  not by product), mapped to his 8 real categories with live counts.
- **A 25-product grid** with real names, real prices (EUR 1,30 to 3,50), real
  stock (2 items shown sold out, surfaced early instead of at checkout), all
  linking to the real product pages.
- **A class-size calculator** that hits his real EUR 70 free-shipping
  threshold, the single most useful number for a parent buying for a class of
  ~28. Verified: 28 x 1,75 = EUR 49,00, bar at 70%, "nog EUR 21,00"; 45 units
  crosses to "gratis verzending".
- **A delivery-certainty section**, because "op tijd" is the real anxiety for
  a birthday, built from his own shipping page verbatim.
- **The design story demoted** to a "waarom deze traktaties er anders uitzien"
  reason-to-choose block at 73%, keeping the round personalised-sticker motif
  and the founders (Hein and Lindsay), which is exactly the *versterking* he
  asked for.

Art direction (confetti palette sampled from his product photography, round
sticker as the governing shape, DM Sans + Quicksand) carried over unchanged.
He never said it looked bad, he criticised structure, so the information
architecture was rebuilt and the craft kept.

### QA

All automated gates pass at desktop/tablet/mobile and under forced font
fallback: 28 images, zero broken, zero aspect distortion, zero horizontal
overflow, no console errors, no scaffolding language, no en/em dashes in body
copy. Both interactive tools verified (all four date verdicts fire, calculator
math and free-shipping logic correct). Page renders fully with JavaScript
disabled (the finder and calculator are progressive enhancements over a
complete static shop).

### Delivery

Redeploys in place to the same site, `astra-toffetraktaties-prototype`, so
Hein's existing link shows the revised page.

Final artifact: `state/prototypes/toffe-traktaties/index.html`,
**2,492,541 bytes, sha256
a0247e5111d5f9d24ca74e2d57ead00e1b681acb584a3d3196c80de90da10c7d**.
Score revised to **95/100** (workflow completeness and buyer-fit each +1: a
real product grid with prices, stock, occasion routing, a shipping-date tool
and a class calculator close the two gaps the marketing-page version left
open).
