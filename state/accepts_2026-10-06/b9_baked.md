# Evidence, baked. (Hemmert & Narcy GbR), Frank Hemmert, ctc_CLQ5T3DEaeG2SMG9d

Researcher b9_baked, 2026-10-06, everything opened 20:45 to 21:20 UTC unless noted. Read only. Nothing sent, no lemlist writes, no commit. Lenses asked for: SOCIAL first, BRANDING second, WEBSITE third. Prior files b8_frank.md and b8_frank_redteam.md were treated as candidates and re-tested.

## STOP FLAGS

- Thread: ONLY OUR CONNECT NOTE. `get_inbox_conversation(ctc_CLQ5T3DEaeG2SMG9d)` 20:51 UTC, totalItems 0, nextPage null, sync "synced". Positive control ctc_JYWKs8LSRDxAreesA same session, totalItems 10. sentOnly "Frank Hemmert" 21:17 UTC, 1 hit, lastSentAt 2026-10-06T13:08:35Z, preview is the connect note, lastRepliedAt null. Safe for an OPENER.
- Owner: Frank is a named partner in the English imprint ("Represented by the partners Ms. Adélaïde Narcy and Mr. Frank Hemmert"), German block names only Adélaïde (b8, re-read /imprint 200 today). He is not the baker. Write about the business, never about his baking.
- Domain correct. Business trading (store live, posts 22 Sep 2026).

## 1. SOCIAL

### Instagram @getbaked.berlin (handle from their own header HTML, 3 links)
Read through the public /embed/ page (curl, short UA), 20:47 UTC. Profile page, the web_profile_info API, fetch-walled.py and Chromium all returned 429 or 401 "Please wait a few minutes" (walled, not empty). Viewers: imginn, pixwox, picnob, piokok behind a Cloudflare check, dumpor 520, storiesig dead, greatfon/inflact JS shells. So only the newest 6 of 33 posts are dated.

- full_name "baked.", followers **95**, posts **33**, private False, verified False, no public story. Following count, bio, link in bio and highlights: UNKNOWN (not in embed, profile 429).
- Likes are hidden by the account (`like_and_view_counts_disabled: true` on every post). Comments: **0 on all 6**.
- Date method check: the media ID's time bits decode to the same second as `taken_at_timestamp` on all 6, so the dates are right.

| # | Date (UTC) | Shortcode | Type | Location tag | Caption gist |
|---|---|---|---|---|---|
| 1 | 2026-09-22 18:58 | DdmbxuYCh8O | photo | Berlin | "Rich, roasted and creamy, the heart of every jar of Peanut Inferno" (black studio shot, peanuts) |
| 2 | 2026-09-22 18:57 | DdmbjWSimNX | photo | Berlin | "Meet our Peanut Inferno ... Limited edition made exclusively for @berlinchilifest! 420 g · 12 € / 3 jars · 32 €" (jar) |
| 3 | 2026-09-22 18:51 | Ddma9tWitMO | photo | Berlin | "Every inferno needs a spark ... ghost pepper" (single chili) |
| 4 | 2026-04-18 18:49 | DXSJ5USimDL | photo 3:4 | Neukölln | "A darker backdrop, a brighter bite ... Check out our current baked goods here: get-baked.store" |
| 5 | 2026-04-17 18:12 | DXPg3Yvinzz | photo 3:4 | Neukölln | "Rich tones, soft textures ... See our full selection at: get-baked.store" |
| 6 | 2026-04-16 18:45 | DXM_1JXipmw | photo 3:4 | Neukölln | "Our baked goods are in full bloom ... Check out our store" |
| 7 to 33 | before 2026-04-16 | not reachable | | | UNKNOWN |

What the images show (downloaded, opened, ig_grid.png and ig_april.png). Sept 22 is a triptych, peanuts, the Peanut Inferno jar, a red chili, each on black. The April posts are tiles of one wide grid picture. **Posts 4 and 5 are an empty dark green wall** (pixel range 44 to 116 on every channel, no object). Post 6 is green wall with flowers in the bottom right corner. So on their own, two of the six newest posts show no product at all.

Posting gap, proven within its limit. **No post between 18 Apr and 22 Sep 2026 (157 days)**, and none in the 14 days since. Proof, the embed lists posts newest first. Control, mubiscookies.official's embed in the same session shows a post from 2026-10-04, two days old, so the embed keeps up. Limit, a pinned post can sit out of order. The six dates here run in strict order, so no sign of one.

Peanut Inferno timing (chilifest.eu past events list, opened 21:10). The Berlin Chili Fest ran "September 4 @ 6:00 pm - September 6 @ 10:00 pm, Berliner Berg Brauerei Treptower Str. 39" and before that "May 29 to 31". lepetitjournal.com agrees, "Du 4 au 6 septembre 2026". No other Berlin Chili Fest date sits between 6 Sep and 6 Oct. **So the launch posts for the festival product went up 16 days after the festival closed.** Next one: "Berlin Chili Fest: SPICY WINGS EDITION & Spicy Christmas Market, December 12 to 13, 2026, Kalle Wintergarden, Ganghoferstraße 10, Neukölln". @berlinchilifest has 14,834 followers (embed). Its last 6 posts don't mention getbaked.

Reels. The newest 6 are all GraphImage. I could not count reels across all 33. The embed field `edge_owner_to_timeline_video_media` failed its control: cookiesbywang shows 0 there while 5 of its newest 6 are videos. **So "no reels at all" is NOT proven. Only "the newest 6 are photos" is.**

### TikTok @getbaked.berlin (NOT linked from their site. Matched to them by the "baked." wordmark avatar and the bio)
curl and Chromium 20:55 UTC, screenshot tt_pw.png opened. It shows "baked." with the wordmark avatar, 9 following, **1 follower, 0 likes**, bio "Fresh cookies based in Neukölln. Bite-sized bliss 🍪". Page JSON says `videoCount 0`, createTime 1770999381 (2026-02-13). Control, @tiktok read by the same curl returns videoCount 1510. **So the account is real, opened about Feb 2026, and has never posted a video.**

### Facebook getbaked.berlin (from their HTML)
Page Plugin read with curl: name **"Baked. - Berlin"**, **18 followers**. Timeline and post dates sit behind the login (Chromium shows the login wall). Recency UNKNOWN.

### LinkedIn /company/baked-berlin (from lemlist, not their HTML)
social-audit.js shows the page is named **"Hemmert & Narcy GbR"**, category Caterers, tagline "Bite-Sized Bliss. Handcrafted Baked Goods." Follower count not shown.

### Google Business Profile (found by Maps search, links to get-baked.store)
Maps search payload (curl) plus a Chromium render of cid 3769907451610130848 (gplace.png, opened). Name "baked.", **5.0 stars**, **category "Caterer"**, Sonnenallee 161, 12059 Berlin-Neukölln, +49 179 7600710, site get-baked.store, description "Bite-sized bliss. Handcrafted baked goods.". The hours entry for Tuesday is **"7:30 to 7:45 pm"**. The cover photo is the website's hero image, and a street photo is also listed. Review count, from a Maps list render: **"baked. 5.0 (1)", one review.**
Ranking (Chromium Maps, 21:05):
- "baked" around Neukölln: baked. comes **2nd**, after Bake and Take 4.8 (387).
- "cookies", "brownies" and "Kekse" centred on Sonnenallee 161 at zoom 15: baked. is **not in the first 7 to 10 results**. Control, the same render lists other nearby places (Gorilla Bäckerei, DER KEKS) and finds baked. for "baked".
- "cookies" across Berlin: OOH! Cookies, Mubis, Coffee and Cookies, Café Crumb and others, no baked.

### Delivery and listings
Web searches for Wolt, Lieferando and Too Good To Go turned up only Cookie Couture and others, nothing for baked. That's a search result, not an opened page. Treat it as not found, unproven.
Press: news.py (de) found 0 for the company and 0 for "Adélaïde Narcy", control Volkswagen 100. 0 regional. Industry news was all recalls, nothing relevant. A web search for "getbaked.berlin" returned only the UK "Get Baked" (Leeds/London) and other "Get Baked" accounts.

Who engages: UNKNOWN. Likes are hidden, comments are 0 and the follower list is walled.

## 2. BENCHMARK (handles from each brand's own homepage HTML, embed read 20:58 to 21:00 UTC)

Brand list from berlin10.com/cookies and forkandwalktoursberlin.com (2025-02-20). "Annis Cookie Kitchen" could not be found at source and was dropped. Caveat, everyone below except Cookies by Wang has a shop or café. baked. sells pickup only, which makes its online channels its only shopfront.

| Brand (area) | IG followers | Posts | Newest 6 span | Newest 6 types | TikTok (followers / videos) | How they convert |
|---|---|---|---|---|---|---|
| **baked.** (Neukölln, pickup) | **95** | 33 | 158 days (3 on 22 Sep, 3 on 16 to 18 Apr) | 6 photos | 1 / 0 | store link in captions, pickup next day |
| Mubis Cookies (Friedrichshain, Kreuzberg) | 7,321 | 798 | 5 days, daily | 6 videos | not linked | product launch videos, "Scoop" launch |
| DER KEKS (Prenzlauer Berg) | 2,479 | 147 | 18 days | 2 carousel, 2 photo, 2 video | linked, count not parsed | delivery post "WIR KOMMEN ZU DIR", anniversary, flavour drops |
| Dat Cookie (Mitte, vegan) | 3,842 | 197 | 32 days | 6 carousels | 1,365 / 211 | monthly "October Launches", flavour retired each month |
| OOH! Cookies (Mitte, 3 shops) | 4,064 | 71 | 37 days | photos and carousels | 180 / 94 | flavour back on menu, seasonal pumpkin |
| Cookies by Wang (Wilmersdorf, custom icing) | 833 | 182 | 70 days | 5 videos, 1 photo | not linked | wedding favours, themed custom cookies |
| Round & Edgy (Neukölln, Mitte, KaDeWe) | 12,157 | 120 | 131 days | 3 video, 2 carousel, 1 photo | 88 / 0 | new store openings, brand collabs (Timberland) |
| Cookie Doughi (Charlottenburg) | 2,307 | 171 | 246 days | 5 video, 1 photo | 4,546 / 99 | "NEUER COOKIE ALERT", hiring posts |

Engagement on the newest 6 (comments): Round & Edgy 14/1/16/5/4/5, Dat Cookie 4/0/2/1/25/2, DER KEKS 4/5/1/0/0/1, Mubis 3/4/4/1/4/2, Wang 0/0/1/1/5/0, **baked. 0 on all six**.

Honest sizing. Round & Edgy and Cookie Doughi also go months between posts and still do well, but they have shops, foot traffic and Google reviews. The same-size, pickup-led comparable is Cookies by Wang (833 followers, about one post every 12 days, mostly reels). baked. has about a ninth of Wang's followers and a sixth of Wang's posts. The flavour drop rhythm every benchmark uses (Dat Cookie's monthly launches, OOH's "back on the menu") is what baked.'s store already teases, "More flavours coming soon" and seasonal Tea & Spice (Pumpkin Spice, Chai) on sale now. Instagram hasn't shown a cookie since April.

## 3. BRANDING

Name and wordmark. Lowercase "baked." with a full stop, a thin humanist serif wordmark (Logo Transparent.png), used on the site, the Google profile and the TikTok avatar. Everywhere else the name drifts:
- Facebook "Baked. - Berlin"
- LinkedIn "Hemmert & Narcy GbR"
- Schema.org LocalBusiness on the homepage `"name":"Hemmert & Narcy GbR"`, openingHours `", , , , , , "` (empty)
- Google "baked."

Location story contradicts itself. The homepage says **"Your Neighbourhood Bakery in the Heart of Lichtenberg."** The Google profile, the imprint (Sonnenallee 161, 12059), the Instagram April location tags (Neukölln) and the TikTok bio ("based in Neukölln") all say Neukölln. Wotanstr. 17, 10365, Adélaïde's address in the German imprint, is in Lichtenberg. So the homepage probably carries an old address (inference).

Typography and colour. Playfair Display serif all over the site (24 font-family declarations). Dark green wall plus black panels, cream and white text. The Peanut Inferno jar label is black with white condensed sans capitals, a small "baked." mark and five heat dots. Its type differs from the site.

Photography, four styles seen (screenshots opened):
1. The dark green wall with a cookie stack and a vase of flowers, from one shoot (files PXL_20251017_*, a Google Pixel, 17 Oct 2025). It's the hero on home, store, about, gallery and forcafes, and the Google cover.
2. Linen and cream close-ups (gallery carousels).
3. Black cutouts (store tiles).
4. Black spotlight studio shots (Instagram, Sept).
All four look premium and composed. **There are no people in any image I opened.** No hands, no baker, no kitchen, no café customer. The About page reads "Nice to meet you. I am your baker, Adélaïde" over the same cookie and vase hero, with no photo of her (about_small.png). For a business that sells "a one-woman bakery, shaped entirely by my hands", the person is invisible.

Voice. Calm and literary, the same on the site and on Instagram. "A sweet meditation on the richness of chocolate", "Every creation begins with intention and ends in impermanence", "Less noise, more flavor". All English. A German page exists only as a Weglot JS switch. Instagram captions are English only, with Berlin hashtags.

Packaging. Only the Peanut Inferno jar has been seen. **No cookie box, bag or sticker appears in any image opened** (35 gallery, 16 store, 6 Instagram). Packaging for the core product stays UNKNOWN, never absent.

Does it say Berlin, handmade, one woman? Handmade, yes ("Handcrafted", "shaped entirely by my hands"). Berlin, faintly (meta "Made with love in Berlin", "fresh out of the Kiez"). The neighbourhood is wrong on the homepage. One woman shows up only in text, never in a picture.

Searchability.
- "baked" is a common word. A web search for "baked." with Berlin cookies didn't return them. A "getbaked.berlin" search returned the UK "Get Baked" chain and @getbakedct (4,855 followers, embed).
- On Google Maps they rank for "baked", but not for "cookies", "brownies" or "Kekse" next door.
- The home `<title>` is just "baked.". Meta description "Bite-sized bliss. Handcrafted baked goods. Made with love in Berlin." It has no "cookies", no "Neukölln", no "Kekse".

**TRADEMARK, statutory, the biggest branding finding.** DPMAregister, opened 21:12 UTC through fetch-walled.py, register.dpma.de/DPMAregister/marke/register/3020262307094/DE: **"Aktenzeichen 3020262307094 (Anmeldung eingegangen, Stand am 06.10.2026)", Markenform "Wort-/Bildmarke", Anmeldetag "05.06.2026", Anmelder "Eicher, Hannah, 81373 München, DE", Klasse(n) "32, 30".** TMview gives the mark name **"BAKED."**, with the full stop. Class 30 covers baked goods, cookies and pastries. It's an application, not yet registered. A TMview search for "baked." across DE, EM and WO found no other "BAKED." mark in class 30 and none by Narcy or Hemmert. The control is that the same search found the Eicher mark. Who Hannah Eicher is and what the logo looks like (image 403) are UNKNOWN. A third party filed their exact name with the dot for their exact goods in Germany four months ago. If it registers, baked. may be challenged over its name, packaging, domain and handles. Their own unregistered use since about Oct 2025 is a descriptive word, so it's likely weak protection. **That is legal inference, not verified, and needs a lawyer.** Do not put a legal conclusion in a message.

## 4. WEBSITE (third lens, rechecked live)

Crawl pass 1 = 56 URLs, pass 2 = 56 (equal), 31 from sitemaps. site-audit.js: Squarespace, 0 page errors, 0 failed requests, render trusted, banner with reject present, egress US but no consent code, control passed. Screenshots opened. Desktop shows the dark green hero, "Bite-Sized Bliss. Handcrafted Baked Goods.", nav, Instagram and Facebook icons, cart, "Shop Now". The phone view is described below.

- **Instagram visitor on a phone.** The above-the-fold tappables on the phone home (rendered) are only the cookie buttons, "Open Menu", the logo, the cart (0) and "English". **No Shop or Order button on the first screen.** The header "Shop Now" only shows on desktop. Path: menu, Store, product, choose a batch (6/12/18/24), Add to basket, cart, Checkout. That's 7 taps from the homepage. A link in bio could land on /store directly, but the bio is UNKNOWN.
- **Pickup address missing on the store page.** /store and all 5 category pages say "Order by 15:00 on the previous day. Pick-up Tuesday through Friday evenings, and around midday on Saturdays." A word search of the store, category, product and cart text for Sonnenallee, Wotan, Neukölln, Lichtenberg and address found nothing. Control, the same search finds "Pick-up" there and "Sonnenallee" on /imprint. The checkout page rendered blank in our headless browser, an empty white screenshot both today and in b8's run, so **whether checkout shows the pickup address is UNKNOWN.** The only public pickup info is Google's "Tuesday 7:30 to 7:45 pm" and the homepage, which points to the wrong district.
- **Peanut Inferno is not in the store.** No "Peanut Inferno" or "chili" on any of the 56 pages. Instagram sells it at "420 g · 12 € / 3 jars · 32 €" with no way to buy.
- **Instagram loop.** "Follow me for regular updates" sits on /store, all 5 category pages, /gallery, /forcafes and /business, 9 pages. The account it sends people to went 157 days without a post.
- **Cafés and catering.** /forcafes promises "easy ordering and quick communication", but the only route is one generic form (First and Last Name, E-Mail, Subject, Message, 4 checkboxes, reCAPTCHA, per b8). There's no price list or minimums, no café named and no testimonial.
- **No allergen or ingredient information on any of the 16 product pages.** Word search for allergen, Zutaten, gluten, nuts, Nüsse, contains, enthält all 0. Control, "chocolate" found on 6 and "vegan" on 1. The legal duty for distance selling (LMIV Art. 14) is from memory and was not opened at source.
- **Legal, rechecked 21:15.** /impressum 404, which is the footer href ("/impressum" ×1 in the home HTML, "/imprint" ×0). /imprint 200 with "DE XXXXXXXXXXX" and "§ 55 RStV". /data-privacy 200 with "[insert email address]". eu-view.py from Stockholm shows 1 first-party cookie, 67 requests to 8 hosts before any click, including cdn.weglot.com, use.typekit.net and p.typekit.net.
- **SEO basics.** Title "baked.", meta description as above, canonical fine, LocalBusiness schema named "Hemmert & Narcy GbR" with empty hours, no Google Analytics or Meta pixel. Speed, home TTFB 0.44 s, total 0.51 s, 236 KB HTML (curl from the US, rough).
- The look is modern and well shot. There's no dated-look angle.

## 5. PAINS TABLE

| # | Pain (lens) | Proof | How current | Cost to the business (in her terms) | Pay test (€500 to €50k) | Would Frank or Adélaïde name it? |
|---|---|---|---|---|---|---|
| A | **Their name "BAKED." filed as a German trademark by someone else in class 30** (branding) | DPMA statutory record, opened | Filed 05.06.2026, pending | Possible forced rebrand, new packaging, domain and handles, all brand equity lost. Largest single cost if it registers (no figure) | A rebrand plus new site passes. But it's legal first, design second | Probably not, they likely don't know. Once told, it's the one they'd fear most |
| B | **Social has gone quiet and goes nowhere** (social): 95 followers, 157 days with no post, launch posts 16 days after the event, 2 of the newest 6 posts are a blank wall, 0 comments, TikTok 0 videos, site sends 9 pages of visitors to "regular updates" | embed, TikTok JSON, chilifest.eu, crawl | Live now | For a pickup-only bakery with no shopfront, Instagram plus Google are the shopfront. Seasonal flavours on sale now (Pumpkin Spice, Chai) haven't been shown. The Dec 12 to 13 Christmas market is the next sales window. Order volume unknown, so no figure | Content system plus reels plus link-in-bio flow passes the floor | Yes. The site itself promises "regular updates". A one-woman baker plus a partner with a day job is the classic "no time to post" owner |
| C | **The brand isn't found and doesn't hold together** (branding plus SEO): homepage says Lichtenberg but everything else says Neukölln, three names (baked., Baked. - Berlin, Hemmert & Narcy GbR), Google category "Caterer" so invisible for "cookies" and "brownies" next door, 1 review, the baker never shown | homepage text, Maps renders, schema, LinkedIn | Live | Lost discovery by locals searching "cookies Neukölln". Wrong district on the homepage sends people to the wrong area | Passes as a brand and local-presence package | Partly. They'd see the Lichtenberg line as a slip. "Invisible on Maps for cookies" they'd likely care about |
| D | **Instagram can't sell** (website): no shop button on the phone's first screen, 7 taps, pickup address not on store pages, Peanut Inferno not buyable | rendered phone, crawl | Live | Drop-off from the few Instagram visitors. Peanut Inferno sales only by DM or festival | Small alone (tweak test fails), usable as symptoms under B | Maybe the Peanut Inferno point |
| E | Legal pages (website/GDPR): 404 imprint link, placeholders, allergens missing | curl, crawl | Live | Warning letters and fines risk (b8 red team narrowed it) | Small fix, fails the pay test alone | Unlikely |
| F | Café wholesale by free text form (apps) | /forcafes, form | Live | Unknown, no café named | Weak, no volume | Unknown |

**Biggest.** A is the costliest risk, but it's a legal matter. We can't fix it with design, and a cold opener about someone else's trademark can read as alarmist. Hand it to Raka as a flag, don't lead with it unless he chooses to. **B is the biggest pain that's proven, live, ours to fix and one they'd name themselves.** The site promises "regular updates" on 9 pages, the account went 157 days without a post, the festival launch went out after the festival, and every Berlin comparable that sells limited flavours posts launches weekly to monthly with video. C makes the thread stronger, since nobody finds you on Maps for "cookies" and the homepage names the wrong district. D gives the visible symptom.

**Recommended angle.** Social plus branding as one thread. baked. sells limited, seasonal flavours with no shop window. Its only window is Instagram, and it's been dark since April, with the newest product launched there after its event ended. The offer is a content and brand system: flavour drops, reels of the baker at work, a link in bio straight to the store, and the homepage and Google profile fixed to Neukölln and "cookies". **Confidence MEDIUM.** The gap is proven for the newest six posts and dated at source. The cost can't be sized because order volume is unknown, and 27 older posts are undated.

## Unknown, stays out of any message

- Dates of posts 7 to 33. The account's start date. The bio, link in bio, highlights and following count (Instagram 429 all session).
- Reels across the whole account (the field failed its control).
- Facebook recency. Who follows or engages.
- What checkout shows (blank render on our side).
- Cookie packaging (never seen, not proven absent).
- Who Hannah Eicher is, the BAKED. logo (403), and whether the application will register.
- Google review text. Order volume, café clients. Whether Frank or Adélaïde runs the social accounts.

## Sources opened (21 across 14 domains)
1. lemlist get_inbox_conversation ×2, get_inbox_conversations sentOnly
2. https://www.instagram.com/getbaked.berlin/embed/ (+6 image files on scontent cdninstagram)
3. https://www.tiktok.com/@getbaked.berlin (curl + Chromium), control @tiktok
4. https://www.facebook.com/plugins/page.php?href=...getbaked.berlin
5. https://www.linkedin.com/company/baked-berlin (social-audit)
6. https://www.google.com/maps?cid=3769907451610130848 and Maps search renders "baked", "cookies", "brownies", "Kekse"
7. https://www.get-baked.store/ crawl ×2 (56 pages), /store, /gallery, /aboutme, /forcafes, /imprint, /impressum, /data-privacy, cart
8. https://webbkoll.5july.net (eu-view.py)
9. https://register.dpma.de/DPMAregister/marke/register/3020262307094/DE
10. https://www.tmdn.org/tmview/api/search/results (baked, baked., get baked, Narcy, Hemmert, Peanut Inferno)
11. https://chilifest.eu/events/category/berlin/ and /list/?eventDisplay=past
12. https://lepetitjournal.com/berlin/agenda/spectacles/berlin-chili-fest-2026-le-festival-epice
13. https://berlin10.com/cookies/, https://forkandwalktoursberlin.com/berlins-cookie-craze-a-deep-dive-into-the-sweet-boom-in-the-city/
14. Benchmark homepages round-edgy.com, mubiscookies.de, derkeks.berlin, cookie-doughi.de, cookiesbywang.de, dat-cookie.com, oohcookies.de, plus 8 Instagram embeds and 5 TikTok profiles
15. Google News RSS via news.py (control 100)
16. https://www.gesetze-im-internet.de/lmidv/__4.html (didn't settle the allergen point)

Files in /tmp/claude-0/agents/b9_baked/: ig_ctx.json, ig_grid.png, ig_april.png, tt_pw.png, gplace.png, b9_baked-desktop.png, b9_baked-phone.png, gal_*.png, stp_0.png, about_small.png, dpma.html, tmview.json, bench/, pass1/, pass2/, gm*.txt.
