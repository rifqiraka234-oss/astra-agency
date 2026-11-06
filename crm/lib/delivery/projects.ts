/**
 * lib/delivery/projects.ts, projects, milestones and time.
 *
 *   const id = await createProject(t, { name, organizationId, dealId, ownerUserId, budgetAmount: '3400', budgetHours: '40', actorUserId });
 *   await addMilestone(t, id, { name: 'Launch', dueDate: '2026-11-20' });
 *   await setMilestoneDone(t, milestoneId, true);
 *   await addTimeEntry(t, id, { userId, workDate: '2026-11-06', minutes: 90, description, billable: true });
 *   const b = projectBudget({ budget_amount, budget_hours, hourly_rate }, { billable_minutes, total_minutes });
 *
 * A new project enters the first stage of the Project delivery pipeline through
 * moveStage, so it has a stage history from day one. Stage changes after that
 * go through moveStage too.
 */
import type { Db, Tx } from '../db';
import { logActivity } from '../activities';
import { emit } from '../events';
import { moveStage, stageByKey } from '../stages';
import { fromCents, multiplyMoney, toCents } from '../format';

export class ProjectError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ProjectError';
  }
}

export type CreateProjectInput = {
  name: string;
  kind?: 'prototype' | 'delivery' | 'retainer';
  organizationId?: string | null;
  dealId?: string | null;
  ownerUserId?: string | null;
  startDate?: string | null;
  dueDate?: string | null;
  budgetAmount?: string | null;
  budgetHours?: string | null;
  hourlyRate?: string | null;
  description?: string | null;
  actorUserId: string | null;
};

export async function createProject(t: Tx, input: CreateProjectInput): Promise<string> {
  let orgId = input.organizationId ?? null;
  if (!orgId && input.dealId) {
    const [d] = await t<{ organization_id: string | null }[]>`select organization_id from deals where id = ${input.dealId}`;
    orgId = d?.organization_id ?? null;
  }
  const [row] = await t<{ id: string }[]>`
    insert into projects (name, kind, organization_id, deal_id, owner_user_id, start_date, due_date, budget_amount,
                          budget_hours, hourly_rate, description, status, health)
    values (${input.name}, ${input.kind ?? 'delivery'}, ${orgId}, ${input.dealId ?? null}, ${input.ownerUserId ?? null},
            ${input.startDate ?? null}, ${input.dueDate ?? null}, ${input.budgetAmount ?? null}, ${input.budgetHours ?? null},
            ${input.hourlyRate ?? null}, ${input.description ?? null}, 'active', 'on_track')
    returning id`;
  const kickoff = await stageByKey('delivery', 'kickoff', t);
  await moveStage(t, {
    objectType: 'project',
    recordId: row.id,
    toStageId: kickoff.id,
    actor: input.actorUserId ? { type: 'user', id: input.actorUserId } : { type: 'system' },
    source: 'create',
  });
  await emit(t, 'record.created', { type: 'project', id: row.id }, { aggregateType: 'project', aggregateId: row.id, actorUserId: input.actorUserId });
  return row.id;
}

// ---------------------------------------------------------------- milestones

export async function addMilestone(t: Tx, projectId: string, input: { name: string; dueDate?: string | null; amount?: string | null }): Promise<string> {
  const [{ pos }] = await t<{ pos: number }[]>`
    select coalesce(max(position) + 1, 0)::int as pos from project_milestones where project_id = ${projectId}`;
  const [row] = await t<{ id: string }[]>`
    insert into project_milestones (project_id, name, due_date, amount, position)
    values (${projectId}, ${input.name}, ${input.dueDate ?? null}, ${input.amount ?? null}, ${pos})
    returning id`;
  return row.id;
}

export async function setMilestoneDone(t: Tx, milestoneId: string, done: boolean, actorUserId: string | null = null): Promise<void> {
  const [m] = await t<{ project_id: string; name: string; completed_at: Date | null }[]>`
    select project_id, name, completed_at from project_milestones where id = ${milestoneId} for update`;
  if (!m) throw new ProjectError('Milestone not found');
  if (Boolean(m.completed_at) === done) return;
  await t`update project_milestones set completed_at = ${done ? new Date() : null} where id = ${milestoneId}`;
  if (done) {
    const [p] = await t<{ organization_id: string | null }[]>`select organization_id from projects where id = ${m.project_id}`;
    await logActivity(
      {
        kind: 'system',
        direction: 'internal',
        actorUserId,
        title: `Milestone done, ${m.name}`,
        links: [{ projectId: m.project_id, isPrimary: true }, { organizationId: p?.organization_id ?? null }],
        autoLink: false,
      },
      t,
    );
  }
}

export async function updateMilestone(t: Tx, milestoneId: string, input: { name?: string; dueDate?: string | null }): Promise<void> {
  const patch: Record<string, unknown> = {};
  if (input.name !== undefined) patch.name = input.name;
  if (input.dueDate !== undefined) patch.due_date = input.dueDate;
  if (Object.keys(patch).length === 0) return;
  await t`update project_milestones set ${t(patch as Record<string, any>)} where id = ${milestoneId}`; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export async function removeMilestone(t: Tx, milestoneId: string): Promise<void> {
  await t`delete from project_milestones where id = ${milestoneId}`;
}

// ---------------------------------------------------------------- time

export type TimeEntryInput = { userId: string; workDate: string; minutes: number; description?: string | null; billable: boolean };

export async function addTimeEntry(t: Tx, projectId: string, input: TimeEntryInput): Promise<string> {
  if (!Number.isInteger(input.minutes) || input.minutes <= 0) throw new ProjectError('Log more than zero minutes');
  if (input.minutes > 24 * 60) throw new ProjectError('One entry can hold at most 24 hours');
  const [row] = await t<{ id: string }[]>`
    insert into time_entries (project_id, user_id, work_date, minutes, description, billable)
    values (${projectId}, ${input.userId}, ${input.workDate}, ${input.minutes}, ${input.description ?? null}, ${input.billable})
    returning id`;
  return row.id;
}

export async function removeTimeEntry(t: Tx, entryId: string): Promise<void> {
  const [e] = await t<{ invoice_line_id: string | null }[]>`select invoice_line_id from time_entries where id = ${entryId} for update`;
  if (!e) throw new ProjectError('Time entry not found');
  if (e.invoice_line_id) throw new ProjectError('This time is on an invoice and cannot be removed');
  await t`delete from time_entries where id = ${entryId}`;
}

/** '1.5' or '1:30' or '90m' -> 90. Null when it does not parse. */
export function parseHours(input: string | null | undefined): number | null {
  if (!input) return null;
  const s = input.trim().toLowerCase().replace(',', '.');
  let m = s.match(/^(\d+):([0-5]\d)$/);
  if (m) return Number(m[1]) * 60 + Number(m[2]);
  m = s.match(/^(\d+)\s*m(in)?$/);
  if (m) return Number(m[1]);
  m = s.match(/^(\d+(?:\.\d+)?)\s*h?$/);
  if (m) return Math.round(Number(m[1]) * 60);
  return null;
}

// ---------------------------------------------------------------- budget

export type HoursSummary = { total_minutes: number; billable_minutes: number; unbilled_minutes: number };

export async function projectHours(db: Db, projectIds: string[]): Promise<Map<string, HoursSummary>> {
  const out = new Map<string, HoursSummary>();
  if (projectIds.length === 0) return out;
  const rows = await db<(HoursSummary & { project_id: string })[]>`
    select project_id,
           coalesce(sum(minutes), 0)::int as total_minutes,
           coalesce(sum(minutes) filter (where billable), 0)::int as billable_minutes,
           coalesce(sum(minutes) filter (where billable and invoice_line_id is null), 0)::int as unbilled_minutes
      from time_entries where project_id = any(${projectIds}::uuid[]) group by project_id`;
  for (const r of rows) out.set(r.project_id, r);
  return out;
}

export type Budget = {
  /** Hourly rate used to value time: hourly_rate, else budget amount over budget hours. */
  rate: string | null;
  hours: number;
  budgetHours: number | null;
  /** Value of the billable time logged. */
  usedValue: string | null;
  budgetAmount: string | null;
  /** 0 to 100+, by value when there is a rate and a budget, else by hours. */
  percent: number | null;
  tone: 'green' | 'amber' | 'red';
  over: boolean;
};

/** Budget against the value of logged time. Exact money. */
export function projectBudget(
  p: { budget_amount: string | null; budget_hours: string | null; hourly_rate: string | null },
  h: Pick<HoursSummary, 'total_minutes' | 'billable_minutes'> | undefined,
): Budget {
  const totalMinutes = h?.total_minutes ?? 0;
  const billableMinutes = h?.billable_minutes ?? 0;
  const budgetHours = p.budget_hours !== null ? Number(p.budget_hours) : null;
  let rate: string | null = p.hourly_rate;
  if (!rate && p.budget_amount && budgetHours && budgetHours > 0) {
    // Exact cents / hours, rounded to the cent.
    const cents = toCents(p.budget_amount);
    const hundredthHours = BigInt(Math.round(budgetHours * 100));
    rate = fromCents((cents * 100n + hundredthHours / 2n) / hundredthHours);
  }
  const usedValue = rate ? multiplyMoney(rate, (billableMinutes / 60).toFixed(6)) : null;
  let percent: number | null = null;
  if (usedValue && p.budget_amount && toCents(p.budget_amount) > 0n) {
    percent = Number((toCents(usedValue) * 1000n) / toCents(p.budget_amount)) / 10;
  } else if (budgetHours && budgetHours > 0) {
    percent = Math.round((totalMinutes / 60 / budgetHours) * 1000) / 10;
  }
  const over = percent !== null && percent > 100;
  const tone = percent === null || percent <= 85 ? 'green' : percent <= 100 ? 'amber' : 'red';
  return { rate, hours: totalMinutes / 60, budgetHours, usedValue, budgetAmount: p.budget_amount, percent, tone, over };
}
