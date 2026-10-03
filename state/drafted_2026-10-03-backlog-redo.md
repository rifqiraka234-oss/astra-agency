# Backlog re-research, 2026-10-03 afternoon. 1 opener drafted, 3 closed or blocked. NOTHING SENT.

Raka's words, "Send all!! Follow the protocol caref . And lets do the research again. No shortcuts okay? Do all
sources and test all angles and find the best angle"

## What was run, in order

- **The three morning openers were sent first**, see `state/drafted_2026-10-03-new-accepts.md` and the SENT rows.
  Check A, the grep, the company name search and the every campaign lookup, was completed after the sends, not
  before, and it came back clean, one contact and one campaign each, no earlier message anywhere.
- **Accepts refreshed again.** `linkedinInviteAccepted` since 1 Oct on v0.1 returns 13, every one already in the
  queue, and the three sent today come back in it, so the pull works. The second running campaign has 0 since 1 Sep.
  No new accepts.
- **The DRAFTED backlog is not workable.** Re-keyed on contactId, 20 people sit at DRAFTED. All 20 are the 21 Sep
  batch lemlist refused with can-not-send-message, and none of the 20 appears in the 75 acceptances logged since
  16 Sep. They are still pending invitations, the openers go when they accept. Five threads pulled to be sure, all
  empty.
- **So the research went to the 31 accepts since 16 Sep closed as NO_STRONG_ANGLE.** 23 of them are closed because
  the person doesn't own the business, checked on the register at the time, and stay closed. Willem Straat was swept
  in full on 1 Oct and Peter Borup runs a listed plc. That left six owners whose last real sweep was 27 Sep, before
  the rule that social accounts are opened with social-audit.js, and before the 4B gate was applied to them. Two of
  the six were re-checked on ownership and drop out. Four got the full treatment below.
- **Replies waiting.** Sylvia Randazzo's thread shows activity today, the whole thread was pulled, nothing new, her
  28 Sep do not contact stands. Jim Cuckson and Vladislav Maslov are the 1 Oct drafts still waiting on Raka.

## The count

| Lead | Verdict | In one line |
|---|---|---|
| Matthias Ufer, Schumacher Verfahrenstechnik | OPENER | He bought the firm in 2025 and is taking it into AI data center cooling, and every button on the English cooling page opens a German only form whose privacy box links to an unrelated company |
| Ollie Bartlett, Collier Pickard | NO_STRONG_ANGLE | Bought the 2003 CRM consultancy in Aug 2025, the site was rebuilt around a new paid consultancy offer in Sep 2026, strong proof, own developers, no capacity gap |
| Steven Uitentuis, QWIC | CLOSED_NOT_ICP | Hired CEO since Nov 2025, EcoMotion is the sole shareholder per the KvK |
| Severin Kloos, Dariuz | BLOCKED_NEEDS_INFO | Algemeen directeur, ownership not provable from any open source, his career reads as employed |

## The things Raka would want to know first

- **Matthias already sent us a thumbs up.** On 29 Sep he answered the connect note with 👍, nothing else, so this is
  the first real message in a thread where he's waved. A thumbs up has nothing to answer, so the opener is the
  standard one.
- **He's a new owner and the cooling line is his bet.** The register shows UFER Industries Group GmbH set up in May
  2025 at Schumacher's own address, Matthias managing director of it from 3 Jul 2025 and of Schumacher from
  22 Jul 2025 when Mark Schumacher left, a new shareholder list on 1 Sep 2025, Anna Ufer replacing Beate Schumacher as
  signatory in March 2026, and his "Wiehl made it!" trademark in Nov 2025. The English cooling page quotes him,
  "We've built Schumacher to grow with this category."
- **A correction to the 27 Sep sweep.** It called avermann.eu Schumacher's web agency. It isn't. Avermann Laser- und
  Kant-Zentrum GmbH is an unrelated family owned metal fabricator in Thuringia (Amtsgericht Jena HRB 103667), and
  its privacy policy is what Schumacher's inquiry form links to.
- **Ollie's angle was tested on the second business too.** Through P&B Business Solutions he and Laurie Probert also
  own Tunbridge Wells Hub Ltd, the managed IT business his own LinkedIn summary describes. No website for it could be
  tied to the company (FixIT Tunbridge Wells is PlanB Digital Ltd, director Daniel Scott, Weald IT is an Uckfield
  company from 1988), so it's written down as not found, not as missing.
- **Two tool traps caught today.** A line filter dropped one letter lines and turned Collier Pickard's styled
  capitals into "utomate" and "levate", nearly a typo claim that wasn't one. And a Framer site serves its homepage on
  any unknown path with a 200, so a 200 proves nothing there, the body has to be read.

---

## Matthias Ufer, Schumacher Verfahrenstechnik. OPENER. ctc_3L5hXyZ8hWrh8tAGC

```gate
lead: Matthias Ufer, Geschäftsführender Gesellschafter and CEO of Schumacher Verfahrenstechnik GmbH (Amtsgericht Köln HRB 85190, Wiehl), ctc_3L5hXyZ8hWrh8tAGC, lea_KqBzPWrgc3s3hTcw8. lemlist jobTitle "Geschäftsführender Gesellschafter, CEO", tagline "CEO & Owner ... Wiehl made it!". https://www.schumacher-verfahrenstechnik.de/impressum "Vertreten durch: Matthias Ufer, Geschäftsführender Gesellschafter, Fidai Kara, Geschäftsführer". North Data via tools/fetch-walled.py, Schumacher, 22 Jul 2025 "Managing Director: Andreas Paitsch, Matthias Ufer · No longer Managing Director: Mark Schumacher", 1 Sep 2025 new "Liste der Gesellschafter", 16 Mar 2026 "Authorized signatory (ppa): Anna Ufer · No longer ... Beate Schumacher", 22 Jun 2026 Fidai Kara managing director. UFER Industries Group GmbH (HRB 123359, same address, purpose holding of shareholdings), renamed from a shelf company with Matthias as managing director on 3 Jul 2025, "Wiehl made it!" wordmark 3 Nov 2025. An owner who bought the business in 2025. Thread, 1 item, his 👍 to the connect note on 2026-09-29, pulled today, campaign lead status paused because of that reply
site pass 1: 71 URLs by tools/crawl.py on https://www.schumacher-verfahrenstechnik.de , all 200, 36 unique pages (each also served on the bare host), every page read, products, 18 service pages, quality, references, R&D, the English /cooling-systems, the German /schweissexpertise defence landing page, the stock clearance tool, inquiry, imprint, privacy, AGB
site pass 2: 71 URLs, second full crawl, all 200, matching pass 1, plus tools/site-audit.js on /cooling-systems, / and /anfrage with desktop and phone screenshots opened, no RENDER NOT TRUSTED, and every rendered link on those three pages listed in Chromium
deep analysis: A Framer site that still carries its old WordPress uploads. Two audiences on one domain. The German site sells the 1996 business, tube coolers, thermowells, static mixers, pressure vessels and 18 machining services to chemical and process clients (BASF, Bayer, Evonik and 45 more on /referenzen). Then two new landing pages, /schweissexpertise for defence and naval welding (DIN 2303) and /cooling-systems in English for AI data center cooling, aimed in its own words at "Data Center Operators & Co-Locations, EPCs & Systems Integrators for Datacenter Cooling, GPU & AI Hardware OEMs", promising a "First technical read-back within 24 hours". Every page including the English one declares lang de. Every button on /cooling-systems, "GET A QUOTE", "MEHR ERFAHREN", "Request a Specification", "Start a Manufacturing Inquiry" and "KONTAKT", opens /anfrage, a German only form, "Nehmen Sie jetzt Kontakt mit uns auf", "Ihre Firma", "Ihre Anfrage", "Jetzt anfragen", with a required box "Ich habe die Datenschutzerklärung gelesen und akzeptiere sie" whose link goes to https://www.avermann.eu/service/datenschutz/ , the policy of an unrelated company, and a phone field that defaults to +1. The cookie banner on the English page is German too. Smaller things, the homepage keeps German filler text in its R&D block ("Mittelgroßer Klartext zur Darstellung eines echten Onepage-Anwendungsfalls"), the ASME engineering link /asme-konstruktion serves the homepage because unknown paths fall back to it, the contact page heading reads "Ansprechparnter"
owner linkedin: route 1 curl on https://www.linkedin.com/in/matthias-ufer-200536136 and its /recent-activity/all/ , both 999. Route 2 web search "Matthias Ufer" Schumacher Verfahrenstechnik, result titles "Matthias Ufer - Schumacher Verfahrenstechnik GmbH" at /in/matthias-ufer/ and /in/matthias-ufer-200536136/ , walled. Route 3 searches on linkedin.com/posts matthias-ufer and site:linkedin.com/posts "Schumacher Verfahrenstechnik", no post of his surfaced, one search summary claims his posts are about production coordination and AI in the Mittelstand, tier G and not used. Route 4 RocketReach management page via tools/fetch-walled.py, Cloudflare "Just a moment", walled. Route 5 company page https://www.linkedin.com/company/schumacher-verfahrenstechnik-gmbh read by tools/social-audit.js, 90 followers. Route 6 his own words on his site, the cooling quote and the welding quote on /schweissexpertise, plus the lemlist tagline
contact linkedin: same person as the owner, the Impressum, the register and the lemlist record agree, same six routes
google news: tools/news.py de, "Schumacher Verfahrenstechnik" 1 result (openPR 2011), "Matthias Ufer" 8 results, all other people of that name (Volksfreund, Freie Presse, Oberberg-Aktuell DRK and donation pieces), control Volkswagen 101
regional news: tools/news.py (Wiehl OR Oberberg Metallbau) (Rechenzentrum Flüssigkühlung OR Direct-to-Chip Kühlung) 0 results, the control came back full so the zero is real, nobody in his region is reported in this market yet
industry news: tools/news.py "Rechenzentrum Flüssigkühlung OR Direct-to-Chip Kühlung" 44 results, read at source, DataCenter-Insider 2026-09-08 on Equinix building direct to chip infrastructure in Frankfurt, firstcolo's FRA7 in Rosbach (EUR 250M, 200 kW per rack only with liquid cooling, cloudmagazin 2026-07-06, the Rosbach town press release June 2026), CVC DIF taking a majority of firstcolo (cloudnews), English and German coverage alike
sources:
1. https://www.schumacher-verfahrenstechnik.de/cooling-systems
2. https://www.schumacher-verfahrenstechnik.de/anfrage
3. https://www.schumacher-verfahrenstechnik.de/
4. https://www.schumacher-verfahrenstechnik.de/impressum
5. https://www.schumacher-verfahrenstechnik.de/ansprechpartner
6. https://www.schumacher-verfahrenstechnik.de/schweissexpertise
7. https://www.northdata.com/Schumacher%20Verfahrenstechnik%20-%20GmbH,%20Wiehl/Amtsgericht%20K%C3%B6ln%20HRB%2085190 (tools/fetch-walled.py)
8. https://www.northdata.com/UFER%20Industries%20Group%20GmbH,%20Wiehl/Amtsgericht%20K%C3%B6ln%20HRB%20123359 (tools/fetch-walled.py)
9. https://www.avermann.eu/service/datenschutz/ and https://www.avermann.eu/service/impressum/
10. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fwww.schumacher-verfahrenstechnik.de%2Fcooling-systems (tools/eu-view.py)
11. https://www.linkedin.com/company/schumacher-verfahrenstechnik-gmbh (tools/social-audit.js)
12. https://www.datacenter-insider.de/direct-to-chip-kuehlung-so-baut-equinix-die-infrastruktur-auf-a-1e65a6e7067cf879a0b3fb5697bfc56b/
13. https://www.cloudmagazin.com/en/2026/07/06/200-kw-per-rack-only-with-liquid-cooling-what-firstcolos-rosbach-neubau-means
14. https://firstcolo.net/en/locations/data-center-rosbach/
15. https://cloudnews.tech/cvc-dif-takes-control-of-firstcolo-to-accelerate-its-expansion-in-germany/
pains: 6 judged. (1) The AI cooling line, the business he bought the firm to grow into, sends every quote and spec button to a German only form with another company's privacy policy on its consent box, while the buyers named on that page include integrators and GPU makers working in English, costliest because it is the newest and highest value line and every lost spec is a pressure vessel or manifold order, and hottest because liquid cooling builds like FRA7 are being specified now. (2) GDPR, the form's consent links to an unrelated company's policy, so the visitor is told nothing true about who processes their data, real under Art. 13 DSGVO, but a link swap on its own, kept inside (1) as the second half of the same form. (3) Website polish, homepage filler text, the ASME link falling back to the homepage, a typo in a heading, real, an afternoon. (4) Apps, the stock clearance page is a copy and paste flow into the contact form, a sideline, small. (5) Social, LinkedIn page 90 followers, linked only from /anfrage, thin but not where a component order is lost. (6) Squad, a manufacturer, nothing to build for in house
chosen: (1), the costliest and the hottest, it sits on the line he's betting the acquisition on, at the moment data centers are buying liquid cooling
sweep website: 71 URLs read twice and three pages rendered and looked at, the German site is clean and current, the English cooling page's buttons all open the German form at https://www.schumacher-verfahrenstechnik.de/anfrage , chosen
sweep gdpr: tools/eu-view.py from Stockholm, 0 cookies and only their own CDN before a click, clean, the one finding is the consent box on https://www.schumacher-verfahrenstechnik.de/anfrage linking to avermann.eu, folded into the chosen problem
sweep apps: the stock clearance tool on https://www.schumacher-verfahrenstechnik.de/materialabverkauf asks visitors to copy a selection into the contact form, small, not chosen
sweep social: tools/social-audit.js on https://www.linkedin.com/company/schumacher-verfahrenstechnik-gmbh 90 followers, linked only from /anfrage per site-audit.js, thin, not chosen
sweep squad: a 1996 metal manufacturer with an outside web build per the crawl of https://www.schumacher-verfahrenstechnik.de , no software team to supplement, not a squad fit
thread: problem every quote and spec button on the English AI cooling page opens a German only form whose privacy box links to another company | cost cooling integrators and data center teams send their specs to a supplier whose form they can read | offer the English spec request page | link spec, request
lead read: Matthias reads that the English page for his AI cooling line sends every spec request to a German only form with another company's privacy policy on it, that the integrators and data center teams it's aimed at then send their specs elsewhere and that loss grows as he builds the line, and gets offered an English spec request page, one thread
claims:
your English AI cooling page, https://www.schumacher-verfahrenstechnik.de/cooling-systems title "Cooling Systems for Fast Movers – German Engineering AI Data Center", copy in English
sends every spec request to a German only form, rendered links on /cooling-systems, "GET A QUOTE", "MEHR ERFAHREN", "Request a Specification", "Start a Manufacturing Inquiry" and "KONTAKT" all /anfrage , and https://www.schumacher-verfahrenstechnik.de/anfrage reads "Nehmen Sie jetzt Kontakt mit uns auf", "Ihre Firma", "Jetzt anfragen". Opposite check, /en/anfrage serves the same German form, an English Accept-Language header still gets it, guessed English paths (/en, /inquiry, /contact, /get-a-quote) serve the homepage, and the control phrase "Jetzt anfragen" is found on /anfrage and nowhere else
its privacy box links to another company's policy, the required checkbox on /anfrage links https://www.avermann.eu/service/datenschutz/ , Avermann Laser- und Kant-Zentrum GmbH, Amtsgericht Jena HRB 103667 per https://www.avermann.eu/service/impressum/ , no mention of Schumacher or UFER on either page
cooling integrators and data center teams, https://www.schumacher-verfahrenstechnik.de/cooling-systems "Data Center Operators & Co-Locations", "EPCs & Systems Integrators for Datacenter Cooling"
building Schumacher into a supplier for AI data center cooling, https://www.schumacher-verfahrenstechnik.de/cooling-systems quote from Matthias Ufer "We've built Schumacher to grow with this category"
recheck: 2026-10-03 about 13:00 UTC, /cooling-systems, /anfrage and the avermann pages fetched and rendered this pass. Thesis confidence MEDIUM, the form, the language and the privacy link are proven, how many specs come from outside Germany is inference
```

### Matthias, OPENER

```
Hi Matthias, saw Schumacher Verfahrenstechnik, looks interesting!

However, your English AI cooling page sends every spec request to a German only form, and that form's privacy box links to another company's policy. This causes cooling integrators and data center teams abroad to send their specs to a supplier whose form they don't have to translate.

Especially, when you are building Schumacher into a supplier for AI data center cooling, the specs lost to that form grow with every integrator outside Germany who finds you.

I run Astra agency. We build websites and web tools for brands like Unilever, AXA, Pertamina. I ran global go to market at a software company, where I built the routing that turned inbound requests from every market into pipeline.

Shall I send you over what the English spec request page looks like?
```

---

## Closed and blocked

```sweep
lead: Ollie Bartlett, co-owner of Collier Pickard Ltd (Companies House 04961587), ctc_y3mjzEXbiLzEHSAMB, lea_Nt72238ZBGyv8bzFh. PSC P&B Business Solutions Ltd (15544003) 75%+ since 28 Aug 2025, whose PSCs are Oliver Graham Bartlett and Lawrence James Probert, 25 to 50% each, founders Mike Collier and Simon Pickard retired, announced on https://www.collierpickard.co.uk/uncategorized/new-chapter-for-collier-pickard-welcoming-new-ownership/ 2025-09-15. P&B also owns Tunbridge Wells Hub Ltd (15550689), managed IT, the business his lemlist summary describes, no website found that can be tied to it. Thread empty today
website: COLLIER_PASS1 pages of https://www.collierpickard.co.uk crawled, 306 sitemap URLs listed with dates, the core pages read in full and the homepage screenshot looked at. Rebuilt around a new paid offer, /independent-crm-consultancy/ updated 2026-09-02, Blueprint from £3,500, Recommendation £6,500, Decision £9,500, with an ESU case where they recommended Salesforce they don't implement, five named testimonials, 600+ implementations, a 4 step CRM health check and an AI readiness check. One live case study URL ends "do-x-y-and-z" and the three case studies date from 2024, cleanups
gdpr: tools/eu-view.py https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fwww.collierpickard.co.uk%2F , Snowplow _sp_id and _sp_ses cookies and a visitor identification host secure.imaginativeenterprising-intelligent.com before the CookieYes banner is answered, real under PECR, a settings change, fails the pay test alone
apps: they sell CRM, process and AI readiness work themselves, the health check on https://www.collierpickard.co.uk/your-crm-health-check/ ends in a callback, which is what its page says, nothing to sell them
social: tools/social-audit.js on https://www.linkedin.com/company/collier-pickard 1,049 followers, the site links no social account per site-audit.js with its control, minor for a B2B consultancy
squad: 13 people on https://www.collierpickard.co.uk/meet-the-team/ with three senior technical consultants, two solutions architects and a project manager, no vacancy found by web search, no capacity fact to build a squad message on
verdict: NO_STRONG_ANGLE. New owners, a sharp new offer launched last month and real proof. The pre consent tracking is a favour worth mentioning if he ever replies, not a reason to write
```

```sweep
lead: Steven Uitentuis, CEO of QWIC, ctc_uiZnjF5t5mX8ZDJtc, lea_gJj2EGnLzYQwHK38q. Hired CEO, started Nov 2025 per https://nieuwsfiets.nu/2025/12/31/qwic-is-terug-en-bouwt-zijn-groei-verder-uit-in-2026/ and https://retailtrends.nl/news/77705/co-founder-swapfiets-wordt-ceo-bij-e-bikefabrikant-qwic (2025-12-11), after QWIC's 2023 bankruptcy. https://nieuwsfiets.nu/2024/03/05/fd-nl-hint-op-ecomotion-als-nieuwe-qwic-eigenaar/ quotes the KvK, "EcoMotion als enige aandeelhouder van het nieuwe QWIC staat geregistreerd". Thread empty today
website: not researched past ownership, the 25 Sep crawl of https://www.qwic.nl found a rebuilt brand site with a dealer locator, a crawl started today was stopped once ownership settled the row
gdpr: settled on 25 Sep with tools/eu-view.py from Stockholm, Cookiebot holds trackers back, control allbirds.eu, carried from the 27 Sep sweep file and not re-run
apps: dealer.qwic.nl is their own dealer portal per the 25 Sep crawl of https://www.qwic.nl , not re-run
social: tools/social-audit.js on the accounts in https://www.qwic.nl 's HTML, Instagram qwic_ebikes 6,435 followers, 522 posts, latest 2026-09-29, Facebook qwicnl 12,771, LinkedIn 6,653, active, no angle
squad: an investor owned bike brand with its own team and a hired CEO, the rule's "person who doesn't own the business" case, per https://nieuwsfiets.nu/2024/03/05/fd-nl-hint-op-ecomotion-als-nieuwe-qwic-eigenaar/
verdict: NO_STRONG_ANGLE, CLOSED_NOT_ICP. He runs it, EcoMotion owns it
```

```sweep
lead: Severin Kloos, Algemeen directeur of Dariuz B.V. (KvK 17230178, Eindhoven), ctc_CJGZpaRQxRpP7Qb8e, lea_jqcjaHmrwmLrBydeo. Ownership not provable. Routes tried, North Data via tools/fetch-walled.py (management and shareholders premium only), web searches on his name with Dariuz, on "17230178", on a Kloos holding, transfirm.nl (503), creditsafe (index only), the team page https://www.dariuz.nl/over-ons/team/ "Severin Kloos, Directeur", and the about page, which says Dariuz was built in 2008 on TNO research and the needs of two SW companies. His career per search, product manager, head of product management, business unit manager, then director, reads as employed. Thread empty today
website: 89 pages of https://www.dariuz.nl crawled today and on 25 Sep, a bought theme, decent, not judged further while ownership is open
gdpr: Complianz with reject and 0 trackers before a click per site-audit.js on 25 Sep, clean, carried from the 27 Sep sweep file
apps: they sell their own methodology and HRM software to municipalities per https://www.dariuz.nl , not a buyer for tools, carried
social: tools/social-audit.js on the accounts in https://www.dariuz.nl 's HTML, LinkedIn dariuz 900 followers, twitter.com/dariuznl loaded with no counts readable, UNKNOWN not empty, a B2G seller, no angle
squad: vacancies on https://www.dariuz.nl/category/vacatures/ are a sales manager and a junior IT servicedesk role, no developer seat, carried from 27 Sep
verdict: BLOCKED_NEEDS_INFO. A KvK extract (paid) or Raka's read of his LinkedIn would settle whether he owns any of it. Until then nothing is written to him
```
