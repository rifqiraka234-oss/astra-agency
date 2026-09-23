# Batch 3, the five who accepted after the 22 Sep audit. 2026-09-23. NOT SENT.

**First run of the clues to inference method**, `docs/opener-template.md` section 3A.

**Why these five.** Every one of the 35 in yesterday's audit already carries a verdict, so the
"untouched" list in batch 2's file was wrong, all five of those had queue rows. Fresh work is the
new acceptances. `get_campaigns_stats` on v0.1 reads **327 accepted, against 322 at the audit**.
The `linkedinInviteAccepted` activities since 20 Sep list exactly five after the audit, all on 22
Sep. **322 plus 5 equals 327, the arithmetic closes.**

**Threads.** All five pulled one by one with `get_inbox_conversation`, all five return zero
activities. **Positive control**, Tim Balogun's thread through the same call in the same minute
returned both his messages, so the empties are real.

| Accepted | Who | Verdict |
|---|---|---|
| 22 Sep 19:35 | Dr Grzegorz Sobieszuk, PharmaSupport GmbH | **DRAFTED, below** |
| 22 Sep 19:51 | Steven Uitentuis, QWIC | NO_STRONG_ANGLE |
| 22 Sep 14:27 | Lasse Wessel, Wessel Licht für Möbel | NO_STRONG_ANGLE |
| 22 Sep 15:40 | Cédric Morel, Hula Hoop | NO_STRONG_ANGLE, an agency |
| 22 Sep 15:57 | Oluchi Okafor | DO_NOT_CONTACT, a Year 12 student |

---

## Grzegorz Sobieszuk, PharmaSupport GmbH. DRAFTED.

**Record reconciled first.** lemlist `firstName` is "Dr." and `lastName` "Grzegorz Sobieszuk, Mba",
so the name is Grzegorz. `jobTitle` Geschäftsführer. **Statutory, the Impressum** at
pharmasupport.de/impressum names "Geschäftsführer: Dr. Grzegorz Sobieszuk, Dr. Peter J. Vogel".
**North Data** shows PharmaSupport GmbH registered 9 Dec 2025 with him as Geschäftsführer, and
Sobieszuk Holding UG registered 26 Nov 2025, so he holds his stake through his own holding. He
owns part of the business. The domain is theirs.

### The clues, one line each, no interpretation

1. **2025-11-26, North Data.** Sobieszuk Holding UG registered, Teltow.
2. **2025-12-09, North Data.** PharmaSupport GmbH registered, previously PSV PharmaSupport GmbH,
   Geschäftsführer G. Sobieszuk and P. Vogel.
3. **Undated, pharmasupport.de/aktuell.** The only news item on the site. "Nach fast 25 Jahren
   stetigen Wachstums" the firm became a GmbH "für eine langfristige Weiterentwicklung", with him
   and Vogel sharing the management.
4. **His own job description in lemlist.** "Driving the strategic development of PharmaSupport on
   its growth journey to becoming a leading service provider for pharmaceutical quality management
   across Europe. Involved in creating new service offerings, leading business development".
5. **His team page, pharmasupport.de/team/dr-grzegorz-sobieszuk.** Partner since 06/2024. Former
   site head at Advance Pharma, Strategy& consultant, Senior Director at IDT Biologika. Lists
   "Digitale Transformation" as a focus.
6. **Company LinkedIn, read via WebFetch.** Five recent posts, and **three are hiring**. About eight
   months ago "Naturwissenschaftler (m/w/d) mit Schwerpunkt GMP & Pharmakovigilanz", about five
   months ago "Naturwissenschaftler (m/w/d) als QA Manager GMP", about three months ago the GMP and
   pharmacovigilance scientist again. The other two are the GmbH announcement in DE and EN.
7. **talents.studysmarter.de/companies/pharmasupport-gmbh.** An employer profile on a graduate
   recruiting platform, selling "fachliche Exzellenz und kontinuierliche Weiterbildung".
8. **The business model, from their own pages.** They sell people. External Qualified Person,
   QPPV, interim managers, project consultants. Capacity is the experts they employ.

**Sources with nothing.** No newsletter found on the site or in its HTML. No press beyond the
register. His personal LinkedIn posts not readable, walled.

### The inference

**A new owner managing director took over in December 2025 with a mandate to grow across Europe
and add services, and the firm has been trying to hire scientists all year, re advertising the
same pharmacovigilance role five months apart.** For a firm that sells its experts' time, growth
is capped by how many qualified scientists it can recruit. Rests on clues 2, 4, 6, 7 and 8.

**Contradictions.** None found. A repeat posting could mean a second hire rather than a hard to
fill role, which still reads as growth.

**Grade, SUPPORTED.** Four independent sources, the register, his own words, their LinkedIn and a
third party recruiting platform.

**Impact aimed at.** Hiring the scientists growth depends on.

### The flaw, and its four tests

**The site has no careers content at all.** All 107 distinct internal links from the DE and EN
homepages were fetched and grepped for karriere, stellenangebot, bewerbung, bewerben, career,
vacancy, "wir suchen", "we are looking" and "join our team". **Zero hits.** Every "stellen" match
was read in context and every one is the verb. `/karriere`, `/jobs`, `/stellenangebote` and
`/career` all return 404. **Positive control**, the same grep on hfmencap.org finds "Work for us".

1. **Positive control.** Passed, above.
2. **Render trust.** site-audit printed no RENDER NOT TRUSTED. One JS file 404s on their side too.
3. **Tweak test.** Borderline, and this is the line I'd defend least. A bare "we're hiring" page is
   an afternoon. What's missing is the case for joining a firm whose product is its people, which
   is a real piece of work. Flagged for Raka.
4. **Red team.** Could it be deliberate, hiring only through LinkedIn and platforms? Possibly, but
   the StudySmarter profile and LinkedIn posts have nowhere to send a curious scientist except a
   services brochure.

**Also true, deliberately not used.** Their sitemap.xml and robots.txt both serve a raw "TYPO3
Exception" page, a tweak. Project references are withheld "aus Gründen der Diskretion", which is
normal in pharma consulting, so it fails the red team.

### The proof, and the weakest line in the message

Betty Blocks is the closest honest match, writing to specialists who get pitched constantly. It
does not bear on recruiting as directly as Eten Maar bore on tuftuf. **Flagged for Raka.**

### Grzegorz, OPENER

```
Hi Grzegorz, saw PharmaSupport, looks interesting!

However, your site doesn't have a single line, on any page, about why a scientist should work for you. This causes the GMP and pharmacovigilance experts your growth depends on to join a firm that actually pitches them.

I run Astra agency. We build websites for brands like Unilever, AXA, Pertamina. I ran go to market at Betty Blocks, writing for specialists who get pitched every week, so I know what makes them stop and read.

Shall I build the careers page so the scientists you want can see why PharmaSupport, and send it over?
```

**No clue is quoted.** Nothing about job posts, the takeover or the GmbH. Only the consequence.

---

## Steven Uitentuis, QWIC. NO_STRONG_ANGLE.

**Record.** CEO, tagline "CEO at QWIC". A hired CEO, appointed per nieuwsfiets.nu 11 Dec 2025.

**Clues.** Bankrupt end of 2023 and restarted (mtsprout, nieuwsfiets). "We zijn het afgelopen jaar
met 40, 50% gegroeid in het aantal dealers", "Duitsland is een grote focusmarkt", France next
(nieuwsfiets.nu 31 Dec 2025). Elan and Signal launched April 2026 with Bosch (verkeersbureaus.info
4 May 2026). His mandate, dealer network, quality and service.
**Inference, SUPPORTED.** Dealer led expansion into Germany.

**Why no angle.** The surface is strong where that goal lives. qwic.nl is a fresh rebuild, "De
nieuwe generatie QWIC, nu verkrijgbaar". **qwic.de carries Elan 36 times and Signal 13**, so the
German site has the new range. The dealer locator renders a Mapbox map of hundreds of dealers
across NL, BE and DE. My Enter keypress in its search listed nothing, but that is how I drove it,
not evidence it's broken. **Not used, and why.** 20 cookies including Criteo, Meta and DoubleClick
set before any click with no consent banner, true, but a compliance tweak and not our work. The
careers page says "185 QWIC employees", likely pre bankruptcy, a one line fix.

## Lasse Wessel, Wessel Licht für Möbel. NO_STRONG_ANGLE.

**Record.** Geschäftsführer, second generation family business per its own homepage, and he is the
named contact on the jobs page.

**Render.** site-audit printed RENDER NOT TRUSTED, four assets served fine by curl. Chromium alone
hit ERR_TOO_MANY_RETRIES on the proxy. **Re-rendered with every wlfm.de request served through
curl**, 63 served, 0 errors, and the full page screenshot read in four parts.

**Clues.** Neuheiten 2026/2027 with three new systems, PULSE, MIRA and (F)Lighttop. Trade fairs
MIKO Connect March 2026 and SICAM October 2026. Jobs page with no openings. Uploads dated 2025/09,
so a recent rebuild. **Inference, SUPPORTED.** Selling a new range to furniture makers through fairs.

**Why no angle.** A modern B2B site with a searchable product range and dedicated pages for each
new system. The footer's catalogue is still "Gesamtkatalog 2023/24", true, and an upload away,
so it fails the tweak test.

## Cédric Morel, Hula Hoop. NO_STRONG_ANGLE.

CEO of Groupe Hula Hoop, an 80+ person brand, design, digital and media agency in Lyon, Paris,
Nantes, Montréal and Genève, per lemlist and hula-hoop.co (200, "Communication Agency Lyon,
Paris"). A competitor, not a prospect. Same verdict as Elevate Marketing.

## Oluchi Okafor. DO_NOT_CONTACT.

The 16 Sep row blocked her as unidentifiable. **The lemlist record now settles it.** Summary "I am
a Year 12 student aspiring to pursue a career in corporate law", `jobTitle` "Law Work Experience".
Not a business owner.
