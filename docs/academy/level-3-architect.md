# Track 1, Level 3. GTM Architect

**By Raka Mulya, Astra Agency.** Self learn and 1:1 with Raka. One curriculum, two ways to take it. The top of the GTM
engineering ladder.

This file follows the rulebook in `docs/academy/README.md`. Lessons follow section 3, assignments and rubrics follow
section 4, quizzes and tests follow section 5, 1:1 sessions follow the template in section 7.4. Every word in bold the
first time it appears is also in the glossary (README section 9), and every lesson still explains it in one plain
sentence.

| Level | Name | You can |
|---|---|---|
| 1 | Operator | Run an engine someone else built. ICP, lists, enrichment basics, signals, AI research, the message |
| 2 | Builder | Build the engine. Sending setup, automation, CRM, allbound and loyalty flows, dashboards |
| **3** | **Architect (this file)** | **Design the whole revenue system, run AI agents in production, run GTM engineering for a team or for clients, and get hired for it** |

> **Skipped the earlier levels?**
>
> You can start here if you scored 70 or more on the free GTM Engineering Score, or if you can honestly tick all six
> lines below. If you can't, take the level named next to the line first, or at least its module on that topic.
>
> - [ ] I've built an ICP with tiers and disqualifiers and a scoring model that splits fit and intent (Level 1)
> - [ ] I've written a research prompt that cites sources and run a falsification pass on its output (Level 1)
> - [ ] I've set up a sending domain with SPF, DKIM and DMARC and run a live sequence in lemlist or similar (Level 2)
> - [ ] I've built an n8n flow that connects three tools, with error handling and a log (Level 2)
> - [ ] I've set up a CRM with a field map, a dedup rule and a routing rule with a fallback (Level 2)
> - [ ] I've built a dashboard and a weekly scorecard and can read a reply rate without fooling myself (Level 2)
>
> Every lesson here still explains each word the first time it's used. What it won't do is teach the click by click of
> a Level 1 or Level 2 build again. Where a lesson leans on one, it names it so you can look it up.

---

## Who this level is for

A **GTM architect** is the person who designs the whole revenue system. That covers how marketing,
sales and customer success fit together, which tool holds which data, how AI agents and signals feed the team, and how
it all gets built, run and improved in short cycles. Raka describes his own job this way. He calls it being a revenue
architect.

| You are | Why this level fits you |
|---|---|
| A Level 2 Builder | You can build each part. Now you want to design the whole thing and lead the work |
| A RevOps or marketing ops person with a few years in | You run the tools already and want to own its design as well as its upkeep |
| A freelance GTM engineer | You get asked for one flow and want to sell, scope and run bigger builds without them going wrong |
| A founder or first commercial hire | You need one person who can see the whole revenue system and decide what to build first |
| Someone about to interview for a senior GTM engineering or RevOps role | You need the architecture, agent and service skills those interviews test, and a capstone to show for it |

**You're at this level when** you can look at any company's revenue team and draw, on one page, how money comes in,
where the data lives, which tool talks to which, where deals leak, and what you'd build first and why. And then you can
build it with AI agents and signals that are checked and logged, run it in sprints with demos, hand it over documented,
and explain it to a sales director in plain words.

**Not for you if.** You only want more meetings for yourself. Take the GTM Seller course (Track 2). You manage a sales
team and want them working this way, without building it yourself. Take the GTM Leader course (Track 3). You can't yet
build a working n8n flow or a CRM with a field map. Take Level 2 first.

## The promise

When you finish, you can design a company's revenue system on one page, build the connected version of it (the
**GTM brain**, which is every tool and data source wired into one system that decides who to contact, when and how), put
an AI agent into production with a test set that proves it works, run a signal loop that learns from every call and
deal, and lead the work as a service or a team. You'll have one architect capstone, presented to and marked by Raka if
you go for Certified, that shows all of it on a real or practice company.

## Before you start

| You need | How much |
|---|---|
| Level 2 skills | See the box above. You'll reuse your Level 2 n8n flow, CRM and dashboard here |
| Time | 6 to 7 hours a week for about 5 weeks self learn, or 90 minutes a week live plus about 4 hours of homework for the 1:1 |
| Tools | Google Sheets, Docs and Slides, HubSpot free CRM, Claude, n8n (cloud trial or self hosted), Clay (free plan or trial), lemlist or your own sequencer, and Gong or Leexi if your company has one. A diagram tool, either Google Slides, Google Drawings or a free whiteboard tool |
| Budget | Mostly what you already have from Level 2. Module 2 runs an AI agent on 20 test accounts, which costs a little in AI usage or Clay credits. Check each tool's pricing page, we don't quote numbers because they change |
| A company to design for | Your employer, a client, a company you know well, or the Routeful practice pack. A real company makes the capstone stronger, but the practice pack is fully supported |
| A sending setup that still works | Your warmed domain from Level 2, if you want the capstone to send live. If it's gone cold, start warm up again on day one of week 1 (Level 2 shows how) |

### Setup, 20 minutes, before Lesson 1.1

1. Open the course Drive folder and click **Make a copy** on each Level 3 template. They are `L3 Revenue map`, `L3 Unit
   economics`, `L3 Data model`, `L3 GTM brain diagram`, `L3 Bible to spec`, `L3 Agent spec and log`, `L3 Eval set`,
   `L3 Signal library`, `L3 Service pack` (scope, spec, sprint plan, runbook), `L3 Capstone plan` and `L3 Evidence log`.
2. Make a folder in your own Drive called `Level 3 [your name]`. Move every copy into it.
3. If you use the practice pack, copy the Routeful pack again (you may have a messy copy from Level 1). You need the 50
   accounts, the CRM export, the 10 call transcripts, the 60 deal pipeline and the 20 account test set RF-101 to RF-120
   with its marker's key from the Level 1 practical test.
4. Open your Level 2 builds in browser tabs and check they still work. Your n8n flow (open the Executions tab), your
   HubSpot CRM and your dashboard. Write down anything broken. Fixing it is part of week 1.
5. Write one line at the top of your folder's first doc. "The company I'm designing for is ..., because ...".

### The practice pack, in one paragraph

**Routeful** is a made up Dutch company in Utrecht with 35 staff. It sells route planning software to transport and
logistics firms in the Netherlands, Belgium and Germany with 20 to 500 staff and their own fleet of 15 or more trucks,
whose planners still use Excel or an old transport management system (TMS). It sells to operations directors, heads of
planning and owners. The sales team is Eva (manager), Sanne and Joris (SDRs, the people who book first meetings), and
Lotte, Daan and Mira (AEs, the people who run deals to a close). The pack has 50 accounts, a messy CRM export of 400
contacts, 10 call transcripts (6 won, 4 lost), last quarter's 60 deals and a 20 account test set. Every company and
person in it is invented. At Level 3 you play Routeful's first GTM architect, hired to design and build their whole
revenue system.

## What you'll be able to do at the end

1. Map any company's revenue system on one page in 30 minutes and mark its three biggest leaks (Module 1)
2. Work out the revenue model and unit economics, and use them to decide what's worth building (Module 1)
3. Design the data model across tools, with one source of truth per field, shared IDs and a sync direction for every
   connection (Module 1)
4. Draw the GTM brain, how CRM, enrichment, signals, sequencer, call intelligence and dashboards connect, and turn a
   sales bible into a system spec (Module 1)
5. Put a multi step research and writing agent into production with Claude, with tables in and out, checks, a human
   approval gate before anything sends, a log and a 20 account test set (Module 2)
6. Know when not to use an agent, and handle cost and failure when you do (Module 2)
7. Design a signal library, score signals by past results and route each one to the right person (Module 3)
8. Run the eavesdrop loop at scale, from calls, posts and reviews back into the ICP, messages and Clay, and tie signals
   to a simple forecast (Module 3)
9. Scope, spec, sprint, demo, document and maintain a build, and price your work (Module 4)
10. Pass a senior GTM engineering interview with a portfolio, a timed take home task and model answers (Module 4)
11. Design, build, run, write up and present a whole revenue system as your architect capstone, with an architecture
    diagram, an agent with a test set, a signal loop, documentation and a 90 day roadmap (Module 5)

## The modules

| # | Module | In one line | You build | Self learn week | 1:1 session |
|---|---|---|---|---|---|
| 1 | Revenue architecture | The whole revenue system on one page, and the design behind it | Revenue map with three leaks, unit economics, data model, GTM brain diagram, bible to spec table | 1 | S1 |
| 2 | AI agents in production | Agents that run on hundreds of accounts and get checked every time | A multi step agent with a human gate, a log and a 20 account test set | 2 | S2 |
| 3 | Signal systems and the eavesdrop loop at scale | Signals that are scored by results, routed to people, and fed by what customers say | Signal library with backtest and routing, a closed eavesdrop loop and a signal tied forecast | 3 | S3 |
| 4 | Running GTM engineering as a service or a team | Scope, spec, sprint, demo, document, maintain, price, get hired | A service pack for one build, a portfolio update and a timed take home task | 4 | S4 |
| 5 | The Architect capstone | Design and build the whole system, run it, write it up, present it | The capstone plan, then the capstone | 4 to 5 | S5, presented in S6 |
| Exam | Level 3 final exam | 25 questions, 40 minutes | | 5 | Reviewed in S6 |

## Duration and price

| | Self learn | 1:1 with Raka |
|---|---|---|
| Video | About 3.5 hours across 5 modules, every lesson 5 to 10 minutes | 5 live sessions of 90 minutes plus a capstone presentation session, recorded for you |
| Builds | About 15 hours of assignments plus 15 to 20 hours of capstone | The same, every build marked by Raka |
| Pace | About 5 weeks at 6 to 7 hours a week, with an optional sixth week for the capstone write up | 6 weeks, one session a week |
| Marking | You mark yourself against the rubric and good example. Optional paid review of a single assignment (€49) | Raka marks every assignment within 2 working days and goes through it in the next session |
| Questions | Questions form, answered within 3 working days. Optional single 1:1 hours (€150) | Async channel or email, answered within 1 working day |
| Certificate | Completed. GTM Architect Certified if you buy the capstone review (€149), present it and pass | GTM Architect Certified, when the capstone and exam pass |
| Suggested price | €299 | €1,500 |

| Bundle | Self learn | 1:1 with Raka |
|---|---|---|
| The ladder, Levels 1, 2 and 3 | €599 | €3,500 |

Prices are suggestions for Raka to set. Tool costs are separate and mostly free plans or trials you already have from
Level 2.

## Self learn plan, week by week (about 5 weeks)

Hours include video, the "do it now" tasks, quizzes and assignments. If a week runs over, carry the rest into the next
week rather than skipping the assignment.

| Week | Modules | What you finish that week | Hours |
|---|---|---|---|
| 1 | Setup, Module 1 | The 30 minute revenue map on day one. Unit economics, data model, GTM brain diagram, bible to spec table. Level 2 builds checked and fixed | 7 |
| 2 | Module 2 | A multi step agent with a human gate and a log, scored on the 20 account test set, one prompt change and a rerun | 7 |
| 3 | Module 3, then Module 5 lessons 5.1 and 5.2 | Signal library with backtest and routing, the eavesdrop loop run once, the forecast sheet. Capstone plan and architecture drawn | 7 |
| 4 | Module 4, capstone build and live run starts | Service pack, portfolio update, timed take home. Capstone system built and switched on | 7 |
| 5 | Module 5 lessons 5.3 to 5.5, capstone run, final exam | Two live weeks finish at the end of week 5 or in an optional week 6. Case study, presentation, exam | 6 to 8 |

Total about 35 hours. If your week only has 4 hours, stretch the plan to 8 weeks. The capstone needs two live weeks, so
if your sending setup has gone cold, start its warm up on day one of week 1.

## 1:1 plan, session by session (5 sessions of 90 minutes, plus the capstone presentation)

Every session runs on the template in README section 7.4 (wins and blockers, homework reviewed on screen, the new module
taught live on your data, homework set, questions). Homework is handed in at least 48 hours before the next session.
Raka sends written notes within 24 hours of every session, with links to the self learn lessons that cover the same
ground.

| Session | Modules | What Raka prepares | What happens in the session | Homework |
|---|---|---|---|---|
| S1 | M1, plus kick off | Reads your intake form. Looks at your company's website, team page and any CRM export you share, or the Routeful pack. Draws his own one page revenue map of your company to compare with yours | Your goals in your own words. You map your company's revenue system live in 30 minutes, then compare with his. Unit economics worked out together. The data model and GTM brain started on your real tools | Assignment 1 (revenue architecture blueprint) |
| S2 | M2 | Marks Assignment 1. Prepares a starter agent workflow in a shared n8n or Claude project and checks your test set is ready | The agent's input and output tables written together. The steps built live. Checks and the human gate added. First run on 5 test accounts, scored against the known answers | Assignment 2 (agent in production with a test set) |
| S3 | M3 | Marks the agent and its eval scores. Pulls your won and lost deals, or the Routeful pipeline, ready for a backtest | Signal library designed on your market. One signal backtested live. Routing rules for signals. Two transcripts run through the eavesdrop loop together | Assignment 3 (signal system and closed loop) |
| S4 | M4 | Marks the signal system. Writes a short fake client brief for your scoping practice | You scope the brief live while Raka plays the client. Spec, sprint plan and runbook started. Pricing method. The timed take home task rules explained. Capstone plan reviewed | Assignment 4 (service pack, portfolio, timed take home) and Assignment 5 (capstone plan) |
| S5 | M5, capstone working session | Marks Assignments 4 and 5. Reads your capstone build so far, logs in to anything you've shared | A full working session on your capstone. Architecture checked against what's really built. Agent test set rerun live. Numbers checked to source. The 90 day roadmap and case study structured | Capstone finished and submitted. Final exam taken alone, timed |
| S6 | Capstone presentation (60 minutes) | Marks the capstone against its rubric before the session. Marks the exam | You present the capstone to Raka as if to a sales director, marked live. Exam reviewed for anything missed | 30 day check in booked |

---

### Module 1. Revenue architecture

**Goal.** Draw any company's whole revenue system on one page, find where it leaks, and design the data model and the GTM
brain that fix it.
**Time.** 44 minutes of video, plus about 4 hours for the assignment.
**You need.**
- The company you're designing for, or the Routeful pack
- Templates `L3 Revenue map`, `L3 Unit economics`, `L3 Data model`, `L3 GTM brain diagram` and `L3 Bible to spec`
- Your Level 2 CRM field map and n8n flow, for reference
- A timer

#### Lesson 1.1 Map a revenue system on one page in 30 minutes (8 min)

**In plain words.** Every company that sells has a revenue system, whether anyone drew it or not. It's the path from a
stranger hearing about you to a customer who renews, plus the people, tools and data along that path. In this lesson you
draw one on a single page in 30 minutes and mark the three places it loses the most money. It's the first thing you'll
do in every new job or client.

**You'll be able to.**
- Draw the five lanes of a revenue system on one page
- Add the tools and the data that move between the lanes
- Mark the three biggest leaks with a reason and a rough size

**What's shown.**
1. A **revenue system** is everything that turns attention into money and keeps it coming. People, steps, tools and the
   data between them. A **leak** is a place where deals, customers or data fall out for a reason you could fix.
2. The page, on screen. Five lanes across the top, left to right. Marketing (people hear of you and leave details). SDR
   (first contact and first meeting). AE (discovery to signed contract). CS, which means customer success, the people who
   look after customers after the sale (onboarding, renewal, upsell). Leadership (targets, forecast, decisions).
3. Under each lane, three rows. **People** (names or roles). **Tools** (what they work in, like HubSpot, lemlist, Clay,
   Gong, Excel). **Data out** (what they pass to the next lane, like "a lead with company and email", "a booked meeting
   with four fields").
4. The arrows. Draw an arrow for every handoff between lanes (a **handoff** is the moment one person passes a lead or a
   customer to the next). Write on each arrow how it happens. "Form fill creates a contact in HubSpot", "SDR books in the
   AE's calendar", "AE emails CS". An arrow with "by memory" or "by email" on it is a leak candidate.
5. Where to get the facts in 30 minutes for a company you don't work at. The website (forms, demo page, pricing page,
   careers page, which shows roles and often tools). LinkedIn (how many SDRs, AEs and CS people, who leads them). Job ads
   (they often name the CRM and tools). For your own company, the CRM settings and one honest colleague.
6. The timer method. Minutes 0 to 10, lanes and people. Minutes 10 to 20, tools and data out. Minutes 20 to 25, arrows.
   Minutes 25 to 30, the three leaks.
7. How to pick the three leaks. For each arrow and lane, ask three questions. Does anything wait here for days? Does
   information get lost here? Does nobody own this step? Then rank by money. A leak before the AE costs meetings. A leak
   after the sale costs whole customers.
8. Screen demo. Raka maps Routeful in 30 minutes on the `L3 Revenue map` template. His three leaks. Inbound demo requests
   wait an average of a day because nobody owns the inbox on Mondays. The SDR to AE handoff passes only a company name.
   Nobody owns renewals, so customers who stop logging in aren't noticed until they cancel. Each leak gets one line of
   reason and one line of rough size ("12 inbound requests a month wait more than a day", illustrative).
9. What the page is for. It's the first thing you show a hiring manager, a client or your own boss. It turns "our sales
   is a mess" into three named problems you can work on.

**Do it now.** (30 min) Set a timer. Map the revenue system of your company, a client, or Routeful on the `L3 Revenue map`
template. Mark three leaks, each with a reason and a rough size. Stop when the timer ends.

#### Lesson 1.2 The revenue model and unit economics (8 min)

**In plain words.** The revenue model is how the company makes money. Who pays, how much, how often and for how long.
**Unit economics** means the money for one customer, what it costs to win them and what they bring in over time. These
two numbers tell you what's worth building and what isn't.

**You'll be able to.**
- Write a revenue model in four lines
- Work out customer lifetime value, cost to acquire a customer and payback time in a sheet
- Use the numbers to choose between two builds

**What's shown.**
1. The four lines. Who pays. What they pay (the average deal value). How often (once, monthly, yearly). How long they
   stay.
2. Three terms, one sentence each. **ACV** (annual contract value) is what a customer pays per year. **CAC** (customer
   acquisition cost) is everything you spend on sales and marketing in a period divided by the new customers won in that
   period. **LTV** (lifetime value) is what a customer brings in over the whole time they stay, after the direct cost of
   serving them.
3. **Gross margin**, in one sentence. The share of each euro of revenue left after the direct cost of delivering the
   product. For software it's usually high, for services lower.
4. Screen demo in `L3 Unit economics`. Routeful's illustrative numbers. ACV €12,000 in B1. Gross margin 80% in B2.
   Average customer stays 4 years in B3. Sales and marketing cost last year €270,000 in B4. New customers last year 30 in
   B5. In B6 type `=B1*B2*B3` for LTV (€38,400). In B7 type `=B4/B5` for CAC (€9,000). In B8 type `=B6/B7` for LTV to
   CAC (about 4.3).
5. **Payback**, the months it takes for a customer's margin to pay back what it cost to win them. In the sheet,
   in B9 type `=B7/(B1*B2/12)`, which is €9,000 divided by €800 a month, about 11 months.
6. Rules of thumb. You'll hear ratios and payback targets quoted online. They differ by market and change over time, so
   check current figures for your industry and treat them as conversation starters, not targets.
7. Using it to decide. Two builds, same effort. A renewal alert that keeps 2 more customers a year adds 2 times LTV. An
   enrichment upgrade that adds 1 new customer a year adds 1 times LTV minus CAC. Write both numbers before you pick.
8. The trap. Unit economics from a tiny sample lie. Five customers isn't a pattern. Write the count next to every number.

**Do it now.** (10 min) Fill the `L3 Unit economics` sheet for your company, or use Routeful's numbers. Write the count
of customers behind each number in the note column.

#### Lesson 1.3 The operating model (7 min)

**In plain words.** The **operating model** is who does what in the revenue team and how work moves between them. Your
revenue map shows what happens today. The operating model is what should happen, with one owner per step, a written
handoff, and a time limit.

**You'll be able to.**
- List every step from first touch to renewal with one owner each
- Write each handoff as a trigger, the data that must travel and a time limit
- Match the operating model to the revenue model

**What's shown.**
1. The steps. Attract, capture, qualify, meet, discover, demo, propose, close, onboard, grow and renew.
2. One owner per step. When two people own a step, nobody does it. When nobody owns it, it falls through. Use a simple
   table with steps down the side and roles across the top, and an **A** (accountable, the one who answers for it) in
   exactly one cell per row.
3. Handoffs as three lines. Trigger ("deal moves to Won"). Data that must travel ("contract value, start date, the
   champion's name, the three promises made in the sale"). Time limit ("kick off call within 5 working days").
4. Fit to the revenue model. Many small deals means fewer steps and more automation. Few large deals means more research
   and account planning, and a legal or security review step.
5. Screen demo. Raka turns his Routeful revenue map into the target operating model. Renewals get an owner (Mira, until a
   CS hire). Inbound gets a Monday owner. The SDR to AE handoff gets four required fields.
6. Each line of the operating model becomes something you build or check. That's Lesson 1.6.

**Do it now.** (10 min) Write the target operating model for the three leaks you found in Lesson 1.1. Each gets one
owner, a trigger, the data that travels and a time limit.

#### Lesson 1.4 The data model across tools (9 min)

**In plain words.** A **data model** is the plan for what records exist, what each field means, which tool holds the true
value of each field, and how tools recognise the same company or person. Most messy GTM stacks are messy because nobody
decided this. You'll decide it once, on one sheet.

**You'll be able to.**
- Name one source of truth per field
- Choose the IDs that link the same record across tools
- Set the sync direction for every connection

**What's shown.**
1. **Source of truth** (or system of record) means the one tool whose value wins when two tools disagree. For most teams
   the CRM is the spine. It holds the owner, the stage, the deal value and the history.
2. The rule. Every field has exactly one source of truth. Other tools can read it or suggest a value, but only one writes
   the final version.
3. **IDs**, the keys. A **record ID** is the unique number a tool gives each record. Companies match across tools on a
   cleaned domain (lowercase, no `www.`, no trailing slash). Contacts match on work email, with the LinkedIn profile URL
   as a backup. Deals never match on name. Store the CRM's record ID in every other tool (a field called `crm_id` in
   Clay, lemlist and your log sheet), so updates go back to the right record.
4. **Sync direction**, for each connection. One way (Clay writes enrichment into HubSpot, HubSpot never writes to Clay).
   Two way (lemlist and HubSpot both update a contact's status). Two way sync is where duplicates and overwritten data
   come from, so use it only when you must, and write which side wins.
5. Write rules. "Only write if the CRM field is empty" protects what a seller typed by hand. "Always overwrite" suits
   fields the CRM should never be edited in, like a verification result.
6. Screen demo in `L3 Data model`. The columns. Object, field, meaning, allowed values, source of truth, who or what
   writes it, which tools read it, sync direction, write rule. Raka fills 12 Routeful rows. Company domain (source HubSpot,
   written once at creation). Fleet size (source Clay, write if empty). Sequence status (source lemlist, one way into
   HubSpot). Deal stage (source HubSpot, sellers only). Loss reason (source HubSpot, required at Lost).
7. Three questions to test the model. If I delete this field in tool X, what breaks? If two tools disagree, which wins?
   If a contact changes job, which record moves and which stays?
8. GDPR in the data model. You need a lawful reason to hold each personal field (usually legitimate interest for B2B,
   written down), you keep only what you need, and an opt out has to travel to every tool that can contact the person.
   Add an `opt_out` field whose source of truth is the CRM and which every sending tool reads. Not legal advice, check
   your country.

**Do it now.** (15 min) Fill 10 rows of `L3 Data model` for the fields behind your three leaks. Mark every two way sync in
yellow and write which side wins.

#### Lesson 1.5 The GTM brain (8 min)

**In plain words.** The GTM brain is all your tools wired into one system that notices things, decides what to do and
gets the right person to do it. It has the same parts in every company, whatever the tools are called. Once you can draw
it, you can design for any stack.

**You'll be able to.**
- Draw the six parts of a GTM brain and how data flows between them
- Place any tool in the right part
- Spot the missing part in a real stack

**What's shown.**
1. The six parts, drawn as boxes. **Memory** (the CRM, the source of truth). **Senses** (enrichment and signals, the
   facts and changes coming in). **Judgement** (scoring and routing, who matters now and who owns them). **Hands** (the
   sequencer, tasks, the seller's calendar). **Ears** (**call intelligence**, tools like Gong or Leexi that record and
   transcribe sales calls, plus replies, posts and reviews). **Eyes** (dashboards and the scorecard).
2. The wiring, which is your automation tool, usually n8n. Every arrow between boxes is a flow with a trigger, a log and
   an owner.
3. The diagram as text, which Raka draws on screen.

```
 Senses (Clay enrichment, signal sources)
        ↓ facts and events, keyed on domain and email
 Memory (HubSpot, source of truth)  ←  Ears (Gong or Leexi, replies, posts, reviews)
        ↓ fit and intent scores, owner                ↑ quotes, reasons, objections
 Judgement (scoring, routing)                         │
        ↓ the right account, person and moment        │
 Hands (lemlist, tasks, seller)  ─────────────────────┘
        ↓ activity and outcomes
 Eyes (Looker Studio dashboard, weekly scorecard)  →  changes to the ICP, scores and messages
```

4. The loop is the point. The ears and eyes feed changes back into the senses and judgement. Without that, the brain
   never learns, and you keep scoring and messaging the way you did on day one.
5. Where AI agents sit. Inside senses (research), judgement (a second opinion on fit) and hands (drafts). Never as the
   final step before a message goes out. A person approves. Module 2 covers this.
6. Spotting the missing part. A stack with great enrichment and no ears keeps sending the same message whatever
   customers say. A stack with dashboards and no judgement shows problems and fixes none.
7. Screen demo. Raka places Routeful's current tools in the six boxes. Memory is HubSpot, half used. Senses is a Clay
   table run by hand once a month. Judgement is Eva's gut. Hands is lemlist. Ears is nothing, calls aren't recorded.
   Eyes is a spreadsheet Eva updates on Sundays. The missing parts are judgement and ears.

**Do it now.** (10 min) Draw your company's GTM brain in `L3 GTM brain diagram`. Put each tool in a box. Circle the
weakest part.

#### Lesson 1.6 The sales bible as a system spec (6 min)

**In plain words.** A **sales bible** (or playbook) is the written way a team sells. Who to target, what each stage means,
what to say. Most teams write it and nobody follows it. An architect turns each rule into something the system enforces
or checks, so the bible and the CRM say the same thing.

**You'll be able to.**
- Turn a written sales rule into a field, a validation, an automation or a dashboard check
- Give each rule an owner and a way to see if it's followed
- Find bible rules the system can't see

**What's shown.**
1. **Exit criteria** are what must be true before a deal moves to the next stage. They're the most important rules in
   any sales bible.
2. The four ways a rule becomes real. A **field** (the fact is stored). A **validation** (the CRM won't let a deal move
   without it, called required fields per stage in HubSpot). An **automation** (a flow does it or reminds someone). A
   **check** (a dashboard view shows where it's broken).
3. Screen demo in `L3 Bible to spec`. Columns. Bible rule, field, validation, automation, check, owner. Routeful rows.
   "A meeting counts as booked only with four facts" becomes four fields, required at Meeting booked, and a weekly view of
   meetings missing any. "Inbound called within one working hour" becomes a created date, a first activity date, a
   routing flow, and a speed to lead chart. "Every lost deal has a reason from the list" becomes a dropdown, required at
   Lost.
4. Rules the system can't see. "Be curious on discovery calls" isn't checkable by a CRM. Leave it in the bible as
   coaching, and don't pretend a field covers it.
5. Definitions go in the CRM too. Put each field's definition in its description box, so it shows when anyone hovers over
   it.
6. The test. Pick any rule from the bible and ask where you'd see it broken this week. If the answer is "nowhere", it
   isn't part of the system yet.

**Do it now.** (10 min) Write five rules from your company's sales process (or Routeful's stages) into `L3 Bible to spec`
and fill every column you can.

#### Quiz 1 (pass 80%)

1. In the 30 minute revenue map, what goes on each arrow between lanes?
   A. The name of the manager
   B. The deal value
   C. Nothing, arrows are only for direction
   D. How the handoff actually happens, like "form fill creates a HubSpot contact"
   **Answer.** D. **Why.** The way a handoff happens shows where it leaks. "By memory" or "by email" is a warning.
   **Rewatch.** 1.1

2. True or false. You should pick the three leaks you found first on the page.
   **Answer.** False. **Why.** Rank them by money, after asking whether things wait, get lost or have no owner.
   **Rewatch.** 1.1

3. ACV €12,000, gross margin 80%, customers stay 4 years. What's the LTV?
   A. €48,000
   B. €9,600
   C. €38,400
   D. €12,000
   **Answer.** C. **Why.** 12,000 times 0.8 times 4. **Rewatch.** 1.2

4. CAC is €9,000 and a customer brings in €800 of margin a month. Roughly how long is payback?
   A. 11 months
   B. 4 months
   C. 2 years
   D. 9 months
   **Answer.** A. **Why.** 9,000 divided by 800 is about 11. **Rewatch.** 1.2

5. Which of these belongs in a good handoff in the operating model?
   A. "Pass it on quickly"
   B. A trigger, the data that must travel and a time limit in numbers
   C. The CRM's logo
   D. A list of everyone in the team
   **Answer.** B. **Why.** Trigger, data and time limit make a handoff checkable. **Rewatch.** 1.3

6. Clay and HubSpot both hold "fleet size". Your rule says Clay writes only if the HubSpot field is empty. A seller
   typed 42 trucks after a call, and Clay later finds 38. What ends up in HubSpot?
   A. Nothing
   B. Both, in two fields
   C. 38
   D. 42
   **Answer.** D. **Why.** "Write if empty" protects what a seller typed by hand. **Rewatch.** 1.4

7. What's the safest key to match the same company across Clay, lemlist and HubSpot?
   A. A cleaned domain, with the CRM record ID stored in every tool
   B. The city
   C. The phone number
   D. The company name as typed
   **Answer.** A. **Why.** Names vary, a cleaned domain doesn't, and the CRM ID sends updates back to the right record.
   **Rewatch.** 1.4

8. True or false. Two way sync between every tool is the best default.
   **Answer.** False. **Why.** Two way sync is where duplicates and overwrites come from. Use it only when you must and
   write which side wins. **Rewatch.** 1.4

9. A team has enrichment, scoring and a sequencer, but nobody records calls or reads replies for patterns. Which part of
   the GTM brain is missing?
   A. Memory
   B. Hands
   C. Ears
   D. Senses
   **Answer.** C. **Why.** Ears are call intelligence, replies, posts and reviews. Without them the brain doesn't learn.
   **Rewatch.** 1.5

10. Where should an AI agent never sit in the GTM brain?
   A. As a second opinion on fit
   B. Writing drafts
   C. As the final step before a message goes out, with no person approving
   D. Inside research
   **Answer.** C. **Why.** A person approves anything that sends. **Rewatch.** 1.5

11. The bible says "every lost deal has a reason from the list". Which turns it into a system rule?
   A. Reminding the team in the Monday meeting
   B. A new tool
   C. A poster in the office
   D. A loss reason dropdown, required when a deal moves to Lost, and a view of lost deals without one
   **Answer.** D. **Why.** A field, a validation and a check make the rule real. **Rewatch.** 1.6

12. True or false. Every rule in a sales bible can be enforced by the CRM.
   **Answer.** False. **Why.** Some rules are coaching, like curiosity on calls. Leave them as coaching and don't pretend a
   field covers them. **Rewatch.** 1.6

#### Assignment 1. Revenue architecture blueprint

**Goal.** Map a company's revenue system as it is today, then design the target system, its data model and its GTM
brain, on paper first.
**Time.** About 4 hours (Part A 1.5 hours, Part B 2.5 hours).
**You need.** Your 30 minute map from Lesson 1.1, the five Module 1 templates, your Level 2 field map, and your company's
CRM or the Routeful pack.

**Steps.**

*Part A, the current state.*
1. Open your Lesson 1.1 map. Spend 20 more minutes checking it. Add any lane, tool or arrow you missed. Mark every fact
   you weren't sure of with a `?`.
2. For each of your three leaks, write one line of evidence (where you saw it, a number with a count if you have one) and
   one line of rough size in money or deals. Mark sizes as estimates.
3. Fill `L3 Unit economics` with ACV, gross margin, how long customers stay, CAC and payback. Write the count and the
   source next to each input. Where you had to guess, write "estimate".
4. Write two sentences on what the unit economics say you should build first, and why.

*Part B, the target design.*
5. Write the target operating model for every step from attract to renew in the `L3 Revenue map` template's second tab.
   One owner per step. A trigger, data and time limit for each handoff.
6. Fill `L3 Data model` with at least 15 field rows across companies, contacts and deals. Every row has a source of truth,
   a sync direction and a write rule. Include the `crm_id` and `opt_out` fields.
7. Draw the target GTM brain in `L3 GTM brain diagram`. Six parts, every tool placed, every arrow labelled with what
   travels and which flow carries it. Circle what's new compared with today.
8. Fill `L3 Bible to spec` with at least 8 rules. Include every stage's exit criteria. Mark any rule the system can't see
   as "coaching".
9. Write a half page note. The three leaks, what you'd build for each, in what order, and why that order (use the unit
   economics).

**Hand in.**
- Links to the five filled templates, shared as Viewer
- The half page note
- A screenshot of the GTM brain diagram

**Marking rubric.**

| Criterion | 0 | 1 | 2 | Must? |
|---|---|---|---|---|
| Current state map | Missing lanes or no tools and data | All lanes, some arrows unlabelled | Five lanes with people, tools, data out, every arrow labelled with how it happens | Must |
| Three leaks with evidence and size | Missing, or no evidence | Three leaks, evidence or size thin | Three leaks ranked by money, each with evidence, a count where possible and a marked estimate | Must |
| Unit economics | Missing | Numbers present, no counts or sources | LTV, CAC and payback worked out, inputs sourced with counts, estimates marked, used in the build order | |
| Data model | Under 10 rows, or no source of truth | Rows present, sync direction or write rules missing | 15 or more rows, one source of truth each, IDs and opt out included, two way syncs say which side wins | Must |
| GTM brain diagram | Missing | Parts drawn, arrows unlabelled | Six parts, every tool placed, arrows labelled with data and flow, new parts circled | |
| Bible to spec | Missing | Rules listed without fields or checks | 8 or more rules, each with field, validation or automation, check and owner, coaching rules marked | |

**Good example.** Noor maps her employer, a 60 person HR software company. Her three leaks are ranked. "Trial signups
aren't called for 2 to 3 days (34 of 51 last month, CRM export). Won deals reach CS by Slack message with no fields (6 of
8 kick offs late). Renewals have no owner below €5,000 a year (estimate, 40 accounts)." Her unit economics show a payback
of about 14 months from 18 customers, marked "small sample". Her data model has 19 rows. Trial status comes one way from
the product database into HubSpot, and lemlist reads `opt_out` from HubSpot. Her note puts renewal ownership first,
because keeping one customer is worth more than the trial speed fix on her numbers.

**Bad example.** Tomas draws a stack diagram of logos with lines between them. No lanes, no people, no data on the
arrows. His leaks are "data quality, alignment, tools". His data model lists fields but every one says "source, all
tools". It fails three musts, because nobody could build from it.

**Stuck?**
1. **You can't see inside the company.** Use the website, job ads and LinkedIn for the map and write `?` next to guesses.
   A map with honest question marks passes. A confident made up one doesn't.
2. **You don't know the real CAC or LTV.** Use the Routeful numbers to learn the method, then write your company's as
   ranges marked "estimate". Ask finance for the real ones later.
3. **Your data model keeps growing.** Stop at the fields that touch your three leaks plus IDs, owner, stage and opt out.
   A 200 row model nobody reads is worse than 20 rows everyone uses.

---

### Module 2. AI agents in production

**Goal.** Put a multi step research and writing agent into production that runs on many accounts, gets checked every
time, never sends anything without a person's yes, and proves itself on a test set.
**Time.** 42 minutes of video, plus about 4.5 hours for the assignment.
**You need.**
- Claude (a paid plan helps for longer runs) and n8n, or Clay with an AI column
- Templates `L3 Agent spec and log` and `L3 Eval set`
- The 20 account test set RF-101 to RF-120 and its marker's key, or 20 accounts from your own market where you already
  know the right answers
- Your Level 1 research prompt and your Level 2 n8n flow

#### Lesson 2.1 From a prompt to a production agent (7 min)

**In plain words.** A prompt you run by hand on one account is a tool. An agent in production runs on hundreds of
accounts while you're doing something else, so every mistake it makes gets repeated hundreds of times. This lesson shows
what has to change between the two.

**You'll be able to.**
- Explain the difference between a prompt, a workflow and an agent
- Name the six parts every production agent needs
- Decide which steps are AI and which are plain code

**What's shown.**
1. Three words. A **prompt** is the instruction you give an AI. A **workflow** is a fixed set of steps that runs the same
   way every time, like an n8n flow. An **AI agent** is an AI set up to do a task in several steps, sometimes choosing
   which step comes next.
2. **In production** means it runs for real, on real accounts, without you watching each run.
3. The six parts, on screen. Input table. Steps. Output table. Checks. A human gate. A log. Lessons 2.2 to 2.5 take them
   one by one.
4. Most good "agents" are mostly workflow. The fixed steps (fetch the website, read the CRM record, save the result) are
   plain code. Only the steps that need judgement or writing go to the AI. Fewer AI steps means fewer surprises.
5. The research and writing agent you'll build. Step 1, gather (fetch the homepage, careers page and recent news for one
   account). Step 2, extract claims into a table with a source for each. Step 3, falsify (try to prove each claim wrong).
   Step 4, choose one problem and one angle. Step 5, draft a message in the six part structure. Step 6, run the checks.
   Step 7, put it in a queue for a person to approve.
6. Why the steps are separate calls instead of one giant prompt. Each step's output can be checked and logged. When it
   goes wrong, you can see where.
7. Screen demo. Raka draws the seven steps on the `L3 Agent spec and log` template's first tab and marks which are code
   and which are AI.

**Do it now.** (10 min) Draw your agent's steps on the template. Mark each step "code" or "AI". Aim for no more than three
AI steps.

#### Lesson 2.2 Inputs and outputs as tables (7 min)

**In plain words.** An agent that writes free text can't be checked at scale. An agent that fills a table with fixed
columns can. You decide the columns, the allowed values and what "unknown" looks like before you write a single prompt.

**You'll be able to.**
- Write an input table and an output table with fixed columns
- Give every claim a source column and a confidence
- Version your prompts so you know which one made which output

**What's shown.**
1. The input table. One row per account. `crm_id`, company name, cleaned domain, country, persona, tier. Nothing else.
   More input means more to go wrong, and data minimisation (keeping only what you need) is a GDPR rule too.
2. The claims table, the output of step 2. One row per claim. `crm_id`, claim, source URL, source date, quote (the exact
   words from the page), claim type (fact, company says, inference).
3. The result table, the output of steps 3 to 6. `crm_id`, problem chosen, why now, proof line, draft, confidence (high,
   medium, low), checks passed (yes or no), failed check names, prompt version, run date, status.
4. Allowed values. Status can only be `needs review`, `approved`, `rejected`, `blocked`. Confidence can only be high,
   medium or low. A fixed list makes it countable.
5. **Unknown** is an allowed answer. Tell the agent in plain words. "If the page doesn't say it, write UNKNOWN. If a page
   doesn't load, write NOT LOADED, never 'doesn't exist'." A page failing to load is a fact about your tool, not their
   website.
6. Asking Claude for a table. Ask it to answer only with rows in the column order you give, one row per line, values
   separated by a `|` character. In n8n, a Code node or a Split node turns that into fields. Claude's API also supports
   structured output, where you give it the exact shape to return (check Anthropic's documentation for the current way).
7. **Prompt version.** Save each prompt in your prompt library with a number (`research v3`). Write the version on every
   output row. When results change, you'll know whether the prompt or the data changed.

**Do it now.** (10 min) Write the column headers for your input, claims and result tables in the template, with the
allowed values for every column that has a fixed list.

#### Lesson 2.3 Building the multi step agent with Claude (8 min)

**In plain words.** Now you build it. Each step is one node in n8n (or one column in Clay), and each AI step is one call
to Claude with one job. The output of one step is the input of the next.

**You'll be able to.**
- Build a multi step agent in n8n with one Claude call per AI step
- Pass a table from one step to the next
- Run it on five accounts and read every output

**What's shown.**
1. The trigger. A Google Sheet with the input table, or a HubSpot list. In n8n, start with a Google Sheets trigger or a
   manual trigger while you build.
2. Step 1, gather, plain code. An HTTP Request node fetches the homepage and careers page. Save the page text and the HTTP
   status. If the status isn't 200, write NOT LOADED and skip the AI steps for that page.
3. Step 2, extract claims, AI. Add the Anthropic or Claude node (n8n has one, if your version doesn't, use an HTTP Request
   node with the API settings from Anthropic's documentation). Put your API key in n8n's credentials, never in the node.
   The prompt gives the page text and asks for the claims table with the exact quote for each claim.
4. Step 3, falsify, AI plus code. A second call takes each claim and asks "what would prove this wrong, and does the page
   text show it?". Then a code step checks that every quote really appears in the fetched page text. A quote that isn't
   in the page is a made up claim and gets dropped.
5. Step 4, choose the angle, AI. Only claims that passed go in. It picks one problem, one reason it matters now and one
   proof line, or answers NO STRONG ANGLE.
6. Step 5, draft, AI. The six part message. Greeting with a specific observation, the problem, what it costs, why now, one
   line of proof, a low effort question. One problem start to finish.
7. Step 6, checks, code (Lesson 2.4). Step 7, write the row to the review queue sheet with status `needs review`.
8. Screen demo. Raka runs the agent on RF-101, RF-104, RF-108, RF-117 and RF-118. RF-108 is the interesting one. Its
   careers page asks for Excel experience, but a newer post says they went live with a new TMS. The falsify step has to
   catch that. On the first run it doesn't, and Raka shows why (the post wasn't in the pages fetched). He adds the
   LinkedIn post snippet to step 1 and reruns.
9. Read every output of the first runs yourself. You're looking for patterns, not typos.

**Do it now.** (15 min) Build steps 1 and 2 in n8n or Clay and run them on two accounts. Check every quote against the
page by hand.

#### Lesson 2.4 Checks and gates (8 min)

**In plain words.** A **check** is a test the output must pass, run by code or by a person. A **gate** is a point the
work can't pass until the checks say yes. The most important gate is a person approving before anything is sent.

**You'll be able to.**
- Write automatic checks for format, banned words, claims and sources
- Build the falsification pass into the flow
- Put a human approval gate before any send, and keep it honest

**What's shown.**
1. Automatic checks, run by code on every row. Every column filled or UNKNOWN. Status and confidence use allowed values.
   Every claim in the draft appears in the passed claims table. Every source URL returns 200 today. Word count under your
   limit. No banned words (your list, like "unlock", "seamless", "game changer"). No dashes or other style rules your team
   bans. A failed check sets status `blocked` and writes the check's name.
2. The **falsification pass**, from Level 1, now inside the flow. For every claim, try to prove it wrong before it can
   be used. Absence claims ("they don't have X") are the riskiest, so the agent may not use one unless two pages were
   searched and the method was shown to find X on a site that has it.
3. The human gate. Nothing the agent writes is sent by the agent. A person opens the review queue, reads the draft next to
   its claims and sources, and sets `approved` or `rejected` with a reason. Only `approved` rows flow on to the sequencer.
4. Make the gate real. Approval is a word in a field, set by a named person, with a date. An edit request ("make it
   shorter") isn't an approval. It sends the draft back for a new version that needs a new yes.
5. Read the whole thread first. Before approving a message to someone, open the full conversation with that person in
   the sequencer or inbox, from the first message, both directions. A reply can land between drafting and sending.
6. How Astra does it, honestly. Astra's own engine sent 330 researched cold first messages between 14 July and 25 October
   2026. Each one passed a research gate and a falsification pass, and every draft was shown to Raka and sent only on his
   explicit word. The checks exist because each one caught something. Claims that a company had no privacy page when it
   did under another link, a page called empty because our tool failed to load it, a person listed as owner who had sold
   the company. One more lesson came from a mistake. An audit that read our own send log came back clean while some
   people had in fact been messaged twice. Reading each thread in the inbox itself found it. Since then the rule is to
   check the system of record, never your own notes about it.
7. Screen demo. Raka builds the checks as one n8n Code node with a list of tests, each returning pass or fail with a
   name. He shows the review queue sheet with a filter on `needs review`, and a second flow that only picks up
   `approved` rows.

**Do it now.** (10 min) Write your list of at least eight automatic checks in the template, each with what it tests and
what happens when it fails.

#### Lesson 2.5 Logging and evals (7 min)

**In plain words.** A **log** is a record of every run, so you can see what happened later. An **eval** (short for
evaluation) is a test set of accounts where you already know the right answers. You run the agent on it, score it, and
run it again every time you change the prompt.

**You'll be able to.**
- Log every run with its input, prompt version, output, checks and the human decision
- Build a 20 account eval set with known answers
- Score the agent and compare versions

**What's shown.**
1. The log, one row per account per run. Run ID, date, `crm_id`, prompt versions, each step's output (or a link to it),
   checks passed or failed, status, approver, decision, reason, and time and cost if your tools show it.
2. The human decision is the most useful column. Every rejection with a reason tells you what to fix in the prompt.
3. The eval set. 20 accounts, chosen to include the hard cases. A duplicate. An existing customer. A company too small or
   too big. A contradiction between two sources. News about a different company with a similar name. A signal outside the
   time window. For each, the right answer written down before you run anything.
4. Using the practice pack. RF-101 to RF-120 from the Level 1 practical test already has the right answers in its
   marker's key. RF-108 has the contradiction. RF-117 has the wrong company news. RF-111 has the old signal. RF-109 is a
   duplicate of RF-101.
5. Scoring. In `L3 Eval set`, one row per account. Expected answer, agent answer, match (1 or 0). Then three totals.
   Correct disqualifications. Traps caught (the contradiction, the wrong company, the old signal). Drafts with zero
   unsupported claims. Write the score as a count, "17 of 20".
6. **Regression** means a change that makes something that used to work stop working. Every prompt change gets a full
   rerun of the 20. If the new version fixes one account and breaks two, you keep the old one.
7. Run it more than once. AI output varies a little between runs. Run the eval twice and note any account that changes
   answer. Those are the unstable ones to fix.
8. Screen demo. Raka runs version 1 on all 20, scores 15 of 20, finds the agent counted RF-117's news, adds a "does the
   source name the exact company and domain?" line to the falsify step, reruns as version 2 and scores 18 of 20.
   Illustrative scores for the demo.

**Do it now.** (10 min) Fill the expected answer column of `L3 Eval set` for all 20 accounts, before running your agent.

#### Lesson 2.6 Cost, failure and when not to use an agent (6 min)

**In plain words.** An agent costs money every run, and it fails in ways a person wouldn't. This lesson shows how to
measure the cost, handle failures without losing work, and spot jobs where an agent is the wrong tool.

**You'll be able to.**
- Measure cost per account from your own runs
- Handle timeouts, limits and bad outputs without losing rows
- Decide when a person or plain code is the better choice

**What's shown.**
1. Measure cost, don't guess it. Your Claude console, Clay credits and n8n executions show usage. Run 20 accounts, divide
   the cost by 20, and write cost per account and cost per approved draft. Prices change, check each pricing page.
2. Cut cost without cutting quality. Fetch only the pages you need. Send only the page text, not the whole HTML. Use a
   smaller model for extraction and a stronger one for the angle and draft, if your tests show it holds up. Run on tier 1
   and 2 first.
3. Failures to plan for. A page that times out. The API's **rate limit** (how many calls you may make per minute).
   An output in the wrong shape. A run that stops halfway.
4. The fixes. Retry with a wait for timeouts and rate limits, at most three times. Validate the shape before using it, and
   send bad shapes to `blocked`. Write each row's status as you go, so a run that stops can restart where it left off. An
   error workflow in n8n alerts you (Level 2).
5. Silent failures are worse than loud ones. A run that finishes green with empty claims for half the accounts looks
   fine. Count outputs against inputs after every run.
6. When not to use an agent. The task is the same every time (use plain code). The volume is tiny (just do it). The
   output can't be checked. A mistake can't be undone and there's no person in the loop. The data it needs isn't there.
7. The honest test. If a person would do it better in less time than you'd spend checking the agent, don't build the
   agent.

**Do it now.** (5 min) List three tasks in your GTM work. For each, write "agent", "plain code" or "person", and one line
why.

#### Quiz 2 (pass 80%)

1. Which describes a workflow?
   A. A fixed set of steps that runs the same way every time
   B. A single prompt
   C. A dashboard
   D. An AI that picks its own next step
   **Answer.** A. **Why.** Workflows are fixed, agents may choose steps. **Rewatch.** 2.1

2. True or false. A good production agent puts as many steps as possible into one big AI prompt.
   **Answer.** False. **Why.** Separate steps can each be checked and logged, and fewer AI steps means fewer surprises.
   **Rewatch.** 2.1

3. A page your agent tries to read returns an error. What should the output say?
   A. Leave it blank
   B. Guess from the company name
   C. NOT LOADED
   D. "The company has no website"
   **Answer.** C. **Why.** A failed load is a fact about your tool, not their website. **Rewatch.** 2.2

4. Why write the prompt version on every output row?
   A. So you know whether a change in results came from the prompt or the data
   B. It looks professional
   C. Claude needs it
   D. To count credits
   **Answer.** A. **Why.** Without it you can't trace a change in results. **Rewatch.** 2.2

5. A code check finds a quote in the claims table that doesn't appear anywhere in the fetched page text. What happens?
   A. Soften it in the draft
   B. Drop the claim as unsupported
   C. Ask the AI if it's sure
   D. Keep it, the AI probably read another page
   **Answer.** B. **Why.** A quote not in the source is a made up claim. **Rewatch.** 2.3

6. The approver writes "make it shorter" on a draft. What status should it get?
   A. Back for a new version, which needs a new yes
   B. Approved
   C. Sent
   D. Deleted
   **Answer.** A. **Why.** An edit request isn't an approval. **Rewatch.** 2.4

7. True or false. Before approving a message, reading the last message in the thread is enough.
   **Answer.** False. **Why.** Read the whole thread from the first message, both directions. Promises and replies hide
   earlier in it. **Rewatch.** 2.4

8. An audit of your own send log says nobody got two messages. What's the stronger check?
   A. Ask the team
   B. Check each thread in the sequencer or inbox itself
   C. Read the log again
   D. Trust it, it's your log
   **Answer.** B. **Why.** Check the system of record, never your own notes about it. Astra learned this the hard way.
   **Rewatch.** 2.4

9. What makes a good eval set?
   A. 20 easy accounts B. Accounts the agent already got right C. 20 accounts with the right answers written down first,
   including hard cases like contradictions and wrong company news D. Whatever accounts ran last
   **Answer.** C. **Why.** Known answers and planted traps show what the agent really does. **Rewatch.** 2.5

10. Version 2 of your prompt fixes RF-117 but now gets RF-108 and RF-111 wrong. What do you do?
   A. Stop testing
   B. Keep version 1 and fix the prompt again, rerunning all 20
   C. Ship version 2
   D. Remove RF-108 and RF-111 from the eval set
   **Answer.** B. **Why.** That's a regression. One fixed and two broken is worse. **Rewatch.** 2.5

11. Your n8n run finishes green, but 40 of 100 rows have empty claims. What kind of failure is this?
   A. No failure
   B. Silent, caught by counting outputs against inputs
   C. Loud
   D. A rate limit
   **Answer.** B. **Why.** It looked fine and did the wrong thing. **Rewatch.** 2.6

12. Which task is the worst fit for an agent?
   A. Summarising call transcripts with quotes
   B. Drafting first messages for a person to approve
   C. Researching 300 accounts against a fixed question list
   D. Renaming a CRM field once
   **Answer.** D. **Why.** It's tiny and the same every time. Just do it. **Rewatch.** 2.6

#### Assignment 2. An agent in production, with a test set

**Goal.** Build a multi step research and writing agent with a human gate and a log, and prove how well it works on 20
accounts with known answers.
**Time.** About 4.5 hours (Part A 3 hours, Part B 1.5 hours).
**You need.** n8n or Clay, Claude, `L3 Agent spec and log`, `L3 Eval set`, the RF-101 to RF-120 test set with its
marker's key (or 20 accounts of your own with answers written first), your Level 1 research prompt.

**Steps.**

*Part A, build the agent.*
1. Fill the spec tab of `L3 Agent spec and log`. Purpose in one sentence, the seven steps marked code or AI, the input,
   claims and result tables with allowed values, and the stop rules (WRONG COMPANY, NOT LOADED, UNKNOWN, NO STRONG ANGLE).
2. Build the steps in n8n (or as columns in Clay). Put your API key in credentials. Save each prompt in your prompt
   library with a version number.
3. Add the code checks from Lesson 2.4, at least eight. Each writes its name when it fails.
4. Add the quote check (every quote must appear in the fetched page text) and the falsify step.
5. Write results to a review queue sheet with status `needs review`. Build a separate flow, or a filter, that only passes
   `approved` rows on. Don't connect it to a live sending step for this assignment.
6. Add the log. One row per account per run, with every column from Lesson 2.5.
7. Add retries for timeouts, a shape check, and an error alert.

*Part B, prove it.*
8. Fill the expected answers in `L3 Eval set` for all 20 accounts before your first run. Save a copy of the tab dated
   today.
9. Run version 1 on all 20. Score it. Write the score as counts.
10. Review every draft yourself as the human gate. Approve or reject each with a reason.
11. Make one prompt change based on the rejections and the misses. Rerun all 20 as version 2. Score it. Note any
    account that changed answer between runs.
12. Write the cost per account and per approved draft from your tool's usage page, and a half page note. What the agent
    gets right, what it misses, whether you'd let it run on 300 accounts and what you'd watch.

**Hand in.**
- The spec tab link
- The n8n JSON export (remove keys) or the Clay table link, plus a canvas screenshot
- The review queue sheet and the log sheet, both as Viewer links
- `L3 Eval set` with the dated expected answers, both runs scored, and the version change described
- The half page note with cost per account and per approved draft

**Marking rubric.**

| Criterion | 0 | 1 | 2 | Must? |
|---|---|---|---|---|
| Spec with tables and stop rules | Missing | Steps listed, tables or stop rules missing | Seven steps marked code or AI, three tables with allowed values, four stop rules | |
| Multi step build that runs | Doesn't run, or one big prompt | Runs, some steps merged or unclear | Runs end to end, one AI call per AI step, prompts versioned, key in credentials | Must |
| Checks and the falsification pass | None | Some checks, no quote check or no falsify step | Eight or more named checks, quote check, falsify step, failures set `blocked` | Must |
| Human gate | Agent can send, or no queue | Queue exists, approval not recorded with name and reason | Nothing passes without `approved`, a named person and a reason, edit requests sent back | Must |
| Log | None | Some runs logged, columns missing | Every account per run, prompt versions, checks, decision and reason | |
| Eval set and scoring | Missing, or answers written after the run | 20 scored once | Answers dated before the run, both versions scored as counts, unstable accounts noted, regression checked | Must |
| Cost and failure handling | Missing | Cost guessed, or no retries | Cost per account and per approved draft from usage, retries, shape check, alert, outputs counted against inputs | |

**Good example.** Elif's agent has seven steps, three of them AI. Her checks tab has eleven named checks. Version 1
scored 14 of 20. It used RF-117's grain trader news and missed RF-108's new TMS. Her rejection reasons pointed at both.
Version 2 adds an exact company and domain match to the falsify step and fetches LinkedIn posts in step 1. It scores 18
of 20, with RF-114 changing answer between two runs, which she flags as unstable. Her note says she'd run it on 300
accounts at tier 1 and 2 only, with a weekly sample of 20 approved drafts rechecked by hand.

**Bad example.** Jonas runs one long prompt in Claude that "researches and writes the email", pastes 20 outputs into a
sheet and marks them all correct. There's no expected answer column, no checks, no log, and the flow ends in a lemlist
step that sends automatically. It fails four musts.

**Stuck?**
1. **Claude's answer doesn't fit your table.** Show it one example row in the prompt, say "answer only with rows, no other
   text", and add a shape check that sends bad rows to `blocked` instead of breaking the flow.
2. **The fetch step gets blocked or returns empty pages.** Some sites block automated fetches. Write NOT LOADED, never
   "empty", and for the practice pack use the research snippets tab as the page text.
3. **Your score barely moves between versions.** You changed too much or too little. Change one thing that a rejection
   reason points at, and rerun all 20.

---

### Module 3. Signal systems and the eavesdrop loop at scale

**Goal.** Build a signal system that's scored by what actually led to wins, routes each signal to the right person, and
learns from every call, post, review, win and loss.
**Time.** 40 minutes of video, plus about 4 hours for the assignment.
**You need.**
- Your Level 1 signal sources and scoring model
- Last quarter's won and lost deals with the date each was created (or the Routeful 60 deal pipeline and its "Signals at
  first touch" tab)
- 10 call transcripts (yours from Gong or Leexi, or the Routeful 10)
- Templates `L3 Signal library` and the forecast tab in `L3 Signal library`
- Your Level 2 n8n flow and dashboard

#### Lesson 3.1 Designing a signal library (7 min)

**In plain words.** A **signal** is something that happens which makes a company more likely to buy now, like hiring for
a role you help, a new boss or a new site. A signal library is one table that lists every signal you track, exactly how
you spot it, how long it stays fresh, who acts on it and what they do.

**You'll be able to.**
- Write a signal as a definition anyone could check
- Fill the nine columns of a signal library
- Remove signals that sound good but can't be acted on

**What's shown.**
1. Why a library. At Level 1 you set up three signal sources. With ten, the team stops knowing which matter. A library
   makes every signal a written decision.
2. The nine columns. Name. Definition (what counts, in one checkable sentence). Source (where you see it). Detection (the
   tool or flow that spots it). Freshness window (how many days it counts). Points. Owner (the role that acts). Action (what
   they do, within how long). Evidence (what gets saved, usually a URL and a date).
3. A good definition. "A job post for a route planner or transport planner, on the company's own careers page or
   LinkedIn, posted in the last 30 days." A bad one. "Company is growing."
4. The freshness window. A job post goes stale in about a month. A new operations director matters for about their first
   90 days. Write the window and make the flow drop expired signals automatically.
5. Kinds of signal. Company changes (hiring, new site, new leader, funding, a merger). Tool changes (a new or old system
   named in a job post). Engagement (a visit to your pricing page, a reply, a webinar). Customer signals (usage drops, the
   champion leaves). The last kind belongs to CS, not sales.
6. Cut signals with no action. If nobody would do anything different when it fires, it's noise.
7. Screen demo. Raka fills eight Routeful rows in `L3 Signal library`, including a customer signal ("logins down by half
   for two weeks, owner Mira, call within 3 working days").

**Do it now.** (10 min) Move your Level 1 signals into the library and add at least two new ones. Fill all nine columns.

#### Lesson 3.2 Scoring signals by past results (8 min)

**In plain words.** Most signal points are guesses. A **backtest** checks a guess against the past. You look at deals you
already won and lost and ask whether the ones with this signal did better. Then you set points from what happened, not
from what sounds right.

**You'll be able to.**
- Run a backtest of one signal on won and lost deals
- Work out lift and read it with the sample size next to it
- Set points from the results and recheck them each month

**What's shown.**
1. You need two things per closed deal. Whether it was won or lost, and which signals were present when it was created.
   If your CRM doesn't store signals, add a "signals at first touch" field now, and for old deals fill it by hand from
   notes.
2. The backtest in Sheets. A filtered count of deals with the signal, and how many of those were won. The same for deals
   without it. Win rate is won divided by deals.
3. **Lift** is the win rate with the signal divided by the win rate without it. Above 1 means the signal goes with more
   wins. 1 means no difference.
4. Routeful's illustrative backtest on 30 closed deals (9 won, 21 lost). "Hiring planners" was present on 10 deals, 5
   won (50%). Without it, 20 deals, 4 won (20%). Lift 2.5. "New operations lead" was present on 6 deals, 1 won (17%).
   Without it, 24 deals, 8 won (33%). Lift about 0.5.
5. Read the counts before the lift. 6 deals is far too few to trust. Raka's rule for small teams. Under 10 deals with the
   signal, mark it "can't tell yet" and keep the old points.
6. A signal can match wins without causing them. Hiring planners might simply mean bigger companies. Check by splitting
   by size band if you have enough deals.
7. Setting points. Signals with clear lift on enough deals get more points. "Can't tell yet" keeps its guess, marked as a
   guess. Signals with lift below 1 on enough deals lose points or go.
8. Also check meetings, not only wins. Wins are few. "Did accounts with this signal reply or book more?" gives you more
   data sooner, from your sequencer and CRM.
9. Recheck monthly. Put the backtest on a tab that recalculates when you paste the new export.

**Do it now.** (10 min) Backtest one signal on your closed deals or the Routeful pipeline. Write the counts, both win
rates and the lift.

#### Lesson 3.3 Routing signals to the right person (6 min)

**In plain words.** A signal is worth nothing if it lands in a channel nobody reads. **Routing** means automatically
giving each signal to the person who should act on it, with a time limit, without burying them in alerts.

**You'll be able to.**
- Route signals by account owner, with a fallback
- Choose instant alerts or a daily digest per signal
- Stop the same account firing five alerts in a day

**What's shown.**
1. The routing order. If the account has an owner in the CRM, the owner gets it. If not, it goes to the SDR pool by
   territory. If nobody matches, the manager is the fallback. Every routing rule needs a fallback.
2. Urgency decides the channel. A pricing page visit from a tier 1 account is an instant alert. A job post is a daily
   digest. A customer usage drop is a task with a due date.
3. Deduplicate. An account with three new signals today gets one message listing all three, not three messages.
4. Every alert says what to do. The signal, the evidence link, the account score, the owner and the action from the
   library. "RF-101, two planner jobs posted 20 Nov (link), tier 1, Sanne, first touch within 2 working days."
5. Close the loop. The alert creates a task in the CRM. When the task is done or ignored past its time limit, that's
   logged, so you can see which signals people act on.
6. Screen demo in n8n. A schedule trigger reads new signals from the Clay table, groups them by `crm_id`, looks up the
   owner in HubSpot, creates a task and sends one Slack message per owner per day. A second branch catches signals with
   no owner and sends them to Eva.

**Do it now.** (10 min) For each signal in your library, write the route, the channel (instant, digest or task) and the
fallback.

#### Lesson 3.4 Feeding call intelligence back into the system (7 min)

**In plain words.** **Call intelligence** tools like Gong or Leexi record and transcribe sales calls. Listening to what
customers and prospects say, and feeding it back into your ICP, messages and lists, is what Raka calls the **eavesdrop
loop**. At Level 3 you run it on every call, not on a few you remember.

**You'll be able to.**
- Set up trackers for the words that matter
- Turn transcripts into tagged, quoted reasons with Claude, and check them
- Feed what you find into the ICP, the messages and Clay

**What's shown.**
1. Trackers. In Gong or Leexi, set up keyword trackers for competitors, old tools ("Excel", the TMS names), pains
   ("Monday replanning", "sick drivers") and objections. The exact menu differs, look for trackers or keywords in
   settings.
2. Consent first. Call recording needs the other side told, and in some countries their agreement. Check your company's
   policy and the rules in each country. Not legal advice.
3. Export transcripts weekly to a Drive folder. Run them through Claude with a fixed table. Call ID, won or lost or open,
   pains (with an exact quote and the minute), objections (quote), tools mentioned, who decides, next step.
4. Check it. Open five quotes per batch in the recording and confirm they were said. Claude can merge two speakers or
   invent a tidy sentence. Any quote you can't find is dropped.
5. Where it goes. A pain that appears in most won calls goes into the ICP notes and the message library. Its exact words
   go into openers. A tool mentioned in lost calls becomes a disqualifier or a new segment. A new pain word becomes a Clay
   column ("does the careers page mention Monday replanning?").
6. Screen demo. Raka runs the Routeful 10 transcripts. "Monday replanning" shows up in won calls W1, W2, W3 and W5. "Cut
   Monday replanning to under an hour" from W3 becomes the proof line. Two losses say "we're too small", so he checks the
   ICP's lower size limit.

**Do it now.** (10 min) Run three transcripts through your Claude table. Check two quotes against the transcript text.

#### Lesson 3.5 Posts, reviews and the win and loss loop (6 min)

**In plain words.** Customers also talk in public, in LinkedIn posts, review sites and forums. Add that to your calls,
then once a month look at every win and loss together, decide what to change, and log it.

**You'll be able to.**
- Collect public posts and reviews in a way the source allows
- Run a monthly win and loss review that ends in changes
- Keep a change log so you know what each change did

**What's shown.**
1. Sources. Your customers' and prospects' LinkedIn posts. Review sites for your product and competitors. Only collect in
   ways the site allows, never more than the task needs, and check each site's terms.
2. Tag them the same way as calls. Pain, objection, tool, quote, link, date.
3. The monthly **win and loss review**, studying why deals were won or lost. Pull every deal closed that month, its loss
   or win reason, its call tags and its signals at first touch. One page. Top three reasons we win, top three we lose,
   anything new.
4. Every review ends in at most three changes, each with an owner and a date. A new disqualifier, a new proof line, a
   signal's points, a message variant.
5. The change log. Date, what changed, why (with the evidence), what you expect, when you'll check. Change one thing at a
   time per area, so you can tell what worked.
6. Astra's lesson, as an example of a change the loop produces. Across 330 messages, consumer businesses said yes most
   often and couldn't pay. B2B companies with a budget were the ones worth meeting. That's a fit lesson, and it belongs in
   the ICP as "able to pay".

**Do it now.** (10 min) Write the first entry in your change log from what Lessons 3.2 and 3.4 showed you.

#### Lesson 3.6 Forecasting basics tied to signals (6 min)

**In plain words.** A **forecast** is your best estimate of what will be sold this month or quarter. Signals are early
signs of future pipeline, so if you track them, you can see a weak quarter coming weeks before it shows up in deals.

**You'll be able to.**
- Track leading and lagging numbers together
- Build a weighted forecast and a signal coverage number
- Check your forecast's accuracy each month

**What's shown.**
1. **Leading** numbers move first (signals fired, signals acted on, meetings booked). **Lagging** numbers move later
   (deals won, revenue). A manager steering only on lagging numbers finds out too late.
2. The chain. Signals acted on lead to meetings, meetings lead to opportunities, opportunities lead to wins. Each step has
   a conversion rate from your own data.
3. A **weighted forecast**. Each open deal's value times the chance of winning from its stage (from your conversion
   data), added up. In Sheets, a stage win chance column with a lookup, then value times chance.
4. Forecast categories, briefly. Commit (you'd bet on it), Best case (could close if things go well) and Pipeline. Report
   Commit and Commit plus Best case. Track 3 teaches this in depth.
5. Signal coverage. Next quarter's pipeline needs a number of meetings this quarter. Work backwards. Target, divided by
   deal value, divided by win rate, gives opportunities needed. Divide by meeting to opportunity rate for meetings needed.
   Divide by signal to meeting rate for signals you need to act on. If the library doesn't produce that many, you know now.
6. Accuracy. At month end, write the forecast and what closed, side by side. After three months you'll see whether you're
   optimistic or cautious.
7. Screen demo. Raka builds the forecast tab for Routeful with illustrative conversion rates, and shows the signals needed
   per week to hit next quarter.

**Do it now.** (10 min) Work backwards from a target to "signals acted on per week" for your company or Routeful.

#### Quiz 3 (pass 80%)

1. Which is a good signal definition?
   A. "A job post for a route planner on their careers page or LinkedIn in the last 30 days"
   B. "Big company"
   C. "Looks interested"
   D. "Company is growing"
   **Answer.** A. **Why.** Anyone could check it, and it has a window. **Rewatch.** 3.1

2. True or false. A signal nobody would act on differently still belongs in the library.
   **Answer.** False. **Why.** A signal with no action is noise. **Rewatch.** 3.1

3. Deals with a signal won 5 of 10 (50%). Deals without won 4 of 20 (20%). What's the lift?
   A. 2.5
   B. 30
   C. 0.4
   D. 5
   **Answer.** A. **Why.** 50% divided by 20%. **Rewatch.** 3.2

4. A signal shows a lift of 3, but only 4 deals had it. What do you do?
   A. Delete it
   B. Triple its points
   C. Mark it "can't tell yet" and keep the old points
   D. Make it the only signal
   **Answer.** C. **Why.** 4 deals is too few to trust. **Rewatch.** 3.2

5. An account with no owner fires a signal. Where should it go?
   A. Every seller
   B. The CEO
   C. The SDR pool by territory, with the manager as the final fallback
   D. Nowhere
   **Answer.** C. **Why.** Every routing rule needs a fallback so nothing is unowned. **Rewatch.** 3.3

6. A tier 1 account fires three signals on the same day. What should its owner get?
   A. One message listing all three, with evidence and the action
   B. A phone call from the manager
   C. Nothing until next week
   D. Three alerts
   **Answer.** A. **Why.** Deduplicate to stop alert fatigue. **Rewatch.** 3.3

7. Claude's call summary quotes a prospect saying "we lose a day every Monday". What do you do before using it in a
   message library?
   A. Use it, Claude read the transcript
   B. Rewrite it to sound better
   C. Ask Claude again
   D. Find it in the transcript or recording and confirm it was said
   **Answer.** D. **Why.** Check quotes against the source. AI can tidy or invent sentences. **Rewatch.** 3.4

8. True or false. Recording sales calls needs no thought about consent.
   **Answer.** False. **Why.** The other side must be told, and some countries need agreement. Check your policy and
   country. Not legal advice. **Rewatch.** 3.4

9. How many changes should a monthly win and loss review end with?
   A. As many as possible
   B. None
   C. At most three, each with an owner and a date, written in the change log
   D. One rewrite of everything
   **Answer.** C. **Why.** Few changes, owned and logged, so you can tell what worked. **Rewatch.** 3.5

10. Astra found consumer businesses said yes most often but couldn't pay. Where does that lesson belong?
   A. In the email font
   B. In the sending domain settings
   C. Nowhere, a yes is a yes
   D. In the ICP, as ability to pay
   **Answer.** D. **Why.** It's a fit lesson. **Rewatch.** 3.5

11. Which is a leading number?
   A. Signals acted on this week
   B. Churned customers last year
   C. Revenue last quarter
   D. Deals won last month
   **Answer.** A. **Why.** It moves before pipeline and wins do. **Rewatch.** 3.6

12. Deal A is €20,000 at a stage that historically wins 40%. Deal B is €10,000 at a stage that wins 20%. What's the
    weighted forecast?
   A. €30,000
   B. €10,000
   C. €6,000
   D. €8,000
   **Answer.** B. **Why.** 8,000 plus 2,000. **Rewatch.** 3.6

#### Assignment 3. A signal system with a closed loop

**Goal.** Build a signal library that's backtested and routed, then run the eavesdrop loop once from calls to changes,
and tie signals to a forecast.
**Time.** About 4 hours (Part A 2 hours, Part B 2 hours).
**You need.** `L3 Signal library` with its forecast tab, your closed deals or the Routeful pipeline, 10 transcripts, Gong
or Leexi if you have it, Claude, n8n, your dashboard.

**Steps.**

*Part A, the signal system.*
1. Fill `L3 Signal library` with at least 8 signals, at least one of them a customer signal. All nine columns filled.
2. Backtest at least 3 signals on your closed deals. Write counts, win rates with and without, lift, and "can't tell yet"
   where the count is under 10.
3. Set new points for those signals from the results. Write the old and new points side by side with one line why.
4. Write the routing for every signal. Owner rule, fallback, channel (instant, digest or task) and time limit.
5. Build the routing flow in n8n for at least two signals. It groups by account, finds the owner, creates a CRM task and
   sends one message per owner, with a fallback branch. Run it on test data and screenshot a successful execution.

*Part B, the loop and the forecast.*
6. Run 10 transcripts through your Claude table (Lesson 3.4). Check at least 10 quotes against the source and mark each
   confirmed or dropped.
7. Add at least five public posts or reviews, collected in a way the source allows, tagged the same way.
8. Write the one page win and loss review. Top three win reasons, top three loss reasons, anything new, each with counts.
9. Write at most three changes in the change log, each into one of the ICP, the message library or a Clay column, with
   owner, date, evidence and how you'll check.
10. Fill the forecast tab. A weighted forecast for open deals, and the chain from target back to signals acted on per
    week.

**Hand in.**
- `L3 Signal library` link with the backtest and forecast tabs
- The n8n export (keys removed) and an execution screenshot
- The transcript table with the quote check column
- The win and loss page and the change log

**Marking rubric.**

| Criterion | 0 | 1 | 2 | Must? |
|---|---|---|---|---|
| Signal library | Under 8 signals or vague definitions | 8 signals, some columns thin | 8 or more with checkable definitions, windows, owners and actions, a customer signal included | Must |
| Backtest and points | None | Backtest without counts or sample warnings | 3 signals with counts, win rates, lift, small samples marked, points changed with reasons | Must |
| Routing that works | No routing | Written but not built, or no fallback | Built for two or more signals, grouped by account, CRM task, fallback, execution shown | |
| Eavesdrop loop with checked quotes | Missing, or quotes unchecked | Tagged, under 10 quotes checked | 10 transcripts plus 5 posts or reviews tagged, 10 or more quotes checked, dropped ones listed | Must |
| Win and loss review and change log | Missing | Review without changes, or changes without evidence | Counts per reason, at most three changes with owner, date, evidence and a check | |
| Forecast tied to signals | Missing | Weighted forecast only | Weighted forecast and the chain back to signals per week, with sources for each rate | |

**Good example.** Pieter's library has 10 signals for a payroll software company. His backtest of "new HR director in
the last 90 days" shows 7 won of 14 against 6 of 31 without (lift about 2.6), and he raises its points. "Funding round"
had 3 deals and is marked "can't tell yet". His n8n flow groups signals by account and has an Eva branch for unowned
accounts. He checked 12 quotes and dropped 2 that weren't in the transcript. His change log adds "pays payroll through an
outside bureau" as a disqualifier after 3 of 4 losses said so.

**Bad example.** Sara lists 15 signals like "growth" and "digital maturity" with no windows or owners, sets points by
feel, and pastes Claude's call summaries into the message library without opening a transcript. It fails three musts.

**Stuck?**
1. **Your CRM doesn't store signals on old deals.** Fill "signals at first touch" by hand for the last 30 closed deals
   from notes and emails, or use the Routeful tab. Start storing it from today.
2. **Every backtest is "can't tell yet".** That's an honest result for a small team. Backtest on meetings booked instead
   of wins, where you have more data.
3. **Your team has no call recordings.** Use the Routeful 10, or take notes in your own calls for two weeks with the
   same table. Ask before recording anyone.

---

### Module 4. Running GTM engineering as a service or a team

**Goal.** Run builds the way a good engineering team does, scoped, specced, built in sprints with demos, documented and
maintained, then price your work and get hired for it.
**Time.** 42 minutes of video, plus about 4.5 hours for the assignment (including a 90 minute timed task).
**You need.**
- Template `L3 Service pack` (scope, spec, sprint plan, runbook tabs)
- Your Assignments 1 to 3 and your Level 1 and 2 portfolio, if you have one
- A timer and a quiet 90 minutes

#### Lesson 4.1 Scoping a build (7 min)

**In plain words.** **Scope** means exactly what you'll build and what you won't. Most failed builds, paid or in house,
fail here, because the person asking and the person building pictured different things. A good scope fits on one page.

**You'll be able to.**
- Run a 45 minute discovery call that ends with a scope
- Write a one page scope with a "not included" list and acceptance criteria
- Turn a big ask into a small first build

**What's shown.**
1. Discovery questions, in order. What's the problem, in their words? What does it cost today (hours, deals, customers)?
   Who uses the result? What tools and data exist, and who has admin access? What does done look like? What has been tried?
   Who signs off?
2. Use your revenue map. Draw their system in the call (Lesson 1.1). The leak they describe is often not the biggest one.
   Say what you see, then let them choose.
3. The one page scope. Problem. Outcome, as a number you can check. What's included (parts). Not included. What they
   provide (access, data, a contact person, time for demos). Acceptance criteria. Timeline. Risks.
4. **Acceptance criteria** are tests the finished build must pass for the work to count as done. "Every inbound demo
   request gets an owner within 5 minutes, tested with 10 test submissions, all logged." Not "routing works well".
5. Start small. "Build our whole engine" becomes "fix inbound routing in two weeks, then decide". A first small win earns
   the bigger build.
6. Screen demo. Raka plays a Routeful sales director asking for "AI for our sales team". In 10 minutes of questions it
   becomes "Monday morning, every new inbound and every tier 1 signal is owned and in the right person's task list". He
   writes the scope on the template.

**Do it now.** (10 min) Write the "not included" list for a build you'd like to do at your company or for Routeful. Aim
for at least five lines.

#### Lesson 4.2 Writing specs (7 min)

**In plain words.** A **spec** (specification) describes one part of a build precisely enough that someone else could
build it, test it or fix it. Scope says what. The spec says how it behaves, including the awkward cases.

**You'll be able to.**
- Write a one page spec for a flow, a field set or an agent
- List edge cases and what should happen in each
- Write tests that match the acceptance criteria

**What's shown.**
1. The spec headings. Purpose. Users. Trigger. Inputs (with the fields from your data model). Steps. Outputs. Rules.
   Edge cases. Tests. Owner. Where it's logged.
2. **Edge cases** are the unusual situations a build must still handle. A form with no company name. A contact already
   owned by someone else. A duplicate. A country you don't email. An opt out. The API being down.
3. For each edge case, write what happens. "No company name, look up the email domain in HubSpot, if still nothing, route
   to the fallback with a 'missing company' tag."
4. Tests. One per acceptance criterion and one per edge case. "Submit a form with a German address, expect a LinkedIn
   task, no email step."
5. The spec is the documentation's first draft. When the build is done, you update the spec to match what was built.
6. Screen demo. Raka writes the spec for Routeful's inbound routing on the template's spec tab, 9 edge cases and 12
   tests.

**Do it now.** (10 min) List eight edge cases for your Lesson 4.1 build and what happens in each.

#### Lesson 4.3 Sprints with demos (6 min)

**In plain words.** A **sprint** is a fixed block of time, usually two weeks, with a short list of tasks and one goal.
Every sprint ends with a demo, where you show the working thing on real data to the people who'll use it.

**You'll be able to.**
- Plan a build as sprints with a checkable goal each
- Run a 20 minute demo that gets real feedback
- Keep a backlog and choose what comes next

**What's shown.**
1. A sprint. Two weeks, three to five tasks, one goal you can check. "By 14 March, every inbound request is routed and
   logged, with 10 test submissions passing."
2. The **backlog** is the list of everything that could be built, ranked. Rank by value (from your unit economics), effort
   and risk. Score each 1 to 5 and sort.
3. The demo. Real data, not slides. Show the thing working, show one edge case, show the log. Then ask the users two
   questions. What would stop you using this? What's missing for Monday?
4. Write the feedback into the backlog the same day. Decide the next sprint's goal at the end of the demo, with the person
   who signs off.
5. A short look back after each sprint. What worked, what to change, one line each.
6. Why this suits GTM builds. Sales teams change their minds when they see the real thing. Two weeks is short enough that
   a wrong turn costs little.

**Do it now.** (5 min) Write the goal for sprint 1 and sprint 2 of your Lesson 4.1 build, each as a checkable sentence
with a date.

#### Lesson 4.4 Maintenance, monitoring and documentation (8 min)

**In plain words.** A GTM system breaks quietly. A field gets renamed, an API key expires, a provider changes what it
returns. Maintenance means keeping it working, monitoring means finding out first, and documentation means anyone on the
team can fix it.

**You'll be able to.**
- Set up monitoring for every flow and agent
- Write a runbook someone else could follow
- Make sure nothing depends on one person's memory

**What's shown.**
1. Monitoring. A health tab or dashboard with one row per flow. Last successful run, runs today, errors today, outputs
   against inputs, owner. An error workflow in n8n sends alerts to one channel. A weekly check of the agent's review queue
   rejection rate.
2. Quiet checks. A daily count of new contacts without an owner, deals stuck past their stage limit, and signals that
   fired with no task. If a number jumps, something upstream broke.
3. The **runbook** is a short document for each flow. What it does, what triggers it, where it logs, how to tell it's
   broken, how to pause it, how to fix the three most likely failures, who to tell.
4. The **change log** for the system. Date, what changed, why, who. Every field rename and every prompt version goes in.
5. **Tribal knowledge** is knowledge that only lives in someone's head. The test. If you were away for two weeks, could a
   colleague pause, fix and restart every flow from the runbook alone? If not, write until they could.
6. Where documentation lives. One folder, named the same way for every build. The data model, the specs, the runbooks,
   the change log, a two minute screen recording per flow.
7. Maintenance as a job. Tools change every few months. Plan a monthly hour to check every flow, every key's expiry date,
   and every provider's output on five rows.
8. Astra's own rule fits here. Write it down at the moment it's verified, with the source, the number and the date. A
   note written later keeps the conclusion and loses the evidence.

**Do it now.** (10 min) Write the runbook for your Level 2 n8n flow on the template's runbook tab.

#### Lesson 4.5 Pricing your work, portfolio and the take home task (8 min)

**In plain words.** If you sell your work as a freelancer or agency, you need a way to price it. If you want a job, you
need a portfolio and a way to handle the take home task. This lesson covers both, without market numbers, because rates
differ by country, experience and client.

**You'll be able to.**
- Choose between fixed price, day rate, retainer and a paid audit
- Build a price from parts and check it against the value
- Update your portfolio to architect level and plan a 90 minute take home task

**What's shown.**
1. Four ways to charge. A **paid audit** (a short review that ends in a written plan) is a good first step with a new
   client. **Fixed price** for a clear scope, where you carry the risk of overrunning. **Day rate** when the scope is
   unclear, so the client carries that risk. A **retainer**, a monthly fee for running and maintaining the system.
2. Building a fixed price. List the parts from the scope. Estimate hours each, honestly. Add time for discovery, demos,
   testing, documentation and fixes. Multiply by your rate. Then compare with the value from the unit economics. If the
   build is worth little to them, it's the wrong build.
3. Finding your rate. Look at what people with similar experience in your country charge, ask peers, check salary ranges
   in job ads. Raise it after each project that went well. This course gives no number on purpose.
4. Tool costs belong to the client, on the client's accounts. Say so in writing.
5. The architect portfolio. Lead with the capstone. Then one architecture piece (the revenue map and GTM brain diagram),
   one agent piece (the eval scores across versions), one signal piece (the backtest). Each as problem, what you built,
   the result with a count, what you'd change. Blur every real name and remove every key.
6. The take home task at senior level. Usually "design our system" or "audit this setup". Split 90 minutes into 10 for
   reading and writing assumptions, 50 for designing, 15 for checking (try to prove your own design wrong, trace one
   record end to end), 15 for the cover note.
7. The cover note. Goal as you understood it. Assumptions. What you designed, with links. How you checked it. What you'd
   build first and why. What you'd watch out for.

**Do it now.** (10 min) Break your Lesson 4.1 build into parts with honest hours, including the hours people forget.

#### Lesson 4.6 Interview questions, with model answers (6 min)

**In plain words.** Senior GTM engineering and RevOps interviews ask about design, judgement and leading work, not only
tools. Here are the common questions with model answers built from your course work. Practise them out loud with your own
numbers.

**You'll be able to.**
- Answer the eight most common architect questions with your own builds
- Use the situation, design, result, lesson shape
- Say "I don't know" with a method attached

**What's shown.**
1. **"How would you design our GTM system?"** "I'd start by drawing your current revenue system on one page with you,
   people, tools and the data between them, and find the three biggest leaks by money. Then I'd set one source of truth
   per field and fix the leak worth the most first, in two week sprints with a demo each time."
2. **"How do you decide what to build first?"** "Value from the unit economics against effort and risk. A renewal alert
   that keeps two customers can beat a big enrichment project. I write both numbers down before choosing."
3. **"How do you use AI agents safely?"** "Tables in and out, one job per AI step, every claim with a source, a check
   that quotes really appear in the page, a falsification step, and a person approving anything that sends. I test it on
   20 accounts with known answers and rerun them after every prompt change."
4. **"How do you know a signal matters?"** "I backtest it on won and lost deals with the counts written next to the lift.
   Under about 10 deals I call it 'can't tell yet'. I recheck monthly."
5. **"Two tools disagree about a contact. What happens?"** "The data model says which tool is the source of truth for that
   field and the write rule. If that isn't written, that's the first fix."
6. **"How do you make sure your work survives you?"** "Specs, runbooks, a change log and a short recording per flow, in
   one folder. The test is whether a colleague could pause and fix every flow without me."
7. **"Tell me about something you built that didn't work."** Use your best "didn't work" from the capstone, as what
   happened with a number, why and how sure you are, and what you changed.
8. **"How would you work with a sales team that doesn't trust the CRM?"** "Fewer required fields, only the ones the
   process needs, automation for the boring parts, and a dashboard they actually use in their own meeting. Trust comes
   from the data being right for a few weeks running."
9. When you don't know. "I haven't used that. I'd read its documentation, test it on two records and check the output by
   hand before using it on real data." Never bluff.
10. Questions to ask them. Who owns the CRM? What's the first thing you'd want fixed? How will you judge this role after
    six months?

**Do it now.** (10 min) Record yourself answering questions 1, 3 and 7 with your own builds, each under 90 seconds.

#### Quiz 4 (pass 80%)

1. Which acceptance criterion is checkable?
   A. "Routing works well"
   B. "Every inbound request gets an owner within 5 minutes, tested with 10 submissions, all logged"
   C. "Fast and reliable"
   D. "The team is happy"
   **Answer.** B. **Why.** It has a number, a test and evidence. **Rewatch.** 4.1

2. A client asks you to "build our whole engine". What's the best first move?
   A. Say no
   B. Start building straight away
   C. Quote for everything
   D. Scope a small first build or a paid audit, then decide the next step together
   **Answer.** D. **Why.** A small first win is easier to deliver and earns the bigger build. **Rewatch.** 4.1

3. What's an edge case?
   A. A pricing tier
   B. An unusual situation the build must still handle, like a form with no company name
   C. A type of chart
   D. The main way a flow is used
   **Answer.** B. **Why.** Edge cases are where builds break. **Rewatch.** 4.2

4. True or false. A sprint demo is best done with slides.
   **Answer.** False. **Why.** Show the working thing on real data, an edge case and the log. **Rewatch.** 4.3

5. What should happen to demo feedback?
   A. It goes into the backlog the same day, and the next sprint goal is agreed with the person who signs off
   B. It's ignored until the build is finished
   C. It's emailed to everyone
   D. It replaces the scope
   **Answer.** A. **Why.** Feedback is only useful once it's ranked against everything else. **Rewatch.** 4.3

6. Which is the best test of whether your system depends on tribal knowledge?
   A. Whether you remember how it works
   B. Whether a colleague could pause, fix and restart every flow from the runbook while you're away
   C. Whether it uses n8n
   D. Whether it has a dashboard
   **Answer.** B. **Why.** Knowledge only in your head is a risk. **Rewatch.** 4.4

7. The count of new contacts without an owner jumps from 2 to 40 in a day. What does it most likely mean?
   A. Something upstream broke, like a routing flow or a renamed field
   B. The CRM is full
   C. Marketing had a great day
   D. Nothing
   **Answer.** A. **Why.** Quiet checks catch broken flows that don't throw errors. **Rewatch.** 4.4

8. A scope is clear and fixed. Which pricing usually fits?
   A. A retainer before any build
   B. Fixed price
   C. Free work
   D. A percentage of revenue only
   **Answer.** B. **Why.** With a clear scope, a fixed price works and you carry the overrun risk. **Rewatch.** 4.5

9. Whose accounts should a client's Clay, lemlist and n8n run on?
   A. A shared personal account
   B. It doesn't matter
   C. The client's
   D. Yours
   **Answer.** C. **Why.** Tool costs and data belong to the client. **Rewatch.** 4.5

10. An interviewer asks how you'd use AI agents safely. Which answer is strongest?
   A. "I check the output when I have time" B. "I don't use AI" C. "Tables in and out, sourced claims, a quote check, a
   falsification step, a person approving any send, and a 20 account test set rerun after every change" D. "I trust the
   latest model"
   **Answer.** C. **Why.** It names checks, a gate and a test. **Rewatch.** 4.6

#### Assignment 4. Service pack, portfolio and a timed take home task

**Goal.** Package one build the way a client or a team would receive it, update your portfolio to architect level, and do
a 90 minute timed design task.
**Time.** About 4.5 hours (Part A 2.5 hours, Part B 2 hours including the 90 minute task).
**You need.** `L3 Service pack`, Assignments 1 to 3, a page builder for the portfolio (Google Sites or similar), a timer.

**The take home brief (read it only when you start the timer).** "Routeful (practice company) has 35 staff, HubSpot used
by half the team, a Clay table run by hand once a month, lemlist, and no call recording. Inbound requests wait a day,
nobody owns renewals, and Eva builds the forecast in a spreadsheet on Sundays. In 90 minutes, design (1) a one page
revenue system map with the three biggest leaks, (2) the target GTM brain naming every tool and what each arrow carries,
(3) the first two sprints with checkable goals, and (4) the three numbers you'd show Eva each week. Hand in one doc or
deck and a one page cover note."

**Steps.**

*Part A, the service pack.*
1. Pick one build from your Assignment 1 leaks. Write its one page scope on the template, with a "not included" list of at
   least five lines and at least three acceptance criteria.
2. Write the spec with at least 8 edge cases and a test for each acceptance criterion and edge case.
3. Write a sprint plan of two to three sprints, each with a checkable goal, tasks and a demo plan.
4. Write the runbook and the monitoring rows for every flow in the build.
5. Break the build into parts with hours, add the hours people forget, and write the pricing method you'd use and why.
   Leave the rate as a cell to fill.

*Part B, getting hired.*
6. Update your portfolio page with the four architect pieces from Lesson 4.5. Blur names, remove keys, check every link in
   a private window.
7. Set a 90 minute timer. Read the take home brief. Follow the 10, 50, 15, 15 split. Stop when the timer ends.
8. Record a 3 minute walk through of your take home answer and your answers to three questions from Lesson 4.6, each under
   90 seconds.

**Hand in.**
- The `L3 Service pack` link (scope, spec, sprint plan, runbook, pricing tabs)
- The portfolio link
- The take home doc or deck and cover note, with start and end times at the top
- The walk through and interview recordings

**Marking rubric.**

| Criterion | 0 | 1 | 2 | Must? |
|---|---|---|---|---|
| Scope | Missing, or no "not included" | Present, acceptance criteria vague | One page, five or more exclusions, three or more checkable acceptance criteria | Must |
| Spec with edge cases and tests | Missing | Steps only, few edge cases | 8 or more edge cases with outcomes, a test for each criterion and edge case | |
| Sprints and demos | Missing | Sprints without checkable goals | Two to three sprints, dated checkable goals, demo plan with real data | |
| Runbook and monitoring | Missing | Runbook without pause or fix steps | Runbook per flow with how to tell it's broken, pause and fix, plus monitoring rows | Must |
| Pricing method | Missing, or a number copied from somewhere | Method without hours or value check | Parts with hours, forgotten hours added, method chosen with a reason, value check | |
| Portfolio | No update | Updated, pieces missing parts or privacy issues | Four pieces in the four part shape, clean, every link works for a stranger | |
| Take home task | Over time, or two or more parts missing | One part missing or thin | All four parts within 90 minutes, cover note with assumptions and checks | Must |

**Good example.** Elif's scope for "renewal ownership" lists seven exclusions, from "no new CS hire" to "no changes to
billing". Her spec has 10 edge cases, including "the champion left the customer". Her runbook says how to pause the
renewal flow in n8n in two clicks. Her take home answer, 10.00 to 11.30, maps Routeful in five lanes, names the inbound
Monday gap as leak one, and sets sprint 1 as "by day 14, every inbound request owned within 5 minutes, 10 tests passing".
Her three numbers for Eva are median speed to lead, renewals due in 90 days with an owner, and signals acted on per week.

**Bad example.** Jonas's scope is "AI sales system, all included". There's no spec and no runbook. His take home ran 2
hours 40 minutes and lists 14 tools with no arrows. Three musts fail.

**Stuck?**
1. **Your "not included" list is short.** Ask what the client will assume you're doing. Data cleaning, training the team,
   new tool licences, ongoing support and other countries are the usual ones.
2. **The take home runs over.** Stop designing at minute 60 whatever happens, then check and write the note. An honest
   "not finished, here's what I'd do" beats going over.
3. **You've never priced anything.** Price the parts in hours only. Hours plus the method is what's marked, not the
   rate.

---

### Module 5. The Architect capstone

**Goal.** Plan the whole revenue system for one company, build and run it for two weeks, document it so anyone could take
it over, and write and present it with honest numbers and a 90 day roadmap.
**Time.** 34 minutes of video, plus 2 hours for the plan (the capstone itself is 15 to 20 hours over about 3 weeks, see
the Level 3 capstone section).
**You need.**
- Assignments 1 to 4, passed
- Templates `L3 Capstone plan` and `L3 Evidence log`
- The Level 3 capstone brief and rubric below, read in full
- A calendar you'll actually follow

#### Lesson 5.1 Planning the capstone (7 min)

**In plain words.** The capstone is the whole system, designed, built and run on one company. A good plan decides the
question, the scope, the dates and what "done" means before you start, so the live weeks are for running, not
rebuilding.

**You'll be able to.**
- Turn Assignments 1 to 4 into a capstone checklist of reuse, update or new
- Write the one question your capstone answers
- Set dates, activity targets and kill criteria

**What's shown.**
1. The capstone in one line. Design the whole revenue system for one company, build the parts that fix its biggest leaks,
   run it for two weeks, and write it up with real numbers, including what failed.
2. Reuse, don't restart. List the twelve capstone parts. Next to each write "reuse", "update" or "new", and the
   assignment it comes from.
3. The question. "Will routing every tier 1 signal to an owner within a day, with agent researched drafts approved by a
   person, book more first meetings with heads of planning at Dutch fleets of 40 to 150 trucks?" One question keeps you
   honest.
4. Dates. Week 1, build and test. Weeks 2 and 3, live. Write up straight after. Put the daily and weekly routine in your
   calendar.
5. Targets. Activity targets are in your control (accounts reached, signals acted on within the time limit, drafts
   reviewed). Results aren't, so write them as ranges you hope for.
6. **Kill criteria** are signs, written in advance, that make you stop and fix before going on. Bounce rate climbing, a
   spam placement in tests, a LinkedIn warning, a sent message with a claim the research didn't prove, an agent eval score
   dropping after a change.
7. If you're not working inside a real company, use the Routeful pack for the system and your own market for live
   sending, and say so in the case study. Never book fake meetings with real people.

**Do it now.** (10 min) Write your capstone question and the reuse, update or new list.

#### Lesson 5.2 The architecture diagram and the 90 day roadmap (7 min)

**In plain words.** Your capstone needs two pictures. The architecture diagram shows the whole system as built, every
tool, flow, agent and the data between them. The 90 day roadmap shows what comes after the capstone, in order, with
owners and numbers.

**You'll be able to.**
- Draw an architecture diagram that matches what's really built
- Plan 90 days as sprints with checkable goals
- Tie every roadmap item to a leak and a number

**What's shown.**
1. The architecture diagram starts from your GTM brain (Lesson 1.5). Add every n8n flow as a labelled arrow, the agent as
   a box with its human gate drawn as a separate step, the signal loop as the arrow back from ears to senses and
   judgement, and the source of truth for each key field.
2. Label every arrow with what travels, the flow's name and how often it runs. Mark what's live in one colour and what's
   planned in another.
3. The test. Pick one account and trace it on the diagram from the first signal to a logged meeting. If you can't, the
   diagram is missing something.
4. The 90 day roadmap. Three phases of 30 days, two sprints each. Each sprint has a goal you can check, an owner, the leak
   it addresses and the number that will show it worked.
5. Order by value and risk. Fix the leak worth the most first, unless it needs clean data you don't have yet, in which
   case data comes first.
6. What doesn't go in. Anything without an owner or a number. "Improve AI" isn't a roadmap item. "Day 45, agent rejection
   rate under 20% on 100 reviewed drafts" is.
7. Screen demo. Raka draws Routeful's architecture as built in a capstone example, then a 90 day roadmap with renewals in
   phase 1, signal backtests monthly in phase 2 and a forecast review in phase 3.

**Do it now.** (10 min) Draw the first version of your architecture diagram and trace one account through it.

#### Lesson 5.3 Running live and documenting as you go (7 min)

**In plain words.** During the two live weeks you follow a daily and weekly routine, and you write everything down the
day it happens. The evidence log and the documentation are part of the capstone, not something you do at the end.

**You'll be able to.**
- Run a 20 minute daily routine and a weekly review
- Keep a dated evidence log
- Change one thing at a time and record it

**What's shown.**
1. Daily. Read new replies, each thread in full, and answer positives within one working day. Review the agent's queue
   and approve or reject with reasons. Check the flow health tab and the alerts. Check the kill criteria.
2. Weekly. Fill the scorecard. Rerun the agent's 20 account eval if you changed a prompt. Look at signals acted on
   against the time limits. Write one paragraph in the evidence log.
3. The **evidence log** is a dated list of what you did, what you saw and what you decided, with links. Columns. Date,
   part, what happened, number with its source, decision, why.
4. Write it the same day. A note written a week later keeps the conclusion and loses the evidence. Write the number and
   where it came from.
5. Mistakes go in too. They're the best part of the case study.
6. Change one thing at a time, on a set day, and log it in the change log. If you change the message and the segment on
   the same day, you won't know which one did it.
7. Keep the runbooks and specs up to date as you build. If something changed from the spec, change the spec.

**Do it now.** (5 min) Put the daily routine and the weekly review in your calendar for the two live weeks.

#### Lesson 5.4 The case study and what didn't work (7 min)

**In plain words.** The case study tells the story of your capstone in two or three pages. The question, the design, what
ran, what happened in numbers, what didn't work and the roadmap. Someone else should be able to check every number.

**You'll be able to.**
- Structure a case study in seven short parts
- Write numbers as count, rate, period and source
- Write failures in a three part format

**What's shown.**
1. The seven parts. A three sentence summary. The company and the question. The design (architecture diagram, data model,
   the leaks it fixes). What ran (dates, volumes, flows, the agent's eval scores). What happened (the whole funnel with
   counts). What didn't work. The 90 day roadmap.
2. Numbers. Count, then rate, then period, then source. "104 people reached between 3 and 14 March, 6 positive replies
   (5.8%), 2 meetings held. Source, lemlist and HubSpot exports, attached."
3. Show the whole funnel. Zeros stay in. Astra's own numbers are shown this way. 330 researched cold first messages
   between 14 July and 25 October 2026, 26 said yes (7.9%), and 7 meetings by 25 October. In October alone, 119 first
   pitches, 30% replied and 15% said yes, against 4% in September. No paid project closed by then, and the write up says
   so.
4. Careful with cause. "After the change, positive replies went from X to Y" is fine. "The change caused it" needs one
   change at a time and a big enough sample.
5. Each failure in three parts. What happened, with a number. Why you think so, and how sure you are. What you changed or
   would change.
6. Didn't work or can't tell. Low numbers from a small sample are "can't tell yet". Say which is which.
7. Anonymise. No prospect names, no screenshots with real names or emails.

**Do it now.** (10 min) Write the three sentence summary your case study would have if it went well, then the version if
it went badly. Both honest and specific.

#### Lesson 5.5 Presenting to a decision maker (6 min)

**In plain words.** An architect has to explain the system to people who won't build it, like a sales director or a
founder. The capstone presentation is practice for that. Fifteen minutes, live screens, plain words, and every number
shown at its source.

**You'll be able to.**
- Structure a 15 minute presentation for a non technical decision maker
- Show the system live and trace one account end to end
- Answer hard questions without bluffing

**What's shown.**
1. The order. The problem and the leaks (2 minutes). The design on one diagram (3 minutes). The system live, tracing one
   account from signal to meeting (5 minutes). The numbers and what didn't work (3 minutes). The roadmap and what you need
   from them (2 minutes).
2. Plain words. Say "it tells Sanne which accounts to call this morning and why", not "the routing layer pushes scored
   events".
3. Live screens beat slides. Have every tool open and logged in. Slides only for the diagram and the numbers.
4. Show a number's source when asked. Practise opening the export behind your main number in under 30 seconds.
5. End with a decision. "I need an owner for renewals and two hours of Eva's time for the forecast review in phase 3."
6. When you don't know, say so and say how you'd find out.

**Do it now.** (5 min) Write your five section timings and the one decision you'll ask for.

#### Quiz 5 (pass 80%)

1. What's the best first step in planning the capstone?
   A. List the twelve parts and mark each reuse, update or new
   B. Buy new tools
   C. Rebuild everything from scratch
   D. Write the case study
   **Answer.** A. **Why.** Most parts come from Assignments 1 to 4. **Rewatch.** 5.1

2. True or false. "10 meetings booked" is a fair pass condition for the capstone.
   **Answer.** False. **Why.** Results aren't fully in your control. Judge on activity and an honest reading.
   **Rewatch.** 5.1

3. Which is a kill criterion specific to an agent?
   A. A meeting gets booked
   B. A reply comes in
   C. The dashboard colour changes
   D. The agent's eval score drops after a prompt change
   **Answer.** D. **Why.** A drop means a regression, so you stop and fix. **Rewatch.** 5.1

4. How do you test your architecture diagram?
   A. Count the boxes
   B. Trace one account through it from the first signal to a logged meeting
   C. Ask whether it looks good
   D. Show it to a friend
   **Answer.** B. **Why.** If you can't trace a record, something's missing. **Rewatch.** 5.2

5. Which is a good 90 day roadmap item?
   A. "Improve AI"
   B. "Better data"
   C. "More meetings"
   D. "Day 45, agent rejection rate under 20% on 100 reviewed drafts, owner Sanne"
   **Answer.** D. **Why.** It has a date, a number and an owner. **Rewatch.** 5.2

6. Why write the evidence log the same day?
   A. To use more screenshots
   B. The template says so
   C. It's faster
   D. A note written later keeps the conclusion and loses the evidence
   **Answer.** D. **Why.** You need the number and its source. **Rewatch.** 5.3

7. In week 2 you want to change both the message and the signal points. What do you do?
   A. Change both today
   B. Change nothing ever
   C. Change both and don't log it
   D. Change one on a set day and log it
   **Answer.** D. **Why.** One change at a time is the only way to know what worked. **Rewatch.** 5.3

8. Which results line is written well?
   A. "5.8% positive"
   B. "Lots of interest"
   C. "104 people reached 3 to 14 March, 6 positive replies (5.8%), source lemlist export"
   D. "Great engagement!"
   **Answer.** C. **Why.** Count, rate, period and source. **Rewatch.** 5.4

9. True or false. Few positive replies from 30 people is a clear failure of the message.
   **Answer.** False. **Why.** It's too small a sample. Say "can't tell yet". **Rewatch.** 5.4

10. A sales director asks what your routing flow does. Which answer suits them best?
   A. "It's an n8n workflow with eleven nodes"
   B. "It tells Sanne each morning which accounts to call and why"
   C. "It pushes scored events through the routing layer"
   D. "It's complicated"
   **Answer.** B. **Why.** Plain words about what changes for their people. **Rewatch.** 5.5

#### Assignment 5. The capstone plan

**Goal.** Write a capstone plan good enough that someone else could check your run against it.
**Time.** 2 hours.
**You need.** Assignments 1 to 4, `L3 Capstone plan`, `L3 Evidence log`, the capstone brief and rubric below.

**Steps.**
1. Read the capstone brief and rubric in full.
2. Copy `L3 Capstone plan` into a folder named `Capstone [your name] [company]`.
3. Write the company, why you chose it, and your one question.
4. Fill the parts table. For each of the twelve parts, reuse, update or new, the assignment it comes from, and what you'll
   change.
5. Draw the first architecture diagram, live parts and planned parts in different colours.
6. Write the dates. Build week, two live weeks, write up. Put the daily and weekly routine in your calendar.
7. Write activity targets and result ranges.
8. Write at least five kill criteria, at least one for the agent, and what you'll do when each fires.
9. Write a risk list with a plan B each, including every tool trial's end date, and the channel rule for each country you
   contact. Not legal advice, check your country.
10. Set up the evidence log and write the first entry.

**Hand in.**
- The capstone plan link
- The first architecture diagram
- A calendar screenshot with the routine
- The evidence log link with at least one entry

**Marking rubric.**

| Criterion | 0 | 1 | 2 | Must? |
|---|---|---|---|---|
| One clear, checkable question | None | Vague | Names the company type, persona, the change and the result to watch | Must |
| Parts table | Parts missing | All listed, changes not described | All twelve parts with source assignment and planned change | Must |
| First architecture diagram | Missing | Tools only | Every flow, the agent and its gate, the signal loop, live and planned marked | |
| Dates and routine | None | Weeks only | Dates for every phase, routine in the calendar | |
| Targets and kill criteria | Missing | Targets only or vague kill criteria | Activity targets, result ranges, five or more kill criteria with actions, one for the agent | Must |
| Risks, trials and country rules | Missing | Some | Every trial date checked, plan B per risk, channel rule per country | |

**Good example.** Ravi plans for his employer, a 40 person fleet telematics company. His question is "Will routing tier 1
signals to an owner within one working day, with agent drafts approved by a person, book more first meetings with fleet
managers at Belgian firms of 30 to 200 vehicles?" Eight parts are reused, three updated and the roadmap is new. One kill
criterion reads "eval score under 16 of 20 after any prompt change, roll back the same day".

**Bad example.** Eva's plan says "build the full AI system and see what happens, aim for 20 meetings". No question, no
parts table, no kill criteria. It fails three musts.

**Stuck?**
1. **Your company won't let you send live.** Run the live part on your own market or a practice market, and build the
   rest on your company's real tools and data. Say so in the case study.
2. **Your question is too broad.** It doesn't name a persona or a change. Add both and narrow to one country and size band.
3. **A trial ends mid run.** Check every date now. Move the run or plan the paid month.

---

## Level 3 capstone. Design and run the whole revenue system

**Goal.** Design the whole revenue system for one company, build and run the parts that fix its biggest leaks for two
weeks, document it so anyone could take it over, and present it with honest numbers and a 90 day roadmap.
**Time.** 15 to 20 hours over about 3 weeks (1 build week, 2 live weeks), then the write up.
**When.** After Assignment 5 passes. The final exam can be taken before or during the capstone.
**You need.** Everything from Modules 1 to 5 and your Level 2 builds, a sending setup that's warm, the tools on free plans
or trials (check each pricing page and plan around trial end dates).

### The brief

Design and build on a real company you work for or with, or on the Routeful pack with your own market for the live
sending (say which in the case study). It must contain all twelve parts and run live for two weeks.

| # | Part | What it must have | Built in |
|---|---|---|---|
| 1 | **Revenue map** | Current state on one page, five lanes, three leaks ranked by money with evidence | Module 1 |
| 2 | **Unit economics** | LTV, CAC, payback, inputs sourced with counts, used to order the work | Module 1 |
| 3 | **Data model** | One source of truth per field, IDs, sync direction and write rules, opt out across tools | Module 1 |
| 4 | **Architecture diagram** | The system as built, every flow, the agent and its gate, the signal loop, traceable for one account | Modules 1 and 5 |
| 5 | **Bible to spec** | Exit criteria and key rules as fields, validations, automations and checks | Module 1 |
| 6 | **Agent with a test set** | Multi step, tables in and out, checks, falsification step, human gate, log, scored on 20 accounts with known answers, at least two versions | Module 2 |
| 7 | **Signal loop** | Library of 8 or more, 3 backtested, routing built with a fallback, eavesdrop loop run with checked quotes, a change log | Module 3 |
| 8 | **Live run** | Two weeks on a warmed domain and LinkedIn, safe caps, country rules, every message approved by a person, opt outs the same day | Level 2 and Module 2 |
| 9 | **Dashboard and forecast** | Scorecard for both weeks, health tab for flows, a weighted forecast tied to signals | Module 3 and Level 2 |
| 10 | **Documentation** | Specs, runbooks, change log and a short recording per flow, in one folder | Module 4 |
| 11 | **Case study** | Two to three pages, seven parts, counts and sources, at least three failures | Module 5 |
| 12 | **90 day roadmap** | Six sprints with checkable goals, owners, the leak each fixes and the number that shows it | Module 5 |

**Rules for the run.**
- Send from the warmed sending domain only, starting with a safe first send of 20 to 30 people.
- Keep send caps and LinkedIn limits as written in your plan. Check LinkedIn's terms and each country's rules. Not legal
  advice.
- No message goes out without a person's recorded approval. Read each thread in full before every approval.
- Change one thing at a time, on a set day, and log it. Rerun the agent's eval after every prompt change.
- Stop and fix when a kill criterion fires, and write it up.
- Never put real prospects' names or emails in anything you hand in.

### Hand in

One shared folder, view access, with these exact names.

1. `01 Case study` (two to three pages, three sentence summary at the top)
2. `02 Revenue map and unit economics`
3. `03 Data model and bible to spec`
4. `04 Architecture diagram` (image or slide, plus the one account trace written out)
5. `05 Agent` (spec, n8n export with keys removed, eval set with every version scored, review queue, log)
6. `06 Signals` (library, backtests, routing flow export, transcript table with quote checks, change log)
7. `07 Live run` (every message version, sequence settings, DNS checks, send log by day, approval log)
8. `08 Dashboard and forecast` (Looker Studio link, scorecard for both weeks, health tab, forecast tab)
9. `09 Documentation` (specs, runbooks, change log, recordings)
10. `10 Evidence log`
11. `11 Roadmap`
12. `12 Presentation` (slides or doc for 20 minutes)

### Marking rubric

Scored 0, 1 or 2 per criterion. **Pass.** At least 70% of the points (14 of 20) and no 0 on a criterion marked **must**.
1:1 learners and those who bought the capstone review can resubmit once after fixing what scored low.

| # | Criterion | 0 | 1 | 2 | Must? |
|---|---|---|---|---|---|
| 1 | Revenue map, leaks and unit economics | Missing or no leaks | Map and leaks, no evidence or economics | Five lane map, three leaks ranked by money with evidence, economics used to order the work | Must |
| 2 | Data model and bible to spec | Missing | Partial, no sources of truth or no checks | One source of truth per field, IDs, sync rules, opt out, exit criteria as fields and checks | |
| 3 | Architecture diagram | Missing or a logo map | Tools and arrows, unlabelled or not matching what's built | Matches what's built, arrows labelled, agent gate and signal loop drawn, one account traced | Must |
| 4 | Agent with a test set | No agent or no test set | Agent runs, test set scored once or answers written after | Multi step, checks and falsify step, two or more versions scored on 20 with answers dated first, regressions checked | Must |
| 5 | Human gate and honest sending | Anything sent without approval, or main domain used | Gate exists, some approvals unrecorded or caps not kept | Every message approved by a named person with a date, threads read, warmed domain, caps, country rules, opt outs same day | Must |
| 6 | Signal loop | No library or no loop | Library and routing, no backtest or unchecked quotes | Backtested signals, routing with fallback, loop run with checked quotes, changes logged | |
| 7 | Measurement and forecast | No numbers, or numbers don't add up | Scorecard present, traps ignored or no forecast | Both weeks, counts next to rates, numbers match source exports, forecast tied to signals | Must |
| 8 | Documentation | None | Some specs or runbooks | Specs, runbooks with pause and fix steps, change log and recordings, someone else could take it over | |
| 9 | Case study and what failed | Missing, or only successes | Numbers present, failures vague | Seven parts, full funnel with counts, three or more failures in the three part format | Must |
| 10 | Roadmap and presentation | Missing | Roadmap without owners or numbers, or presentation over time | Six sprints with goals, owners and numbers, presented in plain words in time with live screens | |

**Results don't decide the pass.** A capstone with few replies and an honest, well measured write up can score full
marks. One with great replies, unrecorded approvals and unsourced numbers fails.

### Good example, in short

Marco designs for a 25 person cold storage software company. His map finds three leaks, inbound waiting a day, no renewal
owner and a forecast built by gut. His data model has 24 rows with HubSpot as the spine. His agent scored 13, 17 and 18
of 20 across three versions, and his approval log shows 71 drafts reviewed, 52 approved and 19 rejected with reasons. Over
two weeks he reached 96 people, with 5 positive replies (5.2%) and 2 meetings held. His failures include a routing flow
that silently skipped Belgian accounts for three days (a country code mismatch, found by the unowned contacts count) and a
signal that fired 40 times with no action taken. His roadmap starts with renewals because his unit economics showed one
kept customer was worth more than two months of new meetings.

### Bad example, in short

Julia's diagram is a page of tool logos. Her agent sends drafts straight to lemlist with no approval step, and her test
set was written after the runs. Her case study claims a "40% reply rate" that counts out of office replies. No failures
and no roadmap owners. It fails the musts on the diagram, the agent, the gate, measurement and the case study, even though
her n8n flows are well built.

### The capstone presentation session

**Format.** 60 minutes on video with Raka. For 1:1 learners it's S6. Self learners who buy the capstone review (€149)
book the same session. You share your screen.

| Minutes | Part |
|---|---|
| 0 to 20 | You present as if to a sales director, in the Lesson 5.5 order, with live screens |
| 20 to 50 | Raka asks questions, asks you to show sources live and marks the rubric |
| 50 to 60 | Result, feedback per criterion, and anything to fix if it didn't pass |

Within 24 hours you get the written rubric with a comment per criterion and, on a pass with the exam passed, the GTM
Architect Certified certificate.

**Questions Raka picks from.**
1. Which leak did you fix first, and what number made you choose it?
2. Trace one account on your diagram from signal to meeting, then show me the same account in the CRM.
3. Two tools disagree about a field. Which wins, and where is that written?
4. Show me a draft your agent wrote that you rejected, and why.
5. Which eval account is unstable, and what would you do about it?
6. Show me the approval for the third message you sent on day four.
7. Which signal did your backtest demote, and how many deals was that based on?
8. Break a flow for me. How would you know, and what does the runbook say to do?
9. Your positive reply rate is X. How many people is that, and what would you need before calling it a result?
10. If I hired you to run this for a team of six, what's in your first sprint?

**How to prepare.** Rehearse with a timer. Have every tool open and logged in. Have one account ready to trace. Expect to
open a number's source live.

---

## Level 3 final exam

**When.** After every module quiz and Assignments 1 to 5 are passed.
**Length.** 25 questions, 40 minutes, timed.
**Mix.** 15 knowledge questions and 10 scenarios. Questions 1 to 6 cover architecture, 7 to 12 agents, 13 to 18 signals,
19 to 22 running the work as a service or a team, and 23 to 25 the capstone and presenting.
**Pass mark.** 80%, so 20 of 25 correct.
**Retakes.** Two, at least 48 hours apart, from a different question pool. Write a second variant of every question for
the pool and shuffle the options (README section 5).
**After submitting.** You see each answer, the one line why, and the module to rewatch for every wrong answer.

1. **(Knowledge)** What are the five lanes of the one page revenue map?
   A. Leads, meetings, deals, wins, revenue
   B. Marketing, SDR, AE, CS, leadership
   C. Email, LinkedIn, phone, events, ads
   D. Clay, n8n, HubSpot, lemlist, Looker Studio
   **Answer.** B. **Why.** The lanes are the teams money moves through, then tools and data are added under them.
   **Module.** 1

2. **(Scenario)** ACV €10,000, gross margin 75%, customers stay 3 years, CAC €7,500. What are LTV and payback?
   A. LTV €22,500, payback 12 months
   B. LTV €22,500, payback 3 months
   C. LTV €30,000, payback 9 months
   D. LTV €7,500, payback 3 years
   **Answer.** A. **Why.** 10,000 times 0.75 times 3 is 22,500. Monthly margin is 625, and 7,500 divided by 625 is 12.
   **Module.** 1

3. **(Knowledge)** What does "one source of truth per field" mean?
   A. Only one tool may be used in the company
   B. One named tool's value wins when tools disagree, and only it writes the final version
   C. Every tool holds its own copy and they're averaged
   D. The newest value always wins
   **Answer.** B. **Why.** That stops tools overwriting each other. **Module.** 1

4. **(Scenario)** An opt out is recorded in lemlist, but the Clay table feeding a second sequence never sees it. What's
   the architecture fix?
   A. Stop using Clay
   B. Delete the contact everywhere by hand each week
   C. Ask sellers to remember
   D. An `opt_out` field with the CRM as source of truth, read by every sending tool before any send
   **Answer.** D. **Why.** An opt out must travel to every tool that can contact the person, from one source.
   **Module.** 1

5. **(Knowledge)** In the GTM brain, what are the "ears"?
   A. Dashboards
   B. Call intelligence, replies, posts and reviews
   C. The sequencer
   D. The CRM
   **Answer.** B. **Why.** Ears listen to what customers and prospects say and feed it back. **Module.** 1

6. **(Knowledge)** The bible says "a meeting counts as booked only with four facts". What makes it part of the system?
   A. Four fields, required at Meeting booked, and a weekly view of meetings missing any
   B. A line in the onboarding deck
   C. A bonus for SDRs who remember
   D. A reminder in the team meeting
   **Answer.** A. **Why.** Field, validation and check make the rule real. **Module.** 1

7. **(Knowledge)** Why does a production agent use one AI call per AI step instead of one big prompt?
   A. It's cheaper every time
   B. It looks better in n8n
   C. Claude requires it
   D. Each step's output can be checked and logged, so you can see where it went wrong
   **Answer.** D. **Why.** Separate steps make failures visible. **Module.** 2

8. **(Scenario)** Your agent's claims table quotes "we plan everything in Excel" but the quote isn't in the fetched page
   text. What should happen automatically?
   A. The claim is dropped as unsupported, and the row is flagged if the draft used it
   B. The agent is asked again until it agrees
   C. The draft is sent with a softer wording
   D. Nothing, it's probably right
   **Answer.** A. **Why.** The quote check catches made up claims. **Module.** 2

9. **(Knowledge)** Which is the correct rule for the human gate?
   A. A manager approves once a month in bulk
   B. The agent approves its own drafts above a confidence score
   C. Approval is only needed for tier 3 accounts
   D. Nothing goes on to the sequencer without an `approved` status set by a named person, with a date and a reason
   **Answer.** D. **Why.** A person approves anything that sends, every time. **Module.** 2

10. **(Scenario)** The approver replies "fine, but make it shorter". What happens next?
   A. Shorten it and send without showing again
   B. Reject the account
   C. Send the original
   D. A new version is made and needs a new approval
   **Answer.** D. **Why.** An edit request isn't an approval. **Module.** 2

11. **(Knowledge)** When should the expected answers for an eval set be written?
   A. After the first run, to match
   B. Before any run, and dated
   C. Only for accounts the agent got wrong
   D. Never, the agent decides
   **Answer.** B. **Why.** Answers written after the run can't test anything. **Module.** 2

12. **(Scenario)** Which job is the best fit for plain code rather than an agent?
   A. Drafting openers for a person to approve
   B. Summarising 50 call transcripts with quotes
   C. Researching 200 accounts against a fixed question list
   D. Copying the deal owner from HubSpot into a log sheet every night
   **Answer.** D. **Why.** It's the same every time and needs no judgement. **Module.** 2

13. **(Knowledge)** Which columns belong in a signal library?
   A. Definition, source, detection, freshness window, points, owner, action and evidence
   B. Only the signal name and points
   C. The SDR's commission
   D. The tool's price and logo
   **Answer.** A. **Why.** Every signal is a written, checkable decision with an owner and an action. **Module.** 3

14. **(Scenario)** "New operations lead" was present on 6 closed deals, 1 won. Without it, 24 deals, 8 won. What's the
    honest reading?
   A. Lift is about 0.5, but 6 deals is too few, so mark it "can't tell yet" and keep checking
   B. Double its points
   C. Remove the signal for good
   D. It's the strongest signal
   **Answer.** A. **Why.** 17% against 33% is a lift of about 0.5, on a sample too small to trust. **Module.** 3

15. **(Knowledge)** What must every signal routing rule include?
   A. A Slack channel for everyone
   B. A fallback for signals whose account has no owner
   C. A second CRM
   D. An AI step
   **Answer.** B. **Why.** Without a fallback, some signals are never acted on. **Module.** 3

16. **(Scenario)** Claude's summary of a lost call says the buyer named a competitor. You can't find it in the transcript.
   What do you do?
   A. Drop it, and only keep quotes you confirmed in the transcript or recording
   B. Add it to the battle card anyway
   C. Keep it, Claude read the call
   D. Ask Claude again until it finds it
   **Answer.** A. **Why.** Quotes are checked at the source before they feed anything. **Module.** 3

17. **(Knowledge)** Which is a leading number for next quarter's revenue?
   A. Customers churned last year
   B. Signals acted on within their time limit this week
   C. Revenue last quarter
   D. Average deal value last year
   **Answer.** B. **Why.** It moves before meetings, pipeline and wins. **Module.** 3

18. **(Scenario)** Target €240,000, average deal €12,000, win rate 25%, and 50% of meetings become opportunities. How
    many meetings do you need?
   A. 80
   B. 20
   C. 160
   D. 40
   **Answer.** C. **Why.** 20 deals, divided by 0.25 is 80 opportunities, divided by 0.5 is 160 meetings. **Module.** 3

19. **(Knowledge)** What's an acceptance criterion?
   A. The sprint length
   B. The price of the build
   C. A test the finished build must pass for the work to count as done
   D. The client's logo
   **Answer.** C. **Why.** It makes "done" checkable. **Module.** 4

20. **(Scenario)** A client says "we want AI for our sales team" and has no clear problem. What's the best first step?
   A. A discovery call that maps their revenue system, then a small first build or a paid audit
   B. Say no
   C. Quote a fixed price for "AI"
   D. Build an AI agent this week
   **Answer.** A. **Why.** Scope comes from the problem and the leaks, and a small first win earns the bigger build.
   **Module.** 4

21. **(Knowledge)** What's a runbook?
   A. A list of sales calls
   B. A pricing sheet
   C. A short document per flow saying what it does, how to tell it's broken, how to pause it and how to fix it
   D. The sprint backlog
   **Answer.** C. **Why.** It's how someone else keeps the system running without you. **Module.** 4

22. **(Knowledge)** Why does this course give no market rate for your work?
   A. Rates never change
   B. Rates are secret
   C. Rates differ by country, experience and client, so you build a price from parts and check it against value
   D. Freelancers shouldn't charge
   **Answer.** C. **Why.** Any single number would be wrong for many learners. **Module.** 4

23. **(Knowledge)** Which is a good 90 day roadmap item?
   A. "Make sales better"
   B. "Improve data"
   C. "Day 30, every renewal due in 90 days has an owner, checked on the health tab, owner Mira"
   D. "Do more AI"
   **Answer.** C. **Why.** Date, number, check and owner. **Module.** 5

24. **(Scenario)** Positive replies rose after you changed the opener and the segment on the same day. What's the honest
    line in the case study?
   A. "The segment caused it"
   B. "Positive replies rose after both changes. They can't be separated, so the next test changes one at a time"
   C. Leave the result out
   D. "The new opener caused it"
   **Answer.** B. **Why.** Two changes at once can't be told apart. **Module.** 5

25. **(Knowledge)** Which part of the case study do reviewers read most closely?
   A. The cover design
   B. The tool list
   C. What didn't work, with numbers and what changed
   D. The summary of the course
   **Answer.** C. **Why.** It shows you can judge your own work honestly. **Module.** 5

**Answer key at a glance.** 1 B, 2 A, 3 B, 4 D, 5 B, 6 A, 7 D, 8 A, 9 D, 10 D, 11 B, 12 D, 13 A, 14 A, 15 B, 16 A, 17 B,
18 C, 19 C, 20 A, 21 C, 22 C, 23 C, 24 B, 25 C.

---

## Certificate

| Level | What it takes | Who can get it |
|---|---|---|
| **Level 3 Completed** | Every module quiz and assignment passed (self marked counts) | Everyone |
| **GTM Architect Certified** | Every assignment passed, the capstone presented to and marked by Raka and passed, and the final exam passed | 1:1 learners as part of the course. Self learners by buying the capstone review (€149), which includes the presentation session |

The certificate names the level, the date, the capstone title and, if you agree, a link to a public one page summary of
the capstone with every real name removed.

---

## What's next

**Keep running it.** Run your capstone system for another month and update the case study. Six weeks of numbers and a
second agent version say more than two weeks.

**Track 3, GTM Leader.** If you're leading people now, or about to, the GTM Leader course covers the sales bible written
with the team, coaching from calls, forecast categories in depth, adoption and a 90 day rollout. You'll recognise the
system, Track 3 is about getting a team to live in it.

**Working with Astra.** Astra builds revenue systems for B2B companies. Strong GTM Architect graduates may be asked to
help on builds when there's a fit. It isn't promised, it depends on the work available and on your capstone. Companies
that want the system built for them can ask through the course questions form.

**The community.** Join the graduates' group to share builds, swap take home tasks for practice and hear about roles.
Post your capstone there first, others will tell you what's unclear before an employer or client does.
