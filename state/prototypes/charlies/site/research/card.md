# Build card. Charlie's Desserts prototype

28 Oct 2026. Sections A and B were written before the first screen was built, and the lines that needed the type, AI default and top 50 research (10, 15, 16) were filled as each landed. Every line names its source. "Brief" means
`BRIEF-for-builder.md`. "Lead notes" means `research/notes-17B-lead.md`, read and rendered today, a URL on every line.

---

## A. The visitor and the action

### 1. Who lands, and what they're thinking, in order

**Visitor 1, the craving** (brief section 8; audience from lead notes, Instagram 4,318 followers and 234 posts,
TikTok 3,857 followers and 209 videos, all six newest posts 22 to 27 Oct 2026, so they post most days and visitors
arrive from a phone).
A teenager, student, young adult or parent in Brighouse or Huddersfield, on a phone, around 7 in the evening, coming
from a post or a "desserts near me" search.
1. Is this the place, and is it open? (Brighouse 12 PM to 10 PM, their footer, lead notes h. Huddersfield hours aren't
   published anywhere we read.)
2. What can I get and how much? (Their site has no price as text anywhere, lead notes f.)
3. Can I have it my way? (Their menu, "Everything on our menu is available for your own creation from £5", PDF p.2.)
4. Can I get it now, collected or brought to me?
5. How long will it take?

**Visitor 2, the party planner** (brief 8; their "Special occasions", BIRTHDAYS, CELEBRATIONS, DATE NIGHTS, lead notes e).
Can 8 of us come on Saturday? Will it be confirmed, or am I emailing into the void? (Their form only says "We will be in
touch with you shortly to confirm your reservation", lead notes g.) Can everyone pick their own? Roughly what will it cost?

**Visitor 3, sharing or treating** (brief 8). A couple on a date night or someone treating friends. Thinking, what do two
of us share, what's the big box, can we book the date night table.

### 2. The one action for each, and the selector that finds every control for it

| Visitor | Action | Selector |
|---|---|---|
| 1 | Order it from Charlie's (build, ticket, collect or delivery, place) | `[data-action="order"]` |
| 2 | Book a table that confirms | `[data-action="book"]` (full build) |
| 3 | Order a sharer or The Ultimate Box, or book the date night | `[data-action="order"]`, `[data-action="book"]` |

Every order control on every page carries `data-action="order"`. The sticky bar's button is one of them, and it's never
the only one in view.

### 3. The flow table, refined

| Step | The visitor's question | What they see and do | The moment that answers it |
|---|---|---|---|
| 1 Hero | "Is this the place?" | Their shop at dusk. Their awning and festoon bulbs across the top, their logo, their waffle standing huge on their striped counter with Charlie's hat perched on it the way it sits on the "C" of their logo. The question "What are you making?" and the six bases as objects to tap | The awning rolls up like a shop shutter, the shop is open and the hat drops onto the waffle. Tap a base and the hat lifts off, the dessert changes under it, the hat drops back on, its price on the ticket at once |
| 2 Make it | "Can I have it my way?" | The stage stays put while the steps scroll. Sauces as drips of their own drip, toppings as heaps of the real thing, each with its menu price | **The pour.** The sauce pours in from the top of the screen, out from under the awning, and runs down their dessert in the drip silhouette traced from their menu. Toppings rain down, bounce once and settle. Each landing prints a line on the ticket and ticks the price |
| 3 Or pick a favourite | "What do people get?" | Their named favourites (Charlie's Creation, Biscoff, White Stars, Grimace) at menu price | A favourite drops out of the hat already dressed, at its menu price (full build) |
| 4 The whole menu | "What else is there?" | Every item and price as text, in their own groups, on their lilac page with the drip running down | The menu reads like their printed menu come to life (full build) |
| 5 Collect or delivered | "Can I get it now?" | Shop, collect or delivery, a slot inside opening hours in UK time, name and phone | The ticket turns gold, prints and gets stamped. No Uber anywhere (full build) |
| 6 Birthdays and celebrations | "Can we book for the party?" | Party size as a giant number to drag, 1 to 10+, their own options; date, UK time, occasion, shop | Seats appear round a table as the number grows, a golden table ticket stamped confirmed (full build) |
| 7 Two shops | "Where are you?" | Brighouse and Huddersfield, address, hours (Huddersfield "hours to confirm"), FSA 5 and 4 | Their two shopfronts in their stripe grammar (full build) |
| 8 Foot | "Anything else?" | Hours, addresses, socials, the prototype note | The order bar is still there |

The first screen and the pour (steps 1 and 2) are what this first look builds. Steps 3 to 8 come on Raka's go.

### 4. The one state, and how the form arrives filled in

```
order   = { shop, mode (collect | delivery), base, size, preset, sauces[], toppings[], extras[], qty, time, name, total }
booking = { shop, partySize, date, time, occasion, name }
```
One object in `js/state.js` (`window.CharlieOrder`). Every control writes it through `CharlieOrder.set(patch)` or `toggle(list, item)`, and every display (stage, ticket,
sticky bar, and in the full build the menu taps and the order form) re-renders from it on change. Nothing is typed twice,
so the order form opens with the base, the sauces, the toppings, the extras and the total already on its ticket.

Pricing, exactly as the brief (section 10) and the menu (`menu.json`, checked line by line against the PDF in the lead
notes, all 57 priced items match):
- Create your own bases are plain at the menu price. Waffle or crepe from £5.50, shake from £5.50, cookie dough £6.50,
  plain whippy sundae £5.00, frozen yoghurt Small £4.99, Medium £5.99, Large £6.99 (their post of 26 Oct, prices in the
  image only, lead notes).
- Sauces £1.00 each (PDF, "Sauces £1.00").
- Toppings. The PDF prints "Toppings from £1.00" and prices three of them, Gobstopper £1.50, Gum Balls £2.00,
  Pick & Mix Cup £2.00 (lead notes, discrepancy 1). The other sixteen show at £1.00, the floor the menu gives, and the
  handover asks Danielle to confirm.
- Vanilla scoop £2 or whippy £4 on a crepe, waffle or cookie dough (PDF).
- A named favourite keeps its menu price, additions go on top, removing an ingredient never lowers it.
- Frozen yoghurt toppings show as included ("UNLIMITED standard toppings", post De95MO1A9-o).
- Every total carries "Estimated from Charlie's menu, final price at the counter".

---

## B. The idea and the feeling

### 5. The feeling a buyer expects, and how the hero shows it
Walking into a sweet shop as a kid, made by a studio that dresses premium confectioners (brief 12). Their own reel calls
the visit "POV: you visit the real life wonka land" (post DfAgHSVgLOH, on screen text, lead notes; we never use the
word). So the hero isn't a page about a shop, it's the shop. Their awning, their bulbs, their counter stripes, their
hat, their dessert, big enough to want. Appetite from their photo, wonder from the hat that makes it.

### 6. The one idea, in their own words
"Welcome to Charlie’s little world of sweetness" (caption, 27 Oct 2026, https://www.instagram.com/p/DfAgHSVgLOH/)
plus "Everything on our menu is available for your own creation from £5" (their menu PDF, page 2).
The site is Charlie's little world, and you make your dessert in it. The hat that's on their mascot, and hangs over their
counter as lamp shades, sits on whatever you make. Swap the nouns and it falls apart, because the hat, the drips, the awning and the photos are
hers.

### 7. Their mark as the hero object
Their top hat, traced today from `Charlies-Logo-1536x928.png` (their logo, region x 66 to 461, y 120 to 473) into a
clean vector with potrace, the brim cut by hand where the hat meets the "C" (`_tools/hat/`). Purple, with its band
in gold. It sits on the visitor's dessert at the logo's own tilt, exactly the way it sits on the "C" of their logo,
up to 480px wide on a desktop and in front of the awning. Pick a base and it lifts off like a magician's hat, the
dessert changes underneath, and it drops back on with a bounce. It sways when sauce or toppings land. Tried first and
dropped. The hat hanging over the counter like their top hat lamps (photo 14) with everything coming out from under
its brim. The gap it needed under the brim left their photo at 15% of the first screen by hit testing.

### 8. The signature moment, from their material
**The pour.** Their own drip silhouette, traced today from page 1 of their menu PDF (clean columns only, the logo and
lettering excluded, joined across the page edge, tips re-rounded to each drip's measured width) and baked into a signed
distance texture (`media/drip-sdf.png`). A WebGL shader grows those drips down their real dessert photo, cut out
with BiRefNet (it beat ISNet on both the shake and the waffles, `_research/cutouts/`). Each sauce has its own colour,
opacity and gloss (milk choc glossy and opaque, Biscoff caramel with a hard highlight, blue raspberry saturated and
translucent, white choc creamy). The coat takes the shape of the sweets under it, casts a soft shadow, and a second
sauce lands off centre and spreads less, so it layers over the first. Toppings are drawn in one glossy candy style and
fall with physics. Measured against the award sites rendered today (line 16). It sits in the family of Lusion's Oryzo
AI (smooth union distance fields in a 2D fragment shader) and goes past it in one way none of the 48 does, the shape it
grows is the client's own, traced from her menu.

### 9. Is the art in this first build?
Yes. The hat, the awning, the pour and the toppings are in the first screen Raka sees.

---

## C. The look

### 10. Type
**The field**, rendered today, the faces read from the font files themselves (`research/notes-17B-type-rivals.md`,
18 premium sites rendered, 17 with a usable web font).
- Milk Bar (https://milkbarstore.com/). Garnett, Sharp Type, commercial, headlines at 700. Pitch, Klim, a slab mono,
  only in its ticker strip.
- Van Leeuwen (https://vanleeuwenicecream.com/). Sofia Pro, Mostardesign, commercial, 700 caps.
- Jeni's (https://jenis.com/). Moderat, TIGHTYPE, commercial, 700 headings, 900 buttons.
- Crumbl (https://crumblcookies.com/). A bespoke sans at 800, one family for everything, prices included.
- Pierre Hermé (https://www.pierreherme.com/). Jost, OFL, the one luxe house leading with an open face.
- Ladurée (https://laduree.com/en-uk/). Adobe Garamond Pro at 400, commercial, with a script.
The pattern. Sans led at 12 of 17, and every candy coloured brand among them. A bold grotesk carries the voice. No site
sets prices in a mono, and the one mono in the field (Milk Bar's Pitch) is a small third voice.

**Our pair.** Mona Sans for every word (headlines at 540 with tight tracking, as the builds Raka passed, its wdth axis
for numbers), Fragment Mono only for prices, the ticket and the order number, the small third voice the field uses.
Both OFL 1.1, licence files in `fonts/`. Mona Sans reserves the name "Mona", so it ships whole, only WOFF2 compressed,
no subset (the OFL FAQ allows that without renaming).
**Not taken.** The agent's suggestion of Fraunces as a serif second voice. Fraunces is on 4 of the 32 AI default sites
we rendered (Candy Cream Cafe on Lovable, the Bolt cake cabinet, Framer's Cakelab and La Gelateria), and a serif with an
italic is on Raka's banned list. Their hand lettering stays where it lives, in their logo.
The local rivals set type like templates (Montserrat headings over Assistant at Sal's, https://www.salsdesserts.com/,
an uploaded heading face over Arial body text on Heavenly's Wix site, https://www.heavenlydesserts.co.uk/).

### 11. The colour script, from their material
All sampled from their logo, menu and posts (brief 7), checked against the PDF in the lead notes (ground #FCF4FE,
ink #533586, gold sub heads #C68510, drips #DFD2EA).
- **Dusk in the shop** for the hero and the builder. Deep purple #471273 ground, Charlie purple #5F3F90 for the hat,
  lilac #FBF3FD type. Their photo carries the colour.
- **Gold** only where something is valuable. The hat band, the prices, the ticket and the Order button
  (#F0B962 light, #D09337 amber).
- **Stripes** only in the awning and the counter, in their shop colours as photographed (purple, teal #3A8A96,
  mustard #AC880F and #F8C559, lilac #DED2E8, candy pink #F75F9B).
- **The sauce colours** are the visitor's accents.
- Later chapters (full build) go to their lilac menu page for the menu, then night falls toward booking.

### 12. What changed from their site, in one line
From a Squarespace brochure with a 25% black overlay on its hero, no price as text and one order button out to Uber Eats,
to Charlie's little world where you make your dessert under their hat and order it from Charlie's.

### 13. Every photo and film, whose it is, its licence, marks checked
| File | Source | Whose | Use | Marks |
|---|---|---|---|---|
| `media/shake.webp` | photo 04, their site (Squarespace CDN) | Charlie's | the shake base, cut out with BiRefNet | their logo baked in the bottom of the original, outside our crop; no brand marks on the glass, sweets, straw or lollipop (zoomed) |
| `media/waffle.webp` | photo 02, their site | Charlie's | the waffle base and the first screen's dessert, cut out with BiRefNet | none (zoomed) |
| `media/cookie-dough.webp` | photo 13, their site | Charlie's | the cookie dough base, cut out with BiRefNet and cropped at the dish's corner, set to run off both edges of the stage (the dish runs off the photo's own edges) | none (zoomed) |
| their logo | `Charlies-Logo-1536x928.png`, their site | Charlie's | shown as their logo, never retyped | theirs |
| the hat | traced from their logo | Charlie's | the hero object, favicon | theirs |
| the drips | traced from their menu PDF p.1 | Charlie's | the pour, the sauce rail | theirs |
| crepe, whippy sundae, frozen yoghurt | drawn by us in the same glossy style | Astra | the three bases with no photo of theirs | none |
| toppings | drawn by us (canvas) | Astra | the falling toppings | none. No Oreo, Biscoff or other brand is ever drawn, only crumbs |
No outside photo or film is used. Photo 15 (a child) was never downloaded. Photo 14 (third party marks) is reference only.

### 14. Not one item from section 13, and the checks in section 18 pass
`qa/check.js`, last run in `qa/last-run.txt` (copied to `first-look/checks.txt`). **12 of 12 pass, every one with its
planted fault caught.**
- **The walk**, 390 and 1440. An order action in view at every half screen down the whole page (the bar, and the step's
  own Order button where the bar steps aside). Planted, the bar and the button hidden, caught at every step.
- **The hero**, by hit testing their own pixels. **31.8% at 390, 30.4% at 1440** of the first screen is their photo or
  their mark (the cut out waffle, the hat, the logo and the bases' own photos). Planted, all hidden, 0%, caught.
  *Why under 35%.* The first screen also has to hold the question and their six bases as live controls (the left third
  on a desktop, the lower part on a phone), and their deep purple ground is theirs but isn't a photo. Getting to 35%
  would mean shrinking the controls the first screen exists for. The earlier hanging hat version measured 15.4%, which
  is why the hat now sits on a dessert the size of the stage.
- **The look**, 390 and 1440. Only Mona Sans and Fragment Mono render, no italics or serif in headings, no kickers,
  no pills, no arrows, no soft shadow cards, 2 top level parts, no light and dark turns. Planted, a pill with an arrow,
  three kickers, an italic heading, Poppins, a shadow card, all caught.
- **The sums.** 30 random orders through the UI (every base, every frozen yoghurt size, sauces, toppings, scoops,
  quantities, at 390 and 1440) plus 4 with the real pour and the toppings falling, priced by the script from
  `menu.json` on its own, matched to the penny on the bar, the ticket, the step total, the order summary and the state.
  Planted, five prices changed in the data the page reads, caught.
- **The copy.** No dashes, no colons, no emoji, no exclamation marks yet (the one allowed is saved for their golden
  ticket line), no banned words, no uncontracted forms, 38 contractions. Planted, all caught.
- **Overflow** at 320, 360, 390, 430, 768, 1024, 1440 and 1920 and after a resize, scrollX stays 0 and nothing runs off
  the side. Planted, a wide element, caught at every width.
- **Errors.** Cold load, 0 console errors, 0 failed requests, every image decoded at both sizes. Planted, a missing
  image, caught.
- **axe** at the top, middle and end, both motion modes, both sizes, 12 runs clean. Planted, an image with no alt and an
  empty button, caught.
- **Reduced motion and no JavaScript.** Without JavaScript the headline, the photo, 6 bases, 12 sauces and 19 toppings
  show with 42 prices as text. Under reduced motion the awning starts open, the hat stays still, a pour and a base swap
  finish at once. Planted, the sauces hidden, caught.
- **Lighthouse** runs at the final look, on the finished page.

### 15. The AI default and the departure table
**What we rendered** (`research/notes-17A-default.md`, every site with its URL). 32 live sites made with AI builders and
templates for dessert, ice cream, bakery and cafe businesses, all 32 rendered at 1440 and 390 today, across 9 builders
(Lovable 13, Framer 6, Wix 4, Webflow 3, Squarespace 2, Bolt 1, v0 1, Shopify 1, Durable 1). Plus one site a fresh Claude
model wrote from the bare prompt "a website for a dessert parlour with online ordering", with no other context
(`_research/ai-default/00-plain-model/`). It came back as a cream page, the headline "Sweet things, made by hand every
morning" in a serif with an italic second half, and pill buttons. That's the default, in one picture.

**The pattern list**, with counts from the 32.
- Pill buttons, 17 of 32 (the first hero button is a pill on 15). Arrow glyphs in buttons, 5.
- Split hero, text left and a rounded photo right, 14. Or centred text over a full bleed photo, 14.
- Star rating or review count by the hero, 16.
- Line icons in feature cards, 11 (11 of the 15 AI built). Emoji on the page, 9.
- Rounded cards with a soft shadow, 14. A three up card grid, 15.
- A small uppercase kicker or pill badge over headings, 12.
- A serif headline, 12. One accent coloured word in the headline, 9. A serif headline with an italic part, 4.
- A cream or pastel hero, 22. A pastel gradient wash or glow, 11.
- A testimonial band, 17. Instagram links, 17.
- Fade up reveals, 20. A marquee, 4.
- Copy. Handcrafted or artisan 17, joy or happy 18, fresh baked 16, made with love 13, indulge, delight or treat 17.
- Ordering goes to a menu list, a phone number, Uber Eats, DoorDash or WhatsApp. Not one of the 32 lets a visitor
  build their own waffle, shake or cookie dough.

**Five lines on how a default AI would have built this homepage** (the red team, written before comparing).
1. A cream hero, "Sweet treats, made with love" in a serif with an italic second half, a pill "Order now" with an arrow,
   a rounded photo of a waffle on the right.
2. "Our Bestsellers", three rounded cards with soft shadows, waffles, shakes and cookie dough, each with an Add pill.
3. "Why choose us", three line icons (fresh, handmade, fast) over a band of five star reviews.
4. "Visit us", a Google map, the hours, an Instagram strip, a dark footer saying "Made with love in Brighouse".
5. Fade up on every section, and the order button going to Uber Eats or a generic cart.

**The departure table.** Left, the default. Right, what this build does instead, from her own material.

| The default | Charlie's |
|---|---|
| Cream or pastel hero, a gradient wash or glow | Dusk in their shop. Deep purple #471273 from their own post, gold only on the hat band, the prices and the ticket. Light only as material, the hat's sheen and the sauce's gloss |
| Split hero, or text over a full bleed photo | A stage. Their awning across the top, their hat hanging over their counter like the lamps in their shop, their dessert cut out and standing on the counter, the question and their six bases beside it |
| Pill buttons, arrows in buttons | Square buttons cut as a ticket stub (their menu's toppings panel has ticket corners), one word, "Order". No arrows |
| Stars and review counts | No reviews. The official FSA ratings, 5 Brighouse and 4 Huddersfield, each with its shop |
| Line icons and emoji standing in for food | Their photos, cut out. The toppings drawn as the real sweets in one glossy style. No icons |
| Rounded shadow cards in a three up grid | No cards. Bases stand free like desserts on a counter, sauces are drips of their own drip, toppings are heaps of the real thing |
| Uppercase kickers and pill badges | None. Every heading says something, "Twelve sauces, a pound a pour" |
| Serif headline with an italic half, Poppins or Inter | One grotesk, Mona Sans at 540 with tight tracking, and Fragment Mono for prices and the ticket |
| Fade up on scroll, a marquee | Motion with weight. The awning rolls up like a shutter, the hat comes down and lifts off, sauce pours under gravity and drips in their silhouette, toppings bounce once and settle, the ticket prints |
| Handcrafted, made with love, joy, indulge | Their own lines and prices as text. "Everything on our menu is available for your own creation from £5" |
| Order Now to a list, Uber Eats or WhatsApp, a builder bolted on last as cards | The builder is the hero. One order from the first tap, the ticket prints as you build, the button carries the total, no Uber anywhere |
| Testimonial band, Instagram strip, hamburger at 390 | None. One page that is the shop, the order bar always there, their socials in the foot |

**The four things a redesign changes, all changed.** Palette and type (dusk purple and gold with Mona Sans and Fragment
Mono, against cream with a serif or Poppins). The page grammar (one sticky stage the steps scroll through, against stacked
sections of cards). The story spine (make it, watch it made, order it, against about, menu, reviews, visit). The media
(their cut out photos, a WebGL pour in their drip, physics, their traced shapes, against photos in rounded boxes).

### 16. Beyond the top 50
**What rendered** (`research/notes-17A-top50.md`, one row per site with its award page). 50 chosen, **48 rendered at
both 1440 and 390**, scripted in one run on the real GPU, scrolled to the end and fingerprinted at runtime. Two stayed
walled after a long retry. La Revoltosa (its font server answered 429, so its loader never cleared) and Locomotive (stuck
on "Please wait while your request is being verified"). 35 of the 50 are award level (Awwwards Site of the Day or of the
Month, 7 also FWA), 33 of those rendered. Four open on an age gate we didn't answer (Slosh, Santioni, Aupale, Ruinart).

**What the best actually do, in numbers** (48 at 1440). WebGL or WebGPU on 28 (25 of the 33 award sites, 3 of the 15
others), already in the first screen on 26. GSAP on 25, three.js on 23, Lenis on 18, a physics library on 4, a fluid
solver in the shaders of 7 of the 32 we scanned. Video on 21. A median of 40 words on the first screen (31 on award sites,
69 on the rest). None of the 48 prints or stamps a ticket.

**The moves taken, and where from.**
- **The pour's technique.** Oryzo AI by Lusion (https://oryzo.ai, SOTD 13 Apr 2026) merges simple distance fields with a
  smooth union in a 2D fragment shader, as do Zentry and Immersive Garden. That's the family this pour belongs to, except
  the field it grows is their own menu's drip, traced, and the light comes from its thickness. Not taken, Igloo Inc's full
  fluid solver (https://www.igloo.inc/, Site of the Year 2024). A solver can't hold the menu's silhouette, and the
  silhouette is the point.
- **Toppings physics on a flat world.** Ponpon Mania (https://ponpon-mania.com/) drops Matter.js bodies into an
  illustrated scene. Ours is a smaller hand written version (gravity, one or two bounces, rolling on the dessert's own
  top edge) so there's no library to load.
- **The builder.** M&M's configurator (https://www.mms.com/en-us/), live preview on one side, choices on the other, in
  steps. Here the preview is the shop's stage and it never leaves the screen.
- **One huge object as the control.** BWILD's light slashes and Saavedra's sun, Raka's own bar, and Planetoño's burger
  menu (https://www.planetono.space, SOTD 14 Mar 2026) where the food is the interface.
- **For the golden ticket (full build).** The holographic cards foil (https://poke-holo.simey.me/), done in CSS with 176
  blend layers, 84 masks and a pointer and device orientation tilt, as the robust route, and Apple's iPhone 18 Pro page
  (https://www.apple.com/iphone-18-pro/) for metal with an environment map, with the iOS motion permission step before
  tilt works.
- **Sound.** 12 of the award sites open audio. Ours is one tiny printer tick, made in code, only after a tap.

**The media, chapter by chapter** (no two in a row the same). First screen, their cut out photo and their traced hat on a
drawn shop. Make it, a WebGL pour and physics. Favourites, their photo dressed live. Menu, type on their lilac drip page.
Order, a gold foil ticket that prints. Booking, a giant number dragged into seats. Shops, their two shopfronts in stripes.

---

## D. The test

### 17. Beside BWILD v2, Saavedra v3 and the AI default
The sheets are `first-look/contact-sheet-ai-default.png` (9 of the 33 default sites beside this first screen) and
`first-look/contact-sheet-bar.png` (BWILD v2, Saavedra v3 and Fae Club rendered today, beside it).

**Closer to the best or to the default?** Far from the default. Not one of the 33 default sites has a stage, a working
builder, an order that carries down the page, or a pour. Its pattern list (pills, a split hero, stars, line icons, cream,
a serif with an italic) is absent here and each one is caught by a check if it ever comes back. Like BWILD and
Saavedra it puts one huge object made from the brand's own shapes on the first screen and makes it the control, and it
carries the order down the page in one bar like Saavedra's.

**Would it pass for a 25,000 euro studio site? Would anyone screenshot it?** The pour, the hat lifting off and dropping
back on, and the waffle the size of the screen are what get screenshotted, and they're hers. Where it's honestly not
there yet, said plainly so the next pass fixes it.
- The hat is a flat vector with gradient shading beside photographs. A sharper highlight and a cast shadow on the
  dessert would make it sit in the same light.
- The three drawn bases (crepe, whippy sundae, frozen yoghurt) look illustrated next to her photos. Her own photos of
  them, or her footage, would replace them (handover).
- The pour reads best on the shake and the cookie dough. On the waffle, its own blue drizzle and foam sweets compete with
  a dark sauce, so milk choc reads as a drizzle rather than a pour.
- The left third of the desktop is quieter than BWILD's first screen, by design (the question and the bases live
  there), but it has no moment of its own yet.

---

## E. The final build, 29 Oct 2026

Raka's notes on the first look were "more animations, more pictures, more exclusive" and a WOW the first look didn't
have. Two more research runs went first, then the full build. Lines 7, 8, 13, 14 and 17 above describe the first look,
and this section is where they stand now.

### The two research runs
- **WOW over time** (`research/notes-wow.md`). 28 award sites tried, 23 rendered at 1440 and 390, every one Site of the
  Day or higher, filmed through the first seconds, the cursor and the scroll. 15 moves ranked.
- **Exclusive and playful** (`research/notes-exclusive.md`). 30 premium dessert and confectionery sites rendered, Ladurée,
  Läderach, Cédric Grolet, Little Moons, Graza, Van Leeuwen, Jeni's and more, measured for type scale, picture share,
  photo crops, menu tiles, colour count, gold and motion.

**WOW moves taken** (their numbers in notes-wow section 6).
- 1, a loader that builds the product. The shutter with their sign on it is the preloader. It rolls up when the 3D is
  ready, the bulbs light one by one and the hat drops onto the counter.
- 13, a camera dive into the next world. Scroll and the hat tips its opening to you and you fall into it.
- 6, sections that pour into each other, in their material. Their lilac drips (traced from the menu) flood down out of
  the hat into the builder, and again into the roll call.
- 7, a hard colour cut roll call. Waffles, Shakes, Cookie dough, Sundaes, Frozen yoghurt, Pick & mix, each a full
  screen in one of their shop colours, ending on their logo.
- 5, mega type with the dessert bursting through. In the roll call, and the giant word behind the builder's stage.
- 2, the brand silhouette as the window. Photos and films sit in their arch, their awning scallop and their drip.
- 12, a physics pile of their sweets. All nineteen toppings in 3D with gravity and bounce.
- 15, an object that answers the cursor. The hat follows the mouse, and the golden ticket's foil tilts with the cursor or
  the phone.
- 10, a masked reveal. The pick and mix wall opens out of an arch as it scrolls in.

**Not taken.** 3, an exploded stack that assembles on scroll (the builder already assembles the visitor's own dessert, so
a scripted one would repeat it). 4, the hero object travelling down the page (the dive takes you into the hat instead,
and a hat riding along would sit over the prices). 8, a line that draws itself (their drips already carry the page from
chapter to chapter). 9, a ring of product photos orbiting the headline (it would put the first screen back in a
carousel). 11, opposed word rows (one poster moment per page is the exclusive rule, and the roll call is it). 14,
selective colour bloom (their purple is already the ground).

**Exclusive rules taken** (notes-exclusive section 2).
- A full picture first, then air. The first screen is their shop and their dessert, the later chapters breathe.
- Display type above the template band. The hero headline is 6.9vw at 1440 (99px), above the luxe median of 5.1vw and
  far from the 2.1 to 2.9vw template band, one family and tight tracking. One poster moment, the roll call at up to
  23vw.
- Cut outs as the playful premium tool (Van Leeuwen 9 of 12, Little Moons 9 of 11). Their desserts are cut out and float
  over type.
- Square cornered photos inside their own shapes, never rounded cards, never tilted (0 of 30 tilt).
- Menu prices in the same weight as the name, no add button in the tile, no stars and no strike throughs.
- One hue family plus gold. Purple and lilac from their logo, gold kept to the hat band, the prices, the ticket and the
  Order button, never a ground.

### 7, the hero object now
Their top hat in real time 3D (three.js r186), its profile turned from the hat traced from their logo, purple felt with a
soft sheen and their gold band, lit by a matcap made in code so it costs nothing to start. It's drawn in a Web Worker
on an OffscreenCanvas so the page never waits for it, and browsers without one run it on the page. It drops, flips like a
magician's hat and the dessert the visitor picks rises out of it in a swirl of 3D sweets. Without WebGL, or under reduced
motion, a still rendered from the same scene shows.

### 8, the signature moments
1. The hat opening, above.
2. The dive into the hat and the drips flooding down.
3. **The pour**, rebuilt. A sauce floods their menu drips at the top, a stream falls and drizzles across the waffle along
   a path inside the dessert's own outline, or coats the shake and runs down it, lit from its thickness.
4. Toppings raining in 3D and settling, each landing printing a line on the ticket.
5. The roll call.
6. The pick and mix wall, their own macro of fizzy sweets, parting round the finger or the cursor.
7. The golden ticket in foil with gold glitter film under it, tilting, printing and stamped "Ordered".
8. The table ticket, a chair popping in round their striped table for each guest, confetti when it confirms.

### 13, every photo and film, now
Their photos 02, 04, 06, 08, 11, 13, 16 and 17 from charliesdesserts.com, in their shapes, each checked for marks
(`media/photo/manifest.json`). Photo 15 never downloaded, photo 14 still reference only. Four stock films and one stock
photo, Pexels and Mixkit, each item page read and its licence written down (`HANDOVER.md` has the table, the full ledger
with the rejected items is in `_downloads/stock/LICENCES.md`). No faces, no brands, never captioned or shown as hers,
muted, decorative, loaded only near the screen and never played under reduced motion or data saver.

### 14, the checks now
`qa/check.js`, its last run in `qa/last-run.txt` (29 Oct 2026). **14 of 14 pass, every one with its planted fault
caught.** The walk, the hero share and the look at 390 and at 1440, then the sums (30 random orders and 4 with the real
pour and falling toppings, to the penny on the bar, the ticket, the step total, the summary, the golden ticket and the
state), all 115 menu lines as text, the copy (one exclamation mark on the whole site, 93 contractions, the prototype
note 4 times, no Uber), overflow at eight widths and a resize (no word cut in two, the price label always whole), errors (38 images and 4 films, 0 errors), axe in 12 runs,
reduced motion and no JavaScript (150 prices as text without it), and an order placed and stamped and a booking for 7
confirmed at both sizes, every chair round the table with motion on. The plan's own checks pass 8 of 8 (`charlies-plan/qa/last-run.txt`). Every number and plant is
in `HANDOVER.md`.

### The hero share
27.4% at 390 and 27.8% at 1440 of the first screen is their hat, their dessert, their logo and their photos,
measured from the screen itself with the 3D hat drawn (the planted run, their pictures hidden, reads 0.8% and 1.3%). That clears
the 25% floor and not the 35% aim. *Why.* The first screen also has to hold the question, their line about creating
your own from £5, the six bases as live controls and the order bar, and our 3D sweets swirling round the hat and their
awning stripes aren't counted. Getting to 35% would mean shrinking the controls the first screen exists for.

### 17, honestly, beside the best
**Closer to the best or the default?** To the best. The first screen is a 3D object made from their mark, the scroll
dives into it, a chapter pours into the next in their own drip, and there's a roll call, a working builder with a pour
and physics, and two tickets that print and stamp. None of the 33 default sites has any of that, and none of the 48 top
sites prints or stamps a ticket (line 16).

**Where it's still short, said plainly.**
- The hero share is 27 to 28%, under the 35% aim (above).
- Phone performance is 83 (three runs, 83 each time) on Lighthouse's slow 4G phone. The first screen paints in about a second, the 3D comes
  after. Desktop is 99.
- The crepe, the whippy sundae and the frozen yoghurt are still drawn, and they read as drawn beside her photos.
- The films are stock until her own reels or footage replace them.
- Ordering and booking are a full mock. Payment, the shop tablet and the diary are the plan's six weeks.

## F. Round 2, 29 Oct 2026. Pages, a header, a sleeker flow, more of their photos and film

Raka's words after seeing it live, "do we not design a home page and different pages ... on the header as well and
all?" and "I'm also missing kind of like photos and videos and overall flow ... it should be more sleek the flow". The
art he liked stays as it was, the hat, the pour, the golden ticket and the table ticket. What changed is the shape.

**From one long page to four.** Round 1 was one page of 25 screens at 1440 and 33 at 390, eight long sections in a row.
Now Home is the hat, make your own in one screen, the favourites, their world, a birthdays teaser and a Find us line,
about 10 screens at 1440 and 11 at 390. The 89 row menu is `/menu/`, the booking is `/birthdays/`, the shops are
`/find-us/`, and the order form became one drawer that every Order on every page opens.

**Sleeker, in the details.** One heading style, one note style, one button style (the gold ticket stub, pink for Book).
The hero's line under the question went, because the sticker beside it says the same words. On the builder's screen the
header's Order and the bar step aside, so the builder's own total is the only one there. On a phone the header's Order is
one word, so the price shows once, in the bar, with its label.

**Their photos and film.** Every true photo of theirs is now used, most of them full bleed, and each page opens on one.
Four of their Instagram photos came in, cropped clear of the text baked into them, any face and any other brand. The
three roll interludes became one moment, a caramel pour full bleed under their own line "Welcome to Charlie’s little
world of sweetness", then their photos laid one over the next, two to a frame on a wide screen so each portrait keeps
its shape.

**The hero share, round 2.** With the header taking the top strip, the phone's first screen first measured 19.4%. Their
logo went back under the awning on a phone (the header's waits until you scroll, so it never shows twice), the stage
grew, and the headline now sits over the foot of the hat rather than in front of a dark band. It measures 30.9% at 390
and 26.9% at 1440, over the 25% floor, still short of the 35% aim at 1440.

**The numbers, round 2.** The checks are 33 of 33 on four pages, each with its planted fault caught (qa/last-run.txt).
Home is 8.6 screens at 1440 and 10.6 at 390. Lighthouse, Home on its phone 77, 83 and 79 over three runs, 96 on desktop,
the other pages 89 to 93 on the phone and 99 to 100 on desktop. Two fixes got Home there. The shutter rolls up on a
transform over the awning instead of changing the awning's height, which had shifted the page, and the builder's WebGL
and 3D toppings start on the first scroll toward them, not during the load.

**Where it's still short, said plainly.**
- Home at 390 is 10.6 screens, under the 12 to 14 target, because it is short. Nothing was added to pad it.
- The hero share at 1440 is 26.9%, under the 35% aim.
- The one film is stock, a caramel pour over ice cream, until her own reels come. No free clip of a pour over a waffle met
  the rules.
- Brighouse has no photo of its own, and the crepe, the whippy sundae and the frozen yoghurt are still drawn.
- Ordering and booking are a full mock.
