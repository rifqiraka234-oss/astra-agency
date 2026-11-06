/**
 * lib/service/list.ts, the /tickets list query with SLA clocks, overdue first.
 *
 *   const rows = await listTickets({ status: 'open', priority: 'high', owner, org });
 */
import { sql } from '../db';
import { ticketSlas } from './tickets';
import { slaUrgency, type SlaClock, type SlaResult } from './sla';

export type TicketFilters = { status?: string | null; priority?: string | null; owner?: string | null; org?: string | null };

export type TicketListRow = {
  id: string;
  number: number;
  subject: string;
  priority: string;
  source: string;
  category: string | null;
  organization_id: string | null;
  organization_name: string | null;
  contact_name: string | null;
  project_id: string | null;
  project_name: string | null;
  owner_user_id: string | null;
  owner_name: string | null;
  stage_key: string;
  stage_name: string;
  stage_state: string;
  opened_at: Date;
  closed_at: Date | null;
  sample: boolean;
  sla: SlaResult | null;
  /** The clock that matters now: first reply until answered, then resolution. */
  clock: SlaClock | null;
  clockKind: 'first_reply' | 'resolution';
};

const UUID = /^[0-9a-f-]{36}$/i;
const PRIORITY_RANK: Record<string, number> = { urgent: 0, high: 1, medium: 2, low: 3 };

export async function listTickets(f: TicketFilters, now: Date = new Date()): Promise<TicketListRow[]> {
  const owner = f.owner === 'none' ? 'none' : f.owner && UUID.test(f.owner) ? f.owner : null;
  const org = f.org && UUID.test(f.org) ? f.org : null;
  const status = f.status ?? null;
  const rows = await sql<Omit<TicketListRow, 'sla' | 'clock' | 'clockKind'>[]>`
    select tk.id, tk.number, tk.subject, tk.priority, tk.source, tk.category, tk.organization_id, o.name as organization_name,
           c.full_name as contact_name, tk.project_id, p.name as project_name, tk.owner_user_id, u.name as owner_name,
           s.key as stage_key, s.name as stage_name, s.state as stage_state, tk.opened_at, tk.closed_at,
           coalesce((tk.custom ->> 'sample')::boolean, false) as sample
      from tickets tk
      join pipeline_stages s on s.id = tk.stage_id
      left join organizations o on o.id = tk.organization_id
      left join contacts c on c.id = tk.contact_id
      left join projects p on p.id = tk.project_id
      left join users u on u.id = tk.owner_user_id
     where tk.deleted_at is null
       and (${status}::text is null or (${status} = 'open' and s.state = 'open') or s.key = ${status})
       and (${f.priority ?? null}::text is null or tk.priority = ${f.priority ?? null})
       and (${owner}::text is null or (${owner} = 'none' and tk.owner_user_id is null) or tk.owner_user_id::text = ${owner})
       and (${org}::uuid is null or tk.organization_id = ${org})`;
  const slas = await ticketSlas(sql, rows.map((r) => r.id), now);
  const out: TicketListRow[] = rows.map((r) => {
    const sla = slas.get(r.id) ?? null;
    const answered = Boolean(sla?.firstReply.stoppedAt);
    return { ...r, sla, clock: sla ? (answered ? sla.resolution : sla.firstReply) : null, clockKind: answered ? 'resolution' : 'first_reply' };
  });
  // Open before closed, then overdue SLA first, then the least time left, then priority, then newest.
  return out.sort((a, b) => {
    const ao = a.stage_state === 'open' ? 0 : 1;
    const bo = b.stage_state === 'open' ? 0 : 1;
    if (ao !== bo) return ao - bo;
    if (ao === 1) return new Date(b.closed_at ?? b.opened_at).getTime() - new Date(a.closed_at ?? a.opened_at).getTime();
    const au = a.clock ? slaUrgency(a.clock) : 1e9;
    const bu = b.clock ? slaUrgency(b.clock) : 1e9;
    if (au !== bu) return au - bu;
    const ap = PRIORITY_RANK[a.priority] ?? 9;
    const bp = PRIORITY_RANK[b.priority] ?? 9;
    if (ap !== bp) return ap - bp;
    return new Date(b.opened_at).getTime() - new Date(a.opened_at).getTime();
  });
}
