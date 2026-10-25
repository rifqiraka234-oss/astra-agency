# BeBetter, art direction references

Rendered 2026-10-25 with the container's Playwright Chromium, desktop 1440x900 and phone 390x844 (iPhone viewport, DPR 2). Every screenshot was opened and looked at. Measurements come from computed styles on the live page (`raw/<slug>.json`), the notes on photos and first screens come from looking at the shots. Manifest `refs.jsonl`, contact sheet `contact.jpg`, first screens `shots/<slug>_desktop.jpg` and `_phone.jpg`, full pages `_full.jpg`, the state before any cookie or newsletter dialog `_raw.jpg`, configurator walk-throughs in `config/`.

Counts are in the last section. Nothing was pushed past a bot wall. Rhone and Alphalete showed a Cloudflare challenge on desktop, Castore blocked both, adidas returned 403 on both. Those are recorded as walled and left alone.

One container limit matters for reading the shots. This Chromium can't decode H.264, so any hero that's a film shows its poster or a fallback ("Sorry, your browser doesn't support embedded videos" on Nike's phone hero). The video elements were still counted and sized from the DOM.

## What the best ones share, measured

The premium training and apparel sites, first screen, desktop then phone.

| Site | Ground | Headline | Body / label | Button | Media on first screen |
|---|---|---|---|---|---|
| Pas Normal Studios | #FFFFFF, black chapters (3,600 px of black blocks) | Plain 72/500, leading 1.0, tracking -0.03em, sentence case. Phone 48 | 14/20, nav 13 | Square, 1px white outline, 0 radius | Photo 1440x900, 100% |
| Satisfy | #FFFFFF | ABC Walter Neue 60/900. Phone 40 | ABC Simon Mono 18, labels 12 | Rounded outline SHOP on the photo, black 36px tall 6px radius for Add | Slideshow 1440x617, 69%, riders and product macros alternate |
| Represent | #FFFFFF | STK Bureau 32/500 per half | 12/16, tracked | Translucent square, rgba(0,0,0,.3), 1px rgba(255,255,255,.3), 2px radius, 40px | Two portraits 720x900, split 50/50 |
| Represent 247 | #FFFFFF | "ON A MISSION." heavy caps over photo | STK Bureau 12/18 | none on photo | Photo 1440x517, 57% |
| Ten Thousand | #FFFFFF | DM Sans 100/700 uppercase, leading 1.1, mono kicker. Phone 32 | DM Sans 16/20, DM Mono 14 uppercase nav | Black pill 120px radius, no arrow | Autoplay film 1440x810, 90%. Phone 390x844, 100% |
| Nike | #FFFFFF, #F5F5F5 | Nike Futura 76/500 uppercase, leading 0.9. Phone 40 | Helvetica Now 16/24, labels 14/500 | White pill 36px, 30px radius, no arrow | Photo 1440x700, 78%, plus 2 full-bleed autoplay films |
| Gymshark | #FFFFFF, black bands | Plaak 48/800 uppercase, leading 0.9. Phone 32 | SN Skandia 14/19.6 | Square 52px, 0 radius, white fill or outline | Inset film 1360x510, 54%, sound and pause buttons |
| Bandit | Black blocks, terracotta #BF3E2B, amber #D67400 | Tomato Grotesk 120/500 uppercase, leading 0.8 | 16/500 uppercase labels | Outlined box 5px radius plus underlined text links | Photo 1448x829, 92% |
| Odd Ritual (FWA) | Black body, white sections | PP Neue Montreal 42/600 uppercase, leading 1.0, -0.03em. Phone 28 | 14/600 uppercase | No buttons, text is the link, second line greyed | Photo 1440x900, 100% |
| Phive (FWA) | Yellow #FFD904 and near black #161003 | PP Formula condensed 55 desktop, 114 on phone, uppercase | Acid Grotesk 20.8 uppercase | Thin outlined oval | Photo 1440x960, 100%, 6 films (2 full-bleed) |
| SOLK (FWA) | #FFFFFF | Spaced caps wordmark, kicker MADE TO FADE | Suisse Intl 15/22 | none | Photo 1440x810, 90% |
| Capitolium (FWA) | Sand #F0E3CF and slate #58595B | Gin serif, spaced capitals 100px, with a calligraphic script line under the title | Times 23.7 | Square chapter tabs | Aerial film 1440x900, 100%, 11 films (6 full-bleed), page 79,633 px tall |
| Outfit (FWA) | Warm grey #EDE4DD, red #FF0001, black | The wordmark, edge to edge | 14/700 | none | Studio photos in an irregular grid, no full bleed |

What that adds up to.

1. **People, full bleed, first.** 8 of the 13 sites in the table open on a photo of people covering 78 to 100% of the first screen (Pas Normal, Odd Ritual, Phive, Represent, Ten Thousand, Bandit, SOLK, Nike), and Satisfy's slideshow alternates riders with product macros at 69%. Gymshark is the outlier with an inset card at 54%. The photos share a move. One person is still and sharp while something moves around them (Pas Normal's runner blurring past a man who stares at camera, Phive's commuters streaking around one still athlete in club kit), or the crop is tight on a body in the garment with sweat and grain (Ten Thousand, Bandit, Alphalete).
2. **White and black carry the page, the photo carries the colour.** 9 of the 13 sites in the table run on a pure white ground (#FFFFFF), with black used for chapters, bands or text. Colour grounds appear only where the brand owns a colour (Phive yellow, Outfit red, Capitolium sand). None of the 13 uses a gradient outside its photo grading.
3. **One sans headline, big and tight.** Desktop sizes 42 to 120px, median about 60, leading 0.8 to 1.1, 6 of 9 in uppercase. Phone headlines drop to 28 to 48px, except Phive, which goes up to 114 on phone. Body sits at 14 to 16px, so the headline is 4 to 7 times the body. A mono for labels shows up at Satisfy, Ten Thousand, Fitdrop and Chrono. Serif appears only as a supporting voice (Chrono's subtitle, Odd Ritual's slide numbers) and as Capitolium's engraved capitals. No headline rendered today used a serif with an italic second half. Capitolium comes closest, serif capitals over a calligraphic script line, so take its capitals and its plinths and leave the script.
4. **Square or no buttons.** 9 sites use square buttons (0 to 5px radius) or plain text links (Pas Normal, Represent, Gymshark, Vuori, Bandit, Odd Ritual, SOLK, YoungLA, Fitdrop). Pills appear at Nike, Ten Thousand, Alphalete, Phive and Jetson, and none of them carries an arrow. Square white buttons are big when they sit on photos (Gymshark 52px, Vuori 60px).
5. **One ask on the first screen.** Every first screen asks one thing, two at most. "SHOP BALANCE", "SHOP FALL 2026", "SIGN UP", "PREVIEW" (a dated drop), "Request an offer".
6. **Rhythm.** Pas Normal alternates people chapter, product rail, people chapter, product grid, which is what Raka meant by "it's all about the feel". Capitolium tells a kit launch in named chapters over 79,633 px.
7. **Film is controlled.** Gymshark puts sound and pause buttons on its films. Nike and Ten Thousand autoplay muted full bleed. In this container the films showed only their posters, so the poster has to be good on its own.

## What to take from each premium reference

- **Pas Normal Studios.** The still person inside motion blur. The people, product, people rhythm. A kit sold as a bundle with a price ("Build a kit and save 15%") and a "Sponsored Teams" link in the footer.
- **Represent and Represent 247.** The split first screen as a choice, which for BeBetter is shop the line on one half and kit out your gym on the other. "ON A MISSION." ends on a full stop, BeBetter.'s own punctuation. The grid's Model toggle shows every product flat or worn.
- **Satisfy.** Heavy grotesk over a mono, film grain on every photo. Black, white and grain are enough.
- **Ten Thousand.** Tight crops of the garment on a moving body. An "Athlete-led design, proven under pressure" section that explains the wear-test loop, the same promise as 1% better every day.
- **Nike.** "TRAIN EVERYTHING" is one frame holding a row of athletes in five different moves, a chronophotograph. Many moves in one frame reads as progression.
- **Gymshark.** "How do you train?" is a picker made of people photos, not icons.
- **Bandit.** The cart in the nav counts kilometres ("0.000 KM"). A brand joke in a utility slot. BeBetter's could count the 1%.
- **YoungLA (desktop).** A crew photographed in a worn real gym reads as a club ("The Immortal Club"). Products as short loops.
- **Alphalete (phone).** Sweat and low light on skin say gym better than any equipment.
- **Odd Ritual.** Text as the button. The brand's own printed newspaper as a prop in the hero photo, which for BeBetter is the tech pack.
- **Phive.** One still athlete in a moving crowd. The PHIVE wordmark in the middle of a scatter of the member clubs' own photos, which is BeBetter's 10 gyms and 3 coaches.
- **Capitolium.** Two kits standing on stone plinths under "Plus qu'un maillot, le symbole de notre cité". The kit as a monument. Serif as engraved spaced capitals (not its script line).
- **Outfit.** The wordmark as the hero object, edge to edge, with ® where BeBetter's full stop would sit. Product names written in the brand's own language.
- **Fitdrop.** Physics as the wow layer. Outfits drop from the top and pile up, drag one to the corner for details, "RESTART DROP".
- **Chrono.** Viewfinder brackets on the viewport corners and terminal status lines ("> LOADING GARMENTS ARCHIVE..."). A technical document feel.
- **SOLK.** Product worn in a place, framed by architecture.

## The configurators, and how each one puts a name or a logo on a garment

| Configurator | Garment | Logo and name | First screen asks | Price |
|---|---|---|---|---|
| Custom Ink Design Lab | A real photo of a man in a plain white tee fills the middle | Typed "BEBETTER GYM" landed on the chest at once with handles to rotate, scale and delete, font Avenir Bold Condensed, size field 1.25 in. Names and Numbers is a separate step for teams | "How do you want to start?" Uploads, Add Text, Add Art, Change Products | Hidden behind "Get Price" |
| owayo 3D Designer | WebGL jersey on grey, zoom and rotate, not loaded after 15 s here, loaded by 45 s | Text through a modal "Enter text, name or number here" with a checkbox "same across all items (like team name)", individual names "later in the shopping cart". Logos, upload a file, 2,500 stock images, my logos | "Choose your sport", then tabs Design, Colors, Text, Logos | "Price and delivery time" button |
| spized 3D configurator | 3D jersey in an iframe, left rail Design, Color, Pattern, Gradient, Number, Name, Text, Logo | Name is a "PLAYER NAME" placeholder, real names go in the cart | "Design your jersey now" | Live, "Unit price for 10 pcs. €51.90" with a yellow "24 % QUANTITY DISCOUNT" tag beside "Finish configuration" |
| Nike By You | Product photos, 8 "Inspiration" preset designs above the size grid, "Customise" chip on the image | The 3D builder didn't open inside the time budget | "Customise" | €159,99 shown |
| Jetson by Mute (FWA, B2B) | WebGL pod (blank in this container), every option a segmented control | Not a garment | "Request an offer" | No cart, the configurator ends in a quote request |

adidas teamwear and Castore custom were behind their walls. The Under Armour team URL tried was a guess and returned 404, so it wasn't pursued.

**The gap all four garment configurators leave.** Names are a placeholder and the real roster is a spreadsheet in the cart (owayo and spized say so on screen). The order is never shown as the physical thing a gym receives. All of them promise a human design check and none shows the document a factory works from. The garment floats on grey, never in a gym. And the logo is always a flat print, nobody shows how it's stitched or printed.

## Five signature moments for the custom kit page

The one action is the gym owner sending a kit request with their logo, the sizes and the design already filled in. Each moment below writes to one order state carried down the page (the Saavedra rule), so the form at the bottom arrives filled in.

### 1. The tech pack draws itself

Left, the inputs, gym name, logo drop, colourway, garment. Right, an A3 tech pack in black line on white, the document a designer sends a factory. Front and back flats of the tee or hoodie in 1px line, the gym's logo placed with dimension lines in centimetres from the collar and centre front, ink or thread colour callouts, a size spec table, and a title block set in the BeBetter. serif with "Rev. 01" and the date. Every edit redraws the changed lines with a short draw-on stroke and the revision ticks up, Rev. 02, Rev. 03, so 1% better every day is literal on the sheet. The final button downloads the tech pack as a PDF and attaches it to the request.

Why it moves the owner. It's the proof that BeBetter actually makes the thing, the step the others hide behind "our graphic designers review every design".
Inspired by owayo's Design-check and Roster, spized's design-check note, Custom Ink's size field in inches, Chrono's viewfinder brackets and status lines, Odd Ritual's own printed newspaper as a prop.

### 2. The size run rail

The order is a clothes rail, one shirt per member on a hanger, the size on the hanger tab, the name on the back. The owner types "8 S, 14 M, 10 L, 4 XL" or pastes a member list and the shirts slide onto the rail. The rail drags sideways. The end tag holds the price per piece and steps down at each quantity break with the saving in euros.

Why it moves the owner. Thirty-six members become thirty-six shirts on a rail, the moment he pictures his floor in matching kit. Everyone else hides that in a cart spreadsheet.
Inspired by owayo's Roster and "individual texts later in the shopping cart", spized's PLAYER NAME placeholder and the live unit price with its quantity discount, Custom Ink's Names and Numbers, Pas Normal's kit bundle price. BeBetter's real price breaks are needed, anything shown before then is labelled as an example.

### 3. The teddy on the plinth

The engraved muscled teddy is the fit model. He stands on a stone plinth, the podium of the expo stand, wearing the kit, and the gym's logo lands on his chest the moment it's dropped in. Drag to turn him, or three fixed angles if there's no 3D. The plinth face is engraved with the gym's name in spaced capitals in the BeBetter serif. A second state rings the plinth with the 10 gyms' and 3 coaches' own photos, the way Phive rings its wordmark with its clubs.

Why it moves the owner. It's BeBetter's own world, a sculpture instead of a grey mannequin, and his name is cut into the stone.
Inspired by Capitolium's kits on plinths and engraved capitals, Outfit's wordmark as the hero object, Phive's clubs around the wordmark.

### 4. The full stop signs it

The full stop in "BeBetter." is the brand's signature, so on this page it does a job. It's the cursor on the gym name field, and when the owner confirms, it drops out of the wordmark onto the hem as a woven label reading "BeBetter. × [gym name]". Around the uploaded logo, a stitch pass runs, satin stitch direction lines filling the shapes, so he sees embroidery instead of a flat sticker. A toggle shows print versus stitch.

Why it moves the owner. It answers "will my logo look cheap" before he asks, and the label puts his gym next to the brand.
Inspired by Outfit's ® at the end of the wordmark, Represent 247's "ON A MISSION." full stop, Bandit's joke in a utility slot. Custom Ink places text flat with handles and none of the four configurators tried today shows stitching.

### 5. The drop

When the owner presses the one button, the order drops. The right number of folded shirts in their sizes fall into an open black BeBetter box and pile up, a packing slip prints line by line beside it, and the request form below arrives filled in (gym, sizes, logo file, tech pack). Under reduced motion it's a static packed box.

Why it moves the owner. The order becomes a box he can picture arriving at the gym, right at the moment of commitment.
Inspired by Fitdrop's outfits that drop, pile and can be dragged for details, and Bandit's cart that counts something real.

Where the licence-checked film goes. The black and white bike films and the hand-wrap film in `../assets/film/` belong on the shop and brand side, full-bleed chapters with one sharp person, following Pas Normal and Phive. Never on the custom kit page as if they were BeBetter's gyms or members.

## Seen today, and to avoid

- The pill with an arrow is gone from every premium site rendered today. Where pills survive (Nike, Ten Thousand) they're plain white or black with no arrow.
- No soft-shadow cards on the pages looked at. Pas Normal's product tiles are flat light grey with no shadow, Gymshark's are plain photos.
- No headline uses an italic serif second line. Odd Ritual and Tersa grey out the second line instead.
- Films without a poster show as grey boxes or an error string in a browser that can't decode them (Nike phone, Ten Thousand phone, Vuori phone, Toulouse 9x8). Poster first, WebM before MP4.

## Counts, and what failed

31 reference URLs tried (29 sites plus 2 configurator walk-throughs).

- **Rendered clean on both viewports, 20.** Satisfy, Pas Normal Studios, Represent, Represent 247, Gymshark, Ten Thousand, Vuori, Nike, Bandit, Outfit, Odd Ritual, Phive, Capitolium, Fitdrop, Chrono, SOLK, Jetson, owayo, spized, Custom Ink.
- **Partial, 6.** YoungLA (desktop clean, phone first screen captured only under its app banner and cookie dialog, the clean phone pass timed out three times), Alphalete and Rhone (phone rendered, desktop walled by a Cloudflare challenge), Tersa and iyO (desktop first screen captured, then the runs hung on their WebGL scenes), Nike By You (product page rendered, 3D builder not opened).
- **Failed, 5.** Castore (Cloudflare block), adidas (403 access denied), Casa Lunara (domain parked), Stade Toulousain 9x8 (page driven by an H.264 intro film, stayed black), Under Armour team (guessed URL, 404).
- Dialogs. Cookie banners were answered with their own reject or accept buttons, Nike's location prompt with "Netherlands", Capitolium's "Entrer" gate and Chrono's "click anywhere to start" with one click, Odd Ritual's newsletter overlay removed from the DOM for the screenshot. The untouched first screen is kept as `_raw.jpg`.
