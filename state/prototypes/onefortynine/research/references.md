# Breakout Box host page, design references

Rendered 1 Nov 2026 with Playwright Chromium at 1440x900, through the agent proxy with the proxy CA pinned by key
(`tools/proxy-ca-spki.js`). Each site got a first screen shot (`<slug>-1.png`) and a mid page shot (`<slug>-2.png`)
after wheel scrolling to about 45% of the page, all in `refs/`. Fonts are the computed `font-family` on the h1, body and
first visible button, plus `document.fonts` entries with status loaded. Every site described here was rendered and
looked at. A site that didn't render is named as not rendered and nothing is said about it. Raw data per site
(title, final URL, fonts, colours, canvas and video counts) is in `refs/_render-data/`.

Two limits of the renderer, so nobody reads them as findings about the sites.
1. Playwright's Chromium has no H.264, so an MP4 hero plays as a black panel or shows a "not supported" message (seen
   on Bolted and Printworks). That's our browser, not their site.
2. Heavy WebGL runs on a software GPU here, so some award sites were captured on their loader. Those are marked
   "loader only" and only the loader is described.

The client's own pages were rendered too, for the object (`Z-client-home`, `Z-client-breakoutbox`). Their words
that the moves below are built from, read off https://www.onefortyninegames.com/ today. "Think escape room meets
unboxing." "A locked cool box. Real puzzles. Real stakes, because the snacks, drinks and treats inside only open when
you crack the codes." "that 'yes we did it' moment as each lock clicks open." "The game does the work. The reaction does
the marketing." And from /breakoutbox, "Each puzzle solved unlocks a prop that holds drinks and/or snacks" and "Hire it
out to your guests; keep 100% of the revenue". The object in their photo is a grey wheeled cool box with black straps
printed BREAKOUT BOX, and the wordmark's two O's are rings cut through the middle, like a lid lifting off.

---

## A. What not to make (10 rendered)

| # | Site | Tell |
|---|---|---|
| 1 | The Mystery Agency, https://www.themysteryagency.co.uk/ (boxed mystery puzzles, .co.uk, Elementor) | Parchment texture under every section, a sunburst logo dead centre, a four icon "How it works" row (bulb, stopwatch, padlock, detectives) and red rubber stamp buttons. The boxes themselves never lead the page. |
| 2 | Deadbolt Mystery Society, https://www.deadboltmysterysociety.com/ (WordPress, Avada) | Orbitron, Open Sans and Rubik on one screen, a box render pasted beside a stacked caps headline, an "As seen on" logo row, then four gold bordered portrait cards. |
| 3 | Hunt A Killer, https://www.huntakiller.com/ (Shopify) | A 10% off modal on arrival, then Oswald stacked caps with the last word in red, three boxed stat chips ("330,000+ cases closed"), "Three steps" and a sticky "Open a case" bar. |
| 4 | Red Herring Games, https://www.red-herring-games.com/ (UK murder mystery boxes) | Poppins everywhere, a dash kicker ("TRUSTED BY OVER 33,000 CUSTOMERS SINCE 2007"), a headline with its first half in coral, three soft rounded "How it works" cards with numbered circles. The AI look, line for line. |
| 5 | Breakout EDU, https://www.breakoutedu.com/ (lock box classroom games) | A blob shape hero, a magenta pill CTA, a cartoon brain mascot and a "500,000 educators" stat line. SaaS template with cute SVG scenes. |
| 6 | Beyond Breakout, https://www.beyondbreakout.co.uk/ (mobile escape games, Wales) | Quicksand and Work Sans, centred magenta caps headings, poster thumbnails floated inside text columns, a floating purple pill "Book now" and a side "Contact us" tab. |
| 7 | Enigma Escape Cornwall, https://www.enigmaescapecornwall.co.uk/ (builder site, generator "MyWebsite NOW") | Playfair, an orange paint stroke banner with an award badge, a twelve item nav over a photo of old keys, a row of orange social squares, then poster art tiled edge to edge. |
| 8 | DreadLock Escape Rooms, https://www.dreadlockescape.co.uk/ (Bodmin) | A stock chess piece photo with the logo centred on it, Dosis and Open Sans, a glossy blue rounded "Cornwall's Largest Escape Room Venue" label set in Times, and centred paragraphs on black. |
| 9 | Bolted Escape Rooms, https://www.boltedescaperooms.com/ (St Austell, Wix) | Boxed nav buttons, a centred block of body copy, and a four column address, phone, email and socials strip that fills the rest of the first screen. Their one good line, "It's a stormy night... on Bodmin Moor", sits small over the hero video (black here, see renderer limit 1). |
| 10 | clueQuest, https://cluequest.co.uk/ (London) | A carousel hero with two competing slides and yellow buttons, a neon green strip of award badges, thumbnail carousels inside carousels. Everything shouts at the same volume. |

Also rendered, not counted. Escape Hunt UK (https://escapehunt.com/uk/, WordPress, grunge texture and an orange, grey,
teal button triad), Challenger Experiences (https://www.challengerexperiences.com/, Oswald caps with mint full stops and
a duotone logo grid), Julia Charles Event Management (https://www.juliacharleseventmanagement.co.uk/, WordPress, teal
corporate events). Dropped because the domain isn't the company any more or didn't load. escapethecrate.com is now a
dog boarding business, escaperoominabox.com redirects to Mattel's shop, conundrumbox.com is "Coming Soon",
epicescapes.co.uk returned a Cloudflare challenge (403), and escaperoomcottage.co.uk, crypticillers.co.uk, escwelt.com,
norrisbox.com and exitthegame.com failed to connect twice through our proxy (not rendered, nothing said about them).

What the ten share, so the build can't repeat it. A texture or a dark overlay standing in for photography of the
box, a "how it works" row of three or four icons, stat chips and badges as proof, a pill or sticker button, and the
product shrunk into a card. Not one of them lets a visitor touch a lock.

---

## B. Premium in their field (18 rendered, 1 not rendered)

Fonts are as computed today. "Take" is the one move worth taking, and "Not" is the part that would break our rules.

### Boxed games and puzzles

| Brand | Rendered | Fonts (h1 / body / button) | Colour feel | Take |
|---|---|---|---|---|
| Analogue, https://www.analogue.co/ | yes | Circular XX for everything, headline at weight 500 | Pale grey studio sweep, black type, then a hard diagonal black and electric blue split mid page | The console and its cartridges studio lit and floating on grey, one small black "Buy Now" and a text link, nothing else on the screen. The object is the whole first screen. |
| Playdate, https://play.date/ | yes | Roobert for everything | Grey sweep, then whole sections in the device's own yellow | The product's colour becomes the page colour, and the device is drawn huge with its own screen saying "Hello." A tilted "Season 3" sticker is the only flourish. |
| Piecework, https://www.pieceworkpuzzles.com/ | yes | Graphik for nav and body, Canela (self hosted `canela-pw`) for display | Olive, chartreuse, bottle green and pink, all lifted off the boxes | Puzzle boxes stacked into still lifes with ribbon, food and props, so the box is a gift object. Their discount popup is a "Tap to Drop" plinko board, a game as the offer. Not their italic serif edit names or the press logo strip. |
| Printworks, https://www.printworksmarket.com/ | yes | Futura PT plus theme aliased self hosted faces ("Heading Font", "Paragraph Font") | Warm sand, walnut, olive | The game photographed in a styled room, a backgammon set on a stool with olives and lemon. The game sold as a piece of the interior, which is exactly what a host buys. |
| Cards Against Humanity, https://www.cardsagainsthumanity.com/ | yes | Helvetica Neue LT for everything | Black and white, one yellow strip | The product's own cards thrown across the hero at angles, overlapping, as physical things. The pieces are the hero. |
| Mysterious Package Company, https://mysteriouspackage.com/ | yes | Newsreader (h1) / DM Sans / DM Sans | Black, oxblood red, candlelight | A boxed story ("Dead Man's Tale") shot full bleed by candlelight with one title over it. The story speaks before the price. Not their scrolling quote marquee. |
| Areaware, https://www.areaware.com/ | yes | AreaExt (custom extended, display) / Graphik Web / Graphik Web | Lime, white, saturated glass colours | The object repeated as a pattern around a headline ("Hobknobbing Around" ringed by glass knobs). Shape from the product, not from decoration. |
| Unlock! by Space Cowboys, https://www.spacecowboys-games.com/game/unlock-short-adventures | yes, behind a consent wall | Anton / Unbounded / Readex Pro | Pale grey and yellow | Nothing to take. A boxed escape game range on a standard catalogue page with three faces on one screen. |

### Escape and experience brands

| Brand | Rendered | Fonts (h1 / body / button) | Colour feel | Take |
|---|---|---|---|---|
| Punchdrunk, https://www.punchdrunk.com/ | yes | Scotch Display caps in gold / Articulat CF / Articulat CF on a square gold button | Black, distressed, gold | Critics' quotes as the headline, huge, one per screen ("Hands down the best immersive company in the world", Time Out). Let others say the big thing. |
| Secret Cinema, https://www.secretcinema.com/ | yes (hero still loading at capture) | Sangbleu Kingdom / Montserrat / Poppins | Black | A wall of past production posters. Proof as a body of work, not as stars. Not its mixed fonts. |
| The Escape Game, https://theescapegame.com/ | yes | Tenon / system UI / DM Sans | Hot pink and blue with concentric maze rings | The maze rings as a brand device behind the hero. Not its pill buttons and rounded video cards. |
| Meow Wolf, https://meowwolf.com/ | yes | Montserrat everywhere | Neon, busy | Nothing to take. Proof that a remarkable experience can still get a template site. |
| Swamp Motel, https://www.swampmotel.com/ | no | | | www returned a 502, and the apex domain now serves a GoDaddy parked page. Not described. |

### Premium UK holiday lets and glamping (the host's world)

| Brand | Rendered | Fonts (h1 / body / button) | Colour feel | Take |
|---|---|---|---|---|
| Unplugged, https://unplugged.rest/ | yes | Quincy CF / Plus Jakarta Sans / Plus Jakarta Sans | Cream paper, forest green, dusk photography | "Lock your phone away" is part of the stay. Guests padlock their phone in a box and get board games, books and an old Nokia. The closest living proof that hosts sell the off screen night we're selling. Not their pill buttons or card carousel. |
| Kip Hideaways, https://www.kiphideaways.com/ | yes | Argent CF / Filson Pro / Filson Pro | Dusk pink, sage, stone | One dusk photograph carries the whole cosy feeling, a lit cabin window, a stove, a bath outdoors. Not the popups or the marquee. |
| Another Place, https://another.place/ | yes | Brown (regular and light) for everything | Full bleed sky and lake, each property with its own button colour pair | The first screen splits in two, two places with two actions each over their own landscape. That's our buy or rent fork, carried by pictures. |
| Canopy & Stars, https://www.canopyandstars.co.uk/ | yes | Cira Serif / Roboto / Roboto on a green pill | Woodland green, white | Long form stories with real people under the listings. Not the search bar hero, which every booking site has. |
| Plum Guide, https://www.plumguide.com/ | yes | Domaine Display Narrow / Halyard Display / Halyard Display | Warm stone, sunlit interiors | Big confident photography of rooms at the right hour of the day. Not the award roundels on the hero or the italic word in "hard work". |
| Living Architecture, https://www.living-architecture.co.uk/ | yes | Open Sans light and semibold | White, architectural photography | The houses fill the frame and crossfade. Everything around them (boxed nav, cookie card) is dated, so take only the photography. |

Type, read across all of them. The houses that look expensive set one grotesk for everything (Analogue in Circular,
Playdate in Roobert, CAH in Helvetica Neue, Another Place in Brown, Areaware in Graphik plus one custom display). The
ones that look cheap stack three or four faces (Deadbolt, Secret Cinema, Unlock!). That backs the default pair for
this build, Mona Sans for everything with its width axis for the big numbers and Fragment Mono for the codes, timer and
prices.

---

## C. Award level (46 attempted, 28 rendered, 13 loader or gate only, 5 not rendered)

Found through the Awwwards listings fetched today (Sites of the Day pages 1 to 13, 15, 17 and 19, the Games and
Entertainment, Hotel and Restaurant and 3D categories, and the text filters escape, puzzle, box, lock, game, mystery,
secret and cabin). Award and date are as those listings show them. Not one 2025 or 2026 winner is about locks, safes
or escape rooms (the first page of the escape, lock and box filters shows no winner after 2024), so the lock moves below
are measured against the nearest mechanics, dials, rings, masks, tabs and cut profiles.

A second pass on 1 Nov clicked through consent and entry gates and waited up to 40 seconds on loaders. Slugs ending
`-b` are that pass. Oryzo and The Watch also have extra scroll frames (`-f4`, `-f12`, `-f45`, `-f6`, `-f25`, `-f62`).

### Rendered (28)

| # | Site | Award | Theme | The move worth taking |
|---|---|---|---|---|
| 1 | Oryzo, https://oryzo.ai/ (Lusion) | SOTD 13 Apr 2026 + Developer, per its Awwwards page (the SOTD listing shows it as Site of the Month) | object launch | A cork coaster gets a flagship launch. The loader draws the coaster's ring as vector construction lines with orange bezier handles, then on scroll the real cork ring turns from edge on ("Isn't just a coaster.") to face on in a hand ("Powered by AI*") to a magazine cover. A dead straight voice over a humble object, and a ring drawn before it's shown. |
| 2 | The Watch, https://thewatch.60fps.fr/ (60fps) | SOTD 17 Aug 2026 | object launch | The watch first appears as a pale glass x ray, then the movement alone on black beside a huge ghost "38'" numeral, then a macro of the dial where the numerals stand up as 3D blocks. A dial you read like a landscape. |
| 3 | Palmer, https://www.palmer-dinnerware.com/ (UNCOMMON) | SOTD 30 Jul 2025 | object, reveal | An endless top down canvas of plates and cups on off white, "Drag to explore", zoom buttons, and a small black name tag pinned beside a piece ("Coco Pink", "Barolo"). The whole range laid out like a table you can walk around. |
| 4 | Mosby's Files, https://www.mosbyfiles.com/ (Tubik) | SOTD 13 Aug 2026 | reveal | The navigation is a stack of coloured file folders, one architect's name per tab, offset like a real filing drawer. The open folder's text sits in the folder body in IBM Plex Mono, with Signifier and Founders Grotesk. A case file you flick through. |
| 5 | Cyphr, https://www.cyphr.studio/ (HOLOGRAPHIK) | SOTD 19 Aug 2025 | reveal | The hero photo is seen through vertical slots whose bottoms step down at different heights, like the cuts on a key or the pins in a lock, over a full width Bandit Condensed headline. |
| 6 | Lightship, https://www.lightshiprv.com/ (Locomotive) | SOTD 13 Jan 2026 | travel object | The hero film plays inside their own four point star mark on white before it opens out, then a portrait frame of two people at a campfire, "Your home, anywhere." The brand's mark is the window onto the film. |
| 7 | Urban Jürgensen, https://urbanjurgensen.com/ (Digital Luxury Group) | SOTD 30 Oct 2025 | object, reveal | Behind an "Enter" gate the menu is printed on a torn sheet of paper, then a full bleed black and white feature, "James Turrell using light to keep time". A menu that's a note you've found. |
| 8 | Audemars Piguet House of Wonders, https://150years.audemarspiguet.com/en#/rooms (makemepulse) | SOTD 20 Dec 2025 | rooms, reveal | The loader's line drawing changed from the house to a watch part between our two frames. Inside, a spiral staircase built from movement parts, a welcome card topped with a line drawing of the building, a "Mechanical secrets" side tab and a "Surprise me" button. Rooms as chambers of a mechanism. |
| 9 | Don't Look Up, https://www.dontlookup.app/ (Marcelo Reis Melo) | SOTD + Developer 1 Nov 2026 | game | A hand drawn game in the page. A stack of coins is the loader, then a giant's legs among tiny people with "Start" and "Tutorial". It plays before it explains. |
| 10 | XOX, https://xox.makemepulse.com/ (makemepulse) | SOTD + Developer 10 May 2026 | game | The loader is a noughts and crosses board with the percentage in the middle square, then an avatar maker that leads into "tic tac BOOM" battles. The waiting screen is already the game. |
| 11 | Captain Goosebumps, https://goosebumps.epic.net/ (EPIC Agency) | SOTD 19 Apr 2025 | game | A goose on skis loads the game, then one paper card sits over a 3D scene with a single "Start coloring" button. One card, one action, over the world. |
| 12 | Ink Games, https://inkgames.com/ (ToyFight) | SOTD 14 Oct 2025 | game | Coins, gems and characters burst from behind a stack of condensed type ("Join the new era of gaming"), and "Play. Win. Earn." is the money section. Objects that sit in front of and behind the letters. |
| 13 | The Obsidian Assembly, https://obsidianassembly.com/ (Fiddle.Digital) | SOTD 14 Apr 2026 | object | Four figurines stand in a row inside the headline, between the words "Origin" and "Objects". The product sits in the sentence. |
| 14 | Yucca Packaging, https://yucca.co.za/ (Estrela Studio) | SOTD 31 Jan 2026 | object | The product shown mid use, milk pouring into an iced coffee in their cup, rather than on white. |
| 15 | Tengile Malamala, https://tengilemalamala.com/ (DashDigital) | SOTD + Developer 3 Oct 2026 | hospitality | A monogram on olive, then "Unmatched abundance" set wide and light on stone grey, then a press attribution (Russell MacLaughlin, National Geographic) over a full bleed wildlife photograph. |
| 16 | White Desert, https://white-desert.com/ (Malvah) | SOTD + Developer 11 Sep 2026 | travel | "ANTARCTICA" fills the bottom of the first screen over the hero film (grey here, renderer limit 1), and each camp is a card over aerial ice with its GPS coordinates as the caption. |
| 17 | Primland, https://explore.ownprimland.com/ (Outpost) | SOTD 4 Feb 2026 | travel | You arrive from above. A 3D aerial of the estate under drifting cloud, and the headline letters land one by one ("THE BLUE RIDGE" half set in the first frame, whole in the second), with "Explore the map" and "Start without audio". |
| 18 | Vakantiehuis Coquelicots, https://coquelicots.nl/ (Anne Noteboom) | HM 26 Aug 2026 | holiday let | A holiday house's guest reviews as tilted paper notes on a cloud shaped green field, each with the guest's score in a dark tile (10, 9.6). Hosts' proof made physical. Not its pill buttons. |
| 19 | Amrit Palace, https://amritpalace.com/ (Artemii Lebedev) | SOTD 15 Nov 2025 | hospitality | A candlelit table full bleed under "Flavors that stay", with the Google rating (4.7, 3,576 reviews) as a card pinned bottom right of the first screen. |
| 20 | MontRural, https://mont-rural.emblematica.agency/ (emblematica) | HM 21 Sep 2026 | holiday let | A botanical engraving beside the photo, and the welcome gift as a headline, "upon arrival all guests receive a complimentary bottle of local cava". The extra is the story. Not its italic serif halves. |
| 21 | Cozy Lake Cabin Rental, https://domekwbrzozach.pl/ (Mateusz Szymkowicz) | HM 30 Jul 2025 | holiday let | A fan of tilted holiday snapshots (a boat, a wake, a sunset) laid over each other like prints on a table. The holiday told in the guests' own pictures. |
| 22 | Haunted Boulder City, https://www.hauntedbouldercity.com/ (Zack Bujazia) | HM 26 Sep 2026 | mystery | A brushed "HAUNTED" over a condensed "BOULDER CITY" on a foggy night street, then chapters "01 Ghosts, 02 Dark history, 03 UFOs" in a top progress bar with a "03 / 08" counter over old photographs. A night told in numbered stops. |
| 23 | Aardvark Book Club, https://aardvarkbookclub.com/ (FUTURE THREE) | SOTD 30 Aug 2026 | unboxing | "Unbox stories worth talking about" with 3D books tumbling over wavy yellow and orange fields, then the genres stacked huge on magenta. Not its pills and arrow buttons. |
| 24 | Silent House, https://silent-house.com/ (Louis Paquet) | SOTD 28 Apr 2026 | experience | One plain sentence on white, then full bleed production frames with a "2/4" counter and the project name across the top. |
| 25 | Tesoro, https://www.tesoroxp.com/ (Jordan Gilroy) | SOTD 25 Dec 2025 | games, rewards | The wordmark fills the first screen at the bottom edge. Little else to take, and its chips and pill buttons are on the banned list. |
| 26 | Decathlon Yestalgia, https://decathlonyestalgia.com/ (index) | SOTD 28 Aug 2026 | product | Flat shapes with hard offset shadows floating on grey, then product photos with price lines. Little to take for this brief. |
| 27 | Forge Automotive, https://forgeautomotive.co.uk/ (12 Studio) | SOTD 25 Oct 2026 | product | The headline words come out of blur one at a time ("For Those Who Refuse Ordinary"). A code resolving, if it were digits. |
| 28 | Ledger Brandbook, https://brand.ledger.com/ (Ledger) | SOTD 20 Nov 2025 | security object | An "Enter" gate inside corner brackets, then "Choose your Ledger wallet" on cards and buttons with one clipped corner, all in their mono. Tag shapes from a security object. (Product images were black here.) |

### Loader or gate only (13), described only as far as they rendered

| Site | Award | What rendered |
|---|---|---|
| The Tie-break, https://thetiebreak.merci-michel.com/ (Merci Michel) | SOTD + Developer 25 Sep 2026 | New Balance and Miu Miu marks over a tennis ball icon on navy, still loading after 40 seconds on both passes. |
| Gucci, Mystery Unfolds, https://lafamigliamysteryunfolds.gucci.com/ (MONOGRID) | SOTD 17 Jun 2026 | A login wall, "La Famiglia, Mystery Unfolds". The mystery is behind it. |
| Max Mara Jacket Circle, https://thejacketcirclegame.maxmara.com/ (Adoratorio) | SOTD 16 Apr 2026 | The title card on red with an audio note. A click didn't start the game. |
| Gary and the endless forest, https://play.garance.com/ (Merci Michel) | SOTD 29 Sep 2025 | Logo and a 92% loader with foliage at the corners, on both passes. |
| Cipher, https://cipher.tv/ (Magnetism) | SOTD 20 Aug 2026 | A field of dot characters around a small spinning glyph, 54% after 40 seconds. |
| MIU MIU, A House that we shaped, https://immersivebags.miumiu.com/ (Merci Michel) | SOTD 25 Aug 2026 | The title set in wide caps with each line justified to the full measure, then a spinner. |
| Shopify Supply Performance Pack, https://shopify.supply/performance-pack (Shopify Design) | SOTD 12 Dec 2025 | A dark diagonal texture with three mono labels. The product never loaded. |
| KOKUYO, Curiosity is Life, https://www.kokuyo.com/en/special/curiosity-is-life/ (mount inc.) | SOTD 14 Dec 2025 | A loader whose colour changed from lime with a blue wedge to periwinkle between our frames. |
| Overworld Audio, https://overworldaudio.com/ (Rogier de Boevé) | SOTD + Developer 15 Oct 2026 | The name, then a faint line drawn circle and triangle emblem behind "Enter with sound". |
| UNESCO Stolen Objects Museum, https://museum.unesco.org/ (makemepulse) | SOTD 14 Jan 2026 | First pass a Forbidden page, second pass the loader, "load ... ing" with an object silhouette in the gap that changed between frames. |
| Telepathic Instruments, https://telepathicinstruments.com/ (Love and Money) | SOTD 28 Mar 2025 | The URL now serves a "Something is coming V soon" sign up. The awarded site isn't there now. |
| 45R Denim Karuta, https://45r.jp/ja/45denim-karuta/ (SHIFTBRAIN) | SOTD 30 Mar 2025 | First pass timed out on the screenshot, second pass redirected to 45R's store with a country chooser. The microsite isn't there now. |
| Aimee's Papercraft World, https://aimees-papercraft-world.com/ (Andrew Woan) | SOTD 24 May 2026 | Four torn paper quarters with the title and "Enter!". After Enter our renderer showed a white page. |

### Not rendered (5), nothing said about them

Omega My Little Secret (https://www.omegawatches.com/fr-fr/my-little-secret/, SOTD 5 Jan 2026, timed out twice),
Cartier Find Your Love (https://www.cartier.com/en-us/loveconfigurator.html, SOTD 2 Jan 2026, Access Denied 403 twice),
CHANEL Les 4 Ombres Boutons (https://www.chanel.com/fr/maquillage/4-ombres-boutons/, SOTD 7 Oct 2025, Access Denied 403
twice), Santioni Spirits (https://santionispirits.com/, SOTD 5 Oct 2026, "Your browser is not supported" to our headless
Chromium twice), Vaulk (https://vaulk.com/ and https://www.vaulk.com/, SOTD 31 May 2026, a 404 page on both).

---

## Five moves for Breakout Box

Every number below is the host's own input or a price from their page (£350 to buy, from £60 a month to rent, "Guests
book directly with you. You set the pricing ... Zero revenue share", read off https://www.onefortyninegames.com/breakoutbox
today). Nothing is an average we made up. Their page also says what the box holds and how it plays, and the moves use
exactly that. "two sets of our latest game, which includes six separate puzzles", "boxes, cases and bottle top locks,
which can be filled with a variety of snacks, drinks or surprises", "the first puzzle opens the cool box, and the
remainder can be solved in any order", "60 - 90 minutes for teams of up to six", "Set up takes less than 10 minutes",
"will fit in the boot of a car", an online hints portal, branded note pads, pencils and six reusable cups.

Art direction for all five. The colour comes from the object and the night it's played on, the box's grey plastic, its
black straps with the white BREAKOUT BOX print, the brass of a padlock, lamp light, and the blue grey of a wet window.
Their indigo stays a whisper on the wordmark, never a full section, and never under a photo as a tint. Mona Sans for
everything, wide for the wordmark echo and condensed for big digits, Fragment Mono for every code, timer and price.
Square buttons. Their photos of the box carry every section, with licence checked mood film of a rainy cottage only
where it means something and never captioned as theirs.

1. **The combination is the calculator (what does it earn).** The hero is a padlock with three number wheels, cut from
   a photo of a real lock and set big. The host rolls the wheels to their own numbers, stays a month, the price they'd
   charge per game, and how many groups would book it. Each wheel ticks with a detent. When the third wheel lands the
   shackle springs open with the click their own copy promises ("that 'yes we did it' moment as each lock clicks
   open"), and the answer drops out underneath in condensed Mona Sans, how many games pay back £350, or what's left
   after £60 a month. That one state then fills the order form at the bottom. Measured against The Watch (numerals as
   physical 3D blocks on a dial) and XOX (the loader is already the game board). None of the ten in section A let a
   visitor touch a lock, let alone use one as the price check.

2. **The O opens (the mark as the hero object).** Their wordmark already has the idea, both O's are rings cut through
   the middle. On load the O's are drawn as construction rings with handles, the way Oryzo draws its coaster, then the
   top half of each O lifts like the lid of the box and film of the box being opened plays inside the ring, the way
   Lightship plays its film inside its star. The O's are the window into every section after that. Measured against
   Oryzo (ring drawn before it's shown, a humble object given a flagship launch) and Lightship (film inside the mark).

3. **The box, knolled (how guests use it).** A top down photograph of everything that's in it, the cool box open in
   the middle, the boxes, cases and bottle top locks around it, the two game sets, note pads, pencils, six cups. The
   visitor drags around it like Palmer's table, and each piece carries a small mono tag with the line from their own
   page ("six separate puzzles", "fits in the boot of a car", "less than 10 minutes" to set up). Click a bottle top lock
   and it opens to show the drink inside, because "each puzzle solved unlocks a prop that holds drinks and/or snacks".
   Measured against Palmer (drag to explore top down canvas with pinned name tags) and Cards Against Humanity (the
   product's own pieces are the hero). Needs one top down shoot of a packed box from Owen, nothing else will do.

4. **The 90 minute evening, scrolled (what the guests feel).** One section is the night itself. A Fragment Mono clock
   counts down from 90:00 as you scroll (their own range, 60 to 90 minutes), and the photograph moves from rain on a
   cottage window to lamp light on a table. The first lock opens the lid, exactly as they play it, then the five other
   puzzles open in any order, each one revealing what's inside through a key cut mask (the Cyphr slots, cut to the
   profile of the key), and the bar along the top counts the locks like Haunted Boulder City counts its stops. It ends
   on "No screens, no VR headsets", their line, before the order. Measured against Haunted Boulder City (night
   photography in numbered chapters with a progress bar) and Cyphr (a photo seen through stepped slots), with Unplugged
   as the proof that hosts already sell a locked away, off screen night.

5. **The case file, then the tag (how do I order).** Proof and ordering sit in a stack of file folders, like Mosby's
   Files, one tab each for holiday lets, glamping sites, small hotels and team building. Each folder holds that host's
   numbers from move 1 already filled in, the buy or rent choice, and the 15 minute call. Choosing buy or rent turns a
   key in a two position switch rather than a toggle, and sending the order ends on the box strapped shut with a clipped
   corner luggage tag (the Ledger tag shape) printed with the host's name and their combination. Measured against
   Mosby's Files (folder tabs as navigation) and Another Place (two actions split over one picture), with Ledger for the
   tag shape. Flag for the handover, the site has no host stories today, so the folders hold only the host's own numbers
   and the facts from the page until Owen sends real ones. Nothing is invented to fill them.

The five references to open first, Oryzo, Lightship, Palmer, The Watch and Mosby's Files.
