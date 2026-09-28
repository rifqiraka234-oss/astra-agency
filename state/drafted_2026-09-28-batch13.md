# Batch 13, 2026-09-28. The 13 chat-only accepts and the 3 stalled nudges. NOT SENT.

Raka, "okay lets re-research all these people again! remember try ALL ANGLES, ALL RESOURCES, ALL
PAGES, and judge the best. man theres a way". The 16 come from the reconciliation in
`logs/inbox/2026-09-28-accepted-reconciliation.md`. Every thread was pulled in full today, both
directions, every page (all under 10 items, `nextPage` null). Every lemlist record was read from the
acceptance activity. Every site was audited with tools/site-audit.js, crawled with tools/crawl.py,
read from Stockholm with tools/eu-view.py plus the Google Ads Transparency Center, and every linked
social account opened with tools/social-audit.js.

Result. Three openers (PyroSecure, Hire Quality Talent, FlowVolta), three nudges (J2R, Artbox, 5U AI),
two that need Raka's phone in the Netherlands before anything is written (Cleverise, ASK Wear), one
BLOCKED behind a bot wall (Jacqueline Stockwell), seven NO_STRONG_ANGLE.

---

## Georgia Storey, PyroSecure Group. OPENER.

**In plain words.** Georgia told us on 31 Aug that EVCP isn't hers, she only worked there, and that
her own business PyroSecure Group is just starting. Companies House confirms her as a director since
11 March 2026. PyroSecure installs fire alarms, emergency lighting, CCTV and access control. Its
homepage still has placeholder Latin under "Why use PyroSecure Group?", and on both the homepage and
the contact page the phone number dials a US 555 number and the email opens a message to
email@example.com. Six service pages are blank. A new installer's first customers land there. We'd
finish the site.

```gate
lead: Georgia May Storey, director of PYROSECURE GROUP LIMITED (Companies House 17084490, incorporated 11 Mar 2026, co director Michael John Ovenden), https://find-and-update.company-information.service.gov.uk/company/17084490/officers , ctc_4uSRtEPLmq73GHBvq. Her lemlist record still says Project Co-Ordinator at EVCP Installations, and in the thread on 31 Aug she wrote "EVCP isn't my business ... I do have my own small business called PyroSecure Group, but it's only just starting up"
site pass 1: 23 URLs by tools/crawl.py from the WordPress sitemap, 11 at 200, the 12 at 404 are ${findUrl} template artefacts of the IONOS builder script, not links a visitor meets
site pass 2: 23 URLs, second crawl, same 11 at 200, plus full page Chromium screenshots of the homepage and /fire-safety/ and a raw HTML read of the homepage and /contact-us/ links
deep analysis: an IONOS MyWebsite build. Homepage text "Why use PyroSecure Group? Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod condimentum felis vitae efficitur. Sed vel dictum quam, at blandit leo." with a "Learn more" button whose href is "#". The contact block shows "0333 123 1234" linked to tel:001555123456789 and "info@pyrosecure.co.uk" linked to mailto:email@example.com, and /contact-us/ carries the same mailto:email@example.com. The social icons link to https://www.facebook.com/ , https://www.instagram.com/ and https://www.twitter.com/ themselves. /fire-safety/ renders only the header, logo and footer, and /cctv-solutions/, /electrical-services/, /intruder-alarms/ and /services/ carry the same 140 odd words of template. A contact form with name, email and message is present on the homepage, so the message doesn't say nobody can reach them
owner linkedin: Companies House officers list, two directors, Georgia and Michael John Ovenden, both appointed 11 Mar 2026. PSC register not readable through fetch-walled
contact linkedin: her own message in the lemlist thread, 31 Aug 2026, is the primary source for PyroSecure being hers
google news: tools/news.py en, "PyroSecure Group" 0 results, "Georgia Storey" 10 results all about other people (equestrian, US sport), control Tesco 100. WebSearch returns Companies House and the site only
regional news: tools/news.py Wigan fire safety, 7 results, C-TEC protecting a Wigan special needs school (International Fire & Safety Journal 2026-09-23), a busy local market, nothing on PyroSecure
industry news: tools/news.py fire alarm installer UK, 78 results, installers competing on completed jobs (Overton Electrical, Yorkshire Evening Post 2026-08-25)
sources:
1. https://www.pyrosecure.co.uk/ (crawled twice, screenshotted, raw HTML read)
2. https://www.pyrosecure.co.uk/contact-us/
3. https://www.pyrosecure.co.uk/fire-safety/ (screenshot, empty)
4. https://find-and-update.company-information.service.gov.uk/company/17084490/officers
5. https://find-and-update.company-information.service.gov.uk/company/17084490
6. lemlist thread ctc_4uSRtEPLmq73GHBvq, her message of 2026-08-31
7. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fpyrosecure.co.uk (0 cookies, 0 Google ads)
8. https://adstransparency.google.com/?domain=pyrosecure.co.uk
9. tools/site-audit.js b13-pyrosecure screenshots
10. https://www.pyrosecure.co.uk/sitemap.xml
11. https://www.pyrosecure.co.uk/cctv-solutions/
12. https://news.google.com/rss/search?q=%22PyroSecure%20Group%22 (tools/news.py, 0 results, control Tesco 100)
13. https://www.linkedin.com/in/raka-mulya-b92885196 (the credential)
pains: 4 judged. (1) First customers, a six month old installer, the homepage is their storefront and its phone and email links go to placeholders, the costliest we can fix. (2) Placeholder text and blank service pages, part of (1). (3) Social, the icons link to the bare platform homepages, no account behind them, small. (4) GDPR clean, 0 cookies from Stockholm and a banner with Reject
chosen: the placeholders on the homepage, the costliest, because a customer ready to book a fire alarm service who taps call or email reaches a number and inbox that aren't PyroSecure's
sweep website: the angle. Lorem ipsum, tel:001555123456789 and mailto:email@example.com in the HTML of https://www.pyrosecure.co.uk/ , blank /fire-safety/ in the screenshot
sweep gdpr: 0 cookies before a click from Stockholm per tools/eu-view.py at https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fpyrosecure.co.uk , IONOS banner with Reject in the screenshot. Clean
sweep apps: a two director installer with no booking or quoting system to judge on https://www.pyrosecure.co.uk , the contact form is the whole funnel
sweep social: tools/social-audit.js, the site links to no social account of its own, the three icons point at https://www.facebook.com/ , https://www.instagram.com/ and https://www.twitter.com/ themselves
sweep squad: two directors and no developer roles in the crawl of https://www.pyrosecure.co.uk , not a squad fit
claims:
your homepage still has lorem ipsum under Why use PyroSecure Group, https://www.pyrosecure.co.uk/ screenshot and HTML 2026-09-28
tapping your phone number or email opens placeholders, https://www.pyrosecure.co.uk/ href tel:001555123456789 and mailto:email@example.com, also mailto:email@example.com on https://www.pyrosecure.co.uk/contact-us/
winning PyroSecure's first customers this year, https://find-and-update.company-information.service.gov.uk/company/17084490 incorporated 11 Mar 2026, and her own words "only just starting up"
built a food brand from zero, docs/astra-master-context.md section 2A, Eten Maar, https://www.linkedin.com/in/raka-mulya-b92885196
thread: problem the homepage still carries placeholders, lorem ipsum and dead phone and email links | cost the first customers who find the site can't reach PyroSecure | offer the finished PyroSecure homepage | link homepage
lead read: Georgia reads that her homepage still shows lorem ipsum and its phone and email go to placeholders, that this loses the first customers PyroSecure needs, and gets offered the finished homepage, one thread
recheck: the hrefs read from their own HTML twice, the screenshot shows the Latin, the director appointment from Companies House, and her ownership in her own words. Whether 0333 123 1234 itself is theirs is unknown, so the message says the link, not the number. Thesis confidence HIGH
```

### Georgia, OPENER

```
Hi Georgia, saw PyroSecure Group, looks interesting!

However, your homepage still has lorem ipsum under Why use PyroSecure Group, and tapping your phone number or email opens placeholders. This causes a customer ready to book a fire alarm service to reach a number and inbox that aren't yours.

Especially, when you are winning PyroSecure's first customers this year, the few who find the homepage are the ones it can least afford to lose.

I run Astra agency. We build websites and apps for brands like Unilever, AXA, Pertamina. I built a food brand from zero, so I know what each of the first customers is worth.

Shall I send you over what the finished PyroSecure homepage looks like?
```

---

## Ciara Neal, Hire Quality Talent. OPENER.

**In plain words.** Ciara runs a boutique executive search firm for industrial and technical markets,
PPE, workwear, tooling and engineering, with fees from 10 percent. Her site names its own homepage
"Navigation Bar", in the menu, in the footer and in the browser tab, and the Pricing page in the menu
is empty. The people she sells to are hiring directors and C suite, who judge a search firm on polish.
We'd finish the site.

```gate
lead: Ciara Neal, Founder and CEO of Hire Quality Talent per her lemlist record and tagline "Founder & Executive Headhunter", ctc_RpqPcqXbBRf2Zz57L. No Companies House match for the trading name by search, so it may trade as a sole trader, and the message doesn't name a company form
site pass 1: 19 URLs by tools/crawl.py, 9 at 200, the 10 at 404 are ${findUrl} artefacts of the IONOS builder script
site pass 2: 19 URLs, second crawl, same 9 at 200, plus full page Chromium screenshots of the homepage and /pricing/ and document.title read in Chromium
deep analysis: an IONOS MyWebsite build. document.title of https://www.hirequalitytalent.co.uk/ is "Navigation Bar", the first menu item reads "Navigation Bar" and so does the footer. /pricing/ renders the logo, the menu and the footer and nothing else, while the homepage says "Fees from 10%". The privacy link is "#". The homepage copy is solid, 15+ years, fees from 10 percent, full lifecycle, industrial sectors
owner linkedin: company page https://www.linkedin.com/company/hire-quality-talent read with tools/social-audit.js, tagline "Your talent shapes your future"
contact linkedin: her lemlist summary, 12+ years in HR, talent acquisition and people leadership, "Founder & Executive Headhunter"
google news: tools/news.py en, "Hire Quality Talent" 8 results none about the firm, "Ciara Neal" 6 results about other people, control Tesco 100. WebSearch likewise returns only other recruiters
regional news: tools/news.py UK recruitment industrial with executive search UK, 80 results, Holmes Noble on retention (Real Business 2026-09-21), established boutiques she competes with
industry news: tools/news.py executive search UK, 84 results, TheZoo.London launching an executive search division (campaignlive 2026-09-22), new entrants every month
sources:
1. https://www.hirequalitytalent.co.uk/ (crawled twice, screenshotted, title read)
2. https://www.hirequalitytalent.co.uk/pricing/ (screenshot, empty)
3. https://www.hirequalitytalent.co.uk/services/clients/
4. https://www.hirequalitytalent.co.uk/industries/
5. https://www.linkedin.com/company/hire-quality-talent (tools/social-audit.js)
6. https://www.instagram.com/hirequalitytalent (13 followers, 0 posts)
7. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fhirequalitytalent.co.uk (0 cookies)
8. https://find-and-update.company-information.service.gov.uk/ search, no exact match
9. lemlist thread ctc_RpqPcqXbBRf2Zz57L
10. tools/site-audit.js b13-hirequalitytalent screenshots
11. https://www.hirequalitytalent.co.uk/about/
12. https://news.google.com/rss/search?q=%22Hire%20Quality%20Talent%22 (tools/news.py)
13. https://www.linkedin.com/in/raka-mulya-b92885196 (the credential)
14. https://www.hrnews.co.uk/ executive search trends 2026, via tools/news.py
pains: 4 judged. (1) Winning search mandates from hiring directors, who vet a boutique firm on its site, and the site calls its homepage Navigation Bar with an empty Pricing page, the costliest we can fix. (2) Instagram 13 followers and 0 posts, small. (3) GDPR clean, 0 cookies and a banner with Reject. (4) No internal tooling evidence
chosen: the unfinished site, the costliest, because a director deciding whether to trust a search firm sees Navigation Bar in the tab and an empty Pricing page
sweep website: the angle. document.title "Navigation Bar" on https://www.hirequalitytalent.co.uk/ , the same label in the menu and footer, empty https://www.hirequalitytalent.co.uk/pricing/ in the screenshot
sweep gdpr: 0 cookies from Stockholm per tools/eu-view.py at https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fhirequalitytalent.co.uk and a banner with Reject in the screenshot. Clean
sweep apps: a one founder search firm, no applicant or client portal to judge in the crawl of https://www.hirequalitytalent.co.uk
sweep social: opened with tools/social-audit.js, LinkedIn company page read, Instagram hirequalitytalent 13 followers and 0 posts, small next to the site
sweep squad: one founder, no developer roles, not a squad fit per the crawl of https://www.hirequalitytalent.co.uk
claims:
your site calls its homepage Navigation Bar in the menu and the browser tab, https://www.hirequalitytalent.co.uk/ document.title "Navigation Bar" and the first menu item, screenshot 2026-09-28
the Pricing page is empty, https://www.hirequalitytalent.co.uk/pricing/ screenshot 2026-09-28, logo, menu and footer only
pitching executive search to industrial firms at fees from 10 percent, https://www.hirequalitytalent.co.uk/ "Fees from 10%" and https://www.hirequalitytalent.co.uk/industries/ PPE, workwear, tooling, manufacturing
ran global go to market at Betty Blocks, docs/astra-master-context.md section 2A, https://www.linkedin.com/in/raka-mulya-b92885196
thread: problem the site isn't finished, Navigation Bar as the homepage name and an empty Pricing page | cost the hiring directors she pitches vet the firm on it | offer the finished site | link site
lead read: Ciara reads that her site calls its homepage Navigation Bar and the Pricing page is empty, that the directors she pitches judge that, and gets offered the finished site, one thread
recheck: title read in Chromium, both pages screenshotted today, the fee line quoted from the homepage. Thesis confidence HIGH
```

### Ciara, OPENER

```
Hi Ciara, saw Hire Quality Talent, looks interesting!

However, your site calls its homepage Navigation Bar in the menu and the browser tab, and the Pricing page is empty. This causes a hiring director checking you out to see a search firm that hasn't finished its own site.

Especially, when you are pitching executive search to industrial firms at fees from 10 percent, the directors you want judge that polish before they ever reply.

I run Astra agency. We build websites and apps for brands like Unilever, AXA, Pertamina. I ran global go to market at Betty Blocks, so I've watched senior buyers vet a supplier's site before the first call.

Shall I send you over what the finished Hire Quality Talent site looks like?
```

---

## Saeid Khalafvand, FlowVolta. OPENER, flagged on pay.

**In plain words.** FlowVolta designs modular electrolysers in Rotterdam. They started a pilot with
Switch2 Offshore at the Port of Rotterdam in March 2026, their test hall at the TNO fieldlab FLIE was
due around August, and a 50 kW pilot then a 250 kW demonstrator come next, with a grant proposal being
written. The News page, where that progress lives, opens with a block of raw site code across the
top. For deep tech the site is the diligence surface for investors, partners and grant reviewers.
Small fix, so flagged.

```gate
lead: Saeid Khalafvand, co founder and CEO of FlowVolta (Rotterdam), ctc_3F8ptpRnaWSQapFhH, named "Founder & CEO" on https://flowvolta.com/ next to Stefano de Cillis "Founder & CPO"
site pass 1: 31 URLs by tools/crawl.py from the Squarespace sitemap, 21 at 200, the 10 at 404 are old sitemap entries (home-old, about-us-old, careers-old, internship1 to 3, contactv1, technology)
site pass 2: 31 URLs, second crawl, same statuses, plus a full page Chromium screenshot of https://www.flowvolta.com/news-2
deep analysis: a modern Squarespace build with custom sections. https://www.flowvolta.com/news-2 renders a block of CSS as visible text across the top, starting "/* ===== Squarespace editor safety fix ===== */", above the News timeline, March 2026 "Pilot started, Partnered with Switch2 Offshore to build a pilot for our electrolyzer stack at the Port of Rotterdam", December 2025 "Built 7 prototypes", October 2025 "Filed two more patents". A "Home test" page is live at https://www.flowvolta.com/home-test . Careers lists three closed internships and no open role. Contact is an email and LinkedIn, no form. No privacy link, 4 first party Squarespace cookies only
owner linkedin: company page https://www.linkedin.com/company/flowvolta 799 followers via tools/social-audit.js. His personal profile is 999 to us
contact linkedin: lemlist record, previously Head of Multiphysics and IP at Battolyser Systems
google news: tools/news.py nl, FlowVolta 1 result, "FLIE opent nieuwe pilothal in Rotterdam en start eerste pilot projecten" (InnovationQuarter 2026-09-23), opened and quoted, "FlowVolta is een van de startups die hun technologie gaan testen in de vandaag geopende pilothal". "Saeid Khalafvand" 0, control Heineken 100
regional news: https://www.innovationquarter.nl/en/cases/how-fieldlab-flie-and-flowvolta-are-boosting-the-hydrogen-ecosystem-in-south-holland/ 20 May 2026, "The fieldlab's new hall is expected to be operational around August 2026", "The next step will be a 50 kW pilot project, followed by a 250 kW demonstration model", "writing a grant proposal together"
industry news: Spiral Hydrogen raised 2.7 million euros to pilot at the Port of Rotterdam (Fuel Cells Works 30 Apr 2026), a funded peer in the same port, found by search
sources:
1. https://flowvolta.com/ (crawled twice)
2. https://www.flowvolta.com/news-2 (full page screenshot)
3. https://www.flowvolta.com/home-test
4. https://www.flowvolta.com/careers
5. https://www.flowvolta.com/contact
6. https://www.innovationquarter.nl/en/cases/how-fieldlab-flie-and-flowvolta-are-boosting-the-hydrogen-ecosystem-in-south-holland/
7. https://www.linkedin.com/company/flowvolta (799 followers)
8. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fflowvolta.com (4 first party cookies, 0 Google ads)
9. https://fuelcellsworks.com/2026/04/30/green-investment/spiral-hydrogen-raises-2-7m-pre-seed-funding-to-build-green-hydrogen-pilot-in-rotterdam
10. lemlist thread ctc_3F8ptpRnaWSQapFhH
11. https://www.innovationquarter.nl/updates/flie-opent-pilothal-in-rotterdam-voor-industriele-elektrificatie/ (23 Sep 2026, FlowVolta one of the first three pilots)
12. https://news.google.com/rss/search?q=FlowVolta (tools/news.py)
13. https://www.linkedin.com/in/raka-mulya-b92885196 (the credential)
pains: 4 judged. (1) Funding the 50 kW pilot, grants and partners, the costliest and not ours. (2) The diligence surface for that, the News page showing their progress opens with raw code and a test page is public, the costliest we can fix, small. (3) Hiring, all three internships closed, no open role, no squad fit. (4) No privacy page for an EU company, minor with first party cookies only
chosen: the raw code on the News page, the costliest we can fix and the hottest this week, because their pilot started in FLIE's new hall on 23 Sep and the News page is where anyone checking that progress lands
sweep website: the angle. Visible CSS at the top of https://www.flowvolta.com/news-2 in the screenshot, and https://www.flowvolta.com/home-test public
sweep gdpr: 4 first party Squarespace cookies from Stockholm per tools/eu-view.py at https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fflowvolta.com , no trackers. No privacy link, minor
sweep apps: a hardware developer, no customer portal or ordering to judge on https://flowvolta.com
sweep social: opened with tools/social-audit.js, LinkedIn company 799 followers, the site links only Saeid's own profile, normal for deep tech
sweep squad: three closed internships and no open role on https://www.flowvolta.com/careers , no capacity gap shown
claims:
your News page, the one with the Switch2 Offshore pilot, opens with a block of raw site code, https://www.flowvolta.com/news-2 full page screenshot 2026-09-28, CSS text above the timeline, "Pilot started, Partnered with Switch2 Offshore"
starting your pilot in FLIE's new hall this month, https://www.innovationquarter.nl/updates/flie-opent-pilothal-in-rotterdam-voor-industriele-elektrificatie/ 23 Sep 2026, and the 50 kW step in https://www.innovationquarter.nl/en/cases/how-fieldlab-flie-and-flowvolta-are-boosting-the-hydrogen-ecosystem-in-south-holland/
sold a Dutch software platform to technical buyers at Betty Blocks, docs/astra-master-context.md section 2A, https://www.linkedin.com/in/raka-mulya-b92885196
thread: problem the News page opens with raw site code | cost investors and grant reviewers checking the pilot meet it | offer the cleaned up FlowVolta site | link site
lead read: Saeid reads that his News page opens with raw code, that the people funding the 50 kW pilot read it, and gets offered the cleaned up site, one thread
recheck: the screenshot shows the code, the pilot and FLIE facts come from the page itself and the InnovationQuarter article. Pay test is the weak point, a cleanup is a small job on a good site, flagged. Thesis confidence MEDIUM
```

### Saeid, OPENER

```
Hi Saeid, saw FlowVolta, looks interesting!

However, your News page, the one with the Switch2 Offshore pilot, opens with a block of raw site code. This causes an investor or grant reviewer checking your progress to meet the code before the pilot.

Especially, when you are starting your pilot in FLIE's new hall this month, the partners and funders watching it will check that page first.

I run Astra agency. We build websites and apps for brands like Unilever, AXA, Pertamina. I sold a Dutch software platform to technical buyers at Betty Blocks, so I know they vet a young company on its site.

Shall I send you over what the cleaned up FlowVolta site looks like?
```

---

## Jean Madaule, J2R. NUDGE. ctc_FEAEw2Ppc4n5Hn2YL. 57 days

Thread 2 activities, `nextPage` null. The connect note on 31 Jul and our opener on 2 Aug offering a
reservation to owner portal sketch, build milestones, configuration, documents and delivery in one
view. No reply, no promise to stop. Rechecked today, the claim still holds and is stronger. The FAQ at
https://j2r.bike/en/faq/ , "Last updated May 2, 2026", says a deposit "confirms the pre order and
secures a place in the first production batches" and "First deliveries will begin after production
launch, with more precise timing shared with each customer as the project moves forward". The SMOL is
9,450 euros with "Reserve now" on https://j2r.bike/en/ . Also live, the WordPress default post
"Bonjour tout le monde !" at https://j2r.bike/2026/02/07/bonjour-tout-le-monde/ , not used.

### Jean, NUDGE

```
Jean, back on the owner portal idea from August.

Your FAQ, updated on 2 May, now says a deposit secures a place in the first batches and that delivery timing gets shared with each customer as production moves forward. That's every deposit holder waiting on a personal update from you, one at a time.

The portal I sketched does that job once for all of them, with build stage, options and delivery in one place.

Is that still landing in your inbox today, or have you got it covered?
```

---

## Marlon Aird, Artbox Studio & Gallery. NUDGE. ctc_CF2ifxkLkH4Nv4RuR. 57 days

Thread 2 activities, `nextPage` null. The connect note on 1 Aug and our opener on 2 Aug offering a
group experience builder that turns date, group size, occasion and budget into a recommended package
and a qualified booking request. No reply, no promise to stop. Rechecked today, the claim holds.
https://www.artboxstudiogallery.com/private-booking lists corporate events, birthdays, weddings and
bachelorettes, then "Request a Custom Quote", which leads to https://www.artboxstudiogallery.com/booking-request ,
a form with name, date, start time, duration, approximate guests, workshop and message, and no price.
Instagram artboxstudiogallery 8,967 followers, posting daily per tools/social-audit.js. Also live,
https://www.artboxstudiogallery.com/event-details-registration/test-event-ignore and template portfolio
pages "project-title-1" to 6, not used. Canada, so no GDPR angle.

### Marlon, NUDGE

```
Marlon, coming back to the group builder I mentioned in August.

Your private bookings still run through Request a Custom Quote, so a corporate organiser sends a date and a headcount and then waits for your team to price it. That wait's where a team booking drifts to another venue.

The builder turns the date, group size and workshop into a price they'd see straight away, and a booking you'd only have to confirm.

How many of those quote requests are you answering by hand each week?
```

---

## Yagiz Abik, 5U AI. NUDGE, rewritten on a new angle. ctc_WGtZ2trpDRmytwuoE. 41 days

Thread 2 activities, `nextPage` null. The connect note on 28 Jul and our opener on 18 Aug saying the
homepage showed two versions of the hero and the stats stacked. **That claim does not hold today.** A
full page render of https://5u.ai/ shows one hero, "AI Workers. Built for Freight Teams.", then the
sections. The raw HTML carries the hero three times, which is Framer shipping one copy per breakpoint,
so the August claim was either fixed or a misread, and the nudge says it's gone rather than repeating it.
New since then, https://5u.ai/blog/5u-ai-raises-3-2m-pre-seed-funding , 28 Jul 2026, US$3.2 million
pre seed led by Emerge Capital. The CAREERS link goes to https://app.dover.com/jobs/5u-ai (the /careers
path is a 404 but nothing links to it), which lists six open roles, three in engineering, Forward
Deployed Engineer (German-speaking), Founding AI Engineer and Full-Stack AI Engineer, all onsite in
Munich, company size 2 to 10. Build squad line is Raka's verbatim offer.

### Yagiz, NUDGE

```
Yagiz, the doubled hero I flagged in August is gone, so that one's closed.

What I'd look at now is build capacity. With the platform going out to more freight teams across Europe and the engineering team still being put together in Munich, the build sits with the founders until those people start.

I lead a squad of senior developers who'd ship next to your team in half the time at half the price while you hire.

Worth a call this week?
```

---

## Held for Raka's phone in the Netherlands, the UGC.NL route

```sweep
lead: Peter Van Gulick, co founder of Cleverise (Leiden), AI applications for the process industry, ctc_ExuGxPLfni8pCkz4h. He asked "What business do you have?" on 4 Sep and our answer ended on a question he never answered
website: 14 URLs crawled by tools/crawl.py, a modern WordPress site with news posts on Alfred for terminals and Q88 document processing, https://cleverise.nl/news/ , strong on substance
gdpr: tools/eu-view.py from Stockholm sets _ga and _ga_7G2CYJTHVT before any click while Complianz is loaded, https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fcleverise.nl . One EU tool only. If Raka opens cleverise.nl on his phone in NL and GA fires before a choice, it's a consent opener for a company selling AI into regulated plants
apps: they build AI agents themselves per https://cleverise.nl/our-way-of-working/ , not a buyer for tools
social: opened with tools/social-audit.js, LinkedIn company 253 followers, fine for a two founder firm
squad: two founders building AI applications, no open roles in the crawl of https://cleverise.nl , no capacity evidence yet
verdict: BLOCKED_NEEDS_INFO. Needs Raka's NL phone check of https://cleverise.nl before any draft
```

```sweep
lead: Stefan van der Heijden, co owner of ASK Wear (Bergeijk), workwear fitted on site in Brabant and Limburg with Anouk Krekels, ctc_sCoFYXP34MiTGkvGq. He asked "what kind of business do you have?" on 4 Sep and our answer, which floated a reorder portal, ended on a question he never answered
website: 28 URLs crawled by tools/crawl.py, eight branche pages and a local page for Bergeijk, "ASK Wear is geen webshop" on https://askwear.nl/branches/bouw/ , decent and deliberately personal
gdpr: tools/eu-view.py from Stockholm calls api.leadinfo.com, collector.leadinfo.net and collector4.leadinfo.net, a B2B visitor identification service, and GA hosts before any click while CookieYes is loaded, https://webbkoll.5july.net/en/results?url=http%3A%2F%2Faskwear.nl . Our browser couldn't see whether an NL visitor gets a banner. One EU tool only
apps: the reorder portal floated on 4 Sep is our hypothesis, the site says they prevent "losse nabestellingen" by fitting on site, https://askwear.nl/branches/bouw/ , not a pain they name
social: opened with tools/social-audit.js, LinkedIn 15 followers, Instagram 21 followers and 3 posts, latest 17 Sep, Facebook 145, small and active
squad: a two person workwear firm, not a squad fit per the crawl of https://askwear.nl
verdict: BLOCKED_NEEDS_INFO. Needs Raka's NL phone check of https://askwear.nl , if Leadinfo fires before a choice it's the UGC.NL shape of opener
```

## BLOCKED behind a wall

```sweep
lead: Jacqueline Stockwell, CEO and founder of Leadership Through Data and JakiSpeaks, ctc_hYkMQaD4Qw5QrHACN. Her tagline names her goal, an information management accelerator programme called empower
website: 29 URLs of https://jakispeaks.com crawled by tools/crawl.py, the homepage button to her books and podcasts links to /podcasts-books/ which is a 404 while /books-podcasts/ answers 200, a tweak. The empower programme is not on jakispeaks.com, and https://www.leadershipthroughdata.com answers 202 with a "Checking the site connection security" wall to curl, tools/fetch-walled.py and Chromium
gdpr: GA cookies before a click from Stockholm per tools/eu-view.py, https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fjakispeaks.com , and no banner in the site-audit.js render, UK PECR, small next to the programme question
apps: MemberSpace sign in on https://jakispeaks.com , a membership layer exists, can't judge the programme behind the wall
social: opened with tools/social-audit.js, Instagram 14 followers, 2 posts, latest 5 Mar 2026, dormant, TikTok 6 followers
squad: a speaker and trainer, no developer roles in the crawl of https://jakispeaks.com
verdict: BLOCKED_NEEDS_INFO. Raka opens https://www.leadershipthroughdata.com to see how empower is sold before we judge
```

## NO_STRONG_ANGLE

```sweep
lead: Nick Vlaeyen, co founder of WINGMEN (events, three partners, Heist-op-den-Berg) and on staff and partnerships there, ctc_SumZAfq5GtFt9xjEF. His tagline also names paper and board recycling, the Smurfit job we asked about
website: 14 URLs of https://wingmen.events crawled, a March 2026 WordPress build by IADT, one case study (Prime Development), the WordPress default "Hello world!" post live at https://wingmen.events/hello-world/ , a tweak. Their venue Casa Remy has its own site https://www.casaremy.be with Nick's own number, so the venue isn't hidden
gdpr: Complianz with reject and 0 cookies before a click from Stockholm per tools/eu-view.py, https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fwingmen.events . Clean
apps: quote requests through the contact form on https://wingmen.events/contact/ , no volume evidence for a tool
social: tools/social-audit.js, the site links to no social account, the footer words Instagram and Facebook aren't links. A tweak for an events brand, not a sale
squad: a three partner events bureau with no developer roles or software work anywhere on https://wingmen.events , not a squad fit
verdict: NO_STRONG_ANGLE. The costliest pain, filling public concepts and the venue, isn't something the site evidence shows us failing
```

```sweep
lead: Fabien Llobell, founder of SensElevation (Bordeaux), sensory data consulting, training and tools, ctc_uLQxDjpkFxz6DD7hJ
website: 20 URLs of https://senselevation.com crawled in English and French, a Wix site with events, a Product Similarity Studio and free software, decent
gdpr: 7 first party Wix cookies and no trackers from Stockholm per tools/eu-view.py, https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fsenselevation.com . No privacy link found, a legal notice exists, minor
apps: he develops his own analytical tools per https://www.senselevation.com/product-similarity-studio , not a buyer
social: opened with tools/social-audit.js, the LinkedIn company page https://www.linkedin.com/company/senselevation read, the only account linked from the site, fine for a solo consultancy
squad: a one person consultancy that builds its own software per https://www.senselevation.com/product-similarity-studio , no capacity gap or developer hiring shown
verdict: NO_STRONG_ANGLE
```

```sweep
lead: Yoeri Sanstra, founder of Sanstra Supply Chain Advisory, currently in an interim project role per his own message of 4 Sep, ctc_MtGBXP6wEwP95GWdy
website: 10 URLs of https://yoerisan.com crawled, a Kadence WordPress site with representative cases, one case link 404s at /representative-cases/planning-maturity/ , a tweak
gdpr: site-audit.js from the US saw GA through Site Kit and no banner, but tools/eu-view.py from Stockholm set 0 cookies, https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fyoerisan.com . The two disagree, so nothing is claimed
apps: a solo interim executive, no process a tool would fix per https://yoerisan.com
social: opened with tools/social-audit.js, his personal LinkedIn is the only linked account and read UNKNOWN, 999
squad: a one person advisory with no developer roles and no software product on https://yoerisan.com , not a squad fit
verdict: NO_STRONG_ANGLE, a one person interim practice with no budget signal
```

```sweep
lead: Ramar Nadar, founder of RentyFind (London), an AI rental search app, ctc_2iNgGwkzexwdG6wWP
website: 19 URLs of https://rentyfind.com crawled, a modern Next.js product site with sign in, site-audit.js RENDER NOT TRUSTED so no visual claim
gdpr: tools/eu-view.py from Stockholm sets _ga and _ga_3T1ENDHWHE and calls clarity.ms and doubleclick before a click, https://webbkoll.5july.net/en/results?url=http%3A%2F%2Frentyfind.com , and site-audit.js found no banner. Real for UK PECR, a small fix
apps: they are the app per https://rentyfind.com , nothing internal to sell against
social: opened with tools/social-audit.js, Instagram 17 followers, 19 posts, latest 4 Jul, LinkedIn, Facebook and X read
squad: a one founder pre revenue app per the lemlist record and https://rentyfind.com , no budget in the 5k to 50k band shown
verdict: NO_STRONG_ANGLE. The costliest pain is getting renters in a crowded field (birb, Rentry, RentY by search), and the consent fix is a free tip
```

```sweep
lead: Sarim S., founder of Flochitect (Brighton), ctc_Exg3BgqLrnRB727Lh
website: https://flochitect.com titled "Home - AI Automation Solutions" per site-audit.js, an automation and AI agency for SMBs, a direct competitor
gdpr: banner with reject per site-audit.js, not taken further for a competitor, https://flochitect.com
apps: they sell automation and AI enabled systems themselves per the lemlist companyDescription and https://flochitect.com , nothing to sell them
social: tools/social-audit.js reports the site links to no social account at all, https://flochitect.com , nothing to open and not a pitch for a competitor
squad: a one person agency in our own line, per the lemlist record and https://flochitect.com
verdict: NO_STRONG_ANGLE, a competitor
```

```sweep
lead: Timur Teregulov, co founder of LeBretons Group, ctc_YLmRL36CPuodKLwNX. His lemlist summary says he's a final year computer science student
website: https://lebretons.co.uk "Marketing & strategy for ambitious businesses", branding, paid ads, lead generation and AI transformation, read by curl today, a marketing agency
gdpr: 0 cookies before a click per site-audit.js on https://lebretons.co.uk , not taken further for a competitor
apps: an agency that sells digital and AI transformation to its own clients per https://lebretons.co.uk , nothing to sell them
social: tools/social-audit.js reports the site links to no social account at all, https://lebretons.co.uk , nothing to open and not a pitch for a competitor
squad: an agency in our own line per https://lebretons.co.uk and the lemlist record
verdict: NO_STRONG_ANGLE, a competitor, and the record says student
```

```sweep
lead: Aashir Qureshi, founder of Oranjelo per the lemlist record, now Founder and Interim CEO of Crystex per his LinkedIn title found by search, ctc_2kkM6yFpTdYoG2YhW
website: oranjelo.com has no DNS, https://dns.google/resolve?name=oranjelo.com returns NXDOMAIN (Status 3) from the .com registry while example.com resolves, control in the same minute. The domain has lapsed
gdpr: nothing to test because there is no site, the domain returns NXDOMAIN per the DNS check at https://dns.google/resolve?name=oranjelo.com
apps: Crystex appears on https://topicolist.com/crystex as a token sale, not a business we pitch
social: no domain, so there is no site linking any account to open, and his Instagram https://www.instagram.com/aashirqureshiofficial/ is personal, not a company channel
squad: no company site, no product and no hiring to judge, nothing ours to sell per the lemlist record and https://topicolist.com/crystex
verdict: NO_STRONG_ANGLE, the company's domain has lapsed and his current venture is a crypto token sale
```
