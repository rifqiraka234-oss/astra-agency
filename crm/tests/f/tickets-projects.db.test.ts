import { afterAll, describe, expect, it } from 'vitest';
import { closeDb } from '../../lib/db';
import { moveStage } from '../../lib/stages';
import { createTicket, logTicketReply, setTicketPriority, ticketSla } from '../../lib/service/tickets';
import { addMilestone, addTimeEntry, createProject, projectBudget, projectHours, setMilestoneDone } from '../../lib/delivery/projects';
import { stageId, withRollback } from '../helpers';

afterAll(() => closeDb());

describe('tickets', () => {
  it('opens with a status event, records the first reply once and pauses on waiting on client', async () => {
    await withRollback(async (t) => {
      const [user] = await t<{ id: string }[]>`insert into users (email, name, role) values ('f-ticket@astra.local', 'F Ticket', 'admin') returning id`;
      const openedAt = new Date(Date.now() - 30 * 60_000);
      const { id, number } = await createTicket(t, { subject: 'F test ticket', priority: 'high', source: 'email', openedAt, actorUserId: user.id });
      expect(number).toBeGreaterThan(118);
      const events = await t<{ to_key: string; pauses_sla: boolean }[]>`
        select s.key as to_key, e.pauses_sla from ticket_status_events e join pipeline_stages s on s.id = e.to_stage_id where e.ticket_id = ${id}`;
      expect(events).toEqual([{ to_key: 'new', pauses_sla: false }]);
      const [domainEvent] = await t<{ n: number }[]>`select count(*)::int as n from domain_events where type = 'ticket.created' and aggregate_id = ${id}`;
      expect(domainEvent.n).toBe(1);

      const first = await logTicketReply(t, id, { body: 'Looking into it', actorUserId: user.id, waitOnClient: true });
      expect(first.firstReply).toBe(true);
      const again = await logTicketReply(t, id, { body: 'Any news?', actorUserId: user.id });
      expect(again.firstReply).toBe(false);
      const [tk] = await t<{ first_replied_at: Date | null; key: string }[]>`
        select tk.first_replied_at, s.key from tickets tk join pipeline_stages s on s.id = tk.stage_id where tk.id = ${id}`;
      expect(tk.key).toBe('waiting_on_client');
      expect(tk.first_replied_at).not.toBeNull();

      const sla = await ticketSla(t, id);
      expect(sla?.paused).toBe(true);
      expect(sla?.firstReply.status).toBe('met');

      await setTicketPriority(t, id, 'urgent', user.id);
      const [p] = await t<{ priority: string }[]>`select p.priority from tickets tk join sla_policies p on p.id = tk.sla_policy_id where tk.id = ${id}`;
      expect(p.priority).toBe('urgent');

      // Closing stamps closed_at and stops the resolution clock.
      await moveStage(t, { objectType: 'ticket', recordId: id, toStageId: await stageId(t, 'tickets', 'closed'), actor: { type: 'user', id: user.id } });
      const closed = await ticketSla(t, id);
      expect(['met', 'missed']).toContain(closed?.resolution.status);
    });
  });
});

describe('projects', () => {
  it('enters kickoff on create and sums logged time against the budget', async () => {
    await withRollback(async (t) => {
      const [user] = await t<{ id: string }[]>`insert into users (email, name, role) values ('f-project@astra.local', 'F Project', 'admin') returning id`;
      const id = await createProject(t, { name: 'F test project', budgetAmount: '1000.00', budgetHours: '10', ownerUserId: user.id, actorUserId: user.id });
      const [p] = await t<{ key: string; budget_amount: string; budget_hours: string; hourly_rate: string | null }[]>`
        select s.key, p.budget_amount, p.budget_hours, p.hourly_rate from projects p join pipeline_stages s on s.id = p.stage_id where p.id = ${id}`;
      expect(p.key).toBe('kickoff');
      const [tr] = await t<{ n: number }[]>`select count(*)::int as n from stage_transitions where object_type = 'project' and record_id = ${id}`;
      expect(tr.n).toBe(1);

      await addTimeEntry(t, id, { userId: user.id, workDate: '2026-11-06', minutes: 120, billable: true });
      await addTimeEntry(t, id, { userId: user.id, workDate: '2026-11-06', minutes: 60, billable: false });
      const hours = (await projectHours(t, [id])).get(id);
      expect(hours).toEqual({ project_id: id, total_minutes: 180, billable_minutes: 120, unbilled_minutes: 120 });
      const b = projectBudget(p, hours);
      expect(b.usedValue).toBe('200.00');
      expect(b.percent).toBe(20);

      const m = await addMilestone(t, id, { name: 'Launch', dueDate: '2026-12-01' });
      await setMilestoneDone(t, m, true, user.id);
      const [ms] = await t<{ completed_at: Date | null }[]>`select completed_at from project_milestones where id = ${m}`;
      expect(ms.completed_at).not.toBeNull();
    });
  });
});
