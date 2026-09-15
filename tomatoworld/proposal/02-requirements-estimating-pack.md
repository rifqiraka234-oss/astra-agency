# Requirements & estimating pack — INTERNAL
## Tomato World · for Josh

**Not for the client.** Effort figures, build/buy reasoning and risk loading stay
internal. The client document is `01-client-proposal.md`.

**Estimating basis:** pre-discovery. Ranges are **developer-days** for a two-person
team, excluding PM, client time and QA contingency. Treat as ±40% until Discovery
closes the open variables. Add 15% integration contingency on anything touching
their Umbraco instance, since we have no repo access and no staging environment yet.

---

## 1. Known technical context

| Item | Value | Confidence |
|---|---|---|
| CMS | Umbraco 13 (LTS), ASP.NET Core | **High** — verified from backoffice + uSync 13.3.2 |
| Runtime | Kestrel behind Phusion Passenger 6.1.2, Plesk on Linux | **High** — response headers |
| Media | ImageSharp.Web | High |
| Frontend | webpack bundle, vanilla JS, GSAP 3.12.5, Swiper, lightGallery 2.7.2. No framework | High |
| Deployment | uSync present → they run dev/staging/prod | Medium |
| Existing booking system | **None.** Request form → email | **High** — 2 forms, 49 inputs, mailto links |
| Existing payment | None found | Medium |
| Existing CRM | None visible | Low — must confirm |
| Site scale | 373 URLs, NL/EN | High |
| Agency | Panorama Studios, custom App_Plugin, own Umbraco shop | High |

**Critical unknown:** we have no access to the Umbraco instance, no repo, no
staging, and no idea of their hosting headroom. Plesk/Passenger shared hosting may
not tolerate a second .NET service. **This is the largest single estimating risk.**

---

## 2. Architecture options

### Option A — Umbraco package, in-process
Build as an Umbraco 13 package: document types, surface controllers, custom
backoffice sections, EF Core against their existing DB.

- **Pros:** single deployment, native backoffice for staff, no CORS, no extra hosting.
- **Cons:** couples us to their release cycle and to Panorama. Requires repo access, their build pipeline, and .NET skills on our side. Their Plesk host constrains us.
- **Effort impact:** +20% vs Option B for unfamiliar tooling; −10 days on auth/admin because Umbraco Members and backoffice UI come free.

### Option B — Standalone service + thin embed ✅ *recommended default*
Separate service (Node/Next.js or .NET) on our own hosting. Umbraco page embeds a
widget or iframe. Data lives with us. Read-only content pulled from Umbraco's
Content Delivery API if needed.

- **Pros:** we control the stack, deployment and quality. No dependency on Panorama's release cycle. Reusable for other clients (see productizing play). Panorama's site untouched — the cleanest political answer.
- **Cons:** separate auth, separate hosting cost, styling must be matched by hand, SEO weaker for booking pages.
- **This is the option that matches what we told Ank** — "an extension that can be plugged in."

### Option C — Configure an off-the-shelf platform
Buy a tour/activity booking product, configure, embed.

- **Pros:** dramatically cheaper and faster for the core 70%.
- **Cons:** the last 30% — **volunteer guide language matching, partner attribution, three tiers, education fee bands** — is exactly where off-the-shelf products fail. Partner ROI reporting (Phase 2) almost certainly cannot be done inside one.
- **Likely landing point:** hybrid — buy the booking core, build guide assignment and partner attribution alongside it.

> **Discovery must close this.** Option C vs Option B is roughly a **€10k swing**.
> Do not quote Phase 1 firmly before the spike in §4.

---

## 3. Candidate systems

| Need | Candidates | Notes |
|---|---|---|
| **Booking core (buy)** | **Recras** (NL, group/arrangement focused — closest fit), Bókun, Regiondo, Checkfront, Rezdy, FareHarbor, Peek Pro | Recras is Dutch and built for group bookings and arrangements. Evaluate first. |
| **Booking core (build)** | Next.js + Postgres, or .NET + EF Core | Choose .NET only if we go Option A |
| **Scheduling primitives** | Cal.com (open source, self-hostable) | Good for guide availability if we build |
| **Payments** | **Mollie** (iDEAL — essential for NL schools/companies), Stripe fallback | Mollie is non-negotiable for the Dutch market |
| **Invoicing / accounting** | Moneybird, e-Boekhouden, Exact Online | Must confirm what they use |
| **Transactional email** | Postmark (best deliverability), Resend, Brevo | Keep strictly separate from Panorama's marketing tooling |
| **Portal auth** | Umbraco Members (Option A), Clerk or Auth0 (Option B) | Partner count is low — cheapest tier is fine |
| **Reporting** | Metabase (open source) or built-in | Metabase is fast for Phase 2 internal reporting |
| **AI** | Claude API | Triage, pre-visit assistant, translation QA |
| **Digital signage** | Yodeck, Screenly, or browser kiosk + web app | Kiosk + web app is cheapest and we control it |
| **Hosting** | Our own (Option B) | Assume we host; do not assume their Plesk box has headroom |

---

## 4. Discovery Sprint — the thing we sell first

**Client price: €4,000 – €6,000. Effort: 8–12 dev-days + facilitation.**

| # | Deliverable | Days |
|---|---|---|
| D1 | Stakeholder sessions — Ank, admin/booking owner, Aart, new marketing hire | 1.5 |
| D2 | **Panorama technical session** — architecture boundary, access, deployment | 0.5 |
| D3 | Current-state process map + measured baseline (tours/month, hours/week, cancellation rate) | 1.5 |
| D4 | **Buy-vs-build spike** — evaluate Recras + 1 alternative against the 30% hard requirements | 2 |
| D5 | **Clickable prototype** of the booking flow | 3 |
| D6 | Costed phase plan with firm pricing | 1 |
| D7 | Written technical approach + integration agreement | 0.5 |

**D4 and D5 are the value.** D5 is what Ank shows Aart — she literally tried to click
our mockup in the meeting. D4 is what makes our Phase 1 number real.

**Free pre-work (0.5 day, do before any contract):** expired tour banner, cookie
consent recommendation, sitemap https. Route through Panorama.

---

## 5. Phase 1 — Booking & capacity

**Client range: €12,000 – €22,000.**
**Effort: 40–70 dev-days** (low = Option C hybrid, high = Option B full build).

### Data entities
`TourProduct` · `TourVariant` (education PO/VO/MBO-HBO-WO, Combitour, Taste&Feel,
Taste&Taste, Online) · `TimeSlot` · `Booking` · `BookingLine` · `Group` ·
`Contact` · `Guide` · `GuideAvailability` · `Language` · `ClosurePeriod` ·
`Waitlist` · `Space` · `Notification`

### Functional requirements

**FR-1 Availability & capacity** — 8–14 days
1. Define tour products with duration, min/max group size, languages supported.
2. Generate bookable slots from operating rules, not hand-entered dates.
3. Enforce per-slot and per-day capacity; block overlapping slots on shared resources.
4. **Closure periods as date-range rules** (crop rotation, holidays) that automatically suppress availability and display the correct message. *Directly fixes the live stale-banner defect.*
5. Lead-time rules — no booking within N days; different N per product.

**FR-2 Booking flow** — 8–12 days
6. Public flow: product → date → slot → group size → language → details → confirm.
7. Education variants collect school type and pupil count and apply the correct fee band.
8. Bilingual NL/EN, structured for more languages later.
9. Hold-then-confirm (short reservation window) to prevent double-booking.
10. Accessible, mobile-first, styled to match Panorama's design.

**FR-3 Notifications & self-service** — 5–8 days
11. Automatic confirmation with calendar attachment.
12. Reminder at configurable intervals.
13. **Self-service reschedule and cancel via signed link, no login.**
14. Cancellation policy windows enforced.
15. Staff notified of every change.

**FR-4 Waitlist & backfill** — 3–5 days
16. Join waitlist on a full slot.
17. On cancellation, auto-offer to waitlist in order with a claim window.
18. Auto-expire and roll to next.

**FR-5 Guides** — 5–9 days
19. Guide records with **languages spoken** and availability calendar.
20. Slot availability reflects whether a guide covering the required language is free. *This is the requirement off-the-shelf products will not do.*
21. Assign/reassign guide to booking; notify guide.
22. Guides self-manage availability (volunteers — must be low friction).

**FR-6 Admin console** — 8–12 days
23. Week/month view: booked, free, who is guiding.
24. Create, amend, cancel on behalf of a customer.
25. Manual override of capacity and assignment.
26. Search and export.
27. Roles: admin, office, guide.

**FR-7 Payments (optional sub-module)** — 5–8 days
28. Mollie/iDEAL for deposits or full payment.
29. Invoice-on-account for schools and corporates.
30. Refund handling aligned to cancellation policy.

### Non-functional
- GDPR: data minimisation, retention policy, DPA, EU hosting. **They handle school children's group data — this is not optional.**
- Availability target 99.5%; booking is revenue-critical during season.
- Load is trivial (hundreds of bookings/month) — **do not over-engineer**.
- Bilingual from day one; third language must not require a rebuild.
- Audit trail on every booking mutation.

### Effort drivers
↑ Custom build over configure · ↑ Payments · ↑ Option A (their repo, their pipeline, .NET) · ↑ Space rental in scope (FR adds ~8 days) · ↓ Single tour type only for pilot · ↓ Deferring payments to Phase 1b

### Assumptions
- We host (Option B). Their Plesk box is **not** assumed usable.
- Panorama provide design tokens/CSS or approve our match.
- Fee structures are stable and documented.
- Staff count is small — no complex permission matrix needed.

---

## 6. Phase 2 — Partner value

**Client range: €10,000 – €18,000. Effort: 30–50 dev-days.**

### Entities
`Partner` · `PartnerTier` (Partner/Friend/Ambassador) · `PartnerAsset` ·
`PartnerPlacement` · `VisitorAttribution` · `PartnerReport`

### Functional requirements

**FR-8 Partner portal** — 10–15 days
1. Partner login; manage own profile, logo, materials.
2. Asset upload with format validation and approval workflow before publication.
3. Tier-aware entitlements.
4. Publish approved assets to the Umbraco site (Content Delivery API or scheduled export).

**FR-9 Attribution & reporting** — 10–16 days
5. Capture visitor counts, origin country, segment, date from Phase 1 bookings.
6. Attribute partner-hosted groups to the partner.
7. Track material/placement views where measurable.
8. **Generate annual partner report as PDF and web page.**
9. Scheduled generation and delivery ahead of renewal dates.

**FR-10 Partner-hosted group flow** — 5–8 days
10. Partner books a group under their own account, against an allocation.
11. Allocation tracking per tier.

**FR-11 Partner sales-support page** — 3–5 days
12. Value page for prospects with live proof numbers. **Not a signup form** — Ank ruled that out.

### Dependency note
FR-9 needs Phase 1 data. **Offer a manual-data pilot** — generate one report from
their existing records (~4 days) to prove the concept before Phase 1 is funded. This
breaks the hard dependency and is the strongest possible Aart-facing demo.

### Effort drivers
↑ Placement-level view tracking (needs on-site instrumentation — may be infeasible; qualify it early) · ↑ PDF design fidelity · ↓ Web-only report, no PDF

---

## 7. Phase 3 — Reach & experience

**Client range: €15,000 – €30,000. Effort: 45–80 dev-days. Fully modular.**

| Module | Requirements summary | Days |
|---|---|---|
| **Virtual tour platform** | Paid, bookable, multilingual; video/interactive content; live field-lab data feed; access control; Mollie payment; works during closure period | 15–25 |
| **Pre-visit AI assistant** | Claude API over their FAQ, practical info and tour content; NL/EN + more; escalation to human; **strictly scoped to prevent fabrication about hygiene protocol or pricing** | 8–12 |
| **Inbound triage** | Classify school/corporate/international/press; draft reply; route. Needs mailbox integration | 5–8 |
| **On-site signage** | Kiosk web app; live greenhouse/climate data; partner rotation; remote content management. **Requires field-lab data access — qualify feasibility first** | 8–14 |
| **Post-visit takeaway** | Per-group page: what they saw, partner links, follow-up | 4–6 |
| **School programme layer** | Teacher-facing materials, quiz/worksheet, re-booking prompt | 5–10 |

**Biggest unknown:** whether field-lab sensor data is accessible via any API. If not,
signage and live-data modules lose most of their value. **Ask in Discovery.**

---

## 7b. Brand & social track

**Added by decision — see `analysis/03` for the competitive caveat.** This work was
originally excluded because Panorama's Communicatie, Design and Online Marketing
Studios cover it. The decision is to include it anyway. That is a commercial call,
not a technical one, but it changes this pack in three ways:

1. **Effort here is craft days, not developer days.** The constraint is design and
   copywriting capacity, not Josh's. **Do not schedule these against dev availability.**
   Confirm who actually delivers before committing dates.
2. **Almost nothing in this track is estimable by the usual method.** There is no data
   model, no integration surface, no concurrency. Estimates are experience-based and
   scope creep is the dominant risk — a brand guide can absorb infinite revision.
   **Fix round counts contractually: two rounds of revision, then change control.**
3. **One module is genuinely technical:** S4, the content engine, which depends on M10
   booking data and uses the Claude API. Estimate that one like a normal build.

| # | Module | Client range | Craft days | Notes |
|---|---|---|---|---|
| **B1** | Brand & messaging audit | €900 – €1,400 | 3 | Assessment only |
| **B2** | Positioning framework | €1,500 – €2,500 | 4–6 | 🟠 Panorama's Communicatie Studio |
| **B3** | Story toolkit | €1,200 – €2,000 | 3–5 | Needs guide interviews |
| **B4** | Tour presentation redesign | €1,200 – €2,000 | 3–5 | ⭐ Lead with this |
| **B5** | Brand guidelines | €1,500 – €2,500 | 4–6 | 🟠 Check if one exists first |
| **B6** | Visual identity refresh | €2,500 – €4,500 | 8–12 | 🔴 Do not propose blind |
| **B7** | Partner brand kit | €900 – €1,500 | 2–3 | Unserved |
| **S1** | Social audit | €700 – €1,200 | 2–3 | Assessment only |
| **S2** | Social strategy | €1,500 – €2,500 | 4–6 | 🟠 Panorama core |
| **S3** | Content pillars & calendar | €900 – €1,500 | 3–4 | |
| **S4** | Content engine on visit data | €1,500 – €2,500 | 4–6 **dev** | ⭐ Depends on M10 |
| **S5** | Template kit | €900 – €1,500 | 3–4 | Depends on B5 |
| **S6** | Enablement & training | €900 – €1,500 | 2–3 | ⭐ Political value |
| **S7** | Managed social | €750 – €1,500/mo | ongoing | 🟠 Retainer collision |
| **S8** | LinkedIn programme | €1,000 – €1,800 | 3–4 | |
| **S9** | Visitor story capture | €1,200 – €2,000 | 3–5 | **GDPR: children's images** |

**Additional systems needed for this track**

| Need | Candidates | Notes |
|---|---|---|
| Template production | **Figma** or **Canva** | Canva if the new hire must edit unaided — that is the point of S5 |
| Presentation | Google Slides, PowerPoint, or Pitch | Match whatever the guides already use. Do not impose a new tool on volunteers |
| Social scheduling | Buffer, Later, Metricool | Only if S7 proceeds |
| Content drafting | Claude API | S4 only, always human-approved before publish |
| Consent records | Reuse the M4 / M9 stack | S9 must store consent, not just content |

**Hard dependency:** S4 needs M10. Do not sell S4 into an organisation with no booking
system — there is no data for it to run on.

---

## 8. Rolled-up estimating summary

| Item | Client range | Dev-days | Confidence |
|---|---|---|---|
| Free fixes | €0 | 0.5 | High |
| Discovery Sprint | €4k – €6k | 8–12 | **High** |
| Phase 1 — Booking & capacity | €12k – €22k | 40–70 | Medium |
| Phase 1b — Payments | incl. above | 5–8 | Medium |
| Phase 2 — Partner value | €10k – €18k | 30–50 | Low-Medium |
| Phase 2 pilot (manual data) | €2k – €3k | 4 | Medium |
| Phase 3 — Reach & experience | €15k – €30k | 45–80 | Low |
| Brand track (B1–B7) | €9k – €16k | 27–40 **craft** | Low-Medium |
| Social track (S1–S9) | €9k – €16k | 25–37 (S4 is dev) | Low-Medium |
| Managed social retainer | €750 – €1,500/mo | ongoing | Medium |

**Brand and social day-counts are craft capacity, not developer capacity.** They do
not compete with the build schedule, but they do compete with whoever writes and
designs — confirm that resource exists before quoting either track.

**Only Discovery should ever be quoted firmly right now.** Everything else is a
budgeting band and must be labelled as such to the client.

---

## 9. Risk register

| Risk | Impact | Mitigation |
|---|---|---|
| Panorama block or slow-roll integration | **High** | Option B removes the dependency. Invite them into Discovery (D2). |
| No 2026 budget → Jan 2027 → enthusiasm decays | **High** | Digivoucher (verify eligibility), or partner-sponsored build |
| Their hosting can't take a second service | Medium | Option B — we host |
| Off-the-shelf fails the guide-language requirement | Medium | D4 spike decides before we quote |
| Field-lab data not accessible | Medium | Qualify in Discovery; Phase 3 modules are independently droppable |
| Volume too low to justify custom build | **Medium-High** | D3 baseline. If tours are ~10/month, push Option C hard and shrink Phase 1. |
| Ank leaves or steps back — she is a volunteer | **High** | Build a relationship with Aart and the new marketing hire directly |
| GDPR exposure via school children's data | Medium | EU hosting, DPA, retention policy from day one |
| **Brand/social collides with Panorama's retained scope** | **High** | Ask Ank Q11 before proposing either track. Client doc already offers to stand down — use that line rather than discovering the conflict late |
| **Brand/social competes with the new in-house marketing hire** | Medium-High | Sell S6 enablement rather than S7 delivery. Make her the owner, not the bypassed party |
| **Scope creep on brand deliverables** | **High** | Fix revision rounds contractually. Two rounds then change control. A brand guide with open revisions is unbounded |
| **We lack craft capacity to deliver B and S** | **High** | Confirm who designs and who writes **before** anything is offered. Do not sell capacity we have not identified |
| S4 sold without M10 existing | Medium | Hard dependency. Refuse to sell S4 standalone |

---

## 10. Questions Josh should have answered before quoting Phase 1

1. Tours per month by type, and seasonal profile?
2. Hours per week on booking coordination?
3. Cancellation and no-show rate?
4. Payment today — invoice, transfer, on the day?
5. Accounting package?
6. Is space rental manual, and what volume?
7. Number of guides, and their languages?
8. Partner count and annual fee?
9. Does Panorama grant repo/staging access — and do we even want it?
10. Is there any field-lab data API?
11. **Is Panorama retained for branding and/or social media, or is it unclaimed?** — blocks the whole B and S track
12. Does a brand guide already exist, and who produced it? — blocks B5, B6
13. What does the new marketing hire's remit actually cover? — decides S6 vs S7
14. Who on our side delivers design and copy, and what is their availability? — blocks every B and S date
15. What tools do guides already present from? — blocks B4
