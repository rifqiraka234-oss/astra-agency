# Tomato World — full service menu, broken into modules

**Purpose:** everything Astra could credibly do for Tomato World, chunked small
enough to price, sequence and sell one at a time. This is the internal long list —
not the client deck. We pick from it.

**Traffic light = Panorama Studios overlap.** See `03-panorama-studios-competitive-map.md`.
🟢 clean white space · 🟠 needs Panorama consent or joint delivery · 🔴 their turf, do not pitch

**Evidence tags:** `[ANK]` she said it in the call · `[SITE]` found on tomatoworld.nl
· `[INFER]` our analysis

---

## What we learned from the site that we didn't know in the call

The call framed this as "the booking form." The site shows **three separate
bookable product lines**, all apparently manual:

1. **Guided tours** — with real product complexity: education (split PO / VO /
   MBO-HBO-WO, each with its own fee page), Combitour, Taste & Feel tour, Taste and
   Taste tour, and an **Online tour**. `[SITE]`
2. **Rent space** — packages, terms and conditions, expo space, field lab space. A
   whole second revenue line with its own T&Cs. `[SITE]`
3. **"Booking a specialist?"** — sitting in the top navigation. A third. `[SITE]`

Plus three supporter tiers — **Partners, Friends, Ambassadors** — each presumably
with different entitlements. `[SITE]`

Nobody mentioned lines 2 and 3 in the meeting. **The addressable pain is roughly
three times what Ank described.** Worth confirming, and worth being the ones who
noticed.

---

## TRACK A — Booking and visitor operations 🟢
*The core. Clean white space, Ank chose it herself, and it touches nothing Panorama sells.*

| # | Module | What it is | Why | Size |
|---|---|---|---|---|
| **A1** | **Tour request → real booking** | Replace the request form with availability-aware booking: tour type, date, group size, language, capacity check | `[ANK]` "the booking system will definitely simplify work in the office" | M |
| **A2** | **Seasonal availability rules** | Crop rotation and closure periods as date rules, not typed-in page copy | `[SITE]` the stale "no tours until 1 Sept 2026" banner is still up on 14 Sept | S |
| **A3** | **Confirmations, reminders, self-service cancel/reschedule** | Automated emails; visitor reschedules themselves instead of emailing | `[ANK]` "somebody canceled, and then the whole thing" | S |
| **A4** | **Guide roster and assignment** | Match an available guide to the group — critically, **by language** | `[ANK]` she guides in English; visitors come from everywhere | M |
| **A5** | **Group intake pack** | Arrival info, parking, dietary needs, and a **digital hygiene-protocol acknowledgement** | `[SITE]` biosecurity is their entire moat; `[ANK]` "they all have to go through hygiene protocol" | S |
| **A6** | **Payments and invoicing** | Deposits, school fees, corporate invoicing | `[ANK]` fee pages exist; Josh flagged payment as a scope fork | M |
| **A7** | **Waitlist and cancellation backfill** | Auto-offer a freed slot to the waitlist | `[INFER]` capacity-constrained venue = every empty slot is lost revenue | S |
| **A8** | **Space rental booking** | Same engine, second product line: expo and field lab space | `[SITE]` `/rent-space/packages` | M |
| **A9** | **Specialist booking** | Third product line | `[SITE]` top nav | S |
| **A10** | **Occupancy dashboard** | What's booked, what's free, who's guiding, this week | `[INFER]` the office currently has no single view | S |

---

## TRACK B — Back office 🟢
*Serving the one person nobody is serving.*

| # | Module | What it is | Why |
|---|---|---|---|
| **B1** | **Admin console** | One screen replacing the email ping-pong | `[ANK]` "it takes her a lot of time" |
| **B2** | **Visitor and group records** | Lightweight CRM, or a clean feed into whatever they use | `[INFER]` no record system evident |
| **B3** | **Invoice generation and accounting export** | Tour and rental invoices out of the booking data | `[INFER]` |
| **B4** | **No-show and follow-up handling** | Automatic chase, automatic close | `[INFER]` |
| **B5** | **Reporting pack** | Visitors by segment, country, month, tour type | `[INFER]` feeds Track C, and feeds their funding conversations |

---

## TRACK C — Partner value 🟢
*Their actual revenue engine. Nobody is touching this, including Panorama.*

| # | Module | What it is | Why |
|---|---|---|---|
| **C1** | **Partner portal** | Partners self-serve their logo, materials, profile — instead of emailing files | `[ANK]` partners pay annually to showcase logo and material |
| **C2** | **Partner ROI report** ⭐ | Automated: *"this year 4,200 visitors from 38 countries saw your installation; you hosted 11 of your own customer groups"* | `[ANK]` "you get this whole marketing thing. **What's in it for me?**" — this is the renewal weapon, and it only exists if Track A captures the data |
| **C3** | **Partner-hosted group flow** | Partners bringing their own customers get their own booking path and allocation | `[ANK]` "they can bring their customers" |
| **C4** | **Partner sales-support page** | Warms the lead *before* Aart's in-person meeting. Explicitly **not** a self-signup funnel | `[ANK]` "it gives them a good head start before their discussion" — she ruled out self-signup |
| **C5** | **Tier differentiation** | Partners vs Friends vs Ambassadors — different entitlements, different pages | `[SITE]` three tiers exist, undifferentiated |

**C2 is the highest-leverage idea in this document.** Tomato World's entire income
is renewals from partners asking "what's in it for me?" — and today the answer is
anecdotal. Turning it into an annual data report defends every partner fee they
have. It is also impossible for Panorama to build, because it requires the booking
system underneath it.

---

## TRACK D — AI workflows 🟢
*Zero AI anywhere in Panorama's 138 pages. Total white space.*
*Caveat: `[ANK]` made a pointed remark about young people and lazy minds — **lead with the outcome, never with the technology**.*
*Softener: `[SITE]` Tomato World already runs a project called "AI in greenhouse horticulture." AI is on-brand for them, just not when it sounds like a shortcut.*

| # | Module | What it is | Why |
|---|---|---|---|
| **D1** | **Inbound request triage** | Classify incoming requests — school / corporate / international / press — and route with a drafted reply | `[ANK]` the admin load is the pain |
| **D2** | **Pre-visit group assistant** | Answers the repetitive questions groups ask before arriving | `[SITE]` they have an FAQ page doing this badly |
| **D3** | **Multilingual tour content** | Translate and QA tour material beyond NL/EN, with a human check | `[SITE]` "visitors from all over the world", site is only bilingual |
| **D4** | **Knowledge base assistant** | Conversational access to their field lab and knowledge base content | `[SITE]` `/training-and-field-lab/knowledge-base` exists and is buried |
| **D5** | **Post-visit summary** | Auto-generate what the group saw, with partner links, as a takeaway | `[INFER]` retention + partner value |
| **D6** | **Feedback analysis** | Read every post-visit response, surface themes monthly | `[INFER]` feeds B5 and C2 |

---

## TRACK E — On-site visitor experience 🟢
*The gym analogy Ank responded to — she connected to it unprompted.*

| # | Module | What it is | Why |
|---|---|---|---|
| **E1** | **Digital signage with live greenhouse data** | Screens showing real climate/growth data from their own field lab | `[ANK]` loved the gym-screens example; `[SITE]` they are a field lab with sensors |
| **E2** | **QR self-guided layer** | Audio or text guide in the visitor's own language, alongside the human guide | `[INFER]` extends guide capacity without hiring |
| **E3** | **Post-visit digital takeaway** | What you saw, the partners behind it, links to go deeper | `[INFER]` retention |
| **E4** | **Field lab live visualisation** | Their innovation story, told with their actual data | `[SITE]` field lab is half their identity |
| **E5** | **School programme layer** | Quiz or worksheet for the education segment, teacher-facing | `[SITE]` education is a distinct, fee-paying, repeat-booking segment |

---

## TRACK F — Website and content 🟠
*Only as a joint engagement with Panorama, or not at all.*

| # | Module | Status | Note |
|---|---|---|---|
| **F1** | **IA restructure — visitor vs partner split** | 🟠 | `[ANK]` "Am I a visitor? Am I a partner? I got lost." Her #1 stated complaint. Sell as research-led IA, invite Panorama to execute the visual. |
| **F2** | **Hero storytelling** | 🟠 | Panorama's Design Studio turf. Only in an ideation session. |
| **F3** | **Booking funnel UX** | 🟢 | Ours — it's our system's own surface. |
| **F4** | **Cookie consent fix** | 🟢→ give away | GTM loads with no consent banner. Real GDPR gap. **Hand it to Panorama as a gift.** Costs us nothing, buys enormous goodwill. |
| **F5** | **Sitemap https fix** | 🟢→ give away | Same play. |
| **F6** | **Ideation / design sprint** | 🟠 | `[ANK]` Raka offered this. Best run *with* Panorama and the new marketing hire in the room. |

---

## TRACK G — Marketing 🔴
*Documented so we remember not to pitch it.*

Branding, identity, social media, SEO, SEA, Google/LinkedIn Ads, campaign email,
newsletters, copywriting — **all Panorama core**. Do not propose.

**The one clean line through this:**

> **Transactional and lifecycle email is ours** (booking confirmations, reminders,
> post-visit follow-up, teacher re-booking prompts, partner renewal notices) — it is
> product, emitted by the system we build.
> **Campaign and marketing email is Panorama's** (newsletters, promotions, audience
> building).

State that boundary out loud to Panorama. It is unambiguous, it is defensible, and
it lets us build the retention motion Raka wants without touching their retainer.

---

## Suggested packaging

Ank asked for modular pricing with hours, price and expected return per chunk.
Three bundles, each independently sellable:

### Package 1 — "Get the office its time back" 🟢
**A1 + A2 + A3 + A10 + B1.** The minimum coherent booking system.
Pitch: hours saved, measurable, no design change, no Panorama involvement.
This is the wedge. Price it to fit a leftover 2026 budget if one exists.

### Package 2 — "Prove the partner value" 🟢
**B5 + C1 + C2 + C3.** Requires Package 1's data to exist.
Pitch: defends every annual partner fee. This is the one that gets Aart's attention,
because it is the only module that touches revenue rather than cost.

### Package 3 — "The visit itself" 🟢🟠
**E1 + E3 + D2 + D5**, and F1/F6 *with* Panorama.
Pitch: experience and retention. Sell last, once we have credibility.

### Free of charge, offered immediately
**F4 + F5** and flagging the stale tour banner. Three small favours, delivered
before any contract, routed so Panorama share the credit.

---

## Sequencing logic

Everything in C and most of D and E **depends on Track A existing first**, because
they all consume booking data. That is a genuinely strong position: Package 1 is
cheap and standalone, and it is also the foundation that makes Packages 2 and 3
possible. Nobody can sell Package 2 without having built Package 1.

Say this to Aart plainly. It reframes the first module from "a booking form" into
"the data layer everything else runs on."

---

## Must verify before pricing anything

1. **Bookings per month**, split by tour type. Without it every ROI claim is a story. `[ANK]` can get this.
2. **Hours per week** the admin spends on booking coordination. The Package 1 number.
3. **Partner fee per year, and partner count.** Sizes Package 2.
4. Is space rental actually manual too? How many per year?
5. What tools exist already — any CRM, any calendar, any accounting system?
6. Who handles the inbox today, and what happens when she is on holiday?
7. Contract status with Panorama — retainer, or favour-based?
