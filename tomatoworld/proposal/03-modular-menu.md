# À la carte module menu — buy one at a time

**Why this exists:** Phase 1 at €12k–22k is a board decision for a foundation.
A €900 module is a signature. This breaks the same work into the smallest units
that still deliver something real on their own.

**Rate basis (internal):** ~€300–400 per developer-day blended. Small modules sit at
the higher end — a €600 job carries the same scoping, invoicing and deployment
overhead as a €6,000 one.

**Client-facing rule:** every module below is independently useful. None is a stub
that only makes sense if you buy the next one. Where a real dependency exists it is
stated.

🟢 ours · 🟠 needs Panorama consent or joint delivery · 🔴 Panorama's, never pitch

---

## The floor, and the honest warning

Two things to say to the client rather than hide:

1. **Below about €600 it is not worth invoicing separately.** Scoping, testing and
   deployment cost the same on a tiny job. Batch small items together.
2. **Extreme modularity has a real cost.** Buying six €1,000 pieces in sequence is
   more expensive than one €5,000 piece, because each one carries its own setup and
   some earlier work gets reworked. The right unit is the **smallest coherent one**,
   not the smallest possible one.

**Items that genuinely cannot be split** — quoting them separately would be
dishonest:
- Real availability booking **must** ship with confirmation emails (M10 + M11)
- Self-service cancel **must** ship with the waitlist logic or cancellations still
  get handled by hand (M12 + M13)

---

## TIER 0 — Free
*Offered regardless of outcome. Routed through Panorama.*

| # | Module | Effort |
|---|---|---|
| **M0.1** | Fix the expired tour closure notice | 1h |
| **M0.2** | Cookie consent gap — written finding and recommendation | 2h |
| **M0.3** | Sitemap `http://` → `https://` finding | 1h |

---

## TIER 1 — Under €1,500
*Single invoice. No system, no migration, no board meeting.*

### M1 — Closure & season rules 🟢
**€900 – €1,200 · 2–3 days**
Closure periods, crop rotation and holidays become dated rules that switch the site
message automatically. Never again a page saying "closed" two weeks after reopening.
*Standalone. No dependency. Fixes a defect that is live right now.*

### M2 — Structured tour request form 🟢 ⭐
**€900 – €1,200 · 2–3 days**
Replace the current free-text request with a structured intake: tour type, preferred
dates, group size, language, school type and level, dietary needs, contact.
Still arrives by email — **no system to learn** — but arrives complete.
*Kills most of the back-and-forth without building anything. Best value-to-cost ratio
on this entire list, and the natural first purchase.*

### M3 — Automatic acknowledgement & info pack 🟢
**€600 – €900 · 1–2 days**
Instant reply confirming receipt, with practical info, hygiene protocol, parking,
duration and FAQ attached. Deflects the repetitive pre-visit questions.
*Pairs naturally with M2.*

### M4 — Digital hygiene protocol sign-off 🟢
**€700 – €1,000 · 2 days**
Group leader acknowledges the biosecurity protocol online; the record is kept.
*Biosecurity is the moat — worth having on record, not in an inbox.*

### M5 — Shared booking calendar & process setup 🟢
**€800 – €1,200 · 2–3 days**
No software built. We configure a shared calendar/board with the right structure and
train the office on it. Gets the booking picture out of one person's inbox.
*Deliberately a configuration job, not a build. Cheapest possible relief.*

### M6 — Guide roster 🟢
**€700 – €1,000 · 2 days**
Who guides, which languages they speak, when they are available. Simple and shared.
*Language coverage is the real constraint on accepting international groups.*

### M7 — Partner value one-pager 🟠
**€900 – €1,400 · 2–3 days**
One page that warms a prospective partner before Aart's conversation. Not a signup
form. *We write structure and content logic; Panorama own the visual.*

### M8 — Cookie consent implementation 🟢
**€500 – €800 · 1–2 days**
If they want it done rather than just flagged. *Offer to Panorama first.*

### M9 — Measurement setup 🟢 ⭐
**€700 – €1,000 · 2 days**
Proper analytics on the tour and partner journeys: where people arrive, where they
drop out, how many reach the request form and how many finish it.
*Buy this first if buying anything. It costs almost nothing and it produces the
numbers that justify — or kill — every other module on this list. It also answers
the questions we cannot currently answer for pricing.*

---

## TIER 2 — €1,500 – €4,000
*Real systems, still one invoice each.*

### M10 — Live availability booking, one tour type 🟢
**€2,500 – €4,000 · 8–12 days**
A real bookable calendar for a single tour product: availability, capacity, group
size, instant confirmation. One product only, proving the model.
*Must ship with M11. Extends to other tour types later at roughly €600–900 each.*

### M11 — Confirmations & reminders 🟢
**€1,500 – €2,500 · 5–8 days**
Automatic confirmation with calendar invite, reminder before the visit, staff
notification on every change. *Ships with M10.*

### M12 — Self-service reschedule & cancel 🟢
**€1,500 – €2,500 · 5–7 days**
Visitor changes their own booking by secure link, no login, no email to the office.
*Requires M10. Ship with M13.*

### M13 — Waitlist & automatic backfill 🟢
**€1,200 – €2,000 · 3–5 days**
Full slots take a waitlist; a cancellation is offered onward automatically.
*Requires M10. This is the module that turns cancellations from loss into revenue.*

### M14 — Office dashboard 🟢
**€1,500 – €2,500 · 5–8 days**
The week at a glance: booked, free, who is guiding. Amend and cancel on behalf of a
customer. *Requires M10.*

### M15 — Payments via Mollie / iDEAL 🟢
**€2,000 – €3,000 · 5–8 days**
Deposits or full payment, invoice-on-account for schools and companies, refunds
aligned to the cancellation policy. *Requires M10.*

### M16 — Partner report, one-off from manual data 🟢 ⭐
**€2,000 – €3,000 · 4–6 days**
We build one real partner report from whatever records exist today — no booking
system required. *Proves the Phase 2 idea for a fraction of the cost, and it is the
single best thing to put in front of Aart, because it is about income.*

### M17 — Partner portal, minimal 🟢
**€3,000 – €4,000 · 10–14 days**
Partners log in and maintain their own logo, materials and profile instead of
emailing files.

### M18 — Pre-visit assistant, FAQ scope only 🟢
**€2,500 – €4,000 · 8–12 days**
Answers practical pre-arrival questions in NL/EN, escalates anything it cannot
answer. *Tightly scoped — it must never invent an answer about pricing or the
hygiene protocol.*

### M19 — Post-visit takeaway 🟢
**€1,500 – €2,500 · 4–6 days**
A page per group: what they saw, the partners behind it, where to go deeper.

### M20 — Guide availability & language matching 🟢
**€2,000 – €3,000 · 5–9 days**
Availability only shows dates where a guide covering the required language is free.
*Requires M10 and M6. This is the requirement off-the-shelf booking products fail.*

---

## REDESIGN — broken into fundable pieces 🟠

Raka asked for this explicitly. It needs care: **web design is Panorama's core
business.** The model that works is the one Raka himself proposed in the meeting —
**we sell the thinking, they build it.** That keeps us upstream of Panorama rather
than against them, and it is genuinely cheaper for the client.

### R1 — Audience & navigation research 🟢
**€1,500 – €2,500 · 4–6 days**
Interviews and analytics-led answer to Ank's exact complaint: *"Am I a visitor? Am I
a partner? I got lost."* Deliverable is a recommended site structure.
*Pure research. Nothing Panorama does. Completely non-competing.*

### R2 — Navigation & IA specification 🟢
**€1,500 – €2,500 · 4–6 days**
The new sitemap, page hierarchy and labelling, written as a spec **Panorama can
build from.** *We do not touch the visual design.*

### R3 — Homepage audience split — wireframe only 🟠
**€1,200 – €2,000 · 3–5 days**
Wireframes for a homepage that routes visitor and partner apart at the entry point.
*Wireframes, not visual design. Panorama design and build it.*

### R4 — Tour & booking page wireframes 🟠
**€1,500 – €2,500 · 4–6 days**
The booking journey, specified. *We build the booking surface itself under M10; the
surrounding pages are Panorama's.*

### R5 — Partner section wireframes 🟠
**€1,200 – €2,000 · 3–5 days**
Structure for Partners / Friends / Ambassadors, which today read almost identically.

### R6 — Ideation & prototyping workshop 🟢 ⭐
**€1,500 – €2,500 · 3–4 days**
Half-day session with Ank, the new marketing colleague **and Panorama**, producing a
clickable prototype and an agreed direction.
*The single best political move available. Panorama are in the room, the new hire
gets the visible win she wants, and nobody is being routed around.*

### R7 — Full visual redesign and build 🔴
**Not ours. Panorama's.** If they want it, we recommend Panorama and say so plainly.
*Saying this out loud is worth more to us than the work would be.*

---

## TIER 3 — €4,000+
*Listed for completeness; sell later.*

| # | Module | Range |
|---|---|---|
| **M21** | Virtual tour platform — paid, multilingual, sells during closure | €5,000 – €9,000 |
| **M22** | Full partner reporting engine, automated annually | €4,000 – €7,000 |
| **M23** | Space rental booking, second product line | €4,000 – €6,000 |
| **M24** | On-site signage with live field-lab data | €4,000 – €7,000 |
| **M25** | Inbound request triage & routing | €2,500 – €4,000 |
| **M26** | School programme layer | €2,500 – €5,000 |

---

## Starter bundles — small, discounted, coherent

| Bundle | Contains | List | Offer |
|---|---|---|---|
| **"Stop the bleeding"** | M1 + M2 + M3 | ~€2,900 | **€2,400** |
| **"Know the numbers"** | M9 + M5 | ~€2,000 | **€1,600** |
| **"Prove the partner case"** | M16 + M7 | ~€4,000 | **€3,300** |
| **"First real bookings"** | M10 + M11 + M13 | ~€8,000 | **€6,500** |
| **"Think it through"** | R1 + R2 + R6 | ~€7,000 | **€5,500** |

**The cheapest genuinely useful starting point is "Stop the bleeding" at €2,400** —
or M9 alone at €700 if they want to spend almost nothing and still move.


---

## BRANDING TRACK 🟠
*Included by decision. Panorama sell brand work — where an item touches identity they
already created, offer it jointly or stand down. Items marked 🟢 are genuinely clear.*

### B1 — Brand & messaging audit 🟢
**€900 – €1,400 · 3 days**
How Tomato World currently presents itself across the site, socials, printed material
and the tour itself. Where the message contradicts itself, where it is strong.
*Pure assessment. Nothing Panorama would object to, and it sizes everything below.*

### B2 — Positioning & messaging framework 🟠
**€1,500 – €2,500 · 4–6 days**
Who they are, for whom, the core message, the proof points, tone of voice. NL/EN.
*Panorama's Communicatie Studio sells positioning. Offer jointly or check first.*

### B3 — Story toolkit 🟢 ⭐
**€1,200 – €2,000 · 3–5 days**
The story Ank keeps talking about, written properly: a one-line version, a 30-second
version, a full version, and variants per audience (school, trade delegation,
investor, press). Used by every guide, in every deck, on every page.
> `[ANK]` *"if you cannot tell your story, what good is your story?"*
*This is her whole reason for being involved. Strong emotional sell.*

### B4 — Tour presentation redesign 🟢 ⭐⭐
**€1,200 – €2,000 · 3–5 days**
**The single best branding entry point available.**
> `[ANK]` *"I told them, listen, we need to do the PowerPoint different. It needs to
> be a little bit more upgraded professionally. And they're open to it."*
She asked for this **before** the website, two years ago, and nobody has done it. It
is branding work, it is not the website, and Panorama almost certainly never touched
it. Audience variants, live data slots, NL/EN.
*If we sell one branding module, sell this one.*

### B5 — Brand guidelines / mini brand book 🟠
**€1,500 – €2,500 · 4–6 days**
Logo use, colour, type, imagery, tone, templates. *Check whether Panorama already
produced one — they deliver brand guides as standard. If so, extend theirs, don't
replace it.*

### B6 — Visual identity refresh 🔴🟠
**€2,500 – €4,500 · 8–12 days**
*Only if Panorama did not create the current identity, or are not retained. Ask before
proposing. Otherwise recommend them.*

### B7 — Partner brand kit 🟢
**€900 – €1,500 · 2–3 days**
How partners represent Tomato World in their own materials, and how TW represents
partners. Logos, lockups, boilerplate, permissions.
*Genuinely unserved, and it supports the partner revenue line.*

---

## SOCIAL MEDIA TRACK 🟠
*Panorama's Online Marketing Studio covers social. Verify retained scope first — see
`analysis/03`. Where the new in-house hire owns it, sell enablement, not delivery.*

### S1 — Social audit & benchmark 🟢
**€700 – €1,200 · 2–3 days**
Current channels, what works, what is dormant, how comparable centres perform.
*Assessment. Safe, cheap, sizes the rest.*

### S2 — Social strategy & channel plan 🟠
**€1,500 – €2,500 · 4–6 days**
Which channels, for which audience, to what end. *Directly Panorama's offering.*

### S3 — Content pillars & calendar 🟢
**€900 – €1,500 · 3–4 days**
Recurring themes, posting rhythm, a calendar the office can actually maintain.

### S4 — Content engine on visit data 🟢 ⭐
**€1,500 – €2,500 · 4–6 days**
Content generated from what we build: post-visit stories, partner spotlights, visitor
origin maps, season milestones, field-lab results.
**Ours by origin, not by territory — Panorama cannot produce this, because it needs
the booking data underneath.** Defensible even if they hold the social retainer.

### S5 — Template kit 🟢
**€900 – €1,500 · 3–4 days**
Canva or Figma templates so the new marketing hire produces on-brand posts without a
designer each time.

### S6 — Enablement & training 🟢 ⭐
**€900 – €1,500 · 2–3 days**
Train the new marketing colleague to run all of the above.
> `[ANK]` *"she loves to take this also as something that she could really put her
> hands on. And of course, score with it."*
*Converts the one person who might see us as a rival into our strongest advocate.*

### S7 — Managed social 🟠
**€750 – €1,500 / month**
We run it. *The most direct collision with Panorama's retainer model. Offer last, and
only once scope is confirmed clear.*

### S8 — LinkedIn programme 🟢
**€1,000 – €1,800 · 3–4 days**
Aart and the partner network are on LinkedIn; the industry is closed and relationship
led. Post structure, cadence, content for Aart personally.
> `[ANK]` *"It's a very close industry... everybody knows each other."*

### S9 — Visitor story capture 🟢
**€1,200 – €2,000 · 3–5 days**
Systematic capture of testimonials, photos and quotes at the end of a visit, feeding
S4. *Hooks into M19 post-visit takeaway.*

---

## Brand & social bundles

| Bundle | Contains | List | Offer |
|---|---|---|---|
| **"Tell the story properly"** ⭐ | B1 + B3 + B4 | ~€4,400 | **€3,600** |
| **"Social starter"** | S1 + S3 + S5 | ~€3,300 | **€2,700** |
| **"Arm your new hire"** ⭐ | B4 + S5 + S6 | ~€4,000 | **€3,300** |
| **"Brand foundation"** | B1 + B2 + B5 | ~€5,400 | **€4,400** |

**Best opening move on this track: B4 alone at €1,200–2,000.** Ank asked for it
personally, it is the oldest unmet request in the organisation, and it does not touch
Panorama's website or identity work at all.

---

## Support retainer 🟢
**€250 – €500 / month**

Hosting, monitoring, small changes, support. *A foundation approves a small recurring
operating cost far more easily than a capital project — and it keeps us present
while budgets are decided. Offer this alongside any module over €2,000.*

---

## Recommended entry paths

| Their situation | Start with | Cost |
|---|---|---|
| "We have almost no budget" | M9 alone | €700 |
| "We have a little, fix the worst" | Stop the bleeding | €2,400 |
| "Aart wants to see income, not cost" | M16 + M7 | €3,300 |
| "We want to see it work properly" | First real bookings | €6,500 |
| "We want to sort the website out" | Think it through (with Panorama) | €5,500 |

**All five are under €7,000, and every one produces something they keep.**
