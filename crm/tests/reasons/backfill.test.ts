import { afterAll, describe, expect, it } from 'vitest';
import { closeDb, type Tx } from '../../lib/db';
import { logActivity } from '../../lib/activities';
import { backfillDisqualifyReasons, backfillLeadTransitions, planLeadTransitions } from '../../lib/sales/backfill';
import { stageId, withRollback } from '../helpers';

afterAll(() => closeDb());

const STAGES = [
  { id: 'new', key: 'new', name: 'New', position: 0, state: 'open' },
  { id: 'res', key: 'researching', name: 'Researching', position: 1, state: 'open' },
  { id: 'att', key: 'attempting', name: 'Attempting', position: 2, state: 'open' },
  { id: 'con', key: 'connected', name: 'Connected', position: 3, state: 'open' },
  { id: 'q', key: 'qualified', name: 'Qualified', position: 4, state: 'won' },
  { id: 'd', key: 'disqualified', name: 'Disqualified', position: 5, state: 'lost' },
];
const D = (s: string) => new Date(s);

describe('planning backfilled transitions', () => {
  it('uses evidence in pipeline order, before the first recorded move, never past its stage, never back in time', () => {
    const base = { stage_id: 'd', anchor_stage_id: 'd', anchor_at: D('2026-11-06T18:00:00Z'), backfilled: [] as string[] };
    const plan = planLeadTransitions(STAGES, {
      ...base,
      accepted_at: D('2026-08-01T09:00:00Z'),
      opener_at: D('2026-08-05T09:00:00Z'),
      reply_at: null,
      status_at: D('2026-09-20T12:00:00Z'),
    }, new Date());
    expect(plan.map((p) => [p.stageId, p.fromStageId, p.at.toISOString()])).toEqual([
      ['new', null, '2026-08-01T09:00:00.000Z'],
      ['att', 'new', '2026-08-05T09:00:00.000Z'],
      ['d', 'att', '2026-09-20T12:00:00.000Z'],
    ]);

    // A status date older than the opener is stale: no date for the closed stage, nothing invented.
    const dropped = { afterRecordedHistory: 0, outOfOrder: 0, pastFirstStage: 0 };
    const stale = planLeadTransitions(STAGES, { ...base, accepted_at: null, opener_at: D('2026-08-05T09:00:00Z'), reply_at: null, status_at: D('2026-08-01T12:00:00Z') }, new Date(), dropped);
    expect(stale.map((p) => p.stageId)).toEqual(['att']);
    expect(dropped.outOfOrder).toBe(1);

    // A lead the import put in Attempting gets no Connected, even with a reply on record.
    const open = planLeadTransitions(STAGES, { stage_id: 'att', anchor_stage_id: 'att', anchor_at: base.anchor_at, accepted_at: null, opener_at: D('2026-08-05T09:00:00Z'), reply_at: D('2026-08-07T09:00:00Z'), status_at: null, backfilled: [] }, new Date(), dropped);
    expect(open.map((p) => p.stageId)).toEqual(['att']);
    expect(dropped.pastFirstStage).toBe(1);

    // Evidence after the first recorded move is not used.
    const late = planLeadTransitions(STAGES, { ...base, accepted_at: D('2026-11-07T09:00:00Z'), opener_at: null, reply_at: null, status_at: null }, new Date(), dropped);
    expect(late).toEqual([]);
    expect(dropped.afterRecordedHistory).toBe(1);
  });
});

/** An imported lead in Disqualified with the one transition the import wrote. */
async function importedLead(t: Tx, tag: string) {
  const disq = await stageId(t, 'lead', 'disqualified');
  const [contact] = await t<{ id: string }[]>`insert into contacts (first_name, last_name) values ('Backfill', ${tag}) returning id`;
  const [lead] = await t<{ id: string }[]>`
    insert into leads (contact_id, pipeline_id, stage_id, source, linkedin_accepted_at, opener_sent_at, custom)
    select ${contact.id}, pipeline_id, id, 'import', '2026-08-01T09:00:00Z', '2026-08-05T09:00:00Z',
           ${t.json({ imported_from: 'jsonl', queue_status: 'CLOSED_NO_REPLY', close_reason: 'no_response' } as never)}
      from pipeline_stages where id = ${disq}
    returning id`;
  await t`
    insert into stage_transitions (object_type, record_id, to_stage_id, actor_type, source, reason, changed_at)
    values ('lead', ${lead.id}, ${disq}, 'import', 'jsonl', 'Queue status CLOSED_NO_REPLY', '2026-11-06T18:00:00Z')`;
  await logActivity(
    {
      kind: 'note',
      title: 'Research note, queue status CLOSED_NO_REPLY',
      body: 'Closed after two nudges',
      occurredAt: '2026-09-20T12:00:00Z',
      source: 'jsonl',
      externalId: `test-backfill-${tag}`,
      meta: { queue_status: 'CLOSED_NO_REPLY' },
      links: [{ leadId: lead.id }, { contactId: contact.id }],
      autoLink: false,
    },
    t,
  );
  return { leadId: lead.id, disq };
}

describe('backfill (rolled back)', () => {
  it('builds lead history from stored dates once, and a rerun adds nothing', async () => {
    await withRollback(async (t) => {
      const { leadId, disq } = await importedLead(t, 'b1');
      const first = await backfillLeadTransitions(t, { leadIds: [leadId] });
      expect(first).toMatchObject({ leadsChecked: 1, leadsChanged: 1, created: { New: 1, Attempting: 1, Disqualified: 1 } });
      const second = await backfillLeadTransitions(t, { leadIds: [leadId] });
      expect(second).toMatchObject({ leadsChecked: 1, leadsChanged: 0, created: {} });

      const rows = await t<{ key: string; changed_at: Date; actor_type: string; source: string }[]>`
        select s.key, st.changed_at, st.actor_type, st.source from stage_transitions st join pipeline_stages s on s.id = st.to_stage_id
         where st.object_type = 'lead' and st.record_id = ${leadId} and st.source = 'backfill' order by st.changed_at`;
      expect(rows.map((r) => [r.key, r.changed_at.toISOString(), r.actor_type])).toEqual([
        ['new', '2026-08-01T09:00:00.000Z', 'system'],
        ['attempting', '2026-08-05T09:00:00.000Z', 'system'],
        ['disqualified', '2026-09-20T12:00:00.000Z', 'system'],
      ]);

      // The import record of Disqualified is the same visit: entered at the status change, entered once.
      const [d] = await t<{ first_entered_at: Date; times_entered: number }[]>`
        select first_entered_at, times_entered from v_stage_time where object_type = 'lead' and record_id = ${leadId} and stage_id = ${disq}`;
      expect(d).toEqual({ first_entered_at: D('2026-09-20T12:00:00Z'), times_entered: 1 });
    });
  });

  it('sets the disqualify reason from the close reason once, and lists what it cannot map', async () => {
    await withRollback(async (t) => {
      const { leadId } = await importedLead(t, 'b2');
      const { leadId: unknown } = await importedLead(t, 'b3');
      await t`update leads set custom = custom - 'close_reason' where id = ${unknown}`;

      const first = await backfillDisqualifyReasons(t);
      const [lead] = await t<{ disqualify_reason: string }[]>`select disqualify_reason from leads where id = ${leadId}`;
      expect(lead.disqualify_reason).toBe('no_reply');
      expect(first.leadsWithoutReason.map((l) => l.id)).toContain(unknown);

      const second = await backfillDisqualifyReasons(t);
      expect(second.updated).toEqual({});
      expect(second.before).toEqual(second.after);
      expect(second.leadsWithoutReason.map((l) => l.id)).toContain(unknown);
    });
  });
});
