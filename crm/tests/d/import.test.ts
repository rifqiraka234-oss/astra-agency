import { afterAll, describe, expect, it } from 'vitest';
import { closeDb, type Tx } from '../../lib/db';
import { parseCsv, previewImport, revertImport, runImport, parseMoney } from '../../lib/data/import';
import { guessMapping, importTargets } from '../../lib/data/import-fields';
import { withRollback } from '../helpers';

afterAll(() => closeDb());

async function adminId(t: Tx): Promise<string> {
  const [u] = await t<{ id: string }[]>`insert into users (email, name, role) values ('import-test@astra.local', 'Import Test', 'admin') returning id`;
  return u.id;
}

const CSV = [
  'Company,Website,Email,Full name,Job title,Phone',
  'Testbrouwerij Noord,https://www.testnoord-import.nl/about,Anna@TestNoord-Import.nl,Anna de Vries,Owner,06 1111 2222',
  'Testbrouwerij Noord,testnoord-import.nl,piet@testnoord-import.nl,Piet Jansen,,',
  'Free Mail Co,,someone-import@gmail.com,Sam Free,Founder,',
  ',,not-an-email,Broken Row,,',
].join('\n');

describe('CSV import (rolled back)', () => {
  it('guesses the mapping from the headers', () => {
    const { headers } = parseCsv(CSV);
    const mapping = guessMapping(headers, importTargets('contacts'));
    expect(mapping).toMatchObject({ Company: 'org.name', Website: 'org.domain', Email: 'contact.email', 'Full name': 'contact.full_name', 'Job title': 'contact.job_title', Phone: 'contact.phone' });
    expect(parseMoney('€ 1.500,50')).toBe('1500.50');
    expect(parseMoney('1,500')).toBe('1500.00');
  });

  it('previews without writing, creates, updates, never wipes on blank, and reverts exactly', async () => {
    await withRollback(async (t) => {
      const userId = await adminId(t);
      const { headers, rows } = parseCsv(CSV);
      const mapping = guessMapping(headers, importTargets('contacts'));

      // Preview writes nothing.
      const preview = await previewImport(t, { objectType: 'contacts', rows, mapping, userId });
      expect(preview.counts).toMatchObject({ rows: 4, created: 3, updated: 0, skipped: 1 });
      expect(preview.outcomes.find((o) => o.status === 'skipped')?.reason).toMatch(/not an email/);
      const [none] = await t<{ n: number }[]>`select count(*)::int as n from contact_emails where email like '%testnoord-import.nl'`;
      expect(none.n).toBe(0);

      // First run creates two contacts at one organization and one with no organization domain.
      const first = await runImport(t, { objectType: 'contacts', fileName: 'test.csv', rows, mapping, userId });
      expect(first.counts).toMatchObject({ created: 3, skipped: 1, orgsCreated: 2 });
      const [org] = await t<{ id: string; name: string }[]>`
        select o.id, o.name from organization_domains d join organizations o on o.id = d.organization_id where d.domain_normalised = 'testnoord-import.nl'`;
      expect(org.name).toBe('Testbrouwerij Noord');
      const [anna] = await t<{ id: string; job_title: string; primary_org_id: string; custom: Record<string, unknown> }[]>`
        select c.id, c.job_title, c.primary_org_id, c.custom from contacts c join contact_emails e on e.contact_id = c.id where e.email = 'anna@testnoord-import.nl'`;
      expect(anna.job_title).toBe('Owner');
      expect(anna.primary_org_id).toBe(org.id);
      const [freeOrg] = await t<{ n: number }[]>`select count(*)::int as n from organization_domains where domain_normalised = 'gmail.com'`;
      expect(freeOrg.n).toBe(0);

      // Second file updates Anna by email. The blank job title must not wipe "Owner".
      const csv2 = ['Email,Job title,City,First name', 'ANNA@testnoord-import.nl,,Groningen,Anna', 'piet@testnoord-import.nl,Brewer,,'].join('\n');
      const p2 = parseCsv(csv2);
      const map2 = guessMapping(p2.headers, importTargets('contacts'));
      const second = await runImport(t, { objectType: 'contacts', fileName: 'update.csv', rows: p2.rows, mapping: map2, userId });
      expect(second.counts).toMatchObject({ created: 0, updated: 2 });
      const [anna2] = await t<{ job_title: string; city: string }[]>`select job_title, city from contacts where id = ${anna.id}`;
      expect(anna2).toEqual({ job_title: 'Owner', city: 'Groningen' });

      // Piet got a job title from the second file.
      const [piet] = await t<{ id: string }[]>`select contact_id as id from contact_emails where email = 'piet@testnoord-import.nl'`;

      // Revert the second import: Anna's city goes back to empty, Piet's title back to empty.
      const r2 = await revertImport(t, second.jobId, userId);
      expect(r2.restored).toBe(2);
      const [anna3] = await t<{ job_title: string; city: string | null }[]>`select job_title, city from contacts where id = ${anna.id}`;
      expect(anna3).toEqual({ job_title: 'Owner', city: null });
      const [piet3] = await t<{ job_title: string | null }[]>`select job_title from contacts where id = ${piet.id}`;
      expect(piet3.job_title).toBeNull();
      await expect(revertImport(t, second.jobId, userId)).rejects.toThrow(/already reverted/);

      // Revert the first import: everything it created is gone.
      const r1 = await revertImport(t, first.jobId, userId);
      expect(r1.deleted).toBeGreaterThanOrEqual(3);
      const [left] = await t<{ n: number }[]>`
        select (select count(*) from contact_emails where email like '%testnoord-import.nl' or email = 'someone-import@gmail.com')
             + (select count(*) from organizations where name in ('Testbrouwerij Noord', 'Free Mail Co'))
             + (select count(*) from organization_domains where domain_normalised = 'testnoord-import.nl') as n`;
      expect(Number(left.n)).toBe(0);
      const [job] = await t<{ status: string }[]>`select status from import_jobs where id = ${first.jobId}`;
      expect(job.status).toBe('reverted');
    });
  });

  it('restores an existing record exactly and keeps edits made after the import', async () => {
    await withRollback(async (t) => {
      const userId = await adminId(t);
      const [org] = await t<{ id: string }[]>`
        insert into organizations (name, industry, city, custom) values ('Revert Exact BV', 'Retail', 'Utrecht', '{"keep":"me"}') returning id`;
      await t`insert into organization_domains (organization_id, domain_normalised, is_primary) values (${org.id}, 'revert-exact-test.nl', true)`;
      const [before] = await t<{ j: Record<string, unknown> }[]>`select to_jsonb(o) - 'updated_at' as j from organizations o where id = ${org.id}`;

      const csv = ['Domain,Name,Industry,City,KvK', 'revert-exact-test.nl,Revert Exact,Hospitality,,12345678'].join('\n');
      const p = parseCsv(csv);
      const mapping = { Domain: 'org.domain', Name: 'org.name', Industry: 'org.industry', City: 'org.city', KvK: 'org.kvk_number' };
      const run = await runImport(t, { objectType: 'organizations', fileName: 'orgs.csv', rows: p.rows, mapping, userId });
      expect(run.counts.updated).toBe(1);
      const [mid] = await t<{ name: string; industry: string; city: string; kvk_number: string }[]>`select name, industry, city, kvk_number from organizations where id = ${org.id}`;
      expect(mid).toEqual({ name: 'Revert Exact', industry: 'Hospitality', city: 'Utrecht', kvk_number: '12345678' });

      await revertImport(t, run.jobId, userId);
      const [after] = await t<{ j: Record<string, unknown> }[]>`select to_jsonb(o) - 'updated_at' as j from organizations o where id = ${org.id}`;
      expect(after.j).toEqual(before.j);

      // Edited after a second import: revert keeps the edit and says so.
      const run2 = await runImport(t, { objectType: 'organizations', fileName: 'orgs.csv', rows: p.rows, mapping, userId });
      await t`update organizations set industry = 'Legal' where id = ${org.id}`;
      const r = await revertImport(t, run2.jobId, userId);
      expect(r.kept).toBe(1);
      const [final] = await t<{ industry: string; name: string; kvk_number: string | null }[]>`select industry, name, kvk_number from organizations where id = ${org.id}`;
      expect(final).toEqual({ industry: 'Legal', name: 'Revert Exact BV', kvk_number: null });
    });
  });

  it('imports deals into the first open sales stage and skips closed stages', async () => {
    await withRollback(async (t) => {
      const userId = await adminId(t);
      const csv = ['Deal name,Amount,Close date,Company,Website,Stage', 'Import deal one,"€ 4.500",30-11-2026,Deal Import Org,deal-import-test.nl,', 'Import deal two,100,2026-12-01,Deal Import Org,deal-import-test.nl,Won'].join('\n');
      const p = parseCsv(csv);
      const mapping = guessMapping(p.headers, importTargets('deals'));
      const run = await runImport(t, { objectType: 'deals', fileName: 'deals.csv', rows: p.rows, mapping, userId });
      expect(run.counts).toMatchObject({ created: 1, skipped: 1 });
      const [deal] = await t<{ amount: string; close_date: string; stage_key: string }[]>`
        select d.amount, d.close_date, s.key as stage_key from deals d join pipeline_stages s on s.id = d.stage_id where d.name = 'Import deal one'`;
      expect(deal).toEqual({ amount: '4500.00', close_date: '2026-11-30', stage_key: 'discovery_booked' });
      await revertImport(t, run.jobId, userId);
      const [n] = await t<{ n: number }[]>`select count(*)::int as n from deals where name = 'Import deal one' and deleted_at is null`;
      expect(n.n).toBe(0);
    });
  });
});
