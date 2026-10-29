# Checks

`check.js` runs the checks from section 18 of the brief against this folder. Every check runs clean, then again with a
planted fault it has to catch. There are 14 results, the walk, the hero share and the look at 390 and at 1440, then the
sums, the menu, the copy, overflow, errors, axe, reduced motion and no JavaScript, and the order and the booking. The
plants are a hidden order bar, their pictures hidden, a pill button with an arrow and kickers, five wrong prices, a menu
row removed, an em dash and banned words, a wide element, a broken image, an image with no alt, the sauces hidden
without JavaScript and the time slots emptied. A check passes only when it's clean and its plant is caught.

It serves the folder itself and drives the installed Chrome through Playwright, so it needs a folder holding
`playwright-core` and `axe-core`:

```
cd qa
QA_MODULES=/path/to/node_modules node check.js
node check.js --only=sums,copy
```

The last output is in `last-run.txt`.

The sums check prices every order from `menu.json` on its own, without the page's code, and compares the sticky bar,
the ticket, the step total and the order summary with it to the penny.
