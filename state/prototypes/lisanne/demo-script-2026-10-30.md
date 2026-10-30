# Lisanne call, Friday 30 Oct 2026, 10:00 to 10:30 Amsterdam. Demo notes for Raka

Meet https://meet.google.com/ktx-mexq-oqy . She asked for two things on 24 Oct, "further possibilities and pricing".

## Open the app in English

https://astra-dejongvanhommerig-prototype.netlify.app/?lang=en

The NL | EN switch sits in the dark bar at the top of every screen. English is remembered in that browser, so open the
link once before the call. She saw the Dutch version, so if she shares her screen or asks "what did I see", press NL.
Dutch is the default for anyone who opens the plain link. The pitch page (plan) is already English and wasn't changed.

What the English switch changes. Every label, the four example enquiries (English texts), the deadline names, the
draft replies, the engagement letter and the employee guide. What it does not change. Names, her firm, the law
references (art. 7:686a BW and so on, glossed as Civil Code), and anything typed or pasted in. The engine reads English
and Dutch enquiries, so you can paste an English one. In the real product the drafts would be written in the language of
the client, Dutch for Dutch clients.

## What we built, in one line

An intake desk for her practice. A new enquiry comes in (website, email, WhatsApp, a referrer), the desk reads it and
turns it into one card with the facts, the fatal deadlines, a conflict check, a list of documents to ask for, a draft
reply and a draft engagement letter. She approves, nothing goes out without her. Plus a public guide for employees on
sick leave that feeds the same desk. It's a browser sketch with fixed rules, nothing is sent. The real version is
n8n + Claude on Amazon Bedrock (EU, zero retention) + her own Outlook and OneDrive.

## The problem we said we'd fix

Solo lawyers bill about 2 of 8 working hours (Clio, Legal Trends for Solo Law Firms 2023, 1,134 legal professionals,
North America, so say "research on solo lawyers", not "her numbers"). In a one lawyer practice nobody else reads, sorts,
checks and answers new enquiries. And one missed fatal court deadline costs her at least her 2,000 euro insurance own
risk (her terms), before reputation. That's the thread, time on admin, with the deadline guard as the thing she can
count.

## The screens, in demo order (about 10 minutes)

1. **Start screen.** Dark teal, her logo, "Every new case clear, before you open it", the orange hatch lines settle into
   her logo's line (her own tagline "dan gericht verder ..."). Two doors. "Intake desk" for her, "Guide to reintegration"
   for employees. Three steps underneath, an enquiry comes in, the desk makes a card, you approve.
2. **Intake desk.** Left rail (Enquiries, Deadlines, Results, Settings, Start). Top bar with greeting and four numbers,
   open enquiries, deadlines watched, time from opening to reply ready, replies ready. Left, the list of four made up
   enquiries with chips for source, lane, and the first deadline. Right, the card of the selected one.
3. **Open Laura Smeets (website, conflict).** Her employer ended her contract. The card shows, top to bottom. Summary,
   the timeline ("The line", today marker, orange diamonds for fatal deadlines), "From the message" with each date and
   the exact sentence it came from highlighted, two fatal deadlines with their article (2 months annul or fair
   compensation, 3 months transition payment), the conflict check in red (her employer is on the conflict list as a
   former client), documents to request, the draft reply. Point out the draft **holds back**. It thanks her, says "I'll
   check whether I can take your case" and names the running deadline so Laura can act in time either way. The
   engagement letter says "only goes out if you take on the case" with a peek link.
4. **Open Dennis Hermans (email, settlement agreement).** Signed 5 days ago, no cooling off period mentioned. The desk
   works out three weeks instead of fourteen days (art. 7:670b(3)), moves a Saturday deadline to Monday
   (General Time Limits Act), and the clear draft + full engagement letter with her terms (hourly rate excl. VAT, 50%
   urgency surcharge, pay within 14 days, liability line with the own risk, AI consent line). The rate shows a
   highlighted placeholder, it's hers to fill in under Settings.
5. **Approve.** Press "Approve and put ready in Outlook". Toast says the drafts wait in Outlook, nothing leaves the
   browser. The counters move, "replies ready" goes up and the time to ready is measured.
6. **Paste an enquiry.** "Paste an enquiry", then "Fill in an example" (an on the spot dismissal) or paste a real one with
   names changed. Dates, deadlines, draft appear. This is the part to hand to her on the call, ask for one of her own
   old enquiry types.
7. **Mila Janssen (WhatsApp) and the referrer (Rechtshulp Mergelland, appeal).** Mila is the sick leave case with week 9
   and a missing plan of action. The referrer is a legal expenses insurer sending a client for an appeal, the draft
   thanks them and asks for the coverage confirmation.
8. **Deadlines** (all fatal deadlines across open enquiries, soonest first) and **Results** (the numbers she'd see after
   30 days) and **Settings** (conflict list, hourly rate, place). Quick, a few seconds each.
9. **Employee guide** (Start, "Guide to reintegration"). Three screens. First sick day, what's going on (six checkboxes),
   then the overview. Week number, UWV's step plan with dates, "Watch out" notes with sources, and a form "Put it to
   Lisanne". Send it, then "See how it arrives at Lisanne's" shows the card on the desk. This is the tool her own
   about page says she's building and hasn't shipped.

## The pitch page, if she asks "how does it work"

https://astra-dejongvanhommerig-plan.netlify.app/ (English, six chapters). 01 The problem. 02 The desk, Laura followed
through four steps. 03 For employees. 04 Privacy, the data flow diagram and each NOvA recommendation with how the desk
meets it (EU region, zero retention, DPIA and AI policy written with her in week 1, consent line in the engagement
letter). 05 What you get, a calculator that starts at 4 enquiries a week, 40 minutes now, 10 with the desk, our guesses.
06 How we start, four weeks. Week 1 setup and paperwork, week 2 the desk live on email and the contact form, week 3 the
employee check, week 4 measure and decide. After that only if she wants it, client updates and invoices, WhatsApp, a
first read of case files.

## Pricing and further possibilities (her two asks)

From the call kit already in logs/meetings/2026-10-30-DeJongVanhommerig.md. The price is yours to say. Our build
estimate was 3,000 to 5,000 euros for the intake desk (a guess), the suggestion written down was a fixed 2,500 to
3,500 for the four week start, half at the start, running tool costs at cost. The public band is 500 to 50,000.
Further possibilities, in the order we'd offer them. 1 Employee guide on her site (6,000 at most on its own).
2 Client updates and invoice drafts from her sent mail and calendar (2,000 to 3,000 on top). 3 WhatsApp as a second
door. 4 First read of case files (held back on purpose, highest risk, it's the work she's proud of doing herself).

Questions to ask her, in this order. Which of your three lanes eats the most hours. How many new enquiries a week and
how long until you know if it's a case. Your hourly rate. What do you use today for mail, files and time (the plan
assumes Outlook and OneDrive). Is it your decision alone. Aim of the call, one fixed price for the four week start and
a start or decision date in the calendar.

## Things to know before you present

- It's fixed rules in the browser, not Claude yet. Don't say Claude is reading it live. Say "in the real version Claude
  reads it, in the EU, and the desk keeps nothing".
- Her legal content (guide texts, warnings, document lists, draft wording) is ours until she signs it off. Say so if
  she picks at a line, the pitch also says it.
- The example names and companies are made up (checked against the KVK, none exist). Say "example case".
- Hourly rate in the letter is a placeholder.
- If she asks "why not Copilot", the answer in the research is an argument, not tested. Talk, don't promise.
- Privacy comes first for a lawyer. Go to plan chapter 04.
