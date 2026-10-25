# Drafts, 2026-10-25, Raka's angle call on Infruitea. NOT SENT, waiting on Raka's word

Raka, 25 Oct, word for word: "modern website for sales or more crowd funding?"

**The answer, website for sales.** Kevin runs Infruitea, a fruit slice you drink twice, cold then hot. His crowdfunding on
Ulule worked (246 pre-sales against a goal of 50, 12,546 euros), but its extra time ends on 31 October, and infruitea.com
still sends every visitor to that Ulule page. After that the page will say the campaign is over and suggest other Ulule
projects. A shop half built on WordPress sits behind the redirect, with 7 of its 8 products still on the grey placeholder image.
More crowdfunding is the weaker bet. The 15 weeks of extra time since 11 July brought 26 orders and 1,544 euros, against
135 orders in the first 42 days, and his own Ulule page promised backers "Un site tout beau, tout neuf" once it hit 100 pre-sales.

Research 2026-10-25 13.18 to 13.48 UTC, evidence in
/tmp/claude-0/-home-user-astra-agency/24052593-7323-58b2-9e3f-744f7080d43c/scratchpad/leads/infruitea (crawls, renders,
screenshots, the Ulule API pulls, the register pull, the press pages, the LinkedIn company page text). Thread pulled
2026-10-25 13.18 UTC with `tools/lemlist.py thread`, control ctc_ch3vFcKAkjQdMKDCg 6 items ok, Kevin 0 items. Research notes
in state/research_2026-10-25-infruitea.md. Re pull the thread, run the four way never messaged check and reopen every claim
in the minute before any send.

### Kevin Ciclet, Infruitea, ctc_8jsRLWSXCdLuZ55fQ

> NOT SENT. Flags for Raka. (1) Infruitea is a French consumer brand, and the 26 Oct GTM plan lists both France and
> consumer businesses under "don't pitch". You named him, so here it is, your call. (2) On 23 Sep Kevin told backers
> "Nous finalisons notre site internet", so he may be building the new site himself. Nothing has changed on the WordPress
> since May (newest upload 30 May, no product edited since 12 Jan), and nothing points to an agency. So his likeliest no is
> "I'm doing it myself", and the message only states what a visitor sees today. (3) There isn't much money. 12,546 euros
> raised, an 11,000 euro regional grant, and he says they've spent "exactly 0 €" on ads. The 500 euro floor matters here.
> (4) The packaging changed from 21 slices to 12 per tube (his LinkedIn, about 19 Oct) and the Ulule page still says 21, so
> the message doesn't mention tubes. (5) France has given us 0 yeses in 40 since September, and the message is in English.

```gate
lead: Kevin Ciclet, Président de SAS of INFRUITEA SAS (SIREN 992449686), created 2025-10-03, 1438 route de Frangy, 74580 Viry, NAF 10.86Z, sole dirigeant "CICLET KEVIN DANIEL, Président de SAS" (https://recherche-entreprises.api.gouv.fr/search?q=infruitea read 2026-10-25 13.19 UTC). Mentions légales, "INFRUITEA, SASU au capital de 100 000 € ... Représentant légal Kévin CICLET" (https://infruitea.com/mentions-legales/). Founder in the press, "Créée en octobre 2025 à Viry, sa société" (ECO Savoie Mont Blanc 10 Jul 2026). lemlist jobTitle Fondateur, companyName Infruitea, companyDomain infruitea.com, tagline "Infruitea | la première tranche de fruit à boire... deux fois !", agrees with companyName. ctc_8jsRLWSXCdLuZ55fQ, leadId lea_iMqN7f6wz7wrj8Wur, campaign W1b cam_7gnHSf6GvvGy8gH3n, accepted 2026-10-24 06.53 UTC. Thread 0 items, control 6
site pass 1: 47 URLs, tools/crawl.py on https://infruitea.com, 36 from the WordPress sitemaps, 45 at 200 and 2 at 404 (/packs and /faq, both linked from the menu), every page read. The root, www and /qr/ return the Ulule page through a 301
site pass 2: 47 URLs, second crawl, identical URLs and word counts, then site-audit.js desktop and phone on the root (infr-home, the Ulule page) and on /boutique/ (infr-shop), Chromium text renders of the Ulule page and two finished Ulule pages for control, the WooCommerce Store API, the WP REST API (pages, products, media, users, namespaces), all opened
deep analysis: Infruitea sells a dehydrated fruit slice infused once cold and once hot, Activ' (a food supplement, sold as a 60 day cure) and Origin. Kevin, an ex restaurateur from Talloires, built it in his garage over two years, got 11,000 euros from the AURA region, joined the Station A incubator, and produces with Azêta in Cluses. Sales so far run through Ulule only, 29 May to 10 Jul plus extra time to 31 Oct 2026 22.59 UTC, 246 pre-sales, 161 orders, 12,546 euros, first parcels shipped from about 15 Oct. infruitea.com and infruitea.com/qr/ 301 to https://fr.ulule.com/infruitea/ , set when the campaign opened (the WP home was last edited 30 May). Behind that sits a WooCommerce shop Kevin built himself, 8 products at 2.50 to 104.90 euros, Stripe and Klarna on, 7 of 8 products on the woocommerce placeholder image, "Ingrédient 1 Ingrédient 2 Ingrédient 3" on all 8 product pages, footer links wired to product pages, "Devenir revendeur" as plain text with no link, none of the Ulule packs, no subscription though the CGV describe "abonnement mensuel sans engagement". His homepage draft is titled "Homepage – Kevin – HTML (full lag, pas exploitable avec woocommerce)". His Ulule page lists "Un site tout beau, tout neuf ! Création d'une toute nouvelle plateforme en ligne" as the 100 pre-sales stretch goal. On 23 Sep he wrote "Nous finalisons notre site internet ... commençons doucement à démarcher". His LinkedIn this week, "attirer l'attention ne suffit pas à vendre ... comment faire comprendre tout ça en quelques secondes, sans avoir besoin de nous à côté pour l'expliquer ?" and "on a dépensé exactement 0 € en publicité"
owner linkedin: Route 1 tools/fetch-walled.py https://www.linkedin.com/in/kevin-ciclet , 999, 1,530 bytes, walled. Route 2 tools/news.py "Kevin Ciclet" 5 and "Kévin Ciclet" 5, Le Dauphiné 2 Oct 2026 (Artinov laureate), ECO Savoie Mont Blanc 28 Sep and 10 Jul 2026, Le Dauphiné 19 May 2026, Le Messager 25 Jun 2025. Route 3 web search site:linkedin.com/posts kevin-ciclet, nothing of his returned. Route 4 the register, sole Président de SAS. Route 5 the company page https://www.linkedin.com/company/infruitea rendered in Chromium, 707 followers, 1 employee Kevin CICLET, six of his posts from the last 3 to 7 days read in full (attention doesn't sell, 0 euros on ads, 21 to 12 slices per tube, first orders shipping with a QR questionnaire, an Ecoris talk, Azêta's repost). Route 6 Instagram https://www.instagram.com/infruitea/ through the embed, 390 followers, 28 posts, newest 2026-10-15 "ÇA ARRIVE ENFIN CHEZ VOUS", and the Ulule creator block "Kevin CICLET boit ses prototypes depuis 2023"
contact linkedin: same person, the register, the mentions légales, the company page's only employee and the lemlist record agree
google news: tools/news.py fr 2026-10-25, "Infruitea" 4 (ECO Savoie Mont Blanc 10 Jul 2026, Culture Nutrition 7 Jul 2026, Le Dauphiné 19 May 2026, Le Messager 25 Jun 2025), "Kevin Ciclet" 5, "Kévin Ciclet" 5, "Infruitea Ulule" 0, control Carrefour 100 on every run
regional news: tools/news.py (Haute-Savoie) (start-up agroalimentaire), 50, Startup Weekend Annecy (Le Dauphiné 20 Sep 2026), Féroce raises funds (Bref Eco 21 Jul 2026, opened at source), Accélérateur Territorial Mont-Blanc (Le Dauphiné 18 Jun 2025), and Artinov 2026, departmental laureates win a prize worth 3,000 euros (https://groupe-ecomedia.com/qui-sont-les-laureats-artinov-2026-en-haute-savoie/). A narrower drinks query returned 0
industry news: tools/news.py boissons fonctionnelles marché, 59, functional water, energy drink and sugar free drink market reports (Fortune Business Insights, Sep and Oct 2026), fibre in French drinks (La veille des innovations alimentaires 14 Sep 2026). complément alimentaire marché France Synadiet, 37, LSA conso 7 Jul 2026 "les compléments alimentaires en quête de rebond en GMS" (walled), La Tribune 16 Feb 2026. start-up agroalimentaire, 100, Waycy as a natural energy drink alternative (Ouest-France 26 May 2026, 403, walled). Culture Nutrition 7 Jul 2026 puts the French tea and infusion market above 741 million euros (Stepi) and names LXIR, which went from Ulule to pharmacies. LXIR's finished Ulule page sends its button to its own shop https://lxir-drink.com/
sources:
1. https://fr.ulule.com/infruitea/
2. https://api.ulule.com/v1/projects/infruitea
3. https://api.ulule.com/v1/projects/229751/news
4. https://infruitea.com/boutique/
5. https://infruitea.com/mentions-legales/
6. https://infruitea.com/cgv/
7. https://infruitea.com/notre-histoire/
8. https://infruitea.com/wp-json/wc/store/v1/products
9. https://infruitea.com/wp-json/wp/v2/media?orderby=date
10. https://recherche-entreprises.api.gouv.fr/search?q=infruitea
11. https://www.linkedin.com/company/infruitea
12. https://www.instagram.com/infruitea/
13. https://www.culture-nutrition.com/2026/07/07/infruitea/
14. https://groupe-ecomedia.com/infruitea-lance-la-tranche-de-fruit-a-boire-deux-fois/
15. https://www.ledauphine.com/insolite/2026/05/19/une-tranche-de-fruit-qui-devient-boisson-l-invention-d-un-restaurateur-haut-savoyard
16. https://www.ledauphine.com/economie/2026/10/02/artinov-2026-six-entreprises-recompensees-pour-leurs-innovations
17. https://fr.ulule.com/lxir-micro-cocktail/
18. https://fr.ulule.com/restauration-tigre-1/
19. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Finfruitea.com%2Fboutique%2F
20. https://news.google.com/rss (tools/news.py, Le Dauphiné 2 Oct 2026, ECO Savoie Mont Blanc 10 Jul 2026)
21. https://www.lsa-conso.fr/un-potentiel-encore-largement-sous-exploite-les-complements-alimentaires-en-quete-de-rebond-en-gms,466503/ (walled)
22. https://www.linkedin.com/in/kevin-ciclet (walled)
pains: 7 judged. (1) after 31 Oct infruitea.com opens a finished Ulule page and no shop is ready behind it, CHOSEN. (2) more crowdfunding, Raka's alternative, the extra time since 11 Jul added 26 orders and 1,544 euros, most of the 70 comments are friends and family, nothing points to a second campaign, not chosen. (3) the trade channel, "Devenir revendeur" is plain text with no link and the Ulule retail pack says to email hello@infruitea.com, folded into the shop offer. (4) repeat purchase, the CGV describe a monthly subscription the shop doesn't sell, folded into the offer as refills and not stated as their plan, since the CGV may be a leftover. (5) the hidden shop's placeholders and miswired links, proof for the sketch, never named in the message. (6) social is small but active and founder led, not chosen. (7) GDPR, clean from Stockholm, never the angle
chosen: (1), hottest and biggest, the extra time ends in six days, every free channel Kevin relies on (press, radio, LinkedIn, 0 euros of ads) points at infruitea.com, and his own Ulule page promised backers a new site at 100 pre-sales
owner reply: "We're finishing our new site, it goes live when Ulule closes" | already in hand | nothing new is live six days before the close, the WordPress media library's newest upload is 30 May 2026 (https://infruitea.com/wp-json/wp/v2/media?orderby=date), no product was edited after 12 Jan 2026 (https://infruitea.com/wp-json/wp/v2/product?orderby=modified), 7 of 8 products still show the placeholder image (https://infruitea.com/boutique/), infruitea.myshopify.com is "Store unavailable", the homepage he built himself is titled "full lag, pas exploitable avec woocommerce" (https://infruitea.com/infruitea-html/) and on 6 Oct he wrote "Pas des millions de budget com', pas une armée derrière nous" (https://www.instagram.com/infruitea/), so no agency is on it and the offer takes the build off a founder doing it alone
worth: €3,000+, an Infruitea shop on infruitea.com that takes over from Ulule, the double infusion explained in seconds, the packs and refills, a monthly refill option, a page for cafés and shops that want to stock it, and the finished Ulule page's button pointed at it
still there: Président de SAS and sole dirigeant of INFRUITEA, register read 2026-10-25 13.19 UTC, and posting as founder on the company page 3 to 7 days ago | https://recherche-entreprises.api.gouv.fr/search?q=infruitea
budget: 12,546 euros raised on Ulule, whose 100 pre-sales stretch goal (reached, 246) is "Un site tout beau, tout neuf", plus an 11,000 euro AURA grant | https://fr.ulule.com/infruitea/
sweep website: crawled twice, the root and the shop rendered on desktop and phone, the domain opens Ulule and the shop behind it isn't finished, CHOSEN
sweep gdpr: tools/eu-view.py from Stockholm on https://infruitea.com/boutique/ , 8 first party cookies (sourcebuster, cookieyes), 0 third party, the Ulule page's consent is Ulule's own, checked, never the angle (RULES 0E)
sweep apps: production and packing by hand with Azêta, parcels into Mondial Relay lockers at 2 am, a feedback questionnaire by QR, 161 orders so far, an order and refill workflow is folded into the shop offer, too small for a separate tool now
sweep social: tools/social-audit.js, Instagram https://www.instagram.com/infruitea/ 390 followers, 28 posts, newest 2026-10-15, Facebook https://www.facebook.com/p/Infruitea-61551931572831/ 97 followers, TikTok https://www.tiktok.com/@infruitea 12 followers, LinkedIn https://www.linkedin.com/company/infruitea 707 followers, YouTube https://www.youtube.com/@infruitea 9 subscribers and 3 videos, founder led and active, not chosen
sweep squad: a drinks brand with production at Azêta, not a builder of software, not chosen, per the register (NAF 10.86Z) and Azêta's LinkedIn post
thread: problem your website still sends visitors to your Ulule page, whose extra time ends on 31 October | cost after that, people who find you through the press or LinkedIn probably land on a finished campaign that suggests other Ulule projects | offer an Infruitea shop that takes over from Ulule, explaining the double infusion in seconds and selling the packs and refills to everyone who finds you | link Ulule, find
lead read: Kevin reads that his website still sends visitors to the Ulule page that ends on 31 October, so people who find him through the press or LinkedIn will probably land on a finished campaign, and gets offered an Infruitea shop that takes over from Ulule and sells the packs and refills, one thread
claims:
your website still sends visitors to your Ulule page, https://infruitea.com/ and https://www.infruitea.com/ answer 301 with location https://fr.ulule.com/infruitea/ (curl 2026-10-25 13.48 UTC), and a Chromium load of https://infruitea.com ends on https://fr.ulule.com/infruitea/
its extra time ends on 31 October, https://api.ulule.com/v1/projects/infruitea "date_end_extra_time": "2026-10-31T22:59:00Z" (23.59 Paris time) and "is_in_extra_time": true, the same date in the page JSON of https://fr.ulule.com/infruitea/ , and the page shows "Prolongations !"
people who find you through the press, https://www.culture-nutrition.com/2026/07/07/infruitea/ links https://infruitea.com/
or LinkedIn, https://www.linkedin.com/company/infruitea "Website www.infruitea.com"
INFERENCE, they'll probably land on a finished campaign that suggests other Ulule projects, rests on the finished pages https://fr.ulule.com/lxir-micro-cocktail/ ("Collecte terminée le 28 mai 2023 ... VOUS L'AVEZ MANQUÉE ? DÉCOUVREZ TOUTES LES COLLECTES") and https://fr.ulule.com/restauration-tigre-1/ ("Collecte terminée le 26 juin 2024"), worded probably. A creator can point the "ça continue par ici" button at their own shop, which LXIR does, so it holds only while Kevin has no shop to point it at
the double infusion, their own term, https://infruitea.com/produit/starter-pack/ "Double infusion"
the packs and refills, their own ranges, https://infruitea.com/categorie-produit/packs/ and https://infruitea.com/categorie-produit/recharges-individuelles/ , and the packs on https://fr.ulule.com/infruitea/
websites credential, docs/astra-company-profile.md, Raka's fixed brand line, https://www.linkedin.com/in/raka-mulya-b92885196
recheck: 2026-10-25 13.48 UTC, the root and www still 301 to https://fr.ulule.com/infruitea/ , the Ulule API still has extra time to 2026-10-31T22:59:00Z with 246 pre-sales and 161 orders, the Culture Nutrition link to https://infruitea.com/ still there, the company page's website line still www.infruitea.com, control example.com 200, thread 0 items with control 6. To be rerun in the minute before sending. Disproof tried. I looked for a live shop of theirs anywhere else (the /boutique/ shop isn't linked from the domain, infruitea.myshopify.com is "Store unavailable", crt.sh shows only fr. and www. subdomains, the Instagram and LinkedIn posts name no shop). I checked what a finished Ulule page shows on two real ones instead of assuming. I read the WP REST API for any edit since the 23 Sep "nous finalisons" post (none published). I counted the placeholders in the raw HTML (7 woocommerce-placeholder images) as well as the screenshot. Facts hold, confidence MEDIUM, because he may be building the new site himself and the brand sits outside the GTM profile
```

SKETCH
```
Hi Kevin, Infruitea looks cool!

However, your website still sends visitors to your Ulule page, and its extra time ends on 31 October. After that, people who find you through the press or LinkedIn will probably land on a finished campaign that suggests other Ulule projects.

I'd suggest an Infruitea shop that takes over from Ulule, explaining the double infusion in seconds and selling the packs and refills to everyone who finds you.

At Astra agency we make websites for brands like Unilever, AXA, Pertamina.

Shall I send you a sketch of the Infruitea shop?
```
