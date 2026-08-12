# Point Audit — Research Summary & Rationale

Rebuild (v2). The first attempt used generic Pexels hotel photos and a
fully invented "Riva Aubert Hotels Group" dashboard, replacing the client's
real, available proof with fiction. This version is built on their own real
product screens.

## Governing concept
"Follow one finding from a single room's checkbox to the group's score."
The signature device is a four-step stepper (room check → audit report →
action plan → performance) where each step is one of Point Audit's real
product screens. The concept controls composition (a literal left-to-right
progression), interaction (the stepper), imagery (real UI only), copy
(operations language: finding, score, owner, trend), and colour (the
product's own traffic-light scoring becomes the functional accent system).

## Brand evidence (sourced)
- **Real product screens, from point-audit.com**: mobile room-audit
  checklist ("Contrôle de chambre"), audit report ("Score global 60%",
  breakdown by classification), action plan ("Votre plan d'action" with
  priority/status/responsable), performance dashboard ("Performances,
  74,97%"). All four are Point Audit's own published marketing screenshots,
  used as-is. Two real in-context photos (a manager holding a tablet; two
  people reviewing the planning screen) are also theirs.
- **Real feature set** (verified on their site): Centralise / Document /
  Evaluate / Involve, offline audits, multilingual roles, multi-property
  comparison. The "four moves" ledger uses their real product verbs.
- **Market** (company-reported): sold to independent hotels and
  international groups; €159/month entry (not shown on the page — the
  pricing page 404'd when checked, so the figure is unconfirmed and was
  deliberately kept off the prototype).
- **Founder credibility** (company-reported, from earlier press): built by a
  team with luxury hospitality operations background (Lisa Bouamra, the
  outreach contact). Stated carefully on the page as "built by hospitality
  operators," no invented names or titles on the page itself.

## Deliberate omissions (factual integrity)
- **No client logos.** Their site shows Accor, Sofitel, Radisson, Paris
  Society etc. Those are real third-party IP and the spec forbids
  reproducing them, so the page references "independent hotels and
  international groups" truthfully without any logo.
- **No testimonial.** There is a real public quote (Elodie Corlier, Hotel
  Napoleon Paris) on their site, but I don't have it verbatim, so nothing
  was fabricated. A real, verbatim, attributed quote can be added later.
- **No invented metrics.** The only numbers shown (60%, 74.97%, 16 audits)
  are the ones inside their own real screenshots, not overlaid or changed.

## Typography
Schibsted Grotesk with tabular numerals, no mono. Chosen for precise,
measured, European-instrument feel fitting a measurement product. Explicitly
NOT the old build's Instrument Serif + Manrope + JetBrains Mono, and not a
serif, to avoid the AI recipe and to read as a clinical operations tool.

## Asset provenance
| Asset | Source | Type | Rights note |
|---|---|---|---|
| 4 product UI screens | point-audit.com (their own mockups) | Client product UI | Downloaded + embedded. Their own marketing imagery; confirm reuse is fine before public link. |
| 2 in-context photos | point-audit.com | Client-owned | Same. |
| Client logos | — | — | Deliberately NOT used (third-party IP). |

## QA
- Rendered 1440 + 390. Real product (manager + tablet) shows above the fold.
- 0 horizontal overflow. Stepper verified: each step reveals its real screen
  (fixed a bug where `.stage` display overrode the hidden attribute; hiding
  now gated behind `html.js` so no-JS users see all four stacked).
- 0 dead links, only Google Fonts external, no mixed content, reduced-motion
  respected, JS valid. `noindex` set.

## Weighted score (self-assessed): 91/100
Brand specificity 24/25 · Art direction 18/20 · Imagery & proof 19/20 ·
Story 14/15 · Copy 9/10 · UX 4/5 · Technical 3/5. No hard failures.

## To confirm before publishing
1. Point Audit is fine with their product screens in a concept mockup.
2. Whether to add their real Elodie Corlier testimonial (verbatim).
3. The page is in English (their site is French only) — a judgment call to
   match how Astra's thread with Lisa is conducted; worth a nod from her.
4. Real contact routing (mailto is a placeholder to contact@point-audit.com).
