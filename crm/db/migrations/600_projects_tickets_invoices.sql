-- 600 Agent F. Projects, tickets and invoices.
--
-- Invoices: V1 mints its own gapless numbers (Moneybird takes over in V2), so
--   * invoice_number_series holds one locked counter row per series and year,
--     taken with SELECT ... FOR UPDATE in the transaction that issues the invoice.
--     A rolled back issue gives its number back, unlike a Postgres sequence.
--   * the number lives in invoices.external_number (the column every other area
--     already reads), stays null while draft and is set once by "Mark as issued".
--   * NL 9% joins the VAT treatments, credit notes are negative invoices linked
--     to the original, and an issued invoice and its lines are read only
--     (a trigger, so no code path can edit one). Seed and migration writes are exempt
--     so the sample data can be refreshed.
-- Projects: an optional hourly rate for valuing logged time against the budget.
-- Tickets: sla_policies are seeded by 005, nothing to add.

alter table invoices drop constraint if exists invoices_vat_treatment_check;
alter table invoices add constraint invoices_vat_treatment_check
  check (vat_treatment in ('nl_21', 'nl_9', 'reverse_charge', 'export', 'outside_scope'));

alter table invoices add column if not exists kind text not null default 'invoice'
  check (kind in ('invoice', 'credit_note'));
alter table invoices add column if not exists credit_of_invoice_id uuid references invoices(id);
alter table invoices add column if not exists issued_at timestamptz;
create index if not exists invoices_credit_of_idx on invoices (credit_of_invoice_id) where credit_of_invoice_id is not null;
create index if not exists invoices_state_due_idx on invoices (state, due_date) where deleted_at is null;

update invoices set issued_at = coalesce(issue_date::timestamptz, created_at)
 where external_number is not null and issued_at is null;

-- A draft has no number, anything issued has one.
alter table invoices add constraint invoices_draft_unnumbered
  check (state <> 'draft' or external_number is null);
alter table invoices add constraint invoices_issued_numbered
  check (state in ('draft', 'void') or external_number is not null);
alter table invoices add constraint invoices_credit_note_link
  check ((kind = 'credit_note') = (credit_of_invoice_id is not null));

create table invoice_number_series (
  series text not null check (series ~ '^[A-Z]{2,5}$'),
  year integer not null check (year between 2000 and 2999),
  last_number integer not null default 0 check (last_number >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (series, year)
);
select crm_attach_triggers('invoice_number_series');

-- Allowed state moves, and issued invoices are read only.
create or replace function invoices_guard() returns trigger language plpgsql as $$
declare
  v_src text := coalesce(current_setting('app.source', true), '');
begin
  if v_src in ('seed', 'migration') then
    return coalesce(new, old);
  end if;

  if tg_op = 'DELETE' then
    if old.state <> 'draft' and coalesce(current_setting('app.invoice_purge', true), '') <> 'on' then
      raise exception 'Invoice % is issued and cannot be deleted, void it or add a credit note', old.external_number
        using errcode = 'check_violation';
    end if;
    return old;
  end if;

  if tg_op = 'INSERT' then
    if new.state <> 'draft' and v_src not in ('import', 'sync') then
      raise exception 'New invoices start as drafts' using errcode = 'check_violation';
    end if;
    return new;
  end if;

  if new.state is distinct from old.state then
    if not (
      (old.state = 'draft' and new.state in ('open', 'void')) or
      (old.state = 'open' and new.state in ('paid', 'late', 'void')) or
      (old.state = 'late' and new.state in ('paid', 'open', 'void'))
    ) then
      raise exception 'An invoice cannot go from % to %', old.state, new.state using errcode = 'check_violation';
    end if;
  end if;

  if old.state <> 'draft' then
    if (new.organization_id, new.contact_id, new.project_id, new.deal_id, new.title, new.external_number,
        new.issue_date, new.due_date, new.vat_treatment, new.currency, new.subtotal, new.vat_amount, new.total,
        new.notes, new.kind, new.credit_of_invoice_id, new.issued_at)
       is distinct from
       (old.organization_id, old.contact_id, old.project_id, old.deal_id, old.title, old.external_number,
        old.issue_date, old.due_date, old.vat_treatment, old.currency, old.subtotal, old.vat_amount, old.total,
        old.notes, old.kind, old.credit_of_invoice_id, old.issued_at) then
      raise exception 'Invoice % is issued and read only, correct it with a credit note', old.external_number
        using errcode = 'check_violation';
    end if;
  end if;
  return new;
end $$;

drop trigger if exists invoices_guard on invoices;
create trigger invoices_guard before insert or update or delete on invoices
  for each row execute function invoices_guard();

-- Lines of an issued invoice are read only too. A cascade delete from the
-- invoice itself finds no invoice row and passes.
create or replace function line_items_invoice_guard() returns trigger language plpgsql as $$
declare
  v_src text := coalesce(current_setting('app.source', true), '');
  v_ids uuid[];
  v_locked text;
begin
  if v_src in ('seed', 'migration') then
    return coalesce(new, old);
  end if;
  if coalesce(new.invoice_id, old.invoice_id) is null then
    return coalesce(new, old);
  end if;
  if tg_op = 'INSERT' then
    v_ids := array[new.invoice_id];
  elsif tg_op = 'DELETE' then
    v_ids := array[old.invoice_id];
  else
    v_ids := array[old.invoice_id, new.invoice_id];
  end if;
  select coalesce(i.external_number, i.id::text) into v_locked
    from invoices i where i.id = any(v_ids) and i.state <> 'draft' limit 1;
  if v_locked is not null then
    raise exception 'Invoice % is issued, its lines are read only', v_locked using errcode = 'check_violation';
  end if;
  return coalesce(new, old);
end $$;

drop trigger if exists line_items_invoice_guard on line_items;
create trigger line_items_invoice_guard before insert or update or delete on line_items
  for each row execute function line_items_invoice_guard();

-- Projects: value of logged time. Null falls back to budget_amount / budget_hours.
alter table projects add column if not exists hourly_rate numeric(14,2) check (hourly_rate >= 0);
create index if not exists time_entries_user_idx on time_entries (user_id, work_date);
create index if not exists tickets_owner_idx on tickets (owner_user_id) where deleted_at is null;
