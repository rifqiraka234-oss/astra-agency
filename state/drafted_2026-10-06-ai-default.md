<!-- AI default pass drafts, 2026-10-06. Nothing here is sent. -->
# AI default pass, drafts for Raka (2026-10-06)

Every draft here comes from Raka's 2026-10-06 rule (RULES.md 4A, the default angle) and has been through a red team.

### Léo Grandperrin, Axiome, ctc_biurQgp9YgReZKtL9

Red team FIX, leaning KILL. Facts hold at source (method page quote, five people on the team page, no AI anywhere on
their site or LinkedIn). Fixes applied: "before any brand work begins" cut (the audit IS their paid first step),
"competitors multiply per audit" logic replaced, "for each firm" narrowed to firms that start with an audit (clients
can buy one step), block three now says where they work today (their LinkedIn About, present tense) instead of a move,
block five names the outcome. Honest risk: Axiome is five months old with no visible clients, so too much client work
may not be its biggest pain, and Léo runs a second consultancy, GROWTHENGINE (SIREN 106329410, June 2026). He may reply
"we already use ChatGPT for that". Raka's call whether the default AI angle is worth one shot here.

```gate
lead: Léo Grandperrin, co founder and Directeur associé of Axiome (AXIOME AGENCY SAS, SIREN 104 210 075, created 2026-04-24, capital 500 EUR, Présidente Camille de Montgolfier per BODACC A202600833673 and https://www.pappers.fr/entreprise/axiome-agency-104210075 , shareholders not public), ctc_biurQgp9YgReZKtL9. lemlist jobTitle "Co-fondateur", tagline "Associé‑Fondateur & Managing Partner", https://axiomeconseil.eu/cabinet--axiome lists "Léo Grandperrin Directeur associé", re-rendered 2026-10-06. Also Gérant of GROWTHENGINE SARL 106 329 410. Thread pulled 2026-10-06 06:30 UTC, 0 items, nextPage null, sentOnly shows only our 2026-10-04 connect note, positive control Kyson's thread 11 items in the same minute
site pass 1: 5 pages, every sitemap URL, tools/crawl.py then rendered in Chromium because Canva renders in script, every page read, 2026-10-05
site pass 2: 5 pages, second full render with scrolled screenshots desktop 1440 and phone 390 of home, cabinet, expertises, méthode and mentions, plus a third render on 2026-10-06 whose text and anchors are identical to pass 1
deep analysis: A five page Canva site for a five month old brand strategy firm selling to law firms. Its method starts with an in depth audit of offer, message, visibility and competitors, then positioning, story and lawyer biographies, identity and site, and an ongoing editorial, social and media programme, all on a team page of five. No clients, cases, forms or booking, mailto only, and the Contact nav item links only its letter C. LinkedIn and lemlist widen the market to tax and wealth advisers in Belgium, Switzerland and Morocco, which the site never names. No mention of AI anywhere on the site
owner linkedin: Léo is a co founder and Camille is the legal head. Route 1 curl /in/léo-grandperrin-92169711b 999 and /recent-activity/all/ 999. Route 2 web search "Léo Grandperrin" returned only a SoundCloud musician and Léo Grandperret the screenwriter, name collision, unused. Route 3 search linkedin.com/posts léo-grandperrin, nothing. Route 4 the register via BODACC and pappers, Camille Président since 27/04/2026. Route 5 company page via WebFetch and tools/social-audit.js, no posts visible. Route 6 Camille's /in/camille-de-montgolfier-/ 999, search title "Camille de Montgolfier - Axiome", and her site https://camilledemontgolfier.eu/ renders as "Camille de Montgolfier | Autrice"
contact linkedin: Léo is the contact, his co founder status is confirmed by tagline, lemlist jobTitle and the team page, the same six routes as above, his posts are walled at 999
google news: tools/news.py fr 2026-10-06, "Axiome Agency" 0, "Léo Grandperrin" 0, control Carrefour 98. Yesterday "Axiome" 49, all other companies
regional news: tools/news.py (Bordeaux OR Paris) cabinets d'avocats intelligence artificielle 63 results, the Paris bar's AI Academy (Le Monde du Droit 2026-09-24, mesinfos 2026-09-28)
industry news: tools/news.py cabinets d'avocats marque intelligence artificielle 64 results, CNB gives Jimini AI to 4,000 student lawyers (Brief IA 2026-09-15), AI Act steps for lawyers (Wolters Kluwer 2026-07-27), plus village-justice.com and liberall-conseil.com opened 2026-10-05
sources:
1. https://axiomeconseil.eu/
2. https://axiomeconseil.eu/cabinet--axiome
3. https://axiomeconseil.eu/expertises--axiome
4. https://axiomeconseil.eu/mthode--axiome
5. https://axiomeconseil.eu/mentions-lgales--axiome
6. https://axiomeconseil.eu/sitemap.xml
7. https://www.bodacc.fr/pages/annonces-commerciales-detail/?q.id=id:A202600833673 (via the BODACC open data API)
8. https://www.pappers.fr/entreprise/axiome-agency-104210075
9. https://recherche-entreprises.api.gouv.fr/search?nom_personne=grandperrin&prenoms_personne=leo
10. https://fr.linkedin.com/company/axiome- (WebFetch and tools/social-audit.js)
11. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Faxiomeconseil.eu%2F (tools/eu-view.py)
12. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Faxiome.agency%2F (409 DNS resolution error)
13. https://api.ssllabs.com/api/v3/analyze?host=axiome.agency
14. https://dns.google/resolve?name=axiome.agency&type=A
15. https://www.village-justice.com/articles/etude-comparative-marketing-juridique-france-etats-unis-les-chiffres-cles,54568.html
16. https://news.google.com/rss (tools/news.py, company, person, region, industry, control)
17. https://www.linkedin.com/in/l%C3%A9o-grandperrin-92169711b (999, walled)
pains: 9 judged. (1) the per client audit of offer, message, visibility and competitors on five people, chosen. (2) market widening to tax and wealth advisers in four countries, which grows (1). (3) mailto only and a Contact link that works on its letter C, a favour. (4) axiome.agency doesn't open, proven two ways with a same IP control, a heads up for Raka because they build sites. (5) the site names none of the new markets, their own trade. (6) the LinkedIn tagline changed overnight, context. (7) no funding, capital 500 EUR unchanged. (8) an open hiring call with no role. (9) Build Squad, failed yesterday on the frontend developer
chosen: (1), the costliest, the audit is step one of their own method, and it scales with every firm, audience and country they add, so it caps how many clients five people can take
sweep website: five page Canva site rendered three times, https://axiomeconseil.eu/ modern and minimal, sitemap 2026-08-18, no proof, Contact links only its C, axiome.agency gives Cloudflare 1001 from two paths with control axiomeconseil.eu on the same IP, but they sell Site themselves, not chosen
sweep gdpr: tools/eu-view.py from Stockholm on https://axiomeconseil.eu/ 2026-10-06, 2 first party cookies __cf_bm and CCDA, 0 third party, no forms, clean
sweep apps: https://axiomeconseil.eu/mthode--axiome starts with an audit of offer, message, visibility and competitors, five people on https://axiomeconseil.eu/cabinet--axiome , 0 AI mentions in the rendered site, chosen under the 2026-10-06 default rule
sweep social: tools/social-audit.js on https://www.linkedin.com/company/axiome- read 203 followers and the bio "Cabinet de conseil en image et communi", no posts visible, control lemlist's page showed posts on the same route yesterday, they sell social themselves, not chosen
sweep squad: Stanya Palmaro, Responsable digital on https://axiomeconseil.eu/cabinet--axiome , search title Experienced Frontend Developer, freelancer, no client volume or delivery times shown, not chosen
thread: problem the method starts with an audit of offer, message, visibility and competitors and the team page lists five people | cost the five rebuild that research for every firm that starts with an audit, which caps how many they take on, and each new market is a landscape to learn | offer the AI workflow for taking on more firms | link firm
lead read: Léo reads that his method opens with a deep audit and his team is five, so each firm that buys an audit means rebuilding that research and caps how many they take on, that working across four countries and two professions grows the landscape to learn, and gets offered the AI workflow for taking on more firms, one thread
claims:
your method starts with an audit of the firm's offer, message, visibility and competitors, https://axiomeconseil.eu/mthode--axiome "Nous menons un audit approfondi de votre position actuelle : offre, discours, visibilité, ainsi que votre environnement concurrentiel", (step 1, Comprendre). Disproof: https://axiomeconseil.eu/expertises--axiome says clients can take "une étape ou l'ensemble", so the message says the method starts with it, never that every client gets it, rechecked 2026-10-06
your team page lists five people, https://axiomeconseil.eu/cabinet--axiome Camille de Montgolfier, Léo Grandperrin, Margaux Bastard de Crisnay, Stanya Palmaro, Odile Sageat, rechecked 2026-10-06
taking Axiome to tax and wealth advisers in Belgium, Switzerland and Morocco as well as law firms, https://fr.linkedin.com/company/axiome- About "Axiome accompagne les acteurs des affaires et du patrimoine", serving law firms, tax specialists and wealth advisers across France, Belgium, Switzerland and Morocco, and lemlist companyDescription "cabinets d'avocats d'affaires, fiscalistes et conseils patrimoniaux ... en France, en Belgique, en Suisse et au Maroc", rechecked 2026-10-06
recheck: 2026-10-06 06:40 UTC, all five pages re-rendered with text identical to pass 1, the audit sentence and the five names found in the fresh render, LinkedIn About refetched, thread re-pulled at 06:30 with control. Thesis confidence MEDIUM, the audit and the team size are proven on their own pages, that the audit eats enough hours to buy a workflow is inference, and they may already use AI tools internally
```

OPENER
```
Hi Léo, saw Axiome, looks interesting!

However, your method starts with an audit of the firm's offer, message, visibility and competitors, and your team page lists five people. This causes the five of you to rebuild that research for every firm that buys an audit, which caps how many you can take on.

Especially, when you are working with tax and wealth advisers as well as law firms across France, Belgium, Switzerland and Morocco, the competitive landscape you've got to learn grows with every new market.

I run Astra agency. We build AI workflows and apps for brands like Unilever, AXA, Pertamina. I built automation driven revenue workflows at Betty Blocks covering enrichment, scoring and routing, so I've seen which research steps a machine can take off a small team.

Shall I send you over what the AI workflow for taking on more firms looks like?
```
