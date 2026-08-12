# Astra Agency — Company Research and Prototype Build Spec

> Canonical source of truth for how Astra prototypes are researched,
> art directed, written, built, and quality gated. `CLAUDE.md` at the repo
> root adds the concrete handoff mechanics (how this gets triggered, hosted,
> and how a "yes" eventually turns into a booked meeting) since this spec
> itself is about research and build quality, not the plumbing around it.
>
> **Revision note (2026-08-12):** this spec was rewritten end to end after a
> design audit found that prototypes built under the previous version were
> strategically competent but visually generic and recognisably AI made,
> despite following that version's Step 5 "must not look AI made" guidance
> in spirit. The previous version stated a good goal without enough
> operational machinery to reliably hit it. Everything below exists to close
> that gap: mandatory research before any visual choice, an explicit
> anti-pattern blacklist, collision and no-swap tests against Astra's own
> past work, category-specific proof rules, and a weighted scoring gate that
> a prototype cannot pass by being merely "polished." The strategic
> substance of the old spec (evidence classification, red-teaming, the
> factual integrity rules) is preserved and folded into the new structure
> rather than replaced.

## Purpose
This is triggered by a "Ready for a mockup" handoff from the daily inbox
triage, or directly by Raka. Input is a company name, their live website,
and what was actually promised in the outreach thread (a homepage redesign,
an interactive tool, whatever was actually offered, not assumed). Output is
a single, hostable HTML prototype that could genuinely be mistaken for a
senior studio's bespoke work for this specific client, plus a short
research summary and rationale Raka can sanity check before sending.

The prototype itself must read as **the proposed client website**, not as
an agency's annotated critique of the old one. See Step 7 and the Stage 5
delivery rules below for exactly where critique and rationale belong
instead.

---

## Stage A — Research (before any visual decision is made)

No palette, typeface, layout system, image, or UI pattern may be chosen
until this stage is complete. This is the hard gate that the previous
version of this spec lacked: "must not look AI made" was a goal, not a
required output, so it was easy to skip past it straight to a plausible
looking design. Stage A produces a required, sourced artifact called the
**Brand Evidence Pack**. If a reviewer cannot find this pack (or its
contents inline in the research summary), the prototype has not started
correctly, regardless of how the finished page looks.

### A1 — Confirm the business (was Step 1)
- The correct company, current role of the contact, and correct live
  website. People and companies get confused, verify before building
  anything.
- What the company actually sells, who buys it, and how it makes money in
  plain language, not their own marketing tagline restated.
- Read the actual live site, multiple pages, not just the homepage and not
  just search snippets. Open it and look.
- What was already pitched in the outreach thread. If Raka promised a
  specific tool (an interactive assessment, a calculator, a particular kind
  of page), build that, not a generic homepage redesign. Andy Olson was
  promised a project readiness flow, not a generic site, that distinction
  matters every time.

### A2 — Build the Brand Evidence Pack
Produce a sourced pack containing all of the following before moving on.
Every claim that will affect a design decision needs its source cited
inline (a URL, a named press article, "own site: /page-name") or must be
explicitly labeled an inference per the Stage B evidence classification.
An unsourced aesthetic preference ("feels premium", "should look modern")
is not an entry in this pack, it is the exact failure mode this stage
exists to prevent.

The pack must cover:

1. **Company, offer, and buyer** — what they actually sell, to whom, and how
   the buyer actually decides.
2. **Buying situation and decision anxiety** — what the buyer is unsure
   about right before they'd say yes or no.
3. **Current brand assets and recurring cues** — colors, type, imagery,
   language, motifs the company already uses, even informally (their own
   site, their social presence, their existing collateral).
4. **Actual product, work, people, place, and process assets** — what real
   material exists that could appear in the prototype: real product UI,
   real photography, real work samples, real team, real physical space,
   real workflow steps. This is the single most important line item in the
   pack, see Stage D.
5. **Founder vocabulary and customer vocabulary** — how the company
   actually talks about itself, and how its customers talk about it
   (reviews, testimonials already public, press quotes).
6. **Brand history, geography, and cultural context** where relevant (a
   Dutch HYROX coach, a French hospitality SaaS, a Canadian coastal
   Indigenous economic development org all carry real cultural context that
   should shape the work, not be flattened out of it).
7. **Desired emotional response** — what should a visitor feel, specifically
   for this business (psychologically safe and reflective is not the same
   feeling as urgent and technical, is not the same feeling as tactile and
   crafted).
8. **Category conventions worth retaining** — patterns visitors in this
   category actually expect and rely on (see Stage D's category table).
9. **Conventions worth deliberately breaking** — and the strategic reason
   why, stated explicitly.
10. **Two to four relevant same-category references** — real competitors or
    category leaders, used as evidence of what "good" looks like in this
    specific category, never as a template to copy.
11. **One to three adjacent cultural or editorial references** — from
    outside the category, used to source a feeling or material language
    that the category itself doesn't already have (this is how Personal
    Pieter borrows HYROX culture rather than generic "fitness app" styling,
    and how Hermod borrows a postal/sorting-office world rather than
    generic "email infrastructure" styling).
12. **Explicit anti-references** — what the result must not feel like,
    stated in concrete terms ("must not read as a generic SaaS dashboard",
    "must not read as a luxury hotel booking site", "must not read as a
    consultant's pitch deck").
13. **Imagery availability, ownership, licensing, provenance, and
    confidence** — for every likely image source: is it the client's own,
    is it licensed stock, is it a product screenshot, is it something that
    would need to be commissioned or faked with a clear placeholder. See
    Stage D.
14. **Verified facts versus company reported claims versus hypotheses versus
    demo only material** — carried forward into Stage B's classification,
    started here.

### A3 — Category triangulation
Research must triangulate three separate territories, and the pack must
state the conclusion drawn from each, not just list the inputs:

1. **The client's own existing identity and assets** — what to inherit
   directly from what they already have and are.
2. **The best relevant companies in the same category** — what the category
   teaches about what buyers expect, and separately, what has become an
   overused cliche within that category that this prototype should not
   repeat.
3. **Adjacent worlds that express the desired feeling without copying
   category cliches** — where the actual distinctive material language
   comes from.

The triangulation output must explicitly answer:
- What to inherit from the client.
- What to learn from the category (as a convention worth keeping).
- What to avoid because it is overused within the category.
- What adjacent influence creates real distinction.
- Why the resulting direction is credible for this specific buyer, not
  just interesting in the abstract.

References from any of these three territories are inputs to thinking, never
templates. Never reproduce another company's layout, trade dress, specific
copy, or signature interactive device, even a competitor's. Copying a
competitor is prohibited even though researching them is mandatory.

---

## Stage B — Evidence classification and red team (was Steps 3 and 4)

### B1 — Evidence classification (never blur these)
Every claim used in the research, the Brand Evidence Pack, or the prototype
belongs to one of four categories, and must be labeled internally even if
not shown on the page:

- **Verified fact** — confirmed through the live site or other reliable
  public evidence.
- **Company-reported claim** — stated by the company but not independently
  verified.
- **Reasonable hypothesis** — a supported interpretation, not confirmed.
- **Unknown** — do not guess, do not fabricate.

### B2 — Factual integrity rule (hard rule, not a style preference)
Never invent or imply any of the following as if real: clients, testimonials,
performance results, awards, product capabilities, integrations, team
backgrounds, prices, metrics, case studies, property or company names, or
project ownership that isn't the client's.

If a concept genuinely needs illustrative data to work (a demo dashboard, a
sample portfolio, an example client roster), it must:
- use names that are clearly and unmistakably fictional, not merely
  unverified,
- be labeled, visibly and repeatedly on the page itself (not only in the
  research summary), as **"Illustrative demo data — not actual customer
  results"** or equivalent wording,
- never be presented in a way a reasonable viewer could mistake for a real,
  verified claim about the client's actual business.

This is exactly where the Point Audit prototype needs correction: its
"Riva Aubert Hotels Group" concept is a defensible interactive idea, but it
must not quietly replace the client's *real* available proof (real product
screens, a real audit-to-action mechanism, real founder credibility, named
real hospitality clients from public press coverage). Use the real material
first; if a fictional demo layer is still useful on top of that, label it
as such, repeatedly, on the page.

### B3 — Red team the read before building (was Step 4)
Before committing to a direction, check: could this be the wrong person or
company, has the business pivoted since this info was gathered, is the flaw
genuinely commercially important or just personal taste, does another page
on the site already resolve this criticism, is the issue actually an
intentional design choice serving a different goal, is the outcome being
promised realistic and causal rather than assumed, and is this concept
actually worth the build time for this lead.

---

## Stage C — Art direction (was Step 5, this is where most AI output fails)

The single biggest quality bar: it must not look AI made, and specifically
it must not look like it came from the same designer as Astra's last three
prototypes. A prototype that is individually polished but interchangeable
with another client's prototype has failed this stage regardless of its
craft level.

### C1 — One governing concept, stated as a sentence
Before implementation, write one concept sentence that could only plausibly
belong to this company. If the same sentence could describe a different
client with the nouns swapped, it is not specific enough yet.

The concept must control **at least five** of these layers, and the
research summary must say which ones:
- composition and grid
- typography
- imagery and cropping
- colour and material treatment
- copy voice
- interaction
- motion
- navigation
- iconography
- section transitions
- UI demonstration

If the concept only appears in the hero and nowhere else, it is decorative,
not art direction, and must be rejected. This is the difference between
Hermod's postal metaphor (which names the product's own components after
sorting-office language, structures the whole page, and shows up in
microcopy throughout) and a hero image that merely sets a mood before the
page reverts to generic sections.

Also state, explicitly, in the research summary:
- Three brand adjectives, each supported by a specific piece of evidence
  from the Brand Evidence Pack.
- Three anti-adjectives (words this must not read as).
- One material or cultural metaphor, if the brand genuinely supports one
  (not forced onto every client, Point Audit's hospitality operations world
  does not need one the way Hermod's postal metaphor serves email).
- One sentence on why this must not look like generic SaaS, a generic
  creative portfolio, or any of Astra's own last three prototypes.

### C2 — Typography by evidence, not by habit
Do not default to Instrument Serif, Fraunces, a generic grotesk, or tiny
uppercase mono labels because they read as "editorial" or "premium" in the
abstract. Three unrelated Astra prototypes (Point Audit, That Animation
Company, Voortman & Baumhauer) converged on effectively the same
serif-plus-neutral-sans-plus-mono system with only the accent colour
changed. That convergence is itself the evidence this rule exists to
prevent.

For every typeface choice, the research summary must state:
- its connection to this client's identity and category,
- the emotional and cultural effect it is chosen for,
- its display versus reading role,
- language or character set needs,
- licensing and loading method,
- why this pairing is not interchangeable with the pairing used on the
  previous three Astra prototypes.

Distinctive type is welcome when justified. What is not welcome is
typography performing an authenticity that should actually come from real
imagery and a real governing concept. A characterful serif cannot rescue a
page built on generic stock photography and a borrowed layout.

### C3 — Anti-AI design pattern blacklist
The following combination must trigger a redesign of at least the flagged
elements, unless every individual choice in it is directly and explicitly
supported by the Brand Evidence Pack (not merely "it looks nice together"):

- cream paper background plus near-black ink plus a rust, ochre, clay, or
  brass accent
- editorial serif headline plus neutral grotesk body plus mono micro-labels
- tiny uppercase eyebrow label with a short horizontal rule
- repeated bordered cards with a 2 to 3px corner radius as the default
  container
- exactly one dark inverted section used as the sole tonal variation
- grain or noise texture added as a shortcut to "feels crafted"
- pill or chip shapes used for every interactive control
- fake browser or device chrome standing in for real product evidence
- a generic three column value proposition section
- an identical problem to mechanism to proof to CTA section rhythm across
  every prototype
- copy constructions overused across recent prototypes: "not X, Y",
  "before you...", "the same X that...", "what it doesn't...", "exactly
  what..."

No single item on this list is banned in isolation, plenty of good sites
use a serif headline or a cream background for a real reason. What is
banned is the **unsupported recipe**, and specifically the **repetition of
this recipe across unrelated clients**. If a reviewer can point to three
recent Astra prototypes and see the same five or more of these choices
recurring, that is a failure regardless of how the individual prototype
being reviewed looks on its own.

### C4 — Cross-project collision test
Before implementation, and again before delivery, compare the concept
against at least the last three Astra prototypes. Record overlap across:
palette family, font archetype, label treatment, border or card system,
hero composition, section order, CTA style, interaction pattern, copy
rhythm, and image treatment.

If more than two major conventions overlap with a recent unrelated
prototype without direct client evidence justifying the repeat, redesign
before proceeding.

### C5 — The no-swap test
Before delivery, look at the prototype with the logo and company name
removed (mentally, or with an actual cropped screenshot) and answer:

1. Can a reviewer identify the industry from the design alone?
2. Would the actual client recognise their own character in it?
3. Could this same design be sold to one of the last three prospects by
   swapping the text, images, and accent colour?

If the answer to question 3 is yes, the work fails this stage. This is the
single sharpest test in this spec: it is exactly what exposed that Point
Audit, That Animation Company, and Voortman & Baumhauer were recognisably
the same underlying design applied three times.

### C6 — Category is context, not a prison
Researching same-category references is mandatory (Stage A3). Copying them
is prohibited. Category patterns exist to be understood, then either
honored where they genuinely serve the buyer, or deliberately and visibly
broken where breaking them is the actual point of the concept. Either move
requires a stated reason tied to the Brand Evidence Pack, "we did something
different" is not itself a justification.

---

## Stage D — Imagery strategy (first class deliverable, not an afterthought)

A page with no real imagery reads as dead and unfinished. A page with the
wrong imagery, imagery that is real and well shot but unrelated to what
this client actually does or is, is a worse failure than no imagery at all,
because it actively misrepresents the brand. This stage exists because all
three of the most recent Astra prototypes used generic or thematically
disconnected imagery in place of available real material:

- **Voortman & Baumhauer / Rosalie Voortman** used three unrelated stock
  photos (a laptop and notebook flat lay, an empty cafe, pottery making)
  for a documentary and editorial photographer whose own live site already
  shows her actual style: candid people, tactile interiors, close detail,
  analog warmth. For a photographer, the photography *is* the product, the
  proof, the voice, and the pacing device. Unrelated stock in that context
  is an automatic Stage F hard failure, not a minor deduction.
- **That Animation Company** used zero images, zero video, and represented
  "production proof" with CSS gradient frames. An animation studio's first
  job is to make a visitor feel the actual craft and motion. A static page
  with no real production stills, storyboards, or reel material is an
  automatic Stage F hard failure for this category.
- **Point Audit** used generic Pexels hotel photography and a fully
  fictional "Riva Aubert Hotels Group" dashboard when the real business
  already has real product screens, a real audit-to-action mechanism,
  founder credibility, and named real hospitality clients from public press
  coverage. Replacing available real proof with invented material is
  exactly what B2's factual integrity rule and this stage both exist to
  stop.

### D1 — Build an asset plan before writing any HTML
For every major image, video, or visual element planned for the page,
record in the research summary:
- its narrative role (what it proves or what feeling it carries),
- its source and provenance,
- whether it is client owned, licensed stock, product UI, commissioned,
  generated, or an honest placeholder,
- crop and aspect ratio,
- colour, light, and texture requirements to fit the design system,
- whether it functions as factual proof or as atmospheric support,
- its mobile treatment,
- its intended alt text.

### D2 — Rules for choosing images
- Prefer real client work, real product UI, real people, real places, real
  process, and real customer context over any stock substitute, whenever it
  exists and is usable.
- For photographers, designers, architects, animators, artists, and makers
  of any kind, their actual work must dominate the page. A characterful
  layout around the wrong photography is still a failure.
- For software, show the real mechanism and a realistic end-to-end job,
  not decorative dashboard chrome that could belong to any product.
- Never use generic stock as if it were the client's own work or output.
- Never choose an image merely because its colours happen to match the
  palette. That is choosing decoration over evidence.
- If no truthful image exists for a given slot, use an honest placeholder,
  a diagram, a brand-native graphic treatment (as That Animation Company's
  rebuild should have used stylised motion-adjacent graphics instead of
  claiming gradient frames were "proof"), or flag that the asset needs to
  be requested from the client. Never fill the rectangle with unrelated
  stock just to avoid an empty space.
- Do not hotlink a client's or a third party's production assets from their
  live site. For private concept work, document the temporary source used.
  Before any public use, confirm permission or licensing and localise and
  optimise the approved asset rather than leaving it hotlinked.
- Avoid large base64 encoded image payloads unless the delivery format
  specifically requires a single self contained HTML file with no external
  asset dependencies at all (see Stage E's technical requirements); when
  that constraint applies, still keep total payload reasonable and
  optimise images before encoding them.

### D3 — Real photography licensing and identity rules (carried forward)
- Use genuinely real, correctly licensed photography (free license sources
  like Pexels, not scraped or unlicensed images). Confirm the license
  actually permits this use.
- Treat photography deliberately, not as stock filler. A duotone or colour
  treatment tying it into the brand system reads as intentional rather than
  generic, but the treatment cannot fix a subject mismatch, see D2.
- Never depict real, identifiable people, especially not stock photos
  standing in for a specific real community, culture, or identity that is
  not actually the client's own. For Indigenous Fishers First specifically,
  this meant using real photography of water, boats, harbors, and market
  scenes rather than generic stock photos of "Indigenous people," which
  would have been disrespectful and inaccurate. Apply the same judgment for
  any client tied to a specific real community.
- Never use real company or retailer logos, that is licensed IP. Use styled
  wordmark placeholders or generic representations instead.
- Never fabricate a testimonial and present it as real. If a testimonial
  strengthens the page, it must either be a real, correctly attributed
  public quote (confirmed against the live source, as with Irene Weibel's
  testimonial for That Animation Company), or clearly labeled internally as
  a placeholder to be swapped for a real client quote before anything is
  actually published, never left ambiguous.

### D4 — Category-specific proof rules
Starting principles, not fixed templates. Adapt to the actual client within
each category rather than treating this table as a checklist to fill in
mechanically.

| Category | What must lead as proof |
|---|---|
| Photography | The photographer's own portfolio images, contact sheets, series, process, deliberate crop and sequence. No unrelated stock standing in for their work. |
| Animation | An actual reel or video, production stills, style frames, characters, storyboards, real 2D or 3D proof, credits with accurate ownership claims. CSS gradients are never proof. |
| Printing / physical product | The physical product itself: stock, finish, scale, ink or material, process, tactile detail, use context, samples, before/after, delivery. Abstract design is secondary to the material result. |
| Hospitality software | Real hotel or property context, real UI, real standards, a real audit finding, a real assignment and resolution flow, group level visibility, founder or operator credibility, real customer proof. |
| Coaching | Human warmth, psychological safety, clearly stated boundaries, a real philosophy, lived credibility, real stories, a low pressure path to a conversation. |
| Sports / fitness | Real movement, the body, the actual place, a real progression or programme, coach credibility, a concrete goal state, a practical next action. |
| Marketplace / comparison | A real catalogue, working search, filter, and compare mechanics, a stated methodology, price and proof freshness, genuine decision support. |

---

## Stage E — Narrative and copy

### E1 — Narrative storyboard before section design (was implicit, now explicit)
Define the page as a sequence of emotional and informational beats, not a
fixed section template. Five equal height sections with the same
heading-lede-cards rhythm is itself an anti-pattern (see C3). For every
beat in the storyboard, specify:
- what the visitor feels immediately before it,
- the new question it answers,
- the evidence it shows,
- the compositional or motion change that marks the beat,
- what the visitor should feel or believe immediately after it,
- the next natural action available to them.

Vary pace on purpose: an immersive moment, a compressed proof point, a
quiet beat, a moment of real surprise, a close in on detail, a call to
action. Do not let every beat land at the same visual weight and rhythm.

The story will usually move through some version of recognition, desire or
tension, real proof, mechanism, fit and trust, and a next step, but the
exact expression, ordering, and relative weight of these beats must be
designed for the specific business, not applied as a fixed template. Alan
Sabin's slow, reflective pacing and Personal Pieter's high energy, fast cut
pacing are both correct for their respective businesses precisely because
they are different from each other.

### E2 — Copywriting inside the prototype (was Step 7)
Research how the company and founder actually speak, the copy should sound
like them, only clearer, not like generic marketing. Avoid corporate AI
cliches: empowering the future, transforming possibilities, unlocking
innovation, seamless solutions, where vision meets impact, dynamic
intelligence used as an unexplained buzzword, and similar. Also avoid the
overused constructions listed in C3's blacklist ("not X, Y", "before
you...", etc) once they have appeared in more than one recent Astra
prototype.

Note on formatting: the strict no hyphen, no en dash, no em dash rule that
governs all of Astra's outreach messages applies to the outreach message
that accompanies and links to the prototype, not necessarily to the
prototype's own on page marketing copy, which can follow normal editorial
punctuation where it genuinely reads better. If in doubt, default to
avoiding dashes there too for consistency, but this is not a hard technical
requirement for on page copy the way it is for outreach. (Hyphens inside the
Netlify URL slug itself are a structural separator, not prose, and are
exempt from this guardrail entirely, see the hosting step in `CLAUDE.md`.)

### E3 — Separate the proposed experience from Astra's critique
The prototype the prospect actually sees must read as their proposed
website, not as an annotated teardown of their current one. Avoid
public-facing copy like:

- "The current site does not..."
- "Our proof lives on two pages..."
- "Here is what this sketch fixes..."
- "This is a prototype, not a finished site..."

Astra's diagnosis, the evidence labels, and the reasoning behind the
concept belong in a separate audit panel, an appendix, a README, or a
short closing note kept out of the primary customer-facing experience, not
folded into the headlines and body copy a prospect will actually read.
Let the design and copy of the prototype itself embody the answer to the
critique; save the explicit critique language for Raka.

---

## Stage F — Technical build and QA

### F1 — Technical build requirements (was Step 8)
- Single self contained HTML file, all CSS and JS inline, no external
  dependencies that could fail (fonts loaded via a reliable CDN are fine,
  fragile or obscure external assets are not).
- Must work cleanly on both desktop and mobile, no accidental horizontal
  overflow, no broken layouts at narrow widths.
- Every interaction must actually work, no empty `#` links, no dead
  buttons, no fake interactivity that looks broken when clicked, and no
  interaction whose meaning disappears entirely without JavaScript.
- Respect `prefers-reduced-motion`, keyboard accessibility for interactive
  elements (`aria-pressed` states, focus-visible styling), semantic
  headings and landmarks, adequate colour contrast, and useful alt text on
  every meaningful image.
- Keep strategy commentary and internal notes out of the customer facing
  experience itself (see E3); any placeholder or confirm-before-publishing
  flags belong in the accompanying research summary, not visible on the
  page a prospect would see.

### F2 — Asset integrity QA (new, prompted directly by a real live bug)
A live check on `alan.astraagency.nl` found its desktop hero requesting an
`http://` image from an `https://` page, which modern browsers block as
mixed content, silently leaving the hero blank with only alt text visible.
This exact failure mode must be checked for and blocked on every
prototype:

- Every image, video, font, script, and stylesheet must actually load
  successfully. Check this directly, do not assume.
- Every asset referenced from an HTTPS context must itself be loaded over
  HTTPS. No mixed content, ever.
- Every image element must resolve to a non-zero natural width and height.
  A broken image silently showing fallback alt text is a failure, not a
  cosmetic nitpick.
- No console errors on load.
- No CTA that points to a dead, placeholder, or unsafe destination.

### F3 — Multi-viewport visual QA
Before delivery, render and inspect the page at approximately these three
widths:
- 1440 by 900 (desktop)
- 1024 by 768 (tablet or small desktop)
- 390 by 844 (mobile)

At each width, check at minimum:
- no horizontal overflow,
- no overlapping or clipped text,
- correct visual hierarchy at that width,
- logical image crops, not a desktop crop simply squeezed narrower,
- adequate contrast and a visible focus state on interactive elements,
- below-the-fold images lazy loaded where appropriate,
- for any creative or visual category client (photography, animation,
  design, printing, and similar) confirm with an actual screenshot that
  the real work itself, not just a heading, is visible above the fold.

Approved production assets should be localised and optimised to modern
formats where feasible rather than left as large hotlinked originals.

---

## Stage G — Delivery, scoring, and hard failure gates

### G1 — Weighted design review (replaces the old unweighted Step 9 checklist)
Score every prototype honestly before calling it done:

| Dimension | Weight | The hard question it answers |
|---|---|---|
| Brand specificity | 25 | Could this only be this client? |
| Art direction and originality | 20 | Is there one coherent governing idea expressed across the whole page, not just the hero? |
| Imagery and real proof | 20 | Are the assets real, relevant, high quality, and correctly sequenced? |
| Story and pacing | 15 | Does each beat change what the buyer feels or understands? |
| Copy and voice | 10 | Does it sound like the company, not like a redesign consultant or an AI? |
| UX and interaction | 5 | Does the interaction prove the offer or deepen the experience, not just exist because interactivity was expected? |
| Technical craft | 5 | Are assets, responsiveness, accessibility, and performance actually sound? |

**Minimum score to deliver: 88 out of 100, with zero hard failures below.**
A prototype that scores 88 or above on the weighted rubric but trips any
hard failure still does not ship.

### G2 — Hard failure gates
Any one of the following blocks delivery regardless of the weighted score:

- A visually driven client category (photography, animation, design,
  printing, and similar) shipped without real visual work representing
  that client specifically.
- Any unsupported invented evidence: a client, testimonial, metric, award,
  or case study presented as if real (illustrative demo data that is
  clearly labeled per B2 is not a violation of this gate; unlabeled demo
  data presented as real is).
- A broken hero, a mixed content asset, or any asset that fails to load
  (see F2).
- Unrelated stock imagery used as if it were the client's own brand proof.
- The same core visual recipe (per C3's blacklist) as a recent unrelated
  Astra prototype, without direct client evidence justifying the repeat.
- The prototype fails the no-swap test (C5, question 3 answers yes).
- No mobile QA was actually performed (F3).
- No provenance record exists for a major asset (D1).
- The public-facing experience is dominated by critique of the client's
  old site rather than embodying the proposed new one (E3).
- An animation client's prototype ships with no actual motion or
  production visuals.
- A software client's prototype shows invented dashboard chrome in place
  of, rather than alongside and secondary to, the client's real verified
  workflow.

If strategic accuracy, brand authenticity, or technical reliability falls
short at any point in this process, revise before delivering. Do not ship
a first draft that fails on any of those three specifically, even if the
rest of the page is strong.

### G3 — Required delivery rationale
Every delivered prototype must be accompanied by a short rationale
(alongside the research summary, not a separate heavy document) covering:

- the governing concept sentence (C1),
- a summary of the Brand Evidence Pack and its sources (Stage A),
- what was inherited from the client's existing brand,
- what the category references taught, and confirmation nothing was
  copied from them,
- the anti-references used,
- the asset and provenance table (D1),
- why the typography, colour, imagery, composition, and interaction
  specifically belong to this client (C1, C2),
- what was deliberately avoided from Astra's recent prototypes and why
  (C3, C4),
- the QA screenshots and their results (F3),
- the final weighted score and hard-gate result (G1, G2),
- verified facts versus illustrative or placeholder content, restated
  plainly for a fast sanity check.

## Deliverables

- The prototype itself, a single HTML file, named `[Company]_Prototype.html`.
- A research summary and delivery rationale (per G3), compact enough for
  Raka to sanity check quickly, not a heavy formal report, covering: what
  was verified versus company reported versus hypothesis, the specific
  weakness the concept addresses, the governing concept and why it belongs
  to this client, the asset plan and provenance, the weighted score and any
  hard-gate results, and anything flagged as a placeholder that must be
  swapped before this could actually be published.
- The file should be ready to drag onto Netlify Drop or equivalent for
  hosting, that one click of actually hosting and sharing the link stays a
  manual step unless Raka has explicitly asked for the hosting step to run
  unattended too (see `CLAUDE.md`).

## Guardrails

- Never fabricate facts, statistics, client names, testimonials,
  partnerships, or regulatory claims to make a concept look more complete
  (B2).
- Never use real company or retailer logos without rights.
- Never use stock photography of real identifiable people, and never let
  generic stock imagery stand in for a specific real community or culture
  that is not the client's own (D3).
- Never build a generic redesign when a specific tool or concept was
  actually promised in the outreach thread, check what was said before
  building (A1).
- Never let two different clients' prototypes look like the same template
  in different colors (C3, C4, C5).
- Never replace a client's real available proof (real product, real
  photography, real credibility) with generic stock or invented material
  when the real material exists and is usable (D2, B2).
- Never ship a visually driven client's prototype without their actual
  work front and center (D4, G2).
- Never let the public-facing prototype read primarily as a critique of the
  client's current site (E3, G2).
- Label every placeholder and every piece of illustrative demo data
  clearly, both on the page itself and in the research summary, nothing
  fake should be able to accidentally ship as if it were real (B2).
