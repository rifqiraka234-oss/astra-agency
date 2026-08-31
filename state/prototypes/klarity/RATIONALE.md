# Klarity by Safenai — prototype rationale

**Contact:** Julien Chiaroni (co-founder & CEO, Safenai)
**Company:** Safenai / Klarity (industrial AI governance & observability, France, from CEA research)
**Angle #1.** Julien replied yes to a mockup that makes the three Klarity
products (Contract / Build / Operate) legible to a business reader in plain
language, separating them cleanly instead of the current one-dense-page treatment.

## Governing concept
"Leave the proof of concept behind." Klarity is the platform that takes an AI
model out of the pilot and into trustworthy production. The whole page is
built as a control room: dark instrument surface, Safenai cyan (#5FCCFF) as
the single signal colour, IBM Plex Sans + Plex Mono (the engineering register),
and a live drift monitor in the hero that shows what Operate actually does.

The concept controls: palette (control-room dark + one cyan signal), type
(Plex Sans display + Plex Mono for instrument labels), the hero monitor
animation, the Contract→Build→Operate lifecycle as the spine of the page, and
the copy voice (measured, engineering-plain, no hype).

## What is real (factual integrity)
- **Product diagrams** — the lifecycle overview and each Contract/Build/Operate
  stage diagram are Safenai's own real product diagrams, embedded as-is.
- **Julien Chiaroni bio** — real: co-founder & CEO; former Director of France's
  Grand Défi for securing, making reliable and certifying AI systems (General
  Secretariat for Investment); research and programme leadership at CEA Leti
  and CEA List. Portrait is his real photo from safenai.io.
- **Team trio** (Julien / Loïc / Fabien) — real photos from safenai.io/images/team,
  first names only (surnames/roles not asserted beyond what is verified).
- **Backers strip** — CEA, IRT SystemX, European Trustworthy AI Association,
  OVHcloud (Startup Program member). Rendered monochrome light-ink on the dark
  ground for legibility; logos are the real marks.
- **Business cases** — Visual inspection, Infrastructure monitoring, Maintenance
  optimisation, Object detection & tracking (Safenai's real case library), plus
  a "Your business case" bespoke card.

## What is deliberately labelled, not claimed
- The hero drift monitor carries "Illustrative, showing how Operate flags drift.
  Not live customer data." — it is a designed animation of the behaviour, not a
  real customer feed.
- The contact form carries "Prototype form · no data is sent." — nothing posts.
- No invented customer names, metrics, prices, or testimonials anywhere. The
  only quote is Julien's own public positioning line about trustworthy AI.

## Interaction / workflow coverage
- Contract / Build / Operate lifecycle tabs (role=tab/tabpanel, aria-selected,
  ArrowLeft/Right keyboard, each panel = plain "what you get / who" + the real
  stage diagram).
- Live SVG drift monitor: drifts, detects a breach, turns the trace to the warn
  colour and raises an alert; IntersectionObserver starts it in view; static
  fallback under prefers-reduced-motion.
- Talk-to-the-team form with role select + use-case field, full validation
  (name / company / work email / use case), error states and a success state.
- Reveal-on-scroll, gated behind `html.js` so everything renders with JS off.

## QA (Playwright)
- 0 horizontal overflow at 1440 / 1024 / 768 / 390 / 360.
- 0 console errors, 0 page errors.
- All 12 images decode (2 sit inside hidden tab panels and decode on reveal).
- Lifecycle tabs switch panels; form shows 4 error markers on empty submit.
- No-JS: all 3 lifecycle panels and all 12 images render.
- Self-contained single file: 5 woff2 faces + 12 images embedded as data URIs.

**Artifact:** `state/prototypes/klarity/index.html`
**Bytes:** 931818
**sha256:** 59ece01b6e7e1deefe1052fdce0351956b99f7f41360ff37529fe17e1439207d
**Netlify site (to create):** astra-klarity-prototype
