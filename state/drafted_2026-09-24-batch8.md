# Batch 8, for Raka to send 2026-09-25. NOT SENT. Redrafted 2026-09-25 on Raka's "redo it", threads re-pulled that morning, both unchanged, control Wessel full.

**The honest headline. The accepted pool is used up.** Raka asked for ten. All 336 acceptances
were pulled from lemlist (four activity pages, 100 + 100 + 100 + 36, matching
`linkedinInvitationAccepted` 336 exactly) and joined to every queue row and every audit. Every
accepted person has now been worked except two who can be written to today.

**How the list was built, and the traps it caught.**
- 116 accepted contacts have no queue row at all. The queue doesn't cover July and August, so
  "not in queue" is not "never messaged". The 2026-09-21 audit's "connect note only, 27" list
  plus everyone accepted since 21 Sep is the real untouched pool, 45 people.
- Of those, 35 already carry a verdict (SENT, NO_STRONG_ANGLE, DO_NOT_CONTACT, BLOCKED).
- **`THREAD_VERIFIED_CLEAN` means ALREADY SENT.** Guy Casters carried it, his thread holds a full
  opener from 2026-09-21 10:00. Out.
- The 20 `DRAFTED` rows from 21 Sep were refused by lemlist because the invitations were never
  accepted. None of the 20 appears in the 336. They still can't be sent.
- The ten left, threads pulled one by one today, control Wessel van Noort's thread full.

| Who | Thread | Verdict |
|---|---|---|
| **Pierre-Lou Pichon**, Office des Sports de Montagne | **He replied 2026-09-24 19:24**, "Thank you for your message ! How is your Stoopwafel business ?" | **REPLY drafted** |
| **Jon Cockley**, Handsome Frank | Connect note 2026-08-03 only | **OPENER drafted** |
| Simon Wilmes, Snorly | Connect note 2026-07-26 only | NO_STRONG_ANGLE, see below |
| Marjan Verhoeven, Peter van der Leegte Veilingen | Connect note only | NO_STRONG_ANGLE, see below |
| Hendrik Rolshausen, Prevent | Connect note 2026-07-25 only | NO_STRONG_ANGLE |
| Yasin Tipiler, now UGC.NL | Connect note 2026-07-22 only | NO_STRONG_ANGLE |
| Orion D., Omnilabs Research | Connect note 2026-07-29 only | NO_STRONG_ANGLE |
| Aditya Taneja, Mapler AIx | Connect note 2026-07-28 only | BLOCKED_NEEDS_INFO |
| Fabrice Beauchêne, Glyx Therapeutics | Connect note 2026-07-18 only | NO_STRONG_ANGLE stands |
| Anthony Roux, Lums AI | Connect note 2026-07-20 only | DO_NOT_CONTACT, closed |

---

## Pierre-Lou Pichon, Office des Sports de Montagne. REPLY.

**Check A.** Thread `ctc_sXX38tjHJTdW82Frh` has one activity, his reply. Our connect note isn't
recorded as an activity, the known lemlist gap. Name search, one contact. Queue and state, no
row. He accepted 2026-09-24.

**Who.** `jobTitle` "Chef d'entreprise | Fondateur & Gérant". His summary, founder of Groupe 4
Seasons Sport, Saint-Lary Aventure Park, Sport 2000 Saint-Lary and the Office des Sports de
Montagne. office-sports-montagne.com, 294 pages crawled, online booking for canyoning, rafting,
via ferrata, packs, seminars, stag and hen parties and gift vouchers, French only.

**Why no pitch.** Saint-Lary just had its best winter in ten years, 473,308 skier visits to
1 March and occupancy up to 94% (aquitaineonline.com and france3, via search), Spanish visitors
about 5%. No costly pain found to lead with, and he asked a friendly question. CLAUDE.md, reply
in context, a warm answer, not the template.

**Recheck 2026-09-24, late pass.**
- Check A, all four ways. Name search "Pierre-Lou" 0, "Pichon" 1 contact. search_campaign_leads,
  v0.1 only. Full activity history for `lea_9WJdgHA5kaYSrjwQw` shows the connect note
  (linkedinInviteDone 12:18:57Z), his reply 19:24:48Z, a campaign automation pause 21:04:41Z
  and linkedinInviteAccepted 21:04:44Z. Nothing else was ever sent. Grep of state and logs
  for his name, company, contactId and leadId finds only this batch's rows. Control, the
  same grep for Wessel finds his sent file.
- Check B. "The winter was a good one" reopened at two sources.
  aquitaineonline.com 12836, 5 Mar 2026, "son meilleur bilan depuis dix ans", 94% in the week
  of 14 Feb, 473,308 skier visits to 1 March. lepetitjournal.net 6 Mar 2026, the same 80%, 94%
  and 473,308, "+1,3 point" on last winter. Eten Maar facts from `docs/astra-master-context.md`,
  CEO and CMO Aug 2020 to Dec 2024, from zero with five relatives.
- **Two fixes.** "in Jakarta and Bali" removed, since `docs/astra-company-profile.md` bans
  naming the country or its cities in client facing copy. "under one roof" removed, the park,
  the shop and the Office des Sports are separate businesses in his group.

**Raka to confirm before sending.** Is Eten Maar still trading? The draft says it in the past
tense, per his LinkedIn (CEO and CMO, Aug 2020 to Dec 2024).

### Pierre-Lou, REPLY

```
Hi Pierre-Lou, thanks for asking! The stroopwafel business was a wild ride, four years building Eten Maar from zero with five relatives. These days I'm building websites and apps at Astra.

I had a look at what you've built in Saint-Lary, the adventure park, the Sport 2000 shop and the Office des Sports. Sounds like the winter was a strong one, how's the summer season been?
```

---

## Jon Cockley, Handsome Frank. OPENER.

**In plain words.** Jon co-owns a London illustration agency that earns on commissions, and AI
has already cost a quarter of illustrators work. This year he launched two new incomes, a print
shop (Handsome Provisions, April) and office art for client agencies (Wonderhood, VCCP). But his
main site, where agencies and brands come for his artists, doesn't show either, the shop isn't
in the menu and one article in the whole site links to it.

```gate
lead: Jon Cockley, Handsome Frank Illustration Agency, ctc_nHPaYSqrv7u32oPTY, lea_7LWmuwtq2CQNDBfu5
site pass 1: 217 pages, tools/crawl.py from sitemaps (211) and links, every page read
site pass 2: 217 pages, second full crawl, screenshots of the homepage and an artist page (Sarah Maycock), desktop and phone, then a live recheck of six page types (home, artist, about, contact, two insights) and the hamburger menu opened in Chromium and screenshotted
deep analysis: Modern agency site, menu Home, Illustrators, Animation, About, Read, Watch, Listen, Contact. 50 artist pages, 162 insight articles. Raw HTML of all 217 pages grepped for handsomeprovisions, 1 hit, the article meet-our-handsome-women, control instagram.com found on 12 pages. Handsome Provisions is Shopify, 196 prints from £40 to £400, newest added 2026-09-23, 26 by Sarah Maycock whose artist page doesn't link them. Office art for Wonderhood Studios and VCCP described in one insights article.
owner linkedin: /in/hfjon curl 301 to login, personal posts not readable, routes logged. Search title "Jon Cockley - Handsome Frank Limited". Company page 200 on curl, the eight newest posts read (16 Sep back to 20 Jul), all artist commissions and a podcast, none mentions the shop since the April launch post "Introducing Handsome Provisions", read via WebFetch. Illustration Department podcast page with Jon opened, 200. Instagram handsome_frank taken from their HTML, 429 to us.
contact linkedin: same person as owner, Companies House PSC 25 to 50% of Handsome Frank Limited 07416755, director since 22 Oct 2010
google news: tools/news.py en, "Handsome Frank" 23 results (shop launch 2026-04-08, contract tips 2026-06-25, It's Archie AI talent agency 2026-01-09), "Jon Cockley" 3, control Tesco 102
regional news: tools/news.py (UK OR London) illustration AI, 75 results, Creative Boom 2026-09-21 on handmade art mattering
industry news: tools/news.py illustration agency AI, 76 results, plus the Society of Authors survey via 80.lv, 26% of illustrators lost work to AI, April 2024
sources:
1. https://www.handsomefrank.com/ (217 pages, twice)
2. https://handsomeprovisions.com/products.json
3. https://find-and-update.company-information.service.gov.uk/company/07416755/persons-with-significant-control
4. https://find-and-update.company-information.service.gov.uk/company/14494972/persons-with-significant-control
5. https://www.creativeboom.com/resources/handsome-frank-launches-a-new-shop-selling-beautiful-prints-by-world-class-illustrators/
6. https://www.linkedin.com/posts/handsome-frank-illustration-agency_introducinghandsome-provisions-activity-7444679287221194752-l4tq
7. https://80.lv/articles/a-third-of-translators-a-quarter-of-illustrators-have-lost-their-jobs-to-ai
8. https://www.handsomefrank.com/insights/read/handsome-frank-co-curates-art-exhibitions
9. https://www.linkedin.com/company/handsome-frank-illustration-agency (200, eight posts read)
10. https://illustrationdept.com/podcast/joncockley (200, opened)
11. https://www.creativeboom.com/news/the-state-of-the-creative-industry-2026-what-our-survey-tells-us-about-money-burnout-and-ai/ (200, opened)
12. https://find-and-update.company-information.service.gov.uk/company/07416755/officers (Jon active director since 22 Oct 2010)
13. https://handsomeprovisions.com/ (200, names Handsome Frank as its owner)
14. https://www.creativereview.co.uk/ (It's Archie, AI talent agency, 2026-01-09, news title only, context, not in the message)
pains: 4 judged, AI cutting commissions, new incomes not connected to agency traffic, AI talent agencies as new rivals, fee negotiation pressure
chosen: new incomes not connected to the agency traffic, the fixable route against the costliest pain, commissions lost to AI, biggest and hottest
claims:
the shop isn't in the handsomefrank.com menu and one article links to it, https://www.handsomefrank.com/insights/read/meet-our-handsome-women
office art for Wonderhood and VCCP, https://www.handsomefrank.com/insights/read/handsome-frank-co-curates-art-exhibitions
AI has cost a quarter of illustrators work, https://80.lv/articles/a-third-of-translators-a-quarter-of-illustrators-have-lost-their-jobs-to-ai
recheck: every claim reopened 2026-09-24 late pass. Menu, three ways, raw homepage HTML 0 "provisions" with control instagram.com 1, the rendered link list at 1366 and 390 wide has Home Illustrators Animation About Read Watch Listen Contact and no shop while the Instagram link is found, and the opened hamburger screenshotted. One article links the shop, meet-our-handsome-women, the co-curates article names it without a link. Wonderhood and VCCP both in the co-curates article, dated 2026-05-21. 26% of illustrators "have already lost jobs", 80.lv reopened. 196 prints, newest 2026-09-23. Thesis confidence MEDIUM
```

**Pain table.**

| Pain | Level | Cost to him | Proven | Pay test | Verdict |
|---|---|---|---|---|---|
| AI taking commissions, 26% of illustrators lost work (SoA, Apr 2024) | Industry | His core income, a share of every commission | Yes | Not directly | Costliest, context |
| New incomes, prints and office art, invisible on the site agencies use | Company | The replacement income he's building | Yes, checked with a control | **Yes**, a prints and office art section wired into artist pages | **The angle** |
| AI talent agencies (It's Archie, Jan 2026) | Industry | Pitch competition | News title only | No | Context |
| Fee pressure | Industry | Margin | Weak | No | Park |

**Check A, late pass.** Name search "Jon Cockley" sentOnly 1 contact, "Cockley" myConversations 0,
"Handsome Frank" 1, the same contact. search_campaign_leads, v0.1 only, status done. Thread
re-pulled, connect note only. The 2026-09-21 audit also lists `ctc_nHPaYSqrv7u32oPTY` under
"Connect note only, nothing real ever sent". Grep of state and logs for name, company, both ids
and the hfjon slug finds only backlog lists and the old verdict, no send. Control, Wessel found.

**This overrides an earlier verdict, and Raka should know.** The queue and `CLAUDE.md` both hold
Handsome Frank up as a strong site with no honest angle (NO_STRONG_ANGLE, website only method).
This draft overrides it with the costliest pain method. The site is still strong. The angle is
the new incomes being cut off from it, not the site being weak.

**Weakest points.** That agencies "never see" the prints is inference. Pay test is the soft
spot, a menu link alone is a tiny fix, so the offer has to be the prints and office art
section wired into all 50 artist pages, not the link. The AOI's newer 32%
figure couldn't be opened at source, so the message uses the Society of Authors 2024 figure.

### Jon, OPENER

```
Hi Jon, saw Handsome Frank, looks interesting!

However, your site is missing Handsome Provisions from its menu, and only one article on it links to the shop. This causes the agencies and brands browsing your artists for commissions to leave without seeing the prints, or the office art you've curated this year.

Especially, when you are building new income while AI has already cost a quarter of illustrators work, the agency visits that never see the prints are the buyers you most need.

I run Astra agency. We build websites and apps for brands like Unilever, AXA, Pertamina. I built a food brand from zero with my family and owned how it sold online, so I've seen sales follow wherever the shop shows up.

Shall I send you over what the prints and office art section looks like?
```

---

## The rest, verdicts

- **Simon Wilmes, Snorly.** snorly.de 166 pages (4 rate limited), Shopify, €495 lab direct
  splints, 49 journal articles including a full "when does the insurer pay" guide, the GKV
  question handled head on. A strong content business run by a builder. No costly pain we'd fix.
- **Marjan Verhoeven, Peter van der Leegte Veilingen.** KVK 91835879, Nuenen, owned by Grünholz
  Holding B.V. (91833671), whose owners aren't public, so her co ownership rests on lemlist only.
  petervanderleegteveilingen.nl 87 pages, Joomla, about 15 machines listed with "bel ons", a
  24 hour bid promise. No auction of theirs found online for 2025 or 2026. Nothing costly proven.
- **Hendrik Rolshausen, Prevent.** prevent-app.com, a doctor backed blood test app with its own
  product team. Not our buyer.
- **Yasin Tipiler.** Record says The Sales Academy, tagline and summary say co founder and CEO of
  UGC.NL, the tagline wins. ugc.nl is a creator video ad platform in NL, DE and EN, marketing
  tech, competitor adjacent.
- **Orion D., Omnilabs Research.** A 9.8 KB three section site for a stroke rehab glove, early
  research stage. No buyer yet.
- **Aditya Taneja, Mapler AIx.** mapler.com is now a One.com "under construction" page, not his.
  His real domain is still unknown. Stays BLOCKED.
- **Fabrice Beauchêne, Glyx.** Clinical stage biotech, deals via investors. Stands.
- **Anthony Roux, Lums AI.** lums.ai reads "Lums.ai has closed". DO_NOT_CONTACT.
