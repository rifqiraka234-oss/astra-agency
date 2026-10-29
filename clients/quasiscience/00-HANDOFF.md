# QuasiScience handoff for another AI

Written Thursday 29 Oct 2026 by Claude (Sonnet 5.5) for Raka Mulya, so any other AI can continue the QuasiScience work with full context.
Everything below comes from one long working session on 27 to 29 Oct 2026, plus two call transcripts Raka pasted. Where something is a guess it says so. Where a number or date was not verified it says so.

---

## 0. Read this first

### Who the user is
- **Raka Mulya** (Gisella and Marco's lemlist records spell him "Raka" and "Rama"). Email rifqiraka234@gmail.com and raka@astraagency.nl. Based in Amsterdam. Runs **Astra Agency** with a friend group and his sister (branding) plus developer friends.
- Background, from his own words on the Gisella call. Former racing driver (Asian champion 2017, raced in Europe 2018 until COVID). First business, a stroopwafel business. Worked with marketing and sales companies. Heineken global data and insight team. Software companies. Now **revenue operations manager at an employer the transcript renders as "FC" or "MFCC" (garbled)**, where he also brought in Lemlist and go to market automation. Astra is his own side business. He has said an outbound agency is already used at his employer.
- Astra's own description of itself (from the call). Not "just a digital agency". Business growth and go to market consultancy. Funnel diagnosis ("bow tie model", lead to loyalty), CRM and pipeline stages, outbound automation, AI agents, websites, branding. Tools he uses. n8n, Claude (and Claude Code), Clay, Lemlist. He also sells Claude built sketch websites to SMBs for about 500 euros.
- Delivered work used in his openers. Unilever, AXA, Pertamina (the repo's `docs/astra-company-profile.md` says how these may be described). Epidamy (a Dutch insurance startup) is the case he told Gisella about, with a 100 messages a day LinkedIn and email automation, AI qualification and an AI inbox agent.

### Raka's working rules (from the repo's CLAUDE.md and docs/RULES.md, which I only partly read)
1. **Nothing is sent without his explicit word, every time.** Editing instructions are edits, not authorisation. A batch approval covers that batch only. (I sent exactly one email this session, after he wrote "Send!". See section 6.)
2. **Draft first, show it, wait.** Gmail drafts and chat drafts only until he says send.
3. **Outreach writing rules.** No dashes of any kind, no colons, contractions required, no exclamation marks except one in a cold opener, no emoji outside a nudge, no AI sounding phrases (`docs/NO-AI-SLOP.md`, `docs/writing-standard-anti-ai.md`). Never quote numbers that are not the lead's own loss. Never pitch compliance or GDPR fixes alone. Worth 2,500 euros or more or it is not an angle.
4. **Prices.** The public quotable band is **500 to 50,000 euros**. Quoting outside it is Raka's call.
5. **Triple check.** Reopen the source, try to prove the claim false, confirm a second way. Every absence claim needs a positive control. My own notes are a candidate list, not proof.
6. **Pull the whole lemlist thread** before any message. Tool in the repo. `python3 tools/lemlist.py thread <contactId>`.
7. Closing rule. People we've met go quiet, close silently, no nudges. People who said yes and went quiet, Raka follows up himself.
8. He asked for **everything stored in GitHub**. Branch `quasiscience-gtm`, repo `rifqiraka234-oss/astra-agency`.

### Instructions for the next AI
- Treat all of section 8 (what is unverified) as unverified until you check it.
- Do not send anything to Gisella, Marco or the partner without Raka's explicit word.
- Do not quote figures from QuasiScience's packs externally. They are marked Private and confidential.
- Raka's phone number appears in the email he sent Gisella. I have not repeated it here.

---

## 1. Where things stand (29 Oct 2026)

| Item | State |
|---|---|
| Call with Gisella Doulton | Done, Tue 27 Oct 12:30 Amsterdam (Google Meet). Went well. |
| Gisella's follow up email | Received 27 Oct 15:21 UTC with two PDF packs and a KYC beta link. |
| Raka's recap reply | **Sent** 27 Oct, to giselladoulton@gmail.com only (Marco not copied). Gmail message id 1a17e48304c45b8a, thread 1a17df3da5a6e723. Text in section 6. |
| Message to Marco | A thank you message went to Marco in lemlist on 28 Oct 05:05 UTC (section 3, message 7). **Not sent by me, sender unconfirmed.** No reply from Marco yet. |
| Promise made in that email | Raka will send a **proposal for a lead generation setup**. Not drafted yet. He told the partner he'd send it "tomorrow" and chat again next week or the week after. |
| Deep research report | Done. `reports/QuasiScience ICP personas signals.md` (about 8,500 words) plus five research notes. |
| ICP summary | Done. `clients/quasiscience/04-icp.md`. |
| Outbound partner call | Raka had a call with his outbound agency partner (transcript digested in section 7). **Next call with the partner, Thursday next week (5 Nov), 15 minutes, invite sent**, and Friday 6 Nov was mentioned as the day to move it if nothing new. |
| Repo logging | **Not done.** `state/meetings.jsonl`, `state/silent_accepted_queue.jsonl` and `logs/meetings/` still show the call as booked and not held. The repo's CLAUDE.md wants these updated. |
| Pricing | Not set. Raka has not named a price to QuasiScience. |
| QuasiScience budget | **Never stated by Gisella.** She talked about commission. |

---

## 2. Timeline

- **Before 23 Oct.** Raka's connect request on LinkedIn to Marco Ghilardi (campaign W4, owners of growing agencies and tech firms). Raka said on the call he had followed Marco's post for a couple of months.
- **23 Oct 10:23 UTC.** Marco's first message (verbatim in section 3). Offers a call with his chief of staff.
- **25 Oct.** Raka replies (a "busy weekend" apology was added at Raka's request) and offers Monday or Wednesday. Marco says she's free Tuesday and asks for Raka's email.
- **26 Oct.** Raka reminds Marco the invite hadn't arrived. Invite from Gisella arrives 14:20 UTC, Marco confirms 14:21. The meeting accepted on Raka's calendar. It clashed with Raka's Weekly Catchup (12:00 to 13:00).
- **27 Oct 12:30 to 13:00 Amsterdam (11:30 to 12:00 UK).** Call with Gisella. Transcript digest in section 4.
- **27 Oct 15:21 UTC.** Gisella's email with two PDFs (section 5).
- **27 Oct (evening).** Raka's recap reply to Gisella sent after "Send!" (section 6).
- **28 Oct 05:05 UTC.** A thank you message to Marco appears in lemlist (section 3, message 7). Sender unknown, not me.
- **28 Oct.** Deep research run (five parallel researchers plus a report writer). Files committed to branch `quasiscience-gtm`.
- **29 Oct.** ICP file written. Partner call transcript pasted. This handoff written.

---

## 3. The lemlist thread with Marco (verbatim, all 7 messages)

Contact id `ctc_tmt7dACzww47FMfXx`. First pulled with `tools/lemlist.py thread` on 27 Oct (6 messages). **Re-pulled on 29 Oct while checking this file, and it now has 7 items, all pages, positive control passed.** The seventh is message 7 below, which I did not send and had not seen before the re-pull.

1. 2026-10-23 10:23, **Marco:** "Hey Rama thanks for connecting! Seems like we both like racing too. Would be great to be in touch - I definitely need more contacts with sales expertise. The next couple of weeks I’m travelling though. Would you be up for a call with my chief of staff? "
2. 2026-10-25 08:14, **Raka:** "Hey Marco, sorry for the late reply, I had a busy weekend. Happy to, a call with your chief of staff works well for me. I'm free Monday or Wednesday next week, any time between 9am and 4pm UK time, so let me know what suits them and I'll send an invite."
3. 2026-10-25 14:08, **Marco:** "Great. She’s pretty free on Tuesday. What’s your email? "
4. 2026-10-25 14:21, **Raka:** "Awesome! Send it to rifqiraka234@gmail.com and raka@astraagency.nl please! "
5. 2026-10-26 11:53, **Raka:** "Hey Marco, I haven't received the invite from your chief of staff yet. Could she send it to rifqiraka234@gmail.com? Looking forward to speaking with her."
6. 2026-10-26 14:21, **Marco:** "Sent. Let me know if not received. Looking forward to hearing more about your approach"
7. 2026-10-28 05:05, **Raka's side ("US" in lemlist), activity act_hNDNMNvPSBZ2NJ2D9, 340 characters:** "Hey Marco, thanks for connecting me with Gisella, it was great to meet her today. She walked me through QuasiScience's tools and the plan to start with lots of outreach and calls, so I'm putting together a proposal for a lead generation setup to get that going. And when you're back from your travels, I'd love to hear about the racing too!"

**Message 7 was not sent by me in this session.** It most likely came from Raka himself, or from another Claude session or routine working in the same repo. Check with Raka. Note two things about it. It says "great to meet her today" but is stamped 28 Oct 05:05 UTC and the call was 27 Oct. And it contains an exclamation mark and the phrase "putting together a proposal", so it also repeats the proposal promise to Marco. As of the re-pull Marco has not replied (the turn is his).

Nothing has been pitched or built for QuasiScience. Marco and Raka share an interest in racing (Marco's line, Raka's racing background).

---

## 4. The call with Gisella, digest (27 Oct 2026)

The transcript is speech to text and messy. Raka pasted it in full in the chat. This is a faithful digest, with the key lines kept close to the original wording. **The full raw transcript is not stored in the repo.** If the next AI needs it, ask Raka to paste it again.

### Small talk
Netherlands storms and wind, she is in West London, Raka mentioned racing UK circuits as a driver.

### Gisella's background and role (her words)
- A diplomat. "I'm actually a diplomat specializing in international..." (cut off). "The most fantastic career in my 20s, where I met everybody, but probably not what I want to do in the phase of my life when I'm going to have a family." Possibly moving into **tech policy**. Raka had asked "Am I correct that you are actually in the Department of Defense in the UK?". **She did not confirm MoD**, she confirmed diplomat.
- "I've been helping Marco with the non technical side of his business." Calls herself the **"C-FOMO"**, finance, operations and marketing officer. Raka joked "chief everything officer".
- Almost the entire QuasiScience team are engineers, "mainly ex F1 or ex finance", very pragmatic. "They will not sell an off the shelf tool, but they don't think it's actually going to do anything."
- She is assembling **a board of advisors**. A guy from McKinsey on business strategy, a guy from "Vorfolins" (likely Wolff Olins) on branding. "What we're still lacking is someone who has a deep expertise in creating a reliable sales pipeline, **getting generating 100K a month**."
- Why she wanted the call. (a) Marco needs sales expertise. (b) She's curious which other businesses Raka works with and whether they could **partner**, offering QuasiScience's bespoke capabilities to Raka's clients. "We've got fantastic tools around pricing optimization, marketing mix optimization, recommendations, store layout optimization... most of our business is bespoke." Tested with "a couple of S&P 500 clients... better than anything else that's out there, but **we just don't know how to get them out into the world**."

### Sales situation
- "We are at a very early stage of actually building a structured process around sales pipeline."
- Work so far came via "very high level contacts with S&P 500 companies in different sectors who've asked them to do projects on **a kind of organic referrals basis**. They have **never systematically done outreach**."
- Needs help "professionalizing that process, **figuring out who to target, how to tailor the messages**."
- Who sells today. "I send most of the initial messages out to different companies that we'd like to work with. And then **Marco does the initial call**", partly because the service is immensely technical, partly lack of capacity and process.
- She'd love "a perfect sales partner with great connections in one of the industries we're targeting", and "I think Marco would be willing to offer an **extremely generous commission deal**" to outsource selling "to an expert rather than trying to do it with a load of engineers and a diplomat."

### What Raka offered or described
- Epidamy case (Dutch insurance startup). A "doctor's approach", the **bow tie model** (lead to loyalty funnel), find the shortfall, diagnose, then build over 2 to 4 months. Pipeline stages 0 to 6 with entry criteria, CRM design, automation for **100 outreach a day via LinkedIn and email** with AI pre qualifying, and an **AI agent that manages inboxes**.
- Two approaches. Hands on lead generation passing qualified meetings to an account executive, or outsourcing lead gen to partners (cold calling and inbox management).
- Tools. n8n, Claude, Clay, Lemlist, and call recording tools he mentioned (names garbled).
- Sectors his clients are in. Insurance, finance, SaaS (hard right now, needs creativity), manufacturing and engineering. "Incumbent" sectors are easier by email, webinars and cold call, "though in some regions cold calling may be regulated soon."
- He said in his own words he would digest and send **"lead generation options A, B and C"** and decide where to start.

### Gisella's response (the key moment)
- On the funnel analysis. "I don't think we're **mature enough for that yet**. I think what we need to do at this stage is have **another couple of 100 sales calls in however many 1000 messages needed to generate those**, get to the point where we have something to analyze. So maybe about that, I'll get back in touch with you in a couple of months when our sales mature."
- On automation. "If CRM and outreach automation and stuff, obviously, we're a deep tech company. **So we've built a lot of that stuff ourselves. I think I need help now is just doing the sales.**" (Raka's earlier summary: "you are really lacking purely pipe generation and the right person". He says he later told the partner they said they have a CRM.)
- Her proposed next step. "Might I **send you some more information about the stuff we have built** or can build that's useful for the sort of **insurance, manufacturing and engineering** sectors? You can have a look at whether you think it will work for any of your clients. If you think you might be able to find us some customers, then we'll talk about terms and **we could be very, very generous to you**... and in a couple of months when I've actually got a pipeline for you to analyze, we could talk about that aspect."
- Close. WhatsApp details offered, a coffee if Raka passes London (Raka said he'd come to London soon), information to follow by email.

### What Raka concluded afterwards (his words in chat, 27 Oct)
- Their main problem is **pipeline generation**, they don't know tactics, the messaging angle, who to target, and haven't experimented.
- Proposed offer. A **workshop** first (messaging, angle, who to target, what works) then build **signals and automations and outreach** for them via Lemlist, Clay and email boxes. As an add on later, someone doing **cold calls** (needs sourcing, see section 7). A **dashboard or control room**, an **outbound AI agent**.
- Believes preparation must come before outbound. "I'm gonna really argue with them about it." ICP, USPs, pitch points, **battle cards**, messaging, **cadence**, signals. Wants the package split into analysis, workshop sessions, build (X workflows included, extras priced), and outbound management.
- Also wants to offer himself as a **fractional revenue operations** lead.
- **My pushback (still stands).** She said no to the funnel analysis and said they built their own CRM and automation. What she asked for is who to target, how to word it, and a partner who sells. Frame preparation as what makes the first 1,000 messages work, keep it short and fixed scope, schedule the funnel analysis as a checkpoint around day 90 when there is data, and ask what CRM and tools they have before pricing any build.

---

## 5. Gisella's email (27 Oct 2026, 15:21 UTC, verbatim)

From giselladoulton@gmail.com to rifqiraka234@gmail.com and Marco's gmail. Subject "Re: Accepted: Gisella/Raka @ Tue Oct 27, 2026 11:30am - 12pm (GMT)". Attachments `QuasiScience - Finance.pdf` and `QuasiScience - Manufacturing and Engineering.pdf`.

> Dear Raka,
>
> It was a pleasure to meet you earlier today.
>
> As promised, I am sharing some further details of QuasiScience's capabilities in the engineering/manufacturing and finance sectors. Whilst it sounds like you are already offering your clients some impressive automations, if you think some of them would benefit from more bespoke capabilities like ours and/or you'd like to be able to offer them the types of tools we've previously built, I'd love to meet again to discuss how we could work together as partners. I'd particularly draw your attention to our new end-to-end KYC tool <https://kyc.quasiscience.com>, which we've developed in collaboration with the University of Padova - it's in beta, so heavily discounted, but if any of your insurance clients would like to trial it we think it offers significantly broader insights and a more end-to-end interface than existing tools on the market.
>
> Regarding our own sales capability, as I said, we probably just need to get on with doing lots of outreach and calls to start off with, so we actually have something for you to analyse, but I'll get in touch a few months down the line when it sounds like the type of analysis you offer could be really valuable to us.
>
> Do let me know what you think of the packs, and whether you have any questions.
>
> Looking forward to staying in touch.
>
> Best regards,
>
> Gisella

Note the wording. She offers a **partnership**, asks him to consider **his clients as buyers** of QuasiScience tools, repeats that analysis is for later, and names no budget. The PDFs are the two packs reviewed in section 9 (I read all 47 pages).

---

## 6. Raka's reply (sent 27 Oct, verbatim)

Sent after Raka wrote "Send!". Reply to Gisella only, in her thread. Gmail id 1a17e48304c45b8a. I re-checked the thread before sending (still one message, hers).

> Hi Gisella,
>
> Thanks for sending the packs. I've received them and I'll go through them properly.
>
> A quick recap of today so we're on the same page. QuasiScience has strong tools that have worked for S&P 500 clients, and the work so far has come through referrals. The next step is a repeatable outreach process, mainly who to target and how to word the messages. Right now you send the first messages and Marco takes the calls, and you want a few hundred conversations behind you before any deeper analysis. That all makes sense to me.
>
> My next step is to send you a proposal for a lead generation setup, so you can see what starting that outreach could look like.
>
> Let's meet again soon. My personal WhatsApp is [Raka's number, in the sent email].
>
> Best,
> Raka

Nothing else has gone to Gisella from this session. Marco did get the 28 Oct message in section 3 (message 7). Open commitments from this email and that message. The proposal (promised to both Gisella and Marco), and "meet again soon".

---

## 7. The outbound partner call (pasted 29 Oct, date of call not stated)

**Who.** Raka's "outbound agency partner". The transcript doesn't name him. Earlier in this session Raka called a calendar session "Ivan x Raka" and mentioned "my friend Ivan" for outbound management, so this is very likely **Ivan**. **Confirm.** Based in **Barcelona**, works at an SDR/outbound agency that is part of a French revenue operations group (logo is a cube), uses Lemlist heavily, knows Raka personally (they partied together, mutual friends Joseph, Clement, Samantha). Raka said his own agency is selling to SMBs on LinkedIn and the QuasiScience deal is "the first of many".

### How Raka framed QuasiScience to him
- Engineers, ex F1, good at technical work, **"no clue about outbound, generating sales, and lead generation"**. The chief of staff asked whether Astra also does the SDR outbound and Raka "just said yes", because he has this partner.
- Raka builds everything (ICP, USPs, personas, persona cards, signals, email and LinkedIn infrastructure, domains, several LinkedIn users, around **10 campaigns running at once** including signal sequences and colder sequences). The partner would **run calls and inbox**.
- Raka's three package ideas. (1) Astra builds the sequences, client runs them. (2) Astra builds, partner **only calls**, client manages inboxes. (3) Astra builds, partner **calls and manages inboxes** (full multichannel). Raka expects QuasiScience to want (3). He also said the package idea is partly a pricing strategy.

### How it would work (agreed in outline)
- Partner gets a **Lemlist user seat** (his agency uses Lemlist as the central CRM, though QuasiScience reportedly has its own CRM, which Raka has not seen).
- Emails go out under the client's name and signature. Phone tasks appear in Lemlist after email touches, then LinkedIn follow ups.
- Partner calls from **his own dialer**, can pass through the Lemlist number, **downloads the MP3 and attaches it in Lemlist**. Books meetings into the calendar and CRM.
- Calling identity. Partner never pretends to be the CEO for mid market and enterprise, says "I'm calling regarding the email my CEO sent you." (His colleague does pretend for SMBs.)
- Raka will build a **Claude agent to monitor and flag Lemlist inbox replies** (hourly refresh). The partner's team does something similar, exporting each day's calls to CSV for Claude to summarise.
- Partner's insight. For these buyers a call alone loses velocity, because decisions are scattered across people and need an email follow up. Calls work best after an email that carries the signal.

### Pricing intelligence (transcript numbers are ASR and ambiguous, flagged)
- **SDR "slot"** = one SDR calling a whole day, 8 hours of prospecting. Partner said roughly **"3.8 to 4.5" (thousand), without taxes** (currency and period not stated, most likely euros per month).
- Later, for a full slot, "somewhere around **3000.5**", read by Raka as about 3,500. Raka's plan. "Let's say you quote 3,500 and I would like to take 4,000, I'll quote 4,000 to them." He said he'd be transparent with the partner about taking a margin.
- A discount is possible for Raka because Raka supplies the enriched lists in Lemlist and onboarding is faster. The partner wants recurring business more than one off, and needs to benchmark hours.
- **Raka's own benchmark.** His employer pays an outbound agency **900 euros per meeting** "even if they only book two", and he called it expensive. Raka expects the budget to land around 3,500 to 4,000 a month for what he described as "a full time job to generate leads".
- **Contract shapes** the partner uses. (a) For **high volume services** (KYC, retail) a **minimum of connected calls**, counting 30 seconds or more, about **200 conversations a month**. (b) For a **small target list** (renewables bidders) a **base price for an agreed number of qualified opportunities, for example 4 a month, plus a bonus per extra opportunity**. Three month contracts, a check after month 1 (ramp up, training, adjustments), the client can end after month 2.
- Raka's view of expectations. QuasiScience want "deals coming in, volume coming in", **"qualified meetings, amount not yet discussed"**, and no more than a month or so of calling "to be discussed". Raka said he told them enterprise sales "takes a while, nothing gets done within 9 months". The partner warned that clients often demand unrealistic numbers, ask where "8 meetings a month" comes from, and suggest month one is a test, then set numbers from data.

### Strategic advice from the partner (important for the proposal)
- **Each QuasiScience service needs its own ICP, pitch and campaign, and cannot be measured the same way.** Raka counted **six ICPs, six campaigns, six pitches, six USPs** and wants to push the client to **choose one first**. "You can't have everything."
- **Renewables bid optimisation** is the most urgent. Small universe (the partner said 50 to maybe 100 UK companies), so no point calling people three times a week. Chase signals, highly personalised email before the call, track qualified opportunities, not call volume. A won CfD is a 10 year government contract.
- **KYC and retail** can run at volume. Measure connected calls and gather data.
- The prospects have **no urgency**. The sequences run for months (message a month apart after the first calls), "seeds".
- **Seasonal engagement idea.** Run hard for 3 to 6 months, pause, come back when traction shows.
- Positioning idea. Cold outreach also yields **market sentiment and feedback** on their offer, which is worth selling. Run a playbook (ICP and pitch) that evolves from what prospects say.
- The partner thinks QuasiScience's site doesn't show what they sell or for whom, and lacks usable social proof.
- Raka said QuasiScience has existed "around 9 years" but has "officially" been going for about 12 months. (Companies House says incorporated 11 June 2018, so about 8 years.)

### **A conflict to resolve.** The partner (and Raka) think the CfD bidding window runs "starting in November, ending in February" so there is a three month window to reach bidders before they bid. **My research says otherwise** (unverified at primary source, see section 8). UK CfD Allocation Round 8, per sources the researcher read. Notices published 6 July 2026, **application window 20 July to 7 Aug 2026**, **results expected between 27 Nov 2026 and 17 Feb 2027** (mid March if appeals), strike prices frozen at AR7 levels. If that is right, bidders have already applied, and the Nov to Feb window is the results period. The pitch then becomes "review your outcome and prepare for the next round", not "optimise before you bid". **Check on the GOV.UK AR8 timetable before the proposal repeats the partner's version.**

### Next steps agreed with the partner
- Raka sends QuasiScience a proposal "tomorrow", hopes for another chat with them next week or the week after.
- Partner call again **next Thursday (5 Nov)**, 15 minutes, to compare progress. Move it if there is nothing to discuss on **Fri 6 Nov**.
- Partner will give Raka a clear quote once he knows the scope and which service is first.

---

## 8. What is verified and what is not

### Verified (sourced, opened)
- Companies House. QUASISCIENCE LTD, number **11409242**, active, incorporated **11 June 2018**, **Marco Ghilardi the only active director** (British and Italian, appointed 2018). Co director Guillermo Tebar resigned 18 May 2019. Accounts filed on time for FY2023, FY2024 and FY2025 (FY2025 filed 22 Dec 2025). Registered office changed five times Nov 2022 to Nov 2025. Account figures not read.
- QuasiScience site. Services, case study titles and partner logos listed in section 9. No team page now (the old `/team/` page returns 404, search snippets named a marketing lead and head of business development, unverified).
- LinkedIn company page (logged out view, 28 Oct). About 991 followers, 7 employees listed, recent posts about a Marketing Mix Optimiser beta (general release planned early next year), QuasiScience KYC launch (Italy trials, UK rollout planned), a TribYou partnership, store layout and routing posts. Only relative dates were visible.
- Marco's LinkedIn (logged out). Founder, London, 4K followers, simulation engineer, Quantic MBA 2020 to 2021, Hope Labs co founder, Royal Aeronautical Society and IoD member, an AIAA 2016 paper on hybrid rockets.
- Many regulatory and market dates in the report, each labelled with its source quality.

### Not verified, do not state as fact
- **Gisella is "Gisella Doulton at the MoD".** A search found only an aggregator sidebar on an unrelated person's Humantic AI page, listing a Gisella Doulton as "Deputy Head International Security Policy (Europe and Canada)" at the UK MoD. Raka believes it is her because she's connected to Marco. On the call she said "diplomat". No official source confirms it. Do not mention it to her unless she raises it.
- Anything in the sales packs (they're QuasiScience's own claims and are marked Private and confidential). Examples. EUR 400m investment secured through bid pricing (Ortus), "about 100,000 euros saved per test per damper" (FIPMEC), simulations at "a third of the cost" (Cranfield), 90 percent document search time cut, S&P 500 retailer work, "5 percent and 18 percent" MMO uplift, KYC built with the University of Padova, Italian beta.
- "Innovate UK and AWS award winning", "200+ proprietary code libraries", named universities. Nothing public supports them yet (the UKRI Gateway lookup returned a 502 and was never retried).
- KYC tool public details. Nothing public found beyond kyc.quasiscience.com. It lists fraud signals as both "Planned" and included, names no security certification, and its sample report is in Italian.
- Persona goals, fears and objections, size bands, buying signals and feeds. All inference. No signal source's terms of use or API was tested.
- The CfD timetable (see conflict above). The researcher opened only a SmartestEnergy page and a CMS page in full, and the GOV.UK AR8 PDF came back as binary.
- The partner's prices (ASR transcription of numbers).
- Whether QuasiScience has a CRM, and which one.

---

## 9. The two PDF packs (read in full, 25 and 22 pages, marked Private and confidential)

- Shared pages. About, a logo wall (about 25 names including Cartier, Vodafone, Ralph Lauren, Roche, Mercedes AMG Petronas, BBC, Alan Turing Institute, Ministry of Defence, FIPMEC, Ortus, Coyzy, Nulight, Facture, Nova, Inria), values (curiosity, excellence, integrity), six capabilities (automation, simulation and optimisation, ML and AI, cybersecurity, data and analytics, tech strategy), and a five stage delivery process. Requirements 1 to 2 weeks, R&D 1 to 3, implementation 3 to 8, live tests 2 to 3, then ongoing support. So **7 to 16 weeks before support**. "Why choose QuasiScience. Neither a traditional consultancy nor a simple software development agency", "if it's not evidence based, we won't build it". Testimonials from a CFO (Ortus), and CEOs of Facture, Coyzy and Tribyou.
- **Manufacturing and engineering pack.** FIPMEC component safety testing (bridge damper digital twin), Ortus scope 3 emissions, FIPMEC materials performance data platform, Fogsphere safety monitoring (ML cloud, PPE compliance), Ortus bid pricing, Kioko integrated CAD and testing, Cranfield cloud HPC, Ortus information management, S&P 500 retailer automated business management (email bots, "thousands of hours a year").
- **Finance pack.** Macroeconomics informed KYC (University of Padova), Ortus project finance risk modelling, Ortus audit preparation, retailer automation, Fogsphere cybersecurity compliance (SOC2), Fogsphere data pipeline transformation.
- **My read.** Capability decks, not go to market. They contain **no ICP, buyer titles, triggers, prices or reason to act now**. The finance pack's sector page has a heading about financial decisions but the body text describes construction firms, which looks copied from another pack. Ortus appears in 3 to 4 case studies (one case retitled across both packs), FIPMEC and Fogsphere in 2 to 3 each, so the proof base is narrow. No S&P 500 client is named.

---

## 10. The deep research, what it concluded

Full report `reports/QuasiScience ICP personas signals.md`. Five research notes in `research_notes/QuasiScience ICP personas signals/` (energy_renewables, manufacturing_engineering, financial_kyc, retail_pharma_mmo, quasiscience_positioning). The ICP summary is `clients/quasiscience/04-icp.md`.

### Recommended first campaign
**Renewables bid price optimisation, about 50 UK and EU developers and independent power producers**, sold as a small sketch (scoped, on public AR7 results) then a build. Reasons. Buyers already pay Cornwall Insight and Baringa for CfD bid strategy. The calendar is public. No personal data and a lighter security gate than KYC. **Caveat.** No sourced cost of a bid pricing error exists, the Ortus proof point was not visible on the public site, and the timing hook conflicts with the partner's version (section 7). If QuasiScience cannot supply one verifiable reference, open research led, with no claims.

### Ranking of the six ICPs
1. Renewables bid pricing. 2. KYC for payment, e-money and crypto firms first (banks need certifications QuasiScience lacks), insurers last. 3. Manufacturing digital twins (EU Machinery Regulation applies 20 Jan 2027, no transition, shorter than delivery time). 4. Marketing mix optimiser and pricing (free tools Google Meridian and Meta Robyn anchor the price, large buyers demand proof). 5. Scope 3 emissions modelling (pool shrank after EU Omnibus I). 6. Document intelligence (weakest).

### Highlights by sector (sourced unless marked)
- **Energy.** UK AR7 results 14 Jan 2026 (14.7 GW, 201 projects). AR8 per section 7. German onshore bid dates 1 Feb, 1 May, 1 Aug, 1 Nov 2026. German offshore reform is a cabinet stage bill, not law. Solar capture factors fell sharply in spring 2026 with more negative price hours (one month, overstates the year). Gate 2 grid offers phase 2 due 31 Jan 2027 (one source says mid March). GB constraint costs 1.9bn pounds in 2024/25 (Modo Energy).
- **Manufacturing.** EU Machinery Regulation 2023/1230 applies 20 Jan 2027. First Digital Product Passport (batteries) 18 Feb 2027. Synopsys completed its Ansys acquisition (17 Jul 2025), Siemens completed Altair (Mar 2025). 68 percent of UK manufacturers had unplanned downtime (Fluke/Censuswide 2025), the weekly cost figure conflicts across sources (982m versus 736m pounds), so avoid it. UK steel and EU quota changes in 2026.
- **KYC.** EU AMLA operational 1 Jul 2025, takes over EBA AML mandates 1 Jan 2026. **EU AML Regulation applies 10 Jul 2027.** AMLA supervision selection by 1 Jul 2027, direct supervision Jan 2028 (one source says Jul 2028). UK Money Laundering Amendment Regulations 2026 in effect about 30 Jun 2026. FCA consultation CP26/38 published 23 Oct 2026, closes 24 Dec 2026. EMEA compliance cost 85bn dollars a year (LexisNexis/Forrester). Fines named (Nationwide 44.1m, Barclays 42m, Monzo 21.1m pounds, ABN AMRO 8.5m euros). A Coinbase Europe fine in the notes did not match its cited URL, so it was excluded. Under DORA a small vendor can't escape the buyer's third party register, so expect security and procurement questions.
- **Retail and pharma.** Gartner 2026 CMO survey (401 leaders). Marketing budgets 7.8 percent of revenue, 56 percent say they lack budget for their strategy. Chrome kept third party cookies (22 Apr 2025), Privacy Sandbox retired (17 Oct 2025), so the cookie angle is weak. US tariff regime changed (Supreme Court struck down IEEPA tariffs 20 Feb 2026, replacement duties from 24 Jul 2026, litigation ongoing). EU AI Act Digital Omnibus moved high risk deadlines to 2 Dec 2027 and 2 Aug 2028, a weak trigger for pricing tools. Mutinex from about 18k dollars a year. Excluded as unreliable. McKinsey pricing leverage figures, the 300bn markdown figure, the 1.77tn inventory distortion figure.
- **Positioning and risks procurement will raise.** One director (key person risk), five registered office changes, no public security certification (ISO 27001, SOC 2, Cyber Essentials unknown), anonymous references, unverified awards and library claims, thin public proof. The most defensible fix is **one or two named, reference callable clients** plus a procurement pack (Cyber Essentials or a dated plan, PI and cyber insurance, IP and exit terms, a named delivery lead).
- Benchmarks (all weak, SaaS derived, vendor published). About 70 days to close a 100k deal (Gong via SaaStr), 192 days for enterprise SaaS (Ebsta via an aggregator), a 15 to 25 percent win rate (inference), cold email replies 0.5 to 4.5 percent, LinkedIn connection note replies falling about 37 percent in a year (Expandi), LinkedIn limit roughly 100 to 200 connection requests a week. Use QuasiScience's own CRM history for targets instead.

### The "why now" in one table
- AR8 results window 27 Nov 2026 to 17 Feb 2027. Machinery Regulation 20 Jan 2027. AMLR 10 Jul 2027. FCA consultation closes 24 Dec 2026. QuasiScience MMO general release early 2027.

---

## 11. Raka's full package thinking (as of 29 Oct)

Combines what he said on 27 Oct, what I proposed, and what the partner call added.

1. **Strategy sprint** (fixed fee, weeks 1 to 4). Strategy session and workshop. ICP per product and sector, unique selling points, pitch points, battle cards, messaging angles to test, cadence. The funnel analysis is scheduled as a checkpoint at about day 90 when there is data.
2. **Campaign building and running.** One product, one sector, about 50 chosen accounts at a time. Account list, 3 to 4 contacts per account, sequences for LinkedIn, email and calls, an A/B plan of two angles, Lemlist with warmed sending domains (Astra's own domain lands in spam, per the repo's lessons), weekly runs, reply handling, meetings booked, weekly report, learn and repeat.
3. **Engine build.** Lemlist, Clay and Claude workflows connected to their CRM, signals (job changes, relevant job posts, launches, post engagers), an outbound AI agent, an inbox agent, and a **control room dashboard**. X workflows included, extra ones priced each. Check what CRM and automation they already have first.
4. **Outbound management** by the partner (calls, email, inbox). Three variants as in section 7. Not priced to QuasiScience yet.
5. **Fractional revenue operations** by Raka. Weekly review with Gisella and Marco, owns the pipeline process. **Check his employment contract before offering himself personally**, otherwise offer through Astra. Cap hours per week.
6. **Seminar sessions** after the analysis. I advised leaving these out of the first proposal.

Placeholder price shapes I gave (not agreed, Raka's call). Sprint 2,500 to 4,000 euros fixed. Engine 3,000 to 6,000 with X workflows. Dashboard 1,500 to 3,000. Outbound run monthly once the partner is priced. The partner's numbers suggest roughly 3,500 to 4,000 a month for a full SDR slot, plus per opportunity bonuses. A separate repo report, `reports/GTM agency workflow build pricing.md`, was written for another client (Kyson) and found Clay and GTM engineering agencies charge roughly 4,000 to 8,000 euros a month on 3 month minimums. I did not review it for QuasiScience, but it is a useful price benchmark.

### Ideas I proposed that Raka liked or didn't reject
- Account based, about 100 to 150 chosen accounts, multi threaded (3 to 4 people per account), not 1,000 cold sends. Enterprise buying committees run 6 to 10 people (vendor sources).
- Signal engine with a score threshold and enrichment only when a signal fires.
- **Network mapping.** Match Marco's, Gisella's and the advisors' LinkedIn connections to target accounts for warm intros. Systematic "ask clients for an introduction".
- Their own LinkedIn posts as lead fuel (engagers at target accounts). Lemlist has a tool `search_linkedin_post_engagers` (untested).
- Role based targeting from their testimonials. Engineering Director, Head of Pricing, Chief Strategy Officer, CFO.
- A **sketch as the offer**, a small personalised preview built on the prospect's public data (mirrors Astra's own sketch openers).
- An auto generated pre call brief for Marco, since he's the only technical caller.
- Reseller route through Raka's own insurance and finance clients (Gisella proposed it).
- A one product, one sector, 50 account pilot before scaling.

### Risks
- **No budget named**, only commission talk. Suggested a small fixed first step, or a lower retainer plus a fee per meeting booked, never commission alone.
- Raka's day job and contract.
- Partner cost and availability not confirmed. Cold calling rules vary by country (UK, EU).
- Raka told QuasiScience (via Gisella) that Astra does SDR outbound. That depends on the partner.
- Misaligned expectations. They want volume and quick deals, enterprise sales take months.
- Sending infrastructure. Needs separate warmed domains and the legal basis for prospect data (GDPR, PECR).

---

## 12. Open questions for Gisella (not yet asked)

1. Top three clients by revenue, how each found you, who signed.
2. Typical project value and time from first call to signing.
3. Which product and sector first, and which do you refuse?
4. Which figures and client names can be used in outreach? Which two clients would take a reference call?
5. Has QuasiScience delivered a bid price optimiser, and can it show a public data example? Who owns the code?
6. Who covers Marco when he travels?
7. What CRM and sending tools do you use, and what budget range?
8. Is the commission idea for a sales partner, or for introductions to Raka's clients?

---

## 13. What to do next (suggested order)

1. **Verify the CfD AR8 timetable** on GOV.UK before the proposal states any window.
2. **Confirm with Raka** the partner's identity and whether the transcript date was 28 or 29 Oct.
3. **Draft the proposal** (one page, one recommendation, not a menu). Likely a strategy sprint plus a 90 day retainer, first campaign renewables, outbound management as a later option. Show Raka before anything is sent. Give two meeting slots (the repo's rule is every delivery asks for the call with two slots).
4. Ask Gisella the section 12 questions in a short email or on the next call, especially the budget and what tools they have.
5. Update the repo's `state/meetings.jsonl` (outcome of the 27 Oct meeting), `state/silent_accepted_queue.jsonl` row for Marco, and `logs/meetings/2026-10-27-QuasiScience.md`, as the repo's CLAUDE.md requires. The queue row for Marco still says "No reply sent to Marco", which is now stale because of the 28 Oct message.
6. Open the two PDFs again if a figure is needed. They're attachments on the Gmail message above.

---

## 14. Where everything is

Repo `rifqiraka234-oss/astra-agency`, branch **`quasiscience-gtm`** (pushed). Commits on it, newest first. b524830 ICP summary, 1b20343 deep research report, b3eecbd retail notes, c945d1b manufacturing notes, 22b5b8c energy notes, cad6ad7 call recap, packs review and package plan.

| Path | What |
|---|---|
| `clients/quasiscience/00-HANDOFF.md` | This file |
| `clients/quasiscience/01-call-and-context.md` | Short call recap and open questions |
| `clients/quasiscience/02-capability-packs-review.md` | Review of the two PDFs |
| `clients/quasiscience/03-package-plan.md` | Package plan and risks (before the partner call, so section 11 here supersedes it) |
| `clients/quasiscience/04-icp.md` | QuasiScience's ICP, ranked, with signals and checks |
| `reports/QuasiScience ICP personas signals.md` | Full deep research report (ICPs, 14 persona cards, signals table, USPs, cost of doing nothing, why now, campaign, verify list, source conflicts) |
| `research_notes/QuasiScience ICP personas signals/*.md` | Five raw research notes with every source |
| `CLAUDE.md`, `docs/RULES.md`, `docs/opener-template.md`, `docs/NO-AI-SLOP.md` | Raka's operating rules (I read CLAUDE.md fully and RULES.md to line 759 of 1,220) |

Other places. Gmail threads in rifqiraka234@gmail.com. Gisella's email thread 1a17df3da5a6e723, Raka's brief to himself 1a178ba1da41a9cb, the invite 1a17895cb2e6eb8f, the acceptance email, Marco's LinkedIn notification. The lemlist contact is `ctc_tmt7dACzww47FMfXx` (W4 campaign). The calendar event "Gisella/Raka" id `04d1g5ce5fdf9uqfmccajcpkrk` (organiser Gisella, Meet link https://meet.google.com/kwq-skcp-mxq).

Not in the repo. The raw transcripts of the Gisella call and the partner call (Raka pasted both into chat), the two PDF files themselves, and the Gmail data. Ask Raka to re-supply them if a verbatim copy is needed.

---

## 15. Things I got wrong or corrected during the session (so you don't repeat them)

- I first guessed Gisella's background and guessed she probably wasn't the decider. Her own words show she runs the non technical side and sends the first messages. A budget decision is probably hers with Marco.
- The Gisella to MoD link is unconfirmed (section 8).
- The stray `research_notes/GTM agency workflow build pricing/` folder was an untracked folder from another session that I accidentally committed to this branch with `git add research_notes`. It belongs to the Kyson work. Raka may want it removed from this branch.
- I advised against pitching the funnel analysis up front. She declined it on the call and in the email.
- I wrongly expected the sales packs to give ICP and GTM data. They don't.
- The renewables timing hook in my own report ("AR8 results window") conflicts with the partner's belief that bidding is still open. Needs one check at the source.
