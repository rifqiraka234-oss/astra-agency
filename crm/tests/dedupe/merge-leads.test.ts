import { afterAll, describe, expect, it } from 'vitest';
import { closeDb, type Tx } from '../../lib/db';
import { mergeRecords, undoMerge } from '../../lib/data/merge';
import { findContactCandidates } from '../../lib/dupes';
import { stageId, withRollback } from '../helpers';

afterAll(() => closeDb());

async function lead(t: Tx, contactId: string, orgId: string | null, name: string, stageKey: string): Promise<string> {
  const stage = await stageId(t, 'lead', stageKey);
  const [l] = await t<{ id: string }[]>`
    insert into leads (name, contact_id, organization_id, pipeline_id, stage_id)
    select ${name}, ${contactId}, ${orgId}, pipeline_id, id from pipeline_stages where id = ${stage} returning id`;
  return l.id;
}

describe('merging contacts keeps every lead (rolled back)', () => {
  it('moves all leads of both people to the survivor, and undo gives each its own back', async () => {
    await withRollback(async (t) => {
      const [u] = await t<{ id: string }[]>`insert into users (email, name, role) values ('dedupe-merge@astra.local', 'Dedupe Merge', 'admin') returning id`;
      const [o1] = await t<{ id: string }[]>`insert into organizations (name) values ('Leadkeep One') returning id`;
      const [o2] = await t<{ id: string }[]>`insert into organizations (name) values ('Leadkeep Two') returning id`;
      const [keep] = await t<{ id: string }[]>`
        insert into contacts (first_name, last_name, linkedin_url, linkedin_url_normalised)
        values ('Mark', 'Leadkeep', 'https://www.linkedin.com/in/mark-leadkeep', 'linkedin.com/in/mark-leadkeep') returning id`;
      const [gone] = await t<{ id: string }[]>`insert into contacts (first_name, last_name) values ('Mr Mark', 'Leadkeep MBA') returning id`;
      await t`insert into contact_emails (contact_id, email, is_primary) values (${gone.id}, 'mark@leadkeep.example', true)`;

      // A person may have several leads, at more than one organization.
      const keepLeads = [await lead(t, keep.id, o1.id, 'Leadkeep website', 'new'), await lead(t, keep.id, o2.id, 'Leadkeep app', 'new')];
      const goneLeads = [await lead(t, gone.id, o1.id, 'Leadkeep shop', 'new'), await lead(t, gone.id, null, 'Leadkeep squad', 'new')];

      // The rule pairs them on name; nothing confirms it (LinkedIn on one, email on the other), so a person merges.
      const [cand] = await findContactCandidates({ name: 'Mark Leadkeep', linkedin: 'linkedin.com/in/mark-leadkeep' }, t);
      expect(cand.id).toBe(keep.id);
      const [pair] = (await findContactCandidates({ name: 'Mark Leadkeep', excludeIds: [keep.id] }, t)).filter((c) => c.id === gone.id);
      expect(pair.verdict.confidence).toBe('review');

      const logId = await mergeRecords(t, { type: 'contact', winnerId: keep.id, loserId: gone.id, userId: u.id });

      const onKeep = await t<{ id: string }[]>`select id from leads where contact_id = ${keep.id} order by id`;
      expect(onKeep.map((r) => r.id).sort()).toEqual([...keepLeads, ...goneLeads].sort());
      const [left] = await t<{ n: number }[]>`select count(*)::int as n from leads where contact_id = ${gone.id}`;
      expect(left.n).toBe(0);
      const [live] = await t<{ n: number }[]>`select count(*)::int as n from leads where id = any(${[...keepLeads, ...goneLeads]}) and deleted_at is null`;
      expect(live.n).toBe(4);
      const [loser] = await t<{ deleted_at: Date | null }[]>`select deleted_at from contacts where id = ${gone.id}`;
      expect(loser.deleted_at).not.toBeNull();
      const [email] = await t<{ contact_id: string }[]>`select contact_id from contact_emails where email = 'mark@leadkeep.example'`;
      expect(email.contact_id).toBe(keep.id);

      await undoMerge(t, logId, u.id);
      const back = await t<{ id: string; contact_id: string }[]>`select id, contact_id from leads where id = any(${[...keepLeads, ...goneLeads]})`;
      for (const r of back) expect(r.contact_id).toBe(keepLeads.includes(r.id) ? keep.id : gone.id);
    });
  });
});
