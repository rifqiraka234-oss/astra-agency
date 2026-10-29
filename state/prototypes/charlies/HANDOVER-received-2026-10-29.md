# Handover. Charlie's Desserts prototype and plan

For Raka at Astra, 29 Oct 2026. Two static sites, ready to drop on Netlify as they are. Nothing has been deployed.

| Folder | What it is | Netlify site |
|---|---|---|
| `charlies-prototype/` | The site Danielle said "Yes pls" to: build your own dessert at her menu prices and order it straight from Charlie's | astra-charlies-prototype |
| `charlies-plan/` | The plan behind it in Astra's voice, what it does, what runs underneath, six weeks to live, €10,000 | astra-charlies-plan |

Both carry noindex three ways: a robots meta tag, `robots.txt` disallowing everything, and `_headers` with
`X-Robots-Tag: noindex, nofollow`. Both have their hat as the favicon and a `404.html` in their style. Each has a
`_redirects` too, so Netlify answers `research/`, `qa/` and this file with the 404 page. They stay in the folder for
Astra, they just aren't served to visitors.

**To deploy.** On Netlify, drag either folder (or its zip from `final-look/`) onto "Deploy manually". No build step, no
settings. Each zip holds the site's files at its root, not inside a folder, so `index.html`, `_headers` and
`_redirects` land at the top of the site. In the plan, the email button reads `mailto:RAKA_EMAIL`; put the real address in `charlies-plan/index.html`
before it goes up (one place, search for `RAKA_EMAIL`).

**To look offline.** `final-look/charlies-prototype.html` and `final-look/charlies-plan.html` are each one self
contained file, every image, font and script inside, and they open by double click. Three of the four films ride along;
the confetti keeps to its still there, so the file stays a sensible size. The Netlify folders have all four.

---

## Who it's for and the one action

- **The craving** (a teenager, student or parent in Brighouse or Huddersfield, on a phone, at 7pm, from a post). One
  action, **order it from Charlie's**. Build it, watch it being made, see the ticket, pick collect or delivery and a
  time, and it prints as a golden ticket. Every order control carries `data-action="order"`, and the order bar is on
  every screen.
- **The party planner.** **Book a table that confirms**, party size, shop, occasion, day and UK time, ending on a
  golden table ticket stamped "Confirmed". Controls carry `data-action="book"`.
- **Sharing or treating.** The Ultimate Box, the sharers and anything else on the menu go straight on the order beside
  the creation, and the date night is a booking occasion.

## What's real, and what's illustrative

**Real.** Every price, from Charlie's April 2026 menu (`menu.json`, transcribed from their PDF) and the frozen yoghurt
post of 26 Oct 2026. Their logo, their top hat (traced from the logo), their drips (traced from page 1 of their menu),
their photos, their two addresses, Brighouse's hours, both FSA ratings (5 and 4, from the FSA's own records, linked).

**Illustrative, and labelled so on the page.**
- Every total reads "Estimated from Charlie’s menu, final price at the counter", because the menu doesn't say what a
  create your own base includes. The builder treats a base as plain and adds each sauce and topping at list price.
- Collection and booking times are "example" times inside opening hours, in UK time. Huddersfield's slots say its hours
  are still to confirm.
- Delivery shows "Delivery area set by Charlie’s". No fee, radius, minimum or wait time is stated anywhere.
- The order and the booking are a mock. Nothing is sent anywhere, and the prototype note says so at the top, on the order
  form, on the booking form and in the foot. "A prototype by Astra agency for Charlie’s Desserts. Prices from Charlie’s
  menu. Nothing here places a real order or booking."
- What each named favourite "comes with" is read from its menu description, matched to the builder's own sauces and
  toppings where they exist. Anything added goes on top at list price, taking something off never lowers the price.

## Every outside photo and film, and its licence

None is captioned or shown as Charlie's. Each sits as atmosphere, never as "their" dessert, and each is muted,
decorative (`aria-hidden`), loaded only as it nears the screen, and never plays under reduced motion or data saver.

| File | What it is | Source page | Creator | Licence |
|---|---|---|---|---|
| `media/film/bokeh.mp4` | Warm string lights out of focus, behind the hat | https://www.pexels.com/video/a-panning-video-of-blurred-lights-5824154/ | Luis Becerra Fotógrafo | Pexels License, https://www.pexels.com/license/ |
| `media/film/choc-pour.mp4` | Milk chocolate pouring, above the twelve sauces | https://www.pexels.com/video/creamy-chocolate-4458591/ | K (@kelly) | Pexels License |
| `media/film/gold-glitter.mp4` | Gold glitter, inside the golden ticket's foil | https://www.pexels.com/video/digital-abstract-art-5561376/ | Dan Cristian Pădureț | Pexels License |
| `media/film/confetti.mp4` | Confetti falling, on the table when a booking confirms | https://mixkit.co/free-stock-video/close-up-shot-of-multicolored-metallic-confetti-falling-in-slow-99976/ | Mixkit | Mixkit Stock Video Free License, https://mixkit.co/license/#videoFree |
| `media/film/sprinkles.webp` | Sprinkles, close up, above the toppings | https://www.pexels.com/photo/close-up-shot-of-sprinkles-8471601/ | Katie Rainbow | Pexels License |

Each item page was read on 28 or 29 Oct 2026 and its notice written down (`_downloads/stock/LICENCES.md` in the
working folder has the full ledger, the rejected items and why). No faces, no brands, checked on each still. The two
licences allow commercial use and changes, with no credit needed. Four Mixkit clips marked "Restricted" were turned down.

**Their own photos.** All from charliesdesserts.com. Photo 15 (a child) was never downloaded or used. Photo 14 (the
shop, with a robot maker's marks and branded sweets) is not shown anywhere; the awning and shopfronts are drawn from it.
Photo 02 is cropped above a biscuit in its corner. Photo 04 is cropped above the logo baked into it.

**Drawn by us.** The crepe, the whippy sundae and the frozen yoghurt (Charlie's has no photo of them), the 3D sweets and
toppings, the table and the shopfronts. Brand names on the menu (Oreo, Biscoff, Bueno, Nutella, Aero, Grimace) appear as
text only, never drawn.

**Fonts.** Mona Sans and Fragment Mono, both SIL Open Font License 1.1, files and licences in `fonts/`.
**Libraries.** three.js r186 (MIT), GSAP 3.15 with ScrollTrigger (GreenSock Standard no charge license, free for
commercial use), Lenis 1.3.26 (MIT), all self hosted in `js/vendor/` with their licences.

## What Danielle should confirm

1. What a "from £5.50" create your own base includes, so the builder can price it exactly.
2. Huddersfield's opening hours.
3. Whether Brighouse serves frozen yoghurt too (the site only says Huddersfield, from the post of 23 Oct).
4. Whether "Golden Box" (the half term post) has replaced The Ultimate Box. The site keeps The Ultimate Box, as the menu
   names it.
5. The prices of the sixteen toppings the menu doesn't price one by one. It says "Toppings from £1.00", so they're at
   £1.00.
6. Which toppings count as "standard" for frozen yoghurt.
7. The names of the cones. The menu shows them as pictures, so the site lists them by price only.
8. Doggy ice cream has no price on the menu, so the site says to ask at the counter.

## What she'd swap in

Her own reels and footage (the counter, a sauce being poured on a real waffle, the shopfront at night) in place of the
stock films, real photos of a crepe, a sundae and a frozen yoghurt in place of the drawn ones, and photos of both
shopfronts.

## How it's built

A static site, HTML, CSS and vanilla JavaScript, no framework and no build step at runtime. It loads nothing from
outside its folder.
- **The hero** is real time 3D (three.js) drawn in a Web Worker on an OffscreenCanvas, so it never holds up the page.
  Browsers without one run the same scene on the page. Without WebGL, and under reduced motion until it's ready, a still
  of the same scene shows (`media/hero-poster-*.webp`, rendered from the scene itself).
- **The pour** is one WebGL shader (`js/pour.js`). The curtain and the coat use a distance field traced from their menu's
  drips, the drizzle is a path drawn inside the dessert's own silhouette, all lit from their thickness with gloss and
  translucency.
- **The toppings** are 3D (`js/toppings3d.js`), every one of the nineteen, with simple physics. Without WebGL they fall
  as 2D sprites with the same physics (`js/toppings.js`).
- **The one order** is `js/state.js`. Money is in pence so no total drifts. `js/menu-data.js` is generated from
  `menu.json` by the build tools, and the menu, the bases, sauces and toppings in `index.html` are generated from it too.
- **Phone first.** Checked at 320, 360, 390, 430, 768, 1024, 1440 and 1920.

## The checks, with numbers

Every check in section 18 of the brief runs clean, then with a planted fault it must catch (`qa/check.js`, its last run
in `qa/last-run.txt`). The plan's own checks are in `charlies-plan/qa/`.

**The prototype, 14 of 14**, every one with its planted fault caught (run of 29 Oct 2026).

| Check | Clean | Planted fault, caught |
|---|---|---|
| The walk, 390 and 1440 | An order action a tap can reach at every half screen down the whole page, 66 steps at 390 and 51 at 1440 | The bar and every Order button hidden, no action at any step |
| The hero share, 390 and 1440 | 27.4% at 390 and 27.8% at 1440 of the first screen is their hat, dessert, logo and photos, measured from the screen itself (the 3D sweets aren't counted) | Their pictures hidden, 0.8% at 390 and 1.3% at 1440 |
| The look, 390 and 1440 | Only Mona Sans and Fragment Mono, no italics, no kickers, no pills, no arrows, no soft shadow cards, no count ups, 9 top level parts, light and dark turning twice | Poppins, an italic heading, three kickers, a pill with an arrow, a shadow card |
| The sums | 30 random orders through the page at 390 and 1440 plus 4 with the real pour and the falling toppings, priced from `menu.json` on their own, matched to the penny on the bar, the ticket, the step total, the order summary, the golden ticket and the state | Six prices changed in the data the page reads (the sauce, the create your own bases, the cookie dough, the whippy sundae, the small frozen yoghurt and The Ultimate Box) |
| The menu | All 115 menu lines and their prices found as text | One row removed |
| The copy | No dashes, no colons, no emoji, one exclamation mark on the whole site, no banned words, nothing uncontracted, no Uber, the prototype note 4 times, 93 contractions | An em dash, a colon, two more exclamation marks, banned words, "it is" |
| Overflow | 320, 360, 390, 430, 768, 1024, 1440 and 1920, and a resize from 1440 to 320, nothing runs off the side, every shown copy of the price label reads in full, and no word is cut in two across lines | A wide element, caught at every width |
| Errors | 38 images decoded and 4 films at each size, 0 console errors, 0 failed requests | A missing image |
| axe | 12 runs clean, top, middle and end, both motion modes, both sizes | An image with no alt and an empty button |
| Reduced motion and no JavaScript | Without JavaScript the headline, the hero still, 6 bases, 12 sauces, 19 toppings and 89 menu rows show, with 150 prices as text. Under reduced motion the shutter starts open, there’s no intro, and a pour, a topping and a base swap finish at once | The sauces hidden |
| The order and the booking | At both sizes an order is placed and stamped (Brighouse, collect, a time, a name) and a booking for 7 confirms, the table ticket stamped "Confirmed". With motion on, all 7 chairs end up round the table, not under it | The time slots emptied, so the order can’t be placed, and the chairs pulled to the middle of the table |

**The plan, 8 of 8**, every one with its planted fault caught.

| Check | Clean | Planted fault, caught |
|---|---|---|
| The sums | 27 slider positions and the price, every figure worked out from `plan.json` on its own and matched to the pound | The delivery fee rate (30% to 31%) and the price (€10,000 to €10,500) changed in the data the page reads |
| The look, 390 and 1440 | Mona Sans and Fragment Mono only, no italics, kickers, pills, arrows or shadow cards, 9 chapters, 1 bright chapter | Poppins, a pill with an arrow |
| The copy | No dashes, colons or emoji, no exclamation marks, no banned words, nothing uncontracted, never "old", "outdated" or "broken", no "you pay", no Foodhub, the brief's fixed lines all there | Each of those planted |
| Overflow | 320 to 1920, nothing runs off the side and no word is cut in two | A wide element |
| Errors | 15 images at each size, 0 errors | A missing image |
| axe | 12 runs clean, top, middle and end, both motion modes, both sizes | An image with no alt and an empty button |
| No JavaScript | £6,756 a year at the defaults, €10,000, 4 findings, 9 tickets, 6 weeks, 15 pictures, all there as text | The year's figure set to £0 |

**Lighthouse** (performance, Lighthouse 12.8.2, served the way Netlify serves, simulated throttling).

| | Score | First paint | Largest paint | Blocking time | Layout shift | Speed index |
|---|---|---|---|---|---|---|
| Phone, three runs | 83, 83, 83 | 1.2 s | 4.2 s | 80 to 100 ms | 0.06 | 4.1 s |
| Desktop | 99 | 0.3 s | 0.8 s | 20 ms | 0.03 | 1.0 s |

The phone runs are Lighthouse's slow 4G phone. The largest paint is their sign on the shutter, the shop's first frame,
and the 3D starts after it, in its worker, so it doesn't hold the page up. The reports are in `_tools/lh/final-*.json`
in the working folder.

## What I couldn't do

- **Real ordering and payments.** These need the payment provider and the shop tablet or printer that the plan
  describes. The prototype is a full mock of the flow, stamped at the end.
- **Their reels.** Instagram reels can't be taken, so the films are licensed stock until her own footage is in.
- **A soft serve film.** No free clip met the rules, a cone or cup filling with no faces and no brands, so there isn't one.
- **The hero share.** Their hat, dessert, logo and photos fill 27 to 28% of the first screen, measured from the screen
  itself, so it clears the 25% floor but not the 35% aim. The first screen also carries the question, the six bases and
  the order bar, and our 3D sweets and their awning stripes aren't counted.
