# nsa02, the AI default angle pass, 2026-10-06. 2 openers drafted (Naomi Yard, Emily R.), 6 closed. Nothing sent.

Brief /tmp/claude-0/agents/AI_DEFAULT_BRIEF.md, RULES.md 4A "THE DEFAULT ANGLE". Read only, no sends, no lemlist writes,
no git. Evidence files in /tmp/claude-0/agents/nsa/nsa02_ev/.

## What was run

- **Threads.** get_inbox_conversation on all 8 contactIds at 06:2x UTC, every one returned on page 1 with nextPage null
  (totalItems 2, 1, 1, 1, 2, 1, 1, 1). Martijn's and Ken's threads coming back with two items each are the positive
  control that the call returns real sends. sentOnly name searches for Naomi Yard, Emily R. and Martijn matched the same
  contactIds, no duplicate contact. No reply from anyone, ever.
- **lemlist records.** search_campaign_leads by leadId with include campaigns on all 8 (leadIds read off the threads where
  the queue had none). All 8 sit only in cam_PryZp5LuvQv8NznHh, which now reads **paused**.
- **Queue and drafts.** state/silent_accepted_queue.jsonl rows for all 8, state/drafted_2026-10-03-batch2-redo.md and
  state/drafted_2026-10-03-due3-B01.md read. No SENT row beyond the two 26 Aug pitches, no prototype, no DO_NOT_CONTACT.
  No per lead evidence folder existed under /tmp/claude-0/agents/ for these eight.
- **Sites.** tools/crawl.py twice on sem-care.nl (18 and 18), alquimialegal.mx (3 and 3, plus /en fetched), giants.eu (70
  and 70), suntaildrinkco.com (4 and 4), stridata.com (80, capped), wysiwygcinema.net (1). site-audit.js and
  render-via-curl.js on SEM-Care, eu-view.py on four, social-audit.js on every account in the sites' own HTML, news.py on
  all eight with a full control each time.

## The count

| Lead | Verdict | One line |
|---|---|---|
| Naomi Yard, SEM-Care | DRAFT_A | Every "Maak een afspraak" lands on a three field form answered within two working days, and the phone line isn't always staffed, for a Wmo home support team that's out at clients all day |
| Emily R. (Emily Levy), Alquimia Legal | DRAFT_A | Both "Cotizar" and "Agendar Asesoría" drop people at the same seven field form or WhatsApp, no price anywhere, so every quote is written by hand while she runs the international side from France |
| Martijn Dijk, StriData | NO_SIGNAL | StriData builds internal apps and AI ready data for manufacturers itself, and the site was rebuilt since our 26 Aug pitch |
| Debby Alles, Sportcafé de Kogge | NO_SIGNAL | A club canteen with no website and no visible process that eats hours |
| Jean-Christophe Conticello, GIANTS | NO_SIGNAL | Applications already run through an iclosed.io qualification and booking flow, site built in 2026 |
| Ken Sanghera, Suntail Drink Co. | NO_SIGNAL | Growth is real (Alberta launch 25 Aug, arena deal), but the locator already lists 15 Alberta stores and 217 Creative claims an ongoing web and retailer deck engagement |
| Mike Kokken, Stichting wysiwyg | NO_SIGNAL | A volunteer curators' foundation, ticketing through Filmhuis Den Haag, his day job is at the library |
| Shail Ma (Shail Niazi), Clean Valley CIC | CLOSED_NOT_ICP | Chief Culture Officer, the CEO is Nicholas LaValle |

## The things Raka would want to know first

- **Both drafts are the A angle, AI intake, and both rest on how a new client gets an answer.** Neither lead sells
  automation and neither site shows a chat, booking or quoting tool (grepped, with wa.me as the control that the grep
  finds what's there).
- **Naomi's company was resolved from the lemlist record, not a search.** lemlist has companyName SEM Care, domain
  sem-care.nl, jobTitle "Mede-eigenaar". The site's own about page says "Wij, Naomi en Suzanne ... SEM-Care is geboren",
  and North Data shows KvK 85983918, Edisonweg 7 Alkmaar, purpose outpatient guidance for home dwelling clients. Careful,
  a web search for her name returns a different Naomi Yard in Oosterhout (/in/naomiy), ours is /in/naomi-yard-425522138.
- **SEM-Care's job ad is from March 2025**, so I didn't use hiring as a clue. The goal clue is the June 2026 rewrite of
  the home, about, services and practical info pages (wp-json modified dates) plus "gecontracteerd ... in meerdere
  gemeenten". MEDIUM.
- **Emily also works as Juriste Jr. at BARAT** per lemlist, and the founder is Alejandro Alcántara. She's a partner and
  co-owner per the site ("Socia y COO ... desde 2019") and lemlist ("Co-Owner"), so she passes the owner rule, but she
  isn't the founder. "Proyección internacional" is presence as much as expansion, I wrote "taking the firm
  international", which is close to their verb, flagging it.
- **Ken was the close call.** Suntail is growing fast, Alberta launch per Daily Hive 25 Aug 2026, a three year Langley
  Events Centre deal and Feaster's best performing product per 604 Now. The one trade gap I found, buyers get the sell
  sheet only through the "Get in Touch or Request a Sell Sheet" form, is an afternoon for 217 Creative, who list Suntail
  as an ongoing client for web and a retailer pitch deck. Our 26 Aug claim that the locator opened empty is false today
  (296 locations, 15 in Alberta), so any nudge must not repeat it. If you want a nudge anyway, the trade site angle is the
  only honest one.
- **Jean-Christophe as a Build Squad partner** stays your call, as on 3 Oct.

---

## Naomi Yard, SEM-Care, ctc_9Ty6sALcgs2LTTuxs

Screen. Thread 1 item, our connect note 2026-07-22 05:22 UTC outbound, nothing else, nextPage null.
Record lea_XAYXjCzPBGxJYnCnA, jobTitle "Mede-eigenaar", tagline "Mede eigenaar bij SEM-Care", domain sem-care.nl, KvK 85983918.
Queue had one row, NO_STRONG_ANGLE "No business identifiable", superseded here by the lemlist record and the site's own about page.

Verdict DRAFT_A.

```gate
lead: Naomi Yard, co-owner of SEM-Care, Alkmaar (KvK 85983918 per https://www.sem-care.nl/ footer and North Data https://www.northdata.com/SEM-Care,+Alkmaar , Edisonweg 7, purpose "Outpatient guidance ... for home-dwelling clients with physical, cognitive or psychosocial limitations"), ctc_9Ty6sALcgs2LTTuxs, lea_XAYXjCzPBGxJYnCnA. lemlist jobTitle "Mede-eigenaar", experience1 "Mede-eigenaar @SEM Care", 15+ years wijkverpleging at Evean before it. https://www.sem-care.nl/over-sem-care/ "Wij, Naomi en Suzanne ... SEM-Care is geboren". Thread pulled 2026-10-06, 1 item, our 22 Jul connect note, sentOnly search on her name returns the same contactId with lastRepliedAt null, Martijn Dijk's two item thread is the control
site pass 1: 18 URLs by tools/crawl.py on https://sem-care.nl , 16 from the sitemap, all 200, every page read, home, begeleiding aan huis, financiering, praktische informatie, over, contact, vacatures, the vacancy, two news posts, terms, disclaimer, author and category archives
site pass 2: 18 URLs, second full crawl matching pass 1. tools/site-audit.js printed RENDER NOT TRUSTED (two CSS files ours), so tools/render-via-curl.js was run, 64 requests served, 0 curl errors, both parts looked at, a clean Elementor site with the footer note about the phone visible. Desktop render only, the phone view from site-audit.js is void with the run
deep analysis: A small HKZ certified Wmo provider of ambulant begeleiding for adults, contracted in several municipalities, also WLZ. The client journey on its own pages is one channel, every "Maak een afspraak" and "Neem contact op" goes to /contact/, three fields (Voor en achternaam, E-mailadres, Bericht) and "Binnen 2 werkdagen nemen wij contact met u op". The footer on every page says "De telefoondienst is niet altijd bemand. We doen ons best om elk telefoontje te beantwoorden van maandag t/m vrijdag tijdens kantooruren". Referrers get their own section on /financiering/ ("Voor verwijzers"), and the vacancy describes begeleiders out at clients with a work phone and iPad in "een compact team". Intake rules are written out on /praktische-informatie/ (toelatingscriteria, exclusions), so the first screening questions are known and repeatable. A phone hack notice was updated 23 Jun 2026. No privacy policy link was found (site-audit.js, control passed), a tweak
owner linkedin: route 1 curl https://www.linkedin.com/in/naomi-yard-425522138 999. Route 2 web search "Naomi Yard" SEM-Care, the only profile hit is /in/naomiy in Oosterhout, a different person, not used. Route 3 web search for SEM-Care founders, no post. Route 4 company page https://www.linkedin.com/company/sem-care via tools/social-audit.js, 41 followers, "Samen elkaar motiveren", 5 employees. Route 5 her own words, the lemlist summary "Naast mijn activiteiten als Wijkverpleegkundige ... geef ik zo nu en dan ook gastlessen". Route 6 the about page in the company's own words. The co-owner Suzanne has no surname on the site, not searchable
contact linkedin: same person as the owner, the lemlist jobTitle, the about page and the KvK record agree, same six routes
google news: tools/news.py nl, "SEM-Care Alkmaar" 0, "Naomi Yard" 0, control Heineken 100
regional news: tools/news.py (Alkmaar OR Noord-Holland) (ambulante begeleiding Wmo) 5 results, Noordhollands Dagblad 2024-03-31 on Simetri stopping home care in Zaanstreek-Waterland over payment problems, nothing on SEM-Care
industry news: tools/news.py ambulante begeleiding Wmo 18 results, Dirkzwager Wmo jurisprudence Jan 2026, VARnws on Utrecht choosing Viantis for Wmo support Oct 2025, plus https://www.alkmaar.nl/direct-regelen/zorg-en-ondersteuning/begeleiding/ (residents apply via mijnzorg.alkmaar.nl or 14 072, then choose a provider)
sources:
1. https://www.sem-care.nl/contact/
2. https://www.sem-care.nl/financiering/
3. https://www.sem-care.nl/begeleiding-aan-huis/
4. https://www.sem-care.nl/over-sem-care/
5. https://www.sem-care.nl/praktische-informatie/
6. https://www.sem-care.nl/vacature-ambulant-begeleider/
7. https://www.sem-care.nl/wp-json/wp/v2/pages (modified dates, home and services 2026-06-23)
8. https://www.northdata.com/SEM-Care,+Alkmaar (tools/fetch-walled.py)
9. https://www.linkedin.com/company/sem-care (tools/social-audit.js)
10. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fwww.sem-care.nl (tools/eu-view.py)
11. https://www.alkmaar.nl/direct-regelen/zorg-en-ondersteuning/begeleiding/
12. https://news.google.com/rss (tools/news.py, company, person, region, industry)
13. https://example.com (control 200)
pains: 5 judged. (1) Apps, intake runs through a three field form answered within two working days and a phone line that isn't always staffed, while the team is out at clients, so referrers and families with a Wmo indication in hand reach SEM-Care slowly. Costliest, each lost referral is a client paid for every month by the municipality. (2) Website, clean and current after the June 2026 rewrite, nothing structural. (3) GDPR, no privacy link found on a care provider's site (site-audit.js with control), 1 first party cookie and api.ipify.org before a click from Stockholm, a tweak. (4) Social, no account linked from the site, LinkedIn company page 41 followers. (5) Squad, a care provider, builds nothing
chosen: (1), costliest, it sits on how new clients arrive, and the screening rules on /praktische-informatie/ show the first questions are repeatable
sweep website: 18 pages crawled twice, rendered through render-via-curl.js with 0 curl errors, https://www.sem-care.nl/ is clean and current after the 23 Jun 2026 rewrite, not chosen
sweep gdpr: tools/eu-view.py from Stockholm on https://www.sem-care.nl , 1 first party cookie ipify_ip_dfwp and api.ipify.org before a click, no consent code, site-audit.js finds no privacy link with its control passing, a tweak, not chosen
sweep apps: https://www.sem-care.nl/contact/ three fields and "Binnen 2 werkdagen", footer "De telefoondienst is niet altijd bemand", https://www.sem-care.nl/vacature-ambulant-begeleider/ team out at clients, chosen
sweep social: tools/social-audit.js on https://www.linkedin.com/company/sem-care , 41 followers, 5 employees, the site links no social account per site-audit.js with its control, not chosen
sweep squad: a home support provider per https://www.sem-care.nl/begeleiding-aan-huis/ , it builds no software, nothing to supplement
thread: problem the afspraak button leads to a three field form with contact within two working days and the phone isn't always staffed | cost requests waiting for someone back at a desk add up across several municipalities | offer the AI intake that answers every referrer | link referrer
lead read: Naomi reads that her appointment button leads to a short form with a two working day reply and a phone that isn't always staffed, so a referrer with a Wmo client calls the next provider, that this adds up while her team is out on the road, and gets offered an AI intake that answers referrers, one thread
claims:
your "Maak een afspraak" button leads to a three field form, https://www.sem-care.nl/begeleiding-aan-huis/ , /financiering/ and /over-sem-care/ anchor "Maak een afspraak" href https://www.sem-care.nl/contact/ , the form has form_fields naam, email, message, rechecked 06:4x UTC
a reply within two working days, https://www.sem-care.nl/contact/ "Binnen 2 werkdagen nemen wij contact met u op"
the phone isn't always staffed, https://www.sem-care.nl/ footer on every page "De telefoondienst is niet altijd bemand", seen in the render-via-curl screenshot
a client with a Wmo indication and referrers, https://www.sem-care.nl/financiering/ "Wmo-indicatie" and "Voor verwijzers"
serving clients in several municipalities, https://www.sem-care.nl/financiering/ "gecontracteerd voor het leveren van individuele begeleiding in meerdere gemeenten"
a compact team out on the road, https://www.sem-care.nl/vacature-ambulant-begeleider/ "Je gaat op pad naar cliënten" and "een compact team"
recheck: 2026-10-06 06:50 UTC, contact, financiering and the footer refetched, every quoted line found, control example.com 200. Thesis confidence MEDIUM, the slow single channel is proven on her pages, that referrals go elsewhere is inference she can test against her own intake
```

### Naomi, OPENER

```
Hi Naomi, saw SEM-Care, looks interesting!

However, your "Maak een afspraak" button leads to a three field form with a reply within two working days, and the phone isn't always staffed. This causes a referrer placing a client with a Wmo indication to call the next provider on their list.

Especially, when you are serving clients in several municipalities with a compact team out on the road, the new requests waiting until someone's back at a desk add up every week.

I run Astra agency. We build AI workflows for brands like Unilever, AXA, Pertamina. I set up the routing and follow up for incoming enquiries at Betty Blocks, so I know a fast first answer often decides who gets the client.

Shall I send you over what the AI intake that answers every referrer looks like?
```

---

## Emily R., Alquimia Legal, ctc_rMYGbmu7Piu5Pmwei

Screen. Thread 1 item, our connect note 2026-07-27 21:04 UTC outbound, nothing else, nextPage null.
Record lea_X6Zr5my9ytX6xNZMQ, jobTitle "Co-Owner", experience "Company Owner @Alquimia Legal", also Juriste Jr. at BARAT CORPORATE, tagline "Legal Counsel".
Queue had six rows, all NO_STRONG_ANGLE on the website, the last on 2026-10-03. The A angle was never hunted, overridden here with the quote flow.

Verdict DRAFT_A.

```gate
lead: Emily Levy (lemlist "Emily R.", fullName "Emily Levy R."), partner and COO of Alquimia Legal, Guadalajara, ctc_rMYGbmu7Piu5Pmwei, lea_X6Zr5my9ytX6xNZMQ. https://www.alquimialegal.mx/ "Emily Levy Socia & Subdirectora. Socia y COO de Alquimia Legal desde 2019 ... lidera la proyección internacional de la firma desde Francia. Ofrece soluciones legales estratégicas en español, inglés y francés". lemlist jobTitle "Co-Owner", experience "Company Owner @Alquimia Legal", location Lyon. Founder and director is Alejandro Alcántara Gómez per the same page and https://www.enlazadot.com/columna/alquimia-legal-en-donde-si-protegen-tu-empresa/ (23 Feb 2021, "Alejandro Alcántara (Director)", "Dulce Emily Levi (Subdirector)"). No Mexican public register reachable for a law firm, the site and the 2021 column agree. Thread pulled 2026-10-06, 1 item, our 27 Jul connect note, sentOnly search "Emily R." returns the same contactId with lastRepliedAt null
site pass 1: 3 URLs by tools/crawl.py on https://www.alquimialegal.mx (a Wix one pager, the root twice and the privacy notice), plus https://www.alquimialegal.mx/en fetched and read in full, every page read
site pass 2: 3 URLs, second crawl matching pass 1, /en fetched again, the page rendered in Chromium and both "Cotizar" and "Agendar Asesoría" clicked, each scrolls to the same form section (scrollY 0 to 4476, no new tab), screenshot alq_cotizar.png looked at. Desktop only, the 3 Oct sweep has the phone render
deep analysis: A small IP, corporate, tax and labour firm, two people named, founder Alejandro in Guadalajara and Emily in France. Clients arrive through social media (a testimonial says "encontrarme con la asesoría de Alquimia por medio de las redes sociales", Instagram 1,274 posts, Facebook 4,370 followers) and buy registrations, every testimonial is a trademark ("registro de mi marca"). There's no price anywhere on the Spanish or English page (regex for currency, MXN, precio and price found nothing, control string matched). Every action ends in one place, the "Trabajemos juntos" form with seven required fields (Nombre, Teléfono, Email, Nombre de la compañía, Ciudad, País, Mensaje) or wa.me/523312561258. No chat, booking or quoting tool in the HTML (manychat, tidio, calendly, hubspot, zapier all 0, wa.me 2 as the control, /book-online 404). So each quote request is read and answered by a person, in up to three languages, across a Lyon to Guadalajara time gap
owner linkedin: route 1 Alejandro has no URL in lemlist, web search "Alejandro Alcántara" "Alquimia Legal" returns only same name strangers (a congressman, a banker) and the 2021 Enlazadot column, which is read. Route 2 the site's team section. Route 3 company page https://www.linkedin.com/company/alquimia-legal/ via social-audit.js, 26 followers, 1 employee, "El intelecto lo materializa todo". Routes 4 to 6 Instagram, Facebook and the column, the firm's own voice is on Instagram
contact linkedin: route 1 curl https://www.linkedin.com/in/emlevyr 999. Route 2 web search "Emily Levy" Alquimia Legal, only other Emily Levys. Route 3 the lemlist summary, "Since 2016 ... international intellectual property correspondent ... Since 2022, I have been based in Lyon". Route 4 the site bio. Route 5 the 2021 column. Route 6 the lemlist experience list, Juriste Jr. at BARAT CORPORATE as a second job
google news: tools/news.py es, "Alquimia Legal" 2 results, both unrelated (IMPSA Argentina 2026, Panama 2004), "Emily Levy Alquimia" 0, control Telefonica 102
regional news: tools/news.py (Guadalajara OR Jalisco) (registro de marca IMPI) 46 results, debate.com.mx 2026-08-02 "IMPI reporta crecimiento histórico en el registro de marcas y patentes; dominan solicitudes extranjeras", the Pato Merlín and "¿Y si sí?" filing rushes in Jun and Jul 2026, demand for registrations is up and foreign filers lead
industry news: tools/news.py registro de marca IMPI 100 results, IMPI enforcement in León 2026-10-06, headlines only past the regional item, the trade body is IMPI itself
sources:
1. https://www.alquimialegal.mx/
2. https://www.alquimialegal.mx/en
3. https://www.alquimialegal.mx/politica-de-privacidad
4. http://wa.me/523312561258 (href on both pages)
5. https://www.instagram.com/alquimialegalmx/ (tools/social-audit.js)
6. https://www.facebook.com/alquimialegal (tools/social-audit.js)
7. https://www.linkedin.com/company/alquimia-legal/ (tools/social-audit.js)
8. https://www.enlazadot.com/columna/alquimia-legal-en-donde-si-protegen-tu-empresa/
9. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fwww.alquimialegal.mx (tools/eu-view.py)
10. https://news.google.com/rss (tools/news.py, debate.com.mx IMPI record filings headline)
11. https://www.linkedin.com/in/emlevyr (999)
12. https://example.com (control 200)
pains: 5 judged. (1) Apps, every quote and consultation request goes through one seven field form or WhatsApp with no price shown, so each one is answered by hand by a two person firm whose co-owner is in France with a second job. Costliest, quotes are where a trademark client is won or lost and social media keeps feeding requests. (2) Website, a polished Wix page in Spanish and English, /fr 404 while she offers French, a tweak. (3) GDPR, 6 first party Wix cookies, no tracker, a Mexican firm, nothing. (4) Social, Instagram active daily (latest 2026-10-06), Facebook 4,370, LinkedIn 26, working. (5) Squad, a law firm, builds nothing
chosen: (1), costliest, it's the step every testimonial passed through, and it grows with every language and time zone she adds
sweep website: https://www.alquimialegal.mx and /en crawled twice and rendered, polished, /fr returns 404, not chosen
sweep gdpr: tools/eu-view.py from Stockholm on https://www.alquimialegal.mx , 6 first party Wix cookies, Wix and Sentry hosts only, a Mexican firm, nothing to say
sweep apps: https://www.alquimialegal.mx/ "Cotizar" and "Agendar Asesoría" both scroll to the seven field form, no price on the page, wa.me link, no quoting or chat tool in the HTML, chosen
sweep social: tools/social-audit.js on https://www.instagram.com/alquimialegalmx/ 524 followers, 1,274 posts, latest 2026-10-06, Facebook 4,370, LinkedIn 26, active, not chosen
sweep squad: a two partner law firm per https://www.alquimialegal.mx/ , it builds no software, nothing to supplement
thread: problem quote and consultation buttons both land on one seven field form or WhatsApp with no price, answered by hand | cost quotes without a reply pile up across three languages and two time zones as she takes the firm international | offer the AI quote desk answering in three languages | link quote, answer
lead read: Emily reads that both her quote and consultation buttons end at the same long form or WhatsApp with no price, so every brand owner waits for a person to answer, that this piles up across languages and time zones as she grows the international side, and gets offered an AI quote desk that answers in three languages, one thread
claims:
your Cotizar and Agendar Asesoría buttons both drop people at one seven field form or WhatsApp, https://www.alquimialegal.mx/ clicked in Chromium 2026-10-06, both scroll to "Trabajemos juntos" with Nombre, Teléfono, Email, Nombre de la compañía, Ciudad, País, Mensaje, all marked *, and "Contactar WhatsApp" wa.me/523312561258
no price shown, https://www.alquimialegal.mx/ and /en text, currency and price regex 0 hits, control string 3 hits
taking the firm international from France, https://www.alquimialegal.mx/ "lidera la proyección internacional de la firma desde Francia"
Spanish, English and French, https://www.alquimialegal.mx/ "Ofrece soluciones legales estratégicas en español, inglés y francés"
two time zones, lemlist location Lyon and the firm's address in Guadalajara per https://www.alquimialegal.mx/politica-de-privacidad
recheck: 2026-10-06 06:50 UTC, the page refetched and both buttons clicked again in the same run, every quoted line found, control example.com 200. Thesis confidence MEDIUM, the hand answered single channel is proven, that quotes go cold is inference she can test against her WhatsApp
```

### Emily, OPENER

```
Hi Emily, saw Alquimia Legal, looks interesting!

However, your Cotizar and Agendar Asesoría buttons both drop people at one seven field form or WhatsApp, with no price shown. This causes every brand owner who wants a quote to wait for someone at the firm to answer by hand.

Especially, when you are taking the firm international from France in Spanish, English and French, the quotes that haven't had a reply pile up across three languages and two time zones.

I run Astra agency. We build AI workflows for brands like Unilever, AXA, Pertamina. I built the scoring, routing and follow up for Betty Blocks' new leads, so I've seen how fast an unanswered one goes cold.

Shall I send you over what the AI quote desk answering in three languages looks like?
```

---

## Martijn Dijk, StriData, ctc_Z3J4EAKarueohCqxj

Screen. Thread 2 items, our connect note 2026-07-30 outbound, then **WE SENT A REAL MESSAGE ON 2026-08-26 14:52 UTC** (the six building blocks and light case studies pitch, "We sketched a homepage ... Want me to send it over?"). No reply, ever.
Record lea_sQdShK7qCFo4x9Z8x, jobTitle "Co-Owner", tagline "Owner at StriData ... DevOps Engineer @ Gemeente Nijmegen", an owner with a day job.
Queue, SENT on 30 Jul, then NO_STRONG_ANGLE on 3 Oct because both August points are fixed on the rebuilt site.

```sweep
lead: Martijn van Dijk, co-owner of StriData, Nijmegen, ctc_Z3J4EAKarueohCqxj, lea_sQdShK7qCFo4x9Z8x. Thread pulled 2026-10-06, 2 items, our 30 Jul connect note and our 26 Aug pitch, no reply
website: https://stridata.com crawled to the 80 page cap, the homepage now leads with two practices, a Quick Scan and "1,500+ machines connected, 40+ countries", https://stridata.com/cases/ carries numbers, so both August points are fixed, B has no gap left
gdpr: not run again this pass, https://stridata.com is a Dutch B2B site and the 3 Oct sweep in state/drafted_2026-10-03-due3-B01.md raised no consent issue, nothing to add
apps: https://stridata.com/ "build the internal applications for the work that still runs on Excel and email", they sell the A angle themselves, so it's not an A lead
social: tools/social-audit.js on https://www.linkedin.com/company/stridatabv , 93 followers, the only account read, not the pain
squad: a 1 to 10 person firm whose co-owner works a day job per the lemlist tagline, a capacity fact, but outside this brief's two angles and their news is empty (tools/news.py 0 on four queries, control Heineken 100)
verdict: NO_STRONG_ANGLE, NO_SIGNAL. They build the AI and app work themselves and the site was rebuilt since our message
```

## Debby Alles, Sportcafé de Kogge, ctc_kQqT7THXoonLA9z7M

Screen. Thread 1 item, our connect note 2026-08-02 22:14 UTC outbound, nothing else.
Record lea_XpQPg9ZSMAZazR5LP, jobTitle "Mede-eigenaar", companyDescription "De kantine van VZV Handbal en Voetbal", KvK 94401330 VOF per the 3 Oct sweep.
Queue, four rows, all NO_STRONG_ANGLE or blocked, last 2026-10-03.

```sweep
lead: Debby Alles, co-owner of Sportcafé de Kogge, the VZV club canteen in 't Veld, ctc_kQqT7THXoonLA9z7M, lea_XpQPg9ZSMAZazR5LP. Thread pulled 2026-10-06, 1 item, our 2 Aug connect note
website: none, earned on 3 Oct per state/drafted_2026-10-03-batch2-redo.md (search, three plausible domains with no DNS, control 200), lemlist has no domain, nothing new on tools/news.py this pass beyond the 2025 kermis programme on rodi.nl
gdpr: no site, so nothing for tools/eu-view.py to load, per the 3 Oct domain checks with control example.com 200
apps: no booking, ordering or intake process visible anywhere in her material, the lemlist companyDescription is "Geopend voor een drankje en hapje", a canteen whose guests are club members, no job to automate
social: tools/social-audit.js on https://www.facebook.com/398017003394863 , 321 followers, post dates behind the login, the members are already there
squad: a sports canteen per the lemlist record and https://www.rodi.nl/hollandskroon/183862/sportcafe-op-sportcentrum-vzv-opent-deuren , it builds no software, nothing to supplement
verdict: NO_STRONG_ANGLE, NO_SIGNAL. No growth and no visible job that eats hours
```

## Jean-Christophe Conticello, GIANTS, ctc_iWGMxjeTYkzegg78v

Screen. Thread 1 item, our connect note 2026-07-24 11:19 UTC outbound, nothing else.
Record lea_FCoRDWL38K3XbpWeT, jobTitle "Founder", GIANTS SRL BE 1034.718.202 per https://giants.eu/mentions-legales , Michaël Touffu is CEO per https://giants.eu/bootcamp .
Queue, five rows, last NO_STRONG_ANGLE 2026-10-03.

```sweep
lead: Jean-Christophe Conticello, founder of GIANTS, Brussels, ctc_iWGMxjeTYkzegg78v, lea_FCoRDWL38K3XbpWeT. Founder passes the owner rule. Thread pulled 2026-10-06, 1 item, our 24 Jul connect note
website: https://giants.eu crawled twice (70 and 70), a 2026 Next.js site, agenda still lists the 14 and 24 Sep events under "À venir" on https://giants.eu/agenda , a tweak, launched in Brussels Nov 2025 per tools/news.py (Forbes Belgique, Sudinfo), the site already serves where they're going, B empty
gdpr: tools/eu-view.py on https://giants.eu on 3 Oct found a PostHog cookie before consent against the banner's "Aucune donnée n'est collectée", a settings favour, not a pitch
apps: every "Candidater" href on https://giants.eu/ goes to https://app.iclosed.io/e/AcfGiants/giants-accelerator , a call booking and qualification tool, so applicant intake is already tooled, and the team includes a Data and AI product specialist per https://giants.eu/bootcamp
social: tools/social-audit.js on https://www.linkedin.com/company/giants-dojo 827 followers and https://www.instagram.com/giants_eu/ 250 followers, latest 2026-10-01, active
squad: GIANTS promises members "Les talents pour exécuter" per https://giants.eu/ , a partner idea for Raka, not a cold pitch
verdict: NO_STRONG_ANGLE, NO_SIGNAL. Intake already runs through iclosed.io and the site is new
```

## Ken Sanghera, Suntail Drink Company, ctc_LcYiWjzfjJFgssnBf

Screen. Thread 2 items, our connect note 2026-07-25 01:52 UTC outbound, then **WE SENT A REAL MESSAGE ON 2026-08-26 15:18 UTC** (no reviews, store locator opens empty, "We sketched a page ... Want me to send it over?"). No reply, ever.
Record lea_9W7pbftey4hHvgzAs, jobTitle "Co-founder and CEO", domain suntaildrinkco.com, also Managing Director at Solvex Group.
Queue, SENT, then nudge withheld 17 Sep on a wrong domain, then NO_STRONG_ANGLE 3 Oct because the locator is populated.

```sweep
lead: Ken Sanghera, co-founder and CEO of Suntail Drink Co., Vancouver, ctc_LcYiWjzfjJFgssnBf, lea_9W7pbftey4hHvgzAs. Thread pulled 2026-10-06, 2 items, our 25 Jul connect note and our 26 Aug pitch, no reply. Our "store locator opens with nothing in it" is false today and must never be repeated
website: https://www.suntaildrinkco.com crawled twice (4 and 4, Webflow), the Elfsight locator data lists 296 unique locations, 274 BC and 15 AB, the events page lists only summer dates (latest 9 Aug), the only trade route is the homepage form "Get in Touch or Request a Sell Sheet", no PDF on any page (.pdf grep 0, control irs.gov 29). Growth is proven, https://dailyhive.com/edmonton/suntail-drink-alberta-launch (25 Aug 2026) and the 604 Now Feaster piece quoting Ken on Alberta, but https://217creative.com/suntail-case-study.html lists Suntail as an ongoing client for web and a retailer pitch deck, so a trade page is an afternoon for an incumbent
gdpr: tools/eu-view.py from Stockholm on https://www.suntaildrinkco.com , 1 cookie _cfuvid and font and CDN hosts only, a Canadian brand, nothing
apps: no ordering, booking or quoting job visible on https://www.suntaildrinkco.com or its crawl, retail ordering in BC and Alberta runs through the provincial systems, nothing of theirs to automate
social: tools/social-audit.js on https://www.instagram.com/suntaildrinkco/ 12,246 followers, 175 posts, latest 2026-10-05, LinkedIn suntail-drink-company read, very active
squad: a drinks brand with an agency of record per https://217creative.com/suntail-case-study.html , builds no software
verdict: NO_STRONG_ANGLE, NO_SIGNAL. Real growth, but the site already follows it and an incumbent agency owns web. Close call, flagged to Raka
```

## Mike Kokken, Stichting wysiwyg, ctc_o3ForTXDfkfyfM8zg

Screen. Thread 1 item, our connect note 2026-07-29 13:21 UTC outbound, nothing else.
Record lea_6k6GzFFZydvX7Xjz5, jobTitle "Co Owner & Curator" of a stichting, experience1 "Programmamaker Centrale Bibliotheek @Bibliotheek Den Haag", tagline "programmamaker | art- and shortfilm programmer".
Queue, five rows, all NO_STRONG_ANGLE, last 2026-10-03.

```sweep
lead: Mike Kokken, co owner and curator of Stichting wysiwyg, The Hague, ctc_o3ForTXDfkfyfM8zg, lea_6k6GzFFZydvX7Xjz5. A foundation has no owners in law, his paid job per lemlist is at Bibliotheek Den Haag. Thread pulled 2026-10-06, 1 item, our 29 Jul connect note
website: https://www.wysiwygcinema.net crawled (1 page, a one page site), a curators' statement and past programmes with photo credits, no growth, funding or new market clue on the page or in tools/news.py (company 0, person 1 item from 2023, control Heineken 100)
gdpr: tools/eu-view.py on https://www.wysiwygcinema.net on 3 Oct, 0 cookies and 0 trackers before a click per state/drafted_2026-10-03-batch2-redo.md, nothing to say
apps: programmes are screened and ticketed by Filmhuis Den Haag, no booking, intake or quoting job of their own visible on https://www.wysiwygcinema.net
social: tools/social-audit.js on https://www.instagram.com/wysiwygcinema/ 3,027 followers, 193 posts, latest 2026-10-05, the channel that works for them
squad: a volunteer curators' foundation per https://www.wysiwygcinema.net , it builds no software, so there's nothing to supplement
verdict: NO_STRONG_ANGLE, NO_SIGNAL. Not a business with an hours eating job or a growth move
```

## Shail Ma (Shail Niazi), Clean Valley CIC, ctc_dMw3WnJAbBkWEXinv

Screen. Thread 1 item, our connect note 2026-08-11 02:50 UTC outbound, nothing else.
Record lea_wSnHSYuWkc4BXa6z4, jobTitle "Chief Culture Officer", the CEO is Nicholas LaValle per the 3 Oct sweep and the darrenfisher.ca interview.
Verdict CLOSED_NOT_ICP. Stopped at the owner rule, no angle research.

```sweep
lead: Shail Niazi, Chief Culture Officer at Clean Valley CIC, Halifax, ctc_dMw3WnJAbBkWEXinv, lea_wSnHSYuWkc4BXa6z4. Thread pulled 2026-10-06, 1 item, our 11 Aug connect note
website: not researched for an angle, the owner rule stops it, the lemlist jobTitle is Chief Culture Officer and the CEO is Nicholas LaValle per https://darrenfisher.ca/i-met-with-with-local-entrepreneur-clean-valley-cic-ceo-nicholas-lavalle-and-national-non-profit-futurpreneur/
gdpr: not researched, the owner rule stops it before any angle, per the lemlist record jobTitle "Chief Culture Officer"
apps: not researched, the owner rule stops it, tools/news.py shows "Clean Valley CIC Inks Six Contracts" Entrevestor 2026-03-02, a budget that is the CEO's
social: not researched, the owner rule stops it, the 3 Oct sweep opened https://www.instagram.com/cleanvalleycic/ with tools/social-audit.js
squad: he doesn't run the business, the CEO does per https://darrenfisher.ca/i-met-with-with-local-entrepreneur-clean-valley-cic-ceo-nicholas-lavalle-and-national-non-profit-futurpreneur/ , nothing is his to buy
verdict: NO_STRONG_ANGLE, CLOSED_NOT_ICP. Not the owner
```
