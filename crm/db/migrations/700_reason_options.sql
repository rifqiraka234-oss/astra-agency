-- 700 Managed reason lists for disqualified leads and lost deals.
--
-- leads.disqualify_reason had a hard coded check constraint and deals.lost_reason
-- was free text. Both now hold a key from reason_options, an admin managed list
-- (/settings/reasons): add, rename (the label, the key never changes), reorder,
-- archive. A trigger lets a record store only an active key; a record that already
-- holds a key that is archived later keeps it until the reason changes.
-- The stage gate dropdowns (stage_required_fields.options) follow the active list.
-- Old keys keep working: every key the old lists used is seeded here.

create table reason_options (
  id uuid primary key default gen_random_uuid(),
  object_type text not null check (object_type in ('lead_disqualify', 'deal_lost')),
  key text not null check (key ~ '^[a-z0-9_]{1,60}$'),
  label text not null check (length(trim(label)) between 1 and 80),
  position integer not null default 0,
  is_archived boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (object_type, key)
);
create index reason_options_list_idx on reason_options (object_type, is_archived, position);
select crm_attach_triggers('reason_options');

insert into reason_options (object_type, key, label, position, is_archived) values
  ('lead_disqualify', 'no_reply', 'No reply', 0, false),
  ('lead_disqualify', 'went_quiet', 'Went quiet after replying', 1, false),
  ('lead_disqualify', 'declined', 'Declined', 2, false),
  ('lead_disqualify', 'not_now', 'Not now', 3, false),
  ('lead_disqualify', 'no_strong_angle', 'No strong angle', 4, false),
  ('lead_disqualify', 'not_icp', 'Not our ideal client', 5, false),
  ('lead_disqualify', 'do_not_contact', 'Do not contact', 6, false),
  ('lead_disqualify', 'blocked_needs_info', 'Blocked, needs info', 7, false),
  ('lead_disqualify', 'former_owner', 'Former owner', 8, false),
  ('lead_disqualify', 'wrong_company', 'Wrong company', 9, false),
  ('lead_disqualify', 'business_closed', 'Business closed', 10, false),
  ('lead_disqualify', 'has_agency', 'Already has an agency', 11, false),

  ('deal_lost', 'cheaper', 'Went with someone cheaper', 0, false),
  ('deal_lost', 'other_agency', 'Chose another agency', 1, false),
  ('deal_lost', 'in_house', 'Building it in house', 2, false),
  ('deal_lost', 'no_budget', 'No budget', 3, false),
  ('deal_lost', 'not_now', 'Not now', 4, false),
  ('deal_lost', 'no_response', 'Went quiet', 5, false),
  ('deal_lost', 'scope_fit', 'Scope not a fit', 6, false),
  ('deal_lost', 'no_decision_maker', 'Decision maker not on board', 7, false),
  -- The old list had Other. Kept archived so a record that holds it still shows a label.
  ('deal_lost', 'other', 'Other', 8, true);

-- Any key already stored that the seed does not know becomes an archived option,
-- so nothing stored loses its meaning (none expected, this is a safety net).
insert into reason_options (object_type, key, label, position, is_archived)
select 'deal_lost', x.k, initcap(replace(x.k, '_', ' ')), 100, true
  from (select distinct lost_reason as k from deals where lost_reason is not null) x
 where x.k ~ '^[a-z0-9_]{1,60}$'
on conflict (object_type, key) do nothing;

-- The optional note typed next to the reason.
alter table leads add column disqualify_note text;
alter table deals add column lost_note text;

-- A lost reason that was free text rather than a key is kept as the note.
update deals set lost_note = coalesce(lost_note, lost_reason), lost_reason = null
 where lost_reason is not null and lost_reason !~ '^[a-z0-9_]{1,60}$';

-- leads.disqualify_reason is checked against the list now, not a fixed set.
alter table leads drop constraint if exists leads_disqualify_reason_check;

-- Only an active key may be stored. Checked on insert and when the value changes,
-- so archiving a reason never breaks the records that already hold it.
create or replace function check_lead_disqualify_reason() returns trigger language plpgsql as $$
begin
  if new.disqualify_reason is null then
    return new;
  end if;
  if tg_op = 'UPDATE' and new.disqualify_reason is not distinct from old.disqualify_reason then
    return new;
  end if;
  if not exists (select 1 from reason_options
                  where object_type = 'lead_disqualify' and key = new.disqualify_reason and not is_archived) then
    raise exception 'disqualify reason "%" is not an active reason', new.disqualify_reason
      using errcode = 'check_violation', constraint = 'leads_disqualify_reason_active';
  end if;
  return new;
end $$;
create trigger leads_disqualify_reason_active before insert or update of disqualify_reason on leads
  for each row execute function check_lead_disqualify_reason();

create or replace function check_deal_lost_reason() returns trigger language plpgsql as $$
begin
  if new.lost_reason is null then
    return new;
  end if;
  if tg_op = 'UPDATE' and new.lost_reason is not distinct from old.lost_reason then
    return new;
  end if;
  if not exists (select 1 from reason_options
                  where object_type = 'deal_lost' and key = new.lost_reason and not is_archived) then
    raise exception 'lost reason "%" is not an active reason', new.lost_reason
      using errcode = 'check_violation', constraint = 'deals_lost_reason_active';
  end if;
  return new;
end $$;
create trigger deals_lost_reason_active before insert or update of lost_reason on deals
  for each row execute function check_deal_lost_reason();

-- A reason in use is never deleted, only archived.
create or replace function reason_options_guard_delete() returns trigger language plpgsql as $$
begin
  if (old.object_type = 'lead_disqualify' and exists (select 1 from leads where disqualify_reason = old.key))
     or (old.object_type = 'deal_lost' and exists (select 1 from deals where lost_reason = old.key)) then
    raise exception 'reason "%" is in use, archive it instead', old.key using errcode = 'foreign_key_violation';
  end if;
  return old;
end $$;
create trigger reason_options_no_delete_in_use before delete on reason_options
  for each row execute function reason_options_guard_delete();

-- The stage gate dropdowns show the active reasons, in order.
create or replace function sync_reason_gate_options() returns void language sql as $$
  update stage_required_fields r
     set options = coalesce((
           select jsonb_agg(jsonb_build_object('value', o.key, 'label', o.label) order by o.position, o.label)
             from reason_options o
            where not o.is_archived
              and o.object_type = case r.field_key when 'disqualify_reason' then 'lead_disqualify' else 'deal_lost' end
         ), '[]'::jsonb),
         input_type = 'select'
   where r.field_key in ('disqualify_reason', 'lost_reason')
     and r.options is distinct from coalesce((
           select jsonb_agg(jsonb_build_object('value', o.key, 'label', o.label) order by o.position, o.label)
             from reason_options o
            where not o.is_archived
              and o.object_type = case r.field_key when 'disqualify_reason' then 'lead_disqualify' else 'deal_lost' end
         ), '[]'::jsonb);
$$;

create or replace function reason_options_changed() returns trigger language plpgsql as $$
begin
  perform sync_reason_gate_options();
  return null;
end $$;
create trigger reason_options_sync_gate after insert or update or delete on reason_options
  for each statement execute function reason_options_changed();

-- A new required reason field on a stage picks up the list too.
create or replace function stage_required_reason_options() returns trigger language plpgsql as $$
begin
  if new.field_key in ('disqualify_reason', 'lost_reason') then
    new.input_type := 'select';
    new.options := coalesce((
      select jsonb_agg(jsonb_build_object('value', o.key, 'label', o.label) order by o.position, o.label)
        from reason_options o
       where not o.is_archived
         and o.object_type = case new.field_key when 'disqualify_reason' then 'lead_disqualify' else 'deal_lost' end
    ), '[]'::jsonb);
  end if;
  return new;
end $$;
create trigger stage_required_fields_reason_options before insert on stage_required_fields
  for each row execute function stage_required_reason_options();

select sync_reason_gate_options();
