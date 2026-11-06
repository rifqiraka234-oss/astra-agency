import { afterAll, describe, expect, it } from 'vitest';
import { closeDb, type Tx } from '../../lib/db';
import { findDuplicateValues, hasUniqueIndex, saveField, setFieldArchived } from '../../lib/settings/fields';
import { SettingsError } from '../../lib/settings/errors';
import { evaluateExpression, parseExpression } from '../../lib/settings/calc';
import { computeRollup } from '../../lib/settings/computed';
import { stageId, withRollback } from '../helpers';

afterAll(() => closeDb());

async function user(t: Tx): Promise<string> {
  const [u] = await t<{ id: string }[]>`insert into users (email, name, role) values ('fields-test@astra.local', 'Fields Test', 'admin') returning id`;
  return u.id;
}

describe('custom fields (rolled back)', () => {
  it('refuses unique on existing duplicates with the list, then creates the index once they are fixed', async () => {
    await withRollback(async (t) => {
      const uid = await user(t);
      const [a] = await t<{ id: string }[]>`insert into organizations (name, custom) values ('Unique Test A', '{"kvk_test":"12345678"}') returning id`;
      await t`insert into organizations (name, custom) values ('Unique Test B', '{"kvk_test":"12345678"}')`;
      await t`insert into organizations (name, custom, deleted_at) values ('Unique Test Deleted', '{"kvk_test":"99999999"}', now())`;

      const dupes = await findDuplicateValues(t, 'organization', 'kvk_test');
      expect(dupes).toHaveLength(1);
      expect(dupes[0].value).toBe('12345678');
      expect(dupes[0].records.map((r) => r.label).sort()).toEqual(['Unique Test A', 'Unique Test B']);

      let err: unknown;
      try {
        await t.savepoint((sp) => saveField(sp as unknown as Tx, { objectType: 'organization', internalName: 'kvk_test', label: 'KvK test', fieldType: 'text', isUnique: true }, uid));
      } catch (e) {
        err = e;
      }
      expect(err).toBeInstanceOf(SettingsError);
      expect((err as SettingsError).message).toMatch(/can't be unique yet/);
      expect((err as SettingsError).details).toMatchObject({ duplicates: [{ value: '12345678' }] });
      const [none] = await t<{ n: number }[]>`select count(*)::int as n from field_definitions where internal_name = 'kvk_test'`;
      expect(none.n).toBe(0);

      // Fix the duplicate, then it works and the database enforces it.
      await t`update organizations set custom = custom || '{"kvk_test":"87654321"}' where id = ${a.id}`;
      const id = await saveField(t, { objectType: 'organization', internalName: 'kvk_test', label: 'KvK test', fieldType: 'text', isUnique: true }, uid);
      expect(await hasUniqueIndex(t, id)).toBe(true);
      await expect(
        t.savepoint((sp) => sp`insert into organizations (name, custom) values ('Unique Test C', '{"kvk_test":"87654321"}')`),
      ).rejects.toMatchObject({ code: '23505' });

      // Internal name and type are fixed after creation.
      await expect(
        t.savepoint((sp) => saveField(sp as unknown as Tx, { id, objectType: 'organization', internalName: 'kvk_other', label: 'KvK', fieldType: 'text' }, uid)),
      ).rejects.toThrow(/internal name cannot change/);
      await expect(
        t.savepoint((sp) => saveField(sp as unknown as Tx, { id, objectType: 'organization', label: 'KvK', fieldType: 'number' }, uid)),
      ).rejects.toThrow(/type cannot change/);

      // Unique off drops the index, archive keeps the values.
      await saveField(t, { id, objectType: 'organization', label: 'KvK number test', fieldType: 'text', isUnique: false }, uid);
      expect(await hasUniqueIndex(t, id)).toBe(false);
      await setFieldArchived(t, id, true);
      const [arch] = await t<{ archived_at: Date | null; label: string }[]>`select archived_at, label from field_definitions where id = ${id}`;
      expect(arch.archived_at).not.toBeNull();
      expect(arch.label).toBe('KvK number test');
    });
  });

  it('rejects core names, validates options, calculations and rollups', async () => {
    await withRollback(async (t) => {
      const uid = await user(t);
      await expect(
        t.savepoint((sp) => saveField(sp as unknown as Tx, { objectType: 'organization', internalName: 'name', label: 'Name', fieldType: 'text' }, uid)),
      ).rejects.toMatchObject({ fieldErrors: { internalName: expect.stringMatching(/core field/) } });
      await expect(
        t.savepoint((sp) => saveField(sp as unknown as Tx, { objectType: 'deal', internalName: 'tier', label: 'Tier', fieldType: 'select', options: [] }, uid)),
      ).rejects.toThrow(/at least one option/);
      const sel = await saveField(t, { objectType: 'deal', internalName: 'tier_test', label: 'Tier', fieldType: 'select', options: [{ value: 'a', label: 'A' }, { value: 'b', label: 'B' }], newGroupName: 'Scoring' }, uid);
      const [g] = await t<{ name: string }[]>`select g.name from field_definitions f join field_groups g on g.id = f.group_id where f.id = ${sel}`;
      expect(g.name).toBe('Scoring');

      await saveField(t, { objectType: 'deal', internalName: 'hours_test', label: 'Hours', fieldType: 'number' }, uid);
      await expect(
        t.savepoint((sp) => saveField(sp as unknown as Tx, { objectType: 'deal', internalName: 'calc_bad', label: 'Bad', fieldType: 'calculation', config: { expression: 'amount * nope' } }, uid)),
      ).rejects.toMatchObject({ fieldErrors: { expression: expect.stringMatching(/Unknown field "nope"/) } });
      await saveField(t, { objectType: 'deal', internalName: 'per_hour_test', label: 'Per hour', fieldType: 'calculation', config: { expression: 'amount / hours_test' } }, uid);

      const p = parseExpression('amount * probability / 100', ['amount', 'probability']);
      expect(p.ok && evaluateExpression(p.ast, { amount: '1500.00', probability: 40 })).toBe(600);
      expect(parseExpression('amount * (2', ['amount']).ok).toBe(false);

      // Rollup: sum of open deal amounts on an organization.
      const rid = await saveField(t, { objectType: 'organization', internalName: 'open_value_test', label: 'Open deal value', fieldType: 'rollup', config: { relation: 'deals', fn: 'sum', field: 'amount', openOnly: true } }, uid);
      const [cfg] = await t<{ config: Record<string, unknown> }[]>`select config from field_definitions where id = ${rid}`;
      const [org] = await t<{ id: string }[]>`insert into organizations (name) values ('Rollup Test Org') returning id`;
      const open = await stageId(t, 'sales', 'proposal_sent');
      const won = await stageId(t, 'sales', 'won');
      await t`insert into deals (name, organization_id, pipeline_id, stage_id, amount) select 'R1', ${org.id}, pipeline_id, id, 1000 from pipeline_stages where id = ${open}`;
      await t`insert into deals (name, organization_id, pipeline_id, stage_id, amount) select 'R2', ${org.id}, pipeline_id, id, 2500.50 from pipeline_stages where id = ${open}`;
      await t`insert into deals (name, organization_id, pipeline_id, stage_id, amount) select 'R3', ${org.id}, pipeline_id, id, 9000 from pipeline_stages where id = ${won}`;
      expect(await computeRollup('organization', org.id, cfg.config as never, t)).toBe(3500.5);
      expect(await computeRollup('organization', org.id, { relation: 'deals', fn: 'count' }, t)).toBe(3);
    });
  });
});
