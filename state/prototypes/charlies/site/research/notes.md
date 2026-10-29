# Research notes, Charlie's Desserts prototype

All read or rendered on 28 Oct 2026. Every line in the four files below carries its URL.

| File | What's in it |
|---|---|
| `notes-17A-default.md` | The AI default. 32 live AI built and template dessert, ice cream, bakery and cafe sites across 9 builders, all rendered at 1440 and 390, fingerprinted, the pattern list with counts, five lines on how a default AI would build this homepage. Plus one site a fresh Claude wrote from the bare prompt (`_research/ai-default/00-plain-model/`) |
| `notes-17A-top50.md` | 50 of the best sites, 48 rendered at both sizes (La Revoltosa and Locomotive stayed walled), 35 award level with their award pages, the runtime fingerprint of each, the one move worth taking, the techniques behind fluid, drip, physics and foil, the numbers |
| `notes-17B-lead.md` | Their site page by page with every claim in the brief checked (5 confirmed, 4 corrected), their six newest posts with captions copied exactly, the FSA ratings from the FSA's own API, the menu PDF checked against `menu.json` line by line (all 57 priced items match, 9 discrepancies listed), the PDF's design |
| `notes-17B-type-rivals.md` | Type on 18 premium dessert and confectionery sites, the faces read from the font files and their licences, the verdict on Mona Sans and Fragment Mono, and the six local rivals with how each takes orders |

## Corrections the research made to the brief
- Their home hero has no translucent purple panel. It's the waffle photo under a 25% black overlay, and VIEW MENU opens the PDF, not the menu page (`notes-17B-lead.md`, claim b).
- The Uber Eats link carries a preset delivery address in Brighouse. It's the only order link, and only on the home page (claim c).
- The booking form also has a newsletter tick box and a subject field, and the date isn't required. The "Central European Time" label comes from the site's time zone being set to Europe/Zurich (claim g).
- Captions use the curly apostrophe ’, so every quote on the site uses it. "Frozen yogurt is now available in Huddersfield! 📍 51 King St" isn't one line at source. The real line is "Frozen yogurt is now available in Huddersfield! 🤍".
- The frozen yoghurt prices are in the post's image, not its caption (the image spells it YOGURT, the caption YOGHURT).
- The menu prints "Toppings from £1.00" and prices only three toppings (Gobstopper £1.50, Gum Balls £2.00, Pick & Mix Cup £2.00). `menu.json` gives the other sixteen £1.00, the floor the menu states. To confirm with Danielle.
- The cones are four unnamed pictures on the menu (+50p, +£1.00, +£1.50, and a striped tub with no price). `menu.json` names them, the menu doesn't. The site won't invent names for them.
- TikTok has 3,857 followers (the brief said 3,856), and its bio links a stale Square payment page, so Charlie's already takes payments through Square.

## Assets made today, and how
- **Their photos.** Downloaded from their own site's CDN (`_downloads/photos/`), photo 15 (a child) never downloaded, photo 14 (third party marks) kept for reference only.
- **Cut outs.** Two background removal models run locally on each photo through onnxruntime, ISNet general use and BiRefNet general lite (both from the rembg project's GitHub releases), and judged on Charlie purple and candy pink grounds. BiRefNet won on the shake (it kept the glass foot ISNet lost) and on the waffles (ISNet kept a stray plate outline). Edges colour corrected against the table they were shot on. `_research/cutouts/`.
- **The drip.** Their menu PDF rendered with pdf.js, the lilac drip colour (#DCD0E8 on #FCF4FC) isolated on page 1, the drip depth measured per column on the columns the logo and lettering don't cover (page x 1465 to 2381, then 0 to 350 across the page edge), specks narrower than any drip filtered out, the wide lobes shortened to a band for the dessert version, each tip re-rounded to its own width, and an exact distance field baked into `media/drip-sdf.png`. `_tools/drips/`.
- **The hat.** Segmented from their logo by colour, the brim cut by hand where it touches the "C" (read off a grid), smoothed and traced with potrace into `media/hat.svg`. `_tools/hat/`.
- **Fonts.** Mona Sans and Fragment Mono from Google Fonts' own GitHub repository, both OFL 1.1, compressed to WOFF2 whole, no subset.
