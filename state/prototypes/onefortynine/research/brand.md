# OneFortyNine Games and Breakout Box, brand notes

Everything here was read off their own files on 2026-11-01, the logo images in `media/`, computed styles in Chromium
on `/`, `/breakoutbox` and `/contact`, and the Squarespace theme variables on `:root` and `body`.

## Two brands, one company

- **OneFortyNine Games** is the company (Companies House ONEFORTYNINE GAMES LTD, 17293756). Its logo is in the
  header and footer of every page.
- **Breakout Box** is the product, and the product has the stronger identity. The lock drawn inside the Breakout Box logo
  reads 149, the company's name. The registered office is 149 High Street, Swindon.

## The logos

**OneFortyNine Games** (`media/logo-onefortynine-FORTY3.png`, 2000x2000 PNG, no SVG anywhere). A solid navy square
`#09004a`. Three stacked words "ONE", "FORTY", "NINE" in a heavy, wide geometric sans, all caps, light grey
`#d9d9d9`. FORTY is indented to the right of ONE and NINE, so the block steps. Under it "GAMES" in orange `#ff914d`, a
thin monospaced slab serif (typewriter feel), very widely letter spaced and indented. Pixel census of the file, navy
3.13M px, grey 0.82M px, orange 20k px, nothing else but anti aliasing. On LinkedIn the same mark sits on slate blue
`#2b3b5c` (`media/li-2026-07-25-owen-repost-1.jpg`, `media/li-company-logo.jpg`), an older colourway.

**Breakout Box, the strap wordmark** (`media/luggage-strap-artwork.png`, white on transparent, 1788x156). "BREAKOUT BOX"
on one line in a bold geometric sans, all caps. Both O letters are rings broken at the top and bottom, which reads
like an open shackle. It is printed white on the black strap that goes round the real box.

**Breakout Box, the full logo** (`media/li-2026-08-11-we-built-a-box.jpg`, black on white, 1200x1200, from LinkedIn,
NOT on the website). "BREAKOUT" in the strap wordmark on top. Under it a bigger outlined "BOX". The B is a maze, the O
is a rounded square holding a three wheel combination lock that reads **1 4 9**, the X is a maze of parallel strokes.
This is the mark on the real product. It reads 149 clearly on the frosted cups, the clear lock box decal and the lid
label in the LinkedIn photos, and appears smaller (digits too small to read) on the notepads and The Heist card. A related monogram, a single maze "B", is printed white on the black
bottle top locks.

**Do not use** the variant in `media/contact-firefly-remove-compass.png`, where the AI image redraws the lock as
"888". The real one is 149.

## Colour, from their Squarespace theme variables

| Role in their theme | Value | Hex | Where it shows |
|---|---|---|---|
| `--accent-hsl`, `--black-hsl`, `--safeDarkAccent-hsl` | 247.3,100%,14.51% | `#09004a` | Every section background, header, footer, photo overlays (0.77 on home, 0.75 on contact), the logo square, body text on white sections |
| `--white-hsl` | 0,0%,100% | `#ffffff` | Body text on navy, nav links, button fill |
| `--lightAccent-hsl`, `--siteBackgroundColor` | 0,100%,50% | `#ff0000` | Pure red. The Cooper Black headlines on /breakoutbox and /contact, the /hints banner |
| `--darkAccent-hsl` | 23,100%,65% | `#ff914d` | Orange. Only seen in the logo's "GAMES" |
| (logo only, not a theme variable) | | `#d9d9d9` | Logo letters |

So the live palette is navy, white and pure red, with the orange only in the logo. The real product is grey, black,
brushed aluminium, frosted plastic and a slate navy blue lid (LinkedIn photos), which sits close to the navy.

## Type, from computed styles

| Use | Family (as declared) | Seen at |
|---|---|---|
| Headings, site title | `cooper-black-std` (Adobe Fonts, loaded in 400 normal and 400 italic), letter spacing -0.01em, line height 1.8em, `text-transform capitalize` | H2 55.8px desktop, H1s on /contact 49.8px and 55.3px |
| Body, nav, buttons, forms, accordion titles | `"Helvetica Neue", Arial, sans-serif` 400, line height 1.5em | 23px on desktop |
| Meta, header button, tertiary button | `Bitter` (loaded) | Only on the off screen "Skip to Content" link (x -23000) on every page and the template prices on /shop, so never seen on a brand page (census of every visible text element on /, /breakoutbox, /contact, /hints, /shop) |

The capitalize transform is why "A portable escape room experience. in a cool box." renders as "A Portable Escape
Room Experience. In A Cool Box." Cooper Black is chunky, rounded, 1970s. The red lines on the LinkedIn cover look like the same face.

## Shapes and components

- Buttons, white fill, navy text, `border-radius 300px` (a full pill), padding 0 46px ("Tell me more!") and 27.6px 46px
  ("Submit"). Note for our build, pill buttons are on the banned list in `docs/RULES.md` section 5, so ours can't copy them.
- Form inputs, light translucent fill, `border-radius 10px`.
- Accordions, thin white rules between items, titles right aligned.
- Photos sit full bleed under a heavy navy overlay, so they read purple and dim.
- The white line drawing of the box with a glow (`media/breakoutbox-chatgpt-image.png`) is their recurring illustration,
  on the site and on the LinkedIn cover.

## Voice, exact lines that carry it

Every line below was checked as an exact match on the page named, 2026-11-01.

1. "Think escape room meets unboxing." (onefortyninegames.com/ (home))
2. "A locked cool box. Real puzzles. Real stakes - because the snacks, drinks and treats inside only open when you crack the codes." (onefortyninegames.com/ (home))
3. "No screens, no VR headsets. Just face-to-face teamwork, tension, and that "yes we did it" moment as each lock clicks open." (onefortyninegames.com/ (home))
4. "The game does the work. The reaction does the marketing." (onefortyninegames.com/ (home))
5. "Hire it out to your guests; keep 100% of the revenue." (onefortyninegames.com/breakoutbox)
6. "Stock Breakout Box. Unlock New Sales." (onefortyninegames.com/contact (the two H1s))
7. "DO NOT SHARE OR I WILL BE CROSS!" (onefortyninegames.com/hints, puzzle 3 walkthrough (the decoded staff memo))
8. "Everyone's building AI. We built a box!" (linkedin.com/company/onefortynine-games, post 2026-08-11)
9. "Doom-scrolling off. People on." (linkedin.com/company/onefortynine-games, post 2026-08-11)
10. "Escape room puzzles + locked cool boxes. Crack the code. Unlock the fun. Breakout Box." (linkedin.com/company/onefortynine-games, page tagline)
11. "Imagine the joy of cracking the code and then being able to open a bottle of wine or gourmet snacks with it." (linkedin.com/company/onefortynine-games, post 2026-06-28)
12. "It happens across the table, solving puzzles, opening locks." (linkedin.com/company/onefortynine-games, post 2026-08-11)

How it sounds. Short fragments in runs ("A locked cool box. Real puzzles. Real stakes"), set ups with a turn ("The game
does the work. The reaction does the marketing."), lock and code wordplay everywhere (crack, unlock, codes, Breakout),
an anti screen stance (no VR, no AI, no doom scrolling, people across a table), and a hospitality operator's money
talk on the business pages ("keep 100% of the revenue", "Unlock New Sales", "YOU control the margins"). British
spelling ("organise", "coloured"). Exclamation marks are used freely ("Tell me more!", "let them play!"). The game
writing inside /hints is playful and in character ("DO NOT SHARE OR I WILL BE CROSS!"). A few slips are on the live
pages and stay out of our copy, "recommend up 60 - 90 minutes" (/breakoutbox) and "treates" (LinkedIn About).
