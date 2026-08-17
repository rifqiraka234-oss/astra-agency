# Astra Prototype Framework Addendum — Round 3

## Craft density, art direction, and the difference between restraint and emptiness

**Audit date:** 17 August 2026
**Auditor:** Claude, auditing its own deployed output against Astra's hand built work and against category leaders
**Status:** Additive. Every rule from Round 1 (Brand Evidence Pack, anti AI blacklist, no swap test, provenance, factual integrity) and Round 2 (deliverable mode, Site Completeness Contract, Role × Journey × Evidence, Proof Ladder, workflow coverage, Coverage Ledger, 90/100 rubric) stays in force. This round adds additions **33 through 46**.

---

## 0. How this audit was actually done, including what failed

Honesty about method first, because two of the intended checks did not work and the conclusions have to be read with that in mind.

| Step | Result |
|---|---|
| Screenshot the 4 Astra sites and 3 deployed prototypes with a real browser | **Blocked.** Chromium cannot reach any external host through this container's proxy (`ERR_CONNECTION_RESET` on all 7 URLs). |
| Workaround: fetch each site with curl, mirror its assets locally, rewrite URLs, render the local copy | **Worked** for Alan, Hermod, Padel and all 3 prototypes. |
| Render Personal Pieter | **Partially failed.** The site uses scroll reveal animation; the mirror has no JS bundle, so most sections stayed at `opacity:0` and rendered black. Its structural numbers are used below; **no visual claim is made about it.** |
| Canva Print promotional products page | **403.** Substituted MOO, a direct printing competitor, for the print imagery lesson. |
| Structural metrics from served HTML | **Worked** for all sites. Note that Buck, Ordinary Folk and Carianne Older render client side, so their *section* counts understate reality; their *image* counts come from markup and are meaningful. |

One near miss worth recording. My first render showed 5 of 11 images broken on the Rosalie prototype and a completely blank Chapters gallery, and I almost reported that as a live defect. It was an artifact of screenshotting before lazy loaded images resolved. I decoded all 22 embedded payloads directly and **every one is valid**. Re rendering with lazy loading forced gave 0 broken across all three. The rule this produces is in addition 46.

---

## 1. The verdict

The Round 2 fixes worked. The three deployed prototypes are no longer colour swapped versions of one template, they use real client assets, and Point Audit in particular tells a coherent operational story.

They are still visibly weaker than the four sites Astra builds by hand, and the reason is now measurable rather than a matter of taste.

**The core failure of Round 3 is that Claude renders "premium" as absence.** Asked for something tasteful, artful or high end, it reaches for whitespace, desaturation, a single grotesk, few images and short pages. That vocabulary is not the vocabulary of the art and craft industries. It is the vocabulary of expensive minimalist SaaS. Applied to a fashion photographer or an animation studio it reads as thin, unfinished and generic, which is exactly the reaction this audit was commissioned to explain.

Restraint is a positive choice that removes something in order to strengthen what remains. Emptiness is the absence of material. The prototypes are empty and are being scored as restrained.

---

## 2. The measurement

Every number below is counted from the served HTML of each page.

### 2.1 Astra hand built versus Claude built

| Page | sections | h2 | **h3** | words | nav links | **forms** | images |
|---|---:|---:|---:|---:|---:|---:|---:|
| Alan Sabin Coaching | 11 | 13 | 6 | 675 | 6 | 0 | 5 |
| Hermod | 7 | 5 | 10 | 701 | 9 | 0 | 2 |
| Padel Scout | 10 | 8 | 30 | 1119 | 8 | 5 | 6 |
| Personal Pieter | 13 | 13 | 24 | 1365 | 10 | 0 | 10 |
| **Astra average** | **10.3** | **9.8** | **17.5** | **965** | **8.3** | **1.3** | **5.8** |
| Rosalie Voortman (Claude) | 5 | 3 | 4 | 456 | 3 | 0 | 11 |
| Point Audit (Claude) | 6 | 5 | 4 | 845 | 4 | 0 | 6 |
| That Animation Company (Claude) | 6 | 5 | 5 | 417 | 4 | 0 | 2 |
| **Claude average** | **5.7** | **4.3** | **4.3** | **573** | **3.7** | **0** | **6.3** |

Claude's pages carry **45% fewer sections, 56% fewer h2, 75% fewer h3, 41% fewer words, 55% fewer navigation links and zero forms.**

**The h3 collapse is the single most diagnostic number in this document.** 4.3 against 17.5. Astra's sections open out into sub parts: a step gets its own named stages, a programme gets its own inclusions, a comparison gets its own rows. Claude writes a heading, a lede and three sibling cards, then moves on. That flatness *is* what "shallow" and "five years old" mean when a client says it.

### 2.2 Against category leaders

| Category | Reference | images | words | h3 | Claude's equivalent |
|---|---|---:|---:|---:|---|
| Photography | Carianne Older | **79** | — | — | Rosalie: **11** |
| Animation | Ordinary Folk | 9 img + **10 video** | — | — | Animation: 2 img + **3 video** |
| Audit software | Lumiform | **40** | 2383 | **23** | Point Audit: **6** / 845 / **4** |
| Audit software | SafetyCulture | 37 | 1445 | 14 | " |
| Hotel operations | hotelkit | 37 | 955 | 22 | " |
| Printing | MOO | 46 | 2171 | 10 | — |
| Animation studio | Giant Ant | 13 | 365 | 10 | Animation: 2 |

A photographer's site carries **79 images**. Claude gave a photographer **11**, of which only 3 are visible at a time. An audit software category leader carries **40 images, 2383 words and 23 subsections**. Claude gave the same category **6, 845 and 4**.

These are not stylistic differences. They are different orders of magnitude of material.

---

## 3. What the references actually teach

### 3.1 Photography: artsy means dense, saturated and authored

Carianne Older's work, inspected directly rather than described:

- a **custom drawn 1970s bubble logotype** in red and cream, not a typeface;
- heavily **saturated** colour, hot pink rooms, red and black, teal stage light, checkerboard sets;
- **costume, character and camp**, drag makeup, a cheetah suit, Playboy bunnies, giant chess pieces;
- **visible physical medium**, white film borders and polaroid frames left in;
- a **film poster** among the photographs, because she produces key art, not only images;
- every frame is a **staged production with a concept**, not a captured moment.

The Rosalie prototype answers "artsy" with three desaturated monochrome frames in a plain three column grid, one grotesk, and a great deal of empty black. It asserts editorial quality through whitespace instead of demonstrating it through work.

**Lesson: in the art and craft sector, character is evidence and volume is credibility. Minimalism is a claim you have to earn with an overwhelming body of work behind it, and with three images you have not earned it.**

### 3.2 Printing: the object, the hand, the surface

MOO's imagery, inspected directly:

- **hands hold the product in almost every frame**, giving scale, tactility and human presence at once;
- the **physical object is the hero**, paper edge, fold, sticker curl, bottle, notepad, card stack;
- **saturated brand colour**, hot pink, orange, purple, green;
- **real use context**, a film shoot, a desk, a café table with drinks and stickers scattered on it;
- **zero abstract creative surface**. No gradients standing in for craft.

**Lesson: for anything manufactured, the material result leads, at human scale, in use. A hand in frame is worth more than a studio cut out.**

### 3.3 Animation: motion volume and process artifacts

Ordinary Folk runs **10 videos and 9 images** on one homepage. Giant Ant devotes a full page to who the studio actually is. Claude's animation prototype ships **3 videos and 2 images**, reuses the same PakaPaka frame in three separate places, and represents a 3D kids' television series with **a rendered red waste bin on a grey background**.

That single asset choice is the clearest illustration of the whole problem: an asset was needed, one existed, it was used, and nobody asked whether it made the studio look capable. It makes the studio look like it has nothing to show.

### 3.4 Concept: name the furniture, not just the hero

Hermod is the strongest thing in Astra's portfolio and the reason is that its postal concept **renames the world**:

- sections called **"Everything in the mailbag"** and **"The sorting office"**;
- workflow steps called **Compose, Frank, Inspect, Dispatch**, where *frank* is a genuine postal verb;
- a real circular **postmark stamp** overlapping the code panel;
- **airmail stripes at the top and the bottom** of the document;
- testimonial cards with **stamp corners**;
- navy, red and cream, an airmail palette;
- Bodoni Moda with Karla, editorial paired with utilitarian.

Claude's concepts stop at a hero line and an accent colour. Hermod's concept reaches the nouns, the verbs, the borders, the card corners and the palette.

### 3.5 Honesty as a design device

Hermod ships **"ACCEPTANCE PENDING"** badges in its client compatibility table and **"STATUS: PRE-V0.1 · NOT YET PUBLISHED"** in its footer. It tells the truth about its own maturity and looks more trustworthy for it, not less.

This is the answer to the recurring problem of missing proof. When there is no customer to name, a designed and honest "not yet" beats both an invented testimonial and a silent gap.

### 3.6 Pacing and the designed ending

Alan Sabin runs **7452px** against Rosalie's 4175px and alternates full bleed photographic bands with tight content blocks, drops a cream section into a dark page for contrast, sets "23+" as a display numeral, names proprietary programmes (Say It Out Loud™, I Matter To Me™), and closes **twice**, first with a full bleed orange "Begin with one honest conversation" and then with a second amber booking card, above a four column footer with real link groups.

Claude's three prototypes all end the same way: one heading, one button or mailto link, one thin footer.

---

## 4. Named failure modes

1. **Premium rendered as absence.** Whitespace and desaturation substituted for material.
2. **Section depth collapse.** Flat sections, h3 at a quarter of the human baseline.
3. **Asset starvation.** Too few assets to sequence, so images repeat and one bad asset has to carry a whole project.
4. **Image role monotony.** Nearly every image is "work sample, same crop". No behind the scenes, no macro detail, no in use, no human, no process artifact, no scale reference.
5. **No brand mark.** All three prototypes set the company name in a licensed webfont and call it a logo.
6. **Concept confined to the hero.** Two layers, not eight.
7. **No conversion apparatus.** Zero forms across three pages.
8. **No information architecture.** Zero real routes, nav is anchors within one scroll.
9. **Human absence.** A section headed "who you'd work with" containing no faces.
10. **The page stops instead of closing.** One CTA, no secondary route, no risk resolution, no FAQ.

---

## 5. New mandatory additions, 33 to 46

### 33. Density floor by category, checked before delivery

Count your own page and compare against the measured category baseline. A shortfall is allowed only with a written reason in the Coverage Ledger.

| Category | Minimum images | Minimum words | Minimum h3 | Notes |
|---|---:|---:|---:|---|
| Photography, illustration, design portfolio | **35** | 500 | 8 | Volume of work is the argument |
| Animation, film, motion | **12 stills + 4 motion** | 600 | 10 | Motion is mandatory |
| Printing, manufacturing, physical product | **25** | 900 | 12 | Object, hand, scale, finish |
| B2B software, operations | **15** | 1200 | 18 | Screens per role and per state |
| Coaching, consulting, personal service | **8** | 900 | 12 | Human presence dominates |
| Marketplace, comparison | **20** | 1200 | 20 | Catalogue is the product |

These are floors, not targets, derived from Carianne (79), MOO (46), Lumiform (40), SafetyCulture (37), hotelkit (37) and Giant Ant (13). They are deliberately set well below the leaders.

### 34. Oversupply the asset library before designing, at roughly 5×

Gather about five times the assets you expect to place, then edit down. Art direction is selection, and selection requires surplus. A build that collects exactly the six images it plans to use has no ability to sequence, contrast or reject.

Record the gathered set, the placed set, and **why each rejected asset lost**. If the library cannot reach the density floor in addition 33, that is an asset request to the client before build, not a constraint to design around silently.

### 35. Image role quota

A page may not fill every slot with the same kind of picture. Across the page, hit at least **five** of these roles, and never let one role exceed 50% of major imagery:

establishing the world · human at work · the work or product itself · process artifact (sketch, board, contact sheet, config) · tactile macro detail · the result in use, in context · scale reference (a hand, a body, a room) · social proof · conversion reassurance.

MOO passes this with hands in nearly every frame. The animation prototype fails it, every image is the same role.

### 36. Design a brand mark, do not set a name in a webfont

A prototype proposing a brand experience must present an actual identity treatment: a wordmark with real drawing or spacing decisions, a monogram, a symbol, a stamp, a containing shape, or an explicit and deliberate typographic lockup with stated reasoning.

Carianne has a drawn logotype. Hermod has a postmark. Setting "Rosalie Voortman" in Familjen Grotesk at letter spacing is not an identity, and a client evaluating a brand concept will read it as nothing having been designed.

Where a real logo exists, use it faithfully and design the system around it.

### 37. Nomenclature test: the concept must name things

Take the governing concept and apply it to the page's own furniture. At least **four** of the following must carry the concept's vocabulary: section names, step or stage names, navigation labels, the CTA verb, status or state labels, card and container treatment, iconography, borders and edges, the empty state.

Hermod: mailbag, sorting office, Compose, Frank, Inspect, Dispatch, airmail borders, postmark, stamp corners. That is nine.

If the concept survives only in the hero headline and an accent colour, it is decoration and the page fails C1.

### 38. No flat sections

Every major section must have internal structure beyond heading, paragraph and a row of equal cards. At least **three** sections must contain named sub parts: stages with their own names, a table with real rows, a comparison with criteria, an ordered process with distinct steps, a spec list, a role breakdown, or a question and answer set.

Target the human baseline of roughly **15+ h3 per page**, not the current 4.

### 39. Real information architecture for a full prototype

A full prototype (Round 2, addition 15) must demonstrate genuine site structure, not one scroll with anchor links:

- a navigation of at least **6 real destinations**;
- at least **2 routes built as separate views or fully realised states**, not just named;
- every other route present in the Site Completeness Contract with its status;
- a footer with **real grouped link columns**, the way Alan and Hermod both do it.

One scrolling page with four anchors is a landing page. Calling it a full prototype is the Round 2 hard failure about unlabeled concept slices, wearing different clothes.

### 40. Conversion apparatus is mandatory

Zero forms across three prototypes is the bluntest finding in this audit. Every full prototype ships a **real, working, designed conversion instrument**: the actual fields, required and optional, validation, an error state, a success state, a privacy line, and a labelled statement that it is prototype behaviour.

A `mailto:` link is a contact method, never a booking system, and must never be styled as one. This restates Round 2 addition 26 as a build requirement because it was written and then not done.

### 41. Colour and contrast budget, decided not defaulted

Before build, state the intended chroma. If the palette is desaturated, **write down why that is right for this client**, referencing their existing assets.

Desaturation must never be the default expression of quality. Carianne is saturated. MOO is saturated. Alan is warm chocolate, cream and burnt orange. Personal Pieter is electric blue. Three of four Astra sites and both art sector references are strongly coloured; the AI default of near black plus one accent is the outlier, not the standard.

### 42. Human presence quota

If people deliver the service, **faces appear**. A named person requires a face, an approved portrait, or a visible and honest asset request. Text only biographies under a heading that promises "who you'd work with" is a hard failure, already listed in Round 2 addition 20 and violated on the very next build.

At minimum: one human at work, and one portrait for each individually named person.

### 43. The ending is a stack, not a button

The final 20% must contain at least **four** distinct closing moves: a restated promise, the practical mechanics of what happens next, risk and objection resolution, a response time expectation, a secondary route for those not ready, a proof or reassurance element, and a real footer with grouped links.

Alan closes twice, then footers in four columns. A heading and one button is stopping, not closing.

### 44. Bench render against two category leaders

Before delivery, render your page and two category leaders' pages at the same width, and place the three full page screenshots side by side.

Ask, and answer in writing:

1. Which looks the thinnest, and why specifically?
2. Which has the most material on screen?
3. If a stranger were told one of these was built by a template generator, which would they pick?

If the answer to 3 is yours, do not ship it. This is the Round 1 no swap test extended from "could this be another client" to "does this look like it was made by a person".

### 45. Restraint versus emptiness check

For every large area of empty space, name what it is framing. Whitespace around a commanding image is composition. Whitespace around a small image, a short paragraph and nothing else is a page that ran out of material.

If more than **two** major sections cannot name what their empty space is doing, the page is empty, not restrained, and needs material rather than layout adjustment.

### 46. Render truthfully before you judge a render

Before drawing any conclusion from a screenshot: force lazy loaded images to eager, scroll the full document to trigger in view loading, wait for `document.fonts.ready`, and only then capture.

Then separate three different things, and never report one as another:

- broken in the sandbox because of network or proxy limits;
- broken because the asset itself is corrupt (decode the payload and check);
- genuinely broken on the live site.

This audit produced a false "5 of 11 images broken, gallery blank" reading that would have been reported as a live defect if the payloads had not been decoded directly. All 22 were valid.

---

## 6. Additional hard failures

Add to the Round 1 and Round 2 lists:

- A page below the addition 33 density floor for its category, with no written justification.
- A portfolio, gallery or work section presenting fewer than 8 pieces where more exist or could be requested.
- The same asset reused in three or more places on one page.
- Duplicate embedded media payloads (the animation prototype embeds one 103KB poster twice).
- A brand or identity concept with no designed mark.
- A governing concept that names fewer than four page elements.
- Fewer than three sections containing named sub parts.
- A full prototype with no working form and no real routes.
- A named individual with no face and no logged asset request.
- A page whose entire ending is one heading and one button.
- A production frame cropped so the subject is lost (the 1920×1080 to 579×720 crop is still live on the animation prototype).
- Any render based conclusion drawn without the addition 46 procedure.

---

## 7. What this does not change

The Round 1 and Round 2 strengths hold and must not be traded away chasing density:

- factual integrity is absolute; more material never means invented material;
- illustrative data stays visibly labelled;
- real client assets still beat generic stock, and volume never justifies unrelated stock;
- provenance is still recorded for everything;
- the prototype still reads as the client's site, not as an agency teardown.

**Density without truth is worse than sparseness with truth.** The instruction is to gather more real material, not to fill space.

---

## 8. Prompt for Claude to apply this round

> You are updating the canonical Astra prototype framework at `docs/prototype-build-spec.md` for a third time. This task is **additive**. Preserve and keep operational every Round 1 rule (Brand Evidence Pack, category triangulation, governing concept, imagery provenance, typography by evidence, anti AI blacklist, collision and no swap tests, category proof rules, responsive QA, factual integrity) and every Round 2 rule (Stage 0 deliverable mode and Site Completeness Contract, A4 business system model, A5 Role × Journey × Evidence, D5 to D7 imagery storyboard and scoring and crop gates, E4 to E8 Human Trust Plan and Proof Ladder and workflow coverage and case study anatomy and designed ending, F5 to F9 conversion journey and interaction states and media playback and asset delivery and responsive art direction, G4 Coverage Ledger, and the 100 point rubric at 90).
>
> Read `docs/prototype-build-spec.md` in full, then read `docs/prototype-framework-addendum-round-3.md` in full. Integrate additions **33 to 46** into the actual workflow stages, not as an appendix.
>
> The Round 3 problem is that the prototypes are no longer generic in art direction but are **materially thin**, and that Claude renders "premium" as absence: whitespace, desaturation, one grotesk, few images, short pages. Measured against Astra's own hand built sites, Claude's pages carry 45% fewer sections, 75% fewer h3 subsections, 41% fewer words, 55% fewer nav links and zero forms. Measured against category leaders, a photographer's site carries 79 images where Claude supplied 11, and audit software leaders carry 37 to 40 images and 22 to 23 subsections where Claude supplied 6 and 4.
>
> Place the additions here:
> - **Stage A / Stage 0:** addition 33 density floor and addition 34 asset oversupply, both before any design decision, since both can generate client asset requests.
> - **Stage C:** addition 36 brand mark, addition 37 nomenclature test, addition 41 colour and contrast budget.
> - **Stage D:** addition 35 image role quota, and fold addition 34 into the D1 asset plan.
> - **Stage E:** addition 38 no flat sections, addition 42 human presence quota, addition 43 the ending stack.
> - **Stage F:** addition 39 real information architecture, addition 40 conversion apparatus, addition 46 truthful rendering, which should sit at the head of the QA stage because every other QA gate depends on it.
> - **Stage G:** addition 44 bench render, addition 45 restraint versus emptiness, and merge the section 6 hard failures into the existing hard failure list.
>
> Keep the measured numbers. They are the enforcement mechanism, and converting them into prose such as "use more images" destroys the entire point of this round.
>
> Do not weaken any existing gate. Do not remove the 90/100 threshold. Do not turn checklists into advice.
>
> After editing, report: the path changed, where each of 33 to 46 landed, a before and after outline of the stage structure, confirmation that all Round 1 and Round 2 rules remain operational, confirmation that no HTML prototype or unrelated file was modified, and any conflict needing Raka's decision.
>
> Do not claim completion until you have reread the edited file and verified that additions 33 to 46, the density table, and every new hard failure are present and operational.

---

## 9. Bottom line

Round 1 fixed *sameness*. Round 2 fixed *incompleteness of story*. Round 3 has to fix **thinness of material and timidity of art direction**.

The next prototype should be measurably denser, visibly more coloured and more characterful, carry a designed mark, name its own furniture after its concept, show faces, contain a working form and real routes, and close in layers rather than stopping.

The standard is now: **art directed, evidence rich, human, operationally complete, technically verified, and materially dense enough that a stranger would assume a person made it.**
