-- 002 Organizations, contacts, their emails, phones and dated roles, plus the
-- free mail and suppression lists. Dedup lives here, in unique indexes:
--   organization_domains.domain_normalised   unique (registrable domain, see lib/normalize.ts)
--   contact_emails lower(trim(email))        unique
--   contacts.linkedin_url_normalised         unique among live contacts

create table organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null check (length(trim(name)) > 0),
  industry text,
  org_type text not null default 'prospect'
    check (org_type in ('prospect', 'customer', 'partner', 'reseller', 'vendor', 'other')),
  -- Set by the system and forward only: lead, opportunity, customer. former is set by hand.
  lifecycle_stage text not null default 'lead'
    check (lifecycle_stage in ('lead', 'opportunity', 'customer', 'former')),
  relationship_status text not null default 'prospect'
    check (relationship_status in ('prospect', 'onboarding', 'active', 'retainer', 'dormant', 'churned', 'former')),
  owner_user_id uuid references users(id),
  account_manager_user_id uuid references users(id),
  parent_id uuid references organizations(id),
  employee_band text,                    -- 1-10, 11-50, 51-200, 201-500, 501+
  annual_revenue numeric(14,2),
  currency char(3) not null default 'EUR',
  linkedin_url text,
  address text,
  city text,
  country char(2),                       -- ISO 3166 alpha 2, for example NL
  time_zone text,
  icp_tier text check (icp_tier in ('A', 'B', 'C')),
  kvk_number text,
  vat_number text,
  health text check (health in ('on_track', 'at_risk', 'off_track')),
  renewal_date date,
  next_checkin_date date,
  checkin_cadence_days integer,
  source text,                           -- lemlist, referral, manual, import, seed
  description text,
  custom jsonb not null default '{}',
  deleted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index organizations_name_trgm on organizations using gin (name gin_trgm_ops);
create index organizations_owner_idx on organizations (owner_user_id);
create index organizations_am_idx on organizations (account_manager_user_id);
create index organizations_custom_gin on organizations using gin (custom jsonb_path_ops);
select crm_attach_triggers('organizations');

create table organization_domains (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  domain_normalised text not null unique
    check (domain_normalised ~ '^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$'),
  is_primary boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create unique index organization_domains_one_primary on organization_domains (organization_id) where is_primary;
create index organization_domains_org_idx on organization_domains (organization_id);
select crm_attach_triggers('organization_domains');

create table contacts (
  id uuid primary key default gen_random_uuid(),
  first_name text not null check (length(trim(first_name)) > 0),
  last_name text,
  full_name text generated always as (trim(first_name || ' ' || coalesce(last_name, ''))) stored,
  job_title text,
  tagline text,                          -- the LinkedIn headline, checked against the org on every lead
  linkedin_url text,
  linkedin_url_normalised text,          -- linkedin.com/in/<slug>, see normLinkedin()
  primary_org_id uuid references organizations(id),
  owner_user_id uuid references users(id),
  lifecycle_stage text not null default 'lead'
    check (lifecycle_stage in ('lead', 'opportunity', 'customer', 'former')),
  lawful_basis text default 'legitimate_interest'
    check (lawful_basis in ('legitimate_interest', 'consent', 'contract', 'none')),
  objected_at timestamptz,
  do_not_contact boolean not null default false,
  city text,
  country char(2),
  language text,
  linkedin_accepted_at timestamptz,
  source text,
  custom jsonb not null default '{}',
  deleted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (linkedin_url_normalised is null or linkedin_url_normalised ~ '^linkedin\.com/in/[^/]+$')
);
create unique index contacts_linkedin_uq on contacts (linkedin_url_normalised)
  where linkedin_url_normalised is not null and deleted_at is null;
create index contacts_name_trgm on contacts using gin (full_name gin_trgm_ops);
create index contacts_primary_org_idx on contacts (primary_org_id);
create index contacts_owner_idx on contacts (owner_user_id);
create index contacts_custom_gin on contacts using gin (custom jsonb_path_ops);
select crm_attach_triggers('contacts');

create table contact_emails (
  id uuid primary key default gen_random_uuid(),
  contact_id uuid not null references contacts(id) on delete cascade,
  email text not null check (position('@' in email) > 1),
  type text not null default 'work' check (type in ('work', 'personal', 'billing', 'other')),
  is_primary boolean not null default false,
  bounced_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create unique index contact_emails_norm_uq on contact_emails (lower(trim(email)));
create unique index contact_emails_one_primary on contact_emails (contact_id) where is_primary;
create index contact_emails_contact_idx on contact_emails (contact_id);
select crm_attach_triggers('contact_emails');

create table contact_phones (
  id uuid primary key default gen_random_uuid(),
  contact_id uuid not null references contacts(id) on delete cascade,
  phone text not null,
  phone_normalised text,                 -- digits with leading +, for matching
  type text not null default 'mobile' check (type in ('mobile', 'work', 'home', 'other')),
  is_primary boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create unique index contact_phones_one_primary on contact_phones (contact_id) where is_primary;
create index contact_phones_norm_idx on contact_phones (phone_normalised);
select crm_attach_triggers('contact_phones');

-- A person can sit at several organizations with dated roles. A job change ends
-- one row (is_current false, end_date) and opens another.
create table contact_org_roles (
  id uuid primary key default gen_random_uuid(),
  contact_id uuid not null references contacts(id) on delete cascade,
  organization_id uuid not null references organizations(id) on delete cascade,
  relationship text not null default 'employee'
    check (relationship in ('owner', 'founder', 'employee', 'advisor', 'former_owner', 'contractor', 'other')),
  buying_roles text[] not null default '{}', -- decision_maker, champion, billing_contact, influencer, user
  title text,
  is_primary boolean not null default false,
  is_current boolean not null default true,
  start_date date,
  end_date date,
  evidence_url text,
  verified_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (end_date is null or start_date is null or end_date >= start_date),
  check (not (is_primary and not is_current))
);
create unique index contact_org_roles_one_primary on contact_org_roles (contact_id) where is_primary and is_current;
create index contact_org_roles_org_idx on contact_org_roles (organization_id);
create index contact_org_roles_contact_idx on contact_org_roles (contact_id);
select crm_attach_triggers('contact_org_roles');

create table free_mail_domains (
  domain text primary key check (domain = lower(domain)),
  created_at timestamptz not null default now()
);
select crm_attach_triggers('free_mail_domains');

insert into free_mail_domains (domain) values
  ('gmail.com'), ('googlemail.com'), ('outlook.com'), ('hotmail.com'), ('hotmail.nl'), ('hotmail.co.uk'),
  ('hotmail.de'), ('hotmail.fr'), ('live.com'), ('live.nl'), ('live.co.uk'), ('msn.com'), ('yahoo.com'),
  ('yahoo.co.uk'), ('yahoo.de'), ('yahoo.fr'), ('ymail.com'), ('icloud.com'), ('me.com'), ('mac.com'),
  ('aol.com'), ('proton.me'), ('protonmail.com'), ('pm.me'), ('gmx.de'), ('gmx.net'), ('gmx.com'),
  ('web.de'), ('t-online.de'), ('freenet.de'), ('ziggo.nl'), ('kpnmail.nl'), ('planet.nl'), ('home.nl'),
  ('xs4all.nl'), ('telenet.be'), ('skynet.be'), ('orange.fr'), ('wanadoo.fr'), ('free.fr'), ('laposte.net'),
  ('sfr.fr'), ('libero.it'), ('virgilio.it'), ('btinternet.com'), ('sky.com'), ('mail.com'), ('zoho.com'),
  ('fastmail.com'), ('hey.com'), ('tutanota.com'), ('yandex.com'), ('qq.com'), ('163.com');

-- Anyone on this list is never contacted. kind says what value holds.
create table suppression_list (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('email', 'domain', 'linkedin', 'contact')),
  value text not null,                   -- normalised email, domain, linkedin.com/in/slug or contact id
  contact_id uuid references contacts(id) on delete set null,
  reason text,
  added_by uuid references users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (kind, value)
);
select crm_attach_triggers('suppression_list');
