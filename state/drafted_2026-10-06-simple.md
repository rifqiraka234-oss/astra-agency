<!-- Simpler redraft, 2026-10-06, Raka: "everything sounds a bit too technical, make it much more simple, just go like AI workflow". Supersedes the texts in drafted_2026-10-06-ai-default.md and drafted_2026-10-06-julien.md. Facts unchanged, all from the red teamed versions. Nothing sent. -->
# Simpler redraft for Raka, 2026-10-06

### Julien Facchini, BeHype, ctc_MPwYm8GzGQtTBp3yM

REPLY
```
Thanks Julien! We're an agency building websites, apps and AI workflows, for brands like Unilever, AXA and Pertamina.

What are you building at the moment?
```

### Léo Grandperrin, Axiome, ctc_biurQgp9YgReZKtL9

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
thread: problem the method starts with an audit of offer, message, visibility and competitors and the team page lists five people | cost the five rebuild that research for every firm that starts with an audit, which caps how many they take on, and each new market is a landscape to learn | offer see block five | link audit
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

However, your method starts with a full audit, and there are five of you. This causes the same kind of research to be done again and again, which limits how many clients you can take on.

Especially, when you are working across France, Belgium, Switzerland and Morocco, the research you've got to do grows with every new market.

I run Astra agency. We build AI workflows for brands like Unilever, AXA, Pertamina. I set up automated sales workflows at Betty Blocks, so I know which work a machine can take off a small team.

Shall I send you over what the AI workflow for your audits looks like?
```

### Laurent Fournié, Winter, ctc_e5TddBr53qxiLyida

```gate
lead: Laurent Fournié, Président de SAS and sole listed dirigeant of WINTER SAS (SIREN 917767451, created 19 Jul 2022, renamed from Don de Chaleur 5 Oct 2023, active, Le Bourget-du-Lac) per https://recherche-entreprises.api.gouv.fr/search?q=917767451 and https://www.pappers.fr/entreprise/winter-917767451 . He's named directeur de la publication on https://www.winter-energies.fr/mentions-legales . contactId ctc_e5TddBr53qxiLyida, campaign cam_Csq9BikBWz7dNqSs4. lemlist tagline "Co-Founder @Winter | App Watt Watchers". The "ex" in his jobTitle is the company's old name, not a former employer. Thread re-pulled 2026-10-06 at about 06:38 UTC: 0 activities, nextPage null. sentOnly searches for the name and for "Winter" return only ibx_ARn3TmDuXRRBXjzt2, our 5 Oct connect note, lastRepliedAt null. Positive control ctc_SYhzxxMTBCWtodyt6 came back with 2 activities in the same minute
site pass 1: 8 pages by link crawl, all 200, home, /theme/solutions-b2b2c, /mentions-legales, /politique-de-confidentialite, /politique-des-cookies, /cgu, /faq, /theme/sortir-energies-fossiles-transition-energetique, plus https://www.winter-energies.fr/api/sitemap.xml listing 469 URLs (173 articles, 290 mots-cles, 3 theme pages)
site pass 2: 8 pages, second full read matching pass 1. site-audit.js printed RENDER NOT TRUSTED, so its screenshots are void. render-via-curl.js served 89 requests with 0 curl errors, giving desktop and phone views of the home page. A Playwright full page of the B2B2C page, every rendered anchor listed. The judge refetched the B2B page, the home page and /cgu at about 06:40 UTC
deep analysis: A modern Next.js consumer site, all of it selling a free CEE funded energy app to households, with an active SEO content operation of 469 URLs. The paying side is B2B, energy suppliers, equipment makers and local authorities buying a white label or API version, "opérationnelle dès octobre 2026". It lives on one page behind "Partenaires". That page says "voici ce que nos partenaires font concrètement avec nos briques" and names none of them. It has no case study, no form, and every sales button including "Prendre rendez-vous" opens an email to Laurent. The household programme ends 31 Dec 2027 per the convention, so the B2B offer carries the business after that
owner linkedin: route 1 curl https://www.linkedin.com/in/laurent-fourni%C3%A9/ 999. Route 2 web search on his name with Winter, profile title and older posts (ENGIE, Don de Chaleur), plus a snippet of a partner call, not opened. Route 3 linkedin.com/posts search, snippet only. Route 4 Pappers, former DG Matthieu Sattler. Route 5 company page https://www.linkedin.com/company/winter-energies/ read, CapConfort post about 1 Oct 2026. Route 6 his own site's mentions légales and the B2B mailto
contact linkedin: same person as the owner, confirmed by the register naming him Président de SAS and by the lemlist tagline "Co-Founder @Winter", with the same six routes as above
google news: tools/news.py fr, "Winter Watt Watchers" 0 results, person query 1 real hit (Le Dauphiné Libéré 2025-05-27, Watt Watchers app article, not opened at source), control Carrefour 98
regional news: tools/news.py Savoie and Le Bourget-du-Lac, the Le Dauphiné 2025-05-27 local piece on the app, nothing newer
industry news: tools/news.py CEE reform, June 2026 headlines on turning CEE into "certificats d'électrification" (AEF info 2026-06-12, Batiactu 2026-06-16, Caradisiac 2026-06-12, headlines only), plus actu-environnement on the Watt Watchers winter data study and the CapConfort consortium site
sources:
1. https://recherche-entreprises.api.gouv.fr/search?q=917767451
2. https://www.pappers.fr/entreprise/winter-917767451
3. https://www.winter-energies.fr/
4. https://www.winter-energies.fr/theme/solutions-b2b2c
5. https://www.winter-energies.fr/cgu
6. https://www.winter-energies.fr/mentions-legales
7. https://www.winter-energies.fr/api/sitemap.xml
8. https://www.ecologie.gouv.fr/sites/default/files/documents/Convention_Watt%20Watchers.pdf
9. https://frene.org/wp-content/uploads/2026/06/APPEL-A-PARTENARIATS-deploiement-doperations-Watt-Watchers.pdf
10. https://www.actu-environnement.com/ae/news/programme-cee-watt-watchers-donnees-compteurs-communicants-consommations-energie-chauffage-47993.php4
11. https://www.eniplenitude.fr/en-lumiere/energies-renouvelables/economies-d-energie/application-watt-watchers
12. https://apps.apple.com/fr/app/watt-watchers-suivi-%C3%A9nergies/id6744521151
13. https://play.google.com/store/apps/details?id=com.winter.wattwatchers&hl=fr&gl=FR
14. https://www.linkedin.com/company/winter-energies/
15. https://www.instagram.com/watt_watchers/
16. http://www.cap-confort.fr/
17. https://webbkoll.5july.net (tools/eu-view.py)
pains: 7 judged. (1) The partner page names no partner and every sales button is a mailto to Laurent, on the one page that sells to paying buyers as the B2B offer launches, CHOSEN. (2) Consumer site, modern, nothing material. (3) Tweaks, dead Espace presse link, 4.7 rating against live 4.6 and 4.2, lp. URL 404, an afternoon each. (4) GDPR, Axeptio with a reject path, only GTM before consent, no leak. (5) Apps and AI intake, they're a software team, folded into 1. (6) Social, active on LinkedIn and Instagram. (7) Build Squad, no capacity fact to name
chosen: (1), the costliest, because the white label B2B offer launching October 2026 is what Winter sells once the CEE funded household programme ends on 31 Dec 2027, and the only page selling it shows buyers no named partner and routes every meeting through one inbox
sweep website: https://www.winter-energies.fr/theme/solutions-b2b2c names no partner or client, grep with a Sonergia control on /cgu, all five sales buttons mailto Laurent, 0 forms, CHOSEN. Consumer home is modern per render-via-curl.js screenshots, not chosen
sweep gdpr: tools/eu-view.py from Stockholm on https://www.winter-energies.fr/ , 3 Axeptio cookies only, googletagmanager requested before consent with no GA or ad cookies, banner with a reject path, not chosen
sweep apps: B2B intake is mailto with a manual reply per https://www.winter-energies.fr/theme/solutions-b2b2c , but Winter builds its own app, Linky and Gazpar connectors and an API, so an AI tool fails the already run it check, folded into the site offer
sweep social: tools/social-audit.js on accounts from their HTML, https://www.linkedin.com/company/winter-energies/ 2,875 followers posted about 1 Oct 2026, Instagram watt_watchers 2,551 followers posted 24 Sep 2026, Facebook 610, healthy, not chosen
sweep squad: INSEE band 10 to 19 staff per https://recherche-entreprises.api.gouv.fr/search?q=917767451 , no careers page, the Nous rejoindre button is a mailto, no hiring signal, no capacity fact to name, not chosen
thread: problem the partner page names no partner and its meeting button only opens an email | cost buyers take the offer upstairs with no live client to point to, and more buyers means more find none | offer see block five | link partner
lead read: Laurent reads that his partner page names no partner and only offers an email, so buyers have no live client to point to as the white label offer opens, and gets offered the partner site that wins supplier meetings, one thread
claims:
your partner page shows suppliers what your partners do, https://www.winter-energies.fr/theme/solutions-b2b2c "Fournisseurs d'énergie, fabricants d'équipements, collectivités territoriales : voici ce que nos partenaires font concrètement avec nos briques", rechecked 06:40 UTC
names none of them, https://www.winter-energies.fr/theme/solutions-b2b2c grep for EDF, Eni, Plenitude, Dyneff, Hellio, CapConfort, ADEME, Sonergia, CSTB, "Ils nous font confiance", "étude de cas" all 0, control https://www.winter-energies.fr/cgu Sonergia ×6, rechecked 06:40 UTC
even its meeting button opens an email to you, https://www.winter-energies.fr/theme/solutions-b2b2c "Prendre rendez-vous" href mailto:laurent.fournie@winter-energies.fr, 0 forms, rechecked 06:40 UTC
suppliers and local authorities are the buyers, https://www.winter-energies.fr/theme/solutions-b2b2c "Fournisseurs d'énergie" and "collectivités territoriales", rechecked 06:40 UTC
the white label offer opens this October, https://www.winter-energies.fr/theme/solutions-b2b2c "Solutions B2B2C en marque blanche" and "opérationnelle dès octobre 2026", rechecked 06:40 UTC
the CEE programme runs to its end in 2027, https://www.ecologie.gouv.fr/sites/default/files/documents/Convention_Watt%20Watchers.pdf "Le programme ... prendra fin au 31 décembre 2027" (researcher extract), and https://www.winter-energies.fr/ FAQ "pour la période 2024-2027, éligible aux Certificats d'Économies d'Énergie (CEE)"
Raka on go to market at Betty Blocks for a year and a half, https://www.linkedin.com/in/raka-mulya-b92885196 Global GTM & Campaign Manager Aug 2024 to Feb 2026 per docs/astra-master-context.md 2A
recheck: 2026-10-06 about 06:40 UTC. The thread was re-pulled with a control, the B2B page, home and /cgu were refetched, and every quoted line above was found in the fresh copy. The convention end date was not reopened by the judge but is confirmed independently by the live home FAQ "2024-2027". Thesis confidence MEDIUM. The facts are proven live. That buyers stall without named proof is inference he can test against his own pipeline, and the names may be withheld on purpose
```

OPENER
```
Hi Laurent, saw Winter, looks interesting!

However, your partner page doesn't name a single partner, and the meeting button just opens an email. This causes buyers to have no client to point to when they take your offer to their boss.

Especially, when you are launching the white label offer this month, the more buyers you reach, the more of them look for proof and don't find it.

I run Astra agency. We build websites for brands like Unilever, AXA, Pertamina. I worked on go to market at Betty Blocks, a software company, where buyers always asked who else used it first.

Shall I send you over what the partner page that books meetings looks like?
```

### Steven Prins, Bulgarian Wine Hub, ctc_3S6EA258AheDuBKi5

```gate
lead: Steven De Prins (lemlist "Steven Prins"), Co-Owner of Bulgarian Wine Hub, ctc_3S6EA258AheDuBKi5, lea_2pJ8C4iNEskyKzLcb. The shop is operated by AYLYAK BV per https://www.bulgarianwinehub.be/policies/legal-notice ("owned and operated by Aylyak Rosstal 3 3140 Keerbergen", VAT BE0778759649, effective 27/04/2026). KBO https://kbopub.economie.fgov.be/kbopub/toonondernemingps.html?ondernemingsnummer=0778759649 gives AYLYAK, active since 17 Dec 2021, Director De Prins Steven, and adds 46.341 wholesale of wine and spirits, 46.349 wholesale of beverages, 47.251 retail sale of wine and 73.110 advertising since 12 May 2026. An owner. Thread pulled 2026-10-06 06:20 UTC, 2 items, connect note 26 Jul and our opener 26 Aug, no reply. sentOnly search "Steven Prins" returns only this contact, teamConversations searches on "Steven De Prins" and "Bulgarian Wine Hub" return 0, state grep finds the 26 Aug digest row and the 30 Sep audit row only
site pass 1: 80 URLs by tools/crawl.py on https://www.bulgarianwinehub.be/ (capped, Shopify variant links queued), 51 distinct page URLs in EN, NL and FR, all fetched with curl and grepped, homepage, 6 collections, 59 products via products.json, about-us, our-partners, our-wine-regions, b2b, winetasting, contact, policies
site pass 2: 51 URLs, second full fetch of every page into bwhp/ and grepped for trade wording, the B2B page rendered with tools/site-audit.js (RENDER NOT TRUSTED, 4 of 4 failed assets fine by direct fetch, so void) and again with tools/render-via-curl.js, screenshot /tmp/claude-0/nsa01_bwh_b2b_curl-curlrender.png opened, heading, one paragraph and a five field form, desktop, phone screenshot void with the first run
deep analysis: A rebuilt Shopify shop, trilingual, 59 Bulgarian wines from six named wineries with long tasting notes, gift cards, boxes, a tasting service where "Every wine tasting is discussed personally", a contact page that aims "to respond to all inquiries on the same business day", and a B2B page. The B2B page's meta description says "We offer see block five | Import & Distribution for Businesses", and the body is "Are you interested in a partnership or would you like more information about our wines? Get in touch with us" plus name, business email, company, Chamber of Commerce number and a message box. No trade price, minimum, delivery term, range sheet or ordering route exists anywhere on the 51 pages in any of the three languages. The company added wine wholesale to its activities in May 2026, so trade buyers are where it's heading, and the page they land on asks them to write in first
owner linkedin: route 1 curl https://www.linkedin.com/in/stevendeprins 999. Route 2 web search "Steven De Prins" "Bulgarian Wine Hub", the rocketreach result title ties him to Bulgarian Wine Hub in Keerbergen (tier G). Route 3 company page https://www.linkedin.com/company/bulgarian-wine-hub 999. Route 4 the lemlist experience list, Pre-Sales Manager at Simac ICT Belgium, Founder & Owner at Aylyak Consulting, Co-Owner at Bulgarian Wine Hub. Route 5 KBO, director of AYLYAK. Route 6 Instagram from the site's HTML, read with social-audit.js, a shop account with no personal posts. A "Wine Generator" Facebook page in Sofia carries the brand name in its URL and can't be tied to him, left out
contact linkedin: same person as the owner, the lemlist record, the KBO director and the legal notice address all agree on Steven De Prins in Keerbergen, same six routes
google news: tools/news.py nl, "Bulgarian Wine Hub" 0 results, "Steven De Prins" 2 results (2024 Grimbergen local politics and a 2021 brocante, not him or not provably him, unused), control Heineken 100
regional news: tools/news.py (Belgium OR Belgie) (Bulgaarse wijn) 6 results, Bulgarian cigarettes and the Songfestival, nothing on Bulgarian wine in Belgium
industry news: tools/news.py Bulgaarse wijn 0 relevant, plus the six partner wineries on https://www.bulgarianwinehub.be/pages/our-partners as the supply side
sources:
1. https://www.bulgarianwinehub.be/pages/b2b
2. https://www.bulgarianwinehub.be/policies/legal-notice
3. https://kbopub.economie.fgov.be/kbopub/toonondernemingps.html?ondernemingsnummer=0778759649
4. https://www.bulgarianwinehub.be/products.json?limit=250
5. https://www.bulgarianwinehub.be/pages/winetasting
6. https://www.bulgarianwinehub.be/pages/contact
7. https://www.bulgarianwinehub.be/pages/our-partners
8. https://www.bulgarianwinehub.be/pages/about-us
9. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fwww.bulgarianwinehub.be (tools/eu-view.py)
10. https://www.instagram.com/bulgarianwinehub (tools/social-audit.js)
11. https://rocketreach.co/steven-de-prins-email_67879976 (search result title only)
12. https://www.linkedin.com/in/stevendeprins (999, walled)
13. https://news.google.com (tools/news.py, three queries)
14. https://web.archive.org/cdx/search/cdx?url=bulgarianwinehub.be (timed out twice, walled)
pains: 5 judged. (1) B2B, they offer import and distribution to restaurants, bars and wine shops and added wholesale in May 2026, yet a trade buyer gets one paragraph and a form with no prices, terms or range, so every trade lead waits on the owner to write back, costliest because trade accounts reorder by the case and it's where the company is heading. (2) Tastings, "Every wine tasting is discussed personally", a manual proposal per request, real but volume unknown and smaller. (3) Reviews, none on product pages, an afternoon's app install, fails the pay test. (4) Social, Instagram 124 followers, 10 posts, latest 2026-09-27, alive and early, not the pain. (5) GDPR, the Shopify banner is set to BE only and they deliver in Belgium only, so the market they sell in gets the banner, clean
chosen: (1), costliest, the trade channel is the bigger revenue line and the newest direction on the register, and the page meant to open it makes every buyer ask first
sweep website: https://www.bulgarianwinehub.be/pages/b2b rendered via tools/render-via-curl.js, one paragraph and a form, 0 of 51 pages carry trade prices, horeca, wholesale, groothandel, tarif or minimum wording, control "tasting" found on 46 pages through the same grep, chosen
sweep gdpr: tools/eu-view.py --shopify from Stockholm, 10 first party cookies including _ga and _gcl_au, banner regionVisibility ["BE"], the legal notice says they deliver within Belgium only, so Belgian visitors get the banner, not chosen
sweep apps: the tasting flow on https://www.bulgarianwinehub.be/pages/winetasting is handled personally per request, an AI proposal workflow is possible, folded into the trade site offer only as a later step, not the lead pain
sweep social: tools/social-audit.js on https://www.instagram.com/bulgarianwinehub from the site's HTML, 124 followers, 10 posts, latest 2026-09-27, alive, not chosen
sweep squad: a two owner shop run beside a full time job per the lemlist record, it doesn't build software, nothing for a squad, not chosen
thread: problem they offer import and distribution to restaurants, bars and wine shops but the B2B page is one paragraph and a form with only consumer terms on the site | cost every trade buyer has to email before knowing what ordering looks like | offer the trade site for restaurant, bar and shop buyers | link trade
lead read: Steven reads that the August point is fixed, that trade buyers find one paragraph, a form and consumer only terms so they must email first, and gets offered the trade site for his restaurant, bar and shop buyers, one thread
claims:
your new tasting notes, https://www.bulgarianwinehub.be/products.json?limit=250 every wine 72 to 231 words, rechecked 06:45 UTC
you offer import and distribution to restaurants, bars and wine shops, https://www.bulgarianwinehub.be/pages/b2b meta description "We offer direct import and distribution for restaurants, bars and wine shops. Based in Belgium.", rechecked 06:42 UTC
your B2B page gives them one paragraph and a form, https://www.bulgarianwinehub.be/pages/b2b main content and the render-via-curl screenshot, rechecked 06:42 UTC
no trade prices or terms, the 51 page grep across https://www.bulgarianwinehub.be/ EN, NL and FR, 0 hits on 16 trade terms, control "tasting" 46 pages, rechecked 06:45 UTC
I built Eten Maar, a food brand, from zero and owned its partnerships and pricing, https://www.linkedin.com/in/raka-mulya-b92885196 as transcribed in docs/astra-master-context.md section 2A
recheck: 2026-10-06 06:45 UTC, the B2B page, products.json and the grep rerun, every claim held, the thread pulled at 06:20 with no new activity. Thesis confidence MEDIUM, the page and the register are proven, that trade buyers drop off before writing in is inference he can test against his own inbox
```

NUDGE
```
Hi Steven, I wrote in August about the wine descriptions, and the new tasting notes fix that.

You also sell to restaurants, bars and wine shops, but there's no trade price list, trade terms or ordering on the site, so every trade buyer has to email you before they can order.

Shall I send you over what the trade shop for restaurants and bars looks like?
```

### Vincent Bucaille, Melba, ctc_xtQnzSvvms6TEoAxS

```gate
lead: Vincent Bucaille, Co-Founder of Melba SAS (SIREN 904449568), ctc_xtQnzSvvms6TEoAxS, lemlist jobTitle "Co-Founder", tagline "Co-founder at Melba", domain melba.app. https://recherche-entreprises.api.gouv.fr/search?q=904449568 gives Président BUCAILLE & ASSOCIES CONSULTING, gérant Vincent Bucaille, DG Lucie Broto. https://www.melba.app/faq "Melba est née de la rencontre entre Lucie et Vincent". Thread re pulled 2026-10-06 06:31 UTC, 0 activities, sentOnly one row with the 5 Oct connect note, company search 0 rows, control ctc_MPwYm8GzGQtTBp3yM full in the same minute
site pass 1: 35 URLs by tools/crawl.py from https://www.melba.app and its sitemap, 31 at 200 and 4 at 404, every page read
site pass 2: 35 URLs, second full read, plus 8 key pages and en.melba.app refetched by the judge at 06:35 and 06:47 UTC, screenshots of home, faq and press, desktop and phone, site-audit.js render trusted
deep analysis: A 2022 Webflow download page in FR with a Weglot EN copy that sends visitors to the stores, while Stripe Checkout on pay.melba.app and Convertri funnels run apart from it. Google Analytics and Amplitude start on load with no consent code anywhere. The privacy policy predates the 2023 rename, still says Teasy and Maubeuge, and says nothing about cookies or analytics. Teasy template pages from 2022, a dead Magazine link and dead teasy.onelink.me links complete the picture of a site nobody has owned since launch, on a brand whose whole promise is a private space for couples
owner linkedin: route 1 curl /in/vbucaille and /recent-activity/all/ 429. Route 2 web search "Vincent Bucaille Melba LinkedIn", Crunchbase and avizio titles, one other Vincent Bucaille ignored. Route 3 his post https://fr.linkedin.com/posts/vbucaille_melba-la-voix-qui-vous-guide-sur-la-voie-activity-7037345384523812864-b3gZ . Route 4 rocketreach snippet only. Route 5 company page https://fr.linkedin.com/company/melba-fr , 1,263 followers. Route 6 the FAQ founder line
contact linkedin: same person as owner, confirmed by the lemlist record, the statutory Président holding and the FAQ founder line | six routes as above
google news: tools/news.py fr, "Melba" 100 mostly unrelated, "Vincent Bucaille" 10 with Challenges 2025-03-27 and La Dépêche 2024-12-06, control Carrefour 98
regional news: tools/news.py Paris and Bordeaux startup query 0, france3-regions 2025-02-14 opened, about 500,000 users and the US at 30% of subscriptions
industry news: tools/news.py sextech and couple app 80 generic, plus Stratégies 2024-09-06 on the Libre Mullenlowe launch campaign and sextechforgood.org on Station F FemTech
sources:
1. https://www.melba.app/
2. https://en.melba.app/
3. https://www.melba.app/politique-de-confidentialite
4. https://www.melba.app/faq
5. https://www.melba.app/conditions-generales-vente
6. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fmelba.app
7. https://recherche-entreprises.api.gouv.fr/search?q=904449568
8. https://www.pappers.fr/entreprise/melba-904449568
9. https://bodacc-datadila.opendatasoft.com/
10. https://apps.apple.com/fr/app/id1617445144
11. https://play.google.com/store/apps/details?id=io.melba.app&hl=en&gl=fr
12. https://www.axeptio.eu/fr
13. https://www.didomi.io/
14. https://www.sextechforgood.org/post/melba-le-nouveau-gps-des-couples
15. https://fr.linkedin.com/company/melba-fr
pains: 6 judged, (1) store only billing, killed by pay.melba.app, (2) Google Analytics and Amplitude before consent with a policy silent on cookies and still naming Teasy, (3) dead Magazine link, Teasy template pages and dead onelink links, (4) AI workflow for therapist codes and support, (5) dormant Instagram, (6) Build Squad capacity
chosen: (2), the hottest, a privacy fault on a brand that sells a private space for couples hits trust at the moment of download and sits in front of every investor diligence while capital keeps coming in, and Raka's standing rule makes a GDPR fault pitchable as proof of the bigger thing, the privacy safe site
sweep website: https://www.melba.app/ sends visitors to the stores while pay.melba.app and the Convertri funnels sit apart, Teasy template pages and a dead Magazine link remain, folded into the privacy thread
sweep gdpr: tools/eu-view.py from Stockholm on https://melba.app , _ga, _ga_SZZR4LNBQX and amp_0250eb before a click, no consent tool against axeptio and didomi controls, policy silent on cookies and naming Teasy, chosen
sweep apps: https://www.melba.app/therapeutes codes handed out by email and https://www.melba.app/contact replies within 24h by hand, an AI workflow fits but no volume is proven, not chosen
sweep social: tools/social-audit.js on the links in their HTML, https://www.instagram.com/melba.app/ 19,736 followers last post 2025-09-04, Facebook dates behind the login, not chosen
sweep squad: https://join.com/companies/melba no open positions, team 2 to 10, releases all minor bug fixes, a capacity shortfall isn't proven from outside, not chosen
thread: problem the website starts Google Analytics and Amplitude before visitors agree and the privacy policy still names Teasy | cost the gap between what the site does and what the policy says gets checked in investor diligence as capital keeps coming in | offer see block five | link privacy
lead read: Vincent reads that his site starts Google Analytics and Amplitude before visitors agree while his policy still names Teasy and never mentions cookies, that this is the kind of gap investor due diligence picks up as new capital comes in, and gets offered the privacy safe Melba website, one thread
claims:
Heineken credential, docs/astra-master-context.md section 2A, Global E-Business Data and Insights Lead, enabled 23 markets with self serve insights, data governance across regions, https://www.theheinekencompany.com
Teasy name change, BODACC 2023-07-05 name changed to MELBA, policy still names Teasy and 56 rue de Maubeuge, https://www.bodacc.fr
your website starts Google Analytics and Amplitude before visitors agree to anything, https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fmelba.app cookies _ga, _ga_SZZR4LNBQX, amp_0250eb set with nothing clicked, and https://www.melba.app/ HTML gtag('config', 'G-SZZR4LNBQX') and amplitude.getInstance().init with no consent tool, rechecked 06:47 UTC
your privacy policy never mentions cookies, https://www.melba.app/politique-de-confidentialite 0 hits for cookie, traceur, Google Analytics and Amplitude, rechecked 06:47 UTC
your privacy policy still names Teasy, https://www.melba.app/politique-de-confidentialite "Teasy est le nom commercial de la société par actions simplifiée du même nom" and "Par courrier : Teasy 56 rue de Maubeuge 75009 Paris", rechecked 06:47 UTC
raising capital this year, https://bodacc-datadila.opendatasoft.com/ registre 904449568, capital increases published 2026-01-30, 2026-03-24 and 2026-05-26 rechecked by the judge 06:49 UTC through the BODACC API, no amounts used
recheck: 2026-10-06 06:47 UTC, eu-view.py rerun on https://melba.app , home HTML on www and en grepped with the axeptio and didomi controls, privacy policy refetched (200) and both Teasy lines quoted from the fresh copy. Thesis confidence MEDIUM, the faults are on their own pages and that it costs trust and diligence is inference
```

OPENER
```
Hi Vincent, saw Melba, looks interesting!

However, your website starts tracking visitors before they agree to cookies, and your privacy policy still says Teasy. This causes people to be tracked before they've agreed, on a site where trust matters a lot.

Especially, when you are bringing in new capital this year, the gap between your site and your policy is the kind of thing investors pick up.

I run Astra agency. We build websites for brands like Unilever, AXA, Pertamina. I was Heineken's global data and insights lead, where data governance was part of the job, so I know how to keep your numbers and still ask first.

Shall I send you over what the privacy safe Melba website looks like?
```

### Mykyta Kharchenko, IOTENTIC, ctc_2gRN4DKWsstCjknF6

```gate
lead: Mykyta Kharchenko, IOTENTIC GmbH (HRB 803500, Herrenberg), ctc_2gRN4DKWsstCjknF6, lea_3h2c3xzR4wwXRoeTC
site pass 1: 15 pages (31 URLs, 16 were ${findUrl} template 404s from the builder's script), sitemap plus link crawl with tools/crawl.py, every page read
site pass 2: 15 pages, second full crawl, same count, site-audit.js desktop and phone screenshots of the homepage
deep analysis: IONOS MyWebsite NOW site. Home, Leistungen, Partner (7 partners incl. FORCAM ENISCO, Cybus, Pusch-Data, VDW umati, Battery Advisors, RESYCON), Founders (three MDs with Cellforce, Zeltwanger, groninger backgrounds), News (three items Apr to Jul 2026), Karriere (Automation Engineer, Werkstudent), Kontakt (one form). Page titles are English, body text is German on all 15 (crawl lang de on all 15). No reference projects or client cases of their own anywhere. English comes only from a consent gated Google Translate widget with no English URLs
owner linkedin: route 1 lemlist record read. Route 2 web search "Mykyta Kharchenko" IOTENTIC, northdata and registercheck listings, GF since 2026-01-19. Route 3 company page https://www.linkedin.com/company/iotentic-gmbh with social-audit.js, 198 followers, "From automation to innovation". Route 4 /in/ profile 999. Route 5 no social linked from the HTML (site-audit.js NONE LINKED against control). Route 6 zoominfo result for the same name at EPAM, not tied to him, not used
contact linkedin: same person, an owner manager and the person messaged, Impressum and lemlist agree
google news: tools/news.py de, "IOTENTIC" 0, "Mykyta Kharchenko" 0, control Volkswagen 102
regional news: tools/news.py (Herrenberg OR Böblingen) (MES Integration Batterie Gigafactory) 0
industry news: tools/news.py MES Integration Batterie Gigafactory 0, plus their own /news/ page, FORCAM ENISCO adding IOTENTIC to its AI in manufacturing partner network (2026-07-14) and MOVEMORE Kompetenzverbund (2026-05-04)
sources:
1. https://www.iotentic.com/
2. https://www.iotentic.com/founders/
3. https://www.iotentic.com/karriere/
4. https://www.iotentic.com/partner/
5. https://www.iotentic.com/news/
6. https://www.iotentic.com/leistungen/
7. https://www.iotentic.com/impressum/
8. https://www.northdata.de/IOTENTIC%20GmbH,%20Herrenberg/Amtsgericht%20Stuttgart%20HRB%20803500 (search result)
9. https://www.registercheck.de/companies/iotentic-gmbh (search result)
10. https://www.linkedin.com/company/iotentic-gmbh
11. https://news.google.com (tools/news.py, four queries plus control)
12. https://www.linkedin.com/in/mykyta-kharchenko-75997423b (walled, 999)
pains: 4 judged. (1) a firm that calls itself worldwide reaches foreign buyers only through a consent gated machine translation, biggest given where they say they're going. (2) no reference projects of their own, real and costly for a new integrator, but the fix is content they have to supply, folded into (1) as the site rebuild. (3) A, efficiency, fails, they sell automation and AI themselves. (4) GDPR, IONOS banner with reject, 0 trackers before a click, clean
chosen: (1), biggest, it's the site that every foreign buyer reads, and the gap is provable in their own HTML
sweep website: 15 pages crawled twice, German body text everywhere, English only via Google Translate after consent, the B angle
sweep gdpr: site-audit.js banner yes, reject present, 0 cookies, 0 third party before a click, no consent code so no geo rule, clean
sweep apps: they sell automation, data visualisation and AI supported decisions, A fails by the brief's own rule
sweep social: social-audit.js on https://www.linkedin.com/company/iotentic-gmbh 198 followers, no other account linked, no angle
sweep squad: an engineering integrator hiring automation engineers we don't supply, the 3 Oct row ruled it out and nothing new changes that
thread: problem past the English headlines every page is German and the only English version is a machine translation after consent | cost foreign manufacturers judge a worldwide firm on that version | offer see block five | link English
lead read: Mykyta reads that his own pages call IOTENTIC worldwide while every page is German and English is only a Google translation after consent, and gets offered the English site that wins international manufacturers, one thread
claims:
the founders page calls IOTENTIC a company working worldwide, https://www.iotentic.com/founders/ "weltweit tätiges Unternehmen für industrielle Digitalisierung", fetched 2026-10-06
the careers page reaches as far as gigafactories, https://www.iotentic.com/karriere/ "bis hin zu Traceability und Gigafactories", fetched 2026-10-06
past the English headlines every page is written in German, https://www.iotentic.com/ and all 15 sitemap pages lang de, English headlines such as "From automation to innovation" noted by the red team, read 2026-10-06
English only appears as a Google machine translation after a visitor accepts it, https://www.iotentic.com/ TranslatorSettings languages en and de with translate.google.com element.js, and "Wir benötigen Ihre Zustimmung zum Laden der Übersetzungen", fetched 2026-10-06
recheck: 2026-10-06, founders, karriere and homepage refetched with curl after the crawl, all three strings present. Confidence MEDIUM, facts HIGH, that foreign buyers are lost on it is inference
```

NUDGE
```
Mykyta, in September I suggested we might overlap on software. Here's a different thought.

IOTENTIC works with companies worldwide, but the site's mostly in German, and the only English is a Google auto translation that visitors have to switch on.

Shall I send you over what the English IOTENTIC site looks like?
```

### Stéphane Bouils, SKOOL n'JOB, ctc_xvsocGv6PaJCDrgxs

```gate
lead: Stéphane Bouils, gérant and co founder of SKOOL N'JOB SARL (SIREN 951327766, Perpignan, created 2023-05-01) with co gérant Valentin Delahaut, also gérant of CFA MERCURE, CFA PARVATI and CFA STUDIO AVENIR PRO per recherche-entreprises.api.gouv.fr, mentions légales "Propriétaire : Valentin DELAHAUT & Stéphane Bouils", ctc_xvsocGv6PaJCDrgxs. lemlist jobTitle "Co-fondateur", tagline "Co-fondateur SKOOL n' JOB - Directeur Associé", first and last name swapped in lemlist, register gives first name Stéphane. Thread pulled 2026-10-06 06:45 UTC, 0 activities, sentOnly shows only the 5 Oct connect note, positive control ctc_QZawcREsaQM3pMpPz full with 2 items in the same minute, one campaign only
site pass 1: 150 pages, link crawl plus sitemap-1.xml, all 104 content URLs read
site pass 2: 300 pages, second full crawl including the 104 sitemap URLs again plus attachment pages, tools/site-audit.js desktop and phone screenshots opened, RENDER trusted, homepage, info pratiques, partners, contact, campus, taux de réussite with 4 tabs clicked, Grimp form rendered
deep analysis: A modern Elementor site on WordPress.com built by the agency Bleu d'octobre, aimed at young applicants, every page pushes "Je candidate" into a Grimp form with a 72 hour reply. The other side of every apprenticeship, the employer, gets nothing. The partners page is a title and an address against "Partenaires 928" on the homepage, no page speaks to a company that wants to hire, and the contract starts as a downloadable four page PDF per campus (none for Château Thierry), filled in and emailed to a campus contract inbox, asking SIRET, IDCC, URSSAF, two tutors with diplomas and five attachments. The homepage promises "On s'occupe de toute la partie administrative GRATUITEMENT", and info pratiques promises integration within 15 days of signature, so every contract's paperwork lands on their own staff
owner linkedin: route 1 curl /in/bouils-stéphane-9a866b135 999. Route 2 tools/social-audit.js on the profile, login wall UNKNOWN. Route 3 web search result title "BOUILS Stéphane - SKOOL n' job", snippet only. Route 4 a 2023 post URL found, not opened. Route 5 company page https://www.linkedin.com/company/skoolnjob read, 2,784 followers. Route 6 his own words in press reposts, 25 years at the Chambre des métiers, "Nous proposons un mode alternatif d'établissement de formation en alternance"
contact linkedin: same person as the owner, register gérant, lemlist tagline and mentions légales agree | same six routes
google news: tools/news.py fr, "Skool n'Job" 22 results, "Stéphane Bouils" 10, control Carrefour 98
regional news: tools/news.py ((Perpignan OR Occitanie)) (CFA apprentissage) 0 results with control full, plus ici.fr 05/10/2026 on Occitanie apprenticeship funding cuts, PresseLib 19/01/2026 Pau campus seeking partner companies, L'Indépendant 28/08/2025 Carcassonne opening with 70 partner companies
industry news: tools/news.py CFA apprentissage 100 results, AEF 01/10/2026 PLF 2027 single national platform for alternance contracts, read as a risk to a filing tool, not to employer intake
sources:
1. https://skoolnjob.com/
2. https://skoolnjob.com/info-pratiques/
3. https://skoolnjob.com/wp-content/uploads/2025/09/GABARIT-DDE-CONTRAT-1.pdf
4. https://skoolnjob.com/wp-content/uploads/2025/12/CONTRAT-TOULOUSE.pdf
5. https://skoolnjob.com/nos-partenaires/
6. https://skoolnjob.com/campus-chateau-thierry/
7. https://skoolnjob.com/mentions-legales/
8. https://skoolnjob.grimp.io/forms/b9f57454-5478-4276-b301-4f8515aa6a37
9. https://www.grimp.io/
10. https://recherche-entreprises.api.gouv.fr/search?q=951327766
11. https://www.pappers.fr/entreprise/skool-n-job-951327766
12. https://presselib.com/article/skool-n-job-apprentissage-formation-entreprise-commerce-pau-bearn
13. https://www.lindependant.fr/2025/08/28/70-entreprises-partenaires-et-60-apprentis-a-laube-de-la-rentree-un-nouveau-cfa-debarque-a-carcassonne-12896625.php
14. https://www.francebleu.fr/infos/education/a-perpignan-le-centre-de-formation-skool-n-job-obtient-devant-la-justice-la-reprise-du-financement-de-ses-apprentis-9796912
15. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fskoolnjob.com%2F (tools/eu-view.py)
16. https://www.instagram.com/skoolnjob_perpignan/ (tools/social-audit.js)
17. https://www.linkedin.com/company/skoolnjob/
18. https://news.google.com/rss (tools/news.py, company, person, region, industry)
pains: 9 judged. (A1) contract intake by emailed PDF under a free admin promise, chosen. (W1) no employer path, empty partners page, kept as the visible symptom. (W3) Perpignan first title and a stale form dropdown, agency tweak. (W2) footer SKOOL N'COOK link opens a logo file, favour. (G1) GA and Google Ads cookies set from Stockholm with Clickio loaded, banner unseen, not chosen. (A3, A4) break rates and the attendance dispute, banned topics. (A5) hidden beta chatbot, clue only. (S1) social active, one Perpignan Instagram, minor. (Q1) no squad fit
chosen: A1, the costliest, every one of roughly a thousand contracts a year starts as a hand filled PDF in a campus inbox that their own staff process for free, and the load rises with each campus and partner company they're signing now
sweep website: https://skoolnjob.com/nos-partenaires/ is a title and an address against 928 partners claimed on the homepage, no employer page on 300 crawled pages with the employeur control at 23 pages, modern look and an agency in place, folded into the apps angle
sweep gdpr: tools/eu-view.py from Stockholm on https://skoolnjob.com/ sets _ga, _ga_QH7LL8EVFJ and _gcl_au before a click with clickiocmp.com loaded, the EU banner itself was never seen, so not chosen
sweep apps: https://skoolnjob.com/info-pratiques/ contract requests are per campus PDFs to fill in and email, https://skoolnjob.com/wp-content/uploads/2025/09/GABARIT-DDE-CONTRAT-1.pdf has 0 fillable fields, Grimp and Yparéo links are candidate and staff logins only, chosen
sweep social: tools/social-audit.js on accounts from their HTML, https://www.instagram.com/skoolnjob_perpignan/ 3,737 followers last post 2026-10-02, Facebook 2,557, LinkedIn 2,784, active, not chosen
sweep squad: a CFA, not a software or agency business, and https://skoolnjob.com/ credits Bleu d'octobre in the footer for the site, no capacity fact to sell against
thread: problem the contract request is a four page PDF employers email back to the campus | cost the team copies SIRET and tutor details out of an inbox and chases missing documents before the contract goes to the OPCO, growing with every campus and partner | offer see block five | link contract
lead read: Stéphane reads that employers send a four page PDF by email, so his team copies details out and chases documents before the OPCO, growing with each campus and partner while the paperwork is free, and gets offered the AI contract intake feeding Yparéo, one thread
claims:
your contract request is a four page PDF that employers fill in and email back to the campus, https://skoolnjob.com/info-pratiques/ "Téléchargez votre demande de contrat" per campus, https://skoolnjob.com/wp-content/uploads/2025/09/GABARIT-DDE-CONTRAT-1.pdf 4 pages "Document à compléter et à remettre ou à adresser par email au contact en pied de page", footer contrat@skoolnjob.com, rechecked 06:45 UTC
every SIRET, tutor and attachment, https://skoolnjob.com/wp-content/uploads/2025/12/CONTRAT-TOULOUSE.pdf and the Perpignan PDF ask SIRET, IDCC, the maître d'apprentissage and "Carte d'identité / Carte Vitale / Copie de diplôme / CV", rechecked 06:45 UTC
opening new campuses, https://skoolnjob.com/home/contact/ six campuses, https://skoolnjob.com/campus-chateau-thierry/ live, https://presselib.com/article/skool-n-job-apprentissage-formation-entreprise-commerce-pau-bearn Pau 19/01/2026 seeking partners
handling all the paperwork for free, https://skoolnjob.com/ "On s'occupe de toute la partie administrative GRATUITEMENT", rechecked 06:45 UTC
every partner company you sign, https://skoolnjob.com/ counter "Partenaires" data-to-value 928, https://presselib.com/article/skool-n-job-apprentissage-formation-entreprise-commerce-pau-bearn "souhaite également étendre son réseau de partenaires"
recheck: 2026-10-06 06:45 UTC, homepage, info pratiques, partners, Château Thierry and contact refetched 200, both PDFs downloaded and the quoted lines found, counters mapped to their labels in the raw HTML, control example.com 200. Thesis confidence MEDIUM, the PDF and email route and the free admin promise are proven on their own pages, that staff retype it by hand is inference he can test against his own contract team
```

OPENER
```
Hi Stéphane, saw SKOOL n'JOB, looks interesting!

However, your apprentice contract is a PDF that employers fill in and email back to the campus. This causes your team to copy the details over and chase missing documents, contract after contract.

Especially, when you are opening new campuses and doing all the paperwork for free, the emails pile up with every new partner company.

I run Astra agency. We build AI workflows for brands like Unilever, AXA, Pertamina. I automated how new leads were sorted and followed up at Betty Blocks, so I've seen how many hours that gives a team back.

Shall I send you over what the AI workflow for your contracts looks like?
```

### David Brauman, Brauman & K, ctc_n3rxAxdmtuJpgW8NH

```gate
lead: David Brauman, Président of BRAUMAN & K SAS, SIREN 984613059, created 08/02/2024, NAF 68.31Z, 5 rue des Acacias 75017 Paris, active, per https://recherche-entreprises.api.gouv.fr/search?q=brauman and https://www.pappers.fr/entreprise/brauman-k-984613059 , ctc_n3rxAxdmtuJpgW8NH, lead lea_8cfhQRvnNcMv7c7Hb in cam_Csq9BikBWz7dNqSs4. lemlist jobTitle "PDG", tagline "Référence de l'immobilier neuf | Coach QVEMA - M6", companyDomain braumanandk.com, tagline and company agree, no former. Thread re pulled by the judge 2026-10-06 06:31 UTC, 0 activities, nextPage null, sentOnly search shows only the 5 Oct connect note, lastRepliedAt null, myConversations search "Brauman" 0, control ctc_f4gwBMMyfBQjgz9CG came back with 2 activities. grep of state and logs for brauman, the contactId and the leadId, 0 hits
site pass 1: 150 pages by tools/crawl.py --max 150 on https://www.braumanandk.com , all 200, about 106 of the 108 content pages plus 42 of 4,615 listings, sitemap 4,723 URLs, every crawled page read
site pass 2: 150 pages, second full crawl equal to pass 1, tools/site-audit.js with desktop and phone screenshots opened, no RENDER NOT TRUSTED, /proprietes, a listing, contact, careers, the English page and an agent page rendered and screenshotted, and the judge rendered /proprietes again and searched Lyon, Nantes and Bordeaux at desktop width plus Lyon from the homepage on a phone
deep analysis: A modern Webflow portal that sells new build homes from a promoter feed, "68212 appartements" in "3521 programmes", every listing ends in a callback form, "On vous rappelle dès qu'on raccroche", run by about 50 independent advisers. The whole funnel depends on the buyer finding a programme in the place he wants, and the search is a plain text match over the feed, so Lyon returns a Paris suburb first because its blurb mentions gare de Lyon, and Nantes returns Fréjus and Cannes on page one. The feed is uncurated around it, empty lot tables, a 1984 delivery date, placeholders. Socials are strong, a separate Next.js app (ByeBail) exists, the legal page carries another of his companies' SIREN, and HubSpot, Facebook and Klaviyo fire before consent
owner linkedin: route 1 curl https://www.linkedin.com/in/david-brauman-61384319 999. Route 2 fetch-walled 999. Route 3 tools/social-audit.js UNKNOWN behind the login. Route 4 web search, Puremédias and Capital quote his profile. Route 5 posts search, a two year old hiring post found, sensitive, never used. Route 6 the lemlist record, PDG and the QVEMA tagline
contact linkedin: same person as the owner, the register names him Président and lemlist says PDG of the same company, same six routes as above
google news: tools/news.py --lang fr, "Brauman & K" 11 results, "David Brauman" 10, control Carrefour 98, Puremédias and Capital on 26 Sep 2026 name him a new juror of Qui veut être mon associé season 7
regional news: tools/news.py Paris immobilier neuf courtier, 0 results with the control full, a real zero
industry news: tools/news.py immobilier neuf, 100 results, 2 Oct Presse Agence prices falling, 4 Oct BFM the Jeanbrun scheme at 200 sales a month against 4,000 hoped, 28 Sep Immo Matin SeLoger neuf launching Top Position for programmes, a soft market where every buyer counts
sources:
1. https://www.braumanandk.com/
2. https://www.braumanandk.com/proprietes?lieu=Lyon
3. https://www.braumanandk.com/listings/seinographic
4. https://www.braumanandk.com/listings/1-rue-du-general-leclerc
5. https://www.braumanandk.com/mentions-legales
6. https://www.braumanandk.com/politique-des-cookies
7. https://www.braumanandk.com/recrutement
8. https://recherche-entreprises.api.gouv.fr/search?q=brauman
9. https://www.pappers.fr/entreprise/brauman-k-984613059
10. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fwww.braumanandk.com (tools/eu-view.py, re run by the judge)
11. https://www.ozap.com/actu/depart-danthony-bourbon-arrivee-de-quatre-nouveaux-investisseurs-m6-devoile-le-nouveau-jury-de-qui-veut-etre-mon-associe/657164
12. https://fr.finance.yahoo.com/actualites/jean-philippe-cartier-ang%C3%A9lique-g%C3%A9rard-104226992.html
13. https://www.mysweetimmo.com/2025/12/04/immobilier-faire-de-la-france-une-nation-de-proprietaires-david-brauman-brauman-k/
14. https://www.byebail.fr/
15. https://calendly.com/backoffice-braumanandk/30min
16. https://www.instagram.com/david_brauman_
17. https://www.tiktok.com/@braumanandk
18. https://www.opinionsystem.fr/fr-fr/certificate/22841
19. https://www.remigravelle.fr/
pains: 7 judged. (1) search answers the wrong city over a raw feed, at the moment M6 sends a national audience, chosen. (2) GDPR, Facebook, HubSpot and Klaviyo before consent, a policy still "en cours d'implémentation", true, a day's fix for the incumbent, held as proof. (3) the uncurated feed, empty lot tables and a 1984 delivery date, folded into 1. (4) another company's SIREN on the legal page, a text edit. (5) recruitment by WhatsApp, weak. (6) social, strong, none. (7) Build Squad, no capacity fact
chosen: (1), hottest and costliest, every sale starts with a buyer finding a programme in his city and asking for a callback, the search sends Lyon and Nantes buyers elsewhere, and the national TV audience from his new jury seat lands on that box now
sweep website: https://www.braumanandk.com/proprietes?lieu=Lyon first card Seinographic in Villeneuve Saint Georges, Nantes gives Fréjus and Cannes on page one, Bordeaux clean, plus empty lot tables on https://www.braumanandk.com/listings/1-rue-du-general-leclerc , chosen with the AI search offer
sweep gdpr: tools/eu-view.py from Stockholm on https://www.braumanandk.com , _fbp, __hstc, hubspotutk, __hssrc, __hssc and __kla_id before a click, policy names none and says consent is "en cours d'implémentation", control byebail.fr 0 cookies, true, held back as a later favour
sweep apps: no AI search, assistant or matcher anywhere in 150 crawled pages of https://www.braumanandk.com , matching runs on a text filter and a callback, "On vous rappelle dès qu'on raccroche", the AI search offer is the default A angle, chosen
sweep social: tools/social-audit.js on the URLs in their own HTML, https://www.instagram.com/david_brauman_ 36,168 followers latest post 2026-10-02, TikTok @braumanandk 25.5K, YouTube @Braumandavid 198 videos, LinkedIn UNKNOWN behind login, strong, no angle
sweep squad: the site is a Webflow build by one no code consultant per https://www.remigravelle.fr/ and a separate Next.js app runs at https://www.byebail.fr/ , no team page, no delivery times, no capacity fact to build a squad message on
thread: problem the site's search is a plain word match, Lyon brings up a home near Paris first, Nantes shows Fréjus and Cannes | cost buyers wade through homes far away before asking an adviser, and TV viewers will land in the same search box | offer see block five | link search
lead read: David reads that his search matches words, not places, so buyers in Lyon and Nantes wade through distant homes, that M6 viewers will land in the same box once the season airs, and gets offered the AI search matching buyers to homes, one thread
claims:
your site's search answers Lyon with a home near Paris first, https://www.braumanandk.com/proprietes?lieu=Lyon first card "Seinographic Val-de-Marne 35 avenue de Choisy 94190 Villeneuve-Saint-Georges", desktop and phone, rechecked 06:40 UTC, its own page https://www.braumanandk.com/listings/seinographic mentions "Paris gare de Lyon"
puts Fréjus and Cannes on the first page for Nantes, https://www.braumanandk.com/proprietes typed Nantes, card 2 "LES ALLEES ESTEREL Var 2, rue de la Vernède 83600 Fréjus", card 19 "VILLA SAINT HONORAT Alpes-Maritimes 57 avenue maréchal Gallieni 06400 Cannes", of 24 on page one
buyers ask an adviser to call, https://www.braumanandk.com/listings/1-rue-du-general-leclerc "Intéressé par ce programme ? On vous rappelle dès qu'on raccroche." and https://www.braumanandk.com/ "Parler à un conseiller"
joining the Qui veut être mon associé jury, https://www.ozap.com/actu/depart-danthony-bourbon-arrivee-de-quatre-nouveaux-investisseurs-m6-devoile-le-nouveau-jury-de-qui-veut-etre-mon-associe/657164 "Deux entrepreneurs autodidactes complètent ce casting : David Brauman et Jean-Philippe Cartier", 26 Sep 2026
Raka built scoring and routing workflows at Betty Blocks, https://www.linkedin.com/in/raka-mulya-b92885196 Global GTM & Campaign Manager, "automation-driven revenue workflows covering enrichment, scoring, routing and follow-up loops"
recheck: 2026-10-06 06:40 UTC, the judge re pulled the thread, re ran the search for Lyon, Nantes and Bordeaux on desktop and Lyon on a phone from the homepage, reopened the Seinographic and Leclerc listings, the cookie policy and the ozap article, re ran tools/eu-view.py, control example.com 200. Thesis confidence MEDIUM, the wrong city results are proven three times, that they cost callbacks is inference he can test against his own search and form numbers, and his Webflow consultant could patch the ranking partly, which is why the offer is the matching and booking behind it
```

OPENER
```
Hi David, saw Brauman & K, looks interesting!

However, your site's search mixes up cities, so Lyon shows a home near Paris first and Nantes shows Fréjus and Cannes. This causes buyers to scroll past homes hundreds of kilometres away before they find one in their own city.

Especially, when you are joining the M6 jury, the viewers who look you up once the season airs will use that same search.

I run Astra agency. We build AI tools for brands like Unilever, AXA, Pertamina. I ran lead routing at Betty Blocks, which showed me what it's worth to send each buyer to the right place.

Shall I send you over what the AI search for your homes looks like?
```

### Naomi Yard, SEM-Care, ctc_9Ty6sALcgs2LTTuxs

```gate
lead: Naomi Yard, co-owner of SEM-Care, Alkmaar (KvK 85983918 per https://www.sem-care.nl/ footer and North Data https://www.northdata.com/SEM-Care,+Alkmaar , Edisonweg 7, purpose "Outpatient guidance ... for home-dwelling clients with physical, cognitive or psychosocial limitations"), ctc_9Ty6sALcgs2LTTuxs, lea_XAYXjCzPBGxJYnCnA. lemlist jobTitle "Mede-eigenaar", experience1 "Mede-eigenaar @SEM Care", 15+ years wijkverpleging at Evean before it. https://www.sem-care.nl/over-sem-care/ "Wij, Naomi en Suzanne ... SEM-Care is geboren". Thread pulled 2026-10-06, 1 item, our 22 Jul connect note, sentOnly search on her name returns the same contactId with lastRepliedAt null, Martijn Dijk's two item thread is the control
site pass 1: 18 URLs by tools/crawl.py on https://sem-care.nl , 16 from the sitemap, all 200, every page read, home, begeleiding aan huis, financiering, praktische informatie, over, contact, vacatures, the vacancy, two news posts, terms, disclaimer, author and category archives
site pass 2: 18 URLs, second full crawl matching pass 1. tools/site-audit.js printed RENDER NOT TRUSTED (two CSS files ours), so tools/render-via-curl.js was run, 64 requests served, 0 curl errors, both parts looked at, a clean Elementor site with the footer note about the phone visible. Desktop render only, the phone view from site-audit.js is void with the run
deep analysis: A small HKZ certified Wmo provider of ambulant begeleiding for adults, contracted in several municipalities, also WLZ. The client journey on its own pages is one channel, every "Maak een afspraak" and "Neem contact op" goes to /contact/, three fields (Voor en achternaam, E-mailadres, Bericht) and "Binnen 2 werkdagen nemen wij contact met u op". The footer on every page says "De telefoondienst is niet altijd bemand. We doen ons best om elk telefoontje te beantwoorden van maandag t/m vrijdag tijdens kantooruren". Referrers get their own section on /financiering/ ("Voor verwijzers"), and the vacancy describes begeleiders out at clients with a work phone and iPad in "een compact team". Intake rules are written out on /praktische-informatie/ (toelatingscriteria, exclusions), so the first screening questions are known and repeatable. A phone hack notice was updated 23 Jun 2026. No privacy policy link was found (site-audit.js, control passed), a tweak
owner linkedin: route 1 curl https://www.linkedin.com/in/naomi-yard-425522138 999. Route 2 web search "Naomi Yard" SEM-Care, the only profile hit is /in/naomiy in Oosterhout, a different person, not used. Route 3 web search for SEM-Care founders, no post. Route 4 company page https://www.linkedin.com/company/sem-care via tools/social-audit.js, 41 followers, "Samen elkaar motiveren", 5 employees. Route 5 her own words, the lemlist summary "Naast mijn activiteiten als Wijkverpleegkundige ... geef ik zo nu en dan ook gastlessen". Route 6 the about page in the company's own words. The co-owner Suzanne has no surname on the site, not searchable
contact linkedin: same person as the owner, the lemlist jobTitle, the about page and the KvK record agree, same six routes
google news: tools/news.py nl, "SEM-Care Alkmaar" 0, "Naomi Yard" 0, control Heineken 100
regional news: tools/news.py (Alkmaar OR Noord-Holland) (ambulante begeleiding Wmo) 5 results, Noordhollands Dagblad 2024-03-31 on Simetri stopping home care in Zaanstreek-Waterland over payment problems, nothing on SEM-Care
industry news: tools/news.py ambulante begeleiding Wmo 18 results, Dirkzwager Wmo jurisprudence Jan 2026, VARnws on Utrecht choosing Viantis for Wmo support Oct 2025, plus https://www.alkmaar.nl/direct-regelen/zorg-en-ondersteuning/begeleiding/ (residents apply via mijnzorg.alkmaar.nl or 14 072, then choose a provider)
sources:
1. https://www.sem-care.nl/contact/
2. https://www.sem-care.nl/financiering/
3. https://www.sem-care.nl/begeleiding-aan-huis/
4. https://www.sem-care.nl/over-sem-care/
5. https://www.sem-care.nl/praktische-informatie/
6. https://www.sem-care.nl/vacature-ambulant-begeleider/
7. https://www.sem-care.nl/wp-json/wp/v2/pages (modified dates, home and services 2026-06-23)
8. https://www.northdata.com/SEM-Care,+Alkmaar (tools/fetch-walled.py)
9. https://www.linkedin.com/company/sem-care (tools/social-audit.js)
10. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fwww.sem-care.nl (tools/eu-view.py)
11. https://www.alkmaar.nl/direct-regelen/zorg-en-ondersteuning/begeleiding/
12. https://news.google.com/rss (tools/news.py, company, person, region, industry)
13. https://example.com (control 200)
pains: 5 judged. (1) Apps, intake runs through a three field form answered within two working days and a phone line that isn't always staffed, while the team is out at clients, so referrers and families with a Wmo indication in hand reach SEM-Care slowly. Costliest, each lost referral is a client paid for every month by the municipality. (2) Website, clean and current after the June 2026 rewrite, nothing structural. (3) GDPR, no privacy link found on a care provider's site (site-audit.js with control), 1 first party cookie and api.ipify.org before a click from Stockholm, a tweak. (4) Social, no account linked from the site, LinkedIn company page 41 followers. (5) Squad, a care provider, builds nothing
chosen: (1), costliest, it sits on how new clients arrive, and the screening rules on /praktische-informatie/ show the first questions are repeatable
sweep website: 18 pages crawled twice, rendered through render-via-curl.js with 0 curl errors, https://www.sem-care.nl/ is clean and current after the 23 Jun 2026 rewrite, not chosen
sweep gdpr: tools/eu-view.py from Stockholm on https://www.sem-care.nl , 1 first party cookie ipify_ip_dfwp and api.ipify.org before a click, no consent code, site-audit.js finds no privacy link with its control passing, a tweak, not chosen
sweep apps: https://www.sem-care.nl/contact/ three fields and "Binnen 2 werkdagen", footer "De telefoondienst is niet altijd bemand", https://www.sem-care.nl/vacature-ambulant-begeleider/ team out at clients, chosen
sweep social: tools/social-audit.js on https://www.linkedin.com/company/sem-care , 41 followers, 5 employees, the site links no social account per site-audit.js with its control, not chosen
sweep squad: a home support provider per https://www.sem-care.nl/begeleiding-aan-huis/ , it builds no software, nothing to supplement
thread: problem the Maak een afspraak button leads to a three field form with a reply within two working days and the phone isn't always staffed | cost a family or referrer looking for home support tries another provider before anyone calls back, adding up as a compact team serves several municipalities | offer see block five | link reply
lead read: Naomi reads that her appointment button gives a two working day form and the phone isn't always staffed, so a family or referrer may try another provider first, adding up across municipalities, and gets offered the same day AI intake for every referrer, one thread
claims:
your "Maak een afspraak" button leads to a three field form, https://www.sem-care.nl/begeleiding-aan-huis/ , /financiering/ and /over-sem-care/ anchor "Maak een afspraak" href https://www.sem-care.nl/contact/ , the form has form_fields naam, email, message, rechecked 06:4x UTC
a reply within two working days, https://www.sem-care.nl/contact/ "Binnen 2 werkdagen nemen wij contact met u op"
the phone isn't always staffed, https://www.sem-care.nl/ footer on every page "De telefoondienst is niet altijd bemand", seen in the render-via-curl screenshot
a client with a Wmo indication and referrers, https://www.sem-care.nl/financiering/ "Wmo-indicatie" and "Voor verwijzers"
serving clients in several municipalities, https://www.sem-care.nl/financiering/ "gecontracteerd voor het leveren van individuele begeleiding in meerdere gemeenten"
a compact team out on the road, https://www.sem-care.nl/vacature-ambulant-begeleider/ "Je gaat op pad naar cliënten" and "een compact team"
recheck: 2026-10-06 06:50 UTC, contact, financiering and the footer refetched, every quoted line found, control example.com 200. Thesis confidence MEDIUM, the slow single channel is proven on her pages, that referrals go elsewhere is inference she can test against her own intake
```

OPENER
```
Hi Naomi, saw SEM-Care, looks interesting!

However, your appointment form promises a reply within two working days, and the phone isn't always answered. This causes families looking for home support to try another provider before anyone's called them back.

Especially, when you are working across several municipalities with a small team on the road, the requests waiting for a reply add up every week.

I run Astra agency. We build AI workflows for brands like Unilever, AXA, Pertamina. I set up the follow up for new enquiries at Betty Blocks, where a quick first answer made all the difference.

Shall I send you over what the AI reply workflow for every request looks like?
```

### Emily Levy, Alquimia Legal, ctc_rMYGbmu7Piu5Pmwei

```gate
lead: Emily Levy (lemlist "Emily R.", fullName "Emily Levy R."), partner and COO of Alquimia Legal, Guadalajara, ctc_rMYGbmu7Piu5Pmwei, lea_X6Zr5my9ytX6xNZMQ. https://www.alquimialegal.mx/ "Emily Levy Socia & Subdirectora. Socia y COO de Alquimia Legal desde 2019 ... lidera la proyección internacional de la firma desde Francia. Ofrece soluciones legales estratégicas en español, inglés y francés". lemlist jobTitle "Co-Owner", experience "Company Owner @Alquimia Legal", location Lyon. Founder and director is Alejandro Alcántara Gómez per the same page and https://www.enlazadot.com/columna/alquimia-legal-en-donde-si-protegen-tu-empresa/ (23 Feb 2021, "Alejandro Alcántara (Director)", "Dulce Emily Levi (Subdirector)"). No Mexican public register reachable for a law firm, the site and the 2021 column agree. Thread pulled 2026-10-06, 1 item, our 27 Jul connect note, sentOnly search "Emily R." returns the same contactId with lastRepliedAt null
site pass 1: 3 URLs by tools/crawl.py on https://www.alquimialegal.mx (a Wix one pager, the root twice and the privacy notice), plus https://www.alquimialegal.mx/en fetched and read in full, every page read
site pass 2: 3 URLs, second crawl matching pass 1, /en fetched again, the page rendered in Chromium and both "Cotizar" and "Agendar Asesoría" clicked, each scrolls to the same form section (scrollY 0 to 4476, no new tab), screenshot alq_cotizar.png looked at. Desktop only, the 3 Oct sweep has the phone render
deep analysis: A small IP, corporate, tax and labour firm, two people named, founder Alejandro in Guadalajara and Emily in France. Clients arrive through social media (a testimonial says "encontrarme con la asesoría de Alquimia por medio de las redes sociales", Instagram 1,274 posts, Facebook 4,370 followers) and buy registrations, every testimonial is a trademark ("registro de mi marca"). There's no price anywhere on the Spanish or English page (regex for currency, MXN, precio and price found nothing, control string matched). Every action ends in one place, the "Trabajemos juntos" form with seven required fields (Nombre, Teléfono, Email, Nombre de la compañía, Ciudad, País, Mensaje) or wa.me/523312561258. No chat, booking or quoting tool in the HTML (manychat, tidio, calendly, hubspot, zapier all 0, wa.me 2 as the control, /book-online 404). So each quote request is read and answered by a person, in up to three languages, across a Lyon to Guadalajara time gap
owner linkedin: route 1 Alejandro has no URL in lemlist, web search "Alejandro Alcántara" "Alquimia Legal" returns only same name strangers (a congressman, a banker) and the 2021 Enlazadot column, which is read. Route 2 the site's team section. Route 3 company page https://www.linkedin.com/company/alquimia-legal/ via social-audit.js, 26 followers, 1 employee, "El intelecto lo materializa todo". Routes 4 to 6 Instagram, Facebook and the column, the firm's own voice is on Instagram
contact linkedin: route 1 curl https://www.linkedin.com/in/emlevyr 999. Route 2 web search "Emily Levy" Alquimia Legal, only other Emily Levys. Route 3 the lemlist summary, "Since 2016 ... international intellectual property correspondent ... Since 2022, I have been based in Lyon". Route 4 the site bio. Route 5 the 2021 column. Route 6 the lemlist experience list, Juriste Jr. at BARAT CORPORATE as a second job
google news: tools/news.py es, "Alquimia Legal" 2 results, both unrelated (IMPSA Argentina 2026, Panama 2004), "Emily Levy Alquimia" 0, control Telefonica 102
regional news: tools/news.py (Guadalajara OR Jalisco) (registro de marca IMPI) 46 results, debate.com.mx 2026-08-02 "IMPI reporta crecimiento histórico en el registro de marcas y patentes; dominan solicitudes extranjeras", the Pato Merlín and "¿Y si sí?" filing rushes in Jun and Jul 2026, demand for registrations is up and foreign filers lead
industry news: tools/news.py registro de marca IMPI 100 results, IMPI enforcement in León 2026-10-06, headlines only past the regional item, the trade body is IMPI itself
sources:
1. https://www.alquimialegal.mx/
2. https://www.alquimialegal.mx/en
3. https://www.alquimialegal.mx/politica-de-privacidad
4. http://wa.me/523312561258 (href on both pages)
5. https://www.instagram.com/alquimialegalmx/ (tools/social-audit.js)
6. https://www.facebook.com/alquimialegal (tools/social-audit.js)
7. https://www.linkedin.com/company/alquimia-legal/ (tools/social-audit.js)
8. https://www.enlazadot.com/columna/alquimia-legal-en-donde-si-protegen-tu-empresa/
9. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fwww.alquimialegal.mx (tools/eu-view.py)
10. https://news.google.com/rss (tools/news.py, debate.com.mx IMPI record filings headline)
11. https://www.linkedin.com/in/emlevyr (999)
12. https://example.com (control 200)
pains: 5 judged. (1) Apps, every quote and consultation request goes through one seven field form or WhatsApp with no price shown, so each one is answered by hand by a two person firm whose co-owner is in France with a second job. Costliest, quotes are where a trademark client is won or lost and social media keeps feeding requests. (2) Website, a polished Wix page in Spanish and English, /fr 404 while she offers French, a tweak. (3) GDPR, 6 first party Wix cookies, no tracker, a Mexican firm, nothing. (4) Social, Instagram active daily (latest 2026-10-06), Facebook 4,370, LinkedIn 26, working. (5) Squad, a law firm, builds nothing
chosen: (1), costliest, it's the step every testimonial passed through, and it grows with every language and time zone she adds
sweep website: https://www.alquimialegal.mx and /en crawled twice and rendered, polished, /fr returns 404, not chosen
sweep gdpr: tools/eu-view.py from Stockholm on https://www.alquimialegal.mx , 6 first party Wix cookies, Wix and Sentry hosts only, a Mexican firm, nothing to say
sweep apps: https://www.alquimialegal.mx/ "Cotizar" and "Agendar Asesoría" both scroll to the seven field form, no price on the page, wa.me link, no quoting or chat tool in the HTML, chosen
sweep social: tools/social-audit.js on https://www.instagram.com/alquimialegalmx/ 524 followers, 1,274 posts, latest 2026-10-06, Facebook 4,370, LinkedIn 26, active, not chosen
sweep squad: a two partner law firm per https://www.alquimialegal.mx/ , it builds no software, nothing to supplement
thread: problem the Cotizar and Agendar Asesoría buttons both drop people at one seven field form or WhatsApp with no price | cost every brand owner wanting a quote waits for someone to answer by hand, piling up across three languages and two time zones as she leads the international presence | offer see block five | link quote
lead read: Emily reads that both buttons drop people at one form or WhatsApp with no price, so quotes wait for a person, piling up across three languages and time zones as she leads the firm's international presence, and gets offered the AI quote desk answering in three languages, one thread
claims:
your Cotizar and Agendar Asesoría buttons both drop people at one seven field form or WhatsApp, https://www.alquimialegal.mx/ clicked in Chromium 2026-10-06, both scroll to "Trabajemos juntos" with Nombre, Teléfono, Email, Nombre de la compañía, Ciudad, País, Mensaje, all marked *, and "Contactar WhatsApp" wa.me/523312561258
no price shown, https://www.alquimialegal.mx/ and /en text, currency and price regex 0 hits, control string 3 hits
taking the firm international from France, https://www.alquimialegal.mx/ "lidera la proyección internacional de la firma desde Francia"
Spanish, English and French, https://www.alquimialegal.mx/ "Ofrece soluciones legales estratégicas en español, inglés y francés"
two time zones, lemlist location Lyon and the firm's address in Guadalajara per https://www.alquimialegal.mx/politica-de-privacidad
recheck: 2026-10-06 06:50 UTC, the page refetched and both buttons clicked again in the same run, every quoted line found, control example.com 200. Thesis confidence MEDIUM, the hand answered single channel is proven, that quotes go cold is inference she can test against her WhatsApp
```

OPENER
```
Hi Emily, saw Alquimia Legal, looks interesting!

However, your quote and booking buttons both lead to the same form or WhatsApp, with no prices. This causes every client asking for a quote to wait until someone at the firm's got time to answer.

Especially, when you are working in Spanish, English and French across two time zones, the unanswered quotes pile up fast.

I run Astra agency. We build AI workflows for brands like Unilever, AXA, Pertamina. I ran lead follow up for Betty Blocks, and a lead that waited went cold quickly.

Shall I send you over what the AI quote workflow in three languages looks like?
```
