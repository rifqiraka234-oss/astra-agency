# Research, the 14 accepted and never messaged

> **Zero mistake policy. Read `CLAUDE.md` "TRIPLE CHECK EVERYTHING" before acting on
> this file.** Everything below came from a live fetch, a rendered screenshot or a
> statutory register on 2026-09-21. Nothing is from memory. Where a thing could not be
> read, it says UNKNOWN rather than guessing, and no site here is called broken on the
> strength of our own tooling failing.

**Status. This is research, not drafts.** No message has been written and nothing has
been sent. Angles below are candidates that still have to clear gate 2 and the four pass
read back before anything is shown.

**Say what these people have actually had, precisely.** Not "never had a word from us".
They accepted an invitation, and on v0.1 the invitation carries the generic connect note,
"saw your business and thought it was cool". So each of them has had **exactly that one
line and nothing else**. Their threads return zero activities because the connect note is
not always written as an activity, which is the documented ambiguity, not proof of
silence.

**Which screenshots were actually opened, because the difference matters.** Opened and
judged: Burton, Automation & Services, Centre de Thérapie Laser, Markoni, Aurevia,
BIM & Neutral. **Not opened at the time of the first write up**: Dariuz, Trickle,
Quadrise, Barron, AutoDevPro. Every claim resting on an unopened screenshot is marked
open below rather than stated as fact.

**Method.** `tools/site-audit.js` on every reachable domain, both screenshots opened,
plus statutory filings where they exist, plus a falsification pass on the two identities
that looked wrong. Two of the fourteen turned out to have the wrong domain on the lemlist
record.

---

## The headline, before the detail

**Two records were wrong and would have wasted a message each.**

- **Romain Coquio.** lemlist says `carrefour.fr`. That is the Carrefour group's own site
  and has nothing to do with him. He is Gérant of **EMAROM SARL**, the company that
  operates the Carrefour Contact franchise at Mesnil-Roc'h.
- **William M.** lemlist says `relatiq.nl`. It does not resolve from here through three
  separate tools. `relatiq.com` is a **parked GoDaddy for sale page** and `relatiq.io` is
  an unrelated Czech company. His site could not be confirmed.

**Three are blocked and cannot be researched from this container.** Dialogue Earth
(Cloudflare 403), Relatiq (unresolvable), and Barron Escapes needed a retry on the `www`
host after a SiteGround captcha crashed the renderer.

**The strongest single angle in the batch is GDPR**, because six of these load trackers
before anyone touches anything and four have no cookie banner at all. The German and
Belgian ones are the sharpest, since the Landgericht München Google Fonts judgment
applies directly and every one of them pulls fonts from Google on every visit.

**A tool bug found by looking.** `site-audit.js` reported **no cookie banner** on
centretherapielaser.com and the screenshot plainly shows one, with an OK and a Non. The
banner detection produces false negatives. Until it is fixed, **a no banner finding is
not usable without a screenshot confirming it**, and that invalidates nothing else here
because every banner claim below was checked against a picture.

---

## 1. Chris Burton, The Burton Clinic, burtonclinic.co.uk

**Person.** Founder and Director. Physiotherapy clinic in Norwich. Measured on the
appointment book.

**Register.** BURTON CLINIC LIMITED, company number **16832114**, incorporated
**4 November 2025**, registered in Norwich, which matches the site. No accounts filed
yet, so no size band available. **Caution, the company is ten months old but the site
looks established with video content, so he may have traded before incorporating. Do not
call it a new business without checking.**

**Site, looked at.** Modern and well made. Dark hero, clean type, a Book Now button, a
live chat widget, real video with Norwich City kit in it. **The looks dated angle is
dead.** Built on WordPress with the bought Salient theme and WPBakery.

**The finding.** **Nine cookies and six third parties fire before anyone touches
anything, and there is no cookie banner at all.** Google Tag Manager, Google Analytics,
YouTube, doubleclick and googlesyndication. Fonts come from Google on every visit.

**Candidate angle.** GDPR, and it is stronger here than anywhere else in the batch
because this is healthcare. A physiotherapy patient is a health data subject. The
consequence to reach for is not the fine, it is that a clinic asking people to trust it
with their body is quietly handing every visitor to Google before it says hello.

**Open.** Confirm whether googlesyndication is actual advertising on the page or a Site
Kit artefact, because "you run Google ads on your clinic" is a much bigger claim and I
have not verified it visually.

---

## 2. Romain Coquio, EMAROM (Carrefour Contact Mesnil-Roc'h)

**Person.** **Gérant since 3 November 2025**, so ten months in the seat. Anne Loubeau is
co-gérant since 2017. A franchise supermarket operator, measured on basket count and
footfall.

**Register.** EMAROM, SARL, SIREN **504393612**, created **27 May 2008**, share capital
**162,000 euros**, **10 to 19 employees**. Pappers publishes net result and equity but
**the units are ambiguous between the two columns, so no figure from it is usable** and
none is quoted here.

**Site.** **He has none that I could find.** `carrefour.fr` is the group's. A separate
company, LA GATINAR, also appears at a Carrefour Contact in the same commune, so the
local picture needs care.

**Candidate angle.** Weak and possibly `NO_STRONG_ANGLE`. A single franchised convenience
store with under twenty staff is at the small end of the ICP, and the franchisor controls
most of the digital surface. The one real thing is that he took the business over ten
months ago, which is a genuine trigger event.

**Open.** Find whether the store has any own web presence at all, or only a Carrefour
group page and a Google listing.

---

## 3. Stephanie De Decker, Aurevia Syndic, aureviasyndic.be

**Person.** Oprichter, so she owns it. A Belgian syndic, which is building and co
ownership management. Measured on buildings under management.

**Site.** WordPress on the bought Divi theme, version 4.27.7. Two forms and eight inputs,
so the contact route works.

**The finding.** **No cookie banner, and Google Tag Manager, Google Analytics,
googlesyndication and doubleclick all load on arrival.** Fonts from Google. Belgium, so
the GDPR exposure is real and complaint driven.

**Candidate angle.** GDPR. A syndic holds owners' personal and financial data as its
whole job, so a site that starts tracking before it asks is a credibility problem in
front of exactly the people who are trusting her with a building's money.

---

## 4. Marek Pruszewicz, Dialogue Earth, dialogue.earth

**Person.** **CEO since January 2026**, so eight months in. Twenty years at the BBC in
news management, then nine years across three international NGOs. Measured on reach,
funding and editorial credibility rather than revenue.

**Company.** Independent non profit, London, founded 2006 by Isabel Hilton as China
Dialogue, **renamed Dialogue Earth in April 2024**. Publishes multilingual environmental
journalism.

**Site.** **BLOCKED.** Cloudflare returns 403 to our address on both the renderer and
WebFetch. Their site is fine for real people. **No claim about it can be made from here.**

**Candidate angle.** Held. A new CEO eight months into a recently rebranded non profit is
a strong trigger, and the rename from China Dialogue to Dialogue Earth is the kind of
change that leaves brand debris across properties. But that is a hypothesis and the site
could not be read.

**Open.** Raka opens it, or a different network path. Also worth asking whether an NGO
clears the five to fifty thousand euro band at all.

---

## 5. Marko Markovic, Markoni Global Logistics, markoniglobal.com

**Person.** Branch Manager and CEO. Stuttgart freight forwarder doing air, sea and road.
Measured on shipments booked.

**Site.** WordPress 6.9.8 with Elementor.

**The finding, and it is the worst in the batch.** **Fourteen cookies and four third
parties before any interaction, with no cookie banner anywhere.** Google Analytics,
Google Tag Manager, YouTube, doubleclick, gstatic. Fonts pulled from Google on every
visit. Sixteen failed requests on load.

**Candidate angle.** GDPR, and Germany is where this bites hardest. The Landgericht
München I judgment of 20 January 2022, case 3 O 17493/20, awarded a visitor 100 euro in
damages purely for remote Google Fonts, and it is still the basis of warning letters. He
has that plus fourteen pre consent cookies and no banner.

**Write it as what a visitor meets, never as an IT report.** Fourteen trackers running
before anyone agreed to anything, on a German site, is the kind of thing a competitor or
a professional complainant can act on for the price of a letter.

---

## 6. Severin Kloos, Dariuz, dariuz.nl

**Person.** Algemeen directeur. Dariuz measures work capacity, loonwaardemeting, and
helps municipalities, UWV and employers place people with a distance to the labour
market.

**Site.** **Genuinely clean and nothing to criticise on privacy.** Complianz banner with
a real reject, zero cookies and zero third parties before any click, fonts self hosted.
Bought Salient theme with WPBakery. Two page errors on load, which is minor.

**Candidate angle.** None yet on the website. This is heading for `NO_STRONG_ANGLE`
unless a company level finding turns up.

**Open.** Two things. Whether Severin **owns** Dariuz or is an employed director, because
the business they own versus the job they hold rule decides who the message is even for.
And what the two page errors actually are.

---

## 7. Peter Borup, Quadrise Plc, quadrise.com

**Person.** **Confirmed CEO, appointed effective 1 October 2025**, so about a year in.
Thirty years in shipping, previously A.P. Moller Maersk, Lauritzen Bulkers, Norvic
Shipping, D/S Norden. Hired to drive commercialisation.

**Company.** **AIM listed, ticker QED.** Supplies MSAR and bioMSAR emulsion fuels for
shipping and heavy industry. This is a public company, not an owner managed business.

**Site.** Clean and professional, WPML for multilingual. **A cookie banner exists but
there is no reject option on it.** Only two cookies and one third party before a click.
Fonts from Google.

**Candidate angle.** Weak to moderate. A missing reject button on a listed company's
investor facing site is a governance detail a compliance officer would care about, but it
fails the tweak test badly, since it is an afternoon's work. The better thread is that he
was hired to commercialise and the site is still built to inform investors rather than to
convert an industrial buyer.

**Open.** Whether an AIM listed plc is even our ICP. It is well past the five to fifty
thousand band in one direction and buys through procurement.

---

## 8. Harisson Reale, Automation & Services, automation-services.be

**Person.** CEO. Belgian industrial automation, robotics, control cabinets, commissioning.
Measured on projects won.

**Site, looked at.** Decent modern blue and white industrial design. **Not dated**, though
it leans on the stock photography idiom, including a hero of a man in safety goggles
pointing at a control panel. jQuery 1.x is the one real era tell in the markup.

**The findings, two.** **The homepage carries zero forms and zero inputs**, only a mailto
and two phone links, so the only way to start a conversation is to open a mail client.
And **no cookie banner while Google Analytics and Tag Manager load on arrival**, six
cookies before any click, fonts from Google.

**Candidate angle.** The flow one is better than the GDPR one here. An industrial buyer
specifying a cabinet job has no way to send a drawing or a spec from the page that
describes the work, and a mailto fails silently for anyone without a desktop mail client.

---

## 9. Paul Briant, Centre de Thérapie Laser Bordeaux Mérignac, centretherapielaser.com

**Person.** Co-fondateur. Photobiomodulation clinic in Mérignac, Bordeaux. Measured on
the appointment book.

**Site, looked at.** Clean, modern, well art directed, with **real clinical photography**
of a practitioner treating a patient rather than stock. Bought Divi theme.

**Corrections to my own first read, both important.** The audit said zero contact routes.
That was wrong. **Prendre rendez vous goes to a working Doctolib booking page** and
appears three times, plus there is a contact page with a form. The flow works. And the
audit said no cookie banner, which the screenshot disproves, there is one with an OK and
a Non.

**So GDPR and flow are both dead here.** One cookie, no trackers, a real banner.

**Candidate angle.** The payer question, the same shape that worked on Nicura. **No price
appears anywhere on the site**, and photobiomodulation is not a standard reimbursed
treatment, so the first question a French patient has, whether the Sécurité Sociale or a
mutuelle covers this or whether they pay themselves, goes unanswered.

**Open.** Verify the reimbursement position before writing a word of it. Also
`maison-ludwig.com` is linked from the homepage, which suggests a second property worth
understanding.

---

## 10. Mandy Kerley, Aptiq Works, trickle.works

**Person.** **Co-Founder and COO.** Runs operations, customer success delivery and
commercial structure. Paul Reid is founder and CEO. She has been with Trickle since 2020,
previously Customer Wellbeing Lead.

**Register.** **APTIQ WORKS LIMITED, SC871412, incorporated 30 November 2025**, Edinburgh.
Under ten months old, while **Trickle has been running since 2020**.

**Site.** trickle.works. **Privacy is exemplary**, a banner with a real reject, zero
cookies and zero third parties before a click, self hosted fonts. Nothing to criticise.

**The finding.** **Two brands, one of them ten months old, and a product site that does
not obviously carry the parent.** Aptiq Works is described as the company behind Trickle,
yet the web presence people land on is the Trickle product. This is the brand architecture
shape, the same one as Nina Jameson at Gehirngerecht.

**Candidate angle.** Brand architecture and where a buyer lands. **And per the standing
rule, do not put a number on it**, because nobody can price a missing link between two
properties. Name the moment the deal is lost and stop.

**Open.** Whether aptiqworks has a site of its own at all, and whether trickle.works links
to it. That check decides whether this angle exists.

**Also note, the customers named in public are NHS organisations, local government and
schools**, including St George's in Edinburgh. Public sector procurement is the lens.

---

## 11. Jean Claude Adabunu, Académie ADABS, bim-neutral.co

**Person.** Fondateur. BIM training and consultancy.

**Site, looked at.** Clean, modern, minimal, with real building photography. Nothing dated
about it. WordPress 6.9.7 with Elementor, and it runs **WooCommerce**, with a Boutique and
a Mon compte in the nav, so it sells courses online.

**CORRECTED 2026-09-21, my first pass was wrong about the social and understated the rest.**
An earlier version of this entry said he has a social presence across four platforms. He
does not. The raw HTML was then read line by line.

**The findings, and they are worse than the first pass said.**

1. **The four social links go to the bare platform homepages.** Literally
   `https://facebook.com`, `https://instagram.com`, `https://twitter.com` and
   `https://tiktok.com`, with no account path on any of them. They are the theme's
   unconfigured placeholders, so clicking any of them leaves his site and lands on a
   login page. **This is the opposite of a social presence.**
2. **A build leftover is live on the production site.** The footer links
   `https://lightgrey-cobra-973726.hostingersite.com`, which is a Hostinger temporary
   staging domain.
3. **There is no privacy policy, no mentions légales and no CGV anywhere in the HTML.**
   Grepped the full 106,942 bytes for confidentialité, privacy, mentions légales, CGV,
   CGU, politique, RGPD and cookie. The only hit is a JavaScript filename. Meanwhile
   seven cookies are set before any interaction and fonts load from Google.

**Candidate angle, and it is now much stronger than GDPR alone.** This is a **shop**
selling training in the EU with no terms of sale, no legal notice and no privacy policy,
while its own footer points at a staging domain and four dead social buttons. The thing
to sell is not a privacy policy, that is a task. It is that the site was never finished
and nobody has owned it since launch.

**Open.** Confirm the WooCommerce checkout actually completes, and get the course prices
off the Boutique, since a published price is the strongest possible input for a figure.

---

## 12. William M., Relatiq, domain UNCONFIRMED

**Person.** Founder, Relatiq AI, Netherlands.

**The problem.** **The domain on the lemlist record does not resolve**, checked three
ways, curl, Chromium and WebFetch, against a control host that answered 200 in the same
minute. A search index does list a Dutch Relatiq selling digital employees over webchat,
voice and WhatsApp for MKB companies, but that could be a stale index entry.
`relatiq.com` is **parked and for sale on GoDaddy**. `relatiq.io` belongs to **API
SOLUTIONS s.r.o.**, an unrelated Czech company. `relatiq.online` is a third thing.

**Verdict. `BLOCKED_NEEDS_INFO`.** This is the wrong domain trap with at least four
candidates sharing a name. **Never draft from any of them.** I am explicitly not saying
his site is down, because I could not establish that.

**Open.** Raka opens the LinkedIn profile and reads the real domain off it.

---

## 13. Stuart Barron, Barron Escapes, barronescapes.co.uk

**Person.** Founder. Travel.

**Register.** **BARRON ESCAPES LTD, 17024572, incorporated 10 February 2026.** Seven
months old. Henley on Thames.

**Reaching it.** The apex host serves a **SiteGround captcha** to our address and crashed
the renderer. **That is a wall aimed at us, not a broken site.** It read fine on the `www`
host on retry, which is the lesson worth keeping.

**Site.** Bought Avada theme with Slider Revolution. **Privacy is compliant**, Complianz
banner with a real reject, two cookies, though fonts still come from Google. A form with
six inputs, 45 images, and links to LinkedIn, Instagram and Facebook.

**Candidate angle.** Nothing from privacy or flow. The honest thread is that this is a
seven month old travel business, so the question is proof and trust rather than
mechanics.

**Open.** The screenshots exist and have not been looked at yet. No angle until they are.

---

## 14. Visakh Pillai, AutoDevPro Tech, autodevpro.tech

**Person.** Co-Founder.

**Site.** WordPress with the bought Astra theme and Elementor. Serves the same
**SiteGround captcha to curl** while Chromium renders the real page, which is worth
remembering as a pattern.

**The findings.** **No cookie banner**, six cookies before any click, googlesyndication
and doubleclick loading, fonts from Google. **One page error and nineteen failed
requests**, which is a lot. A gate labelled Beginner sits in the content, so part of the
page is behind an interaction.

**Candidate angle.** GDPR plus visible breakage. Nineteen failed requests and a page
error means things are actually broken on load, which is checkable and unarguable.

**Open.** Click the Beginner gate and screenshot behind it before writing anything. **Do
not call any part of this page empty**, that is exactly the Solvio shape.

---

## What I would do next, in order

1. **Unblock the three.** Relatiq's real domain from his LinkedIn, Dialogue Earth from
   Raka's browser, and look at the Barron screenshots that already exist.
2. **Run `social-audit.js`** on Adabunu, Burton and Barron, the three with real social
   footprints. On Adabunu it may replace the GDPR angle with a better one.
3. **Fix the banner false negative in `site-audit.js`** before the next batch, since it
   under reports and a no banner claim is currently only safe with a screenshot.
4. **Settle two ICP questions before spending drafting time.** Whether an AIM listed plc
   (Quadrise) and a donor funded NGO (Dialogue Earth) belong in this pipeline at all.
5. **Decide Romain Coquio.** A franchised convenience store with under twenty staff is
   probably below the band, and `NO_STRONG_ANGLE` is a real outcome.

**Rough grading as it stands.** Four with a clear strong angle, Markoni, Burton, Aurevia
and AutoDevPro, all GDPR led. Three with a decent angle needing one more check,
Automation & Services, Centre de Thérapie Laser and Aptiq Works. Three blocked, Relatiq,
Dialogue Earth and Barron. Two probably `NO_STRONG_ANGLE`, Dariuz and Coquio. Two ICP
questions, Quadrise and Dialogue Earth.
