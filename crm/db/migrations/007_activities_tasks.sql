-- 007 One activity table linked many to many, meetings, the outbound approval
-- queue, tasks, reminders and notifications. Write activities through
-- logActivity() and tasks through createTask() (lib/), they handle links.

create table activities (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in (
    'email', 'linkedin_message', 'linkedin_invite', 'linkedin_accept', 'call', 'meeting',
    'note', 'stage_change', 'artifact_sent', 'ticket', 'task', 'invoice', 'system')),
  direction text not null default 'internal' check (direction in ('outbound', 'inbound', 'internal')),
  occurred_at timestamptz not null default now(),
  actor_user_id uuid references users(id),
  title text not null,
  body text,
  meta jsonb not null default '{}',       -- tags, channel, campaign, thread ids, message counts
  source text not null default 'manual',  -- manual, lemlist, gmail, automation, system, import, seed
  external_id text,
  deleted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (source, external_id)
);
create index activities_occurred_idx on activities (occurred_at desc);
create index activities_kind_idx on activities (kind, occurred_at desc);
select crm_attach_triggers('activities');

create table activity_links (
  id uuid primary key default gen_random_uuid(),
  activity_id uuid not null references activities(id) on delete cascade,
  contact_id uuid references contacts(id) on delete cascade,
  organization_id uuid references organizations(id) on delete cascade,
  lead_id uuid references leads(id) on delete cascade,
  deal_id uuid references deals(id) on delete cascade,
  project_id uuid references projects(id) on delete cascade,
  ticket_id uuid references tickets(id) on delete cascade,
  invoice_id uuid references invoices(id) on delete cascade,
  is_primary boolean not null default false,
  created_at timestamptz not null default now(),
  check (num_nonnulls(contact_id, organization_id, lead_id, deal_id, project_id, ticket_id, invoice_id) = 1)
);
create unique index activity_links_contact_uq on activity_links (activity_id, contact_id) where contact_id is not null;
create unique index activity_links_org_uq on activity_links (activity_id, organization_id) where organization_id is not null;
create unique index activity_links_lead_uq on activity_links (activity_id, lead_id) where lead_id is not null;
create unique index activity_links_deal_uq on activity_links (activity_id, deal_id) where deal_id is not null;
create unique index activity_links_project_uq on activity_links (activity_id, project_id) where project_id is not null;
create unique index activity_links_ticket_uq on activity_links (activity_id, ticket_id) where ticket_id is not null;
create unique index activity_links_invoice_uq on activity_links (activity_id, invoice_id) where invoice_id is not null;
create index activity_links_contact_idx on activity_links (contact_id) where contact_id is not null;
create index activity_links_org_idx on activity_links (organization_id) where organization_id is not null;
create index activity_links_lead_idx on activity_links (lead_id) where lead_id is not null;
create index activity_links_deal_idx on activity_links (deal_id) where deal_id is not null;
create index activity_links_project_idx on activity_links (project_id) where project_id is not null;
create index activity_links_ticket_idx on activity_links (ticket_id) where ticket_id is not null;

create table meetings (
  id uuid primary key default gen_random_uuid(),
  activity_id uuid not null unique references activities(id) on delete cascade,
  meeting_type text check (meeting_type in ('discovery', 'prototype_review', 'proposal', 'kickoff', 'check_in', 'qbr', 'renewal', 'other')),
  outcome text not null default 'scheduled' check (outcome in ('scheduled', 'completed', 'rescheduled', 'no_show', 'canceled')),
  starts_at timestamptz,
  ends_at timestamptz,
  location text,
  calendar_event_id text,
  brief_path text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
select crm_attach_triggers('meetings');

-- Draft before send. Nothing in V1 sends, see SEND_ENABLED in SPEC.md.
create table outbound_messages (
  id uuid primary key default gen_random_uuid(),
  channel text not null check (channel in ('linkedin', 'email')),
  via text not null default 'lemlist' check (via in ('lemlist', 'gmail', 'manual')),
  kind text not null default 'opener' check (kind in ('opener', 'nudge', 'reply', 'artifact_delivery', 'other')),
  status text not null default 'draft' check (status in ('draft', 'awaiting_approval', 'approved', 'sent', 'rejected')),
  contact_id uuid references contacts(id),
  organization_id uuid references organizations(id),
  lead_id uuid references leads(id),
  deal_id uuid references deals(id),
  subject text,
  body text not null,
  thread_checked_at timestamptz,         -- when the thread was last pulled, shown as "Thread pulled 2 min ago"
  thread_message_count integer,          -- message count at that pull, a changed thread blocks approval
  created_by_user_id uuid references users(id),
  owner_user_id uuid references users(id),
  approved_by_user_id uuid references users(id),
  approved_at timestamptz,
  approval_text text,                    -- the approver's words, verbatim
  approved_body text,                    -- the exact text that was approved
  sent_at timestamptz,
  sent_activity_id uuid references activities(id),
  rejected_reason text,
  external_id text,
  custom jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (status not in ('approved', 'sent') or (approved_by_user_id is not null and approved_at is not null and approved_body is not null)),
  check (status <> 'sent' or sent_at is not null)
);
create index outbound_messages_status_idx on outbound_messages (status, created_at desc);
create index outbound_messages_contact_idx on outbound_messages (contact_id);
select crm_attach_triggers('outbound_messages');

create table tasks (
  id uuid primary key default gen_random_uuid(),
  title text not null check (length(trim(title)) > 0),
  body text,
  type text not null default 'todo' check (type in (
    'todo', 'call', 'email', 'linkedin', 'meeting', 'meeting_prep', 'approval', 'ticket',
    'invoice', 'checkin', 'renewal', 'research', 'send_artifact')),
  priority text not null default 'medium' check (priority in ('low', 'medium', 'high')),
  status text not null default 'not_started'
    check (status in ('not_started', 'in_progress', 'waiting', 'completed', 'cancelled')),
  due_at timestamptz,
  all_day boolean not null default false,
  owner_user_id uuid references users(id),  -- null means the unassigned queue
  recurrence_rule text,                  -- RRULE body, for example FREQ=MONTHLY;INTERVAL=3
  recurrence_parent_id uuid references tasks(id),
  remind_before_minutes integer,
  completed_at timestamptz,
  completed_by uuid references users(id),
  created_from text not null default 'manual'
    check (created_from in ('manual', 'automation', 'recurrence', 'stage_entry', 'import', 'sync', 'seed')),
  created_by uuid references users(id),
  custom jsonb not null default '{}',
  deleted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check ((status = 'completed') = (completed_at is not null))
);
create index tasks_owner_due_idx on tasks (owner_user_id, due_at) where deleted_at is null;
create index tasks_open_idx on tasks (due_at) where status not in ('completed', 'cancelled') and deleted_at is null;
select crm_attach_triggers('tasks');

create table task_links (
  id uuid primary key default gen_random_uuid(),
  task_id uuid not null references tasks(id) on delete cascade,
  contact_id uuid references contacts(id) on delete cascade,
  organization_id uuid references organizations(id) on delete cascade,
  lead_id uuid references leads(id) on delete cascade,
  deal_id uuid references deals(id) on delete cascade,
  project_id uuid references projects(id) on delete cascade,
  ticket_id uuid references tickets(id) on delete cascade,
  invoice_id uuid references invoices(id) on delete cascade,
  created_at timestamptz not null default now(),
  check (num_nonnulls(contact_id, organization_id, lead_id, deal_id, project_id, ticket_id, invoice_id) = 1)
);
create index task_links_task_idx on task_links (task_id);
create index task_links_contact_idx on task_links (contact_id) where contact_id is not null;
create index task_links_org_idx on task_links (organization_id) where organization_id is not null;
create index task_links_lead_idx on task_links (lead_id) where lead_id is not null;
create index task_links_deal_idx on task_links (deal_id) where deal_id is not null;
create index task_links_project_idx on task_links (project_id) where project_id is not null;
create index task_links_ticket_idx on task_links (ticket_id) where ticket_id is not null;
create index task_links_invoice_idx on task_links (invoice_id) where invoice_id is not null;
select crm_attach_triggers('task_links');

-- Polled by the worker. A reminder belongs to a task, or to any record via record_type and record_id.
create table reminders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  task_id uuid references tasks(id) on delete cascade,
  record_type text,                      -- organization, deal, invoice, ticket and so on
  record_id uuid,
  title text not null,
  body text,
  remind_at timestamptz not null,
  channel text not null default 'in_app' check (channel in ('in_app', 'email')),
  sent_at timestamptz,
  dismissed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index reminders_due_idx on reminders (remind_at) where sent_at is null and dismissed_at is null;
create index reminders_user_idx on reminders (user_id, remind_at);
select crm_attach_triggers('reminders');

create table notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  kind text not null,                    -- reminder, mention, assigned, approval, system
  title text not null,
  body text,
  url text,
  record_type text,
  record_id uuid,
  read_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index notifications_user_idx on notifications (user_id, created_at desc);
create index notifications_unread_idx on notifications (user_id) where read_at is null;
