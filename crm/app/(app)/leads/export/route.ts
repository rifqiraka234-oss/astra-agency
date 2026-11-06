/** GET /leads/export?<same filters as /leads> -> CSV. Export is admin only (Settings roles grid). */
import { type NextRequest } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { can } from '@/lib/permissions';
import { logSecurityEvent } from '@/lib/audit';
import { sql } from '@/lib/db';
import { listLeads } from '@/lib/sales/queries';
import { csvResponse, leadsCsv } from '@/lib/sales/csv';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return new Response('Sign in first', { status: 401 });
  if (!can(user, 'export', 'lead')) return new Response("You don't have permission to export", { status: 403 });
  const p = req.nextUrl.searchParams;
  const get = (k: string) => p.get(k) || undefined;
  const { rows } = await listLeads(
    { stage: get('stage'), research: get('research'), owner: get('owner'), source: get('source'), q: get('q'), state: get('state') ?? (get('stage') ? 'all' : 'open'), sort: get('sort'), dir: get('dir') },
    100000,
  );
  await logSecurityEvent(sql, 'export', { object: 'lead', rows: rows.length, filters: Object.fromEntries(p) }, user.id).catch(() => {});
  return csvResponse(leadsCsv(rows), 'leads');
}
