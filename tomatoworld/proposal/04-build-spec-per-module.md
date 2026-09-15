# Build spec per module — INTERNAL
## What Josh (and anyone else building) actually has to make

**Audience:** the build team. Not the client.
**Purpose:** turn each priced module from `03-modular-menu.md` into a concrete
buildable unit — deliverables, done-criteria, stack, dependencies, effort.

**Standing assumptions for every module below** (challenge any of these in Discovery):
- **Architecture: Option B** — standalone service, thin embed into Umbraco 13. We host.
- **We do not get repo access** to their Umbraco instance unless Panorama grant it.
  Anything requiring a template change is a request to Panorama, not a task for us.
- Stack default: **Next.js + TypeScript + Postgres**, hosted on our infra.
- **Bilingual NL/EN from day one** on anything visitor-facing. Structure for a third
  language; do not hardcode two.
- **GDPR applies to everything** — school groups mean children's data. EU hosting,
  documented retention, DPA in place before the first personal record is stored.
- Every module ships with: staging URL, handover note, and whatever the office needs
  to operate it without calling us.

**Effort = developer-days**, two-person team, excluding PM and client time. ±40%
pre-Discovery.

---

# TIER 0 — Free

## M0.1 — Expired tour closure notice
**Build:** nothing. Tell them which page and which line, or send a one-line content
edit for Panorama or Ank to paste. Ank has backoffice access and can do it herself.
**Deliverable:** one email naming the page, the text, and why it matters.
**Done when:** the notice is gone. Verify, don't assume.
**Days:** 0.1

## M0.2 — Cookie consent finding
**Build:** nothing. Written finding: GTM (`GTM-NRDKKVZ`) loads with no consent gate.
Name the risk, name two remediation options (CMP product vs GTM consent mode).
**Deliverable:** half-page memo, addressed so Panorama can act on it.
**Done when:** sent. **Do not implement unless they buy M8.**
**Days:** 0.25

## M0.3 — Sitemap protocol finding
**Build:** nothing. Sitemap emits `http://` URLs.
**Deliverable:** one paragraph in the same memo as M0.2.
**Days:** 0.1

---

# TIER 1

## M1 — Closure & season rules · €900–1,200 · **2–3 days**
**Build:** a small config-driven availability notice. A dated ruleset (closure
periods, crop rotation, holidays) that renders the correct message on tour pages
and suppresses the request form when closed.

**Deliverables**
1. Closure period data model: `{ startDate, endDate, reasonCode, messageNL, messageEN }`
2. Admin screen — non-technical, Ank must be able to add a period unaided
3. Embed snippet for the tour pages (Panorama place it, or Ank via backoffice HTML block)
4. Request form auto-disabled during a closure, with a "notify me when tours resume" capture

**Done when:** a closure added through the admin screen changes the live page, and
expires automatically on its end date with no human action.

**Stack:** Next.js route + Postgres, or a JSON config if they refuse hosting.
Embed as a `<script>` + target div.
**Depends on:** Panorama placing the snippet once. **Get this agreed before quoting.**
**Risk:** if Panorama won't place a snippet, fall back to a backoffice content block
Ank maintains — worse, but unblocked.

## M2 — Structured tour request form · €900–1,200 · **2–3 days** ⭐
**Build:** a hosted form replacing the current free-text request. Output is still an
email — no system for staff to learn.

**Deliverables**
1. Form: tour type · preferred dates (2 options) · group size · **language required** ·
   audience type (school PO/VO/MBO-HBO-WO, corporate, international, private) ·
   school level and pupil count (conditional) · dietary needs · accessibility needs ·
   contact name, org, email, phone · free-text notes
2. Conditional logic — education fields only show for school audiences
3. Validation incl. lead-time rule (no request inside N days)
4. Structured email to the office: fixed field order, scannable, same shape every time
5. CSV/Sheets append of every submission — **this becomes the baseline dataset**
6. Spam protection (honeypot + rate limit, not CAPTCHA)
7. Bilingual

**Done when:** a submission produces a complete, consistently formatted email and a
row in the sheet, in both languages.

**Stack:** Next.js form + Postmark (transactional) + Google Sheets API or Postgres.
**Depends on:** Panorama replacing the form embed on `/request-a-guided-tour`.
**Note:** the CSV output quietly answers the volume questions we need for pricing
everything else. Say that internally, not to the client.

## M3 — Auto acknowledgement & info pack · €600–900 · **1–2 days**
**Build:** templated instant reply on form submit.

**Deliverables**
1. NL/EN email templates — what happens next, expected response time
2. Attached or linked practical info: hygiene protocol, parking, duration, accessibility
3. Content variants per audience type (school vs corporate vs international)
4. Editable templates — office changes copy without calling us

**Done when:** every M2 submission triggers the correct-language, correct-audience reply within a minute.
**Stack:** Postmark templates.
**Depends on:** M2. Ships with it in practice.

## M4 — Digital hygiene protocol sign-off · €700–1,000 · **2 days**
**Build:** acknowledgement step with a retained record.

**Deliverables**
1. Protocol page, NL/EN, content supplied by them
2. Group leader confirms on behalf of the group: name, org, date, timestamp, IP
3. Immutable record, exportable
4. Signed link emailed post-booking; reminder if unsigned 48h before visit
5. Office view: who has signed, who hasn't

**Done when:** an unsigned group is visible to the office before arrival.
**Stack:** Next.js + Postgres. Retention policy required — this is personal data.
**Depends on:** M2 (or M10 if booking exists).

## M5 — Shared booking calendar & process setup · €800–1,200 · **2–3 days**
**Build:** deliberately **no software.** Configuration and training.

**Deliverables**
1. Current process mapped, as-is
2. Shared calendar configured (Google Workspace or Microsoft — theirs) with a
   consistent event convention: title format, required fields, colour by tour type
3. Cancellation and reschedule procedure, written, one page
4. Holiday-cover procedure — the single-point-of-failure problem
5. Two training sessions with the office
6. One-page laminated quick reference

**Done when:** two consecutive weeks run through the calendar with no bookings
tracked only in email.
**Stack:** none. This is consulting.
**Risk:** adoption, not technology. Whoever runs this must sit with the admin, not send a doc.

## M6 — Guide roster · €700–1,000 · **2 days**
**Build:** simple shared record of guides, languages and availability.

**Deliverables**
1. Guide records: name, contact, **languages spoken with fluency level**, typical availability, active/inactive
2. Availability marking — simple enough for retired volunteers, so calendar-style, not a form
3. Office view filtered by language and date
4. Export

**Done when:** the office can answer "who can guide a German group on the 14th" in
under ten seconds.
**Stack:** Airtable or a small Next.js CRUD. **Prefer Airtable at this price** — the
build is not the value, the structure is.

## M7 — Partner value one-pager · €900–1,400 · **2–3 days** 🟠
**Build:** one page warming a partner prospect before Aart's meeting. **Not** a signup form.

**Deliverables**
1. Content structure and copy: what a partner gets, tiers, visitor reach, who else is in
2. Real numbers where available, clearly sourced
3. Wireframe + content, handed to Panorama for visual treatment
4. Single CTA: "talk to Aart" — a contact, not a form
5. Print/PDF version Aart can hand over in person

**Done when:** Aart uses it in a meeting.
**Depends on:** visitor numbers (M9 or manual), **Panorama for visual design.**

## M8 — Cookie consent implementation · €500–800 · **1–2 days**
**Build:** consent gate before GTM fires.
**Deliverables:** CMP configured (Cookiebot/CookieYes or GTM consent mode) · NL/EN
banner · categories · consent logging · GTM triggers gated · verification screenshots.
**Done when:** no non-essential tag fires before consent, verified in a clean browser.
**Depends on:** GTM access and a Panorama template change. **Offer it to Panorama first.**

## M9 — Measurement setup · €700–1,000 · **2 days** ⭐
**Build:** instrumentation so every later business case rests on data.

**Deliverables**
1. Analytics verified/configured on tour and partner journeys (GA4 via existing GTM)
2. Events: tour page view · request form start · form complete · abandon point · language · audience type
3. Funnel view: arrivals → form start → completion
4. Partner page engagement
5. Monthly one-page report, automated
6. **Baseline document** — the numbers as they stand today

**Done when:** we can state the request-form completion rate with evidence.
**Stack:** GA4 + GTM, optionally Metabase over the M2 dataset.
**Depends on:** GTM access. Consent-compliant, so ideally after M8.
**Internal note:** this is the module that de-risks *our* estimating. Push it.

---

# TIER 2

## M10 — Live availability booking, one tour type · €2,500–4,000 · **8–12 days**
**Build:** the booking core, one product only.

**Deliverables**
1. Entities: `TourProduct`, `TimeSlot`, `Booking`, `Contact`, `ClosurePeriod`
2. Slot generation from operating rules (weekday patterns, times, capacity) — not hand-entered dates
3. Public flow: product → month view → slot → group size → language → details → confirm
4. Capacity enforcement; **hold-then-confirm** (10-min reservation) to prevent double-booking under concurrency
5. Lead-time and closure rules (reuses M1)
6. Booking reference generation
7. Bilingual, mobile-first, styled to Panorama's design
8. Embed on the Umbraco page
9. Basic office list view

**Done when:** two people booking the last slot simultaneously produce exactly one
booking. **Test this explicitly — it is the one thing that must not fail.**

**Stack:** Next.js + Postgres + Prisma. Row-level locking or a transactional hold table.
**Depends on:** buy-vs-build decision from Discovery D4. **If Recras or similar is
chosen, this module becomes configuration + embed at roughly half the days.**
**Ships with:** M11. Do not quote M10 alone.

## M11 — Confirmations & reminders · €1,500–2,500 · **5–8 days**
**Deliverables:** confirmation email with `.ics` · configurable reminder (default T-3d
and T-1d) · staff notification on create/change/cancel · editable bilingual templates ·
delivery logging and bounce handling · retry on failure.
**Done when:** every state change produces the right message to the right party, and
failures are visible rather than silent.
**Stack:** Postmark + a job queue (BullMQ or Postgres-backed).
**Depends on:** M10. **Ships with it.**

## M12 — Self-service reschedule & cancel · €1,500–2,500 · **5–7 days**
**Deliverables:** signed tokenised link, no login · reschedule respecting availability
and policy window · cancel with reason capture · policy windows configurable per product ·
office notified · full audit trail · token expiry and single-use semantics.
**Done when:** a visitor reschedules without any email reaching the office.
**Security:** tokens must be unguessable, expiring, single-use. This is the module
most likely to leak another person's booking — treat token handling as the risk.
**Depends on:** M10. **Ship with M13.**

## M13 — Waitlist & automatic backfill · €1,200–2,000 · **3–5 days**
**Deliverables:** join waitlist on full slots · ordered queue · on cancellation,
auto-offer to next with a claim window (default 24h) · auto-expire and roll on ·
notify when exhausted · office override.
**Done when:** a cancellation results in a filled slot with zero staff involvement.
**Depends on:** M10, M11, M12.

## M14 — Office dashboard · €1,500–2,500 · **5–8 days**
**Deliverables:** week and month views (booked, free, guide assigned) · booking detail ·
create/amend/cancel on behalf of customer · capacity override · search and filter ·
CSV export · roles (admin / office / guide) · auth.
**Done when:** the office stops opening the database or the inbox to answer "what's on Thursday".
**Depends on:** M10.

## M15 — Payments via Mollie / iDEAL · €2,000–3,000 · **5–8 days**
**Deliverables:** Mollie integration (**iDEAL mandatory** for NL) · deposit or full
payment per product · invoice-on-account for schools and corporates · webhook handling
with idempotency · refunds per cancellation policy · payment status on booking ·
accounting export.
**Done when:** a duplicate webhook cannot double-charge or double-refund.
**Stack:** Mollie. Stripe only as fallback — iDEAL is non-negotiable here.
**Depends on:** M10. **Needs their VAT treatment and accounting package confirmed first.**
**Risk:** foundations often have specific VAT rules. Ask before building.

## M16 — Partner report from manual data · €2,000–3,000 · **4–6 days** ⭐
**Build:** one real partner report from whatever records exist. **No booking system required.**

**Deliverables**
1. Whatever visitor data they hold, gathered and cleaned
2. Report template: visitor count, countries, segments, groups hosted by that partner, period
3. **One fully produced report for one real partner**, presentation quality
4. Data-gathering method documented so they can repeat it
5. Honest gap list: what could not be evidenced and what M22 would fix

**Done when:** Aart can hand it to a partner at a renewal conversation.
**Stack:** whatever is fastest — spreadsheet to PDF is fine. **The deliverable is the
artefact, not the pipeline.** Do not over-build this.
**Depends on:** them providing records. **Confirm the data exists before quoting.**

## M17 — Partner portal, minimal · €3,000–4,000 · **10–14 days**
**Deliverables:** partner auth · profile management · asset upload with format/size
validation · approval workflow before publication · tier-aware entitlements · admin
moderation view · publish approved assets to the site (Content Delivery API or export).
**Done when:** a partner updates their logo without emailing anyone.
**Stack:** Next.js + Clerk or Auth0 (low user count, cheapest tier) + S3-compatible storage.
**Depends on:** how assets reach the Umbraco site — **needs a Panorama conversation.**

## M18 — Pre-visit assistant, FAQ scope · €2,500–4,000 · **8–12 days**
**Deliverables:** Claude API assistant over a **curated** content set (FAQ, practical
info, tour descriptions) · NL/EN · **strict grounding — refuses anything outside the
content set** · escalation to human with conversation context · logging for review ·
admin control of the content set · rate limiting and cost cap.
**Done when:** it declines to answer a pricing or hygiene-protocol question it has no
source for, rather than inventing one.
**Stack:** Claude API + a small vector store or direct context injection (their content
is small enough that RAG may be unnecessary — check before building it).
**Risk:** a wrong answer about biosecurity or fees is a real-world problem. Scope narrow,
refuse loudly, log everything.

## M19 — Post-visit takeaway · €1,500–2,500 · **4–6 days**
**Deliverables:** per-group page (what they saw, partners involved, further reading) ·
generated on visit completion · emailed 24h after · optional feedback capture ·
shareable, no login.
**Done when:** a group receives it without anyone pressing anything.
**Depends on:** M10, M11.

## M20 — Guide availability & language matching · €2,000–3,000 · **5–9 days**
**Deliverables:** guide availability calendar (from M6) · **slot availability filtered
by whether a guide covering the required language is free** · auto-assign on booking ·
manual reassign · guide notification · guide self-service availability.
**Done when:** selecting "German" removes every date without a German-speaking guide.
**Depends on:** M6, M10.
**Internal note:** this is the requirement off-the-shelf booking products fail. If we
go the buy route, **this is the module we still build ourselves** — and it is the
reason a pure buy route may not work.

---

# REDESIGN 🟠
*We sell the thinking. Panorama build it. Never propose R7.*

## R1 — Audience & navigation research · €1,500–2,500 · **4–6 days**
**Deliverables:** 5–8 interviews (Ank, office, a guide, 2–3 recent visitors, ideally a
partner) · analytics review of current paths (needs M9 or GA access) · audience
definitions with their actual goals · findings deck · **evidence for the
visitor-vs-partner split problem**, not opinion.
**Done when:** we can state what each audience wants in one sentence each, with evidence.
**Stack:** none. Research.

## R2 — Navigation & IA specification · €1,500–2,500 · **4–6 days**
**Deliverables:** proposed sitemap for all 373 URLs · navigation labelling NL/EN ·
page hierarchy and templates needed · redirect map for moved pages · **a spec Panorama
can build from without asking us questions.**
**Done when:** Panorama confirm they could implement it as written.
**Depends on:** R1.

## R3 — Homepage audience split wireframes · €1,200–2,000 · **3–5 days**
**Deliverables:** annotated wireframes (desktop + mobile), content requirements per
block, CTA hierarchy. **Wireframes, not visual design.**
**Done when:** handed to Panorama with no ambiguity about intent.

## R4 — Tour & booking page wireframes · €1,500–2,500 · **4–6 days**
**Deliverables:** tour overview, tour detail, education variants, booking entry point.
Clear boundary marked between Panorama's pages and our booking surface.
**Depends on:** R2. Aligns with M10.

## R5 — Partner section wireframes · €1,200–2,000 · **3–5 days**
**Deliverables:** structure differentiating Partners / Friends / Ambassadors, plus the
partner value page (M7) in context.

## R6 — Ideation & prototyping workshop · €1,500–2,500 · **3–4 days** ⭐
**Deliverables:** half-day facilitated session — Ank, the new marketing colleague,
**Panorama**, ideally Aart · prepared stimulus · **clickable prototype built afterwards** ·
written agreed direction · prioritised backlog.
**Done when:** everyone in the room agrees what happens next, in writing.
**Internal note:** run this early. It is the cheapest way to convert Panorama from
gatekeeper to collaborator, and it gives the new hire the visible win she wants.

## R7 — Full visual redesign 🔴
**We do not build this.** Recommend Panorama, in writing, and say so to the client.


---

# BRANDING TRACK

**Note for the team:** these are craft deliverables, not engineering. Effort is
*working days*, and the constraint is design and writing capacity, not dev capacity.
Check who on our side actually delivers these before committing dates.

## B1 — Brand & messaging audit · €900–1,400 · **3 days**
**Make:** an assessment document.
1. Inventory of every touchpoint: website, socials, tour presentation, printed material, partner-facing assets, signage
2. Message consistency analysis — where they contradict themselves
3. Visual consistency analysis — logo use, colour, type in the wild
4. Tone analysis NL vs EN (Ank has already flagged the EN as previously poor)
5. Prioritised findings, worst first
**Done when:** every finding is evidenced with a screenshot or example. No opinions without proof.

## B2 — Positioning & messaging framework · €1,500–2,500 · **4–6 days** 🟠
**Make:** audience definitions (visitor, school, trade delegation, partner, press) ·
positioning statement · core message + three proof points · value proposition per
audience · tone of voice with do/don't examples · NL and EN.
**Done when:** Ank, Aart and a guide independently describe Tomato World the same way.
**Check first:** Panorama sell positioning. Offer jointly or confirm it is unclaimed.

## B3 — Story toolkit · €1,200–2,000 · **3–5 days** ⭐
**Make:** the organisation's story in reusable forms.
1. One-line version · 30-second version · 2-minute version · full narrative
2. Audience variants: school, trade delegation, investor, press, international
3. Key facts and figures sheet, sourced — **no unverifiable claims**
4. Guide crib sheet, printable
5. NL and EN
**Done when:** a new volunteer guide can deliver a coherent story from it on day one.
**Input needed:** interviews with Ank and two other guides. She is the source here.

## B4 — Tour presentation redesign · €1,200–2,000 · **3–5 days** ⭐⭐
**Make:** the presentation the tour is actually delivered from.
1. Current deck audited — content, order, what guides skip
2. Restructured narrative flow (uses B3 if bought)
3. Designed slides, on brand
4. **Audience variants** — school, corporate, international
5. **Placeholder slots for live field-lab data**, so it does not go stale
6. NL and EN
7. Editable master + guide notes, so they maintain it without us
**Done when:** a guide runs a full tour from it unaided and prefers it to the old one.
**Input needed:** the existing deck, and to observe or take an actual tour.
**Internal:** this is the oldest unmet request in the organisation and it touches
nothing Panorama built. If we sell one branding module, sell this.

## B5 — Brand guidelines · €1,500–2,500 · **4–6 days** 🟠
**Make:** logo use and clear space · colour palette with values · typography · imagery
direction · tone summary · templates list · do/don't examples · PDF + editable source.
**Check first:** Panorama deliver brand guides as standard. **Ask whether one exists.
If it does, extend theirs — do not produce a competing document.**

## B6 — Visual identity refresh · €2,500–4,500 · **8–12 days** 🔴🟠
**Do not propose unless** Panorama did not create the current identity, or are not
retained. Otherwise recommend them. If it does proceed: discovery, concepts, refinement,
asset production, handover.

## B7 — Partner brand kit · €900–1,500 · **2–3 days**
**Make:** logo pack and lockups for partners · usage rules and permissions · boilerplate
copy NL/EN describing Tomato World · a template for partners announcing their
partnership · reciprocal rules for how TW presents partners.
**Done when:** a partner can announce the partnership without emailing anyone for assets.

---

# SOCIAL MEDIA TRACK

## S1 — Social audit & benchmark · €700–1,200 · **2–3 days**
**Make:** channel inventory with follower and engagement baselines · what performs ·
what is dormant · posting cadence reality vs intent · benchmark against 3–5 comparable
centres · prioritised findings.
**Done when:** we can state their current baseline numerically.

## S2 — Social strategy & channel plan · €1,500–2,500 · **4–6 days** 🟠
**Make:** channel-by-channel purpose and audience · objectives with measurable targets ·
cadence · resourcing reality check against who actually has time · measurement plan.
**Check first:** squarely Panorama's Online Marketing Studio.

## S3 — Content pillars & calendar · €900–1,500 · **3–4 days**
**Make:** 4–6 recurring content pillars · annual rhythm mapped to their real calendar
(seasons, crop rotation, hackathons, school terms) · a calendar template the office can
maintain · 20 worked post ideas.
**Done when:** someone non-specialist can fill next month unaided.

## S4 — Content engine on visit data · €1,500–2,500 · **4–6 days** ⭐
**Make:** the pipeline turning what we build into content.
1. Content types from booking/visit data: visitor origin milestones, partner spotlights, season markers, field-lab results, group stories
2. Automated draft generation where sensible (Claude API), **always human-approved before publishing**
3. Approval queue
4. Privacy rules — **no group or individual identifiable without consent**
**Done when:** a completed visit can produce a publishable draft with one click.
**Depends on:** M10 booking data, and ideally M19 and S9.
**Internal:** Panorama cannot build this. It needs the booking system underneath. This
is the socially defensible module even if they hold the retainer.

## S5 — Template kit · €900–1,500 · **3–4 days**
**Make:** 10–15 Canva or Figma templates covering their recurring post types, on brand,
NL/EN, sized per channel, with a short how-to. **Templates must be editable by a
non-designer — that is the entire point.**
**Depends on:** B5 or existing brand guidelines.

## S6 — Enablement & training · €900–1,500 · **2–3 days** ⭐
**Make:** two working sessions with the new marketing colleague · a written playbook
(what to post, when, how to approve, how to measure) · handover of pillars, calendar
and templates · one follow-up session after a month.
**Done when:** she runs a full month without us.
**Internal:** cheapest way to turn the person most likely to see us as a rival into
our advocate.

## S7 — Managed social · €750–1,500/month 🟠
**Make:** monthly content production and scheduling, community management, monthly
report. **Most direct collision with Panorama's retainer. Offer last, only once scope
is confirmed clear.** Define the exit — they should be able to take it in-house.

## S8 — LinkedIn programme · €1,000–1,800 · **3–4 days**
**Make:** profile optimisation for Aart and key staff · content approach for a closed,
relationship-led industry · 10 drafted posts · cadence and engagement guidance.
**Done when:** Aart posts something himself and it lands.

## S9 — Visitor story capture · €1,200–2,000 · **3–5 days**
**Make:** end-of-visit capture flow for quote, photo and permission · **explicit
consent capture, GDPR-compliant, especially for school groups** · storage and tagging ·
feeds S4 · office review queue.
**Done when:** a month of visits yields usable stories with consent on record.
**Depends on:** M19 or M11.
**Risk:** children's images. Consent handling here is not optional and must be
explicit, not implied.

---

# Brand & social sequencing

If they buy this track at all, order matters:

1. **B4** — tour presentation. Oldest request, zero Panorama overlap, immediate visible win
2. **B1** — audit, to size everything else honestly
3. **B3** — story toolkit, which feeds B4, S3 and every page
4. **S1 + S3** — audit and pillars
5. **B5 or extend Panorama's** — guidelines
6. **S5 + S6** — templates and training, handing it to the new hire
7. **S4** — once M10 exists and there is data to draw on
8. **S7** — only if genuinely unclaimed

**B4 first, always.** It is the one thing a named person has already asked for.

---

# TIER 3 — outline only, spec properly when live

| # | Module | Core build | Days |
|---|---|---|---|
| **M21** | Virtual tour platform | Paid access, multilingual, video/interactive, live field-lab feed, Mollie, access control | 15–25 |
| **M22** | Automated partner reporting | Productises M16 on M10 data; scheduled generation, PDF + web, renewal-timed delivery | 12–20 |
| **M23** | Space rental booking | Second product line on the M10 engine; resources, T&Cs, quotes | 12–18 |
| **M24** | On-site signage | Kiosk web app, live data, partner rotation, remote content. **Qualify field-lab API access first — may be infeasible** | 8–14 |
| **M25** | Inbound triage | Mailbox integration, classification, draft replies, routing | 5–8 |
| **M26** | School programme layer | Teacher materials, quiz/worksheet, re-booking prompts | 5–10 |

---

# Build order if they buy piecemeal

Cheapest coherent path that never wastes work:

1. **M9** — measure first, so everything after is evidence-based
2. **M2 + M3** — structured intake, and the dataset starts accumulating
3. **M1** — stop the stale-notice defect permanently
4. **M6** — guide roster, cheap, and M20 needs it later
5. **M16** — the income-side proof for Aart
6. **M10 + M11** — the booking core, once volume justifies it
7. **M12 + M13** — self-service and backfill
8. **M14, M20, M15** — dashboard, language matching, payments
9. R-track in parallel whenever Panorama are willing

**Nothing in steps 1–5 is thrown away when step 6 arrives.** M2's form becomes the
booking intake, M9's instrumentation carries over, M6 feeds M20, M1's rules move into
M10. Say that to the client — it is the honest answer to "are we wasting money by
starting small?", and the answer is no.

---

# Open items blocking firm estimates

| # | Question | Blocks |
|---|---|---|
| 1 | Will Panorama place an embed snippet? | M1, M2, M10 — **everything** |
| 2 | Buy vs build for booking (Discovery D4) | M10 ±50% |
| 3 | Tours per month by type | Whether M10 is justified at all |
| 4 | GTM access | M8, M9 |
| 5 | Accounting package and VAT treatment | M15 |
| 6 | Do partner visitor records exist? | M16 |
| 7 | Field-lab data API? | M24, and part of M21 |
| 8 | Google Workspace or Microsoft? | M5 |
| 9 | Guide count and languages | M6, M20 |
| 10 | Who owns the booking inbox, and who covers holidays? | M5 |
| 11 | **Is Panorama retained for branding and/or social?** | Whole B and S tracks |
| 12 | Does a brand guide already exist? | B5 |
| 13 | Who actually delivers design and copy on our side? | All B and S effort dates |
