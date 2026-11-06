-- 006 Products, quotes, invoices, line items and time entries.
-- Money is numeric(14,2) plus a currency. VAT is stored per line (tax_rate).

create table products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  sku text unique,
  description text,
  unit_price numeric(14,2) not null default 0,
  currency char(3) not null default 'EUR',
  tax_rate numeric(5,2) not null default 21.00,
  billing_frequency text not null default 'one_time'
    check (billing_frequency in ('one_time', 'monthly', 'quarterly', 'yearly')),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
select crm_attach_triggers('products');

create table quotes (
  id uuid primary key default gen_random_uuid(),
  deal_id uuid not null references deals(id) on delete cascade,
  number text unique,                    -- Q-2026-019
  version integer not null default 1,
  status text not null default 'draft' check (status in ('draft', 'sent', 'accepted', 'declined', 'expired')),
  currency char(3) not null default 'EUR',
  valid_until date,
  sent_at timestamptz,
  view_count integer not null default 0,
  accepted_at timestamptz,
  accepted_by_name text,
  pdf_hash text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index quotes_deal_idx on quotes (deal_id);
select crm_attach_triggers('quotes');

-- Numbers come from the accounting provider (Moneybird, V2). The CRM never mints one.
create table invoices (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id),
  contact_id uuid references contacts(id),     -- billing contact
  project_id uuid references projects(id),
  deal_id uuid references deals(id),
  title text,                                  -- "Website rebuild, deposit 50%"
  state text not null default 'draft' check (state in ('draft', 'open', 'paid', 'late', 'void')),
  external_system text,                        -- moneybird
  external_id text,
  external_number text,                        -- AST-2026-041, assigned by the provider
  issue_date date,
  due_date date,
  paid_at timestamptz,
  vat_treatment text not null default 'nl_21'
    check (vat_treatment in ('nl_21', 'reverse_charge', 'export', 'outside_scope')),
  currency char(3) not null default 'EUR',
  subtotal numeric(14,2),                      -- mirrored totals, lines are the source when present
  vat_amount numeric(14,2),
  total numeric(14,2),
  notes text,
  custom jsonb not null default '{}',
  deleted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create unique index invoices_external_number_uq on invoices (external_number) where external_number is not null;
create unique index invoices_external_uq on invoices (external_system, external_id) where external_id is not null;
create index invoices_org_idx on invoices (organization_id);
select crm_attach_triggers('invoices');

-- Exactly one parent: a deal, a quote or an invoice. Name and price are snapshots.
create table line_items (
  id uuid primary key default gen_random_uuid(),
  deal_id uuid references deals(id) on delete cascade,
  quote_id uuid references quotes(id) on delete cascade,
  invoice_id uuid references invoices(id) on delete cascade,
  product_id uuid references products(id),
  name text not null,
  description text,
  quantity numeric(12,2) not null default 1,
  unit_price numeric(14,2) not null default 0,
  discount_pct numeric(5,2) not null default 0 check (discount_pct between 0 and 100),
  tax_rate numeric(5,2) not null default 21.00,
  currency char(3) not null default 'EUR',
  billing_frequency text not null default 'one_time'
    check (billing_frequency in ('one_time', 'monthly', 'quarterly', 'yearly')),
  term_months integer,
  position integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (num_nonnulls(deal_id, quote_id, invoice_id) = 1)
);
create index line_items_deal_idx on line_items (deal_id);
create index line_items_quote_idx on line_items (quote_id);
create index line_items_invoice_idx on line_items (invoice_id);
select crm_attach_triggers('line_items');

create table time_entries (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  user_id uuid not null references users(id),
  work_date date not null,
  minutes integer not null check (minutes > 0),
  description text,
  billable boolean not null default true,
  invoice_line_id uuid references line_items(id) on delete set null, -- null and billable means unbilled
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index time_entries_project_idx on time_entries (project_id, work_date);
select crm_attach_triggers('time_entries');
