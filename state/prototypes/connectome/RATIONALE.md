# Connectome — prototype rationale and coverage ledger

Contact: Lucas Scherdel, Co-Founder & CEO, Connectome (Connectome GmbH, Zurich;
brain performance studio in Soho, London).
Live site: https://connectome.health
Build date: 2026-08-18. Angle number: 1.

---

## H1 — Promised concept, quoted verbatim from the thread

From the 2026-07-23 opener:

> "Our agency sketched a **consumer scan journey** that explains the experience
> and leads directly into booking, so you can turn more of the launch interest
> into studio appointments."
> "the website still leads visitors into a partnership enquiry rather than
> **showing individuals what happens during a scan, what they receive and how
> the longitudinal journey works**."

From the 2026-08-18 reply exchange:

> Lucas: "is it a video?"
> Raka: "not a video, it's a **short webpage mockup that walks through what a
> scan visit looks like end to end**."

**Binding requirements this sets:** (1) consumer-facing, not partner-facing;
(2) what happens during a scan; (3) what you receive; (4) how the longitudinal
journey works; (5) ends in booking; (6) reads as a webpage walkthrough.
All five are built. See the Site Completeness Contract below.

---

## Stage 0.1 — Deliverable mode

**Full prototype.** Raka asked for "the prototype" with no slice qualifier, so
per Stage 0.1 the mode is full prototype, not concept slice. That triggers I7
(real IA, ≥6 nav destinations, ≥2 routes as separate views), I8 (a real working
form), and the B2B-software density floor in I1.

---

## Stage A1 — What the business actually is

- **Sells:** repeated, quantified measurement of cortical activity using fNIRS
  (functional near-infrared spectroscopy), delivered both as a B2B measurement
  platform and, since the Soho studio opened, as a consumer studio visit.
- **How it makes money:** platform/partnership deals with performance
  organisations, clinics and research platforms, plus consumer studio scans.
- **The verified gap the concept addresses:** every call to action on the live
  homepage is partner-facing. Confirmed 2026-08-18 by fetching the live page and
  grepping every CTA: "Let's Talk" (hero), "Let's talk" (closing, ×3),
  "Partner with confidence", "If you're exploring how cognitive intelligence can
  support performance, health, and decision-making **across your organisation**".
  Nav is Home / Our science / About us / Talk to us / Refer / Blog & Press /
  Manifesto / For Performance / For Clinics / For Platforms & Research / Join the
  Lucid Study / Join the ADHD Study. There is **no consumer route**: no studio
  page, no "what happens at a scan", no booking path, no pricing. Site is Framer.
  This was verified positively (enumerating actual routes), not assumed from a
  missing menu item, per the negative-claim rule.

## Stage B1 — Evidence classification

**Verified fact** (own live site, fetched 2026-08-18)
- Partner-only CTAs and nav, as enumerated above.
- Product/system names: **Atlas, Library, Continuum, Horizon, Forge API,
  Foundry**. These are their real internal platform names.
- Their own measurement vocabulary, lifted verbatim from their homepage UI:
  "Delta from Baseline", "Confidence: Moderate (5 data points, good quality)",
  "Stability: High (ICC 0.78)", "Quality: Good", "Observed change: Mild decrease
  vs baseline", and the sensitivity note "This metric is sensitive to sleep
  deprivation, caffeine intake, and task engagement".
- Positioning line: "The measurement layer for understanding cognitive state
  over time; across people, contexts, and environments."
- Rufus Mitchell-Heggs, PhD, Co-Founder & CSO. Connectome GmbH, 8049 Zurich.
- Brand palette sampled from their served CSS: #0099FF electric blue (223
  occurrences), #1E1E1F near-black, #7D93FB periwinkle (their data-viz colour),
  #000947 deep navy, #828282 grey.
- Brand typeface: **Geist** (+ Geist Mono), loaded from Google Fonts on their
  own site.
- Brand mark: a soft blue radial gradient orb, used on both light and dark.

**Company-reported claim** (press, i.e. their own PR)
- fNIRS measures oxygenated blood flow through the cortex with "millisecond and
  millimetre precision"; "a safe, non-invasive method". Their own analogy:
  "flying a drone over a city to spot where the traffic flows fastest and
  brightest." (tech.eu)
- Output: a personalised cognitive profile covering **attention, cognitive load
  and memory**; an app tracking how metrics evolve after each scan; personalised
  protocol recommendations; a **"routing architecture"** map of how information
  flows across an individual's cortex. (tech.eu, neurofounders.co)
- Scherdel: "Your brain is more plastic than blood biomarkers, for example. So
  people want to see every month." (tech.eu)
- Scherdel: "The brain is the largest untapped source of peak performance and
  longevity, and you can't take care of what you can't clearly see or reliably
  measure." (trendhunter)
- Mitchell-Heggs: "Most people never scan their brains; they have no indication
  of what's going on at any point in time." (neurofounders.co)
- Soho, London brain performance clinic is open; clients can "book a scan, get
  insights into their cognitive performance, and track changes over time."

**Source conflict, handled not hidden**
- Session length is reported as **20 minutes** by neurofounders.co and
  **30 minutes** by tech.eu. I did not pick one and assert it. The page says
  "twenty to thirty minutes" for the scan block and carries no other invented
  minute counts.

**Unknown — deliberately excluded from the page**
- **Pricing. Nothing is public, so no price appears anywhere on the prototype.**
  This is the single biggest open item: a consumer conversion page normally
  needs it. Logged as an asset/fact request rather than invented.
- The specific cognitive tasks performed during a scan (press says only
  "interactive tasks"). The page therefore describes the task block by what it
  measures, never by inventing named tests.
- Soho studio interior detail. An early search summary described "warm wood,
  calm light, and a concrete reception desk"; a direct fetch of that source did
  **not** confirm it, so it is not used anywhere. No interior is described.
- Opening hours, address, transport, accessibility, clinician names and
  qualifications, return-visit intervals, data retention and GDPR specifics.

## Stage B3 — Red team

- *Wrong person or company?* No. LinkedIn `lucasscherdel`, Connectome Health,
  matches the named founder in three independent press pieces.
- *Has it pivoted?* The opposite: the studio opening is what created the gap.
- *Is the flaw commercially important?* Yes. They are paying for consumer
  launch interest with no consumer destination to send it to.
- *Does another page already resolve it?* No. Enumerated every route; none is
  consumer-facing.
- *Is it an intentional choice serving another goal?* Plausibly, the B2B
  platform sale is the bigger deal. The prototype therefore **does not remove
  the partner path** — it keeps a partner route in the nav and a partner exit in
  the footer, and adds the consumer path alongside it.

---

## Stage C1 — Governing concept

> **A first scan is not a verdict, it is the first point on your own curve —
> so the page is built as that curve, and it refuses to mean anything until it
> has repeated.**

This could not be swapped onto another client: it is Connectome's actual
scientific claim (within-person baselines, "Delta from Baseline", ICC
stability) turned into the structure of a consumer page. It is also
commercially the honest move for them: it undersells visit one and sells the
programme, which is what a longitudinal business needs.

**Layers it controls (spec requires ≥5; this controls 7):**
1. **Composition/grid** — a measurement axis runs down the page as a fixed
   spine; every section is a point on it.
2. **Interaction** — the signature device is a baseline chart that *builds*
   as you step through visits, and whose interpretation text changes honestly
   with the number of data points.
3. **Colour** — chroma encodes data density. Measured points are #0099FF;
   unmeasured/future states are grey. Colour is information, not decoration.
4. **Copy voice** — every claim is qualified the way their own product UI
   qualifies claims (confidence, stability, quality, sensitivity).
5. **Navigation** — routes are named for their real systems and journey stages.
6. **Iconography/section furniture** — status chips reuse their real
   Confidence / Stability / Quality vocabulary.
7. **The ending** — closes on the loop returning, not on a feature grid.

**Three brand adjectives, each evidenced:** *measured* (their UI leads with
confidence intervals, not scores); *plain-spoken* (Mitchell-Heggs' "most people
never scan their brains" is blunt, not clinical); *optical* (the whole product
is light through tissue, and the brand mark is a lit sphere).

**Three anti-adjectives:** not *spa*, not *dashboard*, not *diagnostic*.

**Anti-references, concrete:** must not read as a luxury longevity clinic
(Neko/wellness soft-focus), must not read as a generic SaaS dashboard page,
must not read as a private GP's "book a consultation" template.

## Stage A3 — Category triangulation

- **Inherit from the client:** Geist and Geist Mono (their real typefaces),
  the #0099FF / #7D93FB / #000947 palette sampled from their CSS, the orb mark,
  their measurement vocabulary, their real system names, and their own light,
  clinical-but-warm asset world.
- **Learn from the category** (Neko Health, Function Health, Zoe): consumers
  will not book a body-measurement service without knowing what physically
  happens to them, what they walk out with, and what the ongoing commitment is.
  All three are answered explicitly here.
- **Avoid from the category:** the serene-person-in-a-white-room hero with a
  "your health, decoded" headline. Nothing was copied from any of them.
- **Adjacent influence:** scientific instrumentation logbooks and growth/tide
  charts — repeated measurement as a visual culture. This is where the spine,
  the ruled axis and the tabular figures come from, and it is what keeps the
  page from drifting into wellness softness.

## Stage C2 — Typography

**Geist (variable) + Geist Mono.** Chosen because they are demonstrably the
client's own typefaces, pulled from their served stylesheet — the same
"honour the real brand font as evidence" move that Libre Baskerville got on the
That Animation Company rebuild. Geist Mono carries every number, status chip
and axis label, which is functional rather than decorative: this is a product
whose real UI displays ICC values and deltas, and tabular figures are how such
values are read.

Loaded as base64 `@font-face` (Latin subset, 2 files, ~52KB raw) because the
Artifact CSP and this sandbox both block font CDNs (F1).

**Why this is not the last three prototypes' pairing:** no editorial serif at
all, which is the exact recipe C3 blacklists and which Point Audit, That
Animation Company and Voortman & Baumhauer all converged on.

## Stage C4 — Cross-project collision test

Most recent unrelated prototype is **Greentic** (2026-08-17): dark slate
(#131922 / #19212c), green accent #12bd83, Space Grotesk + Inter + JetBrains
Mono, dark technical SaaS.

Connectome's own brand is *also* nominally dark-plus-one-accent, which is
exactly the collision risk I9 warns about. Resolved by evidence rather than by
preference: **their real asset library is predominantly light** — white
backgrounds, pale lilac and blue gradient washes, a light-filled studio
photograph, portraits on near-white. So the prototype is built light, which is
both the more honest inheritance and a deliberate divergence from Greentic.

| Convention | Greentic | Connectome | Overlap |
|---|---|---|---|
| Palette family | dark slate + green | light + blue/periwinkle | no |
| Font archetype | Space Grotesk + mono | Geist + Geist Mono | partial (mono) |
| Hero composition | standard SaaS stack | measurement spine + building chart | no |
| Section order | problem→mechanism→proof→CTA | visit timeline → curve → report → book | no |
| Card system | bordered cards | ruled rows and axis-pinned blocks | no |
| CTA style | button | staged booking form | no |

One partial overlap (mono for numerals), directly justified by client evidence.
Under the two-overlap threshold.

---

## Stage 0.2 / G4 — Site Completeness Contract and Coverage Ledger

Status recorded at delivery.

| Route / area | Status |
|---|---|
| `#visit` The visit, end to end | **Required, built** as a separate view |
| `#baseline` Your baseline (the curve) | **Required, built** as a separate view |
| `#report` What you receive | **Required, built** as a separate view |
| `#science` How it works (fNIRS) | **Required, built** as a separate view |
| `#studio` Soho studio | **Required, built** as a separate view |
| `#book` Booking | **Required, built**, working form with validation |
| FAQ | Required, **built** inside `#book` |
| Partner routes (For Performance / For Clinics / For Platforms) | **Demonstrated in nav and footer, deferred** — they already exist and are good on the live site; the concept deliberately does not replace them |
| Our science / About / Blog & Press / Manifesto / Refer | **Deferred**, present in footer, out of scope for a consumer journey |
| Lucid Study / ADHD Study | **Deferred**, linked in footer |
| Pricing | **Blocked by missing fact.** No public pricing exists. Not invented. Needs Lucas. |
| Account / app login | **Not applicable** to this deliverable |

**Facts used:** all Verified and Company-reported items above.
**Facts deliberately excluded:** pricing, task names, studio interior, hours,
clinician credentials, data-retention specifics, return-visit intervals.

**Open asset/fact requests for Lucas (not shown on the page):**
1. Pricing, and whether visit one is sold separately from the programme.
2. Real studio photography (interior, the scanner, the cap on a person).
3. A real report or app screenshot — the strongest missing proof by far.
4. Confirmed scan duration, to resolve the 20 vs 30 minute press conflict.
5. Studio address, hours, accessibility, and who the client actually meets.

---

## Stage C5 — No-swap test

With the wordmark removed, the page still reads unmistakably as a brain
measurement service: the axis spine, the "Delta from baseline" language, the
Confidence / Stability / Quality chips, the optode and light-path diagrams,
and the periwinkle data curve. Question 3 ("could this be sold to one of the
last three prospects by swapping text, images and accent colour?") is **no**:
the interactive device *is* the client's science, and it has no meaning on a
photographer's, an animation studio's, or Greentic's page.

## Stage D1 / I2 — Asset plan and provenance

33 candidate assets were pulled from connectome.health and reviewed on a
contact sheet before any were placed. 11 were used.

| Asset | Provenance | Role | Placed |
|---|---|---|---|
| Studio interior (clinician + client, tablet) | Client's own site | Human connection, establishing the world | Visit, Studio |
| Swept-line topographic field | Client's own site | Establishing the world, hero | Visit hero |
| Lilac wave graphic | Client's own site | Tactile/atmospheric beat, palette widening | Report |
| Athlete portrait | Client's own site | The result in use / performance context | Studio |
| "Delta from baseline" chart | Client's own site — **real product UI** | Product proof (Proof Ladder level 4) | Report |
| 4 team portraits (Mitchell-Heggs, Schultz, Rosenior-Patten, Snowdon-Farrell) | Client's own About page | Named human expertise (level 5) | Science |
| Brand orb mark | Redrawn faithfully as SVG radial gradient from the client's own mark | Identity (I4) | Header, footer |
| Optode array diagram | **Authored** by Astra, in the client's data-viz language | Process artifact | Visit |
| Light-path cross section | **Authored** | Mechanism | Visit |
| Baseline curve (interactive) | **Authored** | The governing concept, made operable | Baseline |
| 3 deliverable icons | **Authored** | Wayfinding | Report |

**Rejected and why:** all 10 investor and institutional logos (Como Ventures,
Techstone, Players Fund, Jumpspace, Redstone, Imperial, University of Zurich,
Octopus Ventures, Nodes, Concept Ventures) — third-party IP, excluded under
D3, the same call made on Point Audit's real hospitality client logos. Four
further team portraits — the four placed already satisfy E4/I10 without
turning the science view into a staff directory.

**Confirmed absent from the client's entire public asset library** (checked
exhaustively, not assumed): any photograph of the scanner, the fNIRS cap on a
person, the scan in progress, or the report/app itself. This is the single
biggest imagery gap and it cannot be closed without Lucas. It was **not**
papered over with unrelated stock, per D2.

## Stage F — QA results (all scripted, not eyeballed)

Run with Playwright against the built file. Full log kept with the build;
screenshots committed under `qa/`.

| Gate | Result |
|---|---|
| **F4 no-JS assertion** (scripted, `javaScriptEnabled:false`) | **PASS** — all 6 views render with non-zero height (5367 / 3368 / 2335 / 2580 / 3008 / 1706 px) |
| F3 three-viewport render (1440 / 1024 / 390) | PASS — 0 horizontal overflow at all three, all 6 views each |
| F2 asset integrity | PASS — 0 broken images, 0 console errors, 0 page errors at all widths |
| D7 upscaling | PASS — no image displayed above 1.25× its natural width |
| F2b font-load gate | **PASS, and typography is VERIFIED not assumed** — Geist renders (computed `font-family: Geist` asserted on every view); a second render with both faces forced to fail shows 0 overflow |
| F6/F7 interaction states | PASS — all 5 curve states clicked and asserted (point count, pressed count, path); all 6 FAQ items opened |
| F5/I8 conversion journey | PASS — empty submit → 4 errors + 4 invalid fields, success suppressed; invalid email rejected; valid submit → success state; reset restores |
| **I14 scaffolding grep** | **PASS — zero hits** on `illustrative\|prototype\|placeholder\|stock\|concept\|to be supplied\|fig [0-9]\|astra\|not a customer\|mockup\|dummy`. The only `sample` hit is the single approved footer footnote. |
| I1 density (B2B software floor) | **PASS** — 2849 words (floor 1200), 66 h3 (floor 18), 16 figures (floor 15), 21 sections, 2 tables, 1 working form |
| I7 information architecture | PASS — 21 nav destinations, 6 routes built as separate views, grouped 4-column footer |
| Payload | 1.18 MB, under the 2 MB target |

**Two real bugs were caught by these gates and fixed, neither visible by eye:**
1. **The no-JS failure** — the exact bug that has shipped three times before.
   `[hidden]` in the static markup meant five of six views were invisible
   without JavaScript. Fixed by removing the static attribute and hiding only
   under `html.js`, with `[hidden]` carrying `!important` so no display rule
   can ever cancel it. Now asserted automatically, per F4.
2. **33px mobile horizontal overflow on every view** — the header CTA pushed
   off-canvas at 390px. Fixed with a two-row mobile header and a scrolling
   nav.

A third finding was a **measurement artifact, not a defect**: the density
script initially reported 515 words because CSS was still hiding the inactive
views from `innerText`. Re-measured correctly at 2849. Logged here because
I16's companion rule exists precisely to stop a sandbox artifact being
reported as a live defect.

## G1 — Weighted score

| Dimension | Weight | Score | Note |
|---|---:|---:|---|
| Brand specificity | 15 | 14 | Client's real typeface, palette, mark, system names, measurement vocabulary |
| Narrative and emotional pacing | 15 | 13 | Two three-card rows on the visit view repeat a rhythm |
| Imagery and art direction | 15 | 13 | Every visual authentic; coverage gap on the scan moment itself |
| Workflow and business completeness | 15 | 13 | Full loop closed; pricing blocked by missing fact |
| Real proof and human trust | 15 | 13 | 4 named real portraits, 3 attributed real quotes, real product chart; no public customer proof exists |
| Buyer fit and objection coverage | 10 | 9 | Consumer fully served; partner route preserved |
| Conversion completeness | 5 | 4 | Real validated form; no price to state |
| Interaction and accessibility | 5 | 5 | Tablist semantics, aria-pressed/live, keyboard arrows, focus-visible, reduced motion, no-JS verified |
| Technical reliability | 5 | 5 | Clean at three widths, 1.18 MB |
| **Total** | **100** | **89** | |

**Hard failure gates (G2 + I16): zero tripped.**

**Honest position on the threshold: this scores 89, one point under the 90
ship bar.** The shortfall sits almost entirely in three cells, and all three
are blocked on material only Lucas can provide: photography of the scan
itself, a real report or app screen, and pricing. It is not fixable by more
build effort, and inventing any of the three would trip G2. My recommendation
is to send it and make the gap part of the conversation, since "give us the
scanner shots and the real report and this gets sharper" is a true statement
and a natural reason to talk. Raka's call.


---

## Delivered artifact

- File: `state/prototypes/connectome/index.html`
- Bytes: **1233017**
- sha256: **4e987716c04a2158c010a1d12f8a30bffba9da647354ce643f1b5c20dfe66a9b**
- `<title>`: `Connectome — Brain measurement studio, Soho London`
- QA screenshots: `state/prototypes/connectome/qa/`

The full QA suite was re-run **against this exact repo file** (not the
scratchpad build) after the final edit, and passed with zero failures. The
byte count and hash above are what a Netlify-enabled session must verify
before deploying, per the handoff in `HANDOFF-NETLIFY.md`.

## Late addition after visual review

The Soho studio view originally ended after a single note card. Under I11
("the ending is a stack") that is stopping, not closing. Added a four step
"what happens next" sequence, two secondary routes (the scope page for people
who want to ask something first, the partner route for organisations), a
getting-here note, and a closing booking band. Studio view grew from 2061px
to 3008px and the baseline view from 1811px to 3368px across the two
material passes.
