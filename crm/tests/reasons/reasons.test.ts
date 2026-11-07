import { afterAll, describe, expect, it } from 'vitest';
import { closeDb } from '../../lib/db';
import { moveStage, stageGate, StageMoveError } from '../../lib/stages';
import { disqualifyLead, updateRecordFields } from '../../lib/sales/service';
import { assertActiveReason, listReasons, ReasonError } from '../../lib/reasons';
import { addReason, moveReason, renameReason, setReasonArchived } from '../../lib/settings/reasons';
import { stageId, withRollback } from '../helpers';
import { reasonFixture } from './fixtures';

afterAll(() => closeDb());

const user = (id: string) => ({ type: 'user' as const, id });

describe('a reason is required to disqualify a lead or lose a deal (rolled back)', () => {
  it('disqualify without a reason is refused everywhere, with one it stores reason and note', async () => {
    await withRollback(async (t) => {
      const f = await reasonFixture(t, 'r1');
      const disq = await stageId(t, 'lead', 'disqualified');

      // The service refuses an empty reason before touching the lead.
      const e1 = await disqualifyLead(t, { leadId: f.leadId, reason: '', actor: f.user }).catch((e) => e);
      expect(e1).toBeInstanceOf(StageMoveError);
      expect(e1.code).toBe('required_fields');

      // moveStage (board drop, stage path, automations) refuses too, listing the reason field with the active list.
      const e2 = await moveStage(t, { objectType: 'lead', recordId: f.leadId, toStageId: disq, actor: user(f.user.id) }).catch((e) => e);
      expect(e2).toMatchObject({ code: 'required_fields', missing: [expect.objectContaining({ field_key: 'disqualify_reason', input_type: 'select' })] });
      const offered = (e2 as StageMoveError).fields.find((x) => x.field_key === 'disqualify_reason')!.options!.map((o) => o.value);
      expect(offered).toContain('no_reply');
      expect(offered).toContain('has_agency');

      // Even with the stage's required field removed in settings, the reason stays required.
      await t`delete from stage_required_fields where stage_id = ${disq} and field_key = 'disqualify_reason'`;
      const e3 = await moveStage(t, { objectType: 'lead', recordId: f.leadId, toStageId: disq, actor: user(f.user.id) }).catch((e) => e);
      expect(e3).toMatchObject({ code: 'required_fields', missing: [expect.objectContaining({ field_key: 'disqualify_reason' })] });
      const gate = await stageGate('lead', f.leadId, disq, t);
      expect(gate.map((g) => g.field_key)).toContain('disqualify_reason');

      await disqualifyLead(t, { leadId: f.leadId, reason: 'has_agency', note: '  Works with a Utrecht studio  ', actor: f.user });
      const [lead] = await t<{ key: string; disqualify_reason: string; disqualify_note: string }[]>`
        select s.key, l.disqualify_reason, l.disqualify_note from leads l join pipeline_stages s on s.id = l.stage_id where l.id = ${f.leadId}`;
      expect(lead).toEqual({ key: 'disqualified', disqualify_reason: 'has_agency', disqualify_note: 'Works with a Utrecht studio' });

      // A disqualified lead cannot have its reason cleared from the details panel.
      await expect(updateRecordFields(t, 'lead', f.leadId, { disqualify_reason: null })).rejects.toMatchObject({ code: 'invalid' });
    });
  });

  it('a deal cannot be lost without a reason; the note is stored with it', async () => {
    await withRollback(async (t) => {
      const f = await reasonFixture(t, 'r2');
      const lost = await stageId(t, 'sales', 'lost');
      const e = await moveStage(t, { objectType: 'deal', recordId: f.dealId, toStageId: lost, values: { lost_reason: '  ' }, actor: user(f.user.id) }).catch((x) => x);
      expect(e).toMatchObject({ code: 'required_fields', missing: [expect.objectContaining({ field_key: 'lost_reason' })] });
      const [still] = await t<{ key: string }[]>`select s.key from deals d join pipeline_stages s on s.id = d.stage_id where d.id = ${f.dealId}`;
      expect(still.key).toBe('negotiation');

      await moveStage(t, {
        objectType: 'deal',
        recordId: f.dealId,
        toStageId: lost,
        values: { lost_reason: 'other_agency', lost_note: 'Their cousin builds sites' },
        actor: user(f.user.id),
      });
      const [deal] = await t<{ key: string; lost_reason: string; lost_note: string; lost_at: Date | null }[]>`
        select s.key, d.lost_reason, d.lost_note, d.lost_at from deals d join pipeline_stages s on s.id = d.stage_id where d.id = ${f.dealId}`;
      expect(deal).toMatchObject({ key: 'lost', lost_reason: 'other_agency', lost_note: 'Their cousin builds sites' });
      expect(deal.lost_at).not.toBeNull();
    });
  });
});

describe('archived and unknown reasons are rejected (rolled back)', () => {
  it('moveStage, disqualifyLead, the details panel and the database itself refuse them', async () => {
    await withRollback(async (t) => {
      const f = await reasonFixture(t, 'r3');
      const lost = await stageId(t, 'sales', 'lost');
      const [noBudget] = await t<{ id: string }[]>`select id from reason_options where object_type = 'deal_lost' and key = 'no_budget'`;
      await setReasonArchived(t, noBudget.id, true);

      // The gate dropdown follows the list.
      const [gate] = await t<{ options: { value: string }[] }[]>`
        select options from stage_required_fields where stage_id = ${lost} and field_key = 'lost_reason'`;
      expect(gate.options.map((o) => o.value)).not.toContain('no_budget');
      expect(gate.options.map((o) => o.value)).toContain('cheaper');

      const e1 = await moveStage(t, { objectType: 'deal', recordId: f.dealId, toStageId: lost, values: { lost_reason: 'no_budget' }, actor: user(f.user.id) }).catch((x) => x);
      expect(e1).toMatchObject({ code: 'required_fields', message: expect.stringMatching(/archived/) });
      const e2 = await moveStage(t, { objectType: 'deal', recordId: f.dealId, toStageId: lost, values: { lost_reason: 'made_up_key' }, actor: user(f.user.id) }).catch((x) => x);
      expect(e2).toMatchObject({ code: 'required_fields' });

      await expect(assertActiveReason(t, 'deal_lost', 'no_budget')).rejects.toBeInstanceOf(ReasonError);
      await expect(updateRecordFields(t, 'deal', f.dealId, { lost_reason: 'no_budget' })).rejects.toMatchObject({ code: 'invalid' });

      // Leads: archive a disqualify reason, the service refuses it.
      const [angle] = await t<{ id: string }[]>`select id from reason_options where object_type = 'lead_disqualify' and key = 'no_strong_angle'`;
      await setReasonArchived(t, angle.id, true);
      await expect(disqualifyLead(t, { leadId: f.leadId, reason: 'no_strong_angle', actor: f.user })).rejects.toMatchObject({ code: 'required_fields' });

      // The trigger is the truth, even for raw SQL.
      let sqlErr: unknown = null;
      await t
        .savepoint(async (sp) => {
          await sp`update deals set lost_reason = 'no_budget' where id = ${f.dealId}`;
        })
        .catch((x) => {
          sqlErr = x;
        });
      expect(sqlErr).toMatchObject({ code: '23514' });

      // A record that already holds a reason keeps it when the reason is archived later.
      await moveStage(t, { objectType: 'deal', recordId: f.dealId, toStageId: lost, values: { lost_reason: 'cheaper' }, actor: user(f.user.id) });
      const [cheaper] = await t<{ id: string }[]>`select id from reason_options where object_type = 'deal_lost' and key = 'cheaper'`;
      await setReasonArchived(t, cheaper.id, true);
      await t`update deals set next_step = 'Check back in spring' where id = ${f.dealId}`;
      const [kept] = await t<{ lost_reason: string }[]>`select lost_reason from deals where id = ${f.dealId}`;
      expect(kept.lost_reason).toBe('cheaper');
    });
  });

  it('settings add, rename, reorder and archive, and never archive the last active reason', async () => {
    await withRollback(async (t) => {
      const id = await addReason(t, 'deal_lost', 'Picked a freelancer');
      let list = await listReasons('deal_lost', {}, t);
      const added = list.find((r) => r.id === id)!;
      expect(added).toMatchObject({ key: 'picked_a_freelancer', label: 'Picked a freelancer' });
      expect(list[list.length - 1].id).toBe(id);

      await expect(addReason(t, 'deal_lost', 'picked a FREELANCER')).rejects.toThrow(/already on the list/);
      await renameReason(t, id, 'Went with a freelancer');
      await moveReason(t, id, 'up');
      list = await listReasons('deal_lost', {}, t);
      expect(list[list.length - 2]).toMatchObject({ id, key: 'picked_a_freelancer', label: 'Went with a freelancer' });

      const leadList = await listReasons('lead_disqualify', {}, t);
      for (const r of leadList.slice(1)) await setReasonArchived(t, r.id, true);
      await expect(setReasonArchived(t, leadList[0].id, true)).rejects.toThrow(/at least one/);
      await setReasonArchived(t, leadList[1].id, false);
      const after = await listReasons('lead_disqualify', {}, t);
      expect(after.map((r) => r.id)).toEqual([leadList[0].id, leadList[1].id]);
    });
  });
});
