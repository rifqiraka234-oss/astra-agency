-- 003 Pipelines, stages, required fields per stage, and the append only stage history.
-- Stage keys are stable identifiers code can rely on (pipeline key + stage key).

create table pipelines (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,              -- lead, sales, existing, delivery, tickets
  object_type text not null check (object_type in ('lead', 'deal', 'project', 'ticket')),
  name text not null,
  description text,
  is_default boolean not null default false,
  position integer not null default 0,
  archived_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create unique index pipelines_one_default on pipelines (object_type) where is_default;
select crm_attach_triggers('pipelines');

create table pipeline_stages (
  id uuid primary key default gen_random_uuid(),
  pipeline_id uuid not null references pipelines(id) on delete cascade,
  key text not null,
  name text not null,
  position integer not null,
  probability smallint check (probability between 0 and 100), -- null where it means nothing (leads, projects, tickets)
  -- open, won, lost. Projects and tickets use closed for their final stage.
  state text not null default 'open' check (state in ('open', 'won', 'lost', 'closed')),
  rot_days integer check (rot_days > 0),
  pauses_sla boolean not null default false,
  description text,
  archived_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (pipeline_id, key)
);
create index pipeline_stages_pipeline_idx on pipeline_stages (pipeline_id, position);
select crm_attach_triggers('pipeline_stages');

-- Fields that must have a value before a record may enter the stage.
-- field_key is a column on the record's table, or a key in its custom jsonb.
create table stage_required_fields (
  id uuid primary key default gen_random_uuid(),
  stage_id uuid not null references pipeline_stages(id) on delete cascade,
  field_key text not null,
  label text not null,
  input_type text not null default 'text'
    check (input_type in ('text', 'textarea', 'number', 'money', 'date', 'datetime', 'url', 'select', 'user', 'contact')),
  options jsonb,                         -- for select, an array of {value, label}
  position integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (stage_id, field_key)
);
select crm_attach_triggers('stage_required_fields');

create table stage_transitions (
  id bigserial primary key,
  object_type text not null check (object_type in ('lead', 'deal', 'project', 'ticket')),
  record_id uuid not null,
  pipeline_id uuid references pipelines(id),
  from_stage_id uuid references pipeline_stages(id),
  to_stage_id uuid not null references pipeline_stages(id),
  amount numeric(14,2),                  -- deal snapshot at the move
  currency char(3),
  close_date date,
  probability smallint,
  actor_type text not null default 'user' check (actor_type in ('user', 'automation', 'system', 'import', 'sync')),
  actor_id text,
  source text,
  reason text,                           -- required when moving back
  changed_at timestamptz not null default now()
);
create index stage_transitions_record_idx on stage_transitions (object_type, record_id, changed_at desc);
create index stage_transitions_to_idx on stage_transitions (to_stage_id, changed_at desc);

-- Seed the five pipelines (report "Stage tables drive probability", Settings design).
insert into pipelines (key, object_type, name, description, is_default, position) values
  ('lead', 'lead', 'Lead pipeline', 'From LinkedIn accept to a qualified deal', true, 0),
  ('sales', 'deal', 'Sales pipeline', 'New business', true, 1),
  ('existing', 'deal', 'Existing business', 'Upsell, renewal and expansion for customers', false, 2),
  ('delivery', 'project', 'Project delivery', 'Delivery work after a won deal', true, 3),
  ('tickets', 'ticket', 'Tickets', 'Support requests from clients', true, 4);

insert into pipeline_stages (pipeline_id, key, name, position, probability, state, rot_days, pauses_sla, description)
select p.id, s.key, s.name, s.position, s.probability, s.state, s.rot_days, s.pauses_sla, s.description
from pipelines p
join (values
  ('lead', 'new', 'New', 0, null::smallint, 'open', null::int, false, 'Imported or accepted on LinkedIn, not yet researched'),
  ('lead', 'researching', 'Researching', 1, null, 'open', 7, false, 'Research gate and opener draft'),
  ('lead', 'attempting', 'Attempting', 2, null, 'open', 14, false, 'Opener sent, waiting on a reply'),
  ('lead', 'connected', 'Connected', 3, null, 'open', 5, false, 'Real reply received'),
  ('lead', 'qualified', 'Qualified', 4, null, 'won', null, false, 'Meeting or prototype yes, creates a deal'),
  ('lead', 'disqualified', 'Disqualified', 5, null, 'lost', null, false, 'Not a fit, with a reason'),

  ('sales', 'discovery_booked', 'Discovery booked', 0, 15, 'open', 7, false, null),
  ('sales', 'prototype_agreed', 'Prototype agreed', 1, 30, 'open', 10, false, null),
  ('sales', 'prototype_sent', 'Prototype sent', 2, 40, 'open', 14, false, null),
  ('sales', 'proposal_sent', 'Proposal sent', 3, 60, 'open', 10, false, null),
  ('sales', 'negotiation', 'Negotiation', 4, 75, 'open', 10, false, null),
  ('sales', 'contract_sent', 'Contract sent', 5, 90, 'open', 7, false, null),
  ('sales', 'won', 'Won', 6, 100, 'won', null, false, null),
  ('sales', 'lost', 'Lost', 7, 0, 'lost', null, false, null),

  ('existing', 'opportunity_spotted', 'Opportunity spotted', 0, 20, 'open', 14, false, null),
  ('existing', 'proposal_sent', 'Proposal sent', 1, 60, 'open', 10, false, null),
  ('existing', 'contract_sent', 'Contract sent', 2, 90, 'open', 7, false, null),
  ('existing', 'won', 'Won', 3, 100, 'won', null, false, null),
  ('existing', 'lost', 'Lost', 4, 0, 'lost', null, false, null),

  ('delivery', 'kickoff', 'Kickoff', 0, null, 'open', null, false, null),
  ('delivery', 'design', 'Design', 1, null, 'open', null, false, null),
  ('delivery', 'build', 'Build', 2, null, 'open', null, false, null),
  ('delivery', 'review_qa', 'Review and QA', 3, null, 'open', null, false, null),
  ('delivery', 'launched', 'Launched', 4, null, 'open', null, false, null),
  ('delivery', 'closed', 'Closed', 5, null, 'closed', null, false, null),

  ('tickets', 'new', 'New', 0, null, 'open', null, false, null),
  ('tickets', 'waiting_on_us', 'Waiting on us', 1, null, 'open', null, false, null),
  ('tickets', 'waiting_on_client', 'Waiting on client', 2, null, 'open', null, true, 'Pauses the SLA clock'),
  ('tickets', 'closed', 'Closed', 3, null, 'closed', null, false, null)
) as s(pipeline_key, key, name, position, probability, state, rot_days, pauses_sla, description)
  on s.pipeline_key = p.key;

-- Required to enter, as the Settings design lists them.
insert into stage_required_fields (stage_id, field_key, label, input_type, options, position)
select st.id, r.field_key, r.label, r.input_type, r.options::jsonb, r.position
from pipeline_stages st
join pipelines p on p.id = st.pipeline_id
join (values
  ('sales', 'discovery_booked', 'meeting_at', 'Meeting date', 'datetime', null, 0),
  ('sales', 'prototype_agreed', 'build_card_url', 'Build card link', 'url', null, 0),
  ('sales', 'prototype_sent', 'prototype_url', 'Prototype URL', 'url', null, 0),
  ('sales', 'proposal_sent', 'amount', 'Amount', 'money', null, 0),
  ('sales', 'proposal_sent', 'quote_ref', 'Quote', 'text', null, 1),
  ('sales', 'negotiation', 'next_step', 'Next step', 'text', null, 0),
  ('sales', 'negotiation', 'decision_date', 'Decision date', 'date', null, 1),
  ('sales', 'contract_sent', 'signer', 'Signer', 'text', null, 0),
  ('sales', 'won', 'won_reason', 'Won reason', 'text', null, 0),
  ('sales', 'won', 'start_date', 'Start date', 'date', null, 1),
  ('sales', 'lost', 'lost_reason', 'Lost reason', 'select',
    '[{"value":"cheaper","label":"Went with someone cheaper"},{"value":"not_now","label":"Not now"},{"value":"in_house","label":"Built it in house"},{"value":"no_budget","label":"No budget"},{"value":"no_response","label":"Went quiet"},{"value":"other","label":"Other"}]', 0),
  ('existing', 'proposal_sent', 'amount', 'Amount', 'money', null, 0),
  ('existing', 'won', 'won_reason', 'Won reason', 'text', null, 0),
  ('existing', 'lost', 'lost_reason', 'Lost reason', 'select',
    '[{"value":"cheaper","label":"Went with someone cheaper"},{"value":"not_now","label":"Not now"},{"value":"in_house","label":"Built it in house"},{"value":"no_budget","label":"No budget"},{"value":"no_response","label":"Went quiet"},{"value":"other","label":"Other"}]', 0),
  ('lead', 'disqualified', 'disqualify_reason', 'Disqualify reason', 'select',
    '[{"value":"no_strong_angle","label":"No strong angle"},{"value":"blocked_needs_info","label":"Blocked, needs info"},{"value":"do_not_contact","label":"Do not contact"},{"value":"not_icp","label":"Not a fit"},{"value":"former_owner","label":"Former owner"},{"value":"wrong_company","label":"Wrong company"}]', 0)
) as r(pipeline_key, stage_key, field_key, label, input_type, options, position)
  on r.pipeline_key = p.key and r.stage_key = st.key;
