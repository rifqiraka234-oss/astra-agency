/**
 * lib/orgs/queries.ts (agent A), the reads behind /organizations and /contacts.
 * Lists take the URL search params (already parsed with parseListParams) and
 * return one page plus the total, so the CSV export uses the same filters.
 *
 *   const { rows, total } = await listOrganizations(parseOrgParams(searchParams));
 *   const org = await getOrganization(id);
 */
import { sql, type Db } from '../db';
import type { Option } from '../options';

export const PAGE_SIZE = 50;

type SP = Record<string, string | string[] | undefined>;

function one(sp: SP, key: string): string | null {
  const v = sp[key];
  const s = Array.isArray(v) ? v[0] : v;
  return s && s.trim() ? s.trim() : null;
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export const isUuid = (v: string | null | undefined): v is string => Boolean(v && UUID.test(v));

/** A user filter value: a user id, or 'none' for unassigned. */
function userFilter(v: string | null): string | null {
  if (!v) return null;
  return v === 'none' || isUuid(v) ? v : null;
}

function likePattern(q: string | null): string | null {
  if (!q) return null;
  return `%${q.toLowerCase().replace(/[\\%_]/g, (m) => `\\${m}`)}%`;
}

// ---------------------------------------------------------------- organizations list

export const ORG_SORTS = ['name', 'domain', 'industry', 'account_manager', 'open_value', 'last_activity', 'lifecycle', 'owner', 'created'] as const;
export type OrgSort = (typeof ORG_SORTS)[number];

export type OrgListParams = {
  q: string | null;
  owner: string | null;
  am: string | null;
  industry: string | null;
  lifecycle: string | null;
  sort: OrgSort;
  dir: 'asc' | 'desc';
  page: number;
};

export function parseOrgParams(sp: SP): OrgListParams {
  const sort = one(sp, 'sort') as OrgSort | null;
  return {
    q: one(sp, 'q'),
    owner: userFilter(one(sp, 'owner')),
    am: userFilter(one(sp, 'am')),
    industry: one(sp, 'industry'),
    lifecycle: one(sp, 'lifecycle'),
    sort: sort && ORG_SORTS.includes(sort) ? sort : 'name',
    dir: one(sp, 'dir') === 'desc' ? 'desc' : 'asc',
    page: Math.max(1, Number.parseInt(one(sp, 'page') ?? '1', 10) || 1),
  };
}

export type OrgListRow = {
  id: string;
  name: string;
  domain: string | null;
  domains: string[];
  industry: string | null;
  lifecycle_stage: string;
  city: string | null;
  country: string | null;
  owner_user_id: string | null;
  owner_name: string | null;
  account_manager_user_id: string | null;
  am_name: string | null;
  open_deal_value: string;
  open_deal_count: number;
  contact_count: number;
  last_activity_at: Date | null;
  created_at: Date;
  do_not_contact: boolean;
  sample: boolean;
};

export async function listOrganizations(p: OrgListParams, opts: { all?: boolean } = {}, db: Db = sql): Promise<{ rows: OrgListRow[]; total: number }> {
  const like = likePattern(p.q);
  const col = {
    name: db`lower(o.name)`,
    domain: db`pd.domain_normalised`,
    industry: db`lower(o.industry)`,
    account_manager: db`am.name`,
    open_value: db`s.open_deal_value`,
    last_activity: db`s.last_activity_at`,
    lifecycle: db`array_position(array['lead','opportunity','customer','former'], o.lifecycle_stage)`,
    owner: db`ow.name`,
    created: db`o.created_at`,
  }[p.sort];
  const order = p.dir === 'desc' ? db`${col} desc nulls last, lower(o.name)` : db`${col} asc nulls last, lower(o.name)`;
  const limit = opts.all ? 100000 : PAGE_SIZE;
  const offset = opts.all ? 0 : (p.page - 1) * PAGE_SIZE;
  const rows = await db<(OrgListRow & { total: number })[]>`
    select o.id, o.name, pd.domain_normalised as domain,
           coalesce((select array_agg(d.domain_normalised order by d.is_primary desc, d.domain_normalised)
                       from organization_domains d where d.organization_id = o.id), '{}') as domains,
           o.industry, o.lifecycle_stage, o.city, o.country, o.owner_user_id, ow.name as owner_name,
           o.account_manager_user_id, am.name as am_name,
           s.open_deal_value::text as open_deal_value, s.open_deal_count::int as open_deal_count, s.contact_count::int as contact_count,
           s.last_activity_at, o.created_at, o.do_not_contact, coalesce(o.custom->>'sample', 'false') = 'true' as sample,
           count(*) over ()::int as total
      from organizations o
      join v_org_summary s on s.organization_id = o.id
      left join users ow on ow.id = o.owner_user_id
      left join users am on am.id = o.account_manager_user_id
      left join lateral (
        select d.domain_normalised from organization_domains d where d.organization_id = o.id
         order by d.is_primary desc, d.created_at limit 1
      ) pd on true
     where o.deleted_at is null
       and (${like}::text is null or lower(o.name) like ${like}
            or exists (select 1 from organization_domains d where d.organization_id = o.id and d.domain_normalised like ${like}))
       and (${p.owner}::text is null or (${p.owner} = 'none' and o.owner_user_id is null) or o.owner_user_id::text = ${p.owner})
       and (${p.am}::text is null or (${p.am} = 'none' and o.account_manager_user_id is null) or o.account_manager_user_id::text = ${p.am})
       and (${p.industry}::text is null or o.industry = ${p.industry})
       and (${p.lifecycle}::text is null or o.lifecycle_stage = ${p.lifecycle})
     order by ${order}
     limit ${limit} offset ${offset}`;
  let total = rows[0]?.total ?? 0;
  if (!rows.length && offset > 0) total = (await listOrganizations({ ...p, page: 1 }, { all: true }, db)).rows.length;
  return { rows: rows.map(({ total: _t, ...r }) => r), total };
}

/** Distinct industries in use plus the standard list, for the filter. */
export async function industryOptions(db: Db = sql): Promise<Option[]> {
  const rows = await db<{ industry: string }[]>`
    select distinct industry from organizations where industry is not null and deleted_at is null order by industry`;
  return rows.map((r) => ({ value: r.industry, label: r.industry }));
}

export type UserOption = Option & { initials: string | null; avatar_bg: string | null; avatar_fg: string | null };

export async function userOptions(db: Db = sql): Promise<UserOption[]> {
  const rows = await db<{ id: string; name: string; initials: string | null; avatar_bg: string | null; avatar_fg: string | null }[]>`
    select id, name, initials, avatar_bg, avatar_fg from users where is_active order by name`;
  return rows.map((u) => ({ value: u.id, label: u.name, initials: u.initials, avatar_bg: u.avatar_bg, avatar_fg: u.avatar_fg }));
}

// ---------------------------------------------------------------- contacts list

export const CONTACT_SORTS = ['name', 'email', 'organization', 'job_title', 'owner', 'last_activity', 'created'] as const;
export type ContactSort = (typeof CONTACT_SORTS)[number];

export type ContactListParams = {
  q: string | null;
  owner: string | null;
  lifecycle: string | null;
  privacy: 'dnc' | 'ok' | null;
  org: string | null;
  sort: ContactSort;
  dir: 'asc' | 'desc';
  page: number;
};

export function parseContactParams(sp: SP): ContactListParams {
  const sort = one(sp, 'sort') as ContactSort | null;
  const privacy = one(sp, 'privacy');
  const org = one(sp, 'org');
  return {
    q: one(sp, 'q'),
    owner: userFilter(one(sp, 'owner')),
    lifecycle: one(sp, 'lifecycle'),
    privacy: privacy === 'dnc' || privacy === 'ok' ? privacy : null,
    org: isUuid(org) ? org : null,
    sort: sort && CONTACT_SORTS.includes(sort) ? sort : 'name',
    dir: one(sp, 'dir') === 'desc' ? 'desc' : 'asc',
    page: Math.max(1, Number.parseInt(one(sp, 'page') ?? '1', 10) || 1),
  };
}

export type ContactListRow = {
  id: string;
  full_name: string;
  first_name: string;
  last_name: string | null;
  job_title: string | null;
  email: string | null;
  phone: string | null;
  linkedin_url: string | null;
  org_id: string | null;
  org_name: string | null;
  owner_user_id: string | null;
  owner_name: string | null;
  lifecycle_stage: string;
  do_not_contact: boolean;
  lawful_basis: string | null;
  last_activity_at: Date | null;
  created_at: Date;
  sample: boolean;
};

export async function listContacts(p: ContactListParams, opts: { all?: boolean } = {}, db: Db = sql): Promise<{ rows: ContactListRow[]; total: number }> {
  const like = likePattern(p.q);
  const col = {
    name: db`lower(c.full_name)`,
    email: db`pe.email`,
    organization: db`lower(o.name)`,
    job_title: db`lower(c.job_title)`,
    owner: db`ow.name`,
    last_activity: db`la.last_activity_at`,
    created: db`c.created_at`,
  }[p.sort];
  const order = p.dir === 'desc' ? db`${col} desc nulls last, lower(c.full_name)` : db`${col} asc nulls last, lower(c.full_name)`;
  const limit = opts.all ? 100000 : PAGE_SIZE;
  const offset = opts.all ? 0 : (p.page - 1) * PAGE_SIZE;
  const rows = await db<(ContactListRow & { total: number })[]>`
    select c.id, c.full_name, c.first_name, c.last_name, c.job_title, pe.email, pp.phone, c.linkedin_url,
           o.id as org_id, o.name as org_name, c.owner_user_id, ow.name as owner_name, c.lifecycle_stage,
           c.do_not_contact, c.lawful_basis, la.last_activity_at, c.created_at,
           coalesce(c.custom->>'sample', 'false') = 'true' as sample,
           count(*) over ()::int as total
      from contacts c
      left join organizations o on o.id = c.primary_org_id and o.deleted_at is null
      left join users ow on ow.id = c.owner_user_id
      left join v_last_activity_contact la on la.contact_id = c.id
      left join lateral (
        select e.email from contact_emails e where e.contact_id = c.id order by e.is_primary desc, e.created_at limit 1
      ) pe on true
      left join lateral (
        select ph.phone from contact_phones ph where ph.contact_id = c.id order by ph.is_primary desc, ph.created_at limit 1
      ) pp on true
     where c.deleted_at is null
       and (${like}::text is null or lower(c.full_name) like ${like}
            or exists (select 1 from contact_emails e where e.contact_id = c.id and lower(e.email) like ${like}))
       and (${p.owner}::text is null or (${p.owner} = 'none' and c.owner_user_id is null) or c.owner_user_id::text = ${p.owner})
       and (${p.lifecycle}::text is null or c.lifecycle_stage = ${p.lifecycle})
       and (${p.privacy}::text is null or c.do_not_contact = (${p.privacy} = 'dnc'))
       and (${p.org}::uuid is null or exists (select 1 from contact_org_roles r where r.contact_id = c.id and r.organization_id = ${p.org}))
     order by ${order}
     limit ${limit} offset ${offset}`;
  let total = rows[0]?.total ?? 0;
  if (!rows.length && offset > 0) total = (await listContacts({ ...p, page: 1 }, { all: true }, db)).rows.length;
  return { rows: rows.map(({ total: _t, ...r }) => r), total };
}

// ---------------------------------------------------------------- organization record

export type OrgRecord = {
  id: string;
  name: string;
  industry: string | null;
  org_type: string;
  lifecycle_stage: string;
  relationship_status: string;
  owner_user_id: string | null;
  owner_name: string | null;
  account_manager_user_id: string | null;
  am_name: string | null;
  employee_band: string | null;
  annual_revenue: string | null;
  currency: string;
  linkedin_url: string | null;
  address: string | null;
  city: string | null;
  country: string | null;
  kvk_number: string | null;
  vat_number: string | null;
  health: string | null;
  renewal_date: string | null;
  next_checkin_date: string | null;
  checkin_cadence_days: number | null;
  source: string | null;
  description: string | null;
  lawful_basis: string;
  do_not_contact: boolean;
  custom: Record<string, unknown>;
  created_at: Date;
  customer_since: Date | null;
  won_value: string;
  paid_value: string;
  open_deal_value: string;
  last_activity_at: Date | null;
};

export async function getOrganization(id: string, db: Db = sql): Promise<OrgRecord | null> {
  if (!isUuid(id)) return null;
  const [row] = await db<OrgRecord[]>`
    select o.id, o.name, o.industry, o.org_type, o.lifecycle_stage, o.relationship_status, o.owner_user_id, ow.name as owner_name,
           o.account_manager_user_id, am.name as am_name, o.employee_band, o.annual_revenue::text as annual_revenue, o.currency,
           o.linkedin_url, o.address, o.city, o.country, o.kvk_number, o.vat_number, o.health, o.renewal_date,
           o.next_checkin_date, o.checkin_cadence_days, o.source, o.description, o.lawful_basis, o.do_not_contact,
           o.custom, o.created_at, s.customer_since, s.won_value::text as won_value, s.paid_value::text as paid_value,
           s.open_deal_value::text as open_deal_value, s.last_activity_at
      from organizations o
      join v_org_summary s on s.organization_id = o.id
      left join users ow on ow.id = o.owner_user_id
      left join users am on am.id = o.account_manager_user_id
     where o.id = ${id} and o.deleted_at is null`;
  return row ?? null;
}

export type DomainRow = { id: string; domain_normalised: string; is_primary: boolean };

export async function orgDomains(orgId: string, db: Db = sql): Promise<DomainRow[]> {
  return db<DomainRow[]>`
    select id, domain_normalised, is_primary from organization_domains
     where organization_id = ${orgId} order by is_primary desc, created_at, domain_normalised`;
}

export type RoleRow = {
  id: string;
  contact_id: string;
  organization_id: string;
  full_name: string;
  org_name: string;
  relationship: string;
  buying_roles: string[];
  title: string | null;
  job_title: string | null;
  is_primary: boolean;
  is_current: boolean;
  start_date: string | null;
  end_date: string | null;
  email: string | null;
  last_contacted_at: Date | null;
  do_not_contact: boolean;
  current_org_name: string | null;
};

const roleSelect = (db: Db) => db`
  select r.id, r.contact_id, r.organization_id, c.full_name, o.name as org_name, r.relationship, r.buying_roles, r.title,
         c.job_title, r.is_primary, r.is_current, r.start_date, r.end_date,
         (select e.email from contact_emails e where e.contact_id = c.id order by e.is_primary desc, e.created_at limit 1) as email,
         la.last_contacted_at, c.do_not_contact,
         (select po.name from organizations po where po.id = c.primary_org_id) as current_org_name
    from contact_org_roles r
    join contacts c on c.id = r.contact_id and c.deleted_at is null
    join organizations o on o.id = r.organization_id
    left join v_last_activity_contact la on la.contact_id = c.id`;

/** Everyone who has or had a role at the organization. Current first. */
export async function orgRoles(orgId: string, db: Db = sql): Promise<RoleRow[]> {
  return db<RoleRow[]>`
    ${roleSelect(db)}
     where r.organization_id = ${orgId}
     order by r.is_current desc, r.is_primary desc,
              array_position(array['owner','founder','employee','contractor','advisor','other','former_owner'], r.relationship),
              r.start_date nulls last, c.full_name`;
}

/** Every organization a contact has or had a role at. Current first. */
export async function contactRoles(contactId: string, db: Db = sql): Promise<RoleRow[]> {
  return db<RoleRow[]>`
    ${roleSelect(db)}
     where r.contact_id = ${contactId}
     order by r.is_current desc, r.is_primary desc, r.end_date desc nulls first, r.start_date desc nulls last`;
}

export type DealRow = {
  id: string;
  name: string;
  pipeline_name: string;
  stage_name: string;
  stage_state: string;
  probability: number;
  amount: string | null;
  currency: string;
  close_date: string | null;
  won_at: Date | null;
  lost_at: Date | null;
  owner_name: string | null;
  org_id: string | null;
  org_name: string | null;
  role: string | null;
  next_task_title: string | null;
  next_task_due: Date | null;
  next_task_all_day: boolean | null;
};

const dealSelect = (db: Db) => db`
  select d.id, d.name, p.name as pipeline_name, w.stage_name, w.stage_state, w.probability::int as probability,
         d.amount::text as amount, d.currency, d.close_date, d.won_at, d.lost_at, u.name as owner_name,
         o.id as org_id, o.name as org_name, nt.title as next_task_title, nt.due_at as next_task_due, nt.all_day as next_task_all_day
    from deals d
    join v_deal_weighted w on w.deal_id = d.id
    join pipelines p on p.id = d.pipeline_id
    left join users u on u.id = d.owner_user_id
    left join organizations o on o.id = d.organization_id
    left join lateral (
      select t.title, t.due_at, t.all_day from task_links tl join tasks t on t.id = tl.task_id
       where tl.deal_id = d.id and t.status not in ('completed', 'cancelled') and t.deleted_at is null
       order by t.due_at nulls last limit 1
    ) nt on true`;

export async function orgDeals(orgId: string, db: Db = sql): Promise<DealRow[]> {
  return db<DealRow[]>`
    select x.*, null::text as role from (${dealSelect(db)} where d.organization_id = ${orgId} and d.deleted_at is null) x
     order by (x.stage_state = 'open') desc, x.close_date desc nulls last, x.name`;
}

/** Deals a contact is on through deal_contacts, with their role. */
export async function contactDeals(contactId: string, db: Db = sql): Promise<DealRow[]> {
  return db<DealRow[]>`
    select x.*, dc.role from (${dealSelect(db)} where d.deleted_at is null) x
      join deal_contacts dc on dc.deal_id = x.id and dc.contact_id = ${contactId}
     order by (x.stage_state = 'open') desc, x.close_date desc nulls last, x.name`;
}

export type ProjectRow = {
  id: string;
  name: string;
  status: string;
  health: string;
  stage_name: string | null;
  owner_name: string | null;
  due_date: string | null;
  budget_hours: string | null;
  minutes: number;
};

export async function orgProjects(orgId: string, db: Db = sql): Promise<ProjectRow[]> {
  return db<ProjectRow[]>`
    select p.id, p.name, p.status, p.health, s.name as stage_name, u.name as owner_name, p.due_date, p.budget_hours::text as budget_hours,
           coalesce((select sum(te.minutes) from time_entries te where te.project_id = p.id), 0)::int as minutes
      from projects p
      left join pipeline_stages s on s.id = p.stage_id
      left join users u on u.id = p.owner_user_id
     where p.organization_id = ${orgId} and p.deleted_at is null
     order by (p.status = 'active') desc, p.due_date nulls last, p.name`;
}

export type TicketRow = {
  id: string;
  number: number;
  subject: string;
  stage_name: string;
  stage_state: string;
  priority: string;
  owner_name: string | null;
  opened_at: Date;
  first_replied_at: Date | null;
  closed_at: Date | null;
  first_reply_minutes: number | null;
};

export async function orgTickets(orgId: string, db: Db = sql): Promise<TicketRow[]> {
  return db<TicketRow[]>`
    select t.id, t.number, t.subject, s.name as stage_name, s.state as stage_state, t.priority, u.name as owner_name,
           t.opened_at, t.first_replied_at, t.closed_at,
           coalesce(sp.first_reply_minutes, dp.first_reply_minutes) as first_reply_minutes
      from tickets t
      join pipeline_stages s on s.id = t.stage_id
      left join users u on u.id = t.owner_user_id
      left join sla_policies sp on sp.id = t.sla_policy_id
      left join sla_policies dp on dp.priority = t.priority and dp.is_default
     where t.organization_id = ${orgId} and t.deleted_at is null
     order by (s.state = 'open' and t.closed_at is null) desc, t.opened_at desc`;
}

export type InvoiceRow = {
  id: string;
  external_number: string | null;
  title: string | null;
  state: string;
  total: string | null;
  subtotal: string | null;
  currency: string;
  due_date: string | null;
  paid_at: Date | null;
  deal_name: string | null;
};

export async function orgInvoices(orgId: string, db: Db = sql): Promise<InvoiceRow[]> {
  return db<InvoiceRow[]>`
    select i.id, i.external_number, i.title, i.state, i.total::text as total, i.subtotal::text as subtotal, i.currency,
           i.due_date, i.paid_at, d.name as deal_name
      from invoices i left join deals d on d.id = i.deal_id
     where i.organization_id = ${orgId} and i.deleted_at is null
     order by (i.state = 'draft'), i.issue_date nulls last, i.created_at`;
}

// ---------------------------------------------------------------- contact record

export type ContactRecord = {
  id: string;
  first_name: string;
  last_name: string | null;
  full_name: string;
  job_title: string | null;
  tagline: string | null;
  linkedin_url: string | null;
  linkedin_url_normalised: string | null;
  primary_org_id: string | null;
  org_name: string | null;
  owner_user_id: string | null;
  owner_name: string | null;
  lifecycle_stage: string;
  lawful_basis: string | null;
  objected_at: Date | null;
  do_not_contact: boolean;
  city: string | null;
  country: string | null;
  language: string | null;
  linkedin_accepted_at: Date | null;
  source: string | null;
  custom: Record<string, unknown>;
  created_at: Date;
  last_activity_at: Date | null;
  last_contacted_at: Date | null;
  suppressed: boolean;
};

export async function getContact(id: string, db: Db = sql): Promise<ContactRecord | null> {
  if (!isUuid(id)) return null;
  const [row] = await db<ContactRecord[]>`
    select c.id, c.first_name, c.last_name, c.full_name, c.job_title, c.tagline, c.linkedin_url, c.linkedin_url_normalised,
           c.primary_org_id, o.name as org_name, c.owner_user_id, ow.name as owner_name, c.lifecycle_stage, c.lawful_basis,
           c.objected_at, c.do_not_contact, c.city, c.country, c.language, c.linkedin_accepted_at, c.source, c.custom, c.created_at,
           la.last_activity_at, la.last_contacted_at,
           exists (
             select 1 from suppression_list s
              where s.contact_id = c.id
                 or (s.kind = 'email' and s.value in (select lower(trim(e.email)) from contact_emails e where e.contact_id = c.id))
                 or (s.kind = 'linkedin' and s.value = c.linkedin_url_normalised)
                 or (s.kind = 'domain' and s.value in (select d.domain_normalised from organization_domains d where d.organization_id = c.primary_org_id))
           ) as suppressed
      from contacts c
      left join organizations o on o.id = c.primary_org_id
      left join users ow on ow.id = c.owner_user_id
      left join v_last_activity_contact la on la.contact_id = c.id
     where c.id = ${id} and c.deleted_at is null`;
  return row ?? null;
}

export type EmailRow = { id: string; email: string; type: string; is_primary: boolean; bounced_at: Date | null };
export type PhoneRow = { id: string; phone: string; phone_normalised: string | null; type: string; is_primary: boolean };

export async function contactEmails(contactId: string, db: Db = sql): Promise<EmailRow[]> {
  return db<EmailRow[]>`
    select id, email, type, is_primary, bounced_at from contact_emails where contact_id = ${contactId} order by is_primary desc, created_at`;
}

export async function contactPhones(contactId: string, db: Db = sql): Promise<PhoneRow[]> {
  return db<PhoneRow[]>`
    select id, phone, phone_normalised, type, is_primary from contact_phones where contact_id = ${contactId} order by is_primary desc, created_at`;
}

/** Contacts to pick from when adding someone to an organization. */
export async function contactPickList(excludeOrgId: string | null, db: Db = sql): Promise<Option[]> {
  const rows = await db<{ id: string; full_name: string; org_name: string | null }[]>`
    select c.id, c.full_name, o.name as org_name
      from contacts c left join organizations o on o.id = c.primary_org_id
     where c.deleted_at is null
       and (${excludeOrgId}::uuid is null or not exists (
             select 1 from contact_org_roles r where r.contact_id = c.id and r.organization_id = ${excludeOrgId} and r.is_current))
     order by lower(c.full_name) limit 1000`;
  return rows.map((r) => ({ value: r.id, label: r.org_name ? `${r.full_name}, ${r.org_name}` : r.full_name }));
}

export async function orgPickList(excludeContactId: string | null, db: Db = sql): Promise<Option[]> {
  const rows = await db<{ id: string; name: string; city: string | null }[]>`
    select o.id, o.name, o.city from organizations o
     where o.deleted_at is null
       and (${excludeContactId}::uuid is null or not exists (
             select 1 from contact_org_roles r where r.organization_id = o.id and r.contact_id = ${excludeContactId} and r.is_current))
     order by lower(o.name) limit 1000`;
  return rows.map((r) => ({ value: r.id, label: r.city ? `${r.name}, ${r.city}` : r.name }));
}
