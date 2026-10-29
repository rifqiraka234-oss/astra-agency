# Notes: what makes a dessert site feel exclusive (and still playful)

28 Oct 2026. This is research only, for the next Charlie's Desserts build after the founder's notes ("so basic", "more pictures, more exclusive, WOW", and earlier "it's not exclusive" and "the fonts look cheap"). It builds on `research/notes-17B-type-rivals.md` (the faces on 18 premium dessert sites) and does not repeat that font census. Here the questions are how the sites use photography, type scale, space, colour, buttons, menus and motion.

## 0. Counts, method, caveats

**Counts**
- I attempted 34 sites.
- **30 rendered** at both 1440x900 and 390x844.
- **1 rendered only in part.** On Pierre Hermé the 1440 hero video never decoded in headless Chrome (`videoWidth` 0 although `readyState` was 4), so the 1440 first screen is white. Its 390 view and its 1440 scroll steps rendered.
- **3 failed:**
  - Harrods food hall. https://www.harrods.com/en-gb/shopping/food-wine redirected to Wine & Spirits and painted a blank page. The home page then returned an Akamai "Access Denied" at 1440 (reference 18.937655f). The 390 view served only the general home page, so the food hall was never reached.
  - Venchi. https://www.venchi.com/ redirects client side to google.com, the same as in notes-17B.
  - Sugarfina. https://www.sugarfina.com/ returned HTTP 403 with a DataDome challenge. It was not attempted or bypassed.
- **Screens.** I saved 436 files in `C:\Users\RifqiRakamulya\Documents\Astra\charlie\_research\exclusive\shots\`:
  - 31 first screens at 1440 and 32 at 390.
  - 167 scroll steps at 1440 and 175 at 390. A step is one viewport height and I took up to 8 per page, step 0 being the first screen. Short pages end sooner.
  - 24 product-list pages at 1440.
  - 5 blocked-page shots and 1 hover shot.
- **Contact sheets:**
  - `_research\exclusive\exclusive-sheet-1440.png`: 30 first screens.
  - `_research\exclusive\exclusive-sheet-390.png`: 31 first screens, which adds Pierre Hermé at 390.
- **Review montages** (8 steps at both widths per site): `_research\exclusive\review\<slug>.jpg`.
- **Data and scripts:**
  - Raw JSON per site: `_research\exclusive\data\`.
  - Digest: `summary.json`.
  - Scripts: `_tools\research-exclusive\` (`probe.js`, `inpage.js`, `summarize.js`, `sheets.js`, `blankcheck.js`, `priceonly.js`).

**Method.** All numbers were measured at runtime in the installed Chrome, headless with GPU flags and playwright-core 1.64. Sites were spread over 4 parallel contexts. Pages ran in en-GB on a Europe/London clock. The machine is in the Netherlands, so some sites served an NL/EU store.

- **Hero type.** This is the largest live text node on the first screen. I record its computed `font-size`, the size as % of viewport width, weight, letter-spacing in em and line-height. The painted face comes from the DevTools call `CSS.getPlatformFontsForNode`.
- **Type baked into an image.** Where the hero headline is part of a picture, I say so. Any size given for it is estimated from the screenshot pixels and labelled.
- **Photography, type and empty ground.** I hit-tested a grid of points on each viewport step: 36x24 at 1440 and 13x28 at 390. Pointer events were forced on and I walked `elementsFromPoint` from the top.
  - A point counts as photo if it first reaches an `img`, `video`, `canvas` or a background image of 60px or more.
  - Opaque fills and the page background count as ground.
  - A point is "type" if it sits inside the rects of a visible text node.
  - Empty ground is ground with no type on it.
  - "First 8 screens" is the average over the 8 steps.
- **Photo census.** After a lazy-load scroll to the end of the page, I counted every unique photo of at least 100x100px, de-duplicated by URL. For each photo I recorded:
  - width as % of viewport width, and whether it is wider than 40% of the viewport or full bleed (97% or more);
  - corner radius and shape (square, rounded, circle, arch, masked), and any CSS tilt;
  - aspect ratio.
- **Cut-out test.** The 12 largest images were downloaded and read with sharp. "Cut-out" means 8% or more of the pixels are transparent. "On flat colour" means the border ring of the image has a standard deviation under 7.
- **Motion.**
  - The share of first-screen pixels that change between two shots 1.5 s apart.
  - Videos, CSS animation names, and libraries found (GSAP, Lenis, Swiper, Slick, marquee nodes, Lottie).
- **UI colours.** Ground, button fill and text colours across the first 8 screens. A ground colour counts if it covers at least 1.5% of the ground points, a fill at least 5% of the button points, and a text colour at least 3% of the text area. Colours within an RGB distance of 28 are merged. "Chromatic" means max minus min channel is 40 or more.
- **Buttons.** Every CTA-like control between 26 and 90px tall, classed by fill (filled, outline, text) and radius (square under 4px, rounded, pill at 45% of height or more).
- **Prices.** The first currency text outside the header and footer, plus the product name in the same card (the largest text there) and the card image. This was measured on the home page and on one product list at 1440 found from the nav. For Läderach and Jeni's I measured the list again with `priceonly.js` after widening the currency pattern.
- **Platform.** `window.Shopify.theme`, its schema name, and WordPress, Next.js and Salesforce markers. These are used as template evidence.

**Consent, overlays and age gates.**
- Cookie walls were declined wherever a decline control existed. Examples:
  - OneTrust "Reject all" (Hotel Chocolat, Magnum).
  - Cookiebot "Decline" (Tony's, Haribo).
  - Usercentrics "Deny" (Fortnum's).
  - Shopify "Decline" (Salt & Straw, Peggy Porschen, Biscuiteers).
  - Didomi "Continuer sans accepter" (Pierre Hermé).
  - Läderach "Reject all", Amorino "Refuser", Milk Bar "REJECT ALL COOKIES".
- Everything else was hidden with CSS for the shot: newsletter pop-ups (Jeni's, Cutter & Squidge, Biscuiteers, Lolli & Pops), country modals (Ladurée, Tony's, Fortnum's) and chat widgets.
- No age gate appeared. Nothing was logged into, typed or submitted.

**Measurement limits.**
- The first-screen photo share for Compartés (37.5%) is an undercount. Its three hero photos were mid fade-in when I hit-tested them, and the shot shows about 90% picture.
- Sketch London is a WebGL scene, so its "photo" share is canvas.
- Sketch and Cédric Grolet are single-screen sites.
- Omsom, Biscuiteers and Sketch scroll inside an inner container. That container was detected and scrolled.
- The Cédric Grolet hover state was captured because a scroll step left the mouse over "Saint-Tropez": `shots\cedricgrolet-1440-hover-saint-tropez.jpg`.

## 1. Per site

Values are given as 1440 / 390. Hexes are the clustered UI colours. n:p is product name size ÷ price size.

### Ladurée
| | |
|---|---|
| URL | https://laduree.com/en-uk/ (Shopify, custom theme "laduree-eshop"); list https://laduree.com/en-uk/collections/macarons-boxes |
| Hero type | "ADVENT CALENDAR" 74px = 5.14vw, Adobe Garamond Pro 400, caps, -0.03em, lh 0.9, white on video / 41.6px = 10.67vw, -0.02em |
| Faces | Adobe Garamond Pro (Adobe, Slimbach) + ShelleyAndante BT; 100% of counted characters are Garamond 400 |
| First screen | photo 94% / 93.1%, empty ground 3.6% / 1.6%, type 5.4% / 10.2% |
| First 8 screens | photo 42.9%, type 5.1%, empty 51.5% (390: 46.2 / 10.0 / 42.6) |
| Photos | 26 over 12.7 screens = 2.0 per screen; >40% vw 7 / 26; full bleed 5; all square corners; 19 portrait |
| Treatment | Full-bleed slow video hero. Macro macarons cropped past two frame edges. Boxes shot on cream (3 of the 10 largest images on flat colour, 1 cut-out) |
| Motion | 67.7% of first-screen pixels change in 1.5 s (video); Lenis smooth scroll; fade-in, fade-y-in |
| UI colours | 4, 1 chromatic: #fefbf4 cream ground, #2e2c2a text, #46413d price grey, #efdfbd |
| Buttons | 0px radius: 10 outline (1px #2e2c2a), 2 filled; Garamond 15–16px 400, +0.01–0.02em; caps on 4 of 13 |
| Prices / menu | 4 cols; tile 328x387 (aspect 1.18), image 85% of card, the box small in a cream field. Name "Intemporel" 16px 400 in quotes, price £42.00 15px 400 #46413d, n:p 1.07. No add button on the tile |
| Feels expensive because | One serif at one weight does everything, prices included, on cream with hairline 0px buttons, and a slow full-bleed film plus macarons cropped off the frame do the showing |
| Move for Charlie's | Set every menu price like Ladurée: the same face and almost the same size as the dessert name (n:p about 1.05), weight 400, muted purple-grey, centred, and no button inside the tile |

### Pierre Hermé (partial)
| | |
|---|---|
| URL | https://www.pierreherme.com/ (Magento); list https://www.pierreherme.com/fr/macarons.html |
| Hero type | 1440 over the undecoded video: "CALENDRIERS DE L'AVENT" 60px = 4.17vw, caps, Jost Light (declared FuturaLight) / 40px = 10.26vw |
| Faces | Jost (declared Futura), plus Open Sans and Montserrat loaded (notes-17B) |
| First screen | 1440 unmeasurable as a picture: 100% is the full-bleed video element, painted white here / 390 photo 66.5%, empty 24.2% |
| First 8 screens | 1440 (6 steps): photo 53.8%, type 11.3%, empty 37.2%; 390: 41.6 / 12.7 / 47.7 |
| Photos | 24 over 5.8 screens = 4.1 per screen; >40% vw 3 / 23; full bleed 3; square corners |
| Treatment | Category mosaic of products as jewels on pale grounds, labelled in caps on the photo (MACARONS, CHOCOLATS) |
| Motion | Video hero; Slick carousel; 109 elements with transitions |
| UI colours | Black, white, one rose accent in nav (visual) |
| Buttons | Square black filled, caps 13px +0.035em; pill r22 "JE COMMANDE" |
| Prices / menu | 3 cols; name "COFFRET DE MACARONS À COMPOSER" 18px 400 caps, price 27,00 € 18px 400, n:p 1.0; image 1:1 = 70% of card |
| Feels expensive because | Light-weight geometric caps, products lit like jewellery, and price and name at an identical size and weight |
| Move for Charlie's | Turn the six bases into Pierre Hermé category tiles: one photo each with the base name in caps on the photo, bottom left, not under it |

### Läderach
| | |
|---|---|
| URL | https://laderach.com/eu-en/; list https://laderach.com/eu-en/chocolate-advent-calendars |
| Hero type | "Just arrived: Christmas figurines" 80px = 5.56vw, Albra Sans (painted), 400, 0em, lh 1.0, white on photo / 40px = 10.26vw |
| Faces | Albra Sans display + Albra Grotesk text (BumBumType) |
| First screen | photo 82.6% / 71.7%, empty 13.7% / 17.9%, type 12.3% |
| First 8 screens | photo 41.0%, type 10.8%, empty 49.1% |
| Photos | 31 over 7.4 screens = 4.2 per screen; >40% vw 8 / 27; full bleed 4; 27 square, 4 rounded; 0 of the 11 largest are cut-outs |
| Treatment | Each section's product sits on one saturated set (red, bottle green). A sensory row of five macro tiles of hands breaking chocolate, each with one sense caption: "See the satin shine", "Feel the smooth, fine texture", "Smell the intense aromas", "Hear the distinctive snap" (`shots\laderach-1440-5.jpg`) |
| Motion | Static first screen (0.2%); Swiper |
| UI colours | 2: #ffffff and #000000. All colour comes from the photos |
| Buttons | 0px; 4 outline 1px, 4 filled; Albra Grotesk Medium 12px, no caps |
| Prices / menu | 4 cols; name "Advent Calendar Grand Selection" 16.5px 400 and price EUR 189.90 16.5px 400, same face, n:p 1.0; 1:1 images |
| Feels expensive because | A black-and-white interface that lets one coloured product set per section carry all the colour, and macro photographs used as a sensory menu |
| Move for Charlie's | A sense row from Charlie's own macro shots: "Hear the fizz" (p16 fizzy sweets), "Watch it drip" (their sauce), "Feel the crunch" (p11 spoon at the waffles), "Lift the foam" (p17 foam sweets on the shake) |

### Cédric Grolet
| | |
|---|---|
| URL | https://cedric-grolet.com/ |
| Hero type | Six lines "La chocolaterie / Paris / Saint-Tropez / Monaco / London / Singapore", 90px = 6.25vw, La Grolet (bespoke, Julie Soudanne) 400, white on black / 44px = 11.28vw |
| Faces | La Grolet + Akkurat (Lineto) |
| First screen | photo 0% / 0%, type 20.5% / 17.3%, empty 79.5% / 80.8% |
| First 8 screens | Single 900px screen, no scroll |
| Photos | 0 at rest. Hovering a city fills the whole screen with that shop's photograph behind the name, which turns to outline (`shots\cedricgrolet-1440-hover-saint-tropez.jpg`) |
| Treatment | Withheld photography, revealed on hover |
| Motion | None at rest |
| UI colours | 2: black, white |
| Buttons | None |
| Prices / menu | None |
| Feels expensive because | It refuses to sell: a bespoke typeface, six place names and no photo until you ask for one |
| Move for Charlie's | "Brighouse" and "Huddersfield" huge on dark purple. Hover or tap and that shopfront (awning, festoon bulbs, at dusk) fills the screen behind the outlined name |

### Dominique Ansel
| | |
|---|---|
| URL | https://www.dominiqueansel.com/ (WordPress, twentyseventeen child theme) |
| Hero type | Carousel caption 30px = 2.08vw, Proxima Nova Alt Bold, caps / 390 "ONLINE ORDERING" 20px = 5.13vw |
| Faces | Proxima Nova Alt + Libre Franklin + Inter |
| First screen | photo 66% / 55.5%, empty 29.5% / 35.2% |
| First 8 screens | 3 steps: photo 30.8%, type 10.1%, empty 57.9% |
| Photos | 8 = 2.6 per screen; >40% vw 2 / 6; square |
| Treatment | Boxed carousel with italic caps captions over overhead Cronuts; grey label bars under tiles |
| Motion | Carousel (37.3% of first-screen pixels change) |
| UI colours | 6, 1 chromatic (#408bd1 Instagram button) |
| Buttons | One rounded r4 |
| Prices / menu | None (shop is off-site) |
| Feels expensive because | On screen it doesn't. A famous chef in a stock theme, with a boxed carousel and grey label bars. The only premium cue is the overhead macro of Cronuts |
| Move for Charlie's | Take only the overhead spread: Charlie's p02 overhead spread run full bleed as a section break, never boxed |

### Fortnum & Mason (confectionery)
| | |
|---|---|
| URL | https://www.fortnumandmason.com/; list https://www.fortnumandmason.com/biscuits-chocolates |
| Hero type | No headline: two picture cards captioned "Last Chance for / *Halloween!*" in FM Fortnum Serif 20px, weight 300, roman and italic in one line |
| Faces | FM Fortnum Serif + FM Mason Sans (Colophon, bespoke) |
| First screen | photo 48% / 52.5%, empty 44.4% / 40.7% |
| First 8 screens | photo 38.7%, type 7.1%, empty 52.9% |
| Photos | 27 = 4.5 per screen; >40% vw 6 / 16; 10 circle-masked, 17 square |
| Treatment | A row of circle-cropped products as categories. In the list, every product is dressed on its own saturated set (orange, salmon stripes, plum) with props. An illustrated garland band |
| Motion | Static (0.6%) |
| UI colours | 5, 2 chromatic: eau de nil #64c5b7, #007373, #eee8e0 |
| Buttons | Pills r20–32 in eau de nil, serif 16px 300, +0.063em; 7 text links |
| Prices / menu | 4 cols; name 18px serif 300 centred, price 12,29€ 16px Mason Sans Bold, n:p 1.13; square images 65% of card |
| Feels expensive because | A house serif mixing roman and italic, one signature colour on every button, and each product photographed on its own coloured set |
| Move for Charlie's | The six bases (waffle, crêpe, cookie dough, shake, sundae, froyo) as a row of Fortnum circles, every circle on lilac |

### Amorino
| | |
|---|---|
| URL | https://www.amorino.com/nl (WordPress) |
| Hero type | "CREMINO *Al Gelato*", a didone plus script lockup inside the image, about 150px ≈ 10.4vw estimated from pixels. Live text: a curved serif marquee "ONTDEK AL ONZE PRODUCTEN", 26px Silver South Serif, riding a wave edge |
| Faces | Silver South Serif (Set Sail) + Avenir Next LT Pro |
| First screen | photo 70.8% / 72.3%, graphic 21.4% (the wave), empty 6.5% / 11.8% |
| First 8 screens | 4 steps: photo 32%, type 8.7%, empty 46.9% |
| Photos | 6 = 1.8 per screen; 3 of the 6 largest are cut-outs (drinks floating on white) |
| Treatment | A macro chocolate pour is the hero's architecture: it fills the left third and bleeds off three edges, on a paper texture |
| Motion | 29 marquee nodes, one running along a curve |
| UI colours | 5, 1 chromatic (#e9bc96 peach) |
| Buttons | Pills r30, Avenir 14px 500 caps |
| Prices / menu | None |
| Feels expensive because | The sauce itself is the layout, and a serif marquee bends along its edge |
| Move for Charlie's | Run a line of Charlie's flavour names along the curve of their own lilac drip, not in a straight ticker |

### Godiva
| | |
|---|---|
| URL | https://www.godiva.com/ (Shopify, "Made for Godiva"); list https://www.godiva.com/collections/chocolate-bars-and-snacks |
| Hero type | "DARK CHOCOLATE, PERFECTED." 64px = 4.44vw, Gotham Medium 500, caps, 0em / 36px = 9.23vw |
| Faces | Gotham (Hoefler & Co.) + Castoro |
| First screen | photo 82.5% / 65.4%, empty 15% / 28.3% |
| First 8 screens | photo 33%, type 7.6%, empty 59.4% |
| Photos | 34 = 4.1 per screen; >40% vw 4 / 34; all square |
| Treatment | Half-bleed still life (gold box on dark wood), products on cream, black-and-white heritage photo |
| Motion | Static; Swiper x4 |
| UI colours | 4, 1 chromatic: gold #dcc193, used only as the main CTA fill |
| Buttons | 0px; filled gold and 1px outline; Gotham 16px 700, caps +0.05em |
| Prices / menu | 4 cols; name 18px 700 caps +0.044em, price $58.00 18px 700, n:p 1.0, plus star ratings and ADD buttons |
| Feels expensive because | Gold appears exactly once, as the button on a dark still life. The product grid is mass market (bold prices, stars, ADD) |
| Move for Charlie's | Gold for one element type only: the order ticket turning gold and the "confirmed" stamp, never a background or a border |

### Patchi
| | |
|---|---|
| URL | https://patchi.com/en |
| Hero type | "Patchi" 48px = 3.33vw, Fenwick 500, on photo / 48px = 12.31vw |
| Faces | Fenwick + Roboto |
| First screen | photo 78% / 74.2%, empty 19.6% / 22.5% |
| First 8 screens | 6 steps: photo 30.8%, type 8.8%, empty 60.8% |
| Photos | 14 = 2.6 per screen; >40% vw 3 / 4; square |
| Treatment | Macro of chocolate blocks on slate; below that, small tiles and long 11–14px paragraphs in columns |
| Motion | Static; AOS |
| UI colours | 4, 2 chromatic: #143d34 deep green, #96ba92 sage |
| Buttons | One square filled green |
| Prices / menu | None |
| Feels expensive because | The first screen only: a macro chocolate block on slate with a dark green and sage palette. Below it the page turns into a brochure template |
| Move for Charlie's | The lesson is what not to do: no paragraphs in the first three screens. Give one line per photo, and put the long copy in the menu |

### Jeni's
| | |
|---|---|
| URL | https://jenis.com/ (Shopify, theme-store schema "Zest"); list https://jenis.com/collections/all |
| Hero type | "SPLENDID HOLIDAY" 52px = 3.61vw, Moderat 700, caps, +0.01em, in a cream box over the photo / 35px = 8.97vw |
| Faces | Moderat (TIGHTYPE) + Inter |
| First screen | photo 65.3% / 35.2%, empty 26.2% / 46.2% |
| First 8 screens | photo 44.2%, type 4.9%, empty 49.3% |
| Photos | 28 = 3.0 per screen; >40% vw 7 / 28; full bleed 1; 5 of the 12 largest on flat colour |
| Treatment | Overhead pints on white with tinsel props, lifestyle portrait, a line-drawn cone |
| Motion | Static; Swiper, AOS |
| UI colours | 4, 1 chromatic: #ff4612 orange |
| Buttons | 0px filled orange; Moderat 19px 700, caps +0.13em; all 12 CTAs in caps |
| Prices / menu | Name 20px 700, price $79.00 14px 500, n:p 1.43; images 1.25 portrait, 81% of card |
| Feels expensive because | One orange on every order button, wide-tracked caps, and pints shot from above with props |
| Move for Charlie's | One order colour taken from the awning stripe, on every order button and on nothing else |

### Van Leeuwen
| | |
|---|---|
| URL | https://vanleeuwenicecream.com/ (WordPress); list https://vanleeuwenicecream.com/product-category/van-leeuwen-ice-cream/classic-ice-cream/ |
| Hero type | "MANGO STICKY RICE" 48px = 3.33vw, Sofia Pro 700, caps, +0.031em, on a tan panel / 39px = 10vw, +0.038em |
| Faces | Sofia Pro (Mostardesign) |
| First screen | photo 31.5% / 24.2%, empty 53.5% / 47.3% |
| First 8 screens | photo 26.5%, type 9.7%, empty 60.4% |
| Photos | 21 = 4.0 per screen; >40% vw 2 / 19; **9 of the 12 largest are transparent cut-outs** |
| Treatment | Cut-out pints with scoops piled on top, each standing in front of a pastel arch. Shopfronts masked in arches. Pastel blocks divided by heavy black rules about 6px (`shots\vanleeuwen-1440-list.png`) |
| Motion | None |
| UI colours | 9, 4 chromatic, all pastels at a similar lightness (#a5e6d9, #ecd5e0, #e4bf93, #ffefc5, #b3c8e9) plus black |
| Buttons | Rounded r4 1px outline (nav), pills r36; all 14 caps |
| Prices / menu | No price on the category page. Each tile is a cut-out on an arch, ruled in black |
| Feels expensive because | Nine colours that behave as one because they share a lightness and are ruled in black like a print, and every pint cut out in front of the same arch |
| Move for Charlie's | Menu tiles with each dessert cut out in front of a scallop-topped arch (the awning's scallop) in lilac, pink or mint, the tiles divided by heavy purple rules |

### Salt & Straw
| | |
|---|---|
| URL | https://saltandstraw.com/ (Shopify, "MalterTech"); list https://saltandstraw.com/collections/all-flavors |
| Hero type | The hero lockup ("SALT & STRAW REWARDS") is inside the image. The largest live text is "Best Sellers", Bebas Neue 40px = 10.13vw at 390 |
| Faces | Bebas Neue, Inter, Newsreader (italic for flavour names) |
| First screen | photo 91.7% / 92.3%, empty 7.6% / 4.7% |
| First 8 screens | photo 69.9%, type 7.3%, empty 23.9% |
| Photos | 28 = 3.5 per screen; >40% vw 10 / 19; full bleed 7; 10 rounded; 3 of 11 cut-outs |
| Treatment | A red-and-white candy-stripe band with a torn edge between sections. Best sellers as overhead macro scoops masked in ovals about 288x360 (1:1.25), texture filling the whole oval, the flavour name set in Newsreader italic on a curved path round the top (`shots\saltandstraw-1440-1.jpg`) |
| Motion | 66.5% first-screen change (hero carousel); 32 marquee nodes; "rotating" |
| UI colours | 4, 1 chromatic: #f0483e |
| Buttons | Pills r70: "ORDER NOW" 2px red outline, Inter 20px 600 caps; Add to Cart pills 1px |
| Prices / menu | 3 cols; name 22px 600, price $15 12px 600 inside the Add to Cart button, n:p 1.83 |
| Feels expensive because | Macro texture in an oval with the flavour curved round it like a jar label, and one red |
| Move for Charlie's | Charlie's Creation, Biscoff, White Stars and Grimace as overhead oval crops of the real dessert, each name curved over its oval in lilac |

### Milk Bar
| | |
|---|---|
| URL | https://milkbarstore.com/ (Shopify, "Milk Bar"); list https://milkbarstore.com/collections/cakes |
| Hero type | "COZY VIBES, DELIVERED" 31.3px = 2.17vw, Garnett 700, caps / 22.5px = 5.77vw |
| Faces | Garnett (Sharp Type) + Pitch (Klim) for the ticker |
| First screen | photo 38.2% / 42.6%, empty 52.2% / 42% |
| First 8 screens | photo 33.1%, type 11.1%, empty 54.2% |
| Photos | 33 = 3.5 per screen; >40% vw 3 / 21; 29 of 33 rounded |
| Treatment | Cakes on flat olive or peach squares, rounded r10; the hot-pink box in photos |
| Motion | Ticker marquee; 4 videos; Slick |
| UI colours | 3, 0 chromatic (black, white, #ffefda). Pink exists only in the photographed packaging |
| Buttons | Rounded r10 black filled, caps 15px 700 |
| Prices / menu | 3 cols; name 16px 700 caps; price in the black button "ADD TO CART - $65" |
| Feels expensive because | Mostly it doesn't on screen. The headline is 2.2vw and the carousels are dense, so it reads as a store. The brand lives in the packaging photos |
| Move for Charlie's | One mono ticker line under the header (their flavour names in Fragment Mono, per notes-17B), the only place mono appears |

### Little Moons
| | |
|---|---|
| URL | https://littlemoons.com/ (WordPress) |
| Hero type | "mango & passionfruit" in the image, a magenta serif about 210–230px ≈ 15vw estimated from pixels. The halved mochi cut-out sits over the type |
| Faces | Gazpacho (Monotype) + Buenos Aires (Luzi Type) |
| First screen | photo 99.7% / 99.2% (the hero is one picture), empty 0.2% |
| First 8 screens | photo 34.8%, type 8.7%, empty 53.8% |
| Photos | 15 = 2.6 per screen; >40% vw 3 / 11; **9 of the 11 largest are cut-outs** |
| Treatment | A halved mochi (the cross-section) covering the middle of the word. Fruit halves breaking the frame edges. A text ring rotating round the cross-section ("INNER → CREAMY GELATO ICE CREAM • OUTER → SOFT MOCHI DOUGH"). A round "77 kcal per mochi" sticker and curved "VEGAN FRIENDLY" text. Mochi balls floating (`shots\littlemoons-1440-0.png`) |
| Motion | Static first screen (0%); small CSS loops: bounce, rotate, updown, wave-text |
| UI colours | 4, 3 chromatic in **one pink family**: #c93486, #efbed9, #e294bf |
| Buttons | Pills r24 magenta, Gazpacho 22px |
| Prices / menu | None (sold via retailers) |
| Feels expensive because | A single pink world, type at poster scale with the product cut out over it, and small orbiting details in place of interface |
| Move for Charlie's | The hero: Charlie's cookie dough with the star biscuit (p13) cut out over "Cookie Dough" at about 14vw in their purple, with the top hat perched on the C |

### Magnum
| | |
|---|---|
| URL | https://www.magnumicecream.com/uk/home.html (Unilever); list https://www.magnumicecream.com/uk/products.html |
| Hero type | Title "NEW Ⓜ SIGNATURE" is in the image. Live "Magnum Ice Cream UK" 41.6px = 2.89vw Helvetica 700 / 32px = 8.21vw |
| Faces | No webfont loaded: Helvetica, painting Arial |
| First screen | photo 55.3% / 22.8%, empty 37.7% / 50.8% |
| First 8 screens | 4 steps: photo 31.4%, type 5.6%, empty 62.6% |
| Photos | 13 = 3.3 per screen; >40% vw 2 / 12 |
| Treatment | Macro of bars lying in a swirl of chocolate; cracked shell close-ups |
| Motion | Static |
| UI colours | 7, 3 chromatic, gold #ca9954 on buttons and outlines |
| Buttons | 0px gold, caps +0.1em |
| Prices / menu | 3 cols; name 20px 500, "Buy from £ 4.24" 12.8px caps |
| Feels expensive because | The macro of the shell is luxurious. Everything around it is a corporate template in a system font |
| Move for Charlie's | A cheap font kills a luxe photo: verify the painted face on every heading (CDP, as in notes-17B) before showing the founder |

### Häagen-Dazs
| | |
|---|---|
| URL | https://www.haagen-dazs.co.uk/ (Next.js) |
| Hero type | "Bite into the Ultimate Treat" 40px = 2.78vw, Poppins 700 / 32px = 8.21vw |
| Faces | Poppins + Noto Sans (and six more families loaded: Galada, Agbalumo, Jost, Lato, Yellowtail, Lora) |
| First screen | photo 35.2% / 46.4%, empty 56.8% / 30.8% |
| First 8 screens | 3 steps: photo 31.9%, type 7.2%, empty 60.1% |
| Photos | 1 photo element of 100px or more counted (the rest are small tiles) |
| Treatment | Bar on a burgundy square panel, caramel swirl backdrops |
| Motion | Static |
| UI colours | 3, 2 chromatic: #97144f, #4d0624 |
| Buttons | 0px burgundy filled |
| Prices / menu | None |
| Feels expensive because | Only the burgundy. A 2.8vw Poppins headline and boxed half-screen panels read as a template |
| Move for Charlie's | Another lesson in what not to do: a 2–3vw bold geometric headline next to a boxed photo is exactly "basic". Go 5vw+ at weight 400, or 10vw+ in a playful face |

### Tony's Chocolonely
| | |
|---|---|
| URL | https://uk.tonyschocolonely.com/ (Shopify, "Tony's Theme"); list https://uk.tonyschocolonely.com/collections/all-chocolate |
| Hero type | "GO BIG:" 185.9px = 12.91vw, Chocolate letter (bespoke, Arjen Klinkenberg), 400, lh 0.85 / 100.8px = **25.85vw** |
| Faces | Chocolate letter + American Typewriter |
| First screen | photo 87.5% / 82.1%, type 25.8% / 32.1%, empty 8.6% |
| First 8 screens | photo 36.9%, **type 26.2%**, empty 38.7%; picture:type 1.4, the lowest of the set |
| Photos | 51 = 6.5 per screen; >40% vw 9 / 52; 10 masked |
| Treatment | Bars on saturated primaries; every list tile on its own primary |
| Motion | Static |
| UI colours | 5, 3 chromatic primaries: #eb0000, #ffed00, #006be1 |
| Buttons | 0px 2px black outline, American Typewriter 22px 700, lowercase |
| Prices / menu | Not captured by the probe |
| Feels expensive because | It is loud rather than luxe. The 13vw bespoke headline is brave, but 6.5 photos per screen and 26% type make a poster wall |
| Move for Charlie's | Allow one giant headline per page, Charlie's "What are you making?", at about 12vw desktop and 25vw phone, and keep everything else quiet |

### Hotel Chocolat
| | |
|---|---|
| URL | https://www.hotelchocolat.com/uk (Salesforce Commerce Cloud); list https://www.hotelchocolat.com/uk/c/chocolate |
| Hero type | "£20 OFF" 50px = 3.47vw, Gill Sans Nova 600 / 12.82vw |
| Faces | Gill Sans Nova only |
| First screen | photo 66.4% / 69.8%, empty 22.5% / 17% |
| First 8 screens | photo 48.4%, type 7.1%, empty 43.9% |
| Photos | 43 = 6.7 per screen; >40% vw 8 / 43; full bleed 6; 2 videos |
| Treatment | Product grids on cream; estate film (St Lucia landscape under the logo) at the foot |
| Motion | Static first screen; carousels |
| UI colours | 3, 0 chromatic (white, black, #f4ede3) |
| Buttons | 0px white filled; one pill outline |
| Prices / menu | 3 cols; name 16px 600, price £4.65 16px 600, n:p 1.0, plus strike prices, VIP prices and stars |
| Feels expensive because | The black and cream palette and the estate film. The promo hero and 6.7 photos per screen undo it |
| Move for Charlie's | End the page the way Hotel Chocolat ends: one full-bleed picture with the logo on it. For Charlie's that is the shopfront at dusk under the awning and festoon bulbs |

### Smith & Sinclair
| | |
|---|---|
| URL | https://www.smithandsinclair.com/ (WordPress); list https://www.smithandsinclair.com/shop/ |
| Hero type | "Fresh Stock Is Coming!" 64px = 4.44vw, declared Gill Sans but **painted Open Sans** (fallback), 600 / 40.3px |
| Faces | InterFace + Gill Sans Nova + Open Sans |
| First screen | photo 27.1% / 24.7%, type 21.1%, empty 49.8% |
| First 8 screens | photo 21%, type 11.6%, empty 64% |
| Photos | 24 = 3.6 per screen; >40% vw 1 / 12 |
| Treatment | Packs on teal, lips sticker, "EAT • REPEAT • BITE • STIR" marquee band |
| Motion | 14 marquee nodes, slow-rotate |
| UI colours | **12, 7 chromatic**, the most in the set |
| Buttons | Pills, yellow #edce39, "Buy now \| £8,36" |
| Prices / menu | Price inside the yellow pill |
| Feels expensive because | It doesn't: 12 colours, and a hero set in a fallback font |
| Move for Charlie's | Another warning: a hero painted in a fallback face is what "the fonts look cheap" looks like. Self-host Charlie's faces and preload the display file |

### Sketch London
| | |
|---|---|
| URL | https://sketch.london/ |
| Hero type | No headline. Patterned 3D cubes, spheres and a candy-striped cylinder drift over a pink dotted plane; scrolling changes the scene ("sketch shop", "the Parlour") |
| Faces | MAD Sans Fill + MAD Serif Fill (Colophon) |
| First screen | 99.9% / 99.2% canvas (WebGL) |
| First 8 screens | 2–3 scenes in an inner scroller |
| Photos | 0 |
| Treatment | A rendered room in place of photography |
| Motion | GSAP; 19.8% / 24.8% of first-screen pixels change in 1.5 s (slow drift) |
| UI colours | 1 (#000 text); colour lives in the scene |
| Buttons | One square 1px outline "RESERVATIONS & MENUS" 18px; the rest text |
| Prices / menu | None |
| Feels expensive because | The site is a room you enter. The interface shrinks to a script logo, one outlined button and an address line |
| Move for Charlie's | On the first screen keep the interface to the logo, one outlined "Order" button and the Brighouse address with hours. Everything else is the dessert |

### Omsom
| | |
|---|---|
| URL | https://omsom.com/ |
| Hero type | "PROUD + LOUD ASIAN FLAVORS" 42px = 2.92vw, Gopher, inside a yellow starburst sticker on a full-bleed photo / "RIP-AND-POUR" 64px = **16.41vw** |
| Faces | Gopher, Tandelle, Gosha Sans, Calibrate |
| First screen | photo 100% / 64.3%, empty 0% / 21.7% |
| First 8 screens | photo 71.8%, type 9.7%, empty 20% |
| Photos | 20 = 3.3 per screen; >40% vw 10 / 10; full bleed 5; 8 of 12 cut-outs |
| Treatment | Hands lifting noodles with chopsticks, at the moment of lifting; cut-out packs on swirl patterns; starburst stickers |
| Motion | Static |
| UI colours | 3, 2 chromatic: #fd5225, #aceb9f (+ #f7f3da) |
| Buttons | None; stickers act as links |
| Prices / menu | None on the home page |
| Feels expensive because | Food caught mid-lift, full bleed, three colours, and stickers in place of buttons |
| Move for Charlie's | Charlie's fork lifting cookie dough (p08) full bleed, with its menu price on a scallop-edged sticker (the awning scallop) in place of a button |

### Graza
| | |
|---|---|
| URL | https://www.graza.co/ (Shopify, "baggy"); list https://www.graza.co/collections/all |
| Hero type | "Extra Virgin Olive Oil makes everything better." 72px = 5vw, ITC Garamond Condensed 400, -0.03em, on a full-bleed video / 46px = 11.79vw, -0.031em |
| Faces | ITC Garamond Condensed + GT Alpina Typewriter + Apercu |
| First screen | photo 98.4% / 97.3%, empty 0% |
| First 8 screens | photo 34.6%, type 6.2%, empty 53.7%, illustration 7% |
| Photos | 23 = 2.4 per screen; >40% vw 6 / 22; 21 rounded; 10 autoplay videos |
| Treatment | Macro of bread, oil and ham full bleed; bottles on stone; a thin line-drawn olive mascot in empty cream space; a GRAZA wordmark spanning the full width |
| Motion | 50.9% / 47.2% first-screen change (video); Lottie; 12 marquee nodes; CSS animations named drip-1, drip-2, blink |
| UI colours | 3, 1 chromatic: chartreuse #d1e030, cream #fff4ec, olive #3c422e |
| Buttons | 13 text links, 1 filled; typewriter labels |
| Prices / menu | 4 cols; name "“The Trio”" 20px Typewriter 500, price in the link "Add – $45" 14px; images 1.33 portrait, 80% of card |
| Feels expensive because | A condensed serif at weight 400 with tight tracking over full-bleed macro, three colours, and the mascot drawn as a fine line in empty space |
| Move for Charlie's | Charlie's top hat as a thin line drawing living in the empty cream margins (tipping at each section start), plus one full-width CHARLIE'S wordmark near the foot |

### Fishwife
| | |
|---|---|
| URL | https://eatfishwife.com/ (Shopify, theme-store schema "Blockshop") |
| Hero type | "Meet the Fishwife Advent Calendar!" 48px = 3.33vw, Recoleta 500, in a cream box / 30px = 7.69vw |
| Faces | Recoleta (Latinotype) + Albert Sans |
| First screen | photo 75.5% / 47.8%, empty 15.6% / 33.8% |
| First 8 screens | photo 31%, type 9%, empty 58% |
| Photos | 28 = 3.8 per screen; >40% vw 7 / 25; 17 rounded |
| Treatment | Illustrated tins on red, small illustrated spot icons over one-line captions, a comparison table |
| Motion | Static |
| UI colours | 6, 2 chromatic: #fdcd62, #397cc0 (+ mint #c7e0c3) |
| Buttons | Pills r70 yellow, Recoleta 18px 700 |
| Prices / menu | Not captured |
| Feels expensive because | A soft serif and illustrated packaging make a pantry tin collectible. It is close to busy |
| Move for Charlie's | Small drawn icons (hat, drip, bulb) above one-line captions for "Birthdays", "Celebrations", "Date nights" |

### Haribo
| | |
|---|---|
| URL | https://www.haribo.com/en-gb |
| Hero type | "Working at HARIBO" 60px = 4.16vw, VAG Rounded 700 / 32.3px |
| Faces | VAG Rounded |
| First screen | photo 84.3% / 70.1%, empty 14.6% / 27.5% |
| First 8 screens | 5 steps: photo 43.5%, type 6.5%, empty 50.1% |
| Photos | 7 = 1.5 per screen; 3 blob-masked |
| Treatment | Blob masks on green and blue fields |
| Motion | Flickity |
| UI colours | 6, 4 chromatic (yellow, two blues, red) |
| Buttons | Text links with squiggle arrows |
| Prices / menu | None |
| Feels expensive because | It doesn't: a careers hero, four primaries, generic blobs |
| Move for Charlie's | If a photo gets masked, mask it in Charlie's drip silhouette, never a generic blob |

### Lolli and Pops
| | |
|---|---|
| URL | https://www.lolliandpops.com/ (Shopify, theme "Copy of new swedish style store#1651", schema "Local"); list https://www.lolliandpops.com/collections/bulk-candy-shop-all |
| Hero type | Hero copy in the image/banner; largest live text 16px nav; 390 "Best Sellers" 23.3px = 5.98vw |
| Faces | Grold Rounded |
| First screen | photo 58.3% / 40.7%, empty 36.1% / 47% |
| First 8 screens | photo 40.4%, type 3.5%, empty 55.4% |
| Photos | 26 = 3.9 per screen; >40% vw 5 / 15 |
| Treatment | Candy in bowls on salmon, store interior with jar wall |
| Motion | Static |
| UI colours | 6, 4 chromatic (aqua #c9f1f2, teal #005153, #138487, brown-gold #84754e text) |
| Buttons | Pills r30, 1px teal outline |
| Prices / menu | Name 25.5px 700, price $13.95 17px 400, n:p 1.5 |
| Feels expensive because | It doesn't: a boxed banner hero, small type, a theme-store layout |
| Move for Charlie's | Avoid its look: a candy shop in a stock theme reads as a market stall. Make Charlie's sweets macro (p16) the picture, not bowls on a banner |

### Dylan's Candy Bar
| | |
|---|---|
| URL | https://www.dylanscandybar.com/ (Shopify, schema "Dawn", Shopify's default theme) |
| Hero type | "HAPPY HALLOWEEN" in the image; live 32px "FEATURED COLLECTIONS" Lato 900 |
| Faces | Lato |
| First screen | photo 78.8% / 84.6%, empty 18.2% / 12.1% |
| First 8 screens | photo 50.7%, type 3.4%, empty 45.1%; picture:type 14.9 |
| Photos | 34 = 5.5 per screen; 5 masked |
| Treatment | Prop-heavy set (jars, skulls, cauldrons) |
| Motion | Static |
| UI colours | 5, 2 chromatic (#6a4e99, #f599bb) |
| Buttons | None meaningful |
| Prices / menu | 4 cols; name 16px 600, price $10.00 16px 400 |
| Feels expensive because | It doesn't: the default theme, Lato, and a hero so full of props that nothing is the hero |
| Move for Charlie's | One dessert per frame. Never all six bases in one shot on the first screen |

### Peggy Porschen
| | |
|---|---|
| URL | https://www.peggyporschen.com/ (Shopify, schema "Atlantic"); list https://www.peggyporschen.com/collections/cupcakes |
| Hero type | Logo then mosaic; "Fall into Autumn" 60px = 4.17vw, Playfair Display 400 |
| Faces | Playfair Display + Figtree + GT Standard |
| First screen | photo 27.5% / 62.9%, empty 64.8% / 29.7% |
| First 8 screens | photo 43%, type 4.6%, empty 52.3% |
| Photos | 11 = 1.1 per screen, but each is a 4–6 photo mosaic; >40% vw 10 / 11 (median 50% vw) |
| Treatment | Pink cakes with flowers on pink, matched pastel mosaics |
| Motion | 12 marquee nodes |
| UI colours | 3, 2 chromatic: #ed80a8, #f9edf5 (text #986769) |
| Buttons | 0px pink filled, caps +0.067em |
| Prices / menu | 3 cols; name 18px Playfair 400 caps, price "£6.80 - £38.00" 14px Figtree, n:p 1.29; image 84% of card |
| Feels expensive because | One pink, Playfair at 400 and photos chosen so every cake matches. It tips into busy because each image is a collage |
| Move for Charlie's | Choose photos by colour, so a section is one hue family (the lilac section only shows lilac or white desserts) |

### Bompas & Parr
| | |
|---|---|
| URL | https://bompasandparr.com/ (WordPress) |
| Hero type | "GASTROLABE" in the image (red display serif on night blue); caption 20px Ivy Ora Display |
| Faces | Ivy Ora Display + Gill Sans |
| First screen | photo 100% / 97.5% |
| First 8 screens | photo 65.9%, type 1.5%, empty 32.9%; picture:type 43.9, the highest of the set |
| Photos | 133 over 27.8 screens = 4.8 per screen; >40% vw 14 / 77; 17 videos |
| Treatment | Dark theatrical stills, each lit like a stage; neon gradient frames that float and wander |
| Motion | CSS animations named float, wander, showImage |
| UI colours | 2: black, white |
| Buttons | None; captions are the links |
| Prices / menu | None |
| Feels expensive because | It is theatre: a dark page, fine display-serif captions, every image lit like a set |
| Move for Charlie's | Charlie's "theatrical" brief done properly: a single dessert lit on near-black, framed by a slow wandering lilac-to-purple gradient like a curtain |

### Cutter & Squidge
| | |
|---|---|
| URL | https://cutterandsquidge.com/ (Shopify, custom); list https://cutterandsquidge.com/collections/birthday-cakes-for-her |
| Hero type | "Made just for them" in the image; largest live text 18px announcement |
| Faces | Brandon Grotesque + P22 Mackinac |
| First screen | photo 50% / 35.7%, empty 41.2% / 53% |
| First 8 screens | photo 32.9%, type 7.3%, empty 57.3% |
| Photos | 18 = 1.6 per screen; >40% vw 7 / 28 |
| Treatment | Brownie boxes on orange, an occasions row (Birthday, Diwali, Christmas, Thank you) |
| Motion | Static |
| UI colours | 4, 1 chromatic: #ff7b42 |
| Buttons | Text only |
| Prices / menu | 3 cols; name 18px Mackinac 500, price £62.99 20.3px 500, n:p 0.89 (the price is bigger than the name) |
| Feels expensive because | The Mackinac serif and the blush and orange. A 13-link coloured nav and a baked hero cancel it |
| Move for Charlie's | An occasions row with one photo per occasion, using their own words: BIRTHDAYS, CELEBRATIONS, DATE NIGHTS |

### Compartés
| | |
|---|---|
| URL | https://compartes.com/ (Shopify); list https://compartes.com/collections/chocolate-bars-premium |
| Hero type | A triptych of tall photos with italic captions: "Chocolate Advent Calendars" 31px = 2.15vw, Kepler Std Display 400, -0.01em / 24px = 6.15vw |
| Faces | Kepler Std (Adobe) + Bickham Script + Optima + Figtree |
| First screen | hit-test 37.5% (photos mid fade-in), about 90% by eye / 28.6%; empty 57.9% / 55.5% |
| First 8 screens | photo 32.1%, type 5.6%, empty 58% |
| Photos | 39 = 3.6 per screen; >40% vw 4 / 39; all square; 24 portrait |
| Treatment | Editorial still lifes on dark tables; a "Morning to midnight" sequence (gift boxes in the morning, dipped classics in the afternoon, truffles at night); oxblood sections |
| Motion | Static; content fade-in |
| UI colours | 5, 1 chromatic: oxblood #551c25, dark browns #1a1612 and #31261d, cream; **gold #e6cd8f used only for prices on oxblood** |
| Buttons | 5 text links, 1 square filled, 1 outline |
| Prices / menu | Home: name 16px 400, price $120 13px Figtree 400 in gold on oxblood; list 4 cols, $12 13px 400 |
| Feels expensive because | Dark editorial still lifes, italic serif captions, and small prices in gold |
| Move for Charlie's | A "12 PM to 10 PM" menu by hour (their Brighouse hours): waffles at noon, shakes at four, sundaes at nine |

### Biscuiteers
| | |
|---|---|
| URL | https://www.biscuiteers.com/en-eu (Shopify, schema "Horizon", theme store #2481); list https://www.biscuiteers.com/en-eu/collections/birthday-biscuits |
| Hero type | "Don't miss the last Halloween biscuit post!" 40px = 2.78vw, Baskervville 400 on a full-bleed photo / 40px = 10.26vw |
| Faces | Baskervville / Libre Baskerville + GT Standard |
| First screen | photo 78.7% / 78.3%, empty 19% / 7.7% |
| First 8 screens | photo 33.2%, type 9.7%, empty 56.4% |
| Photos | **92 = 13.5 per screen**, the densest; >40% vw 4 / 87 |
| Treatment | Overhead tables of hand-iced biscuits; **scalloped pink section edges** |
| Motion | 54.4% first-screen change (video) |
| UI colours | 3, 1 chromatic: #e679a5 |
| Buttons | Pills r30 pink, Baskervville 16px |
| Prices / menu | 3 cols; name 16px, price €57,75 14px 400, n:p 1.14; image 82% of card |
| Feels expensive because | The overhead hand-made still lifes and the scallop edges. 13.5 photos per screen and pop-ups pull it down |
| Move for Charlie's | The awning's scallop as the bottom edge of the hero and of the menu header, twice per page at most |

### Failed
| Site | URL | Why |
|---|---|---|
| Harrods food hall | https://www.harrods.com/en-gb/shopping/food-wine then https://www.harrods.com/en-gb/ | Run 1: redirected to Wine & Spirits and painted blank (pixel standard deviation 0) at both widths. Run 2: 1440 got an Akamai "Access Denied" page; 390 served only the general home page. The food hall was never reached. Not retried around the block |
| Venchi | https://www.venchi.com/ | Client-side redirect to https://www.google.com/ at both widths (also in notes-17B) |
| Sugarfina | https://www.sugarfina.com/ | HTTP 403, DataDome challenge, at both widths in run 2 |

## 2. Synthesis: exclusive and playful at once

I put the 30 rendered sites in three groups by eye, with the reasons in section 3:

- **Luxe**: Ladurée, Cédric Grolet, Compartés, Godiva, Patchi (and Pierre Hermé, partial).
- **Playful and premium (the target)**: Little Moons, Graza, Van Leeuwen, Salt & Straw, Fortnum & Mason, Amorino, Läderach, Omsom, Sketch, Bompas & Parr, Fishwife, Jeni's.
- **Playful or store-like but not premium**: Tony's, Haribo, Dylan's, Lolli and Pops, Smith & Sinclair, Milk Bar, Cutter & Squidge, Biscuiteers, Peggy Porschen, Dominique Ansel, Hotel Chocolat, Häagen-Dazs, Magnum.

Medians are per group. Live-text heroes are counted only where the headline is real text.

### 2.1 Type scale
- **Luxe display size.** The live serif and luxe heroes (Ladurée 74, Läderach 80, Cédric Grolet 90, Graza 72, Godiva 64) are 64–90px at 1440, which is 4.4–6.3vw (median 5.1vw). At 390 they are 36–46px, which is 9.2–11.8vw (median 10.7vw).
- **Luxe display style.** Weight 400 (Godiva 500). Tracking 0 to -0.03em (Ladurée -0.03, Graza -0.03). Line-height 0.85–1.0.
- **Playful-bold caps** are smaller, heavier and tracked out: Jeni's 52px (3.6vw) at 700, +0.01em, and Van Leeuwen 48px (3.3vw) at 700, +0.031em. The CTAs go wider still: Jeni's buttons are +0.13em caps.
- **Poster moments, once per page:**
  - Tony's 186px = 12.9vw on desktop and 25.9vw on phone.
  - Little Moons about 15vw (in the image).
  - Amorino about 10.4vw (in the image).
  - Omsom 16.4vw on phone.
  - Graza's full-width wordmark.
- **The template band is 2.1–2.9vw:** Dominique Ansel 30px (2.08vw), Milk Bar 31px (2.17vw), Häagen-Dazs and Biscuiteers 40px (2.78vw), Magnum 41.6px (2.89vw). A first build with a 2–3vw bold headline sits squarely in this band.
- **Hero size ÷ body size:**
  - Luxe 4.6–4.8: Ladurée 74/16, Läderach 80/16.5.
  - Target median 3.6.
  - Template group median 2.9; Dominique Ansel 1.7, Milk Bar 2.1, Häagen-Dazs 2.5, Magnum 2.6.
- **One family, one weight is the luxe default.** Every counted character on Ladurée is Garamond 400. Läderach uses the Albra family only, Hotel Chocolat Gill Sans Nova only.
- **What "cheap fonts" look like in the wild:**
  - Smith & Sinclair's hero declares Gill Sans and paints Open Sans.
  - Magnum loads no webfont and paints Arial.
  - Dylan's runs on Lato in the default theme.
  - Häagen-Dazs loads 8 families and uses Poppins.

### 2.2 Picture : type : ground
- **The first screen is the clearest difference.** Median photo share of the first screen:
  - target 87% (range 31.5–100),
  - luxe 78%,
  - template group 58%.
- **Empty ground on the first screen:**
  - target 7%,
  - luxe 20%,
  - template group 36% (a boxed photo sitting on ground).
- **Over the first 8 screens the groups look alike.** Photo is 32–40%, type 5–11% and empty ground 49–59%; picture:type medians are 5.5 (target), 4.3 (luxe) and 4.5 (template). Exclusive sites are not "more pictures everywhere". They are a full picture first, then air.
- **Photos per viewport height:**
  - luxe median 2.6 (Ladurée 2.0, Cédric Grolet 0),
  - target 3.4,
  - store tells 5.5–13.5 (Dylan's 5.5, Tony's 6.5, Hotel Chocolat 6.7, Biscuiteers 13.5).
- **Big photos.** Photos wider than 40% of the viewport at 1440: target median 6.5, the other two groups 4. At 390 almost every photo passes 40% (Ladurée 26/26, Godiva 34/34, Jeni's 28/28).

### 2.3 How macro food photography is cropped
- **Bleed.** The subject is cropped past at least two frame edges and fills the frame. You never see the plate rim:
  - Ladurée macarons;
  - Läderach hands breaking chocolate (5 tiles of about 300x175);
  - Graza's bread and oil;
  - Amorino's pour, a third of the hero bleeding off three edges;
  - Magnum's cracked shell.
- **Overhead macro goes into an oval or a circle.** Salt & Straw's ovals are about 288x360 (1:1.25), with texture to the oval edge and the name curved over the top. Fortnum's uses 10 circle crops.
- **Cross-sections are cut out and float over type.** Little Moons' halved mochi covers about a third of the hero and sits over 15vw type.
- **Cut-outs** (transparent PNG among the 12 largest images) are the playful-premium tool:
  - Van Leeuwen 9/12, Little Moons 9/11, Omsom 8/12, Amorino 3/6, Salt & Straw 3/11;
  - the luxe sites shoot on set instead: Ladurée 1/10, Läderach 0/11, Compartés 0/12, Godiva 0/12.
- **Corners:**
  - Luxe photos are square-cornered: Ladurée 26/26, Godiva 34/34, Compartés 39/39, Läderach 27/31.
  - Rounded corners belong to the playful DTC sites: Milk Bar 29/33, Graza 21/23, Fishwife 17/28.
  - No site tilts photos with CSS (0 of 30).

### 2.4 Menus and product lists
- **Luxe:**
  - The name is about the same size as the price: n:p 1.0–1.13 (Läderach 1.0, Pierre Hermé 1.0, Ladurée 1.07, Fortnum's 1.13).
  - The price is weight 400, in the same family as the name (Ladurée, Läderach, Pierre Hermé), in a muted colour (Ladurée #46413d; Compartés gold on oxblood).
  - There is no add button inside the tile.
  - 4 columns at 1440 (Ladurée, Läderach, Fortnum's, Compartés), with the image 65–85% of the card.
  - At Ladurée the product sits small in a large cream field.
- **Store tells:**
  - Bold prices at 600–700: Godiva 700, Hotel Chocolat 600, Salt & Straw 600, Milk Bar 700.
  - The price inside "Add to cart": Milk Bar, Salt & Straw, Graza, Smith & Sinclair.
  - Stars, strike-through prices and VIP prices: Godiva, Hotel Chocolat.
  - n:p of 1.4–1.8 (Jeni's 1.43, Lolli 1.5, Salt & Straw 1.83), or a price bigger than the name (Cutter & Squidge 0.89).

### 2.5 Colour restraint
- **Clustered UI colours:**
  - luxe median 4 (2–5) with 0–2 chromatic;
  - target median 4 with 1 chromatic (range 0–4);
  - template group median 5 (3–12), up to 7 chromatic (Smith & Sinclair 12/7).
- **Black and white only.** Läderach, Cédric Grolet and Bompas & Parr use 2 UI colours; Sketch uses 1. All the colour comes from the pictures.
- **Playful-premium gets "playful" from one hue family plus neutrals:**
  - Little Moons: 3 pinks and white.
  - Graza: chartreuse, olive and cream.
  - Fortnum's: eau de nil.
  - Jeni's: one orange.
  - Salt & Straw: one red.
  - Van Leeuwen's 9 colours work only because they share one pastel lightness and are ruled in black.

### 2.6 Gold and foil
- **Gold in the interface** shows up at 4 of 30 sites, always on one element type and never as a ground:
  - Godiva: #dcc193 as the main CTA fill only.
  - Magnum: #ca9954 on button outlines and fills.
  - Compartés: #e6cd8f for prices on oxblood.
  - Lolli and Pops: #84754e text.
- **Everywhere else foil lives in the photographed product:** Ladurée's gold ribbons and stars, Godiva's gold box, Fortnum's gilded tins.

### 2.7 Motion pacing
- **First-screen pixel change over 1.5 s is above 10% at only 6 of 30 sites:**
  - Ladurée 67.7 (one slow full-bleed video),
  - Salt & Straw 66.5 (carousel),
  - Biscuiteers 54.4 (video),
  - Graza 50.9 (autoplay video),
  - Dominique Ansel 37.3 (carousel),
  - Sketch 19.8 (WebGL drift).
  All the rest are about 0.
- **Libraries are rare.** Smooth scroll appears at one site (Ladurée, Lenis) and GSAP at one (Sketch).
- **Playful-premium motion is small ambient CSS loops:**
  - Little Moons: bounce, rotate, updown, wave-text.
  - Graza: drip-1, drip-2, blink.
  - Marquees: Amorino 29 nodes, Salt & Straw 32, Graza 12.
- **The rule.** Either one slow full-bleed loop or a still first screen, plus tiny loops for character. A first-screen carousel reads as a store (Dominique Ansel, Salt & Straw, Hotel Chocolat).

### 2.8 Buttons
- **Luxe default is square, 0px radius:**
  - Ladurée 12 of 13, Läderach 8 of 9, Godiva 4/4, Peggy Porschen 2/2.
  - Compartés, Patchi and Hotel Chocolat have only square boxes; their other CTAs are text links or one pill.
  - Mostly 1px outline: Ladurée has 10 outlines.
- **The fewest buttons is the most exclusive:** Cédric Grolet 0, Bompas & Parr 0, Sketch 1 outline, Graza 13 text links and 1 box.
- **The playful-premium signature is one pill style in one colour, used everywhere:**
  - Fortnum's eau de nil, r20–32;
  - Little Moons magenta, r24;
  - Fishwife yellow, r70;
  - Salt & Straw red outline, r70;
  - Amorino and Biscuiteers, r30.

### 2.9 The rules in one paragraph
Fill the first screen with one picture (85%+ photo, under 10% empty ground). Set one headline at 5–6vw and weight 400 (10–12vw on the phone), or once per page at 12–15vw in the playful face. Then give the page air: about 50% empty ground over the first 8 screens, 2.5–3.5 photos per screen, and at least 6 photos wider than 40% of the viewport. Crop macro past two edges, put overhead shots in ovals, and cut out the cross-sections. Use 4 UI colours with 1 chromatic family, and gold on one element type only. Prices are at name size and weight 400 with no button in the tile. Buttons are square outline or one consistent pill. Motion is one slow loop or none, plus small CSS loops, with no carousel on the first screen.

## 3. Who manages playful AND premium, and who looks like a template

- **Playful and premium (the target):**
  - **Little Moons**: one pink family, 15vw type with a cut-out over it.
  - **Graza**: condensed serif at 400, 3 colours, line-drawn mascot.
  - **Fortnum & Mason**: house serif, eau-de-nil pills, products on coloured sets.
  - **Van Leeuwen**: cut-outs in front of arches, black rules.
  - **Salt & Straw**: oval macro with curved names, stripe band.
  - **Amorino**: the pour as layout.
  - **Läderach**: black and white interface, sensory macro.
  - **Omsom**: mid-lift food, stickers in place of buttons.
  - **Sketch London**: a room you enter.
  - **Bompas & Parr**: theatre.
  - Near-misses: **Jeni's** and **Fishwife**.
- **Premium but not playful:** Ladurée, Cédric Grolet, Compartés, Pierre Hermé, Godiva, Patchi (first screen only).
- **Look like templates or stores** (with the evidence):
  - **Dominique Ansel**: WordPress twentyseventeen child theme, 2.08vw headline.
  - **Dylan's**: Shopify schema "Dawn", Shopify's default theme; Lato.
  - **Lolli and Pops**: theme "Copy of new swedish style store#1651", schema "Local".
  - **Biscuiteers**: schema "Horizon", theme store #2481; 13.5 photos per screen.
  - **Peggy Porschen**: schema "Atlantic"; collage tiles.
  - **Häagen-Dazs**: 2.78vw Poppins; 8 families loaded.
  - **Magnum**: system Arial.
  - **Hotel Chocolat**: Salesforce Commerce Cloud grid; 6.7 photos per screen; promo hero.
  - **Smith & Sinclair**: 12 colours; fallback font in the hero.
  - **Milk Bar**: 2.17vw hero; dense carousels.
  - **Cutter & Squidge**: 13-link coloured nav; baked hero.
  - **Haribo**: corporate.
- **A theme is not destiny.** Jeni's ("Zest") and Fishwife ("Blockshop") also run theme-store themes and do not look templated.
- **What reads as template is a combination:** a hero of 3vw or less, 5 or more photos per screen, bold prices in buttons, more than 5 UI colours, and a first-screen carousel.

## 4. Ten moves for Charlie's (their material only)

1. **Poster hero** (Little Moons):
   - Cut out the cookie dough with the star biscuit (p13) and lay it over "Cookie Dough" set at about 14vw desktop and 25vw phone, in their purple.
   - The top hat perches on the C, the way it sits on the C of their logo.
   - The first screen is 85% or more picture plus type, never a boxed photo.
2. **Menu prices** (Ladurée, Läderach):
   - The price is in the same face as the dessert name, at n:p 1.0–1.1, weight 400, muted purple-grey, centred under the name.
   - No add button inside the tile.
   - 4 columns at 1440 and 2 at 390, with the photo 80% or more of the tile.
3. **Menu tiles** (Van Leeuwen):
   - Every dessert cut out, standing in front of a scallop-topped arch (the awning's scallop).
   - Arches in lilac, pink or mint at one lightness.
   - Tiles divided by heavy purple rules about 6px, the way Van Leeuwen rules in black.
4. **Sense row** (Läderach): four macro crops of Charlie's own photos, each with one verb:
   - "Hear the fizz": p16 fizzy sweets.
   - "Watch it drip": their sauce in the drip silhouette.
   - "Feel the crunch": p11, the spoon at the waffles.
   - "Lift the foam": p17, the foam sweets and lollipop on the shake.
5. **Favourites as ovals** (Salt & Straw):
   - Charlie's Creation, Biscoff, White Stars and Grimace as overhead oval crops, about 1:1.25, texture to the edge.
   - Each name curved over its oval in lilac italic.
6. **Awning edge** (Biscuiteers, Salt & Straw):
   - Their candy stripes as a band whose bottom edge is the awning scallop, between the hero and the menu.
   - At most twice per page: Salt & Straw uses one stripe band, Biscuiteers uses scallop section edges.
7. **The two shops** (Cédric Grolet):
   - "Brighouse" and "Huddersfield" at 6vw desktop and 11vw phone on dark purple.
   - Hover or tap one and its shopfront at dusk (awning, festoon bulbs) fills the screen behind the name, which turns to outline.
8. **The hat as a line** (Graza):
   - The top hat drawn as a thin line in the empty cream margins (aim for about 50% empty ground across the page), tipping at each section start.
   - One full-width CHARLIE'S wordmark near the foot.
9. **Orbiting details instead of carousels** (Little Moons):
   - A slowly rotating text ring around a dessert: "WAFFLE • SAUCE • TOPPINGS • MADE TO ORDER •".
   - A round "from £5" sticker; the price is from their menu.
   - Cut-out fizzy sweets from p16 bobbing.
   - The festoon bulbs breathing slowly.
   - CSS loops only, and no carousel on the first screen.
10. **Colour and gold discipline** (Compartés, Godiva):
    - 4 UI colours: cream ground, purple text, lilac from their menu drips, and one candy accent from the awning stripe for every order button (Jeni's rule).
    - Gold only on the order ticket when it is confirmed and stamped, never on grounds or borders. This follows Compartés' gold prices on oxblood and Godiva's single gold CTA.

## 5. The six most instructive screenshots
1. `C:\Users\RifqiRakamulya\Documents\Astra\charlie\_research\exclusive\shots\littlemoons-1440-0.png`: 15vw type behind a cut-out cross-section, one pink family, orbiting details.
2. `C:\Users\RifqiRakamulya\Documents\Astra\charlie\_research\exclusive\shots\laduree-1440-list.png`: the luxury menu tile (n:p 1.07, weight 400, no button, small product in a cream field).
3. `C:\Users\RifqiRakamulya\Documents\Astra\charlie\_research\exclusive\shots\vanleeuwen-1440-list.png`: cut-outs in front of pastel arches in a black-ruled grid.
4. `C:\Users\RifqiRakamulya\Documents\Astra\charlie\_research\exclusive\shots\saltandstraw-1440-1.jpg`: overhead macro in ovals with flavour names on a curve.
5. `C:\Users\RifqiRakamulya\Documents\Astra\charlie\_research\exclusive\shots\laderach-1440-5.jpg`: the sensory macro row on a black-and-white interface.
6. `C:\Users\RifqiRakamulya\Documents\Astra\charlie\_research\exclusive\shots\cedricgrolet-1440-hover-saint-tropez.jpg`: type-only first screen whose shop photo appears on hover.
