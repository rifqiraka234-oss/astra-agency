# Di Lieto Patisserie prototype — research & build rationale (internal)

Not for the client. Stage A-I record behind index.html. Deliverable mode: FULL PROTOTYPE.

## Trigger & promised concept (H1)
Barbora Juhaszova (co-founder, Di Lieto Patisserie) replied "send it over why not"
to the opener about the site having beautiful photos but no menu, no pricing and
no ordering path, so a chef ready to order hits a wall. This build is that fix.

## Verified gap (B1, re-checked live dilietopatisserie.com 2026-08-31)
Live Wix site: strong photography, a founder story, four range names, but NO
readable menu, NO pricing/quote path, NO ordering mechanic; the only reviews are
about workshops, not wholesale supply. A chef furthest down the buying path cannot
act. Our build gives the ranges a real, readable, orderable menu + a taster-box
conversion, without inventing recipes, allergens, lead times or prices.

## Brand Evidence Pack (A2) — all from dilietopatisserie.com
- Offer/buyer: wholesale patisserie studio supplying professional kitchens across
  Surrey; buyers are chefs / F&B managers at restaurants, hotels, gastropubs,
  events who want a Michelin-level dessert offer without an in-house pastry team.
- Verified facts (own site): founder Mauro Di Lieto, award-winning executive
  pastry chef, Winner Bake Off: The Professionals 2023, 15 years across 5-star &
  Michelin kitchens (Italy & UK); four ranges (Petit four, Buffet selection,
  Afternoon tea, Plated dessert); "delivered frozen, plate-ready," "updated each
  season"; PB/GF/NF options across all ranges "held to the same standard";
  "access to exceptional patisserie without the overhead of an in-house pastry
  team"; "exceptional desserts on every menu, without the complexity or the cost";
  free taster box new-client offer; "happy to talk through what works for your
  menu and your margins"; Woking, Surrey.
- Real assets: 15 genuine professional photos pulled from their own Wix media
  (plated desserts, petit fours, buffet tower, afternoon tea, Mauro portrait, the
  real Bake Off trophy win photo, tactile maritozzo). Contact-sheeted and scored
  before use.
- Note on Barbora: she is also Global Product Marketing Lead at SAP Fioneer, so
  she is marketing-literate; the build stays operational and honest, no fluff.

## Governing concept (C1)
"The plate is the page" — Di Lieto shown the way a chef actually chooses desserts:
every item on porcelain with what it is, how it serves, and how to order it, so a
kitchen can finally read the menu and act. Controls 6+ layers: composition (the
porcelain field / plate-centric grid), typography (Cormorant menu voice + docket
mono for specs), imagery (real plated work dominates), colour/material (porcelain +
cocoa-aubergine ink + real gold from their gold-rimmed plates/tuiles + restrained
berry), interaction (range filter, plate-detail dialog, taster flow), copy voice
(chef-to-chef, margins-aware), nomenclature (ranges as menu sections, kitchen docket
for specs).
- Brand adjectives (evidenced): refined (Michelin/5-star pedigree), generous
  (plate-ready abundance), dependable (frozen, seasonal, simple to order).
- Anti-adjectives: cheap, fussy, generic-SaaS.
- Metaphor: the porcelain plate + the kitchen docket.

## Anti-AI / collision (C3-C5)
- NOT the cream+rust+editorial recipe. Porcelain + cocoa-aubergine + gold + berry.
- Serif+sans+mono are each evidenced, not habit: Cormorant Garamond = French
  patisserie-menu heritage; Hanken Grotesk = clean B2B legibility; IBM Plex Mono =
  functional kitchen docket for specs/allergens (never tiny eyebrow labels —
  eyebrows are sans caps). Composition is plate/menu-led, not a bordered-card grid.
- No-swap test: industry unmistakably patisserie/hospitality; built on Mauro's own
  work, award and ranges; cannot be re-skinned to another prospect. No overlap with
  recent builds (Zynox navy/red machine readout; HotGreen thermal). PASS.

## Imagery (Stage D) — provenance
All 15 images are the client's own, downloaded from their Wix CDN, re-encoded to
display size, embedded base64. Mauro's portrait is his own founder image from his
own site (single founder photo, captioned only as founder & executive pastry chef);
the trophy photo is the client's own Bake Off win image. No stock, no invented
imagery. Menu item names describe the pictured desserts; the menu note discloses
they are recent work and that the current season's exact menu/allergens/pricing
come with the taster box, so nothing is presented as a fixed invented SKU.

## Factual integrity (B2) — what we did NOT invent
No prices, no allergen lists, no lead times, no minimum orders, no client names or
logos, no testimonials. Those honestly route to the taster-box / season sheet. The
"Proven at" logo wall on their own site was NOT reproduced (no named venue logos
available to verify).

## QA (F) — all passed
- Overflow-X = 0 at 1440/1024/390/360. 0 console errors (JS and no-JS).
- Filter works (range -> correct subset). Plate dialog opens with a decoded image
  (naturalWidth 1300) + honest spec docket. Taster form: empty submit flags 4
  required fields; valid submit shows success state. All keyboard-operable,
  aria-pressed on filters, focus-visible, reduced-motion respected.
- No-JS: every section renders with height (menu/how/studio/taster all non-zero);
  reveal has a safety net so content can never stay hidden.
- Fonts embedded base64 woff2 (Cormorant, Hanken, Plex Mono), Latin subset;
  rendered with real webfonts in Chromium (screenshots confirm).

## Weighted score (G1) — 91/100, zero hard failures
Brand specificity 14 · Narrative 13 · Imagery 14 · Workflow completeness 13 ·
Real proof/human trust 14 · Buyer fit 9 · Conversion 5 · Interaction/a11y 4.5 ·
Technical 5. = 91.5 -> 91.

## Coverage Ledger (G4)
- Built: home/hero, proof band, the menu (12 real plates, filterable by range),
  plate-detail dialog, how-it-works order flow, founder/studio, value/margins,
  taster-box conversion form (validated + success), footer.
- Demonstrated-in-page: dietary handling (range-level note + docket line).
- Routed to taster box (honest, not invented): exact per-item allergens, lead
  times, minimum order, seasonal pricing.
- Deferred: individual per-item product pages, account/reorder portal (production).
- Assets: 15 client-owned photos, provenance = dilietopatisserie.com Wix CDN.
- File: bytes 5446788, sha256 e437cbfa1f92c740057ea80bebf2dfc41f312b68c08c568a83833aeb57bdfdc8.
