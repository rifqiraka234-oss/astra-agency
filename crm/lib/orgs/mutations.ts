/**
 * lib/orgs/mutations.ts (agent A), every write for organizations and contacts.
 * Each function takes the caller's transaction so it commits with the rest of
 * the change and the audit trigger records the actor. Server actions in
 * app/(app)/organizations/_actions and app/(app)/contacts/_actions wrap these
 * with requireUser, can() and revalidatePath; tests in tests/a call them inside
 * withRollback.
 *
 *   await tx((t) => addOrgDomain(t, orgId, 'https://www.dekade.nl/taproom'), { userId });
 *
 * A friendly problem (duplicate, bad input) throws InputError with the form
 * field it belongs to and, for duplicates, the DupeMatch to link to. Unique
 * inserts run in a savepoint so a lost race on the unique index becomes the
 * same InputError instead of aborting the caller's transaction.
 */
import type { Tx } from '../db';
import { isUniqueViolation } from '../db';
import { emailDomain, isFreeMail, normDomain, normEmail, normLinkedin, normPhone } from '../normalize';
import { findContactByEmail, findContactByLinkedin, findOrgByDomain } from '../dupes';
import { logActivity, type ActivityKind, type ActivityLink } from '../activities';
import type { DupeMatch } from '../forms';

export class InputError extends Error {
  field?: string;
  duplicate?: DupeMatch | null;
  constructor(message: string, field?: string, duplicate?: DupeMatch | null) {
    super(message);
    this.name = 'InputError';
    this.field = field;
    this.duplicate = duplicate ?? null;
  }
}

export type Actor = { id: string | null; name: string };

/** Runs fn in a savepoint, turning a unique violation into onDupe()'s InputError. */
async function guarded<T>(t: Tx, fn: (sp: Tx) => Promise<T>, onDupe: () => Promise<InputError>): Promise<T> {
  try {
    return (await t.savepoint((sp) => fn(sp as unknown as Tx))) as T;
  } catch (err) {
    if (isUniqueViolation(err)) throw await onDupe();
    throw err;
  }
}

async function freeMailDomains(t: Tx): Promise<string[]> {
  const rows = await t<{ domain: string }[]>`select domain from free_mail_domains`;
  return rows.map((r) => r.domain);
}

/** True when the domain is free mail, by the built in list or the editable table. */
export async function isFreeMailDomain(t: Tx, domain: string): Promise<boolean> {
  return isFreeMail(domain, await freeMailDomains(t));
}

// ---------------------------------------------------------------- organizations

export const ORG_EDITABLE_COLUMNS = [
  'name', 'industry', 'org_type', 'lifecycle_stage', 'relationship_status', 'owner_user_id', 'account_manager_user_id',
  'employee_band', 'annual_revenue', 'linkedin_url', 'address', 'city', 'country', 'time_zone', 'icp_tier', 'kvk_number',
  'vat_number', 'health', 'renewal_date', 'next_checkin_date', 'checkin_cadence_days', 'source', 'description',
  'lawful_basis',
] as const;
export type OrgColumn = (typeof ORG_EDITABLE_COLUMNS)[number];

/** Update core columns (only the ones given) and merge custom values. */
export async function updateOrganization(
  t: Tx,
  orgId: string,
  patch: Partial<Record<OrgColumn, unknown>>,
  custom?: Record<string, unknown>,
): Promise<void> {
  const cols = Object.keys(patch).filter((k) => (ORG_EDITABLE_COLUMNS as readonly string[]).includes(k));
  if (cols.length) {
    const row = Object.fromEntries(cols.map((k) => [k, patch[k as OrgColumn] ?? null])) as Record<string, any>;
    await t`update organizations set ${t(row, cols)} where id = ${orgId} and deleted_at is null`;
  }
  if (custom && Object.keys(custom).length) {
    await guarded(
      t,
      (sp) => sp`update organizations set custom = custom || ${sp.json(custom as never)} where id = ${orgId}`,
      async () => new InputError('Another organization already has that value', undefined),
    );
  }
}

/** Add a domain to an organization. Returns the stored, normalised domain. */
export async function addOrgDomain(t: Tx, orgId: string, raw: string, opts: { makePrimary?: boolean } = {}): Promise<string> {
  const domain = normDomain(raw);
  if (!domain) throw new InputError('Enter a website or domain like dekade.nl', 'domain');
  if (await isFreeMailDomain(t, domain)) {
    throw new InputError(`${domain} is a free mail domain, so it can't identify an organization`, 'domain');
  }
  const dupe = await findOrgByDomain(domain, t);
  if (dupe) {
    if (dupe.id === orgId) throw new InputError(`${domain} is already on this organization`, 'domain');
    throw new InputError(dupe.title, 'domain', dupe);
  }
  const [{ has_primary }] = await t<{ has_primary: boolean }[]>`
    select exists (select 1 from organization_domains where organization_id = ${orgId} and is_primary) as has_primary`;
  const primary = Boolean(opts.makePrimary) || !has_primary;
  await guarded(
    t,
    async (sp) => {
      if (primary) await sp`update organization_domains set is_primary = false where organization_id = ${orgId} and is_primary`;
      await sp`insert into organization_domains (organization_id, domain_normalised, is_primary) values (${orgId}, ${domain}, ${primary})`;
    },
    async () => {
      const again = await findOrgByDomain(domain, t);
      return new InputError(again?.title ?? `${domain} already belongs to an organization`, 'domain', again);
    },
  );
  const [org] = await t<{ do_not_contact: boolean }[]>`select do_not_contact from organizations where id = ${orgId}`;
  if (org?.do_not_contact) await suppress(t, 'domain', domain, null, 'Organization marked do not contact', null);
  return domain;
}

/** Remove a domain. When it was the primary one, the oldest remaining domain becomes primary. */
export async function removeOrgDomain(t: Tx, orgId: string, domainId: string): Promise<void> {
  const [gone] = await t<{ is_primary: boolean }[]>`
    delete from organization_domains where id = ${domainId} and organization_id = ${orgId} returning is_primary`;
  if (!gone) throw new InputError('That domain is not on this organization');
  if (gone.is_primary) {
    await t`
      update organization_domains set is_primary = true
       where id = (select id from organization_domains where organization_id = ${orgId} order by created_at, domain_normalised limit 1)`;
  }
}

export async function setPrimaryDomain(t: Tx, orgId: string, domainId: string): Promise<void> {
  const [hit] = await t<{ id: string }[]>`select id from organization_domains where id = ${domainId} and organization_id = ${orgId}`;
  if (!hit) throw new InputError('That domain is not on this organization');
  await t`update organization_domains set is_primary = false where organization_id = ${orgId} and is_primary and id <> ${domainId}`;
  await t`update organization_domains set is_primary = true where id = ${domainId}`;
}

export async function setAccountManager(t: Tx, orgId: string, userId: string | null): Promise<void> {
  if (userId) {
    const [u] = await t<{ id: string }[]>`select id from users where id = ${userId} and is_active`;
    if (!u) throw new InputError('Pick an active user', 'account_manager_user_id');
  }
  await t`update organizations set account_manager_user_id = ${userId} where id = ${orgId}`;
}

// ---------------------------------------------------------------- suppression

async function suppress(t: Tx, kind: 'email' | 'domain' | 'linkedin' | 'contact', value: string, contactId: string | null, reason: string, addedBy: string | null) {
  await t`
    insert into suppression_list (kind, value, contact_id, reason, added_by)
    values (${kind}, ${value}, ${contactId}, ${reason}, ${addedBy})
    on conflict (kind, value) do nothing`;
}

/** Do not contact on an organization: the flag plus every domain on the suppression list. */
export async function setOrgDoNotContact(t: Tx, orgId: string, value: boolean, actor: Actor): Promise<void> {
  await t`update organizations set do_not_contact = ${value} where id = ${orgId}`;
  const domains = await t<{ domain_normalised: string }[]>`select domain_normalised from organization_domains where organization_id = ${orgId}`;
  if (value) {
    for (const d of domains) await suppress(t, 'domain', d.domain_normalised, null, `Organization marked do not contact by ${actor.name}`, actor.id);
  } else if (domains.length) {
    await t`delete from suppression_list where kind = 'domain' and value in ${t(domains.map((d) => d.domain_normalised))}`;
  }
}

/** Do not contact on a contact: the flag, objected_at, and the contact, its emails and LinkedIn on the suppression list. */
export async function setContactDoNotContact(t: Tx, contactId: string, value: boolean, actor: Actor): Promise<void> {
  const [c] = await t<{ do_not_contact: boolean; linkedin_url_normalised: string | null }[]>`
    select do_not_contact, linkedin_url_normalised from contacts where id = ${contactId} and deleted_at is null`;
  if (!c) throw new InputError('Contact not found');
  if (value) {
    await t`update contacts set do_not_contact = true, objected_at = coalesce(objected_at, now()) where id = ${contactId}`;
    const reason = `Marked do not contact by ${actor.name}`;
    await suppress(t, 'contact', contactId, contactId, reason, actor.id);
    const emails = await t<{ email: string }[]>`select lower(trim(email)) as email from contact_emails where contact_id = ${contactId}`;
    for (const e of emails) await suppress(t, 'email', e.email, contactId, reason, actor.id);
    if (c.linkedin_url_normalised) await suppress(t, 'linkedin', c.linkedin_url_normalised, contactId, reason, actor.id);
  } else {
    await t`update contacts set do_not_contact = false, objected_at = null where id = ${contactId}`;
    await t`delete from suppression_list where contact_id = ${contactId} or (kind = 'contact' and value = ${contactId})`;
  }
}

// ---------------------------------------------------------------- contacts

export const CONTACT_EDITABLE_COLUMNS = [
  'first_name', 'last_name', 'job_title', 'tagline', 'owner_user_id', 'lifecycle_stage', 'lawful_basis', 'city', 'country',
  'language', 'source',
] as const;
export type ContactColumn = (typeof CONTACT_EDITABLE_COLUMNS)[number];

export async function updateContact(
  t: Tx,
  contactId: string,
  patch: Partial<Record<ContactColumn, unknown>>,
  custom?: Record<string, unknown>,
): Promise<void> {
  const cols = Object.keys(patch).filter((k) => (CONTACT_EDITABLE_COLUMNS as readonly string[]).includes(k));
  if (cols.length) {
    const row = Object.fromEntries(cols.map((k) => [k, patch[k as ContactColumn] ?? null])) as Record<string, any>;
    await t`update contacts set ${t(row, cols)} where id = ${contactId} and deleted_at is null`;
  }
  if (custom && Object.keys(custom).length) {
    await guarded(
      t,
      (sp) => sp`update contacts set custom = custom || ${sp.json(custom as never)} where id = ${contactId}`,
      async () => new InputError('Another contact already has that value'),
    );
  }
}

/** Set or clear the LinkedIn profile. Unique on the normalised slug among live contacts. */
export async function setContactLinkedin(t: Tx, contactId: string, raw: string | null): Promise<string | null> {
  const value = raw?.trim() || null;
  if (!value) {
    await t`update contacts set linkedin_url = null, linkedin_url_normalised = null where id = ${contactId}`;
    return null;
  }
  const li = normLinkedin(value);
  if (!li) throw new InputError('Paste a profile link like linkedin.com/in/name', 'linkedin_url');
  const dupe = await findContactByLinkedin(li, t);
  if (dupe && dupe.id !== contactId) throw new InputError(dupe.title, 'linkedin_url', dupe);
  await guarded(
    t,
    (sp) => sp`update contacts set linkedin_url = ${`https://www.${li}`}, linkedin_url_normalised = ${li} where id = ${contactId}`,
    async () => {
      const again = await findContactByLinkedin(li, t);
      return new InputError(again?.title ?? 'That LinkedIn profile belongs to another contact', 'linkedin_url', again);
    },
  );
  const [c] = await t<{ do_not_contact: boolean }[]>`select do_not_contact from contacts where id = ${contactId}`;
  if (c?.do_not_contact) await suppress(t, 'linkedin', li, contactId, 'Contact marked do not contact', null);
  return li;
}

export const EMAIL_TYPES = ['work', 'personal', 'billing', 'other'] as const;
export const PHONE_TYPES = ['mobile', 'work', 'home', 'other'] as const;

/** Add an email. Unique across all contacts, case and spaces ignored. The first email becomes primary. */
export async function addContactEmail(
  t: Tx,
  contactId: string,
  raw: string,
  opts: { type?: (typeof EMAIL_TYPES)[number]; makePrimary?: boolean } = {},
): Promise<string> {
  const email = normEmail(raw);
  if (!email) throw new InputError('Enter an email address', 'email');
  const dupe = await findContactByEmail(email, t);
  if (dupe) {
    if (dupe.id === contactId) throw new InputError(`${email} is already on this contact`, 'email');
    throw new InputError(dupe.title, 'email', dupe);
  }
  const [{ has_primary }] = await t<{ has_primary: boolean }[]>`
    select exists (select 1 from contact_emails where contact_id = ${contactId} and is_primary) as has_primary`;
  const primary = Boolean(opts.makePrimary) || !has_primary;
  await guarded(
    t,
    async (sp) => {
      if (primary) await sp`update contact_emails set is_primary = false where contact_id = ${contactId} and is_primary`;
      await sp`insert into contact_emails (contact_id, email, type, is_primary) values (${contactId}, ${email}, ${opts.type ?? 'work'}, ${primary})`;
    },
    async () => {
      const again = await findContactByEmail(email, t);
      return new InputError(again?.title ?? 'That email belongs to another contact', 'email', again);
    },
  );
  const [c] = await t<{ do_not_contact: boolean }[]>`select do_not_contact from contacts where id = ${contactId}`;
  if (c?.do_not_contact) await suppress(t, 'email', email, contactId, 'Contact marked do not contact', null);
  return email;
}

export async function setPrimaryEmail(t: Tx, contactId: string, emailId: string): Promise<void> {
  const [hit] = await t<{ id: string }[]>`select id from contact_emails where id = ${emailId} and contact_id = ${contactId}`;
  if (!hit) throw new InputError('That email is not on this contact');
  await t`update contact_emails set is_primary = false where contact_id = ${contactId} and is_primary and id <> ${emailId}`;
  await t`update contact_emails set is_primary = true where id = ${emailId}`;
}

export async function removeContactEmail(t: Tx, contactId: string, emailId: string): Promise<void> {
  const [gone] = await t<{ is_primary: boolean }[]>`
    delete from contact_emails where id = ${emailId} and contact_id = ${contactId} returning is_primary`;
  if (!gone) throw new InputError('That email is not on this contact');
  if (gone.is_primary) {
    await t`
      update contact_emails set is_primary = true
       where id = (select id from contact_emails where contact_id = ${contactId} order by created_at limit 1)`;
  }
}

export async function addContactPhone(
  t: Tx,
  contactId: string,
  raw: string,
  opts: { type?: (typeof PHONE_TYPES)[number]; makePrimary?: boolean } = {},
): Promise<string> {
  const phone = raw.trim();
  const normalised = normPhone(phone);
  if (!normalised) throw new InputError('Enter a phone number with at least 8 digits', 'phone');
  const [same] = await t<{ id: string }[]>`
    select id from contact_phones where contact_id = ${contactId} and phone_normalised = ${normalised}`;
  if (same) throw new InputError(`${phone} is already on this contact`, 'phone');
  const [{ has_primary }] = await t<{ has_primary: boolean }[]>`
    select exists (select 1 from contact_phones where contact_id = ${contactId} and is_primary) as has_primary`;
  const primary = Boolean(opts.makePrimary) || !has_primary;
  if (primary) await t`update contact_phones set is_primary = false where contact_id = ${contactId} and is_primary`;
  await t`
    insert into contact_phones (contact_id, phone, phone_normalised, type, is_primary)
    values (${contactId}, ${phone}, ${normalised}, ${opts.type ?? 'mobile'}, ${primary})`;
  return normalised;
}

export async function setPrimaryPhone(t: Tx, contactId: string, phoneId: string): Promise<void> {
  const [hit] = await t<{ id: string }[]>`select id from contact_phones where id = ${phoneId} and contact_id = ${contactId}`;
  if (!hit) throw new InputError('That phone number is not on this contact');
  await t`update contact_phones set is_primary = false where contact_id = ${contactId} and is_primary and id <> ${phoneId}`;
  await t`update contact_phones set is_primary = true where id = ${phoneId}`;
}

export async function removeContactPhone(t: Tx, contactId: string, phoneId: string): Promise<void> {
  const [gone] = await t<{ is_primary: boolean }[]>`
    delete from contact_phones where id = ${phoneId} and contact_id = ${contactId} returning is_primary`;
  if (!gone) throw new InputError('That phone number is not on this contact');
  if (gone.is_primary) {
    await t`
      update contact_phones set is_primary = true
       where id = (select id from contact_phones where contact_id = ${contactId} order by created_at limit 1)`;
  }
}

// ---------------------------------------------------------------- roles

export const RELATIONSHIPS = ['owner', 'founder', 'employee', 'advisor', 'former_owner', 'contractor', 'other'] as const;
export const BUYING_ROLE_VALUES = ['decision_maker', 'champion', 'billing_contact', 'influencer', 'user', 'signer', 'other'] as const;

export type AddRoleInput = {
  contactId: string;
  organizationId: string;
  relationship?: (typeof RELATIONSHIPS)[number];
  buyingRoles?: string[];
  title?: string | null;
  startDate?: string | null;
  isPrimary?: boolean;
  evidenceUrl?: string | null;
};

/**
 * Link a contact to an organization with a dated role. One current role per
 * contact and organization; a job change ends the old role and adds a new one.
 * The contact's first current role becomes primary and sets contacts.primary_org_id.
 */
export async function addContactRole(t: Tx, input: AddRoleInput): Promise<string> {
  const [c] = await t<{ id: string; full_name: string; primary_org_id: string | null }[]>`
    select id, full_name, primary_org_id from contacts where id = ${input.contactId} and deleted_at is null`;
  if (!c) throw new InputError('Pick a contact', 'contactId');
  const [o] = await t<{ id: string; name: string }[]>`select id, name from organizations where id = ${input.organizationId} and deleted_at is null`;
  if (!o) throw new InputError('Pick an organization', 'organizationId');
  const [current] = await t<{ id: string }[]>`
    select id from contact_org_roles where contact_id = ${c.id} and organization_id = ${o.id} and is_current`;
  if (current) throw new InputError(`${c.full_name} already has a current role at ${o.name}. End that role first.`, 'contactId');
  const roles = (input.buyingRoles ?? []).filter((r) => (BUYING_ROLE_VALUES as readonly string[]).includes(r));
  const [{ has_primary }] = await t<{ has_primary: boolean }[]>`
    select exists (select 1 from contact_org_roles where contact_id = ${c.id} and is_primary and is_current) as has_primary`;
  const primary = Boolean(input.isPrimary) || !has_primary;
  if (primary) await t`update contact_org_roles set is_primary = false where contact_id = ${c.id} and is_primary`;
  const [row] = await t<{ id: string }[]>`
    insert into contact_org_roles (contact_id, organization_id, relationship, buying_roles, title, is_primary, is_current, start_date, evidence_url)
    values (${c.id}, ${o.id}, ${input.relationship ?? 'employee'}, ${roles}, ${input.title ?? null}, ${primary}, true,
            ${input.startDate ?? null}, ${input.evidenceUrl ?? null})
    returning id`;
  if (primary) await t`update contacts set primary_org_id = ${o.id} where id = ${c.id}`;
  return row.id;
}

/**
 * End a role with an end date. The row stays as history (is_current false).
 * When it was the contact's primary role, the next current role takes over,
 * or primary_org_id is cleared.
 */
export async function endContactRole(t: Tx, roleId: string, endDate: string): Promise<void> {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(endDate)) throw new InputError('Pick an end date', 'end_date');
  const [r] = await t<{ id: string; contact_id: string; organization_id: string; is_current: boolean; is_primary: boolean; start_date: string | null }[]>`
    select id, contact_id, organization_id, is_current, is_primary, start_date from contact_org_roles where id = ${roleId}`;
  if (!r) throw new InputError('That role does not exist');
  if (!r.is_current) throw new InputError('That role has already ended');
  if (r.start_date && endDate < r.start_date) throw new InputError('The end date is before the start date', 'end_date');
  await t`update contact_org_roles set is_current = false, is_primary = false, end_date = ${endDate} where id = ${roleId}`;
  const [contact] = await t<{ primary_org_id: string | null }[]>`select primary_org_id from contacts where id = ${r.contact_id}`;
  if (r.is_primary || contact?.primary_org_id === r.organization_id) {
    const [next] = await t<{ id: string; organization_id: string }[]>`
      select id, organization_id from contact_org_roles
       where contact_id = ${r.contact_id} and is_current
       order by start_date desc nulls last, created_at desc limit 1`;
    if (next) {
      await t`update contact_org_roles set is_primary = true where id = ${next.id}`;
      await t`update contacts set primary_org_id = ${next.organization_id} where id = ${r.contact_id}`;
    } else {
      await t`update contacts set primary_org_id = null where id = ${r.contact_id}`;
    }
  }
}

// ---------------------------------------------------------------- create from a record page

/**
 * Create a contact and link it to an organization in one go (the "Add contact"
 * dialog on an organization). Dedup on email and LinkedIn first.
 */
export async function createContactAt(
  t: Tx,
  input: { firstName: string; lastName?: string | null; email?: string | null; linkedin?: string | null; ownerUserId: string | null } & Omit<AddRoleInput, 'contactId'>,
): Promise<string> {
  const email = input.email ? normEmail(input.email) : null;
  if (input.email && !email) throw new InputError('Enter an email address', 'email');
  if (email) {
    const dupe = await findContactByEmail(email, t);
    if (dupe) throw new InputError(dupe.title, 'email', dupe);
  }
  const li = input.linkedin ? normLinkedin(input.linkedin) : null;
  if (input.linkedin && !li) throw new InputError('Paste a profile link like linkedin.com/in/name', 'linkedin');
  if (li) {
    const dupe = await findContactByLinkedin(li, t);
    if (dupe) throw new InputError(dupe.title, 'linkedin', dupe);
  }
  const [c] = await t<{ id: string }[]>`
    insert into contacts (first_name, last_name, job_title, linkedin_url, linkedin_url_normalised, owner_user_id, source)
    values (${input.firstName}, ${input.lastName ?? null}, ${input.title ?? null}, ${li ? `https://www.${li}` : null}, ${li},
            ${input.ownerUserId}, 'manual')
    returning id`;
  if (email) await addContactEmail(t, c.id, email);
  await addContactRole(t, { ...input, contactId: c.id });
  return c.id;
}

/** The organization that owns an email's domain, never for free mail. */
export async function orgForEmail(t: Tx, email: string): Promise<{ id: string; name: string } | null> {
  const domain = emailDomain(email);
  if (!domain || (await isFreeMailDomain(t, domain))) return null;
  const hit = await findOrgByDomain(domain, t);
  return hit ? { id: hit.id, name: hit.name } : null;
}

// ---------------------------------------------------------------- timeline writes

/** Users mentioned as @Name (first name or full name) in a note. */
export async function mentionedUsers(t: Tx, body: string): Promise<{ id: string; name: string }[]> {
  const users = await t<{ id: string; name: string }[]>`select id, name from users where is_active`;
  const text = body.toLowerCase();
  return users.filter((u) => {
    const first = u.name.split(/\s+/)[0].toLowerCase();
    return new RegExp(`@(${escapeRe(u.name.toLowerCase())}|${escapeRe(first)})(?![a-z])`).test(text);
  });
}

function escapeRe(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** A note on the timeline, plus a notification for every @mentioned user. */
export async function addNote(
  t: Tx,
  input: { body: string; actor: Actor; links: ActivityLink[]; recordType: 'organization' | 'contact'; recordId: string; recordName: string; url: string },
): Promise<string> {
  const body = input.body.trim();
  if (!body) throw new InputError('Write something first', 'body');
  const { id } = await logActivity(
    { kind: 'note', title: `Note from ${input.actor.name}`, body, actorUserId: input.actor.id, links: input.links, autoLink: input.recordType === 'contact' },
    t,
  );
  for (const u of await mentionedUsers(t, body)) {
    if (u.id === input.actor.id) continue;
    await t`
      insert into notifications (user_id, kind, title, body, url, record_type, record_id)
      values (${u.id}, 'mention', ${`${input.actor.name} mentioned you on ${input.recordName}`}, ${body.slice(0, 280)},
              ${input.url}, ${input.recordType}, ${input.recordId})`;
  }
  return id;
}

export const LOGGABLE_KINDS = ['call', 'meeting', 'email', 'linkedin_message', 'note'] as const;
const KIND_WORDS: Record<(typeof LOGGABLE_KINDS)[number], string> = {
  call: 'Call',
  meeting: 'Meeting',
  email: 'Email',
  linkedin_message: 'LinkedIn message',
  note: 'Note',
};

/** Log a call, meeting, email or LinkedIn message that happened outside the CRM. */
export async function logManualActivity(
  t: Tx,
  input: {
    kind: (typeof LOGGABLE_KINDS)[number];
    direction: 'outbound' | 'inbound' | 'internal';
    occurredAt: Date;
    title?: string | null;
    body?: string | null;
    actor: Actor;
    links: ActivityLink[];
  },
): Promise<string> {
  const title = input.title?.trim() || `${KIND_WORDS[input.kind]} logged by ${input.actor.name}`;
  const { id } = await logActivity(
    {
      kind: input.kind as ActivityKind,
      direction: input.kind === 'note' ? 'internal' : input.direction,
      occurredAt: input.occurredAt,
      actorUserId: input.actor.id,
      title,
      body: input.body ?? null,
      links: input.links,
    },
    t,
  );
  if (input.kind === 'meeting') {
    await t`
      insert into meetings (activity_id, outcome, starts_at)
      values (${id}, ${input.occurredAt > new Date() ? 'scheduled' : 'completed'}, ${input.occurredAt})
      on conflict (activity_id) do nothing`;
  }
  return id;
}

/**
 * A draft email for the approval queue. Nothing is sent from V1: the message
 * waits in outbound_messages until someone approves it.
 */
export async function draftEmail(
  t: Tx,
  input: { contactId: string; organizationId?: string | null; subject: string; body: string; actor: Actor },
): Promise<string> {
  const [c] = await t<{ id: string; do_not_contact: boolean; full_name: string; primary_org_id: string | null }[]>`
    select id, do_not_contact, full_name, primary_org_id from contacts where id = ${input.contactId} and deleted_at is null`;
  if (!c) throw new InputError('Pick who it goes to', 'contactId');
  if (c.do_not_contact) throw new InputError(`${c.full_name} is marked do not contact`, 'contactId');
  const [suppressed] = await t<{ id: string }[]>`
    select s.id from suppression_list s
     where (s.kind = 'contact' and s.value = ${c.id}::text)
        or (s.kind = 'email' and s.value in (select lower(trim(email)) from contact_emails where contact_id = ${c.id}))
     limit 1`;
  if (suppressed) throw new InputError(`${c.full_name} is on the suppression list`, 'contactId');
  const [row] = await t<{ id: string }[]>`
    insert into outbound_messages (channel, via, kind, status, contact_id, organization_id, subject, body, created_by_user_id, owner_user_id)
    values ('email', 'gmail', 'other', 'awaiting_approval', ${c.id}, ${input.organizationId ?? c.primary_org_id}, ${input.subject},
            ${input.body}, ${input.actor.id}, ${input.actor.id})
    returning id`;
  return row.id;
}
