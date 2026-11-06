/**
 * lib/work/home.ts, the numbers and people behind the home page (agent C).
 *
 *   const kpis = await homeKpis();      the five tiles of the Main design, all computed live
 *   const people = await dayPeople();   who the whose day switch offers, with their URL slug
 */
import { sql, type Db } from '../db';
import { formatMoney, formatPercent } from '../format';

/** Used when no sales_goals row covers today. */
export const FALLBACK_QUARTER_GOAL = { label: 'Quarter', amount: '50000.00', currency: 'EUR' };

export type Kpi = { key: string; label: string; value: string; sub: string; href: string; tone?: 'red' };

export type KpiNumbers = {
  openValue: string;
  openCount: number;
  weightedValue: string;
  goal: { label: string; amount: string; currency: string };
  won90: number;
  lost90: number;
  winRate: number | null;
  leadsInPlay: number;
  waitingOnReply: number;
  overdueTasks: number;
};

export async function kpiNumbers(db: Db = sql): Promise<KpiNumbers> {
  const [[pipe], goalRows, [rate], [leads], [overdue]] = await Promise.all([
    db<{ open_value: string; open_count: number; weighted: string }[]>`
      select coalesce(sum(d.amount), 0)::numeric(14,2)::text as open_value, count(*)::int as open_count,
             coalesce(sum(d.weighted_amount), 0)::numeric(14,2)::text as weighted
        from v_deal_weighted d join pipelines p on p.id = d.pipeline_id
       where p.key = 'sales' and d.stage_state = 'open'`,
    db<{ label: string; amount: string; currency: string }[]>`
      select label, amount::text as amount, currency from sales_goals
       where crm_today() between period_start and period_end
       order by period_end - period_start asc limit 1`.catch(() => [] as { label: string; amount: string; currency: string }[]),
    db<{ won: number; lost: number }[]>`
      select count(*) filter (where d.won_at >= now() - interval '90 days' and s.state = 'won')::int as won,
             count(*) filter (where d.lost_at >= now() - interval '90 days' and s.state = 'lost')::int as lost
        from deals d join pipeline_stages s on s.id = d.stage_id
       where d.deleted_at is null`,
    db<{ in_play: number; waiting: number }[]>`
      select count(*)::int as in_play,
             count(*) filter (where v.stage_key = 'attempting')::int as waiting
        from v_lead_stage v join pipelines p on p.id = v.pipeline_id
       where p.key = 'lead' and v.stage_state = 'open'`,
    db<{ n: number }[]>`select count(*)::int as n from v_open_tasks where is_overdue`,
  ]);
  const won = rate?.won ?? 0;
  const lost = rate?.lost ?? 0;
  return {
    openValue: pipe?.open_value ?? '0',
    openCount: pipe?.open_count ?? 0,
    weightedValue: pipe?.weighted ?? '0',
    goal: goalRows[0] ?? FALLBACK_QUARTER_GOAL,
    won90: won,
    lost90: lost,
    winRate: won + lost === 0 ? null : Math.round((won / (won + lost)) * 100),
    leadsInPlay: leads?.in_play ?? 0,
    waitingOnReply: leads?.waiting ?? 0,
    overdueTasks: overdue?.n ?? 0,
  };
}

/** The tiles, in the Main design's order and wording. */
export function kpiTiles(n: KpiNumbers): Kpi[] {
  const goalLabel = n.goal.label.replace(/\s+\d{4}$/, '');
  return [
    { key: 'open', label: 'Open pipeline', value: formatMoney(n.openValue, 'EUR', 0) || '€0', sub: `${n.openCount} ${n.openCount === 1 ? 'deal' : 'deals'} in sales`, href: '/pipelines' },
    { key: 'weighted', label: 'Weighted pipeline', value: formatMoney(n.weightedValue, 'EUR', 0) || '€0', sub: `${goalLabel} goal ${formatMoney(n.goal.amount, n.goal.currency, 0)}`, href: '/deals' },
    {
      key: 'win',
      label: 'Win rate, 90 days',
      value: n.winRate === null ? 'None yet' : formatPercent(n.winRate),
      sub: `${n.won90} won, ${n.lost90} lost`,
      href: '/deals',
    },
    { key: 'leads', label: 'Leads in play', value: String(n.leadsInPlay), sub: `${n.waitingOnReply} waiting on a reply`, href: '/leads' },
    { key: 'overdue', label: 'Overdue tasks', value: String(n.overdueTasks), sub: 'Across the team', href: '/tasks?owner=all', tone: n.overdueTasks > 0 ? 'red' : undefined },
  ];
}

export async function homeKpis(db: Db = sql): Promise<Kpi[]> {
  return kpiTiles(await kpiNumbers(db));
}

export type DayPerson = { id: string; slug: string; label: string; name: string; initials: string | null; avatarBg: string | null };

/** Active users for the whose day switch and the task owner filter. slug is the email name ('raka'). */
export async function dayPeople(db: Db = sql): Promise<DayPerson[]> {
  const rows = await db<{ id: string; email: string; name: string; initials: string | null; avatar_bg: string | null }[]>`
    select id, email, name, initials, avatar_bg from users where is_active order by created_at, name`;
  return rows.map((r) => {
    const slug = r.email.split('@')[0].toLowerCase().replace(/[^a-z0-9]+/g, '');
    return { id: r.id, slug, label: slug.charAt(0).toUpperCase() + slug.slice(1), name: r.name, initials: r.initials, avatarBg: r.avatar_bg };
  });
}

/** Finds a person by slug or id. */
export function findPerson(people: DayPerson[], key: string | null | undefined): DayPerson | undefined {
  if (!key) return undefined;
  const k = key.toLowerCase();
  return people.find((p) => p.slug === k || p.id === k);
}

/** The signed in user first, then everyone else by name. */
export function orderPeople(people: DayPerson[], meId: string): DayPerson[] {
  return [...people].sort((a, b) => (a.id === meId ? -1 : b.id === meId ? 1 : a.label.localeCompare(b.label)));
}
