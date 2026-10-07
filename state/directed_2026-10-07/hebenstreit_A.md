# Thomas Hebenstreit, Sartoria Vienna, ctc_3S2rDnBX9W5hd3F8G (lea_TDMx4fyQehYYg7Aje, W1b)

## Stop flags
None. Thread empty (0 activities, nextPage null, 2026-10-07 16:05 UTC, control ctc_ch3vFcKAkjQdMKDCg 2 items same minute). sentOnly shows only our connect note of 2026-10-07 15:18 UTC, lastRepliedAt null. No state file row anywhere. Shape OPENER.

FLAG for Raka. The site imprint (https://sartoriavienna.com/en/policies/legal-notice) names Christoph Edlinger-Kerle as Managing Director and five shareholders. North Data's Firmenbuch publications say Thomas became MD again on 2026-03-23 (published 11 Apr 2026) and one shareholder left on 4 Aug 2026. So he's owner and MD now, the imprint is stale. Not in the message.

## Record and ownership
- lemlist: jobTitle "CEO & Founder", tagline "Founder | Finance Professional | Austria's 100 best Youth Entrepreneurs 2024", companyDomain sartoriavienna.com, 3 staff, founded 2025.
- SV Made-to-Measure GmbH, formerly The Shirt Dandy GmbH, FN 590814w, Gonzagagasse 9/Top 1 Wien. MD Thomas Hebenstreit 2022-10-11 to 2025-05-14 and from 2026-03-23, shareholder. https://www.northdata.com/SV+Made-to-Measure+GmbH,+Wien via tools/fetch-walled.py.
- Investors per press, Helmut Schuster (imprint and brutkasten), angel round with two co-founders in 2025, one co-founder exit discussed on brutkasten 2026-07-02 (snippet, tier G).

## Website
- Pass 1 and pass 2, 150 URLs each (cap), 148 non asset, 147 at 200. Shopify. site-audit.js RENDER NOT TRUSTED (12 of 12 failed assets fine over direct fetch), screenshots void. render-via-curl.js six parts opened: hero "Primelia by Sartoria Vienna, Neu Damenmode nach Maß, Neuer Store in Graz, Trunkshow 1 x Monat in Wien", band "Hochzeit 2027? Schon jetzt kostenloses Beratungsgespräch buchen! Standardlieferzeit für Anzüge 6-8 Wochen!", category tiles, configurator mock (phone showing a shirt at EUR 179 with a "Book Appointment" button), groomsmen party, fabric mills, "Hergestellt in der EU", FAQ, footer with three ateliers. Modern, well shot.
- Booking: /pages/termin embeds https://sartoriavienna.trafft.com. Categories Hochzeit, Erstvermessung, Kostenlose Erstberatung, Bestandskunden, Fitting - Abholung, Haus- und Bürobesuch. Bestandskunden = Nachbestellung Anzug 1h, Hemd 30Min, Sakko / Hose / Mantel 30Min. Fitting - Erstbestellung 45Min, Abholung - Nachbestellung / Gutschein 30Min. Capacity 1 each.
- FAQ: "Can I measure myself at home? This isn't possible at the moment. We recommend making an appointment at one of our studios." and "I would like to update some measurements before my next order ... contact our customer service at office@sartoriavienna.com".
- Ateliers: Vienna, Graz, Linz, all "By appointment only". Linz Mon, Wed, Sat only.
- Careers: style consultants for Vienna, Graz and Linz, full and part time, plus Saturdays; tasks consultation and "Precise measurements".
- Executive Service: home or office visit, 200 euros, Vienna only.
- Prices: suits from 749, wedding from 999, shirts from 139.
- Configurator: Thob 3D Studio app, rendered twice in headless Chromium with and without software WebGL, loader only. UNKNOWN whether it sells online. No claim made.
- Stale: promo bar "Back to Business! -15% on all business suits only in August" in the October crawl.

## GDPR
tools/eu-view.py --shopify from Stockholm: _ga, _gcl_au, _ga_ZTMCZYK9BG, _fbp before a click, 29 third party hosts incl. Clarity, LinkedIn, Meta, DoubleClick. Shopify banner regionVisibility ["AT"], so Austrians get a banner, other EU visitors don't. Real for German visitors, small for an Austrian studio business.

## Social
social-audit.js: Instagram 1442 followers, 61 posts, latest 2026-09-27. Facebook read, no count. LinkedIn company UNKNOWN (login wall). Control brouwerijdesnor read in the same run.

## News and clues
- Apparel Resources 2024-11-15, his own article, read via fetch-walled: "Mobile 3D body scanning allows customers to use their smartphones to capture precise body measurements in minutes. We are going to implement this technology shortly to enable remote fittings, allowing clients from across the globe to experience the perfect fit without even stepping into our shops." and that streamlining "leads to higher customer satisfaction, driving repeat business and referrals."
- tools/news.py de: brutkasten 2026-07-02 podcast "Maßanzüge als Startup-Case ... Profitabilität, Expansion und Co-Founder-Exit"; search snippet (tier G) says four locations incl. a Linz pop up and a women's store in Graz, expansion from cashflow, seven figure revenue as the goal, a house of brands. Kleine Zeitung 2025-05-27 Graz opening with the 3D configurator. MeinBezirk 2025-07-16 Vienna store. Press page: Linz from 15 Jan 2026.
- Clue chain for the goal: three studios in a year, hiring consultants for all three, seven figure goal, his own stated plan for remote measuring and repeat business. Goal is growth across three ateliers with a small team.

## LinkedIn routes
1 curl /in/thomashebenstreit 999. 2 search titles only press. 3 posts search nothing. 4 company page UNKNOWN. 5 his own article above. 6 lemlist record.

## Judge table

| Pain | Proof | Cost to him | Would he name it | Incumbent | Verdict |
|---|---|---|---|---|---|
| Reorders from measured customers need a booked studio slot | Trafft Bestandskunden, FAQ | Consultant hours across 3 studios plus repeat sales put off, his cheapest sale | Yes, his own 2024 article wants remote fittings and repeat business | Trafft only books, no reorder flow | CHOSEN, costliest |
| Wedding season consult load, free first consultations | Hochzeit pages, Kostenlose Erstberatung | Slots on leads that may not buy | Likely | none | Real, same capacity root as above |
| Follow up after consultations and events | none visible | unknown | maybe | maybe Brevo (lemlist tech list) | INFERENCE only |
| Home measuring not live | FAQ | Reach outside 3 cities | Yes | none | Bigger build, clue not opener |
| GDPR banner AT only | eu-view | Abmahnung risk from DE visitors | no | Shopify setting | Tweak |
| Stale imprint MD, August promo | site, register | Legal nit | no | | Tweak |

## Red team
In drafts.md. Open risk, reorders may also be taken by email or phone, the message only claims what the booking page asks.

## Sources (16 across 9 domains)
sartoriavienna.com (home, termin, faq, ateliers, karriere, hochzeit, groomsmen-party, executive-service, legal-notice), sartoriavienna.trafft.com, northdata.com, apparelresources.com, instagram.com embed, webbkoll.5july.net, news.google.com rss, fashionunited.uk, brutkasten (snippet), linkedin.com (999).
