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
5. Trap 4, changing two things at once. Astra's own numbers show this. In September, 4% of people messaged said yes. In October, 119 first pitches went out, 30% replied and 15% said yes. But two things changed together, who was targeted and how the messages opened. So the honest reading is "the October changes worked together", not "the new opener tripled yeses". To know which one did it, change one thing at a time.
6. Trap 5, cherry picking. Showing the best week or the best segment and calling it the result. Always show the whole period, then the breakdown.
7. Look past the yes. Astra found that consumer businesses said yes and couldn't pay, while B2B companies with budget converted. A positive reply rate that goes up while meetings with buyers stay flat means the yeses are from the wrong people. Follow every rate down to meetings held with a decision maker.
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

3. **(Scenario)** Astra's own outreach found that consumer businesses often said yes but couldn't pay, while B2B companies with budget converted. What should that change first?
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
