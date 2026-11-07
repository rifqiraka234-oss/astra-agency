/** GET /leads/export?<same filters as /leads> -> CSV. Export is admin only (Settings roles grid). */
import { type NextRequest } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { can } from '@/lib/permissions';
import { logSecurityEvent } from '@/lib/audit';
import { sql } from '@/lib/db';
import { listLeads } from '@/lib/sales/queries';
import { csvResponse, leadsCsv } from '@/lib/sales/csv';
import { stageColumns, stageDatesFor } from '@/lib/sales/stage-times';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return new Response('Sign in first', { status: 401 });
  if (!can(user, 'export', 'lead')) return new Response("You don't have permission to export", { status: 403 });
  const p = req.nextUrl.searchParams;
  const get = (k: string) => p.get(k) || undefined;
  const { rows } = await listLeads(
    { stage: get('stage'), research: get('research'), reason: get('reason'), owner: get('owner'), source: get('source'), q: get('q'), state: get('state') ?? (get('stage') || get('reason') ? 'all' : 'open'), sort: get('sort'), dir: get('dir') },
    100000,
  );
  await logSecurityEvent(sql, 'export', { object: 'lead', rows: rows.length, filters: Object.fromEntries(p) }, user.id).catch(() => {});
  const [cols, dates] = await Promise.all([stageColumns('lead'), stageDatesFor('lead', rows.map((r) => r.id))]);
  return csvResponse(leadsCsv(rows, cols, dates), 'leads');
}
