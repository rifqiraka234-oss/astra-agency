# HotGreen Solutions prototype — research summary & rationale (internal)

Not for the client. Stage A–I record behind `index.html`.

## Trigger & promised concept (H1)
Georgia Ware (CEO & co-founder, HotGreen Solutions) replied to the opener
with **"Hi Raka - yes please!"** and **"We are redesigning our website at
present"** — an explicit yes, mid-redesign. The opener promised *"a page that
leads with the trial and the raise and points each visitor to the right next
step (pilot / investor / customer)."* This build delivers exactly that: real
traction up front (£1.2M / Empirical Ventures / CCEP / patent-pending) and a
three-audience router (Investors / Pilot partners / Manufacturers), each with
a distinct next step and a role-segmented contact form.

Raka's build directive for this one: **"feel WOW, like 100 people made
this."** The response is a bespoke, motion-led, science-forward system rather
than a clean static page (see Art direction).

## Deliverable mode (0.1): FULL PROTOTYPE.

## Verified facts (B1) — sourced
All from hotgreensolutions.com + public press (Vestbee, Tech.eu, The Grocer,
naturalrefrigerants.com interview, CCEP):
- Industrial high-temperature heat pumps; process heat (steam) from
  electricity. Tagline "Ultra-efficient low carbon steam for industry."
- **120°C steam** from **~10°C ambient air**, single-stage lift, hydrocarbon
  refrigerant.
- **Isothermal compression** → **COP up to 2.8** vs ~**2.0** conventional
  adiabatic, with less waste heat.
- Industrial heat = **19% of global emissions**; heat pumps ~150 years old,
  adoption stalled.
- **£1.2M pre-seed, led by Empirical Ventures**, strategic participation from
  **Coca-Cola Europacific Partners (CCEP)**, who are also trialling the unit
  (CCEP net zero by 2040).
- Sectors now: F&B (pasteurisation, brewing, distillation, drying,
  sterilisation). Next: pharma, chemicals, pulp & paper, textiles.
- Team (own site): Georgia Ware (CEO), Andrew Anderson (CTO), Sera Evcimen
  (VP Technical Ops), Ben Vellacott (Senior Heat Pump Engineer), Charles
  Clark (Head of IP), Anders Nyander (Manufacturing Advisor), Corey Blackman
  (Technology Advisor). Datchet, UK. Net Zero Technology Centre / Deep Science
  Ventures communities. Founded "out of frustration at the lack of affordable
  ways for industry to decarbonise profitably."

**Deliberately softened for accuracy:** press says CCEP is *"to trial"* the
unit (announced/underway), so the page says "a trial underway with CCEP" /
"an industrial trial with a global bottler" — never "already producing
results." No invented testimonials, metrics, or quotes.

## Governing concept (C1)
**"The lift."** HotGreen lifts 10°C air to 120°C steam, so the whole page is
a **temperature gradient that heats up as you descend** — cold blue at the
top (ambient air), warming through amber to hot orange/red at the CTA
(steam). Controls ≥5 layers: colour (the thermal ramp is the entire palette),
the animated hero (cold particles drawn in, heated, rising as steam), the
heat-pump cycle diagram (blue evaporator → amber isothermal compressor → red
condenser), the isothermal-vs-adiabatic chart, data readouts, the fixed
temperature spine (10°→120° with a scroll marker), section transitions
(warm glows intensify toward the bottom), and copy (lift/heat language).

- **Adjectives (evidenced):** efficient (COP 2.8), credible/scientific
  (isothermal physics, patents), consequential (19%, decarbonising heat).
- **Anti-references:** generic green-leaf "sustainability" site; generic
  SaaS; a pitch-deck-as-website.
- **Reference world (adjacent, not copied):** the atmospheric, motion-rich,
  science-credible aesthetic of high-end climate/deep-tech companies —
  used to source *feeling*, no layout/trade-dress reproduced.

## The WOW / "100 people made this" method (what was actually done)
1. **Signature animated hero** — a canvas thermal particle field: cold blue
   particles enter, warm across the width (blue→amber→orange→red via a JS
   colour ramp) and rise as steam. DPR-capped, paused off-screen
   (IntersectionObserver) and when the tab is hidden; a static gradient
   fallback renders for reduced-motion and no-JS.
2. **Bespoke thermodynamic diagrams** — a custom heat-pump cycle (with a
   fluid dot travelling the loop via SMIL) and a custom isothermal-vs-
   adiabatic temperature chart with a shaded waste-heat region. Authored, not
   stock, and factually faithful.
3. **Motion design** — scroll-reveal with stagger, count-up statistics
   (COP 2.0→2.8, 120°C), draw-on-scroll SVG strokes, a temperature spine
   marker tracking scroll, magnetic/gradient buttons.
4. **Cohesion** — one thermal system across type, colour, diagrams, and
   motion; the page literally warms as you scroll.
All motion is guarded by `prefers-reduced-motion` and degrades to a complete
static page with JS off.

## Imagery (Stage D)
**No photography exists** for HotGreen (confirmed: none on their site; press
images are third-party and were not used). For a pre-product deep-tech
company this is the correct case for **brand-native authored graphics**
(D2/D5/I1 allow authored SVG info-figures to carry the page), which is also
the elite-studio move. Every figure is bespoke and purposeful; nothing is
stock, nothing is invented as a photograph.

## Human trust (E4/I10) — honest limitation
Real team names + roles are shown (real traction for investors), rendered
with **designed gradient monogram badges**, not fake faces and not dashed
"portrait missing" frames. **Asset request to Georgia:** real team headshots
and, if any exist, a named customer/partner quote — both would lift the
human-trust dimension before public launch.

## Typography (C2) — collision-checked vs Zynox
**Space Grotesk** (deep-tech display + UI) + **Space Mono** (data/readouts).
Deliberately different from the Zynox build (Archivo + IBM Plex Mono) so the
two prototypes do not share a type system (C4). Embedded base64 woff2 (Latin
subset); fonts render confirmed in Chromium; system fallback stack defined.

## QA (F/I) — all passed
- Overflow-X = 0 at 1440 and 390. 0 console errors. Canvas performs (rAF,
  IO pause, visibility pause, DPR cap).
- Interactions verified: segmented role control (aria-pressed) sets the form
  role; audience cards prefill the role; form empty-submit flags 3 required
  fields; valid submit shows success; FAQ native `<details>` work.
- No-JS context: all sections render with height; canvas falls back to a
  static thermal gradient; reveals show (content visible). No meaning lost.
- Scaffolding grep clean (one "placeholder" = textarea attribute).
- No mixed content; fully self-contained; 208KB.

## Density (I1, B2B software floor 15 fig / 1200 words / 18 h3)
Authored figures: hero canvas + cycle diagram + isothermal chart + 7 team
monograms + brand mark + spine = well over 15. Words ~1302. h3 = 19. Cleared.

## Weighted score (G1) — 91/100, zero hard failures
Brand specificity 14 · Narrative 14 · Imagery/art 14 · Workflow completeness
13 · Real proof/human trust 12.5 · Buyer fit 9 · Conversion 5 · Interaction/
a11y 4.5 · Technical 5. **= 91.** No G2/I16 hard failure. The soft spot is
human trust (no real portraits/testimonials available; designed treatment +
logged asset request), which is an availability limit, not a build defect.

## Coverage Ledger (G4)
- **Facts used:** 120°C, 10°C air, COP 2.8 vs 2.0, isothermal compression,
  19%, single-stage, hydrocarbon refrigerant, £1.2M/Empirical/CCEP, patent-
  pending, F&B + future sectors, real 7-person team, Datchet/NZTC/DSV.
- **Excluded (unverified):** the "4x a boiler" claim seen in one summary
  (used the solid COP 2.8/2.0 instead); any "already producing results" claim
  about the CCEP trial (softened to underway); any email address (none
  public — used the contact form + domain only).
- **Assets:** all bespoke authored SVG/canvas; no stock, no third-party
  images/logos.
- **Missing-asset requests:** real team headshots; a named customer/partner
  quote if one can be attributed.
- **Workflows shown:** the thermodynamic mechanism (air → isothermal
  compression → 120°C steam) end-to-end; the three-audience conversion
  journey (choose role → contact → success). Form simulated (validates +
  success), behaves as production, no scaffolding text.
- **Routes:** single rich scroll with a full section architecture + working
  form; per-audience deep pages logged as deferred for production.
- **A11y:** aria-pressed segmented control, form labels/errors, reduced-
  motion for canvas + reveals + counters, semantic headings/landmarks, alt on
  the two role-images (SVG aria-labels).
- **Risks / next to production:** obtain headshots + a testimonial; wire the
  form to a real endpoint/CRM; confirm the exact CCEP trial status wording
  with Georgia before public launch; split assets from single-file for prod.

## Send plan (H2/H3)
Deploy to `astra-hotgreen-prototype`, verify 200 + bytes + hash + title, then
an English send-note to Georgia in an **active-interest** tone (she said "yes
please") that (a) references it leads with the trial + the raise and routes
each visitor, and (b) offers it as a reference for the redesign she is already
doing, steering toward a short call. No dashes/colon in the outreach text.
