# Standard CRM objects, default fields and associations (HubSpot first, Salesforce second, Attio / Twenty / Pipedrive as reference) for a custom Postgres CRM

Research date 2026-11-06. Verification status is marked per finding. "Fetched" means the primary page was opened and read this session. "Search summary" means only a search engine summary of the official page was available (the page itself was not opened, so treat as lower confidence). Salesforce developer docs returned HTTP 403 to every fetch method tried this session (WebFetch and curl to the get_document_content endpoint), so Salesforce field lists rest on search summaries plus well-known API names, and are flagged as such.

Source key used below:
- HS-CONTACT = https://knowledge.hubspot.com/properties/hubspots-default-contact-properties (fetched)
- HS-COMPANY = https://knowledge.hubspot.com/properties/hubspot-crm-default-company-properties (fetched)
- HS-DEAL = https://knowledge.hubspot.com/properties/hubspots-default-deal-properties (fetched)
- HS-LEADS-API = https://developers.hubspot.com/docs/api-reference/crm-leads-v3/guide (fetched)
- HS-ASSOC = https://developers.hubspot.com/docs/api-reference/crm-associations-v4/guide (fetched, page states API version 2026-09)
- HS-PROJECTS = https://developers.hubspot.com/docs/api-reference/latest/crm/objects/projects/guide (fetched)
- SF-OPP = https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_opportunity.htm (403, not readable)
- SF-ACR = https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_accountcontactrelation.htm (search summary only)
- SF-CONVERT = https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_calls_convertlead.htm (search summary only)
- ATTIO-PEOPLE = https://docs.attio.com/docs/standard-objects/standard-objects-people (fetched)
- TWENTY-* = raw entity files from github.com/twentyhq/twenty `main`, `packages/twenty-server/src/modules/{person,company,opportunity}/standard-objects/*.workspace-entity.ts` (fetched as raw source)

---

## 1. HubSpot default properties for Companies, Contacts, Deals, Tickets, Products, Line items, Quotes, Invoices, Leads, Users/Teams

### Takeaway
HubSpot's core sales model is Company, Contact, Deal and (since 2024) a separate Lead object, each with a small set of user-entered fields plus many system-calculated rollups (last activity, counts of associated records, revenue totals, stage entry/exit timestamps, weighted/forecast amounts). For a custom build, copy the user-entered fields as columns and derive the calculated ones from activity and association tables rather than storing them as editable data.

### Cited Findings

**Company (HS-COMPANY, fetched)**
- Company domain name: the company's website domain; filling Website URL auto-fills it. User-set. — [HS-COMPANY](https://knowledge.hubspot.com/properties/hubspot-crm-default-company-properties)
- Industry: dropdown of about 150 predefined options, custom options can be added. User-set. — [HS-COMPANY](https://knowledge.hubspot.com/properties/hubspot-crm-default-company-properties)
- Lifecycle stage: where the company is in the marketing/sales process. User-set (or automation). — [HS-COMPANY](https://knowledge.hubspot.com/properties/hubspot-crm-default-company-properties)
- Owner (company owner): a HubSpot user; additional users can be assigned via custom "HubSpot user" properties. Owner assigned date is system-set (when an owner was most recently assigned). — [HS-COMPANY](https://knowledge.hubspot.com/properties/hubspot-crm-default-company-properties)
- Number of employees, Annual revenue (actual or estimated): user-set numbers. — [HS-COMPANY](https://knowledge.hubspot.com/properties/hubspot-crm-default-company-properties)
- Parent company: stores the company ID of the parent company (i.e., a self-reference, one parent per company). Number of child companies: count of children. — [HS-COMPANY](https://knowledge.hubspot.com/properties/hubspot-crm-default-company-properties)
- Type: the company's relationship to you (prospect, partner, reseller, vendor, other). Lead status: sales/prospecting/outreach status with five default options. — [HS-COMPANY](https://knowledge.hubspot.com/properties/hubspot-crm-default-company-properties)
- Target account (boolean, ABM) and Ideal Customer Profile Tier (Tier 1 closest match; set by users). — [HS-COMPANY](https://knowledge.hubspot.com/properties/hubspot-crm-default-company-properties)
- System-calculated: Number of associated contacts, Number of associated deals, Last activity date (most recent logged note/call/meeting/completed task, blank if none), Total revenue (total value of closed deals), Recent deal amount (value of last closed-won deal). Number of open deals and Original Traffic Source (source of the earliest-activity contact) are also listed. — [HS-COMPANY](https://knowledge.hubspot.com/properties/hubspot-crm-default-company-properties)
- "Close date" on company = date the company became a customer; automatically set when the company moves to the Customer lifecycle stage. Also Time zone, LinkedIn company page (user-set). — [HS-COMPANY](https://knowledge.hubspot.com/properties/hubspot-crm-default-company-properties)

**Contact (HS-CONTACT, fetched; the KB page does not list internal names or data types)**
- Email (primary email), Job title, LinkedIn URL, Persona: user-set. — [HS-CONTACT](https://knowledge.hubspot.com/properties/hubspots-default-contact-properties)
- Lifecycle stage: set by imports, forms, workflows or manually. Lead status: where the contact/company is in the buying cycle as a lead. — [HS-CONTACT](https://knowledge.hubspot.com/properties/hubspots-default-contact-properties)
- Contact owner: one user; additional users via custom user fields. — [HS-CONTACT](https://knowledge.hubspot.com/properties/hubspots-default-contact-properties)
- Original Traffic Source: first known source; set automatically, options not editable but value can be manually changed. Drill-down 1 and 2: system-set, not manually editable. — [HS-CONTACT](https://knowledge.hubspot.com/properties/hubspots-default-contact-properties)
- Last activity date (system): most recent logged note, call, tracked sales email, meeting, LinkedIn/SMS/WhatsApp message, chat, or completed task. Last contacted (system): last logged chat, call, non-forwarded one-to-one email, meeting, or manually entered LinkedIn/SMS/WhatsApp message. — [HS-CONTACT](https://knowledge.hubspot.com/properties/hubspots-default-contact-properties)
- Company name on the contact is a plain text field, separate from the associated company record and not affected by company associations. — [HS-CONTACT](https://knowledge.hubspot.com/properties/hubspots-default-contact-properties)
- "Date entered [lifecycle stage]" family: system timestamps per stage. Number of sales activities (system count). Marketing contact status (system, marketing vs non-marketing, drives billing). — [HS-CONTACT](https://knowledge.hubspot.com/properties/hubspots-default-contact-properties)

**Deal (HS-DEAL, fetched)**
- Amount (user, deal currency); Amount in company currency (system, converted at account exchange rates until closed). — [HS-DEAL](https://knowledge.hubspot.com/properties/hubspots-default-deal-properties)
- Close date: expected or actual; set on creation and updated when deal moves to a closed stage (partly automatic). — [HS-DEAL](https://knowledge.hubspot.com/properties/hubspots-default-deal-properties)
- Pipeline (determines available stages), Deal stage (user-set). Deal probability: from the stage's win percentage, automatic until manually edited. — [HS-DEAL](https://knowledge.hubspot.com/properties/hubspots-default-deal-properties)
- Deal type (e.g., New Business / Existing Business), Priority, Deal owner, Next step, Closed won reason, Closed lost reason (lost options customisable): user-set. — [HS-DEAL](https://knowledge.hubspot.com/properties/hubspots-default-deal-properties)
- Forecast category: Not forecasted, Pipeline, Best case, Commit, Closed won; partly automatic if setting enabled. Forecast amount = amount x forecast probability (system). Weighted amount = amount x deal probability (system). — [HS-DEAL](https://knowledge.hubspot.com/properties/hubspots-default-deal-properties)
- Date entered / exited each stage (system; stage-calculated properties need Professional or Enterprise). Days to close (create date to close date, reports only). Is Closed Won (boolean, system). — [HS-DEAL](https://knowledge.hubspot.com/properties/hubspots-default-deal-properties)
- MRR and ARR: calculated from recurring line items and term, exclude Amount, require Sales Hub Pro/Enterprise. TCV: total from all line items incl. one-time. ACV shown in multi-currency accounts. — [HS-DEAL](https://knowledge.hubspot.com/properties/hubspots-default-deal-properties)

**Leads object (HS-LEADS-API fetched; stages from search summary)**
- Endpoint `/crm/v3/objects/leads`; leads must be set up in the account before API use. Create requires `hs_lead_name` and an association to an existing contact (example uses `associationTypeId` 578, HUBSPOT_DEFINED). — [HS-LEADS-API](https://developers.hubspot.com/docs/api-reference/crm-leads-v3/guide)
- `hs_lead_type`: dropdown (example "NEW BUSINESS"), editable. `hs_lead_label`: "the current status of the lead" (example "WARM"), editable. — [HS-LEADS-API](https://developers.hubspot.com/docs/api-reference/crm-leads-v3/guide)
- A lead "should only be assigned to a user with a seat" and is worked in the prospecting workspace. — [HS-LEADS-API](https://developers.hubspot.com/docs/api-reference/crm-leads-v3/guide)
- Default lead pipeline has five stages: New, Attempting, Connected, Qualified, Disqualified. Logging outreach moves New to Attempting, a reply moves to Connected; Qualified and Disqualified are manual. Custom lead pipelines do not get the default stage automation. (Search summary of HubSpot KB) — [HubSpot KB, lead pipeline automation](https://knowledge.hubspot.com/object-settings/set-up-lead-pipeline-automation)
- The older contact/company "Lead status" property (New, Open, In Progress, Open Deal, Unqualified, Attempted to Contact, Connected, Bad Timing) still coexists with the Lead object; do not conflate them in reporting. (Search summary) — [HubSpot KB, lead pipeline automation](https://knowledge.hubspot.com/object-settings/set-up-lead-pipeline-automation)
- Lead association type IDs: 578 lead to primary contact, 608 lead to contact, 580 lead to primary company, 610 lead to company. — [HS-ASSOC](https://developers.hubspot.com/docs/api-reference/crm-associations-v4/guide)

**Line items / Quotes / Tickets (association IDs only, fetched)**
- Line item to deal 20, line item to quote 68, line item to invoice 410. Quote to contact 69, quote to company 71, quote to deal 64. Ticket to contact 16, to company 339, to primary company 26, to deal 28. — [HS-ASSOC](https://developers.hubspot.com/docs/api-reference/crm-associations-v4/guide)

### Inferences
- Likely internal names (NOT verified this session, from prior knowledge of the HubSpot API; confirm with `GET /crm/v3/properties/{objectType}`): contact `email, firstname, lastname, jobtitle, lifecyclestage, hs_lead_status, hubspot_owner_id, hs_analytics_source, hs_analytics_source_data_1/2, notes_last_updated (last activity), notes_last_contacted, associatedcompanyid`; company `domain, industry, numberofemployees, annualrevenue, hs_parent_company_id, hs_num_child_companies, type, hs_is_target_account, hs_ideal_customer_profile, num_associated_contacts, num_associated_deals, total_revenue, recent_deal_amount`; deal `dealname, amount, amount_in_home_currency, closedate, pipeline, dealstage, hs_deal_stage_probability, dealtype, hs_forecast_category, hs_forecast_amount, hs_projected_amount (weighted), hs_priority, hs_next_step, closed_won_reason, closed_lost_reason, hs_is_closed_won, hs_mrr, hs_arr, hs_tcv, hs_acv`; ticket `subject, content, hs_pipeline, hs_pipeline_stage, hs_ticket_priority, hs_ticket_category, source_type, closed_date, time_to_close`; product `name, price, hs_sku, description, hs_cost_of_goods_sold, recurringbillingfrequency, hs_recurring_billing_period`; line item `name, hs_product_id, quantity, price, amount (calculated), discount, hs_discount_percentage, recurringbillingfrequency, hs_term_in_months`; quote `hs_title, hs_status, hs_expiration_date, hs_quote_amount, hs_currency`; invoice `hs_invoice_date, hs_due_date, hs_invoice_status, hs_amount_billed, hs_balance_due, hs_currency`.
- Pattern worth copying: every pipeline object (deal, lead, ticket, project) has `pipeline_id` + `stage_id`, and the stage table carries `probability` and `is_closed/is_won` flags so `deal.probability`, `is_closed_won`, weighted amount and forecast amount can be computed, not typed.
- For Astra (LinkedIn/lemlist + Gmail outreach) the Lead object maps closely to the current flow: lemlist accept = New, opener sent = Attempting, reply = Connected, meeting booked = Qualified. Lead label (Hot/Warm/Cold) is a separate dimension from stage.
- Line item should snapshot product name/price at time of sale (HubSpot line items copy from product rather than live-linking), so price changes do not rewrite past deals.

### Gaps
- The HubSpot KB pages for default ticket, product, line item, quote and invoice properties were not fetched (budget); only their association IDs are sourced. Users/Teams: owners are exposed via the Owners API (`hubspot_owner_id`) and teams are a settings construct; not verified this session.
- Lead object tier requirement (KB says it is a Sales Hub feature with seats) was not confirmed from a fetched page; the specific KB "manage leads" URL tried returned 404.
- Contact KB page gives no data types or internal names.

---

## 2. Salesforce standard objects: Account, Contact, Lead (+ conversion), Opportunity, OpportunityContactRole, Case, Product2 / PricebookEntry / OpportunityLineItem, Quote

### Takeaway
Salesforce separates an unqualified Lead (flat record holding person + company text) from the qualified trio Account / Contact / Opportunity, created by lead conversion. Pricing is three tables (Product2, Pricebook2 + PricebookEntry, OpportunityLineItem). The Salesforce Object Reference pages could not be fetched this session (HTTP 403), so field-level detail below is partly from search summaries and partly well-known API names that should be checked against the reference before use.

### Cited Findings
- Lead conversion creates or links an Account and a Contact and optionally an Opportunity; standard Lead fields map automatically to standard Account/Contact/Opportunity fields, admins map custom fields; when merging into existing records only empty target fields are overwritten. (Search summary of the convertLead API doc) — [SF-CONVERT](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_calls_convertlead.htm)
- Unmapped custom Lead fields are not copied on conversion (vendor source, secondary). — [Xappex blog](https://www.xappex.com/blog/salesforce-lead-conversion-mapping/)
- AccountContactRelation fields: `Roles` multipicklist (Business User, Decision Maker, Economic Buyer, Economic Decision Maker, Evaluator, Executive Sponsor, Influencer, Technical Buyer, Other); `IsDirect` boolean = this account is the contact's primary account; `StartDate`/`EndDate` dates to keep a history of the relationship; `IsActive` boolean. Industry editions reuse some names with different meanings. (Search summary) — [SF-ACR](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_accountcontactrelation.htm)
- Opportunity reference page exists but was not readable (403). — [SF-OPP](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_opportunity.htm)

### Inferences
Standard field names below are from prior knowledge of the Salesforce API, not re-read this session. Treat as a checklist to verify, not as quoted fact.
- **Opportunity**: `Name, AccountId (lookup), Amount (currency), CloseDate (date, required), StageName (picklist, required), Probability (percent, defaults from stage), ForecastCategoryName (picklist: Omitted, Pipeline, Best Case, Commit, Closed; defaults from stage), ExpectedRevenue (read-only, Amount x Probability), Type, LeadSource, NextStep, Description, IsClosed and IsWon (read-only, derived from stage), OwnerId, CampaignId, Pricebook2Id, HasOpportunityLineItem (read-only), TotalOpportunityQuantity, FiscalQuarter/FiscalYear (derived), LastActivityDate (system), LastStageChangeDate, PushCount (system, times close date pushed out)`. When line items exist, Amount becomes the read-only sum of line totals.
- **OpportunityStage** (setup table) holds per-stage `DefaultProbability, ForecastCategory, IsClosed, IsWon` which is the same "stage table drives calculations" pattern as HubSpot.
- **OpportunityContactRole** (junction Opportunity x Contact): `OpportunityId, ContactId, Role (picklist, e.g. Decision Maker, Economic Buyer, Technical Buyer, Influencer, Evaluator, Executive Sponsor, Business User, Other), IsPrimary (boolean, one primary per opp)`.
- **Account**: `Name, ParentId (self lookup, account hierarchy), Type, Industry, AnnualRevenue, NumberOfEmployees, Website, Phone, BillingAddress, ShippingAddress, OwnerId, AccountSource, Rating, Description, LastActivityDate (system)`.
- **Contact**: `FirstName, LastName, AccountId (primary account), Email, Phone, MobilePhone, Title, Department, ReportsToId (self lookup, org chart), LeadSource, MailingAddress, OwnerId, HasOptedOutOfEmail, LastActivityDate (system)`.
- **Lead**: `FirstName, LastName, Company (text, required), Title, Email, Phone, Website, Industry, NumberOfEmployees, AnnualRevenue, Status (picklist), LeadSource, Rating, OwnerId, IsConverted, ConvertedDate, ConvertedAccountId, ConvertedContactId, ConvertedOpportunityId` (the Converted* fields are read-only after conversion; a converted lead becomes read-only).
- **Case**: `AccountId, ContactId, Subject, Description, Status, Priority, Origin, Type, Reason, OwnerId, IsClosed, ClosedDate, ParentId`.
- **Product2** (`Name, ProductCode, Description, Family, IsActive`), **Pricebook2** (`Name, IsStandard, IsActive`), **PricebookEntry** (junction Product2 x Pricebook2 with `UnitPrice, IsActive, UseStandardPrice`, plus CurrencyIsoCode in multi-currency orgs), **OpportunityLineItem** (`OpportunityId, PricebookEntryId, Product2Id, Quantity, UnitPrice, ListPrice (read-only from entry), Discount, TotalPrice, ServiceDate`), **Quote** (`OpportunityId, Name, Status, ExpirationDate, GrandTotal, Subtotal, Discount, Tax, ContactId, IsSyncing`) with **QuoteLineItem** mirroring opportunity line items; one quote per opportunity can be "syncing".
- For a small agency the pricebook layer is overkill: a single `product` (service catalogue) table plus `deal_line_item` with snapshotted price is enough. HubSpot's product + line item pattern is the better model.

### Gaps
- No Salesforce object reference page was readable this session (403 on WebFetch and on the JSON doc endpoint). All Salesforce field names in Inferences need checking against the current Object Reference (Winter '26/Spring '26 API ~v64-66).
- Did not confirm how OpportunityContactRole `IsPrimary` is set during lead conversion.

---

## 3. Associations: HubSpot types, labels, primary company, limits; Salesforce lookup vs master-detail and junctions; Attio and Twenty relation models; Pipedrive

### Takeaway
HubSpot treats every object-to-object link as a many-to-many association row with a direction and an optional label (type ID), plus a special "primary" label for company. Attio and Twenty instead use typed relation attributes (foreign keys with an inverse). For Postgres, the cleanest equivalent is a few real foreign keys for the one-true-parent links (deal.company_id, contact.primary_company_id) plus explicit junction tables carrying a role/label and start/end dates for the many-to-many links.

### Cited Findings
- HubSpot v4 associations have categories `HUBSPOT_DEFINED` (default labels such as Primary company) and `USER_DEFINED` (custom labels). A pair of records can be unlabeled or carry one or more labels. Labels are directional, e.g. contact-to-company primary uses a different typeId than the reverse. Replacing labels means sending only the new label; keeping requires sending both. — [HS-ASSOC](https://developers.hubspot.com/docs/api-reference/crm-associations-v4/guide)
- "If a record has more than one associated company, only one can be the primary company." Contact to primary company = typeId 1, contact to company (unlabeled) = 279, company to contact = 280. Deal to contact 3 / contact to deal 4; deal to company 341, deal to primary company 5. — [HS-ASSOC](https://developers.hubspot.com/docs/api-reference/crm-associations-v4/guide)
- Association limits depend on object and subscription, are configurable via the schema endpoints, and HubSpot flags records at 80% or more of their limit. API limits: 500,000 requests/day for Pro/Enterprise, burst 100 per 10 s (Free/Starter) or 150 per 10 s (Pro/Enterprise); batch read 1,000 inputs, batch create 2,000. — [HS-ASSOC](https://developers.hubspot.com/docs/api-reference/crm-associations-v4/guide)
- The fetched v4 page does not mention an `INTEGRATOR_DEFINED` category nor give fixed per-record maximums. — [HS-ASSOC](https://developers.hubspot.com/docs/api-reference/crm-associations-v4/guide)
- Attio People: `company` is a record reference to Company and the inverse of Company's `team` attribute; it is auto-created from the domain of the person's email address or set manually. `associated_deals` (inverse of Deal `associated_people`) and `associated_users` are two-way relationship attributes, so edits show on both sides. `email_addresses` is unique and multi-valued, `phone_numbers` multi-valued; also `name`, `job_title`, `description`, `primary_location`, and social handles (linkedin, twitter, etc.). — [ATTIO-PEOPLE](https://docs.attio.com/docs/standard-objects/standard-objects-people)
- Twenty Person: `name (FullName composite), emails (Emails composite: primary + additional), linkedinLink (Links), jobTitle, phones (Phones composite), avatarFile, position (manual sort), createdBy/updatedBy (Actor), company + companyId (single many-to-one), pointOfContactForOpportunities (one-to-many)`, plus polymorphic "target" junctions `taskTargets, noteTargets, calendarEventTargets, messageThreadTargets, attachments, timelineActivities, messageParticipants, calendarEventParticipants`. Deprecated: `phone` (use `phones`), `avatarUrl`. — [TWENTY person entity](https://github.com/twentyhq/twenty/blob/main/packages/twenty-server/src/modules/person/standard-objects/person.workspace-entity.ts)
- Twenty Company: `id, createdAt, updatedAt, deletedAt (soft delete), name, domainName (Links), linkedinLink, annualRevenue (Currency composite), address (Address composite; addressOld deprecated), accountOwner + accountOwnerId (workspace member), people (one-to-many), opportunities (one-to-many)`, plus the same task/note/message/calendar target junctions and timelineActivities. — [TWENTY company entity](https://github.com/twentyhq/twenty/blob/main/packages/twenty-server/src/modules/company/standard-objects/company.workspace-entity.ts)
- Twenty Opportunity: `name, amount (Currency), closeDate, stage (select), probability (deprecated per source comment), pointOfContact + pointOfContactId (single Person), company + companyId, owner + ownerId (workspace member)`, plus target junctions. — [TWENTY opportunity entity](https://github.com/twentyhq/twenty/blob/main/packages/twenty-server/src/modules/opportunity/standard-objects/opportunity.workspace-entity.ts)

### Inferences
- Twenty is the closest existing open-source Postgres design to what Astra needs: each standard object is one table, relations are plain FK columns (`companyId`, `pointOfContactId`, `ownerId`), and activities (tasks, notes, emails, calendar events) attach to any record via `*_target` junction tables with nullable FKs to person/company/opportunity. Composite types (Emails, Phones, Links, Currency as amountMicros + currencyCode, FullName, Address) are stored as multiple columns.
- Twenty keeps person-to-company as a single FK, so it has no native multi-company or employment history; Attio also has a single `company` reference on People. HubSpot (many companies, one primary) and Salesforce (AccountContactRelation) are richer here.
- Salesforce relationship kinds (prior knowledge, not re-fetched): lookup (optional FK, child survives parent delete), master-detail (required FK, cascade delete, child inherits sharing/owner, enables roll-up summary fields), many-to-many via a junction object with two master-detail fields. Postgres equivalents: `ON DELETE SET NULL` FK, `NOT NULL ... ON DELETE CASCADE` FK with materialised rollups, and a junction table.
- Pipedrive (prior knowledge, not verified this session): Person has a single `org_id`; Deal has `person_id`, `org_id`, `pipeline_id`, `stage_id`, `value`, `currency`, `status` (open/won/lost), `expected_close_date`, `probability`, `lost_reason`; Leads live in a separate Leads Inbox and convert to Deals; extra participants on a deal are a separate participants list. Simple model, worth noting as the "minimum viable" end.
- Recommended Postgres association design for Astra: `contact.primary_company_id` FK (fast default), `contact_company_role` junction (contact_id, company_id, role/label, is_primary, is_current, title, start_date, end_date, source), `deal_contact` junction (deal_id, contact_id, role label such as decision maker / billing contact / champion, is_primary), `deal.company_id` FK, and a generic `activity_target` table (activity_id, contact_id?, company_id?, deal_id?, lead_id?, project_id?) with a CHECK that at least one target is set. An `association_label` lookup table with `from_object, to_object, label, inverse_label` reproduces HubSpot's paired labels without a generic EAV association table.

### Gaps
- HubSpot's exact per-object association limits (e.g., max companies per contact, max labels per pair) are not on the v4 guide page; the product catalog page was not fetched.
- Attio Company and Deal standard attribute pages, and Attio's list/entry model, were not fetched. Attio interaction timestamps (first/last interaction, strongest connection) were not confirmed on the People page fetched.
- Pipedrive API reference not fetched this session.

---

## 4. How a contact relates to multiple organisations over time (job changes, former employees)

### Takeaway
Salesforce has the only first-class history model: AccountContactRelation rows with StartDate, EndDate, IsActive and Roles, where IsDirect marks the primary account. HubSpot approximates it with multiple company associations, one primary, and custom association labels (e.g., "Former employee"). Twenty and Attio store one current company per person.

### Cited Findings
- Salesforce AccountContactRelation: StartDate/EndDate are used together "to keep a history of the relationship"; IsActive marks current relationships; IsDirect = primary account; Roles multipicklist. (Search summary) — [SF-ACR](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_accountcontactrelation.htm)
- HubSpot: a contact can be associated with many companies but only one can be primary; custom USER_DEFINED labels can be put on contact-company associations. — [HS-ASSOC](https://developers.hubspot.com/docs/api-reference/crm-associations-v4/guide)
- HubSpot contact "Company name" text is independent of associations, so it can drift from the associated company after a job change. — [HS-CONTACT](https://knowledge.hubspot.com/properties/hubspots-default-contact-properties)
- Attio: People `company` is a single record reference, auto-set from email domain. — [ATTIO-PEOPLE](https://docs.attio.com/docs/standard-objects/standard-objects-people)
- Twenty: Person has a single nullable `companyId`. — [TWENTY person entity](https://github.com/twentyhq/twenty/blob/main/packages/twenty-server/src/modules/person/standard-objects/person.workspace-entity.ts)

### Inferences
- For Astra this matters concretely: the repo's own playbook records leads whose lemlist `companyName` was wrong because the person had sold or left the company ("Former Owner" tagline) or owned one business while holding a job at another. A `contact_company_role` table with `relationship_type` (owner, founder, employee, advisor, former_owner), `is_current`, `start_date`, `end_date`, `title`, `evidence_url`, `verified_at` would store that cleanly instead of overwriting a single company field.
- Keep the person record stable across job changes (key on LinkedIn URL / lemlist contactId, not email, since work email dies with the job), close the old relation (`end_date`, `is_current=false`), open a new one, and keep deals and activities pointing at the company they happened with.
- Emails should be a child table (`contact_email`: address, type work/personal, is_primary, bounced_at), mirroring Attio's multi-value emails and Twenty's primary + additional emails.

### Gaps
- Salesforce's "Contacts to Multiple Accounts" setting behaviour when a contact's primary AccountId changes (whether the old direct ACR becomes indirect) was not confirmed; the reference page was not readable.
- HubSpot's own job-change detection features were not researched.

---

## 5. Account management fields: account owner, account manager, customer success owner, health score, renewal date, tier

### Takeaway
Out of the box, CRMs give one owner per record plus a tier/ICP field; "account manager", "CSM", "health score" and "renewal date" are mostly custom fields or premium add-ons. In a custom build they are simple columns on company (or a separate account_team table if more than one person per role is needed).

### Cited Findings
- HubSpot company has a single Owner; additional users are assigned through custom HubSpot-user properties. Owner assigned date is system-set. — [HS-COMPANY](https://knowledge.hubspot.com/properties/hubspot-crm-default-company-properties)
- HubSpot tiering fields: Ideal Customer Profile Tier (Tier 1 closest), Target account (boolean), Type (prospect/partner/reseller/vendor/other). — [HS-COMPANY](https://knowledge.hubspot.com/properties/hubspot-crm-default-company-properties)
- Customer-value rollups on HubSpot company: Total revenue (closed deals), Recent deal amount, Close date (became customer). — [HS-COMPANY](https://knowledge.hubspot.com/properties/hubspot-crm-default-company-properties)
- Twenty company: single `accountOwner` (workspace member). — [TWENTY company entity](https://github.com/twentyhq/twenty/blob/main/packages/twenty-server/src/modules/company/standard-objects/company.workspace-entity.ts)
- Salesforce AccountContactRelation Roles include Executive Sponsor, Economic Buyer, Decision Maker etc., i.e. roles live on the relationship, not the person. (Search summary) — [SF-ACR](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_accountcontactrelation.htm)

### Inferences
- Salesforce's Account Teams (AccountTeamMember with TeamMemberRole such as Account Manager, Sales Rep) are the standard multi-owner model there (prior knowledge, not verified). For a few-user agency, columns `owner_user_id`, `account_manager_user_id`, `delivery_lead_user_id` on company are enough; an `account_team(company_id, user_id, role)` table is the scalable version.
- Suggested company account-management columns: `tier` (enum), `icp_fit` (enum or score), `relationship_type` (prospect, client, past_client, partner, vendor), `customer_since` (system, first won deal), `total_revenue` and `last_won_deal_amount` (derived), `health_score` (int 0-100) with `health_updated_at`, `renewal_date`/`retainer_end_date`, `mrr` (derived from active retainer line items), `last_activity_at` and `last_contacted_at` (derived from activities, following HubSpot's two distinct definitions).

### Gaps
- No primary source fetched for HubSpot Customer Success workspace health score or renewal properties (Service Hub), nor for Salesforce AccountTeamMember.

---

## 6. Project objects: HubSpot Projects object, Salesforce-adjacent options, typical project fields

### Takeaway
HubSpot now exposes Projects as a CRM object (`/crm/v3/objects/projects`) with a pipeline and stage like deals, owner, type, due date and associations to contacts, companies, deals and tasks. Salesforce has no core standard Project object (projects come from add-ons such as PSA products), so for an agency the HubSpot shape plus delivery fields is the template.

### Cited Findings
- HubSpot Projects default properties: `hs_name`, `hs_description`, `hs_status`, `hs_type` (sales, marketing, service, internal_ops; editable), `hs_target_due_date` (ISO 8601), `hubspot_owner_id`. Required on create: `hs_name`, `hs_pipeline`, `hs_pipeline_stage`. — [HS-PROJECTS](https://developers.hubspot.com/docs/api-reference/latest/crm/objects/projects/guide)
- Example associates a project to a task with HUBSPOT_DEFINED typeId 1246. A versioned path `/crm/objects/2026-03/projects` exists alongside v3. — [HS-PROJECTS](https://developers.hubspot.com/docs/api-reference/latest/crm/objects/projects/guide); path detail from search summary of [HubSpot 2026-03 projects guide](https://developers.hubspot.com/docs/api-reference/2026-03/crm/objects/projects/guide)
- Project association IDs: project to contact 1242, to company 1236, to primary company 1299, to deal 1238. — [HS-ASSOC](https://developers.hubspot.com/docs/api-reference/crm-associations-v4/guide)
- Scopes `crm.objects.projects.read/write`, `crm.schemas.projects.read`. (Search summary) — [HubSpot projects guide](https://developers.hubspot.com/docs/api-reference/latest/crm/objects/projects/guide)

### Inferences
- The HubSpot projects page did not list `hs_start_date`, budget or allowed `hs_status` values; for Astra, add: `start_date`, `due_date`, `completed_at`, `status` (not started / in progress / on hold / done / cancelled) separate from `stage`, `budget_amount` + `currency`, `pricing_model` (fixed, retainer, hourly), `hours_estimated`, `hours_logged` (derived), `deal_id` FK (the won deal it came from), `company_id` FK, `owner_user_id`, `delivery_lead_user_id`, `live_url` / `staging_url` / `repo_url` (e.g. the Netlify prototype URL already tracked in `state/prototypes.jsonl`), and `health` (green/amber/red).
- A prototype in Astra's process is effectively a pre-sale project tied to a lead or deal (promisedConcept, angleNumber, netlifyUrl, sentAt, outcome), so the project table can carry `kind` = prototype | delivery, with prototypes linked to a lead/deal and delivery projects linked to a won deal.
- Salesforce: project tracking normally uses a custom object or AppExchange PSA package (prior knowledge, not verified this session).

### Gaps
- HubSpot Projects KB page (status values, start date, templates, tier requirement, beta status) returned 404 at the URL tried; tier availability is unconfirmed.
- No Salesforce-adjacent project object source fetched.
