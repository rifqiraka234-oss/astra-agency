# Teardown for justclaims.eu, 12 October 2026

Run by the teardown subagent at 1440x900, cold load, then a scripted scroll in 100px wheel steps. Consent, tag manager and analytics scripts were blocked. The agent's own report is condensed here. The agent could not write a report file, so this file is mine.

## What I re-checked, and how

The aggregates below were recomputed from `fingerprints.jsonl`, not copied from the agent's text.

| Claim | Recomputed |
|---|---|
| Sites rendered and fingerprinted | 82 (A 11, B 17, C 12, D 14, E 12, F 13, G 3) |
| Rows in the file | 96 = 82 rendered + 12 walled + 2 excluded after rendering (oneskysolutions.com, a parked page, and claimcompass.eu, which redirects to airhelp.com) |
| Walled, named | airbus, clio, mckinsey, lexology, ft-visual, nyt-interactive, activetheory, breitling-navitimer, lufthansagroup, eurowings, discover, swiss |
| WebGL on at least one canvas | 13 of 82 (A 0 of 11) |
| Autoplay video | 20 of 82 |
| Pinned stage (tall sticky inside a taller parent) | 11 of 82 |
| 500 or more style and class mutations during the scroll | 26 of 82, 8 of 14 in D, none of the 11 in A |
| Fewer than 50 | 25 of 82 |
| justclaims.eu today (Wix) | 210 words, 6.8 viewports, 3 mutations, no video, no canvas |
| Screenshots on disk | 283 files in `shots/`, a fold, a full page and a scroll strip for each of the 82 |

Not independently reproduced, taken from the agent: the visual descriptions of individual sites (the agent says it opened frames for about 60 of 82), and the per library string matches, which are bundle matches and not proof of use.

## Gaps, said plainly

- Category G (airlines and airports) is close to unmeasured. Heathrow, KLM and TUI fly rendered. Lufthansa Group, Eurowings, Discover and Swiss are walled by Cloudflare and stayed walled through four routes.
- Lusion, Resn and Immersive Garden are fingerprinted but the frames caught only the preloader. Vercel and Raycast were queued and not measured. Ramp's scroll numbers are partial. Those are our tooling failures, not verdicts on the sites.
- Apple Watch is the category hub, its Ultra 3 and Series 11 URLs redirect there.

## What the best sites do, in numbers

Full 82 rows in `metrics-82.md`. The ones that shaped this build:

| Site | Scroll (viewports) | Words | Pinned stages | Clip paths | Mutations | Takeaway |
|---|---|---|---|---|---|---|
| Attio | 19.5 | 1903 | 2 | 10 | 39 | A pinned rail of steps with a panel that swaps |
| Stripe Press | 7.6 | 273 | 0 | 12 | 13 | A fixed tick ruler down the margin, the most instrument-like device in the set |
| Apple iPad Pro | 34.4 | 4310 | 0 | 63 | 1780 | One claim a screen in very large type |
| Linear | 11.1 | 1488 | 0 | 13 | 358 | Product UI drawn in SVG, not screenshots |
| Harvey, Legora | 10.6, 12.9 | 949, 761 | 0, 1 | 3, 0 | 952, 2690 | Proof in ruled rows, not cards |
| Rolex | 4.4 | 181 | 2 | 8 | 27 | A Reduce motion switch in the footer |
| passenger.care, june.tech, airhelp, flightright | 7.1 to 12.1 | 794 to 1585 | 0 | 0 to 17 | 0 to 90 | The peer group. No pinned scene, no WebGL, one autoplay video |

## What we took from it

1. Time as the visual idea. The agent found no airline claims or aviation site that draws time as an instrument, and none of the watch brands used a dial as its interface. Stripe Press (a ruler down the margin) and SBB (a station clock graphic in the footer) came closest. justclaims.eu today is "It's about time" in small type under the logo. Here the logo's own line carries the site.
2. A pinned step rail with one clock a step. Built as the five dial claim file.
3. Instruments drawn as SVG and DOM, never screenshots. The dials, the ruler, the 96 cell grid and both charts are drawn.
4. A live count from the real date. The days to application counter.
5. Ruled rows for articles, duties and clocks, not cards.
6. Mono for citations and timestamps.
7. A serif or humanist face on warm paper for the legal reader. B612 on paper, with the cockpit face as the reason.
8. One duty to a view, at large type, for the pinned story.
9. Footnotes as structure. Every duty carries its article.
10. Reduced motion respected everywhere. No toggle yet, see the handover.

## What we avoided

1. The peer sameness: a framed product card, a shield badge row, a customer name column, a consumer calculator with a mascot.
2. The dark plus one accent plus Inter recipe (Linear, OAG, A4E, June). We use paper as the main ground and night for the chapters.
3. Preloaders and text walls. No preloader, and the longest page is 2,100 words of which most is the verbatim regulation.
