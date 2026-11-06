/**
 * lib/dupes.ts, the friendly duplicate check in front of the unique indexes.
 * Used by /api/dupes (live check in CreateDialog) and by create actions.
 *
 *   const hit = await findOrgByDomain('https://www.dekade.nl/taproom'); // DupeMatch | null
 *   const hit = await findContactByEmail('EVA@dekade.nl');
 *   const hit = await findContactByLinkedin('linkedin.com/in/eva-jansen');
 */
import { sql, type Db } from './db';
import { normDomain, normEmail, normLinkedin } from './normalize';
import { formatDate } from './format';
import type { DupeMatch } from './forms';

export const DUPE_RULES = {
  organization: 'Organizations are unique on every domain they own. Free mail domains like gmail.com never match.',
  contactEmail: 'Contacts are unique on email. A second email can be added to the existing record instead.',
  contactLinkedin: 'Contacts are unique on their LinkedIn profile, cleaned to the profile slug.',
};

function plural(n: number, one: string, many = `${one}s`) {
  return `${n} ${n === 1 ? one : many}`;
}

export async function findOrgByDomain(input: string | null | undefined, db: Db = sql): Promise<DupeMatch | null> {
  const domain = normDomain(input);
  if (!domain) return null;
  const [row] = await db<
    { id: string; name: string; am_name: string | null; contacts: number; open_deals: number; projects: number }[]
  >`
    select o.id, o.name, am.name as am_name,
           (select count(*)::int from contact_org_roles r where r.organization_id = o.id and r.is_current) as contacts,
           (select count(*)::int from deals d join pipeline_stages s on s.id = d.stage_id
             where d.organization_id = o.id and d.deleted_at is null and s.state = 'open') as open_deals,
           (select count(*)::int from projects p where p.organization_id = o.id and p.deleted_at is null and p.status = 'active') as projects
      from organization_domains od
      join organizations o on o.id = od.organization_id
      left join users am on am.id = o.account_manager_user_id
     where od.domain_normalised = ${domain}
     limit 1`;
  if (!row) return null;
  const facts = [
    row.am_name ? `Account manager ${row.am_name}` : null,
    plural(row.contacts, 'contact'),
    plural(row.open_deals, 'open deal'),
    plural(row.projects, 'project'),
  ].filter(Boolean);
  const raw = (input ?? '').trim();
  const stripped = raw.toLowerCase() !== domain;
  return {
    type: 'organization',
    id: row.id,
    name: row.name,
    href: `/organizations/${row.id}`,
    title: `${domain} is already ${row.name}`,
    body: `${stripped ? 'Matched on domain after stripping https, www and the path. ' : 'Matched on domain. '}${facts.join(', ')}.`,
  };
}

async function contactMatch(db: Db, id: string, how: string): Promise<DupeMatch | null> {
  const [c] = await db<{ id: string; full_name: string; job_title: string | null; org_name: string | null; created_at: Date; source: string | null }[]>`
    select c.id, c.full_name, c.job_title, o.name as org_name, c.created_at, c.source
      from contacts c left join organizations o on o.id = c.primary_org_id
     where c.id = ${id}`;
  if (!c) return null;
  const role = c.job_title && c.org_name ? `${c.job_title} at ${c.org_name}` : c.org_name ?? c.job_title;
  const added = `added ${formatDate(c.created_at)}${c.source && c.source !== 'manual' && c.source !== 'seed' ? ` from ${c.source}` : ''}`;
  return {
    type: 'contact',
    id: c.id,
    name: c.full_name,
    href: `/contacts/${c.id}`,
    title: how,
    body: [c.full_name, role, added].filter(Boolean).join(', ') + '.',
  };
}

export async function findContactByEmail(input: string | null | undefined, db: Db = sql): Promise<DupeMatch | null> {
  const email = normEmail(input);
  if (!email) return null;
  const [row] = await db<{ contact_id: string; full_name: string }[]>`
    select e.contact_id, c.full_name from contact_emails e join contacts c on c.id = e.contact_id
     where lower(trim(e.email)) = ${email} limit 1`;
  if (!row) return null;
  const m = await contactMatch(db, row.contact_id, `This email already belongs to ${row.full_name}`);
  if (m && input && input.trim() !== email) {
    m.body += ` Emails are matched without case, so ${input.trim()} and ${email} are the same person.`;
  }
  return m;
}

export async function findContactByLinkedin(input: string | null | undefined, db: Db = sql): Promise<DupeMatch | null> {
  const li = normLinkedin(input);
  if (!li) return null;
  const [row] = await db<{ id: string; full_name: string }[]>`
    select id, full_name from contacts where linkedin_url_normalised = ${li} and deleted_at is null limit 1`;
  if (!row) return null;
  return contactMatch(db, row.id, `This LinkedIn profile already belongs to ${row.full_name}`);
}
