# nsa01, the AI default angle pass, 2026-10-06. 1 draft (a NUDGE), 7 closed. NOTHING SENT.

Brief /tmp/claude-0/agents/AI_DEFAULT_BRIEF.md, RULES.md 4A "THE DEFAULT ANGLE". Every lead was screened (thread,
queue, lemlist record) and then hunted on A (an AI workflow or app for a job that eats hours in their own material)
and B (a better website because of growth or expansion).

## What was run

- **Threads.** get_inbox_conversation on all eight contactIds today 06:14 to 06:20 UTC, one page each, nextPage null
  on all eight, totalItems 1, 2, 1, 1, 2, 2, 1, 1. Nobody has ever replied. Three threads hold a real message from us
  (Cristian 26 Aug, Steven 26 Aug, Simon 25 Sep). The two item threads are the positive control for the one item ones.
- **lemlist records.** search_campaign_leads by leadId for all eight (Hendrik's first call failed on the proxy and
  was retried). All eight carry an owner title, CEO, co founder or co owner.
- **Queue and drafts.** Every queue row and drafted_*.md section for the eight contactIds read, latest row per lead
  taken as the prior verdict.
- **Registers.** KBO 0778.759.649 (Aylyak, Steven director), recherche-entreprises VitaDX 811141977 today. The Glyx
  lookup failed on the proxy (ws_closed_mid_exchange) and the 3 Oct record is carried as a candidate.
- **Sites.** tools/crawl.py --max 80 on all eight. Bulgarian Wine Hub, every one of the 51 distinct page URLs fetched and
  grepped, the B2B page rendered twice (site-audit.js said RENDER NOT TRUSTED, render-via-curl.js screenshot opened).
  Eldy, Snorly, Prevent, dotega, Omnilabs and RentX key flow pages read directly today.
- **News.** tools/news.py on all eight plus Glyx, controls 98 to 102 results every run.
- **Social.** tools/social-audit.js on Bulgarian Wine Hub's Instagram, Eldy's LinkedIn and Omnilabs' Instagram.
- **Wayback** CDX timed out twice through the proxy for bulgarianwinehub.be and snorly.de. Walled, not read.

## The count

| Lead | Verdict | In one line |
|---|---|---|
| Steven Prins, Bulgarian Wine Hub | DRAFT_B, NUDGE | They offer import and distribution to restaurants, bars and wine shops, wholesale was added to the company in May 2026, and the B2B page is one paragraph and a form |
| Cristian Andriesei, Eldy | NO_SIGNAL | Both August points are fixed, and he builds his own sales pipeline app and jobs funnel, a 15 year product chief |
| Simon Wilmes, Snorly | NO_SIGNAL | The September GDPR point is fixed, and Snorly builds its own app, checks, booking and a dental practice programme |
| Hendrik Rolshausen, Prevent | NO_SIGNAL | Prevent is the app, booking, findings and the Saarbrücken waitlist are already built |
| Niklas Mocker, dotega | NO_SIGNAL | Already sells "dotega AI Assistenz" and AI invoice recognition, has its own developers |
| Fabrice Beauchêne, Glyx | NO_SIGNAL | Preclinical biotech, and his other company VitaDX, itself an AI diagnostics firm, is fighting a safeguard procedure |
| Orion D., Omnilabs | NO_SIGNAL | Pre revenue rehab glove, a one page site, the next steps are clinical |
| Mushtaq Taher, RentX | NO_SIGNAL | Two agencies build his site and app, and his other company Nixacom AI sells AI onboarding to banks |

## What Raka would want to know first

- **Steven's message is a NUDGE, not a cold opener.** We wrote to him on 26 Aug about three word descriptions and
  no reviews. The descriptions are fixed now, every wine has 72 to 231 words of notes, so the nudge says so instead of
  repeating it. The new point is the B2B side.
- **Steven has a day job.** lemlist lists him as Pre-Sales Manager at Simac ICT Belgium as his first experience, with
  Co-Owner of Bulgarian Wine Hub fourth. KBO makes him the director of AYLYAK BV, the company that runs the shop, and
  wine wholesale and retail codes were added to it on 12 May 2026. The message leaves the day job out.
- **The phrase "direct import and distribution for restaurants, bars and wine shops" is in the page's meta
  description**, which is what Google and link previews show. The visible page body doesn't say it. The draft says "You
  offer", which is their verb.
- **Eldy came close.** Their own about page says the team reviews every family's situation together each week across
  160+ families, which is the kind of job an AI tool takes over. But Cristian has run product at five startups and his
  site runs its own sales pipeline app with its own call tracking API. Pitching a product chief an internal tool he
  already builds himself is the wrong bet. Raka's call if he wants it anyway.
- **Snorly's "iPhone-App. Android folgt."** is an app build lead, a squad angle, not A or B, noted only.

---

## Steven Prins, Bulgarian Wine Hub, ctc_3S6EA258AheDuBKi5

Screen. Thread 2 items, our 26 Jul 08:02 connect note, our 26 Aug 14:52 opener ("each wine is described with about three
words, Silky Rich Elegant, and there are no reviews anywhere ... We sketched a product page with real tasting notes, food
pairings and a place for reviews ... Want me to send it over?"). WE SENT A REAL MESSAGE, he never replied, no promise of a
last message. Record, lea_2pJ8C4iNEskyKzLcb, jobTitle "Co-Owner", experience4 "Co-Owner @Bulgarian Wine Hub", KBO director of
AYLYAK BV, the operator named on the shop's legal notice. Prior verdicts, SENT 26 Aug, then NO_STRONG_ANGLE on 3 Oct because
the descriptions were fixed and only "no reviews" was left.

Verdict. **DRAFT_B**, confidence MEDIUM.

```gate
lead: Steven De Prins (lemlist "Steven Prins"), Co-Owner of Bulgarian Wine Hub, ctc_3S6EA258AheDuBKi5, lea_2pJ8C4iNEskyKzLcb. The shop is operated by AYLYAK BV per https://www.bulgarianwinehub.be/policies/legal-notice ("owned and operated by Aylyak Rosstal 3 3140 Keerbergen", VAT BE0778759649, effective 27/04/2026). KBO https://kbopub.economie.fgov.be/kbopub/toonondernemingps.html?ondernemingsnummer=0778759649 gives AYLYAK, active since 17 Dec 2021, Director De Prins Steven, and adds 46.341 wholesale of wine and spirits, 46.349 wholesale of beverages, 47.251 retail sale of wine and 73.110 advertising since 12 May 2026. An owner. Thread pulled 2026-10-06 06:20 UTC, 2 items, connect note 26 Jul and our opener 26 Aug, no reply. sentOnly search "Steven Prins" returns only this contact, teamConversations searches on "Steven De Prins" and "Bulgarian Wine Hub" return 0, state grep finds the 26 Aug digest row and the 30 Sep audit row only
site pass 1: 80 URLs by tools/crawl.py on https://www.bulgarianwinehub.be/ (capped, Shopify variant links queued), 51 distinct page URLs in EN, NL and FR, all fetched with curl and grepped, homepage, 6 collections, 59 products via products.json, about-us, our-partners, our-wine-regions, b2b, winetasting, contact, policies
site pass 2: 51 URLs, second full fetch of every page into bwhp/ and grepped for trade wording, the B2B page rendered with tools/site-audit.js (RENDER NOT TRUSTED, 4 of 4 failed assets fine by direct fetch, so void) and again with tools/render-via-curl.js, screenshot /tmp/claude-0/nsa01_bwh_b2b_curl-curlrender.png opened, heading, one paragraph and a five field form, desktop, phone screenshot void with the first run
deep analysis: A rebuilt Shopify shop, trilingual, 59 Bulgarian wines from six named wineries with long tasting notes, gift cards, boxes, a tasting service where "Every wine tasting is discussed personally", a contact page that aims "to respond to all inquiries on the same business day", and a B2B page. The B2B page's meta description says "We offer direct import and distribution for restaurants, bars and wine shops", the page title is "Bulgarian Wine B2B | Import & Distribution for Businesses", and the body is "Are you interested in a partnership or would you like more information about our wines? Get in touch with us" plus name, business email, company, Chamber of Commerce number and a message box. No trade price, minimum, delivery term, range sheet or ordering route exists anywhere on the 51 pages in any of the three languages. The company added wine wholesale to its activities in May 2026, so trade buyers are where it's heading, and the page they land on asks them to write in first
owner linkedin: route 1 curl https://www.linkedin.com/in/stevendeprins 999. Route 2 web search "Steven De Prins" "Bulgarian Wine Hub", the rocketreach result title ties him to Bulgarian Wine Hub in Keerbergen (tier G). Route 3 company page https://www.linkedin.com/company/bulgarian-wine-hub 999. Route 4 the lemlist experience list, Pre-Sales Manager at Simac ICT Belgium, Founder & Owner at Aylyak Consulting, Co-Owner at Bulgarian Wine Hub. Route 5 KBO, director of AYLYAK. Route 6 Instagram from the site's HTML, read with social-audit.js, a shop account with no personal posts. A "Wine Generator" Facebook page in Sofia carries the brand name in its URL and can't be tied to him, left out
contact linkedin: same person as the owner, the lemlist record, the KBO director and the legal notice address all agree on Steven De Prins in Keerbergen, same six routes
google news: tools/news.py nl, "Bulgarian Wine Hub" 0 results, "Steven De Prins" 2 results (2024 Grimbergen local politics and a 2021 brocante, not him or not provably him, unused), control Heineken 100
regional news: tools/news.py (Belgium OR Belgie) (Bulgaarse wijn) 6 results, Bulgarian cigarettes and the Songfestival, nothing on Bulgarian wine in Belgium
industry news: tools/news.py Bulgaarse wijn 0 relevant, plus the six partner wineries on https://www.bulgarianwinehub.be/pages/our-partners as the supply side
sources:
1. https://www.bulgarianwinehub.be/pages/b2b
2. https://www.bulgarianwinehub.be/policies/legal-notice
3. https://kbopub.economie.fgov.be/kbopub/toonondernemingps.html?ondernemingsnummer=0778759649
4. https://www.bulgarianwinehub.be/products.json?limit=250
5. https://www.bulgarianwinehub.be/pages/winetasting
6. https://www.bulgarianwinehub.be/pages/contact
7. https://www.bulgarianwinehub.be/pages/our-partners
8. https://www.bulgarianwinehub.be/pages/about-us
9. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fwww.bulgarianwinehub.be (tools/eu-view.py)
10. https://www.instagram.com/bulgarianwinehub (tools/social-audit.js)
11. https://rocketreach.co/steven-de-prins-email_67879976 (search result title only)
12. https://www.linkedin.com/in/stevendeprins (999, walled)
13. https://news.google.com (tools/news.py, three queries)
14. https://web.archive.org/cdx/search/cdx?url=bulgarianwinehub.be (timed out twice, walled)
pains: 5 judged. (1) B2B, they offer import and distribution to restaurants, bars and wine shops and added wholesale in May 2026, yet a trade buyer gets one paragraph and a form with no prices, terms or range, so every trade lead waits on the owner to write back, costliest because trade accounts reorder by the case and it's where the company is heading. (2) Tastings, "Every wine tasting is discussed personally", a manual proposal per request, real but volume unknown and smaller. (3) Reviews, none on product pages, an afternoon's app install, fails the pay test. (4) Social, Instagram 124 followers, 10 posts, latest 2026-09-27, alive and early, not the pain. (5) GDPR, the Shopify banner is set to BE only and they deliver in Belgium only, so the market they sell in gets the banner, clean
chosen: (1), costliest, the trade channel is the bigger revenue line and the newest direction on the register, and the page meant to open it makes every buyer ask first
sweep website: https://www.bulgarianwinehub.be/pages/b2b rendered via tools/render-via-curl.js, one paragraph and a form, 0 of 51 pages carry trade prices, horeca, wholesale, groothandel, tarif or minimum wording, control "tasting" found on 46 pages through the same grep, chosen
sweep gdpr: tools/eu-view.py --shopify from Stockholm, 10 first party cookies including _ga and _gcl_au, banner regionVisibility ["BE"], the legal notice says they deliver within Belgium only, so Belgian visitors get the banner, not chosen
sweep apps: the tasting flow on https://www.bulgarianwinehub.be/pages/winetasting is handled personally per request, an AI proposal workflow is possible, folded into the trade site offer only as a later step, not the lead pain
sweep social: tools/social-audit.js on https://www.instagram.com/bulgarianwinehub from the site's HTML, 124 followers, 10 posts, latest 2026-09-27, alive, not chosen
sweep squad: a two owner shop run beside a full time job per the lemlist record, it doesn't build software, nothing for a squad, not chosen
thread: problem the B2B page is one paragraph and a form with no trade prices or terms for restaurants, bars and wine shops | cost each trade buyer waits until he writes back as the company moves into wholesale | offer the B2B site that wins restaurant buyers | link B2B, restaurants
lead read: Steven reads that we noticed his tasting notes are fixed, then that restaurants and wine shops landing on his B2B page get one paragraph and a form and have to wait for him, and gets offered a B2B site that wins those buyers, one thread
claims:
your new tasting notes, https://www.bulgarianwinehub.be/products.json?limit=250 every wine 72 to 231 words, rechecked 06:45 UTC
you offer import and distribution to restaurants, bars and wine shops, https://www.bulgarianwinehub.be/pages/b2b meta description "We offer direct import and distribution for restaurants, bars and wine shops. Based in Belgium.", rechecked 06:42 UTC
your B2B page gives them one paragraph and a form, https://www.bulgarianwinehub.be/pages/b2b main content and the render-via-curl screenshot, rechecked 06:42 UTC
no trade prices or terms, the 51 page grep across https://www.bulgarianwinehub.be/ EN, NL and FR, 0 hits on 16 trade terms, control "tasting" 46 pages, rechecked 06:45 UTC
I built Eten Maar, a food brand, from zero and owned its partnerships and pricing, https://www.linkedin.com/in/raka-mulya-b92885196 as transcribed in docs/astra-master-context.md section 2A
recheck: 2026-10-06 06:45 UTC, the B2B page, products.json and the grep rerun, every claim held, the thread pulled at 06:20 with no new activity. Thesis confidence MEDIUM, the page and the register are proven, that trade buyers drop off before writing in is inference he can test against his own inbox
```

### Steven, NUDGE

```
Hi Steven, I wrote in August about the wine descriptions, and your new tasting notes fix that.

You offer import and distribution to restaurants, bars and wine shops, but your B2B page gives them one paragraph and a form, no trade prices or terms, so they wait until you've replied.

I built Eten Maar, a food brand, from zero and owned its partnerships and pricing.

Shall I send you over what the B2B site that wins restaurant buyers looks like?
```

---

## Cristian Andriesei, Eldy, ctc_t8TKRJXP6cemMLBBg

Screen. Thread 2 items, our 23 Jul 09:09 connect note, our 26 Aug 15:18 French message pitching visible reviews and
readable pricing ("vous affichez plus de 160 familles et 82 avis, mais aucun de ces avis n'est visible ... On a esquissé une
page ... Je te l'envoie?"). WE SENT A REAL MESSAGE, no reply. Record, lea_oDvkgWjL8APE3KFgy, jobTitle "Co-Founder & CEO",
tagline "CEO at Eldy", summary "15 years, 5 startups", ex Chief Product Officer at RingMD. Prior verdict, 3 Oct, both August
points fixed (a price from CHF 42 per hour, named reviews on /avis-clients/).

Verdict. **NO_SIGNAL**.

```sweep
lead: Cristian Andriesei, Co-Founder & CEO of Eldy, Morges, ctc_t8TKRJXP6cemMLBBg, lea_oDvkgWjL8APE3KFgy, owner per the lemlist record, thread pulled 2026-10-06 with our 26 Aug message unanswered
website: https://www.eldy.ch/ crawled with tools/crawl.py (80, capped), seven canton landing pages, nine service pages, a multi step funnel at https://www.eldy.ch/sales-pipeline/hello-eldy-v2/ that routes by canton, timing and care type to a named adviser, Salon des Seniors promotion, strong and current, B fails because the expansion pages already exist
gdpr: not rerun today, a Swiss company selling in Switzerland, Google Tag Manager in the homepage HTML, outside the EU view's point, not chosen
apps: A hunted, https://www.eldy.ch/a-propos.html says the team reviews every family's situation together each week across 160+ families, a real manual job, but the HTML shows a self built pipeline with its own endpoint fetch('/sales-pipeline/api/track-phone-call/') and a separate jobs funnel at https://eldy-jobs.ch , built in house by a career product chief, so he already builds this kind of tool himself
social: tools/social-audit.js on https://www.linkedin.com/company/106624001/ from the site's HTML, UNKNOWN behind the login, no other account linked, nothing usable
squad: one regional partner programme at https://www.eldy.ch/recruitment/regional-partner-application/ hiring field partners, not builders, no software capacity gap shown
verdict: NO_STRONG_ANGLE, NO_SIGNAL. A real manual job exists, but the owner builds his own systems, so the AI pitch fails the do they already have it test
```

---

## Simon Wilmes, Snorly GmbH, ctc_eb8ySnZEpFiroQaXH

Screen. Thread 2 items, our 26 Jul 07:39 connect note, our 25 Sep 09:59 GDPR opener ("your cookie banner is only switched on
for Austria ... Shall I send you over what the banner setup for Germany looks like?"). WE SENT A REAL MESSAGE, no reply.
Record, lea_ckBQX5DhW73xzvYxG, jobTitle "Co-Founder & CEO", tagline "Founder & CEO at Snorly.de", summary "I like to build
things that work". Prior verdict, 3 Oct, the site is rebuilt in Next.js with consent mode denied by default, the claim we
made no longer holds and must not be repeated.

Verdict. **NO_SIGNAL**.

```sweep
lead: Simon Wilmes, Co-Founder & CEO of Snorly GmbH, Hamburg, ctc_eb8ySnZEpFiroQaXH, lea_ckBQX5DhW73xzvYxG, owner per the lemlist record, thread pulled 2026-10-06 with our 25 Sep opener unanswered
website: https://snorly.de/ crawled with tools/crawl.py and the flows read today, a 4 step check at /eignungscheck, an insurance check at /kassen-check, phone consult booking at /beratung, order tracking at https://mein.snorly.de/track , a setup guide site, and Snorly Pro for dental practices at /fuer-praxen, current, B fails
gdpr: the 3 Oct tools/eu-view.py run from Stockholm on https://snorly.de found consent mode defaulting to denied and no Shopify banner token, carried, our 25 Sep claim is dead, not chosen and never repeated
apps: A hunted on https://snorly.de/eignungscheck , /kassen-check and /beratung, every job in the funnel is already a built flow, and https://snorly.de/fuer-praxen ships their own iPhone snoring app ("iPhone-App. Android folgt."), the dentist questionnaire review after an order is medical, a builder founder with an app of his own fails the already have it test
social: no social account linked in the snorly.de HTML grep, control the same grep found https://www.instagram.com/bulgarianwinehub on bulgarianwinehub.be in the same run, nothing to test with social-audit.js
squad: the Android app is announced and not shipped per https://snorly.de/fuer-praxen , a possible squad lead for Raka, outside A and B
verdict: NO_STRONG_ANGLE, NO_SIGNAL on A and B
```

---

## Hendrik Rolshausen, Prevent, ctc_JeAs47xZuy9Pxpgp2

Screen. Thread 1 item, our 25 Jul 08:10 connect note only. Record, lea_PzKgNNAKRjKeX82zZ, jobTitle "Co-Founder & CEO",
tagline "Co-Founder at Prevent". Prior verdict, 3 Oct, NO_STRONG_ANGLE, one bookable practice, 40 Android installs.

Verdict. **NO_SIGNAL**.

```sweep
lead: Hendrik Rolshausen, Co-Founder & CEO of Prevent, Saarbrücken, ctc_JeAs47xZuy9Pxpgp2, lea_PzKgNNAKRjKeX82zZ, owner per the lemlist record, thread pulled 2026-10-06, connect note only
website: https://www.prevent-app.com/standorte read today, Kaiserslautern bookable, Saarbrücken "Demnächst" with a waitlist and a suggest a location form, so the expansion page already exists, B fails, crawl 80 capped
gdpr: the 3 Oct sweep found a banner with Ablehnen and Akzeptieren and cookieless Pirsch analytics in the homepage HTML, carried, clean
apps: A hunted, they are the app, anamnesis, findings, history and PDF share per https://www.prevent-app.com/ , a partner dashboard on https://www.prevent-app.com/partner , and partner doctors read every package, medical work, nothing for us
social: no social account linked in the homepage HTML per the 3 Oct sweep, carried, the control was giants.eu's links through the same grep, nothing to test with social-audit.js
squad: https://www.prevent-app.com/stellenangebote "Aktuell sind keine offenen Stellen ausgeschrieben" read today, no capacity fact
verdict: NO_STRONG_ANGLE, NO_SIGNAL. The costliest pain is practice coverage and installs, not a build
```

---

## Niklas Mocker, dotega, ctc_Wg9Bv7Z7vMqpNQx78

Screen. Thread 1 item, our 25 Jul 10:24 connect note only. Record, lea_4nrkzads8hBRKrfy3, jobTitle "CEO & Co-Founder".
Prior verdict, 3 Oct, NO_STRONG_ANGLE, the AI support idea killed by their own pricing page.

Verdict. **NO_SIGNAL**.

```sweep
lead: Niklas Mocker, CEO & Co-Founder of dotega GmbH, Stuttgart, ctc_Wg9Bv7Z7vMqpNQx78, lea_4nrkzads8hBRKrfy3, owner per the lemlist record, thread pulled 2026-10-06, connect note only
website: https://www.dotega.de crawled with tools/crawl.py (80, capped), 10 city pages, pricing, FAQ, app login, funded pre seed of 1.3M per tools/news.py (startbase 2025-11-10) and already a full funnel, B fails
gdpr: the 27 Sep tools/eu-view.py run from Stockholm on https://dotega.de , 0 cookies and only Usercentrics and the GTM loader before a click, carried, clean
apps: A disproved today, https://www.dotega.de/preise lists "dotega AI Assistenz" in the Premium package and https://www.dotega.de/leistungen "Automatische Rechnungserkennung (KI)", they build their own AI
social: tools/social-audit.js on 3 Oct, Instagram dotega.de 168 followers latest 2026-09-17, carried, alive
squad: their own developers per https://www.dotega.de/ueber-uns "Entwicklerinnen und Entwickler", funded per tools/news.py, no developer vacancy and no capacity gap shown
verdict: NO_STRONG_ANGLE, NO_SIGNAL. An AI product company is not an A lead
```

---

## Fabrice Beauchêne, Glyx Therapeutics, ctc_nFBoAwdTou6kXWRLN

Screen. Thread 1 item, our 18 Jul 06:46 connect note only. Record, lea_kRy5XkE9ZZzcnaxka, jobTitle "CEO and co-founder",
experience2 "Directeur général @VitaDX". Prior verdict, 3 Oct, held on timing.

Verdict. **NO_SIGNAL**.

```sweep
lead: Fabrice Beauchêne, CEO and co founder of Glyx Therapeutics SAS (candidate 3 Oct register record, SIREN 999112642, created 24 Dec 2025, today's lookup failed on the proxy), ctc_nFBoAwdTou6kXWRLN, thread pulled 2026-10-06, connect note only
website: https://www.glyxtherapeutics.com/ crawled with tools/crawl.py, 39 URLs, research, team, investors and news, a preclinical drug developer whose audience is investors and partners, tools/news.py found no funding round, only a 2026-09-10 university mention, no growth event for B
gdpr: the 3 Oct tools/eu-view.py run from Stockholm on https://www.glyxtherapeutics.com set _ga and _ga_0DNWL1RCZG before a click, carried, a favour, not a sale
apps: A hunted, no customer bookings, orders, quotes or intake on the site, a lab company, and his other company VitaDX sells an AI assisted diagnostic per tools/news.py (TICpharma 2026-06-26), so AI is not new to him
social: tools/social-audit.js on 3 Oct, LinkedIn glyx-therapeutics 244 followers, carried, fine for the stage
squad: no software role, and VitaDX 811141977 is still active today per recherche-entreprises with him as Directeur Général, after the safeguard procedure opened 2026-05-06 per tools/news.py (Ouest-France 2026-06-08)
verdict: NO_STRONG_ANGLE, NO_SIGNAL. Revisit in November as the queue already says
```

---

## Orion D., Omnilabs Research, ctc_JiMGgwH639YbSSZfE

Screen. Thread 1 item, our 29 Jul 02:34 connect note only. Record, lea_kxtJHsgdRbhkg5pW6, jobTitle "Co-founder & CEO".
Prior verdict, 3 Oct, next steps are clinical evaluation, QMS and CE marking.

Verdict. **NO_SIGNAL**.

```sweep
lead: Orion D., Co-founder & CEO of Omnilabs Research, London, ctc_JiMGgwH639YbSSZfE, lea_kxtJHsgdRbhkg5pW6, owner per the lemlist record, thread pulled 2026-10-06, connect note only
website: https://omnilabs-research.com/ crawled with tools/crawl.py, 1 page, mission, technology, team and a Book a Call link, a pre revenue rehab glove, tools/news.py shows no funding or launch since the 2025 coverage, no growth event for B
gdpr: the 3 Oct sweep in state/drafted_2026-10-03-batch1-redo.md on https://omnilabs-research.com , a UK company with a one page site, nothing material, carried
apps: A hunted on https://omnilabs-research.com/ , no customer process on the site beyond Book a Call, the product is a medical device and the work ahead is clinical, nothing for us
social: tools/social-audit.js today on https://www.instagram.com/omnilabsresearch/ , 58 followers, latest 2026-05-29, dormant, the same account the 3 Oct sweep read
squad: a design engineer founder per the lemlist summary, no open software roles visible, nothing to build a squad message on
verdict: NO_STRONG_ANGLE, NO_SIGNAL
```

---

## Mushtaq Taher, RentX Rewards, ctc_a5ZNoyKHLFEhjudiu

Screen. Thread 1 item, our 30 Jul 08:14 connect note only. Record, lea_disrW5ypcBp7fchKK, jobTitle "Chief Executive Officer -
Founder", summary also describes "Nixacom AI ... building the compliance and credit infrastructure" for West African banks.
Prior verdict, 3 Oct, real copy bugs but two agencies build the site and app.

Verdict. **NO_SIGNAL**.

```sweep
lead: Mushtaq Taher, CEO and founder of RentX Rewards Limited, ctc_a5ZNoyKHLFEhjudiu, lea_disrW5ypcBp7fchKK, owner per the lemlist record, thread pulled 2026-10-06, connect note only
website: https://rentxrewards.com/ crawled with tools/crawl.py, a Bengali and English rent rewards app for Bangladesh, and the homepage HTML credits Digitomark today, the agency that builds it, B fails, no expansion event in tools/news.py
gdpr: https://rentxrewards.com/ serves a Bangladesh consumer market, outside the EU view's point, carried from the 3 Oct sweep, not chosen
apps: A disproved, the app was built by Dcastalia per the 3 Oct sweep, and his other company Nixacom AI sells AI onboarding and credit tools to banks per the lemlist summary and tools/news.py (We are Tech 2026-05-07), a lead who sells AI is not an A lead
social: tools/social-audit.js on 3 Oct on the Facebook page linked from https://rentxrewards.com/ , 15,541 followers, carried, alive and not the pain
squad: two outside agencies already build for him per the 3 Oct sweep and https://rentxrewards.com/ HTML, no capacity gap of his own shown
verdict: NO_STRONG_ANGLE, NO_SIGNAL. The placeholder helpline numbers are still a friendly favour for Raka to decide on
```
