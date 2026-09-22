# Batch 2, second attempt. 2026-09-22. NOT SENT.

> **REVIVED 2026-09-22, and reframed by Raka.** The angle was killed earlier today because a
> search index still returns `https://www.relatiq.nl/` with detailed content, which meant I
> could not assert the company has no website. **Raka then said he cannot find it either,
> and to say exactly that.** So the message no longer claims anything about his
> infrastructure. It reports what happened when somebody went looking, which is both honest
> and the thing a customer actually experiences.
>
> **The search was then run properly, which is what should have happened first.** Every live
> Relatiq domain belongs to **a different company**. `relatiq.io` is a data product,
> `relatiq.co` is a LinkedIn CRM, `relatiq.app` is a consumer app that reads your texts for
> attachment styles, `relatiq.com` is an empty 114 byte placeholder. `relatiq.nl`, the domain
> lemlist holds for him, has no A record. So "I could not find it" is an earned claim rather
> than a hedge.
>
> **The lesson stands and it is mine.** I swept DNS five ways and tried four fetch paths
> before ever running a plain web search for the company's own site. Written into RULES.md
> section 3.
>
> **And the root cause is one layer lower.** `relatiq.nl` came from lemlist's `companyDomain`
> field, which has already been wrong twice today, `carrefour.fr` for Romain Coquio and
> `trickle.works` for Mandy Kerley. I reconciled the company against itself per section 0B
> and never asked whether the DOMAIN was current.

Raka asked me to try again and to use a different browser. There is no browser extension or
desktop browser in this container, but there was one fetch path I had never tried, and it
settled the question.

---

## William Mayvis, Relatiq. DRAFTED, reframed as what we could not find.

### The finding, now on five independent paths with positive controls

**`relatiq.nl` publishes mail but publishes no web address.**

| Record | Result |
|---|---|
| NS | `beth.ns.cloudflare.com`, `michael.ns.cloudflare.com` |
| MX | `relatiq-nl.mail.protection.outlook.com` |
| TXT | SPF including `spf.protection.outlook.com`, plus a Microsoft verification token |
| **A** | **none, apex and www** |
| **AAAA** | **none** |
| **CNAME** | **none, apex and www** |
| CAA | none |

The zone is live and answering. It simply contains no address for a browser.

**Five independent paths agree, and three of them carried a positive control.**

1. Our Chromium and curl, `ERR_TUNNEL_CONNECTION_FAILED` and no DNS.
2. **Cloudflare DoH**, full record sweep above.
3. **Google DoH**, no A, AAAA or CNAME. Control, `trickle.works` returned real IP addresses
   through the same call in the same minute.
4. **An external reader service on a different network**, "Domain could not be resolved".
5. **WebFetch, a different service again**, `getaddrinfo ENOTFOUND www.relatiq.nl`. Control,
   the same tool loaded `trickle.works` in the same minute and described the page.

**The one contradiction, handled.** A search index still lists `https://www.relatiq.nl/`
with the title "Relatiq - Digitale medewerkers voor MKB-bedrijven | Webchat, Voice,
WhatsApp". It could not be opened at source. The Wayback check that would have dated it is
**void**, because its availability API also returned NO SNAPSHOT for bbc.co.uk, so the
method failed its own control. A search index routinely keeps entries after a domain stops
resolving, and by our own evidence ladder a snippet never outranks a live check. It does
tell us the proposition, and it agrees with lemlist's description of the company.

**Why the message no longer rests on any of this.** All of the above is why I BELIEVE there
is no site, but belief is not the standard. The message now says only what a person did and
found, so the worst case is he replies with a URL and we look like someone who went looking.

### The person

lemlist gives `jobTitle` "Experience Founder Relatiq AI", `companyName` Relatiq,
`companyLinkedinUrl` `linkedin.com/company/relatiq-ai`. His tagline still reads "Co Founder
AgileArch", which is the stale one, and `agilearch.nl` does not resolve either. His other
company is real and working, `mayvision.nl` returns 200 as Mayvision IT, an Azure
consultancy. So Relatiq is the current venture and the one without a site.

### The draft

```
Hi William, saw Relatiq, looks interesting!

However, I went looking for the website and couldn't find it. relatiq.nl didn't load for me, and the other Relatiq domains turn out to be other companies. This means anyone who hears about Relatiq and goes looking ends up where I did, and for software nobody has tried yet, the site is the whole first impression.

I run Astra agency. We build websites and the tools that go on them. I spent a year and a half at Betty Blocks on go to market for Dutch software, so I know what MKB buyers want to see before they book anything.

Shall I build Relatiq a first page that shows the assistant answering a real customer question, and send it over?
```

---

## Mandy Kerley. A second angle found, and deliberately NOT drafted.

**What is verified.** All three Aptiq Works domains, `aptiqworks.com`, `www.aptiqworks.com`
and `aptiqworks.co.uk`, 301 in one hop to `trickle.works`. And trickle.works contains
**zero** occurrences of consult, fractional, advisory, interim or unstuck. The only mention
of the parent company anywhere is the footer, "© 2026 Aptiq Works Limited. Trickle is a
product of Aptiq Works."

Meanwhile lemlist carries Aptiq Works' own description, "Aptiq Works helps organisations
under pressure get unstuck and deliver change faster". So the consultancy proposition has no
web presence, and anyone who hears about Aptiq Works and types the domain lands on employee
engagement software instead.

**Why it is not drafted.** The red team question is whether the site is deliberately serving
another goal, and here it plausibly is. They may have consolidated on the product on
purpose, in which case the message reads as "you do not understand your own business". That
is exactly the Michael Barthel failure. I also cannot date lemlist's scrape of that company
description, so the inconsistency may not be live. **Raka's call.** If he wants it, the
angle is real and the evidence above is solid.

She also still does not own the company, Companies House gives Paul Kenneth Reid 75% or more
of shares and votes and the right to appoint directors, as sole officer and sole PSC.

---

## Peter Borup, Quadrise. Looked at properly this time, still no.

I closed this on ICP without opening the site, which was not good enough, so it was audited
and the screenshot opened.

**What is actually there.** `quadrise.com` returns 200, zero page errors, zero failed
requests. The homepage is **stock nature photography** with the line "Innovative energy
solutions for a cleaner planet", which would read identically on a hundred other energy
sites. The header carries a live **share price of 1.21p**. The cookie banner offers
**Accept and a settings link with no reject button**, confirmed against a working control,
while two cookies and one third party load before any click and Google Fonts load remotely.

**So there are two true observations.** A generic homepage on a company that needs investor
and partner confidence, and a consent banner with no reject on a company that publishes a
Governance section.

**It is still no.** The banner is an afternoon's work for whoever maintains the site, so it
fails the tweak test, and the homepage point is soft. More to the point, Quadrise is AIM
listed with Investor Relations, AIM Rule 26 and Regulatory News in its nav, and a listed
plc does not buy a website from a LinkedIn message. Forcing this would be manufacturing a
fit. Raka overrules if he wants listed companies in scope.

---

## Unchanged

**David Marian, CLUUE.** DO_NOT_CONTACT. Karim's co founder, live warm thread.
**Daan Erisman, tuftuf.** NO_STRONG_ANGLE, and the three further properties in his tagline
were checked this pass and none of them opens anything.
