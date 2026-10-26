# Honey It's Handled v2, the art build (26 Oct 2026)

## Raka on v1, word for word

"i feel like this is a normal CLAUDE website. look you need to be an artist, use lyour creativity, creations, shapes,
gradients, animations photos, GRAPHICS, to tell the story, whats the vibe of the brand and tell the story, and also the
website should have clear flows and guides the user to different goals/actions, simple but like it works you know. it
also doesnt have a wow effect, it really doesnt/ its so basic. its like any other websites and especially website made by
claude"

v1 is retired. Keep its facts, data, QA machinery and the one state idea (the enquiry arrives written). Throw away its
look. This is the same jump as Fae Club v1 to v2 and BeBetter v1 to v2 (docs/build-and-deck.md), read both sections again.

## Why v1 reads as a Claude site (from the 35 screenshots, scratchpad honey-review/)

- One pale blue marble paper texture under nearly every section. One flat mood, low contrast, template feel.
- A small uppercase kicker over every heading ("SOMETHING BLUE", "A 50TH BIRTHDAY · 28 AUGUST 2026", "MEET ELISE",
  "EXCLUSIVE LAUNCH OFFER"). Banned tell, RULES section 5.
- Serif headline plus an italic line ("When's your I do?" then "12 June 2027"). Banned tell.
- The same two column grid, words left and a graphic right, section after section.
- Her photos used small and boxed (two Pro League thumbnails, a Cinco Cero stamp, Elise in a frame) when they should
  carry the page edge to edge.
- The HH drawn from sparse dashes reads as a chart. The round tables read as a diagram. Neither is beautiful.
- Motion is fades and reveals. Nothing anyone would screenshot.
- The brand's vibe is missing. Her name is a wink, "Honey, it's handled", said like a friend who's already sorted it.
  Her photos are fashion editorial (black outfits, laptop and champagne, playful poses). Her red is lacquer, her blue is
  powder, her stationery is stickers and envelopes. Her nights are a Mexican fiesta with a mirror ball and a 570 guest gala
  under the iron and glass roof of the Handelsbeurs. None of that energy is on v1.
- Only couples are guided. Birthdays and company nights get one text link. Her freelance event manager offer is absent.

## The story to tell

Two layers, always. The moment, which is the guest's and the couple's, and behind it the details, which are Elise's.
Her own lines carry it, "The details are mine, the moment is yours.", "You be there. I'll handle the rest.",
"I think ahead, so you don't have to.", "Usually found with 17 tabs open." So the page should keep showing the calm,
beautiful front and let the visitor peek at the controlled chaos behind it, then put them back in the moment. It ends
where her promise ends, the final dance.

## The flows, simple and working

Write the four lines and the flow table again (research/flow-v2.md) with three visitors and three actions.
1. A couple marrying in 2027 or 2028, no planner yet. Action, the wedding enquiry, as one of her first couples.
2. Someone planning a birthday, a dinner, a private celebration. Action, the celebration enquiry.
3. A company or an agency with an event, or that needs an experienced freelance event manager. Action, the company
   enquiry or "hire Elise for your event".
The first screen asks what we're celebrating and the answer chooses the path, the words, the photos and the form type.
Each path is short, has its own proof (weddings, the launch offer and her years in events; private, Cinco Cero and Jan
Geysen's words; companies, the Pro League Awards 570+ and the freelance offer), and its own action. The header carries
Weddings, Events, About and one button, and the bar at the bottom carries the current choice and the action. Run the Fae
Club v3 guide walk for all three paths at 390 and 1440. A path that's more than one screen from its action is broken.

## The art, the bar to beat

At least three signature moments nobody has seen, each made from her own material, plus art directed colour, shape and
motion between them. Directions to beat, not to copy. Choose by rendering real award level work today.
- **A living lacquer.** Her red as a glossy, viscous liquid (WebGL) that pours and settles like honey, with powder blue
  light in it, forming her HH or her wordmark, moving with the pointer and the scroll. A colour script, not a palette,
  off white to blue to red as the day goes from first idea to the dance, "Something Off-White. Something Blue. Something
  Red." (her 17 June post).
- **Behind the curtain.** A full bleed photo of one of her nights, and the pointer (on phones, a press or the scroll) is a
  lens that shows what was behind it, her run sheet, timings, the backup plan, the tabs. The moment on top, her details
  underneath.
- **Seventeen tabs.** Her "17 tabs open" as a real object, a planner with coloured index tabs that fan, flip and slide.
  It's also the control for the help they want, full planning slides every tab to Elise, partial planning splits them,
  day coordination leaves her the last ones. The graph is the planner.
- **The final dance.** A mirror ball built from tiles of her own event photos (Cinco Cero had one), turning and throwing
  light across the page and onto the letter as the enquiry is sent, sealed with her HH sticker.
- **Her nights, full bleed.** The Handelsbeurs roof and the Cinco Cero floor edge to edge, the 570+ and the 125 set huge
  and moving, cropped clear of third party logos as v1 was.
- **Elise as an editorial spread.** Her own photos cut out with a white sticker edge like her own stickers, big, playful,
  overlapping, "a little more Elise" as stickers she peels.
Real motion everywhere it means something, scroll scenes, shape, depth, grain, but every scene has a static state for
reduced motion and no script.

## Rules that still hold

- Every fact and line of hers copied from her pages as they stand now (she's editing, reread before building and again
  before the final build). Quote Jan Geysen word for word with his "!".
- No invented weddings, couples, reviews or prices. Her /weddings photos stay out (origin unknown). Cinco Cero is a 50th,
  never a wedding. The Pro League Awards are quoted from her page, nothing about who hired her.
- Third party logos stay out of every photo. Licence checked film only, never claimed as hers.
- Copy, no dashes, no colons, contractions, NO-AI-SLOP. The type has to look expensive (RULES section 5), pull it from
  premium event, wedding and fashion houses today, and drop the serif plus italic pattern.
- The banned Claude tells in RULES section 5, item by item, before anyone sees it.
- English only is fine. The budget flag stays at the top of the handover.
- Full QA as v1, plus the guide walk on all three paths. Then a single self contained HTML with
  `python3 tools/bundle-site.py site <out.html>` so Raka can open it while Netlify refuses deploys.
