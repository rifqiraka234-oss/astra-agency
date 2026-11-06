/**
 * lib/delivery/list.ts, the /projects list query, shared by the page and its CSV export.
 *
 *   const rows = await listProjects({ stage: 'build', health: 'at_risk', owner, org }, { key: 'due', dir: 'asc' });
 */
import { sql } from '../db';
import { projectBudget, type Budget } from './projects';

export type ProjectFilters = { stage?: string | null; health?: string | null; owner?: string | null; org?: string | null; status?: string | null };
export type ProjectSort = { key: string; dir: 'asc' | 'desc' };

export type ProjectListRow = {
  id: string;
  name: string;
  kind: string;
  status: string;
  health: string;
  organization_id: string | null;
  organization_name: string | null;
  deal_id: string | null;
  deal_name: string | null;
  owner_user_id: string | null;
  owner_name: string | null;
  stage_key: string | null;
  stage_name: string | null;
  stage_position: number | null;
  start_date: string | null;
  due_date: string | null;
  budget_amount: string | null;
  budget_hours: string | null;
  hourly_rate: string | null;
  currency: string;
  total_minutes: number;
  billable_minutes: number;
  open_milestones: number;
  next_milestone_due: string | null;
  sample: boolean;
  budget: Budget;
};

const UUID = /^[0-9a-f-]{36}$/i;

export const PROJECT_SORTS: Record<string, string> = {
  name: 'p.name',
  organization: 'o.name',
  stage: 's.position',
  health: "case p.health when 'off_track' then 0 when 'at_risk' then 1 else 2 end",
  hours: 'total_minutes',
  lead: 'u.name',
  due: 'p.due_date',
  budget: 'p.budget_amount',
};

export async function listProjects(f: ProjectFilters, sort: ProjectSort = { key: 'due', dir: 'asc' }): Promise<ProjectListRow[]> {
  const orderSql = PROJECT_SORTS[sort.key] ?? PROJECT_SORTS.due;
  const dir = sort.dir === 'desc' ? 'desc' : 'asc';
  const owner = f.owner && UUID.test(f.owner) ? f.owner : null;
  const org = f.org && UUID.test(f.org) ? f.org : null;
  const rows = await sql<Omit<ProjectListRow, 'budget'>[]>`
    select p.id, p.name, p.kind, p.status, p.health, p.organization_id, o.name as organization_name,
           p.deal_id, d.name as deal_name, p.owner_user_id, u.name as owner_name,
           s.key as stage_key, s.name as stage_name, s.position as stage_position,
           p.start_date, p.due_date, p.budget_amount, p.budget_hours, p.hourly_rate, p.currency,
           coalesce(te.total_minutes, 0)::int as total_minutes, coalesce(te.billable_minutes, 0)::int as billable_minutes,
           coalesce(ms.open_count, 0)::int as open_milestones, ms.next_due as next_milestone_due,
           coalesce((p.custom ->> 'sample')::boolean, false) as sample
      from projects p
      left join organizations o on o.id = p.organization_id
      left join deals d on d.id = p.deal_id
      left join users u on u.id = p.owner_user_id
      left join pipeline_stages s on s.id = p.stage_id
      left join lateral (
        select sum(minutes) as total_minutes, sum(minutes) filter (where billable) as billable_minutes
          from time_entries where project_id = p.id) te on true
      left join lateral (
        select count(*) filter (where completed_at is null) as open_count,
               min(due_date) filter (where completed_at is null) as next_due
          from project_milestones where project_id = p.id) ms on true
     where p.deleted_at is null
       and (${f.stage ?? null}::text is null or s.key = ${f.stage ?? null})
       and (${f.health ?? null}::text is null or p.health = ${f.health ?? null})
       and (${f.status ?? null}::text is null or p.status = ${f.status ?? null})
       and (${owner}::uuid is null or p.owner_user_id = ${owner})
       and (${org}::uuid is null or p.organization_id = ${org})
     order by ${sql.unsafe(orderSql)} ${sql.unsafe(dir)} nulls last, p.name`;
  return rows.map((r) => ({ ...r, budget: projectBudget(r, r) }));
}
