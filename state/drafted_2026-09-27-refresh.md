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

<!-- GATE ARCHIVED, SENT 2026-09-28T05:34:31Z as act_EvyCeWK5wyCvJxipu on Raka's explicit word, verbatim, one copy. -->

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

<!-- GATE ARCHIVED, SENT 2026-09-28T05:34:40Z as act_EXghGY3B9dh2Ldbfp on Raka's explicit word, verbatim, one copy. -->

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

<!-- GATE ARCHIVED, SENT 2026-09-28T05:34:47Z as act_rC9CXEcfGx9DAkBBQ on Raka's explicit word, verbatim, one copy. -->

### Rohith, OPENER

```
Hi Rohith, saw ScrubMarine, looks interesting!

However, your site shows a small team building the Fish, the Turtle, the Whale and ScrubCloud at the same time. This causes ScrubCloud, the part your ship operators actually log into, to wait behind the robots for the same few engineers.

Especially, when you are taking ScrubMarine from first deployments to whole fleets, the ScrubCloud work grows with every hull you survey.

I run Astra agency. We build websites and apps for brands like Unilever, AXA, Pertamina. I lead a squad of senior developers who'd build ScrubCloud next to your team in half the time at half the price, so your engineers stay on the robots.

Shall I send you over what the ScrubCloud squad looks like?
```

---
# The 26 NO_STRONG_ANGLE and 2 BLOCKED, re run today

What changed since 25 Sep. The EU view (tools/eu-view.py, Stockholm) now exists, so every site whose
privacy check was voided by our US connection got it. The build squad family was added on 25 Sep
after batch 9, so the seven batch 9 leads got it today. Twelve older verdicts had never had a five
family sweep and got one. Where a family line below carries a date of 25 Sep it was reopened in that
file (state/drafted_2026-09-25-batch9-redo.md or -batch10-build-squad.md) and nothing today changes it.

## Andrew Johnson, Diggecard. NO_STRONG_ANGLE for now, one check short of a privacy opener.

```sweep
lead: Andrew Charles Johnson, Daglig leder of DIGGECARD AS 914046688 (Bergen) per the Norwegian register data.brreg.no roller, board chaired by Susanne Brønnum-Hyttel, ctc_CmqhrPXcHCyuCjmPw. So he does run the group, which corrects the 25 Sep line that he was only the UK CEO
website: diggecard.com walls our browser (site-audit.js BLOCKED_BY_THEIR_WALL, control example.com 200), WebFetch reads it, B2B gift card platform with River Island, TK Maxx, Arsenal and 500+ retail partners named. No visual claim possible
gdpr: tools/eu-view.py from Stockholm lists 14 cookies before a click, Hotjar, Google Analytics, Facebook _fbp and HubSpot, with HubSpot's banner script loaded, https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fdiggecard.com . One tool only, our own browser can't load the page to confirm it, so it can't be written yet
apps: a gift card platform is their product per the WebFetch read of https://diggecard.com/platform-solutions/ , nothing internal we can see to fix
social: Facebook, LinkedIn, Twitter and YouTube linked in the footer of https://diggecard.com/ per the WebFetch read, a B2B seller whose buyers are on LinkedIn, no gap
squad: no careers link on the site per WebFetch, tech team in Bergen per the register, no vacancies found, no capacity gap shown
verdict: NO_STRONG_ANGLE. If Raka opens diggecard.com from the Netherlands in a private window and the cookies land before any click, it becomes a privacy opener. Five routes tried, eu-view, site-audit, curl, WebFetch, 2gdpr.com (discontinued)
```

## Karin Andersson, The Real Olive Company. NO_STRONG_ANGLE, a real privacy gap that's small in the UK.

```sweep
lead: Karin Andersson, Joint CEO and co founder, The Real Olive Company, ctc_XknfFnBmAo83YYeqh
website: 380 pages crawled on 25 Sep, the Where to buy page printed the raw [wpsl] shortcode instead of the store finder, a tweak, per state/drafted_2026-09-25-batch9-redo.md
gdpr: real. No consent tool of any kind in the HTML today, Site Kit fires gtag config GT-NCT7NG8 and AW-980075238 for every visitor, site-audit.js counts 12 cookies before a click, and the Transparency Center shows 6 Google ads, three last shown 26 or 27 Sep, https://adstransparency.google.com/?domain=therealolivecompany.co.uk . The legal page says "Where applicable this website uses a cookie control system", https://therealolivecompany.co.uk/legal-stuff/ . Stockholm view blocked by Cloudflare, the HTML read and the browser run agree
apps: the trade meze offer runs on a samples and prices form, D2C on WooCommerce, per the 25 Sep crawl of https://therealolivecompany.co.uk/meze/ , no ordering bottleneck shown
social: instagram realoliveco linked from their HTML per site-audit.js, 429 to us so recency unread
squad: a food brand, no software or developer roles on the 380 page crawl, not a Build Squad fit
verdict: NO_STRONG_ANGLE. The costliest pain is OLLY'S on the same chilled shelf, not ours. The privacy gap is true and live while their ads run, but in the UK it's a cheap fix with little legal bite, so it's a free tip, or a Snorly style opener if Raka wants it
```

## Paul Prescott, Raise Your Game. NO_STRONG_ANGLE.

```sweep
lead: Paul Prescott, CEO and co founder, Raise Your Game Limited, ctc_HQWRGkBGkYT69xsb9
website: 400 pages crawled on 25 Sep, 377 prize pages, modern, partner wall of Spurs, City in the Community and more, per state/drafted_2026-09-25-batch9-redo.md. Growing, tools/news.py shows the RFL Community Trust partnership (2025-07-04) and Macclesfield FC draws (2026-05-29)
gdpr: tools/eu-view.py from Stockholm, two Google Analytics cookies before a click and nothing else, https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fwww.raise-your-game.com . Real, small
apps: they are the platform, draws set up by the club and paid through Stripe per https://www.raise-your-game.com/ , nothing to sell against
social: no social account linked on any of 400 pages per the 25 Sep crawl, the clubs' own channels carry every draw
squad: no careers page and no developer roles found in the crawl or tools/news.py, a 1 to 10 person team per lemlist, no capacity gap shown
verdict: NO_STRONG_ANGLE
```

## Niklas Mocker, dotega. NO_STRONG_ANGLE.

```sweep
lead: Niklas Mocker, CEO and co founder, dotega, ctc_Wg9Bv7Z7vMqpNQx78
website: 103 pages crawled on 25 Sep, full funnel with city pages, prices, FAQ and an app login, per state/drafted_2026-09-25-batch9-redo.md. Strong
gdpr: tools/eu-view.py from Stockholm, 0 cookies, only Usercentrics and the GTM loader, https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fdotega.de . Clean, the 25 Sep GEO VOID is settled
apps: they build their own WEG platform with a login at app.dotega.de per the 25 Sep crawl, not a buyer for tools
social: linkedin, instagram dotega.de and facebook linked from their HTML per site-audit.js on 25 Sep, active
squad: the only open role is a WEG expert for customer support per https://www.dotega.de/karriere , no developer seat open, no capacity gap shown
verdict: NO_STRONG_ANGLE
```

## Severin Kloos, Dariuz. NO_STRONG_ANGLE.

```sweep
lead: Severin Kloos, Algemeen directeur, Dariuz BV Eindhoven, ctc_CJGZpaRQxRpP7Qb8e
website: 89 pages crawled on 25 Sep, a bought theme with content for gemeenten and SW bedrijven, decent, per state/drafted_2026-09-25-batch9-redo.md
gdpr: Complianz banner with reject and 0 trackers before a click per site-audit.js on 25 Sep, no third party trackers so the geo question doesn't arise. Clean
apps: they sell their own methodology and HRM software to municipalities per the lemlist description, not a buyer for tools
social: linkedin, a youtube video and twitter.com/dariuznl linked from their HTML per site-audit.js, B2G buyers don't buy there
squad: vacancies are a Sales Manager Sociaal Domein (9 Jul 2026) and a junior IT servicedesk role (Oct 2025) per https://www.dariuz.nl/category/vacatures/ , no developer seat, no capacity gap shown
verdict: NO_STRONG_ANGLE
```

## Emily R., Alquimia Legal. NO_STRONG_ANGLE.

```sweep
lead: Emily Levy R., Co-Owner, Alquimia Legal (Mexico), ctc_rMYGbmu7Piu5Pmwei
website: the live firm is https://alquimialegal.mx , Wix, with an English version, rendered by site-audit.js on 25 Sep, and the lemlist record's alquimialawyers.com has no DNS
gdpr: no consent code, no trackers before a click, first party cookies only per site-audit.js on 25 Sep, and a Mexican firm outside the GDPR's reach for its own visitors
apps: a correspondent IP practice for international clients per her lemlist summary, no process evidence on https://alquimialegal.mx
social: linkedin, instagram alquimialegalmx, facebook and WhatsApp linked from the HTML per site-audit.js
squad: a law firm, not a builder, no software work in the crawl or the lemlist record
verdict: NO_STRONG_ANGLE
```

## Romain Coquio, Carrefour Contact Mesnil-Roc'h. NO_STRONG_ANGLE.

```sweep
lead: Romain Coquio, gérant of SARL EMAROM (SIREN 504393612) with Anne Coquio, a Carrefour Contact franchise, ctc_FhCDinsZ4DN9M3fdC, per recherche-entreprises.api.gouv.fr on 25 Sep
website: no site of his own, lemlist companyDomain is carrefour.fr and the store sits on directory pages he can't change, per state/drafted_2026-09-25-batch9-redo.md
gdpr: nothing of his to test, the only web pages are Carrefour's own network pages per the lemlist record
apps: home delivery, Mondial Relay and a butcher per the lemlist description, a village superette's volume fails the 5k to 50k test
social: a LinkedIn company page per lemlist, no store Facebook page found by search on 25 Sep
squad: a franchised supermarket, not a builder, no software work anywhere in the lemlist record
verdict: NO_STRONG_ANGLE
```

## Matthias Ufer, Schumacher Verfahrenstechnik. NO_STRONG_ANGLE.

```sweep
lead: Matthias Ufer, Geschäftsführender Gesellschafter, Schumacher Verfahrenstechnik GmbH, ctc_3L5hXyZ8hWrh8tAGC
website: 71 pages crawled on 25 Sep, modern Framer build with a DIN 2303 defence welding page and quotes in 24 hours, run by an agency (avermann.eu), per state/drafted_2026-09-25-batch9-redo.md
gdpr: consent banner with reject, 0 cookies and 0 trackers before a click per site-audit.js on 25 Sep, zero trackers even from the US. Clean
apps: the Materialabverkauf copy and paste flow is a stock clearance sideline, small, per the 25 Sep crawl
social: no social linked from the HTML per site-audit.js with its control on 25 Sep
squad: an engineering firm, not a software builder. The defence growth signal we were watching for isn't there, tools/news.py de gives 1 result for the company (2011) and 0 for defence suppliers in their region, control Volkswagen 99
verdict: NO_STRONG_ANGLE
```

## Steven Uitentuis, QWIC. NO_STRONG_ANGLE.

```sweep
lead: Steven Uitentuis, CEO, QWIC, ctc_uiZnjF5t5mX8ZDJtc
website: https://www.qwic.nl and qwic.de rebuilt with the new Elan and Signal and a working dealer locator, screenshots from site-audit.js on 25 Sep
gdpr: settled on 25 Sep with tools/eu-view.py from Stockholm, Cookiebot holds the trackers back, control allbirds.eu behaving the same way. Clean
apps: dealer.qwic.nl is their own dealer portal per the 25 Sep crawl of https://www.qwic.nl , nothing to sell there
social: instagram qwic_ebikes, facebook qwicnl and linkedin linked from their HTML per site-audit.js
squad: a bike brand, no developer vacancies found in the 25 Sep crawl, the dealer portal already exists
verdict: NO_STRONG_ANGLE
```

## Cédric Morel, Hula Hoop. NO_STRONG_ANGLE.

```sweep
lead: Cédric Morel, CEO, SARL Agence Hula Hoop (RCS Lyon 529 547 432), ctc_wsqBdgSdjP6P6Yxvw
website: 300 pages crawled capped on 25 Sep (267 at 200), a modern multi office agency site with projects, expertise and jobs, per the crawl of https://www.hula-hoop.co/
gdpr: no consent code and 0 cookies and 0 trackers before a click per site-audit.js on 25 Sep, no trackers so no geo question
apps: a 70+ talent agency, no internal process gap shown on 267 pages of https://www.hula-hoop.co/ in the 25 Sep crawl
social: LinkedIn, Instagram, Facebook Montreal and TikTok all linked from their HTML per site-audit.js on 25 Sep, active
squad: an integrated tech team with a Fullstack Developer on the team page and no developer role open per https://www.hula-hoop.co/jobs/ on 25 Sep
verdict: NO_STRONG_ANGLE
```

## Connor Bosco, Elevate Marketing. NO_STRONG_ANGLE.

```sweep
lead: Connor Bosco, co owner, Elevate Marketing, also Advertising Manager at CARTESIAN per his lemlist tagline, ctc_83MwQqhh6XPF8RzQJ
website: 3 pages, a Wix site whose title is still Home | My Site per site-audit.js on 25 Sep at https://www.elevatemarketingstudio.com , a small unfinished site for a side business
gdpr: no consent code and no trackers per site-audit.js on 25 Sep, a privacy page exists in the crawl
apps: a two person side studio, no process to fix in the 25 Sep crawl
social: Instagram and Facebook linked from their HTML per site-audit.js on 25 Sep, the channels are in place
squad: two people next to full time jobs per the lemlist tagline, no budget in the 5k to 50k band shown
verdict: NO_STRONG_ANGLE
```

## Ollie Bartlett, Collier Pickard. NO_STRONG_ANGLE, with a privacy note.

```sweep
lead: Ollie Bartlett, owner via P and B Business Solutions Ltd since 28 Aug 2025 per Companies House, Collier Pickard Limited 04961587, ctc_y3mjzEXbiLzEHSAMB
website: 300 pages crawled capped on 25 Sep, a CRM consultancy with Maximizer, Creatio, Infor, Pipedrive and Teamwork pages, strong, per the crawl of https://www.collierpickard.co.uk/
gdpr: tools/eu-view.py from Stockholm today, CookieYes loads but Snowplow cookies (_sp_id, _sp_ses) are set before a click and a B2B visitor identification host (secure.imaginativeenterprising-intelligent.com) is called, https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fwww.collierpickard.co.uk . One tool, true for the UK, small
apps: they build CRM for others, nothing internal visible per the 25 Sep crawl of https://www.collierpickard.co.uk/
social: no social linked from the HTML per site-audit.js on 25 Sep, a LinkedIn company page exists per lemlist, minor
squad: the largest team of certified Creatio analysts and developers in the UK per the 25 Sep crawl, they already have developers
verdict: NO_STRONG_ANGLE, a competitor with its own developers
```

## Yasin Tipiler, UGC.NL. NO_STRONG_ANGLE, with a privacy note.

```sweep
lead: Yasin Tipiler, co founder and CEO of UGC.NL per his lemlist summary and tagline (record's company The Sales Academy), ctc_rHvwocWb8FubKWECm
website: 231 pages crawled on 25 Sep, a Next.js creator platform, per state/drafted_2026-09-25-batch10-build-squad.md
gdpr: tools/eu-view.py from Stockholm today, Cookiebot loads but Hotjar session cookies (_hjSession, _hjSessionUser) and trytagging cookies are set before a click, https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fugc.nl . A second check failed, the loader isn't in the page's own bundles, it comes in through tag management. One tool only, not written
apps: they are the platform, brands and creators matched in their own app per the 25 Sep crawl of https://ugc.nl
social: LinkedIn, Instagram and YouTube linked from their HTML per site-audit.js on 25 Sep, nothing there ours to sell
squad: no careers or developer roles on 231 pages per the 25 Sep crawl
verdict: NO_STRONG_ANGLE. If Raka checks ugc.nl from the Netherlands and Hotjar records before consent, it's a Dutch AP risk and a privacy opener
```

## Orion D., Omnilabs Research. NO_STRONG_ANGLE.

```sweep
lead: Orion D., co founder and CEO, Omnilabs Research, ctc_JiMGgwH639YbSSZfE
website: a one page Webflow site with mission, technology, team and a book a call form per the 25 Sep crawl of https://omnilabs-research.com , early research stage
gdpr: the privacy link is "#" per site-audit.js on 25 Sep, real but small before launch
apps: pre revenue and still recruiting trial participants per the 25 Sep crawl of https://omnilabs-research.com , no process to fix yet
social: Instagram and his own LinkedIn profile linked from their HTML per site-audit.js on 25 Sep, fine for a research stage company
squad: pre revenue with no budget signal in the 5k to 50k band per the 25 Sep crawl
verdict: NO_STRONG_ANGLE
```

## Hendrik Rolshausen, Prevent. NO_STRONG_ANGLE.

```sweep
lead: Hendrik Rolshausen, co founder and CEO, Prevent (prevent-app.com), ctc_JeAs47xZuy9Pxpgp2
website: 116 pages crawled on 25 Sep, booking flow, packages, lab partners and a blog per the crawl of https://www.prevent-app.com , strong
gdpr: consent banner with reject and 0 trackers before a click per site-audit.js on 25 Sep, a health data product doing it right
apps: they are the app, wearable integrations are "in Entwicklung" per the 25 Sep crawl, their own team building
social: no social accounts linked from their HTML per site-audit.js on 25 Sep, a gap for a young B2C health brand but secondary, and small
squad: "Aktuell sind keine offenen Stellen ausgeschrieben" on their careers page per the 25 Sep crawl, no capacity gap
verdict: NO_STRONG_ANGLE
```

## Jean-Christophe Conticello, Wemanity. NO_STRONG_ANGLE, on who.

```sweep
lead: Jean-Christophe Conticello, Wemanity, acquired by Reply S.p.A. (announced Nov 2022), now Wemanity Reply, ctc_iWGMxjeTYkzegg78v, per the queue row with the site's own Careers and privacy links pointing to reply.com
website: the site's careers and privacy links go to https://www.reply.com , a listed group's property, not his to buy for
gdpr: the privacy link points to https://www.reply.com/en/privacy-policy , the group's policy, nothing of his own to test
apps: a consultancy inside a listed group, so buying runs through Reply, per the careers link to https://www.reply.com/en/about/careers
social: group channels run by Reply, per the links on the Wemanity site to https://www.reply.com , nothing he could buy
squad: a firm acquired into a listed group that has its own developers, per https://www.reply.com , nothing ours to sell
verdict: NO_STRONG_ANGLE, a firm acquired into a group
```

## Mushtaq Taher, RentX Rewards. NO_STRONG_ANGLE.

```sweep
lead: Mushtaq Taher, Founder and CEO, RentX Rewards, ctc_a5ZNoyKHLFEhjudiu
website: rentxrewards.com serves a Bengali site at /bn for renters in Bangladesh, title "রেন্টএক্স", site-audit.js RENDER NOT TRUSTED so no visual claim
gdpr: 0 cookies and 0 trackers before a click per site-audit.js, and a Bangladeshi consumer app outside the GDPR's reach
apps: they are the app, rent paid for points, per https://rentxrewards.com/bn and the lemlist record
social: linkedin, instagram, facebook and youtube all linked from their HTML per site-audit.js, active
squad: an app startup, but a Bangladesh rent app is outside the 5k to 50k euro band on anything we can see, no funding in the lemlist record and no developer roles on https://rentxrewards.com/bn
verdict: NO_STRONG_ANGLE
```

## Mike Kokken, Stichting wysiwyg. NO_STRONG_ANGLE, on fit.

```sweep
lead: Mike Kokken, Co Owner and Curator, Stichting wysiwyg (wysiwygcinema.net), a Dutch arts foundation run by curators, ctc_o3ForTXDfkfyfM8zg
website: a small curators' cinema site, rendered today by site-audit.js, instagram linked, nothing broken found
gdpr: 0 cookies and 0 trackers before a click per site-audit.js, no privacy link found against its control, small and not a sale
apps: a volunteer run screening programme per the lemlist record, no process a tool would fix
social: instagram wysiwygcinema linked from their HTML per site-audit.js, the channel their audience uses
squad: a stichting with no budget in the 5k to 50k band per its lemlist record and https://wysiwygcinema.net , not a builder
verdict: NO_STRONG_ANGLE
```

## Shail Niazi, Clean Valley CIC. NO_STRONG_ANGLE, on who.

```sweep
lead: Shail Niazi, Chief Culture Officer, Clean Valley CIC, ctc_dMw3WnJAbBkWEXinv. CIPO names Nicholas H. LaValle as CEO and co founder per the 23 Sep queue row
website: cleanvalleycic.com fails over HTTPS today, site-audit.js HTTPS_BROKEN_HTTP_FINE, control example.com 200, not our place to say more while he isn't the buyer
gdpr: not tested, the page wasn't read over HTTPS per site-audit.js, and he doesn't run the business
apps: nothing to assess from a page we couldn't read, per site-audit.js today
social: nothing can be said about accounts on a page we couldn't read over HTTPS, per site-audit.js today with its control
squad: not the buyer, the CEO is LaValle per the queue row and the register he cited
verdict: NO_STRONG_ANGLE, not the person who runs it
```

## Mandy Kerley, Aptiq Works. NO_STRONG_ANGLE, on who.

```sweep
lead: Mandy Kerley, Co-Founder and Fractional COO, Aptiq Works Limited, the statutory record gives Paul Reid outright control per the queue row, ctc_ZGv33qKajKqMjkqH9
website: trickle.works is strong with named public sector clients per the queue row, rendered today by site-audit.js
gdpr: a consent banner with reject and Google consent mode in the HTML, site-audit.js GEO VOID, not judged because she isn't the buyer
apps: Trickle is their product per https://trickle.works , nothing internal to sell against
social: no social account linked from the HTML of https://trickle.works per site-audit.js today with its control
squad: a fractional COO doesn't buy developers for a company Paul Reid controls, per the register note in the queue row
verdict: NO_STRONG_ANGLE, not the owner
```

## Peter Borup, Quadrise plc. NO_STRONG_ANGLE, on who.

```sweep
lead: Peter Borup, Chief Executive Officer, Quadrise plc, an AIM listed company, ctc_PfumJJpZ3WaLpBduY
website: quadrise.com rendered today by site-audit.js, a listed company's investor facing site run by IR and comms
gdpr: a moove_gdpr banner, site-audit.js GEO VOID, not taken further for a listed plc
apps: fuel technology, nothing internal we'd build per the site-audit.js read of https://www.quadrise.com
social: linkedin, youtube and x linked from their HTML per site-audit.js, all corporate
squad: a listed plc, the rule 13 exclusion, nothing ours to sell per https://www.quadrise.com and the lemlist record
verdict: NO_STRONG_ANGLE, a listed plc
```

## Debby Alles, Sportcafé de Kogge. NO_STRONG_ANGLE.

```sweep
lead: Debby Alles, Mede-eigenaar per her own record, Sportcafé de Kogge, the VZV club canteen at Rijdersstraat 112 per her lemlist companyDescription, ctc_kQqT7THXoonLA9z7M
website: no website on the lemlist record, the canteen lives on Facebook, and a club canteen's customers are already there
gdpr: nothing to test, there's no domain on the lemlist record and no site found for the canteen
apps: a sports club canteen, no process worth 5k to 50k per the lemlist description
social: Facebook only per the lemlist record and the 23 Sep search, which is where club members already are
squad: a club canteen, not a builder, and nothing in the lemlist record points to software
verdict: NO_STRONG_ANGLE
```

## Marek Pruszewicz, Dialogue Earth. NO_STRONG_ANGLE.

```sweep
lead: Marek Pruszewicz, Chief Executive Officer, Dialogue Earth, a donor funded non profit newsroom, ctc_RwGCRQoJiAPgqtJeh
website: dialogue.earth answers our browser with a Cloudflare challenge today (site-audit.js BLOCKED_BY_THEIR_WALL), Raka's own screenshots on file show a full, modern newsroom
gdpr: not readable from here, the Cloudflare wall per site-audit.js, never evidence either way
apps: a donor funded newsroom with no conversion goal we could improve, per the lemlist record
social: not readable behind the wall per site-audit.js, the queue row notes active publishing
squad: in house editorial and product per the lemlist record, no developer roles found, the site behind a Cloudflare wall per site-audit.js
verdict: NO_STRONG_ANGLE
```

## David Risser, Ethics & Boards. NO_STRONG_ANGLE.

```sweep
lead: David Risser, Directeur Général, Ethics & Boards (Paris), Président Floriane de Lanversin per the 24 Sep queue row, ctc_satcBNYw3AiFrhofe. He runs it, he doesn't own it
website: https://www.ethicsandboards.com rendered today by site-audit.js, a new Astro site in English and French with Gov360 Data, advisory and solutions, strong
gdpr: 0 cookies and only Google Fonts before a click per site-audit.js, no consent code needed with no trackers. Clean
apps: they sell data products themselves, 450+ KPIs across 7,000+ listed companies per the homepage crawl, nothing internal visible
social: LinkedIn linked from their HTML per site-audit.js, a weekly data point newsletter, active
squad: the careers page asks for research and data people, not developers, per https://www.ethicsandboards.com/careers/ , no capacity gap shown
verdict: NO_STRONG_ANGLE
```

## Fabrice Beauchêne, Glyx Therapeutics. NO_STRONG_ANGLE.

```sweep
lead: Fabrice Beauchêne, CEO and co founder, Glyx Therapeutics, a clinical stage tau biotech, ctc_nFBoAwdTou6kXWRLN
website: glyxtherapeutics.com, site-audit.js RENDER NOT TRUSTED on 4 of 4 assets, so no visual claim, WordPress with Elementor
gdpr: no consent code in the HTML and Google Analytics before a click per site-audit.js, so it holds for French visitors. Real, and a small fix for a biotech whose site isn't a sales channel
apps: clinical development of a tau drug, nothing we build, per the lemlist description and https://glyxtherapeutics.com
social: LinkedIn linked from their HTML per site-audit.js, the channel investors and partners use
squad: a drug developer, no software roles in the lemlist record or on the site
verdict: NO_STRONG_ANGLE
```

## Aditya Taneja, Mapler AIx. BLOCKED_NEEDS_INFO, the site is being built right now.

```sweep
lead: Aditya Taneja, Founder and CEO, Mapler AIx Inc. (Canada, registered 12 Dec 2024, active, per canadacompanyregistry.com), ctc_5HHoJvby9douo33PE
website: mapler.com changed this evening. site-audit.js rendered a Mapler AIx contact page (Toronto address, "Flights, Vacation Homes, Hotels") with its stylesheet and eight files at 404, then minutes later curl six times and tools/crawl.py got the One.com "under construction" page again. Mid build, nothing stable to judge
gdpr: no consent code and only Google Fonts and Maps before a click per site-audit.js on the one render, not a finding on a page that won't hold still
apps: he's a full stack and ML engineer per his lemlist record, building a travel booking product himself, too early to see a process
social: none linked on the one render per site-audit.js, and the lemlist record shows only his LinkedIn
squad: a one founder build of an OTA is a Build Squad shape, but there's no stable site, team page or funding to evidence it yet, per the register and tools/news.py
verdict: BLOCKED_NEEDS_INFO. Recheck mapler.com in a week, if the travel site is live it may be a build squad lead
```

## Fernando Gomes, DS Private Matosinhos. BLOCKED_NEEDS_INFO.

```sweep
lead: Fernando Gomes, lemlist jobTitle Co-Owner of DS PRIVATE MATOSINHOS, ctc_TFuBoDoAp5Tntr8vC. His own record's summary and experience lines say compliance and test engineer, Roche contractor, located in Lima
website: https://www.dsprivate.com is the DS Private network's site in Portuguese, rendered today by site-audit.js, a franchise brand site, not his branch's to change
gdpr: Google Analytics before a click with no banner per site-audit.js, but it's the network's site, not his
apps: nothing ties him to running the Matosinhos branch beyond one lemlist field, the rest of the record points elsewhere
social: instagram and facebook dsprivate.realestate linked from the network's HTML per site-audit.js, the network's accounts, not his
squad: a real estate network, not a builder, and the ownership isn't reconciled against the lemlist record
verdict: BLOCKED_NEEDS_INFO, the record can't be reconciled with evidence
```

## Anna Oblakova, YTEC. NO_STRONG_ANGLE, on who.

```sweep
lead: Anna Oblakova, Product Owner, YTEC (Groningen software agency, 11 to 50 staff) per her lemlist record, accepted 25 Sep, connect note only in her thread per state/drafted_2026-09-25-owed-replies.md
website: YTEC's own site belongs to its directors, not to her, per the lemlist record
gdpr: not tested for a message, she doesn't run the business per the lemlist record
apps: they build software for clients per the lemlist description, nothing internal of theirs to sell against
social: YTEC's company channels belong to the directors, not to her, per the lemlist record
squad: a software agency is a Build Squad shape, but a product owner doesn't buy developers, the directors do, per the lemlist record
verdict: NO_STRONG_ANGLE, not the owner. If Raka wants YTEC as a Build Squad lead, the director is the person to connect with
```

---

## Social media, opened for real, 2026-09-28

Raka asked whether social was checked for the rest. It wasn't properly. On 27 Sep most social lines
only listed which accounts their HTML links to. On 28 Sep tools/social-audit.js opened all 46 linked
accounts across the remaining leads. Raw output in logs/inbox/2026-09-28-social-audit-raw.txt.

- Instagram, every one of them, rate limited 429. UNKNOWN, never empty.
- Facebook pages load behind the login prompt, most without a readable last post date. UNKNOWN recency.
- Read with numbers. Halloween LinkedIn 967, Dariuz LinkedIn 899, Ethics & Boards 730, dotega 536,
  Hula Hoop LinkedIn 489 and TikTok 781, Bunkz YouTube 547 with 239 videos and TikTok 3,743, UGC.NL
  Facebook 120 and YouTube 4, Elevate Facebook 126, RentX YouTube 2 with 18 videos, Quadrise YouTube
  48 with 4 videos, ScrubMarine TikTok 52.
- One real finding. The TikTok link on ugc.nl, https://www.tiktok.com/@ugc.nl, answers "Couldn't find
  this account", while the same tool read Bunkz's and Hula Hoop's TikTok in the same run. For a creator
  video platform that's a credibility slip, but removing a link is a tweak, not a sale.
- Verdict. No social angle passes the pay test for any of the remaining leads. The verdicts stand.
