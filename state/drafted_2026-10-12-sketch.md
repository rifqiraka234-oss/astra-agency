<!-- SKETCH test batch, Raka 2026-10-12, "hi, so this looks cool. However, your website is this. I suggest to do this. We make websites for blah blah. Shall I send you a sketch of how it looks like?". Angles directed by Raka, Alex social media, Dan website, Kevin website, Alice website, Andres website or social, Chris website, David website. NOTHING SENT. Re pull each thread with a control and reopen every claim in the minute before any send (RULES 0D point 4). Evidence in /tmp/claude-0/agents/b17/ (crawls, audits, screenshots), research copied into each gate. -->
# SKETCH drafts, 2026-10-12

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
sweep website: crawl.py twice, 5 URLs, site-audit.js screenshots of https://www.musicsocial.co.uk/ , a working ticket site, the wedding sub page is thin, not chosen
sweep gdpr: tools/eu-view.py from Stockholm on https://www.musicsocial.co.uk/ , Google Analytics and Tag Manager requests with no banner, a setting, not chosen
sweep apps: tickets and bookings by Wix and a form per https://www.musicsocial.co.uk/book , nothing bigger than the social gap, not chosen
sweep social: tools/social-audit.js on the accounts in their HTML, https://www.instagram.com/musicsocialofficial 13716 followers 176 posts latest 2026-10-11, https://www.linkedin.com/company/music-social 73 followers and newest post 10mo, CHOSEN, the B2B channel
sweep squad: a two person events company per https://www.linkedin.com/company/music-social , builds no software, not applicable
thread: problem the LinkedIn page that should sell team building and Christmas parties has 73 followers and no post in ten months | cost the office managers who book those likely don't see Music Social as Christmas season starts | offer a weekly LinkedIn presence aimed at office managers with the Christmas offer pinned | link LinkedIn, Christmas
lead read: Alex reads that the LinkedIn page meant to sell his team building and Christmas parties has 73 followers and hasn't posted in ten months, so office managers likely don't see him as Christmas season comes, and gets offered a weekly LinkedIn presence with the Christmas offer pinned, one thread
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

I'd suggest a weekly LinkedIn post for office managers and HR, built from what you already post on Instagram, with the Christmas offer pinned at the top.

At Astra agency we do social media management for brands like Unilever, AXA, Pertamina.

Shall I send you a sketch of a month of Music Social on LinkedIn?
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
sweep website: crawl.py twice, 67 URLs, render-via-curl.js on https://muush.co/ with 0 curl errors, the homepage vs the subscription and elixir pages, CHOSEN
sweep gdpr: tools/eu-view.py from Stockholm with --shopify on https://muush.co/ , Shopify's banner set for every EU country and GB, 3 essential cookies before a click, nothing to say
sweep apps: subscriptions, Klaviyo and a scratch card already run per https://muush.co/pages/subscription , the gap is the message, not a tool, folded in
sweep social: tools/social-audit.js on the accounts in their HTML, https://www.instagram.com/drinkmuush/ 7372 followers 283 posts latest 2026-10-08, Facebook 180, YouTube 63 subscribers 3 videos, Instagram active, not chosen
sweep squad: a drinks brand per https://muush.co/pages/muush-story , builds no software, not applicable
thread: problem the homepage never says Lion's Mane works with daily use over weeks though their subscription page does | cost first time buyers likely try a few cans, feel nothing yet and don't come back | offer a homepage built around taking it daily for 28 days, the elixir as the routine, subscription first | link homepage, daily
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

I'd suggest a homepage built around taking it daily for 28 days, the elixir's already 28 servings, with the subscription as the first step.

At Astra agency we make websites for brands like Unilever, AXA, Pertamina.

Shall I send you a sketch of the 28 day MUUSH homepage?
```

### Kevin Hanson, Panoramix IP, ctc_BAsKeiWpJiTEmbqfz

```gate
lead: Kevin Hanson, founder, director and 75% or more PSC of PANORAMIX LIMITED 11903869 (incorporated 25 Mar 2019) per https://find-and-update.company-information.service.gov.uk/company/11903869/persons-with-significant-control , also sole director and PSC of PANORAMIX US LIMITED 17428919 (incorporated 31 Aug 2026). lemlist jobTitle "Founder & IP Lawyer - Panoramix Limited (Lincoln)". The site lists him as Managing Director. ctc_BAsKeiWpJiTEmbqfz, leadId lea_JzMNhHBbAnb76ADnm, campaign W5 cam_BRBXAzzDKMfC4fSCS (law and accounting firms, GDPR). Thread pulled 2026-10-12 16:35 UTC, 0 items, nextPage null, control ctc_ch3vFcKAkjQdMKDCg 3 items same minute. NOT in the message, Companies House shows Katherine McCormick resigned as director on 22 Sep 2026 while the homepage team still shows her as "Director & Chartered Trade Mark Attorney", a staffing matter he hasn't spoken about, RULES 0C point 6
site pass 1: PIX_PASS1 URLs, tools/crawl.py on https://www.panoramixip.co.uk/
site pass 2: PIX_PASS2 URLs, second full crawl, plus the 173 internal links of the raw homepage and 19 sitemaps listed, render-via-curl.js on the homepage (55 requests by curl, 0 curl errors, all six parts looked at)
deep analysis: A strong, modern WordPress site by Emrise Digital, built for search and for sale. 70 service pages, 66 sector pages, 10 city pages, case studies, a knowledge hub, online UK and US trade mark filing with a basket, Moneypenny live chat, WhatsApp, a free IP clinic offer and a real team grid. The sales side doesn't need us. What's wrong is consent. With nothing clicked, the EU view from Stockholm sets _ga and _gcl_au and calls ad.doubleclick.net, stats.g.doubleclick.net and snap.licdn.com, the US view sees the same, the HTML holds no consent code of any kind so a UK visitor gets the same, and no cookie banner exists (site-audit.js absence with a working control, and none in the six render parts). The homepage "Get In Touch" form's marketing box ("I agree to receive other communications from Panoramix Limited.") is checked='checked' in the raw HTML. For an SRA regulated firm in a GDPR campaign, that's the angle
owner linkedin: Route 1 curl https://www.linkedin.com/in/kevinahanson 999. Route 2 news "Kevin Hanson" patent 0. Route 3 posts, walled. Route 4 company page https://uk.linkedin.com/company/panoramixip 618 followers "Global intellectual property protection. One partner. Zero complexity". Route 5 his own words, the homepage quote signed "Kevin Hanson, Managing Director". Route 6 lemlist record
contact linkedin: same person as the owner, Companies House, the site and lemlist agree
google news: tools/news.py en 2026-10-12 ~16:40 UTC, "Panoramix IP" OR "Panoramix Limited" 0, "Kevin Hanson" patent 0, control Tesco 100
regional news: tools/news.py Lincolnshire patent and trade mark attorneys, 14 results, none about them
industry news: tools/news.py patent attorney OR IP firm, JUVE Patent 2026-10-08 "HGF continues PE-backed expansion in France", National Law Review 2026-09-24 on a USPTO discipline case
sources:
1. https://panoramixip.co.uk/
2. https://panoramixip.co.uk/contact-us/
3. https://panoramixip.co.uk/privacy-policy/
4. https://panoramixip.co.uk/cookie-policy/
5. https://panoramixip.co.uk/meet-the-team/
6. https://panoramixip.co.uk/services/ip-clinics/
7. https://panoramixip.co.uk/sitemap_index.xml
8. https://find-and-update.company-information.service.gov.uk/company/11903869/persons-with-significant-control
9. https://find-and-update.company-information.service.gov.uk/company/17428919/officers
10. https://uk.linkedin.com/company/panoramixip
11. https://www.instagram.com/panoramixip/embed/
12. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fwww.panoramixip.co.uk%2F (tools/eu-view.py)
13. https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guide-to-pecr/cookies-and-similar-technologies/
14. https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/lawful-basis/consent/what-is-valid-consent/
15. https://news.google.com/rss (tools/news.py, company, person, region, industry, control)
pains: 5 judged. (1) Google Ads and LinkedIn tracking before any consent with no cookie banner, and a pre ticked marketing box on the enquiry form, CHOSEN, it's the one real flaw and it sits in the GDPR campaign he was picked for. (2) homepage team grid shows a director who resigned on 22 Sep 2026, a staffing matter, never raised. (3) website sales side, strong, not a gap (RULES, don't manufacture pain). (4) social, LinkedIn 618 and Instagram active (63 followers, latest 2026-10-08), not chosen. (5) Build Squad, not applicable
chosen: (1), biggest, the leads that pre ticked box signs up are likely ones he can't lawfully email, and it's his own consent flow on a law firm's site
sweep website: crawl.py twice and render-via-curl.js on https://panoramixip.co.uk/ , a strong sales site, the consent flow on it is CHOSEN
sweep gdpr: tools/eu-view.py from Stockholm on https://www.panoramixip.co.uk/ , _ga, _gcl_au, Moneypenny cookies and ad.doubleclick.net, snap.licdn.com requests before a click, no banner (site-audit.js control), checked='checked' on the marketing box in the raw HTML, CHOSEN
sweep apps: online filing basket, chat and WhatsApp already run per https://panoramixip.co.uk/product/uk-trade-mark-filing/ , not chosen
sweep social: tools/social-audit.js on the accounts in their HTML, https://uk.linkedin.com/company/panoramixip 618 followers, https://www.instagram.com/panoramixip/ 63 followers latest 2026-10-08, Facebook 13, not chosen
sweep squad: an IP law firm per https://panoramixip.co.uk/about-us/ , builds no software, not applicable
thread: problem tracking loads before consent with no banner and the enquiry form's marketing box comes ticked | cost under UK law neither is consent, so the leads that box signs up are likely ones he can't legally email | offer a consent banner that holds the trackers and an unticked opt in, with follow up for those who opt in | link consent, track
lead read: Kevin reads that his site loads Google Ads and LinkedIn tracking before anyone agrees and his form's marketing box comes ticked, so the leads it signs up are likely ones he can't legally email, and gets offered a consent banner that holds the trackers and an unticked opt in, one thread
claims:
your website loads Google Ads and LinkedIn tracking before a visitor agrees to anything, tools/eu-view.py Webbkoll from Stockholm, nothing clicked, https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fwww.panoramixip.co.uk%2F cookies _ga and _gcl_au, requests to ad.doubleclick.net and snap.licdn.com, and site-audit.js from the US the same minute, trackers before any click snap.licdn.com, googleads.g.doubleclick.net, ad.doubleclick.net, with no consent code in https://panoramixip.co.uk/ HTML
there's no cookie banner, site-audit.js "gdpr banner NONE FOUND [absence, confirmed against a working control]" on https://www.panoramixip.co.uk/ , and none in the six render-via-curl.js parts
the enquiry form's marketing box comes ticked, https://panoramixip.co.uk/ raw HTML, wpforms-2310-field_8_1 value "I agree to receive other communications from Panoramix Limited." checked='checked', and render-via-curl.js part 4 shows the box ticked
under UK law that isn't consent, https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guide-to-pecr/cookies-and-similar-technologies/ "you cannot set non-essential cookies on your website's homepage before the user has consented to them", consent to the UK GDPR standard, and https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/lawful-basis/consent/what-is-valid-consent/ "Silence, pre-ticked boxes or inactivity should not therefore constitute consent", both opened 2026-10-12 ~17:10 UTC
INFERENCE, the leads that box signs up are likely ones you can't legally email, rests on the checked box on https://panoramixip.co.uk/ and the ICO guidance, worded likely, whether they email that list is unknown
websites credential, docs/astra-company-profile.md line 95, Raka's fixed brand line, https://www.linkedin.com/in/raka-mulya-b92885196
recheck: 2026-10-12 ~17:00 UTC, raw HTML refetched and the checked attribute found, Webbkoll result and site-audit.js read. Disproof tried, looked for a consent manager anywhere in the HTML (CookieYes appears in lemlist's tech list, no trace of it in the live HTML), for a banner in all six render parts (none), and for a geo rule (no consent code, so none can exist). Facts hold, confidence MEDIUM
```

SKETCH
```
Hi Kevin, Panoramix IP looks cool!

However, your website loads Google Ads and LinkedIn tracking before a visitor agrees to anything, there's no cookie banner, and the enquiry form's marketing box comes ticked. Under UK law that isn't consent, so the leads that box signs up are likely ones you can't legally email.

I'd suggest a consent banner that holds the trackers until someone says yes, and an unticked opt in on the form, with a follow up for the leads who do opt in.

At Astra agency we make websites for brands like Unilever, AXA, Pertamina.

Shall I send you a sketch of the Panoramix enquiry flow that stays compliant?
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
sweep website: crawl.py twice, 50 URLs, Chromium renders of https://www.baldoriaparis.com/project and https://www.baldoriaparis.com/project/meritxsephora , CHOSEN
sweep gdpr: tools/eu-view.py from Stockholm on https://www.baldoriaparis.com/ , _ga set before a click and no banner, a setting, not chosen
sweep apps: briefs come in by a homepage form and email per https://www.baldoriaparis.com/ , folded into the offer as a brief button
sweep social: tools/social-audit.js on the accounts in their HTML, https://www.instagram.com/baldoria.paris/ 2450 followers 140 posts latest 2026-10-02, https://www.linkedin.com/company/baldoriaparis 1127 followers, active, not chosen
sweep squad: an events agency per https://www.baldoriaparis.com/about , builds no software, not applicable
thread: problem each of the 26 project pages is photos and one line, nothing on the brief or the result | cost a marketing team comparing agencies likely can't see why Baldoria's the safer pick | offer each project turned into a short case, brief, idea and coverage, with a brief us button | link brief, project
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

I'd suggest turning each project into a short case, the brief, the idea and the coverage it got, with a brief us button on every one.

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
sweep website: crawl.py twice, 4 URLs, site-audit.js and a full page render of https://www.favamole.nl/ , CHOSEN
sweep gdpr: site-audit.js on https://www.favamole.nl/ , a Squarespace banner, 1 cookie before a click, no third party trackers, nothing to say
sweep apps: B2B enquiries by a form per https://www.favamole.nl/contact , a trade enquiry and sample flow, folded into the offer
sweep social: tools/social-audit.js on the accounts in their HTML, https://www.instagram.com/favamole.nl/ 1336 followers 33 posts latest 2026-08-19, his personal LinkedIn UNKNOWN, runner up
sweep squad: a food brand per https://www.favamole.nl/ , builds no software, not applicable
thread: problem the one page site ends in a distribution form for trade buyers while Favamole heads for supermarket shelves | cost a shopper who spots a cup and looks it up won't find where to buy it | offer a shopper side to the site with where to buy it, the trade page kept for buyers | link shopper, buy
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

I'd suggest a shopper side to the site, what Favamole is and where to buy it, with the trade page kept for buyers.

At Astra agency we make websites for brands like Unilever, AXA, Pertamina.

Shall I send you a sketch of the Favamole site for shoppers?
```

### Chris Hale, The Garnish Collective, ctc_do7oK8f27qGMC89dA

```gate
lead: Christopher Colin Hale, sole director and 75% or more PSC of THE GARNISH COLLECTIVE LTD 16179771, incorporated 13 Jan 2025, Wakefield, per https://find-and-update.company-information.service.gov.uk/company/16179771/persons-with-significant-control . The site calls him "founder and head chef of The Garnish Collective". lemlist jobTitle "Founder". ctc_do7oK8f27qGMC89dA, leadId lea_Xs3sJQ5opBw3mFQqr, campaign W1b cam_7gnHSf6GvvGy8gH3n. Thread pulled 2026-10-12 16:35 UTC, 0 items, nextPage null, control ctc_ch3vFcKAkjQdMKDCg 3 items same minute. NOT in the message, his tagline "Proprietor at Hodroyd Hall" while the venue's Bridebook page names Stephen Aviss as wedding contact and calls it "My family and I are lucky enough to call Hodroyd Hall home", with no caterer named, unresolved, never used (RULES 0C point 1). The corporate page's "Venue partnership at Hodroyd Hall" is the only tie on his own site. NOT in the message, the homepage says "MasterChef finalist" and "former MasterChef UK quarter-finalist" on the same page
site pass 1: 9 URLs, tools/crawl.py on https://www.garnishcollective.com/ , every page rendered and read in Chromium (Wix)
site pass 2: 9 URLs, second full crawl equal to pass 1, site-audit.js screenshots, full page renders of the homepage and weddings page looked at, the Bar Hire and Enquire dropdowns listed live
deep analysis: A good looking Wix site for a Yorkshire luxury caterer, weddings, corporate, celebrations and bar hire, with real event photos and the line "After catering for hundreds of weddings". Across all nine pages there's one testimonial, from Evri's marketing and events manager, on the About page, and not one from a couple. The site links no social account (site-audit.js NONE LINKED with a working control, the raw HTML only carries Wix's own instagram.com/wix from the form footer). The Bar Hire form's Preferred Date dropdown offers "Choice 1, Choice 2, Choice 3, Choice 4", folded into the offer, not the hook
owner linkedin: Route 1 curl https://www.linkedin.com/in/chris-hale-0a467a26 999. Route 2 news "Chris Hale" chef, Wakefield Express 2022-09-23 "MasterChef quarter finalist Chris Hale", We Are Barnsley 2026-08-19 charity ball. Route 3 posts, walled. Route 4 company page https://www.linkedin.com/company/thegarnishcollective per lemlist, not linked from the site. Route 5 his own words on the site. Route 6 lemlist record
contact linkedin: same person as the owner, Companies House, the site and lemlist agree
google news: tools/news.py en 2026-10-12 ~16:40 UTC, "Garnish Collective" 0, "Chris Hale" chef 2 results (We Are Barnsley 2026-08-19, Yorkshire Evening Post 2026-07-25), control Tesco 100
regional news: tools/news.py Yorkshire private chef OR event catering, 20 results, Your Harrogate 2026-06-12, Wakefield Express 2022-09-23 on his food festival
industry news: tools/news.py private chef OR event catering, Food and Wine 2026-10-11, The Times 2026-10-02
sources:
1. https://www.garnishcollective.com/
2. https://www.garnishcollective.com/weddings
3. https://www.garnishcollective.com/about-1
4. https://www.garnishcollective.com/barhire
5. https://www.garnishcollective.com/enquire
6. https://www.garnishcollective.com/corporate
7. https://www.garnishcollective.com/celebrations
8. https://find-and-update.company-information.service.gov.uk/company/16179771/persons-with-significant-control
9. https://www.linkedin.com/company/thegarnishcollective (social-audit.js, 160 followers, "Chef Chris Hale-MasterChef 2016", not linked from the site)
10. https://bridebook.com/uk/wedding-venues/hodroyd-hall-south-hiendley-west-yorkshire-cs5gPMvmNY (opened, Stephen Aviss as contact, no caterer named)
11. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fwww.garnishcollective.com%2F (tools/eu-view.py)
12. https://news.google.com/rss (tools/news.py, company, person, region, industry, control)
pains: 6 judged. (1) "hundreds of weddings" with not one couple's review on the site and no Instagram linked, CHOSEN. (2) the Bar Hire date dropdown still reads Choice 1 to 4, a quick fix, folded in. (3) "finalist" and "quarter-finalist" on the same homepage, a credibility tidy up, not raised. (4) no privacy notice on a site with forms, a legal tidy up, not raised. (5) no sample menus or prices, a model choice (RULES 0D point 2), not raised. (6) Build Squad, not applicable
chosen: (1), costliest, weddings are the biggest ticket on the site and couples choose on reviews from other couples, which the site doesn't carry
sweep website: crawl.py twice, 9 URLs, renders of https://www.garnishcollective.com/weddings and the homepage, one corporate testimonial, CHOSEN
sweep gdpr: tools/eu-view.py from Stockholm on https://www.garnishcollective.com/ , 6 first party Wix cookies, no third party tracking, nothing to say
sweep apps: enquiries by Wix forms per https://www.garnishcollective.com/enquire , folded into the offer
sweep social: tools/social-audit.js, the site links no social account at all, a search found no Garnish Instagram, and social-audit.js on https://www.linkedin.com/company/thegarnishcollective read 160 followers on a page the site doesn't link, so the message says the site links no Instagram, CHOSEN with the website
sweep squad: a catering company per https://www.garnishcollective.com/about-1 , builds no software, not applicable
thread: problem the site says hundreds of weddings but carries no couple's review and links no Instagram | cost couples comparing caterers likely book the one whose reviews they can read | offer a weddings page built on couples' reviews and photos from their days, Instagram linked | link review, Instagram
lead read: Chris reads that his site says he's catered hundreds of weddings but shows no couple's review and links no Instagram, so couples comparing caterers likely book someone whose reviews they can read, and gets offered a weddings page built on his couples' reviews with Instagram linked, one thread
claims:
your website says you've catered hundreds of weddings, https://www.garnishcollective.com/weddings "After catering for hundreds of weddings", rendered 2026-10-12 ~16:52 UTC
there isn't one review from a couple on it, all nine pages rendered and searched, the only testimonial is "Stacey Dockerty, Evri - Marketing & Events Manager" on https://www.garnishcollective.com/about-1 , which the same search finds, so the method works, and no review, testimonial or couple's quote on https://www.garnishcollective.com/weddings or any other page
it links no Instagram, site-audit.js on https://www.garnishcollective.com/ "social NONE LINKED" with a working control, and the raw HTML of the home, weddings, barhire and enquire pages carries only instagram.com/wix from Wix's form footer
INFERENCE, couples comparing caterers likely book the one whose reviews they can read, rests on the two absences above on https://www.garnishcollective.com/weddings and https://www.garnishcollective.com/ , worded likely
websites credential, docs/astra-company-profile.md line 95, Raka's fixed brand line, https://www.linkedin.com/in/raka-mulya-b92885196
recheck: 2026-10-12 ~16:55 UTC, every page rendered and searched, raw HTML of four pages grepped for social links. Disproof tried, looked for reviews under other words (testimonial, review, Google, 5 star, quotes, none beyond Evri), for a linked Instagram or Facebook (only Wix's own), and for a Garnish Instagram by search (none found, so the message only says the site links none). Facts hold, confidence MEDIUM
```

SKETCH
```
Hi Chris, The Garnish Collective looks cool!

However, your website says you've catered hundreds of weddings, but there isn't one review from a couple on it, and it links no Instagram. So couples comparing caterers likely book the one whose reviews they can read.

I'd suggest a weddings page built on reviews from your couples and photos from their days, with your Instagram linked and the enquiry form tidied up.

At Astra agency we make websites for brands like Unilever, AXA, Pertamina.

Shall I send you a sketch of the new Garnish Collective weddings page?
```

### David Weyn, Major Domo, ctc_vm6BXBrFDAir6Rb3F

```gate
lead: David Alexandre Albert Weyn, founder and Président of MAJOR DOMO SAS, SIREN 944122472, created 2025-04-29, NAF 82.99Z, Nice, per https://recherche-entreprises.api.gouv.fr/search?q=major%20domo , and the site's legal notice "Propriétaire du site, David Weyn, SAS ... SIRET 944 122 472 00011 ... 944 122 472 RCS Nice". He also presides WEYN COLLECTION SAS 942007451 (Nice, 2025-03-04), not the subject. lemlist jobTitle "Founder". ctc_vm6BXBrFDAir6Rb3F, leadId lea_XXvYSema92aLMxqFL, campaign W1b cam_7gnHSf6GvvGy8gH3n. Thread pulled 2026-10-12 16:35 UTC, 0 items, nextPage null, control ctc_ch3vFcKAkjQdMKDCg 3 items same minute
site pass 1: 60 URLs, tools/crawl.py on https://www.majordomo.vip/ , every page read, English and French versions
site pass 2: 60 URLs, second full crawl equal to pass 1, site-audit.js desktop and phone screenshots opened, 11 key pages rendered in Chromium and read
deep analysis: A polished Squarespace site for villa and apartment management from Monaco to Cannes, founded in 2025 by a man with three decades in luxury hospitality and superyachts. The homepage is a long list of services in four blocks with two literary quotes between them, Douglas Adams ("To give real service you must add something which cannot be bought or measured with money") and Kazuo Ishiguro ("Greatness, indeed, is often achieved in the shadows"), and no review. The About page carries "5-Star Reviews & Personal Recommendations", six of them, two Google reviews, a private family, Conran Group Restaurants and two superyacht captains. Pricing is custom by walkthrough, a model, not raised (RULES 0D point 2). The journal's newest post is dated 5/10/25 while the homepage asks visitors to subscribe to it, a follow up
owner linkedin: Route 1 curl https://www.linkedin.com/in/david-weyn-48b41156 999. Route 2 news "David Weyn" 0. Route 3 posts, walled. Route 4 company page https://www.linkedin.com/company/majordomo-vip 656 followers. Route 5 his own words, the homepage letter signed "David Weyn, Founder" and the About page. Route 6 lemlist record, tagline "Founder, MajorDomo | Luxury Villa Management | French Riviera | Year-Round Property Care"
contact linkedin: same person as the owner, the register, the legal notice and lemlist agree
google news: tools/news.py fr 2026-10-12 ~16:40 UTC, "MajorDomo" Nice OR "Major Domo" villa 0, "David Weyn" 0, control Carrefour 100
regional news: tools/news.py Côte d'Azur conciergerie villa OR gestion locative luxe, 32 results, Presse Agence 2026-08-10 "Une nouvelle conciergerie de luxe à Bandol", MySweetImmo 2026-06-28 on Engel and Völkers entering prestige rentals on the Riviera
industry news: tools/news.py conciergerie villa OR gestion locative luxe, Capital 2026-09-23 on a prestige concierge in the Lot, Le Figaro 2026-07-02
sources:
1. https://www.majordomo.vip/
2. https://www.majordomo.vip/about-us
3. https://www.majordomo.vip/services/property-management
4. https://www.majordomo.vip/services/real-estate-partners
5. https://www.majordomo.vip/contact
6. https://www.majordomo.vip/legal-notices
7. https://www.majordomo.vip/journal
8. https://recherche-entreprises.api.gouv.fr/search?q=major%20domo
9. https://www.linkedin.com/company/majordomo-vip
10. https://www.pinterest.com/MajorDomoVIP
11. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fwww.majordomo.vip%2F (tools/eu-view.py)
12. https://news.google.com/rss (tools/news.py, company, person, region, industry, control)
pains: 6 judged. (1) the homepage asks owners to trust him with their villa but carries literary quotes and no review, while six recommendations sit on the About page, CHOSEN. (2) the journal and its newsletter stopped at 5/10/25, a follow up. (3) "award winning" on the contact page with no award named anywhere, unverifiable, not raised. (4) "Preperations" misspelt in two headings, a tidy up, not raised. (5) the Instagram link MajorDomoVIP reads like a missing or private account, UNKNOWN, kept out. (6) Build Squad, not applicable
chosen: (1), biggest, handing over the keys to a second home is a trust decision, and the proof that wins it is a page away from where owners land
sweep website: crawl.py twice, 60 URLs, site-audit.js and renders of https://www.majordomo.vip/ and https://www.majordomo.vip/about-us , CHOSEN
sweep gdpr: tools/eu-view.py from Stockholm on https://www.majordomo.vip/ , _fbp and _ga set before a click though a banner with Decline exists, a setting, not chosen
sweep apps: enquiries by a Squarespace form per https://www.majordomo.vip/contact , a walkthrough booking folded into the offer
sweep social: tools/social-audit.js on the accounts in their HTML, https://www.linkedin.com/company/majordomo-vip 656 followers, Pinterest 3 followers, Instagram MajorDomoVIP UNKNOWN (embed broken), not chosen
sweep squad: a property care company per https://www.majordomo.vip/about-us , builds no software, not applicable
thread: problem the homepage quotes Douglas Adams and Kazuo Ishiguro while his reviews sit on the About page | cost an owner deciding who gets their keys likely judges on the homepage and never sees them | offer a homepage that opens with those reviews and his superyacht years, with a walkthrough one tap away | link homepage, review
lead read: David reads that his homepage quotes Douglas Adams and Kazuo Ishiguro while his five star reviews sit on the About page, so an owner deciding who gets their keys likely never sees them, and gets offered a homepage that opens with those reviews, one thread
claims:
your homepage quotes Douglas Adams and Kazuo Ishiguro, https://www.majordomo.vip/ rendered 2026-10-12 ~16:55 UTC, "— Douglas Adams" and "— Kazuo Ishiguro, The Remains of the Day", both crawl passes
while your five star reviews sit on the About page, https://www.majordomo.vip/about-us "Words of Affirmation 5-Star Reviews & Personal Recommendations", six entries including two marked Google Reviews, both passes, and the homepage text has no "review" in either pass
INFERENCE, an owner deciding who gets their keys likely judges on the homepage and never sees them, rests on https://www.majordomo.vip/ and https://www.majordomo.vip/about-us , worded likely
your superyacht years, https://www.majordomo.vip/about-us "advancing into the specialised world of super yacht management", and https://www.majordomo.vip/services/real-estate-partners "has spent over 15 years serving high profile families aboard superyachts"
websites credential, docs/astra-company-profile.md line 95, Raka's fixed brand line, https://www.linkedin.com/in/raka-mulya-b92885196
recheck: 2026-10-12 ~16:58 UTC, both pages reread in two crawls and a render. Disproof tried, a first draft said the site had no proof at all, the search for review and star found the About page's six recommendations, so the claim was cut down to where they sit. Checked the homepage for any review in both passes (none). Facts hold, confidence MEDIUM
```

SKETCH
```
Hi David, Major Domo looks cool!

However, your homepage quotes Douglas Adams and Kazuo Ishiguro, while your five star reviews sit on the About page. So an owner deciding who gets their keys likely judges on the homepage and never sees them.

I'd suggest a homepage that opens with those reviews and your superyacht years, with booking a walkthrough one tap away.

At Astra agency we make websites for brands like Unilever, AXA, Pertamina.

Shall I send you a sketch of the new Major Domo homepage?
```
