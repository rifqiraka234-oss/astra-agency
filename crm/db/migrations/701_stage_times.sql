-- 701 Time per stage, like HubSpot's "date entered" and "date exited" per stage.
-- Computed from stage_transitions, never stored.
--
-- A visit starts at a transition into a stage the record was not already in
-- (a second transition into the same stage, for example an import record after a
-- backfilled one, is part of the same visit) and ends at the next transition into
-- another stage. The visit to the record's current stage is open and counts up to now.

create view v_stage_visits as
with cur as (
  select 'lead'::text as object_type, id as record_id, stage_id from leads where deleted_at is null
  union all select 'deal', id, stage_id from deals where deleted_at is null
  union all select 'project', id, stage_id from projects where deleted_at is null
  union all select 'ticket', id, stage_id from tickets where deleted_at is null
),
moves as (
  select st.id, st.object_type, st.record_id, st.to_stage_id, st.changed_at, st.actor_type, st.actor_id, st.source,
         case when lag(st.to_stage_id) over w is distinct from st.to_stage_id then 1 else 0 end as starts_visit
    from stage_transitions st
  window w as (partition by st.object_type, st.record_id order by st.changed_at, st.id)
),
numbered as (
  select m.*, sum(m.starts_visit) over (partition by m.object_type, m.record_id order by m.changed_at, m.id) as visit_no
    from moves m
),
visits as (
  select n.object_type, n.record_id, n.visit_no,
         (array_agg(n.to_stage_id order by n.changed_at, n.id))[1] as stage_id,
         min(n.changed_at) as entered_at,
         (array_agg(n.id order by n.changed_at, n.id))[1] as transition_id,
         (array_agg(n.actor_type order by n.changed_at, n.id))[1] as actor_type,
         (array_agg(n.actor_id order by n.changed_at, n.id))[1] as actor_id,
         (array_agg(n.source order by n.changed_at, n.id))[1] as source
    from numbered n
   group by n.object_type, n.record_id, n.visit_no
),
ordered as (
  select v.*, lead(v.entered_at) over (partition by v.object_type, v.record_id order by v.visit_no) as exited_at
    from visits v
)
select o.object_type, o.record_id, o.visit_no, o.stage_id, o.entered_at, o.exited_at,
       (o.exited_at is null and c.stage_id = o.stage_id) as is_current,
       -- Seconds in the stage on this visit. An open visit to the current stage counts to now.
       -- A last visit to a stage the record is no longer in has no known end, so no time.
       case
         when o.exited_at is not null then extract(epoch from o.exited_at - o.entered_at)
         when c.stage_id = o.stage_id then greatest(extract(epoch from now() - o.entered_at), 0)
       end as seconds,
       o.transition_id, o.actor_type, o.actor_id, o.source
  from ordered o
  left join cur c on c.object_type = o.object_type and c.record_id = o.record_id;

-- Per record and stage: first entered, last entered, last exited, times entered, total time (every visit summed).
create view v_stage_time as
select v.object_type, v.record_id, v.stage_id,
       min(v.entered_at) as first_entered_at,
       max(v.entered_at) as last_entered_at,
       -- Empty while the record is in the stage now, it has not left since it last came in.
       case when bool_or(v.is_current) then null else max(v.exited_at) end as last_exited_at,
       count(*)::int as times_entered,
       coalesce(sum(v.seconds), 0)::bigint as total_seconds,
       bool_or(v.is_current) as is_current
  from v_stage_visits v
 group by v.object_type, v.record_id, v.stage_id;

-- Time in the current stage starts when the current visit started. A second
-- transition into the stage the record is already in (an import record after a
-- backfilled one) no longer resets the clock. Same columns as 009, so dependent
-- views are untouched.
create or replace view v_deal_weighted as
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
    select min(st.changed_at) as entered_at from stage_transitions st
     where st.object_type = 'deal' and st.record_id = d.id and st.to_stage_id = d.stage_id
       and st.changed_at > coalesce((select max(x.changed_at) from stage_transitions x
                                      where x.object_type = 'deal' and x.record_id = d.id and x.to_stage_id <> d.stage_id), '-infinity')
  ) se on true
 where d.deleted_at is null;

create or replace view v_lead_stage as
select l.id as lead_id, l.pipeline_id, l.stage_id, s.key as stage_key, s.name as stage_name,
       s.position as stage_position, s.state as stage_state, s.rot_days, l.owner_user_id,
       coalesce(se.entered_at, l.created_at) as stage_entered_at,
       crm_today() - (coalesce(se.entered_at, l.created_at) at time zone 'Europe/Amsterdam')::date as days_in_stage,
       (s.state = 'open' and s.rot_days is not null
         and crm_today() - (coalesce(se.entered_at, l.created_at) at time zone 'Europe/Amsterdam')::date > s.rot_days) as is_rotting
  from leads l
  join pipeline_stages s on s.id = l.stage_id
  left join lateral (
    select min(st.changed_at) as entered_at from stage_transitions st
     where st.object_type = 'lead' and st.record_id = l.id and st.to_stage_id = l.stage_id
       and st.changed_at > coalesce((select max(x.changed_at) from stage_transitions x
                                      where x.object_type = 'lead' and x.record_id = l.id and x.to_stage_id <> l.stage_id), '-infinity')
  ) se on true
 where l.deleted_at is null;
