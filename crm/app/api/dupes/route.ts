/**
 * GET /api/dupes?type=org&domain=https://www.dekade.nl/taproom
 * GET /api/dupes?type=contact&email=EVA@dekade.nl
 * GET /api/dupes?type=contact&linkedin=https://linkedin.com/in/eva-jansen
 * -> { normalised, freeMail, match: DupeMatch | null, rule, note? }
 */
import { NextResponse, type NextRequest } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { DUPE_RULES, findContactByEmail, findContactByLinkedin, findOrgByDomain } from '@/lib/dupes';
import { isFreeMail, normDomain, normEmail, normLinkedin } from '@/lib/normalize';

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
  return NextResponse.json({ error: 'Use type=org&domain=, type=contact&email= or type=contact&linkedin=' }, { status: 400 });
}
