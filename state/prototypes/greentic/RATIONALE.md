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
