# Drafts, batch 4, new accepts 2026-10-04 and 2026-10-05

Seven accepts that had no message (see state/accepts_2026-10-05.md). Each one went through a researcher agent
(RESEARCHER_BRIEF), a judge (JUDGE_BRIEF) and, where an opener survived, a red team (REDTEAM_BRIEF). Evidence,
judgements and the red team file are in /tmp/claude-0/agents/b4_*/ for this session.

Result, one opener (Emmanuel Rivière, MEDIUM, fixed after the red team), SENT 2026-10-05 10:35 UTC act_kfzvyHasM3kwQi89s, six closed.
Raka decides. Nothing is sent without his word, and the thread is re-pulled immediately before any send.

## Emmanuel Rivière, La Warroom

```gate
lead: Emmanuel Rivière, co-founder and partner of LA WARROOM SAS (SIREN 979 286 721, Paris, active), ctc_bF7KcGsTjT23mo3ye, lea_W6XAym27vjDxiSjqJ. lemlist jobTitle "Cofondateur et directeur associé", tagline "Cofondateur et Partner, La Warroom". Founders Thieulin, Rivière, Bouvet, Carlioz per https://www.cbnews.fr/conseil/faire-part-naissance-warroom . Register dirigeant is Benoît Thieulin, Président de SAS, https://recherche-entreprises.api.gouv.fr/search?q=la%20warroom . Thread pulled 2026-10-05 09:45 UTC, 0 activities, nextPage null, positive control ctc_YLmRL36CPuodKLwNX 4 items in the same minute
site pass 1: 34 URLs from https://lawarroom.ai/sitemap.xml , crawled by tools/crawl.py and rendered in Chromium by the researcher (Readymag, JS built), every page read
site pass 2: 34 URLs rendered again by the judge on 2026-10-05, text and hrefs read, two 502s from our side covered by pass 1, desktop and phone screenshots from site-audit.js opened by the researcher, dark deliberate design, not dated
deep analysis: A consultancy site with six "théâtres", three engagement tiers and ten bios, and no client or case named anywhere. It sells monitoring as a deliverable ("Système de monitoring temps réel") and its vision page says "Nous sommes agnostiques en termes d'outils". Since 9 Jul 2026 the company sells its own platform, Infowitz, with a public trial app at https://infowitz-lwr.live that the site never links. Lead intake is one contact form, and the newsletter's Infowitz CTA is a mailto
owner linkedin: Benoît Thieulin. Route 1 curl https://www.linkedin.com/in/benoitthieulin/ 999. Route 2 web search "Benoît Thieulin" "La Warroom" 2026, profile title "Benoît Thieulin - La WarRoom". Route 3 his X post "La Warroom est prête. Et vous ?" in results, not opened. Route 4 his own bio https://lawarroom.ai/thieulin/ "CEO". Route 5 news.py La Tribune 2026-04-26 "PDG de La WarRoom" (headline). Route 6 rocketreach listing in results, not opened
contact linkedin: not the register owner, a co-founder. Route 1 curl https://www.linkedin.com/in/emmanuelriviere/ 999. Route 2 search title "Emmanuel Rivière - La Warroom". Route 3 lemlist tagline and summary read. Route 4 his bio https://lawarroom.ai/riviere/ "Stratégies d'opinion". Route 5 https://www.parolepublique.fr/personnes/emmanuel-riviere/ "co-fondateur de La Warroom". Route 6 Bluesky https://bsky.app/profile/emmanuelriviere.bsky.social 221 followers
google news: tools/news.py fr, "La Warroom" 10 results (AOC 2026-10-01, La Tribune 2026-04-26), "Emmanuel Rivière" 100 mixed with a footballer, franceinfo 2026-07-22 is him, control Carrefour 100
regional news: tools/news.py (Paris) (désinformation ingérence) 60 results, Les Echos 2026-09-23 on the risk of Russian operations for the presidential election, Ouest-France 2026-09-18, France 24 2026-08-21 on Attal targeted again
industry news: tools/news.py désinformation ingérence 100 results, NewsGuard and BFM 2026-09-28/29 on an 850 percent rise in Kremlin campaigns in a year, plus the OSSIR deck https://www.ossir.org/paris/supports/2025/2025-12-09/OSSIR_LWR.pdf naming prefectures, metro and regional presidents and critical companies as buyers
sources:
1. https://lawarroom.ai/vision/
2. https://lawarroom.ai/vision-en/
3. https://lawarroom.ai/offre/
4. https://lawarroom.ai/sitemap.xml
5. https://lawarroom.ai/mentions-legales/
6. https://lawarroom.ai/riviere/
7. https://infowitz-lwr.live/
8. https://nawiv.r.a.d.sendibm1.com/mk/mr/sh/1f8JAEjGcfF85xuswOr21JfA9J/fYVD72zF7nFk
9. https://x.com/Lawarroom_ai
10. https://www.ossir.org/paris/supports/2025/2025-12-09/OSSIR_LWR.pdf
11. https://recherche-entreprises.api.gouv.fr/search?q=la%20warroom
12. https://www.cbnews.fr/conseil/faire-part-naissance-warroom
13. https://www.parolepublique.fr/personnes/emmanuel-riviere/
14. https://www.linkedin.com/company/la-warroom
15. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Flawarroom.ai
16. https://substack.com/@lawarroom
pains: 6 judged. (1) Website, Infowitz out of beta since 9 Jul and named on none of 34 pages while the vision page says tool agnostic, chosen. (2) GDPR, GA cookies before consent from Stockholm against their own Art. 5, a consent tool install, fails tweak. (3) Apps, they built Infowitz themselves, nothing to sell them. (4) Build Squad, no salaried staff and on client infrastructure deployments, unproven strain. (5) Social, 1,404, 238 and 21 followers, soft. (6) Minor site bugs, tweaks
chosen: (1), the hottest and biggest proven pain, their newest product line launched in July and the site every public buyer checks first still presents a tool agnostic consultancy, so the trial funnel at infowitz-lwr.live gets no traffic from it
sweep website: 34 pages of https://lawarroom.ai rendered twice, Infowitz named on none and https://lawarroom.ai/vision/ still says agnostiques en termes d'outils, chosen
sweep gdpr: tools/eu-view.py from Stockholm on https://lawarroom.ai sets _ga and _ga_XB09K2Q8L3 before any click while https://lawarroom.ai/mentions-legales/ Art. 5 promises prior consent and a banner, real but a consent tool install, fails the tweak test
sweep apps: https://infowitz-lwr.live is their own working app with login, bot scoring, Gephi and PDF exports and a free analysis form, they build software themselves, a tool pitch competes with their product
sweep social: tools/social-audit.js on https://www.linkedin.com/company/la-warroom 1,404 followers, https://substack.com/@lawarroom 21 followers, X via tools/fetch-walled.py 238 followers and 42 tweets, small but carried by the founders' press reach, not chosen
sweep squad: register https://recherche-entreprises.api.gouv.fr/search?q=la%20warroom shows no salaried staff and Infowitz runs on each client's infrastructure per the 9 Jul newsletter, plausible capacity strain but nothing shows missed delivery, second
thread: problem the site is silent on Infowitz and the vision page still argues against proprietary tools | cost a prefecture or region vetting them sees a consultancy and never the platform | offer the Infowitz page, with the vision copy rewritten | link Infowitz, page
lead read: Emmanuel reads that his own site never names the platform they took out of beta in July and still argues against proprietary tools, so a public buyer vetting La Warroom sees only the consultancy, and he's offered the Infowitz page with the vision copy fixed, one thread. Red team expects him to say public buyers come through Benoît and tenders, the vision contradiction is the part that holds
claims:
your site is silent on Infowitz across every page, https://lawarroom.ai/sitemap.xml 34 URLs, all rendered 2026-10-05, 0 matches for infowitz in text or hrefs, control "agnosti" found on https://lawarroom.ai/vision/
your vision page still argues against the cost of proprietary tools, https://lawarroom.ai/vision/ "Nous sommes agnostiques en termes d'outils ... échappant ainsi à l'obsolescence et au coût d'outils propriétaires" and https://lawarroom.ai/vision-en/ "We remain tool agnostic", rechecked 2026-10-05
Infowitz is out of beta, https://nawiv.r.a.d.sendibm1.com/mk/mr/sh/1f8JAEjGcfF85xuswOr21JfA9J/fYVD72zF7nFk "Infowitz sort de bêta ... Infowitz est désormais disponible", JEU. 9 JUILLET 2026, rechecked 2026-10-05
a prefecture or region as the buyer vetting them, https://www.ossir.org/paris/supports/2025/2025-12-09/OSSIR_LWR.pdf p10 "Préfectures, les Présidents de Métropole/Région et les Dirigeants d'entreprises critiques" as La Warroom's buyers, red team reread 2026-10-05
Raka managed global go to market and messaging for Betty Blocks, a low code software platform, docs/astra-master-context.md section 2A "Global GTM & Campaign Manager, Betty Blocks (Aug 2024 to Feb 2026). ICP segmentation, account selection, messaging" and line 72 "low-code/software sales background (Betty Blocks)", https://www.linkedin.com/in/raka-mulya-b92885196
recheck: 2026-10-05 09:45 to 10:05 UTC by the judge, then a red team pass that rendered all 34 pages again (0 hits for infowitz or lwr.live, controls agnosti and Ukraine found), reread newsletter n°04 at source and confirmed infowitz-lwr.live is theirs. Free analysis and buyer list claims dropped on the red team's finding. Thread re-pulled, vision FR and EN rendered, all 34 pages grepped with control, newsletter n°04 fetched and the Infowitz edito read, infowitz-lwr.live fetched 200, OSSIR p10 read. Thesis confidence MEDIUM, every fact holds, but whether the missing product page is costing them trials is inference, and the separate trial domain may be a deliberate brand choice
```

### Emmanuel, OPENER

```
Hi Emmanuel, saw La Warroom, looks interesting!

However, your site is silent on Infowitz across every page, and your vision page still argues against the cost of proprietary tools. This causes a prefecture or region vetting you to see a consultancy and never the platform.

Especially, when you are selling Infowitz now it's out of beta, the site a buyer reads first still argues against paying for a tool like it.

I run Astra agency. We build websites and product pages for brands like Unilever, AXA, Pertamina. I managed global go to market and messaging for Betty Blocks, a low code software platform.

Shall I send you over what the Infowitz page looks like?
```

## Closed

```sweep
lead: Julien Facchini, co-founder of BE HYPE SAS (SIREN 978173136, founding Président per BODACC 2023-08-13, DG today through JF BUSINESS HOLDING per BODACC 2025-02-27), also "Co-fondateur, Ventes" at Digiflow per https://digiflow-agency.fr/equipe , ctc_MPwYm8GzGQtTBp3yM. The thread holds only our 2026-10-04 connect note per the researcher's two pulls with a positive control. His co-founder Yves Palmi lea_5RPhXwBCmh6SoMrrP is queued unmessaged in the same campaign
website: https://www.be-hype.com/offres renders a white page in Chromium on desktop and phone, with /a-propos and example.com full as controls in the same runs. The body is only an iframe of /offres.html, which 308s back to /offres, and the DOM has zero hits for €, prix, tarif or mois. The CGV art. 7.2 at https://www.be-hype.com/cgv/fr sends buyers there for prices, and the FAQs say both "abonnement mensuel" and "pas d'abonnement". Proven, but their partner agency builds Next.js sites in house (https://digiflow-agency.fr/equipe , Pierre Averous), so it's an afternoon fix and fails the tweak and pay tests. The /a-propos H1 also shows a literal "N°1", a tweak too
gdpr: tools/eu-view.py from Stockholm on https://www.be-hype.com gave 0 cookies, with v2.image-flow.fr as the only third party host, and the HTML sets Google consent mode default denied for ads and analytics. Nothing to say
apps: all 19 Calendly links across the fetched pages go to Julien's calendly.com/contact-behype/discuter-de-votre-projet-avec-julien-site-web, and /contact and /careers 308 to https://www.be-hype.com/ , but Digiflow sells its own SaaS, automation and AI software per his lemlist summary, so a qualifier or plan picker is their own product, and the pay test fails
social: tools/social-audit.js on the accounts in their HTML gave https://www.instagram.com/behype_app 11,845 followers, latest post 2026-10-02, TikTok @behype_app 1,235 followers with dates walled, and linkedin.com/company/behype-fr a DEAD HANDLE, while digiflow-agency returned 200 as control. The buyers are on Instagram, where they're active, and the dead link is a tweak
squad: https://digiflow-agency.fr shows "Dispo pour 2 projets ce trimestre", but https://digiflow-agency.fr/equipe says "25+ collaborateurs internes, zéro freelance ... Aucune sous-traitance, aucun freelance". They sell having no outside builders as a feature, so a squad pitch contradicts their own positioning
verdict: NO_STRONG_ANGLE. The costliest proven pain, the self framing /offres page that shows no plan or price, is an afternoon fix for their own in house Next.js team, and every other family is either clean or something they sell themselves. It's a good free heads up if Julien ever replies. The same verdict very likely applies to Yves Palmi, and the two must never get the same pitch if Raka overrules
```

```sweep
lead: Dan Waterfall-Chapman (Companies House Daniel Charles Chapman), director and PSC of Extracted Ltd 12511482 and Utee Ltd 17107724 with Antonia Waterfall, ctc_eGXerDBzTghqprWZh. Thread pulled 2026-10-05, 0 items, control ctc_YLmRL36CPuodKLwNX returned 4, so he has had our connect note only
website: https://extracted.co.uk/ is a modern Shopify Horizon store with press, reviews, a quiz and subscriptions, crawled twice (150 and 226 pages) with site-audit.js screenshots and no RENDER NOT TRUSTED. https://myutee.com/ is a pre launch "Opening soon" password page while Utee sells on /products/utee. No flaw passes the tweak test
gdpr: tools/eu-view.py from Stockholm on https://extracted.co.uk found 23 cookies before a click, including _fbp, _ttp, _gcl_au, _uetvid and _clck, control allbirds.eu essential only. Their own HTML shows the Pandectes banner visible everywhere, allow and preferences only, blocker off. Real, but a settings change in an app they already pay for, so it fails the tweak and pay tests. A favour if he replies
apps: https://github.com/ExtractedFSD/Utee is their own customer, lab, clinic and admin portal for the Utee UTI test, 29 PRs merged daily up to 2 Oct 2026 and live at https://utee.vercel.app/login . They're building it themselves, so there's nothing to sell, and the health data angle has no observed flaw
social: tools/social-audit.js opened https://www.instagram.com/extracted.co.uk/ , the only social account in their HTML, 12,848 followers, 463 posts, latest 2026-10-04, healthy. myutee.com links none, which is normal before launch
squad: two founders running Extracted and launching the Utee test with Llusern Scientific per https://med-techinsights.com/2026/09/29/it-has-taken-too-long-the-singular-anomaly-around-medtech-innovation-investment/ , but the commit log shows them shipping fast in house and no hiring or outsourcing fact was found, so there's no capacity gap to name
verdict: NO_STRONG_ANGLE. The costliest pain is the 2027 Utee test launch, and he is visibly building it himself. The pre consent ad pixels on extracted.co.uk are real and are a favour to mention if he replies, never an opener. Revisit if a developer hire or a launch slip appears
```

```sweep
lead: Léo Grandperrin, co founder and Directeur associé of Axiome (AXIOME AGENCY SAS, SIREN 104 210 075, created 2026-04-24, Présidente Camille de Montgolfier per https://recherche-entreprises.api.gouv.fr/search?q=104210075 , shareholders not public). Co founder status taken from his tagline "Associé‑Fondateur & Managing Partner", the lemlist jobTitle "Co-fondateur" and https://axiomeconseil.eu/cabinet--axiome "Léo Grandperrin Directeur associé", re-rendered 2026-10-05 09:47 UTC, no contradiction. Also Gérant of GROWTHENGINE SARL, SIREN 106 329 410, Bordeaux, non employer. ctc_biurQgp9YgReZKtL9, thread 0 items, sentOnly shows our 2026-10-04 connect note only, positive control Kyson's thread full in the same minute
website: https://axiomeconseil.eu/ is a five page Canva site, crawled twice and rendered with site-audit.js trusted (0 failed requests). There's no client, case or testimonial, the Contact nav item links only its letter C to the team page, and there's no form. All of it is in house work for a five month old brand firm with an art director and a frontend developer, so it fails the pay and tweak tests
gdpr: tools/eu-view.py from Stockholm on https://axiomeconseil.eu/ found 2 first party cookies (__cf_bm, CCDA) and 0 third party requests before a click, with no forms. The legal notice https://axiomeconseil.eu/mentions-lgales--axiome lacks a publication director and capital, which is an afternoon fix
apps: the only contact path is mailto links on https://axiomeconseil.eu/ , and an audit or lead tool is pure inference from https://axiomeconseil.eu/mthode--axiome with no process load shown, so nothing is proven to sell
social: tools/social-audit.js on https://www.linkedin.com/company/studioh%C3%A9ritage (301 to fr.linkedin.com/company/axiome-) read 251 followers and no visible posts, control lemlist's page showed posts on the same route. They sell Réseaux sociaux themselves, and the founders' personal profiles are walled (999), so not a pain they'd pay us for
squad: https://axiomeconseil.eu/expertises--axiome sells Site, and the team page https://axiomeconseil.eu/cabinet--axiome lists five people including Stanya Palmaro, Responsable digital, whose LinkedIn headline per search is Experienced Frontend Developer https://fr.linkedin.com/in/stanya-palmaro (999 when opened). No clients, volume or delivery times are shown, so there's no capacity strain to write on
verdict: NO_STRONG_ANGLE. A five month old brand firm with an in house developer and no visible client volume. Every true flaw is a favour or their own trade. Revisit if Axiome publishes clients, a developer vacancy or delivery times
```

```sweep
lead: Robin Ibens, founder of New World Architects, a solo leadership and organisational transformation consultancy in Leuven, ctc_mK3f5YmJXSCyi77PF. A brand, not a KBO entity. He's sole Bestuurder of De Geschoren Aap BV 0892.133.348 and Shaved Monkey BV 0689.691.774 per https://kbopub.economie.fgov.be/kbopub/toonondernemingps.html?ondernemingsnummer=0689691774 . Thread empty, sentOnly shows only the 4 Oct connect note, positive control Timur's thread full in the same minute
website: 9 pages of https://newworldarchitects.be/ read twice, modern Webflow, rendered on desktop and phone. The "Book here" on the free first conversation card at https://newworldarchitects.be/contact-eng is href # and hidden by a top level CSS rule, display none. With the privacy page still "In progress." that's an unfinished site, not a broken one. Booking runs through the form, email or phone. The NL CTAs point to English pages, there are no case studies and two typos sit on /team-eng. Every one is a tweak for Statik, the web studio inside his own Kind Kids collective, so all fail the tweak and pay tests
gdpr: tools/eu-view.py from Stockholm, rerun by the judge on https://newworldarchitects.be/ , gives _ga, _ga_BQK9N9M7DW and _cfuvid before a click plus googletagmanager.com and region1.google-analytics.com. No consent code or banner in the HTML, the allbirds.eu control is full. Real, but a consent tool and a policy page is an afternoon, fails the pay test
apps: inbound is a three field Webflow question form, email and phone on https://newworldarchitects.be/contact-eng , with no scheduler or intake. At a solo consultant's volume an off the shelf scheduler fixes it, a tweak, fails the pay test
social: tools/social-audit.js --urls read https://www.linkedin.com/company/new-world-architects (6 followers, 1 employee, not linked from the site), and his personal profile came back UNKNOWN behind the auth wall. His selling channel is unreadable, so no cost is proven
squad: NWA is one person, and his collective The Kind Kids includes Statik, a Leuven web and digital product studio per https://www.statik.be/ . Its jobs page https://www.statik.be/jobs lists only a Digital Project Manager, so there's no developer capacity fact, and the lead record is NWA, not Statik
verdict: NO_STRONG_ANGLE. Every true pain is an afternoon's fix for the web studio in his own collective, and a solo consultant selling through his network won't pay at least 500 euros for any of them. The consent gap and the empty privacy page are a friendly heads up if he ever replies
```

```sweep
lead: Tom Uitzetter, Algemeen Directeur of Siebert & Wassink B.V. (KvK 71745238 per https://www.northdata.com/Siebert%20&%20Wassink%20B%C2%B7V%C2%B7,%20Hengelo/KVK%2071745238 ), ctc_WtireoDMBDJ86yJBf. Not an owner. The team page https://siebertwassink.nl/over-ons/ons-team/ lists Johan Siebert, Tom Kleizen and Joris Wassink as Partner and him as Algemeen Directeur, the founders Wassink and Siebert started it on 1 March 2000, and Quadrum Capital formed Concreto Group from it in December 2024 per https://www.quadrum-capital.nl/en/portfolio/siebert-wassink-ventiv and https://www.consultancy.nl/nieuws/60980/human-capital-groep-concreto-group-neemt-detacheerder-target-over . Thread empty, positive control full in the same session
website: not researched, the ownership check at https://siebertwassink.nl/over-ons/ons-team/ stopped the lead before the deep dive, as the researcher brief allows for a hired director at a private equity owned group
gdpr: not researched, the lead stopped at ownership, https://siebertwassink.nl/over-ons/ons-team/tom-uitzetter would be judged only if one of the three partners became the contact
apps: not researched, the lead stopped at ownership, Concreto Group runs shared group functions per https://concreto-group.com/ons-team/ so decisions sit at group level
social: not researched with tools/social-audit.js, the lead stopped at ownership on the team page https://siebertwassink.nl/over-ons/ons-team/
squad: not researched, a private equity backed HR consultancy group per https://concreto-group.com/ons-team/ , not a Build Squad buyer and not an owner contact
verdict: NO_STRONG_ANGLE CLOSED_NOT_ICP. He is the hired general director of a private equity owned company, not a CEO, owner, founder or co-founder. The owner level people are Tom Kleizen, Johan Siebert and Joris Wassink
```

```sweep
lead: Jean-Baptiste Doray, Directeur Commercial at Distriescaut, ctc_49NL7ZmwhrWyp4gk4. Not an owner. Distriescaut is a single shareholder company owned by GROUPE C.D.E. BLANGIS with Charles Blangis as président per https://distriescaut.com/mentions-legales/ and the register SIREN 902223692 https://recherche-entreprises.api.gouv.fr/search?q=distri%20escaut . His own companies are SIF UNIS FRANCE in liquidation since 2023-12-13, his consultancy closed 2025-03-03, and JBFIT#1 dormant with 0 employees, per https://www.pappers.fr/dirigeant/jean-baptiste_doray_1981-05 . Thread empty, positive control full in the same session
website: not researched, https://distriescaut.com belongs to the Blangis group, not to him, and his own companies have no trading site
gdpr: not researched, https://distriescaut.com is not his business, so a privacy finding there would be a message to the wrong person
apps: not researched, no business of his is trading per https://www.pappers.fr/dirigeant/jean-baptiste_doray_1981-05 , nothing to build for
social: not researched with tools/social-audit.js, there's no owned business account to open per https://www.pappers.fr/entreprise/jbfit1-982455313
squad: not researched, an employee and a dormant or closed set of companies per https://www.pappers.fr/entreprise/sif-unis-france-323962613 , no buyer
verdict: NO_STRONG_ANGLE CLOSED_NOT_ICP. An employee of the Blangis group, and every company in his own name is closed, in liquidation or dormant
```

## Follow up, Concreto Group owners (researched 2026-10-05 on Raka's 'yeah we can try')

Not lemlist contacts, never messaged. Tom Kleizen (CEO, owner), Joris Wassink and Johan Siebert (co-founders, co-owners per Quadrum's 20 Apr 2023 release). No one is added to any campaign.

```sweep
lead: Tom Kleizen, CEO and co-owner of Concreto Group (KvK 89119878, Almelo) and partner at Siebert & Wassink, judged with co-founders Joris Wassink (Manager HR at Concreto, partner at S&W) and Johan Siebert (partner at S&W), all three named as remaining shareholders at https://www.quadrum-capital.nl/en/news/siebert-wassink-en-ventiv-engineers-kiezen-voor-groeiversnelling-met-investeerder-quadrum-capital . None is a lemlist contact. Dedupe ran 6 sentOnly and myConversations searches, 1 teamConversations search and 8 search_contacts, all zero, with Tom Uitzetter ctc_WtireoDMBDJ86yJBf as the positive control, his 4 Oct connect note the only thing in his thread. No contact, no message
website: concreto-group.com crawled twice (12 real pages) and siebertwassink.nl twice (279 pages), both rendered on desktop and phone. The flaws are the S&W hero H1 clipped at the edge, the terms still naming Enschede, and no client form behind "Ik heb een vacature" at https://siebertwassink.nl/contact/ , each an afternoon for Adwise, which built the site per its meta author tag. Five separate label sites are a stated choice at https://concreto-group.com/over-concreto/ "Elk label met een eigen focus en een eigen gezicht", fails the tweak and red team tests
gdpr: tools/eu-view.py from Stockholm on https://siebertwassink.nl set HubSpot __hstc, hubspotutk, __hssrc and __hssc and called px.ads.linkedin.com, snap.licdn.com and js-eu1.hsadspixel.net before any click, while the Cookiebot text promises only functional and analytical cookies and https://siebertwassink.nl/service/privacy-policy names neither HubSpot nor LinkedIn. Real, but a consent configuration fix for their incumbent agency, one vantage point, fails the tweak test
apps: the strongest candidate, a five label PE buy and build with about 600 staff whose vacancy https://siebertwassink.nl/452431166704-manager-hr-en-office/ asks to "verder digitaliseren van HR-processen en systemen, zoals AFAS" and run "overnames en integratieprocessen". Falsified for us, because Adwise built concreto-group.com, siebertwassink.nl and ventiv-engineers.nl (meta author Adwise Internetmarketing, the same /static/default/ CMS as adwise.nl), sits 140 people strong on the same Almelo park, and sells ATS, recruitment platform and portal builds at https://www.adwise.nl/services/technology-and-development/ . The digitising is AFAS work for a manager not yet hired, so there's no gap we can name without asserting their systems
social: tools/social-audit.js plus a Chromium rerender on the only accounts in their own HTML, https://www.linkedin.com/company/siebertwassink/ 21,447 followers with posts 2 and 3 days old and https://www.linkedin.com/company/concreto-group/ 715 followers with posts 3 and 5 days old. No other network is linked, and the same grep found the LinkedIn links as its control. LinkedIn is the channel executive search needs and it's active, nothing missing
squad: a human capital group with no product or build team on https://concreto-group.com/ons-team/ , and its digital build already goes to Adwise in Almelo and stimmt.digital for cobuilders.nl, so there's no capacity gap of ours to fill and no squad buyer
verdict: NO_STRONG_ANGLE. The costliest real pain, integrating five labels' HR and office systems after three acquisitions in 16 months, belongs to an incumbent 140 person agency on the same business park that builds ATS and recruitment platforms, and to AFAS under a Manager HR & Office who starts after 1 Dec 2026. The other four families fail the tweak or pay test. If Raka still wants a touch, the honest one is a relationship note to Tom Kleizen after his CEO acceptance, not a pitch
```
