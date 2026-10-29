# Charlie's Desserts, round 2. Pages, a header, a sleeker flow, more of their photos and film

For the build session that made `charlies-prototype/`. Raka's words on 29 Oct, after seeing it live.
- "do we not design a home page and different pages ... on the header as well and all?"
- "I'm also missing kind of like photos and videos and overall flow ... it's a bit too much and it should be more sleek
  the flow"

The art he liked stays (the hat, the pour, the golden ticket, the table ticket). What changes is the shape. Today it's
one page of 25 screens at 1440 and 33 at 390 with no navigation, eight long sections in a row (hero, builder,
favourites, the 89 row menu, three roll interludes, the order form, the booking, the shops). It reads as everything at
once.

## Start from the live version, not your folder

`charlies-prototype-live.zip` (attached) is exactly what's on https://astra-charlies-prototype.netlify.app/, your build
plus Astra's fixes. Put these into your source first, so your build tools don't undo them.
1. Favourites. Photos only where the photo shows that item, Charlie's Creation waffle (p11) and White Choc & Raspberry
   cookie dough (p08). The other four get `.fav__pic--sauce` panels in their sauce colour with the menu drips
   (Charlie's Creation shake #4b2714 and #978277, Biscoff #a35b22 and #caa07f, Grimace #3b3a9e and #8f8fe0, White Stars
   #cdb88f and #faf5eb). Never caption one of her photos as an item it doesn't show.
2. No blank screen after the hat dive. In `js/hero.js` the hero fades as its lilac lands (`f = clamp((p - 0.86) / 0.14,
   0, 1)`, opacity `1 - f`, pointer events off once `f > 0`), and in CSS `.motion .hero { z-index: 5 }` with
   `.motion .make { margin-top: -100svh }` so the builder waits underneath. Keep the result if the dive stays.
3. Plus and minus on the quantity buttons drawn as SVG lines, never the U+2212 glyph.
4. Under "Your way, at the menu's prices", "The photo shows it the way Charlie's serves it."
The plan site (`charlies-plan-live.zip`) is final. Don't touch it, except retaking the six screenshots in "What you saw in
the sketch" from the new build at the end.

## 1. Pages and a header

- **A header on every page**, slim, over the hero, solid once scrolled. Her logo (home link), then Make your own, Menu,
  Birthdays, Find us. At the right the Order button with the live total ("£9.50 Order"). On a phone, logo, a Menu
  button that opens a full screen solid panel, and Order. Each page's header calls that page's own action too.
- **Four pages.**
  - `/` Home. The hat hero, make your own with the pour, the favourites, one full bleed moment of their world, a
    birthdays teaser and a find us strip, then the foot.
  - `/menu/` The whole menu as text, the 89 rows, grouped as today. Every "Make it yours" opens the builder on Home with
    that item loaded, every "Add" goes straight on the order.
  - `/birthdays/` The party booking, the giant number, the table and the golden table ticket.
  - `/find-us/` Both shops, addresses, hours, FSA ratings, Huddersfield's frozen yoghurt, each with Order and Book.
- **Ordering becomes a drawer**, not a section. Order (header, bar, builder, menu) slides up one panel with shop,
  collect or delivery, time, name and phone, and it ends on the golden ticket in the drawer. Same on every page.
- **One order across pages.** Save the order in sessionStorage (wrapped in try and catch, the page still works without
  it), so the bar, the ticket and the drawer keep it from page to page. A booking the same.
- Ten sections at most on any page. The walk still holds on every page, a way to that page's action at every half
  screen at 390 and 1440.

## 2. Sleeker

- **Home is short.** Target 8 to 10 screens at 1440, 12 to 14 at 390. Each section does one job, less text in each.
- **Cut from Home.** The 89 row menu (to `/menu/`), the order form (to the drawer), the booking form (to
  `/birthdays/`), the shop cards (to `/find-us/`, a one line strip stays), and the three roll interludes (Waffles,
  Sundaes, "Every one of them"), which become the one full bleed moment.
- **The builder in one pinned screen.** Base, sauce, toppings as three short steps beside the stage, each a single
  row a thumb can scroll sideways on a phone, the total and Order always in view. The pour and the falling toppings
  exactly as now.
- **One button style, one heading style, one note style**, sized on purpose. Nothing repeated twice on one screen.

## 3. More of their photos and film

- **Their photos carry the pages, big, full bleed.** Use every true photo of theirs somewhere: p02 overhead spread, p06
  white shake, p08 and p13 cookie dough, p11 waffle with spoon, p16 sweets macro, p17 shake held up, p04 blue shake (logo
  cropped). Each page opens on one (Menu on p02, Birthdays on p11, Find us on the shop).
- **Their own Instagram photos are theirs too** (not the reels). The shopfront of 27 Oct (DfAgHSVgLOH), the giant
  frozen yoghurt cup at the purple door of 22 Oct (DezobVFgAlz), the frozen yoghurt cups of 26 Oct (De95MO1A9-o), the
  counter of 25 Oct (De6qWbXgnu8). Crop out the text baked into them, never show a face as a named person, zoom for
  third party marks. Find us opens on the shopfront, Huddersfield on the giant cup.
- **Film where it means something.** One full bleed loop on Home in the one moment of their world (a pour over a
  waffle, an ice cream swirl or the sweets), plus the ones you have. Licence read on the clip's own page (Mixkit
  `copyrightNotice` "Free", or Pexels with the page read), never captioned or claimed as theirs, muted, played only on
  screen, never under reduced motion or data saver, a poster always. The handover asks Danielle for her reels.

## 4. Unchanged

Every rule in the first brief still holds, sections 13 to 16 above all. Prices only from `menu.json`, totals labelled,
the prototype note on every page, Mona Sans and Fragment Mono, no Claude look, no Wonka, no Uber on the prototype, copy
rules (no dashes, no colons, contractions), noindex on every page. The hat, the pour, the golden ticket and the table
ticket stay as they are.

## 5. Order of work, and what to send back

1. First look. The header and the new Home, its first three screens at 1440 and 390, plus the drawer open on a phone.
   Send them and wait for Raka's go.
2. The rest in one pass. Your `qa/` checks on every page, each plant caught, the walk on every page, the sums through the
   drawer, the order kept from Home to `/menu/` and back.
3. Final look. Every section of every page at 1440 and 390, and one self contained HTML file per page.
4. On "final", one zipped folder with every page at the same paths, so it deploys over the live site and every link in
   the plan still works. A short list of what changed.
