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

## Module 0. What a GTM engineer actually does

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
   "00 Setup", "01 ICP", "02 Data", "03 Lists", "04 Enrichment", "05 Scoring", "06 Research", "07 Messages", "Practical
   test", "Capstone", "Portfolio".
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

## Module 1. ICP and the revenue model

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
   then couldn't pay. B2B companies (businesses that sell to other businesses) with a budget converted.
5. Raka shows what changed. In October Astra changed who it targeted and how messages opened. Of 119 first pitches, 30%
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

## Module 2. Data foundations

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

## Module 3. Lists and lookalikes

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

## Module 4. Enrichment and waterfalls

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

## Module 5. Scoring and signals

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

## Module 6. AI research and writing

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

## Module 7. The message

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
   they changed two things at once, who they targeted and how messages opened. So they know the October engine works
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
   with budget converted.
3. Lesson 2. How the message opens. The October messages opened on a specific, checked observation and one problem.
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
**Answer.** False. **Why.** Two things changed at once, so they can't separate them. **Rewatch.** 7.4

**Q9.** What did Astra learn about consumer businesses?
A. They never reply B. They said yes and couldn't pay C. They're the best fit D. They want long messages
**Answer.** B. **Why.** B2B with budget converted, consumer businesses didn't pay. **Rewatch.** 7.5

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

