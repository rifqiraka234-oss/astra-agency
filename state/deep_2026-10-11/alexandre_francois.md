# Alexandre Francois, Cressonnette (cressonnette.com, atwork.cressonnette.com)

ctc_5N8eTkQMH9tMYswtK, lea_fXsYSq3wWpn6AtC6J, campaign W1b (cam_7gnHSf6GvvGy8gH3n). Research 2026-10-11, 11:08 to 11:58 UTC.

**Note for Raka first.** Cressonnette is a Brussels lunch shop and office lunch platform, not a French food brand. It's run through ACB Food SRL in Brussels, French speaking. Everything below is Belgian context.

## 1. Thread

- `get_inbox_conversation(ctc_5N8eTkQMH9tMYswtK)` at 11:08 UTC: 0 activities, `nextPage` null. Control `ctc_ch3vFcKAkjQdMKDCg` came back with its 2 items in the same minute.
- sentOnly search "Alexandre Francois": one conversation ibx_nB8z8pwuXweZgueFr, lastRepliedAt null, preview is our connect note.
- Lead activities: conditionChosen 2026-10-08 13:35, visit 13:38, like of his post 13:48, connect note 2026-10-09 14:13:46, `linkedinInviteAccepted` 2026-10-09 14:34:58. Nothing after.
- State grep for name, both IDs and "Cressonnette": nothing.
- **Shape: OPENER.**

## 2. Record

- jobTitle "Founder Cressonnette Frais & Fait maison", tagline "Entrepreneur - Fondateur de Cressonnette | Fresh & Homemade Workplace Catering | Digital Lunch Platform", companyName Cressonnette, companyDomain cressonnette.com, location Brussels. companyIndustry "Accommodation Services" (wrong, it's food). Company record: description "Frais et fait maison", employeeCount 1, LinkedIn followers 12, founded 2024. No summary or experience on the record.
- Reconciled. Tagline, title and company agree, no "former". He owns the job he holds.

## 3. Ownership, statutory (KBO and NBB)

- The site carries no legal notice, so the company was found by address. KBO name search "cressonnette" gave only NATH & C° (trade name LA CRESSONNETTE, a Soignies taxi firm, ruled out). KBO address search Cantersteen 53, 1000 Bruxelles gave ACB Food (1010.749.601) and SNACK'IN (0729.917.476).
- **ACB Food SRL, BE 1010.749.601**: active, started 25 June 2024, seat Cantersteen 53, 1000 Bruxelles, **Director François, Alexandre since 25 June 2024**, employer (NSSO) since 1 October 2024, VAT since 15 July 2024, NACE 56.112 limited service restaurants.
- NBB Central Balance Sheet Office: first accounts, 25 June 2024 to 31 December 2025, micro model, filed 31 August 2026, approved 25 June 2026. The PDF lists one manager, François Alexandre (Uccle). Staff table, 12 part time workers at year end (2.5 FTE), average 3 FTE. Shareholders are not published for an SRL, so ownership rests on him being the sole manager plus "Fondateur" on his own profile. **Owner and manager, MEDIUM HIGH.** No money figure from the accounts is used anywhere.
- Context from the register, the previous company at the same address, SNACK'IN SRL, went into bankruptcy on 11 September 2023.
- LinkedIn company page gives "Cantersteen 43", the site and KBO say 53. Minor, not used.

## 4. Prior notes

None in state/ or logs/.

## 5. Deep research

### 5a. The whole site, both properties

- **cressonnette.com (Squarespace)**. Pass 1 `tools/crawl.py`, 14 URLs fetched, 9 distinct pages (home, notreconcept, menu, commande, commande-entreprise, contact, allergenes-1, accueil, home). Pass 2, 10 fetched, the same 9 distinct pages, every page read again. Sitemap 8 URLs. Three PDFs, MENU-printemps-ete-26.pdf (Illustrator file dated 2026-06-17), MENU-Cressonnette-printemps-ete-25.pdf (2025-07-31) and the allergen PDF.
- **atwork.cressonnette.com (Next.js platform, "Cressonnette at Work")**. Pass 1 and pass 2, 17 routes each (home, shop, boutique, catering, mix builder, engagements, contact, register, login, inscription, connexion, forgot password, six category pages). Rendered in Chromium because the text loads from an API.
- **What the business is, from its own pages.** A lunch shop at Rue Cantersteen 53, open Monday to Friday 11:00 to 14:30, sandwiches at €6.50 to €6.90, salads €10, hot dishes, soups, desserts, all made on site. Two B2B offers. "Plateaux et réunions", trays for meetings and events ordered by e-mail. "Cressonnette at Work", order before 10:00 for delivery at 12:00, "Simple, rapide et 100 % gratuit pour votre entreprise". /accueil spells out the model, "1. Nous créons votre page entreprise ... 2. Vous invitez votre équipe ... 3. Chaque employé crée son compte ... 4. Commandez jusqu'à 10h", payment by Monizze, Edenred, Pluxee meal vouchers, card, Bancontact, monthly invoice. The platform also has a catering configurator, "Mix sur mesure, en 2 minutes", trays from €4 to €14.50 a head, FR, EN and NL.
- **Platform facts from its own API.** `api.cressonnette.com/api/v1/tenant/slug/atwork` gives tenant "Cressonnette", created 2026-03-02, cutoff 10:00, billing day 28. Images are served from cressonnette.data.flyconfig.com, and flyconfig.com says "Welcome Agifly.be", a Brussels agency that does design, development, Odoo, hosting and SEO/SEA. So the platform has a build partner. Every subdomain serves the platform (zzqtest123.cressonnette.com control), it's built for one subdomain per company.
- **Render.** site-audit.js on www, render trusted, desktop and phone screenshots opened, a clean modern Squarespace site. site-audit.js on atwork, render trusted, desktop screenshot opened, a busy template layout with a green hero, a catering hero and category tiles.
- **Small faults, all tweaks.** The Catering tile on the platform home shows a grey "500 X 500" template placeholder (rendered DOM gives /assets/img/hero/4.jpg, 500x500, opened, it's a placeholder graphic). "Créer mon compte" on /accueil links to `nomsociété.cressonnette.com`, the example name from the instructions, which opens a tenant literally called that. The "commande payée en ligne" link on /commande-entreprise goes to order.cressonnette.com, which fails three ways (curl 000, fetch-walled 502, WebFetch 503) while example.com loads, and plain HTTP gets an OVH webhosting 404, so it's very likely dead (Raka to open before it's ever said). The downloadable menu is still "printemps été 26" in October.

### 5b. Social

- `tools/social-audit.js`. Instagram https://www.instagram.com/cressonnette_/ via /embed/, 552 followers, 44 posts, latest 2026-08-11 (61 days ago). Before that 2026-05-28, 05-26, 05-21, 05-18, so nothing from 28 May to 11 August either. Latest captions push "Vos lunchs d'entreprise frais et faits maison livrés directement à votre bureau".
- LinkedIn company https://www.linkedin.com/company/cressonnette-food, **12 followers**, 2 employees shown (Alexandre Francois, Laure Jourquin), founded 2024. Posts read in full via fetch-walled. About 4 months ago, launch of "Cressonnette At Work ... Une plateforme digitale entièrement personnalisée aux couleurs de chaque entreprise". About 2 months ago, "Fini les 15 mails pour organiser un lunch au bureau ... Que vous soyez 5, 20, 50 ou 200 personnes".
- Google Maps payload: Cressonnette, Cantersteen 53, category Sandwicherie, 4.6 from 50 reviews.
- Benchmarks through the same tool. Foodiz (Brussels, the same "catering for my team" and "cantine, my own lunch" model per https://www.foodiz.be/), Instagram 2,115, latest 2026-10-06, **LinkedIn 2,055**. EXKi 14,121. Pistolet Original 6,231. Fait Maison (Louise and Schuman, delivery from €50, order before 11h) links no social accounts. Control glamouruk read in the same run.

### 5c. The owner (six routes)

1. curl https://www.linkedin.com/in/alexandre-francois-b6bb714a, 999.
2. Web search "Alexandre Francois" Cressonnette Bruxelles, nothing of his.
3. Posts, his own post that lemlist liked, activity 7495756076340932610 (2026-08-19), read via fetch-walled, "Des produits frais et faits maison, livrés chaque jour aux entreprises ... découvrez notre plateforme dédiée aux entreprises 👉 atwork.cressonnette.com". Profile shows 1,743 followers, 79 posts.
4. People data, the company page lists him and Laure Jourquin. The NBB filing names him as sole manager.
5. Company page posts, read (above).
6. Registers, KBO and NBB (above). No other company found for him by address, his personal mandates are not searchable on KBO by person.

### 5d. News

`tools/news.py` fr, control Carrefour 101. Company "Cressonnette" 12, none his. Person 0. Regional 8, industry 39. Second run on the market, Foodiz 38, "chèques-repas 2026" 2, horeca 62. Opened at source: L'Éventail on Foodiz (2024-12-19), Forbes Belgique on Fresheo, RTL Info 2026-09-24 and DH 2026-09-17 on horeca bankruptcies, SoSoir 2026-10-06 (Statbel counted 11,665 bankruptcies in Belgium in 2025, a record since 2013, restaurants worst for job losses), DH 2026-07-30 ("Beaucoup de clients ne souhaitent plus se rendre dans le centre de Bruxelles"), La Libre 2026-04-24 (the Brussels francophone business court pronounced 1,743 bankruptcies in 2025, horeca among the worst), Business AM 2026-07-24 (bankruptcies up 37.8% in June), Le Soir 2026-05-26 (594 dark kitchens), Le Courrier on Uber buying Delivery Hero (2026-07-17). Walled, Trends (human check), bx1 (Cloudflare), Group S (403).

### 5e. Registers

Above. Employer since October 2024, 12 part time workers at the end of 2025. No insolvency, no address change.

### 5f. Jobs

No careers page, no vacancy found on the site, the platform or the LinkedIn page.

### 5g. Industry and region

- Telework in Brussels. Innoviris (June 2026), "La fréquence moyenne actuelle et désirée du télétravail est d'environ 2 à 3 jours par semaine pour un équivalent temps plein, soit la moitié du temps de travail", and it "affecte les commerces locaux" in a tertiary city.
- Meal vouchers. From 1 January 2026 the face value can reach €10, but the increase isn't automatic, sectors and employers decide (UCM, Forum for the Future, the Chamber bill 56K1584). His platform takes Monizze, Edenred and Pluxee.
- Competitors selling the same office lunch, Foodiz (company canteen and catering, dark kitchen model, Tour & Taxis), Fait Maison (two counters, delivery in Brussels), plus the delivery platforms consolidating (Uber and Delivery Hero).
- Horeca in Belgium is under real pressure in 2026, record bankruptcies, centre footfall complaints, energy and food costs.

### 5h. Privacy from the EU

`tools/eu-view.py` from Stockholm. www.cressonnette.com sets _ga and _ga_BRCRSLQG5J before any click, requests googletagmanager, region1.analytics.google.com and stats.g.doubleclick.net, and site-audit.js found no consent code and no privacy link (absences confirmed against its control). atwork.cressonnette.com sets _ga and _ga_7YR39NDQ9N before a click too. This is a real GDPR fault in Belgium, fixed with a consent tool and a privacy page, which is a setting and an afternoon. Flag, not the angle.

## 6. What he's facing right now

1. Cressonnette is young. ACB Food SRL was founded on 25 June 2024 and filed its first accounts on 31 August 2026 (KBO, NBB).
2. It's one counter on Rue Cantersteen, open only on weekdays from 11:00 to 14:30, so every euro comes from the lunch hours (site footer).
3. The team is mostly part timers, 12 part time workers at the end of 2025, about 2.5 full time (NBB filing).
4. His 2026 bet is Cressonnette at Work, a company lunch platform live since spring 2026 with a page per company, ordering by 10:00, delivery at noon and meal vouchers, and it's what his tagline now leads with (platform API, /accueil, LinkedIn posts, tagline "Digital Lunch Platform").
5. The platform's reach is thin. The company LinkedIn has 12 followers and Instagram hasn't posted since 11 August, while Foodiz, selling the same thing in Brussels, has 2,055 LinkedIn followers (social-audit.js).
6. Around him, Belgian horeca is going through record bankruptcies, central Brussels footfall is a known complaint, and the shop that held the same address before him went bankrupt in 2023 (SoSoir, La Libre, DH, KBO).
7. Office lunch in Brussels has shrunk to office days, telework runs at two to three days a week for those who can (Innoviris).
8. INFERENCE, rests on clues 2, 4 and 7: walk in trade alone can't fill the counter, so the platform is how he turns office days into daily orders, and it only grows as fast as he signs offices one by one.
9. INFERENCE, rests on clues 3 and 5: with a part time crew and the counter to run, the selling of the platform likely falls on him in the hours outside lunch, with no channel yet that reaches office managers at scale.
10. Small unfinished bits on the platform (a placeholder Catering tile, a sign up link to "nomsociété", a dead old order link, a spring menu in October) say it's been launched fast and is still being finished (rendered DOM, curl).

## 7. Clues record

```
clues
  2024-06-25 https://kbopub.economie.fgov.be/kbopub/toonondernemingps.html?ondernemingsnummer=1010749601 ACB Food SRL founded, director Alexandre François
  2025-12-31 https://consult.cbso.nbb.be/api/external/broker/public/deposits/pdf/e151d605-a231-11f1-b8a8-9da05346b678 12 part time workers at year end
  2026-03-02 https://api.cressonnette.com/api/v1/tenant/slug/atwork platform tenant created
  ~2026-06   https://www.linkedin.com/company/cressonnette-food launch post for Cressonnette At Work, 12 followers
  2026-06    https://www.innoviris.brussels/sites/default/files/2026-06/DSTTBRU%20FR.pdf telework 2 to 3 days a week
  2026-08-11 https://www.instagram.com/cressonnette_/ last Instagram post
  2026-08-19 https://www.linkedin.com/feed/update/urn:li:activity:7495756076340932610/ his post pushing the platform to companies
  2026-10-11 https://www.cressonnette.com/accueil "Nous créons votre page entreprise"
sources with nothing       no news about the shop, no careers, Trends and bx1 walled
inference                  the platform is his growth bet and it grows one signed office at a time, with almost no channel reaching office managers, rests on clues 3, 4, 6, 7 and 8
contradictions             his own LinkedIn has 1,743 followers and he posts the platform there, so reach isn't zero. Agifly may also run SEO or ads for him (they sell SEO/SEA), none seen
grade                      SUPPORTED
impact aimed at            filling Cressonnette at Work with Brussels offices
```

## 8. Judge, every candidate angle

| Angle | Proof | What it costs him | Would he name it | Incumbent | Do they sell it | Verdict |
|---|---|---|---|---|---|---|
| A, AI workflow for the company, office sales | The platform is built for offices, a page per company, his posts all ask companies to sign up, LinkedIn page 12 followers, no sales hire | Every office not on the platform is daily lunch orders and catering trays he never sees, on top of a counter open 3.5 hours a day | Yes, his tagline leads with the platform | Agifly built the platform and sells SEO/SEA, none of it visible, no outbound sales tool seen | No | **CHOSEN** |
| D, social and branding | Instagram 552 and silent 61 days, LinkedIn company 12 against Foodiz 2,055 | Office managers don't see him, same goal as A | Probably | Himself | No | Runner up, it's the same goal through a slower channel for B2B buyers |
| B, website for growth | Main site modern, platform modern and working, placeholder tile, nomsociété link, dead order link, old menu | Tweaks, an afternoon each, and the platform has a build partner | No | Agifly | No | Favours only |
| App for the company | He already runs a custom ordering platform with company pages, configurator and meal vouchers | Nothing to build | No | Agifly | No | Fails "already runs it" |
| C, personal AI for the owner | Counter at lunch, part time crew, sales on top | His hours, inference only | Maybe | None | No | Not chosen, nothing public about his week |
| GDPR | _ga cookies before any click, no consent tool, no privacy page, Belgium | A complaint risk with the Belgian DPA, fixed with a setting | No | Agifly or Squarespace | No | Flag for Raka, a favour, fails the tweak test |
| Build Squad | A food business with a dev partner | Nothing | No | Agifly | No | Not applicable |

**Winner, A.** It's the costliest because the platform is the one place his revenue can grow beyond the lunch hours, it's his own current bet (built this spring, pushed in August), and offices are signed one at a time with almost no channel reaching the people who decide.

## 9. Verdict

OPENER, AI workflows, "the AI workflow filling your platform with offices". Confidence MEDIUM. Facts verified, the cost is inference.

Flags for Raka.
- Belgian, not French. Writing in English per the rules.
- GDPR fault is real on both properties (GA before consent, no privacy page). Kept out of the opener, fails the tweak test, worth a favour later.
- order.cressonnette.com looks dead from three paths. Not used, Raka opens it before anyone ever says it.
- The platform has a build partner (Agifly, via flyconfig). Pitch the selling, not the platform.

## 10. Draft (copied byte for byte from drafts.md, where the full gate sits)

OPENER
```
Hi Alexandre, saw Cressonnette, looks interesting!

However, your Cressonnette at Work platform is built to grow one company page at a time, and your company's LinkedIn page has 12 followers. This causes the offices near Cantersteen that would order every day to likely never hear it exists.

Especially, when you are filling the platform with Brussels offices while many teams work from home half the week, the offices you never reach are daily orders you're likely missing.

I run Astra agency. We build AI workflows for brands like Unilever, AXA, Pertamina. I built the account scoring and follow up workflows at Betty Blocks, so I know how to find the offices most likely to order and keep after them.

Shall I send you over what the AI workflow filling your platform with offices looks like?
```

## 11. Red team (separate pass, 2026-10-11 ~11:50 to 11:58 UTC)

| Sentence | Source reopened | Tried to prove it false | Result |
|---|---|---|---|
| your Cressonnette at Work platform is built to grow one company page at a time | https://www.cressonnette.com/accueil refetched, "Nous créons votre page entreprise" | The default atwork shop and the catering configurator can take orders without a company page, so the first version "grows one signed office at a time" overstated it | REWRITTEN to "is built to grow one company page at a time", which is what /accueil describes |
| your company's LinkedIn page has 12 followers | https://www.linkedin.com/company/cressonnette-food refetched, "12 followers" twice | His own profile has 1,743 followers and posts the platform, so the sentence names the company page, not him | HOLDS |
| the offices near Cantersteen that would order every day likely never hear it exists | INFERENCE | Agifly sells SEO and ads and may run some, none seen. His own posts reach some offices | KEPT as "likely" |
| filling the platform with Brussels offices | his 2026-08-19 post, /commande | His words "livrés chaque jour aux entreprises ... découvrez notre plateforme dédiée aux entreprises" | HOLDS |
| many teams work from home half the week | Innoviris June 2026 PDF reread | The figure is for those who telework, "environ 2 à 3 jours par semaine ... la moitié du temps de travail", so "many teams", not "all" | HOLDS |
| daily orders you're likely missing | INFERENCE, order by 10:00 for noon on /accueil | Not provable, worded likely | KEPT |
| I built the account scoring and follow up workflows at Betty Blocks | docs/astra-master-context.md 2A, "scoring, routing and follow-up loops" | Matches the record, B2B SaaS not food, but the job (finding and following up companies) is the same | HOLDS |
| Not in the message on purpose | GDPR fault, placeholder tile, nomsociété link, dead order link | All true and all tweaks, a different family | Kept for later favours |

## 12. Source list, every distinct URL actually opened (108)

Own site first where crawled, outside sources listed first. Walled or errored pages are marked by their status. Searches that returned only snippets are not counted.

1. https://www.linkedin.com/feed/update/urn:li:activity:7495756076340932610/ (200 fetch-walled Des produits frais et faits maison, livrés chaque jour aux entreprises)
2. https://www.linkedin.com/in/alexandre-francois-b6bb714a (999 curl)
3. https://www.linkedin.com/company/cressonnette-food (200 fetch-walled Cressonnette | LinkedIn)
4. https://www.lesoir.be/748805/article/2026-05-26/plus-dun-restaurant-sur-dix-present-sur-les-plateformes-de-livraison-est-une (200 fetch-walled Plus d’un restaurant sur dix présent sur les plateformes de livraison)
5. https://www.eventail.be/societe/entrepreneuriat/foodiz-la-nouvelle-cantine-dentreprise (200 curl Foodiz, la nouvelle cantine d’entreprise • L'Éventail)
6. https://lecourrier.vn/rachat-de-delivery-hero-par-uber-nouvelle-consolidation-dans-la-livraison-de-repas/1351538.html (200 curl Rachat de Delivery Hero par Uber, nouvelle consolidation dans la livra)
7. https://www.forbes.be/fr/fresheo-zakaria-el-abdouni-27-ans-prend-les-commandes-pour-internationaliser-la-scale-up-belge/ (200 curl Fresheo : Zakaria El Abdouni, 27 ans, prend les commandes pour interna)
8. https://www.groups.be/fr/hr-news/des-titres-repas-a-10-euros-en-2026-confirmation (403 fetch-walled Error Page)
9. https://www.lalibre.be/economie/entreprises-startup/2026/10/08/une-celebre-brasserie-bruxelloise-pourrait-changer-de-mains-depuis-la-pandemie-tout-a-change-Y7V4IV662ZASLAQT7PNWLDN3GA/ (200 curl Une célèbre brasserie bruxelloise pourrait changer de mains : "Depuis)
10. https://sosoir.lesoir.be/775161/article/2026-10-06/apres-60-ans-dexistence-cette-institution-bruxelloise-ferme-ses-portes (200 fetch-walled Après 60 ans d’existence, cette institution bruxelloise ferme ses port)
11. https://www.rtl.be/actu/belgique/societe/se-donne-fond-mais-il-ny-jamais-assez-entre-faillites-et-redressements/2026-09-24/article/801199 (200 curl Horeca en crise : faillites, coûts et redressements judiciaires)
12. https://www.dhnet.be/conso/consommation/2026/09/17/les-faillites-toujours-en-hausse-dans-lhoreca-des-patrons-qui-jettent-leponge-mais-aussi-un-manque-de-recettes-pour-letat-HSNMEKPRSJAFLM3CUEMH6UHDLM/ (200 curl Les faillites toujours en hausse dans l'Horeca: des patrons qui jetten)
13. https://www.dhnet.be/regions/bruxelles/bruxelles-mobilite/2026/07/30/beaucoup-de-clients-ne-souhaitent-plus-se-rendre-dans-le-centre-de-bruxelles-a-cause-des-problemes-de-mobilite-parking-securite-et-proprete-GNM5J7KELBG7HMARWA63EDYHG4/ (200 curl "Beaucoup de clients ne souhaitent plus se rendre dans le centre de Br)
14. https://trends.levif.be/entreprises/cauchemar-dans-lhoreca-record-de-faillites-perte-detoiles-michelin-manque-de-soutien-politique/ (405 fetch-walled Human Verification)
15. https://www.innoviris.brussels/sites/default/files/2026-06/DSTTBRU%20FR.pdf (200 curl)
16. https://bx1.be/categories/news/44-des-postes-de-travail-a-bruxelles-peuvent-seffectuer-a-distance/ (403 fetch-walled Just a moment...)
17. https://bx1.be/categories/news/la-vacance-des-bureaux-en-legere-hausse/ (403 fetch-walled Just a moment...)
18. https://www.student.be/en/companies/fait-maison-a788d670-4d2f-4241-ac4b-f7d5a48b758f/ (200 curl)
19. https://www.foodiz.be/ (200 curl Food Delivery At Work | Foodiz)
20. https://www.faitmaison.be/ (200 curl Fait Maison – Votre établissement à Bruxelles – Sandwichs, Lunch, Plat)
21. https://www.exki.com/ (200 curl EXKi | Meals inspired by plants, take out or eat in)
22. https://www.takeaway.com/be-fr/ (403 fetch-walled Just a moment...)
23. https://www.pistolet-original.be/ (200 curl Belgian Restaurant in Bruxelles | Pistolet Original)
24. https://www.ucm.be/actualites/titres-repas-augmentation-10-eu-depuis-janvier-2026 (200 curl Titres-repas : augmentation du plafond à 10 € dès janvier 2026)
25. https://www.ucm.be/actualites/titres-repas-augmentation-du-plafond-10-eu-des-janvier-2026 (200 curl Titres-repas : augmentation du plafond à 10 € dès janvier 2026)
26. https://www.foodiz.be/fr/catering (404 curl Not Found)
27. https://www.foodiz.be/fr/nos-offres (404 curl Not Found)
28. https://www.faitmaison.be/commander (200 curl Panier – Fait Maison)
29. https://www.exki.com/fr/catering (404 curl Page Not Found | Order)
30. https://flyconfig.com/ (200 curl Welcome)
31. https://perspective.brussels/fr/actualites/observatoire-des-bureaux (200 curl 'S'il vous plaît... dessine-moi un bureau !' | perspective.brussels)
32. https://agifly.be/ (200 curl Agifly - Smart Design & Scalable Development.)
33. https://www.agifly.be/ (200 curl Agifly - Smart Design & Scalable Development.)
34. https://agifly.be/en/projects (200 curl Projects - Agifly)
35. https://fr.businessam.be/la-belgique-a-enregistre-des-milliers-de-nouvelles-entreprises-en-mai-suivies-dune-vague-de-faillites-en-juin/ (200 curl Belgique a enregistré des milliers de nouvelles entreprises en mai)
36. https://www.lalibre.be/economie/entreprises-startup/2026/04/24/leconomie-bruxelloise-a-continue-a-se-degrader-de-facon-significative-en-2025-TUAKCE7FINAYXJBRKL7PPVBZ6U/ (200 curl "L'économie bruxelloise a continué à se dégrader de façon significativ)
37. https://brusselstimes.com/748374/best-in-town-top-10-sandwiches-to-try-in-brussels (200 curl The Brussels Times)
38. https://www.parismatch.be/lifestyle/food/2025/11/27/cette-toute-nouvelle-enseigne-bruxelloise-se-demarque-des-autres-en-proposant-exclusivement-des-sandwichs-gastronomiques-2P6SCVVIRFE2LGUM3HWOCSZOP4/ (200 curl Cette toute nouvelle enseigne bruxelloise se démarque des autres en pr)
39. https://www.monizze.be/fr/ (200 curl Monizze — Chèques-repas, éco-chèques & rémunération flexible)
40. https://www.pluxee.be/fr (200 curl Pluxee Belgique - Avantages extralégaux pour les Entreprises)
41. https://www.edenred.be/fr (200 curl Edenred - Les avantages extralégaux des entreprises)
42. https://www.horecabruxelles.be/ (502 fetch-walled)
43. https://www.beci.be/ (200 curl Welcome to Beci the Chamber of Commerce in Brussels)
44. https://www.ucm.be/actualites/titres-repas-en-2026-comment-augmenter-leur-valeur-en-toute-securite (200 curl Titres-repas en 2026 : comment augmenter leur valeur en toute sécurité)
45. https://blog.forumforthefuture.be/fr/article/cheques-repas-a-10-des-2026-une-opportunite-parafiscale-reelle-mais-jamais-automatique/29791 (200 curl Chèques-repas à 10 € dès 2026: une opportunité (para)fiscale réelle… m)
46. https://www.lachambre.be/FLWB/Pdf/56/1584/56K1584001.pdf (200 curl)
47. https://kbopub.economie.fgov.be/kbopub/zoeknaamfonetischform.html?searchWord=cressonnette (KBO name search, one hit LA CRESSONNETTE (taxi firm, not ours))
48. https://kbopub.economie.fgov.be/kbopub/toonondernemingps.html?ondernemingsnummer=0461352883 (KBO NATH & C, trade name LA CRESSONNETTE, taxi, ruled out)
49. https://kbopub.economie.fgov.be/kbopub/zoekadresform.html?postcod1=1000&straatgemeente1=Cantersteen&huisnummer=53 (KBO address search, ACB Food and SNACK'IN)
50. https://kbopub.economie.fgov.be/kbopub/toonondernemingps.html?ondernemingsnummer=1010749601 (KBO ACB Food SRL, director François Alexandre since 2024-06-25)
51. https://kbopub.economie.fgov.be/kbopub/toonondernemingps.html?ondernemingsnummer=0729917476 (KBO SNACK'IN, same address, bankruptcy 2023-09-11)
52. https://consult.cbso.nbb.be/api/rs-consult/published-deposits?enterpriseNumber=1010749601 (NBB filings list, accounts 2024-06-25 to 2025-12-31 filed 2026-08-31)
53. https://consult.cbso.nbb.be/api/external/broker/public/deposits/pdf/e151d605-a231-11f1-b8a8-9da05346b678 (NBB accounts PDF read, staff 12 part time at year end)
54. https://www.google.com/search?tbm=map&hl=fr&q=Cressonnette+Rue+Cantersteen+Bruxelles (Maps payload, Sandwicherie, 4.6 from 50 reviews)
55. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fwww.cressonnette.com (eu-view.py, _ga cookies before any click, no consent tool)
56. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fatwork.cressonnette.com (eu-view.py, _ga cookies before any click)
57. https://www.instagram.com/cressonnette_/embed/ (social-audit.js and igposts, 552 followers, 44 posts, latest 2026-08-11)
58. https://www.instagram.com/foodiz.be/embed/ (benchmark, 2115 followers, latest 2026-10-06)
59. https://www.linkedin.com/company/foodizdelivery/ (benchmark, 2055 followers)
60. https://www.instagram.com/exki/embed/ (benchmark, 14121 followers)
61. https://www.instagram.com/pistolet_original/embed/ (benchmark, 6231 followers)
62. https://www.instagram.com/glamouruk/embed/ (positive control same run)
63. https://cressonnette.data.flyconfig.com/migrated/b928b134-1123-418c-868b-23b113b4991c/medium.webp (platform image host (flyconfig, Agifly))
64. https://dns.google/resolve?name=order.cressonnette.com&type=A (DNS 5.135.23.164 (OVH))
65. https://news.google.com/rss/search?q=Cressonnette&hl=fr&gl=FR&ceid=FR:fr (tools/news.py company 12, none theirs, control Carrefour 101)
66. https://news.google.com/rss/search?q=%22Alexandre%20Francois%20Cressonnette%22&hl=fr&gl=FR&ceid=FR:fr (tools/news.py person 0)
67. https://atwork.cressonnette.com/wp-json/ (200 curl Cressonnette — Sandwiches & Salades Maison)
68. https://atwork.cressonnette.com/wp-json/wp/v2/pages?per_page=100&_fields=id,slug,date,modified,link,title (404 curl Cressonnette — Sandwiches & Salades Maison)
69. https://atwork.cressonnette.com/wp-json/wc/store/v1/products?per_page=100 (404 curl Cressonnette — Sandwiches & Salades Maison)
70. https://www.cressonnette.com/s/MENU-printemps-ete-26.pdf (200 curl)
71. https://www.cressonnette.com/s/MENU-Cressonnette-printemps-ete-25.pdf (200 curl)
72. https://www.cressonnette.com/s/Allergenes-et-menu-cressonnette.pdf (200 curl)
73. https://api.cressonnette.com/api/v1/tenant/slug/atwork (platform tenant config, created 2026-03-02, cutoff 10:00)
74. https://atwork.cressonnette.com/assets/img/hero/4.jpg (the Catering tile image, a grey 500 X 500 placeholder, opened)
75. http://xn--nomsocit-h1ab.cressonnette.com/ (the Créer mon compte link target, placeholder tenant name, 308 then 200)
76. https://zzqtest123.cressonnette.com/ (control, any subdomain serves the platform (wildcard))
77. https://order.cressonnette.com/ (000 curl, 502 fetch-walled, 503 WebFetch, HTTP OVH 404, control example.com 200)
78. https://www.cressonnette.com/sitemap.xml (sitemap, 8 URLs)
79. https://cressonnette.com/ (crawl 200 Cressonnette)
80. https://www.cressonnette.com/commande-entreprise (crawl 200 Livraison pour entreprise — Cressonnette)
81. https://www.cressonnette.com/notreconcept (crawl 200 Notre concept — Cressonnette)
82. https://www.cressonnette.com/home (crawl 200 Cressonnette)
83. https://www.cressonnette.com/menu (crawl 200 Menu sandwiches, salades, plats faits maison - Cressonnette)
84. https://www.cressonnette.com/contact (crawl 200 Localisation cressonnette — Cressonnette)
85. https://www.cressonnette.com/allergenes-1 (crawl 200 Allergènes — Cressonnette)
86. https://www.cressonnette.com/commande (crawl 200 Commande — Cressonnette)
87. https://www.cressonnette.com/accueil (crawl 200 Accueil — Cressonnette)
88. https://www.cressonnette.com (crawl 200 Cressonnette)
89. https://cressonnette.com/menu (crawl 200 Menu sandwiches, salades, plats faits maison - Cressonnette)
90. https://cressonnette.com/commande (crawl 200 Commande — Cressonnette)
91. https://cressonnette.com/contact (crawl 200 Localisation cressonnette — Cressonnette)
92. https://atwork.cressonnette.com/ (crawl 200 Cressonnette — Sandwiches & Salades Maison)
93. https://atwork.cressonnette.com/shop/ (crawl 200 Boutique | Cressonnette)
94. https://atwork.cressonnette.com/contact/ (crawl 200 Cressonnette — Sandwiches & Salades Maison)
95. https://atwork.cressonnette.com/catering/ (crawl 200 Cressonnette — Sandwiches & Salades Maison)
96. https://atwork.cressonnette.com/register/ (crawl 200 Cressonnette — Sandwiches & Salades Maison)
97. https://atwork.cressonnette.com/login/ (crawl 200 Cressonnette — Sandwiches & Salades Maison)
98. https://atwork.cressonnette.com/boutique/ (crawl 200 Boutique | Cressonnette)
99. https://atwork.cressonnette.com/engagements/ (crawl 200 Cressonnette — Sandwiches & Salades Maison)
100. https://atwork.cressonnette.com/category/sandwiche/ (crawl 200 sandwiche | Cressonnette)
101. https://atwork.cressonnette.com/category/salade/ (crawl 200 Salades | Cressonnette)
102. https://atwork.cressonnette.com/category/desserts/ (crawl 200 Desserts | Cressonnette)
103. https://atwork.cressonnette.com/category/boissons/ (crawl 200 Boissons | Cressonnette)
104. https://atwork.cressonnette.com/category/formules/ (crawl 200 formules | Cressonnette)
105. https://atwork.cressonnette.com/catering/mix-builder/ (crawl 200 Cressonnette — Sandwiches & Salades Maison)
106. https://atwork.cressonnette.com/forgot-password/ (crawl 200 Cressonnette — Sandwiches & Salades Maison)
107. https://atwork.cressonnette.com/inscription/ (crawl 200 Cressonnette — Sandwiches & Salades Maison)
108. https://atwork.cressonnette.com/connexion/ (crawl 200 Cressonnette — Sandwiches & Salades Maison)
