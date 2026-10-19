# Healthy Secrets site, handover (2026-10-19)

Live: https://astra-healthy-secrets-prototype.netlify.app (Netlify project `astra-healthy-secrets-prototype`,
id 72cc17e8-d569-404b-8200-02839e55cf7b, deploy 6ad607ea46c267f30efe223d (v2), team SSO off, password off).
Source: `build/` (build.py, pages/, make_map.py, process_images.py). Output: `site/`. Research and art direction:
`research.md`. Evidence: `research/` (site pages, products.json, press texts, Instagram captions, teardown of 60 sites,
the Commission claims page, the Wien Geschichte Wiki page). Image provenance: `research/asset-provenance.md`.

## v2, "seamless" (Raka's note, 19 Oct, after seeing v1)

Raka: make it "more seamless, more modern", it still felt "old school, blocky ... like something out of WordPress",
"sleek and flowing and integrated", easy to read, simple, and keep the widgets. v1 output is in git at 9d8db41.
Copy, routes and widgets are unchanged. The stylesheet was rewritten and the shared markup reworked.
- **One continuous surface.** No hard colour bands. The home page's colours fade the way light does through a day,
  a sunset into 19 Uhr, night, then a dawn back to light at "Wer dahinter steckt". Sub page sections are pools of
  colour that fade in and out of the paper. Dark sections are inset rounded panels instead of full width bands.
- **A floating glass header** replaces the black top bar and the stacked header, with an "Ab 10 Uhr" status chip.
- **The day dial is a floating capsule** at the bottom of the screen, shown only while you're in the day.
- **Lighter type.** Jost 500 headlines instead of 800, 400 body, more air. Borderless product cards, soft shadows,
  soft filled form fields, fewer outlines and pills. The awning became a shopfront cap over photos and cards.
- **Same QA again.** 53 of 53 interaction checks locally and live, axe clean on 9 pages, no overflow at six widths,
  no JS check, 41 of 41 assets byte matched live, colon, dash and prototype word audit clean. One regression caught
  and fixed (the product dialog's close button sat under a label).

Promised in the thread (17 Oct): "a modernised Healthy Secrets site built around the Gut Health Club, with the café,
the medical story behind the range and the shop on one clear path." That's what this is.

## The idea

**One ordinary day, 8 Uhr to 2 Uhr früh.** It's their own founding sentence from the Über uns page ("Den Morgen mit
einer Schüssel Granola starten ... Klingt doch nach einem ganz normalen Tag, oder?"). The home page is that day. A sticky
dial (a sun on an arc that becomes a moon after 20 Uhr, with a clock that counts as you scroll) runs over seven hours:
8 Uhr breakfast, 10 Uhr the Gut Health Club opens (under their red and white awning), 12.30 lunch and advice over the
counter, 15 Uhr the afternoon slump and the fibre gap, 19 Uhr after dinner, 22 Uhr before bed, and 2 Uhr früh, the
secret hour, when the three of them are in the kitchen in Favoriten (Niki's line in Heute). The cart is "Dein Tag",
grouped by hour. The shop is a 24 hour clock with the products placed at their hour.

Their palette from Instagram and the café graphics (blush, coral, sky, tile blue grey, sage, navy, gold), their gold
key logo, their arch frames, their mascots, Jost (a Futura revival, their body face is Futura Light), German first with
a full English switch.

## Routes (Site Completeness Contract, final status)

| Route | What's on it | Status |
|---|---|---|
| `/` Start | The day, 7 hours, products in their moments, the fibre gap chart, the three siblings, closing stack with FAQ and events sign up | built |
| `/club` Gut Health Club | Awning, map drawn from OpenStreetMap data, directions in their words, the letter board, the space, opening day, the square's history since 1302, events interest form | built |
| `/shop` | 24 hour product clock, 7 products by time of day with filter, detail dialog, day planner quiz, shipping, returns, payment, product FAQ | built |
| `/kasse` | Three step checkout (delivery, payment, review), 18+ and AGB section 12 consents, success with order number | built |
| `/beratung` | Leonie's three services and prices, topics, process, three step request flow with health data consent | built |
| `/wissen` | The fibre gap (two views, per day and per MJ), six ingredients explained, how a product is made, day planner link | built |
| `/ueber-uns` | Founding story, three bios with monograms, night kitchen, timeline, press | built |
| `/handel` | Retail and pharmacy pitch, range table, trade enquiry form | built |
| `/impressum` | Their Impressum data, links to the Nov 2025 AGB and Datenschutz PDFs | built |
| AGB, Datenschutz | Linked to their current PDFs, not rebuilt | linked |
| Customer accounts, real payment provider | Not part of a sketch | deferred |

## Verified (19 Oct)

- Local, all 9 pages: zero console errors, every image decodes, every reveal fires on a cold load (75 of 75 on home),
  all 8 Jost weights load, axe (WCAG 2 A and AA) clean on every page, no horizontal overflow at 320, 390, 420, 768,
  1024 and 1280, every page readable with JavaScript off.
- 53 scripted interaction checks pass, locally and again on the live URL. Language switch (incl. titles, alt text,
  options, persistence), cart add, quantity, empty state, Escape, product dialog with quantity, filter by hour, the
  planner end to end (St John's wort swap, caffeine removal, 4,93 € a day computed as 44/14 + 25/14), checkout with
  every validation step and the success state, booking with every step, three forms with errors and success, the chart
  tabs by mouse and arrow keys, the dial (22.30 Uhr and moon at 22 Uhr, tick jumps), mobile menu.
- Live: 9 pages 200 with the right titles, 41 of 41 assets byte matched, visible and attribute text identical to the
  build on every page (Netlify only rewrites the link format), cold load in Chromium clean. One bug found and fixed
  during QA: the checkout success message was hidden by the empty cart state.
- Copy audit over every visible word in both languages, all panels forced open: zero colons, zero dashes, no banned
  words or phrases, no hedges, 138 contractions in the English, nothing that says prototype, sample or agency.

Density, home page: 24 photos plus 3 drawn figures (floor 25), about 2,150 words (floor 900), 25 h3 (floor 12), 1 form.
Bench (teardown counts): Seed 24 images, 2 h3, 399 words. ZOE 28, 2, 426. The Gut Stuff 43, 9, 562. Verival 166, 104,
2,236 (a full shop). Ours sits between the category sites and a full shop, and isn't the thinnest.

Score (G1): brand 14, narrative 14, imagery 13, workflow 14, proof and trust 12, buyer fit 9, conversion 5,
interaction 5, technical 5. **91.** Proof and trust lose points for no individual portraits (see below) and no reviews.

## Things Nikolaus should confirm before any of this goes live

1. **Opening hours.** Only "ab 10 Uhr" is verified (their posts). Closing time and days aren't stated anywhere, so the
   site says "ab 10 Uhr" and nothing more.
2. **Café prices.** None found (the board has none). The site lists the menu without prices.
3. **Matcha at 44 €** while Chai and Moon Milk (same 215 g, 14 servings) are 25 €. Verified in their page data, may be
   right, may be a typo.
4. **Claims left out on purpose.** EU rules allow only registered health claims, and their product pages carry no
   nutrition tables to check claims against. So the site states ingredients, sizes, preparation and their own warnings
   and leaves out "nachweislich", "Cholesterin senken", "Diabetesprävention", "Darmkrebs", the father's blood test and
   "100% frei von gesättigten Fettsäuren" (rapeseed oil has some saturated fat). He's a medical law lawyer, he'll know
   which of their claims are registered and can put those back.
5. **Names that are claims.** "Slimming Sips" and "Probiotic Frozen Yoghurt" (the menu board) are kept as they are,
   because they're their names. Worth his eye.
6. **Leonie's scope sentence**, "the only profession besides doctors allowed to support, diagnose and treat", is their
   own copy from the services page, kept word for word.
7. **Old documents still live.** The 2021 e.U. terms, privacy policy and cancellation form are still on the current site
   next to the Nov 2025 OG versions, and the FAQ and shipping page still talk about natural cosmetics. The new site links
   the 2025 PDFs only.
8. **Three email addresses** on the current site (office@, two Gmail). The new site uses office@healthysecrets.at only.
9. **Contract language.** Their AGB say the shop runs in German only. The English checkout says so in one line.
10. **"Du" everywhere**, including Beratung, where their own page says "Sie". Easy to switch back.
11. **Kitchen photos.** The two black and white photos from their home page are shown in the "2 Uhr früh" section
    without a caption naming the place. Confirm they're the Favoriten kitchen.

## Assets

All 29 images are their own (their site, their Instagram, and four Gastro.News photos credited "© Healthy Secrets").
Table with source and what's in each frame: `research/asset-provenance.md`. Not used: the Heute photo (third party,
Denise Auer), Wix stock videos, the Canva matcha clip, the "gut health era" reel footage.

**People.** The group photo is captioned "Die Geschwister Walkner" with no individual names. It comes from the
Gastro.News article, not their site, so `tools/verify_portraits.py` can't pair faces to names, and their Über uns page
mentions a twin sister, so which two sisters are pictured can't be proven. Each sibling gets a designed monogram instead
of a portrait. Nobody else pictured is named (the man in two café photos, the woman with the Moon Milk pouch). Rosi is
named because their own post names her.

**Asset requests.** One named portrait each of Stephanie, Leonie and Niki. A daylight shot of the shopfront. The café
hours and menu prices. Nutrition tables per product, which would also let the planner show grams of fibre per day.

## Next steps to production

Confirm the eleven points above, swap monograms for the three portraits, connect the real shop (Wix Stores or Shopify
with Wix Payments and Klarna as in their AGB), connect the forms to their inbox, and decide on the domain.
