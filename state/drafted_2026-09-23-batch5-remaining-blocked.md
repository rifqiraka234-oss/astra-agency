# Batch 5, the last four blocked leads plus today's one new acceptance. 2026-09-23. NOT SENT.

**The count.** `get_campaigns_stats` on v0.1 reads **328 accepted, one more than this morning's
327.** The `linkedinInviteAccepted` activities since 22 Sep 20:00 list exactly one, Dan Kavanagh,
11:38Z today. 327 plus 1 equals 328.

**Threads.** Connor, Ferry, Fernando and Shail each hold only their July or August connect note.
Dan's is empty. **Positive control**, Muhammad Akbar's and Neeraj Sharma's threads came back full
through the same call minutes earlier.

**"LinkedIn invitation withdrawn" is not what it says.** Fernando's and Shail's records carry that
status. Their activity history shows `linkedinInviteAccepted` on 11 Aug and then the campaign's
`linkedinWithdrawInvitationDone` step on 29 Aug and 2 Sep. An accepted invitation can't be
withdrawn, so both are still connected. The label is the campaign step, not the connection.

| Who | Verdict |
|---|---|
| Ferry de Haas, InXpress Haarlemmermeer | **DRAFTED**, the InXpress site is boxy and never mentions him, leads go to a head office form |
| Shail Niazi, Clean Valley CIC | NO_STRONG_ANGLE, not the owner, the CEO and co founder is Nicholas LaValle |
| Fernando Gomes, DS Private Matosinhos | BLOCKED_NEEDS_INFO stands, nothing ties him to the branch |
| Connor Bosco, Elevate Marketing | NO_STRONG_ANGLE, a marketing studio, a competitor |
| Dan Kavanagh, Ignition Search | NO_STRONG_ANGLE, a digital marketing agency, a competitor |

---

## Ferry de Haas, InXpress Haarlemmermeer. DRAFTED.

**Record.** lemlist `jobTitle` Co-Owner, of NFJ Solutions, but `experience1` is "InXpress
Haarlemmermeer - Owner" and his whole summary sells express shipping for MKB, DHL, UPS and FedEx,
"Spoed & Express Zendingen", with a phone number and a 10 minute booking link. **He owns the
franchise.** Drimble, Telefoonboek and the Haarlemmermeer Business Plaza all list "Ferry de Haas
h.o.d.n. InXpress Haarlemmermeer", a sole trader trading as, KVK 29280788, Bolivar 50 Hoofddorp.
NFJ Solutions is a side venture, and nfj-solutions.com sits behind a SiteGround robot challenge for
every tool, so it can't be read.

**The surface is ferrydehaas.nl, and it's his.** WordPress, user id 1 is "Ferry", slug
`ferry-dehaasgmail-com`. Title "Ferry de Haas | Zakelijk Adviseur". The three testimonials on the
homepage are all logistics customers.

### The finding, and it isn't a design one

**The site has 130 published posts, every one by a second user called "Arjen", all since 14
September 2026, and every one is a casino or betting article.**
- `wp-json/wp/v2/posts` reports `X-WP-Total: 130`, rechecked twice, the second time minutes before
  writing this.
- Oldest 2026-09-14 16:08, hitnspin-pl, then 1xbet-es, 888bet-de, winbet-gb. Newest today 13:25,
  Norwegian, nye-casinoer-no, krypto-no, no-kyc-no, curaçao lisens. 21 posted today.
- All 100 on the first page have author 4, Arjen, and category 1, Niet gecategoriseerd.
- **Opened two in full.** `/2026/09/23/nye-casinoer-no/` returns 200, Norwegian casino copy, "By
  Arjen", page title "Hvorfor velge Nye-casinoer i 2024? – Ferry de Haas | Zakelijk Adviseur".
  `/2026/09/14/888bet-de/` returns 200, German betting copy linking out to `888bet.de.com`.
- **No robots noindex** on either, so they're indexable.
- **Not linked from the homepage**, and the /blog page lists none, so a visitor clicking around
  won't see them. A web search for them found nothing indexed yet, which proves nothing either way.
  **The message claims they exist under his name, not that Google shows them.**
- The site's real pages were last modified 2022 to 2023. The homepage was modified 18 Sep 2026.

**Hacked or deliberate.** 130 posts in six languages in nine days, roughly one every seven
minutes, for betting brands, from a second account, is the pattern of automated spam injection.
Some small sites sell such posts on purpose, and we can't rule that out. **So the message states
the fact and leaves the judgement to him.** It never says hacked and never names Arjen.

**A second true finding, not used.** His own homepage copy is generic business advice, "Neem
controle over uw bedrijf met oplossingen van wereldklasse!", and never says express shipping. DHL,
UPS, FedEx, InXpress and spoed all appear zero times. Shipping only appears inside the three
testimonials. One flaw per message, and the spam is the serious one.

**A false finding caught.** The video on his homepage shows "Media error, Format(s) not supported"
in both our renders. The mp4 serves 200 as video/mp4. The Chromium build here has no H.264 codec,
real Chrome plays it. Ours, not his.

**Render.** site-audit printed RENDER NOT TRUSTED, render-via-curl served 21 with 0 curl errors
and 0 undecoded images, both parts read.

**Tests.** Positive control, the REST API returned his real pages and users, so the posts
endpoint works. Tweak test, deleting 130 posts is quick, but finding how a second account got in
and stopping it is real work for a non technical owner, and the damage to his name is not a tweak.
Red team, above, the message states only what's verifiable.

### Ferry, OPENER

Third version, 2026-09-24, on Raka's steer. The InXpress site is his website, roast all of it. The
earlier "your page is gone" version is withdrawn, Raka pointed out it overstated things, the
location pages went because InXpress rebuilt the whole site, not because anything broke.

**In plain words.** Ferry's customers find him through nl.inxpress.com. It's a stack of separate
boxes and stock photos, and nothing on it mentions Haarlemmermeer or Ferry. A local business that
wants a shipping partner ends up filling in an 18 question head office form, and head office
decides who gets them. He's a logistics man, not a web man, so he won't see those enquiries go.

**Verified, 2026-09-24.**
- **All 9 pages** from the sitemap, screenshotted full length on desktop and iPhone and looked at.
  Every one was rebuilt 17 and 18 August 2026, careers 4 September. So it's new, and still boxy,
  Raka's read, "squary, things in islands, doesn't flow, gaps". Cream and white cards, 12 carrier
  logos each in its own box, stock warehouse photos.
- **Zero mentions** of Haarlemmermeer, Hoofddorp, Schiphol, Ferry or de Haas on any of the 9.
  Positive control, the same search finds head office's Eindhoven address on every page.
- **The team sitemap is empty.** No franchise pages exist on the new site.
- **The quote form**, /verzendofferte/, has 18 visible questions, 13 required, rendered and counted.
- **Not used.** The form's phone field showed a US flag for us. It picks the country by the
  visitor's location and our server isn't Dutch, Raka's own screenshot shows the Dutch flag. The
  address field reads "zonder suite, unit of appartementnummer", a US form translated word for word,
  true but a detail. A few images didn't finish decoding in our render, likely lazy loading.

```
Hi Ferry, saw InXpress Haarlemmermeer, looks interesting!

However, your site is a stack of separate boxes and stock photos, with nothing on it about Haarlemmermeer or you. This causes local businesses looking for a shipping partner to fill in an 18 question head office form instead of calling you.

I run Astra agency. We build websites for brands like Unilever, AXA, Pertamina. I built a food brand from zero with my family and ran acquisition, so I've seen what a lost enquiry costs a small business.

Shall I build the InXpress Haarlemmermeer page so local businesses can find you and call you directly, and send it over?
```

**Flags for Raka.**
- He can't change nl.inxpress.com, head office owns it. The offer is his own local page, which may
  need head office's OK on the brand.
- "your site" means the InXpress site. He may read it as ferrydehaas.nl, which is also his.

---

## Shail Niazi, Clean Valley CIC. NO_STRONG_ANGLE, and a note for Raka.

**The old block was wrong.** It rejected cleanvalleycic.com, a Nova Scotia land based aquaculture
firm, as a name clash with a UK Community Interest Company. Shail is in Canada, his tagline says
"Ocean Tech Innovator", and his own LinkedIn headline reads "Shail Niazi, MBus, MA, Clean Valley
CIC". It is his company in the sense that he works there.

**But he doesn't own it.** His `jobTitle` is Chief Culture Officer. The Canadian Intellectual
Property Office's own blog post on Clean Valley CIC, last modified 25 Apr 2022, names **Nicholas
H. LaValle, CEO and co founder**, and doesn't mention Shail.

**The note.** cleanvalleycic.com is down right now. r.jina.ai returns a Wix "ConnectYourDomain
Error" with a 404, WebFetch returns 503, our curl gets nothing. On 13 Sep a previous session read
it as "Clean Valley CIC | Aquaculture R&D in Nova Scotia". So the domain has come unhooked from
Wix in the last ten days. The person to tell is LaValle, who isn't a lead.

## Fernando Gomes, DS Private Matosinhos. BLOCKED_NEEDS_INFO stands.

His contact record reads "Compliance Engineer | MBA | Real State | Tennis", a contractor test
engineer at Roche, based in Lima. DS Private Matosinhos is a Portuguese estate agency branch of a
franchise network, trading through idealista, Instagram and Facebook. A search for the two
together returned nothing that connects him to it. The job he holds is engineering, and the
business is unproven as his.

## Connor Bosco, Elevate Marketing. NO_STRONG_ANGLE.

**The old block probed the wrong domain.** It read elevatemarketing.ca, a parked lander. His record
gives elevatemarketingstudio.com, which serves a Wix "COMING SOON" page titled "Home | My Site",
239 Four Mile Creek Road, Niagara on the Lake, © 2025. But Elevate is a marketing studio, and he
also works as Advertising Manager at CARTESIAN. A competitor, same verdict as before on better
evidence.

## Dan Kavanagh, Ignition Search. NO_STRONG_ANGLE.

Accepted today 11:38Z. Owner of Ignition Search, "an award winning, Google Premier Partner agency",
SEO, paid media and conversion, since 2007. A competitor. Their homepage shows "555-555-5555" as a
phone number, a leftover template placeholder, noted and not used.
