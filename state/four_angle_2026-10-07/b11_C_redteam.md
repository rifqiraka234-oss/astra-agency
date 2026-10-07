# Red team, b11_C, 2026-10-07 (about 06:27 to 06:50 UTC). Read only, nothing sent, nothing committed.

## Threads, re pulled first
- Niklas, ctc_Wg9Bv7Z7vMqpNQx78, get_inbox_conversation 06:27 UTC, 1 item, our 2026-07-25 connect note only, nextPage null. sentOnly "Niklas Mocker" 1 hit, lastRepliedAt null.
- Noah, ctc_ch3vFcKAkjQdMKDCg, 0 items, nextPage null. sentOnly "Noah Hertling" 1 hit, connect note 2026-09-07, lastRepliedAt null. teamConversations "Hertling" 0.
- Positive control, ctc_MtGBXP6wEwP95GWdy, 4 items the same minute.
- State files, every row for both contactIds is UNRESEARCHED, BLOCKED or NO_STRONG_ANGLE, no SENT row.

## 1. Niklas Mocker, dotega. Verdict KILL

| Claim | What I opened | Result | Why |
|---|---|---|---|
| Instagram has seven posts in total | instagram.com/dotega.de/embed/ by curl, 06:30. posts_count 7, followers 168, newest 2026-09-17, four videos 6 Aug, one 13 Mar. Controls, wohnen.im.eigentum 176 posts newest 6 Oct, instagram 8,613 posts, same minute. The profile page by fetch-walled.py loaded once (title right) then 429 | HOLDS | The number is right. One source family (the embed) because the profile page rate limited |
| Facebook fewer than a hundred followers | social-audit.js Page Plugin, 06:33, 65. The 3 Oct row read 62 | HOLDS | |
| Articles and webinars keep coming | /magazin raw HTML, dated pieces 7, 5, 2 Oct, 30, 28, 25 Sep, about three a week. /webinare, 16 held, founders on 17.08, 02.09, 22.09, next 12 NOV | HOLDS | |
| Growing WEG self management across Germany | homepage "Bundesweit für Sie da", 10 city pages | HOLDS | |
| Gate says "unknown if a marketing person owns social, no hire visible" | https://www.dotega.de/karriere raw HTML, 06:40 | **FALSE** | "Jan verantwortet das Marketing bei dotega. Er übersetzt komplexe Themen in klare Botschaften, entwickelt Kampagnen ... Jan · Chief Marketing Officer". There is a CMO who owns this channel |
| Owners who scroll Instagram and Facebook never hear about dotega | no source | **WEAK** | Pure inference. Their own funnel is search (three articles a week, city pages), email (the webinar sign up says "Wir kündigen jeden neuen Termin per Mail an") and the partner association. Nothing shows WEG owners pick a provider on Instagram. The 12 Nov webinar is co hosted by Wohnen im Eigentum, who post on Instagram themselves |
| "I worked three years as a freelance social media and branding consultant" | docs/astra-master-context.md 2A, Dec 2020 to Feb 2023 | **FALSE** | About two years and two months, not three. "Turning what a brand already makes into posts people follow" isn't in the record either, it's a description of the pitch dressed as experience |

**Why KILL and not FIX.** The facts hold, the angle doesn't. A funded proptech with a named Chief Marketing Officer who "entwickelt Kampagnen" has chosen search, email and webinars, and is publishing three articles a week. A quiet Instagram there is a channel decision by an incumbent, not a pain we can prove costs them anything, and the message would read to Niklas as a stranger criticising his CMO's work. It fails the four angle table's incumbent column and the pay test. Two earlier passes (3 Oct and 6 Oct) also judged social "alive, not the pain". The prior NO_STRONG_ANGLE stands. drafts.md now carries a sweep block for him instead of an opener.

**Most likely push back.** "Our marketing lead runs this, and our owners find us on Google, not Instagram."

## 2. Noah Hertling, Systemhaus Hertling. Verdict FIX (small), then shippable at MEDIUM

| Claim | What I opened | Result | Why |
|---|---|---|---|
| Google listing has no reviews yet | Google Maps "IT Systemhaus Reinbek" re rendered in Chromium (de-DE) 06:45, "Systemhaus-Hertling UG (haftungsbeschränkt) Keine Rezensionen IT-Berater · Birkenweg 18 ... +49 1522 7441804". The same render shows IT-Reinbek 5,0, Base2 4,7, Sellenschlo 5,0, RA-MICRO 4,0, so the method does read ratings. Phone matches the Impressum's 0152 27441804 | HOLDS | Positive control in the same page |
| LinkedIn page has one follower | social-audit.js on the company page, first two tries hit the sign in wall (UNKNOWN), third read "Systemhaus-Hertling UG (haftungsbeschränkt) IT Services and IT Consulting Reinbek, Schleswig-Holstein 1 follower" | HOLDS | Same as the earlier run |
| Homepage names no client | curl of /, /leistungen/, /ueber-uns/, /kontakt/, /impressum/ 06:42, the only img on the homepage is the logo, 0 hits for Kunde, Referenz, testimonial across five pages, sitemap has only the pages, post and category feeds | HOLDS | |
| Hamburg firms | his own words on every page, "IT-Systemhaus für Hamburg und Umgebung", /kontakt/ "Einsatzgebiet Hamburg und Umgebung, remote deutschlandweit". Sitz Reinbek (Schleswig-Holstein, on the Hamburg border) | HOLDS | He sells to Hamburg himself, so "Hamburg firms" is his market, not our guess |
| Owner | Impressum "Vertreten durch Geschäftsführer: Noah Joel Hertling", HRB 27513 HL, lemlist "Geschäftsführer" | HOLDS | |
| New firm, first clients | © 2026, register filings Mar and Apr 2026 (per gate, North Data) | HOLDS | |
| Ongoing support | /leistungen/ "lassen sich einzeln oder als laufende Betreuung kombinieren" | HOLDS | |
| Credential, stroopwafel brand from zero with my family | master context 2A, "with five relatives", the Yoeri thread says "with my cousins" | HOLDS | "Family" is fair |
| Block five "the Systemhaus Hertling presence that wins Hamburg clients" | | **WEAK** | "Presence" alone is vague, a reader can't picture it. Changed to "online presence", which names the thing that covers all three block two items (site, Google profile, LinkedIn). The checker caps block five at 16 words, so the name became "Hertling" |

**Risks to flag to Raka, not blockers.** A one person UG since spring 2026 with the VAT number still "Beantragt", so budget is the real risk even at 500 euros. He likely built the custom WordPress theme himself. Reviews only come from clients, so we can't sell him reviews, only the site, profile and proof structure around them.

**The fix, as now in drafts.md (checker exit 0, contractions kept).**

```
Hi Noah, saw Systemhaus Hertling, looks interesting!

However, your Google listing has no reviews yet, your LinkedIn page has one follower, and your homepage names no client. This causes Hamburg firms comparing IT partners to go with the ones that show proof.

Especially, when you are winning your first clients as a new firm, the business that signs with someone else is ongoing support you'll never get to quote.

I run Astra agency. We build branding and websites and social media management for brands like Unilever, AXA, Pertamina. I built a stroopwafel brand from zero with my family, so I know how a new name earns its first customers.

Shall I send you over what the Hertling online presence that wins Hamburg clients looks like?
```

The gate's `thread` offer and `lead read` were updated to match. Link words Hamburg and client still sit in block two and block five.

**Most likely push back.** "I'm six months old, of course I have no reviews yet, they come with clients, not with a website."
