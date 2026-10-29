# Charlie's Desserts, fixes before deploy (Astra review, 29 Oct 2026)

Reviewed the two folders you handed over (`charlies-prototype/`, `charlies-plan/`), rendered at 1440 and 390 and used end
to end. They're strong. Three things must change before Danielle sees them, and six small ones. Change only these, keep
everything else exactly as it is, rerun your checks in `qa/`, and hand back both folders the same way.

## Must fix

1. **Four favourites show a different dessert from their name.** In "Or start from a favourite" (`#favs-track`) only two
   photos show the item named under them. Danielle knows her own desserts and will spot the rest at once.
   | Favourite | Photo now | Problem |
   |---|---|---|
   | Charlie's Creation, waffle | p11 | fine, it's the loaded waffle with whippy, sweets and blue drizzle |
   | White Choc & Raspberry, cookie dough | p08 | fine |
   | Charlie's Creation, shake | p17 | the menu says a CHOCOLATE shake with sweets and a lollipop, the photo's shake is white |
   | Biscoff, waffle | p02 | no Biscoff in it, it's the same loaded waffle as Charlie's Creation |
   | Grimace | p06 | Grimace is a BLUEBERRY shake, the photo's shake is white |
   | White Stars, waffle | p13 | it's their cookie dough, not a waffle |
   Keep a photo only where it shows that exact item. For the other four, use your own drawn product art for that base,
   coloured to the item (Biscoff caramel drizzle and crumbs, blueberry shake, white chocolate and stars), or swap in
   favourites a photo genuinely shows. Never caption one of her photos as an item it doesn't show. Check the builder
   stage too, a favourite that lands in the builder must not bring the wrong photo with it.

2. **The plan says something false about her menu.** Finding 2 on the cover reads "The menu is two pictures and a PDF, so
   not one price can be read or tapped as text." Her PDF carries every price as real text, and your own caption under
   the menu screenshot says "Every price is there to read". Change finding 2 to "The menu is two pictures and a PDF, so
   no price on the site can be tapped or added to an order." Change the caption to "Your menu as two pictures. Every
   price is there to read, and none can be tapped or added to an order." (drop "searched", a PDF can be searched).
   Update the same line in `plan.json`.

3. **A blank screen after the dive into the hat.** Scrolling from about 0.9 to 1.5 screens down shows nothing but empty
   lilac and the order bar, at 1440 and at 390, before the drips and "Your way, at the menu's prices" arrive. Bring the
   drips and the waffle in as the dive lands, or shorten the run, so no screen between the hat and the builder is empty.

## Small

4. **Link the plan to the prototype.** Add one link to https://astra-charlies-prototype.netlify.app/ in "What you saw in
   the sketch" (for example "Open the sketch") and in "Next, a call."
5. **The two quantity minus buttons** (`#qty-minus`, `#party-minus`) use the U+2212 minus glyph. Draw plus and minus as
   two short SVG lines so the page has no dash glyph at all. Keep their aria-labels.
6. **Phone hero.** At 390 the rising waffle runs over the "from £5" badge and up into the awning. Keep the badge clear
   of the waffle (move it, or cap the rise below the festoon).
7. **The "Waffles" interlude on a phone.** At 390 the word is mostly hidden behind the waffle and its outline letters
   can't be read. Size or place it so the word reads.
8. **The builder's plain base.** The waffle base shows the fully loaded waffle (whippy, foam sweets, blue drizzle) next
   to "£5.50, plain". Add a short line under the stage, "Shown as Charlie's serve it, your price builds from plain", or
   use a plainer waffle cut from the same photo.
9. **Leave `RAKA_EMAIL` as it is.** Astra puts the address in at deploy.

## Then

Run your `qa/` checks on both sites, every plant caught. Send back both folders zipped and a short list of what changed.
