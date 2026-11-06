# GTM Engineering Academy, the full curriculum (5 Nov 2026)

> **Superseded on 6 Nov 2026 by the full course pack in `docs/academy/`** (rulebook in `docs/academy/README.md`, one file per track). Keep this file as the outline it started from.

Raka, 5 Nov, "2 types, one self learn online, one 1-1. And also three audiences ... one for people who wanna be GTM
engineer, one for sales people who want to accelerate their sales using GTM engineering and one for sales managers who
want their team to be using GTM engineering."

So it's a 2 by 3 grid. Six products, but only three curricula: each track has one curriculum and two ways to take it.

| | Self learn online | 1:1 with Raka |
|---|---|---|
| **Track 1, Become a GTM Engineer** (career) | 1S | 1P |
| **Track 2, Sell More with GTM Engineering** (individual sellers) | 2S | 2P |
| **Track 3, Lead a GTM Engineered Team** (sales managers) | 3S | 3P |

Prices are my suggestions and Raka's call. Everything else is a working draft to cut down, not a promise to anyone yet.

---

## 1. The design rules behind all six

1. **Every module ends in a build, not a quiz.** The learner leaves each module with something that runs: a table, a
   flow, a sequence, a dashboard. Watching isn't learning here. A short check question can sit inside, the build is the
   pass mark.
2. **Their own data from week one.** Track 1 learners pick a real target market. Track 2 sellers use their own patch.
   Track 3 managers use their own team's CRM. Nothing is built on a fake company unless they have nothing at all.
3. **One shared spine, three depths.** All three tracks walk the same chain, *ICP, list, signal, research, message,
   send, reply, CRM, measure*. Track 1 builds the whole chain from the inside. Track 2 runs it for one person. Track 3
   designs it for a team and makes people use it.
4. **Tool agnostic in principle, specific in practice.** The concept is taught first, then shown in the stack Raka
   actually uses (Clay, lemlist, n8n, HubSpot, PhantomBuster, Claude, Gong or Leexi). Each lesson names the free or
   trial tier to use, so nobody has to buy six tools to start.
5. **Built from our own engine.** The cases come from what Astra runs: research agents, gated messages, per thread checks,
   the weekly scorecard. All lead names and threads are replaced with made up companies before anything is recorded.
6. **Self learn is the 1:1 recorded and cleaned up.** We run 1:1 first (Raka's friend is learner one for Track 1), keep
   the recordings, the questions people actually asked and the builds they got stuck on, and turn that into the online
   course. So the 1:1 comes first, the online version second.

### What the two formats are

| | Self learn online | 1:1 with Raka |
|---|---|---|
| What you get | Short video lessons (8 to 15 minutes), a build per module, every template, a checklist per module, lifetime access | Live sessions on video, the same templates, Raka reviews your builds between sessions, async questions answered within one working day |
| Pace | Your own, with a suggested weekly plan | Fixed weekly rhythm, homework between sessions |
| Data | Your own, guided by the build briefs | Your own, and Raka works on it with you on screen |
| Feedback | Self checklists, plus one optional paid review call | Every build reviewed, live and written |
| Proof | Certificate of completion when all builds are submitted | Certificate plus a written review of the capstone |
| Who it suits | Self starters, tight budgets, people who want the material first | People who want it done properly and fast, on their own setup, with someone to ask |

**The bridge between them.** Any self learn buyer can add single 1:1 sessions (€150 for 60 minutes) and the price of the
online course is credited if they upgrade to the full 1:1 within 30 days. That keeps the cheap product from capping the
expensive one.

---

## 2. Track 1, Become a GTM Engineer

**For.** People who want GTM engineering as their job. SDRs and BDRs tired of manual prospecting, marketing ops and
RevOps people, data analysts, junior developers who want a commercial role, founders' first hires. Raka's friend.

**Promise.** You can build, run and explain a full outbound and CRM engine, and you have a portfolio of three working
builds to show an employer or a first client.

**Before you start.** Comfortable with spreadsheets. No coding needed, the API module teaches the little you need.
Budget for tools, mostly free tiers and trials, a few euros of enrichment credits.

**Outcomes, concretely.**
- A working ICP and segmentation model with the reasoning written down
- A Clay table with a waterfall enrichment and a scoring model
- A signal driven, multichannel sequence live in lemlist
- An n8n workflow that connects at least three tools through their APIs
- A clean CRM with a field map, deduplication rules and routing
- A pipeline dashboard and a weekly scorecard
- A capstone, the whole engine end to end on a real market, written up as a case study

### The modules

| # | Module | What it covers | The build |
|---|---|---|---|
| 0 | **What a GTM engineer actually does** | The role, how it differs from SDR, RevOps and marketing ops, the job market, what employers test in interviews | Pick your capstone market and write a one page brief |
| 1 | **ICP and the revenue model** | Who pays and why, firmographics against behaviour, the revenue model and unit economics behind an ICP, why "everyone with a website" fails (our own numbers on consumer against B2B) | An ICP sheet with tiers and the disqualifiers |
| 2 | **Data foundations** | Where B2B data comes from, record types, data quality, GDPR basics for outbound in the EU, what you may and may not store | A data source map for your market |
| 3 | **Lists and lookalikes** | Building account and contact lists, AI lookalikes from your best customers, PhantomBuster and LinkedIn data, avoiding scraped garbage | A 200 account list built two ways and compared |
| 4 | **Enrichment and waterfalls** | Enrichment providers, waterfall logic (try A, then B, then C), cost per found email, verification, when to stop | A Clay waterfall with a cost per row figure |
| 5 | **Scoring and signals** | Fit against intent, signal types (hiring, funding, tech change, content, website visits), the eavesdrop loop that feeds what customers say back into the ICP | A scoring model and three live signal sources |
| 6 | **AI research and writing** | Using Claude for account research, prompts that cite their source, checking AI output before it goes anywhere, why a research gate matters (our own falsification pass) | A research agent prompt and ten researched accounts, checked |
| 7 | **The message** | One problem per message, openers that get replies, follow ups, what our 330 messages taught us, A/B testing honestly | A 3 step sequence and its A/B plan |
| 8 | **Multichannel outbound** | lemlist setup, email and LinkedIn steps, sending domains, warm up, SPF, DKIM and DMARC, send caps, deliverability | A live campaign on a warmed domain |
| 9 | **APIs and automation** | What an API is, webhooks, n8n basics, error handling, logging, when automation is the wrong answer | An n8n flow connecting three tools |
| 10 | **CRM architecture** | Objects, fields, stages, the field map, dedup rules, routing, CRM hygiene as a team habit, HubSpot as the example | A CRM with a field map, dedup rule and routing rule |
| 11 | **Allbound and loyalty flows** | Inbound to outbound handover, ads to outbound, onboarding, retention and reactivation flows, customer health | One inbound to outbound flow and one reactivation flow |
| 12 | **Measuring it** | Pipeline analysis, conversion by stage, the weekly scorecard, forecasting basics, reading a reply rate without fooling yourself | A dashboard and a scorecard |
| 13 | **Capstone** | The whole engine on your market, run for two weeks, written up | The case study, numbers included |
| 14 | **Getting hired or getting clients** | The portfolio, the interview task, pricing your first freelance build | Portfolio page and a mock interview task |

### Duration

| | Self learn (1S) | 1:1 (1P) |
|---|---|---|
| Video | About 9 hours across the 15 modules | Live, 12 sessions of 90 minutes |
| Builds | About 25 hours | About 25 hours, reviewed |
| Suggested pace | 8 to 10 weeks at 4 to 5 hours a week | 12 weeks, one session a week |
| Extras | Templates, prompt library, checklists | Written review of every build, capstone review, mock interview, async questions |

The 1:1 covers the same 15 modules in 12 sessions by grouping the lighter ones (0 with 1, 2 with 3, 11 with 12).

### Suggested price

- **1S, self learn.** €349 launch, €499 after the first cohort of reviews.
- **1P, 1:1.** €2,400 for the 12 weeks, or 3 payments of €850.

---

## 3. Track 2, Sell More with GTM Engineering

**For.** Account executives, SDRs, founders who still sell, consultants and freelancers who sell their own work. They
don't want a new job, they want more meetings with less manual work.

**Promise.** In four weeks you run your own small pipeline engine: the right accounts, a reason to reach out now, a
researched message, and a follow up that doesn't depend on you remembering.

**Before you start.** A patch or a market to sell into, a CRM login (or the free HubSpot CRM), LinkedIn. No technical
background.

**Outcomes, concretely.**
- Your own ICP and a tiered list of 100 to 300 accounts
- Three signals that tell you who to contact this week
- An AI research routine that turns an account into a call reason in minutes
- A sequence running in lemlist or your company's tool
- A call prep and follow up routine, and a CRM that stays clean without effort
- A personal scorecard, so you know which activity actually brings meetings

### The modules

| # | Module | What it covers | The build |
|---|---|---|---|
| 0 | **Your pipeline today** | Where your time goes, where your meetings come from, the one number you want to move | A one week time and source audit |
| 1 | **Your ICP and your list** | Picking accounts that buy, tiers, lookalikes of your best customers, building the list without buying junk | A tiered account list |
| 2 | **Signals, who to contact now** | Hiring, funding, leadership change, tech change, content and website signals, setting alerts, the eavesdrop habit (listening to what customers and prospects say) | Three signal alerts running |
| 3 | **Research in minutes with AI** | Claude prompts for account and person research, checking the answer, turning research into a reason to talk | Ten accounts researched with your prompt |
| 4 | **Messages that get replies** | One problem per message, the opener structure we use, follow ups, LinkedIn and email together, what not to automate | Your 3 step sequence |
| 5 | **Running the sequence** | lemlist or your tool, LinkedIn steps, send limits, deliverability basics, handling replies | A live sequence on your list |
| 6 | **Calls and follow up** | AI call prep, call notes in Gong or Leexi, follow ups that write themselves, the next step booked before you hang up | A call prep template and follow up flow |
| 7 | **Your CRM and your scorecard** | Logging without pain, hygiene rules for one person, a personal dashboard, the weekly 20 minute review | Your personal scorecard |

### Duration

| | Self learn (2S) | 1:1 (2P) |
|---|---|---|
| Video | About 4 hours | Live, 5 sessions of 60 minutes |
| Builds | About 8 to 10 hours | About 8 hours, reviewed |
| Suggested pace | 4 weeks at 3 hours a week | 5 weeks, one session a week, plus a 30 minute check in 30 days later |
| Extras | Prompt library, sequence templates, signal list | Raka works on your real list and messages with you, reviews your sequence before it sends |

### Suggested price

- **2S, self learn.** €149 launch, €199 after.
- **2P, 1:1.** €950.
- **Company sponsored.** Many sellers will want their employer to pay. A one page "why my company should pay for this"
  note sits on the sales page, with the expected time saved and the training budget angle.

---

## 4. Track 3, Lead a GTM Engineered Team

**For.** Sales managers, heads of sales, sales directors and founders with a sales team of 3 to 30. They don't build
the flows themselves, they decide what gets built, make the team use it and answer for the forecast.

**Promise.** You leave with a GTM operating model for your team, a sales bible people actually follow, a dashboard you
trust, and a 90 day rollout plan, including whether to hire a GTM engineer or buy one.

**Before you start.** Admin or manager access to your CRM, last quarter's pipeline data, a team.

**Outcomes, concretely.**
- A written sales process, the sales bible, with stages, exit criteria and definitions
- An ICP and territory model the team agrees on
- A signal and routing design (who gets which lead, how fast)
- CRM hygiene rules with an owner and a weekly check
- A management dashboard: pipeline, conversion by stage, forecast, activity that matters
- A win and loss review built from call recordings
- A coaching routine using call intelligence
- A 90 day rollout plan and a build, buy or hire decision with its cost

### The modules

| # | Module | What it covers | The build |
|---|---|---|---|
| 0 | **What GTM engineering changes for a manager** | From headcount to systems, what a GTM engineer does, what it costs, what changes in your week | Your team's current state on one page |
| 1 | **The operating model** | Revenue model, roles, handoffs between marketing, SDR, AE and customer success, the loyalty side after the sale | An operating model diagram |
| 2 | **The sales bible** | Stages, exit criteria, definitions everyone uses the same way, playbooks per segment, keeping it alive | Your sales bible, version one |
| 3 | **ICP, territories and signals** | Agreeing the ICP with the team, territories, which signals trigger action, routing and speed to lead | ICP, territory and routing design |
| 4 | **CRM hygiene as management** | Why reps don't update the CRM, the minimum data you need, dedup and ownership rules, automating the boring part, weekly checks | Hygiene rules with owners |
| 5 | **Dashboards and forecasting** | The five numbers a manager needs, pipeline analysis, conversion by stage, forecast categories, an all in one dashboard from team health to operational KPIs | Your management dashboard spec, or the dashboard itself |
| 6 | **Win, loss and coaching** | Turning Gong or Leexi recordings into win and loss reasons, coaching from calls, feeding it back into the ICP and the messages | A win and loss review of last quarter |
| 7 | **Rolling it out** | Adoption, change management, sprints, what to automate first, measuring payback, build against buy against hire | Your 90 day rollout plan |

### Duration

| | Self learn (3S) | 1:1 (3P) |
|---|---|---|
| Video | About 4 hours | Live, 6 sessions of 90 minutes |
| Builds | About 8 to 12 hours | About 10 hours, reviewed |
| Suggested pace | 4 weeks at 3 to 4 hours a week | 6 to 8 weeks, every week or every other week |
| Extras | Sales bible template, dashboard spec, rollout plan template, hire or buy calculator | Raka works inside your CRM data with you, one 90 minute team workshop to launch the sales bible, a 30 day check in |

### Suggested price

- **3S, self learn.** €249 launch, €349 after.
- **3P, 1:1.** €2,500, team workshop included.
- **Plus the team.** A manager in 3P can add seats of Track 2 self learn for their sellers at €99 each, so the team
  learns the same chain the manager designed. This is also where the Revenue Health Check and Engine Build get sold.

---

## 5. What's shared, so it's built once

| Asset | Used in |
|---|---|
| ICP worksheet and tiering model | All three |
| Signal library, around 30 signals with where to find each | All three |
| Prompt library for research, messages and call prep, each with a checking step | All three |
| Opener structure and sequence templates | Tracks 1 and 2 |
| Clay table templates, waterfall and scoring | Track 1, shown in 2 |
| n8n starter workflows | Track 1 |
| CRM field map and hygiene rules | All three |
| Sales bible template | Track 3, shown in 1 |
| Dashboard and scorecard templates | All three |
| Case material from our own engine, anonymised | All three |

Lessons that appear in more than one track are recorded once at Track 1 depth and cut down for Tracks 2 and 3.

---

## 6. Order to build it in

| When | What | Why |
|---|---|---|
| Weeks 1 to 12 | **1P with Raka's friend**, at a friend price or free, recorded | Tests Track 1 and produces the raw footage and real questions |
| Weeks 2 to 4 | Build the shared assets (section 5) | Every track needs them |
| Weeks 3 to 8 | **2P with 2 or 3 sellers**, paid, recorded | Track 2 is short, so it gets feedback fastest and is the easiest sale |
| Weeks 6 to 12 | **3P with 1 or 2 managers**, ideally from warm Astra conversations | Highest ticket, and it leads into Revenue Engine work |
| From week 10 | Edit recordings into **2S**, then **1S**, then **3S** | Self learn comes from material that's already been taught |
| Launch | Sales page per track, LinkedIn posts from Raka, the deck updated with the six products | |

**Where it's hosted.** A simple course platform (Podia, Teachable, Thinkific or Kajabi type) for video, templates and
payment. Pick on fee, EU VAT handling and certificate support. To check before choosing: none of them has been tried by
us yet.

---

## 7. Things Raka has to decide or check

1. **The prices above**, including whether courses may sit under the €500 build floor (I'd say yes, they're a
   different product).
2. **efficy.** A paid course on CRM and GTM while employed by a CRM vendor. Check the contract for side work and IP,
   and avoid teaching anything that's efficy's own material.
3. **Brand.** Raka's name or Astra on the academy. People buy courses from a person, so my lean is his name, "by Astra".
4. **Tool partners.** Clay, lemlist and n8n run partner or affiliate programmes. Worth checking before recording, since
   free credits for learners lower the barrier.
5. **Certificate.** Completion only, or a reviewed capstone with a pass mark. The second means more for Track 1 job
   seekers and costs Raka review time.
6. **Time.** 1P is 18 hours of live time per learner plus reviews. Cap 1:1 places at what fits next to efficy.

---

## 8. One line per product, for the deck and the sales page

| Product | One line | Format | Length | Price |
|---|---|---|---|---|
| 1S | Learn to build a full GTM engine, at your own pace | Online, 15 modules, 9 hours of video | 8 to 10 weeks | €349 to €499 |
| 1P | Become a GTM engineer with Raka beside you | 12 live sessions, every build reviewed | 12 weeks | €2,400 |
| 2S | Run your own pipeline engine and get more meetings | Online, 8 modules, 4 hours of video | 4 weeks | €149 to €199 |
| 2P | Your patch, your messages, your engine, built with Raka | 5 live sessions | 5 weeks | €950 |
| 3S | Design and roll out a GTM engineered team | Online, 8 modules, 4 hours of video | 4 weeks | €249 to €349 |
| 3P | Your team's operating model, sales bible and dashboard, built with Raka | 6 live sessions and a team workshop | 6 to 8 weeks | €2,500 |
