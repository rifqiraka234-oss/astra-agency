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
