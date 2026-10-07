# Evidence, Nicolas Bergé, promocash Narbonne (BRG CASH)

contactId ctc_mQBx2Mr64rqs7v4Qu, leadId lea_xtg2WKiQSJ88KmvND, campaign cam_PryZp5LuvQv8NznHh (v0.1)
Researched 2026-10-06, about 19:05 to 19:40 UTC. Read only. Nothing sent, no lemlist writes, nothing written to the repo.

## STOP FLAGS

- **Thread: EMPTY.** No activities are recorded. The sentOnly list shows only our generic connect note (2026-10-03 14:01 UTC). He has never replied. Nothing sent beyond the invite.
- **Owner: YES, resolved.** The "Head of Sales" tagline is stale. Three sources agree he's the owner operator (register, Pappers, press). Details below.
- **Domain: off limits.** promocash.com is the franchisor's (Groupe Carrefour). He can't change it. The narbonne.promocash.com URL on his LinkedIn page just 301s to the corporate homepage.
- **Ordering app: off limits.** On 2 Oct 2026 the franchisor launched a national customer app with 24/7 ordering (see Process). A separate ordering tool would compete with it.
- **Campaign note.** search_campaign_leads returns campaign status `paused` for cam_PryZp5LuvQv8NznHh at 19:06 UTC. The repo notes say v0.1 is the only running campaign. Raka's call, but worth knowing.
- **Prior verdict.** /tmp/claude-0/agents/b6_nicolas/evidence.md (earlier today) closed this lead CLOSED_NOT_ICP because "nothing he controls that we could change". That's a candidate claim. The re-test is below. It missed his own LinkedIn company page (514 followers) and the L'Indépendant article.

## 1. Thread

- `get_inbox_conversation(ctc_mQBx2Mr64rqs7v4Qu)` page 1: `activities: []`, `totalItems 0`, `nextPage null`, linkedinSync `recent` at 2026-10-06T18:58:51Z.
- The caller's brief already ran a positive control in the same session (another thread came back full). I didn't run a second one.
- `get_inbox_conversations` search "Nicolas Bergé", listId sentOnly, run 19:40 UTC. One conversation, ibx_t9grSsu62dpXnQtwh, same contactId. lastSentAt 2026-10-03T14:01:55Z, lastSentMessagePreview "Hi Nicolas, saw your business and thought it was cool 😀 I'm a business owner too! Would love to con" (that's the generic connect note). lastRepliedAt null, isYourTurn false, lastActivityAt 2026-10-06T05:14:24Z (the accept).
- listId myConversations: 0 results.
- So the only thing ever sent is the connect note on 3 Oct, and it isn't stored as an activity in the thread. He has never replied. **Silent accepted, an OPENER is the right shape.**

## 2. Record (search_campaign_leads id=lea_xtg2WKiQSJ88KmvND, read in full)

- jobTitle "Chef d'entreprise". tagline "Head of Sales". industry "Operations".
- companyName "promocash Narbonne". companyDomain promocash.com. companyLinkedinUrl /company/promocashnarbonne. companyType Self-Employed, 11-50, founded 1992.
- summary: "After accounting studies, I quickly turned to the trade, including the commercial station. Human challenge, determined and ambitious, I decided to try my lucky in Paris."
- jobDescription: "Passionné par le secteur Café, Hôtel, Restaurant, je m'engage à offrir des expériences uniques et authentiques à chaque client. Chez nous, l'humain est au cœur de notre approche." (gloss: passionate about the café, hotel and restaurant trade, people at the heart of how we work)
- Reconciliation: the tagline contradicts jobTitle. The register and press below settle it in favour of jobTitle. "Head of Sales" is almost certainly his previous role at a wholesaler. No "former" or "ex" anywhere.

## 3. Ownership, statutory

recherche-entreprises.api.gouv.fr `q=promocash&code_postal=11100` (2026-10-06 19:06) returned five entities at 2 rue de Plaisance, all with enseigne PROMOCASH:

| SIREN | Name | Role at the store | State |
|---|---|---|---|
| 991264359 | **BRG CASH** | Current operator. Created 2025-10-01, NAF 46.39B. **Gérant BERGE NICOLAS ALAIN-MARC, born 11/1986** | Active, 1 establishment |
| 810940163 | CEPRODIS (gérante Céline Czaja) | Previous operator, 2015 to 2025. Last accounts closed 2025-09-30 (BODACC 2026-06-14), CA 0 in 2025 | Still registered, not trading |
| 801952284 | FONTJOURDE DISTRIBUTION | Narbonne establishment 2014 to 2015 | Closed (F) |
| 502612567 | MAUCOURT C ET C | Narbonne establishment 2008 to 2014 | Closed (F) |
| 345130512 | GENEDIS | Carrefour's Promocash entity. NAF 68.20B (letting), so it's the landlord or holder of the site | Active |

- Pappers https://www.pappers.fr/entreprise/brg-cash-991264359 (fetch-walled.py, 200): "Forme juridique : EURL, entreprise unipersonnelle à responsabilité limitée". Capital 7 500 €. RCS Narbonne 12/09/2025. "BERGE Nicolas, Gérant, 39 ans, 11/1986, Depuis le 12/09/2025". "Effectif : Au moins 1 salarié". No accounts filed yet. The beneficial owners section is restricted.
- **Independent confirmation, press.** L'Indépendant, 2025-11-05, https://www.lindependant.fr/2025/11/05/une-nouvelle-gerance-pour-lenseigne-promocash-de-narbonne-13034857.php (opened, JSON-LD articleBody read). It says: "À 38 ans, il a sauté le pas en reprenant la franchise Promocash de Narbonne pour devenir son propre patron" (at 38 he took over the Narbonne franchise to become his own boss), and "Côté équipe, l'effectif se monte à 22 personnes et 2 employés sont actuellement en phase de recrutement" (22 staff, 2 more being hired).
- **Third tie.** The LinkedIn company page /company/promocashnarbonne lists "Nicolas Bergé" under employees, linking to fr.linkedin.com/in/bergenicolas, the same profile lemlist holds.
- Other mandates in the register for the same person (born 1986, Narbonne): SCI BERGE INVESTISSEMENTS, BERGE IMMO, an indivision. These are personal property holdings, **never to be used in a message**.
- Same name, different people, not used: a Nicolas Bergé who became a Delhaize franchisee in Marche-en-Famenne (Sudinfo, 2023) and others in the person search. I can't tie any of them to him.
- **Verdict: owner operator.** He's the gérant of a single member EURL that runs the store, and the press says he bought the franchise to be his own boss. Sole ownership is strongly implied (EURL) but the beneficial owner register is closed to us.

## 4. Prior research (candidates only)

- No rows in state/silent_accepted_queue.jsonl or state/drafted_*.md for his contactId, leadId or name. The files that matched "promocash" did so on other text, and a grep for the ids returned nothing.
- /tmp/claude-0/agents/b6_nicolas/evidence.md (2026-10-06). Every claim of his I re-tested came out the same: BRG CASH gérant, EURL, the CEPRODIS succession, the corporate store page, the 150/300 € minimums, no own domain. Not re-tested: the Ecocert certificate naming "PROMOCASH NARBONNE-BRG CASH", and the LinkedIn snippet "Directeur de site (formation) at Promocash France, Meilleur Commercial de France 2015" (snippet only, so it stays unverified). His conclusion "the only surface is a local Facebook page, too thin" missed the LinkedIn company page that **is** the franchisee's own.

## 5. Website

- He has **no own domain**. None appears in the register, Pappers, the press piece or his LinkedIn page. The LinkedIn page's website is https://narbonne.promocash.com/, which I curled at 19:10 UTC: it redirects to https://www.promocash.com/ (200, 133 KB, corporate homepage). Control example.com returned 200 in the same minute.
- Store page https://www.promocash.com/ecommerce/magasin/a007R00000wy6jsQAA/narbonne
  - crawl.py pass 1 read 3 pages, pass 2 read 3 (equal). The text came out empty because it's a Salesforce page that renders in JS.
  - I rendered it in Chromium (scripts/li.js, store.txt). It shows tel 04 68 58 10 00, **"Fax du magasin 04 68 58 10 01"**, hours Mon to Fri 06:30 to 18:00, Sat 06:30 to 12:30, Sun 09:00 to 12:00. "Adresse mail administrative promocash_adm_narbonne@promocash.com". Minimums: delivery 150 €, Drive 300 €, Drive Déporté 300 €. The footer has "© 2026 PROMOCASH - Groupe Carrefour" and "Accessibilité - non-conforme". The only socials are national (promocashfrance on LinkedIn, IG, FB, YT and TikTok).
  - site-audit.js: 200, OneTrust banner with a reject option, egress US, so GEO VOID and no GDPR claim from this run. Screenshots opened. Desktop and phone both show the corporate Promocash template with the cookie modal "Pour les cookies 🍪, c'est vous qui voyez ;)" over the store's details card. It's identical to every other store page. The phone render is fine.
- All of this is corporate and off limits as an angle.

## 6. GDPR (EU view, eu-view.py, Webbkoll Stockholm, nothing clicked)

7 cookies before any click, all first party, **including `_ga` and `_ga_GHD3BY01LK`** (Google Analytics). Third party hosts: cdn.cookielaw.org, fonts.googleapis.com, fonts.gstatic.com, geolocation.onetrust.com, region1.google-analytics.com, www.googletagmanager.com. So analytics cookies are set before consent for an EU visitor. **It's the franchisor's site, so Nicolas can't fix it. Not an angle for him.**

## 7. Social

- His own HTML: there is none, because he has no site. The URL comes from the lemlist record and is confirmed by the page itself (address 2 rue de Plaisance, employee Nicolas Bergé).
- social-audit.js: linkedin.com/company/promocashnarbonne was **read**, 514 followers. His /in/bergenicolas profile is UNKNOWN (999 on curl, signup wall in Chromium).
- Rendered company page (li_company.txt, 19:15 UTC). Tagline "L'allié des pros de la restauration. Produits, services et conseils aux petits oignons À votre service !" (the restaurant pros' ally, products, services and advice with loving care). It shows 3 employees. Posts by age:
  - 2 months: wedding catering trends (2 reactions). Brunch trend (7, 1 comment). **"Nous recherchons des saisonniers pour renforcer nos équipes 🔥🔥🔥 Ville de Narbonne"** (we're looking for seasonal staff, 17 reactions).
  - 4 months: Maîtres Cuisiniers de France partner forum (8). A repost of Racing Club Narbonnais.
  - 5 months: "+59,9 % de volume d'activité : le boost des ponts de mai" (2). 20 April 2026, MCF national day (17).
  - 6 months: seasonal and local produce (3). UMIH and France Travail pop-up restaurants (19). 16 Feb 2026, the Promocash x MCF partnership (18).
  - So 10 posts in about 6 months, **none in the last 2 months**. The 2 Oct 2026 app launch isn't on his page (it is on promocashfrance, "2 sem." and "1 mois").
  - Most posts read like network content ("nos magasins s'engagent", national partnerships). Only the seasonal hiring post and the rugby club repost are visibly local. **Disproof attempt:** the promocashfrance render (13 559 followers) only showed recent posts, so I couldn't prove whether the brunch, wedding and May bridges posts are copies of national ones. Unproven either way.
- Facebook and Instagram: two web searches found no Narbonne store account. Per the prior file, facebook.com/p/Cash-promo-narbonne-100078188860498 is a different business. No handle was guessed. Status UNKNOWN, not empty.
- Google profile: ac-franchise.com/store/promocash-36 (opened) shows 4.3/5 from 60 reviews and "Excellent accueil et personnel sympathique, produits de qualité à prix compétitifs". It also summarises complaints about short use by dates, stock gaps and air conditioning. That's an undated third party aggregate, and I couldn't open the Google profile itself.

## 8. News

news.py control 'Carrefour' gave 200 and 98 results. Company query: 0. Person: 15 results, most of them other Nicolas Bergés. Region and industry queries: 503 (unknown, not empty).
- **L'Indépendant 2025-11-05** (opened, quoted above). He's from Lézignan-Corbières. He started "en alternance au sein de la Maison Langlois, une boucherie charcuterie qui travaillait déjà avec les restaurateurs. Puis j'ai continué chez des grossistes". His priorities: "développer les partenariats avec les filières locales, notamment celles des fruits et légumes" (local supply partnerships, especially fruit and veg). "Réactivité et flexibilité sont également les maîtres mots en termes de service à la clientèle" (speed and flexibility in customer service).
- **L'Observatoire de la franchise, 2026-10-02** (opened, datePublished 2026-10-02T10:43+02:00): "Promocash digitalise la relation client avec une appli mobile". The network has "magasins pilotés par des patrons indépendants et ses 2700 collaborateurs". The app is meant "faire gagner un temps précieux aux restaurateurs".
- promocashfrance LinkedIn, "1 mois": "Les clients peuvent désormais commander 7j/7 et 24h/24 … Scan direct des produits … promotions … Choix du mode de retrait … Archivage automatique des factures." (customers can now order around the clock, scan products, see promotions, choose pickup, invoices archived automatically)
- ac-franchise 2016 (from the prior file): the store was modernised under Céline Czaja.

## 9. LinkedIn, six routes

1. curl /in/bergenicolas returned 999. 2. A web search for the profile plus Narbonne came back with nothing about him. 3. Post search: nothing of his found. 4. The company page was read in Chromium (above). 5. His own words: the L'Indépendant quotes plus the lemlist summary and jobDescription. 6. The lemlist record (above). His personal posting activity stays UNKNOWN.

## 10. Capacity and growth

- He took over the franchise in Oct 2025, so the first anniversary is now. He's 39, a first time owner.
- 22 staff, plus 2 being hired as of Nov 2025 (L'Indépendant). A seasonal hiring post went up about Aug 2026 (LinkedIn). LinkedIn shows 3 employees on the platform.
- The store opens 06:30 six days a week and on Sunday mornings.
- No funding, no new branch, no new site. Build Squad doesn't apply (a wholesaler, not an agency or product team).

## 11. Process

- Customers order by the corporate app (24/7, since about early Sept to Oct 2026), the corporate ecommerce, delivery (min 150 €), Drive (300 €), Drive Déporté (300 €), in store cash and carry, and by **phone and a listed fax line**. Admin email is on the corporate domain.
- What the franchisee controls himself: hiring and staffing, the local sales relationship with restaurants (his stated "réactivité et flexibilité"), local producer sourcing (his stated priority), his own LinkedIn page and local events.
- I couldn't see from outside how local supplier partnerships or field sales are run (CRM, spreadsheets, phone). That's UNKNOWN. No job ad text describing the manual work was found.

## Candidate pains per angle, with disproof attempts

**1. Website.** No own site. The corporate store page is the franchisor's. **Ruled out.** The LinkedIn "Site web" points to a subdomain that 301s to the national homepage. That's true but trivial, and the franchisor controls it.

**2. GDPR.** `_ga` set before consent from Stockholm. **Ruled out for him**, it's Promocash France's site.

**3. Apps and tools (Optimise, AI workflow A).**
- (a) Customer ordering, tracking or reorder app. **Disproved** by the corporate app launch, 2026-10-02 article and promocashfrance post.
- (b) An AI workflow for local producer sourcing and onboarding, fruit and veg filières. The evidence is his own stated priority in L'Indépendant 2025-11-05. **Disproof attempt:** does Promocash France run local sourcing centrally? The network posts push national ranges and labels (ANKLY, MCF "Sélection des Chefs", Ça Crousty). I saw no local sourcing tool. Whether franchisees may list local suppliers themselves is UNKNOWN (the franchise contract isn't public). Medium to weak.
- (c) An AI workflow for the owner's local sales follow up: winning and keeping restaurant accounts across Grand Narbonne, new openings, seasonal coastal restaurants. Evidence: his background is sales ("Head of Sales" tagline, wholesaler career, the snippet's "Meilleur Commercial"), and he names "réactivité" as his service word. **Disproof:** the corporate app now handles ordering, but prospecting and account follow up stay local. No AI or CRM is visible on his side. I grepped li_company.txt for IA, AI, intelligence artificielle, assistant, automatis and chatbot. The only hit was a "similar pages" entry (MonAssistantNumerique Narbonne), which isn't his content. Control: the same grep method found "application" 6 times in li_france.txt. Inference, not visible pain. Weak to medium.
- (d) Seasonal hiring load, a recruitment intake workflow. Evidence: the "Nous recherchons des saisonniers" post and the 2 hires in progress in Nov 2025. Restaurant sector "métier sous tension" in his own reposted UMIH post. **Disproof:** hiring 2 to 5 seasonals is an afternoon of Indeed for most owners, so the tweak test is borderline. Weak.

**4. Social.** His own LinkedIn page, 514 followers. It went quiet 2 months ago and missed the network's app launch. Most posts look like network content. It's a franchisee controlled surface, but a "your LinkedIn went quiet" point fails the tweak test on its own. Weak, unless it's folded into a local content workflow. **Disproof:** 10 posts in 6 months is not a dead page, and I can't say the posts aren't his.

**5. Build Squad.** **Ruled out.** Not an agency, studio, funded startup or product team.

**Personal AI (PERSONAL_AI_BRIEF).** He's a first time owner, one year in, running 22 staff and a store open 06:30 seven days. Visible in his own material: he wants local producer partnerships and fast, flexible service. **Nothing in his own words says he's short of time**, and the brief forbids inventing how he spends it. **Disproof:** he doesn't sell AI or automation, and shows no AI setup of his own.

## The three strongest candidates (none is strong)

1. **Local sourcing workflow (3b).** "développer les partenariats avec les filières locales, notamment celles des fruits et légumes", L'Indépendant 2025-11-05. It's his own words and his own lever. Risk: franchise rules on local listing are unknown.
2. **Owner's sales and account follow up AI workflow (3c).** His sales career plus "Réactivité et flexibilité … service à la clientèle" (same article), and the corporate app doesn't do local prospecting. It's an inference from his background, not a stated pain.
3. **His own LinkedIn page and seasonal hiring (4 and 3d).** 514 followers, no post in 2 months, a seasonal staff post, 2 hires in progress. True but small, and fails the tweak test alone.

## Ruled out

The website, GDPR, the ordering app (corporate app launched 2026-10-02), Build Squad and the corporate social accounts. He's not an AI seller.

## Source list (opened this session)

1. lemlist get_inbox_conversation ctc_mQBx2Mr64rqs7v4Qu
2. lemlist search_campaign_leads lea_xtg2WKiQSJ88KmvND
3. https://recherche-entreprises.api.gouv.fr/search?q=promocash&code_postal=11100
4. https://recherche-entreprises.api.gouv.fr/search?nom_personne=berge&prenoms_personne=nicolas
5. https://bodacc-datadila.opendatasoft.com (CEPRODIS 810940163 notices, Narbonne Plaisance since 2025-09)
6. https://www.pappers.fr/entreprise/brg-cash-991264359
7. https://www.lindependant.fr/2025/11/05/une-nouvelle-gerance-pour-lenseigne-promocash-de-narbonne-13034857.php
8. https://www.linkedin.com/company/promocashnarbonne (Chromium)
9. https://www.linkedin.com/company/promocashfrance/ (Chromium)
10. https://www.linkedin.com/in/bergenicolas (999 and signup wall)
11. https://www.promocash.com/ecommerce/magasin/a007R00000wy6jsQAA/narbonne (crawl x2, site-audit, Chromium)
12. https://narbonne.promocash.com/ (301 to promocash.com)
13. https://www.observatoiredelafranchise.fr/indiscretions-actualite/PROMOCASH-promocash-digitalise-la-relation-client-avec-une-appli-mobile-84668.htm
14. https://ac-franchise.com/store/promocash-36/
15. https://www.promocatalogues.fr/magasins/promocash/lieux/narbonne (no reviews shown)
16. Webbkoll EU view of the store page
17. Google News RSS via news.py

These cover 11 domains. annuaire-entreprises.data.gouv.fr returned an Incapsula wall (ours, unknown).

## Open questions

- Re-pull the thread immediately before any send.
- The v0.1 campaign shows `paused` in lemlist. Confirm with Raka.
- Does the franchise agreement let him list local producers or run his own sales tooling? Only he can say.
- His personal LinkedIn activity and Google profile are both UNKNOWN (walled).
