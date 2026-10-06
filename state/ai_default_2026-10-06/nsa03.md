# nsa03, AI default angle rescreen, 2026-10-06

Eight leads, all eight already had a real message from us, so every draft below is a NUDGE that refers back to what we said. Four drafts (Anu, Simon, Mykyta, Richard-Gabriel), four with no draft.

**Checks run this session, 2026-10-06**
- `get_inbox_conversation` on all 8 contactIds, one page each, `nextPage` null on all 8, LinkedIn sync `recent` 2026-10-06T06:14:43Z. Six threads hold 1 message each (our real first message), Lars and Yolanda hold 3. Nobody has ever replied. The two 3 message threads double as the positive control, they came back full through the same call in the same minutes.
- `get_inbox_conversations` sentOnly search on "Lars Tibben" and "Yolanda Heeren" (no leadId on file): one conversation each, same contactId, `lastRepliedAt` null.
- `search_campaign_leads` by leadId on the 6 with a leadId, all in v0.1 (cam_PryZp5LuvQv8NznHh), which now reads **paused**.
- Queue (`state/silent_accepted_queue.jsonl`) grepped by contactId, latest row for all 8 is NO_STRONG_ANGLE from the 3 Oct three day sweep, details in state/drafted_2026-10-03-due3-B02, B03, B04, B09, B10.
- Registers: Companies House 14329535 (Ready Study Global, sole director Cuzic), recherche-entreprises SIREN 992192559 (Le Stud SAS, Président Simon Chuinard), IOTENTIC Impressum HRB 803500 (three Geschäftsführer including Kharchenko) plus northdata via search, Anu's own privacy page ("Legal status: Sole trader").
- Sites crawled twice with tools/crawl.py, pass 2 equal to pass 1 everywhere. site-audit.js on all six live domains. social-audit.js on every account linked from their HTML or lemlist. news.py for company, person, region and industry, controls full each time (Tesco 100, Carrefour 98, Volkswagen 102).
- Wayback CDX was unreachable through our proxy (connection closed mid exchange), so no redesign dates are claimed.

| Lead | Verdict |
|---|---|
| Anu Pitman | DRAFT_A, MEDIUM |
| Simon Chuinard | DRAFT_A, MEDIUM |
| Semjon Mamontov | NO_SIGNAL |
| Maria Marshall-Clarke | CLOSED_NOT_ICP |
| Mykyta Kharchenko | DRAFT_B, MEDIUM |
| Richard-Gabriel Cuzic | DRAFT_A, MEDIUM |
| Lars Tibben | DO_NOT_CONTACT (standing written instruction) |
| Yolanda Heeren | NO_SIGNAL |

---

## Anu Pitman, Anu Pitman Accountancy, ctc_YR7cc276Goo7Fdi2F

- Thread: 1 item. OUR REAL MESSAGE 2026-08-31T15:31Z, outbound, "it never shows you're FMAAT and Xero certified, and there's no easy way to book a first call ... want me to send it over?" No reply, nothing else sent.
- Record: jobTitle "Business Owner", tagline "AAT Licenced Accountant ... Xero Certified | FMAAT", summary "founder of Anu Pitman Accountancy". Privacy page "Legal status: Sole trader". Owner, passes.
- Prior verdict 3 Oct: both August points fixed (AAT licence, Xero badge and "Make an appointment" now on the site). Confirmed today, so neither is repeated.

**Verdict: DRAFT_A.** She's one person promising monthly management accounts and a real conversation about the numbers all year to every client, with monthly and fortnightly reviews in the higher plans. The month end pack and its write up is the job that grows with every client she signs.

```gate
lead: Anu Pitman, Anu Pitman Accountancy, ctc_YR7cc276Goo7Fdi2F, lea_56mdqojn2dDp8gMGY. Sole trader per her privacy page, Greenlaw, Scottish Borders
site pass 1: 6 pages (13 URLs, 7 were 404 crawler artefacts), sitemap plus link crawl with tools/crawl.py, every page read
site pass 2: 6 pages, second full crawl, same count, site-audit.js desktop and phone screenshots of the homepage
deep analysis: IONOS MyWebsite NOW site, home, about, growth plans, contact, legal, privacy. Growth Plans now carries three priced packages (Foundation Growth, Scale-Up Partner, Virtual CFO) with quarterly, monthly and fortnightly reviews. About says "My clients get monthly management accounts, proactive tax planning, and a real conversation about their numbers throughout the year" and "Real availability". Everything is written in the first person, one accountant. She sells receipt capture apps and dashboards to clients, so she knows the tools, but nothing on the site says her own month end reporting is automated
owner linkedin: route 1 lemlist record read in full (summary, tagline). Route 2 web search "Anu Pitman" accountancy Greenlaw, nothing about her. Route 3 company page https://www.linkedin.com/company/anu-pitman-accountancy read with social-audit.js, tagline "Reliable accounting solutions", follower count not shown. Route 4 personal /in/ profile 999 as expected. Routes 5 and 6, no other social linked from her HTML (site-audit.js social NONE LINKED against its control)
contact linkedin: same person, owner and the person messaged, lemlist and privacy page agree
google news: tools/news.py en, "Anu Pitman Accountancy" 0, "Anu Pitman" 0, control Tesco 100
regional news: tools/news.py (Scottish Borders) (accountants Making Tax Digital sole traders) 0
industry news: tools/news.py accountants Making Tax Digital sole traders 100, HMRC starting MTD for Income Tax automatic enrolment (TaxAssist, 2026-10-03), Small Business UK on MTD actions (2026-09-22). More quarterly digital filing lands on small practices
sources:
1. https://www.ap-accountancy.co.uk/
2. https://www.ap-accountancy.co.uk/about/
3. https://www.ap-accountancy.co.uk/growth-plans/
4. https://www.ap-accountancy.co.uk/contact/
5. https://www.ap-accountancy.co.uk/privacy/
6. https://www.ap-accountancy.co.uk/legal/
7. https://www.linkedin.com/company/anu-pitman-accountancy
8. https://www.linkedin.com/in/anu-pitman-fmaat-218125160 (walled, 999)
9. https://news.google.com (tools/news.py, four queries plus control)
10. https://www.taxassist.co.uk (HMRC MTD automatic enrolment item, via news.py)
11. https://smallbusiness.co.uk (MTD actions item, via news.py)
12. https://web.archive.org/cdx/search/cdx?url=ap-accountancy.co.uk (unreachable through our proxy)
pains: 4 judged. (1) monthly management accounts and reviews promised by one person, grows with each client, costliest. (2) MTD for Income Tax adds quarterly filings for her sole trader clients, real and industry wide, but it's the same capacity pain from another side. (3) the homepage still leaves the credentials out, a tweak, and the same criticism as August. (4) GDPR, IONOS banner with reject, 0 trackers before a click, nothing to claim
chosen: (1), costliest, it's the hours she sells and the ceiling on how many clients one person can take
sweep website: 6 pages crawled twice, both August fixes confirmed live, nothing left that passes the tweak test
sweep gdpr: site-audit.js banner yes, reject present, 0 cookies and 0 third party before a click, no consent code so no geo rule, clean
sweep apps: the monthly reporting promise on /about/ against a sole trader, the A angle
sweep social: social-audit.js on https://www.linkedin.com/company/anu-pitman-accountancy, readable, no posts visible signed out, no other account linked, no angle
sweep squad: sole trader accountant, no build team, not a squad fit
thread: problem monthly management accounts promised to every client by one person | cost every new client adds another month end to her own hours | offer the AI month end workflow for her practice | link month
lead read: Anu reads that we noticed the August points are fixed, that her site promises monthly management accounts to every client and she's the only one doing them, and gets offered the AI workflow for that month end, one thread
claims:
both August points now on the site, https://www.ap-accountancy.co.uk/about/ (AAT licence 1004084, Xero Tax Specialist badge) and https://www.ap-accountancy.co.uk/contact/ ("Make an appointment"), fetched 2026-10-06
her clients get monthly management accounts and a real conversation about the numbers all year, https://www.ap-accountancy.co.uk/about/ "My clients get monthly management accounts, proactive tax planning, and a real conversation about their numbers throughout the year", fetched twice 2026-10-06
she's one person, https://www.ap-accountancy.co.uk/privacy/ "Legal status: Sole trader", first person throughout https://www.ap-accountancy.co.uk/about/
recheck: 2026-10-06, /about/ and /privacy/ refetched with curl after the crawl, both sentences present. Confidence MEDIUM, the facts are HIGH, the size of the reporting load is inference since her client count isn't public
```

### Anu, NUDGE

```
Anu, back in August I wrote about showing your credentials and making it easy to book a call. Both are live now.

A new thought. Your About page says your clients get monthly management accounts and a real conversation about their numbers all year, and you're the one doing all of them. Each client you add is another month end on your hours.

Shall I send you over what the AI month end workflow for your practice looks like?
```

---

## Simon Chuinard, Le Stud' Pilates Reformer, ctc_QdhtaeDvqahLSQcSM

- Thread: 1 item. OUR REAL MESSAGE 2026-09-02T18:41Z, outbound, "there is no timetable, no prices and no real online booking ... Want me to?" No reply, nothing else sent.
- Record: jobTitle "Co-founder / head coach", tagline "Co-founder : Le Stud' Reformer". Register SIREN 992192559, LE STUD SAS, created 2025-10-01, Président de SAS Simon Chuinard. Owner, passes.
- Prior verdict 3 Oct: the booking gap is fixed, bsport widget on /reserver/ and "Nos tarifs" in the menu. Confirmed today, so it isn't repeated.

**Verdict: DRAFT_A.** /nos-tarifs/ says the annual memberships are full and sends people to a Google Form waitlist titled "Liste d'attente pour les abonnements au Stud'" that promises to contact them when a place frees up. A two person studio working a waitlist by hand is the job, and an automated waitlist that offers the freed place straight away is the offer.

```gate
lead: Simon Chuinard, Le Stud SAS (SIREN 992192559), Cherbourg-en-Cotentin, ctc_QdhtaeDvqahLSQcSM, lea_Gb2MyBqi5SoLvBfhD
site pass 1: 80 URLs (cap), link crawl with tools/crawl.py. 13 real content pages (home, le pilates reformer, notre concept, notre equipe, nos seances, nos tarifs, reserver, contact-2, newsletter, cgv, terms-conditions) plus the rest theme demo posts and media attachment pages, all read
site pass 2: 80 URLs, second full crawl, same count, site-audit.js desktop and phone screenshots of the homepage, opened (photo hero, cookie banner)
deep analysis: Elementor on The7 theme. Two people, Simon and Lauren. Two formats, Pilates Reformer 50 min and Instant Reformer 40 min at lunch. Cards from 1 to 50 sessions and two annual memberships, both full ("Nos abonnements sont actuellement complet"), waitlist on a Google Form with name, email, phone, which membership and consent to be contacted. Booking runs through bsport. The theme's demo content is still public (/hello-world/, /why-lorem-ipsum-is-awesome/ and a /contact-2/ page with a Napa Valley winery address), recorded, not used, different family
owner linkedin: route 1 lemlist record and summary read. Route 2 web search "Simon Chuinard" Le Stud pilates Cherbourg, result title "Simon Chuinard - Coach sportif - Indépendant" for https://www.linkedin.com/in/simon-chuinard-02a853189/ (tier G headline). Route 3 pappers listing for LE STUD SAS in the same search. Route 4 /in/ profile 999. Route 5 company LinkedIn not linked from the HTML. Route 6 Instagram read with social-audit.js
contact linkedin: same person, owner and the person messaged, register and lemlist agree
google news: tools/news.py fr, "Le Stud Cherbourg" 1 (Actu.fr 2026-04-26, "Cherbourg, on a testé pour vous le Pilates Reformer"), "Simon Chuinard" 7 (trail and marathon results 2022 to 2025), control Carrefour 98
regional news: tools/news.py (Cherbourg) (pilates reformer studio) 1, the same Actu.fr piece
industry news: tools/news.py pilates reformer studio 100, a wave of new reformer studios opening across France in September 2026 (Saint-Junien, Billère, Chatte, Bordeaux, Tours), and Gala 2026-10-05 on a Clermont-Ferrand studio whose reformer classes "affichent complet". Demand is high and competition is arriving
sources:
1. https://www.lestud-reformer.fr/
2. https://www.lestud-reformer.fr/nos-tarifs/
3. https://www.lestud-reformer.fr/nos-seances/
4. https://www.lestud-reformer.fr/reserver/
5. https://www.lestud-reformer.fr/notre-equipe/
6. https://www.lestud-reformer.fr/terms-conditions/
7. https://forms.gle/HDCN2gZEbaexttGA6 (resolves to docs.google.com/forms, title "Liste d'attente pour les abonnements au Stud'")
8. https://recherche-entreprises.api.gouv.fr/search?q=992192559
9. https://www.pappers.fr/entreprise/le-stud-sas-992192559 (search result)
10. https://www.instagram.com/lestudreformer/
11. https://www.linkedin.com/in/simon-chuinard-02a853189/ (walled, 999, headline from search)
12. https://news.google.com (tools/news.py, four queries plus control)
13. https://actu.fr (2026-04-26 Le Stud piece, via news.py)
pains: 4 judged. (1) memberships full, freed places handled through a Google Form waitlist by hand, costliest because an annual membership is the studio's steadiest revenue and a place left empty while the list is worked is lost income. (2) theme demo posts and a US winery contact page still public, real but a cleanup, website family. (3) new reformer studios opening across France, a market pressure, not something we fix directly. (4) GDPR, GEO VOID on site-audit.js (CookieYes plus Site Kit), EU view not run, nothing claimed
chosen: (1), costliest, it's the membership revenue and it's visible in their own words
sweep website: 80 URLs crawled twice, booking fixed, demo leftovers recorded and left out, different thread
sweep gdpr: site-audit.js GEO VOID, consent code present, no EU claim made
sweep apps: the full memberships and the Google Form waitlist on https://www.lestud-reformer.fr/nos-tarifs/, the A angle
sweep social: social-audit.js on https://www.instagram.com/lestudreformer/ 2156 followers, 30 posts, latest 2026-10-01, active, no angle
sweep squad: a two person studio, no build team, not a squad fit
thread: problem memberships full and the waitlist is a Google Form worked by hand | cost every freed place waits while someone works the list | offer the AI waitlist workflow that refills memberships | link waitlist, memberships
lead read: Simon reads that we saw bsport is live, that his memberships are full with a Google Form waitlist someone works by hand, and gets offered an AI waitlist that refills those memberships, one thread
claims:
bsport is live on the site, https://www.lestud-reformer.fr/reserver/ mounts BsportWidget (bsport-widget-584013), fetched 2026-10-06
the annual memberships are full, https://www.lestud-reformer.fr/nos-tarifs/ "Nos abonnements sont actuellement complet", fetched twice 2026-10-06
the waitlist is a Google Form that promises to contact people when a place frees up, https://forms.gle/HDCN2gZEbaexttGA6 description "rejoindre la liste d'attente et être contacté lorsqu'une place pour un abonnement se libère", fetched 2026-10-06
recheck: 2026-10-06, /nos-tarifs/ refetched with curl after the crawl, "actuellement complet" and the forms.gle link present. Confidence MEDIUM, the facts are HIGH, that the list is worked by hand is inference from a Google Form that only collects contact details
```

### Simon, NUDGE

```
Simon, in September I wrote about booking. bsport is live on the site now, so that's sorted.

Something new. Your annual memberships are full and the waitlist is a Google Form that promises to contact people when a place frees up. So every freed place sits empty while someone works through that list by hand.

Shall I send you over what the AI waitlist workflow that refills your memberships looks like?
```

---

## Semjon Mamontov, Buynidify, ctc_nkQXNnHKZH4jz2ehF

- Thread: 1 item. OUR REAL MESSAGE 2026-09-02T18:41Z, outbound, "the whole site points to one Fund this project link ... Want me to?" No reply, nothing else sent.
- Record: jobTitle "Co-Founder", tagline "Marketing Director", jobDescription "Co-founded Buynidify, focusing on Marketing & Design". Owner screen passes as co-founder.
- Prior verdict 3 Oct: the thin page we pitched is gone.

**Verdict: NO_SIGNAL.** A fails, Buynidify sells AI. https://buynidify.com/ rendered today (site-audit.js, screenshot opened) calls itself "The UK's first AI-powered property platform", with an AI listing analysis, "Linda, our relocation concierge" (Relocate AI) and "Emil", a 24/7 AI support agent. A company that builds AI agents into its product isn't an AI workflow lead. B fails too, the site was rebuilt into a full platform with Investor, Tenant and Corporate journeys, search, /listings, /partners and sign in, so it already serves the raise and the UK move. news.py "Buynidify" 0 and "Semjon Mamontov" 0, control Tesco 100. Nothing left to pitch on either default.

---

## Maria Marshall-Clarke, World Happiness Foundation, ctc_gwPTszWN8NAhc4fQN

- Thread: 1 item. OUR REAL MESSAGE 2026-09-02T18:51Z, outbound, the partner pathway pitch. No reply, nothing else sent.
- Record: jobTitle "Global Executive Director", jobDescription "As Global Executive Director at the World Happiness Foundation, I contribute to the strategic development". companyDescription names "Luis Gallardo, Founder & President". Her tagline lists her own co-founded ventures (Human Lab, HAANA), which aren't the business we'd be writing about.

**Verdict: CLOSED_NOT_ICP.** She's an executive at a nonprofit someone else founded and runs, so there's nothing here for her to buy as an owner. The 3 Oct row had already found the partner pathway we pitched now exists on /en/ecosystems.

---

## Mykyta Kharchenko, IOTENTIC GmbH, ctc_2gRN4DKWsstCjknF6

- Thread: 1 item. OUR REAL MESSAGE 2026-09-05T09:38Z, outbound, a peer note: "There might be an overlap on my side ... dashboards, internal tools and automations ... What are you focused on at IOTENTIC right now?" No pitch, no claim about his site. No reply.
- Record: jobTitle "Managing Director & Founder". Impressum, HRB 803500 Amtsgericht Stuttgart, "Vertreten durch: Florian Fries, Muhammad Sohaib Nazir, Mykyta Kharchenko". northdata (search result) has him as GF since 2026-01-19. One of three owner managers, passes.
- Prior verdict 3 Oct: no angle, because they sell Datenvisualisierung and hire automation engineers. That still kills A. They sell automation and "KI-gestützte Entscheidungen" (AI supported decisions) themselves and sit in FORCAM ENISCO's AI in manufacturing network.

**Verdict: DRAFT_B.** The founders page calls IOTENTIC a "weltweit tätiges Unternehmen" (a company working worldwide), the careers page reaches as far as gigafactories, and partners include Battery Advisors. But the body text on all 15 pages is German, and English only exists as Google's machine translation (`TranslatorSettings ... "languages":["en","de"], "url_structure":"none"`), which loads only after the visitor accepts it ("Wir benötigen Ihre Zustimmung zum Laden der Übersetzungen"). A new firm with no reference projects of its own is being judged by foreign buyers on a machine translation. Flag for Raka. This is a website pitch to an engineering firm, and the credential that fits best here (Heineken, 23 markets) doesn't fit in an 80 word nudge, so I left it out.

```gate
lead: Mykyta Kharchenko, IOTENTIC GmbH (HRB 803500, Herrenberg), ctc_2gRN4DKWsstCjknF6, lea_3h2c3xzR4wwXRoeTC
site pass 1: 15 pages (31 URLs, 16 were ${findUrl} template 404s from the builder's script), sitemap plus link crawl with tools/crawl.py, every page read
site pass 2: 15 pages, second full crawl, same count, site-audit.js desktop and phone screenshots of the homepage
deep analysis: IONOS MyWebsite NOW site. Home, Leistungen, Partner (7 partners incl. FORCAM ENISCO, Cybus, Pusch-Data, VDW umati, Battery Advisors, RESYCON), Founders (three MDs with Cellforce, Zeltwanger, groninger backgrounds), News (three items Apr to Jul 2026), Karriere (Automation Engineer, Werkstudent), Kontakt (one form). Page titles are English, body text is German on all 15 (crawl lang de on all 15). No reference projects or client cases of their own anywhere. English comes only from a consent gated Google Translate widget with no English URLs
owner linkedin: route 1 lemlist record read. Route 2 web search "Mykyta Kharchenko" IOTENTIC, northdata and registercheck listings, GF since 2026-01-19. Route 3 company page https://www.linkedin.com/company/iotentic-gmbh with social-audit.js, 198 followers, "From automation to innovation". Route 4 /in/ profile 999. Route 5 no social linked from the HTML (site-audit.js NONE LINKED against control). Route 6 zoominfo result for the same name at EPAM, not tied to him, not used
contact linkedin: same person, an owner manager and the person messaged, Impressum and lemlist agree
google news: tools/news.py de, "IOTENTIC" 0, "Mykyta Kharchenko" 0, control Volkswagen 102
regional news: tools/news.py (Herrenberg OR Böblingen) (MES Integration Batterie Gigafactory) 0
industry news: tools/news.py MES Integration Batterie Gigafactory 0, plus their own /news/ page, FORCAM ENISCO adding IOTENTIC to its AI in manufacturing partner network (2026-07-14) and MOVEMORE Kompetenzverbund (2026-05-04)
sources:
1. https://www.iotentic.com/
2. https://www.iotentic.com/founders/
3. https://www.iotentic.com/karriere/
4. https://www.iotentic.com/partner/
5. https://www.iotentic.com/news/
6. https://www.iotentic.com/leistungen/
7. https://www.iotentic.com/impressum/
8. https://www.northdata.de/IOTENTIC%20GmbH,%20Herrenberg/Amtsgericht%20Stuttgart%20HRB%20803500 (search result)
9. https://www.registercheck.de/companies/iotentic-gmbh (search result)
10. https://www.linkedin.com/company/iotentic-gmbh
11. https://news.google.com (tools/news.py, four queries plus control)
12. https://www.linkedin.com/in/mykyta-kharchenko-75997423b (walled, 999)
pains: 4 judged. (1) a firm that calls itself worldwide reaches foreign buyers only through a consent gated machine translation, biggest given where they say they're going. (2) no reference projects of their own, real and costly for a new integrator, but the fix is content they have to supply, folded into (1) as the site rebuild. (3) A, efficiency, fails, they sell automation and AI themselves. (4) GDPR, IONOS banner with reject, 0 trackers before a click, clean
chosen: (1), biggest, it's the site that every foreign buyer reads, and the gap is provable in their own HTML
sweep website: 15 pages crawled twice, German body text everywhere, English only via Google Translate after consent, the B angle
sweep gdpr: site-audit.js banner yes, reject present, 0 cookies, 0 third party before a click, no consent code so no geo rule, clean
sweep apps: they sell automation, data visualisation and AI supported decisions, A fails by the brief's own rule
sweep social: social-audit.js on https://www.linkedin.com/company/iotentic-gmbh 198 followers, no other account linked, no angle
sweep squad: an engineering integrator hiring automation engineers we don't supply, the 3 Oct row ruled it out and nothing new changes that
thread: problem every page is German and English only appears as a machine translation after consent | cost foreign manufacturers judge a worldwide firm on that version | offer the English site that wins international manufacturers | link English, international
lead read: Mykyta reads that his own pages call IOTENTIC worldwide while every page is German and English is only a Google translation after consent, and gets offered the English site that wins international manufacturers, one thread
claims:
the founders page calls IOTENTIC a company working worldwide, https://www.iotentic.com/founders/ "weltweit tätiges Unternehmen für industrielle Digitalisierung", fetched 2026-10-06
the careers page reaches as far as gigafactories, https://www.iotentic.com/karriere/ "bis hin zu Traceability und Gigafactories", fetched 2026-10-06
the text on every page is German, https://www.iotentic.com/ and all 15 crawled pages lang de, read twice 2026-10-06
English only appears as a Google machine translation after a visitor accepts it, https://www.iotentic.com/ TranslatorSettings languages en and de with translate.google.com element.js, and "Wir benötigen Ihre Zustimmung zum Laden der Übersetzungen", fetched 2026-10-06
recheck: 2026-10-06, founders, karriere and homepage refetched with curl after the crawl, all three strings present. Confidence MEDIUM, facts HIGH, that foreign buyers are lost on it is inference
```

### Mykyta, NUDGE

```
Mykyta, in September I suggested we might overlap on the software layer. Here's a different thought.

Your founders page calls IOTENTIC a company working worldwide, and your careers page reaches as far as gigafactories, but the text on every page is German. English doesn't appear except as a Google machine translation, after a visitor accepts it.

Shall I send you over what the English site that wins international manufacturers looks like?
```

---

## Richard-Gabriel Cuzic, Ready Study Global (and Switalk), ctc_pAPukszq8MBpRfYrT

- Thread: 1 item. OUR REAL MESSAGE 2026-09-05T09:38Z, outbound, a peer note: "I am probably more useful to swap notes with than anything else right now. How is Switalk going?" No pitch. No reply.
- Record: jobTitle "Founder", tagline "Co-Founder @ Switalk | Founder @ Ready Study Global". Companies House 14329535, READY STUDY GLOBAL LTD, 1 officer, CUZIC Richard-Gabriel, active director, 0 resignations. Owner, passes.
- Prior verdict 3 Oct: nothing to chase, because a full stack co-founder (Claudiu) builds Switalk. That holds for Switalk only. Ready Study Global is his alone and has no builder named.

**Verdict: DRAFT_A.** The site describes a six step guidance process where "RSG reviews the information you provided. We identify missing facts, route conflicts and questions that require confirmation". It aims for a human response within one working day, across twelve destinations and three routes, and the About page names him as "Founder and first point of contact". That first review is the hours job, and an AI first review that drafts it from the Guidance Finder answers is the offer.

```gate
lead: Richard-Gabriel Cuzic, Ready Study Global LTD (Companies House 14329535, sole director), ctc_pAPukszq8MBpRfYrT, lea_daCbJGAX9Y2n4MF39
site pass 1: 80 URLs (cap, www and bare host duplicate each other, about 40 distinct pages), link crawl with tools/crawl.py, home, study abroad, home students, destinations and 7 destination pages, how it works, apply (Guidance Finder), about, partners, contact, courses, privacy, terms, cookies, 20 blog guides, all read
site pass 2: 80 URLs, second full crawl, same count, site-audit.js desktop and phone screenshots of the homepage
deep analysis: Astro build, careful copy. Free guidance funded by institution commission after enrolment. Guidance Finder is a multi question intake for three routes (study abroad, UK resident, paid online), 12 destinations on the international route. How it works lists six waypoints, the Review step is done by RSG by hand ("RSG reviews the information you provided"), aim "Within one working day", "Automated acknowledgements do not count as a human response". About names one person, him, "Founder and first point of contact". Partners page recruits tutors, agencies and institutions. No named advisors anywhere
owner linkedin: route 1 lemlist record and summary read in full. Route 2 web search "Richard-Gabriel Cuzic" Ready Study Global, Companies House officers and the About page. Route 3 company page https://www.linkedin.com/company/readystudyglobal with social-audit.js, 138 followers. Route 4 /in/ profile 999. Route 5 Facebook and Instagram from the HTML with social-audit.js. Route 6 talents.studysmarter.co.uk company page, commission based remote consultants, no listed openings
contact linkedin: same person, owner and the person messaged, Companies House and lemlist agree
google news: tools/news.py en, "Ready Study Global" 0, "Richard-Gabriel Cuzic" 0, control Tesco 100
regional news: tools/news.py (London) (international students UK universities recruitment agents) 79, UK student visa applications falling (VnExpress 2026-08-20), a UK university's licence suspended (OnlineKhabar 2026-10-06)
industry news: tools/news.py international students UK universities recruitment agents 100, JADE seed round to unify university agent networks (Dealroom 2026-10-05), Home Office agent guidance (ICEF Monitor 2026-04-15). Tighter scrutiny means more checking per applicant
sources:
1. https://readystudyglobal.com/
2. https://readystudyglobal.com/how-it-works
3. https://readystudyglobal.com/apply
4. https://readystudyglobal.com/about
5. https://readystudyglobal.com/contact
6. https://readystudyglobal.com/partners
7. https://find-and-update.company-information.service.gov.uk/company/14329535/officers
8. https://www.linkedin.com/company/readystudyglobal
9. https://www.facebook.com/people/Ready-Study-Global/61579406294679/
10. https://www.instagram.com/readystudyglobal/
11. https://talents.studysmarter.co.uk/companies/ready-study-global/
12. https://news.google.com (tools/news.py, four queries plus control)
pains: 4 judged. (1) every guidance request gets a human first review by a one person firm, the founder is the first point of contact while also co-founding Switalk and finishing a degree, costliest, it caps how many students he can take and the commission comes per enrolled student. (2) falling UK student visa numbers, a market pain, not ours to fix. (3) GDPR, CookieYes with Google consent mode, GEO VOID on site-audit.js, EU view not run, nothing claimed. (4) social, Instagram 16 followers and 6 posts, small but alive, a weak channel, no angle
chosen: (1), costliest, it's the step every student passes through and the one person doing it
sweep website: about 40 distinct pages crawled twice, a strong modern site, no website angle
sweep gdpr: site-audit.js GEO VOID, CookieYes plus gtag consent, no EU claim made
sweep apps: the hand done first review on https://readystudyglobal.com/how-it-works against one named founder on /about, the A angle
sweep social: social-audit.js on LinkedIn 138 followers, Instagram 16 followers latest 2026-10-05, Facebook 119 followers latest yesterday, all alive, no angle
sweep squad: no builder named for RSG, Switalk has its own developer, not a squad fit
thread: problem every Guidance Finder request gets a human first review and he's the first point of contact | cost that review caps how many students he can take | offer the AI first review workflow | link review, first
lead read: Richard-Gabriel reads that his site promises a human first review of every request inside a working day, with him as the first point of contact, and gets offered an AI workflow that does that first review, one thread
claims:
the site aims to answer Guidance Finder requests with a human review within one working day, https://readystudyglobal.com/how-it-works "Human response aim Within one working day" and "RSG reviews the information you provided", fetched twice 2026-10-06
twelve destinations, https://readystudyglobal.com/apply international route lists United Kingdom, United States, Canada, Australia, Germany, Ireland, France, Spain, Malta, United Arab Emirates, Malaysia, Singapore, counted 2026-10-06
the About page names him as the first point of contact, https://readystudyglobal.com/about "Richard Gabriel Cuzic Founder and first point of contact at Ready Study Global", fetched twice 2026-10-06
recheck: 2026-10-06, /how-it-works and /about refetched with curl after the crawl, both strings present. Confidence MEDIUM, facts HIGH, enquiry volume isn't public so the cap is inference
```

### Richard-Gabriel, NUDGE

```
Richard-Gabriel, in September I asked how Switalk was going. A thought on Ready Study Global instead.

Your site aims to give every Guidance Finder request a human review within one working day, across twelve destinations, and the About page names you as the first point of contact. So that first review's what caps how many students you can take on.

Shall I send you over what the AI first review workflow for RSG looks like?
```

---

## Lars Tibben, Studio Live Productions, ctc_8HL4vo9cA55Yugaav

- Thread: 3 items. 2026-09-06T14:49Z outbound connect note. 2026-09-14T07:13Z OUR REAL OPENER, outbound, "there's no footage anywhere on the site". 2026-09-28T12:20Z OUR CORRECTION, outbound, "On the 14th I told you there was no footage on your site, and there are videos on it ... Sorry about that." No reply.
- No leadId on file. A sentOnly search on the name returns this one contactId, `lastRepliedAt` null.
- Queue row of 2026-09-28, CORRECTION_SENT on Raka's word: "Do not pitch again unless they reply." The 3 Oct row kept it.

**Verdict: DO_NOT_CONTACT (standing instruction).** He didn't ask us to stop and we never promised a last message. But the last thing he heard from us was an apology for a false claim, and the recorded instruction says no new pitch until he replies. Nothing since overturns that, so I didn't research a new angle. If Raka wants to lift the hold, an AI angle would need fresh research, and it must not touch footage.

---

## Yolanda Heeren, YOOS! Design, ctc_v4Kie5QRq97eaoHPR

- Thread: 3 items. 2026-09-05T13:16Z outbound connect note. 2026-09-16T14:49Z OUR REAL OPENER, outbound, quote request under each project. 2026-09-28T11:52Z OUR NUDGE, outbound, "Would a short quote form under each project take some of those calls off you?" No reply. That's one follow up, so one more is allowed before a silent close.
- No leadId on file. A sentOnly search on the name returns this one contactId, `lastRepliedAt` null. The queue ties her to YOOS! Design through the slug, and https://yoosdesign.nl/contact-en-over-mij reads "Hallo, ik ben Yolanda Heeren, kantoorinrichter". Owner, passes.

**Verdict: NO_SIGNAL.** Both earlier points are answered on the live site. Every portfolio project now ends in "Bespreek een vergelijkbaar kantoorproject", and /contact-en-over-mij has a form (name, company, email, phone, message). A, the only hours job visible is building quotes and giving advice by hand, on YOOS! Design ("transparante offerte" after a kennismaking) and on the YOOS! Office Shopify shop ("Vraag advies voor meerdere werkplekken"). An AI quoting tool is the same quote theme she's ignored twice, and RULES 1B says a criticism ignored once isn't sent again. B, the second brand (yoosoffice.nl, workstation bundles from 502 euros with free delivery and assembly) is real growth. But both sites already cross link and the design site was rewritten since September, so there's no gap to point at. The last allowed follow up shouldn't go on a weak angle. Crawled twice (yoosdesign.nl 9 URLs, yoosoffice.nl 80 URLs at the cap). site-audit.js printed RENDER NOT TRUSTED on yoosdesign.nl (an mp4 our Chromium can't play, served 200 over curl), so no visual claim is made.
