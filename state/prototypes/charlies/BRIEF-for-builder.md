# Build brief. The Charlie's Desserts prototype, for Astra agency

Written 28 Oct 2026 for an AI build session working outside the Astra repo. Everything you need is in this file and its
companion `menu.json` (the whole menu as data). Read all of it before you open a browser. It's long because every line
in it is a note Raka (Astra's founder) has sent a build back for. Following it is how this one ships without a second
round.

---

## 1. The job in one paragraph

Danielle Best owns Charlie's Desserts, a dessert parlour with two shops in West Yorkshire. We told her the only order
button on her website sends people to Uber Eats and her menu is two pictures and a PDF, and we offered "a modern
Charlie's site where people create their own dessert at your menu prices and order it straight from you". She said
"Yes pls". Build that site as a working prototype. A visitor lands, builds their own waffle, shake or cookie dough from
the real menu at the real prices, watches it being made, and orders it straight from Charlie's for collection or
delivery. Birthday and celebration tables book and confirm on the same site. It has to look like a 25,000 euro site from
a top studio, feel like walking into their shop, and carry one moment nobody has seen on a dessert site before. One
build, approved in two looks, no second version.

---

## 2. The order of work. Nothing goes live until step 9

Raka's words, "we cant do second or third runs of the prototype building we needa do it in one go", and "before its
final lets put it to html or screenshot first". Since 12 Oct, 12 prototypes took 30 versions because the first build
was the safe one and the art came second. So.

1. **Read this whole brief.**
2. **Research for the build** (section 17). First the AI default, what a normal Claude or ChatGPT website for a dessert
   shop looks like, so you know exactly what not to make. Then their whole site, every Instagram post you can read, the
   menu, five or more premium dessert and confectionery sites for the type, and beyond the top 50, the best sites in the
   world rendered and fingerprinted today for the art and the story.
3. **Fill the build card** (section 19, A to D) with a source for every line. A line you can't answer sends you back to
   research, never to a guess.
4. **Build the first screen only.** The hero and ONE signature moment (the pour, section 11), locally, working.
5. **First look.** Send Raka the card's sections A to C plus screenshots at 1440 by 900 and 390 by 844, three frames
   of the pour mid motion, and your first screen beside the AI default sites from 17A. Then STOP and wait for his go. A note here costs one screen, not a site.
6. **On his go, build the rest in one pass** to the card.
7. **Run every check in section 18** until all pass, each with its planted failure caught.
8. **Final look.** Every section screenshotted at 1440 and 390, plus the whole site as ONE self contained HTML file
   (images and fonts inlined as data URIs, so it opens offline by double click). Send those to Raka. Nothing deployed.
9. **On his "final"**, hand back the build folder (section 20). Astra deploys it to Netlify itself. You don't deploy.

There is no calm version one. The art is in the first screen Raka sees.

---

## 3. Who we are

**Astra agency** is Raka Mulya's studio in Amsterdam. It builds websites, apps and internal tools for brands like
Unilever, AXA and Pertamina, and finds small business clients through researched LinkedIn messages. When a lead says
yes to "Shall I send you a sketch?", we build the real thing, a working prototype on their own content, and send the
link. The prototype is the pitch. It has to make the owner think "I want that, now".

Raka judges every build himself. What he has sent builds back for, in his words, is the whole of section 13. What he
signed off, also in his words, "holy shit.. bro send it to him NOW" (BWILD v2, a running vest brand, 26 Oct) and
"Brooo amazing!" (Saavedra v3, an empanada caterer, 25 Oct). If you can, open these before designing, they're the bar.
- https://astra-bwild-prototype.netlify.app/ (the art build he loved)
- https://astra-saavedra-prototype.netlify.app/entreprises/ (the order carried down the page, for a food business)
- https://astra-faeclub-prototype.netlify.app/ (the route to the action)
They may be noindexed or slow. Never copy their look. Copy what they do (sections 10 and 11).

---

## 4. The lead and the business

**Danielle Best**, founder and CEO. She runs a small hospitality group in Calderdale and Kirklees, West Yorkshire.
- **Mexi Bean**, Mexican quick service restaurants in Brighouse, Huddersfield, Halifax, Wakefield and Bradford, with a
  franchise in Peterborough. Mexi Bean locations take their own orders online on Foodhub, each on its own ordering site
  (Brighouse, Halifax, Huddersfield and Sowerby Bridge, linked from https://mexibeanexpress.com/, read 28 Oct). So direct ordering
  is something her group already does. Charlie's doesn't.
- **Kalm**, a wellness cafe.
- **Charlie's Desserts**, the subject. Founded 2025 (its LinkedIn company page).
- A University of Huddersfield article of 18 Feb 2026 calls her "The Kalm, Mexi Bean and Charlie's Desserts CEO" and
  says she "has previously won the Emerging Leader of the Year and Hospitality Leader of the Year"
  (https://mediahud.hud.ac.uk/2026/02/18/kalm-and-mexi-bean-ceo-leads-major-business-award-nominations/).
- She's a seasoned operator who already sells direct for one brand. Write and build for an owner who knows food margins
  and knows what Uber takes. Never explain her own business to her.

**Charlie's Desserts.** A dessert parlour and sweet shop with a theatrical, candy coloured world. Their own line on
Instagram, 27 Oct 2026, "No golden ticket needed, just a sweet tooth! 🎩💜 Welcome to Charlie's little world of
sweetness!", over a reel captioned on screen "POV: you visit the real life wonka land". The mascot is a cartoon boy
called Charlie in a purple top hat.

| | Brighouse | Huddersfield |
|---|---|---|
| Address | 3 Bridge Road, Brighouse HD6 1EP | 51 King St, Huddersfield HD1 2PZ |
| Hours | Monday to Sunday, 12 PM to 10 PM (their site) | not published anywhere we could read. Label "hours to confirm" |
| Food hygiene (FSA, official) | 5, inspected 17 Mar 2025 | 4, inspected 9 Apr 2026 |
| On their website | yes, the only shop listed | no. Missing from the site |
| Source | their site, FSA id 1770212 | their Instagram post of 23 Oct 2026 (https://www.instagram.com/p/De1u2ejA_m6/), FSA id 1918346 |

**What they sell** (full data in `menu.json`). Waffles and crepes, shakes, cookie dough, whippy sundaes, scoops of ice
cream and sorbet, Mini Dutch pancakes, strawberry cups, a "Charlie in Dubai" kunafa range, sharers, cakes and puddings,
hot drinks, mocktails, pick and mix, doggy ice cream, and since late October frozen yoghurt with unlimited standard
toppings (Small £4.99, Medium £5.99, Large £6.99, their post of 26 Oct, https://www.instagram.com/p/De95MO1A9-o/).
Their concept, in their own words on the menu, "Everything on our menu is available for your own creation from £5".

**Audience size.** Instagram @charliesdessertshop 4,318 followers and 234 posts, newest 27 Oct 2026. TikTok
@charlies.desserts 3,856 followers. Facebook 1,917 followers (all read 28 Oct). They post most days. Visitors arrive
from Instagram and TikTok on a phone. Design for the phone first.

**Nearby rivals, for your teardown only, never named on the site.** Heavenly Desserts (John William Street,
Huddersfield), Sal's Desserts (Huddersfield, "Best Dessert Shop of the Year" per Huddersfield Hub, Aug 2025), We Love
Desserts (Halifax), the national chains Kaspa's, Creams and Sundaes Gelato. Most of these sites are template parlours.
Charlie's should make every one of them look dated.

**Two businesses to never confuse with this one.** A "Charlie's Desserts" in Cheadle near Manchester on Deliveroo, and
CHARLIE'S DESSERTS LIMITED in Oldham (dissolved 2022). Neither is hers.

---

## 5. The conversation so far, and the promise

Our first message, sent on LinkedIn 26 Oct 2026, word for word.

> Hi Danielle, Charlie's Desserts looks cool.
>
> However, the only order button on your website sends people to Uber Eats, and your menu is two pictures and a PDF.
> So orders from your site likely hand Uber Eats a cut, and there's no way to create your own waffle or shake on it.
>
> I'd suggest a modern Charlie's site where people create their own dessert at your menu prices and order it straight
> from you.
>
> Shall I send you a sketch?

Her reply, 28 Oct 2026, "Yes pls".

**So the prototype must prove four things on sight, and nothing it shows may contradict our message.**
1. **Create your own** works, at her real menu prices, with a live total.
2. **Order straight from Charlie's**, collection or delivery, with no Uber Eats anywhere in the path.
3. **The menu is real text**, every item and price readable and tappable, not a picture.
4. **It's modern**, and it feels like her shop, not a template.

Plus the two jobs her current site points at and does badly, birthday and celebration tables that confirm, and the
Huddersfield shop it leaves out.

---

## 6. Their site today, and what changes

https://www.charliesdesserts.com (Squarespace, built Aug 2025). Rendered and read 28 Oct 2026.
- The home opens with a popup, "Buy a milkshake and get the second one for free!", asking for email, first name and
  birthday. Behind it, a full width photo of their waffle with a translucent purple panel on top holding the line "Go on,
  you know you want to…" and two pill buttons, VIEW MENU and ORDER ON UBER EATS.
- ORDER ON UBER EATS goes to https://www.ubereats.com/gb/store/charlies-desserts/Nec__aR5RRaNU1CHd2wU9A in delivery mode.
  It's the only order link on all six pages. The cart page exists and is empty.
- "Our Bestsellers", three photos (waffles, shakes, cookie dough) with no prices.
- "Special occasions", birthdays, celebrations and date nights, all pushing to BOOK TABLE.
- The menu page is two JPG pictures of the printed A3 menu plus the PDF. The page's text is the word MENU. Not one price
  is readable as text anywhere on the site.
- Reservations is an email form (name, email, how many people 1 to 10+, date, time "in Central European Time", details).
  No availability and no confirmation. The time zone label is wrong for a Yorkshire shop.
- A raw Mailchimp signup with a birthday field, one news post (12 Sep 2025, "Welcome to Charlie's!"), "Work with us"
  with no vacancies, a mustard footer with the Brighouse address and hours.
- Type is Nunito Sans and Sansita. Square photos in rows, pill buttons, a purple header bar.

**What changes, in one line.** From a template brochure that sends every order to Uber, to Charlie's little world of
sweetness where the visitor makes their dessert on the page and orders it from Charlie's.

**Uber Eats UK merchant fees**, for context and the plan only, never as a claim about Charlie's own contract. Uber's
UK pricing page (https://merchants.ubereats.com/gb/en/pricing/, read 28 Oct 2026) lists a 30% delivery fee (33% for Uber
One members), 13% pickup, 13% self delivery, all excluding VAT, and a £650 activation fee. Her actual rate isn't public.

---

## 7. Their material. Use all of it, the photos carry the page

### The mark
- Logo with the mascot, PNG with transparency, 1536 by 928,
  https://images.squarespace-cdn.com/content/v1/689452f8e488530e26e58475/1754551036007-Q4LE6C71O6Z6C56ZGDL3/Charlies-Logo-1536x928.png
  A cartoon boy with orange hair peeking over a purple wordmark "Charlie's" with a gold outline, wearing a tall purple top
  hat with a lighter band. The wordmark is theirs, keep it as their logo, never retype it in a font.
- **The top hat is the mark to build the hero from.** It's on the logo, and their shop hangs black top hats as lamp
  shades over the counter (photo 14). Trace it from the logo PNG into a clean vector.

### Their photos (all from their own site, a professional shoot plus some screenshots)
Append `?format=2500w` to any of these for the largest size. Base
`https://images.squarespace-cdn.com/content/v1/689452f8e488530e26e58475/`

| # | Path after the base | Size | What it shows |
|---|---|---|---|
| 02 | `4a2c9aa2-05d7-4064-8248-376a5b3aa308/cmcg.creativexvisionarhi-261.jpg` | 2401x3600 | Overhead spread on a white table. Two waffles on a lilac plate with whippy swirls, foam sweets and blue drizzle, a shake, cookie dough on a teal tray. The best wide food shot |
| 06 | `3aa89737-adcf-4a3a-b2d2-1df49badb67e/cmcg.creativexvisionarhi-297.jpg` | 1600x900 | Tight crop, a white shake piled with foam sweets and whippy, a chocolate shake behind. Landscape |
| 07 | `1754551033319-R9AD0CIJV1JQVQ4WZBQ4/Screenshot+2025-04-12+233856.jpg` | 879x1336 | Waffles between two shakes, purple wall. Screenshot quality, use small |
| 08 | `4d32c872-c109-47b4-b3b8-9f334c484ccf/cmcg.creativexvisionarhi-289.jpg` | 2401x3600 | A fork lifting a bite of cookie dough with a star biscuit |
| 11 | `3b4f655a-3533-4e00-b9d9-bfb53f53bc93/cmcg.creativexvisionarhi-277.jpg` | 2401x3600 | A hand with a spoon at the waffles, shakes either side, purple wall |
| 13 | `c792e306-e062-479e-9484-e3c5d2547dc4/Mexi%2CKalm%2CCharlies-42.jpg` | 2401x3600 | Cookie dough with a star biscuit in front, waffle plate soft behind |
| 16 | `292df545-ca12-4ec1-8160-cddd3002f03c/Mexi%2CKalm%2CCharlies-29.jpg` | 2401x3600 | Macro of fizzy sweets, pink and green. Perfect texture for pick and mix |
| 17 | `c3246598-3d8f-4f1e-a188-a6ca4b76e621/cmcg.creativexvisionarhi-299.jpg` | 2401x3600 | A hand holding up a white shake with foam sweets and a lollipop, chocolate shake behind |
| 03 | `1754551033308-JLPORUCE5L6DNTZ2QX2Z/Screenshot+2025-04-12+233608.jpg` | 910x1357 | Waffles close, screenshot |
| 04 | `1757669402869-GYASIZMYFF0A6GWJM5N4/500692946_17884443021282660_7836047207596177126_n.jpg` | 1080x1349 | Blue raspberry shake in a sundae glass, rainbow lollipop, sweets on top, lilac coaster. Their logo is baked into the bottom of this image, crop it out if you use it |
| 05 | `1754551033314-GWQGIWDGSNV7MIHOSAPV/Screenshot+2025-04-12+233832.jpg` | 889x1344 | Cookie dough, white chocolate drizzle, freeze dried raspberry, star biscuit |
| 12 | `2cb6b6fb-92e5-4a86-8afa-099cf3e2f8fe/Screenshot+2025-04-12+233732.jpg` | 1238x696 | Overhead full spread, landscape, screenshot quality |
| 14 | `14b8d964-a7f5-4c28-baf5-2bd97ce8d373/IMG-20250409-WA0008.jpg` | 1600x1200 | **The shop.** Phone photo. A kiosk under a scalloped awning in purple, teal, mustard and lilac stripes, festoon bulbs, black top hat lamp shades, a striped counter, sweet shelves. A serving robot stands in front |
| 15 | `1757674364137-CD3FII5FCY2449DPRANB/cmcg.creativexvisionarhi-323.jpg` | 2401x3600 | A boy in a Charlie's tee holding a shake at the counter. **A child. Don't use him. Never name him** |

Rules for their photos. They're theirs to use on their own site. Never caption one as a named person, a specific shop
or a specific day. Photo 14 carries third party marks (the robot's maker and an "EAT IT DRINK IT" panel, a "Yarde Farm"
sign, branded sweets on the shelves), so use it only cropped or painted so no third party mark is readable, or redraw
the awning from it. Zoom every photo you use for brand marks on cups, packets and screens.

### Their posts (open each, the captions are their voice)
- https://www.instagram.com/p/DfAgHSVgLOH/ 27 Oct, reel. "No golden ticket needed, just a sweet tooth! 🎩💜 Welcome to
  Charlie's little world of sweetness!" Purple shopfront with the lit Charlie's sign.
- https://www.instagram.com/p/De95MO1A9-o/ 26 Oct. "YOUR FROZEN YOGHURT, YOUR WAY! ... Big flavours, colourful toppings,
  and UNLIMITED standard toppings ... Come and build your dream frozen yoghurt at Charlie's!" The price list graphic,
  striped cups in purple, pink and teal.
- https://www.instagram.com/p/De7aw-nAIQ0/ 25 Oct. Half term sale, 50% off 26 Oct to 1 Nov, Brighouse only, "Excludes
  Golden Box". Over by the time Danielle sees the site, never show it. Note "Golden Box", which may be what they now call
  The Ultimate Box. Don't assume, keep The Ultimate Box as the menu names it.
- https://www.instagram.com/p/De6qWbXgnu8/ 25 Oct, reel at the counter, the top hat lamps and stripes.
- https://www.instagram.com/p/De1u2ejA_m6/ 23 Oct. "Frozen yogurt is now available in Huddersfield! 📍 51 King St".
- https://www.instagram.com/p/DezobVFgAlz/ 22 Oct. A woman holding a giant Charlie's frozen yoghurt cup in front of a
  purple door. The scale joke is theirs, and it's great.
Their reels are their own film. We can't take them, so the handover asks Danielle for her footage (section 20).

### The menu
`menu.json` is the whole menu with every price, and the PDF is
https://www.charliesdesserts.com/s/Charlies-Menu-2026.pdf. Look at the PDF as well. Its design is a big part of the
brand. A lilac page with lilac DRIPS running down from the top edge, hand lettered purple headings with gold accents, a
big lollipop swirl, a purple paw for doggy ice cream, cones, and a striped tub.

### Colours, sampled from their logo, menu and posts
| Role | Hex | From |
|---|---|---|
| Charlie purple | #5F3F90 | logo wordmark |
| Deep purple | #471273 | frozen yoghurt post |
| Menu purple | #5A3E8E | menu headings |
| Gold, light | #F0B962 | logo outline |
| Gold, amber | #D09337 | menu accents ("all £6.50") |
| Lilac ground | #FBF3FD | menu page |
| Lilac drip | #DED2E8 | menu drips |
| Candy pink | #F75F9B | frozen yoghurt post |
| Teal | #32B3C3 (graphic), #3A8A96 (as photographed in the shop) | post, awning |
| Mustard | #F8C559 (graphic), #AC880F (as photographed) | post, awning |
| Peach | #F5CFAD | the mascot |

### Shapes that are already theirs. Build the page out of these, not out of rectangles
1. **The drip.** The lilac drips running off the top of their menu.
2. **The scalloped awning edge** over their kiosk.
3. **Vertical candy stripes** on the counter, the awning and the cups (purple, teal, mustard, lilac, pink).
4. **The top hat**, the logo and the lamp shades.
5. **The lollipop swirl** behind the cakes on the menu.
6. **The paw**, doggy ice cream.
7. **Festoon bulbs.**

---

## 8. Who lands, what they think, the one action (write these four lines into the card, refined by your research)

**Visitor 1, the craving.** A local teenager, student, young adult or parent in Brighouse or Huddersfield, on a phone,
around 7 in the evening, arriving from an Instagram or TikTok post or a "desserts near me" search.
- Thinking, in order. Is it open, and which shop is near me? What can I get and how much? Can I have it my way? Can I
  get it now, collected or brought to me? How long will it take?
- Goal. Their dessert, their way, tonight, with no faff.
- **The one action. Order it from Charlie's.** Build, see the ticket, choose collect or delivery, place the order.

**Visitor 2, the party planner.** A parent planning a child's birthday or a group celebration (their own "Special
occasions", birthdays, celebrations, date nights).
- Thinking. Can 8 of us come on Saturday? Will it be confirmed or am I emailing into the void? Can everyone pick their
  own? Roughly what will it cost?
- Goal. A confirmed table and a party that feels special.
- **The action. Book a table that confirms**, party size, date, time in UK time, the occasion, which shop.

**Visitor 3, sharing or treating.** A couple on a date night, or someone treating friends.
- **The action. Order a sharer or The Ultimate Box** (£30, 2 cakes or bakes, 2 crepes or 2 waffles, a pick and mix bag
  plus 2 drinks, excluding Matilda and San Sebastián), or book the date night table.

Every visitor gets their own route and button. The order action is never more than half a screen away anywhere on the
page, at 390 and at 1440, and not only in the header.

---

## 9. The flow table (the draft, refine it in the card)

| Step | The visitor's question | What they see and do | The moment that answers it |
|---|---|---|---|
| 1 Hero | "Is this the place?" | Their world opens full bleed. Their real dessert photo or the shop, their mark, their line, and the first question "What are you making?" with the bases as big tappable objects (waffle, crepe, shake, cookie dough, sundae, frozen yoghurt) | The awning rolls up like a shop shutter on load and the shop is open. Tapping a base sets the order and puts "from £5.50" on screen at once |
| 2 Make it | "Can I have it my way?" | Their dessert centre stage. Sauces and toppings from the real menu, each tap adds it on the dessert and to the total | **The pour** (section 11). The sauce falls from the top of the screen in the drip shape of their menu, in the sauce's real colour, over their dessert. Toppings drop and settle with real physics |
| 3 Or pick a favourite | "What do people get?" | Their named favourites (Charlie's Creation, Biscoff, White Stars, Grimace) as quick starts at their menu price, tappable into the builder | A favourite lands in the builder already dressed, and the price shown is the menu price |
| 4 The whole menu | "What else is there?" | Every item and price as real text in their own groupings, beautifully set, each item a "make it yours" tap | The menu reads like their printed menu come to life, the drip running down the page |
| 5 Collect or delivered | "Can I get it now?" | Choose the shop (Brighouse or Huddersfield), collect or delivery, a time slot inside opening hours, a name | Their order prints as a ticket with their creation drawn on it, the shop, the time and the total. **No Uber anywhere** |
| 6 Birthdays and celebrations | "Can we book for the party?" | Party size as a giant number to drag (1 to 10+, their own options), date, time in UK time, the occasion | Seats appear round a table as the number grows, and the booking ends confirmed, stamped |
| 7 Two shops | "Where are you?" | Brighouse and Huddersfield, address, hours, what's special (frozen yoghurt at Huddersfield), each with its own order and book | Their two shopfronts in their stripe grammar, not a Google map embed |
| 8 Foot | "Anything else?" | Hours, addresses, socials, the prototype note | The order bar is still there |

At most 10 sections on the home page. If the menu needs its own page, give it its own page with its own order action.

---

## 10. The one idea and the one state

**The one idea, from their own words.** "Welcome to Charlie's little world of sweetness" (their caption, 27 Oct) plus
"Everything on our menu is available for your own creation" (their menu). The site is the shop, and you make your
dessert in it. If another dessert shop could use the idea with the nouns swapped, it's not the idea. Their top hat,
their drips, their stripes and their photos make it theirs.

**The one state.** One order object, written by every control and read by every display, carried down the whole page.
```
order = { shop, mode (collect | delivery), base, size, preset, sauces[], toppings[], extras[], qty,
          time, name, total }
booking = { shop, partySize, date, time, occasion, name }
```
- The hero's base choice, the builder, the favourites, the menu taps, the ticket, the sticky bar and the order form all
  read and write the same object. Nothing is typed twice. The order form arrives already filled with the whole creation.
- **The sticky bar** carries the creation and the total, and one word on its button, "Order". On a phone it leads with
  the price ("£9.50 Biscoff waffle"), because an ellipsis must never eat the one thing it's for. It steps aside only
  where an order button or the order form itself is on screen.
- **Pricing rules, exactly.** A create your own base is plain at its menu price, and every sauce (£1.00) and topping
  (£1.00, Gobstopper £1.50, Gum Balls £2.00, Pick & Mix Cup £2.00) adds at list price, plus a vanilla scoop £2 or whippy
  £4 on a crepe, waffle or cookie dough. **A named favourite keeps its menu price** (Charlie's Creation waffle is £8.50
  on the menu, though its parts at list price would come to about £13.50), and anything added to it goes on top. Removing an
  ingredient from a favourite never lowers the price. Frozen yoghurt is £4.99, £5.99 or £6.99 by size with unlimited
  standard toppings, so toppings show as included in that mode. Every total carries the label "Estimated from Charlie's
  menu, final price at the counter", because the menu doesn't say what a create your own base includes.

---

## 11. The signature moments

### First look moment. The pour (build this one first)
The visitor taps a sauce. It pours from the top edge of the screen and runs down over their real dessert in the exact
silhouette of the drips on their menu, in the sauce's real colour and gloss. Milk choc is glossy brown, Biscoff is a
caramel with specular light, blue raspberry is a saturated translucent blue, white choc is creamy and opaque. A second
sauce layers over the first rather than replacing it. Toppings tapped fall from above with real physics, bounce once and
settle on the dessert. Sprinkles scatter, marshmallows tumble, gum balls roll. Each landing ticks the price on the
ticket with a tiny print sound. It's made from their material (their menu's drip, their photo of the dessert, their
sauces and toppings, their prices), and it's the thing that makes Danielle say "they can do THAT with my menu?".
- The dessert is their own photo, cut out cleanly (try two background removal models on the real photo and look at the
  result on a coloured ground before choosing). Waffle from 02 or 11, shake from 17 or 06, cookie dough from 13 or 08.
  If a base has no photo of theirs (crepe, sundae, frozen yoghurt), draw it in the same art language and say so in the
  handover.
- Sauce rendering is real. A WebGL metaball or SDF fluid, or a well made canvas simulation, with a specular highlight
  and translucency where the sauce is thin. Never a flat SVG blob sliding down.
- Toppings are drawn in one consistent glossy candy style, or cut from licence checked photos. Never emoji.
- It works by touch on a phone, and under reduced motion each tap shows the finished state instantly.

### The hero object. Their top hat
The top hat traced from their logo is the hero object, huge, purple with its band. Ideas to try and judge, pick one.
The dessert the visitor picks rises out of the hat. Or the hat tips and the shop's awning unrolls from it. Or scroll and
the camera falls into the hat and lands under their awning. Keep it theirs, keep it simple, and make sure the first
screen still carries the first input and the order action.

### The finish. The ticket
Their own caption says "No golden ticket needed, just a sweet tooth". The order ends on a ticket that prints, gold foil
that tilts with the phone or the cursor, with their creation drawn small on it, the shop, the time, the total and a
ticket number. Placing the order stamps it. The booking ends the same way, a confirmed table ticket. Never use the word
Wonka or anything from the film or books (section 15).

### Optional, only if each earns its place
- Pick and mix as a wall of their own sweet macro (photo 16) that parts round the cursor.
- The awning stripes as the transition between sections, a stripe wipe in their colours.
- Festoon bulbs that light as the evening deepens down the page, open 12 to 10.
- Their giant frozen yoghurt cup (post of 22 Oct) as the Huddersfield moment.
- The paw for doggy ice cream, a small reward.

Every moment has a still state and none plays under reduced motion. Heavy work (WebGL, physics, film) starts after the
page has loaded and rests when it's off screen.

---

## 12. Art direction

**The feeling.** Appetite and wonder. Walking into a sweet shop as a kid, made by a studio that dresses premium
confectioners. Playful and expensive at once. Not a children's party template, not a cartoon site. The photos do the
appetite, the shapes and motion do the wonder.

**Their pictures at the centre of everything.** Raka's words, "the pictures on the center". Their food photos run full
bleed and large, cut out and staged, or masked into their own shapes (inside the hat, inside a drip, inside an awning
scallop). Never shrunk into a grid of small boxes. Never darkened under a grey overlay.

**A colour script, not a palette.** The page moves like an evening at Charlie's. Bright lilac and white in the day
(the menu ground, the builder), deepening to Charlie purple and deep purple at night (the hero can open at dusk, or the
night falls as you scroll toward booking), with gold only where something is valuable (the ticket, the hat band, the
prices), and the stripe colours only in the stripes and cups. The sauce colours are live accents chosen by the visitor.
Photography carries most of the colour.

**Gradients, reinvented, not deleted.** No purple to blue hero, no glow behind a card. Gradients that are real
material instead. A sauce's gloss and translucency, gold foil, the lilac to purple dusk across the page, sugar glass
and iridescent sprinkles.

**Motion with weight.** Physics, pours, the awning rolling, a stripe wipe, the ticket printing and tilting. Never only
fades. Never decoration that ignores the order.

**Type.** Pull the font names off five or more premium dessert, confectionery and patisserie sites today (section 17)
and pair to them with fonts you may ship (OFL, licence file in the folder). The default that has passed Raka is one
grotesk plus a quiet mono, Mona Sans for everything (headlines at weight 500 to 560 with tight tracking, its wide and
condensed widths for big numbers and prices) and Fragment Mono for prices, times and the ticket. Their hand lettering
lives in their logo and menu art only. Don't ship their menu's display face unless you can prove its licence. Their
current site's Nunito Sans is on our banned list.

**Buttons.** Square, or one of their own shapes (a ticket stub, a scallop, a hat band). Sized and placed on purpose. One
word where you can, "Order", "Book", "Add".

**Layout.** Simple and uncluttered. Fewer sections, each doing one job. Edge to edge chapters, no cards floating on a
grey page, no repeated two column grid. Each section's job is to move the visitor one step toward the order.

**The test before Raka sees it.** Put your screenshots beside BWILD v2 and Saavedra v3. Would this pass for a 25,000
euro site from a top studio? Would anyone screenshot it and send it to a friend? If the honest answer is "probably",
it's a no. Go further.

---

## 13. The Claude look. Every item here has sent a build back

Raka's words across 12 builds. "a typical Claude and ChatGPT website where all the stylings and the positionings are the
same and like the buttons are the same ... it just feels like it's a 500 euro website". "it feels like it's so plain and
basic ... It needs to have a wow effect ... something that they've never seen before". "i feel like this is a normal
CLAUDE website. look you need to be an artist, use your creativity, creations, shapes, gradients, animations photos,
GRAPHICS, to tell the story". "it doesn't give me wedding vibes ... It's not exclusive". "the choice of fonts! They look
cheap as f. Not exclusive". "does this website make it super easy to tell the story and guide the intended audience to
the intended action?".

**Banned, all of it.**
- A serif headline with an italic second half. Any headline mixing roman and italic.
- A small uppercase kicker label over headings (one or two is fine, a kicker over every heading is the tell).
- Pill shaped buttons, and any arrow glyph in a button or link.
- Rounded cards with soft shadows. Chips and tags. A floating pill.
- Cream and indigo (or light and dark) chapters taking turns down the page.
- Generic gradients, glows, gradient overlays on photos, a dark overlay on every photo.
- Big count up numbers. Three pillars of bullets. Four facts with top rules.
- A logo or word marquee. Cute SVG illustration scenes.
- One texture under every section. The same two column grid again and again.
- Their photos shrunk into boxes. A graphic that reads as a chart when it's meant to be a picture.
- Motion that's only fades.
- More than 10 sections on the home page.
- Fonts Inter, Space Grotesk, Montserrat, Poppins, Archivo, Nunito, Roboto, Open Sans, Lato, Raleway, DM Sans, Plus
  Jakarta Sans, Manrope, Anton, Bebas Neue, Oswald, Libre Caslon, Playfair Display, DM Serif Display.
- A hero that's under a quarter their picture, film or mark at either size. Aim for over a third.
- A half screen anywhere, at 390 or 1440, with no way to the order except the header.

---

## 14. Copy

**Their voice.** Playful, warm, British, a wink ("Go on, you know you want to…", "Join the sweetest mailing list!",
"Celebrate your birthday at Charlie's and let everyone pick their favourite cake!"). Read their Instagram captions and
their news post and write like them, minus the emoji. British spelling (colour, yoghurt, favourite).

**Use their own lines wherever they fit.** "Go on, you know you want to…" "Everything on our menu is available for your
own creation." "Welcome to Charlie's little world of sweetness." "No golden ticket needed, just a sweet tooth." Quote them
exactly, copied from the source, never from memory.

**Hard rules for every word on the site**, Astra's house rules, checked by grep before each look.
- No dashes of any kind in prose (hyphen, en dash, em dash). Rewrite around them. Product names on their menu that carry
  one stay as they are ("Old-School Sprinkle Cake").
- No colons in prose. Times as "12 to 10", "7.30pm".
- Contractions everywhere (it's, you'll, we're, don't). Zero contractions is the clearest machine tell.
- At most one exclamation mark on the whole site. No emoji.
- Sentence case headings. Every heading says something specific to Charlie's, never a label like "Our Story" or "Why
  Choose Us".
- Never these words. delve, leverage, utilize, harness, unlock, unleash, empower, elevate, streamline, transform,
  supercharge, amplify, foster, facilitate, embark, seamless, robust, cutting edge, bespoke, tailored, holistic,
  innovative, groundbreaking, game changing, unparalleled, comprehensive, curated, immersive, impactful, scalable,
  landscape, ecosystem, realm, tapestry, journey, testament, synergy, solutions, furthermore, moreover, additionally,
  ultimately, essentially, indulge, delectable, mouthwatering, treat yourself (unless quoting them), elevate your.
- No "not just X, it's Y". No rule of three adjective lists. No rhetorical question openers. No fragments for punch. No
  "whether you're a X or a Y". Vary sentence length hard.
- If a sentence would read the same on another dessert shop's site, delete it and write the Charlie's version.

**The prototype note**, small, in the footer and on the order and booking screens, in plain words. "A prototype by Astra
agency for Charlie's Desserts. Prices from Charlie's menu. Nothing here places a real order or booking."

---

## 15. Truth and legal. Never break these

1. **Every price comes from `menu.json`** (their April 2026 menu) or the frozen yoghurt post. Never invent one. Never
   show a delivery fee, a delivery radius, a minimum order or a wait time as fact. Label anything illustrative ("example
   collection times", "delivery area set by Charlie's").
2. **Every total is labelled an estimate** (section 10).
3. **Huddersfield hours aren't published.** Write "hours to confirm" or leave hours off that shop. Don't say Brighouse
   serves frozen yoghurt, it isn't published.
4. **No reviews, ratings or quotes** unless you opened them at source, with the reviewer's own words and name as shown.
   The FSA ratings are official and may be shown, each with its own shop, both of them (5 Brighouse, 4 Huddersfield).
5. **No people named.** Never show or name the child in photo 15. Never present any photo as Danielle, Charlie or a
   member of staff.
6. **Third party marks.** Oreo, Bueno, Biscoff, Nutella, Aero and Grimace are names on their own menu, so they appear as
   text only. Never draw or show those brands' logos or packaging. Crop or paint out the robot's branding, the Yarde Farm
   sign and branded sweet packets in photo 14. Zoom every photo for marks.
7. **No Wonka.** Never the words Wonka or Willy Wonka, no Oompa Loompas, no chocolate river, nothing copied from the
   film or the books. The top hat is their own mascot's. The golden ticket line is their own caption, use it as theirs.
8. **No Uber Eats** link, logo or mention anywhere on the prototype. The site's whole point is ordering direct.
9. **Licence checked media only.** Any film or photo that isn't theirs (a sauce pour, a sprinkle fall) comes from a
   source whose own page you read, with its licence written down (on Mixkit read each item's copyrightNotice, some are
   "Restricted", personal use only). Never captioned or implied as Charlie's. The handover lists each one.
10. **Nothing time limited.** No half term sale, no "new" badges that will date.
11. **Never put anything from section 21 on the site.** That's for Raka.

---

## 16. Technical

- **A static site.** HTML, CSS and vanilla JS, or a small build step that outputs static files. No framework required.
  It must run from the folder with any static server and deploy to Netlify as is. No external CDNs at runtime, fonts
  and libraries are self hosted in the folder (a pinned three.js or matter.js file is fine).
- **The order flow works end to end as a mock.** Build, ticket, shop, collect or delivery, time slot (inside opening
  hours, in UK time), name and phone, place order, stamped confirmation. Nothing is sent anywhere. Same for booking.
  Every control name unique across the page.
- **Phone first.** Test at 320, 360, 390, 430, 768, 1024, 1440 and 1920. No horizontal scroll at any width (test
  `scrollTo(200, y)` and read scrollX at 320 and 360). Touch works for the builder, and vertical scroll still works while
  dragging (drag sideways only).
- **Performance.** Phone Lighthouse performance 75 or better on a real device profile. Images in AVIF or WebP at the
  sizes shown, lazy below the fold. Film only where it means something, with a poster, never autoplayed under reduced
  motion or data saver, codecs named in each source's type so a browser never fetches two. WebGL and physics start after
  load, rest when off screen, cap at 30 frames a second on slow devices.
- **Accessibility.** axe clean at the top and at the end of the scroll, both motion modes. Text contrast measured from
  pixels on photos, not guessed. Never dim text to show state. Never make the h1 inert.
- **Reduced motion.** Every moment has a designed still state.
- **noindex.** A robots meta tag, a `robots.txt` that disallows all, and a `_headers` file with
  `X-Robots-Tag: noindex, nofollow`. A favicon from their hat.
- **Known traps from past builds.** clip-path hides but doesn't contain, so animated content inside a clipped shape gets
  overflow hidden too. A full screen decorative canvas gets `pointer-events:none`. Sticky layers with negative margins
  can escape their section, give the section `overflow:clip`. Keyframe names and CSS custom property names are global,
  so grep before adding one. Inline SVGs drawn twice need unique ids. Every evaluate in a test that waits on a frame has
  its own timeout.

---

## 17. Research you still do, today, before the card

### 17A. Go beyond the normal Claude or ChatGPT website. Research the default first, then leave it behind

Raka's words, on builds that came back. "think outside of your AI box ... it still feels like the lovable and AI stuff"
(CustomKit). "take like the top 50 companies in the world ... Check their website ... Does it tell a story? What kind of
media do you need to tell the story?" (Qualigraf). "we have just taken what they've done and put an icing cake on it ...
You didn't redesign it" (Qualigraf again). And on 28 Oct, for this build, "go beyond the normal claude or chatgpt
website's".

**Say this to yourself plainly. You're an AI, and your default taste IS the look Raka sends back.** When you judge your
own build, you judge it with the taste that made it, so "this looks good" passes when it shouldn't. The only fix is to
look at the default on purpose, write it down, and build against it.

1. **Map the AI default for exactly this brief.** Render ten or more sites made with AI site builders and templates
   (Lovable, v0, Bolt, Framer AI, Wix AI, Durable, Squarespace and Shopify dessert, ice cream and cafe templates) and,
   if you can, ask a plain chat model for "a website for a dessert parlour with online ordering" and screenshot what it
   gives. Write the pattern list. Expect a pastel or dark hero with a centred headline, "Indulge in..." copy, pill
   buttons, a three up bestsellers grid of square photos, rounded cards with soft shadows and emoji or line icons,
   fade up reveals, a testimonial carousel, an Instagram strip, Inter or Poppins or a script face. Charlie's current
   site is most of this list already.
2. **Go beyond the top 50.** Render 50 of the best sites in the world, not only dessert. Food and drink brands,
   confectionery and toy brands, product launch pages (Apple's product pages, Nike), Awwwards and FWA winners, studios
   known for WebGL, physics and playful product configurators. Script it, one run, a screenshot of each at 1440 and
   390. Get past bot walls with a real browser TLS fingerprint (curl_cffi impersonation through Playwright) before you
   give up on one, and name the ones that stayed walled. Report how many actually rendered, never "top 50 studied" when
   30 did.
3. **Fingerprint them, don't just look.** Count at runtime while scrolling. WebGL canvases, videos, sticky and pinned
   scenes, clip-path masks, blend modes, physics or animation libraries, words on the first screen, and how each one
   moves a visitor to its action. The numbers tell you what the best actually do, which a screenshot can't.
4. **For each, the one move worth taking**, and what kind of media tells each part of the story. Every chapter of
   Charlie's gets a different medium (a pour, physics, a drag number, a printed ticket, a stripe wipe, their full bleed
   photo, a shopfront). Two chapters in a row with the same medium reads as a template.
5. **The departure table**, in the card. Left column, every pattern from step 1. Right column, what the Charlie's build
   does instead, made from her own material. A redesign changes four things at once or it isn't one. Palette and type,
   the page grammar (how a section is built), the story spine, and the media. Her site with effects on is the icing on
   the cake Raka rejects.
6. **The red team before the first look.** Write five lines describing how a default AI would have built this homepage.
   Then put your first screen beside your step 1 screenshots and the best of step 2. If yours sits closer to step 1,
   start again before Raka sees it.

### 17B. The lead and the field

1. **Their site and posts, opened yourself.** Every page of charliesdesserts.com, the menu PDF, and every Instagram post
   you can read (the public embed at https://www.instagram.com/charliesdessertshop/embed/ shows the newest six, older
   posts through https://www.instagram.com/p/<code>/embed/captioned/). Write down every caption line you might use.
2. **Type and premium look.** Render five or more premium dessert, confectionery and patisserie sites and write down the
   faces each uses. Candidates to try, drop any that don't load. Milk Bar, Dominique Ansel, Ladurée, Pierre Hermé,
   Venchi, Amorino, Van Leeuwen, Salt & Straw, Jeni's, Morelli's, Crumbl, Sketch London. Add your own finds.
3. **The art.** Within the 50 of 17A, at least 20 award level sites (Awwwards Sites of the Day, FWA, the studios
   behind them), weighted to food, drink and playful brands with real motion, WebGL fluid, physics and product
   configurators. One line per site on the technique worth taking. The signature moment is measured against these.
4. **The rivals** in section 4, so the card can say in one line why Charlie's beats every one.
5. **Media.** Any licence checked film or photo you'll use, with its page and licence.
Record everything with its URL in `research/notes.md` in the build folder.

---

## 18. Checks before each look. Each one with a planted failure that it must catch

A check that can't fail proves nothing. For every check, plant the fault (for example add a pill button, break a price,
hide the bar) and confirm the check fails, then remove the plant.
1. **The walk.** Scroll the home page half a screen at a time at 390 and 1440. Every step has a visible order action
   that isn't the header (the bar counts). Print each step. Same on every other page with its own action.
2. **The hero.** At 1440 by 900 and 390 by 844, the share of the first screen that is their photo, film or mark, by hit
   testing. Under 25% fails, under 35% needs a reason in the card.
3. **The look.** Computed fonts against the banned list. Headlines with roman and italic mixed. Kickers above headings.
   Pill radius on buttons and links. Arrow glyphs in buttons. Soft shadow rounded boxes. Count up animations. Section
   count. Light and dark chapters taking turns.
4. **The sums.** A script that reads `menu.json` on its own, builds 30 random orders through the UI (bases, favourites,
   sauces, toppings, extras, sizes, frozen yoghurt), and compares its own total with the page, the bar, the ticket and the
   form, to the penny. Plant a wrong price and watch it fail.
5. **The menu.** Every item in `menu.json` appears on the page as text with its price. Count them.
6. **The copy.** Grep the built HTML text for dashes, colons in prose, emoji, more than one exclamation mark, the banned
   words, and uncontracted "it is", "do not", "you will", "we are", "that is".
7. **Overflow** at every width in section 16, after a resize too.
8. **Errors.** Cold load with no forced state, zero console errors, zero failed requests, every image decoded, every
   film loaded only when near the screen.
9. **axe** at three scroll points, both motion modes, both sizes.
10. **Reduced motion and no JavaScript.** The page still reads and still shows the menu and prices.
11. **Lighthouse** phone and desktop, numbers in the handover.
If you have access to the Astra repo (`rifqiraka234-oss/astra-agency`), also run
`node tools/check-build.js <folder> --action "<every order and book control's CSS>" --shots <dir>` for the first look
and `--sections <dir>` for the final look. It must exit 0 with every plant caught. `python3 tools/bundle-site.py` makes
the one file HTML.

---

## 19. The build card. Fill it before any code, send A to C with the first look

**A. The visitor and the action**
1. Who lands, by role, and what they're thinking in order. The second and third visitor too.
2. The one action for each, and the CSS selector that finds every control for it.
3. The flow table, refined.
4. The one state, and how the form arrives filled in.

**B. The idea and the feeling**
5. The feeling a buyer of a Charlie's dessert expects, and how the hero shows it.
6. The one idea in their own words, with its source.
7. Their mark as the hero object, which file, and how it becomes the hero.
8. The signature moment, made from their material, and the award sites rendered today it was measured against.
9. Is the art in this first build? (It must be.)

**C. The look**
10. Type. Five premium sites in the field, their faces, our pair and its licence.
11. The colour script from their material.
12. What changed from their site, in one line.
13. Every photo and film listed, whose it is, its licence, third party marks checked.
14. Not one item from section 13, and the checks in section 18 pass.
15. The AI default (17A step 1, how many sites, the pattern list) and the departure table (17A step 5).
16. Beyond the top 50 (17A steps 2 to 4), how many rendered, which stayed walled, the moves taken and from where.

**D. The test**
17. Screenshots beside BWILD v2 and Saavedra v3, and beside the AI default screenshots. Would this pass for a 25,000
    euro studio site? Would anyone screenshot it? Does it sit closer to the best of the 50 than to the AI default? Say
    why, honestly.

---

## 20. What you hand back

**At the first look.** `card.md` (A to C, with lines 15 and 16), a contact sheet of the AI default sites beside your
first screen, first screen at 1440 and 390, three frames of the pour. Then wait.

**At the final look.** Every section at 1440 and 390, and the one file HTML. Then wait for "final".

**On "final", one folder, zipped**, `charlies-prototype/`.
```
charlies-prototype/
  index.html            the site (plus menu/ or other pages if you made them)
  css/ js/ media/ fonts/  self hosted, licences in fonts/
  menu.json             the data the page reads
  _headers robots.txt favicon
  research/card.md research/notes.md research/flow.md
  qa/                   the check scripts and their last output, plants included
  HANDOVER.md
```
**HANDOVER.md** says, in plain words. Who it's for and the one action. What's real and what's illustrative (delivery
area, time slots, the mock order). Every outside photo or film and its licence. Every assumption Danielle should confirm
(what a create your own base includes, Huddersfield hours, whether Brighouse has frozen yoghurt, whether "Golden Box" has
replaced The Ultimate Box). What she'd swap in (her own reels and footage of the counter and the pour). The check results
with numbers. Anything you couldn't do.

---

## 21. Only for Raka, never on the site

- **Budget flags.** Companies House, read 28 Oct 2026. DOBB LEISURE LIMITED (16057311, food services, registered at her
  group's Brighouse address, the likeliest operator of Charlie's, though nothing on the register names Charlie's) has an
  active proposal to strike off with its first accounts overdue. MEXI BEAN LTD (12943131) shows its confirmation
  statement overdue. Could be filing lag or a restructure.
- **Her group already sells direct** on Foodhub for Mexi Bean, so her likely question is "why not just add Charlie's to
  Foodhub". The answer the prototype gives is the create your own experience, which a Foodhub menu doesn't do.
- **Part two, the plan site, only if Raka asks for it** after the prototype's final. If he does, a short site in Astra's
  voice on its own folder. Today's three screens of her site (the Uber Eats button, the picture menu, the CET booking
  form). A control where the visitor sets an example weekly order count and order value and sees what Uber's listed
  30% delivery and 13% pickup fees (ex VAT, Uber's page, read 28 Oct 2026) would take in a year, labelled as an example,
  never as her numbers. The build in screenshots from the final prototype. What runs underneath (direct ordering and
  payments, delivery by her own drivers or a per delivery service, bookings that confirm, the menu as data she edits).
  Six weeks to live. The price only if Raka gives one. Same look rules, same copy rules.
- **The delivery message, drafted, sent only by Raka** after the live link is checked.

```
Danielle, here's the sketch I offered, a Charlie's site where people create their own dessert at your menu prices and order it straight from you, and every button on it works.

Try it yourself.
https://astra-charlies-prototype.netlify.app

Birthday tables book and confirm on it too, and you'll find Huddersfield's frozen yoghurt in there.

What do you think?
```

---

## 22. The menu as data

The full `menu.json` sits next to this file. If you only received this brief, here are the parts the builder needs
most. Every named item and its price is in `menu.json`, and the PDF is the final word.
- Create your own from £5 across the menu. Crepe or waffle from £5.50. Shake from £5.50. Cookie dough £6.50. Plain
  whippy sundae £5.00. Mini Dutch pancakes x10 £8.50, x20 £15.50. Scoops 1 £2.50, 2 £4.50, 3 £6.50, cones +50p, +£1.00,
  +£1.50 or a tub. Strawberry cup Reg £6.00, Large £8.00 (+£1 your own chocolate bar, +£2 marshmallows). Frozen yoghurt
  Small £4.99, Medium £5.99, Large £6.99, unlimited standard toppings.
- Sauces £1.00 each. Milk choc, White choc, Bueno, Biscoff, Caramel, Strawberry, Raspberry, Blue Raspberry, Bubblegum,
  Pistachio, Mint Chocolate, Orange.
- Toppings £1.00 each. Mango, Strawberries, Raspberries, Sherbet, Fudge Pieces, Marshmallows, Oreo Bits, Chocolate
  Chips, Banana, Hazelnuts, Peanut Butter, Chocolate Stars, Sprinkles, Chocolate Curls, Biscoff Bits, Popping Candy.
  Gobstopper £1.50, Gum Balls £2.00, Pick & Mix Cup £2.00.
- On a crepe, waffle or cookie dough, add a scoop of vanilla ice cream £2 or whippy £4.
