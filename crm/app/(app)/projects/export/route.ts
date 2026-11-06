/**
 * GET /projects/export, the projects list as CSV with the same filters and sort
 * as the page. Admins only (export permission). Record ids are included so the
 * file can round trip through import.
 */
import Papa from 'papaparse';
import { getCurrentUser } from '@/lib/auth';
import { can } from '@/lib/permissions';
import { logSecurityEvent } from '@/lib/audit';
import { sql } from '@/lib/db';
import { todayKey } from '@/lib/format';
import { HEALTH, PROJECT_KINDS, PROJECT_STATUSES, labelOf } from '@/lib/options';
import { listProjects } from '@/lib/delivery/list';

export async function GET(req: Request) {
  const user = await getCurrentUser();
  if (!user) return Response.json({ error: 'Sign in first' }, { status: 401 });
  if (!can(user, 'export', 'project')) return Response.json({ error: "You can't export projects" }, { status: 403 });
  const q = new URL(req.url).searchParams;
  const rows = await listProjects(
    { stage: q.get('stage'), health: q.get('health'), owner: q.get('owner'), org: q.get('org'), status: q.get('status') },
    { key: q.get('sort') ?? 'due', dir: q.get('dir') === 'desc' ? 'desc' : 'asc' },
  );
  const csv = Papa.unparse(
    rows.map((r) => ({
      id: r.id,
      name: r.name,
      kind: labelOf(PROJECT_KINDS, r.kind),
      organization: r.organization_name ?? '',
      organization_id: r.organization_id ?? '',
      deal: r.deal_name ?? '',
      deal_id: r.deal_id ?? '',
      stage: r.stage_name ?? '',
      status: labelOf(PROJECT_STATUSES, r.status),
      health: labelOf(HEALTH, r.health),
      lead: r.owner_name ?? '',
      start_date: r.start_date ?? '',
      due_date: r.due_date ?? '',
      currency: r.currency,
      budget_amount: r.budget_amount ?? '',
      budget_hours: r.budget_hours ?? '',
      hours_logged: (r.total_minutes / 60).toFixed(2),
      billable_hours: (r.billable_minutes / 60).toFixed(2),
      value_of_time: r.budget.usedValue ?? '',
      budget_used_pct: r.budget.percent ?? '',
      open_milestones: r.open_milestones,
      sample_data: r.sample ? 'yes' : '',
    })),
  );
  try {
    await logSecurityEvent(sql, 'export', { object: 'project', rows: rows.length, filters: Object.fromEntries(q.entries()) }, user.id);
  } catch {
    /* the export still works if the audit helper changes shape */
  }
  return new Response(`﻿${csv}`, {
    headers: {
      'content-type': 'text/csv; charset=utf-8',
      'content-disposition': `attachment; filename="projects-${todayKey()}.csv"`,
      'cache-control': 'no-store',
    },
  });
}
