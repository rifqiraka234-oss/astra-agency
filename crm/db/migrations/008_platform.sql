-- 008 Platform: custom fields, saved views, the domain event outbox, automations,
-- external ids and sync cursors, inbound webhooks, imports, merges.

create table field_groups (
  id uuid primary key default gen_random_uuid(),
  object_type text not null check (object_type in ('organization', 'contact', 'lead', 'deal', 'project', 'ticket', 'invoice', 'task')),
  name text not null,
  position integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (object_type, name)
);
select crm_attach_triggers('field_groups');

create table field_definitions (
  id uuid primary key default gen_random_uuid(),
  object_type text not null check (object_type in ('organization', 'contact', 'lead', 'deal', 'project', 'ticket', 'invoice', 'task')),
  internal_name text not null check (internal_name ~ '^[a-z][a-z0-9_]{0,62}$'),
  label text not null,
  group_id uuid references field_groups(id) on delete set null,
  field_type text not null check (field_type in (
    'text', 'textarea', 'number', 'currency', 'percent', 'date', 'datetime', 'select', 'multiselect',
    'checkbox', 'user', 'email', 'phone', 'url', 'file', 'calculation', 'rollup', 'record_link')),
  options jsonb,                         -- select and multiselect, an array of {value, label}
  validation jsonb,                      -- {min, max, pattern, maxLength}
  config jsonb,                          -- calculation, rollup and record_link settings
  help_text text,
  is_required boolean not null default false,
  is_unique boolean not null default false,
  is_sensitive boolean not null default false,
  default_value jsonb,
  position integer not null default 0,
  archived_at timestamptz,
  created_by uuid references users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (object_type, internal_name)
);
select crm_attach_triggers('field_definitions');

-- internal_name, object_type and field_type cannot change after creation.
create or replace function field_definitions_immutable() returns trigger language plpgsql as $$
begin
  if new.internal_name <> old.internal_name or new.object_type <> old.object_type or new.field_type <> old.field_type then
    raise exception 'internal_name, object_type and field_type of a field cannot change';
  end if;
  return new;
end $$;
create trigger field_definitions_immutable before update on field_definitions
  for each row execute function field_definitions_immutable();

create table saved_views (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade, -- null means shared with everyone
  object_type text not null,
  name text not null,
  filters jsonb not null default '{}',
  columns jsonb not null default '[]',
  sort jsonb,
  is_default boolean not null default false,
  position integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
select crm_attach_triggers('saved_views');

-- The outbox. Written by emit() in lib/events.ts in the same transaction as the change.
create table domain_events (
  id bigserial primary key,
  type text not null,                    -- deal.stage_changed, deal.won, lead.replied, ...
  aggregate_type text,
  aggregate_id uuid,
  payload jsonb not null default '{}',
  actor_user_id uuid,
  occurred_at timestamptz not null default now(),
  processed_at timestamptz,
  attempts integer not null default 0,
  last_error text,
  next_attempt_at timestamptz
);
create index domain_events_pending_idx on domain_events (id) where processed_at is null;
create index domain_events_type_idx on domain_events (type, occurred_at desc);

create table automation_rules (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  name text not null,
  description text,
  trigger_type text not null check (trigger_type in ('event', 'schedule')),
  trigger_event text,                    -- for event rules, the domain event type
  schedule text,                         -- for schedule rules, cron or RRULE text
  steps jsonb not null default '[]',     -- [["When"|"If"|"Then"|"Wait", text], ...] for display
  config jsonb not null default '{}',
  is_enabled boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
select crm_attach_triggers('automation_rules');

insert into automation_rules (key, name, trigger_type, trigger_event, schedule, is_enabled, steps) values
  ('deal_won_start_delivery', 'Deal won, start delivery', 'event', 'deal.won', null, true,
   '[["When","A deal in Sales moves to Won"],["Then","Create a project from the matching template, budget from the deal amount"],["Then","Draft a 50% deposit invoice, billing contact from the organization"],["Then","Set lifecycle to Customer and give Josh a kickoff task, due in 2 working days"]]'),
  ('lead_reply_move', 'LinkedIn reply, move the lead', 'event', 'lead.replied', null, true,
   '[["When","lemlist reports a LinkedIn reply and the thread pull confirms it"],["If","The lead is in Attempting"],["Then","Move it to Connected and log the reply on the timeline"],["Then","Task for the owner, reply today, priority High"]]'),
  ('deal_no_next_step', 'No next step on an open deal', 'schedule', null, 'FREQ=DAILY;BYHOUR=8;BYMINUTE=0', true,
   '[["When","Every morning at 08:00"],["If","An open deal has no open task, or it passed the stage rotting limit"],["Then","Task for the deal owner, plan the next step"],["Then","Flag the card red on the board"]]'),
  ('quarterly_checkin', 'Quarterly check in', 'schedule', null, 'FREQ=MONTHLY;INTERVAL=3;BYDAY=1MO', true,
   '[["When","First Monday of every quarter"],["If","Organization lifecycle is Customer"],["Then","Check in task for the account manager, linked to the organization and its open project"],["Then","Reminder 1 day before"]]'),
  ('invoice_late', 'Invoice late', 'event', 'invoice.late', null, true,
   '[["When","An invoice is marked late"],["Wait","2 days"],["If","Still not paid"],["Then","Task for the account manager and a note on the organization"]]'),
  ('portal_ticket_in', 'Portal ticket in', 'event', 'ticket.created', null, false,
   '[["When","A client opens a ticket in the portal"],["Then","Assign to the account manager and start the SLA clock for its priority"],["Then","Confirm receipt to the client, after approval"]]');

create table automation_runs (
  id uuid primary key default gen_random_uuid(),
  rule_id uuid not null references automation_rules(id) on delete cascade,
  event_id bigint references domain_events(id),
  run_key text,                          -- idempotency for schedule runs, for example 2026-11-06:deal:<id>
  status text not null check (status in ('success', 'skipped', 'failed')),
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  changes jsonb not null default '[]',
  error text,
  created_at timestamptz not null default now()
);
create unique index automation_runs_event_uq on automation_runs (rule_id, event_id) where event_id is not null;
create unique index automation_runs_key_uq on automation_runs (rule_id, run_key) where run_key is not null;
create index automation_runs_rule_idx on automation_runs (rule_id, started_at desc);

create table external_ids (
  id uuid primary key default gen_random_uuid(),
  entity_type text not null,
  entity_id uuid not null,
  system text not null,                  -- lemlist_contact, lemlist_lead, gmail_thread, moneybird_invoice, kvk
  external_id text not null,
  external_url text,
  synced_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (system, external_id),
  unique (entity_type, entity_id, system)
);
select crm_attach_triggers('external_ids');

create table sync_cursors (
  connector text not null,               -- lemlist, gmail, moneybird
  account text not null,
  stream text not null,
  cursor jsonb not null default '{}',
  last_success_at timestamptz,
  last_error text,
  last_error_at timestamptz,
  backoff_until timestamptz,
  updated_at timestamptz not null default now(),
  primary key (connector, account, stream)
);
create trigger sync_cursors_set_updated_at before update on sync_cursors
  for each row execute function set_updated_at();

create table inbound_events (
  id bigserial primary key,
  source text not null,
  external_event_id text not null,
  payload jsonb not null,
  received_at timestamptz not null default now(),
  processed_at timestamptz,
  error text,
  unique (source, external_event_id)
);

create table import_jobs (
  id uuid primary key default gen_random_uuid(),
  object_type text not null,
  file_name text not null,
  mapping jsonb not null default '{}',
  match_key text,                        -- email, domain, id, none
  mode text not null default 'upsert' check (mode in ('create', 'update', 'upsert')),
  blank_handling text not null default 'keep' check (blank_handling in ('keep', 'clear')),
  status text not null default 'draft' check (status in ('draft', 'previewed', 'running', 'completed', 'failed', 'reverted')),
  counts jsonb not null default '{}',    -- {rows, created, updated, skipped, errors}
  created_by uuid references users(id),
  started_at timestamptz,
  finished_at timestamptz,
  reverted_at timestamptz,
  reverted_by uuid references users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
select crm_attach_triggers('import_jobs');

create table import_rows (
  id uuid primary key default gen_random_uuid(),
  import_job_id uuid not null references import_jobs(id) on delete cascade,
  row_number integer not null,
  raw jsonb not null,
  status text not null check (status in ('pending', 'created', 'updated', 'skipped', 'error', 'reverted')),
  error text,
  entity_type text,
  entity_id uuid,
  before jsonb,                          -- the changed columns before the import, for revert
  created_at timestamptz not null default now()
);
create index import_rows_job_idx on import_rows (import_job_id, row_number);

create table merge_log (
  id uuid primary key default gen_random_uuid(),
  object_type text not null,
  winner_id uuid not null,
  loser_id uuid not null,
  snapshot jsonb not null,               -- the full losing record and its child rows before the merge
  moved jsonb not null default '{}',     -- which rows were repointed, for undo
  merged_by uuid references users(id),
  merged_at timestamptz not null default now(),
  undone_at timestamptz,
  undone_by uuid references users(id)
);
create index merge_log_winner_idx on merge_log (object_type, winner_id);

create table duplicate_pairs_rejected (
  id uuid primary key default gen_random_uuid(),
  object_type text not null,
  a_id uuid not null,
  b_id uuid not null,
  rejected_by uuid references users(id),
  created_at timestamptz not null default now()
);
create unique index duplicate_pairs_rejected_uq
  on duplicate_pairs_rejected (object_type, least(a_id, b_id), greatest(a_id, b_id));
