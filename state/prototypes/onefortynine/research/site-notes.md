# onefortyninegames.com, site notes

Crawled 2026-11-01 with `tools/crawl.py` twice (13 URLs each pass, all HTTP 200, all `en-GB`), every page fetched again
raw with curl and rendered in Chromium at 1440px and iPhone 13 (screenshots in `screenshots/`). Squarespace site
(site id 6a3031ea7e8a856eae91ef7f). `robots.txt` 200.

## The site in one table

| Page | In nav | What it is |
|---|---|---|
| `/` and `/home` | Home | Same page twice. "Introducing" + BREAKOUT BOX wordmark + four lines of pitch + "Tell me more!" + the trade show banner |
| `/breakoutbox` | Breakout Box | Headline, three lines, the line drawing, five accordions holding every fact about the offer |
| `/contact` | Contact | "Stock Breakout Box. Unlock New Sales." and a Squarespace form |
| `/hints` | no | The players' hint portal for The Heist, six puzzles, 25 accordions with hints, walkthroughs and codes |
| `/shop` and six `/shop/p/product-N-...` | no | The unedited Squarespace store template, six "Product Name" items at £25.00, one on sale at £20.00, placeholder images |
| `/cart` | cart icon "0" in header | Empty Squarespace cart |

Header on every page, logo (links `/`), Home `/`, Breakout Box `/breakoutbox`, Contact `/contact`, LinkedIn icon
`https://www.linkedin.com/company/onefortynine-games`, cart `/cart`. Footer on every page, verbatim,

```text
OneFortyNine Games Ltd
Registered Office: 149 High Street, Swindon, SN4 7AB
Company Registration No: 17293756 - Registered in England and Wales
VAT Registration No: GB
Made with Squarespace
```

The footer's "VAT Registration No: GB" has no number after GB. Footer links are the LinkedIn icon and "Squarespace"
(`https://squarespace.com`). Favicon is the Squarespace default grey cube.

## The finding that matters most for the build, the offer is invisible

On `/breakoutbox` every fact about the offer (what's in the box, how it works, what the host gets, the £350 and £60 a
month prices, and the two order and call links) sits inside five accordions. When a visitor opens one, the panel
expands and shows nothing, because the answer text is navy on a navy background.

How it was established, three different ways, 2026-11-01.

1. Computed style. In every one of the five panels, desktop and phone, the paragraphs and links compute to
   `color rgb(9, 0, 74)`, opacity 1, visible, displayed, with real height. The section background is `rgb(9, 0, 74)`.
   The panel titles, same method same minute, compute to white, which is the control.
2. Pixels. Screenshot of the open "How much does it cost?" panel, 658x319, has 0 of 209,902 pixels that differ from
   #09004a by more than 6. Same panel with `color #fff` injected as a positive control has 19,920 differing pixels and
   reads cleanly (`screenshots/proof-breakoutbox-cost-panel-open-as-rendered.png` against
   `screenshots/proof-breakoutbox-cost-panel-control-white-text-injected.png`, and the phone
   `screenshots/proof-breakoutbox-whats-in-the-box-open-phone.png`).
3. The CSS source, via Chromium DevTools protocol. The answer text inherits `.sqsrte-small { color: var(--paragraphSmallColor) }`
   and in that section's theme (`data-section-theme="white"`, with a navy background set) `--paragraphSmallColor`
   resolves to the navy. The +/- icon is navy too (`--tweak-accordion-block-icon-color`), so there is no visible icon
   either.

Second control, the `/hints` page uses the same accordion block in a white section and is readable (navy on white,
`screenshots/proof-hints-hint1-open-phone-readable.png`). So the fault is this one section's colour setting, not
the block and not our renderer.

Consequence for the host page we're building. A host who lands on Breakout Box today can read the headline and the
three lines and nothing else. They never see a price or the order link. The routes left to them are the /contact form
("Stock Breakout Box. Unlock New Sales.") and the "click here" mailto inside an invisible panel. Do not put this in an outward message without Raka, and if
it is used, it needs a screenshot, never a description.

Other small things seen, none of them an angle on their own.

- Page titles are Squarespace AI SEO leftovers, "About | Experience Team-Building Fun — Join Now — Landing Page",
  "Hints | Enhance Security Skills — Try Now — Landing Page", "Shop | Discover Deals – Shop Now — Landing Page".
- The Breakout Box meta description still says "the upcoming Breakout Box escape adventure" after first orders shipped.
- The home page's only outbound link is the trade show banner image, and its href carries Google Ads tracking (utm_source=google, gclid=...), copied from an ad click.
- The site never names the game. The only "heist" on it is lowercase in the /hints EMP walkthrough, "the optimal EMP for the heist". "The Heist" as a title is on LinkedIn and on the printed card.
- The real Breakout Box logo (the 149 lock) is not on the site. The contact page's AI image shows it with "888".
- The /hints page gives every solution code on one public page with no gate, which is how they chose to do hints.

## Home, `/` (and `/home`, identical text)

- URL https://www.onefortyninegames.com/
- HTTP 200, rendered in Chromium 2026-11-01 with 0 failed requests and 0 responses of 400 or more
- `<title>` Landing Page | Breakout Box, a portable guest experience
- meta description "Explore escape room puzzles and locked cool boxes. Crack the codes and unlock fun with Breakout Box. Contact us for more details."

### Visible text, verbatim (main content, from the served HTML, accordion answers included)

```text
Introducing
Think escape room meets unboxing.
A locked cool box. Real puzzles. Real stakes - because the snacks, drinks and treats inside only open when you crack the codes.
No screens, no VR headsets. Just face-to-face teamwork, tension, and that "yes we did it" moment as each lock clicks open.
Breakout Box is modular, replayable and built for maximum payoff with minimum setup. The game does the work. The reaction does the marketing.
Tell me more!
```

### Every link on the page, from the raw HTML

| Link text | href |
|---|---|
| 0 | `/cart` |
| Skip to Content | `#page` |
| (no text, icon or image) | `/` |
| Home | `/` |
| Breakout Box | `/breakoutbox` |
| Contact | `/contact` |
| (no text, icon or image) | `https://www.linkedin.com/company/onefortynine-games` |
| Tell me more! | `/breakoutbox` |
| (no text, icon or image) | `https://www.lltshow.com/join-us?utm_source=google&utm_medium=PPC&utm_campaign=LLT&ppc_keyword=land%20leisure%20show&gad_source=1&gad_campaignid=24048760931&gbraid=0AAAAAo5T7X4eQN4nb76MzcPsFNK93oEKr&gclid=Cj0KCQjwuJLWBhD_ARIsAIBcRUzDT2me-QPbqRjP323mx6OuZXSzIc4W6kUyxsRU_99MD-bUJDZDUeAaAjVFEALw_wcB` |
| Squarespace | `https://squarespace.com` |

### Notes

Rendered layout (desktop), navy header, then one full bleed section with home-hero-firefly-box-window.png under a 0.77 navy overlay, "Introducing" in white Cooper Black, the white BREAKOUT BOX strap wordmark image, four centred paragraphs, a white pill button "Tell me more!" (links `/breakoutbox`), then the 650x150 trade show banner image linking to lltshow.com. `/home` returns the same content (same text, same images) under its own URL. Mobile is the same stack, single column.

## Breakout Box, `/breakoutbox`

- URL https://www.onefortyninegames.com/breakoutbox
- HTTP 200, rendered in Chromium 2026-11-01 with 0 failed requests and 0 responses of 400 or more
- `<title>` About | Experience Team-Building Fun — Join Now — Landing Page
- meta description "Discover OneFortyNine Games' innovative group experiences, including the upcoming Breakout Box escape adventure. Perfect for team building and fun without screens."

### Visible text, verbatim (main content, from the served HTML, accordion answers included)

```text
A portable escape room experience. in a cool box.
Each puzzle solved unlocks a prop that holds drinks and/or snacks, bringing a new twist to guest experiences.
Hire it out to your guests; keep 100% of the revenue.
Or, Integrate it into your existing offering, adding value and talking points.
What's in the box?
Each lockable cool box comes with two sets of our latest game, which includes six separate puzzles.
Inside the cool box, you will find boxes, cases and bottle top locks, which can be filled with a variety of snacks, drinks or surprises.
The game is linked to our easy to use online portal, which gives players hints and tips if they get stuck.
Every order includes a supply of branded note pads, pencils and six re-usable branded cups to get you started, with more supplies available to order.
How does it work for our business?
Breakout Box can be used in a wide range of settings, from hospitality and events, to training and team building.
The box is portable, easy to store and will fit in the boot of a car. Set up takes less than 10 minutes for each use and the session requires no staff involvement, just set it up and let them play!
Play is flexible, the first puzzle opens the cool box, and the remainder can be solved in any order, one at a time or simultaneously, creating opportunities for team building, timed games, or competition!
We recommend up 60 - 90 minutes for teams of up to six working together.
The rest is up to you!
What do we get?
We provide product and marketing support, additional supplies and new game releases
We provide a 30 minute online training session.
Guests book directly with you.
You set the pricing and the contents for the boxes.
Zero revenue share.
How much does it cost?
Breakout box is available to purchase from £350 per box - you own the box outright, and there is no ongoing cost or subscription.
You may wish to purchase additional games, and supplies which are available on demand.
Flexible rental options to suit your business needs are also available from £60 per month.
How do we sign up?
Please use the link to book a 15 minute call to talk about how Breakout Box can generate revenue or add value to your business.
If you want to go ahead and get your order started click here.
```

### Every link on the page, from the raw HTML

| Link text | href |
|---|---|
| 0 | `/cart` |
| Skip to Content | `#page` |
| (no text, icon or image) | `/` |
| Home | `/` |
| Breakout Box | `/breakoutbox` |
| Contact | `/contact` |
| (no text, icon or image) | `https://www.linkedin.com/company/onefortynine-games` |
| book a 15 minute call | `mailto:owen@onefortyninegames.com?subject=I'd%20like%20a%2015%20minute%20call%20to%20discuss%20how%20Breakout%20Box%20can%20work%20for%20my%20business` |
| click here | `mailto:owen@onefortyninegames.com?subject=I'd%20like%20to%20order%20Breakout%20Box` |
| Squarespace | `https://squarespace.com` |

### Notes

Rendered layout, navy throughout. BREAKOUT BOX wordmark image top left. The heading renders as "A Portable Escape Room Experience.      In A Cool Box." in red (#ff0000) Cooper Black, because the H2 has text-transform capitalize and a `<strong>` in red. Three white paragraphs, bold on "keep 100% of the revenue" and "adding value and talking points". Then two columns, left the ChatGPT line drawing of the box, right five accordion titles right aligned in white, "What's in the box?", "How does it work for our business?", "What do we get?", "How much does it cost?", "How do we sign up?". Only one opens at a time. Their answers are the text above after each title, and every answer is invisible when opened, see the finding at the top. The two action links are both mailtos, there is no calendar and no checkout.

## Contact, `/contact`

- URL https://www.onefortyninegames.com/contact
- HTTP 200, rendered in Chromium 2026-11-01 with 0 failed requests and 0 responses of 400 or more
- `<title>` Contact | Get in Touch Today — Landing Page
- meta description "Reach out to us to explore how Breakout Box can help unlock new sales opportunities for your business. Drop your info for a quick consultation."

### Visible text, verbatim (main content, from the served HTML, accordion answers included)

```text
Stock Breakout Box.
Unlock New Sales.
Drop your information below and we’ll contact you to discuss how Breakout Box can unlock value for your business
```

### Every link on the page, from the raw HTML

| Link text | href |
|---|---|
| 0 | `/cart` |
| Skip to Content | `#page` |
| (no text, icon or image) | `/` |
| Home | `/` |
| Breakout Box | `/breakoutbox` |
| Contact | `/contact` |
| (no text, icon or image) | `https://www.linkedin.com/company/onefortynine-games` |
| Squarespace | `https://squarespace.com` |

### Notes

Rendered layout, full bleed contact-firefly-remove-compass.png under a 0.75 navy overlay, red Cooper Black heading in two H1s "Stock Breakout Box." and "Unlock New Sales.", one white line, then the Squarespace form. Fields in order, from the rendered DOM, Name (First Name, required; Last Name, required), Email (required), Company Name, Subject (required), Message (required), plus a seventh input named `message-yui_...-field` that does not show in the screenshot (the Squarespace spam trap). White pill "Submit" button. Invisible reCAPTCHA Enterprise loaded. The form was not submitted. No email address or phone number is printed on the page.

## Hints, `/hints` (not in the nav)

- URL https://www.onefortyninegames.com/hints
- HTTP 200, rendered in Chromium 2026-11-01 with 0 failed requests and 0 responses of 400 or more
- `<title>` Hints | Enhance Security Skills — Try Now — Landing Page
- meta description "Explore puzzle solutions including entry points, laser maze, encrypted messages, guard routes, and EMP timings to enhance security understanding. Solve now."

### Visible text, verbatim (main content, from the served HTML, accordion answers included)

```text
Hints
Puzzle 1 - Entry Point
Hint 1:
Looks like we have to figure out which entry point has the lowest difficulty. Can you use the
information provided to figure it out?
Hint 2:
There is some information you can deduce; like the “Main Entrance” EXIT value because you
know the difficulty level, or the missing “Basement” values because they have to be the same!
Walkthrough:
The "Roof" is already completely filled out for you: 10 x 1 x 10 = 100. This difficulty is too high, and also creates a 4 digit code which won't help us.
The "Main Entrance" is missing the EXIT value. But because you know the difficulty level you can reverse engineer it. 8 x 3 = 24, and 24 goes into 96, 4 times.
The "Basement" requires a little more work. We know the difficulty is in the 70s, and that the ENTRY and EXIT values are the same. If you consider 5 as a potential value, then 5 x 3 x 5 = 75. This is the only way to satisfy all conditions.
Finally, the "Scaffolding" has no known values except it also has a difficulty rating in the 70s, so we are going to need to draw on other sources to deduce it. First, we know "getting out will be the same as exiting via the main entrance" which we now know is 4. From the rest of the surveillance report, we have two other pieces of important information: the entry value will be lowest here (and given the lowest known value is 3, the ENTRY value for "Scaffolding" will be either 1 or 2) and the GUARD value will be highest here (and given the known highest guard value is 8, the GUARD value for "Scaffolding" will be either 9 or 10). This leaves you with only a few possible permutations, but only one variation that gives you a number in the 70s. 2 x 9 x 4 = 72. This satisfies all criteria and provides us with a 3 digit code!
Solution:
294
Puzzle 2 - Laser Maze
Hint 1:
I wonder if the coloured lasers make any shapes that might be useful?
Hint 2:
Maybe if we try figuring out the lasers that only have one node first to narrow down the variables.
Walkthrough:
Each point on the wall has a laser node that shoots out 1 to 3 coloured lasers. From the text, we have to shut down the blue lasers first, then green, and finally purple.
For example, the top left corner only has a blue node, therefore the laser emitting from it must be blue. Follow it across the room to the point that has two blue and a red node. From that point, we now only have to figure out the colours of the two other lasers (blue and red), and if we follow those lasers across the room to other nodes we can see what colours the nodes are. Isolate each colour to make a shape that reveals a number.
Solution:
678
Puzzle 3 - Encrypted Message
Hint 1:
An encrypted message! We are going to need to figure out the cipher to turn it into normal words!
Hint 2:
Looks like every letter has been replaced with a letter the same number of places down the alphabet!
Hint 3:
The last paragraph tells you to look closely at each line. I wonder if there is something hidden
amongst the words?
Walkthrough:
This puzzle has two phases. The first is deciphering the words themselves. In this case, every letter is replaced with a letter 4 spaces down the alphabet. We can identify this by looking at the solo letters, which are always "A" or "I", but here we see solo letters as "E" (which is 4 letters down the alphabet from A) and "M" (which is 4 letters down the alphabet from I). Now that you have cracked the code, it is simply a case of applying that logic to the rest of the message.
The second phase is the message itself. Once decoded, it will read as follows:
ATTENTION ALL STAFF. A NEW CODE IS READY.
"MOST OF OUR TEAM ARE HAPPY
BUT SOME WEIGH THEIR OPTIONS
SO NEW BLOOD IS NEEDED!"
LIKE ALL CODES, LOOK CLOSELY AT EACH LINE AND A CODE CAN BE SEEN. DO NOT SHARE OR I WILL BE CROSS!
There is no obvious code, but if you look closely at the lines of text in the paragraph in quotations, you might notice numbers split across words.
MOST OF OUR TEAM ARE HAPPY
BUT SOME WEIGH THEIR OPTIONS
SO NEW BLOOD IS NEEDED
Solution:
481
Puzzle 4 - Guard Patrol Route
Hint 1:
We need to figure out the guard routes based on the intel report.
Hint 2:
Looks like we have enough info to trace each guard route. I wonder if they reveal a code?
Walkthrough:
By understanding guard movements, we can trace their routes start to finish. Place your finger on the "On Load Exhibit" room. We know this guard wanders to the "Pottery" room while avoiding most cameras. Heading through "Gallery B" and then around "Gallery C" will get them there and only seen by one camera. If you trace that, it will look like a 6! Follow the routes of the other guards to trace the numbers 5 and then 3 for your code.
Solution:
356
Puzzle 5 - EMP Charge
Hint 1:
Each model of EMP will disable all electronic devices for a cumulative (total) time. Whichever model gives us the longest cumulative time in seconds is the one to pick!
Hint 2:
On one side we can see how many of each electrical item is present on the floor. Multiply that by the time they will be down. Example: Model A knocks out cameras for 20 seconds. With 9 cameras, that means a cumulative time of 180 seconds! Don't forget that each model has a quirk that needs to be accounted for!
Walkthrough:
Model A equals 750, reduced by 10%, for a time of 672.
Model B equals 1384, then reduced by half, for a time of 692.
Model C, when reducing the time of everything by 8 seconds, ends up with a time of 689.
Model D equals 664, plus 30 seconds for the total number of cameras, for a time of 694.
Model E equals 1056 seconds, but by exceeding 1000 it won't disable the vault, so it won't be considered.
By the end, we know Model D is the optimal EMP for the heist.
Solution:
694
Puzzle 6 - The Vault
Hint 1:
Looks like we have to turn the dial in each direction according to the notes...
Hint 2:
Six post-it notes... a 6 digit code...
Walkthrough:
Each post-it note has two items on it that belong on the same scale of reference. Make sure to count the starting reference point!
Monday to Saturday (Days of the Week) = Monday, Tuesday, Wednesday, Thursday, Friday, Saturday = 6 spaces. Starting from 12 and moving clockwise, you land on 6.
W to Z (Letters of the alphabet) = W, X, Y, Z = 4. Moving anti-clockwise from 6, you land on 2.
Ray to La (Notes on a musical scale) = Ray, Me, Fah, So, La = 5. Moving clockwise from 2, you land on 7.
16 to 02 (hours on a 24 hour clock) = 16, 17, 18, 19, 20, 21, 22, 23, 00, 01, 02 = 11. Moving anticlockwise from 7, you land on 8.
Four to Queen (ranks of playing cards) = 4, 5, 6, 7, 8, 9, 10, Jack, Queen = 9. Moving clockwise from 8, you land on 5.
November to June (Months of the Year) = Nov, Dec, Jan, Feb, Mar, Apr, May, June = 8. Moving anticlockwise from 5, you land on 9.
Solution:
627859
```

### Every link on the page, from the raw HTML

| Link text | href |
|---|---|
| 0 | `/cart` |
| Skip to Content | `#page` |
| (no text, icon or image) | `/` |
| Home | `/` |
| Breakout Box | `/breakoutbox` |
| Contact | `/contact` |
| (no text, icon or image) | `https://www.linkedin.com/company/onefortynine-games` |
| Squarespace | `https://squarespace.com` |

### Notes

This is the players' "online portal" the Breakout Box page mentions. Red banner with "Hints" in navy Cooper Black, then white sections, one per puzzle, each with accordions, Hint 1, Hint 2 (Hint 3 on puzzle 3), Walkthrough, Solution. Text is navy on white and readable when opened (checked on phone). The puzzle names give the game's heist story, getting into a building (roof, main entrance, basement, scaffolding), a laser maze, an encrypted staff memo, guard patrol routes through galleries ("On Load Exhibit", "Pottery", "Gallery B", "Gallery C"), choosing an EMP model, and a six digit vault dial. The six solution codes are on the page (294, 678, 481, 356, 694, 627859).

## Shop, `/shop`, six product pages and `/cart`

All HTTP 200. `/shop` is the Squarespace store template left as installed, not linked from the nav. Visible text,
verbatim,

```text
Shop
Clear
Filters
Close
Filter
Clear
Filter
Product Name
£25.00
Product Name
£25.00
Product Name
£25.00
Product Name
Sale Price:
£20.00
Original Price:
£25.00
Sale
Product Name
£25.00
Product Name
£25.00
No results found
No results match your search. Try removing a few filters.
```

Five of the six product pages read exactly this, verbatim (checked one by one). The sixth, `/shop/p/product-5-f98ry-4ll53-cageg-a9tny`, differs only in showing "Sale Price: £20.00 Original Price: £25.00" in place of "£25.00".

```text
Shop
›
Product Name
Image 1 of 1
Product Name
£25.00
Showcase what this product is about. What’s it made of? How was it made? What are ways to enjoy it?
Add To Cart
Added!
Showcase what this product is about. What’s it made of? How was it made? What are ways to enjoy it?
```

The six images are the template's AI looking wooden shapes on black cubes (see media.json). `/cart` is the empty
Squarespace cart. Nothing here is Breakout Box. Ignore for the build.

## Sitemap, verbatim list of `<loc>`

`/home`, `/breakoutbox`, `/contact`, `/hints`, `/shop`, `/shop/p/product-3-szb2y-gzh2r-tzhkx-7njbz`,
`/shop/p/product-5-f98ry-4ll53-cageg-a9tny`, `/shop/p/product-6-yrdld-pcpw6-we3sw-y7anc`,
`/shop/p/product-4-9e76d-pr6ls-ddx8r-mygzw`, `/shop/p/product-2-5c6mb-j8mng-zsl73-5k96m`,
`/shop/p/product-1-ydar7-e8mlb-2h3mp-mjns9`. Last modified dates, `/home` 2026-07-16, `/breakoutbox` 2026-10-06,
`/contact` 2026-09-29, `/hints` 2026-10-13, `/shop` 2026-09-29.

## What is NOT on the site anywhere (each checked against the full raw HTML of all 13 URLs)

- Any testimonial, review, quote or named customer. None. LinkedIn mentions "a national holiday park" and "a large
  Leadership Training organisation", both unnamed.
- What the host charges a guest, or any earnings example.
- Delivery cost, area, lead time. Rental minimum term. VAT treatment of £350.
- Ages. Player count beyond "teams of up to six". Allergy or alcohol guidance for what goes in the boxes.
- The game's name (only a lowercase "heist" in one /hints walkthrough), its premise written out (the /hints walkthroughs imply it), or any photo of the real product. Every product image on the site is AI made or AI edited.
- Any video. No Squarespace video block, no YouTube or Vimeo embed, no `<video>` (checked in the rendered DOM and by
  grepping the raw HTML for youtube, youtu.be, vimeo, mp4, webm, m3u8, og:video).
- Any social link other than LinkedIn.
