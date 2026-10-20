# Drafts, 2026-10-20, batch 2. Sonny Wells and Julien Salvat, on Raka's angle calls

Raka, 2026-10-20, after the screenshots, word for word: "sonny our pitch should be a website that allows him to get more investors and tell his story better, his main focus is investors right i think? / Julien is for a sales making customer facing website get more sales etc".

All NOT SENT. Shown to Raka first. Both threads were pulled 2026-10-20 at ~14.00 and ~14.10 UTC, 0 items each, nextPage null, control ctc_ch3vFcKAkjQdMKDCg 3 items in the same minute, LinkedIn synced 13.59.55 UTC. The W1b sequence ends at the invite step, so nothing auto sends. Re pull each thread with the control, run the four way never messaged check and reopen every claim in the minute before any send.

Beckie Taylor (Empower) is held, she's Natalie Asprey's co founder and Natalie got an opener this morning. The six accepts of 19 Oct still have no call from Raka.

Evidence folder for this batch, /tmp/claude-0/agents/b35 (crawls, site audits, news, social, EU view, registers, LinkedIn renders, page type screenshots).

### Sonny Wells, Sonny's, ctc_BY3K7TQYXkrRDydck

> NOT SENT. Raka's "a website that allows him to get more investors and tell his story better, his main focus is investors right i think?". Yes, and here's the proof. He's still raising, his company has allotted new shares eight times since March 2025, the latest on 1 October 2026 (recounted on the filing history at 14.42 UTC, I first told Raka nine, which was wrong). "Invest in Sonny's" is the homepage's first button and "Invest Today" sits in the menu. His own post sends investors to the website for the deck. Flags for Raka. (1) The site was designed in 2025 by Squishy Little Agency (footer credit, © 2025, investment page last edited 21 Oct 2025), so the offer is the story and the investor job, never "your site is old". (1b) His likely pushback is "BOXPARK isn't the first London location I meant", since the investment page shows a render of a standalone shopfront. The message survives it, because his own location page calls BOXPARK "our first location" and his post two months ago hired "for our first full-time location", and every fact in block two stays true either way. (2) He also just opened at BOXPARK, so customers matter now too, and the offer covers both without leaving the investor thread. (3) The waiting list form carries Squarespace's "needs a storage option" editor note in the HTML. Sign ups may be going nowhere, but proving it means submitting a fake sign up, so it stays out.

```gate
lead: Sonny Jay Wells, sole director and person with significant control (75% or more of shares and votes) of SONNY'S FOOD LTD, company 15223618, incorporated 20 October 2023 as G3 RESTAURANTS LIMITED, renamed 22 January 2024, SIC 56101 and 56103, registered office 53 Kennet House, 8 Enterprise Way, London SW18 1GF (https://find-and-update.company-information.service.gov.uk/company/15223618/officers and /persons-with-significant-control read 2026-10-20 ~14.15 UTC). Filing history shows SH01 share allotments on 27 Mar 2025, 4 Mar 2025, 30 Jun 2025, 14 Aug 2025, 23 Oct 2025, 17 Feb 2026, 26 Mar 2026 and 1 Oct 2026, plus a share sub division on 14 Jun 2024. lemlist jobTitle Founder, tagline "Building the Future of Gluten Free Fast Food | Founder of Sonny's | Advocate for Coeliac Disease Awareness", record and register agree. ctc_BY3K7TQYXkrRDydck, leadId lea_x7jZYJqmfyJqgegQ9, campaign W1b cam_7gnHSf6GvvGy8gH3n, accepted 2026-10-19 21.41 UTC. Thread pulled 2026-10-20 ~14.00 and ~14.10 UTC, 0 items, control 3 items
site pass 1: 6 pages (8 URLs, / and /home-1 are the same homepage), tools/crawl.py on https://www.sonnysfood.com , all 200, every page read, home, investment, location, menu, events, privacy policy
site pass 2: 6 pages (8 URLs), second full crawl, same counts as pass 1, plus desktop and real iPhone screenshots of the home (state/look_2026-10-20/14-sonny.jpg), investment, location, menu and events (types/sonnys-*), opened. The "Get the investment deck" button clicked in a render, it opens a "Request the investment deck" form (name, email, news opt in)
deep analysis: Sonny's is "the UK's first coeliac safe fast food brand", 100% gluten free, nut free and dairy free toasted sandwiches, bowls, fries and shakes, founded by a coeliac. The homepage's first button is "Invest in Sonny's", the menu carries "Invest Today", and the page's sign up asks people to "join our waiting list" for "updates on launch date", next to social numbers "since our launch announcement" (600,000+ views). The investment page (sitemap lastmod 2025-10-21) pitches a £400,000 SEIS and EIS round with "Key planned milestones after investment", the first being "Month 6, First London location", shows a concept render of a shopfront, and lists "Traction So Far" as social interest, a waiting list, a food tasting, press interest and the Elevator of Dreams win. Nothing on it mentions BOXPARK. The location page (lastmod 2026-09-04) announces "our first location at BOXPARK Shoreditch" with opening times, and BOXPARK's own site lists Sonny's as a trader. Events (Ideas Fest 9 to 10 Sept, Free From Festival Manchester 12 to 13 Dec). About is only an anchor on the homepage. So the story the site tells investors stops before the business opened, while the business has opened and is still raising
owner linkedin: Route 1 tools/fetch-walled.py https://www.linkedin.com/in/sonny-wells , 429, walled. Route 2 tools/social-audit.js on the same URL in Chromium, sign up wall, unknown. Route 3 web search "Sonny Wells" Sonny's gluten free fast food investment, SeedLegals interview (27 Jan 2025, "I'm pre-seed at the moment. We're currently going through the fundraising process"), a podcast episode, an HRC speaker page (404 when opened). Route 4 web search linkedin.com/posts sonny-wells, nothing of his. Route 5 the company page https://www.linkedin.com/company/sonnysfood rendered signed out, 386 followers, reposts of his posts, about 7 months ago "Drop me a message or head to our website www.sonnysfood.com to request the deck", about 9 months ago "No we haven't opened yet", about 2 months ago hiring "ready for our first full-time location", and the first trading at the London Free From Festival 23 and 24 May 2026. Route 6 his Instagram https://www.instagram.com/sonnythecoeliac/ via social-audit.js, 5,589 followers, 81 posts, latest 2026-09-30
contact linkedin: same person, Companies House (sole director and PSC), the site's "Meet Sonny" and the lemlist record agree
google news: tools/news.py en 2026-10-20, "Sonny's gluten free" 1 (Ipswich Star 14 May 2025, launch), "Sonny Wells" 28 all other people (obituaries), "Sonny's BOXPARK" 0, "Sonny's coeliac" 0, control Tesco 100
regional news: tools/news.py (London) (gluten free fast food), 62, London restaurant roundups, nothing on Sonny's, and (BOXPARK Shoreditch) (coeliac safe restaurant UK) 0
industry news: tools/news.py gluten free fast food, 100, a coeliac safe fast food chain opening in the US (Kindler's, Spokesman-Review 8 Oct 2026, Inlander 17 Sep 2026), and coeliac safe restaurant UK, 54, Be Inclusive Hospitality awards 14 Oct 2026, so the category is getting investor and press attention now
sources:
1. https://www.sonnysfood.com/
2. https://www.sonnysfood.com/investment
3. https://www.sonnysfood.com/location
4. https://www.sonnysfood.com/menu
5. https://www.sonnysfood.com/events
6. https://www.sonnysfood.com/sitemap.xml
7. https://find-and-update.company-information.service.gov.uk/company/15223618
8. https://find-and-update.company-information.service.gov.uk/company/15223618/filing-history
9. https://www.linkedin.com/company/sonnysfood
10. https://www.boxpark.co.uk/venues/shoreditch/food-and-drink/sonnys
11. https://www.coeliacsanctuary.co.uk/wheretoeat/london/tower-hamlets/shoreditch/sonnys
12. https://seedlegals.com/resources/sonnys-gluten-free-fast-food/
13. https://www.instagram.com/sonnys_food/
14. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fwww.sonnysfood.com
15. https://news.google.com/rss (tools/news.py)
16. https://www.linkedin.com/in/sonny-wells/ (walled)
17. http://archive.org/wayback/available?url=sonnysfood.com (captures Jan 2024 and May 2025 listed, the snapshots themselves blocked by our egress)
pains: 6 judged. (1) the investor story stops before opening, the investment page's first milestone is the London site that's now open, traction is social buzz and a waiting list, CHOSEN with (2). (2) the homepage still runs a launch waiting list while BOXPARK is open, so the story told to everyone is out of date, CHOSEN with (1). (3) the waiting list form carries Squarespace's "needs a storage option" note, unproven without a test sign up, held back. (4) the app on the investment page's month 16, future, not now. (5) social, Instagram 13,256 followers posting daily, strong, not an angle. (6) GDPR, from Stockholm Clarity and Google Analytics hosts load before a click, never the angle
chosen: (1) with (2), hottest and costliest, he's raising right now (shares allotted 1 Oct 2026) and sends investors to the site for the deck, and the site pitches a plan he's already delivered instead of the open, trading brand
owner reply: "Investors come through SeedLegals and my own network, not the website" | a model, not a gap | his own post reposted on https://www.linkedin.com/company/sonnysfood says "head to our website www.sonnysfood.com to request the deck", and the homepage's first button is "Invest in Sonny's" on https://www.sonnysfood.com/ , so the site is his investor channel by his own choice
worth: €4,000+, a Sonny's site rebuilt for the raise, the story from his diagnosis to BOXPARK on the homepage, an investor page built on the open site's traction with SEIS and EIS and the deck in one step, and the launch waiting list turned into BOXPARK visits
sweep website: crawled twice, screenshots of every page type, the investment page and the homepage still tell the story from before opening, CHOSEN
sweep gdpr: tools/eu-view.py from Stockholm on https://www.sonnysfood.com , 1 first party cookie, Clarity, Google Analytics and DoubleClick hosts requested before a click, site-audit.js GEO VOID from the US, checked, never the angle (RULES 0E)
sweep apps: the investment page plans an app at month 16 with the second site, a future build, not chosen, the site is the investor channel now per the crawl
sweep social: tools/social-audit.js, Instagram https://www.instagram.com/sonnys_food/ 13,256 followers, 86 posts, latest 2026-10-19, personal https://www.instagram.com/sonnythecoeliac/ 5,589, LinkedIn company 386 followers, strong, not chosen
sweep squad: a fast food startup with 2 to 10 staff, not a builder of software, not chosen, per the LinkedIn company page and register
thread: problem your website still tells the story from before you opened, the waiting list for the launch date and a first London location as a planned milestone for investors | cost investors sent there for the deck read a plan while Sonny's is already open at BOXPARK Shoreditch | offer a site that tells the whole Sonny's story to BOXPARK and shows investors the traction with the deck one click away | link story, investors, BOXPARK
lead read: Sonny reads that his site still tells investors the story from before he opened while he's open at BOXPARK, and gets offered a site that tells the whole story and shows investors the traction, one thread
claims:
the homepage asks people to join the waiting list for updates on the launch date, https://www.sonnysfood.com/ "JOIN OUR WAITING LIST ENTER YOUR DETAILS BELOW TO GET ACCESS TO UPDATES ON LAUNCH DATE, MENU DROPS AND MUCH MORE!", screenshot state/look_2026-10-20/14-sonny.jpg
the investment page lists a first London location as a planned milestone, https://www.sonnysfood.com/investment "Key planned milestones after investment ... Month 6: First London location", screenshot types/sonnys-investment-desktop.png
investors you send there for the deck, https://www.linkedin.com/company/sonnysfood repost of Sonny Wells "head to our website www.sonnysfood.com to request the deck", and the deck form on https://www.sonnysfood.com/investment
Sonny's is already open at BOXPARK Shoreditch, https://www.sonnysfood.com/location "our first location at BOXPARK Shoreditch" with "Opening Times Monday - Saturday 12 pm - 8 pm", and https://www.boxpark.co.uk/venues/shoreditch/food-and-drink/sonnys lists Sonny's
your diagnosis, https://www.sonnysfood.com/ "Diagnosed with Coeliac Disease in 2013, our founder Sonny"
INFERENCE, investors read a plan rather than the open brand, rests on https://www.sonnysfood.com/investment (milestones and traction, no BOXPARK) and https://www.sonnysfood.com/sitemap.xml (investment lastmod 2025-10-21)
websites credential, docs/astra-company-profile.md, Raka's fixed brand line, https://www.linkedin.com/in/raka-mulya-b92885196
recheck: 2026-10-20 14.40 to 14.42 UTC, every claim checked two ways that don't share a failure mode, the raw HTML by curl and the rendered text in Chromium, for the homepage, investment and location pages, plus BOXPARK's trader page, the LinkedIn company page re rendered ("head to our website www.sonnysfood.com to request the deck" still there) and the Companies House filing history reopened (8 allotments, the latest 1 October 2026). All PASS. Disproof tried, BOXPARK on the investment page 0 in the raw HTML and 0 in the render, on the homepage 0 and 0, checked the location page isn't an old plan (opening times on it, and BOXPARK's own trader page lists Sonny's), checked the investment page doesn't link BOXPARK anywhere (it doesn't). Facts hold, confidence HIGH
```

SKETCH
```
Hi Sonny, Sonny's looks cool!

However, your website still tells the story from before you opened. The homepage asks people to join the waiting list for updates on the launch date, and the investment page lists a first London location as a planned milestone. So investors you send there for the deck read a plan, while Sonny's is already open at BOXPARK Shoreditch.

I'd suggest a site that tells the whole Sonny's story, from your diagnosis to BOXPARK, and shows investors the traction with the deck one click away.

At Astra agency we make websites for brands like Unilever, AXA, Pertamina.

Shall I send you a sketch of the new Sonny's site for investors?
```

### Julien Salvat, Saavedra, ctc_yw97PDpTGevphfmh6

> NOT SENT. Raka's "a sales making customer facing website get more sales etc". The sale that matters most is catering. Grégoire Colas, Julien's co founder, posted about three months ago (reposted by the company) that the next step is "développer notre activité traiteur, les déjeuners d'équipe, les afterworks, les privatisations et les événements d'entreprise", after a first catering order of 70 empanadas and regulars from nearby companies. The website mentions none of it. Flags for Raka. (1) The site is the brand's own good looking Squarespace build, created September 2025 and last edited 17 July 2026, so the offer adds a selling side and never calls the site old. (2) The menu page is four pictures of the printed card, tiny on a phone, kept as proof for later, not put in the message. (3) The post is the clue and stays out of the message.

```gate
lead: Julien Salvat, gérant of SAAVEDRA, SIREN 103109583, created 24 March 2026, NAF 56.10C, 48 rue Condorcet 75009 Paris, gérants Grégoire Colas and Julien Salvat (https://recherche-entreprises.api.gouv.fr/search?q=saavedra&code_postal=75009 read 2026-10-20 ~14.40 UTC after five connection resets). lemlist jobTitle Co-fondateur, and https://www.saavedraparis.fr/equipe names "Julien et Grégoire". ctc_yw97PDpTGevphfmh6, leadId lea_qixgfP5qpP6uWyY7P, campaign W1b cam_7gnHSf6GvvGy8gH3n, accepted 2026-10-20 07.06 UTC. Thread pulled 2026-10-20 ~14.00 and ~14.10 UTC, 0 items, control 3 items
site pass 1: 5 pages (12 URLs with www and /home duplicates), tools/crawl.py on https://saavedraparis.fr , all 200, every page read, home, menu, click and collect, équipe, nos produits
site pass 2: 5 pages (12 URLs), second full crawl, same counts as pass 1, plus desktop and real iPhone screenshots of the home (state/look_2026-10-20/13-julien.jpg), menu, click and collect, équipe and nos produits (types/saav-*), opened, and the Zelty ordering page rendered on a phone
deep analysis: A wood fired empanada shop in the 9th, opened about June 2026 by two founders. The site is a strong brand piece (illustration, photography, the Saavedra club bags) and a thin seller. Home is 137 words, the logo, "Fabrique d'empanadas cuites au feu de bois", the address, a Click & Collect tile to saavedra.zelty-order.fr (pickup only, "À emporter, Récupérez votre commande") and "Je commande" to Deliveroo. Menu is four images of the printed card ("box de 6 ou 12, à partager", "Formules midi"). Click and collect sends pickup to Zelty and delivery "chez vous, au bureau ou pour un pic-nique" to Deliveroo. Équipe tells the founders' Argentina story. Nos produits is a photo wall. Nothing on any page about catering, team lunches, afterwork drinks, private hire or company events, no reviews, no opening hours, no legal or privacy page. Off the site, Deliveroo shows 4.7 "Excellent" from 30 reviews and the full menu in words, and the co founder's post reports 58 Google reviews at 5/5 a month after opening, a first catering order of 70 empanadas, local companies as regulars and a 10% partnership with WeWork Trudaine residents
owner linkedin: Route 1 tools/fetch-walled.py https://www.linkedin.com/in/julien-salvat-23401a137 , 429, walled. Route 2 Chromium render of the same URL, redirected to the LinkedIn login, walled. Route 3 web search "Julien Salvat" Saavedra, nothing of his. Route 4 web search "Avec Grégoire COLAS on lance Saavedra", the launch post surfaced on other people's profiles. Route 5 the company page https://www.linkedin.com/company/saavedra-paris/ rendered signed out, 96 followers, 2 employees, Julien Salvat listed, the co founder's one month post (about 3 months ago) and a kitchen job post (about 6 months ago, "à mesure que d'autres restaurants verront le jour"). Route 6 Instagram https://www.instagram.com/saavedra.empanadas/ via social-audit.js, 856 followers, 47 posts, latest 2026-10-16. The co founder Grégoire Colas, https://www.linkedin.com/in/gr%C3%A9goire-colas/ , 999 to fetch-walled and an auth wall in Chromium
contact linkedin: same person, the register (gérant), the équipe page and the company LinkedIn agree
google news: tools/news.py fr 2026-10-20, "Saavedra empanadas" 0, "Julien Salvat" 2 both other people, control Carrefour 101
regional news: tools/news.py (Paris) (empanadas), 49, Argentine openings in Paris (Paris Secret 23 Jul 2026, Sortir à Paris 30 Apr 2026), so the category is crowding in Paris
industry news: tools/news.py empanadas, 100, Yolanda empanadas (Orange 13 Oct 2026), Empanadas Malvón franchise expansion (L'Express Franchise 21 Feb 2025), plus the competitor Clasico Argentino's site https://www.clasicoargentino.com/ which sells delivery "au bureau"
sources:
1. https://www.saavedraparis.fr/
2. https://www.saavedraparis.fr/menu
3. https://www.saavedraparis.fr/click-collect
4. https://www.saavedraparis.fr/equipe
5. https://www.saavedraparis.fr/nos-produits-1
6. https://www.saavedraparis.fr/sitemap.xml
7. https://recherche-entreprises.api.gouv.fr/search?q=saavedra&code_postal=75009
8. https://www.linkedin.com/company/saavedra-paris/
9. https://deliveroo.fr/fr/menu/Paris/9eme-opera/saavedra-fabrique-dempanadas
10. https://saavedra.zelty-order.fr/
11. https://www.instagram.com/saavedra.empanadas/
12. https://www.tiktok.com/@saavedra.empanadas
13. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fsaavedraparis.fr
14. https://news.google.com/rss (tools/news.py)
15. https://www.clasicoargentino.com/
16. https://www.linkedin.com/in/julien-salvat-23401a137 (walled)
17. https://annuaire-entreprises.data.gouv.fr (Incapsula wall, register read through the API instead)
pains: 5 judged. (1) catering, team lunches, afterwork drinks, private hire and company events, the founders' stated next step and the biggest tickets (70 empanadas in one order), appear nowhere on the site, CHOSEN. (2) the menu is pictures of the printed card, unreadable on a phone and by search, a proof point, not the angle. (3) no reviews, no hours on the site despite 4.7 on Deliveroo and 58 Google reviews at 5/5, folded into the offer. (4) social, Instagram 856 and TikTok 7, small for a consumer brand but posting weekly, second best. (5) GDPR and legal, no banner and no mentions légales page, never the angle
chosen: (1), costliest and hottest, one catering order is dozens of empanadas, the founders say it's what they're growing next, and the offices that would book it land on a site that only offers Deliveroo and pickup
owner reply: "Catering comes to us through word of mouth and LinkedIn, we don't need it on the site" | a model, not a gap | the co founder's post on https://www.linkedin.com/company/saavedra-paris/ asks companies to get in touch for their next event and names catering and company events as what they're growing, and https://www.saavedraparis.fr/click-collect already sends office delivery to Deliveroo, so offices are customers the site is meant to serve
worth: €3,500+, a catering and company events side of the Saavedra site, office boxes, team lunches, afterwork drinks and private hire each with a page, the menu in words with photos, the reviews, and a quote request in one step that lands with the founders
sweep website: crawled twice, screenshots of every page type, nothing on catering or events across the 5 pages, CHOSEN
sweep gdpr: tools/eu-view.py from Stockholm on https://saavedraparis.fr , 4 first party cookies, Google Maps hosts before a click, no consent code, no privacy or legal link (site-audit.js with control), checked, never the angle (RULES 0E)
sweep apps: ordering already runs on Zelty for pickup and Deliveroo for delivery, a catering quote flow is folded into the site offer, per the click and collect page anchors
sweep social: tools/social-audit.js, Instagram https://www.instagram.com/saavedra.empanadas/ 856 followers, 47 posts, latest 2026-10-16, TikTok 7 followers, LinkedIn company 96 followers, second best, not chosen
sweep squad: a two founder restaurant, not a builder of software, not chosen, per the register and the LinkedIn company page
thread: problem your website never mentions catering, team lunches, afterwork drinks, private hire or company events | cost offices around rue Condorcet planning a team lunch or an event only find Deliveroo and click and collect, and likely book someone else | offer a catering and events side to the site, sharing boxes for offices, private hire and a quote request in one step | link catering, events
lead read: Julien reads that his site never mentions catering or company events, so nearby offices only find Deliveroo and pickup and book elsewhere, and gets offered a catering and events side to the site, one thread
claims:
never mentions catering, team lunches, afterwork drinks, private hire or company events, both crawls of https://www.saavedraparis.fr/ , /menu , /click-collect , /equipe , /nos-produits-1 (0 hits for traiteur, privatis, événement, entreprise, séminaire, afterwork, déjeuner), the raw HTML of home and menu (0), the menu card images read by eye, control the same word check on the LinkedIn company page text finds traiteur 2, afterwork 1, événement 2
only find Deliveroo and click and collect, https://www.saavedraparis.fr/click-collect "Click & Collect" to https://saavedra.zelty-order.fr/ and "Deliveroo" to https://deliveroo.fr/fr/menu/Paris/9eme-opera/saavedra-fabrique-dempanadas , homepage "Je commande" to Deliveroo (rendered anchors 2026-10-20)
rue Condorcet, https://www.saavedraparis.fr/ "48 rue Condorcet, Paris 75009"
sharing boxes, https://www.saavedraparis.fr/menu card image "Retrouvez nos empanadas en box de 6 ou 12, à partager"
INFERENCE, offices planning a team lunch or an event likely book someone else, rests on the site having nothing for them (above) and the co founder's post naming nearby companies as regulars, https://www.linkedin.com/company/saavedra-paris/ , worded likely
websites credential, docs/astra-company-profile.md, Raka's fixed brand line, https://www.linkedin.com/in/raka-mulya-b92885196
recheck: 2026-10-20 14.41 to 14.42 UTC, all 5 pages checked two ways that don't share a failure mode, the raw HTML by curl and the rendered text in Chromium, catering and events words 0 in every render and 0 in every page's visible HTML (the only raw hits are Squarespace template class names like tweak-events-stacked, not text), the click and collect links to Zelty and Deliveroo and the homepage's "Je commande" to Deliveroo read in the raw HTML, the sitemap reopened (5 URLs, no traiteur page), the LinkedIn company page re rendered (the traiteur and événements d'entreprise post still there). Disproof tried, every catering and events word in French and English, the menu card images read by eye for a catering line, the word check proved on the LinkedIn text (traiteur 2, afterwork 1, événement 2). Facts hold, confidence HIGH
```

SKETCH
```
Hi Julien, Saavedra looks cool!

However, your website never mentions catering, team lunches, afterwork drinks, private hire or company events. So offices around rue Condorcet planning a team lunch or an event only find Deliveroo and click and collect, and they'll likely book someone else.

I'd suggest a catering and events side to the site, with sharing boxes for offices, private hire and a quote request in one step.

At Astra agency we make websites for brands like Unilever, AXA, Pertamina.

Shall I send you a sketch of the Saavedra catering and events site?
```
