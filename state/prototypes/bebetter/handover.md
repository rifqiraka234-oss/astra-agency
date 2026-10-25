# BeBetter, handover (25 Oct 2026)

Laurens van Dorp said yes on 25 Oct 15:25 UTC to our 24 Oct opener, "Sure please do, could you also send a price point".
The opener promised "a more professional BeBetter site that sells the line and has its own page where gyms design and
order their custom kit". Both are built, with Astra's growth plan beside them.

- Site, https://astra-bebetter-prototype.netlify.app/ (Netlify project 8a53e807-0715-4101-8c01-17641ae5b06b)
- The custom kit page, https://astra-bebetter-prototype.netlify.app/gyms/
- Growth plan, https://astra-bebetter-plan.netlify.app/ (Netlify project 0fe48a05-6a46-4f96-8ed1-e74f75cfb675)
- Team login switched off on both before the first deploy. Forms on for the site.
- Delivery drafts, state/drafted_2026-10-25-laurens-delivery.md (Option B, passes the gate) and
  state/drafted_2026-10-25-laurens-delivery-option-a.md (Option A, names €2,500, fails the money gate by design).
  NOT SENT.

## What it is

The Saavedra v3 recipe (RULES section 5). The four lines and the flow table came first (research/four-lines.md,
research/flow.md), then the art direction (research/art-direction.md), and the 53 site teardown ran alongside
(research/teardown/TEARDOWN.md).

- **For gyms, one kit carried down the page.** The hero is the first input, the gym's name typed onto the back of a
  washed oversized tee drawn from the grammar of their own kits (Team Siem, American Gym Antwerp, Human Sports), pulled
  across the shoulders by a squeegee sweep. Then their first gym story as a rail that empties while a clock runs four
  hours, in their words. Then their kits on a rail you drag. Then the studio (pieces, garment colour, lettering, print
  colour, crest, our teddy or their own logo, motto, city, year, front and back). Then the size run as bars you drag,
  with a rail filling with hangers. Then the work order that fills itself, the FAQ, and the form with everything in it
  and the logo attached. Sending stamps the sheet RECEIVED and drops it into a black BeBetter bag. A bar at the bottom
  carries the kit after the first screen and leaves before the form.
- **Home.** Their teddy in the empty EVLS hall, the drop of 27.10 counting days (it turns into a shop button on the
  day, it never shows an hour they didn't give), the line, the teddy wall, the road as the back of a tour tee
  (Köln, Breda, Praha, next), a door for gyms that prints the name and hands it to /gyms/, and their creed as a curve
  you drag, 1.01 to the power of the days.
- **The plan.** Six steps with a tracker, sources under each. The proof, the gap (CBS, 2,310 gyms, 8% with a clothing
  shop, a dot wall you fill), the others (print shops, makers, YOKKAO), the page, the fair (Sport Ondernemers Expo
  4 Nov, a slider for their own weeks to delivery against the January rush), the 90 days and a pieces calculator.
- English first, Dutch switch on the site. The plan is English, Astra's voice.

## [CONFIRM] before anything goes live for real

1. **Which inbox gets kit requests.** BeBettergrowth@gmail.com is the address on their own Trustpilot listing. On the
   prototype the form posts to Astra's Netlify, so a real request would reach us, not them.
2. **Gym names and kits on a public site.** Team Siem, American Gym Antwerp and Human Sports are shown as their work,
   the way their 29 Jun LinkedIn post shows them. Ask the gyms before launch.
3. **Bookaleap is left out on purpose.** The teddy on that kit wears a sneaker with a Nike swoosh. A third party mark,
   so it isn't shown. Worth telling them about for their own sake too.
4. **Their new collection's photos.** The shop is behind a password until 27 Oct, so the line is shown through their
   stand photos and the product names from the FIBO article (fragfitty.de, 20.04.2026, reopened 25 Oct).
5. **The teddy as a vector.** The site uses the 437 px PNG from their password page, cut out. A vector would print and
   scale properly.
6. **From price, minimum and usual time.** The FAQ answers say "put it in the request". Their real numbers belong
   there.
7. **The four steps** (you send it, we design it, you say what to change, we make it and deliver it) and "nothing is
   made until you're happy with it". Built from their "We presented a custom design" post, to be confirmed.
8. **"The youngest ever to stand there with our own brand"** is their own claim (LinkedIn, 15 Apr and 23 Apr). FIBO
   doesn't confirm it anywhere we found.
9. **Address.** Only KVK 96287071 and Poortugaal are shown. The registered address looks like a home address, so it
   stays off the prototype. A live shop needs it.
10. **Privacy page** is a template with two lines to fill in (retention, form provider and host).
11. **"Two 21 year olds from Rotterdam"**, from "As 21-year-olds" (9 Oct post) and "drove from Rotterdam". They're
    registered in Poortugaal. No founding year anywhere, LinkedIn says 2024 and KVK says 20 Jan 2025.
12. **Film.** One licence checked loop, Mixkit 4596 "Man bandaging his hand before boxing" (Mixkit Free licence, read
    twice, no face, every frame checked for marks), plays inside the huge 1% on the home page. Never captioned, never
    presented as theirs. Their own footage from the stands would be better.

## Photos

All theirs, from their LinkedIn posts and their shop's password page, listed with source and crop in build/data/photos.json.
- p-bag, the top 13% cropped off, a BOSS logo on a shirt.
- p-builder, the right side cropped off, Monster and AmpLife crates.
- Not used, photo 19 (a photographer's watermark), photo 28 (gym sponsor banners), 02 (a sign with a swear word), the
  KiKa and triathlon photos (personal), 16 and 25 (two people who may be the founders, nobody is named or implied).
- No photo is captioned as a customer, member, founder or staff.

## Budget sign (docs/gtm-plan.md, the check before a build)

Raka asked for the build by name. The signs are good anyway. €10.000+ in four days at FIBO (their post), stands at FIBO,
SIGGI'S and the EVLS show, and a stand at the Sport Ondernemers Expo, where stands start at €1,550 ex VAT (the fair's
own page).

## QA

All clean on the final build and live, every test with a planted control. qa/RESULTS.md has the table.

## Source

build/ (python3 build.py writes site/ and site-plan/), qa/ (every test, each with a planted control), research/.
