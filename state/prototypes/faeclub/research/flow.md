# Fae Club, the flow and the moments (25 Oct 2026)

Elle Lawrence answered our 16:03 sketch offer at 16:21 UTC, "Yes this is an issue that we face but our current site
doesn't allow us to fix it, we'd love to explore options to make it easier for our customers to check out". Raka,
25 Oct, "Can you make a prototype? Remember what i had said about prototypes and plans". So the Saavedra v3 recipe,
RULES section 5, with the plan on its own site.

## The four lines

1. **Who lands here.** A reader and fantasy fan, 18 or over, often coming alone, who saw the Fairytale Ball on
   Instagram (56,488 followers) or TikTok and is deciding whether to spend 179.38 pounds on a ticket months ahead.
   Second visitor, a woman thinking about the 1,795 pound Valkyrie Retreat.
2. **What they're thinking, in order.** What is this night actually like? Who would I be? Can I come on my own? What do I
   get, and which ticket? Can I spread the cost? When do I get my ticket? Where is it and how do I get there? What do
   I wear? Is it refundable, is there food, can I bring a sword?
3. **Their goal.** A night that feels like stepping into a fairytale, a ticket in hand without a wait, and paying in a
   way that fits their month.
4. **The one action.** Buy a Fairytale Ball ticket, paying in full or in 3 in the same checkout, and get the QR ticket
   straight away. Secondary, reserve the Valkyrie Retreat on a payment plan.

## One ticket, carried down the page

A single order lives in the page, `{event, tier, qty, plan, character, name}`. Every control writes it, every display
reads it, the book's cover, the invitation, the payment bars, the sticky bar, the checkout and the issued ticket.
Nothing is typed twice. The checkout arrives already filled in.

## Home, step by step

| Visitor's question | What they see and do | The moment |
|---|---|---|
| What is this? Who would I be? | Their line "Who will you be?" with five answers taken from their own dress code and event copy, a knight, a prince, a princess, an outlaw, a fae. One tap. | A closed storybook in their green and gold. The tap puts one of their guests in that look into the oval on its cover, and the invitation starts writing itself, "arriving as a knight" |
| What's the night actually like? | Scroll | The book opens and its pages turn through the night in their own words, the Prosecco or elderflower fizz, characters and side quests, guided dances, the costume contest, the DJ into the late hours. The last page grows into the Spanish Hall itself, "for one night only, the fairytale is real" |
| Can I come on my own? | Their answer, "Absolutely! Many of our fae attend solo", and "How many of you?" | A row of places at the ball fills as the number moves, one lit for one |
| What do I get, which ticket? | The two tiers as two invitations, Enchanted and Royal (VIP), their lists | Royal shows Sold out, in one place, the same everywhere on the site |
| Can I spread the cost? | Pay in full or Pay in 3, one switch | Three payment bars on their dates, today and the next two months, computed to the penny from the ticket and the service fee |
| When do I get my ticket? | The checkout, name on the ticket, the order already in it | One tap. The QR code forms from gold dust on the invitation, "sent to your inbox", the moment it's paid |
| Where and how? | The Winter Gardens, their directions | Their photo of the hall and the line they put in capitals, enter at 97 Church Street |
| What do I wear? | Their dress code | Their guests' looks, the Scrolls guides |
| Last doubts | Their own answers to their own questions | Plain list, refunds included as they wrote them |
| What else? | The Night Club, the Valkyrie Retreat, the community | Their posters, Discord and Instagram |

The sticky bar appears after the hero and hides at the checkout, "1 ticket · Enchanted · Pay in 3 · £59.80 today ·
Checkout". It's the order, always one tap away.

## The Valkyrie Retreat

| Visitor's question | What they see and do | The moment |
|---|---|---|
| What is it? | 14 to 18 June 2027, a manor on its own island, the Lake District | Their photo of a Valkyrie by the lake, swords raised against the mountain |
| What's included? | Their list, sword flow, meditations, the mountain, photoshoots, the private chef, the silver gift | Each with their photo |
| Can I pay over time? | "Personalised payment plans available", months from one to seven, with a friend or alone | Bars for each month, 1,795 pounds less 150 with a friend, as they publish it |
| Book | The reservation with the plan already in it | "Your place is held", the plan confirmed by email, as an example only |

## Media rules for this pass

- Every photo is theirs, from fa3club.com and highfaeretreats.com, Krios Photography and their own. None is captioned
  as a named person. Wix's stock images (Mountain Night Reflection, Champagne Glasses, the two lake views) are left out.
- No film this pass, they publish event videos on YouTube and the handover asks for their own footage.
- Every scene writes CSS variables or classes only and has a still state without script and under reduced motion.

## What we don't know and don't claim

- Which instalment provider. Their shop shows "or 4 interest-free payments" from a provider widget, and the pages say
  "pay in 3, pay in 4, and other finance options". The prototype shows Pay in 3 at checkout, the plan names the
  options (Klarna through the payment provider, or a ticketing platform that has it).
- The Royal tier's real stock. The event checkout says Sold out, the shop still sells the pay in 3 copy. The prototype
  follows the event checkout and the handover says so.
- The retreat's plan terms. "Personalised payment plans available" is all they publish, so the plan builder is labelled
  as an example and the request says Elle confirms it.
