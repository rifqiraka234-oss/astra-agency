# Handover. Charlie's Desserts prototype and plan

For Raka at Astra, 29 Oct 2026, round 2. Two static sites, ready to drop on Netlify as they are. Nothing has been
deployed.

| Folder | What it is | Netlify site |
|---|---|---|
| `charlies-prototype/` | The site Danielle said "Yes pls" to, now four pages with a header: Home, `/menu/`, `/birthdays/` and `/find-us/` | astra-charlies-prototype |
| `charlies-plan/` | The plan behind it, final. Only its six "What you saw in the sketch" screenshots are new, retaken from this build | astra-charlies-plan |

Both carry noindex three ways: a robots meta tag on every page, `robots.txt` disallowing everything, and `_headers`
with `X-Robots-Tag: noindex, nofollow`. Both have their hat as the favicon and a `404.html` in their style. Each has a
`_redirects` too, so Netlify answers `research/`, `qa/` and this file with the 404 page.

**To deploy over the live site.** In Netlify, open astra-charlies-prototype, go to Deploys, and drop
`round-2/final-look/charlies-prototype.zip` (or the `charlies-prototype/` folder) onto the drop area. Every page sits at
the same path as before, `/` is still Home, so the plan's "Open the sketch" links still land on it. The new pages answer
at `/menu/`, `/birthdays/` and `/find-us/`. For the plan, drop `round-2/final-look/charlies-plan.zip` the same way on
astra-charlies-plan. No build step, no settings. Each zip holds the site's files at its root.

**To look offline.** `round-2/final-look/` has one self contained file per page, `charlies-home.html`,
`charlies-menu.html`, `charlies-birthdays.html` and `charlies-find-us.html`, plus `charlies-plan.html`. Every image,
film, font and script is inside, they open by double click, and they link to each other, so the order made on Home is
still there on the menu file and back.

**What changed in round 2**, against what's live today.
- A header on every page, slim, over the first screen and solid once scrolled. Her logo home, Make your own, Menu,
  Birthdays, Find us, and Order with the live total on a desktop. On a phone, the logo, Menu (a full screen panel) and
  Order. Birthdays' header adds Book.
- Four pages. Home is short, the hat, make your own in one screen, the favourites, their world, a birthdays teaser and
  a Find us line. The whole menu moved to `/menu/`, the booking to `/birthdays/`, the shops to `/find-us/`.
- Ordering is one drawer, the same on every page, from the header, the bar, the builder, a shop or the menu. It holds
  the order with how many of each, then the shop, collect or delivery, a time, a name and a phone, and it ends on the
  golden ticket.
- One order across pages. The order, the booking and the drawing on the ticket are kept in sessionStorage, read back
  through the menu's own prices, and the site works without it.
- The builder is one screen, the stage and three steps beside it, each a single row a thumb scrolls sideways on a phone.
- More of their photos, big and full bleed, and four of their own Instagram photos. One new film, a caramel pour, as the
  one full bleed moment on Home.
- Astra's four fixes from the live site are in the source, so the build tools keep them.

---

## Who it's for and the one action

- **The craving** (a teenager, student or parent in Brighouse or Huddersfield, on a phone, at 7pm, from a post). One
  action, **order it from Charlie's**. Build it on Home, watch it being made, open the drawer, pick collect or delivery
  and a time, and it prints as a golden ticket. Every order control carries `data-action="order"`, and the bar is on
  every screen of every page.
- **The party planner.** **Book a table that confirms**, on `/birthdays/`, party size, shop, occasion, day and UK time,
  ending on a golden table ticket stamped "Confirmed". Book on Find us carries the shop to it.
- **Sharing or treating.** The Ultimate Box, the sharers and anything else on `/menu/` go straight on the order beside
  the creation, and the date night is a booking occasion.

## What's real, and what's illustrative

**Real.** Every price, from Charlie's April 2026 menu (`menu.json`, transcribed from their PDF) and the frozen yoghurt
post of 26 Oct 2026. Their logo, their top hat (traced from the logo), their drips (traced from page 1 of their menu),
their photos, four of their Instagram photos, their two addresses, Brighouse's hours, both FSA ratings (5 and 4, from
the FSA's own records, linked).

**Illustrative, and labelled so on the page.**
- Every total reads "Estimated from Charlie’s menu, final price at the counter", because the menu doesn't say what a
  create your own base includes. On a desktop the header's total carries it beside it. On a phone the header's Order is
  one word and the bar carries the total with its label.
- Collection and booking times are "example" times inside opening hours, in UK time. Huddersfield's slots say its hours
  are still to confirm.
- Delivery shows "Delivery area set by Charlie’s". No fee, radius, minimum or wait time is stated anywhere.
- The order and the booking are a mock. Nothing is sent anywhere, and the prototype note says so at the top and in the
  foot of every page, in the drawer and on the booking. "A prototype by Astra agency for Charlie’s Desserts. Prices from
  Charlie’s menu. Nothing here places a real order or booking."
- What each named favourite "comes with" is read from its menu description, matched to the builder's own sauces and
  toppings where they exist. Anything added goes on top at list price, taking something off never lowers the price.
- Brighouse has no photo of its own, so on Find us its awning and its hours stand in. The shopfront that opens Find us
  is from their post of 27 Oct and isn't named as either shop.

## Every outside photo and film, and its licence

None is captioned or shown as Charlie's. Each is muted, decorative (`aria-hidden`), loaded only as it nears the screen,
played only on screen, never under reduced motion or data saver, and always has a still.

| File | What it is, and where | Source page | Creator | Licence |
|---|---|---|---|---|
| `media/film/caramel-1280.mp4`, `caramel-720.mp4` | Caramel pouring over vanilla ice cream, close up, the one full bleed moment on Home | https://mixkit.co/free-stock-video/ice-cream-with-caramel-on-a-black-background-3547/ | Mixkit | Mixkit Stock Video Free License, https://mixkit.co/license/#videoFree. The item page's `copyrightNotice` reads "Free", read 29 Oct 2026 |
| `media/film/bokeh.mp4` | Warm string lights out of focus, behind the hat on Home | https://www.pexels.com/video/a-panning-video-of-blurred-lights-5824154/ | Luis Becerra Fotógrafo | Pexels License, https://www.pexels.com/license/ |
| `media/film/gold-glitter.mp4` | Gold glitter, inside the golden ticket's foil, in the drawer on every page | https://www.pexels.com/video/digital-abstract-art-5561376/ | Dan Cristian Pădureț | Pexels License |
| `media/film/confetti.mp4` | Confetti falling, on the table when a booking confirms, on `/birthdays/` | https://mixkit.co/free-stock-video/close-up-shot-of-multicolored-metallic-confetti-falling-in-slow-99976/ | Mixkit | Mixkit Stock Video Free License |

The caramel clip was taken from its 1080p file and re-encoded in Chrome for the web, 1280 by 800 for a wide screen and
720 by 1280 for a phone, with its last second crossfaded into its first, so it loops with no jump
(`_tools/lab3d/transcode.js`). Round 1's chocolate pour and sprinkles still aren't used any more and are out of the site
folder. Each item page was read and its notice written down (`_downloads/stock/LICENCES.md` has the full ledger, the
rejected items and why). Turned down this round: Mixkit's "Waffles with syrup and berries" and "Waffle cone ice cream"
(both Restricted, personal use only), and Pexels' "Delicious waffle with chocolate sauce drizzle" (licence Free, but the
pour barely shows and a hand is in frame). No free clip of a sauce poured over a waffle met the rules.

**Their own photos.** All from charliesdesserts.com, now every true one used somewhere. Home has p11 and p08 in the
favourites and p02, p17, p13 and p16 full bleed in their world. `/menu/` opens on p02, with p04, p11, p08 and p16 beside
the groups. `/birthdays/` opens on p11 and ends on p06. Photo 15 (a child) was never downloaded or used. Photo 14 (the
shop, with a robot maker's marks and branded sweets) is not shown anywhere. Photo 02 is cropped above a biscuit in its
corner, photo 04 above the logo baked into it.

**Their own Instagram photos**, from the public post pages, the posts themselves, never the reels' film.

| File | Post | Shown | How it's cropped |
|---|---|---|---|
| `media/photo/ig-shopfront-720.webp` | 27 Oct, https://www.instagram.com/p/DfAgHSVgLOH/ (the reel's cover photo) | Opens `/find-us/` | The sign and the windows above it. The text baked into the post, across the doors, is cropped off |
| `media/photo/ig-giantcup-*.webp` | 22 Oct, https://www.instagram.com/p/DezobVFgAlz/ | Opens Huddersfield on `/find-us/` | Her back is to us. A road sign and a sticker on the pillar are cropped off, and a printed label on the door is painted over with the door's purple |
| `media/photo/ig-cups-912.webp` | 26 Oct, https://www.instagram.com/p/De95MO1A9-o/ | Huddersfield's frozen yoghurt on `/find-us/` | The three cups only. The price list text above and the banner below are cropped off |
| `media/photo/ig-lamps-*.webp` | 25 Oct, https://www.instagram.com/p/De6qWbXgnu8/ (the reel's cover photo) | The end of `/find-us/` | The top hat lamps only. The text baked into the post and the person at the till are below the crop |

`_tools/build-ig.js` makes all four from the downloads, so a crop can be changed in one place. None names a person, and
none is captioned as one shop or the other, as the posts don't say.

**Drawn by us.** The crepe, the whippy sundae and the frozen yoghurt (Charlie's has no photo of them), the 3D sweets and
toppings, the scoops in the builder, the table and the awning. Brand names on the menu (Oreo, Biscoff, Bueno, Nutella,
Aero, Grimace) appear as text only, never drawn.

**Fonts.** Mona Sans and Fragment Mono, both SIL Open Font License 1.1, files and licences in `fonts/`.
**Libraries.** three.js r186 (MIT), GSAP 3.15 with ScrollTrigger (GreenSock Standard no charge license, free for
commercial use), Lenis 1.3.26 (MIT), all self hosted in `js/vendor/` with their licences.

## What Danielle should confirm, and send

1. **Her reels.** The site carries one stock film where her own would mean more, a caramel pour. A few seconds of her
   own, a sauce poured over a waffle at the counter, the whippy machine, the shopfront at night, would replace it and
   the other stock films one for one. The reels on her Instagram can't be taken from the post pages, so we'd need the
   files from her.
2. A photo of each shopfront, named, and one of the Brighouse counter. Find us shows Brighouse's awning and hours for now.
3. What a "from £5.50" create your own base includes, so the builder can price it exactly.
4. Huddersfield's opening hours.
5. Whether Brighouse serves frozen yoghurt too (the site only says Huddersfield).
6. Whether "Golden Box" (the half term post) has replaced The Ultimate Box. The site keeps The Ultimate Box, as the menu
   names it.
7. The prices of the sixteen toppings the menu doesn't price one by one. It says "Toppings from £1.00", so they're at
   £1.00.
8. Which toppings count as "standard" for frozen yoghurt.
9. The names of the cones. The menu shows them as pictures, so the site lists them by price only.
10. Doggy ice cream has no price on the menu, so the site says to ask at the counter.

## How it's built

A static site, HTML, CSS and vanilla JavaScript, no framework and no build step at runtime. It loads nothing from
outside its folder.
- **Four pages, one set of parts.** `_tools/build-pages.js` writes the head, the header and its panel, the foot, the bar,
  the drawer and each page's script list into all four pages, so they're the same everywhere. `_tools/build-html.js`
  writes every price and every one of their photos into the pages from `menu.json` and the photo manifests.
- **The one order** is `js/state.js`, money in pence so no total drifts. It's saved in sessionStorage on every change and
  read back on every page through `js/items-data.js` (every menu item at its menu price), so a stored order can't carry a
  price of its own. Blocked storage just means a fresh start on the next page.
- **What every page shares** is `js/chrome.js` (the header, the panel, the bar, the drawer) and `js/order.js` (the
  checkout and the golden ticket). On Home the ticket's drawing is the builder's own stage; it's kept for the other
  pages, and drawn from the base and its sauces if the creation has changed since.
- **The hero** is real time 3D (three.js) drawn in a Web Worker on an OffscreenCanvas, so it never holds up the page.
- **The pour** is one WebGL shader (`js/pour.js`), and the toppings are 3D with simple physics (`js/toppings3d.js`), both
  as they were.
- **Phone first.** Checked at 320, 360, 390, 430, 768, 1024, 1440 and 1920, on every page.

## The checks, with numbers

Every check runs clean, then with a planted fault it must catch (`qa/check.js`, its last run in `qa/last-run.txt`),
now on all four pages. The plan's own checks are in `charlies-plan/qa/`, unchanged, as the plan is.

**The prototype, 33 of 33**, every one with its planted fault caught (run of 29 Oct 2026, on the final build).

| Check | Clean | Planted fault, caught |
|---|---|---|
| The walk, 4 pages at 390 and 1440 | An order action a tap can reach at every half screen of every page that isn't the header (at 390 Home 21 steps, /menu/ 27, /birthdays/ 10, /find-us/ 9, and at 1440 17, 12, 9 and 9), and on Birthdays its Book too | The bar and every Order outside the header hidden, no action at any step |
| The hero share, 4 pages at 390 and 1440 | Home 30.9% at 390 and 26.9% at 1440 of the first screen is their hat, dessert, logo and photos (the 3D sweets aren't counted). The other pages open on their photo, /menu/ 55.7% and 48.5%, /birthdays/ 55.7% and 43.2%, /find-us/ 55.7% and 43.9%. On Home the dive lands on the builder, the hero gone, never a blank screen | Their pictures hidden, and the hero kept from fading |
| The look, 4 pages at 390 and 1440 | Only Mona Sans and Fragment Mono, no italics, no kickers, no pills, no arrows, no soft shadow cards, no count ups, one button style, at most 6 sections on a page. Home is 8.6 screens long at 1440 and 10.6 at 390, /menu/ 6.1 and 13.9, /birthdays/ 4.6 and 5.3, /find-us/ 4.6 and 4.6 | Poppins, an italic heading, three kickers, a pill with an arrow, a shadow card |
| The sums, through the drawer | 28 random orders (24 instant, 4 with the real pour and the falling toppings), each made on Home (a favourite started from its row on /menu/), carried to /menu/ for its menu items and back to Home. At each of the three stops the header, the bar, the step total, the stage ticket, the drawer's cart, the golden ticket and the order's state match `menu.json`, worked out on its own, to the penny | Six prices changed in the data the page reads |
| The menu | All 120 menu lines and their prices found as text on `/menu/`, and every sauce, topping, scoop and size on the builder | One row removed |
| The copy, 4 pages and the 404 | No dashes, no colons, no emoji, one exclamation mark on the whole site (the golden ticket's line), no banned words, nothing uncontracted, no Uber, the prototype note at the top and in the foot of every page and in every drawer, and by the booking, 424 contractions | An em dash, a colon, two more exclamation marks, banned words, "it is", on the menu page |
| Overflow, 4 pages | 320, 360, 390, 430, 768, 1024, 1440 and 1920, and a resize from 1440 to 320, on every page. Nothing runs off the side, every shown copy of the price label reads in full, and no word is cut in two | A wide element, caught at every width |
| Errors, 4 pages | Every image decoded and every film found on every page at both sizes (Home 24 images and 3 films, /menu/ 7 and 1, /birthdays/ 4 and 2, /find-us/ 6 and 1), 0 console errors, 0 failed requests | A missing image |
| axe, 4 pages | 32 runs clean, top, middle and end of every page with the drawer open, and the phone's panel, both motion modes, both sizes | An image with no alt and an empty button |
| Reduced motion and no JavaScript | Without JavaScript Home shows the question, the hero still, 6 bases, 12 sauces and 19 toppings, /menu/ its 89 rows, /birthdays/ its 8 booking fields, /find-us/ both shops, their hours and the frozen yoghurt prices, every page its opening picture and the prototype note. Under reduced motion the shutter starts open, there's no intro, and a pour, a topping and a base swap finish at once | The sauces hidden |
| The order and the booking, across pages | At both sizes an order from Home's bar is placed and stamped in the drawer. On Find us Huddersfield's Order opens the drawer with Huddersfield picked and stamps. Its Book carries Brighouse to /birthdays/. A booking for 7 confirms with 7 chairs, and its table ticket is still there after /menu/ and back. With motion on, all 7 chairs end up round the table, not under it, and Home's teaser seats all 6 | The time slots emptied, and the chairs pulled to the middle of the table |
| Kept across pages | An order made on Home (cookie dough, Biscoff, gum balls, whippy) shows £13.50 on /menu/, gets a tea there and comes back to Home as £15.40 with every choice still on. A tampered stored order (a free tea, a made up item, 999 of them) comes back at the menu's own prices with the unknown parts dropped and at most 20. With storage blocked all 4 pages still open and take an order | Storage that silently forgets, so the order doesn't follow the visitor |

**Lighthouse** (performance, Lighthouse 12.8.2, served the way Netlify serves, simulated throttling).

| | Score | First paint | Largest paint | Blocking time | Layout shift | Speed index |
|---|---|---|---|---|---|---|
| Home, phone, three runs | 77, 83, 79 | 1.2 to 1.3 s | 4.3 to 5.0 s | 30 to 70 ms | 0 | 3.8 to 6.3 s |
| Home, desktop | 96 | 0.4 s | 1.1 s | 0 ms | 0 | 1.5 s |
| /menu/, phone and desktop | 91 and 99 | 1.2 s and 0.4 s | 3.5 s and 0.8 s | 20 ms and 0 ms | 0 | 1.3 s and 0.5 s |
| /birthdays/, phone and desktop | 93 and 100 | 1.2 s and 0.4 s | 3.2 s and 0.8 s | 10 ms and 0 ms | 0.001 | 1.3 s and 0.4 s |
| /find-us/, phone and desktop | 89 and 100 | 1.2 s and 0.4 s | 3.7 s and 0.8 s | 0 ms | 0.001 | 1.4 s and 0.4 s |

The phone runs are Lighthouse's slow 4G phone. Home's largest paint is their sign on the shutter, the shop's first frame,
and the 3D starts after it, in its worker. Two things were fixed for these numbers this round. The shutter now rolls up on
a transform over the awning instead of changing the awning's height, so the page doesn't shift (it measured 0.5 to 0.8
before). The builder's WebGL and the toppings' 3D now start on the first scroll toward them rather than during the load
(blocking time was 3.5 to 5.7 s before). The reports are in `_tools/lh/r2-*.json` in the working folder.

## What I couldn't do

- **Real ordering and payments.** These need the payment provider and the shop tablet or printer that the plan
  describes. The prototype is a full mock of the flow, stamped at the end.
- **Their reels.** Instagram reels can't be taken from the post pages, so the films are licensed stock until her own
  footage is in (asked for above). Their Instagram photos are in.
- **A pour over a waffle.** No free clip of a sauce poured over a waffle met the rules, so the one moment is caramel over
  ice cream.
- **A soft serve film.** No free clip met the rules, a cone or cup filling with no faces and no brands, so there isn't one.
- **A photo of Brighouse.** None of theirs is named as Brighouse, so its awning and its hours stand in on Find us.
- **The hero share at 1440.** Home's first screen is 26.9% their hat, dessert, logo and photos at 1440, measured from the screen itself, so it clears the 25% floor and not the 35% aim. At 390 it's 30.9%. The first screen also holds the question, the six bases and the bar, and our 3D sweets aren't counted.
- **Home's length.** Home is 8.6 screens at 1440, inside the 8 to 10 target, and 10.6 at 390, under the 12 to 14 target. It's short because the builder is one screen and the favourites one row. Nothing was added to pad it.
