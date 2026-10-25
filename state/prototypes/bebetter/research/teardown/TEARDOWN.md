# Design and offer teardown for BeBetter (gym streetwear line plus custom kit for gyms)

Run on 25 Oct 2026. Read only. Nothing was sent, submitted, added to a cart, uploaded or committed.

Every site was rendered with `teardown.js` (copied from the Saavedra pass and adapted). Chromium 1194 through the egress proxy, SPKI pinned, 1440x900, five desktop frames down the page plus one 390px mobile frame, English locale by default and Dutch or German for the NL, BE and DE makers. Dutch and German consent buttons were added to the clicker, consent is retried before every frame, and the apparel facts (drop, countdown, sold out, waitlist, community, custom, minimum order, lead time, prices, volume tiers, fabric words, model size notes, reviews) are read off the page text with the matched snippet kept. First screen facts (video in view, h1, buttons) are read before any scroll.

Files. `sites.txt` (the queue), `fingerprints.jsonl` (one row per URL, the single source, built by `enrich.py` from the pass files), `shots/` (`<slug>__0..4.jpg` desktop, `<slug>__m.jpg` mobile, `config_<tag>_<n>.jpg` for the configurators), `sheets/` (one review sheet per site), `contact_sheet_heroes.jpg` (frame 0 of all 53 rendered pages), `text/` and `html/` (the rendered text and HTML of every page, so each fact can be reopened), `subpages.jsonl` (18 maker subpages), `configflows.jsonl` (7 click-throughs by `configflow.js`), `visual_tags.json` (my frame judgements), `counts.py` and `counts.txt`.

**Labels.** [V] verified, seen in a frame or present in the rendered page text or HTML fetched on 25 Oct 2026. [I] inferred, from a search result or my own reading, not confirmed on the page.

**Every count below was recomputed from `fingerprints.jsonl` by `counts.py`, output in `counts.txt`.**

---

## 0. Counts

| | n |
|---|---|
| Rows in `fingerprints.jsonl` | 62 (1 client, 21 gym, 14 street, 19 custom, 7 motion), of which 3 are dead URLs replaced by the brand's real one |
| Brands queued (rows less the 3 replaced) | 59 |
| **Rendered, page reached and read** | **53** (52 not counting BeBetter's own page). 18 gym, 14 street, 13 custom, 7 motion, 1 client |
| **Walled, not described anywhere in this file** | **4**. Jugador Teamwear (jugadorteamwear.nl, 400 Bad Request), Helloprint sportswear (helloprint.com, "Just a moment..."), Spreadshirt NL (spreadshirt.nl, 403), O'Neills (oneills.com, "Just a moment...") |
| Unreached through our proxy, a failure on our side, not described | 2. Gym Coffee (ERR_TUNNEL_CONNECTION_FAILED twice), Kukri (ERR_CONNECTION_RESET twice) |
| Replaced URLs | vanquishfitness.com and echtapparel.com are HugeDomains sale pages [V]; the real stores vqfit.com and echt.com.au were found by search [I] and confirmed by their render titles [V]. servicesport.com/services/instyle-clothing/ answered 404 [V]; its own nav links /services/custom-gym-clothing-instyle-clothing/ [V] |

No wall was bypassed. No curl_cffi, no TLS impersonation, no `fetch-walled.py`, no stealth plugin. A wall says we could not look and nothing about the site. One maker subpage was also walled (teamshirts FAQ, faq.teamshirts.net, "Nur einen Moment…").

**Rendered but frames not fully read** (they still count as rendered, their DOM and text facts are used).
- Obscured on every frame, excluded from visual counts. Represent home (a "SECURE BLACK FRIDAY ACCESS" sign-up modal in three passes), Ader Error (a "Now shipping worldwide" region modal), Printful DE (cookie dialog, its text is used).
- Our render failed. Aimé Leon Dore desktop frames are blank white with a mute icon (the video hero did not paint in this Chromium; the mobile frame shows an Olympiacos collab photo), and The Tie-break never got past a navy loader with a small error face in two passes, the second with software WebGL.
- Intro only. Miu Miu's bag campaign stayed on its spaced type loader, The Immortals ran its year counter (1958 to 2026), Lacoste Ace Breaker reached its title and PLAY button. The game and film behind them were not entered.
- One screen or inner scroller (document height 900, frames repeat the first screen). BeBetter, Darc Sport and Raw Gear (all three are password pages), Ryderwear, Pursue, Echt, Stüssy, La Dolfina, KidSuper, Shirtee.
- Partly covered. YoungLA frames 3 and 4 (15% modal), Alphalete (a search drawer stayed open, content legible under it), Oner Active (product skeletons unloaded in frames 1 to 2, modal in 3 to 4), Daily Paper (frame 0 washed out in pass 3; pass 1 frames are in `shots_pass1/`), Stanno (a dim overlay, content legible), Kitlocker frames 1 to 4 (a "Unlock 10% Off!" modal).

**Award labels for the motion group** were read from the Awwwards fashion and sports category listings through a summarising fetcher on 25 Oct, so they are [I]. Lacoste Ace Breaker, Developer Award and Site of the Day, 3 Aug 2026. The Tie-break (merci-michel), Developer Award and Site of the Day, 25 Sep 2026. Miu Miu "A House that we shaped", Developer Award and Site of the Day, 25 Aug 2026. Nick Ho (nickho-motorsports.nl, a Dutch racing driver), Developer Award and Site of the Day, 11 Oct 2026. La Dolfina Jumping, Honorable Mention, 20 Sep 2026. The Immortals, Honorable Mention, 3 Aug 2026. KidSuper, Awwwards Site of the Day and FWA per basement.studio's case study (2024) [I].

**BeBetter's own page today** [V frames, text]. A Shopify password page. A large serif "BeBetter®" wordmark on white, "New collection live on 27-10", an orange strip across the top, "NEW COLLECTION LIVE IN … 02 Days 04 Hrs 53 Mins 51 Secs", "Earn early access by joining our Instagram community", and a black "Click here to join" button.

---

## 1. What the best gym and streetwear sites do to make a visitor feel the brand

**People, almost always, and the clothes on bodies.** Real people are in the frames of 37 of the 44 non-client sites whose frames were read [V counts.txt section 2]. The best ones crop for attitude, not for catalogue. Fear of God sets black and white street portraits full bleed with "FEAR OF GOD FALL 2026" in a thin serif across the photo (frames 0 to 3). Arte Antwerp opens on a grainy black and white close crop of two faces, then two people on a patterned sofa (frames 0 to 1). Kith uses its own Vancouver flagship as the hero, then "Kith Fall 2026" and "Kith Ivy Fall 2026" editorials in rooms (frames 0, 2, 4). Cole Buxton cuts between a full bleed sneaker lacing shot, a studio model, and tight details of a jeans pocket and a cap (frames 0 to 3).

**The back of the garment, rarely.** Only 6 of 44 show a garment from the back so the back print reads [V]. Vanquish is the one that matters for BeBetter. Its hero is three men from behind in oversized tees with big back prints, "OUTLET SALE", and its new-in cards show "Fire Skull Black Oversized T Shirt" and "Bodybuilding Black Oversized T Shirt" from the back (vqfit_com frames 0 to 2). Gymshark (lockers frame of hoodies), Alphalete (the lockers photo with arched "ALPHALETE" back prints, frame 2), Pursue, Cole Buxton (logo on a tee back, frame 4) and Spized (the custom jersey hero) are the rest. No site in the set lets the visitor turn the garment.

**Film in the first screen.** A video sits in the first screen on 6 of 18 gym sites (YoungLA, Gymshark, Alphalete, Built For Athletes, AYBL, Echt) and 5 of 14 street sites (Aimé Leon Dore, Fear of God, Kith, Daily Paper, Patta) [V DOM, counts.txt section 3]. It is always ambient footage behind a headline. None uses film to show the product being made.

**Type.** The streetwear sites keep type small and let photos carry, then go huge once. Olaf Hussein sets a giant "OLAF" wordmark bottom left over the hero photo and a "NEW ARRIVAL" headline at full width (frames 0, 2). Patta ends on "EACH ONE TEACH ONE" at full width in black (frames 3 to 4). Fear of God sets "CLARKSON" across the full frame in a hairline serif (frame 1). Nick Ho puts a giant car number "98" beside a black and white portrait, with three small stats (98 car number, 17 career podiums, 14 circuits raced) and "GALLERY" as giant outline type with photos fanned on an arc (frames 0, 4). Poster type appears on 14 of 44 [V]. H1 faces across the set are all different, the only repeats are Helvetica, Montserrat and Poppins twice each among gym sites [V counts.txt].

**Colour.** Black grounds dominate 7 of 44 (Darc Sport, Raw Gear, Built For Athletes, Pursue, Corteiz, Nick Ho, La Dolfina) [V]. Most street sites are white or warm grey with colour coming from the photos. Pursue gives its black page one orange light streak through the photo (frames 0 to 4). Corteiz is a dense product grid on pure black with a yellow monospace nav (frames 0 to 4).

**Product presentation.** Gym sites sell from grids with size chips, swatches, star counts and badges. YoungLA badges every card "RESTOCKED" or "SOLD OUT" with review counts like "(1,166)" (frames 1 to 2). Buffbunny puts size chips 2XS to 3XL under every card (frames 1 to 3). Vanquish puts a size dropdown and "ADD TO CART" on the card itself (frames 3 to 4). Fabric weight or wash words (heavyweight, oversized, stone wash) appear in the text of only 5 gym and 2 street sites [V], so the material story is barely told.

**Drops and countdowns.** This is where gym brands are loudest. Two gym brands were themselves locked behind drop pages on the day, Darc Sport ("DARC SUNDAY SALE / LAUNCHING SOON / WHEN THE COUNTDOWN EXPIRES REFRESH THIS PAGE TO GAIN ACCESS TO THE SITE.") and Raw Gear ("The next chapter is here. Join the waitlist.") [V frames]. Running timers were seen on Ryderwear ("SALE ENDS IN 05 46 44"), TLF ("Ends in 81d : 17h : 47m : 28s" on a buy two get one bar) and Oner Active ("STORIES OF STRENGTH LAUNCHES IN 01:22:45:19" in the top bar, and a "FLIP THE SCRIPT / Stories of Strength capsule" band with a 01 22 45 16 D H M S timer, an email field and "BUILD WISHLIST") [V frames 0 to 1]. YoungLA's hero is a restock date, "YOUR FAVORITE PRODUCTS ARE BACK / OCTOBER 28TH" with a PREVIEW button [V frame 0]. Words like drop appear on 10 of 18 gym sites [V]. Every countdown in the set is a sale or a launch. None counts down to something the visitor made.

**Community.** It shows as named people and their photos, not as a word. Alphalete runs "BECOME MORE: COMMUNITY SERIES OPEN CALL", choosing four members of its community to be filmed in 2027 (frame 4, text) and a strip of member photos tagged @handles with "SHOP THE LOOK" (frame 2). AYBL has "THE ATHLETE EDIT" with @ANOUKIFIT, @CKISSELC and others (frame 4, text). Olaf Hussein has "OUR LIFE AS FRIENDS" with named portraits of Calvin Stengs, Tays, Yuri Leal and Chelo, each with two lines on who they are (frame 3, text). Patta's "JOIN THE COMMUNITY / Let's connect" is a strip of community photos bent on a curve that the visitor can "CLICK & DRAG" (frames 1 to 3, text). Daily Paper sells a "UNITE MEMBERSHIP" from its nav (text). Collabs are the other community signal, "New in: Gymshark x Sam Sulek" (frame 1), "Julia Nene x BUFFBUNNY COLLECTION" (frame 0), "Patta x Carhartt" coming soon (frame 0).

**The award sites.** What they share is one idea held for the whole visit. Nick Ho's site is built around his number and his calendar, a race list with a top view of the car beside it (frame 3) and a partner wall around one helmet with "BECOME PARTNER" (frame 1). La Dolfina opens on a slow film of the estate road with the LD sign and one line in spaced serif capitals (frames 2 to 4). Lacoste turns the brand into a tennis game with a single PLAY button (frames 3 to 4). The Immortals' first screen is a year counter running from 1958 to 2026, "The story continues". Miu Miu sets "A HOUSE THAT WE SHAPED" as a type grid and asks for sound before it starts.

---

## 2. What the custom kit and teamwear sites do (all read 25 Oct 2026)

### Configurators, step by step

- **owayo** (DE maker, Dutch site). The 3D configurator (owayo.nl/konfigurator_html/…) shows the garment large on the left with zoom and rotate, and four tabs on the right, "Ontwerp, Kleuren, Tekst, Logo", a grid of named base designs, and "RDY Ontwerpvoorstellen" (ready-made proposals). Under it "Opslaan, Mijn ontwerpen, Exemplaren, Design-check, Ontwerp delen", then "Prijs en levertijd" and "Plaats in winkelwagen" [V config_owayo_konfig_0.jpg, configflows.jsonl]. The homepage pitches "Eenvoudig ontwerpen, direct in 3D" with a photo of a hand on a tablet running it, and says owayo made custom products "voor meer dan 25.000 bedrijven" in 20 years beside a wall of client logos [V owayo_nl frames 2 to 3, text].
- **Spized** (DE, Dutch site). "In 4 stappen naar je eigen fitnesskleding" on its fitness shirt page, start from a template or from zero, "Je team betrekken, ontwerp meerdere versies en deel de link met anderen" [V subpage text]. In the configurator, the price sits beside the shirt from the first second, "Stukprijs voor 10 st.: € 41,90, 28 % Staffelkorting", with "Verwachte leverdatum afhankelijk van het gekozen product, de hoeveelheid en het ontwerp" and "Ontwerpcontrole, onze grafisch ontwerpers controleren elk ontwerp" [V configflows.jsonl, spized.com/nl/configurator…]. Its order page lists eight steps from choosing the sport to tracking, with a design check by their graphics team before production and production starting after payment [V spized.com/nl/bestelproces-levertijd].
- **TeamShirts** (DE, Spread Group [I]). The wizard (wizard.teamshirts.de/de/DE/generic) has three numbered steps "1 GESTALTEN, 2 TEAM FEATURES, 3 PREIS", a left tool rail "Produkt, Hochladen, Galerie, Text hinzufügen, Namen & Nummern, Zoom", a print or embroidery toggle "Druck / Stickerei", and front, back and inner label views of a black tee [V config_teamshirts_wizard_0.jpg]. Pressing Weiter without designing gives "Fast fertig! Wähle Deinen nächsten Schritt aus" with three paths, "Preis berechnen", "Team befragen, frag Dein Team nach ihren gewünschten Größen, Namen und Nummern", and "Abstimmen lassen, lass Dein Team über Deine Entwürfe abstimmen" [V configflows.jsonl text]. The homepage offers a free team shop with "Stammrabatt ab 20%" [V frame 3] and shows Trustpilot "4,5/5 basierend auf 17.957 Bewertungen" [V text].
- **Kitlocker** (UK). "Customise Your Kit" opens on shirts on a rail with "ADD YOUR SPONSOR" printed on them, a lime bar "Need to create a logo? Create Logo Here" (a logo generator), and four steps, "Product Selection, Start Customising, Share (share your designs with teammates), Checkout" [V config_kitlocker_customise_0.jpg, subpage text].
- **Shirtee** (DE). A flat designer with "Produkt ändern, BILD HINZUFÜGEN, TEXT HINZUFÜGEN, GRÖSSEN & MENGEN", uploads under 8 MB in JPG, JPEG, GIF, PNG, EPS or PDF, and "Preis pro Stück: 8,49 €" on the default tee [V configflows.jsonl].
- **Brikl** (US platform aimed at gyms). Its gyms page shows the store setup as steps, "1 Add your logo… 2 Pick the range", beside a "Turbo store" dialog asking "What does your company do?" and "Choose quality" with Value, Everyday and Premium [V brikl frame 2]. Nothing was started.
- **Printful DE.** A "Mengenpreis-Rechner" slider beside a product, at 25 items "4 % Rabatt", labelled on the page as an example [V text, frame 3 behind the cookie dialog].

### What the quote and contact forms ask

| Maker | Fields | Notes |
|---|---|---|
| owayo prijsopgave (owayo.nl/wielrennen/prijsopgave-nl.htm) | Five rows of Aantal, Product, Features; Voornaam and Achternaam required; firm or club, street, postcode, town, country optional | "Deze ontvang je binnen 24 uur" [V] |
| Stanno Special Design (stanno.com/nl/special-design/) | Naam, E-mailadres, Telefoonnummer, Type aanvraag, Waar kunnen we je mee helpen? | Requests run through the club's sports shop [V] |
| Stanno For Clubs (stanno.com/nl/for-clubs/) | 10 fields, including Clubnaam, Functie binnen club, Huidig teamwear-merk, Met welke sportwinkel doen jullie momenteel zaken?, preferred contact moment | "Je ontvangt binnen enkele dagen een reactie" [V] |
| Erima Vereine & Teams (erima.de/corporate/vereine-teams) | 11 fields, including Vereinsname, Sportart, Postleitzahl, Anfragegrund (Vereinsrabatt, Vereinskollektion, Ausrüstungspartnerschaft), Nachricht, Anhang | Takes an attachment [V] |
| Patrick (jointhewinningteam.patrick.eu) | Naam, Email, Telefoon, Club / Dealer | Next to a "€ 4.000 signing bonus for your club" offer on patrick.eu [V] |
| InStyle Clothing, ServiceSport's sister company (UK) | 14 visible fields (existing customer, name, email, phone, individual or company, address, message) | "Samples can be provided upon request", "from one-off garments to thousands of pieces", Personal Trainer t-shirts for multi-chain and independent gyms [V]. No prices |

### Minimums, lead times and prices as published

| Maker, URL | Minimum | Lead time | Prices |
|---|---|---|---|
| owayo, owayo.nl/t-shirt-bedrukken.htm and /hoodies-bedrukken.htm | "zonder minimum bestelhoeveelheid", from the first piece [V] | Sportswear "actueel… 2,5 weken"; printed cotton tees and sweatshirts "2-3 dagen"; express available (owayo.nl/wielrennen/levertijd-nl.htm) [V] | Excluding print cost. T-Shirt Basic €7,90 (1), €7,20 (10), €4,70 (50). T-Shirt Prime €13,90, €12,40, €8,40. Hoodie Prime €26,90, €22,90, €17,90. Hoodiesweater Classic €29,90, €26,90, €21,40 [V] |
| Spized, spized.com/nl/ontwerp-je-eigen-fitness-shirt | "Vanaf 1 stuk" (page meta) [V HTML] | Not a fixed number, "afhankelijk van het gekozen product, de hoeveelheid en het ontwerp" [V] | Price drops "bij 5 en 10 stuks", then "bij 20, 35, 50 en vanaf 100 stuks" (FAQ in page HTML) [V]. Football shirt Rio €41,90 each at 10 with 28% tier discount (configurator) [V]. Print included ("Drukkosten inbegrepen") [V] |
| Stanno Special Design, stanno.com/nl/special-design/ | Limited "v.a. 15 stuks" (shirts and shorts, existing designs, own colours and collar); Unlimited "v.a. 50 stuks" (shirts, shorts, socks, fully own design) [V] | "binnen 6-12 weken" after a sample design and one or more feedback rounds [V] | Not published |
| Stanno For Clubs | Per piece from stock [V] | Within 2 working days from Deventer [V] | Not published |
| Hidalgo (Zoetermeer), hidalgo.nl/…/sportkleding/ | Filter "Minimale bestelaantal 1–10, 25" [V] | Unprinted 1 to 3 working days, printed 3 to 14 working days; over 500 pieces fully custom via Hidalgo Global Trade in 10 to 14 weeks by sea [V] | Category "v.a. € 1,95", cards like "Vanaf € 8,62", free digital design within 15 minutes, free shipping from €350 [V] |
| Kitlocker, kitlocker.com/customise-your-kit/ | "as little as one custom product" (FAQ in HTML) [V] | "around fifteen working days", items in stock [V] | Nike Customisable Park VIII Shirt £12, New Balance Core Customisable Jersey £13, Nike Therma-FIT Park 26 jacket £85 [V] |
| Printful, printful.com/de/sportbekleidung-selbst-gestalten | "ohne Mindestbestellmenge" [V] | "durchschnittliche Lieferzeit beträgt 4 Werktage" [V] | Volume calculator, example only [V] |
| Shirtee, shirtee.com/de/t-shirts-selbst-gestalten/ | Not stated | Not stated | €8,49 per piece default tee [V] |
| Brikl, brikl.com/pricing and /branded-stores/gyms | None, members order one at a time [V] | Not stated | 3.5% per transaction, no setup fee or subscription; store build $99 (20 items or less, 2 logos) or $199; a worked example labelled illustrative, 60 shirts bought at $22 is $1,320 up front against 34 actually sold on demand for $748 [V] |
| InStyle Clothing, servicesport.com/services/custom-gym-clothing-instyle-clothing/ | "from one-off garments" [V] | Not stated | Not published |

**What this means for BeBetter's page** [I, my reading]. The market splits in two. Self-serve printers with no minimum and a price on screen (owayo, Spized, Kitlocker, Printful, Shirtee) against made-to-order kit with a design conversation, minimums of 15 or 50 and 6 to 12 weeks (Stanno Special Design, Hidalgo's 500-piece route). BeBetter's custom work sits in the second camp in craft and the first in size, so the page should show the conversation as the product and still give a number early. Spized proves a tier table can sit beside the garment from the first second. TeamShirts and Kitlocker prove gyms want the team in the loop (ask for sizes, vote on designs, share the link). Stanno proves a "sample design, feedback rounds, approve, produce" sequence can be stated plainly with a week range.

---

## 3. The common look to avoid, because it reads as a template

All seen in the frames, with counts from `counts.txt`.
- **The Shopify gym stack.** Promo bar, a stock-feeling hero with "SHOP MEN / SHOP WOMEN", a category tile row, a product grid with swatches and stars, a "TOP CATEGORIES" row, a trust icon strip, a paragraph of SEO text at the bottom and an app download. TLF, Gorilla Wear, Gymshark, Smilodox, AYBL and Ryderwear all run some version of it (frames). 16 of 18 gym sites are Shopify [V DOM].
- **Discount modals.** A signup or discount modal was seen in 11 of 44 read sites, "UNLOCK 15% OFF" (YoungLA), "NEW HERE? WANT AN EXTRA 15% OFF?" (Gymshark), "Unlock 10% Off!" (Kitlocker), "15% OFF YOUR FIRST ORDER" (Vanquish), "GET 20% OFF" (Echt) [V]. Three more pages were covered by one on every frame.
- **Sale countdowns.** Every timer in the set counts down to a discount or a sale (Ryderwear, TLF, Pursue's "BLACK FRIDAY IS COMING… UP TO 80% OFF") [V]. A timer now reads as a sale.
- **Teamwear catalogue grammar.** Rounded product cards on light grey, a checklist of "Why choose us" tiles with icons (Masita frames 3 to 4), a stock or graphic banner (Masita's lightning bolts, Shirtee's two gradient panels), and a cookie bar along the bottom. 6 of 12 read custom sites are card layouts [V]. Brikl is the clearest SaaS version, a pale blue gradient, pill buttons, "Sound familiar?" pain cards and an FAQ accordion (frames 0 to 4).
- **Slogan heroes.** "SHOW UP STRONGER", "FIND YOUR FURTHER", "WHERE PASSION MEETS PERFORMANCE", "Your Season, Your Staples" [V frames]. Each would read the same on any other brand's site.
- **Model crops with no head.** Represent 247 and TLF crop models at the neck in grids [V frames]. Fine for a catalogue, cold for a brand of two people.

---

## 4. Ideas for BeBetter's custom kit page and home page that nobody in the set does

Each is tied to the frame it answers. None of these was seen on any of the 53 rendered pages.

1. **A countdown to the gym's own kit, not to a sale.** Every timer in the set counts down to a discount or a launch (Ryderwear, TLF, Oner, Darc Sport). On the custom kit page, once the gym has picked pieces and a date, the bar at the bottom counts the days to their kit landing on their members, using a stated production range the way Stanno states "6-12 weken". On the home page, keep their real 27-10 drop countdown, but make it the teddy's countdown, the only one in the set that is not a sale.
2. **The back of the tee is the hero, and it turns.** Only 6 of 44 sites show a garment from the back, and none lets the visitor turn it (Vanquish frames 0 to 2 come closest with static back views). BeBetter's custom grammar is the back print, so the page opens on a washed black oversized tee seen from the back, with the gym's name arching across the shoulders as they type, and a drag to turn it to the chest mark.
3. **The team votes on the design inside the page.** TeamShirts hides "Abstimmen lassen" behind its third step and Kitlocker has a "Share" step. Nobody shows it. A "send to your coaches" link that opens the same tee for a vote, with the tally visible to the owner, turns the request into something the gym's own members helped make. It fits BeBetter's own story of the first gym kit selling out in four hours.
4. **A size run that is the control.** Every maker asks for sizes in a table or a cart (Kitlocker, Shirtee "GRÖSSEN & MENGEN"). Drawing the size run as bars the owner drags, with the rack of hanging tees filling as they go and the total counting itself, makes the quantity question a moment instead of a form.
5. **Price tiers drawn as steps, labelled as an estimate.** Spized's configurator shows one price at 10 pieces and its FAQ lists the breaks (5, 10, 20, 35, 50, 100). owayo lists three quantities per garment. Nobody draws the curve. A step line where the gym's chosen quantity sits as a dot, with BeBetter's own breaks once they give them, answers "what does it cost" without a quote, and stays honest by labelling it an estimate until BeBetter confirms prices.
6. **The work order as the form.** owayo's quote form asks for five blank rows of quantity and product, Stanno's for a free text box. Nobody hands the owner back a finished sheet. The page builds a work order as they scroll (pieces, colours, print, sizes, date, logo) and the form arrives filled in, stamped RECEIVED on send, the Saavedra pattern applied to kit.
7. **Community as gyms, not influencers.** Alphalete, AYBL and Olaf show athletes and friends by @handle (frames 2 to 4). No custom maker shows its customers' kit as a wall of gyms. BeBetter's own four kits from their 29 Jun post (Team Siem, Bookaleap, American Gym Antwerp, Human Sports, per research/flow.md, not reopened in this pass [I]) shown as a rail the visitor drags, like Patta's "CLICK & DRAG" arc (frames 1 to 3), with a handover question before any gym's name goes public.
8. **The road as the brand story on the home page.** Nick Ho turns a race calendar into the spine of his site (frame 3). BeBetter's equivalent is their expo road, Rotterdam to Cologne, Breda and Prague, drawn as a route with their own photo at each stop. No apparel brand in the set tells where it has physically been.

---

## 5. Notes for whoever builds next

- The Saavedra pass used `tools/fetch-walled.py` on walled sites. This pass did not, by instruction, so the four walled makers stay undescribed. If they matter (O'Neills in particular runs a known kit designer [I]), Raka can open them in his own browser.
- `shots/` holds the latest pass of each site. Pass 1 frames of the re-run sites are in `shots_pass1/` and their sheets in `sheets_pass1/`.
- ServiceSport's /get-quote/ page is a gym equipment servicing calculator, not a clothing quote, so it is not used in section 2 [V configflows.jsonl].
- The "countdown or timer element" DOM count matches class names containing "timer" and can catch carousels (Corteiz, Cole Buxton). Only the timers seen in frames are claimed above.
