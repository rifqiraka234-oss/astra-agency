# The accepted but never messaged refresh, 2026-09-27. NOT SENT.

Raka, 2026-09-27, "Do a refresh on accepted invite but not sent. Triple check everything ...
Try ALL the angles. SEARCH WEB ALL RESOURCES. FIND THE BEST ANGLES ... i wanna batch send them
first thing in morning." Nothing here goes out without his word in the morning, and checks A and B
(RULES section 1) run again per lead in the minutes before each send.

**How the pool was rebuilt.** Every v0.1 `linkedinInviteAccepted` activity pulled from lemlist, 343
records, joined to every thread. Silent and never pitched, 6 new acceptances since 25 Sep, Anna
Oblakova, 26 NO_STRONG_ANGLE, 2 BLOCKED_NEEDS_INFO. Everyone else has a real message in their thread.
4 more are silent but stay DO_NOT_CONTACT (a Year 12 student, a sold business, a WisTree co founder
already in a warm thread, a closed business).

---

## Julien Sénéchal, LMtv Sarthe. OPENER.

**In plain words.** LMtv is the local TV channel for Le Mans and the Sarthe. It nearly went bust
last December, a local businesswoman put in €250,000 and Julien took over as director in January,
with one stated goal, get LMtv onto people's phones. The website doesn't help that. Every show on it
is just a link out to YouTube, and the newsletter box reloads the page and does nothing. So the
people they win online end up as YouTube viewers, not as newsletter readers, donors or Club members,
and those are the people who fund a channel that almost closed.

```gate
lead: Julien Sénéchal, LMtv Sarthe (SAS Le Mans Télévision, SIREN 385117528), Président exécutif, ctc_rCGMND9Cgx4sw6FBY, lea_Bs7xbX3WdEbQCMnjd
site pass 1: 11 pages, tools/crawl.py from the WordPress sitemap, every page read. Real pages are 5 (home, Club, Soutenir, Mentions légales, MMA) plus the default post and two archives
site pass 2: 11 pages, second full crawl, same result. Full page screenshots of the home page desktop 1440 and iPhone 13, plus the site-audit.js pair, all opened
deep analysis: a single scrolling home page pasted into a WordPress page as a whole HTML document (it carries its own </html> inside the WordPress one, and a font placeholder URL_DE_TA_POLICE.woff2 that 404s). The live stream is a YouTube embed, "Tous nos replays" goes to the YouTube channel, and all nine show cards (Le Journal, LMFC Zone, Tango Show, Championne, Éco-scopie, Place du marché, Plus Belle Ma Sarthe, Cultur'elle, 72 sports) link to YouTube playlists, the page says so itself, "un lien direct vers la playlist YouTube". No article, no replay page and no show page of its own. The only post is WordPress's default "Bonjour tout le monde" of 25 Feb 2025 with 8 public comments, 4 spam and 4 security probe strings ("breeze vuln test"). The newsletter form is <form action="#" method="post">, the theme's only script is a menu script, MC4WP is installed (mc4wp/v1 in wp-json) but this form isn't one of its forms. Driven in Chromium with test@example.com, it posts to https://lmtv.fr/ and lands on https://lmtv.fr/# with no message, and a curl POST returns the same bytes as a GET. The Club (annonces, reportages, 36 € to 1,200 € HT a year) is joined by emailing your details and waiting for an invoice. Donations are PayPal, one off or monthly. GA and Google Ads cookies before any click, no banner, no privacy page. accueil.lmtv.fr answers 403 to everything, a walled WordPress the home page borrows a font from, so unknown whether a new site is in the works
owner linkedin: Sylvie Casenave-Péré, majority shareholder since Dec 2025 with €250,000 (ici.fr 2026-01-05, Journal des Entreprises 2025-12-29 title), Présidente of Posson Packaging. Routes, profile /in/sylvie-casenave-p%C3%A9r%C3%A9-4129a021 found by web search (title "Sylvie Casenave-Péré - Posson Packaging"), her posts via search are about Posson's RSE, nothing on LMtv's site. Julien holds 15 percent himself (ici.fr), so he is part owner and the legal Président per the register
contact linkedin: /in/julien-senechal returns 999 to curl twice (profile and recent-activity). Web search title "Julien Sénéchal - LMtv Sarthe | LinkedIn". His post fr.linkedin.com/posts/julien-senechal_lmtv-sarthe-est-partenaire-de-capdentreprendre read via WebFetch, 3 months old, 105 posts on the profile. His lemlist jobDescription read in full, "modernisation de l'image de la chaîne et à son adaptation aux nouveaux usages (numérique, réseaux sociaux, nouveaux publics)". Register names Julien Angélo Sénéchal, born 1980, Président de SAS
google news: tools/news.py fr, LMtv 100 results, "Julien Sénéchal" 23, control Carrefour 100. The rescue (Ouest-France 2025-12-19, "Tout près du dépôt de bilan ... sauvée par une cheffe d'entreprise"), the handover (Actu 2026-01-04), the digital goal (ici 2026-01-05, maville 2026-01-09 "nouvelles ambitions numériques"), the Ulule campaign for new studios (Actu 2026-04-22), the move (Actu 2026-07-07), a new show (Ouest-France 2026-09-05)
regional news: tools/news.py (Sarthe OR "Le Mans" télévision locale) with financement, 7 results, the rescue and the 2023 appeal for donations "1-2 € c'est moins cher que Netflix" (Actu 2023-11-15)
industry news: tools/news.py "télévision locale" OR "télés locales" financement, 30 results, the local TV reform decree adopted in second reading (Télépro 2025-11-28) and local TV funding under strain. LMtv's own company post four months ago puts TNT carriage at about €100k a year
sources:
1. https://lmtv.fr/ (home, crawled twice, rendered, form driven)
2. https://lmtv.fr/club-lmtv/
3. https://lmtv.fr/soutenir-lmtv-sarthe/
4. https://lmtv.fr/mentions-legales/
5. https://lmtv.fr/wp-json/wp/v2/comments (8 public comments on the default post)
6. https://recherche-entreprises.api.gouv.fr/search?q=385117528 (SAS Le Mans Télévision, Président Julien Sénéchal)
7. https://www.ici.fr/emissions/l-invite-ici-maine/il-faut-faire-rentrer-lmtv-dans-le-telephone-des-sarthois-selon-le-nouveau-directeur-de-la-chaine-de-television-locale-8150325
8. https://fr.ulule.com/lmtv-reborn-de-nouveaux-studios/ (page read, amounts not in the fetched text)
9. https://fr.linkedin.com/company/lmtvsarthe (1,399 followers, posts read)
10. https://fr.linkedin.com/posts/julien-senechal_lmtv-sarthe-est-partenaire-de-capdentreprendre-activity-7467145442766508032-21Z4
11. https://www.youtube.com/channel/UCidJ6dBJ7oEfdAVzqaL2nSg (the channel every link goes to)
12. https://news.google.com/rss/search?q=LMtv (tools/news.py)
13. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Flmtv.fr (tools/eu-view.py)
14. https://www.lejournaldesentreprises.com/article/le-mans-sylvie-casenave-pere-devient-actionnaire-majoritaire-de-la-chaine-de-television-locale-lmtv-2133716 (503 to WebFetch, walled, title only)
15. https://www.pressreader.com/france/les-nouvelles-l-echo-flechois-fl/20260521/281556592471657 (the Ulule piece, title and summary)
16. https://vialmtv.tv/mentions-legales/ (see the odd finding below)
pains: 6 judged. (1) Money after the rescue, 70 percent of creditors wrote off debt, TNT carriage about €100k a year, an Ulule campaign for the new studios, the costliest, and it lands on donors, Club members and advertisers. (2) The site keeps no one, every show goes out to YouTube and the newsletter signup does nothing, the visible symptom of (1) and the hottest, it sits on Julien's January goal of getting onto phones. (3) Club membership by email and invoice, admin and friction on a revenue line, medium. (4) GA and Google Ads cookies with no banner and no privacy page, a CNIL risk, a small fix. (5) vialmtv.tv, their old Vià name, now a gossip and paid TV help site with a SIREN that fails its checksum, a trust problem that's legal, not ours to build. (6) The default post with spam and probe comments, a symptom of nobody tending the site
chosen: the site that keeps no viewer, the hottest and the costliest we can fix, because it sits on the stated digital goal and on the three revenue lines a rescued channel lives on, donations, Club and audience
sweep website: the angle. Every show is a YouTube link and the newsletter form posts to action="#" and lands on https://lmtv.fr/# with no message, driven in Chromium and by curl, per the crawl of https://lmtv.fr/
sweep gdpr: real, not the thread. tools/eu-view.py from Stockholm shows _ga, _ga_QWL1SCE3DV and YouTube cookies plus doubleclick before a click, no consent code in the HTML, no privacy page, https://webbkoll.5july.net/en/results?url=http%3A%2F%2Flmtv.fr
sweep apps: Club membership is join by email and wait for an invoice per https://lmtv.fr/club-lmtv/ , a signup and payment flow would fix it, folded into the site offer rather than a separate tool
sweep social: Instagram lmtvsarthe, Facebook viaLMtvSarthe and the YouTube channel linked from their HTML per site-audit.js, and Julien is already building social himself per ici.fr, TikTok next. Not the gap
sweep squad: an 11 person TV channel, not an agency and not hiring developers. Julien edits the WordPress himself (user "Julien" in https://lmtv.fr/wp-json/wp/v2/users). No Build Squad fit
claims:
every show on the site links out to a YouTube playlist, https://lmtv.fr/ nine "En savoir +" links to youtube.com/playlist, "Tous nos replays" to https://www.youtube.com/channel/UCidJ6dBJ7oEfdAVzqaL2nSg , and the page's own line "un lien direct vers la playlist YouTube", reopened 2026-09-27
the newsletter signup just reloads the page, https://lmtv.fr/ form action="#", Chromium lands on https://lmtv.fr/# with no message, curl POST identical to GET, 2026-09-27
there's a donation page, https://lmtv.fr/soutenir-lmtv-sarthe/
there's a Club membership, https://lmtv.fr/club-lmtv/
the goal of getting LMtv onto the phones of the Sarthois, https://www.ici.fr/emissions/l-invite-ici-maine/il-faut-faire-rentrer-lmtv-dans-le-telephone-des-sarthois-selon-le-nouveau-directeur-de-la-chaine-de-television-locale-8150325 2026-01-05
Eten Maar, a food brand built from zero, acquisition, content and conversion, docs/astra-master-context.md section 2A, https://www.linkedin.com/in/raka-mulya-b92885196
thread: problem every show sent out to YouTube and a newsletter signup that goes nowhere | cost the more viewers won on phones, the more of the audience sits on YouTube instead of the donor and Club lists | offer the LMtv replay site with a working newsletter | link site, newsletter
lead read: Julien reads that his site sends every show to YouTube and his newsletter box does nothing, that this gets worse as he pushes LMtv onto phones, and then gets offered a replay site with a newsletter that works, one thread
recheck: the two facts in block two reopened 2026-09-27, the form driven in a real browser and by curl with the same result, controls the Chromium run posting and landing on /# as expected and a GET and POST compare. Their goal quoted from his own interview. The weak point is money, a rescued channel may not have €5k spare, flagged. Thesis confidence MEDIUM
```

### Julien, OPENER

```
Hi Julien, saw LMtv Sarthe, looks interesting!

However, your site sends every show out to a YouTube playlist, and the newsletter signup just reloads the page. This causes the Sarthois who find you online to watch on YouTube and leave without giving you an email, a donation or a Club membership.

Especially, when you are putting LMtv on the phones of the Sarthois, the more viewers you win, the more of your audience sits on YouTube instead of your donor and Club lists.

I run Astra agency. We build websites and apps for brands like Unilever, AXA, Pertamina. I built a food brand from zero and ran its content and conversion, so I know a follower only pays off once they're on something you own.

Shall I send you over what the LMtv replay site with a working newsletter looks like?
```

**The odd finding, kept out of the message, Raka's call.** `vialmtv.tv`, which carries LMtv's old
"Vià LMtv" name, is now a site selling a €29 TV repair video call and a €9 guide, with celebrity
gossip that Google News lists under "LMtv" ("Cyril Hanouna a une nouvelle copine ...", 2026-09-15).
Its legal page names "Régie Sarthe Médias, 27 rue Gambetta, Le Mans, SIREN 912 407 385". That number
fails the SIREN checksum (the Luhn test, LMtv's own 385117528 passes), and the register search returns
nothing for the number or the name. The archive has the domain live in 2019 and nothing in 2024, so it
lapsed and was taken. Worth telling Julien as a favour one day, not something we build.

---

## Louis-Guillaume Dupond, Halloween Agency. NO_STRONG_ANGLE, with a favour worth flagging.

**In plain words.** A 35 person events, social media and staffing agency in Toulouse, Paris and Nice,
€9.4m turnover in 2025. In January they wrote nine new pages to win staffing work in Paris, Lyon,
Marseille, Nice and five more cities. Visitors can read them, but the server tells Google each one is
"page not found", so none of them can show up in search. It's real, and it's a setting their web
agency can fix in an afternoon, so it's a favour, not something they'd pay us for.

```sweep
lead: Louis-Guillaume Dupond, Directeur Général, Halloween Agency (SAS HALLOWEEN, SIREN 390045219, 22 staff 2023, CA €9,369,163 in 2025), ctc_jWvuZEPkGERkzwxvQ. The register gives Président PHYGITAL SAS, which is held by CAPITOLE, held by CASTILLON, whose Président is Jean-Louis Roche, so Roche owns it and Louis-Guillaume runs it
website: modern Nuxt site built by Pam (thisispam.com), 192 URLs crawled, 78 case studies. The nine city staffing pages published in Prismic on 2026-01-12 and 2026-01-27 render for a visitor in Chromium but answer HTTP 404, control /mentions-legales on the same /:uid() route answers 200, per the route table in /_nuxt/CDLBlxje.js. A prerender setting, a tweak for Pam
gdpr: site-audit.js 0 cookies and 0 trackers before a click, no consent code so it holds for France. Its banner check said NONE FOUND but the screenshot shows "Accepter Refuser", rendered late by the SPA, so there is a banner with reject. Clean
apps: 300 short contracts a month for match day staff per https://www.vie-economique.com/actualites/halloween-agency-propose-300-cdd-par-mois-a-toulouse/ , recruited through Plany per https://www.plany.jobs/partenaires/halloween , so the staffing tool exists. The 2024 carbon post says per event carbon is impossible with their tools, but it's two years old and nothing newer points there
social: linkedin, instagram halloween_agency and facebook linked from their HTML per site-audit.js, and social media is a service they sell with its own team. No gap
squad: an events, social and staffing agency with no build line, one contest platform in 78 cases (Tommy Hilfiger x Krys, 2023) per the crawl, and their own site is outsourced to Pam. No capacity evidence either way
verdict: NO_STRONG_ANGLE. Favour for Raka's call, the nine city pages answer 404 to Google
```

---
## Steven Garratt, Qualigraf. OPENER.

**In plain words.** Qualigraf makes the software councils use to run committee meetings, agendas
and decisions, big in the Netherlands and France. Steven ran the UK market leader, Modern.Gov, at
Civica, and joined Qualigraf a year ago to take it into UK councils. The UK website is the Canadian
one with a new flag. It talks about "the legislative process", which isn't how an English council
talks, never says "committee management", and every client logo on it is Dutch or French. So a UK
council comparing systems sees something made for somewhere else, with no UK council behind it.

```gate
lead: Steven Garratt, Group CEO, Qualigraf Groupe B.V. (KVK 89934210, Draai 9 Dordrecht), UK based, ctc_sPysigrTQgntPu9c6, lea_WnaBYFcnvZdncef2j
site pass 1: 68 pages plus 82 posts from the WordPress API, every page loaded in Chromium because curl gets the "One moment" bot check, all 68 at 200, every page read
site pass 2: 68 pages, a second full Chromium pass, all 68 at 200. Full page screenshot of the UK homepage desktop 1440 and iPhone 13, the site-audit.js pair, all opened
deep analysis: one WordPress site in four languages, NL, FR, Canada and UK. The 14 UK pages were all created on 2025-07-17 as copies of the Canadian pages of March 2025 (same slugs, the UK Legislative page is 94 percent identical to the Canadian one) and edited 2026-06-02. The UK homepage headline is "Supporting the legislative process and preserving institutional knowledge", "legislative" appears 30 times across the 14 UK pages, "municipalities" 6, "committee management" 0 on the whole site, "Democratic Services" once, and nothing on shadow authorities, reorganisation or any English council. The "frontrunners" strip on the UK homepage, Legislative and Information Advisor pages shows Leiden, Ville de Marseille, Apeldoorn, Département de la Moselle and Gemeente Maastricht, all Dutch or French. AI Minutes has said "COMING SOON" on the UK pages since they were made. Of 82 posts, one is in the UK section, Steven's appointment. A single code factory in Dordrecht builds one platform for four sales organisations per the appointment article, no open vacancies (the last developer role is marked filled), and the roadmap names a big usability project
owner linkedin: Rens Groeneveld, co founder and former CEO, stays co owner on the board per the appointment article. Profile /in/rensgroeneveld found by web search ("Rens Groeneveld - Qualigraf Nederland | LinkedIn"), his 2023 merger post found by search, nothing newer on the UK. North Data's officer list is premium only, walled
contact linkedin: /in/stevengarratt returns 999 to curl, /recent-activity/all/ 429. Web search title "Steven Garratt - Qualigraf Nederland | LinkedIn", rocketreach lists him as Managing Director (UK). His post read in full via WebFetch, 2 months old, "A year ago this month since joining the Qualigraf team, and with two Councils now being implemented, we're hosting our first UK webinar", pointing at the LGR shadow authorities and "what committee management system to use". His lemlist summary read, UK market share to 84 percent, offshore development 0 to 60 percent, revenue £2.9m to £5.1m
google news: tools/news.py en and nl, Qualigraf 0 results in both, control Tesco 104 and Heineken 100 in the same minutes. "Steven Garratt" 17 results, none about him. "Rens Groeneveld" 14, a 2019 Emerce piece on OurMeeting, nothing current
regional news: tools/news.py "shadow authority" committee, 13 results, both Surrey shadow authorities met in May 2026. "local government reorganisation" 2027, 82 results, the government paused reorganisation after legal advice (BBC 2026-09-08, Local Government Lawyer 2026-09-16), Browne Jacobson 2026-09-07 says Essex, Hampshire, Norfolk and Suffolk withdrawn and 14 more areas paused, Surrey goes ahead on 1 April 2027
industry news: tools/news.py "committee management system" OR modern.gov council, 9 results, council meeting notices only. Dutch raadsinformatiesysteem, 52 results, griffier appointments, nothing on vendors
sources:
1. https://qualigraf.com/uk/homepage-uk/ (rendered, screenshot, HTML)
2. https://qualigraf.com/uk/legislative-uk/
3. https://qualigraf.com/en_ca/legislative/ (the Canadian original)
4. https://qualigraf.com/wp-json/wp/v2/pages?per_page=100 (68 pages with dates)
5. https://qualigraf.com/wp-json/wp/v2/posts?per_page=100 (82 posts)
6. https://qualigraf.com/nl/werkenbij/
7. https://qualigraf.com/nl/onze-roadmap/
8. https://qualigraf.com/nl/qualigraf-krijgt-nieuwe-ceo-voormalig-civica-moderngov-topman-steven-garratt/
9. https://www.linkedin.com/posts/stevengarratt_a-year-ago-this-month-since-joining-the-qualigraf-activity-7485262117080809472-IMit
10. https://siliconcanals.com/docwolves-qualigraf-join-forces/
11. https://www.northdata.com/Qualigraf+Groupe+B.V.,+Dordrecht
12. https://www.surreylgrhub.gov.uk/shadow-authorities
13. https://www.brownejacobson.com/about/news-media/local-government-reorganisation-plans-to-be-paused-legal-comment
14. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fqualigraf.com%2Fuk%2Fhomepage-uk%2F (tools/eu-view.py)
15. https://adstransparency.google.com/?domain=qualigraf.com (2 ads, advertiser QUALIGRAF, last shown 2026-09-25)
16. https://news.google.com/rss/search?q=Qualigraf (tools/news.py)
pains: 6 judged. (1) Getting into UK councils against the system Steven himself ran, with the reorganisation wave mostly paused on 7 Sep 2026 and only Surrey going ahead, the costliest, every council now has to be won from an incumbent rather than at a changeover. (2) The UK site written for somewhere else, "legislative process" and only Dutch and French proof, the hottest, a year into the UK push and one webinar in. (3) One code factory for four countries plus a big usability project, a Build Squad case, but no vacancies and in house developers, so capacity isn't shown. (4) AI Minutes "coming soon" on the UK pages for 14 months, unproven whether it's the product or the page. (5) GDPR, Complianz holds Google back from Stockholm, clean. (6) No social linked from the site, small for a public sector seller
chosen: the UK site, the hottest and the costliest thing we can fix, because with the reorganisation wave paused every UK council has to be won in a like for like comparison, and the site is the first thing that comparison meets
sweep website: the angle. 14 UK pages cloned from the Canadian section, "legislative" 30 times, "committee management" 0 on 68 pages, all five proof logos Dutch or French, per the Chromium crawl and screenshot of https://qualigraf.com/uk/homepage-uk/
sweep gdpr: tools/eu-view.py from Stockholm, 4 first party cookies only (hv_pass, pll_language, last_lang, cmplz_policy_id), Complianz holds Google back, https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fqualigraf.com%2Fuk%2Fhomepage-uk%2F . Clean
sweep apps: they are the software, a meeting and decision platform, per https://qualigraf.com/uk/homepage-uk/ . Nothing internal to sell against
sweep social: site-audit.js finds no social account linked from the HTML, a LinkedIn company page exists per lemlist, Steven and Stuart post there themselves. Small for a council seller
sweep squad: one code factory for four markets and a big usability project on https://qualigraf.com/nl/onze-roadmap/ , but https://qualigraf.com/nl/werkenbij/ says no vacancies and the developer role is filled. Capacity not shown, so not the pitch
claims:
the UK site leads with "the legislative process", https://qualigraf.com/uk/homepage-uk/ headline "Supporting the legislative process and preserving institutional knowledge", reopened 2026-09-27
every client logo on it is Dutch or French, https://qualigraf.com/uk/homepage-uk/ frontrunners strip Leiden, Marseille, Apeldoorn, Moselle, Maastricht, screenshot and HTML, same strip on /uk/legislative-uk/ and /uk/information-advisor-uk/
Democratic Services teams comparing committee systems, Steven's own words "committee management system" and the webinar for Democratic Services professionals, https://www.linkedin.com/posts/stevengarratt_a-year-ago-this-month-since-joining-the-qualigraf-activity-7485262117080809472-IMit
taking Qualigraf into UK councils, the same post (two councils being implemented, first UK webinar) and https://qualigraf.com/uk/press-release-ceo/
Betty Blocks, global go to market, a Dutch software company, docs/astra-master-context.md section 2A, https://www.linkedin.com/in/raka-mulya-b92885196
thread: problem the UK site speaks "legislative process" with only Dutch and French proof | cost every UK council weighing it against the system it already runs notices that gap on every page | offer the UK site written for Democratic Services teams | link site, democratic
lead read: Steven reads that his UK site talks about the legislative process and shows only Dutch and French clients, that every council he pitches will notice, and then gets offered a UK site written for Democratic Services, one thread
recheck: headline, logos and word counts reopened 2026-09-27 in two Chromium passes and a screenshot, control the same text scan finds Maastricht, Apeldoorn and Leiden where they are named. The inference that UK buyers read "legislative" as foreign is ours, and Steven will judge it, he ran the system they use. Risk, he oversaw the June 2026 edit himself. Thesis confidence MEDIUM
```

### Steven, OPENER

```
Hi Steven, saw Qualigraf, looks interesting!

However, your UK site leads with "the legislative process", and every client logo on it is Dutch or French. This causes Democratic Services teams comparing committee systems to see a product made for somewhere else, with no UK council to point to.

Especially, when you are taking Qualigraf into UK councils, the ones weighing you against the system they already run will notice that gap on every page.

I run Astra agency. We build websites and apps for brands like Unilever, AXA, Pertamina. I led global go to market at Betty Blocks, a Dutch software company selling abroad, so I know how buyers read a site that wasn't written for them.

Shall I send you over what the UK site for Democratic Services teams looks like?
```

---

## Cory Coleman, Bunkz Golf. ALREADY_MESSAGED via his co founder, no opener.

```sweep
lead: Cory Coleman, Co-Founder, Bunkz Golf Ltd, ctc_yiMnaMWGwfS3n2Jpa. His own thread is empty today, but his co founder Tyler Butler (ctc_CwNQoXS434JF4pFX2) got our website opener on 2026-09-05 and never replied, thread pulled today
website: bunkzgolf.com is still the three hat shop Tyler was told about, 24 pages crawled, screenshot opened, "New Collection out now!" over two founders in caps. The website angle is already spent on Tyler
gdpr: site-audit.js 14 first party cookies and Google Fonts from Google before a click, no consent code in the HTML, privacy page exists. A small fix for a UK two person studio
apps: a social content and paid social studio for golf per their lemlist description, no process in the crawl a tool would fix
social: they are the social people, Instagram, YouTube and TikTok linked from their HTML per site-audit.js, 2 million views in ten days per Tyler's record. Not ours to sell
squad: a content studio, not a builder, no development work in the crawl or the lemlist description
verdict: ALREADY_MESSAGED. Pitching Cory now would be a second pitch to a two founder company three weeks after the first. Raka's call, the cleaner move is a nudge to Tyler
```

---

## Morten Majdall Petersen. NO_STRONG_ANGLE, nothing he runs.

```sweep
lead: Morten Majdall Petersen, ctc_NkjMjR2Ak5jsePGqq, lemlist companyName "." and jobTitle "Investor in sports technology and sports media", tagline "Sportradar co-founder". Companies House lists one appointment, Sportradar UK Ltd, resigned 5 Oct 2012, resident in Malta
website: no company or domain on his lemlist record, a web search finds Sportradar and Bet25 as past ventures, neither his to change today
gdpr: nothing to test, no domain of his own on the lemlist record or in the search results
apps: an investor with no operating business of his own on the Companies House register, https://find-and-update.company-information.service.gov.uk/officers/1pbqm8o6S7HuayVXoTxccFYXd0k/appointments , so no process to build for
social: his LinkedIn at https://www.linkedin.com/in/morten-majdall-petersen-8638885 is the only presence a web search finds, a personal profile with no company account to judge
squad: no company that builds software under his control per the register and the lemlist record, and no portfolio list anywhere we could open
verdict: NO_STRONG_ANGLE. A possible connector to sports tech founders one day, not a lead
```

---

## Maïlys Benoist, Coptis. NO_STRONG_ANGLE, not the buyer.

```sweep
lead: Maïlys Benoist, Product Owner, Coptis (SIREN 423056589), ctc_E37YyzSkkbsXLvJjK. CEO is Roland de Heere, the company is backed by the Extens fund since 2021 per Premium Beauty News, so she neither owns nor runs it
website: coptis.com is a cosmetics PLM vendor's site with US and Singapore offices per its lemlist description, not hers to buy for
gdpr: not tested for a message, she isn't a buyer, and the company has a CEO and a fund to answer for it per https://www.premiumbeautynews.com/fr/coptis-annonce-la-nomination-de,25070
apps: they build Coptis PLM themselves, 25 years of it per the lemlist description
social: a LinkedIn company page per lemlist, not a gap for a B2B software vendor
squad: a software vendor with its own R&D per the lemlist description, and a product owner doesn't buy outside developers. If Raka wants a way in for the build squad, she could be the internal champion, the CEO decides
verdict: NO_STRONG_ANGLE, on who
```

---
## Rohith Devanathan, ScrubMarine. OPENER, build squad.

**In plain words.** ScrubMarine builds underwater robots that inspect and clean ship hulls, and a
web platform, ScrubCloud, where ship operators log in to see the reports and 3D hull models. Rohith
co founded it, owns a big share, and raised about £740k last December to grow the engineering team.
It's a team of about seven building three robots and the platform at once, and every hire they've
advertised so far was for robots, marine operations or marketing, not software. So the platform the
customers actually use competes with the robots for the same few engineers. We'd build ScrubCloud
next to them. The last verdict on him killed a website angle, the build squad was never tested.

```gate
lead: Rohith Devanathan, Co-Founder and CEO, ScrubMarine Limited 15312999 (Whitehaven, engineering in Edinburgh), director since 2 Oct 2024 and a 25 to 50 percent PSC per Companies House, ctc_Wn6WBQz6D6pzv6bQq. lemlist companyName says Veeran Advisory, his tagline says CEO @ ScrubMarine, the register settles it
site pass 1: 10 URLs, tools/crawl.py, 7 pages at 200 (home, about, careers, contact, inspection, cleaning, reporting) and privacy, terms and cookies at 404, every page read
site pass 2: 10 URLs, second full crawl, same result, plus the site-audit.js desktop and phone screenshots opened. cloud.scrubmarine.com/login answers 200
deep analysis: a SvelteKit site, modern and clear, three services on one platform. The about page names four things being built, "the Fish, the Turtle, and the Whale, a suite of autonomous robots ... alongside ScrubCloud, our fleet intelligence and client reporting platform", and a roadmap with ScrubCloud launched in 2026 and "Additional tools added to ScrubCloud" plus Whale development in 2027. The reporting page sells 3D point cloud hull models, defect mapping, predictive maintenance, PDF reports for class societies and insurers, a fleet dashboard and a client portal with role based access. The careers page says "We're a small, ambitious team ... Open roles posted soon." The footer's Privacy Policy, Terms of Use and Cookie Policy links all return 404 while the demo form says "By submitting, you agree to our privacy policy"
owner linkedin: the owners are Rohith and Clyne Albertelli (engineering director), both 25 to 50 percent PSCs. Rohith's profile /in/rohith-devanathan-b31456224 and /in/rohithdevanathan found by web search, title "Rohith Devanathan - Founder & CEO @ ScrubMarine", two posts found by search ("Exciting times for ScrubMarine", "Huge news for ScrubMarine"), curl on LinkedIn profiles returns 999 as on every lead today
contact linkedin: same person as the owner, confirmed by the register and his tagline. Company page https://www.linkedin.com/company/scrubmarine read via WebFetch, 1,069 followers, 7 employees, posts 9 months ago (the pre seed round, "accelerate engineering, grow our team"), 8 months ago (hiring a Marine Ops Lead, a Robotics Engineer and a Marketing and Content Associate), 5 months ago (Colin Greene as NED, "first commercial deployments this summer") and a progress teaser
google news: tools/news.py en, ScrubMarine 11 results, "Rohith Devanathan" 10, control Tesco 104. The pre seed round covered by The Scotsman, The Times, Insider Media, Business Matters, UK Tech News and EU-Startups on 19 to 23 Dec 2025, the Whitehaven unit (TheBusinessDesk 2025-06-05), NPIF II pieces naming him (Insider Media May 2026)
regional news: tools/news.py Scotland hull cleaning robot, 1 result, the Business Matters funding piece
industry news: tools/news.py "hull cleaning" robot in-water 2026, 13 results, Neptune Robotics investing US$12m in a Singapore factory (2026-04-20), Carnival Pride piloting a hull cleaning robot (2026-08-03), a new hull cleaning standard (Bellona 2026-03-16). The category is heating up and competitors are well funded
sources:
1. https://scrubmarine.com/
2. https://scrubmarine.com/about
3. https://scrubmarine.com/careers
4. https://scrubmarine.com/products/reporting
5. https://scrubmarine.com/contact
6. https://cloud.scrubmarine.com/login
7. https://find-and-update.company-information.service.gov.uk/company/15312999/officers
8. https://find-and-update.company-information.service.gov.uk/company/15312999/persons-with-significant-control
9. https://www.linkedin.com/company/scrubmarine
10. https://www.uktechnews.info/2025/12/23/scrubmarine-secures-740k-pre-seed-investment-led-by-pxn-ventures/
11. https://www.scotsman.com/business/edinburgh-founded-robotics-start-up-raises-1-million-to-help-solve-100-billion-challenge-5449091 (title and summary via search)
12. https://www.insidermedia.com/news/national/start-up-raises-funding-for-robotics-system-which-is-tackling-problem-of-marine-growth-from-molluscs-crustaceans-and-slime-on-ship-hulls (title via search)
13. https://news.google.com/rss/search?q=ScrubMarine (tools/news.py)
pains: 5 judged. (1) Engineering capacity, about seven people building three robots and ScrubCloud, the round raised to grow engineering, every advertised hire robotics, ops or marketing, the costliest, it sets how fast pilots turn into fleets and how long the pre seed lasts. (2) A heating category with funded competitors (Neptune Robotics, Nautica), real, not ours. (3) Privacy, terms and cookie pages 404 behind a form that asks for agreement to the privacy policy, a UK GDPR gap, a small fix, a favour. (4) Four CTA wordings landing on one contact page, a tweak (the September note). (5) Social, LinkedIn, Instagram and TikTok linked and active, no gap
chosen: engineering capacity for ScrubCloud, the costliest, because the client platform and the robots draw on the same few engineers while the money raised is meant to reach pilots
sweep website: modern SvelteKit site, clear offer, working demo form, screenshots per site-audit.js. The 404 legal pages are a favour, not the pitch, https://scrubmarine.com/privacy
sweep gdpr: site-audit.js 0 cookies and only Google Fonts before a click, no consent code in the HTML, but the privacy, terms and cookie links 404 behind a form that collects name, email and company. A UK GDPR gap, small, https://scrubmarine.com/contact
sweep apps: ScrubCloud is their own client portal and reporting platform with a live login at https://cloud.scrubmarine.com/login , nothing internal of theirs a tool would fix
sweep social: LinkedIn, Instagram scrubmarineuk and TikTok linked from their HTML per site-audit.js, the company page posts every few months, no gap for a robotics startup
sweep squad: the angle. A small team per https://scrubmarine.com/careers building three robots and ScrubCloud per https://scrubmarine.com/about , money raised to grow engineering per UK Tech News, hires advertised for robotics, ops and marketing only per the LinkedIn company page
claims:
a small team building the Fish, the Turtle, the Whale and ScrubCloud, https://scrubmarine.com/about lists all four and https://scrubmarine.com/careers says "We're a small, ambitious team", reopened 2026-09-27
ScrubCloud is what ship operators log into, https://scrubmarine.com/products/reporting (client portal, fleet dashboard) and https://cloud.scrubmarine.com/login
moving from first deployments to fleets, https://scrubmarine.com/about roadmap 2026 first deployments, 2027 fleet expanded, and the LinkedIn post on first commercial deployments this summer, https://www.linkedin.com/company/scrubmarine
Raka's offer, a squad of senior developers in half the time at half the price, his own words, docs/RULES.md 4A rule 13, https://www.linkedin.com/in/raka-mulya-b92885196
thread: problem a small team building three robots and ScrubCloud at once | cost ScrubCloud waits behind the robots and the work grows with every hull surveyed | offer a squad that builds ScrubCloud next to their team | link scrubcloud, robots
lead read: Rohith reads that his small team is building three robots and ScrubCloud at once so the platform waits behind the robots, that this grows with every hull, and then gets offered a squad to build ScrubCloud so his engineers stay on the robots, one thread
recheck: every fact reopened 2026-09-27, the about, careers and reporting pages crawled twice, the register pulled for ownership, the company page read for team size and hires. The inference that ScrubCloud waits behind the robots is ours, no source says it, and they may already have a contractor on it. The offer is Raka's verbatim claim, flag it, a funded founder can hold us to it. Thesis confidence MEDIUM
```

### Rohith, OPENER

```
Hi Rohith, saw ScrubMarine, looks interesting!

However, your site shows a small team building the Fish, the Turtle, the Whale and ScrubCloud at the same time. This causes ScrubCloud, the part your ship operators actually log into, to wait behind the robots for the same few engineers.

Especially, when you are taking ScrubMarine from first deployments to whole fleets, the ScrubCloud work grows with every hull you survey.

I run Astra agency. We build websites and apps for brands like Unilever, AXA, Pertamina. I lead a squad of senior developers who'd build ScrubCloud next to your team in half the time at half the price, so your engineers stay on the robots.

Shall I send you over what the ScrubCloud squad looks like?
```

---
