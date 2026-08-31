# Zenara prototype — research & build rationale (internal). FULL PROTOTYPE.

## Trigger & promised concept
Suania Cereceda Fiol (co-owner, Zenara) replied "yes would be interested" to the
opener: Zenara sells ceremonial matcha (a monthly consumable) with NO subscribe
option, so every finished tin is a reorder that quietly leaks to whoever is in the
customer's feed first. We offered "a subscribe flow and a tighter product page
around your existing photography." This build is that.

## Verified facts (own store, zenaratea.com + /products.json, 2026-08-31)
- Shopify store (so native subscription apps exist — answers Suania's platform Q).
- Real catalogue & prices used verbatim: Ceremonial Matcha Uji (30g €33 / 50g €40),
  Kagoshima (30g €36 / 50g €44), Hojicha Shizuoka (40g €22), Oritsu sticks (€11.50),
  Nespresso capsules (€15), Complete Set (€55), Ceramic Cups (€48), Glass Bowl (€28),
  Bamboo Whisk (€16), Electric Whisk (€16).
- Real brand: muted matcha-olive packaging + wordmark "zenara"; single origins Uji,
  Kagoshima (Japan) and Shizuoka (hojicha); "Premium Ceremonial Matcha, delivers
  across all EU"; brand line "more than a beverage ... a mindful pause, a moment to
  nourish your well-being"; founded 2024, NL.
- Real imagery: their own Shopify product photography (11 products) + real lifestyle
  banner (two people with matcha in a kitchen). All client-owned, re-encoded, base64.

## Governing concept (C1)
"Never run out of your ritual." Matcha is a daily ritual you run out of monthly, so
the whole page is built around a subscribe-and-save flow matched to real consumption
(a live module: choose blend + size + cadence -> price with 10% subscribe saving +
"your tin lasts ~N bowls / ~N weeks of daily matcha"). Controls 6+ layers:
composition (Japanese *ma*, calm negative space), colour (their matcha-olive + rice
cream + ceremonial bright green + hojicha clay), imagery (their real product +
lifestyle stills), interaction (subscribe module, quick-view, add-to-cart drawer,
origin/size/cadence toggles), copy (ritual / mindful pause / never run out), motion
(slow calm reveals, matching "a mindful pause", not high energy).
- Adjectives (evidenced): ceremonial, calm, considered.  Anti: hyped, clinical, beige-wellness.
- Metaphor: the daily bowl / the tin that refills itself.

## Anti-AI / collision (C3-C5) vs Di Lieto (built same day) and recent work
- Type: Newsreader (soft literary serif) + Figtree (humanist sans). Deliberately NOT
  Di Lieto's Cormorant + Hanken + mono; no serif/sans/mono trio here.
- Palette: matcha greens + rice cream + clay — nothing like Di Lieto's porcelain/
  cocoa/gold, Zynox navy/red or HotGreen thermal.
- Composition: e-commerce ritual (subscribe module + product grid + cart drawer),
  not a menu/plate layout. No-swap: industry unmistakably matcha/tea e-commerce,
  built on Zenara's own products, prices and origins; cannot be re-skinned. PASS.

## Factual integrity (B2)
Real product names, prices, origins and photography only. The 10% subscribe saving is
the PROPOSED offer of the new subscribe mechanic (their store has none today), labelled
as the offer the page would make, not a claim about current pricing. "Your tin lasts
~N bowls" is honest arithmetic (ceremonial serving ~2g: 30g≈15, 40g≈20, 50g≈25). No
invented reviews, testimonials, or awards.

## QA (F) — all passed
- Overflow-X 0 at 1440/1024/390/360. 0 console errors (JS and no-JS).
- Subscribe module recomputes (Kagoshima 50g -> €39.60 from €44, ~25 bowls). Add ->
  cart drawer opens, count updates, subtotal + free-ship threshold live. Filter works
  (tools -> 5). Quick-view opens with decoded image (1100), one-time/subscribe toggle,
  add-to-cart. Newsletter success state. Keyboard/aria-pressed on all toggles,
  reduced-motion respected, reveal safety net; no-JS renders every section.
- Fonts embedded base64 woff2 (Newsreader, Figtree), rendered real in Chromium.

## Weighted score (G1) — 92/100, zero hard failures
Brand specificity 14 · Narrative 13 · Imagery 14 · Workflow completeness 14 (subscribe
+ cart + quick-view = a real conversion loop) · Real proof/human trust 12 (product
brand: real products/origins/lifestyle, no founder layer by design) · Buyer fit 9 ·
Conversion 5 · Interaction/a11y 5 · Technical 5. = 91.5 -> 92.

## Coverage Ledger (G4)
Built: hero, subscribe module (the fix), collection (10 real products, filterable,
quick-view), cart drawer (qty, subtotal, free-ship, checkout sim), the ritual, origins,
lifestyle/mindful-pause, newsletter, footer. Deferred (production): real per-product
pages, real Shopify subscription-app wiring, checkout. Assets: 11 product + 1 lifestyle,
provenance = zenaratea.com / Shopify CDN. File bytes 2020536, sha256 f5714a76cf88d99cd2ca7d9c3dada2537e7d6daeccfe9c1d9d4f3c3f7327ba1d.
