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
