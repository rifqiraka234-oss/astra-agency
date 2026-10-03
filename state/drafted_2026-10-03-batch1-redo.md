# Batch 1 of the closed owners, re-researched 2026-10-03. 2 openers SENT 15:54 UTC (Mandy, Timur), 6 closed.

Raka's words, "Yes. And again please test ALL angles? I told you about the 5 angles. What are those?"
The five, website, GDPR from an EU visitor's view, apps and internal tools, social media opened with
tools/social-audit.js, and Build Squad. Every one of the eight below got all five.

## What was run, per lead

- **Threads pulled in full this session**, one page each, nextPage null on all eight. Seven came back with content,
  Mandy's came back empty, and Mushtaq's full thread pulled in the same minute is the positive control. A sentOnly
  search on her name returns ctc_ZGv33qKajKqMjkqH9 with the 7 Sep connect note as last sent and lastRepliedAt null,
  so she's a true Silent accepted.
- **lemlist records read** with search_contacts for Mushtaq ("Chief Executive Officer - Founder") and Mandy
  ("Co-Founder & Fractional COO"). The other six from their queue rows and the register.
- **Registers.** Companies House for Aptiq Works SC871412, its predecessor Trickle Data Insights SC567746, Tucked
  SC904202, Nuuri SC805120, LeBretons Group 16223918 and Flochitect 17011927.
- **Sites crawled twice** with tools/crawl.py, pass 2 equal to pass 1 on all eight (6, 19, 10, 22, 3, 180, 1, 9).
  tools/site-audit.js and tools/eu-view.py on every homepage. The two single page apps (LeBretons, Omnilabs) and
  Flochitect, Trickle rendered in Chromium with every anchor listed.
- **Social.** Every account linked from each site's own HTML opened with tools/social-audit.js. Two handles I
  guessed (trickle-works, lebretons-group) were thrown away unread, guesses aren't evidence.
- **News.** tools/news.py for company, person, region and industry on all eight, the control came back full each
  time.

## The count

| Lead | Verdict | In one line |
|---|---|---|
| Mandy Kerley, Trickle (Aptiq Works) | OPENER | Every £995 sprint comes with a dedicated customer success lead and the company is two founders, so each sprint sold lands on them |
| Timur Teregulov, LeBretons | OPENER, a follow up in a warm thread | His proof buttons jump to the contact form and About, Careers and Blog link nowhere, so "32+ brands" rests on one case |
| Mushtaq Taher, RentX | NO_STRONG_ANGLE | Real pains, placeholder helpline and an "8500+ Categories" copy bug, but two agencies already build his site and app and both fixes are an afternoon for them |
| Orion Dai, Omnilabs | NO_STRONG_ANGLE | His own next steps are clinical evaluation, QMS and CE marking, none of it ours |
| Sarim Shehzad, Flochitect | NO_STRONG_ANGLE | A one person automation agency set up in Feb 2026, no client or capacity fact to build a squad message on |
| Ramar Nadar, RentyFind | NO_STRONG_ANGLE | Pre revenue solo app, a dead X link and pre consent tracking are free tips |
| Fabien Llobell, SensElevation | NO_STRONG_ANGLE | Solo sensory statistics consultant who builds his own free apps |
| Yoeri Sanstra, Sanstra | NO_STRONG_ANGLE | Solo interim supply chain leader, clean site, clean EU view |

## The things Raka would want to know first

- **Mandy doesn't own the shares, and I'm overriding four earlier no angle verdicts anyway.** Companies House gives
  Paul Reid 75%+ of Aptiq Works and he's its only director. But Trickle's own about page lists exactly two founders,
  "Paul Reid, Founder & CEO" and "Mandy Kerley, Co-founder & COO", who "Leads operations across Aptiq Works, from
  customer success delivery to commercial structure". She runs the part the message is about. The new evidence is
  the pricing page, which promises a "Dedicated customer success lead" in every sprint, against an about page
  that says "Every customer works directly with the people who designed the platform and run the sprints".
- **What stays out of Mandy's message, on purpose.** The old company, Trickle Data Insights Limited, raised £1m in
  Sep 2023 (Equity Gap, Scottish Enterprise, NoBa) with a CFO and CMO, and is now in liquidation with Begbies
  Traynor. Aptiq Works was set up on 30 Nov 2025 and carries the product. And Paul became a director of Nuuri Ltd on
  15 Sep 2026 and set up Tucked Limited on 28 Sep 2026, both software companies. That's why two people now carry
  what a funded team used to, but naming any of it would read as us digging, so none of it is in the message.
- **Timur's message is a follow up, not a cold opener.** He accepted on 6 Aug, wrote "likewise, great connecting
  with you" on 10 Aug, and on 11 Aug we asked about his client engagements and offered help on "the tools or website
  side". He never answered. So the first line says we spoke in August, which is the only change to the template's
  fixed wording, flagged here so you can strike it. He's a director and a 25 to 50% owner of LeBretons Group Ltd,
  with Tyrese Dawkins, and lemlist calls him a final year computer science student.
- **RentX was close.** Both helpline numbers on the contact page, in English and Bengali, are zero runs, "+880
  1700-000000" and "+880 9600-000000", while his own Google Play listing gives +44 7717 615544. The English merchant
  page says "8500+ Partner Brands 8500+ Categories 8500+ Partner Outlets" where the Bengali page says 160+ brands and
  25 categories and the brand list counts 340. And Play's own data puts the app at 278 installs (shown as 100+)
  against 15,541 Facebook followers. But Digitomark lists RentX on its portfolio for brand identity and web
  development, Dcastalia built the app in 2024, and both visible bugs are a ten minute fix for them. If you want, a
  short friendly heads up about the zeros is a decent relationship move, but it isn't a pitch.
- **One claim I nearly made and dropped.** RentX's /merchant-network/restaurants shows "Category Not Found", but the
  real category lives at /restaurant and lists 26 brands. The crawler found the plural URL, I couldn't show the site
  links to it, so it's out.

---

## Mandy Kerley, Trickle (Aptiq Works). OPENER. ctc_ZGv33qKajKqMjkqH9

```gate
lead: Mandy Kerley, Co-founder & COO of Aptiq Works Limited, the company behind Trickle (Companies House SC871412, incorporated 30 Nov 2025, Edinburgh), ctc_ZGv33qKajKqMjkqH9. lemlist search_contacts jobTitle "Co-Founder & Fractional COO". https://trickle.works/about.html "Our Founders ... Paul Reid Founder & CEO ... Mandy Kerley Co-founder & COO Leads operations across Aptiq Works, from customer success delivery to commercial structure". The register gives Paul Kenneth Reid as sole director and 75%+ PSC, so she runs the business without holding the shares, and the subject of the message is the part she runs. With Trickle since 2020 per https://www.digit.fyi/employee-engagement-app-trickle-gets-new-coo-appointment/ and https://highgrowth.scot/trickle-strengthens-leadership-team-with-appointment-of-coo/ (search result titles, COO appointment, earlier Customer Wellbeing Lead). Thread pulled today, 0 activities, sentOnly search shows the 7 Sep connect note as last sent and lastRepliedAt null, positive control Mushtaq's thread full in the same minute
site pass 1: 9 URLs by tools/crawl.py on https://trickle.works/ , all 200, homepage, platform, use cases, case studies, the NHS and West Dunbartonshire case studies, blog index and two founder posts, plus about.html, pricing.html and faq.html fetched directly because the nav is built in script, team.html 404 with a real not found page
site pass 2: 9 URLs, second full crawl, matching pass 1, about, pricing and faq fetched again at 15:37 UTC, tools/site-audit.js on the homepage with the desktop and phone screenshots, and every rendered anchor on the homepage listed in Chromium
deep analysis: A clean, current SaaS site with real public sector proof, NHS Lothian, NHS Lanarkshire, NHS Mid Yorkshire and gov.scot in the trusted row, case studies with numbers (333 staff signed up and matters resolved in 12 days at NHS Lanarkshire maternity, 6,000+ employees at West Dunbartonshire Council), a Scottish Government report citation, and a commercial model built on low friction, a £995 four week Starter Sprint "within most day-to-day budget approval thresholds", a sub £5,000 12 week sprint, annual programmes and Always On. Every sprint includes "Full platform access for up to 250 users, Dedicated customer success lead, Sprint setup and onboarding support". The about page says there are two founders and no layers, "Every customer works directly with the people who designed the platform and run the sprints. No account management layer. No handoffs between sales, success, and product." The homepage says "Champions trained, zero end-user training required". So the product scales itself, and the service around each sprint runs through two people
owner linkedin: route 1 curl https://www.linkedin.com/in/paulreidedinburgh/ 999. Route 2 web search "Trickle" Aptiq Works Paul Reid Mandy Kerley, his profile title "Paul Reid - Aptiq Works Limited", walled. Route 3 his own words, the founder posts https://trickle.works/blog-broken-windows.html and https://trickle.works/blog-inaction-fatigue.html , "Paul Reid Founder & CEO, Aptiq Works". Route 4 Companies House officer appointments, Aptiq Works, Tucked Limited SC904202 (incorporated 28 Sep 2026, SIC 62012, he's sole director and 75%+ PSC), Nuuri Ltd SC805120 (director since 15 Sep 2026, Steven Clarke is PSC), Reidirect Limited, Trickle Data Insights Limited SC567746 (in liquidation, Begbies Traynor). Route 5 the 2023 funding article https://www.scottishfinancialnews.com/articles/scottish-productivity-startup-trickle-wins-ps1m-investment-to-fuel-expansion . Route 6 the lemlist record does not cover him
contact linkedin: route 1 curl https://www.linkedin.com/in/mandy-kerley-a2525b24 999. Route 2 web search "Mandy Kerley" Trickle COO linkedin, result titles only for her profile. Route 3 https://trickle.works/blog/meet-the-team-mandy-kerley/ fetched, serves the blog index with no post about her. Route 4 the COO appointment coverage opened at source, https://highgrowth.scot/trickle-strengthens-leadership-team-with-appointment-of-coo/ and https://www.digit.fyi/employee-engagement-app-trickle-gets-new-coo-appointment/ , both 9 Nov 2022, with Trickle since 2020, promoted from Customer Wellbeing Lead. Route 5 the about page in her company's own words. Route 6 the lemlist jobTitle
google news: tools/news.py, "Trickle Aptiq" 0 results, "Mandy Kerley" 0, control Tesco 100
regional news: tools/news.py (Edinburgh OR Scotland) (NHS staff engagement platform) 27 results, 2026-09-24 Health Tech World digital health shortlist (https://htworld.co.uk/health-tech-world-awards/three-digital-health-innovators-shortlisted-for-award-digicat/ , Oviva named, Trickle not), 2026-07-24 Digital Health on Scotland's mental health hub network, no Trickle mention
industry news: tools/news.py staff engagement and NHS speaking up coverage read through the regional query, and the 2023 funding article, which quotes Amanda Kerley as COO on "transparency, enhancing psychological safety, and addressing whistleblowing"
sources:
1. https://trickle.works/pricing.html
2. https://trickle.works/about.html
3. https://trickle.works/
4. https://trickle.works/faq.html
5. https://trickle.works/case-studies.html
6. https://trickle.works/blog-broken-windows.html
7. https://find-and-update.company-information.service.gov.uk/company/SC871412
8. https://find-and-update.company-information.service.gov.uk/company/SC567746
9. https://find-and-update.company-information.service.gov.uk/company/SC904202
10. https://find-and-update.company-information.service.gov.uk/company/SC805120
11. https://www.scottishfinancialnews.com/articles/scottish-productivity-startup-trickle-wins-ps1m-investment-to-fuel-expansion
12. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Ftrickle.works (tools/eu-view.py)
13. https://htworld.co.uk/health-tech-world-awards/three-digital-health-innovators-shortlisted-for-award-digicat/
14. https://highgrowth.scot/trickle-strengthens-leadership-team-with-appointment-of-coo/ (9 Nov 2022, COO, previously Customer Wellbeing Lead)
15. https://www.digit.fyi/employee-engagement-app-trickle-gets-new-coo-appointment/ (9 Nov 2022, with Trickle since 2020)
pains: 6 judged. (1) Apps, a dedicated customer success lead, setup and onboarding support come with every sprint from £995, and the company is two founders who run the sprints themselves, so every sprint sold adds hours to the same two people while the pricing is built to sell more of them. Costliest, because it caps how many sprints they can run at once, and it's the pain in her own job. (2) Squad, one engineer founder now also on two other software companies' boards since September, real, but naming it reads as watching her co founder, and the evidence is board seats, not missing work, so not chosen. (3) GDPR, from Stockholm 0 cookies but 5 third party requests before a click (Google Analytics region1, googlesyndication, googletagmanager, Simple Analytics) with Google consent mode on the page, cookieless pings, grey, not chosen. (4) Website, nothing wrong, the proof and pricing are clear. (5) Social, the site links no social account, rendered anchors listed, Omnilabs' anchors through the same script the control. (6) The old company in liquidation, context only, never in a message
chosen: (1), the costliest, the sprint service runs through two people while the pricing is designed to sell more sprints, so it caps the business
sweep website: 9 pages crawled twice plus about, pricing and faq, homepage rendered and screenshotted, https://trickle.works/ is clean and current with named NHS and council proof, no flaw worth a message
sweep gdpr: tools/eu-view.py from Stockholm on https://trickle.works , 0 cookies, 5 third party requests before a click with gtag consent mode present, cookieless pings at most, not chosen
sweep apps: https://trickle.works/pricing.html "Dedicated customer success lead" and "Sprint setup and onboarding support" in every sprint, https://trickle.works/about.html two founders who run the sprints, chosen
sweep social: tools/social-audit.js has nothing to open, https://trickle.works/ links no social account in its rendered anchors, control Omnilabs' rendered LinkedIn and Instagram anchors through the same script, two guessed LinkedIn handles discarded, not chosen
sweep squad: Paul Reid director of Tucked SC904202 from 28 Sep 2026 and Nuuri SC805120 from 15 Sep 2026 per Companies House, a real squad fit on paper, left out because it reads as watching her co founder
thread: problem a dedicated customer success lead, setup and onboarding come with every sprint and the company is two founders | cost the hours each sprint takes decide how many they can run as the entry price is built to sell more of them | offer the sprint setup tool | link sprint, setup
lead read: Mandy reads that every sprint promises a dedicated customer success lead while her company is two founders, so each sprint she sells adds setup, onboarding and Champion training to their own week, and that the hours per sprint cap how many they can run, and gets offered a sprint setup tool, one thread
claims:
your pricing page promises a dedicated customer success lead on every sprint, https://trickle.works/pricing.html "Starter Sprint £995 Fixed price · 4 weeks · Up to 250 users" and "What's included ... Dedicated customer success lead", rechecked 15:37 UTC
your about page lists two founders, https://trickle.works/about.html "Our Founders" Paul Reid and Mandy Kerley, "Every customer works directly with the people who designed the platform and run the sprints. No account management layer", rechecked 15:37 UTC
setup, onboarding and Champion training, https://trickle.works/pricing.html "Sprint setup and onboarding support", https://trickle.works/ "Champions trained, zero end-user training required", rechecked 15:37 UTC
pricing the entry sprint under most budget approval thresholds so trusts can start without procurement, https://trickle.works/pricing.html "At £995, the entry Sprint sits within most day-to-day budget approval thresholds - no lengthy procurement process needed to get started", rechecked 15:37 UTC
recheck: 2026-10-03 15:37 UTC, pricing.html and about.html fetched again and every quoted line found in the fresh copy, the homepage Champions line found, control example.com 200. Thesis confidence MEDIUM, the promise and the team size are proven on their own pages, that sprint delivery is the bottleneck is inference she can test against her own calendar
```

### Mandy, OPENER

```
Hi Mandy, saw Trickle, looks interesting!

However, your pricing page promises a dedicated customer success lead on every sprint, and your about page lists two founders. This causes each new sprint you sell to add setup, onboarding and Champion training to the same two diaries.

Especially, when you are pricing the entry sprint under most budget approval thresholds so trusts can start without procurement, the hours each sprint takes decide how many you can run at once.

I run Astra agency. We build internal tools for brands like Unilever, AXA, Pertamina. I set up self serve insights for 23 markets at Heineken, so I've seen what it frees up when teams don't wait on one central person.

Shall I send you over what the sprint setup tool looks like?
```

---

## Timur Teregulov, LeBretons. OPENER, follow up in a warm thread. ctc_YLmRL36CPuodKLwNX

```gate
lead: Timur Teregulov, director and 25 to 50% PSC of LEBRETONS GROUP LTD (Companies House 16223918, incorporated 3 Feb 2025, Birmingham), with Tyrese Anthony Dawkins as the other director and 25 to 50% PSC, Robin Barrow resigned Apr 2025, ctc_YLmRL36CPuodKLwNX. An owner. lemlist search_contacts jobTitle "Co-Founder & Chief Executive Officer", linkedinUrl https://www.linkedin.com/in/timur-teregulov , and his lemlist summary per the 28 Sep sweep says final year computer science student. Thread pulled today, 3 items, our connect note 6 Aug, his "Hi Raka, likewise, great connecting with you" 10 Aug, our 11 Aug message asking what a typical client engagement looks like and offering help "on the tools or website side", no reply since
site pass 1: 3 URLs by tools/crawl.py on https://lebretons.co.uk/ , the homepage and two font files, it's a one page site, so it was rendered in Chromium, scrolled to the end, full text read and every anchor listed, 9 hrefs in total, "#main", "#", "#services", "#work", "#contact", the phone, the email, /privacy-policy and /terms-of-service
site pass 2: 3 URLs, second full crawl matching pass 1, the page rendered again and each of "View all case studies", "View more testimonials", "Careers", "Blog", "About Us" and the six "Learn more" links clicked in Chromium with the result recorded, tools/site-audit.js with desktop and phone screenshots, no RENDER NOT TRUSTED
deep analysis: A dark single page agency site, marketing and strategy, six services (Branding & Design, Paid Ads & PPC, Digital & AI Transformation, Lead Generation, Marketing Strategy, Fractional CMO), a hero form asking for a work email, and big claims, "32+ Brands we've assisted across the globe", "$100M+ Value added through marketing & strategy", "$3M Ad spend budget managed", "7:1 Average ROI". The proof under them is one case, "AUTOMOTIVE 3.12x increase in qualified leads For a car detailing company in 2 months", and one testimonial, Nick Fisher of Max PPF & Detailing. Every link that promises more sends the visitor to the enquiry form, "View all case studies" and "View more testimonials" are href #contact and scroll to the "READY TO GROW?" section with 9 form fields, all six "Learn more" links do the same, and "About Us", "Careers" and "Blog" in the footer are href # and jump to the top
owner linkedin: route 1 curl https://www.linkedin.com/in/timur-teregulov 999. Route 2 web search "Timur Teregulov" LeBretons, only unrelated people of that name (a Moscow photographer, HSE MIEM), nothing tied to him. Route 3 tools/social-audit.js on a guessed company handle, discarded as a guess. Route 4 Companies House, director since 3 Feb 2025, born July 2002. Route 5 his own words, the 10 Aug reply in the thread. Route 6 the lemlist summary, student
contact linkedin: same person as the owner, the register and the lemlist record agree, same six routes
google news: tools/news.py, "LeBretons Group" 0 results, "Timur Teregulov" 0, control Tesco 100
regional news: tools/news.py ((Birmingham OR London)) (marketing agency case studies) 0 results, the control came back full so the zero is real
industry news: tools/news.py marketing agency case studies 77 results, headlines only and none about LeBretons, the 2026-08-08 EIN Presswire headline on a review of 50 law firm marketing case studies was not opened and is not used for anything
sources:
1. https://lebretons.co.uk/
2. https://lebretons.co.uk/#work
3. https://lebretons.co.uk/#contact
4. https://lebretons.co.uk/privacy-policy
5. https://find-and-update.company-information.service.gov.uk/company/16223918
6. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Flebretons.co.uk (tools/eu-view.py)
7. https://www.linkedin.com/in/timur-teregulov (999)
8. https://find-and-update.company-information.service.gov.uk/company/16223918/officers
9. https://find-and-update.company-information.service.gov.uk/company/16223918/persons-with-significant-control
10. https://lebretons.co.uk/terms-of-service
11. https://news.google.com/rss (tools/news.py, company, person, region, industry)
12. https://example.com (control host, 200 at 15:37 UTC)
pains: 5 judged. (1) Website, an agency selling a free strategy call on "32+ brands" and "$100M+" shows one case and one testimonial, and every link that promises more proof drops the visitor into the enquiry form, while About Us, Careers and Blog go nowhere. Costliest, the site is his only sales surface and the proof is what makes a stranger book the call. (2) Squad, a two director agency selling Digital & AI Transformation, but no capacity fact, no team page, no delivery times, no hiring, so nothing to build a squad message on. (3) GDPR, 0 cookies before a click per tools/eu-view.py, clean. (4) Apps, they sell AI and automation themselves, nothing to sell them. (5) Social, the site links no social account
chosen: (1), the costliest, the proof gap sits on the only page his buyers see and decides whether they book the call
sweep website: https://lebretons.co.uk/ rendered and every link clicked, "View all case studies" and "View more testimonials" go to #contact, About Us, Careers and Blog are href #, one case and one testimonial against 32+ brands, chosen
sweep gdpr: tools/eu-view.py from Stockholm on https://lebretons.co.uk , 0 cookies and no third party tracker before a click, clean, nothing to say
sweep apps: they sell Digital & AI Transformation to their own clients per https://lebretons.co.uk/ , no internal process visible worth a tool, nothing to sell them
sweep social: tools/social-audit.js has nothing to open, the rendered anchors on https://lebretons.co.uk/ include no social account, control Omnilabs' social anchors through the same script, not chosen
sweep squad: two directors per Companies House 16223918, no team page, delivery times or vacancies on https://lebretons.co.uk/ , no capacity fact
thread: problem the proof buttons jump to the contact form and About Us, Careers and Blog link nowhere, so 32+ brands rest on one case study | cost a buyer who can't open the proof doesn't book the free strategy call | offer the case studies page | link case, studies
lead read: Timur reads that his "View all case studies" button drops visitors into the contact form and three footer links go nowhere, so a founder checking his 32+ brands finds one case study, that the strategy calls he sells on those claims are the ones that don't get booked, and gets offered a case studies page, one thread
claims:
your "View all case studies" button jumps to the contact form, https://lebretons.co.uk/ the anchor "View all case studies" has href #contact, clicked in Chromium, it scrolls to the section id contact with 9 form fields headed "READY TO GROW?", rechecked 15:37 UTC
About Us, Careers and Blog link nowhere, https://lebretons.co.uk/ footer anchors "About Us", "Careers", "Blog" have href #, clicked, the page jumps to the top, rechecked 15:37 UTC
the 32+ brands behind your numbers, https://lebretons.co.uk/ "32+ Brands we've assisted across the globe"
one case study and one testimonial, https://lebretons.co.uk/ section id work holds one case "AUTOMOTIVE 3.12x increase in qualified leads", the testimonial carousel holds Nick Fisher, CEO, Max PPF & Detailing, and "View more testimonials" is href #contact
before you ask for their details, https://lebretons.co.uk/ the contact section asks first name, last name, company, country, contact number, email and goal
selling a free strategy call off the numbers at the top of your page, https://lebretons.co.uk/ "Free 30-minute strategy call" in the hero, with the four figures, brands, value added, ad spend and ROI, directly under it
we spoke in August, the lemlist inbox thread with https://www.linkedin.com/in/timur-teregulov (ctc_YLmRL36CPuodKLwNX), his reply 2026-08-10 and ours 2026-08-11
recheck: 2026-10-03 15:37 UTC, the page rendered again, #contact confirmed as the form section, #work confirmed as the one case, control example.com 200. Thesis confidence MEDIUM, the dead proof links are proven by clicking, that it loses calls is inference he can test against his own form numbers
```

### Timur, OPENER

```
Hi Timur, saw LeBretons again since we spoke in August, looks interesting!

However, your "View all case studies" button jumps to the contact form, and About Us, Careers and Blog link nowhere. This causes a founder checking the 32+ brands behind your numbers to find one case study and one testimonial before you ask for their details.

Especially, when you are selling a free strategy call off the numbers at the top of your page, the proof a buyer can't open costs you the calls they don't book.

I run Astra agency. We build websites for brands like Unilever, AXA, Pertamina. I built a food brand from zero with my family, so I know how much a buyer leans on proof before they'll talk to you.

Shall I send you over what the case studies page looks like?
```

---

## Closed

```sweep
lead: Mushtaq Taher, Chief Executive Officer and Founder of RentX Rewards per lemlist search_contacts, ctc_a5ZNoyKHLFEhjudiu. Google Play lists the developer as RentX Rewards Limited with mushtaq.taher@rentxrewards.com and +44 7717 615544. A Bangladesh rent payment and rewards app. Thread pulled today, 1 item, our 30 Jul connect note
website: 180 URLs of https://rentxrewards.com crawled twice, rendered in Chromium and through tools/render-via-curl.js because site-audit.js said RENDER NOT TRUSTED. Real and complete, 340 named brands, priced tiers, FAQ, tenant, landlord, shopper and merchant pages. Two real bugs, https://rentxrewards.com/en/contact and /bn/contact give both helplines as zero runs, "+880 1700-000000" and "+880 9600-000000", while Play gives +44 7717 615544, and https://rentxrewards.com/en/merchant-network says "8500+ Partner Brands 8500+ Categories 8500+ Partner Outlets" where /bn/merchant-network says 160+ brands and 25 categories. Both are edits for the incumbent agency, https://digitomark.com/portfolio/rentx (Brand Identity, Web Development), fails the tweak test
gdpr: tools/eu-view.py from Stockholm on https://rentxrewards.com , 0 cookies before a click, final URL /bn, no banner found per site-audit.js with its control, nothing to set against a Bangladesh audience
apps: the platform app was built by https://dcastalia.com/case-studies/rentx-rewards-platform-app (completed 2024), Play data shows 278 installs, shown as 100+, updated 11 Aug 2026, an incumbent builder on the product
social: tools/social-audit.js on the accounts in https://rentxrewards.com 's HTML, Facebook rentxrewards 15,541 followers, Instagram rentxrewards 1,108 followers, 179 posts, latest 2026-09-29, YouTube @RentXRewards 2 subscribers and 18 videos, LinkedIn rentx-rewards UNKNOWN. The audience is on Facebook and Instagram, YouTube is unused, not the costliest pain
squad: two Dhaka agencies already build the site and the app per https://digitomark.com/portfolio/rentx and https://dcastalia.com/case-studies/rentx-rewards-platform-app , we'd be a third and dearer supplier
verdict: NO_STRONG_ANGLE. The costliest pain is installs against followers, owned by an agency he already uses. A short heads up about the zero helplines is a favour Raka can choose to send, not a pitch
```

```sweep
lead: Orion Dai Yuhui, co-founder and CEO of Omnilabs Research Ltd (16176116, per its privacy policy), ctc_JiMGgwH639YbSSZfE. Thread pulled today, 1 item, our 29 Jul connect note
website: https://omnilabs-research.com/ is a one page Webflow site, crawled twice (1 URL each), rendered and every anchor listed. Mission, the Omnihuman glove for stroke tele-rehabilitation with music, XR and assistive robotics, two founders (Orion, designer, Lucie Legrandois, CTO, mechanical and materials), London Makerversity and Singapore, a contact form and "Book a Call" for clinical trial interest. Clear for its stage
gdpr: tools/eu-view.py from Stockholm on https://omnilabs-research.com , one first party Cloudflare cookie _cfuvid and Webflow CDN only, a UK GDPR privacy policy on the page, clean
apps: the trial interest form on https://omnilabs-research.com/ is name, email and message, a screening form is possible, but per https://digitalhealth.london/radiant-cersi-innovator-support-programme-omnilabs-research-accelerates-regulatory-roadmap-through-expert-led-support (10 Nov 2025) their next steps are "designing and running a clinical evaluation", "finalising their QMS" and "applying for CE marking", trial sites recruit through clinical partners, not a web form
social: tools/social-audit.js on https://www.instagram.com/omnilabsresearch/ 58 followers, 7 posts, latest 2026-05-29, dormant, and https://www.linkedin.com/company/omnilabs-research/ 490 followers, a research stage medtech, not where their buyers are
squad: the product needs SaMD software (the DigitalHealth.London piece names AI in digital medical devices and SaMD regulation) and the founders are a designer and a mechanical engineer per https://omnilabs-research.com/ , but medical device software under a QMS is a credential we don't hold
verdict: NO_STRONG_ANGLE. Their costliest pains are regulatory, and none of them is ours
```

```sweep
lead: Muhammad Sarim Shehzad, sole director and 75%+ PSC of FLOCHITECT LTD (Companies House 17011927, incorporated 4 Feb 2026), ctc_Exg3BgqLrnRB727Lh. Thread pulled today, 2 items, his "What business are you in?" 8 Sep and our 10 Sep answer asking whether he niches, no reply
website: https://flochitect.com/ crawled twice (6 URLs each) and rendered past the host's bot check page (5.7 KB "noindex, nofollow" refresh page over curl, the real page in Chromium), a bought Astra theme on WordPress with Elementor, home, about, services, contact, no clients, cases or team named, Brighton per the about page. Thin but honest for a company eight months old
gdpr: tools/eu-view.py from Stockholm on https://flochitect.com , 3 cookies before a click including _ga and _ga_9TPNWWT8YQ with a CookieYes banner showing, Google Analytics before consent, real under GDPR and PECR, a settings change and a favour, fails the pay test
apps: he sells workflow automation, CRM and AI workflows himself per https://flochitect.com/services/ , nothing to sell him
social: tools/social-audit.js has nothing to open, the rendered anchors on https://flochitect.com/ include no social account, control Omnilabs' social anchors through the same script
squad: a peer agency, the Build Squad family applies, but https://flochitect.com/ names no client, no project, no team and no delivery time, one director on the register, no capacity fact to write a squad message on
verdict: NO_STRONG_ANGLE. A competitor with no capacity evidence yet. The GA before consent is worth mentioning if he replies
```

```sweep
lead: Ramar Nadar, founder of RentyFind, ctc_2iNgGwkzexwdG6wWP. Thread pulled today, 2 items, his "Thanks Raka" 9 Sep and our 10 Sep question whether he's full time on it, no reply
website: https://rentyfind.com/ crawled twice (19 URLs each), a Next.js AI rental search with login, register and a chat, the homepage shows demo matches (The Kensington Residences, New Town Court), site-audit.js said RENDER NOT TRUSTED so no visual claim is made. Pre revenue product, no customers shown
gdpr: tools/eu-view.py from Stockholm on https://rentyfind.com , no banner found per site-audit.js with its control, 4 cookies including _ga and 16 third party requests to 9 hosts including Microsoft Clarity and stats.g.doubleclick.net before a click, a real consent gap and a free tip for a solo founder
apps: the product is the app, https://rentyfind.com/chat , he builds it himself, nothing to sell
social: tools/social-audit.js on the accounts in https://rentyfind.com 's HTML, https://x.com/rentyfind "The user profile you're looking for could not be found" (control x.com/lemlist read in the same run), Instagram 16 followers, latest post 2026-07-04 (91 days), LinkedIn page 1 employee, Facebook UNKNOWN
squad: a solo pre revenue founder per https://www.linkedin.com/company/rentyfind (1 employee), no budget evidence
verdict: NO_STRONG_ANGLE. The dead X link and the pre consent tracking are favours if he answers our question
```

```sweep
lead: Fabien Llobell, founder of SensElevation, ctc_uLQxDjpkFxz6DD7hJ. Thread pulled today, 2 items, his "Thanks Raka!" 31 Aug and our question the same day, consulting or software, no reply
website: https://www.senselevation.com crawled twice (22 URLs each), Wix, English and French, events (a free webinar on 30 Sep 2026), two free apps (Sensory & Preference Studio, Product Similarity Studio), services, how he works. Three pages returned 429, ours, the French legal notice read instead. site-audit.js warned content may be hidden, so no emptiness claim. Specialist and current
gdpr: tools/eu-view.py from Stockholm on https://senselevation.com , 7 first party Wix session cookies and Wix CDN only, no tracker, nothing to say
apps: he builds his own analytical software and gives it away per https://www.senselevation.com/sensory-preference-studio , he's the builder
social: tools/social-audit.js on https://www.linkedin.com/company/senselevation , UNKNOWN, could not read, the only account in the site's HTML
squad: a solo statistician who builds his own apps per https://www.senselevation.com/how-i-work-page , no team, no capacity fact
verdict: NO_STRONG_ANGLE
```

```sweep
lead: Yoeri Sanstra, Sanstra Supply Chain Advisory, interim supply chain and operations leader, ctc_MtGBXP6wEwP95GWdy. Thread pulled today, 4 items, the last his 4 Sep "Interim project mgt while helping out with scm challenges" and our 5 Sep question about the SCM challenge, no reply
website: https://yoerisan.com/ crawled twice (10 URLs each), Kadence theme, expertise, three representative cases, contact, 25+ years, a personal positioning site that does its job, one dead case link, the homepage links /representative-cases/planning-maturity/ and it returns 404 (rechecked by curl 15:40 UTC), a five minute fix
gdpr: tools/eu-view.py from Stockholm on https://yoerisan.com , 0 cookies before a click, clean
apps: he works from an interim seat inside a client per his 4 Sep message in the thread and https://yoerisan.com/ "Available for interim assignments", so the systems he untangles belong to the client, not to him, nothing to sell him
social: tools/social-audit.js on https://www.linkedin.com/company/sanstra-supply-chain-advisory UNKNOWN, and his personal profile /in/yoerisan/ 999, the two accounts in the site's HTML
squad: a one person interim practice per https://yoerisan.com/ , nothing to build a squad message on
verdict: NO_STRONG_ANGLE. If he ever names the SCM challenge on his current assignment, that's a referral conversation, not a pitch
```
