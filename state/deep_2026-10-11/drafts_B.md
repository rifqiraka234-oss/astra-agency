<!-- Deep research batch b15_B, 2026-10-11. Nothing sent. Three OPENERS, each thread re pulled 2026-10-11 11:04 UTC with 0 activities, nextPage null, control ctc_ch3vFcKAkjQdMKDCg 2 items same minute. Re pull every thread and reopen every claim before any send. -->
# Deep research drafts, batch b15_B, 2026-10-11

### Josh Edelman, The Wine Flight, ctc_cAdQknSHnsBZMFvrP

```gate
lead: Josh Edelman (Joshua Victor Edelman), sole director and PSC 75% or more of THE WINE FLIGHT LTD 16953416, incorporated 9 Jan 2026, SIC 79120 tour operator, registered office 167-169 Great Portland Street London, his only appointment, ctc_cAdQknSHnsBZMFvrP, leadId lea_w7DRPeRD4QZtJfKk5, campaign cam_7gnHSf6GvvGy8gH3n (W1b) only, jobTitle "Founder & Director", tagline "Founder, The Wine Flight | Luxury Helicopter Wine Tours | WSET Diploma | Wine Writer". Connect note 2026-10-08 05:22 UTC, accepted 07:20 UTC (activities endpoint), no linkedinSent. Thread pulled 2026-10-11 11:04 UTC, 0 activities, nextPage null, control ctc_ch3vFcKAkjQdMKDCg 2 items same minute, teamConversations search "Edelman" 0, one contact only, no row in any state file
site pass 1: 16 routes rendered in Chromium by a link crawl (the site is a React app that curl sees as an empty root div, tools/crawl.py read 1 page), plus the bundle and 12 CMS API endpoints read in full (experience cards, 4 itineraries, partners, about, socials, gallery, landing, newsletter form), T&Cs and privacy PDFs read in full, every page read
site pass 2: 16 routes rendered again with desktop 1440 and iPhone full page screenshots of every route, home, experiences, an itinerary, partners, about, gallery, FAQs and enquiry opened and looked at, site-audit.js render trusted with 0 failed requests, /legal redirects to the T&Cs PDF (not a blank page, a PDF our Chromium won't draw)
deep analysis: A brand new one man tour operator (LinkedIn company page 1 employee, founded 2026) selling full private helicopter days from Battersea or the guest's door to eight English estates, from £2,600 to £3,200 a head on a full six seat cabin, groups up to 24 on request. The site is modern and premium. Every sale starts as a two step enquiry form or a phone call, then a quote, written confirmation and full payment by bank transfer, guest weights 48 hours before. Across the bundle, the CMS and all 16 rendered routes the words gift, voucher, corporate and company appear 0 times (controls Battersea 14, Rolls-Royce 4, dress code 1 found by the same three methods). Seven of the eight partner estates sell visits or wine as gifts and Gusbourne has a corporate experiences page, and Thunder Aviation, his own aircraft partner, sells its own Gusbourne helicopter wine day from £635 a head. Instagram 57 followers and 9 posts, no reviews or press anywhere. The apex thewineflight.com has no A record on two resolvers (www works)
owner linkedin: same person as the contact. Route 1 curl https://www.linkedin.com/in/josh-edelman88 999, /recent-activity/all/ 301, WebFetch 999. Route 2 web search "Josh Edelman" The Wine Flight, profile title "Josh Edelman - The Wine Flight", posts summarised as launching Spring 2026, eight estate partners, Thunder Aviation and London Luxury Chauffeuring, 15 years in fine wine. Route 3 search linkedin.com/posts josh-edelman88, no post URL indexed. Route 4 Companies House officers and PSC, the WSET 2023 yearbook lists a Josh Edelman among Diploma graduates. Route 5 company page https://www.linkedin.com/company/the-wine-flight/ via WebFetch and tools/social-audit.js, 1 employee, founded 2026, no posts visible. Route 6 lemlist tagline, his own words in the T&Cs and privacy policy (data controller Josh Edelman, Director)
contact linkedin: same person as owner, Companies House, the privacy policy and lemlist agree, same six routes
google news: tools/news.py en 2026-10-11 ~11:15 UTC, "The Wine Flight" 32 none his (EPCOT, Malvern wine shops), "Josh Edelman" 10 none his (a US comedian), control Tesco 100
regional news: tools/news.py (Sussex OR Kent OR Hampshire OR London) English wine tourism, 53, The Argus 2026-09-30 visitor centre amid a wine tourism boom, Rathfinny expansion (drinks business 2026-07-27), Chapel Down's new luxury experience room for private and corporate days (2026-06-17)
industry news: tools/news.py English wine tourism OR helicopter wine tour, 63, plus The Buyer 2026-06-27 (1.5 million visits in 2024, awareness the main obstacle), WineGB tourism report via Harpers (visits up 55%), Bolney's own blog on June to September being the fullest season
sources:
1. https://www.thewineflight.com/
2. https://www.thewineflight.com/experiences/icons-of-england
3. https://www.thewineflight.com/FAQs
4. https://www.thewineflight.com/enquiry
5. https://www.thewineflight.com/Wine_Flight_Terms_and_Conditions.pdf
6. https://www.api.thewineflight.com/_functions/landingPageSection
7. https://find-and-update.company-information.service.gov.uk/company/16953416/persons-with-significant-control
8. https://www.gusbourne.com/visits/gift
9. https://www.gusbourne.com/corporate-services/experiences
10. https://www.wistonestate.com/product/gift-vouchers/
11. https://www.sugruesouthdowns.com/pages/gift-cards
12. https://www.thunderaviation.com/experiences/gusbourne-wine-tour
13. https://bolneywineestate.com/blog/reasons-to-visit-an-english-vineyard-this-summer
14. https://the-buyer.net/opinion/ashley-saunders-on-how-to-make-the-most-of-english-wine-tourism
15. https://www.linkedin.com/company/the-wine-flight/
16. https://news.google.com/rss (tools/news.py, company, person, region, industry, control)
17. full list of 168 in /tmp/claude-0/agents/b15_B/josh_edelman.md
pains: 6 judged. (1) no way to buy a day as a gift or as a company day while his own partners sell both and winter is the gifting and planning season, CHOSEN. (2) few people know it exists, Instagram 57 followers, no press, partners don't mention him, runner up, an AI sales workflow for concierges and PAs. (3) a cheaper Gusbourne helicopter day sold by his own aircraft partner, a positioning risk, flagged. (4) bespoke quoting and logistics by one person, low volume at launch. (5) apex domain dead, a DNS fix. (6) GDPR, 0 cookies from Stockholm, clean
chosen: (1), costliest and hottest, companies and gift buyers are the two biggest buyer groups for a day priced like this, winter is when both are bought, and every partner he flies to already sells that way
sweep website: 16 rendered routes, the bundle and the CMS API of https://www.thewineflight.com read twice with screenshots, modern and premium, no gift, voucher or company content anywhere against controls Battersea and Rolls-Royce, CHOSEN
sweep gdpr: tools/eu-view.py from Stockholm on https://www.thewineflight.com , 0 cookies, only Google Fonts, wixstatic and a flag CDN before a click, clean, not chosen
sweep apps: enquiry, quote, bank transfer and guest weight collection by one person per https://www.thewineflight.com/Wine_Flight_Terms_and_Conditions.pdf , real but low volume this early, runner up as an AI sales workflow for concierges, hotels and PAs that the privacy policy names as referral partners, not chosen
sweep social: tools/social-audit.js on https://www.instagram.com/the.wine.flight/ (embed broken, og meta 57 followers 9 posts at 11:17 UTC) and https://www.linkedin.com/company/the-wine-flight/ (1 employee), against partners Wiston 27,119, Sugrue 14,076, Danbury Ridge 5,902, Thunder 4,189, a real gap, folded into the runner up, not chosen
sweep squad: a one man tour operator per https://www.linkedin.com/company/the-wine-flight/ , no product team, the site is a finished custom build, not applicable
thread: problem the site sells private helicopter wine days but says nothing about gifts or company days | cost gift and client day buyers likely buy a partner's voucher instead, and winter is when both get bought | offer the Wine Flight site that sells gifts and company days | link gift, company
lead read: Josh reads that his site never mentions gifts or company days, so the Christmas and client day buyers go to Gusbourne or Wiston vouchers instead, which matters most now that winter is when next summer's days get bought, and gets offered the Wine Flight site for gifts and companies, one thread
claims:
your site sells full days by private helicopter to England's finest wineries, https://www.thewineflight.com/ "Private helicopter access to England's finest wineries" and "full-day journeys", rendered 2026-10-11
says nothing about gifts or company days, gift, voucher, corporate and company counted 0 in https://www.thewineflight.com/assets/index-DKJ253DW.js , in every https://www.api.thewineflight.com/_functions endpoint and in all 16 rendered routes, controls Battersea 14 and Rolls-Royce 4 found by the same methods, 2026-10-11
Gusbourne and Wiston sell vouchers, https://www.gusbourne.com/visits/gift "Our Gift Experience Vouchers", https://www.wistonestate.com/product/gift-vouchers/ "Wines, Tours & Chalk Gift Vouchers", both partners on https://www.api.thewineflight.com/_functions/partners , fetched 2026-10-11
INFERENCE, gift and client day buyers likely buy one of those vouchers instead, rests on the 0 count above and the partner voucher pages https://www.gusbourne.com/visits/gift and https://www.gusbourne.com/corporate-services/experiences , worded "likely"
heading into winter with the vines bare, https://bolneywineestate.com/blog/reasons-to-visit-an-english-vineyard-this-summer "almost every vineyard open to the public runs its fullest programme of tours and tastings between June and September" and "the vines are bare" in winter, fetched 2026-10-11
INFERENCE, the gifts and company days booked now likely fill next summer's flights, rests on the season above and the launch in 2026 per https://find-and-update.company-information.service.gov.uk/company/16953416 , worded "likely"
Eten Maar credential, docs/astra-master-context.md section 2A, "Owned acquisition, partnerships, content, conversion, pricing", https://www.linkedin.com/in/raka-mulya-b92885196
recheck: 2026-10-11 11:20 to 11:50 UTC, the bundle, CMS API and 16 routes recounted for gift and company words with controls, partner voucher pages and Bolney reopened. Disproof tried, searched the T&Cs and privacy PDFs for gift, voucher and corporate (0), checked whether Show More links hide extra pages (they're expand buttons), checked Instagram (posts unreadable, so the claim is scoped to the site). His developer could add a voucher page, flagged to Raka. Facts hold, confidence MEDIUM
```

OPENER
```
Hi Josh, saw The Wine Flight, looks interesting!

However, your site sells full days by private helicopter to England's finest wineries, but says nothing about gifts or company days. This causes people shopping for a Christmas present or a client day to likely buy a Gusbourne or Wiston voucher instead.

Especially, when you are heading into winter with the vines bare, the gifts and company days people book now are likely what fill next summer's flights.

I run Astra agency. We build websites for brands like Unilever, AXA, Pertamina. I built a stroopwafel brand from zero with my family and ran its pricing and conversion, so I've seen what a missing way to buy costs a new brand.

Shall I send you over what the Wine Flight site for gifts and companies looks like?
```

### Reno Wiertz, Down to Earth Dining, ctc_F57ZqzDSwGEB8ad8H

```gate
lead: Reno Wiertz, founder, executive chef and since 1 July 2026 sole owner of Down to Earth Dining, Wilhelminastraat 30 Velp, KvK 42108999 on the site footer (registered 1 Jul 2026 per North Data, earlier entity KvK 91107555 terminated), franchisor Down to Earth Dining B.V. KvK 42002612 registered 10 Mar 2026 with the purpose of operating the franchise formula, ctc_F57ZqzDSwGEB8ad8H, leadId lea_uYmaDbbmzWGxXuX3S, campaign W1b only, jobTitle "Chef / Eigenaar", tagline "Hospitality Professional | Travel Agent | Business Owner". Ownership from the company's own LinkedIn post (co founder Siebe de Roos stepped back as owner per 1 July, "Reno zal het volledige eigenaarschap ... op zich nemen"), the site ("Reno Wiertz FOUNDER & EXECUTIVE CHEF") and lemlist, officers not readable on the free register, MEDIUM to HIGH. Accepted 2026-10-10 16:38 UTC, no linkedinSent. Thread pulled 2026-10-11 11:04 UTC, 0 activities, nextPage null, control ctc_ch3vFcKAkjQdMKDCg 2 items same minute, teamConversations search "Wiertz" 0, no row in any state file
site pass 1: 55 URLs by tools/crawl.py (22 from the sitemap, NL and EN on two hosts, about 25 distinct pages), every page read, home, onze missie, menu, private dining, locaties, Velp, FAQ, werken bij, recente ontwikkelingen, voorwaarden, contact, EN twins
site pass 2: 55 URLs, second crawl equal, plus 26 pages rendered in Chromium with desktop and iPhone screenshots, home with the October popup, locaties, recente ontwikkelingen and private dining opened and looked at, site-audit.js render trusted
deep analysis: A two year old fully vegetarian fine dining room in Velp, 4 to 7 course chef's menu from 64.50 to 94.50 euro, 100 to 200 guests a week, Zenchef bookings, private dining and catering by form or email, Top 500 Business Restaurants 2026, Gaia Green Awards finalist, Dutch Cuisine and Euro Toques. Since spring the company is building a franchise, a new B.V. registered on 10 March to act as franchisor, a news post offering franchisees "begeleiding, training, systemen en kwaliteitscontrole", recruitment run by De Franchise Adviseur (listing says 1 location). The co founder who ran front of house stepped back as owner on 1 July citing mounting pressure, Reno told ChefsFriends in June he does all the admin and runs the kitchen, and from October the restaurant opens six days a week. The site's own franchise "Lees hier meer" link on /nl/locaties lands on a Franchise Adviseur 404, and /locaties and /velp-gld still show the old Wednesday to Sunday hours
owner linkedin: same person as the contact. Route 1 curl https://www.linkedin.com/in/reno-wiertz-581a56197 999, /recent-activity/all/ 301, WebFetch 999. Route 2 web search "Reno Wiertz" linkedin, no profile result, the travel agent side of his tagline unconfirmed. Route 3 posts search, only his reshare of the Gaia Green Awards post on the company page. Route 4 North Data search "Wiertz, Reno" no companies, Travel Counsellors agent URL 404 against a working control. Route 5 company page https://www.linkedin.com/company/down-to-earth-dining/ via tools/social-audit.js and raw HTML, 70 followers, Siebe's step back post, franchise repost. Route 6 his own words in https://chefsfriends.nl/hoe-down-to-earth-dining-zonder-woke-agenda-aan-de-weg-timmert-met-groenten/ (17 June 2026)
contact linkedin: same person as owner, the site, the company page and lemlist agree, same six routes
google news: tools/news.py nl 2026-10-11, "Down to Earth Dining" 3 (De Gelderlander 2025-02-17 review, a Franchise Starter Award 2026 item, Rheden notices 2024), "Reno Wiertz" 2 (Euro Toques membership 2025), control Heineken 100
regional news: tools/news.py (Velp OR Arnhem OR Rheden) vegetarisch restaurant OR fine dining, 39, Konijnenvoer in Arnhem in NRC 2026-10-03, plantaardig groeit in Arnhem (Misset 2025-09-25)
industry news: tools/news.py vegetarisch restaurant OR fine dining OR horeca, 54, operators dropping the word vegan (De Ondernemer 2026-10-09, AD 2026-10-05), vegan restaurants closing in London and Amsterdam (Parool 2026-08-17), plus KHN margins outlook and the Dutch franchise act on standstill and disclosure duties
sources:
1. https://www.downtoearthdining.com/nl/recenteontwikkelingen
2. https://www.downtoearthdining.com/nl/home
3. https://www.downtoearthdining.com/nl/werken-bij
4. https://www.downtoearthdining.com/nl/locaties
5. https://franchiseadviseur.nl/franchiseformule/vegetarisch-restaurant-franchise-down-to-earth/
6. https://www.linkedin.com/company/down-to-earth-dining/
7. https://chefsfriends.nl/hoe-down-to-earth-dining-zonder-woke-agenda-aan-de-weg-timmert-met-groenten/
8. https://www.northdata.com/Down%20to%20Earth%20Dining%20B%C2%B7V%C2%B7,%20Velp/KVK%2042002612
9. https://www.northdata.com/Down%20to%20Earth%20Dining,%20Velp/KVK%2042108999
10. https://defranchiseadvocaat.nl/stand-still-periode-franchise/
11. https://www.instagram.com/downtoearth_dining/embed/
12. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fwww.downtoearthdining.com%2F
13. https://news.google.com/rss (tools/news.py, company, person, region, industry, control)
14. full list of 158 in /tmp/claude-0/agents/b15_B/reno_wiertz.md
pains: 7 judged. (1) the franchise offers new owners training, systems and quality control while the know how sits with one chef owner who also does the admin, CHOSEN. (2) Reno's own week, sole owner since July, kitchen, admin, six days from October, folded into (1). (3) filling extra nights, a 49.50 euro deal on Wednesday, Thursday and Sunday and Social Deal listings, real but marketing that already works. (4) franchise recruitment path, own site has no franchise page and its link lands on a 404, recruitment is De Franchise Adviseur's job, a favour. (5) stale hours on two pages and two phone numbers, a tweak. (6) GDPR, _ga and _fbp before any click from Stockholm with an accept only banner, a setting, favour. (7) social, Instagram 841 and posting every few days, fine
chosen: (1), biggest, the franchise is the company's growth plan with a B.V. set up for it, what it offers franchisees has to be built from what's in Reno's head, and he's now running the kitchen, the admin and six nights alone, so every new location would lean on his evenings
sweep website: tools/crawl.py twice 55 URLs and 26 rendered pages of https://www.downtoearthdining.com , modern Squarespace by an outside designer, stale hours, a 404 franchise link, no franchise page (/nl/franchise 404, control /nl/menu 200), symptoms, not chosen
sweep gdpr: tools/eu-view.py from Stockholm on https://www.downtoearthdining.com/ , _ga, _ga_J1L7SL2Y00 and _fbp set before any click, banner offers Accept only, no consent code in the HTML, a real breach but a settings change, favour, not chosen
sweep apps: the franchise offer of "training, systemen en kwaliteitscontrole" on https://www.downtoearthdining.com/nl/recenteontwikkelingen with one location per https://franchiseadviseur.nl/franchiseformule/vegetarisch-restaurant-franchise-down-to-earth/ , private dining and group requests by form and email, CHOSEN as the AI system for the franchise
sweep social: tools/social-audit.js on https://www.instagram.com/downtoearth_dining/ 841 followers 147 posts newest 2026-10-11, LinkedIn company 70, Facebook walled, active and on brand, not chosen
sweep squad: a restaurant with a kitchen brigade per https://www.downtoearthdining.com/nl/werken-bij , builds no software, not applicable
thread: problem the franchise offers new owners training, systems and quality control while there's one restaurant with Reno in its kitchen | cost each new location likely leans on his own evenings, and the know how that sits with him limits growth as he opens six days and recruits | offer the AI system that carries Down to Earth's know how to every franchise location | link franchise, system
lead read: Reno reads that his franchise promises training, systems and quality control while the whole thing still runs through him in one kitchen, so each new franchisee would lean on his evenings just as he opens six days a week, and gets offered the AI system for his franchise, one thread
claims:
your franchise offers new owners training, systems and quality control, https://www.downtoearthdining.com/nl/recenteontwikkelingen "Wat kun je als franchisenemer verwachten? ... Een full-service formule met begeleiding, training, systemen en kwaliteitscontrole", crawled twice and rendered 2026-10-11
today there's one Down to Earth, https://franchiseadviseur.nl/franchiseformule/vegetarisch-restaurant-franchise-down-to-earth/ "Aantal locaties 1", and https://www.downtoearthdining.com/nl/locaties "Coming Soon…", fetched 2026-10-11
with you in its kitchen, https://www.downtoearthdining.com/nl/werken-bij "Reno Wiertz FOUNDER & EXECUTIVE CHEF", and https://chefsfriends.nl/hoe-down-to-earth-dining-zonder-woke-agenda-aan-de-weg-timmert-met-groenten/ "doe alle administratie en stuur de keuken aan", 17 June 2026
INFERENCE, each new location likely leans on your own evenings to learn how it runs, rests on one location, Reno as chef and admin, and the co founder's step back on 1 July per https://www.linkedin.com/company/down-to-earth-dining/ , worded "likely"
opening six days a week, https://www.downtoearthdining.com/nl/home popup "Vanaf oktober zijn wij 6 dagen per week geopend", rendered 2026-10-11
looking for your first franchisees, https://www.downtoearthdining.com/nl/recenteontwikkelingen "Wij zoeken enthousiaste horecaondernemers" and the franchisor B.V. registered 10 Mar 2026, https://www.northdata.com/Down%20to%20Earth%20Dining%20B%C2%B7V%C2%B7,%20Velp/KVK%2042002612
INFERENCE, the know how that still sits with you becomes the limit on how fast it grows, rests on the same facts at https://www.downtoearthdining.com/nl/werken-bij and https://franchiseadviseur.nl/franchiseformule/vegetarisch-restaurant-franchise-down-to-earth/ , worded as what follows
Heineken credential, docs/astra-master-context.md section 2A, "Standardised KPIs, dashboards and decision cadences; enabled 23 markets with self-serve insights", https://www.linkedin.com/in/raka-mulya-b92885196
recheck: 2026-10-11 11:25 to 11:50 UTC, recente ontwikkelingen, werken bij, locaties and the popup re rendered, Franchise Adviseur listing and the 404 link reopened with control, LinkedIn company HTML reread for the step back post. Disproof tried, searched every page and the sitemap for a franchise manual, handbook, academy or software (none), probed /nl/franchise and /en/franchise (404, control 200), looked for a second location (Coming Soon only). Franchise Adviseur may write the formula, so the offer is the AI system, not the handbook. Siebe's health is never named. Facts hold, confidence MEDIUM
```

OPENER
```
Hi Reno, saw Down to Earth Dining, looks interesting!

However, your franchise offers new owners training, systems and quality control, and today there's one Down to Earth, with you in its kitchen. This causes each new location to likely lean on your own evenings to learn how it really runs.

Especially, when you are opening six days a week and looking for your first franchisees, the know how that still sits with you becomes the limit on how fast it grows.

I run Astra agency. We build AI workflows for brands like Unilever, AXA, Pertamina. I standardised the dashboards and routines Heineken's 23 markets ran on, so each market could find its own answers without waiting on head office.

Shall I send you over what the AI system for your franchise looks like?
```

### Fabian Mader, fama, ctc_vHXN93Sa98zrL6roG

```gate
lead: Fabian Wolfgang Mader, sole trader (Einzelunternehmen) behind fama per the Impressum at https://www.fama.coffee/impressum and WKO Firmen A-Z, three trade licences at Danklstraße 10/19 Salzburg (simple food and drinks since 01.01.2026, Catering/Lieferküche since 26.02.2026, Imbiss since 07.08.2026), UID ATU82519268, ctc_vHXN93Sa98zrL6roG, leadId lea_SXsP2BuX6cQHGa8iL, campaign W1b only, jobTitle "Founder", tagline "Founder: fama | Mobile Specialty Coffee & Matcha Bar | Event Catering | Matcha Workshops". Earlier event project lead at Rookies at Work (MZS press release) and a search snippet once titled him at Red Bull Gaming, his search title now reads "Fabian Mader - fama". Accepted 2026-10-10 08:29 UTC, no linkedinSent. Thread pulled 2026-10-11 11:04 UTC, 0 activities, nextPage null, control ctc_ch3vFcKAkjQdMKDCg 2 items same minute, teamConversations search "Mader" 0, no row in any state file
site pass 1: 18 URLs by tools/crawl.py (7 from the sitemap, both hosts), 9 distinct pages, every page read, home, catering, workshops, delivery, kontakt, the 404 that serves the contact page, impressum, datenschutz, cart
site pass 2: 18 URLs, second crawl from the apex equal, plus 9 pages rendered in Chromium with desktop and iPhone screenshots, home, catering with the event form and workshops opened and looked at, site-audit.js render trusted
deep analysis: A nine month old one man mobile coffee and matcha bar (LinkedIn 1 employee, started early January per his own post) doing corporate catering, fairs, weddings, festivals and matcha workshops, plus weekday delivery on Foodora and Lieferando. Event pricing is three models (all in with a base fee plus a drinks budget from the guest count, sale on site, hybrid), no figures, travel extra. The event form on /coffee-matcha-catering-salzburg asks name, company, email, phone, branding yes or no and a message whose prompt is "Kurze Infos zu Event, Anlass, Dauer, gewünschter Getränkeauswahl oder Branding-Ideen", never the date, the place or the number of guests (raw form JSON and rendered DOM agree). September took him 1,500 km to Löhne, to the Großglockner, to Kitzbühel and to Linz, and his delivery pauses when he travels. Matcha input prices hit records in 2026 and Espressomobil, a Vienna operator with about 100 units, launched its own mobile matcha bar for companies and agencies on 7 Oct 2026, and its enquiry form at https://espressomobil.at/kaffeecatering/ prompts "Datum, Stadt, Gästezahl, Wunsch-Setup…", the three things fama's form leaves out
owner linkedin: same person as the contact. Route 1 curl https://www.linkedin.com/in/fabian-mader-350409131 999, /recent-activity/all/ 301, WebFetch 999. Route 2 web search "Fabian Mader" fama Salzburg linkedin, title "Fabian Mader - fama", snippets of "Anfang Jänner bin ich mit fama ... gestartet". Route 3 two indexed posts opened (LEVEL UP gaming festival 2022, Homies Kulturverein), 997 followers 52 posts. Route 4 MZS press release names him LEVEL UP Projektleiter at Rookies at Work, WKO and the Impressum for the business. Route 5 company page https://www.linkedin.com/company/famacoffeesalzburg/ via WebFetch, his reposted posts (six month recap, Electric Love for Geberit, workshops aimed at B2B). Route 6 Instagram captions in his voice ("Von Fabi haben wir alles ... gelernt")
contact linkedin: same person as owner, Impressum, WKO, lemlist and the company page agree, same six routes
google news: tools/news.py de 2026-10-11, "fama coffee" 0, "Fabian Mader" 10 none his, control Volkswagen 102
regional news: tools/news.py (Salzburg) Kaffee Catering OR Matcha OR Eventcatering, 33, Espressomobil's Matchamobil (Falstaff 2026-10-07, vienna.at read at source), a new matcha and mushroom coffee concept in Salzburg (SN 2026-09-24), Tchibo adding matcha to its CoffeeBars
industry news: tools/news.py Kaffee Catering OR Matcha OR Eventcatering, 100, matcha cafés opening across DACH, plus tencha auction records (One with Tea tracker), ICO coffee indicator above 280 US cents in August, caterers saying December Christmas party dates book out early
sources:
1. https://www.fama.coffee/coffee-matcha-catering-salzburg
2. https://www.fama.coffee/
3. https://www.fama.coffee/impressum
4. https://firmen.wko.at/fabian-wolfgang-mader/salzburg/?firmaid=37a028c5-0d6e-4be3-8a09-5f09f28fded5
5. https://www.instagram.com/fama.coffee.salzburg/embed/
6. https://www.linkedin.com/company/famacoffeesalzburg/
7. https://www.vienna.at/wien-bekommt-mobile-matcha-bar/10524386
8. https://espressomobil.at/kaffeecatering/
9. https://www.zebra24seven.de/kaffeebar
10. https://onewithtea.com/pages/japanese-matcha-price-tracker
11. https://frankys.at/alles-fuer-ihr-fest/catering/weihnachtsfeier-catering/
12. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fwww.fama.coffee%2F
13. https://news.google.com/rss (tools/news.py, company, person, region, industry, control)
14. full list of 121 in /tmp/claude-0/agents/b15_B/fabian_mader.md
pains: 6 judged. (1) every event request needs date, place and guest count chased by email before the base fee and drinks budget can be priced, by one person who is often behind the bar somewhere else, CHOSEN. (2) a bigger Vienna rival now sells mobile matcha to the same companies and agencies, the reason (1) costs more now. (3) matcha and coffee input costs at records, priced into his all in model by hand, folded into (1). (4) social, Instagram 2,372 against Espressomobil 16,609, posting gap 15 Sep to 11 Oct in his busiest month, real but smaller. (5) site, Kontakt link answers 404 while showing the contact page, a tweak. (6) GDPR, consent mode with 1 cookie from Stockholm, clean
chosen: (1), costliest and hottest, events are where his money is, Christmas party and fair season is when companies send requests now, and every request that waits for a reply while a rival answers fast is a booking gone
sweep website: tools/crawl.py twice 18 URLs and 9 rendered pages of https://www.fama.coffee/ , modern Squarespace, event form without date, place or guests, /contact serves the contact page with a 404 status, folded into the workflow, not chosen alone
sweep gdpr: tools/eu-view.py from Stockholm on https://www.fama.coffee/ , 1 first party cookie, Google and Meta requests under consent mode, Austrian Impressum complete, clean, not chosen
sweep apps: the three pricing models on https://www.fama.coffee/coffee-matcha-catering-salzburg need date, place and guest count that the form never asks, one person per https://www.linkedin.com/company/famacoffeesalzburg/ , CHOSEN as the AI quote workflow
sweep social: tools/social-audit.js on https://www.instagram.com/fama.coffee.salzburg/ 2,372 followers 57 posts newest 2026-10-11, TikTok 27 followers, LinkedIn active, benchmark Espressomobil 16,609, not chosen
sweep squad: a one man coffee bar per https://www.fama.coffee/impressum , builds no software, not applicable
thread: problem the event form never asks the date, the place or how many guests | cost each request likely needs a round of emails before the base fee and drinks budget can be priced, and those wait while he works events across Austria and Germany | offer the AI quote workflow for fama's events | link event, request
lead read: Fabian reads that his event form never asks the three things his pricing depends on, so each request turns into emails before he can quote, which piles up while he's serving at events across Austria and Germany, and gets offered the AI quote workflow for his events, one thread
claims:
your event form never asks for the date, the place or how many guests, https://www.fama.coffee/coffee-matcha-catering-salzburg form "Event Anfrage" fields Name, Firmenname, E-Mail, Telefon, Branding gewünscht, Nachricht, message prompt "Kurze Infos zu Event, Anlass, Dauer, gewünschter Getränkeauswahl oder Branding-Ideen", raw form JSON and rendered DOM 2026-10-11, the home and contact forms ask only name, email and message
the base fee and drinks budget, https://www.fama.coffee/coffee-matcha-catering-salzburg "Als Basis dient eine Grundpauschale. Zusätzlich wird anhand der Gästezahl ein Getränkebudget kalkuliert"
INFERENCE, most requests likely need a round of emails first, rests on the form fields and the guest count driving the budget at https://www.fama.coffee/coffee-matcha-catering-salzburg , worded "likely"
taking fama to events across Austria and Germany, https://www.fama.coffee/coffee-matcha-catering-salzburg "Für Events österreichweit und darüber hinaus" and https://www.instagram.com/fama.coffee.salzburg/embed/ caption 2026-10-11 "1.500 km für die @_area30_ in Löhne", Großglockner and Kitzbühel posts
INFERENCE, the emails wait while you're behind the bar, rests on one employee per https://www.linkedin.com/company/famacoffeesalzburg/ and "ich melde mich persönlich" on the same page
Betty Blocks credential, docs/astra-master-context.md section 2A, "automation-driven revenue workflows covering enrichment, scoring, routing and follow-up loops", https://www.linkedin.com/in/raka-mulya-b92885196
recheck: 2026-10-11 11:30 to 11:50 UTC, the catering page re rendered and the form JSON re read, placeholder found and quoted, Instagram caption re extracted. Disproof tried, checked every form on the site (home, catering, contact) and the workshop page for a date or guest field (none), checked for a booking tool or calendar link (none, mailto and forms only), read the message prompt so the claim says the form never asks rather than that people can't say it. Facts hold, confidence MEDIUM
```

OPENER
```
Hi Fabian, saw fama, looks interesting!

However, your event form never asks for the date, the place or how many guests are coming. This causes most requests to likely need a round of emails before you can work out the base fee and drinks budget.

Especially, when you are taking fama to events across Austria and Germany, the emails that wait while you're behind the bar grow with every booking you win.

I run Astra agency. We build AI workflows for brands like Unilever, AXA, Pertamina. I set up the workflows at Betty Blocks that routed and followed up every new enquiry, so no request sat waiting for a reply.

Shall I send you over what the AI quote workflow for fama's events looks like?
```
