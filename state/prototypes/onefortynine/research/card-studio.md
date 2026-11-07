# Build card, the Breakout Box studio (7 Nov 2026)

Raka 7 Nov, "make a netlify to provide our options and suggestions, and also to make him choose designs and palettes and
layouts. Like in a way a sandbox sims builder for his website. With all the different suggestions." Built in `studio/`, not
deployed. The live v2 site at astra-onefortynine-prototype stays as it is.

## A. The visitor and the action

1. **Who lands.** Owen, from a link Raka sends before or during the refinement session on Wed 11 Nov. He wants to see his
   options, try them on his own site and say what he likes ("I'm happy to email you over with some of the ideas", 3 Nov call).
2. **The one action.** Send my choices, `[data-send], [data-send-jump]`, in the top bar, under the intro and at the foot.
3. **The flow.** Colours, type, first screen, headline, sections and their order, pages to add, then send. Every choice
   restyles the preview of his v2 site as he clicks.
4. **The one state.** { palette, type, hero, headline, sections in order with on or off, pages }. It drives the preview (by
   postMessage, same origin), the summary, the hidden form field and a share link (`?s=`), and a link reopens the same choices.

## B. The options and Astra's picks, each with the reason shown on the page

- **Colours.** Daylight (pick, 60 of 65 big brand homepages white, brand-scan-2026-11-06.md), Your colours (his navy, red,
  orange), Games table (v2.1 baize and brass), Ink and ember (near black, hot orange).
- **Type.** Clean and modern, Mona Sans (pick). Chunky and friendly, Fraunces at 820 with SOFT 100 (SIL OFL, in
  `studio/preview/fonts`), the closest open face to his Cooper Black.
- **First screen.** Film beside the headline (pick), headline in the middle, film across the top.
- **Headline.** "There's money on the table." (pick, with the venue line), and three of his own lines, "An escape room in a cool
  box." (/breakoutbox), "Stock Breakout Box. Unlock new sales." (/contact), "Think escape room meets unboxing." (home).
- **Sections.** The seven middle sections of v2, on or off, up or down. Hero and the form always stay.
- **Pages to add.** Parks and pubs (pick for now), cafés, training, lodges, a games page, customer stories, log in to reorder.
  No prices on the page, the quote is Raka's call.

## C. How it's built

The preview is a copy of v2 (`studio/preview/`) plus `css/theme.css` (palettes as CSS variables, two dark palettes sharing one
rule set, the soft serif, the hero layouts) and `js/theme.js` (applies the choices, swaps the headline, orders and hides
sections). The studio shell is Mona Sans and Fragment Mono, light, black buttons at 10 to 12px, no pills, no chips.

Sending posts a Netlify Form (`studio-choices`, honeypot `website`). Locally there's no form handler, so it shows the honest
fallback, copy the link and reply to Raka's email. On Netlify, form detection has to be on for the site, check it after the
deploy and send one test submission. No email address is printed on the page.

## D. Checks

- Functional test passing, every option restyles the preview, the headline line hides with another headline, sections hide and
  reorder (Games off, Your numbers moved to first), the share link reopens the same choices, the phone frame, a real phone with
  the preview pinned on top, 0 page errors, no sideways scroll at 390.
- check-build on `/preview/` PASS (film, motion, first screen 38% picture at desktop, 40% on a phone).
- check-build on the studio shell fails `hero` and `art` only, because the checker can't see inside the preview iframe, where the
  film and motion are. The first screen action check was a real miss and is fixed (send button in the intro). Not deployed until
  Raka says final and accepts those two.

## v2, a real builder (Raka 7 Nov, "colours so we can choose HIS palette and fonts. Like a website builder with them")

- **Make it yours.** Background, text, buttons and a two colour highlight, each a colour picker and a hex field. Choosing a preset
  loads its colours into the pickers (Your colours loads his own #09004a, #ff914d and #ff0000), so he tunes from a start. Any edit
  switches to his own palette. The preview works out the rest from his five colours with CSS color-mix (secondary text, lines,
  tints, cards, header, the band), turns dark mode on when the background is dark, and picks white or near black button text by
  contrast. A readability line reports text on background and button labels as a contrast ratio and warns under 4.5 to 1.
- **Fonts.** Headlines from seven, Mona Sans (pick), Fraunces Soft (closest to his Cooper Black), Young Serif, Bricolage
  Grotesque, Instrument Serif, Unbounded (steps down a size, it's wide) and Schibsted Grotesk. Body text from four, Mona Sans
  (pick), Instrument Sans, Schibsted Grotesk, Bricolage Grotesque. Each tile is set in its own face. All SIL OFL 1.1, from the
  Fontsource npm packages 5.3.0, licence files in `studio/preview/fonts/OFL-*.txt`.
- The share link and the sent summary carry his own hex codes and fonts. Tested, his navy on a warm off white with red buttons
  (17.6 to 1, buttons 5.0 to 1), a plum and gold dark palette with Young Serif and Instrument Sans (dark mode on, button text
  black on gold), a bad pair warns (1.4 to 1), Unbounded doesn't spill, the link round trip keeps colours and fonts, 0 page
  errors. A wide body font pushed form inputs past their card, fixed (inputs shrink to their column).

## v3, the catalogue (Raka 7 Nov, "a way also to choose the different webpages? Like a catalogue ... all the things we can build
for him. Based on his needs and call")

`studio/catalogue.js`, 70 ideas in nine groups, pages for each buyer (9), tools that sell for you (11), proof and trust (7), games
and products (7), for the players (6), your customers' account (7), tools that give you time back (7), getting found and growing
(10), brand and look (6). Each card says what it is, why it's there (a quote from the 3 Nov call where there is one, otherwise the
research reason), what it does for him (more enquiries, look established, save your time, bring people back, grow next year) and
when (6 in his site now with a See it link, 24 next, 40 later, our picks marked). He searches, filters by when and by goal, adds
to his plan, and the plan sits in the design panel with Remove links, goes into the summary he sends and into the share link.
The old "Pages to add" list is replaced by it. No prices anywhere, quoting stays Raka's.

Tested, 70 cards in 9 groups, Next filter 24, Next plus Save your time 5, search "seasonal" 2, adding and removing updates the
count, plan and summary, See it switches to Design and scrolls the preview to the section clear of its header, the link reopens
the same plan, phone with the filters scrolling in one row, no sideways scroll, 0 page errors. The builder test still passes.
