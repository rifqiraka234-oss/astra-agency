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
