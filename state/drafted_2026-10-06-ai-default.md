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

### Laurent Fournié, Winter, ctc_e5TddBr53qxiLyida

Researcher, judge (OPENER MEDIUM), red team FIX, fixes applied by the driver. Facts hold: rendered and clicked, all five
sales buttons on https://www.winter-energies.fr/theme/solutions-b2b2c including "Prendre rendez-vous" open a mailto to
Laurent, no form or booking tool before or after consent, no partner names or logos. White label "opérationnelle dès
octobre 2026" on the page, CEE programme end 31 Dec 2027 in the convention PDF. NEVER suggest naming EDF, Eni or Dyneff:
convention article 8 bars naming another party without agreed joint communication. Pushback risk: Winter's LinkedIn
names Plenitude France (+2 600 comptes, 4,5/5) and the CapConfort partners, so he may say "our partners are on LinkedIn",
which also shows the proof exists and just isn't on the page that sells. Red team fixes taken: invented harms cut, block
five now names the bigger outcome within 16 words.

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
thread: problem the partner page names no partner and its meeting button only opens an email | cost buyers take the offer upstairs with no live client to point to, and more buyers means more find none | offer the partner site that wins supplier meetings, showing who's live and booking meetings | link partner
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

However, your partner page is describing what partners do without naming one, and even its meeting button only opens an email to you. This causes buyers at suppliers and local authorities to take your offer upstairs with no live client to point to.

Especially, when you are opening the white label offer as the CEE programme winds down, the more buyers you reach, the more of them look for a client to call and find none.

I run Astra agency. We build websites and apps for brands like Unilever, AXA, Pertamina. I worked on go to market at Betty Blocks for a year and a half, so I've seen software buyers ask who else runs it before they'll book a call.

Shall I send you over what the partner site that wins supplier meetings looks like?
```

### Steven Prins, Bulgarian Wine Hub, ctc_3S6EA258AheDuBKi5

Follow up to our 26 Aug opener (thread: connect note 26 Jul, opener 26 Aug, no reply, no last message promise). Red team
FIX applied: the trade buyers line now rests on what the site shows (one paragraph, a form, consumer only terms per their
terms of service "particuliere klanten"), not on reply speed (his contact page promises same business day). KBO 0778759649,
AYLYAK BV, Steven De Prins sole director, wine wholesale codes added 12 May 2026; Shopify b2bEnabled false, no wholesale
app, 0 trade hits across 135 pages in EN, NL and FR with a working control. He has a day job, left out.

```gate
lead: Steven De Prins (lemlist "Steven Prins"), Co-Owner of Bulgarian Wine Hub, ctc_3S6EA258AheDuBKi5, lea_2pJ8C4iNEskyKzLcb. The shop is operated by AYLYAK BV per https://www.bulgarianwinehub.be/policies/legal-notice ("owned and operated by Aylyak Rosstal 3 3140 Keerbergen", VAT BE0778759649, effective 27/04/2026). KBO https://kbopub.economie.fgov.be/kbopub/toonondernemingps.html?ondernemingsnummer=0778759649 gives AYLYAK, active since 17 Dec 2021, Director De Prins Steven, and adds 46.341 wholesale of wine and spirits, 46.349 wholesale of beverages, 47.251 retail sale of wine and 73.110 advertising since 12 May 2026. An owner. Thread pulled 2026-10-06 06:20 UTC, 2 items, connect note 26 Jul and our opener 26 Aug, no reply. sentOnly search "Steven Prins" returns only this contact, teamConversations searches on "Steven De Prins" and "Bulgarian Wine Hub" return 0, state grep finds the 26 Aug digest row and the 30 Sep audit row only
site pass 1: 80 URLs by tools/crawl.py on https://www.bulgarianwinehub.be/ (capped, Shopify variant links queued), 51 distinct page URLs in EN, NL and FR, all fetched with curl and grepped, homepage, 6 collections, 59 products via products.json, about-us, our-partners, our-wine-regions, b2b, winetasting, contact, policies
site pass 2: 51 URLs, second full fetch of every page into bwhp/ and grepped for trade wording, the B2B page rendered with tools/site-audit.js (RENDER NOT TRUSTED, 4 of 4 failed assets fine by direct fetch, so void) and again with tools/render-via-curl.js, screenshot /tmp/claude-0/nsa01_bwh_b2b_curl-curlrender.png opened, heading, one paragraph and a five field form, desktop, phone screenshot void with the first run
deep analysis: A rebuilt Shopify shop, trilingual, 59 Bulgarian wines from six named wineries with long tasting notes, gift cards, boxes, a tasting service where "Every wine tasting is discussed personally", a contact page that aims "to respond to all inquiries on the same business day", and a B2B page. The B2B page's meta description says "We offer direct import and distribution for restaurants, bars and wine shops", the page title is "Bulgarian Wine B2B | Import & Distribution for Businesses", and the body is "Are you interested in a partnership or would you like more information about our wines? Get in touch with us" plus name, business email, company, Chamber of Commerce number and a message box. No trade price, minimum, delivery term, range sheet or ordering route exists anywhere on the 51 pages in any of the three languages. The company added wine wholesale to its activities in May 2026, so trade buyers are where it's heading, and the page they land on asks them to write in first
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
thread: problem they offer import and distribution to restaurants, bars and wine shops but the B2B page is one paragraph and a form with only consumer terms on the site | cost every trade buyer has to email before knowing what ordering looks like | offer the trade site for restaurant, bar and shop buyers | link trade, restaurant
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
Hi Steven, I wrote in August about the wine descriptions, and your new tasting notes fix that.

You offer import and distribution to restaurants, bars and wine shops, but your B2B page is one paragraph and a form, and the only terms on the site are written for private customers, so every trade buyer has to email you before they've seen what ordering from you looks like.

I built Eten Maar, a food brand, from zero and owned its partnerships and pricing.

Shall I send you over what the trade site for your restaurant, bar and shop buyers looks like?
```

### Vincent Bucaille, Melba, ctc_xtQnzSvvms6TEoAxS

v1 (no web checkout) KILLED: pay.melba.app is a Stripe Checkout since 2023. v2 on Raka's standing privacy rule, red team
FIX applied. Verified from Stockholm on melba.app, www and en: _ga, _ga_SZZR4LNBQX, amp_0250eb set and Google Analytics,
Amplitude, DoubleClick called before any click; no consent tool, no consent mode, no banner in French locale renders
(control: axeptio.eu banner shows). Every policy page FR and EN has zero cookie or traceur hits. Policy still names Teasy
and 56 rue de Maubeuge, though BODACC shows the name change to MELBA on 2023-07-05. Capital increases on BODACC 30 Jan,
24 Mar, 26 May 2026 (small nominal steps, so "bringing in new capital" not "raising"). Never about the app's content, no
legal claims (his policy cites legitimate interest for analytics). Side finding for Raka only: the policy sends data
requests to contact@melba.ai, which has no mail record.

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
thread: problem the website starts Google Analytics and Amplitude before visitors agree and the privacy policy still names Teasy | cost the gap between what the site does and what the policy says gets checked in investor diligence as capital keeps coming in | offer the privacy safe Melba website | link website, privacy
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

However, your website starts Google Analytics and Amplitude before visitors agree to anything, and your privacy policy still names Teasy and never mentions cookies. This causes people deciding whether to trust Melba with their data to be tracked before they've agreed.

Especially, when you are bringing in new capital this year, the gap between what your site does and what your policy says is the kind of thing investor due diligence picks up.

I run Astra agency. We build websites for brands like Unilever, AXA, Pertamina. I was Heineken's global e business data and insights lead, where we gave 23 markets self serve insights with data governance across regions, so I know how to keep the numbers you need while only tracking people who've agreed.

Shall I send you over what the privacy safe Melba website looks like?
```
