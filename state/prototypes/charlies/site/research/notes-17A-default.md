# Notes 17A: what the AI-default / template dessert-parlour homepage looks like

Run date: 28 Oct 2026. Read-only research for the Charlie's Desserts prototype (Astra). Nothing was submitted, signed into or downloaded other than my own screenshots. Screenshots are in `_research/ai-default/` (NN-slug-1440.png, -390.png, -full.png), raw data in `_research/ai-default/fingerprints.json`.

## 0. Short version

- 32 of 32 sites rendered and were fingerprinted (9 builders: Lovable 13, Framer 6, Wix 4 (1 classic, 3 Studio), Webflow 3, Squarespace 2, Bolt 1, v0 1, Shopify 1, Durable 1). Several needed re-runs because the machine was busy (see section 2). Two rendered with a weak first screen (Wix Chill Treats hero media never painted; MiCasa product photos half-decoded).
- "AI-built" below means the prompt-to-site builders (Lovable, Bolt, v0): n = 15. "Template" means everything else (Framer, Webflow, Wix, Squarespace, Shopify, Durable): n = 17. Lovable alone is n = 13, so the AI-built numbers lean Lovable. Small sample; treat percentages as direction, not statistics.
- The default is not one look but two. **Lovable-style builds** converge hard on: split hero (text left, rounded photo right), pill buttons, cream/pastel background, rounded shadowed cards, line icons, star ratings, uppercase kickers, accent-coloured word in the H1. **Template-style builds** (Framer/Webflow/Wix) lean on full-bleed photo heroes, scroll reveal, Instagram links, and the flowery copy ("delight", "indulge").
- Real businesses that were given a strong brief (Aloo Dessert, Wafflelicious, Brunchy, David's Cake Cabinet) look noticeably less generic. The default shows up when the prompt is thin.

## 1. Site list

Builder is identified two ways: (1) the host name (each builder publishes on its own domain: lovable.app, bolt.host, framer.website, webflow.io, wixstudio.com / wix.com demo, squarespace.com, myshopify.com, durable.site, v0 preview on vusercontent.net reached from v0.app/templates) and (2) a runtime marker read from the loaded page (badge text, meta tag, or platform global). Both are in the table.

| # | Site | URL | Builder | How I know | Rendered / notes |
|---|------|-----|---------|-----------|-------------------|
| 01 | Aloo Dessert Liverpool (waffles, cookie dough, milkshakes) | https://aloodessert.lovable.app/ | Lovable | Published on a *.lovable.app subdomain (Lovable's own hosting domain). Runtime: on-page badge "Edit with Lovable"; meta author=Lovable; lovable markers in HTML | rendered. UK waffle / cookie-dough / milkshake parlour (Liverpool): closest real-world peer to Charlie's. Strongly branded, so it departs from the default. |
| 02 | Bubble Cream Ice Cream (Tucker, GA) | https://bubblecreamga.lovable.app/ | Lovable | Published on a *.lovable.app subdomain. Runtime: on-page badge "Edit with Lovable"; lovable markers in HTML | rendered |
| 03 | Brunchy: ice cream, desserts, Latin snacks (Columbia, SC) | https://sabor-sweet-hub.lovable.app/ | Lovable | Published on a *.lovable.app subdomain. Runtime: on-page badge "Edit with Lovable"; lovable markers in HTML | rendered |
| 04 | Scoop There It Is (ice cream, shakes, cakes) | https://scoopthereitisharahan.lovable.app/ | Lovable | Published on a *.lovable.app subdomain. Runtime: on-page badge "Edit with Lovable"; meta author=Scoop There It Is; lovable markers in HTML | rendered. No <h1> element in the page (logo image + paragraph); fingerprint used the largest first-screen text. |
| 05 | Candy Cream Cafe (Orlando ice cream shop) | https://gelato-glam-forge.lovable.app/ | Lovable | Published on a *.lovable.app subdomain. Runtime: on-page badge "Edit with Lovable"; meta author=Candy Cream Cafe; lovable markers in HTML | rendered |
| 06 | The Sugar Station (bakery / sweets) | https://the-sugar-station.lovable.app/ | Lovable | Published on a *.lovable.app subdomain. Runtime: on-page badge "Edit with Lovable"; meta author=The Sugar Station; lovable markers in HTML | rendered |
| 07 | Lovable official template: Bakery Order Page | https://bakery-order-page-fa48c2b2.lovable.app/ | Lovable | Embedded as the live preview on lovable.dev/templates/websites/ecommerce/bakery-order-page and hosted on *.lovable.app. Runtime: on-page badge "Edit with Lovable"; lovable markers in HTML | rendered |
| 08 | David's Cake Cabinet (Bolt demo) | https://bolt101-32.bolt.host/ | Bolt | Hosted on bolt.host (Bolt's publishing domain). Runtime: bolt markers in HTML | rendered. Bolt-hosted demo (fictional bakery, "bolt101" series). Visibly art-directed, so it is NOT a typical default. |
| 09 | v0 community template: Bakery landing page | https://v0.app/templates/bakery-landing-page-uKrcvCYA32C | v0 | v0.app template gallery listing; live preview is the vusercontent.net iframe that v0 serves for its own generations. Runtime: v0 markers in HTML; Next.js app | rendered. v0 preview endpoint was flaky (several timeouts); captured on a later attempt. Screenshots and fingerprint are from one good load. This is v0's own community template, not a live business. |
| 10 | Framer template: Scoopa (gelato / dessert bar) | https://scoopa.framer.website/ | Framer | Preview link on the Framer marketplace listing framer.com/marketplace/templates/scoopa; hosted on framer.website. Runtime: meta generator=Framer ed99727; framer markers in HTML | rendered |
| 11 | Framer template: Scoops Ice Cream | https://scoopsicecream.framer.website/ | Framer | Preview link on Framer marketplace template 75233; hosted on framer.website. Runtime: meta generator=Framer 7788242; framer markers in HTML | rendered. Fixed left sidebar nav; the sidebar "Visit us" button is not the hero CTA ("Find your flavor" is). |
| 12 | Framer template: Cakelab (bakery / dessert shop) | https://cakelab.framer.website/ | Framer | Live Preview button on Framer marketplace listing; hosted on framer.website. Runtime: meta generator=Framer d369d66; framer markers in HTML | rendered |
| 13 | Framer template: Bakery Co. (cafe and patisserie) | https://bakery-co-wbs.framer.website/ | Framer | Preview link on Framer marketplace listing; hosted on framer.website. Runtime: on-page badge "Get template"; meta generator=Framer 77cb752; framer markers in HTML | rendered |
| 14 | Framer template: Kafe Milano (cafe) | https://kafemilano.framer.website/ | Framer | Preview link on Framer marketplace listing; hosted on framer.website. Runtime: on-page badge "Remix For Free"; meta generator=Framer f0eed09; framer markers in HTML | rendered |
| 15 | Framer community: La Gelateria (ice cream parlour) | https://la-gelateria.framer.website/ | Framer | Framer community post preview; hosted on framer.website. Runtime: meta generator=Framer e0e363b; framer markers in HTML | rendered |
| 16 | Webflow template: Geluna (ice cream / dessert shop) | https://geluna.webflow.io/ | Webflow | Template listing on webflow.com/templates; hosted on webflow.io. Runtime: on-page badge "Powered by Webflow"; meta generator=Webflow; webflow markers in HTML | rendered. Template product page ("GLACE WEBFLOW TEMPLATE" is the H1), not a shop homepage; no hero CTA in the first screen. |
| 17 | Webflow ecommerce template: Swetzel (bakery / pastry) | https://swetzel.webflow.io/ | Webflow | Hosted on webflow.io, surfaced by search for Webflow bakery ecommerce templates. Runtime: on-page badge "Powered by WEBFLOW"; meta generator=Webflow; webflow markers in HTML | rendered |
| 18 | Webflow ecommerce template: Yogo (frozen yoghurt / ice cream) | https://yogo---webflow-template-development.webflow.io/ | Webflow | Hosted on webflow.io. Runtime: on-page badge "POWERED BY WEBFLOW"; meta generator=Webflow; webflow markers in HTML | rendered. Template (frozen yoghurt / ice cream). No hero CTA in the first screen. |
| 19 | Wix Studio template: Scoop n' Smile | https://mendark07.wixstudio.com/public_template-45 | Wix (Studio) | Live preview iframe on the Wix Marketplace listing (wix.com/marketplace/template/ce3760c3...); hosted on wixstudio.com. Runtime: on-page badge "Built on Wix"; meta generator=Wix.com Website Builder; wix markers in HTML | rendered |
| 20 | Wix template: Ice Cream Shop (Pastel) | https://www.wix.com/demone2/gelato-hm | Wix | Live preview iframe on wix.com/website-template/view/html/wh-1149. Runtime: meta generator=Wix.com Website Builder; wix markers in HTML | rendered |
| 21 | Squarespace template: Hearth (bakery) | https://bakery-alpha-ai-demo.squarespace.com/ | Squarespace | Preview iframe on squarespace.com/templates/bakery-alpha-ai-demo; hosted on squarespace.com. Runtime: squarespace markers in HTML | rendered. Squarespace "ai-demo" template with placeholder copy ("Your Brand Name"); no hero CTA (first button on page is a form button). |
| 22 | Squarespace template: bakery-beta-ai-demo | https://bakery-beta-ai-demo.squarespace.com/ | Squarespace | Listed on squarespace.com/website-templates/bakery; hosted on squarespace.com. Runtime: on-page badge "Create A Site Like This"; squarespace markers in HTML | rendered. Squarespace "ai-demo" template with placeholder copy; no hero CTA. |
| 23 | Shopify theme demo: Sweet (bakery / sweets / dessert) | https://sweet-bakery-demo.myshopify.com/ | Shopify | Demo store URL found in the Shopify Theme Store listing themes.shopify.com/themes/sweet; hosted on myshopify.com. Runtime: on-page badge "Powered by Shopify"; shopify markers (window.Shopify / cdn.shopify.com); window.Shopify present | rendered |
| 24 | Coffee Daily Corporation (Manila cafe, desserts) | https://coffee-daily-corporation.durable.site/ | Durable | Hosted on durable.site (Durable's publishing domain). Runtime: on-page badge "Built with Durable"; durable markers in HTML | rendered. Real cafe site; first hero button renders with no label (empty pill) so the first labelled CTA is "About us". Scrolls inside a container, so the full-page shot was tiled from the inner scroller. |
| 25 | Wix Studio template: Chill Treats (ice cream / gelato / frozen yogurt) | https://magicdzins.wixstudio.com/public-template-209 | Wix (Studio) | Live preview iframe on the Wix Marketplace listing (wix.com/marketplace/template/bee742fb...); hosted on wixstudio.com. Runtime: on-page badge "Built on Wix"; meta generator=Wix.com Website Builder; wix markers in HTML | rendered. Hero media never painted in headless Chrome (first screen is an empty pink panel with a faint pattern); everything below the hero rendered. |
| 26 | Wix Studio template: Melty Magic IceCream | https://hcgcorporatedesigns.wixstudio.com/public_template-23 | Wix (Studio) | Live preview iframe on the Wix Marketplace listing (wix.com/marketplace/template/64647d68...); hosted on wixstudio.com. Runtime: meta generator=Wix.com Website Builder; wix markers in HTML | rendered |
| 27 | Sweets Ice Cream and More (New Haven, CT) | https://sweetsicecreamandmore.lovable.app/ | Lovable | Published on a *.lovable.app subdomain (Lovable hosting domain); surfaced by site-restricted web search. Runtime: on-page badge "Edit with Lovable"; meta author=Sweets Ice Cream and More; lovable markers in HTML | rendered. The page's first <h1> is the nav logo ("Sweets"); the visible hero headline is "Sweets Ice Cream & More". |
| 28 | WaffleLicious (waffles, Lima OH, online ordering) | https://wafflelicious-website-magic.lovable.app/ | Lovable | Published on a *.lovable.app subdomain (Lovable hosting domain); surfaced by site-restricted web search. Runtime: on-page badge "Edit with Lovable"; meta author=WaffleLicious LLC; lovable markers in HTML | rendered |
| 29 | Baked Bites (cookies, brownies, cakes, pre-order) | https://bakedbites.lovable.app/ | Lovable | Published on a *.lovable.app subdomain (Lovable hosting domain); surfaced by site-restricted web search. Runtime: on-page badge "Edit with Lovable"; meta author=Baked Bites; lovable markers in HTML | rendered |
| 30 | Velvet Oven (bakery, cafe, gelato, Cincinnati) | https://velvet-pastry-perfect.lovable.app/ | Lovable | Published on a *.lovable.app subdomain (Lovable hosting domain); surfaced by site-restricted web search. Runtime: on-page badge "Edit with Lovable"; meta author=Lovable; lovable markers in HTML | rendered |
| 31 | Borogodo Gelato e Cafe (Arraial do Cabo, Brazil) | https://borogodo-coastal-dream.lovable.app/ | Lovable | Published on a *.lovable.app subdomain (Lovable hosting domain); surfaced by site-restricted web search. Runtime: on-page badge "Edit with Lovable"; lovable markers in HTML | rendered |
| 32 | MiCasa Bakery | https://micasabakery.lovable.app/ | Lovable | Published on a *.lovable.app subdomain (Lovable hosting domain); surfaced by site-restricted web search. Runtime: meta author=Lovable | rendered. Product photos were still decoding at capture time (half-drawn tiles) even after a 9 s extra wait; layout and text are fine. It is an order grid, not a marketing homepage. |

## 2. What rendered, what failed, what to distrust

- **Rendered: 32/32.** None ended walled or blank in the final run. The routine that clicks a "reject" button never found one to click on any page, so no consent banner was clicked at all; I injected CSS to hide cookie/consent overlays and a Shopify newsletter pop-up that appeared while scrolling (hidden for the full-page tiles). I did not accept, sign up or submit anything.
- **Failures along the way (all resolved by re-running):** the v0 template preview timed out or failed to resolve on several attempts (flaky preview server, per-load token in the URL) before one clean load; Framer pages (Scoopa, Scoops, Cakelab) timed out while the machine was also running other jobs, and re-ran fine one at a time; the mobile loads of Shopify, Wix Chill Treats and the Scoopa screenshot timed out once each and were re-run; the full-page tile of Scoops and La Gelateria first failed and Durable's page scrolls inside a container (first capture was only 900px), so those three were re-tiled from the inner scroller.
- **Weak captures:** Wix Chill Treats (hero slideshow/video never painted); MiCasa (images half-decoded); the Shopify and Scoopa full-page images contain pinned/sticky scroll sections that look repeated because they are tiles of what a visitor sees while scrolling.
- **Full-page screenshots** are 900px viewport tiles taken while scrolling and stitched (fixed/sticky headers hidden after the first tile), capped at 7000px. Pages taller than the cap: Brunchy, Scoopa, Scoops, Cakelab, La Gelateria, Geluna, Swetzel, Wix Scoop n' Smile, Shopify Sweet, Durable, Borogodo.
- **Not default-detecting:** the hero-photo-overlay detector fired on soft blurred glows and hidden menu overlays, so the overlay, Instagram strip, testimonial and stats-row numbers use manual corrections from the screenshots (listed per site in `fingerprints.json` under `manualOverrides`). Hero layout and first hero CTA come from a second pass of the same pages that hit-tests what is really visible in the first screen. Treat the "hamburger at 390px" figure as a lower bound (selector heuristic). The Borogodo testimonial section sat below the 7000px cap, so I did not count it.
- Sample bias: Lovable sites came from site-restricted search (lovable.app) so they are real small-business builds, not a random draw; templates came from the builders' own galleries, so they are showroom pieces.

## 3. Pattern frequencies

Columns: all rendered (n=32) | AI-built Lovable+Bolt+v0 (n=15) | Lovable only (n=13) | template/other builders (n=17). Sorted by how common the pattern is in AI-built sites.

| Pattern | All | AI-built | Lovable | Template |
|---------|-----|----------|---------|----------|
| Star rating / social-proof stars | 16/32 | 12/15 | 10/13 | 4/17 |
| Large photo in first screen | 27/32 | 11/15 | 10/13 | 16/17 |
| Line icons (lucide / stroke svg / icon font) | 11/32 | 11/15 | 10/13 | 0/17 |
| Rounded cards (>=8px) with box-shadow (>=2 on page) | 14/32 | 10/15 | 8/13 | 4/17 |
| Any equal-column photo-card grid (3+ across) | 23/32 | 9/15 | 7/13 | 14/17 |
| Pill buttons (majority of buttons on page have radius >= half height) | 17/32 | 9/15 | 9/13 | 8/17 |
| Copy: fresh(ly) baked/made | 16/32 | 9/15 | 8/13 | 7/17 |
| Pill first hero CTA | 15/32 | 9/15 | 9/13 | 6/17 |
| Hero layout: split (text one side, image(s) the other) | 14/32 | 9/15 | 9/13 | 5/17 |
| Large gradient anywhere in first 1000px (incl. photo overlays) | 11/32 | 9/15 | 9/13 | 2/17 |
| Testimonial / reviews section | 17/32 | 8/15 | 8/13 | 9/17 |
| Copy: handcrafted / artisan | 17/32 | 8/15 | 7/13 | 9/17 |
| Either kicker style (uppercase label or pill badge) | 12/32 | 8/15 | 8/13 | 4/17 |
| Small uppercase kicker label above headings | 10/32 | 8/15 | 8/13 | 2/17 |
| Serif h1 | 12/32 | 7/15 | 5/13 | 5/17 |
| Serif h2 | 12/32 | 7/15 | 5/13 | 5/17 |
| Accent-coloured word/span inside h1 | 9/32 | 7/15 | 7/13 | 2/17 |
| Hamburger menu at 390px | 23/32 | 6/15 | 5/13 | 17/17 |
| Scroll reveal measured OR fade/slide/rise @keyframes shipped in CSS | 22/32 | 6/15 | 5/13 | 16/17 |
| Copy: crafted with / made with love | 13/32 | 6/15 | 5/13 | 7/17 |
| Emoji used on page | 9/32 | 6/15 | 6/13 | 3/17 |
| Gradient hero (colour gradient background, no photo under it) | 7/32 | 6/15 | 6/13 | 1/17 |
| Copy: joy / happiness / happy | 18/32 | 5/15 | 3/13 | 13/17 |
| Three-up grid (row of exactly 3 equal cards with images) | 15/32 | 5/15 | 3/13 | 10/17 |
| Row of 3+ equal SQUARE-ish photo cards (any column count) | 14/32 | 5/15 | 5/13 | 9/17 |
| Centred hero headline | 12/32 | 5/15 | 4/13 | 7/17 |
| Scroll reveal / fade-up animation (measured live: opacity 0 below fold became visible, or library/class markers) | 20/32 | 4/15 | 3/13 | 16/17 |
| Instagram link anywhere | 17/32 | 4/15 | 4/13 | 13/17 |
| Indulge/delight/treat/decadent/heavenly/irresistible-style copy (any) | 17/32 | 4/15 | 3/13 | 13/17 |
| Copy: treat / treats | 11/32 | 4/15 | 4/13 | 7/17 |
| Custom fade/slide/rise @keyframes in CSS (toast/accordion libs excluded) | 8/32 | 4/15 | 3/13 | 4/17 |
| Uppercase button labels | 8/32 | 4/15 | 4/13 | 4/17 |
| Arrow glyph in at least one button | 5/32 | 4/15 | 4/13 | 1/17 |
| Arrow glyph in first hero CTA | 4/32 | 4/15 | 4/13 | 0/17 |
| Hero layout: text over full-bleed photo | 14/32 | 3/15 | 2/13 | 11/17 |
| Copy: delight* | 12/32 | 3/15 | 2/13 | 9/17 |
| Dark/colour overlay on hero photo | 8/32 | 3/15 | 2/13 | 5/17 |
| Marquee / ticker (infinite CSS animation) | 4/32 | 3/15 | 3/13 | 1/17 |
| Italic part inside any h1/h2/h3 | 4/32 | 3/15 | 3/13 | 1/17 |
| Serif headline WITH italic part | 4/32 | 3/15 | 3/13 | 1/17 |
| Gradient text in headings | 3/32 | 3/15 | 3/13 | 0/17 |
| Pill-badge kicker above headings | 5/32 | 2/15 | 2/13 | 3/17 |
| Three-up grid of SQUARE photos | 6/32 | 1/15 | 1/13 | 5/17 |
| Copy: indulg* | 6/32 | 1/15 | 0/13 | 5/17 |
| Stats row (3+ big numbers) | 5/32 | 1/15 | 1/13 | 4/17 |
| Testimonial carousel / slider / marquee | 3/32 | 1/15 | 1/13 | 2/17 |
| Instagram strip / feed section | 3/32 | 0/15 | 0/13 | 3/17 |
| Horizontal overflow at 390px | 0/32 | 0/15 | 0/13 | 0/17 |

**Ten patterns that read as "default AI/template" (figures: all / AI-built / Lovable / template):**
1. Pill buttons: first hero CTA is a pill on 15/32 all; 9/15 AI-built; 9/13 Lovable; 6/17 template; most buttons on the page are pills on 17/32 all; 9/15 AI-built; 9/13 Lovable; 8/17 template.
2. Split hero, text left / rounded photo right: 14/32 all; 9/15 AI-built; 9/13 Lovable; 5/17 template. (Template builds prefer text over a full-bleed photo: 14/32 all; 3/15 AI-built; 2/13 Lovable; 11/17 template.)
3. Star rating / review count as social proof near the hero: 16/32 all; 12/15 AI-built; 10/13 Lovable; 4/17 template.
4. Line icons (lucide-style) in feature cards: 11/32 all; 11/15 AI-built; 10/13 Lovable; 0/17 template.
5. Rounded cards with a soft box-shadow: 14/32 all; 10/15 AI-built; 8/13 Lovable; 4/17 template.
6. Small uppercase letter-spaced kicker (or pill badge) above headings: 12/32 all; 8/15 AI-built; 8/13 Lovable; 4/17 template.
7. One accent-coloured word in the H1: 9/32 all; 7/15 AI-built; 7/13 Lovable; 2/17 template. Serif H1: 12/32 all; 7/15 AI-built; 5/13 Lovable; 5/17 template; serif with an italic/script part: 4/32 all; 3/15 AI-built; 3/13 Lovable; 1/17 template.
8. Cream or pastel page background (22 of 32 hero backgrounds) with a pastel gradient wash or glow: 11/32 all; 9/15 AI-built; 9/13 Lovable; 2/17 template.
9. A testimonial / reviews band (static three-up cards far more often than a carousel): 17/32 all; 8/15 AI-built; 8/13 Lovable; 9/17 template; carousel only 3 of 32.
10. "Handcrafted / fresh / joy / made with love" copy: handcrafted/artisan 17 of 32, joy/happy 18 of 32, fresh baked/made 16 of 32, crafted/made with love 13 of 32. The literal indulge/delight/treat family is on 17/32 all; 4/15 AI-built; 3/13 Lovable; 13/17 template, mostly the template showrooms.
Also frequent: emoji as icons 9/32 all; 6/15 AI-built; 6/13 Lovable; 3/17 template; trailing arrow in the hero CTA 4/32 all; 4/15 AI-built; 4/13 Lovable; 0/17 template; scroll reveal 20/32 all; 4/15 AI-built; 3/13 Lovable; 16/17 template; marquee/ticker 4/32 all; 3/15 AI-built; 3/13 Lovable; 1/17 template.

How the tests were defined: pill = border-radius >= half the button height, measured on up to 14 visible button-like elements per page ("majority" = at least half of them); first hero CTA = first visible, hit-tested button in the first 1440x900 screen that sits at or below the H1 and is not in the nav; centred hero = H1 computed text-align centre (or centred box); photo grid = a row of 3+ equal-width cards each containing an image, "square" = image ratio 0.85-1.2; rounded cards = radius >= 8px with a visible box-shadow, at least two on the page; kicker = a short uppercase (or all-caps) label of 2-48 characters directly before an H1-H3 and smaller than it, or a pill badge in the same slot; reveal = below-the-fold elements at opacity <0.1 at load that were visible after scrolling, or AOS / framer appear / Webflow IX / Wix motion / Squarespace fade markers, or custom fade/slide/rise keyframes in the CSS.

## 4. Fingerprint detail

**Fonts (H1 first family):** Fraunces x3, Playfair Display x3, Oswald x2, Cormorant Garamond x2, Baloo 2 x1, Outfit x1, Pacifico x1, ui-sans-serif x1, Fredoka x1, Bricolage Grotesque x1, Young Serif x1, Frank Ruhl Libre x1, Clash Display x1, Barlow Condensed x1, Paytone One x1, wfont_26df30_791de0c3901d4391838715b91a961887 x1, recoleta x1, Helvetica Neue x1, Instrument Serif x1, Poppins x1, Unbounded x1, wfont_26cdb8_d18478462c1d416a9ce1b823d672d588 x1, wfont_0af451_a54335605c8f4ede9159b30529b33670 x1, Fredoka One x1, Anton x1, Fira Sans x1.
**Lovable H1 fonts:** Playfair Display x2, Cormorant Garamond x2, Baloo 2 x1, Outfit x1, Pacifico x1, ui-sans-serif x1, Fraunces x1, Fredoka x1, Fredoka One x1, Anton x1, Fira Sans x1. **AI-built body fonts:** Inter x5, Poppins x2, Nunito Sans x1, ui-sans-serif x1, DM Sans x1, Nunito x1, Open Sans x1, Quicksand x1, Jost x1, Fira Sans x1.
**Body/paragraph font, all sites:** Inter x6, Poppins x3, DM Sans x3, Open Sans x2, Helvetica Neue x2, Nunito Sans x1, ui-sans-serif x1, Nunito x1, Hanken Grotesk x1, Fraunces x1, Oswald x1, Barlow x1, Outfit x1, quicksand x1, inter x1, Geist x1, poppins-v2 x1, nunito-sans-v2 x1, Quicksand x1, Jost x1, Fira Sans x1.
So the default pairing is a display face with personality (Fraunces, Playfair, Cormorant Garamond for the "premium" look; Baloo, Fredoka, Outfit, Pacifico for the "fun" look) over Inter, DM Sans, Poppins or Nunito for text. Serif H1: 12/32 all; 7/15 AI-built; 5/13 Lovable; 5/17 template; serif headline with an italic or script part: 4/32 all; 3/15 AI-built; 3/13 Lovable; 1/17 template.

**Hero layout (pass 2):** split: text left, image(s) right x13, centred text over full-bleed photo x8, left text over full-bleed photo x6, centred text, photos below/around x2, left-aligned text, photos below/around x1, left-aligned text, no photo in first screen x1, split: image(s) left, text right x1.
**Hero background colour at the centre of the first screen:** cream/beige x18, white x7, pastel pink/peach x4, dark x1, saturated/mid x1, pale other x1 (AI-built only: cream/beige x12, pastel pink/peach x2, white x1). Cream or pastel (cream/beige + pastel pink) is 22 of 32.
**First hero CTA wording (28 sites have one):** 13 of 28 say order / shop / pedir ("Order Now" x6, "Order Online", "Order delivery", "Order on WhatsApp", "Order Delivery / Pickup", "Call to Order", "Pedir"); the rest are "See the Menu", "View Our Menu", "Explore Menu", "Explore treats", "Find your flavor", "Get Directions", "Find a Scoop", "Our Flavors", "Bake Me Happy", "About us". No site's hero CTA says anything about building or customising, except the Bolt cake cabinet ("Build your celebration cake").
**H1 wording:** fresh/bake in 11 of 32; joy/happy/smile/love in 9; every/daily in 8; made/crafted/hand in 6; scoop in 5; sweet in 4. Typical shapes: "A scoop of joy on every spoon.", "Freshly Baked Happiness Every Day", "Freshly Baked, Just for You!", "Baked Fresh, Loved Daily", "Golden Layers, Baked with Love", "Handcrafted treats, made to delight.", "Making life a little sweeter, one scoop at a time.", "Scoop joy before it drips".
**Copy words (sites containing the word anywhere on the page):** joy/happy/happiness 18, handcrafted/artisan 17, freshly baked/made 16, crafted with / made with love 13, delight* 12, treat(s) 11, premium/gourmet/luxury 10, sweet moments/sweet tooth/sweeten 10, irresistible/scrumptious/magic 7, family-owned/since YYYY 7, indulge* 6, heavenly/bliss/divine 3, treat yourself 1, decadent 1. Literal "indulge/indulgence": 6 of 32 (the v0 template: "Indulge in our exquisite selection of artisanal breads, delightful pastries..."); "delight*": 12 of 32; "treat(s)": 11 of 32; handcrafted/artisan: 17 of 32. The indulge/delight family is stronger in the template showrooms than in the Lovable builds; Lovable leans on "handcrafted", "made fresh", "made with love", "joy", "sweet".
**Online ordering in the AI-built group:** visible cart / add-to-cart / builder on Sugar Station (cart in nav), Bakery Order Page template (cart + owner dashboard blurb), Baked Bites (cart, "Add to Cart", pre-order form), MiCasa (cart, "Pedir" on every card), David's Cake Cabinet (Bolt; cake builder). Everyone else sends "Order" to a phone number, DoorDash, Uber Eats or WhatsApp. A real build-your-own flow appears only in David's Cake Cabinet (Bolt) and as a "Create Your Own Sweetbite Box" section on Shopify Sweet. Nothing in the sample shows a build-your-own waffle/shake/cookie-dough flow on the homepage.
**Mobile at 390x844:** no horizontal overflow on any page; median H1 size 46px; hamburger on 23 of 32 by selector (lower bound); in the Lovable screenshots the hero CTAs stack and stay pills.

### Per-site fingerprint (H1, first hero CTA text exactly as in the source, CTA radius/height, hero layout, fonts H1 / body / button)

| # | Builder | H1 | First hero CTA | Hero layout | Fonts |
|---|---------|----|----------------|-------------|-------|
| 01 | Lovable | "Liverpool's sweetest hotline." | "Order delivery" (radius 999+px / height 54px, pill) | split: text left, image(s) right | Baloo 2 / Nunito Sans / Nunito Sans |
| 02 | Lovable | "Fresh Ice Cream Bubble Tea Homemade Desserts" | "Order Online" (radius 999+px / height 54px, pill, arrow in label) | split: text left, image(s) right | Outfit / Inter / Inter |
| 03 | Lovable | "Flavor that makes you smile" | "Order on WhatsApp" (radius 999+px / height 46px, pill) | split: text left, image(s) right | Pacifico / Poppins / Poppins |
| 04 | Lovable | "Premium ice cream made fresh with locally sourced ingredien…" | "View Our Menu" (radius 6px / height 48px, not pill) | left-aligned text, photos below/around | ui-sans-serif / ui-sans-serif / ui-sans-serif |
| 05 | Lovable | "A scoop of joy on every spoon." | "See the Menu" (radius 999+px / height 54px, pill, arrow in label) | split: text left, image(s) right | Fraunces / Inter / Inter |
| 06 | Lovable | "Freshly Baked Happiness Every Day" | "Order Now" (radius 999+px / height 62px, pill, arrow in label) | split: text left, image(s) right | Playfair Display / DM Sans / DM Sans |
| 07 | Lovable | "Bakery Order Page" | "Order now" (radius 999+px / height 44px, pill, arrow in label) | split: text left, image(s) right | Fredoka / Inter / Inter |
| 08 | Bolt | "A celebration, made your way." | "Build your celebration cake" (radius 10px / height 56px, not pill) | left-aligned text, no photo in first screen | Fraunces / Nunito / Nunito |
| 09 | v0 | "Freshly Baked, Just for You!" | "Order Now" (radius 6px / height 40px, not pill) | centred text over full-bleed photo | Playfair Display / Open Sans / Open Sans |
| 10 | Framer | "Scoop joy before" | "Get Directions" (radius 100px / height 50px, pill) | centred text over full-bleed photo | Bricolage Grotesque / Hanken Grotesk / Baloo 2 |
| 11 | Framer | "Making life a little sweeter, one scoop at a time." | "FIND YOUR FLAVOR" (radius 999px / height 48px, pill) | centred text over full-bleed photo | Oswald / Open Sans / Oswald |
| 12 | Framer | "Sweet moments," | "Explore treats" (radius 999px / height 49px, pill) | centred text over full-bleed photo | Fraunces / DM Sans / DM Sans |
| 13 | Framer | "Baked by hand, warm by sunrise." | "See the menu" (radius 100px / height 45px, pill) | split: text left, image(s) right | Young Serif / Inter / Inter |
| 14 | Framer | "Savor Every Bite, Crafted With Care" | "Explore Menu" (radius 8px / height 39px, not pill) | left text over full-bleed photo | Frank Ruhl Libre / DM Sans / DM Sans |
| 15 | Framer | "Naturally Delicious Traditionally Italian" | "Find a Scoop" (radius 24px / height 53px, not pill) | left text over full-bleed photo | Clash Display / Fraunces / Fraunces |
| 16 | Webflow | "GLACE WEBFLOW TEMPLATE" | none in first screen | centred text, photos below/around | Oswald / Oswald / Oswald |
| 17 | Webflow | "YOUR DAILY FRESH Bake" | "ORDER NOW" (radius 12px / height 58px, not pill) | split: text left, image(s) right | Barlow Condensed / Barlow / Barlow |
| 18 | Webflow | "make your days better with yogo" | none in first screen | centred text over full-bleed photo | Paytone One / Outfit / Outfit |
| 19 | Wix | "Taste the Flavor. Scoop the Joy. Smile Big." | "Order Now" (radius 999px / height 46px, pill) | split: text left, image(s) right | wfont_26df30_791de0c3901d4391838715b91a961887 / quicksand / poppins-v2 |
| 20 | Wix | "Ice Cream" | "Our Flavors" (radius 4.5px / height 47px, not pill) | centred text over full-bleed photo | recoleta / inter / inter |
| 21 | Squarespace | "Freshly Baked Moments Delivered Daily to Your Door" | none in first screen | split: image(s) left, text right | Helvetica Neue / Helvetica Neue / Helvetica Neue |
| 22 | Squarespace | "Baked Fresh, Loved Daily" | none in first screen | left text over full-bleed photo | Instrument Serif / Helvetica Neue / Helvetica Neue |
| 23 | Shopify | "Golden Layers, Baked with Love" | "Bake Me Happy" (radius 0px / height 48px, not pill) | left text over full-bleed photo | Poppins / Poppins / Poppins |
| 24 | Durable | "Coffee Daily Corporation" | "About us" (radius 8px / height 56px, not pill) | left text over full-bleed photo | Unbounded / Geist / Geist |
| 25 | Wix | "Chill" | "Grab A Treat" (radius 30px / height 48px, pill) | left text over full-bleed photo | wfont_26cdb8_d18478462c1d416a9ce1b823d672d588 / poppins-v2 / poppins-v2 |
| 26 | Wix | "Melty Magic" | "shop now" (radius 15px / height 50px, not pill) | split: text left, image(s) right | wfont_0af451_a54335605c8f4ede9159b30529b33670 / nunito-sans-v2 / wfont_0af451_a54335605c8f4ede9159b30529b33670 |
| 27 | Lovable | "🍦 Sweets" | "Call to Order" (radius 999+px / height 52px, pill) | split: text left, image(s) right | Fredoka One / Quicksand / Quicksand |
| 28 | Lovable | "All things waffle." | "Order Delivery / Pickup" (radius 999+px / height 52px, pill) | split: text left, image(s) right | Anton / Inter / Inter |
| 29 | Lovable | "Handcrafted treats, made to delight." | "Order Now" (radius 0px / height 44px, not pill) | split: text left, image(s) right | Cormorant Garamond / Inter / Inter |
| 30 | Lovable | "Freshly Baked Happiness" | "Explore Our Menu" (radius 999+px / height 56px, pill) | centred text over full-bleed photo | Playfair Display / Poppins /  |
| 31 | Lovable | "BOROGODÓ" | "Conheça nosso cardápio" (radius 0px / height 51px, not pill) | centred text over full-bleed photo | Cormorant Garamond / Jost / Jost |
| 32 | Lovable | "Pasteles Brasileños, rollos y más delicias artesanales. Haz…" | "Pedir" (radius 10px / height 40px, not pill) | centred text, photos below/around | Fira Sans / Fira Sans / Fira Sans |

## 5. Reading by builder family

- **Lovable (13):** the same skeleton again and again: sticky white or cream nav with a pill CTA at right, split hero, pill badge or uppercase kicker above the H1, accent word in the headline (pink "Bubble Tea", copper italic "Happiness", pink "joy", red "WAFFLE."), pill CTAs (9/13 first CTA is a pill; 4 have a trailing arrow), 3-up feature cards with lucide icons, 4-up product cards, star-rating pill, "Edit with Lovable" badge. CSS is Tailwind with shadcn-style variables on every one (--primary, --radius, ...), and several ship Tailwind-config fade-up / fade-in keyframes. Outliers that were clearly briefed: Aloo Dessert (retro mascot, hard offset shadows), Wafflelicious (condensed Anton, black/red), Brunchy (Pacifico, pink gradient), Borogodo (dark editorial).
- **v0 (1) / Bolt (1):** v0's bakery template is the most literal default: Playfair H1 centred on a 80%-cream wash over a croissant photo, "Indulge in our exquisite selection...", three white rounded cards with shadow, "Why Choose Us?", "Visit Us Today!". Bolt's cake cabinet is the opposite: custom illustrated cake, Fraunces, chunky outlined cards.
- **Framer (6):** the showroom look: full-bleed or centred hero, pill badges, serif or chunky grotesk, scroll-triggered appear on almost every element (framer appear ids on all 6), marquee ticker strips, Instagram strip ("Follow the daily bake @bakeryco", "Fresh from @scoopa"), testimonial grids, "Made in Framer" badge.
- **Webflow (3), Wix (4), Squarespace (2), Shopify (1), Durable (1):** photo-led heroes (often with a dark or colour scrim), uppercase condensed headlines (Oswald, Barlow Condensed), motion built into the platform, Instagram icons in the header/footer, and placeholder or demo copy. Squarespace's two "ai-demo" templates are plain: big serif/grotesk headline over a photo, "Freshly Baked Moments Delivered Daily to Your Door", "Baked Fresh, Loved Daily", no hero CTA.

## 6. Five lines on how a default AI would build this homepage

1. **Hero:** a warm cream or pastel-pink page, sticky nav with the logo left and a pink or terracotta pill "Order Now" at right, then a two-column hero: left, a small pill badge ("Rated 4.9 by 1,040+ guests" or "Open tonight"), a two- or three-line display headline in Fraunces/Playfair (or a chunky rounded face like Baloo/Fredoka) with one word in the accent colour or italic ("A scoop of joy on every spoon."), a two-line subhead, a filled pill CTA with an arrow plus a ghost pill ("View Menu"), and a five-star line; right, one big rounded-corner photo with a soft shadow and a floating review chip.
2. **Body:** a marquee or three icon cards in rounded white boxes with lucide line icons ("Made fresh / Delivered hot / Loved locally"), then "Featured treats" as four soft cards (photo, name, price, outline "Add to Cart"), each section opened by a tiny letter-spaced uppercase kicker ("THE MENU", "OUR STORY") over a serif H2, an "Our story" two-column block with an overlapping second photo and a three-tile stats row (4.9 / 1,000+ / 30+ flavours), a three-card star-rated testimonial band ("What sweet folks are saying"), and a pastel-gradient or chocolate-brown CTA banner ("Come say hi. We've got a scoop with your name on it.").
3. **Copy:** "handcrafted", "made fresh daily", "baked with love", "joy", "sweet moments", "treat yourself", "made to delight", with a pun in the H2s and emoji or lucide icons doing the work of product imagery (waffle, cookie, cup); trust is a Google star rating and review count, not a person or a process.
4. **Motion and finish:** fade-up on scroll (animate-fade-in / fade-up keyframes), slow floating blobs or a ticker, lots of rounded-2xl radii and soft glow shadows, a dark chocolate footer with "Made with a heart in <city>"; everything responsive by stacking to one column with a hamburger and full-width pill buttons.
5. **Ordering:** "Order Now" goes to a menu list, a phone number, DoorDash/Uber Eats or WhatsApp; where there is an on-site cart it is a generic product-card grid with an Add to Cart button and a cart icon in the nav. The default has no concept of a visitor composing their own waffle, shake or cookie dough, so the build-your-own flow that is Charlie's whole point is exactly what a default build would bolt on last, as another card grid.
