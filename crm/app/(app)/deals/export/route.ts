/** GET /deals/export?<same filters as /deals> -> CSV. Export is admin only (Settings roles grid). */
import { type NextRequest } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { can } from '@/lib/permissions';
import { logSecurityEvent } from '@/lib/audit';
import { sql } from '@/lib/db';
import { listDeals } from '@/lib/sales/queries';
import { csvResponse, dealsCsv } from '@/lib/sales/csv';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return new Response('Sign in first', { status: 401 });
  if (!can(user, 'export', 'deal')) return new Response("You don't have permission to export", { status: 403 });
  const p = req.nextUrl.searchParams;
  const get = (k: string) => p.get(k) || undefined;
  const { rows } = await listDeals(
    { pipeline: get('pipeline'), stage: get('stage'), state: get('state'), owner: get('owner'), q: get('q'), sort: get('sort'), dir: get('dir') },
    100000,
  );
  await logSecurityEvent(sql, 'export', { object: 'deal', rows: rows.length, filters: Object.fromEntries(p) }, user.id).catch(() => {});
  return csvResponse(dealsCsv(rows), 'deals');
}
