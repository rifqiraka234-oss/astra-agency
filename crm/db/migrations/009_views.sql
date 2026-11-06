-- 009 Computed values. Overdue, last activity, weighted amount, time in stage and
-- rotting are always computed here, never stored. "Today" is Europe/Amsterdam.

-- When each record entered its current stage (latest transition into that stage).
create view v_stage_entered as
select distinct on (object_type, record_id, to_stage_id)
       object_type, record_id, to_stage_id as stage_id, changed_at as entered_at
  from stage_transitions
 order by object_type, record_id, to_stage_id, changed_at desc, id desc;

-- Open tasks with their bucket. Overdue means the due day is before today, so a
-- task due today at 10:00 stays in Today until midnight (matches the Tasks design).
-- Buckets: overdue, today, week (tomorrow to the end of next week), later (incl. no due date).
create view v_open_tasks as
select t.id, t.title, t.body, t.type, t.priority, t.status, t.due_at, t.all_day, t.owner_user_id,
       t.recurrence_rule, t.recurrence_parent_id, t.remind_before_minutes, t.created_from, t.created_by,
       t.custom, t.created_at, t.updated_at,
       (t.due_at at time zone 'Europe/Amsterdam')::date as due_date,
       coalesce((t.due_at at time zone 'Europe/Amsterdam')::date < crm_today(), false) as is_overdue,
       coalesce((t.due_at at time zone 'Europe/Amsterdam')::date = crm_today(), false) as is_due_today,
       case
         when t.due_at is null then 'later'
         when (t.due_at at time zone 'Europe/Amsterdam')::date < crm_today() then 'overdue'
         when (t.due_at at time zone 'Europe/Amsterdam')::date = crm_today() then 'today'
         when (t.due_at at time zone 'Europe/Amsterdam')::date <= date_trunc('week', crm_today())::date + 13 then 'week'
         else 'later'
       end as bucket,
       u.name as owner_name, u.initials as owner_initials, u.avatar_bg as owner_avatar_bg
  from tasks t
  left join users u on u.id = t.owner_user_id
 where t.status not in ('completed', 'cancelled') and t.deleted_at is null;

-- Deals with probability, weighted amount, time in stage and rotting.
create view v_deal_weighted as
select d.id as deal_id, d.name, d.organization_id, d.owner_user_id, d.pipeline_id, d.stage_id,
       s.key as stage_key, s.name as stage_name, s.position as stage_position, s.state as stage_state,
       s.rot_days, d.amount, d.currency, d.close_date,
       coalesce(d.forecast_probability, s.probability, 0) as probability,
       round(coalesce(d.amount, 0) * coalesce(d.forecast_probability, s.probability, 0) / 100.0, 2) as weighted_amount,
       coalesce(se.entered_at, d.created_at) as stage_entered_at,
       crm_today() - (coalesce(se.entered_at, d.created_at) at time zone 'Europe/Amsterdam')::date as days_in_stage,
       (s.state = 'open' and s.rot_days is not null
         and crm_today() - (coalesce(se.entered_at, d.created_at) at time zone 'Europe/Amsterdam')::date > s.rot_days) as is_rotting,
       exists (
         select 1 from task_links tl join tasks t on t.id = tl.task_id
          where tl.deal_id = d.id and t.status not in ('completed', 'cancelled') and t.deleted_at is null
       ) as has_open_task
  from deals d
  join pipeline_stages s on s.id = d.stage_id
  left join lateral (
    select st.changed_at as entered_at from stage_transitions st
     where st.object_type = 'deal' and st.record_id = d.id and st.to_stage_id = d.stage_id
     order by st.changed_at desc, st.id desc limit 1
  ) se on true
 where d.deleted_at is null;

-- Leads with time in stage and rotting.
create view v_lead_stage as
select l.id as lead_id, l.pipeline_id, l.stage_id, s.key as stage_key, s.name as stage_name,
       s.position as stage_position, s.state as stage_state, s.rot_days, l.owner_user_id,
       coalesce(se.entered_at, l.created_at) as stage_entered_at,
       crm_today() - (coalesce(se.entered_at, l.created_at) at time zone 'Europe/Amsterdam')::date as days_in_stage,
       (s.state = 'open' and s.rot_days is not null
         and crm_today() - (coalesce(se.entered_at, l.created_at) at time zone 'Europe/Amsterdam')::date > s.rot_days) as is_rotting
  from leads l
  join pipeline_stages s on s.id = l.stage_id
  left join lateral (
    select st.changed_at as entered_at from stage_transitions st
     where st.object_type = 'lead' and st.record_id = l.id and st.to_stage_id = l.stage_id
     order by st.changed_at desc, st.id desc limit 1
  ) se on true
 where l.deleted_at is null;

-- Three recency measures, as HubSpot defines them:
--   last_activity_at  any activity, notes and changes included
--   last_contacted_at outbound one to one touches and meetings
--   last_inbound_at   anything they sent us
create view v_last_activity_org as
select al.organization_id,
       max(a.occurred_at) as last_activity_at,
       max(a.occurred_at) filter (where a.kind = 'meeting' or (a.direction = 'outbound'
           and a.kind in ('email', 'linkedin_message', 'linkedin_invite', 'call', 'artifact_sent'))) as last_contacted_at,
       max(a.occurred_at) filter (where a.direction = 'inbound') as last_inbound_at,
       count(*) as activity_count
  from activity_links al
  join activities a on a.id = al.activity_id and a.deleted_at is null
 where al.organization_id is not null
 group by al.organization_id;

create view v_last_activity_contact as
select al.contact_id,
       max(a.occurred_at) as last_activity_at,
       max(a.occurred_at) filter (where a.kind = 'meeting' or (a.direction = 'outbound'
           and a.kind in ('email', 'linkedin_message', 'linkedin_invite', 'call', 'artifact_sent'))) as last_contacted_at,
       max(a.occurred_at) filter (where a.direction = 'inbound') as last_inbound_at,
       count(*) as activity_count
  from activity_links al
  join activities a on a.id = al.activity_id and a.deleted_at is null
 where al.contact_id is not null
 group by al.contact_id;

-- Rollups per organization for lists and the record header.
create view v_org_summary as
select o.id as organization_id,
       (select count(*) from contact_org_roles r join contacts c on c.id = r.contact_id and c.deleted_at is null
         where r.organization_id = o.id and r.is_current) as contact_count,
       (select count(*) from v_deal_weighted d where d.organization_id = o.id and d.stage_state = 'open') as open_deal_count,
       (select coalesce(sum(d.amount), 0) from v_deal_weighted d where d.organization_id = o.id and d.stage_state = 'open') as open_deal_value,
       (select coalesce(sum(d.amount), 0) from v_deal_weighted d where d.organization_id = o.id and d.stage_state = 'won') as won_value,
       (select min(d.won_at) from deals d where d.organization_id = o.id and d.won_at is not null and d.deleted_at is null) as customer_since,
       (select count(*) from projects p where p.organization_id = o.id and p.deleted_at is null and p.status = 'active') as active_project_count,
       (select coalesce(sum(i.subtotal), 0) from invoices i where i.organization_id = o.id and i.state = 'paid' and i.deleted_at is null) as paid_value,
       la.last_activity_at, la.last_contacted_at, la.last_inbound_at
  from organizations o
  left join v_last_activity_org la on la.organization_id = o.id
 where o.deleted_at is null;
