# Drafts, 2026-10-24, batch 2 of Raka's angle calls. NOT SENT, waiting on Raka's word

Raka, 2026-10-23, word for word: "matthew tyas -> website to have more landings? / beckie taylor -> more beautiful, simple,
MODERN website / brew and pour -> website to get more members". On 24 Oct, "and then do the next batch".

Research 2026-10-23 13.55 to 2026-10-24 ~10.40 UTC. Evidence folder /tmp/claude-0/agents/b40/b2 (crawls, renders,
screenshots, Zefix and Companies House pulls, Instagram embeds, the menu PDF). Threads pulled 2026-10-23 13.55 UTC with
`tools/lemlist.py thread`, control ctc_ch3vFcKAkjQdMKDCg 6 items, all three at 0 items. Re pull every thread, run the
four way never messaged check and reopen every claim in the minute before any send.

### Sebastian A. Jeck, Rivington (Brew & Pour Company AG), ctc_x8ivje8MC5HSvdyMv

> NOT SENT. Flags for Raka. (1) The site itself looks good, dark green, strong photos, working reservation and event
> forms, so the angle is membership and events, never the look. (2) Sebastian sits on the board with Patrik Minuscoli as
> president, and his day job is Novum Partners, a Zurich multi family office, so Rivington is an investment he's on the
> board of. (3) The bar used to be Hotel Rivington & Sons, the old domain now redirects to rivington.ch.

```gate
lead: Sebastian Andres Jeck, member of the board of Brew & Pour Company AG, CHE-374.267.000, Zürich, registered 21 Aug 2025, Patrik Minuscoli president, both with joint signature (https://www.zefix.admin.ch/ZefixREST/api/v1/firm/1707857.json , the SHAB entry read 2026-10-23 ~14.00 UTC). The company runs RIVINGTON Bar & Café on the ground floor of the Prime Tower, its Impressum names Brew & Pour Company AG (https://rivington.ch/legal-1). lemlist jobTitle Owner, tagline "Partner at Novum Partners", companyName Brew & Pour Company AG, companyDomain rivington.ch, Zurich. ctc_x8ivje8MC5HSvdyMv, leadId lea_rqWtk8Gmf6ZBaCvJg, campaign W1b cam_7gnHSf6GvvGy8gH3n, accepted 2026-10-16 21.52 UTC. Thread 0 items, control 6
site pass 1: 6 URLs, tools/crawl.py on https://rivington.ch , all 200, home, /home, /reservation, /legal-1, /404 and the bare domain, every page read
site pass 2: 6 URLs, second crawl, same counts, then the home, /reservation and the member signup rendered in Chromium (b2riv-0.png desktop full page, b2riv-2.png), site-audit.js phone and desktop (b2-riv-phone.png), the menu PDF read with pdftotext, all opened
deep analysis: A New York style bar and café on two levels at the foot of the Prime Tower, an original 1930s bar, a café by day and cocktails by night, a second floor event space for private and corporate events, music, theatre evenings and "curated lunch happenings". Three buttons carry the home page, Become a Member, Enquire Your Event, Explore the Menu, then a Reservation Request form. Become a Member links to https://app.loyaltify.io/f/15ac25d1 , a separate form with the R logo that asks for a name and an email and two tick boxes, nothing about what a member gets. The home page says "Scan your card on every visit and enjoy complimentary hot drink rewards" and the menu says "LOYALITY CARD Become a member now", so membership matters to them. Events are sent to Instagram, "to learn about upcoming events, visit our Instagram for inspiration", where the Thursday lunch series with STUFA (fixed menu CHF 24, every Thursday in November from 5 Nov), a jam session and a Christmas market are posted. The menu is a 519 KB PDF. On a phone the first screen is only the name on dark green, a brand choice
owner linkedin: Route 1 tools/fetch-walled.py https://www.linkedin.com/in/sebastian-a-jeck-cfa-4715b04a , 24,633 bytes, the same login wall as two other profiles, walled. Route 2 tools/news.py "Sebastian Jeck", finews 5 Jun 2025 "Multi-Family-Office: Ex-UBS-Banker macht Büro in Zürich auf" and 3 Oct 2025 "Multi-Family Office tritt unter neuem Namen auf", his day job. Route 3 Zefix, board member since 21 Aug 2025. Route 4 the company page https://www.linkedin.com/company/brew-pour-company-ag , 110 followers, "Owner & Operator of Zurich's most distinctive bar experience in the tallest tower of Zurich" per the lemlist company record. Route 5 Instagram https://www.instagram.com/rivingtonzurich/ read through the public embed, 717 followers, 17 posts, newest 2026-10-22. Route 6 web search Rivington Prime Tower, Time Out and Zurich Tourism still list it as Hotel Rivington & Sons, and hotelrivingtonandsons.ch redirects to rivington.ch (curl 2026-10-23)
contact linkedin: same person, the lemlist record, Zefix and the company page agree
google news: tools/news.py de 2026-10-23, "Rivington Zürich" 0, "Brew & Pour Company" 0, "Sebastian Jeck" 3 (finews), "Patrik Minuscoli" 6 (2021 Deutsche Bank team move), control Volkswagen 92
regional news: tools/news.py (Zürich West OR Kreis 5 OR Escher-Wyss) (Bar Café Gastronomie Zürich), 67, "Es gibt hier keinen Vibe mehr, Der Schiffbau Zürich kämpft mit Problemen" (Tages-Anzeiger 20 Jan 2026) next door, and new openings in Kreis 5 (Falstaff 4 Feb 2026, Sinaloa)
industry news: tools/news.py Bar Café Gastronomie Zürich, 84, NZZ Bellevue 22 Oct 2026 on Coco Grill & Bar, new brunch concepts (NZZ Bellevue 17 Feb 2026), a crowded Zurich bar and café scene, plus the Prime Tower's own figures, ca. 2,000 workspaces in the tower and ca. 1,000 in Platform next door (https://www.primetower.ch/en/areal-en/)
sources:
1. https://rivington.ch/
2. https://rivington.ch/reservation
3. https://rivington.ch/legal-1
4. https://rivington.ch/s/NEW-Rivington-Menu-2026-3.pdf
5. https://app.loyaltify.io/f/15ac25d1
6. https://www.zefix.admin.ch/ZefixREST/api/v1/firm/1707857.json
7. https://www.primetower.ch/en/areal-en/
8. https://www.instagram.com/rivingtonzurich/
9. https://www.linkedin.com/company/brew-pour-company-ag
10. https://www.timeout.com/switzerland/bars-and-pubs/hotel-rivington-sons
11. https://news.google.com/rss (tools/news.py, finews 5 Jun 2025, Tages-Anzeiger 20 Jan 2026)
12. https://webbkoll.5july.net/en/results?url=https%3A%2F%2Frivington.ch%2F
13. https://www.linkedin.com/in/sebastian-a-jeck-cfa-4715b04a (walled)
pains: 5 judged. (1) the site gives nobody a reason to become a member, events only on Instagram and a join form with no perks, CHOSEN. (2) the menu is a PDF, small, folded into the offer. (3) old listings still say Hotel Rivington & Sons, the domain redirects, not ours. (4) the phone's first screen is only the name, a brand choice, not used. (5) GDPR, 3 first party cookies from Stockholm, clean, never the angle
chosen: (1), hottest, Raka's own call is members, and the membership is pushed on the home page, the menu and a card scheme while the site hands it to a bare outside form
owner reply: "Our regulars join at the bar with the card and the QR on the menu" | a model, not a gap | the home page makes Become a Member one of its three main buttons (https://rivington.ch/), and it opens a form with no perks on it (https://app.loyaltify.io/f/15ac25d1), so the online route is part of their own plan and gives no reason to join
worth: €3,000+, a Rivington site built around membership, what members get, member first dates for the lunch series and events, the menu as a page, joining in one step on the site
sweep website: crawled twice, home, reservation and the member form rendered, events only on Instagram, the join form shows no perks, CHOSEN
sweep gdpr: tools/eu-view.py from Stockholm, 3 first party cookies, 0 third party, 73 requests to 8 hosts, checked, never the angle (RULES 0E)
sweep apps: the loyalty card already runs on Loyaltify, a member page and sign up are folded into the site offer, no separate app
sweep social: tools/social-audit.js, Instagram https://www.instagram.com/rivingtonzurich/ 717 followers, 17 posts, newest 2026-10-22, LinkedIn https://www.linkedin.com/company/brew-pour-company-ag 110 followers, events live on Instagram only
sweep squad: a bar and café, not a builder of software, not chosen, per Zefix's purpose (Gastronomie, Unterhaltung, Veranstaltungen)
thread: problem your website leaves the Thursday lunch series to Instagram, and Become a Member opens a separate form asking only for a name and an email | cost most of the 2,000 people working in the Prime Tower above you likely never find a reason to join | offer a Rivington site built around membership, with the lunch series, events and member perks on it, and joining in one tap | link member, lunch
lead read: Sebastian reads that his site leaves the lunch series to Instagram and his member button opens a bare form, so the tower's office workers likely never join, and gets offered a site built around membership with the events and perks on it, one thread
claims:
your website leaves the Thursday lunch series to Instagram, https://rivington.ch/ "For a glimpse of what's possible and to learn about upcoming events, visit our Instagram for inspiration", crawl.py twice and the Chromium render
the Thursday lunch series is on Instagram and not the site, https://www.instagram.com/rivingtonzurich/ embed caption "THURSDAYS LUNCH SERIES Every Thursday in November, STUFA is taking over lunch", and https://rivington.ch/ all 6 pages plus the menu PDF carry no STUFA, no lunch series and no dates, only the generic "curated lunch happenings", control words event 38 and member 21 hits
Become a Member opens a separate form, https://rivington.ch/ href of "Become a Member" is https://app.loyaltify.io/f/15ac25d1 in the raw HTML
asking only for a name and an email, https://app.loyaltify.io/f/15ac25d1 rendered 2026-10-23, "Please fill out this form to join our loyalty program. Name* Email*", a marketing tick box and a terms tick box, nothing else
the 2,000 people working in the Prime Tower, https://www.primetower.ch/en/areal-en/ "Total workspaces ca. 2'000"
above you, https://rivington.ch/ "located in the ground floor of the Prime Tower"
INFERENCE, most of them likely never find a reason to join, rests on https://rivington.ch/ and https://app.loyaltify.io/f/15ac25d1 above, worded likely
websites credential, docs/astra-company-profile.md, Raka's fixed brand line, https://www.linkedin.com/in/raka-mulya-b92885196
recheck: 2026-10-24 10.18 UTC, rivington.ch 200, the member button still opens https://app.loyaltify.io/f/15ac25d1 , the Instagram line once, STUFA 0, control example.com 200, thread 0 items. To be rerun in the minute before sending. Disproof tried, every link on the home page read from the HTML (the member button's href is the outside form), all 6 pages and the menu PDF searched for STUFA, lunch series, jam and Christmas (the only jam and Christmas hits were Jamaica and Christmas Island in the country list), the member form rendered to look for perks (none), the reservation and event forms rendered so no "no form" claim is made. Facts hold, confidence HIGH
```

SKETCH
```
Hi Sebastian, Rivington looks cool!

However, your website leaves the Thursday lunch series to Instagram, and Become a Member opens a separate form asking only for a name and an email. So most of the 2,000 people working in the Prime Tower above you likely never find a reason to join.

I'd suggest a Rivington site built around membership, with the lunch series, events and member perks on it, and joining in one tap.

At Astra agency we make websites for brands like Unilever, AXA, Pertamina.

Shall I send you a sketch of the new Rivington site?
```

### Matthew Tyas, Manchester's Finest Group, ctc_ZW6Axp4PFcgiNdciC

> NOT SENT. Flags for Raka. (1) His LinkedIn headline says "Open to Head of Design / UX / Design Systems roles", so he may
> be on his way out of Manchester's Finest. (2) He's a design and product lead himself, Product and Technology Director, so
> he'll judge the sketch as a designer. (3) "More landings" is read as a landing page for the Finest app, the thing they're
> launching now. The main site is modern and busy, so it isn't called weak.

```gate
lead: Matthew John Tyas, director of MCR FINEST LTD (08484390) since 11 April 2013, one of four directors with James Barker, Lee Isherwood and Steven Pankhurst, and a person with significant control since 6 Nov 2020, at Manchester's Finest Group, 63 Newton Street (https://find-and-update.company-information.service.gov.uk/company/08484390/officers and /persons-with-significant-control, read 2026-10-24 ~10.25 UTC), also director of NQ MCR LIMITED (https://find-and-update.company-information.service.gov.uk/officers/O8FpYlTdusZGcswXFHm3I5aRO04/appointments). lemlist jobTitle "Product and Technology Director / Founder", tagline "Founder and Director Manchester's Finest Group | Open to Head of Design / UX / Design Systems roles", Disley. ctc_ZW6Axp4PFcgiNdciC, leadId lea_NZ2d9z2rDqEKt3LqY, campaign W4, accepted 2026-10-16 16.04 UTC. Thread 0 items, control 6
site pass 1: 400 URLs, tools/crawl.py on https://manchestersfinest.com , 399 at 200, stopped at the cap with 37,429 links queued, an editorial site of thousands of articles, so no absence claim is made about the main site
site pass 2: 400 URLs, second crawl, same counts, the home and the app waitlist page fetched raw and rendered (b2mfapp-0.png desktop, b2mfappP-0.png phone), site-audit.js desktop, all opened
deep analysis: Greater Manchester's city guide, places, events, guides and news, updated within hours, 503,242 Instagram followers. Its homepage gives the Finest app a panel, "Join the waitlist. Get exclusive perks in 100s of venues with the Finest app, First access when the app launches, Updates before everyone else, Launch offers and early perks, Get on the list". Get on the list links to https://mailchi.mp/manchestersfinest/app , a Mailchimp hosted page with the Finest logo, "Get first access to the Finest App", "We've been designing, building and prototyping something to make the best of Greater Manchester easier to discover", seven emoji bullets (find curated places, unlock perks and discounts, Randomise) and a three field form. One image on it, the logo, no app screens, no video, no venue named, no "100s of venues". A Manchester rival is already live, Shuffle Rewards, launched late 2024 around the city centre and "particularly the vibrant Northern Quarter", 4,000 people in its test phase (Howden)
owner linkedin: Route 1 tools/fetch-walled.py https://www.linkedin.com/in/matthew-tyas , 24,633 bytes, login wall, walled. Route 2 tools/news.py "Matthew Tyas", other people (a St Ives potter) and two 2012 to 2013 Manchester's Finest bylines. Route 3 Companies House, four directorships, two dissolved. Route 4 the company page https://www.linkedin.com/company/mcrfinest , 14,609 followers. Route 5 Instagram https://www.instagram.com/mcrfinest/ through the public embed, 503,242 followers, 6,948 posts, newest today. Route 6 the lemlist company record, "almost 3 million social media followers and a monthly reach of 90 million", a company claim, not used
contact linkedin: same person, Companies House and the lemlist record agree on Manchester's Finest Group and 63 Newton Street
google news: tools/news.py en 2026-10-24, "Manchester's Finest" 100 (their own articles, newest 24 Oct 2026), "Matthew Tyas" 8, control Tesco 100
regional news: tools/news.py (Manchester) (city guide app launch perks), 2, "Is Manchester's Shuffle Rewards app a gamechanger for hospitality?" (Howden 14 Mar 2025), opened at source
industry news: tools/news.py city guide app launch perks, 80, rewards apps and loyalty perks across travel and banking (NerdWallet 21 Oct 2026 on Atmos Rewards), a crowded perks market
sources:
1. https://www.manchestersfinest.com/
2. https://mailchi.mp/manchestersfinest/app
3. https://find-and-update.company-information.service.gov.uk/company/08484390/officers
4. https://find-and-update.company-information.service.gov.uk/company/08484390/persons-with-significant-control
5. https://find-and-update.company-information.service.gov.uk/officers/O8FpYlTdusZGcswXFHm3I5aRO04/appointments
6. https://www.instagram.com/mcrfinest/
7. https://www.linkedin.com/company/mcrfinest
8. https://www.tiktok.com/@mcrfinest (walled)
9. https://www.howdengroup.com/uk-en/news-insights/manchesters-shuffle-rewards-app-gamechanger-hospitality
10. https://news.google.com/rss (tools/news.py, Howden 14 Mar 2025)
11. https://webbkoll.5july.net/en/results?url=https%3A%2F%2Fwww.manchestersfinest.com%2F
12. https://www.linkedin.com/in/matthew-tyas (walled)
pains: 4 judged. (1) the app's waitlist sits on a plain Mailchimp page that shows nothing of the app, CHOSEN. (2) a rival rewards app already live in the Northern Quarter, context for the offer, not named in the message. (3) 94 failed requests on the home, all ad and tracking hosts, not ours. (4) GDPR, a consent cookie and 6 first party cookies from Stockholm, never the angle
chosen: (1), hottest, the app is what they're launching now, it's on the homepage, and Matthew is the product and technology director behind it
owner reply: "It's just a list for now, the app will sell itself" | a model, not a gap | the homepage promises "exclusive perks in 100s of venues" (https://www.manchestersfinest.com/) and the page that collects the sign ups names none of them and shows no screen (https://mailchi.mp/manchestersfinest/app), so the promise isn't carried onto the page that has to win the sign up
worth: €3,000+, a Finest app launch site on their own domain, the app's screens, the venues with perks, a waitlist that moves people up when they share it, and a page for venues to join
sweep website: crawled twice to the cap, the home and the waitlist page rendered, the waitlist page shows one image and no venue, CHOSEN
sweep gdpr: tools/eu-view.py from Stockholm, 6 first party cookies incl. consentUUID, 36 requests to 10 hosts, checked, never the angle (RULES 0E)
sweep apps: the app is their own build in progress ("designing, building and prototyping"), an app build offer would compete with Matthew's own team, so the offer is the launch site
sweep social: tools/social-audit.js, Instagram https://www.instagram.com/mcrfinest/ 503,242 followers, TikTok walled, LinkedIn https://www.linkedin.com/company/mcrfinest 14,609, the audience is on Instagram
sweep squad: a media group with its own product and tech lead, Build Squad possible later, not the first message
thread: problem your website's Get on the list button for the Finest app opens a plain Mailchimp page with no screens of the app and no venues named | cost a lot of the followers you send there from your 500,000 on Instagram likely leave without joining | offer a Finest app launch site on your own domain, showing the app, the venues with perks and a waitlist that rewards sharing | link app, list
lead read: Matthew reads that his app's waitlist sits on a plain Mailchimp page with no screens or venues, so Instagram followers leave without joining, and gets offered a launch site that shows the app and the venues, one thread
claims:
your website's Get on the list button for the Finest app, https://www.manchestersfinest.com/ "Join the waitlist. Get exclusive perks in 100s of venues with the Finest app ... Get on the list", href https://mailchi.mp/manchestersfinest/app in the raw HTML
opens a plain Mailchimp page, https://mailchi.mp/manchestersfinest/app rendered 2026-10-24, 164 words, the logo, seven emoji bullets and First Name, Last Name, Email Address
with no screens of the app and no venues named, https://mailchi.mp/manchestersfinest/app raw HTML, 1 img (the logo), 0 video, 0 hits for restaurant, bar, pub, venue or café
your 500,000 on Instagram, https://www.instagram.com/mcrfinest/ 503,242 followers, social-audit.js 2026-10-24
INFERENCE, a lot of them likely leave without joining, rests on https://mailchi.mp/manchestersfinest/app and https://www.howdengroup.com/uk-en/news-insights/manchesters-shuffle-rewards-app-gamechanger-hospitality , worded likely
websites credential, docs/astra-company-profile.md, Raka's fixed brand line, https://www.linkedin.com/in/raka-mulya-b92885196
recheck: 2026-10-24 10.18 UTC, the home 200 with Get on the list still on https://mailchi.mp/manchestersfinest/app , the Mailchimp page 200 with 1 image and 0 venue words, control example.com 200, thread 0 items. To be rerun in the minute before sending. Disproof tried, the waitlist page read raw and rendered on desktop and phone, its images counted (1, the logo), searched for any venue word (0), looked for an app page on their own site in 400 crawled pages ("finest app" only on the home), so the message speaks only about the page the button opens. Facts hold, confidence MEDIUM, because he may be leaving and designs this himself
```

SKETCH
```
Hi Matthew, Manchester's Finest looks cool!

However, your website's Get on the list button for the Finest app opens a plain Mailchimp page with no screens of the app and no venues named. So a lot of the followers you send there from your 500,000 on Instagram likely leave without joining.

I'd suggest a Finest app launch site on your own domain, showing the app, the venues with perks and a waitlist that rewards sharing.

At Astra agency we make websites for brands like Unilever, AXA, Pertamina.

Shall I send you a sketch of the Finest app launch site?
```

### Beckie Taylor, Empower Women in Tech, ctc_g9Fr5qqeRQDe3GEFu

> NOT SENT. Flags for Raka. (1) Natalie Asprey, her co-founder, got our modern Empower site opener on 20 Oct
> (act_oHbYPDcg9bvDY2u5q) and a bump on 23 Oct, no reply. On 27 Sep the rule for Bunkz Golf was no second pitch to a two
> founder company, and it was left as your call. You named Beckie, so here it is, built on a different finding from
> Natalie's (her first screen, not the 2026 sponsor line or the leftover "Heading 1"). If they compare notes it still reads
> as two people at Astra noticing different things. (2) Empower is a not for profit CIC, so the pay test is the weak point.
> (3) Beckie is the sponsor contact, both sponsor buttons email beckie@empower-wit.com.

```gate
lead: Beckie Taylor, co-founder of EMPOWER WIT C.I.C. (16245258), incorporated 11 Feb 2025, Hazel Grove, Stockport (https://find-and-update.company-information.service.gov.uk/company/16245258/officers read 2026-10-23 ~14.00 UTC, directors Natalie Rose Asprey and Rebecca Judith Ferguson). BusinessCloud 13 Feb 2025, "Empower is the brainchild of Tech Returners founder Beckie Taylor" with Natalie Asprey (https://businesscloud.co.uk/news/new-cic-to-empower-women-in-tech/ opened at source). Both sponsor buttons on the site email beckie@empower-wit.com. Whether she is the director Rebecca Judith Ferguson isn't settled and isn't needed, the press and the site tie her to Empower. lemlist jobTitle Co-Founder, tagline "Helping women in STEM speak up, lead confidently & take up space | Speaker | Founder | Women in Tech Advocate". ctc_g9Fr5qqeRQDe3GEFu, leadId lea_t2DBztK58vSab9ErM, campaign W1b cam_7gnHSf6GvvGy8gH3n, accepted 2026-10-20 06.10 UTC. Thread 0 items, control 6
site pass 1: 28 URLs, tools/crawl.py on https://empower-wit.com , 25 at 200 and 3 refused with 429, every page read
site pass 2: 28 URLs, a second crawl on 24 Oct after the first retry was rate limited, all 28 at 200, then site-audit.js desktop and phone (b2-emp-desktop.png, b2-emp-phone.png), the About, WIT Awards and home pages rendered in Chromium, the sitemaps read, all opened
deep analysis: A not for profit CIC running the Empower Women in Tech Awards (11 March 2027, tickets on Ticket Tailor at the Kraken Technology Centre, Manchester) and the Empower Women in Tech Conference ("returns to Manchester in 2027"), with London 2026, mentoring and a female founders strand. A Wix site, "© 2025 Empower | Website by Empower". The home opens with "Welcome to Empower." over a purple crowd photo, on a phone with a Get In Touch button that links to /about, and the awards date and the conference come only further down. The builder's sample pages are still published and listed in the sitemaps, three sample events (a concert at 50 Sunset Blvd, Los Angeles, an expo in Oakland) and three US dollar booking services, none in the menu. Sponsors are asked to email beckie@empower-wit.com. Natalie's 20 Oct opener named the 2026 sponsor line and the leftover "Heading 1"
owner linkedin: Route 1 tools/fetch-walled.py https://www.linkedin.com/in/beckie-taylor-92840712 , 24,633 bytes, login wall, walled. Route 2 tools/news.py "Beckie Taylor", BusinessCloud 13 Feb 2025 (Empower), Northcoders bought her Tech Returners (BusinessCloud 7 Feb 2023), Computer Weekly 24 Oct 2025 documentary. Route 3 Companies House, Empower WIT CIC. Route 4 the company page https://www.linkedin.com/company/empower-wit , 1,895 followers. Route 5 Instagram https://www.instagram.com/empowerwomenintech/ 704 followers, 335 posts, newest 2026-10-22. Route 6 the devopsdays Sibiu 2026 speaker page found by search, not opened, not used
contact linkedin: same person, BusinessCloud, the site's sponsor email and the lemlist record agree
google news: tools/news.py en 2026-10-24, "Empower Women in Tech" 21 (one theirs, BusinessCloud 13 Feb 2025), "Empower WIT Awards" 0, "Beckie Taylor" 10, control Tesco 100
regional news: tools/news.py (Manchester) (women in tech conference), 71, "Women in Tech Week returns with 100 free UK events" (SecurityBrief 18 Sep 2026), "Computer Weekly announces the Most Influential Women in UK Tech 2026" (15 Oct 2026), more free events competing for the same women
industry news: tools/news.py women in tech conference, 35, the Grace Hopper Celebration cancelled two weeks before its start (SFGATE 13 Oct 2026, Forbes 13 Oct 2026, Bloomberg 15 Oct 2026), sponsors and attendees for women in tech events are harder to hold
sources:
1. https://www.empower-wit.com/
2. https://www.empower-wit.com/about
3. https://www.empower-wit.com/wit-awards
4. https://www.empower-wit.com/sponsor
5. https://www.empower-wit.com/event-pages-sitemap.xml
6. https://find-and-update.company-information.service.gov.uk/company/16245258/officers
7. https://businesscloud.co.uk/news/new-cic-to-empower-women-in-tech/
8. https://www.instagram.com/empowerwomenintech/
9. https://www.linkedin.com/company/empower-wit
10. https://www.tickettailor.com/events/empower2/2344821
11. https://news.google.com/rss (tools/news.py, SFGATE 13 Oct 2026, SecurityBrief 18 Sep 2026)
12. https://webbkoll.5july.net/en/results?url=https%3A%2F%2Fwww.empower-wit.com%2F
13. https://www.linkedin.com/in/beckie-taylor-92840712 (walled)
pains: 5 judged. (1) the first screen says only "Welcome to Empower." and its button goes to About, the 2027 awards and conference come later, CHOSEN. (2) the builder's sample events and US dollar services still published and in the sitemaps, real but not in the menu, kept as proof for the sketch. (3) a white Instagram icon in the footer links to Wix's own account, white on white so barely seen, DROPPED. (4) the 2026 sponsor line and "Heading 1", already in Natalie's message, not repeated. (5) GDPR, 6 first party cookies from Stockholm, never the angle
chosen: (1), biggest, it's the first thing every visitor sees and it hides the two events the CIC lives on
owner reply: "We rebuilt the site ourselves this year" | just built | the footer says "© 2025 Empower" and "Website by Empower" and the home still opens on "Welcome to Empower." with the 11.03.2027 awards date further down (https://www.empower-wit.com/), so the offer is a simpler site around 2027, never calling it old
worth: €2,500+, a simpler, modern Empower site that opens on the 2027 awards and conference, entries, tickets and sponsorship one tap away, the sample pages cleared
sweep website: crawled twice, home rendered on desktop and phone, first screen and sitemaps checked, CHOSEN
sweep gdpr: tools/eu-view.py from Stockholm, 6 first party cookies, 0 third party, 150 requests to 7 hosts, checked, never the angle (RULES 0E)
sweep apps: entries, tickets and mentoring already run on forms and Ticket Tailor, folded into the site offer, no separate tool
sweep social: tools/social-audit.js, Instagram https://www.instagram.com/empowerwomenintech/ 704 followers, 335 posts, newest 2026-10-22, LinkedIn https://www.linkedin.com/company/empower-wit 1,895 followers, LinkedIn is where their audience is
sweep squad: a not for profit events CIC, not a builder of software, not chosen, per Companies House and BusinessCloud
thread: problem your website opens on a phone with just Welcome to Empower and a Get In Touch button that goes to the About page, the 2027 awards and conference only show further down | cost a woman in tech or a sponsor who lands there from LinkedIn likely leaves before seeing what's on and when | offer a simpler, modern Empower site that opens on the 2027 awards and conference, with entries, tickets and sponsorship one tap away | link awards, conference
lead read: Beckie reads that her homepage opens on a welcome line and a button to About while the 2027 awards and conference sit lower down, so visitors likely leave, and gets offered a simpler site that opens on those events, one thread
claims:
your website opens on a phone with just Welcome to Empower and a Get In Touch button, https://www.empower-wit.com/ phone screenshot /tmp/claude-0/b2-emp-phone.png from site-audit.js at 390 wide, the first screen is the logo, the menu, "Welcome to Empower." and "Get In Touch"
that goes to the About page, https://www.empower-wit.com/ raw HTML, "Get In Touch" href https://www.empower-wit.com/about
the 2027 awards and conference only show further down, https://www.empower-wit.com/ "Empower WIT Awards ... 11.03.2027" and "Empower Women In Tech Conference returns to Manchester in 2027" below the hero, and https://www.tickettailor.com/events/empower2/2344821 "Empower Women in Tech Awards | March 2027"
LinkedIn, https://www.linkedin.com/company/empower-wit 1,895 followers against 704 on Instagram
INFERENCE, a woman in tech or a sponsor who lands there likely leaves before seeing what's on, rests on the phone screenshot of https://www.empower-wit.com/ above, worded likely
websites credential, docs/astra-company-profile.md, Raka's fixed brand line, https://www.linkedin.com/in/raka-mulya-b92885196
recheck: 2026-10-24 10.18 to 10.19 UTC, the home first came back 429 (ours, rate limited), the retry through tools/fetch-walled.py returned 1,121,050 bytes with Welcome to, 11.03.2027 and returns to Manchester in 2027 once each, then Chromium at 390 and 1440 wide found one visible Get In Touch linking to https://www.empower-wit.com/about (a regex had first caught the logo link, the render settled it), thread 0 items, Natalie's 2 items unchanged. To be rerun in the minute before sending. Disproof tried, the Get In Touch href read from the HTML (About, not a contact form), the desktop hero checked too (no date there either), every menu link read, the Wix Instagram link tested in Chromium (visible but white on white, so dropped), Natalie's thread read so nothing she was told is repeated. Facts hold, confidence MEDIUM, because Natalie was pitched four days ago and it's a CIC
```

SKETCH
```
Hi Beckie, Empower looks cool!

However, your website opens on a phone with just Welcome to Empower and a Get In Touch button that goes to the About page. The 2027 awards and conference only show further down. So a woman in tech or a sponsor who lands there from LinkedIn likely leaves before seeing what's on and when.

I'd suggest a simpler, modern Empower site that opens on the 2027 awards and conference, with entries, tickets and sponsorship one tap away.

At Astra agency we make websites for brands like Unilever, AXA, Pertamina.

Shall I send you a sketch of the new Empower site?
```
