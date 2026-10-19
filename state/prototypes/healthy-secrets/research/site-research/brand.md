# Healthy Secrets brand, as found on the live site and their Instagram

Checked 2026-10-19 between 09:10 and 10:05 UTC. Site: https://www.healthysecrets.at (Wix, site revision 1131).
Every value below says where it came from. "VERIFIED" means seen in the page HTML/CSS or in the rendered page.

## Logo

| File | What it is | Source |
|---|---|---|
| `img/logo/logo_gold.png` (3000x2990, transparent) | Circular wordmark "HEALTHY SECRETS" around a thin circle, two crossed antique keys in the middle. Gold, dominant pixel colour **#C5A253**. | https://static.wixstatic.com/media/aadec6_0652b84f214c4068bf3e6353c78c2a46~mv2.png, alt "Logo Gold", on the hero banner of Home, About, Über uns. VERIFIED |
| `img/logo/logo_schwarz_line.png` (937x934, transparent) | Same mark as a thin black line drawing. | https://static.wixstatic.com/media/aadec6_f409693665e44b498a5afb3765da948c~mv2.png, alt "Logo Schwarz", on all 22 pages. VERIFIED |
| Favicon | The "Darmgesundheitsbär" mascot, not the logo. | `<link rel="icon">` on every page points to aadec6_bfdd7aa0...png. VERIFIED |

The keys and the name are a pun on "Secrets". The packaging labels carry the small round logo too (seen on the Lullaby Leaves and Slimming Sips jars).

## Colours

### Used on the website (VERIFIED in the CSS or computed styles, cross checked by pixel samples)

| Hex | Where it is used | Evidence |
|---|---|---|
| **#FF6961** coral | Script headlines ("Gesundheit is(s)t kein Tabuthema"), team names on Über uns, footer links (Impressum, AGB, Datenschutz), "from austria with love" marquee text | inline `color:#FF6961` 25x on Home, 18x on Über uns; computed rgb(255,105,97) |
| **#FE6060** coral button | "SHOP" button on the Darmgesundheit tile | pixel sample of the rendered page (close to #FF6961) |
| **#3D9BE9** sky blue | Script line "Ärztlich und ernährungsmedizinisch entwickelt", shop intro line, product names in the shop grid, "Omega-3 Granola available now" marquee | inline `color:#3D9BE9`; computed rgb(61,155,233) |
| **#92A88F** sage | "Lebensmittel HANDMADE in Austria" badge blob on Home, "Für uns gilt: Essen is(s)t die erste Medizin" panel on Über uns, mobile MENU button frame | SVG `fill:#92a88f`; pixel samples match |
| **#B5C7EB** powder blue | Badge blob on Über uns, mobile MENU button fill | SVG `fill:#b5c7eb` |
| **#C3D6E8** light blue | Intro text panel on Über uns | SVG `fill:#c3d6e8` |
| **#869FD1** periwinkle | Long text panel on Über uns | SVG `fill:#869fd1` |
| **#282626** / **#000000** | Body text | computed rgb(40,38,38) and black |
| **#2B5672** deep teal navy | Inline text colour on Home (18 uses) | inline `color:#2b5672`, exact element not pinned |
| **#857366** taupe | "NEW" and "Best Seller" ribbons on shop tiles | pixel sample = Wix theme color_18 |
| **#D9B9B9** dusty pink | Cookie banner background (Wix consent tool) | computed rgb(217,185,185) |
| #8C8ADB lavender, #FEF63D yellow, #FF5700 orange | Footer mascot speech bubbles, star sparkles, heart | SVG fills on Home |
| White #FFFFFF | Page background everywhere | theme color_11 |

The Wix theme palette (`--color_16` to `--color_35`) is a template set of beige, terracotta, lavender and green ramps (#F5E7DF #C7AC9D #857366 #64564F #322B27, #E7CDC0 #CEA08A #9B7867 #675045 #342823, #C4AEDD #9C7FBA #663898 #442565 #221333, #E5FAD1 #CAE5AF #9BCB6C #4E6636 #27331B). Only #857366 was seen in use (the ribbons).

### Used on Instagram and the café graphics (pixel samples from their posts, OBSERVED, not on the website)

| Hex | Use |
|---|---|
| **#93AA90** sage | backgrounds of "WE ARE OPEN!", "MAKE A MATCHA LATTE WITH ME", pills |
| **#FBDCE2** blush pink | backgrounds and pills ("NOCH 1 TAG BIS ZUM OPENING") |
| **#045A89** navy | text and backgrounds ("GUT HEALTH CLUB OPENING", giveaway rules) |
| **#D8E2E4** pale blue grey | backgrounds (opening clock, "WIE HEALTHY IST DEIN DARM?") |
| **#E86060** coral | highlights (10 and 18 on the opening clock, date pills) |

The Instagram look is tighter and more modern than the site: sage, blush, navy and pale blue grey, rounded heavy capitals in pill shapes, a serif for secondary lines, and the mascots. The café itself adds a red and white striped awning, blue and white patterned porcelain, blue grey tiles and aluminium checker plate tables (see SUMMARY.md, café).

## Fonts actually used (computed styles in a real browser on Home, Über uns and Shop, VERIFIED)

| Font (Wix name) | Role | Sizes seen |
|---|---|---|
| **Futura LT W01 Light** (`futura-lt-w01-light`) | All body copy, prices, footer links | 14 to 18 px body, 24 px footer links |
| **Snell Roundhand** (`snellroundhandw01-scrip`, bold) | Script headlines in coral and sky blue ("Ärztlich und ernährungsmedizinisch entwickelt", "Gesundheit is(s)t ...", "made in Austria") | 22 to 45 px |
| **Playfair Display** (`playfair display`, `playfair-display-v2`) | Hero lines (bold italic, white), "ÜBER UNS..." (italic 43 px), team names (bold italic coral), "Sternzeichen / Hobbys" labels, badge text | 15 to 43 px |
| **Gaude** (`gaude`) | Main nav "Home Shop About" (bold, 48 px, black, underlined), product names in the shop grid, "@healthysecrets_at" | 16 to 48 px |
| **Gatore** (`gatore`) | "Omega-3 Granola available now" marquee | 30 px |
| **Kufi LT W20** (`kufi-lt-w20-regular`, italic, letter spaced) | "from austria with love" marquee | 28 px |
| Helvetica Neue | Cookie banner only (Wix consent tool) | 14 px |

Declared in the CSS but not seen on any visible text: EB Garamond, DIN Next W01 Light, Proxima Nova, Unbounded, Futura Book (Wix font face lists). That makes seven type families in visible use, including two scripts and two display faces.

## Taglines and recurring phrases (exact wording, German as written)

| Phrase | Where | English gloss |
|---|---|---|
| "Ernährung is(s)t die beste Medizin" | Hero, Home / About / Über uns | Nutrition is (eat it) the best medicine |
| "- ein österreichisches Familienunternehmen -" | Hero | an Austrian family business |
| "Ärztlich und ernährungsmedizinisch entwickelt" | Home script line | Developed by doctors and by nutritional medicine |
| "Lebensmittel HANDMADE in Austria" | Badge on Home and Über uns | Food handmade in Austria |
| "Gesundheit is(s)t kein Tabuthema - Essen ist die erste Medizin" | Home | Health is (eat) no taboo, food is the first medicine |
| "Gesundheit is(s)t Alltag - Lebensmittel mit Sinn" | Home | Health is (eat) everyday life, food with purpose |
| "Gesundheit is(s)t naturbelassen - Prävention ganz aus der Natur" | Home (desktop). Phone shows "Gesundheit is(s)t nachhaltig - Prävention ist naturbelassen" | Health is natural, prevention from nature |
| "Essen is(s)t die erste Medizin" / "Für uns gilt:" | Über uns | For us: food is the first medicine |
| "from austria with love" | Marquee on Home and Shop | |
| "Wohlbefinden made in Austria" / "Darmgesundheit made in Austria" | Home shop tiles | Wellbeing / gut health made in Austria |
| "Bei uns bekommen deine Verdauung, dein Cholesterinspiegel & Co die Main Character Energy die sie verdienen." | Home | Your digestion and cholesterol get the main character energy they deserve |
| "Keine Pillen, keine Pulver." | About (general-9) | No pills, no powders |
| "Hi health nut" | About | |
| "Unter ärztlicher Leitung entwickelt", "Regional & bio", "Alltagstauglich & smart" | About, "Warum Healthy Secrets?" | Developed under medical direction, regional and organic, fits everyday life |
| "Jedes unserer Produkte ist auf ein bestimmtes Gesundheitsproblem abgestimmt." | Shop | Each product targets a specific health problem |
| "Healthy Secrets: Ärztlich und ernährungswissenschaftlich entwickelt. Für Dich gemacht." | About | |
| "Where Medicine Meets Everyday Nutrition: Functional Foods Developed by Medical Experts" | LinkedIn tagline | (English original) |

Word counts across the 22 rendered pages (site) and the 30 homepage Instagram captions: "Gesundheit" 33 / 17, "Fibre Flow" 37 / 8, "Matcha" 19 / 41, "Darmgesundheit" 10 / 14, "Ballaststoff" 11 / 9, "Medizin" 14 / 5, "is(s)t" 8 / 0, "Gut Health Club" 0 / 21, "#neuinwien" 0 / 23, "Geheimtipp" 0 / 20. The site talks prevention and medicine; Instagram talks the café, matcha and Vienna.

The "is(s)t" wordplay (ist = is, isst = eats) is the brand's signature device on the site. Instagram does not use it.

## Mascots (client illustrations, 1024 px PNGs)

A set of fluffy cartoon creatures that also appear on the packaging: the grey bunny (Chai Latte label, "Taubers Tier"), the cream fox or cat ("Matcha Maus"), the orange antlered creature, the beige bear ("Darmgesundheitsbär", also the favicon), the golden heart hugger. Files and alts are in images.json. On the website they sit on dark glowing backgrounds; on Instagram they are clean cut outs on flat colour.

## Voice

Second person "du", warm and jokey on Instagram (emoji, "Chefin Rosi", "kleinster Schanigarten Wiens"), more earnest and claim heavy on the site (Cholesterinspiegel, Diabetesprävention, "nachweislich"). Older pages (FAQ, Shipping) still use the formal "Sie" and describe "Beauty Produkte" and "natürliche Kosmetik", which is copy left over from an earlier cosmetics positioning.
