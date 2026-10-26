# Research notes, Erik Schmidt-Lange, Taste Frankfurt, 2026-10-26

Raka's angle call, 26 Oct, word for word, "a non claude looking website to get more sales". His private read is that
the site looks generic, like an AI made it. Never said in the message. Research 26 Oct 2026, 09.30 to 10.05 UTC.
Evidence folder /tmp/claude-0/-home-user-astra-agency/24052593-7323-58b2-9e3f-744f7080d43c/scratchpad/leads/tastefrankfurt
(crawls pass1 and pass2, every page's HTML in html/, renders and their parts in parts/, the sitemap, raw lemlist pulls in
raw/, cert and RDAP pulls). Drafts file state/drafted_2026-10-26-angle-tastefrankfurt.md.

## The angle in plain words

Erik and Frederik run a young live cooking caterer near Frankfurt that has cooked for Porsche, the Städel Museum's
Städel Night, Bosch and Yahoo. Their homepage hides that. On a phone the client names only pass by in a slowly moving
strip about four screens down, and the "why us" part says flexibility, heart and quality, which any caterer says. It's
Christmas party season and they've just added Christmas photos, so a team planner landing there probably never gets to
the reason to pick them.

**The trap, plainly first.** The site is about five months old. The WordPress build dates from May 2026 (484 of 499
image links in the sitemap are May 2026 uploads), the domain record and a new hosting certificate both changed on
30 May 2026, and the footer credits an outside studio, "Erstellt mit ♥ von WOLQE". It's still being edited (8 Christmas
photos uploaded in October, sitemap lastmod 20 Oct 2026). So RULES 0F "just built" is confirmed, not ruled out, and
the likeliest no is "we only had it built in May". The draft follows Raka's call and the Beckie precedent (SENT 25 Oct,
same trap), never calls the site old, new or generic, and pitches what the homepage doesn't do yet for a company
planner. Raka decides whether it goes.

## The person (RULES 0B, 0G point 1)

- lemlist contact record, read 26 Oct 09.31 UTC via tools/lemlist.py get /api/contacts/ctc_nmWYD59STFBerEswh, firstName
  Erik, lastName Schmidt-Lange, jobTitle "Unternehmensinhaber", tagline "Inhaber Taste Frankfurt Catering – Live-Cooking
  und individuelles Event-Catering", location Langen, Landkreis Offenbach, Hesse. Lead export (state
  linkedinInviteAccepted, W1b cam_7gnHSf6GvvGy8gH3n), leadId lea_5c3W2zpv5MD4wNqc3, companyName Taste Frankfurt,
  companyDomain tastefrankfurt.com, companyLinkedinUrl linkedin.com/company/tastefrankfurt, companySize 1-10,
  companyIndustry Administrative and Support Services. Tagline, companyName, jobTitle and domain all agree.
- Impressum https://tastefrankfurt.com/impressum/ read 26 Oct, "Verantwortlich Frederik Schreier und Erik
  Schmidt-Lange Freddi On Tour Schloss Wolfsgarten 1 63225 Langen", phone +49 176 34877333, hello@tastefrankfurt.com,
  USt-ID DE370448777. No legal form and no register number named, so a partnership trading as Freddi On Tour, outside the
  Handelsregister. The page's schema block gives a second address, Monzastraße 2, 63225 Langen.
- VIES https://ec.europa.eu/taxation_customs/vies/rest-api/ms/DE/vat/370448777 , isValid true at 2026-10-26 09:36 UTC
  (Germany returns no name, so it proves a live VAT number, not whose).
- Northdata, three plain searches 429 (ours, rate limited), the walled fetch returned only the empty search form. Not
  a finding.
- His own page https://tastefrankfurt.com/erik-schmidt-lange/ , "Ich bin Erik, Co-Founder von Taste Frankfurt.
  Gemeinsam mit Frederik habe ich 2024 unser Catering-Unternehmen gegründet ... Persönliche Beratung statt anonymer
  Catering-Industrie. Wer uns anfragt, spricht direkt mit uns." Frederik's page is the mirror of it.
- Über uns https://tastefrankfurt.com/ueber-uns/ , "Erik & Frederik Founders of Taste Frankfurt ... hat 2024 Taste
  Frankfurt ins Leben gerufen", photo of the two founders and a team of six or so in Taste Frankfurt aprons.
- InStaff https://en.instaff.jobs/employer-reviews/freddi-on-tour , employer shown as Taste Frankfurt under the slug
  freddi-on-tour, 41 completed jobs, 5.00 stars from temporary staff, category Firmencatering, newest reviews
  23.08.2025, 04.07.2025, 06.05.2025 (Rosenfeld, Ehringshausen, Dresden). Ties the trading name to the brand.
- Verdict, still there. Role confirmed outside lemlist on the Impressum and his own page, both read 26 Oct 2026.

## Never messaged, checked

- tools/lemlist.py thread ctc_nmWYD59STFBerEswh, 26 Oct 09.30 UTC, control ctc_ch3vFcKAkjQdMKDCg 6 items ok, Erik 0 items.
- /api/inbox for usr_27bdxG7jzTn2rucGB, both pages, 176 conversations, none carries Schmidt, Taste or his contactId.
- grep of state/ and logs/, only the RESEARCH_QUEUED queue row of 26 Oct and two inbox logs listing him as a new accept.
- To be rerun in full (RULES 1 check A) in the minute before any send.

## The site, both passes

- site-audit.js https://tastefrankfurt.com , 200, title "Live-Cooking & Event-Catering Frankfurt - Taste Frankfurt",
  WordPress 7.1.3, theme Astra (the WordPress theme, no link to us), forms 0 on the home, img 39, video 0, 0 page errors.
  Printed RENDER NOT TRUSTED, 5 of 5 failed assets (logo-delonghi, kunden-dsv, logo-dsv, kunden-instone, logo-instone)
  served 200 over curl, so its screenshots are void and none is used. GEO VOID, consent code present, EU view run.
- tools/render-via-curl.js, every render 0 curl errors. Home desktop 33 served, 39 images, 19 undecoded (the client
  strip and hero slides, lazy, never a finding). Home phone 31 served. Weihnachtsfeier 29, Catering-Preise 14, Kontakt
  14, Menüs 28, Catering Mainz 28, the Weihnachtsfeier checklist 17, the Konzept-Finder 13, Über uns 32. Every part
  opened.
- Pass 1, tools/crawl.py, 60 URLs, 57 from the Yoast page sitemap, 59 at 200, xmlrpc.php 403 (not a page), all German.
  Pass 2, same 60, same statuses. Then all 57 pages' HTML fetched again into html/ for link and price counts.
- Page types. Home, 8 event pages (Rooftop, Sommerfest, Hochzeit, Geburtstag, Messe, Weihnachtsfeier, Grill &
  Fingerfood, Business), menus and three food pages with "Zur Anfrage hinzufügen", services (Event Personal, Equipment,
  Specialty Coffee), 7 city pages (Frankfurt, Langen, Offenbach, Darmstadt, Wiesbaden, Mainz, Bad Homburg), 11 guide pages
  under /ratgeber-catering/ plus a 2026 guide, a Konzept-Finder quiz, Catering-Preise, Kontakt, Danke, two founder pages,
  Über uns, AGB, Datenschutz, Impressum.

### What the site does well (so none of it is called missing)

- **Prices.** https://tastefrankfurt.com/catering-preise/ , "Transparente Preise · 2026", guide prices per head, lunch
  from 40 €, gala from 60 €, summer party with burger station from 45 €, wedding with bar from 90 €, most events 45 to
  65 € net, weddings 95 to 180 €, minimum order 1.800 € netto. 41 of 57 pages link to it. Not in the main menu and 0 links
  from the homepage HTML, a small fix, never the angle.
- **Enquiry.** Kontakt form with date, time, guests, menu choice, free text, "Antwort innerhalb von 24 Stunden. Auch am
  Wochenende erreichbar." Dishes on Essen, Getränke and Desserts can be added to the enquiry. /kontakt/?anlass=weihnachtsfeier
  exists.
- **Quiz.** Konzept-Finder, five questions (occasion, guests, menu, indoor or outdoor, bar), then "Unsere Empfehlung
  Live-Cooking" and the enquiry. Clicked through in Chromium on 26 Oct (Firmenfeier / Weihnachtsfeier, 50 - 100 Gäste,
  American, Indoor, Sekt and Wein, Empfehlung anzeigen), result "Live-Cooking-Catering ... 1-2 Live-Cooking-Stationen ...
  Persönliche Beratung für die Details", 0 euro signs (scratchpad scripts/quiz.js, quiz_result.png). Its meta description says "Persönliche Beratung statt Preisrechner", so a price
  calculator is left out on purpose. A quote builder is therefore NOT pitched (RULES 0F, a model not a gap).
- **Clients.** Porsche Sommerfest (100), Städel Night (2.000 Gäste an 2 Tagen), Yahoo Lunch (100), Tatort premiere,
  Bosch Roadshow (60), DeLonghi Lunch (150), DSV Kundenevent (80), Instone Richtfest (70), as cards in the "KUNDEN Fluid
  Marquee", `.tf-kunden__track{animation:tfkunden-scroll 600s linear infinite}` in the raw HTML, with a CSS comment
  "Marquee section more dominant", so the studio tuned the strip on purpose.

### What a visitor sees (the chosen finding)

- Phone, measured 26 Oct with the curl render at 390 by 844 (scratchpad scripts/measure.js, the same routing as
  render-via-curl.js, 0 curl errors). Page height 7,518 px. "Alles, was dein Event braucht" (the food cards) at y 938,
  first visible "Porsche Sommerfest" and "Städel Night" at y 3,552, i.e. 4.2 screens down, and both off screen to the left
  at that moment because the strip moves. "Weihnachtsfeier" tile at y 3,930, "Maximale Flexibilität" at y 4,848. Desktop
  1440 by 1000, Porsche at y 2,415 of 6,476.
- Order on the phone render, hero (two staff at a buffet in an office, headline "Mobiles Live-Cooking & Catering: Wir
  machen dein Event in Hessen zum Highlight", ANFRAGEN button, the cookie banner over the lower half), four tall food
  cards (Speisen, Beilagen, Desserts, Drinks), the client strip, eight occasion tiles, "Warum Taste Frankfurt" with three
  promises "Maximale Flexibilität", "Mit Herz", "Qualität & Zufriedenheit", a map, an FAQ, the footer.
- The same "Warum" block and the same client strip repeat on 17 of 58 crawled pages. The look on every page type rendered
  is the same template, small uppercase kickers with a short rule before them ("— RATGEBER · WEIHNACHTSFEIER", "— TERMIN"),
  cards with a hard white offset shadow, lime icon squares, headlines ending in a full stop ("Catering in Mainz."). These
  are exactly the AI site tells listed in RULES section 5. Kept out of the message, which only says what a visitor sees.
- On the Weihnachtsfeier page render, the "Mehr passende Catering-Themen" link box sits below the footer (the block is
  on 44 pages). A layout slip, small, not used.
- Reviews. 0 hits for Bewertung, Rezension, Sterne, Kundenstimme or a rating schema across 58 pages. Control, the same
  text search finds "Porsche" on 26 pages and the German quote mark on 10. Naboo shows 5.0 from 13 reviews. Not in the
  message, kept for the sketch.

### Current goal, from linked clues (opener-template 3A)

1. Weihnachtsfeier page titled "Weihnachtsfeier Catering Frankfurt 2026 für Firmen", in the main menu, first occasion tile
   on the home, its own enquiry link /kontakt/?anlass=weihnachtsfeier.
2. Eight Christmas photos uploaded in October 2026 (uploads/2026/10/ firmen-weihnachtsfeier-innenhof-catering,
   weihnachtsmarkt-stand-firmengelaende-abend, burger-station-weihnachtsfeier-pavillon and five more), sitemap lastmod
   20 Oct 2026.
3. A checklist guide "Firmen-Weihnachtsfeier planen", "Du planst die Weihnachtsfeier für dein Team".
4. Industry, companies plan Christmas parties around the 110 euro per head tax line, up to two events a year (IHK
   München), and VDI nachrichten ran "Weihnachtsfeier: Das unheilige Steuerrisiko für Betriebe" on 26 Oct 2026.
Graded HIGH, four agreeing clues, the newest dated October 2026. Never named in the message.

### When the site was built (RULES 0F, just built)

- RDAP https://rdap.verisign.com/com/v1/domain/tastefrankfurt.com , registered 2024-11-01, last changed 2026-05-30,
  IONOS name servers.
- crt.sh https://crt.sh/?q=tastefrankfurt.com , Let's Encrypt certificates from 2024-11-01 every two months, then a
  Sectigo wildcard certificate dated 2026-05-30, the same day as the domain change, the usual sign of a move to new
  hosting.
- Sitemap image links, 484 in 2026/05, 2 in 2026/06, 6 in 2026/07, 7 in 2026/10, none older. WordPress files uploads
  by month, so this install started in May 2026.
- Footer "© 2026 Taste Frankfurt · Alle Rechte vorbehalten · Erstellt mit ♥ von WOLQE", no link. wolqe.de over http is a
  holding page, "Wir sind bald für Sie da! Hohe Straße 1 44139 Dortmund info@wolqe.de", wolqe.com a STRATO parking
  page. Nothing ties WOLQE to Erik.
- Wayback Machine refused us (connection reset, control also failed, WebFetch blocked), written down as walled.

## Social (RULES 4A rule 13, D)

- tools/social-audit.js on the two accounts linked in their own footer HTML. Instagram
  https://www.instagram.com/tastefrankfurtcatering , 92 followers, 7 posts, newest 2026-05-05 (174 days, dormant by
  the 90 day rule), read through the public embed. A plain curl of the embed returns a script shell, so that's one
  reading only. LinkedIn https://www.linkedin.com/company/tastefrankfurt , 133 followers, "Taste Frankfurt Catering –
  Dein Event, dein Geschmac[k]", Langen.
- Every page footer says "Folge uns. Hinter den Kulissen, Live-Events & Catering-Inspiration auf unseren Kanälen."
  Runner up angle, kept out (one thread, Raka's call is the website).

## GDPR sweep (never the angle, RULES 0E)

- tools/eu-view.py from Stockholm, 0 cookies, 6 third party requests to fonts.googleapis.com and fonts.gstatic.com
  before any click. Remote Google Fonts is a known German complaint, a small fix. Banner with Alle ablehnen present.
  GA4 G-RJ3K5BMNC2 in the HTML, Google Ads named in the banner but no AW id in the HTML, the Ads Transparency Center
  sent us to a Google sorry page, so no ads claim.

## News and outside sources

- tools/news.py de, 26 Oct. "Taste Frankfurt" 0, "Erik Schmidt-Lange" 0, "Freddi On Tour" 0, "Frederik Schreier" 0,
  control Volkswagen 98 on both runs.
- Regional, "Nach dem Hessentag ist vor der Weihnachtsfeier" (Osthessen News 21 Jun 2026), "NGG droht mit massiven
  Streiks in der hessischen Gastronomie" (Frankfurter Rundschau 5 May 2026).
- Industry, Destatis via tageskarte 20 Oct 2026, gastronomy sales August 2026 down 5.4% real on a year, 2.4% up nominal
  (https://www.tageskarte.io/zahlen/detail/gastgewerbe-verzeichnet-im-august-real-42-prozent-weniger-umsatz-als-im-vorjahr.html
  opened). 7% VAT on food from 1 Jan 2026 (Haufe 21 Jan 2026, headline only). VDI nachrichten 26 Oct 2026 on the
  Christmas party tax risk (headline only), the 110 euro line opened at IHK München.
- Competitors, we celebrate (Foodprnt GmbH), Frankfurt, 14 food trucks, about 100 staff (tageskarte, InStaff, search
  summaries, not opened at their own site). FLOW THE KITCHEN, from about 35 € per head (Bridebook, search summary).
- Naboo https://www.naboo.app/en-us/explorer/houses/taste-frankfurt , a company event marketplace, "mobile catering
  service for corporate events", 5 of 5 from 13 reviews, "from 108 EUR per person" (their listing price, not used).
- Owner LinkedIn, six routes. 1 fetch-walled.py and curl on /in/erik-schmidt-lange-389875267, 999 and authwall. 2 web
  search "Taste Frankfurt" Erik Schmidt-Lange Frederik Schreier, only Naboo. 3 web search linkedin.com/posts tastefrankfurt,
  nothing. 4 InStaff, above. 5 company page through social-audit.js, 133 followers. 6 Instagram, above, and his page on
  their site.

## Pain table

| # | Pain | Proof | Cost to them | Would he name it | Incumbent | Verdict |
|---|---|---|---|---|---|---|
| 1 | Homepage hides the company proof (Porsche, Städel Night only in a slow strip ~4 phone screens down) and sells on promises any caterer makes, in a template look across all pages | phone render and measurement, raw HTML, 17 of 58 pages | a company booking is 1,800 € net at least, Christmas is being pushed now | maybe, he may like the site, it's five months old | WOLQE edits the site, they'd do the small moves, not a new look and story | CHOSEN, Raka's call, flagged as just built |
| 2 | Instagram promised on every page, 7 posts, 92 followers, silent since 5 May | social-audit.js, footer text | a live cooking show with no feed, planners who check them see nothing recent | likely yes | none seen | runner up, a channel run for months is €2,500+ |
| 3 | Two founders answer every enquiry within 24 h incl. weekends and write each offer with a cost breakdown | Kontakt, Catering-Preise FAQ | founder hours in peak season | can't see inside | none seen | not chosen, "Persönliche Beratung statt Preisrechner" says personal advice is the model |
| 4 | Prices page not in the menu, 0 links from the home | homepage HTML, nav | small | yes | WOLQE | folded in as proof, a 50 bucks fix alone |
| 5 | No review or customer quote on 58 pages while Naboo shows 5.0 from 13 | text search with control | trust for a company planner | maybe | WOLQE | folded into the sketch |
| 6 | "Mehr passende Catering-Themen" renders below the footer | Weihnachtsfeier render | small | n/a | WOLQE | dropped |
| 7 | Remote Google Fonts before consent | eu-view.py | tiny | n/a | n/a | GDPR, never the angle |

## Owner's likely no (RULES 0F)

"Wir haben die Seite erst im Mai machen lassen", we only had the site built in May. Trap, just built, confirmed. Second
likeliest, "we made the client strip bigger on purpose" (the CSS comment). The message says only what a visitor sees on a
phone and never calls the site old, new or generic, and the offer is a site that opens on their company events.
