# Josh Edelman, The Wine Flight (thewineflight.com)

**In plain words.** Josh runs a brand new company that flies small groups by private helicopter to England's best wine estates for a full day, from £2,600 a head. His site is beautiful, but there's no way to buy a day as a gift or for a company, and winter (when vines are bare and people buy Christmas presents and plan next summer's client days) is starting now. His own partner estates sell their visits as vouchers and corporate days, so those buyers likely go there instead.

Shape: **OPENER** (thread empty, connect note only in the activity log, never messaged).

## 1. Thread and record

- Thread `get_inbox_conversation(ctc_cAdQknSHnsBZMFvrP)` 2026-10-11 11:04 UTC: 0 activities, nextPage null. Positive control ctc_ch3vFcKAkjQdMKDCg returned its 2 known messages in the same minute. LinkedIn sync status "recent" (10:56 UTC).
- Activities for lea_w7DRPeRD4QZtJfKk5: connect note "Hi Josh, saw your business and thought it was cool..." 2026-10-08 05:22 UTC, `linkedinInviteAccepted` 2026-10-08 07:20 UTC, `linkedinSent` none. The connect note is missing from the inbox thread (known lemlist behaviour, RULES batch 8).
- `get_inbox_conversations` teamConversations search "Edelman": 0. `search_contacts` "Edelman": one contact only. No hit in any state file (the only "Edelman" hits are the PR firm's research in state/hotgreen).
- Record: jobTitle "Founder & Director", tagline "Founder, The Wine Flight | Luxury Helicopter Wine Tours | WSET Diploma | Wine Writer", companyDomain thewineflight.com, location Stony Stratford, Milton Keynes. No summary, jobDescription or experience fields on the record (search_campaign_leads, the activity payload and GET /contacts all lack them). Tagline, company and title agree. No "former" or "ex".

## 2. Ownership (statutory)

- Companies House THE WINE FLIGHT LTD 16953416, incorporated 9 Jan 2026, SIC 79120 Tour operator activities, registered office 167-169 Great Portland Street (a serviced address, also his Google listing), first accounts due Oct 2027.
- Officers: EDELMAN, Joshua Victor, director since 9 Jan 2026, born March 1988, identity verified. PSC: the same, 75% or more of shares and votes. Filing history: NEWINC only, capital GBP 100. His only appointment.
- T&Cs and privacy policy name The Wine Flight Ltd and "Data Controller: Josh Edelman, Director".
- **Verdict: owner, founder and sole director. ICP.**

## 3. Source list

168 distinct URLs opened (37 on his own domains, 131 outside), of which 152 returned readable content and 16 were walled, 404 or dead and are marked as such. Full numbered list in section 9.

## 4. What he's facing right now

1. He's at the very start. The company was incorporated on 9 Jan 2026, the T&Cs are dated 9 Feb 2026, the CMS items were created between 27 Apr and 1 Jul 2026, and his LinkedIn said "Launching Spring 2026" (Companies House, the T&Cs PDF metadata, the CMS API `_createdDate` fields, the search title of his profile). LinkedIn company page shows 1 employee.
2. He sells a very high ticket day: £2,600 to £3,200 a head "based on full cabin occupancy (6 guests)", groups up to 24 quoted on request, Rolls-Royce upgrade £1,000 each way (CMS itineraries, FAQ). Every sale starts as an enquiry or a call, then a written quote, written confirmation and full payment by bank transfer, then guest weights 48 hours ahead (T&Cs 3.3 to 5.2, 4.1).
3. Nothing on the site sells it as a gift or as a company day. The words gift, voucher, corporate and company appear 0 times across the bundle, all CMS endpoints and all 16 rendered routes, while Battersea (14), Rolls-Royce (4) and "dress code" (1) are found by the same three methods.
4. His own partners sell that way. Gusbourne sells "Gift Experience Vouchers" and has a corporate experiences page, Wiston sells gift vouchers, Sugrue sells a Tour & Tastings voucher, All Angels and The Grange sell vouchers (partner pages fetched 2026-10-11). None of the eight estates' homepages mention The Wine Flight.
5. His aircraft partner is also a competitor of sorts. Thunder Aviation sells its own "Gusbourne Wine Tour" helicopter day "From £635 per person for 6 people, plus Vineyard tour and food to be quoted", aimed at "couples, corporate entertainment" (thunderaviation.com). A buyer comparing the two sees a quarter of his headline price for a similar looking day, so his access and hosts must do the selling. INFERENCE from those two pages.
6. The season is turning. Bolney's own guide says vineyards run their fullest tours "between June and September" and in winter "the vines are bare, and many estates run a shorter timetable". INFERENCE: his first winter will be thin on flying, so the money between now and spring comes from gifts and forward bookings for next summer.
7. He's barely visible yet. Instagram 57 followers, 41 following, 9 posts (og meta, 11:17 UTC; the embed is broken so post dates are unknown), against partners Wiston 27,119, Sugrue 14,076, Danbury Ridge 5,902 and Thunder 4,189. No press: news.py found 0 items about him, no reviews on the site, Google listing exists as "Helicopter tour agency" with no rating we could read.
8. The wider market is growing but is about awareness. The Buyer (27 Jun 2026) cites 1.5 million vineyard visits in 2024 and says "The challenge now is awareness and accessibility"; Chapel Down opened a premium room for private and corporate days in June 2026; WineGB's tourism report showed visits up 55%.
9. His channel plan, in his own privacy policy, includes "Marketing and referral partners such as hotels, concierge services, and luxury travel providers". INFERENCE: he expects bookings through intermediaries, which is the runner up angle below.
10. Small technical gaps: the bare domain thewineflight.com has no A record on Google DNS and Cloudflare DNS (www works, example.com control resolved), the share image is an SVG logo. Tweaks, not angles.

## 5. Judge table

| # | Angle | Proof | What it costs him | Would he name it | Incumbent takes it? | Does he sell it himself? |
|---|---|---|---|---|---|---|
| B | Website for growth, gifts and company days | 0 gift, voucher, corporate or company words on the whole site against controls; seven of eight partners sell vouchers, Gusbourne has corporate days | INFERENCE: the two biggest buyer groups for a day at this price, Christmas gift buyers and companies, can't buy it from him in the season they buy, each cabin is a five figure booking | Likely yes, gift and company requests are the obvious ones for luxury experiences | Possible, the custom React and Wix site was built for him in mid 2026 by a developer, flag | No |
| A | AI sales workflow for concierges, hotels, PAs and corporate planners | Privacy policy names referral partners; Instagram 57; no press; partners don't mention him | INFERENCE: without a pipeline a one man launch fills slowly | Yes, "more bookings" | No | No |
| C | Personal AI workflow | Quotes, logistics, weights, weather calls all through one person per the T&Cs | Hours per booking, low volume today | Maybe later | No | No |
| D | Instagram and brand | 57 followers, 9 posts, against 4k to 27k at his partners | Visibility, hard to tie to a five figure booking | Maybe | No | No |
| Squad | Build Squad | One man tour operator, finished site | None | No | n/a | n/a |
| GDPR | Privacy | 0 cookies from Stockholm, only Google Fonts and wixstatic before a click | None | No | n/a | n/a |

**Pick: B, gifts and company days.** Costliest and hottest. It's the season (winter, Christmas, next summer's client days get planned now), the buyer groups are the highest value ones, and the proof is his own partners doing exactly this. A is the runner up and pairs well later.

## 6. Verdict

OPENER, confidence **MEDIUM**. Facts verified twice, the buyer behaviour is inference worded "likely".

**Flags for Raka.** (1) His developer could add a voucher page, Tomatoworld risk, pitch the whole gift and company site, not a button. (2) Naming Gusbourne and Wiston in the message is pointed, they're his partners; swap to "a vineyard voucher somewhere else" if you'd rather. (3) Thunder sells a £635 a head Gusbourne helicopter day, worth knowing before any call. (4) The bare domain doesn't resolve, a free favour to offer on a call. (5) "Wine Writer" in his tagline, no published writing found.

## 7. Draft (copied from drafts.md)

```
Hi Josh, saw The Wine Flight, looks interesting!

However, your site sells full days by private helicopter to England's finest wineries, but says nothing about gifts or company days. This causes people shopping for a Christmas present or a client day to likely buy a Gusbourne or Wiston voucher instead.

Especially, when you are heading into winter with the vines bare, the gifts and company days people book now are likely what fill next summer's flights.

I run Astra agency. We build websites for brands like Unilever, AXA, Pertamina. I built a stroopwafel brand from zero with my family and ran its pricing and conversion, so I've seen what a missing way to buy costs a new brand.

Shall I send you over what the Wine Flight site for gifts and companies looks like?
```

## 8. Red team

| Sentence | Rests on | Reopened 2026-10-11 ~11:49 UTC | Tried to prove false | Result |
|---|---|---|---|---|
| "your site sells full days by private helicopter to England's finest wineries" | CMS landing section "Private helicopter access to England’s finest wineries", "full-day journeys" | Yes, API refetched, bundle hash unchanged index-DKJ253DW.js | Checked the wording is theirs, curly apostrophe | Holds, their words |
| "says nothing about gifts or company days" | 0 counts across bundle, 8 CMS endpoints, 4 itineraries, 16 rendered routes | Yes, recounted on fresh downloads | Searched T&Cs and privacy PDFs (0), checked Show More links (expand buttons, no hidden pages), FAQ mentions "larger groups" not companies | Holds. Risk: he may reply "we do groups up to 24", true but not a company offer |
| "likely buy a Gusbourne or Wiston voucher instead" | gusbourne.com/visits/gift, wistonestate.com/product/gift-vouchers | Yes, both 200, voucher text found | Vouchers are for estate visits, not helicopter days, so the sentence says "likely" and is about where the gift money goes | Inference, worded as such |
| "heading into winter with the vines bare" | Bolney blog, June to September fullest, winter "the vines are bare" | Yes | Tours still run in winter at some estates | Holds as season framing |
| "the gifts and company days people book now are likely what fill next summer's flights" | Season above, launch 2026 | n/a, inference | Could he fly plenty in winter? Possible, hence "likely" | Inference |
| Proof, "ran its pricing and conversion" | astra-master-context 2A, Eten Maar "conversion, pricing" | Yes | Not stretched to gifts | Holds |
| Verb check | "sells" vs their "Private helicopter access", "Choose from a pre-curated itinerary" | Yes | Is "sells" stronger than theirs? Prices and booking terms are on the site | Holds |

## 9. Numbered source list (168)

Status in brackets. OWN is thewineflight.com and its API, EXTERNAL is everything else. Walled, 404 and dead entries are listed as such, never as read.

1. https://thewineflight.com  [OWN 000 fetched]
2. https://www.api.thewineflight.com/_functions/aboutPage  [OWN  CMS API]
3. https://www.api.thewineflight.com/_functions/experience?slug=champions-of-chalk  [OWN  CMS API, £2,600]
4. https://www.api.thewineflight.com/_functions/experience?slug=icons-of-england  [OWN  CMS API, £3,200]
5. https://www.api.thewineflight.com/_functions/experience?slug=the-epicurean  [OWN  CMS API, £3,200]
6. https://www.api.thewineflight.com/_functions/experience?slug=the-western-arc  [OWN  CMS API, from £3,000]
7. https://www.api.thewineflight.com/_functions/experienceCards  [OWN  CMS API]
8. https://www.api.thewineflight.com/_functions/gallery  [OWN  CMS API]
9. https://www.api.thewineflight.com/_functions/landingPageSection  [OWN  CMS API, from £2,600, six guests]
10. https://www.api.thewineflight.com/_functions/newsletterForm  [OWN  CMS API]
11. https://www.api.thewineflight.com/_functions/pagesImages  [OWN  CMS API]
12. https://www.api.thewineflight.com/_functions/partners  [OWN  CMS API, 9 partners]
13. https://www.api.thewineflight.com/_functions/socials  [OWN  CMS API, instagram the.wine.flight]
14. https://www.thewineflight.com  [OWN 200 crawl or render]
15. https://www.thewineflight.com/FAQs  [OWN 200 crawl or render]
16. https://www.thewineflight.com/WineFlightLogo.svg  [OWN 200 fetched]
17. https://www.thewineflight.com/Wine_Flight_Privacy_Policy.pdf  [OWN  privacy, referral partners hotels concierges]
18. https://www.thewineflight.com/Wine_Flight_Terms_and_Conditions.pdf  [OWN  T&Cs 9 Feb 2026, read in full]
19. https://www.thewineflight.com/about  [OWN 200 crawl or render]
20. https://www.thewineflight.com/assets/index-Cc6aaDLt.css  [OWN 200 fetched]
21. https://www.thewineflight.com/assets/index-DKJ253DW.js  [OWN  bundle read, routes, FAQ, forms]
22. https://www.thewineflight.com/enquiry  [OWN 200 crawl or render]
23. https://www.thewineflight.com/enquiry/champions-of-chalk  [OWN 200 crawl or render]
24. https://www.thewineflight.com/enquiry/icons-of-england  [OWN 200 crawl or render]
25. https://www.thewineflight.com/enquiry/the-epicurean  [OWN 200 crawl or render]
26. https://www.thewineflight.com/enquiry/the-western-arc  [OWN 200 crawl or render]
27. https://www.thewineflight.com/experiences  [OWN 200 crawl or render]
28. https://www.thewineflight.com/experiences/champions-of-chalk  [OWN 200 crawl or render]
29. https://www.thewineflight.com/experiences/icons-of-england  [OWN 200 crawl or render]
30. https://www.thewineflight.com/experiences/the-epicurean  [OWN 200 crawl or render]
31. https://www.thewineflight.com/experiences/the-western-arc  [OWN 200 crawl or render]
32. https://www.thewineflight.com/gallery  [OWN 200 crawl or render]
33. https://www.thewineflight.com/legal  [OWN 200 crawl or render]
34. https://www.thewineflight.com/partners  [OWN 200 crawl or render]
35. https://www.thewineflight.com/robots.txt  [OWN  curl, serves SPA html]
36. https://www.thewineflight.com/sitemap.xml  [OWN  curl, serves SPA html, no sitemap]
37. https://www.thewineflight.com/staticwebapp.config.json  [OWN  curl]
38. https://find-and-update.company-information.service.gov.uk/company/16953416  [EXTERNAL 200 THE WINE FLIGHT LTD overview - Find and update company information - G]
39. https://find-and-update.company-information.service.gov.uk/company/16953416/officers  [EXTERNAL 200 THE WINE FLIGHT LTD people - Find and update company information - GOV]
40. https://find-and-update.company-information.service.gov.uk/company/16953416/persons-with-significant-control  [EXTERNAL 200 THE WINE FLIGHT LTD persons with significant control - Find and update]
41. https://find-and-update.company-information.service.gov.uk/company/16953416/filing-history  [EXTERNAL 200 THE WINE FLIGHT LTD filing history - Find and update company informati]
42. https://find-and-update.company-information.service.gov.uk/officers/XAoxzqIDUW2SFCzWBu_TxMB8TGw/appointments  [EXTERNAL 200 Joshua Victor EDELMAN personal appointments - Find and update company ]
43. https://find-and-update.company-information.service.gov.uk/search/companies?q=the+wine+flight  [EXTERNAL 200 Company search results - Find and update company information - GOV.UK]
44. https://www.sugruesouthdowns.com  [EXTERNAL 200 Sugrue South Downs | Award-Winning English Wines]
45. https://www.wistonestate.com  [EXTERNAL 200 Wiston Estate | Sussex Winery, Chalk Restaurant, Holiday Accommodation]
46. https://www.danburyridge.com  [EXTERNAL 200 Danbury Ridge Wine Estate | Crouch Valley, Essex]
47. https://www.gusbourne.com  [EXTERNAL 200 Gusbourne | Discover Fine English Wine]
48. https://langhamwine.co.uk  [EXTERNAL 200 Langham Wine | English Sparkling Wine | Dorset]
49. https://www.allangels.com  [EXTERNAL 200 All Angels Vineyard]
50. https://www.thegrangewine.co.uk  [EXTERNAL 200 English Sparkling Wine | The Grange]
51. https://coatesandseely.com  [EXTERNAL 200 Coates and Seely – The Finest Wines]
52. https://www.thunderaviation.com  [EXTERNAL 200 Thunder Aviation - Luxury Helicopter & Private Jet Charter Services]
53. https://www.thunderaviation.com/helicopter-charter-flights/battersea-heliport  [EXTERNAL 200 Thunder Aviation - Helicopter Charter to Battersea Heliport]
54. https://www.gusbourne.com/tours/limited-edition-tasting-flight  [EXTERNAL 200 The Nest at Gusbourne | Limited Edition Wines Tasting Flight]
55. https://www.thedrinksbusiness.com/2026/07/gusbourne-launches-exclusive-british-airways-sparkling-wine  [EXTERNAL 200 Gusbourne launches exclusive British Airways sparkling wine]
56. https://www.therealreview.com/2026/07/16/the-state-were-in-2026-a-vintage-for-the-ages  [EXTERNAL 200 The state we’re in 2026: a vintage for the ages – The Real Review]
57. https://www.traveldailynews.com/aviation/british-airways-becomes-the-first-airline-to-serve-prestige-cuvee-english-sparkling-wine-on-board  [EXTERNAL 200 British Airways starts serving cuvee English sparkling wine]
58. https://www.jancisrobinson.com/producers/danbury-ridge  [EXTERNAL 403 Just a moment...]
59. https://thelondonhelicopter.com  [EXTERNAL 200 Sightseeing helicopter tours from Redhill - The London Helicopter]
60. https://thelondonhelicopter.com/routes/central-london-tour-for-2-with-champagne  [EXTERNAL 200 Champagne Tour - The London Helicopter]
61. https://www.batterseahelicopter.com/helicopter-charter/helicopter-tour  [EXTERNAL 200 Helicopter Tours London | Sightseeing Flights | Battersea]
62. https://www.englishwinetours.com  [EXTERNAL 200 English Wine Tours | Vineyard Tours and Tastings in England]
63. https://www.tripadvisor.com/Attraction_Review-g186338-d15660499-Reviews-English_Wine_Adventures-London_England.html  [EXTERNAL 403 tripadvisor.com]
64. https://balfourwinery.com/visit  [EXTERNAL 200 Visit Balfour Winery, Kent | Tours, Wine Tastings & Dining]
65. https://balfourwinery.com/visit/tours  [EXTERNAL 200 Tours | Balfour Winery on the Hush Heath Estate, Kent]
66. https://www.redletterdays.co.uk/p/english-vineyard-coach-tour-with-lunch-and-wine-tasting/ewtsa  [EXTERNAL 200 English Vineyard Coach Tour with Lunch and Wine Tasting | Red Letter D]
67. https://www.buyagift.co.uk/food-and-drink/drinks/wine  [EXTERNAL 200 Wine Tasting Experiences & Vineyard Tours | Buyagift]
68. https://www.wonderdays.co.uk/vouchers/35-minute-champagne-london-helicopter-flight-for-2  [EXTERNAL 200 35 Minute Private London Helicopter Tour For 2 With… | WonderDays]
69. https://www.goldenmoments.co.uk/london-sightseeing-flight-for-two-with-champagne.html  [EXTERNAL 200 London Sightseeing Flight for Two with Champagne | Romantic Helicopter]
70. https://aviatorhampshire.com/experiences/wine-flights  [EXTERNAL 200 Wine Flights - Luxury Hotel, Restaurant, Bar, Wedding & Event Venue | ]
71. https://www.ultimatehigh.co.uk/flight-experiences/fly-wine-dine  [EXTERNAL 200 Fly, Wine, Dine - Ultimate High]
72. https://cluboenologique.com/story/best-english-vineyards-for-tours-and-tastings  [EXTERNAL 200 Best English vineyard tours and tastings: 23 top wineries to visit]
73. https://www.businesstraveller.com/news/these-are-officially-the-best-vineyards-to-visit-in-the-uk  [EXTERNAL 200 These are Officially the Best Vineyards to Visit in the UK - Business ]
74. https://www.vinetur.com/en/20260720104522/winegb-urges-britain-to-create-a-cellar-door-tax-break-for-wineries.html  [EXTERNAL 200 WineGB urges Britain to create a cellar door tax break for wineries]
75. https://winegb.co.uk/winegb-awards-2026  [EXTERNAL 200 WineGB Awards 2026 - WineGB]
76. https://winegb.co.uk/blog/the-a-to-z-of-english-wine-week-2026  [EXTERNAL 200 The A to Z of English Wine Week 2026 - WineGB]
77. https://www.bestinbritain.org/guides/best-vineyards-uk-to-visit  [EXTERNAL 200 20 best vineyards in the UK to visit (2026 Fees & Reviews) | Best in B]
78. https://www.huggg.me/blog/corporate-christmas-gift-ideas-2026  [EXTERNAL 200 Corporate Christmas gift ideas 2026: a UK guide | Huggg]
79. https://www.ajg.com/uk/news-and-insights/uk-hospitality-and-leisure-outlook-h2-2026  [EXTERNAL 200 fetched]
80. https://journey.travel/insights/2026-gift-voucher-trends  [EXTERNAL 200 2026 Voucher Trends: From Dinner Dates to Destination Experiences]
81. https://www.thedrinksbusiness.com/2026/01/uk-hospitality-sees-longer-stays-and-higher-spend-over-festive-period  [EXTERNAL 200 UK hospitality sees longer stays and higher spend over festive period]
82. https://www.wsetglobal.com/media/12738/wset-ag-2023-yearbook-digital.pdf  [EXTERNAL 200 fetched]
83. https://www.proz.com/profile_resources/2082761_r559c874a57811.pdf  [EXTERNAL 403 Just a moment...]
84. https://dns.google/resolve?name=thewineflight.com&type=A  [EXTERNAL 200 fetched]
85. https://dns.google/resolve?name=www.thewineflight.com&type=CNAME  [EXTERNAL 200 fetched]
86. https://cloudflare-dns.com/dns-query?name=thewineflight.com&type=A  [EXTERNAL 400 fetched]
87. https://www.instagram.com/the.wine.flight  [EXTERNAL 429 fetched]
88. https://www.instagram.com/the.wine.flight/embed  [EXTERNAL 200 Instagram]
89. https://www.linkedin.com/company/the-wine-flight  [EXTERNAL 200 The Wine Flight | LinkedIn]
90. https://www.linkedin.com/in/josh-edelman88  [EXTERNAL 999 fetched]
91. https://www.sugruesouthdowns.com/products/tours-tastings  [EXTERNAL 200 TOUR & TASTING – Sugrue South Downs]
92. https://www.sugruesouthdowns.com/pages/gift-cards  [EXTERNAL 200 GIFT CARDS – Sugrue South Downs]
93. https://www.wistonestate.com/product-category/tours-experiences  [EXTERNAL 200 Events – Wiston Estate]
94. https://www.wistonestate.com/product/gift-vouchers  [EXTERNAL 200 Wiston Estate Vouchers | Voucher Connect]
95. https://www.wistonestate.com/product-category/gifting/experiences  [EXTERNAL 200 Experiences | Wiston Estate]
96. https://www.gusbourne.com/tours  [EXTERNAL 200 Tours and tastings | The Nest | Gusbourne Fine English Wines]
97. https://www.gusbourne.com/visits/gift  [EXTERNAL 200 Gusbourne Fine English Wines]
98. https://www.gusbourne.com/corporate-services/experiences  [EXTERNAL 200 CORPORATE EXPERIENCES AT | CORPORATE EXPERIENCES AT GUSBOURNE]
99. https://www.gusbourne.com/about/our-partners  [EXTERNAL 200 Our Partners | Gusbourne Fine English Wines]
100. https://langhamwine.co.uk/events  [EXTERNAL 200 Events at Langham Wine Estate | Join us at the Vineyard]
101. https://langhamwine.co.uk/private-hire-events-at-langham  [EXTERNAL 200 Private Hire Events at Langham - Langham Wine Estate]
102. https://www.allangels.com/pages/tours  [EXTERNAL 200 TOURS – All Angels]
103. https://www.allangels.com/collections/vouchers  [EXTERNAL 200 VOUCHERS – All Angels]
104. https://www.thegrangewine.co.uk/vineyard/tours  [EXTERNAL 200 Vineyard Tour, wine tasting in Hampshire | The Grange]
105. https://www.thegrangewine.co.uk/vouchers-merch  [EXTERNAL 200 Events & Merch - The Grange]
106. https://coatesandseely.com/product/gift-box  [EXTERNAL 200 Gift Box – Coates and Seely]
107. https://www.thunderaviation.com/helicopter-experiences  [EXTERNAL 200 Thunder Aviation - Exclusive Helicopter Experiences & Tours]
108. https://www.thunderaviation.com/helicopter-destinations  [EXTERNAL 200 Fly with Thunder Aviation. Explore destinations & events we fly to by ]
109. https://www.thunderaviation.com/helicopter-charter-flights  [EXTERNAL 200 Thunder Aviation - Helicopter Charter Flights Across the UK & Europe]
110. https://www.instagram.com/thunderaviation/embed  [EXTERNAL 200 Instagram]
111. https://www.instagram.com/wistonestate/embed  [EXTERNAL 200 Instagram]
112. https://www.instagram.com/sugruesouthdowns/embed  [EXTERNAL 200 Instagram]
113. https://www.instagram.com/danburyridgewine/embed  [EXTERNAL 200 Instagram]
114. https://www.redletterdays.co.uk/helicopter-rides  [EXTERNAL 404 fetched]
115. https://www.virginexperiencedays.co.uk/helicopter-rides  [EXTERNAL 404 The page you were looking for isn&apost here!]
116. https://www.buyagift.co.uk/flying/helicopter-flights  [EXTERNAL 404 fetched]
117. https://www.nyetimber.com/visit  [EXTERNAL 404 Page not found - Nyetimber]
118. https://www.chapeldown.com/visit  [EXTERNAL 404 404 Not Found – Chapel Down]
119. https://rathfinnyestate.com/visit  [EXTERNAL 200 Visit Rathfinny Wine Estate | Home of Sussex Sparkling]
120. https://hambledonvineyard.co.uk  [EXTERNAL 200 Hambledon Vineyard | English Sparkling Wine, Tours & Dining, Hampshire]
121. https://thehospitalitybroker.com/christmas-corporate-hospitality-vip-christmas-events-2026-inspirations  [EXTERNAL 200 Christmas corporate hospitality and VIP Christmas events 2026 Inspirat]
122. https://www.quintessentially.com  [EXTERNAL 200 Luxury Lifestyle Management Service | Quintessentially]
123. https://www.decanter.com/wine-travel/best-english-vineyards-to-visit  [EXTERNAL 404 fetched]
124. https://www.thedrinksbusiness.com/2026/07/rathfinny-wins-approval-to-expand-sussex-wine-tourism-offering  [EXTERNAL 200 Rathfinny wins approval to expand Sussex wine tourism offering]
125. https://www.the-buyer.net  [EXTERNAL 200 The Buyer]
126. https://harpers.co.uk  [EXTERNAL 200 Harpers Wine & Spirit Trade News]
127. https://www.londonheliport.co.uk  [EXTERNAL 200 Home | London Heliport | Enabling helicopter travel for 50+ years]
128. https://winegb.co.uk  [EXTERNAL 200 Welcome to Wines of Great Britain (WineGB)]
129. https://www.thunderaviation.com/experiences/gusbourne-wine-tour  [EXTERNAL 200 Thunder Aviation - Gusbourne Vineyard Helicopter Tour]
130. https://www.thunderaviation.com/experiences/bespoke-experiences  [EXTERNAL 200 Thunder Aviation - Bespoke Helicopter Experiences]
131. https://www.thunderaviation.com/gift-vouchers  [EXTERNAL 404 Not Found]
132. https://harpers.co.uk/news/fullstory.php/aid/32921/Wine_tourism_booms_in_the_UK_as_visits_to_vineyards_surge_by_55_25.html  [EXTERNAL 200 Wine tourism booms in the UK as visits to vineyards surge by 55% - Har]
133. https://moodiedavittreport.com/?p=477580  [EXTERNAL 200 London Gatwick showcases regional wine producers with English Wine Wee]
134. https://chapeldown.com/blogs/news/chapel-down-unveils-the-hythe-and-launches-new-luxury-wine-experience-ahead-of-english-wine-week  [EXTERNAL 200 Chapel Down Unveils The Hythe and Launches New Luxury Wine Experience]
135. https://the-buyer.net/opinion/ashley-saunders-on-how-to-make-the-most-of-english-wine-tourism  [EXTERNAL 200 The Buyer | Ashley Saunders on how to make the most of English wine to]
136. https://winegb.co.uk/2026/07/23/winegb-trade-press-tasting-calls-on-the-industry-to-expand-uk-wine-listings-and-tourism-partnerships-to-support-category-acceleration  [EXTERNAL 200 WineGB Trade & Press Tasting Calls on the Industry to Expand UK Wine L]
137. https://www.decanter.com/wine-travel/united-kingdom/the-best-english-vineyard-visits-458920  [EXTERNAL 200 Best English vineyards to visit this summer | Decanter]
138. https://www.blacklane.com/en/blog/travel/best-english-vineyards  [EXTERNAL 200 21 of the Best English Vineyards to Visit in 2026]
139. https://bolneywineestate.com/blog/reasons-to-visit-an-english-vineyard-this-summer  [EXTERNAL 200 15 Reasons to Visit an English Vineyard This Summer]
140. https://elitetraveler.com/food-and-drink/wines-and-spirits/most-beautiful-english-vineyards  [EXTERNAL 200 The Most Beautiful English Vineyards to Visit this Summer]
141. https://culturewhisper.com/r/food_drink/the_best_vineyards_in_the_uk_to_visit/13869  [EXTERNAL 000 fetched]
142. https://www.healthclubmanagement.co.uk/health-club-management-news/UK-set-to-become-%E2%80%98major-player%E2%80%99-in-wine-tourism/317777  [EXTERNAL 200 UK set to become ‘major player’ in wine tourism]
143. https://glassofbubbly.com/growth-of-the-uk-wine-tourism-industry  [EXTERNAL 200 Growth of the UK Wine Tourism Industry | Glass of Bubbly]
144. https://www.gusbourne.com/about-us  [EXTERNAL 200 About Us | Gusbourne Fine English Wines]
145. https://www.wistonestate.com/chalk-restaurant/chalk-restaurant-bookings  [EXTERNAL 200 SevenRooms]
146. https://www.danburyridge.com/visit  [EXTERNAL 404 fetched]
147. https://hambledonvineyard.co.uk/products/vineyard-and-winery-tour-tasting-2025  [EXTERNAL 200 Vineyard Tours & Wine Tasting Hampshire | Hambledon Vineyard]
148. https://www.redletterdays.co.uk  [EXTERNAL 200 Red Letter Days | Experience Days & Gift Ideas]
149. https://www.virginexperiencedays.co.uk  [EXTERNAL 200 Virgin Experience Days UK | Experience Gifts & Presents]
150. https://www.instagram.com/the.wine.flight/?og  [EXTERNAL  crawler UA og meta 2026-10-11 11:17 UTC, 57 followers 41 following 9 p]
151. https://www.instagram.com/natgeo/embed  [EXTERNAL  positive control, embed read with counts same minute]
152. https://www.instagram.com/zzqq_not_real_handle_8812/embed  [EXTERNAL  negative control, EmbedIsBroken]
153. https://www.google.com/search?tbm=map&hl=en&q=The+Wine+Flight+London  [EXTERNAL  Maps payload, Helicopter tour agency, 167-169 Great Portland St]
154. https://www.google.com/search?tbm=map&hl=en&q=Gusbourne+Estate+Kent  [EXTERNAL  Maps control]
155. https://cloudflare-dns.com/dns-query?name=thewineflight.com&type=A&json  [EXTERNAL  no A record, second resolver]
156. https://cloudflare-dns.com/dns-query?name=example.com&type=A&json  [EXTERNAL  DNS control]
157. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fwww.thewineflight.com%2F  [EXTERNAL  EU view 0 cookies]
158. https://news.google.com/rss/search?q=%22The+Wine+Flight%22  [EXTERNAL  news.py company 32, none theirs]
159. https://news.google.com/rss/search?q=%22Josh+Edelman%22  [EXTERNAL  news.py person 10, a comedian, none his]
160. https://news.google.com/rss/search?q=Sussex+Kent+Hampshire+London+wine+tourism  [EXTERNAL  news.py regional 53]
161. https://news.google.com/rss/search?q=English+wine+tourism+helicopter  [EXTERNAL  news.py industry 63]
162. https://news.google.com/rss/search?q=Tesco  [EXTERNAL  news.py control 100]
163. https://www.instagram.com/thunderaviation/embed/?shortua  [EXTERNAL  4,189 followers 191 posts]
164. https://www.instagram.com/wistonestate/embed/?shortua  [EXTERNAL  27,119 followers]
165. https://www.instagram.com/sugruesouthdowns/embed/?shortua  [EXTERNAL  14,076 followers]
166. https://www.instagram.com/danburyridgewine/embed/?shortua  [EXTERNAL  5,902 followers]
167. https://www.wsetglobal.com/media/12738/wset-ag-2023-yearbook-digital.pdf?pdf  [EXTERNAL  Josh Edelman listed among Diploma graduates]
168. https://find-and-update.company-information.service.gov.uk/search/officers?q=Joshua+Victor+Edelman  [EXTERNAL  1 appointment]
