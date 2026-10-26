# Research, Scott Buckley, Unreal Events, ctc_MgyMbx3uk9mhg89jX, 26 Oct 2026

Raka's angle call, 26 Oct, word for word, "moderner website to get more sales". Researched 09.31 to 09.50 UTC in session
24052593. Evidence folder /tmp/claude-0/-home-user-astra-agency/24052593-7323-58b2-9e3f-744f7080d43c/scratchpad/leads/unreal
(both crawls, site-audit and Chromium renders, scroll screenshots, the contact form JSON, the price visibility check,
Companies House pages, Tee Shot Golf pages, social-audit and eu-view output, the lemlist raw responses).

## Verdict in plain words

Scott runs Unreal Events, a family business near Knutsford that brings hosted VR golf, tennis, clay shooting and five
other VR sports to corporate events, at around £750 a setup. Its customers are companies (BT Wholesale, FICO, Sodexo,
MKM). The site is eight months old and looks fine, so it isn't called old. What it doesn't do is sell. The price is
hidden inside a closed FAQ, and the enquiry form never asks which sport, how many setups or where, so every buyer has to
wait for Scott to reply before they get a number. The offer is a modern Unreal site built around instant pricing, at the
rates they already publish. Drafted as SKETCH, confidence MEDIUM.

## The lead record, reconciled before any fetch

- lemlist contact record read 26 Oct 09.41 UTC (`tools/lemlist.py get /api/contacts/ctc_MgyMbx3uk9mhg89jX`).
  firstName Scott, lastName Buckley, jobTitle Founder, location High Legh, Cheshire East, tagline "Entrepreneur |
  Building: Unreal Events, Tee Shot Golf and ONWARD", linkedinUrl https://www.linkedin.com/in/scottbuckley100 , campaign
  W1b cam_7gnHSf6GvvGy8gH3n, leadId lea_KqEpy4qHW5P28AqT4, unsubscribed false. Tagline and companyName agree (Unreal
  Events), no "former" or "ex". The domain unrealevents.co.uk is theirs (same phone 07306 803 133 as teeshotgolf.uk).
- Thread pulled 26 Oct 09.31 UTC with `tools/lemlist.py thread`, control ctc_ch3vFcKAkjQdMKDCg 6 items ok, Scott 0 items,
  all pages. lemlist conversation list (41 rows, 09.4x UTC) has no Buckley, Unreal or Tee Shot. State files grepped for
  name, company, domain, contactId and leadId, only queue rows, the 16 Oct hold and audit lines, no SENT anywhere.

## Still there, outside lemlist

- https://www.teeshotgolf.uk/about , read 26 Oct 2026, "I'm Scott, the proud owner of Tee Shot Golf ... In February 2026,
  we launched sister brand Unreal Events". Same phone as unrealevents.co.uk, and unrealevents.co.uk calls Tee Shot Golf its
  "sister brand" (https://www.unrealevents.co.uk/vr-golf).
- Companies House, Scott Christian BUCKLEY, one current appointment, active director of CLARITY TRANSFORMS LIMITED
  13434886 since 1 April 2023, identity verified, Mobberley, Knutsford (https://find-and-update.company-information.service.gov.uk/officers/2vDKtRAYvoPrSDjR5NAcEvLMdCc/appointments ).
  Co-director and fellow 25 to 50% PSC Emma Louise Buckley, which matches "We're a family business" on
  https://www.unrealevents.co.uk/about . SIC 62020, so the register doesn't name Unreal or Tee Shot, it only places him
  in Knutsford, the town on the contact page.
- UNREAL EVENTS LTD 13286125 (Thatcham, directors Ian Clinch and Douglas Lapsley, 2021) is a different company, not his.
  Wayback shows captures of unrealevents.co.uk in 2021, 2022 and 2024 (archive.org availability API), most likely that
  company's, the snapshots themselves are walled from here. The current site's sitemap starts 2026-02-16.
- The Unreal blog's newest post is dated 19 Oct 2026, so the business is live this month.

## Site, two passes

- Pass 1, `tools/crawl.py`, 37 URLs, 31 from the sitemap, all 200. Pass 2, the same, 37 URLs, all 200.
- site-audit.js (desktop and phone, render trusted, 0 page errors), my own full page renders of home, contact, customers,
  event manager, VR golf, FAQs, about and VR experiences on desktop and iPhone 13, and scroll screenshots of the home so the
  reveal sections show. All opened.
- Price visibility test in Chromium, 26 Oct ~09.45 UTC. On load the text "typically charge" is hidden (height 0) on all 8
  experience pages, Virtual Sports Day, /faqs and the London page. Clicking "How much does it cost?" opened it on 9 of
  those 11 (the positive control, the method sees it when it shows). The VR golf screenshot shows the question closed with
  a plus. The home, the contact page and the five "Are you..." pages carry no £ sign at all (crawl text, the same search
  finds £ on 17 other pages).
- Contact form, read from the form's own JSON in the raw HTML and again from the rendered page. Fields, Name (required),
  Company Name, Email (required), Phone Number, Start Date, End Date (if different), Message (required), "Where did you
  hear about Unreal?" (Google, Instagram, Facebook, TikTok, LinkedIn, Word of Mouth, Other), privacy tick. No field for
  experience, setups, guests, venue or branding. The page says "we'll outline how we might help, and what we're likely to
  charge, as soon as we can."
- Prices they publish (FAQ text), £750+VAT for up to 4 hours of daytime hosted gameplay "in mainland Britain (except
  Greater London)", £600+VAT per extra concurrent setup, branding print £200+VAT on /faqs and £250+VAT on /vr-golf (they
  disagree), floor mats £500+VAT, tablecloth £250+VAT. 30 players an hour per setup in Nearest the Pin, "Just add a second
  or third setup ... 60-90 per hour". The London page's FAQ gives only the "except Greater London" price.
- Terms (https://www.unrealevents.co.uk/terms , updated 03/08/26), "To book our services, you must complete the booking
  enquiry form on our website or through other designated channels", 50% non refundable deposit by bank transfer, balance
  14 days before.
- Refer page, 10% finders fee, "Typical order sizes range from £750 to £10,000+" and lower down "£750 to £15,000".
- Video. Home and experience pages, no video element and no video source in the raw HTML. The persona pages carry a
  background loop "Virtual Reality Fun.mp4" (Squarespace native video, our Chromium can't play it, RULES 1C), the golf blog
  embeds a YouTube video. So no claim about video is made.
- Visual. Navy header, a carousel of event photos, rounded white cards in carousels on blue, client logos (BT Wholesale,
  Sodexo, MKM, FICO, Staysure), one FICO quote, an "ARE YOU..." persona carousel, blog cards, four columns of emoji
  checkmark lists, a stock photo on the contact page, a mailing list popup on load on desktop and phone. Raka's "things in
  islands" fits, but the site is from February 2026, so it is never called old in the message.
- The only enquiry link on the home is CONTACT in the header. The work carousel (BT at Gleneagles, FICO at the O2, Jockey
  Club at Sandown Park) doesn't link anywhere, there are no case pages.
- The footer HTML carries Squarespace's "This newsletter signup form needs a storage option" note on every page, not visible
  in any render (0 visible nodes), so it's nothing.

## How the business runs, from its own pages

Hosted pop up VR sports for corporate events across Britain, from a base in Cheshire. One booking is a van, travel, an hour's
setup and up to four hours of hosting. Scott hosts himself (DP World on teeshotgolf.uk, "Scott is an entertaining host and
manages everything from start to finish"), with a part time pool of co hosts ("Increasingly, our events require 2-3 hosts",
https://www.teeshotgolf.uk/vacancies ). He also runs Tee Shot Golf (golf simulator hire), and the FAQ names mobile coffee and
a licensed horsebox bar as sister brands, plus ONWARD in his tagline (not found). So the same person sells, quotes, drives,
sets up and hosts. Sales come from search (six city pages, Manchester, Birmingham, London, Leeds, Edinburgh, Wales),
referrals (the 10% finders fee page), LinkedIn and a newsletter popup.

## Social, opened with tools/social-audit.js (09.39 UTC)

LinkedIn https://www.linkedin.com/company/unrealeventsvr 150 followers, Knutsford. Instagram
https://www.instagram.com/unrealeventsvr 39 followers, 12 posts, newest 2026-09-25. Facebook
https://www.facebook.com/profile.php?id=61587552617002 36 followers, post dates walled. TikTok @unrealeventsvr 1 follower,
posts walled.

## GDPR, sweep only

site-audit.js from a US egress printed GEO VOID (gtag consent code). eu-view.py from Stockholm, 1 first party cookie (crumb),
0 third party cookies, 86 requests to 7 hosts including region1.google-analytics.com and www.googletagmanager.com. Never the
angle (RULES 0E).

## LinkedIn, six routes

1. tools/fetch-walled.py https://www.linkedin.com/in/scottbuckley100 , 999 then 429 with the 24,633 byte login wall.
2. Web search "Scott Buckley" "Tee Shot Golf", only Hayden Buckley golf stories.
3. Web search linkedin.com/posts scottbuckley100 Unreal Events, nothing his.
4. Web search Scott Buckley Knutsford ONWARD / Clarity Transforms / Unreal Events, nothing his.
5. Company page through social-audit.js, 150 followers, "Virtual reality sports experiences, for corporate and private
   events across the UK and beyond".
6. teeshotgolf.uk/about, his own words as owner, and Instagram through the public embed.

## News, tools/news.py en, control Tesco 100

- Company "Unreal Events" 11, none his. "Tee Shot Golf" 12, none his. Person "Scott Buckley" 58, none his (a rugby player, a
  composer, obituaries).
- Regional (Cheshire OR Manchester OR Knutsford) x event entertainment, 66. Manchester's £300m Medlock Square entertainment
  hub (I Love Manchester 18 Oct 2026), Co-op Live and AO Arena event pushes, more places for a corporate budget to go.
- Industry, "competitive socialising" UK, 69. "Is competitive socialising reaching saturation point in the UK?" (MCA Insight
  25 Feb 2026), XP Factory facing a "significantly weaker competitive socialising market" (Morning Advertiser 7 Sep 2026),
  Spinners' Christmas party programme across four UK cities (EIN Presswire 2 Oct 2026), SquareMeal's Christmas party trends
  2026 (2 Sep 2026). Headlines read in tools/news.py output, not opened at source.
- Rivals for the same budget, opened at source. JM Entertainment's VR hire listing shows "From £1,195" up front
  (https://funhireuk.web1.bookingonline.co.uk/category/driving-racing-simulators-hire/758/vr-experience-hire-virtual-reality-experience-hire ).
  Meetspace VR Manchester on Hire Space shows guide prices and "Request an instant quote for your exact brief"
  (https://hirespace.com/Venues/Manchester/98484/Meetspace-VR-Manchester ).

## Pain table

| # | Pain | Proof | Cost to him | Would he name it | Verdict |
|---|---|---|---|---|---|
| 1 | The site can't turn a buyer's event into a price or a booking. The price is in a closed FAQ, the form asks for dates and a message only | Price check in Chromium on 11 pages, form JSON, contact page wording | Every enquiry waits on Scott, who is often out hosting. Orders run £750 to £15,000 (their refer page), so one lost multi setup booking a month is real money. Inference, labelled | Likely, he wrote "we'll outline ... what we're likely to charge, as soon as we can" and publishes standard rates | CHOSEN, biggest and closest to Raka's call |
| 2 | Proof is borrowed. Reviews, the Rory McIlroy Overlap video and most testimonials sit on Tee Shot Golf, Unreal's blog posts are signed "Tee Shot Golf", "Although Unreal is new" | /about, /blog, teeshotgolf.uk | Trust for a new brand | Maybe | Folded into the site offer as case pages, not the message |
| 3 | Founder does sales, quoting, driving, setup and hosting across several brands | Tee Shot about and vacancies, DP World quote, tagline | Hours | Yes, but internal | Folded in, the instant pricing is the tool that takes quoting off him |
| 4 | Social thin, Instagram 39, LinkedIn 150, TikTok 1 | social-audit.js | Low for a B2B event supplier whose buyers search and get referred | Unlikely | Not chosen |
| 5 | London has no price, the London page shows the "except Greater London" rate | /vr-event-entertainment-london | Small | No | Proof only |
| 6 | Branding print price differs, £200 on /faqs and £250 on /vr-golf | crawl text | Fifty euro fix | No | Proof only, never the angle (RULES 0E) |
| 7 | Mailing list popup on load over the hero, desktop and phone | screenshots | Small | No | Not used |
| 8 | GDPR | eu-view.py | n/a | n/a | Never the angle |

## Traps, RULES 0F and 0G

- Not theirs, ruled out, teeshotgolf.uk/about in his words and the shared phone.
- Removed on purpose, nothing suggests a calculator or price block was there before (sitemap from Feb 2026).
- Just built, NOT ruled out as a fact, the site is from February 2026. So the message never calls it old and offers the job
  the site doesn't do yet, instant pricing at their own published rates. Same handling as Beckie Taylor (24 Oct). This is
  the one Raka should weigh.
- A model, not a gap. They publish standard rates for the base package and every extra on 17 pages, and their terms make the
  website form the booking route, so instant pricing builds on their own model.
- Already fixed or in hand, the site was last edited 19 Oct (sitemap), no pricing tool, no job ad for a web role (the Tee
  Shot vacancies page asks for co hosts and a part time marketer who can use Canva).
- Budget, company customers on the home (BT Wholesale, Sodexo, MKM, FICO, Staysure) and typical orders of £750 to £15,000 on
  /refer. A family business, not a one person firm before its first sale.

## Not done, and why

- Scott's personal LinkedIn posts, walled on six routes.
- The Wayback snapshots, archive.org is blocked by the egress policy, only the availability API answered.
- ONWARD, not found on search.
