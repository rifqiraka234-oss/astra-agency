# Design and offer teardown for SAAVEDRA's catering and events side

Run on 2026-10-25. Read only. Every site was rendered with `teardown.js` (adapted from the Hertling one: Chromium 1194 through the egress proxy, SPKI pinned, 1440x900, five desktop frames down the page plus one 390px mobile frame, French locale for Paris sites). Fingerprints are in `fingerprints.jsonl`, screenshots in `shots/` (`<slug>__0..4.jpg` desktop, `<slug>__m.jpg` mobile), one review sheet per site in `sheets/`, the hero contact sheet is `contact_sheet_heroes.jpg`. The rendered text and HTML of every page are in `text/` and `html/`, so each fact below can be reopened. Quote and catering pages one click deep were rendered in a second pass (`subpages.jsonl`, 24 pages), and six quote flows were clicked open by `quoteflow.js` (`quoteflows.jsonl`, `shots/quote_*.jpg`). Nothing was ever submitted.

**Labels.** `[V]` VERIFIED, seen in the render or present in the page text, HTML, a linked PDF or a form payload fetched on 2026-10-25. `[I]` INFERRED, from a search result, a file name or my own reading, not confirmed on the page.

**Every count in this file was recomputed from `fingerprints.jsonl` by `counts.py` (output in `counts.txt`).** The frame judgements live in `visual_tags.json`, the catering facts with their quoted source in `catering_facts.json`, the Paris facts in `paris_facts.json`; `enrich.py` merges all three into `fingerprints.jsonl`, so the file is the single source.

---

## 1. Counts

| | n |
|---|---|
| Queued in `sites.txt` | **58** (1 client, 8 Paris Argentine `comp_arg`, 5 Paris catering and private hire pages `comp_events`, 13 catering and events platforms or brands `catering`, 26 food and consumer storytelling `story`, 5 motion `motion`) |
| Rendered (page reached and read) | **56** |
| Walled, not described anywhere in this file | **2** |
| Rendered but frames obscured by a modal, kept for DOM and text facts, excluded from visual counts | **4** |
| Subpages rendered (catering, quote, private hire pages) | 24 |

**Walled, by name.** Each was tried in Chromium and then once with `tools/fetch-walled.py` (curl_cffi Chrome, Safari and Firefox fingerprints).
- **Shake Shack catering.** `shakeshack.com/catering` reached Shake Shack but answered 404 in Chromium and 404 in curl_cffi; its own HTML links `https://www.shakeshack.co.uk/catering/`, which answered Cloudflare "Sorry, you have been blocked" (403) in Chromium (pass 2) and "Just a moment..." 403 in curl_cffi. Not described.
- **Joe & the Juice.** `joejuice.com` answered "Vercel Security Checkpoint" 429 in Chromium twice and 429 in curl_cffi. Not described.

A wall says we could not look. It says nothing about either site.

**Obscured.** Three render passes were made: pass 2 closed consent, region and promo modals and answered an age gate; pass 3 hid scroll-triggered promo overlays and recorded the text of everything it hid (`hidden` in each row).
- **Big Mamma** `/fr/privatisation` and its homepage: a "Nouveau drop sur notre e-shop" pop-up reopens on every frame in all three passes. Frame 0 behind it, the text and the HTML are used.
- **Pip & Nut** and **Franco Manca**: a sign-up pop-up covers frames 2 to 4. Frames 0 and 1 and the text are used.

**Render-side failures that are ours, not theirs.** This Chromium build cannot play some video formats, so Oatly's cards show "Player error" and Dishoom's hero is black with a quote on it [V frames]. ezCater's restaurant search answered "Performing security verification" (403) before rendering, so nothing from that subpage is used. In pass 2 my own modal closer clicked the "×" of the fake browser window Oatly draws around its site and the site collapsed into a desktop of folder icons; those frames were thrown away and pass 1 is used.

**URLs corrected from the site's own HTML or nav, not guessed.** `feedr.co` is a country picker, replaced by `feedr.co/en-gb` (read from its own links). `pret.co.uk/en-GB/catering` is a 404, replaced by `/en-GB/platters` (its nav says "Platters"). Shake Shack as above.

**How the Paris list was built.** Clasico Argentino came from the 20 Oct research. The rest came from Time Out, Le Bonbon, Paris Zigzag and Yonder lists `[I, search results]`, and every domain was then fetched and its page checked for the right name before it was queued `[V]`: asadoparis.com (Asado is "by Clasico Argentino" per its own Deliveroo link slug), volver-paris.com, carnar.fr, biondi-restaurant.fr, resto-unico.com, loco-restaurant.fr (9e, about 730 m from Saavedra), anahi-paris.com. The Paris catering and private hire peers were picked from their own homepage links: bigmammagroup.com `/privatize`, bouillonlesite.com `/privatisation/` (Bouillon Pigalle and République), cojean.fr `/cojean-entreprise/`, maison-kayser.com `/evenements-entreprises/`, pokawa.com `/pokawa-pro/`.

**Considered and not queued.** Empanadas Malvón: search shows Spain only (Madrid, Barcelona, Sevilla), no Paris shop found `[I, search]`. "Yolanda empanadas": no Paris business found by search `[I]`. L'Empanaderia and its caterer The Asado Club: real (Time Out, 10e) but no website found `[I]`. buenaonda.fr: "Domain for sale" `[V]`. cafepinson.fr: redirects to an unrelated site, ekitinfo.org `[V]`. haus.com: a home-buying company, not the aperitif brand `[V]`. spylt.com: password page `[V]`. leon.co/catering and foodcheri.com/traiteur: 404 `[V]`.

---

## 2. Patterns, with counts

### 2a. Catering and events pages: offers, terms, flow, proof (n = 17)

The set is the 5 Paris `comp_events` pages plus the 12 rendered `catering` pages (Big Mamma, Bouillon, Cojean, Maison Kayser, Pokawa Pro, Popchef, FoodChéri, ezCater, Feedr, Pret, Sweetgreen, Gail's, Le Pain Quotidien US, Chipotle, Pizza Pilgrims, BAO, Ottolenghi). Each fact was read on the page or its subpage, with the quote kept in `catering_facts.json`.

| Pattern | n of 17 | Who |
|---|---|---|
| Names office or meeting food (trays, platters, boxes, "au bureau") | **13** | all but Big Mamma, Cojean, Chipotle, BAO |
| Names team lunch or working lunch | **13** | all but Big Mamma, Chipotle, BAO, Ottolenghi |
| Names company events (séminaires, cocktails, events) | **14** | all but ezCater, Pret, Gail's |
| Offers private hire of a venue | **5** | Big Mamma, Bouillon, Pizza Pilgrims, BAO, Ottolenghi (private dining) |
| Names afterwork or drinks | **2** | Popchef ("cocktails et afterworks"), BAO (facility "Drinks reception") |
| Names all five (office boxes, team lunch, afterwork, private hire, events) | **0** | |
| Shows any price on the page or its subpage | **8** | Bouillon, Pokawa, Popchef, FoodChéri, Sweetgreen, Gail's, Chipotle, Pizza Pilgrims |
| Shows a price per person (or per tray or portion for one) | **6** | Chipotle ("$8.75 /person", first screen), Bouillon (menu cards "22 €" to "33 €", traiteur "DÈS 14 €"), Popchef (trays "24,90 € HT"), FoodChéri ("à partir de 23,95€ TTC"), Pokawa ("13,90 € TTC le poké", simulator and PDF), Pizza Pilgrims ("from £25 per person") |
| Price in the first screen | **1** | Chipotle |
| States a minimum (or says there is none) | **8** | Bouillon, Pokawa, FoodChéri ("Sans minimum"), Sweetgreen ($50), Gail's (£20), Chipotle (10 people), Pizza Pilgrims (£200), Ottolenghi ("no minimum") |
| States a lead time | **9** | Kayser (72h), Pokawa (3 to 5 days), FoodChéri (15h la veille), Pret (10am same day), Sweetgreen (24h, and 12h elsewhere on the same page), Gail's (11am two days before), Chipotle (24h), Pizza Pilgrims (48h+), Ottolenghi (48h) |
| States an area or radius | **12** | e.g. Bouillon "PARIS & PETITE COURONNE", Sweetgreen "up to 20 miles", Popchef "Île-de-France" |
| States a capacity per room | **3** | Big Mamma, Bouillon, BAO |
| Ordering is a cart, no quote | **6** | ezCater, Pret, Gail's, Le Pain Quotidien, Chipotle, Pizza Pilgrims |
| Quote is one screen | **6**, median **8** fields, range 5 to 11 | Bouillon Pigalle 5, Popchef 7, Cojean 8, Ottolenghi 8, Sweetgreen 10, Kayser 11 |
| Quote is a multi-step wizard | **3** | FoodChéri 3 steps, Feedr 6, Pokawa 13 screens |
| Quote is an email link | 1 | BAO |
| Form asks headcount | 7 | Bouillon, Cojean, Pokawa, Popchef, Sweetgreen, Ottolenghi, Chipotle (stepper) |
| Form asks the date | 3 | Pokawa, Popchef, Ottolenghi |
| Promises a response time | 5 | Cojean 24h, Pokawa 24h, FoodChéri 24h, Sweetgreen 24h, Popchef "moins de 10 minutes" |
| Menu in words on the page | **9** | 3 of them also link a PDF (Bouillon, Pokawa, Pizza Pilgrims) |
| Menu only as a PDF | 1 | Sweetgreen (format cards on the page) |
| Menu as images only | **0** | (Saavedra's own /menu is images) |
| Shows any proof (logos, reviews, counts, named testimonials) | **6** | Big Mamma, Cojean, Pokawa, FoodChéri, ezCater, Feedr |
| No proof at all | **11** | |

### 2b. Look and motion

Visual counts are over sites with clean frames: 51 non-client sites (8 Paris Argentine, 4 Paris events, 12 catering, 22 story, 5 motion). DOM counts are over all 56 rendered.

| Pattern | All 51 | Paris Argentine (8) | Paris events (4) | Catering (12) | Story (22) | Client |
|---|---|---|---|---|---|---|
| Illustration as a main brand element | **8** | 0 | 0 | 1 (BAO) | **6** (Graza, Fishwife, Liquid Death, Magic Spoon, Tony's, Michel et Augustin) | yes |
| Illustration as accent (icons, doodles, line drawings) | 22 | 1 (Volver) | 3 | 6 | 11 | |
| No illustration | 21 | **7** | 1 | 5 | 5 | |
| Chapters edge to edge (full-bleed bands, colour fields) | **27** | 4 | 1 | 6 | **14** | yes |
| Content in cards on a neutral page | 5 | 0 | 0 | 3 (Feedr, Sweetgreen, Chipotle) | 2 (Oatly, Momofuku) | |
| Mixed | 12 | 1 | 3 | 3 | 5 | |
| One fixed screen, nothing below | 6 | **3** (Clasico, Asado, Volver) | 0 | 0 | 0 | |
| Layout unreadable (inner scroller) | 1 | 0 | 0 | 0 | 1 (Omsom) | |
| Sticker, collage or doodles over photos | **13** | 1 (Anahi) | 0 | 1 (Pizza Pilgrims) | **9** | yes |
| Type ticker band | **10** | 0 | 1 (Bouillon) | 1 (Pizza Pilgrims) | **7** | no |
| Poster display type across a frame | **14** | 1 | 1 | 1 | **9** | yes |

Independent check on the ticker count: the DOM detector (class names containing marquee or ticker) fires on 7 of 25 story sites and agrees with the frames on 6 of them; it also fires on two catering logo strips (FoodChéri, Feedr), which are logo carousels, not type bands, and it misses Fly by Jing's and Cann's announcement tickers, which the frames show cut mid-word at the edge.

| DOM fingerprint | Paris Argentine (8) | Paris events (5) | Catering (12) | Story (25) | Motion (5) | Client |
|---|---|---|---|---|---|---|
| `<video>` on the page | 1 | 0 | 2 | **10** | 2 | 0 |
| Live WebGL | 0 | 0 | 0 | 0 | 1 (Lusion) | 0 |
| Pinned sticky scene (sticky element over 300px in a parent 1.5 viewports tall) | 0 | 0 | 1 | 3 | 1 | 0 |
| More than 500 scroll-linked style mutations | 1 | 1 | 3 | **10** | 2 | yes (610) |
| GSAP loaded | 1 | 2 | 4 | 8 | 2 | no |
| Shopify | 0 | 0 | 2 | **14** | 1 | Squarespace |
| Median page height | 3,475px | 4,894px | 4,610px | 6,651px | 900px | 4,383px |
| Median words | 322 | 460 | 641 | 606 | 485 | **79** |

**Photography.** Story sites lead with the product (18 of 22) and people (10 of 22). Catering pages lead with food (11 of 12), people appear on 3. The Paris Argentine sites are food first (7 of 8), with the dining room on 2.

**Palette.** Saavedra's largest painted background is celeste (#bde3fa) with deep blue (#034a91) type, and it is the only one of the 56 whose palette carries both a light and a deep blue `[V, DOM palette by painted area, confirmed by the screenshot palette #b0f0f0 / #105090]`. Light blue shows up elsewhere as a second colour: Volver paints its heading and button in an Argentine light blue (#61d0f2), Clasico has a light blue in its text palette, and Cojean's company page paints large powder blue areas (#8ac2eb, its largest painted background in the DOM, cards on cream in the frames). Pokawa Pro (navy #172672, royal #2431eb on cream) is the closest company page to Saavedra's deep blue. The counts script also flags Michel et Augustin and Five Guys with #6aaae4, the same value on both; on Michel et Augustin it is a small consent shield seen bottom left in every frame, not a brand colour `[V]`, and on Five Guys it is probably the same widget `[I]`.

**Type.** Saavedra loads MTMPALMA (headings), Panchi (body), BLOCKB and aktiv-grotesk `[V]`. No two Paris rivals share a heading face (Radion, Uomo condensed, Copperplate, Montserrat, Oswald, Open Sans, Bebas, Playfair Display) `[V]`.

---

## 3. Quote and booking flows, site by site

Steps are screens the visitor passes before the request leaves. Fields are visible inputs, consent boxes left out. Read from the rendered form, the form HTML or the form payload; nothing was submitted.

| Site | Path | Steps | Fields asked | Notes |
|---|---|---|---|---|
| **Saavedra** (client) | none for companies | 0 | | Pickup goes to Zelty Click & Collect, delivery to Deliveroo; the only form is a newsletter email `[V]` |
| Clasico Argentino `/catering` | contact form | 1 | Nom et Prénom, Email, Téléphone, Date de l'évènement, Particulier ou professionnel, message | Terms only in an 18-page brochure PDF `[V]` |
| Volver `/traiteur-asado/` | pop-up contact form | 1 | Nom, E-mail, Téléphone, Objet de votre demande, Message | Private parties at home, no company wording `[V]` |
| Biondi (also Paris Buenos Aires, Blanca) | Zenchef privatisation widget | 1 | Nombre de personnes, Date, Email, Téléphone, Prénom, Nom, type d'événement, Budget, Code postal, commentaire | `[V]` |
| Anahi | group form on riccardogiraudi.com | 1 | service (lunch or dinner), type (group or privatization), name, email, phone, number of people ("10 minimum"), date, budget per person, restaurant, message | the on-site PRIVATISATION button is an email-gated download `[V]` |
| Big Mamma | side drawer "Demander un sexy devis" | 1+ | Choix du restaurant (53 venues) | later fields did not render after a choice in our session, not read `[V]` |
| Bouillon | Pigalle group form; République via privateaser.com; traiteur via mailto | 1 | Prénom, Nom, E-mail, Téléphone, Nombre de personnes (12 to 80) | weekday only, quote signed or card print `[V]` |
| Cojean | one form | 1 | Nom, Prénom, E-mail, Téléphone, Nom d'entreprise, Code postal, Nombre de collaborateurs, précisions | "répond sous 24h" `[V]` |
| Maison Kayser | one form | 1 | Société, Civilité, Prénom, Nom, Adresse, Code postal, Ville, E-mail, Téléphone, Objet, Message | "Commande 72h à l'avance" `[V]` |
| Pokawa Pro | Typeform | **13** | occasion (6 choices), besoin, personnes, date, heure or à confirmer, heure, livraison or retrait, adresse (6 sub-fields), format, recettes, compléments, dernier détail, Prénom + Entreprise + Email pro + Téléphone | read from the form payload, `evidence/pokawa_typeform_qjv3W2iQ_fields.txt` `[V]` |
| Pokawa Pro | price simulator | 2 | convives (15, 20, 30, 50, 100 chips), formula, quantities per item with a running TTC total, then Nom et prénom, Entreprise, E-mail, Téléphone, Date | "estimation TTC et un devis confirmé ... sous 24 h ouvrées" `[V]` |
| Popchef | trays: cart with an address and date bar; events: `/quotemobile` | 1 | Prénom, Nom, Date de l'évènement, Nombre de convives, Email professionnel, Téléphone, message | "Nous vous répondons en moins de 10 minutes" `[V]` |
| FoodChéri | wizard | 3 | besoin (4 choices); taille d'entreprise (9 choices); Prénom, Nom, Téléphone, Email pro, Nom de l'entreprise, Code postal, situation | "rappelle sous 24h" `[V]` |
| ezCater | marketplace cart | | address, then restaurants | no quote form `[V]` |
| Feedr | wizard | 6 | Occasion (regular office deliveries or one-off catering quote), Details, Event Details, Preferences, Address, Summary | only step 1 read `[V]` |
| Pret | Pret Delivers cart | | | no quote `[V]` |
| Sweetgreen | inquiry form | 1 | one-time event or recurring office meals, First, Last, Work email, Phone, Company, Job title, Delivery zip, Headcount, How did you hear | also orderable through ezCater `[V]` |
| Gail's | shop cart | | postcode | no quote `[V]` |
| Le Pain Quotidien US | ordering site | | location search | `[V]` |
| Chipotle | cart | | people stepper per build | `[V]` |
| Pizza Pilgrims | Orderswift cart | | postcode | private hire enquiry not read `[V]` |
| BAO | mailto | | | "Enquire Here" is info@baolondon.com `[V]` |
| Ottolenghi | one form on the page | 1 | Name, Email, Phone, Postcode, Event type, Number of guests, Date of event, Message | `[V]` |
| Dishoom (story) | group enquiry | 1 | First, Last, Email, Telephone, Location, Date, Time, second date and time (optional), Party size, notes | "For large parties of 16+" `[V]` |
| Franco Manca (story) | groups form | 1 | Location, Date and time, Number of people, First, Last, Email, Phone, Details | `[V]` |

---

## 4. The 10 references most worth borrowing for this build

1. **Pokawa Pro simulator** (`pokawa.com/simulateur-pokawa-pro/`). A priced builder before any contact form: guest count with quick chips (15, 20, 30, 50, 100), two formula cards with a per-portion TTC price and a portions-per-person rule, product cards with ADD, and a sticky navy basket that shows "Convives servis 0/20" and the running total; then five contact fields and "devis confirmé sous 24 h ouvrées". The sharing box of 6 or 12 maps straight onto this. `shots/pokawa_com_simulateur_pokawa_pro__1.jpg`, `shots/quote_pokawa_sim_0.jpg`.
2. **Chipotle catering** (`catering.chipotle.com`). Price per person, minimum and lead time printed together in the first screen ("Minimum 10 people", "$8.75 /person", "24 hours advance notice to order"), and a people stepper on every card. The only one of 17 with a price in the first screen. `shots/catering_chipotle_com__0.jpg`.
3. **Bouillon privatisation** (`bouillonlesite.com/privatisation/`). The Paris precedent: full-bleed room photo under a giant PRIVATISATION, a red ticker of capacities ("QUATRE SALONS, DE 15 À 140 COUVERTS — PIGALLE : L'ÉTAGE, JUSQU'À 80 — MÊME CARTE, MÊMES PRIX"), each room with its covers, the menus as four outlined price cards, a "BON À SAVOIR" block (no fixed slot, Chorus payment, signed quote) and one fixed bottom bar PRIVATISATIONS | RÉSERVATIONS. `shots/bouillonlesite_com_privatisation__0.jpg`, `__2.jpg`, `__3.jpg`.
4. **BAO private hire** (`baolondon.com/private-hire/`). Each venue drawn as an isometric cutaway, with "Max seating" and "Max Standing" and facility icons beside it. Saavedra already has an illustrator's line; the shop at 48 rue Condorcet drawn the same way makes private hire concrete without photos it may not have. `shots/baolondon_com_private_hire__0.jpg`, `shots/baolondon_com_groups__2.jpg`.
5. **Pizza Pilgrims catering** (`pizzapilgrims.co.uk/pizza-pilgrims-catering/`). The only catering page in the set that carries a loud brand into catering: tilted ticker ribbons naming the uses ("PIZZA CATERING • PARTIES, OFFICES & EVENTS"), then the terms as a four-line list (£200 minimum, 48+ hours, dietaries, locations) and one "Check catering availability" button. `shots/pizzapilgrims_co_uk_pizza_pilgrims_catering__0.jpg`, `__1.jpg`.
6. **Sweetgreen catering** (`sweetgreen.com/catering`). A numbered three-step card under the hero (check availability, choose your style, date and time), a format choice (individually packaged or buffet), an FAQ that actually answers minimum, fee, radius and lead time, and an inquiry that opens with two doors (one-time event or recurring office meals). `shots/sweetgreen_com_catering__0.jpg`, `shots/sweetgreen_com_catering_inquiry_path_recurring_office_meals__0.jpg`.
7. **Gail's office catering** (`gails.com/pages/office-catering`). The cut-off time in the top bar ("ORDER BY 11AM FOR DELIVERY ON TUESDAY"), the ordering process told with black line drawings, and a red "CHECK IF WE DELIVER IN YOUR AREA" postcode band. Drawn steps suit Saavedra's line illustration. `shots/gails_com_pages_office_catering__0.jpg`, `__1.jpg`, `__2.jpg`.
8. **Popchef trays** (`shop.popchef.com/shop/plateaux-repas-entreprise`). A sticky "On vous livre où ? et quand ?" bar (address and date) that follows the page so availability is asked once; trays priced on their cards; events and afterworks routed to a seven-field quote promising a reply "en moins de 10 minutes". `shots/shop_popchef_com_shop_plateaux_repas_entreprise__1.jpg`, `shots/shop_popchef_com_quotemobile__0.jpg`.
9. **Fishwife** (`eatfishwife.com`). The packaging illustration is the hero object, "Be the Star of Every Party" sells occasions with four illustrated icons, and a recipe band reads "Serves 10+ / 5 mins". An illustrated product brand selling to groups without dropping its look. `shots/eatfishwife_com__0.jpg`, `__1.jpg`, `__4.jpg`.
10. **Graza** (`graza.co`). One line-drawn character and one product carry the whole page, the wordmark becomes a full-width chapter, and a ticker closes it. The closest storytelling match to the Hertling V3 rule (their logo as the hero object, one idea, no islands). `shots/graza_co__1.jpg`, `__2.jpg`.

Next in line: FoodChéri for proof with numbers and terms said up front ("Sans minimum", "jusqu'à 15h la veille", "4,3/5", "+1000 entreprises", `shots/foodcheri_com_plateau_repas__2.jpg`); Michel et Augustin for a French doodle and sticker system that stays legible (`shots/micheletaugustin_com__0.jpg`); Momofuku private events for city sections with pill tags and capacities (`shots/momofuku_com_pages_private_events__0.jpg`, `__1.jpg`); Dishoom group feasts for room capacities in plain words and "£22 per person" (`shots/dishoom_com_group_feasts__0.jpg`).

---

## 5. What the Paris competitors do and don't do for companies

**Saavedra today.** No catering, traiteur, privatisation, entreprise, événement or afterwork word in the visible text of the home, /menu or /click-collect pages `[V]`. Pickup goes to Zelty, delivery to Deliveroo `[V]`. The menu is the printed card as four images `[V]`. No reviews, logos or counts on those pages `[V]`. The home page reads 79 words at render `[V]`.

**Clasico Argentino** (the direct empanada rival).
- Sells catering to companies and says so on the homepage: nav item CATERING and the hero line "DINE IN | TAKE AWAY | DELIVERY | CATERING" `[V]`.
- `/catering`: "Dès 120 empanadas commandées, Clasico Catering vous livre ... sur Paris et ses alentours", privatisation of a Clasico, a six-field form `[V]`. The page itself is about 98 words `[V]`.
- All terms are in an 18-page brochure PDF dated 6 Nov 2025 `[V]`: "environs 4€ par empanada", "Min. de commande : 120 empanadas"; staffed service "Minimum de facturation : 2500€ HT", "Empanadas À partir de 13,5€ par p.a.x", desserts 4,5€, soft 3,5€, soft + bière 9,5€, vin 6€, material and oven from 900€, staff 200€ each; "Zones d'intervention : Paris intramuros et banlieues proches"; private hire priced per restaurant.
- Its Pigalle shop, 22 rue Henry Monnier 75009, is about 425 m in a straight line from Saavedra `[V, both addresses geocoded with api-adresse.data.gouv.fr]`. Brochure price for a full seated privatisation there: 100€ HT lunch, 200€ HT evening, 300€ HT weekend, "Tarif indicatif à confirmer par devis" `[V]`.
- On the web page itself it states the 120-empanada threshold and nothing else: no price, no service minimum, no lead time, no team lunch or afterwork wording, no box builder or estimate `[V, /catering text and HTML]`. The brochure text has no lead time either `[V]`. The brochure has an "ILS NOUS ONT FAIT CONFIANCE" page whose logos are images I did not read `[V for the heading, I for its content]`.

**Asado** (a Clasico concept, 2e). Delivery only on Uber Eats, "NO RESA", nothing for companies `[V]`.

**Volver** (6e). A "traiteur asado" page for "Mariage, baptême, anniversaire…" at home, a five-field contact pop-up, no price, no company wording `[V]`.

**Carnar** (importer and butcher, 7e). An "ORGANISATION ASADO" events page that names "ÉVÉNEMENT D'ENTREPRISE", contact by phone and email, no event price `[V]`. Sells frozen empanadas and empanada dough in its shop `[V]`. A supplier to "plus de 100 restaurants" rather than a restaurant rival `[V]`.

**Biondi** (11e, Fernando de Tomaso's group). PRIVATISER in the nav opens a Zenchef form asking headcount, date and budget `[V]`; the same Zenchef privatisation pattern sits on Paris Buenos Aires and Blanca `[V, homepage HTML]`. No event price `[V]`.

**Anahi** (3e, Riccardo Giraudi's group). "GROUPES & ÉVÉNEMENTS" goes to a group form with "10 minimum" and a budget-per-person field; the on-site PRIVATISATION button is a download gated by an email `[V]`. A press logo wall is its proof `[V]`.

**Unico** (11e, 7e) and **Loco** (9e, about 730 m from Saavedra). Nothing for companies on the homepage `[V]`. Both lead with reviews: Unico Google 4,4/5 (566 avis) and TheFork, Loco 4.8/5 on Zenchef `[V]`.

**The Paris catering and private hire peers.** Bouillon is the only Paris page in the set that prices private hire per person, and it also prices its catering, names its delivery area and states a delivery fee (90 € HT) `[V]`. Pokawa Pro is the only other Paris page that prices catering on the site, and the only one with a priced builder `[V]`. Big Mamma lists 53 venues with capacities but no price on the page `[V]`. Cojean and Kayser show no price and ask for a quote; Kayser asks 72h notice `[V]`.

**So, in Paris, for companies.** One empanada rival (Clasico) sells catering and private hire seriously, 425 m away, but keeps every price in a PDF `[V]`. None of the 8 Argentine sites puts a price for companies on a web page; the only minimums on a page are Clasico's "Dès 120 empanadas" and the "10 minimum" placeholder in Anahi's group form; none states a lead time `[V, text and HTML of the 8 homepages and 7 subpages]`. None names afterwork or apéro `[V, word search over all 15 texts, positive control: the same search finds "afterworks" on Popchef]`. None has a box builder or estimate `[V]`. None shows company proof, client logos or company testimonials, on a page; Unico and Loco show diner reviews and Anahi a press wall `[V]`. That the gap is costing them orders is my reading, not something these pages show `[I]`.

---

## 6. The three strongest patterns for a catering and events site

1. **Terms on the page, next to the offer.** Price per person or per box, minimum, lead time and area. 8 of 17 show a price, 6 of 17 per person, 8 state a minimum policy, 9 a lead time, 12 an area; only Chipotle puts the price in the first screen. In Paris only Bouillon prices private hire on the page, and the empanada rival keeps its prices in a PDF.
2. **A short, priced path to a quote.** One-screen forms run 5 to 11 fields (median 8) and the better ones ask headcount, date and delivery or venue; Pokawa shows an estimate before contact; five promise a reply time (24h, or Popchef's 10 minutes). A Typeform of 13 screens is the long end.
3. **Occasions as doors, said in the brand's own voice.** 13 of 17 name office food and team lunches and 14 name events, but only 5 offer private hire, 2 name afterwork and none name all five, so a page with a door for each is open ground. Brand-loud execution (tickers, stickers, poster type) is common on story sites (7 of 22 tickers, 9 of 22 collage) and rare on catering pages (1 of 12, Pizza Pilgrims), and 11 of 17 catering pages show no proof at all.

---

## Appendix. Per-site fingerprints (all 58 queued rows)

`frames` is the visual state (ok, obscured, walled). Walled rows describe the wall, not the site. `pass` is the render pass whose row and frames are kept.

| cat | slug | pass | HTTP | frames | height | words | imgs | video | webgl | pinned | marquee (DOM) | scroll mut. | libs | h1 face | body face | DOM palette (top 3) | illus | layout |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| client | saavedraparis_fr | 1 | 200 | ok | 4383 | 79 | 40 | 0 | 0 | 0 | 0 | 610 | squarespace | MTMPALMA | Panchi | #bde3fa #034a91 #fde2ce | heavy | edge |
| comp_arg | clasicoargentino_com | 1 | 200 | ok | 919 | 37 | 1 | 0 | 0 | 0 | 0 | 54 | webflow | Radion | Arial | #ffffff #dddddd | none | onescreen |
| comp_arg | asadoparis_com | 1 | 200 | ok | 903 | 43 | 1 | 0 | 0 | 0 | 0 | 31 | webflow | Uomo condensed | Overpass | #dddddd #fefefe | none | onescreen |
| comp_arg | volver_paris_com | 1 | 200 | ok | 900 | 10 | 3 | 0 | 0 | 0 | 0 | 16 | Swiper, elementor | copperplate | Montserrat | #ffffff #61d0f2 | accent | onescreen |
| comp_arg | carnar_fr_fr | 2 | 200 | ok | 3984 | 560 | 21 | 0 | 0 | 0 | 0 | 129 | - | Montserrat | Montserrat | #7f2629 #ffffff #010101 | none | edge |
| comp_arg | biondi_restaurant_fr | 1 | 200 | ok | 2965 | 322 | 16 | 0 | 0 | 0 | 0 | 79 | - | Oswald | Lato | #ffffff #1e1f25 #000000 | none | edge |
| comp_arg | resto_unico_com | 1 | 200 | ok | 9710 | 548 | 23 | 0 | 0 | 0 | 0 | 68 | - | Open Sans | BitterRegular | #ffffff #091523 #000000 | none | mixed |
| comp_arg | loco_restaurant_fr | 1 | 200 | ok | 4813 | 322 | 27 | 0 | 0 | 0 | 0 | 79 | - | Bebas | Muli | #f3e3c9 #3f3a32 #f7f7f7 | none | edge |
| comp_arg | anahi_paris_com | 2 | 200 | ok | 5512 | 399 | 35 | 1 | 0 | 0 | 0 | 959 | gsap, ScrollTrigger, Lenis | Playfair Display | Playfair Display | #ffffff #f7f7f7 #303133 | none | edge |
| comp_events | bigmammagroup_com_fr_privatisation | 3 | 200 | obscured | 7432 | 1465 | 65 | 0 | 0 | 0 | 0 | 123 | gsap | Lora | Lora | #321108 #fffdf4 #ffffff | - | - |
| comp_events | bouillonlesite_com_privatisation | 1 | 200 | ok | 4258 | 524 | 14 | 0 | 0 | 0 | 1 | 94 | elementor | Point | Tired | #ffffff #111111 #d61217 | accent | mixed |
| comp_events | cojean_fr_cojean_entreprise | 1 | 200 | ok | 3954 | 391 | 17 | 0 | 0 | 0 | 0 | 675 | gsap | InterFace | InterFace | #8ac2eb #ffffff #f7f6f1 | accent | mixed |
| comp_events | maison_kayser_com_evenements_entreprises_entreprises | 1 | 200 | ok | 4894 | 460 | 57 | 0 | 0 | 0 | 0 | 96 | Swiper | Calibre-Black | Calibre-Regular | #f5ebe4 #ffffff #ff6955 | accent | edge |
| comp_events | pokawa_com_pokawa_pro | 1 | 200 | ok | 5354 | 375 | 40 | 0 | 0 | 0 | 0 | 7 | elementor | Poppins | Poppins | #172672 #fff7ec #dfdfdf | none | mixed |
| catering | shop_popchef_com_shop_plateaux_repas_entreprise | 1 | 200 | ok | 5001 | 1069 | 67 | 0 | 0 | 0 | 0 | 96 | - | MontserratBold | sans-serif | #f8f8f8 #fcf7e2 #ffffff | accent | edge |
| catering | foodcheri_com_plateau_repas | 1 | 200 | ok | 9415 | 671 | 60 | 0 | 0 | 0 | 112 | 408 | gsap, ScrollTrigger, webflow | LTC Globe Gothic | Roc Grotesk | #ffffff #121010 #f5f1ea | accent | mixed |
| catering | ezcater_com | 1 | 200 | ok | 4199 | 256 | 63 | 1 | 0 | 0 | 0 | 313 | - | Libre Franklin Variabl | Figtree Variable | #003d24 #d7fcdc #ffffff | accent | mixed |
| catering | feedr_co_en_gb | 2 | 200 | ok | 7646 | 610 | 97 | 3 | 0 | 0 | 66 | 723 | gsap, ScrollTrigger, Swiper, webflow | Montserrat ✅ | Montserrat ✅ | #f7f8f9 #ffffff #1e236e | accent | cards |
| catering | pret_co_uk_en_GB_platters | 2 | 200 | ok | 4219 | 508 | 8 | 0 | 0 | 0 | 0 | 8 | - | Star Serif | Star Serif | #ffffff #faf9fa #9f1b32 | accent | edge |
| catering | sweetgreen_com_catering | 1 | 200 | ok | 4070 | 495 | 12 | 0 | 0 | 0 | 0 | 1615 | gsap | Grenette | SweetSansText | #ffffff #00473c #d8e5d6 | none | cards |
| catering | gails_com_pages_office_catering | 1 | 200 | ok | 6291 | 3051 | 25 | 0 | 0 | 0 | 0 | 583 | shopify | BasisGrotesque | BasisGrotesquePro | #f5f5ed #edebda #cf2030 | accent | edge |
| catering | lepainquotidien_com_us_en_catering | 1 | 200 | ok | 3916 | 372 | 6 | 0 | 0 | 2 | 0 | 65 | - | druk | brandonText | #fbf5ee #ffffff #000000 | none | edge |
| catering | shakeshack_co_uk_catering | 2 | 403 | walled | 1021 | 119 | 0 | 0 | 0 | 0 | 0 | 0 | - | -apple-system | -apple-system | #ffffff #ebebeb | - | - |
| catering | catering_chipotle_com | 1 | 200 | ok | 2845 | 813 | 20 | 0 | 0 | 0 | 0 | 58 | - | TradeGothicLTCom | Nunito | #f2f2f1 #ffffff #786259 | none | cards |
| catering | pizzapilgrims_co_uk_pizza_pilgrims_catering | 1 | 200 | ok | 6016 | 827 | 58 | 0 | 0 | 0 | 57 | 86 | gsap, Lenis | Pizza Pilgrims | ChelseaRR | #00572e #e6eeea #003019 | none | edge |
| catering | baolondon_com_private_hire | 1 | 200 | ok | 3730 | 244 | 25 | 0 | 0 | 0 | 0 | 41 | - | Brown | Brown | #f9f9f5 | heavy | edge |
| catering | ottolenghi_co_uk_pages_catering | 1 | 200 | ok | 5377 | 775 | 31 | 0 | 0 | 0 | 0 | 439 | shopify | Riforma | Riforma | #f9f2ec #fcf7f2 #ffffff | none | mixed |
| story | graza_co | 1 | 200 | ok | 8664 | 533 | 75 | 10 | 0 | 0 | 12 | 260 | gsap, lottie, shopify | ITC Garamond Condensed | GT Alpina Typewriter | #f6e6d9 #d1e030 #fbd535 | heavy | edge |
| story | omsom_com | 1 | 200 | ok | 900 | 201 | 20 | 0 | 0 | 0 | 0 | 0 | - | - | YAD4imOwJ8U_0 | #ffffff #f7f3da #aceb9f | accent | unknown |
| story | eatfishwife_com | 2 | 200 | ok | 6651 | 931 | 126 | 0 | 0 | 0 | 0 | 1088 | gsap, framer, shopify | Recoleta | Recoleta | #fff7e9 #fffcf3 #fff8ea | heavy | mixed |
| story | oatly_com | 1 | 200 | ok | 900 | 152 | 8 | 0 | 0 | 0 | 0 | 67 | - | Margo Pro Regular | Margo Pro Regular | #fffef6 #ffffff #000000 | accent | cards |
| story | liquiddeath_com | 2 | 200 | ok | 3902 | 606 | 117 | 4 | 0 | 0 | 0 | 446 | shopify | Acumin Pro | Acumin Pro | #f5f5f5 #ffffff #000000 | heavy | edge |
| story | brightland_co | 2 | 200 | ok | 6712 | 1368 | 952 | 0 | 0 | 0 | 2 | 3645 | Swiper, shopify | CircularXXWeb | CircularXXWeb | #ffffff #f5f3ec #f2f2f2 | accent | mixed |
| story | flybyjing_com | 3 | 200 | ok | 4631 | 398 | 41 | 0 | 0 | 0 | 0 | 53 | splide, shopify | JeanLuc | Helvetica | #ab2328 #000000 #fc521c | accent | edge |
| story | diasporaco_com | 1 | 200 | ok | 6820 | 1136 | 132 | 0 | 0 | 1 | 0 | 1126 | Lenis, shopify | p22-mackinac-pro | Fustat | #fffceb #d5137b #ffd000 | accent | mixed |
| story | drinkghia_com | 3 | 200 | ok | 7015 | 1250 | 208 | 1 | 0 | 0 | 7 | 682 | Swiper, shopify | FHA Condensed French N | Vivey 22 Positive | #651c32 #fef6ee #3e4938 | accent | edge |
| story | magicspoon_com | 2 | 200 | ok | 7061 | 474 | 151 | 5 | 0 | 0 | 0 | 2234 | Swiper, shopify | Poppins | Poppins | #dad9ff #ffffff #5b00ed | heavy | edge |
| story | mastmarket_com | 1 | 200 | ok | 3362 | 164 | 7 | 0 | 0 | 0 | 0 | 62 | shopify, wix | system_ui | sofia-pro | #f6f5ef #d4c1b0 #e4e2dd | none | edge |
| story | dishoom_com | 1 | 200 | ok | 10772 | 858 | 79 | 0 | 0 | 2 | 0 | 404 | gsap | cheltenhamBT | cheltenhamBT | #f0ece0 #151515 #000000 | none | edge |
| story | takearecess_com | 1 | 200 | ok | 15311 | 993 | 219 | 1 | 0 | 6 | 12 | 60 | Swiper | Sharp Grotesk Web | Sharp Grotesk Web | #a2b0ff #0a0a3a #1d2a58 | accent | edge |
| story | bigmammagroup_com | 3 | 200 | obscured | 3268 | 681 | 45 | 1 | 0 | 0 | 0 | 32 | gsap | Instrument Serif | Lora | #321108 #fffdf4 #bf1422 | - | - |
| story | sietefoods_com | 1 | 200 | ok | 9397 | 284 | 24 | 0 | 0 | 0 | 0 | 262 | gsap, ScrollTrigger | Queulat | BD Rendall | #710a5e #f2a900 #efe2cd | accent | mixed |
| story | joejuice_com | 2 | 429 | walled | 900 | 12 | 0 | 0 | 0 | 0 | 0 | 0 | - | - | -apple-system |  | - | - |
| story | momofuku_com | 2 | 200 | ok | 6407 | 357 | 27 | 0 | 0 | 0 | 0 | 191 | - | Graphik | Momo Sharpie | #faf7ee #000000 #232323 | none | cards |
| story | fiveguys_fr | 1 | 200 | ok | 9965 | 556 | 45 | 0 | 0 | 0 | 3 | 101 | splide | Public Sans | Public Sans | #000000 #ffffff #f6f6f6 | none | mixed |
| story | tonyschocolonely_com | 2 | 200 | ok | 3587 | 384 | 35 | 0 | 0 | 0 | 0 | 40 | shopify | American typewriter | American typewriter | #ffffff #eb0000 #006be1 | heavy | edge |
| story | drinkolipop_com | 1 | 200 | ok | 6103 | 732 | 179 | 0 | 0 | 0 | 0 | 1177 | gsap, Swiper, shopify | Ano | Ano | #fff6ea #000000 #008168 | accent | edge |
| story | drinkpoppi_com | 2 | 200 | ok | 4793 | 365 | 155 | 1 | 0 | 0 | 70 | 137 | - | font-secondary | Source Sans Pro | #ec008c #f6f6f6 #ffffff | accent | edge |
| story | micheletaugustin_com | 1 | 200 | ok | 3074 | 353 | 36 | 0 | 0 | 0 | 0 | 1052 | framer | natronmedium | univers | #ffffff #6aaae4 #6699cc | heavy | edge |
| story | middaysquares_com | 3 | 200 | ok | 10498 | 613 | 49 | 5 | 0 | 0 | 0 | 86 | shopify | Helvetica | GT-America-Standard-Re | #fff9e2 #101010 #48a23f | none | edge |
| story | bachans_com | 3 | 200 | ok | 4679 | 779 | 101 | 0 | 0 | 0 | 0 | 2119 | Swiper, shopify | carrosserie-bold | PlutoSansCondRegular | #fff9f5 #eb002b #f9eee7 | accent | edge |
| story | pipandnut_com | 3 | 200 | obscured | 9009 | 641 | 175 | 36 | 0 | 0 | 0 | 6697 | gsap, shopify | mindset | rogliano | #ffffff #000000 #f1f3fa | - | - |
| story | francomanca_co_uk | 3 | 200 | obscured | 12705 | 842 | 77 | 3 | 0 | 0 | 1 | 782 | gsap | Franco Manca | AHAMONO | #f3efe7 #ffffff #f8f4f2 | - | - |
| motion | drinkcann_com | 2 | 200 | ok | 7776 | 804 | 60 | 1 | 0 | 0 | 0 | 94 | shopify | Gotham - Medium | Noto Sans | #ffffff #f2eea1 #00a7c7 | accent | edge |
| motion | driscolls_com | 1 | 200 | ok | 4337 | 163 | 21 | 0 | 0 | 0 | 0 | 79 | - | gelicaSemiBold | body | #ffffff #fdc41f #0a6100 | heavy | edge |
| motion | und_ny_com | 1 | 200 | ok | 900 | 485 | 35 | 5 | 0 | 6 | 0 | 1160 | gsap | SuisseReg | neue-haas-grotesk-disp | #ddc383 #878145 #fefefe | none | onescreen |
| motion | lusion_co | 2 | 200 | ok | 900 | 893 | 0 | 0 | 1 | 0 | 0 | 503 | THREE | Aeonik | Aeonik | #ffffff #121416 #0016ec | none | onescreen |
| motion | igloo_inc | 1 | 200 | ok | 900 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | gsap, THREE | - | Times New Roman |  | none | onescreen |
