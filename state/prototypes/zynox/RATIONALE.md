# Zynox prototype — research summary & delivery rationale (internal)

Not for the client. This is the Stage A–I record behind `index.html`.

## Trigger & promised concept (H1)
Cas Maasakkers (co-owner, Zynox) replied to the silent-accepted opener with
**"Dag Raka, Klinkt gaaf ik ben benieuwd"** (a show-me). The opener promised,
in Dutch: *"een opzet waarin de productpagina klopt en meteen laat zien
waarom je voor Zynox kiest"* — a product experience where the pricing is
correct (no €0,00) and the reason to choose Zynox is immediate. This build
delivers exactly that: real spec cards, **"Prijs op aanvraag"** in place of
every €0,00, a real quote flow, and a "why Zynox" story (precision + service
+ 35 years).

## Deliverable mode (0.1): FULL PROTOTYPE
Raka asked for a final build. Not a concept slice. It ships ≥6 nav
destinations, a home view + a distinct machine-detail view (2 real views),
a working form, and a grouped footer.

## The verified problem (B1 evidence, re-checked live 2026-08-27)
- `zynox.nl` is a Shopify store, 96 products. **88 of 96 variants show
  €0,00**; the remaining 8 show nonsense placeholders (€12, €22, €8, €1 for
  machining centres). So effectively *every* machine has broken pricing.
  (Verified via `zynox.nl/products.json`.) CNC machines are quote-based, so
  the honest fix is a proper "Prijs op aanvraag" + a real quote/config path,
  never invented numbers.

## Brand Evidence Pack (A2) — all sourced from zynox.nl
- **Offer/buyer:** sells + services CNC lathes (C/L/Q/R), machining centres
  (VMC/HMC/HD/HP/5ZB/5ZP/tapping), 4th/5th-axis rotary tables, barfeeders,
  oil-mist collectors, slag removers. Buyers are production/works managers in
  precision manufacturing. (own site: /collections, /products.json)
- **Verified facts:** "meer dan 35 jaar industrie-expertise" (own /pages/about-us
  — NOTE: their about page says 35+ years, *not* "since 1990"; the opener's
  "sinds 1990" was corrected to "meer dan 35 jaar" here); CE-conform; micron
  accuracy; machines optimised with international partners; values eenvoud/
  snelheid/precisie. Service arm (own /pages/services): S01 onderhoud &
  storingen, S02 mechanische reparaties, S03 elektrische storingen
  (Heidenhain/Siemens/Fanuc/Mitsubishi), S04 industriële verhuizingen (eigen
  movers) — all in-house, on their own and other brands.
- **Real spec data:** every catalog card and the detail view use verbatim
  specs from products.json (e.g. Z-H500: 0,001° increment, ±15" indexing,
  ±4" repeatability, 2650 N·m — used for the Tolerances section).
- **Brand assets:** real palette **navy #0D1B4B / #0a1230 + Zynox red
  #E31D25** (extracted from their inline styles), real logo mark (favicon),
  two cinematic brand photos (macro-machining, werkplaats-nacht), 29 real
  white-bg product renders.
- **Contact:** info@zynox.nl, +31 6 11870057 / +31 6 41304997 (own /pages/contact).

## Governing concept (C1)
**"Zynox, measured to the micron — a control-room readout where every machine
states its real coordinates, its real tolerances and a real next step, never
a zero."**
Controls ≥5 layers: (1) typography — IBM Plex Mono as the literal DRO/readout
face for every measurement, Archivo as the engineered display grotesk;
(2) composition — coordinate grid overlays, tick-mark rulers (machinist
scale), datum crosshair, section numbering as coordinates (00/NULPUNT,
01/DE WERKVLOER…); (3) colour/material — the real navy+red, run as two
authentic environments: the **dark machine hall** (their moody photos) and
the **bright metrology lab** (white product renders + spec plates);
(4) imagery — real client assets only; (5) interaction — DRO nav readout,
axis-style filter, spec-plate detail view, "Prijs op aanvraag" as a readout
state; (6) nomenclature — MDL_ coordinates, S01–S04 service, sectioned by
axis. 8 layers total.

- **Brand adjectives (evidenced):** precise (micron/arc-second specs),
  robust (robuust frame, 42-ton machines), dependable/hands-on (service "we
  doen het allemaal zelf").
- **Anti-adjectives:** delicate, playful, generic-SaaS-minimal.
- **Metaphor:** the machine control readout / DRO + machinist's scale.

## Anti-AI / collision (C3–C5)
- Avoided the cream+rust+editorial-serif recipe entirely — this is
  navy+red, no serif anywhere.
- Mono micro-labels ARE used, but justified by real evidence (a CNC control
  literally reads out in monospaced numerics), not editorial habit; paired
  with grotesk only (no third serif), so it is not the tired trio.
- Sharp engineered spec-plates with corner coordinates + ruler edges, not
  the default 2–3px bordered card. Genuine dual light/dark surface system,
  not one inverted section. No grain, no pills, no fake browser chrome.
- No-swap test: could not be re-skinned for another prospect — the whole
  system is precision-machining specific. No overlap with the last Astra
  builds (Archetype data-blooms, Toffe candy webshop, Rosalie editorial).

## Imagery (Stage D) — provenance
All images are the client's own, downloaded from their Shopify CDN,
re-encoded to display size (product renders 560px, heroes 1500px), embedded
base64. Roles: establishing world (macro-machining hero, werkplaats-nacht),
product proof (18 machine renders), scale/detail. No stock, no invented
imagery, no third-party logos. Product renders sit on light metrology tiles
(mix-blend multiply) so the white backgrounds read as intentional.

## Human trust (E4/I10) — honest limitation
No verified portraits or public customer testimonials were found for Zynox.
Per the rules, inventing either is banned and showing a named person without
a real face is a hard failure — so the build claims credibility through
**lived operational experience** (the service section: certified experts,
named control brands, in-house moving) rather than fake faces or quotes.
**Asset request to Cas:** a real team/workshop photo and one or two real
customer quotes would lift the human-trust dimension; both are placeholders
to obtain before any public launch.

## Type (C2)
Archivo (variable grotesk, engineered, weight+tracking give the machine-plate
display voice) + IBM Plex Mono (technical numeric readout). Both embedded as
base64 woff2 (Latin subset). Not the serif+grotesk+mono editorial default.
Font-load verified in a real Chromium render (document.fonts.ready), fallback
stack is system-ui/mono so no layout break if fonts are blocked.

## QA (F/I) — all passed
- Overflow-X = 0 at 1440 / 1024 / 390. 0 broken images (22/22 decode).
  0 console errors.
- Interactions clicked & verified: category filter (rondtafels → 4 correct
  cards), detail view opens with decoded image + 13 real spec rows, quote
  form empty-submit flags 3 required fields, valid submit shows success.
- No-JS context: all sections render with height, all 18 cards visible,
  detail view correctly hidden. No meaning lost without JS.
- Scaffolding grep clean (the one "placeholder" hit is the textarea HTML
  attribute).
- No mixed content (fully self-contained, base64). File 1.38MB (< 2MB target).
- Portraits: none shown → verify_portraits N/A (no named faces).

## Density (I1, manufacturing floor 25/900/12)
29 figures (23 img + 6 svg/mark) · ~2769 words · 30 h3. Cleared.

## Weighted score (G1) — 90/100, zero hard failures
Brand specificity 14/15 · Narrative 13/15 · Imagery/art 14/15 · Workflow
completeness 13/15 · Real proof/human trust 12/15 (the human layer is the
one soft spot — no real faces/testimonials available) · Buyer fit 9/10 ·
Conversion 5/5 · Interaction/a11y 4.5/5 · Technical 5/5. **= 89.5, rounded
to 90.** No G2/I16 hard failure tripped. The single dimension holding it
back (human trust) is an asset-availability limit, disclosed above with an
asset request, not a build defect.

## Coverage Ledger (G4)
- **Facts used:** 35+ yr expertise, CE, micron/arc-second specs, real per-
  machine specs (18 machines), 4 real services, real contact, real palette.
- **Deliberately excluded (unverified):** "since 1990" (their site says 35+
  years, not a founding year); any customer names/logos; any price numbers
  (theirs are broken, ours would be invented) → replaced with Prijs op aanvraag.
- **Assets:** 18 product renders + 3 brand photos + logo, all client-owned,
  re-encoded, provenance = zynox.nl CDN.
- **Missing-asset requests:** real team/workshop photo; 1–2 real customer
  quotes. (For human-trust lift before public launch.)
- **Workflows shown:** the buy journey (browse catalog → machine detail →
  request quote → success/confirmation) end-to-end; the service model
  (4 lines) summarised. Quote is the real conversion; forms simulated
  (validates + success), behaves as production, no scaffolding text.
- **Routes built:** home view + machine-detail view (any of 18 machines).
  Other routes (per-category landing pages, full service page, about page)
  are represented as sections + logged here as deferred for a production build.
- **Interactions tested:** filter, detail open/close/keyboard-Esc, form
  validation + success, native details specs, no-JS fallback.
- **A11y:** aria on filter tabs (role=tab/aria-selected), dialog aria on
  detail, focus-visible states, reduced-motion respected, semantic headings/
  landmarks, alt text on every image.
- **Unresolved risks / next steps to production:** obtain team photo +
  testimonials; connect the quote form to a real endpoint/CRM; build the
  deferred category/about routes; localise & optimise images as separate
  assets rather than base64 for a production deploy.

## Send plan (H2/H3)
Deploy to Netlify site `astra-zynox-prototype`, verify 200 + byte size + hash
+ title live, then a Dutch send-note to Cas (active-interest tone: he already
said "ik ben benieuwd") that references the €0,00 fix implicitly and steers
toward a short call. No dashes/colon in the outreach text.

## Motion elevation (2026-08-27, "100 people made this" pass, Raka directive)
Raka challenged this build to the same WOW/motion bar as HotGreen. Added,
authentic to CNC (not a copy of HotGreen's thermal concept):
- **Live machining hero** — a canvas toolpath simulator: a real part program
  (rounded-rect profile + centre pocket + four holes) is cut in real time,
  with rapid vs cutting moves, a glowing red cut trail, flying chips, and a
  tool crosshair, over a darkened real-machining photo + coordinate grid.
- **Machine-controller HUD** — a live DRO panel (X/Y/Z + FEED + RPM) that
  tracks the tool position in mm; the nav DRO ticks with it.
- **Scroll = Z depth** — a fixed depth spine (Z 0 to 120, "DIEPTE") whose
  marker plunges as you scroll, and the nav Z reads depth once past the hero.
- **Rotary indexing dial** — in the Tolerances section, an SVG rotary table
  that indexes in discrete steps, matching the Z-H500's arc-second story.
- **Count-ups** (35+, 96, 2650 N·m), **subtle card tilt** on the catalog
  plates, magnetic button lift.
All guarded: `prefers-reduced-motion` renders a static full toolpath outline
and disables tilt/dial/counters-animation; no-JS keeps every section and all
18 machines readable; canvas is DPR-capped and paused off-screen / when the
tab is hidden. Re-QA after the pass: overflow-X 0 at all three widths, 0
broken images, 0 console errors (incl. reduced-motion), filter/detail/form
intact, no-JS full render. New score ~93 (art direction and interaction both
up a notch; human-trust unchanged).
File updated: bytes 1423385, sha256
6c915ba41cca5603116fdf4814de18871d4fcb474d5adb9fa51be603634eedfc.
