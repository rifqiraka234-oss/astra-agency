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
11. **Colour script.** Graded like a heist film. Teal in the shadows (#061417 to #0d2a2b), copper light (#c8743f,
    #e9955a, #ffc48a) as a lamp behind their pieces that leans toward the pointer, a cold teal rim from the night
    outside, cream (#f4ead8) for the words. Then black teal for the torch, warming to copper when the lights come up.
    Their navy and red are gone from the page, their logo keeps its own colours on the product.
12. **New design language.** Their site is centred text over photos under a navy overlay. This is a lit still life
    of their real objects and a cinematic torch through their real photos.
13. **Every photo.** All theirs, from their LinkedIn posts and video (media.json). The clear box's "LOCKABOX" supplier
    emboss softened in the inside photo, both sizes. Their website images are AI edits and aren't used.
14. **check-build.** Passes, one expected warning, the serif voice, answered in line 10.

## D. Honest notes before Raka looks

- The weakest part is the photo inside the box. It's a phone shot of grey plastic on a carpet, the only real top down
  photo they have. It reads true, not glossy. A new photo from Owen would lift it most.
- Their photos are phone shots, the torch scenes are upscaled 1.25 to 2 times and kept dark with grain, which hides it. New photos from Owen would lift the build most.
- The economics are honest. One cottage renting loses money at the sourced defaults, so the hero leads with park lodges
  (£140 a month after rent, an estimate) and shows one cottage as "18 months to pay off a £350 box".
- Owen asked publicly for a new website on 29 Sep and later said he'd found someone (social.md). This sketch competes.
