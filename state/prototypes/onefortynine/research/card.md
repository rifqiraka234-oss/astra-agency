# Build card, OneFortyNine Games, the Breakout Box host page (1 Nov 2026)

Promised in the thread, Owen said yes 1 Nov 09.09 Amsterdam to "a sketch of the host page", a host page that shows what
a box earns and takes the order online. Research in this folder, site-notes.md, offer.json, media.json, brand.md,
social.md, data.json, calculator.md, references.md, flow.md. First look built, hero and one signature moment only.

## A. The visitor and the action

1. **Who lands.** A holiday park manager or a host with several cottages, lodges or pods. Owen's own LinkedIn line is
   "Helping holiday parks & leadership teams get people off screens", and his stand is LLT155 at the Land Leisure &
   Tourism Show, NEC Birmingham, 4 to 5 Nov (home page banner). Second, a single cottage owner. Third, someone booking a
   team day. In order they ask his own four questions from /breakoutbox, "What's in the box?", "How does it work for our
   business?", "What do we get?", "How much does it cost?", with "will guests play it" before and "what does it earn me"
   after.
2. **The one action.** Order a box, rent from £60 a month or buy from £350. Selector `[data-order], [data-call]`, the
   second for the 15 minute call (park managers, teams). In the hero beside the first input, in the header, and in the
   bar from the first scroll. check-build, 0 half screens without a way to the action, at 1440 and 390.
3. **The flow table.** research/flow.md, one row per question, from his four questions.
4. **The one state.** { what you run, units, stays a month, share that play, price per play, rent or buy }. The hero's
   "What do you run?" writes it, the estimate reads it. The rest (the earnings controls, rent or buy, the order arriving
   filled in) is the second pass.
4b. **Pages and header.** Header from the first screen, What's in the box, How a stay plays, What it earns, Rent or buy,
   Team days, Order a box. Second pass, a /teams/ page and an /order/ page, the host page about 10 screens.

## B. The idea and the feeling (v2, 1 Nov, after Raka's "Not exclusive enough ... Redesign the whole thing and palette")

5. **The feeling.** A product launch for their box, then the heist in the dark. Their own pieces lit like Analogue's
   console and Oryzo's coaster (references.md B and C, rendered today), then a torch finding their real photos one by one,
   and the lights coming up on the "yes we did it" moment (their words, home page).
6. **The one idea, in their words.** "Stock Breakout Box. Unlock New Sales." (their /contact page, both H1s), set as the
   headline with their own pieces in front of and behind the words (Ink Games, Obsidian Assembly, rendered today).
7. **Their mark as the hero object.** Their real lid with the 149 lock logo on its label (li-2026-07-10-coming-together-1,
   cut out), floating with their open aluminium case, The Heist briefing and the frosted 149 cups (video still 12s and
   li-2026-08-31-boxes-packed-2, cut out). Real objects, no drawings.
8. **The signature moment.** The torch. The light goes down and a torch beam finds their own photos in the dark, four
   stops counted 01 to 04 (Haunted Boulder City's numbered night): the lid by a stone wall, The Heist briefing and the
   strap lock under the lid, the cases and lock box inside, then the cups, where the light floods up. Measured against
   Lightship (their film inside the mark) and Cyphr (the photo seen through a cut), rendered today. No award site found
   uses locks or escape rooms.
9. **Is the art in this first build.** Yes, the light, the floating pieces, the entrance, the pointer and the torch.

## C. The look

10. **Type.** Fraunces (variable, SIL OFL, licence in site/fonts) for the voice, roman only, no italic halves, at opsz
    144 with the SOFT axis up. A serif voice because the field sets one. The hosts' premium world, Kip Hideaways in
    Argent CF, Unplugged in Quincy CF, Plum Guide in Domaine Display, Canopy & Stars in Cira Serif. The best boxed mystery
    and immersive brands, Mysterious Package Company in Newsreader, Punchdrunk in Scotch Display (references.md B, all
    rendered 1 Nov). And their own headline face is Cooper Black, a 1970s soft serif, which Fraunces descends from in
    spirit. Mona Sans for the reading text, Fragment Mono only for codes and prices.
11. **Colour script (v3, 1 Nov, Raka "use their colour palette but then like this").** Their own palette, lit the
    v2 way. Their navy #09004a taken to night #04001f in the shadows, their orange #ff914d as the light behind their
    pieces, deepening to #d8622e, their white for every word, their pure red #ff0000 for one small thing (the dot by the
    price). The torch scenes are toned to their navy and lit in their orange.
12. **New design language.** Their site is centred text over photos under a navy overlay. This is a lit still life
    of their real objects and a cinematic torch through their real photos.
13. **Every photo.** All theirs, from their LinkedIn posts and video (media.json). The clear box's "LOCKABOX" supplier
    emboss softened in the inside photo, both sizes. Their website images are AI edits and aren't used.
14. **check-build.** Passes, one expected warning, the serif voice, answered in line 10.

## v4, the first three seconds (1 Nov, Raka "Your recommendation for the best ... Is it giving wow effect?")

- **Headline, what it is.** "An escape room in a cool box." is their own product line (/breakoutbox, "A portable escape
  room experience. in a cool box."). "Unlock New Sales" (their /contact H1) didn't say what the thing is, a park manager
  landing cold reads "sales of what". Lede, their words shortened, "Hire it out to your guests; keep 100% of the
  revenue", "Or, Integrate it into your existing offering".
- **Their lock is the O of box.** The 149 combination lock from their own logo (li-2026-08-11-we-built-a-box.jpg, the
  ring and brackets measured off it) sits in the word "box", its three wheels roll and click to 1 4 9 on load. Screen
  readers read "box", the lock is aria hidden with a hidden "o".
- **The click opens the box.** When the last wheel lands, their real lid (cut out of their 10 Jul photo) folds up on its
  hinge and their real packed box shows underneath (their 31 Aug photo, LOCKABOX softened) in a flare of their orange.
  Their own promise, "escape room meets unboxing" and "that yes we did it moment as each lock clicks open", acted out in
  the first three seconds.

## The journey, checked (v3, Raka "who's the intended audience and what's the journey and action")

A holiday park manager or multi unit host lands (Owen's LinkedIn, his NEC stand LLT155, an outreach message). They ask,
in order, what is it, will my guests love it, what's in it, what does it earn, what does it cost, how do I get one.

- **First screen, what is it, and the action.** "Unlock new sales.", one line on what it is and that they keep 100%,
  "Order a box", "Book a 15 minute call", the price. Nothing else, v2's hero answered four questions at once.
- **The torch, will guests love it and what's in it.** Four stops in their photos and words, ending on "Order a box".
- **Next (the full build), what it earns.** "What do you run?" and the estimate move here from the hero, where they
  answer the visitor's next question instead of crowding the first one. Then rent or buy, team days, and the order
  arriving filled in.
- **The bar** carries "Order a box" from the first scroll, so no half screen is without the action (check-build walk 0).

## D. Honest notes before Raka looks

- The weakest part is the photo inside the box. It's a phone shot of grey plastic on a carpet, the only real top down
  photo they have. It reads true, not glossy. A new photo from Owen would lift it most.
- Their photos are phone shots, the torch scenes are upscaled 1.25 to 2 times and kept dark with grain, which hides it. New photos from Owen would lift the build most.
- The economics are honest. One cottage renting loses money at the sourced defaults, so the hero leads with park lodges
  (£140 a month after rent, an estimate) and shows one cottage as "18 months to pay off a £350 box".
- Owen asked publicly for a new website on 29 Sep and later said he'd found someone (social.md). This sketch competes.

## The full build (1 Nov, after Raka's "Yes! Go for ittt" on first look v4)

Eight sections, in the order a host asks. Hero, torch, how a stay plays, what it earns, rent or own, team days, the
NEC, the order. check-build PASS at 1440 and 390, 8 sections, 0 turns, walk 0, the serif warning answered in line 10.

- **How a stay plays.** Their line "The game does the work. The reaction does the marketing." (/breakoutbox) as the
  heading. Four steps from their own sentences (you set the price and contents, under 10 minutes and no staff, teams of
  up to six for 60 to 90 minutes with the hints portal, portable and fits a car boot). Each step opens one of their
  photos through a circle from where its lock sits. One new photo, boxes-packed-1 (31 Aug), LOCKABOX softened.
- **What it earns.** "What do you run?" is a drum that turns like their lock wheel, the units sharing one box are two
  wheels in their lock ring, then stays, share that play and price. Outputs a month, games a month, a 12 month chart
  owning against renting with the payback month marked, and one sentence. Defaults and presets from calculator.md,
  tested in the browser. One cottage £20 a month, pays off in month 18, renting loses £40. Three cottages £60, month 6,
  renting breaks even. Four pods at 6.7 stays and 10% £107, month 4, £47 after rent. Ten lodges £200, month 2, £140 after
  rent (the default). The units sharing one box is our inference from portability and the page says the numbers are
  estimates and play share is an assumption. Behind it their clear lock box with the 149 decal (10 Jul photo, LOCKABOX
  softened).
- **Rent or own.** Their two prices, their words for each, a line from the state for each, the six month crossover
  (6 × £60 = £360 > £350), and what every box comes with from /breakoutbox.
- **Team days.** "Pit team against team." from their 7 Sep post, the any order play line from /breakoutbox, and "No
  digital. No AI. No staff needed to run it." from their post. Book a 15 minute call.
- **The NEC.** Land Leisure & Tourism Show, Startup Zone, stand LLT155, 4 to 5 Nov, as a luggage tag.
- **The order.** Arrives filled in from the calculator (what you run, units, the estimate as a hidden field), rent or
  buy and boxes carry from the plan buttons, call mode from every call link. Validation tested. Sending turns into a
  dispatch tag with their 1 4 9 lock, the business and the postcode. Nothing is sent, the page says so.
- **Footer.** Company details from their footer and Companies House 17293756.

### Honest notes for the final look

- The page is dated by the NEC section, it's 4 to 5 Nov. If it goes to Owen after the show, that section comes out.
- Ten lodges sharing one box is our default, not his. He knows his parks better, the drum makes it one click to change.
- The calculator leaves out the cost of the snacks and drinks inside, the sources line says so.
- The photos are still his phone shots. Better photos would lift it most.

### The triple check before the final look (1 Nov, Raka "Make no mistakes okay?")

Reopened live today. /breakoutbox, home, contact and hints (all 200, control example.com 200), the show banner image,
three LinkedIn posts, Companies House 17293756, Cliffhanger Rooms and Locked In Cornwall. 28 product claims matched their
own pages word for word. Puzzle 1 Entry Point and Puzzle 6 The Vault on /hints. Banner image reads NEC Birmingham, 4 to 5
November 2026, stand LLT155, and "Startup Zone" is in the 25 Jul post. £88 is 4 × £22 and £104 is 4 × £26, both live.
Key Data stays recomputed to 2.88 a month. Five lines fixed. The torch's second photo was described as inside the open lid
when it's the closed lid under the strap. "Every box comes with" listed the cups, notepads, pencils, training and support,
which come with every order, so the heading became their own question "What you get" with per box and per order marked.
"One box can serve a whole site" was our inference stated as fact, now "The box is portable, so one box can go from unit to
unit". "Oak floor" became wooden floor (it's oak effect). "Two sets of The Heist" became the latest game, their own words.
