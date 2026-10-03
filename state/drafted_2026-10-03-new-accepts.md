# New accepts, 2026-10-03. 3 openers drafted, 2 closed. NOTHING SENT.

Raka's words, "Do it again and do the research. Full research. NO SHORCUTS! FOLLOW MY INSTRUCTIONS!!!! Dont shortcut okay?"

## What was run, in order

- **Session start.** `tools/preflight.py`, RULES.md read in full, `docs/opener-template.md` read in full.
- **Accepts refreshed.** `get_campaigns`, two campaigns running now, v0.1 (`cam_PryZp5LuvQv8NznHh`) and a new one,
  "founders: new businesses with marketing hires" (`cam_Csq9BikBWz7dNqSs4`). `linkedinInviteAccepted` since 1 Oct,
  v0.1 returns 13, the new campaign 0 (same endpoint returns v0.1's 13, so the zero is real). Joined to the queue, one
  new (Melissa Carman), plus Noah Hertling whose 16 Sep verdict turned out to be about a different person (below).
- **Check A, four ways, for all five.** `get_inbox_conversation` per contactId, all empty, sync "recent", control
  Nick Richards' thread came back with both his messages. `get_inbox_conversations` name and company searches,
  `teamConversations` failed its control (it can't find Nick), `sentOnly` passed it (finds Nick), and on `sentOnly`
  each of the five has exactly one conversation, the connect note, no reply. Grep of every state and log file, no
  send anywhere, only their own queue rows.
- **Tool fix, committed with this file.** Chromium refused every site including example.com with
  ERR_CERT_AUTHORITY_INVALID. The proxy now presents a new CA ("CCR agent-proxy interception CA (production) 2026-08")
  and site-audit.js and social-audit.js pinned only the old key. `tools/proxy-ca-spki.js` now reads every Anthropic CA
  key from `/root/.ccr/ca-bundle.crt` at run time. Verification stays on for every other CA. Control example.com 200.

## The count

| Lead | Verdict | In one line |
|---|---|---|
| Arnaud Tescari, Maison Goustine | OPENER | The meal box page says order now, and the button leads to a quote form and a callback |
| Ryan Eastwood, Qualiflex and Flexo Trade Print | OPENER | His new second plate house's site carries a software theme's sample reviews |
| Melissa Carman, Jan Forster Estates | OPENER | The site offers an instant online valuation, and there isn't one, only a form and a callback |
| Elias Stoller, SSF.Pools by KLAFS | CLOSED_NOT_ICP | Appointed managing director inside the KLAFS group since 2026, a group agency runs the site |
| Noah Hertling, Systemhaus-Hertling UG | NO_STRONG_ANGLE | A five month old one man IT firm, every flaw is a five minute fix he can do himself |

## The things Raka would want to know first

- **Melissa's company went through administration in December.** JanForster-Estates Ltd entered administration on
  10 Dec 2025 and the business was sold the same day to Dennison Property Services Ltd, owned by Angela Dennison
  (founder Jan Forster's daughter) and Melissa (registered as Melissa Guinsberg, the site signs her Melissa Carman,
  Owner). The opener doesn't mention any of it. Raka may prefer a softer first message to someone rebuilding.
- **Ryan's opener is about his second company, not the one on his lemlist record.** He and his father bought into
  Flexo Trade Print Ltd (incorporated 3 Nov 2025, both 25 to 50% owners). Block one names Qualiflex as the template
  says, block two names Flexo Trade Print. Both are his per Companies House.
- **Noah's 16 Sep row was the wrong man.** It matched his LinkedIn slug to a French graphic designer and ruled him out
  under the old €5k floor. The lemlist record, the Impressum and the register all say he runs Systemhaus-Hertling UG.
  He's closed again today, on the right business and for a different reason.
- **Three tool lessons.** site-audit.js said "banner NONE FOUND" on qualiflexltd.com while the screenshot shows an
  orange cookie bar with Accept and Decline. Our render showed Maison Goustine's hero video as "Vidéo non disponible",
  and YouTube's own oEmbed returned it as a live public video by agence bloome, so it was us. And
  `get_inbox_conversations` with `listId: teamConversations` can't find a known contact, use `sentOnly`.

---

## Arnaud Tescari, Maison Goustine. OPENER. ctc_paKBTrRbhpgYQ2mBd

```gate
lead: Arnaud Tescari, Directeur Général et associé of Maison Goustine since 2025, ctc_paKBTrRbhpgYQ2mBd, lea_qfG2tPLqvqrdvgfNX. Trading company JEAN-DAVID TRAITEUR SAS, SIREN 984173849, created 26 Dec 2023, président HCB GROUP (SIREN 451680508, président Jean-David Cohen), per https://recherche-entreprises.api.gouv.fr/search?q=984173849 . Press names Arnaud and chef Romain Arnone as the two new partners joining founder Jean-David Cohen in February 2026. The site's legal notice names him "Directeur de la publication". Associé, not majority owner, he runs the company day to day
site pass 1: 400 pages by tools/crawl.py on https://maisongoustine.fr (cap reached, 167 queued), 371 at 200 and 29 behind a Hostinger browser check, FR and EN, every page title and text read
site pass 2: GOUSTINE_PASS2 pages, second full crawl, plus the homepage rendered in Chromium and a full page screenshot looked at, the meal box, quote, company, agency and legal pages fetched again through tools/fetch-walled.py and read in full
deep analysis: A WordPress site on the Attika restaurant theme with WPBakery and WooCommerce, built by the Marseille agency Bloome per the legal notice. The real site is about 30 pages, events, three collections (Origines, Le Goût du Sud, L'Instant Goustine), venues, a page per buyer type and one quote form at /contact-et-devis/ (profile, event type, guest count, budget per head, date, details, contact, job title), after which "Notre équipe Maison Goustine prendra rapidement contact avec vous". /coffret-repas/ says "Une réunion ou un séminaire à venir ? Commandez dès maintenant vos coffrets repas pour vos invités." and its only button, "CONTACT & DEVIS", links to /contact-et-devis/. No page takes an order. WooCommerce is installed and its store API lists 26 theme demo products in USD ("Marinated Oysters" SKU PR0039), and the Yoast sitemap given to Google lists 13 demo posts (Hello world, a lorem ipsum "Curabitur ullamcorper" post), 8 "save" and "v2" draft pages and 57 demo portfolio dishes, none of them in the menu. The hidden side panel on every page still holds the theme's "attika fine dining restaurant" and a New Jersey demo address
owner linkedin: route 1 lemlist record, jobTitle "Directeur Général Associé", summary on joining in 2025 alongside Jean-David Cohen and Romain Arnone. Route 2 web search "Arnaud Tescari" Maison Goustine, result title "Arnaud Tescari - Maison Goustine" at https://www.linkedin.com/in/arnaud-tescari-55748142 , walled. Route 3 press, Presse Agence 2026-02-17, he "apporte une vision stratégique pour développer la marque sur tout le territoire". Route 4 earlier career via tools/news.py, director of Centre Valentine and Grand Littoral shopping centres (Gomet 2019, La Provence 2019). Route 5 company page https://www.linkedin.com/company/maisongoustine/ read by tools/social-audit.js, 208 followers. Route 6 legal notice, Directeur de la publication
contact linkedin: Arnaud is the person messaged and runs the company, founder Jean-David Cohen is président through HCB GROUP, same routes
google news: tools/news.py fr, "Maison Goustine" 11 results (Presse Agence 2026-09-17 and 2026-02-17, Le Journal des Entreprises 2026-02-23 and 2026-03-25, mesinfos 2026-02-18, lessentiel 2026-02-17), "Arnaud Tescari" 10 results, control Carrefour 100
regional news: tools/news.py (Marseille) (traiteur événementiel) 50 results, Gomet 2026-09-25 on a rival Iberian caterer, lessentiel 2026-02-17 read in full, HCB group 150 FTE, 500 events a year, €11M in 2025 of which €3M Maison Goustine
industry news: same pull, plus the Marseille meal box market read at source, Déliss (https://deliss.fr/plateaux-repas/ , cart, "Dès 1 plateau", "H-2 minimum", pay on invoice) and Metsens (https://metsens.fr/traiteur/plateau-repas-marseille/ , "Commande en ligne" in its menu)
sources:
1. https://maisongoustine.fr/coffret-repas/
2. https://maisongoustine.fr/contact-et-devis/
3. https://maisongoustine.fr/une-entreprise/
4. https://maisongoustine.fr/mentions-legales
5. https://maisongoustine.fr/wp-json/wc/store/v1/products?per_page=100
6. https://maisongoustine.fr/post-sitemap.xml
7. https://recherche-entreprises.api.gouv.fr/search?q=984173849
8. https://presseagence.fr/marseille-jean-david-cohen-lentreprise-meritait-un-nom-qui-lui-ressemble/
9. https://www.lessentiel.fr/marseille/entreprises/2026-02-17/avec-maison-goustine-jean-david-traiteur-ouvre-un-nouveau-chapitre
10. https://deliss.fr/plateaux-repas/
11. https://metsens.fr/traiteur/plateau-repas-marseille/
12. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fmaisongoustine.fr%2F (tools/eu-view.py)
13. https://www.instagram.com/maisongoustine/ (tools/social-audit.js)
14. https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=-yX3d8IKv6Q (their hero video, public)
pains: 5 judged. (1) The meal box line says order now and only offers a quote form and a callback, while Marseille rivals take the order online from one tray at two hours' notice, costliest because office lunches are the repeat, every week revenue line and the order goes to whoever is quickest. (2) GDPR, from Stockholm with nothing clicked YouTube (VISITOR_INFO1_LIVE, YSC) and Poptin (user id, IP, country) cookies are set, no consent tool on the page, and the legal notice tells visitors to refuse cookies through their browser, which the CNIL doesn't accept, real, an afternoon's fix for Bloome. (3) Theme demo content listed in the sitemap for Google, 13 posts, 8 drafts, 57 dishes, 26 USD products, real, a cleanup. (4) Social, Instagram posted today, no angle. (5) Squad, a 15 FTE caterer with an agency, no build team needed
chosen: (1), costliest and closest to the brand growth Arnaud was brought in for, it's the line customers buy again and again
sweep website: about 30 real pages of https://maisongoustine.fr read twice and the homepage screenshot looked at, clean and recent, the order now promise on /coffret-repas/ with only a quote form behind it is the flaw, the demo content in the sitemap is a cleanup noted for later
sweep gdpr: tools/eu-view.py https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fmaisongoustine.fr%2F , 24 cookies before a click including YouTube and Poptin, no consent code in the HTML, legal notice cookie section relies on browser settings, real and kept as the second angle
sweep apps: a meal box order flow with delivery slots and invoice payment is the chosen angle, WooCommerce is already installed but holds only demo products
sweep social: tools/social-audit.js opened https://www.instagram.com/maisongoustine/ 541 followers, 83 posts, latest 2026-10-03, and https://www.linkedin.com/company/maisongoustine/ 208 followers, alive, no angle
sweep squad: a caterer with Bloome as its web agency per https://maisongoustine.fr/mentions-legales , no in house builders needed, not a squad fit
thread: problem the meal box page says order now and the button only leads to a quote form and a callback | cost office managers booking lunch order from caterers who take the order online, and those orders repeat | offer the coffret repas order page | link order, coffret
lead read: Arnaud reads that his meal box page tells companies to order now but only gives them a quote form and a callback, that office managers then order lunch from caterers who take it online and every repeat order goes with them as he grows the brand, and gets offered the order page for those coffrets repas, one thread
claims:
your site is telling companies to order their coffrets repas now, https://maisongoustine.fr/coffret-repas/ "Commandez dès maintenant vos coffrets repas pour vos invités"
the button sends them to a quote form and a callback, the page's only button "CONTACT & DEVIS" links https://maisongoustine.fr/contact-et-devis/ , a form whose page says "Notre équipe Maison Goustine prendra rapidement contact avec vous", no form on /coffret-repas/ itself
Marseille caterers who take the order online, https://deliss.fr/plateaux-repas/ cart from one tray, two hours' notice, and https://metsens.fr/traiteur/plateau-repas-marseille/ "Commande en ligne"
growing the Maison Goustine name across the region with three new collections, https://presseagence.fr/marseille-jean-david-cohen-lentreprise-meritait-un-nom-qui-lui-ressemble/ "développer la marque sur tout le territoire", "trois nouvelles collections culinaires"
recheck: 2026-10-03, coffret page, quote page and the two rival pages fetched again, unchanged. Opposite check 12:40 UTC, the coffret page loads WooCommerce scripts, so the store was tested, https://maisongoustine.fr/wp-json/wc/store/v1/products returns 26 products, every one an English theme demo dish priced in dollars (Marinated Oysters, Sushi Tuna Maki), no coffret among them, and the cart page https://maisongoustine.fr/?page_id=20 returns 404. Every order link on the coffret page goes to /contact-et-devis/. The claim survives. Thesis confidence MEDIUM, the flaw is proven, how many lunch orders they lose is inference
```

### Arnaud, OPENER

```
Hi Arnaud, saw Maison Goustine, looks interesting!

However, your site is telling companies to order their coffrets repas now, and the button only leads to a quote form and a callback. This causes office managers booking lunch for a meeting to order from the Marseille caterers who take the order online.

Especially, when you are growing the Maison Goustine name across the region with three new collections, the lunch orders lost to a callback grow with every company you win.

I run Astra agency. We build websites and ordering tools for brands like Unilever, AXA, Pertamina. I built a food brand from zero with my family and ran its orders and pricing, so I've seen reorders go to whoever makes them easiest.

Shall I send you over what the coffret repas order page looks like?
```

---

## Ryan Eastwood, Qualiflex and Flexo Trade Print. OPENER. ctc_S5TaMLkjQfDeiWrcq

```gate
lead: Ryan Eastwood, tagline "Technical Director at Qualiflex Ltd.", ctc_S5TaMLkjQfDeiWrcq, lea_zDSJsNpvXhJaHo4NZ. Companies House 07061519 QUALIFLEX LIMITED, Ryan Daniel Eastwood director since 19 Oct 2021, Colin Reginald Eastwood director and PSC 75%+, Charlotte Emma Eastwood PSC. Companies House 16826288 FLEXO TRADE PRINT LTD, incorporated 3 Nov 2025, directors Colin Reginald Eastwood and Ryan Daniel Eastwood, both PSC 25 to 50%. A family business he co owns and directs
site pass 1: 22 URLs by tools/crawl.py on https://qualiflexltd.com (4 real pages, a client login and duplicate login paths) and 17 on https://flexotradeprint.co.uk , every page read
site pass 2: 22 and 17 pages, second full crawls, plus screenshots, qualiflexltd.com homepage by tools/site-audit.js, flexotradeprint.co.uk full page and the testimonial section in Chromium, and its About Us, services and Privacy Policy pages rendered one by one with example.com as control in the same run
deep analysis: Qualiflex is a 4 page site by getyouonline.co.uk with a client job portal (Nucleus), work shown in the hero slider (a Doritos pack), "Examples of previous work and customer testimonials made readily available upon request" on /documents, copy saying "Over the past 10 years" for a 2004 firm. Flexo Trade Print's site is WordPress on the "SaasLauncher by CozyThemes" theme, logo uploaded 2026/05. Its homepage copy is real and plate specific (corrugated, flexible packaging, labels, a four step process). Its testimonial block "Hear from our happy clients" holds six cards, two of them the theme's software reviews, "Lena K, UX Consultant, This SaaS solution is a gem. It adapts perfectly to our needs, scales effortlessly" and "Daniel F, IT director, Our team instantly became more productive. The personalised help during onboarding made a huge difference". The Lena K text appears word for word on an unrelated site, https://shop.ordemsolutions.com/ , so it's stock. The footer links About Us and Privacy Policy go to pages that show a title and nothing else (Privacy shows a map), the services page is titled "OURS ERVICES", the opening hours say "WESNEDSAY". The main menu's About and Services jump to homepage sections, Request a Quote is a mailto
owner linkedin: route 1 lemlist record, tagline Technical Director, summary on Qualiflex's design, repro and plates. Route 2 web search "Ryan Eastwood" Qualiflex, Sales Director at Qualiflex since 2014, designer there 2010 to 2014, Co Owner at Flexo Trade Print as of 2026, profile https://www.linkedin.com/in/ryan-eastwood-9867b8118 walled. Route 3 Companies House officer records for both companies. Route 4 https://www.linkedin.com/company/flexo-trade-print via WebFetch, "The largest flexographic repro house in the West Midlands area", 7 employees listed, no posts visible. Route 5 https://www.linkedin.com/company/qualiflex-limited by tools/social-audit.js, UNKNOWN (walled). Route 6 printbusiness.co.uk, Flexo Trade Print's 2024 fire, plates 80% of its revenue then
contact linkedin: Ryan is a director and part owner and the person messaged, his father Colin holds the larger stake in Qualiflex, same routes
google news: tools/news.py en, "Qualiflex" 4 results all Voith's QualiFlex press, not them, "Ryan Eastwood" 17 results, other people, control Tesco 100
regional news: tools/news.py (Derbyshire) (flexographic printing) 1 result, unrelated. Trade press read, https://printbusiness.co.uk/fire-stops-flexo-trade-print/ (5 Aug 2024, the fire next door, out of action), and Flexo Trade Print's own posts "Factory Fire" and "Good News, Back in Production"
industry news: tools/news.py flexographic printing 100 results, FTA Rising 20 (2026-09-30), DuPont Cyrel (2026-09-30), Kyocera printheads (2026-09-29), plus https://www.flexotechmag.com/features/more-than-just-making-plates/ on UK trade houses competing on online ordering and proof
sources:
1. https://flexotradeprint.co.uk/
2. https://flexotradeprint.co.uk/privacy-policy/
3. https://flexotradeprint.co.uk/about-us/
4. https://shop.ordemsolutions.com/ (same Lena K review, control that it's stock)
5. https://find-and-update.company-information.service.gov.uk/company/16826288
6. https://find-and-update.company-information.service.gov.uk/company/07061519
7. https://qualiflexltd.com/
8. https://qualiflexltd.com/documents
9. https://printbusiness.co.uk/fire-stops-flexo-trade-print/
10. https://www.linkedin.com/company/flexo-trade-print
11. https://www.flexotechmag.com/features/more-than-just-making-plates/
12. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fqualiflexltd.com%2F (tools/eu-view.py)
13. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fflexotradeprint.co.uk%2F (tools/eu-view.py)
pains: 5 judged. (1) Flexo Trade Print's relaunched site carries stock software reviews and an empty privacy page, costliest of what's provable because Ryan and Colin's company behind it was incorporated last November (Companies House 16826288) and printers moving plate work check a new name's proof first. An earlier Flexo Trade Print run by a Wilcox appears in the Print Business fire article, and no register or page found ties it to the 2025 company, so nothing in the message rests on a purchase. (2) Qualiflex's own site is four pages from an agency, shows work only in a slider and keeps samples "available upon request", real, older and smaller. (3) GDPR, qualiflexltd.com sets _ga, _gid and _gat from Stockholm before the Accept or Decline bar is answered, UK PECR, real, a setting. (4) Running two plate houses on two sites with one portal at Qualiflex only, inference, nothing public shows it costs them. (5) Social, neither site links an account, LinkedIn company pages walled or empty
chosen: (1), the costliest, it sits on the business he and his father just set up, where every new trade customer checks the site before calling
sweep website: https://flexotradeprint.co.uk read twice and rendered, two stock software reviews in the testimonial block and About Us and Privacy Policy pages with no content, chosen. https://qualiflexltd.com read twice, dated but working
sweep gdpr: tools/eu-view.py, https://flexotradeprint.co.uk 0 cookies, https://qualiflexltd.com _ga, _gid, _gat_gtag before a click despite its cookie bar, real, a setting, not chosen
sweep apps: Qualiflex already runs the Nucleus client portal for jobs, nothing public shows Flexo Trade Print customers missing one, not chosen
sweep social: tools/social-audit.js on https://www.linkedin.com/company/qualiflex-limited UNKNOWN, and neither website links any social account, Flexo Trade Print's LinkedIn page read by WebFetch shows no posts, no angle
sweep squad: two plate houses, no software build in sight, not a squad fit
thread: problem the Flexo Trade Print site carries the theme's sample software reviews | cost printers checking it before sending plate work doubt the plate reviews | offer the rebuilt Flexo Trade Print site | link Flexo, site
lead read: Ryan reads that his Flexo Trade Print site still shows a software theme's sample review, that printers checking it before moving plate work then doubt the plate reviews as he builds it up, and gets offered a rebuilt Flexo Trade Print site, one thread
claims:
your Flexo Trade Print site still carries the theme's sample reviews, https://flexotradeprint.co.uk/ footer "SaasLauncher by CozyThemes", testimonial cards Lena K and Daniel F, screenshot 2026-10-03, refetched by curl 2026-10-03 and both still there among six cards, the other four (James C, Mark H, Aliana Lorel, David T) talk about plates, hence 'the plate reviews sitting next to it'
one from a UX consultant calling it a SaaS solution, https://flexotradeprint.co.uk/ "Lena K UX Consultant This SaaS solution is a gem", same text on https://shop.ordemsolutions.com/
not in the message, kept as evidence for the build, the privacy policy page has no policy on it, https://flexotradeprint.co.uk/privacy-policy/ rendered 2026-10-03, title then a map, no policy text, control example.com rendered in the same run. Cut from block two on 2026-10-03, it made sentence one 33 words and pulled in a second problem
building Flexo Trade Print up alongside Qualiflex, https://find-and-update.company-information.service.gov.uk/company/16826288 incorporated 3 Nov 2025, Ryan and Colin Eastwood directors and owners
recheck: 2026-10-03, homepage testimonials and the privacy page fetched again and screenshotted, unchanged. Thesis confidence MEDIUM, the flaws are proven, that printers check the site before switching plate work is inference
```

### Ryan, OPENER

```
Hi Ryan, saw Qualiflex, looks interesting!

However, your Flexo Trade Print site still carries the theme's sample reviews, one from a UX consultant calling it a SaaS solution. This causes printers checking Flexo Trade Print before sending it plate work to doubt the plate reviews sitting next to it.

Especially, when you are building Flexo Trade Print up alongside Qualiflex, the plate work lost to that card grows with every corrugated printer who checks you before calling.

I run Astra agency. We build websites for brands like Unilever, AXA, Pertamina. I ran go to market at a software company, so I know trade buyers check the proof before they'll pick up the phone.

Shall I send you over what the rebuilt Flexo Trade Print site looks like?
```

---

## Melissa Carman, Jan Forster Estates. OPENER. ctc_fyP4ArYJKGDxjPL8u

```gate
lead: Melissa Carman, lemlist jobTitle "Business Owner" of Jan Forster Estates, ctc_fyP4ArYJKGDxjPL8u, lea_Zn3GENDLSmRmRJWM4. JanForster-Estates Limited (05858852) entered administration 10 Dec 2025, administrators Begbies Traynor, and per their proposal (AM03, page 5) the goodwill was sold that day to Dennison Property Services Ltd for £55,000. Companies House 16809033 DENNISON PROPERTY SERVICES LTD, directors Angela Claire Dennison and Melissa Guinsberg (appointed 11 Dec 2025), PSCs Angela Dennison 50 to 75% and Melissa Guinsberg 25 to 50%. The company's own page https://www.janforsterestates.com/about/news/under-new-ownership is signed "Angela Dennison & Melissa Carman - Owners". Two sources agree she co owns it, the register under another surname
site pass 1: 218 pages by tools/crawl.py on https://www.janforsterestates.com , all 200, every page read, listings, 124 news and about pages, 17 brochure PDFs, area guides, landlord, valuation and legal pages
site pass 2: 218 pages, all 200, matching pass 1, second full crawl, plus the homepage by tools/site-audit.js (RENDER NOT TRUSTED on lazy images, so the second path was used) and /valuations rendered by tools/render-via-curl.js, 21 served, 0 curl errors, both parts looked at
deep analysis: A Jump built site with search, saved properties, area guides, a tenancy form, a maintenance form and a valuation booking form. Since the sale it runs from two branches in Brunton Park, Gosforth, sales and property management. The /valuations page opens "We have a range of ways to value your property, from our instant online valuation service, to arranging for one of our knowledgeable team to visit" and /our-services says the same, and across all 218 pages the only valuation route is "Book a Valuation", a form after which "we will contact you as soon as possible". No link, iframe or widget for an instant valuation on any page. Control, the same link scan on https://bruntonresidential.com/ finds "Instant Valuation" at https://valuation.bruntonresidential.com/ . The administrator's proposal says the lettings side was profitable, the sales side squeezed by low cost agents, and Rightmove cost the old company about £16,000 a month. /our-services still says "branches in prime locations across the North East", and area guides remain for closed branches
owner linkedin: route 1 lemlist record, jobTitle Business Owner, tagline "Business Owner at Jan Forster Estates". Route 2 web search "Melissa Carman" "Jan Forster", profile https://www.linkedin.com/in/melissa-carman-a7872343 titled Sales Director at Jan Forster Estates, 22 years in sales, earlier King Sturge, walled. Route 3 the company's own page signed by her as Owner. Route 4 Companies House under Melissa Guinsberg. Route 5 the careers page, "Mel is on the lookout for a Sales and Lettings Negotiator" at the "busy Gosforth office". Route 6 https://www.linkedin.com/company/jan-forster-estates-ltd/ by tools/social-audit.js, UNKNOWN (walled)
contact linkedin: Melissa is co owner with Angela Dennison and the person messaged, same routes
google news: tools/news.py en, "Jan Forster Estates" 13 results, thenegotiator.co.uk 2025-12-11 "founder's daughter saves firm", Letting Agent Today 2025-12-11, Chronicle Live 2025-12-10 and 2026-01-09, business-live 2026-01-09, Property Industry Eye 2026-01-12, "Melissa Carman" 10 results, other people, control Tesco 100
regional news: tools/news.py (Newcastle) (estate agents) 100 results, Chronicle Live coverage of the collapse and listings
industry news: same pull plus the administrator's 47 page proposal read page by page (Begbies Traynor, AM03, 23 Dec 2025), circa 25 agencies in Tynemouth, low cost agents without high street offices
sources:
1. https://www.janforsterestates.com/valuations
2. https://www.janforsterestates.com/our-services
3. https://www.janforsterestates.com/branches
4. https://www.janforsterestates.com/about/news/under-new-ownership
5. https://www.janforsterestates.com/about/careers/sales-and-lettings-negotiator
6. https://find-and-update.company-information.service.gov.uk/company/05858852/insolvency
7. https://find-and-update.company-information.service.gov.uk/company/16809033
8. https://find-and-update.company-information.service.gov.uk/company/05858852/filing-history (AM03 statement of proposals, pages 5 to 10 read)
9. https://bruntonresidential.com/ and https://valuation.bruntonresidential.com/ (control and local rival)
10. https://thenegotiator.co.uk/news/agencies-people-news/estate-agency-founders-daughter-saves-firm-from-going-under/
11. https://www.instagram.com/janforsterestates/ (tools/social-audit.js)
12. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fwww.janforsterestates.com%2F (tools/eu-view.py)
pains: 5 judged. (1) Winning sale and letting instructions from two Gosforth branches after the restructure, while the site offers an instant valuation that doesn't exist and gives sellers only a form and a callback, costliest because a valuation is where every instruction starts, and a Gosforth rival gives one in 60 seconds. (2) Portal costs, the old company paid about £16,000 a month to Rightmove per the administrators, real but the old company's and not ours to fix. (3) Stale copy, "branches in prime locations across the North East" and area guides for closed branches, a cleanup. (4) GDPR, from Stockholm one session cookie and no trackers before a click, clean. (5) Social, Instagram posting daily, 3,133 posts, no angle
chosen: (1), the costliest, it's the first step of every new instruction, and a seller lost at valuation is a listing never won
sweep website: 218 pages of https://www.janforsterestates.com read twice and /valuations rendered and looked at, solid site by Jump, the instant valuation it offers isn't there, chosen
sweep gdpr: tools/eu-view.py https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fwww.janforsterestates.com%2F , one october_session cookie, no tracker before a click, clean, no angle
sweep apps: an instant valuation tool feeding the valuation team is the chosen angle, nothing else on the site shows a process gap
sweep social: tools/social-audit.js opened https://www.instagram.com/janforsterestates/ 1,288 followers, 3,133 posts, latest 2026-10-02, Facebook read, LinkedIn UNKNOWN, alive, no angle
sweep squad: an estate agency with Jump as its web supplier, no build team needed, not a squad fit
thread: problem the site offers an instant online valuation and the only way to get a figure is a form and a callback | cost homeowners take a number from a Gosforth agent who gives one on the spot, and those are instructions lost | offer the instant valuation tool | link valuation, instant
lead read: Melissa reads that her site offers an instant online valuation but only gives a form and a callback, that homeowners then take a figure from a Gosforth agent who gives one on the spot and those instructions are lost as she wins new ones, and gets offered the instant valuation tool, one thread
claims:
your site is offering an instant online valuation service, https://www.janforsterestates.com/valuations "from our instant online valuation service", same line on https://www.janforsterestates.com/our-services
the only way to get a figure is a form and a callback, https://www.janforsterestates.com/valuations rendered 2026-10-03, buttons "Book a Valuation" and "Our Branches" and a form, "we will contact you as soon as possible", no instant valuation link, iframe or widget on any of 218 pages, control the same scan finds "Instant Valuation" on https://bruntonresidential.com/
a Gosforth agent who gives one on the spot, https://bruntonresidential.com/ "Instant Valuation" at https://valuation.bruntonresidential.com/ , an agent for Great Park, High Heaton and Gosforth
your Gosforth branches, https://www.janforsterestates.com/branches refetched 2026-10-03, sales at 29 Princes Road and property management at Polwarth House, both Brunton Park, Gosforth
recheck: 2026-10-03, /valuations rendered again and Brunton's link re read. Thesis confidence MEDIUM, the gap is proven, how many sellers leave for an instant figure is inference, and an off the shelf valuation widget is a cheaper rival to what we'd build
```

### Melissa, OPENER

```
Hi Melissa, saw Jan Forster Estates, looks interesting!

However, your site is offering an instant online valuation service, and the only way to get a figure is a form and a callback. This causes homeowners checking what their place is worth to take a number from a Gosforth agent who gives one on the spot.

Especially, when you are winning new instructions from your Gosforth branches, the listings lost to that callback grow with every seller or landlord who wants a figure first.

I run Astra agency. We build websites and web tools for brands like Unilever, AXA, Pertamina. I run sales operations at a CRM company, so I see what happens to a lead that's left waiting for a callback.

Shall I send you over what the instant valuation tool looks like?
```

---

## Closed

```sweep
lead: Elias Stoller, Geschäftsführer of SSF Schwimmbad GmbH (Amtsgericht Neuss HRB 3834) per https://www.ssf-pools.de/impressum , ctc_zKomoMz6YCjvLFbaH, lea_ATSBgz64p4jSG2n9b. "eine Tochter der KLAFS Unternehmensgruppe" per https://www.ssf-pools.de/karriere . His LinkedIn per web search, Geschäftsführer at SSF from 2026, before that Geschäftsleiter Services Division and Director Logistics and Installations at KLAFS GmbH, an appointed group manager, not an owner
website: about 100 unique pages of https://www.ssf-pools.de read by tools/crawl.py (206 URLs with www and bare host duplicates), TYPO3 by schalk&friends of Munich per the Impressum, 60 project references, strong and current. One stale line, "2025 Coming soon" for a test centre in Krefeld on /ueber-ssf, a cleanup
gdpr: tools/eu-view.py https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fwww.ssf-pools.de%2F , Usercentrics consent in place, one first party cookie and a cookieless analytics ping before a click, clean
apps: callback, catalogue, appointment and contact forms on https://www.ssf-pools.de/kontakt , group systems behind them, nothing public shows a gap the subsidiary's manager could buy for
social: tools/social-audit.js opened https://www.facebook.com/SSF.Pools.by.KLAFS 814 followers, the site's other social links are KLAFS group accounts, LinkedIn UNKNOWN, no angle
squad: a subsidiary of the KLAFS group per https://www.ssf-pools.de/karriere , with a group web agency named in https://www.ssf-pools.de/impressum , the rule's "firm acquired into a group" case, not a squad fit
verdict: NO_STRONG_ANGLE, CLOSED_NOT_ICP. An appointed manager in a group company with a strong agency built site. No message
```

```sweep
lead: Noah Hertling, Geschäftsführer of Systemhaus-Hertling UG (haftungsbeschränkt), Amtsgericht Lübeck HRB 27513 HL, registered 27 Apr 2026, €300 capital, per https://systemhaus-hertling.com/impressum/ and North Data, ctc_ch3vFcKAkjQdMKDCg, lea_tuhwBfjkSfYhxquPt. SUPERSEDES the 16 Sep row, which matched his slug to a French designer (noah-hertling.myportfolio.com), the record, Impressum and register all tie him to this firm
website: 13 pages of https://systemhaus-hertling.com read twice and the homepage screenshot looked at, a clean modern WordPress site for SME IT support in Hamburg. WordPress leftovers are live, the "Hello world!" post, the "Sample Page" with the bike messenger text, and the Datenschutz page opens "Dieser Text ist eine allgemeine Vorlage ... Prüfen Sie ihn vor Veröffentlichung". All five minute fixes for an IT person
gdpr: tools/eu-view.py https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fsystemhaus-hertling.com%2F , no cookies, Google Fonts loaded from Google's servers before a click and not named in the privacy page, the LG München 2022 pattern, real, a setting he can change himself
apps: a one man IT service firm per https://systemhaus-hertling.com/impressum/ , the 13 page crawl and a live curl of https://systemhaus-hertling.com/kontakt/ show a phone number, an email and a form whose action is mailto, so it opens the visitor's mail program, a small fix an IT person makes in minutes, he builds tools for a living, no gap to sell
social: tools/social-audit.js on https://www.linkedin.com/company/systemhaus-hertling-ug-haftungsbeschränkt UNKNOWN, the site links no social account, nothing to test
squad: a one person firm five months old, tools/news.py found no coverage of the company or him (control Volkswagen 100), not a squad fit
verdict: NO_STRONG_ANGLE. Every flaw is a quick fix he'd make himself, the leftovers and the font setting are noted as a favour. No message
```
