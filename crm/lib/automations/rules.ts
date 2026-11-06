/**
 * lib/automations/rules.ts, what each built in automation does (agent E).
 *
 * Every handler runs inside the worker's transaction (a savepoint per rule), so
 * a rule either makes all its changes or none. Each one is written to be safe
 * to run twice: it looks for what it would create before creating it. The run
 * log (automation_runs, unique per rule and event) is the first guard, these
 * checks are the second.
 *
 * Nothing here sends a message. A rule that would talk to a client creates an
 * outbound_messages row in awaiting_approval and stops (draftMessage below).
 */
import type { Tx } from '../db';
import { logActivity } from '../activities';
import { createTask } from '../tasks';
import { bumpLifecycle, moveStage } from '../stages';
import { emit } from '../events';
import { amsterdamTime, formatMoney, multiplyMoney, sumMoney, toCents, todayKey, vatAmount } from '../format';
import { VAT_RATES } from '../options';
import { addWorkingDays, dayDiff, nextQuarterFirstMonday } from './calendar';

export type Change = {
  /** created, updated, moved, drafted, noted */
  action: string;
  /** project, invoice, task, organization, lead, outbound_message, activity, ticket */
  entity: string;
  id?: string | null;
  label: string;
};

export type RuleOutcome = { status: 'success' | 'skipped'; changes: Change[]; note?: string };

export type RuleRow = {
  id: string;
  key: string;
  name: string;
  trigger_type: 'event' | 'schedule';
  trigger_event: string | null;
  schedule: string | null;
  config: Record<string, unknown>;
  is_enabled: boolean;
};

export type EventRow = {
  id: string;
  type: string;
  aggregate_type: string | null;
  aggregate_id: string | null;
  payload: Record<string, unknown>;
  actor_user_id: string | null;
  occurred_at: Date;
  attempts: number;
};

export type EventContext = { rule: RuleRow; event: EventRow; now: Date };
export type ScheduleContext = { rule: RuleRow; now: Date; runKey: string };

export type EventHandler = (t: Tx, ctx: EventContext) => Promise<RuleOutcome>;
export type ScheduleHandler = {
  /** The run key when the rule should run at `now`, else null. One run per key, ever. */
  due: (rule: RuleRow, now: Date) => string | null;
  run: (t: Tx, ctx: ScheduleContext) => Promise<RuleOutcome>;
};

const AUTOMATION_ACTOR = { type: 'automation' as const, id: null };

function cfg<T>(rule: RuleRow, key: string, fallback: T): T {
  const v = rule.config?.[key];
  return (v === undefined || v === null ? fallback : v) as T;
}

function skipped(note: string): RuleOutcome {
  return { status: 'skipped', changes: [], note };
}

async function userIdByEmail(t: Tx, email: string | null | undefined): Promise<string | null> {
  if (!email) return null;
  const [u] = await t<{ id: string }[]>`select id from users where lower(email) = lower(${email}) and is_active`;
  return u?.id ?? null;
}

async function stageIdByKey(t: Tx, pipelineKey: string, stageKey: string): Promise<string> {
  const [row] = await t<{ id: string }[]>`
    select s.id from pipeline_stages s join pipelines p on p.id = s.pipeline_id
     where p.key = ${pipelineKey} and s.key = ${stageKey}`;
  if (!row) throw new Error(`Stage ${pipelineKey}/${stageKey} does not exist`);
  return row.id;
}

/** An open task this rule already made for the record, so it is not made twice. */
async function openRuleTask(t: Tx, ruleKey: string, linkCol: string, recordId: string, extra?: { key: string; value: string }): Promise<string | null> {
  const rows = await t<{ id: string }[]>`
    select tk.id from tasks tk join task_links tl on tl.task_id = tk.id
     where tk.custom ->> 'created_by_rule' = ${ruleKey}
       and tl.${t(linkCol)} = ${recordId}
       and tk.deleted_at is null
       and tk.status not in ('completed', 'cancelled')
       and (${extra?.key ?? null}::text is null or tk.custom ->> ${extra?.key ?? ''} = ${extra?.value ?? ''})
     limit 1`;
  return rows[0]?.id ?? null;
}

/**
 * The only way an automation produces a message: a draft that waits in the
 * approval queue. It is never sent from here, whatever SEND_ENABLED says.
 */
export async function draftMessage(
  t: Tx,
  input: {
    ruleKey: string;
    channel: 'linkedin' | 'email';
    kind?: 'opener' | 'nudge' | 'reply' | 'artifact_delivery' | 'other';
    subject?: string | null;
    body: string;
    contactId?: string | null;
    organizationId?: string | null;
    leadId?: string | null;
    dealId?: string | null;
    ownerUserId?: string | null;
    sourceKey: string;
  },
): Promise<{ id: string; created: boolean }> {
  const [existing] = await t<{ id: string }[]>`
    select id from outbound_messages
     where custom ->> 'created_by_rule' = ${input.ruleKey} and custom ->> 'source_key' = ${input.sourceKey}`;
  if (existing) return { id: existing.id, created: false };
  const [row] = await t<{ id: string }[]>`
    insert into outbound_messages (channel, via, kind, status, contact_id, organization_id, lead_id, deal_id,
                                   subject, body, owner_user_id, custom)
    values (${input.channel}, ${input.channel === 'linkedin' ? 'lemlist' : 'manual'}, ${input.kind ?? 'other'},
            'awaiting_approval', ${input.contactId ?? null}, ${input.organizationId ?? null}, ${input.leadId ?? null},
            ${input.dealId ?? null}, ${input.subject ?? null}, ${input.body}, ${input.ownerUserId ?? null},
            ${t.json({ created_by_rule: input.ruleKey, source_key: input.sourceKey } as never)})
    returning id`;
  return { id: row.id, created: true };
}

// ---------------------------------------------------------------- deal won

type Template = { key: string; match: string[]; kind: 'prototype' | 'delivery' | 'retainer'; label: string; milestones: string[] };

const DEFAULT_TEMPLATES: Template[] = [
  { key: 'default', match: [], kind: 'delivery', label: 'Delivery project', milestones: ['Kickoff held', 'Delivered'] },
];

/** The project template whose words appear in the deal name, else the default. */
export function pickTemplate(templates: Template[], dealName: string, pricingModel: string | null): Template {
  const name = dealName.toLowerCase();
  if (pricingModel === 'retainer') {
    const r = templates.find((tpl) => tpl.key === 'retainer');
    if (r) return r;
  }
  for (const tpl of templates) {
    if (tpl.match.some((w) => new RegExp(`\\b${w.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`).test(name))) return tpl;
  }
  return templates.find((tpl) => tpl.key === 'default') ?? templates[templates.length - 1] ?? DEFAULT_TEMPLATES[0];
}

const EU = new Set(['AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE']);

/** NL or unknown pays 21%, an EU business with a VAT number is reverse charge, outside the EU is export. */
export function vatTreatmentFor(country: string | null, vatNumber: string | null): 'nl_21' | 'reverse_charge' | 'export' {
  const c = (country ?? '').toUpperCase();
  if (!c || c === 'NL') return 'nl_21';
  if (EU.has(c)) return vatNumber ? 'reverse_charge' : 'nl_21';
  return 'export';
}

const dealWon: EventHandler = async (t, { rule, event, now }) => {
  const dealId = event.aggregate_id ?? (event.payload.id as string | undefined) ?? null;
  if (!dealId) return skipped('The event names no deal');
  const [deal] = await t<
    {
      id: string; name: string; amount: string | null; currency: string; owner_user_id: string | null;
      organization_id: string | null; pricing_model: string | null; start_date: string | null;
      org_name: string | null; org_country: string | null; org_vat: string | null; stage_state: string;
    }[]
  >`
    select d.id, d.name, d.amount, d.currency, d.owner_user_id, d.organization_id, d.pricing_model, d.start_date,
           o.name as org_name, o.country as org_country, o.vat_number as org_vat, s.state as stage_state
      from deals d
      join pipeline_stages s on s.id = d.stage_id
      left join organizations o on o.id = d.organization_id
     where d.id = ${dealId} and d.deleted_at is null`;
  if (!deal) return skipped('The deal no longer exists');
  if (deal.stage_state !== 'won') return skipped('The deal is no longer won');

  const changes: Change[] = [];
  const today = todayKey(now);
  const leadUser = (await userIdByEmail(t, cfg<string | null>(rule, 'project_lead_email', null))) ?? deal.owner_user_id;
  const templates = cfg<Template[]>(rule, 'templates', DEFAULT_TEMPLATES);
  const template = pickTemplate(templates, deal.name, deal.pricing_model);

  // 1. Project.
  let [project] = await t<{ id: string; name: string }[]>`
    select id, name from projects where deal_id = ${dealId} and deleted_at is null order by created_at limit 1`;
  if (!project) {
    const kickoff = await stageIdByKey(t, 'delivery', 'kickoff');
    const [pipe] = await t<{ id: string }[]>`select id from pipelines where key = 'delivery'`;
    [project] = await t<{ id: string; name: string }[]>`
      insert into projects (name, kind, organization_id, deal_id, pipeline_id, stage_id, owner_user_id, start_date,
                            budget_amount, currency, description, custom)
      values (${deal.name}, ${template.kind}, ${deal.organization_id}, ${dealId}, ${pipe.id}, ${kickoff},
              ${leadUser}, ${deal.start_date ?? today}, ${deal.amount}, ${deal.currency},
              ${`Started from the won deal. Template ${template.label}.`},
              ${t.json({ created_by_rule: rule.key, template: template.key, source_event: event.id } as never)})
      returning id, name`;
    let pos = 0;
    for (const m of template.milestones) {
      await t`insert into project_milestones (project_id, name, position) values (${project.id}, ${m}, ${pos++})`;
    }
    changes.push({ action: 'created', entity: 'project', id: project.id, label: `Project ${project.name}, template ${template.label}${deal.amount ? `, budget ${formatMoney(deal.amount, deal.currency)}` : ''}` });
  } else {
    changes.push({ action: 'kept', entity: 'project', id: project.id, label: `Project ${project.name} already existed` });
  }

  // 2. Deposit invoice, draft, no number.
  const pct = Number(cfg(rule, 'deposit_pct', 50));
  const [existingInvoice] = await t<{ id: string }[]>`
    select id from invoices where deal_id = ${dealId} and deleted_at is null
       and custom ->> 'invoice_role' = 'deposit' limit 1`;
  if (existingInvoice) {
    changes.push({ action: 'kept', entity: 'invoice', id: existingInvoice.id, label: 'Deposit invoice already existed' });
  } else if (!deal.amount || toCents(deal.amount) <= 0n) {
    changes.push({ action: 'noted', entity: 'invoice', label: 'No deposit invoice, the deal has no amount' });
  } else {
    const net = multiplyMoney(deal.amount, pct / 100);
    const treatment = vatTreatmentFor(deal.org_country, deal.org_vat);
    const rate = VAT_RATES[treatment] ?? 21;
    const vat = vatAmount(net, rate);
    const total = sumMoney([net, vat]);
    const [billing] = await t<{ contact_id: string }[]>`
      select contact_id from deal_contacts where deal_id = ${dealId}
       order by (role = 'billing_contact') desc, is_primary desc, created_at limit 1`;
    const [inv] = await t<{ id: string }[]>`
      insert into invoices (organization_id, contact_id, project_id, deal_id, title, state, vat_treatment, currency,
                            subtotal, vat_amount, total, custom)
      values (${deal.organization_id}, ${billing?.contact_id ?? null}, ${project.id}, ${dealId},
              ${`${deal.name}, deposit ${pct}%`}, 'draft', ${treatment}, ${deal.currency}, ${net}, ${vat}, ${total},
              ${t.json({ created_by_rule: rule.key, invoice_role: 'deposit', source_event: event.id } as never)})
      returning id`;
    await t`
      insert into line_items (invoice_id, name, quantity, unit_price, tax_rate, currency, position)
      values (${inv.id}, ${`Deposit ${pct}%, ${deal.name}`}, 1, ${net}, ${rate}, ${deal.currency}, 0)`;
    changes.push({ action: 'created', entity: 'invoice', id: inv.id, label: `Draft deposit invoice ${formatMoney(total, deal.currency, 2)} including VAT, no number yet` });
  }

  // 3. Kickoff task for the project lead.
  const existingTask = await openRuleTask(t, rule.key, 'project_id', project.id);
  if (existingTask) {
    changes.push({ action: 'kept', entity: 'task', id: existingTask, label: 'Kickoff task already existed' });
  } else {
    const dueKey = addWorkingDays(today, Number(cfg(rule, 'kickoff_working_days', 2)));
    const task = await createTask(
      {
        title: `Kickoff for ${project.name}`,
        type: 'meeting',
        priority: 'high',
        ownerUserId: leadUser,
        dueAt: amsterdamTime(dueKey, cfg(rule, 'kickoff_time', '10:00')),
        createdFrom: 'automation',
        links: [{ projectId: project.id }, { dealId }, ...(deal.organization_id ? [{ organizationId: deal.organization_id }] : [])],
        custom: { created_by_rule: rule.key, source_event: event.id },
      },
      t,
    );
    changes.push({ action: 'created', entity: 'task', id: task.id, label: `Kickoff task due ${dueKey}` });
  }

  // 4. Lifecycle.
  if (deal.organization_id) {
    const bumped = await bumpLifecycle(t, 'organization', deal.organization_id, 'customer');
    changes.push({
      action: bumped ? 'updated' : 'kept',
      entity: 'organization',
      id: deal.organization_id,
      label: bumped ? `${deal.org_name ?? 'Organization'} lifecycle set to Customer` : `${deal.org_name ?? 'Organization'} was already a customer`,
    });
  }

  await logActivity(
    {
      kind: 'system',
      title: `Automation started delivery for ${deal.name}`,
      body: changes.filter((c) => c.action !== 'kept').map((c) => c.label).join('. ') || null,
      source: 'automation',
      externalId: `rule:${rule.key}:event:${event.id}`,
      meta: { tags: ['Automation'], rule: rule.key },
      links: [{ dealId }, { projectId: project.id }, ...(deal.organization_id ? [{ organizationId: deal.organization_id }] : [])],
      autoLink: false,
    },
    t,
  );
  return { status: 'success', changes };
};

// ---------------------------------------------------------------- lead replied

const leadReplied: EventHandler = async (t, { rule, event, now }) => {
  const leadId = (event.payload.leadId as string | undefined) ?? event.aggregate_id;
  if (!leadId) return skipped('The event names no lead');
  const [lead] = await t<
    { id: string; owner_user_id: string | null; contact_id: string | null; organization_id: string | null; stage_key: string; stage_name: string; label: string }[]
  >`
    select l.id, l.owner_user_id, l.contact_id, l.organization_id, s.key as stage_key, s.name as stage_name,
           coalesce(c.full_name, l.name, o.name, 'the lead') as label
      from leads l join pipeline_stages s on s.id = l.stage_id
      left join contacts c on c.id = l.contact_id
      left join organizations o on o.id = l.organization_id
     where l.id = ${leadId} and l.deleted_at is null`;
  if (!lead) return skipped('The lead no longer exists');

  const fromStage = cfg(rule, 'from_stage', 'attempting');
  const toStage = cfg(rule, 'to_stage', 'connected');
  const changes: Change[] = [];
  if (lead.stage_key === fromStage) {
    await moveStage(t, {
      objectType: 'lead',
      recordId: lead.id,
      toStageId: await stageIdByKey(t, 'lead', toStage),
      actor: AUTOMATION_ACTOR,
      source: 'automation',
    });
    changes.push({ action: 'moved', entity: 'lead', id: lead.id, label: `${lead.label} moved from ${lead.stage_name} to Connected` });
  } else if (!(lead.stage_key === toStage && cfg(rule, 'task_when_connected', true))) {
    return skipped(`The lead is in ${lead.stage_name}, not Attempting`);
  }

  const existing = await openRuleTask(t, rule.key, 'lead_id', lead.id);
  if (existing) {
    changes.push({ action: 'kept', entity: 'task', id: existing, label: 'An open reply task already existed' });
  } else {
    const task = await createTask(
      {
        title: `Reply to ${lead.label}`,
        body: 'They replied on LinkedIn. Pull the whole thread before answering.',
        type: 'linkedin',
        priority: 'high',
        ownerUserId: lead.owner_user_id,
        dueAt: amsterdamTime(todayKey(now), cfg(rule, 'reply_by', '17:00')),
        createdFrom: 'automation',
        links: [{ leadId: lead.id }, ...(lead.contact_id ? [{ contactId: lead.contact_id }] : [])],
        custom: { created_by_rule: rule.key, source_event: event.id, activity_id: event.payload.activityId ?? null },
      },
      t,
    );
    changes.push({ action: 'created', entity: 'task', id: task.id, label: `Reply task for the owner, due today, priority High` });
  }
  return { status: 'success', changes };
};

// ---------------------------------------------------------------- invoice late

const invoiceLate: EventHandler = async (t, { rule, event, now }) => {
  const invoiceId = event.aggregate_id ?? (event.payload.id as string | undefined) ?? null;
  if (!invoiceId) return skipped('The event names no invoice');
  const [inv] = await t<
    { id: string; state: string; title: string | null; external_number: string | null; total: string | null; currency: string;
      organization_id: string | null; org_name: string | null; am: string | null; owner: string | null; due_date: string | null }[]
  >`
    select i.id, i.state, i.title, i.external_number, i.total, i.currency, i.organization_id, o.name as org_name,
           o.account_manager_user_id as am, o.owner_user_id as owner, i.due_date
      from invoices i left join organizations o on o.id = i.organization_id
     where i.id = ${invoiceId} and i.deleted_at is null`;
  if (!inv) return skipped('The invoice no longer exists');
  if (inv.state !== 'late') return skipped(`The invoice is ${inv.state} now, not late`);

  const label = inv.external_number ?? inv.title ?? 'invoice';
  const changes: Change[] = [];
  const existing = await openRuleTask(t, rule.key, 'invoice_id', inv.id);
  if (existing) {
    changes.push({ action: 'kept', entity: 'task', id: existing, label: 'A chase task already existed' });
  } else {
    const task = await createTask(
      {
        title: `Chase late invoice ${label}${inv.org_name ? `, ${inv.org_name}` : ''}`,
        body: inv.total ? `${formatMoney(inv.total, inv.currency, 2)} was due ${inv.due_date ?? 'earlier'}.` : null,
        type: 'invoice',
        priority: 'high',
        ownerUserId: inv.am ?? inv.owner,
        dueAt: amsterdamTime(todayKey(now), cfg(rule, 'due_time', '17:00')),
        createdFrom: 'automation',
        links: [{ invoiceId: inv.id }, ...(inv.organization_id ? [{ organizationId: inv.organization_id }] : [])],
        custom: { created_by_rule: rule.key, source_event: event.id },
      },
      t,
    );
    changes.push({ action: 'created', entity: 'task', id: task.id, label: 'Chase task for the account manager' });
  }
  if (inv.organization_id) {
    const note = await logActivity(
      {
        kind: 'note',
        title: `Invoice ${label} is late`,
        body: inv.total ? `${formatMoney(inv.total, inv.currency, 2)}, due ${inv.due_date ?? 'unknown'}.` : null,
        source: 'automation',
        externalId: `rule:${rule.key}:event:${event.id}`,
        meta: { tags: ['Automation', 'Invoice'] },
        links: [{ organizationId: inv.organization_id }, { invoiceId: inv.id }],
        autoLink: false,
      },
      t,
    );
    changes.push({ action: note.created ? 'noted' : 'kept', entity: 'activity', id: note.id, label: 'Note on the organization timeline' });
  }
  return { status: 'success', changes };
};

// ---------------------------------------------------------------- portal ticket in

const ticketIn: EventHandler = async (t, { rule, event }) => {
  const ticketId = event.aggregate_id ?? (event.payload.id as string | undefined) ?? null;
  if (!ticketId) return skipped('The event names no ticket');
  const [tk] = await t<
    { id: string; number: number; subject: string; owner_user_id: string | null; organization_id: string | null; contact_id: string | null; am: string | null; first_name: string | null }[]
  >`
    select tk.id, tk.number, tk.subject, tk.owner_user_id, tk.organization_id, tk.contact_id,
           o.account_manager_user_id as am, c.first_name
      from tickets tk left join organizations o on o.id = tk.organization_id left join contacts c on c.id = tk.contact_id
     where tk.id = ${ticketId} and tk.deleted_at is null`;
  if (!tk) return skipped('The ticket no longer exists');
  const changes: Change[] = [];
  if (!tk.owner_user_id && tk.am) {
    await t`update tickets set owner_user_id = ${tk.am} where id = ${tk.id}`;
    changes.push({ action: 'updated', entity: 'ticket', id: tk.id, label: `Ticket ${tk.number} assigned to the account manager` });
  }
  if (tk.contact_id) {
    const draft = await draftMessage(t, {
      ruleKey: rule.key,
      channel: 'email',
      kind: 'other',
      subject: `We have your request, ticket ${tk.number}`,
      body: `Hi ${tk.first_name ?? 'there'},\n\nThanks, we've got your request about "${tk.subject}" and logged it as ticket ${tk.number}. We'll come back to you as soon as we've looked at it.\n\nAstra`,
      contactId: tk.contact_id,
      organizationId: tk.organization_id,
      ownerUserId: tk.owner_user_id ?? tk.am,
      sourceKey: `ticket:${tk.id}`,
    });
    changes.push({ action: draft.created ? 'drafted' : 'kept', entity: 'outbound_message', id: draft.id, label: 'Receipt drafted, waiting for approval' });
  }
  if (!changes.length) return skipped('Nothing to do, the ticket has an owner and no contact');
  return { status: 'success', changes };
};

// ---------------------------------------------------------------- schedules

function hourDue(rule: RuleRow, now: Date): string | null {
  const hour = Number(cfg(rule, 'hour', 8));
  const amsHour = Number(new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Amsterdam', hour: '2-digit', hourCycle: 'h23' }).format(now));
  return amsHour >= hour ? todayKey(now) : null;
}

const noNextStep: ScheduleHandler = {
  due: hourDue,
  run: async (t, { rule, now }) => {
    const deals = await t<
      { deal_id: string; name: string; owner_user_id: string | null; organization_id: string | null; is_rotting: boolean; has_open_task: boolean; stage_name: string; days_in_stage: number }[]
    >`
      select deal_id, name, owner_user_id, organization_id, is_rotting, has_open_task, stage_name, days_in_stage
        from v_deal_weighted
       where stage_state = 'open' and (not has_open_task or is_rotting)
       order by name`;
    const changes: Change[] = [];
    for (const d of deals) {
      if (await openRuleTask(t, rule.key, 'deal_id', d.deal_id)) continue;
      const why = !d.has_open_task ? 'no open task' : `${d.days_in_stage} days in ${d.stage_name}, past the limit`;
      const task = await createTask(
        {
          title: `Plan the next step for ${d.name}`,
          body: `This deal has ${why}.`,
          type: 'todo',
          priority: d.is_rotting ? 'high' : 'medium',
          ownerUserId: d.owner_user_id,
          dueAt: amsterdamTime(todayKey(now), cfg(rule, 'due_time', '17:00')),
          createdFrom: 'automation',
          links: [{ dealId: d.deal_id }, ...(d.organization_id ? [{ organizationId: d.organization_id }] : [])],
          custom: { created_by_rule: rule.key },
        },
        t,
      );
      changes.push({ action: 'created', entity: 'task', id: task.id, label: `${d.name}, ${why}` });
    }
    return changes.length ? { status: 'success', changes } : skipped('Every open deal has a next step');
  },
};

const quarterlyCheckin: ScheduleHandler = {
  due: (rule, now) => {
    const today = todayKey(now);
    const next = nextQuarterFirstMonday(today);
    return dayDiff(today, next.day) <= Number(cfg(rule, 'lead_days', 7)) ? next.quarter : null;
  },
  run: async (t, { rule, now }) => {
    const { day, quarter } = nextQuarterFirstMonday(todayKey(now));
    const orgs = await t<{ id: string; name: string; am: string | null }[]>`
      select id, name, coalesce(account_manager_user_id, owner_user_id) as am
        from organizations where lifecycle_stage = 'customer' and deleted_at is null order by name`;
    const changes: Change[] = [];
    for (const o of orgs) {
      if (await openRuleTask(t, rule.key, 'organization_id', o.id, { key: 'quarter', value: quarter })) continue;
      const [project] = await t<{ id: string }[]>`
        select id from projects where organization_id = ${o.id} and status = 'active' and deleted_at is null
         order by created_at desc limit 1`;
      const task = await createTask(
        {
          title: `Quarterly check in with ${o.name}`,
          type: 'checkin',
          priority: 'medium',
          ownerUserId: o.am,
          dueAt: amsterdamTime(day, cfg(rule, 'due_time', '11:00')),
          remindBeforeMinutes: Number(cfg(rule, 'remind_before_minutes', 1440)),
          createdFrom: 'automation',
          links: [{ organizationId: o.id }, ...(project ? [{ projectId: project.id }] : [])],
          custom: { created_by_rule: rule.key, quarter },
        },
        t,
      );
      changes.push({ action: 'created', entity: 'task', id: task.id, label: `${o.name}, due ${day}` });
    }
    return changes.length ? { status: 'success', changes } : skipped('No customer organizations need a check in');
  },
};

const markInvoicesLate: ScheduleHandler = {
  due: hourDue,
  run: async (t) => {
    const rows = await t<{ id: string; label: string }[]>`
      update invoices set state = 'late'
       where state = 'open' and due_date < crm_today() and deleted_at is null
      returning id, coalesce(external_number, title, 'Invoice') as label`;
    const changes: Change[] = [];
    for (const r of rows) {
      await emit(t, 'invoice.late', { id: r.id }, { aggregateType: 'invoice', aggregateId: r.id });
      changes.push({ action: 'updated', entity: 'invoice', id: r.id, label: `${r.label} marked late` });
    }
    return changes.length ? { status: 'success', changes } : skipped('No open invoice is past its due date');
  },
};

export const EVENT_HANDLERS: Record<string, EventHandler> = {
  deal_won_start_delivery: dealWon,
  lead_reply_move: leadReplied,
  invoice_late: invoiceLate,
  portal_ticket_in: ticketIn,
};

export const SCHEDULE_HANDLERS: Record<string, ScheduleHandler> = {
  deal_no_next_step: noNextStep,
  quarterly_checkin: quarterlyCheckin,
  invoice_mark_late: markInvoicesLate,
};
