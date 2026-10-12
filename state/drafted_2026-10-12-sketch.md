<!-- SKETCH test batch, Raka 2026-10-12, "hi, so this looks cool. However, your website is this. I suggest to do this. We make websites for blah blah. Shall I send you a sketch of how it looks like?". Angles directed by Raka, Alex social media, Dan website, Kevin website, Alice website, Andres website or social, Chris website, David website. REVISED 2026-10-12 ~17:55 UTC per Raka, "scrap these like compliant or gdpr fixes ... we gotta analyse things that are worth 2500 euros at least" (RULES 0E). Kevin is now NO_STRONG_ANGLE, Chris moved to corporate ordering, David to a staff roster app, the other four offers widened to the full project. Live recheck 18:25 UTC, every claim in the six messages refetched and held (Music Social's /book missed over curl and rendered fine in Chromium, our reader, RULES 0A). NOTHING SENT. Re pull each thread with a control and reopen every claim in the minute before any send (RULES 0D point 4). Evidence in /tmp/claude-0/agents/b17/ (crawls, audits, screenshots), research copied into each gate. -->
# SKETCH drafts, 2026-10-12, six openers and one NO_STRONG_ANGLE

### Alex Talbot, Music Social, ctc_XDRJdGuNAsHxttMmv

```gate
lead: Alex Talbot, co-founder and lead musical director of Music Social, lemlist jobTitle "Co-Founder, Lead Musical Director", tagline "Building Music Social to bring back the magic. Socials | Team Building | Parties". MUSIC SOCIAL LTD 16097271 (incorporated 23 Nov 2024) has one director and 75% or more PSC, Thomas Mathew Kay, per https://find-and-update.company-information.service.gov.uk/company/16097271/persons-with-significant-control , so Alex holds no shares on the register. Co-founder status rests on lemlist, the LinkedIn company page listing "Alex Talbot, Tom Kay" as its two employees and the events page testimonials "Tom and Alex, what you guys have put together is pure magic", MEDIUM HIGH. ctc_XDRJdGuNAsHxttMmv, leadId lea_kP2HnQ2E3cTD7KcXM, campaign W1b cam_7gnHSf6GvvGy8gH3n. Thread pulled 2026-10-12 16:35 UTC, 0 items, nextPage null, control ctc_ch3vFcKAkjQdMKDCg 3 items same minute
site pass 1: 5 URLs, tools/crawl.py on https://www.musicsocial.co.uk/ , every page read (home, events, book, book/wedding)
site pass 2: 5 URLs, second full crawl equal to pass 1, site-audit.js desktop and phone screenshots opened (a clean Wix site, crowd photo hero, next event card, ticket button)
deep analysis: A Wix site for weekly singalong socials at The Red Lion, Leytonstone (Wednesdays, 19 pounds) and monthly Super Sundays, plus a Private Bookings page selling Team Building (3.5 hrs, "For organisations and teams"), The Office Party ("For companies and teams"), birthdays, weddings and Christmas Events ("Pub, Office"). Two revenue lines, tickets sold to the public and private events sold to companies. The public side runs on Instagram (linked from the site, social-audit.js read 13716 followers, 176 posts, latest 2026-10-11). The company side's channel, the LinkedIn company page, has 73 followers and five posts, all "10mo" old, all selling team building ("Time to add a new category to your supplier list, Culture")
owner linkedin: Route 1 the company page https://www.linkedin.com/company/music-social rendered in Chromium, 73 followers, "View all 2 employees", Alex Talbot and Tom Kay. Route 2 WebFetch of the same page, 73 followers, five posts all 10mo. Route 3 personal /in/ profile https://www.linkedin.com/in/alex-talbot walled (999). Route 4 news "Alex Talbot" music, 17 results, none about him. Route 5 his own words on the site, the events testimonials. Route 6 lemlist record
contact linkedin: same person as the owner, co-founder per lemlist and the company page
google news: tools/news.py en 2026-10-12 ~16:40 UTC, "Music Social" London 47 results none about them, "Alex Talbot" music 17 unrelated, control Tesco 100
regional news: tools/news.py (London) singalong OR "music social" OR "team building music", 43 results, Daily Star 2026-05-13 on a London singalong brunch, Time Out 2026-09-29 on London Christmas concerts for 2026, none about them
industry news: tools/news.py singalong OR "music social" OR "team building music", 100 results, BBC 2026-10-11 "Keswick group launches pub singing event alternative to parkrun", and a web search found music team building rivals selling to companies (Tom Morley, Kidbilly Music, Scarlett Entertainment)
sources:
1. https://www.musicsocial.co.uk/
2. https://www.musicsocial.co.uk/events
3. https://www.musicsocial.co.uk/book
4. https://www.musicsocial.co.uk/book/wedding
5. https://www.linkedin.com/company/music-social
6. https://www.instagram.com/musicsocialofficial/embed/
7. https://find-and-update.company-information.service.gov.uk/company/16097271/officers
8. https://find-and-update.company-information.service.gov.uk/company/16097271/persons-with-significant-control
9. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fwww.musicsocial.co.uk%2F (tools/eu-view.py)
10. https://www.designmynight.com/london/whats-on/live-music/music-social-16-september-27 (opened, Music Social as organiser, LVLS Fish Island, Sunday 27 Sep 2026)
11. https://news.google.com/rss (tools/news.py, company, person, region, industry, control)
pains: 5 judged. (1) the company side, team building, office and Christmas parties, has a LinkedIn page with 73 followers and nothing posted in ten months while the consumer side's Instagram posts weekly, CHOSEN, it's the higher ticket revenue line and Christmas season is the peak. (2) /book/wedding renders nav and footer only (33 words), folded out, a page fix. (3) GDPR, no banner and Google Analytics before a click from the EU view, a setting. (4) website, clean and selling tickets, not a gap. (5) Build Squad, not applicable
chosen: (1), biggest, private bookings to companies are the bigger ticket, the channel those buyers use has gone quiet, and October to December is when office Christmas parties get booked
worth: €3,000+, three months of LinkedIn run as a sales channel for company bookings, weekly content for office managers and HR, a Christmas party campaign and outreach to London teams
sweep website: crawl.py twice, 5 URLs, site-audit.js screenshots of https://www.musicsocial.co.uk/ , a working ticket site, the wedding sub page is thin, not chosen
sweep gdpr: tools/eu-view.py from Stockholm on https://www.musicsocial.co.uk/ , Google Analytics and Tag Manager requests with no banner, a setting, not chosen
sweep apps: tickets and bookings by Wix and a form per https://www.musicsocial.co.uk/book , nothing bigger than the social gap, not chosen
sweep social: tools/social-audit.js on the accounts in their HTML, https://www.instagram.com/musicsocialofficial 13716 followers 176 posts latest 2026-10-11, https://www.linkedin.com/company/music-social 73 followers and newest post 10mo, CHOSEN, the B2B channel
sweep squad: a two person events company per https://www.linkedin.com/company/music-social , builds no software, not applicable
thread: problem the LinkedIn page that should sell team building and Christmas parties has 73 followers and no post in ten months | cost the office managers who book those likely don't see Music Social as Christmas season starts | offer LinkedIn run as the sales channel for company bookings, weekly posts, a Christmas party campaign and outreach to London teams | link LinkedIn, Christmas
lead read: Alex reads that the LinkedIn page meant to sell his team building and Christmas parties has 73 followers and hasn't posted in ten months, so office managers likely don't see him as Christmas season comes, and gets offered LinkedIn run as the sales channel for his company bookings with a Christmas campaign, one thread
claims:
your LinkedIn page has 73 followers, https://www.linkedin.com/company/music-social rendered in Chromium 2026-10-12 ~16:42 UTC "73 followers", and WebFetch of the same URL the same session "73 followers"
hasn't posted in ten months, https://www.linkedin.com/company/music-social all five visible posts stamped "10mo", newest first, both reads
your bookings page sells team building, office parties and Christmas events to companies, https://www.musicsocial.co.uk/book "Team Building ... For organisations and teams", "The Office Party ... For companies and teams", "Christmas Events ... Pub, Office"
INFERENCE, the office managers who book those likely don't see you, rests on the 73 followers and the 10mo posts on https://www.linkedin.com/company/music-social , worded likely
with Christmas party season coming, today's date 2026-10-12 against https://www.musicsocial.co.uk/book "Christmas Events ... Because Music Social is made for Christmas"
what you already post on Instagram, https://www.instagram.com/musicsocialofficial linked from https://www.musicsocial.co.uk/ , social-audit.js read latest post 2026-10-11, one tool only, so the message gives no Instagram number
social media management credential, Raka's block four wording of 2026-10-07 and docs/astra-company-profile.md line 95, https://www.linkedin.com/in/raka-mulya-b92885196
recheck: 2026-10-12 ~16:45 UTC, LinkedIn page read two ways (Chromium and WebFetch) and the bookings page reread. Disproof tried, looked for newer LinkedIn posts (none, all five 10mo), for a second LinkedIn page (the site's link and lemlist's companyLinkedinUrl are the same /company/music-social), and for a TikTok, the guessed handle doesn't resolve and a search found none, so the message says nothing about TikTok. Instagram counts rest on one tool, kept out of the message. Facts hold, confidence MEDIUM
```

SKETCH
```
Hi Alex, Music Social looks cool!

However, your LinkedIn page has 73 followers and hasn't posted in ten months, while your bookings page sells team building, office parties and Christmas events to companies. So the office managers who book those likely don't see you, with Christmas party season coming.

I'd suggest running LinkedIn as the sales channel for your company bookings, weekly posts for office managers and HR, a Christmas party campaign and outreach to London teams.

At Astra agency we do social media management for brands like Unilever, AXA, Pertamina.

Shall I send you a sketch of Music Social's LinkedIn sales channel?
```

### Dan D'souza, MUUSH, ctc_ZSXZCGSgniBKAESgP

```gate
lead: Daniel John Alfred D'Souza, director and PSC (more than 25% but not more than 50%) of MUUSH LTD 15389044, incorporated 5 Jan 2024, alongside Matthew Robert Martin, per https://find-and-update.company-information.service.gov.uk/company/15389044/persons-with-significant-control . lemlist jobTitle "Co-Founder", tagline "Serial founder and seasoned marketer | On a mission to bridge taste and function with Lion's Mane based drinks". ctc_ZSXZCGSgniBKAESgP, leadId lea_oLNSJoqWfqebSvzvr, campaign W1b cam_7gnHSf6GvvGy8gH3n. Thread pulled 2026-10-12 16:35 UTC, 0 items, nextPage null, control ctc_ch3vFcKAkjQdMKDCg 3 items same minute
site pass 1: 67 URLs, tools/crawl.py on https://muush.co/ , every product, collection, page and policy read
site pass 2: 67 URLs, second full crawl (rerun 17:00 UTC after a first second pass lost two pages to 429s), site-audit.js flagged RENDER NOT TRUSTED so render-via-curl.js used, 229 requests served by curl, 0 curl errors, all three parts looked at
deep analysis: A well built Shopify store, Lion's Mane sodas in 12 packs, 70cl elixirs, kids' minis and a 6 can variety pack "the perfect introduction" that is "Excluded from Free Shipping". Stockists shown, Amazon, Abel and Cole, Söderberg, Not Another Bill, Wells and Co. Raised 400k pounds (Fruitnet 2025-12-04), Abel and Cole listing (Fruitnet 2026-02-04). The product's own pages say the benefit is slow, the elixir page "The functional benefits of Lion's Mane work best when taken daily, so each bottle has 28 x 25ml servings", the subscription page "It's not like coffee where you'll feel the effect instantly, but rather it builds gradually over time". The homepage never says it (no daily, week, consistent, gradual, routine or 28 in its text, both passes), it opens with a scratch card for 20% off, then flavours and packs, and a "SUBSCRIBE AND GET 20% OFF" banner that gives no reason to subscribe
owner linkedin: Route 1 curl https://www.linkedin.com/in/dan-d-souza 999. Route 2 news "Dan D'Souza" MUUSH, 5 results, all MUUSH coverage (Fruitnet, FoodBev, SeedLegals). Route 3 posts, walled. Route 4 company page https://www.linkedin.com/company/muush-ltd per lemlist. Route 5 his own words, the SeedLegals and Fruitnet pieces. Route 6 lemlist record
contact linkedin: same person as the owner, Companies House and lemlist agree
google news: tools/news.py en 2026-10-12 ~16:40 UTC, "MUUSH" lion's mane 10 results, Fruitnet 2025-12-04 "Muush raises £400k to accelerate growth", Fruitnet 2026-02-04 "Muush lands Abel & Cole listing", Closer 2026-06-19 best non alcoholic drinks, control Tesco 100
regional news: tools/news.py UK functional drinks lion's mane, The Guardian 2026-07-26 on whether functional drinks live up to the hype, FoodBev 2026-01-12 on functional mushroom drinks
industry news: tools/news.py functional soda, The Grocer 2026-06-09 on energy brands adding benefits, Food and Wine 2026-08-18
sources:
1. https://muush.co/
2. https://muush.co/pages/subscription
3. https://muush.co/products/elixir-raspberry-and-lychee-70cl
4. https://muush.co/products/variety-pack
5. https://muush.co/products/muush-blood-orange-ginger-250ml
6. https://muush.co/collections/all
7. https://muush.co/pages/wholesale
8. https://muush.co/pages/faq
9. https://find-and-update.company-information.service.gov.uk/company/15389044/persons-with-significant-control
10. https://www.instagram.com/drinkmuush/embed/
11. https://www.youtube.com/@muush.uk1
12. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fmuush.co%2F (tools/eu-view.py --shopify)
13. https://news.google.com/rss (tools/news.py, company, person, region, industry, control)
pains: 6 judged. (1) the product works with daily use over weeks, the site's own words, but the homepage sells single packs and a scratch card and never says so, so first buyers likely try a few cans, feel nothing yet and don't reorder, CHOSEN. (2) the elixir is 28 servings but shown only as 26.99 a bottle next to 23 for 12 cans, folded into the offer. (3) the variety pack trial is excluded from free shipping, a pricing choice, not raised. (4) health wording ("supporting neuroplasticity") is a regulatory question, not ours to sell, not raised. (5) social, Instagram 7372 followers latest 2026-10-08, active, not a gap. (6) Build Squad, not applicable
chosen: (1), costliest, a subscription brand lives on the second order, and the page most new visitors land on never tells them the thing their own FAQ says decides whether it works
worth: €4,000+, Shopify homepage and first order rebuilt around a 28 day routine, a starter subscription bundle and a Klaviyo flow that carries new buyers to day 28
sweep website: crawl.py twice, 67 URLs, render-via-curl.js on https://muush.co/ with 0 curl errors, the homepage vs the subscription and elixir pages, CHOSEN
sweep gdpr: tools/eu-view.py from Stockholm with --shopify on https://muush.co/ , Shopify's banner set for every EU country and GB, 3 essential cookies before a click, nothing to say
sweep apps: subscriptions, Klaviyo and a scratch card already run per https://muush.co/pages/subscription , the gap is the message, not a tool, folded in
sweep social: tools/social-audit.js on the accounts in their HTML, https://www.instagram.com/drinkmuush/ 7372 followers 283 posts latest 2026-10-08, Facebook 180, YouTube 63 subscribers 3 videos, Instagram active, not chosen
sweep squad: a drinks brand per https://muush.co/pages/muush-story , builds no software, not applicable
thread: problem the homepage never says Lion's Mane works with daily use over weeks though their subscription page does | cost first time buyers likely try a few cans, feel nothing yet and don't come back | offer the homepage and first order rebuilt around 28 days of daily use, a starter subscription and emails to day 28 | link homepage, daily
lead read: Dan reads that his own subscription page says Lion's Mane builds up with daily use but his homepage never says so, so first time buyers likely try a few cans and don't come back, and gets offered a homepage built around taking it daily for 28 days, one thread
claims:
your subscription page says Lion's Mane isn't instant, https://muush.co/pages/subscription "It's not like coffee where you'll feel the effect instantly, but rather it builds gradually over time", both crawl passes
and works best daily, https://muush.co/pages/subscription "Because Lion's Mane works best when you take it daily", and https://muush.co/products/elixir-raspberry-and-lychee-70cl "The functional benefits of Lion's Mane work best when taken daily"
but the homepage never says so, https://muush.co/ text in both passes has none of daily, every day, gradual, consistent, week, routine or 28, control the same text does contain "neuroplasticity" and "SUBSCRIBE AND GET 20% OFF", and the curl render screenshots of https://muush.co/ show the same sections
INFERENCE, a first time buyer likely tries a few cans, feels nothing yet and doesn't come back, rests on https://muush.co/pages/subscription and the homepage text above, worded likely, no reorder data is known
the elixir's already 28 servings, https://muush.co/products/elixir-raspberry-and-lychee-70cl "each bottle has 28 x 25ml servings"
websites credential, docs/astra-company-profile.md line 95, Raka's fixed brand line, https://www.linkedin.com/in/raka-mulya-b92885196
recheck: 2026-10-12 17:00 UTC, the subscription, elixir and homepage text reread in the rerun crawl. Disproof tried, searched the homepage for any routine or daily wording in both passes and the curl render (none), checked whether the subscription banner explains why (it says only "SUBSCRIBE AND GET 20% OFF"). The page that says it is real and theirs, so the message quotes their own claim back. Facts hold, confidence MEDIUM
```

SKETCH
```
Hi Dan, MUUSH looks cool!

However, your subscription page says Lion's Mane isn't instant and works best taken daily, but your homepage never says so. So a first time buyer likely tries a few cans, feels nothing yet and doesn't come back.

I'd suggest rebuilding the homepage and first order around 28 days of taking it daily, the elixir's already 28 servings, with a starter subscription and emails that carry people to day 28.

At Astra agency we make websites for brands like Unilever, AXA, Pertamina.

Shall I send you a sketch of the 28 day MUUSH homepage?
```

### Kevin Hanson, Panoramix IP, ctc_BAsKeiWpJiTEmbqfz, NO_STRONG_ANGLE

<!-- SUPERSEDES the SKETCH drafted earlier on 2026-10-12, which pitched a cookie banner and an unticked opt in. Raka, 2026-10-12, "scrap these like compliant or gdpr fixes. theyre tiny fixes and someone can do it like for 50 bucks". Every finding below is true and small, so the lead waits (RULES 0E point 6). -->

```sweep
lead: Kevin Hanson, founder, director and 75% or more PSC of PANORAMIX LIMITED 11903869 and of PANORAMIX US LIMITED 17428919 (31 Aug 2026), ctc_BAsKeiWpJiTEmbqfz, campaign W5. Thread pulled 2026-10-12 16:35 UTC, 0 items, control 3 items
website: crawl.py twice on https://panoramixip.co.uk/ , 150 pages each at the cap of 302 sitemap URLs, render-via-curl.js with 0 curl errors. A strong sales site by Emrise Digital, 70 service pages, 66 sector pages, 10 city pages, online UK and US trade mark filing with a basket, live chat, WhatsApp, case studies. Small true flaws only. The LinkedIn post of 2026-10-08 says "Book a free 45-minute IP clinic" and links https://panoramixip.co.uk/services/free-ip-clinics/ , which says "for a fixed fee of £375 plus VAT", a copy fix. The homepage team still shows a director who resigned on 22 Sep 2026, a staffing matter. Nothing worth 2,500 euros
gdpr: tools/eu-view.py from Stockholm on https://www.panoramixip.co.uk/ , _ga and _gcl_au set and ad.doubleclick.net and snap.licdn.com called before a click, no banner (site-audit.js control), marketing box checked='checked' on 146 of 150 pages, while https://panoramixip.co.uk/cookie-policy/ says "We will ask for your consent". True, and a 50 euro fix, scrapped per RULES 0E
apps: online filing basket, Moneypenny chat, WhatsApp and an AI summary after each clinic already run per https://panoramixip.co.uk/services/free-ip-clinics/ , clinics are booked by a form on that page, no tool gap worth 2,500 euros found
social: tools/social-audit.js on the accounts in their HTML, https://uk.linkedin.com/company/panoramixip 618 followers posting every few days (clinic offer 4d, US filing for Bring Me The Horizon 6d), Instagram 63 followers latest 2026-10-08, Facebook 13, active, no gap
squad: an IP law firm of 12 per https://uk.linkedin.com/company/panoramixip , builds no software, not applicable
verdict: NO_STRONG_ANGLE, a strong sales site whose true flaws are all small fixes. Revisit if Panoramix US Limited turns into a US facing push, a site for US companies would be a real project, but today one clue (the new company's name) isn't enough
```

### Alice Poubelle, Baldoria Paris, ctc_PLeDim4Mhp2CtQyiu

```gate
lead: Alice Poubelle, co-founder and Présidente of BALDORIA PARIS SAS, SIREN 941471146, created 2025-02-03, NAF 70.21Z, Paris, with Giulia Restivo as Directrice Générale, per https://recherche-entreprises.api.gouv.fr/search?q=baldoria . The About page says "Fondée par deux amies d'enfance, Alice Poubelle et Giulia Restivo". NOT the unrelated BALDORIA SAS 911625713 (a restaurant, Pierluigi Ceschia). lemlist jobTitle "Co-founder". ctc_PLeDim4Mhp2CtQyiu, leadId lea_7fTn7W9xa8NCGSE2A, campaign W1b cam_7gnHSf6GvvGy8gH3n. Thread pulled 2026-10-12 16:35 UTC, 0 items, nextPage null, control ctc_ch3vFcKAkjQdMKDCg 3 items same minute
site pass 1: 50 URLs, tools/crawl.py on https://www.baldoriaparis.com/ , every page read, 26 project pages
site pass 2: 50 URLs, second full crawl equal to pass 1, site-audit.js desktop and phone screenshots opened, the Projets grid and the Merit x Sephora page rendered in Chromium and looked at
deep analysis: A polished Squarespace portfolio for a two year old Paris event agency with a strong client list, Fendi, Back Market, Leboncoin, Merit x Sephora, Marine Serre x Under Armour, Cupra x Avnier, Jacques Cartier. Every one of the 26 project pages is the same blog post template, a title, a category, a date, "Écrit par Alice Poubelle", one spec line ("soirée de lancement de la marque chez Sephora ⎹ VIP, presse & influence ⎹ 200 pax ⎹ mars 2026") and a gallery, 49 to 69 words with the menu, both passes. No page says what the brief was, what Baldoria came up with, or what the event got the brand, though most are press and influence launches. Checked and dropped, the raw HTML card excerpt "Tout commence ici" isn't shown on the rendered grid, and an English version was set up in Weglot and its project deleted on 17 Apr 2026 with the switcher hidden, a choice, not raised (RULES 0C point 4)
owner linkedin: Route 1 curl https://www.linkedin.com/in/alice-poubelle-398a41128 999. Route 2 news "Alice Poubelle" 69 results, all about the word poubelle, none about her. Route 3 posts, walled. Route 4 company page https://www.linkedin.com/company/baldoriaparis 1127 followers. Route 5 her own words, the About page. Route 6 lemlist record, tagline "Co-founder ⎹ Event agency @Baldoria"
contact linkedin: same person as the owner, the register, the site and lemlist agree
google news: tools/news.py fr 2026-10-12 ~16:40 UTC, "Baldoria" Paris événementiel 0, "Alice Poubelle" 69 unrelated, control Carrefour 100
regional news: tools/news.py Paris agence événementielle OR team building, Paris ZigZag 2026-10-07, Challenges 2025-12-03 "L'agence événementielle Colette transforme l'éphémère", Marie Claire 2026-06-22 on À l'Adresse
industry news: tools/news.py agence événementielle, Les Echos 2025-12-22 on Stardust buying Azefir, Presse Agence 2026-03-04 on We Make Sparks, agencies pitching on brand results
sources:
1. https://www.baldoriaparis.com/
2. https://www.baldoriaparis.com/about
3. https://www.baldoriaparis.com/services
4. https://www.baldoriaparis.com/project
5. https://www.baldoriaparis.com/project/meritxsephora
6. https://www.baldoriaparis.com/project/backmarket
7. https://www.baldoriaparis.com/project/fendi
8. https://www.baldoriaparis.com/sitemap.xml
9. https://recherche-entreprises.api.gouv.fr/search?q=baldoria
10. https://www.linkedin.com/company/baldoriaparis
11. https://www.instagram.com/baldoria.paris/embed/
12. https://cdn.weglot.com/projects-settings/e56c6f51b4d94f004ab7b98b75ebec2f8.json
13. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fwww.baldoriaparis.com%2F (tools/eu-view.py)
14. https://news.google.com/rss (tools/news.py, company, person, region, industry, control)
pains: 5 judged. (1) 26 project pages of photos and one spec line, no brief, idea or result, so a brand's marketing team comparing agencies can't see what Baldoria did for Fendi or Back Market, CHOSEN. (2) French only since the Weglot English was removed, a choice, not raised. (3) no mentions légales page (0 hits, /mentions-legales 404, control /about 200), a legal tidy up, not raised. (4) social, Instagram 2450 followers latest 2026-10-02 and LinkedIn 1127, active, not a gap. (5) Build Squad, not applicable
chosen: (1), biggest, an agency is hired on proof of what its events did, and the pages that hold the best names in her market say the least
worth: €3,500+, the Squarespace site rebuilt around 26 case studies written from the brief, the idea and the coverage, with a brief intake on every case
sweep website: crawl.py twice, 50 URLs, Chromium renders of https://www.baldoriaparis.com/project and https://www.baldoriaparis.com/project/meritxsephora , CHOSEN
sweep gdpr: tools/eu-view.py from Stockholm on https://www.baldoriaparis.com/ , _ga set before a click and no banner, a setting, not chosen
sweep apps: briefs come in by a homepage form and email per https://www.baldoriaparis.com/ , folded into the offer as a brief button
sweep social: tools/social-audit.js on the accounts in their HTML, https://www.instagram.com/baldoria.paris/ 2450 followers 140 posts latest 2026-10-02, https://www.linkedin.com/company/baldoriaparis 1127 followers, active, not chosen
sweep squad: an events agency per https://www.baldoriaparis.com/about , builds no software, not applicable
thread: problem each of the 26 project pages is photos and one line, nothing on the brief or the result | cost a marketing team comparing agencies likely can't see why Baldoria's the safer pick | offer the site rebuilt around the projects as short cases, brief, idea and coverage, with a brief us button on each | link brief, project
lead read: Alice reads that her 26 project pages show Fendi and Back Market but only photos and one line, nothing on the brief or what the event got the brand, so a marketing team comparing agencies likely can't see why she's the safer pick, and gets offered each project as a short case with the brief and coverage, one thread
claims:
your website shows Fendi and Back Market, https://www.baldoriaparis.com/project rendered in Chromium 2026-10-12 ~16:48 UTC, cards "Fendi" and "Back Market"
each of your 26 project pages is photos and one line, https://www.baldoriaparis.com/sitemap.xml lists 26 /project/ pages, both crawls read all 26 at 49 to 69 words with the menu, and https://www.baldoriaparis.com/project/meritxsephora rendered shows the title, "soirée de lancement de la marque chez Sephora ⎹ VIP, presse & influence ⎹ 200 pax ⎹ mars 2026" and ten photos
nothing on the brief or the result, the same 26 pages, no text beyond the spec line and "Voir en taille réelle" under each photo, https://www.baldoriaparis.com/project/backmarket and https://www.baldoriaparis.com/project/fendi read in full
INFERENCE, a marketing team comparing agencies likely can't see why you're the safer pick, rests on the 26 pages listed in https://www.baldoriaparis.com/sitemap.xml , worded likely
websites credential, docs/astra-company-profile.md line 95, Raka's fixed brand line, https://www.linkedin.com/in/raka-mulya-b92885196
recheck: 2026-10-12 ~16:50 UTC, the Projets grid and the Sephora page rendered and looked at, all 26 project pages measured in both crawls. Disproof tried, rendered the grid to check the raw "Tout commence ici" excerpt (not shown, dropped), searched the site for a case study, press or results page (the sitemap has none, only /project, /about, /services, /contact), and checked the English version (configured in Weglot, deleted 17 Apr 2026, a choice, not raised). Facts hold, confidence MEDIUM
```

SKETCH
```
Hi Alice, Baldoria looks cool!

However, your website shows Fendi and Back Market, but each of your 26 project pages is photos and one line, nothing on the brief or the result. So a marketing team comparing agencies likely can't see why you're the safer pick.

I'd suggest rebuilding the site around your projects as short cases, the brief, the idea and the press and posts each one got, with a brief us button on every case.

At Astra agency we make websites for brands like Unilever, AXA, Pertamina.

Shall I send you a sketch of the Back Market project as a case study?
```

### Andres Jara, Favamole (lemlist has De Stadsgroenteboer), ctc_bWcfiNE764D4PfGJt

```gate
lead: Andres Jara, founder of Favamole and one of the five original owners of VOF De Stadsgroenteboer (KVK 72949996 in the farm site footer). The farm's /farmers page says "We were five, Andres, Laura, Lisa, Julia, and Milo" took over in December 2018, and "While the original owners remain connected to the farm, not all are involved in the day-to-day operations anymore", and Andres isn't in the current core team it lists. His tagline leads "Founder of Favamole | Regenerative Food Innovator and Farmer ... | Co-manager at De Stadsgroenteboer", the lemlist linkedinUrl slug is andres-jara-favamole, favamole.nl's contact is andres@favamole.nl and its LinkedIn icon links his profile, and the Amsterdam Impact interview of 23 Apr 2026 names him as Favamole's founder. So the business he runs is Favamole, the message is about Favamole, flagged to Raka. ctc_bWcfiNE764D4PfGJt, leadId lea_3Coz6cwEbjMosh72Y, campaign W1b cam_7gnHSf6GvvGy8gH3n, jobTitle "Co-Founder". Thread pulled 2026-10-12 16:35 UTC, 0 items, nextPage null, control ctc_ch3vFcKAkjQdMKDCg 3 items same minute. NOT in the message, the interview's fire at their old building, RULES 0C point 6
site pass 1: 4 URLs, tools/crawl.py on https://www.favamole.nl/ , the whole site, home and contact (sitemap lists 2), plus 150 URLs of https://www.stadsgroenteboer.nl/ for the farm
site pass 2: 4 URLs, second full crawl equal to pass 1, site-audit.js desktop and phone screenshots opened, full page render looked at
deep analysis: Favamole is a fava bean dip from Dutch regenerative farms, in 150g retail cups, 275g and 525g foodservice units and a 5kg bag in box. The site is one page and a contact page on Squarespace, written for trade buyers ("Ideal for impact-driven menus, net-zero procurement & category stand-out", "CSRD-proof") and ending in a form "Get in touch, and we'll provide you with information about Favamole distribution". Where the company is heading, two agreeing clues, the founder told Amsterdam Impact on 23 Apr 2026 "pas dertien maanden op de B2B markt" and "We praten met verschillende supermarktketens en over een half jaar ligt ons product in de schappen", and the site already lists a 150g retail cup. SUPPORTED, Favamole is heading for supermarket shelves around now. Nothing on the site is for a shopper, no where to buy, no stockist, no shop (0 hits in both passes, controls "distribution" and "Retail cups" found). No stockist could be confirmed by search, so the message doesn't say it's on shelves yet
owner linkedin: Route 1 curl https://www.linkedin.com/in/andres-jara-favamole 999 and social-audit.js on https://www.linkedin.com/in/andres-jara-2172a675/ UNKNOWN. Route 2 news "Andres Jara" OR Favamole, Noordhollands Dagblad 2026-06-11 "Bij Favamole maken ze dips van bijzondere boontjes", HetkanWEL 2025-08-04, Food Inspiration 2025-03-18. Route 3 posts, walled. Route 4 company page, none linked. Route 5 his own words, the Amsterdam Impact interview. Route 6 lemlist record
contact linkedin: same person as the owner, the interview, favamole.nl and lemlist's slug agree
google news: tools/news.py nl 2026-10-12 ~17:05 UTC, "Favamole" 9 results, Noordhollands Dagblad 2026-06-11, Food Inspiration 2025-03-18 "10 innovatieve foodstart-ups uit Amsterdam", "Stadsgroenteboer" 10 results, Het Parool 2026-08-25, control Heineken 100
regional news: tools/news.py Amsterdam plantaardige spread OR hummus supermarkt, Levensmiddelenkrant 2026-09-30 "Mediterrane keuken groeit uit tot vaste waarde in supermarktschap", NRC 2025-12-04 on hummus from Zaandam winning the supermarket shelf
industry news: tools/news.py plantaardige spread OR hummus supermarkt, Foodies 2026-07-03 supermarket hummus test, Nieuwsblad 2026-05-29 chef tests 13 hummus
sources:
1. https://www.favamole.nl/
2. https://www.favamole.nl/contact
3. https://www.favamole.nl/sitemap.xml
4. https://www.iamsterdam.com/bedrijven-in-amsterdam/amsterdam-impact/foundersfridays-in-gesprek-met-andres-jara
5. https://www.instagram.com/favamole.nl/embed/
6. https://www.stadsgroenteboer.nl/
7. https://www.stadsgroenteboer.nl/farmers
8. https://www.stadsgroenteboer.nl/csa-en
9. https://members.stadsgroenteboer.nl/new
10. https://www.vitafoodsinsights.com/sustainability/cool-beans-why-brown-is-the-new-green-for-guacamole (opened, 27 Oct 2025, "Favamole founder Andres Jara", one tonne batches, a production partnership with a European guacamole maker, no retailer named)
11. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fwww.stadsgroenteboer.nl%2F (tools/eu-view.py)
12. https://news.google.com/rss (tools/news.py, company, person, region, industry, control)
pains: 5 judged. (1) a one page trade site while the brand heads for supermarket shelves, so shoppers who look it up find a distribution form, CHOSEN. (2) the "net-zero procurement" and "CSRD-proof" claims carry no figure for a buyer, folded into the trade side of the offer. (3) Instagram 1336 followers, last post 2026-08-19, quiet, runner up. (4) De Stadsgroenteboer's homepage still says "WE STILL HAVE A FEW CSA SHARES AVAILABLE!" in October, but he isn't in its daily team, not raised. (5) Build Squad, not applicable
chosen: (1), hottest, it lands on the move he's making now, the shelf launch, and every shopper who tries the cup and searches the name meets a page that isn't for them
worth: €3,000+, a consumer launch site for the retail rollout, product pages, recipes and a store finder, beside a trade page with spec sheets for buyers
sweep website: crawl.py twice, 4 URLs, site-audit.js and a full page render of https://www.favamole.nl/ , CHOSEN
sweep gdpr: site-audit.js on https://www.favamole.nl/ , a Squarespace banner, 1 cookie before a click, no third party trackers, nothing to say
sweep apps: B2B enquiries by a form per https://www.favamole.nl/contact , a trade enquiry and sample flow, folded into the offer
sweep social: tools/social-audit.js on the accounts in their HTML, https://www.instagram.com/favamole.nl/ 1336 followers 33 posts latest 2026-08-19, his personal LinkedIn UNKNOWN, runner up
sweep squad: a food brand per https://www.favamole.nl/ , builds no software, not applicable
thread: problem the one page site ends in a distribution form for trade buyers while Favamole heads for supermarket shelves | cost a shopper who spots a cup and looks it up won't find where to buy it | offer a launch site for shoppers with recipes and where to buy it, the trade side kept for buyers | link shopper, buy
lead read: Andres reads that his one page site ends in a distribution form for trade buyers while Favamole heads for supermarket shelves, so a shopper who spots a cup and looks it up won't find where to buy it, and gets offered a shopper side with where to buy it, one thread
claims:
your website is one page that ends in a distribution form for trade buyers, https://www.favamole.nl/sitemap.xml lists only /home and /contact, and https://www.favamole.nl/ ends "Interested? Get in touch, and we'll provide you with information about Favamole distribution", rendered and screenshotted 2026-10-12 ~17:02 UTC
while Favamole is heading for supermarket shelves, https://www.iamsterdam.com/bedrijven-in-amsterdam/amsterdam-impact/foundersfridays-in-gesprek-met-andres-jara 23 Apr 2026 "over een half jaar ligt ons product in de schappen", and https://www.favamole.nl/ "Available in 150g Retail cups", two clues, never named in the message
won't find where to buy it, https://www.favamole.nl/ and https://www.favamole.nl/contact , no where to buy, stockist, winkel, verkrijgbaar, shop or supermarket wording in either crawl pass, control the same text finds "distribution" and "Retail cups"
websites credential, docs/astra-company-profile.md line 95, Raka's fixed brand line, https://www.linkedin.com/in/raka-mulya-b92885196
recheck: 2026-10-12 ~17:05 UTC, both pages reread in two crawls and a render. Disproof tried, searched both pages for any shopper wording (none), checked for a second site on favamole.com (it returns 114 bytes, a redirect stub), and searched for a confirmed supermarket listing (none found, so the message says heading for, not on). Facts hold, confidence MEDIUM
```

SKETCH
```
Hi Andres, Favamole looks cool!

However, your website is one page that ends in a distribution form for trade buyers, while Favamole is heading for supermarket shelves. So a shopper who spots a cup and looks you up won't find where to buy it.

I'd suggest a launch site for shoppers, what Favamole is, recipes and where to buy it, with the trade side kept for buyers.

At Astra agency we make websites for brands like Unilever, AXA, Pertamina.

Shall I send you a sketch of the Favamole site for shoppers?
```

### Chris Hale, The Garnish Collective, ctc_do7oK8f27qGMC89dA

<!-- SUPERSEDES the weddings reviews SKETCH drafted earlier on 2026-10-12. Its offer ended "the enquiry form tidied up", and a weddings page with reviews alone sits near the small fix line (RULES 0E). The corporate ordering angle is the bigger project and the one his own LinkedIn is pushing this month. -->

```gate
lead: Christopher Colin Hale, sole director and 75% or more PSC of THE GARNISH COLLECTIVE LTD 16179771, incorporated 13 Jan 2025, Wakefield, per https://find-and-update.company-information.service.gov.uk/company/16179771/persons-with-significant-control . The site calls him "founder and head chef of The Garnish Collective". lemlist jobTitle "Founder". ctc_do7oK8f27qGMC89dA, leadId lea_Xs3sJQ5opBw3mFQqr, campaign W1b cam_7gnHSf6GvvGy8gH3n. Thread pulled 2026-10-12 16:35 UTC, 0 items, nextPage null, control ctc_ch3vFcKAkjQdMKDCg 3 items same minute. NOT in the message, his tagline "Proprietor at Hodroyd Hall" while the venue's Bridebook page names Stephen Aviss as wedding contact and calls it "My family and I are lucky enough to call Hodroyd Hall home", unresolved (RULES 0C point 1). NOT in the message, "MasterChef finalist" and "former MasterChef UK quarter-finalist" on the same homepage
site pass 1: 9 URLs, tools/crawl.py on https://www.garnishcollective.com/ , every page rendered and read in Chromium (Wix)
site pass 2: 9 URLs, second full crawl equal to pass 1, site-audit.js screenshots, full page renders of the homepage and weddings page looked at, the Bar Hire and Enquire dropdowns listed live, the corporate page's raw HTML links read
deep analysis: A Yorkshire caterer with three lines, weddings ("more than 500 weddings" on LinkedIn, "hundreds of weddings" on the site), corporate (clients Meta, Evri and the BBC on LinkedIn, an Evri testimonial "our 'go to' ... hot and cold buffet options" for over 3 years) and celebrations. Where he's heading, three agreeing clues, his last three LinkedIn posts (3d sliders, 5d pork belly, 1w a paella summer social) all sell corporate catering and end "Planning your next corporate event?", the company tagline leads "Corporate Catering", and the Evri testimonial is a repeat corporate client. SUPPORTED, corporate is the push. The corporate page sells Bags and Boxes ("chef-designed lunch boxes ... Best Suited For Meetings, Workshops, Strategy Days"), Buffets, Edible Displays, a Tailored Event Service and Bar Hire, and all six "Enquire Now" buttons go to https://www.garnishcollective.com/enquire , one form (event type, guests, a "Preferred Date" of Aprl - Jun, July - Sep, Oct - Dec, 2027+) that ends "we will be back in touch within 24 hours". No menu to order from, no online order, no reorder. The weddings reviews gap (one testimonial across nine pages, corporate, no couple's) is the runner up
owner linkedin: Route 1 curl https://www.linkedin.com/in/chris-hale-0a467a26 999. Route 2 news "Chris Hale" chef, Wakefield Express 2022-09-23 "MasterChef quarter finalist Chris Hale", We Are Barnsley 2026-08-19 charity ball. Route 3 the company page posts, rendered in Chromium, three corporate posts in the last week. Route 4 company page https://www.linkedin.com/company/thegarnishcollective 160 followers, "View all 4 employees". Route 5 his own words on the site. Route 6 lemlist record
contact linkedin: same person as the owner, Companies House, the site and lemlist agree
google news: tools/news.py en 2026-10-12 ~16:40 UTC, "Garnish Collective" 0, "Chris Hale" chef 2 results (We Are Barnsley 2026-08-19, Yorkshire Evening Post 2026-07-25), control Tesco 100
regional news: tools/news.py Yorkshire private chef OR event catering, 20 results, Your Harrogate 2026-06-12, Wakefield Express 2022-09-23 on his food festival
industry news: tools/news.py private chef OR event catering, Food and Wine 2026-10-11, The Times 2026-10-02, catering sold to companies
sources:
1. https://www.garnishcollective.com/
2. https://www.garnishcollective.com/corporate
3. https://www.garnishcollective.com/enquire
4. https://www.garnishcollective.com/about-1
5. https://www.garnishcollective.com/weddings
6. https://www.garnishcollective.com/barhire
7. https://find-and-update.company-information.service.gov.uk/company/16179771/persons-with-significant-control
8. https://www.linkedin.com/company/thegarnishcollective (rendered, posts 3d, 5d and 1w, 160 followers)
9. https://bridebook.com/uk/wedding-venues/hodroyd-hall-south-hiendley-west-yorkshire-cs5gPMvmNY (opened, Stephen Aviss as contact, no caterer named)
10. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fwww.garnishcollective.com%2F (tools/eu-view.py)
11. https://news.google.com/rss (tools/news.py, company, person, region, industry, control)
pains: 6 judged. (1) corporate catering, the line his LinkedIn is pushing, can only be bought through an enquiry form and a reply within 24 hours, even a lunch box for a meeting, CHOSEN. (2) "hundreds of weddings" with no couple's review on the site and no Instagram linked, runner up, a rebuild sized project too. (3) the Bar Hire date dropdown reads Choice 1 to 4, a 50 euro fix, folded in as nothing. (4) "finalist" and "quarter-finalist" on one page, a copy fix. (5) no privacy notice, a compliance fix, never the angle (RULES 0E). (6) Build Squad, not applicable
chosen: (1), biggest, it sits on the line he's selling hardest right now, it repeats (Evri has ordered for three years), and every order waits on a form and an email back
worth: €4,000+, an ordering site for corporate catering, set menus for boxes and buffets, online payment and invoices, saved orders so a regular reorders in one tap
sweep website: crawl.py twice, 9 URLs, the six "Enquire Now" hrefs on https://www.garnishcollective.com/corporate all point to https://www.garnishcollective.com/enquire , CHOSEN as an ordering site
sweep gdpr: tools/eu-view.py from Stockholm on https://www.garnishcollective.com/ , 6 first party Wix cookies, no third party tracking, nothing to say
sweep apps: corporate orders and repeat orders by enquiry form per https://www.garnishcollective.com/enquire , folded into the ordering site
sweep social: tools/social-audit.js, the site links no social account, https://www.linkedin.com/company/thegarnishcollective 160 followers posting corporate food weekly, active, it's the source of the direction, not the gap
sweep squad: a catering company per https://www.garnishcollective.com/about-1 , builds no software, not applicable
thread: problem every corporate option, even a lunch box for a meeting, goes through one enquiry form and a reply within 24 hours | cost an office manager who needs lunch this week likely orders from a caterer they can book in a minute | offer a corporate ordering site with set menus, online payment and one tap reorders | link corporate, order
lead read: Chris reads that everything on his corporate page, even a lunch box for a meeting, goes through one enquiry form and a reply within 24 hours, so an office manager who needs lunch this week likely orders elsewhere, and gets offered a corporate ordering site with set menus and one tap reorders, one thread
claims:
your corporate page sells lunch boxes for meetings and buffets for conferences, https://www.garnishcollective.com/corporate "Bags & Boxes Freshly prepared, chef-designed lunch boxes ... Best Suited For : - Meetings - Workshops - Strategy Days" and "Buffets ... Best Suited For : - Conferences - Gala Dinners - Client Entertainment", rendered 2026-10-12 ~16:52 UTC and raw HTML 17:50 UTC
every option leads to the same enquiry form, https://www.garnishcollective.com/corporate raw HTML, six "Enquire Now" links, all href https://www.garnishcollective.com/enquire , no order, menu or price link on the page (0 hits for order online, order now, per head, £)
and a reply within 24 hours, https://www.garnishcollective.com/enquire "To make a enquiry, please fill out the form below and we will be back in touch within 24 hours"
INFERENCE, an office manager who needs lunch for Thursday likely orders from a caterer they can book in a minute, rests on https://www.garnishcollective.com/corporate and https://www.garnishcollective.com/enquire , worded likely
regulars like Evri, https://www.garnishcollective.com/about-1 "We've worked with The Garnish Collective for over 3 years. They are our 'go to' when it comes to event catering ... Stacey Dockerty, Evri - Marketing & Events Manager"
websites credential, docs/astra-company-profile.md line 95, Raka's fixed brand line, https://www.linkedin.com/in/raka-mulya-b92885196
recheck: 2026-10-12 ~17:50 UTC, the corporate page's raw HTML and the enquire page reread, the company page posts rendered. Disproof tried, looked for any menu, order or price route on all nine pages (none), for a linked ordering platform in the HTML (none), and checked whether corporate was an old push (the three posts are 3d, 5d and 1w old). Risk named, if he prices every corporate job by hand on purpose (RULES 0D point 2), set menus would only cover the boxes and buffets, so the message offers set menus, it doesn't call missing prices a gap. Facts hold, confidence MEDIUM
```

SKETCH
```
Hi Chris, The Garnish Collective looks cool!

However, your corporate page sells lunch boxes for meetings and buffets for conferences, but every option leads to the same enquiry form and a reply within 24 hours. So an office manager who needs lunch for Thursday likely orders from a caterer they can book in a minute.

I'd suggest a corporate ordering site, set menus for boxes and buffets, order and pay online, and one tap reorders for regulars like Evri.

At Astra agency we make websites for brands like Unilever, AXA, Pertamina.

Shall I send you a sketch of the Garnish corporate ordering site?
```

### David Weyn, Major Domo, ctc_vm6BXBrFDAir6Rb3F

<!-- SUPERSEDES the homepage reviews SKETCH drafted earlier on 2026-10-12, whose fix was moving six reviews from the About page to the homepage, a ten minute Squarespace edit (RULES 0E). Raka directed website for David. No website problem worth 2,500 euros was found, the one that is sits in how he staffs urgent jobs, so this is an apps angle, flagged to Raka. -->

```gate
lead: David Alexandre Albert Weyn, founder and Président of MAJOR DOMO SAS, SIREN 944122472, created 2025-04-29, NAF 82.99Z, Nice, per https://recherche-entreprises.api.gouv.fr/search?q=major%20domo , and the site's legal notice "Propriétaire du site, David Weyn, SAS ... 944 122 472 RCS Nice". lemlist jobTitle "Founder". The LinkedIn company page lists one employee, David Weyn. ctc_vm6BXBrFDAir6Rb3F, leadId lea_XXvYSema92aLMxqFL, campaign W1b cam_7gnHSf6GvvGy8gH3n. Thread pulled 2026-10-12 16:35 UTC, 0 items, nextPage null, control ctc_ch3vFcKAkjQdMKDCg 3 items same minute
site pass 1: 60 URLs, tools/crawl.py on https://www.majordomo.vip/ , every page read, English and French versions
site pass 2: 60 URLs, second full crawl equal to pass 1, site-audit.js desktop and phone screenshots opened, 11 key pages rendered in Chromium and read
deep analysis: Villa and apartment care from Monaco to Cannes, founded 2025 by a man with three decades in luxury hospitality and superyachts. What he sells runs on other people, the site offers "Private chef services, butler services, and housekeeping", "Villa & Yacht Placement, We source, vet, and place experienced professionals including stewards/stewardesses, butlers, chefs, and seasonal support staff", pool, garden and repair work, and the company page lists him as its one employee. How he staffs it, in his own posts, the company page post of about two months ago "Last minute request in Eze, guests seeking chef (able to invoice) for the next 3 days ... PM me with $$ prices for more informations please, urgent 😅", and nine months ago a 30m motor yacht chef job "via LinkedIn message or email". So an urgent guest request turns into a public post and a run of private messages, filled by him by hand. The earlier homepage angle (literary quotes on the homepage, six reviews on the About page) is true and a ten minute fix, dropped
owner linkedin: Route 1 curl https://www.linkedin.com/in/david-weyn-48b41156 999. Route 2 news "David Weyn" 0. Route 3 the company page posts, rendered in Chromium and read again by WebFetch, the same four posts (2mo chef in Eze, 9mo yacht chef, 9mo winter care, 9mo "The 'Ghost Villa' Trap"). Route 4 company page https://www.linkedin.com/company/majordomo-vip 656 followers, 1 employee. Route 5 his own words, the homepage letter and the Ghost Villa post. Route 6 lemlist record
contact linkedin: same person as the owner, the register, the legal notice and lemlist agree
google news: tools/news.py fr 2026-10-12 ~16:40 UTC, "MajorDomo" Nice OR "Major Domo" villa 0, "David Weyn" 0, control Carrefour 100
regional news: tools/news.py Côte d'Azur conciergerie villa OR gestion locative luxe, 32 results, Presse Agence 2026-08-10 "Une nouvelle conciergerie de luxe à Bandol", MySweetImmo 2026-06-28 on Engel and Völkers entering prestige rentals on the Riviera, more competition for owners
industry news: tools/news.py conciergerie villa OR gestion locative luxe, Capital 2026-09-23 on a prestige concierge in the Lot, Le Figaro 2026-07-02
sources:
1. https://www.majordomo.vip/
2. https://www.majordomo.vip/about-us
3. https://www.majordomo.vip/services/concierge-services
4. https://www.majordomo.vip/services/staff-training
5. https://www.majordomo.vip/services/property-management
6. https://www.majordomo.vip/legal-notices
7. https://recherche-entreprises.api.gouv.fr/search?q=major%20domo
8. https://www.linkedin.com/company/majordomo-vip (rendered and WebFetch, four posts, 1 employee)
9. https://www.pinterest.com/MajorDomoVIP
10. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fwww.majordomo.vip%2F (tools/eu-view.py)
11. https://news.google.com/rss (tools/news.py, company, person, region, industry, control)
pains: 6 judged. (1) urgent staffing for guests and yachts runs on public posts and private messages, filled by the founder by hand, CHOSEN. (2) the homepage carries literary quotes while six reviews sit on the About page, true, a ten minute fix, dropped per RULES 0E. (3) the journal and its newsletter stopped at 5/10/25, a content job, runner up. (4) "award winning" with no award named, a copy question, not raised. (5) the Instagram link reads as missing or private, UNKNOWN, kept out. (6) Build Squad, not applicable
chosen: (1), costliest, every last minute chef, crew or trade job lands on one man, and in season the requests he can't fill in time are the guests he lets down
worth: €5,000+, a private roster and dispatch app for vetted chefs, crew and trades, one request out by WhatsApp or SMS to everyone free that day, first yes takes the job, rates and invoices kept with it
sweep website: crawl.py twice, 60 URLs, renders of https://www.majordomo.vip/ and https://www.majordomo.vip/about-us , a polished site whose true flaws are small (reviews placement, a stale journal), not chosen
sweep gdpr: tools/eu-view.py from Stockholm on https://www.majordomo.vip/ , _fbp and _ga set before a click though a banner with Decline exists, a small fix, never the angle (RULES 0E)
sweep apps: chef, crew and trades sourced by public post and messages per https://www.linkedin.com/company/majordomo-vip , CHOSEN as a roster and dispatch app
sweep social: tools/social-audit.js on the accounts in their HTML, https://www.linkedin.com/company/majordomo-vip 656 followers, Pinterest 3 followers, Instagram MajorDomoVIP UNKNOWN (embed broken), not chosen
sweep squad: a property care company per https://www.majordomo.vip/about-us , builds no software, not applicable
thread: problem a last minute chef request for guests in Eze went out as a public post asking chefs to message their prices | cost every urgent job likely lands on him to fill by hand, one message at a time | offer a private roster app where one request reaches the vetted chefs and crew free that day | link request, chef
lead read: David reads that his last minute chef request for guests in Eze went out as a public post asking chefs to message their prices, so every urgent job likely lands on him to fill one message at a time, and gets offered a private roster app where one request reaches his vetted chefs free that day, one thread
claims:
your last minute request for a chef in Eze went out as a public LinkedIn post, https://www.linkedin.com/company/majordomo-vip post stamped 2mo, "Last minute request in Eze, guests seeking chef (able to invoice) for the next 3 days, starting Tuesday", rendered in Chromium 2026-10-12 ~17:40 UTC and read again by WebFetch the same session
asking chefs to message you their prices, the same post on https://www.linkedin.com/company/majordomo-vip "PM me with $$ prices for more informations please, urgent 😅"
INFERENCE, every urgent job likely lands on you to fill by hand, one message at a time, rests on the post above and the one employee listed on https://www.linkedin.com/company/majordomo-vip , worded likely, how he fills other jobs is unknown
your chefs, crew and trades, https://www.majordomo.vip/services/staff-training "We source, vet, and place experienced professionals including stewards/stewardesses, butlers, chefs, and seasonal support staff" and https://www.majordomo.vip/services/property-management "Pool and Garden Maintenance", "Preventive Maintenance and On-demand Repairs"
vetted, https://www.majordomo.vip/services/staff-training "We source, vet, and place"
apps credential, Raka's fixed line "We build [xyz] for brands like Unilever, AXA, Pertamina", docs/astra-company-profile.md line 95, and the Unilever app work at line 82, https://www.linkedin.com/in/raka-mulya-b92885196
recheck: 2026-10-12 ~17:45 UTC, the company page read two ways and the staffing and property pages reread. Disproof tried, looked for any booking, roster or partner portal on the site (none in 60 pages), checked the post is the company's own (company page, signed by the page), and kept "while you run it alone" out of the message because the page also says 2 to 10 employees. Facts hold, confidence MEDIUM
```

SKETCH
```
Hi David, Major Domo looks cool!

However, your last minute request for a chef in Eze went out as a public LinkedIn post, asking chefs to message you their prices. So every urgent job likely lands on you to fill by hand, one message at a time.

I'd suggest a private roster app for your chefs, crew and trades, where one request reaches the vetted people free that day and the first yes takes the job.

At Astra agency we build apps and tools for brands like Unilever, AXA, Pertamina.

Shall I send you a sketch of the Major Domo staff roster app?
```
