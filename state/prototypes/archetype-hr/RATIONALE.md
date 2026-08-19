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

## Build, QA and portrait verification

Built as a single self contained HTML file: a sticky step-rail with 5 tabs
matching the client's own process-stage names exactly, each stage a full
view driven by one fictional employee record (Alex Rivera) that builds up
stage by stage: survey mock at Q1/12, survey mock at Q9/12 plus "what Alex
sees," the archetype profile itself (motivator bars, coaching style,
engagement drivers), a manager dashboard (4-row roster with trend/status
plus a "why Alex is flagged" reasoning card naming the exact 88 percent
recognition gap), and a closing conversation-prep card (4 concrete,
profile-specific prep points) followed by the founders section and a "who
this is for" table lifted from the client's own segments.

Progressive enhancement: `html.js .view{display:none}` only applies once a
`js` class is added by script, so with JavaScript disabled all 5 stages
render stacked on one scrollable page rather than breaking. Verified via
Playwright with `javaScriptEnabled:false`: all 5 `.view` sections visible,
7321px tall, no broken layout.

**Automated QA (Playwright, desktop/tablet/mobile + fallback-font run):**
no broken images, no upscaling, no aspect-ratio distortion, zero horizontal
overflow at any width including with Montserrat/Inter both forced to local
font fallback, zero scaffolding language found across all 5 stages (1121
words total), tab navigation confirmed switching all 5 stages correctly.

**Portrait verification (`tools/verify_portraits.py`, mandatory per I16):**
first run failed both founders — the `<figure class="person">` selector
requires an exact class attribute with no extra attributes, and the
`<h3>` name tag must be bare with no inline style, so the initial markup
(`style="margin:0"` on the figure, `style="font-size:16px"` on the h3)
didn't match. Fixed by moving both to CSS rules (`.person{margin:0}`,
`.person h3{font-size:16px}`) instead of inline styles. Second failure:
byte hashes didn't match because the portraits were re-encoded with
different width/quality than the tool's verification defaults. Fixed by
re-encoding both from the original downloaded `jori.png`/`greg.png` using
the tool's own re-encode parameters (520px width, quality 86) before
embedding. Final run: **ALL PORTRAITS CORRECTLY PAIRED** — both by card
containment against Archetype HR's own `/about/` page and by exact byte
hash match against the client's own published photo.

## Delivery

**Score: 93/100.** Hard failure gates: none triggered. Every screen not
covered by a real client asset (survey mock, archetype profile, dashboard,
conversation prep) is disclosed once, in the footer, as illustrative
employee data, consistent with the Connectome precedent (I14). No customer
logos, pricing, or case studies invented for a pre-launch company.

Final artifact: `state/prototypes/archetype-hr/index.html`,
**274011 bytes, sha256
1d3058b52981ab308cba5ed19f3cf68a1a16eed25b27d2472d11f3d12c4384ba**.
