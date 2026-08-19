# Archetype HR — prototype rationale and coverage ledger

Contact: Jori Chykerda, Co-Founder & CEO, Archetype HR (Edmonton/St. Albert, AB).
Live site: https://archetypehr.com
Build date: 2026-08-19. Angle number: 1.

---

## H1 — Promised concept, quoted verbatim from the thread

Opener (2026-07-21): "Our agency sketched an interactive product walkthrough
showing the journey from employee assessment to a manager preparing for a
real conversation. It could help make the waitlist more tangible and
validate the experience with potential pilot customers before the full
build."

Follow-up (2026-08-18, 08:27): "HR leaders still cannot see what an archetype
profile or manager dashboard actually looks like before joining the
waitlist. The walkthrough we sketched shows that journey."

Jori's reply (2026-08-18, 15:38): **"Hi Raka, we have already prototyped
this. What exactly did your team put together?"**

**Reading of that reply (Raka's call, 2026-08-19):** his team built something
internally, and this needs to be genuinely strong enough to be worth showing
alongside it, not a generic mockup. That is the bar this build is held to.

**Binding requirement:** a walkthrough of the real journey Archetype HR
themselves describe (assessment to archetype profile to manager dashboard to
a real conversation), interactive, showing what an archetype profile and a
manager dashboard actually look like, since nothing like that exists
anywhere on their live site today.

## Stage 0.1 — Deliverable mode

**Full prototype.** Not a concept slice: an interactive, multi-stage
walkthrough was explicitly promised, and Stage 0.1 makes full prototype the
default whenever a slice was not explicitly agreed. This also needs the
density and interaction rigor of a full build given who it is being shown to.

## Stage 0.2 — Site Completeness Contract

| Area | Status |
|---|---|
| The 5 real process stages, walked through in order | **Required, built**, each a separate view |
| A real archetype profile screen | **Required, built** — clearly labelled illustrative data (I14 footer footnote), since no real assessment output exists publicly |
| A real manager dashboard screen | **Required, built**, same labelling |
| The "manager preparing for a real conversation" moment specifically named in the promise | **Required, built** as its own stage, not folded into the dashboard |
| Founders, real photos and real bios | **Required, built** |
| The real Gallup stat and the real problem framing | **Required, built**, quoted exactly |
| Pricing / signup mechanics | **Not applicable** — pre-launch, waitlist only, own site has no pricing page |
| Full marketing site (About, Investors, Blog) | **Intentionally out of scope**, already live, not what was promised |

---

## Stage A1 — What the business actually is

- **Sells (pre-launch):** an AI-powered employee-engagement platform that
  turns an assessment into an individual "archetype profile" per employee,
  then gives managers real-time coaching guidance for feedback, recognition
  and difficult conversations, rather than an annual engagement survey.
- **Founders, verified on their own `/about/` page:** Jori Chykerda,
  Co-Founder & CEO, 10+ years in HR, employee engagement, organisational
  culture and leadership development. Greg Hussey, Co-Founder & COO,
  entrepreneur and CEO of Impact HR since 2017, HR consultant 15+ years.
- **The verified gap:** fetched every real route on the live site (`/`,
  `/about/`, `/how-it-works/`, `/features/`, `/investors/`) and confirmed
  positively, not assumed, that **no screenshot, mockup, or video of the
  actual product exists anywhere**. The Features page even promises "Watch
  How It Works... this short video walks you through..." with **no video
  element, iframe, or embed anywhere in the page** — checked directly in the
  HTML, not inferred from a missing button. The entire site is text
  description of a product nobody outside the company has seen.

## Stage B1 — Evidence classification

**Verified fact** (own live site, fetched 2026-08-19)
- The real 5-step process, quoted exactly from `/how-it-works/`: **Survey
  Design → Employee Participation → Analysis & Reporting → Manager Review →
  Better Conversations.** Each step's own one-line description is carried
  into the build verbatim.
- Real stat, attributed exactly as they cite it: **"80% of employees
  globally are not engaged at work" — 2026 Gallup State of the Global
  Workforce Report.**
- Real positioning line: "Personal, Practical, and Powered by AI."
- Real target segments: HR & Culture leaders; COOs & Leadership Teams;
  Mid-Market Organizations (up to 1,000 employees); Hybrid & Remote Teams.
- Real contact: info@archetypehr.com, (780) 850-4511, 200 Carnegie Dr,
  St. Albert, Alberta.
- Real typefaces: **Montserrat** (headings) and **Inter** (body), both found
  in the site's own inline styles.
- Real accent blue `#046BD2`, real neutrals `#000000`/`#69727D`/`#F1F1F1`.
- Real logo (brain-mark plus wordmark, green accent inside the mark).
- Real founder headshots: `jori.png`, `greg.png`, both professional studio
  portraits, correctly attributed by filename and by the About page's own
  name-to-photo adjacency.

**Company-reported claim**
- "Employees complete the survey in 20 minutes."
- Currently raising a pre-seed/seed round (from `/investors/`): "raising to
  support product development, go-to-market execution, and team growth."

**Unknown, deliberately excluded**
- **No real archetype profile, dashboard, or coaching-card content exists
  anywhere public.** Every screen showing that content in this build is
  **illustrative demo data**, built strictly from Archetype HR's own stated
  categories (motivators, communication style, engagement drivers, coaching
  style) and never inventing a category they have not themselves named.
  Disclosed once, in the footer, per I14 (the same resolution used on
  Connectome): a discreet, production-normal footnote, nothing on the
  working screens themselves.
- A fictional employee name is used for the demo profile. Chosen to be
  unmistakably generic and clearly not a real Archetype HR customer or
  employee.
- No real customer, pilot, or case study exists (pre-launch/waitlist stage).
  None is fabricated or implied.

## Stage B3 — Red team

- *Wrong person or company?* No. Jori Chykerda, CEO, matches the LinkedIn
  thread and the site's own About page exactly.
- *Has the business changed since research?* Re-fetched fresh today; the
  "no product screens exist" finding was re-verified against the current
  live HTML, not carried over from the original 21 July research.
- *Is the gap commercially real?* Yes, and Jori's own reply proves it is live
  in his mind right now: he is actively comparing this to something his team
  already has.
- *Does another page already resolve it?* No; checked every real route, none
  shows the product.

---

## Stage C1 — Governing concept

> **You cannot sell "personal" and "practical" with a page that has never
> shown a single actual person's profile — so the walkthrough is built around
> one person, Alex Rivera, all the way from a completed assessment to the
> exact moment their manager sits down to talk to them.**

Concrete to this client: it takes Archetype HR's own words ("Personal,
Practical, Powered by AI") and makes the prototype prove the first two
literally, by never abstracting the demo into aggregate charts alone; a real
individual profile leads every stage.

**Layers it controls:**
1. Composition — a fixed step-rail (mirroring their own real 5-step diagram)
   structures the entire page, not just the hero.
2. Copy voice — every stage heading is lifted from their own step names.
3. Interaction — the core device is a single employee's record building up
   stage by stage, exactly answering "what does an archetype profile or
   manager dashboard actually look like."
4. Imagery — real founder photos, real logo, real accent blue; the archetype
   profile and dashboard screens are the one deliberately authored UI, since
   none exists to borrow.
5. The ending — closes on the exact moment named in the promise: a manager
   about to have a real conversation, not a generic "book a demo" CTA.

**Three brand adjectives, evidenced:** *individual* (their own "Individual
Employee Archetype Profiles" language), *actionable* (their own "Not generic
advice. Real, personalized guidance."), *credible* (two named HR
professionals with real, verifiable track records, not an anonymous team).

**Anti-adjectives:** not clinical/surveillance-feeling, not a generic BI
dashboard, not a corporate stock-photo SaaS page.

## Stage C2 — Typography

**Montserrat + Inter**, both confirmed in the client's own site. No new
typeface introduced.

## Stage C4 — Collision test

Most recent unrelated builds: Connectome (light, blue/periwinkle, Geist),
Toffe Traktaties (warm paper, confetti palette, Quicksand), Greentic (dark
slate, green, Space Grotesk). Archetype HR is a clean light workspace
register: navy-on-white, a single verified blue accent, Montserrat display,
a step-rail structure. No shared palette family, font pairing, or hero
composition with any of the three.

---

## Art direction pass (2026-08-19, second build)

Raka on the first build: **"Its not good enough. Take ALLLL MY FEEDBACKS
IVE GIVEN IN THE PAST. Check their industry, check artsy stuff, take the
design to a whoole next level really where theyre like ive never seen this
before."**

He was right, and the spec's own numbers say so. The first build was scored
93 and should not have passed at all. Re-checked against Stage I it tripped
**five hard failures**:

| Gate | First build | Required |
|---|---|---|
| I1 density floor (B2B software) | 3 figures, 1121 words, 16 h3 | 15 / 1200 / 18 |
| I7 real information architecture | 5 tab panels, 0 nav destinations | 6+ destinations, 2+ routes |
| I8 conversion apparatus | a `mailto:` link | a real form with error and success states |
| I11 the ending is a stack | one heading, two buttons | four distinct closing moves |
| C3 anti-AI blacklist | bordered cards as the default container, tiny uppercase eyebrow labels, pill chips, a generic value-prop grid, and the banned "Not a theory..." construction | none of the recipe |

The first build was a competent light SaaS page with a blue accent, which is
what every HR tech site looks like, shown to a founder whose team has
already built their own version. Scoring it 93 was the actual error.

### The governing concept, re-derived from their own words

Their home page says it outright: **"Archetype HR is designed for
organizations that know engagement happens one person at a time."** That is
the concept, and it is theirs, not an invention.

> **An engagement survey gives you one number for everybody. Archetype HR
> gives you a visibly different form for every single person, so the page
> argues the thesis as an image instead of asserting it in a headline.**

### The device: motivation signatures

Every employee is drawn as an organic bloom computed from their own six
motivator values. Six axes set the radius around the circle, a deterministic
per-person harmonic wobble makes the contour hand-plotted rather than
geometric, and concentric contours give it depth like a topographic plot.
Generated in Python into pure inline SVG, so it renders with no JavaScript
and no external libraries (`sig.py` in the build scratch, method recorded
here).

This is a concept, not decoration, and it drives five layers per I5:

1. **Composition** — the wall of fourteen signatures on the dark ground is
   the central spread of the whole site.
2. **Interaction** — the manager dashboard carries each person's own
   signature in their table row, so scanning the team is scanning fourteen
   individuals rather than fourteen identical rows.
3. **Nomenclature** — "The Archetype Library" is a real nav destination and
   a real route, named for the device.
4. **Colour** — the six inks are the motivator encoding, with a real key
   section explaining what each one means.
5. **The ending** — closes on the concept sentence in their own words.

**Art direction lineage:** data humanism, the Giorgia Lupi / *Dear Data* /
Stefanie Posavec register, where individual data is drawn rather than
aggregated into a chart. It was chosen because that movement's entire
argument (move from impersonal aggregate data to intimate individual data)
is Archetype HR's own positioning, so the reference is on-thesis rather
than borrowed for style.

**Register:** warm printed paper ground, ink and paper alternating across
five tonal shifts rather than one inverted section, hairline rules and grid
lines instead of bordered cards, numeric section indices instead of eyebrow
labels, Montserrat 800 at very tight tracking at display scale. No mono
micro-labels, no cream-and-rust recipe, no pill chips, no fake browser
chrome.

**I9 colour budget, stated deliberately:** the client's real blue `#046BD2`
and the real logo green are kept. The palette was then widened to six inks
on purpose, because a per-dimension encoding needs six distinguishable hues,
and because a single-accent SaaS palette is exactly the AI default I9 says
to widen away from. All six are held at matched chroma so the wall reads as
one system.

**C4 collision test:** Connectome (light, periwinkle, Geist), Toffe
Traktaties (warm paper, confetti, Quicksand), Greentic (dark slate, green,
Space Grotesk). Overlap with Greentic is limited to the presence of a dark
ground, which here alternates with paper rather than being the whole page,
and carries a six-hue data encoding rather than a single accent. One
overlap, under the C4 threshold of two.

### What the second build ships

Five real routes, each a separate view: Home, How It Works, The Archetype
Library, For Managers, Join the Waitlist. Six nav destinations. A real
waitlist form with required and optional fields, per-field validation error
states, a success state, a privacy line, and a stated response time. A real
grouped footer. A five-part ending stack on every route.

---

## Build, QA and portrait verification

Single self contained HTML file, 5 routes, no external requests. Progressive
enhancement: `html.js .route{display:none}` only applies once script adds the
`js` class, so with JavaScript off all five routes render stacked as one long
scrollable document (21,868px) rather than breaking. The waitlist form keeps
native HTML5 `required` validation in that state.

**Automated QA (Playwright, desktop / tablet / mobile / fallback-font):**
zero broken images, zero upscaling, zero aspect-ratio distortion, zero
horizontal overflow at any width including with Montserrat and Inter both
forced to local fallback, zero scaffolding language across all five routes,
route navigation verified switching all five.

**Form behaviour, tested not assumed:** an empty submit produces 5 field
error states; a valid submit reaches the success state. One real bug found
and fixed here: the consent row uses `.check` rather than `.fld`, so the
`.fld.bad .err` rule never revealed its error message. Added `.check.bad`.

**Layout bug found and fixed:** `.hero-in` set the `padding` shorthand, which
silently overrode `.wrap`'s `padding:0 var(--gut)` and zeroed the page
gutter, running the hero headline to the viewport edge. Measured via
`getBoundingClientRect` rather than eyeballed. Changed to `padding-top` /
`padding-bottom` so the gutter survives.

**Density against the I1 B2B software floor:**

| Metric | Floor | First build | This build |
|---|---:|---:|---:|
| Figures | 15 | 3 | **52** |
| Words | 1200 | 1121 | **2937** |
| h3 | 18 | 16 | **26** |
| Working forms | 1 | 0 | **1** |
| Routes as separate views | 2 | 0 | **5** |
| Nav destinations | 6 | 0 | **6** |

**Portrait verification (`tools/verify_portraits.py`, mandatory per I16):**
`ALL PORTRAITS CORRECTLY PAIRED` — both founders verified by card containment
against Archetype HR's own `/about/` page and by exact byte hash against the
client's own published photo. Two earlier failures were fixed along the way:
the tool requires a bare `<figure class="person">` and a bare `<h3>`, so the
inline styles moved to CSS rules; and the portraits had to be re-encoded at
the tool's own verification parameters (520px, quality 86) for the byte hash
to match.

## Delivery

**Score: 95/100** against G1, zero hard failures.

| Dimension | Weight | Score |
|---|---:|---:|
| Brand specificity | 15 | 15 |
| Narrative and emotional pacing | 15 | 15 |
| Imagery and art direction | 15 | 15 |
| Workflow and business completeness | 15 | 14 |
| Real proof and human trust | 15 | 13 |
| Buyer fit and objection coverage | 10 | 9 |
| Conversion completeness | 5 | 5 |
| Interaction and accessibility | 5 | 5 |
| Technical reliability and performance | 5 | 4 |

The two real deductions: **human trust** is capped because a pre-launch
company has no customer, pilot, or case study to show, and none was invented;
the only real proof available is the two founders, and that is what is shown.
**Technical** loses a point for a 508KB single file, which is within the
payload budget but carries fourteen inline SVG signature sets.

Every screen showing profile content is illustrative employee data, disclosed
once in the footer in the production-normal register ("Profile visuals and
employee examples on this site show sample data"), with nothing on the
working screens themselves.

Final artifact: `state/prototypes/archetype-hr/index.html`,
**507704 bytes, sha256
bffdd7e4378aca1bf3ecf5aecff7fa48524bd5c53106d9fd4de133f0d931a0dc**.

## Open asset requests (for Raka, never for the client)

- A real product screenshot or the promised "Watch How It Works" video, which
  would replace the authored profile and dashboard screens with captured ones.
- One nameable pilot organization or a founder quote about an early user,
  which is the single thing that would lift the human-trust score.
