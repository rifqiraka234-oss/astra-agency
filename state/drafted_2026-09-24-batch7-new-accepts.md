<!-- NO DRAFTS. Three verdicts, nothing cleared the research gate for sending. 2026-09-24. -->

# Batch 7, the three accepts since 332. 2026-09-24. Verdicts only.

**Where the leads came from.** `get_campaigns_stats` `linkedinInvitationAccepted` 335, up from
332. `linkedinInviteAccepted` activities since 2026-09-23T20:56Z list exactly three, Andrew
Johnson (14:20Z), David Risser (13:35Z), Karin Andersson (11:14Z). 332 plus 3 is 335.

**Check A, never messaged before, four ways, all three clean.** Threads empty (Wessel's thread as
the full control, it also now shows his 23 Sep connect note, so connect notes can land late).
`sentOnly` name search, one contact each, connect note only. Name search on the main inbox, no
hits. `search_campaign_leads` by id, v0.1 only. grep of state and logs for name, company,
contactId, leadId and LinkedIn slug, zero hits each, control Wessel's contactId found.

## In plain words

| Who | What's going on | Verdict |
|---|---|---|
| **Karin Andersson**, The Real Olive Company (co owner) | A 1998 Bristol olive brand, 36 people on LinkedIn, crowdfunded twice, in Waitrose, Ocado, Booths and Abel & Cole. Its biggest, hottest pain is a funded rival, OLLY'S, which put chilled olive pots, Garlic & Basil among them, into 696 Tesco and Sainsbury's stores in April. That fight is won with retail buyers and on the shelf, not with anything we'd build. What we could build for is small, a broken stockist finder and a trade site still advertising a March sale. | **NO_STRONG_ANGLE**, confidence LOW, not shown |
| Andrew Johnson, Diggecard | Group CEO of a Norwegian gift card platform with a five person board, Deloitte audited, clients like River Island, TK Maxx and IKEA, migrating its own customer portal. Not the owner, and a software company with its own platform. | NO_STRONG_ANGLE |
| David Risser, Ethics & Boards | Directeur Général of a Paris governance data firm, the Président is Floriane de Lanversin. Quoted in Les Echos and L'Agefi every few weeks, a modern site, a data platform with demos. Not the owner, and no visible costly pain we'd fix. | NO_STRONG_ANGLE |

---

## Karin Andersson, The Real Olive Company. NO_STRONG_ANGLE.

**Ownership, statutory.** Companies House 04417361, incorporated 16 Apr 2002. Anna Karin
Andersson, director since 16 Apr 2002, PSC with 25 to 50% of shares. Benjamin Roger Flight, the
same. Andre Marcus Cox, director since 2011. Shares allotted 22 Mar 2022. Charges registered 24
and 31 Mar 2025, older ones satisfied May and Nov 2025. Total exemption full accounts to 31 Dec
2024 filed 1 Sep 2025 (figures not read, the money rule).

**Site pass 1.** `tools/crawl.py`, therealolivecompany.co.uk **353 pages** (101 products, 47
product categories, blog, recipes, subscriptions, wholesale), and the trade site
trade.therealolivecompany.co.uk **237 pages** (86 products). 590 in all. Pass 2 not run, the
verdict didn't need a draft.

**What the sites say, as a whole.**
- WooCommerce shop with subscriptions (about £20 a month boxes), gifts, 1kg tubs, meze kits.
  Most olive pots on 20% sale today.
- Where to buy names Waitrose, Ocado, Abel & Cole and Osolocal2u, then **shows the raw text
  `[wpsl]` where the stockist finder should be**. Screenshot `rolstock-desktop.png`.
- The trade site's homepage still runs **"SPRING SALE 25% OFF ... 23RD – 31ST MARCH"**.
- Hospitality "Meze" kit for bars, pubs, hotels, festivals and stadia, leads by form.
- New 2026 launch, organic unfiltered Koroneiki EVOO from Lakonia, 2 stars Great Taste 2026,
  carries an authorised polyphenol health claim, seeded by a "win a year's supply" competition.
- Blog's newest post July 2025. Three internal 404s. "Site by BigFig", whose own site shows
  "Site is undergoing maintenance".

**Sources, 13.**
1. https://therealolivecompany.co.uk/ (353 pages)
2. https://trade.therealolivecompany.co.uk/ (237 pages)
3. https://find-and-update.company-information.service.gov.uk/company/04417361/officers
4. https://find-and-update.company-information.service.gov.uk/company/04417361/persons-with-significant-control
5. https://find-and-update.company-information.service.gov.uk/company/04417361/filing-history
6. https://www.linkedin.com/company/the-real-olive-company (36 employees, oil launch posts 1 to 2 months old)
7. https://www.thegrocer.co.uk/news/the-real-olive-company-seeks-wider-retail-listings-for-npd-as-it-beats-200k-crowdfunding-goal/662143.article (walled, 405, content via search snippet, "double their existing footprint within retail in the year ahead")
8. https://www.crowdcube.com/companies/the-real-olive-company-limited/pitches/Z5kvoq (walled, 403, snippet £276,271 from 437 investors, Nov 2021)
9. https://retailtimes.co.uk/ollys-launches-chilled-olive-pots-in-tesco-sainsburys/ (walled, content via search, Tesco 236 stores from 13 Apr, Sainsbury's 460 from 16 Apr, Garlic & Basil)
10. https://www.forbes.com/sites/lelalondon/2026/07/03/olly-hiscocks-is-trying-to-turn-olives-into-the-new-potato-chips/ (search result, not opened)
11. https://www.waitrose.com/ecom/products/real-olive-co-wild-garlic-basil-olives/430348-420125-420126 (search result, the site 503s to us)
12. https://greekcitytimes.com/2026/09/21/greek-olive-oil-prices-2026-harvest (Greek price index down 43.9% Jul 2024 to Aug 2026, search summary)
13. https://www.foodmanufacture.co.uk/Article/2026/05/11/what-food-businesses-need-to-know-about-the-ukeu-sps-agreement/ (SPS deal from mid 2027)
Plus Google News via `tools/news.py`, company 29, person 8, both mostly other people and firms.

**LinkedIn, six routes.** Profile 301 to login on curl. Search title "Karin Andersson - The Real
Olive Company". Post search snippets, her posts on the Great Taste 2026 awards and a new product
on Abel & Cole. Crunchbase person "Founder @ The Real Olive". Company page read. Instagram not
tried, @RealOlive named on the site. Contact and owner are the same person, confirmed by PSC.

| Pain | Level | Cost to her | Proven | Can we build for it | Verdict |
|---|---|---|---|---|---|
| A funded rival in her own fixture, OLLY'S in 696 Tesco and Sainsbury's stores since April, Garlic & Basil against her hero Wild Garlic & Basil | Industry, company | Shelf space and rate of sale, against a 2024 goal to double retail footprint | Yes | **No**, won with buyers and on shelf | **Costliest and hottest, not ours** |
| Margin, most pots on 20% sale, new borrowing in 2025, about 790 crowd investors expecting growth | Company | Margin | Partly, the sale and the charges are facts, the pressure is inference | No | Not ours |
| Selling a premium EVOO as olive oil prices fall | Industry | Price pressure on the new line | Industry fact | Weakly | Park |
| Trade site advertising a March sale in September | Company | Trade buyers see a stale shop | Yes | A tweak | Symptom |
| Stockist finder shows `[wpsl]` | Company | Shoppers can't find a shop near them | Yes | A tweak | Symptom |

**Why no draft.** The pains that cost her most are fought in retail buyer meetings and on the
shelf. The two things we'd fix are afternoon tasks, and RULES 4A rule 9 says a tiny flaw is only
a symptom. Confidence LOW, so per RULES 4B item 7 it isn't shown as a draft. If she ever replies,
the stockist finder and the stale trade banner are real favours to mention.

## Andrew Johnson, Diggecard. NO_STRONG_ANGLE.

Brønnøysund 914046688 Diggecard AS, daglig leder Andrew Charles Johnson, board chair Susanne
Brønnum-Hyttel with four members, auditor Deloitte. Companies House Diggecard UK Ltd 11448044,
Johnson director since 25 Jul 2018, no individual PSC. The site walls curl and Chromium (403,
site-audit BLOCKED_BY_THEIR_WALL with a working control), WebFetch reads it. Clients named on the
homepage, River Island, The Body Shop, TK Maxx, IKEA, Sainsbury's, Tesco, Costa. News page,
24 Sep 2026 Buy Women Built partnership, 16 Jun 2026 ISO/IEC 27001, 10 Jun 2026 retiring
Diggecard Direct for a new Customer Portal, 21 Jan 2026 board appointments, 23 Oct 2025 group
unified and leadership transition. A software company that builds its own platform, run for a
board. Not our buyer.

## David Risser, Ethics & Boards. NO_STRONG_ANGLE.

recherche-entreprises.api.gouv.fr, SIREN 523584555 ETHICS AND BOARDS SAS, created 21 May 2010,
52 bd Malesherbes Paris, Président Floriane de Troullioud de Lanversin, Directeur Général David
Jan Risser, employee bracket 01 (2023). Site crawled, 600 pages before the cap, 274 press, 145
weekly governance ratios (newest 21 Sep 2026), FR and EN. Screenshots of home, services and
sign in, a clean modern site with a data platform and "Book a demo". A phone layout worry was
checked and dropped, viewport meta and a 1000px media query are present. Google News, 22 company
results, Les Echos 26 Aug 2026, RSE Magazine 24 Sep 2026, L'Agefi quoting David 23 Sep 2026.
Not the owner, strong visible presence, nothing costly we'd build for.
