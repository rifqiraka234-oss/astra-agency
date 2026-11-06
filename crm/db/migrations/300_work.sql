-- 300 Home, tasks, approvals (agent C).
--   sales_goals      the target the home "Weighted pipeline" tile is measured against
--   notifications    gains reminder_id so turning a due reminder into a notification is idempotent

create table sales_goals (
  id uuid primary key default gen_random_uuid(),
  label text not null,                    -- 'Q4 2026'
  period_start date not null,
  period_end date not null,
  amount numeric(14,2) not null check (amount >= 0),
  currency char(3) not null default 'EUR',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (period_end >= period_start),
  unique (period_start, period_end)
);
select crm_attach_triggers('sales_goals');

insert into sales_goals (label, period_start, period_end, amount)
values ('Q4 2026', '2026-10-01', '2026-12-31', 50000.00)
on conflict do nothing;

alter table notifications add column reminder_id uuid references reminders(id) on delete cascade;
create unique index notifications_reminder_user_uq on notifications (reminder_id, user_id) where reminder_id is not null;
