# Greentic.ai prototype — delivery rationale and coverage ledger

Built 2026-08-17 for Maarten Ectors (CEO and co-founder, Greentic AI Ltd),
who replied "Ok please send it" to the outreach opener on 17 Aug.
Built under `docs/prototype-build-spec.md` including the Round 2 additions.

---

## Stage 0 — Deliverable mode

**Full prototype.** Raka asked for "the prototype" with no slice requested,
so per spec 0.1 the default is full prototype, not concept slice.

## Promised-concept fidelity gate (H1)

Verbatim from the sent LinkedIn message (17 Aug, 12:13):

> "However the site stops at that one line, so a buyer cannot tell what it
> does or who it is for, and most will just leave. We sketched a page that
> answers both."

The prototype must therefore answer **what it does** and **who it is for**.
Both are answered structurally: section 01 (Workers) names three real
workers with their owning team, their systems and their live-in time, and
section 04 (Range) covers six more processes by department.

**Correction that Raka must know about:** the premise of that sent message
was partly wrong. See "Accuracy correction" below.

---

## Accuracy correction on the sent opener

The opener claimed the site "stops at that one line." That is **not
accurate**. greentic.ai is a full marketing site with a hero, an
architecture explainer, a competitor comparison, five use cases with
attached demo videos, a partner page, and privacy and terms pages. The
"what it does" half of the critique does not hold up.

What *does* hold up, and what this prototype is actually built on:

- **No named customer, case study, testimonial or outcome anywhere.**
  Verified by grepping the full 574KB JS bundle: zero matches for "case
  study", "testimonial", "customer story", "trusted by".
- **Maarten is completely invisible on his own site.** Zero matches for
  "Maarten", "Ectors", "founder", "team", or "about". There is no /about
  and no /team route. For a company asking enterprises to hand core
  processes to software, a former Chief Innovation Officer of Legal &
  General is the single strongest trust asset available, and it is not on
  the page.
- **"Any Industry" positioning.** The strongest buyer-specific material on
  the site (three workers with named systems and 5 to 7 day deploy times)
  is real but buried under generic architecture explanation.
- **No pricing and no commercial shape** at all.

So "a buyer cannot tell who it is for" survives. "Cannot tell what it does"
does not. The draft message has been rewritten so it does not repeat the
false claim.

---

## Brand Evidence Pack (sources)

All product facts below are from **greentic.ai** (homepage bundle
`index-w305Q70m.js`, stylesheet `index-BXTDZbB5.css`, and the JSON-LD block
in the served HTML), retrieved 17 Aug 2026.

| Fact | Value | Source |
|---|---|---|
| Legal entity | Greentic AI Ltd, 63 Lynwood Road, Thames Ditton, KT7 0DJ, UK | JSON-LD |
| Positioning | "Not another chatbot framework" | bundle |
| Core line | "AI is optional — control is mandatory" | bundle |
| Brand colour | `hsl(160 84% 39%)` emerald on `hsl(220 20% 6%)` near-black | stylesheet |
| Brand type | Space Grotesk (display), Inter (body) | stylesheet |
| Architecture | Component → Flow → Application Pack → Bundle = Digital Worker | bundle |
| Method | 3P: Problem → Working demo → Production | bundle |
| Routes | `/`, `/partners`, `/privacy`, `/terms` only | bundle router |
| Named partner | DataArt | bundle |
| Founder | Maarten Ectors, CEO and co-founder; former Chief Innovation Officer, Legal & General Group; former CDO, L&G P&C | public sources (LinkedIn, RocketReach, Medium) |

**Three flagship workers, verbatim from the site:**

| Worker | Input | Process | Output | Systems | Deploy |
|---|---|---|---|---|---|
| Customer Self-Service | Customer request (any language) | Identify → Execute → Confirm | Order placed, account updated, issue resolved | Shopify, Salesforce, WhatsApp | 5 days |
| IT Helpdesk Automation | Employee ticket / chat | Classify → Execute → Resolve | Automated ticket resolution | ServiceNow, Jira, Slack | 7 days |
| Sales Assistant | Lead inquiry / form | Qualify → Enrich → Route | Qualified lead in CRM | HubSpot, Salesforce, Email | 5 days |

## Governing concept (C1)

> **Read it like a shift log.** Every claim is anchored to a worker, a run
> you can step through, and the audit line it signs at the end, because
> Greentic's product is not intelligence, it is accountable execution.

Layers it controls: navigation (workers are the nav), composition (a
monospaced log spine down the left of every section), typography (mono is
load-bearing trace, not a decorative eyebrow), colour (emerald/amber/slate
used as an execution *status system*, not decoration), interaction (stepping
a run), copy voice (operational and plain), and the ending (a pilot with
week-by-week mechanics).

## Anti-pattern and collision checks (C3, C4, C5)

- No cream paper, no editorial serif, no rust/ochre, no eyebrow-plus-rule,
  no three-card value grid as the primary device, no fake browser chrome.
- Their own site's default glow-heavy shadcn treatment was deliberately not
  reproduced; glow is essentially absent here.
- Against the last three Astra prototypes (Rosalie: dark warm photographic;
  Point Audit: light clinical blue; That Animation: dark red serif motion),
  overlap is one convention only (dark ground), and it is justified by
  Greentic's own brand.
- **No-swap test:** the page is built from Greentic's named workers, named
  systems, deploy times and their specific deterministic-versus-agentic
  argument. It could not be resold to any of the last three prospects.

## Human trust plan (E4)

Founder expertise is central to the promise, so Maarten is a required
section. His credentials are verified from public sources. **No portrait
was available**, so the layout carries an honestly labelled placeholder
("PORTRAIT TO BE SUPPLIED BY GREENTIC") rather than an icon or a stock
face. **No quote has been invented for him.**

## Factual integrity (B2)

Every run log is illustrative and is labelled as such in four places: an
amber `ILLUSTRATIVE RUN` chip in each terminal's chrome, a caption under
each terminal, the section lede, and the page footer. Process steps,
systems and timings are Greentic's own; record numbers, the approver name
and scores are examples.

**Nothing invented:** no customer names, no logos, no metrics, no
testimonials, no awards, no integrations beyond those Greentic lists.

---

## Site Completeness Contract → final status (0.2 / G4)

| Area | Status |
|---|---|
| Hero / what it does | Required, built |
| Who it is for (role-owned workers) | Required, built (3 workers, interactive) |
| Run trace / mechanism proof | Required, built (steppable, 3 states) |
| Competitive comparison | Required, built (their own 3-way comparison) |
| Architecture explainer | Required, built |
| Wider use cases | Required, built (6 processes) |
| Method / path to production | Required, built (3P) |
| Founder and trust | Required, built with labelled portrait placeholder |
| Partners | Required, built (DataArt named) |
| Conversion journey + form states | Required, built (validation, error, success) |
| Ending / risk resolution | Required, built (week 0/1/2+ mechanics) |
| Customer case study | **Blocked — no verifiable customer exists publicly** |
| Pricing | **Deferred — no public pricing; commercial shape is Greentic's call** |
| `/partners` as a separate route | Summarized inside the team section |
| `/privacy`, `/terms` | Not applicable to a concept prototype |
| Demo videos | **Deliberately excluded, see below** |

## Coverage ledger (G4)

- **Facts used:** all product/workflow facts from greentic.ai; founder
  background from public sources.
- **Facts excluded as unverified:** any customer, metric or outcome.
- **Assets used:** none of Greentic's images. Type is Space Grotesk, Inter
  and JetBrains Mono, embedded as base64 latin subsets (137KB).
- **Asset requests for Greentic:** (1) a portrait of Maarten, (2) permission
  to name one customer, even anonymised by sector.
- **Media deliberately excluded:** Greentic hosts five real demo videos
  (`greentic.ai/demos/*.mp4`, 64KB to 231KB). They are a genuine asset, but
  this container has no ffmpeg/ffprobe and cannot decode h264, so their
  content could not be verified. Per F2c and F7, shipping an unverifiable
  video as page proof is a hard failure, so they were left out rather than
  embedded blind. **Recommend Greentic feature them more prominently, and
  that a future revision embed them once someone has actually watched them.**
- **Workflows shown complete:** three, end to end, including the human
  approval exception on the IT worker.
- **Workflows summarized:** six more in section 04.
- **Interactions tested:** 3 tabs (aria-selected, keyboard arrows, no panel
  leakage), 9 stepper actions across 3 workers, form empty-submit,
  bad-email and valid-submit paths.
- **Accessibility:** focus-visible on every control, `aria-selected` on
  tabs, roving tabindex, `role="alert"` on the error, reduced-motion
  respected, no state signalled by colour alone (status glyph + text).
- **QA performed:** 1440x900, 1024x768, 390x844. Fonts confirmed
  `document.fonts.status === "loaded"` with real Space Grotesk and JetBrains
  Mono computed (F2b satisfied, typography actually seen, not assumed). No
  horizontal overflow at any width. Zero console errors. JS-disabled render
  shows all 3 panels.
- **Bug found and fixed in QA:** panels carried `hidden` in markup, so the
  no-JS render showed 1 of 3. Fixed by making JS own the `hidden` state.
  This is the third time this class of bug has appeared, and it is now
  caught by an automated check rather than by eye.
- **Payload:** 181KB, against a 2MB target.
- **Unresolved risks:** no customer proof exists to show; the founder
  portrait is a placeholder.

## Score against the Round 2 rubric (G1)

| Dimension | Weight | Score |
|---|---:|---:|
| Brand specificity | 15 | 14 |
| Narrative and emotional pacing | 15 | 13 |
| Imagery and art direction | 15 | 11 |
| Workflow and business completeness | 15 | 14 |
| Real proof and human trust | 15 | 11 |
| Buyer fit and objection coverage | 10 | 9 |
| Conversion completeness | 5 | 5 |
| Interaction and accessibility | 5 | 5 |
| Technical reliability and performance | 5 | 5 |
| **Total** | **100** | **87** |

**87/100, below the 90 threshold.** Stated honestly rather than rounded up.
The two dimensions carrying the loss are imagery (11/15: there is no
photography and no real product screenshot in this build, because Greentic
publishes none and inventing dashboard chrome is a hard failure) and real
proof (11/15: no customer case study exists to show).

Both are blocked on assets only Greentic can provide, not on build effort.
Getting a portrait and one named customer would move this to roughly 93.

**No hard failure is tripped.** Under the spec a sub-90 score means it does
not ship as a finished production candidate; it is sound to send as a
concept for reaction, which is what the thread actually promised. Raka's
call.
