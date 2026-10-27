# Healthy Secrets, Laravel build spec for Josh

Written 27 Oct 2026 for Josh (build) and Raka (scope and price). Everything below is either read from a source today and
named, or marked as a decision or an input we still need. Nothing is guessed. Where a source disagrees with another
source, both are quoted.

**Client.** Healthy Secrets OG, FN 661029 b, UID ATU82537658, Dannebergplatz 19, 1030 Wien. Partners Dr. Stephanie
Walkner, Dr. Nikolaus Walkner, Leonie Walkner BSc. Contact office@healthysecrets.at (shared inbox, Leonie accepted the
call invite from it). Café, the Gut Health Club, at Wildpretmarkt 1, 1010 Wien, open since 17 Oct 2026.

**What exists already.** A front end prototype, 9 pages, German and English, live at
https://astra-healthy-secrets-prototype.netlify.app . Source in this repo at `state/prototypes/healthy-secrets/build/`
(page sources `build/pages/*.html`, generator `build/build.py`) and the built output at `site/` (`site/assets/site.css`
66 KB, `site/assets/site.js` 26 KB, self hosted Jost fonts, 29 images). Design notes and every open content point are in
`handover.md` next to this file. The prototype has **no back end**. Cart, checkout, booking and forms are front end only.

**What was agreed on the call (27 Oct, transcript in `logs/meetings/2026-10-27-HealthySecrets-call.md`).**
1. The site they saw, rebuilt for real and moved off Wix. Mobile has to work as well as desktop.
2. They edit products, prices, descriptions, stock and photos themselves in a back end, "log in and change 1 euro to
   1,10". Homepage text and anything that breaks goes through Astra.
3. Seasonal changes they can run themselves, their examples "this product reduced by 15% for Christmas" and "a bundle
   of products A, B, C".
4. Leonie's consultation booking. A blog (Leonie asked during the call).
5. Keep the domain healthysecrets.at and keep their search ranking.
6. A safe payment provider. Mollie or Adyen were named. They use credit card and Klarna today.
7. Newsletter, two sides. Raka said they could run a newsletter themselves from the back end. Nikolaus answered that
   he deactivates newsletters because they're annoying. So no newsletter in phase 1 unless they ask for it.
8. A contact form that sends to their email ("workflows ... if they have a question, it can be directed to your
   email").
9. Price. On the call Raka said "under 500 euros", "450 in total" (350 build plus 100 implementation). After the call
   Raka set the build at **500 euros** (27 Oct, "i wanna start it at 500 euros its fine"). About two weeks, maintenance
   from 50 euros a month. The summary email sent
   27 Oct 19:42 UTC promised only "a proposal in the upcoming days", no price and no scope.

---

## 0. Read this first, Raka

**The scope below is bigger than 500 euros of build time.** A real webshop with payments, VAT, invoices, emails, an
admin, a blog, bookings and a domain migration is weeks of work. Section 11 splits it into a phase 1 that keeps every
promise from the call and a phase 2 for the rest. Decide the cut before Josh starts and before the proposal goes out.

Six decisions are yours (section 12). The client inputs Josh can't build without are in section 13. The two biggest
blockers are the **food information per product** (law, section 6.2) and the **shipping model** (the live site and their
own AGB disagree, section 6.4).

---

## 1. Stack (versions checked on Packagist, 27 Oct 2026)

| Part | Choice | Version and why |
|---|---|---|
| Framework | Laravel 13 | v13.39.0 published 27 Oct 2026, requires PHP ^8.3 |
| PHP | 8.4 minimum | Laravel 13 needs ^8.3, but spatie/laravel-translatable 6.15.0 needs ^8.4, so 8.4 is the floor |
| Database | MySQL 8 (or MariaDB) | Forge provisions it on the server |
| Admin panel | Filament 5 | filament/filament v5.11.0, 26 Oct 2026, its support package accepts Laravel ^11.28, ^12 or ^13. Fastest way to give three non technical owners a clean back end with roles |
| Payments | Mollie, `mollie/laravel-mollie` | v5.0.0, 16 Oct 2026, supports Laravel ^11, ^12, ^13, PHP ^8.2, wraps `mollie/mollie-api-php` ^4.0 |
| Translations of content | `spatie/laravel-translatable` | 6.15.0, 19 Oct 2026, supports Laravel ^12 and ^13, needs PHP ^8.4. JSON columns per field, `de` and `en` |
| Translations in the admin | `lara-zeus/spatie-translatable` | 2.0.1, 23 Apr 2026, requires Filament ^5. The official `filament/spatie-laravel-translatable-plugin` is abandoned on Packagist (last v3.3.57) and points to this one |
| Front end | Blade templates plus the prototype's own CSS and vanilla JS | No SPA. The prototype is already plain HTML, CSS and JS, keep it that way |
| Assets | Vite (ships with Laravel) | Content hashed file names replace the prototype's `?v=` cache busting |
| Queue | Laravel queue, database driver | Emails, PDFs and webhooks run on the queue. Redis is not needed at this size |
| Images | Upload in Filament, resize to WebP on save | Pick the package at install time and pin it, check it supports Laravel 13 first |

Anything not in this table that Josh adds, check its Laravel 13 support on Packagist before requiring it.

---

## 2. Front end, page by page

**Rule one. Keep the design exactly as it is.** Raka and the client approved this version (v3, deploy
6ad62bdf0565e1544bbba75f). Port the markup into Blade and keep `site.css`. Don't restyle anything.

Some screens don't exist in the prototype and need a design in the same style, built from the prototype's own parts
(type, colours, buttons, the shop dialog's layout). Product page, blog list and article, legal pages, the "checking your
payment" page, a coupon field in the cart, the shipping method step, EPS and Apple Pay in the payment step, bundle
cards, sale and unit prices. **Josh screenshots each new screen at 390 and 1440 px and sends them to Raka before
building the next one.**

**Rule two. Nothing about shipping is hard coded.** The prototype says "inkl. Versand", "Versand inklusive" or
"free shipping in Austria" in `build.py`, `index.html`, `shop.html` (twice) and `kasse.html`, on product cards, in the
planner, the checkout aside and the shop meta description. All of it comes from the shipping settings once the client
decides the model (6.4).

**Rule three. One host.** Today `http://healthysecrets.at` and `https://healthysecrets.at` both 301 to
`https://www.healthysecrets.at/` (curl, 27 Oct). Keep **www** as the canonical host so every indexed URL keeps its
host. Apex and http 301 to `https://www...`. Canonical tags and the sitemap use www.

**Rule four. Languages move to the server.** The prototype puts both languages in the page and swaps them with JS
(`.l-de` and `.l-en` spans, `build.py` header comment). That's fine for a demo and bad for search, because Google sees
both languages on one URL. In Laravel, render one language per URL.

- German is the default with no prefix, `/shop`. English lives under `/en`, `/en/shop`. Same slugs in both.
- Every page outputs `<html lang>`, `hreflang="de"`, `hreflang="en"` and `hreflang="x-default"` (pointing at German),
  and a canonical URL.
- The DE and EN switch in the header becomes two plain links to the same page in the other language. Remove `setLang()`
  and the `hs-lang` localStorage logic from `site.js`, and the `?lang=` handling in the page head (`build.py` line 249).
  Old `?lang=en` links redirect to the `/en` URL.
- When a product or post has no English text, the `/en` page falls back to German and carries `noindex`, so search
  doesn't index half translated pages.
- The legal links in the prototype (`AGB` and `DSE` in `build.py`) point at the Wix PDFs. In Laravel they point at
  `/agb` and `/datenschutz`.
- Fixed interface text goes in Laravel lang files (`lang/de/*.php`, `lang/en/*.php`). Content the client edits
  (products, blog, booking services, settings) is translatable in the database.
- Their AGB section 3 says the contract language is German only. The English checkout shows one line saying so. It's
  already in the prototype, keep it.

### 2.1 Routes

| Route (DE, EN adds `/en`) | Prototype file | What becomes dynamic |
|---|---|---|
| `/` | `index.html` | Products in each hour come from the database (by their time slot). The events form comes out in phase 1 (see 2.3) |
| `/club` | `club.html` | Opening hours and the café menu from settings. The map stays a static SVG (OpenStreetMap data, keep the credit line, it's required by the ODbL licence) |
| `/shop` | `shop.html` | Product grid from the database, grouped by time slot, filter by slot. Quick view dialog stays |
| `/shop/{slug}` | new, built from the shop dialog | Full product page with every legal food field (section 6.2), price, unit price, VAT note, add to cart. Needed for search and for the law |
| `/kasse` | `kasse.html` | Real checkout (section 4) |
| `/kasse/danke/{order}` | the success state inside `kasse.html` | Order received page, signed URL |
| `/beratung` | `beratung.html` | Services and prices from the database. Booking request form (section 5) |
| `/wissen` | `wissen.html` | Static content, the fibre chart and the day planner stay as built |
| `/ueber-uns` | `ueber-uns.html` | Static |
| `/handel` | `handel.html` | Trade enquiry form, saved and emailed |
| `/blog`, `/blog/{slug}` | new | List and article pages in the same design (headline, date, image, body). Phase 1 per Raka, see section 11 |
| `/kontakt` | new | Contact form, promised on the call |
| `/impressum` | `impressum.html` | Company data from settings |
| `/agb`, `/datenschutz`, `/widerruf`, `/versand` | new | Legal pages as HTML, text supplied by the client (section 6.6). Each also offers the PDF download |

### 2.2 Interactive parts to port (all in `site/assets/site.js`)

| Part | Today | In Laravel |
|---|---|---|
| Day dial (sun and moon over the home page hours) | JS, scroll driven | Keep as is |
| Reveal on scroll | JS | Keep as is |
| Mobile menu | JS | Keep |
| Cart drawer, counter, toast | localStorage `hs-cart`, prices from an inline `P` JSON | **Server side cart in the session.** The drawer reads and changes it through small JSON endpoints (`POST /cart/items`, `PATCH /cart/items/{id}`, `DELETE /cart/items/{id}`, `GET /cart`). Prices, discounts and totals always come from the server. Never trust a price sent by the browser |
| Product filter by hour | JS | Keep, data attributes come from the database |
| Product quick view dialog | JS | Keep, plus a link to the full product page |
| Day planner quiz | JS, picks products and computes a cost per day, for example Matcha 44/14 plus Moon Milk 25/14 equals 4,93 € a day. It hard codes product keys (`lullaby`, `moon`, `slim` and the rest) and two swaps, St John's wort out if the visitor takes medication (`med`), caffeine out in pregnancy (`preg`), `site.js` lines 297 to 303 | Keep. Products get a stable `planner_key` and two flags, `warn_medication` and `warn_pregnancy`, and the planner reads those instead of names. Prices and `portions` come from the database. "Add all to cart" calls the cart endpoint |
| Fibre chart tabs | JS, ARIA tabs with arrow keys | Keep |
| Multi step forms (checkout, booking) | JS steps plus client side validation | Keep the steps for the feel. **Validate again on the server**, always |
| Form success states | Fake order number `HS` plus the time | Real number from the server |

### 2.3 Forms in the prototype, with their exact fields

| Form | Fields (prototype `name`) | Becomes |
|---|---|---|
| Checkout `data-form="order"` | vorname, nachname, mail, strasse, plz, ort, land (AT, DE, IT, other EU or EEA), tel, zahlung (karte, klarna), alter (18 plus), agb | The real checkout, section 4 |
| Booking `data-form="booking"` | leistung (therapie, bia, beides), tage (mo to fr), zeit (vormittag, nachmittag, abend), vorname, nachname, mail, tel, anliegen, nachricht, ok (consent including health data) | Booking request, section 5 |
| Contact (new, promised on the call) | name, mail, message, consent | `/kontakt` page and a short form in the footer, saved as `enquiries.type=contact`, emailed to office@ |
| Trade `data-form="trade"` | firma, art, name, land, mail, tel, p (fibre, muesli, brot, tee, alles), nachricht, ok | Saved as an enquiry, emailed to office@ |
| Events `data-form="events"` on `/` and `/club` | vorname, mail, int (workshops, vortraege, kochkurse), thema (club page only), ok ("happy for Healthy Secrets to email me about this") | **A mailing list in law.** Phase 1 removes it from `/` and `/club`. If Raka and the client want it, phase 2 builds it with double opt in (section 6.5) |

Every public form gets CSRF, a honeypot field, a time trap and rate limiting per IP. No reCAPTCHA by default, it sends
data to Google and needs consent.

---

## 3. Back end

### 3.1 Data model

All money is stored as integer cents. All texts the client writes are translatable (`de`, `en`).

| Table | Fields |
|---|---|
| `products` | id, slug, planner_key, warn_medication bool, warn_pregnancy bool, name*, subtitle*, lead*, category_id, time_slot (morgen, nachmittag, abend, nacht), price_cents (gross), tax_rate_id, sku, stock, track_stock bool, net_quantity (number), net_unit (g, ml), portions (null or number, used by the planner), ribbon*, is_active, sort, seo_title*, seo_description*, timestamps |
| `product_food_info` (one to one) | ingredients* (allergens marked), allergens*, may_contain*, quid* (percentages of named ingredients), nutrition_per_100 (energy kJ and kcal, fat, saturates, carbohydrate, sugars, fibre, protein, salt), preparation*, storage*, warnings*, operator_name, operator_address, origin* (where required) |
| `product_images` | product_id, path, alt*, sort |
| `categories` | id, slug, name*, sort |
| `tax_rates` | id, name, rate (4.9, 10, 13, 20). Each product picks one. **The client's accountant sets the rate per product** (section 6.3) |
| `bundles` | id, slug, name*, description*, price_cents, image, is_active, starts_at, ends_at. The saving is computed against the sum of the single prices, never typed in. Shown as cards on `/shop` in their own "Sets" row above the hours, and in the cart as one line with its products listed under it |
| `bundle_items` | bundle_id, product_id, qty. Stock comes off the products inside |
| `coupons` | id, code, type (percent, fixed), value, min_order_cents, starts_at, ends_at, max_uses, max_uses_per_email, applies_to (all, products, categories), excludes_sale_items bool, is_active. Pivot tables `coupon_product` and `coupon_category`. AGB section 4 says promo codes are once per customer, household or delivery address, so check email and address |
| `sales` (timed price change) | id, name, percent_off, product or category scope, starts_at, ends_at. Covers "15% off for Christmas" without touching base prices. The struck through price shown during a sale comes from `price_history` (6.1), never from a typed field |
| `shipping_zones`, `shipping_rates` | zone (countries), name, price_cents, free_from_cents, is_active. Values from the client (section 13) |
| `order_events` | order_id, from_status, to_status, user_id, note, created_at |
| `price_history` | product_id, price_cents, valid_from, valid_to (6.1) |
| `credit_notes` | invoice_id, number (own sequence), amount_cents, tax lines, pdf_path, issued_at |
| `activity_log` | admin user, action, subject, changes, time |
| `orders` | id, number (yearly sequence, for example `HS-2026-0001`), status, email, phone, billing and shipping address, locale, shipping_method, shipping_rate_id, subtotal_cents, discount_cents, shipping_cents, tax lines (JSON, per rate), total_cents, coupon_code, terms_version_id, age_confirmed_at, terms_accepted_at, ip, user_agent, paid_at, shipped_at, tracking_number, cancelled_at, refunded_cents, notes, timestamps |
| `order_items` | order_id, product_id or bundle_id, name snapshot, unit_price_cents, qty, tax_rate snapshot, line_total_cents |
| `payments` | order_id, provider, provider_payment_id, method, status, amount_cents, raw (JSON), timestamps |
| `invoices` | order_id, number (own gapless sequence), pdf_path, issued_at |
| `legal_documents` | type (agb, datenschutz, widerruf, versand, impressum), version, body*, pdf_path, valid_from. Orders store the AGB version they were placed under |
| `services` | id, name*, duration_min, price_cents, description*, sort, is_active. Seeded with Leonie's three (section 5) |
| `booking_requests` | service_id, preferred_days (JSON), preferred_time, first_name, last_name, email, phone, topic, message, health_consent_at, status (new, contacted, booked, closed), notes |
| `enquiries` | type (trade, contact), payload (JSON), consent_at, status |
| `posts` | slug, title*, excerpt*, body* (rich text), cover_image, author (one of the three), published_at, seo_title*, seo_description* |
| `settings` | key and value, for opening hours, café menu text, announcement bar, company data for the Impressum, order notification email, shipping note |
| `redirects` | from_path, to_path, code 301. Seeded with section 7.1 |
| `users` | admins only, with role. No customer accounts in phase 1 |

`*` translatable.

### 3.2 Admin (Filament)

Users and roles.
- **Owner**, for the three partners. Products, stock, prices, sales, coupons, bundles, orders, bookings, enquiries,
  blog, settings for opening hours and the café menu.
- **Admin**, for Astra. Everything, plus legal documents, redirects, tax rates, shipping, users and homepage content.
- Two factor sign in for every admin user. Three named logins, no shared password.

Screens.
1. **Products.** List with stock and price inline editable. Edit form with tabs, Basics, Food information (section
   6.2, required fields block publishing), Images, SEO, both languages side by side.
2. **Sales and coupons.** Create a timed sale or a code with start and end dates. A preview shows the resulting prices.
3. **Bundles.** Pick products and quantities, set the bundle price, see the saving against the single prices.
4. **Orders.** Filters by status. Order detail with items, addresses, payment status from Mollie, buttons **Mark as
   shipped** (asks for a tracking number, captures a Klarna authorization, sends the shipping email), **Ship
   partially**, **Reject and refund**, **Delay notice** (4.4), **Refund** (full or part, through the Mollie API, issues a
   credit note), **Resend confirmation**, **Download invoice**. Each open order shows its working day count (4.4). CSV
   export for the accountant.
5. **Bookings.** New requests on top, change status, add notes.
6. **Enquiries.** Trade and contact messages.
7. **Blog.** Rich text editor, cover image, publish date, preview.
8. **Settings.** Opening hours per weekday, café menu text, announcement bar, notification email.
9. **Dashboard.** Today's orders, open orders to ship, low stock, new bookings.

### 3.3 Emails (queued, German or English by the order's locale)

| Trigger | To | Content |
|---|---|---|
| Order paid (or Klarna authorized) | customer | **Order receipt, not acceptance.** Their AGB section 3 says the contract only forms when the goods ship. Wording comes from the client. Includes the order, prices, VAT, shipping, address. **The AGB and the withdrawal information and form go as PDF attachments**, not links. The Austrian distance selling law (FAGG section 7) wants them on a durable medium, Nikolaus confirms |
| Order paid (or Klarna authorized) | office@ | New order alert with a link to the admin |
| Marked as shipped | customer | Shipping confirmation, tracking number, any reduced quantities. This is the acceptance under their AGB. Invoice PDF attached |
| Rejected, or delayed by stock | customer | From the admin actions in 4.4 |
| Payment failed or expired | customer | Short note with a link back to the cart |
| Refund made | customer | Amount and method |
| Stock below a threshold | office@ | Low stock alert |
| Booking request | office@ and the customer | Request received, Leonie confirms by email or phone |
| Trade or contact enquiry | office@ and the sender | Received |

Sending goes through a transactional email service, not their Google mailbox (section 9 covers the DNS records).

---

## 4. Checkout and payments

### 4.1 The flow their AGB fixes (AGB Nov 2025, section 3, read 27 Oct)

Their AGB describe the steps and we have to match them. "Artikel in den Warenkorb legen → zur Kasse →
Eingabe/Rechnung/Versand/Bezahlart prüfen → Zusammenfassung", with corrections possible before ordering.

1. Cart.
2. Address (billing, optional different shipping address), email, phone.
3. Shipping method and payment method.
4. **Summary page.** Every item, quantities, unit prices, discounts, shipping, total, VAT per rate, the delivery
   address, and edit links back to each step.
5. Two required checkboxes. "Ich bin mindestens 18 Jahre alt." (AGB section 3 sells only to people over 18, wording
   from the prototype). And the AGB box. AGB section 3 calls it „Akzeptieren der Allgemeinen Geschäftsbedingungen“ and
   says the customer confirms reading section 12, while the prototype says "Ich habe die AGB gelesen, auch die
   Informationen zu Gesundheit und Ernährung in Abschnitt 12." Nikolaus picks the final wording. Store both timestamps
   on the order. Phone stays optional, as in the prototype.
6. The final button reads exactly **"Zahlungspflichtig bestellen"** (AGB section 3 names it, and the prototype already
   uses it). The prototype's English label is "Place order and pay", keep it.
7. Create the order (status `pending_payment`), create the Mollie payment, redirect to Mollie.
8. Return URL shows "we're checking your payment" until the webhook confirms, then the thank you page.

### 4.2 Mollie

- One Mollie account in the client's name (KYC with their company documents). Astra never holds their money.
- Use the Payments API with Mollie's hosted checkout (redirect). Methods to switch on, after the client's account shows
  them as available, cards, Klarna, EPS, Apple Pay. With the hosted checkout Apple Pay runs on Mollie's page, so no
  domain verification is needed on ours. Their AGB section 5 names cards and Klarna today.
- **The webhook is the only source of truth.** On each call, fetch the payment from the Mollie API by id (the webhook
  body only carries the id), then update the order. Handle repeat calls without side effects (idempotent). Never mark an
  order paid from the return URL.
- **Klarna works differently.** Mollie's Klarna page (docs.mollie.com/docs/klarna, read 27 Oct) requires `lines` and
  the billing fields (given name, family name, street and number, postal code, city, country, email), and advises to
  authorise first and capture when the goods ship. So a Klarna payment comes back `authorized`, not `paid`. Treat
  `authorized` like paid for stock and the receipt, and **capture it when the order is marked shipped**, or release it
  when the order is rejected. That matches AGB section 3, where the contract forms when the goods ship. Josh checks
  Mollie's capture time limit for Klarna in the client's dashboard and shows a warning on orders getting close to it.
- Send `lines` for every method, not only Klarna, so every payment shows its items in Mollie.
- On paid or authorized, decrement stock in a database transaction with a row lock (`SELECT ... FOR UPDATE`). If two
  people pay for the last unit, the second order is flagged `oversold` in the admin and the office alert says so. The
  owner ships a smaller quantity or rejects and refunds (4.4). Nothing is reserved while the customer is at Mollie,
  stock is that small and that rare to run out.
- Send the receipt and the office alert.
- Refunds through the API from the order screen, recorded in `payments` and on the order.
- Expired or failed payments release nothing (stock is only taken on paid or authorized) and the order goes to
  `cancelled` after Mollie's expiry.
- Test mode keys on staging, live keys only on production, both in `.env`, never in git.

Fees from Mollie's own pricing page, read 27 Oct 2026, for the proposal's running costs. EEA consumer cards 1.80% plus
0.25 €. Commercial cards 2.90% plus 0.25 €. American Express 2.90% plus 0.25 €. Klarna (DE, AT, CH) 2.99% plus 0.35 €.
EPS 1.50% plus 0.25 €. Apple Pay at the rate of the card used. No monthly fee for online payments.

**Their AGB section 5 names "WIXPayment" and Klarna.** It has to be updated to Mollie before launch. That's their text,
Nikolaus is a lawyer, he writes it.

### 4.3 Order statuses

`pending_payment` → `paid` (or `authorized` for Klarna) → `shipped` → (`completed` after 14 days) and side paths
`rejected`, `cancelled`, `refunded`, `partially_refunded`, `oversold` as a flag. Every status change is written to an
`order_events` table (order, from, to, user, note, time).

### 4.4 What their AGB promises after the order

- **Five working days.** AGB section 3 says the contract forms when the goods ship within 5 working days (Monday to
  Friday, not public holidays) of the order receipt, and if stock is short the customer gets an email within those 5
  days. The admin shows each open order's working day count, and the dashboard warns at day 3. Austrian public holidays
  come from a config list Josh keeps for the year.
- **Reject.** AGB section 3 allows refusing an order without reasons. Admin action **Reject and refund**, full refund or
  Klarna release, email to the customer.
- **Smaller quantity.** AGB section 2 allows shipping less when demand beats stock, the customer is told in the shipping
  confirmation. Admin action **Ship partially**, set the quantity per line, refund the difference, and the shipping
  email lists what was reduced.
- **Shortage notice.** Admin action **Delay notice**, a short email that the goods are delayed by stock.

---

## 5. Leonie's booking

Services, seeded from https://www.healthysecrets.at/services-2 (read 19 Oct, the page title is "Termin buchen" and no
link on their site points to it).

| Service | Duration | Price |
|---|---|---|
| Ernährungstherapie | 60 min | 120 € |
| BIA Messung | 30 min | 50 € |
| Ernährungstherapie & BIA Messung | 120 min | 160 € |

Phase 1 is a **booking request**, exactly as the prototype shows. The visitor picks a service, preferred weekdays and a
time of day, leaves details, ticks the consent box and sends. Leonie gets an email and the request in the admin, she
confirms the time herself. No calendar sync, no online payment.

The form asks about health ("anliegen", "nachricht"). That's health data under GDPR article 9, so the explicit consent
checkbox stays required, its timestamp is stored, the text links the privacy policy, and requests are deleted on a
schedule the client sets (default 12 months after closing).

Phase 2 option, real time slots from Leonie's calendar and paying online. Not promised.

---

## 6. Rules that change the code

### 6.1 Prices

- Shop prices are gross, with VAT included, and the product page says so ("inkl. MwSt."). The live Wix pages show
  prices with tax included (`taxOnProduct: true` in their page data, read 27 Oct). **Their AGB section 4 says consumer
  prices are exclusive of VAT.** That sentence contradicts the shop and Austrian practice for consumers. Flag it to
  Nikolaus, he fixes the AGB. Build gross.
- Show a unit price per kg or litre next to each price (computed from `net_quantity`). Nikolaus confirms whether it's
  required for them. It costs nothing to show.
- A struck through old price follows the Austrian price rule for reductions (PrAG section 9a, from the EU Omnibus
  directive). The reference price is the lowest price of the last 30 days. So keep a `price_history` table (product,
  price, from, to) and compute the reference from it. Nikolaus confirms the details.
- Discounts apply in a fixed order. Timed sale on the item first, then the coupon on the discounted basket. A coupon
  never stacks with another coupon. Sales and coupons can be set to exclude each other per coupon.

### 6.2 Food information on every product page, before the customer buys

EU Regulation 1169/2011 (LMIV) article 14 makes the mandatory food information available before the purchase in online
selling, except the best before date. Their own AGB section 2 promises it too, "Zutatenverzeichnis, Allergene,
Nettofüllmenge, alkoholhaltige Zutaten, Aufbewahrungshinweise, Name/Anschrift des Lebensmittelunternehmers".

So every product page shows, and the admin requires before a product can go live,
- name of the food,
- ingredients list with allergens highlighted (bold),
- "may contain" notes,
- net quantity,
- storage conditions and instructions for use,
- name and address of the food business operator,
- the nutrition declaration per 100 g (energy, fat, saturates, carbohydrate, sugars, protein, salt). Fibre too,
  because "Fibre Flow" and the copy about soluble fibre count as a nutrition claim and a claim makes fibre mandatory
  in the table (Regulation 1924/2006 article 7). Nikolaus confirms,
- the percentage of any ingredient named in the product name or stressed in the text (for example matcha in Matcha
  Latte, berries in Red Berry Mix), which the regulation calls the quantitative ingredient declaration,
- warnings (caffeine, St John's wort, the AGB section 12 notes).

**The nutrition tables don't exist on their current product pages** (handover point 4, 19 Oct). The client has to send
them per product. This is the biggest content blocker.

**Health claims.** The prototype copy deliberately leaves out claims that aren't on the EU register (handover point 4).
The client owns every claim on the site. Seed the products with the prototype's text, not the Wix text, and let
Nikolaus add back what he signs off.

### 6.3 VAT

- Austria has four rates, 20%, 13%, 10% and, since 1 July 2026, 4.9% for selected staple foods listed in Anlage 3 to the
  UStG (usp.gv.at, last updated 10 Jul 2026). Most food stays at 10%. **Which rate each of their seven products takes is
  for their accountant**, so the rate is a field per product, never hard coded.
- The same page says the reduced 4.9% rate is lost when a qualifying food is delivered together with a non qualifying
  one. If any product turns out to be at 4.9%, the accountant has to say how bundles and mixed baskets are taxed before
  bundles go live.
- Invoices show net, VAT per rate and gross. Shipping VAT follows the rule the accountant gives.
- Rounding. Prices are gross per item. Work out VAT per line from the gross line total, round each line to the cent,
  and add the lines up per rate. The invoice total always equals the amount Mollie charged.
- A fixed amount coupon is split across the VAT rates in proportion to each rate's share of the basket gross.
  A percent coupon applies per line.
- Bundles don't carry one VAT rate. A bundle's price is split across its products in proportion to their single prices,
  and each part keeps its product's rate. Drop `tax_rate_id` from `bundles`.
- Invoice contents follow the Austrian VAT act (UStG section 11), the accountant confirms the list. Seller name,
  address and UID, customer name and address, a unique gapless number, issue date, delivery date, items and quantities,
  net amount and VAT per rate, the rate, gross total. Invoices under 400 € may be simplified, show the full set anyway.
- A refund issues a credit note (Gutschrift or Storno) with its own number that refers to the invoice. Invoices are
  never edited or deleted.
- Sales to other EU countries. Under the EU rules, B2C sales to other EU states switch to the destination country's
  VAT (through OSS) once cross border sales pass 10,000 € a year. The accountant confirms how this applies to them. **Launch shipping to Austria only** unless the accountant
  says otherwise. The prototype offers AT, DE, IT and other EU, so trim that list to what they confirm.

### 6.4 Shipping

**Two sources disagree.** Every live product page shows "inkl. Versand" under the price (Wix shipping disclaimer, read
27 Oct). Their AGB section 4 and 7 say shipping costs are charged separately and shown before the order. The client
decides which one is true. The data model supports both, a rate per zone with an optional free shipping threshold, or a
rate of zero.

Carrier is Österreichische Post (their shipping page). Delivery in Austria 1 to 3 working days from dispatch (same page).
No carrier API in phase 1, the tracking number is typed in when marking an order shipped.

### 6.5 Privacy

- Only strictly necessary cookies (session, CSRF, cart). No analytics, no pixels, no embedded Google Maps, no Instagram
  embed, so no consent banner is needed. If the client later wants analytics, add a consent banner first, or use a
  cookieless tool. The Gut Health Club map is the static SVG plus a link out to Google Maps, as in the prototype.
- Fonts stay self hosted (Jost files are in `site/assets/fonts`). Never load Google Fonts from Google.
- Booking health data consent, section 5.
- Events list, if kept, needs double opt in with the confirmation stored, and an unsubscribe link in every email.
- Their privacy policy (Nov 2025 PDF) must name the new processors before launch, the hosting provider, Mollie, the
  email service. That's their text. Josh sends Nikolaus the list of processors with their addresses.
- Data retention. Orders and invoices are business records and Austrian rules require keeping them for years (the
  accountant confirms the period, commonly 7). Don't build an automatic order deletion. Booking requests and enquiries
  get a deletion schedule.

### 6.6 Legal pages

Five PDFs are live on their site today (read 27 Oct).

| File on healthysecrets.at | What it is | Where it's linked |
|---|---|---|
| `/_files/ugd/aadec6_21d69f4689574c8d8bbbda35919084d6.pdf` | AGB Healthy Secrets OG, Stand November 2025 | AGB page, Impressum |
| `/_files/ugd/aadec6_8088b901b25d40f19378549a0a58b8ca.pdf` | Datenschutzerklärung Website, Stand November 2025 | Impressum |
| `/_files/ugd/aadec6_7abc580e505b43f48cff26868e699818.pdf` | AGB of the old Healthy Secrets e.U., Stand April 2021 | AGB page, Impressum, all 7 product pages, shipping page |
| `/_files/ugd/aadec6_43f30f6bad8b4314ab5e85f7454fcfb3.pdf` | Datenschutzerklärung Webshop of the old e.U., Stand April 2021 | same places as above |
| `/_files/ugd/aadec6_7a8052ffb49c47aa9e9e89da4e660539.pdf` | Widerrufsformular, old address, a Gmail address and phone +43 676 625 653 8 | same places as above |

So the live shop links the 2021 e.U. terms from every product page. The new site links only current documents. The
client has to supply a current Widerrufsformular (the 2021 one names healthysecrets.kundenservice@gmail.com and a
different phone number from the AGB, which says 0043 676 777 10 15).

Their AGB section 14 links the EU online dispute resolution platform. That platform closed on 20 July 2025 when
Regulation (EU) 2024/3228 repealed Regulation 524/2013 (CMS law update for Austria, iubenda, others). Tell Nikolaus,
it's his text. Don't put an ODR link on the new site.

Accessibility. Build to WCAG 2.1 AA, the prototype already passes axe on all 9 pages. Whether the Austrian accessibility
law applies to a micro enterprise like theirs is for Nikolaus.

---

## 7. Search and the move from Wix

### 7.1 Redirects (301), every URL in their two sitemaps today

Read from `pages-sitemap.xml` (15 URLs) and `store-products-sitemap.xml` (7 URLs) on 27 Oct. **Watch the trap, `/shop`
on Wix is the tea category, not the shop.** Titles were checked page by page.

| Old path | Old page title | New path |
|---|---|---|
| `/` | Healthy Secrets, Lebensmittel | `/` |
| `/shop-4` | Shop | `/shop` |
| `/shop` | Teemischungen | `/shop` (or a category URL if Josh builds them). The teas sit at two hours, Slimming Sips 19 Uhr, Lullaby Leaves 22 Uhr, so no single hour anchor fits |
| `/shop-2` | Fibre Flow Drinks | `/shop` (or a category URL). Matcha and Chai are at 15 Uhr, Moon Milk at 22 Uhr |
| `/shop-3` | Backmischung | `/shop/haferbrot-backmischung` |
| `/granola` | Granola | `/shop/omega-3-muesli-red-berry-mix` |
| `/kombucha` | Kombucha (empty category) | `/club` (kombucha is only sold in the café) |
| `/shop-1` | Merch (empty, "Coming Soon") | `/shop` |
| `/über-uns` (encoded `/%C3%BCber-uns`) | Über uns | `/ueber-uns` |
| `/general-9` | About | `/en/ueber-uns` |
| `/services-2` | Termin buchen | `/beratung` |
| `/faq` | FAQ | `/shop#faq`. The prototype's shop FAQ block has `class="faq"` but no id, add `id="faq"` in the port |
| `/shipping-returns` | Shipping and Returns | `/versand` |
| `/agb-1` | AGB | `/agb` |
| `/impressum` | Impressum | `/impressum` |
| `/product-page/shaping-secret` | Matcha Latte Fibre Flow | `/shop/matcha-latte-fibre-flow` |
| `/product-page/chai-latte-fibre-flow` | Chai Latte Fibre Flow | `/shop/chai-latte-fibre-flow` |
| `/product-page/moon-milk-fibre-flow` | Moon Milk Fibre Flow | `/shop/moon-milk-fibre-flow` |
| `/product-page/omega-3-müsli-red-berry-mix-300g` (encoded `m%C3%BCsli`) | Omega-3 Müsli Red Berry Mix 300g | `/shop/omega-3-muesli-red-berry-mix` |
| `/product-page/haferbrot-backmischung-500g` | Haferbrot Backmischung 500g | `/shop/haferbrot-backmischung` |
| `/product-page/slimming-secret-tea` | Slimming Sips 50g | `/shop/slimming-sips` |
| `/product-page/calming-secret-tea` | Lullaby Leaves 50g | `/shop/lullaby-leaves` |
| the five `/_files/ugd/...pdf` above | legal PDFs | 2025 AGB to `/agb`, 2025 privacy to `/datenschutz`, the three 2021 files to the current page of the same type |

Rows where the old and new path are the same (`/`, `/impressum`, and `/shop`, see below) are **not** redirects. Don't seed them into the
`redirects` table or they loop. They just have to answer 200 on the new site. Note `/shop` changes meaning, Wix's `/shop`
is the tea category and the new `/shop` is the whole shop, so it needs no redirect either.

New slugs are suggestions, Josh can change them before launch. Match both the raw and the percent encoded form of the
two umlaut paths. Test every row with curl after the switch, expect one 301 then a 200.

### 7.2 On page

- Title and description per page and per product, editable, both languages.
- `sitemap.xml` with both languages and `hreflang` alternates, `robots.txt` pointing at it.
- Structured data. `Product` with `Offer` (price, currency, availability) on product pages. `Organization` site wide.
  `CafeOrCoffeeShop` on `/club` with the address Wildpretmarkt 1, 1010 Wien and the opening hours from settings.
  `BlogPosting` on articles.
- Open Graph image and text per page.
- Their domain already has a Google Search Console verification record (TXT `google-site-verification=Ul0q...`,
  section 9). Keep it, then submit the new sitemap in Search Console after launch and watch coverage for two weeks.

---

## 8. Hosting

**Recommended.** Laravel Forge managing one Hetzner Cloud server in the EU (Germany or Finland). If no Hetzner plan can
be ordered on the day (both plan pages showed "unavailable" text on 27 Oct), use Laravel VPS from inside Forge or
another EU host Josh trusts, and tell Raka the monthly price before ordering.

| Item | What | Price, read 27 Oct 2026 |
|---|---|---|
| Server | One Hetzner Cloud server in eu-central (Falkenstein, Nuremberg or Helsinki), at least 2 GB RAM. 1 GB is tight for PHP, MySQL and a queue worker | Listed 27 Oct, excl. VAT. CX23, 2 vCPU, 4 GB, 40 GB, 5.99 € a month (hetzner.com/cloud/cost-optimized, marked "not available"). CPX12, 1 vCPU, 2 GB, 40 GB, 11.99 € a month (hetzner.com/cloud/regular-performance, also showing "currently unavailable"). Availability changes, so pick the cheapest EU plan with 2 GB or more that can actually be ordered on the day |
| Backups | Hetzner's server backup option plus a nightly database dump to separate storage | check the backup add on price when ordering |
| Server management | Laravel Forge | Hobby 12 $ a month allows **one** external server (a Hetzner server counts as external). Growth 19 $ a month allows unlimited servers (laravel.com/forge/pricing). Hobby works if every Astra client shares one server, Growth if each client gets its own |
| Email sending | A transactional service with EU sending, Josh's choice (Postmark, Brevo or Mailgun EU are common) | price at signup, small at their volume. Name it to Raka so the privacy policy can list it |
| SSL | Let's Encrypt through Forge | free |
| Domain | stays where it is registered today | unchanged |

Set up.
1. **Two sites on the server.** `staging` on a Forge hosted test domain or a subdomain, behind HTTP basic auth, with
   `noindex` headers, Mollie test keys and mail caught (no real customer emails). **Exempt the Mollie webhook route from
   basic auth on staging**, or test payments never complete. `production` on www.healthysecrets.at.
2. **Git deploy** from an Astra repository, zero downtime deploys (Forge includes them), `php artisan migrate --force`
   in the deploy script.
3. **Queue worker** as a Forge daemon. **Scheduler** cron every minute.
4. **Backups** tested by one real restore onto staging before launch.
5. **Monitoring.** Forge server monitoring plus an uptime check on `/` and on the Mollie webhook route. Error logging
   to a service Josh likes, set to email Astra.
6. PHP 8.4, OPcache on, `APP_DEBUG=false` on production.

Running cost at launch is the server (6 to 12 € a month plus VAT at the prices listed today) plus the email service,
plus Forge on Astra's account (12 or 19 $ a month, shared across clients). **Raka decides whether the 50 € a month care fee includes
hosting** (section 12).

---

## 9. Domain, DNS and their email. Don't break office@

What their DNS returns today (Google public DNS, 27 Oct 2026).

| Record | Value |
|---|---|
| Nameservers | `ns10.wixdns.net`, `ns11.wixdns.net` (DNS is hosted by Wix) |
| `healthysecrets.at` A | `185.230.63.186`, `185.230.63.171`, `185.230.63.107` (Wix) |
| `www` | CNAME to `cdn3.wixdns.net` (Wix) |
| MX | Google Workspace, `aspmx.l.google.com` (10), `alt1` (20), `alt2` (30), `alt3` (40), `alt4` (50) |
| TXT | `v=spf1 include:_spf.google.com ~all` and `google-site-verification=Ul0qsJP6yPyPK5I5jgQtfc5XSPSc-FtKe6nhSEPSstc` |
| `mail.healthysecrets.at` A | `81.19.154.99`, reverse name `mwl01.world4you.com`, an Austrian host. Ask what it's for |
| DMARC | none |
| Google DKIM (`google._domainkey`) | none found |

**Their email runs on Google Workspace and their DNS sits at Wix.** If DNS moves without copying MX and TXT exactly,
office@ stops receiving mail, and that's where orders, bookings and Leonie's invite answers arrive.

We can only see the records we query by name. Wix's DNS panel may hold more. The registrar isn't confirmed (the nic.at
lookup was blocked from here). The `mail` record pointing at World4You suggests the domain may have been registered
there.

Cutover, in this order.
1. Get from the client the login of whoever holds the domain, and an **export or screenshot of every DNS record** in the
   Wix panel.
2. Choose where DNS will live after Wix, the registrar's own DNS or a DNS host like Cloudflare. Recreate every record
   there first, MX, SPF, the Google verification TXT, the `mail` record and anything else in the export. Compare record
   by record.
3. Add the email service's records. Its SPF include goes into the **same** SPF record (one SPF record per domain, for
   example `v=spf1 include:_spf.google.com include:<provider> ~all`), plus its DKIM records. Add a DMARC record starting
   at `p=none` with a report address. Ask the client's Google admin to switch on Google's DKIM in Workspace.
4. Lower the TTL on the old A and `www` records a day before.
5. On launch day, switch the nameservers (or the A and `www` records), issue SSL in Forge, run the redirect test (7.1)
   and send a test email to and from office@.
6. Keep the Wix plan running for 30 days after launch. Before cancelling, **export all Wix orders and customers to CSV**
   for their records, the accountant needs order history kept.
7. Switch off the Wix payments and Klarna connections only after the last Wix order is settled.

---

## 10. Security

- Admin on a non obvious path with 2FA and rate limited login. Every admin action logged.
- Mollie keys, mail keys and the app key in `.env` only. The repo has a `.env.example` without secrets.
- Webhook route excluded from CSRF, protected by fetching the payment from Mollie by id, never by trusting the body.
- Prices, discounts, stock and totals computed on the server only.
- Uploaded images validated by type and size, stored outside the web root or on the public disk with random names.
- `composer audit` and `npm audit` in the deploy script, monthly updates under the care plan.
- Personal data export and deletion for a customer (GDPR access and erasure requests) as an admin action, keeping
  invoices that must be retained.

---

## 11. Phases, to protect the budget

| Phase 1, keeps every promise from the call | Phase 2, priced separately |
|---|---|
| All 9 prototype pages in Laravel, DE and EN on their own URLs | Customer accounts and order history |
| Product pages with full food information | Real time booking slots and online payment for Leonie |
| Cart, checkout as in section 4, Mollie with cards, Klarna, EPS and Apple Pay | Events list with double opt in |
| Admin for products, stock, prices, timed sales, coupons, bundles, orders, refunds | Carrier API labels with Post |
| Receipt, shipping and refund emails, invoice PDF | Instagram feed, analytics with consent |
| Booking request for Leonie's three services | Shipping outside Austria with OSS VAT |
| Blog, Leonie writes in the admin | Nikolaus's own website (he asked about a bundle price on the call) |
| Trade enquiry form and the contact form | |
| Redirect map, sitemap, hreflang, structured data | |
| Hosting, DNS cutover, SSL, backups, monitoring | |

Raka said "around two weeks" on the call. Phase 1 in two weeks needs every client input from section 13 on day one.

---

## 12. Decisions for Raka, before the proposal

1. **Scope at 500 euros.** Is it phase 1 above, a smaller cut, or a higher price for phase 1? The proposal must say
   exactly what's in.
2. **Who pays hosting.** Inside the 50 € a month, or passed through on top.
3. **Whose accounts.** Mollie must be the client's. Recommend the Hetzner server and the email service are in Astra's
   name and billed through the care fee, and the domain stays in the client's name.
4. **Blog in phase 1 or 2.** Leonie asked for it on the call, the email you sent says "Leonie can write her blog". This
   spec keeps it in phase 1.
5. **The events sign up.** Out of phase 1 in this spec. Keep it out, or build it with double opt in in phase 2.
6. **Forge plan.** Hobby (12 $) if all Astra clients share one server, Growth (19 $) if each client gets its own.

## 13. What we need from the client before Josh starts

| # | Input | Why | Who |
|---|---|---|---|
| 1 | Nutrition table, full ingredients with allergens, storage and net quantity for all 7 products | Law (6.2), and the AGB promises it | Stephanie or Leonie |
| 2 | VAT rate per product, and how shipping and bundles are taxed | 6.3 | their accountant |
| 3 | Shipping model and prices, and which countries they ship to | 6.4, the live site and the AGB disagree | Nikolaus |
| 4 | Updated AGB (payment section names Mollie, consumer prices gross, no ODR link), privacy policy naming the new processors, a current Widerrufsformular | 4.2, 6.1, 6.5, 6.6 | Nikolaus |
| 5 | Mollie account opened in their name, Astra added as a developer | 4.2 | Nikolaus |
| 6 | Domain registrar login and a full DNS export from Wix | 9 | whoever holds it |
| 7 | Google Workspace admin to switch on DKIM | 9 | whoever runs Workspace |
| 8 | Café opening hours and days, café menu with prices if they want them shown | `/club`, structured data | Leonie |
| 9 | Which email gets order, booking and enquiry alerts (office@ by default) | 3.3 | any |
| 10 | Stock counts per product, and SKUs if they use them | 3.1 | any |
| 11 | The 11 open content points in `handover.md` (Matcha at 44 € against 25 € for the other two drinks, claims to restore, portraits, kitchen photos and so on) | content | the three |
| 12 | Names for three admin logins | 3.2 | the three |

---

## 14. Acceptance, before launch

Automated tests (Pest or PHPUnit) are part of the build, not extra. At least VAT and rounding with sales, coupons and
bundles, the Mollie webhook (paid, authorized, failed, expired, repeated), stock with two orders for the last unit,
the five working day count, and every redirect row.

- Every redirect row returns one 301 to `https://www...` then 200. The three same path rows return 200 directly.
- A test order in Mollie test mode for each payment method, paid, shipped, part refunded. A Klarna order goes
  authorized, then captured when marked shipped, and a rejected Klarna order releases the authorization. Stock moves
  only on paid or authorized.
  Replaying the same webhook twice changes nothing the second time.
- VAT on the invoice matches the accountant's rates to the cent, with a coupon and a sale running at once.
- The summary page, both checkboxes and the "Zahlungspflichtig bestellen" button are present, and the order stores the
  AGB version and both timestamps.
- Every product page shows every food field in section 6.2, in both languages.
- The prototype's own QA bar still holds. Zero console errors, axe clean on every page, no horizontal scroll at 320,
  390, 420, 768, 1024 and 1280 px, the 53 interaction checks from the prototype QA pass where they still apply, pages
  readable without JavaScript.
- office@ receives a test email from outside after the DNS switch, and order emails pass SPF, DKIM and DMARC.
- A backup restored onto staging and the site works from it.
- The three owners each change a price, start a sale, ship an order and publish a blog post on their own, with Josh
  watching and not touching the keyboard.

---

## Sources, all read 27 Oct 2026 unless dated otherwise

- The call transcript and notes, `logs/meetings/2026-10-27-HealthySecrets-call.md`.
- The sent summary email, Gmail message 1a17ee24ba4fff46, 27 Oct 19:42 UTC.
- Prototype source and handover, `state/prototypes/healthy-secrets/` (`build/`, `site/`, `handover.md`, `research.md`).
- Live site healthysecrets.at, both sitemaps, all 7 product pages (JSON-LD prices Matcha 44, Chai 25, Moon Milk 25,
  Müsli 9.50, Haferbrot 9.50, Slimming Sips 12, Lullaby Leaves 12, all in stock), page titles, the 5 legal PDFs.
- AGB Healthy Secrets OG, Stand November 2025, sections 2, 3, 4, 5, 7, 10, 12, 14.
- Booking services, https://www.healthysecrets.at/services-2 , read 19 Oct (`research/site-research/products.json`).
- DNS via dns.google, NS, A, MX, TXT, `mail`, `_dmarc`, `google._domainkey`, with a control lookup in the same run.
- Packagist, laravel/framework v13.39.0, mollie/laravel-mollie v5.0.0, filament/filament and filament/support v5.11.0,
  spatie/laravel-translatable 6.15.0 (PHP ^8.4), lara-zeus/spatie-translatable 2.0.1, and
  filament/spatie-laravel-translatable-plugin marked abandoned.
- Mollie's Klarna page, https://docs.mollie.com/docs/klarna .
- Redirect behaviour of http and https on the apex and www, curl.
- https://www.mollie.com/pricing , https://laravel.com/forge/pricing ,
  https://www.hetzner.com/cloud/regular-performance/ , https://www.hetzner.com/cloud/cost-optimized/ .
- An independent review of this spec by a second agent against the same sources, 27 Oct. Its findings were each
  re-verified before being applied.
- https://www.usp.gv.at/aktuelles/newsliste/neuer_ustsatz.html (4.9% rate since 1 Jul 2026, last updated 10 Jul 2026).
- On the ODR platform closure, https://cms.law/en/aut/legal-updates/the-odr-platform-is-closing-what-businesses-need-to-know
  and https://www.iubenda.com/en/help/173458-discontinuation-of-the-european-online-dispute-resolution-odr-platform .
- On LMIV article 14, https://gesetze.legal/eu/vo_eu_2011_1169/14 .
