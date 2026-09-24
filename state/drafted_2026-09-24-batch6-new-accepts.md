# Batch 6, four new accepts plus Lasse Wessel re run on the business side. 2026-09-24. NOT SENT. Re judged on cost the same day, see the section at the end.

**Where the leads came from.** `get_campaigns_stats` `linkedinInvitationAccepted` went from 328 to
332, and the `linkedinInviteAccepted` activities since that audit list exactly four people,
Matthias Ufer, Luis Raab, Wessel van Noort, Ollie Bartlett. 328 plus 4 is 332, so the arithmetic
closes. Lasse Wessel was re run because batch 3 judged him on the website only.

**Threads.** All five pulled one by one, all empty. Re pulled for the two drafts just before
writing this file, Wessel van Noort and Lasse Wessel both still `totalItems 0` (Lasse's first
pull errored "Invalid content from server", and the retry returned it). **Positive control**,
Ferry de Haas through the same call returned both his messages, the July connect note and the
24 Sep opener, no reply yet.

## In plain words

| Who | The angle in everyday words | Verdict |
|---|---|---|
| **Lasse Wessel**, Wessel Licht für Möbel | German furniture makers are cutting back, so he's selling abroad (he's at a trade fair in Italy next month). But his site is German only and the English catalogue is from 2023 and misses his whole new range. Foreign buyers can't read what he's selling. | **DRAFTED** |
| **Wessel van Noort**, SBZ | His company grows only as fast as he can hire fitters, and fitters are among the hardest people to find in the Netherlands right now. His two job ads are plain text with no photos, hidden in a side menu on the About page. | **DRAFTED, weaker** |
| Matthias Ufer, Schumacher Verfahrenstechnik | Modern site, and an active agency already builds for them. | NO_STRONG_ANGLE |
| Luis Raab, significa | A marketing agency. A competitor. | NO_STRONG_ANGLE |
| Ollie Bartlett, Collier Pickard | A CRM consultancy that sells process and tech fixes. Competitor adjacent. | NO_STRONG_ANGLE |

---

## Lasse Wessel, Wessel Licht für Möbel GmbH. DRAFTED.

**Record.** `jobTitle` Geschäftsführer, `languages` "Englisch, Italienisch, Französisch", Herford.
**Impressum, fetched 24 Sep**, "Vertreten durch die Geschäftsführer, Lasse Wessel, Maximilian
Sander", HRB 5978 AG Bad Oeynhausen. Homepage, "inhabergeführtes Familienunternehmen in zweiter
Generation".

### The four levels

| Level | Pain | Size | Current | Proof | Can we build for it |
|---|---|---|---|---|---|
| Industry | German furniture makers, his customers, are shrinking. H1 2026 revenue down 2.7% to €7.7bn, domestic down 4.1%, foreign roughly flat at €2.7bn and export share up to 35.2%, 40% plan short time work in Q3, about 3% down expected for 2026. Kitchen furniture is the one segment up, 1% to €2.9bn | Big, it's his whole customer base | 1 Sep 2026 | VDM via moebelfertigung.com, opened | Indirectly |
| Company | Selling beyond Germany. SICAM Pordenone, Italy, 20 to 23 Oct 2026, Halle 1 Stand A36, on his own homepage. An English catalogue exists, so there are foreign buyers. His new range is for kitchen and bath, the one growing segment | Big | Fair is next month | Homepage and Neuheiten page, opened | **Yes** |
| Company | Site is German only. `lang="de"`, no hreflang, no switcher, `/en` 404. 11 WordPress pages, all German | Medium on its own | Live | See controls below | Yes |
| Industry | EU Ecodesign with a Digital Product Passport, named by VDM | Real, far off | Not dated for his products | VDM names it, nothing specific to lighting parts opened | Not now |
| Him | Nothing found beyond the company | | | | |

**The biggest proven pain** is that his home market is shrinking while he pushes abroad, and the
site doesn't serve anyone abroad. That sits exactly on the goal the four clues point to.

### Clues, to inference, never quoted

1. SICAM in Italy on his homepage, "internationalen Fachmessen".
2. An English catalogue, "Wessel Gesamtkatalog 2023/24 englisch", in the footer.
3. He lists English, Italian and French on his profile.
4. His industry's domestic sales are falling while export holds.

**Inference, SUPPORTED on four agreeing clues.** He's selling to furniture makers outside Germany.

### The claim, checked three ways

- **Source.** wlfm.de fetched 24 Sep, `<html lang="de">`, zero `hreflang`, no EN or IT link text,
  `/en`, `/en/`, `/english` all 404, `wp-json/wp/v2/pages` lists 11 slugs, all German.
- **Positive control for the detector.** The same hreflang grep on hera-online.de, a direct German
  competitor in furniture lighting, finds de, en, es and it. ls-light.com finds en and it.
  hettich.com finds dozens. So an empty result on wlfm.de is real. (alquimialegal.mx returned none
  through the same grep, it's Wix and renders them by script, so it was rejected as a control.)
- **The opposite.** The English catalogue is the thing that could break "German only". Opened it,
  200, application/pdf, 20 MB, 144 pages, created 1 May 2023 in InDesign. Text search with spaces
  removed, PULSE 0, MIRA 0, Lighttop 0, and the control words from its own contents page, AURA 3,
  LED BOARD 20. So the English catalogue exists and predates the whole 2026/27 range.
- **Tweak test.** Passes. An English site for the new range isn't an upload.
- **Red team.** Foreign sales may run through agents with their own material. Not ruled out.

### Lasse, OPENER (re judged on cost, 24 Sep)

```
Hi Lasse, saw Wessel Licht, looks interesting!

However, your site is only in German, and the English catalogue is from 2023 with no PULSE, MIRA or (F)Lighttop in it. This causes the orders German furniture makers are cutting to stay lost, since makers abroad can't read about what you're launching.

I run Astra agency. We build websites for brands like Unilever, AXA, Pertamina. I ran e business insights for Heineken across 23 markets, so I know what a buyer in another country needs to see before they'll call.

Shall I build the English site for your new range so furniture makers abroad can find PULSE and MIRA and ask for samples, and send it over?
```

**Flags for Raka.** The Heineken line is the one I'd defend least, it's multi market work, not
selling abroad. The fair isn't mentioned in the message on purpose, it's the clue.

---

## Wessel van Noort, SBZ B.V. DRAFTED, weaker.

**Record.** `jobTitle` "Eigenaar en algemeen directeur", `companyDomain` **sbzbv.nl**. Company
record, BV since 27 Nov 1997, KVK 28076700, Leiderdorp, 21 employees, Gerard van Noort also an
owner. **A near miss this run.** I screenshot `sbz.nl` from memory and it's a pension fund. The
record says sbzbv.nl. Every check below is on sbzbv.nl, nav read from its own HTML.

**A false finding caught.** "No items found" on the klimaatkasten page sits inside
`w-dyn-hide w-dyn-empty`, Webflow's hidden empty state. Visitors never see it. Dropped.

### The four levels

| Level | Pain | Size | Current | Proof | Can we build for it |
|---|---|---|---|---|---|
| Region and industry | Fitters are among the hardest people to hire. UWV Q1 2026, machinemonteurs very tight, 87 of 93 occupation groups tight or very tight | Big, a 21 person installer grows only as fast as its crews | Q1 2026 | uwv.nl spanningsindicator page, opened | Yes |
| Company | Two open roles, monteur buitendienst and allround werkplaats, both handled by Wessel himself, both offering to train people with no experience | Big for them | Site last published 5 Jun 2026, both pages 200 today | Both ads read in full | **Yes** |
| Company | The ads are plain text, only logos and icons, no photos of the work. Not in the main menu or the footer menu, linked only from a side list on Over ons. `/vacatures` 404 | Medium | Live | Screenshot and HTML, below | Yes |
| Industry | Fire rules on sandwich panels, PIR against stone wool | Real | Ongoing | Panel makers like SAB and Trimo already certify for insurers | No, someone already solves it |
| Company | Cookies set before consent | Small | Live | site-audit | Tweak |

### The claim, checked three ways

- **Source.** Both vacancy pages fetched 24 Sep, 200. Rendered through curl, 0 errors, and looked
  at. Heading, grey text, three bullets, a phone number. No photo.
- **The opposite.** Looked for the vacancies in the nav. The homepage, contact, projecten and
  producten HTML have zero `vacature` hits. Over ons has them, which is also the **positive
  control** that the grep finds the links when they're there. The footer menu in the screenshot
  is Home, Over ons, Producten, Projecten, Contact.
- **Independent.** A web search for the job only returns SBZ's own page, no Indeed or werk.nl
  listing, so the site is where a candidate lands.
- **Currency, the weak spot.** Neither ad has a date. The site was republished 5 Jun 2026 with both
  ads live. There's no outside sign that he's hiring this month.

### Wessel, OPENER (re judged on cost, 24 Sep)

```
Hi Wessel, saw SBZ, looks interesting!

However, your site is telling fitters why to join in a few lines of grey text, tucked in a side menu on the About page. This causes you to push back or turn down projects, because every crew you're short is work you can't start.

I run Astra agency. We build websites for brands like Unilever, AXA, Pertamina. I built automated routing and follow up at Betty Blocks, so I know how fast a good applicant goes cold without a reply.

Shall I build the working at SBZ page so fitters can see the projects they'd build and apply by WhatsApp in a minute, and send it over?
```

**Flags for Raka.** Weaker than Lasse. The ads carry no date, so "the fitters you need" rests on
the site being republished in June. The proof line is a stretch, Eten Maar wasn't about hiring.
If you'd rather hold it, NO_STRONG_ANGLE is defensible.

---

## Matthias Ufer, Schumacher Verfahrenstechnik GmbH. NO_STRONG_ANGLE.

Impressum, "Matthias Ufer, Geschäftsführender Gesellschafter", HRB 85190 Köln, about 40 staff.
Modern Framer site with a strong team photo, the DIN 2303 defence approval on the homepage,
contract machining pages, a stock clearance search dated "Lagerliste Juni 2026", and a separate
shop. The privacy link goes to avermann.eu, an active agency. **Someone already builds for them.**
The industry pain is real and noted for later, VCI 29 May 2026, chemical production down again,
Q1 about 6% below the prior year and utilisation 75.1%, but nothing we'd build beats what they have.

## Luis Raab, significa. NO_STRONG_ANGLE.

Impressum lists him as one of four Geschäftsführer. significa is a marketing agency. Competitor.

## Ollie Bartlett, Collier Pickard Ltd. NO_STRONG_ANGLE.

`jobTitle` Owner, tagline "Co-owner at Collier Pickard | Helping businesses find the real problem
before they buy the wrong tech". collierpickard.co.uk, 200 with `curl --compressed`, "an
independent CRM consultancy", Maximizer, Creatio, Infor, Pipedrive, Teamwork.com. They sell
process and workflow fixes, the same work as our apps side. Competitor adjacent.

---

## Re judged on cost (Raka, 2026-09-24)

His words, "We always wanna angle out with the biggest and costliest pain points because that
means they'd pay for us. If it's just a tiny fix then they're not gonna buy it." The first drafts
led with a tiny fix each, an old English PDF and a hidden jobs link. Both true, neither worth
paying for on its own. RULES.md 4A rule 9 now requires the cost column and the pay test.

### Lasse Wessel, cost table

**New facts.** North Data, HRB 5978, Lasse Wessel managing director since **25 Jul 2025**, Stefan
Wessel removed **23 Jan 2026**, Maximilian Sander since 6 Jan 2020, three shareholders. A
generational handover, the site rebuilt Sep 2025 and a new range for 2026/27. Creditreform via
search puts staff at 5 to 9, balance sheet about €2m in 2023 (snippet, not opened, premium data).
Ordering is email or phone only, no sample request or configurator (WebFetch of /produkte/).

| Pain | Level | What it costs him a year | Proven | Would he pay €5k to €50k | Verdict |
|---|---|---|---|---|---|
| His customers, German furniture makers, are shrinking. Domestic down 4.1% in H1 2026, 40% on short time in Q3, about 3% down for the year, about 20% lost since 2023 (the 20% is a search figure, not opened) | Industry | Estimate, a few percent of revenue a year, compounding, on a business with about a €2m balance sheet | **Yes**, VDM 1 Sep 2026 | Only for something that replaces the volume | **The costliest** |
| Buyers abroad can't read the site or see the new range | Company | The route to replacing that volume, and the Italian fair on 20 to 23 Oct lands on it | Yes, checked three ways | **Yes**, an English site with sample requests for the new range | **The symptom we fix** |
| Every custom order runs through email and phone | Company | Hours of a 5 to 9 person team | Inferred only | Maybe, not proven | Park |
| Ecodesign and the Digital Product Passport | Industry | Future compliance cost | Named by VDM, not dated for lighting parts | Not now | Park |

**Verdict.** Keep, reframed. The flaw stays the visible one, the impact is now the cost.

### Wessel van Noort, cost table

**New facts.** SBZ's company LinkedIn (WebFetch, 24 Sep), in five months, a cooling complex for
Intratuin Halsteren (4 hours old), a 736 m2 production room for a defence contractor with a phase
2 planned, a noise cabin for Deutsche Aircraft in Leipzig, a food plant fit out in Katwijk, four
climate chambers for Enza Zaden in South Africa, a laser cabin for Hornet. None of these is on the
site's projects page, which lists 14 older projects (grep with Schiphol and Zweden as controls, 9
and 1 hits). EIB, utility new build shrinks in 2026, 75,000 more construction workers needed
2026 to 2029. UWV Q1 2026, machinemonteurs very tight.

| Pain | Level | What it costs him a year | Proven | Would he pay €5k to €50k | Verdict |
|---|---|---|---|---|---|
| Not enough fitters to build what he wins | Company, region, industry | Estimate, one missing fitter is a crew's worth of projects pushed back or turned down, the biggest line for a 21 person installer | Busy order book proven, labour shortage proven nationally, his two ads live and offering to train from zero, but undated | **Yes**, if it brings fitters | **The costliest** |
| The site doesn't show this year's defence, aerospace and export work | Company | Credibility with high value buyers, but he's winning them anyway | Yes | Maybe | Second |
| Utility new build shrinking | Industry | Fewer projects | EIB, but his LinkedIn shows the opposite | No | Doesn't apply to him |
| Cookies before consent | Company | Tiny | Yes | No | Tweak |

**Verdict.** Keep, reframed on crews. Still weaker than Lasse, the ads carry no date. The proof line
is now Betty Blocks routing and follow up, which bears on answering applicants fast. The Eten Maar
line didn't bear on hiring.

**Superseded first drafts, kept as history, never send.**
- Lasse block two impact was "This causes furniture makers outside Germany to go with a supplier
  whose new range they can actually read about." An inconvenience, not a cost.
- Wessel block two impact was "This causes the people you need to sign with an installer that
  actually shows them the job." Proof line was Eten Maar content, didn't bear on hiring.
