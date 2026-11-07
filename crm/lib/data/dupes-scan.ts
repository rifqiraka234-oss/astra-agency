/**
 * lib/data/dupes-scan.ts, the duplicate scan behind /settings/duplicates.
 *
 *   contacts       Raka's rule (lib/dedupe.ts): the same normalised name first, then the
 *                  same LinkedIn profile confirms it, then the same email when LinkedIn is
 *                  missing. Different LinkedIn profiles are different people and never show.
 *                  A name match with nothing to confirm it, or the same LinkedIn or email
 *                  under another name, is for review.
 *   organizations  the same normalised name (legal suffixes and accents removed) and the same
 *                  city, or no city on one or both. Always for review.
 *
 * Pairs come back confirmed first (LinkedIn, then email), then the ones to review.
 * Pairs someone marked "Not the same" (duplicate_pairs_rejected) never come back.
 *
 *   const pairs = await scanDuplicates();                 // DupePair[]
 *   await rejectPair(t, 'contact', aId, bId, user.id);
 */
import { sql, type Db, type Tx } from '@/lib/db';
import { normCompanyName, normEmail, normLinkedin } from '@/lib/normalize';
import { CONFIDENCE_LABELS, CONFIDENCE_ORDER, compareContacts, type MatchConfidence } from '@/lib/dedupe';
import type { MergeType } from './merge';

export type DupeSide = { id: string; name: string; sub: string; createdAt: Date };
export type DupePair = { type: MergeType; key: string; a: DupeSide; b: DupeSide; why: string; confidence: MatchConfidence; label: string };

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
        add({ type: 'organization', key: pairKey('organization', a.id, b.id), a: orgSide(first), b: orgSide(second), why, confidence: 'review', label: CONFIDENCE_LABELS.review });
      }
    }
  }

  // Contacts, Raka's rule. Buckets on the normalised name, the LinkedIn profile and every
  // email, then every pair in a bucket is judged by compareContacts.
  const contacts = await db<{
    id: string;
    full_name: string;
    name_normalised: string | null;
    linkedin_url: string | null;
    linkedin_url_normalised: string | null;
    org_name: string | null;
    emails: string[] | null;
    created_at: Date;
  }[]>`
    select c.id, c.full_name, c.name_normalised, c.linkedin_url, c.linkedin_url_normalised, o.name as org_name, c.created_at,
           (select array_agg(e.email order by e.is_primary desc, e.created_at) from contact_emails e where e.contact_id = c.id) as emails
      from contacts c left join organizations o on o.id = c.primary_org_id
     where c.deleted_at is null`;
  const byId = new Map(contacts.map((c) => [c.id, c]));
  const linkedinOf = (c: (typeof contacts)[number]) => normLinkedin(c.linkedin_url_normalised ?? c.linkedin_url);
  const contactSide = (c: (typeof contacts)[number]): DupeSide => ({
    id: c.id,
    name: c.full_name,
    sub: [linkedinOf(c) ?? 'no LinkedIn', c.emails?.length ? c.emails.join(', ') : 'no email', c.org_name ?? 'no organization'].join(', '),
    createdAt: c.created_at,
  });
  const buckets = new Map<string, Set<string>>();
  const put = (k: string, id: string) => buckets.set(k, (buckets.get(k) ?? new Set()).add(id));
  for (const c of contacts) {
    if (c.name_normalised) put(`name:${c.name_normalised}`, c.id);
    const li = linkedinOf(c);
    if (li) put(`li:${li}`, c.id);
    for (const e of c.emails ?? []) {
      const n = normEmail(e);
      if (n) put(`email:${n}`, c.id);
    }
  }
  for (const ids of buckets.values()) {
    if (ids.size < 2 || ids.size > 200) continue; // a name shared by hundreds is noise, not a duplicate
    const list = [...ids];
    for (let i = 0; i < list.length; i++) {
      for (let j = i + 1; j < list.length; j++) {
        const a = byId.get(list[i])!;
        const b = byId.get(list[j])!;
        const key = pairKey('contact', a.id, b.id);
        if (out.has(key)) continue;
        const verdict = compareContacts(
          { name: a.full_name, linkedin: linkedinOf(a), emails: a.emails ?? [] },
          { name: b.full_name, linkedin: linkedinOf(b), emails: b.emails ?? [] },
        );
        if (!verdict || verdict.confidence === 'distinct') continue;
        const [first, second] = a.created_at <= b.created_at ? [a, b] : [b, a];
        add({
          type: 'contact',
          key,
          a: contactSide(first),
          b: contactSide(second),
          why: verdict.reason,
          confidence: verdict.confidence,
          label: CONFIDENCE_LABELS[verdict.confidence],
        });
      }
    }
  }
  const typeOrder = (t: MergeType) => (t === 'contact' ? 0 : 1);
  const sorted = [...out.values()].sort(
    (p, q) => CONFIDENCE_ORDER[p.confidence] - CONFIDENCE_ORDER[q.confidence] || typeOrder(p.type) - typeOrder(q.type) || p.a.name.localeCompare(q.a.name),
  );
  return sorted.slice(0, limit);

}

/** "Not the same". The pair never shows again. */
export async function rejectPair(t: Tx, type: MergeType, aId: string, bId: string, userId: string | null): Promise<void> {
  await t`
    insert into duplicate_pairs_rejected (object_type, a_id, b_id, rejected_by)
    values (${type}, ${aId}, ${bId}, ${userId})
    on conflict do nothing`;
}
