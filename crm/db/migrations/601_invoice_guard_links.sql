-- 601 Agent F. Issued invoices stay read only on everything printed on them
-- (number, dates, VAT, amounts, title, notes), but the CRM links (organization,
-- contact, deal, project) may be re-pointed, so merging duplicate organizations
-- or contacts (agent D, lib/data/merge.ts) can move issued invoices to the winner.

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
    if (new.title, new.external_number, new.issue_date, new.due_date, new.vat_treatment, new.currency,
        new.subtotal, new.vat_amount, new.total, new.notes, new.kind, new.credit_of_invoice_id, new.issued_at)
       is distinct from
       (old.title, old.external_number, old.issue_date, old.due_date, old.vat_treatment, old.currency,
        old.subtotal, old.vat_amount, old.total, old.notes, old.kind, old.credit_of_invoice_id, old.issued_at) then
      raise exception 'Invoice % is issued and read only, correct it with a credit note', old.external_number
        using errcode = 'check_violation';
    end if;
  end if;
  return new;
end $$;
