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

## B. The idea and the feeling

5. **The feeling.** The "yes we did it" moment as a lock clicks open, their own words (home page). Dark, then the lock
   opens and warm light comes out of the box. The hero is their own mark, not a stock photo of a cottage, because they
   have no photos of guests playing, and we don't invent them.
6. **The one idea, in their words.** "Stock Breakout Box. Unlock New Sales." (their /contact page, both H1s). The lock
   in their own logo reads 149, their company name and their address, 149 High Street. Another company can't use it with
   the nouns swapped.
7. **Their mark as the hero object.** media/li-2026-08-11-we-built-a-box.jpg (their LinkedIn, 11 Aug, not on their
   site), traced with potrace into the B and X mazes, the O redrawn as geometry measured off the file (ring 23 px,
   brackets 22 px, windows 72 by 109). The three wheels are live drums that roll to 1 4 9 on load and click.
8. **The signature moment.** Scroll and the lock opens. The brackets part, the red lasers switch off one by one (their
   puzzle 2 is Laser Maze), the B and X walk off, the O grows into the outline of their real lid
   (li-2026-07-10-coming-together-1.jpg, cut out), the lid swings up and their real packed box is inside
   (li-2026-08-31-boxes-packed-1.jpg), with the six puzzles of The Heist beside it. Measured against Oryzo (Lusion, the
   object drawn before it's shown) and Lightship (Locomotive, the film inside the brand's own mark), both rendered today.
   No 2025 or 2026 award site found uses locks or escape rooms (references.md, 28 of 46 rendered).
9. **Is the art in this first build.** Yes. The lasers, the dust that catches them, the live wheels, the lock opening into
   the box and the warm light are all in this screen.

## C. The look

10. **Type.** Mona Sans (one variable family, headlines 560 weight, tight) and Fragment Mono for labels, both SIL OFL,
    licences in site/fonts. Premium in their field rendered today, references.md section B, 18 sites with their faces.
    Their own Cooper Black and Helvetica Neue aren't used, their logo stays their logo.
11. **Colour script.** Their navy #09004a taken darker into night, their pure red #ff0000 as the lasers, their orange
    #ff914d (the "GAMES" in their logo) as the warm light out of the box and the selection line, their logo grey #d9d9d9
    for the mark. No cream, no indigo turns, no purple glow (removed, it read as the AI default).
12. **New design language.** Their site is centred text over photos under a navy overlay, with pill buttons and an
    accordion. This is a dark stage, their mark as an object at full width, a live lock, and a scroll that opens it.
13. **Every photo and film.** All theirs. The lid and the packed box from their LinkedIn (10 Jul and 31 Aug posts). The
    clear box in the packed photo carries "LOCKABOX" embossed (a supplier mark), softened in that one patch, noted for
    the handover. Their website images are AI edits (Firefly, ChatGPT, research/media.json) and aren't used. The red
    diamond on the strap lock (a TSA mark) is in no photo used.
14. **check-build.** Passes, see the first look run. No italic halves, kickers, pills, chips, arrows, soft shadow cards,
    marquees or count ups. First screen 98% their mark or the light layer at both sizes.

## D. Honest notes before Raka looks

- The weakest part is the photo inside the box. It's a phone shot of grey plastic on a carpet, the only real top down
  photo they have. It reads true, not glossy. A new photo from Owen would lift it most.
- The lid swing is a flat plane turning, it reads as a lid opening but it isn't a 3D box.
- The economics are honest. One cottage renting loses money at the sourced defaults, so the hero leads with park lodges
  (£140 a month after rent, an estimate) and shows one cottage as "18 months to pay off a £350 box".
- Owen asked publicly for a new website on 29 Sep and later said he'd found someone (social.md). This sketch competes.
