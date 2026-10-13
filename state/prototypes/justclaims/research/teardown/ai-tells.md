# Why v2 looked Claude built, and what v3 does instead

Written 12 October 2026 for Raka, after "it shouldn't look like people using Claude can just make this website".

## The short version

An AI builds the average of every landing page it has seen. Ask for "modern, 2030s, premium" and you get the same kit every time. A dark sky with soft colour blobs, a pill above a centred headline with one word in italic serif, glass cards, a stats row, a bento grid, a logo marquee, everything fading up as you scroll. v2 was that kit, done carefully. Careful didn't help, because the kit is the tell. Kyson's point stands. If a prompt can make it, a prompt made it.

The way out isn't more polish on the kit. It's a concept that only this client could have, held to with discipline. justclaims sells deadlines to airlines, run by aviation lawyers in Frankfurt. So v3 is built from the documents of that world. A departures board, flight progress strips, an approach chart, a punched card, a boarding pass, wayfinding signs, newspaper print. Their colours and marks, an airport's grammar.

## The tells, where v2 had them, and what v3 does

| The tell | Where v2 had it | What v3 does instead |
|---|---|---|
| Centred hero stack, pill eyebrow with a glowing dot, two buttons side by side | `.hero-in` centred, `.pill .dot` on the hero and on every section | Headline set left on a 12 column grid, the regulation's dates in a docket in the margin, one yellow sign as the button |
| One word in italic serif, often in colour | "have a *deadline.*" in Instrument Serif italic mint, repeated in every heading | No accent words anywhere. The serif is kept for the text of the law and nothing else |
| Dark sky with glowing blobs and film grain | `.sky` radial gradients that shift with scroll, `.grain` overlay | Concrete grey paper. Black only where the real object is black, the board, the signs, the bar |
| Glass panels and round corners on everything | blurred panels with 1px white borders, pill nav, 22px radius cards | Square signs with a 3px radius, paper strips in a metal rack, a die cut ticket. Nothing translucent |
| A stats row of big numbers | the four cell cluster under the hero | The numbers sit on a split flap departures board, which is where airline people already read deadlines |
| A bento grid | `.bento`, five tiles of different sizes | Newspaper columns divided by column rules |
| A logo marquee | `.marq`, scrolling press logos | A still row of press logos, printed in the ink |
| Everything fades and blurs in, staggered | `.rv` with `--d` delays on almost every block | Nothing fades in. Motion only where a real object moves. A flap falls, a strip slides out of the rack, a card gets punched, a route inks in |
| Charts with gradient fills, rounded bars and glow | `chart_v2` added gradients and `rx="10"` | Newspaper charts. One ink, one yellow highlight, labels on the data, an annotation, the source under each |
| The current template fonts | Funnel Display, Geist, Geist Mono, Instrument Serif | Barlow, which takes after California's highway signs. Newsreader for the law. B612 Mono, the face Airbus commissioned for its cockpit screens |
| Every section opens the same way | pill, heading with an italic word, grey lead, all centred | A numbered wayfinding sign with the German above the English, as on the signs at Frankfurt airport. Heading on the left, lead on the right |
| Decoration that carries no information | the product window tilting on scroll, the readiness ring sweeping, a pulsing dot | Every moving part carries data. The board holds the seven deadlines, the route shows the order of a claim, the card counts 96 hours |
| Stock imagery dropped in at full colour behind text | the wing film behind the hero, the rain film behind the 96 hours | Stock printed as a real halftone screen, with a second yellow ink where the photo has yellow. The clock film is printed live, frame by frame |
| A four column footer | `.foot-in` | A footer with a colophon that says where the rules, the type and the pictures come from |

v1 had a different set of tells, the 2010s ones Raka named. Alternating tinted section bands, B612 for every word, slanted buttons, pale cards in rows. v2 swapped those for the 2024 set above. v3 drops both sets.

## The rules v3 follows, so it stays out of the kit

1. Three faces with three jobs. Barlow is the system and the signs. Newsreader is the law and only the law. B612 Mono is codes and times.
2. Three colours with three jobs. Sign yellow is a deadline or an airline duty. The justclaims mint is the passenger and the claim. Black is the board and the ink.
3. Nothing fades in, glows, blurs or floats.
4. Every element is a real document or object from an airport, a cockpit or a law office, and it behaves like one.
5. Every number on the page traces to the Official Journal or to a named source printed under it.
6. German and English together, the way Frankfurt does it, checked word by word.

## What's in v3

- A split flap board of the seven deadlines that touch a claim, flipping in on load. The passenger rows switch to Fluggast now and then, the way Frankfurt's boards change language.
- All fifteen time limits as flight progress strips in a rack. The last column is one log scale from an hour to a year, so the stacked strips read as a ruler. Each strip opens to its sentence from the Official Journal.
- One claim drawn as an approach chart, with the complaint as a holding pattern. The planned route is dashed and inks in as you read.
- The 96 hours as a punched card, a position for each hour, punched at speed.
- Two newspaper charts with their sources.
- The justclaims claim screen rebuilt as an exhibit with crop marks and numbered notes.
- A boarding pass claim clock with a die cut stub.
- The founders printed as newspaper portraits.
- A big yellow airport sign as the call to action.
- On the inner pages, the reform timeline is a second flap board, the explainers are set like an annotated statute with side heads, and the 404 is a departures board where the missing page is cancelled.
