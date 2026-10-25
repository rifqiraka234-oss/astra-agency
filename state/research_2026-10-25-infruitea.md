# Research notes, Kevin Ciclet, Infruitea, ctc_8jsRLWSXCdLuZ55fQ, 2026-10-25

Raka's question, word for word: "modern website for sales or more crowd funding?" The draft and its gate are in
state/drafted_2026-10-25-angle-infruitea.md. Scratch evidence (raw API responses, crawls, screenshots, press HTML) is in
/tmp/claude-0/-home-user-astra-agency/24052593-7323-58b2-9e3f-744f7080d43c/scratchpad/leads/infruitea. Everything below
was read between 13.18 and 13.48 UTC on 25 Oct 2026 unless a date says otherwise.

## Verdict

OPENER, SKETCH shape, website for sales. Confidence MEDIUM. More crowdfunding is the weaker answer, see the table.

## The thread and the person

- `python3 tools/lemlist.py thread ctc_8jsRLWSXCdLuZ55fQ` at 13.18 UTC, control ctc_ch3vFcKAkjQdMKDCg returned 6 items (ok),
  Kevin's thread returned 0 items on every page. The queue's only row for him is the RESEARCH_QUEUED row of 25 Oct.
- The lemlist record, read from the W1b acceptance export (`/api/v2/campaigns/cam_7gnHSf6GvvGy8gH3n/export/leads?state=linkedinInviteAccepted`),
  says jobTitle "Fondateur", companyName Infruitea, companyDomain infruitea.com, tagline "Infruitea | la première tranche de
  fruit à boire... deux fois !", location Annecy, leadId lea_iMqN7f6wz7wrj8Wur. The tagline and companyName agree.
- The French register (https://recherche-entreprises.api.gouv.fr/search?q=infruitea) has one result, INFRUITEA, SIREN
  992449686, created 2025-10-03, active, NAF 10.86Z, seat 1438 route de Frangy, 74580 Viry, sole dirigeant "CICLET KEVIN
  DANIEL, Président de SAS", born January 1995. The site's mentions légales (updated 10/12/2025) say "INFRUITEA, SASU au
  capital de 100 000 € ... RCS de Thonon-les-Bains 992 449 686 ... Représentant légal Kévin CICLET", host Hostinger.
- Independent confirmation that he founded it and still runs it. ECO Savoie Mont Blanc, 10 Jul 2026, "Créée en octobre 2025 à
  Viry, sa société commercialise une tranche de fruit". Le Dauphiné, 2 Oct 2026, names "Kevin Ciclet (Infruitea)" among the six
  Artinov 2026 laureates. The LinkedIn company page lists one employee, Kevin CICLET, and carries his posts from 3 to 7 days ago.
  The Ulule creator block reads "Kevin CICLET boit ses prototypes depuis 2023".

## What sells today, and what happens after 31 October

- infruitea.com, www.infruitea.com and infruitea.com/qr/ all answer 301 to https://fr.ulule.com/infruitea/ (curl and a
  Chromium load, rechecked 13.48 UTC). The WordPress home page was last edited 30 May 2026, the day after the campaign went
  online. /qr/ was created 11 Jun 2026 and also redirects. The WP REST API lists the Redirection plugin's namespace, so this is a
  plugin rule he set and can switch off.
- The Ulule campaign (API https://api.ulule.com/v1/projects/infruitea). Online 29 May 2026, main end 10 Jul 2026, extra time
  to 2026-10-31T22:59:00Z (23.59 Paris), is_in_extra_time true. 246 pre-sales against a goal of 50 (492%), 161 orders, 158
  supporters, 12,546 euros, next stage 250 pre-sales. Delivery promised for October. Shipping only priced to France,
  Switzerland and Europe.
- The extra time hasn't sold much. Kevin's 10 Jul news post counted 135 orders, 217 packs and 11,002 euros at the main end.
  Today it's 161 orders and 12,546 euros, so 15 weeks of extra time brought 26 orders and 1,544 euros.
- What a finished Ulule page shows, checked on two real ones rather than assumed. https://fr.ulule.com/restauration-tigre-1/
  shows "Collecte terminée le 26 juin 2024" and "VOUS L'AVEZ MANQUÉE ? DÉCOUVREZ TOUTES LES COLLECTES PATRIMOINE EN LIGNE".
  https://fr.ulule.com/lxir-micro-cocktail/ shows "Collecte terminée le 28 mai 2023", the same "vous l'avez manquée" button,
  and above it "Bonne nouvelle, ça continue par ici, COMMANDER", which LXIR points at its own shop https://lxir-drink.com/
  (live, with pharmacies and subscriptions). So after 31 Oct Kevin's page will suggest other campaigns unless he points that
  button at a shop of his own.
- His own promise to backers. The Ulule page's stretch goals list "100 préventes, Un site tout beau, tout neuf ! Création
  d'une toute nouvelle plateforme en ligne, plus intuitive et fonctionel pour vous mais aussi plus soignée pour exposer notre
  concept !" (reached). The funding image's alt text says the same at "200%", "UNE IMAGE & SITE ESHOP TOUT NEUF".
- His 23 Sep Ulule news post, "Nous finalisons notre site internet, améliorons continuellement nos process de production,
  préparons la suite et commençons doucement à démarcher à droite et à gauche." This is the reason the confidence is MEDIUM.

## The shop behind the redirect (proof for the sketch, never named in the message)

- crawl.py read 47 URLs twice with identical results, 36 from the WordPress sitemaps, 45 at 200, 2 at 404.
- WooCommerce, 8 products (Store API https://infruitea.com/wp-json/wc/store/v1/products), Starter Pack 19 euros, Gourde 29.90,
  Paille 2.50, Combo 64.90, Origin 34.90, Activ' 39.90, Couple Pack 104.90, All-in Pack 79.90, all purchasable, Stripe and Klarna
  on. 7 of 8 have no image (7 woocommerce-placeholder images in the raw /boutique/ HTML, and the desktop screenshot
  infr-shop-desktop.png shows seven grey placeholders). All 8 product pages carry "Ingrédient 1 Ingrédient 2 Ingrédient 3", short
  descriptions include "Description courte produit", "test" and "Allez dans onglet produit et modifier sur WP pour allez ici".
- The menu links /packs and /faq return 404. The footer's "Notre histoire", "Contactez-nous" and "FAQs" point at product pages.
  "Devenir revendeur" is a plain list item with no link. None of the Ulule packs is in the shop.
- The CGV (updated 10/12/2025) say "Les produits sont proposés à l'unité, en pack, ou sous forme d'abonnement mensuel sans
  engagement" and give an Article 10 on subscriptions. The shop sells no subscription (all products simple or variable, no
  subscription plugin in the wp-json namespaces, 0 "abonn" on /boutique/ and the product pages, control 5 on /cgv/).
- No published work since May. Newest media upload 30 May 2026, newest page 11 Jun 2026, no product edited after 12 Jan 2026.
  The page "Homepage – Kevin – HTML (full lag, pas exploitable avec woocommerce)" (modified 10 Dec 2025) shows he built it
  himself and hit a wall. Authors are infruiteawebsite@gmail.com and a Benjamin Drunet (nothing found on him).
- No other shop found. infruitea.myshopify.com answers "Store unavailable", crt.sh shows only fr. (one certificate, Nov 2025,
  unreachable) and www., the Hostinger temporary domain doesn't answer. Wayback's availability API shows a 200 capture of the root
  on 12 May 2026, the archive itself was unreachable from here (reset and 502).

## Owner's own words this month (LinkedIn company page, rendered in Chromium, and Instagram embed)

- About 21 Oct, after the Fête de la science in Angers with 235 EAT, "attirer l'attention ne suffit pas à vendre ... comment
  faire comprendre tout ça en quelques secondes, sans avoir besoin de nous à côté pour l'expliquer ? Parce que demain, si nos
  produits se retrouvent en rayon, il faudra bien qu'ils sachent se vendre tout seuls !"
- About 20 Oct, "on a dépensé exactement 0 € en publicité ... on mise sur tout ce qui est gratuit, concours, presse, radio,
  événements". About 19 Oct, the tube went from 21 slices to 12, so backers get two tubes of 12. About 18 Oct, first orders
  shipping as production allows, Kevin filling Mondial Relay lockers at 2 am, a QR flyer in each parcel for a questionnaire on
  "ce qui ferait que vous ne rachèteriez jamais Infruitea".
- Instagram 6 Oct, "Pas des millions de budget com', pas une armée derrière nous". 15 Oct, "ÇA ARRIVE ENFIN CHEZ VOUS".
- So his current goals, linked from three clues, are turning free visibility into sales without him there to explain it,
  winning the repurchase from the first backers, and getting onto shelves. The website for sales serves all three.

## The pain table

| Pain | Proof | Cost to him | Would he name it | Pay test | Verdict |
|---|---|---|---|---|---|
| After 31 Oct the domain opens a finished Ulule page and no shop is ready | 301 to Ulule, extra time to 31 Oct, two finished Ulule pages as control, shop unfinished | Every press, radio, fair and LinkedIn visitor, his only marketing at 0 euros of ads, lands on a page that sells nothing. The first backers' reorders have nowhere to go | Yes, he promised backers a new site and says attention doesn't sell | A shop rebuilt around the double infusion, packs, refills and a trade page, 3,000 euros and up. Budget thin | CHOSEN, hottest and biggest |
| More crowdfunding | 26 orders and 1,544 euros in 15 weeks of extra time, mostly friends and family in the 70 comments, his 10 Jul post said pre-orders stop | Low, the campaign has run its course | No sign | Astra doesn't build crowdfunding campaigns | Not chosen |
| Trade channel | "Devenir revendeur" unlinked, retail pack by email, shelves in his post | Real later, not proven now | Partly | Folded into the shop offer as a pro page | Folded in |
| Repeat purchase and subscription | CGV subscription not sold, Activ' as a 60 day cure | Real, but the CGV may be a leftover | Unclear | Folded in as refills | Folded in |
| Hidden shop placeholders | 7 of 8 placeholder images, "Ingrédient 1" on 8 pages, 2 menu 404s | Nobody sees it today | Would read as a crawler nitpick | Too small alone | Proof only |
| Social | IG 390, 28 posts, newest 15 Oct, LinkedIn 707 and lively, FB 97, TikTok 12, YouTube 9 | Small audience, active founder | No, he does it himself on purpose | Not chosen | Not chosen |
| GDPR | eu-view.py from Stockholm, 8 first party cookies, 0 third party | None | No | Never the angle | Clean |

## Sources read (with the outcome)

Ulule page and API, Ulule news (8 posts, read in full), Ulule comments (70, read), the WordPress site (47 URLs twice), the
Store API and WP REST API, the register, ECO Savoie Mont Blanc (10 Jul and 28 Sep 2026, partly paywalled), Culture Nutrition
(7 Jul 2026, full), Le Dauphiné (19 May and 2 Oct 2026, paywalled after the lede), Le Messager (25 Jun 2025, 403, walled), the
LinkedIn company page and six posts, Kevin's profile (999, walled), Instagram embed (6 captions), Facebook, TikTok and YouTube
via social-audit.js, Webbkoll from Stockholm, crt.sh, two finished Ulule pages and LXIR's shop for control and benchmark, LSA
conso and Ouest-France (walled), Bref Eco. Google News through tools/news.py, five runs, control Carrefour 100 each time.

## What the message rests on, so a later session can re test it

1. https://infruitea.com/ answers 301 to https://fr.ulule.com/infruitea/ .
2. https://api.ulule.com/v1/projects/infruitea has date_end_extra_time 2026-10-31T22:59:00Z.
3. https://www.culture-nutrition.com/2026/07/07/infruitea/ links https://infruitea.com/ .
4. https://www.linkedin.com/company/infruitea lists www.infruitea.com as its website.
5. A finished Ulule page shows "Collecte terminée" and a button to other campaigns (lxir-micro-cocktail, restauration-tigre-1).
If 1 has changed (the domain now opens a shop) or 2 has changed (extra time extended), the message is wrong and must not go.
