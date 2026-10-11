<!-- Deep research batch b15_E, 2026-10-11. Nothing sent. Re pull every thread and reopen every claim source before any send. -->
# Drafts, b15_E, 2026-10-11

### Rachel Blanckensee, Rachel Blanckensee Styling, ctc_G8gRt44CmSG6Rpdnu

```gate
lead: Rachel Blanckensee, founder and sole trader behind Rachel Blanckensee Styling (rbstyling.ie, Greystones, Co. Wicklow), ctc_G8gRt44CmSG6Rpdnu, leadId lea_6eamRMTnvFKhZBtZJ, campaign W1b cam_7gnHSf6GvvGy8gH3n. lemlist jobTitle "Founder | Personal Stylist", tagline "Inclusive & Supportive Personal Stylist", companyFoundedOn 2026, 1 employee, Self-Owned. Ownership from her own pages, https://www.rbstyling.ie/about-me "That's what led me to start RB Styling" and https://www.rbstyling.ie/privacy-policy-virtual-style-report "Rachel Blanckensee Styling is responsible for your personal data". CRO open data has no company of that name (https://opendata.cro.ie datastore search "blanckensee" 0 rows, control "ryanair" returned rows), so she trades as a sole trader. Thread pulled 2026-10-11 ~11:05 UTC and again ~11:45 UTC, 0 activities, nextPage null, control ctc_ch3vFcKAkjQdMKDCg 2 items same minute. sentOnly search shows only our 2026-10-07 05:15 connect note, lastRepliedAt null. No row in any state file
site pass 1: 64 URLs by tools/crawl.py (24 from the Squarespace sitemap, 32 distinct pages, 5 old URLs answer 404), every page text read
site pass 2: 64 URLs, second full crawl equal, site-audit.js desktop and phone screenshots of home, the virtual style report, gift vouchers and in person packages opened, render trusted, 0 page errors
deep analysis: A seven month old one woman styling business, trading since March 2026 per her own Instagram. Four in person packages from €100 to €785, online consultations, group sessions, events with partners, gift vouchers and a new Personalised Virtual Style Report (page updated 8 Oct 2026, limited time price). Only the free 15 minute call books itself through Calendly. Every paid thing starts with a form and then waits on her. Book Now jumps to an enquiry form, "I'll get back to you as soon as I can". Vouchers go form, Revolut link, then a voucher she prepares and emails within 48 hours. The report goes form, Revolut link, a questionnaire link she sends within 24 hours, a selfie by email, then a 25+ page report she builds in Canva within a week. Event tickets are emailed by hand within 24 hours of a Revolut payment
owner linkedin: same person as the contact. Route 1 curl https://www.linkedin.com/in/rachel-blanckensee-708805113 999 and /recent-activity/all/ 301 to the wall. Route 2 web search "Rachel Blanckensee", nothing of hers. Route 3 search site:linkedin.com "Rachel Blanckensee" stylist, nothing. Route 4 CRO open data, no company. Route 5 company page https://www.linkedin.com/company/rachel-blanckensee-styling via tools/social-audit.js and WebFetch, Greystones, founded 2026, 1 employee, no posts visible. Route 6 her own words on the site, blog (five posts, 14 Apr to 18 Sep 2026) and Instagram captions read in full
contact linkedin: same person, lemlist title, her site and her Instagram agree, same six routes
google news: tools/news.py en 2026-10-11 ~11:10 UTC, "Rachel Blanckensee" 0, company 0, control Tesco 100
regional news: tools/news.py (Greystones OR Wicklow OR Ireland) personal stylist, 74 results, Irish Examiner 2026-05-09 free wardrobe app plus a stylist, Irish Independent 2026-06-05 stylists shopping on a budget, both opened at source
industry news: tools/news.py personal stylist, 100 results, WWD 2026-09-01 Anywear questionnaire led styling app, Newswire 2026-06-30 AI colour analysis from a selfie, Newstalk 2026-08-08 industry review of personal stylists in Ireland, Arnotts and Kildare Village offering free personal shopping appointments
sources:
1. https://www.rbstyling.ie/personalised-virtual-style-report
2. https://www.rbstyling.ie/gift-vouchers
3. https://www.rbstyling.ie/in-person-style-packages
4. https://www.rbstyling.ie/events
5. https://www.rbstyling.ie/privacy-policy-virtual-style-report
6. https://www.rbstyling.ie/about-me
7. https://www.instagram.com/rachelblanckenseestyling/embed/
8. https://calendly.com/api/booking/event_types/lookup?event_type_slug=freestyleresetcall&profile_slug=rachel-rbstyling
9. https://opendata.cro.ie/api/3/action/datastore_search?resource_id=3fef41bc-b8f4-4b10-8434-ce51c29b1bba&q=blanckensee
10. https://www.linkedin.com/company/rachel-blanckensee-styling
11. https://wwd.com/business-news/business-features/stylists-launch-anywear-on-demand-styling-app-1239176676/
12. https://www.irishexaminer.com/lifestyle/fashionandbeauty/arid-41840238.html
13. https://www.arnotts.ie/whats-on/store-services/personal-shopping/
14. https://www.thebicestercollection.com/kildare-village/en/services/personal-shopping
15. https://www.instagram.com/houseofcolour_mariamacklin/embed/
16. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Frbstyling.ie%2F (tools/eu-view.py)
17. https://news.google.com/rss (tools/news.py, company, person, region, industry, control)
18. full numbered list of 108 sources in /tmp/claude-0/agents/b15_E/rachel_blanckensee.md
pains: 6 judged. (1) every paid booking, voucher and style report starts with a form and then waits on her by hand, CHOSEN. (2) reach, 306 Instagram followers and still images only against reels at Irish peers, real but she posts weekly and well. (3) the paid booking path is an enquiry form, part of (1). (4) free personal shopping at Arnotts and Kildare Village plus AI colour apps pressing on her prices, not ours to fix. (5) website, modern and well kept, nothing. (6) GDPR, Squarespace consent with reject, clean
chosen: (1), costliest and hottest, it sits on every euro she earns, it grows with the online report she just pushed on 8 Oct with a launch price, and gift vouchers and gift reports head into their busiest weeks before Christmas, all through one person
sweep website: crawl.py twice 64 URLs and site-audit.js screenshots of https://www.rbstyling.ie/ , modern Squarespace build, five dated blog posts, a live unlinked placeholder page /all-services-1 titled "All Services OLD", not chosen, a favour at most
sweep gdpr: tools/eu-view.py from Stockholm on https://rbstyling.ie/ , 2 first party crumb cookies, a Google Analytics request with no GA cookie, Squarespace banner with Decline all in the screenshot, clean, not chosen
sweep apps: https://www.rbstyling.ie/gift-vouchers and https://www.rbstyling.ie/personalised-virtual-style-report run form, Revolut link, then a manual email within 24 to 48 hours, and Book Now on https://www.rbstyling.ie/in-person-style-packages is an enquiry form, CHOSEN
sweep social: tools/social-audit.js opened https://www.instagram.com/rachelblanckenseestyling/ 306 followers, 77 posts, newest 2026-10-07, last six all still images, Facebook 62 followers, peers MoStyle 2,286, Maria Macklin 15,746, Jess Colivet 41,701 via embed, not chosen, she posts weekly
sweep squad: a one woman styling business per https://www.rbstyling.ie/about-me , builds no software, not applicable
thread: problem bookings, vouchers and style reports all start with a form and then wait on her to send the next step | cost every order waits on her, and the more the virtual report and vouchers sell as gifts the more of her week goes on admin | offer the AI workflow that runs her orders | link order
lead read: Rachel reads that every booking, voucher and style report on her site stops at a form until she sends the next step, so each order waits on her and gift season piles that admin onto her week, and gets offered the AI workflow that runs her orders, one thread
claims:
your bookings start with a form and wait on you, https://www.rbstyling.ie/in-person-style-packages Book Now links to /in-person-style-packages#readytogetstarted, "Just fill out the form below and I'll get back to you as soon as I can", crawled twice 2026-10-11
your vouchers start with a form and wait on you, https://www.rbstyling.ie/gift-vouchers "Fill in the gift voucher form below", "You'll be taken to a secure Revolut payment link", "Please allow up to 48 hours for your voucher to be prepared and sent"
your style reports start with a form and wait on you, https://www.rbstyling.ie/personalised-virtual-style-report "Fill in the form below with your details", "you'll receive a link within 24 hours to complete the Personal Style Reflection Questionnaire", "Please allow up to one week to receive your report"
INFERENCE, every order waits on you and your week likely goes on admin, rests on the three manual steps above and the one person business on https://www.rbstyling.ie/about-me and https://www.linkedin.com/company/rachel-blanckensee-styling (1 employee), worded "likely"
selling the virtual style report and vouchers as gifts, https://www.rbstyling.ie/personalised-virtual-style-report "Purchase a Personalised Virtual Style Report (For you or as a gift)" and https://www.rbstyling.ie/gift-vouchers "Gift a Personal Styling Experience"
INFERENCE, Christmas is when gifts sell, common seasonality, no figure used, https://www.rbstyling.ie/gift-vouchers
Eten Maar credential, docs/astra-master-context.md section 2A, CEO and CMO of Eten Maar 2020 to 2024, "Founded and scaled a stroopwafel brand from zero with five relatives. Owned ... pricing, inventory and unit economics", https://www.linkedin.com/in/raka-mulya-b92885196
recheck: 2026-10-11 11:45 to 12:05 UTC, thread re pulled with control, the packages, vouchers and report pages refetched and every quoted line found again. Disproof tried, looked for any self serve booking or checkout for paid services, the only Calendly event is the free 15 minute call (has_active_payment_method false), /cart exists but no product pages in the sitemap, the Squarespace newsletter block banner "needs a storage option" is a hidden editor banner (class newsletter-form-banner--hidden), not a broken form, so it stays out. That admin eats her week is inference she can test against her own diary. Facts hold, confidence MEDIUM
```

OPENER
```
Hi Rachel, saw Rachel Blanckensee Styling, looks interesting!

However, your bookings, vouchers and style reports all start with a form and then wait on you to send the next step. This causes every order to wait on you, and your week to likely go on admin instead of styling.

Especially, when you are selling the virtual style report and vouchers as Christmas gifts, the more orders come in, the more of your week goes on admin.

I run Astra agency. We build AI workflows for brands like Unilever, AXA, Pertamina. I built a stroopwafel brand from zero with my family and ran its pricing and inventory, so I know how fast admin eats an owner's week.

Shall I send you over what the AI workflow that runs your orders looks like?
```

Red team, Rachel, run 2026-10-11 11:52 UTC, every source refetched

| Sentence | Source reopened | Tried to prove it false | Verdict |
|---|---|---|---|
| bookings, vouchers and style reports all start with a form and then wait on you | /in-person-style-packages (Book Now to #readytogetstarted, "I'll get back to you as soon as I can"), /gift-vouchers ("Fill in the gift voucher form", Revolut link, "up to 48 hours"), /personalised-virtual-style-report ("Fill in the form below", "a link within 24 hours") | probed /shop /store /book /booking /appointments /scheduling /products, all 404 with /about-me 200 as control, /cart empty, no Acuity or scheduling code in the raw HTML, the one Calendly event is the free call with no payment method | HOLDS |
| every order waits on you | same three pages, plus /events "we will email you your ticket within 24 hours" | looked for any automatic delivery, none on any of 32 pages | HOLDS, her own words give the wait |
| your week likely goes on admin instead of styling | inference | she may have help or tools we can't see | KEPT as "likely" |
| selling the virtual style report and vouchers as Christmas gifts | report page "(For you or as a gift)", vouchers page "Gift a Personal Styling Experience" | neither page says Christmas | KEPT, Christmas is our framing of a gift product in October, flagged to Raka |
| Eten Maar credential | docs/astra-master-context.md 2A, pricing and inventory | "how fast admin eats an owner's week" is an opinion, not a claim about her | HOLDS |
| her verb | she writes "I'll get back to you", "allow up to 48 hours" | we say "wait on you to send the next step", never slow or late | HOLDS |
| killed before drafting | the "newsletter signup form needs a storage option" text on every page | it sits in class newsletter-form-banner--hidden, an editor only banner, the form has an id and a /pdf-delivery redirect | NOT USED |

### Paul Barnes, Welling United Football Club, ctc_wRuu8puzBRRBgNCyC

```gate
lead: Paul Barnes, Chief Executive Officer of Welling United Football Club (Welling United Football Club C.I.C., Companies House 08055420), ctc_wRuu8puzBRRBgNCyC, leadId lea_ukF49gNdwuf9sJpNW, campaign v0.1 cam_PryZp5LuvQv8NznHh. CEO since 31 Oct 2025 per https://wellingunited.com/2025/10/wings-appoint-paul-barnes-as-ceo/ , named "Chief Executive Officer: Paul Barnes" on https://wellingunited.com/club/staff/ and signing the 1 Oct 2026 statement as CEO. He is NOT an owner or director. Owner and Chairman is Howard William Prosser, PSC 50 to 75% of the CIC (https://find-and-update.company-information.service.gov.uk/company/08055420/persons-with-significant-control), 76% per the club's own Rule 2.15 notice, minority XP Investments Group Limited 20%. Directors Matthew Mein and Howard Prosser. CEO meets Raka's bar (tools/owner_title_rule.py), the owner holds the budget. Tagline "Sport & Active Life Engagement Manager, University of Greenwich" is a current day job. Thread pulled 2026-10-11 ~11:05 and ~11:45 UTC, 0 activities, nextPage null, control 2 items same minute, sentOnly shows only our 2026-09-29 connect note, lastRepliedAt null
site pass 1: 150 URLs by bin/listcrawl.py from the WordPress sitemaps (67 static pages, staff and tables plus the 83 newest 2026 posts), every page text read. The plain crawl.py run stalled in 2022 news and is kept aside, not counted
site pass 2: 152 URLs, second full read of the same list plus the CEO appointment and the October 2025 statement, site-audit.js desktop and phone screenshots of home, tickets, advertising and sponsorship, and the 3 June sponsorship post opened, render trusted, 0 failed requests, and pages 1, 3, 5, 6 and 22 of the sponsorship pack rendered and looked at
deep analysis: A step three club, relegated from National League South in 2025, survived its first Isthmian season in April 2026 and now sits second in the Isthmian Premier. Off the pitch it is a volunteer club in a "new era", a rebrand, stadium naming by Anthony Martin, a new supporters group, new ticketing with Total Tickets, hospitality with Gulens booked through a Microsoft Form, season tickets through a Microsoft Form, sponsorship sold by email to sales@. The staff page lists no commercial role. The sponsorship pack linked from the 3 June post is a 22 page template whose 16 board prices all read "£XX per month" and whose contact page reads "please contact XXX on telephone number XXXXXXXXX". The front of shirt sponsor came back on the market on 31 July and Radio Wings sought a sponsor through a gmail address
owner linkedin: Howard Prosser, the owner, not the contact. Route 1 not tried by curl, no profile URL on the site. Route 2 web search found the club's own pages only. Route 3 posts search nothing. Route 4 Companies House officers and PSC pages for 08055420, 16273938 and 17207091. Route 5 club page, the 18 May 2026 WingsTV interview post and the 8 Aug Britannia Bullion post quoting him as "Chairman & Owner". Route 6 the club's Rule 2.15 ownership notice on https://wellingunited.com/club/staff/
contact linkedin: Paul Barnes. Route 1 curl https://www.linkedin.com/in/paul-barnes-37681148 999 and WebFetch 999. Route 2 web search "Paul Barnes" Welling United chief executive, club appointment and Kentish Football. Route 3 site:linkedin.com/posts search, nothing indexed. Route 4 Companies House, not an officer of any of the three Welling companies. Route 5 company page https://www.linkedin.com/company/wellingunited via tools/social-audit.js, walled, UNKNOWN. Route 6 his own words, programme notes 7 Nov 2025, CEO interview 31 Oct 2025, supporter statement 1 Oct 2026, lemlist summary
google news: tools/news.py en 2026-10-11 ~11:10 UTC, "Welling United" 100 (southlondon.co.uk 2026-10-06 top spot, Kent Online 2026-10-06, Isthmian 2026-10-11 Chris Harris signing, London Now 2026-10-10), "Paul Barnes" 100 none his, control Tesco 100
regional news: tools/news.py (Bexley OR Welling OR Kent) non-league football club, 100, Ebbsfleet suspended over a tax bill and reinstated (BBC 2026-09-02), Kent Live 2026-09-01 club plans after promotion, all opened at source
industry news: tools/news.py non-league football club, 100, BBC 2026-10-07 on social media growing non-league interest, Gateshead takeover (Non-League Paper 2026-10-09) after staff went unpaid (talkSPORT 2026-10-04), Durex sponsoring Woodley United (Creative Salon 2026-10-09)
sources:
1. https://media.touchlinefc.co.uk/wellingunited/2026/06/03125932/WELLING-UNITED_SPONSORSHIP-PACK.pdf
2. https://wellingunited.com/2026/06/sponsorship-packages-2026-27/
3. https://wellingunited.com/commercial/opportunities/
4. https://wellingunited.com/club/staff/
5. https://wellingunited.com/2025/10/wings-appoint-paul-barnes-as-ceo/
6. https://wellingunited.com/2025/11/from-the-ceo-i-am-confident-we-can-build-something-successful-for-everyone-connected-to-the-club/
7. https://wellingunited.com/2026/07/club-news-kit-sponsorship-opportunity-2026-27/
8. https://find-and-update.company-information.service.gov.uk/company/08055420/persons-with-significant-control
9. https://find-and-update.company-information.service.gov.uk/company/08055420/officers
10. https://touchlinefc.co.uk/?ref=welling-united
11. https://www.instagram.com/wellingunited/embed/
12. https://ghostoftomjoad.substack.com/p/on-a-wing-and-a-prayer
13. https://www.kentonline.co.uk/thanet/sport/weekend-round-up-as-wings-hit-summit-345879/
14. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fwww.wellingunited.com%2F (tools/eu-view.py)
15. https://news.google.com/rss (tools/news.py, company, person, region, industry, control)
16. full numbered list of 215 sources in /tmp/claude-0/agents/b15_E/paul_barnes.md
pains: 7 judged. (1) sponsorship, the club's main lever off the pitch, sold from a pack with no prices and no contact and no commercial role on the staff page, CHOSEN. (2) ground safety works waiting on FA and PPBF funding, real and big, not ours. (3) ticket pages that contradict each other, a Touchline tweak. (4) volunteer gaps, the programme editor quit in August, since resumed. (5) website, Touchline runs it for sponsors already, incumbent. (6) social, 11,428 Instagram and daily posting, strong. (7) GDPR, no privacy link while Microsoft Forms collect fan data, small
chosen: (1), costliest and hottest, the CEO's own goal is a more sustainable model off the pitch, October away games already cut income per his own notes, and every one of the 16 boards across Park View Road and the new academy site carries a placeholder price this season
sweep website: listcrawl twice 150 and 152 URLs and site-audit.js screenshots of https://wellingunited.com/ , a Touchline site at £99 to £129 a month built to promote sponsors per https://touchlinefc.co.uk/?ref=welling-united , /tickets/ says no online sales while Total Tickets launched 4 Aug, incumbent, not chosen
sweep gdpr: tools/eu-view.py from Stockholm on https://www.wellingunited.com/ 0 cookies, only Fathom, YouTube thumbnails and Touchline media, no privacy link on any page (control found one on a synthetic page), Microsoft Forms for season tickets and WSG1963, small, flagged only
sweep apps: sponsorship by email to sales@ on https://wellingunited.com/commercial/opportunities/ , pack at £XX on https://media.touchlinefc.co.uk/wellingunited/2026/06/03125932/WELLING-UNITED_SPONSORSHIP-PACK.pdf , hospitality and season tickets through Microsoft Forms, CHOSEN as the AI sponsorship workflow
sweep social: tools/social-audit.js opened https://www.instagram.com/wellingunited/ 11,428 followers newest 2026-10-10, YouTube 1.67k and 712 videos, TikTok 1,754, Facebook 452, posting every matchday, not chosen
sweep squad: a volunteer football club per https://wellingunited.com/club/community/volunteer-with-the-wings/ , builds no software, not applicable
thread: problem the sponsorship pack prices every board at £XX and names XXX as the contact | cost the boards without a price are likely income the club never sees while it builds a more sustainable model off the pitch | offer the Welling sponsorship workflow that sells the boards | link sponsor, board
lead read: Paul reads that his own sponsorship pack shows every board at £XX with XXX as the contact, so a local business that opens it has no price and no one to call, which matters as he builds a sustainable model off the pitch, and gets offered the sponsorship workflow that sells his boards, one thread
claims:
your site's sponsorship pack still prices every board at £XX per month, https://media.touchlinefc.co.uk/wellingunited/2026/06/03125932/WELLING-UNITED_SPONSORSHIP-PACK.pdf 16 of 16 opportunities read "Opportunity price from: £XX per month" (pdftotext count 16), page 6 rendered and looked at 2026-10-11, linked "Please see the full sponsorship brochure here" from https://wellingunited.com/2026/06/sponsorship-packages-2026-27/
lists XXX as the person to call, same PDF page 22 "please contact XXX on telephone number XXXXXXXXX, or email the office via xxxxx@xxxxxxxx.xxx", rendered and looked at 2026-10-11, https://media.touchlinefc.co.uk/wellingunited/2026/06/03125932/WELLING-UNITED_SPONSORSHIP-PACK.pdf
local businesses are who you sell to, https://wellingunited.com/commercial/opportunities/ "sponsorship opportunities for local businesses, supporters and commercial partners"
building a more sustainable model off the pitch, https://wellingunited.com/2025/10/wings-appoint-paul-barnes-as-ceo/ "the club needs to come up with a more sustainable, strategic model that will help the club push forwards off the pitch" and https://wellingunited.com/2025/11/from-the-ceo-i-am-confident-we-can-build-something-successful-for-everyone-connected-to-the-club/ "develop into a more efficient model that helps us create a sustainable future"
INFERENCE, a board without a price is likely income that never reaches the club, rests on the pack above and the front of shirt sponsor back on the market on https://wellingunited.com/2026/07/club-news-kit-sponsorship-opportunity-2026-27/ , worded "likely"
Betty Blocks credential, docs/astra-master-context.md section 2A, "ICP segmentation, account selection, messaging and multi-channel outreach; automation-driven revenue workflows covering enrichment, scoring, routing and follow-up loops", https://www.linkedin.com/in/raka-mulya-b92885196
recheck: 2026-10-11 11:45 to 12:05 UTC, thread re pulled with control, the PDF re downloaded and the £XX count and page 22 text found again, the 3 June post still links it, the staff page and both CEO pieces refetched. Disproof tried, searched every crawled page for another sponsorship pack, a price list or a commercial manager, found only sales@ and a mobile on the player sponsorship page and fixed prices for match, matchball and player sponsorship, so the message speaks only of the pack's boards. Whether the club now sends a priced pack by email is unknown. The owner holds the money, a CIC on micro accounts, confidence MEDIUM
```

OPENER
```
Hi Paul, saw Welling United, looks interesting!

However, your site's sponsorship pack still prices every board at £XX per month and lists XXX as the person to call. This causes local businesses who'd sponsor to open it and find no price and no one to call.

Especially, when you are building a more sustainable model off the pitch, the boards without a price are likely income that never reaches the club.

I run Astra agency. We build AI workflows for brands like Unilever, AXA, Pertamina. I built the outreach and follow up workflows for target accounts at Betty Blocks, so I know how a list of local businesses becomes signed sponsors.

Shall I send you over what the Welling sponsorship workflow that sells your boards looks like?
```

Red team, Paul, run 2026-10-11 11:53 UTC

| Sentence | Source reopened | Tried to prove it false | Verdict |
|---|---|---|---|
| your site's sponsorship pack still prices every board at £XX per month | PDF downloaded again, byte identical, pdftotext 16 of 16 "£XX per month", page 6 rendered, the 3 June post still links it | searched all 152 crawled pages for another pack or a board price list, none. Match, matchball and player sponsorship do carry prices on their own pages, so the sentence stays about the pack's boards | HOLDS |
| lists XXX as the person to call | page 22 text and render, "please contact XXX on telephone number XXXXXXXXX" | none | HOLDS |
| find no price and nobody to contact (first wording) | the 3 June post itself says "contact our commercial team at sales@wellingunited.com" | FALSE as worded, the post gives an email | REWRITTEN to "open it and find no price and no one to call", true of the pack |
| local businesses who'd sponsor | /commercial/opportunities/ "local businesses, supporters and commercial partners" | none | HOLDS |
| building a more sustainable model off the pitch | CEO appointment 31 Oct 2025, programme notes 7 Nov 2025, both refetched | nearly a year old, but the 2026 rebrand, the "new era" pack and the WSG1963 text ("growth, sustainability") still say it | HOLDS |
| boards without a price are likely income that never reaches the club | inference | Britannia Bullion already holds Main Stand and end branding (8 Aug post), so some boards are sold | KEPT as "likely", about the unsold ones only |
| Betty Blocks credential | 2A, "multi-channel outreach", "follow-up loops" | none | HOLDS |
| who decides | Companies House PSC, Prosser 50 to 75%, the club says 76% | Paul isn't an owner or director | FLAGGED, not in the message |

### Valeska Schaaf, mellem, ctc_WpKsdd4RfAzAcXTkf

THREAD IS LIVE, NOT A COLD LEAD. She replied 2026-10-09 12:27 UTC "Hi Raka, Thank you for reaching out! Happy to connect and exchange thoughts on growing businesses :)" and we answered 12:58 UTC "Hi Valeska, likewise! Mellem looks really interesting not going to lie!". Re pulled 2026-10-11 ~11:45 UTC, 2 items, nextPage null, nothing new from her. Statutory, mellem GmbH, Amtsgericht Hamburg HRB 196135, registered 18 Dec 2025, sole Geschäftsführerin Valeska Schaaf, 2 shareholders (https://www.northdata.com/mellem%20GmbH,%20Hamburg/Amtsgericht%20Hamburg%20HRB%20196135). The question rests on her own words in https://www.linkedin.com/posts/mellem-io_deathtech-grief-breakthetaboo-activity-7511400346909339648-8Fbn "mellem only works if it works for both sides: for families and for the people who support them". Full research in /tmp/claude-0/agents/b15_E/valeska_schaaf.md.

REPLY
```
Since you mentioned exchanging thoughts on growing businesses, I'm curious about one thing with mellem. I'd guess the tricky part is getting both sides on board, the families and the cemeteries. Which one's been harder so far?
```

Red team, Valeska, run 2026-10-11 11:45 to 11:55 UTC

| Sentence | Source reopened | Tried to prove it false | Verdict |
|---|---|---|---|
| Since you mentioned exchanging thoughts on growing businesses | her 9 Oct 12:27 UTC message, verbatim "exchange thoughts on growing businesses", thread re pulled 11:45 UTC | none | HOLDS, her own verb |
| getting both sides on board, the families and the cemeteries | mellem LinkedIn 1 Oct 2026 post "mellem only works if it works for both sides: for families and for the people who support them" | "the people who support them" also means funeral homes, stonemasons and florists, not only cemeteries | KEPT as "I'd guess", their cemetery search, grave renewal and the Fachgruppe Friedhof make cemeteries the side the product needs first |
| one question only | the draft | no pitch, no credential, no link, no claim about her site | HOLDS |
