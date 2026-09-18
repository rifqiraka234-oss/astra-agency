# Tomatoworld — Technical Specification & Estimation Request
**To:** Amwisesa engineering · **From:** Astra Agency · **v2, 18 September 2026**
**Return:** effort in developer-days per module, assumptions, risks, architecture recommendation

> **No commercial figures appear in this document, by design.** Estimate from the
> engineering work required. Pricing to the end client is handled separately by Astra.

---

# PART 1 — WHO THE CLIENT IS

## 1.1 The organisation

**Tomatoworld** (tomatoworld.nl) sits in Honselersdijk, in the **Westland** region of
the Netherlands — the densest concentration of high-tech greenhouse horticulture in
the world. It began in 2007 and has been an independent **stichting** (Dutch
non-profit foundation) since 2010.

It is two things at once:

1. **An experience centre.** Visitors take guided tours through a working, high-tech
   greenhouse and learn how the Netherlands — a small country — became the world's
   second-largest agricultural exporter. Thousands of visitors a year, from all over
   the world.
2. **A field lab.** High-tech companies, startups and universities test real
   technology in a live tomato crop: 5G, IoT sensors, autonomous growing systems,
   harvesting robots, AI-driven climate control.

## 1.2 Why it exists — the detail that explains the whole business

**Commercial greenhouses in the Netherlands cannot accept visitors.** Plant viruses
spread easily, and a visitor who walked through another grower's farm yesterday can
destroy a crop worth millions. Growers cannot take that risk.

**Tomatoworld can**, because it does not live off selling tomatoes. It lives off
telling the story. Visitors still pass through a hygiene protocol, but the door is
open.

That is the moat. It is the only place where an international delegation can actually
walk into a working Dutch greenhouse. **Understand this and the rest of the system
makes sense** — biosecurity sign-off, guide languages, group logistics, partner
visibility.

## 1.3 How money comes in

| Source | Mechanics |
|---|---|
| **Partner fees** | 30+ companies (Koppert, Rijk Zwaan and similar) pay annually. They get their logo and equipment visible in the greenhouse, they can test products in a live crop, and **they bring their own customers through on tours**. This is the largest income line. |
| **Guided tours** | Priced per tour plus per person. Products include general tours, education tiers (primary / secondary / vocational / university, each with its own fee band), themed tours, and an online tour. |
| **Space rental** | Expo space and field lab space, with separate terms. *Out of scope now — design so it can be added later without rework.* |
| **Specialist booking** | A third bookable product. Same note. |

## 1.4 How it operates today

- One long web form → an email inbox → **manual coordination by one person**.
- Every cancellation triggers a manual chain of emails.
- **Seasonal closure (crop rotation) is hardcoded text on the page.** When we checked
  on 15 September, the page still read "NO GUIDED TOURS AVAILABLE UNTIL 1 SEPTEMBER
  2026" — two weeks stale, telling every visitor they were closed.
- Tours run in **five languages: Dutch, English, German, Japanese, Chinese**.
- **Guides are mostly volunteers**, often retired. Availability is irregular.
  **Language coverage is the hard constraint** on which groups can be accepted at all.
- No booking system, no CRM, no online payment. Bank transfer and hand-made invoices.
- Partners receive **no report** of what their fee bought them. Renewals rest on
  goodwill.

## 1.5 People you may hear named

| Name | Role |
|---|---|
| **Aart** | Leads the organisation and owns partner relationships. Cares about income and renewals. |
| **Joyce** | Day-to-day operations, including bookings. The person whose workload this project removes. |
| **Ank** | Retired communications professional, volunteer guide. Our champion inside the organisation. Not technical. |
| **Panorama Studios** | Incumbent web agency in Naaldwijk. Built and maintain the site. **Friends of the client. They are not being replaced.** |

## 1.6 What Astra is delivering vs what we need from you

| Astra (Netherlands) | Amwisesa (Indonesia) |
|---|---|
| Discovery, requirements, clickable prototype | **All seven modules in Part 3** |
| Client relationship, project management | Architecture, implementation, testing |
| Branding, story, social media | Deployment, monitoring, support |
| Website restructure and redesign | |

---

# PART 2 — TECHNICAL ENVIRONMENT

## 2.1 Verified findings

Gathered from public HTTP responses, 14–15 September 2026. The client separately
confirmed: *"website is built in C# op het .NET-framework, met Umbraco als CMS."*

| Layer | Finding | Evidence |
|---|---|---|
| CMS | **Umbraco 13 LTS** | `/umbraco` → `/umbraco/login`, Bellissima backoffice (Lit web components, `uui-css`); `/App_Plugins/uSync/usync.13.3.2.min.css` |
| Runtime | **ASP.NET Core, .NET 8** | Umbraco 13's target framework; see Q1 |
| Web tier | **Kestrel** behind **Phusion Passenger 6.1.2**, **Plesk on Linux** | `server:` and `x-powered-by:` headers |
| Media | ImageSharp.Web | `/media/{guid}/file.jpg?width=&height=&rxy=&v=` |
| Packages | uSync 13.3.2, SEO Toolkit, `PanoramaStudios.Custom` | `/App_Plugins/` asset paths |
| Frontend | webpack bundle, **vanilla JS**, GSAP 3.12.5 + ScrollTrigger + Observer, Swiper, lightGallery 2.7.2, self-hosted Nunito. **No SPA framework, no jQuery** | bundle LICENSE manifest |
| Scale | 373 URLs, NL/EN with `hreflang` | sitemap.xml |
| Analytics | GTM `GTM-NRDKKVZ`, **loading without a consent gate** | page source |
| Security headers | `Permissions-Policy`, `Referrer-Policy: no-referrer`, `X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff` | response headers |

> ⚠️ **`X-Frame-Options: SAMEORIGIN` is set.** If you propose an iframe embed served
> from our domain, **it will be blocked**. Either they relax it to
> `frame-ancestors` via CSP for our origin, or we use a script-mount embed. **Account
> for this in your approach.**

## 2.2 Q1 — resolve before finalising

The client said ".NET-framework". In Dutch usage that usually just means ".NET".
Legacy .NET Framework 4.x **cannot run Umbraco 13 on Linux**, and the headers show
Linux + Kestrel. Our conclusion is **.NET 8**. **State which you assumed.**

## 2.3 Constraints imposed by the incumbent agency

Panorama Studios are not being displaced. Assume:
- **No repository access, no deploy rights, no database access.**
- Any Razor template change is a **third-party request** on their timeline.
- Design tokens/CSS likely replicated by us, not imported.
- They run uSync, so they have dev → staging → prod. We are not in that pipeline.

---

# PART 3 — ARCHITECTURE

## 3.1 Option A — Umbraco package (in-process)

Umbraco 13 package: document types, `SurfaceController` / `UmbracoApiController`
endpoints, custom backoffice section, EF Core migrations against their database,
`App_Plugins` for backoffice UI.

**Pros:** one deployment; native Umbraco Members for partner auth; no CORS; staff use
the backoffice they know; no additional hosting.
**Cons:** our release cycle couples to Panorama's; requires repo + pipeline + prod
access we may never get; **their Plesk/Passenger host may not have headroom**; hard
upgrade risk at Umbraco 14+ (backoffice rewritten, breaking); their DB becomes our
dependency.

## 3.2 Option B — Standalone service + embed ✅ *our working assumption*

Independent service on our infrastructure. Umbraco pages mount a widget. Content read
from **Umbraco Content Delivery API** (available in v12+) where needed.

**Pros:** we own stack, release cadence, quality gates; one-time snippet placement is
the only Panorama dependency; survives their upgrades; reusable for other clients.
**Cons:** separate auth; separate hosting; hand-matched styling; weaker SEO for
booking pages; CORS, CSP and cookie `SameSite` handling.

### Embed mechanics to specify in your proposal
- **Script-mount** (`<script src>` + target `<div>`) — preferred. No `X-Frame-Options`
  problem. Needs CSP `script-src` allowance from Panorama, style isolation (Shadow
  DOM or strict prefixing), and must not collide with GSAP/Swiper already on the page.
- **iframe** — simpler isolation, but blocked by their current `X-Frame-Options` and
  awkward for height, deep links and payment redirects.
- **Cookies:** third-party context. Use `SameSite=None; Secure`, or avoid cookies
  entirely with token-in-URL + short-lived session in `sessionStorage`.

**Give us your recommendation with reasoning.** If Amwisesa are primarily a .NET shop,
Option A may be cheaper for you than we assume — say so. Option B in .NET is equally
acceptable; we have no stack preference, only a maintainability preference.

**Our default if you have no strong view:** Option B, .NET 8 Web API + PostgreSQL,
embed as a small Preact or vanilla bundle.

---

# PART 4 — DOMAIN MODEL

```
TourProduct       id, code, name{i18n}, description{i18n}, durationMin,
                  minGroup, maxGroup, basePrice, pricePerPerson,
                  supportedLanguages[], audienceTypes[], leadTimeDays, active
TourVariant       id, tourProductId, name{i18n},
                  feeBand (PO|VO|MBO|HBO|WO|CORPORATE|PRIVATE|INTERNATIONAL),
                  priceOverride, pricePerPersonOverride
Addon             id, code, name{i18n}, price, appliesToProducts[]
ScheduleRule      id, tourProductId, weekday, startTimeLocal, capacity,
                  validFrom, validTo, active
ClosurePeriod     id, startDate, endDate, reasonCode, message{i18n}, blocksBooking
TimeSlot          id, tourProductId, startsAtUtc, localDate, localTime,
                  capacityTotal, capacityHeld, capacityConfirmed,
                  status (OPEN|FULL|CLOSED|CANCELLED)
Booking           id, reference, timeSlotId, tourVariantId, groupSize,
                  requestedLanguage, status, contactId, partnerId?,
                  subtotal, addonTotal, vatAmount, total, currency,
                  paymentStatus, source, createdAt, confirmedAt,
                  cancelledAt, cancellationReason, version
BookingAddon      id, bookingId, addonId, quantity, unitPrice
Contact           id, name, email, emailNormalised, phone, orgName, orgType,
                  locale, country, consentMarketing, consentAt, createdAt
Guide             id, name, email, phone, active
GuideLanguage     guideId, languageCode, proficiency (NATIVE|FLUENT|BASIC)
GuideAvailability id, guideId, date, startTimeLocal, endTimeLocal,
                  source (MANUAL|RECURRING|IMPORTED)
GuideAssignment   id, bookingId, guideId, assignedAt, assignedBy, status
Waitlist          id, timeSlotId, contactId, groupSize, position,
                  offeredAt, claimExpiresAt, status
ProtocolSignoff   id, bookingId, signedByName, signedAt, ipAddress,
                  userAgent, protocolVersion
Partner           id, name, tier (PARTNER|FRIEND|AMBASSADOR),
                  contractStart, contractEnd, allocationGroupsPerYear, active
PartnerUser       id, partnerId, email, role
PartnerAsset      id, partnerId, type, storageRef, mimeType, bytes,
                  status (PENDING|APPROVED|REJECTED), reviewedBy, reviewedAt
PartnerReport     id, partnerId, periodStart, periodEnd, metricsJson,
                  generatedAt, deliveredAt, pdfRef
Payment           id, bookingId, provider, providerRef, amount, currency,
                  status, idempotencyKey, rawPayloadRef, createdAt
Refund            id, paymentId, amount, reason, providerRef, status
NotificationLog   id, bookingId?, template, locale, toEmail, status,
                  providerMessageId, attempts, lastError, sentAt
AuditEvent        id, entityType, entityId, action, actorType, actorId,
                  at, diffJson, requestId
```

## 4.1 Booking state machine

```
DRAFT ──► HELD ──────► CONFIRMED ──► COMPLETED
            │              │  │
            │              │  └────► NO_SHOW
            ▼              ▼
        EXPIRED        CANCELLED ──► REFUNDED
```
- `HELD` carries a TTL (default 10 min). Expiry releases `capacityHeld`.
- `CONFIRMED` requires payment settled **or** an approved invoice-on-account.
- `CANCELLED` triggers waitlist evaluation.
- **Every transition writes an `AuditEvent`.**

## 4.2 `{i18n}` strategy — decide early

Five languages including **Japanese and Chinese**. Options: JSONB column per
translatable field; a side translation table; or resource files with DB overrides.
Must be editable **without a developer**. CJK affects font stacks, string width
assumptions, and line breaking. **In scope from module 1, not a later pass.**

---

# PART 5 — MODULES

## M1 — Automated enquiry form

**FR**
1. Public form: product, two preferred dates, group size, **required language**,
   audience type, school level + pupil count (conditional), dietary, accessibility,
   contact name/org/email/phone, notes.
2. Conditional field logic driven by `audienceType`.
3. Server-side validation incl. configurable lead-time rule.
4. Structured notification email, deterministic field order.
5. **Locale-correct auto-acknowledgement** with practical info + hygiene protocol.
   Templates editable by non-technical staff.
6. All submissions persisted; CSV/API export. **This becomes the booking intake in M2
   — model it as `Contact` + a pre-booking `Enquiry` entity, not a throwaway form log.**
7. `ClosurePeriod` suppresses submission and shows the correct message, with a
   "notify me when tours resume" capture.
8. Anti-spam: honeypot + per-IP rate limit + optional Turnstile. **No CAPTCHA.**

**NFR:** idempotent submission (double-click must not create two records — use a
client-generated request id). Bot traffic must not fill the dataset.

**Acceptance:** submission → correct email + stored record + locale-correct auto-reply
within 60s. A closure added in admin changes live behaviour and expires automatically.

---

## M2 — Online booking system

**FR**
1. Slot generation from `ScheduleRule` ∖ `ClosurePeriod`. **Specify whether you
   materialise `TimeSlot` rows (cron//job, easier locking) or compute on read
   (no drift, harder concurrency). We lean materialised.**
2. Flow: product → month availability → slot → group size → language → variant →
   contact → confirm.
3. **Hold-then-confirm**, TTL ~10 min, released on expiry by a background job.
4. Capacity enforced per slot and per day.
5. **Guide language matching — hard requirement.** A slot is offered only if a guide
   with the requested language is available for it. *This is the requirement
   off-the-shelf booking products fail, and the main reason we are building rather
   than buying.*
6. Guide auto-assignment on confirm; manual reassignment in admin.
7. Booking reference; confirmation page; `.ics`.
8. **Admin console:** week/month view, detail, create/amend/cancel on behalf,
   capacity override, search, CSV export, RBAC (admin / office / guide).
9. Embeddable, styled to Panorama's design.

**NFR — concurrency, the critical path**

> Two requests for the last seat must yield exactly one booking.

State your approach explicitly:
- `SELECT … FOR UPDATE` on the `TimeSlot` row inside the transaction, or
- Postgres advisory lock keyed on slot id, or
- optimistic concurrency via a `version` column with bounded retry, or
- a transactional hold table with a unique constraint.

**We want an automated concurrency test in the deliverable**, not a manual check.
Include it in your estimate.

**NFR — time**
Store UTC, operate `Europe/Amsterdam`, render in visitor locale. **DST transitions
must not duplicate or drop slots** — include a test across the March and October
changes.

**NFR — scale**
Hundreds of bookings/month. **Deliberately do not over-engineer.** No Kubernetes, no
microservices, no event sourcing, no CQRS. A well-structured modular monolith with
clean boundaries is the correct answer, and we will read the proposal sceptically if
it argues otherwise.

**Indexing:** `TimeSlot(tourProductId, startsAtUtc)`, `Booking(timeSlotId, status)`,
`Booking(reference)` unique, `GuideAvailability(guideId, date)`,
`Contact(emailNormalised)`.

**Acceptance:** documented concurrency test passing; a German request never sees a
slot with no German-speaking guide.

---

## M3 — Notifications, self-service rebooking & waitlist

**FR**
1. Confirmation + `.ics`; reminders at configurable offsets (default T−3d, T−1d).
2. Staff notification on every create/amend/cancel.
3. Templates in five locales, editable by staff; delivery logging; bounce/complaint
   webhooks; retry with exponential backoff. **Failures visible in admin, never
   silent.**
4. **Self-service reschedule/cancel via signed link, no login.** Specify your scheme.
   Our expectation:
   - HMAC-SHA256 over `{bookingId, action, exp, nonce}` with a rotatable server secret
   - **short TTL, single-use** (nonce burned server-side on first use)
   - scoped to one booking and one action
   - constant-time comparison; no PII in the URL
   > **This is the single most likely place to leak another customer's booking. Treat
   > token design as a security deliverable with its own test cases.**
5. Cancellation policy windows, configurable per product.
6. **Waitlist:** join full slots; FIFO queue; on cancellation auto-offer to next with
   a claim window (default 24h); auto-expire and roll on; notify when exhausted;
   admin override. **Offers must be transactional — two waitlisted parties must not
   both be able to claim the same freed seat.**
7. **Digital hygiene protocol sign-off**: link post-confirmation, reminder if unsigned
   48h before visit, immutable record (name, org, timestamp, IP, UA, protocol
   version), admin view of who has not signed.

**Acceptance:** cancellation refills a slot with zero staff action; a token cannot be
replayed, guessed, or used after expiry — proven by test.

---

## M4 — Online payments & invoicing

**FR**
1. **Mollie. iDEAL is mandatory** for the Dutch market — the majority of Dutch
   consumer and school payments run through it. Cards secondary. **Do not propose
   Stripe-only.**
2. Deposit or full payment, configurable per product.
3. **Invoice-on-account** for schools and corporates — they will not pay up front.
4. **Webhook idempotency.** Mollie may deliver duplicates and out-of-order events.
   Persist raw payloads, dedupe on provider event id, make state transitions
   idempotent. **Replaying a webhook 10× must produce one state change.**
5. Refunds aligned to cancellation windows; partial refunds supported.
6. Add-ons priced in the booking flow.
7. Export to their accounting package.
8. **Never trust client-side amounts.** Recompute server-side from product, group
   size, variant and add-ons before creating the payment.

**Open — estimate with a stated assumption:** accounting package unknown (Moneybird,
e-Boekhouden, Exact are likely) and **VAT treatment for a stichting is unconfirmed**
(Dutch foundations can have exemptions or mixed rates). Model VAT as configurable per
product rather than hardcoded.

**Acceptance:** replay test passes; no path exists where a client-supplied amount
reaches the provider.

---

## M5 — Partner portal & yearly reports

**FR**
1. Partner auth, ~30–50 users. Cheapest sane option; MFA optional.
2. Self-service profile, logo and materials; upload with MIME sniffing (not extension
   trust), size limits, image re-encoding to strip EXIF/payloads.
3. **Approval workflow** — nothing reaches the public site unmoderated.
4. Tier-aware entitlements (`PARTNER` / `FRIEND` / `AMBASSADOR`).
5. Publishing approved assets to the Umbraco site — **propose an approach**: Content
   Delivery API write-back, scheduled export, or a webhook Panorama consume. **Keep
   coupling minimal; this needs their agreement.**
6. **Annual partner report**: visitors past their installation, origin countries,
   segments, groups they hosted. Web + PDF. Scheduled ahead of renewal date.
7. Partner-hosted group booking with per-tier allocation tracking.

**Dependency:** metrics derive from M2 data. **Support a CSV import path** so M5 is
not dead if sold before M2.

---

## M6 — Paid virtual tour & live field-lab data

**FR**
1. Paid, bookable, access-controlled virtual tour. Multilingual. No capacity ceiling.
2. Time-boxed, non-transferable access. Signed URLs. DRM not required.
3. Payment via M4.
4. Live greenhouse/climate/sensor data surfaced in the tour and on on-site screens.

> **Blocking unknown:** we do not know whether the field lab exposes any API, or by
> what protocol (MQTT? Modbus? OPC-UA? a vendor cloud? nothing at all?).
> **Estimate the virtual tour assuming no live data. Price live-data integration
> separately as a time-and-materials allowance.** Do not give a fixed figure for an
> integration against an unknown system — we will not hold you to one.

---

## M7 — Support & maintenance

Hosting, monitoring, alerting, **backups with a tested restore procedure**, dependency
and security patching, small changes, **90 days of post-launch tuning included** after
each module ships. Propose SLA tiers.

Our client-facing promise is **a reply within 4 working hours**. Tell us what that
costs and whether you can staff it across the **CET ↔ WIB** gap (6 hours in winter,
5 in summer).

---

# PART 6 — CROSS-CUTTING

## 6.1 Internationalisation
Five languages incl. **Japanese and Chinese** across UI, emails, PDFs and documents.
Locale-correct dates, numbers, currency. CJK font stacks and line breaking.
Translation workflow must not require a developer.

## 6.2 GDPR / AVG — not negotiable
- **School groups mean children's personal data.** Explicit consent, documented
  retention, no image or story capture without recorded permission.
- **EU-region hosting and EU-region backups.**
- Data minimisation; documented retention and deletion schedule; subject access and
  erasure supported.
- **A DPA between Astra and Amwisesa is required before any production personal data
  is processed.** Processing from outside the EEA needs appropriate safeguards —
  **tell us where your team and your infrastructure sit.**
- Consent logging for analytics; their GTM currently fires without a gate.

## 6.3 Security
- OWASP ASVS L2 baseline.
- Signed, expiring, single-use tokens on every no-login flow.
- Webhook signature verification + idempotency keys.
- Secrets in a managed store; never in the repo; rotatable.
- Rate limiting on all public endpoints.
- Full audit trail on booking and payment mutations.
- Dependency and container scanning in CI.
- File uploads: MIME sniffing, size caps, re-encoding, served from a separate origin.

## 6.4 Quality & delivery
- Environments: dev, **staging** (client reviews here), production.
- CI/CD with tests gating deploys; migrations automated and reversible.
- Unit + integration tests; **E2E on the booking happy path, the concurrency case and
  the token-replay case**.
- Structured logging with request ids; error tracking; uptime monitoring and alerting.
- Handover: architecture docs, runbook, ADRs for significant decisions.
- **Code and IP belong to Astra.** Please confirm you accept this.

## 6.5 Accessibility & performance
- **WCAG 2.1 AA** on public flows — the client is a public-facing foundation.
- The embed loads into a page already carrying GSAP, Swiper and lightGallery.
  **Keep the bundle small; do not duplicate a framework onto the page.**
- Booking flow usable on mobile; many visitors book from phones abroad.

---

# PART 7 — OPEN QUESTIONS

Unresolved with the client. **Estimate with stated assumptions; do not wait.**

| # | Unknown | Blocks |
|---|---|---|
| 1 | Tours per month by type; seasonal profile | Whether M2 is justified at all |
| 2 | Cancellation and no-show rate | M3 waitlist design |
| 3 | Accounting package and VAT treatment for a stichting | M4 |
| 4 | Field-lab data API — exists? protocol? | M6 |
| 5 | Guide count and language coverage | M2 |
| 6 | Partner count and tier entitlements | M5 |
| 7 | **Will Panorama place an embed snippet and relax CSP?** | **M1, M2 — everything** |
| 8 | Repo / staging / deploy access | Option A feasibility |
| 9 | .NET 8 vs .NET Framework confirmation | Option A feasibility |
| 10 | Existing CRM or shared calendar | M2 admin scope |

---

# PART 8 — WHAT TO SEND BACK

**Per module:** effort in developer-days split BE / FE / QA / DevOps / PM; duration at
your proposed team size; assumptions; risks with mitigations; dependencies.

**Overall:** team composition; parallelisation plan; critical path; **your Option A vs
B recommendation with reasoning**.

**And please tell us honestly:**
- Which module is **highest risk**, and why.
- What we have **over-specified** or should cut.
- What you would **do differently**. We would rather be argued with now than discover
  it in build.

**A first-pass range within a week beats a precise number in three.** The client has
approved nothing yet; we are sizing the opportunity.
