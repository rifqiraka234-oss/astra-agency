import { afterAll, describe, expect, it } from 'vitest';
import { closeDb } from '../../lib/db';
import { moveStage } from '../../lib/stages';
import { disqualifyLead, qualifyLead } from '../../lib/sales/service';
import { buildStageTimeline, computeStageTimes, formatDuration } from '../../lib/sales/stage-times';
import { stageId, withRollback } from '../helpers';
import { reasonFixture } from './fixtures';

afterAll(() => closeDb());

const H = 3600 * 1000;
const t0 = new Date('2026-10-01T08:00:00Z');
const at = (hours: number) => new Date(t0.getTime() + hours * H);

describe('stage time calculation', () => {
  it('sums every visit, counts the current stage to now, and merges a repeated move into the same stage', () => {
    // A 10h, B 5h, A again 3h (plus a second record of A that is not a new visit), then C now for 6h.
    const transitions = [
      { to_stage_id: 'A', changed_at: at(0), actor_name: 'Raka' },
      { to_stage_id: 'B', changed_at: at(10), actor_name: 'Josh' },
      { to_stage_id: 'A', changed_at: at(15), actor_name: 'Luna' },
      { to_stage_id: 'A', changed_at: at(16), actor_type: 'import' },
      { to_stage_id: 'C', changed_at: at(18), actor_type: 'automation' },
    ];
    const times = computeStageTimes(transitions, 'C', at(24));
    expect(times.get('A')).toMatchObject({
      firstEnteredAt: at(0),
      lastEnteredAt: at(15),
      lastExitedAt: at(18),
      timesEntered: 2,
      totalSeconds: 13 * 3600,
      isCurrent: false,
      lastActorName: 'Luna',
    });
    expect(times.get('B')).toMatchObject({ timesEntered: 1, totalSeconds: 5 * 3600, lastExitedAt: at(15) });
    expect(times.get('C')).toMatchObject({ timesEntered: 1, totalSeconds: 6 * 3600, isCurrent: true, lastExitedAt: null });

    // Order of the input does not matter.
    const shuffled = computeStageTimes([...transitions].reverse(), 'C', at(24));
    expect(shuffled.get('A')?.totalSeconds).toBe(13 * 3600);

    expect(formatDuration(13 * 3600)).toBe('13 hours');
    expect(formatDuration(26 * 3600 + 60)).toBe('1 day 2 hours');
  });

  it('marks skipped and not reached stages on the timeline', () => {
    const stages = [
      { id: 'new', name: 'New', state: 'open', position: 0 },
      { id: 'res', name: 'Researching', state: 'open', position: 1 },
      { id: 'att', name: 'Attempting', state: 'open', position: 2 },
      { id: 'con', name: 'Connected', state: 'open', position: 3 },
      { id: 'q', name: 'Qualified', state: 'won', position: 4 },
      { id: 'd', name: 'Disqualified', state: 'lost', position: 5 },
    ];
    const times = computeStageTimes([{ to_stage_id: 'new', changed_at: at(0) }, { to_stage_id: 'att', changed_at: at(5) }], 'att', at(9));
    const rows = buildStageTimeline(stages, times, stages[2]);
    expect(rows.map((r) => [r.name, r.status])).toEqual([
      ['New', 'visited'],
      ['Researching', 'skipped'],
      ['Attempting', 'current'],
      ['Connected', 'not_reached'],
      ['Qualified', 'not_reached'],
      ['Disqualified', 'not_reached'],
    ]);
    expect(rows[2].totalSeconds).toBe(4 * 3600);
  });

  it('the v_stage_time view agrees with the calculation for a record with a repeat visit (rolled back)', async () => {
    await withRollback(async (t) => {
      const f = await reasonFixture(t, 's1');
      const [neu, att, con] = await Promise.all([stageId(t, 'lead', 'new'), stageId(t, 'lead', 'attempting'), stageId(t, 'lead', 'connected')]);
      const [{ now }] = await t<{ now: Date }[]>`select now() as now`;
      const back = (h: number) => new Date(now.getTime() - h * H);
      const rows = [
        { stage: neu, at: back(100) },
        { stage: att, at: back(90) },
        { stage: con, at: back(60) },
        { stage: att, at: back(50) },
        { stage: con, at: back(20) },
      ];
      for (const r of rows) {
        await t`insert into stage_transitions (object_type, record_id, to_stage_id, actor_type, changed_at) values ('lead', ${f.leadId}, ${r.stage}, 'user', ${r.at})`;
      }
      const view = await t<{ stage_id: string; first_entered_at: Date; last_exited_at: Date | null; times_entered: number; total_seconds: string; is_current: boolean }[]>`
        select stage_id, first_entered_at, last_exited_at, times_entered, total_seconds, is_current from v_stage_time
         where object_type = 'lead' and record_id = ${f.leadId}`;
      const byStage = new Map(view.map((v) => [v.stage_id, v]));
      expect(byStage.get(att)).toMatchObject({ times_entered: 2, first_entered_at: back(90), last_exited_at: back(20), is_current: false });
      expect(Number(byStage.get(att)!.total_seconds)).toBe((30 + 30) * 3600);
      expect(byStage.get(con)).toMatchObject({ times_entered: 2, is_current: true, last_exited_at: null });
      expect(Number(byStage.get(con)!.total_seconds)).toBe((10 + 20) * 3600);

      const calc = computeStageTimes(rows.map((r) => ({ to_stage_id: r.stage, changed_at: r.at })), con, now);
      for (const s of [neu, att, con]) expect(Number(byStage.get(s)!.total_seconds)).toBe(calc.get(s)!.totalSeconds);

      // Time in the current stage starts at the current visit.
      const [ls] = await t<{ stage_entered_at: Date }[]>`select stage_entered_at from v_lead_stage where lead_id = ${f.leadId}`;
      expect(ls.stage_entered_at).toEqual(back(20));
    });
  });
});

describe('every move writes a transition (rolled back)', () => {
  it('qualify, disqualify, reopen and automation moves are all in stage_transitions', async () => {
    await withRollback(async (t) => {
      const f = await reasonFixture(t, 's2');
      const count = async (id: string) =>
        t<{ to_key: string; actor_type: string; source: string | null }[]>`
          select s.key as to_key, st.actor_type, st.source from stage_transitions st join pipeline_stages s on s.id = st.to_stage_id
           where st.object_type = 'lead' and st.record_id = ${id} order by st.changed_at, st.id`;

      // Back to Attempting (a reason), then the reply automation moves it forward again.
      const att = await stageId(t, 'lead', 'attempting');
      const con = await stageId(t, 'lead', 'connected');
      await moveStage(t, { objectType: 'lead', recordId: f.leadId, toStageId: att, reason: 'No real reply yet', actor: { type: 'user', id: f.user.id } });
      await moveStage(t, { objectType: 'lead', recordId: f.leadId, toStageId: con, actor: { type: 'automation' }, source: 'automation' });
      await disqualifyLead(t, { leadId: f.leadId, reason: 'not_now', actor: f.user });
      await moveStage(t, { objectType: 'lead', recordId: f.leadId, toStageId: con, reason: 'They came back', actor: { type: 'user', id: f.user.id }, source: 'record' });
      await qualifyLead(t, { leadId: f.leadId, actor: f.user, values: { meeting_at: '2026-11-20T10:00' } });

      expect(await count(f.leadId)).toEqual([
        { to_key: 'attempting', actor_type: 'user', source: null },
        { to_key: 'connected', actor_type: 'automation', source: 'automation' },
        { to_key: 'disqualified', actor_type: 'user', source: 'disqualify' },
        { to_key: 'connected', actor_type: 'user', source: 'record' },
        { to_key: 'qualified', actor_type: 'user', source: 'qualify' },
      ]);
    });
  });
});
