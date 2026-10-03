<!-- NO DRAFTS -->
# Batch 2 of the closed owners, re-researched 2026-10-03. 0 openers, 8 closed. NOTHING SENT.

Raka's words, "Send, anyone else? Let's conzinue! Test all 5 angles, web research all sources (mandatory)".
Mandy and Timur from batch 1 were sent first, see `state/drafted_2026-10-03-batch1-redo.md`.

## What was run, per lead

- **Threads pulled in full**, all eight one page, nextPage null, each holds only our connect note (24 Jul to 11 Aug).
  So all eight are true Silent accepted. Positive control, Timur's thread pulled minutes earlier came back full.
- **lemlist records read** with search_campaign_leads by leadId for all eight, jobTitle, experience, domain.
- **Registers.** recherche-entreprises.api.gouv.fr for Glyx (SIREN 999112642) and VitaDX (811141977), BODACC for
  VitaDX's safeguard procedure, the GIANTS SRL mentions légales (BCE BE 1034.718.202), North Data for Sportcafé de
  Kogge (KvK 94401330), the 2020 rodi.nl opening article for the café's earlier operators.
- **Sites crawled twice** with tools/crawl.py, tools/site-audit.js and tools/eu-view.py on every one with a site,
  the single page apps and animated counters rendered in Chromium, every linked social account opened with
  tools/social-audit.js, tools/news.py on all eight in their own language with a full control each time.

## The count

| Lead | Verdict | In one line |
|---|---|---|
| Niklas Mocker, dotega | NO_STRONG_ANGLE | Funded (€1.3M pre seed, HTGF), 13 people with their own developers, and they already ship a "dotega AI Assistenz" and AI invoice recognition, the angle I built died on their own pricing page |
| Hendrik Rolshausen, Prevent | NO_STRONG_ANGLE | Live app and booking, but one practice location (Kaiserslautern) and 40 Android installs, the costliest pain is coverage and acquisition, not a build |
| Jean-Christophe Conticello, GIANTS | NO_STRONG_ANGLE | New fund and accelerator (SRL from Feb 2026) by the founder of Adneom and Wemanity, polished site, the only flaws are tweaks |
| Emily Levy, Alquimia Legal | NO_STRONG_ANGLE | Still a partner and COO, leads the firm's international side from France, polished Wix site in Spanish and English |
| Fabrice Beauchêne, Glyx | NO_STRONG_ANGLE | Glyx is nine months old and VitaDX, where he's DG, has been in a safeguard procedure since 6 May 2026, wrong moment |
| Shail Niazi, Clean Valley CIC | NO_STRONG_ANGLE, CLOSED_NOT_ICP | Chief Culture Officer, the CEO is Nicholas LaValle |
| Debby Alles, Sportcafé de Kogge | NO_STRONG_ANGLE | A sports club canteen with no website, its customers are the club's own members, fails the pay test even at €500 |
| Mike Kokken, Stichting wysiwyg | NO_STRONG_ANGLE | A curators' foundation programming monthly at Filmhuis Den Haag, active Instagram, his day job is elsewhere |

## The things Raka would want to know first

- **Three claims I caught before they could reach anyone.** dotega's support angle (an assistant that drafts answers
  for their certified Hausverwalter) was killed by their own pricing page, which already lists "dotega AI
  Assistenz". Alquimia's hero read "We protect what its true value gives your business" in the HTML, the screenshot
  shows "Protegemos aquello que da valor a tu empresa", the word order was Wix's animated spans, ours. And GIANTS'
  bootcamp page says "Les candidatures ferment dans 28 jours" nine days before the 12 Oct bootcamp, but 28 days from
  today is 31 Oct, which fits the 16 Nov one, so it isn't provably wrong.
- **Two GDPR favours if they ever reply.** GIANTS' banner says "Aucune donnée n'est collectée sans votre accord" while
  a PostHog cookie is already set before any click, seen from Stockholm and in our own Chromium. Glyx sets _ga and
  _ga_0DNWL1RCZG before any click from Stockholm.
- **Jean-Christophe could be a partner rather than a client.** GIANTS promises its member companies "les talents pour
  exécuter". Build Squad as an execution partner for his portfolio is a strategic conversation for you, not a cold
  pitch, he built two IT consultancies of 1,200 and 680 people.
- **Vladislav Maslov sent a 👍 today at 15:26.** His 1 Oct draft is still waiting on your word.

---

## Closed

```sweep
lead: Niklas Mocker, CEO and co founder of dotega GmbH, Stuttgart, with Lina Albert per https://www.dotega.de/ueber-uns , ctc_Wg9Bv7Z7vMqpNQx78, lea_4nrkzads8hBRKrfy3. Pre seed of €1.3M led by HTGF per https://www.starting-up.de/news/news-investments/dotega-sichert-sich-13-mio-eur-fuer-den-ausbau-seiner-proptech-plattform.html (search result, title and summary) and https://www.htgf.de/en/dotega-pre-seed-financing/ , a cooperation with Wohnen im Eigentum in March 2026 per tools/news.py. Thread pulled today, 1 item, our 25 Jul connect note
website: https://www.dotega.de crawled twice (106 URLs each), the homepage, karriere, preise and the team counters rendered in Chromium, "13 im Team", "500+ Gemeinschaften auf der Plattform", "4.000+ Eigentümer", 4.8 from 42 Google reviews, a fixed certified Hausverwalter per WEG with guaranteed answer times, strong and current
gdpr: tools/eu-view.py from Stockholm on https://dotega.de on 27 Sep, 0 cookies and only Usercentrics and the GTM loader before a click, carried from the 27 Sep sweep file, clean
apps: the costliest pain looked like support load, a guaranteed answer within 24 working hours per https://www.dotega.de/preise and the one open job a WEG expert for customer support per https://www.dotega.de/karriere , but the falsification pass found "dotega AI Assistenz" in the Premium package and "Automatische Rechnungserkennung (KI)" on https://www.dotega.de/leistungen , they build it themselves
social: tools/social-audit.js on the accounts in https://www.dotega.de 's HTML, Instagram dotega.de 168 followers, latest 2026-09-17, Facebook 62 followers, LinkedIn dotega-gmbh UNKNOWN, a B2C channel that's alive, not the pain
squad: their own developers per https://www.dotega.de/ueber-uns "Entwicklerinnen und Entwickler", no developer vacancy on https://www.dotega.de/karriere , funded, no capacity gap shown
verdict: NO_STRONG_ANGLE. A funded team already building the thing we'd offer
```

```sweep
lead: Hendrik Rolshausen, co founder and CEO of Prevent (HP2M Medical per the LinkedIn logo name), Saarbrücken, ctc_JeAs47xZuy9Pxpgp2, lea_PzKgNNAKRjKeX82zZ. Starter Stipendium per the Saarbrücker Zeitung 2026-04-18 via tools/news.py. Thread pulled today, 1 item, our 25 Jul connect note
website: https://www.prevent-app.com crawled twice (116 URLs each), standorte, stellenangebote, über uns and partner rendered in Chromium. Live, packages from 65,27 €, a booking calendar, apps on iOS and Android, a partner programme for trainers and nutritionists. https://www.prevent-app.com/standorte lists one bookable practice, MVZ Labor Dr. Klein Dr. Schmitt in Kaiserslautern, and Saarbrücken "DEMNÄCHST" with a waitlist
gdpr: a banner with Ablehnen and Akzeptieren rendered on every page, Pirsch analytics, which is cookieless, per the homepage HTML, clean
apps: they are the app, https://play.google.com/store/apps/details?id=com.hp2m.prevent shows 40 installs in its own data (10+ public), updated 2026-10-01, a partner dashboard already designed on https://www.prevent-app.com/partner , nothing for us to build that they don't
social: tools/social-audit.js has nothing to open, the homepage HTML of https://www.prevent-app.com links no social account, control giants.eu's links found through the same grep in the same run, a gap for a B2C brand, but Astra's Grow line doesn't sell traffic
squad: https://www.prevent-app.com/stellenangebote rendered, "Aktuell sind keine offenen Stellen ausgeschrieben", no developer seat open and no other capacity fact on the site, so no squad message
verdict: NO_STRONG_ANGLE. The costliest pain is practice coverage and installs, neither is ours
```

```sweep
lead: Jean-Christophe Conticello, founder and administrateur of GIANTS SRL (BCE BE 1034.718.202, constituted 23 Feb 2026, Watermael-Boitsfort) per https://giants.eu/mentions-legales , ctc_iWGMxjeTYkzegg78v, lea_FCoRDWL38K3XbpWeT. This replaces the 27 Sep sweep, which was about Wemanity, now sold to Reply. Founder of Adneom (sold to Alten 2012) and Wemanity (sold to Reply 2025), and of Avilo Capital. Thread pulled today, 1 item, our 24 Jul connect note
website: https://giants.eu crawled twice (70 URLs each), the homepage, bootcamp, méthode, portfolio, agenda and mentions légales read, bootcamp and agenda rendered. A modern Next.js site on Vercel with press logos (Les Echos, Forbes, L'Echo, BFM), a team of exited founders, a portfolio of 16 names, applications through an iclosed.io booking link. Two flaws, https://giants.eu/agenda lists the 14 Sep and 24 Sep events under "À venir", and the bootcamp video errors in our headless Chromium (no proprietary codecs, ours). Tweaks
gdpr: tools/eu-view.py from Stockholm on https://giants.eu , a PostHog cookie ph_phc_... set before any click while the banner says "Aucune donnée n'est collectée sans votre accord", confirmed in our own Chromium, a PostHog setting, a favour
apps: an accelerator with bootcamps, the Dojo and a fund per https://giants.eu/mentions-legales , no process on the site that shows manual strain, and a Product, Tech & Data specialist on the team per https://giants.eu/portfolio
social: tools/social-audit.js on the accounts in https://giants.eu 's HTML, Instagram giants_eu 250 followers, latest 2026-10-01, jcconticello 12,677, latest 2026-10-02, YouTube @Jcconticello 329 subscribers and 336 videos, LinkedIn giants-dojo 822, very active
squad: GIANTS promises members "Les talents pour exécuter" per https://giants.eu/ , a partner channel for a squad in theory, but he built IT consultancies of 1,200 and 680 people per https://giants.eu/ , he doesn't need to buy builders from us
verdict: NO_STRONG_ANGLE. A partnership conversation is Raka's call, not a cold pitch
```

```sweep
lead: Emily Levy, Partner and Deputy Director (COO) of Alquimia Legal, Guadalajara, ctc_rMYGbmu7Piu5Pmwei, lea_X6Zr5my9ytX6xNZMQ. https://www.alquimialegal.mx/en "Partner and COO of Alquimia Legal since 2019 ... she leads the firm's international presence from France". lemlist experience1 is Juriste Jr. at BARAT CORPORATE, so the firm is not her only job. The lemlist domain alquimialawyers.com has no DNS. Thread pulled today, 1 item, our 27 Jul connect note
website: https://www.alquimialegal.mx crawled twice (4 URLs each, a Wix one pager plus privacy), rendered and screenshotted, polished, IP, tax, corporate and labour practice, both partners named, testimonials. https://www.alquimialegal.mx/en fully translated (no Spanish words left), /fr returns 404 while she offers French, minor
gdpr: tools/eu-view.py from Stockholm on https://alquimialegal.mx , 6 first party Wix cookies and Wix CDN only, no tracker, nothing to say
apps: a small IP firm, booking runs through "Agendar Asesoría" and WhatsApp per https://www.alquimialegal.mx , no manual process visible worth a tool
social: tools/social-audit.js on https://www.instagram.com/alquimialegalmx 523 followers, 1,272 posts, latest 2026-10-02, LinkedIn alquimia-legal UNKNOWN, active
squad: a two partner law firm per https://www.alquimialegal.mx , it doesn't build software or sell builds, so there's no squad to supplement
verdict: NO_STRONG_ANGLE
```

```sweep
lead: Fabrice Beauchêne, Président of GLYX THERAPEUTICS SAS (SIREN 999112642, created 24 Dec 2025, Amiens) and Directeur Général of VITADX INTERNATIONAL (811141977, 10 to 19 staff) per https://recherche-entreprises.api.gouv.fr , ctc_nFBoAwdTou6kXWRLN, lea_kRy5XkE9ZZzcnaxka. BODACC 2026-05-20, "Jugement d'ouverture d'une procédure de sauvegarde" dated 2026-05-06 for VitaDX, and Le Télégramme 2026-06-26 quotes "Si rien ne se passe d'ici fin juin, on est mort". Thread pulled today, 1 item, our 18 Jul connect note
website: https://www.glyxtherapeutics.com crawled twice (39 URLs each), WordPress with Elementor, research, tauopathies, team, investors, news, the 28 Sep findings (23 MB homepage, newest news Dec 2025) stand
gdpr: tools/eu-view.py from Stockholm on https://www.glyxtherapeutics.com , _ga and _ga_0DNWL1RCZG set before any click with Google Analytics and Mailchimp loaded, real for French visitors, a favour
apps: a preclinical drug developer working on tau molecules per https://www.glyxtherapeutics.com , no internal process on the site that a tool of ours would fix
social: tools/social-audit.js on https://fr.linkedin.com/company/glyx-therapeutics , 244 followers, the only account in its HTML, the channel investors and partners use, fine for its stage
squad: a biotech with no software roles and no product team per https://www.glyxtherapeutics.com and the lemlist record, nothing to build a squad message on
verdict: NO_STRONG_ANGLE. Held on timing, he's running a company through a safeguard procedure
```

```sweep
lead: Shail Niazi, Chief Culture Officer at Clean Valley CIC, Halifax, ctc_dMw3WnJAbBkWEXinv, lea_wSnHSYuWkc4BXa6z4. The CEO is Nicholas LaValle per https://darrenfisher.ca/i-met-with-with-local-entrepreneur-clean-valley-cic-ceo-nicholas-lavalle-and-national-non-profit-futurpreneur/ and the 23 Sep queue row citing CIPO. Thread pulled today, 1 item, our 11 Aug connect note
website: https://www.cleanvalleycic.com crawled twice (11 URLs each), HTTPS works today, about, team, biofilter, hatchery, platform, community, FAQ, a HaaS model, site-audit.js said RENDER NOT TRUSTED so no visual claim
gdpr: tools/eu-view.py from Stockholm on https://www.cleanvalleycic.com , 0 cookies, a Canadian company, nothing to say
apps: a clean tech hardware firm with "Six Contracts" per Entrevestor 2026-03-02 via tools/news.py, not his budget
social: tools/social-audit.js on https://www.instagram.com/cleanvalleycic/ 189 followers, 147 posts, latest 2026-08-12, and LinkedIn clean-valley-cic UNKNOWN, alive, and not his budget
squad: he isn't the person who runs the business, the CEO is Nicholas LaValle per https://darrenfisher.ca/i-met-with-with-local-entrepreneur-clean-valley-cic-ceo-nicholas-lavalle-and-national-non-profit-futurpreneur/ , so nothing is his to buy
verdict: NO_STRONG_ANGLE, CLOSED_NOT_ICP. He doesn't run it
```

```sweep
lead: Debby Alles, Mede-eigenaar of Sportcafé de Kogge, the VZV canteen at Rijdersstraat 112, 't Veld, ctc_kQqT7THXoonLA9z7M, lea_XpQPg9ZSMAZazR5LP. North Data via tools/fetch-walled.py, Sportcafé de Kogge, KvK 94401330, purpose "Operating a catering establishment at a sports complex", partners premium only. In 2020 the café was run by pachters Willem and Henk Doedens and Sasja Versluis per https://www.rodi.nl/hollandskroon/183862/sportcafe-op-sportcentrum-vzv-opent-deuren , so the current VOF looks newer. Thread pulled today, 1 item, our 2 Aug connect note
website: no website earned the right way, a web search for the café returns the rodi.nl and directory pages and the unrelated https://www.tcdekogge.nl , no domain on the lemlist record, sportcafedekogge.nl, .com and sportcafe-dekogge.nl have no DNS and dekogge.nl serves a bare nginx default page, control example.com 200 in the same run
gdpr: nothing to test with tools/eu-view.py, https://sportcafedekogge.nl has no DNS and the café has no other site per the domain checks above and the web search, control https://example.com 200, so no consent or tracker question exists
apps: a club canteen per the lemlist companyDescription "De kantine van VZV Handbal en Voetbal", no process worth a tool
social: tools/social-audit.js on https://www.facebook.com/398017003394863 (the page id from https://www.localgymsandfitness.com/NL/'T-Veld/398017003394863/SportCaf%C3%A9-de-Kogge ), 321 followers, post dates behind the login so UNKNOWN recency, the members are there. The 2022 Koggepop event on https://www.rodi.nl/hollandskroon/partnerbijdrage/315296/mokum-in-t-veld-en-de-edwin-eversband is a separate festival with its own site, not hers
squad: a sports club canteen per https://www.rodi.nl/hollandskroon/183862/sportcafe-op-sportcentrum-vzv-opent-deuren , it doesn't build anything, so there's no squad to supplement
verdict: NO_STRONG_ANGLE. The €500 floor reopened the price question, but a canteen whose customers are the club's own members doesn't lose anything to a missing site
```

```sweep
lead: Mike Kokken, Co Owner and Curator of Stichting wysiwyg, The Hague, ctc_o3ForTXDfkfyfM8zg, lea_6k6GzFFZydvX7Xjz5. A stichting, so no owners in law, and lemlist experience1 is Programmamaker at Bibliotheek Den Haag. wysiwyg programmes monthly at Filmhuis Den Haag per https://filmhuisdenhaag.nl/wysiwyg (search result). Thread pulled today, 1 item, our 29 Jul connect note
website: https://www.wysiwygcinema.net crawled twice (1 URL each, a one page site), read in full, a curators' statement and past programmes with photo credits, it does its job for an arts platform
gdpr: tools/eu-view.py from Stockholm on https://www.wysiwygcinema.net , 0 cookies and 0 third party trackers before a click, nothing for a consent banner to cover, clean
apps: a volunteer programme hosted by https://filmhuisdenhaag.nl/wysiwyg , ticketing runs through the Filmhuis
social: tools/social-audit.js on https://www.instagram.com/wysiwygcinema/ 3,026 followers, 192 posts, latest 2026-10-03, very active, the channel that works for them
squad: a curators' foundation per https://www.wysiwygcinema.net , it doesn't build software or sell builds, so there's no squad to supplement
verdict: NO_STRONG_ANGLE
```
