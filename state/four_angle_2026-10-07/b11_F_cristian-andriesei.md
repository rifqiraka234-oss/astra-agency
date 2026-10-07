# Cristian Andriesei, Eldy, ctc_t8TKRJXP6cemMLBBg, lea_oDvkgWjL8APE3KFgy. Four angle re-judge 2026-10-07

**Verdict: NO_STRONG_ANGLE. No nudge.** In plain words, Eldy matches live in companions to Swiss seniors. Its site is strong and current, it already runs AI matching and its own sales pipeline, and the owner is a 15 year product chief. The one real gap, a social presence that's gone quiet, isn't where its buyers look and isn't its costliest problem.

## Thread (get_inbox_conversation, 2026-10-07 ~06:12 UTC)
- totalItems 2, nextPage null, read in full.
- 2026-07-23 09:09 OUT, connect note "Hi Cristian, saw your business and thought it was cool ...".
- 2026-08-26 15:18 OUT, French opener on hidden reviews (160+ families, 82 avis not visible) and "tarif sur demande", offered a sketched page.
- No reply. No "last message" promise. No second follow up. Shape if anything were sent: NUDGE.
- sentOnly search "Andriesei" returns only this contact, lastRepliedAt null.

## Record and ownership
- lemlist: jobTitle "Co-Founder & CEO", tagline "CEO at Eldy", companyDomain eldy.ch, Morges VD. Experience1 "Co-Founder & CEO @Eldy". Summary, 15 years, 5 startups, ex CPO RingMD, ex co-founder Pillar Care. Owner screen passes.
- Statutory not refetched this pass. Prior file state/ai_default_2026-10-06/personal1.md names Eldy SA Morges. CHF 400k seed led by WeBuild Ventures per search results (startupticker article read 2026-10-06 by personal1, not reopened today).

## Prior research (candidate claims, re-tested)
- 26 Aug claims (no visible reviews, opaque price) were fixed by 3 Oct, per nsa01 and personal1. Not repeated.
- nsa01 and personal1 (2026-10-06): A fails (own pipeline endpoint, AI matching), C fails (he builds his own tools). Re-tested below.

## Website (B)
- tools/crawl.py https://www.eldy.ch/ pass 1 150 pages (cap, 9,221 links queued), pass 2 150 pages, French. Service pages x 10, canton pages for Genève, Vaud, Fribourg, Neuchâtel, Jura, Valais, Bern per service, guides such as "Aide à domicile à Genève : guide complet 2026".
- site-audit.js, title "Eldy — Accompagnement à domicile pour personnes âgées en Suisse Romande", 0 page errors, no RENDER NOT TRUSTED. Desktop screenshot opened: modern serif design, photo hero, a "Bienvenue chez Eldy" router modal (find help for a relative, see solutions and prices, job at Eldy via eldy-jobs.ch), phone CTA top right, cookie bar with Refuser and Accepter.
- Growth signals: seven cantons covered, a jobs funnel at eldy-jobs.ch, a regional partner programme. The site already serves the expansion. B fails.

## Apps for the company (A)
- Homepage HTML loads Mixpanel, GTM, Google Ads and the Meta pixel (site-audit tracker list, US egress, GEO VOID for EU). The modal routes by need. Prior pass found `fetch('/sales-pipeline/api/track-phone-call/')`, a self built pipeline. Eldy's own funding coverage says its matching uses AI. They already run the A angle. Fails.

## Personal AI workflow for the owner (C)
- No sign of a second business or a day job, experience1 is Eldy. He's a career product builder who writes his own tools. Fails the "already does it" test.

## Social and branding (D)
- Accounts in their own HTML: only https://www.linkedin.com/company/106624001/ (homepage grep and the rendered anchor list). No Instagram, Facebook or TikTok linked.
- tools/social-audit.js on that LinkedIn URL returned the login wall (UNKNOWN). WebFetch of https://www.linkedin.com/company/eldych returned 547 followers, 4 employees, latest post about 8 months old, "Eldy recrute des partenaires régionaux en Suisse".
- Search for an Eldy Facebook or Instagram (extended search, 2026-10-07) found none, only eldy.ch pages and eldy-jobs.ch.
- Benchmark attempt: guessed competitor domains were refused by the rules and mostly failed (000) through the proxy. Home Instead's French page through fetch-walled came back as a one line shell, unreadable. qualis-vita.ch (a Bern/Basel private Spitex) homepage carries no social account links. Benchmark is INCOMPLETE, written down as such.
- Judgement: the buyer is an adult child searching for care for a parent. Eldy's demand engine is search (canton landing pages, 2026 guides) and paid ads. A quiet LinkedIn page is true but it isn't the channel that sells live in care, and the owner was a VP of Growth who'd fix it himself. Fails the pay test as the lead problem.

## News
- tools/news.py fr, company "Eldy" 6 results all unrelated (other Eldys), person 0 relevant, control Carrefour 98.

## Four angle table
| Angle | Proof | Cost to them | Would he name it | Incumbent | Verdict |
|---|---|---|---|---|---|
| B website | 150+150 pages, screenshot, seven canton pages, 2026 guides | none visible | no | in house product team | fails |
| C personal AI | no second role found, builds own tools | none proven | no | himself | fails |
| A company AI app | own pipeline endpoint, AI matching | none, already built | no | himself | fails |
| D social | LinkedIn 547, last post ~8 months, no consumer account linked | small, buyers come via search and ads | maybe, but a tweak | himself (VP Growth background) | weak, not chosen |

Confidence in the verdict HIGH. Sources: eldy.ch home and 150 pages, site-audit run, LinkedIn company page via WebFetch, social-audit.js, lemlist thread and record, news.py, extended web search, qualis-vita.ch, state/ai_default_2026-10-06/nsa01.md and personal1.md.
