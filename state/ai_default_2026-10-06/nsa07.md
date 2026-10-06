<!-- NO DRAFTS -->
# nsa07, AI default angle pass, 2026-10-06. Eight leads, no drafts.

Run under /tmp/claude-0/agents/AI_DEFAULT_BRIEF.md and RULES.md 4A "THE DEFAULT ANGLE". Read only. Nothing sent,
no lemlist write, no git. The working files are in /tmp/claude-0/agents/nsa/nsa07_work/.

## What was run

- **Threads.** get_inbox_conversation on all eight contactIds, 2026-10-06 about 06:20 UTC, one page each, nextPage
  null on all eight. Sarim's (2 items) and Dan's (4 items) came back full in the same minute, which is the positive
  control for the six empty threads.
- **lemlist records.** search_campaign_leads by leadId on all eight (Sarim lea_JahTmYy2KEhfCWnjR and Dan
  lea_YnQ48gnNzPxo7vuzs taken from their thread activities). Every one is in v0.1 cam_PryZp5LuvQv8NznHh only, and
  v0.1 now reads `paused`.
- **Registers.** Companies House was opened live for 04998512 (Absolute Label Services), 05401203 and 00738819
  (Adcock), 05582633 (Brovanture, PSCs) and 17011927 (Flochitect). Blu Sky's about page and Le Mouffetard's /le-cnma
  page were used for the two whose register search didn't resolve. IEDES was checked on its own team page.
  recherche-entreprises.api.gouv.fr and web.archive.org both dropped every connection from this container today.
  That's written down as walled, not as empty.
- **Sites.** Brovanture got 120 pages in Chromium past its SiteGround captcha (tools/crawl.py got only the 202
  challenge), plus the homepage and contact page rendered and screenshotted on desktop and phone. Flochitect got
  home, services and about through tools/fetch-walled.py. Blu Sky got home, get started, careers, both job ads, about
  and R&D through tools/fetch-walled.py.
- **News.** tools/news.py en was run for Brovanture, Blu Sky and Flochitect, covering company, person, region and
  industry. The Tesco control returned 100 each time.
- **Social.** tools/social-audit.js was run on Brovanture's LinkedIn and X, both taken from its own HTML. Flochitect's
  rendered page links no social account.

| Lead | Verdict | One line |
|---|---|---|
| Sarim S., Flochitect | NO_SIGNAL | He sells AI workflow automation himself, and the company is eight months old with no funding, hiring or new market |
| Dan Lowe, DJi Studio | DO_NOT_CONTACT | We pitched him on 13 Sep and sent a correction on 28 Sep, two messages since he last spoke, so the thread is closed |
| Enrique Aliste, IEDES | CLOSED_NOT_ICP | A university professor directing a public institute of Paris 1 |
| Paul Purcell, Absolute Label Services | CLOSED_NOT_ICP | Director of Platform, not an officer or PSC of 04998512 |
| Kirsty Wallis, Adcock | CLOSED_NOT_ICP | Commercial Director, every officer of both Adcock companies is a Griffiths |
| Aurelia Ivan, Le Mouffetard | CLOSED_NOT_ICP | Appointed directrice of a state-labelled association from 1 Jan 2026, with a separate president |
| Chrissie Krappe, Blu Sky | CLOSED_NOT_ICP | Managing Director, but Blu Sky's own about page names Jon Dudgeon as Co-Founder and Chief Executive Officer |
| Guillaume Slee, Brovanture | NO_SIGNAL | A real CEO, but the firm builds finance automation and GenAI on Oracle itself, and its site already covers every new line and region |

**The one thing Raka might overrule.** Chrissie was researched as "she runs it" on 30 Sep. Today's about page lists a
separate Co-Founder and CEO above her, so under the strict owner rule she's out. If an MD who runs the firm counts,
the angle hunt below still found nothing that passes. Blu Sky sells "App Advisory" and "finance process automation"
to its own clients.

---

## Sarim S., Flochitect, ctc_Exg3BgqLrnRB727Lh

- **Thread.** It has 2 items. His message of 2026-09-08 10:46 UTC, inbound: "Hey Raka, nice to meet you! Definitely
  - What business are you in?". Our reply of 2026-09-10 14:10 UTC, outbound: "Nice to meet you too Sarim. I run Astra,
  a small studio, we build websites and AI tools for small businesses ... are you niching into one type of business
  or staying broad across professional services?". HE REPLIED ONCE, AND WE SENT A REAL MESSAGE BEYOND THE CONNECT NOTE,
  a question rather than a pitch. Nothing since then, 26 days.
- **Prior verdicts.** The queue rows go CHAT_ONLY_NO_PITCH (28 Sep), then NO_STRONG_ANGLE (28 Sep, competitor), then
  NO_STRONG_ANGLE (28 Sep re-attempt), then NO_STRONG_ANGLE (3 Oct, five angles, state/drafted_2026-10-03-batch1-redo.md).
- **Record.** jobTitle "Founder", tagline "Founder @ Flochitect | Implementing practical AI solutions for SMBs",
  domain flochitect.com. Companies House 17011927, opened today, has SHEHZAD Muhammad Sarim as sole director from
  4 Feb 2026 and the only PSC. He passes the owner rule.

**Verdict, NO_SIGNAL.** A fails because AI automation is what he sells. B fails because nothing shows growth or
expansion.

```sweep
lead: Sarim S. (Muhammad Sarim Shehzad), Founder, FLOCHITECT LTD 17011927, sole director and PSC per the register opened 2026-10-06, ctc_Exg3BgqLrnRB727Lh, thread 2 items, our 10 Sep question unanswered
website: B hunt, https://flochitect.com/ , /services/ and /about/ fetched 2026-10-06 with tools/fetch-walled.py, four page site (Home, About, Services, Contact), "Based in Brighton, UK", no clients, team, funding, hiring or new market anywhere, Wayback CDX walled (web.archive.org dropped every connection), tools/news.py Flochitect 0 and "Sarim Shehzad" 0 against control Tesco 100, nothing growing that the site fails to serve
gdpr: tools/eu-view.py rerun 2026-10-06 from Stockholm, https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fflochitect.com , 3 cookies before a click (cookieyes-consent, _ga, _ga_9TPNWWT8YQ) and requests to region1.google-analytics.com and googletagmanager, Google Analytics before consent, a settings change that fails the pay test and is outside this brief's two angles
apps: A disproved by his own page, https://flochitect.com/services/ sells "Workflow Automation", "CRM & Sales Automation" and "AI-Enabled Workflows ... We integrate AI into workflows", a lead that sells AI automation is not an A lead
social: nothing to test, the rendered anchors on https://flochitect.com/ link no social account, the LinkedIn company URL exists only in the lemlist record, checked against the HTML today
squad: a peer agency, but https://flochitect.com/ names no client, project, team or delivery time and the register shows one director, outside this brief's two angles and no capacity fact either
verdict: NO_STRONG_ANGLE, brief verdict NO_SIGNAL. A disproved because he sells it, and B has no growth or expansion evidence for a company incorporated 4 Feb 2026
```

---

## Dan Lowe, DJi Studio, ctc_XAGgwnXjEjeS7royq

- **Thread.** It has 4 items, oldest first.
  - 2026-09-10 10:07 UTC, outbound, the connect note. "Hi Dan, saw your business and thought it was cool ... Would
    love to connect and share ideas!"
  - 2026-09-10 11:04 UTC, inbound. "Thanks Raka, always happy to connect and share ideas! hope business is going
    well!"
  - 2026-09-13 18:39 UTC, outbound. A FULL PITCH about the demos labelled Sonic Profile 1 through 6, offering a front
    page where the work plays by industry.
  - 2026-09-28 12:20 UTC, outbound. A CORRECTION. "I read the names on your Sonic Profiles as real clients ... your
    portfolio says they're fictional demo companies. I got that wrong. Sorry for the noise."
  HE REPLIED ONCE, ON 10 SEP. WE'VE SENT TWO MESSAGES SINCE AND HE HASN'T ANSWERED EITHER.
- **Prior verdicts.** SENT (28 Sep, and the queue row corrects the 24 Sep "rapport only"), then HELD (28 Sep), then
  CORRECTION_SENT (28 Sep, "Do not pitch again unless they reply"), then NO_STRONG_ANGLE (3 Oct).
- **Record.** jobTitle "Founder | Sonic Brand Architect", domain djis.co.uk. He owns it, and his summary already sells
  "proprietary generative AI music workflows".

**Verdict, DO_NOT_CONTACT, closed silently.** We've sent two follow ups since he last spoke and the correction
ended on "Sorry for the noise". RULES 1B (2026-10-03) says two follow ups without a reply is a silent close, and the
28 Sep queue row says not to pitch again unless he replies. So no nudge and no angle research. Separately, his own
material already carries AI workflows, which would have killed A anyway.

---

## Enrique Aliste, Institut d'études du développement de la Sorbonne, ctc_772z2yF7mQPYDkeky

- **Thread.** Empty, totalItems 0. The control was Sarim's and Dan's threads, both full in the same minute. Prior
  verdicts are UNRESEARCHED (28 Sep, flagged as an academic stop sign) and then NO_STRONG_ANGLE (29 Sep).
- **Record.** jobTitle "Directeur". Tagline "Professeur des Universités, Université de Paris 1 Panthéon-Sorbonne.
  Institut d'études du développement de la Sorbonne. Profesor Titular, Universidad de Chile". companyDomain is
  pantheonsorbonne.fr. His summary describes an academic career, including a stint as Vice President of Research at
  the University of Chile.
- **Confirmed today.** https://iedes.pantheonsorbonne.fr/liedes-en-bref/nos-equipes lists "Enrique Aliste Almuna, PR
  géographe" and "Enrique Aliste Almuna, directeur", on the university's own platform.

**Verdict, CLOSED_NOT_ICP.** He's an academic directing a public unit of Université Paris 1. He doesn't own it or
found it, and he isn't a CEO. The owner rule was applied strictly, as the batch instruction asked.

---

## Paul Purcell, Absolute Label Services, ctc_adt3LpTTvWPcQCJLR

- **Thread.** Empty, with the same control. The prior verdict is NO_STRONG_ANGLE, Not ICP (29 Sep).
- **Record.** jobTitle "Director of Platform", tagline "Director of Platform @ Absolute Label Services".
- **Register, opened today.** Companies House 04998512, Active. The current directors are Deborah Mary Cutting, Mark
  Preston Dowling, Henry Gordon Semmence and Simon Mark Wills. No Purcell appears among current or resigned officers.

**Verdict, CLOSED_NOT_ICP.** He's an employee in a functional director title, not an owner, founder or CEO.

---

## Kirsty Wallis, H.D.Adcock Nelson Limited, ctc_9kqPKAY5YjA3vL2fc

- **Thread.** Empty, with the same control. The prior verdict is NO_STRONG_ANGLE, Not ICP (29 Sep).
- **Record.** jobTitle "Commercial Director". Her summary opens "Recently appointed as Commercial Director", and her
  jobDescription says she leads commercial strategy across the Adcock Group.
- **Register, opened today.** Companies House 05401203 and 00738819 are both Active. Every current director is a
  Griffiths (Andrew John, Erica Frances Vera, Michael Edward), and Wallis appears nowhere.

**Verdict, CLOSED_NOT_ICP.** She's a newly appointed employee in a family-owned firm.

---

## Aurelia Ivan, Le Mouffetard, Centre national de la Marionnette, ctc_3EtjtukFNTDaqq3Du

- **Thread.** Empty, with the same control. The prior verdict is NO_STRONG_ANGLE, Not ICP (29 Sep).
- **Record.** jobTitle "Directrice", tagline "Directrice chez Le Mouffetard ...".
- **Confirmed today.** https://www.lemouffetard.com/le-cnma lists "Bureau de l'association, Frédéric Maurin,
  Président" and "Direction, Aurelia Ivan, Directrice". It also says "Le 1er janvier 2026, Aurelia Ivan succède à
  Isabelle Bertola". The homepage says the centre is "conventionné par le ministère de la Culture (DRAC
  Île-de-France), la Ville de Paris et la Région". recherche-entreprises was walled today.

**Verdict, CLOSED_NOT_ICP.** She's an appointed director of a publicly funded association that has its own president.
It isn't a business she owns.

---

## Chrissie Krappe, Blu Sky Chartered Accountants, ctc_to9dLfFnqcAEj2Xih

- **Thread.** Empty, with the same control. The prior verdict is NO_STRONG_ANGLE (29 Sep, full sweep in
  state/drafted_2026-09-30-new-accepts.md, which treated her as "she runs it, the founders own it").
- **Record.** jobTitle "Managing Director", tagline "Managing Director at Blu Sky".
- **Confirmed today.** https://blusky.co.uk/about/ lists "Jon Dudgeon, Co-Founder and Chief Executive Officer,
  *statutory director", "Steven Robinson, Chief Financial Officer & Chief Growth Officer, *statutory director", "Dave
  Gibson, Co-Founder and Chairman" and "Chrissie Krappe, Managing Director, *statutory director". Both job ads
  (https://blusky.co.uk/were-hiring-a-tax-manager/ and /were-hiring-a-client-relationship-manager/) are signed by Jon
  Dudgeon as Co-Founder and CEO. tools/news.py gives Bdaily 2026-06-06 "Blu Sky promotes managing director" and
  Chronicle Live 2026-06-03 "North Shields business appoints new boss".

**Verdict, CLOSED_NOT_ICP.** She was promoted to MD in 2026, under a separate co-founder CEO and two shareholder
founders, so she isn't the owner, founder or CEO. For the record, in case Raka counts an MD, A would also have
failed. The firm sells "App Advisory" ("Connecting the right processes to the right technology") and its CRM ad lists
"finance process automation" as client work. It already has a Fractional Chief Information Officer on the about page.
The only manual step visible is the get started form (11 fields, then "Talk to our friendly experts to create a
subscription"), and that's a sales conversation they want, not a cost.

---

## Guillaume Slee, Brovanture Ltd, ctc_mG6iR58sQQAXKgKEk

- **Thread.** Empty, with the same control. The prior verdict is NO_STRONG_ANGLE (29 Sep, sweep in
  state/drafted_2026-09-30-new-accepts.md).
- **Record.** jobTitle "Chief Executive Officer", tagline "Chief Executive Officer @ Brovanture Ltd | Oracle Certified
  Specialist", domain brovanture.com.
- **Register, opened today.** 05582633 PSCs are Malcolm James Brock and Marc Van Kan, each 25 to 50%, notified
  6 Apr 2016. The about page, rendered today, has "Guillaume Slee CEO ... joining Brovanture in 2014 ... I help shape
  our strategy, drive growth". He passes as CEO, though the founders own it. A Project Zeta Bidco and Topco turned up
  in the register search (30 Sep 2026, PSC Vgi Global Holdco). They were opened and are unrelated to Brovanture.

**Verdict, NO_SIGNAL.** A fails because Brovanture's own trade is finance automation, and the one human-heavy job
(the support desk) is the thing it sells as human by design. B fails because growth is real but the site already
covers every new line and region.

```sweep
lead: Guillaume Slee, CEO, Brovanture Limited 05582633, PSCs Brock and Van Kan per the register opened 2026-10-06, ctc_mG6iR58sQQAXKgKEk, lea_oMsxcdxJwgCWNDohj, thread empty with control
website: B hunt, 120 pages crawled 2026-10-06 in Chromium past the SiteGround captcha plus homepage and contact screenshots desktop and phone, growth is real (Tech200 "revenue growth of 153%" at https://brovanture.com/brovanture-named-in-fastest-growing-200-tech-suppliers-in-the-uk/ , careers "we're growing our team" hiring BD executives and four consultant types), but the site already serves it, solution pages for NetSuite, Oracle Fusion Data Intelligence and Treasury Management, a news post dated 16 Sep 2026, weekly webinars listed to 21 Oct, a four region map on /contact/ , and https://brovanture.com/brovanture-support-why-you-should-lean-on-us/ says "We are totally and firmly onshore with offices only in the UK". The eight language strip against an English only site is a tweak, Wayback walled today
gdpr: tools/eu-view.py rerun 2026-10-06 from Stockholm, https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fwww.brovanture.com , CookieYes installed yet the _zitok cookie and requests to px.ads.linkedin.com, snap.licdn.com and ws.zoominfo.com before any click, real, an afternoon's consent setting, outside this brief's two angles
apps: A disproved by their own pages, they build finance automation for a living (https://brovanture.com/summarising-oracle-cloud-epm-ipm-insights-using-genai/ , the 14 Oct webinar on "workflow automation", EPM pipelines posts), the about page says "We use NetSuite and Oracle Cloud EPM internally", and the only hand job visible, phone and email support, is sold as human on purpose at https://brovanture.com/services/brovanture-support/ "experts not trainees"
social: opened with tools/social-audit.js on the two accounts in their own HTML, LinkedIn https://www.linkedin.com/company/brovanture-ltd 1,315 followers, X https://x.com/brovanture bio matches the site, healthy, no angle
squad: hiring Oracle Planning, FCCS, NetSuite and Cloud ERP consultants per https://brovanture.com/brovanture/careers-recruitment/ , Oracle specialists we don't supply, and the onshore statement above runs against a squad pitch
verdict: NO_STRONG_ANGLE, brief verdict NO_SIGNAL. A is their own product line and B's growth is already on the site
```
