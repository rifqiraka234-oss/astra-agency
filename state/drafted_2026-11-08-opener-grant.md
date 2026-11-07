# NOT SENT. REWORDED after the first version failed falsification (Rekki, the trade email). New text approved by Raka 7 Nov ~07.45 UTC, "Send tomorrow at 07.28?", scheduled Sun 8 Nov 07.28 Amsterdam.

Approved text from state/drafted_2026-11-07-openers-review.md, Grant section. One mechanical change for the SKETCHB tag, "looks cool!" to "looks cool.". Nothing else touched.

Thread pulled 2026-11-07 07.19 UTC with tools/lemlist.py, control ctc_ch3vFcKAkjQdMKDCg 9 items ok, ctc_pjQ8taLCbmyw4PtzQ 0 items. Inbox listing (197 conversations) has no second contact for Harrington or Ampersand. State files grep on name, company, contactId, lea_xMQNkxwxqSJ9Kji2A, the LinkedIn slug and the domain, no SENT row, only logs/inbox/2026-11-07-unsent-accepts.md and the 7 Nov review file.

### Grant Harrington, Ampersand, ctc_pjQ8taLCbmyw4PtzQ

> Flags. (1) The falsification failure above. Rekki is the free ordering app for restaurants, so chefs can already order Ampersand without the form, https://rekki.com/gb/food-wholesalers/ampersand-dairy "THE FREE ORDERING APP FOR RESTAURANTS", "Sample Box (New Customers Only)", "delivery area London", "minimum order £5". (2) lemlist location reads Oxford, Nova Scotia, Canada, a geocoding slip for Oxford UK. Companies House says he lives in England and the dairy is at Bloxham Grove Farm, Banbury. (3) A true version of the angle exists (the homepage hero sells home delivery while restaurants are the main buyers, Rekki covers London only, and the case of 40 is the retail format), but it needs new wording, which is Raka's.

```gate
lead: Grant Harrington, lemlist jobTitle "Founder/Director of Ampersand", tagline the same, contact record read 2026-11-07 07.21 UTC. Companies House AMPERSAND DAIRY LTD 11904432, active, incorporated 25 March 2019, Unit 1 Bloxham Grove Farm Banbury OX15 4LL, SIC 10512 butter and cheese production. Sole officer HARRINGTON, Grant, director since 25 March 2019, identity verified 9 April 2026, and the only person with significant control, 75% or more of shares and votes. ctc_pjQ8taLCbmyw4PtzQ, lea_xMQNkxwxqSJ9Kji2A, cam_xFYYBzvfSHk83epvw. Thread 0 items, control 9
site pass 1: 43 URLs, tools/crawl.py on https://ampersanddairy.com, 42 at 200 and 1 at 400 (a Shopify login redirect), every page read (home, shop, about, delivery and order information, wholesale, 6 products and their variants, news, privacy, refund, terms, agents.md)
site pass 2: 43 URLs, tools/crawl.py again, 42 at 200 and 1 at 400, plus site-audit.js (RENDER NOT TRUSTED, 6 of 6 failed assets served fine by direct fetch, so its screenshots are void) and then tools/render-via-curl.js on the homepage (215 served, 0 curl errors) and the wholesale page (201 served, 0 curl errors), every part opened. Homepage hero, full bleed buttered bread, the logo and one button "PLACE AN ORDER FOR HOME DELIVERY", then the 3 star Great Taste 2026 badge. Wholesale page, four formats, "Used by leading kitchens", the enquiry form, then "Also available on Rekki" and the trade email in the footer
deep analysis: a one director butter dairy in Oxfordshire since 2014, Ltd since 2019, cultured butter churned to order ("Each batch takes around seven days"). Two sides. Home, a Shopify shop (salted cultured 200g £6, two flavoured butters £5, a tasting collection £28, a soda bread kit, a book) and four stockists (Neal's Yard Dairy, 2 North Parade, Wells Farmshop, The Small Food Bakery). Trade, "supplies kitchens, shops, counters, bakeries and foodservice customers across the UK", kitchen formats in logs, sheets and blocks, service portions, retail 200g, buttermilk, "served in restaurants holding more than 80 Michelin stars collectively". Trade routes in are three, the wholesale form, the thedairy@ email on every page, and Rekki for London kitchens. The Ampersand Case (40 X 200g) £186.20 is sold in the shop as "The perfect format for delis, farm shops, and independent retailers". The homepage hero sells home delivery while the trade block sits further down. INFERENCE, restaurants are the main buyers (Ox in a Box 2019, "wholesale customers are restaurants"), so the hero speaks to the smaller side
owner linkedin: Route 1 https://www.linkedin.com/in/grant-harrington-2698297a curl 999, and /recent-activity/all/ 999. Route 2 web search "Grant Harrington" Ampersand butter, Delicious, Country Life, VICE Munchies, Ox in a Box, Saveur, a former chef from Swedish fine dining (Fäviken), tier G. Route 3 Companies House, sole director and PSC. Route 4 the about page names him founder. Route 5 the lemlist record. Route 6 Instagram https://www.instagram.com/ampersanddairy through social-audit.js
contact linkedin: same person as the owner, the about page "our founder Grant Harrington", Companies House and the lemlist record agree
google news: tools/news.py en 2026-11-07, company "Ampersand Dairy OR Ampersand butter" 10 hits none about them, person "Grant Harrington" 10 hits, 1 about him (Ox in a Box 3 Nov 2019, read), control Tesco 100
regional news: tools/news.py (Oxfordshire dairy OR Banbury butter) x (cultured butter UK restaurants), 5 hits, FT "Who makes the best butter?" 2023, The Caterer 2020, Ox in a Box 2019, Country Life 2018, background only
industry news: tools/news.py cultured butter UK restaurants OR artisan butter wholesale UK, 11 hits, The Caterer "Put some culture into butter" 15 Dec 2025, The Grocer "trends in spreads 2025", Wirecutter best butters Aug 2026, plus the trade press by name (The Caterer, The Grocer), background only
sources:
1. https://ampersanddairy.com/
2. https://ampersanddairy.com/pages/wholesale
3. https://ampersanddairy.com/pages/about
4. https://ampersanddairy.com/products/ampersand-case-40-x-200g
5. https://ampersanddairy.com/pages/delivery-order-information
6. https://rekki.com/gb/food-wholesalers/ampersand-dairy
7. https://find-and-update.company-information.service.gov.uk/company/11904432/officers
8. https://find-and-update.company-information.service.gov.uk/company/11904432/persons-with-significant-control
9. https://www.instagram.com/ampersanddairy
10. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fampersanddairy.com
11. https://oxinabox.co.uk/the-man-making-gold-out-of-butter-right-here-in-oxfordshire-and-his-michelin-starred-fans/
12. https://news.google.com/rss (tools/news.py)
pains: 4 judged. (1) the site leads with home delivery while restaurants and trade are the bigger buyers, and new kitchens outside London have no self serve route (Rekki delivers London only), the sales side Raka picked. (2) apps, a made to order dairy churning in seven day batches with trade orders split over a form, an email and Rekki, a real but unproven order handling pain. (3) social, Instagram 7,947 followers, 322 posts, latest 29 Oct, healthy. (4) GDPR, the Shopify banner is set to GB only, so from Stockholm 11 cookies including _ga and _fbp fired before a click, checked, never the angle
chosen: (1) reworded, biggest, new restaurant and bakery openings choose suppliers before they open, a weekly trade account against a £6 home order. The website half is dropped, the homepage already has a 'For kitchens, shops and counters' section and a Wholesale Enquiries button (homepage text read 7 Nov), so the site angle is weak
owner reply: "Chefs already order us on Rekki" | good, the flow reaches the new openings that have never heard of Ampersand | Rekki only serves chefs who already know it and delivers London only, https://rekki.com/gb/food-wholesalers/ampersand-dairy
worth: €4,000+, an AI powered outreach flow that tracks UK restaurant and bakery openings and gets samples to their head chefs, plus the sample and follow up handling
still there: Companies House lists Grant Harrington as sole active director and PSC, read 2026-11-07, and the about page names him founder | https://find-and-update.company-information.service.gov.uk/company/11904432/officers
budget: Michelin kitchens as customers, four named stockists, a paid photographer credited and a Shopify store with paid analytics | https://ampersanddairy.com/pages/delivery-order-information
variant: outside the A/B test, the text carries 'AI powered outreach flow' (RULES section 1, from 4 Nov)
sweep website: crawled twice, 43 URLs each, render-via-curl screenshots opened with 0 curl errors, a calm modern Shopify theme whose hero sells home delivery, chosen family
sweep gdpr: site-audit.js GEO VOID, tools/eu-view.py --shopify from Stockholm 11 cookies before a click including _ga and _fbp, Shopify regionVisibility ["GB"] so EU visitors get no banner, checked, never the angle (RULES 0E)
sweep apps: trade orders arrive by form, email and Rekki for a made to order dairy, no proof of order pain in their own words, not chosen, read on https://ampersanddairy.com/pages/delivery-order-information
sweep social: tools/social-audit.js, Instagram https://www.instagram.com/ampersanddairy 7,947 followers 322 posts latest 29 Oct 2026, the only account linked in the HTML, healthy, not chosen
sweep squad: a one director dairy with no tech team or job posts on the site (crawl of 43 URLs), nothing to staff, not chosen
thread: problem new restaurants and bakeries pick their suppliers before they open | cost most of them likely never hear of Ampersand in time | offer an AI powered outreach flow that spots those openings and gets samples to their head chefs | link Ampersand
lead read: Grant reads that his butter is in Michelin kitchens but new openings choose suppliers before they open and may never hear of Ampersand, then gets offered a flow that spots those openings and gets samples to their chefs, one thread
claims: your butter has been served in restaurants holding more than 80 Michelin stars, https://ampersanddairy.com/pages/about "has been served in restaurants holding more than 80 Michelin stars collectively", also on https://ampersanddairy.com/pages/wholesale
INFERENCE, new restaurants and bakeries pick their suppliers before they open, the pre opening order of any kitchen, worded as general, rests on https://ampersanddairy.com/pages/wholesale "supplies kitchens, shops, counters, bakeries"
INFERENCE, most of them likely never hear of Ampersand in time, worded likely, rests on Rekki delivering London only https://rekki.com/gb/food-wholesalers/ampersand-dairy
recheck: 2026-11-07 ~07.50 UTC, the Michelin line reopened on the about and wholesale pages, holds. Disproof tried, searched the site for an openings or new accounts programme and found only the wholesale form, the trade email and Rekki, none of which reaches a kitchen that hasn't heard of Ampersand. Facts hold, the two inferences are worded likely and general, confidence MEDIUM
```

SKETCHB
```
Hi Grant, Ampersand looks cool.

However, your butter has been served in restaurants holding more than 80 Michelin stars, yet new restaurants and bakeries pick their suppliers before they open. Most of them likely never hear of Ampersand in time.

I'd suggest an AI powered outreach flow that spots those openings and gets samples to their head chefs, so the trade orders keep growing.

Shall I send you a sketch of the flow for Ampersand?
```
