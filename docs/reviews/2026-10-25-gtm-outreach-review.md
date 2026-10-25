# GTM and outreach review, 25 Oct 2026

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
| Said yes | 25 (7.6%) |
| Got a prototype or deck | 23 of the 25 yeses (40 built in total) |
| Meeting held or booked | 8 rows, 7 companies (Curalis twice, Monad Edge, which we cancelled as not a fit, HotGreen, Tomatoworld, Acquitas, Qualigraf, Lisanne) |
| Paid work | none recorded yet |

**The leak is after the yes, not before it.** Of the 23 yeses that got a build, three turned into a meeting (Lisanne,
HotGreen, Qualigraf). Ten builds still have no answer at all. Every build costs most of a day.

## The message shapes, side by side

| Shape | When | Sent | Replied | Yes | Notes |
|---|---|---|---|---|---|
| Free form, July and August | 14 Jul to 31 Aug | 102 | 36 (35%) | 16 (16%) | "thanks for connecting", a line showing we understood the business, one gap, "we sketched X, want me to send it?" |
| Free form, September | 1 to 21 Sep | 112 | 21 (19%) | 1 (0.9%) | longer (median 120 words), critique first in 79% of them, mostly the old accept backlog |
| Five block template | 22 Sep to 12 Oct | 70 | 9 (13%) | 3 (4.3%) | "saw X, looks interesting! However ... This causes ... Especially ...", median 128 words |
| SKETCH ("looks cool! ... I'd suggest") | 12 to 25 Oct | 45 | 12 (27%) | 4 (8.9%) | the current template, median 102 words |
| AI workflow "did you know" | 22 Oct | 1 | 1 | 1 | Lisanne, now a booked meeting |

What the numbers say.
1. **September is where it broke.** Same channel and same kind of lead, and the yes rate fell from 16% to under 1%. Three
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

## What to keep

- One plain bump, then close. The polite closer round of 23 Oct got one reply from eight, and it was a no.
- The live recheck before every send, the thread pull, and the 20 a day cap.
- Hertling v3 quality for the builds that do go ahead.
