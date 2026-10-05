# Signals, b5_bert, Bert Christiaens, Views BV, 2026-10-05

**A, an app or tool for efficiency. NO SIGNAL.** Client ops scale by hand (WhatsApp group, weekly Loom, monthly call per client, ten projects at once), but they automate on their own n8n and Monday, sell the same, and say on their own pages that they'd rather grow with people and avoid dashboards.
**B, a better website. SIGNAL.** They're expanding into Wallonia, and the French site is a 16 page shell over a 183 page Dutch one. The explainer video is in Dutch, every case links to a Dutch page, and there are no Walloon city pages. Pieter's own article names each of these as the thing that kills a Wallonia launch.

## Thread, re-pulled 2026-10-05 17:57 UTC

`get_inbox_conversation(ctc_PypkM4r3QPKkeENR3)` returned 4 items, totalItems 4, nextPage null, LinkedIn sync "recent" at 17:56:13Z.
1. 14:50:14Z, us, the connect note.
2. 14:50:37Z, him, "Yes Raka, love to connect!"
3. 14:51:21Z, him, "Recently was in Jakarta!"
4. 17:52:00Z, us, the stroopwafel line and "What took you out there, work or travel?"

He hasn't answered yet. So nothing goes out now. The draft below is the NEXT message, for after he answers, and it opens by answering him.

## What changed against the earlier NO_STRONG_ANGLE

The earlier judge treated the FR and EN pages as a box ticked ("FR and EN versions") and took the visible CRM note as the only French finding. Reading the French pages in full against the Dutch ones gives a different answer.

- The Dutch sitemap has 183 URLs, the French one 16 (6 core pages and 10 blog posts). Source: https://viewsvideomarketing.be/sitemap.xml, fetched live 17:58 UTC, 214 `<loc>` in total, 16 under /fr, 15 under /en.
- On https://viewsvideomarketing.be/fr/resultats all 12 case cards link to Dutch pages (`/cases/fassade-gevelrenovatie-lichtreclame` and 11 more, hrefs read from the live HTML). The page itself says "Les pages de cas détaillées sont en néerlandais. Une version française suit." I saw that sentence in the render-via-curl screenshot (/tmp/claude-0/b5bert-frres-curlrender-part1.png, 15 served, 0 curl errors).
- On https://viewsvideomarketing.be/fr and https://viewsvideomarketing.be/fr/le-concept the 4 minute explainer ("En 4 minutes Pieter explique comment ça marche") is labelled "Vidéo en néerlandais". The 4 case cards on /fr also link to Dutch case pages.
- The footer on every French page reads "Offres d'emploi (NL)", "Base de connaissances (NL)" and "Site en néerlandais".
- On https://viewsvideomarketing.be/fr/contact, a box under the form says "⚠️ Ce formulaire doit encore être relié à Monday CRM via n8n." It's `<p class="note">` inside the form and I saw it in /tmp/claude-0/b5bert-frcontact-curlrender-part0.png (0 curl errors). The form posts to /aanvraag.php, their n8n webhook, so leads still arrive. It costs trust, not leads.
- There are no Walloon city pages. The sitemap has 0 URLs for Liège, Luik, Namur, Namen, Charleroi, Mons, Tournai, Mouscron or Wavre. /liege, /fr/liege and /fr/namur all return 404. https://viewsvideomarketing.be/werkgebied lists "67 regio's in Vlaanderen" and answers "Werken jullie ook in Wallonië of Brussel? We bouwen dat uit."
- **Their own diagnosis.** Pieter wrote https://viewsvideomarketing.be/kennisbank/meta-ads-wallonie-vs-vlaanderen. It says "Het sociale-bewijsprobleem bij een lancering. Dit is de echte hindernis. Je sterkste argument in Vlaanderen zijn je Vlaamse cases. In Wallonië zeggen die namen niets, en een prospect die 'Fassade' of 'Renowrap' niet kent, ziet enkel een onbekend bureau." (The social proof problem at launch is the real hurdle. Flemish case names mean nothing in Wallonia, and a prospect who doesn't know Fassade or Renowrap just sees an unknown agency.) It also says "Je stadspagina's. Franstalige versies van Vlaamse gemeentes zijn zinloos, je hebt Waalse steden nodig: Liège, Charleroi, Namur, Mons, Tournai." (French versions of Flemish town pages are pointless, you need Walloon cities.) Fassade and Renowrap are the first two cards on their own French results page.
- Direction, from two sources that agree: https://viewsvideomarketing.be/over-views says "We werken in heel Vlaanderen en breiden uit richting Wallonië" (we work across Flanders and are expanding into Wallonia), and /werkgebied says "We bouwen dat uit" (we're building that out). Growth context is on https://viewsvideomarketing.be/vacatures, which says "We gaan van €672.000 naar €1,5 miljoen" and lists 4 open roles. That's for judging only, never for the message.
- Age of the French section. The Wayback CDX prefix query for viewsvideomarketing.be/fr came back `[]`. The control query for the root, in the same minute, returned 3 snapshots in 2026, the last on 2026-03-09. So nothing under /fr was archived up to then. That points to the French section being new, but it's an inference, not a date. The snapshot page itself was walled (WebFetch can't reach web.archive.org, curl tunnel closed).

## Signal table

| # | Letter | Signal | Source, date | Cost of not acting | Pay | Tweak | Named unprompted | Result |
|---|---|---|---|---|---|---|---|---|
| 1 | B | The Wallonia expansion runs on a French site whose proof is Dutch. The explainer video is Dutch, all 12 cases link to Dutch pages, there are no Walloon city pages, and the form shows a dev note | /fr, /fr/resultats, /fr/contact, sitemap.xml, /werkgebied, all live 2026-10-05 17:58 UTC | Walloon owners reached by their campaigns meet "an unknown agency", which is their own words, so fewer of them book the call that the whole Wallonia push depends on | yes. A French site with French cases, Walloon city pages and a French explainer is weeks of work, not an afternoon | passes. It's far more than an afternoon (12 case pages, about 5 city pages, a reshot or revoiced explainer) | yes. Pieter wrote the article naming exactly this, and the site says "Une version française suit" | **SIGNAL, the costliest** |
| 2 | B | The visible CRM dev note on the FR and EN contact forms | /fr/contact, /en/contact, live 17:58 UTC, screenshot | Trust only, since leads still reach n8n | no | fails, it's a one line delete | maybe | the proof inside #1, not a pitch |
| 3 | B | A revenue jump plus 4 hires means the site has to carry recruitment | /vacatures | Hiring runs on their own forms already, 4 job pages with 5 to 7 minute questionnaires | no | n/a | no | no signal |
| 4 | A | Per client manual ops (a WhatsApp group, weekly Loom or WhatsApp update, monthly call, a Monday board) with "tien projecten tegelijk" (ten projects at once) | /90-dagen, /project-manager, /diensten | PM hours grow with every client | maybe | no | no. /diensten says "Geen dashboard met bereik en impressies" (no dashboard of reach and impressions), and they report by call on purpose | no signal |
| 5 | A / squad | "Fase 2 extern", selling their in-house AI automation to clients | /kennisbank/ai-agents-voor-kmo-wat-kan-vandaag-echt | A slower move into AI services | maybe | no | no. The same article tells buyers to distrust AI the seller doesn't run in house | no signal |
| 6 | A | Lead routing and CRM | /aanvraag.php (n8n webhook), /kennisbank/van-websiteformulier-naar-crm-zonder-tussenstappen ("Heb ik daar een ontwikkelaar voor nodig? ... niet", do I need a developer for it, no) | none, they already have it | no | n/a | no | no signal |
| 7 | funding | Funding round, capital increase | KBO 1027.798.538 (BV from 18 Sep 2025), northdata (capital €1,000). No news on "Views BV" via tools/news.py fr and nl, control 100 | n/a | n/a | n/a | n/a | none found |

**The four always pitch signals, checked.**
1. GDPR. Webbkoll from Stockholm on /contact found 0 cookies, Meta pixel gated, only Google Fonts before consent. Small.
2. Certificate. `curl -v` showed CN=viewsvideomarketing.be, Let's Encrypt YE1, valid 26 Aug to 24 Nov 2026. Clean.
3. WordPress. No. Astro, no generator meta and no wp-content.
4. Era. The site is modern (render-via-curl screenshots).

None of the four applies, so B rests on signal 1 alone.

## Disproof attempts on signal 1

- **Is it already planned or in progress?** Yes, partly. "Une version française suit" (a French version follows) and "We bouwen dat uit" (we're building that out). This is the strongest point against. They know about it and say they'll do it. It also proves the owner would name the pain. The open question is whether they'd pay someone else to do it.
- **Can they do it themselves in an afternoon?** No for the whole thing. 216 pages exist, so they can produce pages fast, likely with AI help. But French case studies need French client results, and the explainer is a film of Pieter talking in Dutch. Their own article says the French has to be written by a native speaker who understands sales psychology, "niet een vertaalbureau" (not a translation agency). That's more than an afternoon for a team of video makers, marketers and salespeople with no developer or French copywriter on /over-views. Partial pass.
- **Do they even want Walloon traffic yet?** Yes. /over-views and /werkgebied both say they're expanding, the French site exists, and 10 French blog posts target Walloon buyers by name (Namur, Liège, Brabant wallon). Whether they already run French ads for Views itself is UNKNOWN. I didn't read the Meta Ad Library (Facebook walled), so the draft doesn't claim they run ads.
- **Is an agency already rebuilding it?** No credit to any outside builder in the HTML. The site was rebuilt from Framer to Astro in house or by an unnamed hand. Nothing says an agency is on it.
- **Is the person right?** Bert is Head of Performance and co-director. Pieter is CEO and Sales, wrote the Wallonia article and decides on deals. Bert can carry it to him, but the decision is shared. Flagged.
- **Positive controls.** The same sitemap read found 16 /fr URLs, and "geraardsbergen" matched my "bergen" pattern, so the grep matches city slugs. example.com returned 200 in the same minute. The Wayback CDX returned rows for the root in the same minute as the empty /fr query.

**Confidence MEDIUM.** The facts are proven on live pages and screenshots. The weak link is the pay test. A peer agency that has written "a French version follows" may well finish it itself.

## Gate and draft

```gate
lead: Bert Christiaens, co-founder, Head of Performance and co-director of Views BV with Pieter Herremans (CEO & Sales) per KBO https://kbopub.economie.fgov.be/kbopub/zoeknummerform.html?nummer=1027798538 , ctc_PypkM4r3QPKkeENR3. lemlist jobTitle "Mede-oprichter". Thread re-pulled 2026-10-05 17:57 UTC, 4 items, nextPage null, our connect note, his "Yes Raka, love to connect!" and "Recently was in Jakarta!", our 17:52 stroopwafel reply asking what took him there, no answer yet
site pass 1: 150 pages by tools/crawl.py --max 150, all 200, every page read (evidence.md)
site pass 2: 216 pages by tools/crawl.py --max 300 covering all 214 sitemap URLs, all 200, plus today the live /fr, /fr/resultats, /fr/contact, /fr/le-concept, /en/contact, /werkgebied, /vacatures, the Wallonia article and sitemap.xml refetched 17:58 UTC, render-via-curl screenshots of /fr/resultats and /fr/contact with 0 curl errors, desktop and phone of the homepage from the earlier run
deep analysis: a strong Dutch lead generation site (12 cases, a calculator, 67 Flemish region pages, an explainer by Pieter) and a French site of 16 URLs that hands every case and the explainer back to Dutch, offers no Walloon city page and shows a dev note on its form, while /over-views and /werkgebied say they're expanding into Wallonia and Pieter's own article says Flemish proof and Flemish town pages don't work there
owner linkedin: Pieter Herremans, route 1 not tried as curl gives 999 on /in/ pages, route 2 news.py person query 0 results fr and nl, route 3 his own words, the bylined article https://viewsvideomarketing.be/kennisbank/meta-ads-wallonie-vs-vlaanderen and https://viewsvideomarketing.be/en/blog/advertising-in-belgium-what-makes-it-different , route 4 KBO director since 18 Sep 2025, route 5 company page https://www.linkedin.com/company/views-video-marketing/ via social-audit, route 6 /over-views "CEO & Sales"
contact linkedin: Bert Christiaens, https://www.linkedin.com/in/bert-christiaens 999, web search title "Bert Christiaens - Views", lemlist summary and tagline read, his bylined AI articles on the site, the YouTube channel @BertChristiaens probable but unproven so unused, same-name people (Nestly, ING, Baloise) excluded
google news: tools/news.py nl "Views Video Marketing" 0, "Views Dentergem" 0, and fr "Views BV" 0, "Pieter Herremans" 0, control Heineken 100 and Carrefour 100
regional news: tools/news.py fr (Wallonie) (agence marketing vidéo PME) 0 results, nl Waregem and West-Vlaanderen videomarketing 0, controls full
industry news: tools/news.py fr agence marketing vidéo PME 14 headlines, none Belgian or about Views, nl Marketing Report and Nieuwsblad headlines unopened and unused
sources:
1. https://viewsvideomarketing.be/fr
2. https://viewsvideomarketing.be/fr/resultats
3. https://viewsvideomarketing.be/fr/contact
4. https://viewsvideomarketing.be/sitemap.xml
5. https://viewsvideomarketing.be/werkgebied
6. https://viewsvideomarketing.be/over-views
7. https://viewsvideomarketing.be/kennisbank/meta-ads-wallonie-vs-vlaanderen
8. https://viewsvideomarketing.be/vacatures
9. https://kbopub.economie.fgov.be/kbopub/zoeknummerform.html?nummer=1027798538
10. https://www.northdata.com/Views+BV,+Dentergem
11. https://web.archive.org/cdx/search/cdx?url=viewsvideomarketing.be/fr&matchType=prefix (empty, root control 3 rows in 2026)
12. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fviewsvideomarketing.be%2Fcontact
13. https://www.linkedin.com/company/views-video-marketing/ (social-audit)
14. https://www.instagram.com/viewsagency.be (social-audit)
15. https://www.sortlist.com/agency/views-video-marketing
16. https://news.google.com/rss (tools/news.py, fr and nl)
pains: 7 judged, (1) the French site serves the Wallonia expansion with Dutch proof, (2) the CRM dev note on the FR and EN forms, (3) recruitment load on the site, (4) per client manual reporting, (5) Fase 2 AI productisation, (6) lead routing, (7) funding or capital events, none found
chosen: (1), costliest and hottest, it sits on the market they say they're expanding into now and their own article calls it the real hurdle, the CRM note is its visible proof, not the pitch
sweep website: https://viewsvideomarketing.be/fr has 16 sitemap URLs against 183 Dutch, explainer "Vidéo en néerlandais", 12 of 12 cases link to Dutch pages, no Walloon city page, screenshot via render-via-curl 0 curl errors, chosen
sweep gdpr: tools/eu-view.py Webbkoll Stockholm on https://viewsvideomarketing.be/contact , 0 cookies, Meta pixel gated, only Google Fonts before consent, certificate valid per curl -v, not chosen
sweep apps: client ops on Monday CRM, WhatsApp and a self hosted n8n webhook https://viewsvideomarketing.be/aanvraag.php , /diensten reports by call and rejects dashboards, they sell automation themselves, not chosen
sweep social: tools/social-audit.js on the accounts in the site's HTML, Instagram 6,510 followers latest post 2026-10-05, LinkedIn 1,073 followers posting every few days with a stale About, a social agency, not chosen
sweep squad: four open roles on https://viewsvideomarketing.be/vacatures are sales, marketing, PM and scriptwriting, no developer on /over-views, automation built in house on n8n, not chosen
thread: problem the French site plays the explainer in Dutch and links every case to a Dutch page | cost every Walloon owner reached during the expansion lands on proof that only works in Flanders and fewer book the call | offer the French Views site that wins Walloon clients | link French, Walloon
lead read: Bert reads that a Walloon owner on his French site gets a Dutch video and Dutch case pages from clients he doesn't know, that this is what every Walloon prospect meets while Views expands south, and gets offered a French Views site built to win Walloon clients, one thread
claims:
your French site plays the explainer video in Dutch, https://viewsvideomarketing.be/fr "En 4 minutes Pieter explique comment ça marche ... Vidéo en néerlandais", also /fr/le-concept, rechecked 17:58 UTC
links every case to a Dutch page, https://viewsvideomarketing.be/fr/resultats 12 case hrefs all /cases/... Dutch pages and "Les pages de cas détaillées sont en néerlandais. Une version française suit.", rechecked 17:58 UTC, screenshot /tmp/claude-0/b5bert-frres-curlrender-part1.png
the proof you've packed into the Dutch site, https://viewsvideomarketing.be/cases 12 cases with numbers and https://viewsvideomarketing.be/kost-per-klant calculator, crawl pass 2
taking Views into Wallonia, https://viewsvideomarketing.be/over-views "breiden uit richting Wallonië" and https://viewsvideomarketing.be/werkgebied "We bouwen dat uit", rechecked 17:58 UTC
I built a food brand from zero with my family and took it into a second region, docs/astra-master-context.md 2A, Eten Maar, five relatives, expanded to Bali, region not named
recheck: 2026-10-05 17:58 UTC, every page above refetched live and the quoted strings found in the fresh copy, two pages rendered via curl with 0 errors, control example.com 200. Thesis confidence MEDIUM, the French gap is proven on live pages, that it costs them Walloon calls is inference he can test against his own French form numbers, and they say a French version follows, so the pay test is the weak point
```

### Bert Christiaens, Views. REPLY, for after he answers the trip question. ctc_PypkM4r3QPKkeENR3

```
Hi Bert, [answer what he says about the trip in one or two lines, in his terms]. I saw Views and the proof you've packed into the Dutch site!

However, your French site plays the explainer video in Dutch and links every case to a Dutch page. This causes a Walloon business owner to meet client names he doesn't know on pages in another language, right before you ask for his number.

Especially, when you are taking Views into Wallonia, every Walloon owner you reach lands on proof that only works in Flanders.

I run Astra agency. We build websites for brands like Unilever, AXA, Pertamina. I built a food brand from zero with my family and took it into a second region, so I know how little a home reputation counts where nobody knows your name.

Shall I send you over what the French Views site that wins Walloon clients looks like?
```

**Flags for Raka.**
- **Send only after he answers**, and only if his answer leaves room. If he writes something long or personal, answer that properly first and hold the pitch one more message.
- **Pieter decides.** He's CEO and Sales and wrote the Wallonia article. Bert can pass it to him, but expect "I'll check with Pieter".
- **They've written "a French version follows".** If Bert says it's in hand, the fallback is Build Squad: the French cases and Walloon city pages done in half the time, so their team stays on clients. That's Raka's offer and Bert could hold us to it.
- **Left out on purpose.** The "€672k to €1.5M" line (a number we'd only be quoting, not a loss), Pieter's article (quoting the clue), and the CRM note on the French and English forms. That note is true and visible, but leads still reach n8n, so naming it reads as a bug report. Keep it as a free heads up if the conversation warms.
- **Credential.** "Took it into a second region" is Eten Maar's expansion to Bali, per 2A. The place isn't named, per the no country rule.
