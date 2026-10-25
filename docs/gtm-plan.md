# The GTM plan, from 26 Oct 2026

Raka, 25 Oct, "youre in a big charge of the gtm system and plan ... do whatever you think for us to get meetings that
will get sales". This is that plan. It's built on the review (`docs/reviews/2026-10-25-gtm-outreach-review.md`), the
targeting analysis in it, and the three proposals that were lost, each read in full in Gmail on 25 Oct.

Sending, prices and campaign settings stay Raka's word, as always. Everything else here is how both sessions work from
now on.

## Where we are, 25 Oct

| Stage | Count | Source |
|---|---|---|
| Cold first pitches since 14 July | 330 | lemlist threads, `tools/lemlist.py audit` 25 Oct 09.18 UTC |
| Said yes | 26 (7.9%) | every reply reread by hand |
| Got a build | 24 of the 26 | `state/prototypes.jsonl` |
| Meetings from those yeses | 4 (HotGreen, Tomatoworld, Qualigraf, Lisanne) | `state/meetings.jsonl` |
| Meetings from warm chats | 3 (Curalis, Monad Edge, Acquitas) | same |
| Proposals sent | 3 (Tomatoworld, HotGreen, Acquitas) | Gmail |
| Sales | 0 | |
| Booked and still open | Lisanne, Fri 30 Oct 10.00. Qualigraf, Wed 4 Nov 12.00 Amsterdam | Calendar |
| Accepted leads truly open for a first message | 35, of which about 4 fit the profile below | queue, latest row per contact |

## Why there are no sales yet, in their own words

Every lost proposal stopped for the same two reasons, they couldn't or wouldn't spend, and the person who decides
wasn't in the room.

| Deal | What they wrote | What it tells us |
|---|---|---|
| Tomatoworld | "as a foundation, we unfortunately do not have the budget ... already in discussions with our existing website partner" (6 Oct) | A foundation, with an agency already in place. The call ran with the interim comms person, the no came from someone else |
| HotGreen | "focus on quick wins we can make to the website in-house, so we'll be holding off on any longer-term projects" (14 Oct) | The call was with the Engagement Manager while the founder was away. The proposal was a menu of everything, so they picked nothing |
| Acquitas | "Your website price is too high." "I paid £500 for my website." Still no at £1,500 (9 to 14 Oct) | A one person firm before its first deal. No budget, and the price came as a shock after the call |

Curalis was an intro with a founder still building, followed up with "two links and nothing else". Monad Edge was
cancelled by us and never rebooked.

**So the fix is upstream of the proposal.** Meet people who can pay, with the person who decides on the call, and say
the price on the call, not three days later in a PDF.

## 1. Who we go after

The targeting analysis, 329 of 330 pitches matched to lemlist's lead records, then every company relabelled blind by a
separate read of its description and site (who pays them), without seeing any outcome. Yes rates by group.

| Group | Yes | Note |
|---|---|---|
| English speaking B2B (UK, Canada) | 11 of 45 by lemlist's label, 12 of 70 by the blind read | Best by both. HotGreen and Qualigraf came from here. Since September 3 of 46, so it rests mostly on the summer |
| Dutch, German, Swiss and Austrian B2B | 4 of 46, 9% | They reply most (35%) but 6 of their 9 noes were our wrong read of them |
| Professional services, NL and DE | 3 of 34 | Noah, Ulrich, Lisanne. Lisanne said yes to the AI workflow message |
| Professional services, English speaking | 0 of 31, and 0 replies | Mostly marketing agencies, studios, recruiters and consultants |
| Consumer, all countries | 3 of 94 by label, 4 of 89 blind, 2 of 53 where both agree (B2B 15 of 80 there) | No meeting ever came from one. The gap is real but smaller since September (blind, 2 of 63 against 7 of 128) |
| Agencies, studios, marketing firms, recruiters, coaches (blind) | 1 of 32, 3 replies | They sell what we sell |
| France | 3 of 55, 0 of 40 since September | Our messages are in English |
| Belgium | 0 of 19 | Too few to judge. Only 1 Flemish B2B company was ever pitched, most were consumer |
| Since 1 September, by country | UK 4 of 71, Netherlands 2 of 48, Germany 2 of 35 | The same rate in all three. The UK lead was a summer effect |

**The profile, in order.**

**Where (Raka, 25 Oct, "keep dutch and belgium in my opinion for close proximity and maybe germany").** The
Netherlands, Flanders (the Dutch speaking half of Belgium), Germany, Austria and German speaking Switzerland, and the UK
and Ireland. Since September the UK, the Netherlands and Germany convert at the same rate, and close by means a call can
become a visit. Four of the seven companies we've met or booked are Dutch or run from the Netherlands (Curalis,
Tomatoworld, Lisanne, Qualigraf), and Willem's deal is too.

1. **Tier 1.** The owner, founder or CEO of a B2B company in those countries. Software, tech services, industrial and
   manufacturing, wholesale, logistics, engineering, B2B services. 5 to 50 staff, or funded, or clearly trading
   (customers named, staff, an office).
2. **Tier 2.** Law, accounting and clinic owners, only with the AI workflow "did you know" message.
3. **In the Netherlands, Flanders and Germany a wrong read costs the most.** They reply more than anyone (35% for
   Dutch and German B2B) and say so when we're wrong. 6 of their 9 B2B noes were our misread. The RULES 0F and 0G checks
   are the whole game there.

**Don't invite, and don't pitch.**
- Marketing, creative, web, SEO and social agencies, recruiters, coaches and growth consultants. They sell what we sell.
- Consumer businesses, cafes, restaurants, hotels, shops, consumer brands, gyms, leisure, tutoring.
- Foundations, charities and associations, unless they've said they have budget.
- One person firms that haven't made their first sale. Acquitas.
- France, Wallonia and French speaking Brussels, until Raka decides on a French message.
- Anyone who isn't the owner or the person who decides. 25 of the 84 accepts that lemlist shows as waiting were already
  closed as not the owner or not a fit.

**Budget signals to look for in research, at least one.** Staff on LinkedIn or the site (5 or more), a raise or a
grant, an agency or paid tools already in use, job ads, named customers that are companies, more than one office or
country. Write the one found into the gate as `budget: <signal> | <URL>`. check-drafts fails a first message dated 2026-10-26 or
later without it.

## 2. Getting leads in

**The campaigns inviting people now point at the wrong group.** W1b ("Owners of new 1-10 consumer businesses on DIY site
builders") and W1c ("established consumer businesses on DIY site builders") are both running and both consumer. W1b gave
2 yeses from 44 pitches, both from its few B2B leads.

**The campaign Raka sets up in lemlist (his call), Tier 1 first.**
- Country, the Netherlands, Belgium limited to the Flemish provinces (Antwerp, East Flanders, West Flanders, Flemish
  Brabant, Limburg), Germany, Austria, Switzerland, the United Kingdom, Ireland. One campaign per language area keeps
  the numbers readable, NL and Flanders, DACH, UK and Ireland.
- Titles, Owner, Founder, Co-Founder, CEO, Managing Director, Eigenaar, Oprichter, Directeur, Zaakvoerder,
  Geschäftsführer, Inhaber, Gründer.
- Company size, 2 to 10 and 11 to 50.
- Industries, Software Development, IT Services and IT Consulting, Technology Information and Internet, Industrial
  Machinery Manufacturing and other Manufacturing, Wholesale, Engineering Services, Transportation and Logistics,
  Business Consulting only where it's not marketing. LinkedIn's "Manufacturing" also holds consumer food, drink and
  beauty brands, so research checks who pays them before anything is written.
- Exclude, Marketing Services, Advertising Services, Design Services, Staffing and Recruiting, Hospitality, Restaurants,
  Retail, Education, Wellness and Fitness, Non-profit Organizations.
- The same connect note as now. 20 to 30 invites a day is enough, because research is the limit, not volume.
- W1b and W1c paused, or narrowed to B2B the same way.

**Speed.** A first message within 2 days of the accept. Leads pitched more than a month after accepting said yes 1 time in
46. Older accepts get a light chat, not a pitch.

## 3. The first message

- **SKETCH stays** (`docs/opener-template.md`). The A/B test was dropped on 25 Oct.
- **Tier 3 gets the AI workflow "did you know" shape**, a sourced cost of their role, not a site critique.
- **Every gap passes RULES 0F and 0G before it's written.** In NL and DE especially, a gap that could be a choice is
  better left out than stated.
- One plain bump after 3 days, then quiet. Never a third message inside a week.

## 4. After a yes

The build is what gets the meeting. Qualigraf and Lisanne both booked after seeing theirs. It's wasted on people who
can't buy. So the build goes to the people who can.

1. **The budget check comes before the build.** If the lead is Tier 1 or 2 with a budget signal in the gate, build to the
   Hertling v3 standard. If not, send one screen (a screenshot of the hero) and ask for the call, and build only once
   it's booked.
2. **The delivery message asks for the call**, with two concrete slots, in the same message as the link. "What do you
   think?" alone has left ten builds without an answer.
3. **No answer in 3 days.** One nudge with the slots again, "I'm planning the week and it's getting full". Then it's
   Raka's, per his rule for people who said yes and went quiet.
4. **Answer every warm reply within 2 hours** in working hours. Median wait so far was 17.6 hours.

## 5. The call

Thirty minutes, the owner on it. If the person who said yes isn't the one who decides, ask them to bring that person,
"Would it help if [owner] joined, so you don't have to relay it?"

| Minutes | What happens |
|---|---|
| 0 to 5 | Their goal for the next 6 to 12 months, in their words |
| 5 to 15 | Walk the build against that goal. Let them react |
| 15 to 20 | Qualify. Who else decides? What did the current site or system cost? Is there a budget or a date this has to be done by? |
| 20 to 25 | One recommendation and its price range, said out loud |
| 25 to 30 | The next step booked in the calendar before hanging up, a decision date or a start date |

- **Ask what they paid last time before naming a price.** "I paid £500 for my website" would have saved a week of
  proposal work with Acquitas.
- **Keep the intro short.** One line on Astra, then their business. The Acquitas call spent its first minutes on
  background and the three pillars before getting to his problem.
- **Write the brief and the notes the same day**, as now.

## 6. The offer and the proposal

- **One recommendation, not a menu.** HotGreen got everything and took nothing. A start that fits their budget, then the
  rest later.
- **The price range is said on the call.** The written proposal only confirms it.
- **The proposal goes out within 24 hours.** One page. The problem in their words, the one thing we'll build, the price,
  50% to start, the start date, and at most one optional add on.
- **A small paid start is always on the table**, inside the 500 to 50,000 euro band, so a yes is easy. Raka sets the
  numbers (section 8).
- **Follow up on day 2 and day 5** with a call offer. A "not now" gets a date in `state/raka_reminders.md`.

## 7. Who does what

| Who | What |
|---|---|
| This session (deals and inbox) | Inbox every 2 hours, warm replies drafted within 2 hours, call kits before every call, proposals drafted within 24 hours, the weekly scorecard |
| The other session (research and builds) | Research the open pool in ranked order (`state/next_batch_ranked.md`), SKETCH openers, builds only after the budget check |
| Raka | Every send, every call, every price, the lemlist campaigns |

## 8. What Raka decides this week

1. **The new Tier 1 campaign** in lemlist, and pausing or narrowing W1b and W1c.
2. **A starter price for each of the three things we sell most.** A website start, an AI workflow start, an outreach
   setup start. The Acquitas numbers (€2,500 site, €625 outreach setup, €375 strategy session) are the only ones on
   record.
3. **France and Belgium**, stop or try French.
4. **Email.** Messages to astraagency.nl addresses bounce as spam (9 Oct), and Kristof found our emails in his spam. SPF,
   DKIM and DMARC on the domain before email is used for outreach again.

## 9. The scorecard, every Monday in the pipeline log

Invites sent, by campaign. Accepts. First messages sent within 2 days. Yeses. Builds. Calls booked. Calls held, with the
decider on them. Proposals sent within 24 hours. Wins and euros. The aim for November is 2 calls a week with Tier 1
owners and the first paid project.

## Open pipeline, the deals closest to money

| Lead | Fit | Next |
|---|---|---|
| Qualigraf, Steven Garratt, Group CEO | Tier 1, B2B software to councils in four countries | Call 4 Nov. Call kit with a price range ready by 2 Nov |
| Lisanne de Jong, solo employment lawyer | Tier 3, said "Would love to hear further possibilities and pricing" | Call 30 Oct. Her email still needed for the invite. Call kit ready by 28 Oct |
| Nikolaus (Healthy Secrets), Marco (QuasiScience), Chris Hale (Garnish), Ulrich (justclaims), Matthias (Schumacher) | Said yes or liked the build | Call slots offered 25 Oct, book the moment any of them answers |
| Willem, Hooft & Petiet and ReShare | Tier 2, manufacturing and rentals, 11 to 50 | Prototype live, email to marketing@keypro.nl waits on Raka |
| HotGreen | Tier 1 | "back in touch in the next couple of months" (14 Oct). Recontact mid December |
| Acquitas | Not yet, no budget before his first deal | "in touch in the coming months" (14 Oct). Recontact in January |
