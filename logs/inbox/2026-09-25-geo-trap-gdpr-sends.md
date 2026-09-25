# The geo trap, and four GDPR messages sent on 2026-09-21. For Raka.

**What was found.** This container's traffic leaves from Columbus, Ohio (ipinfo.io and the
Cloudflare trace both say US, 2026-09-25). GDPR doesn't apply to a US visitor, so consent tools
that switch on by region show us no banner and let trackers run. Every "trackers before consent,
no cookie notice" finding made from here only describes what a US visitor sees, unless the page
has no consent code at all.

**The four sent messages that made that claim, rechecked 2026-09-25 from the raw HTML.**

| Lead | Site | What the HTML shows | Verdict on our claim |
|---|---|---|---|
| Chris Burton, The Burton Clinic | burtonclinic.co.uk | Google Site Kit consent mode, `gtag('consent','default')` with analytics, ads and storage all `denied` for GB and the EEA | **Very likely false for his UK visitors.** A UK visitor gets no analytics cookies until they agree. The site also shows a banner today |
| Stephanie De Decker, Aurevia Syndic | aureviasyndic.be | The same consent mode default, `denied` for BE and the EEA | **Very likely false for her Belgian visitors** |
| Visakh Pillai, AutoDevPro | autodevpro.tech | Our curl and Chromium both get a "Robot Challenge Screen", 202. Our message itself mentioned "a Google consent cookie sitting there", the sign of a region rule | **Unknown, probably false.** Can't be read from here |
| Marko Markovic, Markoni Global Logistics | markoniglobal.com | No consent code of any kind in 87 KB of HTML | **Stands.** With no consent code there's no region rule, so trackers run for everyone |

**What's fixed.** `tools/site-audit.js` prints the egress country and `GEO VOID` whenever a page
carries consent code, tested both ways (Burton voids, petervanderleegteveilingen.nl holds).
RULES.md 4A rule 13 carries the rule.

**Raka's call.** Whether to send Chris, Stephanie and Visakh a short correction. None of the
three has replied, per the queue. Nothing has been sent to them today.
