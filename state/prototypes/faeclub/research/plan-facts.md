# Fae Club plan, every figure and how it was checked (25 Oct 2026)

Every line here was reopened today, 25 Oct 2026, in this session, all of it before the deploy that finished at about 19.05 UTC. Raw pages are in
the scratchpad (fae/plan-facts), screenshots in fae/today. Two ways each, the raw HTML read by script and a Chromium
render looked at, unless a line says otherwise. A control (wix.com) loaded 200 through the same path in the same minute.

## Her own site

| Fact | Where | Checked |
|---|---|---|
| Shop pay in 3 tickets say "You will receive your tickets via email within 48 hours of purchase. In order to make more payment options available to our community we had to set up these orders in a different way which can cause a delay in processing time as we will need to manually RSVP each guest." | fa3club.com/product-page/tier-ticket-pay-in-3-option-fairytale-ball-2027, .../royal-tier-ticket-pay-in-3-option-fairytale-ball-2027, .../night-club-ticket | Raw HTML of all three (the royal page answered 429 once, 200 on retry), and the Enchanted page rendered at 1440 |
| Enchanted pay in 3 shop ticket, "£175 ticket price plus £4.38 processing fees, total price: £179.38" | the Enchanted shop page | Raw and render |
| Royal pay in 3 shop ticket, £195 plus £4.88, £199.88 | the Royal shop page | Raw |
| Night Club shop ticket, £25.00 plus VAT £5.00 plus fee £0.75, £30.75, same 48 hour and RSVP wording | fa3club.com/product-page/night-club-ticket | Raw |
| Event checkout, "Enchanter Tier" £175.00 plus £4.38 fee, "Royal (VIP) Tier" £195.00 plus £4.88, Royal shows Sold Out, sale ends 16 Apr 2027 | fa3club.com/event-details-registration/the-fairytale-ball-2027 | Raw (prices, Sold Out) and render |
| Upcoming Events opens with a highlighted "**Click here to buy tickets with pay in 3, pay in 4, and other finance options." linking to /product-page/vikings-and-valkyries-ball-ticket | fa3club.com/upcoming-events | Raw href read, render looked at |
| That link answers 404, "This product couldn't be found" | fa3club.com/product-page/vikings-and-valkyries-ball-ticket | curl 404, render shows the text |
| Fairytale Ball page, "66% SOLD OUT!", "174 days to the event", "Spread the Cost - Click here to pay in 3" | fa3club.com/fairytale-ball | Raw text |
| Lions Solstice, "This event SOLD OUT in under 48hours!" | fa3club.com/post/2026-uk-fantasy-balls-your-guide-to-a-year-of-magic | Raw text |
| Her pages name no instalment provider. PayPal appears only in Wix configuration flags | the product and event pages | grep for klarna, clearpay, afterpay, paypal, stripe, laybuy, zilch. So the plan never names her current provider |

## The retreat

| Fact | Where | Checked |
|---|---|---|
| "All Included for £ 1795", "*Personalised payment plans available", "**Get £150 OFF your booking when you book with a friend", "18+ \| Female Only", "14th - 18th June 2027" | highfaeretreats.com/the-retreat | Raw text, render at 1440 |
| "Book Now" and "Book The Retreat" both link to /enquire, a name, email and message form, highfaeretreats@gmail.com | the-retreat and /enquire | Raw hrefs, render of /enquire at 1440 (the phone render hit a Cloudflare check, so not used) |

## Rivals, prices on their own ticket pages

| Fact | Where | Checked |
|---|---|---|
| The Eternal Throne Ball, Stowe House, Sat 17 Apr 2027, the same night as the Fairytale Ball. "Courtier Tier - £190 + VAT £38 (Booking Fees Apply)", "Noble Tier - £230 + VAT £46" | tickettailor.com/events/mysticfate/2298844 | Raw text. Found by web search, opened at source |
| The Court of Spice, The MAASquerade Ball, Ragley Hall, Tue 27 Oct 2026, "Ticket Price £149.00", "We are officially SOLD OUT for Monday and Tuesday's events" | ticketspotapp.com/e/ciyl1 | Raw text |
| Through The Veil (Shrewsbury, Sep 2026), in the first research note | ents24 | Now 410 Gone, the event has passed. Dropped |
| How each rival takes payment | | Not checked. The plan says so under the chart |

## Payments

| Fact | Where | Checked |
|---|---|---|
| Stripe supports Klarna for businesses in "24 European countries including the United Kingdom", the business "is always paid in full upfront with no repayment risk", Klarna "covers any losses from fraud or unpaid credit", "Available payment options vary by market" | stripe.com/payments/klarna | Fetched and read |
| Ticket Tailor takes Klarna through a connected Stripe account, GBP listed, "the full amount of the order (minus fees) is made available to your Stripe account up front", updated 14 Jul 2026 | help.tickettailor.com/en/articles/8826630 | Fetched and read |
| Stripe instalment plans, a subscription schedule with a set number of iterations and end_behavior cancel, "Installment plans allow customers to make partial payments for a set amount of time until the total amount is paid" | docs.stripe.com/billing/subscriptions/subscription-schedules | Fetched and read |
| Klarna's own UK Pay in 3 schedule | klarna.com/uk pay in 3 pages | Both guessed URLs 404, the UK home names no schedule. Retailer pages say 30 and 60 days, Stripe's page says every two weeks. Not settled, so the plan says the provider sets the dates and the prototype's monthly dates are an example |

## Computed in the plan, from the figures above

- Enchanted ticket £179.38 in three, £59.80 today, then £59.79 and £59.79 (17938 pence, the first payment carries the odd penny).
- Royal ticket £199.88 in three, £66.64, £66.62, £66.62.
- Eternal Throne Ball Courtier, £190 plus £38 VAT is £228 before booking fees. Noble £276 before fees.
- The hours chart multiplies two numbers Elle sets. The defaults are examples and say so on the page.

## Not used, and why

- Instagram 56,488 followers. True on 25 Oct in the first note, not reopened today, and not needed.
- Two stock counts for Royal. Royal shows Sold Out in the event checkout while the pay in 3 copy is listed in the shop with Add to Cart (its stock field reads 58).
  It may be an allocation she set, so the plan only says the new checkout keeps one count per tier.
- Wix Events and Klarna. Wix lists Klarna for Wix Payments in the UK, but nothing says it works in Wix Events. Not claimed.
