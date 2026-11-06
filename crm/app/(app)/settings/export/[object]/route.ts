/**
 * GET /settings/export/<object>, the whole object as CSV (organizations, contacts,
 * leads, deals, projects, tickets, invoices, tasks). Needs the export permission
 * (admins). Every download is written to the audit log as a security event.
 * List pages can link here for their Export button.
 */
import { getCurrentUser } from '@/lib/auth';
import { can } from '@/lib/permissions';
import { sql } from '@/lib/db';
import { logSecurityEvent } from '@/lib/audit';
import { csvResponse, EXPORT_OBJECTS, exportObject, isExportObject } from '@/lib/data/export';

export async function GET(_req: Request, { params }: { params: Promise<{ object: string }> }) {
  const user = await getCurrentUser();
  if (!user) return Response.json({ error: 'Sign in first' }, { status: 401 });
  const { object } = await params;
  if (!isExportObject(object)) return Response.json({ error: 'Unknown object' }, { status: 404 });
  const entity = EXPORT_OBJECTS.find((o) => o.value === object)!.entity;
  if (!can(user, 'export', entity)) return Response.json({ error: "You don't have permission to export" }, { status: 403 });
  const { filename, csv, count } = await exportObject(object);
  await logSecurityEvent(sql, 'export', { objectType: object, rows: count }, user.id);
  return csvResponse(filename, csv);
}
