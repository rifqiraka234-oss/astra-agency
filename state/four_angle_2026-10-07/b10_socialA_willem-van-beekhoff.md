# Willem van Beekhoff, Betuws Bier BV (Eck en Wiel), ctc_BZbrZrPynRLw8oHxY

Researcher b10_socialA, 2026-10-07, opened 06:10 to 07:40 UTC. Read only. Nothing sent, no lemlist writes, no commit.

## STOP FLAGS

- Thread: NOTHING RECORDED, NOT EVEN THE CONNECT NOTE. `get_inbox_conversation(ctc_BZbrZrPynRLw8oHxY)` 2026-10-07, totalItems 0, nextPage null, sync "recent" 05:57:59Z. sentOnly "Willem van Beekhoff" 0 hits, sentOnly "Beekhoff" 1 hit, contactName "Willem Beekhoff", lastActivityAt 2026-08-30T06:06:54Z, lastSentAt null, lastRepliedAt null. myConversations and teamConversations "Beekhoff" 0. Positive control same session, ctc_nM59cRCNqBsAgLxLT returned 4 items. The connect note isn't always written as an activity (CLAUDE.md), so this reads as Silent accepted. **Shape OPENER. No reply, nothing beyond the invite.**
- Record: `search_contacts` "Beekhoff", jobTitle **"Co-Owner"**, companyId cpn_Evy36FbAB66vkF64R = "Betuws Bier BV", domain **betuwsbier.nl**, linkedin /in/willemvanbeekhoff, created 2026-07-09. The campaign lead row (tagline, summary) wasn't located, one 100-row page of v0.1 searched without him. Tagline UNKNOWN.
- **The old blocker is resolved.** The prior queue row said no domain could be confirmed and two ventures were in play. Today:
  - betuwsbier.nl is live (200, title "Betuws Bier – Proef de Betuwe", footer "Betuws Bier B.V. | Veerweg 5 | 4024BP Eck en Wiel | KVK: 85541710"). The WordPress author on the site is **"Willem Van Beekhoff"** ("Hallo wereld! door Willem Van Beekhoff 5 februari 2022").
  - North Data (fetch-walled.py, 200), Betuws Bier B.V., KvK 85541710, Veerweg 5, "The operation of a beer brewery and the trade in beer", balance sheets filed for 2023 to 2025. Shareholders behind the paywall.
  - Heerlijkheid Eck en Wiel B.V., KvK 96392967, **same address Veerweg 5**, trade names "Bed & Breakfast De Heerlijkheid, De Betuwse Belevenis, Landgoedwinkel De Heerlijkheid, Proeverij De Heerlijkheid, Van Beekhoff Afscheid". https://www.heerlijkheideckenwiel.nl/index.php?pagina=overons, "de droom die wij, **Willem en Loes van Beekhoff**, voor ogen hadden ... Loes heeft de dagelijkse leiding".
  - So the two ventures are one family on one estate. Willem co-owns both, Loes runs the estate day to day, and Betuws Bier is the subject he holds the title for. Ownership MEDIUM-HIGH (his own title, site author, family trade name; shareholdings walled).

## 1. SOCIAL

- **Facebook /BetuwsBier (page 106158128651935, the only social link in their HTML, 19 links).** Page Plugin and Chromium both return an empty shell signed out (19 KB, no follower count), while the Kogge page loads through the same plugin in the same minute (321 followers). Alcohol pages are usually age gated by Meta, so followers and dates are UNKNOWN from Facebook itself.
  - Their own site embeds the feed (Easy Facebook Likebox) on /nieuws/, read 2026-10-07. Ten posts, newest first, relative times as rendered today: Oktoberfest Munich opening ×2 ("2 weeks 3 days ago", 2 and 12 reactions), Fruit Festival Tiel (17), Bierfestival Culemborg with Hemursbier, Vrijstad, De Heeren van Bisde (22), "Wij zijn er bij" (4), Swiekes open day at Zelem, Belgium (14), Bier & Blues Voorthuizen, "super hulp gehad van schoonzoon Gijs" (37), **"onze bieren ook beschikbaar ... voor de gasten van Landal De Wielsche Dreef. Recent geopend" (47)**, "OranjeGoud en KersenWit zijn dit weekend op Zelem Rockt te verkrijgen" (14), apple and pear harvest for Tripel and Dubbel (17).
  - So Facebook ran about 10 posts from late August to about 20 September, and **nothing in the roughly 17 days since**, while the shop now sells a "Herfst Proefpakket" and the Dubbel is pitched as "heerlijk tijdens de donkere maanden".
- **Instagram.** The /nieuws/ page says "houden wij jullie graag op de hoogte via Social Media zoals Facebook en Instagram". **No Instagram link in any of their HTML** (grep of home and nieuws for instagram.com, 0, control the same grep finds 19 Facebook links). A probe of the embed for "betuwsbier" found an account with `followers_count 0`, `posts_count 0`, `full_name null` and a default avatar (control brouwerijdesnor 2,212 in the same minute). That's an empty, private or age-gated shell. **Not tied to them, so it stays UNKNOWN.**
- TikTok, LinkedIn page: none in their HTML.
- **Google Business Profile** (Maps payload, curl): **"Betuws Bier BV", category "Biergroothandel" (beer wholesaler), "1 review"**, phone 0344 700 245, site betuwsbier.nl. The estate next door, "Heerlijkheid Eck en Wiel", categories Restaurant, Bistro, Evenementenlocatie, Festival, **"366 reviews"**. A Chromium Maps render to rank them failed today (limited view, US egress), so ranking is UNKNOWN.
- Searchability (web search, tier G, not opened at source). Three searches for "Betuws Bier" returned **Brouwerij De Betuwe in Asch** (untappd, "Betuws Toffel Bier") and never betuwsbier.nl. Another regional brewery has the near-identical name.

### Benchmark, Betuwe and nearby craft breweries (handles from each one's own homepage HTML, social-audit.js 2026-10-07)

| Brewery | Instagram | Newest IG post | Notes |
|---|---|---|---|
| **Betuws Bier** | **not linked, UNKNOWN** | | Facebook only, about 10 posts Aug to Sep, quiet 17 days |
| Brouwerij De Betuwe, Asch (brouwerijdebetuwe.nl) | 844 followers, 193 posts | 2026-09-20 | the name collision |
| Brouwerij De Snor, Velp (brouwerijdesnor.nl, poured at their festival) | 2,212, 557 posts | 2026-10-01 | |
| Hemurs Bier (hemursbier.nl, at Culemborg with them) | linked, embed unreadable | UNKNOWN | likely age gated |
| Struuk Bier, Ewijk (struukbier.nl, at their festival) | linked, embed unreadable | UNKNOWN | likely age gated |
| Brouwerij Vrijstad, Culemborg (brouwerijvrijstad.nl) | no Instagram link in HTML | | |

Every peer that links Instagram does so from its homepage. Betuws Bier is the only one whose site mentions Instagram and doesn't link it.

## 2. BRANDING

- Names: "Betuws Bier" (site), "Betuws Bier B.V." (KvK, footer), "Betuws Bier BV" (Google, as a wholesaler), "BETUWS speciaalbier, ESTd 2022, Premium Quality" (badge logo), "Betuws BierFestival" (own Facebook profile id 100090626661391, and betuwsbierfestival.nl, which didn't resolve today, the estate site still links it).
- Logo: a navy hexagon badge with a hop tree and two lions. Strong and consistent on bottles (site photo) and the age gate.
- Look of the site (screenshots opened): WordPress 6.9.10, Neve theme, WooCommerce. Desktop home is a text column with an empty right half and one bottle photo. The phone view opens on the age gate "Welkom bij Betuws Bier, Ben jij 18 jaar of ouder?". Nothing dated in the theme. Plain, not broken.
- Story: "Betuws Bier vindt zijn oorsprong in de vruchtbare klei tussen de rivieren", own hops ("zelf geteelde verse Centennial hop"), Betuwe pears in the Dubbel, Eckcellent Blond for "750 jaar Eck en Wiel", OranjeGoud for the Oranjesteden. A strong local story.

## 3. WEBSITE (B)

- Crawl pass 1 **69 URLs** (39 from sitemaps, 68×200, 1×405), pass 2 **69**, equal. Pages read, home, brouwerij, brouwproces, onze bieren (12 beers), winkel (21 products), 16 product pages, partner locaties, nieuws, nieuwsbrief, bierfestival, contact, retour/AV.
- **The homepage still reads "Op zaterdag 5 september vind je ons op het Bier & Blues Festival in Voorthuizen. Op zondag 13 september vind je ons op het Bierfestival Culemborg"** (refetched 06:32 UTC, 7 Oct). Both dates are past.
- "Hallo wereld! ... Welkom bij WordPress. Dit is je eerste bericht." (5 Feb 2022) and an empty "Zakelijke pagina" post are still public.
- Shop: 12 or 24 bottles, "levering binnen 2-3 werkdagen", free shipping from €75, pickup "alleen op zaterdag tussen 10.00 en 17.00". The shop itself says "het liefste zien we dat je ons bier beleeft bij een van onze Partners".
- **Partner locator (WP Store Locator, ajax store_search and REST, both 51 entries).** 49 outside partners in the Betuwe, Gall & Gall ×7, Jumbo ×2, SPAR, Van der Valk Tiel, Landal De Wielsche Dreef, campsites, farm shops. Entries dated 2022-03-27 to 2025-05-06, then two on **2026-08-30**. Their own goal in their own words, on /onze-bieren/, "een herkenbaar kwaliteitsproduct dat bij de beste horecazaken, (boerderij)winkels en recreatieterreinen in de Betuwe verkrijgbaar is".
- Growth: Landal (new park, Aug 2026), Belgian festival sales (Zelem Rockt), Oranjesteden links (Diest, Dillenburg, Vianden), festival lustrum 26 June 2027, estate plan for a "Belevings- en Zorglandgoed" (landscape plan, 23 Nov 2023, ruimtelijkeplannen.nl). News headline (tier G, not opened, Google News redirect is JS) "Betuws Bier vindt afzet in Duitse Oranjestad Dillenburg", SRC FM 2026-08-24.
- Dutch only (66 nl-NL pages, 3 blank).

## 4. GDPR (EU view)

eu-view.py from Stockholm, nothing clicked, **7 first party cookies (sbjs_* WooCommerce order attribution) and requests to connect.facebook.net, www.facebook.com, static.xx.fbcdn.net, assets.mailerlite.com, fonts.googleapis.com, fonts.gstatic.com**. site-audit.js, **no consent banner and no privacy link, both absences confirmed against its synthetic control**, no consent code at all, so the US egress doesn't void it. The newsletter form says "Voor meer informatie over onze privacy policy, zie onze website", and no privacy page exists in 69 URLs (grep privacy/persoonsgegevens finds only that line and the account page, control, "AVG" found on the same page). Real. A fix is a policy page and a consent tool, small.

## 5. COMPANY AI APP (A)

B2B is "Interesse om ook Betuws Bier aan te bieden aan je gasten binnen de Horeca of Retail? Bel gerust of laat hierna jouw bericht achter" (contact form, 5 fields). Kegs ("20 liter fust") are mentioned per beer, with no trade price list, keg ordering or partner reorder page in 69 URLs. So 49 partners reorder by phone or email, inferred from absence. Volume UNKNOWN. A partner ordering app fits, proof is thin.

## 6. PERSONAL AI (C)

From their own pages, Willem co-owns the brewery and the estate (weddings, B&B, funeral care, a planned care estate), organises the Betuws BierFestival, and stands at festivals most weekends (Voorthuizen 5 Sep, Culemborg 13 Sep, Tiel, Munich about 20 Sep, Zelem). A son-in-law helped at one. A real "runs two businesses" owner. But no single job he names as eating his week. LinkedIn /in/willemvanbeekhoff, curl 999. Web search for his name plus linkedin returned other Willems. Plausible, unproven.

## 7. NEWS
news.py nl, control Heineken 100. Company 8, including "Betuws Bier vindt afzet in Duitse Oranjestad Dillenburg" (SRC FM 2026-08-24), "Bierfestival in Culemborg vol Betuwse brouwers" (Het Kontakt 2026-09-06), "Zinder Tiel ... proosten met een Burens biertje in Dillenburg" (AD 2026-09-14). Person 2, "Voor de tweede keer Bierfestival op Heerlijkheid Eck en Wiel" (SRC FM 2024-06-23), "Betuwse Belevenis op landgoed stap dichterbij maar de buurt vreest voor 'on-Betuwse' drukte" (Gelderlander 2024-06-10). Industry 100, including "wat moet je als kleine brouwer nu met de opkomst van 0.0?" (Gelderlander 2026-09-06). None opened at source (Google News links resolve by JS, srcfm.nl unreachable). Titles only, tier G.

## 8. PAINS TABLE

| # | Pain (angle) | Proof | Cost to him | Pay test | Would he name it? | Incumbent? |
|---|---|---|---|---|---|---|
| 1 | **People who taste it can't find the brand properly**: homepage still sells September's festivals, Google calls it a beer wholesaler with 1 review (the estate has 366), Instagram promised but not linked, name collides with Brouwerij De Betuwe (D+B) | homepage refetch, Maps payload, HTML grep with control, 3 searches | Each new partner (Landal, Gall & Gall) puts the beer in front of new drinkers, and the ones who look it up land on a stale, thin brand. Unsizable | Site plus Google plus social setup passes €500 | Likely, they post "Proef de Betuwe" pride and want recognition (their goal "herkenbaar kwaliteitsproduct") | None visible, default WordPress footer |
| 2 | Facebook quiet 17 days going into bock and autumn season (D) | site-embedded feed | Small so far | Fails alone | Maybe | n/a |
| 3 | No privacy policy, Facebook loaded before consent (GDPR) | eu-view, site-audit control | Abmahnung risk, small shop | Small fix | Unlikely | n/a |
| 4 | Partner reorders by phone or email (A) | absence across 69 URLs | Unknown volume | Unproven | Unknown | n/a |
| 5 | Willem runs two businesses plus a festival (C) | own pages | Hours, unsizable | Plausible | Unknown | n/a |

**Biggest.** 1. It's the one that sits on their own stated goal (a recognisable product at Betuwe venues), it's live and dated today, and nobody already owns it. The rest are either small fixes or unproven.

## VERDICT

**OPENER, angle D plus B, the brand people can find after they taste it.** Confidence **MEDIUM**. Facts are at source except the Google category, which rests on one raw Maps payload (rung 3) because the render was blocked. The cost can't be sized. Flag for Raka, this lead was BLOCKED in the queue before today. The block is lifted by betuwsbier.nl, the KvK record and the estate's "Willem en Loes van Beekhoff" page. Draft in drafts.md.

## Sources opened (20, 12 domains)
1. lemlist get_inbox_conversation, get_inbox_conversations (sentOnly, myConversations, teamConversations), search_contacts, search_companies
2. https://betuwsbier.nl/ crawl ×2 (69 each), /nieuws/, /winkel/, /onze-bieren/, /zakelijke-pagina/, /betuws-bierfestival/, /contact-met-kaart/, /2022/02/05/hallo-wereld/, /nieuwsbrief/
3. https://betuwsbier.nl/wp-admin/admin-ajax.php?action=store_search and /wp-json/wp/v2/wpsl_stores
4. site-audit.js (screenshots b10_willem-desktop.png, b10_willem-phone.png opened)
5. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fbetuwsbier.nl (eu-view.py)
6. https://www.northdata.com/Betuws%20Bier%20B.V.,%20Eck%20en%20Wiel/KVK%2085541710
7. https://www.northdata.com/Heerlijkheid%20Eck%20en%20Wiel%20B.V.,%20Eck%20en%20Wiel/KVK%2096392967
8. https://www.heerlijkheideckenwiel.nl/ and ?pagina=overons, indepers, bierfestival
9. https://www.ruimtelijkeplannen.nl/documents/NL.IMRO.0214.ECKVeerweg5-BON1/b_NL.IMRO.0214.ECKVeerweg5-BON1_tb1.pdf
10. https://www.facebook.com/plugins/page.php (BetuwsBier, empty, control Kogge 321)
11. https://www.instagram.com/betuwsbier/embed/ (empty shell), control brouwerijdesnor
12. https://www.google.com/search?tbm=map payloads, Betuws Bier and Heerlijkheid
13. https://www.brouwerijdebetuwe.nl/, https://brouwerijdesnor.nl/, https://hemursbier.nl/, https://struukbier.nl/, https://brouwerijvrijstad.nl/ and the Instagram embeds via social-audit.js
14. https://untappd.com/search?q=Betuws+Bier (JS, results not readable)
15. Google News RSS via tools/news.py
16. https://www.linkedin.com/in/willemvanbeekhoff (not reached, search found other Willems)
