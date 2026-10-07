# Red team, four drafts, 2026-10-07 (about 06:45 to 08:00 UTC)

Read only on lemlist. Nothing sent, nothing committed. Every thread re-pulled at 06:45 UTC (sync "recent" 06:45:25Z), paged to the end, with control ctc_D5F2nC69pjMjAuvk2 returning its 3 known items in the same minute.

| Lead | Thread now | Verdict |
|---|---|---|
| Nicolas Bergé, ctc_mQBx2Mr64rqs7v4Qu | 0 items. sentOnly shows only the 2026-10-03 connect note, no reply. OPENER shape holds | **FIX** (done) |
| Adad-Nirari Khochaba, ctc_4a2LnTP8kLSHufaRh | 0 items. sentOnly shows only the 2026-10-06 14:07 connect note, no reply, myConversations 0 | **FIX** (done), plus Raka's call on nexgeon |
| Katie Vlaardingerbroek, ctc_k5wbLRKyPJYio6aj8 | 2 items, connect note 2 Sep and opener 21 Sep, no reply | **FIX** (done) |
| Emily Levy, ctc_rMYGbmu7Piu5Pmwei | 2 items, connect note 27 Jul and opener 6 Oct 12:00 UTC, no reply | **SHIP** (not before Fri 9 Oct 12:00 UTC) |

All three edited files pass `python3 tools/check-drafts.py` with exit 0. Backups of the originals are in /tmp/claude-0/agents/rt/*.bak.

---

## 1. Nicolas Bergé, Promocash Narbonne. FIX

| Claim | What I opened | Result | Why |
|---|---|---|---|
| "hasn't posted since the summer" | curl of the raw HTML for linkedin.com/company/promocashnarbonne. I read the JSON-LD datePublished, which is a different method from the earlier Chromium "2mo" read | HOLDS, but vague | The newest post is from 2026-07-23 (wedding trends), with others on 07-17 and 07-16. Nothing is newer. Control, promocashfrance through the same method shows posts on 2026-10-06 and 09-30, so this view does show recent posts. "Since July" can be checked, so I used that |
| "most of what it shared before was national Promocash news" | the same JSON-LD, all 9 of the store's own posts (19 Mar to 23 Jul) plus a repost | WEAK | 5 of the 9 are network items (the MCF partnership, MCF day, MCF forum, UMIH, the May bank holidays). 3 are general sector trend pieces (brunch, weddings, seasonal produce), which aren't "Promocash news". "Most" only just holds and the label is wrong. What is clean is that only 1 of the 9 names Narbonne (the 16 Jul seasonal hiring post), plus a rugby club repost |
| Local growers goal | L'Indépendant 2025-11-05, curled again, "développer les partenariats avec les filières locales, notamment celles des fruits et légumes" | HOLDS as a quote, WEAK as a current goal | The quote is 11 months old and no newer source repeats it. None of the 9 posts mentions local growers. It's still usable as his stated aim on taking over, but treat it as inference |
| Facebook or Instagram for Narbonne | extended search for "Promocash Narbonne" facebook OR instagram | none found | It returns pages for Lorient, Istres, Montauban, Aubagne, Aix, Grenoble, Nevers and Carcassonne, but not Narbonne. The message makes no Facebook claim, so nothing breaks. Raka's logged in check is still advised |
| Is LinkedIn where restaurateurs are | judgement | WEAK | Small town restaurateurs mostly use Facebook and Instagram, and Carcassonne's Facebook has 1,249 followers. So the offer shouldn't be "the page", which reads like his LinkedIn page or a web page. The offer now names a local social feed |
| "have no way of seeing it" | n/a | overstated | They walk into the store. Changed to "won't see it from you" |
| Credential, Eten Maar, ran its content | docs/astra-master-context.md 2A | HOLDS | A food business, owner to owner. B2C against his B2B is a stretch, but an acceptable one |

**Corrected text, as it now stands in b10_socialB/drafts.md (gate claims, thread and lead read updated to match):**

```
However, your store's LinkedIn page hasn't posted since July, and almost nothing it shared before was about Narbonne. This causes the restaurateurs around Narbonne to hear nothing about your own store and your team.

Especially, when you are looking to work with local fruit and vegetable growers, the restaurants that care about local produce won't see it from you.

Shall I send you over what the local social feed that brings in restaurateurs looks like?
```

Most likely pushback: "LinkedIn isn't where my customers are, they come into the store." The pay test is still the weak point (MEDIUM). It's a franchisee whose only owned channel is one LinkedIn page.

## 2. Adad-Nirari Khochaba, Nature Nation. FIX, and Raka rules on the incumbent

| Claim | What I opened | Result | Why |
|---|---|---|---|
| "your TikTok videos reach almost nobody" | curl of https://www.tiktok.com/embed/@nature_nationde, which reads per video playCount. The Chromium grid shows a "something went wrong" wall | **FALSE as written** | The last ten videos got 873, 945, 836, 273, 292, 945, 838, 818, 835 and 824 plays, so about 850 each. That's small, not "nobody". There are 29 followers and 122 videos. **New fact**, the newest video is from 2026-08-13 (id decoded, newest first, no pinned videos). Control, @naturtreu through the same embed shows 2026-10-03. Every caption is only "#fy #naturenation #viral #targetaudienceforyou" |
| "Instagram hasn't posted since early September" | Instagram /embed/ curl with an iPhone user agent. A desktop user agent gave a variant with no posts, which isn't evidence | HOLDS | Newest post Dc1y1FtscHF is from 2026-09-03 21:40 UTC, then 09-01, 08-31, 08-24, 08-13 and 08-12. 414 followers |
| "other German brands sell tallow cream through TikTok" | oildem.de curl, plus the TikTok profile JSON and embed for @oildem | WEAK, the plural isn't proven | Only one brand was opened. Oildem sells "Beef Tallow Creme - Mit Bienenwachs", has ttSeller true and 32,600 followers, and its seven tallow videos got 11,500 to 43,500 plays each. Rewritten to "another German brand is winning buyers for on TikTok" |
| nexgeon as the incumbent | nexgeon.com/de/impressum, Nature Nation's legal notice, North Data for Evergoods, nexgeon and Khochaba, searches for "Khochaba nexgeon", "Sardarian" with Evergoods, and Evergoods job ads | UNRESOLVED | Both sit at Ostring 11, Wiesbaden. Nexgeon's sole Geschäftsführer is Armen Georgi Sardarian (HRB 25710). Evergoods' is Khochaba (HRB 35167, registered 26 Jul 2024, trademark "Nature Nation" 30 Oct 2024). North Data shows no shared person. Evergoods' one shareholder is behind a paywall. **New, Evergoods' own registered purpose includes "e-commerce and online marketing services"**, so it claims marketing skill itself. No job ad was found, and nexgeon's pages never mention Nature Nation. It looks like a sister setup, but who runs the social is unknown. Since TikTok and Instagram both stopped in Aug and Sep, whoever runs them isn't running them now |
| Pandan Social credential | 2A, "Project Manager, Pandan Social (Mar to Nov 2022), Influencer campaigns end to end" | HOLDS | "I ran influencer campaigns end to end at Pandan Social" is a fair restatement. They are posting creator calls themselves (24 Aug), so the fit is good |

**Corrected text, as it now stands in b10_socialA/drafts.md:**

```
However, your TikTok hasn't posted since mid August, and your Instagram hasn't posted since early September. This causes the people who'd love your Tallow cream to never come across it.

Especially, when you are selling a tallow cream that another German brand is winning buyers for on TikTok, the quiet feeds hand those buyers to them.
```

Most likely pushback: "our partner next door handles that." My lean is to send, because both feeds have gone quiet whoever runs them. But it's Tomatoworld lesson 2 territory, so Raka decides.

## 3. Katie Vlaardingerbroek, Theaterstudio KRIP. FIX

I downloaded the policy plan PDF again (549,648 bytes, 16 pages) and read it in full text. I also curled the agenda and the homepage.

| Claim | Source | Result | Why |
|---|---|---|---|
| "website up and running now" | theaterstudiokrip.nl curl 200, title "Home \| Theaterstudio Krip" | HOLDS | |
| "KRIP runs on care budgets, funds and subsidies at once" | plan 10.2 | WEAK, verb upgraded | The plan says "meervoudig financieringsmodel" and that income "kan bestaan uit" (can consist of) Wmo, Wlz, PGB, fondsen and subsidies. Het Podium Op! (41,910 euros) does mix care money, Domusica co-financing and fund applications. Changed to "KRIP's plan mixes", per RULES 1B |
| "every fund gets its own project file" | plan 10.5, "Per project of fonds wordt een apart projectdossier bijgehouden" | HOLDS | |
| "the money side sits with you" | plan 7.3 and 7.2 | **OVERSTATED** | Her role lists "financiële borging" among planning, partnerships and audience reach. But the board keeps the administration (10.5), and the penningmeester Marloes Selles-Homminga signs the accounts. Changed to "puts the financial side in your role" |
| "first production coming next June" | /agenda, "Eerste voorstelling... Juni 2027" | HOLDS | Het Podium Op! runs Sep 2026 to Jul 2027, and the plan names Frion Festival 2027 as a possible premiere |
| Foundation budget | plan, "De totale begroting voor het jaar 2026 - 2027 ... bedraagt 71.500 euro" | FLAG | This is Tomatoworld lesson 1. Fund applications are where its money comes from, so a tool that helps win them can pay for itself, and the 500 euro floor fits. Ask about budget on the first call. Katie isn't on the board, so lesson 3 applies too |

**Corrected middle paragraph, as it now stands in b11_F/drafts.md:**

```
KRIP's plan mixes care budgets, funds and subsidies, keeps a separate project file for every fund, and puts the financial side in your role. With the first production coming next June, that paperwork only grows.
```

Most likely pushback: "we're a volunteer foundation with no budget for this."

## 4. Emily Levy, Alquimia Legal. SHIP

| Claim | What I opened | Result | Why |
|---|---|---|---|
| "lead Alquimia's international side from France" | homepage raw HTML, "lidera la proyección internacional de la firma desde Francia", and /en "leads the firm's international presence from France" | HOLDS | |
| "offer your services in French too" | the same bio, "Ofrece soluciones legales estratégicas en español, inglés y francés" | HOLDS | Our 6 Oct opener already said the same |
| "site only comes in Spanish and English" | Wix siteLanguages in the HTML lists only es-mx and en-us, both "Active". /fr returns 404. No hreflang for fr | HOLDS | |
| "homepage never once says Mexico" | raw HTML grep and a full page Chromium render. innerText has 0 matches for m[eé]xic, and I looked at the screenshot | HOLDS | The raw HTML has "México" and "Mexico" only in Wix metadata (a country list, the America/Mexico_City timezone). Control, the same grep finds "Francia" and "francés" in the bio. Soft spots, not false ones: the domain is .mx, the language switcher and phone field show a Mexican flag, and the service list names INDAUTOR and SACM, both Mexican bodies. She could answer "it's obvious we're Mexican". A French company wouldn't know INDAUTOR, so the sentence stands |
| "my note on Tuesday" | `date -d 2026-10-06` returns Tuesday | HOLDS | Only true if it goes out this week. The earliest send is Fri 9 Oct 12:00 UTC. If it slips past Sunday, change it to "last Tuesday" |

Most likely pushback: "we're on a .mx domain, of course we're Mexican."
