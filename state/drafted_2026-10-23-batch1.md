# Drafts, 2026-10-23, batch 1 of Raka's angle calls. NOT SENT, waiting on Raka's word

Raka, 2026-10-23, word for word: "lupo -> website to have more sales, more professional / aiden -> mor eprof website and
theirf website is expired / bebetter -> more professional website that makes more sales / averitopia -> website to get
more idk, its a shitty one page wbeiste / at home stays -> better website to have more bookings". Julien Facchini is out,
"competitor so lets not do it".

All five threads pulled 2026-10-23 12.47 UTC with `tools/lemlist.py thread`, control ctc_ch3vFcKAkjQdMKDCg 6 items.
Aiden, Tom, Tatiana and Laurens 0 items each. Lupo 2 items, his "happy to connect Raka :) what are you into?" and our
13 Oct answer ending "How's the Luminous Vest coming along?", unanswered, so his is the warm SKETCH. Re pull every thread,
run the four way never messaged check and reopen every claim in the minute before any send.

Evidence folder /tmp/claude-0/agents/b40 (crawls, site audits, renders, EU views, social audits, news, LinkedIn pages).

### Aiden Moore, Sherwood Villa Sauce, ctc_HzPuRCz7vMqinmXQ8

> NOT SENT. Flags for Raka. (1) The newest public sign of the business is his own January 2026 post. If he has paused
> the sauces, the expired site is why, and he may answer that. (2) He works at Hafren Fasteners as his day job (his
> headline), the sauces are his own self employed business, which is why Companies House has nothing.

```gate
lead: Aiden Moore, owner of Sherwood Villa Sauce, "a family-run artisan producer in Newtown, Powys", self employed, founded 2025, 1 employee (https://www.linkedin.com/company/sherwood-villa-sauce read 2026-10-23 ~09.55 UTC, which lists him under Employees and gives its website as Www.sherwoodvillasauce.co.uk). lemlist jobTitle Business Owner, companyName Sherwood Villa Sauce, location Newtown, Powys. His tagline names his job, "Security Fastener Specialist | Hafren Fasteners", the business he holds a job at, separate from the one he owns. Companies House search "sherwood villa sauce" and "sherwood villa" 2026-10-23, no such company, consistent with a self employed business. ctc_HzPuRCz7vMqinmXQ8, leadId lea_cesNqXSgCvTBt7wiY, campaign W1b cam_7gnHSf6GvvGy8gH3n, accepted 2026-10-23 07.21 UTC. Thread 0 items, control 6
site pass 1: 1 page, https://www.sherwoodvillasauce.co.uk/ returns 404 with Squarespace's "Website Expired" page (curl 2026-10-23 ~09.40 UTC), nothing else to crawl
site pass 2: 1 page, second read by tools/fetch-walled.py, a different TLS fingerprint, same "Squarespace - Website Expired" title (3,177 bytes), and http://sherwoodvillasauce.co.uk/ redirects to the same 404. Control, a live Squarespace site https://almanomadastudio.com/ 200 with its own title the same minute, so the expired page is theirs, not our fetch
deep analysis: A one man small batch sauce maker in Newtown, Powys, run beside a day job. His own January 2026 post on the company page set the year's goals, "Finalise our improved Jerk Sauce recipe", "Launch two new sauce flavours", "Partner with a UK delivery provider to enable wider shipping", "Roll out an improved website for a smoother customer experience", "Create a marketing plan and stockist pack to support our retail partners", "Finalise our 2026 food fair set list so people know where to find us". The website is now Squarespace's expired notice, so there's no shop, no product page and no stockist list online at all. A web search finds the site's old snippet ("explosive homemade sauces", a jerk sauce) and nothing else of his
owner linkedin: Route 1 tools/fetch-walled.py https://www.linkedin.com/in/aiden-moore-202297145 , no title or description, walled. Route 2 web search "Aiden Moore" Hafren Fasteners Newtown, nothing of his. Route 3 web search "Sherwood Villa Sauce" and "sherwoodvillasauce" instagram facebook tiktok, only the old site snippet, no account found, so no handle is used. Route 4 Companies House, no company, self employed. Route 5 the company page https://www.linkedin.com/company/sherwood-villa-sauce rendered signed out, 8 followers, posts at 9, 10 and 11 months, the newest the 2026 goals post. Route 6 the web archive for the old site, https://web.archive.org/cdx/search/cdx?url=sherwoodvillasauce.co.uk* , connection reset and "upstream request failed" with the example.com control failing the same way, walled on our side
contact linkedin: same person, the lemlist record, the company page's employee list and his location agree
google news: tools/news.py en 2026-10-23, "Sherwood Villa Sauce" 0, control Tesco 100. "Aiden Moore Newtown" 503 then "Aiden Moore Powys" 0 with its control at 503, rate limited, walled
regional news: tools/news.py (Powys OR Newtown) (hot sauce producer Wales) 0, control 100
industry news: tools/news.py hot sauce producer Wales, 11, "Welsh-Jamaican food producer gets backing to expand production" (Nation.Cymru 11 Aug 2026) and "Caribbean hot sauce producers warn of shortages and higher prices" (BBC 31 May 2026), plus Welsh peers Chilli of the Valley (https://foodinnovation.wales/directory-entry/chilli-of-the-valley/) and Pembrokeshire Chilli Farm sold through a Welsh food shop (https://www.blasarfwyd.com/)
sources:
1. https://www.sherwoodvillasauce.co.uk/
2. https://www.linkedin.com/company/sherwood-villa-sauce
3. https://www.linkedin.com/in/aiden-moore-202297145 (walled)
4. https://find-and-update.company-information.service.gov.uk/search/companies?q=sherwood+villa+sauce
5. https://almanomadastudio.com/ (Squarespace control)
6. https://foodinnovation.wales/directory-entry/chilli-of-the-valley/
7. https://www.blasarfwyd.com/blas-ar-fwydwelsh-and-world-foods/blaslynnau-condiments/sawsiaur-bwrdd-table-sauces/pembrokeshire-chilli-farm-reapers-creepers-sauce-140ml
8. https://fastenerandfixing.com/insight/hafren-expands-to-meet-growing-demand-for-security-fasteners
9. https://news.google.com/rss (tools/news.py, Nation.Cymru 11 Aug 2026, BBC 31 May 2026)
10. https://web.archive.org/cdx/search/cdx?url=sherwoodvillasauce.co.uk* (walled)
pains: 4 judged. (1) the website has expired, so nobody can find the sauces, order or see stockists online, CHOSEN. (2) no UK delivery partner yet, his own goal, folded into the offer. (3) no stockist pack, his own goal, folded into the offer. (4) social presence unknown, no handle could be tied to him, not used
chosen: (1), biggest and hottest, it's the one thing that stops every other goal he set for 2026, and it's the exact thing he named, "an improved website"
owner reply: "I let the site go, I mostly sell at food fairs" | removed on purpose | his own January 2026 post on https://www.linkedin.com/company/sherwood-villa-sauce lists "Roll out an improved website for a smoother customer experience" and "Partner with a UK delivery provider to enable wider shipping" as goals for the year, and the same page still gives Www.sherwoodvillasauce.co.uk as the website
worth: €2,500+, a new Sherwood Villa Sauce site with an online shop, UK delivery set up, a stockist page with a downloadable stockist pack and a food fair calendar
sweep website: the domain shows Squarespace's Website Expired page, checked two ways with a live Squarespace control, CHOSEN
sweep gdpr: nothing to scan, the expired notice is Squarespace's own page, so no cookie or tracker finding exists, never the angle (RULES 0E)
sweep apps: a one man sauce maker, the jobs that matter are selling and delivery, both folded into the site offer, no separate tool
sweep social: tools/social-audit.js --urls https://www.linkedin.com/company/sherwood-villa-sauce , 8 followers, no other account could be tied to him by search, so none is named
sweep squad: a one man food producer, not a builder of software, not chosen, per the LinkedIn company page
thread: problem your website now shows Squarespace's Website Expired page instead of your sauces | cost someone who tastes your jerk sauce at a food fair and looks you up later likely can't find a way to order | offer a new Sherwood Villa Sauce site with an online shop, UK delivery and a page for stockists | link sauce, site
lead read: Aiden reads that his site has expired, so people who taste his sauce at a fair can't order afterwards, and gets offered a new site with a shop, delivery and stockists, one thread
claims:
your website now shows Squarespace's Website Expired page, https://www.sherwoodvillasauce.co.uk/ 404 "Squarespace - Website Expired", read by curl and by tools/fetch-walled.py 2026-10-23, control https://almanomadastudio.com/ 200
jerk sauce, https://www.linkedin.com/company/sherwood-villa-sauce his post "Finalise our improved Jerk Sauce recipe"
food fair, https://www.linkedin.com/company/sherwood-villa-sauce his post "Finalise our 2026 food fair set list so people know where to find us"
INFERENCE, someone who tastes it at a fair and looks him up likely can't find a way to order, rests on https://www.sherwoodvillasauce.co.uk/ expired and the food fair goal on https://www.linkedin.com/company/sherwood-villa-sauce , worded likely
websites credential, docs/astra-company-profile.md, Raka's fixed brand line, https://www.linkedin.com/in/raka-mulya-b92885196
recheck: 2026-10-23 12.46 UTC, the domain refetched by curl, 404 "Squarespace - Website Expired" 3,177 bytes, with https://almanomadastudio.com/ 200 and https://example.com/ 200 as controls in the same run. Disproof tried, http and www variants (same 404), a search for any other shop or Etsy or Instagram of his (none found), Companies House for a company under another name (none), and the possibility the business stopped (his newest post is the goals post, so that risk is flagged to Raka, not hidden). Facts hold, confidence MEDIUM, because the business's current activity can't be seen
```

SKETCH
```
Hi Aiden, Sherwood Villa Sauce looks cool!

However, your website now shows Squarespace's Website Expired page instead of your sauces. So someone who tastes your jerk sauce at a food fair and looks you up later likely can't find a way to order.

I'd suggest a new Sherwood Villa Sauce site with an online shop, UK delivery and a page for stockists.

At Astra agency we make websites for brands like Unilever, AXA, Pertamina.

Shall I send you a sketch of the new Sherwood Villa Sauce site?
```

### Tom Franckaert, At Home Stays Leeds, ctc_Ftk7LZoKmetCxFDYh

> NOT SENT. Flags for Raka. (1) My first angle was wrong and is out. The house pages DO have a live Smoobu availability
> calendar, so "Check Availability leads to a form" would have been false. (2) What's left is how the site looks to a
> UK crew booker, a phone first screen that's only the logo, and Dutch on the forms and in some page titles. That's
> the honest version of "better website for more bookings". (3) Tom is Dutch, the Dutch lines come from the builder's
> language setting, so the message names them plainly and doesn't make a thing of it.

```gate
lead: Tom Edwin Annie Franckaert, director of AT HOME STAYS LTD (16368875), incorporated 2025-04-07, appointed 2025-04-07, Dutch, lives in the Netherlands, identity verified (https://find-and-update.company-information.service.gov.uk/officers/qynaZdPho22D0Ii11OVSnIyVgXw/appointments read 2026-10-23 ~10.00 UTC). lemlist jobTitle Owner, tagline "Your team deserves more than a hotel room. Group accommodation in Leeds from £30pp/night. 4.8★ | 200+ guests hosted." ctc_Ftk7LZoKmetCxFDYh, leadId lea_PpHqfMjJMBk84dR7m, campaign W1b cam_7gnHSf6GvvGy8gH3n, accepted 2026-10-23 06.30 UTC. Thread 0 items, control 6
site pass 1: 88 URLs, tools/crawl.py on https://athomestays.co.uk , 82 at 200, the rest 404 or failed, about 33 pages and 46 blog posts, every page read
site pass 2: 88 URLs, second crawl, plus the house and service pages read through tools/fetch-walled.py because GoDaddy builds the text in the browser and our Chromium got connection resets on them, desktop screenshot of the home (b40-athomestays-desktop.png) and a real phone screenshot (b40-athomestays-phone.png), opened
deep analysis: Whole houses for contractor crews and project teams in Leeds, "Each house sleeps up to 11", "From £30 per person per night, all bills included", "Weekly or monthly stays, one invoice, no VAT", buttons GET A QUOTE and CALL TOM. Two named houses, The Gather House (6 bedrooms) and The Orchid House (4 bedrooms), each with a Smoobu availability calendar (login.smoobu.com/en/cockpit/widget/single-calendar, in the page HTML) and a "Drop us a line!" form. About 33 landing pages for contractors, NHS staff, insurance claims, relocation and each Leeds area, plus 46 blog posts written for contractor searches. The site is a GoDaddy Website Builder site set to Dutch, every page fetched declares lang nl-NL (6 of 6), the forms end "Deze site wordt beschermd via reCAPTCHA en het Privacybeleid en de Servicevoorwaarden van Google zijn van toepassing" (3 of 3 form pages fetched), the overflow menu reads "Meer", and two page titles are Dutch, "Privacybeleid - At Home Stays" and "Aannemer Comfort Pakket". On a phone the whole first screen is the logo on white, then the cookie bar
owner linkedin: Route 1 tools/fetch-walled.py https://www.linkedin.com/in/tom-franckaert , 1,530 bytes, auth wall. Route 2 web search "Tom Franckaert" Leeds accommodation, nothing of his. Route 3 the company page posts below. Route 4 Companies House, director of At Home Stays Ltd, Tof Invest Limited and Orange Keys Developments Limited. Route 5 the company page https://www.linkedin.com/company/at-home-stays-leeds rendered signed out, 366 followers, a post three weeks ago on the Bank of England's Capitol House build bringing specialist trades into Leeds, "If your team is heading to Leeds, drop us a message", and one eight months ago, "We just secured a full-month booking". Route 6 the site's own Meet the Team page, fetched, its text is built in the browser and didn't come through
contact linkedin: same person, the Companies House director record and the lemlist record agree
google news: tools/news.py en 2026-10-23, "At Home Stays Leeds" 0, "Tom Franckaert" 0, control Tesco 100
regional news: tools/news.py (Leeds) (contractor accommodation UK), 429 rate limited, walled, the Leeds construction pipeline comes from his own post instead
industry news: tools/news.py contractor accommodation UK, 65, housing workers for big builds (Construction News 2 Oct 2026, Jersey's £710m build) and contractor failures (Housing Today 30 Jul 2026, Torsion Construction), plus two Leeds competitors, RentaStay (https://rentastay.co.uk/contractor-accommodation-in-leeds , enquiry for real availability) and Comfy Workers (https://www.comfyworkers.com/en/insights/construction-project-accommodation/what-is-contractor-accommodation-and-how-does-it-work-in-the-uk , a shortlist within an hour)
sources:
1. https://athomestays.co.uk/
2. https://athomestays.co.uk/the-orchid-house
3. https://athomestays.co.uk/the-gather-house-1
4. https://athomestays.co.uk/contractor-accommodation
5. https://athomestays.co.uk/contractor-comfort-pack
6. https://find-and-update.company-information.service.gov.uk/officers/qynaZdPho22D0Ii11OVSnIyVgXw/appointments
7. https://www.linkedin.com/company/at-home-stays-leeds
8. https://rentastay.co.uk/contractor-accommodation-in-leeds
9. https://www.comfyworkers.com/en/insights/construction-project-accommodation/what-is-contractor-accommodation-and-how-does-it-work-in-the-uk
10. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fathomestays.co.uk%2F
11. https://www.tiktok.com/@athomestaysleeds
12. https://news.google.com/rss (tools/news.py)
13. https://www.linkedin.com/in/tom-franckaert (walled)
pains: 5 judged. (1) the site doesn't look like an established crew housing firm to a UK site manager, a logo only first screen on a phone and Dutch on the forms and in titles, CHOSEN. (2) "Check Availability" leading to a form, DROPPED, a live Smoobu calendar sits on both house pages. (3) only two houses shown, a capacity question, not ours. (4) social small, TikTok 16 followers, Facebook 11, not chosen. (5) GDPR, Google consent mode on the page, EU view 5 first party cookies, never the angle
chosen: (1), hottest, his own post shows him chasing crews for the Leeds construction pipeline right now, and the first thing those bookers see on a phone is a logo and then Dutch on the form
owner reply: "Most of our bookings come by phone and WhatsApp anyway" | a model, not a gap | his own homepage puts GET A QUOTE beside CALL TOM and every house page carries a booking calendar and a form (https://athomestays.co.uk/the-orchid-house), and his LinkedIn post sends crews to message him, so the site is where bookings start
worth: €3,000+, a new At Home Stays site built for crew bookings, each house with photos, beds and its availability up front, a quote to booking flow with one invoice to the company, English throughout, kept on his calendar
sweep website: crawled twice, house pages read the second way, phone and desktop screenshots, logo only first screen and Dutch on forms and titles, CHOSEN
sweep gdpr: tools/eu-view.py from Stockholm, 5 first party cookies (dps_site_id, _tccl_visitor, _tccl_visit, _scc_session, FCCDCF), Google consent mode in the HTML, checked, never the angle (RULES 0E)
sweep apps: bookings already run through a Smoobu calendar per the house pages, a booking flow is folded into the site offer, no separate tool
sweep social: tools/social-audit.js, TikTok https://www.tiktok.com/@athomestaysleeds 16 followers, Facebook 11 followers, LinkedIn company 366 followers and active, not chosen
sweep squad: a crew accommodation business, not a builder of software, not chosen, per Companies House and the site
thread: problem your website opens on a phone with just your logo on a white screen, and your forms sign off in Dutch | cost a site manager booking a crew likely books a provider that looks more established | offer a new At Home Stays site where a crew booker sees each house, its beds and dates from the first screen, English throughout | link site, crew
lead read: Tom reads that on a phone his site shows only the logo and his forms end in Dutch, so crew bookers likely go elsewhere, and gets offered a new site that shows each house and dates first, in English, one thread
claims:
your website opens on a phone with just your logo on a white screen, b40-athomestays-phone.png, site-audit.js on https://athomestays.co.uk/ 2026-10-23 at 390 wide, the first screen is the menu icon and the logo, then the cookie bar
your forms sign off in Dutch, https://athomestays.co.uk/the-orchid-house , https://athomestays.co.uk/the-gather-house-1 and https://athomestays.co.uk/contractor-accommodation each end their form with "Deze site wordt beschermd via reCAPTCHA en het Privacybeleid en de Servicevoorwaarden van Google zijn van toepassing", tools/fetch-walled.py 2026-10-23
crew, https://athomestays.co.uk/ "Whole houses for contractor crews and project teams in Leeds"
INFERENCE, a site manager booking a crew likely books a provider that looks more established, rests on the two facts above and on https://rentastay.co.uk/contractor-accommodation-in-leeds , worded likely
websites credential, docs/astra-company-profile.md, Raka's fixed brand line, https://www.linkedin.com/in/raka-mulya-b92885196
recheck: 2026-10-23 12.47 UTC, the three form pages refetched by tools/fetch-walled.py and the Dutch line found once on each (the Orchid House first came back 23 bytes, "upstream request failed", our side, and the retry returned 191,628 bytes with the line and the Smoobu calendar). Disproof tried, searched the house pages for a booking widget and found the Smoobu calendar, which killed the first angle, looked for an English version of the form text (none on the pages fetched), counted lang nl-NL on 6 of 6 pages. Facts hold, confidence HIGH on the facts, MEDIUM on the angle's pull, because competitors take bookings by enquiry too
```

SKETCH
```
Hi Tom, At Home Stays looks cool!

However, your website opens on a phone with just your logo on a white screen, and your forms sign off in Dutch. So a site manager booking a crew likely books a provider that looks more established.

I'd suggest a new At Home Stays site where a crew booker sees each house, its beds and dates from the first screen, English throughout.

At Astra agency we make websites for brands like Unilever, AXA, Pertamina.

Shall I send you a sketch of the new At Home Stays site?
```

### Tatiana Biktimirova, Averitopia, ctc_4m23egE2XeDtibgfj

> NOT SENT. Flags for Raka. (1) Averitopia isn't a registered company. Her registered company is Virtuesque Ltd, a
> clothing business (SIC 46160 and 47710), so her ownership of Averitopia rests on its LinkedIn page and her lemlist
> record. (2) It's a writing platform with 10 LinkedIn followers, so budget is the open question. (3) Her posts are
> strong opinion on the climate crisis, the message stays neutral and quotes nothing from them.

```gate
lead: Tatiana Biktimirova, founder and writer of Averitopia, "Platform for all forms of written word" (https://www.linkedin.com/company/averitopia , founded 2026, 1 employee, 10 followers, read 2026-10-23 ~12.10 UTC). Not a registered company. Companies House shows her as director of VIRTUESQUE LTD (17026379), incorporated 2026-02-11, Birmingham, SIC 46160 and 47710, clothing (https://find-and-update.company-information.service.gov.uk/company/17026379), and of the dissolved VIROVIEW LIMITED, so Averitopia is her own unregistered platform. lemlist jobTitle Founder and Writer, tagline "Artist, Fashion Designer and Writer". ctc_4m23egE2XeDtibgfj, leadId lea_2BvqWC92WPQNZfoPd, campaign W1b cam_7gnHSf6GvvGy8gH3n, accepted 2026-10-22 08.04 UTC. Thread 0 items, control 6
site pass 1: 2 URLs, tools/crawl.py on https://averitopia.com , the home and /ols/products, both the same 145 word page, every page read
site pass 2: 2 URLs, second crawl, same counts, desktop screenshot (b40-averitopia-desktop.png) and a real phone screenshot (avp-0.png), opened
deep analysis: One page on GoDaddy's free website builder. The name, then "Anthropocene Now — Obscene world by word..." over one picture of people in speech bubbles, then Contact Us with a name, email and message form and a tick box for an email list. No writing, no articles, no book, no about page. The /ols/products shop shows the same page. On desktop a GoDaddy Airo advert runs across the top, "Go from idea to live site in minutes. Get 50 free credits", and the HTML carries GoDaddy's freemium-ad block, on a phone the footer reads "Powered by GoDaddy Airo". Her LinkedIn page posts climate pieces, the newest two months ago
owner linkedin: Route 1 tools/fetch-walled.py https://www.linkedin.com/in/tatianabiktimirova , 1,530 bytes, auth wall. Route 2 web search "Tatiana Biktimirova" Averitopia writer, only other Tatianas. Route 3 tools/news.py on her name, 0 with its control at 100. Route 4 Companies House, Virtuesque Ltd and Viroview Ltd. Route 5 the company page https://www.linkedin.com/company/averitopia rendered signed out, posts two months ago on wildfires and the climate crisis. Route 6 her site, read in full
contact linkedin: same person, the company page names her as its writer and founder through the lemlist record, Companies House places her in Birmingham, the page's location
google news: tools/news.py en 2026-10-23, Averitopia 0, "Tatiana Biktimirova" 0, control Tesco 100 (second run, the first run's control failed and was discarded)
regional news: tools/news.py (Birmingham) (climate writing platform), 1, a Greater Birmingham Chambers of Commerce climate innovation call (30 Oct 2023)
industry news: tools/news.py climate fiction publishing, 37, the Climate Fiction Prize 2026 won by Helen Phillips's Hum (Yale Climate Connections 28 May 2026), finalists (The Guardian 18 Mar 2026), Cambridge University Press on climate fiction of the Anthropocene (9 Sep 2025), so readers for this writing exist and are being courted
sources:
1. https://averitopia.com/
2. https://averitopia.com/ols/products
3. https://www.linkedin.com/company/averitopia
4. https://find-and-update.company-information.service.gov.uk/company/17026379
5. https://find-and-update.company-information.service.gov.uk/officers/JZ0ReMkaQrd24062inAanUMcv04/appointments
6. https://www.linkedin.com/in/tatianabiktimirova (walled)
7. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Faveritopia.com%2F (server error on our side, walled)
8. https://news.google.com/rss (tools/news.py, Yale Climate Connections 28 May 2026, The Guardian 18 Mar 2026)
9. https://www.godaddy.com/websites/website-builder (the builder named in the footer)
10. https://www.bing.com/search?q=%22Tatiana+Biktimirova%22 (web search, other people only)
pains: 4 judged. (1) the platform for written word has no writing on it, one page, a tagline and a form, CHOSEN. (2) GoDaddy's free plan advert across the top, folded into (1) as the look. (3) 10 LinkedIn followers, an audience problem, folded into the offer's reader list. (4) GDPR, the scan failed on our side, a cookie banner shows in the screenshot, never the angle
chosen: (1), biggest, the site is the platform she describes and it holds none of it
owner reply: "It's a placeholder, I'm still writing" | just built | the LinkedIn page already presents Averitopia as a live "Platform for all forms of written word" (https://www.linkedin.com/company/averitopia) and the site sits on GoDaddy's free plan with its advert (https://averitopia.com/ HTML freemium-ad block), so the offer is the platform itself, which a placeholder still needs
worth: €2,500+, an Averitopia site built to publish, essays and stories with their own pages, a reader email list, an about page for her, on its own plan without the builder's advert
sweep website: crawled twice, desktop and phone screenshots, one page with no writing and a builder advert, CHOSEN
sweep gdpr: tools/eu-view.py failed with a server error on our side, site-audit.js from the US found 4 first party cookies and a banner with a reject, checked as far as it goes, never the angle (RULES 0E)
sweep apps: a solo writer, the job is publishing and readers, folded into the site offer, no separate tool
sweep social: tools/social-audit.js --urls https://www.linkedin.com/company/averitopia , 10 followers, no other account linked from the site
sweep squad: a solo writing platform, not a builder of software, not chosen, per the LinkedIn page
thread: problem your website is one page, the tagline over a picture and a contact form, with a GoDaddy ad across the top and none of your writing on it | cost people who read your posts likely have nowhere to read more or follow the work | offer an Averitopia site that publishes your writing, each essay and story on its own page, and grows a reader list | link writing, read
lead read: Tatiana reads that her platform for writing shows no writing and a builder's ad, so readers have nowhere to go, and gets offered a site that publishes her work and builds a reader list, one thread
claims:
your website is one page, the tagline over a picture and a contact form, https://averitopia.com/ crawled twice (2 URLs, same 145 word page), screenshots b40-averitopia-desktop.png and avp-0.png
with a GoDaddy ad across the top, https://averitopia.com/ desktop screenshot b40-averitopia-desktop.png shows "Go from idea to live site in minutes. Get 50 free credits / Start for free", and the HTML read by tools/fetch-walled.py carries "freemium-ad" and "AIRO_RENDERED"
none of your writing on it, the whole site's text is the tagline, Contact Us, the form and the footer, https://averitopia.com/ and https://averitopia.com/ols/products
INFERENCE, people who read her posts likely have nowhere to read more, rests on the LinkedIn posts at https://www.linkedin.com/company/averitopia and the site above, worded likely
websites credential, docs/astra-company-profile.md, Raka's fixed brand line, https://www.linkedin.com/in/raka-mulya-b92885196
recheck: 2026-10-23 12.46 UTC, the site refetched by tools/fetch-walled.py, 90,509 bytes, "freemium-ad" and "AIRO_RENDERED" found again. Disproof tried, looked for a blog, a book page or any article (none in either crawl), checked the shop page (same page), searched her name for writing published elsewhere (none found). Facts hold, confidence HIGH on the facts, MEDIUM on budget
```

SKETCH
```
Hi Tatiana, Averitopia looks cool!

However, your website is one page, the tagline over a picture and a contact form, with a GoDaddy ad across the top and none of your writing on it. So people who read your posts likely have nowhere to read more or follow the work.

I'd suggest an Averitopia site that publishes your writing, each essay and story on its own page, and grows a reader list.

At Astra agency we make websites for brands like Unilever, AXA, Pertamina.

Shall I send you a sketch of the Averitopia site?
```

### Laurens Van Dorp, BeBetter Official, ctc_vR5bseee3b8DtJNhv

> NOT SENT. Flags for Raka. (1) The custom work for gyms comes from his own LinkedIn headline, "Custom hoodies, tees &
> oversized apparel for gyms, boxes & studios in NL | We design it, you wear it", and the site never mentions it. (2)
> They're 21 and on the road at Europe's big fitness shows (FIBO, the EVLS PRO SHOW in Prague), so the expo is the
> moment the site gets checked.

```gate
lead: Laurens Van Dorp, co-founder of BeBetter, registered as KVK 96287071, Rotterdam, Jan van Almondenstraat, 3176VA (the shop's own terms, https://www.bebetter-officiall.com/policies/terms-of-service read in the crawl 2026-10-23). lemlist jobTitle Co-Founder, tagline "Co-Founder BeBetter | Custom hoodies, tees & oversized apparel for gyms, boxes & studios in NL | We design it, you wear it", companyHeadquarters Poortugaal. The FIBO write up says the label was "Founded during the founders' student years by two partners" (https://fragfitty.de/en/articles/fibo-2026-bebetter). The KVK search page needs a click our tools can't make, so ownership rests on lemlist, LinkedIn and the press, MEDIUM HIGH. ctc_vR5bseee3b8DtJNhv, leadId lea_XnuYmZcFtWDxeh53R, campaign W1b cam_7gnHSf6GvvGy8gH3n, accepted 2026-10-22 17.51 UTC. Thread 0 items, control 6
site pass 1: 338 URLs, tools/crawl.py on https://www.bebetter-officiall.com , 117 product URLs, 33 collections, 18 policy pages, 6 blog, 3 pages, the rest login and cart variants, every page read
site pass 2: 338 URLs, second crawl, same count, the home rendered by tools/render-via-curl.js (236 served, 0 curl errors) after site-audit.js printed RENDER NOT TRUSTED, four parts opened
deep analysis: A Shopify shop on the Horizon theme for the BeBetter line, the Teddy Builder pump covers, tees, tanks, joggers and sweatpants from about €31 to €59, "Free shipping over €100/490AED", a 4.7 Trustpilot score on 37 reviews, in English, Dutch and German with currencies for the Gulf. Across all 338 pages there's nothing for gyms, boxes or studios, no custom, bulk, team, club, logo or op maat order, while the control word teddy is on 159 pages. The site links no Instagram or TikTok. Their LinkedIn shows them at the EVLS PRO SHOW in Prague (9 Oct) and "We've never reached so many people before" (22 Oct), with another event at the end of the month, and FIBO 2026 at stand 10.2C72
owner linkedin: Route 1 tools/fetch-walled.py https://www.linkedin.com/in/laurens-van-dorp , 1,530 bytes, auth wall. Route 2 web search "Laurens van Dorp" BeBetter, a Trustpilot page for bebetterofficial.nl and nothing of his. Route 3 the company page posts below. Route 4 the shop's terms, KVK 96287071. Route 5 the company page https://www.linkedin.com/company/bebetter-official rendered signed out, 62 followers, the Prague show and the reach post. Route 6 the FIBO write up on fragfitty.de, read through tools/fetch-walled.py
contact linkedin: same person, the lemlist record and the company page agree, both founders run it per the FIBO write up
google news: tools/news.py nl 2026-10-23, "BeBetter Official" 0 and "Laurens van Dorp" 0 with the control Heineken at 100 in the first run, the second run's control failed and is discarded
regional news: tools/news.py (Rotterdam) (fitness kleding merk), 28, Rotterdam clothing brands growing through clubs and stores (Tubantia 15 Aug 2026, be:at's flagship store, CooleSuggesties 6 Dec 2025)
industry news: tools/news.py fitness kleding merk, 13, and gymwear merk, 16, new Dutch gymwear brands launching (Welingelichte Kringen 15 Jul 2025), plus the FIBO write up as trade press
sources:
1. https://www.bebetter-officiall.com/
2. https://www.bebetter-officiall.com/policies/terms-of-service
3. https://www.bebetter-officiall.com/blogs/nieuws
4. https://www.linkedin.com/company/bebetter-official
5. https://www.linkedin.com/in/laurens-van-dorp (walled)
6. https://fragfitty.de/en/articles/fibo-2026-bebetter
7. https://ca.trustpilot.com/review/bebetterofficial.nl
8. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fwww.bebetter-officiall.com%2F
9. https://www.kvk.nl/zoeken/?q=bebetter (needs a click, not read)
10. https://news.google.com/rss (tools/news.py, Tubantia 15 Aug 2026)
11. https://bebetterofficial.nl/ (refused by our network, not read)
pains: 4 judged. (1) the custom work for gyms, boxes and studios that his headline sells is nowhere on the site, CHOSEN. (2) a brand on Europe's big fitness stages on a stock theme with no social links, folded into (1) as "more professional". (3) currencies and AED in the shipping line, small. (4) GDPR, the Shopify banner covers the EU and GB, clean, never the angle
chosen: (1), costliest, a gym ordering kit for its members is a bulk order, worth far more than one hoodie, and the expo crowd is exactly who'd look them up
owner reply: "Gyms find us through Instagram and our network" | a model, not a gap | his own headline sells it publicly, "We design it, you wear it" (lemlist record, https://www.linkedin.com/in/laurens-van-dorp), and the shop https://www.bebetter-officiall.com/ links no Instagram at all, so a gym owner who lands there has no route to it
worth: €3,500+, a more professional BeBetter Shopify site with a custom kit page where gyms, boxes and studios pick pieces, add their logo and ask for a quote, plus the brand story for the expo crowd
sweep website: crawled twice, home read the second render way, no custom offer on 338 pages against a control, CHOSEN
sweep gdpr: tools/eu-view.py --shopify from Stockholm, 5 first party cookies including _fbp, the Shopify banner set for the EU countries and GB, clean for NL, never the angle (RULES 0E)
sweep apps: a custom kit request is a quote flow, folded into the site offer, no separate tool needed for a two founder brand
sweep social: tools/social-audit.js --urls https://www.linkedin.com/company/bebetter-official , 62 followers, active weekly, the shop links no Instagram or TikTok, not chosen alone
sweep squad: a clothing brand, not a builder of software, not chosen, per the KVK line in the shop's terms
thread: problem your website sells the BeBetter line, but none of its pages mention the custom hoodies and tees you design for gyms, boxes and studios | cost a gym owner who meets you at an expo like FIBO and looks you up likely never finds out you'd make theirs | offer a more professional BeBetter site that sells the line and has its own page where gyms design and order their custom kit | link gyms, custom
lead read: Laurens reads that his site never mentions the custom kit he makes for gyms, so gym owners from the expos don't find it, and gets offered a site with a custom kit page for gyms, one thread
claims:
your website sells the BeBetter line, https://www.bebetter-officiall.com/ 117 product URLs in both crawls, the second render's four parts
none of its pages mention the custom hoodies and tees for gyms, boxes and studios, https://www.bebetter-officiall.com/ 338 of 338 crawled pages with 0 hits for gyms, box, studio, team, club, bulk, logo, op maat, maatwerk or bedruk, control teddy on 159 pages, tools/crawl.py 2026-10-23
the custom hoodies and tees you design for gyms, boxes and studios, his own headline "Custom hoodies, tees & oversized apparel for gyms, boxes & studios in NL | We design it, you wear it", https://www.linkedin.com/in/laurens-van-dorp via the lemlist record
FIBO, https://fragfitty.de/en/articles/fibo-2026-bebetter "the brand presented its vision at stand 10.2C72"
INFERENCE, a gym owner who meets them at an expo and looks them up likely never finds out, rests on https://www.bebetter-officiall.com/ and https://fragfitty.de/en/articles/fibo-2026-bebetter , worded likely
websites credential, docs/astra-company-profile.md, Raka's fixed brand line, https://www.linkedin.com/in/raka-mulya-b92885196
recheck: 2026-10-23 12.48 UTC, the term search rerun over the second crawl (338 pages, 0 hits, teddy on 159), and the live home, news and contact pages in English, Dutch and German refetched by curl, 10 pages, all 200, 0 hits for gyms, custom, bulk, op maat, maatwerk, bedruk or wholesale, teddy on the home 17 times. Disproof tried, searched every page in English, Dutch and German words for a custom or team offer (none), looked for a second domain for custom work (bebetterofficial.nl, refused by our network, so unknown, not used), checked the gym hits in context (product copy about wearing it to the gym). Facts hold, confidence HIGH
```

SKETCH
```
Hi Laurens, BeBetter looks cool!

However, your website sells the BeBetter line, but none of its pages mention the custom hoodies and tees you design for gyms, boxes and studios. So a gym owner who meets you at an expo like FIBO and looks you up likely never finds out you'd make theirs.

I'd suggest a more professional BeBetter site that sells the line and has its own page where gyms design and order their custom kit.

At Astra agency we make websites for brands like Unilever, AXA, Pertamina.

Shall I send you a sketch of the new BeBetter site?
```

### Lupo Benatti, BWILD, ctc_rX4RpJcZ5AqviHsiN

> NOT SENT. Warm chat, his "what are you into?" on 12 Oct, our answer on 13 Oct, nothing since, so Raka's warm opening.
> Flags for Raka. (1) Two first findings died on the check. The bare /shop address 404s, but the SHOP menu goes to a
> working product page, and the site does link the presale page, through the red banner. (2) He's a Senior Brand
> Manager at P&G and runs BWILD beside it, so he'll read a site with a marketer's eye.

```gate
lead: Lupo Benatti, founder of BWILD, Geneva, an outdoor brand founded 2025, 3 employees (https://www.linkedin.com/company/bwildoutdoors read 2026-10-23 ~12.10 UTC). His own about page, "So I decided to take the risk, invest my savings and start BWILD ... Lupo, BWILD Founder" (https://www.bwildoutdoors.com/about-us). lemlist jobTitle Founder, tagline "Senior Brand Manager at P&G /// Founder of BWILD", the business he owns is BWILD, the job he holds is at P&G. Not in the Swiss commercial register (zefix search "BWILD" 2026-10-23, no result), normal for a sole trader below the registration threshold, so ownership rests on his own about page. ctc_rX4RpJcZ5AqviHsiN, leadId lea_hGeWvcdgyg2M73Cwd, campaign W1b cam_7gnHSf6GvvGy8gH3n, accepted 2026-10-12 16.54 UTC. Thread 2 items, his 12 Oct question and our 13 Oct answer, control 6
site pass 1: 14 URLs, tools/crawl.py on https://www.bwildoutdoors.com , home, about, community, FAQ, privacy, terms, the Luminous Vest page, the product page and search, every page read
site pass 2: 14 URLs, second crawl, same counts, desktop and real phone screenshots of the home (b40-bwild-desktop.png, b40-bwild-phone.png), the Luminous Vest and community pages rendered (bw-0.png, bw-1.png), the presale page read through tools/fetch-walled.py, opened
deep analysis: One product sold, the BWILD Adventure Vest at €98, "Designed in Switzerland and tested in the Alps", one review quote and an empty Etsy reviews block. The menu item KICKSTARTER opens a page that says "THE WORLD'S BRIGHTEST VEST ... COMING SOON ON KICKSTARTER / SAVE THE DATE" with no date. The Luminous Vest's early access lives on a separate site, presale.bwildoutdoors.com, "GET 30% OFF AT LAUNCH ... reserve for €1", reached from the red banner "THE NEW LUMINOUS VEST IS COMING /// LEARN MORE". His LinkedIn post eight months ago opened those reservations. On a phone the banner, a "SIGN UP AND GET 10% OFF" pop up and the cookie bar stack over the first screen. Instagram is where the runners are, 3,849 followers, last post 20 Sep
owner linkedin: Route 1 tools/fetch-walled.py https://www.linkedin.com/in/lupobenatti , 1,530 bytes, auth wall. Route 2 web search "Lupo Benatti" BWILD, only results about a Benelli rifle. Route 3 web search BWILD Luminous running vest Kickstarter, no campaign page found. Route 4 zefix, no BWILD entry. Route 5 the company page https://www.linkedin.com/company/bwildoutdoors rendered signed out, 181 followers, the reservations post eight months ago. Route 6 Instagram https://www.instagram.com/bwildnow/ and TikTok https://www.tiktok.com/@bwildoutdoors through social-audit.js, the TikTok bio "This is me, daring to live while building my adventure brand"
contact linkedin: same person, his own about page, the company page and the lemlist record agree
google news: tools/news.py en 2026-10-23, "BWILD running vest" 0, "Lupo Benatti" 0, control Tesco 100
regional news: tools/news.py (Genève OR Suisse) (trail running vest), 1, Swiss startup Revario's first CHF 1M (Startupticker 6 Jan 2026)
industry news: tools/news.py trail running vest, 503 twice, rate limited, walled, and the vest market read from the FAQ's own comparison ("not just those who can afford €200 gear") instead
sources:
1. https://www.bwildoutdoors.com/
2. https://www.bwildoutdoors.com/shop//p/bwildvest
3. https://www.bwildoutdoors.com/bwildluminousvest
4. https://www.bwildoutdoors.com/faq
5. https://www.bwildoutdoors.com/about-us
6. https://presale.bwildoutdoors.com/
7. https://www.linkedin.com/company/bwildoutdoors
8. https://www.instagram.com/bwildnow/
9. https://www.tiktok.com/@bwildoutdoors
10. https://www.strava.com/clubs/2035366
11. https://www.zefix.admin.ch/en/search/entity/welcome (no BWILD entry)
12. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fwww.bwildoutdoors.com%2F
13. https://news.google.com/rss (tools/news.py, Startupticker 6 Jan 2026)
pains: 5 judged. (1) the launch is split, a Kickstarter page with no date and reservations on a separate presale site, CHOSEN. (2) one product and one review on the shop, folded into (1). (3) the /shop 404, DROPPED, unlinked, the menu works. (4) three overlays on the phone's first screen, small, kept as proof for the sketch. (5) GDPR, Facebook and Google tags in the page, EU view 1 cookie before a click, never the angle
chosen: (1), hottest, the Luminous Vest launch is what he's working on now (the banner, the presale page, his own reservations post) and the site splits it in two
owner reply: "The presale page is on purpose, it's our launch funnel" | a model, not a gap | the main site's own KICKSTARTER page still says "SAVE THE DATE" with no date and no reserve button (https://www.bwildoutdoors.com/bwildluminousvest), so the funnel and the site tell runners two different things
worth: €3,500+, one more professional BWILD site that sells the Adventure Vest with proper reviews and runs the Luminous Vest launch, reservations, the Kickstarter countdown and the list, in the same place
sweep website: crawled twice, every menu link opened, the launch split across two sites, CHOSEN
sweep gdpr: tools/eu-view.py from Stockholm, 1 first party cookie (crumb), Facebook and Google Tag Manager among third party hosts, Switzerland and the EU checked, never the angle (RULES 0E)
sweep apps: a one product brand, the job is selling and launching, folded into the site offer, no separate tool
sweep social: tools/social-audit.js, Instagram https://www.instagram.com/bwildnow/ 3,849 followers, 114 posts, latest 2026-09-20, TikTok 130 followers, LinkedIn 181, the runners come from Instagram
sweep squad: a one product outdoor brand, not a builder of software, not chosen, per his about page
thread: problem your Kickstarter page says save the date but there's no date on it, and the Luminous Vest reservations sit on a separate presale site | cost runners coming over from Instagram likely find two half launches and leave before they reserve | offer one more professional BWILD site that sells the Adventure Vest and runs the Luminous Vest launch, reservations and Kickstarter countdown in the same place | link Kickstarter, reservations
lead read: Lupo reads that his Kickstarter page has no date and the reservations live on another site, so runners from Instagram drift off, and gets offered one site that sells the vest and runs the launch, one thread
claims:
your Kickstarter page says save the date but there's no date on it, https://www.bwildoutdoors.com/bwildluminousvest rendered 2026-10-23 (bw-0.txt) "COMING SOON ON KICKSTARTER / SAVE THE DATE", no date anywhere on it, and the KICKSTARTER menu item's href is /bwildluminousvest in the homepage HTML
the Luminous Vest reservations sit on a separate presale site, https://presale.bwildoutdoors.com/ read by tools/fetch-walled.py 2026-10-23, "GET 30% OFF AT LAUNCH ... reserve for €1", linked from the banner's clickthroughUrl in the homepage HTML
Instagram, https://www.instagram.com/bwildnow/ 3,849 followers, latest post 2026-09-20, social-audit.js
INFERENCE, runners coming over from Instagram likely find two half launches and leave before they reserve, rests on https://www.bwildoutdoors.com/bwildluminousvest and https://presale.bwildoutdoors.com/ , worded likely
websites credential, docs/astra-company-profile.md, Raka's fixed brand line, https://www.linkedin.com/in/raka-mulya-b92885196
recheck: 2026-10-23 12.47 UTC, the Luminous Vest page rendered again, 147 words, "COMING SOON ON KICKSTARTER" and "SAVE THE DATE" with no year or month anywhere on it, and the presale page refetched, "reserve for" and "30% OFF" still there. Disproof tried, opened the SHOP href (works, so the 404 finding was dropped), searched every page and the HTML for a presale link (the banner has it, so "no link" was dropped), looked for a Kickstarter campaign page (none found). Facts hold, confidence HIGH
```

SKETCH
```
Something I've been thinking about, Lupo!

Your Kickstarter page says save the date, but there's no date on it, and the Luminous Vest reservations sit on a separate presale site. So runners coming over from Instagram likely find two half launches and leave before they reserve.

I'd suggest one more professional BWILD site that sells the Adventure Vest and runs the Luminous Vest launch, reservations and Kickstarter countdown in the same place.

At Astra agency we make websites for brands like Unilever, AXA, Pertamina.

Shall I send you a sketch of the new BWILD site?
```
