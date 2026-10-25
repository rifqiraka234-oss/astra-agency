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

## Sending

Delivery drafted in state/drafted_2026-10-25-elle-delivery.md, check-drafts PASS, NOT sent. It asks for the call on
Tue 27 at 2pm or Wed 28 at 11am UK time. Reopen the thread and both URLs in the minute before sending.

Flags for Raka. A consumer business with weak budget signs (net liabilities 39,673 pounds in the Feb 2025 micro
accounts, a charge to Tallaght Financial LTD outstanding since Sep 2025). RULES 0G says one screen and the call ask
without a budget sign; his instruction asked for the build by name. Hospitality and events haven't booked a call with us
yet (docs/gtm-plan.md).

## Rebuild

- Prototype, `python3 build.py` in build/, writes site/. Serve with `python3 -m http.server 8704 -d <abs path to site>`.
- Plan, `python3 plan.py` in build-plan/, writes site-plan/. It reads today's screenshots from the scratchpad on first
  run and keeps resized copies in build-plan/media, so later rebuilds work without the scratchpad. Prototype screens for
  the plan, `node build-plan/shots/capture.js <prototype url> build-plan/shots`, then rebuild.
