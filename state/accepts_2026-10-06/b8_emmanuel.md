# Evidence file, b8_emmanuel. Emmanuel Montecer, Marques de France (and Echo Conseils)
Researched 2026-10-06, 19:05 to 19:45 UTC. contactId ctc_z9nJPbeK9Q7sHv5aK, leadId lea_jKywEWtiMxsjCybnw, campaign cam_Csq9BikBWz7dNqSs4 ("founders: new businesses with marketing hires", running).

## STOP FLAGS
- THREAD: CLEAN. Only the generic connect note has gone out. He has not replied. Nothing else was sent.
- OWNER: YES, statutory. Marques de France SAS, SIREN 888 485 273: **MONTECER Emmanuel Alexandre Alain, "Président de SAS"**, with LAPIERRE Élodie Margaud as "Directeur Général". The site says the company is "100 % détenu par les fondateurs, sans investisseur ni marque au capital" (100% owned by the founders, no investor or brand on the cap table).
- **HE CO-FOUNDED A DIGITAL GROWTH AGENCY AND IS ITS "EXPERT TECHNIQUE".** Echo Conseils (echo-conseils.fr) sells acquisition, conversion (CRO, UX, landing pages) and retention ("CRM, automatisation marketing"). Its tag cloud lists "Automation", "Workflows", "Chatbots", "AI", "GDPR compliance". Marques de France's footer says "Site conçu par Echo Conseils". He also personally ships Marques de France's software: the iOS and Android app (launched 2026-02-23), a Shopify app (2026-05-16), a WooCommerce extension, and a PrestaShop module (2026-06-19). **That makes him a peer, maybe a competitor, on websites, apps and automation.** It is the biggest disproof against angles 1, 3 and 4, and the judge has to weigh it first.
- Not closed. Both companies are active (etat_administratif A). The domain is confirmed: every page names Marques de France, and the mentions légales name Montecer.
- Register discrepancy on Echo Conseils, unresolved: see Ownership.

## Thread (step 1)
- `get_inbox_conversation(ctc_z9nJPbeK9Q7sHv5aK)` at ~19:06 UTC returned 0 activities (totalItems 0, nextPage null). linkedinSync "recent", 18:58:51Z.
- `get_inbox_conversations` with search "Emmanuel Montecer" and listId sentOnly found 1 conversation, ibx_cYg9H7t3dZggNh4cb. lastSentAt 2026-10-06T05:43:23Z, preview "Hi Emmanuel, saw your business and thought it was cool 😀 I'm a business owner too! Would love to co" (the connect note). lastActivityAt 14:10:42Z (the acceptance). lastRepliedAt null, isYourTurn false. The LinkedIn URL is linkedin.com/in/emontecer.
- The same search with listId myConversations returned 0.
- Positive control: ctc_YLmRL36CPuodKLwNX (Timur, LeBretons) came back with 4 items in the same minute, including linkedinSent on 2026-10-03 and 2026-08-11 and a linkedinReplied on 2026-08-10. The method works, so the empty thread means no messages are recorded beyond the connect note.

## Record (step 2)
`search_campaign_leads id=lea_jKywEWtiMxsjCybnw` returned:
- jobTitle "Co-Founder", companyName Marques de France, companyDomain marques-de-france.fr, founded 2019, size 1-10, Lyon, industry "Technology, Information and Media". Lead industry field: "Operations".
- tagline "Co-founder at Marques de France and Echo Conseils".
- jobDescription: "We promote the french industry and help consumers to find and buy « made in France » easily... Key figures (FY 2024) ● 200k monthly unique users ● 1k+ registered brands, stores and products ● 3 business models : subscriptions, sponsored posts, affiliate programs ● 150k€+ ARR".
- Reconciliation: the tagline, companyName and domain agree. There is no "former" or "ex" wording. His two roles are both founder roles, and both sites name him.
- Age check on the figures: 200k a month is roughly 2.4M a year, which matches the site's "2,5M visiteurs uniques par an" (2025). The ARR figure is self-reported and dated FY2024. It is not in the register (finances null), so it must never be quoted.

## Ownership, statutory (step 3)
- https://recherche-entreprises.api.gouv.fr/search?q=marques+de+france (370 results; the first is the match): MARQUES DE FRANCE, SIREN 888485273, SAS (5710), NAF 62.01Z (computer programming), created 2020-08-12, active, seat 17 rue des Vignes 01800 Meximieux, tranche_effectif "01" (1 to 2 employees, 2024), employer "O", PME. Dirigeants are Montecer (born 1987-09, Président de SAS) and Lapierre (born 1989-05, Directeur Général). The RNE was updated 2026-09-29. The current siège début d'activité is 2026-01-19 (a new établissement; 2 établissements in total, 1 open).
- Same search with q=montecer also shows EMMANUEL MONTECER, sole trader, SIREN 913985735, NAF 70.22Z (consulting), created 2022-05-10, **closed**, at the same Meximieux address. That is his old freelance consulting vehicle.
- q=echo+conseils, first result: ECHO CONSEILS, SIREN 992488155, société commerciale 5499 (SARL type), NAF 62.02A (IT consulting), created 2025-10-08, active, 62 rue Bugeaud 69006 Lyon, début d'activité 2026-04-16. **Gérants are DELANNOY Louis-François (born 1979-05) and RENAUD Guillaume (born 1982-09). Montecer is not listed.**
- echo-conseils.fr/mentions-legales/ (opened 19:20 UTC) names the operator as "Echo Conseils SAS ... RCS de Bourg en Bresse : 888 485 273", which is **Marques de France's SIREN**. It lists the "Responsables" as Elodie LAPIERRE, Emmanuel MONTECER and Guillaume RENAUD. Reading: Echo Conseils started on 2025-02-12 as an activity inside Marques de France SAS (the blog post "Marques de France lance son agence conseil en stratégie digitale", by Montecer, says "nous officialisons enfin notre nouvelle entité"). A separate company with Renaud and Delannoy as gérants was then registered in October 2025. Montecer's shareholding in it is not public. The Echo Conseils site still calls him "Co-fondateur · Expert technique", and Delannoy is listed only as "Expert Performance organique". **So he co-founded Echo Conseils by his own site, but he is not its legal head.**

## Prior research (step 4)
- Grepped /home/user/astra-agency/state/ (all jsonl, md and subfolders) for "montecer", the contactId, the leadId, "marques-de-france" and "marques de france": **no hits.** No prior verdict exists.
- /tmp/claude-0/agents/b4_emmanuel/ is a **different person** (Emmanuel Rivière, La Warroom, ctc_bF7KcGsTjT23mo3ye). Nothing in it applies here.

## Website (step 5)
- Stack: WordPress with a custom theme (`wp-content/themes/marquesdefrance`), WooCommerce for subscriptions, WPForms, LiteSpeed cache, Algolia search, CookieYes, Crisp chat, PixelYourSite, GA and GTM. Hosted at o2switch, Clermont-Ferrand. Built by Echo Conseils, which means by him.
- **Pass 1**: crawl.py read 150 pages, all 200, all fr-FR. The sitemaps list **4,362 URLs**, and it stopped at the cap with 50,427 links queued. The site is a large directory: 1,184 brands, 899 categories, 20,000+ products. 150 pages is a sample: the homepage, the company news posts (2020 to 2026) and category and listing pages.
- **Pass 2**: crawl.py read 150 pages again, all 200, from the same 4,362 sitemap URLs (50,423 links queued). Pass 2 count equals pass 1 (150 = 150), with the same URL set (150 in common). The cap is the binding limit, not the site: both passes are the same sample.
- Key pages, read by hand with curl plus text extraction, 19:10 to 19:30 UTC:
  - Home: "Le guide d'achat du Made in France", "1184 marques référencées dans 899 catégories", "Et 100% gratuit pour vous les visiteurs", plus a CTA "Vous avez une marque ? Référencez-la dès maintenant" leading to /suggerer-une-marque/. The header has "Offres Pro" and a banner reading "Blanc de Gérardmer est notre marque du mois !" (sponsored slot). The footer has App Store and Google Play badges.
  - /qui-sommes-nous/: "Le guide est géré par une petite équipe composée de ses deux cofondateurs, qui assurent eux-mêmes les recherches, les vérifications et la rédaction" (the guide is run by a small team of its two co-founders, who do the research, the checks and the writing themselves). On Élodie: "elle vérifie chaque marque avant publication et rédige les contenus (à la main) du magazine". On Emmanuel: "technique et marketing ... Il conçoit le site et l'application". On sourcing: "Nous passons beaucoup (énormément) de temps à chercher des marques originales" (we spend a lot, an enormous amount, of time looking for original brands). On verification: "nous avons désormais une base de données de plus de 8000 ateliers/usines". Audience: "plus de 2,5 millions de personnes ... chaque année (dont environ 20 % de professionnels)". Self-funded: "on a démarré avec 2000€ de notre poche seulement".
  - /monetisation/: "Nous sommes deux personnes à éditer et maintenir le site". Revenue comes from Tipeee, listing fees and sponsored content.
  - /offre/ splits visitors into Marque, Boutique and Acheteur professionnel. The brand offers (/offer-customer-type/listing/) are brand listing, Marque du mois, a dedicated "petite lettre" email, sponsored category pages, a magazine article, product feed listing and video production. Every offer page carries a "Demander à être rappelé" form (brand name, email, phone, reserve or ask, start date, question) and a "Programmer une visio" option. It reads: "Nous, Élodie et Emmanuel (co-fondateurs du guide), sommes à votre disposition".
  - /offre/referencement-de-marque/ is a **self-serve flow**. "Choisissez une offre", then "Créez votre fiche ... formulaire en ligne", then "Payez ... la première année", then "Attendez ... nous procéderons à des vérifications", then "On vous prévient par email lorsque la fiche de votre marque est en ligne". Checkout runs through WooCommerce at /produit/referencement-de-marque/ (Basique, Économique, Affaire or Privilège; annual or monthly). The page claims "Vous augmentez vos chances d'être cité par les IA".
  - /suggerer-une-marque/: "4,6% de taux de conversion", "ROI de 8", "12k+ réponses d'IA citant Marques de France par mois".
  - /faq/ has a self-serve Espace Client for brand admin changes ("Connectez-vous à votre Espace Client, allez dans le menu « Marques », puis « Gérer »"). Support is by form or support@marques-de-france.fr: "Nous sommes une petite équipe et nous nous efforçons de répondre à toutes les demandes sous 24h à 48h ouvrées".
  - /llms.txt exists (an AI crawler file).
  - Company news posts from the crawl: "Nos projets pour 2026 et notre rétrospective de l'année 2025" (Élodie, 2026-01-06) reports audience "+75% (2025 vs 2024)", 2.5M unique visitors a year, 92 new brands in 2025 (1,136 in total, 681 manufacturers), "un répertoire de 1 472 ateliers et usines", and 90 new categories. Features shipped in 2025: custom quote requests and tenders, product and shop listing options, product ordering, stronger review checks, online booking of sponsored content, favourites, deals. Plan for 2026: the mobile app. Other posts: the Shopify app (Montecer, 2026-05-16, "Plus de double saisie ... tout est automatisé"), the WooCommerce extension, and the PrestaShop module (Montecer, 2026-06-19, "tracking hybride", "Générateur de flux autonome"). Echo Conseils was launched as a Marques de France post (Montecer, 2025-02-12). There are also Trophées 2025 and 2026, Jours Tricolores (about 200 participants), and the Service France Garanti certification.
- Screenshots (site-audit.js, US egress), opened. **Desktop**: a clean, modern white layout. Logo top left, a nav of Marques, Produits, Boutiques, Idées cadeaux, Magazine, a search bar, a red "Offres Pro" button, heart and account icons, then a second category nav bar and a navy "marque du mois" banner. The hero is the H1, a large search field and three green tick lines, beside a flat line illustration of a woman on a sofa holding a magnifier. A US CCPA-style privacy box ("Ne pas vendre ou partager mes informations personnelles") covers the bottom left, which is the US view only. **Phone**: a hamburger menu, logo and search icon, the category bar scrolls sideways (intended), the banner, then the H1, search box and ticks. It renders well with nothing broken. The audit reported 0 page errors and 2 failed requests, and it did not print RENDER NOT TRUSTED.
- Era: current. A custom theme, a dark and light theme switch in the footer, and content dated September and October 2026 (the marque du mois). **None of the four always-pitch signals holds on era, WordPress-as-weakness or certificate.** It is WordPress, but a custom theme and plugins built by the owner himself, who sells this. The certificate is Let's Encrypt for CN=marques-de-france.fr, valid until 2026-11-25 (curl -v).
- Links clicked and hrefs recorded: "Offres Pro" to /offre/, "Voir les offres" to /offer-customer-type/listing/, "Référencer ma marque" to /suggerer-une-marque/, "Sélectionner" to /produit/referencement-de-marque/ (WooCommerce form), footer pages (qui-sommes-nous, monetisation, kit-media, faq, criteria, contact, app) and the "Echo Conseils" link to echo-conseils.fr all returned 200. Tipeee and both app store links come from the HTML. My own guessed paths /a-propos/, /ajouter-une-marque/ and /inscription/ returned 404. They are not linked, so they prove nothing.

## GDPR from the EU (step 6)
- `python3 tools/eu-view.py` (Webbkoll, Stockholm, nothing clicked), results at webbkoll.5july.net/en/results?url=http%3A%2F%2Fwww.marques-de-france.fr%2F. It found **19 first-party cookies before any click**, including PixelYourSite traffic-source cookies (`pys_session_limit`, `pys_start_session`, `pys_first_visit`, `pysTrafficSource`, `pys_landing_page`, `last_pysTrafficSource`, `last_pys_landing_page`), Sourcebuster attribution (`sbjs_*` ×7, WooCommerce order attribution), `_ALGOLIA`, `_wpfuuid`, `pbid`, `_lscache_vary` and `cookieyes-consent`. That is 0 third-party cookies, but 19 requests to 6 third-party hosts before consent: **fonts.googleapis.com, fonts.gstatic.com, maps.googleapis.com**, plus cdn-cookieyes.com, directory.cookieyes.com and log.cookieyes.com.
- A CookieYes banner exists (script cookieyes.com/client_data/9b1d96bb23860b2c00ab589b/script.js). Its EU wording was not seen, since Webbkoll gives no screenshot. The US view showed only the CCPA notice. No facebook.com host was contacted before consent, so the Meta pixel itself appears to be gated.
- Positive control: the same eu-view run did detect cookies and third-party hosts (19 and 6), so the method finds them when they are there. site-audit's own control passed on a synthetic page.
- Candidate: Google Fonts and Maps are loaded from Google before consent, which sends the visitor's IP to Google. The PixelYourSite and Sourcebuster marketing-attribution cookies are also set before consent. Disproof attempt: this is a setting or plugin config for a man whose own agency lists "GDPR compliance". It fails the tweak test badly.

## Social (step 7). URLs taken from their own homepage HTML
`node tools/social-audit.js --urls ...`, run 19:25 UTC:
- Instagram @marquesdefrance: **29,877 followers, 1,081 posts, latest 2026-10-03.**
- TikTok @marques_de_france: 34.6K followers, 363.1K likes (walled, so post dates are UNKNOWN).
- Facebook: 12,557 followers (post recency UNKNOWN).
- YouTube @marquesdefrance: 2.04k subscribers, 188 videos.
- X @marquesdefrance, bio "Le guide d'achat numéro 1 du made in France. Fondé et géré par @emontecer et @elodielapierre."
- LinkedIn company/19095487 and Pinterest: UNKNOWN (login wall).
- Reading: social is active and large for a two-person business. No social pain.

## News (step 8)
`tools/news.py --company "Marques de France" --person "Emmanuel Montecer" --region "(Lyon OR Ain OR Auvergne-Rhône-Alpes)" --industry "made in France guide" --lang fr`. The Carrefour control returned 99 results. Company: 20 results. Person: HTTP 503, 0 results. Region: 0. Industry: 76, none about them.
- Relevant company items (Google News titles only): Le Figaro 2026-03-10, Lyon Entreprises 2026-04-11 and RMC 2026-04-24 on the new app; La Réclame 2025-11-21 on the Jours Tricolores.
- Opened at source: presseagence.fr/?p=953861 (2026-04-10): "L'origine des produits désormais accessible en un clic via une application", app launched 23 Feb, 1,100+ brands, 20,000 products, 2.5M visitors a year. Founder quote: "Avec cette application, nous voulons supprimer les barrières à l'achat de produits fabriqués en France." Their own press release PDF (wp-content/uploads/2026/03/lancement-de-l-app-mobile.pdf, 6 pages) says the same thing and adds region and label filters and a deals tab.

## LinkedIn, six routes (step 9)
1. curl linkedin.com/in/emontecer returned 999. fetch-walled.py on fr.linkedin.com/in/emontecer also returned 999 (1,530 bytes).
2. Web search (person and company): a snippet shows the fr.linkedin.com/in/emontecer profile with "7K followers, 500+ connections". The snippet was not opened, so it is a lead only.
3. Posts search: no post text was retrievable.
4. Company page: the LinkedIn link in their HTML (company/19095487) is walled, UNKNOWN.
5. His own words on the site. Author bio: "Passionné par le numérique depuis mon adolescence, j'en ai fait mon métier"; "je mets ma culture web au service de mes convictions"; "Le vélo et le fabriqué en France sont mes deux passions" (Tour de France stage challenge post, 2026-07-07). Career per /qui-sommes-nous/: L'Équipe (digital audience), then 5 years at Potager City, Lyon.
6. lemlist record: above.

## Capacity and growth (step 10)
- Team: two co-founders run Marques de France ("deux personnes à éditer et maintenir le site"). The register says 1 to 2 employees (2024). Echo Conseils shows 4 people (Renaud, Montecer, Delannoy, Maheshwari) and claims "+50 comptes gérés durant notre carrière".
- Growth: audience +75% in 2025, 92 new brands in 2025, the mobile app in February 2026, Shopify, WooCommerce and PrestaShop integrations between May and June 2026, Trophées 2026, a new seat établissement in January 2026, an RNE update on 2026-09-29, and a new Echo Conseils company from October 2025 (activity from April 2026).
- No careers page and no vacancies found (none linked from the footer).
- Funding: none. "100 % indépendant et autofinancé", no investor.

## Process (step 11)
- Brand onboarding: self-serve WooCommerce checkout, then an online form, then payment, then a **manual check by the founders** against the criteria, then an email when the listing is live. Updates: brand admin data through the Espace Client; marketing content needs a subscription (the Économique plan includes "Mises à jour 1x par an").
- Product feeds: automated through the Shopify, WooCommerce and PrestaShop connectors he built.
- Sponsored content: booked online ("La possibilité de réserver en ligne les contenus sponsorisés", 2025). Each offer page also has a callback form and a visio booking.
- By hand, in their own words: verifying every brand's origin, head office and production sites before publication; sourcing new brands ("énormément de temps"); writing the magazine "à la main"; support by email in 24 to 48 working hours ("petite équipe").
- Professional buyers: "nous proposons également un service de sourcing", plus quote and tender requests (added in 2025).

## Candidate pains per angle, with disproof attempts

### 1. Website holding back growth
- C1a. Nothing found. The site is modern, fast, self-serve and AI-search aware (it has llms.txt and claims "12k+ réponses d'IA citant Marques de France par mois"). Audience grew 75%.
- Disproof: he designs and builds the site himself, and his agency sells conversion and UX work. **RULED OUT.**

### 2. GDPR from an EU view
- C2a. Google Fonts and Google Maps called before consent, and 19 first-party cookies (7 PixelYourSite tracking, 7 Sourcebuster attribution) set before any click. Source: Webbkoll Stockholm, about 19:12 UTC. Control: the same method detected them.
- Disproof: CookieYes is installed and the Meta pixel host was not contacted pre-consent, so it is partly gated. He sells "GDPR compliance" through Echo Conseils, and it is a plugin setting he can fix in an afternoon. **Real but weak as an angle. Usable only as a proof inside a bigger offer, and risky to tell an agency founder.**

### 3. Apps and internal tools (AI workflow, angle A)
- C3a, the strongest. **Brand verification and sourcing are done by hand by two people.** Quotes: "qui assurent eux-mêmes les recherches, les vérifications et la rédaction"; "Nous passons beaucoup (énormément) de temps à chercher des marques"; "nous procéderons à des vérifications" before each listing goes live; Élodie "vérifie chaque marque avant publication". The atelier database grew from 1,472 (January 2026 post) to "plus de 8000" (qui-sommes-nous, now), and every listing shows the production sites. An AI workflow that pre-checks a new brand's origin, head office and production sites (register, site, labels) and drafts the listing would give the founders time back. Disproof: the volume is small (92 new brands in 2025, under 2 a week). Emmanuel is a developer who already automates product feeds and tracking, and Echo Conseils lists "Automation", "Workflows", "AI". He could build this himself. They may treat the manual check as their brand promise ("C'est clairement notre caution de crédibilité"). **Plausible, but the tweak test and the "would he buy it" test are both doubtful.**
- C3b. Brand support and sales by callback, email and visio, with a 24 to 48 hour response promise. Disproof: Crisp chat is already on the site, the FAQ is extensive and self-serve, and checkout is self-serve. Weak.
- C3c. Already built and therefore ruled out: the mobile app, Shopify, WooCommerce and PrestaShop connectors, the Espace Client, online booking of sponsored content, the quote and tender requests.

### 4. Social media
- None. Instagram has 29.9k followers and posted 3 days ago, with 1,081 posts. TikTok 34.6k, YouTube 188 videos. **RULED OUT.**

### 5. Build Squad (capacity)
- C5a. One developer ships everything. Emmanuel alone built the site, the iOS and Android app (Feb 2026), the Shopify app (May 2026), the WooCommerce extension and the PrestaShop module (June 2026). He is also "Expert technique" at Echo Conseils, which sells CRO, landing pages and automation to more than 50 accounts. Four launches in five months from one technical founder who also does the marketing. The angle is extra build hands for Echo Conseils' client work, or for the Marques de France roadmap. Disproof: no vacancy, no stated backlog and no complaint about capacity anywhere. Echo Conseils is small, and its site names him for "réseau" and "partenariats" more than delivery. An agency founder may see Astra as a competitor. **Possible, with no stated pain.**

### Personal angle C (PERSONAL_AI_BRIEF)
- C6a. Two businesses at once. The tagline reads "Co-founder at Marques de France and Echo Conseils". At Marques de France he does "technique et marketing" and "conçoit le site et l'application". He writes the product-launch posts himself (3 in 2026). At Echo Conseils he is co-founder and "Expert technique". Both CTAs route to the founders themselves ("Nous, Élodie et Emmanuel ... sommes à votre disposition", visio booking). Disproof: he is a technical marketer whose agency sells marketing automation and lists AI and workflows. He probably already runs his own tooling (unproven either way). **The signal is visible. Its fit is weak, because he is the kind of person who builds this himself.**

## Three strongest candidates, ranked
1. C3a. Manual brand verification and sourcing by two founders, against a 2.5M-a-year audience and 8,000+ ateliers. Quotes are on /qui-sommes-nous/ and /offre/referencement-de-marque/.
2. C5a / C6a. One technical founder shipping an app and three e-commerce connectors in 2026 while co-running a growth agency. This is a capacity or personal-time angle.
3. C2a. Pre-consent Google Fonts, Maps and PixelYourSite and Sourcebuster cookies from the EU view. Real, but a setting, and told to someone who sells GDPR compliance.

## Ruled out
The website (modern, owner-built, growing), social (large and active), and the app and tools to build (they already have the app, the connectors, a self-serve checkout and a brand portal). Certificate: valid. Era: current. Funding: none, and they are deliberately self-funded.

## Source list (opened this session, 2026-10-06)
lemlist (thread, control thread, two conversation searches, lead record); recherche-entreprises.api.gouv.fr (4 queries); marques-de-france.fr (homepage plus screenshots, qui-sommes-nous, monetisation, offre and 3 offer pages, produit/referencement-de-marque, suggerer-une-marque, faq plus 2 answers, mentions-legales, llms.txt, 5 news posts, the app press PDF, a 150-page crawl twice); echo-conseils.fr (home, mentions-legales); webbkoll.5july.net (EU view); instagram.com, tiktok.com, facebook.com, youtube.com, x.com (social-audit.js); news.google.com (news.py); presseagence.fr/?p=953861; linkedin.com/in/emontecer (999, twice). Wayback CDX for both domains: the connection was reset 5 times and WebFetch is refused, so it is UNKNOWN (not needed for era, since the content is dated 2026).

## Open questions
- Montecer's shareholding in Echo Conseils SARL 992488155, where he is not a gérant. Pappers or the RNE statuts would settle it.
- Whether he already runs AI tooling himself. His LinkedIn posts are walled.
- Whether the founders see manual verification as a burden or as the product. Their own words lean to "the product".
- The EU banner wording and whether it offers a reject button. That needs an EU-rendered screenshot.
