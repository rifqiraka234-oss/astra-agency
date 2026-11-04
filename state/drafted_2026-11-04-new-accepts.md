# Openers, 2026-11-04. The three accepts not yet researched. Angle by Raka's standing rule of 4 Nov

Raka, 4 Nov, "Yeah, I think I should be AI-powered go-to-market workflow outreach flow for something for B2B sales,
you know? It's always the case." So all three carry an AI powered outreach flow and no credential line (his 3 Nov edit on
Cameron, now docs/RULES.md section 1). NOT APPROVED. Nothing here goes out without his word for this exact text.

Variants by `variant_for`. Alexander B, Nicholas B, Kim A. Kim's draft carries the four block shape with no credential
line on Raka's rule, so like Cameron it's logged outside the A/B test.

Threads pulled 2026-11-04 ~10.50 UTC with tools/lemlist.py, control ctc_ch3vFcKAkjQdMKDCg 8 items ok, all three 0 items.

### Alexander Minniti, Scarpetta, ctc_LnKjJZtEe2vhYLfFp

> Flags. (1) Scarpetta Pasta B.V., KVK 96862238, Haarlemmerdijk 125, registered 2025. The register doesn't list
> directors on the free view, so ownership rests on his tagline "Founder @ Scarpetta" and jobTitle Founder. (2) He's ex
> Bumble, AB InBev, Heineken, so he knows sales outreach and will judge the flow hard. (3) The timing is the hook, the
> events page sells end of year drinks and it's November.

```gate
lead: Alexander Minniti, lemlist jobTitle Founder, tagline "Founder @ Scarpetta  Ex Bumble, AB InBev, Heineken, and Jamestown", Amsterdam. Scarpetta Pasta B.V., KVK 96862238, Haarlemmerdijk 125 Amsterdam, registered 2025 (kvk-search.js read 2026-11-04). ctc_LnKjJZtEe2vhYLfFp, W1b, invite accepted. Thread 0 items, control 8
site pass 1: 90 URLs, tools/crawl.py on https://scarpetta.co, 78 at 200 and 12 at 429 (Shopify rate limit, product duplicates and .oembed), every page read (home, menu, events, catering, order food, work with us, circularity, contact, request an event date, shop, EN and NL)
site pass 2: 92 URLs, tools/crawl.py again after the rate limit cleared, 89 at 200 and 3 at 429 (.oembed and a cart link), plus the walled catering, events and work with us pages through tools/fetch-walled.py, and the desktop screenshot through tools/render-via-curl.js opened (site-audit.js was walled by a 429, BLOCKED_BY_THEIR_WALL, so no visual finding from it is used)
deep analysis: a fresh pasta bar on Haarlemmerdijk serving pasta in reusable glass jars, a Pasta Lab kitchen at Valschermkade 16F in Amsterdam Zuid, and an Amsterdam South shop "COMING SOON". Three B2B lines. Catering, "Fresh pasta, delivered anywhere in Amsterdam", "WHY BRANDS LOVE US", "Deliveries from as few as 10 portions", "We do recurring partnerships too!". Events in the Pasta Lab, "long table dinners, standing aperitivi, pasta workshops, and company events", Aperitivo & Pasta standing 20 to 150 guests "Perfect for borrels, end-of-year drinks, and teams who'd rather not sit still", La Cena seated, Il Laboratorio 8 to 25, dinners from €65, aperitivi from €40, workshops from €75 per person plus VAT, "We regularly work on product launches, brand dinners, shoots". Every one is booked by "Fill in the form ... We reply within 24 hours". INFERENCE, a full Lab evening for 60 people at €40 is €2,400 before drinks, so one booked company event is worth weeks of jars, and the season for end of year drinks is being decided now
owner linkedin: Route 1 https://www.linkedin.com/in/alexanderminniti walled. Route 2 Google News "Alexander Minniti" 0 results. Route 3 KVK, company found, directors not on the free view. Route 4 the site, no founder named. Route 5 the lemlist record, Founder, tagline names Scarpetta. Route 6 Instagram bio read through social-audit.js
contact linkedin: same person as the owner, the lemlist record and the tagline agree
google news: tools/news.py nl 2026-11-04, "Scarpetta" 38 hits, all the Nicole Kidman series, none about them, "Alexander Minniti" 0, control Heineken 74
regional news: tools/news.py (Amsterdam pasta) x (office catering Amsterdam), 2 hits, background only
industry news: tools/news.py office catering Amsterdam, 10 hits, Bidcorp Digital Acceleration Office (Foodclicks 16 Apr 2026), Norrsken fund to Amsterdam (Het Parool 18 Dec 2025), background only
sources:
1. https://scarpetta.co/
2. https://scarpetta.co/pages/events
3. https://scarpetta.co/pages/catering
4. https://scarpetta.co/pages/menu
5. https://scarpetta.co/pages/order-food
6. https://scarpetta.co/pages/work-with-us
7. https://scarpetta.co/pages/circularity
8. https://scarpetta.co/pages/request-an-event-date
9. https://www.instagram.com/scarpetta.amsterdam
10. https://www.facebook.com/people/Scarpetta-Fresh-Pasta-in-a-Jar/61580694007579/
11. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fscarpetta.co
12. https://news.google.com/rss (tools/news.py)
13. https://www.kvk.nl/zoeken/?source=all&q=96862238 (tools/kvk-search.js)
14. https://www.tiktok.com/@scarpetta.amsterdam
pains: 4 judged. (1) the Lab and the catering are the high value B2B lines and both wait on a request form while Amsterdam teams plan their end of year drinks now, CHOSEN. (2) website, modern Shopify, blog empty, the request page is an embedded form, small. (3) social, Instagram 13,268 followers posting every few days, strong, not a pain. (4) GDPR, no banner and 0 cookies before a click, never the angle
chosen: (1), biggest, one company event is worth weeks of jars and the season is now, and it's the GTM angle Raka picked
owner reply: "We already get event requests" | good, the flow adds the teams who haven't heard of the Lab yet and sends them a date | https://scarpetta.co/pages/events "How do I book? Fill in the form"
worth: €4,000+, an AI powered outreach flow, a list of Amsterdam offices, agencies and brands near Zuid and the centre, personal outreach with a Lab evening or a catering date, and booked dates
still there: Alexander's tagline names Scarpetta on the lemlist record read 2026-11-04, and Instagram posted 1 Nov | https://www.instagram.com/scarpetta.amsterdam
budget: a restaurant, a production Lab and a second shop coming, events from €40 a head | https://scarpetta.co/pages/menu "amsterdam south COMING SOON!"
variant: B
sweep website: crawled twice, 90 and 92 URLs, the screenshot opened, modern Shopify, not chosen
sweep gdpr: site-audit.js no banner against its control, 0 cookies before a click, tools/eu-view.py from Stockholm 4 cookies, all Shopify essentials, checked, never the angle (RULES 0E)
sweep apps: Shopify shop, Uber Eats and Thuisbezorgd, a loyalty programme for jar returns, the outreach flow is the chosen build
sweep social: tools/social-audit.js, Instagram https://www.instagram.com/scarpetta.amsterdam 13,268 followers latest 1 Nov, Facebook 7.2K latest 3 days ago, TikTok walled UNKNOWN, not chosen
sweep squad: https://scarpetta.co/pages/work-with-us hires front of house only, no tech roles, not chosen
thread: problem the Pasta Lab sells end of year drinks and bookings come in through a request form | cost Amsterdam teams planning theirs now likely book whoever reaches them first | offer an AI powered outreach flow that finds Amsterdam teams and books Pasta Lab evenings and catering dates | link Pasta Lab
lead read: Alexander reads that his own Lab sells end of year drinks but waits for the form, then gets offered an AI powered outreach flow that finds teams and books Lab evenings and catering dates, one thread
claims:
your Pasta Lab sells end of year drinks for 20 to 150 guests, https://scarpetta.co/pages/events "Aperitivo & Pasta Standing, from 20 to 150 guests" and "Perfect for borrels, end-of-year drinks"
bookings come in through a request form, https://scarpetta.co/pages/events "How do I book? Fill in the form with your date, number of guests"
INFERENCE, Amsterdam teams planning theirs now likely book whoever reaches them first, rests on the season named on https://scarpetta.co/pages/events "end-of-year drinks" and today's date, worded likely
recheck: 2026-11-04 ~11.00 UTC, events and catering pages read in crawl pass 2 and through fetch-walled.py. Disproof tried, searched every page for an instant booking calendar or a corporate sales contact and found only the form and "Share your idea", and the catering page also sells "recurring partnerships", so some offices may already be regulars. Facts hold, confidence MEDIUM
```

SKETCHB
```
Hi Alexander, Scarpetta looks cool.

However, your Pasta Lab sells end of year drinks for 20 to 150 guests, and bookings come in through the request form. Amsterdam teams planning theirs right now likely book whoever reaches them first.

I'd suggest an AI powered outreach flow that finds Amsterdam offices and agencies, offers them a Pasta Lab evening or a catering date, and books it in for you.

Shall I send you a sketch of the flow for the Pasta Lab?
```

### Nicholas Rawling, T.A.I Studio, ctc_KjcqsmYtMGWuWonZf

> Flags. (1) Co founder part time, his day job is contract IT project manager in Newcastle, tagline "Contract IT Project
> Manager | Azure, M365, O365 | Co-Founder T.A.I Studio". Sai Rawling runs the Thai side. (2) T.A.I Studio is a trading
> name of a Thai company, บริษัท เอ็น.อาร์.เอช.8 จำกัด, per the site footer. Not on UK Companies House. (3) Banyan Tree
> Samui announced a partnership with them on 8 Oct 2026 (thaipr.net, Travelling for Business), so it's working. Never
> said in the message, it's background.

```gate
lead: Nicholas Rawling, lemlist jobTitle Co-Founder (Part-Time), tagline "Contract IT Project Manager | Azure, M365, O365 | Co-Founder T.A.I Studio", Newcastle upon Tyne. The about page https://www.thetaistudio.com/about "T.A.I Studio was founded by Nicholas Rawling and Sai Rawling". Footer "TAI Studio is a trading name of: บริษัท เอ็น.อาร์.เอช.8 จำกัด". ctc_KjcqsmYtMGWuWonZf, W1b, invite accepted. Thread 0 items, control 8
site pass 1: 35 URLs, tools/crawl.py on https://thetaistudio.com, all 200, every page read (home, stories and its 8 posts, voices, collaboration, collections, about, FAQs)
site pass 2: 35 URLs, tools/crawl.py again, all 200, plus site-audit.js desktop and phone screenshots opened, a calm modern Squarespace site with full bleed photos of the weaving
deep analysis: handwoven Krajood and banana tree fibre objects made by family workshops in Phatthalung, sold to resorts, spas and villas as custom guest pieces and resort retail. The collaboration page lists Vikasa Phuket "more than 1,500 handmade pieces for the new Vikasa Phuket", "A resort opening, interpreted through local materials", TreeHouse Villas Koh Yao 50 bags plus about 80 photo and video assets, The Bell Pool Villa Resort 30 bags and a guest app retail pilot, and the homepage "Six Senses Samui, Bespoke prototypes". FAQ "We currently work with hospitality partners across Thailand", "MOQ depends on the product". Every route in is "Start a Collaboration ... Tell us a little about your space" or "Request Catalogue". INFERENCE, an opening is where the big order lives (1,500 pieces against 30 and 50 for running resorts), and an opening chooses its makers on the pre opening team's timeline
owner linkedin: Route 1 https://www.linkedin.com/in/nicholas-rawling-37a7945b walled. Route 2 Google News "Nicholas Rawling" 3 hits, none him (an obituary, a music review, a theatre review). Route 3 Companies House, no UK company, the business is Thai per the footer. Route 4 the about page names him as co founder. Route 5 the lemlist record. Route 6 Instagram https://www.instagram.com/t.a.i_studio read
contact linkedin: same person as the owner, the about page and the lemlist record agree
google news: tools/news.py en 2026-11-04, "T.A.I Studio" 7 hits, 2 about them, Banyan Tree Samui partnership (Travelling for Business 8 Oct 2026, Newswav 25 Oct 2026), the press release read on thaipr.net, control Tesco ok
regional news: tools/news.py (Thailand resort openings) x (hotel procurement handmade decor), 0 hits, so the opening pipeline itself is unsourced and the cost line is worded likely
industry news: tools/news.py hotel procurement handmade decor, 0 hits, background from the Banyan Tree release only
sources:
1. https://thetaistudio.com/
2. https://www.thetaistudio.com/collaboration
3. https://www.thetaistudio.com/collections
4. https://www.thetaistudio.com/about
5. https://www.thetaistudio.com/faqs
6. https://www.thetaistudio.com/voices
7. https://www.thetaistudio.com/stories
8. https://www.instagram.com/t.a.i_studio
9. https://youtube.com/shorts/9OZWGOZ3cM8
10. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fthetaistudio.com
11. https://www.thaipr.net/?p=3767184 (Banyan Tree Samui release, 8 Oct 2026)
12. https://news.google.com/rss (tools/news.py)
pains: 4 judged. (1) the biggest order came from a resort opening and new properties are only reached when they find the studio, CHOSEN. (2) website, modern and strong, the title tag reads "T.A.l." with a lowercase L, a two minute fix, out (RULES 0E). (3) social, Instagram 4,886 and 255 posts, latest 2 Nov, healthy. (4) GDPR, a banner with no reject and 9 cookies before a click, never the angle
chosen: (1), biggest, one opening is worth 30 times a running resort's bag order, and it's the GTM angle Raka picked
owner reply: "Our clients come through hotel contacts and word of mouth" | true, and that reaches the resorts you already know, the flow reaches the pre opening teams you don't | https://www.thetaistudio.com/collaboration "A resort opening, interpreted through local materials"
worth: €4,000+, an AI powered outreach flow, a tracked list of resort openings and refits across Thailand, the design and pre opening contacts, outreach with the Vikasa story, and booked calls
still there: about page names Nicholas as co founder, crawl pass 2 read 2026-11-04, Instagram posted 2 Nov | https://www.instagram.com/t.a.i_studio
budget: a 1,500 piece resort programme in production and a Banyan Tree Samui partnership | https://www.thetaistudio.com/collaboration
variant: B
sweep website: crawled twice, 35 URLs, screenshots opened, modern, a typo in the title tag, not chosen
sweep gdpr: site-audit.js found a banner with no reject, 9 cookies and 2 third party before a click, tools/eu-view.py from Stockholm 7 cookies including _ga and _gcl_au, checked, never the angle (RULES 0E)
sweep apps: The Bell guest app retail pilot is theirs already, the outreach flow is the chosen build
sweep social: tools/social-audit.js, Instagram https://www.instagram.com/t.a.i_studio 4,886 followers 255 posts latest 2 Nov, YouTube short walled, not chosen
sweep squad: no job posts on the site or socials, a part time co founder in IT, not chosen
thread: problem the 1,500 piece Vikasa Phuket order came from a resort opening and the site's way in is the collaboration form | cost resorts opening next year likely choose their makers before they hear of T.A.I | offer an AI powered outreach flow that tracks resort openings and refits and reaches their design teams with the Vikasa story | link openings
lead read: Nicholas reads that his biggest order came from an opening and openings choose early, then gets offered an AI powered outreach flow that tracks openings and reaches the teams, one thread
claims:
the Vikasa Phuket project, more than 1,500 pieces, came from a resort opening, https://www.thetaistudio.com/collaboration "more than 1,500 handmade pieces for the new Vikasa Phuket" and "A resort opening, interpreted through local materials"
the way in on the site is the collaboration form, https://thetaistudio.com/ "Start a Collaboration ... Tell us a little about your space, guests or requirements and we'll be in touch"
INFERENCE, resorts opening next likely choose their makers before they find T.A.I, rests on https://www.thetaistudio.com/collaboration "Each piece began with a specific requirement from the property", prototypes before production, so makers are picked early, worded likely
recheck: 2026-11-04 ~11.00 UTC, collaboration, home, collections and FAQ pages read in crawl pass 2. Disproof tried, looked for an outbound or trade show channel on every page and the socials and found only inbound routes, and the Banyan Tree partnership shows a big group did reach them, so it isn't written as "nobody finds you". Facts hold, confidence MEDIUM
```

SKETCHB
```
Hi Nicholas, T.A.I Studio looks cool.

However, your biggest project, more than 1,500 pieces for Vikasa Phuket, came from a resort opening, and the way in on your site is the collaboration form. Resorts opening next year likely choose their makers before they ever hear of T.A.I.

I'd suggest an AI powered outreach flow that tracks resort openings and refits across Thailand and reaches their design teams with the Vikasa story.

Shall I send you a sketch of the flow for resort openings?
```

### Kim Van Der Hoff, Dees, ctc_DaSimSeKeTqjbbyxc

> Flags. (1) Ownership settled. Her tagline says "Co owner bij PizzaBar Rijslust" and lemlist says Mede-eigenaar, and
> Brabants Dagblad, 8 Sep 2026, names "Noa Schoffelen, Emma van der Meij, Kim van der Hoff, Rosanne Janssen, Martine van
> der Poel en Ruud Gelissen in hun nieuwe zaak 'Dees'", "een van de zes eigenaren". So she co owns both. (2) Six owners,
> so whoever reads it may not decide alone. (3) Dees Tilburg B.V. 42058851 and Dees Ateliers 42058899, both registered
> 12 May 2026. (4) Arm A by contactId, shape B by Raka's rule, logged outside the test.

```gate
lead: Kim van der Hoff, lemlist jobTitle Mede-eigenaar, tagline "Co owner bij PizzaBar Rijslust", Tilburg. Brabants Dagblad 8 Sep 2026 https://www.bd.nl/tilburg/nieuw-leven-voor-leegstaand-pand-aan-de-korte-tuinstraat-eindelijk-croissants-en-zuurdesem~aa5823a8/ names her among the six owners of Dees, read 2026-11-04 through Chromium past the consent gate. Dees Tilburg B.V. KVK 42058851 and Dees Ateliers KVK 42058899, both registered 12 May 2026 (kvk-search.js). ctc_DaSimSeKeTqjbbyxc, W1c, invite accepted. Thread 0 items, control 8
site pass 1: 8 URLs, tools/crawl.py on https://www.deestilburg.nl, all 200, every page read (home, menu, ateliers, werkplekken, team, vergaderen, contact, privacy)
site pass 2: 8 URLs, tools/crawl.py again, all 200, plus site-audit.js desktop and phone screenshots opened, a clean new site with a warm photo led layout
deep analysis: a bakery and coffee bar with seven artist studios at Korte Tuinstraat 20 and 22 in the Dwaalgebied, in a building empty for three years after Flink left (Brabants Dagblad). Two B2B lines. The meeting room, "Plek voor 6 tot 16 personen", per uur €60, ochtend €180, middag €200, hele dag €350, plus drink and lunch packages from €5 to €24.95 a head, and "Binnenkort boek je hier direct via ons eigen reserveringssysteem. Tot die tijd regelen we het graag persoonlijk" with a request form. Desks, "Vanaf €200 p/m", jaarcontract €200, halfjaar €225, maandelijks €250, "We werken graag eerst twee weken op proef". Opened in the summer, indebuurt's list of August 2026 openings and BD "sinds kort open". INFERENCE, a room that sells a whole day for €350 earns only on the days a company knows it's there, and a new venue isn't on any Tilburg team's list yet
owner linkedin: Route 1 https://www.linkedin.com/in/kim-van-der-hoff-04091311 walled. Route 2 Google News "Kim van der Hoff" 8 hits, Dees (BD 8 Sep, indebuurt 21 Sep) and Rijslust (2019, 2025). Route 3 KVK, both Dees companies found, owners not on the free view. Route 4 Brabants Dagblad names her an owner. Route 5 the lemlist record. Route 6 the company LinkedIn https://www.linkedin.com/company/129854213 through social-audit.js, walled
contact linkedin: same person, the lemlist record and Brabants Dagblad agree
google news: tools/news.py nl 2026-11-04, "Dees Tilburg" 1 hit (indebuurt openings of August 2026), "Kim van der Hoff" 8, the BD article read in full, the indebuurt one errored in our browser and isn't used
regional news: tools/news.py (Tilburg Dwaalgebied) x (vergaderruimte huren Tilburg), 5 hits, Het Koetshuis meeting venue with golf simulator (Tilburg.com 1 Jun 2023), the old police station on Wilhelminapark (indebuurt 14 Apr 2025), background on competing venues
industry news: tools/news.py vergaderruimte huren Tilburg, background only
sources:
1. https://www.deestilburg.nl/
2. https://www.deestilburg.nl/vergaderen
3. https://www.deestilburg.nl/werkplekken
4. https://www.deestilburg.nl/ateliers
5. https://www.deestilburg.nl/team
6. https://www.deestilburg.nl/menu
7. https://www.bd.nl/tilburg/nieuw-leven-voor-leegstaand-pand-aan-de-korte-tuinstraat-eindelijk-croissants-en-zuurdesem~aa5823a8/
8. https://www.instagram.com/deestilburg
9. https://www.facebook.com/profile.php?id=61591080532676
10. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fwww.deestilburg.nl
11. https://www.pizzabarrijslust.nl
12. https://news.google.com/rss (tools/news.py)
pains: 4 judged. (1) a brand new venue whose meeting room and desks earn only when Tilburg companies know they exist, CHOSEN. (2) website, new and clean, the booking system is "binnenkort", a request form for now, a real but smaller build. (3) social, Instagram 2,383 followers and 17 posts, latest 1 Nov, Facebook 37, young but active. (4) GDPR, no banner and 0 cookies, never the angle
chosen: (1), biggest, a full day is €350 plus €25 a head and they're new, and it's the GTM angle Raka picked
owner reply: "We're a bakery, the room is a side thing" | then it's the easiest thing to fill on a quiet weekday, the flow books it without anyone at the counter chasing it | https://www.deestilburg.nl/vergaderen "Hele dag €350"
worth: €3,000+, an AI powered outreach flow, a list of Tilburg companies, agencies and freelancers near the Dwaalgebied, personal outreach with a meeting morning or a two week desk trial, and booked dates
still there: Instagram posted 1 Nov, the vergaderen page live in crawl pass 2 read 2026-11-04 | https://www.instagram.com/deestilburg
budget: six owners, two new B.V.s, a bakery, a coffee bar and seven studios | https://www.bd.nl/tilburg/nieuw-leven-voor-leegstaand-pand-aan-de-korte-tuinstraat-eindelijk-croissants-en-zuurdesem~aa5823a8/
variant: B, by Raka's rule (no credential line), though variant_for gives A, so it's logged outside the A/B test
sweep website: crawled twice, 8 URLs, screenshots opened, new and clean, the coming booking system noted, not chosen
sweep gdpr: site-audit.js no banner against its control, 0 cookies before a click, tools/eu-view.py from Stockholm 0 cookies, checked, never the angle (RULES 0E)
sweep apps: their own reservation system is "binnenkort", not chosen over the outreach flow, flagged as the second build
sweep social: tools/social-audit.js, Instagram https://www.instagram.com/deestilburg 2,383 followers 17 posts latest 1 Nov, Facebook 37, LinkedIn walled UNKNOWN, not chosen
sweep squad: https://www.deestilburg.nl/team says the team is full, no tech roles, not chosen
thread: problem a new venue whose meeting room for 6 to 16 people only earns when Tilburg teams know it's there | cost most teams likely still book the venues they've always used | offer an AI powered outreach flow that finds Tilburg companies and freelancers and books meeting room mornings and desk trials | link meeting room
lead read: Kim reads that the new meeting room only earns once teams know it, then gets offered an AI powered outreach flow that finds those teams and books the room and the desks, one thread
claims:
Dees only opened this year, https://www.bd.nl/tilburg/nieuw-leven-voor-leegstaand-pand-aan-de-korte-tuinstraat-eindelijk-croissants-en-zuurdesem~aa5823a8/ "De nieuwe zaak, Dees, is sinds kort open" (8 Sep 2026), both B.V.s registered 12 May 2026
the meeting room is for 6 to 16 people, https://www.deestilburg.nl/vergaderen "Plek voor 6 tot 16 personen"
the two week desk trial, https://www.deestilburg.nl/werkplekken "We werken graag eerst twee weken op proef"
INFERENCE, most Tilburg teams likely still book the venues they've always used, rests on Dees being months old per https://www.bd.nl/tilburg/nieuw-leven-voor-leegstaand-pand-aan-de-korte-tuinstraat-eindelijk-croissants-en-zuurdesem~aa5823a8/ "sinds kort open", worded likely
recheck: 2026-11-04 ~11.00 UTC, vergaderen and werkplekken pages read in crawl pass 2, the BD article read in Chromium. Disproof tried, looked on every page and the socials for a listing on a meeting room platform or a corporate partner and found none, and searched the BD text for anything saying the room is already booked out, nothing. Facts hold, confidence MEDIUM
```

SKETCHB
```
Hi Kim, Dees looks cool.

However, Dees only opened this year, and the meeting room for 6 to 16 people only earns when Tilburg teams know it's there. Most of them likely still book the venues they've always used.

I'd suggest an AI powered outreach flow that finds Tilburg companies and freelancers nearby, offers them a morning in the meeting room or a two week desk trial, and books it for you.

Shall I send you a sketch of the flow for the meeting room?
```
