import { afterAll, describe, expect, it } from 'vitest';
import { closeDb, type Tx } from '../../lib/db';
import { compareContacts, decideContactMatch } from '../../lib/dedupe';
import { blocksSave, findContactCandidates } from '../../lib/dupes';
import { findExistingContact } from '../../lib/integrations/match';
import { scanDuplicates } from '../../lib/data/dupes-scan';
import { parseCsv, previewImport } from '../../lib/data/import';
import { guessMapping, importTargets } from '../../lib/data/import-fields';
import { withRollback } from '../helpers';

afterAll(() => closeDb());

const LI_A = 'https://www.linkedin.com/in/andy-tidd-dedupe/';
const LI_B = 'linkedin.com/in/someone-else-dedupe';

describe('the ordered rule, name then LinkedIn then email', () => {
  it('1. name first: honorifics and suffixes do not hide a match, a different name is not a name match', () => {
    const v = compareContacts({ name: 'Andy Tidd Fbcs' }, { name: 'Andy Tidd' });
    expect(v?.basis).toBe('name');
    expect(compareContacts({ name: 'Dr Ashish Rajput' }, { name: 'Ashish Rajput' })?.basis).toBe('name');
    expect(compareContacts({ name: 'Tidd Andy' }, { name: 'Andy Tidd' })).toBeNull();
    expect(compareContacts({ name: 'Andrew Tidd' }, { name: 'Andy Tidd' })).toBeNull();
  });

  it('2. then LinkedIn: the same profile confirms, different profiles are different people', () => {
    expect(compareContacts({ name: 'Andy Tidd Fbcs', linkedin: LI_A }, { name: 'Andy Tidd', linkedin: 'linkedin.com/in/andy-tidd-dedupe' })).toEqual({
      confidence: 'linkedin',
      basis: 'name',
      reason: 'Same name and the same LinkedIn profile',
    });
    const diff = compareContacts(
      { name: 'Andy Tidd', linkedin: LI_A, emails: ['andy@tidd.example'] },
      { name: 'Andy Tidd', linkedin: LI_B, emails: ['andy@tidd.example'] },
    );
    expect(diff?.confidence).toBe('distinct'); // even a shared email does not overrule two different profiles
  });

  it('3. then email: with LinkedIn missing on one side the same email confirms, different emails are for review', () => {
    expect(compareContacts({ name: 'Mark Preston', linkedin: LI_A, emails: ['Mark@Hyper.example'] }, { name: 'Mark Preston', emails: ['mark@hyper.example '] })).toEqual({
      confidence: 'email',
      basis: 'name',
      reason: 'Same name and the same email mark@hyper.example, LinkedIn on one record only',
    });
    expect(compareContacts({ name: 'Mark Preston', emails: ['a@hyper.example'] }, { name: 'Mark Preston', emails: ['b@hyper.example'] })).toEqual({
      confidence: 'review',
      basis: 'name',
      reason: 'Same name, different emails and no LinkedIn on either',
    });
  });

  it('4. a name match with no LinkedIn and no email on either side is for review, never automatic', () => {
    const v = compareContacts({ name: 'Clara Champion' }, { name: 'Clara Champion' });
    expect(v).toEqual({ confidence: 'review', basis: 'name', reason: 'Same name, no LinkedIn or email on either record' });
    expect(decideContactMatch([{ id: 'x', name: 'Clara Champion', verdict: v! }])).toMatchObject({ kind: 'new', review: [{ id: 'x' }] });
  });

  it('5. the same LinkedIn or email under a different name is for review', () => {
    expect(compareContacts({ name: 'Andrew Tidd', linkedin: LI_A }, { name: 'Andy Tidd', linkedin: LI_A })).toEqual({
      confidence: 'review',
      basis: 'identifier',
      reason: 'Same LinkedIn profile, different name (Andrew Tidd and Andy Tidd)',
    });
    const v = compareContacts({ name: 'Hypergility Ltd', emails: ['hello@hyper.example'] }, { name: 'Mark Preston', emails: ['hello@hyper.example'] });
    expect(v).toMatchObject({ confidence: 'review', basis: 'identifier' });
    expect(decideContactMatch([{ id: 'm', name: 'Mark Preston', verdict: v! }])).toMatchObject({ kind: 'held', id: 'm' });
  });

  it('decides: one confirmed record is a match, two different confirmed records need a person', () => {
    const li = { confidence: 'linkedin' as const, basis: 'name' as const, reason: 'x' };
    const em = { confidence: 'email' as const, basis: 'name' as const, reason: 'y' };
    expect(decideContactMatch([{ id: 'a', name: 'A', verdict: li }])).toMatchObject({ kind: 'match', id: 'a', confidence: 'linkedin' });
    expect(decideContactMatch([{ id: 'a', name: 'A', verdict: li }, { id: 'b', name: 'B', verdict: em }])).toMatchObject({ kind: 'conflict', ids: ['a', 'b'] });
  });
});

async function contact(t: Tx, first: string, last: string | null, li?: string | null, email?: string): Promise<string> {
  const [c] = await t<{ id: string }[]>`
    insert into contacts (first_name, last_name, linkedin_url, linkedin_url_normalised)
    values (${first}, ${last}, ${li ?? null}, ${li ? li.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '') : null}) returning id`;
  if (email) await t`insert into contact_emails (contact_id, email, is_primary) values (${c.id}, ${email}, true)`;
  return c.id;
}

describe('the rule against the database (rolled back)', () => {
  it('finds candidates through the stored normalised name and blocks only confirmed or taken identifiers', async () => {
    await withRollback(async (t) => {
      const andy = await contact(t, 'Andy', 'Tidddedupe Fbcs', LI_A);
      const clara = await contact(t, 'Clara', 'Championdedupe');
      const [{ name_normalised }] = await t<{ name_normalised: string }[]>`select name_normalised from contacts where id = ${andy}`;
      expect(name_normalised).toBe('andy tidddedupe');

      const byLi = await findContactCandidates({ name: 'Andy Tidddedupe', linkedin: LI_A }, t);
      expect(byLi.map((c) => [c.id, c.verdict.confidence])).toEqual([[andy, 'linkedin']]);
      expect(blocksSave(byLi[0])).toBe(true);

      const nameOnly = await findContactCandidates({ name: 'Dr. Clara Championdedupe' }, t);
      expect(nameOnly.map((c) => [c.id, c.verdict.confidence])).toEqual([[clara, 'review']]);
      expect(blocksSave(nameOnly[0])).toBe(false);

      const other = await findContactCandidates({ name: 'Andy Tidddedupe', linkedin: LI_B }, t, { includeDistinct: true });
      expect(other.map((c) => c.verdict.confidence)).toEqual(['distinct']);
      expect(blocksSave(other[0])).toBe(false);

      const nickname = await findContactCandidates({ name: 'Andrew Tidddedupe', linkedin: LI_A }, t);
      expect(nickname[0]).toMatchObject({ id: andy, holdsIdentifier: true, verdict: { confidence: 'review', basis: 'identifier' } });
      expect(blocksSave(nickname[0])).toBe(true); // the unique index is the hard guard
    });
  });

  it('lemlist and JSONL matching use a confirmed match, never a name alone', async () => {
    await withRollback(async (t) => {
      const andy = await contact(t, 'Andy', 'Tidddedupe', LI_A);
      const mark = await contact(t, 'Mark', 'Prestondedupe', null, 'mark@prestondedupe.example');
      await contact(t, 'Clara', 'Championdedupe');

      expect(await findExistingContact(t, { name: 'Andy Tidddedupe Fbcs', linkedin: LI_A })).toMatchObject({ id: andy, how: 'linkedin' });
      expect(await findExistingContact(t, { name: 'Mark Prestondedupe', linkedin: LI_B, email: 'MARK@prestondedupe.example' })).toMatchObject({ id: mark, how: 'email' });
      expect(await findExistingContact(t, { name: 'Clara Championdedupe' })).toMatchObject({ id: null, how: 'new', review: 1 });
      expect(await findExistingContact(t, { name: 'Andy Tidddedupe', linkedin: LI_B })).toMatchObject({ id: null, how: 'new', review: 0 });
      expect(await findExistingContact(t, { name: 'Andrew Tidddedupe', linkedin: LI_A })).toMatchObject({ id: andy, how: 'held', review: 1 });
    });
  });

  it('the CSV import updates confirmed matches, creates name only matches with a warning, skips another name on the same email', async () => {
    await withRollback(async (t) => {
      const [u] = await t<{ id: string }[]>`insert into users (email, name, role) values ('dedupe-test@astra.local', 'Dedupe Test', 'admin') returning id`;
      await contact(t, 'Mark', 'Prestondedupe', null, 'mark@prestondedupe.example');
      await contact(t, 'Clara', 'Championdedupe');
      const csv = [
        'Full name,Email,Job title',
        'Mark Prestondedupe MBA,mark@prestondedupe.example,Founder',
        'Clara Championdedupe,clara@championdedupe.example,Owner',
        'Hypergility Dedupe,mark@prestondedupe.example,',
      ].join('\n');
      const { headers, rows } = parseCsv(csv);
      const res = await previewImport(t, { objectType: 'contacts', rows, mapping: guessMapping(headers, importTargets('contacts')), userId: u.id });
      expect(res.outcomes.map((o) => o.status)).toEqual(['updated', 'created', 'skipped']);
      expect(res.outcomes[1].warnings?.[0]).toMatch(/^Possible duplicate of Clara Championdedupe/);
      expect(res.outcomes[2].reason).toMatch(/^Same email mark@prestondedupe\.example, different name/);
    });
  });

  it('the scan puts confirmed pairs first and leaves different LinkedIn profiles out', async () => {
    await withRollback(async (t) => {
      // The unique indexes stop exact copies, so these are the leftovers they cannot see:
      // a raw LinkedIn URL never cleaned, and an email saved with mailto.
      const [a1] = await t<{ id: string }[]>`insert into contacts (first_name, last_name, linkedin_url) values ('Dr Zed', 'Dedupescan', ${LI_A}) returning id`;
      const a2 = await contact(t, 'Zed', 'Dedupescan PhD', 'linkedin.com/in/andy-tidd-dedupe');
      const b1 = await contact(t, 'Yara', 'Dedupescan', null, 'yara@dedupescan.example');
      const b2 = await contact(t, 'Yara', 'Dedupescan', LI_B, 'mailto:yara@dedupescan.example');
      const c1 = await contact(t, 'Xena', 'Dedupescan');
      const c2 = await contact(t, 'Xena', 'Dedupescan');
      await contact(t, 'Wim', 'Dedupescan', 'linkedin.com/in/wim-one-dedupe');
      await contact(t, 'Wim', 'Dedupescan', 'linkedin.com/in/wim-two-dedupe');

      const pairs = (await scanDuplicates(t, 5000)).filter((p) => p.a.name.includes('Dedupescan'));
      const of = (x: string, y: string) => pairs.find((p) => [p.a.id, p.b.id].sort().join() === [x, y].sort().join());
      expect(of(a1.id, a2)?.confidence).toBe('linkedin');
      expect(of(b1, b2)?.confidence).toBe('email');
      expect(of(c1, c2)?.confidence).toBe('review');
      expect(pairs.some((p) => p.a.name.startsWith('Wim'))).toBe(false);
      const all = await scanDuplicates(t, 5000);
      const firstReview = all.findIndex((p) => p.confidence === 'review');
      expect(all.slice(firstReview).every((p) => p.confidence === 'review')).toBe(true);
      expect(all.indexOf(of(a1.id, a2)!)).toBeLessThan(firstReview);
      expect(all.indexOf(of(b1, b2)!)).toBeLessThan(firstReview);
    });
  });
});
