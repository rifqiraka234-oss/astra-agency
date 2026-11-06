'use server';
/**
 * Stage moves for leads and deals, used by the board (drag and drop), the deal
 * stage path and the lead stage path. Everything goes through moveStage, so a
 * missing required field comes back as { code: 'required_fields', fields } and
 * the client opens the gate dialog, then calls again with values.
 *
 *   const res = await moveStageAction({ objectType: 'deal', recordId, toStageId, values, reason });
 *
 * A lead dropped on Qualified needs the qualify flow (it creates the deal), so
 * that returns code 'invalid' and the board opens the qualify dialog instead.
 * A lead dropped on Disqualified runs disqualifyLead, which handles suppression.
 */
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { requireUser } from '@/lib/auth';
import { sql, tx } from '@/lib/db';
import { assertCan } from '@/lib/permissions';
import { getStage, moveStage, stageGate, StageMoveError } from '@/lib/stages';
import { disqualifyLead } from '@/lib/sales/service';
import { toSalesResult, type SalesResult } from '@/lib/sales/fields';
import { automationEffects } from '@/lib/sales/queries';

const moveSchema = z.object({
  objectType: z.enum(['lead', 'deal']),
  recordId: z.string().uuid(),
  toStageId: z.string().uuid(),
  values: z.record(z.string(), z.string().max(2000)).optional(),
  reason: z.string().trim().max(1000).nullable().optional(),
  source: z.enum(['board', 'record']).optional(),
});

export type MoveStageActionInput = z.input<typeof moveSchema>;

export async function moveStageAction(input: MoveStageActionInput): Promise<SalesResult> {
  const user = await requireUser();
  const parsed = moveSchema.safeParse(input);
  if (!parsed.success) return { ok: false, code: 'invalid', error: 'That move could not be read, try again' };
  const { objectType, recordId, toStageId, reason, source } = parsed.data;
  const values: Record<string, string> = { ...(parsed.data.values ?? {}) };
  try {
    const table = objectType === 'deal' ? 'deals' : 'leads';
    const [record] = await sql<{ owner_user_id: string | null; organization_id: string | null; disqualify_reason?: string | null }[]>`
      select * from ${sql(table)} where id = ${recordId} and deleted_at is null`;
    if (!record) return { ok: false, code: 'not_found', error: objectType === 'deal' ? 'Deal not found' : 'Lead not found' };
    assertCan(user, 'edit', objectType, record);
    const stage = await getStage(toStageId);
    if (!stage) return { ok: false, code: 'not_found', error: 'Stage not found' };

    if (objectType === 'lead' && stage.state === 'won') {
      return { ok: false, code: 'invalid', error: 'Qualify the lead to create its deal' };
    }
    if (objectType === 'lead' && stage.state === 'lost') {
      const why = values.disqualify_reason || null;
      if (!why) {
        const fields = await stageGate('lead', recordId, toStageId);
        throw new StageMoveError('required_fields', 'Pick a reason to disqualify', fields.filter((f) => f.field_key === 'disqualify_reason'), fields);
      }
      await tx((t) => disqualifyLead(t, { leadId: recordId, reason: why, note: values.note ?? null, actor: { id: user.id, name: user.name } }), {
        userId: user.id,
      });
    } else {
      // Notes typed in the dialog are not stage fields.
      delete values.note;
      await tx(
        (t) =>
          moveStage(t, {
            objectType,
            recordId,
            toStageId,
            values,
            reason: reason ?? null,
            actor: { type: 'user', id: user.id },
            source: source ?? 'board',
          }),
        { userId: user.id },
      );
    }
    revalidatePath('/pipelines');
    revalidatePath(objectType === 'deal' ? '/deals' : '/leads');
    revalidatePath(`/${objectType === 'deal' ? 'deals' : 'leads'}/${recordId}`);
    if (record.organization_id) revalidatePath(`/organizations/${record.organization_id}`);
    return { ok: true, message: `Moved to ${stage.name}` };
  } catch (err) {
    return toSalesResult(err);
  }
}

export type GateInfo =
  | {
      ok: true;
      stageName: string;
      state: 'open' | 'won' | 'lost' | 'closed';
      fields: import('@/lib/stages').RequiredField[];
      /** Moving back or reopening, a reason is required. */
      needsReason: boolean;
      reopening: boolean;
      /** What enabled automations do on entering this stage. */
      effects: string[];
    }
  | { ok: false; error: string };

/** The gate for a move before it is tried: required fields with current values, reason rule, automation effects. */
export async function stageGateAction(objectType: 'lead' | 'deal', recordId: string, toStageId: string): Promise<GateInfo> {
  await requireUser();
  if (!['lead', 'deal'].includes(objectType) || !z.string().uuid().safeParse(recordId).success || !z.string().uuid().safeParse(toStageId).success) {
    return { ok: false, error: 'Stage not found' };
  }
  const table = objectType === 'deal' ? 'deals' : 'leads';
  const [record] = await sql<{ stage_id: string; owner_user_id: string | null }[]>`
    select stage_id, owner_user_id from ${sql(table)} where id = ${recordId} and deleted_at is null`;
  if (!record) return { ok: false, error: objectType === 'deal' ? 'Deal not found' : 'Lead not found' };
  const [to, from] = await Promise.all([getStage(toStageId), getStage(record.stage_id)]);
  if (!to || to.object_type !== objectType) return { ok: false, error: 'Stage not found' };
  const fields = await stageGate(objectType, recordId, toStageId);
  const reopening = Boolean(from && from.state !== 'open' && to.state === 'open');
  const needsReason = reopening || Boolean(from && from.pipeline_id === to.pipeline_id && to.state === 'open' && to.position < from.position);
  const events = objectType === 'deal' ? (to.state === 'won' ? ['deal.won'] : to.state === 'lost' ? ['deal.lost'] : []) : [];
  const effects = await automationEffects(events);
  return { ok: true, stageName: to.name, state: to.state, fields, needsReason, reopening, effects };
}
