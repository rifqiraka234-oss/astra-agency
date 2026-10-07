# Evidence, Frank Hemmert, baked. (Hemmert & Narcy GbR), ctc_CLQ5T3DEaeG2SMG9d

Researcher b8_frank, 2026-10-06, all pages opened 19:05 to 19:40 UTC unless stated. Read only. Nothing sent, nothing written to lemlist or git.

## STOP FLAGS

- **Thread: only our connect note. No reply, no opener.** Safe for an OPENER.
- **Tagline stop sign RESOLVED, not a stop.** "Data Annotator at DataAnnotation" is a day job or side gig next to the bakery. It is NOT a "former" or "ex" signal. The business is LIVE and TRADING (store open with 16 products and order rules, Instagram post 14 days ago, new product launched at Berlin Chili Fest in September 2026).
- **Ownership: Frank IS a partner (Gesellschafter) of Hemmert & Narcy GbR**, per the English Imprint on their own site. CAVEAT, the German Impressum on the same page names only "Frau Adélaïde Narcy" as representative. A GbR is not in the Handelsregister so there is no register to settle it (northdata returned no match). Owner rule passes on the English imprint, with the inconsistency noted.
- **He is not the baker.** The site is written by and about "your baker, Adélaïde", "a one woman bakery". Frank is the co partner, named as the person responsible for content (§ 55 RStV) in the English imprint. Any message to him is about the business he co owns, not about his baking.
- Domain correct, the site names Hemmert & Narcy GbR and Frank Hemmert. Not CLOSED_NOT_ICP.

## Thread

- `get_inbox_conversation(ctc_CLQ5T3DEaeG2SMG9d)` page 1: `totalItems 0`, `nextPage null`, LinkedIn sync "recent" 18:58:51Z.
- `get_inbox_conversations` search "Frank Hemmert", listId `sentOnly`: 1 conversation, `lastSentAt 2026-10-06T13:08:35Z`, preview "Hi Frank, saw your business and thought it was cool 😀 I'm a business owner too! Would love to conne" (the connect note), `lastRepliedAt null`, `lastActivityAt 14:23:07Z` (acceptance), `isYourTurn false`.
- `myConversations` search "Frank Hemmert": 0 results.
- Positive control: the caller pulled another thread that came back full in this session (per brief). The sentOnly listing itself proves the method finds this contact.

## Record (search_campaign_leads id lea_tjmpcyz9Yn3RJYuuv)

firstName Frank, lastName Hemmert, jobTitle "Co-Founder", companyName "Hemmert & Narcy GbR", companyDomain get-baked.store, companyIndustry "Accommodation Services" (wrong, LinkedIn company page says "Caterers"), companySize 1-10, location Friedrichshain-Kreuzberg Berlin, tagline "Data Annotator at DataAnnotation", linkedinUrl /in/frank-hemmert-73b68a129, company LinkedIn /company/baked-berlin. Campaign W1b, running, status inProgress. No summary or experience fields returned.

Reconcile: companyName matches the legal entity on the site. Tagline names a different job, read as a day job (DataAnnotation is a remote AI training data platform), not as a former owner signal, since the business is trading now.

## Ownership

- https://www.get-baked.store/imprint (200). English block, verbatim: "Hemmert & Narcy GbR Sonnenallee 161 12059 Berlin Germany Represented by the partners Ms. Adélaïde Narcy and Mr. Frank Hemmert Phone: +49 179 7600 710 ... Content responsibility in accordance with § 55 RStV: Mr. Frank Hemmert – Sonnenallee 161".
- German block on the same page: "vertreten durch die Gesellschafter Frau Adélaïde Narcy Telefon: +33 6 15 17 25 60 ... Inhaltlich Verantwortlicher gemäß § 55 RStV: Frau Adélaïde Narcy - Wotanstr. 17, 10365 Berlin" (represented by the partner Ms Narcy, a French phone number, a different responsible person and address). The two language versions contradict each other.
- Data privacy page names "Verantwortliche Stelle Hemmert & Narcy GbR Sonnenallee 161 12059 Berlin".
- northdata via fetch-walled.py, "Hemmert & Narcy GbR": search page, no company hit (expected for a GbR, no register entry). No statutory record exists to outrank the Impressum.
- Verdict: Frank is co owner (GbR partner) and named content owner of the site. Adélaïde Narcy is the baker and the other partner.

## Prior research

grep of state/silent_accepted_queue.jsonl and state/drafted_*.md: no hit. The name appears only in load files (/tmp/claude-0/agents/load/W1b/*.json, /tmp/claude-0/agents/audit/W1b.json), which are import data, no verdict. No prior verdict to respect.

## Website

Builder: **Squarespace** (server header "Squarespace", 194 "squarespace" hits in the HTML, privacy page says "Meine Website wird über Squarespace bereitgestellt"). Translation by **Weglot** (cdn.weglot.com, `weglot-container` in DOM). Fonts by **Adobe Typekit** (use.typekit.net, p.typekit.net). Squarespace site id 68ef73a2... decodes to 2025-10-15, so the site was likely built about a year ago (inference from the id, Wayback unreachable, see below).

Crawl: pass 1 = 56 URLs, pass 2 = 56 URLs (equal, OK). Pages: /, /home, /store (+5 categories, 16 product pages), /bakery, /goods (same content), /aboutme, /gallery, /business, /forcafes (same content), /contact-me-business, /contact-me, /data-privacy, /imprint, /impressum (404), /search.

Key pages, verbatim:
- Home: "Bite-Sized Bliss. Handcrafted Baked Goods. Your Neighbourhood Bakery in the Heart of Lichtenberg." Cookies, Brownies, Cakes ("I build them for you, customised to your needs ... Order now"), Catering ("for events, cafés, and recurring gatherings ... Get in touch").
- /aboutme: "Nice to meet you. I am your baker, Adélaïde." ... "Today, baked. is a one-woman bakery, shaped entirely by my hands".
- /store: "Order by 15:00 on the previous day. Pick-up Tuesday through Friday evenings, and around midday on Saturdays." 15 cookie flavours "from €10.00" in batches of 6/12/18/24, Vegan Chocolate Brownie in batches of 2/4/8/16. "More flavours coming soon." **No pickup address on the store page** (grep of the store text for Wotan, Sonnenallee, 10365, Lichtenberg, address, Adresse: all false; control, the same text contains "Pick-up").
- /forcafes and /business (identical): "Your friendly neighbourhood supplier for quality cookies and brownies ... I deliver directly to your café ... I keep the process simple with easy ordering and quick communication." Only CTA is "Contact Me", no wholesale price list, no order form for cafés.
- /contact-me-business (rendered in Playwright): 1 form, First Name, Last Name, E-Mail, Subject, Message (all required), checkboxes Products / Services / Catering / Other, Google reCAPTCHA. No mailto, no tel, no WhatsApp link.
- Cake orders: "customised to your needs" with no cake product in the store, so a cake request goes through the general contact form.

Screenshots (site-audit, opened): desktop, dark green backdrop, cookie stack and flower vase, serif hero "Bite-Sized Bliss. Handcrafted Baked Goods.", nav Home/Store/My Bakery/Business, Instagram, Facebook, language switch, cart, "Shop Now". Modern, well photographed, not dated. A German cookie banner sits along the bottom and the Weglot "English" box sits on top of its right end, "Al..." visible then cut. Phone, same hero, banner fills the lower half, the "English >" box sits over the right button.
Render: 0 page errors, 0 failed requests. The "content may be hidden" warning is the Squarespace script ratio. The screenshot shows a full page, no emptiness claim made.

Links clicked / hrefs read: nav as above, all 200. Footer "Imprint" href = **/impressum, which returns 404** ("We couldn't find the page you were looking for"), retried 3 variants (/impressum, /Impressum, /legal all 404). The real page lives at **/imprint (200)**, which the crawler found but which the footer does not link to (footer href read from the raw HTML of /, /store, /aboutme, one `/impressum` each). Positive control, /aboutme and /data-privacy return 200 via the same curl in the same minute, and squarespace.com control 200.

Cookie banner overlap, two methods: (1) desktop screenshot shows "Al" then the English box. (2) Playwright `elementFromPoint` at each button's centre: desktop 1440, "Alle akzeptieren" [1299,945] is covered by an `A` (Weglot), "Cookies verwalten" and "Alle ablehnen" are clear. Phone 390, "Cookies verwalten" [275,790] is covered, "Alle akzeptieren" and "Alle ablehnen" are clear. So a reject is always reachable. Minor.

## GDPR (eu-view.py, Webbkoll Stockholm, nothing clicked)

- Cookies before any click: 1, first party (`crumb`, Squarespace CSRF). No third party cookies.
- Third party requests before any click: **67 requests to 8 hosts**, including **cdn.weglot.com, use.typekit.net, p.typekit.net** (Adobe, US) besides Squarespace's own CDNs. So the visitor's IP goes to Weglot and Adobe before consent.
- Banner: yes, with reject ("Alle ablehnen") present (site-audit, Playwright).
- Privacy policy https://www.get-baked.store/data-privacy, visible text 2,486 chars, three sections only (controller, general, Squarespace hosting logs). Word search of the visible text: reCAPTCHA 0, Google 0, Weglot 0, Adobe 0, Typekit 0, Cookie 0, Stripe 0, PayPal 0, Zahlung 0, Instagram 0. Control, "Squarespace" found 6 times by the same method. So the policy says nothing about cookies, the contact form, reCAPTCHA, Weglot, Adobe fonts, payment or order data, on a site that takes online orders.
- The English privacy block still reads "Email: [insert email address]", a template placeholder live on the page.
- Imprint: "Umsatzsteueridentifikationsnummer ... DE XXXXXXXXXXX" placeholder in both languages. Still cites "§ 55 RStV" (replaced by the Medienstaatsvertrag in 2020) and the EU ODR platform link (the ODR platform was discontinued in July 2025, my knowledge, not opened here). Footer imprint link is a 404 (above). German and English imprints name different representatives, phones and responsible persons.
- No AGB / Terms / Widerruf (withdrawal) / shipping page anywhere in the 56 URL crawl (regex over every page for AGB, Terms, Widerruf, withdrawal, Versand, shipping; control, same regex found "delivery" on /business and "pick" on /store).

## Social (social-audit.js on URLs from their own HTML)

- Instagram http://instagram.com/getbaked.berlin (from the header): 95 followers, 33 posts, latest 2026-09-22 (14 days). Embed captions read: 2026-09-22 x3, "Meet our Peanut Inferno ... Creamy peanut butter blended with ghost pepper ... Limited edition made exclusively for @berlinchilifest! 420 g · 12 €". 2026-04-16 to 04-18 x3, cookie posts pointing to "get-baked.store". **Gap of five months, April to September**, in the embed's six visible posts.
- Facebook https://facebook.com/getbaked.berlin: 18 followers, post dates behind login, UNKNOWN recency.
- LinkedIn /company/baked-berlin (from lemlist, not in their HTML): "Hemmert & Narcy GbR, Caterers, Bite-Sized Bliss. Handcrafted Baked Goods. https://www.get-baked.store/". Follower count not read.
- Peanut Inferno is not on the website: crawl text search for "peanut inferno", "peanut butter", "chili" returns nothing (only the "Dark Chocolate & Peanut" cookie). So the newest product lives only on Instagram.

## News (news.py, control Volkswagen 200/100)

- Company "baked. Berlin" 0, "Hemmert Narcy" 0. Person "Frank Hemmert" first 503, retry 200 with 1 result (2024 Main Post Leubach, an unrelated village story).
- Regional: Berlin cookie scene coverage (Round & Edgy, Annis Cookie Kitchen 2025-11-20 Berliner Zeitung), none about baked.
- Berlin Chili Fest opened at source, lepetitjournal.com: "Du 4 sept. à 18:00 Jusqu'au 6 sept. à 22:00", Berliner Berg Brauerei. So baked. traded at a festival in September 2026.

## LinkedIn routes

1. curl /in/frank-hemmert-73b68a129: 999 (expected). 2. Web search "Frank Hemmert" Berlin: no matching person. 3. Search with DataAnnotation/baked: nothing. 4. Company page via social-audit (above). 5. His own words on the site: none, he appears only in the English imprint. 6. lemlist record (above). Net: no posts, no About text available. What eats Frank's own time is not visible beyond the tagline (a day job next to the business).

## Capacity

One baker ("one-woman bakery"), two partners. Pickup four evenings plus Saturday midday, next day cut off 15:00. Wholesale to cafés and catering offered. No vacancies, no funding, no new branch found. New product line (peanut butter) launched Sept 2026 for a festival.

## Process

- Consumer orders: Squarespace store with cart, batch variants, pickup times. Pickup location not stated on the store page.
- Cakes: "customised to your needs", via the generic contact form only, no cake option, size, date or budget fields.
- Cafés / catering: one generic contact form with four checkboxes, no wholesale list, no standing order mechanism, although the copy promises "easy ordering" and "recurring" supply.
- Everything else by hand through the form inbox.

## Candidate pains per angle, with disproof attempts

**1 Website**
- 1a. Footer "Imprint" goes to a 404 on every page. Evidence: href /impressum in raw HTML of /, /store, /aboutme, curl 404 x3 variants. Disproof: looked for the page elsewhere, it exists at /imprint (200) but is linked from nowhere the crawler shows as navigation. Holds.
- 1b. The newest product (Peanut Inferno, 12 €) is sold only through Instagram, the store does not list it. Disproof: crawl text search, no match. Holds, but it was a festival limited edition, so the owner may not want it online.
- 1c. Café and cake buyers get one generic form, no wholesale list or cake request flow, against "easy ordering" copy. Disproof: rendered the form, checked every page for a price list or cake product, none. Holds. Weak cost evidence (no volume figure).
- Site look: modern and well shot. No era angle.

**2 GDPR (strongest, and it is a German legal surface)**
- 2a. Imprint: broken footer link, "DE XXXXXXXXXXX" VAT placeholder, German and English versions naming different representatives, phones and responsible persons, outdated § 55 RStV. Evidence /imprint, /impressum. Disproof: reread both blocks, the placeholder is in both. Holds.
- 2b. Privacy policy covers only Squarespace hosting logs while the site loads Weglot and Adobe fonts before consent (Webbkoll 8 hosts), uses Google reCAPTCHA on the form and takes online orders. English version shows "[insert email address]". Disproof: word search of the visible policy with Squarespace as control. Holds.
- 2c. No AGB or withdrawal information on an online shop. Disproof: regex across all 56 URLs with control. Holds (perishables are exempt from withdrawal but the information duty and terms are still the normal standard, legal nuance not verified here).
- Cookie banner itself is fine (reject present), only a cosmetic overlap with the Weglot box.

**3 Apps and tools**
- 3a. Café wholesale and catering run through a free text form, with "recurring gatherings" and "a reliable local source" promised. A simple wholesale ordering flow or standing order tool would fit. Evidence /forcafes, /contact-me-business. Disproof: no portal, no price list, no Shopify/B2B app found. Holds, volume unknown.
- 3b. Custom cake requests by free text. Same evidence.

**4 Social**
- 4a. Instagram 95 followers, five month posting gap April to September 2026, Facebook 18 followers. Evidence social-audit + embed timestamps. Disproof: the embed shows only six posts, so the gap is in what is visible, 33 posts total, could be posts not exposed by the embed. Treat the gap as probable, not proven.

**5 Build Squad**: not applicable, a one baker food business.

**Personal AI angle (PERSONAL_AI_BRIEF)**: Frank holds a day job ("Data Annotator at DataAnnotation") next to co owning the business. That is the only visible fact about his time. Disproof: he works on AI training data, so he may be AI literate and may set up his own tools; he does not sell AI or automation. No posts or About text to say what eats his week. Weak.

## Three strongest candidate pains

1. GDPR / legal: the Imprint link in the footer 404s, the real imprint shows a "DE XXXXXXXXXXX" VAT placeholder and two contradictory versions, and the privacy policy covers only hosting while Weglot, Adobe fonts and Google reCAPTCHA load and online orders are taken (https://www.get-baked.store/impressum 404, /imprint, /data-privacy, Webbkoll).
2. Website: the newest product, Peanut Inferno, lives only on Instagram (2026-09-22 posts), not in the store, and the store page never says where pickup is.
3. Apps: café wholesale and catering, promised as "easy ordering" and "recurring", run through one generic contact form with no price list or order flow (/forcafes, /contact-me-business).

## Ruled out

- CLOSED_NOT_ICP: ruled out, the business trades and Frank is a named GbR partner.
- Dated or broken looking site: ruled out by both screenshots, 0 errors.
- Certificate problem: not testable, the TLS chain we see is the egress proxy's. Site loads 200 over https.
- WordPress: no, Squarespace.
- Build Squad: no.
- Cookie banner without reject: ruled out, reject present.

## Source list (opened this session)

1. lemlist get_inbox_conversation, get_inbox_conversations x2, search_campaign_leads
2. https://www.get-baked.store/ and /home
3. https://www.get-baked.store/store, /store/p/honey-sesame, /store/p/vegan-chocolate-brownie (crawl)
4. https://www.get-baked.store/aboutme
5. https://www.get-baked.store/forcafes, /business, /bakery, /goods, /gallery
6. https://www.get-baked.store/contact-me-business (Playwright), /contact-me
7. https://www.get-baked.store/data-privacy
8. https://www.get-baked.store/imprint (200) and /impressum (404)
9. https://webbkoll.5july.net (eu-view.py)
10. http://instagram.com/getbaked.berlin (embed), https://facebook.com/getbaked.berlin, https://www.linkedin.com/company/baked-berlin
11. https://www.northdata.com search "Hemmert & Narcy GbR"
12. https://lepetitjournal.com/berlin/agenda/spectacles/berlin-chili-fest-2026-le-festival-epice
13. Google News RSS via news.py (company, person, region, industry)
14. https://www.linkedin.com/in/frank-hemmert-73b68a129 (999)
15. Web searches (find only): "Frank Hemmert" Berlin; baked Berlin Adélaïde Narcy; Berlin Chili Fest 2026
Domains: get-baked.store, webbkoll.5july.net, instagram.com, facebook.com, linkedin.com, northdata.com, lepetitjournal.com, news.google.com (8).

Files: screenshots b8_frank-desktop.png, b8_frank-phone.png, pw_desk_banner.png, pw_phone_banner.png, pw_contact.png; b8_frank.json; pass1/ pass2/ crawl.json; euview.txt; social.txt.

## Open questions

- Who runs the site and admin, Frank or Adélaïde? The English imprint makes Frank content responsible, the German one makes Adélaïde. Ask nothing that assumes he bakes.
- Wayback CDX unreachable (connection reset, control example.com also failed), so redesign history UNKNOWN. Site id suggests October 2025.
- Facebook recency UNKNOWN. Instagram gap probable, not proven.
- Order volume and café client count unknown, so cost of the manual wholesale flow cannot be sized.
- ODR platform discontinuation (July 2025) is from my knowledge, not opened at source this session. Verify before using.
