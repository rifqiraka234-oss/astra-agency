-- 004 Leads and deals. Never move stage_id directly from feature code, use
-- moveStage() in lib/stages.ts so required fields, history and events happen.

-- A record's stage must belong to its pipeline (shared by leads, deals, projects, tickets).
create or replace function check_stage_in_pipeline() returns trigger language plpgsql as $$
declare
  v_row jsonb := to_jsonb(new);
  v_stage uuid := (v_row ->> 'stage_id')::uuid;
  v_pipeline uuid := (v_row ->> 'pipeline_id')::uuid;
begin
  if v_stage is null then
    return new;
  end if;
  if not exists (select 1 from pipeline_stages where id = v_stage and pipeline_id = v_pipeline) then
    raise exception 'stage % is not in pipeline % on %', v_stage, v_pipeline, tg_table_name
      using errcode = 'check_violation';
  end if;
  return new;
end $$;

create table leads (
  id uuid primary key default gen_random_uuid(),
  name text,                             -- optional label, the UI falls back to contact and org names
  contact_id uuid references contacts(id),
  organization_id uuid references organizations(id),
  pipeline_id uuid not null references pipelines(id),
  stage_id uuid not null references pipeline_stages(id),
  owner_user_id uuid references users(id),
  label text check (label in ('hot', 'warm', 'cold')),
  source text,                           -- lemlist, referral, inbound, manual, import, seed
  campaign text,                         -- for lemlist, the campaign name
  research_status text not null default 'unresearched'
    check (research_status in ('unresearched', 'researching', 'drafted', 'awaiting_approval', 'sent')),
  disqualify_reason text
    check (disqualify_reason in ('no_strong_angle', 'blocked_needs_info', 'do_not_contact', 'not_icp', 'former_owner', 'wrong_company')),
  angle text,
  angle_worth_eur numeric(14,2),
  status_note text,                      -- the short chip on the board card, for example "Our turn"
  next_step text,
  auto_progress_enabled boolean not null default true,
  linkedin_accepted_at timestamptz,
  opener_sent_at timestamptz,
  qualified_at timestamptz,
  disqualified_at timestamptz,
  converted_deal_id uuid,                -- fk added after deals exists
  custom jsonb not null default '{}',
  deleted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index leads_stage_idx on leads (pipeline_id, stage_id) where deleted_at is null;
create index leads_owner_idx on leads (owner_user_id);
create index leads_contact_idx on leads (contact_id);
create index leads_org_idx on leads (organization_id);
create index leads_custom_gin on leads using gin (custom jsonb_path_ops);
create trigger leads_stage_check before insert or update of stage_id, pipeline_id on leads
  for each row execute function check_stage_in_pipeline();
select crm_attach_triggers('leads');

create table deals (
  id uuid primary key default gen_random_uuid(),
  name text not null check (length(trim(name)) > 0),
  organization_id uuid references organizations(id),
  lead_id uuid references leads(id),
  pipeline_id uuid not null references pipelines(id),
  stage_id uuid not null references pipeline_stages(id),
  owner_user_id uuid references users(id),
  amount numeric(14,2) check (amount is null or amount >= 0),
  currency char(3) not null default 'EUR',
  close_date date,
  deal_type text not null default 'new_business'
    check (deal_type in ('new_business', 'upsell', 'renewal', 'expansion')),
  priority text check (priority in ('low', 'medium', 'high')),
  forecast_category text check (forecast_category in ('pipeline', 'best_case', 'commit', 'closed', 'omitted')),
  forecast_probability smallint check (forecast_probability between 0 and 100), -- override, else the stage's
  pricing_model text check (pricing_model in ('fixed', 'retainer', 'hourly')),
  next_step text,
  angle text,
  source text,
  -- Stage gate fields (see stage_required_fields).
  meeting_at timestamptz,
  build_card_url text,
  prototype_url text,
  quote_ref text,
  decision_date date,
  signer text,
  start_date date,
  won_reason text,
  lost_reason text,
  lost_competitor text,
  won_at timestamptz,
  lost_at timestamptz,
  custom jsonb not null default '{}',
  deleted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index deals_stage_idx on deals (pipeline_id, stage_id) where deleted_at is null;
create index deals_org_idx on deals (organization_id);
create index deals_owner_idx on deals (owner_user_id);
create index deals_name_trgm on deals using gin (name gin_trgm_ops);
create index deals_custom_gin on deals using gin (custom jsonb_path_ops);
create trigger deals_stage_check before insert or update of stage_id, pipeline_id on deals
  for each row execute function check_stage_in_pipeline();
select crm_attach_triggers('deals');

alter table leads add constraint leads_converted_deal_fk foreign key (converted_deal_id) references deals(id);

create table deal_contacts (
  id uuid primary key default gen_random_uuid(),
  deal_id uuid not null references deals(id) on delete cascade,
  contact_id uuid not null references contacts(id) on delete cascade,
  role text not null default 'influencer'
    check (role in ('decision_maker', 'champion', 'billing_contact', 'influencer', 'user', 'signer', 'other')),
  role_note text,                        -- free text, for example "day to day user"
  is_primary boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (deal_id, contact_id)
);
create unique index deal_contacts_one_primary on deal_contacts (deal_id) where is_primary;
create index deal_contacts_contact_idx on deal_contacts (contact_id);
select crm_attach_triggers('deal_contacts');
