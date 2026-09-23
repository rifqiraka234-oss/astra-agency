<!-- GATE ARCHIVED. Muhammad Akbar SENT 2026-09-23 12:12:08Z act_9fsfztYxWhAsN4nPa, Neeraj Sharma SENT 12:12:10Z act_M5LxgpmxduFyp2ePz, texts as below. -->

# Batch 4, the blocked and errored leads from batches 1 to 3, retried. 2026-09-23. NOT SENT.

**Which leads, and why these.** Of the 30 unsent leads across the earlier batches, 13 were closed
on firm grounds (sold the business, not the owner, competitor, listed plc, shut down, a student,
a strong site on a real look) and stay closed. **Nine were blocked by errors or unknowns.** This is
the five where the new tools could change the answer. The other four, Connor Bosco, Ferry Haas,
Fernando Gomes and Shail Ma, are next.

**Threads.** All five pulled one by one, every one holds only the July or August connect note.
Emily's first pull errored, "Invalid content from server", and the retry returned her thread.
**Positive control**, Grzegorz Sobieszuk's thread through the same call returned both his messages.

| Who | Old block | What resolved it | Verdict now |
|---|---|---|---|
| Muhammad Akbar, Aksonz | 503 on every fetch | The 503 is the Under Construction Page plugin's own status | **DRAFTED** |
| Neeraj Sharma, Nesh Group | No website found | All four no website checks run and earned | **DRAFTED, no website variant** |
| Paul Prescott, Raise Your Game | 503, wrong person | Old probe used a domain not on his record | NO_STRONG_ANGLE |
| Emily Levy, Alquimia Legal | Domain dead | The firm moved to alquimialegal.mx | NO_STRONG_ANGLE |
| Debby Alles, Sportcafé de Kogge | Name collision | Her own record says 't Veld, the VZV canteen | NO_STRONG_ANGLE |

---

## Muhammad Akbar, Aksonz General Trading LLC. DRAFTED.

**Record.** `jobTitle` Chief Executive Officer, tagline "CEO". Company "Aksonz General Trading LLC -
S.P.C", a Sole Proprietorship Company, which in Abu Dhabi has one owner. `companyDomain`
aksonz.com, founded 2024, 2 to 10 staff. His background is supply chain, warehousing and
ecommerce. **No UAE statutory record was opened**, the S.P.C. form and his title are the ownership
evidence. Flagged.

**The site, three paths.**
1. **r.jina.ai**, a reader on a different network. `/` and `/about` both return "Aksonz is under
   construction ... Sorry, we're doing some work on the site", the WordPress Under Construction
   Page plugin, image path `wp-content/plugins/under-construction-page/themes/mad_designer/`.
   **Its screenshot shows only that notice.** Positive control, BBC through the same reader
   returned its real title.
2. **WebFetch** returns HTTP 503. That plugin serves 503 by design so search engines don't index
   the placeholder, which also explains every 503 in this lead's history since August.
3. **Our own curl and Chromium could not read it.** curl reports "certificate has expired" and
   site-audit gets 502 over https while plain http 301s to https. That is through our proxy, so it
   is NOT evidence about their certificate and is not used.

### The clues

1. **Company LinkedIn, WebFetch, post about one day old.** Heavy duty wire rope clips for lifting,
   towing and rigging, with construction and building materials hashtags.
2. **The same page's website link is https://aksonz.com/**, the placeholder.
3. **lemlist `companyDescription`.** "a new trading company in the UAE ... source and distribute
   ... consumer goods and industrial supplies ... strong, long-term partnerships with suppliers and
   clients".
4. **2GIS lists Aksonz General Trading in Abu Dhabi**, a real trading business.

**Inference, SUPPORTED on clues 1, 2 and 3.** They're actively selling industrial supplies to
construction buyers on LinkedIn right now, and the site those posts point to has nothing on it. A
procurement team checking a new supplier finds a placeholder.

**Tests.** Positive control, passed on the reader. Render trust, our render void, the reader's
render used and nothing visual beyond the words is claimed. Tweak test, passes, there is no site
to tweak. Red team, a placeholder isn't a style choice.

### Muhammad, OPENER

```
Hi Muhammad, saw Aksonz, looks interesting!

However, your site is an under construction notice and nothing else. This causes procurement teams checking a new supplier to find nothing that tells them Aksonz can deliver.

I run Astra agency. We build websites for brands like Unilever, AXA, Pertamina. I built a food brand from zero with my family and ran its partnerships, so I know how hard a new name works for a first order.

Shall I build the Aksonz site so procurement teams can see what you supply and who they're dealing with, and send it over?
```

**Flags for Raka.** ICP, a small UAE trading firm, an earlier note called it a lower fit. Ownership
rests on the S.P.C. form and his title, not a register.

---

## Neeraj Sharma, Nesh Group Limited. DRAFTED, no website variant.

**Record.** `jobTitle` Chief Executive Officer. Summary "Entrepreneurial business leader and
senior board advisor", tagline "Board Member | Driving Operational Excellence, Financial Growth &
Digital Transformation". Previously COO at LGT Private Banking, Director at Barclays Investment
Bank, Group CEO at NetOTC. **No `companyDomain` on the record.**

**Statutory.** Companies House, NESH GROUP LIMITED 16245571, incorporated 11 Feb 2025, 124-128
City Road London. **One officer, SHARMA, Neeraj, Director, appointed 11 Feb 2025, born May 1972,
British.** A different Neeraj Sharma's appointments page (Teesside, Transform Autism Care Cambodia)
turned up first and was rejected, it has no Nesh Group.

**The four no website checks, all earned.**
1. **Web search** for Nesh Group Limited and Neeraj Sharma, no site, only LinkedIn.
2. **lemlist `companyDomain`**, none on the record, nothing to fetch.
3. **Other domains.** neshgroup.co.uk and neshgroup.uk serve a 114 byte GoDaddy redirect to
   `/lander`, nameservers domaincontrol.com. neshgroup.com over http serves "Domain parking page".
   nesh-group.com, neshgroup.co, nesh.group and neshgroup.io don't resolve or return nothing.
   Control, bbc.co.uk 200 in the same run.
4. **His company LinkedIn**, "Strategic Management Services", 2 to 10, website link not provided.

**Clues and inference.** Company formed Feb 2025, his own words "senior board advisor" and "Board
Member", the company page's "Strategic Management Services". **SUPPORTED that he's building an
advisory practice for boards. WEAK on anything current**, nothing dated says what he's chasing
this month. The impact is aimed at the practice itself.

### Neeraj, OPENER

```
Hi Neeraj, saw Nesh Group, looks interesting!

I couldn't find your website, and that leaves a board weighing up Nesh Group for an advisory mandate with nothing but your LinkedIn to go on.

I run Astra agency. We build websites for brands like Unilever, AXA, Pertamina. I ran global go to market at Betty Blocks, so I've written for senior buyers who decide before the first call.

Shall I build the Nesh Group site so a board can see your track record before the first call, and send it over?
```

**Flags for Raka.** This is the one I'd defend least. Senior interim mandates mostly come through
networks and search firms, so the pain may not be felt, which is the tuftuf critique. And the
proof line is a stretch toward what he needs.

---

## Paul Prescott, Raise Your Game Ltd. Unblocked, NO_STRONG_ANGLE.

**The old block was the wrong domain.** It probed raiseyourgame.co.uk. His lemlist record gives
`companyDomain` raise-your-game.com, which is live. Companies House, RAISE YOUR GAME LTD 16023811,
**PRESCOTT, Paul, Director, appointed 1 Nov 2024, active.**

**Two false findings caught on the way.** The raw HTML shows "0 Prizes Won, £0 Money Raised, 0
Charities Supported", which are count up counters. Rendered and scrolled they read 750, £80,000 and
50. And a stray `-->` after "Active Network" in the HTML is not visible on the rendered page.

**Why no angle.** A strong live site, Spurs, Newcastle United Foundation and Man City in the
Community on the partner wall, three partnership stories in March 2026. The only candidate, that a
club weighing up a partnership sees no fees or per partner results, fails the red team, B2B
platforms often keep pricing behind an enquiry on purpose. The news stories open in a JS modal,
not broken.

## Emily Levy, Alquimia Legal. Unblocked, NO_STRONG_ANGLE.

**The old block was a dead domain.** alquimialawyers.com still doesn't resolve, but the firm is
live at **alquimialegal.mx**, Wix. Its team section names "Emily Levy, Socia & Subdirectora, Socia
y COO de Alquimia Legal desde 2019 ... lidera la proyección internacional de la firma desde
Francia". A client testimonial names her. She co owns it, the founder is Alejandro Alcántara Gómez.

**A false finding caught.** site-audit's phone shot showed the hero text clipped off the right
edge. A real iPhone profile renders it perfectly. The audit's phone view sent a desktop user agent
and Wix served its desktop layout. **site-audit now uses a real iPhone profile.**

**A near miss on the angle.** Her goal is stated, international presence from France, so "your
site is Spanish only" was the obvious flaw. **It's false.** Wix Multilingual is on and `/en` serves
a full English version. French returns 404, but the English copy is fluent apart from its hero line,
"We protect what its true value gives your business", a one line fix. Privacy notice dated 6 Feb
2026, so the site is new. Tweak level only.

## Debby Alles, Sportcafé de Kogge. Unblocked, NO_STRONG_ANGLE.

**The old block was a name collision** with Sportcafé De Koggenhal in Avenhorn. **Her own lemlist
record settles it**, `companyDescription` "Een gezellig Sportcafé gevestigd in 't Veld. De kantine
van VZV Handbal en Voetbal", Rijdersstraat 112, and "Mede-eigenaar" in her title. dekogge.nl is a
bare nginx default page, nothing else resolves, Facebook is their only presence.

**Why no angle.** It's a sports club canteen whose customers are the club's own members and
visitors, already reached on Facebook, where they post events and closures. A website reaches
almost nobody new. The value is too small, the tuftuf lesson. **Ownership is also only her own
claim**, a 2020 opening article names other operators and no register was opened.
