# Batch 15, 2026-09-28. The re-attempt on 27 weak or blocked leads. NOT SENT.

Raka's words, "Is there anyone we researched but either weak angle or blocked website or smth? I wanna
re attempt on those. And literally try to find ANY angle you know. Use ALLL resources."

What ran today on all 27 sites, on top of the earlier sweeps.
- A Chromium design roast at 1440, 1920 and an iPhone 13 profile, full page after scrolling to the
  bottom, with headings, fonts, nav and overflow read.
- True transfer weight from Chrome's own network log (CDP encodedDataLength), on desktop and on phone.
- Google Lighthouse mobile on every site, through the proxy. Positive control gov.uk scored 90 and
  mapler.com 95 through the same path, so the method can score high. Lighthouse is only used below for
  weight, because the container's CPU inflates its blocking time.
- A throttled 4G phone load (9 Mbps, 170 ms) timing the largest paint, on the heavy sites.

Result. Four openers (Elevate, Wingmen, Hula Hoop, Raise Your Game). Glyx and Mapler turned up real
findings but are held, see the notes at the bottom. The other 21 hold their verdicts, one line each
at the bottom with what the roast found.

Ruled out on the way, so nobody re-derives them.
- Halloween's blank blue hero is our Chromium, which can't play H.264. canPlayType('video/mp4') returns
  an empty string, so the showreel never plays for us. Not a finding.
- Collier Pickard's 2218 px width at 1440 is a Swiper carousel's off screen slides. html and body are
  overflow-x hidden, scrollX stays 0.
- SensElevation's half-empty hero was a Wix load artefact. A 10 second render shows the full hero.

---

## Connor Bosco, Elevate Marketing. OPENER.

**In plain words.** Connor co-owns Elevate Marketing, a small marketing and advertising studio in
Niagara-on-the-Lake. Their whole website is one Wix page that says COMING SOON over a contact form,
with client logos underneath (MLB Players, NFLPA, Ruth's Chris, Wyndham, Embassy Suites). The browser
tab and Google's listing both still carry Wix's default title, "Home | My Site". A local owner who
looks them up before a call meets a marketing studio that hasn't launched its own site. We'd build it.

```gate
lead: Connor Bosco, Co-Owner of Elevate Marketing per his lemlist record (jobTitle Co-Owner, companyDomain elevatemarketingstudio.com), tagline "Co-Owner at Elevate Marketing, Advertising Manager at CARTESIAN", ctc_83MwQqhh6XPF8RzQJ. Thread pulled today, 1 item, our 21 Jul connect note, nothing since. Positive control, Nick Vlaeyen's thread pulled in the same minute came back with 2 messages
site pass 1: tools/crawl.py on https://www.elevatemarketingstudio.com/ today, 3 pages, the homepage twice and a privacy policy, all titled "... | My Site", homepage 42 words
site pass 2: Chromium full page renders at 1440, 1920 and iPhone 13 today, 1870 px tall at 1440, three headings in total, "COMING SOON", "GET IN TOUCH" and the street address, no nav at all
deep analysis: Wix, generator "Wix.com Website Builder" in the raw HTML, title "Home | My Site". The homepage is COMING SOON in large type, a five field contact form, nine client logos and a footer with Facebook, Instagram, the address 239 Four Mile Creek Road and "© 2025 Elevate Marketing Studio". The Elevate logo sits inside the message box of the form in the 1440 render. No services, no work, no pricing, no about. Lighthouse mobile about 2.3 MB
owner linkedin: company page https://www.linkedin.com/company/elevate-marketing-studio read via tools/social-audit.js, "Marketing Agency Serving The Niagara Region & Beyond"
contact linkedin: https://www.linkedin.com/in/connor-bosco answers 999 to WebFetch. His lemlist summary, "Passionate digital marketer with a focus in e-Commerce ... Specializing in digitizing businesses & Amazon"
google news: tools/news.py en, "Elevate Marketing Studio" 0 results, "Connor Bosco" 6 results about other people, control Tesco 100
regional news: tools/news.py Niagara-on-the-Lake OR Niagara Falls with marketing agency Niagara, 76 results, a new digital visitor magazine for Niagara (Niagara Economic Development 2026-07-29), no Elevate mention
industry news: tools/news.py marketing agency Niagara, 48 results, nothing on Elevate
sources:
1. https://www.elevatemarketingstudio.com/ (rendered at three widths)
2. https://www.elevatemarketingstudio.com/privacy-policy (via tools/crawl.py)
3. WebSearch "elevatemarketingstudio.com Elevate Marketing Niagara-on-the-Lake", listing titled "Home | My Site"
4. https://www.instagram.com/elevatemarketingstudio/ (tools/social-audit.js)
5. https://www.facebook.com/share/1B1BJuDDhW/ (tools/social-audit.js)
6. https://www.linkedin.com/company/elevate-marketing-studio (tools/social-audit.js)
7. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Felevatemarketingstudio.com%2F (0 Google ads)
8. https://news.google.com/rss/search?q=%22Elevate+Marketing+Studio%22 (tools/news.py)
9. https://www.niagaracanada.com/ via tools/news.py regional search
10. https://www.linkedin.com/in/connor-bosco (999, lemlist summary used)
11. https://www.linkedin.com/in/raka-mulya-b92885196 (the credential)
pains: 4 judged. (1) Winning local clients, the studio's own site is a coming soon page titled My Site, the costliest we can fix. (2) Instagram dormant since 22 May 2026, 86 followers and 8 posts, part of the same shopfront problem. (3) Facebook 126 followers and 0 reviews, small. (4) Consent, Canada, 6 first party Wix cookies and no trackers from Stockholm, not relevant
chosen: the coming soon site, the costliest, because a marketing studio is judged on its own shopfront first and theirs hasn't launched
sweep website: the angle. COMING SOON and "Home | My Site" on https://www.elevatemarketingstudio.com/ , the same title in the search listing
sweep gdpr: Canadian studio, 6 first party Wix cookies and 0 third party per tools/eu-view.py, not an angle
sweep apps: a small studio, no booking or tool need evidenced on the one page
sweep social: opened with tools/social-audit.js, Instagram 86 followers, 8 posts, last 2026-05-22, Facebook 126 and 0 reviews, LinkedIn page read
sweep squad: 1 to 10 people per lemlist, a marketing studio that could resell builds, but the thread fits their own site first
claims:
your website is a coming soon page, https://www.elevatemarketingstudio.com/ render 2026-09-28, "COMING SOON" as the first heading
Google lists it under the title My Site, WebSearch 2026-09-28 listing "Home | My Site" for https://www.elevatemarketingstudio.com/ , the same <title> in the raw HTML
logos like Wyndham and Ruth's Chris, the logo strip on https://www.elevatemarketingstudio.com/ render 2026-09-28
ran go to market at Betty Blocks, docs/astra-master-context.md section 2A, https://www.linkedin.com/in/raka-mulya-b92885196
thread: problem the studio's site is a coming soon page titled My Site | cost a local owner checking them before a call meets a studio without a launched site | offer the Elevate site | link site
lead read: Connor reads that his studio's site is still a coming soon page with Wix's default title, that an owner checking him out sees a studio without its own site, and gets offered the Elevate site built, one thread
recheck: rendered at three widths today, title read in the raw HTML and in the search listing, logos seen in the render. Thesis confidence HIGH
```

### Connor, OPENER

```
Hi Connor, saw Elevate Marketing, looks interesting!

However, your website is a coming soon page, and Google lists it under the title My Site. This causes a Niagara owner checking you out before a call to find a marketing studio that hasn't launched its own site.

Especially, when you are pitching local businesses next to logos like Wyndham and Ruth's Chris, the page they land on has to sell the studio as hard as those logos do.

I run Astra agency. We build websites for brands like Unilever, AXA, Pertamina. I ran go to market at Betty Blocks, so I know a buyer checks the vendor's own site before they reply.

Shall I send you over what the Elevate site looks like?
```

---

## Nick Vlaeyen, WINGMEN. OPENER.

**In plain words.** Wingmen is three partners in Leuven running their own public concepts and company,
private and support events from the old Remy starch silo, Casa Remy. Nick handles staff and
partnerships. The site, built in March, is one long homepage. Each of the five services opens as a
popup of about forty words with a quote button. There's one past event on the whole site, Prime
Development. Plein Cinéma Leuven, four open air films at the Eventweide from 27 to 30 August, sold at
€13.95 a ticket and run by 3hoog, Wingmen and Brightspace, doesn't appear anywhere. An HR manager
choosing who runs the staff party sees almost none of what they've done. We'd build the events page.

```gate
lead: Nick Vlaeyen, Mede-oprichter of WINGMEN per his lemlist record, one of three partners named on https://wingmen.events/ ("Nick focust op personeel en partnerships"), ctc_SumZAfq5GtFt9xjEF. His tagline also names paper and board recycling. Thread pulled today, 2 messages, his "Hi Raka, nice to meet you" of 3 Sep and our question about Smurfit the same day, unanswered
site pass 1: tools/crawl.py on https://wingmen.events/ today, 14 URLs, homepage, contact, Prime Development, algemene voorwaarden, cookiebeleid, hello-world, category and author archives, two 403s on wp-admin paths. /wp-json/wp/v2/evenementen lists exactly one event, prime, 2026-04-27
site pass 2: Chromium full page renders at 1440, 1920 and iPhone 13 today, every visible homepage link mapped to its href, and each of the five offer popups (Casa Remy, publieke events, bedrijfsevents, privé events, eventondersteuning) opened and its text read
deep analysis: WordPress, Elementor and JetEngine, "Website by IADT". The nav is four anchors and a contact page. The five offer cards all open Elementor popups, about 40 to 90 words each, text and a quote button, no photo, no date, no past work. Publieke events names "AFTR, AFTRSUN, Follow the sun" with no dates or links. The events section holds one card, Prime Development, and one review. Plein appears 0 times in the homepage HTML, 0 in the crawl, 0 on contact, prime and hello-world, while Casa Remy appears 25 times in the same HTML (the control). Weight, the homepage pulls about 26 MB on a phone, four Mac screenshots named Schermafbeelding 2026-03-01 at 4.9 to 5.4 MB each as PNG backgrounds, confirmed at 5,648,860 bytes by curl. The WordPress "Hello world!" post is live
owner linkedin: three partners named on https://wingmen.events/ with phone and email each. No company page linked from the site
contact linkedin: his lemlist record, "Mede-oprichter WINGMEN", summary "WERE THE WINGMEN FOR YOUR EVENTS!"
google news: tools/news.py nl, "Wingmen events" 0, "Nick Vlaeyen" 1, HLN 2026-08-24 "Plein Cinéma verhuist naar binnen", control Tesco 100
regional news: tools/news.py Heist-op-den-Berg with bedrijfsevents OR eventbureau, 56 results, 20 years of Hestival (HLN 2026-08-26), nothing on Wingmen
industry news: tools/news.py bedrijfsevents OR eventbureau, 49 results, Evergems eventbureau at 15 years (made-in.be 2026-08-27), a Belgian bureau partly sold (De Tijd 2026-07-09), a crowded Flemish events market
sources:
1. https://wingmen.events/ (rendered at three widths, popups opened)
2. https://wingmen.events/evenementen/prime/
3. https://wingmen.events/wp-json/wp/v2/evenementen
4. https://wingmen.events/contact/
5. https://wingmen.events/hello-world/
6. https://pleincinema.be/ (organisers "3hoog ~ Wingmen ~ Brightspace", 27 to 30 Aug 2026, €13.95)
7. https://www.facebook.com/p/Follow-The-Sun-61574858033729/ (tools/social-audit.js, 577 followers)
8. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fwingmen.events%2F (0 cookies, 0 Google ads)
9. https://www.hln.be/ via https://news.google.com/rss/search?q=%22Nick+Vlaeyen%22 (tools/news.py)
10. https://made-in.be/ via tools/news.py industry search
11. https://www.casaremy.be (their venue's own site, from the 27 Sep sweep)
12. https://www.linkedin.com/in/raka-mulya-b92885196 (the credential)
pains: 5 judged. (1) Winning company and private events, the site shows five short popups and one past event, the costliest we can fix. (2) Plein Cinéma and their own concepts missing, the same problem and the proof it costs them. (3) 26 MB on a phone from four Mac screenshots, real, part of the rebuild. (4) Hello world post and unlinked Instagram and Facebook words in the footer, tweaks. (5) Consent, 0 cookies from Stockholm, clean
chosen: the missing proof, the costliest, because a company booking a staff party picks the bureau whose past events it can see, and Wingmen's biggest summer event isn't on its own site
sweep website: the angle. Five popups and one event on https://wingmen.events/ , Plein Cinéma on https://pleincinema.be/ and 0 times on wingmen.events
sweep gdpr: 0 cookies before a click from Stockholm per tools/eu-view.py, clean
sweep apps: quotes through the popup buttons and https://wingmen.events/contact/ , no volume evidence for a tool
sweep social: opened with tools/social-audit.js, the site links only Follow the Sun on Facebook, 577 followers, recency behind the login, the footer's Instagram and Facebook words have no href
sweep squad: three partners, no developer roles or software work, not a squad fit
claims:
your site is five short popups and one past event, https://wingmen.events/ render 2026-09-28, five offer cards open Elementor popups, /wp-json/wp/v2/evenementen returns 1 item, prime
Plein Cinéma isn't on it anywhere, 0 matches for "plein" on https://wingmen.events/ , contact, prime, hello-world and the 14 page crawl, control Casa Remy 25 matches on the homepage
Plein Cinéma is theirs, https://pleincinema.be/ "3hoog ~ Wingmen ~ Brightspace", 27 to 30 Aug 2026
Follow the Sun is theirs, named under publieke events in the popup on https://wingmen.events/ and linked from its footer
built a food brand from zero with my family, docs/astra-master-context.md section 2A, Eten Maar 2020 to 2024, https://www.linkedin.com/in/raka-mulya-b92885196
thread: problem the site shows five short popups and one past event, Plein Cinéma nowhere | cost an HR manager planning a staff party finds no proof they've run one like it | offer the Wingmen events page | link event
lead read: Nick reads that his site is five popups and one event with Plein Cinéma missing, that a company planning a staff party sees no proof, and gets offered the events page, one thread
recheck: popups opened today, the events endpoint read today, the Plein absence run with a control, pleincinema.be read today. Thesis confidence MEDIUM HIGH
```

### Nick, OPENER

```
Hi Nick, saw Wingmen, looks interesting!

However, your site is five short popups and one past event, and Plein Cinéma isn't on it anywhere. This causes an HR manager planning a staff party to find no proof you've run one like theirs.

Especially, when you are building your own concepts like Plein Cinéma and Follow the Sun, the events that never reach the site are proof a company client doesn't see.

I run Astra agency. We build websites for brands like Unilever, AXA, Pertamina. I built a food brand from zero with my family, so I know people book what they can already picture.

Shall I send you over what the Wingmen events page looks like?
```

---

## Cédric Morel, HULA HOOP. OPENER.

**In plain words.** Hula Hoop is an agency of 80+ in Lyon, Paris, Nantes, Montréal and Geneva, agency
of the year in 2021, 2024 and 2025 by their own LinkedIn. Their homepage is heavy in a way you can
measure. Google's Lighthouse puts it at about 20 MB on a phone when it finishes loading, and Chrome's
own network log counts 46 MB of images within six seconds on an iPhone profile. Sixty of those images
are downloaded twice, once from their own server and once from their Amazon CDN, byte for byte the same
file. On a throttled 4G phone the main image takes 27 seconds to appear. A brand director opening their
link between meetings waits half a minute to see the work. We'd rebuild the homepage to load fast.

```gate
lead: Cédric Morel, CEO of Groupe Hula Hoop per his lemlist record (jobTitle CEO, tagline "CEO Groupe Hula Hoop"), founder per OURS de la com 2024-03-20, ctc_wsqBdgSdjP6P6Yxvw. A same name architect at UNANIME Architectes in Lyon is a different person and is not used. Thread pulled today, 0 items. Positive control, Connor Bosco's thread pulled the same minute came back with the 21 Jul connect note
site pass 1: tools/crawl.py on https://www.hula-hoop.fr/ today, 30 pages read, 433 URLs in the sitemaps, all 200
site pass 2: Chromium full page renders at 1440, 1920 and iPhone 13 today, 122 images, plus Chrome's network log on desktop and phone, a throttled 4G phone load, and Lighthouse mobile
deep analysis: WordPress. Chrome's own network log (CDP encodedDataLength) counts 101 MB of images on desktop and 45.7 MB on an iPhone 13 profile within 6 seconds of load, no scrolling. 60 images arrive from both d1km4zzm1b2su4.cloudfront.net and www.hula-hoop.fr, 14.1 MB of repeat on the phone. The same file sha256 d1a82afc... from both hosts by curl. The team portraits are PNGs up to 1245x1800. Lighthouse mobile total 19,688 KiB at load. Throttled 4G phone (9 Mbps, 170 ms) largest paint 26.9 s, load 46.7 s. The site itself looks good, the Druk and Helvetica type and team photos are strong, the weight is the flaw
owner linkedin: company page https://www.linkedin.com/company/agence-hula-hoop 21,490 followers via tools/social-audit.js, "AGENCE DE L'ANNÉE 2021, 2024 et 2025"
contact linkedin: https://fr.linkedin.com/in/c%C3%A9dricmorel in the WebSearch listing, "CEO Groupe Hula Hoop"
google news: tools/news.py fr, "Hula Hoop agence" 4 results, Groupe Rioux and Riôtel identities from Montréal (2023), "Cédric Morel" 21 results, OURS de la com "Cédric Morel, le sens de la marque" 2024-03-20, control Tesco 100
regional news: tools/news.py Lyon agence communication, 79 results, three Lyon agencies launching a 3 in 1 offer (mesinfos 2026-06-19), Agence Moor pushing into the Lyon market (Lyon Entreprises 2026-07-13)
industry news: tools/news.py agence de communication, 100 results, Antirouille near Amboise closing after 34 years for lack of clients (La Nouvelle République 2026-09-14), a tight market for agencies
sources:
1. https://www.hula-hoop.fr/ (rendered at three widths, network log on desktop and phone)
2. https://d1km4zzm1b2su4.cloudfront.net/2024/11/Capture-de%CC%81cran-2024-11-20-a%CC%80-18.51.35-1280x1021.png (curl, sha256 match)
3. https://www.hula-hoop.fr/wp-content/uploads/2024/11/Capture-de%CC%81cran-2024-11-20-a%CC%80-18.51.35-1280x1021.png (curl, sha256 match)
4. Lighthouse 12 mobile on https://www.hula-hoop.fr/ , control https://www.gov.uk/ scored 90 through the same path
5. https://www.linkedin.com/company/agence-hula-hoop (tools/social-audit.js)
6. https://www.instagram.com/agencehulahoop (tools/social-audit.js, 4,436 followers, last post 2026-09-24)
7. https://www.tiktok.com/@agencehulahoop (tools/social-audit.js, 781 followers)
8. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fhula-hoop.fr%2F (4 Google ads)
9. https://news.google.com/rss/search?q=%22C%C3%A9dric+Morel%22 (tools/news.py)
10. https://www.lanouvellerepublique.fr/ via tools/news.py industry search
11. https://fr.linkedin.com/in/c%C3%A9dricmorel (WebSearch listing)
12. https://www.linkedin.com/in/raka-mulya-b92885196 (the credential)
pains: 4 judged. (1) Winning new brands in a tight agency market, the homepage makes a phone wait about half a minute for the work to appear, the costliest we can fix and it touches every pitch and every paid click (4 Google ads found). (2) 60 images fetched twice, the cause of much of (1). (3) Consent, 6 first party cookies from Stockholm and Axeptio with Non merci on the first layer, clean. (4) Squad, an 80 person agency with its own digital team, white label capacity is a possible second conversation, not this thread
chosen: the homepage weight, the costliest, because the agency's work is its pitch and the phone meets 20 to 46 MB before seeing any of it
sweep website: the angle. Weight and the double download on https://www.hula-hoop.fr/ , by Chrome's log, curl and Lighthouse
sweep gdpr: Axeptio with Non merci on the first layer in the render, 6 first party cookies before a click per tools/eu-view.py, clean
sweep apps: an agency that builds digital itself, no tool gap evidenced
sweep social: opened with tools/social-audit.js, LinkedIn 21,490, Instagram 4,436 and active on 2026-09-24, TikTok 781, all healthy
sweep squad: 51 to 200 per lemlist, a white label build partner is plausible, kept for a later message
claims:
your homepage makes a phone download over 20 MB, Lighthouse mobile 19,688 KiB on https://www.hula-hoop.fr/ 2026-09-28, Chrome's log 45.7 MB of images on an iPhone 13 profile
60 images fetched twice, Chrome's network log on https://www.hula-hoop.fr/ 2026-09-28, the same files from https://d1km4zzm1b2su4.cloudfront.net and https://www.hula-hoop.fr/wp-content/uploads , sha256 identical by curl
around half a minute on 4G, throttled 4G phone largest paint 26.9 s on https://www.hula-hoop.fr/ 2026-09-28, Lighthouse's own slower profile puts it higher still
winning brands from Lyon to Montréal, offices Lyon, Paris, Nantes, Montréal, Genève in the lemlist companyDescription and the country switcher on https://www.hula-hoop.fr/ , Montréal clients Groupe Rioux and Riôtel per tools/news.py
run sales and channel operations at efficy, docs/astra-master-context.md section 2A, https://www.linkedin.com/in/raka-mulya-b92885196
thread: problem the homepage makes a phone download over 20 MB with 60 images fetched twice | cost a brand director on 4G waits about half a minute for the work | offer the fast homepage | link homepage
lead read: Cédric reads that his homepage is over 20 MB on a phone with images downloaded twice, that a brand director waits half a minute to see the work, and gets offered the fast homepage, one thread
recheck: weight measured three ways today (Chrome's log, Lighthouse, curl on the duplicate), the 4G timing run today. Thesis confidence MEDIUM HIGH
```

### Cédric, OPENER

```
Hi Cédric, saw Hula Hoop, looks interesting!

However, your homepage makes a phone download over 20 MB, with 60 images fetched twice. This causes a brand director opening your link on 4G to wait around half a minute before your work appears.

Especially, when you are winning brands from Lyon to Montréal, the half minute before the work shows is how every new pitch starts.

I run Astra agency. We build websites and apps for brands like Unilever, AXA, Pertamina. I run sales and channel operations at efficy, so I've watched deals get judged before the first meeting.

Shall I send you over what the fast homepage looks like?
```

---

## Paul Prescott, Raise Your Game. OPENER. Weaker, flagged.

**In plain words.** Raise Your Game runs prize draws for club foundations, Newcastle United, Birmingham
City, Warwickshire, Wigan Warriors and about a dozen more, each on its own draw site. Fans buy entries
on those sites, mostly on phones. Six draw sites weighed today on an iPhone profile come to 3.7 to
12.4 MB each. The Birmingham City Foundation one is 12.4 MB, its header a 5 MB PNG. The homepage is
20 MB, with club logos uploaded at up to 3,876 px wide and shown at 72. What we can't claim is slowness,
the main image on those draw pages still paints in 1.6 to 2.5 seconds on 4G. So the message is about
data and weight, not speed. MEDIUM LOW, Raka's call.

```gate
lead: Paul Prescott, CEO and Co Founder of Raise Your Game Limited per his lemlist record, ctc_HQWRGkBGkYT69xsb9. Thread pulled today, 1 item, our 27 Jul connect note, nothing since
site pass 1: tools/crawl.py on https://www.raise-your-game.com/ today, 30 pages read, all 200, 131 links still queued. /alldraws.php lists 16 club draw domains
site pass 2: Chromium full page renders at 1440, 1920 and iPhone 13 today, plus Chrome's network log on the homepage and six draw sites, natural against displayed image sizes, and a throttled 4G phone load
deep analysis: The homepage pulls 20.4 MB on a phone, 20.0 MB of it images. Club logos in the partner strip are 3876x1504 (Wigan) and 2326x1561 shown at 72x28 and 42x28, three story images are 1696x960 PNGs of 2.3 to 3.1 MB shown at 390x250. Draw sites on an iPhone profile, bcfcfoundationprizedraw.com 12.4 MB with a 5.00 MB header PNG, thfprizedraw.com 7.7, nufcommunitychampionsdraw.org 6.8, warwickshirecfprizedraw.org 6.5, wiganwarriorscfprizedraw.com 6.2, citcclub.com 3.7. The BCFC draw page credits Raise Your Game in its HTML. Throttled 4G largest paint 1.6 s BCFC, 2.5 s NUFC, 4.2 s homepage, so speed is NOT claimed. Curl confirms 3,225,683 bytes image/png on the largest homepage image
owner linkedin: none linked from the site. Company named on every draw site footer
contact linkedin: his lemlist record, tagline "CEO & MD operator | Building and Scaling founder-led businesses | Sport | Tech | Education"
google news: tools/news.py en, "Raise Your Game" 100 results mostly unrelated, Macclesfield FC "RAISE YOUR GAME SILKMEN PRIZE DRAW UPDATE" 2026-05-29, "Paul Prescott" 46 results about other people, control Tesco 100
regional news: tools/news.py football foundation prize draw with charity prize draw OR sports lottery, 40 results, Postcode Lottery wins across the North West (Bury Times 2026-09-26), a busy charity draw market
industry news: tools/news.py charity prize draw OR sports lottery, 69 results, the same Postcode Lottery coverage
sources:
1. https://www.raise-your-game.com/ (rendered at three widths, network log)
2. https://www.raise-your-game.com/alldraws.php
3. https://bcfcfoundationprizedraw.com (network log, 4G timing)
4. https://nufcommunitychampionsdraw.org (network log, 4G timing)
5. https://warwickshirecfprizedraw.org (network log)
6. https://wiganwarriorscfprizedraw.com (network log)
7. https://thfprizedraw.com (network log)
8. https://citcclub.com (network log)
9. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fraise-your-game.com%2F (2 first party cookies, 0 Google ads)
10. https://www.macclesfieldfc.co.uk/ via https://news.google.com/rss/search?q=%22Raise+Your+Game%22 (tools/news.py)
11. https://www.linkedin.com/in/paul-prescott-8546a9100 (lemlist record)
12. https://www.linkedin.com/in/raka-mulya-b92885196 (the credential)
pains: 4 judged. (1) Growing entries per draw, the draw pages fans buy on are 4 to 12 MB on a phone, the costliest we can evidence, though paint time is fine so the cost is data and weight, not waiting. (2) The homepage at 20 MB with oversized logos, seen by clubs deciding on a partner, mostly on desktop, smaller. (3) Two Google Analytics cookies before a click from Stockholm on 27 Sep, UK business, small. (4) No socials linked, the clubs' channels carry the draws
chosen: the draw page weight, the costliest we can evidence, because it's the product fans pay through and it repeats across every club
sweep website: the angle. 3.7 to 12.4 MB on six draw sites and 20.4 MB on https://www.raise-your-game.com/ by Chrome's network log
sweep gdpr: two first party cookies before a click per tools/eu-view.py, UK platform, not the angle
sweep apps: they are the platform, draws paid through Stripe, the weight sits in their own product
sweep social: no social account linked on the site, checked with tools/social-audit.js on 25 Sep, the clubs' channels carry the draws
sweep squad: 1 to 10 people per lemlist, a platform company that could use a build partner for its draw template, which is the offer
claims:
the Birmingham City Foundation draw makes a phone download 12 MB, Chrome's network log on an iPhone 13 profile 2026-09-28, 12.4 MB, header https://static.bcfcfoundationprizedraw.com/image/febherobcfc.png 5.00 MB
fans entering from their phones spend that data on every visit, the images load on open with no scroll, Chrome's network log on https://bcfcfoundationprizedraw.com 2026-09-28
clubs from Newcastle to Wigan, https://www.raise-your-game.com/alldraws.php links nufcommunitychampionsdraw.org and wiganwarriorscfprizedraw.com
the weight repeats on every new club's draw, six of six draw sites weighed 3.7 to 12.4 MB, https://nufcommunitychampionsdraw.org 6.8 and https://citcclub.com 3.7 among them
grew a stroopwafel brand from zero and owned its online conversion, Eten Maar, docs/astra-master-context.md section 2A, "Owned acquisition, partnerships, content, conversion, pricing", https://www.linkedin.com/in/raka-mulya-b92885196
thread: problem the draw pages are heavy, BCFC 12 MB with a 5 MB header | cost fans entering from their phones spend that data every visit | offer a light draw page | link draw page
lead read: Paul reads that his draw pages are heavy, that fans on phones pay for it in data every visit, and gets offered a light draw page, one thread
recheck: six draw sites weighed today, curl confirms the image sizes, speed checked and NOT claimed. Thesis confidence MEDIUM LOW
```

### Paul, OPENER

```
Hi Paul, saw Raise Your Game, looks interesting!

However, your draw pages are heavy, with the Birmingham City Foundation draw making a phone download 12 MB. This causes fans entering from their phones to spend that data on every visit before they buy.

Especially, when you are adding clubs from Newcastle to Wigan, the weight repeats on every new club's draw and every fan who opens it.

I run Astra agency. We build websites and apps for brands like Unilever, AXA, Pertamina. I grew a stroopwafel brand from zero and owned its online conversion, so I know what a heavy page costs a sale.

Shall I send you over what the light draw page looks like?
```

---

## Held, with real findings

**Fabrice Beauchêne, Glyx Therapeutics. Held, timing.** The homepage is 23 MB on a phone, four
AdobeStock PNGs of 3.2 to 4.5 MB shown at 360 px wide, throttled 4G largest paint 18.6 s. Body copy is
set in Title Case, and the footer's newest news is December 2025. Real, but a preclinical biotech's
costliest pain is funding, and its visitors are investors on desktops. Fabrice is also CEO of VitaDX,
which Ouest-France reported in court protection (procédure de sauvegarde) on 2026-06-08, and Le
Télégramme ran "Si rien ne se passe d'ici fin juin, on est mort" about it on 2026-06-26. Pitching a website into
that week is badly timed. Revisit in November.

**Aditya Taneja, Mapler AIx. Held, recheck 4 Oct.** mapler.com is now a live AI travel page. Its
headline feature, "Ask Mapler", fails. The browser got HTTP 502 from /api/prompt.php and showed "Mapler
AI could not be reached", and two curl POSTs 20 seconds apart returned the same 502 while GET / returned
200. But a bar across the top of the site reads "This website is under construction", so he knows it's
unfinished. If it's still failing once that bar is gone, that's a Build Squad opener.

## Verdicts that hold after the roast, one line each

| Lead | What the roast found | Verdict |
|---|---|---|
| Niklas Mocker, dotega | Strong WEG platform, Welt, Forbes, Handelsblatt, Lighthouse layout shift 0.176, a tweak | NO_STRONG_ANGLE |
| Severin Kloos, Dariuz | 3.8 MB, clean blue brand site, nothing past a tweak | NO_STRONG_ANGLE |
| Emily R., Alquimia Legal | Wix, 15 H1 headings on the homepage, a search tweak, design strong | NO_STRONG_ANGLE |
| Matthias Ufer, Schumacher | 2 MB, layout shift 0.193, a solid industrial site | NO_STRONG_ANGLE |
| Steven Uitentuis, QWIC | Brand with its own team, 2 to 3 MB, fine | NO_STRONG_ANGLE |
| Orion D., Omnilabs | Clean, 1.8 s paint, no headings in the DOM, a tweak | NO_STRONG_ANGLE |
| Hendrik Rolshausen, Prevent | Lighthouse 73, clean | NO_STRONG_ANGLE |
| Mushtaq Taher, RentX | Bangladesh market, 6.6 MB, fine for the market | NO_STRONG_ANGLE |
| Mike Kokken, wysiwyg | Layout shift 0.778, but a volunteer film foundation | NO_STRONG_ANGLE |
| Marek Pruszewicz, Dialogue Earth | Modern newsroom, 2.4 MB, fine | NO_STRONG_ANGLE |
| David Risser, Ethics & Boards | 298 KB, modern, blocking time likely our CPU | NO_STRONG_ANGLE |
| Louis-Guillaume Dupond, Halloween | Blank hero is our missing H.264 codec, ruled out | NO_STRONG_ANGLE |
| Fabien Llobell, SensElevation | Half blank hero was a Wix load artefact | NO_STRONG_ANGLE |
| Yoeri Sanstra | 600 KB, clean | NO_STRONG_ANGLE |
| Ramar Nadar, RentyFind | 1.1 MB, clean | NO_STRONG_ANGLE |
| Fernando Gomes, DS Private | 7.5 MB, a franchise office on head office's portal, not his to change | BLOCKED_NEEDS_INFO |
| Jean-Christophe Conticello, GIANTS | Next.js, 3.8 MB, modern | NO_STRONG_ANGLE |
| Mandy Kerley, Trickle | Modern SaaS site, fine | NO_STRONG_ANGLE |
| Ollie Bartlett, Collier Pickard | 2218 px was a carousel, ruled out, CRM competitor | NO_STRONG_ANGLE |
| Sarim, Flochitect | 550 KB, automation agency, competitor | NO_STRONG_ANGLE |
| Timur, LeBretons | Lighthouse 78, marketing agency, competitor | NO_STRONG_ANGLE |
