/**
 * lib/dedupe.ts, Raka's rule for deduplicating contacts: "Look first at name, and then
 * LI link, and then email." Pure functions, safe in server and client code.
 *
 *   compareContacts(a, b)  -> { confidence, basis, reason } | null
 *   decideContactMatch(candidates, { hasName })   what an import or sync does with them
 *
 * The rule, in order
 *   1. Name. Candidates share the normalised full name (normPersonName: case, accents,
 *      punctuation, honorifics and suffixes set aside, word order kept).
 *   2. LinkedIn. Among name matches the same profile confirms a duplicate. Two different
 *      profiles are two different people, never merged.
 *   3. Email. When LinkedIn is missing on either side, a shared email confirms it.
 *      Different emails on both sides and no LinkedIn is a possible duplicate to review.
 *   4. A name match with nothing to confirm it is for review, never automatic.
 *   5. The same LinkedIn profile or email under a different name (a nickname, a company
 *      page name) is shown for review. The unique indexes on email and LinkedIn stay the
 *      hard guard, so such a record can never be saved twice.
 * When one side has no name at all (an import line with only an email), LinkedIn and
 * then email decide on their own.
 */
import { normEmail, normLinkedin, normPersonName } from './normalize';

/** linkedin and email are confirmed duplicates, review needs a person. */
export type MatchConfidence = 'linkedin' | 'email' | 'review';
/** distinct: the same name but different LinkedIn profiles, two people. */
export type MatchVerdict = {
  confidence: MatchConfidence | 'distinct';
  /** name: found by the name step. identifier: found by LinkedIn or email under another name. */
  basis: 'name' | 'identifier';
  reason: string;
};

export const CONFIDENCE_LABELS: Record<MatchConfidence, string> = {
  linkedin: 'Confirmed by LinkedIn',
  email: 'Confirmed by email',
  review: 'Possible, review',
};
export const CONFIDENCE_ORDER: Record<MatchConfidence | 'distinct', number> = { linkedin: 0, email: 1, review: 2, distinct: 3 };

export const DEDUPE_RULE_TEXT =
  'Contacts are matched on name first, then LinkedIn, then email. The same name and the same LinkedIn profile, or the same name and the same email when LinkedIn is missing, is a duplicate. Different LinkedIn profiles are different people. Anything else is for a person to review.';

/** One side of a comparison. Raw values are fine, they are normalised here. */
export type PersonKeys = {
  name: string | null | undefined;
  linkedin?: string | null;
  emails?: (string | null | undefined)[];
};

export function isConfirmed(c: MatchConfidence | 'distinct' | null | undefined): c is 'linkedin' | 'email' {
  return c === 'linkedin' || c === 'email';
}

function keys(p: PersonKeys) {
  const emails = [...new Set((p.emails ?? []).map((e) => normEmail(e)).filter((e): e is string => Boolean(e)))];
  return { name: normPersonName(p.name), linkedin: normLinkedin(p.linkedin), emails };
}

/**
 * The verdict for two people, or null when the rule does not pair them at all
 * (different names and no shared LinkedIn or email).
 */
export function compareContacts(a: PersonKeys, b: PersonKeys): MatchVerdict | null {
  const x = keys(a);
  const y = keys(b);
  const sameLinkedin = Boolean(x.linkedin && y.linkedin && x.linkedin === y.linkedin);
  const bothLinkedin = Boolean(x.linkedin && y.linkedin);
  const sharedEmail = x.emails.find((e) => y.emails.includes(e)) ?? null;

  // No name on one side: the identifiers decide on their own.
  if (!x.name || !y.name) {
    if (sameLinkedin) return { confidence: 'linkedin', basis: 'identifier', reason: 'Same LinkedIn profile, no name to compare' };
    if (sharedEmail && !bothLinkedin) return { confidence: 'email', basis: 'identifier', reason: `Same email ${sharedEmail}, no name to compare` };
    if (sharedEmail) return { confidence: 'review', basis: 'identifier', reason: `Same email ${sharedEmail}, but different LinkedIn profiles` };
    return null;
  }

  // 1. Name first.
  if (x.name === y.name) {
    // 2. Then LinkedIn.
    if (bothLinkedin) {
      return sameLinkedin
        ? { confidence: 'linkedin', basis: 'name', reason: 'Same name and the same LinkedIn profile' }
        : { confidence: 'distinct', basis: 'name', reason: 'Same name, but different LinkedIn profiles, so different people' };
    }
    // 3. Then email, LinkedIn is missing on at least one side.
    const liNote = x.linkedin || y.linkedin ? 'LinkedIn on one record only' : 'no LinkedIn on either';
    if (sharedEmail) return { confidence: 'email', basis: 'name', reason: `Same name and the same email ${sharedEmail}, ${liNote}` };
    if (x.emails.length && y.emails.length) return { confidence: 'review', basis: 'name', reason: `Same name, different emails and ${liNote}` };
    // 4. Nothing to confirm it.
    if (!x.linkedin && !y.linkedin && !x.emails.length && !y.emails.length) {
      return { confidence: 'review', basis: 'name', reason: 'Same name, no LinkedIn or email on either record' };
    }
    return { confidence: 'review', basis: 'name', reason: `Same name, ${liNote} and no shared email` };
  }

  // 5. A different name with the same LinkedIn profile or email.
  if (sameLinkedin) return { confidence: 'review', basis: 'identifier', reason: `Same LinkedIn profile, different name (${a.name} and ${b.name})` };
  if (sharedEmail) {
    const li = bothLinkedin ? ' and different LinkedIn profiles' : '';
    return { confidence: 'review', basis: 'identifier', reason: `Same email ${sharedEmail}, different name (${a.name} and ${b.name})${li}` };
  }
  return null;
}

export type Candidate = { id: string; name: string; verdict: MatchVerdict };

export type MatchDecision =
  /** The same person, confirmed by LinkedIn or email. Use this record. */
  | { kind: 'match'; id: string; confidence: 'linkedin' | 'email'; reason: string }
  /** Another record already holds this LinkedIn profile or email under a different name. */
  | { kind: 'held'; id: string; name: string; reason: string }
  /** Confirmed against two different records, a person has to look. */
  | { kind: 'conflict'; ids: string[]; reason: string }
  /** Make a new record. review lists the name matches a person should look at. */
  | { kind: 'new'; review: Candidate[]; distinct: Candidate[] };

/** What an import or sync does with the candidates for one incoming person. */
export function decideContactMatch(candidates: Candidate[]): MatchDecision {
  const confirmed = candidates.filter((c) => isConfirmed(c.verdict.confidence));
  const ids = [...new Set(confirmed.map((c) => c.id))];
  if (ids.length > 1) {
    return { kind: 'conflict', ids, reason: `Matches ${confirmed.map((c) => c.name).join(' and ')}, two different records, review them first` };
  }
  if (ids.length === 1) {
    const best = [...confirmed].sort((p, q) => CONFIDENCE_ORDER[p.verdict.confidence] - CONFIDENCE_ORDER[q.verdict.confidence])[0];
    return { kind: 'match', id: best.id, confidence: best.verdict.confidence as 'linkedin' | 'email', reason: best.verdict.reason };
  }
  const held = candidates.find((c) => c.verdict.basis === 'identifier');
  if (held) return { kind: 'held', id: held.id, name: held.name, reason: held.verdict.reason };
  return {
    kind: 'new',
    review: candidates.filter((c) => c.verdict.confidence === 'review'),
    distinct: candidates.filter((c) => c.verdict.confidence === 'distinct'),
  };
}

/** An existing contact the dedupe rule (lib/dedupe.ts) pairs with the person being saved. */
export type ContactCandidate = Candidate & {
  href: string;
  linkedin: string | null;
  emails: string[];
  role: string | null;
  added: string;
  /** This record already holds the LinkedIn profile or an email being saved, the unique index refuses a second. */
  holdsIdentifier: boolean;
  /** Which one it holds, LinkedIn first. */
  holds: 'linkedin' | 'email' | null;
  label: string;
};

/** What GET /api/dupes?type=person returns to the create form. */
export type PersonDupeResponse = {
  normalised: { name: string | null; email: string | null; linkedin: string | null };
  candidates: ContactCandidate[];
  /** A confirmed duplicate, or an email or LinkedIn profile another contact holds. */
  block: boolean;
  rule: string;
  notes: { email?: string; linkedin?: string };
};
