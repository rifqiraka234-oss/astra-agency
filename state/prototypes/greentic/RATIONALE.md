# Greentic.ai prototype — delivery rationale and coverage ledger

**v2, rebuilt 2026-08-17 under Round 3** (`docs/prototype-framework-addendum-round-3.md`),
on top of the Round 1 and Round 2 rules in `docs/prototype-build-spec.md`.
For Maarten Ectors, CEO and co-founder, Greentic AI Ltd, who replied
"Ok please send it" on 17 Aug.

---

## Promised-concept fidelity gate (H1)

Verbatim from the sent LinkedIn message (17 Aug, 12:13):

> "the site stops at that one line, so a buyer cannot tell what it does or who
> it is for, and most will just leave. We sketched a page that answers both."

**Accuracy correction, unchanged from v1 and still important:** the "stops at
one line" premise was wrong. greentic.ai is a full marketing site. What
survives is "cannot tell who it is for", plus the genuinely missing pieces
below. The draft message does not repeat the false claim.

Verified by grepping the full 574KB bundle: **zero** matches for "Maarten",
"Ectors", "founder", "team", "case study", "testimonial", "trusted by",
"pricing". Routes are only `/`, `/partners`, `/privacy`, `/terms`.

---

## What changed from v1, and why

v1 scored 87 and passed every Round 2 gate. Measured against the Round 3
density floor for B2B software it failed on one axis and it was the axis Raka
had been complaining about all along.

| Round 3 floor (B2B software) | v1 | v2 |
|---|---|---|
| Figures ≥ 15 | **0** | **15** |
| Words ≥ 1200 | 1732 | 2943 |
| h3 ≥ 18 | 27 | 29 |
| Real routes ≥ 2 | **0** | **3** |
| Nav destinations ≥ 6 | 5 | **6** |
| Working form | 1 | 1 |
| Designed brand mark | **none** | **yes** |

### Additions 33 to 46, as applied

- **33 density floor** — all three floors now pass. See the bench below.
- **34 asset oversupply** — 428 real Greentic content strings were extracted
  from the bundle as the working pool, roughly 10× what the page uses.
- **35 image role quota** — the 15 figures cover 7 roles: establishing world
  (shift board), product artifact (3 run logs, run record), process artifact
  (3 flow diagrams, anatomy, topology), state vocabulary (macro detail),
  transformation (before/after handoffs), scale (department coverage),
  conversion reassurance (pilot timeline). No role exceeds 50%.
- **36 brand mark** — **the audit tick is the logo.** "Green‑tic" contains the
  word, the ✓ is the glyph the run log already writes on every executed step,
  and it appears at three scales: nav mark, footer mark, and every log line.
  The mark and the product's core artifact are deliberately the same shape.
- **37 nomenclature test** — the shift-log concept names **eight** page
  elements: sections (The roster, On shift, The handover, The choice, The
  path, Clock in), the CTA verb ("Put one on shift"), the state vocabulary
  (ON SHIFT / WAITING / STOPPED / PENDING), worker metadata ("On shift in"),
  the run record ("signed"), the footer sign-off ("End of log"), the board,
  and the rail numbering. Well past the required four.
- **38 no flat sections** — 29 h3, 3 real tables, a 5-item FAQ, 8 sub-named
  process rows, a 5-row partner-type table.
- **39 real IA** — 6 nav destinations and **3 genuinely separate views**
  (shift log, roster, network) behind a hash router, plus a 4-column footer
  with grouped links.
- **40 conversion apparatus** — real form with required fields, validation,
  error state, success state, privacy line, all labelled prototype behaviour.
- **41 colour budget** — deliberately widened. Greentic's own identity is a
  Lovable/shadcn default (dark + emerald + glow), which is exactly the AI
  outlier Round 3 warns about, so there was very little real identity to
  inherit. Kept the emerald because it is in the name, dropped the glow
  entirely, added amber (waiting) and red (stopped) as a genuine **status
  system** rather than decoration, and inserted a **cream "handover" band**
  mid-page for pacing contrast, the way Alan Sabin drops a cream section into
  a dark page. The paper band is justified by the concept: a run record is a
  printed handover document.
- **42 human presence** — Maarten is a required section. **No portrait is
  available**, so the layout carries an explicit labelled placeholder and an
  asset request. No quote has been invented for him.
- **43 ending stack** — six closing moves: restated promise, week 00/01/02+
  mechanics, working form, 5-question FAQ (including an honest "we do not
  publish pricing and this page invents none"), secondary routes for the not
  yet ready, and a real 4-column footer.
- **44 bench render** — see below.
- **45 restraint vs emptiness** — every large empty area now frames a figure,
  a table or a record. No section relies on whitespace to imply quality.
- **46 truthful rendering** — the QA harness forces fonts ready, scrolls,
  waits, and separates sandbox failure from real failure before any judgement.

---

## Bench (addition 44)

Rendering competitor mirrors side by side would have been dishonest here:
Lumiform and SafetyCulture are JS-driven and my mirrors of them render
broken, which would have made this page look better by comparison for the
wrong reason. So the bench is numeric, counted from each site's served HTML.

| Page | sec | h2 | h3 | words | figures | forms | routes |
|---|---:|---:|---:|---:|---:|---:|---:|
| **Greentic v2 (this build)** | 11 | 10 | 29 | 2943 | 15 | 1 | 3 |
| Greentic v1 | 8 | 7 | 27 | 1732 | 0 | 1 | 0 |
| Lumiform (category leader) | 4 | 9 | 23 | 2383 | 40 | 0 | — |
| SafetyCulture (category leader) | 21 | 15 | 14 | 1445 | 37 | 0 | — |
| Astra hand-built average | 10 | 10 | 18 | 965 | 6 | 1 | — |

Answering addition 44's three questions honestly:

1. **Which looks thinnest?** No longer this one on structure. On *imagery* it
   is still thinner than Lumiform and SafetyCulture, which carry 37 to 40
   images each, largely real product screenshots.
2. **Which has most material?** Lumiform, on raw image count.
3. **Would a stranger pick this as template-generated?** No. The tick mark,
   the shift-log nomenclature, the cream handover band and the three routes
   are specific to this business.

The honest remaining gap is that the leaders show **real product screens**.
Greentic publishes none, and inventing dashboard chrome is a Round 1 hard
failure, so this build uses authored information figures instead. That is a
real difference, not a solved problem.

---

## Factual integrity

Every run log, volume figure and record is labelled illustrative in four
places: an amber `ILLUSTRATIVE` chip in each figure header, a figcaption, the
section lede, and the footer. Process steps, systems, timings and comparisons
are Greentic's own. Founder background is from public sources.

**Nothing invented:** no customers, no logos, no metrics, no testimonials, no
integrations Greentic does not list, and no pricing. The partner page
deliberately leaves the second slot marked `SLOT OPEN` rather than filling it
with placeholder logos, which follows the Hermod lesson about honesty as a
design device.

---

## Coverage ledger (G4)

- **Figures:** 15 authored SVG information figures. **Zero photographs**, and
  zero real product screenshots. Greentic publishes neither, and neither can
  be invented. This is the one density axis met by authored material rather
  than captured material, disclosed here per addition 33.
- **Media deliberately excluded:** Greentic hosts five real demo videos
  (`greentic.ai/demos/*.mp4`, 64KB to 231KB). Re-tested this session: this
  container has no ffmpeg and Chromium returns `MEDIA_ERR_SRC_NOT_SUPPORTED`
  (no h264), so their content cannot be verified. Per F2c and F7 they are not
  embedded. **They are a real asset Greentic should feature, and a future
  revision should embed them once a human has watched them.**
- **Asset requests for Greentic:** (1) a portrait of Maarten, (2) permission
  to name one customer, even anonymised by sector, (3) product screenshots.
- **Workflows complete:** 3 end to end, including a human-approval exception
  and a policy-refusal run that stops itself.
- **Workflows summarized:** 6 more in the range table, 8 in the roster.
- **Routes built:** 3 as real views. Routes deferred: `/privacy`, `/terms`
  (not applicable to a concept prototype).
- **Interactions tested:** 4 router transitions, 3 tabs (aria-selected,
  arrow-key roving focus, zero panel leakage), 9 stepper actions, 5 FAQ
  disclosures, 3 form paths.
- **Accessibility:** skip link, focus-visible everywhere, `aria-selected`,
  `aria-current` scoped to the nav only, `role="alert"` on the error,
  reduced-motion respected, and **every run state carries a glyph as well as
  a colour** so nothing is signalled by colour alone.
- **QA:** 1440×900, 1024×768, 390×844. `document.fonts.status === "loaded"`
  with real Space Grotesk and JetBrains Mono computed. No horizontal overflow
  at any width. Zero console errors. JS disabled shows **all 3 views and all
  3 worker panels**.
- **Bugs found and fixed during QA:** (1) the brand mark rendered as a solid
  black square because CSS class selectors do not style `<use>` shadow
  content — fixed with presentation attributes inside the `<symbol>`; (2) the
  run record's labels collided with their values because of `&nbsp;` padding
  — replaced with a real grid; (3) mobile nav wrapped to three rows — fixed
  with a collapse at 880px, with the six destinations still reachable from
  the footer; (4) `aria-current="page"` was landing on every inline link to a
  route — scoped to the nav.
- **Payload:** 223KB against a 2MB target.

---

## Score, Round 2 rubric (90 to ship)

| Dimension | Weight | v1 | v2 |
|---|---:|---:|---:|
| Brand specificity | 15 | 14 | **15** |
| Narrative and emotional pacing | 15 | 13 | **13** |
| Imagery and art direction | 15 | 11 | **12** |
| Workflow and business completeness | 15 | 14 | **14** |
| Real proof and human trust | 15 | 11 | **11** |
| Buyer fit and objection coverage | 10 | 9 | **9** |
| Conversion completeness | 5 | 5 | **5** |
| Interaction and accessibility | 5 | 5 | **5** |
| Technical reliability and performance | 5 | 5 | **5** |
| **Total** | **100** | **87** | **89** |

**89/100. Still one point short of the 90 threshold, and I am not rounding it
up.** No hard failure is tripped.

The two dimensions holding it back are the same two as v1 and neither is a
build-effort problem:

- **Real proof and human trust, 11/15** — there is no customer case study
  because no verifiable customer exists publicly, and the founder portrait is
  a placeholder.
- **Imagery, 12/15** — no photography and no real product screens exist to
  use.

A portrait plus one nameable customer would move this to roughly 93. Under
the spec a sub-90 score means it does not ship as a finished production
candidate; it is sound to send as a concept for reaction, which is exactly
what the thread promised. Raka's call.

---

## v3 addendum — photography added (2026-08-17)

Raka's note: "No usage of pictures? Come on. Make smart use of it, it needs to
feel more human and alive." Correct, and the fix changes the page materially.

### Where the images came from, including the dead ends

| Source | Result |
|---|---|
| Unsplash search | **Blocked.** Search page is JS only; the internal API returns "Authorization required". |
| Pexels API | **Blocked.** Returns "Missing API key". |
| Wikimedia Commons | Reachable, but the results were unusable: a 1990s military desk, a Motorola phone box, a mannequin wearing a headset, CRT era broadcast control rooms. |
| Openverse, default (mostly Flickr) | Mixed. Mostly dated conference photos. |
| **Openverse filtered to Rawpixel** | **Used.** Modern, clean, CC0. This is the one that worked. |

**10 photographs**, all **CC0**, gathered from a pool of 111 candidates
(roughly 11x oversupply, addition 34). Every candidate was rendered as a
contact sheet and looked at before selection; watermarked and cartoon results
were rejected on sight.

### How they are used

Per addition 35 the images carry distinct roles rather than repeating one:

| Placement | Image | Role |
|---|---|---|
| Full bleed band after the hero | Warehouse floor in operation | Establishing the world |
| Customer self-service panel | A request arriving on a phone | The human input the worker takes over |
| IT helpdesk panel | A person at a monitor | The queue being replaced |
| Sales assistant panel | Someone working late at a laptop | Where a lead sits overnight |
| Range section, three up | Packing bench, forklift, staged boxes | The physical reality behind "order tracking" |
| Handover, cream band | Hands at a laptop | Tactile detail |
| The path | People at monitors in a workspace | Who the demo gets shown to |
| Clock in | A laptop open on a desk | Conversion reassurance |

### Honesty rules applied

These are **stock photographs used as context, never as proof**. Round 1's
hard failure is "unrelated stock used as brand proof", so:

- every photograph is captioned in place, and three say **"Stock, not a
  customer"** explicitly;
- none is presented as Greentic, a Greentic customer, or Greentic software;
- a photography credits block in the footer states the licence and source for
  all ten;
- the founder portrait remains a **labelled placeholder**, because no
  photograph of Maarten is available and substituting a stock face for a real
  named person would be a fabrication.

### Technical

- Each image exported at roughly 2x its intended CSS width per addition 23,
  then verified: **0 upscaled, 0 broken, 0 missing alt text**.
- One caught and fixed in QA: the hero band was showing a 1024px source at
  1440px (1.4x upscale, over the 1.25x limit). Swapped to a 1300px native
  source and re-exported.
- Also caught: the worker panels had a large void in the right column while
  the left ran long. The flow diagrams were moved into the right column to
  balance them, per addition 45.
- Payload **1.29MB**, against the 2MB target. Base64 embedding is used because
  this deliverable is explicitly a single portable file for Netlify and the
  Artifact CSP, which is F8's stated constrained handoff exception.

### Revised figures

| Metric | v2 | v3 |
|---|---:|---:|
| Photographs | 0 | **10** |
| SVG information figures | 15 | 15 |
| Total figures | 15 | **25** |
| Words | 2943 | 3234 |
| Page height | 10207px | **12926px** |

### Revised score

Imagery and art direction moves from 12/15 to **14/15**: the page now has real
human presence and genuine pacing contrast, and the only thing still missing
in that dimension is Greentic's own product screenshots, which do not exist
publicly.

Real proof and human trust stays at **11/15**, unchanged. Stock photography is
context, not proof. It does not substitute for a customer case study or a
portrait of the founder, and it was not scored as though it did.

**Total: 91/100.** This is the first version to clear the 90 threshold. The
two client-supplied assets (a portrait of Maarten, one nameable customer)
would still take it to roughly 95.

---

## v4 — every trace of the build process removed from the page (2026-08-17)

Raka, on seeing "Stock, not a customer" printed under a photograph:

> "Can you please NEVER use captions like this on prototype environment. Treat
> prototype environment as PRODUCTION FINAL environment."

He is right, and this was my own spec being broken. Round 1's rule E3 says the
prototype must read as the proposed client website. I had read E3 as banning
*critique of the old site*, and so let build-process scaffolding through on the
grounds that each piece was honest. Collectively they turned a client website
into an annotated internal document.

### What was on the page, and is now gone

| Removed | Count |
|---|---|
| Amber `ILLUSTRATIVE` / `ILLUSTRATIVE VOLUMES` / `ILLUSTRATIVE SHAPE` chips | 8 |
| "Fig 1." to "Fig 16." academic figure captions | 16 |
| Photo captions disclosing provenance ("Stock, not a customer", "Illustrative") | 9 |
| "Illustrative photography &middot; CC0" on the hero band | 1 |
| Dashed "PORTRAIT / TO BE SUPPLIED BY GREENTIC" frame | 1 |
| "SLOT OPEN" on the partner page | 1 |
| "Prototype form: nothing is submitted or stored" | 1 |
| "In the real build this would... Nothing was sent from this prototype" | 1 |
| "this concept does not invent any" in the pricing answer | 1 |
| "not stated" repeated in the roster table | 5 |
| Full photography credits and licence block | 1 |
| Footer "Concept prototype prepared by Astra Agency &middot; Unlisted and not indexed" | 1 |

### What replaced them

- **Figure captions** are now production copy that adds meaning rather than
  labelling a specimen: "Approval stays with a person, by design", "A run that
  refuses itself, and names the rule that stopped it", "Every connection is
  secured with OAuth".
- **Photo captions** keep the evocative half and drop the disclosure: "A request
  arriving on a phone", "Where a lead sits overnight".
- **The founder portrait** is no longer an empty frame announcing an absence.
  It is a typographic **ME** monogram card in the brand's own style, which reads
  as a deliberate identity choice. The asset request for a real portrait is
  logged here, not printed on the client's page.
- **The partner slot** became a real "Become a partner" card pointing at the
  partner programme, instead of an admission that a logo is missing.
- **The form** now behaves like production: a real success state that promises a
  confirmation email and three times to choose from.
- **The roster's "not stated"** became "on request", which is what a real site
  would say.
- **The footer** is now a production footer: company registration, registered
  office, and one discreet line, *"Product visuals and run examples on this site
  show sample data."*

### Factual integrity is still satisfied

B2 requires that illustrative data cannot be mistaken for a verified claim. The
requirement was redirected, not dropped:

1. One production-normal footnote in the footer, the register real software
   companies use for exactly this. Lumiform, SafetyCulture and hotelkit all
   handle sample data this way.
2. Everything else, provenance, licences, asset requests, scores and open gaps,
   lives in this document. This file is for Raka and the next builder. It is not
   for the client.

Nothing invented was added back. No customer, metric, testimonial or logo
appears anywhere on the page.

### Verification

The full rendered text was extracted with all views, panels and FAQ items forced
open, then grepped for `illustrative|prototype|stock|placeholder|sample|concept|
to be supplied|fig [0-9]|astra|not a customer`. Three hits remained, all
legitimate: Greentic's own partner copy ("realistic examples"), the single
approved footnote, and one warehouse caption reading "Stock moving" which was
changed to "Pallets on the move" to remove the ambiguity next to a photograph.

One consistency error was also caught and fixed: the FAQ said "one of the five"
while the roster lists eight workers. It now reads "not on the roster".

Full QA re-run and clean: 3 viewports, no overflow, real fonts loaded, 3 routes,
3 tabs, 9 stepper actions, 5 FAQ disclosures, 3 form paths, no-JS showing all 3
views and all 3 panels, 10 images with 0 broken, 0 upscaled, 0 missing alt text,
zero console errors. 1.28MB.

### Framework change

This is now **addition 47** in `docs/prototype-framework-addendum-round-3.md`:
*The prototype IS the production environment.* It carries the banned list, the
rule that a missing asset is a design problem rather than a caption, and a
pre-delivery grep of the rendered text so this cannot recur silently.

**Score unchanged at 91/100.** Removing the scaffolding did not change what the
page proves; it changed whether it reads as a real website. The two open items
are still a portrait of Maarten and one nameable customer.

### One deployment note for Raka

The page still carries `<meta name="robots" content="noindex, nofollow">`. That
is invisible to a viewer and it stops an unlisted concept competing with
Greentic's real site in search. If you would rather it be fully production
identical, say so and I will remove it.
