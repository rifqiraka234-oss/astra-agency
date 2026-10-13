# The Garnish Collective, corporate ordering sketch. Build notes, 2026-10-13

Lead. Chris Hale (Christopher Colin Hale), founder and head chef, The Garnish Collective, sole director of
THE GARNISH COLLECTIVE LTD 16179771. lemlist ctc_do7oK8f27qGMC89dA. He said "Sure Raka, would be interested in
seeing your take!" on 12 Oct 21:28 UTC to the SKETCH opener (corporate ordering site, set menus for boxes and
buffets, order and pay online, one tap reorders for regulars like Evri).

NOT SENT. Nothing was sent to anyone, no lemlist write, no commit. The lead session commits and Raka sends.

## Live

- URL https://astra-garnish-prototype.netlify.app (name as briefed, it was free, Netlify's own "Not Found" at
  05:25 UTC with https://astra-qualigraf-prototype.netlify.app returning 200 through the same path as control)
- Netlify site id fe9f6751-04d5-48cd-8812-62f86b44c320, team 6a75917309221b32b3265992
- Deploy id 6acdcec9e1da4a850486f9ba, state ready, published 2026-10-13 06:25:19 UTC
- Permalink https://6acdcec9e1da4a850486f9ba--astra-garnish-prototype.netlify.app
- Access controls, requiresSSOTeamLogin false, requiresPassword false (read back from get-project after deploy,
  the project was created with SSO on for all deploys and it was switched off before the deploy)
- sha256 index.html 98eb9eeb116fd74e4793c9da68b0617048db4ac89570d6a4d8a8dfc3244d1007 (90,183 bytes)
- Deployed from a clean folder holding only index.html, img/, fonts/ and netlify.toml (publish ".", no command)

## What the site does

1. Set menus. Three tabs, Bags & Boxes, Buffets and Christmas 2026. Each menu card shows the price a head, the
   minimum and a tag saying whether the price is an example or from his brochure. Picking a card opens the dish
   list, with every dish tagged "Chris's dish" (named by him somewhere, source below) or "Example".
2. Order. Headcount and vegetarian, vegan, gluten free and dairy free counts with steppers, drawn live as a tray
   of boxes (box menus) or a table with guests around it (buffets). Date chips that only offer dates the lead time
   allows (UK time, weekends and England and Wales bank holidays skipped), or any date in a date field with a
   reason when it's refused. Delivery or set up time. Address with a postcode check that prices delivery locally
   and says "Chris confirms" outside the area.
3. Pay. A kitchen ticket (sticky on desktop, a bottom bar and sheet on phones) totals it live. Checkout by card
   (a demo with no card fields) or invoice to the account with an optional purchase order number. Confirmation
   stamps the ticket with his monogram and gives an order reference.
4. Reorder. Every order can be saved as a usual (browser storage only). The "Your usual" section shows a demo
   account, "Your Company Ltd", with three example saved orders and the visitor's own, and one tap puts the order
   back on the ticket for the next date that matches its usual weekday and time. Example invoices sit below.
5. Story and proof around it. The office day (two ONS numbers, a chart), the kitchen (his sustainability lines),
   the Evri quote word for word, and the made to measure lines (canapés, Installed Edible Displays, Tailored Event
   Service, Bar Hire) linking to his real enquiry page.

## Teardown, rendered and looked at (desktop 1440 and phone 390, 05:48 to 06:01 UTC)

17 rendered and usable, out of 23 attempted.

1. ezCater (ezcater.com). Address first, then category chips (Breakfast, Sandwiches, Individual packaging, Gluten
   free) and "Perfect for team lunch" rails. The delivery address is the very first question.
2. CaterCow (catercow.com). Names the two serving styles up front, family style or individually boxed, and offers
   group ordering where each person's meal arrives labelled with their name. Review proof beside the hero.
3. Feedr sandwich platters (feedr.co/en-gb/corporate-catering/sandwich-platters). One page per category with a
   three step how it works and client logos. (Feedr's root is a country picker, not counted.)
4. Just Eat for Business (citypantry.com redirects here). Postcode box in the hero, an "options for every diet"
   chip row, popular dishes grid.
5. Grubhub for Business (grubhub.com/corporate). Sells budgets and allowances to the employer, not the dish.
6. Deliveroo for Work (deliveroo.co.uk/business). Allowances, and "all bundled into a single monthly invoice" as
   a selling point. Invoicing matters to corporate buyers.
7. itsu office catering in Leeds (itsu.com/catering/office-catering-in-leeds). States the rule in the first
   paragraph, order by 6pm for next day, minimum £60. Platter cards say what's in them.
8. itsu office catering in London. Same template, so the ordering rules read the same in every city.
9. EAT Club (eatclub.com). Individually packaged meals and scale counters (meals, companies, cities).
10. Fooda (fooda.com). A workplace programme of pop up restaurants, app screens, review badges.
11. Great Food at Leeds (gfal.leeds.ac.uk/delivered-food). The Yorkshire baseline, PDF menus and orders by email
    with two full working days' notice.
12. PAUL UK catering (paul-uk.com/catering). The cleanest grid, photo, "Serves 6 to 10", a fixed price and a basket
    button on every card, and "Order by 12pm for next day" in the top strip.
13. Ottolenghi catering (ottolenghi.co.uk/catering). Chef led and editorial, photography first, packages, then an
    ordering platform for office orders.
14. LEON Feed Your Team (leon.co/feedyourteam). Minimum spend stated up front, prices match the restaurant,
    platters marked coming soon.
15. GAIL's (order.gailsbread.co.uk). Seasonal story first, ordering second.
16. CaterSpot (caterspot.sg). Hero chips for "Pay by invoice" and "Group order", a food safety badge, a delivery
    location box.
17. Wenzel's (wenzels.co.uk). "Order before 3pm today for tomorrow's lunch" in the hero, platter carousel.

Not usable, and why. Pret and Planet Organic and Daylesford, the catering paths were my guesses and returned 404
(searches found no catering page for Planet Organic or Daylesford). Social Pantry rendered without its CSS. Just
Eat for Business direct failed at the proxy tunnel (covered by the citypantry.com redirect, which rendered).

What carried over, done for a chef led caterer. The live cut off line in the hero (Wenzel's, itsu), price a head
and minimum on every card (PAUL), dietary needs as first class counts (Just Eat, CaterCow), invoice for account
buyers (Deliveroo, CaterSpot). What none of them showed on the page, and the build leads with, is the regular's
usual order as a one tap reorder on the same weekday, the chef's own dishes tagged as his, and his real Christmas
packages orderable.

## Sources, with fetch times (UTC, 13 Oct 2026)

- His site, tools/crawl.py at 05:38, 9 URLs (8 pages plus the bare domain), all 200, sitemap.xml 404. Every page
  rendered full page at 1440 and 390 in Chromium 05:40 to 05:43, raw HTML curled 05:44:51. site-audit.js on
  /corporate, render trusted (the only failed requests were Wix telemetry).
  https://www.garnishcollective.com/ , /about-1 , /corporate , /barhire , /weddings , /celebrations , /enquire ,
  /about-1-1
- His LinkedIn company page https://www.linkedin.com/company/thegarnishcollective rendered 05:46:48. Posts read in
  full, burger sliders (3d), slow cooked pork belly (5d), paella for We Are Wakefield's summer social (1w), bar
  hire (1w), canapés (1w), Hodroyd Corporate Christmas Party (2w), Corporate Christmas Packages brochure (2w),
  dessert (2w), private dining (2w), "Corporate buffet. Steakhouse energy." with steak (3w). 160 followers.
- His brochure "Corporate Christmas Packages", 10 pages, a LinkedIn document post, manifest, transcript and the PDF
  fetched 05:47 (PDF metadata, created 2026-09-22 in Canva). Page 3 "Christmas Grazing Table from £18pp",
  page 4 "Christmas Hot Sandwich Menu from £12pp, Includes serving staff, setup, disposable plates & cutlery",
  "Add desserts £8pp". Read in the PDF text layer and in the rendered pages.
- ONS, Who are the hybrid workers?, 11 November 2024, curled 05:50:42.
  https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/employmentandemployeetypes/articles/whoarethehybridworkers/2024-11-11
  "More than a quarter of working adults in Great Britain (28%) were hybrid working in the autumn of 2024 ...
  data collected between 2 and 27 October." "Close to half (45%) of those in more senior occupations (shown in the
  chart below as 'managers, directors and senior officials') followed a hybrid working model, compared with 27% of
  all workers. That compares with just 3% of people in 'elementary occupations'" (10 April to 30 June 2024).
- Press check on MasterChef, Hemsworth and South Elmsall Express "Chris cooks up a storm in the MasterChef kitchen
  and makes it to the quarter-finals" and Yorkshire Evening Post (search results, 2016 series). The site uses his
  own wording, "MasterChef UK quarter finalist".
- Dropped. The Eurest survey (77% of workers tempted back by free food, July 2022). The Compass page returns 404 to
  curl and to tools/fetch-walled.py, so only second hand copies exist. Not on the page.

## Brand, from his own files

- Logo. The TGC monogram and the spaced wordmark are his Wix uploads, served at size by Wix itself (the monogram
  through Wix's crop step, since the file has wide transparent padding). Shown in his ink on light, and in cream
  on dark with a CSS filter, as his LinkedIn tiles show it. Never redrawn.
- Colours. From his site CSS, #275F49, #183E30, #8DA99B, #C0CDC4, #F3F2ED. Logo ink #042015. LinkedIn tile green
  #00241A. Brochure paper #EDE3D9 and ink #425852.
- Type. Poppins (his site) for text, Cormorant Garamond (his brochure and LinkedIn tiles) for display. DM Mono
  only on the kitchen ticket, as our grammar. All OFL, self hosted latin subsets.

## Images, all his, every one byte matched to its source at 06:24:25 UTC (12 of 12) and live after deploy

| File | Source | sha256 |
|---|---|---|
| plated.jpg | Wix rendition of his upload bb6496_e5781b70 (homepage and weddings page) | `1eb8cfeee871fd63ac445d604468267d09adbdb34e359fe747cd634b0bbe3de3` |
| dessertrow.jpg | Wix rendition of his upload bb6496_b4bd1822 (corporate and weddings galleries) | `70a0e3dc49b90632d3c04832c708c07aa7febd55881cfb97ec68df31d6063145` |
| emblem.png | Wix crop rendition of bb6496_280e3709, TGC LOGO V2 - Emblem.png | `712f3abcce020921a3603ab7ab472fed913323da560fbd4830902c1d3292874d` |
| wordmark.png | Wix rendition of bb6496_23912fc4, TGC LOGO V2 - Text.png | `9d040d8873ad41f11daaf3fec0f4e1ce45bc39ae3bcc3b6c8678585e8ae433b5` |
| li_sliders.jpg | LinkedIn post, burger sliders | `51c9078c52cf68dda3b66eb74c2b7d64c7fed80eab267051de5f445b6944b3e4` |
| li_porkbelly.jpg | LinkedIn post, slow cooked pork belly | `ec6d6cc5140dd2951a7ac3b57941bf779078df438b374f29658e491649e34128` |
| li_paella.jpg | LinkedIn post, paella | `8e3c93e2370088b939425858fb11bb603e7ba377efe0f8f1180c1b741d12b4cb` |
| li_bar.jpg | LinkedIn post, bar hire | `0beb4a5d9c50abb3d17225024de6928ef2df9fdc1a74fdc595ccc6838f23352b` |
| li_canapes.jpg | LinkedIn post, canapés | `5f3a6f063711fc21cd492f51f890419de1d0c27b95e3509e3b4be92f5da2eb22` |
| li_dessert.jpg | LinkedIn post, dessert (same photo his brochure puts next to Add desserts) | `1b8377e1bcda4d2f00418ed66b6b4a0abe5d16c33933051a63a821c63de5b12b` |
| li_privatedining.jpg | LinkedIn post, private dining | `4acfcc5c192605d6be783b3e07713e76f7422f6928194d86ec9b92e391cc0b05` |
| li_steak.jpg | LinkedIn post, Corporate buffet. Steakhouse energy. | `0bb9162650333531ca03ec5ead9dfda509571c231467bfeaf98a49d871df4d76` |

Full hashes and full source URLs are in `image-sources.txt` next to this file.

- His LinkedIn tiles carry his caption over the bottom third. The page shows his exact file and crops it with CSS
  to the top 62.5% (16:10 from the top), so no caption shows and no file was edited. The lowest caption starts at
  70.7% (steak), measured.
- No photo is captioned. Alt text describes only what's visible. Dish photos sit only next to the dish he posted
  them as (sliders on the hot and cold buffet, steak on the steakhouse buffet, paella on paella, dessert on the
  Christmas desserts add on).
- Left out on purpose. Every lunch box photo on his corporate page carries another company's brand (Netflix,
  Nivea, Twitter, Laura Ashley, M&Co, Bun Bun with "Taichung" on the box, Grape & Fig), as do the bar and display
  photos (Johnnie Walker, Bulgari, LinkedIn, Crumbl, Yellowglen). Showing them implies relationships nobody has
  verified, and several look like other caterers' work. Also left out, Wix stock media (11062b_ ids), the "medieval
  4" banquet that looks like a film set, the grazing table on rugs (unverified), Hodroyd Hall, and every photo
  where a person's face is the subject.

## Every number on the page, and where it comes from

His own, cited on the page as from the 2026 brochure
- Christmas hot sandwich menu from £12 a head, desserts £8 a head, "Includes serving staff, setup, disposable plates
  & cutlery".
- Christmas grazing table from £18 a head.
- Dish names on both Christmas menus, the canapé list and the three course dinner list.

Public data, cited on the page with source and date
- 28% of working adults in Great Britain hybrid working, autumn 2024 (data 2 to 27 October), ONS 11 Nov 2024.
- 45% managers, directors and senior officials, 27% all workers, 3% elementary occupations, 10 April to 30 June
  2024, same ONS article.

EXAMPLE figures, labelled on the page, for Chris to replace
- Breakfast box £9.50 a head, example minimum 6.
- Lunch box £13.50 a head, example minimum 6.
- Banquet style package £16.50 a head, example minimum 10.
- Hot and cold buffet £21 a head, example minimum 15.
- Steakhouse buffet £27 a head, example minimum 15.
- Paella for the team £15 a head, example minimum 20.
- Christmas menus, example minimums 10 (hot sandwich) and 15 (grazing table). His prices, our minimums.
- Cut off 2pm, next working day for boxes and sharing packages, two working days for buffets, five working days
  for Christmas menus, Christmas dates 16 November to 23 December 2026, deliveries Monday to Friday.
- Delivery for boxes, local postcode areas WF, LS, BD, HD, HX and S70 to S75, free from £150, otherwise £12.
  Outside them, "Chris confirms". Buffet set up included locally. Grazing table set up "to confirm".
- Invoice terms 30 days.
- Delivery and set up times 7.30am to 6pm in half hours.
- Demo account "Your Company Ltd" (a made up company, labelled), address "Floor 3, 1 Example Street, Wakefield,
  WF1 2AB", saved orders Thursday team lunch (14 lunch boxes, 2 vegetarian, 1 vegan, 1 gluten free, 12.30pm),
  Board breakfast (8 breakfast boxes, 1 vegetarian, 8.30am), Quarterly team day (hot and cold buffet for 40, 6
  vegetarian, 2 vegan, 3 gluten free, 12pm).
- Example invoices INV 1187 £189.00 (8 Oct), INV 1184 £88.00 (6 Oct), INV 1176 £840.00 (25 Sep, due 25 Oct),
  worked out from the example prices (14 x 13.50, 8 x 9.50 + 12, 40 x 21).
- Order references "TGC" plus four random digits.

Dishes. On box and buffet menus, every dish he doesn't name is tagged "Example" on the page. His named dishes,
tagged "Chris's dish", are burger sliders, slow cooked pork belly, steak (his words "beautifully cooked steak"),
paella "cooked and served fresh", and all Christmas dishes. Hyphens and colons were dropped from his dish names
(for example "Treacle glazed ham", "Smoked salmon blinis, dill crème fraîche, lemon zest, capers").

## QA results

- Cold load, nothing forced, 1440 and 390, local and live. 0 page errors, 0 console errors, 0 failed requests,
  13 of 13 reveals fired, 14 of 14 images decoded on load, every one of the 12 image files decoded across all three
  tabs, scrollWidth equals viewport (1440 and 390), no element overflowing outside a scroller.
- Tool exercised with a fixed UK clock (Tue 13 Oct 10am) and real inputs, values read back from the page.
  - A. 14 lunch boxes, 2 vegetarian, 1 vegan, 1 gluten free, WF1 2AB, card. Ticket £189.00, delivery free, tray
    drew 14 boxes, confirmation shown, saved as a usual, read back from localStorage after a reload, reorder put it
    back for Thursday 15 October 12.30pm with address and dietary counts restored.
  - B. Steakhouse buffet for 30, M1 1AE, invoice with a purchase order. £810.00 plus travel to confirm, label
    "Set up by", Saturday refused ("Deliveries run Monday to Friday"), too soon date refused.
  - C. Christmas hot sandwich menu for 25 with desserts, LS1 4AP. From £500.00 (25 x 12 + 25 x 8), 2 November
    refused, first offered date Monday 16 November.
  - Also. 9 lunch boxes to S70 2AB, £133.50 (121.50 + 12), both widths. Paella for 22 to WF2 9AB placed on the LIVE
    site, £330.00. Validation with an empty form lists every missing field and blocks the order.
  - Clock tests. 3.30pm Tuesday gives Thursday, Friday 10am gives Monday, Saturday gives Tuesday, 24 Dec 10am gives
    Tuesday 29 December (25 and 28 Dec bank holidays skipped), Christmas menus show "orders have closed" after 23 Dec.
- Screenshots at 1440 and 390 of every section, the three tabs, the guests step, the ticket sheet and the
  confirmation, all looked at. Fixed along the way, a distorted wordmark, a LinkedIn caption showing through an
  oversized photo, the stamp sitting on the first order line, an overflowing ticket line, clipped tabs at 390.
- Copy. Every visible string captured across 467 lines in every state (all menus, errors, postcodes, dialog,
  toasts, alt text, placeholders). 0 colons, 0 hyphens or dashes outside URLs and emails. 1 exclamation mark,
  inside the Evri quote. No country other than the UK (Great Britain, from the ONS title). Contractions present, 11 distinct
  in our copy (can't, date's, delivery's, don't, he'll, it's, set up's, that's, there's, you'd, you're).
- NO-AI-SLOP section 8, run verbatim on the HTML and on the visible text, positive control fired on every check.
  Visible text, 0 banned words, 0 hedges, 0 paired adjectives, 0 uncontracted verbs, 0 em dashes, 0 emoji. One
  banned phrase, "when it comes to", inside Stacey Dockerty's quote, kept because it's her words. HTML file hits
  are the CSS and JS `transform` property and JS `!` operators, not copy. Prose sentence lengths 2 to 30 words,
  stdev 6.8.
- Build rules. No inline grid styles, every grid minmax(0,1fr), no scroll-behavior, favicon (his monogram),
  charset utf-8, both script blocks parse in the local file and in the downloaded live file.
- Live. 200, title "Corporate ordering | The Garnish Collective", live HTML byte identical to the deployed file
  (same sha256, no Netlify injection), visible text identical to local at both widths, 20 of 20 assets fetched live
  and byte matched (12 images, 8 fonts), netlify.toml not served (404), SSO and password off.

## Must not ship as is

1. Every price on the box and buffet menus, every minimum, the cut off, lead times, delivery charges and areas,
   set up inclusions, the Christmas date window, the invoice terms and the time slots. All examples.
2. Every dish tagged "Example" on the box and buffet menus. Chris writes the real ones.
3. Menu names "Breakfast box", "Lunch box", "Hot and cold buffet", "Steakhouse buffet", "Paella for the team" are
   ours, built from his product lines and posts.
4. The demo account, its saved orders, address and invoices. Made up.
5. Payment is a demo. A real build needs a payment provider, an order inbox or kitchen view, confirmation emails,
   VAT treatment (hot food and catering are standard rated, his accountant decides how prices show), allergen
   handling and terms.
6. Saved usuals live in the visitor's browser only. A real account system is needed.
7. "noindex" is set in the head, take it off at launch.
8. Process lines that are our assumption, "A confirmation would go to ... and the order would land on the
   kitchen's list", and "Chris confirms the delivery charge". Check they match how he works.
9. The phone number 07899 767279 and feasting@garnishcollective.com are his, from his site footer and brochure.
   Confirm he wants them on an ordering page.

## For Raka, before the delivery message

- His Christmas brochure says "No boxes. No set menus. Just Christmas, your way." on page 2, then prints priced
  menus. The page treats every Christmas menu as a starting point ("tell Chris what to change in the notes") and
  keeps canapés and the three course dinner as "Ask Chris for a price". Worth saying in the delivery message that
  the set menus are starting points, so it doesn't read as arguing with his own brochure.
- Two things in his own brochure he may want to know about, not for the message. The three course dinner price
  reads "From E45pp" in the PDF itself, and the canapé price line reads "(Canapes from £per canape, per, person)",
  an unfilled template. Neither is shown on the page.
- His site's Facebook and Instagram icons (Bar Hire and Enquire pages) link to facebook.com/wix and
  instagram.com/wix, unconfigured placeholders. Not used, not mentioned on the page.
- His site calls him both "MasterChef finalist" and "former MasterChef UK quarter-finalist". The page uses
  quarter finalist, which press from 2016 confirms.
- The site's "20 years Industry Experience" is a company stat (LinkedIn says the team "combines over 20 years").
  It's not attributed to Chris on the page.
- The Evri quote stays word for word, so it keeps "when it comes to" and the one exclamation mark.

## Couldn't verify

- Whether the LinkedIn post photos and his site photos were shot at his own events. They're his uploads and the
  dishes match his captions, and nothing on the page claims more than that.
- Whether the plated beef and the dessert row on his site are his own dishes (high resolution camera originals
  with his file names, uncaptioned on the page).
- Real lead times, prices, minimums or delivery area. His site and posts publish none outside the Christmas
  brochure.
- The brochure's prices are "from" prices dated September 2026. Whether they still hold.
