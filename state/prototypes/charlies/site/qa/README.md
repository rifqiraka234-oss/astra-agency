# Checks

`check.js` runs the checks against this folder, on all four pages (Home, `/menu/`, `/birthdays/`, `/find-us/`). Every
check runs clean, then again with a planted fault it has to catch. A check passes only when it's clean and its plant is
caught. There are 33 results.

- **The walk, the hero share and the look**, each on every page at 390 and at 1440 (24 results). The walk needs an order
  action a tap can reach at every half screen that isn't the header, and on Birthdays its Book too. The hero share is
  measured from the screen itself, and on Home the dive has to land on the builder. The look checks fonts, italics,
  kickers, pills, arrows, shadow cards, count ups, one button style and ten sections at most.
- **The sums.** Random orders made on Home's builder, carried to `/menu/` where menu items go on, and back to Home. At
  every stop the header, the bar, the step total, the stage's ticket, the drawer's cart, the golden ticket and the
  order's own state must match the price worked out from `menu.json` on its own, to the penny.
- **The menu**, every item in `menu.json` as text with its price on `/menu/`, and every sauce, topping, scoop and size on
  the builder.
- **The copy**, on all four pages and the 404, with the drawer and the booking gone through so every message shows.
- **Overflow** at eight widths and a resize, **errors** on a cold load, **axe** at three scroll points with the drawer and
  the phone's panel open, **reduced motion and no JavaScript**, on every page.
- **The order and the booking across pages**, an order on Home and one on Find us (with its shop already picked), Book
  carrying its shop to Birthdays, a booking that's still confirmed after another page, and every chair round the table.
- **Kept across pages**, the order from Home to `/menu/` and back, a tampered stored order coming back at menu prices,
  and every page working with storage blocked.

The plants are the bar and every Order outside the header hidden, their pictures hidden and the hero kept from fading, a
pill button with an arrow and kickers, six wrong prices in the data the page reads, a menu row removed, an em dash and
banned words on the menu page, a wide element, a broken image, an image with no alt and an empty button, the sauces
hidden without JavaScript, the time slots emptied with the chairs pulled to the middle, and storage that silently
forgets.

It serves the folder itself and drives the installed Chrome through Playwright, so it needs a folder holding
`playwright-core`, `axe-core` and `sharp`:

```
cd qa
QA_MODULES=/path/to/node_modules node check.js
node check.js --only=sums,copy
```

The last full output is in `last-run.txt`, a run with `--only` goes to `last-partial-run.txt`.
