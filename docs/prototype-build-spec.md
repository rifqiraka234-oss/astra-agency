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
>
> **Update (2026-08-12, later):** after actually rebuilding three prototypes
> under this spec (Rosalie Voortman, Point Audit, That Animation Company),
> the work itself exposed gaps the rewrite had not anticipated: type that is
> chosen but never rendered, a medium the builder cannot play, an
> interactive-panel bug shipped twice, deliverables stranded by an ignore
> rule, and a send step the spec was silent on. Those lessons are folded in
> as F2b (font-load gate), F2c (medium-I-cannot-render protocol), F4
> (interactive integrity and no-JS render), Stage H (the send), and the
> Portability and Payload-budget rules under Deliverables. The full
> reasoning is in `docs/prototype-pipeline-retrospective-2026-08-12.md`.
>
> **Round 2 update (2026-08-17):** a second audit of the three *deployed*
> prototypes found the art-direction problem largely fixed and a new one
> exposed underneath it: all three were **strong concept slices presented as
> if they were finished websites**. They proved one idea well, then stopped
> before the visitor had the evidence, human reassurance, operational detail,
> and conversion support needed to act. The failure is no longer generic art
> direction, it is **story and product compression**: one narrative mistaken
> for the whole business story, one workflow mistaken for the operating
> model, names mistaken for human presence, a CTA label mistaken for a
> conversion journey, and unbuilt areas disappearing silently instead of
> being tracked. The governing rule this round adds:
>
> > **A prototype may simplify a business, but it may not make the business
> > look simpler than it is.**
>
> This round adds Stage 0 (deliverable mode and Site Completeness Contract),
> A4/A5 (business-system model, Role × Journey × Evidence matrix), D5 to D7
> (imagery storyboard, image scoring, crop gates), E4 to E8 (Human Trust
> Plan, Proof Ladder, workflow coverage, case-study anatomy, designed
> ending), F5 to F9 (conversion journey, interaction states, media playback
> contract, asset-delivery rule, responsive art direction), and G4 (Coverage
> Ledger). The rubric is replaced with a 100-point version at a **90/100**
> threshold. Every Round 1 rule below remains in force.

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

## Stage 0 — Declare the job before researching or designing it

This stage exists because a prototype that is honestly scoped as a slice and
a prototype that silently *is* a slice look identical at delivery. Declaring
the mode first makes the difference reviewable.

### 0.1 — Declare the deliverable mode
Every build is assigned exactly one mode, written down before research
starts:

1. **Concept slice** — proves one governing idea. Must be visibly labelled
   internally as incomplete.
2. **Conversion landing page** — completes one buyer decision and its full
   CTA journey.
3. **Full prototype** — demonstrates the complete site architecture, the
   principal routes, and the critical workflows.
4. **Production candidate** — content, states, assets, integrations,
   accessibility, and technical QA are all delivery ready.

**If Raka asks for a website, a prototype, or a mockup without explicitly
asking for a concept slice, the mode is `full prototype`.** Concept slice is
never the silent default.

The final response may not call a concept slice "the website," "finished,"
or "complete."

### 0.2 — Write the Site Completeness Contract
Before any wireframe, build a table of every expected page, route, section,
critical interaction, and conversion path. Mark each one:

- required and built;
- required and demonstrated inside another page;
- summarized because full implementation is unnecessary;
- intentionally deferred, with the reason;
- blocked by a missing fact or asset;
- not applicable.

No critical area may disappear silently. **The same table ships again at
delivery with its final status** (see G4), which is what makes this a
contract rather than a plan.

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

### A4 — Model the business before modelling the page
Do not start information architecture from a list of features. Start from
flows and decisions, then decide where features belong. Research the
business as a system and write down:

- the actors and buyer roles;
- the primary jobs to be done;
- the value-creation workflow (how the business makes the thing worth
  paying for);
- the delivery workflow (how it actually reaches the customer);
- inputs, decisions, handoffs, and outputs at each stage;
- the evidence created at each stage (this is what the page can later show);
- anxieties, objections, and failure risks;
- the conversion step and what happens after it.

A page built from a feature list describes a product. A page built from this
model describes a business, which is what the buyer is actually evaluating.

### A5 — Role × Journey × Evidence matrix
For every material role, record: what they arrive needing, what they need to
understand, what they need to see, what they need to believe, what could
stop them, their next action, and the real proof that resolves the decision.

| Role | Arrives needing | Must see | Must believe | Blocker | Next action | Proof that resolves it |
|---|---|---|---|---|---|---|

**For B2B software with multiple operational roles, showing only the
executive or only the end user is a hard failure.** A tool bought by a
director, configured by an administrator, and used daily by someone on the
floor has three buyers, and the page has to answer all three.

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
removed and answer:

1. Can a reviewer identify the industry from the design alone?
2. Would the actual client recognise their own character in it?
3. Could this same design be sold to one of the last three prospects by
   swapping the text, images, and accent colour?

If the answer to question 3 is yes, the work fails this stage. This is the
single sharpest test in this spec: it is exactly what exposed that Point
Audit, That Animation Company, and Voortman & Baumhauer were recognisably
the same underlying design applied three times.

**Do this as a produced artifact, not a thought experiment.** Actually
generate the logo-removed, cropped hero screenshots of this prototype and
of the last few, and lay them side by side. Self-grading the test from
memory is how three near-identical pages each passed it individually. A
real side-by-side makes the shared recipe impossible to miss.

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
- **When no client asset exists and licensed stock is genuinely the right
  call** (context/atmosphere imagery, per D1, never presented as the
  client's own work): verified working source order in this build
  environment, most reliable first —
  1. **Openverse filtered to `source=rawpixel`**
     (`api.openverse.org/v1/images/?q=...&source=rawpixel&license=cc0,pdm,by`)
     — modern, clean, CC0, no key required. This is the source that
     actually produced usable results.
  2. **Wikimedia Commons** (`commons.wikimedia.org/w/api.php?action=query&
     generator=search&gsrsearch=filetype:bitmap ...`) — reachable, no key,
     but results skew dated (2000s-era stock, low resolution) and need
     heavy curation.
  3. **Openverse's default search** (unrestricted `source`) — mostly
     Flickr, mixed quality, heavy curation needed.
  - **Unsplash and Pexels are typically unreachable in this environment**:
     Unsplash's search is JS only and its internal API returns
     "Authorization required"; Pexels' API returns "Missing API key" with
     no key available. Do not spend calls retrying these unless the
     environment is confirmed to have changed.
  - **Always build a contact sheet and look at every candidate before
    selecting**, per addition 34's oversupply rule. Watermarks, cartoon/
    clip-art results, and off-topic matches show up even in CC0 pools and
    are only caught by looking, never by trusting the query match.
  - Re-encode each selected image near its actual display size (roughly
    2x per addition 23/D7), not at the source resolution, to keep payload
    reasonable.

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

### D5 — Imagery storyboard and shot list
The D1 asset plan lists what exists. This sequences it into a story. For
each visual beat, declare which role it plays:

- establishing the world;
- human connection;
- work or product proof;
- process artifact;
- tactile or detail moment;
- transformation or outcome;
- social proof;
- conversion reassurance.

The minimum useful sequence for most full prototypes is: establish the
world, show the real work or product, introduce the relevant human, reveal
how value is made, show detail and texture, show the result in use, close
with credible proof and an action. This is a storytelling checklist, not a
fixed page order.

### D6 — Score every important image before using it
Score each major image or video from 0 to 5 on: authenticity/provenance,
relevance to the claim it sits next to, brand fit, narrative role, technical
quality, and coherence with the sequence.

**Minimum 24/30, with no score below 4 on authenticity/provenance or
relevance.**

An attractive image that does not prove, humanize, explain, or deliberately
create atmosphere may not occupy a major section. "It looked good there" is
not a narrative role.

### D7 — Image quality and crop gates
- Prefer source pixels at roughly 2× the intended CSS dimensions for
  prominent raster imagery.
- Do not upscale beyond 1.25× without explicit review.
- **Never force a landscape production frame into a portrait crop** without
  checking every important subject and composition. Art-direct
  `object-position` per image when using `cover`.
- Review faces, hands, text, UI, and focal points at every breakpoint.
- Reject AI artifacts, heavy compression, colour banding, muddy shadows, and
  inconsistent grading.
- A screenshot of UI must stay legible at its displayed size. If it cannot,
  use a focused crop or an annotated zoom instead of shrinking it.
- Production candidates use responsive `srcset`/`sizes`, modern formats, and
  explicit dimensions.

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

### E4 — Human Trust Plan (people are a designed layer, not a bio block)
Before choosing final sections, ask:

- Is the founder's expertise central to the promise?
- Is the service personal or relationship led?
- Will the buyer work directly with the named people?
- Does delivery depend on a small creative or specialist team?
- Is operational credibility being claimed through lived experience
  ("built by operators," "20 years in the industry")?

**If any answer is yes**, the prototype must normally include a real
approved portrait, the name and actual role, concise relevant credibility,
one human sentence in that person's natural voice, and visual context of the
person at work where available.

If no approved image exists, raise an explicit asset request or use an
honestly labelled placeholder. Replacing the person with an icon, an
abstract shape, or a text-only bio and calling the section done is a hard
failure. A section that promises "who you'd work with" and then withholds
the people is worse than not having the section.

### E5 — The Proof Ladder
Rank the evidence available, strongest first:

1. verified customer outcome or attributed testimonial;
2. real product or work in use;
3. complete case study;
4. real interface or process artifact;
5. named human expertise;
6. specific, sourced factual claim;
7. explanation;
8. decorative metaphor.

**The top half of a full prototype must contain evidence from levels 1 to 5
wherever it genuinely exists.** Do not build a whole page out of levels 6 to
8. And **no more than two consecutive story beats may pass without
introducing new meaningful evidence** — that is the specific rhythm failure
that makes a page feel like well-written wireframes.

### E6 — End-to-end workflow coverage gate
Every full prototype must demonstrate **at least one complete primary
workflow from input to measurable output**, and must summarize every other
critical workflow found in research (A4).

- For software or product businesses, the primary workflow includes setup
  and configuration, execution, exception handling, ownership, closure, and
  reporting where relevant.
- For service or creative businesses, it includes discovery, scoping,
  preparation, delivery, review and selection, handover, and post-delivery
  use where relevant.

The workflow may be simplified. **No stage may be invented.** Showing one
happy path and silently omitting setup, exceptions, ownership, or closure is
a hard failure unless the omission is disclosed in the Coverage Ledger.

Where the business is a continuous loop rather than a line, the diagram must
close the loop. A quality-management product whose story ends at "issue
resolved" has described issue tracking, not quality management.

### E7 — Case-study depth where the work is the product
Creative, consulting, software, and implementation businesses may not rely
on shallow project cards alone. **At least one flagship case study** must
carry: context and verified starting problem, goal and audience, the
approach or mechanism, meaningful process evidence, final output evidence,
contributor and role clarity, a verified result or a carefully qualified
qualitative outcome, a client or user voice where available, and the next
relevant action.

Category specifics: animation needs final motion, styleframes or process,
and credits. Photography needs a coherent image series and its use context.
Software needs a real workflow and a case outcome.

### E8 — Design the ending, not only the hero
The last 20% of the page must deliberately close the story, resolving:
trust, fit, practical questions, risk, what happens next, how quickly the
visitor will hear back, and a secondary route for someone who is not ready
to convert.

Do not end immediately after a feature grid, price cards, or two
biographies. The hero earns attention; the ending earns the reply.

## Stage F — Technical build and QA

### F1 — Technical build requirements (was Step 8)
- Single self contained HTML file, all CSS and JS inline, no external
  dependencies that could fail (fonts loaded via a reliable CDN are fine,
  fragile or obscure external assets are not).
- **Environmental note, confirmed repeatedly in this build environment:**
  Chromium cannot navigate to any external host through this container's
  proxy (`ERR_CONNECTION_RESET` on every attempted external URL), so a
  competitor's or client's live site cannot be screenshotted directly with
  Playwright. `curl` through the same proxy works fine for fetching HTML,
  CSS, JS bundles, and images. The working pattern: `curl` the target page
  and its referenced assets, rewrite the asset URLs to local relative
  paths, then point Playwright at the local `file://` mirror to render and
  screenshot it. This also means fonts must be fetched via `curl` and
  embedded as base64 `@font-face` data URIs (Google Fonts is reachable this
  way) rather than linked, both because the Artifact CSP blocks font CDNs
  and because a live page render in this sandbox cannot reach any CDN
  either. Re-verify this constraint at the start of a session rather than
  assuming it, the proxy configuration can change.
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
- **Verify any live-site fact that drives a gate, live.** If a design
  decision or a hard-failure gate depends on something observed on a real
  site (a mixed-content bug, a missing form, "their site already shows X"),
  re-confirm it against the live site yourself before relying on it. Sites
  change, and a second-hand or stale observation can drive a wrong build or
  a wrong critique. This rule exists because the Alan mixed-content rule
  above was first written from a report, not a fresh check.

### F2b — Font-load gate (chosen type must actually be seen)
Stage C2 makes typography an evidence-based decision, so the finished page
must actually be rendered with that type, not just specified in CSS.

- Render once with the real webfonts loaded, and once in the fallback stack
  (fonts blocked or not yet arrived). Neither state may break the layout:
  no wrapping nav, no clipped headline, no overflow that only appears in one
  state. A wider fallback font wrapping a sticky header into the page is a
  real bug this catches.
- Define a fallback stack whose metrics are close to the chosen webfont, so
  the fallback render is a near miss, not a different layout.
- **If the build environment cannot load the webfonts at all, typography is
  UNVERIFIED, not passed.** Say so explicitly in the research summary and
  require a real-browser check of the type before the prototype is trusted.
  Do not describe a fallback-font screenshot as if it showed the real
  design.

### F2c — The "medium I cannot render" protocol
Some builds depend on an asset the build environment physically cannot play
or decode (a video codec the sandbox lacks, audio, a third-party embed).
When that happens:

- Do the structural check you can: valid container/format, metadata loads,
  correct `<video>`/`<audio>`/embed markup, a real poster present, no dead
  source.
- **Flag the asset as playback-unverified in the research summary, and make
  a real-browser playback confirmation a BLOCKING pre-send gate**, not a
  footnote. For a category whose proof *is* that medium (an animation studio
  whose proof is motion), shipping it unseen is a hard failure until a human
  or a capable browser has confirmed it plays. Never let the core proof of
  the page go out having never been rendered by anyone.

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

### F4 — Interactive integrity and no-JS render
Most signature devices are tab sets, steppers or switchers that show one
panel at a time. They fail in small, repeatable ways. Check every one:

- **`[hidden]` must actually hide.** A class rule like `.panel{display:grid}`
  has higher specificity than the `[hidden]` user-agent style and silently
  cancels it, so panels never switch even though the tab highlights. Give
  the hide rule enough specificity (e.g. `html.js .panel[hidden]{display:
  none}`) and verify in render that switching a tab actually changes the
  panel, not just the selected state. **This exact bug has now shipped
  three separate times across three separate builds** (Rosalie, Point
  Audit, and again on Greentic's rebuild), each time despite the rule
  above already being written down. A rule that gets read and still
  misses is not doing its job as a written note; it needs an automated
  assertion, not a manual glance. Every build must include a scripted
  no-JS check (a Playwright context with `javaScriptEnabled: false`,
  asserting every panel/view that should be readable without JavaScript
  actually reports non-zero rendered height) before the build is called
  QA'd, not just "take a screenshot and eyeball it."
- **Gate the hiding behind a JS flag** (a `js` class set by script on load)
  so that with JavaScript disabled all panels render stacked and the
  content survives, per F1's "no meaning lost without JavaScript" rule.
- **Run the scripted no-JS check described above**, and additionally take
  one screenshot with JavaScript disabled for a human-readable record that
  the meaning is still there.
- **Confirm images inside initially-hidden panels decode when revealed.** A
  hidden panel's images report zero natural dimensions until shown; that is
  expected, but click through every panel and confirm zero genuinely broken
  images once each is open.

---

### F5 — Complete the conversion journey
A CTA is not finished because it is styled as a button. For every primary
CTA, define: destination, information requested, validation and error state,
privacy or consent need, success state, confirmation or response
expectation, fallback contact route, and tracking requirement if applicable.

**If the destination is an email address, label it as email or contact.** Do
not visually promise "Book a walkthrough" or "Book a demo" when no booking
or structured request flow exists behind it. That mismatch is a hard
failure, and it was shipped on two of the three audited prototypes.

In a prototype, forms may be simulated, but the required fields and the
success and error states must still be designed and clearly labelled as
prototype behavior.

### F6 — State-complete interaction design
Every interactive component needs: default, hover where relevant, keyboard
focus, selected/active, disabled where relevant, loading, success,
error/fallback, and reduced-motion behavior.

- Tabs must expose `aria-selected` (or a correct equivalent). Toggle buttons
  must expose `aria-pressed` where appropriate.
- **Active state may never exist only as colour.**
- Every tab, carousel, media switcher, form, and CTA must actually be
  clicked and tested in every state before delivery. Not reasoned about,
  clicked.

### F7 — Media playback contract
For every video or animation:

- verify the **actual media plays**, not just that a poster renders;
- verify **every alternate tab or state**, not only the one that loads first
  (an audited prototype shipped with two of three reels never opened);
- include intentional controls, a poster, and a fallback still;
- provide captions or a transcript where speech or meaning requires it;
- respect reduced motion, and ensure the page still communicates without
  autoplay.

An animation studio's page fails if its motion cannot be played reliably.
This gate stacks with F2c: if the builder cannot decode the medium, the
real-browser playback confirmation is blocking, not advisory.

### F8 — Do not embed every asset in one HTML file by default
Self-contained HTML is for a constrained handoff that explicitly requires
it. It is not the default production method.

Normally: use organized local asset files, compress and resize per use,
lazy-load below-fold media, avoid duplicate video sources, provide posters,
record provenance, keep the HTML readable, and test page weight and startup
behavior.

Cautionary example from the round 2 audit: the That Animation Company page
carried roughly **7.37 million characters** of base64 image, poster, and
video data in HTML attributes (Rosalie ~1.62M, Point Audit ~0.48M). Some of
that was chosen because it made file delivery convenient, which is a
delivery-channel reason wearing a product decision's clothes. Keep those
separate.

### F9 — Responsive art direction, not just responsive layout
Breakpoints must not merely stack the same rectangles. At each width,
decide: which image leads, which crop changes, what is compressed or
expanded, how motion is treated, whether a grid becomes a sequence, whether
text width and pacing still feel intentional, and whether people, product,
and proof still appear early enough.

Capture and compare screenshots at every required width and state the
material art-direction changes in the delivery rationale.

## Stage G — Delivery, scoring, and hard failure gates

### G1 — Weighted design review (replaces the old unweighted Step 9 checklist)
Score every prototype honestly before calling it done:

| Dimension | Weight | The hard question it answers |
|---|---|---|
| Brand specificity | 15 | Could this only belong to this client? |
| Narrative and emotional pacing | 15 | Does the story deliberately change what the visitor feels and understands? |
| Imagery and art direction | 15 | Is every major visual authentic, high quality, coherent, and purposeful? |
| Workflow and business completeness | 15 | Does the experience represent the real value-creation loop and the critical journeys? |
| Real proof and human trust | 15 | Are the work, product, people, clients, and outcomes tangible enough to trust? |
| Buyer fit and objection coverage | 10 | Does each priority role get the evidence it needs to decide? |
| Conversion completeness | 5 | Does the next step actually work, from CTA through confirmation? |
| Interaction and accessibility | 5 | Do all states work semantically, visually, and by keyboard? |
| Technical reliability and performance | 5 | Do all assets, media, routes, and responsive states work efficiently? |

**Minimum score to deliver: 90 out of 100, with zero hard failures below.**
A prototype that scores 90 or above but trips any hard failure still does
not ship.

This replaces the Round 1 rubric (which weighted brand specificity at 25 and
capped at 88). The reweighting is deliberate: under the old rubric a page
could score well on brand specificity, art direction, and imagery alone,
which is exactly how three concept slices passed while workflow
completeness, human trust, and conversion went unscored. Those three are now
worth 35 points together.

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
- The core proof of the page is a medium the builder could never render or
  play (F2c) and it is sent without a real-browser playback confirmation.
- Typography was never rendered with the real webfonts and is being treated
  as verified anyway (F2b).

Added in Round 2 (2026-08-17). These sit alongside every gate above, none of
which is retired:

- A full prototype that is actually an unlabeled concept slice (Stage 0.1).
- A founder or team credibility claim with no real person visible, when
  imagery is available or obtainable (E4).
- A personal or creative service that never introduces the person delivering
  it (E4).
- A software site that demonstrates one happy path while omitting setup,
  exceptions, ownership, closure, or reporting **without disclosing it** in
  the Coverage Ledger (E6).
- A screen labelled "real" that renders blank or fails to decode (F2). The
  label makes it worse: the page makes a proof claim exactly where the proof
  asset fails.
- An image or video tab whose alternate states were never opened and
  verified (F7).
- A video service promoted without playable video proof (F7).
- Project cards with no complete case study, where the work is the main
  product (E7).
- A CTA that promises booking or a demo but only opens an unlabeled email
  link (F5).
- A large landscape work sample cropped into a composition that hides the
  important part of the work (D7).
- An important interaction state communicated only by colour (F6).
- Major tabs or toggles lacking correct selected-state semantics (F6).
- A production candidate using massive base64 media blobs with no explicit
  necessity (F8).
- No Site Completeness Contract (0.2).
- No Role × Journey × Evidence matrix for a multi-role product (A5).
- No Coverage Ledger at delivery (G4).
- Calling the work complete while critical pages, proof, assets, or
  workflows remain silently absent.

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

---

### G4 — Prototype Coverage Ledger (ships with every delivery)
The Site Completeness Contract from 0.2 comes back here with final status,
plus a ledger listing:

- researched facts used;
- unverified facts deliberately excluded;
- assets used, with provenance;
- missing asset requests;
- complete workflows shown;
- partial workflows summarized;
- pages and routes built;
- routes intentionally deferred;
- interactions actually tested;
- accessibility checks performed;
- unresolved risks;
- the exact next steps to reach production ready.

**No "finished" claim is allowed while a critical ledger item is
unresolved.** The ledger is what converts "I think it's done" into something
Raka can check, and it is what stops an unbuilt area from vanishing quietly
between the plan and the delivery.

## Stage H — The send (the prototype is not the goal, a booked meeting is)

The old spec ended at "the prototype is done." In practice the prototype
then has to be hosted and sent, and that hand-off is where avoidable
mistakes happen. These are pre-send gates, all of them cheap.

### H1 — Promised-concept fidelity gate
Before sending, open the actual outreach thread and quote, verbatim, the
concept that was promised to this lead. Confirm the prototype delivers that
specific thing, not a near neighbour. (Point Audit was promised "a
multi-property walkthrough from group dashboard to resolved issue"; the
stepper had to deliver exactly that.) If the built concept drifted from
what was promised, fix the mismatch or change the message, do not paper over
it.

### H2 — Link re-verification at send time
Immediately before sending, fetch the live URL and confirm it returns 200,
that its `<title>` matches, and that its byte size matches the file you
built. This proves the correct, current build is deployed at that URL, and
catches a stale deploy, a wrong slug, or a half-uploaded file before a real
prospect clicks it. Never send a link you have not just re-checked. And
never send the core-proof medium without the F2c playback confirmation.

### H3 — Send-note tone, keyed to the lead
The message that carries the link follows the outreach voice rules in
`docs/astra-master-context.md` section 9 and the no-dash guardrail on the
message text (hyphens in the URL slug are exempt). Beyond that, calibrate
the tone from the lead's own last reply and sentiment:

- **Not shopping / low interest** (a polite "you can send it, but we are not
  looking"): no call ask, no urgency, frame it as "we already had this
  sketched, thought it might be useful." Leave the door open softly.
- **A concrete objection** (budget, "we are a start up, no resources for an
  overhaul"): answer that exact objection in the note ("this is a concept to
  react to, not a bill"), do not ignore it.
- **Active interest / already offered to talk**: steer straight to the
  meeting, propose a concrete next step and time, since the goal of every
  send is a booked meeting, not a good conversation.

Always reference the concept actually promised, and if there has been a real
gap since the last message, acknowledge it plainly rather than pretending
there was none.

### H4 — Record the send
Append the row to `state/prototypes.jsonl` with `outcome: "pending"` and log
it, per `CLAUDE.md`. On a reply, drive toward the booked meeting (positive)
or a genuinely different angle (decline), never a repeat of a declined
concept.

## Stage I — Density, craft, and production-readiness (Round 3, folded in 2026-08-18)

> **Integration note:** additions 33 to 47 below were developed and verified
> in `docs/prototype-framework-addendum-round-3.md` against the three
> deployed prototypes and Astra's own hand built sites. That document has
> the full measurement, the reasoning, and the worked examples; this section
> is the operational summary folded into the canonical spec so a build does
> not depend on a separate file to be complete. If the two ever disagree,
> re-read the addendum, it is the source of truth for *why*, this section is
> the source of truth for *what to do*.

### The finding this stage exists to fix
Stage A through H (Round 1) fixed generic art direction. Stage 0 through G's
Round 2 additions fixed incomplete business stories. Neither fixed
**thinness**: Claude's default expression of "premium" is whitespace,
desaturation, one grotesk, and few assets, which is the vocabulary of
minimalist SaaS, not of the art, craft, and service industries Astra
actually serves. Measured against Astra's own hand built sites, prototypes
built under Round 1 and 2 alone carried 45% fewer sections, 75% fewer h3
subsections, and zero forms. **Restraint is a choice that strengthens what
remains after removing something. Emptiness is the absence of material.**
A prototype must earn minimalism with density, not substitute one for the
other.

### I1 — Density floor by category (addition 33)
Before delivery, count the page's own images/figures, words, and h3
subsections and compare against the floor for its category. A shortfall is
allowed only with a written reason in the Coverage Ledger (G4).

| Category | Min. images/figures | Min. words | Min. h3 |
|---|---:|---:|---:|
| Photography, illustration, design portfolio | 35 | 500 | 8 |
| Animation, film, motion | 12 stills + 4 motion | 600 | 10 |
| Printing, manufacturing, physical product | 25 | 900 | 12 |
| B2B software, operations | 15 | 1200 | 18 |
| Coaching, consulting, personal service | 8 | 900 | 12 |
| Marketplace, comparison | 20 | 1200 | 20 |

These are floors derived from real category leaders (Carianne Older 79
images, MOO 46, Lumiform 40, SafetyCulture 37), deliberately set below them.
For a B2B software client with no real product screens or photography to
draw on, authored SVG information figures (flow diagrams, run logs, state
diagrams) count toward the figure floor, disclosed as authored rather than
captured in the Coverage Ledger.

### I2 — Asset oversupply (addition 34)
Gather roughly 5x the assets the page will actually use before designing,
then edit down. Record what was gathered, what was placed, and why each
rejected asset lost. If the density floor in I1 cannot be reached from
available assets, that is an asset request to the client before build, not
a constraint to quietly design around.

### I3 — Image role quota (addition 35)
No single image role may exceed 50% of major imagery. Across the page, hit
at least five of: establishing the world, human at work, the work/product
itself, process artifact, tactile macro detail, the result in use, scale
reference, social proof, conversion reassurance.

### I4 — Designed brand mark (addition 36)
A prototype proposing a brand experience needs an actual identity
treatment, not the company name set in a webfont: a wordmark with real
drawing or spacing decisions, a monogram, a symbol, or an explicit and
justified typographic lockup. Where a real client logo exists, use it
faithfully. The mark should ideally connect to the governing concept
(Stage C1) rather than being generic.

### I5 — Nomenclature test (addition 37)
Apply the governing concept to the page's own furniture, not just the hero.
At least four of these should carry the concept's vocabulary: section
names, step/stage names, nav labels, the CTA verb, status/state labels,
card treatment, iconography, borders, the empty state. If the concept only
survives in the headline and an accent colour, it fails C1 as decoration.

### I6 — No flat sections (addition 38)
Every major section needs internal structure beyond heading, paragraph, and
a row of equal cards: named sub-parts, a real table, a comparison with
criteria, an ordered process with distinct named steps, a spec list, a Q&A
set. Target roughly the human baseline from I1's h3 floor, not four
sections total for the whole page.

### I7 — Real information architecture (addition 39)
A full prototype (Stage 0.1) needs genuine site structure: at least 6 real
nav destinations, at least 2 routes built as separate views (not just
anchors on one scroll), every other route logged in the Site Completeness
Contract (0.2) with its status, and a real footer with grouped link
columns. One scrolling page with anchor links is a landing page, not a full
prototype, and calling it one trips the Stage 0.1 hard failure.

### I8 — Conversion apparatus (addition 40)
Every full prototype ships a real, designed form: actual fields, required
vs optional, a validation error state, a success state, a privacy line,
labelled as prototype behaviour where genuinely simulated. A `mailto:` link
is never styled as a booking system. Zero working forms across a delivery
batch is itself a signal this stage was skipped.

### I9 — Colour and contrast budget (addition 41)
State the intended chroma before build and justify desaturation in writing
if chosen, referencing the client's existing assets. Desaturation must
never be the unstated default. When a client's own identity is itself an AI
default (a dark-plus-one-accent SaaS palette with no real brand history
behind it), that is grounds to widen the palette deliberately rather than
inherit the default, provided the widening is justified and logged.

### I10 — Human presence quota (addition 42)
If people deliver the service, faces appear: one approved portrait, or an
honestly labelled placeholder plus a logged asset request, never a
dashed empty frame announcing an absence (see I14). Text-only bios under a
heading that promises "who you'd work with" is a hard failure carried
forward from Round 2's addition 20.

### I11 — The ending is a stack (addition 43)
The final 20% needs at least four distinct closing moves: a restated
promise, practical next-step mechanics, risk/objection resolution, a
response-time expectation, a secondary route for the not-yet-ready, and a
real grouped footer. A heading and one button is stopping, not closing.

### I12 — Bench render (addition 44)
Before delivery, compare the page's own structural counts (sections, h2,
h3, words, figures, forms, routes) against two category leaders, counted
from served HTML. Where a leader's site cannot be rendered honestly in this
environment (client-side heavy, animation-gated), say so and use numeric
counts rather than fabricate a visual comparison. Answer in writing: which
looks thinnest, which has the most material, and would a stranger guess
this one was template-generated.

### I13 — Restraint vs emptiness check (addition 45)
For every large area of empty space, name what it is framing. Whitespace
around a commanding image is composition. Whitespace around a small image
and a short paragraph is a page that ran out of material. If more than two
major sections cannot name what their empty space is doing, the page is
empty, not restrained, and needs material, not a layout tweak.

### I14 — The prototype IS the production environment (addition 47, Raka 2026-08-17)

Raka, after finding a caption reading "Stock, not a customer" printed under
a photo on a delivered prototype: **"Can you please NEVER use captions like
this on prototype environment. Treat prototype environment as PRODUCTION
FINAL environment."**

This is Stage E3 (separate the proposed experience from Astra's critique)
violated in a form the original wording didn't anticipate. E3 banned
critique of the *old* site. It did not explicitly ban build-process
scaffolding, so a page shipped carrying figure numbers, `ILLUSTRATIVE`
badges, provenance captions on photos, a dashed "PORTRAIT TO BE SUPPLIED"
box, "SLOT OPEN," sentences describing prototype behaviour ("nothing is
submitted," "in the real build this would..."), and an agency byline in the
footer. Each one was individually defensible as honesty. Together they
turned a client website into an annotated internal document.

**The rule: nothing on the rendered page may reveal that it is a
prototype, unfinished, or made by an agency.** A visitor must be able to
read it as the live site. Specifically banned from the delivered page:

- figure numbering ("Fig 1.") or any academic caption register;
- badges/chips reading ILLUSTRATIVE, SAMPLE, DEMO, PLACEHOLDER;
- captions disclosing an asset's provenance ("stock," "not a customer,"
  a licence name);
- dashed placeholder frames, "to be supplied," "coming soon," "slot open";
- sentences describing prototype behaviour instead of just behaving
  correctly ("nothing is submitted," "in the real build this would...");
- an agency byline, "concept prototype," or delivery notes in the footer;
- credits blocks, licence blocks, asset manifests.

**Where the disclosure goes instead**, since B2's factual-integrity rule
still binds and is not weakened by this addition:

1. At most one discreet, production-normal footnote in the footer, in the
   register real software companies use for exactly this ("Product visuals
   and examples on this site show sample data.") — this is how Lumiform,
   SafetyCulture, and hotelkit all handle the same problem.
2. Everything else — provenance, licences, asset requests, the score, open
   gaps — moves into the internal rationale document (G3/G4), which is for
   Raka and the next builder, never for the client.

**A missing asset is a design problem, not a caption.** When a photo does
not exist, do not ship an empty frame announcing its absence. Design a
treatment that reads as deliberate (a typographic monogram in the brand's
own style is one worked example). Log the asset request in the rationale
document, not on the page.

**Pre-delivery check:** extract the full rendered text (all views/panels/
FAQ items forced open) and grep it for
`illustrative|prototype|stock|placeholder|sample|concept|to be
supplied|fig [0-9]|astra|not a customer`. Every hit must be either genuine
client copy or the single approved footnote.

### I15 — Revised rubric (100 points, ship at 90)
This replaces the Round 2 rubric in G1. Brand specificity dropped from 25
to 15; workflow completeness, real proof, and human trust — previously
unscored as their own dimensions — now carry 15 each, because a page that
scored well on brand specificity and imagery alone is exactly how three
concept slices passed Round 1/2 review while being materially thin.

| Dimension | Weight |
|---|---:|
| Brand specificity | 15 |
| Narrative and emotional pacing | 15 |
| Imagery and art direction | 15 |
| Workflow and business completeness | 15 |
| Real proof and human trust | 15 |
| Buyer fit and objection coverage | 10 |
| Conversion completeness | 5 |
| Interaction and accessibility | 5 |
| Technical reliability and performance | 5 |

**Minimum to ship: 90/100, zero hard failures.** (This supersedes G1's
88/100 threshold.)

### I16 — New hard failures (merge into G2, none of G2's originals retired)
- Density floor (I1) missed for the category with no written reason.
- A portfolio/gallery presenting fewer pieces than exist or could be
  requested.
- The same asset reused three or more times on one page, or duplicate
  embedded media payloads.
- A brand/identity concept with no designed mark (I4).
- A governing concept naming fewer than four page elements (I5).
- Fewer than three sections containing named sub-parts (I6).
- A full prototype with no working form and no real routes (I7, I8).
- A named individual with no face and no logged asset request (I10).
- A page whose entire ending is one heading and one button (I11).
- Any build-process scaffolding visible on the rendered page: figure
  numbers, ILLUSTRATIVE/SAMPLE chips, provenance captions, placeholder
  frames, prototype-behaviour sentences, agency bylines, credit blocks
  (I14). This is a hard failure even if every other gate passes.
- Any render-based conclusion drawn without forcing lazy images eager,
  scrolling the full page, and waiting for fonts before judging (F2b/F2c's
  companion rule, restated: a sandbox rendering artifact is not a live
  defect until decoded/re-rendered and confirmed).

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

### Portability (do not let a finished deliverable get stranded)
The moment a prototype passes QA it must be made portable, committed to the
working branch even though `state/prototypes/` is normally gitignored as a
working-artifact directory (force-add the finished HTML and its research
summary). Sessions and containers are ephemeral, and hosting often happens
from a different session than the build. An ignore rule that keeps working
scratch out of git must never be the reason a finished, sendable prototype
only exists on one dying container. Once it is hosted and sent, it may be
removed from git again to keep the repo lean, since it then lives on Netlify.

### Payload budget
Prefer real assets, kept light. Target a total page weight under about 2MB.
Over roughly 5MB, justify it in writing in the research summary. For heavy
media (video especially), prefer a small multi-file bundle
(`index.html` plus an `assets/` folder) deployed as a Netlify site, since
Netlify serves folders happily, rather than base64-embedding megabytes into
a single file. Reserve single-file base64 embedding for when a genuinely
self-contained single file is the actual deliverable, and do not choose it
because it happens to be convenient to hand around, that is a
delivery-channel reason masquerading as a product decision.

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
