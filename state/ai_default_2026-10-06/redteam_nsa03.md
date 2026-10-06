# Red team, nsa03 nudges, 2026-10-06

Red team only. Nothing sent, no lemlist write calls, repo untouched.

**What was run this pass (06:44 to 07:05 UTC, 2026-10-06)**
- `get_inbox_conversation` on all four contactIds, page 1, `nextPage` null on all four, `totalItems` 1 each, LinkedIn sync `synced`/`recent` 06:46:13Z. Positive control in the same minutes, Lars Tibben `ctc_8HL4vo9cA55Yugaav`, came back with all 3 known messages. So "one message, no reply" is a real negative for all four.
- Every quoted page fetched twice by two methods, raw curl (HTML stripped to text) and a fresh Playwright Chromium render (`innerText` plus full page screenshot, scrolled, networkidle). Control in the same run, wikipedia.org 200 and google.com 200. All 17 pages returned 200.
- Counter evidence hunts below per lead, plus two web searches (bsport waitlist, Xero month end agent) and two register reads (Companies House 14329535, recherche-entreprises SIREN 992192559, which failed once through the proxy and succeeded on retry).
- `python3 tools/check-drafts.py nsa03.md` PASS on all four. Mechanical count, 0 colons, 0 money figures, contractions present in all four, one hyphen (in "Richard-Gabriel", see that section).

| Lead | Verdict |
|---|---|
| Anu Pitman | **KILL** |
| Simon Chuinard | **KILL** |
| Mykyta Kharchenko | **FIX** (one sentence) |
| Richard-Gabriel Cuzic | **KILL** |

---

## Anu Pitman, ctc_YR7cc276Goo7Fdi2F

| Sentence or claim | What I opened | Result | Why |
|---|---|---|---|
| "back in August I wrote about showing your credentials and making it easy to book a call" | Thread, get_inbox_conversation 06:46Z | HOLDS | 2026-08-31T15:31Z, "it never shows you're FMAAT and Xero certified, and there's no easy way to book a first call". Only message, no reply |
| "Both are live now." | /about/ and /contact/ curl plus Chromium render, homepage both ways | WEAK | /about/ carries "AAT Licenced Accountant badge", "Xero L3 Certified Specialist", "Xero Tax Specialist", "Quickbooks Level 2 Proadvisor" and licence 1004084. /contact/ "Make an appointment" goes to `https://calendly.com/ap-accountancy/meetme` (200). But the homepage text has 0 mentions of AAT, FMAAT, Xero or an appointment, and our August note asked for them "right up front". True on inner pages, not where we said. The gate itself lists "(3) the homepage still leaves the credentials out" |
| "Your About page says your clients get monthly management accounts and a real conversation about their numbers all year" | /about/ both methods | HOLDS | "My clients get monthly management accounts, proactive tax planning, and a real conversation about their numbers throughout the year". Fair paraphrase. Note the Foundation plan on /growth-plans/ only promises "A quarterly strategic cash-runway review call", so "every client" monthly is her About copy, not her packages |
| "you're the one doing all of them" | /privacy/ "Legal status: Sole trader", /about/ first person | HOLDS | Though /about/ also says "WHO WE WORK WITH" |
| "Each client you add is another month end on your hours." | nothing can source it | WEAK | Inference, client count not public. And she sells hours, so more clients is the goal, not the pain. Likely "so what" |
| Offer, "the AI month end workflow for your practice" | /growth-plans/, /about/ image alts, web search Xero JAX / XeroForce | **FALSE as an angle** | Counter evidence the gate missed. She's a **Xero L3 Certified Specialist** and **QuickBooks Level 2 ProAdvisor** (image alts on /about/), and her own plans sell "Complete oversight and design of your internal financial workflow", "Advanced apps integrated to sync your inventory or CRM seamlessly", "Custom live dashboards", "Receipt capture apps set up to completely eliminate paper sorting". She sells workflow automation. And Xero itself announced a XeroForce **month end agent** at Xerocon US, August 2026, that "automate[s] a workflow practices must tackle each month across each client" (accountingtoday.com, blog.xero.com, CPA Practice Advisor). We'd be offering a Xero specialist the thing her main vendor just shipped to her |
| Ownership | /privacy/ | HOLDS | Sole trader, she is the business |
| Writing | mechanical check | HOLDS | 0 colons, 0 dashes, 79 words. "A new thought." is a fragment pivot, minor |

**Verdict, KILL.** Every fact holds, the angle doesn't. The nsa03 file already killed A for IOTENTIC and Buynidify because they sell automation and AI. Anu sells cloud workflow, app integration and dashboards to her clients and is certified on the platform that launched a month end agent eight weeks ago. Same rule, same result. If Raka wants a touch, the honest remaining point is the homepage still not showing the badges, and that's the same criticism as August, which RULES 1B says isn't sent twice. Leave her.

**Most likely pushback.** "I'm a Xero L3 specialist, my month end already runs on Xero and its apps."

---

## Simon Chuinard, ctc_QdhtaeDvqahLSQcSM

| Sentence or claim | What I opened | Result | Why |
|---|---|---|---|
| "in September I wrote about booking" | Thread 06:46Z | HOLDS | 2026-09-02T18:41Z, "there is no timetable, no prices and no real online booking, the Reserver button just goes to a login". Only message, no reply |
| "bsport is live on the site now, so that's sorted." | /reserver/ Chromium render (widget text read), curl HTML | HOLDS | `bsport-widget-584013`, `bsport.io/scripts/widget.js`, rendered week grid "Mon 05/10 - Sun 11/10" with live classes |
| "Your annual memberships are full" | /nos-tarifs/ both methods | HOLDS | "Nos abonnements sont actuellement complet." |
| "the waitlist is a Google Form that promises to contact people when a place frees up" | forms.gle/HDCN2gZEbaexttGA6 curl, resolves to docs.google.com/forms | HOLDS | "Je donne mes coordonnées afin de rejoindre la liste d'attente et être contacté lorsqu'une place pour un abonnement se libère". Fields, name, email, phone, 4 or 8 séances, contact by phone or email |
| "So every freed place sits empty while someone works through that list by hand." | /reserver/ rendered bsport timetable, counted | **FALSE** | Nothing sits empty. Of 20 classes visible this week, **15 show 5/5 and "WAITLIST"**, one 4/4, only four have spaces. The studio is out of reformers, not short of members. And bsport already runs class waitlists itself (bsport "Smart Waitlist", "when someone cancels, the next eligible member is moved from the waitlist into the class", pro.bsport.io, bsport help centre). An annual membership is a 12 month commitment ("L'abonnement est souscrit pour une durée de 12 mois"), so a freed place is a rare event, and filling it is one phone call to the top of a short list. "Sits empty" is the sentence Simon would know is wrong the moment he reads it |
| Offer, "the AI waitlist workflow that refills your memberships" | as above | WEAK | Fixes a problem the timetable shows he doesn't have. His real constraint is capacity, two coaches and one room, and that isn't ours to fix |
| Ownership | recherche-entreprises SIREN 992192559, read 07:0xZ (one proxy reset, retry OK) | HOLDS | LE STUD SAS, created 2025-10-01, active, sole dirigeant SIMON CHUINARD, Président de SAS |
| Writing | mechanical | HOLDS | 0 colons, 0 dashes, 71 words. "Something new." fragment pivot, minor |

**Verdict, KILL.** The facts are right and the conclusion drawn from them is false on his own booking page. A studio with 15 of 20 classes full and on bsport's own waitlist doesn't lose money on a waitlist form. Full memberships are good news he's proud of, and the nudge turns it into a fault we invented. No other angle in the gate survives (demo posts are a cleanup, the GDPR view was never run). Leave him.

**Most likely pushback.** "Nothing sits empty, every class is full, that's why there's a waitlist."

---

## Mykyta Kharchenko, ctc_2gRN4DKWsstCjknF6

| Sentence or claim | What I opened | Result | Why |
|---|---|---|---|
| "in September I suggested we might overlap on the software layer" | Thread 06:46Z | HOLDS | 2026-09-05T09:38Z, "There might be an overlap on my side, I run an agency that builds the software layer around that kind of work". Only message, no reply |
| "Your founders page calls IOTENTIC a company working worldwide" | /founders/ curl and Chromium render | HOLDS | "IOTENTIC ist ein inhabergeführtes, unabhängiges und weltweit tätiges Unternehmen für industrielle Digitalisierung und intelligente IoT-Lösungen." |
| "your careers page reaches as far as gigafactories" | /karriere/ curl and render | HOLDS | "von Smart Manufacturing und Industrial Automation über IT/OT-Integration bis hin zu Traceability und Gigafactories." |
| "but the text on every page is German" | All 15 sitemap URLs (wp-sitemap-posts-page-1.xml) curled and word counted, homepage, founders, karriere, mk, 2026-07-14-news rendered, `<html lang="de">` on every render | WEAK, needs a word | Body copy is German on all 15 (English function words 0 or 1 per page, German 16 to 69). But the site has English headlines, the hero reads "From automation to innovation – shaping tomorrow today." (screenshot opened), founders "We share expertise, not just solutions.", karriere "Shape the future of Industry 4.0.". He'll point at those |
| "English doesn't appear except as a Google machine translation, after a visitor accepts it." | Homepage HTML | WEAK as worded, true in substance | The translator is real, `websiteTranslatorSettings` `"default_language":"de","languages":["en","de"],"url_structure":"none"` loading `translate.google.com/translate_a/element.js`, with "Wir benötigen Ihre Zustimmung zum Laden der Übersetzungen ... akzeptieren Sie den Dienst, um die Übersetzungen zu sehen." But "doesn't appear except" is false while the English slogans are on screen |
| Counter hunt, any English version | en.iotentic.com (proxy 502, our side, not evidence), www.iotentic.com/en/ 404, iotentic.de TLS alert (our side), sitemap 15 URLs with no /en/ or hreflang, 0 PDF links in any page | HOLDS | No English subdomain, path, hreflang or PDF found. The two failed hosts are proxy failures and prove nothing either way, so the claim must stay about iotentic.com only, which it does |
| Ownership | /impressum/ curl | HOLDS | "Handelsregister: HRB 803500 Registergericht: Amtsgericht Stuttgart Vertreten durch: Florian Fries Muhammad Sohaib Nazir Mykyta Kharchenko". /mk/ rendered, "Mykyta Kharchenko, Managing Director & Founder" |
| Offer, "the English site that wins international manufacturers" | logic | WEAK, keep | Matches block two (German only, worldwide claim). "Wins" overpromises, and that foreign buyers are lost is inference. Their partners (FORCAM ENISCO, Cybus, VDW umati) are German, so the worldwide claim is theirs, not evidenced by foreign clients |
| Writing | mechanical | HOLDS | 0 colons, 0 dashes, 71 words, "Here's", "doesn't" |

**Verdict, FIX.** Replace the middle paragraph with

```
Your founders page calls IOTENTIC a company working worldwide, and your careers page reaches as far as gigafactories, but past the English headlines every page is written in German. The only English version is a Google machine translation that loads after a visitor accepts it.
```

and soften the offer to "Shall I send you over what an English version for international manufacturers could look like?" so it doesn't promise a win. Still flag for Raka that it's a website pitch to someone we approached as a peer, which is a tone change.

**Most likely pushback.** "Our customers are German Mittelstand, English isn't the bottleneck."

---

## Richard-Gabriel Cuzic, ctc_pAPukszq8MBpRfYrT

| Sentence or claim | What I opened | Result | Why |
|---|---|---|---|
| "in September I asked how Switalk was going" | Thread 06:46Z | HOLDS | 2026-09-05T09:38Z, "How is Switalk going, still talking to users or already building?" Only message, no reply. **But the same message calls Switalk "an inbox plus CRM for solopreneurs"** |
| "Your site aims to give every Guidance Finder request a human review within one working day" | /how-it-works curl and render | HOLDS | "Human response aim / Within one working day", "RSG reviews the information you provided.", "Automated acknowledgements do not count as a human response." |
| "across twelve destinations" | /apply rendered and curl | HOLDS, with care | The rendered page only shows 7 destination guides (UK, US, Canada, Australia, Germany, Ireland, Dubai). The 12 are the tick boxes inside the Guidance Finder form ("Which destinations are you open to? United Kingdom ... Malaysia Singapore"), counted 12 in the raw HTML. Fair, but it's the destinations a student may tick, not twelve desks |
| "the About page names you as the first point of contact" | /about/ curl and render | HOLDS | "Richard Gabriel Cuzic / Founder and first point of contact at Ready Study Global." Note **no hyphen** in his own site's spelling |
| "So that first review's what caps how many students you can take on." | nothing can source it | **WEAK, close to FALSE** | Pure inference with signals against it. Instagram 16 followers, LinkedIn 138 (from the gate), company since 2022 with no named advisors and no volume signal anywhere. Nothing says he's turning students away. And "review's what" is an awkward contraction that reads like a typo |
| Offer, "the AI first review workflow for RSG" | /how-it-works, /about, footer on every page | **FALSE as an angle** | The whole brand is the human. Footer on every page, "Human guidance for international applicants and UK residents exploring university routes.", and the process record explicitly says "Automated acknowledgements do not count as a human response." An AI first review attacks the one thing his site promises. And per our own September message he co-founded Switalk, an inbox plus CRM for solopreneurs, so he's building the category of tool we'd pitch |
| Counter hunt, AI or CRM in use | raw HTML of 4 pages grepped for HubSpot, Zoho, Pipedrive, Salesforce, Airtable, Tally, Typeform, Zapier, Make, n8n, OpenAI, Intercom, Crisp, Brevo, Mailchimp | n/a | Only Formspree on /apply (the form backend). No CRM or AI visible, which doesn't rescue the angle given the two points above |
| Ownership | Companies House 14329535 officers, curl 07:0xZ | HOLDS | "Officers: 1 officer / 0 resignations CUZIC, Richard-Gabriel ... Active Director ... Appointed on 1 September 2022" |
| Writing | mechanical | WEAK | The only hyphen across all four drafts is in "Richard-Gabriel". Companies House hyphenates it, his own About page doesn't. If anything is ever sent, use "Richard Gabriel" as his own site writes it, which also clears the dash ban |

**Verdict, KILL.** The facts hold, the logic doesn't. We'd be offering to automate the step his site sells as human, to a founder co-building an inbox and CRM product, with no sign he has more enquiries than he can handle. The likely read is "you didn't read my site" or "we're building that". Leave him, or if Raka wants a touch, go back to the peer thread about Switalk that we opened in September, not a pitch.

**Most likely pushback.** "The human review is the point, it's what the site promises."

---

## The lines to fix or that are false, in one place

- Anu, the offer. She's a Xero L3 specialist selling workflow automation, and Xero shipped a month end agent in August 2026. "Both are live now" is only true off the homepage.
- Simon, "every freed place sits empty". 15 of 20 classes this week are 5/5 on bsport's own waitlist.
- Mykyta, "the text on every page is German" and "English doesn't appear except as...". English headlines are on the page. Reword as above.
- Richard-Gabriel, "that first review's what caps how many students you can take on" is unsupported, and the AI offer contradicts "Automated acknowledgements do not count as a human response" and his Switalk inbox plus CRM work.
