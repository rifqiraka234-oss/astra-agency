# Track 1. Become a GTM Engineer

**By Raka Mulya, Astra Agency.** Self learn (1S) and 1:1 with Raka (1P). One curriculum, two ways to take it.

This file follows the rulebook in `docs/academy/README.md`. Lessons follow section 3, assignments and rubrics follow
section 4, quizzes and tests follow section 5, 1:1 sessions follow the template in section 7.4. Every word in bold the
first time it appears is also in the glossary (README section 9), and every lesson still explains it in one plain
sentence.

---

## Who this track is for

This track is for people who want building sales systems to be their job. You don't need to be technical. You need to
be curious, comfortable in a spreadsheet and willing to do the work every week.

| You are | Why this track fits you |
|---|---|
| An SDR or BDR (the person who books first meetings for a sales team) | You're tired of copying names into sheets by hand and want to build the machine that does it |
| In marketing ops | You already run tools and lists, and want to own the whole chain from list to meeting |
| In RevOps (revenue operations, the people who run sales tools, processes and data) | You know the CRM, and want to add list building, enrichment, AI research and outbound |
| A data analyst | You can handle data, and want a role closer to revenue and money |
| A junior developer | You want a commercial role where your technical side is an advantage |
| A founder's first hire | You've been told "go get us customers" and need a system, not a pile of tabs |
| A career switcher | You're coming from another field and want a clear path into a job that's in demand |

**Not for you if.** You sell for a living and only want more meetings for yourself. Take Track 2. You manage a sales
team and want them working this way. Take Track 3. The intake form (README section 7.3) will tell you if you've picked
the wrong one.

## The promise

When you finish, you can build, run and explain a full outbound and CRM engine on your own. You'll have a portfolio of
working builds and one capstone case study, done on a real market with real numbers, to show an employer or a first
client.

**GTM** means go to market, everything a company does to find customers and sell to them. **GTM engineering** means
building the systems behind that (lists, data, automations, dashboards) so selling runs on a machine instead of on
someone's memory. A **GTM engineer** is the person who builds those systems. That's who you're becoming.

## Before you start

| You need | How much |
|---|---|
| Spreadsheet comfort | You can sort, filter, write a simple formula like `=IF()` and `=VLOOKUP()` or `=XLOOKUP()`. If you rate yourself 1 or 2 out of 5 on the intake form, do the free spreadsheet warm up in Module 0 first |
| Coding | None. Module 9 teaches the little you need about APIs |
| Time | 4 to 5 hours a week for the self learn version, or 90 minutes a week live plus about 2 hours of homework for the 1:1 |
| A laptop | Any laptop with a modern browser. A phone isn't enough for the builds |
| A Google account | Free. Used for Sheets, Drive and later Looker Studio |
| A LinkedIn account | Your own, in good standing. You'll use it carefully, Module 3 shows how |
| A budget for tools | Mostly free plans and trials. A small amount for enrichment credits around Module 4 and a domain registration in Module 8. Module 0 lists every tool and when you'll need it, so nothing surprises you |
| A market to practise on | Your own (a company you work for, or a market you know) or the Routeful practice pack we give you |

### The practice pack, in one paragraph

If you don't have your own data, you use **Routeful**. Routeful is a made up Dutch company in Utrecht with 35 staff. It
sells route planning software to transport and logistics firms in the Netherlands, Belgium and Germany. Its best
customers are transport and logistics companies with 20 to 500 staff and their own fleet of 15 or more trucks, whose
planners still plan in Excel or in an old transport management system. The people it talks to are the operations
director, the head of planning, and the owner or managing director. The pack has 50 fake accounts, a messy CRM export of
400 contacts, 10 call transcripts (6 won, 4 lost), last quarter's pipeline of 60 deals and a sales team of 6 (2 SDRs, 3
AEs, 1 manager). Every company and person in it is invented. Account IDs look like `RF-014`.

## What you'll be able to do at the end (Modules 0 to 14)

1. Explain what a GTM engineer does, how it differs from an SDR, RevOps and marketing ops, and what interviews test
   (Module 0)
2. Write an ICP with tiers and disqualifiers, and defend it with the revenue model behind it (Module 1)
3. Map where B2B data comes from, judge its quality, and handle personal data within GDPR basics (Module 2)
4. Build a 200 account list two ways, with filters and with AI lookalikes, and explain which is better and why (Module 3)
5. Build an enrichment waterfall in Clay and state the cost per row and per found email (Module 4)
6. Build a fit and intent scoring model fed by at least three live signal sources (Module 5)
7. Write a research agent prompt that cites its sources, and check its output with a falsification pass (Module 6)
8. Write a three step sequence around one problem, with an honest A/B test plan (Module 7)
9. Launch a live multichannel campaign in lemlist on a warmed sending domain with SPF, DKIM and DMARC set (Module 8)
10. Build an n8n workflow that connects at least three tools through their APIs, with error handling and a log (Module 9)
11. Set up a CRM with a field map, a deduplication rule and a routing rule (Module 10)
12. Design an inbound to outbound handover flow and a reactivation flow (Module 11)
13. Build a pipeline dashboard and a weekly scorecard, and read a reply rate without fooling yourself (Module 12)
14. Run the whole engine on a real market for two weeks and write it up as a case study with numbers (Module 13)
15. Present your portfolio, pass a take home interview task, and price a first freelance build (Module 14)

## All modules at a glance

The week is the week of the 10 week self learn plan. The session is the 1:1 session where it's taught.

| # | Module | In one line | You build | Self learn week | 1:1 session |
|---|---|---|---|---|---|
| 0 | What a GTM engineer actually does | The job, the market, the interview, and your accounts set up | One page brief on your capstone market | 1 | S1 |
| 1 | ICP and the revenue model | Who pays, why, and who to leave alone | ICP sheet with tiers and disqualifiers | 1 | S1 |
| 2 | Data foundations | Where B2B data comes from, how good it is, and GDPR basics | Data source map | 2 | S2 |
| 3 | Lists and lookalikes | Building account and contact lists without buying junk | 200 account list built two ways and compared | 2 to 3 | S2 |
| 4 | Enrichment and waterfalls | Filling gaps cheaply by trying sources in order | Clay waterfall with a cost per row figure | 3 to 4 | S3 |
| 5 | Scoring and signals | Who fits, who's ready now, and how to know | Scoring model and three live signal sources | 4 | S4 |
| 6 | AI research and writing | Research with Claude that cites its sources and gets checked | Research agent prompt and ten checked accounts | 5 | S5 |
| 7 | The message | One problem, start to finish, in a short sequence | Three step sequence and an A/B plan | 6 | S6 |
| Test | Practical test | 60 minutes, hands on, the first half of the track | Tiered, enriched, scored and researched accounts plus one opener | 6 | Briefed in S6, taken before S7 |
| 8 | Multichannel outbound | lemlist, sending domains, warm up and deliverability | A live campaign on a warmed domain | 7 | S7 |
| 9 | APIs and automation | How tools talk to each other, and n8n | An n8n flow connecting three tools | 8 | S8 |
| 10 | CRM architecture | Objects, fields, stages, dedup and routing in HubSpot | CRM with field map, dedup rule and routing rule | 8 | S9 |
| 11 | Allbound and loyalty flows | Joining inbound and outbound, and keeping customers | One inbound to outbound flow and one reactivation flow | 9 | S10 |
| 12 | Measuring it | Pipeline, conversion, scorecard, forecast | A dashboard and a scorecard | 9 | S10 |
| 13 | Capstone | The whole engine on your market for two weeks | The case study, numbers included | 8 to 10 (runs in the background) | S11 |
| 14 | Getting hired or getting clients | Portfolio, interview task, pricing your first build | Portfolio page and a mock interview task | 10 | S12 |
| Exam | Final exam | 25 to 30 questions, 40 minutes | | 10 | Reviewed in S12 |

## Duration and price

| | Self learn (1S) | 1:1 with Raka (1P) |
|---|---|---|
| Video | About 9 hours across the 15 modules, every video 5 to 12 minutes | 12 live sessions of 90 minutes, recorded for you |
| Builds | About 25 hours | About 25 hours, every build marked by Raka |
| Pace | 8 to 10 weeks at 4 to 5 hours a week (the plan below is 10 weeks) | 12 weeks, one session a week |
| Marking | You mark yourself against the rubric and good example. Optional paid review of a single assignment (€49) | Raka marks every assignment within 2 working days and goes through it in the next session |
| Questions | Questions form, answered within 3 working days. Optional single 1:1 hours (€150) | Async channel or email, answered within 1 working day |
| Certificate | Completed. Certified if you buy the capstone review (€149) and pass | Certified, when the capstone passes |
| Also included | Templates, prompt library, checklists, lifetime access and updates | Everything in 1S, plus capstone review, mock interview and a 30 minute check in 30 days after |
| Suggested price | €349 at launch, €499 after the first cohort of reviews | €2,400 for the 12 weeks, or 3 payments of €850 |

Prices are suggestions for Raka to set. Tool costs are separate and mostly free plans or trials.

## Self learn plan, week by week (10 weeks)

Hours include video, the "do it now" tasks, quizzes and assignments. If a week runs over, carry the rest into the next
week rather than skipping the assignment. The assignment is what you're learning from.

| Week | Modules | What you finish that week | Hours |
|---|---|---|---|
| 1 | Module 0 and Module 1 | Accounts set up, templates copied, capstone brief, ICP sheet | 4 |
| 2 | Module 2, Module 3 lessons 3.1 to 3.3 | Data source map, first list started | 4 |
| 3 | Module 3 lessons 3.4 and 3.5 and assignment, Module 4 lessons 4.1 to 4.2 | 200 account list built two ways and compared | 4.5 |
| 4 | Module 4 lessons 4.3 to 4.5 and assignment, Module 5 | Clay waterfall with cost per row, scoring model with three signals | 5 |
| 5 | Module 6 | Research agent prompt, ten checked accounts | 4 |
| 6 | Module 7, then the practical test | Three step sequence and A/B plan, practical test passed | 4.5 |
| 7 | Module 8 | Sending domain bought on day one of the week so warm up starts, campaign built and launched when warm up allows | 4 |
| 8 | Module 9, Module 10, capstone run starts | n8n flow, CRM with field map, dedup and routing. Your capstone campaign starts sending | 5 |
| 9 | Module 11, Module 12, capstone keeps running | Two flows, dashboard and scorecard | 4 |
| 10 | Module 13 write up, Module 14, final exam | Case study, portfolio page, mock interview task, exam passed | 5 |

Total about 44 hours including video, tasks and quizzes. If your week only has 3 hours, stretch the plan to 14 weeks.
The capstone needs two weeks of sending, so if your domain warm up runs late, your Module 13 write up moves with it.

## 1:1 plan, session by session (12 sessions of 90 minutes)

Every session runs on the template in README section 7.4 (wins and blockers, homework reviewed on screen, the new module
taught live on your data, homework set, questions). Homework is handed in at least 48 hours before the next session.
Raka sends written notes within 24 hours of every session, with links to the self learn lessons that cover the same
ground.

| Session | Modules | What Raka prepares | What happens in the session | Homework |
|---|---|---|---|---|
| S1 | M0 and M1, plus kick off | Reads your intake form. Opens your data or loads the Routeful pack for you. Prepares two example ICP sheets (one good, one bad) | Your goals in your own words. The GTM engineer role and what interviews test. Accounts set up together, screen shared. Your capstone market chosen. ICP drafted live on your best customers | Assignment 0 (capstone brief) and Assignment 1 (ICP sheet with tiers and disqualifiers) |
| S2 | M2 and M3 | Marks both assignments. Prepares a data source map started for your market and a LinkedIn search that matches your ICP | Data sources for your market and their quality. GDPR basics. Building an account list in Clay and in LinkedIn search, side by side. Your first lookalike prompt run | Assignment 2 (data source map) and Assignment 3 (200 accounts built two ways) |
| S3 | M4 | Marks the list. Builds an empty waterfall template in a shared Clay table with your list in it | Enrichment providers explained. Waterfall built live on 20 of your rows. Verification added. Cost per row worked out together | Assignment 4 (full waterfall and cost per row figure) |
| S4 | M5 | Marks the waterfall. Finds three signal sources that exist for your market | Fit and intent explained on your list. Points model built in your sheet or Clay table. Three signal sources set up live. The eavesdrop loop on one of your call notes or the Routeful transcripts | Assignment 5 (scoring model and three live signal sources) |
| S5 | M6 | Marks the scoring model. Picks three of your top scored accounts to research live | A research prompt that cites sources written together. Run on three accounts. Falsification pass done live, finding at least one wrong claim | Assignment 6 (research agent prompt and ten checked accounts) |
| S6 | M7, plus practical test briefing | Marks the ten researched accounts. Brings two anonymised Astra openers, one that got a yes and one that didn't | The six part message structure. Your first opener rewritten live until it's one problem start to finish. Follow ups and A/B plan. Practical test rules, timing and rubric explained | Assignment 7 (three step sequence and A/B plan). Practical test taken alone, timed, at least 48 hours before S7 |
| S7 | M8 | Marks the sequence and the practical test. Checks your domain choice | Practical test results gone through. Sending domain bought and DNS records set live, screen shared. lemlist campaign built. Warm up started | Assignment 8 (campaign built and launched when warm up allows) |
| S8 | M9 | Builds a starter n8n workflow in a shared template | What an API is, on your own tools. n8n flow built live with error handling and a log | Assignment 9 (n8n flow connecting three tools) |
| S9 | M10 | Exports your current CRM fields or loads the Routeful CRM export | Field map built live. Dedup rule and routing rule set in HubSpot | Assignment 10 (CRM with field map, dedup and routing). Capstone campaign starts sending |
| S10 | M11 and M12 | Marks the CRM. Prepares a Looker Studio template connected to your data | Inbound to outbound flow and reactivation flow designed. Dashboard and weekly scorecard built from your campaign numbers so far | Assignments 11 and 12 |
| S11 | M13, capstone working session | Reads your capstone numbers and draft | A full working session on your capstone. Numbers checked, claims tested, the write up structured | Capstone case study finished and submitted. Final exam taken alone, timed |
| S12 | M14, capstone presentation, exam review | Marks the capstone against its rubric. Marks the exam | Portfolio page reviewed. Mock interview task done live. You present your capstone, marked live. Exam reviewed question by question for anything missed | Portfolio published. 30 day check in booked |

---

### Module 0. What a GTM engineer actually does

**Goal.** Understand the job you're training for, set up every account and folder you'll need, and choose the market your
capstone will run on.
**Time.** 45 minutes of video, about 1 hour for the assignment.
**You need.** A laptop, a Google account, a LinkedIn account, an email address you can use for tool sign ups, and 20
minutes to fill in the intake form.

#### Lesson 0.1 The job in one picture (8 min)

**In plain words.** A company makes money when the right people hear the right thing at the right time and say yes. A GTM
engineer builds the machine that finds those people, works out what to say and when, sends it, and keeps the records
straight. You're the person who makes selling repeatable.

**You'll be able to.**
- Describe the GTM engineer's job in two sentences
- Name the nine links in the chain this course builds
- Point to which link a company is weakest at

**What's shown.**
1. Raka introduces himself in one line each for his roles. Seven years in revenue, GTM and data. Global GTM and Campaign
   Manager at Betty Blocks, where he built segmentation, enrichment, scoring, routing and follow up loops. Data and
   insights lead across 23 markets at HEINEKEN. Founded a stroopwafel brand from zero. He runs this exact engine at Astra
   today.
2. The definition on screen. **GTM (go to market)** is everything a company does to find customers and sell to them. **GTM
   engineering** is building the systems behind it. A **GTM engineer** builds and runs those systems.
3. The chain on screen, one box at a time. ICP, list, signal, research, message, send, reply, CRM, measure. Raka says one
   sentence per box. **ICP** (ideal customer profile) is the description of companies most likely to buy and stay. A
   **list** is the companies and people that match. A **signal** is something that happens that makes a company more
   likely to buy now. **Research** is finding the specific reason to talk to this one company. The **message** is what
   you say. **Send** is the tool that delivers it. **Reply** is how you handle the answer. The **CRM** (customer
   relationship management system) is where every company, person and deal is recorded. **Measure** is the weekly numbers.
4. The same chain drawn the "manual" way. An SDR with 14 browser tabs, a sheet, copy and paste, and a reminder in their
   head. Raka points out where it breaks (people forget follow ups, lists go stale, nobody knows which message worked).
5. The same chain drawn the "engineered" way. The list rebuilds itself, signals arrive by themselves, research is drafted
   by AI and checked by a human, sends are scheduled, replies land in the CRM, the numbers update each Monday.
6. Raka's rule. Machines do the repetitive parts, people do the judgement. A GTM engineer who automates the judgement
   (what's true, who to contact, whether to send) builds a machine that's fast and wrong.
7. Screen demo. Raka opens the Routeful practice pack folder and shows each file in it (accounts sheet, CRM export, call
   transcripts, pipeline, team) so learners know what the pack is.
8. Close. "By the end of this course you'll have built every box in this chain yourself."

**Do it now.** (10 min) Open a blank Google Doc. Draw or type the nine boxes of the chain. Under each box, write one
sentence about how the company you work for (or Routeful, from the pack's team sheet) does that step today. Circle the
box that looks weakest. Keep the doc, you'll use it in Lesson 0.3.

#### Lesson 0.2 How the role differs from SDR, RevOps and marketing ops (7 min)

**In plain words.** Four jobs sit close together and people mix them up. The SDR talks to prospects, RevOps runs the
tools and processes, marketing ops runs marketing systems, and the GTM engineer builds the engine that feeds all of
them. Knowing the difference helps you explain yourself in an interview.

**You'll be able to.**
- Tell the four roles apart by what each one produces
- Say which parts of your current job already count as GTM engineering
- Explain the role to someone who's never heard of it

**What's shown.**
1. A four column table on screen. Role, what they produce, what they're measured on, main tools.
2. **SDR or BDR** (sales or business development representative) is the person who contacts prospects and books first
   meetings. Produces meetings. Measured on meetings booked.
3. **RevOps** (revenue operations) is the team that runs sales, marketing and customer success processes, tools and data.
   Produces a CRM that works and reports people trust. Measured on data quality, forecast accuracy, tool adoption.
4. **Marketing ops** is the person who runs the marketing tools (email platform, forms, ads tracking). Produces campaigns
   that run and leads that get passed on. Measured on lead flow and campaign performance.
5. **GTM engineer** builds the systems that create pipeline (lists, enrichment, scoring, research, sequences,
   automations). Produces a machine that books meetings. Measured on pipeline created and cost per meeting.
6. Where they overlap. Raka circles the overlaps (a GTM engineer touches the CRM like RevOps and sends like an SDR) and
   explains that small companies often give all four to one person.
7. Raka's example from Betty Blocks, in general terms. He worked across SDR, AE, marketing and RevOps, and the job was
   making the handoffs between them run on rules rather than on memory.
8. Close. "In an interview you'll be asked what you build. Answer with the machine and the number it moved."

**Do it now.** (5 min) Write three sentences. Your current job title. Two things you already do that are GTM
engineering (for example "I build lead lists in Sheets", "I clean the CRM export every month"). One thing in the chain
you've never done.

#### Lesson 0.3 The job market and what interviews test (8 min)

**In plain words.** Companies hire GTM engineers because a few people with good systems can do what used to take a big
team. Interviews usually test whether you can actually build, so most include a hands on task. This course is set up so
your assignments become your answers.

**You'll be able to.**
- Find and read GTM engineer job posts and pull out what they ask for
- Name the four things interviews usually test
- Match each course module to an interview skill

**What's shown.**
1. Raka explains the role is newer than SDR or RevOps, and job titles vary (GTM engineer, growth engineer, outbound
   engineer, RevOps engineer). He doesn't quote numbers on salaries or openings, because they change fast. "Check current
   figures yourself, I'll show you how."
2. Screen demo. Open LinkedIn, click the **Jobs** icon in the top bar, type "GTM engineer" in the search box, choose your
   country in the location box, press Enter.
3. Click into three posts. For each one, Raka highlights the tool names, the tasks ("build enrichment workflows", "own the
   outbound stack"), and the outcomes ("increase pipeline").
4. He copies the requirements into a sheet with three columns. Requirement, appears how often, module that teaches it.
5. The four things interviews usually test, drawn from those posts. Can you build a list and enrich it. Can you write a
   message that gets replies. Can you connect tools. Can you show numbers and explain them.
6. The take home task. Many companies send a small task ("here's our ICP, build 50 accounts and draft an opener"). Raka
   shows that the practical test in this course has the same shape.
7. What makes a candidate stand out. A portfolio of real builds with numbers, honest about what didn't work.
8. Close. Every assignment in this course is a portfolio piece, so save each one in your Drive folder from day one.

**Do it now.** (15 min) Do steps 2 to 4 yourself. Find five GTM engineer (or similar) job posts in your country. Fill in
the three column sheet. Note which three requirements appear most often. Save it as "Job post requirements" in your
course folder once you've made it in Lesson 0.4.

#### Lesson 0.4 Your folder, your templates and your intake form (9 min)

**In plain words.** Everything you build in this course lives in one Google Drive folder you own. You copy our templates
into it, so you always work on your own copy. Then you fill in the intake form so we know your starting point.

**You'll be able to.**
- Create a course folder with the right sub folders
- Copy every course template into your own Drive
- Complete the intake form and get your data set (your own or Routeful)

**What's shown.**
1. Screen demo. Go to drive.google.com and sign in with your Google account.
2. Click **+ New** in the top left, click **New folder**, type "GTM Academy Track 1", click **Create**.
3. Double click the new folder to open it. Click **+ New**, **New folder** again and make these sub folders, one by one.
   "00 Setup", "01 ICP", "02 Data", "03 Lists", "04 Enrichment", "05 Scoring", "06 Research", "07 Messages", "08 Outbound",
   "09 Automation", "10 CRM", "11 Flows", "12 Dashboard", "Practical test", "Capstone", "Portfolio".
4. Open the course templates link from the course platform (lesson resources). It opens a shared Drive folder called
   "Track 1 templates". You can view it but not edit it, which is on purpose.
5. Right click the first template, "T1 Capstone brief", click **Make a copy**. The copy appears in your own "My Drive".
   Right click the copy, click **Organise** (or **Move**, the label can differ), choose your "Capstone" folder, click
   **Move**. Rename it by removing "Copy of".
6. Repeat for each template into its matching folder. Raka shows the full list on screen and leaves it in the lesson
   resources.
7. If you're using the practice pack, copy the "Routeful practice pack" folder into "00 Setup" the same way (right click,
   Make a copy, file by file).
8. Open the intake form link. Raka goes through the 8 questions and why each matters (README section 7.3). Question 6 is
   where you say whether you have real data. Question 4 is your spreadsheet comfort.
9. If you rated yourself 1 or 2 on spreadsheets, open the "Spreadsheet warm up" sheet in the templates. It has six short
   exercises (sort, filter, `=IF`, `=COUNTIF`, `=XLOOKUP`, a pivot table) with the answers on a second tab. Do it before
   Module 1.

**Do it now.** (15 min) Make the folder and sub folders. Copy at least the capstone brief and the ICP sheet templates.
Fill in and submit the intake form.

#### Lesson 0.5 Your tool accounts, and what you'll need later (12 min)

**In plain words.** You need four accounts to start. HubSpot as your practice CRM, Claude as your AI assistant, Clay for
lists and enrichment, and your LinkedIn. Other tools wait until the module that needs them, so you never pay early.

**You'll be able to.**
- Create a free HubSpot CRM account
- Create a Claude account
- Create a Clay account on the free plan or trial
- Know which tools come later, and when

**What's shown.**
1. The tool table on screen (README section 8). Raka says one line per tool, which module needs it, and which free plan
   or trial is enough. He says it plainly. "Prices change, so I'll never quote one. Check the tool's own pricing page on
   the day you sign up."
2. **HubSpot.** Go to hubspot.com. Click the button for the free CRM (it's usually called **Get started free** or **Get
   free CRM**). Sign up with your Google account. When it asks about your company, type your company name, or "Routeful
   practice" if you're using the pack. Skip any paid trial offer (look for **Skip** or **No thanks**). You land on the
   HubSpot home screen. Click **CRM** in the left menu (or top menu), then **Contacts**, to see the empty contacts list.
   That's all for now, Module 10 sets it up properly.
3. **Claude.** Go to claude.ai. Click **Sign up** and use your Google account or email. Verify your email. Type "Hello,
   what can you help me with?" in the message box and press Enter, so you know it works. The free plan is enough for the
   lessons. Raka says a paid plan helps from Module 6 because of longer research tasks, and it's optional.
4. **Clay.** Go to clay.com. Click **Sign up** or **Get started**, sign up with Google. When it asks what you'll use it
   for, choose the option closest to "prospecting" or "outbound". It opens a workspace. Note where the credit balance is
   shown (usually top right or in settings), because credits are how Clay charges for data. Don't spend any yet.
5. **LinkedIn.** Check your own profile has a real photo, your real name and a headline. A half empty profile gets
   flagged faster when you start searching a lot. No new account, never create a fake one.
6. **Later, with a note.** lemlist (the tool that sends sequences) is Module 8. Start its trial then, not now, because
   trials run out. A sending domain (a separate web address you send cold email from) is also Module 8. n8n
   (automation) is Module 9. PhantomBuster (collects LinkedIn and web data) is optional in Module 3, trial only. Gong or
   Leexi (call recording) are shown on example calls, you don't need an account.
7. Raka shows one safety habit. Use one password manager, turn on two step login for Google, HubSpot and Clay, and never
   paste passwords into an AI tool.
8. Close. Save a "Tools" sheet in "00 Setup" with tool, account email, plan, date the trial ends.

**Do it now.** (15 min) Create the HubSpot, Claude and Clay accounts. Fill in the "Tools" sheet with the trial end dates
you can see. Don't start lemlist yet.

**Your setup sheet.** Copy the "T1 Setup sheet" template into "00 Setup" now. It's one Google Sheet you keep for the
whole course. One row per tool with the account email, the plan (free or trial), the trial end date and a reminder date
3 days before it. Later modules add your sending domain, mailbox names, API keys (where each one lives, never the key
itself) and who owns each login. When a lesson says "write it in your setup sheet", this is the sheet.

**If a tool's free plan or trial runs out.** You can finish every module without paying, as long as you start trials in the
module that needs them, not now. If a trial ends anyway, use these instead and follow the same lesson.

| Instead of | Use | What you lose |
|---|---|---|
| Clay | Google Sheets with manual lookups, plus one enrichment tool's free plan | Speed, and the waterfall runs by hand |
| lemlist | Your own mailbox with a mail merge add on, plus LinkedIn by hand | Automatic follow ups and stop on reply |
| n8n cloud | n8n self hosted on your own computer (free), or Zapier or Make free plans | A few minutes of setup |
| PhantomBuster | Manual LinkedIn search and copying into Sheets | Time, which is fine for 50 accounts |
| Gong or Leexi | The practice pack call transcripts | Recording your own calls |

#### Quiz 0 (pass 80%)

**Q1.** What does a GTM engineer mainly produce?
A. Marketing videos B. A machine that finds, contacts and tracks the right buyers C. Monthly financial reports
D. Product features
**Answer.** B. **Why.** The job is building the systems behind finding customers and selling to them. **Rewatch.** 0.1

**Q2.** True or false. A GTM engineer should automate the decision about whether a message is true before it's sent.
**Answer.** False. **Why.** Machines do the repetitive work, people do the judgement on what's true and who to send to.
**Rewatch.** 0.1

**Q3.** Which role is usually measured on meetings booked?
A. RevOps B. Marketing ops C. SDR D. Finance
**Answer.** C. **Why.** SDRs contact prospects and book first meetings. **Rewatch.** 0.2

**Q4.** Put the first four links of the chain in order.
A. List, ICP, research, signal B. ICP, list, signal, research C. Message, send, ICP, list D. Research, message, list, ICP
**Answer.** B. **Why.** You decide who you want, find them, spot who's ready now, then research the reason to talk.
**Rewatch.** 0.1

**Q5.** Scenario. Sam finds a blog post saying "GTM engineers earn X on average". What should Sam do before using that
number?
A. Use it, it's on a blog B. Check current figures from several real job posts and sources C. Double it to be safe
D. Ignore salaries completely
**Answer.** B. **Why.** Market numbers change fast, so check current figures yourself. **Rewatch.** 0.3

**Q6.** What do most GTM engineer interviews include that a normal interview often doesn't?
A. A personality quiz B. A hands on task, like building a small list and an opener C. A typing speed test D. Nothing
special
**Answer.** B. **Why.** Employers want to see you can build, so many send a take home task. **Rewatch.** 0.3

**Q7.** True or false. You should start your lemlist trial in Module 0 so you have it ready.
**Answer.** False. **Why.** Trials run out. Start lemlist in Module 8, where you need it. **Rewatch.** 0.5

**Q8.** Why do you copy the templates into your own Drive instead of editing the shared folder?
A. The shared folder is view only on purpose, and your work needs to live in your own folder B. It's faster
C. Google requires it D. So Raka can't see it
**Answer.** A. **Why.** You own your copies and keep them as portfolio pieces. **Rewatch.** 0.4

**Q9.** Scenario. Priya's LinkedIn profile has no photo and an old job title. She's about to start searching LinkedIn a
lot. What should she do first?
A. Create a second account B. Update her real profile with a photo, name and current headline C. Hide her profile
D. Nothing, it doesn't matter
**Answer.** B. **Why.** Half empty profiles get restricted faster, and fake accounts break LinkedIn's terms. **Rewatch.** 0.5

#### Assignment 0. Your capstone market, on one page

**Goal.** Choose the real market your capstone will run on and describe it on one page, so every later module builds on
the same market.
**Time.** About 1 hour.
**You need.** The "T1 Capstone brief" template in your "Capstone" folder. Your job post sheet from Lesson 0.3. If you
have no market of your own, the Routeful practice pack.

**Steps.**
1. Open "T1 Capstone brief" in your "Capstone" folder. It has seven headings. Fill each one in under its heading.
2. **The seller.** Write the company whose engine you'll build. Your employer, a friend's business, a freelance client,
   or Routeful. One sentence on what it sells.
3. **The buyer.** Write who buys it, as a type of company. Industry, rough size, countries. Example, "Transport and
   logistics firms in the Netherlands, Belgium and Germany with 20 to 500 staff".
4. **Why they buy.** Write the problem the product solves, in the buyer's words. If you have call notes or the Routeful
   transcripts, open one won call and copy one sentence the buyer said about the problem.
5. **Who you'll talk to.** The job titles of the people who decide (for Routeful, operations director, head of planning,
   owner or managing director).
6. **Countries and rules.** List each country you'll contact. Next to each, write "check email rules in Module 2". If
   Germany is on the list, write "email risky without consent, plan LinkedIn or calls first". This isn't legal advice,
   you'll check properly in Module 2.
7. **What success looks like after two weeks of sending.** Pick numbers you'll measure, not numbers you promise. Messages
   sent, replies, positive replies, meetings booked.
8. **Why this market is a good capstone.** Two or three sentences. Is there enough of it (at least 200 companies)? Can you
   find them online? Can you reach the people?
9. Read it once out loud. If any sentence would fit any company in the world, rewrite it with a specific detail.
10. Click **Share** in the top right, set **General access** to **Anyone with the link**, role **Viewer**, click **Copy
    link**.

**Hand in.** The view link to your filled "T1 Capstone brief" (one page, seven headings filled).

**Marking rubric.**

| Criterion | 0 | 1 | 2 | Must? |
|---|---|---|---|---|
| Seller and offer are clear | Missing or vague ("we sell software") | Named, but the offer is unclear | Named company and one clear sentence on what it sells | Must |
| Buyer described as a type of company | Missing, or "everyone" | Industry or size given, not both | Industry, size range and countries | Must |
| Why they buy, in buyer's words | Missing | Written in seller language | A real problem in the buyer's words, with a source if available | |
| Decision makers named | Missing | One generic title | Two or three specific titles | |
| Countries with rule notes | Missing | Countries listed, no notes | Each country with a note, Germany flagged if present | |
| Market is big and reachable enough | Not considered | Stated without reason | Reasoned with "at least 200 companies" and how to find them | |

**Good example.** "Seller. Routeful, route planning software for transport firms. Buyer. Transport and logistics firms in
NL, BE and DE with 20 to 500 staff and their own fleet of 15+ trucks. Why they buy. In a won call (transcript W3) the
head of planning said 'every Monday I rebuild the week in Excel and one sick driver breaks it all'. Talk to. Operations
director, head of planning, managing director. Countries. NL and BE email OK for business addresses, check in Module 2.
DE, email risky without consent, LinkedIn and phone first. Success after two weeks. Count of sends, replies, positive
replies, meetings. Why this market. Several thousand transport firms in these countries, listed in business registers
and on LinkedIn, decision makers have public profiles."

**Bad example.** "Seller. My company. Buyer. Businesses who need better efficiency. Talk to. Decision makers. Success.
10 meetings." It fails because the buyer could be anyone, nobody specific is named, there's no reason to buy, and
"10 meetings" is a promise with no basis.

**Stuck?**
1. *"I don't have a market."* Use Routeful. It's built for this. You can switch to your own market later, as long as you
   redo Assignment 1 on it.
2. *"My buyer is too broad."* Add one more filter (a country, a size range, a type of fleet or tool) until you could
   count the companies.
3. *"I wrote success as a promise."* Change "we will book 10 meetings" to "I'll measure meetings booked". You don't know
   the numbers yet, that's what the capstone finds out.

---

### Module 1. ICP and the revenue model

**Goal.** Define who your best customers are, why they pay, and who you should leave alone, written as a tiered ICP
sheet.
**Time.** 45 minutes of video, about 1.5 hours for the assignment.
**You need.** Your capstone brief. Your company's customer list, or the Routeful accounts sheet, won call transcripts and
pipeline.

#### Lesson 1.1 Who pays and why (9 min)

**In plain words.** An ICP (ideal customer profile) describes the companies most likely to buy from you and stay. It
starts with the question "who has this problem badly enough to pay to fix it". If you get this wrong, every later step
works hard on the wrong people.

**You'll be able to.**
- Write the problem your product solves in one sentence
- Tell the user, the buyer and the payer apart
- Write a first ICP sentence

**What's shown.**
1. Raka defines **ICP** on screen, with the Routeful example. "Transport and logistics companies in NL, BE and DE with 20
   to 500 staff, 15 or more trucks, planning in Excel or an old TMS."
2. He defines **TMS** (transport management system), software transport firms use to plan and track shipments, because
   it's in the Routeful ICP.
3. Three people in a deal. The **user** uses the product every day (a planner). The **buyer** chooses it (head of
   planning). The **payer** signs off the money (managing director). Sometimes one person is all three.
4. Raka opens Routeful won call W1 in the pack and highlights the sentence where the planner describes the problem, and
   the sentence where the managing director talks about cost.
5. The question "who has this problem badly enough to pay". He shows that a firm with 3 trucks has the problem a little,
   a firm with 40 trucks has it every day.
6. **Persona** means the type of person inside the company you talk to. Routeful has three. Raka writes one line per
   persona about what keeps them up at night.
7. The ICP sentence formula on screen. "[Industry] companies in [countries] with [size] that [situation that causes the
   problem]."
8. Close. "An ICP is a guess you'll test. Write it down so you can be proven wrong."

**Do it now.** (10 min) Write your product's problem in one sentence in the buyer's words. Name the user, buyer and payer
for your market. Write your first ICP sentence with the formula.

#### Lesson 1.2 Firmographics against behaviour (8 min)

**In plain words.** Firmographics are facts about a company, like size, industry and location. Behaviour is what the
company does, like the tools it uses, who it's hiring and how it plans. Firmographics tell you who could buy. Behaviour
tells you who has the problem.

**You'll be able to.**
- Sort ICP criteria into firmographic and behavioural
- Find one behavioural criterion for your market
- Explain why size and industry alone aren't enough

**What's shown.**
1. Define **firmographics**. Facts about a company such as size, industry, location, revenue.
2. Define **behaviour** criteria. What a company does, such as tools they use, roles they hire, how they work.
3. Two columns on screen for Routeful. Firmographic, "transport and logistics, 20 to 500 staff, NL BE DE". Behavioural,
   "planners still in Excel or an old TMS", "hiring planners", "own fleet of 15+ trucks".
4. Raka explains that two companies can match every firmographic and only one has the problem. Example from the pack,
   RF-007 and RF-012 are both 80 staff transport firms. RF-007 posted a job for "planner, Excel expert". RF-012 says on its
   site that it plans with a modern planning platform. Same size, different fit.
5. How you see behaviour in practice. Job posts, the company's own website, LinkedIn posts, tools found on their website.
6. A warning. Behaviour is harder to find, so people skip it and end up with a list that's big and weak.
7. Close. "Firmographics build the list. Behaviour ranks it."

**Do it now.** (10 min) Make two columns in a new sheet called "ICP draft". List at least three firmographic and two
behavioural criteria for your market. Next to each behavioural one, write where you'd see it (job post, website, LinkedIn).

#### Lesson 1.3 The revenue model and unit economics in plain words (10 min)

**In plain words.** A revenue model is how the company makes money from a customer. Unit economics is the money from one
customer compared with what it costs to win and serve them. If a type of customer costs more to win than they pay, they
aren't in your ICP, however keen they are.

**You'll be able to.**
- Work out what one customer is worth over time
- Compare it with what it costs to win them
- Spot a segment that loses money

**What's shown.**
1. Define **revenue model**. How money comes in. One off price, monthly subscription, per user, per truck.
2. Define **unit economics**. The money one customer brings in, against the cost to win and serve that customer.
3. Four plain numbers on screen, with Routeful's practice pack figures (made up for the course). Price per year (average
   deal in the pipeline sheet), how long customers stay, cost to win one customer (sales time and tools), cost to serve
   (onboarding and support).
4. Screen demo in Sheets. Raka opens the pipeline sheet, filters **Stage** to "Won", and uses `=AVERAGE()` on the deal
   value column to get the average deal.
5. He writes **customer value** as price per year times years they stay. Then **cost to win** as sales hours times an
   hourly cost plus tools. He compares the two.
6. He splits the won deals by company size with a filter. Small firms (under 20 staff) took as many sales hours as big
   ones and paid a fraction. That's the evidence for the "20 staff minimum" in the ICP.
7. **Segment** means a group of companies inside your ICP that you treat the same way. Raka shows two segments that
   appear from the numbers, mid sized fleets and large fleets.
8. Close. "Your ICP should be where the money works, not where people are friendly."

**Do it now.** (15 min) Using your own deal data or the Routeful pipeline sheet, calculate the average won deal value,
and the average deal value for companies under 20 staff against 20 and over. Write one sentence on what it tells you.

#### Lesson 1.4 Using your best customers, and the Astra lesson (9 min)

**In plain words.** Your best existing customers are the best clue to who your next customers should be. Look at who
bought fastest, paid most and stayed longest, and look at what they have in common. Astra learned this the hard way, and
Raka shows the numbers.

**You'll be able to.**
- Pick your best customers using clear rules
- Pull the patterns they share
- Explain why "everyone with a website" is not an ICP

**What's shown.**
1. Three rules for "best". Paid well, won quickly, stayed (or would stay). Raka sorts the Routeful won deals by value,
   then by days to close.
2. He adds a column "what they have in common" and fills it from the account sheet for the top 6. Pattern spotted, all have
   25+ trucks and all mentioned Excel in the call.
3. He shows the 4 lost calls. Two lost because the company was too small to justify the cost, one because a new TMS was
   already being installed, one on price. Losses are ICP data too.
4. The Astra lesson. Astra sent 330 researched cold first messages between 14 July and 25 October 2026. 26 people said
   yes, 7.9%. Many of the early yeses were consumer businesses (shops and brands selling to the public). They said yes and
   then couldn't pay. B2B companies (businesses that sell to other businesses) with a budget were the ones worth meeting.
5. Raka shows the October numbers. Of 119 first pitches, 30%
   replied and 15% said yes, against 4% saying yes in September. By 25 October that engine had booked 7 meetings. He's
   clear that no paid project has closed yet, so these are reply and meeting numbers, not revenue.
6. The lesson in one line. Someone saying yes is not the same as someone who can pay. Your ICP filters for both.
7. Why "everyone with a website" fails. A list that broad sends most of your effort to people who can't or won't buy.
8. Close. "Start from your best customers and your real losses, then write the ICP."

**Do it now.** (10 min) List your top 5 customers (or Routeful's top 5 won deals). Add a column "what they share" and fill
it. Then list 2 lost deals and why they were lost.

#### Lesson 1.5 Tiers and disqualifiers (9 min)

**In plain words.** Not every company that fits deserves the same effort. A tier says how good a fit an account is, so
tier 1 gets the most research and tier 3 gets a lighter touch. Disqualifiers are the facts that rule a company out
completely, so you don't waste a single message on them.

**You'll be able to.**
- Write rules for tier 1, 2 and 3
- Write at least four disqualifiers
- Apply them to a list with a formula

**What's shown.**
1. Define **tier**. A label for how good a fit an account is. Tier 1 is the best fit and gets the most effort.
2. Define **account**. A company you might sell to. A **contact** is a person at an account.
3. Define **disqualifier**. A fact that means "don't contact". Raka gives Routeful's. Under 20 staff. No own fleet (only
   brokers). Already a Routeful customer. Installed a new TMS in the last 12 months. Outside NL, BE and DE.
4. Routeful tier rules on screen. Tier 1 means 50 to 500 staff, 25+ trucks and a behaviour sign (Excel planning or old
   TMS). Tier 2 means it matches firmographics and has one behaviour sign missing or unknown. Tier 3 means it matches
   firmographics only.
5. Screen demo in Sheets. Open the Routeful accounts sheet. Add a column called "Disqualified". Type the formula
   `=IF(OR(C2<20, D2="No", E2="Customer"), "Yes", "No")` where C is staff, D is own fleet and E is status. Drag it down.
6. Add a column "Tier". Use nested `=IF()` to set 1, 2 or 3 based on staff, trucks and the behaviour column. Raka types it
   slowly and explains each part.
7. Click **Data**, **Create a filter**, then filter "Disqualified" to "No" and sort "Tier" A to Z.
8. Count each tier with `=COUNTIF(F:F, 1)` and so on. If tier 1 is more than about a third of the list, the rules are
   too loose.
9. Close. "Tiers decide effort. Disqualifiers protect your time and your reputation."

**Do it now.** (15 min) Write your tier 1, 2 and 3 rules and four disqualifiers in your "ICP draft" sheet. Apply them to
20 rows of your list or the Routeful accounts sheet with formulas.

#### Quiz 1 (pass 80%)

**Q1.** What is an ICP?
A. A list of contacts B. A description of the companies most likely to buy and stay C. A sales script D. A pricing
model
**Answer.** B. **Why.** It describes the best fit companies, not the people or the message. **Rewatch.** 1.1

**Q2.** Which of these is a behavioural criterion?
A. 80 staff B. Based in Belgium C. Hiring a planner who's "an Excel expert" D. Transport industry
**Answer.** C. **Why.** It shows what the company does, which hints at the problem. **Rewatch.** 1.2

**Q3.** True or false. If a type of customer is enthusiastic but costs more to win than they pay, they should still be
tier 1.
**Answer.** False. **Why.** Unit economics come first. Keen but unprofitable is outside the ICP. **Rewatch.** 1.3

**Q4.** In Astra's own numbers, what did consumer businesses tend to do?
A. Ignore every message B. Say yes and then couldn't pay C. Pay the most D. Ask for discounts only
**Answer.** B. **Why.** That's why Astra moved to B2B with budget. **Rewatch.** 1.4

**Q5.** Scenario. A Routeful account has 300 staff, 60 trucks and installed a new TMS four months ago. What do you do?
A. Tier 1, they're big B. Tier 2 C. Disqualify it for now D. Email the CEO twice
**Answer.** C. **Why.** A new TMS in the last 12 months is a Routeful disqualifier. **Rewatch.** 1.5

**Q6.** Who usually signs off the money in a deal?
A. The user B. The payer C. The SDR D. The planner
**Answer.** B. **Why.** The payer approves the spend, the user uses the product. **Rewatch.** 1.1

**Q7.** True or false. Lost deals are useful ICP data.
**Answer.** True. **Why.** Why you lose tells you who to leave out. **Rewatch.** 1.4

**Q8.** Your tier 1 contains 70% of your list. What's most likely wrong?
A. Nothing B. Your tier 1 rules are too loose C. Your list is too small D. You need more disqualifiers in tier 3
**Answer.** B. **Why.** Tier 1 should be the best few, so most of the list sitting there means the rules don't separate.
**Rewatch.** 1.5

**Q9.** What's the problem with "every company with a website" as an ICP?
A. It's too small B. It sends most effort to people who can't or won't buy C. Websites are hard to find D. Nothing
**Answer.** B. **Why.** Broad lists waste effort on poor fits. **Rewatch.** 1.4

#### Assignment 1. Your ICP sheet with tiers and disqualifiers

**Goal.** Build a one tab ICP sheet that states your ICP, personas, tier rules and disqualifiers, and applies them to at
least 30 real (or practice pack) accounts with formulas.
**Time.** About 1.5 hours.
**You need.** "T1 ICP sheet" template in "01 ICP". Your capstone brief. Your customer data or the Routeful accounts sheet,
pipeline and transcripts. The "ICP draft" sheet from the lessons.

**Steps.**
1. Open "T1 ICP sheet". It has two tabs, "ICP" and "Accounts".
2. On the "ICP" tab, fill in the boxes. ICP sentence (Lesson 1.1 formula). Problem in the buyer's words with its source
   (a call, a review, a post). User, buyer and payer. Personas, one line each.
3. In the "Evidence" box, paste the average deal by segment from Lesson 1.3 and your top 5 customers' shared traits from
   Lesson 1.4.
4. Fill in "Tier 1 rules", "Tier 2 rules", "Tier 3 rules", each as testable conditions (numbers or yes/no facts, not
   "good fit").
5. Fill in "Disqualifiers", at least four, each testable.
6. Go to the "Accounts" tab. Paste at least 30 accounts with these columns. Company, website, country, staff, the
   behaviour fields you need (for Routeful, trucks and planning tool).
7. In the "Disqualified" column, write an `=IF(OR(...))` formula that uses your disqualifiers. Drag it down.
8. In the "Tier" column, write a formula that applies your tier rules. Disqualified rows should show "DQ" instead of a
   tier. Drag it down.
9. In the summary cells at the top, use `=COUNTIF()` to count tier 1, tier 2, tier 3 and DQ.
10. Read three tier 1 rows by hand. Ask, would I bet on these? If not, fix the rules and repeat step 8.
11. Write two sentences in the "What I'd test first" box. Which rule are you least sure of, and how will you find out.
12. Share with **Anyone with the link**, **Viewer**, and copy the link.

**Hand in.** The view link to your "T1 ICP sheet" with both tabs filled and formulas working (not typed values).

**Marking rubric.**

| Criterion | 0 | 1 | 2 | Must? |
|---|---|---|---|---|
| ICP sentence is specific and testable | Missing or "all businesses" | Has industry or size only | Industry, size, countries and a situation causing the problem | Must |
| Evidence from best customers and losses | None | Some numbers, no losses | Deal values by segment, top customers' traits, and lost reasons | |
| Tier rules are testable | Missing | Written as opinions ("strong fit") | Numbers or yes/no facts for each tier | Must |
| Disqualifiers | Fewer than two | Two or three, or not testable | Four or more, each testable | |
| Formulas applied to 30+ accounts | Typed by hand or under 30 rows | Formulas with errors or gaps | Working formulas, DQ shown, counts at the top | Must |
| Honest note on what to test | Missing | Generic | Names the least certain rule and how to test it | |

**Good example.** Tier 1 rule reads "staff 50 to 500 AND trucks 25+ AND planning tool is Excel or a TMS older than 8
years". Disqualifiers read "staff under 20", "no own fleet", "existing customer", "new TMS in last 12 months". Counts
show 6 tier 1, 11 tier 2, 9 tier 3, 4 DQ out of 30. The note says "I'm least sure trucks 25+ matters more than staff
count. I'll check it against win rates in the pipeline sheet in Module 5."

**Bad example.** Tier 1 rule reads "big logistics companies that are innovative". Tier column typed by hand. 24 of 30 in
tier 1. It fails because nothing is testable, the formulas don't exist, and the tiers don't separate anything.

**Stuck?**
1. *"My formula shows an error."* Check that every text value is in quotes ("Yes") and every number column is formatted
   as a number (select the column, **Format**, **Number**, **Number**).
2. *"I don't know the number of trucks."* Mark it "unknown" for now and let tier 2 cover "behaviour unknown". Module 4
   shows how to fill gaps.
3. *"Everything is tier 1."* Make tier 1 need all conditions with `AND()`, and move "one condition missing" to tier 2.

---

### Module 2. Data foundations

**Goal.** Know where B2B data comes from, how to judge whether it's any good, and what GDPR asks of you before you
collect a single contact.
**Time.** 36 minutes of video, about 1 hour for the assignment.
**You need.** Your ICP sheet. Your company's CRM export, or the Routeful messy CRM export (400 contacts). Google Sheets.

#### Lesson 2.1 Where B2B data comes from (9 min)

**In plain words.** B2B data (data about businesses and the people who work there) comes from a handful of places. Some
are public, some you pay for, some you already own. Knowing the source tells you how much to trust a fact and how old it
might be.

**You'll be able to.**
- Name six sources of B2B data
- Tell first party data from third party data
- Pick the right source for a given fact

**What's shown.**
1. Define **B2B**. Business to business, companies selling to other companies.
2. Define **first party data**. Data you collect yourself (your CRM, your website forms, your calls). Define **third
   party data**. Data someone else collected and sells or shares (data providers, directories).
3. The six sources on screen, with what each is good for.
   - The company's own website. What they do, services, locations, sometimes team pages and tools.
   - Business registers. The official record of a company (in the Netherlands the KVK, in Belgium the KBO, in Germany the
     Handelsregister). Legal name, address, directors, founding date.
   - LinkedIn. People, job titles, company size bands, posts, job changes.
   - Job boards and careers pages. Who they're hiring, which tools they mention.
   - Data providers. Companies that sell contact and company data (emails, phone numbers, headcount). Clay connects to
     many of them, Module 4 covers this.
   - Your own CRM and conversations. Past deals, call notes, what customers said.
4. Raka shows the Routeful account RF-021 and finds each fact in a different source. Staff on LinkedIn, trucks on the
   company website's fleet page, the planning tool in a job post, legal name in the register.
5. Rule of thumb on screen. Official facts from the register. People facts from LinkedIn. Behaviour facts from the
   company's own site and job posts. Contact details from providers, always verified.
6. Raka's lesson from Astra. When a data provider and the company's own official page disagree, the official page wins.
   He shows a made up example where a provider lists a person as owner and the register shows they sold the company.
7. Close. "Every fact has a source. Write the source down next to the fact."

**Do it now.** (10 min) Pick one account from your list. Find three facts about it from three different sources. Write
each fact, its source link and the date you saw it.

#### Lesson 2.2 Records, objects and fields (8 min)

**In plain words.** A CRM stores data as records. Each record is one company, one person or one deal, and each piece of
information on it is a field. If you understand this shape, every tool in this course makes sense.

**You'll be able to.**
- Name the three main objects in a CRM
- Explain what a field is and how fields link records
- Read a CRM export and say which object each column belongs to

**What's shown.**
1. Define **record**. One row about one thing, like one company.
2. Define **object**. A type of record. The three main ones are companies (accounts), contacts (people) and deals
   (sales opportunities).
3. Define **field** (HubSpot calls it a **property**). One piece of information on a record, like "job title".
4. Screen demo in HubSpot. Click **CRM**, then **Contacts**, then **Companies**, then **Deals** in the menu, to show the
   three objects. Click one example record to show fields down the left side.
5. Links between objects. A contact belongs to a company, a deal belongs to a company and has contacts on it. HubSpot
   calls these **associations**.
6. Raka opens the Routeful messy CRM export in Sheets. He colours each column by the object it belongs to. Name and email
   are contact fields, company name and country are company fields, deal stage is a deal field.
7. He points out the problem. The export mixes all three objects in one flat sheet, which is why the company name is
   typed differently on every row.
8. Define **unique identifier**. A field that's different on every record, like an email address for a contact or a
   website domain for a company. It's how tools tell records apart.
9. Close. "Domain for companies, email or LinkedIn URL for people. Those are your keys."

**Do it now.** (5 min) Open your CRM export or the Routeful export. Add a row above the headers. Write "Contact",
"Company" or "Deal" above each column. Circle the column you'd use as the unique identifier for contacts and for
companies.

#### Lesson 2.3 Data quality, and how to measure it (9 min)

**In plain words.** Bad data costs money twice, once when you pay for it and again when your message bounces or reaches
the wrong person. Data quality comes down to five checks. Is it complete, correct, fresh, consistent and free of
duplicates.

**You'll be able to.**
- Score a data set on the five checks
- Count duplicates and missing values with formulas
- Fix inconsistent spellings with a lookup table

**What's shown.**
1. The five checks on screen. **Complete** (filled in), **correct** (true), **fresh** (still true today), **consistent**
   (written the same way everywhere), **unique** (no duplicates).
2. Screen demo on the Routeful export. Count blank emails. Click an empty cell and type `=COUNTBLANK(D2:D401)`.
3. Count duplicates. Add a column "Email count" with `=COUNTIF(D:D, D2)`, drag down, filter for values above 1.
4. Show inconsistent countries. Click **Data**, **Create a filter**, open the filter on the Country column. Raka reads out
   "NL", "Netherlands", "Nederland", "the netherlands", "Holland".
5. Fix it with a lookup table. On a new tab "Country map", list every spelling in column A and the clean value in column
   B. In the export, add "Country clean" with `=XLOOKUP(F2, 'Country map'!A:A, 'Country map'!B:B, "CHECK")`.
6. Mixed job titles. Raka filters job titles containing "plan" and shows "Planner", "Head of Planning", "planning mgr",
   "Hoofd planning". He explains a title map works the same way and Module 10 goes deeper.
7. Freshness. People change jobs. Any contact older than about a year should be checked again before you message them.
8. A data quality score on one line. For each check, the share of rows that pass. Raka writes them in a small table.
9. Close. "Measure the mess before you fix it, so you can show what you fixed."

**Do it now.** (15 min) On your export or the Routeful export, count blank emails, count duplicate emails, and list every
spelling of country. Write the three numbers in a small table.

#### Lesson 2.4 GDPR basics for outbound in the EU (10 min)

**In plain words.** GDPR is the EU law on personal data, and it applies to cold outreach too. A work email with a name in
it is personal data. You need a lawful reason to use it, you must keep only what you need, tell people where you got it
if they ask, and stop at once when they say stop. This is not legal advice, check your own country and company.

**You'll be able to.**
- Write a short legitimate interest note for your outreach
- Say which fields you need and which you shouldn't store
- Handle an opt out and a "where did you get my data" request

**What's shown.**
1. Raka says it plainly at the start. "This isn't legal advice. Check the rules in your country and with your company."
2. Define **GDPR**. The EU law on personal data, which covers names, work emails, phone numbers and LinkedIn profiles of
   people at companies.
3. Define **lawful basis**. The reason the law accepts for using someone's data. For B2B outreach this is usually
   **legitimate interest**, which means you have a real business reason, it's relevant to their job, and it doesn't
   override their rights. You must be able to justify it and write it down.
4. Screen demo. Open the "Legitimate interest note" template in "02 Data". Fill in the three boxes for Routeful. Purpose
   (offering route planning to people responsible for planning). Necessity (we only contact planning and operations
   roles, with work contact details). Balance (it's relevant to their job, we say where we got their data, and opt out is
   one reply).
5. **Data minimisation** means keeping only what the task needs. Raka crosses out fields from the Routeful export you
   shouldn't keep for outreach, like a personal mobile number or a home address.
6. **Source of data.** If someone asks where you got their details, you tell them. Raka adds a "Source" column to the
   sheet and fills it ("LinkedIn profile", "company website team page", "data provider name").
7. **Opt outs.** When someone says stop, you stop at once, and you record it so no one in your team contacts them again.
   He adds a "Do not contact" column.
8. Cold email rules differ by country. The UK and the Netherlands are more permissive for business addresses. In Germany,
   unsolicited B2B email is risky without consent. Learners check each country they plan to email, and when in doubt use
   LinkedIn or a call first.
9. Close. Raka shows the four columns every list in this course carries from now on. Source, date collected, lawful basis,
   do not contact.

**Do it now.** (10 min) Copy the "Legitimate interest note" template and fill it in for your capstone market. Add the
four columns (Source, Date collected, Lawful basis, Do not contact) to your ICP sheet's "Accounts" tab.

#### Quiz 2 (pass 80%)

**Q1.** Which source is best for a company's legal name and directors?
A. A data provider B. The business register C. A LinkedIn post D. A review site
**Answer.** B. **Why.** The register is the official record. **Rewatch.** 2.1

**Q2.** True or false. Your own CRM is third party data.
**Answer.** False. **Why.** Data you collect yourself is first party. **Rewatch.** 2.1

**Q3.** What is a field?
A. A type of record B. One piece of information on a record C. A whole CRM D. A sales stage
**Answer.** B. **Why.** Fields are like columns, such as job title. **Rewatch.** 2.2

**Q4.** Which is the best unique identifier for a company?
A. Company name B. Website domain C. City D. Industry
**Answer.** B. **Why.** Names are typed many ways, a domain is the same everywhere. **Rewatch.** 2.2

**Q5.** Scenario. Your sheet has "NL", "Netherlands" and "Holland" in the country column. Which data quality check fails?
A. Complete B. Fresh C. Consistent D. Unique
**Answer.** C. **Why.** The same value is written in different ways. **Rewatch.** 2.3

**Q6.** A contact asks where you got their email. What do you do?
A. Ignore it B. Tell them the source C. Delete your sheet D. Send them your sequence again
**Answer.** B. **Why.** GDPR requires you to tell people where their data came from on request. **Rewatch.** 2.4

**Q7.** True or false. Under GDPR you should keep extra fields "just in case".
**Answer.** False. **Why.** Data minimisation means keeping only what the task needs. **Rewatch.** 2.4

**Q8.** Scenario. You want to cold email planners in Germany without their consent. What does the course teach?
A. Go ahead, it's B2B B. It's risky, check the rules and consider LinkedIn or a call first C. Only email on weekends
D. Use a fake sender name
**Answer.** B. **Why.** In Germany unsolicited B2B email is risky without consent. **Rewatch.** 2.4

**Q9.** A data provider says Jan is the owner. The business register says he sold the company last year. Which wins?
A. The provider B. The register C. Whichever is newer on LinkedIn D. Ask Claude
**Answer.** B. **Why.** The official record beats a provider every time. **Rewatch.** 2.1

#### Assignment 2. Your data source map

**Goal.** Build a one tab map of every fact you need about your market, where you'll get it, how fresh and trustworthy it
is, what it costs and what the legal note is.
**Time.** About 1 hour.
**You need.** "T1 Data source map" template in "02 Data". Your ICP sheet (the tier rules and disqualifiers name the facts
you need). Your legitimate interest note.

**Steps.**
1. Open "T1 Data source map". It has columns Fact, Object (company or contact), Why I need it, Source 1, Source 2,
   Freshness, Trust (high, medium, low), Cost (free, credits, paid plan), Legal note.
2. Open your ICP sheet. Every rule in tier 1, 2, 3 and every disqualifier needs a fact. Write each fact on its own row
   (for Routeful, staff count, number of trucks, planning tool, country, existing customer, TMS installed date).
3. Add the contact facts you need. Name, job title, LinkedIn URL, work email. Stop there. Don't add anything you can't
   explain in "Why I need it".
4. For each fact, fill Source 1 (the best source from Lesson 2.1) and Source 2 (a backup).
5. For each source, check it's real. Open it for one account and confirm the fact is there. Write "checked on [date] for
   [account]" in the Freshness column.
6. Fill Trust. High for official or company owned sources, medium for LinkedIn, low for anything you can't confirm.
7. Fill Cost. For anything that uses Clay credits or a paid plan, write "credits" or "paid plan, check pricing page". No
   prices.
8. Fill the Legal note for contact facts. "Legitimate interest, see note", "personal, minimise", "do not store" for
   anything you decided against.
9. At the bottom, write the three facts that will be hardest to find and your plan for each.
10. Share with view access and copy the link.

**Hand in.** The view link to your data source map, plus the link to your legitimate interest note.

**Marking rubric.**

| Criterion | 0 | 1 | 2 | Must? |
|---|---|---|---|---|
| Every ICP rule and disqualifier has a fact row | Fewer than half covered | Most covered | All covered | Must |
| Sources are specific and checked | Generic ("the internet") | Named but not checked | Named, and checked on a real account with a date | Must |
| Trust and freshness filled sensibly | Missing | Filled but contradicts the source type | Filled and matches Lesson 2.1 rules | |
| Contact fields minimised with reasons | Personal or extra fields included | Fields fine, reasons missing | Only needed fields, each with a reason | Must |
| Legitimate interest note done | Missing | Present but vague | Purpose, necessity and balance in specific words | |
| Hardest three facts with a plan | Missing | Listed, no plan | Listed with a realistic plan each | |

**Good example.** Row "Planning tool. Company. Behaviour sign for tier 1. Source 1, job posts on the careers page.
Source 2, LinkedIn posts by planners. Freshness, checked 12 Nov for RF-021, post from Sept. Trust, high. Cost, free.
Legal note, company fact, not personal." Contact rows stop at name, title, LinkedIn URL and work email.

**Bad example.** Twelve rows with "Source, Google" on every one, a column for "personal phone" and "date of birth", no
dates checked. It fails because sources are vague, nothing was checked, and it stores personal data with no reason.

**Stuck?**
1. *"I can't find a source for a fact."* That fact may not work as an ICP rule. Mark it "unknown" and move the rule to
   tier 2, or replace it with a fact you can find.
2. *"I put every possible field in."* Delete any row where "Why I need it" doesn't point to a rule, a disqualifier or a
   message.
3. *"I'm not sure about the legal note."* Write what you'd do and add "check with company or a lawyer". The course isn't
   legal advice, writing your reasoning down is the habit.

---

### Module 3. Lists and lookalikes

**Goal.** Build a list of 200 accounts that match your ICP in two different ways, and compare them honestly.
**Time.** 46 minutes of video, about 2 hours for the assignment.
**You need.** Your ICP sheet and data source map. LinkedIn. Clay (free plan or trial). Claude. Optional, a Sales
Navigator trial and a PhantomBuster trial (only if you choose to, both are explained first).

#### Lesson 3.1 Account lists and contact lists (7 min)

**In plain words.** An account list is the companies you want to reach. A contact list is the people inside them. You
always build the account list first, then find the right people in each account, because a perfect person at the wrong
company is still a wasted message.

**You'll be able to.**
- Explain why accounts come before contacts
- Set the columns for an account list and a contact list
- Decide how many contacts per account to look for

**What's shown.**
1. Define **list building**. Finding the accounts and contacts that match your ICP.
2. Account first. Raka shows two lists for Routeful. One built from "people with planning in their title" (thousands,
   many at tiny firms and shippers who don't own trucks). One built from accounts first, then planners inside them
   (fewer, all relevant).
3. The account list columns on screen. Company, domain, country, staff, the ICP behaviour fields, tier, source, date.
4. The contact list columns. First name, last name, job title, persona, LinkedIn URL, work email (filled later),
   company domain (the link back to the account), source, date, do not contact.
5. Raka explains the domain column is the glue. It links each contact to its account in every tool.
6. How many contacts per account. For Routeful, up to 3, one per persona. More than that at a mid sized company starts to
   look like spam to the people inside it.
7. Close. "Two tabs, accounts and contacts, linked by domain."

**Do it now.** (5 min) Create a new sheet "200 accounts" in "03 Lists" with two tabs, "Accounts" and "Contacts", with the
columns from steps 3 and 4.

#### Lesson 3.2 LinkedIn and Sales Navigator search basics (10 min)

**In plain words.** LinkedIn is the biggest free map of companies and people in B2B. Its normal search has a few filters.
Sales Navigator is LinkedIn's paid search tool with many more filters, and it has a trial. You'll use search to find
accounts that match your ICP, carefully and within LinkedIn's limits.

**You'll be able to.**
- Run a company search on LinkedIn with filters
- Run an account search in Sales Navigator with ICP filters
- Save a search and copy results into your sheet by hand

**What's shown.**
1. Free search first. On LinkedIn, type "transport" in the top search box and press Enter. Click **Companies** in the bar
   under the search box. Click **Locations** and add Netherlands. Click **Company size** and tick 11 to 50, 51 to 200 and
   201 to 500. Click **Show results**.
2. Raka opens three results and checks each one against the ICP. One is a freight broker with no trucks, he marks it as a
   disqualifier example.
3. Define **Sales Navigator**. LinkedIn's paid search tool for sellers, with more filters and saved lists. It offers a free
   trial, check the current offer on LinkedIn's site. Start it only if you'll use it this week.
4. In Sales Navigator, click **Account filters** (or the accounts search). Add **Industry** (Truck Transportation,
   Transportation, Logistics and Supply Chain), **Headquarters location** (Netherlands, Belgium, Germany), **Company
   headcount** (11 to 50, 51 to 200, 201 to 500).
5. Add a behaviour hint. Use the keyword box with "planner" or "planning", or the filter for companies with job
   openings if it's available. Raka explains filter names change, so look for the closest one.
6. Click **Save search** and name it "Routeful tier test". Saved searches can alert you to new matches later (Module 5).
7. LinkedIn's limits. LinkedIn restricts automation and caps how much you can do. Searching by hand is fine. Copying 2,000
   profiles with a bot isn't. Check LinkedIn's own terms.
8. Raka copies 10 accounts by hand into the "Accounts" tab with domain, country and staff band, and writes "LinkedIn
   search" in the Source column.
9. Close. "Search gives you candidates. Your ICP rules still decide who's in."

**Do it now.** (15 min) Run a free LinkedIn company search with your ICP filters. Open 10 results, check each one against
your disqualifiers, and copy the ones that pass into your "Accounts" tab with source and date.

#### Lesson 3.3 PhantomBuster, used safely (9 min)

**In plain words.** PhantomBuster is a tool that collects data from websites like LinkedIn automatically, using small
programs it calls Phantoms. It saves hours, and it can get your LinkedIn account restricted if you push it. This lesson
shows when to use it, the safe settings, and when to skip it.

**You'll be able to.**
- Explain what PhantomBuster does and the risk
- Set a Phantom to export a saved search with safe limits
- Decide whether you need it at all for your list

**What's shown.**
1. Define **scraping**. Collecting data from a website automatically. The rule from README section 10 on screen. Only
   collect data in ways the source allows, and never more than the task needs.
2. The risk in plain words. LinkedIn limits automated activity. Tools that go too fast or too much can get your account
   restricted. Your LinkedIn account is worth more than any list.
3. When to skip it. If you need 200 accounts, a few hours of manual work or Clay (Lesson 3.4) may be enough. PhantomBuster
   is optional in this course.
4. Screen demo (trial account). Go to phantombuster.com, sign up for the trial. Click **Use Phantom** (or browse
   Phantoms), search for the Sales Navigator search export Phantom.
5. Connect LinkedIn using the method the tool shows (usually a browser extension). Raka explains what's being shared and
   that you can disconnect any time.
6. Paste your saved search URL from Lesson 3.2.
7. Set limits low. Raka sets a small number of results per launch and a slow launch schedule, and shows where the tool's
   own recommended limits are. He says to check LinkedIn's terms and the tool's guidance on the day, because both change.
8. Run once. Download the result as CSV. Open it in Sheets and show the columns.
9. Clean before using. Delete columns you don't need (data minimisation), add Source "PhantomBuster from Sales Navigator
   search" and the date.
10. Close. "Low and slow, or not at all."

**Do it now.** (10 min) Decide, in writing, whether you'll use PhantomBuster for your list, and why. If yes, write the
limits you'll set. If no, write how you'll get 200 accounts without it.

#### Lesson 3.4 Finding companies in Clay (10 min)

**In plain words.** Clay is a spreadsheet that can search for companies and people and pull data from many providers in
one place. Its company search lets you set ICP filters and pull a list straight into a table. This is the second way
you'll build your 200 accounts.

**You'll be able to.**
- Create a Clay table from a company search
- Apply ICP filters in Clay
- Export the table and compare it with your other list

**What's shown.**
1. Define **Clay**. A spreadsheet tool for GTM that finds companies and people and adds data from many sources. It
   charges in credits for some actions, so watch the balance.
2. Screen demo. In Clay, click **+ New** (or **Create**), choose the option to find companies (it may be called **Find
   companies** or a company search).
3. Set filters to match the ICP. Industry, country (Netherlands, Belgium, Germany), employee count range (20 to 500).
   Add a keyword for behaviour where the search allows it.
4. Click the preview or **Search**. Raka reads the count. If it's tens of thousands, the filters are too loose. If it's
   under 200, they're too tight.
5. Set the result limit to what you need plus a margin, around 300, so you don't pull more than you use.
6. Click to import into a table. Raka shows the columns that come in (name, domain, size, location, LinkedIn URL).
7. Add your ICP columns. Click **+ Add column**, choose a text column, name it "Tier". For now, fill tier rules later in
   Sheets.
8. Check 10 rows by hand. Open each domain. Raka finds two that are wrong (a warehouse software company and a firm that
   closed). Wrong rows are normal, checking is the job.
9. Export. Click the table menu, **Export**, **Download CSV**. Import it into your "200 accounts" sheet on a new tab
   called "Clay build".
10. Close. "Clay gets you volume quickly. You still check."

**Do it now.** (15 min) Run a Clay company search with your ICP filters, look at the count, adjust until it's between a
few hundred and a few thousand, and import 50 rows into a table. Check 5 of them by hand.

#### Lesson 3.5 AI lookalikes from your best customers, and avoiding junk (10 min)

**In plain words.** A lookalike is a company that looks like your best existing customers. You can ask Claude to describe
what your best customers share, then use that description to find more like them. AI makes mistakes, so every
lookalike gets checked before it goes on your list.

**You'll be able to.**
- Write a prompt that turns your best customers into a lookalike description
- Use that description to find new accounts
- Spot and remove junk rows from any list

**What's shown.**
1. Define **lookalike**. A company that looks like your best customers.
2. Define **prompt**. The instruction you give an AI.
3. Screen demo in Claude. Raka pastes the top 6 Routeful won accounts (from the practice pack, made up) with their
   website text snippets from the pack. Prompt on screen.
   "Here are six customers who bought quickly and paid well. List what they have in common, in facts I could check on a
   website or LinkedIn (size, fleet, services, regions, tools, hiring). Don't guess. For each trait, say which customers
   show it. Then write search keywords I could use to find similar companies."
4. Claude's answer. Raka checks two traits against the source text. One is right. One ("all offer cold storage") only
   applies to two of six, so he removes it.
5. Use the description. In Clay, he adds the keywords to the company search from Lesson 3.4 and runs it again.
6. Another way. Some Clay searches and data providers offer "similar companies" from a domain. Raka shows where to look
   and says to check which ones the account's plan includes.
7. Junk rows and how to spot them. Duplicates (same domain twice), wrong industry, too small, closed companies, parent
   companies instead of the local firm, existing customers. Raka filters each one out.
8. A quick quality check. Pick 20 random rows (Raka uses `=RANDBETWEEN()` to choose) and open each one. If more than 3 are
   wrong, the list method needs fixing, not just the rows.
9. Close. "AI suggests, you check. A list is only as good as its worst 10%."

**Do it now.** (15 min) Paste your top 5 customers (or Routeful's) into Claude with the prompt from step 3. Check two
traits against the source. Write the keywords you'd use, and run them in LinkedIn or Clay.

#### Quiz 3 (pass 80%)

**Q1.** Why build the account list before the contact list?
A. It's cheaper to print B. A perfect person at the wrong company is still a wasted message C. LinkedIn requires it
D. Contacts don't matter
**Answer.** B. **Why.** Accounts are filtered by ICP first, then you find the right people. **Rewatch.** 3.1

**Q2.** Which column links a contact to its account across tools?
A. First name B. Job title C. Company domain D. Country
**Answer.** C. **Why.** The domain is the same in every tool. **Rewatch.** 3.1

**Q3.** True or false. Sales Navigator is LinkedIn's free search.
**Answer.** False. **Why.** It's the paid search tool, with a trial. **Rewatch.** 3.2

**Q4.** Scenario. A teammate sets PhantomBuster to export thousands of profiles a day from their only LinkedIn account.
What's the risk?
A. None B. The LinkedIn account can be restricted C. The CSV will be too big D. It costs nothing
**Answer.** B. **Why.** LinkedIn limits automation, so low and slow, or not at all. **Rewatch.** 3.3

**Q5.** Your Clay company search returns 80,000 companies. What do you do?
A. Import them all B. Tighten the filters C. Delete Clay D. Pick the first 200
**Answer.** B. **Why.** A huge count means the filters don't match the ICP. **Rewatch.** 3.4

**Q6.** What is a lookalike?
A. A fake account B. A company that looks like your best customers C. A duplicate row D. A competitor
**Answer.** B. **Why.** It's built from what your best customers share. **Rewatch.** 3.5

**Q7.** Claude says all six of your best customers offer cold storage. You check and only two do. What do you do?
A. Keep it, AI is usually right B. Remove that trait from the description C. Add more customers D. Ask again until it agrees
**Answer.** B. **Why.** Every AI claim is checked against the source. **Rewatch.** 3.5

**Q8.** You check 20 random rows and 6 are wrong. What does that tell you?
A. Fix those 6 and move on B. The list method needs fixing C. The list is fine D. Check 20 more and average
**Answer.** B. **Why.** More than 3 in 20 wrong means the method is the problem. **Rewatch.** 3.5

**Q9.** True or false. Scraping is fine as long as you can technically do it.
**Answer.** False. **Why.** Only collect data in ways the source allows, and no more than you need. **Rewatch.** 3.3

#### Assignment 3. 200 accounts, built two ways and compared

**Goal.** Build two lists of about 200 ICP accounts by two different methods, then compare quality, overlap, time and
cost, and pick the method you'll use going forward.
**Time.** About 2 hours.
**You need.** "200 accounts" sheet from Lesson 3.1. Your ICP sheet (tier rules and disqualifiers). LinkedIn search (and
Sales Navigator or PhantomBuster if you chose them). Clay. Claude. A timer.

**Steps.**
1. Pick your two methods. Method A is search based (LinkedIn or Sales Navigator search, by hand or with PhantomBuster
   within safe limits). Method B is Clay company search with AI lookalike keywords. Write them at the top of a new tab
   "Comparison".
2. Start a timer. Build Method A into a tab "List A" until you have about 200 accounts. Fill company, domain, country,
   staff, source, date. Stop the timer and write the minutes.
3. Start the timer again. Build Method B into "List B" the same way (Lessons 3.4 and 3.5). Stop and write the minutes.
   Note credits used, from Clay's credit balance before and after.
4. Clean both lists. Remove duplicates by domain (in Sheets, click **Data**, **Data cleanup**, **Remove duplicates**, tick
   only the domain column). Remove existing customers and anything that breaks a disqualifier.
5. Measure overlap. In "List A", add a column "Also in B" with `=IF(COUNTIF('List B'!B:B, B2)>0, "Yes", "No")` where B is
   the domain column. Count the yeses.
6. Measure quality. Pick 20 random rows from each list. Open each company's website. Mark each "Right" or "Wrong" with a
   reason.
7. Apply your tier formula from Assignment 1 to both lists. Count tier 1, 2, 3 in each.
8. Fill the "Comparison" table. Rows are Accounts after cleaning, Minutes spent, Credits used, Wrong in 20 checked, Tier
   1 count, Overlap. Columns are List A and List B.
9. Write a short conclusion (4 to 6 sentences). Which method gave better accounts, which was cheaper per good account,
   what you'd change, and which you'll use for the capstone.
10. Merge the winners into one "Master list" tab with a "Method" column, so you keep where each account came from.
11. Share with view access and copy the link.

**Hand in.** The view link to "200 accounts" with tabs List A, List B, Comparison and Master list.

**Marking rubric.**

| Criterion | 0 | 1 | 2 | Must? |
|---|---|---|---|---|
| Two genuinely different methods | Same method twice | Different, but one under 100 accounts | Two methods, each about 200 accounts | Must |
| Cleaned against ICP and disqualifiers | Not cleaned | Duplicates removed only | Duplicates, customers and disqualified rows removed | Must |
| Quality checked by hand | No checking | Fewer than 20 rows, or no reasons | 20 per list, each with a reason | Must |
| Comparison table complete | Missing | Some rows missing | Accounts, minutes, credits, wrong rate, tier 1, overlap | |
| Conclusion based on the numbers | Missing | Opinion without numbers | Uses the numbers and states a choice | |
| Source and date on every row | Missing | On some rows | On every row | |

**Good example.** "List A (LinkedIn search by hand) 194 accounts after cleaning, 140 minutes, 0 credits, 2 of 20 wrong,
41 tier 1. List B (Clay plus lookalike keywords) 211 accounts, 45 minutes, credits used noted, 5 of 20 wrong, 38 tier
1. Overlap 63. Conclusion. A was more accurate but three times slower. B found 148 companies A missed, mostly smaller
German firms. I'll use B for volume and check tier 1 rows by hand, so I get B's speed with A's accuracy where it matters."

**Bad example.** One Clay export of 200 rows copied into both tabs, no checking, a conclusion saying "Clay is better".
It fails because there's only one method, nothing was checked, and the conclusion has no evidence.

**Stuck?**
1. *"I can't get to 200 by hand."* Do 100 by hand and note the minutes, then work out the time for 200. Say so in the
   conclusion. Honest is fine.
2. *"My Clay credits ran low."* Pull fewer columns. Company search results are usually enough for this assignment,
   enrichment comes in Module 4.
3. *"The overlap formula shows all No."* The domains are probably written differently ("www.", "https://", a trailing
   "/"). Clean them first with `=REGEXREPLACE(B2, "^(https?://)?(www\.)?|/$", "")`.

---

### Module 4. Enrichment and waterfalls

**Goal.** Fill the gaps in your list by trying data sources in a smart order, verify what you find, and know exactly
what each found email costs.
**Time.** 46 minutes of video, about 1.5 hours for the assignment.
**You need.** Your master list from Assignment 3. Your data source map. Clay with credits (free plan or trial, check
the pricing page for what's included). The Routeful messy CRM export if you're on the pack.

#### Lesson 4.1 What enrichment is (8 min)

**In plain words.** Enrichment means adding missing facts to a record, like an email address, a job title or a company's
size. You start with a little (a company domain, a person's name) and end with what you need to tier, score and
contact them. Every fact you add should have a reason, a source and a date.

**You'll be able to.**
- Explain enrichment in one sentence
- List which fields you'll enrich and why
- Tell company enrichment from contact enrichment

**What's shown.**
1. Define **enrichment**. Adding missing facts to a record.
2. Company enrichment fills facts about the account (staff, industry, tools, location). Contact enrichment fills facts
   about the person (title, LinkedIn URL, work email, sometimes phone).
3. Raka opens the data source map from Assignment 2 and highlights the facts marked "credits". Those are the enrichment
   targets.
4. Define **data provider**. A company that sells business and contact data. Clay connects to many of them in one place,
   so you don't need a separate account with each.
5. He shows that providers are good at different things. Some find more emails in one country, some are better on
   company size, some on phone numbers. Nobody finds everything.
6. What enrichment can't do. It can't tell you the company's current problem. That's research (Module 6).
7. The habit. Every enriched field gets a "found by" column with the provider name and a date, so you can trust it or
   recheck it later.
8. Close. "Enrich only what a rule or a message needs."

**Do it now.** (5 min) On your master list, mark each empty column you'd enrich with the rule or message that needs it.
Delete any empty column that has no reason.

#### Lesson 4.2 Waterfall logic (9 min)

**In plain words.** A waterfall tries one data source, and only if it finds nothing, tries the next, then the next. You
stop as soon as you have an answer. That way you find more than any single source would, and you only pay for the
lookups you need.

**You'll be able to.**
- Draw a waterfall for one field
- Choose the order of providers
- Explain why a waterfall finds more and costs less

**What's shown.**
1. Define **waterfall**. Try source A, if empty try B, if empty try C, stop when found.
2. Drawn on screen for work email. Step 1, provider A. Found? Stop. Not found? Step 2, provider B. And so on. Last step,
   "not found", which is an answer too.
3. Why it finds more. Different providers cover different people. Raka shows a made up example of 10 contacts where A
   finds 5, B finds 2 more of the remaining 5, C finds 1 more. 8 of 10, against 5 with A alone.
4. Why it costs less. You only call B for the 5 that A missed, and C for the 3 that B missed.
5. How to order providers. Cheapest and best for your country first, most expensive last. Raka says to test this on
   your own data (Lesson 4.5), because coverage differs by market.
6. A waterfall for company size works the same way. Company website, then LinkedIn data, then a provider.
7. Free steps first. A pattern guess (like firstname@domain) followed by verification is cheap, and Raka shows it as
   step zero in some waterfalls, only when verification follows.
8. Close. "Order by cost and coverage, stop when found."

**Do it now.** (10 min) Draw (on paper or in a doc) your waterfall for work email and one company field. Name at least
three steps each and the stop rule.

#### Lesson 4.3 Building a waterfall in Clay (12 min)

**In plain words.** Clay has waterfalls built in. You add an enrichment column, choose several providers in order, and
Clay runs them one after another until one finds an answer. This lesson builds one for work email on 20 rows.

**You'll be able to.**
- Import a list into a Clay table
- Add a waterfall enrichment for work email
- Run it on a small test and read the results

**What's shown.**
1. Screen demo. In Clay, click **+ New**, **Table**, choose import from CSV. Upload the contacts tab of your master list
   (Routeful users can use 20 contacts from the pack with missing emails).
2. Check the columns mapped correctly. First name, last name, company domain, LinkedIn URL.
3. Click **+ Add column**, choose **Enrich data**, search for the work email option. Clay shows a waterfall with several
   providers listed. Raka explains the list and the order.
4. Change the order to match your plan from Lesson 4.2 by dragging providers. Remove any you don't want.
5. Map the inputs. Tell Clay which column is the first name, last name, domain and LinkedIn URL.
6. Set it to run on the first 10 rows only (look for the option to run on a selection, or select rows and run). Never
   run a new column on the whole table first.
7. Click **Run** (or **Save and run**). Watch cells fill. Click one cell to see which provider found it.
8. Add a column for which provider found it, so you can count coverage per provider later. Raka shows how to pull that
   field out of the result.
9. Check the credit balance before and after. Write both numbers down.
10. Close. "Test on 10, read it, then run the rest."

**Do it now.** (15 min) Import 20 contacts into Clay, add a work email waterfall with at least three providers, and run it
on 10 rows. Write down credits before and after.

#### Lesson 4.4 Verification and bounces (8 min)

**In plain words.** Verification checks an email address exists before you send to it. A bounce is an email that
couldn't be delivered. Too many bounces and email providers start sending your mail to spam, so you verify every
address and never send to the ones that fail.

**You'll be able to.**
- Add a verification step after your waterfall
- Read the result types (valid, invalid, catch all, unknown)
- Decide which results are safe to send to

**What's shown.**
1. Define **verification**. Checking an email address exists before you send.
2. Define **bounce**. An email that couldn't be delivered. A **hard bounce** means the address doesn't exist. A **soft
   bounce** means a temporary problem, like a full inbox.
3. Why it matters. Bounces hurt your sender reputation, which affects whether your emails land in inboxes. Module 8 covers
   **deliverability** (whether your emails land in the inbox rather than spam) in full.
4. Screen demo. In Clay, click **+ Add column**, **Enrich data**, search for email verification, choose a verifier. Map
   it to the email column from your waterfall. Run on the 10 test rows.
5. Read the results. **Valid** means safe. **Invalid** means don't send. **Catch all** means the company's server
   accepts everything, so the address might not exist. **Unknown** means the check couldn't finish.
6. Raka's rule for the course. Send only to valid. Catch all goes to LinkedIn or phone first, or a very small test. Never
   send to invalid or unknown.
7. Some Clay waterfalls verify as they go. Raka shows where that setting is and says to check whether your waterfall
   already does it, so you don't pay twice.
8. Close. "Unverified email is a guess. Don't send guesses."

**Do it now.** (10 min) Add a verification column to your 10 test rows. Count valid, invalid, catch all and unknown.

#### Lesson 4.5 Cost per found email, and when to stop (9 min)

**In plain words.** Every lookup costs credits, and some rows will never be found. The number that matters is the cost
per verified email you can actually use. Once a step costs more than the contact is worth to you, you stop and use
another channel.

**You'll be able to.**
- Calculate cost per row and cost per verified email
- Compare providers on coverage and cost
- Set a stop rule for your waterfall

**What's shown.**
1. Define **cost per row**. Total credits used divided by rows run.
2. Define **cost per verified email**. Total credits used divided by valid emails found. This is the one that matters.
3. Screen demo in Sheets. Raka pastes the test results. Credits before, credits after, rows run, valid emails. He
   calculates both numbers with simple division.
4. To turn credits into euros, open the Clay pricing page, find what your plan costs and how many credits it includes,
   and divide. Raka does it on screen without saying the number out loud and reminds learners that it changes.
5. Coverage by provider. Using the "found by" column, he uses `=COUNTIF()` to count how many each provider found. The
   last provider found 1 in 10 and cost the most, so he removes it.
6. The stop rule. Think about what one tier 3 contact is worth to you. If finding their email costs more than the
   expected value, stop the waterfall for tier 3 and use LinkedIn instead. Tier 1 contacts get the full waterfall.
7. Raka sets the rule in Clay with a condition on the column (look for the option to only run if a condition is met),
   for example "only run if Tier is 1 or 2".
8. Close. "Spend where the tier says it's worth it."

**Do it now.** (10 min) Calculate cost per row and cost per verified email for your 10 test rows. Count coverage per
provider. Write one stop rule.

#### Quiz 4 (pass 80%)

**Q1.** What is enrichment?
A. Deleting old records B. Adding missing facts to a record C. Sending emails D. Scoring accounts
**Answer.** B. **Why.** You add facts like email, title or size. **Rewatch.** 4.1

**Q2.** In a waterfall, when does provider B run?
A. Always B. Only when provider A found nothing C. Before provider A D. Never
**Answer.** B. **Why.** You stop as soon as one source finds an answer. **Rewatch.** 4.2

**Q3.** True or false. A waterfall usually finds more than any single provider alone.
**Answer.** True. **Why.** Providers cover different people. **Rewatch.** 4.2

**Q4.** Scenario. You've just built a new enrichment column. What do you run it on first?
A. The whole table B. About 10 rows C. Nothing, just trust it D. Only tier 3
**Answer.** B. **Why.** Test small, read the results, then run the rest. **Rewatch.** 4.3

**Q5.** A verifier says "catch all". What does the course rule say?
A. Send at full volume B. LinkedIn or phone first, or a very small test C. Delete the company D. Treat it as invalid
forever
**Answer.** B. **Why.** Catch all might not exist, so don't risk bounces. **Rewatch.** 4.4

**Q6.** What is a hard bounce?
A. A reply saying no B. An email to an address that doesn't exist C. A full inbox D. An opened email
**Answer.** B. **Why.** Hard bounces are permanent failures and hurt your reputation. **Rewatch.** 4.4

**Q7.** You used 300 credits on 100 rows and found 40 valid emails. What is the cost per verified email in credits?
A. 3 B. 7.5 C. 0.4 D. 40
**Answer.** B. **Why.** 300 divided by 40 is 7.5. **Rewatch.** 4.5

**Q8.** Your last provider finds 1 in 10 and is the most expensive. What do you do?
A. Move it to first B. Consider removing it, or only run it for tier 1 C. Add two more like it D. Nothing
**Answer.** B. **Why.** Spend where the coverage and the tier justify it. **Rewatch.** 4.5

**Q9.** True or false. Enrichment can tell you what problem a company has right now.
**Answer.** False. **Why.** Enrichment fills facts, research finds the reason to talk. **Rewatch.** 4.1

#### Assignment 4. A Clay waterfall with a cost per row figure

**Goal.** Build a working Clay table that enriches at least 50 contacts with a work email waterfall plus verification,
with a stop rule by tier, and report cost per row, cost per verified email and coverage per provider.
**Time.** About 1.5 hours.
**You need.** Your master list (accounts and up to 3 contacts each, or Routeful contacts from the pack). Clay. The "T1
Enrichment report" template in "04 Enrichment".

**Steps.**
1. Pick 50 contacts. Include at least 15 from tier 1 accounts, 20 from tier 2 and 15 from tier 3. Add a "Tier" column.
2. In Clay, click **+ New**, **Table**, import the 50 as CSV. Check the columns map correctly.
3. Write down the credit balance.
4. Click **+ Add column**, **Enrich data**, add the work email waterfall. Set the provider order from Lesson 4.2.
5. Set the run condition so tier 3 rows only use the cheapest step (or none), and tier 1 and 2 use the full waterfall.
6. Add a "Found by" column that shows which provider returned the email.
7. Add a verification column after the waterfall (or confirm the waterfall verifies already).
8. Run on 10 rows. Check the results make sense. Then run on the remaining 40.
9. Write down the credit balance again.
10. Open "T1 Enrichment report". Fill in rows run, credits used, valid emails, catch all, invalid, not found, cost per
    row, cost per verified email, coverage per provider (with `=COUNTIF()` on an exported copy), and the euro value of
    one credit for your plan (calculated from the pricing page, with the date).
11. Write three sentences. Which provider earned its place, which you'd drop, and your stop rule for the capstone.
12. In Clay, click the table's **Share** option and create a view link if available. If not, export the table as CSV,
    upload to Drive, and take a screenshot of the Clay columns and run settings.

**Hand in.** The Clay view link (or exported CSV plus a screenshot of the waterfall settings) and the link to your
filled enrichment report.

**Marking rubric.**

| Criterion | 0 | 1 | 2 | Must? |
|---|---|---|---|---|
| Waterfall built with 3+ providers in a reasoned order | Single provider | Several providers, no reason for order | 3+ providers, order explained by cost and coverage | Must |
| Verification and send rule | No verification | Verified, no rule for catch all | Verified, with valid only rule and catch all handling | Must |
| Stop rule by tier | None | Written but not set in Clay | Set as a run condition in Clay | |
| Cost per row and per verified email | Missing | One of them, or wrong maths | Both, maths correct, credit to euro worked out with date | Must |
| Coverage per provider | Missing | Counts with no conclusion | Counts and a decision about which to keep | |
| Tested small before running all | Ran all at once | Unclear | Shows the 10 row test before the full run | |

**Good example.** "50 rows, credits used noted, 31 valid, 6 catch all, 4 invalid, 9 not found. Cost per row and per
verified email both shown, with one credit's euro value calculated from the pricing page on 3 Dec. Provider A found 19,
B found 9, C found 3. C cost most for 3 finds, so tier 1 only from now. Stop rule, tier 3 gets pattern plus verify only,
then LinkedIn."

**Bad example.** "Ran Clay on 400 contacts, got lots of emails." No verification, no cost figure, no provider counts. It
fails because nothing is measured, unverified emails would cause bounces, and the credits were spent with no test.

**Stuck?**
1. *"The waterfall found almost nothing."* Check the inputs are mapped (domain especially). A blank or messy domain
   column breaks every provider.
2. *"I ran out of credits."* Reduce to 30 rows, keep the tier mix, and note it in the report. The method matters more
   than the size.
3. *"I can't see which provider found it."* Click one filled cell, open the full result, find the provider field, and use
   the option to add it as its own column.

---

### Module 5. Scoring and signals

**Goal.** Rank your accounts by how well they fit and how ready they are now, using a points model and live signals that
keep arriving by themselves.
**Time.** 47 minutes of video, about 1.5 hours for the assignment.
**You need.** Your enriched master list. Your ICP sheet. LinkedIn (and a Sales Navigator saved search if you have the
trial). Google Alerts. Clay. Your call notes or the Routeful call transcripts and pipeline.

#### Lesson 5.1 Fit against intent (8 min)

**In plain words.** Fit says "is this the right type of company". Intent says "are they looking for something like what
we sell, right now". A great fit with no intent can wait. A great fit with intent is who you contact this week.

**You'll be able to.**
- Explain fit and intent in one sentence each
- Place accounts in a two by two grid
- Decide who to contact first

**What's shown.**
1. Define **fit score**. Points for how well a company matches your ICP. Mostly firmographics and behaviour that change
   slowly.
2. Define **intent**. Signs a company is actively looking for something like what you sell. **Intent score** is points
   for those signs.
3. Define **scoring**. Giving accounts points so you know who to contact first.
4. A two by two grid on screen. High fit and high intent (contact now). High fit and low intent (nurture and watch). Low
   fit and high intent (check carefully, might be a stretch). Low fit and low intent (leave).
5. Raka places five Routeful accounts in the grid using the pack data. RF-031 is tier 1 and just posted two planner jobs,
   top right.
6. Intent fades. A job post from last week matters more than one from six months ago, so intent points need a date.
7. Close. "Fit decides if. Intent decides when."

**Do it now.** (5 min) Draw the grid. Put 8 of your accounts in it, with one sentence each on why.

#### Lesson 5.2 Signal types and where to find them (10 min)

**In plain words.** A signal is something that happens which makes a company more likely to buy now. Hiring, funding,
a new boss, a new tool, a new location, or a visit to your website. Each one has a place you can watch for it.

**You'll be able to.**
- Name six signal types
- Pick the three that matter most for your market
- Say where each one can be found

**What's shown.**
1. Define **signal**. Something that happens that makes a company more likely to buy now.
2. Six types on screen with where to find each.
   - Hiring. Careers pages, job boards, LinkedIn jobs. For Routeful, a planner job post that mentions Excel.
   - Funding or growth. News, press releases, business registers (a new location or company).
   - Leadership change. A new operations director on LinkedIn. New bosses often change tools in their first months.
   - Tech change. A new tool mentioned on the website or in job posts, or an old tool being retired.
   - Content and engagement. A post by the head of planning about late deliveries, a comment on a competitor's post.
   - Website visits. People from that company visiting your site. Needs a tool on your own website, Module 11 covers it.
3. Raka ties each signal to the problem. A planner job with "Excel" means the planning is still manual. A new operations
   director means a person who wants to make a mark.
4. Strong against weak. A signal is strong when it points at your problem. "Raised money" is weak for Routeful. "Opened a
   second depot" is strong, because planning gets harder.
5. The signal library. Raka opens the course's signal library template (around 30 signals with where to find each) and
   filters it for logistics.
6. Close. "Pick the three signals that point most directly at the problem you solve."

**Do it now.** (10 min) Open the signal library. Pick the three signals that best fit your market. For each, write why it
points at your problem and where you'd see it.

#### Lesson 5.3 Building a points model (11 min)

**In plain words.** A points model gives each fact and each signal a number of points, adds them up, and ranks your
accounts. It's simple maths in a sheet, and you'll check it against real wins to see whether it works.

**You'll be able to.**
- Assign fit points and intent points
- Build the total score with formulas
- Test the model against won and lost deals

**What's shown.**
1. The model on screen for Routeful. Fit points. Staff 50 to 500 gives 20, 20 to 49 gives 10. Trucks 25+ gives 20,
   15 to 24 gives 10. Excel or old TMS gives 25. Country NL or BE gives 5. Intent points. Planner job in the last 30 days
   gives 20. New operations director in the last 90 days gives 15. Post about planning problems in the last 30 days
   gives 10.
2. Disqualified accounts score zero, whatever else they have.
3. Screen demo in Sheets. Add columns "Fit score", "Intent score", "Total". For fit, Raka writes
   `=IF(AND(C2>=50, C2<=500), 20, IF(C2>=20, 10, 0)) + IF(D2>=25, 20, IF(D2>=15, 10, 0)) + IF(E2="Excel", 25, 0)`.
4. For intent with dates, he uses `=IF(AND(F2<>"", TODAY()-F2<=30), 20, 0)` where F is the date of the last planner job
   post.
5. Total is fit plus intent. Disqualified rows set to 0 with `=IF(G2="Yes", 0, H2+I2)`.
6. Sort by total, highest first. Raka reads the top 10.
7. Test it. He opens the Routeful pipeline sheet, takes the 60 deals, adds the score for each account, and compares the
   average score of won deals with lost deals. Won deals score higher on average. If they didn't, the points would be
   wrong.
8. He changes one weight (Excel from 25 to 15) and shows how the ranking changes, so learners see that weights are
   decisions, not facts.
9. The same model in Clay. Add a formula column with the same logic, so the score updates when new data arrives.
10. Close. "Simple, written down, and tested against what actually won."

**Do it now.** (15 min) Write your points table (at least four fit items and two intent items). Build the three score
columns on 30 accounts and sort by total.

#### Lesson 5.4 Setting up live signal sources (10 min)

**In plain words.** A live signal source is a feed that tells you when a signal happens, without you checking by hand.
You'll set up three. Google Alerts for news, a LinkedIn saved search or alert for people and jobs, and a Clay column that
checks for job posts.

**You'll be able to.**
- Create a Google Alert for a signal
- Save a LinkedIn search that alerts you to changes
- Add a signal check column in Clay

**What's shown.**
1. **Google Alerts.** Go to google.com/alerts. Type a search like `"route planner" vacancy transport` or a company name
   plus "new depot". Click **Show options**. Set **How often** to once a day, **Sources** to automatic, **Language** and
   **Region** to your market. Click **Create alert**.
2. Raka creates one alert per signal type and one per tier 1 account name.
3. **LinkedIn.** On LinkedIn, search **Jobs** for "planner" with your country, click **Set alert** (the toggle near the
   top of results). For people changes, a Sales Navigator saved search for "operations director" at your tier 1 accounts
   with "changed jobs in last 90 days" if your trial has it.
4. **Clay.** In your table, click **+ Add column**, **Enrich data**, search for a job post or hiring signal option. Map it
   to the company domain or LinkedIn URL. Run on 5 rows to test.
5. Clay can rerun on a schedule on some plans. Raka shows where the schedule setting is and says to check whether your
   plan includes it.
6. Where signals land. A tab "Signals log" with date, account, signal type, link, points added. Every signal gets logged
   before it changes a score.
7. Check the signal is real. Raka opens one alert and finds it's about a different company with a similar name. He logs
   it as "false match" and doesn't add points.
8. Close. "Three feeds, one log, every signal checked."

**Do it now.** (15 min) Create one Google Alert and one LinkedIn job alert for your market. Make a "Signals log" tab.

#### Lesson 5.5 The eavesdrop loop (8 min)

**In plain words.** The eavesdrop loop is Raka's name for listening to what customers and prospects actually say, in
calls, posts and reviews, and feeding it back into your ICP, your scores, your lists and your messages. Their words are
better than your guesses.

**You'll be able to.**
- Pull problem phrases out of call transcripts
- Turn a phrase into a scoring item or a signal
- Run the loop on a schedule

**What's shown.**
1. Define **eavesdrop loop**. Listening to what customers and prospects say and feeding it back into the engine.
2. Raka opens the Routeful call transcripts, 6 won and 4 lost.
3. Screen demo in Claude. He pastes the six won transcripts with the prompt. "List every sentence where the customer
   describes a problem, in their exact words. For each, give the transcript name. Don't summarise or add anything that
   isn't in the text."
4. He checks three quotes against the transcripts with Ctrl+F (Cmd+F on Mac). All three are there word for word.
5. Patterns. Four of six won customers mentioned "Monday" and rebuilding the week's plan. Two mentioned drivers calling
   in sick.
6. Feeding it back. "Mentions sick drivers or last minute changes in job posts" becomes a new intent item. "Rebuilds the
   plan every Monday" becomes message language for Module 7.
7. He runs the same prompt on the four lost calls. Two say the price only made sense for bigger fleets, which supports
   the 20 staff minimum.
8. The schedule. Once a month, read new calls, posts and reviews, update the ICP sheet, the points table and the message
   bank. Note the date of each update.
9. Close. "Your customers write your best ICP and your best messages. Listen."

**Do it now.** (10 min) Run the prompt on two transcripts (yours or Routeful's). Check two quotes by hand. Write one new
scoring item or signal that comes from what they said.

#### Quiz 5 (pass 80%)

**Q1.** What does a fit score tell you?
A. If they're ready now B. If they're the right type of company C. If they opened your email D. Their revenue
**Answer.** B. **Why.** Fit is about matching the ICP, intent is about timing. **Rewatch.** 5.1

**Q2.** An account is high fit and low intent. What do you do?
A. Delete it B. Nurture and watch for signals C. Call five times today D. Lower its tier
**Answer.** B. **Why.** Right company, wrong time, so watch for a signal. **Rewatch.** 5.1

**Q3.** For Routeful, which is the stronger signal?
A. The company raised money B. The company opened a second depot C. The CEO liked a random post D. The company has a
website
**Answer.** B. **Why.** A second depot makes planning harder, which points at the problem. **Rewatch.** 5.2

**Q4.** True or false. Intent points should carry a date because signals fade.
**Answer.** True. **Why.** A job post from last week matters more than one from six months ago. **Rewatch.** 5.3

**Q5.** What score does a disqualified account get?
A. Its fit score B. Zero C. Half D. The average
**Answer.** B. **Why.** Disqualified means don't contact, whatever else is true. **Rewatch.** 5.3

**Q6.** Scenario. You test your model and lost deals score higher on average than won deals. What does that mean?
A. The model works B. The weights are probably wrong C. You need more lost deals D. Ignore it
**Answer.** B. **Why.** A working model ranks winners higher. **Rewatch.** 5.3

**Q7.** A Google Alert shows news about a company with a similar name to your account. What do you do?
A. Add the points anyway B. Log it as a false match, no points C. Delete the alert D. Message the company about it
**Answer.** B. **Why.** Every signal is checked before it changes a score. **Rewatch.** 5.4

**Q8.** What is the eavesdrop loop?
A. Recording calls without consent B. Feeding what customers and prospects say back into your ICP, scores and messages
C. Reading competitors' emails D. A LinkedIn feature
**Answer.** B. **Why.** Their words beat your guesses. **Rewatch.** 5.5

**Q9.** You ask Claude for problem quotes from transcripts. What's the next step?
A. Paste them straight into messages B. Check some quotes against the transcript word for word C. Ask Claude to make
them stronger D. Nothing
**Answer.** B. **Why.** AI output is checked against the source before use. **Rewatch.** 5.5

#### Assignment 5. A scoring model and three live signal sources

**Goal.** Build a fit and intent points model on your master list, test it against won and lost deals, and set up three
live signal sources feeding a signals log.
**Time.** About 1.5 hours.
**You need.** Enriched master list. "T1 Scoring model" template in "05 Scoring". Your deals data or the Routeful
pipeline. Google Alerts, LinkedIn, Clay. The eavesdrop notes from Lesson 5.5.

**Steps.**
1. Open "T1 Scoring model". On the "Points" tab, fill the table. Item, type (fit or intent), points, how it's measured,
   source, and for intent the time window (for example "last 30 days").
2. Include at least four fit items and three intent items. At least one item must come from your eavesdrop notes. Write
   which one.
3. On the "Accounts" tab, paste your master list (at least 100 accounts). Build "Fit score", "Intent score" and "Total"
   with formulas. Disqualified rows score 0.
4. Sort by Total, highest first. Read the top 10. Write any that look wrong in a "Doubts" box and why.
5. Test the model. On the "Test" tab, paste won and lost deals (Routeful pipeline, or your own). Score each account with
   the same formulas. Calculate the average total for won and for lost with `=AVERAGEIF()`.
6. If won doesn't beat lost, change one weight at a time and note each change in a "Changes" box with the result.
7. Set up three live signal sources. Google Alerts, a LinkedIn job or people alert, and a Clay signal column (or a second
   alert type if Clay's option isn't on your plan). Screenshot each setup screen.
8. On the "Signals log" tab, log at least 5 real signals that arrived or that you found this week, with date, account,
   type, link, checked (yes or false match), points added.
9. Write three sentences at the top of "Points". Which item drives the ranking most, what the test showed, and what you'll
   watch next.
10. Share with view access and copy the link. Put the three screenshots in the "05 Scoring" folder.

**Hand in.** The view link to "T1 Scoring model" (Points, Accounts, Test, Signals log tabs) and the link to the folder
with the three screenshots.

**Marking rubric.**

| Criterion | 0 | 1 | 2 | Must? |
|---|---|---|---|---|
| Points table with fit and intent items | Missing or only fit | Fewer than 4 fit or 3 intent, or no time windows | 4+ fit, 3+ intent, intent with time windows | Must |
| Scores built with formulas, DQ at zero | Typed by hand | Formulas with errors | Working formulas, DQ rows at 0, sorted | Must |
| Model tested against won and lost | No test | Test done, result not used | Averages compared and weights adjusted with notes | Must |
| Three live signal sources | Fewer than two | Two, or three without proof | Three, each with a screenshot | |
| Signals log with checked signals | Missing | Signals logged without checking | 5+ signals, each checked, false matches marked | |
| One item from the eavesdrop loop | None | Named but no source | Named, with the quote or transcript it came from | |

**Good example.** Points table with "Excel planning, fit, 25" and "Planner job post mentioning Excel, intent, 20, last 30
days". Test tab shows won average 71, lost average 48. One change logged, "Raised trucks 25+ from 15 to 20, won average
went from 66 to 71." Signals log has 7 rows, one marked false match. Eavesdrop item, "mentions sick drivers or last
minute changes in job posts, from transcript W2 and W5".

**Bad example.** Scores typed by hand, no intent items, no test, a screenshot of one Google Alert. It fails because the
model can't update, ignores timing, and nobody knows whether it ranks winners higher.

**Stuck?**
1. *"My date formula shows a strange number."* The date cell is stored as text. Select the column, click **Format**,
   **Number**, **Date**.
2. *"I have no won or lost deals."* Use the Routeful pipeline for the test even if your list is your own market, and say
   so. The habit is what's marked.
3. *"No signals arrived this week."* Search by hand for the same signals (careers pages of your top 20) and log what you
   find. Alerts take time to fill.

---

### Module 6. AI research and writing

**Goal.** Use Claude to research accounts with every claim tied to a source, and check the output so nothing false
reaches a prospect.
**Time.** 47 minutes of video, about 2 hours for the assignment.
**You need.** Claude (free plan works, a paid plan helps with longer research). Your scored list. Clay (optional, for
running a prompt across rows). The Routeful practice pack research snippets if you're on the pack.

#### Lesson 6.1 What AI is good and bad at in research (8 min)

**In plain words.** AI is fast at reading, summarising and spotting patterns in text you give it. It's bad at knowing
what's true right now, and it sometimes makes things up in a confident voice. So you use it to read and draft, and you
check everything it says against the source.

**You'll be able to.**
- Name three research jobs AI does well
- Name three ways AI gets research wrong
- Decide what to give the AI and what to check yourself

**What's shown.**
1. Good at. Reading a long web page and pulling out the parts that matter. Comparing several sources. Drafting a summary
   in a set format.
2. Bad at. Knowing today's facts without a source. Telling two companies with similar names apart. Admitting it doesn't
   know, unless you tell it that "unknown" is an allowed answer.
3. Define **hallucination**. When an AI states something false as if it were true. Raka shows a made up example where
   an AI says a Routeful account "recently expanded to Poland" and there's no source for it anywhere.
4. The fix is in how you ask (Lesson 6.2) and how you check (Lesson 6.4).
5. What you give it. The actual text (website pages, job posts, posts), or a tool that lets it read web pages, with the
   links. What you check. Every claim that would go into a message.
6. Raka's rule from Astra. His own notes, his memory and an AI summary are all candidates, never proof. The source,
   opened again, is the proof.
7. Close. "AI reads fast. You decide what's true."

**Do it now.** (5 min) Ask Claude "What does [one of your accounts] do and how many staff does it have?" with no source.
Then open the company's website and LinkedIn page. Write down what it got right, wrong or made up.

#### Lesson 6.2 Prompts that cite their sources (10 min)

**In plain words.** A good research prompt tells the AI exactly what to read, what to find, how to answer and that it
must name the source for every claim. If a claim has no source, it doesn't go in the answer. This one habit removes most
AI mistakes.

**You'll be able to.**
- Write a research prompt with the five parts
- Make the AI quote and link its sources
- Allow "unknown" as an answer

**What's shown.**
1. The five parts of a research prompt on screen. Role and goal. Inputs (what to read). Questions. Rules. Output format.
2. Raka writes one for Routeful, live.
   "You're researching a transport company for a route planning software seller. Read only the sources below. Answer
   these questions. 1. How many trucks do they run? 2. How do they plan routes today? 3. Are they hiring planners or
   drivers, and what do the posts say? 4. Has anything changed in the last 90 days (new depot, new director, new
   customer, new tool)? Rules. Every answer must quote the exact words from the source and give the link. If the sources
   don't say, write UNKNOWN. Don't guess or use outside knowledge. Output. A table with columns Question, Answer, Quote,
   Link, Date of source."
3. He pastes the RF-031 research snippets from the pack (website fleet page, careers page, a LinkedIn post).
4. Claude answers. Raka points out the quotes and links in the table, and the UNKNOWN on question 4 because no source
   mentions a change.
5. He removes the "every answer must quote" rule and runs it again. The answer now says "they likely use Excel", with no
   quote. That's how mistakes creep in.
6. If your Claude plan can read web pages, give it the links. If not, copy the text from each page and paste it with its
   link above it.
7. Save the prompt in your prompt library (the template in "06 Research"), with the date and what it's for.
8. Close. "No quote, no claim."

**Do it now.** (15 min) Write your own five part research prompt for your market. Run it on one account with at least
three sources. Check that every answer has a quote and a link.

#### Lesson 6.3 Designing a research agent (11 min)

**In plain words.** An AI agent is an AI set up to do a task in several steps, like reading several pages about a company
and writing a summary in a fixed format. You design it once, then run it on many accounts. The design is mostly about
steps, sources and the rules for when to stop and say "unknown".

**You'll be able to.**
- Write the steps of a research agent
- Decide its inputs and outputs
- Run it across rows in Clay or account by account in Claude

**What's shown.**
1. Define **agent**. An AI set up to do a task in several steps.
2. The agent design on one page. Inputs (company name, domain, LinkedIn URL). Steps (read homepage, read about page, read
   careers page, read last 5 LinkedIn posts, check news for the last 90 days). Questions (from Lesson 6.2). Output (the
   table, plus a one line "best angle" and a confidence of high, medium or low).
3. Raka explains **confidence**. High means two sources agree. Medium means one good source. Low means only indirect
   hints.
4. The stop rules. If the domain shows a different company, stop and write WRONG COMPANY. If a page doesn't load, write
   NOT LOADED, never "doesn't exist". He explains that a page failing to load is a fact about our tool, not about their
   website.
5. Screen demo in Claude. He puts the design into one prompt and runs it on RF-031 and RF-044. Both come back as tables.
6. Screen demo in Clay. Click **+ Add column**, choose the AI option (Clay's AI or a Claude integration, the name can
   differ). Paste the prompt. Insert column references for domain and company name where the prompt needs them (Clay
   lets you type `/` or click to insert a column). Run on 3 rows.
7. He shows that Clay's AI can browse the web on some setups, and that the same checking rules apply.
8. Cost note. AI columns in Clay use credits. Run on tier 1 and 2 first.
9. Close. "Design it once, check every run."

**Do it now.** (15 min) Write your agent design on one page (inputs, steps, questions, stop rules, output). Run it on two
accounts in Claude or Clay.

#### Lesson 6.4 Checking AI output, and the falsification pass (10 min)

**In plain words.** Checking means opening the source again and confirming each claim. The falsification pass goes
further. You actively try to prove your claim wrong before you use it. If you can't prove it wrong, it's safe to send.
At Astra this step caught wrong claims before they reached people.

**You'll be able to.**
- Check every claim against its source
- Run a falsification pass on a claim
- Mark a claim as passed, failed or unknown

**What's shown.**
1. Define **checking**. Opening the source the claim came from and reading the exact words again.
2. Define **falsification pass**. Trying to prove a claim false before you use it. You look for the page or fact that
   would disprove it.
3. The Astra story, in general terms. Astra runs a research gate before every message, and a falsification pass on every
   claim. Raka describes the kinds of mistakes it caught, a claim that a company had "no privacy page" when it did under a
   different link, a page called "empty" because the tool failed to load it, a person listed as owner who had sold the
   company. All caught by looking for the proof against.
4. The three questions on screen. Where did this come from (open it again)? What would prove it wrong (go and look)? Can I
   confirm it a second way that doesn't share the same weakness (a different source or tool)?
5. Screen demo. Claim from the RF-044 research, "they plan in Excel". Source, a job post asking for "Excel". Falsify,
   search the company's site and posts for a planning tool name. Raka finds a LinkedIn post in the pack saying they moved
   to a new TMS last month. Claim fails. RF-044 is now disqualified under the "new TMS in last 12 months" rule.
6. Absence claims are the riskiest. "They don't have X" is the likeliest sentence to be false. Before using one, check at
   least two pages, search the site for the thing, and show your search method works by finding the same thing on a site
   that has it.
7. Raka adds three columns to the research output. Checked (yes or no), Falsification (what you looked for), Result
   (passed, failed, unknown).
8. A claim that's unknown doesn't go in a message. A shorter true message beats a longer one with a soft claim.
9. Close. "Try to prove yourself wrong. If you can't, send it."

**Do it now.** (10 min) Take two claims from your research in Lesson 6.3. For each, write the falsification search you'd
run, run it, and mark the result.

#### Lesson 6.5 Writing with AI without sounding like AI (8 min)

**In plain words.** AI can draft messages quickly, and it has habits that make readers switch off. Long words, lists of
three, empty praise and dashes everywhere. You give it a tight brief, then edit until it sounds like a person who
actually looked at the company.

**You'll be able to.**
- Write a drafting prompt with rules
- Spot the usual AI giveaways
- Edit a draft into plain, specific words

**What's shown.**
1. The drafting prompt. Raka gives Claude the checked research table only (passed claims) and the six part structure
   from Module 7, plus rules. Under 90 words. Use contractions. No dashes. No praise like "impressive" or "amazing". One
   problem only. Only use facts from the table.
2. The draft comes back. Raka highlights the giveaways. "I hope this finds you well", "streamline", a list of three
   benefits, "game changer".
3. He edits live. Cuts the greeting filler, replaces "streamline your operations" with "rebuild the week's plan by hand
   every Monday", which is what the customer said in the transcript.
4. The test. Would this sentence fit 10,000 other companies? If yes, cut it or make it specific.
5. Read it out loud. If you wouldn't say it to someone's face, rewrite it.
6. Close. "AI drafts. You make it true and make it sound like you."

**Do it now.** (10 min) Ask Claude to draft one opener from one of your checked research tables with the rules from step
1. Edit it. Keep both versions side by side.

#### Quiz 6 (pass 80%)

**Q1.** What is a hallucination?
A. A slow answer B. An AI stating something false as if it were true C. A long prompt D. A web page that won't load
**Answer.** B. **Why.** AI can sound confident and be wrong. **Rewatch.** 6.1

**Q2.** Which rule removes most AI research mistakes?
A. Ask it to be accurate B. Every claim must quote the source and give a link, otherwise UNKNOWN C. Use a longer prompt
D. Ask twice
**Answer.** B. **Why.** No quote, no claim. **Rewatch.** 6.2

**Q3.** True or false. If a page doesn't load in your tool, you can say the company doesn't have that page.
**Answer.** False. **Why.** A failed load is about your tool, write NOT LOADED and check another way. **Rewatch.** 6.3

**Q4.** What is a falsification pass?
A. Deleting false rows B. Trying to prove a claim wrong before you use it C. Asking the AI if it's sure D. Sending a
test email
**Answer.** B. **Why.** You look for the proof against, not the proof for. **Rewatch.** 6.4

**Q5.** Scenario. Research says "they plan in Excel" from a job post. A LinkedIn post last month says they moved to a new
TMS. What do you do with the claim?
A. Use it, the job post says Excel B. Mark it failed, and check the account against your disqualifiers C. Mention both in
the message D. Ask Claude again
**Answer.** B. **Why.** The claim was proven wrong, and a new TMS is a Routeful disqualifier. **Rewatch.** 6.4

**Q6.** Which sentence is most likely to be false?
A. "You're hiring two planners" with a link B. "Your site doesn't have a pricing page" C. "You run 40 trucks" quoted from
the fleet page D. "Your office is in Utrecht" from the register
**Answer.** B. **Why.** Absence claims are the riskiest, the page may exist under another link. **Rewatch.** 6.4

**Q7.** What does "confidence high" mean in the agent design?
A. The AI feels sure B. Two sources agree C. The company is tier 1 D. The page loaded quickly
**Answer.** B. **Why.** Confidence comes from sources, not from how the AI sounds. **Rewatch.** 6.3

**Q8.** True or false. A claim marked unknown can go in the message if you phrase it softly.
**Answer.** False. **Why.** Delete it. A shorter true message beats one with a soft claim. **Rewatch.** 6.4

**Q9.** An AI draft says "streamline your operations". What's the better edit?
A. Keep it B. Replace it with the specific problem in the customer's words C. Add "and boost efficiency" D. Make it bold
**Answer.** B. **Why.** Specific words beat phrases that fit any company. **Rewatch.** 6.5

**Q10.** Which should you research first with paid AI columns in Clay?
A. Tier 3 B. Tier 1 and 2 C. Disqualified accounts D. Random rows
**Answer.** B. **Why.** Spend credits where the fit is best. **Rewatch.** 6.3

#### Assignment 6. A research agent prompt and ten checked accounts

**Goal.** Write a research agent prompt that cites its sources, run it on your ten highest scoring accounts, and check
every claim with a falsification pass.
**Time.** About 2 hours.
**You need.** Claude (and Clay if you want to run it across rows). Your scoring model (top 10 accounts). "T1 Research
log" template in "06 Research". Your prompt library.

**Steps.**
1. Open "T1 Research log". Tab "Agent" holds your design. Tab "Claims" holds every claim.
2. On "Agent", write your design. Inputs, steps (which pages and in what order), questions (at least four, linked to
   your ICP and problem), rules (quote and link every answer, UNKNOWN allowed, WRONG COMPANY and NOT LOADED stop rules),
   output format, confidence rules.
3. Paste the full prompt text under the design. Date it.
4. Take your top 10 accounts by total score. For each one, open the domain first and confirm it's the right company
   (name, country, what they do). If it isn't, write WRONG COMPANY and take the next account.
5. Run the agent on each of the 10, in Claude or in Clay.
6. On "Claims", paste every claim the agent made. One row per claim. Columns Account, Claim, Quote, Link, Date of
   source, Confidence.
7. Check each claim. Open the link, find the quote. Mark Checked yes or no.
8. Falsify each claim you'd use in a message. Write what you searched for to disprove it and where, then mark Result
   passed, failed or unknown.
9. For any absence claim, show the second page you checked and the site you used as a positive test (one that does have
   the thing, so you know your search works).
10. Count at the top. Total claims, passed, failed, unknown, and how many claims the AI made without a source.
11. For each of the 10 accounts, write a one line "best angle" using only passed claims, or "no angle yet".
12. Share with view access and copy the link.

**Hand in.** The view link to "T1 Research log" with the agent design, the prompt, at least 30 claims across 10 accounts,
and the counts.

**Marking rubric.**

| Criterion | 0 | 1 | 2 | Must? |
|---|---|---|---|---|
| Agent design complete | Missing parts | Steps and questions only | Inputs, steps, questions, rules, stop rules, output, confidence | |
| Prompt forces sources and allows UNKNOWN | No source rule | Asks for sources, no UNKNOWN | Quote plus link required, UNKNOWN allowed, outside knowledge banned | Must |
| Right company confirmed for each account | Not checked | Checked for some | Checked for all 10, wrong ones replaced | Must |
| Every claim checked against its source | Under half checked | Most checked | All checked | Must |
| Falsification pass on message claims | None | Done, but searches not written | Each search written, results marked, absence claims with a second page and a positive test | Must |
| Best angle uses passed claims only | Missing | Uses an unchecked claim | Every angle traces to passed claims, or "no angle yet" | |

**Good example.** 38 claims across 10 accounts. 29 passed, 4 failed, 5 unknown, 2 made without a source by the AI (both
removed). RF-044 claim "plans in Excel" failed after finding a post about a new TMS, so RF-044 was disqualified. RF-031
best angle, "Hiring two planners with 'advanced Excel' in the post (careers page, 2 Dec), second depot opening in March
(LinkedIn post, 20 Nov)". Account 7 replaced after its domain showed a removals company with the same name.

**Bad example.** A Claude chat pasted into a doc with ten company summaries, no links, no checking, angles like "they
could benefit from optimisation". It fails because nothing is sourced or checked, and the angles fit every company.

**Stuck?**
1. *"Claude keeps adding things that aren't in my sources."* Add "Use only the text between the lines below. If it isn't
   there, write UNKNOWN" and put clear lines above and below your pasted sources.
2. *"I can't find anything to disprove a claim."* Good, that's a pass. Write what you searched for so the reviewer sees
   the effort.
3. *"Most of my accounts have no angle."* That's useful information. Check whether your score weights behaviour enough,
   and say so in the log. Never invent an angle.

---

### Module 7. The message

**Goal.** Write a short sequence built around one problem, true in every line, with follow ups that add something and an
A/B test plan you can trust.
**Time.** 45 minutes of video, about 1.5 hours for the assignment.
**You need.** Your research log with passed claims and best angles. Your eavesdrop notes. "T1 Sequence" template in "07
Messages". Claude for drafting.

#### Lesson 7.1 One problem, start to finish (10 min)

**In plain words.** A good first message talks about one problem the reader really has, from start to finish. It shows
you looked, names the problem, says what it costs, says why now, gives one line of proof, and ends with a small, easy
question. Six parts, usually under 100 words.

**You'll be able to.**
- Name the six parts of an opener
- Write each part from your research
- Check that every part is about the same problem

**What's shown.**
1. Define **opener**. The first message to someone.
2. The six parts on screen.
   - Part 1. Greeting and a specific observation about their company (something you checked).
   - Part 2. The problem you noticed.
   - Part 3. What it costs them (time, money, customers).
   - Part 4. Why it matters now (their current goal or a recent change).
   - Part 5. One line of proof (something you've done, true and checkable).
   - Part 6. A low effort question. Offer to show something. Avoid "can we book a call".
3. Raka builds a Routeful opener from the RF-031 research, part by part, and shows each part's source.
   "Hi Sanne, I saw Kanaalweg Transport is hiring two planners and the post asks for advanced Excel. When the week's plan
   lives in a spreadsheet, one sick driver on Monday means rebuilding it by hand. That's a planner's morning gone and late
   drops for your customers. With the second depot opening in March, that gets harder. A fleet of a similar size cut
   Monday replanning to under an hour with Routeful. Want me to send a two minute video of that Monday in Routeful?"
   He says the proof line comes from the practice pack's won call W3, and that in real life the proof must be your own
   and checkable.
4. The one thread test. Read part 2, part 3, part 4 and part 6. Are they the same problem? If part 6 offers something
   unrelated to part 2, the message breaks.
5. Length. Raka counts the words. Under 100 for LinkedIn and email openers.
6. The honesty rules from README section 10. No fake "Re:" subjects, no invented personal connections, no claims you
   can't back up.
7. Close. "One problem. Six parts. Every word true."

**Do it now.** (15 min) Write one opener for your top account using the six parts. Under each part, write the source.
Run the one thread test.

#### Lesson 7.2 Personalisation that's real (8 min)

**In plain words.** Personalisation means making a message specific to that person or company. Real personalisation uses
a fact you checked that connects to the problem. Fake personalisation drops in a first name, a city or a compliment that
says nothing. Readers can tell the difference in one line.

**You'll be able to.**
- Tell real from fake personalisation
- Pick the one fact that connects to the problem
- Decide what can be automated and what can't

**What's shown.**
1. Define **personalisation**. Making a message specific to that person or company.
2. Fake examples on screen. "Hi {first name}, I love what {company} is doing in {city}!" "Saw your great post!" "Fellow
   logistics fan here."
3. Real examples. "Your careers page asks planners for advanced Excel." "Your post on 20 Nov mentions the second depot."
4. The test. Does the personal fact lead straight into the problem? If you could delete it and the message still works,
   it's decoration.
5. Levels. Tier 1 gets a fully researched opener. Tier 2 gets a researched first line and a shared middle. Tier 3 gets a
   segment message (written for a group with the same problem) with no fake personal line.
6. What not to automate. The decision that a claim is true, and the first line of tier 1 messages. What can be automated.
   Pulling the facts, drafting, filling the shared parts.
7. Close. "One true fact that leads to the problem beats five decorations."

**Do it now.** (10 min) Write three first lines for three different accounts. For each, write the fact, its source, and
how it leads into the problem.

#### Lesson 7.3 Follow ups that add something (8 min)

**In plain words.** A sequence is a planned series of messages over days or weeks. Most replies come after the first
message, so follow ups matter. A good follow up adds something new about the same problem. "Just bumping this" adds
nothing.

**You'll be able to.**
- Plan a three step sequence with timing
- Write follow ups that add value on the same problem
- Know when to stop

**What's shown.**
1. Define **sequence** (also called a cadence). A planned series of messages over days or weeks, across email, LinkedIn
   and calls.
2. A three step plan on screen. Step 1, the opener (day 1). Step 2, a follow up that gives something useful (day 4 or 5),
   like a short example, a picture of the problem, or a question about how they handle it now. Step 3, a short close
   (day 10 to 14) that says you'll leave it there and offers the thing once more.
3. Raka writes step 2 for Kanaalweg Transport. "Sanne, a quick picture of what I meant. This is a Monday plan rebuilt after
   two drivers call in sick, before and after. Happy to send the two minute version if it's useful."
4. Step 3. "I'll leave it here. If Monday planning gets heavier when the second depot opens, the video's yours, just
   reply 'send'."
5. Keep the same thread. Each follow up stays on the same problem. A new problem in step 2 confuses the reader.
6. When to stop. After step 3, stop. If they reply no, stop at once and mark do not contact if they ask. A promise in
   writing ("this is my last message") is a promise.
7. Close. "Every follow up earns its place by adding something."

**Do it now.** (10 min) Write steps 2 and 3 for the opener you wrote in Lesson 7.1. Check each one stays on the same
problem.

#### Lesson 7.4 A/B testing honestly (9 min)

**In plain words.** An A/B test sends two versions to two similar groups to see which works better. Done badly, it tells
you a story that isn't true. Test one thing at a time, decide the size before you start, and don't call a winner on a
handful of replies.

**You'll be able to.**
- Write an A/B test plan with one variable
- Pick the measure and the group size before sending
- Avoid the three common ways to fool yourself

**What's shown.**
1. Define **A/B test**. Sending two versions to two similar groups to see which works better.
2. Define **reply rate**. Replies divided by people messaged. **Positive reply rate** is replies that show interest,
   divided by people messaged. Positive reply rate is the one to judge by.
3. One variable. Change only the first line, or only the question at the end. If you change two things, you can't tell
   which one worked.
4. Similar groups. Split randomly within the same tier and segment. Raka adds a column with `=RAND()`, sorts by it, and
   gives the top half A and the bottom half B.
5. Size before you start. Write down how many people each version goes to and the date you'll decide. Small groups give
   noisy results. If each version only gets 20 people, treat any difference as a hint, not a result.
6. Three ways to fool yourself on screen. Stopping as soon as one looks ahead. Changing the list while the test runs.
   Counting all replies, including "no thanks" and "unsubscribe", as success.
7. The honest Astra example. Astra's yes rate went from 4% in September to 15% in October. Raka points out that in October
   several things changed over those weeks, from the lists to the openers to the research. So they know October went
   better, and they can't say which change did it. That's fine to say out loud.
8. The plan template on screen. Hypothesis, variable, version A, version B, groups, size, measure, decision date,
   decision rule.
9. Close. "One change, groups set before you start, decide on the date you wrote down."

**Do it now.** (10 min) Write one A/B hypothesis for your sequence. Name the single variable, the two versions and the
measure.

#### Lesson 7.5 What Astra's 330 messages taught (8 min)

**In plain words.** Between 14 July and 25 October 2026, Astra sent 330 researched cold first messages. This lesson goes
through what changed the results, using only the numbers Astra actually measured.

**You'll be able to.**
- Say what moved Astra's results and what didn't
- Apply the lessons to your own sequence
- Build a weekly scorecard from day one

**What's shown.**
1. The numbers on screen. 330 researched first messages. 26 said yes, 7.9%. In October, 119 first pitches, 30% replied,
   15% said yes, against 4% saying yes in September. 7 meetings booked by 25 October. No paid project has closed yet, so
   Raka says plainly these are reply and meeting numbers.
2. Lesson 1. Who you target beats how clever the message is. Consumer businesses said yes and couldn't pay. B2B companies
   with a budget were the ones worth meeting.
3. Lesson 2. How the message opens. The messages that got yeses opened on a specific, checked observation and one problem.
4. Lesson 3. The research gate and the falsification pass. Messages only went out when every claim had passed, and the
   pass caught wrong claims before they were sent.
5. Lesson 4. Per thread checks before every send. Before any message, the whole conversation with that person was opened
   again, so nobody got pitched twice or got a cold opener on top of a reply.
6. Lesson 5. Measure every week. Raka shows Astra's weekly scorecard. Invites or messages sent, accepts, first messages
   sent within 2 days of accepting, positive replies, meetings booked, meetings held with the decision maker, proposals
   sent, wins and their value.
7. Define **scorecard**. A short list of the few numbers you check every week.
8. Close. "Right people, one true problem, checked before sending, measured every week."

**Do it now.** (10 min) Copy the weekly scorecard template into "07 Messages". Fill in the row names. You'll start filling
numbers when you send in Module 8.

#### Quiz 7 (pass 80%)

**Q1.** What are the six parts of an opener, in order?
A. Greeting, pitch, price, demo, proof, call B. Observation, problem, cost, why now, proof, low effort question
C. Compliment, features, benefits, proof, link, meeting D. Problem, price, proof, call, follow up, close
**Answer.** B. **Why.** One problem carried through all six parts. **Rewatch.** 7.1

**Q2.** True or false. "Re:" in a cold email subject is a fine trick to get opens.
**Answer.** False. **Why.** Fake "Re:" subjects are dishonest and banned in this course. **Rewatch.** 7.1

**Q3.** Which is real personalisation?
A. "I love what you're doing in Utrecht!" B. "Your careers page asks planners for advanced Excel." C. "Hi {first name}!"
D. "Fellow logistics fan here."
**Answer.** B. **Why.** It's a checked fact that leads straight into the problem. **Rewatch.** 7.2

**Q4.** Scenario. Your opener is about Monday replanning. Your follow up is about invoicing software. What's wrong?
A. Nothing B. It breaks the one thread, the follow up should add to the same problem C. It's too short D. It should be
sent sooner
**Answer.** B. **Why.** Every step stays on the same problem. **Rewatch.** 7.3

**Q5.** You told someone "this is my last message". What do you do next?
A. Wait a month and message again B. Stop, it's a promise C. Message from a colleague's account D. Send a LinkedIn
message instead
**Answer.** B. **Why.** A promise in writing is a promise. **Rewatch.** 7.3

**Q6.** Your A/B test changes both the first line and the closing question. What's the problem?
A. None B. You can't tell which change made the difference C. It's too long D. A/B tests need three versions
**Answer.** B. **Why.** Test one variable at a time. **Rewatch.** 7.4

**Q7.** Which measure should decide an outbound A/B test?
A. Opens B. All replies C. Positive reply rate D. Words per message
**Answer.** C. **Why.** "No thanks" isn't success, interest is. **Rewatch.** 7.4

**Q8.** True or false. Astra can say exactly which single change raised its October yes rate.
**Answer.** False. **Why.** Several things changed at once, so they can't separate them. **Rewatch.** 7.4

**Q9.** What did Astra learn about consumer businesses?
A. They never reply B. They said yes and couldn't pay C. They're the best fit D. They want long messages
**Answer.** B. **Why.** B2B with a budget were worth meeting, consumer businesses couldn't pay. **Rewatch.** 7.5

**Q10.** Which is on Astra's weekly scorecard?
A. Website visitors B. First messages sent within 2 days of accepting C. Social media followers D. Email opens
**Answer.** B. **Why.** Speed after acceptance is one of the scorecard rows. **Rewatch.** 7.5

#### Assignment 7. A three step sequence and its A/B plan

**Goal.** Write a three step sequence for one segment, with a researched version for one tier 1 account, every claim
sourced, and an A/B plan for when it goes live in Module 8.
**Time.** About 1.5 hours.
**You need.** "T1 Sequence" template in "07 Messages". Your research log (passed claims only). Your eavesdrop notes.
Claude for a first draft (optional).

**Steps.**
1. Open "T1 Sequence". Tab "Segment" is the shared sequence. Tab "Tier 1 example" is one fully researched version. Tab
   "A/B plan" is the test.
2. On "Segment", write the segment in one line (for example "Tier 2 Dutch transport firms, 50 to 200 staff, planning in
   Excel"). Write the problem in the customer's words, with its source from your eavesdrop notes.
3. Write step 1 (the opener) in the six parts. Use a placeholder for the observation line, like {observation}, and write
   three real example observations under it with sources.
4. Write step 2 (day 4 or 5) that adds something on the same problem.
5. Write step 3 (day 10 to 14), a short close that offers the thing once more and says you'll leave it there.
6. Mark the channel for each step (LinkedIn message or email). If any contacts are in Germany, mark email as "check rules,
   LinkedIn first".
7. On "Tier 1 example", write all three steps for your top account from Assignment 6. Under every sentence, write the
   passed claim and link it came from.
8. Run the checks on both tabs. One thread test (parts 2, 3, 4 and 6 about the same problem). Word count under 100 for
   step 1. No dashes, no "Re:", no invented connection, no claim without a source. The 10,000 companies test on every
   sentence.
9. On "A/B plan", fill hypothesis, the one variable, version A and B text, how you'll split (random within the segment),
   size per version, measure (positive reply rate), decision date, decision rule.
10. Add the weekly scorecard rows from Lesson 7.5 under the plan.
11. Share with view access and copy the link.

**Hand in.** The view link to "T1 Sequence" with the three tabs filled.

**Marking rubric.**

| Criterion | 0 | 1 | 2 | Must? |
|---|---|---|---|---|
| Opener has all six parts on one problem | Missing parts or several problems | Six parts, one thread wobbles | Six parts, one problem start to finish, ends on a low effort question | Must |
| Every claim sourced and passed | Claims without sources | Most sourced | Every claim on the tier 1 tab traces to a passed claim | Must |
| Follow ups add something on the same problem | "Just bumping" or new topic | Adds a little, or drifts | Each step adds something new on the same problem, step 3 closes cleanly | |
| Honest and plain | Fake "Re:", fake connection or hype | Generic lines that fit any company | Specific, contractions, no dashes, under 100 words for the opener | Must |
| A/B plan is honest | Missing | Two variables, or no size or date | One variable, random split, size, positive reply rate, decision date and rule | |
| Channel and country rules marked | Missing | Channels marked, no country note | Channels marked, German contacts handled per Module 2 | |

**Good example.** Opener for Kanaalweg Transport in six parts, 84 words, each line with a source under it (careers page
2 Dec, LinkedIn post 20 Nov, transcript W3). Step 2 offers the before and after picture. Step 3 says "I'll leave it here"
and offers the video once more. A/B plan tests the opening line only, "hiring planners with Excel" against "second depot
opening", 40 contacts each from tier 2 split with `=RAND()`, measure positive reply rate, decision on a set date after
the last step 3 goes out, rule "pick the higher one, and treat a gap of one or two replies as a tie".

**Bad example.** "Hi {first name}, hope you're well! We help logistics companies streamline operations and boost
efficiency with AI. Can we book a 30 minute call?" Step 2 "Just bumping this up." A/B plan "try two versions and see".
It fails because there's no observation, no problem, no cost, no proof, a big ask, a follow up that adds nothing, and a
test that will tell you nothing.

**Stuck?**
1. *"My message is 160 words."* Cut part 5 to one line and part 4 to one clause. Delete anything that explains Routeful
   in general.
2. *"I have no proof line."* Use the most honest thing you have, like a relevant result from your own work, or leave
   part 5 out. Never invent a customer or a number.
3. *"My question at the end is 'can we book a call'."* Swap it for an offer to show the thing the message is about, like a
   short video, a picture or a one page example.

---

## Track 1 practical test (midpoint, after Module 7)

**What it is.** A timed, hands on test of everything in Modules 1 to 7. You get 20 practice pack accounts with gaps, and
in 60 minutes you tier them, fill gaps with a small waterfall, score them, research the top 3 and write an opener for the
best one. It works like a real take home interview task, on purpose.

**When.** After you've passed Quiz 7 and handed in Assignment 7. Self learn, in week 6. 1:1, briefed in S6 and taken
alone at least 48 hours before S7, then gone through in S7.

**Pass.** At least 70% of the rubric points (9 of 12) and no 0 on a criterion marked **must**. If you don't pass, read
the feedback, wait at least 48 hours, and take the second version of the test (same shape, different accounts). Self
learn learners can retake as often as they like. 1:1 learners get two reviewed retakes.

### Before you start

1. Open the course platform, Track 1, "Practical test". Click **Make a copy** on the "Practical test pack" sheet. It
   lands in your Drive. Move it to your "Practical test" folder.
2. Don't open the copy's tabs yet beyond the "Start here" tab. Read the brief below in full first. Reading time doesn't
   count.
3. Have Claude open in another tab. Have your own ICP sheet, scoring model and sequence template open for reference. Notes
   and earlier assignments are allowed. Help from another person isn't.
4. You don't need Clay credits. The waterfall runs in Sheets on the provider tabs we give you. If you prefer to rebuild
   the logic in Clay, you can, but it doesn't earn extra points.
5. When you're ready, write the start time in cell B2 of "Start here". Write the end time in B3 when you stop. You have 60
   minutes. Work handed in after 70 minutes scores 0 on the "time and handover" criterion.

### The pack (what's in your copy)

| Tab | What's in it |
|---|---|
| Start here | The brief, start and end time cells |
| Accounts | 20 Routeful practice accounts (made up, domains end in `.example`), with gaps marked `?` |
| Provider A, Provider B, Provider C | Three made up data providers. Each has lookup results for some accounts (staff, trucks, planning tool, head of planning's work email and its verification result). Each lookup costs test credits. A costs 1, B costs 2, C costs 4 |
| Research snippets | For each account, 2 to 4 dated text snippets with a source label (website, careers page, LinkedIn post, news). Treat these as the pages you'd open |
| ICP and points | Routeful's ICP, disqualifiers and points table for this test (below) |
| Answers | Empty tabs for your work, already laid out |

**Treat today as 1 December 2026** for every "last 30 days" or "last 12 months" rule.

### The 20 accounts (as given, gaps marked ?)

| ID | Company | Domain | Country | Staff | Trucks | Planning tool | Status |
|---|---|---|---|---|---|---|---|
| RF-101 | Lingedal Transport | lingedal-transport.example | NL | 140 | 42 | Excel | Prospect |
| RF-102 | Brabo Vracht | brabo-vracht.example | BE | 65 | ? | ? | Prospect |
| RF-103 | Polderline Logistics | polderline.example | NL | 18 | 9 | Excel | Prospect |
| RF-104 | Rheinkiesel Spedition | rheinkiesel.example | DE | 230 | 70 | Old TMS | Prospect |
| RF-105 | Duinroute Transport | duinroute.example | NL | ? | 30 | Excel | Prospect |
| RF-106 | Maasbocht Haulage | maasbocht.example | NL | 95 | 28 | ? | Customer |
| RF-107 | Schelde Freight Brokers | scheldebrokers.example | BE | 40 | 0 | None | Prospect |
| RF-108 | Veluwe Koeltransport | veluwe-koel.example | NL | 310 | ? | Excel | Prospect |
| RF-109 | Lingedal Transport B.V. | www.lingedal-transport.example/ | Netherlands | 140 | ? | ? | Prospect |
| RF-110 | Eifel Logistik | eifel-logistik.example | DE | 55 | 17 | ? | Prospect |
| RF-111 | Kempen Cargo | kempen-cargo.example | BE | 120 | 35 | Old TMS | Prospect |
| RF-112 | Lauwers Transport | lauwers.example | NL | 28 | 15 | Excel | Prospect |
| RF-113 | Westhoek Distributie | westhoek.example | BE | ? | ? | ? | Prospect |
| RF-114 | Sauerland Fracht | sauerland-fracht.example | DE | 480 | 120 | Modern planning platform | Prospect |
| RF-115 | IJssel Express | ijssel-express.example | NL | 75 | 22 | Excel | Prospect |
| RF-116 | Hageland Trucking | hageland.example | BE | 610 | 150 | Old TMS | Prospect |
| RF-117 | Twente Bulk | twente-bulk.example | NL | 160 | 48 | Excel | Prospect |
| RF-118 | Mosel Kühllogistik | mosel-kuehl.example | DE | 85 | 26 | Excel | Prospect |
| RF-119 | Zeeland Tank | zeeland-tank.example | NL | 210 | 55 | Old TMS | Prospect |
| RF-120 | Liège Transports Rapides | liege-rapides.example | FR | 90 | 30 | Excel | Prospect |

### ICP, disqualifiers and points for this test

**ICP.** Transport and logistics companies in NL, BE or DE, 20 to 500 staff, own fleet of 15 or more trucks, planning in
Excel or an old TMS.

**Disqualifiers.** Staff under 20 or over 500. No own fleet (fewer than 15 trucks, or a broker). Already a customer.
Installed a new TMS or planning platform in the last 12 months. Outside NL, BE and DE. Duplicate of another row (keep
one).

**Tiers.** Tier 1 means 50 to 500 staff and 25+ trucks and Excel or old TMS. Tier 2 means it passes the ICP and one of
those three is missing or unknown. Tier 3 means it passes the ICP on firmographics only.

**Points.**

| Item | Type | Points |
|---|---|---|
| Staff 50 to 500 | Fit | 20 |
| Staff 20 to 49 | Fit | 10 |
| Trucks 25+ | Fit | 20 |
| Trucks 15 to 24 | Fit | 10 |
| Plans in Excel | Fit | 25 |
| Plans in an old TMS | Fit | 15 |
| Planner job post in the last 30 days | Intent | 20 |
| New operations director in the last 90 days | Intent | 15 |
| New depot or site announced in the last 90 days | Intent | 15 |
| Disqualified | | Total is 0 |

### The brief (what you do, in order)

Suggested timing is in brackets. You can move time between tasks.

**Task 1. Clean and tier (10 min).**
1. On "Answers 1 Tiers", add a "Disqualified" column and a "Reason" column. Mark every disqualified account with the
   rule it breaks.
2. Find duplicates by domain. Clean the domain first (remove `www.`, `https://` and a trailing `/`). Keep the more
   complete row.
3. Add a "Tier" column with 1, 2, 3 or DQ, using the tier rules. You may type tiers, but a formula is better and you'll
   need it in Task 3.

**Task 2. A small waterfall (15 min).**
1. On "Answers 2 Waterfall", for every account that isn't disqualified and has a gap (staff, trucks or planning tool) or
   needs the head of planning's email, look the gap up in Provider A first, then B only if A is empty, then C only if B
   is empty.
2. Build it with formulas, for example `=IF(A2<>"", A2, IF(B2<>"", B2, IF(C2<>"", C2, "Not found")))`, where A2, B2 and
   C2 are the lookups from each provider tab (use `=XLOOKUP()` on the account ID).
3. Add a "Found by" column and a "Credits used" column. A lookup counts only if that provider was actually needed (A
   always costs 1 for a looked up row, B costs 2 only if A was empty, C costs 4 only if A and B were empty).
4. For emails, copy the verification result. Mark "Send OK" only for valid. Catch all and invalid are not OK.
5. At the top, write total credits used, cost per row looked up, and cost per valid email.
6. Update the tiers on "Answers 1 Tiers" with what you found.

**Task 3. Score (10 min).**
1. On "Answers 3 Score", build Fit, Intent and Total with formulas using the points table.
2. Intent comes from the "Research snippets" tab. Only count a signal if its date falls in the window and it's about
   this company. Log each signal you count in the "Signals used" column with the snippet ID.
3. Sort by Total, highest first. Write your top 3.

**Task 4. Research the top 3 (15 min).**
1. On "Answers 4 Research", for each of your top 3, list the claims you'd use, with the snippet ID and the exact quote.
2. Run a falsification pass on each claim. Look through all snippets for that account for anything that contradicts it.
   Write what you looked for and the result (passed, failed, unknown).
3. If a claim fails in a way that changes the tier or disqualifies the account, go back and fix Tasks 1 and 3. Then
   your top 3 may change. Write a note saying what changed and why.
4. Write a one line "best angle" for each of the final top 3, using passed claims only.

**Task 5. One opener (10 min).**
1. On "Answers 5 Opener", pick the best account and its persona (operations director, head of planning, or managing
   director). Say why in one sentence.
2. Choose the channel. If the account is in Germany, the course rule applies (email is risky without consent, so LinkedIn
   first). Write the channel.
3. Write the opener in the six parts, under 100 words. Under each part, write the snippet ID it comes from. For part 5
   (proof), use the Routeful proof line given on the "ICP and points" tab, or leave it out. Don't invent one.
4. Run the one thread test and write "one thread, yes" or fix it.

**Before you stop.** Write the end time in B3. Click **Share**, **Anyone with the link**, **Viewer**, **Copy link**.

### Hand in

1. The view link to your completed copy of "Practical test pack", with start and end time filled.
2. Nothing else. Don't tidy after the end time. The version history shows when cells were edited, and markers check it.

### Marking rubric

| Criterion | 0 | 1 | 2 | Must? |
|---|---|---|---|---|
| 1. Clean and tier | Fewer than 4 of the 6 Task 1 disqualified rows caught, or tiers missing | 4 or 5 caught, or tiers with errors | All 6 caught with the right reason (including the duplicate), tiers correct for the data | Must |
| 2. Waterfall logic and cost | No order, or every provider called for every row | Right order, but credits or cost per valid email wrong | A then B then C with formulas, credits counted only when needed, cost per row and per valid email correct, only valid emails marked Send OK | Must |
| 3. Scoring applied | No score or typed totals | Formulas with errors, or signals counted outside their window | Formulas match the points table, DQ at 0, only in window signals about the right company counted, signals logged by snippet ID | |
| 4. Research with sources and a falsification pass | Claims without quotes or snippet IDs | Quotes given, falsification missing or not written down | Every claim quoted with snippet ID, falsification written for each, the contradicted claim caught and the account moved, top 3 updated with a note | Must |
| 5. The opener | Generic, invented facts, or several problems | Six parts but drifts, or over 100 words, or a weak claim | Six parts, one problem, under 100 words, every part traced to a passed snippet, honest proof or none, right channel for the country | Must |
| 6. Time and handover | Handed in after 70 minutes, or tabs missing | Within 70 minutes but over 60, or some tabs incomplete | Within 60 minutes, all five answer tabs filled, link shared correctly | |

### Marker's key (hidden from learners until they submit)

The test pack has these planted on purpose. The marker checks each one.

| Planted item | Where | What a passing learner does |
|---|---|---|
| Too small | RF-103, 18 staff, 9 trucks | DQ, under 20 staff and under 15 trucks |
| Existing customer | RF-106, status Customer | DQ, already a customer |
| Broker with no fleet | RF-107, 0 trucks | DQ, no own fleet |
| Duplicate | RF-109 is RF-101 with a messy domain and "Netherlands" spelled out | DQ RF-109 as a duplicate after cleaning the domain, keep RF-101 |
| Too big | RF-116, 610 staff | DQ, over 500 |
| Outside the countries | RF-120, FR | DQ, outside NL, BE and DE |
| Modern tool | RF-114, modern planning platform | Not tier 1. DQ only if a snippet shows it was installed in the last 12 months (snippet says 2022, so tier 3, low score) |
| Contradiction | RF-108. Careers page snippet (dated 14 Nov) asks for "Excel planning experience". LinkedIn snippet (dated 6 Nov) says "proud to go live with our new TMS this month" | The Excel claim fails the falsification pass. RF-108 is DQ under the new TMS rule and drops out of the top 3 |
| Wrong company | RF-117. News snippet about "Twente Bulkhandel", a grain trader, "opening a new site" | Not counted. Logged as wrong company. No new site points for RF-117 |
| Out of window signal | RF-111. Planner job post dated 2 September | Not counted, outside 30 days |
| Email results | Provider tabs include catch all and invalid results for some contacts | Only valid marked Send OK |
| German account in the top 3 | RF-104 and RF-118 can score high | If chosen for the opener, channel is LinkedIn first, not email |

**Expected outcome.** Six rows disqualified at Task 1 (RF-103, 106, 107, 109, 116, 120), and a seventh (RF-108) once the
falsification in Task 4 sends the learner back. RF-108 is marked under criterion 4. A strong top 3 usually includes RF-101 (planner job post on 20 Nov, new
depot announced 12 Oct, Excel). Accept any top 3 that follows correctly from the learner's own applied formulas, as long
as RF-108 is out and the RF-117 news signal isn't counted.

**Good submission, in short.** Tiers tab with seven DQ rows and reasons. Waterfall tab with nested `IF` formulas, a
"Found by" column, credits counted only where needed, and two catch all emails marked not OK. Score tab sorted with
signals logged by snippet ID. Research tab showing the RF-108 contradiction caught and a note "RF-108 moved to DQ, new TMS
6 Nov, top 3 now RF-101, RF-104, RF-119". Opener to the head of planning at Lingedal Transport, 88 words, six parts on
Monday replanning with two planner vacancies and a new depot, each part tagged with a snippet ID. Start 10:02, end 10:58.

**Failing submission, in short.** All 20 accounts tiered, no DQ column. Every provider looked up for every row. RF-108
ranked first because of its Excel job post. Opener says "I saw you're growing fast and probably struggling with
planning". Fails criteria 1, 2, 4 and 5, all musts.

### Stuck during the test?

1. *"My XLOOKUP returns #N/A."* The account isn't on that provider tab, which means that provider found nothing. Wrap it
   in `=IFERROR(XLOOKUP(...), "")` so the waterfall moves on to the next provider.
2. *"I'm running out of time."* Do Task 5 before you polish Task 3. A typed score with a note beats no opener. Criterion 5
   is a must, criterion 3 isn't.
3. *"Two snippets disagree."* That's the point. The newer, more direct source usually wins (a company announcing its own
   new tool beats a job post that might be old copy). Write down which one you trusted and why.

---

---

### Module 8. Multichannel outbound

**Goal.** Send your Module 7 sequence by email and LinkedIn from a separate, warmed domain, without landing in spam or breaking the law.
**Time.** 46 minutes of video, plus 4 hours of assignment spread over 2 to 3 weeks (most of it is waiting for warm up).
**You need.**
- Your 3 step sequence and A/B plan from Module 7
- Your scored 200 account list from Modules 3 to 5, with contacts and verified emails
- A card to register a domain (about the price of a lunch per year) and to pay for one mailbox per month
- A lemlist account on the trial (check lemlist's pricing page for what the trial includes)
- Your own LinkedIn account, logged in on Chrome
- Access to the DNS settings of the new domain (you get this when you buy it)

Start lesson 8.1 at least 14 days before you want to send anything. Warm up takes that long and can't be rushed.

#### Lesson 8.1 Buy a separate sending domain (8 min)

**In plain words.** Cold email can hurt the reputation of the address it's sent from. So you never send it from your company's main domain. You buy a second, similar web address only for outbound, so if anything goes wrong your normal email still arrives.

**You'll be able to.**
- Explain why cold email never goes out from the main domain
- Pick and buy a sending domain that looks trustworthy
- Create one or two real mailboxes on it with a real person's name
- Point the new domain's website address to your main site

**What's shown.**
1. Two words first. A **domain** is the part of an email or web address after the @ or the www, like routeful.nl. A **sending domain** is a second domain you use only for cold email.
2. Why it matters. Email providers like Gmail and Outlook keep a score for every domain, called its **reputation**. Too many bounces or spam reports and they start putting your mail in spam. If that happens to routeful.nl, the invoices and support replies go to spam too. If it happens to a sending domain, you lose only that domain.
3. Picking a name. Stay close to the brand so people recognise it. For Routeful, good options are getrouteful.com, routefulhq.nl or tryrouteful.com. Avoid odd endings (.xyz, .online) and anything with numbers or misspellings, because they look like spam.
4. Screen demo, buying it. Open a domain registrar (a company that sells domains, for example Cloudflare, TransIP or Namecheap). Type the name in the search box, click the result, add it to the basket, pay. Turn on auto renew so it never lapses.
5. Screen demo, the mailbox. Open Google Workspace (or Microsoft 365 if your company uses that), click Get started, enter the new domain, and follow the steps to verify you own it. The tool shows a TXT record to paste into your DNS. **DNS** is the address book of the internet, a list of settings that tells the world where your domain's website and email live. **TXT record** is one line of text in that address book.
6. Create the mailbox with a real person's name, for example anna@getrouteful.com. Never info@ or sales@ for cold email. Add a profile photo and a signature with the person's name, role, company and the main website.
7. Screen demo, the redirect. In the registrar, find Forwarding or Redirects, and point getrouteful.com to routeful.nl. Anyone who checks the domain lands on the real site.
8. How many mailboxes. For a beginner, one domain with one or two mailboxes is plenty. More mailboxes means more to warm up and watch.
9. What to write down. Domain, registrar, renewal date, mailbox names and who has the passwords. This goes in your setup sheet from Module 0.

**Do it now.** Write three candidate sending domain names for your capstone market, check each is free at a registrar, and pick one. If you're ready to commit, buy it and create one mailbox. If you're using the practice pack, pick a name for Routeful but don't buy it.

#### Lesson 8.2 SPF, DKIM and DMARC, step by step (11 min)

**In plain words.** SPF, DKIM and DMARC are three lines you add to your domain's settings. Together they prove to Gmail and Outlook that an email really comes from you and wasn't faked. Without them, most of your mail goes to spam or gets refused.

**You'll be able to.**
- Say in one sentence what each of the three does
- Add the SPF, DKIM and DMARC records for a Google Workspace mailbox
- Check all three are working with a free checker

**What's shown.**
1. The three in plain words, with a letter analogy. **SPF** (Sender Policy Framework) is a list of the post offices allowed to send letters in your name. **DKIM** (DomainKeys Identified Mail) is a wax seal on each letter that the receiver can check wasn't broken. **DMARC** tells the receiver what to do with a letter that fails the first two checks, and asks them to send you a report.
2. Big mail providers now expect all three on domains that send a lot of mail. Check Google's and Yahoo's current sender rules before you start, because they change.
3. Screen demo, finding DNS. Log in to your registrar, click your domain, click DNS or Manage DNS. You see a table of records with columns Type, Name (or Host) and Value (or Content).
4. Screen demo, SPF. Click Add record. Type TXT. Name `@` (which means the domain itself). Value for Google Workspace is `v=spf1 include:_spf.google.com ~all`. Save. A domain may only have **one** SPF record. If one already exists, add the new `include:` part to it instead of making a second.
5. Screen demo, DKIM. Open the Google Admin console, go to Apps, then Google Workspace, then Gmail, then Authenticate email. Pick the domain, click Generate new record, keep the default settings, click Generate. Google shows a name (usually `google._domainkey`) and a long value starting `v=DKIM1`. Copy both into a new TXT record at your registrar. Wait 10 to 60 minutes, go back to Google Admin and click Start authentication. The status should change to authenticating.
6. Screen demo, DMARC. Add one more TXT record. Name `_dmarc`. Value `v=DMARC1; p=none; rua=mailto:dmarc@getrouteful.com`. The `p=none` means "watch only, don't block anything yet", which is the safe start. After a month of clean reports you can change it to `p=quarantine`.
7. Screen demo, the custom tracking domain. lemlist can use a **tracking domain**, a sub address on your own domain for its links, so your links don't share a reputation with other lemlist users. In lemlist, open Settings, find the custom tracking domain option, copy the CNAME value it shows, and add it as a CNAME record at your registrar (a **CNAME** is a DNS record that points one name to another). Then click verify in lemlist.
8. Screen demo, checking. Open MXToolbox (mxtoolbox.com) and run the SPF lookup, the DKIM lookup (selector `google`) and the DMARC lookup on your domain. All three should show green. Then send a plain email from the new mailbox to a free test service like mail-tester.com and read the score and the warnings.
9. Common mistakes. Two SPF records. A typo in the DKIM value because a line got cut when copying. Adding records to the main domain instead of the sending domain. Forgetting that DNS changes can take up to a day to show everywhere.

**Do it now.** Add all three records to your sending domain (or, on the practice pack, write out the exact three records Routeful would add for getrouteful.com). Run the MXToolbox checks and screenshot the three results.

#### Lesson 8.3 Warm up, send caps and deliverability checks (9 min)

**In plain words.** A new mailbox that suddenly sends 200 emails looks like a spammer. So for the first weeks you let it send small amounts of normal looking mail that gets opened and answered, and you raise the amount slowly. After that you still keep a daily cap and check every week that you're landing in the inbox.

**You'll be able to.**
- Turn on warm up for a new mailbox in lemlist
- Set a safe daily sending cap and raise it on a schedule
- Read the signs that deliverability is going wrong and know what to do first

**What's shown.**
1. **Warm up** means slowly building a new mailbox's reputation. lemlist's warm up tool (lemwarm) sends emails between your mailbox and other real mailboxes in a network, opens them, replies, and pulls them out of spam, so providers learn your mailbox is normal.
2. Screen demo. In lemlist, open Settings, then the email accounts section, and click Connect an email account. Choose Google, log in with the new mailbox, allow access. Then open the warm up option for that mailbox and switch it on. Leave the default ramp unless you have a reason.
3. How long. Plan on at least 14 days of warm up before the first cold email, and keep warm up running the whole time you send. Don't switch it off when the campaign starts.
4. **Send cap** is the most cold emails a mailbox sends in one day. The course rule for a new mailbox is to start low and raise slowly. Week 1 of sending, 15 to 20 a day. Week 2, 25 to 30. Then stay at or under about 40 a day per mailbox. If you need more volume, add mailboxes, don't push one harder. These are cautious course defaults, not provider rules. Check lemlist's current guidance and your provider's sending limits.
5. Screen demo. In the campaign settings (or the mailbox settings), find the daily sending limit and type your number. Also set sending hours to the working day of the people you email, in their time zone.
6. Things that hurt deliverability, said plainly. Bounces (send only to verified emails from Module 4). Spam reports (send only to people who really fit, and make opting out easy). Links and images in the first email (use none, or one plain link). Open tracking (it adds a hidden image, so switch it off for cold email). Identical text to hundreds of people.
7. **Open rate** is unreliable now, because some mail apps open every email automatically for privacy reasons. Judge a campaign on replies, not opens.
8. The weekly check, in four steps. Look at the bounce rate in lemlist (if it's climbing, stop and re verify the list). Look at the warm up dashboard's inbox placement. Send one test to mail-tester.com. Read Google Postmaster Tools if you've set it up for the domain.
9. If you land in spam. Pause the campaign, keep warm up on, check the three DNS records again, cut the daily cap in half, remove links, and only restart when tests come back clean.

**Do it now.** Connect your new mailbox to lemlist and switch on warm up today. Put a reminder in your calendar 14 days from now, and write your send cap schedule (week 1, week 2, after) into your setup sheet.

#### Lesson 8.4 Build the campaign in lemlist, email and LinkedIn steps (10 min)

**In plain words.** Now you load your Module 7 sequence into lemlist and mix email and LinkedIn steps, so the same person sees you in two places. You also set lemlist's LinkedIn actions to safe daily limits, because LinkedIn restricts accounts that push too hard.

**You'll be able to.**
- Import a list with your own custom fields into a lemlist campaign
- Build a sequence with email steps, LinkedIn steps, waits and a condition
- Set LinkedIn limits and the campaign settings that protect you
- Preview every message for every lead before launch

**What's shown.**
1. **Multichannel** means using more than one channel, here email and LinkedIn. A **step** is one action in the sequence, like "send email 1" or "visit their LinkedIn profile". A **condition** is a fork, like "if they accepted the invite, send a LinkedIn message, otherwise send email 2".
2. Screen demo, LinkedIn connection. Install the lemlist Chrome extension, log in to LinkedIn in the same browser, then in lemlist open Settings and connect your LinkedIn account. lemlist runs LinkedIn steps through your own account, so everything it does counts as you.
3. Screen demo, the list. Export your Clay table (or the practice sheet) as CSV with these columns at least, first name, last name, company, email, LinkedIn URL, and the custom fields your messages use, for example `observation` and `problem` from your Module 6 research. In lemlist click Campaigns, then create a new campaign, choose to start from scratch, click Add leads, upload the CSV and map each column. Columns lemlist doesn't know become custom variables you can use as `{{observation}}`.
4. Screen demo, the sequence. Open the Sequence tab. Add steps in this order for the Routeful example. Day 0, LinkedIn visit profile. Day 1, LinkedIn invite with no note, or a short note with no pitch. Day 2, Email 1 (your opener). Day 5, a condition, if the invite was accepted send a LinkedIn message (a short version of your follow up), otherwise send Email 2. Day 9, Email 3, the polite close. Use the wait boxes between steps to set the days.
5. Screen demo, writing the steps. Paste your Module 7 text into each email step. Use variables only where you've checked the data exists for every lead. A missing variable sends as an empty gap, or the step blocks. Use lemlist's fallback option, or remove leads with empty fields before launch.
6. **LinkedIn limits.** LinkedIn caps how many invites you can send and restricts automation. The course rule is to start low, for example 10 to 15 invites and 20 to 30 profile visits a day in your first week, raised slowly only if nothing warns you. These are cautious course numbers. Check LinkedIn's own terms and lemlist's current recommended limits, and never run two tools on one LinkedIn account at once.
7. Screen demo, settings. Open the campaign Settings. Choose the sending mailbox. Set sending days and hours. Turn on "stop sending to a lead when they reply" (the exact wording can change, find the option that stops the sequence on reply). Turn off open tracking. Add an unsubscribe line in plain words, like "Not relevant? Just say so and I won't write again".
8. Screen demo, preview. Open the Review or Preview step and click through at least ten leads. Read each message as if you were them. Look for empty variables, wrong company names, odd capital letters and anything the research didn't actually prove.
9. Don't launch yet. Lesson 8.5 covers who you're allowed to email and the safe first send.

**Do it now.** Create the campaign in lemlist, import 20 leads (or 20 practice accounts), build the five steps and preview ten of them. Fix every problem you find in the source sheet, then re import, so the sheet stays the single source of truth.

#### Lesson 8.5 The rules by country, the safe first send and handling replies (8 min)

**In plain words.** Before you press launch, check that you're allowed to email each person, then send to a small group first and watch what happens. When replies come in, answer them fast and honestly, and remove anyone who says no at once.

**You'll be able to.**
- Mark each lead's country and decide email, LinkedIn only, or skip
- Run a safe first send of 20 to 30 people and read the results
- Sort replies into four groups and handle each correctly
- Record opt outs so they're never contacted again

**What's shown.**
1. This is not legal advice. Check the rules in your own country and the countries you email, and ask your company if it has a policy.
2. **GDPR** is the EU law on personal data, and a work email with a name in it is personal data. For B2B outreach most people rely on **legitimate interest**, which means you have a real business reason, it's relevant to the person's job, and you've written down why it's fair. You did that document in Module 2. Reuse it.
3. The basics that always apply. Tell people where you got their data if they ask. Honour an opt out at once. Keep only the fields you need. Make it easy to say no in every email.
4. Country rules differ. The UK and the Netherlands are more permissive about emailing business addresses. Germany is strict, and unsolicited B2B cold email there is risky without consent. For the Routeful example that means Dutch leads get email and LinkedIn, German leads get LinkedIn only or a call first, and Belgian leads get checked before you decide. Add a `country` and a `channel` column to your sheet and filter on them before import.
5. LinkedIn has its own rules. Read LinkedIn's terms on automation, keep the limits from lesson 8.4, and never message people who've asked you to stop on any channel.
6. **The safe first send.** Launch to 20 to 30 of your best fit leads only. Watch for 3 to 4 working days. Check bounce rate, spam folder placement (send a copy to a test Gmail and Outlook address), replies and any LinkedIn warnings. Only add the rest of the list if all of that looks clean.
7. Screen demo, replies. In lemlist, open the inbox view (or your mailbox). Sort every reply into one of four groups. Positive (wants to talk or see something). Not now (timing). No (not interested, wrong person, stop). Auto reply (out of office, left the company). Tag each in lemlist and in your sheet.
8. How to answer. Positive, reply within one working day, answer exactly what they asked, and offer the low effort next step from your message. Not now, thank them and ask if you may check back in a set month. No, say thanks, confirm you won't write again, and mark them as do not contact in lemlist and your CRM the same day. Wrong person, ask politely who handles it, once.
9. Before every manual reply, read the whole thread from the first message. A reply can arrive after you've started writing, and the early messages are where you made promises. Astra checks every thread this way before every send, because a reply sent on top of an unread message is the one mistake you can't undo.

**Do it now.** Add `country`, `channel` and `do_not_contact` columns to your list. Fill them for every lead and write one line explaining your rule for each country in your market.

#### Quiz 8 (pass 80%)

1. Why do you send cold email from a separate domain?
   A. It's cheaper than using your main domain
   B. If its reputation gets damaged, your company's normal email still reaches inboxes
   C. lemlist only works with new domains
   D. It makes emails look more personal
   **Answer.** B. **Why.** Spam problems hit the sending domain's reputation, not the main one's. **Rewatch.** 8.1

2. True or false. It's fine to add a second SPF record if the first one is from another tool.
   **Answer.** False. **Why.** A domain may only have one SPF record, so you add the new `include:` to the existing one. **Rewatch.** 8.2

3. Which of the three settings tells the receiver what to do with mail that fails the checks?
   A. SPF B. DKIM C. DMARC D. CNAME
   **Answer.** C. **Why.** DMARC sets the policy and asks for reports. **Rewatch.** 8.2

4. Sanne bought her sending domain yesterday and wants to email 300 leads tomorrow. What should she do?
   A. Send to all 300, the list is verified
   B. Send 100 a day for three days
   C. Switch on warm up and wait at least 14 days before the first cold email
   D. Send from her main domain until the new one is ready
   **Answer.** C. **Why.** A new mailbox needs time to build reputation, and the main domain is never used for cold email. **Rewatch.** 8.3

5. True or false. Open rate is the best way to judge a cold email campaign.
   **Answer.** False. **Why.** Some mail apps open emails automatically, so opens are unreliable. Judge on replies. **Rewatch.** 8.3

6. Your bounce rate jumps after you add a new batch of leads. What do you do first?
   A. Raise the daily cap to get through the list faster
   B. Pause the campaign and re verify the new batch
   C. Switch off warm up
   D. Add images to the email
   **Answer.** B. **Why.** Bounces damage reputation, so stop and fix the list before sending more. **Rewatch.** 8.3

7. Which setting should be switched on in every cold campaign?
   A. Open tracking
   B. Stop the sequence for a lead when they reply
   C. Send on Sundays
   D. Images in email 1
   **Answer.** B. **Why.** Without it, people who already replied keep getting automated follow ups. **Rewatch.** 8.4

8. Routeful's list has leads in the Netherlands and Germany. What's the cautious plan?
   A. Email everyone, GDPR is the same everywhere
   B. Email Dutch leads, use LinkedIn or a call first for German leads, and check the rules for each country
   C. Skip both countries
   D. Email German leads only, they're more formal
   **Answer.** B. **Why.** Germany is strict on unsolicited B2B email, the Netherlands is more permissive for business addresses. Not legal advice, check. **Rewatch.** 8.5

9. A lead replies "please remove me". When do you mark them do not contact?
   A. At the end of the campaign
   B. Next week during CRM cleanup
   C. The same day, in lemlist and the CRM
   D. Only if they ask twice
   **Answer.** C. **Why.** Opt outs are honoured at once. **Rewatch.** 8.5

10. How big should the first send of a new campaign be?
   A. The whole list
   B. 20 to 30 of the best fit leads, then watch for 3 to 4 working days
   C. One person
   D. Half the list
   **Answer.** B. **Why.** A small first send shows problems before they hit everyone. **Rewatch.** 8.5

#### Assignment 8. A live campaign on a warmed domain

**Goal.** Launch your Module 7 sequence by email and LinkedIn from a warmed sending domain, starting with a safe small first send.
**Time.** 4 hours of work, spread over 2 to 3 weeks because of warm up.
**You need.** Your sequence and A/B plan (Module 7), your scored list with verified emails (Modules 3 to 5), a sending domain and mailbox, lemlist trial, LinkedIn, MXToolbox and mail-tester.com.

**Steps.**
1. Buy the sending domain and create one mailbox with a real name, photo and signature (lesson 8.1). Set the redirect to the main site.
2. Add SPF, DKIM and DMARC (`p=none`) records (lesson 8.2). Run the three MXToolbox lookups and screenshot them.
3. In lemlist, open Settings, connect the mailbox, switch on warm up. Add the custom tracking domain. Write the date in your setup sheet.
4. While warm up runs, add `country`, `channel` and `do_not_contact` columns to your list and fill them (lesson 8.5). Write a short country rule table.
5. Build the campaign (lesson 8.4). Import leads, build at least two email steps and two LinkedIn steps with waits and one condition. Turn on stop on reply, turn off open tracking, set sending hours and the week 1 send cap. Set LinkedIn daily limits.
6. Preview at least 20 leads. Fix every error in the source sheet and re import.
7. After at least 14 days of warm up, send one test to mail-tester.com. If the score is low, fix what it lists first.
8. Launch to 20 to 30 of your best fit leads only.
9. After 3 to 4 working days, check bounces, a test inbox placement in Gmail and Outlook, replies and LinkedIn warnings. Write what you saw. If clean, add the next batch at the week 2 cap.
10. Sort every reply into the four groups and answer each. Mark opt outs the same day.

**Hand in.**
- A one page setup doc (Google Doc) with the domain, mailbox, warm up start date, send cap schedule and LinkedIn limits
- Screenshots of the three MXToolbox checks and the mail-tester.com result
- A screenshot of the lemlist sequence with every step visible, and one of the campaign settings
- The country rule table and the list with the `country`, `channel` and `do_not_contact` columns filled
- A short first send report (half a page): how many sent, bounces, replies by group, what you changed before the next batch

**Marking rubric.**

| Criterion | 0 | 1 | 2 | Must? |
|---|---|---|---|---|
| Separate sending domain with SPF, DKIM, DMARC all passing | Main domain used, or records missing | Separate domain, one record failing | All three pass, screenshots attached | Must |
| Warm up of at least 14 days before the first cold email | No warm up, or under a week | 7 to 13 days | 14 days or more, kept running during sending | Must |
| Sequence uses email and LinkedIn with waits and a condition | Single channel | Both channels, no condition or waits wrong | Both channels, sensible waits, a working condition | |
| Safe settings and limits | Open tracking on, no stop on reply, no caps | Some set | Stop on reply, no open tracking, send cap and LinkedIn limits set and written down | Must |
| Country rules and opt outs handled | No country check | Country column, no rule written | Country rule table, channel set per lead, opt outs recorded the same day | Must |
| First send report | Missing | Numbers only | Numbers, what was checked and what was changed before the next batch | |

**Good example.** Joris builds for a Dutch packaging wholesaler market. His doc shows getpackwise.nl bought on 2 March, one mailbox (joris@getpackwise.nl), warm up from 2 to 18 March, and a cap of 15, then 25, then 35 a day. MXToolbox shows three green checks and mail-tester scored well after he removed a link from the signature. The sequence is visit profile, invite, email 1, condition (accepted gets a LinkedIn message, not accepted gets email 2), email 3. His first send went to 25 leads. Report says one bounce (he re verified and found two more bad emails in the next batch), three replies (one positive, one not now, one opt out marked the same afternoon). German leads were set to LinkedIn only.

**Bad example.** Mila's campaign sends from mila@hercompany.com, the main domain, to all 200 leads on day one with open tracking on. It fails the must on the sending domain and on safe settings, and if spam reports came in, her whole company's email would suffer.

**Stuck?**
1. **DKIM won't authenticate.** The value got cut when copying, or you added it to the wrong domain. Copy it again from Google Admin in one piece, check the name is `google._domainkey`, wait an hour, click Start authentication again.
2. **LinkedIn steps don't run.** The Chrome extension isn't logged in, or your browser was closed. Check the extension shows your account as connected and keep Chrome open during sending hours, or follow lemlist's current guidance for running LinkedIn steps.
3. **Variables show as blank in preview.** The CSV column name doesn't match the variable, or the cell is empty. Rename the column to match exactly, and filter out leads with empty fields before import.

### Module 9. APIs and automation

**Goal.** Connect three tools with an n8n workflow that runs by itself, handles errors and keeps a log.
**Time.** 44 minutes of video, plus 3 to 4 hours of assignment.
**You need.**
- An n8n account (the cloud trial) or a free self hosted copy if you're comfortable installing software
- Your HubSpot free CRM from Module 0 (or a fresh one), with a few test contacts
- A Google account (Sheets and Gmail) and, if you have one, a Slack workspace where you can add an app
- Your Clay table from Module 4, or an enrichment provider's API key from its trial (check the provider's pricing page)

#### Lesson 9.1 What an API and a webhook are, the restaurant way (7 min)

**In plain words.** An API is how one piece of software asks another for data or tells it to do something. A webhook is the other way round, the software tells you the moment something happens. Every automation you'll build is made of these two.

**You'll be able to.**
- Explain an API and a webhook to someone who isn't technical
- Name the parts of an API request (address, method, key, body)
- Read a simple API response and find the field you need

**What's shown.**
1. The restaurant. You're the customer, the kitchen is the other software, and you can't walk into the kitchen. The **menu** is the API documentation, the list of what you're allowed to order. The **waiter** is the **API**, the thing that takes your order to the kitchen and brings back the dish. The **order** is the **request**. The **dish** is the **response**.
2. The parts of an order. The **endpoint** is the address you send the request to, like the table number and which kitchen counter. The **method** says what you want to do. GET means "bring me something", POST means "here's something new", PATCH means "change this". The **API key** is your membership card that proves you're allowed to order. It's secret, like a password. The **body** is the details of the order, like "no onions".
3. The webhook. You order at a busy food court and they give you a buzzer. You don't keep asking "is it ready?". The buzzer rings the moment your food is ready. A **webhook** is that buzzer. The other software sends a message to an address you gave it the moment something happens, like "new contact created".
4. Asking again and again is called **polling**. It's like going to the counter every five minutes. It works, it's just slower and uses more requests.
5. Screen demo, a real response. Open a public test API in the browser (for example a free one that returns sample users). Show the response. It's **JSON**, a way of writing data as labels and values in curly brackets, like `"company": "Routeful"`. Find one field in it.
6. **Rate limits.** The kitchen only cooks so many dishes a minute for you. Most APIs cap how many requests you can make. Go over and you get an error (often code 429). Your flows should wait and try again.
7. **Status codes**, the waiter's short answers. 200 means fine. 401 means your key is wrong. 404 means that address doesn't exist. 429 means slow down. 500 means the kitchen has a problem.
8. Never paste an API key into a shared sheet, a screenshot or a chat. Store it in the tool's credential section, which lesson 9.2 shows.

**Do it now.** Pick two tools you already use in this course (for example HubSpot and Clay). Find each one's API documentation page and write down, for one action, the endpoint, the method and what you'd send. Then write the restaurant version of a webhook for your capstone in two sentences.

#### Lesson 9.2 n8n basics, triggers, nodes and credentials (10 min)

**In plain words.** n8n is a tool where you build automations by joining boxes on a screen. Each box does one job. The first box decides when the flow starts, and the boxes after it pass data along like a relay.

**You'll be able to.**
- Create a workflow in n8n and add a trigger
- Add nodes and pass data from one to the next
- Store a credential safely and connect HubSpot and Google Sheets
- Test a workflow step by step and read each node's output

**What's shown.**
1. Words first. A **workflow** is one automation from start to end. A **node** is one box in it that does one job. A **trigger** is the node that starts the workflow (a schedule, a webhook, a form). A **credential** is a saved login or key that n8n uses to reach another tool. An **execution** is one run of the workflow.
2. Screen demo, a new workflow. Log in to n8n, click Create workflow (or the + button). Name it at the top, for example `T1 M9 new contact to Slack`. Click Add first step. Search for Schedule Trigger, pick it, set it to every 15 minutes.
3. Screen demo, the HubSpot credential. In HubSpot, click the gear icon for Settings, go to Integrations and then Private Apps (in newer accounts this may sit under a "legacy apps" or development area). Click Create a private app, name it `n8n`, open the Scopes tab, tick the contacts read scope (and write if you'll update contacts), click Create app and copy the access token. Back in n8n, add a HubSpot node, open the Credential dropdown, choose Create new credential, pick the app token option, paste the token, click Save. It's now stored encrypted inside n8n, and never typed into a node again.
4. Screen demo, the HubSpot node. Set Resource to Contact and Operation to the option that gets recently created or updated contacts. Click Test step (or Execute step). The right panel shows the output, one item per contact.
5. Items are the key idea. n8n passes a list of **items** from node to node. If HubSpot returns three contacts, the next node runs three times, once per item.
6. Screen demo, expressions. Add a Google Sheets node, connect your Google account (choose Create new credential, sign in with Google). Set Operation to Append row, pick the spreadsheet and sheet. For each column, drag a field from the left panel (the previous node's output) into the box. n8n writes it as an **expression**, a small piece of text in double curly brackets that means "use this value from the incoming data", like `{{ $json.properties.email }}`.
7. Screen demo, testing. Click Test workflow. Each node gets a green tick and an item count. Click a node to see what went in and what came out. Open the sheet and check the rows.
8. Screen demo, going live. Toggle the workflow to Active at the top. From now on it runs on its own. The Executions tab lists every run with its result.
9. Naming habit. Name every node by what it does (`Get new HubSpot contacts`, `Log to sheet`), not the default name. You'll thank yourself when something breaks.

**Do it now.** Build the two node flow from the demo (Schedule Trigger, HubSpot, Google Sheets) on your own HubSpot with two test contacts. Run it once by hand and check the two rows arrive in the sheet.

#### Lesson 9.3 Building the three tool flow, branches and enrichment (10 min)

**In plain words.** Real flows do more than copy data. They check something, take a different path depending on the answer, call another tool to add information, and tell a person. This lesson builds the flow you'll hand in.

**You'll be able to.**
- Use an IF node to send items down two paths
- Call an enrichment step through Clay's webhook or an HTTP Request node
- Post a clear message to Slack or send an email to the right person
- Avoid processing the same contact twice

**What's shown.**
1. The flow on a whiteboard first. Trigger (new HubSpot contact) then check (has a work email?) then enrich (company size and industry) then decide (fits the ICP?) then notify (Slack or email to the owner) then log (one row in a sheet). Draw your flow before you build it, every time.
2. Screen demo, IF node. After the HubSpot node, add an IF node. Condition, email is not empty. Items that pass go to the true branch, the rest to the false branch. Connect the false branch to the log node with a status of `skipped, no email`.
3. Screen demo, enrichment option A, Clay. In Clay, create a table, choose to import from a webhook, and copy the webhook address it gives you. In n8n, add an HTTP Request node. Method POST, URL the Clay webhook, body type JSON, and send the email, name and company domain. Clay runs your Module 4 waterfall on each new row.
4. Screen demo, enrichment option B, a direct API. Add an HTTP Request node, method GET or POST as the provider's documentation says, URL the provider's endpoint, add the API key using a credential of type header auth (never typed into the URL). Test it and find the company size and industry in the JSON output.
5. If you use option A, Clay works on its own clock, so in this assignment it's fine for Clay to enrich and send the result back to n8n with Clay's HTTP API column, or for you to read the enriched row back in a second, scheduled flow. Keep it simple. Option B gives the answer straight away in the same flow.
6. Screen demo, the fit check. Add a second IF node. For Routeful, condition `employees` is between 20 and 500 and `industry` contains transport or logistics. True branch, notify. False branch, log only.
7. Screen demo, Slack. Add a Slack node, create a credential (n8n walks you through connecting a Slack app), Resource Message, Operation Send, choose the channel, write the text with expressions, for example `New fit lead: {{ $json.firstname }} at {{ $json.company }}, {{ $json.employees }} staff. Owner please check within one working day.` If you don't have Slack, use the Gmail node, Operation Send, to the owner's email.
8. Duplicates. A schedule trigger that reads "recently updated" contacts can see the same person twice. Fix it by logging the HubSpot contact ID in the sheet and, before notifying, looking it up with a Google Sheets node (Operation Get rows, filter on the ID). If found, skip.
9. Test with three test contacts, one that fits, one that doesn't, one without an email. You should see one Slack message and three log rows.

**Do it now.** Draw your flow as six boxes on paper or in a doc, with the condition on each IF written out. Then add the IF node for "has email" to your lesson 9.2 flow and test it with a contact that has no email.

#### Lesson 9.4 Errors, logging and retries (9 min)

**In plain words.** Every automation breaks sometimes. A key expires, a tool is down, a field is empty. A good flow tells you when it breaks and keeps a record of what it did, so nothing gets lost quietly.

**You'll be able to.**
- Turn on retries for nodes that call other tools
- Build an error workflow that alerts you when any flow fails
- Log every run with a status, so you can prove what happened
- Read the Executions list to find and fix a failed run

**What's shown.**
1. Two kinds of failure. **Loud** ones stop the flow with a red node, which you can see. **Silent** ones run fine but do the wrong thing, like sending an empty name. Silent ones are worse, and logging is how you catch them.
2. Screen demo, retries. Open a node that calls another tool, like the HTTP Request. Click Settings (inside the node). Switch on Retry On Fail. Set max tries to 3 and wait between tries to a few seconds. This handles short outages and rate limits.
3. Screen demo, continue on error. In the same node settings, find the On Error option. Choose to continue using the error output. The node now has a second output for failed items. Connect it to the log node with status `enrichment failed`, so one bad record doesn't stop the whole batch.
4. Screen demo, the error workflow. Create a new workflow called `Error alerts`. Add an Error Trigger node. Add a Slack or Gmail node that sends `Workflow {{ $json.workflow.name }} failed at {{ $json.execution.lastNodeExecuted }}. Open: {{ $json.execution.url }}` to you. Save it. Then open your main workflow, click the three dots or Settings for the workflow, find Error workflow, and pick `Error alerts`.
5. Screen demo, a good log row. Columns, timestamp, workflow name, HubSpot contact ID, email, step reached, status (`notified`, `skipped no email`, `not a fit`, `enrichment failed`), and a note. One row per contact per run.
6. Test the failure on purpose. Change the HubSpot token to a wrong value, run the flow, check the alert arrives, then put the right token back. A **positive control** means proving your alarm works by setting it off on purpose. If you haven't seen it fire, you don't know it works.
7. Screen demo, Executions. Open the Executions tab, filter on failed, click one, see which node is red and read the error message. Fix, then use the retry option on that execution if offered.
8. Keys expire and people leave. Write down in your setup sheet which credential belongs to which account and who owns it.

**Do it now.** Add retries and the error output to your HTTP Request node, build the `Error alerts` workflow, link it, and set it off on purpose with a wrong token. Screenshot the alert.

#### Lesson 9.5 When not to automate (7 min)

**In plain words.** Automating a bad process just makes the mistakes faster. Some jobs should stay manual, at least for now. This lesson gives you a simple test to decide.

**You'll be able to.**
- Score a task on the four question automation test
- Spot tasks that need human judgement and keep them manual
- Write a short "automate, later, never" list for your capstone

**What's shown.**
1. The four questions. Does it happen often (weekly or more)? Are the steps the same every time? Is the input data clean and in a known place? Is a mistake cheap and easy to undo? Four yeses, automate. One or two noes, do it by hand for a while and write the steps down. A no on the last question, keep a person in the loop.
2. Examples that pass. Logging new contacts to a sheet. Alerting an owner about a new fit lead. Moving a deal's next step date into a task.
3. Examples that fail. Sending a first message to a prospect with no human reading it. Deciding a lead's ICP fit from an unclear job title. Deleting records.
4. Astra's own rule as an example. Research and drafting are helped by automation, but every outward message is read and checked by a person before it's sent, and the thread is read again right before the send. Wrong claims were caught by that check, which is why it stays manual.
5. Cost of upkeep. Each flow is a small machine someone must look after. Count how many minutes it saves a week and how many minutes a month it takes to maintain.
6. Start manual, then automate. Do the task by hand five times, write the steps, then build the flow from your notes. You'll find the edge cases before they break the flow.
7. **Human in the loop** means the flow prepares something and waits for a person to approve it. In n8n you can send a Slack or email message with the draft and only continue once someone approves.

**Do it now.** List ten tasks from your capstone engine. Score each on the four questions and put it in one of three columns, automate now, automate later, keep manual.

#### Quiz 9 (pass 80%)

1. In the restaurant picture, what is the API?
   A. The kitchen B. The menu C. The waiter D. The customer
   **Answer.** C. **Why.** The API carries your request to the other software and brings back the answer. **Rewatch.** 9.1

2. True or false. A webhook means you keep asking another tool every few minutes whether something changed.
   **Answer.** False. **Why.** That's polling. A webhook is the buzzer, the tool tells you the moment it happens. **Rewatch.** 9.1

3. Your HTTP Request node returns status 401. What's the likely cause?
   A. Too many requests B. The API key is wrong or expired C. The address doesn't exist D. The other tool is down
   **Answer.** B. **Why.** 401 means not authorised. **Rewatch.** 9.1

4. Where should an API key live in n8n?
   A. Typed into the URL of the node
   B. In a Google Sheet so the team can see it
   C. In an n8n credential
   D. In the node's name
   **Answer.** C. **Why.** Credentials are stored encrypted and reused, never shown in nodes or shared files. **Rewatch.** 9.2

5. The HubSpot node returns 4 contacts. How many times does the next node run?
   A. Once B. Four times, once per item C. Twice D. It depends on the trigger
   **Answer.** B. **Why.** n8n runs each node once per incoming item. **Rewatch.** 9.2

6. Your flow sent two Slack alerts for the same contact. What's the best fix?
   A. Delete the flow
   B. Log the contact ID and check the log before notifying
   C. Run the flow less often
   D. Ask the seller to ignore duplicates
   **Answer.** B. **Why.** Checking the ID against the log stops the same contact being processed twice. **Rewatch.** 9.3

7. What does an Error Trigger node do?
   A. Fixes errors automatically
   B. Starts a workflow when another workflow fails, so you can send an alert
   C. Deletes failed executions
   D. Retries the failed node
   **Answer.** B. **Why.** It's the start of your alert workflow. **Rewatch.** 9.4

8. True or false. If you've never seen your error alert fire, you can't be sure it works.
   **Answer.** True. **Why.** Set it off on purpose once, that's your positive control. **Rewatch.** 9.4

9. Which task should keep a person in the loop?
   A. Logging new contacts to a sheet
   B. Sending a first message to a prospect
   C. Posting a new lead alert in Slack
   D. Copying a deal's close date into a report
   **Answer.** B. **Why.** A mistake in an outward message can't be undone, so a person reads it first. **Rewatch.** 9.5

10. Tom wants to automate a task he has never done by hand and whose steps change each time. What should he do?
   A. Build the flow anyway
   B. Do it by hand a few times, write the steps down, then decide
   C. Buy a different tool
   D. Ask an AI to do it with no checks
   **Answer.** B. **Why.** Steps that aren't stable fail the automation test. **Rewatch.** 9.5

#### Assignment 9. An n8n flow connecting three tools

**Goal.** Build a live n8n workflow that takes new HubSpot contacts, enriches them, alerts the owner about fit leads, and logs every run, with error handling.
**Time.** 3 to 4 hours.
**You need.** n8n (cloud trial or self hosted), HubSpot free CRM with a private app token, Google Sheets, Slack or Gmail, Clay table or an enrichment API key, your ICP rules from Module 1.

**Steps.**
1. Draw the flow as boxes in a Google Doc first, with each condition written out (lesson 9.3).
2. In n8n, click Create workflow, name it `T1 M9 [your name] new contact flow`.
3. Add a Schedule Trigger every 15 minutes (or a webhook trigger if your HubSpot plan allows webhooks).
4. Add the HubSpot node with your credential, operation get recently created or updated contacts.
5. Add an IF node, email is not empty.
6. Add a Google Sheets node that looks up the contact ID in your log sheet. Add an IF node that skips contacts already logged.
7. Add the enrichment step, Clay webhook (option A) or HTTP Request with a header auth credential (option B). Switch on Retry On Fail (3 tries) and set On Error to continue with the error output.
8. Add an IF node with your ICP fit rule (size and industry at least).
9. On the fit branch, add Slack (or Gmail) with a message naming the contact, company, why they fit and what the owner should do by when.
10. On every branch, end with a Google Sheets Append row node writing timestamp, workflow name, contact ID, email, step reached, status and note.
11. Build the `Error alerts` workflow with an Error Trigger and a Slack or Gmail node, and set it as the error workflow of your main flow.
12. Test with four HubSpot test contacts, one fit, one not fit, one without email, one already logged. Then break the token on purpose and confirm the alert arrives. Fix it.
13. Rename every node by what it does. Toggle the workflow to Active.
14. Write a one page note covering what the flow does, its credentials and owners, how to tell it's working, and what you chose not to automate and why.

**Hand in.**
- The workflow exported as JSON (in n8n, open the workflow menu, choose Download) with credentials removed (n8n doesn't include them in the export, but check)
- A screenshot of the whole canvas with every node named
- A screenshot of the Executions tab showing at least one successful run and the deliberate failure
- The log sheet link (view access) with the four test rows
- A screenshot of the error alert
- The one page note

**Marking rubric.**

| Criterion | 0 | 1 | 2 | Must? |
|---|---|---|---|---|
| Three or more tools connected and the flow runs end to end | Fewer than three, or doesn't run | Runs but needs manual steps | Runs by itself on a trigger across three or more tools | Must |
| Branching on real conditions | No IF nodes | Only one condition | Missing email, already processed and ICP fit all handled | |
| Error handling | None | Retries only | Retries, error output and an error workflow, proven by a deliberate failure | Must |
| Logging | No log | Log for some branches | One row per contact per run with status, on every branch | Must |
| Credentials handled safely | Key visible in a node, URL or screenshot | Credential used, but key also pasted somewhere | All keys in credentials, owners written down | Must |
| Note and naming | No note, default node names | Some | Clear note, every node named by what it does, a reasoned "not automated" list | |

**Good example.** Priya's canvas reads left to right. `Every 15 min`, `Get new HubSpot contacts`, `Has work email?`, `Already in log?`, `Enrich via provider API`, `Fits Routeful ICP?`, `Alert owner in Slack`, `Log row`. Her log sheet has four rows with statuses `notified`, `not a fit`, `skipped no email`, `skipped already logged`, plus one `enrichment failed` row from a test. Her Slack alert says "New fit lead, Daan Vermeer (fake) at Transport Noord BV (fake), 80 staff, logistics. Check and reach out by Thursday." Her note says she kept the first message manual because a person must read it before it goes.

**Bad example.** Lucas's flow has a manual trigger, two nodes and an API key typed into the HTTP Request URL, which also shows in his screenshot. It doesn't run on its own, has no log and leaks a key. Three musts fail. He also needs to revoke that key and make a new one.

**Stuck?**
1. **HubSpot node returns nothing.** The private app is missing the contacts read scope, or there are no contacts changed in the time window. Check the scope in HubSpot, then create a new test contact and run again.
2. **Expressions show as empty in Sheets.** The field path is wrong, for example `$json.email` when HubSpot puts it under `$json.properties.email`. Click the previous node's output, drag the field in rather than typing it.
3. **The error workflow never fires.** It isn't linked in the main workflow's settings, or the failing node is set to continue on error so the run counts as a success. Link it, and use the error output to log those items instead.

### Module 10. CRM architecture

**Goal.** Design and build a clean CRM with a field map, a deduplication rule and a routing rule, using HubSpot and the messy practice export.
**Time.** 48 minutes of video, plus 4 hours of assignment.
**You need.**
- HubSpot free CRM (a fresh portal is best, so you can break things safely)
- The practice pack's messy CRM export of 400 contacts, or an export of your own company's CRM if you're allowed to use it
- Google Sheets
- Your n8n flow from Module 9 (for routing)
- The practice pack's sales team of 6 (2 SDRs, 3 AEs, 1 manager)

#### Lesson 10.1 Objects, records, fields and associations (9 min)

**In plain words.** A CRM is a set of linked lists. Each list holds one type of thing, like people, companies or deals. Getting these types and their links right is the first decision, and everything else depends on it.

**You'll be able to.**
- Name the main CRM objects and what belongs in each
- Explain an association and why a contact should be linked to a company
- Spot data that's in the wrong object

**What's shown.**
1. A **CRM** (customer relationship management system) is where a company keeps its accounts, contacts, deals and their history. HubSpot, Salesforce and Pipedrive are examples.
2. An **object** is a type of record. The four you'll use most are **contacts** (people), **companies** (accounts), **deals** (a possible sale with a value and a stage) and **tickets** (support questions). A **record** is one row of an object, like one person.
3. A **field** (HubSpot calls it a **property**) is one piece of information on a record, like job title or country.
4. An **association** is a link between records, like "Anna works at Transport Noord" or "this deal belongs to Transport Noord". Without links you can't see all the people at an account or which company a deal is for.
5. Screen demo. In HubSpot, open Contacts, click a contact, and show the right sidebar with associated company and deals. Click Add on the Companies card and link one.
6. Wrong object mistakes to watch for. Company size stored on the contact (it belongs on the company). Deal value written in a contact note. One contact record used for a whole company ("Sales Team Transport Noord").
7. The rule of thumb. If it describes the person, it's on the contact. If it describes the business, it's on the company. If it describes one possible sale, it's on the deal.
8. HubSpot matches contacts by email and companies by domain. This is why clean emails and domains matter so much. They're how the CRM knows two rows are the same.

**Do it now.** Open the practice export. For its first 20 columns, write next to each whether it belongs on the contact, the company or a deal, and mark any you'd drop.

#### Lesson 10.2 The field map (10 min)

**In plain words.** A field map is one sheet that lists every field in the CRM, what it means, who fills it in, where the data comes from and which values are allowed. It stops ten people using one field ten different ways.

**You'll be able to.**
- Build a field map with the eight standard columns
- Decide which fields are required and which get cut
- Turn messy free text fields into dropdowns with fixed values

**What's shown.**
1. A **field map** is a document listing every field, what it means, who fills it and where the data comes from.
2. Screen demo, the template. Columns. Object, field name (as shown), internal name, type (text, number, date, dropdown, checkbox), allowed values, meaning in one sentence, source (manual, import, Clay, n8n, form), owner (who keeps it right), required (yes or no).
3. The less is more rule. Every field someone must fill is a field that will be wrong half the time. Keep only what's used for a decision, a report or a message. For a first build, aim for under 15 custom fields across all objects.
4. Screen demo, dropdowns beat free text. The practice export has country written as "NL", "Netherlands", "Nederland" and "holland". Make `Country` a dropdown with fixed values. Do the same for persona (operations director, head of planning, owner or managing director, other) instead of trusting raw job titles.
5. Screen demo, creating a property. In HubSpot, click the gear icon, go to Properties (under Data Management), pick the object (Contact, Company or Deal) in the dropdown, click Create property. Choose the group, type the label, pick the field type (for example Dropdown select), add the options, click Create.
6. The Routeful field map in brief. Company, `Fleet size` (number, source Clay, owner GTM engineer), `Current planning tool` (dropdown, Excel, old TMS, modern TMS, unknown), `ICP tier` (dropdown, 1, 2, 3, not a fit), `Fit score` (number, from Module 5). Contact, `Persona` (dropdown), `Country` (dropdown), `Lead source` (dropdown), `Do not contact` (checkbox), `Legal basis note` (text). Deal, `Primary pain` (dropdown from your call transcripts), `Next step` and `Next step date`.
7. Write the meaning so a new hire understands it. "Fleet size. Number of trucks the company owns, not leases, as found on their site or registry. Updated by Clay monthly."
8. Keep the map where everyone can find it, and change it before you change the CRM, never after.

**Do it now.** Copy the field map template and fill it for at least 12 fields of your capstone CRM, with allowed values for every dropdown.

#### Lesson 10.3 Stages and exit criteria (9 min)

**In plain words.** A pipeline is the list of steps a deal goes through, from first meeting to won or lost. Each step needs a clear rule for when a deal may move on, otherwise every seller moves deals on a feeling and the numbers mean nothing.

**You'll be able to.**
- Set up a deal pipeline in HubSpot with your stages
- Write an exit criterion for every stage
- Make the fields that prove the exit criterion required at that stage

**What's shown.**
1. A **pipeline** is all open deals and where each one is. A **stage** is a step in it. **Exit criteria** are what must be true before a deal moves to the next stage.
2. The practice pack's stages. New, Meeting booked, Discovery done, Demo done, Proposal sent, Won, Lost.
3. Exit criteria for Routeful, written as facts you could check. New to Meeting booked, a meeting is in the calendar with someone in a target persona. Meeting booked to Discovery done, the meeting happened, fleet size, current tool and main pain are recorded, and the decision maker is named. Discovery done to Demo done, a demo was given with the decision maker or their delegate present. Demo done to Proposal sent, a written proposal with a price was sent and a decision date agreed. Proposal sent to Won, signed. Any stage to Lost, a lost reason picked from the dropdown.
4. Screen demo. In HubSpot click the gear icon, go to Objects, then Deals, then the Pipelines tab. Rename or add stages, set each stage's win probability (you'll learn to set these from your own data in Module 12, use HubSpot's defaults for now).
5. Screen demo, required fields per stage. On the same Pipelines page, click the option to edit stage properties (conditional stage properties, where your tier allows it). For Discovery done, require `Primary pain`, `Fleet size` and `Decision maker named`. HubSpot will ask for them when a seller drags the deal into that stage. If your tier doesn't offer this, write the rule in the field map and check it in the weekly hygiene review.
6. Lost is a stage, not a deletion. Never delete lost deals. They're the raw material for your win and loss analysis.
7. One pipeline per sales motion. If new business and renewals work differently, they get two pipelines. Don't mix them.

**Do it now.** Write exit criteria for every stage of your capstone pipeline as facts someone else could check. Then build the pipeline in HubSpot.

#### Lesson 10.4 Deduplication, cleaning the messy export (11 min)

**In plain words.** Duplicates are two records for the same person or company. They split history, cause people to get the same email twice, and make every count wrong. You clean them before import, and you set a rule so they don't come back.

**You'll be able to.**
- Clean the practice export in Google Sheets before it goes near the CRM
- Write a dedup rule that says what counts as the same record and which one wins
- Import a clean file into HubSpot with the right column mapping

**What's shown.**
1. **Deduplication (dedup)** means finding records that are the same person or company and merging them into one. **CRM hygiene** means keeping data correct, complete and without duplicates.
2. Screen demo, a safe copy. Open the export in Google Sheets. Click File, Make a copy. Never clean the original. Add a column `row_id` with numbers 1 to 400 so you can always trace a row back.
3. Screen demo, normalise first. Add helper columns. `email_clean` with `=LOWER(TRIM(B2))`. `domain` with `=LOWER(REGEXEXTRACT(B2,"@(.+)$"))`. `country_clean` with a lookup table on another tab that maps every spelling ("NL", "Nederland", "holland") to one value, using `=VLOOKUP(TRIM(LOWER(F2)),Countries!A:B,2,FALSE)`.
4. Screen demo, find duplicates. In a `dup_count` column use `=COUNTIF(K:K,K2)` on `email_clean`. Anything above 1 is a duplicate by email. For rows without email, build a `name_company_key` from lower case first name, last name and domain, and count that.
5. The dedup rule, written as three parts. What matches (same `email_clean`, or if no email, same first name plus last name plus company domain). Which record survives (the one with the most recent activity, or if equal, the most filled fields). What happens to the rest (fields that are empty on the survivor are filled from the duplicate, then the duplicate is removed). Personal email domains like gmail.com never match a company.
6. Screen demo, merge. Sort by key, then by last activity. Use a filter view to work through groups. Keep a `merged_into` column so you can prove what happened to each `row_id`.
7. Missing emails. Don't invent or guess them. Mark them `needs_enrichment` and send them through your Module 4 waterfall later.
8. Mixed job titles. Map each title to a persona with a lookup tab (like the countries) and leave the original title in its own field.
9. Screen demo, the import. In HubSpot, open Contacts, click Import, choose Start an import, File from computer, One file, then choose to import contacts and companies together (associated). Upload the clean CSV. Map each column to a property, choose "don't import" for helper columns. Pick the option to update existing records matched by email. Click Finish import, then open the import's error file if one appears.
10. After import, check. Count contacts in HubSpot against your clean row count. Search for three names you know were duplicates and confirm there's one record each. HubSpot also has a duplicate management tool on some tiers (check yours). On the free CRM, cleaning before import is your main defence.

**Do it now.** On a copy of the practice export, build the `email_clean`, `domain` and `dup_count` columns, and write down how many duplicate groups you found by email alone.

#### Lesson 10.5 Routing and hygiene as a habit (9 min)

**In plain words.** Routing is the rule that decides which person gets each new lead, so nothing sits unowned. Hygiene is the small weekly routine that keeps the CRM clean after the big cleanup.

**You'll be able to.**
- Write a routing rule for a team of six that covers every case
- Build it with n8n, setting the contact owner in HubSpot
- Run a 20 minute weekly hygiene check from saved views

**What's shown.**
1. **Routing** means automatically giving a lead to the right person. **Speed to lead** is how fast someone follows up after a lead comes in. A great lead that waits three days is often a lost lead.
2. The routing rule for the practice team, written as a decision table. Tier 1 account that already has an owner goes to that owner. Tier 1 account with no owner goes to the AE for that country (NL, BE, DE). Tier 2 and 3 go to the two SDRs in turn (round robin, which means taking turns). Not a fit goes to nobody, logged only. Anyone marked do not contact goes to nobody. Every routed lead also gets a task "first touch within 1 working day".
3. Write the fallback. What happens if the AE is on holiday or the country is unknown? Fallback goes to the manager, who reassigns within a day. A rule without a fallback leaves leads unowned.
4. Screen demo, building it in n8n. Extend your Module 9 flow. After the fit check, add a Switch node (it's like an IF with many paths) on `ICP tier` and `Country`. For each path, add a HubSpot node, Operation Update contact, setting `Contact owner` to the right owner ID (find the IDs in HubSpot under Settings, Users and Teams, or through the owners option in the HubSpot node). Add a HubSpot node that creates a task for that owner with a due date of tomorrow.
5. Round robin without paid tools. Keep a cell in a Google Sheet with the name of whoever got the last lead. Read it, assign the other SDR, write the new name back.
6. HubSpot's own workflows can also route on paid tiers. On the free CRM, n8n does the job.
7. Hygiene as a habit. Build three saved views in HubSpot. Contacts with no owner. Deals with a next step date in the past. Contacts created this week missing `Persona` or `Country`. In HubSpot, open Contacts, click Add view, set the filters, click Save.
8. The weekly check, 20 minutes on the same day each week. Open each view, fix or assign everything in it, write the three counts in your scorecard. If a count grows two weeks running, the process is broken, not the people. Find the step that lets bad data in and fix that.
9. Hygiene has an owner. Write a name next to each view. Without an owner it doesn't happen.

**Do it now.** Write your routing rule as a decision table, including a fallback, and create the three hygiene views in HubSpot.

#### Quiz 10 (pass 80%)

1. Where does "fleet size" belong?
   A. Contact B. Company C. Deal D. Ticket
   **Answer.** B. **Why.** It describes the business, not the person or one sale. **Rewatch.** 10.1

2. True or false. The more custom fields a CRM has, the better the data.
   **Answer.** False. **Why.** Every required field is one more that gets filled wrong. Keep only fields used for a decision, report or message. **Rewatch.** 10.2

3. Which of these is a good exit criterion for "Discovery done"?
   A. The seller feels it went well
   B. The meeting happened and fleet size, current tool, main pain and decision maker are recorded
   C. The prospect opened the email
   D. The deal is older than two weeks
   **Answer.** B. **Why.** It's a fact someone else could check. **Rewatch.** 10.3

4. A deal is lost. What do you do with it?
   A. Delete it B. Move it to Lost and pick a lost reason C. Leave it in Proposal sent D. Change its value to zero
   **Answer.** B. **Why.** Lost deals feed win and loss analysis. **Rewatch.** 10.3

5. The export has "NL", "Netherlands" and "holland" in the country column. What's the best fix?
   A. Leave it, people know what it means
   B. Make Country a dropdown and map every spelling to one value before import
   C. Delete the country column
   D. Fix it by hand in HubSpot after import
   **Answer.** B. **Why.** Fixed values make filters and reports work. **Rewatch.** 10.2

6. What are the three parts of a dedup rule?
   A. Who, when, why
   B. What matches, which record survives, what happens to the others
   C. Email, phone, name
   D. Import, export, delete
   **Answer.** B. **Why.** Without all three, two people dedup the same file differently. **Rewatch.** 10.4

7. Two records share the email anna@gmail.com but have different company names. Your rule matches on email. What should you check first?
   A. Nothing, merge them
   B. Whether it's really one person, because personal addresses don't tell you the company
   C. Delete both
   D. Change one email
   **Answer.** B. **Why.** Personal email domains never match a company, so confirm before merging. **Rewatch.** 10.4

8. A contact has no email in the export. What do you do?
   A. Guess it from the name and domain and import it
   B. Mark it needs enrichment and run it through your waterfall later
   C. Delete the contact
   D. Use the company's info@ address
   **Answer.** B. **Why.** Never invent data. Find it properly or leave it empty. **Rewatch.** 10.4

9. Your routing rule sends Tier 1 leads to the AE for the country. A lead's country is empty. What should the rule say?
   A. Nothing, it'll sort itself out
   B. A fallback, for example the manager assigns it within a day
   C. Delete the lead
   D. Give it to whoever logged in last
   **Answer.** B. **Why.** Every routing rule needs a fallback so no lead is unowned. **Rewatch.** 10.5

10. The "deals with a past next step date" view has grown three weeks in a row. What's the right reading?
   A. The sellers are lazy
   B. Something in the process lets it happen, so find and fix that step
   C. Hide the view
   D. Delete old deals
   **Answer.** B. **Why.** Growing hygiene counts point to a broken step, not a people problem. **Rewatch.** 10.5

#### Assignment 10. A CRM with a field map, a dedup rule and a routing rule

**Goal.** Turn the messy practice export (or your own data) into a clean HubSpot CRM with a written field map, dedup rule and working routing rule.
**Time.** 4 hours.
**You need.** HubSpot free CRM, the practice export of 400 contacts, Google Sheets, the field map template, your n8n flow from Module 9, the practice sales team of 6 (add them as users or as owners with made up names if you can't add users).

**Steps.**
1. Copy the field map template. Fill it for every field you'll keep (lesson 10.2). Aim for under 15 custom fields. List the fields you dropped and why.
2. In HubSpot, create every custom property from the map (gear icon, Properties, Create property). Use dropdowns for country, persona, ICP tier, lead source and lost reason.
3. Build the deal pipeline with the seven practice stages and write exit criteria for each in the field map's second tab (lesson 10.3).
4. Make a copy of the export. Add `row_id`, `email_clean`, `domain`, `country_clean`, `persona` and `dup_count` (lesson 10.4).
5. Write your dedup rule (what matches, who survives, what happens to the rest) in the field map's third tab. Apply it. Fill `merged_into` for every removed row.
6. Write down three numbers. Rows before, duplicate groups found, rows after.
7. Import into HubSpot as contacts and companies, associated. Map every column. Open any error file and fix what it lists.
8. Check the import. Count records in HubSpot, search three known duplicates, open three random contacts to see they have a company linked.
9. Write the routing rule as a decision table with a fallback (lesson 10.5). Build it in n8n, setting `Contact owner` and creating a first touch task.
10. Test routing with five new test contacts covering Tier 1 NL, Tier 1 DE, Tier 2, not a fit and missing country.
11. Create the three hygiene views and write the owner and day of the weekly check.

**Hand in.**
- The field map sheet link (three tabs, fields, stages with exit criteria, dedup rule)
- The cleaned sheet link with `row_id` and `merged_into` columns
- The three numbers (before, duplicate groups, after)
- Screenshots of the HubSpot pipeline settings, two custom properties and the three hygiene views
- The routing decision table, a screenshot of the n8n routing part, and a screenshot of the five test contacts showing their owners

**Marking rubric.**

| Criterion | 0 | 1 | 2 | Must? |
|---|---|---|---|---|
| Field map complete and lean | Missing or under 8 fields described | Fields listed but meanings, sources or owners missing | Every field with all columns, dropdown values listed, dropped fields explained | Must |
| Pipeline with checkable exit criteria | No exit criteria | Criteria for some stages, or written as feelings | Every stage has criteria someone else could check, lost reason required | |
| Dedup rule written and applied | No rule | Rule written but not traceable | Three part rule, applied, every removed row traceable with `merged_into`, numbers add up | Must |
| Clean import | Import failed or duplicates remain | Imported with errors left unfixed | Clean import, associations work, spot checks pass | |
| Routing rule with fallback, working | No routing | Rule written but not built, or no fallback | Built in n8n, owners set, tasks created, five tests pass including the fallback | Must |
| Hygiene habit | Nothing | Views without owner or day | Three views, owner and weekly day written | |

**Good example.** Elif's field map has 13 custom fields. `Persona` reads "Dropdown. Operations director, Head of planning, Owner or MD, Other. Mapped from job title by the lookup tab, checked by the SDR on first touch." Her dedup tab says "Match on email_clean. If no email, match on first plus last plus domain. Survivor has the latest activity date, ties go to most filled fields. Empty fields on the survivor are filled from the duplicate. Gmail, Hotmail and Outlook domains never match on company." Her numbers are 400 rows before, 31 duplicate groups, 362 rows after, and the arithmetic closes (400 minus 38 removed duplicates equals 362). Her five test contacts land with the right owners, and the missing country one goes to the manager.

**Bad example.** Ben imported all 400 rows straight into HubSpot, then started merging by hand and stopped at 50. He has no written rule, so nobody can repeat or check his work, and his routing sends everything to one AE. Two musts fail.

**Stuck?**
1. **The VLOOKUP returns #N/A for some countries.** A spelling isn't in your lookup tab yet, or has a trailing space. Use `TRIM(LOWER())` on both sides and add each new spelling to the lookup.
2. **HubSpot created new contacts instead of updating.** The email column wasn't mapped to the Email property, so HubSpot couldn't match. Map it to Email exactly, and choose to update existing records.
3. **The numbers don't add up.** Some rows were deleted without a `merged_into` value. Filter for empty `merged_into` among removed rows, trace them by `row_id` in the original copy, and fill them in.

### Module 11. Allbound and loyalty flows

**Goal.** Join inbound and outbound into one system, and build the flows that keep, grow and win back customers after the sale.
**Time.** 42 minutes of video, plus 3 hours of assignment.
**You need.**
- Your HubSpot CRM from Module 10, with the routing rule
- Your n8n account and Module 9 flow
- Your lemlist account and Module 8 campaign
- A HubSpot form (the free CRM includes forms) or any web form tool
- The practice pack's pipeline export (it includes won deals you can treat as customers)

#### Lesson 11.1 The inbound to outbound handover (9 min)

**In plain words.** Inbound means people come to you, for example by filling in a form. Most companies answer inbound slowly and the same way for everyone. A good handover checks who it is, enriches them, routes them to the right person and starts a fitting follow up within minutes.

**You'll be able to.**
- Map the steps from form fill to first human reply
- Decide which inbound leads get a person and which get a sequence
- Build a form to n8n to HubSpot handover with a speed to lead target

**What's shown.**
1. **Inbound** means people contact you first. **Outbound** means you contact them first. **Allbound** joins the two, so a signal from one side starts a well timed action on the other.
2. The handover on a whiteboard. Form filled, contact created, enriched (Module 4), scored (Module 5), routed (Module 10), first reply sent, logged. Write the time target next to each arrow. For a Tier 1 demo request, a person replies within one working hour.
3. Three kinds of inbound, three paths. A demo or contact request from a fit company goes straight to the owner with an alert and a task. A content download (a guide, a webinar) from a fit company goes into a short, helpful lemlist sequence and the owner is told. Anyone not a fit gets a polite automated reply and nothing else.
4. Screen demo, the form. In HubSpot, open Marketing, then Forms, click Create form, choose an embedded form. Fields for name, work email, company website, and one question that helps routing ("How many trucks does your company run?" for Routeful). Add a consent line that matches your legal basis, and say what happens next. Click Publish.
5. Screen demo, catching it in n8n. In n8n, a schedule trigger reading new form submissions through the HubSpot node works on the free plan. Where your plan allows webhooks, use a Webhook node instead so it's instant. Then reuse your Module 9 enrichment and Module 10 routing nodes.
6. Screen demo, the two follow ups. For demo requests, a Slack alert to the owner with everything the enrichment found, plus a HubSpot task due in one hour. For downloads from fit companies, an HTTP Request node or the lemlist node in n8n adds the lead to an inbound lemlist campaign. Check the n8n lemlist node or the lemlist API documentation for the current way to add a lead to a campaign.
7. The inbound sequence is different from cold outbound. They asked for something, so start by giving it to them, then ask one question tied to what they downloaded. No pitch in the first message.
8. Measure it. Log the form time and the first reply time in your sheet. The gap is your speed to lead. You'll put it on the dashboard in Module 12.

**Do it now.** Draw your capstone's inbound handover with its three paths and a time target on every arrow.

#### Lesson 11.2 Website visitors and ad engagement to outbound (8 min)

**In plain words.** Some companies visit your site or engage with your ads without filling in a form. With the right tools and care, you can spot some of them and reach out with a reason that fits. This lesson shows how, and where the privacy lines are.

**You'll be able to.**
- Explain company level visitor identification and its limits
- Turn a visit or ad signal into a scored task, not an instant message
- Write a visit based opener that doesn't creep people out

**What's shown.**
1. **Visitor identification** tools try to work out which company a website visitor works for, usually from their network address. Most can tell you the company, sometimes. Few can reliably tell you the person.
2. Privacy first, and this is not legal advice. In the EU, tracking on a website needs a cookie notice and often consent, and person level identification is much harder to justify than company level. Check your site's consent setup with whoever owns it, and check the tool's own GDPR documentation before you switch anything on.
3. A visit is a signal, not a lead. Treat it like the signals in Module 5. Add points to the account's intent score. Only act when the account also fits the ICP.
4. Useful page signals. Pricing page, a specific product or integration page, a case study in their industry, several visits in a week. A single blog visit means little.
5. Ad engagement works the same way. If your company runs LinkedIn ads, LinkedIn's Campaign Manager can show which companies engaged (check what your account offers). Export it weekly and match it to your account list in Clay or Sheets.
6. Screen demo, the flow. Visitor tool (or weekly ad export) to a Google Sheet, Clay matches the domain to your account list and adds the fit score, n8n checks fit plus intent above your threshold, then creates a HubSpot task for the owner, "Account showed interest in pricing, reach out this week".
7. The message. Don't say "I saw you on our pricing page". It feels like being watched. Use the topic, not the visit. "Planners often ask how pricing works when the fleet changes size through the year. Happy to show how others handled it." Then your normal one problem structure from Module 7.
8. Keep a person in the loop here. Signals are noisy, and a wrong guess about a company is cheap to check and expensive to send.

**Do it now.** List the five pages on your capstone market's typical vendor site that would count as a strong signal, and give each a point value for your Module 5 intent score.

#### Lesson 11.3 Onboarding and retention flows (8 min)

**In plain words.** After someone buys, the next job is making sure they actually use what they bought. Onboarding flows guide the first weeks. Retention flows keep checking in so problems are caught before the customer leaves.

**You'll be able to.**
- Write a first 30 days onboarding flow with a clear "first value" moment
- Set up retention touchpoints tied to real usage, not dates alone
- Build the deal won to onboarding handover in n8n

**What's shown.**
1. **Loyalty or retention flows** are the messages and steps after the sale that keep customers happy, using and buying. **Churn** means customers who stop buying.
2. **First value** is the moment a new customer first gets what they paid for. For Routeful, it's the first week a planner plans all routes in Routeful instead of Excel. Every onboarding step should move them towards it.
3. A 30 day onboarding plan for Routeful. Day 0, welcome email from the account owner with the kickoff date. Day 2, kickoff call. Day 7, check that fleet and drivers are loaded. Day 14, first full week planned, if not, a call. Day 30, review with the operations director, what changed.
4. Screen demo, the handover. When a deal moves to Won in HubSpot, n8n (schedule trigger, HubSpot node reading deals in the Won stage changed since the last run) creates the onboarding tasks for the customer success person, sends the welcome email draft for approval, and logs it.
5. Retention touchpoints are tied to signals, not only the calendar. Usage dropping, a key user leaving, many support tickets, a renewal date 90 days out.
6. The sales to customer success handover note. What they bought, why they bought (the pain from discovery), who the champion is, what was promised. Make these required fields on the Won stage, using Module 10.
7. Keep promises visible. Whatever the seller promised in the deal goes into the handover note. The fastest way to lose a customer is to forget a promise.

**Do it now.** Write the 30 day onboarding plan for your capstone market's product, with the first value moment named and each step's owner.

#### Lesson 11.4 The customer health score (8 min)

**In plain words.** A health score is a number for each customer that shows whether they're likely to stay or leave. It's built from a few signals you already have, and it tells the team who needs a call this week.

**You'll be able to.**
- Choose four to six health signals and weight them
- Build a health score in Google Sheets with a red, amber, green result
- Decide what action each colour triggers

**What's shown.**
1. **Customer health** is a score that shows whether a customer is likely to stay or leave. It works like the fit and intent scores in Module 5, but for customers.
2. Routeful's signals, each scored 0 to 2. Usage (share of routes planned in Routeful last month). Breadth (number of active planners against seats bought). Support (tickets in the last 30 days, more is worse, unless they're how to questions). Relationship (champion still there, last meeting within 90 days). Payment (invoices paid on time). Sentiment (last survey or call tone).
3. Weights. Usage counts double, because it predicts staying best for a tool like this. Make the weights a guess first, then check them against customers who actually left. That's the eavesdrop loop from Module 5 applied to customers.
4. Screen demo, the sheet. One row per customer, one column per signal, a weighted total with `=SUMPRODUCT(B2:G2,$B$1:$G$1)` where row 1 holds the weights, and a status column with `=IF(H2>=9,"Green",IF(H2>=5,"Amber","Red"))`. Add conditional formatting (Format, Conditional formatting) to colour the status.
5. Actions per colour. Green, ask for a referral or a case study (lesson 11.5). Amber, the owner calls this month with a specific question about the weak signal. Red, a meeting with the decision maker within two weeks and a written save plan.
6. Where the data comes from. Usage and seats from the product (often an export or API), tickets from the help desk, relationship and payment from the CRM. Start with a weekly manual export. Automate later, using the lesson 9.5 test.
7. Check the score against reality. Take the customers who left last year (the practice pack gives you a few lost renewals). Would your score have shown them red three months before? If not, change the signals.

**Do it now.** Build the health score sheet with six signals and weights for ten practice customers (use the Won deals in the practice pipeline and make up the usage values, clearly marked as practice data).

#### Lesson 11.5 Reactivation and referral flows (9 min)

**In plain words.** Reactivation means winning back people who went quiet, like lost deals, old leads and former customers. Referral means asking happy customers to introduce you to others. Both are cheaper than finding new people from scratch.

**You'll be able to.**
- Pick the right reactivation pool and time window
- Write a reactivation message that gives a new reason to talk
- Build a reactivation flow from HubSpot to lemlist with safe rules
- Set up a referral ask triggered by a green health score

**What's shown.**
1. **Reactivation** means getting back in touch with people who stopped talking to you. Three pools. Lost deals (lost 3 to 12 months ago, with a reason that might have changed, like timing or budget). Closed lost leads that never replied. Former customers.
2. Pick by lost reason. "Timing" and "budget" are worth reactivating. "Chose a competitor" is worth it near their contract end. "Not a fit" stays closed. This is why Module 10 made lost reason a required dropdown.
3. A new reason, every time. "Just checking in" fails. Use something that changed. A new feature that solves their stated objection, a new case study in their industry, a signal from Module 5 (they're hiring planners again, they opened a new depot).
4. The message shape. Remind them of the last conversation in one line, name the change, ask one low effort question. "When we spoke in March, the blocker was the cost of moving from your TMS. We now import TMS data in a day. Would a 10 minute look at how that works be useful?"
5. Screen demo, the flow. In HubSpot, create a saved view of deals in Lost with close date 3 to 12 months ago and lost reason timing or budget. In n8n, a monthly schedule reads that view's deals and their contacts through the HubSpot node, checks `Do not contact` is false, writes the reason and the change into a sheet, and adds them to a lemlist reactivation campaign with two steps. The owner reviews the list in the sheet before the campaign starts sending.
6. Rules. Never reactivate someone who opted out. Check the legal basis still holds (Module 2), since time passing can weaken it. Check the whole history first, so you never contradict what was said before.
7. **Referral flows.** When a customer turns green (lesson 11.4) and has passed first value, the owner gets a task to ask for a referral. Make the ask specific. "Do you know one other planning lead at a transport firm who still plans in Excel?" Track referrals as a lead source so you can measure them.
8. Close the loop. Every reactivated or referred deal gets its source recorded, so Module 12 can show which flow brings pipeline.

**Do it now.** In the practice pipeline, filter the Lost deals by lost reason and count how many would enter your reactivation pool under the rule from step 2.

#### Quiz 11 (pass 80%)

1. What does allbound mean?
   A. Sending to everyone on your list
   B. Joining inbound and outbound, so a signal on one side starts a well timed action on the other
   C. Only doing inbound
   D. Using every channel at once
   **Answer.** B. **Why.** That's the definition used in this course. **Rewatch.** 11.1

2. A Tier 1 company fills in the demo request form. What should happen?
   A. They get added to a 6 step cold sequence
   B. The owner gets an alert and a task, and a person replies within the time target
   C. Nothing until the weekly review
   D. An automated email with a price list only
   **Answer.** B. **Why.** High fit, high intent leads get a fast human reply. **Rewatch.** 11.1

3. True or false. A visit to your pricing page from a company that doesn't fit your ICP should trigger an outbound message.
   **Answer.** False. **Why.** A visit is an intent signal. Act only when fit is also there. **Rewatch.** 11.2

4. Which opener is better after a pricing page visit?
   A. "I saw you on our pricing page yesterday."
   B. A message about the topic people usually ask about on that page, with no mention of the visit
   C. "Re: your visit"
   D. No message, ever
   **Answer.** B. **Why.** Use the topic, not the surveillance. Fake "Re:" subjects are banned. **Rewatch.** 11.2

5. What is "first value"?
   A. The first invoice paid
   B. The moment a new customer first gets what they paid for
   C. The first meeting
   D. The highest priced deal
   **Answer.** B. **Why.** Onboarding steps all lead towards it. **Rewatch.** 11.3

6. Which signal is usually the strongest in a software customer's health score?
   A. Their logo colour B. Actual product usage C. Company age D. How often you email them
   **Answer.** B. **Why.** Customers who use the product tend to stay, which is why usage counts double here. Check it against your own lost customers. **Rewatch.** 11.4

7. How do you check a health score works?
   A. Ask the CEO
   B. See whether customers who left would have shown red months before
   C. Make all weights equal
   D. Only count green customers
   **Answer.** B. **Why.** Test the score against real outcomes and adjust the signals. **Rewatch.** 11.4

8. Which lost deal should NOT go into reactivation?
   A. Lost on timing 6 months ago
   B. Lost on budget 4 months ago
   C. Lost as not a fit
   D. Lost to a competitor, contract ends next quarter
   **Answer.** C. **Why.** Not a fit stays closed. **Rewatch.** 11.5

9. True or false. "Just checking in" is a good reactivation message.
   **Answer.** False. **Why.** Every reactivation needs a new reason, something that changed. **Rewatch.** 11.5

10. When should the referral ask happen?
   A. In the first sales call
   B. When the customer is green and has reached first value
   C. When the customer is red
   D. Never
   **Answer.** B. **Why.** Happy customers who've seen results are the ones who refer. **Rewatch.** 11.5

#### Assignment 11. One inbound to outbound flow and one reactivation flow

**Goal.** Build two live flows, one that turns a form fill into an enriched, routed, followed up lead, and one that reactivates lost deals with a new reason.
**Time.** 3 hours.
**You need.** HubSpot (forms, CRM from Module 10), n8n, lemlist, Google Sheets, the practice pipeline or your own lost deals, your Module 9 and 10 flows.

**Steps.**
1. Draw both flows as boxes first, with time targets and conditions on each arrow.
2. Build the HubSpot form (steps in lesson 11.1) with one routing question and a clear consent line. Publish it on a test page or use the share link.
3. In n8n, build the inbound flow. Trigger on new submissions, enrich, score, then a Switch with three paths, demo request from a fit company (alert and one hour task), download from a fit company (add to an inbound lemlist campaign and tell the owner), not a fit (polite reply, log only). Reuse your Module 10 routing.
4. Write the inbound lemlist campaign, two or three steps, starting with what they asked for.
5. Log form time and first reply time for each test. Test with three submissions, one per path.
6. For reactivation, add or confirm a required `Lost reason` dropdown in HubSpot. Import or mark at least 10 lost deals (practice pipeline is fine).
7. Create the HubSpot view, Lost, closed 3 to 12 months ago, reason timing or budget.
8. Build the n8n reactivation flow. Monthly schedule, read the view, check `Do not contact`, write each deal with its new reason into a review sheet, and only add rows marked `approved` to a two step lemlist reactivation campaign.
9. Write the reactivation messages with a real new reason for your market (lesson 11.5).
10. Run it once. Approve two rows, confirm only those two reach lemlist. Do not send to real people from practice data. Pause the campaign after confirming.

**Hand in.**
- Both flow drawings
- n8n exports (JSON) and canvas screenshots for both flows
- A screenshot of the form, and the log rows for the three inbound tests showing time to first reply
- The inbound and reactivation message texts
- The reactivation review sheet showing approved and not approved rows, and a lemlist screenshot showing only approved leads

**Marking rubric.**

| Criterion | 0 | 1 | 2 | Must? |
|---|---|---|---|---|
| Inbound flow routes by fit and intent | Everything treated the same | Two paths, or paths not tested | Three paths built and tested, reusing enrichment and routing | Must |
| Speed to lead measured | Not measured | Target written but not logged | Target per path, form and reply times logged for each test | |
| Reactivation pool chosen by lost reason and window | Everyone lost | Window or reason missing | Both rules applied, not a fit excluded | Must |
| Every reactivation has a new reason | "Checking in" | Generic reason for all | A specific change per group, tied to the lost reason | Must |
| Safety, opt outs and a review step | No do not contact check, sends unreviewed | One of the two | Do not contact checked and a human approval step before lemlist | Must |
| Clear drawings and logs | Missing | Partial | Both flows drawn with conditions, every run logged | |

**Good example.** Kofi's inbound flow sends a demo request from a fit test company to the AE in Slack within two minutes, with fleet size, tool and country, and a one hour task. His log shows the human reply at 38 minutes. His reactivation sheet lists 9 lost deals from the practice pipeline, timing or budget, with a column "what changed" filled per row, such as "budget lost in Q1, their new financial year starts in July". Only the two rows he marked approved appear in lemlist, and the campaign is paused.

**Bad example.** Iris adds every lost deal from the last two years into a campaign with the message "Hi, just checking in to see if anything has changed". No reason filter, no new reason, no review step, and two contacts marked do not contact were included. Three musts fail.

**Stuck?**
1. **Form submissions don't reach n8n.** The HubSpot private app lacks the forms or contacts scope, or the trigger reads the wrong form. Add the scope, check the form ID in the form's URL, submit a fresh test.
2. **The lemlist step fails with an error.** The campaign ID or the lead fields don't match what lemlist expects. Open the lemlist API documentation, check the required fields, and test one lead with a fixed value first.
3. **Lost deals have no lost reason.** Old data didn't require it. Fill it from the deal notes for your 10 practice deals, and make the field required on the Lost stage so it doesn't happen again.

### Module 12. Measuring it

**Goal.** Measure the engine honestly, with conversion by stage, a weekly scorecard, a simple forecast and a live dashboard.
**Time.** 50 minutes of video, plus 3 to 4 hours of assignment.
**You need.**
- The practice pack's pipeline (60 deals) or your own CRM's deal export
- Your lemlist campaign results from Module 8 (or the practice numbers given in lesson 12.3)
- Google Sheets and Looker Studio (free with a Google account)
- Your HubSpot CRM from Module 10

#### Lesson 12.1 Pipeline analysis and conversion by stage (10 min)

**In plain words.** Your pipeline tells you where deals get stuck. By counting how many deals reach each stage and how many move on, you find the one step that loses the most, and that's where you work next.

**You'll be able to.**
- Prepare a deal export so every deal shows the furthest stage it reached
- Calculate conversion from each stage to the next
- Find the biggest leak and say what you'd test to fix it

**What's shown.**
1. **Conversion rate** is the share of things that move to the next step, like meetings that become proposals. **Pipeline analysis** means studying the pipeline to find where deals get stuck or lost.
2. The trap. A normal export shows each deal's current stage. A lost deal shows "Lost", which hides how far it got. So first add a column `furthest stage reached`. In HubSpot, the deal's stage history (or the "date entered stage" properties) gives it. In the practice pack it's already a column.
3. Screen demo. Open the practice pipeline in Sheets. Make a small table with stages down the side (New, Meeting booked, Discovery done, Demo done, Proposal sent, Won). Next to each, count deals that reached at least that stage. Give each stage a number (1 to 6) in a lookup tab, add a `stage_number` column, then use `=COUNTIF(stage_number_column,">="&B2)` where B2 is the stage's number.
4. Conversion to next stage is the next row's count divided by this row's count. Format as a percentage.
5. Time in stage. Average days between entering one stage and the next. A stage where deals sit far longer than the others is a leak even if they don't get lost.
6. Split it. Run the same table by segment (country, ICP tier, lead source) and by seller. A leak that only shows in one segment points at the ICP. A leak that only shows for one seller points at coaching.
7. Read it with care. A stage with five deals in it can swing wildly. Write the count next to every percentage, always, so nobody gets excited about 100% of 2.
8. Turn the leak into an action. "Discovery done to Demo done is the biggest drop. Lost reasons show 'no decision maker'. Test, require the decision maker named before Discovery done (Module 10 exit criteria) for one month."

**Do it now.** Build the stage conversion table for the practice pipeline and write one sentence naming the biggest leak and your test.

#### Lesson 12.2 The weekly scorecard (9 min)

**In plain words.** A scorecard is the short list of numbers you check every week, always the same ones, in the same order. It shows in five minutes whether the engine is healthy and which part needs work.

**You'll be able to.**
- Set up the eight line weekly scorecard
- Explain why each line is there and what it tells you
- Fill it from lemlist and HubSpot in under 20 minutes

**What's shown.**
1. A **scorecard** is a short list of the few numbers you check every week. A **dashboard** is a page of charts that shows the same and more, which you'll build in lesson 12.5.
2. The scorecard Astra uses, line by line. Invites or messages sent. Accepts (LinkedIn invites accepted). First messages sent within 2 days of the accept. Positive replies. Meetings booked. Meetings held with the decision maker. Proposals sent. Wins and their value.
3. Why each line. Sent shows effort. Accepts show whether your targeting and profile look right. First messages within 2 days shows discipline, since an accept that waits a week goes cold. Positive replies show the message works. Booked against held shows no shows. Held with the decision maker shows you're talking to people who can buy. Proposals and wins show money.
4. The ratios matter more than the totals. Next to the counts, show accepts divided by invites, positive replies divided by people messaged, meetings booked divided by positive replies, and so on. A drop in one ratio tells you which step to look at.
5. Screen demo, the sheet. One row per week, one column per line, then the ratio columns. A notes column for what you changed that week (new message, new segment). Without the notes you can't explain the numbers later.
6. Screen demo, where each number comes from. lemlist campaign reports for sent, accepts and replies (and your reply tags from Module 8 for positive). HubSpot deals for meetings, proposals and wins (filter by the date the deal entered each stage, within the week).
7. Same day, same time, every week. Fill it before Monday's planning so the numbers decide the week.
8. Astra's own example, used honestly. Over 14 July to 25 October 2026, 330 researched cold first messages went out and 26 people said yes, about 7.9%. Seven meetings were booked by 25 October. No paid project had closed yet, so the wins line was zero. A scorecard shows that plainly, and that's the point.

**Do it now.** Copy the scorecard template, fill one week from your Module 8 campaign (or the practice numbers), and write one line in the notes column.

#### Lesson 12.3 Reading reply rates without fooling yourself (11 min)

**In plain words.** Reply rates are easy to make look good and easy to misread. This lesson shows the five common ways people fool themselves and how to read the number honestly.

**You'll be able to.**
- Calculate reply rate and positive reply rate with the right denominator
- Spot small sample, mixed change and cherry picking problems
- Write a result in a way someone else could check

**What's shown.**
1. **Reply rate** is replies divided by people messaged. **Positive reply rate** is replies that show interest divided by people messaged. Always count people, not emails, because one person gets three emails.
2. Trap 1, counting the wrong replies. Out of office, "wrong person" and "remove me" are replies. Report them separately. Your headline is positive replies.
3. Trap 2, the wrong denominator. Leads who bounced or never got a message don't count. People still mid sequence haven't had the full chance to reply. Wait until the sequence finishes, or compare at the same day after the first message.
4. Trap 3, small samples. With 40 people messaged, one reply moves the rate by 2.5 points. So 3 replies against 1 reply in an A/B test of 40 each is very likely luck. The course rule is to wait for at least 100 people per version and a clear gap before calling a winner, and to say "early sign" before that.
5. Trap 4, changing two things at once. Astra's own numbers show this. In September, 4% of people messaged said yes. In October, 119 first pitches went out, 30% replied and 15% said yes. But several things changed over those weeks, from the lists to the openers to the research. So the honest reading is "October went better", and nobody can say "the new opener tripled yeses". To know which one did it, change one thing at a time.
6. Trap 5, cherry picking. Showing the best week or the best segment and calling it the result. Always show the whole period, then the breakdown.
7. Look past the yes. Astra found that consumer businesses said yes and couldn't pay, while B2B companies with a budget were the ones worth meeting. A positive reply rate that goes up while meetings with buyers stay flat means the yeses are from the wrong people. Follow every rate down to meetings held with a decision maker.
8. Screen demo, a results line. Write results like this, with every number checkable. "Version A, 112 people messaged 3 to 14 March, 9 positive replies (8.0%), 2 meetings held. Version B, 108 people, 5 positive (4.6%), 1 meeting held. Early sign for A, not proven, rerun on the next 200."
9. Before you report a number, rebuild it from the source (lemlist and HubSpot), not from your notes. Check the arithmetic closes, for example positive plus not now plus no plus auto replies plus no reply equals people messaged.

**Do it now.** Take your Module 8 results (or these practice numbers, 60 messaged, 9 replies of which 3 out of office, 2 "no", 1 "wrong person", 3 positive) and calculate reply rate and positive reply rate, then write a results line in the format from step 8.

#### Lesson 12.4 Forecasting basics (9 min)

**In plain words.** A forecast is your best estimate of what will be sold this month or quarter. The simple way multiplies each deal's value by its chance of closing, using chances from your own history rather than guesses.

**You'll be able to.**
- Calculate win rates from each stage using past deals
- Build a weighted pipeline forecast in Sheets
- Use forecast categories (commit, best case, pipeline) and say how sure you are

**What's shown.**
1. A **forecast** is your best estimate of what will be sold in a period. A **weighted pipeline** is the sum of each open deal's value times its chance of closing.
2. Where the chances come from. Use closed deals only (won plus lost). For each stage, win rate from that stage equals deals that reached it and were won, divided by all closed deals that reached it. Use the `furthest stage reached` column from lesson 12.1 and COUNTIFS.
3. Screen demo. On the practice pipeline, build a small table of stage and win rate from that stage. Then on the open deals, add a `probability` column with a VLOOKUP to that table, and a `weighted value` column, value times probability. Sum it.
4. Add a time filter. Only deals with an expected close date in the period count towards that period's forecast. A deal with no close date isn't in any forecast.
5. **Forecast categories**, the second view. Commit means the seller would bet on it this period (verbal yes, paperwork moving). Best case means it could close if things go well. Pipeline means open but not this period. Report commit, then commit plus best case, next to the weighted number.
6. Compare the two. If the sellers' commit is far above the weighted number, ask what they know that the history doesn't. If it's far below, ask what they're worried about. The gap is the conversation.
7. Small history warning. With 60 deals, win rates by stage are rough. Say so on the forecast ("based on 60 deals, last quarter") and update them every quarter.
8. Check last period's forecast against what actually closed. That's how you learn whether your method is too hopeful.

**Do it now.** Calculate win rate from each stage on the practice pipeline's closed deals and the weighted value of its open deals. Write the number of closed deals your rates are based on next to it.

#### Lesson 12.5 A Looker Studio dashboard, click by click (11 min)

**In plain words.** Looker Studio is Google's free tool for turning a sheet into charts that update themselves. You'll connect your scorecard and pipeline sheets and build a one page dashboard someone can read in a minute.

**You'll be able to.**
- Connect Google Sheets (or a HubSpot export saved to Sheets) to Looker Studio
- Build scorecards, a stage bar chart, a trend line and a table
- Add date and segment filters and share the dashboard safely

**What's shown.**
1. A **data source** in Looker Studio is the sheet it reads from. A **dimension** is something you group by (stage, week, country). A **metric** is something you count or add up (deals, value, replies).
2. Prepare the data. Looker Studio likes one clean table per tab, one header row, no merged cells, no totals rows, dates as real dates. Make a `deals` tab (one row per deal with stage, furthest stage, value, owner, country, created date, close date) and a `weekly` tab (your scorecard rows). If you use HubSpot, export deals (Sales, Deals, Export) and paste into the `deals` tab, or connect with a connector if your setup has one.
3. Screen demo, create. Go to lookerstudio.google.com, click Create, then Report. In the Add data panel choose Google Sheets, pick your spreadsheet and the `weekly` tab, keep "use first row as headers" ticked, click Add, then Add to report.
4. Screen demo, scorecard tiles. Click Add a chart (or Insert), choose Scorecard. Set Metric to positive replies. Repeat for meetings held with the decision maker, proposals sent, and wins value. Put them in a row at the top.
5. Screen demo, add the second source. Click Resource, then Manage added data sources, then Add a data source, and add the `deals` tab.
6. Screen demo, the stage chart. Insert a Bar chart. Data source `deals`. Dimension `furthest stage reached`, metric Record Count. Sort by your stage order (add a `stage_number` column in the sheet and sort by it). This is your funnel.
7. Screen demo, the trend. Insert a Time series chart from `weekly`. Dimension week, metrics positive replies and meetings booked.
8. Screen demo, the table. Insert a Table from `deals`, filtered to open deals, columns owner, company, stage, value, close date, weighted value. Sort by close date.
9. Screen demo, filters. Click Add a control, choose Date range control, put it top right. Add a Drop down list control for country and another for owner. Test that changing them changes every chart.
10. Style for reading, not decoration. One title saying what the page answers ("Is the engine producing meetings with buyers?"). The scorecard tiles on top, trend next, funnel, then the table. Write the sample size next to any percentage.
11. Screen demo, share. Click Share, add people by email with Viewer access. Check the sheet's own sharing too, since viewers of the report may need access to the data depending on the data credentials setting. Never share a dashboard with personal data outside the people who need it.

**Do it now.** Connect your scorecard sheet to a new Looker Studio report and build the four scorecard tiles and the time series chart.

#### Quiz 12 (pass 80%)

1. Why add a "furthest stage reached" column before measuring conversion?
   A. It looks better
   B. Lost deals otherwise show as "Lost" and hide how far they got
   C. HubSpot requires it
   D. To count won deals
   **Answer.** B. **Why.** You need the furthest stage to count deals that reached each step. **Rewatch.** 12.1

2. 40 deals reached Discovery done and 22 reached Demo done. What's the conversion?
   A. 18% B. 45% C. 55% D. 82%
   **Answer.** C. **Why.** 22 divided by 40 is 55%. **Rewatch.** 12.1

3. True or false. You should always write the count next to a percentage.
   **Answer.** True. **Why.** 100% of 2 means little, and the count shows it. **Rewatch.** 12.1

4. Which line on the scorecard shows whether you're talking to people who can actually buy?
   A. Invites sent B. Accepts C. Meetings held with the decision maker D. First messages within 2 days
   **Answer.** C. **Why.** It counts meetings with the buyer, not just any meeting. **Rewatch.** 12.2

5. 200 people were messaged. 30 replied. 8 were out of office, 6 said no, 2 were the wrong person, 14 were positive. What's the positive reply rate?
   A. 15% B. 7% C. 4% D. 30%
   **Answer.** B. **Why.** 14 divided by 200 is 7%. **Rewatch.** 12.3

6. Version A got 3 positive replies from 40 people, version B got 1 from 40. What's the honest conclusion?
   A. A is three times better, switch now
   B. Too small to tell, keep testing until about 100 per version
   C. B is better
   D. Stop testing
   **Answer.** B. **Why.** One reply moves the rate 2.5 points at this size, so it's likely luck. **Rewatch.** 12.3

7. Positive replies doubled, but meetings with decision makers stayed flat. What's the most likely problem?
   A. The dashboard is broken
   B. The yeses come from people who can't buy, so check who you're targeting
   C. Reply rate doesn't matter
   D. Send more emails
   **Answer.** B. **Why.** Follow every rate down to meetings with buyers. Astra saw consumer businesses say yes and not be able to pay. **Rewatch.** 12.3

8. How do you get the probability for each stage in a weighted forecast?
   A. Use the same number for every deal
   B. From your own closed deals, won divided by all closed that reached the stage
   C. Ask each seller
   D. Use the highest number you can find online
   **Answer.** B. **Why.** History beats guesses, with the sample size noted. **Rewatch.** 12.4

9. A deal has no expected close date. Where does it go in this month's forecast?
   A. Commit B. Best case C. Nowhere until it has a close date D. Weighted at 50%
   **Answer.** C. **Why.** Only deals expected to close in the period count. **Rewatch.** 12.4

10. In Looker Studio, "country" in a chart is a...
   A. Metric B. Dimension C. Data source D. Control
   **Answer.** B. **Why.** It's something you group by. **Rewatch.** 12.5

#### Assignment 12. A dashboard and a scorecard

**Goal.** Build a weekly scorecard and a one page Looker Studio dashboard for your engine, with honest numbers and a written reading.
**Time.** 3 to 4 hours.
**You need.** The practice pipeline or your HubSpot deals, your lemlist results, Google Sheets, Looker Studio, the scorecard template.

**Steps.**
1. In Sheets, create tabs `deals`, `weekly` and `stages` (stage name and number). Clean the deals into one row per deal with `furthest stage reached` and `stage_number`.
2. Build the stage conversion table (lesson 12.1), with counts next to every percentage and average days in stage.
3. Fill the `weekly` scorecard tab with the eight lines and the ratio columns for at least two weeks (your Module 8 campaign, or the practice pack's weekly numbers). Fill the notes column.
4. Build the win rate by stage table from closed deals and a weighted forecast of open deals for one period (lesson 12.4). Note the sample size.
5. In Looker Studio, click Create, Report, add the `weekly` tab, then add the `deals` tab as a second source.
6. Build, top to bottom, a title that asks a question, four scorecard tiles, a time series, a stage bar chart sorted by stage number, and an open deals table with weighted value.
7. Add a date range control and drop downs for country and owner. Test each.
8. Click Share and give a reviewer Viewer access (and check the sheet's access).
9. Write a half page reading. The biggest leak and your test. Reply rate and positive reply rate with counts, read with the five traps in mind. The forecast with commit, best case and weighted, and how sure you are. One thing you'd change next week.

**Hand in.**
- The Looker Studio link (Viewer access) and a PDF export of the page (File, Download, PDF)
- The Google Sheet link with the `deals`, `weekly` and `stages` tabs, the conversion table and the forecast
- The half page reading

**Marking rubric.**

| Criterion | 0 | 1 | 2 | Must? |
|---|---|---|---|---|
| Conversion by stage done correctly | Uses current stage only | Furthest stage used, counts or time in stage missing | Furthest stage, counts next to every percentage, time in stage | Must |
| Weekly scorecard complete | Missing lines | Counts without ratios or notes | All eight lines, ratios, notes for at least two weeks | Must |
| Honest reading of reply rates | Only the best number shown | Right denominators but traps ignored | Right denominators, sample sizes, traps named, results line checkable | Must |
| Forecast from history | No forecast | Probabilities guessed | Win rates from closed deals, weighted plus categories, sample noted | |
| Dashboard works and reads in a minute | Broken or missing | Charts there, filters or order off | Question title, tiles, trend, funnel, table, working filters | |
| Numbers rebuilt from source and add up | Don't add up | Small gaps | Reply groups add to people messaged, deal counts match the export | |

**Good example.** Noor's dashboard title asks "Are we booking meetings with buyers?". Four tiles show positive replies 11, meetings held with decision maker 4, proposals 2, wins 0. Her funnel shows Discovery done to Demo done at 48% (12 of 25), the biggest drop. Her reading says "Positive reply rate 6.1% (11 of 180), early sign only. Biggest leak Discovery to Demo, 9 of 13 lost deals there say no decision maker. Test, decision maker named as an exit criterion for 4 weeks. Weighted forecast based on 34 closed deals, so rough."

**Bad example.** Sam's dashboard shows a single large "Reply rate 42%" tile. It counts emails rather than people, includes out of office replies, and covers only the best week. No funnel, no counts, no notes. It fails the musts on honest reading and the scorecard.

**Stuck?**
1. **Looker Studio shows dates as text.** The sheet column has text, not dates. Format the column as a date in Sheets (Format, Number, Date), then in Looker Studio click the data source and set the field type to Date.
2. **The funnel bars are in alphabetical order.** Add `stage_number` to the sheet and sort the chart by it, ascending.
3. **The scorecard and the CRM disagree.** You counted deals by created date in one place and by stage date in the other. Pick one rule (the week the deal entered the stage), write it in the notes, use it everywhere.

### Module 13. The capstone, planned, run and written up

**Goal.** Plan your capstone, run the whole engine on your market for two weeks, and keep the evidence you need for an honest case study.
**Time.** 38 minutes of video, plus 2 hours for the plan (the capstone itself is about 15 to 20 hours over 3 to 4 weeks, see the Track 1 Capstone section).
**You need.**
- Every assignment from Modules 0 to 12, passed
- Your capstone market brief from Module 0
- The capstone plan template and the evidence log template (in the course Drive folder)
- A calendar you'll actually follow

#### Lesson 13.1 Planning the capstone (9 min)

**In plain words.** The capstone is the whole engine, built and run on your own market. A good plan decides the scope, the dates, the targets and what "done" means before you start, so you spend the two live weeks running, not rebuilding.

**You'll be able to.**
- Turn your earlier assignments into a capstone checklist with what's reused and what's new
- Set a timeline with a build week, two live weeks and a write up week
- Write targets you can check, plus the one question your capstone answers

**What's shown.**
1. The capstone in one line. Build the whole engine on your market, run it for two weeks, and write it up with real numbers, including what failed. The full brief and rubric are in the Track 1 Capstone section. Read it before planning.
2. Reuse, don't restart. List every part (ICP, list of at least 100 accounts, waterfall, scoring, signals, research prompt, sequence, warmed domain, CRM with field map, one automation, dashboard). Next to each write "reuse as is", "update" or "new". Most should be reuse or update.
3. The question. A capstone answers one question, for example "Do logistics firms in Flanders with 50 to 200 staff reply to a message about Excel planning costs?" One question keeps you honest and makes the write up easy.
4. The timeline. Week 1, build and check everything, warm up running since Module 8. Weeks 2 and 3, live sending. Week 4, analysis and write up. Put each in your calendar with the day of your weekly scorecard.
5. Targets you can check. Activity targets (for example 100 accounts reached by both channels) are in your control. Result targets (positive replies, meetings held) aren't, so write them as a hope with a range, and judge yourself on the activity and the honesty of the reading.
6. **Kill criteria** are the signs you'll stop and fix before continuing. Bounce rate climbing, any spam placement in tests, a LinkedIn warning, a wrong claim found in a sent message. Write them down now so you don't argue with yourself later.
7. Risks and what you'll do. A tool trial ending mid run (check dates now), too few verified emails, no time in week 3. Each gets one line of plan B.
8. Screen demo. Fill the capstone plan template for the Routeful practice market, as an example of the level of detail expected.

**Do it now.** Make the reuse, update or new list for your capstone and write your one question.

#### Lesson 13.2 Running the two live weeks (8 min)

**In plain words.** During the live weeks you follow a daily and weekly routine so nothing slips. Replies get answered fast, numbers get logged the same way each day, and any problem stops the run before it does damage.

**You'll be able to.**
- Run a 20 minute daily routine and a weekly review
- Handle replies and meetings without breaking the engine
- Decide when to change something mid run and how to record it

**What's shown.**
1. The daily routine. Check replies and sort them (Module 8). Answer positives within one working day, after reading the whole thread. Send LinkedIn first messages to new accepts within 2 days. Check the n8n Executions tab and the error alerts. Glance at bounces and LinkedIn warnings against your kill criteria.
2. The weekly review. Fill the scorecard (Module 12). Run the hygiene views (Module 10). Write one paragraph in the evidence log on what you saw.
3. Changing things mid run. Change one thing at a time, on a set day, and write it in the scorecard notes with the date. If you change the message and the segment on the same day, you won't know which one did it (Module 12, trap 4).
4. Meetings. If you book a real meeting, treat it as real. Prepare with your research prompt, run it properly, log it in the CRM against the exit criteria. If you're using a practice market, don't book fake meetings with real people.
5. Don't fake the numbers by sending more at the end. A burst in the last two days breaks your send caps and your comparison.
6. If a kill criterion fires, pause, write down what happened, fix it, then restart. A paused week with a clear write up scores better than a run that pushed through a problem.
7. Keep everything about real people private. Your case study will use numbers and anonymised examples, never names of prospects.

**Do it now.** Put the daily routine as a recurring 20 minute block in your calendar for the two live weeks, and the weekly review on the same day as your scorecard.

#### Lesson 13.3 Documenting as you go (7 min)

**In plain words.** You can't write an honest case study from memory. You keep an evidence log while you work, with screenshots, numbers and decisions written down the day they happen.

**You'll be able to.**
- Keep an evidence log with dated entries
- Capture the screenshots and exports the hand in needs
- Write decisions with their reason, so you can explain them later

**What's shown.**
1. An **evidence log** is a dated list of what you did, what you saw and what you decided, with links to screenshots or exports.
2. Screen demo, the template. Columns. Date, part of the engine, what happened, number (if any), evidence link, decision, why.
3. What to capture as it happens. DNS check screenshots on the day you check them. The lemlist sequence before launch. The n8n canvas and a successful execution. The CRM pipeline and field map. The dashboard at the end of each week. A copy of every message version.
4. Write it the same day. A note written a week later carries the conclusion and loses the evidence. Write the number and where it came from ("lemlist campaign report, 14 March, 64 people messaged").
5. Mistakes go in too. "Sent 6 emails with a blank company name, caught on 12 March, fixed the variable fallback." These become the best part of the case study.
6. Back it up. Keep everything in one Drive folder named `Capstone [your name] [market]`, with subfolders per part.

**Do it now.** Create the capstone Drive folder, copy the evidence log template into it and write the first entry, today's plan.

#### Lesson 13.4 Writing the case study with numbers (8 min)

**In plain words.** A case study tells the story of your capstone in a page or two. It states the question, what you built, what happened in numbers, and what you'd do next. An employer or client should be able to check every number.

**You'll be able to.**
- Structure a case study in six short parts
- Present numbers with their counts, period and source
- Write a results section that someone could check

**What's shown.**
1. The six parts. The question and the market. What was built (one short paragraph per part, with screenshots). What ran (dates, volume, channels). What happened (the scorecard and the funnel, with counts). What didn't work (lesson 13.5). What's next.
2. Numbers, the format. Count, then rate, then period, then source. "180 people messaged by email and LinkedIn between 3 and 14 March, 11 positive replies (6.1%), 4 meetings held with decision makers. Source, lemlist and HubSpot exports, attached."
3. Show the whole funnel, not just the best number. Sent, accepts, replies by group, positive, meetings booked, held with decision maker, proposals, wins. Zeros stay in. Astra's own case shows seven meetings and no paid project closed by 25 October, and says so.
4. Claims about cause need care. "After changing the opener, positive replies went from X to Y" is fine. "The opener caused it" needs one change at a time and a big enough sample.
5. Make it readable in three minutes. A summary of three sentences at the top, then the six parts. Screenshots with a one line caption each.
6. Anonymise. No prospect names, no screenshots with real names or emails visible. Blur them or use the practice pack.
7. Screen demo, a short example case study for the Routeful practice market, read through part by part.

**Do it now.** Write the three sentence summary your case study would have if the run went the way you hope, then the version if it went badly. Both should be honest and specific.

#### Lesson 13.5 Writing up what didn't work (6 min)

**In plain words.** Every real build has parts that failed. Writing them up clearly shows an employer or client that you can judge your own work, which is the skill they're paying for. It's the section reviewers read most closely.

**You'll be able to.**
- Name each failure with what happened, why and what you changed
- Separate what failed from what you couldn't measure
- Turn failures into the "what's next" plan

**What's shown.**
1. The format for each failure. What happened, with a number. Why you think it happened, and how sure you are. What you changed, or would change. "Waterfall found emails for 58 of 120 contacts (48%). Most misses were small family firms with no public team page. Next time, start with LinkedIn for that segment."
2. Types of failure to look for. Data (low find rate, wrong titles). Targeting (replies from people who can't buy). Message (no replies, or replies that misunderstood). Tech (a flow that broke, a duplicate send). Process (you missed the 2 day window on accepts).
3. Didn't work versus can't tell. Low numbers from a small sample are "can't tell yet", not a failure. Say which is which.
4. Astra's example. Early on, consumer businesses said yes to the offer but couldn't pay. That was written down, and the targeting moved to B2B companies with budget. A research gate and a falsification pass, trying to prove each claim wrong before sending, were added because wrong claims had been caught. These are the kind of lessons a reviewer wants to read.
5. No excuses, no drama. Short facts and the change you made.

**Do it now.** Write up one thing that didn't work in any earlier assignment, in the three part format.

#### Quiz 13 (pass 80%)

1. What's the best first step when planning the capstone?
   A. Rebuild everything from scratch
   B. List each part and mark it reuse, update or new
   C. Buy new tools
   D. Write the case study
   **Answer.** B. **Why.** Most parts come from earlier assignments. **Rewatch.** 13.1

2. True or false. Result targets like "10 meetings" should be how you judge whether your capstone passed.
   **Answer.** False. **Why.** Results aren't fully in your control. Judge on activity and an honest reading. **Rewatch.** 13.1

3. What are kill criteria?
   A. Reasons to delete a lead
   B. Signs written in advance that make you stop and fix before continuing
   C. The end date
   D. Lost reasons
   **Answer.** B. **Why.** They stop a problem doing damage. **Rewatch.** 13.1

4. In week 2 you want to change both the message and the segment. What should you do?
   A. Change both today
   B. Change one, on a set day, and write it in the notes
   C. Change nothing ever
   D. Change both and don't record it
   **Answer.** B. **Why.** One change at a time is the only way to know what worked. **Rewatch.** 13.2

5. A spam test shows your emails landing in spam in week 2. What do you do?
   A. Send more to make up for it
   B. Pause, record it, fix it, restart
   C. Ignore it
   D. Switch to your main domain
   **Answer.** B. **Why.** It's a kill criterion. **Rewatch.** 13.2

6. Why write the evidence log the same day?
   A. It's faster
   B. Notes written later keep the conclusion and lose the evidence
   C. The template requires it
   D. To use more screenshots
   **Answer.** B. **Why.** You need the number and its source, not only what you remember. **Rewatch.** 13.3

7. Which results line is written well?
   A. "Great reply rate!"
   B. "180 people messaged 3 to 14 March, 11 positive replies (6.1%), source lemlist export"
   C. "6.1% reply rate"
   D. "Lots of interest from logistics"
   **Answer.** B. **Why.** Count, rate, period and source. **Rewatch.** 13.4

8. True or false. A low positive reply count from 30 people is a clear failure of the message.
   **Answer.** False. **Why.** It's too small to tell. Say "can't tell yet". **Rewatch.** 13.5

9. What three parts does each "didn't work" item have?
   A. Who, where, when
   B. What happened with a number, why and how sure, what you changed
   C. The tool, the price, the plan
   D. A screenshot, a quote, a chart
   **Answer.** B. **Why.** That's the format reviewers look for. **Rewatch.** 13.5

#### Assignment 13. The capstone plan

**Goal.** Write a capstone plan good enough that someone else could check your run against it.
**Time.** 2 hours.
**You need.** All earlier assignments, your Module 0 market brief, the capstone plan template, the evidence log template, the Track 1 Capstone brief and rubric below.

**Steps.**
1. Read the Track 1 Capstone brief and rubric in full.
2. Copy the capstone plan template into your capstone Drive folder.
3. Write your market and your one question (lesson 13.1).
4. Fill the parts table. For each of the 11 parts, reuse, update or new, the earlier assignment it comes from, and what you'll change.
5. Write the timeline with dates. Build week, two live weeks, write up week. Add the daily and weekly routine slots to your calendar.
6. Write activity targets (accounts, people reached per channel, send caps per week) and result hopes as ranges.
7. Write at least four kill criteria and what you'll do if each fires.
8. Write the risk list with a plan B for each, including every tool trial end date.
9. Check the legal side for each country in your market (Module 8 lesson 8.5) and write the channel rule. Not legal advice, check your country.
10. Set up the evidence log and write the first entry.

**Hand in.**
- The capstone plan (Google Doc link) with the question, parts table, timeline, targets, kill criteria, risks and country rules
- A screenshot of the calendar showing the routine slots
- The evidence log link with at least one entry

**Marking rubric.**

| Criterion | 0 | 1 | 2 | Must? |
|---|---|---|---|---|
| One clear, checkable question | None | Vague ("does outbound work?") | Specific market, persona and problem | Must |
| Parts table covers every capstone part | Parts missing | All listed, changes not described | All 11 parts with source and planned change | Must |
| Dated timeline with routine | None | Weeks only | Dates for every phase, routine in the calendar | |
| Targets and kill criteria | Missing | Targets only, or vague kill criteria | Activity targets, result ranges, four or more specific kill criteria with actions | Must |
| Risks, trial dates and country rules | Missing | Some | Every tool's trial end checked, plan B per risk, channel rule per country | |

**Good example.** Ravi's plan asks "Will operations directors at Dutch cold storage firms with 30 to 150 staff reply to a message about failed temperature audits costing them contracts?" His parts table shows 7 parts reused, 3 updated (new segment filter, new research prompt line, new email 1) and the dashboard rebuilt for the new question. His kill criteria include "any mail-tester score drop, pause the same day" and "a sent message found with a claim the research didn't prove, stop and recheck the next 20". His lemlist trial ended mid run, so his plan B was to start the paid plan on day 1 of week 2 or move the run a week.

**Bad example.** Eva's plan says "Run the engine and see what happens. Aim for 20 meetings." No question, no parts table, no dates, no kill criteria. It fails three musts, and her 20 meeting target is a result she can't control.

**Stuck?**
1. **Your question is too broad.** It doesn't name a persona or a problem. Add both, and narrow the market to one country and one size band.
2. **Your list is too small for 100 accounts after filters.** Widen one filter at a time (size band or region) and note the change, or return to Module 3 and build the second source.
3. **A tool trial ends before the live weeks.** Check every trial date now. Start the trial later, plan the paid month, or switch to the free alternative named in Module 0.

### Module 14. Getting hired or getting clients

**Goal.** Turn your builds into a portfolio, a profile and interview answers that get you a GTM engineering job or your first paid client.
**Time.** 46 minutes of video, plus 4 hours of assignment (including a 90 minute timed task).
**You need.**
- Your passed assignments and capstone case study (or the capstone plan, if you're doing this module before the capstone ends)
- A free page builder or document tool for the portfolio (Notion, Google Sites, or a simple one page site)
- Your LinkedIn profile
- A timer and a quiet 90 minutes

#### Lesson 14.1 What employers actually test (9 min)

**In plain words.** Companies hiring a GTM engineer want to see that you can build things that work, explain them to sales people, and judge your own results honestly. This lesson shows the usual hiring steps and what each one checks.

**You'll be able to.**
- Name the usual steps in a GTM engineer hiring process
- Match each of your assignments to a skill employers test
- Spot a job ad that's really an SDR role with a new title

**What's shown.**
1. A **GTM engineer** builds the systems behind selling, the lists, data, automations and dashboards. Employers want proof you've done it, not a certificate alone.
2. The usual steps. A screening call (can you explain what you do simply?). A hiring manager interview (have you built real things, and how do you think?). A take home task or live build (can you actually do it?). A team or stakeholder chat (can sales people work with you?). Each company differs, ask the recruiter what the steps are.
3. The five skills they test, and where you learned each. Data and lists (Modules 2 to 4). Scoring and targeting judgement (Modules 1 and 5). Automation and APIs (Module 9). CRM and process (Module 10). Measuring honestly (Module 12). Plus one that runs through all of them, explaining your work to people who don't build.
4. Screen demo, reading job ads. Highlight the tools named, the systems they mention (CRM, sequencer, data providers), and the outcomes they expect. Signs it's really an SDR job are a meetings quota, cold calling hours and no mention of building anything. That can still be a fine job, just know which one you're applying for.
5. What makes you stand out. Working links, not screenshots alone. Numbers with counts. A clear "what didn't work". Showing you checked data before trusting it.
6. Raka hired and worked with people in these roles, at Betty Blocks across SDR, AE, marketing and RevOps, and at HEINEKEN across 23 markets. The pattern was always the same, people who showed a working build and explained it plainly beat people with longer CVs.
7. Make a skills table. Left column the five skills, middle your assignment that proves it, right a link.

**Do it now.** Find three real GTM engineer or RevOps job ads in your country. For each, highlight the tools and systems named and write which of your assignments shows that skill.

#### Lesson 14.2 The take home task (9 min)

**In plain words.** Many employers send a task to do at home, often with a time limit, like "build a list and a sequence for this market" or "design our lead routing". This lesson gives you a method for doing it well under time pressure.

**You'll be able to.**
- Read a take home brief and write down the assumptions before building
- Split the time into understand, build, check and explain
- Hand in a short, clear answer with a one page cover note

**What's shown.**
1. A **take home task** is a piece of work you do on your own time for an employer, to show how you'd do the job.
2. The time split for a 90 minute task. 10 minutes reading and writing questions and assumptions. 50 minutes building. 15 minutes checking (try to prove your own output wrong, rebuild one number from source, check five rows by hand). 15 minutes writing the cover note.
3. Assumptions are part of the answer. If the brief doesn't say the market size or the tools, write "I assumed X because Y" and keep going. Ask the employer a question if it truly blocks you, but don't wait for an answer.
4. Typical tasks, and which module covers them. Build an ICP and 50 accounts (Modules 1 and 3). Design an enrichment waterfall with cost per row (Module 4). Write a 3 step sequence for a persona (Module 7). Design lead routing for a team (Module 10). Look at a pipeline export and say what's wrong (Module 12).
5. The cover note, one page. The goal as you understood it. Your assumptions. What you built, with links. How you checked it. What you'd do with more time. What you'd watch out for.
6. Screen demo, a worked example. A 90 minute task for the Routeful practice company, "Design how inbound demo requests should be handled for our team of six." Show the drawing, the routing table with a fallback, the n8n sketch, and the cover note.
7. Don't overbuild. A simple thing that works and is clearly explained beats a big thing that half works.
8. Never use the employer's data outside the task, and never put a real company's data into a public tool without permission.

**Do it now.** Write the cover note headings for the worked example in step 6, and fill the assumptions section for it in 5 minutes.

#### Lesson 14.3 Your portfolio page and LinkedIn profile (10 min)

**In plain words.** A portfolio page shows your three best builds on one page, each with the problem, what you built and the result. Your LinkedIn profile points people to it. Together they do the talking before you get a call.

**You'll be able to.**
- Build a one page portfolio with three builds and a case study
- Write each build as problem, build, result, what I'd change
- Update your LinkedIn headline, about section and featured links

**What's shown.**
1. A **portfolio** is a set of your work that shows what you can do.
2. Pick three builds. The capstone case study first. Then two others that show different skills, for example the n8n flow (automation) and the CRM with field map (process), or the dashboard (measuring).
3. Each build gets four short parts. The problem in one sentence. What you built, with a screenshot and a link. The result with a number and a count. What you'd change.
4. Screen demo, Google Sites. Open sites.google.com, click the blank site, type your name as the title. Add a short intro (who you are, what you build, what you're looking for). Insert, then Text box for each build, Insert Image for screenshots, Insert Link for the build links. Click Publish, choose a web address, and check it on your phone.
5. Privacy. Blur names and emails in every screenshot. Use the practice pack or anonymised data. Remove any API keys from exported workflows. Check every link opens without a login for a stranger (try in a private browser window).
6. LinkedIn, the headline. Say what you build and for whom, plainly. "GTM engineer. I build outbound, CRM and data systems for B2B sales teams." No buzzwords, no list of ten tools.
7. LinkedIn, the about section. Three short paragraphs. What you do. One build with a number. What you're looking for and how to reach you.
8. LinkedIn, featured. On your profile, click Add section (or the featured area), add your portfolio link and the case study. Add the tools you really used to the skills section.
9. Post your capstone. A short post on what you built, one thing that worked and one that didn't, with the portfolio link. Plain, no hype.

**Do it now.** Write the four parts (problem, build, result, change) for your strongest build in under 120 words.

#### Lesson 14.4 Pricing your first freelance build (8 min)

**In plain words.** If you want clients instead of a job, you need to scope and price a build. This lesson gives a simple method, without numbers to copy, because rates differ by country, experience and client.

**You'll be able to.**
- Scope a build into clear parts with a written "not included" list
- Choose between a fixed price, a day rate and a monthly retainer
- Write a one page proposal with the price, timeline and what the client provides

**What's shown.**
1. **Scope** means exactly what you'll build and what you won't. Most freelance trouble starts with a vague scope.
2. Start small and paid. A first project that's a single build (a waterfall, a routing flow, a dashboard) is easier to sell and deliver than "build our whole engine". A short paid audit of their current setup is a good first step.
3. Three ways to price. Fixed price for a clear scope, so the client knows the cost and you carry the risk of overrunning. Day rate when the scope is unclear, so the client carries that risk. Monthly retainer for running and maintaining the engine after the build.
4. The method for a fixed price. List the parts. Estimate hours for each, honestly. Add time for meetings, checking and fixes (beginners usually forget this). Multiply by your day or hour rate. Then ask whether the number makes sense next to what the build is worth to the client.
5. Finding your rate. Look at what freelancers with similar experience in your country charge, ask people in the community, and check job ads for salary ranges as a reference. Raise it after each successful project. This course doesn't give a number because any number would be wrong for half of you.
6. Tool costs. Clay credits, lemlist seats, n8n hosting and domains are the client's costs, on the client's accounts. Say so in the proposal. Never run a client's engine on your own paid accounts.
7. The one page proposal. Their goal in their words. What you'll build (parts). Not included. What they provide (access, data, a contact person). Timeline. Price and payment terms. What happens after (handover, retainer option).
8. Handover is part of the job. The field map, the flow notes from Module 9 and a short video walk through. A client who can run it without you will come back and refer you.

**Do it now.** Scope a first build for the Routeful practice company, "a lead routing flow for inbound demo requests", into parts with hours and a not included list. Don't fill in a rate.

#### Lesson 14.5 Interview questions to expect, with model answers (10 min)

**In plain words.** GTM engineer interviews ask the same kinds of questions again and again. This lesson gives you the common ones and a model answer for each, built from your own course work. Practise them out loud.

**You'll be able to.**
- Answer the eight most common questions using your own builds
- Use the situation, build, result, lesson shape for any "tell me about" question
- Answer a question you don't know without bluffing

**What's shown.**
1. The answer shape for "tell me about a time" questions. Situation (one sentence). What you built (two or three sentences). Result (a number with a count). Lesson (one sentence).
2. **"What does a GTM engineer do?"** Model answer. "I build the systems that help a sales team find the right accounts and reach them at the right time. That's lists and enrichment, scoring and signals, sequences, the CRM and the automations between tools, and the dashboard that shows whether it works. The goal is that selling runs on a system instead of on memory."
3. **"Walk me through an enrichment waterfall you built."** Model answer. "For my capstone I needed work emails for 120 contacts. Clay tried the first provider, and only if it found nothing, the second, then a third. Then every email was verified. It found 58 percent, and the cost per found email came out lower than using the best provider alone. Misses were mostly small family firms, so next time I'd start with LinkedIn there." (Use your own numbers.)
4. **"How would you score leads for us?"** Model answer. "I'd split fit and intent. Fit from firmographics that match your best customers, checked against won and lost deals. Intent from signals like hiring for the role we help, a new tool or visits to key pages. I'd start simple, a few signals with points, and check every month whether high scores actually turn into meetings."
5. **"A campaign's reply rate dropped by half. What do you do?"** Model answer. "First I'd check it's real, same denominator, same point in the sequence, enough people. Then deliverability, bounces, spam tests, DNS records. Then the list, did the segment or the data source change? Then the message. I'd change one thing at a time."
6. **"How do you keep the CRM clean?"** Model answer. "Fewer fields with fixed values, a written field map, a dedup rule with a match key and a survivor rule, routing with a fallback so nothing's unowned, and a weekly 20 minute check of three saved views with an owner."
7. **"When wouldn't you automate something?"** Model answer. "When the steps change each time, the data's messy, or a mistake can't be undone. A first message to a prospect is my example. A person reads it before it goes."
8. **"How do you use AI in your work?"** Model answer. "For research and drafts, with prompts that ask for the source of every claim. Then I check the claims myself and try to prove them wrong before anything goes out. AI gets things wrong confidently, so the check is part of the process."
9. **"What's something that didn't work?"** Use your capstone's best "didn't work" item in the three part format from lesson 13.5.
10. When you don't know. Say so, then say how you'd find out. "I haven't used that tool. I'd read its API documentation, build a small test with two records, and check the output by hand before using it on real data." Never bluff about a tool.
11. Questions to ask them. What's the first thing you'd want built? What tools and data do you have today? Who owns the CRM? How will you measure this role after six months?

**Do it now.** Record yourself answering questions 2, 5 and 9 on your phone, each under 90 seconds, using your own builds. Watch it back once and note one thing to change.

#### Quiz 14 (pass 80%)

1. What do employers most want to see from a GTM engineer candidate?
   A. A long list of tools
   B. Working builds explained plainly, with honest results
   C. A certificate only
   D. Years of cold calling
   **Answer.** B. **Why.** Proof you can build and explain beats a long CV. **Rewatch.** 14.1

2. A job ad mentions a meetings quota, cold calling hours and nothing about building systems. What is it most likely?
   A. A GTM engineer role
   B. An SDR role with a different title
   C. A RevOps director role
   D. A data science role
   **Answer.** B. **Why.** Quota and calls without building point to an SDR role. **Rewatch.** 14.1

3. In a 90 minute take home task, the brief doesn't say which CRM they use. What do you do?
   A. Stop and wait for an answer
   B. Write an assumption with a reason and keep going
   C. Skip the task
   D. Guess silently
   **Answer.** B. **Why.** Assumptions written down are part of a good answer. **Rewatch.** 14.2

4. True or false. A bigger take home build always scores better.
   **Answer.** False. **Why.** A simple build that works and is clearly explained beats a big one that half works. **Rewatch.** 14.2

5. Which four parts should each portfolio build have?
   A. Logo, tool list, price, quote
   B. Problem, what you built, result with a number, what you'd change
   C. Title, date, colour, link
   D. Screenshot only
   **Answer.** B. **Why.** That's the shape that shows judgement. **Rewatch.** 14.3

6. Before publishing your portfolio, what must you check?
   A. That screenshots have no real names, emails or API keys, and links open for a stranger
   B. That it has animations
   C. That it lists every tool you've heard of
   D. Nothing
   **Answer.** A. **Why.** Privacy and working links are basic trust. **Rewatch.** 14.3

7. A client's scope is unclear and might grow. Which pricing fits best to start?
   A. Fixed price
   B. Day rate, or a short paid audit first
   C. Free work
   D. A retainer before any build
   **Answer.** B. **Why.** With an unclear scope, a day rate or a paid audit stops you carrying all the risk. **Rewatch.** 14.4

8. Whose accounts should a client's Clay, lemlist and n8n run on?
   A. Yours B. The client's C. A friend's D. Doesn't matter
   **Answer.** B. **Why.** Tool costs and data belong to the client, on their accounts. **Rewatch.** 14.4

9. An interviewer asks about a tool you've never used. What's the best answer?
   A. Say you're an expert
   B. Say you haven't used it, then explain how you'd learn and test it
   C. Change the subject
   D. Say it's a bad tool
   **Answer.** B. **Why.** Honest plus a method beats bluffing. **Rewatch.** 14.5

10. Which answer shape suits "tell me about a time you built something"?
   A. Situation, what you built, result with a number, lesson
   B. A list of tools
   C. Your CV from the start
   D. Only the result
   **Answer.** A. **Why.** It's short, concrete and checkable. **Rewatch.** 14.5

#### Assignment 14. Portfolio page and a timed mock interview task

**Goal.** Publish a portfolio page with three builds, update your LinkedIn, and complete a 90 minute timed take home task.
**Time.** 4 hours (2 for the portfolio and profile, 90 minutes for the task, 30 for the cover note check and recording).
**You need.** Your passed assignments, your capstone case study or plan, Google Sites (or similar), LinkedIn, the mock task brief below, a timer.

**The mock task brief (read it only when you start the timer).** "Routeful (practice company) has 400 contacts in a messy CRM, 2 SDRs, 3 AEs and 1 manager. Inbound demo requests sit for days, and nobody knows which leads are worth calling. In 90 minutes, design (1) a fit score for incoming leads with at most six criteria, (2) a routing rule with a fallback and a speed to lead target, (3) a sketch of the automation that runs it, naming the tools, and (4) the three numbers you'd put on the manager's weekly scorecard to know it works. Hand in one doc or sheet and a one page cover note."

**Steps.**
1. Pick your three builds (capstone first) and write the four parts for each (lesson 14.3).
2. In Google Sites, create the page, add your intro, the three builds with screenshots and links, and your contact details. Click Publish.
3. Blur every real name and email in screenshots. Open every link in a private window to check it works for a stranger.
4. Update your LinkedIn headline, about section and featured section with the portfolio link.
5. Set a 90 minute timer. Read the mock task brief. Follow the time split from lesson 14.2 (10 understand, 50 build, 15 check, 15 cover note).
6. Stop when the timer ends. Write down how far you got. Don't keep working, the time limit is part of the test.
7. Record a 3 minute video (phone or Loom) walking through your task answer as if to the hiring manager.
8. Record your answers to three of the questions from lesson 14.5, each under 90 seconds.

**Hand in.**
- The portfolio page link
- A screenshot of your updated LinkedIn headline, about and featured section
- The mock task doc or sheet and the cover note, with the start and end time written at the top
- The 3 minute walk through video and the three interview answer recordings

**Marking rubric.**

| Criterion | 0 | 1 | 2 | Must? |
|---|---|---|---|---|
| Portfolio shows three builds in the four part shape | Fewer than three, or screenshots only | Three, some parts missing | Three builds, each with problem, build, numeric result with count, change | Must |
| Privacy and working links | Real names, emails or keys visible, or broken links | Minor issues | Clean screenshots, every link opens for a stranger | Must |
| LinkedIn updated | Not changed | Headline only | Plain headline, three paragraph about, portfolio in featured | |
| Mock task answers all four parts within 90 minutes | Over time, or two or more parts missing | One part missing or thin | All four parts, fit score with six or fewer criteria, routing with fallback and target, tool sketch, three scorecard numbers | Must |
| Cover note with assumptions and checks | Missing | Present, no assumptions or checks | Goal, assumptions, links, how it was checked, what's next | |
| Explaining it out loud | No recordings | Recordings run long or read from a script | Clear, under time, uses own numbers and the answer shape | |

**Good example.** Lina's portfolio opens with "I build outbound, CRM and data systems for B2B sales teams. Three builds below, all with real numbers." Her capstone card reads "Problem, Belgian HVAC installers don't reply to generic outreach. Built, a 140 account engine with a three provider waterfall, fit and intent scoring and a 4 step sequence. Result, 96 people reached over two weeks, 5 positive replies (5.2%), 2 meetings held. Change, half the list had no work email, I'd start with LinkedIn for firms under 20 staff." Her mock task, started 14:00 and ended 15:30, has a five criteria fit score, a routing table with the manager as fallback and a one hour target for Tier 1, an n8n sketch from HubSpot form to Slack, and the scorecard numbers "median time to first reply, demo requests routed with an owner, meetings held from inbound".

**Bad example.** Daan's page lists 14 tools and shows three screenshots with real prospect names visible, no results and no links. His mock task took three hours and has no routing fallback. Three musts fail.

**Stuck?**
1. **You don't have a strong number yet.** The capstone isn't finished. Use a number from an earlier assignment (find rate, cost per row, dedup counts) and update the page after the capstone.
2. **The mock task runs over.** You spent too long building. Stop building at minute 60 whatever happens and move to checking and the cover note. An unfinished part with a clear note scores better than going over.
3. **Links ask for a login.** Google Docs and Looker Studio links are private by default. Click Share and set "anyone with the link" to Viewer, then retest in a private window.

---

## Track 1 final exam

**When.** After every module quiz and assignment from Module 0 to Module 14 is passed.
**Length.** 30 questions, 40 minutes, timed.
**Mix.** 18 knowledge questions and 12 scenarios (60% and 40%). Questions 1 to 15 cover Modules 0 to 7, questions 16 to 30 cover Modules 8 to 14.
**Pass mark.** 80%, so 24 of 30 correct.
**Retakes.** Two, at least 48 hours apart, from a different question pool. When building the platform version, write a second variant of every question for the pool (README section 5).
**After submitting.** The learner sees each answer, the one line why, and the module to rewatch for every wrong answer.

**Part 1, Modules 0 to 7**

1. **(Knowledge)** What does a GTM engineer do?
   A. Builds the systems behind selling, like lists, data, automations and dashboards
   B. Writes the company's website
   C. Signs contracts with customers
   D. Makes cold calls all day
   **Answer.** A. **Why.** GTM engineering is building the systems so selling runs on a machine instead of memory. **Module.** 0

2. **(Knowledge)** What is an ICP?
   A. A type of email tool
   B. A description of the companies most likely to buy from you and stay
   C. The price list
   D. A list of every company in a country
   **Answer.** B. **Why.** Ideal customer profile. **Module.** 1

3. **(Scenario)** Astra's own outreach found that consumer businesses often said yes but couldn't pay, while B2B companies with a budget were the ones worth meeting. What should that change first?
   A. The email font
   B. Nothing, a yes is a yes
   C. The sending domain
   D. The ICP, adding ability to pay as a fit criterion
   **Answer.** D. **Why.** A yes from someone who can't buy isn't a customer, so the ICP must include ability to pay. **Module.** 1

4. **(Knowledge)** What does "firmographics" mean?
   A. The company's logo
   B. Email open data
   C. Facts about a company like size, industry and location
   D. A person's job history
   **Answer.** C. **Why.** Firmographics are company facts. **Module.** 1

5. **(Knowledge)** Under GDPR, which of these is usually the lawful reason used for B2B outreach, and must be written down?
   A. Consent from a friend
   B. Legitimate interest
   C. Public interest
   D. No reason is needed for work emails
   **Answer.** B. **Why.** Legitimate interest is the usual basis, and you must be able to justify and document it. Not legal advice. **Module.** 2

6. **(Scenario)** A prospect asks where you got their email. What do you do?
   A. Say it was random
   B. Tell them the source honestly and offer to remove them
   C. Ignore them
   D. Block them
   **Answer.** B. **Why.** You must tell people the source of their data on request and honour opt outs. **Module.** 2

7. **(Knowledge)** Data minimisation means...
   A. Deleting everything after a week
   B. Using fewer tools
   C. Making the sheet smaller with formatting
   D. Keeping only the data you need for the task
   **Answer.** D. **Why.** Collect and store only what you need. **Module.** 2

8. **(Knowledge)** What is a lookalike list?
   A. A list bought from a broker
   B. Duplicate records
   C. Companies that look like your best existing customers
   D. Competitors' customers only
   **Answer.** C. **Why.** Lookalikes copy the traits of customers who already bought and stayed. **Module.** 3

9. **(Scenario)** You built a 200 account list two ways. Way A has 200 rows but 60 are outside your size band. Way B has 140 rows, all inside. Which is the better starting list?
   A. Way B, because every row fits the ICP
   B. Neither
   C. Way A, because it's bigger
   D. Combine without checking
   **Answer.** A. **Why.** Fit beats volume. Rows that don't fit waste credits, sends and reputation. **Module.** 3

10. **(Knowledge)** What does an enrichment waterfall do?
   A. Deletes bad data
   B. Sends emails in a fixed order
   C. Tries one data source, and only if it finds nothing tries the next, and the next
   D. Ranks leads by score
   **Answer.** C. **Why.** That's the waterfall, it saves money and finds more. **Module.** 4

11. **(Knowledge)** What must happen to an email address your waterfall found before you send to it?
   A. Run verification and only send to verified addresses
   B. Guess a better one
   C. Send to it straight away
   D. Add it to the CRM as verified
   **Answer.** A. **Why.** Unverified emails bounce, and bounces damage the sending domain. **Module.** 4

12. **(Knowledge)** Fit score and intent score differ how?
   A. They're the same
   B. Intent is only website visits
   C. Fit is for people, intent is for companies
   D. Fit says whether they're the right type of company, intent says whether they're ready now
   **Answer.** D. **Why.** Fit is who, intent is when. **Module.** 5

13. **(Scenario)** A fit account just hired two route planners and their head of operations changed last month. What do these count as?
   A. Noise
   B. Fit criteria
   C. Reasons to disqualify
   D. Signals that raise the account's priority now
   **Answer.** D. **Why.** Hiring and a new leader are classic signals that make buying more likely now. **Module.** 5

14. **(Scenario)** Your AI research prompt says a prospect "recently expanded to Germany". What do you do before using it in a message?
   A. Open the source it cites and try to prove the claim wrong, and drop it if you can't confirm it
   B. Use it, the AI is usually right
   C. Ask the AI if it's sure
   D. Soften it to "I think you expanded"
   **Answer.** A. **Why.** The falsification pass. Check the source and try to prove the claim false. Astra's own research gate caught wrong claims this way. **Module.** 6

15. **(Knowledge)** Which order matches the message structure taught in this course?
   A. Pitch, price, call to book, greeting
   B. Specific observation, the problem, what it costs, why now, one line of proof, a low effort question
   C. "Re:" subject, case study, calendar link
   D. Compliment, three problems, a discount
   **Answer.** B. **Why.** One problem from start to finish, ending on a low effort question. **Module.** 7

**Part 2, Modules 8 to 14**

16. **(Knowledge)** Why does cold email go from a separate sending domain?
   A. It looks more personal
   B. So reputation damage doesn't hit the company's main email
   C. It's faster
   D. It's required by lemlist
   **Answer.** B. **Why.** The main domain stays safe. **Module.** 8

17. **(Knowledge)** What does DKIM do?
   A. Tells receivers what to do with failing mail
   B. Adds a seal to each email so the receiver can check it wasn't changed or faked
   C. Lists the servers allowed to send for your domain
   D. Tracks opens
   **Answer.** B. **Why.** SPF is the list, DKIM is the seal, DMARC is the policy. **Module.** 8

18. **(Scenario)** Your list has leads in the Netherlands and Germany. What's the cautious channel plan?
   A. No outreach in either
   B. Email Germany only
   C. Email everyone
   D. Email in the Netherlands, LinkedIn or a call first in Germany, checking each country's rules
   **Answer.** D. **Why.** Germany is strict on unsolicited B2B email, the Netherlands more permissive for business addresses. Not legal advice. **Module.** 8

19. **(Knowledge)** What's a webhook?
   A. A password
   B. A type of spreadsheet
   C. A message a tool sends the moment something happens
   D. A LinkedIn limit
   **Answer.** C. **Why.** The buzzer in the restaurant analogy. **Module.** 9

20. **(Scenario)** Your n8n flow runs green every time, but the Slack alerts show empty company names. What kind of failure is this, and what catches it?
   A. Silent, a log with a status per contact and checking outputs
   B. Loud, the error workflow
   C. A rate limit
   D. No failure
   **Answer.** A. **Why.** Silent failures run fine but do the wrong thing, logging and checks catch them. **Module.** 9

21. **(Knowledge)** Which task fails the "when to automate" test?
   A. Creating a follow up task
   B. Logging new contacts to a sheet
   C. Sending first messages to prospects without anyone reading them
   D. Alerting an owner about a new lead
   **Answer.** C. **Why.** A mistake there can't be undone, so a person stays in the loop. **Module.** 9

22. **(Knowledge)** What's a field map?
   A. A list of duplicates
   B. A Looker Studio chart
   C. A document listing every CRM field, its meaning, allowed values, source and owner
   D. A map of the sales territory
   **Answer.** C. **Why.** It stops people using fields in different ways. **Module.** 10

23. **(Scenario)** Two contacts have the same work email but different phone numbers. Your rule says match on email, survivor is the most recent activity. What happens?
   A. Keep the one with the longest name
   B. Delete both
   C. Keep both
   D. Merge into the one with the most recent activity, fill its empty fields from the other, record the merge
   **Answer.** D. **Why.** That's the three part dedup rule applied, and the merge stays traceable. **Module.** 10

24. **(Knowledge)** What must every routing rule include?
   A. A second CRM
   B. A Looker Studio report
   C. A discount
   D. A fallback for leads no rule matches
   **Answer.** D. **Why.** Without a fallback, some leads stay unowned. **Module.** 10

25. **(Scenario)** A lost deal's reason was "timing" five months ago. Their company just posted jobs for route planners. What's the right move?
   A. Mark it not a fit
   B. Put it in reactivation with a message that names what changed
   C. Leave it closed forever
   D. Send "just checking in"
   **Answer.** B. **Why.** Timing losses are worth reactivating, and a new signal gives a real reason. **Module.** 11

26. **(Knowledge)** A customer health score is used to...
   A. Measure email deliverability
   B. Rank prospects for outbound
   C. Show whether a customer is likely to stay or leave, so the team acts early
   D. Set prices
   **Answer.** C. **Why.** It's the fit score's twin for customers. **Module.** 11

27. **(Scenario)** 300 people were messaged. Replies were 12 out of office, 9 "no", 3 "wrong person" and 15 positive. What's the positive reply rate?
   A. 13%
   B. 5%
   C. 10%
   D. 39%
   **Answer.** B. **Why.** 15 divided by 300 is 5%. Only positive replies count, and the denominator is people messaged. **Module.** 12

28. **(Scenario)** In one month a team changed both its target segment and its opener, and positive replies went up. What's the honest reading?
   A. The opener caused it
   B. It's luck, ignore it
   C. The segment caused it
   D. The changes together worked, and to know which one did it you change one at a time
   **Answer.** D. **Why.** Two changes at once can't be separated. Astra's own September to October jump had the same issue. **Module.** 12

29. **(Knowledge)** Which part of a capstone case study do reviewers read most closely?
   A. What didn't work, with numbers and what changed
   B. The logo
   C. The list of tools
   D. The font
   **Answer.** A. **Why.** It shows you can judge your own work honestly. **Module.** 13

30. **(Scenario)** In a take home task the brief doesn't say the team's size. What do you do?
   A. Write an assumption with a reason and continue
   B. Stop and wait for an answer
   C. Skip that part
   D. Pick a number without mentioning it
   **Answer.** A. **Why.** Written assumptions are part of a good answer. **Module.** 14

**Answer key at a glance.** 1 A, 2 B, 3 D, 4 C, 5 B, 6 B, 7 D, 8 C, 9 A, 10 C, 11 A, 12 D, 13 D, 14 A, 15 B, 16 B, 17 B, 18 D, 19 C, 20 A, 21 C, 22 C, 23 D, 24 D, 25 B, 26 C, 27 B, 28 D, 29 A, 30 A.

**Note for building the pool.** Shuffle the option order again for the second variant of each question, so the right answer moves between A and D.

---

## Track 1 capstone. Build the whole engine on your market

**Goal.** Build, run and write up a complete GTM engine on a market you choose, end to end, so you can show an employer or client one working system with real numbers.
**Time.** 15 to 20 hours over 3 to 4 weeks (1 build week, 2 live weeks, 1 write up week), following your Module 13 plan.
**When.** After your Module 13 capstone plan is passed. The final exam can be taken before or during the capstone.
**You need.** Everything from Modules 0 to 13, a warmed sending domain (Module 8), the tools from Module 0 on free plans or trials (check each tool's pricing page for what's included, and plan around trial end dates), the capstone plan and evidence log.

### The brief

Build the whole engine on your own market (or, if you truly have none, on the Routeful practice market with your own fresh research, and say so in the case study). It must contain all eleven parts below, and run live for two weeks.

| # | Part | What it must have | Built in |
|---|---|---|---|
| 1 | **ICP** | Tiers, disqualifiers, personas, and the reasoning for each, including ability to pay | Module 1 |
| 2 | **Account list** | At least 100 accounts that pass the ICP, with source noted per row, and the legal basis note | Modules 2 and 3 |
| 3 | **Waterfall** | At least two providers in order, verification, find rate and cost per found email | Module 4 |
| 4 | **Scoring** | Fit and intent scored separately, weights written down, top tier listed | Module 5 |
| 5 | **Signals** | At least three live signal sources feeding the intent score | Module 5 |
| 6 | **Research prompt** | A prompt that cites sources, plus a checking step, with at least 10 checked examples and any claims you threw out | Module 6 |
| 7 | **Sequence** | At least 3 steps, email and LinkedIn, one problem per message, live for 2 weeks on a warmed domain, safe caps, country rules applied | Modules 7 and 8 |
| 8 | **CRM** | Field map, pipeline with exit criteria, dedup rule applied, routing rule with fallback | Module 10 |
| 9 | **Automation** | At least one n8n flow connecting three tools, with error handling and a log | Module 9 |
| 10 | **Dashboard** | Looker Studio dashboard plus the weekly scorecard for both live weeks | Module 12 |
| 11 | **Case study** | 1 to 2 pages, with numbers, counts and sources, including what failed | Module 13 |

**Rules for the run.**
- Send from the warmed sending domain only, never your main domain, starting with a safe first send of 20 to 30 people (Module 8).
- Keep send caps and LinkedIn limits as written in your plan. Check LinkedIn's terms and each country's rules. This is not legal advice.
- Read every thread in full before every manual reply. Honour opt outs the same day.
- Change one thing at a time, on a set day, and log it.
- Stop and fix when a kill criterion fires, and write it up.
- Never put real prospects' names or emails in anything you hand in. Blur or anonymise.

### Hand in

Put everything in your capstone Drive folder and share it with view access. The folder must contain, with these exact names:

1. `01 Case study` (Google Doc, 1 to 2 pages, with a three sentence summary at the top)
2. `02 ICP` (sheet, tiers, disqualifiers, personas, reasoning)
3. `03 Account list` (sheet, 100 or more accounts, source column, tier, fit and intent scores, anonymised if shared publicly)
4. `04 Waterfall` (screenshot of the Clay table setup plus a short note with find rate and cost per found email)
5. `05 Scoring and signals` (sheet or doc with weights, the three signal sources and how each feeds the score)
6. `06 Research prompt` (the prompt text, 10 checked examples, a list of claims you threw out and why)
7. `07 Sequence` (every message version, lemlist sequence and settings screenshots, DNS check screenshots, send log by day)
8. `08 CRM` (field map sheet with stages, exit criteria and dedup tab, HubSpot screenshots, routing table)
9. `09 Automation` (n8n JSON export, canvas screenshot, executions screenshot, log sheet link, one page note)
10. `10 Dashboard` (Looker Studio link with Viewer access, PDF export, the scorecard sheet with both weeks)
11. `11 Evidence log` (the dated log from Module 13)
12. `12 Presentation` (the slides or doc you'll present, 15 minutes)

### Marking rubric

Scored 0, 1 or 2 per criterion, as in every assignment. **Pass.** At least 70% of the points (14 of 20) and no 0 on a criterion marked **must**. A fail can be resubmitted once for 1:1 learners and those who bought the capstone review, after fixing what scored low.

| # | Criterion | 0 | 1 | 2 | Must? |
|---|---|---|---|---|---|
| 1 | ICP and list quality | No ICP, or list under 100 or mostly off ICP | ICP present, reasoning thin or some list rows off ICP | Tiers, disqualifiers and reasoning, 100 or more accounts that fit, source per row | Must |
| 2 | Data and enrichment | No waterfall or no verification | Waterfall or verification missing a piece, no cost figure | Two or more providers in order, verification, find rate and cost per found email | |
| 3 | Scoring and signals | No scoring | Single blended score, or fewer than three signals | Fit and intent separate, weights written, three live signals feeding intent | |
| 4 | Research checked before use | No checking | Checking described but no examples of thrown out claims | Prompt cites sources, 10 checked examples, thrown out claims listed with reasons | Must |
| 5 | Sequence quality and honesty | Generic, multi problem or misleading messages | One problem per message but weak on cost, timing or proof | Clear structure, one problem start to finish, low effort question, no fake personalisation | |
| 6 | Safe, legal sending for 2 weeks | Main domain, no warm up, or no country rules | Ran but with gaps (short warm up, caps not kept, opt outs late) | Warmed domain with SPF, DKIM and DMARC passing, safe first send, caps kept, country rules, opt outs same day, 2 full weeks | Must |
| 7 | CRM architecture | No CRM structure | Some of field map, exit criteria, dedup, routing | All four, routing with fallback, dedup traceable | |
| 8 | Automation works | None, or doesn't run | Runs but no error handling or log | Three tools, triggered, error handling proven, log on every branch | |
| 9 | Measurement and honest numbers | No dashboard or numbers don't add up | Dashboard and scorecard but traps ignored | Dashboard, both weeks of scorecard, counts next to rates, numbers add up to source | Must |
| 10 | Case study and what failed | Missing, or only successes | Numbers present, failures vague | Question, build, run, full funnel with counts, at least three failures in the three part format, what's next | Must |

**Results don't decide the pass.** A capstone with few replies and an honest, well measured write up can score full marks. A capstone with great replies, a broken process and unsourced numbers can fail.

### Good example, in short

Marco targeted Dutch and Belgian cold storage firms with 30 to 150 staff. His ICP excludes firms without their own fleet and notes ability to pay. His list has 128 accounts from two sources. His waterfall found emails for 61% of contacts with a cost per found email noted. Three signals (hiring planners, new depot, new operations lead) fed intent. His research tab shows 10 checked accounts and 4 claims thrown out, one because the "new depot" was a competitor with a similar name. His sequence ran from a domain warmed for 17 days, first send 25 people, German leads on LinkedIn only. Over two weeks he reached 104 people, with 6 positive replies (5.8%) and 2 meetings held with decision makers. His failures section covers a 9% bounce rate on the first batch from one provider (he dropped it), a LinkedIn condition that sent two messages to one person (fixed and apologised), and Belgian replies that were mostly "not my job" (titles mapped wrongly). His dashboard numbers match the lemlist and HubSpot exports.

### Bad example, in short

Julia's case study says "great results, lots of interest" with a 40% reply rate that counts out of office replies, covers three days instead of two weeks, and was sent from her employer's main domain. The research has no checked examples. No failures are listed. It fails the musts on sending, research, measurement and the case study, even though her automation works well.

### The 1:1 final session, presenting the capstone

**Format.** 30 minutes on video with Raka, the last 1:1 session (self learn learners who bought the capstone review book the same session). The learner shares their screen.

| Minutes | Part |
|---|---|
| 0 to 15 | The learner presents. Suggested order, the question and the market (1 minute), the engine part by part with live screens, not only slides (8 minutes), the numbers and the dashboard (3 minutes), what failed and what's next (3 minutes) |
| 15 to 30 | Raka asks questions, marks the rubric live, and gives the result and feedback at the end |

Within 24 hours the learner gets the written rubric with a comment per criterion, and, on a pass, the Certified certificate (README section 6).

**Questions Raka will ask (a sample, he picks from these).**
1. Why this market? What in your ICP would make you drop an account?
2. Show me one account from your list and walk me from the raw row to the message that was sent.
3. Which claim from your research did you throw out, and how did you find it was wrong?
4. What's your find rate and cost per found email, and what would you change in the waterfall order?
5. Show me your DNS checks. What would you do if tomorrow's spam test failed?
6. How did you decide your send caps and LinkedIn limits? What did you do about Germany (or the strictest country in your market)?
7. Open your n8n flow. Break it for me. What happens, and how would you know?
8. What does your dedup rule say, and where can I see a merge you made?
9. Your positive reply rate is X. How many people is that based on, and what would you need to see before calling it a result?
10. If you had to change one thing next week, which one, and how would you measure it?
11. What would you do differently if a company hired you to build this for a team of six?
12. Which part would you not automate, and why?

**How to prepare.** Rehearse with a timer. Open every tool in a browser tab before the session, logged in. Have one account ready to trace end to end. Expect to be asked to show a number's source live.

---

## What's next

**Keep building.** Run your engine for another month and update the case study. A capstone with six weeks of numbers says more than one with two.

**Track 2, Sell More with GTM Engineering.** If you'll sit close to sellers, this shows how one seller runs the engine day to day. Track 1 graduates can skip the overlapping lessons and go straight to calls, follow up and the personal scorecard.

**Track 3, Lead a GTM Engineered Team.** If you're heading towards leading a team or working with sales managers, this covers the sales bible, operating model, coaching from calls and a 90 day rollout.

**Astra Revenue Engine work.** Astra builds these engines for B2B companies. Strong Track 1 graduates may be asked to help on builds when there's a fit. It isn't promised, and it depends on the work available and on your capstone.

**The community.** Join the graduates' group to share builds, ask questions, swap take home tasks for practice and hear about roles. Post your capstone there first, others will tell you what's unclear before an employer does.
