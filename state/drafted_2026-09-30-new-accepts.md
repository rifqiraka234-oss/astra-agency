# 2026-09-30 new accepts, full research. Two openers, three no angle. NOTHING SENT.

Raka's words, "do the connected invitation accepted run again theres new ones. Full research. ALL
ANGLES ALL RESOURCES STRICTLY NO SHORTCUTS. And also including research oliver".

## What was pulled

- `/api/activities?type=linkedinInviteAccepted&minDate=2026-09-29T12:00Z`, 5 accepts. Oliver Acton (12 45Z,
  carried from last night) plus four new, Guillaume Slee 15 02Z, Mathieu Stark 18 46Z, Chrissie Krappe
  21 03Z, Hilde Pol 23 07Z.
- **Check A, all five.** `get_inbox_conversation` on each contactId, all empty, `nextPage` null. Positive
  control in the same minutes, Oscar Van Der Maas came back full (4) and Nikolas Wagner full (7).
  `get_inbox_conversations` teamConversations search by full name and by company (Hilde Pol, Jos Bles,
  Chrissie Krappe, Blu Sky, Mathieu Stark, Guillaume Slee, Brovanture, Oliver Acton), all 0, control
  Nikolas Wagner 1. `search_campaign_leads` with include campaigns, each lead sits in v0.1 only. State
  grep of queue, prototypes, digest log, drafted files and logs for names, companies, contactIds, leadIds
  and LinkedIn slugs, nothing but last night's Oliver row.
- **Nikolas Wagner's close** went at 06 00 17Z on Raka's "Send the reply to Nikolas", copied verbatim from
  state/drafted_2026-09-29-evening-check.md, thread re-pulled after, one copy.

## The five in plain words

1. **Oliver Acton, Frank Taylor & Associates. OPENER.** He's the Managing Director of the UK's biggest
   dental practice sales agent (announced on their own site, Jan 2024). Their own articles say a sale
   that should take a few months stretches to six or more when the seller's paperwork isn't ready, and
   that deal fatigue kills sales late on. Their only fix is telling sellers to keep a cloud folder.
   They just opened Leeds and launched a buyer app, so buyers arrive faster and the hold up moves to the
   seller. We'd build a seller document portal that chases what's missing.
2. **Hilde Pol, Jos Bles. OPENER.** A fashion agency in the World Fashion Centre selling 14 brands to
   shops. Every sales season runs on retailers ringing an account manager for a half hour in the
   showroom. The site has no booking and no form anywhere, and all 14 brand pages just give an email
   and a phone number. They're hiring another account manager now. We'd build a showroom booking page.
3. **Chrissie Krappe, Blu Sky. NO ANGLE.** A modern, award winning, B Corp accountancy with an agency
   built site. They sell app setups to their own clients. Nothing costly enough to pitch.
4. **Guillaume Slee, Brovanture. NO ANGLE.** A 50 person Oracle consultancy, four years running UKOUG
   EPM partner of the year. The only real findings are an afternoon's cookie fix and hidden template
   pages. They say in writing they're firmly onshore, so a build squad pitch runs against them.
5. **Mathieu Stark, Duplo France. NO ANGLE, not ours to sell to.** The French arm of a Japanese group,
   the registered manager is someone else, and duplofrance.fr just forwards to the group's site.

---

## Oliver Acton, Frank Taylor & Associates. OPENER. ctc_su8BQMQwP7cnLdLFp

```gate
lead: Oliver Acton, Managing Director, Frank Taylor & Associates, ctc_su8BQMQwP7cnLdLFp, lea_MZ9KSwgvWhKx92TEh. lemlist jobTitle Director, tagline "Director at Frank Taylor & Associates | Creative Director at FTA Media". The company's own https://www.ft-associates.com/article/new-md-at-frank-taylor-associates/ (16 Jan 2024) says "Oliver Acton taking over as Managing Director", and a web search returns his LinkedIn headline "Oliver Acton - Managing Director - Frank Taylor & Associates". Companies House 04028278 FRANK TAYLOR & ASSOCIATES LIMITED lists Andrew Acton, Caroline Acton, Christopher Strevens and Gillian Strevens as directors, PSCs Andrew Acton and Christopher Strevens, Oliver is not a statutory director. https://www.ft-associates.com/home/the-fta-directors/ names Andy Acton and Chris Strevens as co-owners of the FTA group. So Oliver runs the business and doesn't own it on the record, the message says nothing about ownership. FTA Media is FTA's own media arm per the directors page, not a separate company of his (FTA MEDIA LTD 13385637 and FTA MEDIA GROUP LTD 16839068 belong to other people)
site pass 1: 705 URLs from https://www.ft-associates.com/sitemap_index.xml (page, blog, seminars, dental_practices, practice_value_index, articles_pclub, geo sitemaps), every one fetched in parallel with curl, 705 at 200, text of every page read by script, shared review and nav boilerplate stripped by 12 gram frequency so each page's own body could be read
site pass 2: 705 pages again through a second path (curl_cffi browser fingerprint), 705 at 200, the quoted sentences rechecked on the second read. Pages read in full by hand, new MD article, the FTA directors, due diligence, what should I do to prepare, Practice Value Index Nov 2025, Jun 2026 and Sep 2026, FTA app launch, Leeds office, Dental Data Vault, become a member, membership benefits, a listing (01-15-3352) and the valuation checklist download. Screenshots desktop and phone from tools/site-audit.js opened, a modern dark and gold Elementor site with a search, listings with prices and an affordability checker. The hero video shows a player error in our Chromium, which can't play H.264, so nothing about video is claimed
deep analysis: the UK's biggest dental practice broker (founded 1988, 10,000+ valuations per its app listing). 107 live listings with asking price, fee income and "Presented to N potential buyers", buyer membership tiers upgraded online, a buyer masterclass, a podcast, FTA Media for dental marketing, the Dental Data Vault. The buyer side is well served and got an app in June 2026 (https://apps.apple.com/gb/app/frank-taylor-associates-app/id6758710581 , developer Frank Talyor & Associates, buyer search plus a seller intake form only). The seller side after instruction runs on advice. /sell-a-dental-practice/due-diligence/ says "You will need to gather information on the following; Property Practice Equipment Employment Money Insurance" and "Everything should be sent to your solicitor as one properly collated and scheduled response. Answering points in piecemeal can become messy and cause further delays". The Nov 2025 index says "sales that should take a few months stretch to six or more not because of negotiation, but because the seller wasn't ready", "Use a clearly labelled, cloud-based folder for all key files" and "You avoid 'deal fatigue', which often kills sales late in the process". 0 pages mention a data room or a seller portal, searched for data room, portal, upload, log in across all 705
owner linkedin: route 1 curl /in/oliver-acton-27baa595 999, /recent-activity/all/ 429, tools/fetch-walled.py empty. Route 2 web search "Oliver Acton" "Frank Taylor" managing director, headline "Managing Director - Frank Taylor & Associates". Route 3 web search linkedin.com/posts "Oliver Acton", results describe posts on the Leeds office and the BDIA Dental Showcase with The Principals Club, the Leeds office confirmed on their own site. Route 4 dentalsky.com author page and the Dentology podcast episode S2E8 with him. Route 5 company page via tools/social-audit.js (LinkedIn link resolves, count not readable). Route 6 Instagram franktaylorassoc 1,177 followers, YouTube 96 subscribers 162 videos. The owners Andy Acton and Chris Strevens are read on /home/the-fta-directors/ and Andy's dentistry.co.uk author pages exist
contact linkedin: Oliver is the person we're messaging and the MD, the owners are Andy Acton and Chris Strevens per the directors page and Companies House, same six routes as above for Oliver, owners read via their own site
google news: tools/news.py en, "Frank Taylor & Associates" 9 results, nature.com 2025-11-10 "Owner fatigue in dentistry" and 2026-04-02, dentistry.co.uk 2022 "25 years of dental practice values". "Oliver Acton" 7, all other Oliver Actons, none his. Control, the company query itself came back with 9
regional news: tools/news.py UK dental practice sale with the industry terms, 62 results, The Herald 2026-09-28 a Stirling practice for sale at £360,000, The Mirror 2026-09-15 fewer NHS patients pushing people private, 2026-08-24 NHS dentist "almost impossible", Wales Online 2026-04-01 Welsh NHS dental changes
industry news: tools/news.py dental practice sales UK OR valuations 2026 OR NHS dental contract reform, same 62, the NHS access crisis and a shift to private care, which keeps practices changing hands. Trade press read, dentistry.co.uk, nature.com BDJ in Practice
sources:
1. https://www.ft-associates.com/sitemap_index.xml (705 URLs, all fetched twice)
2. https://www.ft-associates.com/article/new-md-at-frank-taylor-associates/
3. https://www.ft-associates.com/home/the-fta-directors/
4. https://www.ft-associates.com/sell-a-dental-practice/due-diligence/
5. https://www.ft-associates.com/practice-value-index/november-2025/
6. https://www.ft-associates.com/practice-value-index/june-2026/
7. https://www.ft-associates.com/article/expanding-north-presence-with-leeds-office/
8. https://apps.apple.com/gb/app/frank-taylor-associates-app/id6758710581
9. https://find-and-update.company-information.service.gov.uk/company/04028278/officers
10. https://find-and-update.company-information.service.gov.uk/company/04028278/persons-with-significant-control
11. https://uk.linkedin.com/in/oliver-acton-27baa595 (headline via search, profile walled 999)
12. https://www.dentology-podcast.com/episodes/s2-oliver-acton-episode-8
13. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fwww.ft-associates.com (tools/eu-view.py)
14. https://www.instagram.com/franktaylorassoc (tools/social-audit.js)
15. https://www.youtube.com/channel/UCzfUNbfoHZdv5mfAKAckD_w (tools/social-audit.js)
16. Google News via tools/news.py, nature.com 2025-11-10 and The Mirror 2026-09-15
pains: 5 judged. (1) Seller paperwork, by their own words the thing that stretches a few month sale to six or more and kills some late, handled by advice and a cloud folder, costliest because FTA's fee lands at completion and a dead sale pays nothing, and hottest because Leeds (Mar 2026) and the buyer app (Jun 2026) put more sales in progress. (2) GDPR, from Stockholm 18 cookies before any click including PixelYourSite's pys_ set (landing page, traffic source) and ClickGuardian's pbid, with a consent banner present, real but an afternoon's plugin setting. (3) Website, modern, listings, search and affordability checker, nothing big. (4) Social healthy, Instagram posting yesterday, YouTube 5 days ago. (5) Squad, they have their own media arm and already shipped an app, no capacity signal
chosen: (1), the costliest and the hottest, it's their revenue timing and their own stated deal killer, and the new app and Leeds office add sales without touching it
sweep website: https://www.ft-associates.com rendered by tools/site-audit.js, both screenshots opened, a modern Elementor site with listings, prices, an affordability checker and online membership upgrades, no costly website flaw found
sweep gdpr: from Stockholm per tools/eu-view.py https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fwww.ft-associates.com , 18 cookies before any click including pys_landing_page, pysTrafficSource and pbid, while a banner with Decline shows. Real, UK GDPR and PECR, but a plugin setting, second place
sweep apps: seller due diligence runs on advice, /sell-a-dental-practice/due-diligence/ "You will need to gather information" and the Nov 2025 index "Use a clearly labelled, cloud-based folder", while the same index says unready sellers stretch sales to six months or more. The chosen angle
sweep social: opened with tools/social-audit.js, Instagram https://www.instagram.com/franktaylorassoc 1,177 followers latest post 2026-09-29, YouTube 96 subscribers latest 5 days ago, X bio matches the site, LinkedIn resolves. Healthy, no angle
sweep squad: FTA Media is their own creative arm and the app is published under their own name on the App Store, https://apps.apple.com/gb/app/frank-taylor-associates-app/id6758710581 , no open developer roles found, not a squad fit
thread: problem sellers gather their own due diligence into a cloud folder | cost a few month sale stretches to six or more and deal fatigue kills some late, more of them as Leeds and the app add sales | offer the seller document portal | link seller, document
lead read: Oliver reads that his site tells sellers to gather their own due diligence into a folder, that a missing document stretches a sale and can kill it, that Leeds and the new app make it worse, and gets offered a seller document portal, one thread
claims:
your site tells sellers to gather their own due diligence into a cloud folder, https://www.ft-associates.com/sell-a-dental-practice/due-diligence/ "You will need to gather information on the following" and "Everything should be sent to your solicitor as one properly collated and scheduled response", and https://www.ft-associates.com/practice-value-index/november-2025/ "Use a clearly labelled, cloud-based folder for all key files"
a sale stretches from a few months to six or more when one document's missing, https://www.ft-associates.com/practice-value-index/november-2025/ "sales that should take a few months stretch to six or more not because of negotiation, but because the seller wasn't ready"
some die of deal fatigue, https://www.ft-associates.com/practice-value-index/november-2025/ "You avoid 'deal fatigue', which often kills sales late in the process"
opening in Leeds, https://www.ft-associates.com/article/expanding-north-presence-with-leeds-office/ "We are pleased to announce the opening of a new office in Leeds", dated 23-03-2026 on /news/articles/
the new app bringing buyers in, https://www.ft-associates.com/practice-value-index/june-2026/ "That is exactly why we built the FTA App" and https://apps.apple.com/gb/app/frank-taylor-associates-app/id6758710581
finding the buyer rarely stalls them, https://www.ft-associates.com/practice-value-index/november-2025/ "delays often have little to do with finding a buyer"
built automated follow up loops at Betty Blocks so the next step chased itself, docs/astra-master-context.md section 2A "automation-driven revenue workflows covering enrichment, scoring, routing and follow-up loops", from https://www.linkedin.com/in/raka-mulya-b92885196
recheck: 2026-09-30 every quoted sentence rebuilt from the second read (curl_cffi path) and found word for word, MD article, due diligence, Nov 2025 index, Leeds, app. Opposite tried, all 705 pages searched for data room, portal, upload and log in, none is a seller document tool, and the app listing names only a seller intake form. The message never says FTA has no internal tracker, only what the site tells sellers. Thesis confidence MEDIUM, because what happens inside their team after instruction isn't public
```

### Oliver, OPENER

```
Hi Oliver, saw Frank Taylor & Associates, looks interesting!

However, your site tells sellers to gather their own due diligence into a cloud folder and send it to the solicitor in one go. This causes a sale to stretch from a few months to six or more when one document's missing, and some die of deal fatigue.

Especially, when you are opening in Leeds and bringing buyers in faster through the new app, the wait on sellers' paperwork holds up more of your sales, since finding the buyer rarely stalls them.

I run Astra agency. We build websites and apps for brands like Unilever, AXA, Pertamina. I built automated follow up loops at Betty Blocks, so the next step chased itself without anyone remembering to.

Shall I send you over what the seller document portal looks like?
```

---

## Hilde Pol, Jos Bles. OPENER. ctc_L7RyYpwyxfCcuR4WL

```gate
lead: Hilde Pol, Jos Bles B.V., Amsterdam, ctc_L7RyYpwyxfCcuR4WL, lea_qkXrikS24vfXr8PEh. lemlist jobTitle "Director & co-owner Jos Bles - Jos Bles Labels | Amsterdam", tagline "Director & Co-Owner | Connecting Fashion, Brands & People | Jos Bles BV, Amsterdam". Their own https://www.josbles.nl/about/team/ lists "HILDE COO & Accountmanager Moscow & Rosner" under "JOS Founder" and "DANIEL CFO". KVK 33259486 (Jos Bles B.V., Koningin Wilhelminaplein, Amsterdam) per North Data, directors and shareholders sit behind the KVK paywall, so co-ownership is her own claim and the message doesn't use it. Tagline, jobTitle, team page and the Oui showroom list (hilde@josbles.nl as the Netherlands contact) all agree she runs it day to day. She takes the applications for the open account manager role (company LinkedIn post, "Stuur je sollicitatie naar Hilde@josbles.nl")
site pass 1: 25 URLs, 19 from the sitemap plus links, by tools/crawl.py (it fell back to the browser fingerprint fetch, Chromium gets a Cloudflare challenge), 24 at 200 and 1 at 404 (cdn-cgi email protection), every page read
site pass 2: all 25 pass 1 URLs again by a second path (curl_cffi rotating chrome, safari, firefox), 24 at 200 and the cdn-cgi email protection page refused again, every page read, the brand page count and contact lines rebuilt from it. Screenshots, Chromium is challenged live, so the saved pages were rendered with every asset routed through the impersonation server, text, nav, footer and the cookie banner render, but 0 of 16 images decode on any route. Every visual finding is VOID and the message makes none. Privacy statement page screenshotted desktop, the page body renders empty between nav and footer
deep analysis: a Jimdo site with 14 brand pages, about, team, media, contact, and legal pages. 0 forms on all 24 pages (the crawler finds forms on blusky.co.uk and ft-associates.com in the same session). All 14 brand pages end their brand story in "Meer weten?" with an email address and a phone number, the contact page is an address, phone, email and a Google Maps embed. No booking link, no calendar, no season dates, no lookbook, no login, searched in text and raw HTML (the 91 "booking" hits are Jimdo's "isBookingLink":false config). The Impressum page carries Jimdo's placeholder text ("Raadpleeg een expert...") and the Privacyverklaring page is empty. How they sell comes from outside the site, the account manager vacancy (FashionUnited, 10 Sep 2026) says "Tijdens de verkoopseizoenen gaan we er samen vol voor: collecties presenteren, klanten ontvangen, afspraken plannen", and Hilde's own company page post (about 3 months ago) on Nenette SS27 invites retailers to view the collection 15 June to 3 July with "Voor vragen of meer informatie kun je mij bereiken op: 06-54904794. Misschien heb je een half uurtje". So every season's showroom visits are fixed by phone and email, per brand, per account manager. Two WFC neighbours (sbagenturen.nl, desiree-agenturen.nl) are just as basic, so no competitor claim is made
owner linkedin: route 1 curl /in/hildepol and /recent-activity/all/ 301 to the auth wall, tools/fetch-walled.py returns the wall. Route 2 web search "Hilde Pol" "Jos Bles", salesgear lists her as Chief Executive Officer, lemlist tagline Director & Co-Owner. Route 3 her post https://nl.linkedin.com/posts/hildepol_oui-premium-trade-fair-july-2022-activity-6953013951026622464--9y8 read (Oui at Premium Berlin, 2,052 followers, 396 posts), plus her Nenette SS27 post on the company page. Route 4 https://www.oui.com/eu/en/about-oui/our-showrooms names her as the Netherlands contact. Route 5 company page https://nl.linkedin.com/company/jos-bles-fashion read, 539 followers, tagline "Expanding mid to premium brands", the vacancy and Nenette posts. Route 6 Instagram josblesfashion 5,600 followers, Facebook 2.2K. The founder Jos Bles (b. 1952) is read via FashionUnited's 2018 career profile and textilia
contact linkedin: Hilde is the person we're messaging and runs the business day to day (COO on the team page), the founder is Jos Bles, same six routes, the founder has no personal LinkedIn activity found
google news: tools/news.py nl, "Jos Bles" 10 results, textilia 2024-08-26 "Jos Bles introduceert nieuw Nederlands label Honnête Atelier", FashionUnited 2018 career profile, the rest about Danie Bles. "Hilde Pol" 2, both other people. Control, the company query itself came back with 10
regional news: tools/news.py (Amsterdam mode agentuur OR World Fashion Centre) with the wholesale terms, 6 results, Parool 2018 on the future of the WFC, 2017 Zalando and Bestseller virtual showroom in Amsterdam, nothing on Jos Bles
industry news: tools/news.py modeagent OR modegroothandel OR wholesale mode Nederland, 78 results, Drimble 2026-09-21 Castellino takes over Jeff, "Onze focus ligt op wholesale", Shopify 2026-07-12 on wholesale marketplaces. Trade press read, FashionUnited, textilia
sources:
1. https://www.josbles.nl/ and all 24 pages (sitemap plus links, read twice)
2. https://www.josbles.nl/about/team/
3. https://www.josbles.nl/brands/nenette/ (one of 14 brand pages, each ending in email and phone)
4. https://www.josbles.nl/contact/
5. https://fashionunited.nl/modevacatures/account-manager-fashion-functie-per-direct-beschikbaar-amsterdam-2005702
6. https://nl.linkedin.com/company/jos-bles-fashion
7. https://nl.linkedin.com/posts/hildepol_oui-premium-trade-fair-july-2022-activity-6953013951026622464--9y8
8. https://www.oui.com/eu/en/about-oui/our-showrooms
9. https://www.northdata.com/Jos%20Bles%20B.V.,%20Amsterdam (KVK 33259486)
10. https://www.textilia.nl/jos-bles/
11. https://fashionunited.nl/tags/jos-bles
12. https://www.instagram.com/josblesfashion/ (tools/social-audit.js)
13. https://www.facebook.com/JosBlesFashion/ (tools/social-audit.js)
14. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fwww.josbles.nl (tools/eu-view.py)
15. https://www.sbagenturen.nl/ (competitor control)
16. https://www.worldfashioncentre.nl/jubileumboek-interview-jos-bles (walled by a captcha, listed as walled)
pains: 5 judged. (1) Showroom appointments every season are fixed by phone and email per account manager, with no booking or preview anywhere on the site, costliest because it eats the account managers' selling season and loses retailers who never get round to calling, hottest because they're hiring another account manager now and adding brands. (2) Empty privacy statement and a placeholder Impressum, true and small, an afternoon's fix, it stays in the sweep. (3) Website look, VOID, images never decoded on any route, so nothing is claimed. (4) Social healthy, Instagram 5,600 posting 2 days ago. (5) Squad, a fashion agency with no build team, no fit
chosen: (1), the costliest and hottest, the peak season work the vacancy itself names ("afspraken plannen"), growing with every account manager and brand
sweep website: all 24 pages of https://www.josbles.nl read twice, 0 forms, all 14 brand pages end in an email and a phone number, no booking, the look can't be judged because images never decoded in our renders
sweep gdpr: from Stockholm per tools/eu-view.py https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fwww.josbles.nl , 1 cookie (__cf_bm) and only Jimdo hosts before a click, a consent banner with Alle weigeren, clean. The empty https://www.josbles.nl/privacyverklaring/ is real and small
sweep apps: the vacancy on https://fashionunited.nl/modevacatures/account-manager-fashion-functie-per-direct-beschikbaar-amsterdam-2005702 names "afspraken plannen" as peak season work, and Hilde's Nenette post books half hours by phone, the chosen angle, a booking tool
sweep social: opened with tools/social-audit.js, Instagram https://www.instagram.com/josblesfashion/ 5,600 followers latest post 2026-09-28, Facebook JosBlesFashion 2.2K, LinkedIn 539. Healthy, no angle
sweep squad: a fashion wholesale agency, the team page https://www.josbles.nl/about/team/ is account managers, aftersales, CFO and one social media and marketing role, no build work, not a squad fit
thread: problem no way to book a showroom visit, every brand page sends retailers to an email and a phone | cost buyers ring round for a half hour and some never book, more of it with every account manager and brand added | offer the showroom booking page | link showroom, book
lead read: Hilde reads that retailers can't book a showroom visit on her site and have to ring round her account managers, that it grows as she adds people and brands, and gets offered a showroom booking page, one thread
claims:
your website gives a retailer no way to book a showroom visit, https://www.josbles.nl/ all 24 pages read twice 2026-09-30, 0 forms, no booking link or calendar in text or raw HTML, control sbagenturen.nl login href and blusky.co.uk forms found by the same methods
each brand page only lists an email and a phone number, 14 of 14 brand pages under https://www.josbles.nl/brands/ carry "Meer weten?" with an email and 020 number, e.g. https://www.josbles.nl/brands/nenette/
a half hour slot, Hilde's own Nenette SS27 post on https://nl.linkedin.com/company/jos-bles-fashion "Misschien heb je een half uurtje om deze ... collectie te komen bekijken?"
adding account managers, https://fashionunited.nl/modevacatures/account-manager-fashion-functie-per-direct-beschikbaar-amsterdam-2005702 dated September 10, 2026, "Account Manager Fashion – functie per direct beschikbaar"
and brands, https://nl.linkedin.com/company/jos-bles-fashion tagline "Expanding mid to premium brands", and textilia 2024-08-26 on the new label Honnête Atelier
led global ecommerce insights at Heineken and got 23 markets serving themselves, docs/astra-master-context.md section 2A "enabled 23 markets with self-serve insights", from https://www.linkedin.com/in/raka-mulya-b92885196
recheck: 2026-09-30 brand count and contact lines rebuilt from the second read, 0 forms confirmed on both reads, the vacancy text read rendered in Chromium, the Nenette post read on the company page. Opposite tried, raw HTML searched for calendly, booking, afspraak, lookbook, pdf and form tags, the only booking hits are Jimdo's false flags. Thesis confidence MEDIUM, because some brands run their own B2B ordering, so the message is about booking the showroom visit, which is the agency's own job
```

### Hilde, OPENER

```
Hi Hilde, saw Jos Bles, looks interesting!

However, your website gives a retailer no way to book a showroom visit, as each brand page only lists an email and a phone number. This causes buyers to ring round your account managers for a half hour slot, and some never get round to seeing the collection.

Especially, when you are adding account managers and brands, the ringing round gets longer, since each one's another inbox and phone line to chase before the slots are gone.

I run Astra agency. We build websites and booking tools for brands like Unilever, AXA, Pertamina. I led global ecommerce insights at Heineken, where we got 23 markets serving themselves instead of waiting on a person.

Shall I send you over what the showroom booking page looks like?
```

---

## Chrissie Krappe, Blu Sky. NO_STRONG_ANGLE. ctc_to9dLfFnqcAEj2Xih

```sweep
lead: Chrissie Krappe, Managing Director, Blu Sky Tax Limited (05908251), ctc_to9dLfFnqcAEj2Xih, lea_PRH8esxCkxGrPuo7J. Companies House, KRAPPE Christina director since 1 Feb 2026, PSCs Blu Sire Ventures (Jon Dudgeon) and Polar Bear Ventures (Steven Robinson). https://blusky.co.uk/about/ names her Managing Director and statutory director, Insider Media 4 Aug 2026 says she leads the firm remotely from 200+ miles away as it aims "to scale nationally". She runs it, the founders own it
website: all 732 sitemap pages of https://blusky.co.uk fetched and read, home and get-started rendered by tools/render-via-curl.js and screenshots opened, a modern agency built site (vida), B Corp, Xero awards, clear stage based journeys, forms on contact and get started. The page title names Manchester while the site lists three offices without it, a tweak
gdpr: iubenda consent code so GEO VOID from the US, tools/eu-view.py https://www.blusky.co.uk was blocked by Cloudflare at Webbkoll, so nothing can be claimed either way, a blocked reader is not a clean or a dirty site
apps: an accountancy that sells app advisory and Xero setups to clients per https://blusky.co.uk/app-advisory/ , logos show Xero, Dext, Fathom and Telleroo, remote team on Teams, a fractional CIO on the about page, no process gap visible from outside
social: opened with tools/social-audit.js, X https://twitter.com/BluSkyTax bio matches the site, Instagram bluskytax unreadable (embed broken, UNKNOWN, stays out), Facebook and LinkedIn behind their walls
squad: an accountancy firm, careers at https://blusky.co.uk/careers-at-blu-sky/ hire a Tax Manager and Client Relationship Manager, no build work, not a squad fit
verdict: NO_STRONG_ANGLE, a strong modern firm that already sells tech to its clients, the only findings are a page title and an unreadable consent view. Google News via tools/news.py, Chrissie Krappe 4 results (Chronicle Live 2026-06-03, Insider 2026-08-04), company 1 (2018)
```

## Guillaume Slee, Brovanture. NO_STRONG_ANGLE. ctc_mG6iR58sQQAXKgKEk

```sweep
lead: Guillaume Slee, CEO, Brovanture Limited (05582633), ctc_mG6iR58sQQAXKgKEk, lea_oMsxcdxJwgCWNDohj. Companies House, SLEE Guillaume Patrick director since 18 Jul 2016, PSCs Malcolm Brock and Marc Van Kan at 25 to 50% each. https://brovanture.com/ukoug-2026-epm-partner-of-the-year/ is signed "Guillaume Slee, Brovanture CEO". He runs it, the founders own it
website: 600 pages of https://brovanture.com read through a Chromium session that passes their SiteGround captcha (84 queued links left, all archive and template variants), an award heavy Oracle consultancy site. 72 pages carry "button 2 label" in their HTML, checked in Chromium on the homepage, budget transfers and careers pages, every instance is display none and zero size, not visible, not claimed. 23 Elementor /template/ pages are public at 200, a housekeeping task
gdpr: from Stockholm per tools/eu-view.py https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fwww.brovanture.com , CookieYes installed yet the LinkedIn Insight tag (px.ads.linkedin.com, snap.licdn.com) and ZoomInfo (ws.zoominfo.com, cookie _zitok) run before any click. Real, and an afternoon's consent setting, fails the tweak test
apps: they build and host Oracle EPM apps and sell their own add ons (budget transfers and virements, documentation service) per https://brovanture.com/solutions/budget-transfers-and-virements/ , software is their trade, nothing for us to build for them
social: opened with tools/social-audit.js, LinkedIn https://www.linkedin.com/company/brovanture-ltd 1,313 followers, X brovanture bio matches the site. Healthy, no angle
squad: hiring BD executives and Oracle Planning, FCCS, NetSuite and Cloud ERP consultants per https://brovanture.com/brovanture/careers-recruitment/ , Oracle specialists we don't supply, and https://brovanture.com/brovanture-support-why-you-should-lean-on-us/ says "We are totally and firmly onshore with offices only in the UK", so a squad pitch runs against their stated position
verdict: NO_STRONG_ANGLE, 50 staff, 200+ clients, UKOUG EPM partner of the year four years running, the only real findings are tweaks. Google News via tools/news.py, Brovanture 0, Guillaume Slee 0, industry 8 (Oracle EPM 11.2.24, TCS leader in Oracle services)
```

## Mathieu Stark, Duplo France. NO_STRONG_ANGLE, not ours to sell to. ctc_mZdZ2YvCWQPin4jJ4

```sweep
lead: Mathieu Stark, Directeur Général, Duplo France, ctc_mZdZ2YvCWQPin4jJ4, lea_Dv9u9oRJNyebix9u7. Register via recherche-entreprises.api.gouv.fr, DUPLO FRANCE SIREN 402010904, SARL, created 1995-07-11, Créteil, gérant Bruno Picquet, Mathieu is not a registered dirigeant. lemlist companyDescription "Filiale de Duplo International". A group subsidiary run for a parent, a firm inside a group per RULES 4A rule 13
website: https://www.duplofrance.fr answers 301 to http then 302 to https://www.duplointernational.com/fr (followed with tools/fetch-walled.py, title "Home | Duplo International", canonical duplointernational.com), the French arm has no site of its own to change
gdpr: the only site is the group's https://www.duplointernational.com , run by Duplo International, nothing Duplo France controls or could buy from us
apps: a distributor and service arm for the group's print finishing machines, internal systems come from the group per https://www.duplointernational.com/fr , not a small business buyer
social: their own domain is a redirect, so the group's links were taken from https://www.duplointernational.com/fr and opened with tools/social-audit.js, LinkedIn duplo-international 8,085, Instagram duplo_int 1,234 posting 2026-09-29, YouTube 1.35k, all the group's accounts, none Duplo France's
squad: sells and services machines, no build team at https://www.duplointernational.com/fr , not a squad fit
verdict: NO_STRONG_ANGLE, a subsidiary whose registered manager is someone else and whose web presence is the parent's, nothing is his to buy
```
