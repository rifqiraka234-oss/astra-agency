# Rejects and gaps, SAAVEDRA asset sourcing (2026-10-25)

Covers `own/`, `film/` and `stills/`. Every Mixkit item page below was fetched on 2026-10-25, one request at a time, at least 3 s apart (never more than two item pages in one tool call, 4 s apart), with both licence signals read: JSON-LD `copyrightNotice` and the download box `data-license`. Files were only downloaded for items that read `Free` on both. Mixkit User Terms were read the same day: clause 9 bars "scripts or bots to mass download Items", so nothing was bulk fetched. Commons pages were fetched singly, 8 s apart, with a descriptive User-Agent.

## own/ (SAAVEDRA's own site)

Nothing was rejected outright. All 32 unique files are in `own/`, and six carry `do_not_use: true` in `own/manifest.json`.

| File | Why it must not ship |
|---|---|
| `08-illustration-figure-holding-empanada-HIDDEN.png` | Appears to be a likeness of Diego Maradona (curly hair, the arms raised trophy pose, the same figure as the poster). It's also hidden on the live site: zero size at 1440 px and at 390 px. |
| `09-sticker-empanadas-de-dios.png` | Appears to be Maradona: striped Argentina shirt, curly hair, and "¡EMPANADAS DE DIOS!", a play on his "mano de Dios". |
| `32-poster-de-buenos-aires-a-paris.png` | The same Maradona style figure holding a giant empanada. Their wordmark and the line "DE BUENOS AIRES À PARIS" can be reused as type without the figure. |
| `31-screenshot-buenos-aires-bus-sticker.png` | The Mercedes-Benz star is plainly visible on both bus grilles. The bus photo underneath also looks like an archive or third party image of unknown origin. |
| `12-THIRDPARTY-deliveroo-logo.png` | Deliveroo's logo. If delivery comes up, use plain text. |
| `16-photo-empanadas-tray-bottle-stone-wall.jpg` | The bottle label reads "LE SAUVAGEON, RETOUR AUX SOURCES" with its leaf logo, plainly legible. Usable only if cropped below the bottle. |

Gaps and doubts in `own/`:
- **No SVG artwork exists on their site.** Every inline `<svg>` in the five rendered pages (15 or 16 per page, at 1440 and 390 px) is a Squarespace control: the cart, the menu icons, a social icon sprite (Instagram, LinkedIn, TikTok), or a "Click & collect" marquee text path on `/click-collect`. The logo, sun, gaucho, runner, heart and burst are PNGs. `own/traced-svg/` holds **our own potrace traces** of six of them. Each was checked by rasterising it in Chromium and comparing it with the source alpha mask (IoU 0.95 to 0.997). The first run came out inverted (IoU 0.0003), the check caught it, and it was fixed. These traces are not SAAVEDRA files. Ask them for real vectors before anything goes live.
- **Resolution ceiling.** Squarespace serves at most 2500 px wide. The photo uploads are 4000x6000 (per `data-image-dimensions`), but `?format=original`, `3000w`, `4000w` and no parameter all returned the same 2500 px file.
- **Address mismatch.** The T-shirt in `29-screenshot-tshirt-dealer-of-empanadas.png` prints "32 RUE LAFAYETTE - 75009". The site footer and their Zelty record both say 48 rue Condorcet. Not resolved, so never use the shirt as an address source.
- **The runner character** (`02`) has a black bob, a bow and a dotted dress that could read as a nod to Quino's Mafalda. It's their own published art, so it's fine as their mark, but ask before making it the hero object.
- **Faces.** `17` and `19` show fully identifiable young men, and `27` shows a woman in sunglasses. None of them is named on the site, so never caption them as founders, staff or customers.

## film/ (Mixkit)

### Rejected for licence: Mixkit Restricted License, personal use only (nothing downloaded)

| Mixkit id | Title | Item page |
|---|---|---|
| 45727 | Two friends sharing a toast over a meal | https://mixkit.co/free-stock-video/two-friends-sharing-a-toast-over-a-meal-45727/ |
| 47976 | Group of male and female friends eating sandwiches at a picnic | https://mixkit.co/free-stock-video/group-of-male-and-female-friends-eating-sandwiches-at-a-47976/ |
| 46506 | Friends eating sandwiches at a picnic in the park | https://mixkit.co/free-stock-video/friends-eating-sandwiches-at-a-picnic-in-the-park-46506/ |
| 24893 | Having a working lunch in the office | https://mixkit.co/free-stock-video/having-a-working-lunch-in-the-office-24893/ |
| 13225 | Young women talk over lunch break in modern office | https://mixkit.co/free-stock-video/young-women-talk-over-lunch-break-in-modern-office-13225/ |
| 24384 | Coworkers eating pizza in the office | https://mixkit.co/free-stock-video/coworkers-eating-pizza-in-the-office-24384/ |
| 23833 | Workers eating pizza in the office | https://mixkit.co/free-stock-video/workers-eating-pizza-in-the-office-23833/ |
| 48723 | Office worker enjoying a toasted sandwich at work | https://mixkit.co/free-stock-video/office-worker-enjoying-a-toasted-sandwich-at-work-48723/ |
| 21472 | Business team having a break | https://mixkit.co/free-stock-video/business-team-having-a-break-21472/ |
| 45449 | Group of friends toast a drink together | https://mixkit.co/free-stock-video/group-of-friends-toast-a-drink-together-45449/ |
| 45653 | Group of friends sharing laughter over drinks | https://mixkit.co/free-stock-video/group-of-friends-sharing-laughter-over-drinks-45653/ |
| 8820 | Happy friends chat while having drinks outdoors | https://mixkit.co/free-stock-video/happy-friends-chat-while-having-drinks-outdoors-8820/ |
| 8956 | Group of friends share drinks and ideas by window | https://mixkit.co/free-stock-video/group-of-friends-share-drinks-and-ideas-by-window-8956/ |

Control read: 36897 "Silhouettes of a business meeting" (a known Restricted item) read Restricted on both signals, which shows the method finds Restricted when it's there. Its JSON-LD `license` URL still says `#videoFree`, so that field is boilerplate and was ignored.

**The office team lunch brief is unmet.** Every office lunch, coworkers eating and business break clip found on Mixkit (8 of 8 read) is Restricted. No Free clip of a team eating together in an office was found. The nearest passes are table shares in cafes and homes.

### Rejected after the frame check (licence Free on both signals, downloaded, every frame looked at at 1 fps)

| Mixkit id | Title | Reason |
|---|---|---|
| 4350 | Urban coffee shop | A real, identifiable Paris cafe terrace at night: "RIBE..." on the awning and readable street name plates. Also a "P" parking sign, and passers by in the foreground. |
| 3516 | Urban view from a rooftop and the sunset | A red neon sign reads "TAMBOER PASSAGE" at full size (a Dutch shopping arcade, not Paris). |
| 4023 | Night roundabout with fast motion traffic | The Arc de Triomphe roundabout, a landmark outside the 9th that reads as tourist Paris. 5 s of fast motion. No logo found, rejected as off brief. |
| 44011 | Man making a toast with another person | Pixel identical to 44012 (ffmpeg SSIM 1.000000 on every channel). The file hashes differ, the streams don't. 44012 is kept. |
| 43984 | Waiter serving drinks to a couple in a bar | A back bar wall full of labelled spirit bottles behind the actors, an advert style set, couple in evening wear. |
| 44010 | Couple of people eating pizza together | The food is pizza. On an empanada catering page it would read as the product being served. |
| 44002 | Person taking a slice of pizza in a close up shot | Pepperoni pizza fills the frame, same reason. 6 s. |

Kept with a trim note (see `film/manifest.json`): 3450, use only the first 8 s because it loses focus after 9 s. 44012, start at 4 s so the pizza in the first 3 s never shows.

Search coverage: 15 Mixkit search or tag listing pages (dinner, sharing food, friends eating, office lunch, coworkers eating, coworkers break, business lunch, friends drinks, people eating table, hands sharing food, wood fire, oven, Paris, Paris night, rooftops), 34 item pages read once, 13 kept items read a second time, 20 files fetched. 34 = 20 Free + 14 Restricted. 20 downloaded = 13 kept + 7 rejected.

Not found on Mixkit as Free: a wood fired oven mouth (the oven results are pizza ovens and bakeries, and "Hot oven baking pizzas" shows pizza), a Paris dusk or blue hour street, Paris rooftops at dusk. The only Paris clips that pass are daytime.

## stills/ (Wikimedia Commons)

### Rejected after viewing at full size

| Candidate (Commons file) | Licence | Reason |
|---|---|---|
| Rue Condorcet - Paris IX (FR75) - 2026-01-27 - 1.jpg | CC BY-SA 4.0 | "A.P.C." (fashion brand) legible over two shops at full size. Its twin, ...- 2.jpg, passed and is kept. |
| Avenue Trudaine - Paris IX (FR75) - 2024-11-16 - 3.jpg | CC BY-SA 4.0 | A Tesla Model Y with its badge and a fully legible number plate in the middle of the frame. |
| P1150229 Paris IX avenue Trudaine rwk.jpg | CC BY 3.0 | BARCLAYS sign on the corner building. |
| Rue des Martyrs, Paris (25791654595).jpg | CC BY 2.0 | Shop signs including a NICOLAS wine shop sign and a lit pharmacy cross, and the back of a woman's head large in the foreground. |
| Rue Saint-Lazare & Rue des Martyrs (6285412184).jpg | CC BY 2.0 | "GROUPE DAVID IMMOBILIER", "davidimmo.com", a Banque Populaire sign, "Au Beau Verger", "La Rimaudière" and a parapharmacie sign, all legible. |
| P1150251 Paris IX square d'Anvers rwk.jpg | CC BY 3.0 | A legible "Organisons-nous! Je rejoins le ..." campaign poster, and a passer by in a Canada Goose parka with the patch showing. |
| Square d'Anvers @ Paris (33394367614).jpg | CC BY 2.0 | A couple sitting in the foreground, faces identifiable at full size. |
| Pigalle - 2025 - Accès de nuit 1.jpg | CC0 | Lit "ELAN" and "Station Relais Paris" shop signs, an advertising panel in the metro sign, and a man standing close by, identifiable. |
| Pigalle - 2025 - Accès de nuit 4.jpg | CC0 | KFC logos plainly visible across a corner shop, plus lit advertising panels. |
| Parque Saavedra 13.jpg (full frame) | CC BY 4.0 | A city bus with route number 45 and part of a rear advert at the right edge. **Kept after cropping** to the left 2800 px. |
| Street @ Paris (34235611635).jpg (full frame) | CC BY 2.0 | A PICARD sign and a cafe awning at the right. **Kept after cropping** to the left 2500 px. |

### Rejected at the thumbnail stage (640 px, not checked at full size)

| Candidates | Reason |
|---|---|
| Rue Condorcet 2021-06-27 1 and 2, 2024-11-16 1 and 2, P1280273 | Readable shop signs in every frame, seen in 2x enlarged thumbnails: LCL bank fronts (P1280273, 2021-06-27 2), a PHARMACIE sign (2021-06-27 2), a dark agency front with a lit screen (2021-06-27 1), "LAVERIE LIBRE SERVICE" and "CORE TRAINING" (2024-11-16 1), a restaurant sign "Koï" (2024-11-16 2). |
| Rue Martyrs 2021-06-27 1 and 2, 2026-04-06 1 and 2, F6874, F6878, P1150235, Rue des Martyrs juillet 2021, 17 May 2013 | Rue des Martyrs is a shopping street and every frame has shop signs, a pharmacy cross, scooters or no entry plates. One (17 May 2013) has a finger over the lens. No Rue des Martyrs still passed. |
| Place Pigalle 2021 1 to 4, 2023 1 and 2, 2025 1 and 2, P1150200, P1150201, CF4256, Paris 75009 Place Pigalle 20161029, Place Pigalle (31027260296), fountains May 2014 | The FOLIES PIGALLE lettering, club fronts, a Morris column with posters, a pharmacy sign, buses or crowds in every frame. |
| Avril 2026 place Pigalle series (5 files, CC0) | "PIGALLE" lettering of the Folies Pigalle at left, and dense crowds with faces close to camera. |
| Avenue Trudaine 2021-06-27 1 to 3, 2024-11-16 1 and 2, Avenue Trudaine Paris 9e, F6836, F6838, F6847, P1150253, P1150254 | Parked cars with plates, market stalls, vans and road signs. The spring median shot that's kept does the job better. |
| Square Anvers 2021-06-27 1 and 2, Square d'Anvers (34105284001), F6826, F6833, P1150249 | Gate and notice boards up close (F6826), a woman reading on a bench close up (F6833), a man walking down the centre of the path (2021 1 and 2), a planting close up (34105284001), a near duplicate of the kept P1150252 (P1150249). Weaker than the bandstand and Sacré-Cœur shots that are kept. |
| Avenida San Isidro Labrador, Avenida Goyeneche e Iberá, Ruiz Huidobro y Washington, Parque Saavedra 01, 03, 07, 09, 11 | Not shortlisted. The kept Saavedra set covers the park, the church and a street corner. Parque Saavedra 11 is a close up of grass. |

### Excluded for size (under 1100 px wide), not viewed large

Saavedra grd.jpg (316 px, CC BY 2.5 AR), Barrio Saavedra, 6 and 8, and Parque Sarmiento (1024 px, PD, 2007), Parque saavedra 02 and 05 (700 px, CC BY 2.5 AR, unknown author), Al atardecer... (576 px, PD), Rue des Martyrs (10177611465) (1024 px), Woman in the Storm (1024 px), Rue des martyrs Paris 2023 (958 px), Paris - Place Pigalle - panoramio (640 px).

### Gaps and licence doubts in stills/

- **Only one night or dusk still passed** (rue Condorcet at night, -2), and it's soft from motion blur. No Pigalle at dusk passed: both night candidates showed shop and fast food signage.
- **Credit is required on 11 of the 12 kept stills.** Only `pigalle-balconies-cc0` is CC0. Six are ShareAlike (CC BY-SA 2.0, 3.0 and 4.0), so an edited version of those photos must carry the same licence. The page using them needs a credits block, and the two crops must say "cropped".
- **Parque Saavedra 05 and 13 have no P275 statement** in Commons structured data. Their licence (CC BY 4.0) rests on the rendered File page, the raw wikitext (`{{self|cc-by-4.0}}`) and the Commons API, three sources that agree.
- **P1150252 (place d'Anvers)** is dual licensed GFDL and CC BY 3.0. Use it under CC BY 3.0.
- **Flickr imports** (Street @ Paris, Place Pigalle 25352270855, Paris IMG 4631) were passed by FlickreviewR on Commons (2017-04-24, 2018-10-01, 2019-11-16). The licence was read on Commons, not at Flickr.
- **Five kept stills are 1920 px renditions of larger originals** (Paris Balcons 3127 px, Kiosque square d'Anvers 3648 px, Place Pigalle 3772 px, P1150252 2100 px, Manzanares y Donado 2250 px). upload.wikimedia.org returned HTTP 429 for each original, and 2560 px isn't an allowed thumbnail step (HTTP 400). A later session can fetch the originals from `original_file_url` in the manifest.
- **The Commons API worked on four batched queries this time** (it 429'd twice and recovered after a 60 s wait). A Wikidata label lookup 429'd three times and was given up. The P275 labels were read from each File page's own data instead. A memory map tried first was wrong for Q19068220 (it's CC BY-SA 2.0 Generic), which is why it was dropped.
