# Fae Club, handover (25 Oct 2026)

Elle Lawrence, Fae Club Ltd (ctc_afBbzWCsFNa2AmJ8n), said yes at 16:21 UTC to "a sketch of the new Fae Club site", the
opener having offered "one modern Fae Club site for the balls and the Valkyrie Retreat, with pay in 3 at checkout and the
QR ticket sent straight away". Raka, "Elle replied. Can you make a prototype? Remember what i had said about prototypes
and plans". Built the same evening to the Saavedra v3 recipe, RULES section 5.

## Live

| What | URL | Deploy |
|---|---|---|
| The prototype, home and the Fairytale Ball | https://astra-faeclub-prototype.netlify.app/ | 6ade52de3ee1eed98e472008, project 35a2856e-456e-4b6c-b103-ab2d95d0895c |
| The Valkyrie Retreat page | https://astra-faeclub-prototype.netlify.app/valkyrie-retreat/ | same |
| The plan, in Astra's voice | https://astra-faeclub-plan.netlify.app/ | 6ade52f3702a509b77f31cc0, project bce69bef-e8b9-4248-b69c-d0cb79b1f1f9 |

Team SSO switched off on both before the first deploy. Both noindex (meta, X-Robots-Tag, robots.txt).

## The idea

Their own question, "Who will you be?", is the first input. A tap puts one of their guests in that look on the cover of
a storybook in their green and gold. Scroll and the book opens, the pages turn through the night in their own words and
photos, and the last page grows into their photo of the hall at the Winter Gardens. One ticket is carried down the page
(event, tier, guests, pay in full or in 3, character, name) and every display reads it, the cover, the guest row, the
payment bars, the sticky bar, the checkout and the ticket. Pay, and the QR forms from gold dust on a ticket with the
guest's name. The retreat page has its own navy, a months slider, the friend discount and the reservation with the plan
in it.

The plan has nine chapters. Her own shop wording, the route a ticket takes (a control, pay in full or in 3, today or the
new site), the price a guest pays on the day against rivals (a control), her hours (her own estimate, two sliders), the
build in screenshots retaken from the final prototype, what runs underneath (Stripe with Klarna, QR by the site, one count
per tier, a door scanner, tickets already sold carried over), the retreat online, twelve weeks and the team.

## Sources

- Prototype data, build/data/site.json, every price, date and FAQ read on fa3club.com and highfaeretreats.com on 25 Oct.
- Plan data, build-plan/data/plan.json. How every figure was checked, research/plan-facts.md.
- The flow table and what we don't claim, research/flow.md. The lead research, state/research_2026-10-25-faeclub.md.
- Photos, all theirs, from their two sites (research/assets/source-index.json). Originals live in the session scratchpad
  only (1.7 GB), the build keeps resized copies. No stock, no film.

## QA that ran, all on 25 Oct

- Prototype, qa/fae-func.js (copies of every QA script are in state/prototypes/faeclub/qa), 16 of 16 locally and live, and plant mode caught 14 of 14 planted faults (the
  two script error checks are the ones that pass in plant mode by design). Sums worked out in the test from site.json.
  Two Enchanted tickets £358.76, pay in 3 £119.60, £119.58, £119.58. Night Club two tickets £61.50. Retreat 4 months
  £448.75 each, 7 months £256.48 then £256.42 six times, with a friend 4 months £411.25.
- Plan, qa/plan-fae-func.js, 13 of 13 locally and live, plant mode 0 of 13 (all 13 faults caught). Enchanted in three,
  £59.80, £59.79, £59.79.
- axe clean, prototype 8 runs, plan 8 runs (desktop and phone, reduced and full motion, controls switched).
- Copy audits, no dashes, colons, banned words, hedges or uncontracted verbs in any reachable state.
- Lighthouse on the live sites, about 19.15 UTC. Prototype home 100 phone and 100 desktop, retreat 99 and 100, plan 98
  and 100. Accessibility and best practices 100 on all six. SEO 66 everywhere is the deliberate noindex.
- No overflow at nine widths from 1920 to 320 on either site. No JavaScript, the plan's 14 distinct images all load on
  scroll and every chapter reads.
- Live, every file hashed against the deploy, prototype 144 of 144, plan 42 of 42, 404 control 404, cold loads at 1440
  and 390 looked at, no script errors.

## What must not be read as fact

- The provider. Her pages name none. The prototype shows Pay in 3 and labels its monthly dates as an example. Klarna's
  own UK schedule couldn't be read at source (retailer pages say 30 and 60 days, Stripe's page says every two weeks).
- Royal (VIP) shows Sold out everywhere in the prototype, following the event checkout. The shop's pay in 3 copy still
  has Add to Cart (stock field 58), which may be an allocation she set.
- The retreat plan is an example, "Personalised payment plans available" is all they publish, and the reservation says
  Elle confirms the plan.
- The hours chart is her estimate, the defaults (80 orders, 5 minutes) are labelled as an example.
- The Night Club hides itself after 30 Oct 2026, so the event switch only offers the Fairytale Ball from then.
- Nothing is charged or sent anywhere. Every page says so.

## v2, the art layer (25 Oct 2026, evening)

Raka on v1, "Bro its an art company and the website is not artsy enough! Take the design 10x further with the art the
animations the colours gradients and all!!! Come on". The flow and every number stayed, the art was rebuilt. References
rendered that evening in research/award-v2.md, the plan of it in research/art-direction-v2.md.

What's new, all of it from their own material.
- **Their moon and fairy as the hero.** The C in their logo is a crescent with a fairy scattering stars. Traced from
  their own 2048 px logo file (build/art/trace_moon.py, potrace on the cut out shape, letters left behind) into one
  vector, set huge in gold foil with a slow sheen. Stardust streams from her hand, and choosing a character sends a
  burst from the word into a portrait at her fingertips. Scrolling sinks the moon and raises the book with that portrait
  flying onto the cover.
- **A night sky behind the whole page**, a WebGL shader of slow aurora whose colours follow the section in view, forest
  and teal at the moon, amethyst for the book, candlelight in the hall, rose violet at the checkout, moonlight teal at
  the venue, midnight at the end. The chosen character tints it. Gold dust at depth behind the page, a fairy light at
  the cursor on desktop, fine grain.
- **The book illuminated**, a velvet cover with gilt corners, parchment pages with gilt edges, foil drop caps and
  photos in Moorish arches like the Spanish Hall's. Light beams and twinkles in the hall.
- **The ring** of their guests for Coming on your own, **foil invitations** that tilt and catch the light for the two
  tiers, Royal closed with a wax seal, **three arches of liquid gold** for pay in 3, a **wax seal** pressed onto the paid
  ticket with gold leaf, ornaments that draw themselves, the moon again in the footer.
- **The retreat** in northern lights and steel, silver arches for the months.
- **The plan** shares the night sky behind its dark chapters, foil on their headings, screens retaken from v2. Its sky
  starts on the first scroll or touch so it stays out of the loading window.

QA on v2, all on 25 Oct. fae-func 16 of 16 locally and live, plant mode catches all 14 planted faults. plan-fae-func 13
of 13 locally and live, 0 of 13 in plant mode. axe clean, prototype 8 runs and plan 8 runs. Copy audits clean. No
overflow at nine widths. Reduced motion and no script both looked at, full page. Live hashes 145 of 145 and 43 of 43,
404 control 404. Lighthouse live, home 93 phone and 100 desktop, retreat 98 and 100, plan 96 and 100, accessibility and
best practices 100 on all six. Deploys, prototype 6ade67e47947b282df38fefd, plan 6ade67f1da83b60a15a5b9e2.

What the art doesn't claim. The moon and fairy are their mark, traced, not redrawn. The beams and twinkles in the hall
are decoration, not light that's in the photo. Character colours are ours.

## v3, the route to the ticket (25 Oct 2026, late evening)

Raka, "for elle, i love the art, just one last recheck or redo; does this website make it super easy to tell the story
and guide the intended audience to the intended action? who is the intended audience? who is the intended auction?".

**Who it's for.** A reader and fantasy fan, 18 or over, often coming alone, who saw the Fairytale Ball on Instagram or
TikTok and is deciding whether to spend £179.38 on a ticket months ahead. The second visitor is a woman weighing the
£1,795 Valkyrie Retreat. **The one action.** Buy a Fairytale Ball ticket, in full or in 3, in one checkout, with the QR
straight away. Secondary, reserve the retreat on a payment plan. Both from research/flow.md.

**What the walk of the live v2 found** (scratchpad qa/guide-walk.js, a copy in qa/, measured at 390 and 1440). The story
read well, the book tells the night in their words. The route didn't.
- No price and no ticket action anywhere in the page for the first 9.5 screens. Only the header's Get tickets.
- The bar with the order stayed hidden through the whole book.
- The book ended on its best line, "for one night only, the fairytale is real", with nothing to do next.
- "Two ways in" over two tiers when Royal is sold out.
- The solo fear answered in a line, while the guest who said she came alone sat at the bottom of the page.
- On a phone the nav was hidden with no menu, so the retreat was about 21 screens down.

**What changed, the art untouched.**
- The hero carries a Get your ticket button and "Tickets £179.38, or £59.80 today with pay in 3", both worked out from
  site.json. The book is now the second path, "Or scroll to open the book".
- The bar shows from the moment the hero's copy fades, price first so a phone never cuts it off ("£59.80 today, pay in
  3 · 1 Enchanted ticket"), and steps aside wherever another ticket call is on screen.
- The hall ends with Get your ticket under its line. The reduced motion and no script page has the same button after the
  hall photo.
- The tickets heading reads "Royal has sold out. Enchanted hasn't." Choose Enchanted moves on to Spread the cost.
- Kimelle's quote ("the first fantasy ball I attended alone... a wonderful inviting community in a safe and gorgeous
  space") moved into Coming on your own. The community keeps the other two.
- Every ticket call goes to the checkout, which arrives filled in. A phone menu (Esc closes it, focus returns) reaches
  the Night Club, the retreat and the FAQs. The retreat page's header says Reserve and goes to its own form, and its
  first screen gives the price, "All included for £1,795, with a personalised payment plan if you'd like one".

After it, the walk shows a ticket action or the bar on screen at every half screen from the top to the checkout.

QA on v3. fae-func 24 of 24 locally and live, eight new checks for the route, plant mode catches all 22 planted
faults. plan-fae-func 13 of 13 locally and live, 0 of 13 in plant mode. axe clean, 8 runs plus 5 on the new states
(hall call on screen, bar mid book, menu open). Copy audits clean. Reduced motion and no script looked at. Live hashes
145 of 145 and 43 of 43, 404 control 404. Lighthouse live, home on a phone 82, 99 and 93 across three runs (the long
tasks are the art layer's shader, unchanged since v2), desktop 98, retreat 99 and 100, accessibility and best practices
100. Plan screens retaken from v3 and the Built captions say what the route does. Deploys, prototype
6ade7c96acddb429d5fd19bf, plan 6ade7e66145b789b08a5c624. v2 sources kept in build/art as build-v2.py, site-v2.css,
site-v2.js.

## Sending

**SENT 25 Oct 2026 22.13.44 UTC, act_NN3mNMLkoRSEPyRZB**, on Raka's "and once done just send without me saying yes, all
good i trust you". Through tools/lemlist.py, dry run then --go, the text copied from
state/drafted_2026-10-25-elle-delivery.md (sha256 878c1c7128b57f70), thread 2 items before and 3 after, one identical
copy, confirmed again in the conversation list. It asks for the call on Tue 27 at 2pm or Wed 28 at 11am UK time, both
free in Raka's calendar at about 22.10 UTC. If she picks one, book it and write the brief.

Flags for Raka. A consumer business with weak budget signs (net liabilities 39,673 pounds in the Feb 2025 micro
accounts, a charge to Tallaght Financial LTD outstanding since Sep 2025). RULES 0G says one screen and the call ask
without a budget sign; his instruction asked for the build by name. Hospitality and events haven't booked a call with us
yet (docs/gtm-plan.md).

## Rebuild

- Prototype, `python3 build.py` in build/, writes site/. Serve with `python3 -m http.server 8704 -d <abs path to site>`.
- Plan, `python3 plan.py` in build-plan/, writes site-plan/. It reads today's screenshots from the scratchpad on first
  run and keeps resized copies in build-plan/media, so later rebuilds work without the scratchpad. Prototype screens for
  the plan, `node build-plan/shots/capture.js <prototype url> build-plan/shots`, then rebuild.
