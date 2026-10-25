# Saavedra v3, the flow and the moments (25 Oct 2026)

Raka on the restyled build, "be more creative in animations, videos, photos, things, graphs, whatever, think about the
DESIRED UX UI user action and how the whole flow guides them". The four lines are in four-lines.md. This is the path,
step by step, and the moment that moves the visitor at each step.

## The action

A quote request with enough in it for Julien and Grégoire to answer with a price, the headcount, the format, a date,
the recipes if they care, and a contact. The page builds that request with the visitor as they scroll, so the form at
the end is already filled in and the last step is one tap.

## One order, carried down the page

A single order state lives in the page (headcount, format, appetite, recipe mix, date). Every control writes to it and
every display reads from it, the hero number, the table, the ticket, the per head chart, the sticky bar and the form.
Nothing is typed twice.

## Entreprises, step by step

| Visitor's question | What they see and do | The moment |
|---|---|---|
| Is this for a team like mine? | "Vous êtes combien ?" and a giant number they can drag | The number is the hero. Each person added drops three empanadas into a line across the page |
| How much food is that? | The table, seen from above | Boxes slide onto a wooden table, lids open, empanadas drop in, sized to fit |
| Can we choose? | The nine recipes as a checklist, or "Un peu de tout" and "Que sans viande" | The boxes recolour as the mix changes, and "sans viande" counts itself. Built as a checklist shared out evenly, because plus and minus per recipe on nine rows was slower than the decision it served, and "On choisit pour vous" promised a choice on their behalf |
| What does it cost? | The order ticket | A receipt prints line by line in mono, boxes, recipes, total at card prices, per head |
| Is it a fair price? | Per head, compared | Bars for boxes, the two lunch deals and an afterwork example grow, their choice lights up |
| Can we get it to the office? | "Où est votre bureau ?" | Their runner carries the tray along real streets to the place they pick, minutes ticking up |
| Can we do drinks or the evening? | 18h30 and 20h | The afterwork card list, then the arch with the wood fire burning inside |
| Last doubts | Four answers | Plain accordion |
| Send it | The form, the ticket pinned above it | One tap. On success the ticket slides onto the kitchen rail, "Bien reçu" |

The sticky bar appears after the hero and hides at the form, "20 personnes · Boxes au bureau · ≈ 204,50 € · Recevoir
mon devis". It's the order, always one tap away.

## Home

| Step | Moment |
|---|---|
| Who is this? | Their arch rising in front of their sun, and the sun is made of live fire |
| Fewer words, more empanadas | The poster line, then their photos drifting faster as you scroll |
| A team's day | 12h30 to 20h, the sky follows the clock, each hour brings one of their photos and a door to that format |
| And tomorrow? | The headcount, already picked, "Composer la commande" opens Entreprises with it |
| The food | Their own sentence beside the fire, the nine recipes, each showing what's inside on hover or tap |
| For me | Click and collect, Deliveroo, Uber Eats |

## Private hire

The wood fire burns inside their arch next to "Le four à bois, rien que pour vous", then the occasions, the card, and
the same order form preset to private hire.

## Media rules for this pass

- Fire loops are Mixkit Free clips (licence read twice by the imagery agent). No people, never captioned as their oven.
  The handover asks for their own kitchen footage, their Instagram has a behind the scenes series filmed by a studio.
- Every photo is theirs. Video plays only on screen, never under reduced motion or data saver, with a still poster.
- Every scene writes CSS variables or classes only and has a still state without JavaScript.
