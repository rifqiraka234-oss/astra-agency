/**
 * GET /organizations/export?<same params as the list> (agent A)
 * The filtered organization list as CSV. Export is admin only (Settings roles grid).
 */
import { NextResponse, type NextRequest } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { can } from '@/lib/permissions';
import { listOrganizations, parseOrgParams } from '@/lib/orgs/queries';
import { organizationsCsv } from '@/lib/orgs/csv';
import { todayKey } from '@/lib/format';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'Sign in first' }, { status: 401 });
  if (!can(user, 'export', 'organization')) return NextResponse.json({ error: "You don't have permission to export" }, { status: 403 });
  const params = parseOrgParams(Object.fromEntries(req.nextUrl.searchParams.entries()));
  const { rows } = await listOrganizations(params, { all: true });
  return new NextResponse('﻿' + organizationsCsv(rows), {
    headers: {
      'content-type': 'text/csv; charset=utf-8',
      'content-disposition': `attachment; filename="organizations-${todayKey()}.csv"`,
      'cache-control': 'no-store',
    },
  });
}
