import { afterAll, describe, expect, it } from 'vitest';
import bcrypt from 'bcryptjs';
import { closeDb, type Tx } from '../../lib/db';
import { addRequiredField, addStage, archiveStage, moveStageOrder, pipelineDetail, removeRequiredField, restoreStage, updateStage } from '../../lib/settings/pipelines';
import { inviteUser, setActive, setRole } from '../../lib/settings/users';
import { auditDiff, auditPage } from '../../lib/settings/audit';
import { exportObject, toCsv } from '../../lib/data/export';
import { stageId, withRollback } from '../helpers';

afterAll(() => closeDb());

async function salesPipeline(t: Tx) {
  const [p] = await t<{ id: string }[]>`select id from pipelines where key = 'sales'`;
  return p.id;
}

describe('pipelines settings (rolled back)', () => {
  it('adds, orders, edits and archives stages, moving records out first', async () => {
    await withRollback(async (t) => {
      const pid = await salesPipeline(t);
      const id = await addStage(t, pid, { name: 'Pilot running', probability: 50, state: 'open', rot_days: 21 });
      let d = (await pipelineDetail(t, pid))!;
      const live = d.stages.filter((x) => !x.archived_at);
      const idx = live.findIndex((x) => x.id === id);
      expect(live[idx + 1].state).not.toBe('open'); // before the closing stages
      expect(live.slice(idx + 1).every((x) => x.state !== 'open')).toBe(true);

      await moveStageOrder(t, id, 'up');
      d = (await pipelineDetail(t, pid))!;
      expect(d.stages.filter((x) => !x.archived_at)[idx - 1].id).toBe(id);

      await expect(t.savepoint((sp) => updateStage(sp as unknown as Tx, id, { name: 'Pilot', probability: 140, state: 'open', rot_days: null }))).rejects.toMatchObject({
        fieldErrors: { probability: 'At most 100' },
      });
      await updateStage(t, id, { name: 'Pilot', probability: 55, state: 'open', rot_days: null });

      await addRequiredField(t, id, 'next_step');
      await expect(t.savepoint((sp) => addRequiredField(sp as unknown as Tx, id, 'next_step'))).rejects.toThrow(/already requires/);
      await expect(t.savepoint((sp) => addRequiredField(sp as unknown as Tx, id, 'not_a_field'))).rejects.toThrow(/cannot be required/);
      d = (await pipelineDetail(t, pid))!;
      const req = d.stages.find((x) => x.id === id)!.required;
      expect(req.map((r) => r.field_key)).toEqual(['next_step']);

      // A deal in the stage blocks archiving until a target is given.
      const [deal] = await t<{ id: string }[]>`
        insert into deals (name, pipeline_id, stage_id, next_step) values ('Archive test deal', ${pid}, ${id}, 'Call') returning id`;
      await expect(t.savepoint((sp) => archiveStage(sp as unknown as Tx, id, { actorId: null }))).rejects.toThrow(/still in Pilot/);
      const proposal = await stageId(t, 'sales', 'proposal_sent'); // needs amount and quote
      await expect(t.savepoint((sp) => archiveStage(sp as unknown as Tx, id, { moveToStageId: proposal, actorId: null }))).rejects.toThrow(/without amount and quote/);
      const disc = await stageId(t, 'sales', 'discovery_booked');
      await t`update deals set meeting_at = now() where id = ${deal.id}`;
      const res = await archiveStage(t, id, { moveToStageId: disc, actorId: null });
      expect(res.moved).toBe(1);
      const [moved] = await t<{ stage_id: string }[]>`select stage_id from deals where id = ${deal.id}`;
      expect(moved.stage_id).toBe(disc);
      const [trans] = await t<{ n: number }[]>`select count(*)::int as n from stage_transitions where record_id = ${deal.id} and to_stage_id = ${disc}`;
      expect(trans.n).toBe(1);

      await restoreStage(t, id);
      await removeRequiredField(t, req[0].id);
      d = (await pipelineDetail(t, pid))!;
      expect(d.stages.find((x) => x.id === id)?.archived_at).toBeNull();
    });
  });
});

describe('users settings (rolled back)', () => {
  it('invites with a one time password and keeps at least one active admin', async () => {
    await withRollback(async (t) => {
      // Only this admin is active inside the transaction.
      await t`update users set is_active = false`;
      const [me] = await t<{ id: string }[]>`insert into users (email, name, role) values ('users-test-admin@astra.local', 'Users Admin', 'admin') returning id`;
      const { id, password } = await inviteUser(t, { name: 'New Person', email: ' New.Person@Astra.Local ', role: 'sales', teamId: null });
      expect(password).toMatch(/^[A-Za-z0-9]{14}$/);
      const [u] = await t<{ email: string; password_hash: string; initials: string }[]>`select email, password_hash, initials from users where id = ${id}`;
      expect(u.email).toBe('new.person@astra.local');
      expect(u.initials).toBe('NP');
      expect(await bcrypt.compare(password, u.password_hash)).toBe(true);
      await expect(t.savepoint((sp) => inviteUser(sp as unknown as Tx, { name: 'Again', email: 'new.person@astra.local', role: 'sales' }))).rejects.toThrow(/already belongs/);

      await expect(t.savepoint((sp) => setRole(sp as unknown as Tx, me.id, me.id, 'sales'))).rejects.toThrow(/own role/);
      await expect(t.savepoint((sp) => setActive(sp as unknown as Tx, me.id, me.id, false))).rejects.toThrow(/yourself/);
      await setRole(t, me.id, id, 'admin');
      await setRole(t, id, me.id, 'sales'); // another admin exists now
      await expect(t.savepoint((sp) => setActive(sp as unknown as Tx, me.id, id, false))).rejects.toThrow(/at least one active admin/);
    });
  });
});

describe('audit and export', () => {
  it('shows old and new values for a change and pages by id', async () => {
    await withRollback(async (t) => {
      const [u] = await t<{ id: string }[]>`insert into users (email, name, role) values ('audit-test@astra.local', 'Audit Test', 'admin') returning id`;
      await t`select set_config('app.user_id', ${u.id}, true)`;
      const [org] = await t<{ id: string }[]>`insert into organizations (name, city) values ('Audit Test Org', 'Delft') returning id`;
      await t`update organizations set city = 'Leiden' where id = ${org.id}`;
      const page = await auditPage(t, { table: 'organizations', recordId: org.id, limit: 1 });
      expect(page.rows).toHaveLength(1);
      expect(page.rows[0].actor_name).toBe('Audit Test');
      expect(auditDiff(page.rows[0])).toEqual([{ field: 'city', old: 'Delft', new: 'Leiden' }]);
      expect(page.nextBefore).not.toBeNull();
      const older = await auditPage(t, { table: 'organizations', recordId: org.id, before: page.nextBefore, limit: 1 });
      expect(older.rows[0].action).toBe('insert');
      expect(older.nextBefore).toBeNull();
    });
  });

  it('writes CSV that Excel opens and that does not run formulas', async () => {
    const csv = toCsv([{ a: '=HYPERLINK("x")', b: -5, c: 'Brouwerij, De Kade' }], [
      { header: 'A', value: (r) => r.a },
      { header: 'B', value: (r) => r.b },
      { header: 'C', value: (r) => r.c },
    ]);
    expect(csv.startsWith('﻿A,B,C\r\n')).toBe(true);
    expect(csv).toContain(`"'=HYPERLINK(""x"")",-5,"Brouwerij, De Kade"`);
    const res = await exportObject('organizations');
    expect(res.csv.split('\r\n')[0]).toContain('CRM id');
  });
});
