import { afterAll, describe, expect, it } from 'vitest';
import { closeDb } from '../../lib/db';
import { moveStage, StageMoveError } from '../../lib/stages';
import { stageId, withRollback } from '../helpers';

afterAll(() => closeDb());

describe('moveStage against the real local database (rolled back)', () => {
  it('blocks a move until the stage required fields are filled, then records everything', async () => {
    await withRollback(async (t) => {
      const [user] = await t<{ id: string }[]>`
        insert into users (email, name, role) values ('stage-test@astra.local', 'Stage Test', 'admin') returning id`;
      const [org] = await t<{ id: string }[]>`insert into organizations (name) values ('Test Org For Stages') returning id`;
      const discovery = await stageId(t, 'sales', 'discovery_booked');
      const negotiation = await stageId(t, 'sales', 'negotiation');
      const won = await stageId(t, 'sales', 'won');
      const [deal] = await t<{ id: string; pipeline_id: string }[]>`
        insert into deals (name, organization_id, pipeline_id, stage_id, owner_user_id, amount)
        select 'Stage test deal', ${org.id}, pipeline_id, id, ${user.id}, 1000 from pipeline_stages where id = ${discovery}
        returning id, pipeline_id`;

      // Negotiation needs next step and decision date.
      let err: unknown;
      try {
        await moveStage(t, { objectType: 'deal', recordId: deal.id, toStageId: negotiation, actor: { type: 'user', id: user.id } });
      } catch (e) {
        err = e;
      }
      expect(err).toBeInstanceOf(StageMoveError);
      const gate = err as StageMoveError;
      expect(gate.code).toBe('required_fields');
      expect(gate.missing.map((m) => m.field_key).sort()).toEqual(['decision_date', 'next_step']);

      // Give one, still blocked on the other. The failed attempt must not have changed the stage.
      await expect(
        moveStage(t, { objectType: 'deal', recordId: deal.id, toStageId: negotiation, values: { next_step: 'Pricing call' }, actor: { type: 'user', id: user.id } }),
      ).rejects.toMatchObject({ code: 'required_fields', missing: [expect.objectContaining({ field_key: 'decision_date' })] });
      const [still] = await t<{ stage_id: string }[]>`select stage_id from deals where id = ${deal.id}`;
      expect(still.stage_id).toBe(discovery);

      // Both given: it moves, stores the values, logs the transition, the activity and the event.
      const res = await moveStage(t, {
        objectType: 'deal',
        recordId: deal.id,
        toStageId: negotiation,
        values: { next_step: 'Pricing call', decision_date: '2026-11-20' },
        actor: { type: 'user', id: user.id },
      });
      expect(res.changed).toBe(true);
      expect(res.toStage.key).toBe('negotiation');
      const [after] = await t<{ stage_id: string; next_step: string; decision_date: string }[]>`
        select stage_id, next_step, decision_date from deals where id = ${deal.id}`;
      expect(after).toEqual({ stage_id: negotiation, next_step: 'Pricing call', decision_date: '2026-11-20' });

      const transitions = await t<{ from_stage_id: string; to_stage_id: string; amount: string; probability: number }[]>`
        select from_stage_id, to_stage_id, amount, probability from stage_transitions where record_id = ${deal.id}`;
      expect(transitions).toEqual([{ from_stage_id: discovery, to_stage_id: negotiation, amount: '1000.00', probability: 75 }]);

      const events = await t<{ type: string }[]>`select type from domain_events where aggregate_id = ${deal.id} order by id`;
      expect(events.map((e) => e.type)).toEqual(['deal.stage_changed']);

      const acts = await t<{ title: string }[]>`
        select a.title from activities a join activity_links l on l.activity_id = a.id where l.organization_id = ${org.id}`;
      expect(acts.map((a) => a.title)).toEqual(['Deal moved from Discovery booked to Negotiation']);

      // The audit trigger saw the update, with the actor.
      const audit = await t<{ action: string; changed_fields: string[] }[]>`
        select action, changed_fields from audit_log where table_name = 'deals' and record_id = ${deal.id} order by id`;
      expect(audit[0].action).toBe('insert');
      expect(audit.some((a) => a.action === 'update' && a.changed_fields.includes('stage_id'))).toBe(true);

      // Lifecycle moved forward to opportunity.
      const [o1] = await t<{ lifecycle_stage: string }[]>`select lifecycle_stage from organizations where id = ${org.id}`;
      expect(o1.lifecycle_stage).toBe('opportunity');

      // Won needs won reason and start date; once given the deal is won, stamped, and the org is a customer.
      await expect(
        moveStage(t, { objectType: 'deal', recordId: deal.id, toStageId: won, actor: { type: 'user', id: user.id } }),
      ).rejects.toMatchObject({ code: 'required_fields' });
      await moveStage(t, {
        objectType: 'deal',
        recordId: deal.id,
        toStageId: won,
        values: { won_reason: 'Best prototype', start_date: '2026-12-01' },
        actor: { type: 'user', id: user.id },
      });
      const [wonDeal] = await t<{ won_at: Date | null }[]>`select won_at from deals where id = ${deal.id}`;
      expect(wonDeal.won_at).toBeInstanceOf(Date);
      const types = (await t<{ type: string }[]>`select type from domain_events where aggregate_id = ${deal.id} order by id`).map((e) => e.type);
      expect(types).toEqual(['deal.stage_changed', 'deal.stage_changed', 'deal.won']);
      const [o2] = await t<{ lifecycle_stage: string }[]>`select lifecycle_stage from organizations where id = ${org.id}`;
      expect(o2.lifecycle_stage).toBe('customer');

      // Reopening needs a reason.
      await expect(
        moveStage(t, { objectType: 'deal', recordId: deal.id, toStageId: negotiation, actor: { type: 'user', id: user.id } }),
      ).rejects.toMatchObject({ code: 'reason_required' });
    });
  });

  it('requires a disqualify reason on leads and keeps custom gate fields in custom', async () => {
    await withRollback(async (t) => {
      const fresh = await stageId(t, 'lead', 'new');
      const disq = await stageId(t, 'lead', 'disqualified');
      const [lead] = await t<{ id: string }[]>`
        insert into leads (name, pipeline_id, stage_id) select 'Lead test', pipeline_id, id from pipeline_stages where id = ${fresh}
        returning id`;
      await expect(
        moveStage(t, { objectType: 'lead', recordId: lead.id, toStageId: disq, actor: { type: 'system' } }),
      ).rejects.toMatchObject({ code: 'required_fields' });
      await moveStage(t, { objectType: 'lead', recordId: lead.id, toStageId: disq, values: { disqualify_reason: 'not_icp' }, actor: { type: 'system' } });
      const [row] = await t<{ disqualify_reason: string; disqualified_at: Date | null }[]>`
        select disqualify_reason, disqualified_at from leads where id = ${lead.id}`;
      expect(row.disqualify_reason).toBe('not_icp');
      expect(row.disqualified_at).toBeInstanceOf(Date);

      // A required field that is not a column lands in custom.
      await t`insert into stage_required_fields (stage_id, field_key, label) values (${fresh}, 'source_note', 'Source note')`;
      await expect(
        moveStage(t, { objectType: 'lead', recordId: lead.id, toStageId: fresh, reason: 'Wrong call', actor: { type: 'system' } }),
      ).rejects.toMatchObject({ code: 'required_fields' });
      await moveStage(t, { objectType: 'lead', recordId: lead.id, toStageId: fresh, reason: 'Wrong call', values: { source_note: 'Referral from Eva' }, actor: { type: 'system' } });
      const [back] = await t<{ custom: Record<string, unknown>; disqualified_at: Date | null }[]>`select custom, disqualified_at from leads where id = ${lead.id}`;
      expect(back.custom.source_note).toBe('Referral from Eva');
      expect(back.disqualified_at).toBeNull();
    });
  });
});
