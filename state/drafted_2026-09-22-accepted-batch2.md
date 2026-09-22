# Batch 2 of the v0.1 accepted backlog. 2026-09-22.

**Nothing sent and nothing drafted.** Two blocks were resolved into clean verdicts, one
lead is one tap of Raka's phone away from a strong message, and two were already correctly
closed.

All five threads re-pulled and empty. **Positive control**, Kate Phipps-Wiltshire's thread
returned 6 activities through the same call in the same session, so the five empties are
real.

---

## 1. Peter Borup, Quadrise Plc. Identity RESOLVED, and the answer is still no.

**The old block was a genuine ambiguity.** Our contact is LinkedIn slug
`/in/peter-borup-718381` while the searchable Quadrise CEO is `/in/peter-borup`, and the
prior session correctly refused to assume they were the same man.

**Resolved from the primary source.** Quadrise's own people page,
`quadrise.com/about-us/our-people/`, names **"Peter Borup, Chief Executive Officer"** and
describes him as "an accomplished international CEO with over 30 years of experience in the
global shipping industry" who "began his career at A.P. Moller-Maersk". lemlist's own
summary reads "An experienced CEO with broad international experience within shipping". The
two match. It is him. The guessed board URL 404d first, so the real path came out of their
nav rather than a guess.

**But the ICP answer does not change.** Quadrise is AIM listed. Their own nav carries
Investor Relations, AIM Rule 26, Regulatory News and Analyst Research, and the site runs in
English, Arabic and Spanish. A listed plc does not buy a website from a LinkedIn message,
and the person who owns that site is an IR and comms function, not the CEO.

**`NO_STRONG_ANGLE` on ICP, not blocked.** Raka's call if he disagrees.

---

## 2. Mandy Kerley, Aptiq Works Limited. Block RESOLVED, and it is a no.

**The old block was the rebrand ambiguity**, aptiqworks.com and aptiqworks.co.uk both 301
to trickle.works, and nobody knew whether Aptiq had become Trickle, whether Mandy had moved,
or whether a domain had changed hands.

**It was none of the three.** trickle.works' own footer reads **"© 2026 Aptiq Works Limited.
Trickle is a product of Aptiq Works."** The company simply leads with its product.

**Two reasons there is no angle, and the second is the one that matters.**

- **The site is genuinely strong.** Clear hero, real product screenshots, Case Studies,
  Pricing, a demo CTA, a cookie banner with a working Decline, zero cookies before any
  click, zero page errors. Its TRUSTED BY row carries **NHS Lothian, NHS Lanarkshire, NHS
  Mid Yorkshire Teaching and gov.scot**, named public sector clients most vendors would
  envy. Manufacturing a defect here would read as insulting.
- **She does not own it.** Companies House, APTIQ WORKS LIMITED **SC871412**, incorporated
  30 November 2025 in Edinburgh. **One officer and one person with significant control,
  Paul Kenneth Reid**, holding ownership of shares 75% or more, voting rights 75% or more,
  and the right to appoint or remove directors. **Mandy Kerley appears as neither.** She
  describes herself as Co Founder and Fractional COO, and a fractional COO's own business is
  her practice, not her client's product.

**`NO_STRONG_ANGLE`.**

---

## 3. William Mayvis, Relatiq. THE ONE WORTH HAVING, and it needs one tap from Raka.

**lemlist says his current company is Relatiq**, `jobTitle` "Experience Founder Relatiq AI",
`companyLinkedinUrl` `linkedin.com/company/relatiq-ai`, with a full Dutch description of
digital assistants handling customer questions over WhatsApp, chat and email for MKB firms.
His tagline still reads "Co Founder AgileArch", which is the stale one.

**What is verified.** `relatiq.nl` has **no A record, no AAAA and no CNAME, on the apex and
on www**, confirmed on **three independent paths**, Cloudflare DoH, Google DoH, and an
external reader service on a different network that returned "Domain could not be resolved".
The Google check carried a positive control, trickle.works returned real IP addresses
through the same call in the same minute.

**The domain is alive, just not serving a website.** Cloudflare nameservers, a working
Microsoft 365 MX at `relatiq-nl.mail.protection.outlook.com`, and an SPF record. So the
business runs its email there and there is no web host attached.

**What contradicts it, and why this is not written yet.** A search index still returns
`https://www.relatiq.nl/` with a real title, "Relatiq - Digitale medewerkers voor
MKB-bedrijven | Webchat, Voice, WhatsApp". A snippet is never the thing and it has to be
opened at source, and it cannot be opened. **The Wayback check that would have dated it is
void**, its availability API returned NO SNAPSHOT for bbc.co.uk as well, so the method
failed its own control.

**So RULES.md section 0 applies and stops this.** "Your website isn't working" is one of
the three sentences that may never be written, and I did not open that page on this pass.

**What Raka does, and it takes five seconds.** Open `relatiq.nl` on his phone. If it does
not load, the angle is bulletproof and strong, a founder selling AI assistants to Dutch SMEs
whose own company has no website while its email runs fine. If it does load, our DNS view is
wrong in a way worth knowing about.

**His other property works**, `mayvision.nl` returns 200, a real Azure consultancy called
Mayvision IT. `agilearch.nl` does not resolve either.

---

## 4. David Marian, CLUUE. DO_NOT_CONTACT stands. No action.

`cluue.de` redirects to `wistree.de`. This is Karim's company, the live warm thread we built
the WisTree deck for, and David is his co founder on product and engineering. A cold opener
would cut across that relationship. **The earlier verdict is respected, not re derived.**

---

## 5. Daan Erisman, tuftuf. NO_STRONG_ANGLE confirmed, and the new leads went nowhere.

The prior verdict was thorough and it holds. The site is a deliberate one screen piece of
art direction and the private events route is a real 21 field form, not the mailto I would
have expected, so the flow angle does not exist.

**What was new this pass.** His tagline names two more things, "Partner HighVest Capital
(real estate) | Owner tuftuf • Santé Open", and his summary says he founded an events
company at 16 that runs upwards of 300 events a year. So three more properties.

**None of them opens an angle.**

- **HighVest Capital**, he is a *partner*, which is the job he holds, not a business he
  owns, and real estate investment is not the ICP.
- **Santé Open** could not be tied to him with evidence. A search surfaced an Amsterdam
  party brand on Instagram under a similar but not identical name and nothing connects it to
  him. Per the rule, an untied business is not written about.

---

## The pattern worth acting on, and it changes what batch 3 should be

**Working the accepted backlog newest first walks straight into leads that were already
judged.** Of these five, four already carried a verdict. Of the 35 accepted and never
messaged, only 13 had never been triaged at all, and Tim, Adrian Steele and Romain Coquio
were three of them.

**So batch 3 should be drawn from the genuinely untouched rows, not by date.** Discounting
the ones `CLAUDE.md` already records as no angle (Snorly, Handsome Frank, Omnilabs, dotega)
or as wrong domain blocked (Prevent, The Sales Academy, Mapler), the actually fresh ones are

- Fabrice Beauchêne, Glyx Therapeutics
- Anthony Roux, Lums AI
- Connor Bosco, Elevate Marketing
- Paul Prescott, Raise Your Game Limited
- Neeraj Sharma, Nesh Group Limited
