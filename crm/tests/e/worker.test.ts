import { describe, expect, it } from 'vitest';
import { withRollback, stageId } from '../helpers';
import type { Tx } from '../../lib/db';
import { moveStage } from '../../lib/stages';
import { emit } from '../../lib/events';
import { processEvent, runScheduleRule } from '../../lib/automations/engine';
import { pickTemplate, vatTreatmentFor, type RuleRow } from '../../lib/automations/rules';
import { addWorkingDays, nextQuarterFirstMonday } from '../../lib/automations/calendar';

async function userId(t: Tx, email: string): Promise<string> {
  const [u] = await t<{ id: string }[]>`select id from users where email = ${email}`;
  return u.id;
}

async function makeWonDeal(t: Tx, amount = '14500.00') {
  const raka = await userId(t, 'raka@astra.local');
  const [org] = await t<{ id: string }[]>`
    insert into organizations (name, country, owner_user_id, custom) values ('Test Werf E', 'NL', ${raka}, '{"test":"e"}') returning id`;
  const [pipe] = await t<{ id: string }[]>`select id from pipelines where key = 'sales'`;
  const proposal = await stageId(t, 'sales', 'proposal_sent');
  const [deal] = await t<{ id: string }[]>`
    insert into deals (name, organization_id, pipeline_id, stage_id, owner_user_id, amount, currency)
    values ('Website rebuild for Test Werf', ${org.id}, ${pipe.id}, ${proposal}, ${raka}, ${amount}, 'EUR') returning id`;
  await moveStage(t, {
    objectType: 'deal',
    recordId: deal.id,
    toStageId: await stageId(t, 'sales', 'won'),
    values: { won_reason: 'Liked the prototype', start_date: '2026-11-10' },
    actor: { type: 'user', id: raka },
  });
  const [ev] = await t<{ id: string }[]>`
    select id::text as id from domain_events where type = 'deal.won' and aggregate_id = ${deal.id}`;
  return { orgId: org.id, dealId: deal.id, eventId: ev.id, raka };
}

describe('deal won automation', () => {
  it('creates project, deposit draft, kickoff task and lifecycle exactly once even when processed twice', async () => {
    await withRollback(async (t) => {
      const { orgId, dealId, eventId } = await makeWonDeal(t);
      const now = new Date('2026-11-06T09:00:00Z'); // a Friday
      const first = await processEvent(t, eventId, now);
      expect(first?.runs.find((r) => r.rule === 'deal_won_start_delivery')?.status).toBe('success');
      expect(first?.processed).toBe(true);

      // Process the same event again, as if a second worker or a replay picked it up.
      await t`update domain_events set processed_at = null where id = ${eventId}`;
      const second = await processEvent(t, eventId, now);
      expect(second?.runs.find((r) => r.rule === 'deal_won_start_delivery')?.status).toBe('already');

      const projects = await t<{ id: string; budget_amount: string; owner_user_id: string; kind: string }[]>`
        select id, budget_amount, owner_user_id, kind from projects where deal_id = ${dealId}`;
      expect(projects).toHaveLength(1);
      expect(projects[0].budget_amount).toBe('14500.00');
      expect(projects[0].owner_user_id).toBe(await userId(t, 'josh@astra.local'));
      const milestones = await t`select name from project_milestones where project_id = ${projects[0].id}`;
      expect(milestones.length).toBeGreaterThan(0);

      const invoices = await t<{ state: string; external_number: string | null; subtotal: string; vat_amount: string; total: string; vat_treatment: string }[]>`
        select state, external_number, subtotal, vat_amount, total, vat_treatment from invoices where deal_id = ${dealId}`;
      expect(invoices).toHaveLength(1);
      expect(invoices[0]).toMatchObject({ state: 'draft', external_number: null, subtotal: '7250.00', vat_amount: '1522.50', total: '8772.50', vat_treatment: 'nl_21' });

      const tasks = await t<{ owner_user_id: string; due_at: Date; priority: string }[]>`
        select tk.owner_user_id, tk.due_at, tk.priority from tasks tk join task_links tl on tl.task_id = tk.id
         where tl.project_id = ${projects[0].id} and tk.custom ->> 'created_by_rule' = 'deal_won_start_delivery'`;
      expect(tasks).toHaveLength(1);
      expect(tasks[0].priority).toBe('high');
      // Two working days after Friday 6 Nov is Tuesday 10 Nov.
      expect(new Date(tasks[0].due_at).toISOString().slice(0, 10)).toBe('2026-11-10');

      const [org] = await t<{ lifecycle_stage: string }[]>`select lifecycle_stage from organizations where id = ${orgId}`;
      expect(org.lifecycle_stage).toBe('customer');

      const runs = await t`
        select r.status from automation_runs r join automation_rules ru on ru.id = r.rule_id
         where ru.key = 'deal_won_start_delivery' and r.event_id = ${eventId}`;
      expect(runs).toHaveLength(1);
    });
  });

  it('skips the deposit when the deal has no amount', async () => {
    await withRollback(async (t) => {
      const raka = await userId(t, 'raka@astra.local');
      const [pipe] = await t<{ id: string }[]>`select id from pipelines where key = 'sales'`;
      const [deal] = await t<{ id: string }[]>`
        insert into deals (name, pipeline_id, stage_id, owner_user_id) values ('Retainer for nobody', ${pipe.id}, ${await stageId(t, 'sales', 'won')}, ${raka}) returning id`;
      const evId = await emit(t, 'deal.won', { id: deal.id }, { aggregateType: 'deal', aggregateId: deal.id });
      const res = await processEvent(t, evId, new Date('2026-11-06T09:00:00Z'));
      expect(res?.runs[0].status).toBe('success');
      const [{ n }] = await t<{ n: number }[]>`select count(*)::int as n from invoices where deal_id = ${deal.id}`;
      expect(n).toBe(0);
      const [p] = await t<{ owner_user_id: string; kind: string }[]>`select owner_user_id, kind from projects where deal_id = ${deal.id}`;
      expect(p.kind).toBe('retainer');
    });
  });
});

describe('lead replied automation', () => {
  it('moves Attempting to Connected and creates one high priority reply task', async () => {
    await withRollback(async (t) => {
      const raka = await userId(t, 'raka@astra.local');
      const [pipe] = await t<{ id: string }[]>`select id from pipelines where key = 'lead'`;
      const [c] = await t<{ id: string }[]>`insert into contacts (first_name, last_name) values ('Testa', 'Replier') returning id`;
      const [lead] = await t<{ id: string }[]>`
        insert into leads (contact_id, pipeline_id, stage_id, owner_user_id, source)
        values (${c.id}, ${pipe.id}, ${await stageId(t, 'lead', 'attempting')}, ${raka}, 'lemlist') returning id`;
      const evId = await emit(t, 'lead.replied', { leadId: lead.id, contactId: c.id }, { aggregateType: 'lead', aggregateId: lead.id });
      await processEvent(t, evId);
      await t`update domain_events set processed_at = null where id = ${evId}`;
      await processEvent(t, evId);
      const [l] = await t<{ key: string }[]>`select s.key from leads l join pipeline_stages s on s.id = l.stage_id where l.id = ${lead.id}`;
      expect(l.key).toBe('connected');
      const tasks = await t<{ priority: string; owner_user_id: string }[]>`
        select tk.priority, tk.owner_user_id from tasks tk join task_links tl on tl.task_id = tk.id where tl.lead_id = ${lead.id}`;
      expect(tasks).toHaveLength(1);
      expect(tasks[0]).toMatchObject({ priority: 'high', owner_user_id: raka });
    });
  });

  it('skips a lead that is not in Attempting or Connected', async () => {
    await withRollback(async (t) => {
      const [pipe] = await t<{ id: string }[]>`select id from pipelines where key = 'lead'`;
      const [lead] = await t<{ id: string }[]>`
        insert into leads (name, pipeline_id, stage_id) values ('Fresh', ${pipe.id}, ${await stageId(t, 'lead', 'new')}) returning id`;
      const evId = await emit(t, 'lead.replied', { leadId: lead.id }, { aggregateType: 'lead', aggregateId: lead.id });
      const res = await processEvent(t, evId);
      expect(res?.runs[0].status).toBe('skipped');
    });
  });
});

describe('scheduled rules', () => {
  it('marks an overdue open invoice late, then the late rule makes one chase task', async () => {
    await withRollback(async (t) => {
      const luna = await userId(t, 'luna@astra.local');
      const [org] = await t<{ id: string }[]>`insert into organizations (name, account_manager_user_id) values ('Late Payer E', ${luna}) returning id`;
      const [inv] = await t<{ id: string }[]>`
        insert into invoices (organization_id, title, state, total) values (${org.id}, 'Test late', 'draft', '100.00') returning id`;
      // Issue it the way agent F does: a number and open. The guard allows draft to open.
      await t`update invoices set state = 'open', external_number = 'TEST-E-1', issue_date = '2026-09-01', due_date = '2026-10-01' where id = ${inv.id}`;
      const [rule] = await t<RuleRow[]>`select * from automation_rules where key = 'invoice_mark_late'`;
      const res = await runScheduleRule(t, rule, new Date('2026-11-06T09:00:00Z'));
      expect(res.status).toBe('success');
      const again = await runScheduleRule(t, rule, new Date('2026-11-06T10:00:00Z'));
      expect(again.status).toBe('already');
      const [ev] = await t<{ id: string }[]>`select id::text as id from domain_events where type = 'invoice.late' and aggregate_id = ${inv.id}`;
      await processEvent(t, ev.id);
      const tasks = await t<{ owner_user_id: string }[]>`
        select tk.owner_user_id from tasks tk join task_links tl on tl.task_id = tk.id where tl.invoice_id = ${inv.id}`;
      expect(tasks).toHaveLength(1);
      expect(tasks[0].owner_user_id).toBe(luna);
    });
  });

  it('is not due before 08:00 Amsterdam', async () => {
    await withRollback(async (t) => {
      const [rule] = await t<RuleRow[]>`select * from automation_rules where key = 'deal_no_next_step'`;
      const res = await runScheduleRule(t, rule, new Date('2026-11-06T05:00:00Z'));
      expect(res.status).toBe('not_due');
    });
  });
});

describe('helpers', () => {
  it('counts working days and quarters', () => {
    expect(addWorkingDays('2026-11-06', 2)).toBe('2026-11-10');
    expect(addWorkingDays('2026-11-09', 2)).toBe('2026-11-11');
    expect(nextQuarterFirstMonday('2026-11-06')).toEqual({ day: '2027-01-04', quarter: '2027-Q1' });
    expect(nextQuarterFirstMonday('2026-10-01')).toEqual({ day: '2026-10-05', quarter: '2026-Q4' });
  });
  it('picks templates and VAT treatment', () => {
    const tpls = [
      { key: 'website', match: ['website'], kind: 'delivery' as const, label: 'Website', milestones: [] },
      { key: 'default', match: [], kind: 'delivery' as const, label: 'Default', milestones: [] },
    ];
    expect(pickTemplate(tpls, 'Website rebuild', null).key).toBe('website');
    expect(pickTemplate(tpls, 'Something else', null).key).toBe('default');
    expect(vatTreatmentFor('NL', null)).toBe('nl_21');
    expect(vatTreatmentFor('DE', 'DE123')).toBe('reverse_charge');
    expect(vatTreatmentFor('US', null)).toBe('export');
  });
});
