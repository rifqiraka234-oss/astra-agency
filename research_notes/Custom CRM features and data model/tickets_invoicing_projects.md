# CRM service and post-sale features: tickets, SLAs, portal, quotes, invoicing, projects, account management

Scope note. Research done 2026-11-06. Pages actually read in full (via fetch) are cited as primary. Several primary sources were not reachable from this environment (EUR-Lex returned an empty WAF challenge to curl and an empty page to the fetcher, help.salesforce.com renders only a JS shell, developer.salesforce.com returned 403, several knowledge.hubspot.com URLs 404'd after HubSpot moved them). Those gaps are listed per section rather than filled from memory. Anything in an Inferences block that comes from background knowledge rather than a fetched page is labelled "(background, unverified this session)".

## 1. Tickets, SLAs, customer portal and help desk (HubSpot first, Salesforce second)

### Takeaway
HubSpot's ticket is a thin record (name, description, pipeline, status, priority, source, owner) wrapped in a lot of automatically computed timing fields (date entered/exited per status, time to first response, time to close, both raw and "in SLA hours") plus four SLA fields (due date and status for first response and for close). A custom CRM should copy that split: a small editable ticket table, an append-only status-history table, and derived SLA timers computed against a business-hours calendar.

### Cited Findings
**HubSpot default ticket properties** (all from [HubSpot KB, default ticket properties](https://knowledge.hubspot.com/properties/hubspots-default-ticket-properties); the article gives display names only and points to the [ticket object definition API](https://developers.hubspot.com/docs/api-reference/latest/crm/objects/tickets/object-definition#properties) for internal names):
- Identity: Record ID, Ticket name (short summary), Ticket description, Merged Ticket IDs, Create date (auto set but editable), Created by user ID, Updated by user ID, Last modified date.
- Pipeline and status: Pipeline; Ticket status (= current pipeline stage); per-status "Date entered [status]", "Date exited [status]", "Cumulative time in [status]", "Latest time in [status]" (Professional/Enterprise); Close date (set when moved to a closed status, cleared if reopened); Last Closed Date; Resolution (action taken).
- Classification: Priority; Category (main reason for contact, set by AI from the first message, Service Hub Enterprise); Language (AI detected, Enterprise); Source (channel originally submitted through); Originating channel type (chat, form, Messenger...); Originating channel account; Outbound ticket flag; Brands; Record Source and Record Source Detail 1 to 3.
- Ownership: Owner; Owner assigned date; Owner's main team; Assigned teams (drives "My Team's Unassigned" view); Shared teams / Shared users; Number of associated companies.
- Timing: Time to first rep assignment; Time to first agent email reply (only counts replies sent from the HubSpot inbox or ticket record, not external inboxes or logged emails); First agent email response date; Last response date; Last customer reply date; Time to first response in SLA hours; Time to close; Time to close in SLA hours (the two "SLA hours" fields cover help desk tickets with data from January 2025).
- SLA fields (only appear once SLAs are configured): Time to first response SLA due date; Time to first response SLA ticket status; Time to close SLA due date; Time to close SLA ticket status. Status enum is the same for both: Active SLA, Due soon, Overdue, SLA completed on time, SLA completed late.
- Activity rollups: Last activity date, Last contacted date, Next activity date, Number of times contacted, Number of Sales Activities.
- Feedback: Last CES survey rating, date and comment (Service Hub Pro/Enterprise).

**HubSpot SLAs and business hours**
- SLA goals are time to first response and time to close; a third goal, time to next response, appears in Service Hub Enterprise help desk reporting (Help Desk Summary shows paused tickets per SLA status across all three goals) — [HubSpot Community](https://community.hubspot.com/t/how-to-pause-sla/122943.md) / [consultevo summary](https://consultevo.com/hubspot-set-sla-goals-help-desk/). Secondary sources, not the official KB.
- SLAs are configured in ticket settings, where goals and team business hours are set, and each goal can be set to count only inside business hours — [insidea](https://insidea.com/blog/hubspot/kb/how-to-set-service-level-agreements-slas-in-the-hubspot-inbox). Secondary source; a second source gives a different settings path, so the menu location is not reliable.
- Business-hours behaviour example: a ticket opened Monday 17:00 and answered Tuesday 10:00 shows a 2 hour first response, not 17 hours — [HubSpot Community, SLAs and office hours](https://community.hubspot.com/t/slas-and-office-hours/121874).
- For years standard reports ignored business hours (long-running HubSpot Ideas thread) — [HubSpot Ideas](https://community.hubspot.com/t5/HubSpot-Ideas/Time-to-Close-and-Time-to-First-Reply-Taking-Business-Hours-into/idi-p/312863); the fix was the "in SLA hours" properties above — [HubSpot KB](https://knowledge.hubspot.com/properties/hubspots-default-ticket-properties).

**HubSpot customer portal**
- Available on Service Hub Professional and Enterprise; customers can view, open and reply to their tickets behind a login and see ticket status; typically reached via the knowledge base or a direct link; access can be restricted by assigning users to groups, and access-group limits are shared with the knowledge base — [HubSpot product page](https://www.hubspot.com/products/service/customer-portal), [HubSpot KB set up a customer portal (search result)](https://knowledge.hubspot.com/inbox/set-up-a-customer-portal), [fast.io guide](https://fast.io/resources/hubspot-client-portal/).
- Requires a domain connected to HubSpot and at least one ticket pipeline; only tickets appear in the portal — [thegistinbound guide](https://knowledge.thegistinbound.com/how-to-configure-a-customer-portal-in-hubspot) (third party).

### Inferences
- Minimal ticket table for a custom CRM: `id, number (human readable, e.g. T-2026-0042), company_id, contact_id (requester), project_id nullable, subject, description, pipeline_id, status_id, priority enum, category enum, source enum (portal, email, internal, phone), owner_user_id, created_at, first_response_at, resolved_at, closed_at, reopened_count, resolution text`. Store `first_response_due_at`, `resolution_due_at` and an `sla_policy_id` on the ticket; compute `sla_status` (active, due_soon, overdue, met, breached) in a view or job, mirroring HubSpot's five-value enum.
- HubSpot's "date entered / exited / cumulative time in status" fields are really an event log. In Postgres keep a `ticket_status_events(ticket_id, from_status, to_status, changed_at, changed_by)` table and derive all per-stage timings from it; never store them as mutable columns.
- "Business hours" needs its own table (`business_calendars`, weekly hours, timezone `Europe/Amsterdam`, holiday dates incl. Dutch public holidays) and a SQL function `business_minutes_between(calendar_id, t1, t2)`. Pausing the SLA clock while status = "waiting on customer" is the main feature agencies ask for; implement by excluding intervals spent in statuses flagged `pauses_sla`.
- For a small agency, SLA policy should hang off the retainer/support contract (an "entitlement" in Salesforce terms), not off the ticket priority alone: policy = contract tier × priority → first response and resolution targets.
- Portal: magic-link email login scoped to a `portal_users(contact_id, company_id, role)` table is the simplest secure option; company-wide ticket visibility should be a role flag (HubSpot gates this by group). Let the portal show tickets, project status/milestones and invoices (HubSpot's portal is tickets only, which is a gap an agency portal can beat).
- Salesforce (background, unverified this session): Case has Status, Priority, Origin, Type, Reason, Subject, Description, AccountId, ContactId, OwnerId, IsClosed, ClosedDate, EntitlementId, and milestone fields; Entitlement Management uses Entitlements (what support a customer is owed, linked to Account/Asset/Service Contract, with BusinessHoursId and an entitlement process), Entitlement Processes (SlaProcess) made of Milestones (e.g. First Response, Resolution) with success, warning and violation actions; CaseMilestone records track each milestone's target and completion; portals are built on Experience Cloud. Verify before quoting.

### Gaps
- Official HubSpot KB pages for SLA setup and customer portal setup returned 404 at the URLs tried; login/verification method (email verification vs SSO) for HubSpot's portal could not be confirmed.
- Salesforce Case, Entitlement, Milestone and Experience Cloud docs could not be fetched (JS shell / 403). Field lists above are background knowledge only.
- HubSpot ticket internal property names (e.g. `hs_pipeline_stage`, `hs_ticket_priority`, `hs_ticket_category`, `source_type`) were not confirmed from a fetched page; the KB article refers to the object definition API.

## 2. Products, line items, quotes, invoices and payments (HubSpot, Salesforce)

### Takeaway
HubSpot models commerce as Product (catalog template) → Line item (a per-parent copy, with its own ID per deal/quote/invoice) → Deal/Quote/Invoice. Invoices are a native object with a four-state lifecycle (draft, open, paid, voided); to go "open" an invoice needs a contact and at least one line item. Line items carry recurring-billing fields (frequency, term, start date) from which MRR/ARR/ACV/TCV are derived.

### Cited Findings
**HubSpot line item properties** — [HubSpot KB, default line item properties](https://knowledge.hubspot.com/properties/hubspots-default-line-item-properties) (display names; internal names not listed in the article):
- Name; SKU; Unit price; Effective Unit Price (applied under volume or graduated tiers, auto); Quantity; Unit discount (amount per unit); Discount Percentage; Calculated Total Discount (auto); Unit cost; Net price (auto) and Net Price after tax; Pre Discount Amount (auto).
- Recurring: Billing frequency; Term (e.g. 12 for 12 monthly payments); Billing start date; Delayed billing start by days / by months; Start billing terms (auto); Billing terms (fixed number of payments or auto-renew until cancelled, auto); Number of payments (auto).
- Tax: Tax rate; Tax category (drives automatic tax); Tax amount (auto).
- Revenue metrics (auto): ACV, ARR, MRR, TCV, plus margin variants that subtract cost of goods sold; Margin.
- Product type: Inventory, Non-Inventory, Service. Pricing model: flat or one of three tiered options.

**HubSpot invoices object** — [HubSpot developer docs, Invoices API guide](https://developers.hubspot.com/docs/api-reference/crm-invoices-v3/guide):
- A draft needs only `hs_currency`. Moving to `open` requires at least one associated contact and at least one line item.
- Properties: `hs_currency`, `hs_invoice_date` (defaults to now), `hs_due_date` (defaults to now; ISO 8601 or Unix ms), `hs_invoice_status`, `hs_tax_id` (account tax ID printed on invoice), `hs_comments` (buyer-visible), `hs_purchase_order_number`, `hs_allow_partial_payments`, `hs_invoice_billable`, `hs_invoice_link`, `hs_pdf_download_link`, `hs_invoice_payment_collection_method` (`manual` enables digital payment, `none` disables), `hs_allowed_payment_methods` (e.g. `credit_or_debit_card`, `ach`).
- Status enum `hs_invoice_status`: `draft`, `open`, `paid`, `voided`.
- Associations: line items (required for open; line item IDs differ between parent objects such as invoices, deals and quotes), contact (required; association type ID 177 invoice→contact), company (optional), discounts, fees and taxes (optional, applied in order discounts → fees → taxes, each with `hs_type` FIXED or PERCENT and `hs_sort_order`), deals.
- Endpoints: `POST /crm/v3/objects/invoices`, `POST .../batch/create` (with associations), `PATCH /crm/v3/objects/invoices/{id}`, search, `PUT /crm/v4/objects/invoices/{id}/associations/default/{toObjectType}/{toObjectId}`, delete and batch archive.
- Limits: only `draft` invoices can be deleted (and `open` only if enabled in account settings); payment collection needs HubSpot payments or Stripe; manual payment recording is not possible via the API; invoice-level taxes are 1:1 with the invoice; non-billable invoices render no document and skip validation, email and notifications.

### Inferences
- Copy the product → line item snapshot pattern: `products(id, name, sku, description, unit_price, currency, unit (hour, day, fixed, month), product_type (service, licence, expense), tax_rate_id, revenue_ledger_code, active)` and a single polymorphic `line_items(id, parent_type (deal, quote, invoice, subscription), parent_id, product_id nullable, name, description, quantity numeric(12,2), unit, unit_price, discount_pct, discount_amount, tax_rate, billing_frequency nullable, term_months nullable, billing_start_date, position)`. Copy name/price into the line item at creation so later product price changes never rewrite history (HubSpot does this by giving each parent its own line item IDs).
- Money: store as `numeric(14,2)` or integer cents plus ISO currency, never float. VAT must be computed and stored per line (rate + amount) because the VAT Directive requires the taxable amount per rate (see section 3).
- Quote lifecycle (background, unverified this session): HubSpot quotes move draft → pending approval → approved/published → signed/accepted/expired, have a template, an expiration date, optional e-signature and payment collection. Salesforce Quote (with QuoteLineItem, synced to an Opportunity, one synced quote at a time) converts to Order/OrderItem; CPQ/Revenue Cloud adds product rules, price rules, bundles and amendments/renewals. For an agency, a quote = proposal with line items, a version number, `valid_until`, `accepted_at`, `accepted_by_name`, `accepted_ip`, and a PDF snapshot hash; a simple click-to-accept with audit trail is legally adequate for B2B service contracts in NL in most cases (not verified this session).
- An HubSpot-style `voided` state is how invoices should be cancelled in the custom CRM: never delete an issued invoice, issue a credit note (Moneybird's `duplicate_creditinvoice` does exactly this, see section 3).

### Gaps
- HubSpot product library default properties (as opposed to line items), quote templates, e-signature mechanics, subscriptions object and HubSpot payments EU availability were not fetched this session.
- Salesforce Quote, QuoteLineItem, Order and CPQ/Revenue Cloud field references could not be fetched.
- Stripe Invoicing API (invoice statuses draft/open/paid/uncollectible/void, hosted invoice page, numbering) was not fetched; treat as unverified.

## 3. EU and Dutch invoicing law, e-invoicing mandates, and build vs hand off to accounting software

### Takeaway
A Dutch agency's invoices must carry the Article 226 details, be numbered in one or more gap-free unique sequences, be issued by the 15th of the month after supply, show "Reverse charge"/"btw verlegd" plus both VAT numbers on intra-EU B2B services, and be kept 7 years. E-invoicing becomes mandatory for Dutch domestic B2B on 1 July 2030 and for intra-EU cross-border under ViDA on 1 July 2030; Belgium has required Peppol B2B e-invoices since 1 January 2026, so Belgian clients already expect them. That compliance surface (numbering, credit notes, UBL/Peppol, VAT returns) argues strongly for the CRM drafting invoices and handing issue/numbering to Moneybird (or similar) via API.

### Cited Findings
**EU VAT Directive 2006/112/EC, Article 226** (mandatory content of a full invoice) — [legislation.gov.uk copy of Directive 2006/112/EC Article 226](https://www.legislation.gov.uk/eudr/2006/112/article/226) (EUR-Lex itself was unreachable from this environment; the legislation.gov.uk copy is the text as it stood at 31 Dec 2020, and Article 226 was not changed by ViDA's 2025 package as far as this session could confirm):
1. Date of issue.
2. "a sequential number, based on one or more series, which uniquely identifies the invoice".
3. Supplier's VAT identification number.
4. Customer's VAT identification number where the customer is liable for the VAT (e.g. reverse charge) or for intra-EU supplies of goods (Art. 138).
5. Full name and address of supplier and customer.
6. Quantity and nature of goods, or extent and nature of services.
7. Date of supply or of payment on account, where determinable and different from the issue date. 7a: "Cash accounting" where applicable.
8. Taxable amount per rate or exemption, unit price excluding VAT, and any discounts not included in the unit price.
9. VAT rate applied.
10. VAT amount payable. 10a: "Self-billing" where the customer issues the invoice.
11. Reference to the exemption provision where exempt. 11a: the words "Reverse charge" where the customer is liable for the VAT.
12 to 14: new means of transport details, "Margin scheme — Travel agents", second-hand/art margin scheme mentions (not relevant to an agency).
15. Tax representative's VAT number, name and address where one is liable.

**Netherlands specifics** — [Ondernemersplein (KVK/government), facturen maken en versturen](https://ondernemersplein.overheid.nl/wetten-en-regels/facturen-maken-en-versturen/):
- Required: btw-id, btw-bedrag, factuurdatum, factuurnummer, own name and address, customer name and address, leverdatum, description of goods/services, KVK-nummer if you have one; quantity for goods, extent ("omvang") for services.
- Numbering: "opeenvolgend", and "Elk factuurnummer mag maar 1 keer voorkomen". Badly numbered invoices must be corrected, otherwise the customer cannot deduct VAT.
- Deadline: invoice sent at the latest on the 15th day of the month following the month of supply.
- Retention: invoices 7 years (10 years for immovable property), kept in the form sent/received; scanning allowed if a correct and complete copy; personal data on invoices must not be kept longer than necessary and the customer must be told the retention period.
- E-invoicing: a PDF by email is a digital invoice, not an e-invoice; the customer must agree to receive e-invoices; B2G to the Rijksoverheid must be an e-invoice; a law change makes B2B e-invoicing mandatory with "Ingangsdatum: 1 juli 2030".
- "btw verlegd" / "VAT reverse charged" wording on the invoice with the amount excluding VAT — secondary sources in [search results incl. getharvest NL page](https://www.getharvest.com/nl/invoices/print-invoice-for-netherlands); Belastingdienst's own page could not be fetched (404 at the URL tried).

**ViDA and national mandates** — [eConnect ViDA timeline](https://econnect.eu/en/docs/knowledge/regulations/europe/vida/timeline) (a Peppol access point vendor, secondary but detailed and dated):
- ViDA adopted by the Council 11 March 2025, published in the OJ 25 March 2025 (Directive (EU) 2025/516, Regulation 2025/517, Implementing Regulation 2025/518), in force 14 April 2025.
- 1 July 2030: cross-border (intra-EU B2B) e-invoicing and digital reporting requirements (DRR) mandatory, on EN 16931. 1 January 2035: national systems aligned with the ViDA standard. Interim: member states may mandate domestic e-invoicing without Council derogation (also reported by [search summary of Bloomberg Tax / KPMG results](https://news.bloombergtax.com/daily-tax-report-international/doing-business-in-the-eu-prepare-for-value-added-tax-e-invoices)).
- eConnect lists 1 July 2027 for OSS expansion and "mandatory reverse charge B2B" and the renewed VIES in 2027 — not independently confirmed this session.
- Netherlands: no statutory B2B duty yet; cabinet decision of 11 September 2026 sets mandatory domestic B2B e-invoicing from 1 July 2030 and digital reporting from 1 July 2031; Peppol not yet mandated as the infrastructure, consultation autumn 2026; B2G via Peppol mandatory since 2017. The 1 July 2030 date is corroborated by [Ondernemersplein](https://ondernemersplein.overheid.nl/wetten-en-regels/facturen-maken-en-versturen/).
- Belgium: mandatory B2B e-invoicing via Peppol from 1 January 2026 (Hermes decommissioned 31 Dec 2025), near-real-time e-reporting from 2028 — [eConnect](https://econnect.eu/en/docs/knowledge/regulations/europe/vida/timeline); a three-month no-sanction grace period to 31 March 2026 is reported in the [KPMG Belgium material via search](https://assets.kpmg.com/content/dam/kpmg/be/pdf/KPMG-Preparing-for-Belgium-s-e-invoicing-mandate-24-04-2025-final-presentation.pdf) (search summary only).
- Germany: receiving obligation since 1 January 2025; issuing phased by company size, larger businesses from 1 January 2027 and all from 1 January 2028; format EN 16931 (XRechnung or ZUGFeRD) — [eConnect](https://econnect.eu/en/docs/knowledge/regulations/europe/vida/timeline) and [Grant Thornton NL via search](https://www.grantthornton.nl/en/insights-en/tax/btw/recent-e-invoicing-developments-in-europe/).
- France: large and intermediate businesses September 2026, SMEs and micro September 2027; Poland KSeF: large Feb 2026, others April 2026, micro Jan 2027; Spain VeriFactu 2027, B2B e-invoicing expected 2027 (large) / 2028 (SMEs); Croatia via Peppol since Jan 2026; Ireland B2B Nov 2028/2029 — all [eConnect](https://econnect.eu/en/docs/knowledge/regulations/europe/vida/timeline).

**Moneybird API (handoff target)** — [Moneybird developer docs, sales invoices](https://developer.moneybird.com/api/sales_invoices/):
- Base `https://moneybird.com/api/v2/{administration_id}/sales_invoices`, Bearer token, `sales_invoices` scope.
- States: `draft, scheduled, open, pending_payment, reminded, late, paid, uncollectible`.
- `invoice_id` (the legal number, e.g. "2026-0001") is null while draft; drafts carry a `draft_id` instead. So the sequential number is assigned by Moneybird at send time.
- Invoices reference `workflow_id`, `document_style_id`, `identity_id`; lookup by id, by `invoice_id` or by `reference` (useful to store the CRM's own ID).
- Sync endpoints: `GET /sales_invoices/synchronization` returns ids + versions; `POST` fetches up to 100 full invoices per call.
- PDF download returns a 302 to a temporary URL valid 30 seconds; UBL XML download available; credit notes via `PATCH .../duplicate_creditinvoice` (credits all lines unless `detail_ids` given); register/delete payments, send, send reminders, mark uncollectible, pause/resume.

**Agency tools as benchmarks** — Productive.io: budgets can be fixed-price, hourly or mixed with or without expenses, recurring budgets for retainers, phases for long projects, time via timer/manual/scheduler, invoices built from un-invoiced tracked time or remaining fixed amounts and from multiple budgets onto one invoice, reminders when retainer budgets are ready to invoice, automatic invoicing on recurring budgets added around March 2026, deals connected to budgets — [Productive invoicing blog](https://productive.io/blog/how-to-save-a-couple-of-hours-on-invoicing), [Productive billing page](https://productive.io/billing/), [project-management.com review](https://project-management.com/?p=35414) (vendor and review sources, summarised via search).

### Inferences
- Recommendation: the CRM should own commercial data (quotes, billable time, retainer usage, what should be invoiced) and create draft invoices; Moneybird (or Exact/Xero/e-Boekhouden) should own legal issue: numbering, PDF/UBL, Peppol delivery, credit notes, payment matching from the bank feed, and the VAT return. Reasons: (a) gap-free numbering and "never delete, only credit" rules are already enforced there; (b) Peppol/UBL delivery is needed for Belgian clients today and all Dutch B2B from 1 July 2030; (c) the accountant works in that tool; (d) 7-year retention is handled.
- Integration pattern: CRM creates a Moneybird draft with `reference = crm invoice id`, keeps `external_id`, `external_number` (Moneybird `invoice_id`), `state`, `pdf_url_fetched_at`; poll the synchronization endpoint (ids + versions) or use webhooks to mirror state (open, late, paid). Never let the CRM generate the legal number if Moneybird sends.
- If the CRM must issue invoices itself: a `invoice_number_sequences(series, year, next_value)` row locked with `SELECT ... FOR UPDATE` in the same transaction that flips the invoice from draft to issued (Postgres sequences can skip values on rollback, so they are not gap-free); issued invoices immutable (trigger blocks UPDATE of financial columns once `issued_at` is set); corrections only via credit notes referencing the original; store the rendered PDF and its hash.
- VAT logic for a NL agency (B2B services): NL customer → 21% NL VAT; EU business customer with valid VAT number (check VIES at issue time and store the result) → 0% with "Reverse charge" / "btw verlegd" plus customer VAT number; UK business customer → outside scope of NL VAT (place of supply is the customer's country under the general B2B rule; background, not verified this session); private consumers outside NL have different rules. Store `vat_treatment` enum per invoice and the VIES check timestamp.
- Retention: 7 years conflicts with GDPR "no longer than necessary" only nominally — the legal obligation is the lawful basis, but contact data on invoices should be minimised and the retention period stated in the privacy notice (as Ondernemersplein says).

### Gaps
- Article 222 (issue deadline in the Directive), Article 226b (simplified invoices) and Article 247 (storage period set by member states) text could not be fetched from EUR-Lex; the Dutch 15th-of-next-month rule and 7-year retention come from Ondernemersplein.
- UK invoicing/retention rules (HMRC, 6 years for VAT records) and UK e-invoicing consultation were not researched this session.
- Moneybird create-invoice required fields, webhooks and rate limits were cut off in the fetched page; Peppol/Simplerinvoicing delivery via the API not confirmed.
- Exact Online, Xero, Stripe Invoicing and Teamleader APIs not fetched.

## 4. Projects inside a CRM, linked to deals, tickets and invoices; retainers

### Takeaway
HubSpot's Projects object (2025) is a basic custom-object-like record with a pipeline, a status (On Track, Delayed, On-Hold), owner, tasks shown in gantt/board views, and a "create project when deal hits Closed won" workflow. It has no native budget, hours or time tracking; agency tools like Productive fill exactly that gap with budgets (fixed, hourly, mixed, recurring retainers) and invoicing from tracked time. A custom agency CRM should model project = delivery container with budget and time, linked to the won deal, its tickets and its invoices.

### Cited Findings
- HubSpot Projects: available on any subscription (some features need seats); Super Admin must activate it under Data Management > Data Model; then appears under CRM > Projects; tags need Starter+; pipeline rules and workflows need Professional/Enterprise; the customer success workspace Projects tab needs a Service Hub seat — [HubSpot KB, understand and use the projects object](https://knowledge.hubspot.com/records/understand-and-use-projects-object).
- Same source: pipelines with renamable stages that can represent milestones such as kickoff or final sign-off; a "restrict projects from skipping stages" rule; status values referenced On Track, Delayed, On-Hold; owner, create date and time-in-stage properties; custom properties allowed; associations to tasks, deals and contacts (companies and tickets not mentioned); tasks created from gantt view are auto-associated; subtasks in beta; gantt and board views; reports on cumulative time in stage.
- Deal → project automation: deal-based workflow, filter Deal stage = Closed won, action "Create record" → Project — same source. Many third-party integrations do the same into awork, Harvest, Motion, PSOhub — [Zapier awork](https://zapier.com/apps/awork/integrations/hubspot/1729852/create-new-awork-projects-from-new-hubspot-deals), [PSOhub help](https://help.psohub.com/create-a-project-from-a-deal-in-hubspot).
- Project templates for HubSpot Projects were described as coming in a third-party guide but not confirmed in HubSpot's docs — [Arrows guide](https://arrows.to/resources/everything-you-need-to-know-about-hubspots-new-projects-object-for-project-management-2025).
- Productive.io retainer/budget model (fixed, hourly, mixed, recurring budgets, phases, invoicing from tracked time, retainer-ready reminders) — see section 3 citations [Productive billing](https://productive.io/billing/).

### Inferences
- Suggested `projects` table: `id, code (e.g. ACME-2026-03), company_id, deal_id (the won deal, nullable for internal), name, type enum (fixed_price, time_and_materials, retainer, support), status enum (planned, active, on_hold, delivered, closed, cancelled), health enum (on_track, at_risk, off_track — HubSpot uses On Track/Delayed/On-Hold), project_manager_user_id, start_date, target_end_date, actual_end_date, budget_amount, budget_hours, currency, billing_model, hourly_rate default, description, created_from_template_id`.
- Child tables: `project_milestones(project_id, name, due_date, completed_at, invoice_trigger bool, amount)` — milestones double as billing triggers for fixed-price work; `tasks(project_id, parent_task_id, assignee, status, due_date, estimate_hours)`; `time_entries(user_id, project_id, task_id, ticket_id nullable, date, minutes, billable bool, rate, invoice_line_item_id nullable, approved_at)`; `deliverables(project_id, name, url, delivered_at, accepted_at)`.
- Linking: `deal 1 → n projects`, `project 1 → n tickets` (tickets optionally reference project), `invoice line_item → time_entries / milestone` so "unbilled" = billable time entries with null `invoice_line_item_id`. Budget burn = sum(time × rate) / budget; this is the core health signal for an agency.
- Retainers: model as a `contracts`/`subscriptions` table (`company_id, type retainer|support|hosting, start_date, end_date, renewal_date, auto_renew, notice_period_days, monthly_fee, included_hours, rollover_policy, sla_policy_id`) with monthly `retainer_periods(contract_id, period_start, period_end, hours_included, hours_used, hours_rolled_over, invoice_id)`. This one contract table also serves as Salesforce-style "entitlement" for the ticket SLA (section 1) and as the source for renewal reminders (section 5).
- Deal close automation: on deal stage → won, a DB trigger or app job creates the project from a template (milestones + task list), copies line items into the project budget, and creates a contract row for any recurring line item (using the line item's billing frequency/term, section 2).

### Gaps
- No official list of HubSpot Projects default properties was found (KB page does not list them; the API object definition was not fetched).
- Teamleader Focus project/budget model and Productive API docs were not fetched directly.

## 5. Account management after the deal is won

### Takeaway
None of the fetched sources gave a primary description of renewal, health score or QBR features; HubSpot's relevant pieces are the Service Hub customer success workspace (which hosts the Projects tab) and ticket CES survey properties. For a small agency, account management reduces to: contract renewal dates with notice-period alerts, a computed health score from objective signals, and recurring check-in tasks.

### Cited Findings
- HubSpot's customer success workspace has a Projects tab requiring a Service Hub seat, i.e. HubSpot positions post-sale delivery inside customer success — [HubSpot KB projects](https://knowledge.hubspot.com/records/understand-and-use-projects-object).
- HubSpot stores Last CES survey rating, date and comment on tickets (Service Hub Pro/Enterprise), a per-interaction satisfaction signal usable in health scoring — [HubSpot KB ticket properties](https://knowledge.hubspot.com/properties/hubspots-default-ticket-properties).
- HubSpot line items carry billing terms (fixed payments or auto-renew until cancelled), term and start date, from which renewal timing is derivable — [HubSpot KB line item properties](https://knowledge.hubspot.com/properties/hubspots-default-line-item-properties).
- Productive reminds users when retainer budgets are ready for invoicing — [Productive invoicing blog](https://productive.io/blog/how-to-save-a-couple-of-hours-on-invoicing).

### Inferences
- `accounts` (companies) after won: add `lifecycle_stage` (prospect, onboarding, active, at_risk, churned, former), `account_manager_user_id`, `customer_since`, `next_checkin_date`, `checkin_cadence_days`, `health_score` (0 to 100, computed), `health_reason` text.
- Health score inputs that exist in this data model: overdue invoices (from Moneybird state), retainer hours burn vs included, open tickets past SLA, last CES/NPS answer, days since last meeting/email, project health of active projects, renewal date within notice window. Compute nightly into a `account_health_snapshots(company_id, date, score, components jsonb)` table so trends are visible.
- Reminders: generate tasks from rules, e.g. contract `renewal_date - notice_period_days - 30` → "renewal conversation" task; `next_checkin_date` → QBR task (quarterly for retainers, after delivery for one-off projects); project delivered + 30 days → "case study / review / upsell" task.
- Lifecycle after won for a dev/design agency: won → onboarding (kickoff) → delivery (project active) → handover/launch → support/retainer (tickets, SLA) → renewal or expansion (new deal on same account) → dormant/churned. Each new deal on an existing account should be flagged `deal_type = expansion|renewal|new_business` for reporting.

### Gaps
- No primary HubSpot or Salesforce documentation on health scores, renewals or QBR features was fetched (HubSpot customer success workspace health score and Salesforce renewal opportunities are background knowledge only).
- No sourced benchmarks on retainer renewal or churn rates for small agencies.
