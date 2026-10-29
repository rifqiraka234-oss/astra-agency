# Snapshot of healthysecrets.at (their current Wix site), fetched 27 Oct 2026

- `pages/products.txt` and `pages/pages.txt`, the URLs in their product sitemap (7) and page sitemap (15).
- `pages/p1.html` to `p7.html`, the 7 product pages, in the order of `products.txt`
  (p1 Matcha Latte Fibre Flow 44 €, p2 Chai Latte Fibre Flow 25 €, p3 Haferbrot Backmischung 9,50 €, p4 Slimming Sips
  12 €, p5 Lullaby Leaves 12 €, p6 Moon Milk Fibre Flow 25 €, p7 Omega-3 Müsli Red Berry Mix 9,50 €, all in stock).
- `pages/agb-1.html`, `impressum.html`, `shipping-returns.html`, `home.html` (if present), raw HTML.
- `legal-pdfs/`, the 5 PDFs linked from their site, with text extracts.
  - `21d69f...` AGB Healthy Secrets OG, Stand November 2025 (current)
  - `8088b9...` Datenschutzerklärung Website, Stand November 2025 (current)
  - `7abc58...` AGB of the old Healthy Secrets e.U., Stand April 2021 (still linked from every product page)
  - `43f30f...` Datenschutzerklärung Webshop of the old e.U., April 2021
  - `7a8052...` Widerrufsformular (old address, Gmail address, phone +43 676 625 653 8)

## DNS, read via dns.google on 27 Oct 2026

| Record | Value |
|---|---|
| NS | ns10.wixdns.net, ns11.wixdns.net (DNS hosted at Wix) |
| A healthysecrets.at | 185.230.63.186, 185.230.63.171, 185.230.63.107 (Wix) |
| www | CNAME cdn3.wixdns.net (Wix). Canonical host is www, apex and http 301 to https://www.healthysecrets.at/ |
| MX | Google Workspace, aspmx.l.google.com 10, alt1 20, alt2 30, alt3 40, alt4 50 |
| TXT | v=spf1 include:_spf.google.com ~all, google-site-verification=Ul0qsJP6yPyPK5I5jgQtfc5XSPSc-FtKe6nhSEPSstc |
| mail.healthysecrets.at | A 81.19.154.99, reverse mwl01.world4you.com (Austrian host, purpose unknown) |
| DMARC | none |
| google._domainkey | none |
| Registrar | not confirmed, nic.at whois was blocked from the cloud container |
