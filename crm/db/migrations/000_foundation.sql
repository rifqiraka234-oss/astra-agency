-- 000 Foundation: extensions, the audit log, and the trigger helpers every table uses.
--
-- Conventions for every later migration (feature agents too):
--   * id uuid primary key default gen_random_uuid(), created_at, updated_at.
--   * After creating a table call  select crm_attach_triggers('my_table');
--     That adds the updated_at trigger and the audit trigger (pass false as the
--     second argument to skip the audit trigger on high volume log tables).
--   * The audit trigger reads the actor from  current_setting('app.user_id')
--     and the source from  current_setting('app.source'), both set per
--     transaction by tx() in lib/db.ts.

create extension if not exists pgcrypto;
create extension if not exists pg_trgm;

create table audit_log (
  id bigserial primary key,
  table_name text not null,
  record_id text,
  action text not null check (action in ('insert', 'update', 'delete')),
  old_data jsonb,
  new_data jsonb,
  changed_fields text[],
  actor_user_id uuid,
  actor_source text,
  occurred_at timestamptz not null default now()
);
create index audit_log_record_idx on audit_log (table_name, record_id, occurred_at desc);
create index audit_log_actor_idx on audit_log (actor_user_id, occurred_at desc);
create index audit_log_time_idx on audit_log (occurred_at desc);

-- Append only. Nobody updates or deletes audit rows.
create or replace function audit_log_immutable() returns trigger language plpgsql as $$
begin
  raise exception 'audit_log is append only';
end $$;
create trigger audit_log_no_update before update or delete on audit_log
  for each row execute function audit_log_immutable();

create or replace function set_updated_at() returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end $$;

-- Generic row audit. Strips secrets, skips updates that change nothing.
create or replace function audit_row() returns trigger language plpgsql as $$
declare
  v_old jsonb;
  v_new jsonb;
  v_id text;
  v_actor uuid;
  v_changed text[];
begin
  if tg_op = 'DELETE' then
    v_old := to_jsonb(old) - 'password_hash' - 'key_hash';
    v_id := coalesce(v_old ->> 'id', v_old ->> 'domain', v_old ->> 'key');
  elsif tg_op = 'INSERT' then
    v_new := to_jsonb(new) - 'password_hash' - 'key_hash';
    v_id := coalesce(v_new ->> 'id', v_new ->> 'domain', v_new ->> 'key');
  else
    v_old := to_jsonb(old) - 'password_hash' - 'key_hash';
    v_new := to_jsonb(new) - 'password_hash' - 'key_hash';
    v_id := coalesce(v_new ->> 'id', v_new ->> 'domain', v_new ->> 'key');
    select array_agg(n.key order by n.key) into v_changed
      from jsonb_each(v_new) n
     where n.key <> 'updated_at' and n.value is distinct from (v_old -> n.key);
    if v_changed is null then
      return new;
    end if;
  end if;

  begin
    v_actor := nullif(current_setting('app.user_id', true), '')::uuid;
  exception when others then
    v_actor := null;
  end;

  insert into audit_log (table_name, record_id, action, old_data, new_data, changed_fields, actor_user_id, actor_source)
  values (tg_table_name, v_id, lower(tg_op), v_old, v_new, v_changed, v_actor,
          nullif(current_setting('app.source', true), ''));
  return coalesce(new, old);
end $$;

-- select crm_attach_triggers('organizations');            -- updated_at + audit
-- select crm_attach_triggers('stage_transitions', false); -- updated_at only (if it has the column)
create or replace function crm_attach_triggers(p_table regclass, p_audit boolean default true)
returns void language plpgsql as $$
declare
  v_has_updated boolean;
  v_name text := (select relname from pg_class where oid = p_table);
begin
  select exists (
    select 1 from pg_attribute
     where attrelid = p_table and attname = 'updated_at' and not attisdropped
  ) into v_has_updated;
  if v_has_updated then
    execute format('drop trigger if exists %I on %s', v_name || '_set_updated_at', p_table);
    execute format('create trigger %I before update on %s for each row execute function set_updated_at()',
                   v_name || '_set_updated_at', p_table);
  end if;
  if p_audit then
    execute format('drop trigger if exists %I on %s', v_name || '_audit', p_table);
    execute format('create trigger %I after insert or update or delete on %s for each row execute function audit_row()',
                   v_name || '_audit', p_table);
  end if;
end $$;

-- Today in the business time zone. The app session also runs in Europe/Amsterdam.
create or replace function crm_today() returns date language sql stable as $$
  select (now() at time zone 'Europe/Amsterdam')::date
$$;
