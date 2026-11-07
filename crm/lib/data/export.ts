/**
 * lib/data/export.ts, CSV export for any list (server only).
 *
 * Generic helper for your own list:
 *   import { toCsv, csvResponse } from '@/lib/data/export';
 *   const csv = toCsv(rows, [
 *     { header: 'Name', value: (r) => r.name },
 *     { header: 'Open value', value: (r) => r.open_value },     // numeric strings stay exact
 *   ]);
 *   return csvResponse('organizations.csv', csv);              // from a route handler
 *
 * Whole objects, with custom fields as extra columns:
 *   const { filename, csv, count } = await exportObject('contacts');
 *   // or link to /settings/export/contacts (admins, logged in the audit log as a security event)
 *
 * Every export carries a "CRM id" column, so the same file can go back in
 * through /settings/import to update records.
 */
import Papa from 'papaparse';
import { sql, type Db } from '@/lib/db';
import { getFieldDefinitions, type CustomObjectType } from '@/lib/fields';

export type CsvColumn<T> = { header: string; value: (row: T) => unknown };

function cell(v: unknown): string {
  if (v === null || v === undefined) return '';
  if (v instanceof Date) return v.toISOString();
  if (Array.isArray(v)) return v.map(cell).join('; ');
  if (typeof v === 'boolean') return v ? 'yes' : 'no';
  if (typeof v === 'object') return JSON.stringify(v);
  const s = String(v);
  // A cell starting with = + - @ runs as a formula in a spreadsheet. Numbers are safe.
  if (/^[=+\-@\t\r]/.test(s) && !/^-?\d+(\.\d+)?$/.test(s)) return `'${s}`;
  return s;
}

/** CSV text with a header row and a byte order mark, so Excel reads UTF-8. */
export function toCsv<T>(rows: T[], columns: CsvColumn<T>[]): string {
  const data = rows.map((r) => columns.map((c) => cell(c.value(r))));
  return '﻿' + Papa.unparse({ fields: columns.map((c) => c.header), data }, { newline: '\r\n' });
}

/** A download response for a route handler. */
export function csvResponse(filename: string, csv: string): Response {
  const safe = filename.replace(/[^a-zA-Z0-9._-]+/g, '-');
  return new Response(csv, {
    headers: {
      'content-type': 'text/csv; charset=utf-8',
      'content-disposition': `attachment; filename="${safe}"`,
      'cache-control': 'no-store',
    },
  });
}

export type ExportObject = 'organizations' | 'contacts' | 'leads' | 'deals' | 'projects' | 'tickets' | 'invoices' | 'tasks';

type Spec = { label: string; entity: CustomObjectType; query: (db: Db) => Promise<Record<string, unknown>[]>; columns: [string, string][] };

/** [header, row key] pairs. Header names match the import aliases where the import supports them. */
const SPECS: Record<ExportObject, Spec> = {
  organizations: {
    label: 'Organizations',
    entity: 'organization',
    query: (db) => db`
      select o.*, (select string_agg(d.domain_normalised, '; ' order by d.is_primary desc, d.domain_normalised) from organization_domains d where d.organization_id = o.id) as domains,
             ow.email as owner_email, am.email as account_manager_email
        from organizations o left join users ow on ow.id = o.owner_user_id left join users am on am.id = o.account_manager_user_id
       where o.deleted_at is null order by o.name`,
    columns: [
      ['CRM id', 'id'], ['Name', 'name'], ['Domain', 'domains'], ['Industry', 'industry'], ['Type', 'org_type'], ['Lifecycle stage', 'lifecycle_stage'],
      ['Relationship', 'relationship_status'], ['Employees', 'employee_band'], ['City', 'city'], ['Country', 'country'], ['Address', 'address'],
      ['LinkedIn', 'linkedin_url'], ['KvK number', 'kvk_number'], ['VAT number', 'vat_number'], ['Health', 'health'], ['Owner', 'owner_email'],
      ['Account manager', 'account_manager_email'], ['Source', 'source'], ['Created', 'created_at'],
    ],
  },
  contacts: {
    label: 'Contacts',
    entity: 'contact',
    query: (db) => db`
      select c.*, o.name as org_name,
             (select d.domain_normalised from organization_domains d where d.organization_id = c.primary_org_id order by d.is_primary desc limit 1) as org_domain,
             (select string_agg(e.email, '; ' order by e.is_primary desc, e.email) from contact_emails e where e.contact_id = c.id) as emails,
             (select string_agg(p.phone, '; ' order by p.is_primary desc) from contact_phones p where p.contact_id = c.id) as phones,
             ow.email as owner_email
        from contacts c left join organizations o on o.id = c.primary_org_id left join users ow on ow.id = c.owner_user_id
       where c.deleted_at is null order by c.full_name`,
    columns: [
      ['CRM id', 'id'], ['First name', 'first_name'], ['Last name', 'last_name'], ['Email', 'emails'], ['Phone', 'phones'], ['Job title', 'job_title'],
      ['LinkedIn URL', 'linkedin_url'], ['Headline', 'tagline'], ['Company', 'org_name'], ['Website', 'org_domain'], ['Contact city', 'city'],
      ['Contact country', 'country'], ['Language', 'language'], ['Lifecycle stage', 'lifecycle_stage'], ['Lawful basis', 'lawful_basis'],
      ['Do not contact', 'do_not_contact'], ['Owner', 'owner_email'], ['Source', 'source'], ['Created', 'created_at'],
    ],
  },
  leads: {
    label: 'Leads',
    entity: 'lead',
    query: (db) => db`
      select l.*, s.name as stage_name, p.name as pipeline_name, c.full_name as contact_name, o.name as org_name, ow.email as owner_email
        from leads l join pipeline_stages s on s.id = l.stage_id join pipelines p on p.id = l.pipeline_id
        left join contacts c on c.id = l.contact_id left join organizations o on o.id = l.organization_id left join users ow on ow.id = l.owner_user_id
       where l.deleted_at is null order by l.created_at desc`,
    columns: [
      ['CRM id', 'id'], ['Name', 'name'], ['Contact', 'contact_name'], ['Company', 'org_name'], ['Pipeline', 'pipeline_name'], ['Stage', 'stage_name'],
      ['Label', 'label'], ['Research status', 'research_status'], ['Angle', 'angle'], ['Worth', 'angle_worth_eur'], ['Next step', 'next_step'],
      ['Disqualify reason', 'disqualify_reason'], ['Disqualify note', 'disqualify_note'], ['Source', 'source'], ['Campaign', 'campaign'], ['Owner', 'owner_email'], ['Created', 'created_at'],
    ],
  },
  deals: {
    label: 'Deals',
    entity: 'deal',
    query: (db) => db`
      select d.*, w.stage_name, w.probability, w.weighted_amount, p.name as pipeline_name, o.name as org_name,
             (select x.domain_normalised from organization_domains x where x.organization_id = d.organization_id order by x.is_primary desc limit 1) as org_domain,
             ow.email as owner_email
        from deals d join v_deal_weighted w on w.deal_id = d.id join pipelines p on p.id = d.pipeline_id
        left join organizations o on o.id = d.organization_id left join users ow on ow.id = d.owner_user_id
       where d.deleted_at is null order by d.created_at desc`,
    columns: [
      ['CRM id', 'id'], ['Deal name', 'name'], ['Company', 'org_name'], ['Website', 'org_domain'], ['Pipeline', 'pipeline_name'], ['Stage', 'stage_name'],
      ['Amount', 'amount'], ['Currency', 'currency'], ['Probability', 'probability'], ['Weighted amount', 'weighted_amount'], ['Close date', 'close_date'],
      ['Deal type', 'deal_type'], ['Next step', 'next_step'], ['Owner email', 'owner_email'], ['Won reason', 'won_reason'], ['Lost reason', 'lost_reason'], ['Lost note', 'lost_note'],
      ['Source', 'source'], ['Created', 'created_at'],
    ],
  },
  projects: {
    label: 'Projects',
    entity: 'project',
    query: (db) => db`
      select pr.*, s.name as stage_name, o.name as org_name, ow.email as owner_email,
             (select coalesce(sum(te.minutes), 0)::int from time_entries te where te.project_id = pr.id) as minutes_logged
        from projects pr left join pipeline_stages s on s.id = pr.stage_id left join organizations o on o.id = pr.organization_id
        left join users ow on ow.id = pr.owner_user_id
       where pr.deleted_at is null order by pr.created_at desc`,
    columns: [
      ['CRM id', 'id'], ['Name', 'name'], ['Kind', 'kind'], ['Company', 'org_name'], ['Stage', 'stage_name'], ['Status', 'status'], ['Health', 'health'],
      ['Start date', 'start_date'], ['Due date', 'due_date'], ['Budget', 'budget_amount'], ['Currency', 'currency'], ['Budget hours', 'budget_hours'],
      ['Minutes logged', 'minutes_logged'], ['Live URL', 'live_url'], ['Owner', 'owner_email'], ['Created', 'created_at'],
    ],
  },
  tickets: {
    label: 'Tickets',
    entity: 'ticket',
    query: (db) => db`
      select tk.*, s.name as stage_name, o.name as org_name, c.full_name as contact_name, ow.email as owner_email
        from tickets tk join pipeline_stages s on s.id = tk.stage_id left join organizations o on o.id = tk.organization_id
        left join contacts c on c.id = tk.contact_id left join users ow on ow.id = tk.owner_user_id
       where tk.deleted_at is null order by tk.number desc`,
    columns: [
      ['CRM id', 'id'], ['Number', 'number'], ['Subject', 'subject'], ['Company', 'org_name'], ['Contact', 'contact_name'], ['Status', 'stage_name'],
      ['Priority', 'priority'], ['Category', 'category'], ['Source', 'source'], ['Opened', 'opened_at'], ['First reply', 'first_replied_at'],
      ['Closed', 'closed_at'], ['Owner', 'owner_email'],
    ],
  },
  invoices: {
    label: 'Invoices',
    entity: 'invoice',
    query: (db) => db`
      select i.*, o.name as org_name from invoices i left join organizations o on o.id = i.organization_id
       where i.deleted_at is null order by i.created_at desc`,
    columns: [
      ['CRM id', 'id'], ['Number', 'external_number'], ['Title', 'title'], ['Company', 'org_name'], ['State', 'state'], ['Issue date', 'issue_date'],
      ['Due date', 'due_date'], ['Paid', 'paid_at'], ['VAT treatment', 'vat_treatment'], ['Currency', 'currency'], ['Subtotal', 'subtotal'],
      ['VAT', 'vat_amount'], ['Total', 'total'],
    ],
  },
  tasks: {
    label: 'Tasks',
    entity: 'task',
    query: (db) => db`
      select tk.*, ow.email as owner_email from tasks tk left join users ow on ow.id = tk.owner_user_id
       where tk.deleted_at is null order by tk.due_at nulls last`,
    columns: [
      ['CRM id', 'id'], ['Title', 'title'], ['Type', 'type'], ['Priority', 'priority'], ['Status', 'status'], ['Due', 'due_at'], ['Owner', 'owner_email'],
      ['Repeat', 'recurrence_rule'], ['Completed', 'completed_at'], ['Created', 'created_at'],
    ],
  },
};

export const EXPORT_OBJECTS: { value: ExportObject; label: string; entity: CustomObjectType }[] = (Object.keys(SPECS) as ExportObject[]).map((k) => ({
  value: k,
  label: SPECS[k].label,
  entity: SPECS[k].entity,
}));

export function isExportObject(v: string): v is ExportObject {
  return Object.prototype.hasOwnProperty.call(SPECS, v);
}

/** The whole object as CSV, custom fields last. */
export async function exportObject(objectType: ExportObject, db: Db = sql): Promise<{ filename: string; csv: string; count: number }> {
  const spec = SPECS[objectType];
  const [rows, defs] = await Promise.all([spec.query(db), getFieldDefinitions(spec.entity, {}, db)]);
  const columns: CsvColumn<Record<string, unknown>>[] = [
    ...spec.columns.map(([header, key]) => ({ header, value: (r: Record<string, unknown>) => r[key] })),
    ...defs
      .filter((d) => d.field_type !== 'calculation' && d.field_type !== 'rollup')
      .map((d) => ({ header: d.label, value: (r: Record<string, unknown>) => ((r.custom ?? {}) as Record<string, unknown>)[d.internal_name] })),
  ];
  const day = new Date().toISOString().slice(0, 10);
  return { filename: `${objectType}-${day}.csv`, csv: toCsv(rows, columns), count: rows.length };
}

/** Row counts for the export page. */
export async function exportCounts(db: Db = sql): Promise<Record<ExportObject, number>> {
  const [r] = await db<Record<ExportObject, number>[]>`
    select (select count(*)::int from organizations where deleted_at is null) as organizations,
           (select count(*)::int from contacts where deleted_at is null) as contacts,
           (select count(*)::int from leads where deleted_at is null) as leads,
           (select count(*)::int from deals where deleted_at is null) as deals,
           (select count(*)::int from projects where deleted_at is null) as projects,
           (select count(*)::int from tickets where deleted_at is null) as tickets,
           (select count(*)::int from invoices where deleted_at is null) as invoices,
           (select count(*)::int from tasks where deleted_at is null) as tasks`;
  return r;
}
