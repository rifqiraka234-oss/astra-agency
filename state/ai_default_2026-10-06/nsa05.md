# nsa05, AI default angle batch, 2026-10-06. 1 draft (Marek Pruszewicz), 7 without one.

Read only. Nothing sent, no lemlist writes, no git. Work files in /tmp/claude-0/agents/nsa/nsa05_work/.

## What was run, and what to know first

- **Threads.** get_inbox_conversation on all eight contactIds, 06:2x UTC, each 0 activities, totalItems 0, nextPage null,
  LinkedIn sync "recent" 06:14:43Z. Positive control in the same minute, Mandy Kerley ctc_ZGv33qKajKqMjkqH9 came back
  with 2 items (7 Sep connect note, 3 Oct opener). A sentOnly search per name returned exactly one conversation each,
  the connect note as last sent, lastRepliedAt null on all eight. **Nobody in this batch ever replied, and we never
  sent anything beyond the connect note.** No promise or opt out anywhere.
- **Acceptance, per lead, with a control.** GET /api/activities?type=linkedinInviteAccepted&leadId=... returned the
  23 Sep acceptance for Ollie Bartlett (control). It returned **nothing for Noshad, Paul and Lisa**. Their full activity
  list for Noshad shows linkedinInviteDone 6 Sep as the last step, and all three contact records say leadStatus
  "LinkedIn invite sent". **These three never accepted, so they can't be messaged at all.** The other five records say
  "LinkedIn invite accepted".
- **Three queue verdicts were wrong about who the person is.** The 3 queue rows called Noshad a Lloyds Bank employee,
  Paul a T-Systems employee and Lisa a job seeker, all from LinkedIn slugs. The lemlist records say otherwise.
  Noshad's tagline is "Founder at Fairbridge Finance", and Companies House has FAIRBRIDGE FINANCE LTD 16991715,
  incorporated 27 Jan 2026, at the same Accountswise, 742 Bordesley Green address as officer Noshad Ali KHOWAJA. Paul
  is named in https://kernfunktion.de/impressum as "Kernfunktion Media GbR Simon Becker & Paul Olson", a web design and
  marketing agency in Asbach, alongside his T-Systems job. Lisa's record is "Founder, Future Perspective | NLP Master
  Coach". All three look like owners. It changes nothing today because none of them accepted.
- **Campaign state.** Every contact record in this batch shows cam_PryZp5LuvQv8NznHh with campaignState "paused".
  CLAUDE.md says v0.1 is the only running campaign. Worth a look, I didn't touch it.
- **Marek's draft rests on a non profit.** He's the CEO of a charity, nobody owns it, and whether charities are in
  scope has been your open question since 22 Sep. The rule now lets CEOs through, so I drafted it. Strike it if
  charities are out.

| Lead | Verdict | Signal |
|---|---|---|
| Noshad Khowaja, Fairbridge Finance | BLOCKED_NEEDS_INFO, invite never accepted | Founder, company 16991715 incorporated 27 Jan 2026 |
| Paul Olson, Kernfunktion Media | BLOCKED_NEEDS_INFO, invite never accepted | Co owner per https://kernfunktion.de/impressum , a web agency |
| Lisa Barnes, Future Perspective | BLOCKED_NEEDS_INFO, invite never accepted | Founder, coaching, https://futureperspective.co.uk serves a 404 title on its homepage |
| Peter Borup, Quadrise plc | CLOSED_NOT_ICP | Hired CEO of an AIM listed plc per https://www.quadrise.com/about-us/our-people/ |
| Romain Coquio, EMAROM | NO_SIGNAL | Co gérant of a Carrefour Contact franchise, no material of his own to find a job in |
| Marek Pruszewicz, Dialogue Earth | DRAFT_A | Eight languages promised, Hindi silent since 31 Jul 2026 and Bengali since 23 Oct 2024, editors run translation by hand |
| Ollie Bartlett, Collier Pickard | NO_SIGNAL | Sells CRM workflow automation and an AI Readiness Check himself, site already rebuilt around the new offer |
| David Risser, Ethics & Boards | CLOSED_NOT_ICP | Directeur Général, founder is Président per recherche-entreprises 523584555 |

---

## Noshad Khowaja, Fairbridge Finance, ctc_vFRvuNKLipNT4L4rx

- Thread: 0 activities, sentOnly shows the 6 Sep 15:28 UTC connect note only, lastRepliedAt null. Queue: UNRESEARCHED, then NO_STRONG_ANGLE "Relationship Director at Lloyds Bank", never messaged.
- Record (GET /api/contacts, lea_m2PT27Ldzda7yGoYB): jobTitle "Founder", tagline "Founder at Fairbridge Finance", companyDomain fairbridgefinance.co.uk (200, title "Fairbridge Finance | Trusted UK Commercial Finance Broker"), Leicester. Companies House FAIRBRIDGE FINANCE LTD 16991715, 27 Jan 2026, shares its address with officer Noshad Ali KHOWAJA.
- Acceptance: no linkedinInviteAccepted event (control Ollie found), lead.state linkedinInviteDone, leadStatus "LinkedIn invite sent".

Verdict: BLOCKED_NEEDS_INFO. He looks like a genuine owner of a new commercial finance broker, and the queue's Lloyds Bank verdict should be superseded. But the invite is still pending, so there's no channel to message him. No A or B research spent. If he accepts, a broker whose deals start with document collection is a natural A candidate to test.

## Paul Olson, Kernfunktion Media, ctc_pJigiEvnR8XWQoF4n

- Thread: 0 activities, sentOnly shows the 6 Sep 08:00 UTC connect note only, lastRepliedAt null. Queue: UNRESEARCHED, then NO_STRONG_ANGLE "Global AWS Alliance Lead at T-Systems", never messaged.
- Record (lea_QCTdgqM4ejS7xSQTB): jobTitle "Co-Founder", tagline "Squad Lead Marketing at T-Systems International | Marketing | Webdesign | Graphics Design | Photo & Video", company Kernfunktion Media, kernfunktion.de, Asbach, founded 2026. The Impressum at https://kernfunktion.de/impressum names "Kernfunktion Media GbR Simon Becker & Paul Olson".
- Acceptance: no linkedinInviteAccepted event, leadStatus "LinkedIn invite sent".

Verdict: BLOCKED_NEEDS_INFO. He co owns a two person web and marketing agency next to a T-Systems job. That's a Build Squad profile, not an A or B lead, and the invite isn't accepted anyway.

## Lisa Barnes, Future Perspective, ctc_aqv5FsA6DoyFrAgRF

- Thread: 0 activities, sentOnly shows the 6 Sep 06:54 UTC connect note only, lastRepliedAt null. Queue: UNRESEARCHED, then NO_STRONG_ANGLE "Open to new opportunities", no company, never messaged.
- Record (lea_93mDddAreF6nFzi5s), company resolved from it: jobTitle "Founder, Future Perspective", tagline "Founder, Future Perspective | NLP Master Coach | Helping you gain clarity, confidence & aligned next steps", company Future Perspective, futureperspective.co.uk, Oldham, founded 2026, "Self-Owned".
- Acceptance: no linkedinInviteAccepted event, leadStatus "LinkedIn invite sent".

Verdict: BLOCKED_NEEDS_INFO. She's a solo coach who founded the business this year, and the queue's job seeker verdict looks wrong. One candidate only, untested: https://futureperspective.co.uk returned HTTP 404 with the title "Page not found – Future Perspective" from a live WordPress install at 06:34 UTC, while example.com loaded through the same path. That's one curl, so it isn't a finding. It's worth a render if she ever accepts.

## Peter Borup, Quadrise plc, ctc_PfumJJpZ3WaLpBduY

- Thread: 0 activities, sentOnly shows the 17 Sep 05:01 UTC connect note only, accepted per the record. Queue: BLOCKED (slug doubt), then NO_STRONG_ANGLE three times, last 27 Sep, never messaged.
- Record (lea_QTXG2ZMuTaCKZMyZh): jobTitle "Chief Executive Officer", jobDescription "Commercialisation of Quadrise's market leading transition fuels", summary "An experienced CEO with broad international experience within shipping".
- https://www.quadrise.com/about-us/our-people/ reopened today, "Peter Borup Chief Executive Officer", and the site carries "AIM Rule 26" and "© 2026 Quadrise PLC". The site is built by Proactive Digital Solutions.

Verdict: CLOSED_NOT_ICP. He's a hired CEO of a listed plc, which RULES 4A rule 13 names as nothing of ours to sell. No A or B research spent.

## Romain Coquio, SARL EMAROM (Carrefour Contact Mesnil Roc'h), ctc_FhCDinsZ4DN9M3fdC

- Thread: 0 activities, sentOnly shows the 17 Sep 14:18 UTC connect note only, accepted. Queue: NO_STRONG_ANGLE four times, last 27 Sep, never messaged.
- Record (lea_BQ8YGHePfFmgatqHB): jobTitle "Dirigeant", jobDescription "SARL EMAROM", tagline "@Tilkal | Traceability & Supply Chain Due Diligence". Register reopened today, https://recherche-entreprises.api.gouv.fr/search?q=504393612 , EMAROM active, tranche 11 (10 to 19 staff), gérants Romain Patrick Jacques COQUIO (1997) and Anne COQUIO (1971). So he co owns the family franchise store and works at Tilkal.
- A, searched: the store's only web presence is Carrefour's national pages and directories. A web search on the store and drive returned directory listings and one snippet saying its online store isn't activated, which I couldn't open at source. Ordering and drive run on Carrefour's platform, which he can't own. B: there's no growth signal for the store anywhere.

Verdict: NO_SIGNAL. No job in his own material to name, and inventing one would break the rule.

## Marek Pruszewicz, Dialogue Earth, ctc_RwGCRQoJiAPgqtJeh

- Thread: 0 activities, sentOnly shows the 18 Sep 15:43 UTC connect note only, accepted 18 Sep, lastRepliedAt null. Queue: BLOCKED twice, then NO_STRONG_ANGLE four times, last 3 Oct ("only proven flaw pre consent tracking"), never messaged.
- Record (lea_pyu9kasGRuFL3nAjr): jobTitle "Chief Executive Officer", tagline "Chief Executive Officer, Dialogue Earth | Public service journalism for the future of our planet". Companies House 06477262 reopened today, limited by guarantee, "no registrable person". He runs it and nobody owns it, CEO since 5 Jan 2026 per saxbam.
- A holds. The paid job is translation. Two live job ads give editors "translation processes" by hand, the site promises eight languages, and the South Asian editions have gone quiet. Hindi's newest story is from 31 Jul 2026, Urdu's from 12 Jul and Bengali's from 23 Oct 2024. English publishes daily.

Verdict: DRAFT_A. The angle in plain words. Dialogue Earth says it reports in eight languages, but almost every story stays in English or reaches one or two other languages, and the Hindi and Bengali editions have stalled. Their editors do translation by hand. An AI translation workflow that their editors check gets each story out in every language without hiring.

```gate
lead: Marek Pruszewicz, Chief Executive Officer of Dialogue Earth since 5 Jan 2026 per https://www.saxbam.com/insights/appointments/marek-pruszewicz-joins-dialogue-earth-as-new-ceo/ , a charity limited by guarantee, Companies House 06477262 reopened 2026-10-06 (active, "no registrable person"), charity 1125378 on https://dialogue.earth/en/about/ , ctc_RwGCRQoJiAPgqtJeh, lea_pyu9kasGRuFL3nAjr. lemlist GET /api/contacts jobTitle "Chief Executive Officer", leadStatus "LinkedIn invite accepted". Thread pulled 2026-10-06, 0 activities, nextPage null, sentOnly shows only the 18 Sep connect note, lastRepliedAt null, control Mandy Kerley's thread full in the same minute. Non profit, so in scope only if Raka says charities are
site pass 1: 80 pages, python3 tools/crawl.py https://dialogue.earth/ --max 80 through its fetch-walled fallback, all 200, every page read, the sitemaps list 25,436 URLs so the cap was hit, plus 14 pages fetched directly with tools/fetch-walled.py (about, jobs, the three job ads, policies, author page, the 20 year piece, homepage, ten language homepages)
site pass 2: 80 pages, second full crawl, all 200, matching pass 1, then the 3 Oct render reused for screenshots (desktop 1440 and phone 390, 222 and 266 requests all 200 through curl_cffi, 0 undecoded images, no overflow, /tmp/claude-0/agents/dialogueearth/dpart0.png to ppart2.png), because site-audit.js is BLOCKED_BY_THEIR_WALL. Plus all 45 post sitemaps read, and 55 homepage stories plus 115 South Asian language stories each fetched and dated
deep analysis: A modern, daily climate newsroom of about 45 staff, almost all editors, with country editors across South and Southeast Asia, Africa and Latin America, "delivered through reporting in eight languages" (about page and every job ad). The language switcher lists ten. Output is lopsided. The sitemaps hold 11,248 English URLs, 7,658 Chinese, 1,361 Spanish, 1,345 Portuguese, but only 244 Hindi, 172 Nepali, 139 Urdu, 114 Bengali, 2 French and 1 Arabic. Of the 55 English stories linked from the homepage on 6 Oct, 28 have no translation at all (12 of them short news digests), 54 reach two other languages at most, and none reaches Hindi, Urdu, Bengali or Nepali, including seven South Asia stories (Bhutan hydropower, India steel, Kashmir, Hijra women, India AI weather, Pakistan mountain languages, the Ganga). Dated two independent ways (every article linked from each language page, and the highest post ids in the full sitemap), the newest Hindi story is 2026-07-31, Urdu 2026-07-12, Bengali 2024-10-23, and Nepali 2026-09-02 after a gap since 2024-09-27, while English and Chinese both published on 1 Oct or later. The job ads say how translation works now. The China Editor ad lists "Managing editorial flows, translation processes and coordinating between regional editorial teams", and the Brazil Editor ad "Managing translation processes and checking translated content to ensure accuracy, consistency and adherence to editorial standards". So translation is human work spread across editors, and the languages with the fewest editors have stalled. Their own 20 year piece says climate information reach is falling (Reuters Institute, 55% in 2023 to 47% in 2025) and calls it "climate journalism becoming less present in places where people find their information"
owner linkedin: route 1 curl https://www.linkedin.com/in/marekpruszewicz and /recent-activity/all/ both 999. Route 2 web search "Marek Pruszewicz" Dialogue Earth, result title "Marek Pruszewicz - Dialogue Earth", the headline. Route 3 site:linkedin.com/posts "Dialogue Earth" translation OR languages, nothing of theirs. Route 4 people data, the about page team list names him "Chief executive officer" in the senior management team. Route 5 company page https://www.linkedin.com/company/dialogueearth/ read by tools/social-audit.js, 11,511 followers, latest post 6 Oct. Route 6 his own pages, https://dialogue.earth/en/author/marekpruszewicz/ "editor and senior manager in BBC News for nearly 20 years ... and with the BBC World Service language services", and the UNGA Guide event of 23 Sep 2026 https://ungaguide.com/events/why-climate-communication-keeps-failing-and-what-it-would-take-to-actually-break-through/ lists him as CEO "advancing independent climate journalism that centers locally rooted perspectives and voices from across the Global South"
contact linkedin: same person as the owner. Nobody owns a charity, he's the CEO who runs it, and the record, the about page and the saxbam appointment agree, same six routes
google news: tools/news.py en, control Tesco 100. "Dialogue Earth" 100 results, their own daily stories, newest 2026-10-05. "Marek Pruszewicz" 8 results, his own pieces of 2026-06-24 and 2026-03-24 plus BBC and Together for Girls items from 2012 to 2024
regional news: tools/news.py (South Asia climate journalism OR Hindi climate news) (newsroom AI translation) 13 results, The Climate Watch 2026-07-24 "A warming world faces a shrinking climate newsroom as crisis grows", Earth Journalism Network 2026-04-28 storytelling workshop in Pune, UNESCO items, titles only
industry news: tools/news.py "newsroom AI translation" 73 results, Nieman Journalism Lab 2026-08-06 on AI rewiring the newsroom, The Conversation 2026-07-29 on outlets charting different paths on AI, SmartNews 2026-07-17 launching AI translation for multilingual readers, Media Helping Media 2026-08-11 on newsroom AI rules, Pacific media leaders 2026-09-29 asking for human oversight. Read as titles, which is where the industry is, multilingual reach going to AI with editors checking
sources:
1. https://dialogue.earth/en/about/
2. https://dialogue.earth/en/jobs/china-editor/
3. https://dialogue.earth/en/jobs/brazil-editor/
4. https://dialogue.earth/en/jobs/china-assistant-editor/
5. https://dialogue.earth/en/climate/dialogue-earth-at-20-we-will-not-vacate-the-space/
6. https://dialogue.earth/hi/2-hi/60144525/
7. https://dialogue.earth/bn/4-bn/60056668/
8. https://dialogue.earth/ur/3-ur/60141306/
9. https://dialogue.earth/ne/3-ne/60150269/
10. https://dialogue.earth/sitemap_index.xml
11. https://dialogue.earth/en/author/marekpruszewicz/
12. https://www.saxbam.com/insights/appointments/marek-pruszewicz-joins-dialogue-earth-as-new-ceo/
13. https://find-and-update.company-information.service.gov.uk/company/06477262
14. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fdialogue.earth%2F
15. https://www.instagram.com/dialogue.earth/
16. https://www.linkedin.com/company/dialogueearth/
17. https://ungaguide.com/events/why-climate-communication-keeps-failing-and-what-it-would-take-to-actually-break-through/
18. https://news.google.com/rss/search?q=%22Dialogue+Earth%22 (tools/news.py)
19. https://www.linkedin.com/in/marekpruszewicz (999, walled)
pains: 6 judged. (1) The language editions have stalled while translation runs by hand through editors, Hindi silent since 31 Jul, Bengali since Oct 2024, 54 of 55 homepage stories in two other languages at most. Costly, current, proven two ways, and buildable. (2) _ga and the LinkedIn Insight tag fire before any click from Stockholm, under a banner that only offers "Accept and close", an afternoon's plugin setting, fails the tweak test. (3) The footer links an X account whose bio says it isn't being updated, a tweak. (4) The Brazil Editor ad and the Africa solar pitch call still listed after their 8 and 13 Sep deadlines, a tweak. (5) Pitches go by email to individual editors, plausible intake work but nothing shows it hurts. (6) No donate route, but funding is institutional, not a goal shown
chosen: (1), costliest and biggest. Translation is a standing cost in editor hours on every story, it's what decides whether the South Asia team's work reaches the people it's about, and it sits on the mission he was hired to take into its next phase. The rest are afternoon fixes
claims:
offered in eight languages, "delivered through reporting in eight languages", https://dialogue.earth/en/about/
Hindi's newest story is dated 2026-07-31, https://dialogue.earth/hi/2-hi/60144525/ , confirmed against every Hindi story linked from https://dialogue.earth/hi/ and the highest Hindi post ids in https://dialogue.earth/sitemap_index.xml
Bengali's newest story is dated 2024-10-23, https://dialogue.earth/bn/4-bn/60056668/ , confirmed the same two ways from https://dialogue.earth/bn/
they have a South Asia team, "South Asia team ... Pakistan editor ... South Asia reporter ... South Asia managing editor", https://dialogue.earth/en/about/
the team writes stories about the region, India steel, Kashmir, the Ganga, Hijra women, none in Hindi, Urdu, Bengali or Nepali, https://dialogue.earth/en/business/in-indias-steelmaking-hubs-small-businesses-have-no-easy-fix-to-go-green/
next phase, "take it into Dialogue Earth's next phase", https://www.saxbam.com/insights/appointments/marek-pruszewicz-joins-dialogue-earth-as-new-ceo/
fewer people come across climate news, "the number of people who saw, read, or heard climate information is falling, from 55% in 2023 to 47% in 2025", https://dialogue.earth/en/climate/dialogue-earth-at-20-we-will-not-vacate-the-space/
Raka enabled 23 markets with self serve insights at Heineken, docs/astra-master-context.md section 2A, https://www.linkedin.com/in/raka-mulya-b92885196
recheck: every claim reopened 2026-10-06 between 06:30 and 06:45 UTC, about page, both job ads, the 20 year piece, saxbam and the dated language stories fetched live. The Hindi and Bengali dates were checked two ways that don't share a failure mode, the language page listings and the sitemap's post ids, and the dating method has a control, English 2026-10-05 and Chinese 2026-10-01 came back through the same path. Red team, three things could make this land badly. They may have chosen to cut the South Asian languages for funding reasons, which is the cost we'd lower rather than a reason it's wrong. Their job ads reject cover letters written entirely by AI, so the offer has to be AI drafts that their editors check, which is how their own ads already describe the work. And a charity may not buy, which is Raka's call. Thesis, the South Asian editions stall because translation is manual, confidence MEDIUM
sweep website: https://dialogue.earth/ crawled twice (80 pages each) and rendered through curl_cffi on 3 Oct, a modern daily newsroom with nothing dated or broken. The website finding is the stalled language editions in its own language switcher, carried into the apps angle
sweep gdpr: tools/eu-view.py from Stockholm 2026-10-06 on https://dialogue.earth/ , _ga and _ga_88YKZWT63X set and px.ads.linkedin.com and snap.licdn.com requested before a click, banner offers only "Accept and close" while the cookie policy promises a reject tool, real but an afternoon's plugin change, fails the tweak test
sweep apps: the job ads https://dialogue.earth/en/jobs/china-editor/ and https://dialogue.earth/en/jobs/brazil-editor/ put "translation processes" and "checking translated content" on editors by hand, and the language editions those editors can't cover have stalled, the AI translation workflow with editor review is the chosen angle
sweep social: tools/social-audit.js on the accounts in their homepage HTML, Instagram 5,132 followers with the latest post 2026-10-01, LinkedIn 11,511 followers posting 6 Oct, Facebook UNKNOWN behind a login, X self described as not updated, no costly pain
sweep squad: https://dialogue.earth/en/about/ lists about 45 staff and no developer or product role, but there's no backlog or tech hiring on https://dialogue.earth/en/jobs/ to write a squad message on, so the build need is folded into the translation workflow
thread: problem stories not reaching Hindi and Bengali readers because translation into the eight languages is done by hand | cost the gap grows with every new story that stays in English as he takes the charity into its next phase | offer the AI workflow that gets every story into all eight languages with editors checking | link languages
lead read: Marek reads that his eight language newsroom has let Hindi and Bengali go quiet so South Asian readers miss his team's stories, and is offered the AI workflow that gets every story into all eight languages.
```

OPENER

```
Hi Marek, saw Dialogue Earth, looks interesting!

However, your site is offered in eight languages, yet Hindi hasn't had a new story since July and Bengali none since 2024. This causes Hindi and Bengali readers to miss the stories your South Asia team writes about their own region.

Especially, when you are taking Dialogue Earth into its next phase while fewer people come across climate news, the gap grows with every story that stays in English.

I run Astra agency. We build AI workflows for brands like Unilever, AXA, Pertamina. I enabled 23 markets with self serve insights at Heineken, so I know what it takes for one central team's work to reach every market.

Shall I send you over what the AI workflow for all eight languages looks like?
```

## Ollie Bartlett, Collier Pickard Ltd, ctc_y3mjzEXbiLzEHSAMB

- Thread: 0 activities, sentOnly shows the 22 Sep 08:49 UTC connect note only, accepted 23 Sep 20:55 UTC (linkedinInviteAccepted act_aSgynepXCCcLS5git). Queue: NO_STRONG_ANGLE five times, last 3 Oct, never messaged.
- Record (lea_Nt72238ZBGyv8bzFh): jobTitle "Owner", tagline "Co-owner at Collier Pickard". The 3 Oct row cites Companies House, P&B Business Solutions Ltd 15544003 owning Collier Pickard 04961587 since 28 Aug 2025 with Ollie and Laurie Probert at 25 to 50% each. Not reopened today because the verdict doesn't rest on it.
- A, disproven: https://www.collierpickard.co.uk/ reopened today sells "CRM, CX & Workflow Management", Creatio "Automate workflows without a line of code", "strategic CRM and automation solutions" and an "AI Readiness Check". He sells this work, so the brief excludes him. B, disproven: the homepage already leads with the new "Independent CRM Consultancy ... Consultancy First. Technology Second." offer and a £3,500 entry price, with JSON-LD modified 2026-08-04. The 3 Oct sweep read all 306 sitemap pages and found the site rebuilt around this offer. Wayback CDX failed through the proxy twice (ws_closed_mid_exchange), so it's written down as walled.

Verdict: NO_SIGNAL. A peer who sells automation, on a site that already serves where he's heading.

## David Risser, Ethics & Boards, ctc_satcBNYw3AiFrhofe

- Thread: 0 activities, sentOnly shows the 24 Sep 12:44 UTC connect note only, accepted, lastRepliedAt null. Queue: NO_STRONG_ANGLE three times, then 3 Oct CLOSED_NOT_ICP, never messaged.
- Record (lea_T9w33m5EpBkXKkE8Z): jobTitle "CEO", tagline "CEO - Ethics & Boards, Governance Intelligence & Advisory". Register reopened today, https://recherche-entreprises.api.gouv.fr/search?q=523584555 , "FLORIANE DE TROULLIOUD DE LANVERSIN (DE MEHERENC DE SAINT-PIERRE) Président de SAS", "DAVID JAN RISSER Directeur Général". The founder has been Président since 2012 and he was appointed DG on 29 Sep 2025 (Pappers and BODACC per the 3 Oct evidence file).
- Even read as a CEO, both angles fail. For A, the firm already sells AI assisted extraction ("powered by human and artificial intelligence" on /services/data/ per the 3 Oct crawl of 852 pages). For B, the site was relaunched on 2 Oct 2026 ("notre nouveau site", their LinkedIn post).

Verdict: CLOSED_NOT_ICP. He's a hired DG in the founder's company, and she still presides. If you want this account, the legacy client login at data.ethicsandboards.com (nginx/1.8.0, jQuery 1.8.3, no reset link) is the angle, but it belongs to Floriane de Saint Pierre.
