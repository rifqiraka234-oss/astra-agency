/**
 * lib/data/import.ts, CSV import with preview and revert (server only).
 *
 *   // preview: the real import inside a savepoint that is always rolled back,
 *   // so the counts include database rules (unique indexes and so on)
 *   const preview = await tx((t) => previewImport(t, { objectType, rows, mapping, userId }), { userId, source: 'import' });
 *
 *   // run: one import_jobs row, one import_rows row per line
 *   const res = await tx((t) => runImport(t, { objectType, fileName, rows, mapping, userId }), { userId, source: 'import' });
 *
 *   // revert: deletes what the import created, restores every value it changed
 *   await tx((t) => revertImport(t, jobId, userId), { userId, source: 'import' });
 *
 * Rules
 *   * Blank cells never wipe a value. Only non blank cells are written.
 *   * Contacts match on CRM id, then email, then LinkedIn. Organizations on CRM
 *     id, then domain. Deals on CRM id only.
 *   * A contacts import never overwrites an existing organization's values, it
 *     only fills the empty ones.
 *   * Each line runs in its own savepoint, so one bad line is skipped with a
 *     reason and the rest go in.
 *   * import_rows.before holds { changes: [{ table, id, before, after }], created: [{ table, id }] }.
 *     Revert restores a value only when it still holds what the import wrote,
 *     so later edits by people are kept (and counted as kept).
 */
import Papa from 'papaparse';
import type { Tx } from '@/lib/db';
import { getFieldDefinitions, validateCustom, type CustomObjectType } from '@/lib/fields';
import { normDomain, normEmail, normLinkedin, normPhone, isFreeMail, emailDomain, normCompanyName } from '@/lib/normalize';
import { INDUSTRIES, EMPLOYEE_BANDS, DEAL_TYPES } from '@/lib/options';
import { SettingsError } from '@/lib/settings/errors';
import type { ImportObject } from './import-fields';

export const MAX_IMPORT_ROWS = 5000;

export type ImportInput = {
  objectType: ImportObject;
  /** Parsed CSV rows keyed by header. */
  rows: Record<string, string>[];
  /** CSV header to target key ('' or missing means ignore the column). */
  mapping: Record<string, string>;
  userId: string | null;
};

export type RowOutcome = {
  line: number;
  status: 'created' | 'updated' | 'unchanged' | 'skipped';
  reason?: string;
  entityId?: string;
  warnings?: string[];
};

export type ImportCounts = { rows: number; created: number; updated: number; unchanged: number; skipped: number; orgsCreated: number };

export type ImportResult = { counts: ImportCounts; outcomes: RowOutcome[]; jobId?: string };

type Change = { table: string; id: string; before: Record<string, unknown>; after: Record<string, unknown> };
type Created = { table: string; id: string };

/** Tables an import may write, and therefore revert. */
const IMPORT_TABLES = new Set(['organizations', 'organization_domains', 'contacts', 'contact_emails', 'contact_phones', 'contact_org_roles', 'deals']);
const SOFT_DELETE_TABLES = new Set(['organizations', 'contacts', 'deals']);
const COL_RE = /^[a-z_][a-z0-9_]*$/;
const CUSTOM_KEY_RE = /^[a-z][a-z0-9_]{0,62}$/;

class Skip extends Error {}

/** Parse CSV text with a header row. Empty lines are dropped. */
export function parseCsv(text: string): { headers: string[]; rows: Record<string, string>[]; errors: string[] } {
  const res = Papa.parse<Record<string, string>>(text.replace(/^﻿/, ''), { header: true, skipEmptyLines: 'greedy', transformHeader: (h) => h.trim() });
  const headers = (res.meta.fields ?? []).filter((h) => h !== '');
  const rows = res.data.map((r) => {
    const out: Record<string, string> = {};
    for (const h of headers) out[h] = r[h] == null ? '' : String(r[h]);
    return out;
  });
  return { headers, rows, errors: res.errors.slice(0, 5).map((e) => `Line ${(e.row ?? 0) + 2}, ${e.message}`) };
}

// ---------------------------------------------------------------- value parsing

function parseDate(raw: string): string | null {
  const s = raw.trim();
  let m = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  let y: number, mo: number, d: number;
  if (m) [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])];
  else if ((m = s.match(/^(\d{1,2})[-/.](\d{1,2})[-/.](\d{4})$/))) [d, mo, y] = [Number(m[1]), Number(m[2]), Number(m[3])];
  else return null;
  const dt = new Date(Date.UTC(y, mo - 1, d));
  if (dt.getUTCFullYear() !== y || dt.getUTCMonth() !== mo - 1 || dt.getUTCDate() !== d) return null;
  return `${y}-${String(mo).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
}

/** '€ 1.500,50' -> '1500.50', '1,500.5' -> '1500.50'. Null when not an amount. */
export function parseMoney(raw: string): string | null {
  let s = raw.replace(/[€$£\s]/g, '').replace(/^EUR/i, '');
  if (!s) return null;
  const hasComma = s.includes(',');
  const hasDot = s.includes('.');
  if (hasComma && hasDot) {
    // The last separator is the decimal one.
    s = s.lastIndexOf(',') > s.lastIndexOf('.') ? s.replace(/\./g, '').replace(',', '.') : s.replace(/,/g, '');
  } else if (hasComma) {
    s = /^\d{1,3}(,\d{3})+$/.test(s) ? s.replace(/,/g, '') : s.replace(',', '.');
  } else if (hasDot && /^\d{1,3}(\.\d{3})+$/.test(s)) {
    s = s.replace(/\./g, '');
  }
  if (!/^\d{1,12}(\.\d{1,2})?$/.test(s)) return null;
  const [int, dec = ''] = s.split('.');
  return `${int}.${dec.padEnd(2, '0')}`;
}

function parseCountry(raw: string): string {
  const s = raw.trim().toUpperCase();
  const names: Record<string, string> = { NETHERLANDS: 'NL', 'THE NETHERLANDS': 'NL', NEDERLAND: 'NL', GERMANY: 'DE', DEUTSCHLAND: 'DE', BELGIUM: 'BE', BELGIE: 'BE', FRANCE: 'FR', 'UNITED KINGDOM': 'GB', UK: 'GB', ITALY: 'IT', SPAIN: 'ES' };
  const c = names[s] ?? s;
  if (!/^[A-Z]{2}$/.test(c)) throw new Skip(`Country "${raw}" is not a two letter code like NL`);
  return c;
}

function pickOption(options: { value: string; label: string }[], raw: string, what: string): string {
  const s = raw.trim().toLowerCase();
  const hit = options.find((o) => o.value.toLowerCase() === s || o.label.toLowerCase() === s);
  if (!hit) throw new Skip(`${what} "${raw}" is not one of the options`);
  return hit.value;
}

function splitName(full: string): { first: string; last: string | null } {
  const parts = full.trim().split(/\s+/);
  if (parts.length === 1) return { first: parts[0], last: null };
  return { first: parts[0], last: parts.slice(1).join(' ') };
}

function sameValue(a: unknown, b: unknown): boolean {
  if ((a === null || a === undefined || a === '') && (b === null || b === undefined || b === '')) return true;
  if (a === null || a === undefined || b === null || b === undefined) return false;
  const na = typeof a === 'number' ? a : Number(a);
  const nb = typeof b === 'number' ? b : Number(b);
  if (typeof a !== 'boolean' && typeof b !== 'boolean' && String(a).trim() !== '' && String(b).trim() !== '' && Number.isFinite(na) && Number.isFinite(nb)) return na === nb;
  if (Array.isArray(a) || Array.isArray(b) || typeof a === 'object' || typeof b === 'object') return JSON.stringify(a) === JSON.stringify(b);
  return String(a) === String(b);
}

function friendlyDbError(err: unknown): string {
  const e = err as { code?: string; constraint_name?: string; message?: string };
  if (e?.code === '23505') {
    if (e.constraint_name === 'contact_emails_norm_uq') return 'This email already belongs to another contact';
    if (e.constraint_name === 'contacts_linkedin_uq') return 'This LinkedIn profile already belongs to another contact';
    if (e.constraint_name?.startsWith('organization_domains')) return 'This domain already belongs to another organization';
    if (e.constraint_name?.startsWith('cf_uq_')) return 'A unique custom field value is already used by another record';
    return 'A value is already used by another record';
  }
  if (e?.code === '23514') return 'A value is not allowed for this field';
  if (e?.code === '22P02' || e?.code === '22007' || e?.code === '22008') return 'A value has the wrong format';
  return e?.message ? `Could not save, ${e.message}` : 'Could not save this line';
}

// ---------------------------------------------------------------- the recorder

class Recorder {
  changes: Change[] = [];
  created: Created[] = [];
  warnings: string[] = [];
  constructor(private t: Tx) {}

  async insert(table: string, row: Record<string, unknown>): Promise<string> {
    const [r] = await this.t<{ id: string }[]>`insert into ${this.t(table)} ${this.t(row as Record<string, any>)} returning id`;
    this.created.push({ table, id: r.id });
    return r.id;
  }

  /**
   * Write the non blank values in patch that differ from the record. Keys
   * 'custom.<key>' go into the custom jsonb. onlyEmpty fills empty values only.
   * Returns true when something changed.
   */
  async update(table: string, id: string, patch: Record<string, unknown>, opts: { onlyEmpty?: boolean } = {}): Promise<boolean> {
    const [cur] = await this.t<{ j: Record<string, unknown> }[]>`select to_jsonb(r) as j from ${this.t(table)} r where id = ${id} for update`;
    if (!cur) throw new Skip('The matched record no longer exists');
    const current = cur.j;
    const custom = (current.custom ?? {}) as Record<string, unknown>;
    const cols: Record<string, unknown> = {};
    const customPatch: Record<string, unknown> = {};
    const before: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(patch)) {
      if (v === null || v === undefined || v === '') continue;
      if (k.startsWith('custom.')) {
        const key = k.slice(7);
        const old = custom[key];
        if (opts.onlyEmpty && old !== null && old !== undefined && old !== '') continue;
        if (sameValue(old, v)) continue;
        customPatch[key] = v;
        before[k] = old ?? null;
      } else {
        const old = current[k];
        if (opts.onlyEmpty && old !== null && old !== undefined && old !== '') continue;
        if (sameValue(old, v)) continue;
        cols[k] = v;
        before[k] = old ?? null;
      }
    }
    if (!Object.keys(before).length) return false;
    if (Object.keys(cols).length) await this.t`update ${this.t(table)} set ${this.t(cols as Record<string, any>)} where id = ${id}`;
    if (Object.keys(customPatch).length) await this.t`update ${this.t(table)} set custom = custom || ${this.t.json(customPatch as never)} where id = ${id}`;
    const [after] = await this.t<{ j: Record<string, unknown> }[]>`select to_jsonb(r) as j from ${this.t(table)} r where id = ${id}`;
    const afterCustom = (after.j.custom ?? {}) as Record<string, unknown>;
    const afterVals: Record<string, unknown> = {};
    for (const k of Object.keys(before)) afterVals[k] = k.startsWith('custom.') ? afterCustom[k.slice(7)] ?? null : after.j[k] ?? null;
    this.changes.push({ table, id, before, after: afterVals });
    return true;
  }
}

// ---------------------------------------------------------------- context

type Ctx = {
  t: Tx;
  userId: string | null;
  defs: Partial<Record<CustomObjectType, Awaited<ReturnType<typeof getFieldDefinitions>>>>;
  users: { id: string; email: string }[];
  dealPipelines: { id: string; key: string; name: string; is_default: boolean }[];
  stages: { id: string; pipeline_id: string; key: string; name: string; position: number; state: string }[];
  orgsCreated: number;
};

function customValues(ctx: Ctx, objectType: CustomObjectType, values: Record<string, string>): Record<string, unknown> {
  const defs = ctx.defs[objectType] ?? [];
  const input: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(values)) if (k.startsWith('custom.')) input[k.slice(7)] = v;
  if (!Object.keys(input).length) return {};
  const res = validateCustom(defs, input, { partial: true });
  if (!res.ok) {
    const [key, msg] = Object.entries(res.errors)[0];
    const label = defs.find((d) => d.internal_name === key)?.label ?? key;
    throw new Skip(`${label}, ${msg}`);
  }
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(res.value)) if (v !== null && v !== '' && !(Array.isArray(v) && v.length === 0)) out[`custom.${k}`] = v;
  return out;
}

function stripCustomPrefix(patch: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(patch)) if (k.startsWith('custom.')) out[k.slice(7)] = v;
  return out;
}

/** Organization columns from the org.* cells of a line. */
function orgPatch(values: Record<string, string>): Record<string, unknown> {
  const p: Record<string, unknown> = {};
  if (values['org.name']) p.name = values['org.name'].trim().slice(0, 200);
  if (values['org.industry']) {
    const s = values['org.industry'].trim();
    p.industry = INDUSTRIES.find((o) => o.value.toLowerCase() === s.toLowerCase())?.value ?? s.slice(0, 100);
  }
  if (values['org.city']) p.city = values['org.city'].trim();
  if (values['org.country']) p.country = parseCountry(values['org.country']);
  if (values['org.employee_band']) p.employee_band = pickOption(EMPLOYEE_BANDS, values['org.employee_band'], 'Employees');
  if (values['org.address']) p.address = values['org.address'].trim();
  if (values['org.linkedin_url']) p.linkedin_url = values['org.linkedin_url'].trim();
  if (values['org.kvk_number']) p.kvk_number = values['org.kvk_number'].trim();
  if (values['org.vat_number']) p.vat_number = values['org.vat_number'].trim();
  if (values['org.description']) p.description = values['org.description'].trim();
  return p;
}

async function findOrgIdByDomain(t: Tx, domain: string): Promise<{ id: string; deleted: boolean } | null> {
  const [row] = await t<{ id: string; deleted_at: Date | null }[]>`
    select o.id, o.deleted_at from organization_domains d join organizations o on o.id = d.organization_id
     where d.domain_normalised = ${domain}`;
  return row ? { id: row.id, deleted: row.deleted_at !== null } : null;
}

/**
 * The organization a contact or deal line points at: matched on domain, then
 * on the exact name when exactly one live organization has it, else created.
 * An existing organization only gets its empty values filled.
 */
async function resolveOrg(ctx: Ctx, rec: Recorder, values: Record<string, string>, fallbackEmail: string | null): Promise<string | null> {
  const name = values['org.name']?.trim() || null;
  const rawDomain = values['org.domain']?.trim() || null;
  let domain: string | null = null;
  if (rawDomain) {
    domain = normDomain(rawDomain);
    if (!domain) throw new Skip(`Domain "${rawDomain}" is not a website or domain`);
    if (isFreeMail(domain)) {
      rec.warnings.push(`${domain} is free mail, not used as the organization domain`);
      domain = null;
    }
  } else if (name && fallbackEmail && !isFreeMail(fallbackEmail)) {
    domain = emailDomain(fallbackEmail);
  }
  if (!name && !domain) return null;
  const patch = orgPatch(values);

  if (domain) {
    const hit = await findOrgIdByDomain(ctx.t, domain);
    if (hit?.deleted) throw new Skip(`${domain} belongs to a deleted organization`);
    if (hit) {
      await rec.update('organizations', hit.id, patch, { onlyEmpty: true });
      return hit.id;
    }
  } else if (name) {
    const target = normCompanyName(name);
    const candidates = await ctx.t<{ id: string; name: string }[]>`
      select id, name from organizations where deleted_at is null and lower(name) = lower(${name}) limit 3`;
    const exact = candidates.filter((c) => normCompanyName(c.name) === target);
    if (exact.length === 1) {
      await rec.update('organizations', exact[0].id, patch, { onlyEmpty: true });
      return exact[0].id;
    }
  }
  const orgId = await rec.insert('organizations', {
    ...patch,
    name: name ?? domain,
    owner_user_id: ctx.userId,
    source: 'import',
  });
  ctx.orgsCreated++;
  if (domain) await rec.insert('organization_domains', { organization_id: orgId, domain_normalised: domain, is_primary: true });
  return orgId;
}

// ---------------------------------------------------------------- per object

async function importContact(ctx: Ctx, rec: Recorder, v: Record<string, string>): Promise<{ status: 'created' | 'updated' | 'unchanged'; id: string }> {
  const t = ctx.t;
  const rawEmail = v['contact.email']?.trim() || null;
  const email = rawEmail ? normEmail(rawEmail) : null;
  if (rawEmail && !email) throw new Skip(`Email "${rawEmail}" is not an email address`);
  const rawLi = v['contact.linkedin_url']?.trim() || null;
  const li = rawLi ? normLinkedin(rawLi) : null;
  if (rawLi && !li) throw new Skip(`"${rawLi}" is not a LinkedIn profile link`);
  const rawPhone = v['contact.phone']?.trim() || null;
  const phone = rawPhone ? normPhone(rawPhone) : null;
  if (rawPhone && !phone) throw new Skip(`Phone "${rawPhone}" is not a phone number`);

  let first = v['contact.first_name']?.trim() || null;
  let last = v['contact.last_name']?.trim() || null;
  if (!first && v['contact.full_name']?.trim()) {
    const s = splitName(v['contact.full_name']);
    first = s.first;
    last = last ?? s.last;
  }

  const custom = customValues(ctx, 'contact', v);
  const patch: Record<string, unknown> = { ...custom };
  if (first) patch.first_name = first;
  if (last) patch.last_name = last;
  if (v['contact.job_title']) patch.job_title = v['contact.job_title'].trim();
  if (v['contact.tagline']) patch.tagline = v['contact.tagline'].trim();
  if (v['contact.city']) patch.city = v['contact.city'].trim();
  if (v['contact.country']) patch.country = parseCountry(v['contact.country']);
  if (v['contact.language']) patch.language = v['contact.language'].trim().slice(0, 20);

  // Match: id, then email, then LinkedIn.
  let contactId: string | null = null;
  const id = v['id']?.trim();
  if (id) {
    if (!/^[0-9a-f-]{36}$/i.test(id)) throw new Skip(`"${id}" is not a CRM id`);
    const [row] = await t<{ id: string }[]>`select id from contacts where id = ${id} and deleted_at is null`;
    if (!row) throw new Skip('No live contact has this CRM id');
    contactId = row.id;
  }
  if (!contactId && email) {
    const [row] = await t<{ contact_id: string; deleted_at: Date | null }[]>`
      select e.contact_id, c.deleted_at from contact_emails e join contacts c on c.id = e.contact_id where lower(trim(e.email)) = ${email}`;
    if (row?.deleted_at) throw new Skip(`${email} belongs to a deleted contact`);
    if (row) contactId = row.contact_id;
  }
  if (!contactId && li) {
    const [row] = await t<{ id: string }[]>`select id from contacts where linkedin_url_normalised = ${li} and deleted_at is null`;
    if (row) contactId = row.id;
  }

  const orgId = await resolveOrg(ctx, rec, v, email);

  if (!contactId) {
    if (!first) throw new Skip('No first name, and no existing contact matched');
    const newId = await rec.insert('contacts', {
      first_name: first,
      last_name: last,
      job_title: patch.job_title ?? null,
      tagline: patch.tagline ?? null,
      city: patch.city ?? null,
      country: patch.country ?? null,
      language: patch.language ?? null,
      linkedin_url: rawLi,
      linkedin_url_normalised: li,
      primary_org_id: orgId,
      owner_user_id: ctx.userId,
      source: 'import',
      custom: t.json(stripCustomPrefix(custom) as never),
    });
    if (email) await rec.insert('contact_emails', { contact_id: newId, email, is_primary: true });
    if (phone && rawPhone) await rec.insert('contact_phones', { contact_id: newId, phone: rawPhone, phone_normalised: phone, is_primary: true });
    if (orgId) await rec.insert('contact_org_roles', { contact_id: newId, organization_id: orgId, title: patch.job_title ?? null, is_primary: true, is_current: true });
    return { status: 'created', id: newId };
  }

  // Update. Blank cells were never put in the patch.
  let changed = false;
  if (li) {
    const [c] = await t<{ linkedin_url_normalised: string | null }[]>`select linkedin_url_normalised from contacts where id = ${contactId}`;
    if (!c.linkedin_url_normalised) {
      patch.linkedin_url = rawLi;
      patch.linkedin_url_normalised = li;
    } else if (c.linkedin_url_normalised !== li) {
      rec.warnings.push('Has a different LinkedIn profile already, kept the existing one');
    }
  }
  const [cur] = await t<{ primary_org_id: string | null }[]>`select primary_org_id from contacts where id = ${contactId}`;
  if (orgId && !cur.primary_org_id) patch.primary_org_id = orgId;
  changed = (await rec.update('contacts', contactId, patch)) || changed;

  if (email) {
    const [has] = await t<{ n: number }[]>`select count(*)::int as n from contact_emails where contact_id = ${contactId} and lower(trim(email)) = ${email}`;
    if (!has.n) {
      const [p] = await t<{ n: number }[]>`select count(*)::int as n from contact_emails where contact_id = ${contactId} and is_primary`;
      await rec.insert('contact_emails', { contact_id: contactId, email, is_primary: p.n === 0 });
      changed = true;
    }
  }
  if (phone && rawPhone) {
    const [has] = await t<{ n: number; p: number }[]>`
      select count(*) filter (where phone_normalised = ${phone})::int as n, count(*) filter (where is_primary)::int as p
        from contact_phones where contact_id = ${contactId}`;
    if (!has.n) {
      await rec.insert('contact_phones', { contact_id: contactId, phone: rawPhone, phone_normalised: phone, is_primary: has.p === 0 });
      changed = true;
    }
  }
  if (orgId) {
    const [role] = await t<{ n: number; p: number }[]>`
      select count(*) filter (where organization_id = ${orgId} and is_current)::int as n,
             count(*) filter (where is_primary and is_current)::int as p
        from contact_org_roles where contact_id = ${contactId}`;
    if (!role.n) {
      await rec.insert('contact_org_roles', { contact_id: contactId, organization_id: orgId, title: patch.job_title ?? null, is_primary: role.p === 0, is_current: true });
      changed = true;
    }
  }
  return { status: changed ? 'updated' : 'unchanged', id: contactId };
}

async function importOrganization(ctx: Ctx, rec: Recorder, v: Record<string, string>): Promise<{ status: 'created' | 'updated' | 'unchanged'; id: string }> {
  const t = ctx.t;
  const patch: Record<string, unknown> = { ...orgPatch(v), ...customValues(ctx, 'organization', v) };
  const rawDomain = v['org.domain']?.trim() || null;
  let domain: string | null = null;
  if (rawDomain) {
    domain = normDomain(rawDomain);
    if (!domain) throw new Skip(`Domain "${rawDomain}" is not a website or domain`);
    if (isFreeMail(domain)) throw new Skip(`${domain} is free mail and cannot identify an organization`);
  }
  let orgId: string | null = null;
  const id = v['id']?.trim();
  if (id) {
    if (!/^[0-9a-f-]{36}$/i.test(id)) throw new Skip(`"${id}" is not a CRM id`);
    const [row] = await t<{ id: string }[]>`select id from organizations where id = ${id} and deleted_at is null`;
    if (!row) throw new Skip('No live organization has this CRM id');
    orgId = row.id;
  }
  if (!orgId && domain) {
    const hit = await findOrgIdByDomain(t, domain);
    if (hit?.deleted) throw new Skip(`${domain} belongs to a deleted organization`);
    if (hit) orgId = hit.id;
  }
  if (!orgId) {
    if (!patch.name) throw new Skip('No name, and no existing organization matched');
    const custom = stripCustomPrefix(patch);
    const cols = Object.fromEntries(Object.entries(patch).filter(([k]) => !k.startsWith('custom.')));
    const newId = await rec.insert('organizations', { ...cols, owner_user_id: ctx.userId, source: 'import', custom: t.json(custom as never) });
    ctx.orgsCreated++;
    if (domain) await rec.insert('organization_domains', { organization_id: newId, domain_normalised: domain, is_primary: true });
    return { status: 'created', id: newId };
  }
  let changed = await rec.update('organizations', orgId, patch);
  if (domain) {
    const hit = await findOrgIdByDomain(t, domain);
    if (hit && hit.id !== orgId) throw new Skip(`${domain} already belongs to another organization`);
    if (!hit) {
      const [p] = await t<{ n: number }[]>`select count(*)::int as n from organization_domains where organization_id = ${orgId} and is_primary`;
      await rec.insert('organization_domains', { organization_id: orgId, domain_normalised: domain, is_primary: p.n === 0 });
      changed = true;
    }
  }
  return { status: changed ? 'updated' : 'unchanged', id: orgId };
}

async function importDeal(ctx: Ctx, rec: Recorder, v: Record<string, string>): Promise<{ status: 'created' | 'updated' | 'unchanged'; id: string }> {
  const t = ctx.t;
  const patch: Record<string, unknown> = { ...customValues(ctx, 'deal', v) };
  if (v['deal.name']) patch.name = v['deal.name'].trim().slice(0, 200);
  if (v['deal.amount']) {
    const m = parseMoney(v['deal.amount']);
    if (!m) throw new Skip(`Amount "${v['deal.amount']}" is not an amount`);
    patch.amount = m;
  }
  if (v['deal.currency']) {
    const c = v['deal.currency'].trim().toUpperCase();
    if (!/^[A-Z]{3}$/.test(c)) throw new Skip(`Currency "${v['deal.currency']}" is not a three letter code like EUR`);
    patch.currency = c;
  }
  if (v['deal.close_date']) {
    const d = parseDate(v['deal.close_date']);
    if (!d) throw new Skip(`Close date "${v['deal.close_date']}" is not a date, use 2026-11-30 or 30-11-2026`);
    patch.close_date = d;
  }
  if (v['deal.next_step']) patch.next_step = v['deal.next_step'].trim();
  if (v['deal.deal_type']) patch.deal_type = pickOption(DEAL_TYPES, v['deal.deal_type'], 'Deal type');
  if (v['deal.owner_email']) {
    const e = normEmail(v['deal.owner_email']);
    const u = ctx.users.find((x) => x.email.toLowerCase() === e);
    if (!u) throw new Skip(`No user has the email "${v['deal.owner_email']}"`);
    patch.owner_user_id = u.id;
  }

  let dealId: string | null = null;
  const id = v['id']?.trim();
  if (id) {
    if (!/^[0-9a-f-]{36}$/i.test(id)) throw new Skip(`"${id}" is not a CRM id`);
    const [row] = await t<{ id: string }[]>`select id from deals where id = ${id} and deleted_at is null`;
    if (!row) throw new Skip('No live deal has this CRM id');
    dealId = row.id;
  }

  const orgId = await resolveOrg(ctx, rec, v, null);

  if (dealId) {
    if (v['deal.stage'] || v['deal.pipeline']) rec.warnings.push('Stage is not changed by an import, move the deal on the board');
    if (orgId) {
      const [d] = await t<{ organization_id: string | null }[]>`select organization_id from deals where id = ${dealId}`;
      if (!d.organization_id) patch.organization_id = orgId;
    }
    const changed = await rec.update('deals', dealId, patch);
    return { status: changed ? 'updated' : 'unchanged', id: dealId };
  }

  if (!patch.name) throw new Skip('No deal name');
  // Pipeline and stage, set directly on create (stage moves later go through moveStage).
  let pipeline = ctx.dealPipelines.find((p) => p.is_default && p.key === 'sales') ?? ctx.dealPipelines.find((p) => p.is_default) ?? ctx.dealPipelines[0];
  if (v['deal.pipeline']) {
    const s = v['deal.pipeline'].trim().toLowerCase();
    const hit = ctx.dealPipelines.find((p) => p.key === s || p.name.toLowerCase() === s);
    if (!hit) throw new Skip(`No deal pipeline is called "${v['deal.pipeline']}"`);
    pipeline = hit;
  }
  if (!pipeline) throw new Skip('There is no deal pipeline');
  const stages = ctx.stages.filter((s) => s.pipeline_id === pipeline.id);
  let stage = stages.find((s) => s.state === 'open') ?? stages[0];
  if (v['deal.stage']) {
    const s = v['deal.stage'].trim().toLowerCase();
    const hit = stages.find((x) => x.key === s || x.name.toLowerCase() === s);
    if (!hit) throw new Skip(`${pipeline.name} has no stage called "${v['deal.stage']}"`);
    stage = hit;
  }
  if (stage.state !== 'open') throw new Skip(`Import open deals only, "${stage.name}" is a closed stage`);
  const custom = stripCustomPrefix(patch);
  const cols = Object.fromEntries(Object.entries(patch).filter(([k]) => !k.startsWith('custom.')));
  const newId = await rec.insert('deals', {
    ...cols,
    organization_id: orgId,
    pipeline_id: pipeline.id,
    stage_id: stage.id,
    owner_user_id: (cols.owner_user_id as string | undefined) ?? ctx.userId,
    source: 'import',
    custom: t.json(custom as never),
  });
  await t`
    insert into stage_transitions (object_type, record_id, pipeline_id, from_stage_id, to_stage_id, amount, currency, close_date, actor_type, actor_id, source)
    values ('deal', ${newId}, ${pipeline.id}, null, ${stage.id}, ${(cols.amount as string | undefined) ?? null}, ${(cols.currency as string | undefined) ?? 'EUR'},
            ${(cols.close_date as string | undefined) ?? null}, 'import', ${ctx.userId}, 'import')`;
  return { status: 'created', id: newId };
}

// ---------------------------------------------------------------- the run

const ENTITY: Record<ImportObject, CustomObjectType> = { contacts: 'contact', organizations: 'organization', deals: 'deal' };

function mappedValues(row: Record<string, string>, mapping: Record<string, string>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [col, target] of Object.entries(mapping)) {
    if (!target) continue;
    const v = (row[col] ?? '').trim();
    if (v === '') continue; // blank cells never wipe
    if (out[target] === undefined) out[target] = v;
  }
  return out;
}

function checkMapping(objectType: ImportObject, mapping: Record<string, string>) {
  const targets = new Set(Object.values(mapping).filter(Boolean));
  if (!targets.size) throw new SettingsError('Map at least one column');
  if (objectType === 'contacts' && !['contact.email', 'contact.linkedin_url', 'id', 'contact.first_name', 'contact.full_name'].some((k) => targets.has(k))) {
    throw new SettingsError('Map an email, a LinkedIn URL or a name column for contacts');
  }
  if (objectType === 'organizations' && !['org.name', 'org.domain', 'id'].some((k) => targets.has(k))) {
    throw new SettingsError('Map a name or domain column for organizations');
  }
  if (objectType === 'deals' && !['deal.name', 'id'].some((k) => targets.has(k))) {
    throw new SettingsError('Map a deal name column, or the CRM id to update deals');
  }
}

async function process(t: Tx, input: ImportInput, jobId: string | null): Promise<ImportResult> {
  if (input.rows.length > MAX_IMPORT_ROWS) throw new SettingsError(`Import up to ${MAX_IMPORT_ROWS} rows at a time, split the file`);
  checkMapping(input.objectType, input.mapping);
  const ctx: Ctx = {
    t,
    userId: input.userId,
    defs: {
      contact: await getFieldDefinitions('contact', {}, t),
      organization: await getFieldDefinitions('organization', {}, t),
      deal: await getFieldDefinitions('deal', {}, t),
    },
    users: await t<{ id: string; email: string }[]>`select id, email from users where is_active`,
    dealPipelines: await t<{ id: string; key: string; name: string; is_default: boolean }[]>`
      select id, key, name, is_default from pipelines where object_type = 'deal' and archived_at is null order by is_default desc, position`,
    stages: await t<{ id: string; pipeline_id: string; key: string; name: string; position: number; state: string }[]>`
      select s.id, s.pipeline_id, s.key, s.name, s.position, s.state from pipeline_stages s
        join pipelines p on p.id = s.pipeline_id where p.object_type = 'deal' and s.archived_at is null order by s.position`,
    orgsCreated: 0,
  };
  const counts: ImportCounts = { rows: input.rows.length, created: 0, updated: 0, unchanged: 0, skipped: 0, orgsCreated: 0 };
  const outcomes: RowOutcome[] = [];

  for (let i = 0; i < input.rows.length; i++) {
    const raw = input.rows[i];
    const line = i + 2; // header is line 1
    const values = mappedValues(raw, input.mapping);
    const rec = new Recorder(t);
    let outcome: RowOutcome;
    const orgsBefore = ctx.orgsCreated;
    try {
      const res = await t.savepoint(async (sp) => {
        const r2 = new Recorder(sp as unknown as Tx);
        const c2 = { ...ctx, t: sp as unknown as Tx };
        const handler = input.objectType === 'contacts' ? importContact : input.objectType === 'organizations' ? importOrganization : importDeal;
        const out = await handler(c2, r2, values);
        ctx.orgsCreated = c2.orgsCreated;
        rec.changes = r2.changes;
        rec.created = r2.created;
        rec.warnings = r2.warnings;
        return out;
      });
      outcome = { line, status: res.status, entityId: res.id, warnings: rec.warnings.length ? rec.warnings : undefined };
    } catch (err) {
      ctx.orgsCreated = orgsBefore;
      const reason = err instanceof Skip || err instanceof SettingsError ? err.message : friendlyDbError(err);
      outcome = { line, status: 'skipped', reason };
    }
    counts[outcome.status]++;
    outcomes.push(outcome);
    if (jobId) {
      const status = outcome.status === 'unchanged' ? 'skipped' : outcome.status;
      await t`
        insert into import_rows (import_job_id, row_number, raw, status, error, entity_type, entity_id, before)
        values (${jobId}, ${line}, ${t.json(raw as never)}, ${status},
                ${outcome.reason ?? (outcome.status === 'unchanged' ? 'Nothing new on this line' : null)},
                ${outcome.entityId ? ENTITY[input.objectType] : null}, ${outcome.entityId ?? null},
                ${rec.changes.length || rec.created.length ? t.json({ changes: rec.changes, created: rec.created } as never) : null})`;
    }
  }
  counts.orgsCreated = ctx.orgsCreated;
  return { counts, outcomes };
}

class DryRun extends Error {
  constructor(public result: ImportResult) {
    super('dry run');
  }
}

/** Everything the import would do, then rolled back. */
export async function previewImport(t: Tx, input: ImportInput): Promise<ImportResult> {
  try {
    await t.savepoint(async (sp) => {
      const result = await process(sp as unknown as Tx, input, null);
      throw new DryRun(result);
    });
  } catch (err) {
    if (err instanceof DryRun) return err.result;
    throw err;
  }
  throw new Error('unreachable');
}

/** Run the import as a job. */
export async function runImport(t: Tx, input: ImportInput & { fileName: string }): Promise<ImportResult & { jobId: string }> {
  const matchKey = input.objectType === 'contacts' ? 'email' : input.objectType === 'organizations' ? 'domain' : 'id';
  const [job] = await t<{ id: string }[]>`
    insert into import_jobs (object_type, file_name, mapping, match_key, mode, blank_handling, status, created_by, started_at)
    values (${input.objectType}, ${input.fileName.slice(0, 200)}, ${t.json(input.mapping)}, ${matchKey}, 'upsert', 'keep', 'running', ${input.userId}, now())
    returning id`;
  const result = await process(t, input, job.id);
  await t`
    update import_jobs set status = 'completed', finished_at = now(), counts = ${t.json(result.counts as never)} where id = ${job.id}`;
  return { ...result, jobId: job.id };
}

export type RevertResult = { restored: number; deleted: number; kept: number; keptReasons: string[] };

/** Undo an import: delete what it created, put back what it changed. */
export async function revertImport(t: Tx, jobId: string, userId: string | null): Promise<RevertResult> {
  const [job] = await t<{ id: string; status: string }[]>`select id, status from import_jobs where id = ${jobId} for update`;
  if (!job) throw new SettingsError('That import no longer exists');
  if (job.status === 'reverted') throw new SettingsError('This import was already reverted');
  if (job.status !== 'completed' && job.status !== 'failed') throw new SettingsError('Only a finished import can be reverted');

  const rows = await t<{ id: string; before: { changes?: Change[]; created?: Created[] } | null }[]>`
    select id, before from import_rows where import_job_id = ${jobId} and before is not null order by row_number desc`;
  const res: RevertResult = { restored: 0, deleted: 0, kept: 0, keptReasons: [] };

  for (const row of rows) {
    const changes = [...(row.before?.changes ?? [])].reverse();
    const created = [...(row.before?.created ?? [])].reverse();

    for (const ch of changes) {
      if (!IMPORT_TABLES.has(ch.table)) continue;
      const [cur] = await t.unsafe<{ j: Record<string, unknown> }[]>(`select to_jsonb(r) as j from ${ch.table} r where id = $1 for update`, [ch.id]);
      if (!cur) {
        res.kept++;
        continue;
      }
      const curCustom = (cur.j.custom ?? {}) as Record<string, unknown>;
      for (const [col, beforeVal] of Object.entries(ch.before)) {
        const now = col.startsWith('custom.') ? curCustom[col.slice(7)] ?? null : cur.j[col] ?? null;
        if (JSON.stringify(now) !== JSON.stringify(ch.after[col] ?? null)) {
          res.kept++;
          if (res.keptReasons.length < 10) res.keptReasons.push(`${col.replace('custom.', '')} on a ${ch.table.replace(/s$/, '')} was edited after the import, kept the newer value`);
          continue;
        }
        if (col.startsWith('custom.')) {
          const key = col.slice(7);
          if (!CUSTOM_KEY_RE.test(key)) continue;
          if (beforeVal === null || beforeVal === undefined) {
            await t.unsafe(`update ${ch.table} set custom = custom - '${key}' where id = $1`, [ch.id]);
          } else {
            await t.unsafe(`update ${ch.table} set custom = jsonb_set(custom, '{${key}}', $2::text::jsonb, true) where id = $1`, [ch.id, JSON.stringify(beforeVal)]);
          }
        } else {
          if (!COL_RE.test(col)) continue;
          await t.unsafe(
            `update ${ch.table} set ${col} = (jsonb_populate_record(null::${ch.table}, $2::text::jsonb)).${col} where id = $1`,
            [ch.id, JSON.stringify({ [col]: beforeVal })],
          );
        }
        res.restored++;
      }
    }

    for (const c of created) {
      if (!IMPORT_TABLES.has(c.table)) continue;
      try {
        await t.savepoint(async (sp) => {
          await (sp as unknown as Tx).unsafe(`delete from ${c.table} where id = $1`, [c.id]);
        });
        res.deleted++;
      } catch (err) {
        const e = err as { code?: string };
        if (e.code === '23503' && SOFT_DELETE_TABLES.has(c.table)) {
          await t.unsafe(`update ${c.table} set deleted_at = coalesce(deleted_at, now()) where id = $1`, [c.id]);
          res.kept++;
          if (res.keptReasons.length < 10) res.keptReasons.push(`A ${c.table.replace(/s$/, '')} created by the import is used by newer records, it was hidden instead of deleted`);
        } else if (e.code === '23503') {
          res.kept++;
        } else {
          throw err;
        }
      }
    }
    await t`update import_rows set status = 'reverted' where id = ${row.id}`;
  }
  await t`update import_jobs set status = 'reverted', reverted_at = now(), reverted_by = ${userId} where id = ${jobId}`;
  return res;
}

export type ImportJobRow = {
  id: string;
  object_type: ImportObject;
  file_name: string;
  status: string;
  counts: Partial<ImportCounts>;
  created_by_name: string | null;
  created_at: Date;
  finished_at: Date | null;
  reverted_at: Date | null;
  reverted_by_name: string | null;
};

export async function listImportJobs(t: Tx | import('@/lib/db').Sql, limit = 30): Promise<ImportJobRow[]> {
  return t<ImportJobRow[]>`
    select j.id, j.object_type, j.file_name, j.status, j.counts, u.name as created_by_name, j.created_at, j.finished_at,
           j.reverted_at, r.name as reverted_by_name
      from import_jobs j left join users u on u.id = j.created_by left join users r on r.id = j.reverted_by
     order by j.created_at desc limit ${limit}`;
}

/** Skipped lines of a finished job, for the error CSV. */
export async function importErrors(db: Tx | import('@/lib/db').Sql, jobId: string) {
  return db<{ row_number: number; error: string | null; raw: Record<string, string> }[]>`
    select row_number, error, raw from import_rows where import_job_id = ${jobId} and status in ('skipped', 'error') order by row_number`;
}
