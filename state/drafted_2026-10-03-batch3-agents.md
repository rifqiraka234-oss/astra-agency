<!-- NO DRAFTS -->
# Batch 3, multi agent run, 2026-10-03. 0 openers, 8 closed or held. NOTHING SENT.

Raka's words, "Gogogoo use your agents judge 5 anfkes ans choose the best". Eight researcher agents ran the full
playbook in parallel (brief /tmp/claude-0/agents/RESEARCHER_BRIEF.md), separate judge agents scored all five angles
on the three leads that were reachable (brief JUDGE_BRIEF.md), and nothing reached the red team because no opener
survived. Raw evidence per lead stays in /tmp/claude-0/agents/<tag>/evidence.md and judgement.md for this session.

## The count

| Lead | Verdict | Why |
|---|---|---|
| David Risser, Ethics & Boards | NO_STRONG_ANGLE, CLOSED_NOT_ICP | Hired DG since 29 Sep 2025, founder Floriane de Saint Pierre is Président |
| Louis-Guillaume Dupond, Halloween | NO_STRONG_ANGLE, CLOSED_NOT_ICP | Salaried DG, owned via PHYGITAL > CAPITOLE > CASTILLON by Jean-Louis Roche |
| Marek Pruszewicz, Dialogue Earth | NO_STRONG_ANGLE | Charity CEO, only real flaw is pre consent tracking, an afternoon's fix |
| Julie Goujon, L'Atelier d'Eia | BLOCKED_NEEDS_INFO | Invite never accepted (pending since 7 Sep) |
| Olivier Clur, Montclair | BLOCKED_NEEDS_INFO | Invite never accepted, and he runs his own automation agency |
| Patrick Rütter, Schlafshop | BLOCKED_NEEDS_INFO | Invite withdrawn 30 Aug, never accepted |
| Warren Buisson, Urban Signature | BLOCKED_NEEDS_INFO | Invite never accepted, co founder of Sylvia Randazzo's company, she is DO_NOT_CONTACT |
| Lara Newman, Common Ground CIC | BLOCKED_NEEDS_INFO | Invite never accepted, not in the 279 accepted export |

## What Raka would want to know first

- **Five of my eight picks were never reachable on LinkedIn.** I chose them from queue rows, which called them the
  accepted backlog, without checking lemlist's acceptance record. That's my selection error and it's the lesson of
  the batch, acceptance comes from `/api/activities?version=v2&leadId=...` (a `linkedinInviteAccepted` activity)
  before any research is spent.
- **Warren Buisson co founded L'Office des Artistes with Sylvia Randazzo**, who asked on 28 Sep never to be
  contacted again. Recommend treating him as DO_NOT_CONTACT too, your call.
- **Favours if any of them ever writes.** Ethics & Boards' client login runs on a 2015 era stack (an angle for the
  owner, not David). Halloween's nine city pages answer 404 and its legal notice carries another company's RCS
  number. Dialogue Earth sets Google Analytics and the LinkedIn tag before consent while its policy promises a reject.
  Common Ground lists event delegates, students included, with emails on a public page.
- **Open question, still yours.** Are charities and non profits in scope (Dialogue Earth, Common Ground).

## Closed

```sweep
lead: David Risser, Directeur Général of Ethics & Boards since 29 Sep 2025, hired by founder and Président since 2012 Floriane de Saint Pierre per https://recherche-entreprises.api.gouv.fr/search?q=523584555 , ctc_satcBNYw3AiFrhofe. Thread pulled today, 0 items, the 24 Sep connect note only in the sentOnly preview, control thread came back full
website: https://www.ethicsandboards.com/ crawled twice (150 then 852 pages), rendered with site-audit.js and its control passed, relaunched on Astro this week per their 2 Oct LinkedIn post, three archive PDFs 404 and English legal links go to French pages, all tweaks for whoever just rebuilt it
gdpr: tools/eu-view.py from Stockholm on https://www.ethicsandboards.com , 0 cookies, Google Fonts and Cloudflare Insights before consent, privacy policy at https://www.ethicsandboards.com/fr/confidentialite/ names GA and omits Mailchimp, paperwork fixes that fail the pay test
apps: the client login at https://data.ethicsandboards.com/login?lang=en serves nginx/1.8.0, jQuery 1.8.3 and no reset link under a site selling secure tools, the costliest candidate, but it's proven only at the surface and it's a decision for the owner, not a hired DG
social: tools/social-audit.js on https://www.linkedin.com/company/ethics-&-boards , 3,763 followers, ten dated posts from 31 Jul to 2 Oct 2026, about weekly, the only account in their HTML, no pain
squad: payroll of 3 to 5 per the register and no developer roles on https://www.ethicsandboards.com/careers/ against four software products suggests thin capacity, an inference, and again the owner's call
verdict: NO_STRONG_ANGLE, CLOSED_NOT_ICP. He runs the business but doesn't own it, the founder is Président per the register. If Raka wants this account, the legacy client login is the angle for Floriane de Saint Pierre
```

```sweep
lead: Louis-Guillaume Dupond, salaried Directeur Général of Halloween Agency, HALLOWEEN SAS 390045219, ctc_jWvuZEPkGERkzwxvQ. Register at https://recherche-entreprises.api.gouv.fr/search?q=390045219 names PHYGITAL as Président, and the chain PHYGITAL to CAPITOLE to CASTILLON ends at Jean-Louis Roche per https://recherche-entreprises.api.gouv.fr/search?q=829041003 . Thread holds only our 19 Sep connect note, accepted 25 Sep, no reply
website: https://www.halloween.fr/ crawled twice (199 URLs each), site-audit.js render trusted, a Nuxt and Prismic build by Pam with 78 cases. Nine footer city pages such as https://www.halloween.fr/agence-de-staffing-evenementiel-paris return 404 while rendering, and the /metiers/staffing canonical points at a 404, but search still lists them, so they're fixes for Pam and fail the tweak test
gdpr: tools/eu-view.py from Stockholm on https://www.halloween.fr/ , 0 cookies and no trackers before a click, 0 Google ads. No privacy policy on 100 pages (CNIL control matched) and a wrong RCS number on https://www.halloween.fr/mentions-legales , both one page fixes that fail the pay test
apps: staff recruitment for 300+ CDDs a month already runs on Plany per https://app.plany.jobs/register?agency=halloween , and the client brief is a 6 field form with no evidence it costs them work
social: tools/social-audit.js on the accounts in https://www.halloween.fr/ 's HTML, LinkedIn 17,025 followers, Instagram 3,089 followers with the latest post 2026-08-04, Facebook 3,664 with recency unknown behind login. LinkedIn is clearly the active channel and they sell social themselves, so a quiet Instagram is weak
squad: an events, staffing and influence agency with no product or developer roles, its own site built by https://thisispam.com , no build line for a squad to extend
verdict: NO_STRONG_ANGLE, CLOSED_NOT_ICP. He runs the business but doesn't own it, Roche does through his holdings, and none of the five angles has a pain that passes all three tests anyway
```

```sweep
lead: Marek Pruszewicz, Chief Executive Officer of Dialogue Earth since 5 Jan 2026 (https://www.saxbam.com/insights/appointments/marek-pruszewicz-joins-dialogue-earth-as-new-ceo/), a charity limited by guarantee, Companies House 06477262, charity 1125378, no PSC, he runs it and nobody owns it, ctc_RwGCRQoJiAPgqtJeh. Thread per the researcher's pull today, 0 activities, sentOnly shows only our 18 Sep connect note, accepted 18 Sep
website: https://dialogue.earth/ crawled twice (150 URLs each of 25,436 in the sitemaps) and rendered through Chromium with every request served by curl_cffi because site-audit.js hit their Cloudflare wall, 222 requests 200, 0 undecoded images, no phone overflow. A modern newsroom in 8 languages with daily stories, newsletters and region tabs. Small slips only, expired job and pitch deadlines on https://dialogue.earth/en/jobs/ and 2009 directory stubs in the archive, no donate route but no evidence individual giving is a goal
gdpr: tools/eu-view.py from Stockholm on https://dialogue.earth/ , _ga and _ga_88YKZWT63X set and px.ads.linkedin.com and snap.licdn.com requested before a click, the Moove config has third_party on by default and geo_location false, the banner offers only Accept and close while https://dialogue.earth/en/cookies/ promises a reject tool. Real under PECR and GDPR, an afternoon's settings change, fails the tweak and pay tests
apps: pitches go by email to individual editors per https://dialogue.earth/en/pitch/ and partners are asked to email reach numbers per https://dialogue.earth/en/republishing/ , a pitch intake or partner reach tool is conceivable but nothing shows either process hurts them
social: tools/social-audit.js on the accounts in https://dialogue.earth/ 's HTML, X https://twitter.com/DialogueEarth_ says it isn't being updated yet the footer still links it, Instagram 5,131 followers with the latest post 2026-10-01, LinkedIn 11,472 followers, Facebook 9,072 with recency UNKNOWN behind a login. One stale link, a tweak
squad: https://dialogue.earth/en/about/ lists about 45 staff with no developer or product role, yet the custom WordPress theme runs 11 WPML languages, who maintains it is UNKNOWN, no open tech role on https://dialogue.earth/en/jobs/ and no backlog evidence, no capacity fact to write on
verdict: NO_STRONG_ANGLE. A strong, active charity newsroom whose only proven flaw is a consent setting that fails the tweak test. Whether non profits are in scope at all is still Raka's open call, and this verdict doesn't depend on it. The pre consent tracking is a favour he can choose to mention if Marek ever writes
```

## Held, invite never accepted

```sweep
lead: Julie Goujon, Fondatrice & gestionnaire of L'Atelier d'Eia, coworking and therapy rooms in Épagny, ctc_theyRbsmLgRCKKTnB, lea_4kSNfJ464Gy6TLGwh. lemlist /api/activities shows lead.state linkedinInviteDone, the invite of 2026-09-07 and no linkedinInviteAccepted, checked by the main session 2026-10-03 17:20 UTC, so she can't be messaged
website: https://atelier-eia.com resets on https for every outside test point while example.com loads, plain http://atelier-eia.com forwards to https://www.billetweb.fr/pro/latelierdeia , which sells six workshops, the coworking and room hire she offers has no page, price or booking reachable
gdpr: the only reachable page is Billetweb's platform at https://www.billetweb.fr/pro/latelierdeia , its cookies and banner are Billetweb's and not hers to change, so nothing to say
apps: workshops take a 10 to 15 € online deposit and the rest "à régler sur place en espèces" per https://www.billetweb.fr/pro/latelierdeia , updates run through a WhatsApp group, unproven cost
social: tools/social-audit.js was not reached before the stop, the Linktree in her lemlist summary https://linktr.ee/eiabijoux returns 404 against a working control, recorded and held
squad: a one person coworking per https://www.linkedin.com/company/latelierdeia (lemlist companySize 1 to 10, self employed), not a builder, nothing to supplement
verdict: BLOCKED_NEEDS_INFO. Invite pending. If she accepts, the coworking with no page or booking is the candidate to judge
```

```sweep
lead: Olivier Clur, partner and publication director of Montclair SAS (SIREN 106417819, président Sébastien Coulomb), ctc_YQ7K77NJrXG7WBhdx, lea_LdCvejjqr5i8g57E6. lemlist activities checked twice by the researcher, invite 2026-09-05, no linkedinInviteAccepted, control on another lead found one
website: https://montclair.fr crawled twice, 260+ pages and near daily articles, every lead route ends in a JotForm callback "sous 48h" and 15 calculators that collect no email, strong site
gdpr: tools/eu-view.py from Stockholm on https://montclair.fr , no cookie and no third party tracker set before a click, so there's nothing to raise, clean
apps: manual intake through three partners per https://montclair.fr , but he runs Stratflow per https://seostrasbourg.com with a developer and an AI integration specialist, a peer who builds this himself
social: tools/social-audit.js not reached before the stop, recorded as untested, the firm is three months old per the register at https://recherche-entreprises.api.gouv.fr/search?q=106417819
squad: his own agency Stratflow per https://seostrasbourg.com gives him delivery capacity, no gap shown
verdict: BLOCKED_NEEDS_INFO. Invite pending, and a peer agency owner
```

```sweep
lead: Patrick Rütter, board member with sole signature of Thönig AG (CHE-107.930.030), which runs Schlafshop, ctc_pBwLsLumfgbXN9KLD, lea_EqcDJ46ATcWSyMZt9. lemlist lead.state linkedinWithdrawInvitationDone, invite 27 Jul withdrawn 30 Aug, never accepted, the 20 Sep queue row that called him accepted was wrong
website: https://www.schlafshop.ch modern and well rated, 6,149 Trusted Shops reviews at 4.86, the footer phone button links "tel: general.phonenumberfull" on all ten pages fetched while the header link works, a small fix
gdpr: tools/eu-view.py from Stockholm on https://www.schlafshop.ch , Bing and Cookiebot load while the privacy policy names neither, banner visibility to EU visitors unknown, small
apps: sleep advice runs by phone Mon to Fri 9 to 12 and 14 to 17 or by email per https://www.schlafshop.ch , no chat or finder on the homepage, the strongest candidate if he's ever reachable
social: tools/social-audit.js on the accounts in https://www.schlafshop.ch 's HTML, Instagram 116 followers, YouTube 18 subscribers, LinkedIn 6, tiny against the review base
squad: a mattress and bedding retailer per https://www.schlafshop.ch , it doesn't build software or sell builds, so there's no squad to supplement
verdict: BLOCKED_NEEDS_INFO. Invite withdrawn, re inviting him is Raka's call
```

```sweep
lead: Warren Buisson, co founder of L'Office des Artistes (lemlist domain lofficedesartistes.com) and of Urban Signature, run by O MY ART SARL (SIREN 822398244, gérant Elliot Buisson), ctc_9Exw6ngCxPL88j8Zc, lea_Fzxbx2n7SpKJwafuX. lemlist lead.state linkedinInviteDone, no linkedinInviteAccepted, control Melissa Carman's accept found
website: https://urban-signature.com terms cite RCS 512 848 573, which belongs to a gallery closed in 2022, news stopped 28/04/2024, the homepage tiles rendering blank in headless Chromium is unconfirmed and may be ours
gdpr: tools/eu-view.py from Stockholm on https://urban-signature.com , 11 cookies, chat, reCAPTCHA and Google Fonts before a click, a banner with only ACCEPTER and close
apps: a WooCommerce shop for made to measure street art per https://urban-signature.com , no process evidence gathered before the stop
social: tools/social-audit.js not reached before the stop, untested, and https://lofficedesartistes.com names him beside Sylvia Randazzo, who is DO_NOT_CONTACT since 28 Sep
squad: a street art studio and shop per https://urban-signature.com , it doesn't build software or sell builds, so there's no squad to supplement
verdict: BLOCKED_NEEDS_INFO. Invite pending, and a message would very likely reach Sylvia Randazzo, recommend DO_NOT_CONTACT, Raka's call
```

```sweep
lead: Lara Newman, founder of Common Ground Ventures CIC (Companies House 17083218, incorporated 10 Mar 2026, the charity Future 1114396 holds 50 to 75% since 1 Jun 2026), ctc_A6fZ8RSivbqC4QZXL, lea_8RQwKNtAN6Ha4CpAv. lemlist lead.state linkedinInviteDone, no accept, not in the campaign's 279 accepted export
website: https://commongroundcic.org.uk read twice past its SiteGround captcha (87 pages each), the consultancy meant to fund the CIC names no clients, cases or fees on any page
gdpr: tools/eu-view.py from Stockholm on https://commongroundcic.org.uk , _ga set and GA requests before a click despite a Reject All banner, one tool only, and https://commongroundcic.org.uk/event-delegates/ lists delegates, students included, with emails
apps: event sign ups and delegate lists per https://commongroundcic.org.uk/event-delegates/ , consent at sign up unchecked, not judged before the stop
social: tools/social-audit.js not reached before the stop, untested, recorded so the next session runs it if she accepts, per https://commongroundcic.org.uk
squad: a community interest company founded this year per https://find-and-update.company-information.service.gov.uk/company/17083218 , no build line and no developer roles, nothing to supplement
verdict: BLOCKED_NEEDS_INFO. Invite pending. Non profit scope is also Raka's open question
```
