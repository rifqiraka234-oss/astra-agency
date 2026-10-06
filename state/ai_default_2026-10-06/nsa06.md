<!-- NO DRAFTS -->

# nsa06, AI default angle pass, 2026-10-06

Eight leads, no drafts. Four aren't owners, one is a crypto token sale, and the three owners who did talk
to us build their own software or AI, or are job hunting.

## What was run

- **Threads.** get_inbox_conversation on all eight contactIds, one page each, nextPage null on all eight.
  Four came back empty (Louis-Guillaume, Morten, Maïlys, Anna). Positive control in the same minute,
  Yoeri's thread (4 items) and Aashir's (3 items) came back full. A sentOnly search on Morten's name
  shows our connect note of 2026-09-27 14:13 UTC as last sent and lastRepliedAt null, which is the
  known case of the connect note not being written as an activity.
- **Queue and drafts.** state/silent_accepted_queue.jsonl grepped per contactId (4, 1, 1, 1, 2, 4, 4, 4
  rows). state/drafted_*.md grepped too. Every latest row is NO_STRONG_ANGLE. Nobody has a SENT row, an
  openerText or a DO_NOT_CONTACT row.
- **lemlist records.** GET /api/contacts per contact for the four with no leadId on the queue, which gave
  the leadIds lea_3FGdzJhGbCQ2y7QJv, lea_ygWfhAuKfnQfdnAgq, lea_eHbwtrW9vDyNSHaRh and lea_5XeiyA3Rz9hN7MQQA.
  search_campaign_leads by id for Morten, Aashir, Fabien, Yoeri and Ramar. GET /api/companies on Morten's
  companyId.
- **Registers.** recherche-entreprises for HALLOWEEN 390045219, PHYGITAL 829094127, CAPITOLE 829120666,
  CASTILLON 829041003, COPTIS 423056589, C & P SOFTWARE 900814989 and SENSELEVATION 999672124. Companies
  House for Morten's three officer records and for RENTYFIND LTD 17323420 (officers and PSC).
- **Sites.** tools/crawl.py on senselevation.com (21 pages), yoerisan.com (10) and rentyfind.com (19), and
  the crystex.app shell plus its JS bundle. tools/eu-view.py on all four. tools/social-audit.js on every
  account in those sites' HTML, with x.com/lemlist as the control, which read fine. tools/news.py on the
  four owners, and the control came back full each time (Carrefour 98, Heineken 100, Tesco 100, Tesco 100).
- **Walled.** The Wayback CDX failed for every domain, and halloween.fr failed as the control in the same
  minute (proxy ws_closed_mid_exchange). That's on our side and says nothing about their sites. erhvervplus.dk
  returned 503.

---

## Louis-Guillaume Dupond, Halloween Agency, ctc_jWvuZEPkGERkzwxvQ

- Thread, 0 activities, nextPage null (control Yoeri full, same minute). Queue, 4 rows, the latest from
  2026-10-03 says CLOSED_NOT_ICP, salaried DG. We've never sent anything beyond the connect note.
- lemlist (GET /api/contacts/ctc_jWvuZEPkGERkzwxvQ, lead lea_3FGdzJhGbCQ2y7QJv) gives jobTitle "Directeur
  Général" and tagline "Directeur Général chez Halloween Agency".
- Register, reopened today. HALLOWEEN 390045219 has PHYGITAL 829094127 as Président de SAS. PHYGITAL's
  Président is CAPITOLE 829120666, with Jean-Louis Roche as its Directeur Général. CAPITOLE's Président is
  CASTILLON 829041003, and CASTILLON's Président is Jean-Louis Roche. Louis-Guillaume isn't a dirigeant on
  the register at any of the four levels.

**Verdict, CLOSED_NOT_ICP.** He's a salaried DG. Jean-Louis Roche owns the business through CASTILLON,
CAPITOLE and PHYGITAL (https://recherche-entreprises.api.gouv.fr/search?q=390045219 , ?q=829094127 ,
?q=829120666 , ?q=829041003).

## Morten Majdall Petersen, "." (no company), ctc_NkjMjR2Ak5jsePGqq

- Thread, 0 activities, nextPage null. The sentOnly search shows our connect note of 2026-09-27 as last
  sent and lastRepliedAt null. Queue, 1 row, NO_STRONG_ANGLE 2026-09-27. We've never sent anything beyond
  the connect note.
- **The "." resolved.** It isn't a parsing error. The lemlist company cpn_n3JmAB7EqHGBaMixe is literally
  named "." (source coreSignal, 1 contact, no domain, no other fields). The lead lea_ygWfhAuKfnQfdnAgq gives
  jobTitle "Investor in sports technology and sports media", tagline "Sportradar co-founder | Investor in
  sports technology and sports media", location Stony Stratford, Milton Keynes. So there's no company on
  the record because he doesn't run one.
- Registers and news, reopened today. Companies House has **three** officer records under his name, not the
  one the 27 Sep row says, all with date of birth July 1972 and all resigned. Sportradar UK Limited 06891580,
  director 29 Apr 2009 to 5 Oct 2012. Global Sports Statistics Limited 07647040 (dissolved), 21 Jan 2016 to
  9 Jan 2019. TransferRoom Ltd 10380336, 25 Oct 2021 to 1 Aug 2023. He has no active appointment.
  https://www.aarhus-fremad.dk/meddelelse-om-ejerskab/ (28 May 2026) says he sold his shares in Aarhus
  Fremad Fodbold ApS. A search result (unopened, the 503 page) puts him above 5% in AaB A/S, which is a
  passive stake in a listed football club.

**Verdict, CLOSED_NOT_ICP.** He's an investor and ex founder with no operating business. Every directorship
is resigned (https://find-and-update.company-information.service.gov.uk/officers/1pbqm8o6S7HuayVXoTxccFYXd0k/appointments ,
/officers/_3EmcGaPhg5mjRIoBivOmcWA9L4/appointments , /officers/KW3MQBuwmtSonhoTA2b8a8-KQEM/appointments).
Fix for the queue: three resigned appointments, not one.

## Maïlys Benoist, Coptis, ctc_E37YyzSkkbsXLvJjK

- Thread, 0 activities, nextPage null. Queue, 1 row, NO_STRONG_ANGLE 2026-09-27, "Product Owner, not the
  buyer". We've never sent anything beyond the connect note.
- lemlist (GET /api/contacts, lead lea_eHbwtrW9vDyNSHaRh) gives jobTitle "Product Owner" and tagline
  "Product Owner".
- Register, reopened today. COPTIS 423056589 has C & P SOFTWARE 900814989 as Président de SAS, and C & P
  SOFTWARE's Président is Roland Louis Jean Marie de Heere.

**Verdict, CLOSED_NOT_ICP.** She's an employee. Roland de Heere runs Coptis through C & P Software
(https://recherche-entreprises.api.gouv.fr/search?q=423056589 , ?q=900814989).

## Anna Oblakova, YTEC, ctc_4Qr67v5Nqw86zpGXd

- Thread, 0 activities, nextPage null. Queue, 1 row, NO_STRONG_ANGLE 2026-09-27, "Product Owner, not the
  owner". We've never sent anything beyond the connect note.
- lemlist (GET /api/contacts, lead lea_5XeiyA3Rz9hN7MQQA) gives jobTitle "Product Owner" and tagline
  "Creative problem solver in the role of Product Owner by YTEC", Groningen.
- I didn't go to the register. Her own tagline says she holds a role at YTEC, so there was nothing in doubt.
  A northdata search for YTEC came back as a search page with no company entity, so it's walled for that
  query, not empty.

**Verdict, CLOSED_NOT_ICP.** She's an employee at a software agency. If Raka wants YTEC as a Build Squad
lead, the person to connect with is the director.

## Aashir Qureshi, Oranjelo / Crystex, ctc_2kkM6yFpTdYoG2YhW

- **HE REPLIED, AND WE SENT A MESSAGE BEYOND THE CONNECT NOTE.** Thread, 3 items, nextPage null.
  2026-07-28 06:35 OUT, the connect note "Hi Aashir, saw your business and thought it was cool 😀 I'm a
  business owner too! Would love to connect and share ideas! ☺️". 2026-07-28 06:36 IN, "It's a pleasure to
  connect". 2026-08-11 15:21 OUT, "Great to connect Aashir! Sounds like you have a lot going on between
  Oranjelo and the startup advisory side. Would love to hear more about what you are focused on building
  right now." No reply since. There's no pitch and no promise in the thread, so anything next would be a NUDGE.
- Queue, 2 rows. CHAT_ONLY_NO_PITCH, then NO_STRONG_ANGLE 2026-09-28 (oranjelo.com NXDOMAIN, Crystex a
  token sale). lemlist (lea_Rh5NiddPqmZR8Hyhk) gives jobTitle "Founder", tagline "Founder | Angel Investor |
  Startup Growth Hacker", Dubai, experience1 "Founder and Interim CEO @Crystex", experience5 "Founder and
  CEO @Oranjelo".
- He passes the owner rule for Crystex. On angle B, Crystex isn't a business we should pitch. Angle A is
  empty.

```sweep
lead: Aashir Qureshi, Founder and Interim CEO of Crystex per the lemlist record lea_Rh5NiddPqmZR8Hyhk and the Team Members block on https://topicolist.com/crystex , ctc_2kkM6yFpTdYoG2YhW. Oranjelo is gone, https://dns.google/resolve?name=oranjelo.com returns Status 3 NXDOMAIN while example.com resolved in the same minute
website: https://crystex.app/ answers 200 today, a React launchpad titled "Crystex Launchpad | Utility-First Launches on Ethereum". The raw listing on https://topicolist.com/crystex says "Crystex (CRYSTX) ICO Token Sale", Arbitrum, UAE, soft cap 60,000,000 USD, "KYC Not required", "Restricted countries None". A token sale with no KYC isn't a site Astra should put its name to, and the angle B growth evidence is a fundraise in tokens, not a market
gdpr: tools/eu-view.py from Stockholm on https://crystex.app , 0 cookies before a click, 8 requests to 3 hosts (Google Fonts, img.youtube.com), PostHog proxied through /ingest in the HTML, nothing to set against him
apps: the product is itself software, a launchpad the JS bundle at https://crystex.app/assets/index-2J6djLvI.js describes with audited smart contracts, a talk to team flow and founder onboarding, built and run by the Crystex team, so there's no manual job of his for an AI workflow to take
social: tools/social-audit.js on the accounts in the crystex.app bundle, https://twitter.com/crystexapp "could not be found", https://x.com/Crystexdapp bio "Making startup fundraising easier", Instagram crystex_dapp 1,276 followers, 115 posts, latest 2025-12-10 (300 days), LinkedIn crystex 413 followers and 4 employees, control x.com/lemlist read
squad: LinkedIn shows 4 employees per tools/social-audit.js on https://www.linkedin.com/company/crystex , no jobs or delivery facts on https://crystex.app/ , and a no KYC token raise is a reputational risk to Astra whatever the capacity
verdict: NO_STRONG_ANGLE, NO_SIGNAL. Oranjelo's domain has lapsed and Crystex is a no KYC token sale. Raka's call, but I'd leave it
```

**Verdict, NO_SIGNAL.**

## Fabien Llobell, SensElevation, ctc_uLQxDjpkFxz6DD7hJ

- **HE REPLIED, AND WE SENT A MESSAGE BEYOND THE CONNECT NOTE.** Thread, 2 items, nextPage null.
  2026-08-31 11:00 IN, "Thanks Raka!". 2026-08-31 13:15 OUT, "Anytime Fabien! Sensory data analysis is a
  niche I do not bump into often, sounds like genuinely specialist work. There might actually be some
  overlap, on my side I run an agency that builds websites, tools and AI automations for businesses. What
  are you focused on at SensElevation right now, the consulting side or the software?" No reply since. That
  already named our AI automation offer, and he didn't answer it.
- Queue, 4 rows, the latest NO_STRONG_ANGLE 2026-10-03, "solo statistician who builds and gives away his
  own apps". lemlist (lea_nTS5SKpmziwJi6Cf7) gives jobTitle "Founder – Consulting, Training and Software
  Development in Sensory Data Analysis", companyType Self-Employed.
- Owner confirmed. SENSELEVATION 999672124 was created 2026-01-19, and the register names Fabien Llobell
  as Président de SAS. https://www.senselevation.com/legal-notice says SASU, 1,000 euros share capital.

```sweep
lead: Fabien Llobell, Président of SENSELEVATION SASU 999672124 (created 2026-01-19, https://recherche-entreprises.api.gouv.fr/search?q=999672124 ), ctc_uLQxDjpkFxz6DD7hJ, thread 2 items, his thanks and our 31 Aug question that already offered AI automations, no reply
website: tools/crawl.py read 21 pages of https://www.senselevation.com , all 200, English and French, two free apps, past webinars on 2 Sep and 30 Sep 2026, a training catalogue form, how I work and legal notice. Angle B, the company is nine months old and the site already serves where he's going (apps, webinars, training) in both languages, so there's no growth gap to sell against
gdpr: tools/eu-view.py from Stockholm on https://senselevation.com , 7 first party Wix session cookies (svSession, XSRF-TOKEN, __cf_bm and others) and Wix and Sentry hosts only, no tracker, nothing to raise
apps: angle A, the one hand made job on his own pages is per mission proposals, https://www.senselevation.com/how-i-work-page "Custom Proposal I prepare a clear intervention framework", but he's a solo consultant with no volume claim anywhere in the crawl, and the same page sells "Software solutions development" with code delivered in R, so he builds tools himself. Disproved
social: tools/social-audit.js on https://www.linkedin.com/company/senselevation , the only account in the site's HTML, read, "View 1 employee", follower count not shown, control x.com/lemlist read
squad: one employee per tools/social-audit.js on LinkedIn and a SASU with 1,000 euros capital per https://www.senselevation.com/legal-notice , no capacity fact, and he builds his own software
verdict: NO_STRONG_ANGLE, NO_SIGNAL. He builds his own analytical apps, has no volume to automate, and his nine month old site already fits where he's going
```

**Verdict, NO_SIGNAL.** tools/news.py found 0 results for the company and 0 for the person, with Carrefour
98 as the control.

## Yoeri Sanstra, Sanstra Supply Chain Advisory, ctc_MtGBXP6wEwP95GWdy

- **HE REPLIED TWICE, AND WE SENT TWO MESSAGES BEYOND THE CONNECT NOTE.** Thread, 4 items, nextPage null.
  2026-09-04 12:53 IN, "Nice history you have how's the business going?". 2026-09-04 17:36 OUT, our two
  businesses and "What's the focus for you now, the advisory or the interim side?". 2026-09-04 19:58 IN,
  "It's currently a conbination. Interim project mgt while helping out with scm challenges." 2026-09-05
  08:33 OUT, "...That is the part we build out, the automation between the disconnected systems... What is
  the SCM challenge on the current one?" No reply since. We've already offered automation.
- Queue, 4 rows, the latest NO_STRONG_ANGLE 2026-10-03. lemlist (lea_52ZbG7woJiwcuZjAJ) gives jobTitle
  "Founder | Supply Chain Consultant & Interim Manager", companyType Self-Employed, and his summary says
  **"I am actively exploring my next leadership role. If you see a potential fit or know an opportunity, I
  would appreciate the introduction."**
- He's the owner of a one person practice. The footer on https://yoerisan.com/contact/ reads "© 2026
  Sanstra Supply Chain Advisory | KvK 42051027".

```sweep
lead: Yoeri Sanstra, sole owner of Sanstra Supply Chain Advisory (KvK 42051027 per the footer of https://yoerisan.com/contact/ ), ctc_MtGBXP6wEwP95GWdy, thread 4 items, the last our 5 Sep question about his SCM challenge, which had already offered automation, no reply
website: tools/crawl.py read 10 URLs of https://yoerisan.com , 8 at 200, one xmlrpc at 403 and /representative-cases/planning-maturity/ at 404 (a five minute fix). Expertise, three cases and a name and email form. Angle B, the lemlist summary says he's "actively exploring my next leadership role", so where he's heading is a job, not a bigger firm, and the site isn't holding back any growth
gdpr: tools/eu-view.py from Stockholm on https://yoerisan.com , 0 cookies before a click, clean, and https://yoerisan.com/privacy-policy-2/ exists and names him as controller
apps: angle A, he sells his own time inside clients per his 4 Sep message in the thread ("Interim project mgt while helping out with scm challenges"), and his contact form on https://yoerisan.com/contact/ is name, email and message. No booking, intake or quoting volume of his own for a workflow to take, disproved
social: tools/social-audit.js on https://www.linkedin.com/company/sanstra-supply-chain-advisory , UNKNOWN behind the join wall, his /in/yoerisan/ is the other account in the HTML, control x.com/lemlist read
squad: a one person interim practice per https://yoerisan.com/ and the lemlist companyType Self-Employed, with no team, no delivery and nothing to build a squad message on
verdict: NO_STRONG_ANGLE, NO_SIGNAL. A solo interim leader looking for his next role. The open question in the thread is ours to wait on
```

**Verdict, NO_SIGNAL.** tools/news.py found 0 for the company and 0 for the person, with Heineken 100 as
the control.

## Ramar Nadar, RentyFind, ctc_2iNgGwkzexwdG6wWP

- **HE REPLIED, AND WE SENT A MESSAGE BEYOND THE CONNECT NOTE.** Thread, 2 items, nextPage null.
  2026-09-09 13:16 IN, "Thanks Raka". 2026-09-10 09:11 OUT, "Anytime Ramar 😄 how's RentyFind going at the
  moment, you full time on it? Would be fun to swap notes some time." No reply since.
- Queue, 4 rows, the latest NO_STRONG_ANGLE 2026-10-03. lemlist (lea_bY9n2iRsrHr5BgGgn) gives jobTitle
  "Founder", tagline "Founder @ RentyFind | AI that finds your perfect London rental", and a jobDescription
  that says he is "Leading product development and AI matching engine".
- Owner confirmed. RENTYFIND LTD 17323420 was incorporated 6 Jul 2026, and Ramar Gopal Nadar is the only
  director and the only PSC (Companies House officers and PSC pages, opened today).

```sweep
lead: Ramar Nadar, sole director and PSC of RENTYFIND LTD 17323420, incorporated 6 Jul 2026 per https://find-and-update.company-information.service.gov.uk/company/17323420/officers , ctc_2iNgGwkzexwdG6wWP, thread 2 items, our 10 Sep question unanswered
website: tools/crawl.py read 19 URLs of https://rentyfind.com , 18 at 200, a Next.js AI rental search with demo matches, a chat behind sign in, and terms dated 4 September 2026. https://rentyfind.com/blog says "No posts published yet". Angle B, a three month old company on a site he built this summer, no funding in tools/news.py (0 company, 0 person, Tesco 100 control), no expansion to serve
gdpr: tools/eu-view.py from Stockholm on https://rentyfind.com , _ga and _ga_3T1ENDHWHE set, and requests to clarity.ms and stats.g.doubleclick.net before a click. Real, but a settings change for a solo founder, which is a favour and fails the pay test
apps: angle A disproved, he sells AI. The product is an AI matching engine he leads himself per the lemlist jobDescription and https://rentyfind.com/ "Our AI finds the best matches for you"
social: tools/social-audit.js on the accounts in https://rentyfind.com 's HTML, https://x.com/rentyfind "could not be found", Instagram rentyfind 16 followers, 19 posts, latest 2026-07-04 (94 days), LinkedIn UNKNOWN, Facebook login wall, control x.com/lemlist read
squad: a solo pre revenue founder per the Companies House register (one officer) and no hiring on https://rentyfind.com , so there's no budget or capacity fact
verdict: NO_STRONG_ANGLE, NO_SIGNAL. A pre revenue solo AI founder who builds the product himself. The dead X link and pre consent tracking are favours if he ever answers
```

**Verdict, NO_SIGNAL.**
