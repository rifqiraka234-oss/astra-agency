# Batch 1 of the v0.1 accepted backlog, newest first. 2026-09-22.

**Nothing sent.** One message drafted, four leads killed or blocked with evidence.

The five most recently accepted invitations that never got a message. Every thread was
re-pulled today and all five are empty, confirmed against a call that returned full
threads for more than a hundred other contacts in the same session.

---

## 1. Tim Balogun, CEO, HF Mencap. SENT 2026-09-22 at 06:15:25Z.

> **CORRECTION, 2026-09-22.** A later edit to this file headed this section "DRAFTED, never
> sent". **That is wrong and it was dangerous, because the next session to read it could
> have sent Tim a second opener.** Checked against the system of record rather than the
> file. `get_inbox_conversation(ctc_R3SL6BjDXSjfXM5dz)` returns two activities, the connect
> note of 2026-09-21T17:46:54Z and **`act_bPySKHrQ2JpEL8knw`, a 735 character
> `linkedinSent` at 2026-09-22T06:15:25.702Z** carrying the version WITH the £288,000. The
> queue agrees, Tim's latest row is `SENT` with that timestamp. **The version in the code
> block below is a later rewrite that was never sent to anyone.** What Tim actually received
> is in his queue row and in his thread.

**The £288,000 was cut on 2026-09-22.** It was true and it was their own published
figure, but it was doing nothing except setting a scene, which is precisely what Raka
scrapped the numbers rule to stop. The funding is still the hook, without the number.

**Why he is the right subject.** lemlist has `companyName` HF Mencap but `jobTitle`
"Founder - London Makers", which are different names, so this was checked rather than
assumed. **London Makers is a programme inside HF Mencap**, listed in their own nav under
What We Do, and **Tim Balogun is CEO**, named on
`hfmencap.org/about-us/our-management-team/`. So he is the decision maker and the subject
is his own organisation.

**Verified claims, each reopened today.**

| Claim | Where it was verified |
|---|---|
| London Makers secured £288,000 from The National Lottery | Their own post, `hfmencap.org/national-lottery-funding-secured/`, dated Monday 01 December 2025. The URL was taken out of their homepage HTML after a guessed URL 404d |
| London Makers exists to platform talent and sell work | `/what-we-do/london-makers/`, its own words, "created to platform the ideas, talent and creative potential", "Showcases and sales opportunities", "developing work for sale", "Positions participants as makers and designers" |
| The page carries four images and all four are logos | Scanned `src`, `data-src`, `data-lazy*`, `srcset` and CSS `url()` on that page. Exactly 4 distinct refs, HF_WHITE.svg, HF_Mencap-logo_new.svg, London-Makers.png, Fundraising-Logo.png. Then rendered and looked at the screenshot, which opens on a giant wordmark and then walls of text |

**The falsification pass, and it changed the message twice.**

- **Checked the Gallery.** 7 content images, newest July 2022, and London Makers appears
  there only in the nav.
- **Checked the funding announcement post.** Its 7 images are sidebar and related post
  thumbnails, no work.
- **Cut a claim anyway.** An earlier draft said the work "isn't elsewhere on the site
  either". Three pages is not the whole site, so the message now claims only what was
  counted on the London Makers page itself.
- **Killed a different angle outright.** The homepage markup contains "Please enter your
  MailChimp API KEY in the theme options panel" plus a `wp-admin` link. It looked like a
  live admin error leaking to the public. **It is not.** The panel was clicked in a real
  browser, the only trigger on the page is the close button, and the panel stays at height
  0 and never becomes visible. A visitor does not see it, so it is not in the message.

**A second true angle, deliberately not used.** The site has no cookie banner at all while
Google Analytics and YouTube load before any interaction, setting `_ga`, `_gid`,
`_ga_K05977R9JC` and four YouTube third party cookies including `VISITOR_INFO1_LIVE` and
`YSC`. Their own policy says cookies "do not allow us to identify users personally" and
tells visitors to change their browser settings. Verified three independent ways, the
audit tool's detector with its synthetic positive control, a library grep controlled
against dariuz.nl which does have Complianz, and looking at the screenshot. **Held back
because it fails the tweak test**, a banner is an afternoon's work for whoever maintains
the site, so it is a task not an angle. It is worth raising later as a favour.

```
Hi Tim, saw London Makers landed its National Lottery funding back in December. Brilliant!

However, the London Makers page carries four images and every one of them is a logo, so none of the work is on it. This means a partner or a buyer who hears about the programme and looks it up finds a description of it rather than the makers, and the makers are what you're funded to put in front of people.

I run Astra agency. We build websites and the tools that go on them. I built a food brand from zero with my family and ran the pricing, so I've seen what it takes to turn what people make into what people buy.

Shall I build a London Makers showcase page that puts the makers and their work on screen, with a route for buyers and commissioners?
```

---

## 2. Dr Adrian Steele, Mercian Labels. DEAD. Do not pitch this company.

**He sold it and left.** Three independent sources.

1. **Companies House**, Mercian Labels Limited, company 00951963. `STEELE, Adrian, Dr` is
   listed under resignations, twice, both resigned.
2. **Trade press, opened not summarised.** packagingnews.co.uk, "Mercian Labels has joined
   the Asteria Group, having been acquired for an undisclosed fee."
3. **His own LinkedIn tagline**, carried in lemlist, "Former Owner of Mercian Labels".

A message about the mercianlabels.com website would be pitching a man about a company he
no longer owns. He now describes himself as an investor and a chartered director, which is
not the ICP. **NO_STRONG_ANGLE, and specifically DO_NOT_PITCH_MERCIAN.**

---

## 3. Romain Coquio, Carrefour Contact Mesnil Roc'h. NO_STRONG_ANGLE, and the earlier verdict is confirmed with better evidence.

**The record was contradictory,** `companyDomain` was `carrefour.fr`, a multinational, while
his tagline read "@Tilkal | Traceability & Supply Chain Due Diligence". A search also
surfaced a second LinkedIn slug, so this could have been two people with one name.

**Resolved on the statutory record.** societe.com for EMAROM, SIREN 504393612, the company
operating that Carrefour Contact, prints "M. Romain, Patrick, Jacques COQUIO, né le 4
juillet 1997 à Brest (29) a été désigné en qualité de cogérant à compter du 01/11/2025".
Anne Coquio has been gérant since 2012, so it is a family business. The LinkedIn headline
matches the lemlist tagline word for word, so it is **one person**, cogérant of the family
supermarket and employed at Tilkal.

**Why there is still no angle.** He is a genuine owner operator, but the store's site is
`carrefour.fr/magasin/...`, a corporate franchise page he cannot rebuild, and his only
owned channel is a Facebook page. Selling a website to a Carrefour franchisee means selling
something his franchise does not let him own.

---

## 4. Marek Pruszewicz, CEO, Dialogue Earth. BLOCKED_NEEDS_INFO. Raka has to open it.

`dialogue.earth` returned **403 on every attempt**, title "Just a moment...", which is a
Cloudflare challenge against our address. The control host returned 200 through the same
path in the same minute, DNS resolves, and plain http gives a 301, **so their site is fine
and ours is the blocked party.** Nothing about that site may be claimed, in either
direction.

**What is needed.** Raka opens dialogue.earth and sends a screenshot, per the standing rule
for a Cloudflare wall. There is also an open ICP question on this one, it is a donor funded
non profit newsroom rather than a business with a conversion problem.

---

## 5. Severin Kloos, algemeen directeur, Dariuz. NO_STRONG_ANGLE, and our tooling cannot see their site honestly.

**Two angles were formed and both were destroyed by checking them.**

- **"Six of nine images are broken."** Chromium reported HTTP 415 on six images including
  their own logo and an EU funded by flag. **Direct curl returns 200 and `image/png` for
  the same files.** Pushed further and the same URL returns `image/png`, a 415, or a full
  HTML page depending only on the `Accept` header sent. That is not stable enough to say
  what a real visitor sees, so no breakage claim is safe. Calling their site broken off our
  own failed fetch is the exact mistake the rules forbid.
- **"No named clients or cases."** Their homepage and four subpages carry no reference, no
  case and no testimonial. **Then their publications page named Laborijn**, a real Dutch
  werkbedrijf, so the claim was false and was dropped.

What is actually true is unremarkable. Modern bought theme, Salient and WPBakery, GDPR done
properly with Complianz, a reject button present and zero cookies before any click. **This
is a decent site and there is no honest angle**, which the rules say is a real outcome.
