# Research notes, Elle Lawrence, Fae Club Ltd, ctc_afBbzWCsFNa2AmJ8n, 2026-10-25

Raka's angle call, 25 Oct, word for word, "modern website". Researched 2026-10-25 ~13.15 to 13.45 UTC by session 24052593.
Evidence folder /tmp/claude-0/-home-user-astra-agency/24052593-7323-58b2-9e3f-744f7080d43c/scratchpad/leads/faeclub
(crawls pass1, pass2, hfr1, hfr2, site-audit json and screenshots, Companies House pages, the micro accounts, Instagram
embeds, LinkedIn company page, renders of every page type used below).

## In plain words for Raka

Elle runs Fae Club, fantasy balls for book lovers (Blackpool, London, Manchester, Bristol), and since Feb 2026 a sister
company, High Fae Retreats, with a 1,795 pound five day Valkyrie Retreat in the Lake District. The balls sell out (Lions
Solstice in under 48 hours, Mythical Memories sold out, Fairytale Ball 2027 already 66% gone with 174 days left), so
"more ticket sales" is the wrong pitch. The real problem is how tickets are paid for. To offer pay in 3 she sells a
second copy of each ticket in the shop, and her own product pages say each of those guests then has to be RSVP'd by
hand before the QR code is emailed ("we had to set up these orders in a different way"). The pay in 3 link at the top of Upcoming Events
opens a dead product page. The retreat sits on a second Wix site in a different look, booked only through a contact
form and a Gmail address, with "personalised payment plans" arranged by hand. So the modern site is one Fae Club site
for the balls and the retreat with instalments in the checkout and the ticket sent straight away.

## Thread and record

- `python3 tools/lemlist.py thread ctc_afBbzWCsFNa2AmJ8n` at ~13.15 and again 13.40 UTC, control ctc_ch3vFcKAkjQdMKDCg
  6 items ok, this lead 0 items both times.
- Queue row 2026-10-25 RESEARCH_QUEUED (this session). No other state file names her, the company, the contactId or the
  LinkedIn slug, except state/next_batch_ranked.md row 10 ("Agency, recruiting or coaching words, check what they sell,
  likely don't pitch"). Research says it's a consumer events business, not an agency.
- lemlist record (from the brief): jobTitle "Company Owner", companyName Fae Club Ltd, companyDomain fa3club.com,
  Chester, 1-10, tagline "Company Director | Event Planner | Marketing Expert | Author". Tagline and company agree.

## The person, outside lemlist

- Companies House, FAE CLUB LTD 15480699, incorporated 10 Feb 2024, active, SIC 47820 and 96090, registered office
  20 Wenlock Road London (Made Simple's address service). Officers, 1, LAWRENCE Elle Georgia, director since
  10 Feb 2024, identity verified 27 Jan 2026. PSC, Mrs Elle Georgia Lawrence, 75% or more of shares and votes.
  Last confirmation statement 11 Feb 2026, filed 9 Mar 2026.
  https://find-and-update.company-information.service.gov.uk/company/15480699/officers (read 13.20 UTC)
- HIGH FAE RETREATS LTD 17024054, incorporated 10 Feb 2026, SIC 79110, sole director Elle Georgia Lawrence.
  https://find-and-update.company-information.service.gov.uk/company/17024054/officers
- https://www.highfaeretreats.com/about-us read today, "Elle Founder & Host", "Elle, founder of Fae Club and High Fae
  Retreats", "High Fae Retreats is the sister company to Fae Club". highfaeretreats.com is linked from the fa3club nav
  ("The Valkyrie Retreat"), so it is hers (RULES 0C).
- Footer of every fa3club page, "© 2026 - Fae Club Ltd 15480699 - 20-22 Wenlock Road, N1 7GU, London".
- Micro accounts to 28 Feb 2025 (filed 10 Nov 2025), average employees 1, net liabilities 39,673 pounds. A charge
  registered 16 Sep 2025 in favour of Tallaght Financial LTD, outstanding. Never in a message (RULES 3), a flag on budget.
- LinkedIn company page https://www.linkedin.com/company/fae-club-ltd/ read through tools/fetch-walled.py, 12 followers,
  2-10 employees, HQ Chester, founded 2024, employees listed "Elle Lawrence", posts 3d (Fairytale Ball blog) and 1w
  (retreat dates with "our sister company High Fae Retreats"). About says "We are also available for hire as event
  planners, creating unique, tailored experiences for private events, brands, and special occasions".

## Site pass 1 and 2

- fa3club.com, tools/crawl.py twice, 115 URLs each (75 from sitemaps), 113 at 200 and 2 at 404, English. Wix.
- highfaeretreats.com, tools/crawl.py twice, 17 URLs each, all 200. Wix.
- site-audit.js on both, render trusted (fa3club's 14 failed requests are Wix telemetry, panorama.wixapps.net and
  frog.wix.com, no suspect assets). Screenshots desktop and phone opened for both.
- Extra renders opened, all at 1440 wide unless said, Upcoming Events, Fairytale Ball page, the Fairytale Ball 2027
  event checkout, the two pay in 3 product pages, the 404 product page, the retreat home and The Retreat page (full
  page), the fa3club home on a phone at 3, 8 and 15 seconds.

## What the site does, as a whole

- Home, three posters (The Night Club 30 Oct 2026 at Red Dog Saloon Hoxton, The Fairytale Ball 17 Apr 2027 at the
  Winter Gardens Blackpool, The Valkyrie Retreat 14 to 18 Jun 2027), "one of the UK's leading fantasy ball organisers",
  "Tickets often sell quickly", a 15% off newsletter sign up, three guest quotes, blog links.
- Two ways to buy one ticket. (1) Wix Events checkout on /event-details-registration/..., pay in full, Night Club
  Standard 25 pounds plus VAT and fee, VIP 35 pounds Sold Out, Fairytale Ball Enchanter Tier 175 pounds plus 4.38 fee,
  Royal (VIP) Tier 195 pounds Sold Out. (2) The Ticket Shop (Wix Stores), "Enchanted Tier Ticket - Pay in 3 Option"
  179.38, "Royal Tier Ticket - Pay in 3 Option" 199.88 with Add to Cart live, Night Club Ticket 30.75, VIP Night Club
  sold out. Every shop ticket page says "You will receive your tickets via email within 48 hours of purchase. In order
  to make more payment options available to our community we had to set up these orders in a different way which can
  cause a delay in processing time as we will need to manually RSVP each guest."
- Pay in 3 is pushed. Upcoming Events opens with a highlighted "**Click here to buy tickets with pay in 3, pay in 4, and
  other finance options." whose href is /product-page/vikings-and-valkyries-ball-ticket, which returns 404 and renders
  "This product couldn't be found" (raw HTML and Chromium, both checked). The Fairytale Ball page has "Spread the Cost -
  Click here to pay in 3" (to the shop) and embeds the two pay in 3 products. The blog post "Making a Weekend Out of the
  Fairytale Ball" ends with the two pay in 3 products and Buy Now.
- The Royal tier shows Sold Out in the event checkout and is still buyable as the pay in 3 shop product. Two stock
  counts for one tier. Could be a deliberate allocation, so it is not claimed.
- Demand. Fairytale Ball page "66% SOLD OUT!" and "174 days to the event". Lions Solstice "SOLD OUT in under 48hours!"
  (2026 guide post). Mythical Memories "SOLD OUT". Instagram 1 Sep "Tickets are over 50% sold out already". So the pain
  is admin, not demand (RULES 0G point 4).
- Contact page, "Please note that we are a very small team", a work with us form for models and performers, a reviews
  form, a vendor call for the Mythical Memories mini book con, a magazine address faelingsoracle@gmail.com.
- Past Events lists six events from June 2024 to April 2026 with Krios Photography and named casts, and still ends
  "Next Up The Lions Solstice (round 2!) 1st August 2026", a past date. Small, not used.
- Community runs on Discord (linked on 10 pages). No members area, the shop's "Fae Club Merch" category
  (/category/fae-club-members) is empty, Ticket Resales empty.
- No privacy policy link on fa3club (site-audit, confirmed against its control).
- The email popup Raka saw on 25 Oct did not appear in our headless render at 3, 8 or 15 seconds on a phone, nor in
  site-audit's desktop and phone runs. Not used in the message.
- Retreat site, navy and white, a different look from fa3club's dark green. "All Included for £ 1795", "*Personalised
  payment plans available", "**Get £150 OFF your booking when you book with a friend", "18+ | Female Only". Every
  visible booking button ("Book Now" at the top of The Retreat, "Book The Retreat" at the bottom, "Enquire Now" on the
  home) goes to /enquire, a name, email and message form plus highfaeretreats@gmail.com. A "Book Now" link in the home
  HTML points to /schedule, "No Schedule to display at the moment", but it doesn't show in the screenshot, so it is not
  claimed. Three Wix sample events (Enchanted Twilight Garden Tour, Starlit Yoga and Sound Bath Evening, Fae Legends
  Immersive Experience, all 20 Feb 2026 18.08 to 20.08) are still published. /join-the-waitlist says "Our latest retreat
  is sold out", which is the first retreat (Instagram, "We've just hosted our very first Valkyrie Retreat", Sep 2026),
  and the 2027 dates are being sold now ("enquire now on our website to book", Instagram 28 Sep 2026).

## Social, opened with tools/social-audit.js

- Instagram https://www.instagram.com/fa3club/ 56,488 followers, 535 posts, newest 2026-10-22.
- YouTube https://www.youtube.com/@faeclub 1.41k subscribers, 41 videos.
- TikTok https://www.tiktok.com/@fa3club 35.2K followers, posts walled (unknown, not empty).
- LinkedIn https://www.linkedin.com/company/fae-club-ltd/ 12 followers.
- High Fae, Instagram https://www.instagram.com/highfaeretreats/ 2,686, 25 posts, newest 2026-10-14. Facebook
  https://www.facebook.com/highfaeretreats 64. TikTok https://www.tiktok.com/@highfaeretreats 3,073, walled.
- Social is strong for a two year old company. Not the angle.

## GDPR sweep

tools/eu-view.py from Stockholm, 7 first party cookies (Wix session cookies and Cloudflare __cf_bm), 0 third party,
173 requests to 6 Wix and Sentry hosts. site-audit from the US egress, no consent code at all, 10 cookies, 0 third
party trackers. Checked, never the angle (RULES 0E).

## News, 10+ sources

- tools/news.py en, control Tesco 100. "Fae Club" 5, one theirs, Secret London 19 Jul 2024 "A Fantastical ACOTAR-Themed
  Ball Is Coming To London" (Google News title only, the article could not be opened from here). "Elle Lawrence" 9,
  none hers.
- Regional, (Blackpool OR Lancashire OR Chester OR Manchester) (fantasy ball OR romantasy event OR BookTok ball), 33,
  "The Traitors-inspired circus fantasy ball coming to Chester this Halloween" (Chester Standard 13 Oct 2026, a rival in
  her home town, title only), "Inaugural fantasy ball event coming to Taunton in September" (Great British Life
  14 Aug 2026, title only).
- Industry, 77, fantasy and romantasy balls spreading (Daily Hampshire Gazette 15 Oct 2026, PhillyVoice 31 Aug 2026),
  UK rivals found by search, Through The Veil (Shrewsbury, 12 Sep 2026, from 90.10 pounds on Ents24), Court of Spice
  MAASquerade (Ragley Hall, 149 pounds, ticketspotapp), Northern Frights Fantasy Ball Paisley sold out.
- Rival ticketing does instalments in one checkout, Ticket Tailor sells tickets with Klarna in GBP
  (https://help.tickettailor.com/en/articles/8826630-can-people-pay-for-tickets-with-klarna). Wix Payments lists Klarna
  for the UK (https://support.wix.com/en/article/wix-payments-adding-klarna-as-a-payment-method) but the page never
  mentions Wix Events, so why her event checkout can't do it isn't settled and isn't claimed.
- Wayback Machine, web.archive.org is blocked by egress policy here (403 "Blocked by egress policy"). The archive.org
  availability API answers, fa3club.com captured 27 May 2024, 22 May 2025 and 10 Jul 2026, highfaeretreats.com
  10 Jun 2026. So the site has run since at least May 2024, the design date can't be compared. The offer is never
  "your site is old".

## Owner LinkedIn, six routes

1. tools/fetch-walled.py and curl on https://www.linkedin.com/in/elle-lawrence-755549102, 999 both, walled.
2. Web search "Elle Lawrence" "Fae Club", nothing that's hers.
3. Web search site:linkedin.com "Elle Lawrence" Fae Club OR High Fae Retreats, nothing that's hers.
4. Companies House, sole director and 75%+ owner of both companies.
5. The company page through fetch-walled, posts 3d and 1w, Elle listed as the employee.
6. Instagram of both companies read through the embed, captions dated to 22 Oct and 14 Oct.

## Pains judged

| # | Pain | Proof | Cost to her | Would she name it | Verdict |
|---|---|---|---|---|---|
| 1 | Pay in 3 tickets sold as shop copies, each guest RSVP'd by hand before the QR code, the Upcoming Events pay in 3 link dead | Her own product page wording, the 404 render | Her evenings on every instalment order for sold out balls, buyers who want to spread the cost hit a dead page | Yes, she wrote it on four product pages | CHOSEN |
| 2 | The 1,795 pound retreat booked only by contact form and Gmail on a separate Wix site, payment plans by hand | The Retreat page, every button to /enquire | Back and forth email on a high ticket sale | Maybe, enquiry may be on purpose for a female only retreat | Folded into the offer, not block two |
| 3 | Two stock counts for one tier (Royal sold out in events, buyable in shop) | Event checkout and product page renders | Overselling risk | Could be a deliberate allocation | Not claimed |
| 4 | Hire as event planners for private events and brands, on LinkedIn only, 0 of 115 pages (control, "pay in 3" found on 8 pages) | LinkedIn About, crawl | A B2B line with no page | Unknown intent | Kept for later |
| 5 | Stale "Next Up ... 1st August 2026", sample events on the retreat site | Past Events, retreat event pages | Small | 50 bucks task | Not the angle |
| 6 | GDPR, no privacy link on fa3club | site-audit with control | Small | No | Never the angle |
| 7 | More UK fantasy balls, one in Chester itself | News titles | Context | Not ours to fix | Context only |

## Flags for Raka

1. Consumer business. docs/gtm-plan.md says don't pitch consumer or leisure businesses, and next_batch_ranked row 10
   said "likely don't pitch". You named the angle, so it's drafted, your call.
2. Budget is the weak point. Micro accounts to Feb 2025 show net liabilities of 39,673 pounds and 1 employee, and a
   charge to Tallaght Financial LTD has been outstanding since Sep 2025. Against that, 175 to 195 pound tickets at a
   66% sold Winter Gardens ball, a 1,795 pound retreat, a second company this year, a cast and a photographer at every
   event.
3. She calls herself a marketing expert and very likely built both Wix sites herself. The message never criticises the
   look, it names the checkout her own pages apologise for.
4. The dead pay in 3 link is a quick fix she may make any day. Reopen it in the minute before sending. If it's fixed,
   drop that sentence and keep the rest.
