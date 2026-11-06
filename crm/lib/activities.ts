/**
 * lib/activities.ts, the one timeline. Every email, LinkedIn message, meeting,
 * note, stage change and system event is one activities row, linked to any
 * number of records through activity_links.
 *
 *   // inside your own transaction (preferred, so it commits with the change)
 *   await logActivity({
 *     kind: 'note', title: 'Note from Raka', body, actorUserId: user.id,
 *     links: [{ organizationId: org.id }],
 *   }, t);
 *
 *   // idempotent sync write: a second call with the same source + externalId returns the first row
 *   const { id, created } = await logActivity({
 *     kind: 'linkedin_message', direction: 'inbound', occurredAt, title: 'Eva Jansen replied on LinkedIn',
 *     body, source: 'lemlist', externalId: activityId, links: [{ contactId }, { leadId }],
 *   }, t);
 *
 *   const items = await getTimeline('organization', orgId);   // TimelineItem[] for <Timeline>
 *
 * Auto linking (HubSpot's rule): an activity linked to a contact is also linked
 * to that contact's current primary organization, and to up to five of that
 * organization's open deals unless the input already names a deal. Pass
 * autoLink: false to switch it off. Past activity stays where it happened when
 * the contact later changes job.
 */
import { sql, tx, type Db, type Tx } from './db';
import { formatDays } from './format';
import { recordHref, type RecordType } from './routes';

export type ActivityKind =
  | 'email' | 'linkedin_message' | 'linkedin_invite' | 'linkedin_accept' | 'call' | 'meeting' | 'note'
  | 'stage_change' | 'artifact_sent' | 'ticket' | 'task' | 'invoice' | 'system';

export type ActivityDirection = 'outbound' | 'inbound' | 'internal';

export type ActivityLink = {
  contactId?: string | null;
  organizationId?: string | null;
  leadId?: string | null;
  dealId?: string | null;
  projectId?: string | null;
  ticketId?: string | null;
  invoiceId?: string | null;
  isPrimary?: boolean;
};

export type LogActivityInput = {
  kind: ActivityKind;
  direction?: ActivityDirection;
  occurredAt?: Date | string;
  actorUserId?: string | null;
  title: string;
  body?: string | null;
  /** Free form. meta.tags (string[]) shows as chips on the timeline. */
  meta?: Record<string, unknown>;
  /** manual (default), lemlist, gmail, automation, system, import, seed */
  source?: string;
  /** With source, makes the write idempotent. */
  externalId?: string | null;
  links: ActivityLink[];
  autoLink?: boolean;
};

export type LogActivityResult = { id: string; created: boolean };

const LINK_COLUMNS = {
  contactId: 'contact_id',
  organizationId: 'organization_id',
  leadId: 'lead_id',
  dealId: 'deal_id',
  projectId: 'project_id',
  ticketId: 'ticket_id',
  invoiceId: 'invoice_id',
} as const;

type LinkKey = keyof typeof LINK_COLUMNS;

/** Split mixed links into one id per row, as activity_links requires. */
export function flattenLinks(links: ActivityLink[]): { key: LinkKey; id: string; isPrimary: boolean }[] {
  const out: { key: LinkKey; id: string; isPrimary: boolean }[] = [];
  const seen = new Set<string>();
  for (const link of links) {
    for (const key of Object.keys(LINK_COLUMNS) as LinkKey[]) {
      const id = link[key];
      if (!id) continue;
      const sig = `${key}:${id}`;
      if (seen.has(sig)) continue;
      seen.add(sig);
      out.push({ key, id, isPrimary: Boolean(link.isPrimary) });
    }
  }
  if (out.length && !out.some((l) => l.isPrimary)) out[0].isPrimary = true;
  return out;
}

/** The contact's current primary organization, from primary_org_id or the primary current role. */
export async function primaryOrgOf(db: Db, contactId: string): Promise<string | null> {
  const [row] = await db<{ org: string | null }[]>`
    select coalesce(
      c.primary_org_id,
      (select r.organization_id from contact_org_roles r
        where r.contact_id = c.id and r.is_current
        order by r.is_primary desc, r.start_date desc nulls last, r.created_at desc limit 1)
    ) as org
    from contacts c where c.id = ${contactId}`;
  return row?.org ?? null;
}

async function expandLinks(db: Db, links: ActivityLink[]): Promise<ActivityLink[]> {
  const flat = flattenLinks(links);
  const contactIds = flat.filter((l) => l.key === 'contactId').map((l) => l.id);
  if (contactIds.length === 0) return links;
  const hasDeal = flat.some((l) => l.key === 'dealId');
  const extra: ActivityLink[] = [];
  for (const contactId of contactIds) {
    const orgId = await primaryOrgOf(db, contactId);
    if (!orgId) continue;
    extra.push({ organizationId: orgId });
    if (hasDeal) continue;
    const deals = await db<{ id: string }[]>`
      select d.id from deals d join pipeline_stages s on s.id = d.stage_id
       where d.organization_id = ${orgId} and d.deleted_at is null and s.state = 'open'
       order by d.updated_at desc limit 5`;
    for (const d of deals) extra.push({ dealId: d.id });
  }
  return [...links, ...extra];
}

async function insertActivity(t: Tx, input: LogActivityInput): Promise<LogActivityResult> {
  const source = input.source ?? 'manual';
  const externalId = input.externalId ?? null;
  const occurredAt = input.occurredAt ? new Date(input.occurredAt) : new Date();
  const [row] = await t<{ id: string }[]>`
    insert into activities (kind, direction, occurred_at, actor_user_id, title, body, meta, source, external_id)
    values (${input.kind}, ${input.direction ?? 'internal'}, ${occurredAt}, ${input.actorUserId ?? null},
            ${input.title}, ${input.body ?? null}, ${t.json((input.meta ?? {}) as never)}, ${source}, ${externalId})
    on conflict (source, external_id) do nothing
    returning id`;
  let id = row?.id;
  const created = Boolean(id);
  if (!id) {
    const [existing] = await t<{ id: string }[]>`
      select id from activities where source = ${source} and external_id = ${externalId}`;
    id = existing.id;
  }
  const links = input.autoLink === false ? input.links : await expandLinks(t, input.links);
  for (const l of flattenLinks(links)) {
    const col = LINK_COLUMNS[l.key];
    await t`
      insert into activity_links (activity_id, ${t(col)}, is_primary)
      values (${id}, ${l.id}, ${l.isPrimary})
      on conflict do nothing`;
  }
  return { id, created };
}

/**
 * Write one activity and its links. Pass your transaction as db so it commits
 * with the change it describes. Without db it opens its own transaction.
 */
export async function logActivity(input: LogActivityInput, db?: Tx): Promise<LogActivityResult> {
  if (db) return insertActivity(db, input);
  return tx((t) => insertActivity(t, input), { userId: input.actorUserId ?? null, source: input.source });
}

// ---------------------------------------------------------------- reading

/** The filter chips on a timeline. Each kind belongs to one group. */
export type TimelineGroup = 'email' | 'linkedin' | 'meeting' | 'ticket' | 'system' | 'note' | 'call' | 'task';

export function timelineGroup(kind: string): TimelineGroup {
  if (kind === 'email') return 'email';
  if (kind.startsWith('linkedin')) return 'linkedin';
  if (kind === 'meeting') return 'meeting';
  if (kind === 'ticket') return 'ticket';
  if (kind === 'note') return 'note';
  if (kind === 'call') return 'call';
  if (kind === 'task') return 'task';
  return 'system'; // stage_change, artifact_sent, invoice, system
}

export type TimelineItem = {
  id: string;
  kind: ActivityKind;
  group: TimelineGroup;
  direction: ActivityDirection;
  title: string;
  body: string | null;
  occurredAt: string; // ISO
  actorName: string | null;
  source: string;
  tags: string[];
  links: { type: RecordType; id: string; label: string; href: string }[];
};

const SOURCE_LABELS: Record<string, string> = { lemlist: 'lemlist', gmail: 'Gmail', automation: 'Automation', import: 'Import' };

/** Activities linked to a record, newest first, ready for <Timeline items={...} />. */
export async function getTimeline(
  recordType: 'organization' | 'contact' | 'lead' | 'deal' | 'project' | 'ticket' | 'invoice',
  recordId: string,
  opts: { limit?: number; before?: Date } = {},
  db: Db = sql,
): Promise<TimelineItem[]> {
  const col = {
    organization: 'organization_id',
    contact: 'contact_id',
    lead: 'lead_id',
    deal: 'deal_id',
    project: 'project_id',
    ticket: 'ticket_id',
    invoice: 'invoice_id',
  }[recordType];
  const rows = await db<
    {
      id: string; kind: ActivityKind; direction: ActivityDirection; title: string; body: string | null;
      occurred_at: Date; actor_name: string | null; source: string; meta: Record<string, unknown>;
      links: { type: RecordType; id: string; label: string }[] | null;
    }[]
  >`
    select a.id, a.kind, a.direction, a.title, a.body, a.occurred_at, u.name as actor_name, a.source, a.meta,
           (select json_agg(json_build_object('type', x.type, 'id', x.id, 'label', x.label))
              from (
                select 'deal' as type, d.id, d.name as label from activity_links l join deals d on d.id = l.deal_id where l.activity_id = a.id
                union all
                select 'project', p.id, p.name from activity_links l join projects p on p.id = l.project_id where l.activity_id = a.id
                union all
                select 'ticket', tk.id, tk.number::text || ' ' || tk.subject from activity_links l join tickets tk on tk.id = l.ticket_id where l.activity_id = a.id
                union all
                select 'contact', c.id, c.full_name from activity_links l join contacts c on c.id = l.contact_id where l.activity_id = a.id
                union all
                select 'organization', o.id, o.name from activity_links l join organizations o on o.id = l.organization_id where l.activity_id = a.id
              ) x) as links
      from activities a
      left join users u on u.id = a.actor_user_id
     where a.deleted_at is null
       and a.id in (select activity_id from activity_links where ${db(col)} = ${recordId})
       and (${opts.before ?? null}::timestamptz is null or a.occurred_at < ${opts.before ?? null})
     order by a.occurred_at desc
     limit ${opts.limit ?? 100}`;
  return rows.map((r) => {
    const links = (r.links ?? []).map((l) => ({ ...l, href: recordHref(l.type, l.id) }));
    const metaTags = Array.isArray(r.meta?.tags) ? (r.meta.tags as unknown[]).map(String) : null;
    const tags =
      metaTags ??
      [
        SOURCE_LABELS[r.source],
        r.direction === 'inbound' ? 'Inbound' : null,
        ...links.filter((l) => l.type === 'deal' || l.type === 'project').map((l) => l.label),
      ].filter((x): x is string => Boolean(x));
    return {
      id: r.id,
      kind: r.kind,
      group: timelineGroup(r.kind),
      direction: r.direction,
      title: r.title,
      body: r.body,
      occurredAt: new Date(r.occurred_at).toISOString(),
      actorName: r.actor_name,
      source: r.source,
      tags,
      links,
    };
  });
}

/** "12 days in Prototype sent", used as a stage change tag. */
export function daysInStageTag(days: number, stageName: string): string {
  return `${formatDays(days)} in ${stageName}`;
}
