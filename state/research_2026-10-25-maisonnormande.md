# Research notes, Mathieu Lambert, La Maison Normande (Cantal), ctc_ZkEEJNNNJXukoBZJ4

Researched 2026-10-25, 13.18 to 13.55 UTC, session astra-agency-cf (24052593). Raka's angle call 25 Oct, word for word,
"modern website for more booking". Evidence folder
/tmp/claude-0/-home-user-astra-agency/24052593-7323-58b2-9e3f-744f7080d43c/scratchpad/leads/maisonnormande/ (crawls,
renders, screenshots, register pull, Booking.com renders, the booking engine's 2027 planning, Instagram embed).

## The angle in plain words

Mathieu and Thierry left Toulouse, took over a 1910 house in a Cantal valley and run it as a four room B&B with a
dinner table that every review raves about. Booking.com gives them 9.7 from 73 reviews and shows 58 photos. Their own
home page shows one photo of the house and four typed reviews. They clearly want guests to book direct (a "best rate
guaranteed direct" banner, a January discount, "book my stay" buttons on every blog post), so a site that sells the
stay as well as their Booking.com page does would keep the commission on those stays. They're closed until 6 Feb 2027,
so a new site would be ready for the reopening.

## Flags Raka should see before the draft

1. **Outside the GTM plan.** Consumer hospitality in France. docs/gtm-plan.md section 1 says don't pitch consumer
   businesses, hotels, or France until Raka decides on a French message, and state/next_batch_ranked.md row 29 says
   "Consumer, don't pitch". Raka named this lead with an angle on 25 Oct, so it's drafted as his call.
2. **Budget is thin.** An entreprise individuelle with no employees (caractère employeur N), two people, four rooms at
   80 to 140 euros a night. The only budget signs are paid tools (Squarespace plan, Booking.com, GreenGo) and 73+
   Booking.com stays. A 3,000 euro site is a big spend for them.
3. **The booking engine already works.** Alliance Réseaux Open System widget (ui OSCH-112693, the Cantal "marque
   blanche" engine), dates searched return rooms with prices inline, and Réserver opens a supplements step that sells
   the table d'hôtes (36 euros), picnic baskets, an 85 euro Terre de Mars box, early arrival and late checkout. So the
   message never says booking is broken or that dinner can't be booked.
4. **The site wasn't built by them.** Squarespace addedOn 1570292009504 (5 Oct 2019) and templateVersion 7 in their own
   HTML, the home photo's file key 1622394091930 (uploaded 30 May 2021), the gallery's 33 photos named IMG_2019... and
   IMG_2020..., the Figaro 2022 and Lonely Planet 2022 to 2023 badges, all from before Mathieu's business started on
   1 Jan 2025. They edit it often (contentModifiedOn 23 Oct 2026, CGV dated 20 Sep 2026, blog 10 Sep 2026), so the
   message never calls it old.
5. **Not a full house.** 2027 planning for all four rooms, 6 Feb to 24 Oct 2027, read from the engine's own API: about
   39 of 872 room nights on open days are taken (4.5%), mostly July. Mon to Thu closed in March and October. So this
   isn't the Kristof case (RULES 0G point 4).

## The person (RULES 0B, 0G point 1)

- lemlist contact record, read 13.19 UTC via tools/lemlist.py get /api/contacts/ctc_ZkEEJNNNJXukoBZJ4, firstName Mathieu,
  jobTitle Co-fondateur, tagline "Co-Fondateur de la Maison Normande", location Saint-Cirgues-de-Jordanne, campaign
  cam_7gnHSf6GvvGy8gH3n (W1b), leadId lea_4ZC8jtu9dsbagwtXY. Lead export (state linkedinInviteAccepted) adds companyName
  "La Maison Normande - Cantal", companyDomain la-maison-normande.fr, companySize 1-10, companyIndustry Accommodation
  Services. Tagline and companyName agree. Accepted 2026-10-24 19.27 UTC per tools/lemlist.py accepts.
- Statutory record, https://recherche-entreprises.api.gouv.fr/search?q=939107207 (control "danone" 447 results), SIREN
  939107207, "MATHIEU LAMBERT (LA MAISON NORMANDE)", entreprise individuelle (nature juridique 1000), dirigeant LAMBERT
  Mathieu born 1989-02, NAF 55.20Z, created 2025-01-01, active, siège 2 rue de la Cure 15590 Saint-Cirgues-de-Jordanne,
  nom commercial LA MAISON NORMANDE, non employer, RNE updated 2026-09-02.
- The site's own mentions légales, https://www.la-maison-normande.fr/mentions-legales, "Propriétaire : EI Mathieu LAMBERT,
  entreprise individuelle immatriculée au RCS sous le n° 939 107 207 domiciliée au 2 rue de la Cure".
- Home page review (Feb 2026) names "Mathieu le pâtissier et Thierry le cuisinier". Booking.com listing, "Géré par
  Mathieu et Thierry", "Après avoir quitté notre vie à Toulouse pour une nouvelle aventure, nous avons redonné vie à La
  Maison Normande, un lieu que nous avons rénové avec soin et passion. Cuisinier et pâtissier de formation".
- So Mathieu owns the business on paper and co-runs it with Thierry. "Co-fondateur" fits. Still there as of 25 Oct 2026.

## LinkedIn, six routes

1. tools/fetch-walled.py https://www.linkedin.com/in/mathieu-lambert, 999 authwall, 1,530 bytes. curl 429.
2. Web search "Mathieu Lambert" "Maison Normande" Cantal, no LinkedIn result, GreenGo and tourism listings only.
3. Web search for linkedin.com/posts on the company, nothing.
4. The register (above) for the role, owner of the EI.
5. Company page https://www.linkedin.com/company/la-maison-normande-cantal through tools/social-audit.js, 15 followers,
   "Bed-and-Breakfasts, Hostels, Homestays, Saint-Cirgues-de-Jordanne". No posts readable.
6. Instagram and Facebook from their own HTML (below), and the Booking.com host profile above.

## The site, two full passes

- Pass 1, tools/crawl.py https://www.la-maison-normande.fr, 163 URLs read (157 at 200, 6 at 404), 65 from sitemaps,
  74 distinct paths once www and bare host and query variants are folded. Pass 2, same command, 163 URLs, same counts.
- tools/site-audit.js, render trusted (0 failed requests, 0 page errors), squarespace, banner with reject, 4 cookies and
  1 third party (Google Fonts) before a click from a US egress, no consent code in the HTML, positive control passed.
- Full page screenshots desktop 1440 and iPhone 13 of home, réserver, les chambres, chambre céleste, se restaurer,
  welcome, rooms, coffret cadeau, la maison, blog, breakfast and meal, galerie, contact. All opened.
- What a visitor sees. Home, a black banner "Meilleur tarif garanti en réservant directement sur notre site.
  Réouverture le 6 février 2027.", a navy header, a handwritten style headline beside the Open System date box with a
  green Rechercher button, one photo of the house, three paragraphs on the volcano, three badges (Figaro 2022, Lonely
  Planet 2022 to 2023, Booking.com 9.7 Traveller Review Awards 2026), four typed five star reviews. Rendered images on
  home, logo plus 4 (house photo and 3 badges), raw HTML 4 data-src images, 4 star blocks, no gallery block. On a phone
  the three badges each fill a screen.
- Réserver, four rooms with a photo, a month calendar and prices each, Aurore 22 m2 100 to 140 euros, Céleste 18 m2 100
  to 130, Jade 16 m2 90 to 120, Ambre 14 m2 80 to 110, breakfast included, 2 or 3 night minimum April to September.
- Se restaurer, table d'hôtes at 19.30, "Thierry et Mathieu, cuisinier et pâtissier de formation", 36 euros, booked 72h
  ahead, illustrated by a breakfast photo, a photo of two wine glasses and a sandwich photo in blob shaped masks, then
  11 partner logos. No photo of one of their dishes on that page (Booking.com shows a plated dish in its first row).
- La maison, 14 recent photos of the house, salon and dining table. Galerie photo, 33 landscape photos from 2019 and
  2020 hikes, no rooms or food.
- English side (welcome, rooms, breakfast and meal, contact uk). The banner, menu, footer and cookie bar stay French.
  The Booking.com award image on /welcome is a 404 (Booking+digital+award.png, curl 404, the French copy 200). No
  reviews on the English home. Dinner says 33 euros and 48h in English against 36 euros and 72h in French, and Aurore
  says 100 to 130 euros in English against 100 to 140 in French. The English booking widget runs (langue uk).
- Contact pages have a Squarespace form (rendered, fname, lname, email, dates, message). Raw HTML missed it, the render
  caught it, so no "no form" claim. Coffret cadeau is a request form, gift stays can't be bought on the site, while
  GreenGo sells a gift stay at La Maison Normande "valable 2 ans".
- Blog, active, 10 Sep 2026 newest, every post ends "Je réserve mon séjour". Three seasonal offer pages it links to now
  404 (offre estivale, printemps, hivernale 2026), leftovers after the season.
- CGV dated 20 Sep 2026 cover bookings "via notre plateforme de réservation, par mail et par téléphone".

## The booking engine, clicked through

- Home widget, 12/02/2027 for 2 nights, returns all four rooms inline, Céleste 210 euros, Jade 190, Aurore 210, Ambre
  170 for 2 nights, formula "Chambre + petit-déjeuner". Choosing 2 people and Réserver opens "Suppléments", taxe de
  séjour 0.88 euro per person per day, Table d'hôtes x 36, Panier pique-nique x 12.50, Coffret Terre de Mars x 85,
  Arrivée anticipée x 45, Séjour prolongé x 45, then Continuer (not pressed further, it leads to payment).
- 2027 planning per room from https://etape-rest.for-system.com/index.aspx?ref=json-planning-openpro (the call the
  réserver page makes), open nights 6 Feb to 24 Oct 2027, Céleste 199, Jade 218, Aurore 204, Ambre 212. All four closed
  8 to 11, 15 to 18, 22 to 25 and 29 Mar to 1 Apr, 30 May to 4 Jun, 22 to 24 Aug, 25 to 30 Sep, and Mon to Thu in
  October. On days open at all, 39 of 872 room nights taken (Mar 7, Jun 3, Jul 29).

## Outside listings

- Booking.com, https://www.booking.com/hotel/fr/la-maison-normande-saint-cirgues-de-jordanne.fr.html, rendered twice in
  Chromium (13.45 and 13.49 UTC), 9.7 Exceptionnel, "Commentaires clients (73)", "50 autres photos", 58 distinct photo
  ids in the HTML, "Géré par Mathieu et Thierry", languages English, French, Vietnamese, Chinese, nine of the ten
  reviews shown from France and one from Belgium, Booking quality rating 3 of 5. First screen shows the house, a room,
  a bathroom, a plated dish, the 9.7 and a review. "Évaluée par les clients après leur séjour". Booking.com only invites
  guests who booked through it to review (smashballoon.com citing the partner help centre, secondhand).
- Booking.com search, the same village's Domaine de la Jordanne B&B 9.1 from 100 reviews, Caldera 9.4 from 213.
- GreenGo, https://www.greengo.voyage/hote/la-maison-normande, rendered, "noté 4,9 sur 84 avis externes", 4 rooms,
  "Offrez un séjour dans ce lieu ... Valable 2 ans et échangeable".
- Auvergne-Rhône-Alpes Tourisme, https://www.auvergnerhonealpes-tourisme.com/en/fiches/la-maison-normande/ (via
  tools/fetch-walled.py), 2025 and 2026 prices, rooms 80 to 135 euros, meals 12 to 33, languages English Chinese French
  Vietnamese, a Réserver button. The iaurillac.com listing in search results now returns 404.
- Wayback Machine, web.archive.org reset the connection four times and WebFetch refused it, walled from here.

## Social, opened with tools/social-audit.js

- Instagram https://www.instagram.com/lamaisonnormande/ (from their HTML), 643 followers, 1,428 posts, newest post
  2026-05-06, 172 days quiet. Recent captions push bookings, "Réservez maintenant", "Les week-ends d'avril se
  remplissent", the spring offer.
- Facebook https://www.facebook.com/normandedanscantal, 644 followers, post dates behind login, unknown recency.
- LinkedIn company page, 15 followers.

## News, tools/news.py fr, control Carrefour 100

- Company, "Maison Normande" Cantal, 1 result, unrelated (Purepeople, Marine Delterme). Person, "Mathieu Lambert" Cantal,
  1 result, La Montagne 27 Mar 2023 on a comité des fêtes, not tied to him.
- Region, 49, La Montagne 23 Jul 2026 "Dans le Cantal, le Tour s'est transformé en jackpot touristique", reussir.fr
  9 Oct 2026 "Puy Mary, une nouvelle saison exceptionnelle", Actu.fr 10 Oct 2025 on the Cantal as a "destination
  refuge", Gîtes de France meeting new hosts (Réussir 15 Oct 2026).
- Industry, 66, La Dépêche 24 Oct 2026 on a new maison d'hôtes near Toulouse, Gîtes de France coup de coeur (Réussir
  4 Oct 2026). OTA commission, PriceLabs (updated 5 Feb 2026) "entre 10 % et 25 % ... en moyenne environ 15 %".

## GDPR sweep (never the angle)

tools/eu-view.py from Stockholm, 2 first party cookies (crumb, os_session_local), 0 third party cookies, 88 requests
to 16 hosts including fonts.googleapis.com and log.pinterest.com before a click.

## Pains judged

| # | Pain | Proof | Cost to them | Would they name it | Verdict |
|---|---|---|---|---|---|
| 1 | Home page sells the stay worse than their own Booking.com page, one photo and four reviews against 58 photos and 73 reviews, on a 2019 Squarespace 7.0 frame | renders, raw HTML, Booking.com twice | commission on every Booking.com stay, 73+ since 2025, about 15% each (internal estimate, not in the message) | yes, the banner, the January offer and the blog CTAs all chase direct bookings | CHOSEN |
| 2 | English side thinner and out of date | /welcome render, 404 image, price mismatches | unknown, guests shown on Booking.com are French | maybe | folded into the sketch, not in the message |
| 3 | Gift stays by request only while GreenGo sells them online, Christmas falls in their closure | /coffret-cadeau, GreenGo render | small on its own | maybe | proof for later |
| 4 | Instagram quiet since 6 May 2026 | social-audit.js | fewer shoulder season bookings | maybe | other family, left out (one thread) |
| 5 | Dinner sold only as a supplement after Réserver, results in a narrow column | clicked through | folded into the site | no | folded |
| 6 | Three dead offer pages linked from the blog | crawl 404s | tiny | no | 50 bucks test fails |
| 7 | GDPR, Google Fonts and Pinterest log before consent | eu-view | tiny | no | never the angle |
| 8 | Two hosts run rooms, kitchen, bookings and posting alone | site, Booking, Instagram gap | founder hours | not visible | an AI guest messages workflow is possible, not chosen |
