/**
 * GET /contacts/export?<same params as the list> (agent A)
 * The filtered contact list as CSV. Export is admin only (Settings roles grid).
 */
import { NextResponse, type NextRequest } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { can } from '@/lib/permissions';
import { listContacts, parseContactParams } from '@/lib/orgs/queries';
import { contactsCsv } from '@/lib/orgs/csv';
import { todayKey } from '@/lib/format';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'Sign in first' }, { status: 401 });
  if (!can(user, 'export', 'contact')) return NextResponse.json({ error: "You don't have permission to export" }, { status: 403 });
  const params = parseContactParams(Object.fromEntries(req.nextUrl.searchParams.entries()));
  const { rows } = await listContacts(params, { all: true });
  return new NextResponse('﻿' + contactsCsv(rows), {
    headers: {
      'content-type': 'text/csv; charset=utf-8',
      'content-disposition': `attachment; filename="contacts-${todayKey()}.csv"`,
      'cache-control': 'no-store',
    },
  });
}
