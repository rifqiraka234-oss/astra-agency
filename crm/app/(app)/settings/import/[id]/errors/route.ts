/** GET /settings/import/<job id>/errors, the skipped lines of an import as CSV with the reason. Admins only. */
import { getCurrentUser } from '@/lib/auth';
import { can } from '@/lib/permissions';
import { sql } from '@/lib/db';
import { importErrors } from '@/lib/data/import';
import { csvResponse, toCsv } from '@/lib/data/export';

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user) return Response.json({ error: 'Sign in first' }, { status: 401 });
  if (!can(user, 'manage', 'settings')) return Response.json({ error: 'Only admins can download import errors' }, { status: 403 });
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) return Response.json({ error: 'Not found' }, { status: 404 });
  const [job] = await sql<{ file_name: string }[]>`select file_name from import_jobs where id = ${id}`;
  if (!job) return Response.json({ error: 'Not found' }, { status: 404 });
  const rows = await importErrors(sql, id);
  const headers = [...new Set(rows.flatMap((r) => Object.keys(r.raw ?? {})))];
  const csv = toCsv(rows, [
    { header: 'Line', value: (r) => r.row_number },
    { header: 'Reason', value: (r) => r.error },
    ...headers.map((h) => ({ header: h, value: (r: (typeof rows)[number]) => r.raw?.[h] })),
  ]);
  return csvResponse(`${job.file_name.replace(/\.csv$/i, '')}-skipped.csv`, csv);
}
