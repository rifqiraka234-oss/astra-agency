# The GTM engineering product line, first thinking (5 Nov 2026)

Raka, 5 Nov, "I want to basically sell the GTM engineering stuff ... teaching GTM engineering, levelling up your GTM
engineering skills, the revenue analysis ... strategy session ... GTM automation and outbound and loyalty flow
engineering ... maintenance and also the CRO part time ... or part time RevOps manager". A friend asked him to teach
him GTM engineering, and he's been thinking about a course.

This is a thinking doc, not a decision. Prices below are my suggestions for him to change. Nothing here goes to a lead.

## Why this fits us better than it might look

1. **Raka's own record is a GTM record.** Global GTM and Campaign Manager at Betty Blocks (ICP segmentation,
   enrichment, scoring, routing, follow up loops, playbooks across SDR, AE, Marketing and RevOps). Sales and Channel
   Operations Manager at efficy, a CRM vendor. Data and insights lead at Heineken, 23 markets. Source,
   `docs/astra-master-context.md` section 2A. The website work borrows his credibility, this spends it directly.
2. **We've been running a GTM engine on ourselves for four months, and it's all in this repo.** Research agents, the
   enrichment pipeline, the opener template with machine checked gates (`tools/check-drafts.py`), per thread lemlist
   pulls (`tools/lemlist.py`), inbox triage every two hours, a weekly scorecard, A/B tested openers. The numbers in
   `docs/gtm-plan.md`, 330 cold pitches to 25 Oct, yes rate 4% in September and 15% in October, reply rate 30% in
   October. That's a case study and a curriculum, already written.
3. **The ICP we already target is the buyer.** Tier 1 in the GTM plan is owners of B2B companies, 5 to 50 staff, in
   NL, Flanders, DACH and the UK. Those companies need pipeline more than they need a new homepage, and "more meetings
   with the right people" touches how they make money, which is the RULES 0E bar.

**The honest gap.** We have no paid project yet (gtm-plan, still true in the 2 Nov logs). So the proof is of the
process and the reply rates, not of revenue closed. Every claim about our own engine has to say that, or it'll fall
over on the first call.

## The one thing to avoid, the menu

HotGreen got a proposal with everything in it and took nothing (gtm-plan section 6). Six offers on one page is that
menu again. So the line is split by **who's buying**, and each buyer gets one door.

| Buyer | What they want | Their door |
|---|---|---|
| A person who wants to become a GTM engineer (Raka's friend, SDRs, marketers, ops people) | A skill and a job | The course |
| A practitioner already doing it | To get better and faster | The level up |
| A company that wants its team to do it | Trained people, in house | Team training |
| A B2B owner who wants more pipeline | Meetings and revenue | The Revenue Health Check |

Two sides, then. **Learn** (the academy) and **Revenue Engine** (done for you). They don't share a pitch, a page or a
campaign.

## Learn, the academy side

| Offer | Shape | Suggested price | Notes |
|---|---|---|---|
| GTM Engineering Foundations | 4 to 6 week cohort, live sessions plus builds, each student ships a working outbound engine on their own target list | €400 to €750 a person | The friend is student one. Run it free or cheap for him, record it, turn it into the course |
| Level Up | Shorter, advanced. AI research agents, enrichment and scoring, quality gates, reply handling, measuring what works | €750 to €1,500 a person | Where the repo's tooling is the material |
| Team training | Foundations or Level Up delivered to one company's team, on their own CRM and their own ICP | €3,000 to €8,000 a programme | The bridge to the Revenue Engine side, a trained team still needs the system built |

The curriculum, roughly, in the order we actually learned it.

1. ICP and the list. Who to target, and the targeting analysis that showed consumer says yes and can't pay.
2. Research that holds up. Source ranking, the falsification pass, never trusting a snippet.
3. The message. One problem start to finish, the opener template, why fixed wording beats clever wording.
4. Automation and AI agents. Enrichment, research at scale, the checks that stop an agent sending nonsense.
5. The inbox. Replies, nudges, follow up limits, getting to the call.
6. Measuring it. The scorecard, A/B tests, reading a reply rate honestly.

Everything in the repo is real client and lead data, so course material is rebuilt on made up companies. No lead
names, threads or screenshots leave the repo.

## Revenue Engine, the done for you side

A ladder, so a business can start small and each step sells the next.

| Step | What it is | Suggested price |
|---|---|---|
| 1. Revenue Health Check | The deep analysis. ICP, funnel and conversion by stage, the process today, the stack and the data in it, where deals stall, the recommended process, flows and connections. Ends in a strategy session where we walk them through it and name the one thing to build first | €1,500 to €3,500, credited against step 2 if they go ahead |
| 2. Build | The engine itself. AI powered outbound, enrichment and scoring, lead routing, follow up and reply flows, CRM hygiene, and the loyalty side (onboarding, retention, reactivation and referral flows for existing customers) | €4,000 to €15,000, scoped from the Health Check |
| 3. Run | Monthly maintenance, monitoring, list refreshes, prompt and message updates, a monthly numbers review | €750 to €2,000 a month |
| 4. Fractional RevOps or CRO | Raka part time, a day or two a week, owning the revenue process and the team running it | €2,500 to €5,000 a month |

The strategy session on its own (the €375 one from the Acquitas proposal, `logs/meetings/2026-10-07-Acquitas-proposal.md`)
can stay as the small paid start the GTM plan asks for, but the Health Check is the real front door.

## Things Raka has to decide, or check

1. **efficy.** He's employed there as Sales and Channel Operations Manager. A fractional RevOps or CRO role, and
   possibly a paid course on CRM and GTM, could collide with his contract (side work, non compete, IP). Worth reading
   the contract before step 4 is offered to anyone.
2. **Capacity.** Only Raka has this skill on the team. The course scales, the fractional seat doesn't. I'd cap
   fractional at one client until the rest runs.
3. **Which tools we teach and build on.** What we actually run is lemlist, Claude agents and git state files. If the
   offer names Clay, HubSpot, n8n or Make, we should have built on them first, or we're selling something we haven't
   done.
4. **The brand.** Inside Astra (a "Revenue" line next to Grow, Optimise, Innovate, Build Squad) or a separate name for
   the academy, since course buyers aren't agency buyers. My lean is the academy under Raka's own name, because
   people buy a course from a person, and Revenue Engine under Astra.
5. **The targeting rule flips for the academy.** The GTM plan says don't pitch agencies, growth consultants and
   recruiters because they sell what we sell. For the course they're exactly who buys. Separate campaign, separate
   rules.
6. **The prices.** Everything above is my starting point, his call as always.

## A first month, if he wants to start

1. **Week 1.** Teach the friend. Two or three sessions on Foundations, recorded, with his questions written down. That
   tests the curriculum before anyone pays.
2. **Week 1 to 2.** Write our own case study, "how we built our outbound engine", with the real numbers and the
   honest caveat on revenue. It's the proof for both sides.
3. **Week 2.** Build the base deck (outline below) and one landing page per side.
4. **Week 3.** Offer the Health Check to three Tier 1 B2B owners already in a warm thread, as the new angle when the
   website angle doesn't fit.
5. **Week 4.** Open a small paid Foundations cohort, 5 to 8 people, announced through Raka's LinkedIn. His posts on AI
   agents doing real work while he's at the gym are already this audience.

## The base deck, an outline

1. The problem. B2B teams buy tools and still don't get meetings.
2. What GTM engineering is, in one plain sentence.
3. Who we are. Raka's record (Betty Blocks, efficy, Heineken) and the team.
4. Our own engine, the case study with real numbers.
5. Learn. Foundations, Level Up, team training.
6. Revenue Engine. Health Check, Build, Run, Fractional.
7. How a Health Check works, step by step, and what they get at the end.
8. Prices, or "from" prices.
9. How to start. One step per buyer.

The deck follows `docs/build-and-deck.md` and the no Claude look rules once the structure is agreed.
