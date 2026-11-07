import { afterAll, describe, expect, it } from 'vitest';
import { closeDb, type Tx } from '../../lib/db';
import { mergeRecords, undoMerge, mergeFields } from '../../lib/data/merge';
import { rejectPair, scanDuplicates, similarNames } from '../../lib/data/dupes-scan';
import { logActivity } from '../../lib/activities';
import { createTask } from '../../lib/tasks';
import { stageId, withRollback } from '../helpers';

afterAll(() => closeDb());

async function user(t: Tx): Promise<string> {
  const [u] = await t<{ id: string }[]>`insert into users (email, name, role) values ('merge-test@astra.local', 'Merge Test', 'admin') returning id`;
  return u.id;
}

/** Everything a merge could touch, as plain JSON, for a before and after compare. */
async function state(t: Tx, ids: string[]) {
  const [row] = await t<{ j: unknown }[]>`
    select jsonb_build_object(
      'orgs', (select jsonb_agg(to_jsonb(o) - 'updated_at' order by o.id) from organizations o where o.id = any(${ids})),
      'contacts', (select jsonb_agg(to_jsonb(c) - 'updated_at' order by c.id) from contacts c where c.id = any(${ids})),
      'domains', (select jsonb_agg(to_jsonb(d) - 'updated_at' order by d.id) from organization_domains d where d.organization_id = any(${ids})),
      'emails', (select jsonb_agg(to_jsonb(e) - 'updated_at' order by e.id) from contact_emails e where e.contact_id = any(${ids})),
      'phones', (select jsonb_agg(to_jsonb(p) - 'updated_at' order by p.id) from contact_phones p where p.contact_id = any(${ids})),
      'roles', (select jsonb_agg(to_jsonb(r) - 'updated_at' order by r.id) from contact_org_roles r where r.contact_id = any(${ids}) or r.organization_id = any(${ids})),
      'alinks', (select jsonb_agg(to_jsonb(a) order by a.id) from activity_links a where (a.contact_id = any(${ids}) or a.organization_id = any(${ids})) and a.activity_id not in (select id from activities where source = 'system')),
      'tlinks', (select jsonb_agg(to_jsonb(l) - 'updated_at' order by l.id) from task_links l where l.contact_id = any(${ids}) or l.organization_id = any(${ids})),
      'deals', (select jsonb_agg(jsonb_build_object('id', d.id, 'org', d.organization_id) order by d.id) from deals d where d.organization_id = any(${ids})),
      'leads', (select jsonb_agg(jsonb_build_object('id', l.id, 'c', l.contact_id, 'o', l.organization_id) order by l.id) from leads l where l.contact_id = any(${ids}) or l.organization_id = any(${ids}))
    ) as j`;
  return row.j;
}

describe('merge and undo (rolled back)', () => {
  it('drops the second copy of the same role when two contacts at one organization merge, undo restores it', async () => {
    await withRollback(async (t) => {
      const uid = await user(t);
      const [org] = await t<{ id: string }[]>`insert into organizations (name) values ('Role Dupe Test') returning id`;
      const [a] = await t<{ id: string }[]>`insert into contacts (first_name, last_name, primary_org_id) values ('Rae', 'Dupe', ${org.id}) returning id`;
      const [b] = await t<{ id: string }[]>`insert into contacts (first_name, last_name, primary_org_id) values ('Rae', 'Dupe', ${org.id}) returning id`;
      await t`insert into contact_org_roles (contact_id, organization_id, is_primary, is_current) values (${a.id}, ${org.id}, true, true), (${b.id}, ${org.id}, true, true)`;
      const before = await state(t, [a.id, b.id, org.id]);
      const logId = await mergeRecords(t, { type: 'contact', winnerId: a.id, loserId: b.id, userId: uid });
      const roles = await t`select contact_id from contact_org_roles where organization_id = ${org.id}`;
      expect(roles).toHaveLength(1);
      expect(roles[0].contact_id).toBe(a.id);
      await undoMerge(t, logId, uid);
      expect(await state(t, [a.id, b.id, org.id])).toEqual(before);
    });
  });

  it('merges two organizations, moves every link, and undo puts it all back', async () => {
    await withRollback(async (t) => {
      const uid = await user(t);
      const [a] = await t<{ id: string }[]>`insert into organizations (name, city, custom) values ('Kessler Merge Test GmbH', 'Stuttgart', '{"kvk":"1"}') returning id`;
      const [b] = await t<{ id: string }[]>`insert into organizations (name, city, industry, custom) values ('Kessler Merge Test', 'Stuttgart', 'Manufacturing', '{"note":"x"}') returning id`;
      await t`insert into organization_domains (organization_id, domain_normalised, is_primary) values (${a.id}, 'kessler-merge-a.de', true), (${b.id}, 'kessler-merge-b.de', true)`;
      const [c] = await t<{ id: string }[]>`insert into contacts (first_name, last_name, primary_org_id) values ('Karl', 'Kessler', ${b.id}) returning id`;
      await t`insert into contact_org_roles (contact_id, organization_id, is_primary) values (${c.id}, ${b.id}, true)`;
      const disc = await stageId(t, 'sales', 'discovery_booked');
      await t`insert into deals (name, organization_id, pipeline_id, stage_id) select 'Kessler merge deal', ${b.id}, pipeline_id, id from pipeline_stages where id = ${disc}`;
      // One activity linked to both, one only to b.
      const both = await logActivity({ kind: 'note', title: 'Both', source: 'test', links: [{ organizationId: a.id }, { organizationId: b.id }], autoLink: false }, t);
      await logActivity({ kind: 'note', title: 'Only b', source: 'test', links: [{ organizationId: b.id }], autoLink: false }, t);
      await createTask({ title: 'Call Kessler', links: [{ organizationId: b.id }] } as never, t);

      // The scan finds them.
      const pairs = await scanDuplicates(t);
      const pair = pairs.find((p) => [p.a.id, p.b.id].sort().join() === [a.id, b.id].sort().join());
      expect(pair?.why).toBe('Same name and city');

      // Default winners: a keeps its name, takes b's industry because a has none.
      const f = await mergeFields(t, 'organization', a.id, b.id);
      expect(f.rows.find((r) => r.key === 'name')?.pick).toBe('primary');
      expect(f.rows.find((r) => r.key === 'industry')?.pick).toBe('other');

      const before = await state(t, [a.id, b.id]);
      const logId = await mergeRecords(t, { type: 'organization', winnerId: a.id, loserId: b.id, userId: uid });

      const [loser] = await t<{ deleted_at: Date | null }[]>`select deleted_at from organizations where id = ${b.id}`;
      expect(loser.deleted_at).not.toBeNull();
      const [win] = await t<{ industry: string; custom: Record<string, unknown> }[]>`select industry, custom from organizations where id = ${a.id}`;
      expect(win.industry).toBe('Manufacturing');
      expect(win.custom).toMatchObject({ kvk: '1', note: 'x' });
      const [counts] = await t<{ domains: number; primaries: number; deals: number; contacts: number; links: number; tasks: number }[]>`
        select (select count(*)::int from organization_domains where organization_id = ${a.id}) as domains,
               (select count(*)::int from organization_domains where organization_id = ${a.id} and is_primary) as primaries,
               (select count(*)::int from deals where organization_id = ${a.id}) as deals,
               (select count(*)::int from contacts where primary_org_id = ${a.id}) as contacts,
               (select count(*)::int from activity_links where organization_id = ${a.id} and activity_id in (select activity_id from activity_links where organization_id = ${a.id})) as links,
               (select count(*)::int from task_links where organization_id = ${a.id}) as tasks`;
      expect(counts).toMatchObject({ domains: 2, primaries: 1, deals: 1, contacts: 1, tasks: 1 });
      const [dupLink] = await t<{ n: number }[]>`select count(*)::int as n from activity_links where activity_id = ${both.id}`;
      expect(dupLink.n).toBe(1);

      await undoMerge(t, logId, uid);
      const after = await state(t, [a.id, b.id]);
      // activity_links has no updated_at, the reinserted link keeps its id. Compare everything.
      expect(after).toEqual(before);
      await expect(undoMerge(t, logId, uid)).rejects.toThrow(/already undone/);
    });
  });

  it('merges two contacts with the same phone, moves emails, and undo restores both exactly', async () => {
    await withRollback(async (t) => {
      const uid = await user(t);
      const [org] = await t<{ id: string }[]>`insert into organizations (name) values ('Merge Contact Org') returning id`;
      const [tom] = await t<{ id: string }[]>`
        insert into contacts (first_name, last_name, primary_org_id, linkedin_url, linkedin_url_normalised) values ('Tom', 'Bakker', ${org.id}, null, null) returning id`;
      const [thomas] = await t<{ id: string }[]>`
        insert into contacts (first_name, last_name, job_title, linkedin_url, linkedin_url_normalised)
        values ('Thomas', 'Bakker', 'Head brewer', 'https://linkedin.com/in/thomas-bakker-merge', 'linkedin.com/in/thomas-bakker-merge') returning id`;
      await t`insert into contact_emails (contact_id, email, is_primary) values (${tom.id}, 'tom@merge-test.nl', true), (${thomas.id}, 'thomas@merge-test.nl', true)`;
      await t`insert into contact_phones (contact_id, phone, phone_normalised, is_primary) values (${tom.id}, '06 1234 5678', '+31612345678', true), (${thomas.id}, '+31 6 1234 5678', '+31612345678', true)`;
      await t`insert into contact_org_roles (contact_id, organization_id, is_primary) values (${tom.id}, ${org.id}, true)`;
      const leadStage = await stageId(t, 'lead', 'new');
      await t`insert into leads (contact_id, pipeline_id, stage_id) select ${thomas.id}, pipeline_id, id from pipeline_stages where id = ${leadStage}`;
      await logActivity({ kind: 'note', title: 'Thomas note', source: 'test', links: [{ contactId: thomas.id }], autoLink: false }, t);

      expect(similarNames({ first: 'Tom', last: 'Bakker' }, { first: 'Thomas', last: 'Bakker' })).toBe(true);
      expect(similarNames({ first: 'Tom', last: 'Bakker' }, { first: 'Eva', last: 'Jansen' })).toBe(false);
      const pairs = await scanDuplicates(t);
      expect(pairs.find((p) => p.type === 'contact' && [p.a.id, p.b.id].includes(tom.id) && [p.a.id, p.b.id].includes(thomas.id))?.why).toBe('Similar name, same phone');

      const before = await state(t, [tom.id, thomas.id]);
      const logId = await mergeRecords(t, { type: 'contact', winnerId: tom.id, loserId: thomas.id, userId: uid, choices: { first_name: 'other' } });
      const [w] = await t<{ first_name: string; job_title: string; linkedin_url_normalised: string }[]>`
        select first_name, job_title, linkedin_url_normalised from contacts where id = ${tom.id}`;
      expect(w).toEqual({ first_name: 'Thomas', job_title: 'Head brewer', linkedin_url_normalised: 'linkedin.com/in/thomas-bakker-merge' });
      const [e] = await t<{ n: number; p: number }[]>`
        select count(*)::int as n, count(*) filter (where is_primary)::int as p from contact_emails where contact_id = ${tom.id}`;
      expect(e).toEqual({ n: 2, p: 1 });
      const [lead] = await t<{ n: number }[]>`select count(*)::int as n from leads where contact_id = ${tom.id}`;
      expect(lead.n).toBe(1);

      await undoMerge(t, logId, uid);
      expect(await state(t, [tom.id, thomas.id])).toEqual(before);

      // Not the same: the pair stays out of the scan.
      await rejectPair(t, 'contact', thomas.id, tom.id, uid);
      const again = await scanDuplicates(t);
      expect(again.some((p) => p.type === 'contact' && [p.a.id, p.b.id].includes(tom.id) && [p.a.id, p.b.id].includes(thomas.id))).toBe(false);
    });
  });
});
