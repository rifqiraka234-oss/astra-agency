# Research, 2026-10-26, Danielle Best, Charlie's Desserts, ctc_EYmubFsDGMzFWbfxe

Research 17.15 to 17.45 UTC. Evidence folder
/tmp/claude-0/-home-user-astra-agency/3eb57ba4-cf6b-5d03-9c5f-6f974020ac75/scratchpad/charlies
(crawl pass1, pass2 renders and pass2.json, raw HTML, Companies House pages, FSA JSON, menu PDF, news).

## 1. The record against itself, resolved

lemlist says jobTitle Founder, companyName Charlie's Desserts, domain charliesdesserts.com. Her tagline says
"Founder - Mexi Bean Express ...". Both are hers. Charlie's Desserts is a sister brand inside her group, with Mexi Bean
(Mexican QSR) and Kalm (wellness cafe and studio).

- University of Huddersfield media, 18 Feb 2026, "The Kalm, Mexi Bean and Charlie's Desserts CEO has previously won the
  Emerging Leader of the Year and Hospitality Leader of the Year"
  https://mediahud.hud.ac.uk/2026/02/18/kalm-and-mexi-bean-ceo-leads-major-business-award-nominations/
- Charlie's Desserts LinkedIn company page, rendered signed out in Chromium 26 Oct, Restaurants, Brighouse, 42 followers,
  Founded 2025, 2 to 10 employees, 3 Bridge Road HD6 1EP, Employees "Danielle Best" and "Charlie Brammah", similar pages
  Mexi Bean Express and Mexi Bean. https://www.linkedin.com/company/charliesdesserts
- charliesdesserts.com/contact-us carries a photo named "Mexi,Kalm,Charlies-42.jpg", one shoot across her three brands.
- FSA register, "Charlie's Desserts", 3 Bridge Road Brighouse HD6 1EP, Restaurant/Cafe/Canteen, rated 5 on 17 Mar 2025.
  https://api.ratings.food.gov.uk/Establishments?address=HD6%201EP (FHRSID 1770212)
- Still trading. Instagram newest post 2026-10-25, Facebook post 22 hours before the 26 Oct read ("HALF TERM SALE!"),
  site menu and home edited 2026-04-23 per the sitemap.

Companies House, Danielle BEST, born October 1986, Brighouse, four officer records.
- MEXI BEAN LTD 12943131, active director since 12 Oct 2020, licensed restaurants, verified.
- MEXI BEAN FRANCHISE LIMITED 15914912, active director since 23 Aug 2024 (confirmation statement overdue).
- MBE BRIGHOUSE LIMITED 15081323, active director since 1 Nov 2024, licensed restaurants, accounts overdue, first Gazette
  notice 18 Aug 2026, strike off suspended 15 Sep 2026.
- DOBB LEISURE LIMITED 16057311, active director since 4 Nov 2024, SIC 56290 other food services, registered at her group's
  24 Commercial Street address, accounts overdue, FIRST GAZETTE NOTICE FOR COMPULSORY STRIKE OFF 29 Sep 2026 (its second,
  the first was discontinued 21 Jan 2026). This is the likeliest operator of Charlie's (food services, incorporated
  Nov 2024, Charlie's FSA rated Mar 2025) but nothing on the register names Charlie's, so that's a candidate, not a fact.
- DABB WELLNESS LIMITED 15533832, active director (likely Kalm).
- Dissolved, MEXI BEAN EXPRESS LTD 13423618 (voluntary strike off, 6 Oct 2026), MBE WAKEFIELD LTD, CHURROS KIDS LTD,
  MEXI BEAN EXPRESS HALIFAX LTD and MEXI BEAN EXPRESS HUDDERSFIELD LTD.
- CHARLIE'S DESSERTS LIMITED 13092819 (Oldham, Sohail Mahmood, dissolved 2022) is a different business.
- mexibeanexpress.co.uk returns "Sorry! Site under maintenance" (404). mexibeanexpress.com is live and lists Brighouse,
  Huddersfield, Halifax, Wakefield and Bradford plus Peterborough (franchise), with own ordering sites per location
  (mexibeanbrighouse.co.uk/order-now on Foodhub).

## 2. The site, twice

Pass 1, tools/crawl.py (fetch-walled fallback disabled by a stub, no wall hit), 19 URLs, all 200, 7 sitemap pages
(home, menu, reservations, news, one post, contact-us, work-with-us) plus www and non-www twins, RSS, author archive.
Pass 2, Chromium, 9 paths x desktop 1440 and iPhone 13, 18 full page screenshots, all images decoded, 0 failed requests,
site-audit.js render trusted, desktop and phone screenshots opened.

- Squarespace, website id created 2025-08-07, sitemap lastmod 2025-09-12 to 2026-04-23. No Wayback capture.
- Home, hero "Go on, you know you want to...", VIEW MENU and ORDER ON UBER EATS (the only order link on the site,
  diningMode=DELIVERY), Bestsellers (waffles, shakes, cookie dough, no prices), Special occasions (birthdays,
  celebrations, date nights) to BOOK TABLE, a raw Mailchimp embed with birthday field, a milkshake BOGOF email popup.
- Menu, two JPG images of the printed A3 menu plus the PDF (InDesign, 7 Apr 2026, 2 pages, 75 prices). Rendered page
  text is "MENU" only. 0 pound signs in rendered text on all 18 renders. "Create your own" is the concept, "Shakes, Create
  your own from £5.50", "Crepe or Waffle, Plain or available to create your own from £5.50", "Everything on our menu is
  available for your own creation from £5", toppings from £1, sauces £1, The Ultimate Box £30.
- Reservations, a Squarespace email form, name, email, subject "Charlie's Table Booking", how many people 1 to 10+,
  date, time labelled "in Central European Time" (site timezone Europe/Zurich), details. No availability, no confirmation.
- Contact, form plus map. Work with us, no vacancies. News, one post, 12 Sep 2025. /cart empty.
- Positive controls, the same link read finds 6 order links on mexibeanexpress.com, the same text read returns the
  home's birthday line, site-audit.js control passed.

## 3. Pains judged

1. Every order the site starts goes to Uber Eats (UK fee 30% delivery, 33% Uber One, 13% pickup, ex VAT,
   merchants.ubereats.com/gb/en/pricing), no direct order or collection, while her Mexi Bean sites sell direct. CHOSEN.
2. The create your own concept can't be done online, the menu is two pictures and a PDF. Folded into 1.
3. Bookings are an email request, birthdays and celebrations push to it, time in Central European Time. Folded in.
4. Possible second Charlie's at 51 King Street Huddersfield (FSA "Charlies Desserts", rated 9 Apr 2026, on Just Eat with
   a "Dubai Kunafa Sharer £18.50" per a search summary, same item and price as the Brighouse menu). Just Eat and the
   MCA "Openings of the week" (12 Jun 2026) are walled. Unverified, kept out.
5. Look, Squarespace template, pill buttons, raw Mailchimp embed, popup on load. Supports "modern", never "old".
6. Social, strong and active. Not chosen.
7. GDPR, no banner, Mailchimp and Intuit collector before a click, no privacy link. Never the angle.
8. Founder's hours across three brands. No job named in her own material. Not chosen.

## 4. Walled, written down as walled

LinkedIn /in/danielle-best-02297820b 429 login wall. Uber Eats store, Just Eat, Deliveroo, Tableagent, Halifax Courier
(three articles incl. "Entrepreneur planning three new Halifax town centre openings in 2026", 19 Dec 2025, which the
news search matched on "Danielle Best" Brighouse), MCA Insight (two), Yorkshire Evening Post, British Baker, all Cloudflare
or 403/405. Not bypassed.
