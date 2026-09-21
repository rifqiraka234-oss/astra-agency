# Research method and the five angles

> **Moved out of `CLAUDE.md` on 2026-09-21 to make it readable.** Nothing was changed, only relocated. `docs/RULES.md` outranks this file.
>
> The deep method behind the research rules in `docs/RULES.md` section 3. Open it when you are researching a lead. It is not needed for inbox triage, a build, or a pipeline run.

## The research order of operations (Raka, 2026-09-17). Run it in this order, every lead.

His words, "it's good, but I want you to be better, the way you research it, I
think that's a big problem still." The failure is not the template, it is that
research has been starting at the company's HTML and working outwards. It starts
with the human being who has to read the message.

Cross checked against how B2B prospecting is actually taught, which lines up with
this order. Practitioners map the buying committee to **each role's own success
metrics** before writing, treat individual research as a role brief of goals,
fears and metrics rather than generic company pain, and assemble a **signal stack**
across firmographic changes, technographic changes, behavioural intent and
strategic triggers instead of leaning on one indicator.

### Step 1, the person, before anything else

Never open a company's website first. Work out who is going to read this and what
their week actually looks like.

- **What is their exact title at this company**, off their LinkedIn and confirmed
  against the company's own site, since those disagree often.
- **What does a person in that seat get measured on.** Write it down in one line.
  An Operations Director is judged on delivery and capacity. A founder is judged
  on revenue and runway. A marketing lead is judged on pipeline. A practice owner
  is judged on the appointment book. The message has to land on that number.
- **Separate the business they OWN from the job they HOLD.** This is Raka's
  explicit instruction and it is the one that gets missed. Plenty of our targets
  run a company on the side while employed full time somewhere else. We are
  writing to the owner about the thing they own, never about their employer.
  Hau-Quoc Phan is the live example, he is a project manager at Hydro-Quebec and a
  co-owner of a Montreal spa, and only the spa is the subject.
- **Pull the statutory filing. One fetch, and it is the most accurate input you will
  get all day.** UK Companies House, NL KVK, DE Bundesanzeiger, BE KBO, FR Infogreffe
  and annuaire-entreprises.data.gouv.fr. Take the incorporation date, the accounts type
  and the officers. The accounts type alone is a legal size band, so a UK micro entity
  filing means under 632,000 GBP turnover and ten people or fewer, stated as fact
  rather than guessed. Write the company number into the research note. This bounds
  every number you later put in the message and it is how the money figure stops being
  an opinion. See the monetary floor method below.
- **Read what they have actually published.** Their own posts are the cheapest
  route to a problem they have already admitted to in public. Quote it if you find
  it. LinkedIn returns HTTP 999 to our fetcher, so a post is only usable when a
  search surfaces enough of it, and the fallback rules already written below apply.

### Step 2, the website, and LOOK at it before you grep it

**Raka's priority is the website angle first**, so exhaust it before going wider.
And the hard lesson from the bluedesk miss on 2026-09-17, **render the site and
look at the screenshot before forming any opinion.** An HTML grep produced a
confident angle about an empty vacancies page. One screenshot showed a modern,
well art directed site with real client photography, a live cases carousel, ten
news items and their own AI calling agent running on the page. The angle
evaporated. Greps find strings, they do not find design.

The order inside this step.

1. **Render the homepage.** Try live Chromium FIRST, the proxy does not block every
   host and bluedesk worked first time. Mirror only if live fails, and if you do
   mirror, give each asset a unique local name, because query string assets such as
   Dynamicweb's `GetImage.ashx?width=...&image=...` collapse onto one file and
   render garbage that will mislead you.
2. **Screenshot desktop and phone width, then scroll the whole page** in steps and
   look at every screenshot. Dismiss the cookie wall by clicking it, never by
   deleting it from the DOM, which strips their CSS and gives you a fake page.
3. **Judge the looks honestly.** Does it read as current or as 2008. The greppable
   proof is in the dated site section below, and the shapes, fonts and colour work
   is there too.
4. **Walk the flow** per the flow walk section below, every nav item fetched, forms
   counted per page, Contact opened last.

### Step 3, the impact, tied to the person from step 1

A website problem is not an angle until it lands on that specific person's number.
The same broken contact form means different things to different readers. To a
founder chasing revenue it is lost deals. To an operations director it is work
arriving in a format the team cannot process. To a marketing lead it is spend that
produces nothing measurable.

Ask what the site's state does to the thing they are visibly trying to do. Are they
hiring, expanding, opening locations, raising, launching a service line, entering a
new country. Those are the same trigger events practitioners prospect on, and they
tell you which consequence to name.

### Step 4, only if the website is genuinely fine, widen out

bluedesk is the case for this. Strong site, no honest website angle, so the correct
move is either a company level problem or `NO_STRONG_ANGLE`, never a manufactured
snag. Widen in this order and stop as soon as something real and verifiable appears.

1. **Company specific.** Their vacancies, which tell you what they cannot do today.
   Their own news and posts. External coverage, funding, acquisitions, leadership
   changes, a new market.
2. **Sub industry or sector specific.** A pressure that provably hits businesses of
   their exact type, not a vague market observation.
3. **Region or country specific.** Regulation, a deadline, a local market shift that
   actually applies to them.

Then connect it back to step 1. A sector problem that does not touch this person's
own number is trivia, and trivia is what gets ignored.

### The stop conditions

Do not write until all four are answered. Who reads this and what are they measured
on. What did the rendered site actually look like and where does its flow break.
What does that cost this person specifically. What is the one artefact that fixes it.
If step 2 and step 4 both come back empty, the answer is `NO_STRONG_ANGLE`, and that
is a real outcome rather than a failure.

**What actually works on first touch (learned 2026-09-11 from real replies, not
theory).** The first message is the single biggest lever in the funnel, and the
reply data is blunt about it:

- The generic connect note ("saw your business and thought it was cool, I'm a
  business owner too, would love to connect and share ideas") reliably produces
  generic replies and a cold restart. One batch of six leads (Ramar/RentyFind,
  Jacqueline/Leadership Through Data, Fleur/DCCI, Karim, Sarim/Flochitect,
  Kyson/Acquitas) all came back with near-identical low-signal lines ("Thanks
  Raka", "nice to meet you, what business are you in?", "always great to connect
  with inspiring people"). It opens the door and hands us nothing to work with,
  every one forces us to restart the conversation from zero.
- Every thread that actually progressed turned on one specific, true observation
  about that lead's own business. Georgia/HotGreen replied "yes please" and told
  us they were mid redesign after we pointed out the CCEP trial and the raise
  were nowhere on their site. Ank/Tomatoworld booked a call after real
  engagement plus a tailored analysis. Antanas/Gravity Fellow replied "what is
  your offer" to a concrete investor homepage concept.
- Cold prototype sends before genuine interest mostly die (11 of 14 went silent,
  see Stage K). Rapport-only chit-chat dies the other way (polite warmth, then
  silence).

The rule, seen from the reply side: the first touch carries one specific
observation about their business that could only be written for them, enough to
earn a real reply. Never open with rapport filler, never open with a prototype.
Diagnose first, lead with the diagnosis, and hold the prototype or deck until
they have shown genuine interest (the ONLY_AFTER_INTEREST rule). Track what came
back, not just what was sent, so this stays evidence and not memory.

**Every reply has one job, earn a yes to sending something (Raka, 2026-09-13).**
A reply that produces a pleasant exchange and no artefact has failed. The aim
of any thread is to reach the point where the lead says "yes, send it over",
and the thing we send is either a prototype or a **research deck** of what we
found and what we would do about it. The deck is now a first class option
alongside the prototype, not a fallback, because the evidence says so. The
Tomatoworld deck produced a booked meeting, the HotGreen deck produced a warm
handover to the person actually running the redesign, and the Acquitas deck
went out on the back of an explicit "Go for it". A deck also suits leads where
a prototype would be wrong, which is most builders, consultants and technical
founders, and it is far cheaper to produce than a full build.

This does **not** licence cold sending. The Stage K data is unchanged, 11 of 14
unrequested prototype sends were ignored, so the `ONLY_AFTER_INTEREST` rule and
the Stage K pre build gate still hold. The change is about intent, every reply
should be steering toward the offer rather than drifting. In practice that
means each reply carries a concrete observation about their business plus the
ASTRA service line that actually fits (Grow / Optimise / Innovate / Build
Squad, and note that builders, consultants and technical founders usually want
Build Squad rather than a redesign), and closes by offering to put something
together. Use the prototype send convention, offer the specific journey ("I can
put together a quick version and send it over, want to see it?"), never a vague
"want me to?". Track in `state/prototypes.jsonl` what was offered, what came
back, and whether a deck or a prototype was the thing that moved it.

**Make them feel the cost of doing nothing (Raka, 2026-09-13).** An
observation on its own is trivia. The lead has to finish the message knowing
what staying exactly as they are will keep costing them, in their own business,
this month. Name the bill they are already paying without noticing. Studio Was
Here either turns down work that grows past design or hands it to a freelancer
it cannot control, and it is still their name on it when it slips. CLUUE has to
convince a Mittelstand manager he has a problem he cannot see before it can
sell him anything, which is the hardest sale there is, while the demographic
clock runs on his prospects. VDM Energy loses the homeowners who leave without
asking and spends real time quoting the ones who were only curious. NEWLENSE
makes a good reel, the click lands on a website that undoes it, and at the
monthly review it looks like the content underperformed rather than the site.

Two hard limits on this. The cost must trace to something actually verified in
research, never invented, and the no manufactured pain rule in
`docs/astra-commercial-angle-master.md` still outranks it, so a business with
no real gap gets `NO_STRONG_ANGLE` rather than a scary sentence. And it stays
plain and unbothered, never doom, never urgency theatre. State the bill, say
what we would build, offer to send it.

**Go for the grander thing, because nobody buys an agency to fix a small one
(Raka, 2026-09-17).** His words, "we just didn't analyse the website their
business problems deep enough. Aint nobody gonna buy something for just simple
logo changes. It needs to be a proper DEEP ROAST AND ANALYSES OF THE GRANDER
THINGS, the bigger impacts, the bigger overall pictures."

The message that produced this went to Binanti Cuzner at Liquid Insights and
said the thing to change was the logos and quotes carrying no numbers or names.
She replied "Yes sure ok but I'm really not looking to buy a new website
though", and she was right to. We offered a tweak, so she priced us as a tweak
and declined. A page defect is a snagging item. Snagging items are free advice,
and free advice is what she took.

**The failure is defect spotting where diagnosis belongs.** The flow walk and the
dated site forensics are very good at producing defects, and the temptation is to
report the best looking one. A defect is where you START. It is evidence of
something structural, and the structural thing is what gets bought.

**The so what ladder. Take the defect and ask "so what" until you hit money,
risk, or the position they hold in their market.** Three rungs, minimum. If you
cannot get off the ground floor, the observation is not worth sending and the
lead is closer to `NO_STRONG_ANGLE` than you think.

Worked on the message that failed.

| Rung | Liquid Insights |
|---|---|
| The defect | Client logos and quotes with no names and no numbers |
| So what | They sell insights, so evidence IS the product they charge for |
| So what | A buyer judging an insights firm judges its rigour by the evidence it shows about itself |
| **So what** | **Their own site argues against the thing they sell. Every prospect doing diligence meets an insights company that cannot evidence its own results, next to competitors publishing numbers.** |

The bottom rung is the message. The top rung is the footnote. We sent the top rung.

**Two tests before any "However" block ships.**

1. **The tweak test.** Could their existing web person do this in an afternoon?
   If yes, you have not found the angle, you have found a task. Nobody hires an
   agency for a task, and offering one makes us look like we are fishing.
2. **The scale test.** Does the consequence show up in revenue, in cost, in a
   deal they lose, in who they can hire, or in how the market ranks them against
   a named competitor? If the worst case is "the page looks a bit unfinished",
   go back and climb.

**One grand thing beats five small ones.** A list of defects reads as a snagging
report and invites them to fix the cheapest item and thank you. Name the single
structural problem, use one or two defects as the proof it is real, and leave the
rest in the research note. The evidence you cut is not wasted, it is what makes
the deck credible later.

**This does not license invention.** The no manufactured pain rule still outranks
everything here. Climbing the ladder means tracing a verified defect to its real
consequence, never inflating a small true thing into a big false one. If the
honest bottom rung is small, the lead is small, and `NO_STRONG_ANGLE` is the
right answer.

**Put a number on it, built only from THEIR figures (Raka, 2026-09-18).** A cost
the owner can feel is good. A cost the owner can count is better. So where a real
number exists, the "This means" block carries one.

**Why this is dangerous and how the danger is removed.** The owner knows their own
numbers better than we ever will. Invent one and every true thing in the message dies
with it, because a wrong figure is the most checkable lie we can tell. The no
fabrication rule is not relaxed here, it is the whole design constraint. So the
number is never estimated by us. It is assembled from figures the lead already
published, and the arithmetic is shown so they can correct it rather than dismiss it.

**The four rules, all hard.**

1. **Every input is theirs or publicly sourced.** Their own price list, their own
   review count, their own opening hours, their own capacity, their own published
   client count. A platform's own published commission. A named industry benchmark
   with the source named. Never a conversion rate, a traffic figure or a margin we
   guessed, because we cannot see any of those.
2. **Show the sum.** Write it so they can check it in their head. "At your 140 dollar
   consultation, that is X." A visible calculation invites a correction, and a
   correction is a reply. A bare total invites an eye roll.
3. **Anchor deliberately low and say that you have.** A floor beats a headline.
   "Even at one a month" survives being wrong. "You are losing 40,000 a year" does
   not, and it only has to be wrong once.
4. **No number is better than a soft number.** If the inputs are not there, drop to a
   unit instead of a total. "One booking" and "a standing weekly order" are both
   honest and both land. `NO_STRONG_ANGLE` still applies, and so does silence on the
   maths.

**The monetary figure Raka wants, and the only honest way to build one
(2026-09-18).** His instruction, "monetary value that they're losing because of the
problem they have, highly educated calculation with near 100 percent accuracy".

**Say this plainly to yourself first. Near 100 percent is reachable on the INPUTS and
never on a TOTAL.** A total loss figure needs their traffic and their conversion rate.
We cannot see either, and a number resting on a guessed conversion rate is fabrication
in a suit. So we do not produce totals. We produce a **floor** built from inputs that
are each independently verifiable, and we show the arithmetic so the owner corrects it
rather than dismisses it. A floor the owner cannot argue with beats a headline he can.

### The public registers, which is the part we have been ignoring

Every lead in a European company has a statutory filing somewhere. This is the closest
thing to a 100 percent accurate input that exists and it costs one fetch.

- **UK, Companies House.** `find-and-update.company-information.service.gov.uk`.
  Search the name, then the company number gives filing history, accounts type,
  incorporation date, SIC codes and officers.
- **Netherlands, KVK.** **Germany, Bundesanzeiger** and `unternehmensregister.de`.
  **Belgium, KBO/BCE** and the Nationale Bank filings. **France, Infogreffe** and
  `annuaire-entreprises.data.gouv.fr`, which publishes filed accounts for many SARLs.

**What the accounts TYPE alone tells you, and it is a legal definition rather than an
estimate.** A UK company filing **micro entity** accounts is by statute under 632,000
GBP turnover, under 316,000 GBP balance sheet and 10 or fewer employees. That is a hard
ceiling on the business, obtained without reading a single figure. **Small** company
accounts put it under 15m GBP turnover and under 50 employees. Use the band to sanity
check every other number you write, because a floor that implies more revenue than the
band allows is wrong and will be spotted.

**Worked, on a real lead.** RISK AVERSE SURVEYORS LTD, company number 11848113,
incorporated 26 February 2019, registered in Rochdale which matches Katie's site. Seven
consecutive **micro entity** filings, most recent to 28 February 2026. SIC codes 41100,
68310, 71122 and 71129. So, near 100 percent certain, this is a business trading over
seven years, under 632,000 GBP, with ten people at most. **And micro entity accounts do
NOT disclose turnover**, which is the honest ceiling on this source. You get bounds and
a trend, never revenue.

### The three inputs, and what each is worth

1. **Their unit price. Near 100 percent when they publish it.** Off their own site or a
   marketplace listing they control. Yolanda publishes 502 to 965 euro workspaces on
   yoosoffice.nl. The spa lists a 140 dollar consultation on Fresha. This is the single
   most valuable input and it is usually sitting there.
2. **Their scale. Near 100 percent from the register.** Accounts type, years trading,
   officer count, number of sites, employees on their own team page.
3. **The frequency. Never ours to guess, so make it a floor they choose.** Do not model
   a conversion rate. Write "even at one a month" and let the owner supply the real
   number in his reply. That sentence is doing two jobs, it caps our exposure to being
   wrong and it is the most reliable reply bait in the whole message.

### The formula, and the fallback when their fee is hidden

**Floor = their published unit price, times a frequency stated as a minimum, over a
year, sanity checked against the register band.** Write the sum in the message.

**When they do not publish a price, switch to a RATIO and you can still be near 100
percent accurate.** Katie is the case. Her survey fee is nowhere on the site, so any
absolute figure would be invented. But her guide sells at 9.98 GBP and her real product
is a chartered building survey, and **any** survey fee exceeds 9.98 multiplied by any
plausible number of guides she sells in a year. So "one guide buyer who becomes one
survey is worth more than every guide you will sell this year" is a monetary claim, it
is unarguable, and it needed no invented input at all. Reach for the ratio whenever the
fee is hidden.

### The two things that void the whole exercise

**Never model a conversion rate, a traffic figure or a margin.** If the sentence needs
one, the number does not ship.

**Never quantify a credibility, positioning or brand architecture problem.** Nina
Jameson is the case, the angle is strong and no honest figure exists behind it, because
nobody can price a missing link between two domains. Name the moment the deal is lost
and stop.

**Where the numbers actually come from, in order of how much they are worth.**

- **Their own published price.** The strongest input we ever get, because it is
  theirs and it is not arguable. Katie at Risk Averse sells The Ultimate Property
  Guide at an introductory 9.98 GBP through Etsy, and her real product is a RICS
  chartered building survey. The number worth writing is not the Etsy fee, it is the
  ratio. One guide buyer who becomes one survey is worth more than every guide she
  will sell this year, and the guide buyer is by definition mid purchase on a house.
- **A marketplace listing they control.** Spa Holistique lists an Ayurvedic
  consultation at 140 Canadian dollars and Abhyanga from 115 on Fresha, with 794
  reviews. Those are their prices and their volume proxy. Look up the platform's own
  published commission rather than assuming one, then the leak is arithmetic instead
  of opinion.
- **Capacity they state.** Seats, rooms, courts, slots, delivery days, team size.
  A booking business publishes its own ceiling.
- **A named third party benchmark**, cited in the research note with the source, and
  used only to convert their number into an outcome, never to invent the number.
- **A published market rate applied to an asset value they publish themselves.** The
  strongest pattern found on the 2026-09-18 refresh, because both halves are checked
  and neither is ours. VIP International Homes prices its own Beaulieu River house at
  12 million on its own homepage, and UK sole agency commission starts around one
  percent and falls as the value climbs, so one lost instruction is about 120,000 and
  every input is sourced. Pascoe is the same shape from the other direction, the
  careers page carries no salary so the salary comes from the published range and the
  agency fee percentage comes from the published band, both taken at the bottom, which
  gives about 7,000 a seat. Take the LOW end of every published range, always. The
  number's job is to be unarguable, not to be big.

**The honest hit rate, so nobody forces one (2026-09-18).** Twelve live drafts were
re examined for a money figure and **three** could carry one. Theo Hogendoorn is the
instructive failure. He publishes a real minimum, batches of 2.5 to 5 tonnes, and
Netherlands barley malt sits at 187.50 euros a tonne, so the arithmetic runs fine and
produces about 470 euros an enquiry. That number is true and it makes the business
look small, which is worse than no number at all. The rest were partnership or
credibility angles, where the rule above already says no figure exists. So expect
roughly one message in four to carry a number, and treat a batch where most of them
do as a sign that figures are being invented rather than found.

**What quantification must never touch.** Do not put a figure on a credibility,
positioning or brand architecture problem. Nina Jameson at Gehirngerecht is the case,
the angle is real and there is no honest number behind it, because nobody can say what
a missing link between two domains costs. A fabricated figure there would have wrecked
a good message. When the angle is credibility, name the moment the deal is lost and
stop.

**The self check before it ships.** Point at every number in the message and say where
it came from. If the answer for any of them is "a reasonable assumption", delete it and
go back to the unit. And write the source of each figure into the `claims` list on the
queue row, because a number is the single hardest claim to re verify at nudge time.

**Say what Astra actually sells, in plain words, in the message.** A lead who
has only had a connect note has no idea what we do, so a suggestion from us
reads as a stranger giving unsolicited advice. One short line, "I run Astra, we
build websites and the tools that sit on them", before the thing we would do
for them. Then name the artefact concretely, a working version of a specific
screen or a short deck, never a vague "something".

**Write every outward message in English, always (Raka, 2026-09-13).** This
replaces the earlier rule about matching the language of the previous message
in the thread. Dutch, German and French openers are no longer written, even
where the lead is Dutch and the last message we sent them was Dutch, and even
where their own site is in another language. Read their site in whatever
language it is in and quote a phrase from it where that is the evidence, but
write the message itself in English. (Logged after a batch was drafted in
Dutch purely because the leads were Dutch.)

**The ICP is not a country (Raka, 2026-09-13).** Section 3 of
`docs/astra-master-context.md` has never named a geography, and the pipeline
covers the UK, Germany, France, Belgium, the Netherlands, Canada and further
out. Do not preferentially pick Dutch leads when choosing a batch, and do not
treat "based near Raka" as a quality signal. Pick on fit to an ASTRA
proposition, commercial potential, visible urgency and access to the owner,
exactly as section 3 already says. A batch that comes out all one nationality
is a sign the selection was lazy rather than that the pipeline is Dutch.

**Working the Silent accepted backlog (Raka, 2026-09-13).** As of this date
`sentOnly` holds roughly 691 contacts and the queue has 135 worked rows, so
the great majority accepted the connection, received only the generic connect
note, and never heard anything worth replying to. That is the largest untapped
pool in the business and it only shrinks when someone drafts a real opener.
Work it in batches of about ten, each with real per contact research, and aim
the same way as any reply, at a yes to a prototype or a deck. Because these
people never replied, the opener carries the whole load, so it needs the
specific observation, the plain line about what Astra builds, the cost of
doing nothing, and the offer, in that order.

**The opener template (Raka, 2026-09-14). This is the current shape and it
outranks the 65 word template in `docs/astra-master-context.md` section 9.**

```
Hi [name], saw [post] and [compliment it]!

However, [explain the problem in 1 sentence]. This means [cost of doing nothing].

I run Astra agency [what we can do for them specifically] after [my experience].

Shall I [what we are going to send them]?
```

Four blocks, roughly 100 to 145 words, exactly one exclamation mark and it
lives on the first line. What changed versus every earlier version, and the
reason he gave it, is the third block. **Every opener now spends one of Raka's
own credentials**, matched to the lead using the rules in
`docs/astra-master-context.md` section 2A, because a stranger's opinion about
your website is worth nothing until they have earned the right to it. Heineken
and the 23 markets for enterprise, industrial, engineering and operations led
buyers. Eten Maar for owner operators, founders and consumer brands, he built a
food brand from zero with his family and ran the pricing and the P&L. Betty
Blocks or efficy for B2B software, GTM, routing and audience problems. One
credential, never a list, and never stretched into something he did not do.

**Block one always opens on something they published (Raka, 2026-09-16). The
shape is fixed, "Hi [name], saw [post] and [compliment it]".** Not "saw your
company", not "saw your website". A post, an article, a column, a project write
up, something they chose to put out. The reason is that "saw your company" is
what a stranger with a list says, and "saw the piece you wrote about X" is what
a person who actually read it says. It also forces the research to go past the
homepage, which is where the weak openers always came from.

Order of preference when hunting for one. Their own LinkedIn post, their own
site's blog or news or insights, a trade press column or interview they wrote,
then a named project write up on their own site. Never invent a post and never
characterise one you have not actually read.

**The practical limit, and say so rather than fudging it. LinkedIn returns
HTTP 999 to our fetcher, so we cannot read a LinkedIn post directly.** A post
only becomes usable when it surfaces in a web search with enough of its content
quoted, or when they published somewhere fetchable. On the 2026-09-16 batch of
ten this worked for six, Lee Matthews and Lisanne de Jong Vanhommerig on their
own sites, Robert Kenward in Conference News, Ian Probert and Marc Lugand Sacy
on their own sites, Shaun Ascough through a search summary of his posts. For
the other four the nearest published thing was used, a project page or a client
roll, and the batch note said which was which. Falling back is allowed. Quietly
pretending a project page is a post is not.

The compliment must be a real, specific, casual reaction, never reverent
flattery and never a generic compliment.

**One observation, one compliment, and nothing else (Raka, 2026-09-17). His
words, "the rule is just one simple compliment. Thats all".** Block one names a
single concrete thing you actually looked at and reacts to it once. It is not a
tour of everything you found.

The draft that produced the rule listed four things before the compliment even
arrived.

> Hi Balaram, saw the travel clinic form on the Camrose site, it asks for your
> departure date, where you're going, the return date and how many of the family
> are coming. The example in the box is Machu Picchu!

Every item in that list is true and verified, which is exactly why it is
tempting. It still fails, because a person who noticed something says the one
thing that caught them, and a person working from a research file recites the
file. The fix kept the single best detail and dropped the rest.

> Hi Balaram, saw the travel clinic form on the Camrose site, and the example in
> the Places of Travel box is Machu Picchu. Nice touch!

The test before anything is shown. Count the nouns in block one. One thing seen,
one reaction to it. If block one contains a comma separated list, a second
example, or an "and also", cut back to the strongest single detail. The evidence
you cut is not wasted, it belongs in the research note, and the "However" block
is where the rest of the work shows.

The compliment itself is three or four words at the end. "Nice touch!",
"That's thorough!", "Quite a range!". Never a clause, never a verdict on their
craft, never an explanation of why the thing is good.

**And never an interpretation of why their choice was clever (Raka, 2026-09-16).**
His words on the DBL draft, "cringe bro, gonna vomit, never do this". The line was

> saw the DBL project you titled alsof de bebouwing zo ontstaan is, and naming a
> project after the thing you were actually trying to pull off is a proper
> architect's move!

Two separate failures and both recur.

1. **It told a professional what is proper in their own field.** "A proper
   architect's move" from a stranger who builds websites. Never rate their craft,
   never use "a proper X move", "a real X's instinct", "that is how a X thinks", or
   any phrasing that positions us as qualified to judge their discipline.
2. **It performed a clever reading instead of reacting.** It took a project title
   and explained back to its author what was smart about it. Nobody talks like that.
   A real person says what they saw, not what it reveals.

The test. **React, do not interpret.** Name a concrete thing you actually looked at
and stop. The fix that shipped was "saw the DBL project list, a supermarket with 32
flats and a parking garage in the same building, then a white house sitting in its
own reflection. Quite a range!" Two real projects, one plain reaction, no verdict on
his talent.

Phrases to grep out of block one before anything is shown. "a proper X move", "that
is a real X's", "naming it after", "which tells you", "and that says a lot about",
"which is exactly what a X does". Any clause explaining the significance of their own
choice back to them is cringe and it goes. The "However" sentence is one
sentence. "This means" carries the cost of doing nothing in the present tense.
The close names the artefact concretely.

**Block three is two or three short sentences, never one long chain (Raka,
2026-09-16).** He flagged this line as the thing that gives us away.

> I run Astra agency, we build websites and the tools that sit on them, with
> senior developers sitting behind the Dutch side, after a year and a half at
> Betty Blocks watching studios hit this exact wall.

His words, the language is "still AI and not flowy and weird like doesn't make
sense, only AI would create it." Four failures in one sentence and all four
recur across every batch that has ever been written this way.

1. **Four clauses spliced with commas.** It never stops for breath, so there is
   nowhere for the reader to land. Break it. "I run Astra agency. We build
   websites and the tools that go on them."
2. **A word doing two jobs one line apart.** "tools that **sit** on them" then
   "developers **sitting** behind". Read it aloud and it clangs. The fix is
   "tools that go on them".
3. **Internal jargon shipped outward.** "senior developers sitting behind the
   Dutch side" means nothing to someone who has never heard of our structure.
   Say the plain version, "with a senior dev team behind us", and only explain
   the two sided setup if they ask.
4. **The "after X watching Y" tail.** "after a year and a half at Betty Blocks
   watching studios hit this exact wall" is a participle stapled to a
   prepositional phrase. It is grammatical and it is not English anyone speaks.
   Make the credential its own sentence with a subject and a verb. "I did a
   year and a half at Betty Blocks, and a lot of the studios I met there had
   one developer and a service list built for three."

The test is pass 1 of the four pass read back, read it aloud as one message. If
you have to reread a sentence to find the verb, or a clause could be lifted out
without anyone noticing, it is broken. A useful grep before any batch goes out,
count the commas in block three. Three or more in one sentence means rewrite.

**The roast register (Raka, 2026-09-16). A tone override, not a sixth template.**
His words on the EduOs draft, "AND just roast it." When a site is genuinely,
provably dated, the polite version undersells the problem and the owner does not
feel it. So the "However" block is allowed to be funny and blunt, and it stays
inside the same four blocks.

What the licence covers and what it does not.

- **Allowed.** Naming the specific ugly thing out loud, "a stock photo of a man in
  a polo pointing at nothing". Saying a year as a verdict, "looks like 2008 and I
  mean that literally". Letting a verified detail do the joke.
- **Not allowed.** Insulting the person, their team or their product. The roast is
  always aimed at the page, never at the software behind it, and block one still
  opens by crediting something real they built. A roast with no compliment in front
  of it is just rudeness and it loses the lead.
- **Every jab must be a verified fact.** A funny line about something you did not
  actually check is the worst of both worlds. If it is in the message it is in the
  research note with the file name or the page it came from.
- **The dash, colon and no fabrication rules are NOT relaxed.** Only the politeness
  is.
- **It runs longer.** The EduOs draft is 179 words against the 145 ceiling, because
  the evidence is the joke and the evidence takes words. That is accepted for this
  register only.

**How to prove a site is dated, rather than asserting it (Raka, 2026-09-16, "research
how this LOOKS LIKE").** Taste is not evidence and Raka will not accept it. Go to the
raw HTML and bring back artefacts.

The 2000s tells, all greppable.
- **`.fw.png` in an image filename.** The Adobe Fireworks export convention. Adobe
  discontinued Fireworks in 2013, so the asset pipeline is at least that old. EduOs
  had three of six homepage images carrying it, and WordPress rewrites the dot, so
  grep for `.fw_` too.
- **A bought multipurpose ThemeForest theme** in `/wp-content/themes/`, Enfold,
  Avada, BeTheme, The7. Check the CSS `?ver=` before calling the install old, Enfold
  8.1 is current, so the honest claim is "a bought template rather than a designed
  site", not "a 2013 theme".
- **A bundled icon font** like entypo-fontello, and **no Google Fonts at all**,
  which means the theme defaults were never replaced.
- **Bevel, emboss and drop shadow on buttons and headings**, the single clearest
  giveaway that nothing has been touched in a decade.
- **The stock photography idiom.** A person in business dress smiling at the camera,
  someone pointing upward at nothing, code projected onto a face.
- **A demo screenshot with no data in it.** EduOs shipped one reading 0 percent,
  0 percent, 0 percent, which tells a buyer nobody uses the product.

What a 2026 SaaS site looks like, so the contrast is concrete rather than vague.
Dark hero with one electric accent. Oversized assertive headline type, often with a
gradient on the words. The product itself in the hero as a large floating dashboard,
live rather than static, which is the Linear, Attio and Cursor pattern. Feature pills
under the headline. One primary CTA next to a quiet secondary. Bento grids for
features, a logo wall for proof. Stripe and Vercel are the gradient benchmark.
Eduflex's own EduNova page is a textbook example and was used as the comparison.

**Walk the flow, do not just look at the homepage (Raka, 2026-09-16). "I think you
should also open each website and analyse the flow thats important also."** A
homepage read finds how a site looks. Only a flow walk finds where it actually
loses the customer, and that is the better angle almost every time because the
owner can feel it.

The walk, in order, on every lead from now on.

1. **List the real nav** from the HTML and fetch every top level item. Never guess a
   path, that is how a guessed `/over-ons/` turned into an imaginary 404 on EduOs.
2. **Follow the journey a buyer actually takes.** Land, understand what they do,
   look for proof, decide, then try to make contact. Fetch a page at each step.
3. **At every step ask what the next click is.** If a page has no obvious next move,
   the flow is broken there.
4. **Count the forms and the fields per page**, `<form>`, `<input>`, `<textarea>`,
   `<select>`, plus the form plugin's own markers such as `gform`. Note `mailto:`
   and `tel:` links separately, they are not a form.
5. **Open the page named Contact last and check it does the job its name promises.**

What this found on DBL, which no amount of homepage staring would have.
**The page called Contact contains zero forms and zero fields.** 507 characters of
text, an address, a phone number and a `mailto:` link. Meanwhile the homepage and
every service page carry a full Gravity Form, 152 `gform` markers and 20 fields. So
the one page built for the moment a client decides is the only page with no way to
start. Anyone who scrolls all 56 projects, decides yes, and clicks Contact gets
thrown into their mail client, which on most machines means Outlook opening or
nothing happening at all.

The flow failures worth looking for specifically.
- **A contact page with no form**, or a form that lives everywhere except there.
- **A `mailto:` link doing the job of a form.** It fails silently for anyone without
  a desktop mail client configured, and it captures nothing.
- **A portfolio that is a flat archive** rather than a route. DBL has 56 real
  projects and no filter by type, budget or location on the archive page.
- **A dead end page**, no next click, most often About or a single service page.
- **A CTA that changes wording** on every page, so the buyer never learns the move.
- **Proof stranded away from the decision**, testimonials on a page nobody reaches
  at the moment they are deciding.

**Fonts, shapes and colouring, the three Raka names.** Pull them from the CSS rather
than eyeballing. Grep `font-family` for the real stacks, count `#rrggbb` occurrences
to find how many colours actually do work, and check the Font Awesome version in the
CDN URL. DBL runs Font Awesome 5.5.0, a 2018 release, font stacks including one
reading Arial, Baskerville, monospace, and a single flat blue `#0a5791` used 40 times
against a teal `#18a19a` used 10. One colour doing everything is the palette
equivalent of a bought template. Then look at the shapes in a screenshot, because
some things never reach the CSS. DBL's building photos carry soft feathered edges
fading into white, which is a Photoshop and PowerPoint idiom nobody has shipped since
about 2010, and the hero drops white text straight onto a busy roof photo with no
scrim behind it.

**Credit the substance before roasting the wrapper.** DBL has 56 real projects, BNA
membership and project titles like "alsof de bebouwing zo ontstaan is". A roast that
ignores genuinely good work reads as a stranger who did not look. Say the work is
better than the frame around it, because on these leads it usually is.

**The impacts to reach for, because "it looks old" is not a cost.** Pick the one
that bites for that buyer. Procurement, where a committee uses the site as the first
cut and a dated page loses before any demo. Price anchoring, where an old looking
site makes the buyer expect an old price. Hiring, which matters most right after a
rewrite when they need developers. And the contradiction, where the site actively
disproves the claim on it, which is the sharpest of the four. EduOs promises
toekomstbestendig software on a page that looks eighteen years old.

**The reply variant (Raka, 2026-09-14).** When the lead has written to us
first, only the first block changes. Answer their message, then go straight
into the same structure.

```
Hi [name], [answer what they actually said]. I saw [company] and [positive thing]!

However, [explain the problem in 1 sentence]. This means [cost of doing nothing].

I run Astra agency [what we can do for them specifically] after [my experience].

Shall I [what we are going to send them]?
```

Blocks two, three and four are unchanged, credential included. The only
difference is that the opener earns its place by responding to them rather
than by arriving cold. This does not override the reply rules in
`docs/writing-standard-anti-ai.md` ("Reply in context, always"), so if their
last message was a two word thanks, match that energy first and do not dump an
audit on them. The template is for a reply that is ready to carry an offer,
not for every message in a thread.

**Both versions are the standard everywhere (Raka, 2026-09-14).** These two
templates are now the shape for every first real message we send, whether the
lead has replied to us or not, and **the reply agent uses them too**. The daily
inbox triage drafts replies in this shape, the Silent accepted backlog work
uses it, and any batch of openers uses it. There is no separate house style
for replies any more.

**The nudge template (Raka, 2026-09-14). A third shape, for following up on
our own unanswered message, and the only place an emoji is allowed.**

```
[name], did you see this? 👀

[the cost of doing nothing, expanded, until they can actually feel it]

[the artefact, offered in one line, with a frictionless out]
```

This is NOT the opener template and must not be confused with it. It is for the
Stalled tier only, someone who received a real researched message and never
replied. Rules specific to it:

- **The eyes emoji is deliberate and is an explicit override** of the no emoji
  ban in `docs/NO-AI-SLOP.md` and `docs/writing-standard-anti-ai.md`, for this
  first line only. Raka's live instruction outranks both. Nothing else in the
  message carries an emoji. The v0.1 campaign's own automated bump step already
  used this exact line, so it is consistent with what these contacts have seen.
- **The no colon and no dash bans are NOT relaxed.** Only the emoji ban is.
- The middle block is the whole point. Do not restate the observation and stop,
  spend the words on what staying exactly as they are keeps costing, in their
  business, in the present tense, traced to something verified. Name who is
  being lost, at what moment, and why the loss is invisible to them.
- One exclamation mark is the opener template's rule, not this one. Nudges
  carry none.
- Close with the artefact named concretely plus an honest out, "yes or no is
  fine either way", which section 9 already endorses.
- **Never paste the URL again (Raka, 2026-09-21). His words, "never resend the
  link its annoying."** A nudge goes to someone who already has the link, so
  sending it a second time reads as a bot retrying rather than a person
  following up, and it makes the message look like the delivery it is not.
  Name the artefact and say it is still live, "both links are still live and
  still yours", "the version that splits the three is still up where I sent
  it". They can scroll. This binds every follow up to someone who has already
  been sent something, not just the nudge template, and the one place a URL
  still belongs is the first delivery and the closing nudge, where the artefact
  block and its URL line are the whole point.

**The closing nudge template (Raka, 2026-09-15). A fourth shape, the last message
a thread ever gets, and the only place urgency framing is allowed.**

```
[name], you're about to miss [the easiest win] [company] will get all year.

[the artefact, built, live and theirs, described in their own specifics]
[the URL, on its own line]

[the loss, compounding, in their business, in the present tense]

If the timing isn't right I completely understand. But you're missing out on
[the specific impact].
```

**Who it is for, and nobody else.** A lead who asked for the artefact, received it,
and went quiet through at least one chase. Someone who never replied gets the nudge
template. Someone cold gets the opener. Someone who declined gets nothing.

- **It is genuinely last.** After this the thread is closed in
  `state/inbox_digest_log.jsonl` and never messaged again. Sending a further chase
  after promising this was the last one is the thing Michele Legoratto and Antanas
  Juodiskis were both told in writing, so it would be a broken promise on the record.
- **It deliberately runs hotter than `docs/writing-standard-anti-ai.md`,** which bans
  urgency framing and hype. Raka's live call on 2026-09-15 overrides that doc **for
  this shape only**. It is not licence for the house voice to drift, and the opener,
  reply and nudge templates keep the old restraint.
- **No emoji** (unlike the nudge) and **no exclamation marks**. The hook carries it.
- **The colon and dash bans are NOT relaxed.** The artefact URL is exempt as a URL,
  same as the Netlify slug rule.
- **Verify the artefact is still live before naming it.** Fetch the URL, confirm 200
  and that the `<title>` is still theirs. Pointing a closing message at a dead link is
  the worst possible last impression.
- **The middle block must compound.** Not "you are losing visitors" but the specific
  repeat loss. Di Lieto loses a standing weekly order rather than one tray, and their
  own Bake Off win is what delivers the chef to the page that fails them. Zenara buys
  the same customer back every month because matcha runs out monthly and there is no
  subscribe option.
- **End on the impact, never an ask.** The close names what they forfeit and stops.
  No "let me know", no "shall I". A closing message that begs is not a close.
- The four pass read back below still applies, and pass 4 matters most here because
  the hook line is the easiest thing in the whole playbook to write twice.

**Send the recorded text, never a retyped one (2026-09-21).** On the send all batch
block one of the Ineke Geenen opener was retyped in Dutch at send time, "saw de regel
op je visie pagina dat mondverzorging", while the draft saved in the queue was correct
and in English. It broke the English always rule and it would have shipped had the
contact been connected. Only the refusal caught it. **Copy `openerText` out of the
queue row verbatim into the send. Never compose from memory while sending**, because
the four pass read back happens at drafting time and a retype skips all four.

**Read every message back four times before it goes anywhere (Raka, 2026-09-14).
The two questions are his. Does this make sense? Does this sound weird?** This
is a hard gate on all three templates, not a polish step, and it comes after
the research is done and before the draft is shown or sent. Four separate
passes, because each one catches a different failure:

1. **Read it aloud, as one message.** Every sentence must parse on its own. If
   a clause dangles, or you have to reread to find the verb, it is broken.
2. **Read block three against block four.** The credential has to be the reason
   we can do the specific thing we are offering. If they have nothing to do
   with each other, the sentence is a non sequitur even when it is grammatical.
3. **Read block four alone and ask what arrives.** If a stranger could not draw
   the thing we are about to send, it is not named concretely enough.
4. **Read the whole batch in a column, blocks three and four side by side.** A
   batch that repeats the same closing line is a template, and Raka's rule
   against openers reading as a template applies to the last line as hard as
   the first.

The failures that produced this rule, all from the 2026-09-14 batches, and all
of them sent before anyone read them back:

- **Remarx.** "we build websites and the tools on them, so the one thing you
  say you don't do, after a year at Heineken where I sat on the side that had
  to justify picking a supplier." Three fragments stapled together. It does not
  parse. Pass 1 catches this instantly.
- **Navis Bio.** "we'd build the way in." Names nothing at all. Pass 3.
- **SURGEOR.** "we'd turn Siblu into a written engagement." Siblu is a client,
  not a thing you convert. It sounds wrong because it is wrong. Pass 1.
- **Motzu Labs.** "the page that lives after the show" is vague, and the
  credential spent was routing and follow up, which has nothing to do with
  building a post event page. Pass 2 and pass 3.
- **LIVSHO.** "after two years on the acquisition side of a B2B platform" is
  mush. It names no company and no thing he actually did, which is the whole
  point of spending a credential. Pass 2.
- **Bamboo Invest** got "rebuild the entry", **MicroMovements** got "build the
  business side its own proof", **Fervonic** got "the evidence layer under the
  claim". All three are abstractions where a page should be named. Pass 3.
- **Eleven of twelve** closed with the identical "Shall I put a version
  together and send it?" Pass 4.
- **Thrive and L'Office** were both offered a proof page and both spent the
  Eten Maar pricing and P&L credential, which is the credential for a pricing
  problem. Pass 2.

If a pass fails, rewrite and run all four again. A message that is factually
perfect and reads badly still loses the lead, because the reply is a judgement
about whether we are any good at this, and the message is the only sample of
our work they have seen.

**Never nudge without re-verifying the original claim first (Raka, 2026-09-14).**
A nudge repeats a month old observation, so it is the single easiest place to
say something that has stopped being true. On 2026-09-14, re-checking nine
stalled leads before drafting found that **Ad-Wise had rebuilt their entire
site and fixed the exact problem we flagged**, that half of the Infinity
Biosciences claim was no longer true, that the Edouard Koehn angle had always
been weak because selling through retailers is standard for haute horlogerie,
and that the DOCRA lead could not even be tied to a confirmed domain. Two of
nine were dropped and one became a short note congratulating them on the fix,
which is a better message than the nudge would have been. Re-verify, then
write. And when they have fixed it, say so and offer the next thing instead.

**Write the domain and the claim into the queue row at send time, or the nudge
cannot be written at all (2026-09-17).** Pushing the nudge sweep back into the
26 August cohort produced ten candidates and exactly **one** sendable nudge, and
none of the six failures were about the leads. They were about what we did not
write down.

- **Four had no recoverable domain.** The rows said `openerText: "see inbox
  thread 2026-08-26"` and the research note said "full research trail in the
  earlier rows", which turned out to be nothing. Guessing cost real tokens and
  produced wrong companies twice. `suntail.com` and `precisioncomponents.ca` are
  both 114 byte parked pages. **`cocoon.nl` is "Cocoon Security Validation", a
  physical penetration testing firm, not Twan Bierens' Cocoon Subsidiesoftware**,
  which is the wrong-domain trap firing on a nudge rather than an opener.
- **One had already replied and the queue did not know.** Craig Walton answered
  on 26 August with "I resigned from the chambers some time ago thanks" and was
  answered gracefully the next day. His row still read `SENT` with no reply
  recorded. A nudge about a chamber he had left would have been humiliating.
- **One was our own error.** See the Thrive Physio row. The 26 August opener said
  "there are no actual prices anywhere" and the site has a Pricing page in the top
  nav listing $200 and $175. A nudge repeating it hands the lead a reason to
  dismiss us, so it was withheld.

So, two hard rules.

1. **Every `SENT` row carries `domain`, `openerText` in full, and `claims`, a list
   of the specific factual assertions the message made, each one written so a
   later session can re-test it without rereading the site.** "see inbox thread"
   is not a research note. A claim that cannot be re-tested cannot be nudged, and
   an unnudgeable lead is a lead we paid to research and then abandoned.
2. **Check the thread with `get_inbox_conversation` before every single nudge, per
   contact, never from the queue and never from the list endpoint.** The queue's
   status goes stale and `lastSentMessagePreview` hides replies and follow ups.
   Craig is the proof.

The success case from the same sweep shows what it is worth when the record is
good. Padelwerk's claim was time stamped and specific, the July banner still ran
on the homepage seven weeks after it expired, and the re-check turned up a
6 September news post proving the site is actively maintained and only that banner
was left up. A sharper nudge than the original opener, and only possible because
the claim was concrete enough to re-test.

**Go beyond the website angle (Raka, 2026-09-14).** The "However" block does
not have to be a website problem. Earlier guidance in
`docs/astra-master-context.md` section 9 says the opener always names a
website problem and offers a prototype. That is now too narrow and this
supersedes it. Diagnose the actual business bottleneck per
`docs/astra-commercial-angle-master.md` and pitch whichever ASTRA line fits,
Grow, Optimise, Innovate or Build Squad. A missing internal workflow, an
operations gap, a routing or follow up problem, a proof or credibility gap, a
pricing or payer question left unanswered, or spare build capacity for another
agency are all valid "However" blocks. Worked examples from the 2026-09-14
batch, Nicura got a payer question rather than a design critique, Cryptofocus
got audience capture, JigiWeb got a Build Squad partnership rather than any
criticism of his site, and Emerge Numerics got a routing gap between two
properties they already own. What does not change is that the problem must be
specific, verified, and one the owner would recognise unprompted.

**The research bar is close to 100 percent certain (Raka, 2026-09-14), and it
is checked by trying to disprove your own claim.** A homepage read is not a
site read. Before any opener goes out, open the specific page that would make
the claim false, not the page that made you believe it. On 2026-09-14 a
falsification pass over 23 finished openers found **eight were factually
wrong** and one lead had to be dropped, all of them from claims taken off a
homepage summary. The failures worth memorising:

- Claimed a software site never linked the consultancy. Its `/services` page
  linked it in plain text. Only `/about` had been checked.
- Claimed "no name, no face" twice. Both companies named their founders with
  photographs on an About or A propos page.
- Claimed the only contact route was a phone number. There was a contact form,
  with a referrer type selector on it.
- Claimed no email capture anywhere. The newsletter sat on the contact page.
- Claimed no prices and no before and after photos on a clinic site. Both were
  on the individual treatment pages, just not the homepage.
- Claimed a portfolio had two projects. It had three, each with a gallery, plus
  a named testimonial. That lead was dropped rather than rewritten.

The checklist. Fetch every nav item and list the real URLs rather than guessing
paths. Open the page that could disprove the claim. Grep the raw HTML for the
thing you say is missing, using the words the site would actually use, in its
own language. On an absence claim, check at least two pages plus the page type
the user actually lands on, since an article page and a contact page differ. If
the claim survives all of that, write it. If it does not, rewrite the angle
honestly or return `NO_STRONG_ANGLE`, and never keep a broken claim because
the message reads well. Several corrected openers came out **stronger**,
because crediting what the lead already did right proves we actually looked.

**Never open with the gap ritual (Raka, 2026-09-13).**

**Never open with the gap ritual (Raka, 2026-09-13).** An earlier version of
this section told openers to start by acknowledging that we connected a while
back and never sent anything useful. That is deleted. Raka's words, "who would
say that, no human does that." Nobody announces their own neglect before
speaking. Open on the observation about their business, straight in, and vary
the first line lead to lead so a batch does not read as a template. The fact
that the thread is cold needs no narration, the specificity of the observation
carries it.

Getting lead data cheaply: `search_campaign_leads` with `campaignId` and a
`limit` returns a lean row per lead (name, company, job title, LinkedIn URL) at
roughly eighty tokens each, so a hundred at a time is affordable and is the
right way to pick a batch. The heavy full record with `companyDescription` and
`summary` comes back only when querying a single lead by `id`, so use that for
the ten you actually chose. Note that the connect note is not always written as
an activity, so `get_inbox_conversation` can return an empty list for a real
Silent accepted contact; that is not evidence of anything.

Retry the `BLOCKED_NEEDS_INFO` rows periodically, because some unblock on their
own. Spa Holistique Ayurveda sat blocked on a stuck redirect and now resolves,
though only at the locale path `/fr` since the root serves a client side
redirect. Most of the rest stay blocked for a better reason, genuine identity
ambiguity, and those stay untouched under the never guess rule.

Before choosing what to pitch a given lead, read
**`docs/astra-commercial-angle-master.md`** — the canonical commercial
reasoning playbook. It is the layer between prospect research and the message,
and it governs angle selection for outreach openers, reply drafting, and
prototype decisions. Diagnose the business bottleneck first, generate two to
five candidate angles, score and red-team them, and pick the strongest, or
return `NO_STRONG_ANGLE` when the evidence does not justify one. Do not start
from a service and hunt for a reason to sell it, and never manufacture pain.
The angle library (G/O/I/B patterns), the evidence to problem to angle chain,
and the no-strong-angle rule live there.

**Before building any prototype, deck or site, read Stage L of
`docs/prototype-build-spec.md`** (the WOW bar and craft standard, written
2026-09-13 from the Acquitas build Raka drove through eight rounds). The test
is his: would this make the client think "holy shit I need to hire these
fuckers", AND does it continue the narrative we already told that person. The
rules that get broken most often are these. Never say in words that we
understand their business, prove it through how the thing is made. Every
section carries a real photograph or a real sourced graphic. Study actual
reference pages before art direction instead of designing from memory. The
hero needs more than one pass and must be seen at phone width. Production
ready means they can publish it next week, with any assumption flagged rather
than shipped silently. Audit copy phrase by phrase for things nobody would
say, and count the contractions. And verify by loading the page cold with
error capture, never by forcing reveal state, which is how a completely blank
deck once shipped to a client.

Raka's own background, and which credential to spend on which kind of lead,
is in **`docs/astra-master-context.md` section 2A**. Read it before writing a
message that needs to earn the right to an opinion.

## The five angles, and the order to test them in (Raka, 2026-09-21)

This replaces the four signal list above as the working procedure. The four signals stay
true, this is how you actually go and find them, in order, on every lead. **Run
`tools/site-audit.js` first**, which does all five passes in one load and writes a JSON
plus a desktop and a phone screenshot.

```
node tools/site-audit.js https://theirdomain.com theirslug
```

It reports the stack, the dated tells, the flow counts, the GDPR state measured before
any click, the social links and the page health. **It reports observations, never
verdicts.** The verdict is yours and it comes after you have opened the screenshots.

### Angle 1. It LOOKS old, and looking is the test

Raka's instruction is explicit and it is about the eye before the grep. "It shouldn't
just be unwritten on text, like that it is from WordPress. It should first look like
that it's outdated, doesn't have a lot of things, doesn't have a lot of flow."

So the order is **open the screenshot, form a view, then go and find the proof.** Never
the other way round. The bluedesk miss on 2026-09-17 came from a confident grep and one
screenshot killed it.

What you are judging in the screenshot, and write down which of these you actually saw.

- **Density and emptiness.** A hero with three lines of text and nothing else, a page
  that ends after two screens, a services list with no pictures. "Doesn't have a lot of
  things" is Raka's phrase and it is a real read. Count the sections.
- **The era of the shapes.** Bevel, emboss, gradients on buttons, drop shadows under
  headings, rounded corners on everything, feathered photo edges fading to white. Those
  are 2008 to 2012 idioms and nobody has shipped them since.
- **Type.** System fonts untouched, Arial or Verdana doing the headlines, centred
  paragraphs, all caps navigation, tiny body text.
- **Stock photography idiom.** A person in business dress smiling at the camera. Someone
  pointing upward at nothing. A handshake. Code projected onto a face.
- **Phone width.** Open the phone screenshot too. A site that was never made responsive
  is the single most visible age marker to an owner, because he looks at his own site on
  his phone.
- **Flow, or the absence of it.** No obvious next click. A CTA that changes wording on
  every page. A page that dead ends.

Then the greppable proof, which `site-audit.js` collects automatically under `era`.
Fireworks `.fw.png` exports, Flash, jQuery 1.x, tables used for layout, Font Awesome 4
or older, Bootstrap 3 or older, a bundled entypo or fontello icon font, an XHTML or
HTML4 doctype. **Every jab in the message has to be one of these, named.** Taste is not
evidence and Raka will not accept it.

**What 2026 looks like**, so the contrast in the message is concrete. Dark hero with one
electric accent. Oversized assertive headline type. The product itself in the hero as a
large live panel, the Linear and Attio and Cursor pattern. Feature pills under the
headline. One primary CTA beside a quiet secondary. Bento grids. A logo wall.

### Angle 2. The stack is old, and then, the same day, look at their social

Raka put these together deliberately. "After testing if the website is old, test if they
have a social media presence, because social media is really important these days."

**2a, the stack.** `site-audit.js` reports it. What matters commercially, in order.

- **A WordPress version well behind current.** State the year it shipped, not the version
  number, because a number means nothing to an owner. WP 5.5 shipped in 2020. Intexso was
  still on it on 2026-09-21.
- **A bought multipurpose theme** in `/wp-content/themes/`. Enfold, Avada, BeTheme, The7,
  Divi, Astra, Flatsome, HighendWP. **Check the CSS `?ver=` before calling the install
  old.** A current Divi is not a 2013 theme. The honest claim is "a bought template
  rather than a designed site", which is a positioning point, not an insult.
- **A page builder holding it together**, WPBakery, Elementor, Divi, plus a long plugin
  list. A plugin stack is a maintenance and a security story.
- **A drag and drop SaaS builder**, IONOS MyWebsite NOW, Wix, Jimdo, GoDaddy, Weebly.
  This is the cheapest tier of website there is and it is a real signal about how much
  thought went in. neuLEAN and Rivière Consult both ran MyWebsite NOW.

**2b, the social presence, and this is the new half.** `site-audit.js` lists every social
link the site carries. **Then actually go and open them**, with
`node tools/social-audit.js <tag>`, which takes those links and reads each account.
Listing the links is not the audit. Opening them is.

**What is reachable from this container, tested 2026-09-21. Do not rediscover it.**

| Platform | State | What comes back |
|---|---|---|
| **LinkedIn company page** | **readable in Chromium** | Follower count and tagline. **This corrects the belief held in this repo since August that LinkedIn is always 999.** The 999 is what curl and WebFetch get. A headless Chromium load of a `/company/` page renders the signed out view. |
| LinkedIn personal `/in/` | still 999 | Nothing. Posts still need a web search that quotes them back. |
| **YouTube** | fully readable | Subscribers, video count, and per video title, view count and age. The richest source we have. Load the `/videos` tab. |
| **X** | readable over curl | Followers, following and the joined date, straight out of the meta description. |
| **Facebook** | readable in Chromium | Followers, following, the About text and the most recent post date, behind the login prompt. |
| TikTok | half | The profile resolves, so **a dead handle is detectable**, but a live profile's posts are walled. |
| Instagram | walled | 200 with a login page over curl, HTTP 429 in Chromium. |

**The hard rule that falls out of that. An account we could not read is UNKNOWN and never
goes into a message as though it were empty.** Instagram is the one this will bite on.
What we CAN prove is enough on its own, and each of these is a finding by itself.

What to record, per platform they actually use.

| Check | What you are looking for |
|---|---|
| **Does the site link out at all** | No link anywhere is itself the finding |
| **Last post date** | 90 days with nothing is the industry definition of dormant |
| **Cadence** | Three posts in a week then five months of silence is worse than nothing |
| **Handle consistency** | Same name across platforms, or three different ones |
| **Visual consistency** | Same logo, same colours, same crop as the website, or a different brand entirely |
| **Who posts** | The company page is dead and the founder's personal profile carries everything, which is extremely common and is a real structural point |
| **Does it point anywhere** | A bio with no link, or a link to a page that no longer exists |
| **Does the site show it** | An active Instagram that the website never embeds or links |
| **A dead handle** | A link in their own footer to an account that no longer resolves. Frizverm links a TikTok that returns "couldn't find this account" |
| **A zero** | Zero followers on a platform they chose to put in their footer. Frizverm's Facebook is 0 and 0, their X is 0 followers and 1 following, joined March 2026 |
| **Effort going nowhere** | The opposite shape and the more useful one. CoLean has 52 YouTube videos, 17 subscribers and single digit views per video, alongside 430 LinkedIn followers. The work is real and the distribution is in the wrong place. **And falsify before you write it**, the first draft of that observation said their site embeds none of the videos, which is false, colean.fr carries one youtube-nocookie embed. The true version is that one of the 52 is surfaced |
| **The bio against the website** | Frizverm's Facebook calls them a product led innovation hub working on data privacy and social connectivity. Their website sells facilities management and industrial maintenance. Two different companies, same name |

**The two shapes worth naming, because they need opposite messages.** A business with
empty accounts has a credibility problem and the message is about what a buyer finds.
A business with real output and no audience has a distribution problem and the message
is about work that nobody is seeing, which is a far warmer thing to receive. Check which
one you have before writing, because getting it backwards is insulting.

**The two numbers worth citing, and cite the source in the research note.** Sage
Marketing's 2026 State of B2B Social Media reports that **68 percent of B2B buyers review
a vendor's LinkedIn before agreeing to a first sales meeting** and **54 percent have
eliminated a vendor from consideration because of an inactive or low quality social
presence.** These are a named third party benchmark, which the quantification rules
permit, used to convert their situation into a consequence. They are never used to invent
a number about the lead's own business.

**The honest caveat, and say it plainly rather than quietly ignoring it. Astra's live
site does not sell social media (checked astraagency.nl on 2026-09-21).** The three
services there are Grow, "websites and funnels that generate leads", Optimise, "internal
tools that save time", and Innovate, "a dedicated team for continuous development".
Branding and social media strategy appear inside Grow in `ASTRA_AGENCY_Deck_Short.pdf`
but nowhere on the live site, and **the site carries no social links of its own.** So:

- **Use the social finding as diagnosis, not as the offer.** It is superb evidence that
  a brand is inconsistent or invisible, and inconsistency is a Grow problem we do sell.
- **Do not offer to run their social.** We have no published social service, no case and
  no price for it, and offering one we cannot deliver breaks the no fabrication rule as
  surely as a made up figure would.
- **The offer that is honest** is the thing the social finding proves they need. One
  brand system that holds across the site and the feeds. A page the social actually
  points at. A site that shows the feed it already has. That is Grow and it is on the
  price list.
- **Flag it to Raka** if he wants social media to become a real line, because the site
  and the deck currently disagree and the site is the public one.

### Angle 3. GDPR, which is the most checkable angle we have

This is new and it is the strongest of the five on European leads, because it is binary,
it is verifiable in one page load, and the owner can check it himself in thirty seconds.

**What the law actually turns on.** Consent must come BEFORE anything non essential
loads. The violation regulators fine most often is scripts and cookies firing on page
load, before the visitor has touched the banner, usually through third party embeds such
as video, maps, chat and fonts that were never routed through the consent tool. The
ceiling is 20 million euro or 4 percent of global turnover, and in 2025 France's CNIL
alone issued 486.8 million euro in fines with 21 organisations sanctioned specifically
over cookies and trackers. SMEs are not the ones getting the headline fines, but the
exposure is real and the complaint driven route is cheap for anyone to use.

**How we measure it, and it is exactly what `site-audit.js` does.** Fresh browser
context, no stored consent, load the page, **touch nothing**, then record what already
happened. Never click accept, because that destroys the evidence.

The findings it reports, strongest first.

1. **Trackers fired before any click.** Google Tag Manager, Google Analytics, Meta Pixel,
   Hotjar, Clarity, LinkedIn Insight, TikTok, an embedded YouTube or Google Map. This is
   the finding. Wellstep on 2026-09-21 fired googletagmanager and google-analytics on
   load with three cookies already set and no reject option anywhere.
2. **Google Fonts loaded from Google's servers.** The Landgericht München I judgment of
   20 January 2022, case 3 O 17493/20, awarded a visitor 100 euro in damages because the
   site sent their IP address to Google by embedding fonts remotely, and the court
   rejected the legitimate interest argument on the basis that the fonts can be self
   hosted for nothing. It is still the basis of warning letters in 2026. **This makes any
   German lead loading remote Google Fonts a live, citable exposure.** Zeunert Consulting
   does exactly this.
3. **No reject option, or a reject that is harder to find than accept.** A prominent
   Accept All next to a refusal buried behind clicks or set in small print is itself
   grounds for a fine. The audit compares the rendered area of the two buttons.
4. **No banner at all** while trackers load.
5. **No privacy policy link**, or one that points at `#` and goes nowhere, which is what
   Wellstep's does.
6. **A privacy policy that does not name the processors actually in use**, the host, the
   mail tool, the CRM, the review widget. Read it against the third party host list the
   audit prints.

**Then translate it, because the owner does not care what a cookie is.** This is where
most of the damage would be done, so the table is not optional.

| Do not write | Write |
|---|---|
| your site sets non essential cookies prior to consent | your site starts tracking people before it asks them |
| Google Tag Manager fires on DOMContentLoaded | Google is watching your visitors from the first second, before anyone agrees to it |
| remote Google Fonts leaks the client IP to Google LLC | your fonts are pulled from Google on every visit, which sends them every visitor's address |
| the CMP lacks a symmetrical reject control | there's a big Accept button and no way to say no |
| Art. 6(1)(a) has not been satisfied | nobody actually agreed to any of this |
| a €20m or 4% administrative fine | one complaint from one visitor is all this takes |

**Three hard limits on this angle, and they matter more here than anywhere else.**

1. **Never state a legal conclusion.** Write what loaded and when. "Three trackers ran
   before I touched the banner" is an observation and it is true. "You are in breach of
   the GDPR" is a legal opinion we are not qualified to give and it reads as a threat.
2. **Never write like a scanner and never imply we ran a compliance audit on them
   uninvited.** One sentence about what happened when the page opened. That is all.
3. **The tweak test bites hardest here.** Installing a consent banner is an afternoon.
   The fault is the PROOF, the job is behind it. A site whose tracking was never set up
   properly is usually a site nobody has owned since launch, and that is the thing worth
   selling.

**And it is regional.** This is an EU, UK and EEA angle. It is not an angle for a
Canadian or US lead unless they are visibly selling into Europe, and saying so makes us
look like we did not check where they are.

### Angle 4. The site falls short of the business target

Raka's fourth. "If the website has shortcomings in order for them to reach their business
targets, for example to convert or something else."

This is the angle that needs step 1 of the research order to have been done properly,
because a shortcoming is only a shortcoming against a target, and the target comes from
the person. Work out what this specific business is visibly trying to do, then ask what
the site does to that.

| What they're visibly trying to do | What to go and test |
|---|---|
| Get enquiries | Is there a form on the page where the decision happens, or only on Contact. Field count. Steps. Does a `mailto:` do a form's job |
| Sell online | Cart, checkout steps, guest checkout, delivery and returns stated, payment methods shown |
| Take bookings | Is there a real booking system or a phone number and office hours |
| Take donations | Amount and payment on one screen, or a set of instructions |
| Launch or crowdfund | Can a backer see the thing. Is the list actually being captured |
| Sell a considered B2B service | Is there one case with a number on it. Can the reader forward anything |
| Hire | Does the careers page exist and does it carry a salary and an apply route |
| Open a new market or country | Does the other language version actually exist and work end to end |
| Sell software | Is the price on the page called Price |

**The defect is the start, never the message.** Run the so what ladder, three rungs
minimum, until it hits money, risk or their position against a named competitor. And run
the two tests. Could their existing web person fix it in an afternoon, in which case it
is a task and nobody buys an agency for a task. Does the consequence show up in revenue,
cost, a lost deal, who they can hire, or how the market ranks them.

### Angle 5. Certificates and the address not opening

Unchanged from 2026-09-19 and still on the list. A certificate that does not cover the
domain, a self signed certificate, a bare domain that throws a browser warning while the
www works, an expired certificate, a holding page on a live domain. Diagnose it with the
three command procedure above, and **always rule out our own proxy first**, because a TLS
error seen through the egress is never evidence about the lead's site.

### Read the thread before you research, not just before you nudge (2026-09-21)

**The rule used to say check `get_inbox_conversation` before every nudge. That is too
late. It is now before every message of any kind, including a first opener, and it happens
BEFORE the research, not after the draft.**

**What went wrong.** `state/accepted_pool_v01.jsonl` is built by taking everyone whose
campaign state is `linkedinInviteAccepted` and subtracting everyone who has a row in
`state/silent_accepted_queue.jsonl`. That subtraction is only as good as the queue, and the
queue does not cover the messages sent in July and August before it was being written
properly. So a lead who was pitched on 2 August and never replied looks untouched.

On 2026-09-21 that sent a cold first opener to **Naila Kouidri and Olivier Oomen**, both of
whom had received a real researched pitch on 2 August, and **Floris Otterman**, pitched on
5 September. Three more, **Jean Madaule, Marlon Aird and Yagiz Abik**, were drafted as cold
openers and only caught because an unrelated transport error forced a thread check before
the send. Every one of those people had an outstanding offer sitting unanswered, and we
wrote to them as though we had never spoken.

**Why a bulk check does not save you.** The obvious fix is to pull every
`linkedinSent` activity for the campaign and subtract those contacts. **It does not work
and it produced a false all clear.** `GET /api/activities?type=linkedinSent` returned 298
records covering 12 July to 17 September, and the 2 August messages to Naila, Olivier, Jean
and Marlon were **not in it**, even though their threads show those messages carrying that
same campaign id. The endpoint under reports. Use `emailTemplateName` to tell a connect note
(`linkedinInvite`) from a real message if you use it at all, but never treat its silence as
proof of anything.

**So, the procedure, and there is no cheaper version.**

1. **Before researching a lead, call `get_inbox_conversation` on its `contactId`.** One call.
2. Read every activity. The connect note is the one that starts "saw your business and
   thought it was cool". Anything longer than that is a real message and changes everything.
3. **If a real message exists, the lead is Stalled, not Silent accepted.** It gets a nudge
   that references the original concept, or a new angle that acknowledges the last one. It
   does NOT get a cold opener, because arriving as a stranger to someone you pitched seven
   weeks ago is the one outreach mistake with no recovery.
4. If the only activity is the connect note, or the thread is empty, proceed as Silent
   accepted.
5. **Write the thread check into the queue row**, as `threadCheckedAt` and
   `priorRealMessages`, so the next session does not pay for it again.

**And treat the pool file as a candidate list, never as a clean list.** It says who accepted.
It does not say who we have already spoken to.

### Before any of the rest, three sentences you are never allowed to write (Raka, 2026-09-21)

1. **"Your website isn't working."** Not unless `tools/site-audit.js` returned a
   reachability verdict AND a control host loaded through the same egress in the same
   minute AND you looked at the screenshot. Almost every time we have thought a site was
   down, **it was our end**. A tab that did not load, a proxy hiccup, a bot wall aimed at
   our address, a page that builds itself in JavaScript, a gate we did not click. Their
   site was fine for everyone else the whole time.
2. **"Your page is empty."** Only with a screenshot of an empty page in front of you. See
   the Solvio section below, which cost a live lead.
3. **Anything you assumed.** If you did not open it, fetch it, count it or click it in
   this session, it is not a fact and it does not go in the message. The three worst
   assumptions of 2026-09-21 were all shaped like this. That the Ciaccia gallery ran three
   cities because its name listed two and a third had appeared. That L'MANE had no policy
   pages because a regex did not match their footer wording. That AutoDevPro was
   permanently blocked because it was blocked once.

**And when it really is our side, say so in the message.** A sentence that owns our own
tooling costs nothing and is always true. "I couldn't get it to load" is honest whatever
the cause. "Your site is down" is a claim about them that we usually cannot support.

### The hard gate. NEVER ANY FALSE CLAIM (Raka, 2026-09-21, his capitals)

This outranks everything else in this file. A message is not ready because it reads well,
it is ready when **every single sentence in it has been checked against the page it came
from, on the pass immediately before it is shown.** Not remembered from research an hour
earlier. Re opened.

The procedure, and it is mechanical so it cannot be skipped by feeling confident.

1. Take the finished draft and go through it **sentence by sentence**, not claim by claim,
   because the false bits hide in subordinate clauses and in numbers used as adjectives.
2. For each one, name the file or URL it came from and open it again. If you cannot name
   where it came from, it is not a fact, it is a memory, and it comes out.
3. **Every number gets recounted.** Three addresses turned out to be two. Fifty two videos
   was right only because the channel page was reopened.
4. **Every link claim gets the href opened.** Not the label, the href.
5. **Every absence claim gets the page that would disprove it opened**, in the site's own
   language, using the words that site would actually use.
6. Anything that survives goes in the `claims` list on the queue row, written so a later
   session can re test it. Anything that does not survive is **deleted, not softened.**

**A hedge is not a fix.** "It looks like there may be no..." is still a false claim wearing
a hat, and it reads worse. Cut the sentence and send a shorter message.

**If removing the false claim kills the angle, the angle is dead.** Go back to the evidence
or return `NO_STRONG_ANGLE`. Sending a weaker true message is always allowed. Sending a
strong false one is never allowed, because the lead can check it in ten seconds, and the
one thing every message has to prove is that we are careful.

### NEVER say a page or a site is empty, missing or not loading. It usually is loading (Raka, 2026-09-21)

**This cost a live lead and it is the single most expensive mistake in this repo.** Niklas
Hanf at Solvio replied to a researched message with "The Solv(io)er isn't empty 😅". He was
right. We had told a founder that the page he built himself was blank, and then offered to
build it for him.

**What was actually there.** `solvio-workshop.de/problem-solvioer/` opens on a language
chooser, two buttons, Deutsch and English. Click one and a full ten question
Selbsteinschätzung appears, "Wie löst du Probleme?", four to five minutes, built as a
self contained bilingual assessment posting to Formspree. **52,912 characters of markup.**

**Why every tool we had said empty.** The whole widget is an inline `<style>` plus
`<script>` inside the WordPress content, and it renders its own UI. So the served HTML
carried 244 characters of readable text, the raw fetch stripped the scripts, and the
Chromium render measured a body 717px tall. Three separate signals all said "nothing here"
and all three were measuring the wrong thing. **We measured height and text length instead
of looking at the screenshot and clicking the one obvious button.**

**The rule, and there are no exceptions to it.**

1. **An emptiness claim requires a screenshot that shows an empty page.** Not a short text
   extraction, not a small body height, not a low byte count, not a failed fetch. A
   picture. If you have not looked at the picture, you do not have the claim.
2. **A single failed or odd request is never evidence.** Retry it, then run the DNS and
   plain http checks, then render it. `nextfood.ai` returned `000` once and is a live,
   modern site. theaterstudiokrip.nl was genuinely broken and that took three
   confirmations plus a control host in the same minute before it was written down.
3. **`site-audit.js` now refuses to let this pass quietly.** It compares readable text
   against the markup in the main content area, counts inline scripts and styles inside
   that area, and looks for gate buttons such as Deutsch, English, Start, Weiter, Enter,
   Choose your language. If any of those fire it prints **CONTENT MAY BE HIDDEN FROM THIS
   READER, DO NOT CALL THIS PAGE EMPTY OR THIN** and names the gate. That warning is a
   hard stop, not a hint.
4. **Click the gate.** A language chooser, a start button, an age gate, a cookie wall, a
   "view the site" splash. Click it, wait, screenshot again, and only then form a view.
5. **Prefer the softer true sentence anyway.** "I couldn't get past the language chooser"
   is true whatever is behind it and it invites a correction rather than a rebuttal.
   "Your page is empty" is checkable in one click and makes us look careless when it is
   wrong, which is exactly the opposite of what the message is for.
6. **The worst version of this is offering to build what they already built.** Before any
   offer, ask whether the thing being offered might already exist behind something you did
   not click.

### The corners that get cut, and the check that catches each one (Raka, 2026-09-21)

His instruction, "make sure you do it thoroughly and don't skip corners, and take time to
analyse it, redraft if needed." Every line below is a corner that was actually cut in the
batch of five drafted that afternoon, and every one was caught by going back over the work
rather than by being careful the first time. **Run this list against a finished draft
before it is shown, not while researching.**

1. **Running the site audit and not the social one.** Listing the social links is not the
   social pass. `site-audit.js` finds the links, `social-audit.js` opens them, and until
   the second one has run the social angle does not exist. Two of the five drafts had the
   wrong angle entirely until the accounts were actually opened.
2. **Guessing a handle.** `instagram.com/<companyname>` is the same mistake as guessing a
   nav path. Ciaccia Levi's real handle is `ciaccialeviparistorino`, which is nothing like
   the guess, and the guess returned a page that meant nothing. **Take every social URL
   out of their own HTML**, or out of a search result, never out of your head.
3. **Counting something that was never counted.** The Ciaccia draft said "three addresses"
   because their listed name says Paris and Milan and a third city had appeared. Reading
   the actual contacts page showed **two**, Paris and Torino, with Milan appearing only as
   a fair location. Any number in a message gets recounted on the page it came from.
4. **Believing your own summary of a link.** The Red Rabbit draft was going to say the
   button labelled nextfood.ai does not go to nextfood.ai. The nav item does not, the hero
   button does, and the draft would have been half false. **Open the href.**
5. **Calling something dead on one failed request.** `nextfood.ai` returned `000` on the
   first curl and it is a live, modern site. One timeout is never evidence. Re test, then
   run the DNS and plain http checks, then look.
6. **Skipping the screenshot because the grep was convincing.** red-rabbit.de reads as a
   confident dark navy and red design with real art direction. Any "looks dated" line would
   have been nonsense and one screenshot said so.
7. **Characterising something you did not read.** A draft said a CoLean video was a proper
   walkthrough rather than a teaser. Nothing was watched. React only to what is actually on
   the screen, which there was a numbered series, E2 through E9.
8. **Writing an absence claim from one page.** "There's no X" is the most likely sentence
   in the whole message to be wrong. Merkaardig's missing quiz was a working JS quiz.
   CoLean's site does embed one video. Check the page that would disprove it.
9. **Letting a walled account read as empty.** Instagram returns 429 and TikTok walls live
   profiles. Unknown is unknown and it stays out of the message.
10. **Not re verifying an identity when the record disagrees.** lemlist had Jochen under NF1
    SmartTech and the domain is red-rabbit.de. The Impressum settled it. Where lemlist and
    the domain disagree, the statutory page wins.

**And the rule underneath all ten.** When a finding gets better the longer you look at it,
keep looking. Red Rabbit went from "five cookies" to two empty proof sections on two
different properties, which is a far stronger message, and it only appeared on the third
pass. A first draft is a hypothesis.

### How to choose between them, because you will usually find more than one

**One grand thing beats five small ones.** Pick the angle that lands hardest on the
number the person in step 1 is measured on, use one defect as proof, and leave the rest
in the research note where it makes the deck credible later.

Rough order of force when several are true.

1. **Angle 4**, a shortcoming against what they are visibly trying to do this quarter.
   It is the one the owner already half knows and it is the easiest yes.
2. **Angle 3**, GDPR, on an EU lead. Specific, checkable, and slightly uncomfortable in
   a useful way.
3. **Angle 1**, it looks old, when it genuinely does and the roast register is earned.
4. **Angle 2**, stack and social, which is usually the best supporting evidence rather
   than the headline, with one exception, a brand that is invisible or inconsistent
   across its own channels is a Grow problem in its own right.
5. **Angle 5**, certificates, which is nearly always proof rather than the sale.

And if none of them is honestly there, the answer is `NO_STRONG_ANGLE`. Five angles is
five more chances to manufacture pain, and the no manufactured pain rule outranks every
line of this section.
- Serve locally when a render genuinely will not work,
  `(cd <folder> && python3 -m http.server 8788 &)`. To QA something already
  deployed, `curl` the live HTML and every asset into a folder and serve that copy.
- **`tools/deck-qa/qa.js`** is the harness, committed so you do not rewrite it.
  `BASE=http://127.0.0.1:8788 node tools/deck-qa/qa.js`. It reports page errors,
  console errors, any response at 400 or above, how many reveals fired naturally,
  broken images, exercises an embedded quiz if `#opts` exists, and finds the element
  causing any 420px overflow while ignoring anything inside an `overflow-x:auto`
  scroller. Writes `qa-mobile.png`.
- **`tools/deck-qa/shots.js`** screenshots every section plus the full page, so you
  can actually look at what you built before Raka does.
- **Verify by cold load with error capture, never by forcing reveal state.** Forcing
  `.in` is how a completely blank deck once shipped to a client.

### Images

- **Photographs.** Unsplash is reachable. Find candidates with WebFetch on
  `https://unsplash.com/s/photos/<query>`, which returns real photo ids with alt
  text. Download with
  `https://images.unsplash.com/photo-<id>?w=1800&q=72&fm=jpg&fit=crop`. Curl the
  search page directly and you get nothing, the ids only come back through WebFetch.
- **Cropping and compression.** Pillow is installed. Crop to the aspect ratio you
  need with an anchor rather than resizing and squashing, then save JPEG at quality
  72 to 82, `optimize=True, progressive=True`. Keep a whole deck's imagery under
  about 1 MB.
- **Extracting real screenshots from a PDF.** PyMuPDF is installed as `pymupdf`.
  `page.get_images(full=True)` then `pymupdf.Pixmap(doc, xref)` pulls the embedded
  originals at full resolution, which is how the Unilever, GPay and MWX screenshots
  came out of the Astra deck. `page.get_text()` for the text layer and
  `page.get_pixmap(dpi=110)` to render a page when you need to see the layout.
  `pdftoppm` is **not** installed, so the Read tool cannot render a PDF directly.
- Note `pip install pypdf` fails in this container on a broken `cryptography`
  binding. `pymupdf` installs fine and does more anyway.

### Deploying

- Call the Netlify MCP deploy operation to get a fresh `npx` command with a
  `--proxy-path` token, then run it from a clean folder containing only what should
  ship. **The token expires**, so a `401 Unauthorized` means fetch a new command, not
  that anything is wrong.
- The folder needs `netlify.toml` with `[build]` and `publish = "."`.
- Then verify, every time, per the hosting rules below.

### Deck HTML, the architecture that works

One self contained HTML file, inline `<style>` and one inline `<script>`, plus an
`img/` folder when there is photography. No external CSS or JS.

- **Tokens on `:root`.** Ink, paper, one accent pulled from the client's own logo
  with Pillow, muted greys, a sans and a mono stack.
- **Sections alternate** dark, light, light2, so the eye gets a rhythm. A dark
  section holding a table puts the table in a white rounded box.
- **Reveals.** `.rv{opacity:0;transform:translateY(20px)}` plus `.rv.in`, driven by
  one `IntersectionObserver` over `.rv,h1,h2`. Hero lines use an `.ln>span`
  translate with staggered delays.
- **Tables must be wrapped** in `.tw{overflow-x:auto}` with `.tw table{min-width:520px}`,
  otherwise they blow out the mobile viewport.
- **Diagrams are inline SVG** with a `viewBox`, `role="img"` and a real `aria-label`.
  Give any SVG wider than the column a `min-width` and put it in a `.tw`.
- **Everything collapses to one column** under `@media(max-width:860px)`.

The gotchas that cost time on the WisTree build, all real:

- **Inserting a style block by replacing a common selector duplicates it** if that
  selector appears twice. `.shot` ended up defined twice and the second copy won.
  Anchor style insertions on something unique, and grep for duplicates after.
- **SVG text with a start anchor near the right edge clips.** Use
  `text-anchor="end"` and position from the right.
- **Images at different aspect ratios misalign the headings under them.** Fix a
  height and use `object-fit:contain` with a background, rather than letting each
  card size itself.
- **A background photograph plus a generative canvas fights itself.** Drop the canvas
  to about 0.2 opacity and push it to the edge, or lose one of them.
- **A band label placed at the same y as its boxes gets overlapped.** Lay diagram
  bands out with the label above the band, and check it rendered.
