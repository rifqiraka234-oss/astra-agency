/**
 * GET /api/dupes?type=org&domain=https://www.dekade.nl/taproom
 * GET /api/dupes?type=contact&email=EVA@dekade.nl
 * GET /api/dupes?type=contact&linkedin=https://linkedin.com/in/eva-jansen
 * -> { normalised, freeMail, match: DupeMatch | null, rule, note? }
 *
 * GET /api/dupes?type=person&name=Dr Eva Jansen&email=eva@dekade.nl&linkedin=linkedin.com/in/eva-jansen
 * -> PersonDupeResponse, Raka's rule (lib/dedupe.ts): name first, then LinkedIn, then email.
 *    Every candidate with its LinkedIn, emails, confidence and reason. block is true only for a
 *    confirmed duplicate or a taken email or LinkedIn profile (the unique indexes).
 */
import { NextResponse, type NextRequest } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { DUPE_RULES, blocksSave, findContactByEmail, findContactByLinkedin, findContactCandidates, findOrgByDomain } from '@/lib/dupes';
import type { PersonDupeResponse } from '@/lib/dedupe';
import { isFreeMail, normDomain, normEmail, normLinkedin, normPersonName } from '@/lib/normalize';

export async function GET(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'Sign in first' }, { status: 401 });
  const p = req.nextUrl.searchParams;
  const type = p.get('type');

  if (type === 'org') {
    const raw = p.get('domain') ?? '';
    const normalised = normDomain(raw);
    if (normalised && isFreeMail(normalised)) {
      return NextResponse.json({
        normalised,
        freeMail: true,
        match: null,
        rule: DUPE_RULES.organization,
        note: `${normalised} is a free mail domain, so it can't identify an organization`,
      });
    }
    const match = await findOrgByDomain(raw);
    return NextResponse.json({
      normalised,
      freeMail: false,
      match,
      rule: DUPE_RULES.organization,
      note: normalised && !match && normalised !== raw.trim().toLowerCase() ? `Saved as ${normalised}` : undefined,
    });
  }

  if (type === 'person') {
    const name = p.get('name') ?? '';
    const email = (p.get('email') ?? '').trim();
    const linkedin = (p.get('linkedin') ?? '').trim();
    const normalised = { name: normPersonName(name), email: normEmail(email), linkedin: normLinkedin(linkedin) };
    const notes: PersonDupeResponse['notes'] = {};
    if (email && !normalised.email) notes.email = 'Enter an email address';
    if (linkedin && !normalised.linkedin) notes.linkedin = 'Paste a profile link like linkedin.com/in/name';
    const candidates = await findContactCandidates({ name, linkedin: normalised.linkedin, emails: [normalised.email] }, undefined, { includeDistinct: true, limit: 20 });
    const body: PersonDupeResponse = { normalised, candidates, block: candidates.some(blocksSave), rule: DUPE_RULES.contactName, notes };
    return NextResponse.json(body);
  }

  if (type === 'contact') {
    const email = p.get('email');
    const linkedin = p.get('linkedin');
    if (email !== null) {
      const match = await findContactByEmail(email);
      return NextResponse.json({ normalised: normEmail(email), freeMail: isFreeMail(email), match, rule: DUPE_RULES.contactEmail });
    }
    if (linkedin !== null) {
      const match = await findContactByLinkedin(linkedin);
      const normalised = normLinkedin(linkedin);
      return NextResponse.json({
        normalised,
        match,
        rule: DUPE_RULES.contactLinkedin,
        note: linkedin.trim() && !normalised ? 'Paste a profile link like linkedin.com/in/name' : undefined,
      });
    }
  }
  return NextResponse.json({ error: 'Use type=org&domain=, type=person&name=&email=&linkedin=, type=contact&email= or type=contact&linkedin=' }, { status: 400 });
}
