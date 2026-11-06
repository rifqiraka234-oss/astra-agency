# Track 1, Level 2. GTM Builder

**By Raka Mulya, Astra Agency.** Self learn and 1:1 with Raka. One curriculum, two ways to take it.

This file follows the rulebook in `docs/academy/README.md`. Lessons follow section 3, assignments and rubrics follow
section 4, quizzes and tests follow section 5, 1:1 sessions follow the template in section 7.4. Every word in bold the
first time it appears is also in the glossary (README section 9), and every lesson still explains it in one plain
sentence.

Track 1 is a ladder of three levels. A free **GTM Engineering Score** (25 questions, 0 to 100) tells you where to start.

| Level | Name | You can |
|---|---|---|
| 1 | Operator | Run an engine someone else built. ICP, lists, enrichment basics, signals, AI research, the message |
| **2** | **Builder (this file)** | **Build the engine. Sending setup, automation, CRM, allbound and loyalty flows, dashboards** |
| 3 | Architect | Design the whole revenue system, run AI agents in production, run GTM engineering for a team or for clients |

---

## Who this level is for

Level 2 is for people who can already research an account and write a good message, and now want to build the machine
that sends, routes, records and measures it all. You don't need to code. You need to be patient with settings screens
and honest with numbers.

| You are | Why this level fits you |
|---|---|
| A Level 1 Operator graduate | You have an ICP, a list, a waterfall, a scoring model, a research prompt and a sequence. Now you make them run |
| An SDR or BDR (the person who books first meetings for a sales team) who already does good research | You want to own the sending setup and the CRM instead of waiting for someone else to fix them |
| In marketing ops or RevOps (revenue operations, the people who run sales tools, processes and data) | You know one or two tools well and want to connect them into one engine |
| A founder's first commercial hire | You've got a list and a message and need the system around them before you send at volume |
| Someone who scored **Builder** on the GTM Engineering Score | The score says you're past the basics and ready to build |

**You're at this level when.** You can take a list and a message and turn them into a working engine on your own. A
sending domain that lands in the inbox, a live multichannel sequence, at least one automation that connects tools and
tells you when it breaks, a CRM with clean fields, stages, dedup and routing, flows that join inbound to outbound and
keep customers, and a dashboard that tells the truth. That's what this level teaches, and the build project proves it.

**Not for you if.** You've never built an ICP or written a researched message. Start with Level 1 Operator. You want to
design the whole revenue system for a team, run AI agents in production or sell this as a service. That's Level 3
Architect, after this one. You sell for a living and only want more meetings for yourself. Take the GTM Seller course.

## The promise

When you finish Level 2, you'll have built and run a complete engine live for two weeks, and you'll have a one page run
report with real numbers to prove it, including what broke. You'll be able to explain every part of it, from the DNS
records to the dashboard, to an employer, a client or your own manager.

## Before you start

You arrive here one of two ways. Either you finished **Level 1 Operator**, so you already have an ICP sheet with tiers
and disqualifiers, a list of accounts, a Clay enrichment waterfall, a scoring model with signals, a research prompt that
cites sources and a three step sequence. Or you scored **Builder** on the GTM Engineering Score and can do those things
already.

> **Skipped Level 1? Do these 3 things first.** Give yourself one evening. Every module in this level builds on them.
>
> 1. **A one page ICP.** Who you sell to, in tiers, with at least three disqualifiers (reasons to leave an account
>    alone), including whether they can pay.
> 2. **A list of at least 50 accounts with verified emails and a fit score.** One row per contact, with company,
>    domain, country, job title, a verified work email and a fit score from 0 to 10. Write down where every column came
>    from, and write a short legitimate interest note (why it's fair to contact these people about this).
> 3. **A three step sequence around one problem.** An opener, a follow up that adds something new, and a polite close.
>    Each message names one problem, what it costs, and ends on a low effort question.
>
> If any of these feels hard, take the matching Level 1 module first. It saves you a week of confusion here.

| You need | How much |
|---|---|
| Your Level 1 builds | ICP, list, scoring, research prompt and sequence. Or the three things in the box above |
| Spreadsheet comfort | Sort, filter, `=IF()`, `=COUNTIF()`, `=VLOOKUP()` or `=XLOOKUP()`. Module 3 adds `REGEXEXTRACT` and Module 5 adds `SUMPRODUCT`, both shown step by step |
| Coding | None. Module 2 teaches the little you need about APIs |
| Time | 6 to 7 hours a week for self learn, or 90 minutes a week live plus about 3 hours of homework for 1:1. Some weeks are lighter because you're waiting for warm up |
| A card for two small costs | A domain registration (about the price of a lunch per year) and one mailbox per month. Lesson 1.1 is where you buy them, not before |
| A market to practise on | Your own, or the Routeful practice pack |

**Tools for this level, and when you need them.** Prices change, so check each tool's pricing page. Don't buy anything
before the lesson that needs it.

| Tool | Used in | Enough to start |
|---|---|---|
| A separate sending domain and one mailbox (Google Workspace or Microsoft 365) | Module 1, day one | Paid, small |
| lemlist | Module 1, then Module 4 | Trial. Start the trial when you start warm up, and check how long it lasts against your build project dates |
| MXToolbox and mail-tester.com | Module 1 | Free |
| n8n | Modules 2 to 4 | Cloud trial or free self hosted |
| HubSpot CRM | Modules 2 to 5 | Free CRM |
| Clay or one enrichment provider's API | Module 2 | Free plan or trial |
| Slack (or Gmail) | Modules 2 and 4 | Free |
| Google Sheets and Looker Studio | Every module | Free |

### The practice pack, in one paragraph

If you don't have your own data, you use **Routeful**. Routeful is a made up Dutch company in Utrecht with 35 staff. It
sells route planning software to transport and logistics firms in the Netherlands, Belgium and Germany. Its best
customers have 20 to 500 staff and their own fleet of 15 or more trucks, and their planners still plan in Excel or an
old transport management system. It talks to the operations director, the head of planning, and the owner or managing
director. The pack has 50 fake accounts, a messy CRM export of 400 contacts with duplicates, missing emails, mixed job
titles and inconsistent country spellings, 10 call transcripts (6 won, 4 lost), last quarter's pipeline of 60 deals and
a sales team of 6 (Eva the manager, Sanne and Joris the SDRs, Lotte, Daan and Mira the AEs). Every company and person in
it is invented. Account IDs look like `RF-014`.

**One rule for practice data.** Never send real email to fake accounts or real people from the practice pack. Where an
assignment says "launch", practice pack learners build everything, run the tests, and pause before sending.

## What you'll be able to do at the end

1. Check any domain's SPF, DKIM and DMARC, set up a separate warmed sending domain, and launch a multichannel lemlist
   campaign with safe caps and country rules (Module 1)
2. Build an n8n workflow that connects at least three tools through their APIs, with branches, error handling and a log
   (Module 2)
3. Set up a CRM with a field map, stages with exit criteria, a deduplication rule and a routing rule with a fallback
   (Module 3)
4. Build an inbound to outbound handover, a customer health score and a reactivation flow with a human review step
   (Module 4)
5. Build a weekly scorecard, a weighted forecast and a Looker Studio dashboard, and read a reply rate without fooling
   yourself (Module 5)
6. Run the whole engine live for two weeks and write a one page run report with honest numbers (build project)

## All modules at a glance

| # | Module | In one line | You build | Self learn week | 1:1 session |
|---|---|---|---|---|---|
| 1 | Sending safely | Domains, SPF, DKIM, DMARC, warm up, lemlist, country rules | A live campaign on a warmed domain | 1, launched in 3 | S1 |
| 2 | APIs and automation | How tools talk to each other, and n8n | An n8n flow connecting three tools | 1 to 2 | S2 |
| 3 | CRM architecture | Objects, field map, stages, dedup and routing in HubSpot | CRM with field map, dedup rule and routing rule | 2 | S3 |
| 4 | Allbound and loyalty flows | Joining inbound and outbound, and keeping customers | One inbound to outbound flow and one reactivation flow | 3 | S4 |
| 5 | Measuring it | Conversion, scorecard, reply rates, forecast, dashboard | A dashboard and a scorecard | 4 | S5 |
| Project | Level 2 build project | The engine live for 2 weeks | A one page run report with numbers | 3 to 5 | Reviewed in S6 |
| Exam | Level 2 final exam | 20 questions, 30 minutes | | 5 | Reviewed in S6 |

## Duration and price

| | Self learn | 1:1 with Raka |
|---|---|---|
| Video | About 3 hours across 5 modules, every video 5 to 10 minutes | 5 live sessions of 90 minutes, one per module, recorded for you |
| Builds | About 18 hours of assignments plus about 8 hours of build project | The same, every build marked by Raka |
| Pace | 4 to 5 weeks, including the 14 day warm up wait | 5 weekly sessions, then a 45 minute build project review |
| Marking | You mark yourself against the rubric and good example. Optional paid review of a single assignment (€49) | Raka marks every assignment within 2 working days and goes through it in the next session |
| Build project | Self marked for Completed. Raka's review for Certified (€149) | Reviewed by Raka in a 6th call of 45 minutes, included |
| Questions | Questions form, answered within 3 working days. Optional single 1:1 hours (€150) | Async channel or email, answered within 1 working day |
| Certificate | Completed. Certified if you buy the project review and pass | Certified, when the project and exam pass |
| Suggested price | €249 | €1,200 |

**The ladder bundle.** All three levels (Operator, Builder, Architect) for €599 self learn, or €3,500 1:1.

Prices are suggestions for Raka to set. Tool costs are separate and mostly free plans or trials.

## Self learn plan, week by week

The warm up is the clock. A new mailbox needs at least 14 days before its first cold email, so you buy the domain on day
one and build Modules 2 and 3 while it warms. If your company already has a sending domain warmed for 14 days or more,
you can finish in 4 weeks.

| Week | What you do | What you finish that week | Hours |
|---|---|---|---|
| 1 | Module 1 lessons 1.1 to 1.3 on day one (domain bought, records set, warm up on). Then Module 2 | Domain warming, n8n flow connecting three tools | 7 |
| 2 | Module 1 lessons 1.4 and 1.5 (campaign built, not launched). Module 3 | Campaign built and previewed, CRM with field map, dedup and routing | 7 |
| 3 | Day 15 or later, Module 1 assignment (safe first send). Module 4. Build project live run starts (week 1 of 2) | Live campaign, two flows, first scorecard week | 7 |
| 4 | Module 5. Build project week 2, fill the scorecard on the same day each week | Dashboard and scorecard | 6 |
| 5 | Build project run report. Final exam | Run report handed in, exam passed | 3 |

Total about 30 hours. If your week only has 3 to 4 hours, stretch it to 8 or 9 weeks. Warm up keeps running the whole time,
so a slower pace costs you nothing there.

## 1:1 plan, session by session (5 sessions of 90 minutes, plus a 45 minute project review)

Every 90 minute session runs on the template in README section 7.4 (wins and blockers, homework reviewed on screen, the
new module taught live on your data, homework set, questions). Homework is handed in at least 48 hours before the next
session. Raka sends written notes within 24 hours, with links to the self learn lessons that cover the same ground.

| Session | Module | What Raka prepares | What happens in the session | Homework |
|---|---|---|---|---|
| S1 | M1 Sending safely, plus kick off | Reads your intake form and your Level 1 builds (or your three skip box items). Runs the free checks on your main domain before the call | Your goals for this level. Your main domain's checks read together. Sending domain bought, mailbox created, SPF, DKIM and DMARC set live, warm up switched on, screen shared. Country rules for your market drafted | Lessons 1.4 and 1.5. Assignment 1 steps 1 to 6 (campaign built, not launched) |
| S2 | M2 APIs and automation | Builds a starter n8n workflow in a shared template. Checks your campaign build | Campaign reviewed. What an API is, on your own tools. n8n flow built live with branches, error handling and a log | Assignment 2 (n8n flow connecting three tools) |
| S3 | M3 CRM architecture | Marks the n8n flow. Exports your current CRM fields, or loads the Routeful export | Field map built live. Stages and exit criteria. Dedup rule and routing rule set in HubSpot. Build project plan agreed, launch date set for after day 14 of warm up | Assignment 3 (CRM). Assignment 1 safe first send when warm up allows. Build project live run starts |
| S4 | M4 Allbound and loyalty flows | Marks the CRM. Reads your first send report | First send results gone through. Inbound handover and reactivation flow designed and started live. Health score drafted | Assignment 4 (two flows). Build project week 1 scorecard |
| S5 | M5 Measuring it | Marks the flows. Prepares a Looker Studio template connected to your data | Conversion table, scorecard and forecast built from your live numbers. Dashboard built. Reply rate traps checked on your own results | Assignment 5 (dashboard and scorecard). Build project run report. Final exam taken alone, timed |
| S6 (45 min) | Build project review | Marks the run report and the exam before the call | You walk through the engine live and the run report (15 min). Raka asks questions and marks the rubric (20 min). Exam reviewed, next steps towards Level 3 (10 min) | None. Certified certificate on a pass |

---

### Module 1. Sending safely

**Goal.** Send your sequence by email and LinkedIn from a separate, warmed domain, without landing in spam or breaking the law.
**Time.** 40 minutes of video, plus 4 hours of assignment spread over 2 to 3 weeks (most of it is waiting for warm up).
**You need.**
- Your three step sequence from Level 1 (or the skip box)
- Your scored list with contacts and verified emails
- A card to register a domain and pay for one mailbox per month
- A lemlist account on the trial (check lemlist's pricing page for what the trial includes and how long it lasts)
- Your own LinkedIn account, logged in on Chrome
- Your setup sheet (the T1 Setup sheet template, or any sheet where you keep accounts, owners and dates)

Do lesson 1.1 today. Warm up takes at least 14 days and can't be rushed, so every day you wait is a day added to the end.

#### Lesson 1.1 Quick win. Check your domain in 30 minutes and plan the sending domain (9 min)

**In plain words.** Before you send a single cold email, you find out whether the email you send today would pass the three checks Gmail and Outlook run. Then you pick, and ideally buy, a second domain that only ever sends cold email. In 30 minutes you'll know where you stand and have the clock started.

**You'll be able to.**
- Run free SPF, DKIM and DMARC checks on any domain and read the result
- Explain why cold email never goes out from the main domain
- Pick and buy a sending domain that looks trustworthy, with one real mailbox and a redirect

**What's shown.**
1. Two words first. A **domain** is the part of an email or web address after the @ or the www, like routeful.nl. A **sending domain** is a second domain you use only for cold email.
2. Three more words, in one line each, so you can read the checker. **SPF** is the list of servers allowed to send email for a domain. **DKIM** is a seal on each email that proves it wasn't changed or faked. **DMARC** tells the receiver what to do with mail that fails those two. Lesson 1.2 sets them up. Today you only look.
3. Screen demo, the checks. Open mxtoolbox.com. In the search box, type `spf:` followed by your company's main domain (for Routeful, `spf:routeful.nl`) and press Enter. Read the result. Green means a record exists and looks valid. Then run the DMARC lookup the same way (`dmarc:routeful.nl`). For DKIM you need the **selector**, a short name the mail provider uses. For Google Workspace it's usually `google`, so the lookup is `dkim:routeful.nl:google`. Checking costs nothing and changes nothing, because you're only reading public settings.
4. Screen demo, a real test email. Open mail-tester.com, copy the test address it shows, send a normal email to it from your work mailbox, then click to see your score. Read the warnings in plain words. Missing records, a link that looks odd, a blocklist.
5. Write down what you found in your setup sheet. Domain, SPF pass or fail, DKIM pass or fail, DMARC pass or fail and its policy, mail-tester score, date. If your main domain fails a check, tell whoever owns your company's email. That's a finding worth sending today, and it's often the first thing a new builder fixes.
6. Why the sending domain. Gmail and Outlook keep a score for every domain, called its **reputation**. Too many bounces or spam reports and they start putting its mail in spam. If that happens to routeful.nl, the invoices and support replies go to spam too. If it happens to a sending domain, you lose only that domain.
7. Picking a name. Stay close to the brand so people recognise it. For Routeful, getrouteful.com, routefulhq.nl or tryrouteful.com. Avoid odd endings (.xyz, .online) and anything with numbers or misspellings.
8. Screen demo, buying it. Open a **registrar** (a company that sells domains, for example Cloudflare, TransIP or Namecheap). Search the name, add it to the basket, pay, and switch on auto renew.
9. Screen demo, the mailbox. Open Google Workspace (or Microsoft 365 if your company uses that), click Get started, enter the new domain and follow the steps to prove you own it. The tool shows a **TXT record** (one line of text in the domain's settings) to paste into your **DNS**, the internet's address book for your domain. Create one mailbox with a real person's name, like anna@getrouteful.com. Never info@ or sales@ for cold email. Add a photo and a signature with name, role, company and the main website.
10. Screen demo, the redirect. In the registrar, find Forwarding or Redirects, and point getrouteful.com to routeful.nl, so anyone who checks the domain lands on the real site. For a beginner, one domain with one or two mailboxes is plenty.

**Do it now.** Set a 30 minute timer. Run the three MXToolbox checks and one mail-tester.com test on your main domain and write the results in your setup sheet. Then write three candidate sending domain names, check each is free at a registrar, and pick one. If you're ready, buy it and create the mailbox before the timer ends. Practice pack learners run the checks on any company domain they use every day, then pick a name for Routeful and don't buy it.

#### Lesson 1.2 SPF, DKIM and DMARC on the sending domain (8 min)

**In plain words.** Now you add the three records to your new domain. Together they prove to Gmail and Outlook that an email really comes from you. Without them, most of your mail goes to spam or gets refused.

**You'll be able to.**
- Add the SPF, DKIM and DMARC records for a Google Workspace mailbox
- Add a custom tracking domain in lemlist
- Prove all three records work with the same free checks from lesson 1.1

**What's shown.**
1. The letter picture. SPF is the list of post offices allowed to send letters in your name. DKIM is a wax seal the receiver can check wasn't broken. DMARC tells the receiver what to do with a letter that fails, and asks them to send you a report. Big mail providers now expect all three on domains that send a lot. Check Google's and Yahoo's current sender rules before you start, because they change.
2. Screen demo, finding DNS. Log in to your registrar, click your domain, click DNS or Manage DNS. You see a table of records with columns Type, Name (or Host) and Value (or Content).
3. Screen demo, SPF. Click Add record. Type TXT. Name `@` (which means the domain itself). Value for Google Workspace is `v=spf1 include:_spf.google.com ~all`. Save. A domain may only have **one** SPF record. If one exists, add the new `include:` part to it instead of making a second.
4. Screen demo, DKIM. Open the Google Admin console, go to Apps, then Google Workspace, then Gmail, then Authenticate email. Pick the domain, click Generate new record, keep the defaults, click Generate. Copy the name (usually `google._domainkey`) and the long value starting `v=DKIM1` into a new TXT record at your registrar. Wait 10 to 60 minutes, go back and click Start authentication.
5. Screen demo, DMARC. Add one more TXT record. Name `_dmarc`. Value `v=DMARC1; p=none; rua=mailto:dmarc@getrouteful.com`. The `p=none` means watch only, block nothing yet, which is the safe start. After a month of clean reports you can move to `p=quarantine`.
6. Screen demo, the tracking domain. A **tracking domain** is a sub address on your own domain that lemlist uses for its links, so your links don't share a reputation with other lemlist users. In lemlist, open Settings, find the custom tracking domain option, copy the value it shows, and add it at your registrar as a **CNAME** record (a DNS record that points one name to another). Click verify in lemlist.
7. Screen demo, checking. Run the lesson 1.1 lookups again, this time on the sending domain. All three should be green. Send a plain email from the new mailbox to mail-tester.com and read the score.
8. Common mistakes. Two SPF records. A DKIM value cut short when copying. Records added to the main domain by accident. Forgetting that DNS changes can take up to a day to show everywhere.

**Do it now.** Add all three records to your sending domain (practice pack learners write out the exact three records Routeful would add for getrouteful.com). Run the checks and screenshot the three results.

#### Lesson 1.3 Warm up, send caps and deliverability checks (7 min)

**In plain words.** A new mailbox that suddenly sends 200 emails looks like a spammer. So for the first weeks it sends small amounts of normal looking mail that gets opened and answered, and you raise the amount slowly. After that you keep a daily cap and check every week that you're landing in the inbox.

**You'll be able to.**
- Turn on warm up for a new mailbox in lemlist
- Set a safe daily sending cap and raise it on a schedule
- Read the signs that deliverability is going wrong and know what to do first

**What's shown.**
1. **Warm up** means slowly building a new mailbox's reputation. lemlist's warm up tool (lemwarm) sends emails between your mailbox and other real mailboxes, opens them, replies, and pulls them out of spam, so providers learn your mailbox is normal.
2. Screen demo. In lemlist, open Settings, then the email accounts section, click Connect an email account, choose Google, log in with the new mailbox and allow access. Open the warm up option for that mailbox and switch it on. Leave the default ramp.
3. How long. At least 14 days before the first cold email, and keep warm up running the whole time you send.
4. **Send cap** is the most cold emails one mailbox sends in a day. Course defaults for a new mailbox. Week 1 of sending, 15 to 20 a day. Week 2, 25 to 30. Then stay at or under about 40. If you need more volume, add mailboxes, don't push one harder. These are cautious course numbers, not provider rules, so check lemlist's current guidance.
5. Screen demo. In the campaign or mailbox settings, find the daily sending limit and type your number. Set sending hours to the working day of the people you email, in their time zone.
6. What hurts deliverability. Bounces (send only to verified emails). Spam reports (send only to people who really fit, and make saying no easy). Links and images in the first email. Open tracking, which adds a hidden image, so switch it off for cold email. Identical text to hundreds of people.
7. **Open rate** is unreliable now, because some mail apps open every email automatically for privacy reasons. Judge a campaign on replies.
8. The weekly check. Bounce rate in lemlist (if it's climbing, stop and re verify the list). The warm up dashboard's inbox placement. One test to mail-tester.com. Google Postmaster Tools if you've set it up.
9. If you land in spam. Pause the campaign, keep warm up on, check the three records again, halve the daily cap, remove links, and restart only when tests come back clean.

**Do it now.** Connect your new mailbox to lemlist and switch on warm up today. Put a reminder in your calendar 14 days from now, and write your send cap schedule (week 1, week 2, after) into your setup sheet.

#### Lesson 1.4 Build the campaign in lemlist, email and LinkedIn steps (8 min)

**In plain words.** You load your sequence into lemlist and mix email and LinkedIn steps, so the same person sees you in two places. You set LinkedIn actions to safe daily limits, because LinkedIn restricts accounts that push too hard.

**You'll be able to.**
- Import a list with your own custom fields into a lemlist campaign
- Build a sequence with email steps, LinkedIn steps, waits and a condition
- Set the campaign settings that protect you, and preview every message

**What's shown.**
1. **Multichannel** means using more than one channel, here email and LinkedIn. A **step** is one action in the sequence, like "send email 1". A **condition** is a fork, like "if they accepted the invite, send a LinkedIn message, otherwise send email 2".
2. Screen demo, LinkedIn. Install the lemlist Chrome extension, log in to LinkedIn in the same browser, then in lemlist open Settings and connect your LinkedIn account. lemlist runs LinkedIn steps through your own account, so everything it does counts as you.
3. Screen demo, the list. Export your Clay table or sheet as CSV with first name, last name, company, email, LinkedIn URL and the custom fields your messages use, for example `observation` and `problem` from your research. In lemlist click Campaigns, create a new campaign from scratch, click Add leads, upload the CSV and map each column. Unknown columns become custom variables like `{{observation}}`.
4. Screen demo, the sequence. Open the Sequence tab and add, for the Routeful example, Day 0 LinkedIn visit profile. Day 1 LinkedIn invite with no note, or a short note with no pitch. Day 2 Email 1 (your opener). Day 5 a condition, accepted gets a short LinkedIn message, not accepted gets Email 2. Day 9 Email 3, the polite close. Use the wait boxes for the days.
5. Use variables only where the data exists for every lead. A missing variable sends as an empty gap or blocks the step. Use lemlist's fallback option, or remove leads with empty fields before import.
6. **LinkedIn limits.** LinkedIn caps invites and restricts automation. Course defaults for your first week are 10 to 15 invites and 20 to 30 profile visits a day, raised slowly only if nothing warns you. Check LinkedIn's terms and lemlist's current recommended limits, and never run two tools on one LinkedIn account at once.
7. Screen demo, settings. Choose the sending mailbox, set sending days and hours, switch on the option that stops the sequence for a lead when they reply, switch off open tracking, and add a plain opt out line like "Not relevant? Just say so and I won't write again".
8. Screen demo, preview. Click through at least ten leads in the preview and read each message as if you were them. Empty variables, wrong company names, odd capitals, anything the research didn't prove. Fix problems in the source sheet and re import, so the sheet stays the single source of truth.

**Do it now.** Create the campaign, import 20 leads, build the five steps and preview ten of them. Don't launch. Lesson 1.5 comes first.

#### Lesson 1.5 Rules by country, the safe first send and handling replies (8 min)

**In plain words.** Before you press launch, check that you're allowed to email each person, then send to a small group and watch what happens. When replies come in, answer them fast and honestly, and remove anyone who says no at once.

**You'll be able to.**
- Mark each lead's country and decide email, LinkedIn only, or skip
- Run a safe first send of 20 to 30 people and read the results
- Sort replies into four groups and record opt outs the same day

**What's shown.**
1. This is not legal advice. Check the rules in your own country and the countries you email, and ask your company if it has a policy.
2. **GDPR** is the EU law on personal data, and a work email with a name in it is personal data. For B2B outreach most people rely on **legitimate interest**, which means a real business reason, relevant to the person's job, written down. You wrote that note in Level 1 (or the skip box). Reuse it.
3. What always applies. Tell people where you got their data if they ask. Honour an opt out at once. Keep only the fields you need. Make it easy to say no in every email.
4. Countries differ. The UK and the Netherlands are more permissive about emailing business addresses. Germany is strict, and unsolicited B2B cold email there is risky without consent. For Routeful, Dutch leads get email and LinkedIn, German leads get LinkedIn only or a call first, Belgian leads get checked before you decide. Add `country`, `channel` and `do_not_contact` columns and filter on them before import.
5. LinkedIn has its own terms on automation. Keep the lesson 1.4 limits, and never message someone who asked you to stop on any channel.
6. **The safe first send.** Launch to 20 to 30 of your best fit leads only. Watch for 3 to 4 working days. Check bounces, inbox placement (send a copy to a test Gmail and Outlook address), replies and any LinkedIn warnings. Add the rest only if all of that looks clean.
7. Screen demo, replies. In lemlist's inbox view, sort every reply into one of four groups. Positive (wants to talk or see something). Not now (timing). No (not interested, wrong person, stop). Auto reply (out of office, left the company). Tag each in lemlist and in your sheet.
8. How to answer. Positive, reply within one working day, answer exactly what they asked, offer the low effort next step. Not now, thank them and ask if you may check back in a set month. No, thank them, confirm you won't write again, mark them do not contact in lemlist and the CRM the same day. Wrong person, ask once who handles it.
9. Before every manual reply, read the whole thread from the first message. A reply can land while you're writing, and the early messages are where promises live. Astra reads every thread this way before every send, because a reply sent on top of an unread message is the one mistake you can't undo.

**Do it now.** Fill the `country`, `channel` and `do_not_contact` columns for every lead, and write one line explaining your rule for each country in your market.

#### Quiz 1 (pass 80%)

1. Why do you send cold email from a separate domain?
   A. lemlist only works with new domains
   B. If its reputation gets damaged, your company's normal email still reaches inboxes
   C. It's cheaper than using your main domain
   D. It makes emails look more personal
   **Answer.** B. **Why.** Spam problems hit the sending domain's reputation, not the main one's. **Rewatch.** 1.1

2. True or false. Running an SPF and DMARC lookup on your company's main domain in MXToolbox can break its email.
   **Answer.** False. **Why.** The checks only read public settings and change nothing. **Rewatch.** 1.1

3. True or false. It's fine to add a second SPF record if the first one is from another tool.
   **Answer.** False. **Why.** A domain may only have one SPF record, so you add the new `include:` to the existing one. **Rewatch.** 1.2

4. Which of the three settings tells the receiver what to do with mail that fails the checks?
   A. CNAME B. DMARC C. SPF D. DKIM
   **Answer.** B. **Why.** DMARC sets the policy and asks for reports. **Rewatch.** 1.2

5. Sanne bought her sending domain yesterday and wants to email 300 leads tomorrow. What should she do?
   A. Send 100 a day for three days
   B. Send to all 300, the list is verified
   C. Switch on warm up and wait at least 14 days before the first cold email
   D. Send from her main domain until the new one is ready
   **Answer.** C. **Why.** A new mailbox needs time to build reputation, and the main domain is never used for cold email. **Rewatch.** 1.3

6. True or false. Open rate is the best way to judge a cold email campaign.
   **Answer.** False. **Why.** Some mail apps open emails automatically, so opens are unreliable. Judge on replies. **Rewatch.** 1.3

7. Your bounce rate jumps after you add a new batch of leads. What do you do first?
   A. Raise the daily cap to get through the list faster
   B. Switch off warm up
   C. Add images to the email
   D. Pause the campaign and re verify the new batch
   **Answer.** D. **Why.** Bounces damage reputation, so stop and fix the list before sending more. **Rewatch.** 1.3

8. Which setting should be switched on in every cold campaign?
   A. Send on Sundays
   B. Images in email 1
   C. Open tracking
   D. Stop the sequence for a lead when they reply
   **Answer.** D. **Why.** Without it, people who already replied keep getting automated follow ups. **Rewatch.** 1.4

9. Routeful's list has leads in the Netherlands and Germany. What's the cautious plan?
   A. Skip both countries
   B. Email everyone, GDPR is the same everywhere
   C. Email Dutch leads, use LinkedIn or a call first for German leads, and check the rules for each country
   D. Email German leads only, they're more formal
   **Answer.** C. **Why.** Germany is strict on unsolicited B2B email, the Netherlands is more permissive for business addresses. Not legal advice, check. **Rewatch.** 1.5

10. A lead replies "please remove me". When do you mark them do not contact?
   A. The same day, in lemlist and the CRM
   B. Only if they ask twice
   C. Next week during CRM cleanup
   D. At the end of the campaign
   **Answer.** A. **Why.** Opt outs are honoured at once. **Rewatch.** 1.5

#### Assignment 1. A live campaign on a warmed domain

**Goal.** Launch your sequence by email and LinkedIn from a warmed sending domain, starting with a safe small first send.
**Time.** 4 hours of work, spread over 2 to 3 weeks because of warm up.
**You need.** Your sequence and scored list with verified emails, a sending domain and mailbox, lemlist trial, LinkedIn, MXToolbox and mail-tester.com, your setup sheet.

**Steps.**
1. Write your main domain's check results from lesson 1.1 into the setup sheet.
2. Buy the sending domain, create one mailbox with a real name, photo and signature, and set the redirect to the main site (lesson 1.1).
3. Add SPF, DKIM and DMARC (`p=none`) records (lesson 1.2). Run the three lookups on the sending domain and screenshot them.
4. In lemlist, open Settings, connect the mailbox, switch on warm up. Add the custom tracking domain. Write the warm up start date in your setup sheet.
5. While warm up runs, fill `country`, `channel` and `do_not_contact` for every lead and write a short country rule table (lesson 1.5).
6. Build the campaign (lesson 1.4). At least two email steps and two LinkedIn steps with waits and one condition. Stop on reply on, open tracking off, sending hours and the week 1 cap set, LinkedIn daily limits set. Preview at least 20 leads and fix every error in the source sheet.
7. After at least 14 days of warm up, send one test to mail-tester.com. If the score is low, fix what it lists first.
8. Launch to 20 to 30 of your best fit leads only. Practice pack learners stop here and pause the campaign.
9. After 3 to 4 working days, check bounces, a test inbox placement in Gmail and Outlook, replies and LinkedIn warnings. Write what you saw. If clean, add the next batch at the week 2 cap.
10. Sort every reply into the four groups and answer each. Mark opt outs the same day.

**Hand in.**
- A one page setup doc (Google Doc) with your main domain's check results, the sending domain, mailbox, warm up start date, send cap schedule and LinkedIn limits
- Screenshots of the three checks on the sending domain and the mail-tester.com result
- Screenshots of the lemlist sequence with every step visible, and of the campaign settings
- The country rule table and the list with `country`, `channel` and `do_not_contact` filled
- A half page first send report. How many sent, bounces, replies by group, what you changed before the next batch

**Marking rubric.**

| Criterion | 0 | 1 | 2 | Must? |
|---|---|---|---|---|
| Separate sending domain with SPF, DKIM, DMARC all passing | Main domain used, or records missing | Separate domain, one record failing | All three pass, screenshots attached, main domain checked too | Must |
| Warm up of at least 14 days before the first cold email | No warm up, or under a week | 7 to 13 days | 14 days or more, kept running during sending | Must |
| Sequence uses email and LinkedIn with waits and a condition | Single channel | Both channels, no condition or waits wrong | Both channels, sensible waits, a working condition | |
| Safe settings and limits | Open tracking on, no stop on reply, no caps | Some set | Stop on reply, no open tracking, send cap and LinkedIn limits set and written down | Must |
| Country rules and opt outs handled | No country check | Country column, no rule written | Country rule table, channel set per lead, opt outs recorded the same day | Must |
| First send report | Missing | Numbers only | Numbers, what was checked and what changed before the next batch | |

**Good example.** Joris builds for a Dutch packaging wholesaler market. His doc opens with his employer's main domain checks (SPF and DKIM pass, no DMARC record, reported to IT the same day). Then getpackwise.nl bought on 2 March, one mailbox (joris@getpackwise.nl), warm up from 2 to 18 March, and a cap of 15, then 25, then 35 a day. Three green checks, and mail-tester scored well after he removed a link from the signature. The sequence is visit profile, invite, email 1, condition (accepted gets a LinkedIn message, not accepted gets email 2), email 3. His first send went to 25 leads. One bounce (he re verified and found two more bad emails in the next batch), three replies (one positive, one not now, one opt out marked the same afternoon). German leads were set to LinkedIn only.

**Bad example.** Mila's campaign sends from mila@hercompany.com, the main domain, to all 200 leads on day one with open tracking on. It fails the musts on the sending domain and on safe settings, and if spam reports came in, her whole company's email would suffer.

**Stuck?**
1. **DKIM won't authenticate.** The value got cut when copying, or you added it to the wrong domain. Copy it again from Google Admin in one piece, check the name is `google._domainkey`, wait an hour, click Start authentication again.
2. **LinkedIn steps don't run.** The Chrome extension isn't logged in, or your browser was closed. Check the extension shows your account as connected, and follow lemlist's current guidance for running LinkedIn steps.
3. **Variables show as blank in preview.** The CSV column name doesn't match the variable, or the cell is empty. Rename the column to match exactly, and filter out leads with empty fields before import.

### Module 2. APIs and automation

**Goal.** Connect three tools with an n8n workflow that runs by itself, handles errors and keeps a log.
**Time.** 37 minutes of video, plus 3 to 4 hours of assignment.
**You need.**
- An n8n account (the cloud trial) or a free self hosted copy if you're comfortable installing software
- A HubSpot free CRM with a few test contacts (a fresh portal is fine, Module 3 builds it out)
- A Google account (Sheets and Gmail) and, if you have one, a Slack workspace where you can add an app
- Your Level 1 Clay table, or an enrichment provider's API key from its trial (check the provider's pricing page)
- Your ICP rules from Level 1

#### Lesson 2.1 What an API and a webhook are, the restaurant way (6 min)

**In plain words.** An API is how one piece of software asks another for data or tells it to do something. A webhook is the other way round, the software tells you the moment something happens. Every automation you'll build is made of these two.

**You'll be able to.**
- Explain an API and a webhook to someone who isn't technical
- Name the parts of an API request (address, method, key, body)
- Read a simple API response and its status code

**What's shown.**
1. The restaurant. You're the customer, the kitchen is the other software, and you can't walk into the kitchen. The **menu** is the API documentation, the list of what you're allowed to order. The **waiter** is the **API**, which takes your order to the kitchen and brings back the dish. The order is the **request** and the dish is the **response**.
2. The parts of an order. The **endpoint** is the address you send the request to. The **method** says what you want. GET means "bring me something", POST means "here's something new", PATCH means "change this". The **API key** is your membership card, secret like a password. The **body** is the details of the order.
3. The webhook. At a busy food court they give you a buzzer, so you don't keep asking "is it ready?". A **webhook** is that buzzer. The other software sends a message to an address you gave it the moment something happens, like "new contact created". Asking again and again instead is called **polling**. It works, it's just slower and uses more requests.
4. Screen demo, a real response. Open a free public test API in the browser that returns sample users. The response is **JSON**, data written as labels and values in curly brackets, like `"company": "Routeful"`. Find one field in it.
5. **Rate limits.** The kitchen only cooks so many dishes a minute for you. Go over and you get an error, often code 429. Your flows should wait and try again.
6. **Status codes**, the waiter's short answers. 200 means fine. 401 means your key is wrong. 404 means that address doesn't exist. 429 means slow down. 500 means the kitchen has a problem.
7. Never paste an API key into a shared sheet, a screenshot or a chat. Lesson 2.2 shows where it lives instead.

**Do it now.** Pick two tools you use (for example HubSpot and Clay). Find each one's API documentation and write down, for one action, the endpoint, the method and what you'd send. Then write the restaurant version of a webhook for your own engine in two sentences.

#### Lesson 2.2 n8n basics, triggers, nodes and credentials (9 min)

**In plain words.** n8n is a tool where you build automations by joining boxes on a screen. Each box does one job. The first box decides when the flow starts, and the boxes after it pass data along like a relay.

**You'll be able to.**
- Create a workflow in n8n with a trigger
- Store a credential safely and connect HubSpot and Google Sheets
- Test a workflow step by step and read each node's output

**What's shown.**
1. Words first. A **workflow** is one automation from start to end. A **node** is one box that does one job. A **trigger** is the node that starts the workflow (a schedule, a webhook, a form). A **credential** is a saved login or key n8n uses to reach another tool. An **execution** is one run of the workflow.
2. Screen demo, a new workflow. Log in to n8n, click Create workflow (or the + button). Name it at the top, for example `L2 M2 new contact to Slack`. Click Add first step, search for Schedule Trigger, set it to every 15 minutes.
3. Screen demo, the HubSpot credential. In HubSpot, click the gear icon for Settings, go to Integrations and then Private Apps (in newer accounts this may sit under a legacy apps or development area). Click Create a private app, name it `n8n`, open the Scopes tab, tick the contacts read scope (and write if you'll update contacts), click Create app and copy the access token. Back in n8n, add a HubSpot node, open the Credential dropdown, choose Create new credential, pick the app token option, paste the token, click Save. It's now stored encrypted inside n8n.
4. Screen demo, the HubSpot node. Set Resource to Contact and Operation to the option that gets recently created or updated contacts. Click Test step. The right panel shows the output, one item per contact.
5. **Items** are the key idea. n8n passes a list of items from node to node. If HubSpot returns three contacts, the next node runs three times, once per item.
6. Screen demo, expressions. Add a Google Sheets node, create a Google credential by signing in, set Operation to Append row, pick the spreadsheet and sheet. For each column, drag a field from the left panel into the box. n8n writes it as an **expression**, a small piece of text in double curly brackets that means "use this value from the incoming data", like `{{ $json.properties.email }}`.
7. Screen demo, testing and going live. Click Test workflow. Each node gets a green tick and an item count. Click a node to see what went in and came out, and check the sheet. Then toggle the workflow to Active. The Executions tab lists every run.
8. Naming habit. Name every node by what it does (`Get new HubSpot contacts`, `Log to sheet`), never the default name.

**Do it now.** Build the three node flow from the demo (Schedule Trigger, HubSpot, Google Sheets) on your own HubSpot with two test contacts. Run it once by hand and check the two rows arrive.

#### Lesson 2.3 Building the three tool flow, branches and enrichment (9 min)

**In plain words.** Real flows do more than copy data. They check something, take a different path depending on the answer, call another tool to add information, and tell a person. This lesson builds the flow you'll hand in.

**You'll be able to.**
- Use an IF node to send items down two paths
- Call an enrichment step through Clay's webhook or an HTTP Request node
- Post a clear alert to the right person and avoid processing the same contact twice

**What's shown.**
1. The flow on a whiteboard first. Trigger (new HubSpot contact), check (has a work email?), enrich (company size and industry), decide (fits the ICP?), notify (Slack or email to the owner), log (one row in a sheet). Draw your flow before you build it, every time.
2. Screen demo, IF node. After the HubSpot node, add an IF node with the condition email is not empty. True goes on, false goes to the log node with status `skipped no email`.
3. Screen demo, enrichment option A, Clay. In Clay, create a table, choose to import from a webhook and copy the address. In n8n, add an HTTP Request node, method POST, URL the Clay webhook, body JSON with email, name and company domain. Clay runs your Level 1 waterfall on each new row. Clay works on its own clock, so read the enriched row back in a second scheduled flow, or have Clay send it back with its HTTP API column. Keep it simple.
4. Screen demo, enrichment option B, a direct API. Add an HTTP Request node, method and URL as the provider's documentation says, and add the API key with a credential of type header auth, never typed into the URL. Test it and find company size and industry in the JSON. This gives the answer in the same flow.
5. Screen demo, the fit check. A second IF node. For Routeful, `employees` between 20 and 500 and `industry` contains transport or logistics. True branch notifies, false branch logs only.
6. Screen demo, Slack. Add a Slack node, create the credential, Resource Message, Operation Send, choose the channel, and write the text with expressions, for example `New fit lead {{ $json.firstname }} at {{ $json.company }}, {{ $json.employees }} staff. Owner please check within one working day.` No Slack? Use the Gmail node, Operation Send, to the owner's email.
7. Duplicates. A schedule trigger reading "recently updated" contacts can see the same person twice. Log the HubSpot contact ID in the sheet and, before notifying, look it up with a Google Sheets node (Operation Get rows, filter on the ID). If found, skip.
8. Test with three contacts, one that fits, one that doesn't, one without an email. You should see one alert and three log rows.

**Do it now.** Draw your flow as six boxes with the condition on each IF written out. Then add the "has email" IF node to your lesson 2.2 flow and test it with a contact that has no email.

#### Lesson 2.4 Errors, logging and retries (8 min)

**In plain words.** Every automation breaks sometimes. A key expires, a tool is down, a field is empty. A good flow tells you when it breaks and keeps a record of what it did, so nothing gets lost quietly.

**You'll be able to.**
- Turn on retries and an error output for nodes that call other tools
- Build an error workflow that alerts you when any flow fails, and prove it works
- Log every run with a status and read the Executions list

**What's shown.**
1. Two kinds of failure. **Loud** ones stop the flow with a red node. **Silent** ones run fine but do the wrong thing, like sending an empty name. Silent ones are worse, and logging is how you catch them.
2. Screen demo, retries. Open the HTTP Request node, click its Settings, switch on Retry On Fail, max tries 3, a few seconds between tries. This handles short outages and rate limits.
3. Screen demo, continue on error. In the same settings, set On Error to continue using the error output. The node gets a second output for failed items. Connect it to the log node with status `enrichment failed`, so one bad record doesn't stop the batch.
4. Screen demo, the error workflow. Create a workflow called `Error alerts`. Add an Error Trigger node and a Slack or Gmail node that sends `Workflow {{ $json.workflow.name }} failed at {{ $json.execution.lastNodeExecuted }}, open {{ $json.execution.url }}`. Save. Open your main workflow's settings, find Error workflow, pick `Error alerts`.
5. A good log row. Timestamp, workflow name, HubSpot contact ID, email, step reached, status (`notified`, `skipped no email`, `not a fit`, `enrichment failed`), note. One row per contact per run.
6. Test the failure on purpose. Change the HubSpot token to a wrong value, run the flow, check the alert arrives, put the right token back. A **positive control** means proving your alarm works by setting it off on purpose. If you haven't seen it fire, you don't know it works.
7. Screen demo, Executions. Filter on failed, click one, see which node is red and read the error. Fix, then retry that execution if offered.
8. Keys expire and people leave. Write in your setup sheet which credential belongs to which account and who owns it.

**Do it now.** Add retries and the error output to your HTTP Request node, build `Error alerts`, link it, and set it off with a wrong token. Screenshot the alert.

#### Lesson 2.5 When not to automate (5 min)

**In plain words.** Automating a bad process just makes the mistakes faster. Some jobs should stay manual, at least for now. This lesson gives you a four question test to decide.

**You'll be able to.**
- Score a task on the four question automation test
- Keep tasks that need human judgement manual, with a person in the loop
- Write an "automate now, later, never" list for your engine

**What's shown.**
1. The four questions. Does it happen often (weekly or more)? Are the steps the same every time? Is the input data clean and in a known place? Is a mistake cheap and easy to undo? Four yeses, automate. One or two noes, do it by hand for a while and write the steps down. A no on the last question, keep a person in the loop.
2. Tasks that pass. Logging new contacts to a sheet. Alerting an owner about a new fit lead. Moving a deal's next step date into a task.
3. Tasks that fail. Sending a first message to a prospect with no human reading it. Deciding fit from an unclear job title. Deleting records.
4. Astra's own rule. Research and drafting get help from automation, but every outward message is read by a person before it's sent, and the thread is read again right before the send. That check has caught wrong claims, which is why it stays manual.
5. Upkeep. Each flow is a small machine someone looks after. Count the minutes it saves a week against the minutes a month it takes to maintain.
6. **Human in the loop** means the flow prepares something and waits for a person to approve it. In n8n, send the draft by Slack or email and only continue once someone approves. Do a task by hand five times before you automate it, and you'll find the edge cases first.

**Do it now.** List ten tasks from your engine. Score each on the four questions and put it in one of three columns, automate now, automate later, keep manual.

#### Quiz 2 (pass 80%)

1. In the restaurant picture, what is the API?
   A. The kitchen B. The waiter C. The menu D. The customer
   **Answer.** B. **Why.** The API carries your request to the other software and brings back the answer. **Rewatch.** 2.1

2. True or false. A webhook means you keep asking another tool every few minutes whether something changed.
   **Answer.** False. **Why.** That's polling. A webhook is the buzzer, the tool tells you the moment it happens. **Rewatch.** 2.1

3. Your HTTP Request node returns status 401. What's the likely cause?
   A. Too many requests B. The other tool is down C. The address doesn't exist D. The API key is wrong or expired
   **Answer.** D. **Why.** 401 means not authorised. **Rewatch.** 2.1

4. Where should an API key live in n8n?
   A. Typed into the URL of the node
   B. In an n8n credential
   C. In the node's name
   D. In a Google Sheet so the team can see it
   **Answer.** B. **Why.** Credentials are stored encrypted and reused, never shown in nodes or shared files. **Rewatch.** 2.2

5. The HubSpot node returns 4 contacts. How many times does the next node run?
   A. Four times, once per item B. It depends on the trigger C. Once D. Twice
   **Answer.** A. **Why.** n8n runs each node once per incoming item. **Rewatch.** 2.2

6. Your flow sent two Slack alerts for the same contact. What's the best fix?
   A. Ask the seller to ignore duplicates
   B. Log the contact ID and check the log before notifying
   C. Run the flow less often
   D. Delete the flow
   **Answer.** B. **Why.** Checking the ID against the log stops the same contact being processed twice. **Rewatch.** 2.3

7. What does an Error Trigger node do?
   A. Retries the failed node
   B. Fixes errors automatically
   C. Starts a workflow when another workflow fails, so you can send an alert
   D. Deletes failed executions
   **Answer.** C. **Why.** It's the start of your alert workflow. **Rewatch.** 2.4

8. True or false. If you've never seen your error alert fire, you can't be sure it works.
   **Answer.** True. **Why.** Set it off on purpose once, that's your positive control. **Rewatch.** 2.4

9. Which task should keep a person in the loop?
   A. Copying a deal's close date into a report
   B. Logging new contacts to a sheet
   C. Posting a new lead alert in Slack
   D. Sending a first message to a prospect
   **Answer.** D. **Why.** A mistake in an outward message can't be undone, so a person reads it first. **Rewatch.** 2.5

10. Tom wants to automate a task he has never done by hand and whose steps change each time. What should he do?
   A. Buy a different tool
   B. Ask an AI to do it with no checks
   C. Build the flow anyway
   D. Do it by hand a few times, write the steps down, then decide
   **Answer.** D. **Why.** Steps that aren't stable fail the automation test. **Rewatch.** 2.5

#### Assignment 2. An n8n flow connecting three tools

**Goal.** Build a live n8n workflow that takes new HubSpot contacts, enriches them, alerts the owner about fit leads, and logs every run, with error handling.
**Time.** 3 to 4 hours.
**You need.** n8n, HubSpot free CRM with a private app token, Google Sheets, Slack or Gmail, a Clay table or an enrichment API key, your ICP rules.

**Steps.**
1. Draw the flow as boxes in a Google Doc first, with each condition written out (lesson 2.3).
2. In n8n, click Create workflow and name it `L2 M2 [your name] new contact flow`.
3. Add a Schedule Trigger every 15 minutes (or a webhook trigger if your HubSpot plan allows webhooks).
4. Add the HubSpot node with your credential, operation get recently created or updated contacts.
5. Add an IF node, email is not empty.
6. Add a Google Sheets node that looks up the contact ID in your log sheet, and an IF node that skips contacts already logged.
7. Add the enrichment step, Clay webhook (option A) or HTTP Request with a header auth credential (option B). Switch on Retry On Fail (3 tries) and set On Error to continue with the error output.
8. Add an IF node with your ICP fit rule (size and industry at least).
9. On the fit branch, add Slack (or Gmail) with a message naming the contact, company, why they fit and what the owner should do by when.
10. On every branch, end with a Google Sheets Append row node writing timestamp, workflow name, contact ID, email, step reached, status and note.
11. Build the `Error alerts` workflow and set it as the error workflow of your main flow.
12. Test with four contacts, one fit, one not fit, one without email, one already logged. Then break the token on purpose and confirm the alert arrives. Fix it.
13. Rename every node by what it does. Toggle the workflow to Active.
14. Write a one page note. What the flow does, its credentials and their owners, how to tell it's working, and what you chose not to automate and why.

**Hand in.**
- The workflow exported as JSON (open the workflow menu, choose Download). n8n leaves credentials out of the export, but check
- A screenshot of the whole canvas with every node named
- A screenshot of the Executions tab showing a successful run and the deliberate failure
- The log sheet link (view access) with the four test rows, and a screenshot of the error alert
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
1. **HubSpot node returns nothing.** The private app is missing the contacts read scope, or no contacts changed in the time window. Check the scope, create a new test contact, run again.
2. **Expressions show as empty in Sheets.** The field path is wrong, for example `$json.email` when HubSpot puts it under `$json.properties.email`. Drag the field in from the previous node's output rather than typing it.
3. **The error workflow never fires.** It isn't linked in the main workflow's settings, or the failing node is set to continue on error so the run counts as a success. Link it, and log those items through the error output.

### Module 3. CRM architecture

**Goal.** Design and build a clean CRM with a field map, stages with exit criteria, a deduplication rule and a routing rule, using HubSpot and the messy practice export.
**Time.** 39 minutes of video, plus 4 hours of assignment.
**You need.**
- HubSpot free CRM (a fresh portal is best, so you can break things safely)
- The practice pack's messy CRM export of 400 contacts, or an export of your own company's CRM if you're allowed to use it
- Google Sheets and the CRM field map template
- Your n8n flow from Module 2 (for routing)
- The practice pack's sales team of 6

#### Lesson 3.1 Objects, records, fields and associations (7 min)

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
5. Screen demo. In HubSpot, open Contacts, click a contact, and show the right sidebar with the associated company and deals. Click Add on the Companies card and link one.
6. Wrong object mistakes. Company size stored on the contact. Deal value written in a contact note. One contact record used for a whole company ("Sales Team Transport Noord").
7. Rule of thumb. If it describes the person, it's on the contact. If it describes the business, it's on the company. If it describes one possible sale, it's on the deal.
8. HubSpot matches contacts by email and companies by domain. That's why clean emails and domains matter so much. They're how the CRM knows two rows are the same.

**Do it now.** Open the practice export. For its first 20 columns, write whether each belongs on the contact, the company or a deal, and mark any you'd drop.

#### Lesson 3.2 The field map (8 min)

**In plain words.** A field map is one sheet that lists every field in the CRM, what it means, who fills it in, where the data comes from and which values are allowed. It stops ten people using one field ten different ways.

**You'll be able to.**
- Build a field map with the standard columns
- Decide which fields are required and which get cut
- Turn messy free text fields into dropdowns with fixed values

**What's shown.**
1. A **field map** is a document listing every field, what it means, who fills it and where the data comes from.
2. Screen demo, the template. Columns are object, field name (as shown), internal name, type (text, number, date, dropdown, checkbox), allowed values, meaning in one sentence, source (manual, import, Clay, n8n, form), owner (who keeps it right), and required (yes or no).
3. Less is more. Every field someone must fill is a field that will be wrong half the time. Keep only what's used for a decision, a report or a message. For a first build, aim for under 15 custom fields across all objects.
4. Dropdowns beat free text. The practice export has country written as "NL", "Netherlands", "Nederland" and "holland". Make `Country` a dropdown with fixed values. Do the same for persona (operations director, head of planning, owner or managing director, other) instead of trusting raw job titles.
5. Screen demo, creating a property. In HubSpot, click the gear icon, go to Properties (under Data Management), pick the object in the dropdown, click Create property. Choose the group, type the label, pick the field type (for example Dropdown select), add the options, click Create.
6. The Routeful field map in brief. Company has `Fleet size` (number, source Clay), `Current planning tool` (dropdown, Excel, old TMS, modern TMS, unknown), `ICP tier` (dropdown, 1, 2, 3, not a fit) and `Fit score` (number, from your Level 1 scoring model). Contact has `Persona`, `Country`, `Lead source` (all dropdowns), `Do not contact` (checkbox) and `Legal basis note` (text). Deal has `Primary pain` (dropdown from your call transcripts), `Next step` and `Next step date`.
7. Write each meaning so a new hire understands it. "Fleet size. Number of trucks the company owns, not leases, as found on their site or registry. Updated by Clay monthly." Keep the map where everyone can find it, and change the map before you change the CRM, never after.

**Do it now.** Copy the field map template and fill it for at least 12 fields of your CRM, with allowed values for every dropdown.

#### Lesson 3.3 Stages and exit criteria (7 min)

**In plain words.** A pipeline is the list of steps a deal goes through, from first meeting to won or lost. Each step needs a clear rule for when a deal may move on, otherwise every seller moves deals on a feeling and the numbers mean nothing.

**You'll be able to.**
- Set up a deal pipeline in HubSpot with your stages
- Write an exit criterion for every stage
- Make the fields that prove the exit criterion required at that stage

**What's shown.**
1. A **pipeline** is all open deals and where each one is. A **stage** is a step in it. **Exit criteria** are what must be true before a deal moves to the next stage.
2. The practice pack's stages are New, Meeting booked, Discovery done, Demo done, Proposal sent, Won, Lost.
3. Exit criteria for Routeful, written as facts you could check. New to Meeting booked, a meeting is in the calendar with someone in a target persona. Meeting booked to Discovery done, the meeting happened and fleet size, current tool, main pain and the decision maker are recorded. Discovery done to Demo done, a demo was given with the decision maker or their delegate present. Demo done to Proposal sent, a written proposal with a price was sent and a decision date agreed. Proposal sent to Won, signed. Any stage to Lost, a lost reason picked from the dropdown.
4. Screen demo. In HubSpot click the gear icon, go to Objects, then Deals, then the Pipelines tab. Rename or add stages. Keep HubSpot's default win probabilities for now, Module 5 sets them from your own data.
5. Screen demo, required fields per stage. On the same page, edit the stage properties (conditional stage properties, where your tier allows it). For Discovery done, require `Primary pain`, `Fleet size` and `Decision maker named`. If your tier doesn't offer this, write the rule in the field map and check it in the weekly hygiene review.
6. Lost is a stage, never a deletion. Lost deals are the raw material for win and loss analysis. And one pipeline per sales motion, so new business and renewals get separate pipelines if they work differently.

**Do it now.** Write exit criteria for every stage of your pipeline as facts someone else could check. Then build the pipeline in HubSpot.

#### Lesson 3.4 Deduplication, cleaning the messy export (10 min)

**In plain words.** Duplicates are two records for the same person or company. They split history, send people the same email twice, and make every count wrong. You clean them before import, and you write a rule so they don't come back.

**You'll be able to.**
- Clean the practice export in Google Sheets before it goes near the CRM
- Write a dedup rule that says what counts as the same record and which one wins
- Import a clean file into HubSpot with the right column mapping

**What's shown.**
1. **Deduplication (dedup)** means finding records that are the same person or company and merging them into one. **CRM hygiene** means keeping data correct, complete and without duplicates.
2. Screen demo, a safe copy. Open the export in Google Sheets, click File, Make a copy. Never clean the original. Add a `row_id` column with numbers 1 to 400 so you can always trace a row back.
3. Screen demo, normalise first. Helper columns. `email_clean` with `=LOWER(TRIM(B2))`. `domain` with `=LOWER(REGEXEXTRACT(B2,"@(.+)$"))`. `country_clean` with a lookup tab that maps every spelling ("NL", "Nederland", "holland") to one value, using `=VLOOKUP(TRIM(LOWER(F2)),Countries!A:B,2,FALSE)`.
4. Screen demo, find duplicates. A `dup_count` column with `=COUNTIF(K:K,K2)` on `email_clean`. Above 1 means a duplicate by email. For rows without email, build a `name_company_key` from lower case first name, last name and domain, and count that.
5. The dedup rule has three parts. What matches (same `email_clean`, or with no email, same first name plus last name plus company domain). Which record survives (the most recent activity, or if equal, the most filled fields). What happens to the rest (empty fields on the survivor are filled from the duplicate, then the duplicate is removed). Personal email domains like gmail.com never match a company.
6. Screen demo, merge. Sort by key, then by last activity, and work through groups with a filter view. Keep a `merged_into` column so you can prove what happened to every `row_id`.
7. Missing emails. Don't invent or guess them. Mark them `needs_enrichment` and send them through your Level 1 waterfall later. Mixed job titles get mapped to a persona with a lookup tab, and the original title stays in its own field.
8. Screen demo, the import. In HubSpot, open Contacts, click Import, Start an import, File from computer, One file, and choose to import contacts and companies together (associated). Upload the clean CSV, map each column to a property, choose "don't import" for helper columns, pick the option to update existing records matched by email. Click Finish import and open the error file if one appears.
9. After import, check. Count contacts in HubSpot against your clean row count. Search three names you know were duplicates and confirm one record each. Some HubSpot tiers have a duplicate management tool (check yours). On the free CRM, cleaning before import is your main defence.

**Do it now.** On a copy of the practice export, build `email_clean`, `domain` and `dup_count`, and write down how many duplicate groups you found by email alone.

#### Lesson 3.5 Routing and hygiene as a habit (7 min)

**In plain words.** Routing is the rule that decides which person gets each new lead, so nothing sits unowned. Hygiene is the small weekly routine that keeps the CRM clean after the big cleanup.

**You'll be able to.**
- Write a routing rule for a team of six that covers every case, with a fallback
- Build it with n8n, setting the contact owner in HubSpot
- Run a 20 minute weekly hygiene check from saved views

**What's shown.**
1. **Routing** means automatically giving a lead to the right person. **Speed to lead** is how fast someone follows up after a lead comes in. A great lead that waits three days is often a lost lead.
2. The routing rule for the practice team, as a decision table. Tier 1 account that already has an owner goes to that owner. Tier 1 with no owner goes to the AE for that country (NL, BE, DE). Tier 2 and 3 go to the two SDRs in turn (**round robin**, which means taking turns). Not a fit, or do not contact, goes to nobody and is logged. Every routed lead gets a task "first touch within 1 working day".
3. The fallback. If the AE is on holiday or the country is unknown, the lead goes to the manager, who reassigns within a day. A rule without a fallback leaves leads unowned.
4. Screen demo, building it in n8n. Extend your Module 2 flow. After the fit check, add a Switch node (an IF with many paths) on `ICP tier` and `Country`. For each path, a HubSpot node, Operation Update contact, sets `Contact owner` to the right owner ID (find the IDs in HubSpot under Settings, Users and Teams, or through the owners option in the HubSpot node). Another HubSpot node creates a task for that owner due tomorrow.
5. Round robin without paid tools. Keep a cell in a Google Sheet with whoever got the last lead. Read it, assign the other SDR, write the new name back. HubSpot's own workflows can route on paid tiers. On the free CRM, n8n does the job.
6. Screen demo, hygiene views. In HubSpot, open Contacts, click Add view, set the filters, click Save. Three views. Contacts with no owner. Deals with a next step date in the past. Contacts created this week missing `Persona` or `Country`.
7. The weekly check, 20 minutes on the same day each week. Open each view, fix or assign everything in it, write the three counts in your scorecard. If a count grows two weeks running, the process is broken, not the people, so find the step that lets bad data in. Write an owner's name next to each view, or it won't happen.

**Do it now.** Write your routing rule as a decision table, including a fallback, and create the three hygiene views in HubSpot.

#### Quiz 3 (pass 80%)

1. Where does "fleet size" belong?
   A. Company B. Deal C. Ticket D. Contact
   **Answer.** A. **Why.** It describes the business, not the person or one sale. **Rewatch.** 3.1

2. True or false. The more custom fields a CRM has, the better the data.
   **Answer.** False. **Why.** Every required field is one more that gets filled wrong. Keep only fields used for a decision, report or message. **Rewatch.** 3.2

3. The export has "NL", "Netherlands" and "holland" in the country column. What's the best fix?
   A. Fix it by hand in HubSpot after import
   B. Leave it, people know what it means
   C. Make Country a dropdown and map every spelling to one value before import
   D. Delete the country column
   **Answer.** C. **Why.** Fixed values make filters and reports work. **Rewatch.** 3.2

4. Which of these is a good exit criterion for "Discovery done"?
   A. The prospect opened the email
   B. The meeting happened and fleet size, current tool, main pain and decision maker are recorded
   C. The deal is older than two weeks
   D. The seller feels it went well
   **Answer.** B. **Why.** It's a fact someone else could check. **Rewatch.** 3.3

5. A deal is lost. What do you do with it?
   A. Delete it B. Leave it in Proposal sent C. Move it to Lost and pick a lost reason D. Change its value to zero
   **Answer.** C. **Why.** Lost deals feed win and loss analysis. **Rewatch.** 3.3

6. What are the three parts of a dedup rule?
   A. Import, export, delete
   B. Who, when, why
   C. What matches, which record survives, what happens to the others
   D. Email, phone, name
   **Answer.** C. **Why.** Without all three, two people dedup the same file differently. **Rewatch.** 3.4

7. Two records share the email anna@gmail.com but have different company names. Your rule matches on email. What should you check first?
   A. Nothing, merge them
   B. Whether it's really one person, because personal addresses don't tell you the company
   C. Change one email
   D. Delete both
   **Answer.** B. **Why.** Personal email domains never match a company, so confirm before merging. **Rewatch.** 3.4

8. A contact has no email in the export. What do you do?
   A. Guess it from the name and domain and import it
   B. Use the company's info@ address
   C. Mark it needs enrichment and run it through your waterfall later
   D. Delete the contact
   **Answer.** C. **Why.** Never invent data. Find it properly or leave it empty. **Rewatch.** 3.4

9. Your routing rule sends Tier 1 leads to the AE for the country. A lead's country is empty. What should the rule say?
   A. Give it to whoever logged in last
   B. Nothing, it'll sort itself out
   C. Delete the lead
   D. A fallback, for example the manager assigns it within a day
   **Answer.** D. **Why.** Every routing rule needs a fallback so no lead is unowned. **Rewatch.** 3.5

10. The "deals with a past next step date" view has grown three weeks in a row. What's the right reading?
   A. Hide the view
   B. The sellers are lazy
   C. Delete old deals
   D. Something in the process lets it happen, so find and fix that step
   **Answer.** D. **Why.** Growing hygiene counts point to a broken step, not a people problem. **Rewatch.** 3.5

#### Assignment 3. A CRM with a field map, a dedup rule and a routing rule

**Goal.** Turn the messy practice export (or your own data) into a clean HubSpot CRM with a written field map, dedup rule and working routing rule.
**Time.** 4 hours.
**You need.** HubSpot free CRM, the practice export of 400 contacts, Google Sheets, the field map template, your Module 2 n8n flow, the practice sales team of 6 (add them as users, or as owners with the practice names if you can't add users).

**Steps.**
1. Copy the field map template and fill it for every field you'll keep (lesson 3.2). Aim for under 15 custom fields. List the fields you dropped and why.
2. In HubSpot, create every custom property from the map (gear icon, Properties, Create property). Use dropdowns for country, persona, ICP tier, lead source and lost reason.
3. Build the deal pipeline with the seven practice stages, and write exit criteria for each in the field map's second tab (lesson 3.3).
4. Make a copy of the export. Add `row_id`, `email_clean`, `domain`, `country_clean`, `persona` and `dup_count` (lesson 3.4).
5. Write your dedup rule (what matches, who survives, what happens to the rest) in the field map's third tab. Apply it. Fill `merged_into` for every removed row.
6. Write down three numbers. Rows before, duplicate groups found, rows after.
7. Import into HubSpot as contacts and companies, associated. Map every column. Fix whatever the error file lists.
8. Check the import. Count records, search three known duplicates, open three random contacts to see a company is linked.
9. Write the routing rule as a decision table with a fallback (lesson 3.5). Build it in n8n, setting `Contact owner` and creating a first touch task.
10. Test routing with five test contacts. Tier 1 NL, Tier 1 DE, Tier 2, not a fit and missing country.
11. Create the three hygiene views and write the owner and day of the weekly check.

**Hand in.**
- The field map sheet link (three tabs, fields, stages with exit criteria, dedup rule)
- The cleaned sheet link with `row_id` and `merged_into` columns, and the three numbers
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
3. **The numbers don't add up.** Some rows were removed without a `merged_into` value. Filter for removed rows with an empty `merged_into`, trace them by `row_id` in the original copy, and fill them in.

### Module 4. Allbound and loyalty flows

**Goal.** Join inbound and outbound into one system, and build the flows that keep, grow and win back customers after the sale.
**Time.** 35 minutes of video, plus 3 hours of assignment.
**You need.**
- Your HubSpot CRM from Module 3, with the routing rule
- Your n8n account and Module 2 flow
- Your lemlist account and Module 1 campaign
- A HubSpot form (the free CRM includes forms) or any web form tool
- The practice pack's pipeline (it includes won deals you can treat as customers, and lost deals)

#### Lesson 4.1 The inbound to outbound handover (8 min)

**In plain words.** Inbound means people come to you, for example by filling in a form. Most companies answer inbound slowly and the same way for everyone. A good handover checks who it is, enriches them, routes them to the right person and starts a fitting follow up within minutes.

**You'll be able to.**
- Map the steps from form fill to first human reply, with a time target on each
- Decide which inbound leads get a person and which get a sequence
- Build a form to n8n to HubSpot handover

**What's shown.**
1. **Inbound** means people contact you first. **Outbound** means you contact them first. **Allbound** joins the two, so a signal from one side starts a well timed action on the other.
2. The handover on a whiteboard. Form filled, contact created, enriched, scored, routed (Module 3), first reply sent, logged. Write the time target next to each arrow. For a Tier 1 demo request, a person replies within one working hour.
3. Three kinds of inbound, three paths. A demo or contact request from a fit company goes straight to the owner with an alert and a task. A content download (a guide, a webinar) from a fit company goes into a short, helpful lemlist sequence and the owner is told. Anyone not a fit gets a polite automated reply and nothing else.
4. Screen demo, the form. In HubSpot, open Marketing, then Forms, click Create form, choose an embedded form. Fields for name, work email, company website, and one question that helps routing ("How many trucks does your company run?" for Routeful). Add a consent line that matches your legal basis, say what happens next, and click Publish.
5. Screen demo, catching it in n8n. A schedule trigger reading new form submissions through the HubSpot node works on the free plan. Where your plan allows webhooks, a Webhook node makes it instant. Then reuse your Module 2 enrichment and Module 3 routing nodes.
6. Screen demo, the follow ups. Demo requests get a Slack alert to the owner with everything the enrichment found, plus a HubSpot task due in one hour. Downloads from fit companies get added to an inbound lemlist campaign through the lemlist node or an HTTP Request node. Check the lemlist API documentation for the current way to add a lead to a campaign.
7. The inbound sequence is different from cold outbound. They asked for something, so start by giving it to them, then ask one question tied to what they downloaded. No pitch in the first message.
8. Measure it. Log the form time and the first reply time in your sheet. The gap is your speed to lead, and it goes on the dashboard in Module 5.

**Do it now.** Draw your inbound handover with its three paths and a time target on every arrow.

#### Lesson 4.2 Website visitors and ad engagement to outbound (6 min)

**In plain words.** Some companies visit your site or engage with your ads without filling in a form. With the right tools and care, you can spot some of them and reach out with a reason that fits. This lesson shows how, and where the privacy lines are.

**You'll be able to.**
- Explain company level visitor identification and its limits
- Turn a visit or ad signal into a scored task, not an instant message
- Write a visit based opener that doesn't creep people out

**What's shown.**
1. **Visitor identification** tools try to work out which company a website visitor works for, usually from their network address. Most can tell you the company, sometimes. Few can reliably tell you the person.
2. Privacy first, and this is not legal advice. In the EU, tracking on a website needs a cookie notice and often consent, and person level identification is much harder to justify than company level. Check your site's consent setup with whoever owns it, and the tool's own GDPR documentation, before you switch anything on.
3. A visit is a signal, not a lead. Treat it like the signals in your Level 1 scoring model. Add points to the account's intent score, and act only when the account also fits the ICP. Strong page signals are the pricing page, a specific product or integration page, a case study in their industry, or several visits in a week. A single blog visit means little.
4. Ad engagement works the same way. If your company runs LinkedIn ads, Campaign Manager can show which companies engaged (check what your account offers). Export it weekly and match it to your account list.
5. Screen demo, the flow. Visitor tool (or weekly ad export) to a Google Sheet, Clay matches the domain to your account list and adds the fit score, n8n checks fit plus intent above your threshold, then creates a HubSpot task for the owner, "Account showed interest in pricing, reach out this week".
6. The message. Don't say "I saw you on our pricing page". It feels like being watched. Use the topic, not the visit. "Planners often ask how pricing works when the fleet changes size through the year. Happy to show how others handled it." Then your normal one problem structure. Keep a person in the loop, because signals are noisy and a wrong guess is cheap to check and expensive to send.

**Do it now.** List the five pages on a typical vendor site in your market that would count as a strong signal, and give each a point value for your intent score.

#### Lesson 4.3 Onboarding and retention flows (7 min)

**In plain words.** After someone buys, the next job is making sure they actually use what they bought. Onboarding flows guide the first weeks. Retention flows keep checking in so problems are caught before the customer leaves.

**You'll be able to.**
- Write a first 30 days onboarding flow with a clear "first value" moment
- Set up retention touchpoints tied to real signals, not dates alone
- Build the deal won to onboarding handover in n8n

**What's shown.**
1. **Loyalty or retention flows** are the messages and steps after the sale that keep customers happy, using and buying. **Churn** means customers who stop buying.
2. **First value** is the moment a new customer first gets what they paid for. For Routeful, it's the first week a planner plans all routes in Routeful instead of Excel. Every onboarding step should move them towards it.
3. A 30 day plan for Routeful. Day 0, welcome email from the account owner with the kickoff date. Day 2, kickoff call. Day 7, check fleet and drivers are loaded. Day 14, first full week planned, and if not, a call. Day 30, review with the operations director of what changed.
4. Screen demo, the handover. When a deal moves to Won in HubSpot, n8n (a schedule trigger, a HubSpot node reading deals in Won changed since the last run) creates the onboarding tasks for the customer success person, sends the welcome email draft for approval, and logs it.
5. Retention touchpoints are tied to signals, not only the calendar. Usage dropping, a key user leaving, many support tickets, a renewal date 90 days out.
6. The sales to customer success handover note. What they bought, why (the pain from discovery), who the champion is, and what was promised. Make these required on the Won stage, as in Module 3. The fastest way to lose a customer is to forget a promise.

**Do it now.** Write the 30 day onboarding plan for your market's product, with the first value moment named and each step's owner.

#### Lesson 4.4 The customer health score (7 min)

**In plain words.** A health score is a number for each customer that shows whether they're likely to stay or leave. It's built from a few signals you already have, and it tells the team who needs a call this week.

**You'll be able to.**
- Choose four to six health signals and weight them
- Build a health score in Google Sheets with a red, amber, green result
- Decide what action each colour triggers, and test the score against reality

**What's shown.**
1. **Customer health** is a score that shows whether a customer is likely to stay or leave. It works like your fit and intent scores, but for customers.
2. Routeful's signals, each scored 0 to 2. Usage (share of routes planned in Routeful last month). Breadth (active planners against seats bought). Support (tickets in the last 30 days, more is worse unless they're how to questions). Relationship (champion still there, last meeting within 90 days). Payment (invoices paid on time). Sentiment (last survey or call tone).
3. Weights. Usage counts double, because for a tool like this it tends to predict staying best. Treat the weights as a guess first, then check them against customers who actually left.
4. Screen demo, the sheet. One row per customer, one column per signal, a weighted total with `=SUMPRODUCT(B2:G2,$B$1:$G$1)` where row 1 holds the weights, and a status with `=IF(H2>=9,"Green",IF(H2>=5,"Amber","Red"))`. Colour it with Format, Conditional formatting.
5. Actions per colour. Green, ask for a referral or a case study (lesson 4.5). Amber, the owner calls this month with a specific question about the weak signal. Red, a meeting with the decision maker within two weeks and a written save plan.
6. Where the data comes from. Usage and seats from the product (an export or API), tickets from the help desk, relationship and payment from the CRM. Start with a weekly manual export, and automate later using the lesson 2.5 test.
7. Check the score against reality. Take customers who left last year. Would your score have shown them red three months before? If not, change the signals.

**Do it now.** Build the health score sheet with six signals and weights for ten practice customers (use the Won deals in the practice pipeline and make up the usage values, clearly marked as practice data).

#### Lesson 4.5 Reactivation and referral flows (7 min)

**In plain words.** Reactivation means winning back people who went quiet, like lost deals, old leads and former customers. Referral means asking happy customers to introduce you to others. Both are cheaper than finding new people from scratch.

**You'll be able to.**
- Pick the right reactivation pool and time window
- Write a reactivation message that gives a new reason to talk
- Build a reactivation flow from HubSpot to lemlist with a review step, and a referral ask

**What's shown.**
1. **Reactivation** means getting back in touch with people who stopped talking to you. Three pools. Deals lost 3 to 12 months ago with a reason that might have changed. Leads that never replied. Former customers.
2. Pick by lost reason. "Timing" and "budget" are worth reactivating. "Chose a competitor" is worth it near their contract end. "Not a fit" stays closed. This is why Module 3 made lost reason a required dropdown.
3. A new reason, every time. "Just checking in" fails. Use something that changed. A new feature that answers their stated objection, a new case study in their industry, a signal like hiring planners again or opening a new depot.
4. The message shape. Remind them of the last conversation in one line, name the change, ask one low effort question. "When we spoke in March, the blocker was the cost of moving from your TMS. We now import TMS data in a day. Would a 10 minute look at how that works be useful?"
5. Screen demo, the flow. In HubSpot, a saved view of deals in Lost with a close date 3 to 12 months ago and lost reason timing or budget. In n8n, a monthly schedule reads those deals and their contacts, checks `Do not contact` is false, writes each with its reason and what changed into a review sheet, and adds only rows marked `approved` to a two step lemlist reactivation campaign.
6. Rules. Never reactivate someone who opted out. Check the legal basis still holds, since time passing can weaken it. Read the whole history first, so you never contradict what was said before.
7. **Referral flows.** When a customer turns green and has passed first value, the owner gets a task to ask for a referral, made specific. "Do you know one other planning lead at a transport firm who still plans in Excel?" Record referral and reactivation as lead sources, so Module 5 can show which flow brings pipeline.

**Do it now.** In the practice pipeline, filter the Lost deals by lost reason and count how many would enter your reactivation pool under the rule in step 2.

#### Quiz 4 (pass 80%)

1. What does allbound mean?
   A. Using every channel at once
   B. Sending to everyone on your list
   C. Only doing inbound
   D. Joining inbound and outbound, so a signal on one side starts a well timed action on the other
   **Answer.** D. **Why.** That's the definition used in this course. **Rewatch.** 4.1

2. A Tier 1 company fills in the demo request form. What should happen?
   A. They get added to a 6 step cold sequence
   B. The owner gets an alert and a task, and a person replies within the time target
   C. Nothing until the weekly review
   D. An automated email with a price list only
   **Answer.** B. **Why.** High fit, high intent leads get a fast human reply. **Rewatch.** 4.1

3. True or false. A visit to your pricing page from a company that doesn't fit your ICP should trigger an outbound message.
   **Answer.** False. **Why.** A visit is an intent signal. Act only when fit is also there. **Rewatch.** 4.2

4. Which opener is better after a pricing page visit?
   A. "Re: your visit"
   B. No message, ever
   C. A message about the topic people usually ask about on that page, with no mention of the visit
   D. "I saw you on our pricing page yesterday."
   **Answer.** C. **Why.** Use the topic, not the surveillance. Fake "Re:" subjects are banned. **Rewatch.** 4.2

5. What is "first value"?
   A. The highest priced deal
   B. The moment a new customer first gets what they paid for
   C. The first invoice paid
   D. The first meeting
   **Answer.** B. **Why.** Onboarding steps all lead towards it. **Rewatch.** 4.3

6. Which signal is usually the strongest in a software customer's health score?
   A. Their logo colour B. How often you email them C. Company age D. Actual product usage
   **Answer.** D. **Why.** Customers who use the product tend to stay, which is why usage counts double here. Check it against your own lost customers. **Rewatch.** 4.4

7. How do you check a health score works?
   A. See whether customers who left would have shown red months before
   B. Make all weights equal
   C. Only count green customers
   D. Ask the CEO
   **Answer.** A. **Why.** Test the score against real outcomes and adjust the signals. **Rewatch.** 4.4

8. Which lost deal should NOT go into reactivation?
   A. Lost as not a fit
   B. Lost on timing 6 months ago
   C. Lost on budget 4 months ago
   D. Lost to a competitor, contract ends next quarter
   **Answer.** A. **Why.** Not a fit stays closed. **Rewatch.** 4.5

9. True or false. "Just checking in" is a good reactivation message.
   **Answer.** False. **Why.** Every reactivation needs a new reason, something that changed. **Rewatch.** 4.5

10. When should the referral ask happen?
   A. When the customer is green and has reached first value
   B. When the customer is red
   C. Never
   D. In the first sales call
   **Answer.** A. **Why.** Happy customers who've seen results are the ones who refer. **Rewatch.** 4.5

#### Assignment 4. One inbound to outbound flow and one reactivation flow

**Goal.** Build two live flows, one that turns a form fill into an enriched, routed, followed up lead, and one that reactivates lost deals with a new reason.
**Time.** 3 hours.
**You need.** HubSpot (forms and your Module 3 CRM), n8n, lemlist, Google Sheets, the practice pipeline or your own lost deals, your Module 2 and 3 flows.

**Steps.**
1. Draw both flows as boxes first, with time targets and conditions on each arrow.
2. Build the HubSpot form (lesson 4.1) with one routing question and a clear consent line. Publish it on a test page or use the share link.
3. In n8n, build the inbound flow. Trigger on new submissions, enrich, score, then a Switch with three paths. Demo request from a fit company (alert and one hour task). Download from a fit company (add to an inbound lemlist campaign and tell the owner). Not a fit (polite reply, log only). Reuse your Module 3 routing.
4. Write the inbound lemlist campaign, two or three steps, starting with what they asked for.
5. Test with three submissions, one per path, and log form time and first reply time for each.
6. For reactivation, confirm a required `Lost reason` dropdown in HubSpot. Import or mark at least 10 lost deals (practice pipeline is fine).
7. Create the HubSpot view, Lost, closed 3 to 12 months ago, reason timing or budget.
8. Build the n8n reactivation flow. Monthly schedule, read the view, check `Do not contact`, write each deal with its new reason into a review sheet, and add only rows marked `approved` to a two step lemlist reactivation campaign.
9. Write the reactivation messages with a real new reason for your market (lesson 4.5).
10. Run it once. Approve two rows and confirm only those two reach lemlist. Never send to real people from practice data. Pause the campaign after confirming.

**Hand in.**
- Both flow drawings
- n8n exports (JSON) and canvas screenshots for both flows
- A screenshot of the form, and the log rows for the three inbound tests showing time to first reply
- The inbound and reactivation message texts
- The reactivation review sheet with approved and not approved rows, and a lemlist screenshot showing only approved leads

**Marking rubric.**

| Criterion | 0 | 1 | 2 | Must? |
|---|---|---|---|---|
| Inbound flow routes by fit and intent | Everything treated the same | Two paths, or paths not tested | Three paths built and tested, reusing enrichment and routing | Must |
| Speed to lead measured | Not measured | Target written but not logged | Target per path, form and reply times logged for each test | |
| Reactivation pool chosen by lost reason and window | Everyone lost | Window or reason missing | Both rules applied, not a fit excluded | Must |
| Every reactivation has a new reason | "Checking in" | Generic reason for all | A specific change per group, tied to the lost reason | Must |
| Safety, opt outs and a review step | No do not contact check, sends unreviewed | One of the two | Do not contact checked and a human approval step before lemlist | Must |
| Clear drawings and logs | Missing | Partial | Both flows drawn with conditions, every run logged | |

**Good example.** Kofi's inbound flow sends a demo request from a fit test company to the AE in Slack within two minutes, with fleet size, tool and country, and a one hour task. His log shows the human reply at 38 minutes. His reactivation sheet lists 9 lost deals from the practice pipeline, timing or budget, with a "what changed" column filled per row, such as "budget lost in Q1, their new financial year starts in July". Only the two rows he marked approved appear in lemlist, and the campaign is paused.

**Bad example.** Iris adds every lost deal from the last two years into a campaign with the message "Hi, just checking in to see if anything has changed". No reason filter, no new reason, no review step, and two contacts marked do not contact were included. Three musts fail.

**Stuck?**
1. **Form submissions don't reach n8n.** The HubSpot private app lacks the forms or contacts scope, or the trigger reads the wrong form. Add the scope, check the form ID in the form's URL, submit a fresh test.
2. **The lemlist step fails with an error.** The campaign ID or lead fields don't match what lemlist expects. Check the required fields in the lemlist API documentation and test one lead with fixed values first.
3. **Lost deals have no lost reason.** Old data didn't require it. Fill it from the deal notes for your 10 practice deals, and make the field required on the Lost stage so it doesn't happen again.

### Module 5. Measuring it

**Goal.** Measure the engine honestly, with conversion by stage, a weekly scorecard, a simple forecast and a live dashboard.
**Time.** 40 minutes of video, plus 3 to 4 hours of assignment.
**You need.**
- The practice pack's pipeline (60 deals) or your own CRM's deal export
- Your lemlist results from Module 1 (or the practice numbers in lesson 5.3)
- Google Sheets, Looker Studio (free with a Google account) and the Dashboard and scorecard template
- Your HubSpot CRM from Module 3

#### Lesson 5.1 Pipeline analysis and conversion by stage (8 min)

**In plain words.** Your pipeline tells you where deals get stuck. By counting how many deals reach each stage and how many move on, you find the one step that loses the most, and that's where you work next.

**You'll be able to.**
- Prepare a deal export so every deal shows the furthest stage it reached
- Calculate conversion from each stage to the next
- Find the biggest leak and say what you'd test to fix it

**What's shown.**
1. **Conversion rate** is the share of things that move to the next step, like meetings that become proposals. **Pipeline analysis** means studying the pipeline to find where deals get stuck or lost.
2. The trap. A normal export shows each deal's current stage. A lost deal shows "Lost", which hides how far it got. So first add a column `furthest stage reached`. In HubSpot, the deal's stage history (or the "date entered stage" properties) gives it. In the practice pack it's already a column.
3. Screen demo. Open the practice pipeline in Sheets. Give each stage a number (New 1 up to Won 6) in a lookup tab and add a `stage_number` column. Make a small table with the stages down the side, and next to each count deals that reached at least that stage with `=COUNTIF(stage_number_column,">="&B2)`, where B2 is that stage's number.
4. Conversion to the next stage is the next row's count divided by this row's count. Format it as a percentage.
5. Time in stage. Average days between entering one stage and the next. A stage where deals sit far longer than the others is a leak even if they don't get lost.
6. Split it. Run the same table by segment (country, ICP tier, lead source) and by seller. A leak in one segment points at the ICP. A leak for one seller points at coaching.
7. Read it with care. A stage with five deals in it can swing wildly. Write the count next to every percentage, always, so nobody gets excited about 100% of 2.
8. Turn the leak into an action. "Discovery done to Demo done is the biggest drop. Lost reasons show 'no decision maker'. Test, require the decision maker named before Discovery done (the Module 3 exit criteria) for one month."

**Do it now.** Build the stage conversion table for the practice pipeline and write one sentence naming the biggest leak and your test.

#### Lesson 5.2 The weekly scorecard (7 min)

**In plain words.** A scorecard is the short list of numbers you check every week, always the same ones, in the same order. It shows in five minutes whether the engine is healthy and which part needs work.

**You'll be able to.**
- Set up the eight line weekly scorecard with its ratios
- Explain what each line tells you
- Fill it from lemlist and HubSpot in under 20 minutes

**What's shown.**
1. A **scorecard** is a short list of the few numbers you check every week. A **dashboard** is a page of charts that shows the same and more, which you build in lesson 5.5.
2. The scorecard Astra uses, line by line. Invites or messages sent. Accepts (LinkedIn invites accepted). First messages sent within 2 days of the accept. Positive replies. Meetings booked. Meetings held with the decision maker. Proposals sent. Wins and their value.
3. Why each line. Sent shows effort. Accepts show whether your targeting and profile look right. First messages within 2 days shows discipline, since an accept that waits a week goes cold. Positive replies show the message works. Booked against held shows no shows. Held with the decision maker shows you're talking to people who can buy. Proposals and wins show money.
4. Ratios matter more than totals. Next to the counts, show accepts divided by invites, positive replies divided by people messaged, meetings booked divided by positive replies, and so on. A drop in one ratio tells you which step to look at.
5. Screen demo, the sheet. One row per week, one column per line, then the ratio columns, and a notes column for what you changed that week. Without the notes you can't explain the numbers later.
6. Screen demo, the sources. lemlist campaign reports for sent, accepts and replies (and your reply tags from Module 1 for positive). HubSpot deals for meetings, proposals and wins, filtered by the date the deal entered each stage within the week. Fill it the same day each week, before planning, so the numbers decide the week.
7. Astra's own numbers, shown plainly. From 14 July to 25 October 2026, 330 researched cold first messages went out and 26 people said yes, 7.9%. In October, 119 first pitches went out, 30% replied and 15% said yes, against 4% saying yes in September. Seven meetings were booked by 25 October. No paid project had closed yet, so the wins line read zero. A scorecard shows that plainly, and that's the point.

**Do it now.** Copy the scorecard template, fill one week from your Module 1 campaign (or the practice numbers), and write one line in the notes column.

#### Lesson 5.3 Reading reply rates without fooling yourself (9 min)

**In plain words.** Reply rates are easy to make look good and easy to misread. This lesson shows the five common ways people fool themselves and how to read the number honestly.

**You'll be able to.**
- Calculate reply rate and positive reply rate with the right denominator
- Spot small sample, mixed change and cherry picking problems
- Write a result in a way someone else could check

**What's shown.**
1. **Reply rate** is replies divided by people messaged. **Positive reply rate** is replies that show interest divided by people messaged. Always count people, not emails, because one person gets three emails.
2. Trap 1, counting the wrong replies. Out of office, "wrong person" and "remove me" are replies. Report them separately. Your headline is positive replies.
3. Trap 2, the wrong denominator. Leads who bounced or never got a message don't count. People still mid sequence haven't had their full chance to reply. Wait until the sequence finishes, or compare at the same day after the first message.
4. Trap 3, small samples. With 40 people messaged, one reply moves the rate by 2.5 points. So 3 replies against 1 in an A/B test of 40 each is very likely luck. The course rule is about 100 people per version and a clear gap before calling a winner, and "early sign" before that.
5. Trap 4, changing two things at once. Routeful's SDRs change both the list (only firms with 50 or more trucks) and the opener in the same week, and positive replies go up. Nobody can say which change did it. Change one thing at a time, on a set day, and write it in the notes column.
6. Trap 5, cherry picking. Showing the best week or the best segment and calling it the result. Always show the whole period, then the breakdown.
7. Look past the yes. In Astra's own outreach, consumer businesses said yes most often and couldn't pay. B2B companies with a budget were the ones worth meeting. A positive reply rate that goes up while meetings with buyers stay flat means the yeses are coming from the wrong people. Follow every rate down to meetings held with a decision maker.
8. Screen demo, a results line, with every number checkable. "Version A, 112 people messaged 3 to 14 March, 9 positive replies (8.0%), 2 meetings held. Version B, 108 people, 5 positive (4.6%), 1 meeting held. Early sign for A, not proven, rerun on the next 200."
9. Before you report a number, rebuild it from the source (lemlist and HubSpot), not from your notes. Check the arithmetic closes. Positive plus not now plus no plus auto replies plus no reply should equal people messaged.

**Do it now.** Take your Module 1 results, or these practice numbers (60 messaged, 9 replies, of which 3 out of office, 2 "no", 1 "wrong person", 3 positive). Calculate reply rate and positive reply rate, then write a results line in the step 8 format.

#### Lesson 5.4 Forecasting basics (7 min)

**In plain words.** A forecast is your best estimate of what will be sold this month or quarter. The simple way multiplies each deal's value by its chance of closing, using chances from your own history rather than guesses.

**You'll be able to.**
- Calculate win rates from each stage using past deals
- Build a weighted pipeline forecast in Sheets
- Use forecast categories (commit, best case, pipeline) and say how sure you are

**What's shown.**
1. A **forecast** is your best estimate of what will be sold in a period. A **weighted pipeline** is the sum of each open deal's value times its chance of closing.
2. Where the chances come from. Closed deals only (won plus lost). For each stage, win rate from that stage is deals that reached it and were won, divided by all closed deals that reached it. Use `furthest stage reached` from lesson 5.1 and COUNTIFS.
3. Screen demo. Build a small table of stage and win rate on the practice pipeline. On the open deals, add a `probability` column with a VLOOKUP to that table and a `weighted value` column, value times probability. Sum it.
4. Time filter. Only deals with an expected close date in the period count. A deal with no close date isn't in any forecast.
5. **Forecast categories.** Commit means the seller would bet on it this period (verbal yes, paperwork moving). Best case means it could close if things go well. Pipeline means open but not this period. Report commit, then commit plus best case, next to the weighted number. If the sellers' commit is far from the weighted number, the gap is the conversation.
6. Small history warning. With 60 deals, win rates by stage are rough. Say so on the forecast ("based on 60 deals, last quarter"), update every quarter, and check last period's forecast against what actually closed.

**Do it now.** Calculate win rate from each stage on the practice pipeline's closed deals and the weighted value of its open deals. Write the number of closed deals your rates rest on next to it.

#### Lesson 5.5 A Looker Studio dashboard, click by click (9 min)

**In plain words.** Looker Studio is Google's free tool for turning a sheet into charts that update themselves. You connect your scorecard and pipeline sheets and build a one page dashboard someone can read in a minute.

**You'll be able to.**
- Connect Google Sheets to Looker Studio
- Build scorecard tiles, a stage bar chart, a trend line and a table
- Add date and segment filters and share the dashboard safely

**What's shown.**
1. A **data source** in Looker Studio is the sheet it reads from. A **dimension** is something you group by (stage, week, country). A **metric** is something you count or add up (deals, value, replies).
2. Prepare the data. One clean table per tab, one header row, no merged cells, no totals rows, dates as real dates. A `deals` tab (one row per deal with stage, furthest stage, stage number, value, owner, country, created date, close date) and a `weekly` tab (your scorecard rows). From HubSpot, export deals (Sales, Deals, Export) and paste them in.
3. Screen demo, create. Go to lookerstudio.google.com, click Create, then Report. In the Add data panel choose Google Sheets, pick the spreadsheet and the `weekly` tab, keep "use first row as headers" ticked, click Add, then Add to report. Add the `deals` tab the same way through Resource, Manage added data sources, Add a data source.
4. Screen demo, tiles. Click Add a chart, choose Scorecard, set the metric to positive replies. Repeat for meetings held with the decision maker, proposals sent and wins value, in a row at the top.
5. Screen demo, the funnel. Insert a Bar chart from `deals`, dimension `furthest stage reached`, metric Record Count, sorted by `stage_number`.
6. Screen demo, trend and table. Insert a Time series from `weekly` with positive replies and meetings booked by week. Insert a Table from `deals`, filtered to open deals, with owner, company, stage, value, close date and weighted value, sorted by close date.
7. Screen demo, filters. Click Add a control, choose Date range control, put it top right. Add drop down list controls for country and owner. Test that each one changes every chart.
8. Style for reading. A title that asks the question the page answers ("Is the engine producing meetings with buyers?"). Tiles on top, trend, funnel, then the table. The sample size next to any percentage.
9. Screen demo, share. Click Share, add people by email with Viewer access. Check the sheet's own sharing too, since viewers may need access to the data depending on the data credentials setting. Never share a dashboard with personal data beyond the people who need it.

**Do it now.** Connect your scorecard sheet to a new Looker Studio report and build the four tiles and the time series chart.

#### Quiz 5 (pass 80%)

1. Why add a "furthest stage reached" column before measuring conversion?
   A. Lost deals otherwise show as "Lost" and hide how far they got
   B. To count won deals
   C. It looks better
   D. HubSpot requires it
   **Answer.** A. **Why.** You need the furthest stage to count deals that reached each step. **Rewatch.** 5.1

2. 40 deals reached Discovery done and 22 reached Demo done. What's the conversion?
   A. 18% B. 45% C. 55% D. 82%
   **Answer.** C. **Why.** 22 divided by 40 is 55%. **Rewatch.** 5.1

3. True or false. You should always write the count next to a percentage.
   **Answer.** True. **Why.** 100% of 2 means little, and the count shows it. **Rewatch.** 5.1

4. Which line on the scorecard shows whether you're talking to people who can actually buy?
   A. Meetings held with the decision maker B. Accepts C. First messages within 2 days D. Invites sent
   **Answer.** A. **Why.** It counts meetings with the buyer, not just any meeting. **Rewatch.** 5.2

5. 200 people were messaged. 30 replied. 8 were out of office, 6 said no, 2 were the wrong person, 14 were positive. What's the positive reply rate?
   A. 15% B. 7% C. 4% D. 30%
   **Answer.** B. **Why.** 14 divided by 200 is 7%. **Rewatch.** 5.3

6. Version A got 3 positive replies from 40 people, version B got 1 from 40. What's the honest conclusion?
   A. Too small to tell, keep testing until about 100 per version
   B. B is better
   C. Stop testing
   D. A is three times better, switch now
   **Answer.** A. **Why.** One reply moves the rate 2.5 points at this size, so it's likely luck. **Rewatch.** 5.3

7. Positive replies doubled, but meetings with decision makers stayed flat. What's the most likely problem?
   A. Send more emails
   B. The dashboard is broken
   C. Reply rate doesn't matter
   D. The yeses come from people who can't buy, so check who you're targeting
   **Answer.** D. **Why.** Follow every rate down to meetings with buyers. In Astra's outreach, consumer businesses said yes most often and couldn't pay. **Rewatch.** 5.3

8. How do you get the probability for each stage in a weighted forecast?
   A. From your own closed deals, won divided by all closed that reached the stage
   B. Use the same number for every deal
   C. Ask each seller
   D. Use the highest number you can find online
   **Answer.** A. **Why.** History beats guesses, with the sample size noted. **Rewatch.** 5.4

9. A deal has no expected close date. Where does it go in this month's forecast?
   A. Commit B. Best case C. Nowhere until it has a close date D. Weighted at 50%
   **Answer.** C. **Why.** Only deals expected to close in the period count. **Rewatch.** 5.4

10. In Looker Studio, "country" in a chart is a...
   A. Metric B. Data source C. Control D. Dimension
   **Answer.** D. **Why.** It's something you group by. **Rewatch.** 5.5

#### Assignment 5. A dashboard and a scorecard

**Goal.** Build a weekly scorecard and a one page Looker Studio dashboard for your engine, with honest numbers and a written reading.
**Time.** 3 to 4 hours.
**You need.** The practice pipeline or your HubSpot deals, your lemlist results, Google Sheets, Looker Studio, the scorecard template.

**Steps.**
1. In Sheets, create tabs `deals`, `weekly` and `stages` (stage name and number). Clean the deals into one row per deal with `furthest stage reached` and `stage_number`.
2. Build the stage conversion table (lesson 5.1), with counts next to every percentage and average days in stage.
3. Fill the `weekly` tab with the eight lines and the ratio columns for at least two weeks (your Module 1 campaign or build project, or the practice numbers). Fill the notes column.
4. Build the win rate by stage table from closed deals and a weighted forecast of open deals for one period (lesson 5.4). Note the sample size.
5. In Looker Studio, click Create, Report, add the `weekly` tab, then the `deals` tab as a second source.
6. Build, top to bottom, a title that asks a question, four tiles, a time series, a stage bar chart sorted by stage number, and an open deals table with weighted value.
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
1. **Looker Studio shows dates as text.** The sheet column holds text. Format it as a date in Sheets (Format, Number, Date), then in Looker Studio open the data source and set the field type to Date.
2. **The funnel bars are in alphabetical order.** Add `stage_number` to the sheet and sort the chart by it, ascending.
3. **The scorecard and the CRM disagree.** You counted deals by created date in one place and by stage date in the other. Pick one rule (the week the deal entered the stage), write it in the notes, use it everywhere.

---

## Level 2 build project. Run your engine live for two weeks

This replaces the big capstone at this level. Level 1 proved you can do each part. This proves the parts work together,
live, on real people, for two full weeks, and that you can tell the truth about what happened.

**Goal.** Run the engine you built in Modules 1 to 5 live for two weeks and hand in a one page run report with real
numbers, including what failed.
**Time.** About 8 hours of work spread over 3 weeks (a few days of joining things up, two live weeks with 30 to 45
minutes a day, then one evening for the report).
**When.** Start the live run once Assignments 1 to 3 are passed and your mailbox has had at least 14 days of warm up.
Modules 4 and 5 can be finished while it runs.
**You need.** Everything from Modules 1 to 5, a list of at least 50 accounts that pass your ICP with verified contacts,
the Level 2 run report template (a one page Google Doc), and your setup sheet.

**Practice pack learners.** The build project must touch real people, because a run with no replies to read teaches
little. If you have no market of your own, pick one small real market you know (a local industry, your previous
employer's customers, a niche you follow), build the 50 accounts fresh, and say so in the report. If you truly can't
send, talk to Raka or use the questions form before you start. A "dry run" on practice data can earn Completed but not
Certified.

### The brief

Your engine must have all six parts below, connected and running live for 14 days in a row.

| # | Part | What it must have | Built in |
|---|---|---|---|
| 1 | **Warmed sending domain** | Separate domain, SPF, DKIM and DMARC passing, at least 14 days of warm up before the first cold email, warm up kept on | Module 1 |
| 2 | **Live sequence** | Email and LinkedIn steps, to at least 50 accounts, safe first send of 20 to 30, send caps and LinkedIn limits kept, country rules applied, stop on reply on, open tracking off | Module 1 |
| 3 | **CRM** | HubSpot (or your company's CRM) with a field map, pipeline with exit criteria, and your dedup rule applied to everything imported | Module 3 |
| 4 | **One automation** | At least one n8n flow that runs by itself across three tools, with error handling and a log. For example the Module 2 lead alert, the Module 3 routing, or replies from lemlist logged into the CRM | Modules 2 to 4 |
| 5 | **Dashboard** | Looker Studio dashboard reading from your scorecard and deals | Module 5 |
| 6 | **Weekly scorecard** | All eight lines with ratios and notes, filled for both live weeks on the same day each week | Module 5 |

**Rules for the run.**
- Send from the warmed sending domain only, never your main domain.
- Keep the caps and limits you wrote down. Check LinkedIn's terms and each country's rules. This is not legal advice.
- Read every thread in full before every manual reply. Honour opt outs the same day, in lemlist and the CRM.
- A person reads every first message before it goes. Your automation may prepare, never send a first message unread.
- Change one thing at a time, on a set day, and write it in the scorecard notes.
- Write two **stop rules** before you start, numbers that make you pause and fix. For example "bounce rate above 5% on any batch" or "any LinkedIn warning".
- Never put real prospects' names or emails in anything you hand in. Blur or anonymise.

### The run report, one page

Use the template. One page, numbers first, plain words. Every number must be one you can rebuild from lemlist, the CRM or
n8n's log on the day you're asked.

1. **The engine in three lines.** Market, ICP in one sentence, the one problem your sequence names.
2. **Setup facts.** Sending domain, warm up start date and first send date, daily caps, LinkedIn limits, country rules in one line.
3. **The numbers for the 14 days.** Accounts and people messaged, bounces, accepts, replies split into positive, not now, no and auto reply, meetings booked, meetings held with a decision maker. Each rate next to its count. The groups must add up to people messaged.
4. **What the automation did.** Executions run, items processed, failures caught by the error workflow, and one silent failure you found in the log (or how you checked for one).
5. **CRM state.** Records imported, duplicates found and merged, records missing a required field at the end of each week.
6. **What failed.** At least three things, each in three parts. What happened, how you found out, what you changed.
7. **What you'd change next.** One change, and how you'd measure whether it worked.

### Hand in

Put everything in one Drive folder, shared with view access, with these names.

1. `01 Run report` (the one page Google Doc)
2. `02 Setup` (setup doc with the DNS check screenshots, warm up dates, caps and limits, and the two stop rules)
3. `03 Sequence` (every message, lemlist sequence and settings screenshots, send log by day)
4. `04 CRM` (field map link with stages and dedup tab, before and after numbers, HubSpot screenshots)
5. `05 Automation` (n8n JSON export, canvas and Executions screenshots, log sheet link)
6. `06 Dashboard` (Looker Studio link with Viewer access, PDF export, scorecard sheet with both weeks)

### Marking rubric

Scored 0, 1 or 2 per criterion. **Pass.** At least 70% of the points, so 12 of 16, and no 0 on a criterion marked
**must**. A fail can be resubmitted once after fixing what scored low (for self learners, within the paid review).

| # | Criterion | 0 | 1 | 2 | Must? |
|---|---|---|---|---|---|
| 1 | Safe sending setup | Main domain, missing records, or under 14 days of warm up | All in place but warm up switched off during sending, or one record failing | Separate domain, three records passing, 14 days or more of warm up kept on, screenshots | Must |
| 2 | Live run scope | Under 50 accounts or under 14 days | 50 or more accounts but gaps in the 14 days, or one channel only | 50 or more accounts, email and LinkedIn, 14 days in a row, safe first send first | Must |
| 3 | Caps, limits, country rules and opt outs | No caps or country rules, or opt outs ignored | Set but broken at least once without a note | Caps and limits kept, country rules applied per lead, opt outs the same day | Must |
| 4 | CRM with field map and dedup | No field map or no dedup | Field map or dedup thin, or not applied to the imports | Field map, exit criteria, dedup applied with before and after numbers that add up | |
| 5 | Automation runs and fails loudly | No automation, or it needs manual steps | Runs by itself but no error handling or log | Three tools, on a trigger, error workflow proven, log on every branch, executions shown | |
| 6 | Dashboard and weekly scorecard | Missing | One of the two, or one week only | Dashboard plus both weeks of the scorecard, ratios and notes filled on a set day | |
| 7 | Honest numbers | Numbers don't add up or can't be traced | Mostly traceable, small gaps, a trap ignored | Every rate with its count, reply groups add up to people messaged, numbers match the source | Must |
| 8 | What failed and what's next | Only successes | Failures vague | At least three failures in the three part format, one next change with how to measure it | Must |

**Results don't decide the pass.** A run with two positive replies and an honest, well measured report can score 16 of
16. A run with great replies, a broken setup and numbers nobody can trace fails.

### Good example, in short

Femke ran the engine on Belgian and Dutch food wholesalers with 30 to 200 staff. Her sending domain was warmed for 16 days
and all three checks pass. She sent to 58 people at 52 accounts over 14 days, first send 25, and checked Belgian contacts one by
one before setting their channel. Her report shows 3 bounces (5.2%, which hit her stop rule, so she paused one day and
re verified the batch), leaving 55 people messaged. Then 21 accepts from 44 invites, 7 replies (2 positive, 1 not now,
2 no, 2 auto reply) and 1 meeting held with a managing director, every rate next to its count, and 2 plus 1 plus 2 plus
2 plus 48 with no reply adds to 55. Her n8n flow ran
1,344 times on a 15 minute schedule, processed 31 new contacts, and the error workflow caught two expired token runs. Her
failures are a LinkedIn condition that sent one person two messages (fixed, apologised), a persona lookup that put
"inkoper" (buyer) in Other (added to the lookup), and a scorecard filled on different days in week 1 (fixed day set to
Friday). Next change, a new first line for wholesalers with their own fleet only, measured on the next 100 people.

### Bad example, in short

Daan's report says "strong interest, 35% reply rate" over 9 days, sent from his employer's main domain to 140 people in
two days with open tracking on. The rate counts out of office replies, nothing adds up to people messaged, and there's
no failure section. His dashboard looks great, and it still fails four musts.

---

## Level 2 final exam

**When.** After every Level 2 module quiz is passed. It can be taken before or during the build project's live run.
**Length.** 20 questions, 30 minutes, timed.
**Mix.** 11 knowledge questions and 9 scenarios. Four questions per module.
**Pass mark.** 80%, so 16 of 20 correct.
**Retakes.** Two, at least 48 hours apart, from a different question pool. When building the platform version, write a
second variant of every question for the pool and shuffle the option order (README section 5).
**After submitting.** The learner sees each answer, the one line why, and the module to rewatch for every wrong answer.

1. **(Knowledge)** Why does cold email go from a separate sending domain?
   A. It's faster
   B. It's required by lemlist
   C. It looks more personal
   D. So reputation damage doesn't hit the company's main email
   **Answer.** D. **Why.** The main domain stays safe. **Module.** 1

2. **(Knowledge)** What does DKIM do?
   A. Lists the servers allowed to send for your domain
   B. Tracks opens
   C. Adds a seal to each email so the receiver can check it wasn't changed or faked
   D. Tells receivers what to do with failing mail
   **Answer.** C. **Why.** SPF is the list, DKIM is the seal, DMARC is the policy. **Module.** 1

3. **(Scenario)** Your list has leads in the Netherlands and Germany. What's the cautious channel plan?
   A. Email everyone
   B. Email Germany only
   C. No outreach in either
   D. Email in the Netherlands, LinkedIn or a call first in Germany, checking each country's rules
   **Answer.** D. **Why.** Germany is strict on unsolicited B2B email, the Netherlands more permissive for business addresses. Not legal advice. **Module.** 1

4. **(Scenario)** Lotte set up a new sending domain on Monday with all three records passing. Her manager wants the first 200 cold emails out on Friday. What does she say?
   A. Fine, the records pass, so send all 200
   B. Send from the main domain this week instead
   C. The mailbox needs at least 14 days of warm up first, then a safe first send of 20 to 30
   D. Send 200 but switch off warm up so it doesn't interfere
   **Answer.** C. **Why.** Passing records prove who you are, warm up builds reputation, and a new mailbox needs both. **Module.** 1

5. **(Knowledge)** What's a webhook?
   A. A type of spreadsheet
   B. A LinkedIn limit
   C. A message a tool sends the moment something happens
   D. A password
   **Answer.** C. **Why.** The buzzer in the restaurant picture. **Module.** 2

6. **(Scenario)** Your n8n flow runs green every time, but the Slack alerts show empty company names. What kind of failure is this, and what catches it?
   A. Loud, the error workflow
   B. No failure
   C. Silent, a log with a status per contact and checking outputs
   D. A rate limit
   **Answer.** C. **Why.** Silent failures run fine but do the wrong thing, and logging and checks catch them. **Module.** 2

7. **(Knowledge)** Which task fails the "when to automate" test?
   A. Logging new contacts to a sheet
   B. Alerting an owner about a new lead
   C. Creating a follow up task
   D. Sending first messages to prospects without anyone reading them
   **Answer.** D. **Why.** A mistake there can't be undone, so a person stays in the loop. **Module.** 2

8. **(Knowledge)** How do you know your error alert workflow actually works?
   A. You break the flow on purpose once and see the alert arrive
   B. It hasn't sent any alerts yet
   C. n8n shows a green tick on it
   D. You read the documentation
   **Answer.** A. **Why.** That's the positive control. An alarm you've never seen fire is unproven. **Module.** 2

9. **(Knowledge)** What's a field map?
   A. A map of the sales territory
   B. A list of duplicates
   C. A document listing every CRM field, its meaning, allowed values, source and owner
   D. A Looker Studio chart
   **Answer.** C. **Why.** It stops people using fields in different ways. **Module.** 3

10. **(Scenario)** Two contacts have the same work email but different phone numbers. Your rule says match on email, survivor is the most recent activity. What happens?
   A. Keep both
   B. Delete both
   C. Keep the one with the longest name
   D. Merge into the one with the most recent activity, fill its empty fields from the other, record the merge
   **Answer.** D. **Why.** That's the three part dedup rule applied, and the merge stays traceable. **Module.** 3

11. **(Knowledge)** What must every routing rule include?
   A. A Looker Studio report
   B. A fallback for leads no rule matches
   C. A second CRM
   D. A discount
   **Answer.** B. **Why.** Without a fallback, some leads stay unowned. **Module.** 3

12. **(Knowledge)** A deal is lost on price. What happens to it in the CRM?
   A. It stays in Proposal sent until the seller has time
   B. It moves to Lost with "price" picked as the lost reason
   C. Its value is set to zero and it stays open
   D. It's deleted to keep the pipeline clean
   **Answer.** B. **Why.** Lost is a stage, and the lost reason feeds analysis and reactivation. **Module.** 3

13. **(Scenario)** A lost deal's reason was "timing" five months ago. Their company just posted jobs for route planners. What's the right move?
   A. Leave it closed forever
   B. Put it in reactivation with a message that names what changed
   C. Mark it not a fit
   D. Send "just checking in"
   **Answer.** B. **Why.** Timing losses are worth reactivating, and a new signal gives a real reason. **Module.** 4

14. **(Knowledge)** A customer health score is used to...
   A. Show whether a customer is likely to stay or leave, so the team acts early
   B. Measure email deliverability
   C. Rank prospects for outbound
   D. Set prices
   **Answer.** A. **Why.** It's the fit score's twin for customers. **Module.** 4

15. **(Scenario)** A Tier 1 operations director fills in your demo request form at 10:00 on a Tuesday. Which handover is right?
   A. Add them to the cold outbound sequence starting tomorrow
   B. Hold it for the Friday pipeline review
   C. Alert the owner with the enrichment details and a task due in one hour, then log the first reply time
   D. Send a price list automatically and wait for them to come back
   **Answer.** C. **Why.** High fit, high intent gets a fast human reply, and speed to lead is measured. **Module.** 4

16. **(Knowledge)** A company that fits your ICP visits your pricing page three times this week. What does the course treat this as?
   A. A signal that adds to the intent score and creates a task for the owner
   B. A booked meeting
   C. Noise to ignore
   D. Permission to email them about their visit
   **Answer.** A. **Why.** A visit is a signal, not a lead, and the message uses the topic, never the visit. **Module.** 4

17. **(Scenario)** 300 people were messaged. Replies were 12 out of office, 9 "no", 3 "wrong person" and 15 positive. What's the positive reply rate?
   A. 13%
   B. 5%
   C. 10%
   D. 39%
   **Answer.** B. **Why.** 15 divided by 300 is 5%. Only positive replies count, and the denominator is people messaged. **Module.** 5

18. **(Scenario)** In one month a team changed both its target segment and its opener, and positive replies went up. What's the honest reading?
   A. Something in the changes helped, and to know which you change one thing at a time
   B. It's luck, ignore it
   C. The segment caused it
   D. The opener caused it
   **Answer.** A. **Why.** Two changes at once can't be separated. **Module.** 5

19. **(Knowledge)** Why does a pipeline conversion table use "furthest stage reached" instead of the current stage?
   A. Because lost deals would otherwise hide how far they got
   B. Because it makes the numbers higher
   C. Because won deals have no stage
   D. Because Looker Studio can't read stage names
   **Answer.** A. **Why.** A lost deal shows "Lost", so without the furthest stage you can't count who reached each step. **Module.** 5

20. **(Scenario)** Sellers say commit this month is €80k. The weighted pipeline from last quarter's 60 deals says €35k. What's the right next step?
   A. Report both, note the weighted number rests on 60 deals, and ask the sellers what they know that history doesn't
   B. Average them and report €57.5k
   C. Report €35k and ignore the sellers
   D. Report €80k, sellers know best
   **Answer.** A. **Why.** The gap between commit and weighted is the conversation, and the sample size is always shown. **Module.** 5

**Answer key at a glance.** 1 D, 2 C, 3 D, 4 C, 5 C, 6 C, 7 D, 8 A, 9 C, 10 D, 11 B, 12 B, 13 B, 14 A, 15 C, 16 A, 17 B,
18 A, 19 A, 20 A.

---

## Certificates for Level 2

| Level | What it takes | Who can get it |
|---|---|---|
| **Completed** | All five module quizzes and assignments passed (self marked counts) and the build project self marked against its rubric | Everyone |
| **Certified, Level 2 Builder** | All five assignments passed, plus the build project passed **when marked by Raka**, plus the final exam passed | 1:1 learners, with the project review call included. Self learners by buying the build project review (€149) |

The certificate names the level, the date, the market the engine ran on and, if the learner agrees, a link to the public
version of the run report with prospects anonymised.

## The 1:1 build project review (S6, 45 minutes)

Included in the 1:1 price, and the same call self learners book when they buy the build project review. Raka marks the
run report and the exam before the call. The learner shares their screen.

| Minutes | Part |
|---|---|
| 0 to 15 | The learner walks through the engine live, not on slides. One account from the list to the CRM record to the sent message to the scorecard line, then the dashboard |
| 15 to 35 | Raka asks questions from the list below and marks the rubric live |
| 35 to 45 | Result and feedback, exam questions missed, and what to work on before Level 3 |

Within 24 hours the learner gets the written rubric with a comment per criterion and, on a pass, the Certified
certificate.

**Questions Raka will ask (he picks from these).**
1. Show me your DNS checks. What would you do if tomorrow's spam test failed?
2. How did you pick your send caps and LinkedIn limits, and did you keep them every day?
3. What did you do about the strictest country in your list?
4. Open your n8n flow and break it for me. What happens, and how would you know?
5. Where in the log can I see a run that went wrong?
6. Show me one merge your dedup rule made, and the `row_id` it came from.
7. Your positive reply rate is X. How many people is that, and do your reply groups add up?
8. Which stop rule fired, or came closest, and what did you do?
9. What's the one change for next week, and how will you measure it?
10. Which part would you never automate, and why?

**How to prepare.** Open every tool in a browser tab, logged in. Pick one account to trace end to end. Expect to be asked
to rebuild a number from its source, live.

---

## Next level, Architect

Level 2 proves you can build an engine and run it honestly. **Level 3 Architect** is where you design the whole revenue
system around it. You'll design the system across segments and channels, run AI agents in production with checks around
them, and run GTM engineering for a team or for clients. It ends with a capstone presented to Raka, and it's the level
built for getting hired.

**Before you start Level 3.** Keep your build project engine running for another two to four weeks if you can. Level 3's
first module starts from your own numbers, and a month of scorecard says far more than two weeks.

**Other routes.** If you'll sit close to sellers, the **GTM Seller** course shows how one seller runs the engine day to
day. If you're heading towards leading a team, the **GTM Leader** course covers the operating model, coaching from calls
and a 90 day rollout.
