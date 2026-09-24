<!-- Lasse Wessel SENT 2026-09-24 14:39:17Z act_wCPnkZTSDjH6Dm78m, corrected text. SBZ still open. -->
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

### Lasse, OPENER (corrected at the pre send check, 24 Sep, NOT SENT, needs Raka's word again)

```
Hi Lasse, saw Wessel Licht, looks interesting!

However, your site is only in German, including the PULSE page that explains how the system fits together. This causes furniture makers abroad to pass on PULSE, and those are the orders you need while German makers cut back.

I run Astra agency. We build websites for brands like Unilever, AXA, Pertamina. I ran global go to market for Betty Blocks' software, so I've seen what a technical buyer abroad needs before they'll call.

Shall I build the English PULSE site with a system builder so makers abroad can pick their parts and ask for a quote, and send it over?
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

---

## Full re research, every page and more sources (Raka, 2026-09-24)

His words, "Did you try to use a lot of sources?? Did you try to like read all pages of the
website and analyse the whole thing as a whole instead of just one fix?? If not do it again."
The honest answer was no, so both were redone.

### Lasse Wessel, the whole picture

**Every page read.** wlfm.de sitemaps plus the WordPress API, 8 pages, 5 product groups and **95
product pages, 108 URLs, all 200**. Screenshots looked at for a product group, a product, contact
and jobs (curl render, 0 errors). Modern dark teal site from Sep 2025, consistent, clean.

**What the site does for a buyer, as a whole.**
- German only everywhere. `lang="de"`, no hreflang, `/en` 404.
- **PULSE, the flagship.** 11 PULSE parts, each with its own instruction PDF, created Nov 2025,
  **all in German** (two opened, "Gebrauchsanweisung", "Anwendung").
- Datasheets. **First count was wrong and is withdrawn.** "84 of 95 without a datasheet" ignored
  the catalogue. By article number, 62 products are in the May 2023 English catalogue, the 11
  PULSE parts have PDFs, and about 16 have neither, including Wessel Beam and several spots.
- No enquiry, sample or quote option on any product page. One general contact form.
- No customers, references or projects anywhere (keyword count 0).
- Product copy says they're made "in unseren jährlich zertifizierten Partnerfertigungsstätten in
  FO als auch in Kleinserien in Deutschland".

**Sources, 11.** VDM via moebelfertigung.com (1 Sep 2026). North Data (MD history). IVDW, their
outside sales agency, which ran seven posts on them (leadership change 11 Aug 2025, SICAM 2025 and
2026, MIKO March 2026, joined the Connectivity Standards Alliance in June 2026 for Matter smart
lighting, SICAM 2026 motto "slim, smart, customized"). insolvenzkarte.de (230+ furniture
insolvencies in 2024, about 20% more forecast for 2025, 75% of German kitchens made in OWL, RWK
Küchen in Löhne insolvent a second time). WiWo (industry sales down 3.4% in 2025 after 7.8% in
2024). Creditreform and dasoertliche via search (5 to 9 staff, founded 1972 as family business).
Company LinkedIn (4 employees, no posts). Competitors hera-online.de and ls-light.com (both
multilingual). The English catalogue PDF. Two PULSE PDFs. His own site, all of it.

| Pain | Level | Cost to him a year | Proven | Pay test | Verdict |
|---|---|---|---|---|---|
| His customers shrinking and failing. Sales down 7.8% then 3.4%, 230+ insolvencies in 2024, OWL is his doorstep | Industry, region | Lost volume every year plus bad debt when a customer goes under. On a firm of 5 to 9 people and about a €2m balance sheet, this is the business | **Yes** | Only through new customers | **Costliest** |
| His bet to replace it, smart connected lighting (PULSE, Matter, DALI, CSA member) sold at an Italian fair, can't be understood by anyone who doesn't read German | Company | The foreign orders that are meant to replace the German ones | **Yes**, site and PDFs opened | **Yes**, an English PULSE site with a system builder and quote requests, a real build | **The angle** |
| A tiny team and an outside agent answering every spec question by phone and email | Company | Hours of 4 to 9 people | Team size yes, workload inferred | Folded into the builder | Part of the angle |
| Cheap imports (VDM names them) while his own production is partly in "FO" | Industry | Price pressure | Industry level | No | Park |

### Wessel van Noort, the whole picture

**Every page read.** Crawled every link on sbzbv.nl, **32 pages, all 200**: home, over ons, 9
product pages, 14 project pages, 2 vacancies, contact, terms. Homepage and phone screenshots looked
at. A Webflow template, copyright 2022, republished 5 Jun 2026, Dutch only. Every product page has a
short callback form (name, email, phone). "Ons werk" on product pages shows photos (the "No items
found." is Webflow's hidden empty state, checked on all 9). Nothing on the site mentions defence,
aerospace, Germany projects, export or any work after about 2022. Homepage body is two sentences.

**Sources, 9.** Company LinkedIn (seven projects in five months, Halsteren, a 736 m2 defence room
with phase 2, Deutsche Aircraft Leipzig, Katwijk food plant, Enza Zaden South Africa, Hornet laser
cabin). UWV spanningsindicator Q1 2026. EIB (utility new build shrinking 2026, 75,000 more workers
needed 2026 to 2029). Company record (1997 BV, 21 staff) and a data site estimate of about $3m
revenue for 2025 (not confirmed). Provincie Zuid-Holland and Stedin (grid congestion since Dec
2024, to 2032 to 2035). Indeed, werkzoeken and nationale vacaturebank, all behind Cloudflare, so
**the vacancies can't be dated**. Facebook, behind a login. Competitor hansvandermeijs.nl.

| Pain | Level | Cost to him a year | Proven | Pay test | Verdict |
|---|---|---|---|---|---|
| Crews. A busy order book across four countries in the tightest market for fitters there is | Company, industry | Estimate, on about €3m and 20 people, each missing fitter is roughly a crew's share of a year's work | Busy yes, shortage yes, **his hiring now unproven** | Yes, if it brings fitters | Costliest if the hiring is current |
| The site sells 2022 and the Netherlands while he's winning defence, aerospace and export work | Company | High value buyers who check him find snack factories and a fish shop | Yes | Yes, a proper project and sector site | Second, and the safer claim |
| Grid congestion in Zuid-Holland | Region | His clients' new builds delayed | Yes for the region | No, he builds inside existing halls | Doesn't hit him |

**Verdict.** Blocked on one fact. If he's hiring now, crews is the angle and the draft above stands.
Raka can settle it in his own browser by searching SBZ on Indeed. If he isn't, the angle becomes
the site selling 2022 work while he wins defence and export jobs.

### Pre send check, 24 Sep. The approved text was false, not sent.

Raka said "Send lasse". The live re check before sending found **all 11 PULSE PDFs are bilingual,
German then English** ("Instruction Manual", "Application", "Important safety instructions").
The research pass had only read the first 700 characters of two of them, which are the German
half. So "every PULSE instruction sheet is only in German" was false and was not sent. Also on the
re check, `/en` and `/en/` now return a 1,271 byte 500 error rather than 404, not an English site,
and the hera-online.de control returned de, en, es and it on the second try (the first try came
back empty and was rerun with a browser user agent).

Still true and rechecked live, `<html lang="de">`, 0 hreflang, `/it` 404, and /neuheiten/pulse/,
the page explaining the modules, 12 V and 24 V, Zigbee, Matter and DALI, is German only.

---

## SBZ, the draft on the proven angle (24 Sep)

Raka asked what we draft to SBZ while the hiring can't be dated. This is the angle that's fully
proven. Every one of the 32 pages is `lang="nl"`, no English. Zero hits across all 32 for
defensie, defence, militair, aircraft, vliegtuig, luchtvaart, Leipzig, Enza or Zuid-Afrika, with
Schiphol as the control (3 pages). Their company LinkedIn shows a 736 m2 defence production room
with a phase 2 planned and a noise cabin at Deutsche Aircraft, both within the last three months.
**Withdrawn before drafting**, "no overseas work", because /projecten says they work in the
Netherlands, Belgium and Germany and a Swedish laser cabin is shown.

### Wessel, OPENER, proven angle (NOT SENT)

```
Hi Wessel, saw SBZ, looks interesting!

However, your site is only in Dutch and shows none of your defence or aircraft work. This causes defence and aerospace buyers checking you out to give their next production room to a builder who looks like they've done one.

I run Astra agency. We build websites for brands like Unilever, AXA, Pertamina. I ran e business insights for Heineken across 23 markets, so I know what an industrial buyer checks before they call.

Shall I build the SBZ site in English and Dutch around your defence and aerospace work so those buyers see it first, and send it over?
```

**Weakest point.** That defence buyers are checking the site is inference. A defence contractor
may also forbid publishing their project, though SBZ posted it on LinkedIn themselves.

---

## SBZ, the inside. Can they carry the growth? (Raka, 2026-09-24)

Raka's challenge, "shouldn't scaling up their internal processes be a bigger priority?" He's right.
I found the goal (bigger specialist work, defence, aerospace, export) and pitched a web page.

### The owner's LinkedIn, the six routes, all logged

1. WebFetch `/in/wesselvannoort`, **HTTP 999**. curl on `/in/wesselvannoort/`,
   `nl.linkedin.com/in/wesselvannoort` and `/recent-activity/all/`, **999** each.
2. Web search `"Wessel van Noort" SBZ`. **The result title is his headline, "Wessel van Noort -
   Werkvoorbereiding, planning, projectleiding/coördinatie - SBZ b.v."** Tier G, a search title,
   the page itself can't be opened.
3. `linkedin.com/posts wesselvannoort` and `site:linkedin.com/posts "SBZ" sandwichpanelen`, no
   post of his returned.
4. rocketreach org chart, Wessel "Verkoop, projectleiding en management", Gerard "Eigenaar en
   directeur", Steve Langeveld "Projectleider", Stéphane Bilat "Engineer", Ineke de Ruiter
   "Administratief financieel medewerkster". Old people data, a candidate list only.
5. Company page posts via WebFetch, seven projects in five months, already logged above.
6. Instagram `@wesselvnoort`, **429**, not confirmed as him. Korfbal club TOP sponsor article on
   kvtop.nl, **404**. No news quoting him found.

**Ownership is unresolved.** lemlist says "Eigenaar en algemeen directeur", rocketreach says Gerard
is owner. drimble and creditsafe hide the bestuurder behind a paywall. Likely a handover like
Lasse's, not confirmed.

### What their own pages say about how work flows

- "Al onze projecten zijn maatwerk. Ontworpen door ons eigen kantoor, voorbereid in onze eigen
  fabriek en gemonteerd door onze eigen monteurs. In Nederland, België en Duitsland, maar ook
  vliegen wij met onze klanten mee de wereld over." (/projecten)
- Quotes are "vrijblijvend", valid 14 days, "gebaseerd op de door de afnemer verstrekte gegevens,
  ontwerpen, tekeningen ... en ... gedane opmetingen" (algemene voorwaarden, art. 3).
- The privacy policy collects "Kopie ID bewijs, VCA, heftruck of hoogwerker certificaat ...
  Werkvergunning" from workers of third parties, so they already bring in outside crews.
- Projects run from 2 days to several months (monteur ad).

### The pain table, redone with the inside

| Pain | Level | Cost to him a year | Proven | Pay test | Verdict |
|---|---|---|---|---|---|
| **Every job is designed, quoted, prepared and planned from scratch, and sales, work prep, planning, project running and hiring sit with one person**, while jobs get bigger (defence phase 2) and further away (Leipzig, South Africa) | Company | The ceiling on how much work a 21 person firm can take. Each slow quote is a job lost, each planning clash abroad is a crew standing still (estimates) | Custom flow and quote rules **proven** on their own pages. Wessel's role from his headline (search title) and rocketreach, two agreeing clues. Overload itself **inferred** | **Yes**, a quoting and planning tool is a €15k to €50k build | **Costliest and biggest** |
| Crews, the national shortage | Industry | Work pushed back | Shortage proven, his hiring now unproven | Folded into the above, better planning gets more from the crews he has | Part of it |
| Site Dutch only, none of the defence or aircraft work | Company | Credibility with new buyers | Proven | Smaller | Symptom, not the pain |

### Wessel, OPENER, the inside angle (NOT SENT)

```
Hi Wessel, saw SBZ, looks interesting!

However, your whole process is custom, every job designed, quoted and planned from scratch, while the jobs keep getting bigger and further from home. This causes you to spend your weeks on drawings, quotes and crew schedules instead of winning the next defence or aircraft project.

I run Astra agency. We build websites and apps for brands like Unilever, AXA, Pertamina. I ran go to market at Betty Blocks, a platform companies use to build their own internal apps, so I've seen where teams like yours lose the hours.

Shall I build the quoting and planning tool so a cell's price, parts list and crew schedule come out of one form, and send it over?
```

**Weakest points.** That the quoting and planning land on Wessel rests on his headline and old
people data, not on his own words. That it's overloading him is inference. Building a demo needs
guesses about their pricing, so a first build would be a mock with made up numbers, labelled.
