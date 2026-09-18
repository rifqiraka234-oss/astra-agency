# Tomatoworld — Technical RFP for estimation
**To:** Amwisesa engineering
**From:** Astra Agency (Raka / Josh)
**Date:** 18 September 2026
**Action required:** effort + cost estimate per module, assumptions, risks, questions back

---

## 0. TL;DR — what we need from you

Estimate **seven modules**, independently. Each may be sold on its own, so **each must
be separately costed and separately shippable**. Do not assume the client buys all of
them, or buys them in order.

Return, per module:

| Field | Detail |
|---|---|
| Effort | Developer-days, split BE / FE / QA / DevOps / PM |
| Duration | Calendar weeks at your proposed team size |
| Cost | Your rate card, or a blended day rate |
| Assumptions | Everything you had to assume to produce the number |
| Risks | With your suggested mitigation |
| Dependencies | On us, on the client, or on third parties |

Plus, overall: recommended team composition, a parallelisation plan, and **your
recommendation on Architecture Option A vs B (§3)** — that decision is worth roughly
50% of the total and we want your view before we commit.

**Out of scope for you:** discovery and the clickable prototype (Astra), and the
branding, story, social media and website redesign track (Astra). You are being asked
for the transactional platform only.

---

## 1. Client and business context

**Tomatoworld** (tomatoworld.nl) is a Dutch foundation in Honselersdijk, Westland. It
is an experience centre and field lab for greenhouse horticulture. Thousands of
visitors a year, 30+ paying partner companies (Koppert, Rijk Zwaan and similar).

**Revenue model**
- **Guided tours** — €200 per tour + €12.50 per person. Multiple products: general,
  education (split PO / VO / MBO-HBO-WO with separate fee bands), Combitour,
  Taste & Feel, Taste and Taste, and an Online tour.
- **Space rental** — expo space and field lab, with its own T&Cs. *Not in this RFP,
  but design so it can be added without rework.*
- **Specialist booking** — a third bookable product in their navigation. Same note.
- **Annual partner fees** — partners get visibility and bring their own customer
  groups through.

**Operational reality today**
- A single long web form → email inbox → manual coordination.
- Seasonal closure (crop rotation) is **hardcoded page copy**. It was still showing
  "no tours until 1 September" two weeks after that date passed.
- Tours run in **five languages: Dutch, English, German, Japanese, Chinese**.
- Guides are largely **volunteers**. Availability is irregular and language coverage
  is the binding constraint on which groups can be accepted.
- No booking system, no CRM, no online payment. Bank transfer and manual invoicing.

---

## 2. Existing technical environment

Verified by us from public responses on 14 September 2026. **The client has separately
confirmed: "website is built in C# op het .NET-framework, met Umbraco als CMS."**

| Layer | Finding | Confidence |
|---|---|---|
| CMS | **Umbraco 13 LTS** | High — `/umbraco/login` serves the Bellissima/Lit backoffice; `uSync 13.3.2` asset present |
| Framework | **ASP.NET Core on .NET 8** (Umbraco 13's target) | High — but see Q1 below |
| Web server | **Kestrel** behind **Phusion Passenger 6.1.2**, **Plesk on Linux** | High — response headers |
| Media | ImageSharp.Web (`?width=`, `?rxy=` focal point) | High |
| Packages | uSync 13.3.2, SEO Toolkit, `PanoramaStudios.Custom` | High |
| Frontend | webpack bundle, vanilla JS, GSAP 3.12.5 + ScrollTrigger, Swiper, lightGallery 2.7.2, self-hosted Nunito. **No SPA framework** | High |
| Scale | 373 URLs, NL/EN with hreflang | High |
| Analytics | GTM `GTM-NRDKKVZ`, **no consent gate** | High |

**Q1 — resolve before finalising your estimate.** The client said ".NET-framework",
which in Dutch usage often just means ".NET". Our evidence (Kestrel, Umbraco 13,
Linux) points firmly to **.NET 8**. If it were legacy .NET Framework 4.x it could not
be Umbraco 13 on Linux. **State which you assumed.** If you need certainty before
quoting, flag it and we will get it in writing.

**Incumbent agency:** Panorama Studios (Naaldwijk) built and maintain the site. They
are friends of the client and are **not being replaced**. Assume:
- We may get **no repository access and no deploy rights**.
- Any change to their Razor templates is a **request to a third party**, with their
  lead time, not a task on your board.
- Design tokens/CSS may have to be replicated by us rather than imported.

---

## 3. Architecture — the decision we want your opinion on

### Option A — Umbraco package, in-process
Ship as an Umbraco 13 package: document types, surface/API controllers, custom
backoffice sections, EF Core against their existing database.

- **Pros:** single deployment; staff manage everything in the backoffice they know;
  no CORS; no extra hosting; native Umbraco Members for partner auth.
- **Cons:** couples our release cycle to Panorama's; needs repo + pipeline + prod
  access we may never get; **their Plesk/Passenger host may not tolerate the added
  load**; upgrade risk when they move to Umbraco 14+ (new backoffice, breaking).

### Option B — Standalone service + thin embed ✅ *our current assumption*
Separate service on our infrastructure. The Umbraco pages embed a widget (script +
mount div, or iframe). Content pulled read-only from **Umbraco Content Delivery API**
if needed.

- **Pros:** we own stack, release cadence and quality; zero dependency on Panorama
  beyond a one-time snippet placement; reusable for other clients; survives their
  Umbraco upgrades.
- **Cons:** separate auth; separate hosting cost; styling matched by hand; weaker SEO
  on booking pages; CORS and cookie/SameSite handling if we use an iframe.

**Tell us which you would build and why.** If you are a .NET shop, Option A may be
cheaper for you than we assume — say so. If you would rather build Option B in .NET
than in Node, that is fine; we have no stack preference, only a quality and
maintainability preference.

**Our default if you have no strong view:** Option B, .NET 8 Web API + PostgreSQL,
frontend as a small embeddable bundle (Preact/vanilla, no heavy SPA — it must load
inside a page that already ships GSAP and Swiper).

---

## 4. Domain model (indicative — challenge it)

```
TourProduct        id, code, name{i18n}, durationMin, minGroup, maxGroup,
                   basePrice, pricePerPerson, languages[], active, audienceType
TourVariant        id, tourProductId, name{i18n}, feeBand (PO|VO|MBO|HBO|WO|CORP|PRIVATE),
                   priceOverride
ScheduleRule       id, tourProductId, weekday, startTime, capacity, validFrom, validTo
ClosurePeriod      id, startDate, endDate, reasonCode, message{i18n}, blocksBooking
TimeSlot           id, tourProductId, startsAtUtc, localDate, capacityTotal,
                   capacityHeld, capacityBooked, status   -- generated from ScheduleRule
Booking            id, reference, timeSlotId, tourVariantId, groupSize, language,
                   status (HELD|CONFIRMED|CANCELLED|COMPLETED|NO_SHOW),
                   contactId, partnerId?, totalAmount, paymentStatus,
                   createdAt, cancelledAt, cancellationReason
BookingAddon       id, bookingId, addonId, qty, unitPrice
Addon              id, code, name{i18n}, price        -- e.g. expert session €75, extra topic €50
Contact            id, name, email, phone, orgName, orgType, locale,
                   consentMarketing, createdAt
Guide              id, name, email, languages[] (with proficiency), active
GuideAvailability  id, guideId, date, startTime, endTime, source (MANUAL|RECURRING)
GuideAssignment    id, bookingId, guideId, assignedAt, assignedBy, status
Waitlist           id, timeSlotId, contactId, groupSize, position, offeredAt,
                   claimExpiresAt, status
ProtocolSignoff    id, bookingId, signedByName, signedAt, ipAddress, protocolVersion
Partner            id, name, tier (PARTNER|FRIEND|AMBASSADOR), contractStart,
                   contractEnd, annualFee, allocationGroups
PartnerAsset       id, partnerId, type, fileRef, status (PENDING|APPROVED|REJECTED)
PartnerReport      id, partnerId, periodStart, periodEnd, metricsJson, generatedAt
Payment            id, bookingId, provider, providerRef, amount, currency,
                   status, idempotencyKey, rawPayloadRef
AuditEvent         id, entityType, entityId, action, actorType, actorId, at, diffJson
```

**Note on `{i18n}`:** five languages including **Japanese and Chinese**. Decide early
whether translations live in your DB, in Umbraco (variant content), or in resource
files. CJK affects font stacks, string widths, and date/number formatting. **Do not
treat this as an afterthought — it is in scope from module 1.**

---

## 5. Modules to estimate

### M1 — Automated enquiry form
*Client price band €2,400–3,300. Ships first, possibly alone.*

**Functional**
1. Public form: tour product, two preferred dates, group size, **required language**,
   audience type (school PO/VO/MBO-HBO-WO / corporate / international / private),
   school level + pupil count (conditional), dietary, accessibility, contact
   name/org/email/phone, free-text notes.
2. Conditional field logic; education fields only for school audiences.
3. Validation incl. configurable lead-time rule (no request within N days).
4. **Structured, consistently ordered notification email** to the office.
5. **Auto-acknowledgement to enquirer** in their language, with practical info,
   hygiene protocol, parking, duration. Templates editable by non-technical staff.
6. Every submission persisted and exportable (CSV/API) — *this becomes the baseline
   dataset and later the booking intake.*
7. Closure periods suppress the form and show the correct message, with a
   "notify me when tours resume" capture.
8. Spam protection: honeypot + rate limit + optional Turnstile. **No CAPTCHA.**
9. NL/EN at minimum; structure for five.

**Acceptance:** a submission produces a correctly formatted email, a stored record,
and a language-correct auto-reply within 60s. Adding a closure period through admin
changes live behaviour and expires automatically with no human action.

---

### M2 — Online booking system
*Client price band €6,500–9,500. The core. Ships with M3's notifications.*

**Functional**
1. Slot generation from `ScheduleRule` + `ClosurePeriod`, not hand-entered dates.
2. Public flow: product → month view → slot → group size → language → variant/fee band
   → contact → confirm.
3. **Hold-then-confirm**: a 10-minute reservation on slot selection, released on
   expiry.
4. Capacity enforcement per slot and per day.
5. **Guide language matching (hard requirement):** a slot is only offered if a guide
   covering the requested language is available. This is the requirement off-the-shelf
   booking products fail and the main reason we are building.
6. Auto-assignment of guide on confirmation; manual reassignment in admin.
7. Booking reference generation; confirmation page; `.ics` attachment.
8. **Admin console:** week/month view, booking detail, create/amend/cancel on behalf,
   capacity override, search, CSV export, roles (admin / office / guide).
9. Embeddable on the Umbraco page, styled to match Panorama's design.

**Non-functional — read carefully**
- **Concurrency is the one thing that must not fail.** Two users booking the last
  seat simultaneously must produce exactly one booking. Specify your approach: row
  locking, advisory locks, optimistic concurrency + retry, or a transactional hold
  table. **We want a load test demonstrating this in your quote.**
- Timezone: store UTC, render in the visitor's timezone, operate in Europe/Amsterdam.
  Watch DST transitions on slot generation.
- Volume is low (hundreds of bookings/month). **Do not over-engineer.** No Kubernetes,
  no microservices, no event sourcing. A well-structured monolith is correct here.

**Acceptance:** documented load test proving no double-booking under concurrent
contention. A German-language request never sees a date with no German-speaking guide.

---

### M3 — Notifications, self-service rebooking & waitlist
*Client price band €2,700–4,500. M3a notifications ship with M2.*

1. Confirmation email + `.ics`; reminders at configurable offsets (default T-3d, T-1d).
2. Staff notification on every create / amend / cancel.
3. Bilingual→pentalingual editable templates; delivery logging; bounce handling; retry
   with backoff. **Failures must be visible in admin, never silent.**
4. **Self-service reschedule and cancel via signed tokenised link, no login.**
   - HMAC-signed, **single-use, expiring**, scoped to one booking.
   - **This is the most likely place to leak another customer's data. Treat token
     design as a security deliverable, not a convenience feature.** State your scheme.
5. Cancellation policy windows, configurable per product.
6. **Waitlist:** join full slots; ordered queue; on cancellation auto-offer to next
   with a claim window (default 24h); auto-expire and roll on; notify when exhausted;
   admin override.
7. **Digital hygiene protocol sign-off** with reminder if unsigned 48h before visit;
   immutable record (name, org, timestamp, IP, protocol version).

**Acceptance:** a cancellation results in a filled slot with zero staff action. A
token cannot be replayed, guessed, or used after expiry.

---

### M4 — Online payments & invoicing
*Client price band €2,800–4,200.*

1. **Mollie integration — iDEAL is mandatory** for the Dutch market. Cards secondary.
   Stripe only as fallback; do not propose Stripe-only.
2. Deposit or full payment, configurable per product.
3. **Invoice-on-account** for schools and corporates (they will not pay up front).
4. **Webhook handling must be idempotent.** Duplicate or out-of-order webhooks must
   not double-charge, double-refund, or double-confirm. Persist raw payloads.
5. Refunds aligned to cancellation policy windows.
6. Add-ons sold in the booking flow (expert session €75, extra topic €50).
7. Export to their accounting package.

**Open — blocks final numbers:** accounting package unknown (Moneybird / e-Boekhouden
/ Exact are the likely candidates) and **VAT treatment for a stichting is unconfirmed**.
Dutch foundations often have specific rules. **Estimate with a stated assumption and
flag it.**

**Acceptance:** replaying the same webhook 10x produces one payment state change.

---

### M5 — Partner portal & yearly reports
*Client price band €4,500–7,000.*

1. Partner authentication (30–50 users — use the cheapest sane option).
2. Partner manages own profile, logo, materials; upload with type/size validation.
3. **Approval workflow** — nothing publishes to the public site unmoderated.
4. Tier-aware entitlements (Partner / Friend / Ambassador).
5. Publish approved assets to the Umbraco site — **via Content Delivery API, scheduled
   export, or a webhook Panorama consume. Propose an approach; this needs their
   agreement, so keep the coupling minimal.**
6. **Annual partner report**, generated and delivered before renewal date:
   visitors past their installation, origin countries, segments, groups they hosted.
   Web page + PDF. Scheduled generation.
7. Partner-hosted group booking flow with allocation tracking per tier.

**Note:** report metrics derive from M2 booking data. If M5 is sold before M2 exists,
it runs on manually imported data — **support a CSV import path** so the module is not
dead without M2.

---

### M6 — Paid virtual tour & live field-lab data
*Client price band €5,500–9,000. Most uncertain — qualify before committing.*

1. Paid, bookable, access-controlled virtual tour. Multilingual. No capacity ceiling.
2. Video and interactive content delivery; DRM not required, but access must be
   time-boxed and non-shareable-in-bulk.
3. Payment via M4.
4. **Live greenhouse/climate/sensor data** surfaced in the tour and on on-site screens.

**Blocking question:** we do not know whether the field lab exposes any API, or what
protocol (MQTT? Modbus? a vendor cloud? nothing?). **Estimate the virtual tour
assuming no live data, and price live-data integration separately as a T&M
allowance.** Do not give a fixed price for an integration against an unknown system.

---

### M7 — Support & maintenance
*Client price band €250–500/month.*

Hosting, monitoring, alerting, backups with tested restore, dependency and security
patching, small changes, **90 days of post-launch tuning included** after each module
goes live. Propose SLA tiers. Our client-facing promise is **a reply within 4 hours**
in business hours — tell us what that costs and whether you can staff it across the
timezone gap (CET vs WIB).

---

## 6. Cross-cutting requirements — apply to every module

### Internationalisation
Five languages incl. **Japanese and Chinese**. All customer-facing strings, emails,
PDFs and dates. Right-sizing for CJK. Locale-correct date/number/currency formatting.
Translation workflow must not require a developer.

### GDPR / AVG — not negotiable
- **School groups mean children's personal data.** Explicit consent, documented
  retention, no image or story capture without recorded permission.
- EU-region hosting and EU-region backups.
- Data minimisation; documented retention and deletion schedule; subject access and
  erasure supported.
- **DPA between Astra and Amwisesa required before any production personal data is
  touched.** Flag if you need one drafted.
- Note: processing from outside the EEA requires appropriate safeguards. **Tell us
  where your team and your infrastructure sit.**

### Security
- OWASP ASVS L2 as baseline.
- Signed, expiring, single-use tokens for all no-login flows.
- Webhook signature verification + idempotency keys.
- Secrets in a managed store, never in the repo.
- Rate limiting on all public endpoints.
- Full audit trail on every booking and payment mutation.
- Dependency scanning in CI.

### Quality & delivery
- Environments: dev, **staging**, production. Staging is required — the client will
  review there.
- CI/CD with automated tests gating deploys.
- Unit + integration tests; **E2E on the booking happy path and the concurrency case**.
- Structured logging, error tracking, uptime monitoring with alerting.
- Handover: architecture docs, runbook, ADRs for significant decisions.
- **Code and IP belong to Astra.** Confirm you accept this.

### Accessibility & performance
- WCAG 2.1 AA on public flows. The client is a public-facing foundation.
- The embed loads into a page already carrying GSAP, Swiper and lightGallery.
  **Keep the bundle small and avoid framework duplication.**

---

## 7. What we do not know yet

These are unresolved with the client. **Estimate with stated assumptions; do not wait.**

| # | Unknown | Affects |
|---|---|---|
| 1 | Tours per month by type; seasonal profile | Whether M2 is justified at all |
| 2 | Hours/week on booking coordination | Business case, not your estimate |
| 3 | Cancellation and no-show rate | M3 waitlist value |
| 4 | Accounting package + VAT treatment | M4 |
| 5 | Field-lab data API — exists? protocol? | M6 |
| 6 | Guide count and language coverage | M2 |
| 7 | Partner count, fee, tier entitlements | M5 |
| 8 | **Will Panorama place an embed snippet?** | **M1, M2 — everything** |
| 9 | Repo / staging / deploy access | Option A feasibility |
| 10 | Confirmation of .NET 8 vs .NET Framework | Option A feasibility |

---

## 8. Estimation format we want back

Per module: effort (BE/FE/QA/DevOps/PM days), duration, cost, assumptions, risks,
dependencies. Then overall: team composition, parallelisation plan, critical path,
and your **Option A vs B recommendation with reasoning**.

Also tell us honestly:
- Which module you consider **highest risk**, and why.
- Anything here you think we have **over-specified or should cut**.
- Anything you would **do differently** — we would rather be argued with now than
  discover it in build.

**Deadline:** a first-pass range within one week is more useful to us than a precise
number in three. We are quoting a client who has not yet approved anything.
