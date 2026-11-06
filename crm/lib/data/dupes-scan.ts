/**
 * lib/data/dupes-scan.ts, the fuzzy duplicate scan behind /settings/duplicates.
 * Exact duplicates (email, domain, LinkedIn) cannot exist, the unique indexes
 * block them. This finds the ones a person has to judge:
 *
 *   organizations  the same normalised name (legal suffixes and accents removed) and the same city
 *   contacts       similar names with the same phone, or at the same organization
 *
 * Pairs someone marked "Not the same" (duplicate_pairs_rejected) never come back.
 *
 *   const pairs = await scanDuplicates();                 // DupePair[]
 *   await rejectPair(t, 'contact', aId, bId, user.id);
 */
import { sql, type Db, type Tx } from '@/lib/db';
import { normCompanyName } from '@/lib/normalize';
import type { MergeType } from './merge';

export type DupeSide = { id: string; name: string; sub: string; createdAt: Date };
export type DupePair = { type: MergeType; key: string; a: DupeSide; b: DupeSide; why: string };

/** Lower case, accents gone, single spaces. */
export function normPersonName(s: string | null | undefined): string {
  return (s ?? '')
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  const prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let diag = prev[0];
    prev[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const tmp = prev[j];
      prev[j] = Math.min(prev[j] + 1, prev[j - 1] + 1, diag + (a[i - 1] === b[j - 1] ? 0 : 1));
      diag = tmp;
    }
  }
  return prev[b.length];
}

/**
 * Similar enough to show a person: the same full name, or the same last name
 * with first names starting alike (Tom and Thomas), or at most a small typo.
 */
export function similarNames(a: { first: string; last: string | null }, b: { first: string; last: string | null }): boolean {
  const fa = normPersonName(a.first);
  const fb = normPersonName(b.first);
  const la = normPersonName(a.last);
  const lb = normPersonName(b.last);
  const full = (f: string, l: string) => `${f} ${l}`.trim();
  if (!fa || !fb) return false;
  if (full(fa, la) === full(fb, lb)) return true;
  if (la && la === lb && fa[0] === fb[0]) return true;
  const x = full(fa, la);
  const y = full(fb, lb);
  const d = levenshtein(x, y);
  return d <= 2 && Math.max(x.length, y.length) >= 6 && d / Math.max(x.length, y.length) <= 0.2;
}

const pairKey = (type: string, a: string, b: string) => (a < b ? `${type}:${a}:${b}` : `${type}:${b}:${a}`);

function sourceText(source: string | null): string {
  if (!source || source === 'manual') return 'added by hand';
  if (source === 'seed') return 'sample data';
  return `from ${source}`;
}

export async function scanDuplicates(db: Db = sql, limit = 200): Promise<DupePair[]> {
  const rejected = new Set(
    (await db<{ object_type: string; a_id: string; b_id: string }[]>`select object_type, a_id, b_id from duplicate_pairs_rejected`).map((r) =>
      pairKey(r.object_type, r.a_id, r.b_id),
    ),
  );
  const out = new Map<string, DupePair>();
  const add = (p: DupePair) => {
    if (rejected.has(p.key) || out.has(p.key)) return;
    out.set(p.key, p);
  };

  // Organizations.
  const orgs = await db<{ id: string; name: string; city: string | null; source: string | null; domain: string | null; created_at: Date }[]>`
    select o.id, o.name, o.city, o.source, o.created_at,
           (select d.domain_normalised from organization_domains d where d.organization_id = o.id order by d.is_primary desc, d.created_at limit 1) as domain
      from organizations o where o.deleted_at is null`;
  const byName = new Map<string, (typeof orgs)[number][]>();
  for (const o of orgs) {
    const n = normCompanyName(o.name);
    if (n.length < 2) continue;
    byName.set(n, [...(byName.get(n) ?? []), o]);
  }
  const orgSide = (o: (typeof orgs)[number]): DupeSide => ({
    id: o.id,
    name: o.name,
    sub: [o.domain ?? 'no domain', o.city, sourceText(o.source)].filter(Boolean).join(', '),
    createdAt: o.created_at,
  });
  for (const group of byName.values()) {
    if (group.length < 2) continue;
    for (let i = 0; i < group.length; i++) {
      for (let j = i + 1; j < group.length; j++) {
        const [a, b] = [group[i], group[j]];
        const ca = (a.city ?? '').trim().toLowerCase();
        const cb = (b.city ?? '').trim().toLowerCase();
        let why: string | null = null;
        if (ca && ca === cb) why = 'Same name and city';
        else if (!ca && !cb) why = 'Same name, no city on either';
        else if (!ca || !cb) why = 'Same name, city missing on one';
        if (!why) continue;
        const [first, second] = a.created_at <= b.created_at ? [a, b] : [b, a];
        add({ type: 'organization', key: pairKey('organization', a.id, b.id), a: orgSide(first), b: orgSide(second), why });
      }
    }
  }

  // Contacts.
  const contacts = await db<{
    id: string;
    first_name: string;
    last_name: string | null;
    full_name: string;
    primary_org_id: string | null;
    org_name: string | null;
    email: string | null;
    phones: string[] | null;
    orgs: string[] | null;
    created_at: Date;
  }[]>`
    select c.id, c.first_name, c.last_name, c.full_name, c.primary_org_id, o.name as org_name, c.created_at,
           (select e.email from contact_emails e where e.contact_id = c.id order by e.is_primary desc, e.created_at limit 1) as email,
           (select array_agg(distinct p.phone_normalised) from contact_phones p where p.contact_id = c.id and p.phone_normalised is not null) as phones,
           (select array_agg(distinct r.organization_id) from contact_org_roles r where r.contact_id = c.id and r.is_current) as orgs
      from contacts c left join organizations o on o.id = c.primary_org_id
     where c.deleted_at is null`;
  const byId = new Map(contacts.map((c) => [c.id, c]));
  const contactSide = (c: (typeof contacts)[number]): DupeSide => {
    const phone = c.phones?.[0] ?? null;
    return { id: c.id, name: c.full_name, sub: [c.email ?? phone ?? 'no email', c.org_name ?? 'no organization'].join(', '), createdAt: c.created_at };
  };
  const buckets = new Map<string, Set<string>>();
  const put = (k: string, id: string) => buckets.set(k, (buckets.get(k) ?? new Set()).add(id));
  for (const c of contacts) {
    for (const p of c.phones ?? []) put(`phone:${p}`, c.id);
    const orgIds = new Set([...(c.orgs ?? []), ...(c.primary_org_id ? [c.primary_org_id] : [])]);
    for (const o of orgIds) put(`org:${o}`, c.id);
  }
  for (const [bucket, ids] of buckets) {
    if (ids.size < 2) continue;
    const list = [...ids];
    if (list.length > 200) continue; // a huge organization, names would match by chance
    const why = bucket.startsWith('phone:') ? 'Similar name, same phone' : 'Similar name, same organization';
    for (let i = 0; i < list.length; i++) {
      for (let j = i + 1; j < list.length; j++) {
        const a = byId.get(list[i])!;
        const b = byId.get(list[j])!;
        if (!similarNames({ first: a.first_name, last: a.last_name }, { first: b.first_name, last: b.last_name })) continue;
        const key = pairKey('contact', a.id, b.id);
        const existing = out.get(key);
        if (existing) {
          if (!existing.why.includes('phone') && why.includes('phone')) existing.why = why;
          continue;
        }
        const [first, second] = a.created_at <= b.created_at ? [a, b] : [b, a];
        add({ type: 'contact', key, a: contactSide(first), b: contactSide(second), why });
      }
    }
  }
  return [...out.values()].slice(0, limit);
}

/** "Not the same". The pair never shows again. */
export async function rejectPair(t: Tx, type: MergeType, aId: string, bId: string, userId: string | null): Promise<void> {
  await t`
    insert into duplicate_pairs_rejected (object_type, a_id, b_id, rejected_by)
    values (${type}, ${aId}, ${bId}, ${userId})
    on conflict do nothing`;
}
