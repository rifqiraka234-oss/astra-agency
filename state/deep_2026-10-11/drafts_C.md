<!-- Deep research batch b15_C, 2026-10-11. Nothing sent. Re pull each thread with a control and reopen every claim source in the minute before any send. Raka's word needed per message. -->
# Deep research drafts, b15_C, 2026-10-11

### Marjolein Schoot Uiterkamp, Billie Swim, ctc_vmg2iAtNxvpSW7d93

```gate
lead: Marjolein Schoot Uiterkamp, founder of Billie Swim, KvK 91312639 eenmanszaak (sole proprietorship) since 2023-09-08, Amsterdam 1036 KR, per https://www.billieswim.com/policies/legal-notice and https://www.liza.nl/en/91312639/billie-swim , ctc_vmg2iAtNxvpSW7d93, lea_MHtNLjtyyDrGQRxhk, campaign W1b, jobTitle "Founder", tagline "BILLIE SWIM, House of SU". About page "Billie Swim was founded by Marjolein Schoot Uiterkamp". Thread pulled 2026-10-11 11:08 UTC, 0 items, nextPage null, control ctc_ch3vFcKAkjQdMKDCg 2 items same minute, sentOnly shows only our 2026-10-10 connect note, accepted 2026-10-10 15:20 UTC per the activities endpoint, no state file hit
site pass 1: 150 URLs, tools/crawl.py with sitemaps and links, 67 distinct pages, every page read
site pass 2: 150 URLs, second crawl, 89 distinct pages, plus every one of the 64 sitemap URLs and 6 policy pages read again (70 pages, all 200), site-audit.js printed RENDER NOT TRUSTED (12 of 12 assets ours) so render-via-curl.js was used, home 267 served 0 curl errors, wholesale page 188 served 0 curl errors, desktop and phone screenshots opened
deep analysis: A modern Shopify store for a two year old Amsterdam slow swimwear label, 25 products, 281 of 317 size variants in stock, nothing new since 2026-07-01. The consumer side is polished (photography, reviews 5.00 from 32, press from Glamour UK, Vogue UK, Tatler, JAN). The trade side is one page. The nav item WHOLESALE opens /pages/stockists, which is the heading Wholesale, one sentence asking retailers to reach out at hello@billieswim.com (plain text, no mailto), then a consumer Shop now grid. No lookbook, line sheet, terms, minimums or stockist list on any of 70 pages. Returns, press and wholesale all go to the same inbox. Her 2026 plan is retail partners (About You in seven countries, trade fairs, physical stores) and she showed summer 2027 at Maredamare in July
owner linkedin: same person as the contact. Route 1 curl https://www.linkedin.com/in/marjoleinschootuiterkamp and /recent-activity/all/ both 999. Route 2 web search "Marjolein Schoot Uiterkamp" LinkedIn, no profile result. Route 3 site:linkedin.com/posts search, nothing indexed. Route 4 company page employees, 2 to 10, lemlist employeeCount 2. Route 5 her post https://www.linkedin.com/feed/update/urn:li:activity:7500462807268839424/ read in full via fetch-walled, 2026-09-01, cash flow and the summer 2027 collection. Route 6 interviews read in full, FashionUnited 2026-04-23, Marie Claire 2026-06-09, JAN 8/2026
contact linkedin: same person as owner, the legal notice, the KvK form, the About page and lemlist all agree, same six routes
google news: tools/news.py nl 2026-10-11 ~11:20 UTC, "Billie Swim" 10 (HLN 2026-07-28 Antwerp pop up, JAN 2026-07-25, Marie Claire 2026-06-09 and 06-26, FashionUnited 2026-04-23, Parool 2025-07-21), "Marjolein Schoot Uiterkamp" 6, control Heineken 100, and en run with control Tesco
regional news: tools/news.py (Amsterdam badmode OR zwemkleding) swimwear merk, 45, Soft Revolt swimwear (FashionUnited 2026-08-27), GEZZINA in three countries (De Ondernemer 2026-03-03, walled), Viveh closed (FashionUnited 2026-05-11)
industry news: tools/news.py badmode merk OR swimwear merk, 47, plus Uphance 2026-08-28 on the swim calendar, Maredamare 2026 exhibitor list and Firenze Fiera, JOOR, Ankorstore, About You Marketplace, EUR-Lex 2024/825
sources:
1. https://www.billieswim.com/pages/stockists
2. https://www.billieswim.com/policies/legal-notice
3. https://www.billieswim.com/pages/about-us
4. https://www.billieswim.com/products.json
5. https://www.liza.nl/en/91312639/billie-swim
6. https://fashionunited.be/nieuws/business/billie-swim-groeit-vanuit-merkidentiteit-met-focus-op-beleving-en-selectieve-partners/2026042348715
7. https://marieclaire.nl/artikel/687729/zo-ziet-de-werkweek-van-billie-swim-founder-marjolein-schoot-uiterkamp-eruit
8. https://www.jan-magazine.nl/mode/a73200486/duurzame-badkleding/
9. https://www.linkedin.com/company/billie-swim
10. https://www.linkedin.com/feed/update/urn:li:activity:7500462807268839424/
11. https://maredamare.underbeach.eu/espositori-2026/
12. https://www.maredamare.eu/
13. https://www.uphance.com/blog/swimwear-apparel-ops-seasonality-playbook/
14. https://gezzina.com/pages/stockists
15. https://gezzina.com/pages/become-partner
16. https://www.instagram.com/billieswim/embed/
17. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fwww.billieswim.com
18. https://fashionunited.nl/nieuws/mode/vivian-hoorn-trekt-stekker-uit-kledingmerk-viveh/2026051168938
19. https://news.google.com/rss (tools/news.py, company, person, region, industry, control)
20. full list of 173 opened URLs in marjolein_schoot_uiterkamp.md
pains: 7 judged. (1) wholesale page is one sentence and an email while SS27 preseason closes this autumn, CHOSEN with (2). (2) every buyer conversation runs through one inbox she answers at night, folded in as the AI workflow half. (3) personal AI for her week next to freelance work, runner up. (4) social, Instagram 3,254 weekly and ahead of GEZZINA, not chosen. (5) consumer site, empty FAQ, Sale, Shipping, Contact template pages and footer social links that 404, tweaks. (6) GDPR, clean from Stockholm. (7) Build Squad, not applicable
chosen: (1), costliest and hottest, wholesale is her own 2026 goal, the preseason window for summer 2027 closes in September and October, and pre orders are the money that arrives while consumer swim is out of season
sweep website: crawl.py twice and the 70 page full read of https://www.billieswim.com , render-via-curl.js screenshots, modern consumer shop, the wholesale page https://www.billieswim.com/pages/stockists is one sentence, 0 lookbook, line sheet or stockist hits, control https://gezzina.com/pages/stockists , CHOSEN
sweep gdpr: tools/eu-view.py --shopify from Stockholm on https://www.billieswim.com , 4 first party cookies, 0 third party cookies before a click, banner regionVisibility covers every EU country and GB, clean, not chosen
sweep apps: returns, press and wholesale all go to hello@billieswim.com per https://www.billieswim.com/policies/refund-policy and the wholesale page, Stoq pre order app and AI imagery already in use, the buyer finding and follow up workflow is folded into the offer
sweep social: tools/social-audit.js opened https://www.instagram.com/billieswim/ 3,254 followers latest 2026-10-07, https://www.linkedin.com/company/billie-swim 129, Facebook walled, benchmarks gezzinaofficial 1,680 latest 2026-08-15 and wallien.official 28,671, control glamouruk, not chosen
sweep squad: one founder and no developers per https://www.billieswim.com/pages/about-us and lemlist employeeCount 2, she edits her own Shopify theme, nothing to supplement, not applicable
thread: problem the wholesale page is one sentence asking retailers to email her, with no lookbook, line sheet or stockist list | cost the boutiques committing summer 2027 budgets this autumn spend them on labels they can judge without waiting | offer the wholesale site and AI workflow that wins Billie Swim stockists | link wholesale, stockist
lead read: Marjolein reads that a buyer clicking WHOLESALE gets one sentence and an email address and nothing to judge, that this costs her the boutiques ordering summer 2027 this autumn, and gets offered the wholesale site that wins Billie Swim stockists, one thread
claims:
your wholesale page is one sentence asking retailers to email you, https://www.billieswim.com/pages/stockists "If you're a retailer interested in carrying Billie Swim, we'd love to hear from you — please reach out at hello@billieswim.com.", render-via-curl.js screenshot 2026-10-11 ~11:30 UTC, main content hrefs only /collections/tops, bottoms, cover-ups
with no lookbook, line sheet or stockist list to look at, grep of both crawls and the 70 page full read of https://www.billieswim.com for lookbook, line sheet, linesheet, stockist, sold at, PDF, all 0, control https://gezzina.com/pages/stockists lists stores and https://gezzina.com/pages/become-partner names its SPRING SUMMER 2027 lookbook
INFERENCE, boutique buyers picking next summer's brands go with the labels they can judge without waiting for a reply, rests on the email only route at https://www.billieswim.com/pages/stockists and the preseason window at https://www.uphance.com/blog/swimwear-apparel-ops-seasonality-playbook/
building your network of retail partners, https://fashionunited.be/nieuws/business/billie-swim-groeit-vanuit-merkidentiteit-met-focus-op-beleving-en-selectieve-partners/2026042348715 "Voor 2026 richt Billie Swim zich op het verder uitbouwen van het partnernetwerk"
for summer 2027, https://maredamare.underbeach.eu/espositori-2026/ lists BILLIE SWIM at the fair previewing "collezioni per l'estate 2027" per https://www.maredamare.eu/ , and https://www.linkedin.com/company/billie-swim "Interested in our SS27 collection? ... Please email us at hello@billieswim.com"
INFERENCE, the boutiques that commit their budgets this autumn likely spend them on labels they could judge faster, rests on "a preseason wholesale window that closes in September and October for the following resort and summer" at https://www.uphance.com/blog/swimwear-apparel-ops-seasonality-playbook/ , worded likely. Red team cut an earlier "won't carry Billie Swim until 2028", because in season reorders and the January 2027 UNIQUE by Mode City fair (https://tradefest.io/en/event/unique-by-mode-city) leave later chances
Eten Maar credential, CEO and CMO 2020 to 2024, "Founded and scaled a stroopwafel brand from zero with five relatives. Owned acquisition, partnerships", docs/astra-master-context.md section 2A, https://www.linkedin.com/in/raka-mulya-b92885196
recheck: 2026-10-11 ~11:52 UTC, wholesale page refetched and rendered, crawl greps rerun, GEZZINA control pages reopened, FashionUnited and Maredamare lists reopened, LinkedIn company post reread. Disproof tried, searched every page for lookbook, line sheet, stockist and PDF links, searched the web for a Billie Swim listing on Faire, Ankorstore or JOOR, none found, she is on About You but only as a consumer marketplace. GEZZINA also sends its lookbook by email, so the message doesn't call email wrong, it names what's missing. Facts hold, confidence MEDIUM
```

OPENER
```
Hi Marjolein, saw Billie Swim, looks interesting!

However, your wholesale page is one sentence asking retailers to email you, with no lookbook, line sheet or stockist list to look at. This causes boutique buyers picking next summer's brands to go with the labels they can judge without waiting for a reply.

Especially, when you are building your network of retail partners for summer 2027, the boutiques that commit their budgets this autumn likely spend them on labels they could judge faster.

I run Astra agency. We build websites and AI workflows for brands like Unilever, AXA, Pertamina. I built a stroopwafel brand from zero with my family and ran its partnerships, so I know what a buyer wants to see before taking on a new brand.

Shall I send you over what the wholesale site that wins Billie Swim stockists looks like?
```

### Alexandre Francois, Cressonnette, ctc_5N8eTkQMH9tMYswtK

```gate
lead: Alexandre Francois, founder of Cressonnette and sole manager (Director since 2024-06-25) of ACB Food SRL BE 1010.749.601, Cantersteen 53, 1000 Bruxelles, per https://kbopub.economie.fgov.be/kbopub/toonondernemingps.html?ondernemingsnummer=1010749601 and the NBB filing, ctc_5N8eTkQMH9tMYswtK, lea_fXsYSq3wWpn6AtC6J, campaign W1b, tagline "Entrepreneur - Fondateur de Cressonnette | Fresh & Homemade Workplace Catering | Digital Lunch Platform". Shareholders of an SRL aren't published, MEDIUM HIGH. Thread pulled 2026-10-11 11:08 UTC, 0 items, nextPage null, control ctc_ch3vFcKAkjQdMKDCg 2 items same minute, sentOnly shows only our 2026-10-09 connect note, accepted 2026-10-09 14:34 UTC, no state file hit
site pass 1: 26 pages, tools/crawl.py on https://cressonnette.com (9 distinct pages) and https://atwork.cressonnette.com (17 routes), plus 3 PDFs, every page read
site pass 2: 26 pages, second crawl of both equal, platform rendered in Chromium because its text loads from an API, site-audit.js desktop and phone screenshots of www opened and the platform home opened, render trusted on both
deep analysis: A one counter Brussels lunch shop on Rue Cantersteen, open weekdays 11:00 to 14:30, everything made on site, plus two business offers, trays for meetings by e-mail and Cressonnette at Work, a company lunch platform where Cressonnette creates a page per company, staff order by 10:00 for delivery at 12:00, pay with Monizze, Edenred, Pluxee, card or monthly invoice, and a catering configurator. The platform tenant was created 2026-03-02 and its images are hosted by Agifly. Its growth unit is the company page, one office at a time. The channels selling it are thin, a company LinkedIn page with 12 followers and an Instagram silent since 2026-08-11
owner linkedin: same person as the contact. Route 1 curl https://www.linkedin.com/in/alexandre-francois-b6bb714a 999. Route 2 web search "Alexandre Francois" Cressonnette Bruxelles, nothing of his. Route 3 his post https://www.linkedin.com/feed/update/urn:li:activity:7495756076340932610/ read via fetch-walled, 2026-08-19, pushing atwork.cressonnette.com to companies, profile 1,743 followers. Route 4 people data, company page lists him and Laure Jourquin, NBB names him sole manager. Route 5 company page https://www.linkedin.com/company/cressonnette-food posts read. Route 6 KBO and NBB
contact linkedin: same person as owner, KBO director, NBB manager list, lemlist title and tagline agree, same six routes
google news: tools/news.py fr 2026-10-11 ~11:20 UTC, "Cressonnette" 12 none his, "Alexandre Francois Cressonnette" 0, control Carrefour 101, second run Foodiz 38 and chèques-repas 2026 2
regional news: tools/news.py (Bruxelles lunch bureau OR sandwicherie) 8, L'Éventail on Foodiz company canteen, Le Soir dark kitchens, DH 2026-07-30 on clients avoiding the centre, La Libre 2026-04-24 on 1,743 Brussels bankruptcies in 2025
industry news: tools/news.py horeca 62 and livraison lunch entreprise 39, RTL 2026-09-24 and DH 2026-09-17 on horeca bankruptcies, SoSoir 2026-10-06 (Statbel 11,665 bankruptcies in 2025), Business AM June 2026, plus Innoviris on telework and UCM on €10 meal vouchers
sources:
1. https://www.cressonnette.com/accueil
2. https://www.cressonnette.com/commande
3. https://atwork.cressonnette.com/
4. https://api.cressonnette.com/api/v1/tenant/slug/atwork
5. https://kbopub.economie.fgov.be/kbopub/toonondernemingps.html?ondernemingsnummer=1010749601
6. https://consult.cbso.nbb.be/api/external/broker/public/deposits/pdf/e151d605-a231-11f1-b8a8-9da05346b678
7. https://www.linkedin.com/company/cressonnette-food
8. https://www.linkedin.com/feed/update/urn:li:activity:7495756076340932610/
9. https://www.instagram.com/cressonnette_/embed/
10. https://www.foodiz.be/
11. https://www.linkedin.com/company/foodizdelivery/
12. https://www.innoviris.brussels/sites/default/files/2026-06/DSTTBRU%20FR.pdf
13. https://www.ucm.be/actualites/titres-repas-augmentation-10-eu-depuis-janvier-2026
14. https://sosoir.lesoir.be/775161/article/2026-10-06/apres-60-ans-dexistence-cette-institution-bruxelloise-ferme-ses-portes
15. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fwww.cressonnette.com
16. https://flyconfig.com/
17. https://news.google.com/rss (tools/news.py, company, person, region, industry, control)
18. full list of 108 opened URLs in alexandre_francois.md
pains: 7 judged. (1) the platform grows one signed office at a time with almost no channel reaching office managers, CHOSEN. (2) social, Instagram 61 days silent and LinkedIn 12 against Foodiz 2,055, runner up, same goal. (3) website, modern on both, placeholder Catering tile, nomsociété link, dead order link, spring menu, tweaks. (4) an ordering app, already built with Agifly, fails. (5) GDPR, GA cookies before consent and no privacy page, a setting. (6) personal AI, nothing public on his week. (7) Build Squad, not applicable
chosen: (1), costliest and biggest, the platform is the only place his revenue grows past a 3.5 hour counter, it's his own 2026 bet, and every office he doesn't sign is daily orders and catering he never sees
sweep website: crawl.py twice on https://www.cressonnette.com and https://atwork.cressonnette.com , site-audit.js screenshots, modern and working, small faults only (500 X 500 placeholder on the Catering tile, Créer mon compte to nomsociété, order.cressonnette.com fails three paths), not chosen
sweep gdpr: tools/eu-view.py from Stockholm on https://www.cressonnette.com and https://atwork.cressonnette.com , _ga cookies set before any click, site-audit.js no consent code and no privacy link with its control, real in Belgium but fixed with a setting, flagged, not chosen
sweep apps: the ordering platform exists per https://api.cressonnette.com/api/v1/tenant/slug/atwork and https://atwork.cressonnette.com/catering/ , built with Agifly, so the app is done, the office sales workflow is the open job, CHOSEN
sweep social: tools/social-audit.js opened https://www.instagram.com/cressonnette_/ 552 followers latest 2026-08-11, https://www.linkedin.com/company/cressonnette-food 12 followers, benchmarks foodiz.be 2,115 and LinkedIn foodizdelivery 2,055, exki 14,121, pistolet_original 6,231, control glamouruk, runner up
sweep squad: a lunch shop with a part time crew per the NBB filing and a build partner per https://flyconfig.com/ , builds no software itself, not applicable
thread: problem the Cressonnette at Work platform is built to grow one company page at a time and the company LinkedIn has 12 followers | cost offices that would order every day never hear of it while teams are only in half the week | offer the AI workflow that finds and signs the offices onto the platform | link office, platform
lead read: Alexandre reads that his office platform only grows as fast as he signs offices and that almost nobody follows the page selling it, so offices near Cantersteen that would order daily likely never hear of it, and gets offered the AI workflow that fills his platform with offices, one thread
claims:
your Cressonnette at Work platform is built to grow one company page at a time, https://www.cressonnette.com/accueil "1. Nous créons votre page entreprise ... 2. Vous invitez votre équipe ... 3. Chaque employé crée son compte", and https://www.linkedin.com/company/cressonnette-food "Une plateforme digitale entièrement personnalisée aux couleurs de chaque entreprise", fetched 2026-10-11
your company's LinkedIn page has 12 followers, https://www.linkedin.com/company/cressonnette-food "12 followers", social-audit.js and fetch-walled 2026-10-11 ~11:30 UTC
INFERENCE, the offices near Cantersteen that would order every day likely never hear it exists, rests on the 12 followers above, Instagram silent since 2026-08-11 at https://www.instagram.com/cressonnette_/embed/ , and no sales hire or ads seen
filling the platform with Brussels offices, https://www.linkedin.com/feed/update/urn:li:activity:7495756076340932610/ "livrés chaque jour aux entreprises ... découvrez notre plateforme dédiée aux entreprises", https://www.cressonnette.com/commande "Cressonnette livre chaque jour des lunchs frais et faits maison directement au bureau"
many teams work from home half the week, https://www.innoviris.brussels/sites/default/files/2026-06/DSTTBRU%20FR.pdf "environ 2 à 3 jours par semaine ... soit la moitié du temps de travail"
INFERENCE, the offices you never reach are daily orders you're likely missing, rests on order by 10:00 for noon delivery at https://www.cressonnette.com/accueil and the telework share above
Betty Blocks credential, "automation-driven revenue workflows covering enrichment, scoring, routing and follow-up loops", docs/astra-master-context.md section 2A, https://www.linkedin.com/in/raka-mulya-b92885196
recheck: 2026-10-11 ~11:53 UTC and again ~11:57 UTC, /accueil and /commande refetched, red team softened "grows one signed office at a time" to "is built to grow one company page at a time" because the default shop and catering can take orders without a company page, LinkedIn company page refetched (12 followers), Instagram embed refetched (latest 2026-08-11), Innoviris PDF reread. Disproof tried, looked for a sales hire, ads, a partner directory or a client list on all 26 pages and the LinkedIn page, none, and his own profile has 1,743 followers, so the message says the company page, not him. Agifly sells SEO/SEA and could already run ads, none seen. Facts hold, confidence MEDIUM
```

OPENER
```
Hi Alexandre, saw Cressonnette, looks interesting!

However, your Cressonnette at Work platform is built to grow one company page at a time, and your company's LinkedIn page has 12 followers. This causes the offices near Cantersteen that would order every day to likely never hear it exists.

Especially, when you are filling the platform with Brussels offices while many teams work from home half the week, the offices you never reach are daily orders you're likely missing.

I run Astra agency. We build AI workflows for brands like Unilever, AXA, Pertamina. I built the account scoring and follow up workflows at Betty Blocks, so I know how to find the offices most likely to order and keep after them.

Shall I send you over what the AI workflow filling your platform with offices looks like?
```

### Maharjan Jagdees, MT.8848, ctc_2zdt5XmnTSPqWvhJC

```gate
lead: Jagdees Maharjan (lemlist "Maharjan Jagdees", name order flagged), Founder & CEO of MT.8848 per https://www.mt8848.info/corporatemanagement , co founder Rumita Maharjan (CTO), ctc_2zdt5XmnTSPqWvhJC, lea_LBs9SJ3wXhwoFWD9C, campaign W1b, tagline "Founder bei MT.8848 Label GmbH WEAR THE CHANGE.". The GmbH is not found in North Data (control returns Ingolstadt GmbHs) or OpenCorporates, handelsregister.de errored, the shop has no Impressum, so the legal entity is UNCONFIRMED and founder status rests on his own site, MEDIUM. Thread pulled 2026-10-11 11:08 UTC, 0 items, nextPage null, control ctc_ch3vFcKAkjQdMKDCg 2 items same minute, sentOnly shows only our 2026-10-09 connect note, accepted 2026-10-10 05:01 UTC, no state file hit
site pass 1: 150 URLs, tools/crawl.py with sitemaps and links (97 products, 51 blog posts), every page read
site pass 2: 606 URLs, every sitemap URL fetched again with a browser fingerprint (17 pages, 15 categories, 574 products, all 200) and grepped, key pages rendered in Chromium, site-audit.js screenshots of home desktop and phone, the blank Imprint page and the shipping page opened, render trusted
deep analysis: A 2025 Wix shop with 574 product pages, print on demand blanks (Gildan, Tultex, Jerzees) and third party lines (BYMANYC sneakers, loofahs, phone cases with California Prop 65 warnings) under a sustainable label story. The pages a shopper reads before paying are copied or unfinished, customer service is H&M's FAQ with its contact and returns links pointing to www2.hm.com, the terms say "your order on hm.com", shipping and returns and the store policy are Wix sample text, and the Imprint page is blank. Selling runs through LinkedIn (company 1,160, personal 9,550), Facebook has 3 followers, no Instagram is linked
owner linkedin: same person as the contact. Route 1 curl https://www.linkedin.com/in/maharjan-jagdees-b5b7881b4 999. Route 2 web search "Jagdees Maharjan" OR "Maharjan Jagdees" Ingolstadt, nothing of his. Route 3 site:linkedin.com/posts search nothing, his post https://www.linkedin.com/feed/update/urn:li:activity:7502632532199350272/ read via fetch-walled, 2026-09-07, Nepal floods, profile 9,550 followers. Route 4 people data, company page 2 employees, site names Rumita Maharjan CTO. Route 5 company page https://www.linkedin.com/company/mt-8848/ posts read. Route 6 registers, none found
contact linkedin: same person as owner, the Corporate Management page and lemlist agree he's the founder, same six routes
google news: tools/news.py de 2026-10-11 ~11:20 UTC, "MT.8848" 37 all Mount Everest, "Maharjan Jagdees" 0, control Volkswagen 102
regional news: tools/news.py (Ingolstadt Modelabel OR Ingolstadt Mode) 0 with the control full, (Ingolstadt Einzelhandel Mode 2026) 0
industry news: tools/news.py Onlinehandel Mode bevh 20 (Logistik Heute 2026-10-09, Q3 +2.9% below inflation), EmpCo 38 (Merkur 2026-09-28, Noerr 2026-09-23, Shopbetreiber Blog 2026-09-23, eRecht24), plus the IHK München Impressum Merkblatt and Händlerbund
sources:
1. https://www.mt8848.info/customer-service
2. https://www.mt8848.info/terms-conditions
3. https://www.mt8848.info/customer-service/shipping-returns
4. https://www.mt8848.info/cookie-notice
5. https://www.mt8848.info/corporatemanagement
6. https://www.mt8848.info/store-products-sitemap.xml
7. https://www2.hm.com/de_de/customer-service/returns.html
8. https://www2.hm.com/de_de/customer-service/kontakt.html
9. https://www.linkedin.com/company/mt-8848/
10. https://www.facebook.com/profile.php?id=61571857402213
11. https://www.northdata.de/_search?query=Maharjan%20Ingolstadt
12. https://ihk-muenchen.de/ihk/Merkbl%C3%A4tter-WettbewerbsR/Pflichtangaben-Internetimpressum_Stand05_2024.pdf
13. https://www.e-recht24.de/ecommerce/13535-empco-richtlinie.html
14. https://logistik-heute.de/news/e-commerce-onlinehandel-leidet-unter-schlechter-konsumstimmung-287850.html
15. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fwww.mt8848.info
16. https://www.instagram.com/armedangels/embed/
17. https://news.google.com/rss (tools/news.py, company, person, region, industry, control)
18. full list of 717 opened URLs in maharjan_jagdees.md
pains: 7 judged. (1) the shop's trust pages are copied from H&M or Wix samples, so traffic doesn't turn into orders, CHOSEN. (2) legal exposure, no Impressum and generic green claims since 27 Sept 2026, folded into (1) and flagged. (3) social, Facebook 3 and no Instagram linked, runner up. (4) AI app, Wix chatbot and auto posting already used. (5) personal AI, nothing public. (6) GDPR, clean from Stockholm. (7) Build Squad, not applicable
chosen: (1), biggest and costliest, every visitor his LinkedIn posts send lands on pages that point to H&M or say nothing, so the effort he puts into traffic can't convert, and the same pages are his legal risk in Germany
sweep website: crawl.py and a 606 page fetch of https://www.mt8848.info , rendered anchors on /customer-service go to www2.hm.com, /terms-conditions names hm.com, sample text on shipping and store policy, blank Imprint, screenshots opened, CHOSEN
sweep gdpr: tools/eu-view.py from Stockholm on https://www.mt8848.info , 12 first party cookies and 0 third party cookies before a click, banner with Accept and Settings per site-audit.js, the Impressum gap is the legal issue and is folded into the website offer
sweep apps: https://www.mt8848.info/contact offers "our chatbot 24/7" (Wix AI chat widget in the HTML) and the LinkedIn posts are wix.to auto shares, they already run the tools, not chosen
sweep social: tools/social-audit.js opened https://www.linkedin.com/company/mt-8848/ 1,160 followers posting this week and https://www.facebook.com/profile.php?id=61571857402213 3 followers, no Instagram linked in the HTML, benchmarks armedangels 415,721, hessnatur 125,074, recolution 31,785, control glamouruk, runner up
sweep squad: a two founder Wix shop per https://www.mt8848.info/corporatemanagement , no developers, nothing to supplement, not applicable
thread: problem customer service sends shoppers to H&M's contact and returns pages and the terms name hm.com | cost shoppers checking returns before paying lose trust, and more LinkedIn traffic means more of them hit the same pages | offer the MT.8848 shop that shoppers trust | link shop, trust
lead read: Jagdees reads that his customer service links go to H&M and his terms still say hm.com, so shoppers who check returns before paying lose trust and leave, which grows with every product he pushes on LinkedIn, and gets offered the MT.8848 shop that shoppers trust, one thread
claims:
your customer service page sends shoppers to H&M's contact and returns pages, https://www.mt8848.info/customer-service rendered anchors 2026-10-11 ~11:52 UTC "contact us -> https://www2.hm.com/de_de/customer-service/kontakt.html", "here. -> https://www2.hm.com/de_de/customer-service/returns.html", "here . -> https://www2.hm.com/de_de/customer-service/returns.html", both targets opened, H&M DE pages
your terms still talk about orders on hm.com, https://www.mt8848.info/terms-conditions rendered text "arising from your order on hm.com is limited to the total amount of your order", second hit "copyrights on hm.com remain with MT.8848"
INFERENCE, shoppers who check how to return an order before paying lose trust and leave, rests on the two facts above and the Wix sample text at https://www.mt8848.info/customer-service/shipping-returns
more than 500 products, https://www.mt8848.info/store-products-sitemap.xml 574 product URLs, all 606 sitemap pages answered 200 on 2026-10-11
pushing them to your LinkedIn followers, https://www.linkedin.com/company/mt-8848/ posts linking the Women's Collection, Best sellers and "Accessories category-77 curated pieces" via wix.to, 1,160 followers
INFERENCE, the shoppers you send there likely hit the same H&M pages before they buy, rests on the LinkedIn links above and the customer service page being linked from the footer of every page per https://www.mt8848.info/customer-service
freelance social media and branding consultant Dec 2020 to Feb 2023, docs/astra-master-context.md section 2A, https://www.linkedin.com/in/raka-mulya-b92885196
recheck: 2026-10-11 ~11:55 UTC, customer service anchors rendered again, terms rendered and searched, both H&M targets reopened, product sitemap recounted (574), LinkedIn company page refetched. Disproof tried, searched all 606 pages for an address and found one in a product safety block on 11 product pages (Feldkirchener Str. 65, Ingolstadt), so the message no longer says the shop has no address anywhere, and found no Impressum, GmbH or register line. Facts hold, ICP fit is uncertain, confidence MEDIUM
```

OPENER
```
Hi Jagdees, saw MT.8848, looks interesting!

However, your customer service page sends shoppers to H&M's contact and returns pages, and your terms still talk about orders on hm.com. This causes shoppers who check how to return an order before paying to lose trust and leave.

Especially, when you are pushing more than 500 products to your LinkedIn followers, the shoppers you send there likely hit the same H&M pages before they buy.

I run Astra agency. We build websites for brands like Unilever, AXA, Pertamina. I worked as a freelance branding consultant for over two years, so I know what a new label has to show before strangers trust it with an order.

Shall I send you over what the MT.8848 shop that shoppers trust looks like?
```
