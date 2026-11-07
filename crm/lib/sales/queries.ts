/**
 * lib/sales/queries.ts, the reads behind /pipelines, /leads and /deals. Server only.
 *
 *   const board = await boardData({ pipelineKey: 'sales', owner: 'all' });
 *   const { rows, total } = await listLeads({ stage: 'connected', owner: user.id, sort: 'accepted', dir: 'desc' });
 *   const { rows, totals } = await listDeals({ state: 'open' });
 *   const deal = await getDeal(id);  const lead = await getLead(id);
 *
 * Rotting is computed here, never stored: an open record rots when the days
 * since its last stage change or its last activity, whichever is later, pass
 * the stage's rot_days. Server code only (it reads the database).
 */
import { sql } from '../db';
import { getStage, type StageInfo } from '../stages';
import { lineTotals } from './totals';

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export const isUuid = (v: unknown): v is string => typeof v === 'string' && UUID.test(v);

/** 'all', 'none' (unassigned) or a user id. Anything else is 'all'. */
export type OwnerFilter = string;
function ownerClause(owner: OwnerFilter | undefined, column: string) {
  if (owner === 'none') return sql`${sql.unsafe(column)} is null`;
  if (isUuid(owner)) return sql`${sql.unsafe(column)} = ${owner}`;
  return sql`true`;
}

export type SalesUser = { id: string; name: string; first_name: string; initials: string; avatar_bg: string | null; avatar_fg: string | null };

export async function listUsers(): Promise<SalesUser[]> {
  return sql<SalesUser[]>`
    select id, name, split_part(name, ' ', 1) as first_name, coalesce(initials, upper(left(name, 2))) as initials,
           avatar_bg, avatar_fg
      from users where is_active order by name`;
}

export type PipelineOption = { id: string; key: string; name: string; object_type: 'lead' | 'deal'; is_default: boolean };

/** Lead and deal pipelines, the lead pipeline first. Projects and tickets have their own boards. */
export async function salesPipelines(): Promise<PipelineOption[]> {
  return sql<PipelineOption[]>`
    select id, key, name, object_type, is_default from pipelines
     where object_type in ('lead', 'deal') and archived_at is null
     order by object_type = 'lead' desc, is_default desc, position`;
}

export type StageWithGate = StageInfo & {
  description: string | null;
  required: { field_key: string; label: string; input_type: string; options: { value: string; label: string }[] | null }[];
};

export async function stagesOf(pipelineId: string): Promise<StageWithGate[]> {
  return sql<StageWithGate[]>`
    select s.id, s.pipeline_id, p.key as pipeline_key, p.name as pipeline_name, p.object_type, s.key, s.name,
           s.position, s.probability, s.state, s.rot_days, s.pauses_sla, s.description,
           coalesce((select json_agg(json_build_object('field_key', r.field_key, 'label', r.label,
                     'input_type', r.input_type, 'options', r.options) order by r.position)
                       from stage_required_fields r where r.stage_id = s.id), '[]') as required
      from pipeline_stages s join pipelines p on p.id = s.pipeline_id
     where s.pipeline_id = ${pipelineId} and s.archived_at is null
     order by s.position`;
}

/** What the enabled automations do when a record enters a stage, for the gate dialog. */
export async function automationEffects(eventTypes: string[]): Promise<string[]> {
  if (eventTypes.length === 0) return [];
  const rows = await sql<{ name: string; steps: [string, string][] }[]>`
    select name, steps from automation_rules
     where is_enabled and trigger_type = 'event' and trigger_event in ${sql(eventTypes)}
     order by name`;
  return rows.flatMap((r) => (Array.isArray(r.steps) ? r.steps.filter((s) => s[0] === 'Then').map((s) => s[1]) : []));
}

// ---------------------------------------------------------------- board

export type BoardCard = {
  id: string;
  stageId: string;
  title: string;
  sub: string;
  orgName: string | null;
  href: string;
  amount: string | null;
  currency: string;
  weighted: string | null;
  ownerId: string | null;
  ownerName: string | null;
  ownerInitials: string | null;
  ownerBg: string | null;
  ownerFg: string | null;
  chip: string;
  chipTone: 'grey' | 'blue' | 'amber' | 'green' | 'red';
  age: string;
  warn: string | null;
  canQualify: boolean;
};

export type BoardColumn = {
  stage: StageWithGate;
  count: number;
  total: string;
  weighted: string;
  shown: number;
};

export type BoardData = {
  pipeline: PipelineOption;
  objectType: 'lead' | 'deal';
  columns: BoardColumn[];
  closedStages: StageWithGate[];
  cards: BoardCard[];
  totals: { label: string; value: string; mono?: boolean }[];
  closed: {
    stageId: string;
    name: string;
    value: string;
    detail: string;
    state: 'won' | 'lost';
    /** For the lost box, how many by reason, most first. */
    breakdown?: { key: string | null; label: string; count: number }[];
  }[];
};

const CARD_CAP = 40;

function fmtShort(d: Date | string | null): string {
  if (!d) return '';
  const x = new Date(d);
  return new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Amsterdam', day: 'numeric', month: 'short' }).format(x);
}

function isToday(d: Date | string | null): boolean {
  if (!d) return false;
  const fmt = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Amsterdam' });
  return fmt.format(new Date(d)) === fmt.format(new Date());
}

const days = (n: number) => `${n} ${n === 1 ? 'day' : 'days'}`;

export async function boardData(opts: { pipelineKey?: string; owner?: OwnerFilter }): Promise<BoardData | null> {
  const pipelines = await salesPipelines();
  const pipeline = pipelines.find((p) => p.key === opts.pipelineKey) ?? pipelines.find((p) => p.key === 'sales') ?? pipelines[0];
  if (!pipeline) return null;
  const stages = await stagesOf(pipeline.id);
  const open = stages.filter((s) => s.state === 'open');
  const closedStages = stages.filter((s) => s.state !== 'open');
  return pipeline.object_type === 'deal'
    ? dealBoard(pipeline, open, closedStages, opts.owner)
    : leadBoard(pipeline, open, closedStages, opts.owner);
}

async function dealBoard(pipeline: PipelineOption, open: StageWithGate[], closedStages: StageWithGate[], owner?: OwnerFilter): Promise<BoardData> {
  const rows = await sql<
    {
      id: string; name: string; org_name: string | null; amount: string | null; currency: string; weighted_amount: string;
      next_step: string | null; stage_id: string; rot_days: number | null; days_in_stage: number; idle_days: number;
      owner_user_id: string | null; owner_name: string | null; initials: string | null; avatar_bg: string | null; avatar_fg: string | null;
      open_tasks: number; overdue_tasks: number; next_due: Date | null; rn: number;
    }[]
  >`
    select * from (
      select d.id, d.name, o.name as org_name, d.amount, d.currency, v.weighted_amount, d.next_step, v.stage_id, v.rot_days,
             v.days_in_stage,
             crm_today() - (greatest(v.stage_entered_at, coalesce(la.last_at, v.stage_entered_at)) at time zone 'Europe/Amsterdam')::date as idle_days,
             d.owner_user_id, u.name as owner_name, u.initials, u.avatar_bg, u.avatar_fg,
             coalesce(tk.n, 0)::int as open_tasks, coalesce(tk.overdue, 0)::int as overdue_tasks, tk.next_due,
             row_number() over (partition by v.stage_id order by d.amount desc nulls last, d.created_at) as rn
        from v_deal_weighted v
        join deals d on d.id = v.deal_id
        left join organizations o on o.id = d.organization_id
        left join users u on u.id = d.owner_user_id
        left join lateral (
          select max(a.occurred_at) as last_at from activity_links al join activities a on a.id = al.activity_id
           where al.deal_id = d.id and a.deleted_at is null and a.kind <> 'stage_change'
        ) la on true
        left join lateral (
          select count(*) as n, count(*) filter (where t.is_overdue) as overdue, min(t.due_at) as next_due
            from task_links tl join v_open_tasks t on t.id = tl.task_id where tl.deal_id = d.id
        ) tk on true
       where v.pipeline_id = ${pipeline.id} and v.stage_state = 'open' and ${ownerClause(owner, 'd.owner_user_id')}
    ) x
    order by x.rn`;

  const cards: BoardCard[] = rows
    .filter((r) => r.rn <= CARD_CAP)
    .map((r) => {
      const rotting = r.rot_days !== null && r.idle_days > r.rot_days;
      let chip = r.next_step ?? '';
      let tone: BoardCard['chipTone'] = 'grey';
      if (r.open_tasks === 0 && !r.next_step) {
        chip = 'No next task';
        tone = 'red';
      } else if (r.overdue_tasks > 0) {
        chip = r.next_step || 'Task overdue';
        tone = 'red';
      } else if (isToday(r.next_due)) {
        chip = r.next_step || 'Task due today';
        tone = 'amber';
      } else if (r.open_tasks > 0) {
        chip = r.next_step || 'Task planned';
        tone = 'blue';
      }
      return {
        id: r.id,
        stageId: r.stage_id,
        title: r.org_name ?? r.name,
        sub: r.org_name ? r.name : '',
        orgName: r.org_name,
        href: `/deals/${r.id}`,
        amount: r.amount,
        currency: r.currency,
        weighted: r.weighted_amount,
        ownerId: r.owner_user_id,
        ownerName: r.owner_name,
        ownerInitials: r.initials,
        ownerBg: r.avatar_bg,
        ownerFg: r.avatar_fg,
        chip,
        chipTone: tone,
        age: `${days(r.days_in_stage)} in stage`,
        warn: rotting ? `Rotting, past the ${r.rot_days} day limit` : null,
        canQualify: false,
      };
    });

  const columns: BoardColumn[] = open.map((s) => {
    const inStage = rows.filter((r) => r.stage_id === s.id);
    return {
      stage: s,
      count: inStage.length,
      total: sumStr(inStage.map((r) => r.amount)),
      weighted: sumStr(inStage.map((r) => r.weighted_amount)),
      shown: Math.min(inStage.length, CARD_CAP),
    };
  });

  const [won] = await sql<{ n: number; total: string | null; quarter: string | null; top: { name: string; org: string | null; amount: string | null }[] | null }[]>`
    select count(*)::int as n, sum(d.amount) as total,
           (select sum(d2.amount) from deals d2 join pipeline_stages s2 on s2.id = d2.stage_id
             where d2.pipeline_id = ${pipeline.id} and s2.state = 'won' and d2.deleted_at is null
               and d2.won_at >= date_trunc('quarter', crm_today()::timestamp) at time zone 'Europe/Amsterdam'
               and ${ownerClause(owner, 'd2.owner_user_id')}) as quarter,
           (select json_agg(x) from (
              select d3.name, o3.name as org, d3.amount from deals d3 join pipeline_stages s3 on s3.id = d3.stage_id
                left join organizations o3 on o3.id = d3.organization_id
               where d3.pipeline_id = ${pipeline.id} and s3.state = 'won' and d3.deleted_at is null
                 and d3.won_at >= now() - interval '90 days' and ${ownerClause(owner, 'd3.owner_user_id')}
               order by d3.amount desc nulls last limit 3) x) as top
      from deals d join pipeline_stages s on s.id = d.stage_id
     where d.pipeline_id = ${pipeline.id} and s.state = 'won' and d.deleted_at is null
       and d.won_at >= now() - interval '90 days' and ${ownerClause(owner, 'd.owner_user_id')}`;
  const lostReasons = await sql<{ reason: string | null; label: string | null; n: number }[]>`
    select d.lost_reason as reason, ro.label, count(*)::int as n
      from deals d join pipeline_stages s on s.id = d.stage_id
      left join reason_options ro on ro.object_type = 'deal_lost' and ro.key = d.lost_reason
     where d.pipeline_id = ${pipeline.id} and s.state = 'lost' and d.deleted_at is null
       and d.lost_at >= now() - interval '90 days' and ${ownerClause(owner, 'd.owner_user_id')}
     group by d.lost_reason, ro.label order by n desc, ro.label`;
  const lostCount = lostReasons.reduce((a, r) => a + r.n, 0);
  const wonEffects = await automationEffects(['deal.won']);

  const openRows = rows;
  const wonStage = closedStages.find((s) => s.state === 'won');
  const lostStage = closedStages.find((s) => s.state === 'lost');
  const topText = (won.top ?? [])
    .map((d) => `${d.org ?? ''}${d.org ? ' ' : ''}${d.name.toLowerCase()} ${formatEur(d.amount)}`)
    .join(', ');
  const more = won.n - (won.top?.length ?? 0);
  const closed: BoardData['closed'] = [];
  if (wonStage) {
    closed.push({
      stageId: wonStage.id,
      state: 'won',
      name: 'Won, last 90 days',
      value: `${won.n} ${won.n === 1 ? 'deal' : 'deals'} · ${formatEur(won.total ?? '0')}`,
      detail:
        (won.n ? `${topText}${more > 0 ? `, and ${more} more` : ''}. ` : 'No wins in the last 90 days. ') +
        (wonEffects.length ? 'Each win opens a project automatically. ' : '') +
        'Drop a card here to mark it won.',
    });
  }
  if (lostStage) {
    closed.push({
      stageId: lostStage.id,
      state: 'lost',
      name: 'Lost, last 90 days',
      value: `${lostCount} ${lostCount === 1 ? 'deal' : 'deals'}`,
      detail: 'A lost reason from the list is required on the way in. Drop a card here to mark it lost.',
      breakdown: lostReasons.map((r) => ({ key: r.reason, label: r.label ?? (r.reason ? r.reason.replace(/_/g, ' ') : 'No reason'), count: r.n })),
    });
  }

  return {
    pipeline,
    objectType: 'deal',
    columns,
    closedStages,
    cards,
    totals: [
      { label: 'Open deals', value: String(openRows.length), mono: true },
      { label: 'Open value', value: formatEur(sumStr(openRows.map((r) => r.amount))), mono: true },
      { label: 'Weighted value', value: formatEur(sumStr(openRows.map((r) => r.weighted_amount)), 0), mono: true },
      { label: 'Won this quarter', value: formatEur(won.quarter ?? '0'), mono: true },
    ],
    closed,
  };
}

async function leadBoard(pipeline: PipelineOption, open: StageWithGate[], closedStages: StageWithGate[], owner?: OwnerFilter): Promise<BoardData> {
  const rows = await sql<
    {
      id: string; title: string; org_name: string | null; job_title: string | null; research_status: string; status_note: string | null;
      linkedin_accepted_at: Date | null; opener_sent_at: Date | null; last_inbound: Date | null; stage_id: string; stage_key: string;
      rot_days: number | null; days_in_stage: number; idle_days: number; angle_worth_eur: string | null;
      owner_user_id: string | null; owner_name: string | null; initials: string | null; avatar_bg: string | null; avatar_fg: string | null;
    }[]
  >`
    select * from (
      select l.id, coalesce(c.full_name, l.name, o.name, 'Untitled lead') as title, o.name as org_name, c.job_title,
             l.research_status, l.status_note, l.linkedin_accepted_at, l.opener_sent_at, li.last_inbound, v.stage_id,
             v.stage_key, v.rot_days, v.days_in_stage, l.angle_worth_eur,
             crm_today() - (greatest(v.stage_entered_at, coalesce(la.last_at, v.stage_entered_at)) at time zone 'Europe/Amsterdam')::date as idle_days,
             l.owner_user_id, u.name as owner_name, u.initials, u.avatar_bg, u.avatar_fg,
             row_number() over (partition by v.stage_id order by coalesce(li.last_inbound, l.opener_sent_at, l.linkedin_accepted_at, l.created_at) desc) as rn
        from v_lead_stage v
        join leads l on l.id = v.lead_id
        left join contacts c on c.id = l.contact_id
        left join organizations o on o.id = l.organization_id
        left join users u on u.id = l.owner_user_id
        left join lateral (
          select max(a.occurred_at) as last_at from activity_links al join activities a on a.id = al.activity_id
           where al.lead_id = l.id and a.deleted_at is null and a.kind <> 'stage_change'
        ) la on true
        left join lateral (
          select max(a.occurred_at) as last_inbound from activity_links al join activities a on a.id = al.activity_id
           where (al.lead_id = l.id or (l.contact_id is not null and al.contact_id = l.contact_id))
             and a.direction = 'inbound' and a.deleted_at is null
        ) li on true
       where v.pipeline_id = ${pipeline.id} and v.stage_state = 'open' and ${ownerClause(owner, 'l.owner_user_id')}
    ) x
    order by x.rn`;
  const counts = new Map<string, number>();
  for (const r of rows) counts.set(r.stage_id, (counts.get(r.stage_id) ?? 0) + 1);

  const RESEARCH: Record<string, [string, BoardCard['chipTone']]> = {
    unresearched: ['Unresearched', 'grey'],
    researching: ['Researching', 'grey'],
    drafted: ['Drafted', 'blue'],
    awaiting_approval: ['Awaiting approval', 'amber'],
    sent: ['Opener sent', 'grey'],
  };
  const cards: BoardCard[] = [];
  const shownPer = new Map<string, number>();
  for (const r of rows) {
    const shown = shownPer.get(r.stage_id) ?? 0;
    if (shown >= CARD_CAP) continue;
    shownPer.set(r.stage_id, shown + 1);
    const rotting = r.rot_days !== null && r.idle_days > r.rot_days;
    const early = r.stage_key === 'new' || r.stage_key === 'researching';
    const [rLabel, rTone] = RESEARCH[r.research_status] ?? [r.research_status, 'grey'];
    let chip = early ? rLabel : r.status_note ?? rLabel;
    let tone: BoardCard['chipTone'] = early ? rTone : 'grey';
    if (!early && r.stage_key === 'connected') tone = /our turn/i.test(chip) ? 'amber' : 'green';
    if (!early && r.stage_key === 'attempting' && /due|overdue/i.test(chip)) tone = 'amber';
    let age: string;
    if (r.stage_key === 'new') age = r.linkedin_accepted_at ? `Accepted ${fmtShort(r.linkedin_accepted_at)}` : `${days(r.days_in_stage)} in stage`;
    else if (r.stage_key === 'researching') age = r.status_note ?? `${days(r.days_in_stage)} in stage`;
    else if (r.stage_key === 'attempting') age = r.opener_sent_at ? `Opener ${fmtShort(r.opener_sent_at)}` : `${days(r.days_in_stage)} in stage`;
    else if (r.stage_key === 'connected') age = r.last_inbound ? `Replied ${fmtShort(r.last_inbound)}` : `${days(r.days_in_stage)} in stage`;
    else age = `${days(r.days_in_stage)} in stage`;
    if (chip === age) chip = rLabel;
    cards.push({
      id: r.id,
      stageId: r.stage_id,
      title: r.title,
      sub: [r.org_name, r.job_title].filter(Boolean).join(', '),
      orgName: r.org_name,
      href: `/leads/${r.id}`,
      amount: r.angle_worth_eur,
      currency: 'EUR',
      weighted: null,
      ownerId: r.owner_user_id,
      ownerName: r.owner_name,
      ownerInitials: r.initials,
      ownerBg: r.avatar_bg,
      ownerFg: r.avatar_fg,
      chip,
      chipTone: tone,
      age,
      warn: rotting ? (r.stage_key === 'attempting' ? `No reply in ${r.idle_days} days` : `Rotting, past the ${r.rot_days} day limit`) : null,
      canQualify: r.stage_key === 'connected',
    });
  }

  const columns: BoardColumn[] = open.map((s) => {
    const inStage = rows.filter((r) => r.stage_id === s.id);
    return {
      stage: s,
      count: counts.get(s.id) ?? 0,
      total: sumStr(inStage.map((r) => r.angle_worth_eur)),
      weighted: '0',
      shown: Math.min(inStage.length, CARD_CAP),
    };
  });

  const [stats] = await sql<{ replied: number; openers: number; qualified: number }[]>`
    select
      (select count(*)::int from leads l
        where l.pipeline_id = ${pipeline.id} and l.deleted_at is null and l.opener_sent_at >= now() - interval '30 days'
          and ${ownerClause(owner, 'l.owner_user_id')}
          and exists (select 1 from activity_links al join activities a on a.id = al.activity_id
                       where (al.lead_id = l.id or (l.contact_id is not null and al.contact_id = l.contact_id))
                         and a.direction = 'inbound' and a.occurred_at > l.opener_sent_at and a.deleted_at is null)) as replied,
      (select count(*)::int from leads l
        where l.pipeline_id = ${pipeline.id} and l.deleted_at is null and l.opener_sent_at >= now() - interval '30 days'
          and ${ownerClause(owner, 'l.owner_user_id')}) as openers,
      (select count(*)::int from leads l
        where l.pipeline_id = ${pipeline.id} and l.deleted_at is null
          and l.qualified_at >= date_trunc('month', crm_today()::timestamp) at time zone 'Europe/Amsterdam'
          and ${ownerClause(owner, 'l.owner_user_id')}) as qualified`;
  const disq = await sql<{ reason: string | null; label: string | null; n: number }[]>`
    select l.disqualify_reason as reason, ro.label, count(*)::int as n from leads l
      left join reason_options ro on ro.object_type = 'lead_disqualify' and ro.key = l.disqualify_reason
     where l.pipeline_id = ${pipeline.id} and l.deleted_at is null
       and l.disqualified_at >= date_trunc('month', crm_today()::timestamp) at time zone 'Europe/Amsterdam'
       and ${ownerClause(owner, 'l.owner_user_id')}
     group by l.disqualify_reason, ro.label order by n desc, ro.label`;
  const disqCount = disq.reduce((a, r) => a + r.n, 0);
  const attempting = open.find((s) => s.key === 'attempting');
  const qualifiedStage = closedStages.find((s) => s.state === 'won');
  const disqStage = closedStages.find((s) => s.state === 'lost');
  const closed: BoardData['closed'] = [];
  if (qualifiedStage) {
    closed.push({
      stageId: qualifiedStage.id,
      state: 'won',
      name: 'Qualified this month',
      value: String(stats.qualified),
      detail: 'Qualifying turns the lead into a deal in Discovery booked and keeps the full LinkedIn thread on the timeline. Drop a card here to qualify it.',
    });
  }
  if (disqStage) {
    closed.push({
      stageId: disqStage.id,
      state: 'lost',
      name: 'Disqualified this month',
      value: String(disqCount),
      detail: 'A reason from the list is required. Do not contact also adds them to the suppression list.',
      breakdown: disq.map((r) => ({ key: r.reason, label: r.label ?? (r.reason ? r.reason.replace(/_/g, ' ') : 'No reason'), count: r.n })),
    });
  }
  return {
    pipeline,
    objectType: 'lead',
    columns,
    closedStages,
    cards,
    totals: [
      { label: 'Leads in play', value: String(rows.length), mono: true },
      { label: 'Waiting on a reply', value: String(attempting ? counts.get(attempting.id) ?? 0 : 0), mono: true },
      { label: 'Reply rate, 30 days', value: stats.openers ? `${Math.round((stats.replied / stats.openers) * 100)}%` : 'No openers yet', mono: Boolean(stats.openers) },
      { label: 'Qualified this month', value: String(stats.qualified), mono: true },
    ],
    closed,
  };
}

function sumStr(values: (string | null | undefined)[]): string {
  let cents = 0n;
  for (const v of values) {
    if (!v) continue;
    const [w, f = ''] = v.split('.');
    const neg = w.startsWith('-');
    const c = BigInt(w.replace('-', '') || '0') * 100n + BigInt((f + '00').slice(0, 2));
    cents += neg ? -c : c;
  }
  const neg = cents < 0n;
  const abs = neg ? -cents : cents;
  return `${neg ? '-' : ''}${abs / 100n}.${String(abs % 100n).padStart(2, '0')}`;
}

/** '€14,500', whole euros unless there are cents (decimals 0 rounds). */
export function formatEur(v: string | null | undefined, decimals?: 0): string {
  if (v === null || v === undefined || v === '') return '€0';
  const n = decimals === 0 ? Math.round(Number(v)) : Number(v);
  const whole = Number.isInteger(n);
  return `€${n.toLocaleString('en-US', { minimumFractionDigits: whole ? 0 : 2, maximumFractionDigits: whole ? 0 : 2 })}`;
}

// ---------------------------------------------------------------- lists

/** 'a|b' + 'desc' -> 'a desc nulls last, b desc nulls last'. Expressions come from the whitelists below only. */
function orderBy(expr: string, dir: 'asc' | 'desc'): string {
  return expr
    .split('|')
    .map((e) => `${e.trim()} ${dir} nulls last`)
    .join(', ');
}

export type LeadListFilters = {
  stage?: string;
  research?: string;
  /** A disqualify reason key, or 'none' for disqualified leads without one. */
  reason?: string;
  owner?: string;
  source?: string;
  q?: string;
  state?: string;
  sort?: string;
  dir?: string;
};

const LEAD_SORTS: Record<string, string> = {
  name: 'lower(coalesce(c.full_name, l.name, o.name))',
  organization: 'lower(o.name)',
  stage: 'v.stage_position',
  research: 'l.research_status',
  owner: 'u.name',
  source: 'l.source',
  accepted: 'l.linkedin_accepted_at',
  worth: 'l.angle_worth_eur',
  days: 'v.days_in_stage',
  created: 'l.created_at',
  reason: 'lower(dr.label)',
};

export type LeadListRow = {
  id: string;
  title: string;
  contact_id: string | null;
  organization_id: string | null;
  org_name: string | null;
  job_title: string | null;
  stage_name: string;
  stage_key: string;
  stage_state: string;
  research_status: string;
  disqualify_reason: string | null;
  disqualify_reason_label: string | null;
  disqualify_note: string | null;
  owner_name: string | null;
  owner_initials: string | null;
  owner_bg: string | null;
  source: string | null;
  campaign: string | null;
  angle: string | null;
  angle_worth_eur: string | null;
  linkedin_accepted_at: Date | null;
  days_in_stage: number;
  is_rotting: boolean;
  converted_deal_id: string | null;
  created_at: Date;
};

export async function listLeads(f: LeadListFilters, limit = 500): Promise<{ rows: LeadListRow[]; total: number }> {
  const sortExpr = LEAD_SORTS[f.sort ?? ''] ?? LEAD_SORTS.accepted;
  const dir = f.dir === 'asc' ? 'asc' : 'desc';
  const like = f.q ? `%${f.q.replace(/[\\%_]/g, (m) => `\\${m}`)}%` : null;
  const stageCond = isUuid(f.stage) ? sql`v.stage_id = ${f.stage}` : f.stage ? sql`v.stage_key = ${f.stage}` : sql`true`;
  const stateCond = f.state === 'open' ? sql`v.stage_state = 'open'` : f.state === 'closed' ? sql`v.stage_state <> 'open'` : sql`true`;
  const rows = await sql<(LeadListRow & { total: number })[]>`
    select l.id, coalesce(c.full_name, l.name, o.name, 'Untitled lead') as title, l.contact_id, l.organization_id,
           o.name as org_name, c.job_title, v.stage_name, v.stage_key, v.stage_state, l.research_status, l.disqualify_reason,
           dr.label as disqualify_reason_label, l.disqualify_note, u.name as owner_name, u.initials as owner_initials, u.avatar_bg as owner_bg, l.source, l.campaign, l.angle,
           l.angle_worth_eur, l.linkedin_accepted_at, v.days_in_stage, v.is_rotting, l.converted_deal_id, l.created_at,
           count(*) over ()::int as total
      from v_lead_stage v
      join leads l on l.id = v.lead_id
      left join contacts c on c.id = l.contact_id
      left join organizations o on o.id = l.organization_id
      left join users u on u.id = l.owner_user_id
      left join reason_options dr on dr.object_type = 'lead_disqualify' and dr.key = l.disqualify_reason
     where ${stageCond} and ${stateCond}
       and ${f.research ? sql`l.research_status = ${f.research}` : sql`true`}
       and ${f.reason === 'none' ? sql`(v.stage_state = 'lost' and l.disqualify_reason is null)` : f.reason ? sql`(v.stage_state = 'lost' and l.disqualify_reason = ${f.reason})` : sql`true`}
       and ${ownerClause(f.owner, 'l.owner_user_id')}
       and ${f.source ? sql`l.source = ${f.source}` : sql`true`}
       and ${like ? sql`(c.full_name ilike ${like} or o.name ilike ${like} or l.name ilike ${like} or l.campaign ilike ${like})` : sql`true`}
     order by ${sql.unsafe(orderBy(sortExpr, dir))}, l.id
     limit ${limit}`;
  return { rows, total: rows[0]?.total ?? 0 };
}

/** Open stages of a pipeline by key, for create forms. */
export async function openStagesOf(pipelineKey: string) {
  return sql<{ id: string; name: string }[]>`
    select s.id, s.name from pipeline_stages s join pipelines p on p.id = s.pipeline_id
     where p.key = ${pipelineKey} and s.state = 'open' and s.archived_at is null order by s.position`;
}

export async function leadFilterOptions() {
  const [stages, sources] = await Promise.all([
    sql<{ id: string; key: string; name: string }[]>`
      select s.id, s.key, s.name from pipeline_stages s join pipelines p on p.id = s.pipeline_id
       where p.object_type = 'lead' and s.archived_at is null order by p.position, s.position`,
    sql<{ source: string }[]>`select distinct source from leads where source is not null and deleted_at is null order by source`,
  ]);
  return { stages, sources: sources.map((s) => s.source) };
}

export type DealListFilters = {
  pipeline?: string;
  stage?: string;
  /** A lost reason key, or 'none' for lost deals without one. */
  reason?: string;
  state?: string;
  owner?: string;
  q?: string;
  sort?: string;
  dir?: string;
};

const DEAL_SORTS: Record<string, string> = {
  name: 'lower(d.name)',
  organization: 'lower(o.name)',
  stage: 'p.position|v.stage_position',
  amount: 'd.amount',
  weighted: 'v.weighted_amount',
  probability: 'v.probability',
  close: 'd.close_date',
  owner: 'u.name',
  days: 'v.days_in_stage',
  created: 'd.created_at',
  reason: 'lower(lr.label)',
};

export type DealListRow = {
  id: string;
  name: string;
  organization_id: string | null;
  org_name: string | null;
  pipeline_name: string;
  stage_name: string;
  stage_state: string;
  amount: string | null;
  currency: string;
  probability: number;
  weighted_amount: string;
  close_date: string | null;
  owner_name: string | null;
  owner_initials: string | null;
  owner_bg: string | null;
  next_step: string | null;
  days_in_stage: number;
  is_rotting: boolean;
  has_open_task: boolean;
  lost_reason: string | null;
  lost_reason_label: string | null;
  lost_note: string | null;
  pipeline_id: string;
  stage_id: string;
  created_at: Date;
};

export async function listDeals(f: DealListFilters, limit = 500): Promise<{ rows: DealListRow[]; totals: { count: number; amount: string; weighted: string } }> {
  const sortExpr = DEAL_SORTS[f.sort ?? ''] ?? DEAL_SORTS.close;
  const dir = f.dir === 'desc' ? 'desc' : 'asc';
  const like = f.q ? `%${f.q.replace(/[\\%_]/g, (m) => `\\${m}`)}%` : null;
  const state = f.state ?? 'open';
  const stateCond = state === 'all' ? sql`true` : sql`v.stage_state = ${state}`;
  const stageCond = isUuid(f.stage) ? sql`v.stage_id = ${f.stage}` : sql`true`;
  const pipeCond = f.pipeline ? sql`p.key = ${f.pipeline}` : sql`true`;
  const rows = await sql<DealListRow[]>`
    select d.id, d.name, d.organization_id, o.name as org_name, p.name as pipeline_name, v.stage_name, v.stage_state,
           d.amount, d.currency, v.probability, v.weighted_amount, d.close_date, u.name as owner_name,
           u.initials as owner_initials, u.avatar_bg as owner_bg, d.next_step, v.days_in_stage, v.is_rotting,
           v.has_open_task, d.lost_reason, lr.label as lost_reason_label, d.lost_note, d.pipeline_id, d.stage_id, d.created_at
      from v_deal_weighted v
      join deals d on d.id = v.deal_id
      join pipelines p on p.id = d.pipeline_id
      left join organizations o on o.id = d.organization_id
      left join users u on u.id = d.owner_user_id
      left join reason_options lr on lr.object_type = 'deal_lost' and lr.key = d.lost_reason
     where ${stateCond} and ${stageCond} and ${pipeCond}
       and ${f.reason === 'none' ? sql`(v.stage_state = 'lost' and d.lost_reason is null)` : f.reason ? sql`(v.stage_state = 'lost' and d.lost_reason = ${f.reason})` : sql`true`}
       and ${ownerClause(f.owner, 'd.owner_user_id')}
       and ${like ? sql`(d.name ilike ${like} or o.name ilike ${like})` : sql`true`}
     order by ${sql.unsafe(orderBy(sortExpr, dir))}, d.id
     limit ${limit}`;
  return {
    rows,
    totals: { count: rows.length, amount: sumStr(rows.map((r) => r.amount)), weighted: sumStr(rows.map((r) => r.weighted_amount)) },
  };
}

export async function dealStageOptions() {
  return sql<{ id: string; name: string; pipeline_key: string; pipeline_name: string; state: string }[]>`
    select s.id, s.name, p.key as pipeline_key, p.name as pipeline_name, s.state
      from pipeline_stages s join pipelines p on p.id = s.pipeline_id
     where p.object_type = 'deal' and s.archived_at is null and p.archived_at is null
     order by p.position, s.position`;
}

// ---------------------------------------------------------------- records

export type StageHistoryRow = {
  id: string;
  stage_name: string;
  from_stage_name: string | null;
  changed_at: Date;
  left_at: Date | null;
  days: number;
  actor_name: string | null;
  actor_type: string;
  source: string | null;
  reason: string | null;
  /** True for a move back to an earlier open stage or a reopen, where the reason is required. */
  moved_back: boolean;
};

/** Stage history oldest first, with time in each stage (to the next move, or now). */
export async function stageHistory(objectType: 'lead' | 'deal', recordId: string): Promise<StageHistoryRow[]> {
  return sql<StageHistoryRow[]>`
    select st.id::text, s.name as stage_name, fs.name as from_stage_name, st.changed_at,
           lead(st.changed_at) over w as left_at,
           ((coalesce(lead(st.changed_at) over w, now()) at time zone 'Europe/Amsterdam')::date
             - (st.changed_at at time zone 'Europe/Amsterdam')::date) as days,
           coalesce(u.name, case st.actor_type when 'automation' then 'Automation' when 'sync' then 'lemlist sync'
                                               when 'import' then 'Import' else null end) as actor_name,
           st.actor_type, st.source, st.reason,
           coalesce(s.state = 'open' and fs.id is not null and (fs.state <> 'open' or (fs.pipeline_id = s.pipeline_id and s.position < fs.position)), false) as moved_back
      from stage_transitions st
      join pipeline_stages s on s.id = st.to_stage_id
      left join pipeline_stages fs on fs.id = st.from_stage_id
      left join users u on st.actor_type = 'user' and u.id::text = st.actor_id
     where st.object_type = ${objectType} and st.record_id = ${recordId}
    window w as (order by st.changed_at, st.id)
     order by st.changed_at, st.id`;
}

export type RecordTask = { id: string; title: string; due_at: Date | null; all_day: boolean; is_overdue: boolean; owner_name: string | null };

export async function openTasksFor(column: 'deal_id' | 'lead_id', id: string): Promise<RecordTask[]> {
  return sql<RecordTask[]>`
    select t.id, t.title, t.due_at, t.all_day, t.is_overdue, t.owner_name
      from v_open_tasks t join task_links tl on tl.task_id = t.id
     where ${sql(column)} = ${id}
     order by t.due_at asc nulls last, t.created_at
     limit 20`;
}

export async function getDeal(id: string) {
  if (!isUuid(id)) return null;
  const [deal] = await sql<
    {
      id: string; name: string; organization_id: string | null; org_name: string | null; org_lifecycle: string | null;
      lead_id: string | null; lead_qualified_at: Date | null; pipeline_id: string; pipeline_key: string; pipeline_name: string;
      stage_id: string; owner_user_id: string | null; owner_name: string | null; amount: string | null; currency: string;
      close_date: string | null; deal_type: string; priority: string | null; forecast_category: string | null;
      forecast_probability: number | null; pricing_model: string | null; next_step: string | null; angle: string | null;
      source: string | null; meeting_at: Date | null; build_card_url: string | null; prototype_url: string | null;
      quote_ref: string | null; decision_date: string | null; signer: string | null; start_date: string | null;
      won_reason: string | null; lost_reason: string | null; lost_note: string | null; lost_competitor: string | null; won_at: Date | null; lost_at: Date | null;
      custom: Record<string, unknown>; created_at: Date; probability: number; weighted_amount: string; days_in_stage: number;
      is_rotting: boolean;
    }[]
  >`
    select d.*, o.name as org_name, o.lifecycle_stage as org_lifecycle, l.qualified_at as lead_qualified_at,
           p.key as pipeline_key, p.name as pipeline_name, u.name as owner_name,
           v.probability, v.weighted_amount, v.days_in_stage, v.is_rotting
      from deals d
      join pipelines p on p.id = d.pipeline_id
      join v_deal_weighted v on v.deal_id = d.id
      left join organizations o on o.id = d.organization_id
      left join leads l on l.id = d.lead_id
      left join users u on u.id = d.owner_user_id
     where d.id = ${id} and d.deleted_at is null`;
  if (!deal) return null;
  const [stages, lines, quotes, contacts, history, tasks, products, projects] = await Promise.all([
    stagesOf(deal.pipeline_id),
    sql<{ id: string; product_id: string | null; name: string; description: string | null; quantity: string; unit_price: string; discount_pct: string; tax_rate: string; billing_frequency: string; currency: string }[]>`
      select id, product_id, name, description, quantity, unit_price, discount_pct, tax_rate, billing_frequency, currency
        from line_items where deal_id = ${id} order by position, created_at`,
    sql<{ id: string; number: string | null; version: number; status: string; valid_until: string | null; sent_at: Date | null; view_count: number; accepted_at: Date | null; accepted_by_name: string | null; created_at: Date; subtotal: string | null }[]>`
      select q.id, q.number, q.version, q.status, q.valid_until, q.sent_at, q.view_count, q.accepted_at, q.accepted_by_name, q.created_at,
             (select sum(round(li.quantity * li.unit_price * (100 - li.discount_pct) / 100, 2)) from line_items li where li.quote_id = q.id) as subtotal
        from quotes q where q.deal_id = ${id} order by q.version desc`,
    sql<{ id: string; contact_id: string; full_name: string; role: string; role_note: string | null; is_primary: boolean; email: string | null; job_title: string | null }[]>`
      select dc.id, dc.contact_id, c.full_name, dc.role, dc.role_note, dc.is_primary, c.job_title,
             (select e.email from contact_emails e where e.contact_id = c.id order by e.is_primary desc limit 1) as email
        from deal_contacts dc join contacts c on c.id = dc.contact_id
       where dc.deal_id = ${id} order by dc.is_primary desc, dc.created_at`,
    stageHistory('deal', id),
    openTasksFor('deal_id', id),
    sql<{ id: string; name: string; unit_price: string; tax_rate: string; billing_frequency: string }[]>`
      select id, name, unit_price, tax_rate, billing_frequency from products where is_active order by name`,
    sql<{ id: string; name: string }[]>`select id, name from projects where deal_id = ${id} and deleted_at is null order by created_at`,
  ]);
  return { deal, stages, lines, totals: lineTotals(lines), quotes, contacts, history, tasks, products, projects };
}

export type DealRecord = NonNullable<Awaited<ReturnType<typeof getDeal>>>;

export async function getLead(id: string) {
  if (!isUuid(id)) return null;
  const [lead] = await sql<
    {
      id: string; name: string | null; contact_id: string | null; organization_id: string | null; pipeline_id: string; stage_id: string;
      owner_user_id: string | null; owner_name: string | null; label: string | null; source: string | null; campaign: string | null;
      research_status: string; disqualify_reason: string | null; disqualify_note: string | null; angle: string | null; angle_worth_eur: string | null;
      status_note: string | null; next_step: string | null; auto_progress_enabled: boolean; linkedin_accepted_at: Date | null;
      opener_sent_at: Date | null; qualified_at: Date | null; disqualified_at: Date | null; converted_deal_id: string | null;
      custom: Record<string, unknown>; created_at: Date;
      contact_name: string | null; contact_title: string | null; contact_tagline: string | null; contact_linkedin: string | null;
      contact_email: string | null; contact_dnc: boolean | null; org_name: string | null; org_domain: string | null; org_city: string | null;
      org_industry: string | null; converted_deal_name: string | null; days_in_stage: number; is_rotting: boolean; pipeline_name: string;
    }[]
  >`
    select l.*, u.name as owner_name, c.full_name as contact_name, c.job_title as contact_title, c.tagline as contact_tagline,
           c.linkedin_url as contact_linkedin, c.do_not_contact as contact_dnc,
           (select e.email from contact_emails e where e.contact_id = c.id order by e.is_primary desc limit 1) as contact_email,
           o.name as org_name, o.city as org_city, o.industry as org_industry,
           (select d.domain_normalised from organization_domains d where d.organization_id = o.id order by d.is_primary desc limit 1) as org_domain,
           cd.name as converted_deal_name, v.days_in_stage, v.is_rotting, p.name as pipeline_name
      from leads l
      join pipelines p on p.id = l.pipeline_id
      join v_lead_stage v on v.lead_id = l.id
      left join users u on u.id = l.owner_user_id
      left join contacts c on c.id = l.contact_id
      left join organizations o on o.id = l.organization_id
      left join deals cd on cd.id = l.converted_deal_id
     where l.id = ${id} and l.deleted_at is null`;
  if (!lead) return null;
  const [stages, history, tasks] = await Promise.all([stagesOf(lead.pipeline_id), stageHistory('lead', id), openTasksFor('lead_id', id)]);
  return { lead, stages, history, tasks };
}

export type LeadRecord = NonNullable<Awaited<ReturnType<typeof getLead>>>;

/** For gate dialogs: the stage and the record's current values of its required fields. */
export async function stageForGate(stageId: string) {
  return getStage(stageId);
}

/** The organization a new deal starts with, from /deals?new=1&organization=<id>. */
export async function pickedOrganization(id: string | undefined): Promise<{ id: string; title: string; subtitle?: string } | null> {
  if (!isUuid(id)) return null;
  const [r] = await sql<{ id: string; name: string; domain: string | null }[]>`
    select o.id, o.name, (select d.domain_normalised from organization_domains d where d.organization_id = o.id order by d.is_primary desc limit 1) as domain
      from organizations o where o.id = ${id} and o.deleted_at is null`;
  return r ? { id: r.id, title: r.name, subtitle: r.domain ?? undefined } : null;
}

/** The contact a new deal starts with, from /deals?new=1&contact=<id>. */
export async function pickedContact(id: string | undefined): Promise<{ id: string; title: string; subtitle?: string } | null> {
  if (!isUuid(id)) return null;
  const [r] = await sql<{ id: string; full_name: string; email: string | null }[]>`
    select c.id, c.full_name,
           (select e.email from contact_emails e where e.contact_id = c.id order by e.is_primary desc limit 1) as email
      from contacts c where c.id = ${id} and c.deleted_at is null`;
  return r ? { id: r.id, title: r.full_name, subtitle: r.email ?? undefined } : null;
}

export type ContactLeadRow = {
  id: string;
  title: string;
  org_name: string | null;
  organization_id: string | null;
  pipeline_name: string;
  stage_name: string;
  stage_state: string;
  disqualify_reason_label: string | null;
  days_in_stage: number;
  campaign: string | null;
  source: string | null;
  converted_deal_id: string | null;
  created_at: Date;
};

/** Every lead of a contact, newest first. A contact can have several (one open at a time). */
export async function contactLeads(contactId: string): Promise<ContactLeadRow[]> {
  if (!isUuid(contactId)) return [];
  return sql<ContactLeadRow[]>`
    select l.id, coalesce(l.name, c.full_name, o.name, 'Untitled lead') as title, o.name as org_name, l.organization_id,
           p.name as pipeline_name, v.stage_name, v.stage_state, dr.label as disqualify_reason_label, v.days_in_stage,
           l.campaign, l.source, l.converted_deal_id, l.created_at
      from leads l
      join v_lead_stage v on v.lead_id = l.id
      join pipelines p on p.id = l.pipeline_id
      left join contacts c on c.id = l.contact_id
      left join organizations o on o.id = l.organization_id
      left join reason_options dr on dr.object_type = 'lead_disqualify' and dr.key = l.disqualify_reason
     where l.contact_id = ${contactId} and l.deleted_at is null
     order by (v.stage_state = 'open') desc, l.created_at desc`;
}
