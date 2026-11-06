-- 005 Projects, milestones, SLA policies, tickets and the ticket status log.

create table projects (
  id uuid primary key default gen_random_uuid(),
  name text not null check (length(trim(name)) > 0),
  kind text not null default 'delivery' check (kind in ('prototype', 'delivery', 'retainer')),
  organization_id uuid references organizations(id),
  deal_id uuid references deals(id),
  lead_id uuid references leads(id),
  pipeline_id uuid references pipelines(id),
  stage_id uuid references pipeline_stages(id),
  status text not null default 'active' check (status in ('active', 'on_hold', 'cancelled', 'completed')),
  health text not null default 'on_track' check (health in ('on_track', 'at_risk', 'off_track')),
  owner_user_id uuid references users(id),  -- project lead
  start_date date,
  due_date date,
  budget_amount numeric(14,2),
  currency char(3) not null default 'EUR',
  budget_hours numeric(8,2),
  live_url text,
  repo_url text,
  description text,
  custom jsonb not null default '{}',
  deleted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index projects_org_idx on projects (organization_id);
create index projects_deal_idx on projects (deal_id);
create trigger projects_stage_check before insert or update of stage_id, pipeline_id on projects
  for each row execute function check_stage_in_pipeline();
select crm_attach_triggers('projects');

create table project_milestones (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  name text not null,
  due_date date,
  completed_at timestamptz,
  amount numeric(14,2),                  -- billing trigger on fixed price work
  currency char(3) not null default 'EUR',
  position integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index project_milestones_project_idx on project_milestones (project_id, position);
select crm_attach_triggers('project_milestones');

-- SLA targets in business minutes. business_hours applies to every policy for now.
create table sla_policies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  priority text not null check (priority in ('low', 'medium', 'high', 'urgent')),
  first_reply_minutes integer not null,
  resolve_minutes integer not null,
  business_hours jsonb not null default '{"tz":"Europe/Amsterdam","days":[1,2,3,4,5],"start":"09:00","end":"17:30"}',
  is_default boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create unique index sla_policies_default_priority on sla_policies (priority) where is_default;
select crm_attach_triggers('sla_policies');

insert into sla_policies (name, priority, first_reply_minutes, resolve_minutes) values
  ('Standard, urgent', 'urgent', 60, 480),
  ('Standard, high', 'high', 240, 1020),
  ('Standard, medium', 'medium', 480, 2550),
  ('Standard, low', 'low', 960, 5100);

create sequence ticket_number_seq start 100;

create table tickets (
  id uuid primary key default gen_random_uuid(),
  number integer not null unique default nextval('ticket_number_seq'),
  subject text not null check (length(trim(subject)) > 0),
  description text,
  organization_id uuid references organizations(id),
  contact_id uuid references contacts(id),
  project_id uuid references projects(id),
  pipeline_id uuid not null references pipelines(id),
  stage_id uuid not null references pipeline_stages(id),
  priority text not null default 'medium' check (priority in ('low', 'medium', 'high', 'urgent')),
  category text,
  source text not null default 'manual' check (source in ('portal', 'email', 'manual', 'phone')),
  owner_user_id uuid references users(id),
  sla_policy_id uuid references sla_policies(id),
  opened_at timestamptz not null default now(),
  first_replied_at timestamptz,
  closed_at timestamptz,
  custom jsonb not null default '{}',
  deleted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter sequence ticket_number_seq owned by tickets.number;
create index tickets_org_idx on tickets (organization_id);
create index tickets_stage_idx on tickets (pipeline_id, stage_id);
create trigger tickets_stage_check before insert or update of stage_id, pipeline_id on tickets
  for each row execute function check_stage_in_pipeline();
select crm_attach_triggers('tickets');

-- Every status change. SLA timings are computed from this log, never stored.
create table ticket_status_events (
  id bigserial primary key,
  ticket_id uuid not null references tickets(id) on delete cascade,
  from_stage_id uuid references pipeline_stages(id),
  to_stage_id uuid not null references pipeline_stages(id),
  pauses_sla boolean not null default false,
  actor_user_id uuid references users(id),
  changed_at timestamptz not null default now()
);
create index ticket_status_events_ticket_idx on ticket_status_events (ticket_id, changed_at);
