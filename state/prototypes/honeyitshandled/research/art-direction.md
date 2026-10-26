# Honey It's Handled, the art direction (26 Oct 2026)

The flow is research/flow.md, the references research/award.md. This is everything the eye gets, and where each piece
comes from in her own material.

## The idea, from her own words and marks

On 17 June she introduced her brand on Instagram with "And meet the palette. Something Off-White. Something Blue.
Something Red." That's the wedding rhyme turned into her colours, so it becomes the page's three acts, in order.

1. **Something off-white**, the first idea. Her paper, the envelope, the date.
2. **Something blue**, the months. Her blue as a wash through paper, calm, because the days are handled.
3. **Something red**, the day. Her red floods the page like ink through paper, and her line arrives in blue on it, as
   on her own hero.

Her marks are traced from her own PNGs (build/art/trace.py, potrace), never redrawn, the HH monogram
(42a973_022fb238, 7410 px), the wordmark (42a973_14a72e09) and the full lockup (42a973_c71e802d). Her colours are her
Wix palette, red rgb(150,33,34), blue rgb(211,233,238), off white rgb(249,247,246), ink rgb(51,51,51). Her stationery
grammar, from her stickers and cards on Instagram (5 Aug, "businesscards, stickers") and her site, is a red envelope, a
cream card with script, and die cut stickers with a white border.

## Signature moments

1. **Her envelope, opening on your date.** The hero object. A red envelope in paper texture with her HH as a die cut
   sticker on the flap. On arrival the sticker lifts, the flap opens and the card rises. On it, in her sticker grammar,
   "You say I do" in script, the visitor's date in the italic that sits closest to her wordmark, "I'll handle the rest."
   Every change of date re inks the card.
2. **Your days, drawn as her HH.** Every day between today and the wedding is one ink stroke, hatched at the HH's own
   slant inside the traced monogram, so 229 days draw the HH in 229 strokes. The scroll inks them one day at a time,
   with a tiny pool of ink at the end of each stroke. Elise's details from her own pages land on the drawing as margin
   notes with a hairline to their day. The service switch splits the ink, red for the days Elise carries, pale for the
   couple's. The count is computed from the visitor's own date and today. Reference, quynh.moe's clock of strokes.
3. **The hall, from above.** The guest slider fills seats around round tables drawn from Kaat DM's overhead photo of
   the Handelsbeurs. Cinco Cero (125) and the Pro League Awards '26 (570+) are marked on the same floor, so the visitor
   sees her own number against Elise's two nights.
4. **Her night inside her mark.** Four seconds of her own Cinco Cero aftermovie, the disco ball and the dance floor in
   blue haze, play inside the HH. Reference, resn's shape that holds the words.
5. **Red, like ink through paper.** At the day, a drop of her red spreads through the paper fibres until it fills the
   screen, and "The details are mine, the moment is yours." arrives in her blue. Her HH is blind debossed into the red.
6. **The letter, sealed.** The enquiry is a cream card already written. Sending folds it into her envelope and presses
   her HH sticker on, then "Consider it handled.", her own button text.
7. **17 tabs.** "Usually found with 17 tabs open" (her About page), so Elise's planner page has 17 index tabs in her
   three colours along its top edge, and her five "A little more Elise" lines are written on its ruled lines.

## The light behind the page, one shader

One WebGL canvas behind everything. Off white paper with fibres and a fine grain. In the blue act a watercolour wash of
her blue moves through the paper with darker tide lines at its edges, the way pigment pools. In the red act the ink
bloom. Colours are eased by the section in view. Without WebGL or under reduced motion each section carries its own
flat colour, and the drawing, the envelope and the hall are static and complete.

## Type

Noto Serif Display, upright at weight 260 to 320 for headlines in sentence case, italic at width 66 to 70% for the date
and the counts only. Mona Sans for text and controls. Fragment Mono for small dates and counts. Dancing Script on her
card only. Rendered side by side with her wordmark at 12.15 UTC (scratchpad media/typetest.png). The italic at width 70%
and weight 400 is the nearest OFL face to her lettering, Bodoni Moda and Instrument Serif were further.

## Rules kept

- No italic second half in any headline, no dash kickers, no pill buttons, no rounded soft shadow cards, no count up
  numbers, no marquee (her site has one, ours doesn't), no logo wall, no three pillars of bullets, no chips.
- Buttons are square, 13 px caps in Mona Sans, solid red or a 1 px rule.
- Gradients are paper, pigment and ink, never a purple to blue hero, a glow behind a card or a dark overlay on a photo.
  A caption on a photo gets a shade only where its words sit.
- Every animation has a still state. Reduced motion draws everything complete and plays no film.
- Her photos only. The HH and the wordmark are her own artwork. No stock photos, no stock film.
