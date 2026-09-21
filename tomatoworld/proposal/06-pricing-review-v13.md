# Pricing review — Voorstel Tomatoworld v1.3 (21 Sep 2026)

Benchmarked against Dutch market rates, September 2026. Internal.

---

## Verdict

**The pricing is sound and defensible.** It sits deliberately just below the Dutch
agency market, which is exactly the position Astra claims on page 11. The arithmetic
is flawless. **Two commercial terms are underpriced, and one factual claim is probably
wrong and needs checking before this goes out.**

---

## 1. Arithmetic check — every figure verified

| Claim in proposal | Computed | Status |
|---|---|---|
| Year 1 investment €28,900 | €24,450 + (9 × €495) = **€28,905** | ✅ |
| Annual value €36,200 | 4,700 + 16,500 + 15,000 | ✅ |
| Year 1 net +€7,300 | **+€7,295** | ✅ |
| Year 2/3 net +€30,260 | **+€30,260** | ✅ |
| Cumulative 3yr +€67,820 | **+€67,815** | ✅ |
| Payback ≈10 months | **9.6 months** | ✅ |
| Cost of waiting ≈€3,000/mo | **€3,017** | ✅ |
| 3yr do-nothing ≈€108,000 | **€108,600** | ✅ |
| Net per booking €466 → €564 | verified both | ✅ |
| ≈€13,000/yr from +€100 × 130 | **€12,740** | ✅ |
| Bundle discounts | 10.1% and 10.3% | ✅ consistent |

**Nothing to fix here.** If Aart checks the maths — and he will — it holds.

## 2. Market benchmark

| Benchmark | Dutch market 2026 | Source |
|---|---|---|
| Agency hourly | **€85–150** | multiple NL rate surveys |
| Freelance developer | €65–130 | idem |
| Custom web application (MVP → platform) | **€15,000–75,000** | NL agency pricing guides |
| Marketing automation setup (one-off) | **€2,000–8,000** | NL agency pricing |
| Marketing automation management | €500–1,500/mo (SME) | idem |
| Email marketing agency hourly | €75–150 | MarketingKiezer tariff data |

### Implied hourly rate in the proposal

Assuming roughly half-time loading per component (realistic, since components run in
parallel):

| Component | Implied €/hr |
|---|---|
| 3 Boekingsmodule | €95–119 |
| 5 Koppelingen | €98 |
| 7 Partner-leads | €99 |
| 4 Betalen | €88 |
| 6 E-mailautomatisering | €62–82 |
| 1 Compliant | €41–61 |

**Most components land in the €88–119 band — squarely inside the Dutch agency range,
at the lower-middle end.** That is the right place to be for a young agency winning a
first reference client.

### The "€40,000–60,000 at a Dutch agency" claim

**Defensible.** Market data puts a custom web application at €15,000–75,000, and this
scope — compliance, booking engine, payments, three integrations, eight automation
flows, partner reporting — sits at the upper half of that. A Dutch bureau at €110/hr
would land in exactly that range. **Keep the claim.**

### The AP enforcement claim

**Verified and accurate.** First 50 warning letters April 2025; 200+ websites warned
by mid-2025; roughly three-quarters complied; enforcement opened against ~50 who did
not; the AP now holds a structural **€500,000/year budget** for cookie supervision.
The urgency in chapter 1 is real, not manufactured. **Keep it.**

---

## 3. Two things that are underpriced

### 3.1 €95/hour for out-of-scope work ⚠️ **biggest margin leak**

Dutch agencies charge **€85–150**; €95 sits at the very bottom. This is the rate that
governs every change request, and change requests are where fixed-price work either
recovers margin or bleeds it.

**Recommend €110–125/hour.** It stays under a typical bureau rate, so it does not
weaken the value story, and it materially changes the economics of a project that will
certainly attract scope creep.

### 3.2 €495/month for Beheer & groei ⚠️

The included **3 hours alone** are worth €285 at €95, or €375 at €125. On top of that
the €495 covers hosting, monitoring, security updates, legal-text updates, a monthly
report and **a 4-working-hour response SLA**.

That is thin, and it is a 12-month commitment. Market comparison for automation
management alone is €500–1,500/month.

**Options, in order of preference:**
1. Raise to **€650–750/month** — still cheap against market.
2. Keep €495 but reduce included hours from 3 to 2.
3. Keep €495 as a deliberate loss-leader **only if** we accept it buys the
   relationship and the partner-portal upsell.

**A 4-hour response SLA across the CET ↔ WIB gap is the part to think hardest about.**
Amwisesa are 5–6 hours ahead. Who answers at 09:00 Dutch time?

---

## 4. One factual claim that is probably wrong ⚠️⚠️

> Page 2 and page 11: *"de vacante marketing- en communicatiefunctie"* — the **vacant**
> marketing and communications role, costed at ≈€55,000/year.

**Ank told us in the intro call that this role has been filled:**

> *"We had a new girl that is really now employed in the marketing communications
> field. She is still young, but she has a little bit of experience, and she loves to
> take this also as something that she could really put her hands on."*

If she is already employed, calling the role vacant is wrong, and the comparison
"this package does the digital part of that job for less than half" reads as either
careless or as implying we could replace their new colleague. **Either is damaging,
and the second is worse — she is a potential ally.**

**Fix before sending.** Two safe rewrites:
- Compare to the **cost of the role** rather than its vacancy: *"een marketing- en
  communicatiefunctie kost ≈€55.000 per jaar; dit pakket levert het digitale
  fundament waar die functie op kan bouwen."*
- Or cut the comparison entirely. The partner-membership comparison (€625/month) on
  the same page is stronger and carries no risk.

---

## 5. Figures to verify with the client before this is final

| Figure used | Where | Risk if wrong |
|---|---|---|
| **38 partners × €7,500** | Page 3, page 9, business case | **High.** It underpins the whole ROI. Aart knows the real number instantly. Our earlier deck said "30+ partners" with no fee. If €7,500 is an assumption, the summary page states it too confidently. |
| ≈130 group tours, 2,600 visitors/yr | Chapter 5 | Medium. Drives every revenue line. |
| 20 people per group, ≈€450/booking | Chapter 5 | Medium. Consistent with their €200 + €12.50pp. |
| Internal hourly cost €45 | Chapter 5 | Low. Reasonable for NL admin staff. |
| **58% of visitors from outside NL** | Page 8, page 10 | Medium. Stated twice as fact — where is it from? |
| Education €200 / €225 per group | Component 3 | Low, appears sourced from their site. |

Chapter 5 says *"We checken deze cijfers samen bij de kennismaking"* — good hedge. But
the **management summary on page 2 states them without that caveat**, and page 2 is
the page Aart actually reads. **Move the hedge up, or soften page 2.**

---

## 6. The strategic tension nobody has flagged

The proposal is built on urgency: *"elke maand wachten kost ≈€3.000"*, a 27 November
deadline, validity expiring 31 October, and a start in the week of 5 October.

**Ank's email of 18 September says the opposite, twice:** *"don't take any steps yet"*
and *"at this point don't undertake any developments"*. They are meeting Panorama
first, and Aart and Joyce decide.

The two documents are not compatible in tone. Sending a deadline-driven proposal days
after she asked us to slow down risks reading as pressure, from a champion who has
already told us she needs to manage her own people and her own friendship with the
incumbent.

**Recommendation:** keep every number, soften the framing.
- Present 27 November as **an opportunity they can still catch**, not a deadline we
  impose.
- Extend validity beyond 31 October. It is arbitrary, and a foundation that meets
  monthly will feel cornered by it.
- Lead the covering email with *"no rush, and nothing has been started"* — consistent
  with our reply to her hold.

---

## 7. Risks in the commercial terms

| Term | Risk |
|---|---|
| **Component 1 guarantee — "not compliant, no payment"** | Low and controllable. Good trust signal. Keep. |
| **27 November pilot guarantee, free rollover to 2027 if we miss** | Real exposure. Start 5 Oct → 27 Nov is ~7 weeks for components 1–4. Feasible but tight, and it depends on Mollie onboarding and on Panorama placing a script. **Neither is fully in our control.** |
| **Panorama dependency** | Three asks: a script in `<head>`, sitemap on https, HSTS header. The fallback (`boek.tomatoworld.nl` with a button) is already written in — good. |
| **10-month payment plan at €2,445/mo** | Working-capital cost to us. Fine if Amwisesa are paid on delivery milestones, painful if paid monthly against our own invoicing. |
| **Software licence, 6-month run-on after exit** | Generous. Make sure Amwisesa's contract supports it. |

---

## 8. Bottom line

**Do not drop the prices.** They are already below the Dutch market and the value story
justifies them.

**Do change these four things before sending:**
1. **€95/hr → €110–125/hr** for out-of-scope work.
2. **€495/mo → €650–750/mo**, or cut included hours to 2.
3. **Fix the "vacante" marketing role** — she has been hired.
4. **Verify 38 × €7,500 and the 58% figure**, or move them behind the "we will check
   these together" caveat on page 2.

**And one judgement call:** soften the urgency framing so it does not collide with
Ank's request to wait.
