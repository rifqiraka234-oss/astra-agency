-- 500 Agent E. Built in automation rules, worker bookkeeping, lemlist sync and API keys.
--
-- The rules themselves were first inserted by 008. This file makes them what the
-- worker (scripts/worker.ts) actually runs: the step text matches the behaviour,
-- config carries the knobs, and one rule is added (marking open invoices late).
-- On conflict only the definition is refreshed, is_enabled stays whatever the
-- team set in /settings/automations.

insert into automation_rules (key, name, description, trigger_type, trigger_event, schedule, steps, config, is_enabled) values
  ('deal_won_start_delivery', 'Deal won, start delivery',
   'Turns a won deal into a project, a deposit invoice draft and a kickoff task.',
   'event', 'deal.won', null,
   '[["When","A deal moves to Won"],["Then","Create a project from the matching template, budget from the deal amount, led by Josh or else the deal owner"],["Then","Draft a 50% deposit invoice with no number, billing contact from the deal"],["Then","Kickoff task for the project lead, due in 2 working days"],["Then","Set the organization lifecycle to Customer"]]',
   '{"project_lead_email":"josh@astra.local","deposit_pct":50,"kickoff_working_days":2,"kickoff_time":"10:00",
     "templates":[
       {"key":"website","match":["website","site","webshop","shop","landing","rebuild","redesign"],"kind":"delivery","label":"Website build","milestones":["Design approved","Build complete","Launch"]},
       {"key":"app","match":["app","tool","portal","dashboard","platform","automation"],"kind":"delivery","label":"App or tool build","milestones":["Scope signed off","First working version","Launch"]},
       {"key":"retainer","match":["retainer","squad","support","maintenance","monthly"],"kind":"retainer","label":"Retainer","milestones":["First month review"]},
       {"key":"prototype","match":["prototype","sprint"],"kind":"prototype","label":"Prototype","milestones":["Prototype delivered"]},
       {"key":"default","match":[],"kind":"delivery","label":"Delivery project","milestones":["Kickoff held","Delivered"]}
     ]}',
   true),
  ('lead_reply_move', 'LinkedIn reply, move the lead',
   'A reply found by the lemlist thread pull moves the lead on and asks the owner to answer today.',
   'event', 'lead.replied', null,
   '[["When","The lemlist sync finds a new reply in a full thread pull"],["If","The lead is in Attempting"],["Then","Move it to Connected, the reply is already on the timeline"],["Then","Task for the owner, reply today, priority High"]]',
   '{"from_stage":"attempting","to_stage":"connected","task_when_connected":true,"reply_by":"17:00"}',
   true),
  ('deal_no_next_step', 'No next step on an open deal',
   'Every morning, open deals with nothing planned or stuck past the stage limit get a task.',
   'schedule', null, 'FREQ=DAILY;BYHOUR=8;BYMINUTE=0',
   '[["When","Every morning at 08:00"],["If","An open deal has no open task, or it passed the stage rotting limit"],["Then","Task for the deal owner, plan the next step"],["Then","The card shows red on the board until a task exists"]]',
   '{"hour":8,"due_time":"17:00"}',
   true),
  ('quarterly_checkin', 'Quarterly check in',
   'A check in with every customer on the first Monday of each quarter.',
   'schedule', null, 'FREQ=MONTHLY;INTERVAL=3;BYDAY=1MO',
   '[["When","First Monday of every quarter, created a week ahead"],["If","Organization lifecycle is Customer"],["Then","Check in task for the account manager, linked to the organization and its open project"],["Then","Reminder 1 day before"]]',
   '{"lead_days":7,"due_time":"11:00","remind_before_minutes":1440}',
   true),
  ('invoice_mark_late', 'Mark overdue invoices late',
   'Every morning, open invoices past their due date are marked late.',
   'schedule', null, 'FREQ=DAILY;BYHOUR=8;BYMINUTE=0',
   '[["When","Every morning at 08:00"],["If","An invoice is open and its due date has passed"],["Then","Mark it late, which starts the Invoice late automation"]]',
   '{"hour":8}',
   true),
  ('invoice_late', 'Invoice late',
   'A late invoice gets a chase task for the account manager and a note on the organization.',
   'event', 'invoice.late', null,
   '[["When","An invoice is marked late"],["If","It is still not paid"],["Then","Task for the account manager, priority High"],["Then","A note on the organization timeline"]]',
   '{"due_time":"17:00"}',
   true),
  ('portal_ticket_in', 'Portal ticket in',
   'A new ticket goes to the account manager, with a receipt drafted for approval.',
   'event', 'ticket.created', null,
   '[["When","A ticket is opened"],["Then","Assign it to the account manager if nobody owns it"],["Then","Draft a receipt for the client, it waits in the approval queue and is never sent on its own"]]',
   '{}',
   false)
on conflict (key) do update
  set name = excluded.name,
      description = excluded.description,
      trigger_type = excluded.trigger_type,
      trigger_event = excluded.trigger_event,
      schedule = excluded.schedule,
      steps = excluded.steps,
      config = excluded.config;

-- The worker claims due events in id order. This index serves that query.
create index if not exists domain_events_due_idx on domain_events (next_attempt_at nulls first, id)
  where processed_at is null;

-- Run history by event, for the event detail and for the worker's skip check.
create index if not exists automation_runs_event_idx on automation_runs (event_id) where event_id is not null;

-- Lookups the lemlist sync and the jsonl import do on every row.
create index if not exists external_ids_entity_idx on external_ids (entity_type, entity_id);
create index if not exists leads_lemlist_contact_idx on leads ((custom ->> 'lemlist_contact_id'))
  where custom ? 'lemlist_contact_id';
create index if not exists tasks_rule_idx on tasks ((custom ->> 'created_by_rule'))
  where custom ? 'created_by_rule';

-- API keys: who may use them is the scopes array, and last use is tracked.
alter table api_keys add column if not exists expires_at timestamptz;
