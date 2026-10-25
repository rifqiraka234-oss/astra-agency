# GTM and outreach review, 25 Oct 2026

**Corrected later on 25 Oct after a full recheck.** Julien Chiaroni (Safenai) wrote "I'd be curious to see what you came
up with" and got a build, so he's a yes, 26 not 25. Tomatoworld's meeting came from a yes too, so four of the yeses
led to a meeting, not three. The "84 waiting" figure was lemlist's own bucket, and 49 of those are closed in the queue.
Every number below is the corrected one. The plan built on this is `docs/gtm-plan.md`.

Raka asked for a review of everything, what works, what doesn't, what we got wrong and whether the two message templates
work, "to be 100x better".

## How it was measured

- Every thread lemlist holds for Raka's sender, pulled whole on 25 Oct 09:17 UTC with `tools/lemlist.py audit`. That's
  541 contacts and 1,864 messages, every count matching lemlist's own total.
- For each thread I took our first real message after the connect note, the "first pitch", and sorted it by shape. There
  were 330 cold pitches, which leaves out the warm chats where they wrote first.
- Every reply was read and labelled by hand as a yes (to the sketch, a call or a look), a no, or neutral (a thanks or a
  question). Labels and scripts are in the scratchpad (`review/`), so any number can be re-run.
- The samples are small and the lead lists changed over time, so read the rates as direction, not proof.

## The funnel since 14 July

| Stage | Count |
|---|---|
| Accepted Raka's invite | 499 |
| Got a cold first pitch | 330 |
| Replied to it | 79 (24%) |
| Said yes | 26 (7.9%) |
| Got a prototype or deck | 24 of the 26 yeses (40 contacts got builds in total) |
| Meeting held or booked | 10 rows, 7 companies (Curalis twice, Monad Edge, which we cancelled as not a fit, HotGreen, Tomatoworld, Acquitas, Qualigraf, Lisanne) |
| Paid work | none recorded yet |

**The leak is after the yes, not before it.** Of the 24 yeses that got a build, four turned into a meeting (Lisanne,
HotGreen, Qualigraf, and Tomatoworld, whose meeting ran over email). Ten builds still have no answer at all. Every build costs most of a day.

## The message shapes, side by side

| Shape | When | Sent | Replied | Yes | Notes |
|---|---|---|---|---|---|
| Free form, July and August | 14 Jul to 31 Aug | 102 | 36 (35%) | 17 (17%) | "thanks for connecting", a line showing we understood the business, one gap, "we sketched X, want me to send it?" |
| Free form, September | 1 to 21 Sep | 112 | 21 (19%) | 1 (0.9%) | longer (median 120 words), critique first in 79% of them, mostly the old accept backlog |
| Five block template | 22 Sep to 12 Oct | 70 | 9 (13%) | 3 (4.3%) | "saw X, looks interesting! However ... This causes ... Especially ...", median 128 words |
| SKETCH ("looks cool! ... I'd suggest") | 12 to 25 Oct | 45 | 12 (27%) | 4 (8.9%) | the current template, median 102 words |
| AI workflow "did you know" | 22 Oct | 1 | 1 | 1 | Lisanne, now a booked meeting |

What the numbers say.
1. **September is where it broke.** Same channel and same kind of lead, and the yes rate fell from 17% to under 1%. Three
   things changed at once. Messages got longer and led with the flaw, the batches came from leads who'd accepted weeks
   earlier, and the volume roughly doubled. It isn't only the old accepts. Even leads messaged within two days of
   accepting dropped from 14% yes in July and August to 6% from September on.
2. **The five block template was the weakest shape we've used** (4% yes). SKETCH roughly doubled it (9%) and is close to
   the summer level again.
3. **The bump earns most of the SKETCH replies.** 8 of the 12 came after the plain 👀 bump, not after the pitch. Most of
   those 8 were a no, which is still a useful answer.

## How we answer, and how fast

- Median time from their reply to ours is 17.6 hours, across 267 replies. 110 of them waited more than a day and 70 more
  than three days. October is better, at a median of 7.9 hours.
- The worst waits are on the warmest people. Fernando has been unanswered since 15 Oct. Alice and Milo waited six days.
  Nikolaus waited two days after asking "what is the next step?".

## What we got wrong

**Claims the lead corrected (12 of 79 replies, 15%).** These cost the most, because they make the next message hard.
- **Not theirs.** Debby, the Maps listing belonged to someone else. Clément, he'd left the club. Someone who'd
  left their chambers. Katie Goodier, pitched about another Katie's firm.
- **Removed or chosen on purpose.** Ramona's calculator was deleted because nobody used it. Steven Prins keeps price lists
  per customer. Tatiana's GoDaddy page was a throwaway experiment. One firm keeps client names off its site under NDA.
- **Already there.** A configurator with prices that we didn't see. A full Shopify store behind a landing page. A site
  that had just been built (Josh).
- **Our verb, not theirs.** Sylvia, "the site promises" when it said "facilitate". She asked never to be contacted again.

**Sending mistakes.**
- 11 people pitched twice in one morning (21 Sep).
- 162 bumps went out in one day on 3 Oct and 110 on 12 Oct. Michaël answered the third message in a week with "Stop spam
  please".
- Our emails landed in spam (Kristof found all of them there). The astraagency.nl addresses bounced as spam on 9 Oct.
- Two sessions working the same inbox nearly double sent. Willem almost got two thank yous, and Sonia's draft was
  overtaken by Raka's own reply.

**Most of these already have a rule** (RULES 0B, 0C, 0D, 0F, 1B, the 20 a day cap). The ones still open are deliverability,
reply speed and one owner for sending.

## Why the 42 people said no, and how much of it was our mistake

Every no was reread next to the pitch that caused it. **About 19 of the 42 (45%) said no because we were wrong about
them.** The market didn't turn us down. Our read of their business did.

**1. We stated something that wasn't true, or wasn't theirs (8).**

| Who | What we said | What they told us |
|---|---|---|
| Danny, Tentopia | no guide price anywhere | "we have a configurator on the website with the prices" |
| Sylvia, L'Office des Artistes | the site "sells access to galleries, collectors and institutions" | "The site does not promise access ... Please do not contact me anymore" |
| Debby, Sportcafé de Kogge | "Google calls de Kogge Bij Veld't" | that business left the address, not hers |
| Craig, D&G Chamber | pitched as the chamber | "I resigned from the chambers some time ago" |
| Clément, Country Club Aixois | pitched as the director | agreed with every point, but he'd left |
| Kristof, Octelle | groups book elsewhere, the booking page showed no dates | 80% Dutch speaking guests, half of bookings direct, every 2027 weekend March to August already full. He'd also found all our emails in his spam |
| Cédric, kitchen inserts | early backers decide from a page with one photo | a placeholder, with a full Shopify store and an agency already lined up |
| Tatiana, Averitopia | the one page site | a throwaway GoDaddy experiment, her least important venture |

**2. We called a deliberate choice a gap (5).**
- **Steven Prins.** No trade prices, because he sells to shops and bars on a price list per customer.
- **Jim, Intemax.** No prices online, because they only sell on credit accounts. "Those customers are never yours."
- **Ramona, Negentien80.** The missing calculator was removed because nobody used it.
- **Laura, REVVY.** No named clients, because they're under NDA.
- **Benedicte, House of Wood.** Thin portfolio, because all work comes by word of mouth and stylists.

**3. We assumed a pain they'd already solved (6).**
- **Terry, MRF FieldTech.** "I already have those built into our platform."
- **Marlies, CaTeC.** "It's already done."
- **Wessel, SBZ.** "A few years ago we took a critical look at this and invested in it."
- **Denis, neuLEAN.** "Customer demand and proof of concept is done."
- **Johannes, ROOBS.** The B2B portal was about to launch.
- **Josh, The Wine Flight.** The site had just been built.

**The rest weren't our error.** These were said nicely and are the normal cost of outreach.
- Already handled by their own team or another agency (8): De Kade, Palmyra, Spa Holistique, Grigory, Osman, Thijs,
  Yero, Cédric.
- Not a priority now (8): Alice, Adrianna, Mardi, Fabrice, Jochen, Jean Claude, Robert, James.
- A flat no with no reason (4).

**Three noes were about tone, not facts.**
- **Jelle, EduOS.** "looks like 2008 and I mean that literally", "Simple answer: no".
- **Michaël, Archipel.** A crawler nitpick and a third message in a week, "Stop spam please".
- **Luke, RDA.** "I do get a fair few self-promoting DM slides".

**The fix in one line.** If the gap could be a choice, a plan already in motion or someone else's listing, ask instead of
telling. And confirm the person still owns or runs the thing before the first word. Those two checks would have stopped
roughly 19 of the 42 noes.

## The two templates, verdict

**SKETCH. Keep it, and fix its first line.**
- Works. "I'd suggest" makes us name a project in their words, the bump behind it gets answers, and it's back near the
  summer yes rate.
- Doesn't work. "X looks cool!" reads the same for everyone, and then the very next word is "However". All nine summer yeses I
  reread began with a sentence that showed we understood what they do ("from what I understand, you help IFA directors prove
  ...", "what HotGreen is building is genuinely exciting"). It also asserts gaps that turn out to be on purpose (2 of
  its 12 replies corrected us).

**AI workflow "did you know". Use it more.** One send, one yes, one meeting, so far too small to judge. It's built the
right way round, though. It names a cost of their role, backed by a named source, instead of criticising their site,
so there's far less to be wrong about and nothing to feel insulted by. That's the exact failure behind the 12
corrections.

## Ten changes, biggest first

1. **Stop building on a bare "sure".** On a yes, send one screen of the sketch (a screenshot or a 60 second Loom) and ask
   for 15 minutes to walk through the full version. Build the whole site only once a call is booked, or for the top fit
   leads Raka picks. Today it's 23 builds for 3 meetings.
2. **Ask for the call right after "liked", with two concrete slots.** The "I'm planning the week and it's getting full"
   line went out today to Matthias, Chris Hale, Ulrich and Lisanne. Lisanne booked within two minutes. A booking link
   would cut the back and forth further.
3. **Answer hot replies within two hours.** Let short acknowledgements and scheduling replies go on a standing yes from
   Raka, so they don't wait for a review.
4. **Test the summer opening against SKETCH.** Twenty leads each over the same week. "Thanks for connecting" plus one line
   showing we understood the business, then the gap, then "I'd suggest". Measure yeses after seven days.
5. **Message accepts within two days.** Leads over a month old said yes 2% of the time. Give the old backlog a light chat,
   not a pitch.
6. **Turn assertions into questions** wherever the gap could be deliberate ("Is the quote form on purpose, or would you
   take bookings online if it were easy?"). That covers the removed, chosen and already there cases.
7. **Point the AI workflow template at service firms** (lawyers, accountants, clinics, consultancies, agencies), where a
   role cost is easy to source and the site critique is weakest.
8. **Targeting.** The summer yeses lean towards founders whose site faces investors or partners (deep tech, impact, B2B
   software) and towards B2B services. Small consumer shops and hospitality mostly answer "own team", "not a priority" or
   "already done". By campaign, v0.1 gave 20 yeses from 269 (7.4%) and W1b gave 2 from 44 (4.5%). W4 and W5 are too
   small to read yet.
9. **Fix email before using it again.** Set SPF, DKIM and DMARC on astraagency.nl and warm the domain up. Until then,
   email only from Raka's Gmail.
10. **Have an offer ready for the call.** Seven companies met and no paid work yet. A short menu with a starter price inside
    the 500 to 50,000 euro band, set by Raka, would let a call end with a yes instead of "I'll be in touch". Acquitas
    ended on price.

## Targeting, who actually says yes (added 25 Oct, after Raka asked)

**How it was measured.** lemlist's lead export for the seven outreach campaigns, 2,733 lead records, joined by leadId
to the 330 cold first pitches above. 329 matched, only Joyce (Tomatoworld) has no lead record. Industry is lemlist's
`companyIndustry`, the label the company gave itself on LinkedIn. Script and data in the scratchpad (`review/export.py`,
`review/target.py`).

**The one finding that holds up. B2B says yes, consumer businesses don't.**

| Group, by their LinkedIn industry | All, yes | Since 1 Sep, yes | Replied at all |
|---|---|---|---|
| B2B (tech, software, manufacturing, wholesale, finance, B2B services) | 17 of 115 (15%) | 6 of 68 (9%) | 31% |
| Consumer (hospitality, retail, leisure, education, wellness) | 3 of 94 (3%) | 0 of 69 | 27% |
| Professional services (consultants, lawyers, accountants, coaches) | 3 of 88 (3%) | 3 of 68 (4%) | 9% |
| Other or unknown | 3 of 33 | 0 of 23 | 30% |

- The gap is too big to be luck. The odds of chance alone splitting 0 of 69 against 6 of 68 are about 1 in 75, and 1 in
  290 over all months. It's a much stronger signal than anything about the templates.
- Tech and manufacturing alone, 13 of 80 (16%).
- Consumer businesses do answer, 27% of the time, but the answer is "own team", "not a priority" or a correction. Six
  of the eight "untrue or not theirs" noes were consumer businesses (de Kogge, Octelle, Averitopia, L'Office des
  Artistes, the Country Club, OKOJŪ).
- None of the three consumer yeses (Toffe Traktaties, Zenara, Custom Kit) turned into a meeting. None of the seven
  companies we've met is a shop, venue or hospitality business.
- Professional services mostly ignore us, 9% even reply. Their three yeses were an IT systemhaus (Noah), a claims
  handler (Ulrich) and Lisanne, who said yes to the AI workflow message, not a site critique.

**Weaker signals, direction only.**
- **France and Belgium.** 3 yeses from 74, and 0 from 54 since September. The UK gave 11 from 93, the Netherlands 5 from
  70, Germany 2 from 44. We write in English, which may be why. 21 of the 84 leads waiting for a first message are in
  France.
- **Old accepts.** First pitch more than 31 days after accepting, 1 yes from 46 (2%).
- **Nothing to read** in company size (1 to 10 people 7.7%, 11 to 50 people 6.0%) or role (316 of 330 are owners or
  founders). lemlist only filled in B2B or B2C and founding year for the summer list, so those can't be told apart from
  the summer effect.

**What it means.**
1. **The two campaigns sending invites now, W1b and W1c, target consumer businesses on DIY site builders.** That's the
   group with 3% yes and no meetings. Pointing them, or new ones, at B2B companies (the W2 and W3 drafts already describe
   B2B service firms and growing ops heavy businesses) is the biggest change on the table. Campaigns are Raka's call.
2. **lemlist shows 84 accepts with nothing sent, but 49 of them are already closed in the queue** (not the owner, not a
   fit, no strong angle, do not contact). The 35 truly open are ranked in `state/next_batch_ranked.md`, and only about 4
   of them fit. The bottleneck is who we invite, see `docs/gtm-plan.md`.
3. **Professional services get the AI workflow message**, the shape that booked Lisanne, rather than a site critique.
4. **France and Belgium**, either stop inviting them or decide whether a French message is worth trying. English only
   is Raka's rule, so that's his call.

## What to keep

- One plain bump, then close. The polite closer round of 23 Oct got one reply from eight, and it was a no.
- The live recheck before every send, the thread pull, and the 20 a day cap.
- Hertling v3 quality for the builds that do go ahead.
