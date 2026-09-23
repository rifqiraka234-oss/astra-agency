# SotoCat research, 2026-09-23

For the SotoCat website prototype and the companion analysis deck. Every claim below was
fetched, rendered or clicked on 2026-09-23 unless it says otherwise. Screenshots live in the
session scratchpad under `soto/shots` and `soto/clear`, and the deck carries the ones that matter.

## The thread, loaded in full (6 activities, nextPage null)

| When | Who | What |
|---|---|---|
| 15 Sep 21.45 | us | generic connect note |
| 16 Sep 08.33 | us | opener, site down (500, missing MySQL extension). Offer: "my version of the SotoCat homepage, with a tenant request actually moving through it" |
| 21 Sep 23.59 | Sergey | "Thanks Raka" |
| 22 Sep 06.50 | us | reply, site back, "The pricing page and the savings calculator are doing real work, there's nothing I'd touch", landlord research is a second product |
| 22 Sep 21.47 | Sergey | "Thanks Raka" |
| 22 Sep 21.52 | Sergey | "Please show me your projects." |

**Promise to honour.** A SotoCat homepage with a tenant request actually moving through it.
**His ask.** Our projects.

## The person

- **Sergey Shalunov**, CEO and Founder, SotoCat. lemlist `ctc_Puf9L7o8nDTyDNn2Q`, title "CEO & Founder".
- Measured on: getting the first agencies onto a paid subscription, and deciding the next product.
- Business he OWNS is the one he runs. No second employer.
- Background from his own team page: "Over 20 years' experience in real estate development ...
  including Greenland Residence in central Dubai. Founder and product logic architect behind
  AI-based solutions for the property sector."
- His own post, 27 Apr 2026, "I Am SotoCat. The New Chapter.": PropCat is closing "because we
  could no longer reconcile different views on where the project should go next", and SotoCat
  "grew out of PropCat". Partners named there: Alex Beliaev, Denis Akopov.

## Statutory record

- **SOTOCAT LIMITED, 17067432.** Incorporated 3 March 2026. Registered office Cleland House,
  32 John Islip Street, London, England, SW1P 4FF. SIC 62012. One officer, Sergey Shalunov,
  appointed 3 March 2026. Share capital £100. First accounts due 3 Dec 2027.
- Certificate of incorporation: "The Registrar of Companies for England and Wales", situation
  of registered office "England and Wales".
- **PROPCAT LIMITED, 15785231.** Incorporated 18 June 2024, 86-90 Paul Street, London EC2A 4NE.
  Status "Active, Active proposal to strike off". Confirmation statement overdue. Officers
  Denis Akopov and Sergey Shalunov.

## What a visitor sees today (rendered in Chromium, desktop 1440 and phone 390)

1. **A landlord research card over every page except the blog.** Home, pricing, team, contacts,
   FAQ, support, apps, call and the development page all carry `.sotocat-page-overlay`. The page
   underneath is blurred.
   - Proven three ways. (a) The plugin code, `sotocat-survey/assets/js/survey.js` ver
     1.4.8.1783087148 (built 3 Jul 2026 13.59 UTC): the overlay starts visible, its blocker
     swallows every click except the survey button, and closing the survey calls
     `pageOverlay.show()` again, so there is no way off it. (b) `document.elementFromPoint` on
     "Book a Demo" and on the "Our pricing" nav link returns `DIV.sotocat-page-overlay__blocker`
     on every overlaid page. (c) A real mouse click on the nav and on Book a Demo left the URL
     at https://sotocat.com/ with one tab open.
   - It is deliberate. Wheel scrolling is forwarded so the blurred page still scrolls. The
     survey config carries a meta note that it "describes SotoCat's current research direction
     and may differ from the public website". That config is marked confidential, so nothing
     from it beyond the public card text goes into the deck.
   - Public card text: "SotoCat is currently conducting independent landlord research. We are
     speaking with self-managed landlords, portfolio landlords and landlord organisations about
     tenancy admin, compliance, legal support and day-to-day rental issues." Button: "I'm a
     Landlord or Work With Landlords, Take the 5-6 Minute Survey".
   - Byte size of the homepage on 22 Sep (recorded in our queue row) was 200,925. Today it is
     200,925. So the wall was almost certainly up when our 22 Sep reply said "there's nothing
     I'd touch". That reply was written from HTML, not a render.
2. **The sign up path ends nowhere.**
   - "Create Account", "Sign In" and the contractor "Sign Up" go to `/development/`, title
     "Page Under Development", body "We're currently finalising the information for this page."
   - "Try 90 Days for £0" and "Get Started" go to `/portal/`, which returns **404** (curl and
     Chromium both).
   - Footer "Guides" goes to `/guides/`, **404**.
   - `/apps/` reads "App Coming Soon ... will be available soon on the App Store and Google Play",
     while the homepage and footer show App Store and Google Play badges with QR codes.
   - Working: "Book a Demo" goes to Calendly, https://calendly.com/shalls/sergey-shalunov-meeting-room
     (only reachable if the overlay were not there). Request a Call form on the homepage and /call/.
3. **Underneath the blur (overlay hidden with the plugin's own `hide()`, CSS intact).**
   - Dark, DM Sans, Apple system blue `#0a84ff`, YOOtheme on WordPress 7.1.2 with AIOSEO.
   - No headline. The first text is a paragraph, "SotoCat AI handles both technical and
     non-technical tenancy concerns ...". The first H1 on the page is "90-day free trial".
   - Stats with no source: 70% Faster Resolution, 50% Agency Cost Reduction, 95% Tenant
     Satisfaction, 24/7 "AI Availibality" (sic).
   - Savings calculator, sliders for units (10 to 1K), average salary (£25K to £60K) and
     managers (2 to 20). With 200, £35,000, 5 it renders annual savings £81,980, time freed 100h
     a week, monthly cost £460, £2.30 a unit, without £175,000 against with £93,020. Maths:
     without = managers x salary, with = half of that plus units x bracket price x 12. So the 50%
     is an assumption baked in, the same 50% as the stat. The static HTML fallback shows £64,480,
     £140,000 and £75,520, which is four managers, so the no JS text disagrees with the slider.
   - Seven step workflow, their words. 1 Tenant reports issue via app. 2 AI diagnoses and
     creates job ticket (computer vision and NLP). 3 Contractors submit quotes and availability.
     4 SotoCat evaluates and agency approves (*future iterations). 5 SotoCat coordinates visit
     scheduling. 6 Performance monitoring and feedback. 7 Follow up and complete resolution
     (*future iterations).
   - "Who benefits": agencies, contractors, landlords, tenants, four equal cards.
   - "How to get started": agency (any CRM, "Full integration with CRM Reapit is coming soon"),
     contractor, landlord ("Our version for independent landlords is coming soon, leave your
     details here"), tenant.
   - One product image, a ticket list (Tickets, Chats, Tenancies, Contractors, statuses Order
     Estimation, Quote Submitted, Scheduling, In Progress) beside a phone chat where a boiler is
     fixed by a reset with no contractor. The same composite is served six times at different
     sizes.
   - Team page: "A top-tier team with numerous specialists ..." and one person shown, Sergey,
     with a black and white portrait.
   - FAQ contradicts pricing ("you still have a 30-day free trial period" against 90 days), still
     says "We plan to launch SotoCat around the third quarter of 2025", says "saving up to 75% of
     man-hours", and "We comply with GDPR standards".
   - Pricing page, eight brackets per unit a month: 1-99 £2.50, 100-199 £2.40, 200-299 £2.30,
     300-399 £2.20, 400-499 £2.10, 500-699 £1.90, 700-999 £1.80, 1,000+ £1.65. Worked example
     124 units, £297.60 a month excluding VAT (124 x 2.40, checks). "Calculated daily."
   - Call back time slots offered: 10-11, 11-12, 12-13, 13-14, 14-15, 16-17 (no 15-16).
4. **Legal identity.** Terms of Use: "registered office is 86-90 Paul Street, London, England,
   EC2A 4NE. Our company registration number is 15785231." That is PROPCAT LIMITED, which carries
   an active proposal to strike off. SotoCat Limited's own number 17067432 and Cleland House
   office appear on no page fetched (home, pricing, team, contacts, faq, support, call, apps,
   development, privacy, terms, blog, four posts). Positive control: the same grep finds
   17067432 in the Companies House page. Regulation 25(1)(c) of SI 2015/17 requires a company
   to disclose its registered number, office and part of the UK on its websites.
5. **Consent.** No click made, fresh profile. The `cookieyes-consent` cookie reads
   `consent:no ... analytics:no`, and in the same load Google Analytics POSTs `g/collect` for two
   properties (G-D09EWFM29D, G-72202PN3LZ) and Contentsquare POSTs a pageview. Cookies `_ga`,
   `_ga_*`, `_cs_c`, `_cs_id`, `_cs_s` are set. Two independent methods: site-audit cookie jar,
   and a separate request log.

## What the company is aiming at, in their own published words

| Goal | Where it is stated |
|---|---|
| Agencies onto a paid subscription after a 90 day free trial, billed per unit | Pricing page. Stripe post: "Stripe is part of the infrastructure behind SotoCat's subscription model" |
| A contractor marketplace, two sided | Workflow step 3, contractor "Join the SotoCat Marketplace" |
| Reapit integration | "Full integration with CRM Reapit is coming soon" |
| A product for self managed landlords | "Our version for independent landlords is coming soon", plus the live research card |
| Visible time savings | Blog, 27 Apr: "It needs something much simpler: visible time savings." |
| No dashboard as the destination | Blog, 12 May: "The best interface is no interface ... The work should simply move. Captured. Understood. Routed. Priced. Tracked. Resolved." and "the dashboard is not the destination. It is a transitional fossil." |

## Market, fetched 2026-09-23

- Fixflo, H1 "Successful repairs & maintenance starts here". Described across 2026 comparison
  posts as the UK market leader in repairs reporting, with its Aidenn AI for diagnosis.
- Lanten, H1 "The intelligent inbox for estate & letting agents", CTA "Book a demo".
- Latch, H1 "Free all-in-one landlord software for UK landlords", CTAs "Start Free Trial",
  "Get Started for Free", "Book a Demo". A free incumbent on the landlord side.
- Every one of the three puts a working demo or start button in the first screen.

## The so what ladder

| Rung | SotoCat |
|---|---|
| Defect | The landlord survey sits over every page and swallows clicks, and the sign up links end at a 404 and an under development page |
| So what | An agency, the only buyer with a price list today, cannot book a demo, start the trial or sign up from the site |
| So what | SotoCat is six months old and needs its first paying agencies, in a market where Fixflo, Lanten and Latch all let a visitor start in one click |
| **So what** | **SotoCat is turning into two products and the website can only show one at a time. It switches between them with a blur. Each agency that cannot start is, at SotoCat's own worked example, £297.60 a month from the end of its trial.** |

LOSS FIGURE. Metric forgone, one agency subscription. Inputs, both published by SotoCat on
/our-pricing/: 124 units, £2.40 a unit (100 to 199 bracket), £297.60 a month excluding VAT,
their own worked example. No conversion rate, no traffic figure.

## Portrait

Sergey's portrait sits inside his own card on sotocat.com/team/, name beside it. Used only if
`tools/verify_portraits.py` passes on that page.

## Sources

- https://sotocat.com/ and every page named above, fetched and rendered 2026-09-23
- https://sotocat.com/wp-content/plugins/sotocat-survey/assets/js/survey.js?ver=1.4.8.1783087148
- Companies House 17067432 overview, officers, filing history and certificate of incorporation
- Companies House 15785231 overview and officers
- https://www.legislation.gov.uk/uksi/2015/17/regulation/25/made
- Blog posts: i-am-sotocat-the-new-chapter, the-dashboard-is-not-the-future-it-is-the-apology,
  sotocat-is-joining-stripe-tour-london, real-estate-will-not-resist-language-models-for-long
- lanten.ai, uselatch.co.uk, fixflo.com homepages

## Art direction, decided before any HTML

**Concept sentence.** One real repair travels the whole site by itself, and the site is
paced by SotoCat's own six verbs from the 12 May post, Captured, Understood, Routed, Priced,
Tracked, Resolved, because Sergey's thesis is that the work should move and the dashboard
is the apology.

Layers it controls (six, the spec asks for five).
1. **UI demonstration.** The hero is a request moving, a chat and a ticket advancing through
   the six verbs, never a dashboard screenshot.
2. **Navigation.** The product section carries a sticky rail of the six verbs that lights
   up as you scroll.
3. **Motion.** Things advance, they don't float. Status chips tick forward, a progress line
   fills, nothing bounces.
4. **Copy voice.** Short declaratives in his register, borrowing his own lines with credit.
5. **Iconography and colour.** Status chips reuse the four pastel states from SotoCat's own
   ticket UI (Order Estimation, Quote Submitted, Scheduling, In Progress).
6. **Composition.** Two front doors from the first screen, agencies and landlords, and
   neither blocks the other.

**Adjectives, with evidence.** Unbothered ("let the machine quietly handle the boring
parts", 12 May post). Blunt ("The Dashboard Is Not the Future. It Is the Apology."). Exact
(eight price brackets "calculated daily", computer vision and NLP in step 2).
**Anti adjectives.** Cute, busy, magic.

**Type.** DM Sans only, variable, self hosted. It is the face SotoCat already ships in its
CSS, so brand continuity is evidence based. Tabular numerals for prices and ticket ids. No
serif and no mono micro labels, which is the recipe C2 and C3 warn about and which the last
three Astra builds leaned on.

**Colour.** Near black `#0b0b0c` and `#141416` from their CSS, Apple blue `#0a84ff` which
they already use 23 times, logo cyan `#20BBDD` as the second accent, light sections on
`#f5f5f7` which is also in their CSS. Pastel status chips from their product UI.

**Collision check.** Last three Astra builds: WisTree warm paper with orange and a mono
system, Revios pale teal with Jakarta and Inter, Zenara cream and matcha with a serif. This
build shares none of palette, type archetype or label treatment.

**References fetched and screenshotted 2026-09-23.** apple.com/uk/iphone (light and dark
rhythm, rounded cards, footnoted numbers), linear.app (two tone headline, product as hero),
stripe.com/gb (bento of real UI, stat row), fin.ai (numbered sections, the AI shown working),
attio.com (workflow node diagram, live product panels).

## Photography, all Unsplash License, none captioned as SotoCat's staff, customers or premises

| File | Unsplash id | Use |
|---|---|---|
| leak | 1596394723269-b2cbca4e6313 | tenant's photo inside the example chat |
| sink | 1676210134188-4c05dd172f89 | contractors, blue lit plumber |
| bath | 1749532125405-70950966b0e5 | contractors page |
| street | 1512359953714-f0c9a632ab85 | landlords, painted terrace |
| mansion | 1694501522559-980c07631b21 | agencies, mansion block street |
| mews | 1510265119258-db115b0e8172 | closing band |
| manager | 1758876017967-c023c40c0a53 | the manager as a human router |
| desk | 1663767117072-a97deef95956 | request a call |
| keys | 1741156386380-0236c72eb6f9 | landlords |
| tenant | 1718866033984-c3ddab9af2a0 | tenants card |
| sofa | 1758598497259-b51e6ed6c73c | tenants |
| drill | 1646640381839-02748ae8ddf0 | contractors card |
| damp | 1637847522219-ef24dd4445fe | spare |

SotoCat's own assets used as theirs. The product composite `sotocat-9a1fb607.webp`, the logo
SVG from the survey card, the mark SVG, DM Sans.

## Added during the build: the cookie banner can't be answered (2026-09-23)

The survey layer also sits on top of the cookie banner, so a visitor cannot accept, reject or
customise cookies on any overlaid page. Proven three ways.

1. `document.elementFromPoint` at the centre of Reject All, Accept All and Customise returns an
   element of `.sotocat-page-overlay` (dock, card, disclaimer or button label) at 1920x1080,
   1440x900, 1280x800 and 390x844.
2. Playwright's actionability click on `.cky-btn-reject` times out at all four sizes, reporting
   that `.sotocat-page-overlay` intercepts pointer events.
3. A raw mouse click at the Reject All coordinates at 1440x900 left the `cookieyes-consent`
   cookie unchanged (`consent:no, action:` empty) and the banner still showing, while the page
   had already sent `g/collect` to Google Analytics for G-D09EWFM29D and G-72202PN3LZ and a
   Contentsquare pageview.

Consequence in plain words. A visitor can't say no to cookies, and analytics runs regardless.
The FAQ says "We comply with GDPR standards." This is one of the four always pitchable signals.
