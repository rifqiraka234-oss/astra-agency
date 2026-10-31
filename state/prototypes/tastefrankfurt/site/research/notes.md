# Research notes, Taste Frankfurt prototype (29 Oct 2026)

Everything below was opened or rendered on 29 Oct 2026 in Chrome (playwright-core with the installed Chrome, real
browser TLS). Screenshots and raw fingerprints are in the build workspace (`_research/` and `_tools/research/`), not in
this folder.

## 1. Their site, reopened

- **All 57 pages** of https://tastefrankfurt.com/page-sitemap.xml fetched, 57 of 57 at 200, lastmod 20 Oct 2026 on all.
- **offer.json reopened against those pages** (`_tools/verify-offer.js`). 151 string values checked, 126 found word for
  word on a page of theirs. Of the other 25, the form field names (`Anzahl_Gaeste`, `Ausgewaehlte_Speisen`,
  `Ausgewaehlte_Menues`) were confirmed in the raw HTML of /kontakt/, the FAQ lines were confirmed on /weihnachtsfeier/
  (split across tags or entities), the price page items are their label plus their text joined, and the rest are our
  own notes. The price page has 40 €, 45 €, 60 €, 90 €, 65 €, 1.800 €, 95, 180, 220, "24 Stunden", "Richtwerte" and 2026.
- **Their form** at /kontakt/ posts to api.web3forms.com with `Name`, `email`, `Telefon`, `Wunschdatum`, `Uhrzeit`,
  `Anzahl_Gaeste`, `Ausgewaehlte_Menues`, `Ausgewaehlte_Speisen`, `Anfragequelle`, `Nachricht`, `Datenschutz`. There is
  no menu select, "Hast du ein Menü im Auge?" writes into `Ausgewaehlte_Menues`. Consent label "Ich habe die
  Datenschutzerklärung zur Kenntnis genommen."
- **Their home, measured today.** At 390 by 844 the page is 7,518 px (8.9 screens), "Porsche Sommerfest" and "Städel
  Night" first show at y 3,552, **4.21 screens down**, inside `.tf-kunden__track`, computed animation
  "61.9s linear infinite tfkunden-scroll" (the stylesheet says 600s, a script shortens it). At 1440 by 900, y 2,315,
  2.57 screens down. Faces drawn Manrope and Syne. Phone h1 "Live-Cooking & Catering in Frankfurt", desktop h1 "Mobiles
  Live-Cooking & Catering: Wir machen dein Event in Hessen zum Highlight".
- **The same three reasons.** "Maximale Flexibilität" and "Mit Herz" are on 17 of 57 pages, each of the 17 with the
  client strip too.
- **The price page.** /catering-preise/ is linked from 41 of the 57 pages but **0 times from the home**, and is not in
  the menu (menu items Services, Events, Menüs, Essen & Trinken, Über uns, Kontakt).
- **Konzept-Finder clicked through** (Firmenfeier / Weihnachtsfeier, 50 - 100 Gäste, American, Beides oder mit
  Wetter-Backup, Ja nur Sekt Wein und Softdrinks). Result "Live-Cooking mit mobilen Theken, 1-2 Live-Cooking-Stationen,
  Bar plus Sekt, Wein und Softdrinks, Wir empfehlen Persönliche Beratung für die Details, Jetzt unverbindlich anfragen."
- **Lead time mismatch** confirmed. "4-6 Wochen" on home, /catering-buchen-vorlaufzeit/, /catering-frankfurt-guide-2026/,
  /firmenfeier-catering-frankfurt/ and a guide. "3-4 Wochen" on /weihnachtsfeier/ and 20 other pages. Christmas uses 3-4.
- **Both films watched.** F1 (sommerfest, 15 s) is 1920x1080 HDR, HLG BT.2020 10 bit, needs tone mapping before it can
  ship under 3 MB. F2 (rooftop, 8.5 s) is SDR BT.709, recompressed to 1.28 MB H.264 and 0.92 MB VP9 at 1600 px.

## 2. The AI default (brief 18A step 1)

14 targeted, **12 rendered**, 2 failed (Squarespace "Fiesta" demo shows "Website Expired", the Hugging Face page reset
the connection). Lovable, v0 and Bolt gave no findable caterer sites in six searches, so the plain chat model default
is our own, written in this session in one shot from "a website for a live cooking event caterer in Frankfurt" with no
brief (`_research/ai-default/claude-plain/`).

| Site | URL | check-build look detector |
|---|---|---|
| Framer, Cateringg Co. | https://cateringg-co-wbs.framer.website/ | Inter Display, pill button, 18 pill chips, hero 26% |
| Framer, The Platter | https://jubilant-month-689004.framer.app/ | Playfair, Nunito, Inter |
| Framer, CateredPlate | https://cateredplate.framer.website/ | Inter, hero 20% |
| Framer, Catered | https://catered-template.framer.website/ | Open Sans, 10 italic headline halves, pill |
| Framer, Kaiseki | https://kaiseki.framer.website/ | serif, hero 32% on a phone |
| Framer, Eventin | https://eventin.framer.website/ | Inter Display, chips, hero 16% |
| Wix, Catering Service (Dynamic) | https://www.wix.com/demone2/flavor-fusion | EB Garamond, 3 pills |
| Wix, Event Caterer (Festive) | https://www.wix.com/sgtemplates/culinaryiasymphony | Raleway, 3 pills |
| Wix, Event Caterer (Cheerful) | https://www.wix.com/sgtemplates/festive-flavors | Poppins, 2 pills, hero 0% on a phone |
| Wix, Catering Company (Professional) | https://www.wix.com/sgtemplates/culinary-canvas | Fahkwang serif, hero 27% |
| Webflow, Lord Burger | https://lord-burger-template.webflow.io/ | Nunito, 2 pills |
| Plain chat model, no brief | local | Playfair and Inter, italic half, 5 kickers, 4 pill buttons with arrows, 6 soft shadow cards, hero 0% |

**The pattern list.** Banned faces in 6 of 12 (Inter or Inter Display in 4, Playfair 2, Nunito 2, Open Sans, Raleway,
Poppins). Pill buttons in 8 of 12. A serif display headline in 6 of 12, an italic half in 2. Cream or off white pages in
11 of 12. A centred headline with two buttons ("Get a Quote", "View Menu", "Explore Menu") in 9 of 12. A first screen
under 35% picture in 8 of 12. Copy "Exceptional catering for any occasion", "Indulge in unique flavors", "Savor every
bite", "Unforgettable events, cooked live". The plain model adds a "500+ events" count up, emoji icon cards, a
testimonial with an invented name and a strip of invented client logos. Their own site shares most of this grammar
(kickers, black and lime, icon squares, offset shadow cards, a moving client strip), which the card never says to them.

## 3. Beyond the top 50 (brief 18A steps 2 to 4)

50 targeted, **47 rendered at 1440 and 390**, 3 failed. Locomotive stayed behind a Cloudflare "One moment, please" wall
after a long retry in real Chrome. Igloo Inc and Messenger by Abeto rendered blank in headless Chrome (WebGL only). Of the
47, **36 are award level** (Awwwards SOTD, HM, nominee, SOTY, and the studios). Fingerprints counted at runtime while
scrolling (`_tools/research/fingerprint.js`): WebGL canvases on 21, video on 25, sticky or pinned scenes on 19, clip-path
masks on 30, blend modes on 11. ScrollTrigger on 27, GSAP on 26, Lenis on 22, three.js on 16, a split text library on 13.

| Site | Award, studio | The move worth taking |
|---|---|---|
| Tengile MalaMala, tengilemalamala.com | SOTD 3 Oct 2026, DashDigital | Full bleed warm photo, very few words, the place is the hero |
| White Desert, white-desert.com | SOTD 11 Sep 2026, Malvah | One giant word over film, "Watch Film" as the only action |
| Santioni Spirits, santionispirits.com | SOTD Oct 2026, Active Theory | The first screen is a question you answer (legal age), the answer opens the world |
| Vander Hotel, vanderhotel.com | HM 29 Aug 2026, .RAW | Photo inside a window frame, the building's own shape |
| Kube Saint Tropez | HM 27 Aug 2026, Digidop | One object, real light on it, big quiet type below |
| Villa Aurelia, hotelaurelia.online | HM 25 Sep 2026, MadeByCat | A set table at dusk, the warm lamp as the light |
| Velaa Private Island | HM 25 Sep 2026, STRV | Shadow of people instead of people |
| Tandjung Sari | HM 5 Aug 2026, Fleava | Wooden architecture framing the photo, warm interior light |
| Faith Ibiza | HM 1 Sep 2026, Yellowball | **A photo masked into the arch of their building**, taken for our pavilion window and the roof handover |
| Délice, delice.ca | HM 24 Sep 2026, Monument | Cut out food crossing the type, loud colour |
| Monarque Événements | HM 25 Aug 2026, Solstice | An event caterer, photos scattered round one centred line, "Planifier votre événement" |
| Cozy Eating Village | HM 30 Aug 2026 | Tiles of food, a game board, not for us |
| Piranha Bar, piranhabar.ie | HM 19 May 2026, Boron | A beam of light as the drawing, the bar's mark as the light |
| MUN Rooftop | HM 10 Aug 2025 | A night sky with the moon, few words, the rooftop at night |
| One Last Christmas Glow | HM 11 Dec 2025, digitalists | **One warm light in a dark winter scene**, the light is the story, measured against our bulbs |
| Take Me To Christmas 2024, Riven | SOTD 1 Jan 2025 | A Christmas card you open, clip masks (50) |
| Superlocal Design Festival 25 | SOTD 28 Dec 2025, ++hellohello | A ring of images, WebGL, masks (106) |
| Agrumea Farm | HM 1 Oct 2026, Studio K95 | Type set round a shape, the shape holds the photo |
| Distillati Group | HM 9 Sep 2026, Doy Design | Black first screen, one question, the brand name in light |
| Palmo | HM 9 Sep 2026 | Product as a 3D object over cream, not for us |
| Delta Cafés | Nominee 12 Oct 2026, Bürocratik | Full bleed landscape film, chapters of colour along the foot |
| Impasto Forno Antico | Nominee 26 Oct 2026 | Photo behind the type, blend modes, three words as the whole menu |
| Schlosshotel Kitzbühel | Nominee 2 Oct 2026, Brandnamic | The hotel in its valley full bleed, the booking in the page |
| Qissa | Nominee 7 Sep 2026 | A dark plated dish, the reservation in the page |
| Cercle Festival | HM 29 May 2024 | Dusk gradient that is real sky colour |
| Wilde Weide Festival | SOTD 15 Apr 2024 | Motion blur crowd as the hero, the feeling before the facts |
| Melbourne Food & Wine | HM 1 Feb 2024 | Editorial grid, not for us |
| Lusion, lusion.co | studio | 3D objects under real light and post processing |
| Active Theory | studio | A single object of light in the dark |
| Immersive Garden | studio | Relief and shadow, raking light reveals the form |
| Dogstudio | studio | A dark photo, the type on the light side only |
| 14islands | studio | Big quiet type, almost nothing else |
| Lando Norris | SOTY 2025 nominee | **Line drawing over the photo and mask reveals (208 clip paths)**, taken for the strokes landing on the real lines |
| Zentry | SOTD | Hard edged masks between chapters |
| Shopify Editions Winter 26 | SOTD | A painting as the world, the product inside it |
| Bruno Simon | SOTM | The whole site is a world you drive, not for us |
| Apple iPhone 18 Pro | top brand | Dark first screen, the object lit, sticky scenes |
| Nike | top brand | One photo, one line, one button |
| Oatly | top brand | Their own voice in huge type |
| Aman | top hospitality | Top down photo, almost no words, "Reserve" |
| Nobu Hospitality | top hospitality | The room's own light carries the photo |
| Hawksmoor | top restaurant group | A dark warm dessert photo, a table booking in the hero |
| Dishoom | top restaurant group | Dark, one quote in the middle of the screen |
| Noma | top restaurant | The building as the photo, the season in the line |
| Tomorrowland | top event brand | The stage at night, lights as the image |
| Moët & Chandon | top drinks brand | Age gate, not for us |
| Aesop | top brand | A festive gift chapter in a dark photo, quiet type |

**What the build takes, and from where.** Light as the thing that reveals the photo (One Last Christmas Glow, Lusion,
Immersive Garden). Strokes drawn onto the real lines of the photo (Lando Norris). A photo masked in the place's own
architecture (Faith Ibiza, Vander Hotel), here their pavilion. The first screen as a question you answer (Santioni,
Saavedra). Few words, the place as the hero, the action in the page (Tengile, Schlosshotel, Hawksmoor). Each chapter a
different medium (canvas light, a reel of photos with a shaped handover, a picker with a drawn plan, film, a drag number,
chalk, a graph you move).

## 4. Type, premium sites in their field (brief 18B step 2)

13 targeted, **8 rendered**. Kofler & Kompanie (koflerkompanie.com no longer resolves), Rhubarb (timed out), Bubble Food
(certificate error) failed. Lettice (lettice.co.uk is a parked GoDaddy domain) and Mustard (a lander page) are not their
sites. Faces read from the fonts each page actually loaded and drew (CSS.getPlatformFontsForNode).

| Site | Faces |
|---|---|
| Searcys, searcys.co.uk | FF Bau Pro, everything |
| Ottolenghi, ottolenghi.co.uk | Riforma, everything |
| 25hours Hotels, 25hours-hotels.com | Trade Gothic LT Std Condensed, everything |
| Soho House, sohohouse.com | HK Grotesk, Cardo for headlines |
| Ace Hotel, acehotel.com | Bianco Sans, Tiempos Headline, Toronto Gothic |
| Social Pantry, socialpantry.co.uk | Futura PT, EB Garamond |
| Käfer, feinkost-kaefer.de | Optima nova, Proza Libre, Open Sans |
| Create Food, createfood.co.uk | Alegreya Sans |

The houses that read as expensive set one grotesk, a condensed one for the loud lines (25hours), sometimes a serif voice
(Soho House, Ace). The most exclusive draw classical letters (Käfer's Optima nova, Ace's Tiempos, Soho House's Cardo).
Taste Frankfurt don't use a serif voice and a serif headline is the AI default's tell, so the first pair was Mona Sans and
Fragment Mono. On 30 Oct Raka asked for a more exclusive face. Five OFL faces were tried on the real hero and cases screen
(`_research/type/trials/`), Commissioner with FLAR 100 (Optima's flare), Ysabeau, Alegreya Sans, Proza Libre and Sofia
Sans with Sofia Sans Extra Condensed. **Ysabeau** (Christian Thalmann, Catharsis Fonts, a sans on Garamond's skeleton,
variable 1 to 1000) read most like a hotel bar and least like any site in the field or the AI default. Headlines at 480,
light tracking, lining figures switched on (its default figures are old style). **Fragment Mono** stays for the proof
line, figures, times and labels. Both SIL OFL 1.1, licences in `fonts/`. The chalk board alone uses **Caveat** (SIL OFL
1.1, served as "Tafel").

## 5. The rivals (brief 18B step 4), never named on the site

| Rival | URL | What it shows today |
|---|---|---|
| we celebrate (Foodprnt GmbH) | https://www.we-celebrate.de/ (wecelebrate.de is a domain for sale) | "Let us catertain you! Wir sind das Foodtruck-Catering", Open Sans, "großartig und ganz sicher unvergesslich" |
| FLOW THE KITCHEN | https://flow-thekitchen.de/ | "Wir inszenieren kulinarische Erlebnisse" in IvyPresto italic, a split photo |
| Sander smart catering | https://www.sander-smart-catering.com/ | "SMART CATERING" in a bold condensed, a chef photo, Geist |
| Food affairs | https://www.food-affairs.de/ | A golden field photo, Inter |

None of them opens on whose company events they've cooked, none shows their stand at your place, none builds the enquiry.

## 6. Media (brief 18B step 5)

- **Their photos and films** are on their own site and theirs to use on their own site (media.json, 104 images and 2
  films, all downloaded 29 Oct at 200).
- **Dropped after zooming.** 100 (a fritz-kola tray and bottles on the counter), 040 Bosch (their older diamond mark on
  both counters, Bosch stays as text), 034 and 086 (the older mark on the counter), 005 (another building's lettering,
  an apron mark), 064 (a third party booth sign), 091 (a mirrored venue sign no crop of the window loses, Sommerfest
  uses 062 instead).
- **Licence checked stock**, every licence read on its own item page by a separate pass, all Pexels License or Mixkit
  Free, no faces, brands or text, none used on the first look yet. String lights (Pexels 6922855), steam over a cup
  (Mixkit 43935), patties on a flat top (Pexels 37296038), snow and lanterns (Pexels 35769381), embers (Pexels 7571829),
  a filament warming (Pexels 5647317), a dark red pour (Pexels 19826636), photos of steam (Pexels 40175046), warm bokeh
  (Pexels 5804715) and frost (Pexels 14786326). About 20 Mixkit items were "Restricted" and rejected, Pexels 853772 is
  CC0 not the Pexels License and was rejected. Details and files in `_downloads/stock/LICENCES.md`.

## 7. The bar, rendered today

https://astra-saavedra-prototype.netlify.app/entreprises/ , https://astra-saavedra-plan.netlify.app/ ,
https://astra-bwild-prototype.netlify.app/ , https://astra-faeclub-prototype.netlify.app/ ,
https://astra-hertling-prototype.netlify.app/ , https://astra-charlies-prototype.netlify.app/ , all 200 at 1440 and 390.
