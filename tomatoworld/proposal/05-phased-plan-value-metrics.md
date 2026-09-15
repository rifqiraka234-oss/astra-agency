# Phased plan — work, value, metrics, time, cost

**Status:** client-facing content, internal effort figures stripped before sending.
**Pricing basis:** ranges, not quotations. Firm prices follow Discovery.

## The pricing anchor we can actually use

From Tomatoworld's own public pricing, already cited in the deck:

> **€200 per tour, plus €12.50 per person.**
> A 12-person group is therefore **≈ €350**. A 25-person group **≈ €512**.

This matters because it lets us express every phase as arithmetic instead of a
promise:

> **"This phase costs €X. It pays for itself at N extra tours."**

That is a claim Aart can check himself. It does not depend on us being right about
anything. **Use this framing everywhere and avoid percentage claims we cannot
evidence.**

## What we do not know, and must not pretend to

| Unknown | Blocks | Who can answer |
|---|---|---|
| Tours per month, by type | Every utilisation and revenue metric | Joyce / reservations |
| Hours per week on coordination | Every time-saved metric | Joyce |
| Cancellation and no-show rate | Waitlist value | Joyce |
| Requests received vs confirmed | The conversion metric, the single most important one | Joyce |
| Partner count and annual fee | Partner-phase value | Aart |
| Space rental volume | Whether that phase is worth building | Aart |

**Every "baseline" below reads TBM — to be measured. Discovery measures them.**
Leaving them visibly blank is more persuasive than filling them with guesses, and it
makes the case for Discovery without us having to argue for it.

---

# The metrics we would move

Eight numbers. Each phase names which ones it moves. Nothing is claimed twice.

| # | Metric | Why it matters | Baseline |
|---|---|---|---|
| **M1** | Staff hours per week on booking coordination | The cost that never appears on an invoice | TBM |
| **M2** | Requests that become confirmed bookings (%) | Every lost request is a paid tour that did not happen | TBM |
| **M3** | Time from request to confirmation | Delegations abroad book whoever answers first | TBM |
| **M4** | Confirmed tours per month | The revenue line | TBM |
| **M5** | Slot fill rate (%) | Fixed capacity, volunteer guides. Empty slots never come back | TBM |
| **M6** | Cancelled slots refilled (%) | Today, almost certainly 0 | ~0 |
| **M7** | Partner renewal rate (%) | The biggest income line, currently defended by goodwill | TBM |
| **M8** | Revenue during crop-rotation closure | Currently zero by definition | €0 |

---

# PHASE 0 — Three fixes, free

**Elapsed:** within a week of agreement · **Cost: €0**

| Work | Value | Metric |
|---|---|---|
| Remove the expired tour closure notice | The page currently tells every visitor you are closed. It has been wrong since 1 September | **M2, M4** — direct |
| Cookie consent gap | GTM loads with no consent gate. A real GDPR exposure for a Dutch organisation | Risk, not revenue |
| Sitemap uses `http://` not `https://` | Weakens search indexing | **M2** indirectly |

**Why free:** it costs us under a day, it proves we looked, and it is routed through
Panorama so nothing happens behind their back.

> **Arithmetic:** the banner has been wrong for two weeks in their highest season.
> **One recovered group pays for the entire Discovery sprint's first day.**

---

# PHASE 1 — Discovery sprint

**Elapsed: 2 weeks · Effort: 8–12 days · Cost: €4,000 – €6,000 fixed**

| # | Work | Deliverable |
|---|---|---|
| 1.1 | Sessions with Ank, Joyce, a guide, the new marketing colleague | Process map, as-is |
| 1.2 | **Technical session with Panorama** | Agreed integration boundary, in writing |
| 1.3 | **Measure the baseline** — M1 through M8 | The numbers that are TBM above, filled in |
| 1.4 | Buy-vs-build evaluation for the booking core | A decision, with reasoning |
| 1.5 | **Clickable prototype on their real flow** | The thing Ank tried to click |
| 1.6 | Costed plan, firm prices per phase | This document, with real numbers |

**Value:** every phase below becomes a decision with evidence instead of a leap.
**Metric moved:** none directly. **It makes every other metric measurable**, which is
the point — you cannot improve M2 if nobody knows what M2 currently is.

**If you stop here you keep the prototype, the baseline and the plan.**

> **Arithmetic:** at ~€350 a tour, the sprint costs **12 to 18 tours.** Against a
> booking process handling thousands of visitors a year, that is a rounding error to
> find out whether the rest is worth doing.

---

# PHASE 2 — Fix the front door

**Elapsed: 2–3 weeks · Effort: 6–8 days · Cost: €2,400 – €3,300**

The cheapest phase with a visible result. **No system for staff to learn** — requests
still arrive by email, but complete.

| # | Work | What it does |
|---|---|---|
| 2.1 | Structured request form: tour type, two preferred dates, group size, **language**, audience type, school level and pupil count, dietary, accessibility, contact | Ends the back-and-forth that currently establishes basic facts |
| 2.2 | Automatic acknowledgement in the visitor's language, with practical info, hygiene protocol, parking, duration | Deflects the repetitive questions before they are asked |
| 2.3 | Season and closure periods as **dated rules** | The Phase 0 banner problem becomes structurally impossible |
| 2.4 | Every request logged to a sheet | The dataset that makes Phase 6 possible later |

**Value:** the office stops using email to collect information a form should collect.
**Metrics:** **M1** (fewer exchanges per booking) · **M3** (faster first response) ·
**M2** (fewer requests abandoned mid-conversation).

> **Arithmetic:** costs **7 to 10 tours.** If it recovers one abandoned request a
> month, it pays for itself in under a year on that alone, before counting a single
> hour of staff time.

---

# PHASE 3 — A real booking system

**Elapsed: 5–8 weeks · Effort: 20–30 days · Cost: €6,500 – €9,500**
*Ships as one piece. Availability without confirmations is not a product.*

| # | Work | What it does |
|---|---|---|
| 3.1 | Live availability by tour type, with capacity and group size | Visitors see real dates instead of asking |
| 3.2 | **Hold-then-confirm** booking | Two people cannot take the last slot |
| 3.3 | Automatic confirmation with calendar invite, plus reminders | No manual confirmation email, ever again |
| 3.4 | **Guide availability and language matching** | A German group is only offered dates you can actually staff |
| 3.5 | One screen showing the week: booked, free, who is guiding | Replaces reconstructing the week from an inbox |

**Value:** the coordination work largely disappears, and international groups can book
without a five-day email exchange across time zones.
**Metrics:** **M1** (the big one) · **M2** · **M3** (days → minutes) · **M4** · **M5**.

> **Arithmetic:** costs **19 to 28 tours.** Spread over a year that is roughly **two
> extra tours a month** — or the equivalent in hours returned to the team.

---

# PHASE 4 — Stop losing the slots you already sold

**Elapsed: 2–3 weeks · Effort: 8–12 days · Cost: €2,700 – €4,500**
*3.x must exist first.*

| # | Work | What it does |
|---|---|---|
| 4.1 | Visitors reschedule or cancel themselves by secure link | The cancellation chain Ank described stops existing |
| 4.2 | **Waitlist with automatic backfill** — a freed slot is offered onward with a claim window | A cancellation becomes a different booking instead of a loss |
| 4.3 | Digital hygiene protocol sign-off, with reminders | Biosecurity on record rather than in an inbox |

**Value:** today a cancellation costs you the slot *and* the admin time. This makes it
cost neither.
**Metrics:** **M6** (from ~0% to whatever the waitlist supports) · **M5** · **M1**.

> **Arithmetic:** costs **8 to 13 tours.** **If it refills one cancelled group a
> month, it repays itself within the first year and keeps paying every year after.**
> This is the highest-confidence payback in the plan, because the arithmetic does not
> depend on attracting anyone new.

---

# PHASE 5 — Money and paperwork

**Elapsed: 2–3 weeks · Effort: 8–12 days · Cost: €2,800 – €4,200**

| # | Work | What it does |
|---|---|---|
| 5.1 | **iDEAL and card payment** at booking, deposit or full | Ends waiting on bank transfers |
| 5.2 | Invoice-on-account for schools and corporates | The cases where payment up front will not work |
| 5.3 | Refunds aligned to the cancellation policy | Automatic, consistent |
| 5.4 | Add-ons in the flow — expert session, extra topic | **Raises average booking value** |
| 5.5 | Export to their accounting package | The month-end job shrinks |

**Value:** money arrives when the booking is made rather than chased afterwards, and
add-ons get sold by the system instead of remembered by a person.
**Metrics:** **M1** · **average booking value** · cash collection time.

> **Arithmetic:** costs **8 to 12 tours.** At the deck's own €75 expert session, **an
> add-on attached to one booking in five across a year would cover it** — and that is
> the conservative reading.

---

# PHASE 6 — Prove partner value

**Elapsed: 4–6 weeks · Effort: 14–22 days · Cost: €4,500 – €7,000**
*Or a single manual report first, at €2,000 – €3,000, to test the idea.*

**This is the phase aimed at Aart, and the only one that defends income rather than
reducing cost.**

| # | Work | What it does |
|---|---|---|
| 6.1 | Capture visitor counts, origin countries, segments per partner | The evidence, gathered automatically |
| 6.2 | **Annual partner report**, generated and delivered before renewal | *"4,200 visitors from 38 countries passed your installation. You hosted 11 of your own customer groups."* |
| 6.3 | Partner portal — partners maintain their own logo and materials | Ends the file-by-email routine |
| 6.4 | Partner-hosted group flow, with allocation tracking | The thing partners actually pay for, made visible |
| 6.5 | Partners / Friends / Ambassadors separated properly | Three tiers that currently read identically |

**Value:** renewal conversations start from evidence. Today they rest on goodwill.
**Metrics:** **M7**, primarily. Also partner-hosted groups per year.

> **Arithmetic, and this is the important one:** with 30+ partners, **retaining a
> single partner who would otherwise have drifted pays for this phase outright** —
> and at most partner fee levels, several times over. Ask Aart what one partner is
> worth per year and the case makes itself.

---

# PHASE 7 — Sell when the greenhouse is empty

**Elapsed: 5–8 weeks · Effort: 18–28 days · Cost: €5,500 – €9,000 · fully modular**

| # | Work | What it does |
|---|---|---|
| 7.1 | **Paid virtual tour** — multilingual, bookable, no capacity ceiling | **Sells during crop rotation, when revenue is currently zero** |
| 7.2 | Pre-visit assistant answering practical questions in five languages | Removes the repetitive load; strictly refuses what it cannot source |
| 7.3 | Live greenhouse and sensor data, on site and online | The most convincing thing they own, currently invisible |
| 7.4 | Post-visit takeaway per group | Retention, and partner exposure after the visit |

**Value:** a revenue line that is not limited by building capacity, guide availability
or the growing season.
**Metrics:** **M8** (from €0) · **M4** · repeat visits.

> **Arithmetic:** the closure period is weeks of **zero** visitor income every year.
> Any paid virtual product sold in that window is revenue that currently does not
> exist at all.

---

# TRACK B — Brand, story and social

**Runs alongside the software phases, not after them.** Independent, modular, and
none of it depends on the booking system existing.

**One standing condition:** Panorama Studios offer branding and online marketing.
**Where they already handle any of this for Tomatoworld, we stand down on it** — we
would rather they kept it than have two suppliers doing similar work. We are offering
it because it may be unclaimed, not to take it from anyone. **Ank can settle this in
one sentence:** *who looks after your branding and social day to day — Panorama,
someone in-house, or nobody?*

## The story side

| # | Work | Value | Metric | Time | Cost |
|---|---|---|---|---|---|
| **B1** | **Tour presentation, rebuilt** — audience versions for schools, delegations and partners, live-data slots, NL/EN, editable master | The tour is the product. It runs off a deck Ank asked about before the website ever came up, and nobody has picked it up | Visitor feedback, guide confidence | 3–5 days | **€1,200 – €2,000** |
| **B2** | **Story toolkit** — one line, thirty seconds, two minutes, full, with variants per audience and a printable guide crib sheet | *"If you cannot tell your story, what good is your story?"* Every guide and every page tells it the same way | Message consistency across guides | 3–5 days | **€1,200 – €2,000** |
| **B3** | Brand and messaging audit across site, socials, print, tour and partner materials | Finds where the message contradicts itself before anyone spends on fixing it | Baseline for everything below | 3 days | **€900 – €1,400** |
| **B4** | Partner brand kit — logos, lockups, usage rules, boilerplate NL/EN, announcement template | A partner can announce the partnership without emailing anyone for assets | Partner-driven reach | 2–3 days | **€900 – €1,500** |
| **B5** | Brand guidelines | Consistency across everything. **Check first whether Panorama already produced one — if so we extend theirs rather than compete with it** | Consistency | 4–6 days | **€1,500 – €2,500** |

## The social side

| # | Work | Value | Metric | Time | Cost |
|---|---|---|---|---|---|
| **S1** | **Social audit and benchmark** — current channels, what works, what is dormant, versus comparable centres | Nobody knows the current numbers. This is the social equivalent of Phase 1 | **Establishes the baseline** | 2–3 days | **€700 – €1,200** |
| **S2** | Content pillars and a calendar mapped to their real year — seasons, crop rotation, hackathons, school terms | Someone non-specialist can fill next month unaided | Posting consistency | 3–4 days | **€900 – €1,500** |
| **S3** | **Templates** — 10–15 Canva or Figma templates, on brand, per channel, editable by a non-designer | The new marketing colleague produces on-brand posts without a designer every time | Posts produced per month | 3–4 days | **€900 – €1,500** |
| **S4** | **Training and playbook** for the new marketing colleague, plus a follow-up session after a month | She runs it herself. *"She loves to take this as something she could really put her hands on, and score with it"* | She runs a full month unaided | 2–3 days | **€900 – €1,500** |
| **S5** | **Content engine on real visit data** ⭐ — posts generated from what actually happens: visitor origin milestones, partner spotlights, season markers, field-lab results. Drafted automatically, always human-approved | **Panorama cannot build this.** It needs the booking data underneath. Ours by origin rather than by territory | Posts published per month, reach | 4–6 days | **€1,500 – €2,500** |
| **S6** | Visitor story capture at the end of a visit — quote, photo, **explicit consent on record** | Turns every visit into material. **GDPR: school groups mean children's images, so consent is explicit, never implied** | Usable stories per month | 3–5 days | **€1,200 – €2,000** |
| **S7** | LinkedIn programme for Aart and key staff — profile, approach, ten drafted posts | *"It's a very close industry, everybody knows each other."* That industry is on LinkedIn | Partner-side engagement | 3–4 days | **€1,000 – €1,800** |
| **S8** | **Managed social** — we run it monthly | Only where it is genuinely unclaimed. **Most direct overlap with Panorama's retainer, so offer last** | Consistency, reach | ongoing | **€750 – €1,500 / mo** |

## Bundles

| Bundle | Contains | List | **Offer** |
|---|---|---|---|
| **Tell the story properly** ⭐ | B3 + B2 + B1 | ~€4,400 | **€3,600** |
| **Arm your new colleague** ⭐ | B1 + S3 + S4 | ~€4,000 | **€3,300** |
| **Social starter** | S1 + S2 + S3 | ~€3,300 | **€2,700** |
| **Brand foundation** | B3 + B5 + B4 | ~€4,400 | **€3,600** |

## Where to start on this track

**B1, the tour presentation, at €1,200 – €2,000.** It is the oldest unmet request in
the organisation, it was raised by our own champion, the tour is what people actually
travel for, and **it touches nothing Panorama built.** If we sell one thing from this
track, it is this.

## Honest note on metrics here

**S1 exists because we have no social baseline either.** Followers, reach and posting
frequency are all unmeasured today. As with Phase 1, we would rather measure first
than quote a target we invented. The metrics above are the ones we would track from
the day each piece lands.

**A caution worth stating internally:** effort on this track is design and copy
capacity, not developer capacity — it does not compete with the build schedule, but it
does compete with whoever writes and designs. And brand work scopes creep badly, so
revision rounds are fixed at two, then change control.

---

# ONGOING — Looking after it

**€250 – €500 / month.** Hosting, monitoring, support, small changes, and 90 days of
tuning included after each launch. **A recurring operating cost is usually far easier
for a foundation to approve than a capital project** — worth offering alongside
anything over €2,000.

---

# The whole plan on one page

| Phase | Elapsed | Cost | Primary metrics | Pays for itself at |
|---|---|---|---|---|
| **0** Free fixes | 1 week | **€0** | M2, M4 | — |
| **1** Discovery | 2 weeks | **€4,000 – €6,000** | Makes all metrics measurable | 12–18 tours |
| **2** Front door | 2–3 weeks | **€2,400 – €3,300** | M1, M2, M3 | 7–10 tours |
| **3** Booking system | 5–8 weeks | **€6,500 – €9,500** | M1, M2, M3, M4, M5 | 19–28 tours |
| **4** Cancellations | 2–3 weeks | **€2,700 – €4,500** | M6, M5, M1 | 8–13 tours |
| **5** Payments | 2–3 weeks | **€2,800 – €4,200** | M1, booking value | 8–12 tours |
| **6** Partner value | 4–6 weeks | **€4,500 – €7,000** | M7 | ~1 retained partner |
| **7** Virtual & live data | 5–8 weeks | **€5,500 – €9,000** | M8, M4 | new revenue line |
| **Track B** Brand, story & social | modular | **€700 – €2,500 each** | Consistency, reach, posts per month | — |
| **Care** | ongoing | **€250 – €500 / mo** | — | — |

**Full programme, Phases 0–7: roughly €28,400 – €43,500 across 6 to 9 months.**

**Nobody should buy that as a single decision, and we would not propose it.** The
sequence exists so that each phase is funded by the one before it having worked.

## If budget is the constraint

| Situation | Buy | Cost |
|---|---|---|
| Nothing to spend this year | Phase 0 | **€0** |
| Want proof before committing | Phase 1 | **€4,000 – €6,000** |
| Small budget, visible result | Phases 0 + 2 | **€2,400 – €3,300** |
| Aart wants income, not cost | Manual partner report | **€2,000 – €3,000** |
| The oldest request in the building | Tour presentation | **€1,200 – €2,000** |

## Sequencing rule

**Nothing bought early is wasted later.** Phase 2's form becomes the booking intake in
Phase 3. Phase 2's closure rules move into the booking engine. Phase 3's data is what
makes Phase 6's partner reports possible at all.

That is the honest answer to *"are we wasting money by starting small?"* — and the
answer is no.
