/**
 * lib/integrations/match.ts, how the lemlist sync and the JSONL import find an
 * organization or a contact that already exists before they make one (agent E, fixed by Q).
 *
 *   const id = await findExistingOrg(t, { domain, name });   // null means create it
 *   const m = await findExistingContact(t, { name, linkedin, email });  // ContactMatch, see below
 *
 * Contacts follow Raka's rule (lib/dedupe.ts): name first, then LinkedIn, then email.
 * Only a match confirmed by LinkedIn or email is used on its own. A name match with
 * nothing to confirm it makes a new contact, and the pair waits on /settings/duplicates.
 *
 * 1. The registrable domain wins (organization_domains is unique on it).
 * 2. A domain we have not seen, plus a name: the one organization with that name and
 *    no domain yet gets the domain. That is the company an earlier row made from its
 *    name alone. An organization with another domain is a different company.
 * 3. No domain: the organization with that name, preferring one with a domain.
 * Names compare with legal forms, accents and case set aside (normCompanyName).
 */
import type { Tx } from '../db';
import { normCompanyName, normPersonName } from '../normalize';
import { findContactCandidates } from '../dupes';
import { decideContactMatch } from '../dedupe';

export async function orgsByName(t: Tx, name: string): Promise<{ id: string; has_domain: boolean }[]> {
  const want = normCompanyName(name);
  if (!want) return [];
  const rows = await t<{ id: string; name: string; has_domain: boolean }[]>`
    select o.id, o.name, exists (select 1 from organization_domains d where d.organization_id = o.id) as has_domain
      from organizations o
     where o.deleted_at is null and (lower(o.name) = lower(${name}) or o.name % ${name})
     order by o.created_at`;
  return rows.filter((r) => normCompanyName(r.name) === want);
}

/** A company name worth keeping, or null for blanks and placeholders like "." or "-". */
export function companyNameOf(v: unknown): string | null {
  const t = typeof v === 'string' ? v.trim() : '';
  return t && /[\p{L}\p{N}]/u.test(t) ? t : null;
}

export async function findExistingOrg(t: Tx, input: { domain: string | null; name: string | null }): Promise<string | null> {
  const domain = input.domain;
  const name = companyNameOf(input.name);
  if (domain) {
    const [hit] = await t<{ organization_id: string }[]>`select organization_id from organization_domains where domain_normalised = ${domain}`;
    if (hit) return hit.organization_id;
    if (!name) return null;
    const bare = (await orgsByName(t, name)).filter((o) => !o.has_domain);
    if (bare.length !== 1) return null;
    await t`insert into organization_domains (organization_id, domain_normalised, is_primary) values (${bare[0].id}, ${domain}, true)`;
    await t`update organizations set custom = custom - 'no_domain' where id = ${bare[0].id}`;
    return bare[0].id;
  }
  if (!name) return null;
  const same = await orgsByName(t, name);
  return (same.find((o) => o.has_domain) ?? same[0])?.id ?? null;
}

/** A person's name for matching, normPersonName (honorifics and suffixes out). Null when blank. */
export function personKey(v: string | null | undefined): string | null {
  return normPersonName(v);
}

export type ContactMatch = {
  /** The contact to use, or null to make a new one. */
  id: string | null;
  /**
   * linkedin, email: confirmed. held: another record already holds this LinkedIn profile or
   * email under a different name; the unique index allows one record, so it is used and
   * counted for review. new: no confirmed match. review: name matches a person should check.
   */
  how: 'linkedin' | 'email' | 'held' | 'new';
  review: number;
  reason: string | null;
};

/** Raka's rule for an incoming person from lemlist or the JSONL files. */
export async function findExistingContact(
  t: Tx,
  input: { name: string | null | undefined; linkedin?: string | null; email?: string | null },
): Promise<ContactMatch> {
  const candidates = await findContactCandidates({ name: input.name, linkedin: input.linkedin, emails: [input.email] }, t, { includeDistinct: true });
  const d = decideContactMatch(candidates);
  if (d.kind === 'match') return { id: d.id, how: d.confidence, review: 0, reason: d.reason };
  // Confirmed against two records: LinkedIn comes before email in the rule, and both wait for review.
  if (d.kind === 'conflict') return { id: d.ids[0], how: 'held', review: 1, reason: d.reason };
  if (d.kind === 'held') return { id: d.id, how: 'held', review: 1, reason: d.reason };
  return { id: null, how: 'new', review: d.review.length, reason: null };
}
