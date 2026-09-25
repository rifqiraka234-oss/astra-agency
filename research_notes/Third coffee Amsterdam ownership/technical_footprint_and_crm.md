# Technical and digital footprint of third.nl / Third (Amsterdam) and El Encanto, plus lemlist CRM check

All observations were made on **2026-09-25 between 19:48 and 19:59 UTC** using curl, DNS-over-HTTPS (dns.google) and RDAP (rdap.sidn.nl / rdap.nic.amsterdam) from this session. Raw values are quoted exactly. Evidence labels used: **CONFIRMED** (reproduced directly from a primary technical source, or 2+ independent sources), **SINGLE-SOURCE**, **UNVERIFIED**. Strength labels: **STRONG** means a unique shared account, ID or string. **WEAK** means shared commodity infrastructure (a mass-market host, a platform or a registrar), which does not imply common ownership.

## Q0. Overall answer: does any technical evidence link third.nl / Third to specific people or companies, and to El Encanto?

### Takeaway
**third.nl is not the coffee business's website.** It is an abandoned 2014/2015 WordPress photoblog install on Strato hosting, and nothing on it identifies the owner. The Amsterdam coffee business "Third." runs on **third.amsterdam**. The only strong technical clue there is the WordPress admin author slug **"racod"**, which ties the site's build and admin to the web agency **RACOD** (KvK 78249023), i.e. the web builder, not an owner. **No technical artefact links third.nl or third.amsterdam to El Encanto.** No shared tag IDs, hosting, registrar, nameservers, mail setup, contact handles, e-mail domains or phone numbers were found. No lemlist CRM records exist for Third, third.nl, third.amsterdam or El Encanto.

### Cited Findings
Evidence matrix (raw values; details in Q1 to Q7):

| Clue | third.nl | third.amsterdam (Third.) | El Encanto (Amsterdam: elencanto.nl / el-encanto.nl) | El Encanto (Bonaire) | Shared? / strength |
|---|---|---|---|---|---|
| Registrar | "Domain Robot" (InterNetX; abuse domain-abuse@internetx.com) | Metaregistrar BV Applications (IANA 2288) | Realtime Register, reseller Argeweb | elencantobonaire.com not registered (Verisign RDAP 404) | Not shared |
| Nameservers | shades19.rzone.de, docks04.rzone.de (Strato) | nsn1/nsn2.mijndomein.nl | ns1.argewebhosting.eu, ns2.argewebhosting.com, ns3.argewebhosting.nl | NXDOMAIN | Not shared |
| Web IP | 81.169.145.146 / 2a01:238:20a:202:1146:: | 194.213.127.62 / 2a01:448:4005::62 | 145.131.10.225 (elencanto.nl), 145.131.10.226 (el-encanto.nl) | none | Not shared |
| MX / SPF | 5 smtp.rzone.de; no SPF; DMARC "v=DMARC1;p=reject;" | 5 mx1 / 6 mx2.mijndomein.nl; "v=spf1 a mx include:spf.mijndomeinhosting.nl ~all" | 1 bounce.argewebhosting.nl; "v=spf1 -all"; "v=DMARC1;p=quarantine" | none | Not shared |
| Registry contact handles | registrant CMK000068-INETX; admin DHR004261-INETX; tech/admin STR017999-INETX | fully redacted (REDACTED-SIDN) | admin THO036789-FIRST; tech ARG004269-FIRST (same on both domains) | n/a | Not shared (third.amsterdam not comparable) |
| Analytics / GTM / Pixel IDs | none retrievable (site broken) | none present (no G-, GTM-, UA-, AW-, fbq, ca-pub) | none (parking page) | site gone | No IDs to compare |
| Platform / theme | WordPress 3.8.1, theme folder "third" = "Reversal" 1.1.1 by bitfade (ThemeForest) | WordPress 7.1.2, Divi 4.27.4, Complianz, WPForms Lite | Argeweb parking page | n/a | Not shared |
| Builder credit / admin | none | WP user id 1 "admin", slug **"racod"** | none | n/a | Links Third. to RACOD (STRONG for builder) |
| Contact e-mail / phone | none | hello@third.amsterdam; no phone | none | +599 782 5600 (business line, per listings) | Not shared |

- third.nl returns only "Your PHP installation appears to be missing the MySQL extension which is required by WordPress." over HTTP, and fails TLS over HTTPS. **CONFIRMED.** [http://third.nl/](http://third.nl/)
- third.amsterdam is the live site of "Third." at Wielingenstraat 22, 1078 KK Amsterdam. **CONFIRMED** (site plus search index). [third.amsterdam](https://third.amsterdam/); [search index: "Modern Bakery and Coffee"](https://third.amsterdam/cookiebeleid-eu/)
- The WP REST API user list for third.amsterdam shows `{"id":1,"name":"admin","slug":"racod","url":"https://third.amsterdam"}`. **CONFIRMED.** [third.amsterdam/wp-json/wp/v2/users](https://third.amsterdam/wp-json/wp/v2/users)

### Inferences
- The premise "third.nl = Third's website" is almost certainly wrong. The CRM or domain confusion probably comes from the Instagram handle **@third_nl** ([instagram.com/third_nl](https://www.instagram.com/third_nl/), linked from the third.amsterdam footer). Nothing in third.nl's DNS, RDAP or files ties it to the bakery.
- The only strong technical link found runs Third. → RACOD (web agency). That identifies the site builder or administrator, not the owner.
- Technically, Third. and El Encanto look independent: different registrars, hosts, DNS operators and mail setups, and no tag IDs to compare. This is **absence of evidence**, not proof of separate ownership: El Encanto (Amsterdam) has no live website to compare.

### Gaps
- Owners of both businesses must come from the KvK / registry side (Third Grounds B.V. KvK 97420980 per sibling notes; Restaurant El Encanto VOF KvK 91130379). Technical data cannot name them.

## Q1. WHOIS/RDAP: who registered third.nl (and the comparison domains), and when?

### Takeaway
third.nl was registered **2005-07-29** via InterNetX and has Strato DNS. The registrant is redacted by SIDN ("REDACTED FOR PRIVACY"), which is SIDN's standard treatment of private-person registrants. The record was "last changed" on **2026-02-20**. third.amsterdam was registered **2025-06-11** via Metaregistrar, the registrar behind Mijndomein. The two El Encanto .nl domains were registered **13 seconds apart on 2023-10-10** by the same admin handle.

### Cited Findings
- **third.nl** RDAP (2026-09-25T19:48:33Z): `registration 2005-07-29T09:48:24Z`, `last changed 2026-02-20T21:24:15Z`, status `active`, `delegationSigned: false`. Registrant handle `CMK000068-INETX` (fn "REDACTED FOR PRIVACY"), administrative `DHR004261-INETX`, technical `STR017999-INETX` (its entity record lists roles administrative + technical), registrar entity `0000` "Domain Robot" with abuse contact `domain-abuse@internetx.com`. Nameservers `shades19.rzone.de`, `docks04.rzone.de`. The privacy notice reads "The registrant's details can be withheld from public view." **CONFIRMED.** [rdap.sidn.nl/domain/third.nl](https://rdap.sidn.nl/domain/third.nl); entity lookups: [CMK000068-INETX](https://rdap.sidn.nl/entity/CMK000068-INETX), [STR017999-INETX](https://rdap.sidn.nl/entity/STR017999-INETX), [DHR004261-INETX](https://rdap.sidn.nl/entity/DHR004261-INETX)
- **third.amsterdam** RDAP (19:51:41Z): `registration 2025-06-11T07:00:56Z`, `last changed 2026-06-11T00:15:02Z`, `expiration 2027-06-11T07:00:56Z`. Registrar "Metaregistrar BV Applications" (IANA Registrar ID `2288`). All contact handles are shown as `REDACTED-SIDN`. Nameservers `nsn1.mijndomein.nl`, `nsn2.mijndomein.nl`. **CONFIRMED.** [rdap.nic.amsterdam/domain/third.amsterdam](https://rdap.nic.amsterdam/domain/third.amsterdam)
- **elencanto.nl** RDAP: `registration 2023-10-10T18:56:42Z`, admin `THO036789-FIRST`, tech `ARG004269-FIRST`, registrar "Realtime Register", reseller "Argeweb". **el-encanto.nl**: `registration 2023-10-10T18:56:29Z` with the identical admin and tech handles, registrar and reseller. **CONFIRMED.** [rdap.sidn.nl/domain/elencanto.nl](https://rdap.sidn.nl/domain/elencanto.nl); [rdap.sidn.nl/domain/el-encanto.nl](https://rdap.sidn.nl/domain/el-encanto.nl)
- **racod.nl** (Third.'s web builder): `registration 2007-06-20T09:40:06Z`, `last changed 2023-11-10T00:53:53Z`, admin `COD000359-METAR`, tech `MIJ000876-METAR`, registrar "Metaregistrar B.V.", reseller "Mijndomein Hosting BV". **CONFIRMED.** [rdap.sidn.nl/domain/racod.nl](https://rdap.sidn.nl/domain/racod.nl)
- For the sibling-identified ventures of Andrew El Safoury: **thisisstaff.nl** was registered `2022-07-21T12:05:30Z`, admin `AND042470-METAR`, tech `MIJ012811-METAR`, Metaregistrar / Mijndomein. **sweetella.nl** was registered `2015-08-08T18:20:07Z`, registrant `MAX021757-METAR`, admin `MAX021758-METAR`, tech `MIJ012811-METAR`, Metaregistrar. **CONFIRMED.** [rdap.sidn.nl/domain/thisisstaff.nl](https://rdap.sidn.nl/domain/thisisstaff.nl); [rdap.sidn.nl/domain/sweetella.nl](https://rdap.sidn.nl/domain/sweetella.nl)

### Inferences
- The "Domain Robot" registrar name plus the internetx.com abuse address means InterNetX is the registrar for third.nl, with Strato as the hosting/DNS provider (see Q2). The "-INETX" handle suffix fits this. None of third.nl's handles appear on any other domain checked.
- elencanto.nl and el-encanto.nl are **definitely held together** (STRONG: same admin handle, registered 13 s apart). Their tie to "Restaurant El Encanto, Scheldeplein 18" (KvK 91130379) is **UNVERIFIED**: the domains are parked and name no one. The 2023 registration date is consistent with a 2023-era KvK number, but that is weak.
- thisisstaff.nl and sweetella.nl share the technical-contact handle `MIJ012811-METAR`, while racod.nl has a different one (`MIJ000876-METAR`). This **may** mean the two sit in the same Mijndomein customer account, but how Mijndomein assigns tech handles is **UNVERIFIED**, so this is a weak-to-moderate clue only. third.amsterdam's handles are redacted, so it cannot be compared.
- The "last changed" dates of racod.nl (2023-11-10 00:53), sweetella.nl (2023-11-10 03:27) and thisisstaff.nl (2023-11-11 00:52) cluster within about 48 h. This looks like a Mijndomein-wide bulk registry operation (WEAK, not ownership evidence).
- third.nl's "last changed 2026-02-20" could reflect a contact, holder or NS change. SIDN does not say which. It falls close to the only known Wayback capture (2026-02-14, see Q4). Meaning unknown.

### Gaps
- The registrant identity of third.nl is hidden. There is no free historical WHOIS for .nl, and SIDN's own WHOIS shows the same redaction. Its registration date (2005) predates the bakery by about 20 years, so the holder is probably a different party, but that is not proven.
- The handle-prefix pattern (e.g. "AND…", "THO…", "COD…") may derive from contact names, but that is **UNVERIFIED** and must not be used as identification.

## Q2. DNS: hosting, mail, verification records and shared infrastructure

### Takeaway
third.nl sits on **Strato** shared hosting and mail with no SPF and no verification tokens. third.amsterdam sits on **Mijndomein** (Plesk) with Mijndomein mail, the same provider stack as its builder RACOD and as sweetella.nl / thisisstaff.nl. The El Encanto .nl domains are **Argeweb**-parked with mail disabled. No verification tokens (Google, Facebook, Microsoft) exist on any of these domains, so no shared-account tokens exist to compare.

### Cited Findings
- **third.nl** (19:48:26Z): `A 81.169.145.146`; `AAAA 2a01:238:20a:202:1146::`; `NS shades19.rzone.de., docks04.rzone.de.`; `MX 5 smtp.rzone.de.`; **no TXT records** (no SPF, no google-site-verification, no facebook-domain-verification, no MS=). `_dmarc TXT "v=DMARC1;p=reject;"`. `SOA docks04.rzone.de. hostmaster.strato-rz.de. 2020060773 86400 7200 604800 300`. `www` is a CNAME to `third.nl.`. `shop.third.nl` has no A record (NOERROR/empty), while MX answers appear on arbitrary subdomains (wildcard MX on mail., autodiscover., shop.). The DKIM selectors default/google/selector1/k1 are NXDOMAIN. **CONFIRMED.** [dns.google third.nl NS](https://dns.google/resolve?name=third.nl&type=NS); [dns.google third.nl TXT](https://dns.google/resolve?name=third.nl&type=TXT); [dns.google _dmarc.third.nl](https://dns.google/resolve?name=_dmarc.third.nl&type=TXT)
- **third.amsterdam** (19:50:53Z): `A 194.213.127.62`; `AAAA 2a01:448:4005::62`; `NS nsn1.mijndomein.nl., nsn2.mijndomein.nl.`; `MX 5 mx1.mijndomein.nl., 6 mx2.mijndomein.nl.`; `TXT "v=spf1 a mx include:spf.mijndomeinhosting.nl ~all"`; `_dmarc` → `dmarc-none.mijndomein.nl.` with `"v=DMARC1; p=none; sp=none; pct=100; adkim=r; aspf=r; rua=mailto:dmarc@reportdmarc.nl; rf=afrf; fo=0; ri=86400"`. HTTP headers: `server: nginx`, `x-powered-by: PHP/8.3.33`, `x-powered-by: PleskLin`. **CONFIRMED.** [dns.google third.amsterdam TXT](https://dns.google/resolve?name=third.amsterdam&type=TXT); [dns.google _dmarc.third.amsterdam](https://dns.google/resolve?name=_dmarc.third.amsterdam&type=TXT)
- **racod.nl**: `A 194.213.127.15`; `NS nsn1/nsn2.mijndomein.nl`; `MX 5 mx1 / 6 mx2.mijndomein.nl`; `TXT "v=spf1 a mx  include:spf.factuursturen.nl include:spf.mijndomeinhosting.nl ~all"` plus an apex DKIM TXT (`v=DKIM1;k=rsa;p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC30EEKOn4f…`). **CONFIRMED.** [dns.google racod.nl TXT](https://dns.google/resolve?name=racod.nl&type=TXT)
- **sweetella.nl**: `A 194.213.127.58`, Mijndomein NS and MX. Over HTTP it redirects to google.com. **thisisstaff.nl**: Mijndomein NS, no A record. **sweetella.com**: `NS ns03/ns04.domaincontrol.com` (GoDaddy), Google Workspace MX (`aspmx.l.google.com` etc.). **CONFIRMED.** [dns.google sweetella.nl](https://dns.google/resolve?name=sweetella.nl&type=A); [dns.google thisisstaff.nl NS](https://dns.google/resolve?name=thisisstaff.nl&type=NS)
- **elencanto.nl**: `A 145.131.10.225`; `AAAA 2001:678:76c:3760:301::8`; `NS ns1.argewebhosting.eu., ns2.argewebhosting.com., ns3.argewebhosting.nl.`; `MX 1 bounce.argewebhosting.nl.`; `TXT "v=spf1 -all"`; `_dmarc "v=DMARC1;p=quarantine"`. **el-encanto.nl**: `A 145.131.10.226`, same Argeweb NS, `MX 1 bounce.argewebhosting.nl.`, `TXT "v=spf1 -all"`. **CONFIRMED.** [dns.google elencanto.nl](https://dns.google/resolve?name=elencanto.nl&type=TXT); [dns.google el-encanto.nl](https://dns.google/resolve?name=el-encanto.nl&type=A)
- **elencantobonaire.com** and www: NXDOMAIN (Status 3) for all record types; Verisign RDAP returns HTTP 404 (not registered). **CONFIRMED.** [dns.google elencantobonaire.com](https://dns.google/resolve?name=elencantobonaire.com&type=A); [rdap.verisign.com](https://rdap.verisign.com/com/v1/domain/elencantobonaire.com)
- Other candidate El Encanto domains are NXDOMAIN: elencantoamsterdam.com, restaurantelencanto.nl, elencanto-amsterdam.nl, elencanto.amsterdam, elencantorestaurant.nl, elencantosteakhouse.nl/.com, elencantobonaire.nl/.net/.info, elencanto-bonaire.com, hotelelencantobonaire.com, elencantobonairehotel.com, elencanto.bq. restaurantelencanto.com is a parked for-sale domain (`TXT "afternic-verification-aGHTsEA2nLa7KRqzmJySAx"`, NS `ns1/ns2.dns-redirect.com`), so it is unrelated. **CONFIRMED** (DoH queries).

### Inferences
- Shared Mijndomein IP ranges (194.213.127.15 / .58 / .62) and Mijndomein mail are **WEAK** on their own, because Mijndomein is a mass-market Dutch host. Combined with the "racod" WP slug and the identical Divi + WP 7.1.2 stack, they are consistent with RACOD registering and hosting third.amsterdam in its own reseller or customer account. That is about the builder, not the owner.
- Strato (third.nl) versus Mijndomein (Third.) versus Argeweb (El Encanto): no common infrastructure at all.
- The third.nl SOA serial 2020060773 suggests the zone was last edited around 2020-06-07 (a Strato-style date serial). This is **UNVERIFIED** interpretation.

### Gaps
- Reverse-IP lookups (hackertarget) failed with "API count exceeded". The shared IPs are on mass-market hosts anyway, so co-hosted domain lists would be weak evidence.
- crt.sh returned HTTP 502 on 6 attempts (third.nl and third.amsterdam), so certificate-transparency subdomains and certificate organisation names were not obtained. Note that third.nl currently fails the TLS handshake entirely.

## Q3. Page source: platform, theme, credits, tag IDs, contacts, legal entity

### Takeaway
**third.nl:** an abandoned WordPress 3.8.1 install (files dated Feb 2014 / Feb 2015) with a ThemeForest "Reversal" photoblog theme in a folder named "third". There is no content, no IDs and no identity. **third.amsterdam:** WordPress 7.1.2 + Divi, built July/Aug 2025, with no analytics or pixel IDs, no JSON-LD, no KvK/BTW and no designer credit. Contact is hello@third.amsterdam at Wielingenstraat 22. The admin slug "racod" points to the RACOD web agency.

### Cited Findings
**third.nl (HTTP only; HTTPS: `sslv3 alert handshake failure`; WebFetch: HTTP 503)**
- Headers: `server: Apache/2.4.68 (Unix)`, `x-powered-by: PHP/8.4.25`. Body (95 bytes) on every dynamic URL (/, robots.txt, sitemap.xml, wp-json/, /privacy, /contact): "Your PHP installation appears to be missing the MySQL extension which is required by WordPress." `wp-login.php` and `xmlrpc.php` return 503; `wp-content/uploads/` returns 404 (no uploads directory). **CONFIRMED.** [http://third.nl/](http://third.nl/)
- `readme.html`: "WordPress › ReadMe … Version 3.8.1". `wp-admin/images/wordpress-logo.png` has `last-modified: Thu, 20 Feb 2014 07:53:01 GMT`. **CONFIRMED.** [third.nl/readme.html](http://third.nl/readme.html)
- `wp-content/themes/third/style.css`: "Theme Name: Reversal … Version: 1.1.1 Author: bitfade Author URI: http://themeforest.net/user/bitfade … Tags: photoblogging", `last-modified: Fri, 27 Feb 2015 15:11:27 GMT`. `images/logo.png` (121×24) and `screenshot.png` (600×450) are the generic "Reversal" demo assets, with no brand. **CONFIRMED.** [third.nl theme style.css](http://third.nl/wp-content/themes/third/style.css)
- Plugins: `contact-form-7/readme.txt` "Stable tag: 3.9.3 … Tested up to: 4.0". The `akismet/` directory exists (403). **CONFIRMED.** [third.nl CF7 readme](http://third.nl/wp-content/plugins/contact-form-7/readme.txt)

**third.amsterdam** (HTTPS 200, 127,117 bytes, 19:50:53Z)
- `<title>Modern Bakery and Coffee</title>`, `<meta name="generator" content="WordPress 7.1.2" />`, `content="Divi v.4.27.4"`. Asset paths: `wp-content/themes/Divi`, `wp-content/plugins/complianz-gdpr`, `wp-content/plugins/wpforms-lite`. External hosts: fonts.gstatic.com, fonts.googleapis.com, www.instagram.com, www.elegantthemes.com, cookiedatabase.org. **No** `G-`, `GTM-`, `UA-`, `AW-`, `ca-pub-`, `fbq('init')`, Hotjar or Clarity strings; **no** JSON-LD; **no** Google Maps API key (`AIza…`); **no** "design by / website by" credit (only the Complianz HTML comment). Complianz config: `"region":"eu"`, `"consenttype":"optin"`, `"user_banner_id":"1"`. **CONFIRMED.** [third.amsterdam](https://third.amsterdam/)
- Visible text: "Modern Bakery and Coffee OPENING SOON … 'Third Wave' … 'Third Place' FOLLOW US ON Third_nl Wielingenstraat 22 1078 KK Amsterdam". The social link is `https://www.instagram.com/third_nl/`; the Facebook, X and RSS icons carry no real account URLs. **CONFIRMED.** [third.amsterdam](https://third.amsterdam/)
- WP REST root: `"name":"Modern Bakery and Coffee"`, `"gmt_offset":"0"`, `"timezone_string":""`. Namespaces include `complianz/v1`, `divi/v1`, `wp-abilities/v1`. Users: `{"id":1,"name":"admin","slug":"racod","url":"https://third.amsterdam","link":"https://third.amsterdam/author/racod/"}`. **CONFIRMED.** [wp-json](https://third.amsterdam/wp-json/); [wp-json/wp/v2/users](https://third.amsterdam/wp-json/wp/v2/users)
- Build timeline from the REST API: sample page and "Hello world!" `2025-07-24T20:27:18` (install); Home `2025-07-24T20:37:59` (modified `2025-08-27T13:21:44`); survey `2025-08-27T07:54:09` (modified `2025-08-30T16:40:26`); cookiebeleid-eu `2025-08-27T12:24:49`; privacy-verklaring `2025-08-27T12:37:43`. Media uploads: `THIRD-OPENING-SOON_.png` 2025-07-24T20:32:47, `Logo_Third_Amsterdam-scaled.png` 2025-07-26T08:59:46, `third_meaning.png` 2025-07-26T09:02:42, `Third_Logo.png` 2025-08-27T13:21:25, `favicon.png` 2025-08-27T13:28:38. All have author id 1. **CONFIRMED.** [wp-json pages](https://third.amsterdam/wp-json/wp/v2/pages); [wp-json media](https://third.amsterdam/wp-json/wp/v2/media)
- Image metadata: THIRD-OPENING-SOON_.png and third_meaning.png carry XMP (`XMP Core 6.0.0`) with `exif:UserComment = "Screenshot"`. There is no author, no software and no document ID. **CONFIRMED.** [THIRD-OPENING-SOON_.png](https://third.amsterdam/wp-content/uploads/2025/07/THIRD-OPENING-SOON_.png)
- Privacy page: "Third Amsterdam, gevestigd te Amsterdam … E-mail: hello@third.amsterdam … Versie: 1.0 | Laatste update: 27-08-2025". It gives **no** KvK, BTW or legal-entity name, and says "Onze website maakt geen gebruik van cookies voor tracking of marketingdoeleinden". **CONFIRMED.** [privacy-verklaring](https://third.amsterdam/privacy-verklaring/)
- Cookie policy (Complianz) contact block: "Third Wielingenstraat 22, 1078 KK Amsterdam Nederland Site: https://third.amsterdam E-mail: hello@…third.amsterdam". "Dit Cookiebeleid is gesynchroniseerd met cookiedatabase.org op augustus 27, 2025." **CONFIRMED.** [cookiebeleid-eu](https://third.amsterdam/cookiebeleid-eu/)
- Survey page: "Wij van Third. gaan op de locatie Wielingenstraat 22 een kleinschalige pastries bakery openen … willen wij een vergunning voor lichte horeca aanvragen" (neighbour survey, WPForms). **CONFIRMED.** [survey](https://third.amsterdam/survey/)
- A grep for "racod" in the fetched HTML of the home, survey, privacy and cookie pages found **0 matches**. The sibling note's claim of a second survey-form recipient "rodney@…racod.nl" is **not reproduced** from page source by me and remains **SINGLE-SOURCE** (sibling). [survey](https://third.amsterdam/survey/)

**racod.nl (builder)**
- `<title>Website laten maken | RACOD Website's & Webshops</title>`, WordPress 7.1.2, WooCommerce 9.3.3, theme `Divi`, GA4 **`G-EP8EVF45HG`**, footer "Btw-nummer: NL003307612B89", "KvK: 78249023". Portfolio/testimonial links: 31apartments.com, coervercoaching.nl, completetraining.nl, nexcellence.net, deapbv.nl. Instagram `racod.website.webshops`. It contains no "third", "encanto", "sweetella" or "thisisstaff" strings. **CONFIRMED.** [racod.nl](https://www.racod.nl/)

**El Encanto sites**
- elencanto.nl and el-encanto.nl (HTTP 200, 19,608 bytes each): `<title>geregistreerd via Argeweb</title>`, "Domeinnaam is geregistreerd via Argeweb", `server: Apache`, `x-powered-by: PHP/7.4.33`, `noindex, nofollow`. This is a registrar parking page with no business content. **CONFIRMED.** [elencanto.nl](http://elencanto.nl/); [el-encanto.nl](http://el-encanto.nl/)
- elencantobonaire.com does not resolve (ENOTFOUND / NXDOMAIN). **CONFIRMED.** [elencantobonaire.com](https://elencantobonaire.com/)

### Inferences
- third.nl was last actively built around 2014–2015 as a photo or portfolio blog, probably for an unrelated "third"-named owner. It has been dead since the host's PHP upgrade removed the old `mysql_*` extension that WP 3.8.1 needs. It bears **no relation** in stack, date or content to the 2025 bakery.
- "racod" as the WP admin slug is **STRONG** evidence that RACOD created or administers third.amsterdam. RACOD's own site runs the same WP 7.1.2 + Divi combination. This identifies the **builder**; RACOD's KvK 78249023 / BTW NL003307612B89 are the agency's identifiers, not Third.'s.
- The absence of GA/GTM/Pixel on third.amsterdam means there are **no tag IDs to reverse-search** for shared ownership. RACOD's GA4 `G-EP8EVF45HG` is on racod.nl only, not on the client site.

### Gaps
- The WPForms notification recipients are server-side settings and cannot be read publicly. The sibling's recipient claim could not be checked.
- Third.'s legal-entity name, KvK and BTW are not published anywhere on its site.

## Q4. Wayback / history of third.nl (and El Encanto sites)

### Takeaway
The Wayback Machine was effectively unreachable. One availability query succeeded and showed a capture of **www.third.nl on 2026-02-14 10:39:19 UTC (status 200)**, but no CDX timeline or capture content could be retrieved. The on-server file dates (WP 3.8.1 files from 2014-02-20, theme from 2015-02-27) are the only firm timeline evidence.

### Cited Findings
- `archive.org/wayback/available?url=third.nl` returned `{"closest": {"status": "200", "available": true, "url": "http://web.archive.org/web/20260214103919/http://www.third.nl/", "timestamp": "20260214103919"}}` (19:53Z). **SINGLE-SOURCE** (Wayback API). [archive.org availability](https://archive.org/wayback/available?url=third.nl)
- All other attempts failed. web.archive.org CDX and snapshot fetches gave "Connection reset by peer" and proxy `ws_closed_mid_exchange`. archive.org availability queries with timestamps gave `429 Too Many Requests` (6+ times). WebFetch: "unable to fetch from web.archive.org". archive.ph and timetravel.mementoweb.org: connection reset / proxy 502. arquivo.pt returned an empty body.
- On-server timestamps: `wp-admin/images/wordpress-logo.png` and `readme.html` `last-modified: Thu, 20 Feb 2014 07:53:01 GMT`; theme `style.css`, `screenshot.png` and `images/logo.png` `last-modified: Fri, 27 Feb 2015 15:11:27–29 GMT`. **CONFIRMED.** [third.nl readme](http://third.nl/readme.html)

### Inferences
- Timeline (combining RDAP and file dates): third.nl registered 2005-07-29 → WordPress 3.8.1 installed around Feb 2014 → theme "third" (Reversal) deployed or updated around Feb 2015 → DNS zone serial about 2020-06 → site broken now (PHP 8.4). Registry record changed 2026-02-20, six days after a 2026-02-14 Wayback capture. Whether that change was a transfer to a new holder is **UNVERIFIED**.
- third.amsterdam's history is fully covered by its own REST API (installed 2025-07-24), so Wayback adds little there.

### Gaps
- Early third.nl content (2005–2015 owner, any "about" page) and the content of the 2026-02-14 capture are **unknown**. This should be retried from an environment where web.archive.org is reachable: `https://web.archive.org/cdx/search/cdx?url=third.nl&matchType=domain&output=json&collapse=digest`.

## Q5. Which "El Encanto" steak restaurant(s) are relevant, and how do they compare technically?

### Takeaway
Three candidates exist. (1) **Restaurant El Encanto, Scheldeplein 18, 1078 GR Amsterdam** (KvK 91130379, per aggregators) is in the same 1078 postcode area as Third. It has no discoverable live website; elencanto.nl and el-encanto.nl are parked, and their tie to it is unverified. Its cuisine (steak) is not confirmed. (2) **El Encanto Burger, Steakhouse and bar / El Encanto Boutique Hotel**, 97 EEG Boulevard, Kralendijk, **Bonaire**, is a real steakhouse. It is listed as permanently closed and its domain has lapsed. (3) The El Encanto hair salon (Reguliersdwarsstraat 33) and the US or Mexican-cuisine El Encantos are name collisions. **None shares any technical identifier with Third.**

### Cited Findings
- "Restaurant El Encanto", Scheldeplein 18, Amsterdam 1078GR, KvK 91130379. **SINGLE-SOURCE type**: aggregator search snippets. My WebFetch of Drimble returned only the site template, and Compadex returned HTTP 403. [Drimble](https://drimble.nl/bedrijf/amsterdam/000056817983/restaurant-el-encanto.html); [Compadex](https://www.compadex.com/nl/businesses/nl/restaurant-el-encanto-91130379-56817983)
- A search for "El Encanto steakhouse Amsterdam" surfaced only the El Encanto hair salon (Reguliersdwarsstraat 33) and other steakhouses (e.g. El Capricho), not an El Encanto steakhouse. **SINGLE-SOURCE** (search). [Yelp: El Encanto (hair salon)](https://www.yelp.com/biz/el-encanto-amsterdam); [elencantohairsalon.com](https://elencantohairsalon.com/)
- Bonaire: "El Encanto Burger, Steakhouse and bar | Kralendijk" on Facebook (page id 100076403067173). ReviewBonaire lists address "97 EEG Boulevard, Kralendijk", phone "+599 782 5600", website "elencantobonaire.com", contact person "Jennifer Schokker", and describes "burgers and Canadian steaks … locally-made charcoal grill". **SINGLE-SOURCE** for the contact person. [Facebook](https://www.facebook.com/p/El-Encanto-Burger-Steakhouse-and-bar-100076403067173/); [ReviewBonaire](https://reviewbonaire.com/reviews/elencantobonaire.com)
- Wanderlog lists El Encanto (boutique hotel with restaurant and bar, same address and phone) as **permanently closed**. **SINGLE-SOURCE.** [Wanderlog](https://wanderlog.com/place/details/12259345/el-encanto); Instagram [@elencantobonaire](https://www.instagram.com/elencantobonaire/)
- elencantobonaire.com: NXDOMAIN, Verisign RDAP 404 (Q2). **CONFIRMED.**
- Technical comparison with Third.: see the Q0 matrix. No overlap in registrar, NS, IP, MX/SPF, contact handles, tag IDs, e-mail domain or phone. **CONFIRMED** for the domains examined.

### Inferences
- If "El Encanto" refers to the Scheldeplein restaurant, its only relation to Third. found here is **geographic** (both in 1078, Scheldebuurt/RAI). That is not ownership evidence.
- The Bonaire steakhouse is closed, has a lapsed domain, and has no technical overlap with Third.; nothing links it to Amsterdam.

### Gaps
- The Scheldeplein restaurant's website, booking system (TheFork, Zenchef, Formitable etc.), Instagram, cuisine and owners were not found. A search for "Restaurant El Encanto" Amsterdam 1078 reserveren returned only aggregators. Its VOF partners must come from KvK.
- Whether elencanto.nl / el-encanto.nl belong to the Scheldeplein VOF is unknown (the registrant is redacted and the page is parked).

## Q6. Reverse lookups of discovered IDs, IPs, e-mails and phones

### Takeaway
There were almost no unique IDs to reverse-search. third.amsterdam carries no GA, GTM, Pixel or AdSense IDs, and El Encanto has no live site. The only unique strings found are the WP slug "racod", the e-mail hello@third.amsterdam and RACOD's own GA4 `G-EP8EVF45HG`. Reverse-IP and certificate-transparency services were unavailable (quota or 502).

### Cited Findings
- A search for "hello@third.amsterdam" OR "third_nl" returned only third.amsterdam's own pages. **CONFIRMED** (no other site). [third.amsterdam cookie policy](https://third.amsterdam/cookiebeleid-eu/)
- hackertarget reverse-IP for 194.213.127.62, 81.169.145.146 and 145.131.10.225 returned "API count exceeded - Increase Quota with Membership". [hackertarget](https://api.hackertarget.com/reverseiplookup/?q=194.213.127.62)
- crt.sh returned HTTP 502 on all 6 attempts. [crt.sh third.nl](https://crt.sh/?q=third.nl&output=json)
- Search-index results for "Third coffee Amsterdam" identify third.amsterdam (not third.nl) as the business site. [third.amsterdam](https://third.amsterdam/); [European Coffee Trip Amsterdam](https://europeancoffeetrip.com/amsterdam/)

### Inferences
- The shared-IP neighbours on Strato, Mijndomein or Argeweb would be thousands of unrelated sites, so even a successful reverse-IP result would be WEAK evidence.
- RACOD's portfolio links (31apartments.com, coervercoaching.nl, completetraining.nl, nexcellence.net, deapbv.nl) show RACOD's client network. Neither Third. nor El Encanto is listed there.

### Gaps
- BuiltWith / PublicWWW relationship lookups for `G-EP8EVF45HG` and the string "racod" were not run. A PublicWWW search for `"/author/racod/"` or for the GA4 ID could enumerate other RACOD-built sites, possibly including other businesses of the same owner.

## Q7. lemlist CRM (read-only): existing records for Third / third.nl / El Encanto

### Takeaway
**No records exist** in this lemlist team for Third, third.nl, third.amsterdam or El Encanto (checked 2026-09-25 around 19:48–19:55 UTC). The repo's pipeline state files also contain no reference. Nothing was created or modified.

### Cited Findings
- `search_companies` "Third" returned 1 unrelated result: "Third Space Solutions" (`cpn_kadRDCRCfqdTphcTe`, domain `thirdspacesolutions.co.uk`). "El Encanto" and "Encanto" returned 0. "Bakery" returned "De Nolf Bakery" (`denolfbakery.be`) and "Mediabakery - designstudio voor print, web, video and animatie" (`mediabakery.nl`), both unrelated. **CONFIRMED** (lemlist MCP, read-only).
- `search_contacts` with companyDomain "third.nl" returned 0; with companyDomain "third.amsterdam", 0; free-text "third", 0; free-text "encanto", 0. Per the tool's documentation, a domain filter returns an empty list when no company matches, so **no company with domain third.nl exists in the team**. **CONFIRMED** (lemlist MCP).
- Grep of `/home/user/astra-agency/state/*.jsonl` and `logs/*.jsonl` for "third.nl", "El Encanto", "Third", "Wielingen", "bakery" and "encanto": no matches. **CONFIRMED** (local repo).

### Inferences
- If the parent task's "third.nl" came from a lemlist `companyDomain`, that record is not in this team now. It may have been in another workspace, deleted, or stored under a different name or domain. Either way, "third.nl" should be treated as a wrong or stale domain for the bakery, and third.amsterdam used instead.

### Gaps
- I did not page through the entire "New Businesses" list (`clt_Zzi8BjZSMvbEH9ihr`) contact by contact. The free-text search only matches contact name or email, so a contact whose company field says "Third" but whose linked company is named differently could in theory be missed. The companyDomain checks make this unlikely.
