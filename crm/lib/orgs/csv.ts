/**
 * lib/orgs/csv.ts (agent A), CSV for the organization and contact list exports.
 * Cells that start with = + - @ get a leading quote so a spreadsheet never runs them.
 */
import Papa from 'papaparse';
import type { ContactListRow, OrgListRow } from './queries';
import { labelOf, LIFECYCLE_STAGES, LAWFUL_BASES } from '../options';

function safe(v: unknown): string {
  if (v === null || v === undefined) return '';
  const s = v instanceof Date ? v.toISOString() : String(v);
  return /^[=+\-@\t\r]/.test(s) ? `'${s}` : s;
}

export function toCsv(header: string[], rows: unknown[][]): string {
  return Papa.unparse({ fields: header, data: rows.map((r) => r.map(safe)) }, { newline: '\r\n' });
}

export function organizationsCsv(rows: OrgListRow[]): string {
  return toCsv(
    ['Name', 'Primary domain', 'Domains', 'Industry', 'Lifecycle', 'Owner', 'Account manager', 'City', 'Country', 'Open deal value', 'Open deals', 'Contacts', 'Last activity', 'Created', 'Do not contact'],
    rows.map((o) => [
      o.name, o.domain, o.domains.join(' '), o.industry, labelOf(LIFECYCLE_STAGES, o.lifecycle_stage), o.owner_name, o.am_name,
      o.city, o.country, o.open_deal_value, o.open_deal_count, o.contact_count, o.last_activity_at, o.created_at,
      o.do_not_contact ? 'Yes' : 'No',
    ]),
  );
}

export function contactsCsv(rows: ContactListRow[]): string {
  return toCsv(
    ['First name', 'Last name', 'Email', 'Phone', 'LinkedIn', 'Job title', 'Organization', 'Owner', 'Lifecycle', 'Lawful basis', 'Do not contact', 'Last activity', 'Created'],
    rows.map((c) => [
      c.first_name, c.last_name, c.email, c.phone, c.linkedin_url, c.job_title, c.org_name, c.owner_name,
      labelOf(LIFECYCLE_STAGES, c.lifecycle_stage), labelOf(LAWFUL_BASES, c.lawful_basis), c.do_not_contact ? 'Yes' : 'No',
      c.last_activity_at, c.created_at,
    ]),
  );
}
