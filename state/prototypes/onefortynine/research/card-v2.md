# Build card v2, OneFortyNine Games, Breakout Box host site (6 Nov 2026)

Raka 6 Nov, "build it to the prototype ... feel exclusive, feels open, with animations, with videos ... tells the story ...
not like a typical Claude", "use stock videos and images thats fine", and the idea, "the website actually makes the
visitors actually experience the box, so they can open it by themselves ... and discover ... what the business looks like
for them, per ICP ... why are we not doing this? There's money on the table for you." Built in `site-v2/`. The research
behind it is `deep-needs-2026-11-06.md`, `call-analysis-2026-11-05.md`, `rebrand-analysis-2026-11-05.md` and
`leadership-plan-2026-11-05.md`. First look built, the hero and the one signature moment, nothing deployed.

## A. The visitor and the action

1. **Who lands.** From Owen's outreach (LinkedIn, cold email, "when we direct people to it"). First, the manager or owner of a
   pub, cafe, holiday park or training firm who got his email. Second, **the boss it gets forwarded to** ("they'll badger the
   boss about it"), who never met Owen. Third, a small independent ("the quick and easy ones"). In order they ask, what's in
   it for my venue, what does it earn, what does it cost, what's the catch (space, staff, damage, will they come back), who
   are these people, how do I get one (all from the 3 Nov call, deep-needs Part 1).
2. **The one action.** Get your box, `[data-order]`. In the header, in the hero, under the money line after the box opens,
   and in the closing section. check-build walk 0 half screens without it, 1440 and 390.
3. **The flow table.**

| Step | The visitor's question | What they see and do | The moment |
|---|---|---|---|
| 1 | Is this worth my minute? | Film of four tables (pub, cafe, park, training room), "There's money on the table." and the place changes with each cut | The line names their venue as the film reaches it |
| 2 | What is it? | One line, an escape room in a cool box, the snacks and drinks are the prize, they keep every penny, no staff, no screens | |
| 3 | Show me | His real box, locked. "The first puzzle opens the box." Three wheels, the clue "on every cup, and our name" | **They crack 1 4 9 and his lid swings open on its hinge (first look)** |
| 4 | What's in it for my venue? | "Who's opening it?" Five venue types. The four things inside his box become how it plays, what you charge, what sells around it, who plays | Their venue's money line, "So why isn't it on your tables yet?" (first look) |
| 5 | What would it earn me, really? | The calculator per venue type, inputs that fit that venue (rest of build) | The numbers carry into the proposal |
| 6 | How do I show my boss? | **Your Breakout Box proposal**, a deck style page with their numbers, their use, rent or own, what's included, the games coming, printable and shareable (rest of build) | Forward it in one tap |
| 7 | What's the catch? | Space, staff, damage, will they come back, against digital that costs thousands (rest of build) | |
| 8 | Will people come back? | The games, The Heist now, seasonal games coming (rest of build) | |
| 9 | Who are these people? | Owen, OneFortyNine Games, Swindon, real photo, his words (rest of build, needs his yes) | |
| 10 | How do I get one? | Two exits. Get your box (1 to 10 boxes), Talk to us about your group (sites, who decides, call back tick box). Arrives filled in | |

4. **The one state.** { venue, games a week, price, extras, rent or own, boxes }. The venue chosen in the box sets the
   calculator, the calculator fills the proposal, the proposal fills the form.
4b. **Pages.** Home (about 9 sections), a page per venue type from one template, Games, the proposal page, Contact, and the
   hidden hints per game (QR only, noindex, not in the nav). Header on every page, What's inside, Ways to earn, The
   numbers, Games, Get your box.

## B. The idea and the feeling

5. **The feeling.** The buyer's guests round a table, laughing, phones away, the click of a lock. And for the buyer,
   money they're not making yet. Exclusive and open, film first.
6. **The one idea.** "There's money on the table." Raka's line from this brief, and it carries both halves, the box sits on
   the table and the money does too. Owen's own words behind it, "why wouldn't you do it?", "why aren't we doing this?",
   "three, four, five times your money per box". Another company can't use it with the nouns swapped, because the box,
   the lock and the table are his.
7. **Their mark as the hero object.** His real lid (`media/lid.png`, cut out of his 10 Jul LinkedIn photo) with the 149 lock
   logo on its label, closed over his real open box (`media/inside.jpg`, 31 Aug photo).
8. **The signature moment.** The visitor plays the first puzzle of his own game. Three wheels, the code 1 4 9 (on his cups,
   and the company's name), the shackle lifts, his lid swings up on its real hinge, and the four props inside become the
   business case for the venue they choose. Measured against the references rendered today (C10). None of them lets the
   visitor open the product.
9. **Art in this first build.** Yes, the film, the lock and the lid.

## C. The look

10. **Type, references rendered 6 Nov.** Flight Club (Bebas Neue, Jost), Puttshack (Gyst, Ringside), Secret Cinema
    (SangBleu Kingdom, Montserrat), Punchdrunk (Scotch Display, Articulat CF), Soho House (Cardo, HK Grotesk), Kip
    Hideaways (Argent CF, Filson Pro), F1 Arcade (HCo Idlewild, Titillium Web), Canopy & Stars (Cira Serif, Roboto).
    Swingers and Electric Shuffle are behind a Cloudflare wall, Bounce didn't load, none of the three used. Ours, **Mona
    Sans** (SIL OFL, licence in `site-v2/fonts`) for everything, heavy and tight for headlines like Puttshack and Soho
    House's grotesks, and **Fragment Mono** (SIL OFL) only for prices and the wheel digits. **No italics anywhere**
    (Raka, 6 Nov).
11. **Colour.** His navy `#09004a` for the box chapter, a night `#07031f` for the film chapter, his orange `#ff914d` as the
    one accent (the place word, the buttons, the markers, the money), a warm paper `#f6f3ee` only for the closing get your
    box section. One lamp pool of orange under the box, the light over a games table.
12. **New design language.** His site is centred text over AI images under a navy overlay. This is a film band with no
    text on it, an editorial headline on solid night beside the pitch, and his real product you can open.
13. **Every photo and film.**
    - Hero film, four cuts, all **Mixkit Stock Video Free License**, read on each item's own page 6 Nov (`copyrightNotice`
      "Free"). Beer bar atmosphere 8711, waiter carries a cup of coffee to customer 219, people pouring a warm drink
      around a campfire 513, people having a work meeting around a table 4547. Frames checked, no logos. Decorative,
      `aria-hidden`, never captioned as his venues or customers, and the footer says so. Restricted clips rejected, 45449,
      45448, 48636, 45977, 25451, 46680, 14971, 21280. Friends playing Catan 5333 is Free but shows another company's
      game, so not used.
    - His own photos, `lid.png` and `inside.jpg`, from his LinkedIn, as in v1 (media.json).
14. **No section 5 tells.** check-build PASS, 0 italic, 0 kickers, 0 pills, 0 chips, 0 arrow glyphs, 0 cards, no marquee,
    no count ups, 3 sections, 1 turn, hero 63% film at desktop and 44% on a phone, walk 0, first screen action at both
    sizes, 0 page errors.

## D. Before Raka sees it

15. Beside Saavedra v3 (the visitor builds the order as they scroll) this does the same with the box, the visitor opens it
    and the business case falls out of it. The hero is calmer and more expensive than v1, a film band and big type. The
    honest weak spots are below.

### Honest notes for the first look

- **The money lines are our examples, labelled on the page.** Pub 2 games a week at £20 a team, £173 a month, 2.9 times the
  rent. Park 3 a week at £20, £260, 4.3 times. Cafe 2 a week at £25 a table, £217, 3.6 times. Training 6 a month at £30,
  £182, 3 times. Holiday lets 2 games a month at £25, £50, own pays back in about 8 months. They sit inside Owen's own "three,
  four, five times your money" line. The calculator in the full build lets them set their own, and Owen's real trial numbers
  should replace ours.
- **"Set your own below"** points at the calculator, which is the next section to build.
- **The film is stock.** Owen's own film of people playing (NEC stand, the trial) should replace it.
- **The inside photo** is still his phone shot of grey plastic. It reads true, a better one would lift the moment most.
- **The hero band at 1440 x 900** is the film over 56% of the screen with the headline and buttons below, all on screen.
