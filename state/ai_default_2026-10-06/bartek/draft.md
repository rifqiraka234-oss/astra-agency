# Bartek Ogonowski, LEVRA, judged and drafted 2026-10-06

Simple style per Raka 2026-10-06 ("just go like AI workflow"). Nothing sent.

## Pain table

| # | Family | Fact and URL | What it costs him | Pay | Tweak | Would he name it | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | Apps (A, back office) | Pricing is "tailored to your organisation's needs. Contact us for a customised quote" (https://www.levra.me/faqs), co created modules per client (https://www.levra.me/our-solution), seven people on https://www.levra.me/about-us , target of 7,625 users and a first government contract (https://www.legalfutures.co.uk/latest-news/female-legal-innovators-land-75000-each) | Every new deal waits on a quote and proposal built per client, which caps how many deals seven people close on the way to the revenue target | yes, default for A | yes, a workflow not a page | yes, founders who sell enterprise talk about proposal load | CHOSEN, costliest |
| 2 | Apps (A) | First government contract wanted, same Legal Futures article | Public bids are document heavy for a small team | yes | yes | yes | folded into 1 as block three, it is the same quote and bid load getting bigger |
| 3 | Website (B) | Site says "soft skills training for Gen Z" (homepage meta) and "for young people" (FAQ), 0 pages for public sector buyers per researcher grep with a Google control | A government buyer finds a site written for corporate L&D | partly | NO, in house Webflow published 29 Sep 2026, one page is an afternoon | unlikely, and young people is what government buys | loses, tweak test, and the government goal rests on one source |
| 4 | Website | Proof scattered, Milbank and others with no case study, news list leads with May 2025 | Weaker diligence read | no | no | no | favour |
| 5 | Website | Case study logo links to /old-home 404, two quote forms with different tiers | Small | no | no | no | proof only |
| 6 | GDPR | GA cookies set before consent for a Stockholm visitor, no Reject on first layer (tools/eu-view.py) | Trust risk with buyers who run vendor checks | no alone | no, script order is an afternoon | no | proof at most, never the pitch |
| 7 | Social | LinkedIn 3,611 followers, weekly posts | none | no | n/a | no | no pain |
| 8 | Build Squad | CTO and Head of Product in house, no vacancies, no partner page | none shown | no | n/a | no | not chosen |
| 9 | Personal (C) | 2023 interview "Time is your most valuable resource" | Founder time on talks and follow ups | maybe | yes | maybe | loses, evidence is three years old and personal angle is weaker than a live company process |

Why 1 wins. It is the only pain that is both on his own site today (custom quote for every organisation, bespoke modules) and growing with the goal he's published (7,625 users, first government contract). B fails the tweak test because his team ships the Webflow site themselves. GDPR and the 404s are afternoon fixes. AI is pitched only as a back office workflow, never as training, since LEVRA sells AI simulations.

## Falsification

Opened to disprove pain 1, 2026-10-06 about 14:15 UTC. https://www.levra.me/faqs still says "Contact us for a customised quote", so there is no self serve price list. https://www.levra.me/our-solution lists four tiers with no prices and offers co created modules. https://www.levra.me/contact is an 8 field form with no calendar or quote tool. No CRM, proposal or bid tool is named on any of the 33 crawled pages (researcher crawl, twice). What could still break it, they sell AI and have a CTO, so they may already draft proposals with AI internally. That can't be seen from outside, which is why confidence is MEDIUM, and the message names the quote load, never that they lack a tool.

### Bartek Ogonowski, LEVRA, ctc_3fSkB4dv38ScfzXkH

```gate
lead: Bartek Ogonowski, Co-Founder and CEO of LEVRA (LEVRA LIMITED 14378761, active, incorporated 27 Sep 2022), ctc_3fSkB4dv38ScfzXkH, leadId lea_SoDNEmLZ3cyjSE7Hw. Companies House PSC reopened 2026-10-06 via tools/fetch-walled.py, Mr Bartek Ogonowski active, more than 25% but not more than 50% of shares and votes plus the right to appoint directors, Emily Clare Gill the same. https://www.levra.me/about-us names him Co-Founder and CEO. Thread re-pulled 2026-10-06 about 14:12 UTC, 0 activities, nextPage null, sentOnly search for his name returns only our 2026-10-06 05:17 connect note, lastRepliedAt null, myConversations search LEVRA 0, positive control ctc_JYWKs8LSRDxAreesA returned 10 items in the same minute. No state file row for the name, contactId or leadId
site pass 1: 33 unique pages (133 URLs with duplicates), tools/crawl.py https://levra.me with sitemaps, every page text read, 2026-10-06
site pass 2: 33 unique pages, second full crawl equal to pass 1, site-audit.js render trusted with desktop and phone screenshots of home, plus full page desktop, about, case study, contact and our solution opened, no overflow at 390 on 5 pages
deep analysis: A modern dark Webflow site selling human skills training to employers, a psychometric framework plus AI simulations. Every sale runs through a custom quote, "per user, per module ... Contact us for a customised quote" on the FAQ, four named tiers with no prices, co created modules taking about a month, and two quote forms. Proof is logos, stats and six case studies. Team page shows seven people. No CRM, booking or proposal tool visible. The site speaks to corporate L&D and Gen Z trainees, nothing for public sector buyers
owner linkedin: route 1 curl https://www.linkedin.com/in/bartekogonowski/ 999. Route 2 search "LEVRA human skills Bartek Ogonowski 2026" result title "Bartek Ogonowski - LEVRA". Route 3 search linkedin.com/posts bartekogonowski LEVRA, no personal posts surfaced. Route 4 Tracxn team list calls him Co-Founder and Co-CEO, site wins. Route 5 company page posts via WebFetch, report launch, Innovate UK award, interns. Route 6 his own words, the 10 May 2023 levra.me interview, an Onrec quote 21 May 2025, Medium spotlight walled 403, YouTube captcha
contact linkedin: same person as the owner, confirmed by Companies House PSC, lemlist jobTitle "Co-Founder and CEO" and https://www.levra.me/about-us , the same six routes as above
google news: tools/news.py en, company LEVRA 43 results all unrelated Levra, person "Bartek Ogonowski" 2 unrelated, control Tesco 102
regional news: tools/news.py (London) edtech soft skills, 4 results, none on LEVRA. Legal Futures 10 Aug 2026 opened at source and reopened 2026-10-06
industry news: tools/news.py edtech soft skills training, 55 results generic (EdTech Magazine 2026-02-20 on VR and AI for soft skills), plus Onrec trade press opened at source
sources:
1. https://www.levra.me/
2. https://www.levra.me/faqs
3. https://www.levra.me/our-solution
4. https://www.levra.me/contact
5. https://www.levra.me/about-us
6. https://www.levra.me/case-studies
7. https://find-and-update.company-information.service.gov.uk/company/14378761
8. https://find-and-update.company-information.service.gov.uk/company/14378761/persons-with-significant-control
9. https://find-and-update.company-information.service.gov.uk/company/17002855
10. https://www.legalfutures.co.uk/latest-news/female-legal-innovators-land-75000-each
11. https://www.onrec.com/news/news-archive/gen-z-in-the-workplace-late-to-the-office-questioning-hierarchy-and-hungry-for
12. https://www.linkedin.com/company/levra/
13. https://tracxn.com/d/companies/levra/__PjQJ5HcvbL2BZKrJYHf__678Wnrl7Nhi6gVjLsYaLNQ
14. https://webbkoll.5july.net (tools/eu-view.py)
15. https://www.top35-under-35.saicaevents.co.za/wp/dt_team/bartek-ogonowski/
16. https://news.google.com/rss (tools/news.py, company, person, region, industry, control)
17. https://www.linkedin.com/in/bartekogonowski/ (999, walled)
pains: 9 judged. (1) a custom quote for every organisation and bespoke modules on a team of seven, chosen. (2) the first government contract, heavier bids, folded into (1) as block three. (3) site written for Gen Z trainees and corporate L&D with nothing for government buyers, fails the tweak test on an in house Webflow site. (4) scattered proof, a favour. (5) case study logo to a 404 and two mismatched quote forms, proof only. (6) GA before consent and no first layer reject, proof only. (7) social healthy. (8) Build Squad, in house CTO, no capacity fact. (9) personal founder time, 2023 evidence only
chosen: (1), the costliest, because every deal LEVRA closes runs through a quote built per organisation, and the published target of 7,625 users plus a first government contract multiplies that work on seven people, a workflow fix rather than an afternoon's page edit
sweep website: https://www.levra.me/ modern Webflow published 29 Sep 2026, render trusted, built for Gen Z trainees and corporate L&D, no public sector page, case study logo links to a 404, in house team ships it so a page is a tweak, not chosen
sweep gdpr: tools/eu-view.py from Stockholm on https://www.levra.me found _ga and _ga_VMS5NTJ0QG before any click, Cookiebot loads after the Google tag, no Reject on the first layer, real but an afternoon fix, proof only
sweep apps: https://www.levra.me/faqs "Contact us for a customised quote" per user per module, co created modules on https://www.levra.me/our-solution , seven people on https://www.levra.me/about-us , AI only as a back office workflow since they sell AI simulations, CHOSEN
sweep social: tools/social-audit.js on https://www.linkedin.com/company/levra/ read 3,611 followers, Professional Training and Coaching London, weekly posts up to the 2026 report launch about a week ago, no other channels linked, no pain
sweep squad: https://www.levra.me/about-us lists a CTO and a Head of Product in house, careers page has no vacancies, no partner or outsourcing page, no capacity fact to name, not chosen
thread: problem a custom quote for every organisation, and seven people on the team page | cost each new deal needs its own quote and paperwork, hours taken from selling, and a government bid makes that paperwork heavier | offer see block five | link quote
lead read: Bartek reads that every organisation gets its own custom quote and his team page lists seven people, so each deal carries its own quote and paperwork that eats selling hours, that a first government contract makes that paperwork heavier, and gets offered the AI workflow for LEVRA's quotes and bids, one thread
claims:
your pricing is a custom quote for every organisation, https://www.levra.me/faqs "Our pricing follows a per-user, per-module model and is tailored to your organisation's needs. Contact us for a customised quote.", reopened 2026-10-06 14:15 UTC
your team page lists seven people, https://www.levra.me/about-us Bartek Ogonowski, Emily Gill, Margaret Curtayne, Abu Salim, Jaewon Han, Vivian Full, Gerianne de Klerk, reopened 2026-10-06 14:15 UTC
the deals you need to grow (inference, the growth target is), https://www.legalfutures.co.uk/latest-news/female-legal-innovators-land-75000-each "LEVRA is targeting £1.6m in revenue and 7,625 users by its 2027 financial year", reopened 2026-10-06 14:15 UTC, the figure is not in the message
going after your first government contract, https://www.legalfutures.co.uk/latest-news/female-legal-innovators-land-75000-each "and is looking for its first government contract", 10 Aug 2026, reopened 2026-10-06 14:15 UTC
Raka set up automated sales workflows at Betty Blocks, https://www.linkedin.com/in/raka-mulya-b92885196 Global GTM and Campaign Manager Aug 2024 to Feb 2026, automation driven revenue workflows, per docs/astra-master-context.md 2A, wording as approved in state/drafted_2026-10-06-simple.md
recheck: 2026-10-06 14:15 UTC, FAQ, about, our solution, contact and Legal Futures refetched with curl and read, Companies House PSC refetched with tools/fetch-walled.py, thread re-pulled with control. Red team 2026-10-06 about 14:40 UTC reopened FAQ, about, our solution, careers, sitemap and Legal Futures by curl, thread re-pulled (0 items), and removed three overreaches, see redteam.md. Thesis confidence MEDIUM, the custom quote, the team of seven and the government goal are proven at source, that quotes are put together by hand is inference, and an AI company may already draft proposals with AI internally
```

OPENER
```
Hi Bartek, saw LEVRA, looks interesting!

However, your pricing is a custom quote for every organisation, and your team page lists seven people. This causes each new deal to need its own quote and paperwork, which takes hours you'd rather spend selling to the next client.

Especially, when you are going after your first government contract, the paperwork behind every bid gets heavier, and those hours add up fast.

I run Astra agency. We build AI workflows for brands like Unilever, AXA, Pertamina. I set up automated sales workflows at Betty Blocks, so I know which work a machine can take off a small team.

Shall I send you over what the AI workflow for LEVRA's quotes and bids looks like?
```
