# July stalled leads, full re-research, 2026-10-01. 4 nudges drafted, 5 closed, 2 blocked. NOTHING SENT.

Raka's words, "Send! And do the other full researches, all angle please". These are the eleven people who got a
researched opener between 14 Jul and 2 Aug, an auto bump on 21 Jul (Febin and Dori had no bump), and never replied.
RULES 1B, "A criticism the lead ignored once does not get sent again ... Nudge on something new or close the row."
So every nudge below is on something the July message did not say.

## What was run

- **11 threads pulled** with `get_inbox_conversation`, all `nextPage` null, totals 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2.
  No replies anywhere. linkedinSync "recent" on every pull (14:10Z and 14:21Z).
- **11 lemlist records read** with `search_campaign_leads` by leadId. All 11 are owners, co-owners or co-founders.
- **Registers.** Pheifer Welding B.V. KvK 90852648 (oozo, founded July 2023). Boxxed Up Ltd 12132769 (Companies
  House, Mark Michael O'Sullivan director since 2019 and PSC 25 to 50%). Chouchoute Chocolaterie Ltd 04441895
  dissolved 10 Feb 2026, directors the Soualahs. Close System's own company profile PDF names Salim as founder.
- **Sites.** tools/crawl.py on all 12 domains, the curl_cffi impersonation server for walled pages
  (tools/fetch-walled.py), and a Chromium render with every request routed through that server, because Chromium
  through the proxy fails on certificates today (site-audit.js and social-audit.js on LinkedIn, Facebook and TikTok
  hit ERR_CERT_AUTHORITY_INVALID). Screenshots looked at for Close System, Chouchoute, Wandel, Reformer Loft,
  Wealthy Technology, Cowlar, Cowlar Venture Studio. Arvest rendered blank as a screenshot, its rendered crawl
  (21 pages, real text) was read instead.
- **EU view** (tools/eu-view.py, Webbkoll Stockholm) on all 12 domains, control allbirds.eu rerun today, essential
  cookies only.
- **Social** opened with tools/social-audit.js, 10 accounts taken from the leads' own HTML.
- **News** via tools/news.py for all 11, company, person, region and industry, controls Heineken and Tesco.

## The count

| Outcome | Who |
|---|---|
| NUDGE, on something new | Richard Pheifer, Mark O'Sullivan, Maryn Gerrits, Volker Hollmichel |
| CLOSE, they fixed what we raised | Rakia Jaziri (Wealthy Technology rebuilt its homepage), Etienne Lefebvre (Arvest now splits Analytics and Market) |
| CLOSE, nothing new worth their time | Salim Saleem, Umer Adnan, Nikita-Tarass H. |
| BLOCKED, Raka to open | Febin Rahman (interfirstgroup.com unreadable from here), Dori Adams (shutterb.co robot challenge on every route) |

## The one Raka would want to overrule first

**Richard Pheifer lists his English as elementary** (lemlist, "engels (Elementary proficiency)"). The July opener went
in English and got nothing. A Dutch version may land better. Say the word and I'll write it in Dutch.

---

## Richard Pheifer, Pheifer Welding B.V. NUDGE. ctc_nSviiCD4yMkFDaefo. 77 days since the opener

July opener (16 Jul) was a welder certificate and hours app. This is about the site, which July didn't mention.

```gate
lead: Richard Pheifer, "Mede-eigenaar" and Directie of Pheifer Welding B.V. (KvK 90852648, Aarhusweg 5-21 Groningen, founded July 2023 per https://www.oozo.nl/bedrijven/groningen/zuidoost/eemspoort/3050242/pheifer-welding-b-v , 1 registered employee), with Joey Pheifer, bedrijfsleider Marc Dijkhuizen. ctc_nSviiCD4yMkFDaefo, lea_SqdWZJd3JPKTsWkFY. lemlist tagline "Directeur Pheifer Welding B.V.", languages German and English, both elementary. Pipe welding and fitting, district heating, industry, gas networks, since 1992
site pass 1: 9 pages, every nav page of https://www.pheiferwelding.nl through tools/fetch-walled.py (Jimdo behind Cloudflare, curl and Chromium get a challenge), home, projecten, diensten, referenties, contact, impressum, privacyverklaring, cookie-instellingen, algemene-voorwaarden, all 200, all read
site pass 2: 2 pages, home and impressum fetched again with a different browser fingerprint, same title and same placeholder. No screenshot, Chromium gets "Just a moment" even through the impersonation route, so nothing visual is claimed
deep analysis: Jimdo Dolphin site. The homepage <title> is "Tech and IT Services | Pheiferwelding", the Jimdo template's, and Google's result for the site shows that title (web search "Pheifer Welding" Groningen). /impressum/ carries Jimdo's sample text, "De meeste van de wereldwijde wetten ... Raadpleeg een expert om erachter te komen welke specifieke informatie voor jouw site nodig is", the same sentence sits on an unrelated Jimdo site (logopedieternat.be), so it's stock text. The homepage "Onze missie" block is template copy too ("Het is makkelijk om grootse dingen te doen als je gelooft in wat je doet"). The bare domain pheiferwelding.nl has no A or AAAA record at Google DNS or Cloudflare DNS (only the SOA), while www.pheiferwelding.nl resolves to Jimdo, so typing the domain without www opens nothing. Referenties names no client. Contact is phone and email, no form
owner linkedin: route 1 lemlist record, experience "Mede-eigenaar @Pheifer Welding B.V.", earlier "Lasser @Visser & Smit Hanab". Route 2 the company LinkedIn page https://www.linkedin.com/company/pheifer-welding-b-v , walled from here (certificate error). Route 3 the site's footer, "Directie Richard Pheifer". His personal profile https://www.linkedin.com/in/richard-pheifer-7621b949 is walled
contact linkedin: Richard is the owner and the person messaged, same routes
google news: tools/news.py "Pheifer Welding" 0 results, "Richard Pheifer" 0, control Heineken 100
regional news: tools/news.py (Groningen) (lasbedrijf OR leidingbouw warmtenet) 0 results
industry news: tools/news.py lasbedrijf OR leidingbouw warmtenet 1 result, Trouw 2025-07-01 on a welder, nothing on Pheifer
sources:
1. https://www.pheiferwelding.nl/ and 8 nav pages, read twice
2. https://www.pheiferwelding.nl/impressum/
3. https://dns.google/resolve?name=pheiferwelding.nl&type=A (no Answer, SOA only)
4. https://cloudflare-dns.com/dns-query?name=pheiferwelding.nl&type=A (no Answer, SOA only)
5. https://cloudflare-dns.com/dns-query?name=www.pheiferwelding.nl&type=A (CNAME web.jimdosite.com, control)
6. https://www.oozo.nl/bedrijven/groningen/zuidoost/eemspoort/3050242/pheifer-welding-b-v
7. https://www.facebook.com/Pheiferwelding/ (tools/social-audit.js)
8. https://www.instagram.com/pheiferwelding/ (tools/social-audit.js)
9. Google web search "Pheifer Welding" Groningen, result title "Tech and IT Services" for https://www.pheiferwelding.nl/
10. https://www.logopedieternat.be/impressum/ (same Jimdo sample sentence, control)
11. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fpheiferwelding.nl%2F (tools/eu-view.py)
pains: 5 judged. (1) The site still carries the template's leftovers, a Google title that says "Tech and IT Services", a sample Impressum and a template mission line, and the bare domain opens nothing, costliest of what's provable because a main contractor vetting a subcontractor lands on it. (2) Certificate and hours tracking, July's angle, ignored once, not resent. (3) Referenties names no client, real, smaller. (4) GDPR, the privacy page describes Google Analytics, EU view from Stockholm was walled by Cloudflare, nothing claimed. (5) Social, Instagram 273 followers last post 2026-08-24, Facebook 324, active enough, no angle
chosen: (1), new, provable from two sources each, and a small job that fits the €500 floor
sweep website: all 9 nav pages of https://www.pheiferwelding.nl read via tools/fetch-walled.py, Jimdo template title "Tech and IT Services" live and shown by Google, Impressum sample text, bare domain with no A record at two resolvers against www as control
sweep gdpr: tools/eu-view.py on https://pheiferwelding.nl walled by Cloudflare from Stockholm, so UNKNOWN, never clean, nothing claimed
sweep apps: the July certificate and hours app was offered and ignored, RULES 1B, not resent, nothing new found that a welding subcontractor of this size would name
sweep social: tools/social-audit.js opened https://www.instagram.com/pheiferwelding/ 273 followers, 36 posts, latest 2026-08-24, and https://www.facebook.com/Pheiferwelding/ 324 followers, both alive, no angle
sweep squad: a welding firm with 1 registered employee per KvK, no build team, not a squad fit
thread: problem the site still has the Jimdo template's title and sample Impressum, and the bare domain opens nothing | cost a contractor checking Pheifer before a job finds a site that looks half finished | offer fix those three things, a small job | link site, finished
lead read: Richard reads that Google lists his site as Tech and IT Services, that his Impressum is Jimdo's sample and the plain domain doesn't open, that a contractor checking him sees a half finished site, and gets offered a small fix for exactly those three, one thread
claims:
Google shows your site as "Tech and IT Services", https://www.pheiferwelding.nl/ <title> "Tech and IT Services | Pheiferwelding" fetched 2026-10-01 twice (safari and chrome fingerprints), and Google web search result title for the same URL
the page title is still the one from the Jimdo template, <meta name="generator" content="Jimdo Dolphin"> on the same page, and a welding firm's title reading Tech and IT Services is template default
your Impressum page still has Jimdo's sample text, https://www.pheiferwelding.nl/impressum/ "Raadpleeg een expert om erachter te komen welke specifieke informatie voor jouw site nodig is", same sentence on https://www.logopedieternat.be/impressum/
typing pheiferwelding.nl without the www doesn't open anything, https://dns.google/resolve?name=pheiferwelding.nl&type=A and https://cloudflare-dns.com/dns-query?name=pheiferwelding.nl&type=A both no Answer, control www resolves to web.jimdosite.com
recheck: 2026-10-01 14:5xZ, title, Impressum text and both DNS lookups re-run, all unchanged. Confidence HIGH on the facts. MEDIUM on the cost, contractors vetting by website is an inference
```

### Richard, NUDGE

```
Richard, one more from me, on something else.

Google shows your site as "Tech and IT Services", because the page title is still the one from the Jimdo template. Your Impressum page still has Jimdo's sample text explaining what an impressum is, and typing pheiferwelding.nl without the www doesn't open anything.

So a contractor checking Pheifer before a job finds a site that looks half finished.

Shall I fix those three for you? It's a small job.
```

---

## Mark O'Sullivan, Chouchoute and Boxxedup. NUDGE. ctc_WqWnHna9o6anxvAzp. 75 days since the opener

July opener (18 Jul) was a business gifting page. Since then the site gained a Request A Quote item and a Corporate
& Events menu, so that criticism is not resent. This one is about copy errors on the homepage itself.

```gate
lead: Mark O'Sullivan, lemlist jobTitle "Co-Owner" of Chouchoute Luxury Chocolates and "Co-Owner @boxxedup". Companies House https://find-and-update.company-information.service.gov.uk/company/12132769 BOXXED UP LTD, Mark Michael O'Sullivan director since 1 Aug 2019 and PSC 25 to 50%. Boxxedup acquired Chouchoute, Greater Birmingham Chambers 23 Apr 2026, co-owner Cat Booth quoted. The old company, CHOUCHOUTE CHOCOLATERIE LIMITED 04441895, dissolved 10 Feb 2026. ctc_WqWnHna9o6anxvAzp, lea_vALHsfo8ohT6CEbsu
site pass 1: 1 page by tools/crawl.py, https://www.chouchoute.co.uk answers curl with a wall, so the homepage was read through tools/fetch-walled.py, 360 KB, Shopify
site pass 2: 1 page, the homepage rendered in Chromium through the impersonation route, 75 images, 0 broken, full page screenshot looked at, then fetched again with the safari fingerprint for the recheck. chouchoute-corporate.co.uk answered a 202 challenge on every route, nothing claimed about it
deep analysis: Shopify store titled "chouchouteuk". Above the main heading "LUXURY CHOCOLATE GIFTS FOR EVERY SPECIAL OCCASION OR EVENT" the line reads "CHOUCHUTE ['SHOO-SHOOT'] FRECH: TO PAMPER, TREAT, INDULDGE", seen in the screenshot and in the HTML as "CHOUCHUTE ['Shoo-Shoot'] Frech: To Pamper, Treat, Induldge", three misspellings (Chouchoute, French, indulge). The newsletter popup that opens on first load reads "Describe what your customers will receive when subscribing to your newsletter.", Shopify's sample text, in the screenshot and the HTML. Nav now has CHRISTMAS, OFFERS, REQUEST A QUOTE and CORPORATE & EVENTS with branded, employee and client gift types
owner linkedin: route 1 lemlist record, 24 experience entries read, Co-Owner Chouchoute and boxxedup, Chamber Council board member at Greater Birmingham Chambers. Route 2 Companies House officer and PSC record. Route 3 https://www.greaterbirminghamchambers.com/resource/corporate-gifting-firm-acquires-luxury-birmingham-chocolatier.html read in full. Personal profile https://www.linkedin.com/in/markmichaelosullivan walled from here
contact linkedin: Mark is the co-owner and the person messaged, same routes
google news: tools/news.py Chouchoute 10 results, GBCC 2026-04-23 the acquisition, the rest unrelated. "Mark O'Sullivan" 100 results, Irish namesakes, none him
regional news: tools/news.py (Birmingham) (corporate gifting chocolate) 8 results, the same GBCC piece
industry news: corporate gifting coverage in the same pull, Business Insider 2026-08-17 on subscription gift boxes, nothing on Chouchoute
sources:
1. https://chouchoute.co.uk/ HTML via tools/fetch-walled.py, twice
2. https://chouchoute.co.uk/ full page screenshot, rendered via the impersonation route
3. https://find-and-update.company-information.service.gov.uk/company/12132769
4. https://find-and-update.company-information.service.gov.uk/company/04441895
5. https://www.greaterbirminghamchambers.com/resource/corporate-gifting-firm-acquires-luxury-birmingham-chocolatier.html
6. https://boxxedup.co.uk/ HTML and screenshot
7. https://www.instagram.com/chouchouteuk (tools/social-audit.js)
8. https://www.facebook.com/chouchouteluxurychocolates (tools/social-audit.js)
9. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fchouchoute.co.uk%2F (tools/eu-view.py)
10. lemlist record lea_vALHsfo8ohT6CEbsu, companyDescription "established by Pierre Soualah in 2002"
pains: 4 judged. (1) Three misspellings in the homepage's top line and Shopify's sample text in the popup, seen by every visitor going into the Christmas gifting season, costliest of what's provable for a luxury brand selling to offices. (2) Corporate gifting buried, July's angle, partly fixed since and ignored once, not resent. (3) Two brands, two Shopify stores, Boxxedup already sells Chouchoute Chocolates in its own menu, real, but nothing shows it costs them an order. (4) Social, Instagram 196 followers last post 2026-09-18, Facebook 587, alive
chosen: (1), new, seen in the screenshot and the HTML, and the fix is minutes
sweep website: https://chouchoute.co.uk/ read via tools/fetch-walled.py and rendered, screenshot looked at, three misspellings above the main heading and Shopify's sample text in the newsletter popup, corporate menu now present
sweep gdpr: UK business, UK GDPR applies, tools/eu-view.py from Stockholm read, nothing chosen for a UK chocolatier's nudge
sweep apps: Boxxedup sells a video box and bespoke boxes by email, no tool gap the owners would name was found
sweep social: tools/social-audit.js opened https://www.instagram.com/chouchouteuk 196 followers, 223 posts, latest 2026-09-18, and https://www.facebook.com/chouchouteluxurychocolates 587 followers, both alive, no angle
sweep squad: a small gifting business, no build team, not a squad fit
thread: problem the homepage's top line misspells Chouchoute, French and indulge, and the popup shows Shopify's sample text | cost going into Christmas, that's what an office manager sees before asking for a quote | offer the corrected wording for both | link wording
lead read: Mark reads that the line at the top of his homepage has three misspellings and the popup still has Shopify's sample text, that this is what corporate buyers see before a quote at Christmas, and gets offered corrected wording for both, one thread
claims:
spells Chouchoute as "Chouchute", French as "Frech" and indulge as "Induldge", https://chouchoute.co.uk/ HTML "CHOUCHUTE ['Shoo-Shoot'] Frech: To Pamper, Treat, Induldge" fetched 2026-10-01 twice, and the screenshot shows it above "LUXURY CHOCOLATE GIFTS FOR EVERY SPECIAL OCCASION OR EVENT"
the newsletter popup still shows Shopify's sample text, https://chouchoute.co.uk/ HTML and screenshot "Describe what your customers will receive when subscribing to your newsletter."
the Christmas gifting season, https://chouchoute.co.uk/ nav items CHRISTMAS and CHRISTMAS OFFERS, and Corporate & Events gift type Christmas
before asking you for a quote, https://chouchoute.co.uk/ nav item REQUEST A QUOTE
recheck: 2026-10-01 14:5xZ, both texts re-fetched with a different fingerprint, unchanged. Confidence HIGH
```

### Mark, NUDGE

```
Mark, a different one from the gifting page in July.

The line above the main heading on chouchoute.co.uk spells Chouchoute as "Chouchute", French as "Frech" and indulge as "Induldge". And the newsletter popup still shows Shopify's sample text, "Describe what your customers will receive when subscribing to your newsletter."

Going into the Christmas gifting season, that's what an office manager sees right before asking you for a quote.

Want me to send over the corrected wording for both?
```

---

## Maryn Gerrits, ECLECT. NUDGE. ctc_Ras7iMYqpCkjAc9Nz. 79 days since the opener

July opener (14 Jul) said the site already looked strong and offered internal portal ideas. ECLECT has since
repositioned as an "operating collective" selling memberships to independent hotels. This is about the booking
platform those memberships include, which is still marked coming soon.

```gate
lead: Maryn Gerrits, lemlist jobTitle "Co-Owner" of ECLECT, tagline "Entrepreneur, Hospitality, Boutique Hotels, Development, Acquisition". On https://www.eclect.com/about/ he is "Strategic Projects" in a team of 20 led by Dennie Frits (CEO) and David van Brakel (Chief Growth Officer). Chapeau Magazine names Ruud van den Akker and Roel Vaessen as the founders. ctc_Ras7iMYqpCkjAc9Nz, lea_nHNdkWRuDoKsqA3yZ. Co-owner per his own record, not confirmed in a register, so the message talks about the project, not his ownership
site pass 1: 255 URLs by tools/crawl.py on https://www.eclect.com, NL and EN, hotels, projects, jobs, news, read
site pass 2: 7 pages fetched again live today and read in full, /, /services/, /en/services/, /hotels/, /about/, /careers/, plus the homepage nav hrefs pulled from the HTML. Screenshot rendered only partly (0 images through the route), so nothing visual is claimed
deep analysis: ECLECT now sells three memberships on /services/, CONNECT €799 a month, PERFORM €1499, BACKBONE €3999. CONNECT includes "een vermelding op ons boutique bookingsplatform (coming soon)" and lists "Vermelding boekingsplatform boutique hotels, coming soon", the EN page says the same. The About page says the collective connects hotels "op ons eigen boekingsplatform". The 20 person team is management, finance, marketing, reservations, events, HR and a creative lead, no developer. The 7 vacancies on /careers/ are chef, front of house, housekeeping, hotel manager and three internships, no developer. Their web partner is Becurious, which built the hotel websites on one CMS (https://www.becurious.com/our-work/eclect-hotelgroep), a hotel marketing agency, nothing says it builds the platform. News, ECLECT took over three Saillant hotels in January (Misset Horeca 2026-01-28) and is developing a mill building in Den Bosch (Entree 2026-08-07), Dennie Frits runs nine hotels (De Limburger 2026-02-08)
owner linkedin: route 1 lemlist record, 13 experience entries, Co-Owner ECLECT, earlier co-founder of Castillo de Monda and Cascada, Appèl. Route 2 the About page, "Strategic Projects". Route 3 company page https://www.linkedin.com/company/eclectplaces walled here (certificate error). Personal profile https://www.linkedin.com/in/maryn-gerrits walled
contact linkedin: Maryn is the person messaged, same routes. Dennie Frits is CEO, noted, not messaged
google news: tools/news.py ECLECT 10 results, the Saillant takeover (Chapeau, Misset Horeca, De Limburger, 1zuid, hospitality-management.nl), Kasteel Doenrade (Chapeau 2026-07-02), the mill building (Entree and hospitality-management.nl 2026-08). "Maryn Gerrits" 1 result, facto.nl 2016 from his Appèl days
regional news: tools/news.py (Nederland boutique hotel) (boutique hotels collectief) 32 results, hospitality-management.nl 2026-08-24 on collective purchasing as the margin lever for hoteliers, Pillows Hotels on collective intelligence 2026-09-11
industry news: same pull, 2025 hotel transaction volume €654M (hospitality-management.nl 2026-06-01), Michelin keys 2026-09-21
sources:
1. https://www.eclect.com/services/
2. https://www.eclect.com/en/services/
3. https://www.eclect.com/about/
4. https://www.eclect.com/careers/
5. https://www.eclect.com/hotels/
6. https://www.becurious.com/our-work/eclect-hotelgroep
7. https://www.chapeaumagazine.com/ondernemen-economie/eclect-bouwt-aan-verbindende-en-inspirerende-boutique-hotels/
8. https://www.hospitality-management.nl/doorstart-voor-drie-hotels-uit-failliete-saillant-collection
9. https://www.instagram.com/eclect (tools/social-audit.js)
10. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Feclect.com%2F (tools/eu-view.py)
11. Google news via tools/news.py, Entree Magazine 2026-08-07 on the Den Bosch mill building
pains: 5 judged. (1) The booking platform in the €799 CONNECT tier is still coming soon and nobody on a 20 person team or in 7 vacancies builds software, costliest because it's a listing they're already selling to member hotels in the entry tier. (2) Internal tooling across nine hotels, July's angle, ignored once, not resent. (3) The Instagram linked in the footer shows 0 posts and 142 followers, real, small. (4) GDPR, Complianz banner present, EU view read, nothing chosen. (5) Website, built and kept by Becurious for five years, strong, no angle
chosen: (1), the build squad family, because the product they're selling has an unbuilt part and no builder on the team
sweep website: 255 crawl URLs and 7 live pages of https://www.eclect.com read, strong site kept by Becurious, no website angle
sweep gdpr: tools/eu-view.py on https://www.eclect.com from Stockholm read, Complianz consent present, nothing chosen
sweep apps: /services/ sells Cockpit Light, Gaston (an AI assistant) and a full dashboard, built or bought, nothing shows they're missing, the booking platform is the one item marked coming soon
sweep social: tools/social-audit.js opened https://www.instagram.com/eclect 142 followers, 0 posts, LinkedIn https://www.linkedin.com/company/eclectplaces UNKNOWN (certificate error), small next to the platform
sweep squad: team of 20 on /about/ with no developer, 7 vacancies on /careers/ with no developer, and a platform listed as coming soon on the tier they sell for €799 a month, a squad fit
thread: problem the booking platform in the Connect tier is still marked coming soon and no one on the team or in the vacancies builds software | cost it's part of what member hotels pay for in the Connect tier | offer our build squad gets it live in half the time at half the price | link platform
lead read: Maryn reads that the booking platform in ECLECT Connect is still coming soon and nobody on the team page is a developer, and gets offered our build squad to get that platform live in half the time at half the price, one thread
claims:
sells ECLECT Connect with a listing on your boutique booking platform, https://www.eclect.com/services/ "een vermelding op ons boutique bookingsplatform (coming soon)", Connect priced at 799 euros a month on the same page (not in the message)
still marked coming soon, https://www.eclect.com/services/ "Vermelding boekingsplatform boutique hotels – coming soon", https://www.eclect.com/en/services/ "Listing on boutique hotel booking platform – coming soon", both fetched 2026-10-01
none of the 20 people on your team page, https://www.eclect.com/about/ Meet the team, 20 names and roles counted live, no developer
recheck: 2026-10-01, services NL and EN, about and careers fetched again, unchanged. Confidence HIGH on the facts. MEDIUM on fit, a supplier may already be building it, so the message asks rather than assumes
```

### Maryn, NUDGE

```
Maryn, a different thought from the internal tools one in July.

The memberships page sells ECLECT Connect with a listing on your boutique booking platform, and that platform is still marked coming soon. None of the 20 people on your team page is a developer, so I couldn't see who's building it.

If it sits with you under strategic projects, our build squad can get that platform live in half the time at half the price.

Who's building it at the moment?
```

---

## Volker Hollmichel, Wandel. NUDGE. ctc_tndKY7x5nEmEPdDCg. 79 days since the opener

July opener (14 Jul) was a tighter homepage around Sophia. The site has been rebuilt since ("Fachkräftegewinnung neu
gedacht", a Sophia section with stats), so that's not resent. This is about consent, which July didn't mention.

```gate
lead: Volker Hollmichel, lemlist jobTitle "Co-Founder & CEO" of Wandel.com, tagline "Founder & CEO at wandel.com", ctc_tndKY7x5nEmEPdDCg, lea_EydNGykEfPx7oibJ7 (the July opener sits in the thread with no campaignId, the connect note under cam_PryZp5LuvQv8NznHh). German AI recruiting for skilled trades, Sophia the AI recruiter, funded by the BMFTR and the EU per the homepage
site pass 1: 6 pages by tools/crawl.py on https://www.wandel.com, home, about-us, for-companies, for-candidates, privacy-policy, imprint, all read
site pass 2: 7 pages by the rendered crawl through the impersonation route, all 200, read, plus the homepage screenshot, 66 images, 0 broken, looked at
deep analysis: Next.js site. The Usercentrics CMP loads with settings id YESVjht6THYPlc ("strategy":"beforeInteractive"), and Google Tag Manager GTM-TN8WXC7T is mounted next to it unconditionally in the page tree. From Stockholm with nothing clicked, Webbkoll records 6 first party cookies set, _gcl_au, _ga, _ga_SZMRNQN5ZV, _hjSessionUser, _hjSession and a Mixpanel mp_ cookie, and requests to ad.doubleclick.net, px.ads.linkedin.com, snap.licdn.com, Leadinfo, Hotjar and Mixpanel. The GTM container (493 KB) holds the GA4 tag G-SZMRNQN5ZV, Mixpanel, LinkedIn and an Ads tag. Homepage logos Dussmann, Fiege, 1KOMMA5°, Meggle, Futron, Windmöller under "Unternehmen aus Energie, Industrie und Handwerk setzen bereits auf diesen Ansatz". Also found, the meta description is still "Generated by create next app", the Next.js default, kept for a later message
owner linkedin: route 1 lemlist record, 10 experience entries, Tesla, Uber, Minodes exit to Telefónica, Meltwater. Route 2 company page https://www.linkedin.com/company/wandel-talent-mobility-platform/ walled here (certificate error). Route 3 deutsche-startups.de 2025-01-07 on Wandel's launch. Personal profile https://www.linkedin.com/in/vhollmichel walled
contact linkedin: Volker is the CEO and the person messaged, same routes
google news: tools/news.py Wandel 100 results all the German word "Wandel", unusable. "Volker Hollmichel" 2 results, Business Punk and deutsche-startups.de, January 2025, the launch
regional news: tools/news.py (Deutschland) (Fachkräfte Recruiting KI) 43 results, Börse Express 2026-07-01 on new compliance rules for AI in recruiting from August, personalwirtschaft.de 2026-07-14
industry news: same pull, AI recruiting compliance, nothing on Wandel
sources:
1. https://www.wandel.com/ HTML, rendered and screenshotted
2. https://www.wandel.com/privacy-policy
3. https://www.wandel.com/imprint
4. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fwww.wandel.com%2F (tools/eu-view.py, run twice today)
5. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fwww.allbirds.eu%2F (control, essential cookies only)
6. https://www.googletagmanager.com/gtm.js?id=GTM-TN8WXC7T
7. https://www.wandel.com/about-us
8. https://www.wandel.com/for-companies
9. https://www.deutsche-startups.de/ (2025-01-07, 5 neue Startups, Wandel)
10. https://www.facebook.com/people/Wandelcom/61565893912576/ (tools/social-audit.js, UNKNOWN)
11. https://www.linkedin.com/company/wandel-talent-mobility-platform/ (tools/social-audit.js, UNKNOWN)
pains: 5 judged. (1) Analytics, Hotjar, Mixpanel and ad pixels run for an EU visitor before the Usercentrics banner is answered, costliest because Wandel handles candidate data and sells to large German employers whose data protection people check exactly this, and German consent rules (TTDSG section 25) draw Abmahnungen. (2) The homepage message, July's angle, rebuilt since, not resent. (3) The meta description is still the Next.js default, real, small, kept for later. (4) AI recruiting compliance rules in the news, too broad to pin on them. (5) Social, both accounts UNKNOWN from here, nothing claimed
chosen: (1), new, verified from the EU with a control, and a contained fix
sweep website: 6 crawl pages and 7 rendered pages of https://www.wandel.com read, rebuilt since July, the only site flaw left is the default meta description, small
sweep gdpr: tools/eu-view.py from Stockholm, https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fwww.wandel.com%2F , _ga, _gcl_au, _hjSession, mp_ cookies and doubleclick, LinkedIn, Leadinfo, Hotjar and Mixpanel requests before a click, control allbirds.eu essential only, the chosen angle
sweep apps: Wandel is itself a software company with its own product team, no app gap to sell
sweep social: tools/social-audit.js on https://www.facebook.com/people/Wandelcom/61565893912576/ and https://www.linkedin.com/company/wandel-talent-mobility-platform/ both UNKNOWN (certificate error), nothing claimed
sweep squad: a funded software startup building its own AI product, a possible squad fit, but nothing on the site shows a capacity gap, so not chosen
thread: problem Analytics, Hotjar, Mixpanel cookies and ad pixels load for an EU visitor before the Usercentrics banner is answered | cost a client's data protection officer will check that on a company handling candidate data | offer send exactly which tags fire and where to block them | link tags
lead read: Volker reads that his site sets analytics and Hotjar cookies and fires ad pixels before an EU visitor answers the consent banner, that a client's data protection officer would catch it on a company handling candidate data, and gets offered the list of which tags fire and where to block them, one thread
claims:
from inside the EU, with nothing clicked on the Usercentrics banner, https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fwww.wandel.com%2F , Stockholm, nothing clicked, api.usercentrics.eu and app.usercentrics.eu requested
sets Google Analytics, Hotjar and Mixpanel cookies, same Webbkoll result, cookies _ga, _ga_SZMRNQN5ZV, _hjSessionUser, _hjSession, mp_38cb8fbd...
calls LinkedIn's and Google's ad pixels, same result, px.ads.linkedin.com, snap.licdn.com, ad.doubleclick.net, stats.g.doubleclick.net
Dussmann and Fiege on your homepage, https://www.wandel.com/ logo strip, screenshot looked at 2026-10-01
handling candidate data, https://www.wandel.com/ "Spricht mit Kandidaten per Telefon und WhatsApp", Sophia builds candidate profiles
recheck: 2026-10-01, eu-view rerun, same 6 cookies, control allbirds.eu rerun, essential only. Limit, Webbkoll is Sweden and Usercentrics can be set per country, so Germany could in theory differ. Confidence HIGH that it happens from the EU, MEDIUM that Germany gets exactly the same
```

### Volker, NUDGE

```
Volker, a different point from the homepage one in July.

Loading wandel.com from inside the EU, with nothing clicked on the Usercentrics banner, the page already sets Google Analytics, Hotjar and Mixpanel cookies and calls LinkedIn's and Google's ad pixels.

With Dussmann and Fiege on your homepage and candidate data running through Sophia, that's something a client's data protection officer will check.

Want me to send over exactly which tags fire and where to block them?
```

---

## Closed and blocked, one sweep each

```sweep
lead: Rakia Jaziri, CEO and co-founder of Wealthy Technology (SIREN 985133008, president Rakia), ctc_W3kjdZFnbzXH85zTM, lea_yPxfNNgiJEGrbqvei. July opener 16 Jul, homepage journeys for pharma, CRO and MedTech, expert review
website: https://wealthy-technology.com rebuilt since July, rendered and screenshot looked at 2026-10-01, the hero now reads "From clinical data to approved dossier", a numbered Ingest, Draft flow, "human sign-off" and "under human oversight", which is what July asked for. 8 pages in the rendered crawl
gdpr: tools/eu-view.py on https://wealthy-technology.com from Stockholm read in the saved EU view file, no finding strong enough to lead a nudge, nothing chosen
apps: https://wealthy-technology.com sells its own agentic AI platform for regulatory documents, an AI product company building in house, no app gap to sell
social: no social account linked in the homepage HTML (curl of https://wealthy-technology.com, 0 social URLs) or the 8 page rendered crawl, nothing to test
squad: a 1 to 10 person deep tech startup per lemlist, BFM 2026-01-30 coverage via tools/news.py, nothing on https://wealthy-technology.com shows a build capacity gap
verdict: NO_STRONG_ANGLE, CLOSE. They did the thing we suggested. No message
```

```sweep
lead: Etienne Lefebvre, co-founder and CEO of Arvest (arvestwine.com), ctc_nYnQgsLWCc384BqPm, lea_Mh7A5KiXkX7nGK7bj. July opener 14 Jul, separate Analytics and Market
website: https://arvestwine.com rendered crawl, 21 pages at 200 read, nav now ANALYTICS and MARKET as separate items and the homepage splits "ARVEST ANALYTICS Rechercher un vin" from "ARVEST MARKET Acheter / vendre un vin", /pricing explains both side by side. July's point is fixed. Market lists 173 offers
gdpr: tools/eu-view.py on https://arvestwine.com from Stockholm read, cookie choice shown ("Refuser", "Tout accepter"), nothing chosen
apps: https://arvestwine.com/pricing sells Arvest Analytics from €150 and a B2B order book with API and ERP import, a data and trading platform built in house, no app gap
social: no social account linked in the homepage HTML (curl of https://arvestwine.com, 0 social URLs) or the 21 page rendered crawl, nothing to test
squad: a product team announcing five partnerships on https://arvestwine.com/blog between May and June 2026 (Dartess, London City Bond, FERT, WineSitting, Lockwine), nothing shows a capacity gap
verdict: NO_STRONG_ANGLE, CLOSE. They did the thing we suggested. No message
```

```sweep
lead: Salim Saleem, founder and CEO of Close System Architecture Consultancy (company profile PDF https://close-system.com/wp-content/uploads/2026/09/CSC-Company-Profile-2025-2026.pdf "Salim is the founder of Close System"), lemlist company Innovators for engineering and interior design, ctc_RDogafhkpGPbrnp7H, lea_pY4wLmNBH5RmfsFgf. July opener 18 Jul, a homepage showing AI and government expertise
website: https://close-system.com 60 pages by tools/crawl.py (14,141 links still queued, a huge WordPress site), homepage rendered and screenshot looked at, the experience counter now shows 15, so July's "broken counters" doesn't hold today. The 60 page profile PDF was edited 29 Sep 2026 and spells him "Salem Saleem CEO" on page 4, trivial. The AI positioning gap is July's angle, ignored once, not resent
gdpr: a UAE firm selling to GCC government buyers, tools/eu-view.py on https://close-system.com from Stockholm read, EU consent rules aren't their buyers' concern, nothing chosen
apps: a 100+ person consultancy per its own profile https://close-system.com/wp-content/uploads/2026/09/CSC-Company-Profile-2025-2026.pdf page 2, with BIM, GIS and digital twin departments, no tool gap they'd name was found
social: tools/social-audit.js not reachable for Facebook, TikTok and YouTube today (certificate error), Instagram and LinkedIn linked from the HTML, nothing claimed
squad: his tagline in lemlist says AI native A and E with BIM Level 2 and digital twins, and the profile PDF lists in house BIM and survey teams, not a squad fit
verdict: NO_STRONG_ANGLE, CLOSE. Nothing new that's worth his time. No message
```

```sweep
lead: Umer Adnan, founder of Cowlar Venture Studio and CEO of Cowlar Design Studio, Doha, ctc_xozMFobDpEC8sdukg, lea_yzTbTJHb3ToSJfZ3w. July opener 16 Jul, a group homepage for cowlar.com
website: https://cowlar.com rendered and screenshot looked at, still two tiles, Dairy Business and Cowlar Design Studio, exactly as July described, so anything here repeats July. https://cowlarventurestudio.com is one Venn diagram (VC, MTBOF, RET) and an email, thin, but it's the same website family he ignored
gdpr: tools/eu-view.py on https://cowlarventurestudio.com from Stockholm read, a one page site, nothing chosen
apps: https://cowlarventurestudio.com and his lemlist summary say Cowlar Design Studio sells engineering, product and rapid execution teams itself, the same thing Astra would offer, no app gap
social: tools/social-audit.js, the venture studio page links only LinkedIn, walled today, nothing claimed
squad: his own business is a build squad ("10+ multi-disciplinary engineering teams" in his lemlist summary), a competitor, and news via tools/news.py is all 2016 to 2019 Cowlar coverage
verdict: NO_STRONG_ANGLE, CLOSE. Nothing new that isn't a repeat. No message
```

```sweep
lead: Nikita-Tarass H. (Heumann), co-owner of Reformer Loft, Munich, IT architect at BCG Platinion leaving by summer 2026 per his lemlist summary, ctc_hgJ48N6PQ4Thn7wFB, lea_JcMnf52SH8NiD2Qky. July opener 14 Jul, a clearer first visit homepage
website: https://reformerloft.com 26 pages by tools/crawl.py read, homepage and /prices rendered and screenshot looked at, Squarespace, bsport booking and app, a Reformer Basics first timer class explained on /booking, gift cards priced, teacher training €1,949 on 9 to 11 Oct and 13 to 15 Nov. Strong, July's point is the only website one and it was ignored
gdpr: tools/eu-view.py from Stockholm, https://webbkoll.5july.net/en/results?url=http%3A%2F%2Freformerloft.com%2F , _gcl_au set and region1.analytics.google.com called before a click although the Squarespace banner is OPT_IN, real but one ad cookie on a studio site, fails the pay test
apps: https://reformerloft.com/booking says booking runs in the Reformer Loft app on App Store and Google Play, and /prices embeds the bsport widget, nothing missing to build
social: tools/social-audit.js opened https://www.instagram.com/reformerloft/ 2,594 followers, 93 posts, latest 2026-09-30, very alive, TikTok UNKNOWN
squad: a single pilates studio per https://reformerloft.com/contact , no build team needed, and his lemlist summary says he's an IT architect at BCG Platinion who builds software himself
verdict: NO_STRONG_ANGLE, CLOSE. The only new finding is one cookie, not worth his reply. Munich competition is rising (Club Pilates opened in June per tools/news.py) but nothing ties it to a gap we can fix. No message
```

```sweep
lead: Febin Rahman, co-founder and CEO of InterFirst Travel Group, Dubai, lemlist company Yatraverse, ctc_dCyZdQTH58obb9oCe, lea_TztsvSiB4egcPs9Qe. July opener 2 Aug, InterFirst "Launching Soon"
website: https://www.interfirstgroup.com resolves (Vercel) but failed on every route here, curl 000, tools/fetch-walled.py "upstream request failed", WebFetch 503, Chromium through the impersonation route 502, while control https://vercel.com/ answered 200 in the same minute. So UNKNOWN whether it's still Launching Soon. https://yatraverse.app is a 26 word contact block, its Terms, Privacy and Refund links all 404 with the same 6,603 bytes as a made up path, no Yatraverse app found in either store
gdpr: tools/eu-view.py on https://yatraverse.app from Stockholm read, the page is a 26 word contact block with nothing to consent to, nothing chosen
apps: nothing readable on https://www.interfirstgroup.com from any route, so no app judgement can be made until Raka opens it
social: tools/social-audit.js not run, InterFirst unreadable, Yatraverse's links are icons on a dormant page, nothing to test
squad: UNKNOWN until https://www.interfirstgroup.com is read, a travel holding company could need builders but nothing here shows it
verdict: BLOCKED_NEEDS_INFO. Raka, could you open https://www.interfirstgroup.com and tell me if it still says Launching Soon? If it's launched, there may be a fresh angle
```

```sweep
lead: Dori Adams, CEO and co-founder of shutterb, Toronto, ctc_4YWJ9gcS2AbcHq6SL, lea_4iwef8CQgS5dnwptG. July opener 26 Jul, an Event Impact flow, ended on a question
website: https://shutterb.co answered a 202 robot challenge to curl, to tools/fetch-walled.py (chrome, safari, firefox), to Chromium through the impersonation route ("Robot Challenge Screen"), and WebFetch returned nothing, while controls loaded in the same minutes. UNKNOWN, never weak
gdpr: a Canadian business, tools/eu-view.py on https://shutterb.co from Stockholm hit the same robot challenge, UNKNOWN, nothing claimed
apps: the July message offered an Event Impact flow tool and was ignored, RULES 1B, nothing new is readable on https://shutterb.co to replace it
social: tools/social-audit.js not run, the links can't be read out of a walled page, nothing to test
squad: UNKNOWN until https://shutterb.co is read, a gig platform with its own product could need builders but nothing here shows it
verdict: BLOCKED_NEEDS_INFO. Raka, could you open https://shutterb.co and screenshot the homepage and pricing? Then I can judge whether there's anything new
```
