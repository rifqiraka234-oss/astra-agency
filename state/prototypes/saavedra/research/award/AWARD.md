# Saavedra rebuild, award level research (rendered 25 Oct 2026)

Internal research file. Nothing here is sent to anyone. Written for the Saavedra catering and events rebuild, whose one
job is to get an office manager or team lead to send a quote request (boxes of 6 and 12, team lunch, afterwork, private
hire). Raka's brief for this pass: more creative in animation, video, photos and graphs, every part guiding the visitor
to the action, one signature moment nobody has seen.

Everything below was rendered today in this container with Playwright Chromium 141 (headless, software GL). Shots are in
`shots/`, one fingerprint JSON per site in `meta/` (libraries found in the page code, canvases, videos, CSS rule counts,
sticky and fixed elements, CTA labels). The contact sheet of heroes is `contact.jpg`.

## How the list was built

- **FWA.** `thefwa.com/api/timeline` paged to 1,512 award entries (back to Oct 2022), then `thefwa.com/api/cases/<slug>`
  for every 2024 to 2026 winner (1,031 cases) to read the category, the award date and the "Launch project" URL. The
  live URLs below come from that field, none were guessed. Filter, category "Food & Drink" plus configurators, maps,
  scroll storytelling and data stories.
- **CSS Design Awards.** `cssdesignawards.com/website-gallery?industry=food/drink`, pages 1 to 4, parsed for award tier
  (WOTD or Special Kudos), date and the gallery's own outbound link.
- **Awwwards, walled.** Every request to `www.awwwards.com` failed through our egress, curl (connection reset),
  `tools/fetch-walled.py` (502 as chrome, safari and firefox), Playwright (502), WebFetch (503), and the Wayback copy
  (tunnel closed). The proxy status log records `ws_closed_mid_exchange` for `www.awwwards.com:443` four times. Control,
  `example.com` 200 in the same minutes. So no URL here was taken from Awwwards. One site, Grab&Go, carries an Awwwards
  "Site of the Day" ribbon on its own page, seen in our screenshot, noted as that and nothing more.

## The sites (37 attempted, 26 rendered with their key moment, 8 partial, 3 failed)

Status key. **OK** desktop hero, one or more moments and a 390 phone hero. **PARTIAL** what we got is named. **FAILED**
reason given. "Seen" means in our screenshots. "Per studio" means the studio's own text on FWA, not seen by us.

### Food and drink brands, restaurants and caterers

| # | Site | Award (gallery date) | Status | Signature moment and how it works | How it moves the visitor to the action |
|---|---|---|---|---|---|
| 1 | Vita Lenta, https://vita-lenta.com/ | FWA of the Day 2025-02-09 | OK | Seen, a fixed vertical **day rail** on the right, 8 am, 11 am, 1 pm, 4 pm, 7 pm, 10 pm, a sun icon at the top and a moon at the bottom. The menu is ordered by time of day (BREAKFAST, LUNCH...), each period gets its own ground colour (cream, peach, pale blue) and one huge serif word with photos placed off grid. Lenis smooth scroll, clip-path and mask reveals, 2 sticky elements. | RESERVE fixed top right on every screen, PREORDER in the nav. |
| 2 | Caín, https://www.restaurantecain.es/ | FWA of the Day 2025-08-18, CSSDA Special Kudos 22 Aug 2025 | OK | Seen, a custom condensed display wordmark over a dark room, a painted fresco band of locals as the first image, then a gold disc floating over a chapel interior, the fire restaurant as a church of embers ("La iglesia de las brasas"). Next.js, Splide, one CSS `animation-timeline` rule, one video. | "Hacer una reserva" red button in the hero, in each section and in the fixed header. A private events block, "Reserva el cielo entero. Celebra tu evento privado para 30-40 personas", is how a fire restaurant sells private hire. Note, it uses the pill plus round arrow button we ban. |
| 3 | Tripletta, https://www.triplettapizza.com/ | FWA of the Day 2025-03-08 | OK | Seen, the giant TRIPLETTA wordmark with their flaming mascot drawn **through** it, a wobbling "MON RESTAURANT" sticker, a row of city names with a plate between them, taped polaroids over a huge "LOVE". Per studio, Lottie icons on every button and an infinite scroll whose colours change at each loop. Webflow, Lenis, Barba, Lottie. | "Privatisation" sits in the hero's bottom row next to Recrutement, the sticker sends you to your nearest restaurant. |
| 4 | Agrumea Farm, https://agrumeafarm.it/en | FWA of the Day 2026-09-27, CSSDA WOTD 6 Oct 2026 | OK | Seen, the jars **orbit on a ring** that the wheel turns, standing on a maroon octagon plate whose rim carries circular text ("WE GROW, WE PRESERVE..."), out of focus jars at the edges for depth. Nuxt, Lenis, ten jar canvases, custom cursor, Three.js per studio. | A floating "DISCOVER THE PRODUCT" tag sits on whichever jar is in front. |
| 5 | Hungry Tiger, https://www.eathungrytiger.com/ | FWA of the Day 2025-06-27, CSSDA WOTD 29 Jun 2025 | OK | Seen, **one jar is the whole page's hero object**, it travels and turns from section to section on a 843x909 canvas, while headings are filled with their leaf pattern ("UNWRAP"). Tilted food photos on a flat orange ground. Webflow, GSAP ScrollTrigger, Lenis, Lottie, 4 sticky. | BUY NOW in the nav plus a jar and a basket button fixed bottom right on every screen. Phone, a full width BUY NOW bar in the thumb zone. |
| 6 | Häagen-Dazs Ice Cream Factory Tour, https://www.haagen-dazs.co.jp/brand/special/hd-factory/ | FWA of the Day 2024-04-04 | PARTIAL, desktop only | Seen, 3D CG film of each machine plays in a **circular porthole** that shrinks from full bleed to a gold ringed circle as you scroll, with a big step number and name (01 Mixing, 02 Homogenizing) and a vertical "factory map" progress line bottom right. 14 videos, 1 canvas, 27,645 px tall. | It's a learning tour, the action is the next step. Note, Chromium got 403 (their bot wall on our TLS fingerprint, fetch-walled returned 200). Desktop was rendered with same host requests served through curl_cffi (118 served, 0 errors). The phone pass on that path was refused by the session's permission system, so there is no phone hero. |
| 7 | Don Molinico, https://www.donmolinico.es/ | FWA of the Day 2026-05-04, CSSDA WOTD 16 Apr 2026 | OK | Seen, a full bleed overhead table spread as hero with the logo as a **red label hanging from the top edge**, then a **format picker** (FRASCO, LATA, BOLSA, PANDERETA) that swaps the product, and a round "DESCUBRE" cursor. 16 clip-path rules, Nuxt, Lenis. | Discovery leads to CONTACTICO. The format tabs are the pattern for "boîte de 6 / boîte de 12". |
| 8 | Mr.BLACK Franchise, https://mrblack-case.dolganev.com/ | CSSDA WOTD 14 Sep 2026 | OK | Seen, the cup carrying their logo **stands on the giant wordmark**. Formats TO GO, LOUNGE, SPECIALTY are full bleed panels that **stack as sticky scenes** with a 02/03 counter and plain set figures (profit, footprint, investment). Built with Astro and **native CSS scroll driven animations**, 11 `animation-timeline` and 6 `view-timeline` rules, 13 sticky elements. | APPLY NOW under each format, CONTACT US fixed in the header with a photo thumbnail. |
| 9 | Ironhill, https://ironhill.au/ | FWA of the Day 2025-12-18, CSSDA WOTD 22 Dec 2025 | OK | Seen, a preloader counting to 100 with a walking engraved yeti, then **one hand drawn trail line** running down the whole page between sections, **GPS coordinates** in the header (25.3444° S, 131.0369° E), slide mounts and an engraving scattered like a field kit, words that fade in one by one as you scroll, rolling odometer digits, and a footer where engraved creatures **climb on the letters** of the giant IRONHILL. Nuxt, Three.js, 3 product videos. | Product rows lead to drinks and produce, a newsletter field in the footer. |
| 10 | Savor, https://savor.it/ | FWA of the Day 2025-09-12 (Resn) | OK, phone hero was the loader | Seen, a **thin line draws itself on scroll** from one phrase to the next over full bleed texture and video (tree rings, a forest), repeated stacked words ("more more more"), then overlapping food photos. Lenis, 5 canvases, 9 clip-path rules. | Contact in the menu, the line itself is the guide. |
| 11 | Grab&Go, https://grabandgo.pt/ | FWA of the Day 2024-03-09 (Awwwards SOTD ribbon on page) | OK | Seen, their kiosk **drawn into an illustrated street** as the hero ("24 open hours", awning, balustrade), a sunset section where the ground goes orange to violet as the copy talks about time, tilted staff photos. Nuxt, Lenis, Lottie, 101 SVG masks, 4 videos. | "Franchising" fixed top right, "Pedir informações" and "Quero ser contactado" lead forms, a store finder. |
| 12 | Blanchette Soho, https://blanchettesoho.co.uk/ | CSSDA Special Kudos 2 Oct 2026 | OK | Seen, **three arches of their own illustrated tiles** as the hero. On phone each nav word carries a script caption, "reserve, pull up a chair", "private, celebrate here", "find us, find the door". Food tabs (food, restaurant, drinks, private dining, events). Webflow, GSAP ScrollTrigger, Theatre.js. | RESERVE everywhere, and hours per format, "Lunch Monday to Friday 12pm to 5pm", "Private Dining, The Jungle Room, up to 14 guests". |
| 13 | Le Pain Quotidien, https://www.lepainquotidien.com | CSSDA Special Kudos 6 Sep 2025 | OK | Seen, the sentence "THIS IS NOT JUST BREAD..." **arrives word by word with motion blur** while the loaf stays put, a hairline framed grid nav, full bleed video of bread being sliced. Next, Framer Motion, Lenis, Mapbox, 7 sticky. | Order Online, Catering and Locations live in the framed nav. |
| 14 | Kalm Kitchen, https://kalmkitchen.co.uk/ | CSSDA Special Kudos 9 Jul 2025 | OK | A London caterer. Seen, hero slider of their own events, a list Events, Weddings, Partnerships whose photo swaps on hover. WordPress, GSAP, SplitText. | "send us an enquiry", and an FAQ right beside it that answers this visitor's questions, "What areas do you cover?", "How much notice do you need?", "Can you accommodate dietary requirements?". Uses the dash kicker we ban ("01 — Events"). |
| 15 | Burrito Madre, https://burritomadre.rs/en/ | CSSDA Special Kudos 30 Jun 2026 | OK, catering page added | Seen, cut out menu items in a grid, huge "REAL" type over photos, 128 SVG masks, one CSS `animation-timeline` rule. Their **catering page** (`/en/catering/`, link read from their HTML) is one tacos box photo, centred uppercase copy and a phone number button. | ORDER fixed in the nav, CATERING in the main nav. The catering page ends on "+381 11 303 74 50", no form, no builder. The gap our builder fills. |
| 16 | Studenterkilden, https://studenterkilden.dk/en | CSSDA Special Kudos 9 Oct 2026 | OK | Event venue since 1854. Restrained, a settings grid. Webflow, GSAP, SplitText, Lenis, Barba. | Book a table fixed, "View packages". |
| 17 | Almi, https://almiberlin.de/en/ | CSSDA Special Kudos 20 Jan 2026 | OK, one screen site | Seen, a single blurred interior photo, the wordmark and **opening hours in the hero**. | "Book a table" and "Buy a gift voucher" fixed bottom right. |
| 18 | Gini, https://www.ginivini.com/ | FWA of the Day 2025-03-14 | OK | Seen, "RADICI SENZA TEMPO" with small words slotted between the big ones (quindici, generazioni), a menu of numbered tall photos (002 RADICI...). Nuxt, Barba, Lenis, 2 `view-timeline` and 2 `scroll-timeline` rules, 20 clip-path rules. | SHOP in the menu. No buttons at all on the hero, plain words. |
| 19 | SŌM, https://www.drinksom.eu/ | FWA of the Day 2026-03-24, CSSDA WOTD 27 Mar 2026 | OK, phone hero shows their geo modal | Seen, a portrait video hero with the bottle, the bottle sticks while the backgrounds change. Uses chips (benefit tabs) and glass cards, both on our banned list. Next, Shopify. | SHOP SŌM POWER fixed in the header, GET YOUR POWER in the hero. |
| 20 | Promeat, https://promeat.chipsa.design/ | CSSDA WOTD 2 Aug 2025 | PARTIAL | Seen, the preloader is a **line drawing of a pan holding a real steak photo** with a handwritten "love at first bite" and a % counter, then a full bleed pasture video, "click on the bull" (a cut diagram). Our scroll frames d2 to d4 lost their CSS to proxy failures ("upstream request failed"), so they are not trusted. Phone hero is good. | "Submit a request" B2B form for restaurants. |
| 21 | Duroc, https://duroc.ma/ | FWA of the Day 2025-06-06 (Bonhomme) | PARTIAL | Seen, after CONTINUER, a 3D toy world on a round plate where cherry tomatoes ride a conveyor, a big wheel and a coaster. Astro, Three.js, intro video. Our wheel didn't advance the story. | Contact, catalogue. |
| 22 | Maeve Chocolate, https://maevechocolate.com/ | CSSDA WOTD 23 Oct 2025 | OK | Illustrated game world, email popup, a marquee ticker. Shopify, GSAP, 8 `animation-timeline` rules. | SHOP NOW, add to cart prices on product rows. |
| 23 | Snax Franchise, https://www.snax-franchise.site/ | CSSDA Special Kudos 7 Jul 2026 | OK | 3D mascot, **stat blocks** and pill buttons with icon arrows, i.e. several banned defaults, on a lower tier award. | START A FRANCHISE everywhere. |
| 24 | Simply Delicious, https://simplydelicious.co.uk/ | CSSDA Special Kudos 6 Jul 2026 | OK | Generic, a type marquee. Listed for completeness, nothing to take. | Where to buy. |
| 25 | Zoi Ice Tea, https://www.drinkzoi.co/ | FWA of the Day 2025-10-17 | PARTIAL | Only the % loader and a blue shader fog with words one at a time ("Freeze. Shake. Drink. Repeat!"). The 3D product scenes ("Video Scene", "Gallery Scene" in the DOM) never drew under software GL. | n/a |
| 26 | Banzai Izakaya, https://www.nudolsbanzai.it/ | FWA of the Day 2024-11-10 | PARTIAL, gate only | START / "Entra senza audio" gate captured. After the click the WebGL scene stalled screenshots for 30 s each and the renderer crashed. | n/a |
| 27 | La Revoltosa, https://larevoltosa.es/ | FWA of the Day 2026-09-18, CSSDA WOTD 3 Oct 2026 | FAILED visually | The DOM loads (text "LA BURBUJA IBÉRICA, SETENTA AÑOS EN LOS MISMOS VASOS...", scroll moved to 5,021 px) but the full screen canvas stays solid red after 40 s, twice, so we never saw the 3D. | n/a |
| 28 | Eislab, https://eis-lab.de/en-us | FWA of the Day 2025-02-18 | FAILED | The server answers every path with a 308 to itself (`/en-us` to `/en-us`, `/` to `/`, `/de` to `/de`), curl and Chromium both. Shots named `*-ERRORredirectloop`. | n/a |

### Configurators, maps, storytelling and data

| # | Site | Award | Status | Signature moment and how it works | Path to action |
|---|---|---|---|---|---|
| 29 | Netflix, Voyage en France, https://netflix-en-france.fr/ | FWA of the Day 2024-02-20 (Cher Ami) | OK | Seen, after EXPLORER, a wheel driven row of **tilted postcards with a red N stamp**, each a travel journal, "Carnets de voyage" drawer at the bottom. Three.js, Lenis. The interactive map itself was not reached. | Pick a postcard, open the journal. |
| 30 | Grungeology, https://www.grungeology.org | FWA of the Day 2025-11-29 (PHA5E) | OK after two passes | Seen, a hand drawn circle round "Aberdeen Washington" on a paper map, then a **Leaflet map** (28 tile canvases) with **polaroid pins** of places and three numbered hints in their marker style, "1 click and drag to discover the map", "2 hover and click to discover a place", "3 try one of our trails". MAP and LIST toggle. Glitch video intro, 2 CSS `animation-timeline` rules. | DISCOVER OUR TRAILS, a guided route. A torn paper disclaimer gate first. |
| 31 | Oh là là Ride, https://ohlalaride.com/ | FWA of the Day 2026-10-19 (The Officin) | PARTIAL, hero only | Seen, a 3D Parisian cyclist with a basket under a street lamp, autumn leaves falling. Their own text, "Départ place de la Concorde, montée vers le Sacré-Cœur à l'heure dorée, descente de nuit par la rue Caulaincourt", a ride through named Paris streets that changes with the hour. RIDE THE CITY did not start the Three.js game headless, phone got a proxy 502. | RIDE THE CITY. |
| 32 | Carter Ogunsola, https://carterogunsola.com | FWA of the Day 2026-10-11 | OK, but not what FWA describes | Seen, a "Selected work" list with **live presence cursors** of other visitors named like "quiet heron", "3 people joined, 73 online". Per studio, a two wheel print press and a contact letter you type that comes back stamped. We did not see the press or the letter on the home page. Astro, Three.js, 5 canvases. | Contact in the nav. |
| 33 | Biite, https://biite.com | FWA of the Day 2026-03-02 (ED.) | OK | Seen, grainy **blobs that crawl and merge like a petri dish**, each blob a mask over a case study image, per studio "content blobs crawl and cling to one another". Next, one WebGL canvas, CSS masks. | MENU, Contact. |
| 34 | Every Neuron, http://www.everyneuron.com | FWA of the Day 2026-09-20 | PARTIAL, loader only | Seen, "DRAWING THE MAP, 0 of 22,691 cells, one of each of 11,751 types", a counter that is the real data loading, not a vanity count up. Per studio, 22,691 real cells and 4.4 million tube segments rendered live. The renderer crashed three times under software GL. | Explorer, per studio. |
| 35 | Classics Garage, https://www.classics-garage.com/ | FWA of the Day 2024-04-30 | PARTIAL, intro only | Seen, loader then "classics" in script inside warp lines. Per studio, a real time Three.js / React Three Fiber car configurator with unlockable cars and engine sounds. The configurator crashed the renderer on drag. | n/a |
| 36 | iyO, https://www.iyo.ai/ | FWA of the Day 2026-03-31 | PARTIAL, hero only | Seen, dark hero, "We make agentic computers you can talk to", SHOP NOW with a product thumbnail bottom right, a floating pill nav (banned look). Per studio, a bespoke 3D configurator with Chladni particle patterns. Goto timed out on the second pass and the page crashed. | SHOP NOW. |
| 37 | IKEA, Activa el modo hogar, https://www.family.ikea.es/demos/activa-el-modo-hogar/ | FWA of the Day 2026-01-05 | FAILED, 401 | The demo now answers 401 Unauthorized to Chromium and to fetch-walled. Per studio, GSAP Draggable drag and drop of Christmas items onto a BILLY shelf with collision zones and sound, the closest thing in the list to "drag empanadas into a box". Shots named `*-ERROR401`. | n/a |

Counts. 37 attempted. 26 rendered with their key moment, 25 of them fully with a phone hero (rows 1 to 5, 7 to 19,
22 to 24, 29, 30, 32, 33) plus Häagen-Dazs on desktop only. 8 partial (Promeat, Duroc, Zoi, Banzai, Oh là là Ride,
Every Neuron, Classics Garage, iyO, see their rows for what we got). 3 failed outright (La Revoltosa, Eislab, IKEA).
The heavy WebGL builds failed here for our reason, software GL in a headless container, never for theirs.

## What the winners do that our last build didn't

1. **One object carries the page.** Hungry Tiger's jar, Mr.BLACK's cup, Agrumea's ring of jars, Häagen-Dazs's porthole.
   The eye follows one thing from hero to action, so there are no islands.
2. **Time and place are the structure.** Vita Lenta orders a restaurant by the hours of its day, Ironhill puts its
   coordinates in the header and draws one trail line through the page, Oh là là Ride is a route through named streets.
3. **Drawing and photo in the same frame.** Promeat's line drawn pan holding a real steak, Tripletta's mascot through the
   wordmark, Ironhill's creatures climbing the letters, Grab&Go's drawn street.
4. **The action never leaves the screen**, and it's specific. Hungry Tiger's basket, Vita Lenta's RESERVE, Blanchette's
   "private, celebrate here". The weak one is telling, Burrito Madre's catering page ends on a phone number.
5. **CSS is now enough for the scroll work.** Mr.BLACK, Gini, Maeve, Caín and Grungeology ship native
   `animation-timeline` / `view-timeline` rules. Sticky scenes plus scroll timelines cover most of what used to need GSAP.

## Ten ideas for Saavedra

Each is one buildable moment for this brand, tied to a site above and to a step in the visitor's path. The path is the
one in `../four-lines.md`. Is it good food a team will like? Can they handle 20 of us? What per head? Something without
meat? Delivery or collect, how close? How far ahead? Then ask for a quote in one step. Facts used are the VERIFIED rows
of `../strategy-facts.md`. Rules from `../art-direction.md` hold throughout, no capacity, radius, lead time or minimum
they haven't published, Spanish only from their own posters, no photo captioned as their premises or staff unless their
site does it.

Complexity, S half a day to a day, M one to two days, L two to three days, for one builder, with a still state for
reduced motion and no JavaScript in every case.

### 1. La boîte de 12 se remplit (the signature moment, path step "can they handle 20 of us, what per head")

Source, Don Molinico's format picker, Agrumea's single object that changes as you move, Hungry Tiger's always present
basket, and the gap on Burrito Madre's catering page. A box seen from above in their blue line, 12 slots, with "boîte de
6" and "boîte de 12" as the format switch. One headcount slider. The default is three per person, "comme la formule
midi", because their Saavedra Classic is three empanadas plus a drink. As the slider moves, cut outs of their own
empanada photos drop into the slots one by one with a small bounce and a char spot stamp, and a second, third box slides
in beside. A till receipt in Space Mono adds up at card prices, 22 people, 66 empanadas, 5 boîtes de 12 and 1 boîte de
6, 225,40 € (5 × 40,90 + 20,90). A carne and verduras split per box answers the meat question in the same place. The
state goes straight into the quote form.
Technique, SVG box, Web Animations or GSAP Flip for the drops, a spring ease, a native `input type=range` underneath so
it works as a plain number field without JS. Complexity M.

### 2. Le soleil traverse la journée (orientation, "which of these is for me")

Source, Vita Lenta's day rail with sun and moon and a ground colour per meal, Mr.BLACK proving native scroll timelines.
A thin rail on the right edge (bottom edge on phone) marked 12h30, 15h, 18h30, 20h. Their Sol de Mayo is the thumb and
moves with the scroll, the page ground goes celeste, crema, rosa and gold, then noche. Each tick is a link that jumps to
that format and presets the form's format field. The labels are moments of a team's day, the real service hours (12h to
14h30 and 18h30 to 22h, Zelty, Uber Eats and Google agree) appear as fact inside the formats.
Technique, fixed SVG sun on `animation-timeline: scroll(root)`, a registered `@property --sky` colour interpolated by the
same timeline, IntersectionObserver fallback. Complexity S to M.

### 3. Le four en hublot (appetite and trust, "is this good food")

Source, the Häagen-Dazs porthole that shrinks from full bleed to a ringed circle with a step number, and Caín's gold
disc over a dark room. A full bleed wood fire film (the licence checked clips already in `../assets/film/`) shrinks on
scroll into a circle, the mouth of the oven, and the circle becomes their sun. Inside it, their own three words in turn,
"façonnées à la main", "recettes travaillées", "cuisson au feu de bois", each with one of their photos (hands breaking,
hands pulling apart, the tray). No invented process steps.
Technique, a sticky scene with `clip-path: circle()` driven by `view-timeline`, the video with a poster image as the
still state. Complexity S.

### 4. SAAVEDRA en arche, la fenêtre (landing, "who is this")

Source, Tripletta's mascot drawn through the wordmark, Hungry Tiger's type filled with pattern, Mr.BLACK's cup standing
on the giant name, Blanchette's three arches of their own art, Ironhill's creatures climbing the letters. Their arched
SAAVEDRA wordmark is the hero object, filled with their own photo of an empanada being broken, and the runner with his
tray runs out from behind the last A. On scroll the arch opens until the photo is full bleed. In the footer the gaucho
and the sun sit on the letters.
Technique, SVG `<mask>` from the wordmark paths (we have the PNG, ask them for the vector or trace it), scale on a scroll
timeline. Complexity S to M.

### 5. Le coureur traverse le 9e (logistics, "delivery or collect, how close")

Source, Ironhill's single trail line and header coordinates, Oh là là Ride's route through named Paris streets, Savor's
line that draws itself from phrase to phrase, Grungeology's map with polaroid pins and numbered hints. A street map in
their blue line around rue Condorcet and avenue Trudaine, "48.8803 N · 2.3434 E" in the header (the BAN geocode of 48
rue Condorcet). As you scroll the runner carries a real cut out empanada on his drawn tray, Promeat style, along a path
from the shop to WeWork Trudaine, 109 m. Rings at 300 m and 500 m. A field "votre adresse" geocodes with
api-adresse.data.gouv.fr and draws his line to your office with the straight line distance. "Livraison ou retrait"
stays a question in the form (no radius published, CONFIRM).
Technique, SVG path with `stroke-dashoffset` drawn by scroll, the runner on `offset-path`, a fetch to the BAN API,
haversine. Complexity M to L.

### 6. Les bureaux du quartier deviennent le soleil (the graph, same step, "are they near us")

Source, Every Neuron's live drawing of real data with a counter that is the real load, Ironhill's odometer digits.
308 dots at the real coordinates of the workplaces with 10 or more staff within 500 m (company register, 2024 bands, 9e,
10e and 18e, already on disk from the strategy research), split by size band. On scroll they leave the map and fly
into the rays of the Sol de Mayo, a sourced chart that ends as their logo. Caption with the source and "floor" wording,
no company named, nothing implying they are customers. It closes the map section and can be reused on the growth plan
site.
Technique, canvas 2D with tweened positions on a scroll progress value, an SVG still for no JS. Complexity M.

### 7. Les formats empilés à leur heure (format choice, "lunch, drinks or the whole place")

Source, Mr.BLACK's stacked sticky format panels with plain figures, Blanchette's hours per format, Kalm Kitchen's format
list. Four full bleed panels in their hour's colour, 12h30 Boîtes au bureau (6 à 20,90 €, 12 à 40,90 €), 12h30
Déjeuner d'équipe (Saavedra Classic 13,90 €, Mi Amor 15,90 €), 18h30 Afterwork, 20h Privatisation (capacity left as a
question, CONFIRM). Each panel slides over the last and pushes it back, and its button presets the form.
Technique, `position: sticky` plus a `view-timeline` scale on the panel underneath. Complexity S.

### 8. 20h, la braise (the second visitor, private hire)

Source, Caín's private event block for a fire restaurant, Ironhill's "heat your hands by the embers" night. The sun that
crossed the day sets into the fire, the page goes noche, embers drift up from the bottom edge of their photo, and the
form below opens preset to "Privatisation". No CSS glow, the light comes from the particles.
Technique, a canvas 2D particle field of about 150 embers, additive blending, paused off screen by IntersectionObserver,
off for reduced motion. Complexity S to M.

### 9. Le plateau tournant (the meat free question, menu exploration)

Source, Agrumea's wheel driven ring with circular rim text, Don Molinico's "DESCUBRE" cursor. Their recipes from the
printed card sit round a tin tray like the one in their tray photo, the wheel or a drag turns it, the rim carries
"MENOS PALABRAS · MÁS EMPANADAS" on a text path, the one in front shows its name and a mark if it's verduras, and
"+ dans la boîte" adds it to the builder of idea 1. Constraint, they have no photo labelled per recipe, so either they
send one per recipe or the tray uses names and their drawn icons, never a guessed photo.
Technique, CSS 3D ring (`rotateY` with `translateZ`), SVG `textPath` rotated with the tray, pointer drag. Complexity M.

### 10. Le ticket qui suit, le devis qui se tamponne (the action, "is asking a hassle")

Source, Hungry Tiger's basket on every screen, Mr.BLACK's fixed CONTACT US, Kalm Kitchen's FAQ beside the enquiry,
Carter Ogunsola's letter that comes back stamped (per studio). A bottom bar shaped like a ticket stub, square corners and
a perforated edge, never a pill, carrying the builder's state ("22 pers · 5×12 + 1×6 · 225,40 €") and "Demander le
devis". Before the builder it reads "Pour l'équipe, devis en une étape". The form is a kitchen ticket in Space Mono,
already filled from the builder, three empty fields (nom, email, date). On send it tears along the perforation and their
heart arrow S badge stamps it. The three FAQ answers this visitor needs sit beside it (delivery, how far ahead, meat
free), with CONFIRM where Saavedra hasn't said.
Technique, fixed element with state kept in URL parameters so it survives without JS, `clip-path` zigzag tear, Netlify
Forms POST. Complexity S.

**If only five get built**, 1 (the box), 2 (the sun rail), 5 (the runner map), 3 (the oven porthole) and 10 (the ticket
bar), in that order. Together they are one object path, the sun crosses the day, the runner carries the box through the
9e, and the box becomes the ticket.

## The banned AI look, what winners avoided or reinvented

- **Pill buttons with arrows.** Still on Caín, Snax, iyO's nav and Agrumea's MENU, so winning doesn't clear it. Reinvented
  by Blanchette (nav words with a script caption, no shape at all), Gini (plain uppercase words), Mr.BLACK (a square
  button with a photo thumbnail), Hungry Tiger (round icon buttons that show the product, a jar and a basket).
- **Dash kickers.** Kalm Kitchen still uses "01 — Events". Häagen-Dazs and Mr.BLACK use a big step number instead.
- **Cream and indigo alternation, gradients.** Vita Lenta changes the ground colour by hour, Grab&Go's only gradient is a
  sunset that means time passing. Colour that carries meaning, not decoration.
- **Dark gradient over photos.** Häagen-Dazs puts the film in a porthole, Don Molinico lets the table photo be the hero
  with the logo as a hanging label, Almi blurs the room instead of darkening it.
- **Count up stats.** Snax does it. Mr.BLACK sets figures plainly in big type. Every Neuron's counter is honest because it
  counts the real data loading.
- **Rounded cards with soft shadows.** SŌM uses glass cards. Netflix turned cards into tilted postcards with a stamp,
  Ironhill into slide mounts and engravings, Tripletta into taped polaroids.
- **Logo marquees.** None of the food winners shows client logos. Tripletta's ticker is its own cities with a plate
  between them, Maeve's and Simply Delicious's are plain type marquees.
- **Chips and tags.** SŌM's benefit chips. Don Molinico's format picker does the same job as plain words that swap the
  product.
- **Three pillar bullets, floating pills.** Absent from the strongest food sites (Vita Lenta, Hungry Tiger, Ironhill,
  Mr.BLACK). iyO floats a pill nav.

## Files

- `contact.jpg`, 35 heroes or first real frame, labelled with the award and date.
- `shots/<slug>--d1-hero.jpg` desktop 1440 hero, `--d2/d3/d4-scroll.jpg` scroll moments, `--p1-hero.jpg` phone 390,
  `--x*.jpg` interaction passes (clicks, gates, map, catering page). Error pages are named `*-ERROR401`,
  `*-ERROR403`, `*-ERROR502`, `*-ERRORredirectloop`.
- `meta/<slug>.json`, the fingerprint of each first pass (libraries detected by pattern in the page code, so treat a
  single library hit as a hint, canvases, videos, CSS rule counts, sticky and fixed elements, CTA labels).
