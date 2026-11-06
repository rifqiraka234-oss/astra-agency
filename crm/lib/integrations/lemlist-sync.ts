/**
 * lib/integrations/lemlist-sync.ts, the read only lemlist pull (agent E).
 * scripts/sync-lemlist.ts and the "Run sync now" button on /settings/integrations call syncLemlist().
 *
 * For each running campaign (or the one named):
 *   1. the lead export (company, job title, LinkedIn) and the accept events;
 *   2. per accepted contact, newest acceptance first: the lemlist contact record
 *      and the WHOLE inbox thread, every page, checked against totalItems;
 *   3. in one transaction per contact: organization by domain (free mail never
 *      makes one), contact (matched by lemlist contactId, then LinkedIn URL,
 *      then email), a lead in the Lead pipeline, every thread item and the
 *      acceptance as activities (source lemlist, external id the lemlist
 *      activity id, so a rerun adds nothing twice);
 *   4. lead.replied when a new reply is the newest item in the thread, so the
 *      worker moves the lead and asks the owner to answer.
 *
 * Nothing is ever written to lemlist, the client refuses anything but GET.
 * --dry-run does all of the above and rolls every transaction back.
 */
import { sql, tx, type Tx } from '../db';
import { logActivity, type ActivityKind, type ActivityDirection } from '../activities';
import { emit } from '../events';
import { normDomain, normEmail, normLinkedin, isFreeMail } from '../normalize';
import { lemlist, itemText, requestStats, type LemlistActivity, type LemlistCampaign, type LemlistContact, type LemlistLeadExport, type LemlistThread } from '../lemlist';

export const CONNECTOR = 'lemlist';
export const ACCOUNT = 'astra';

/** lemlist senders to CRM users. Anyone else falls back to Raka. */
const SENDERS: Record<string, string> = {
  usr_27bdxG7jzTn2rucGB: 'raka@astra.local',
  usr_MKy94ogmHZB9hQm3K: 'luna@astra.local',
};

export type SyncOptions = {
  dryRun?: boolean;
  /** Most contacts to sync in this run, across campaigns. */
  limit?: number;
  /** Only this campaign, whatever its status. */
  campaignId?: string;
  /** Also sync leads who never accepted (no thread to speak of). Off by default. */
  allLeads?: boolean;
  log?: (msg: string) => void;
};

export type ThreadMismatch = { contactId: string; problem: string };

export type SyncReport = {
  dryRun: boolean;
  startedAt: string;
  finishedAt: string | null;
  campaigns: { id: string; name: string; leads: number; accepts: number; statsAccepted: number | null; synced: number }[];
  contactsSynced: number;
  contactsCreated: number;
  contactsMatched: number;
  organizationsCreated: number;
  leadsCreated: number;
  leadsUpdated: number;
  activitiesCreated: number;
  activitiesExisting: number;
  threadsPulled: number;
  threadItems: number;
  mismatches: ThreadMismatch[];
  repliesEmitted: number;
  errors: { contactId: string; error: string }[];
  requests: number;
};

class DryRunRollback extends Error {
  constructor(public value: unknown) {
    super('dry run rollback');
  }
}

type Ctx = {
  users: Map<string, string>; // email -> id
  defaultOwner: string | null;
  report: SyncReport;
  dryRun: boolean;
};

// ---------------------------------------------------------------- classification

const CONNECT_NOTE_MAX = 300;

export type ItemClass = { kind: ActivityKind; direction: ActivityDirection; isRealOutbound: boolean };

/**
 * What a thread item is. The connect note is outbound with emailTemplateName
 * linkedinInvite, or a short synced note (text, no message) sent before the
 * acceptance. A reply is linkedinReplied, its text lives in `text`.
 */
export function classifyItem(a: LemlistActivity, acceptedAt: string | null, index: number): ItemClass {
  const type = a.type ?? '';
  if (type === 'linkedinInviteAccepted') return { kind: 'linkedin_accept', direction: 'inbound', isRealOutbound: false };
  if (type === 'linkedinInviteDone' || a.emailTemplateName === 'linkedinInvite') {
    return { kind: 'linkedin_invite', direction: 'outbound', isRealOutbound: false };
  }
  if (type === 'linkedinSent') {
    const text = itemText(a);
    const synced = !a.message && Boolean(a.text);
    const beforeAccept = acceptedAt ? a.createdAt <= acceptedAt : index === 0;
    if (synced && text.length <= CONNECT_NOTE_MAX && beforeAccept) return { kind: 'linkedin_invite', direction: 'outbound', isRealOutbound: false };
    return { kind: 'linkedin_message', direction: 'outbound', isRealOutbound: true };
  }
  if (type === 'linkedinReplied') return { kind: 'linkedin_message', direction: 'inbound', isRealOutbound: false };
  if (/^emails?Sent$/i.test(type)) return { kind: 'email', direction: 'outbound', isRealOutbound: true };
  if (/^emails?Replied$/i.test(type)) return { kind: 'email', direction: 'inbound', isRealOutbound: false };
  if (/Replied$/.test(type)) return { kind: 'linkedin_message', direction: 'inbound', isRealOutbound: false };
  return { kind: 'system', direction: 'internal', isRealOutbound: false };
}

function relationshipFor(jobTitle: string | null | undefined): 'owner' | 'founder' | 'employee' {
  const j = (jobTitle ?? '').toLowerCase();
  if (/(founder|oprichter|gr(ü|ue)nder|fondat|fondateur|co-?founder)/.test(j)) return 'founder';
  if (/(owner|eigenaar|zaakvoerder|gesch(ä|ae)ftsf(ü|ue)hrer|inhaber|dirigeant|ceo|managing director|directeur|director)/.test(j)) return 'owner';
  return 'employee';
}

// ---------------------------------------------------------------- upserts

async function upsertOrganization(t: Tx, exp: LemlistLeadExport | undefined, ctx: Ctx): Promise<string | null> {
  if (!exp) return null;
  const domain = normDomain(String(exp.companyDomain || exp.companyWebsite || exp.companyWebsiteUrl || ''));
  const name = (exp.companyName ?? '').toString().trim();
  const custom = {
    lemlist_industry: exp.companyIndustry ?? null,
    lemlist_company_size: exp.companySize ?? null,
    lemlist_linkedin: exp.companyLinkedinUrl ?? null,
  };
  if (domain && !isFreeMail(domain)) {
    const [hit] = await t<{ organization_id: string }[]>`select organization_id from organization_domains where domain_normalised = ${domain}`;
    if (hit) return hit.organization_id;
    const [org] = await t<{ id: string }[]>`
      insert into organizations (name, owner_user_id, source, linkedin_url, custom)
      values (${name || domain}, ${ctx.defaultOwner}, 'lemlist', ${(exp.companyLinkedinUrl as string) ?? null}, ${t.json(custom as never)})
      returning id`;
    await t`insert into organization_domains (organization_id, domain_normalised, is_primary) values (${org.id}, ${domain}, true)`;
    ctx.report.organizationsCreated++;
    return org.id;
  }
  if (!name) return null;
  const [byName] = await t<{ id: string }[]>`
    select id from organizations where lower(name) = lower(${name}) and deleted_at is null order by created_at limit 1`;
  if (byName) return byName.id;
  const [org] = await t<{ id: string }[]>`
    insert into organizations (name, owner_user_id, source, custom)
    values (${name}, ${ctx.defaultOwner}, 'lemlist', ${t.json({ ...custom, no_domain: true } as never)}) returning id`;
  ctx.report.organizationsCreated++;
  return org.id;
}

async function upsertContact(
  t: Tx,
  cid: string,
  rec: LemlistContact | null,
  exp: LemlistLeadExport | undefined,
  orgId: string | null,
  acceptedAt: string | null,
  ctx: Ctx,
): Promise<string> {
  const f = rec?.fields ?? {};
  const linkedin = normLinkedin(String(rec?.linkedinUrl || exp?.linkedinUrl || ''));
  const email = normEmail(String(f.email || exp?.email || ''));
  const jobTitle = (f.jobTitle as string) || exp?.jobTitle || null;
  const tagline = (f.tagline as string) || exp?.tagline || null;

  let contactId: string | null = null;
  const [byExt] = await t<{ entity_id: string }[]>`
    select entity_id from external_ids where system = 'lemlist_contact' and external_id = ${cid} and entity_type = 'contact'`;
  if (byExt) contactId = byExt.entity_id;
  if (!contactId && linkedin) {
    const [hit] = await t<{ id: string }[]>`select id from contacts where linkedin_url_normalised = ${linkedin} and deleted_at is null`;
    contactId = hit?.id ?? null;
  }
  if (!contactId && email) {
    const [hit] = await t<{ contact_id: string }[]>`select contact_id from contact_emails where lower(trim(email)) = ${email}`;
    contactId = hit?.contact_id ?? null;
  }

  if (contactId) {
    ctx.report.contactsMatched++;
    await t`
      update contacts set
        job_title = coalesce(job_title, ${jobTitle}),
        tagline = coalesce(tagline, ${tagline}),
        linkedin_url = coalesce(linkedin_url, ${rec?.linkedinUrl ?? exp?.linkedinUrl ?? null}),
        linkedin_url_normalised = coalesce(linkedin_url_normalised, ${linkedin}),
        primary_org_id = coalesce(primary_org_id, ${orgId}),
        linkedin_accepted_at = coalesce(linkedin_accepted_at, ${acceptedAt}),
        do_not_contact = do_not_contact or ${Boolean(rec?.unsubscribed)}
      where id = ${contactId}`;
  } else {
    const first = ((f.firstName as string) || exp?.firstName || (rec?.fullName ?? '').split(' ')[0] || '').trim() || 'Unknown';
    const last = ((f.lastName as string) || exp?.lastName || '').trim() || null;
    const [c] = await t<{ id: string }[]>`
      insert into contacts (first_name, last_name, job_title, tagline, linkedin_url, linkedin_url_normalised, primary_org_id,
                            owner_user_id, linkedin_accepted_at, source, do_not_contact, custom)
      values (${first}, ${last}, ${jobTitle}, ${tagline}, ${rec?.linkedinUrl ?? exp?.linkedinUrl ?? null}, ${linkedin}, ${orgId},
              ${ctx.defaultOwner}, ${acceptedAt}, 'lemlist', ${Boolean(rec?.unsubscribed)},
              ${t.json({ lemlist_location: f.location ?? exp?.location ?? null } as never)})
      returning id`;
    contactId = c.id;
    ctx.report.contactsCreated++;
  }

  await t`
    insert into external_ids (entity_type, entity_id, system, external_id, external_url, synced_at)
    values ('contact', ${contactId}, 'lemlist_contact', ${cid}, null, now())
    on conflict do nothing`;
  await t`update external_ids set synced_at = now() where system = 'lemlist_contact' and external_id = ${cid}`;

  if (email) {
    const [{ n }] = await t<{ n: number }[]>`select count(*)::int as n from contact_emails where contact_id = ${contactId}`;
    await t`
      insert into contact_emails (contact_id, email, is_primary) values (${contactId}, ${email}, ${n === 0})
      on conflict do nothing`;
  }
  if (orgId) {
    const [role] = await t<{ id: string }[]>`
      select id from contact_org_roles where contact_id = ${contactId} and organization_id = ${orgId} and is_current`;
    if (!role) {
      const [primary] = await t<{ id: string }[]>`
        select id from contact_org_roles where contact_id = ${contactId} and is_primary and is_current`;
      await t`
        insert into contact_org_roles (contact_id, organization_id, relationship, title, is_primary, is_current)
        values (${contactId}, ${orgId}, ${relationshipFor(jobTitle)}, ${jobTitle}, ${!primary}, true)`;
    }
  }
  return contactId;
}

type ThreadFacts = {
  hasRealOutbound: boolean;
  hasInbound: boolean;
  lastIsInbound: boolean;
  firstRealOutboundAt: string | null;
};

function threadFacts(items: LemlistActivity[], acceptedAt: string | null): ThreadFacts {
  const classes = items.map((a, i) => classifyItem(a, acceptedAt, i));
  const conv = classes.map((c, i) => ({ c, a: items[i] })).filter(({ c }) => c.kind === 'linkedin_message' || c.kind === 'email');
  const last = conv[conv.length - 1];
  const firstOut = conv.find(({ c }) => c.isRealOutbound);
  return {
    hasRealOutbound: conv.some(({ c }) => c.isRealOutbound),
    hasInbound: conv.some(({ c }) => c.direction === 'inbound'),
    lastIsInbound: last?.c.direction === 'inbound',
    firstRealOutboundAt: firstOut?.a.createdAt ?? null,
  };
}

async function stageId(t: Tx, key: string): Promise<{ pipelineId: string; stageId: string }> {
  const [r] = await t<{ pipeline_id: string; id: string }[]>`
    select s.pipeline_id, s.id from pipeline_stages s join pipelines p on p.id = s.pipeline_id where p.key = 'lead' and s.key = ${key}`;
  return { pipelineId: r.pipeline_id, stageId: r.id };
}

async function upsertLead(
  t: Tx,
  args: { cid: string; leadId: string | null; contactId: string; orgId: string | null; campaign: LemlistCampaign; acceptedAt: string | null; ownerId: string | null; facts: ThreadFacts; companyName: string | null },
  ctx: Ctx,
): Promise<{ id: string; created: boolean }> {
  let id: string | null = null;
  if (args.leadId) {
    const [hit] = await t<{ entity_id: string }[]>`
      select entity_id from external_ids where system = 'lemlist_lead' and external_id = ${args.leadId} and entity_type = 'lead'`;
    id = hit?.entity_id ?? null;
  }
  if (!id) {
    const [hit] = await t<{ id: string }[]>`
      select l.id from leads l join pipelines p on p.id = l.pipeline_id
       where p.key = 'lead' and l.deleted_at is null
         and (l.contact_id = ${args.contactId} or (l.contact_id is null and l.custom ->> 'lemlist_contact_id' = ${args.cid}))
       order by (l.contact_id is not null) desc, l.created_at desc limit 1`;
    id = hit?.id ?? null;
  }
  const customPatch = {
    lemlist_contact_id: args.cid,
    linkedin_accepted_at: args.acceptedAt,
    lemlist_campaign_id: args.campaign._id,
  };
  let created = false;
  if (id) {
    await t`
      update leads set
        contact_id = coalesce(contact_id, ${args.contactId}),
        organization_id = coalesce(organization_id, ${args.orgId}),
        campaign = coalesce(campaign, ${args.campaign.name}),
        linkedin_accepted_at = coalesce(linkedin_accepted_at, ${args.acceptedAt}),
        opener_sent_at = coalesce(opener_sent_at, ${args.facts.firstRealOutboundAt}),
        custom = custom || ${t.json(Object.fromEntries(Object.entries(customPatch).filter(([, v]) => v !== null)) as never)}
      where id = ${id}`;
    ctx.report.leadsUpdated++;
  } else {
    const f = args.facts;
    const stageKey = f.hasInbound ? (f.lastIsInbound && f.hasRealOutbound ? 'attempting' : 'connected') : f.hasRealOutbound ? 'attempting' : 'new';
    const st = await stageId(t, stageKey);
    const [row] = await t<{ id: string }[]>`
      insert into leads (contact_id, organization_id, pipeline_id, stage_id, owner_user_id, source, campaign,
                         research_status, linkedin_accepted_at, opener_sent_at, custom)
      values (${args.contactId}, ${args.orgId}, ${st.pipelineId}, ${st.stageId}, ${args.ownerId}, 'lemlist', ${args.campaign.name},
              ${f.hasRealOutbound ? 'sent' : 'unresearched'}, ${args.acceptedAt}, ${f.firstRealOutboundAt},
              ${t.json({ ...customPatch, company_name: args.companyName } as never)})
      returning id`;
    id = row.id;
    created = true;
    ctx.report.leadsCreated++;
    await t`
      insert into stage_transitions (object_type, record_id, pipeline_id, to_stage_id, actor_type, source)
      values ('lead', ${id}, ${st.pipelineId}, ${st.stageId}, 'sync', 'lemlist')`;
  }
  if (args.leadId) {
    await t`
      insert into external_ids (entity_type, entity_id, system, external_id, synced_at)
      values ('lead', ${id}, 'lemlist_lead', ${args.leadId}, now())
      on conflict do nothing`;
  }
  return { id, created };
}

// ---------------------------------------------------------------- one contact

type ContactInput = {
  cid: string;
  leadId: string | null;
  campaign: LemlistCampaign;
  exp: LemlistLeadExport | undefined;
  accept: LemlistActivity | null;
};

async function writeContact(t: Tx, input: ContactInput, rec: LemlistContact | null, thread: LemlistThread, ctx: Ctx): Promise<void> {
  const acceptedAt = input.accept?.createdAt ?? null;
  const sender = input.accept?.sendUserId ?? thread.items.find((a) => a.sendUserId)?.sendUserId ?? null;
  const ownerId = (sender && ctx.users.get(SENDERS[sender] ?? '')) || ctx.defaultOwner;
  const name = rec?.fullName || [input.exp?.firstName, input.exp?.lastName].filter(Boolean).join(' ') || 'Contact';

  const orgId = await upsertOrganization(t, input.exp, ctx);
  const contactId = await upsertContact(t, input.cid, rec, input.exp, orgId, acceptedAt, ctx);
  const facts = threadFacts(thread.items, acceptedAt);
  const lead = await upsertLead(
    t,
    { cid: input.cid, leadId: input.leadId, contactId, orgId, campaign: input.campaign, acceptedAt, ownerId, facts, companyName: (input.exp?.companyName as string) ?? null },
    ctx,
  );

  const links = [{ contactId, isPrimary: true }, { leadId: lead.id }];
  if (input.accept) {
    const res = await logActivity(
      {
        kind: 'linkedin_accept',
        direction: 'inbound',
        occurredAt: input.accept.createdAt,
        title: `${name} accepted on LinkedIn`,
        source: 'lemlist',
        externalId: input.accept._id,
        meta: { lemlist_type: input.accept.type, campaign_id: input.campaign._id, campaign: input.campaign.name },
        links,
      },
      t,
    );
    if (res.created) ctx.report.activitiesCreated++;
    else ctx.report.activitiesExisting++;
    await t`
      update leads set custom = custom || ${t.json({ linkedin_accepted_at: acceptedAt } as never)},
                       linkedin_accepted_at = coalesce(linkedin_accepted_at, ${acceptedAt})
       where id = ${lead.id}`;
  }

  let newestInboundCreated: string | null = null;
  const newestInbound = [...thread.items].reverse().find((a, i, arr) => classifyItem(a, acceptedAt, arr.length - 1 - i).direction === 'inbound' && a.type !== 'linkedinInviteAccepted');
  for (let i = 0; i < thread.items.length; i++) {
    const a = thread.items[i];
    const c = classifyItem(a, acceptedAt, i);
    const actor = c.direction === 'outbound' && a.sendUserId ? ctx.users.get(SENDERS[a.sendUserId] ?? '') ?? null : null;
    const title =
      c.kind === 'linkedin_invite' ? `LinkedIn invite to ${name}`
      : c.kind === 'linkedin_accept' ? `${name} accepted on LinkedIn`
      : c.direction === 'inbound' ? `${name} replied on ${c.kind === 'email' ? 'email' : 'LinkedIn'}`
      : c.direction === 'outbound' ? `${c.kind === 'email' ? 'Email' : 'LinkedIn message'} to ${name}`
      : `lemlist ${a.type}`;
    const body = itemText(a);
    const res = await logActivity(
      {
        kind: c.kind,
        direction: c.direction,
        occurredAt: a.createdAt,
        actorUserId: actor,
        title,
        body: body || null,
        source: 'lemlist',
        externalId: a._id,
        meta: {
          lemlist_type: a.type,
          campaign_id: a.campaignId ?? null,
          send_user: a.sendUserId ?? null,
          length: body.length,
          empty_in_lemlist: body ? undefined : true,
          thread_item: true,
        },
        links,
      },
      t,
    );
    if (res.created) {
      ctx.report.activitiesCreated++;
      if (newestInbound && a._id === newestInbound._id) newestInboundCreated = res.id;
    } else ctx.report.activitiesExisting++;
  }

  // Stored count against lemlist's own count.
  const ids = thread.items.map((a) => a._id);
  const [{ n }] = await t<{ n: number }[]>`
    select count(*)::int as n from activities where source = 'lemlist' and external_id = any(${ids}::text[])`;
  if (!thread.complete) ctx.report.mismatches.push({ contactId: input.cid, problem: thread.problem ?? 'incomplete' });
  else if (n !== thread.totalItems) ctx.report.mismatches.push({ contactId: input.cid, problem: `stored ${n}, lemlist says ${thread.totalItems}` });
  await t`
    update leads set custom = custom || ${t.json({ lemlist_thread_total: thread.totalItems, lemlist_thread_checked_at: new Date().toISOString() } as never)}
     where id = ${lead.id}`;

  if (newestInboundCreated && facts.lastIsInbound) {
    await emit(t, 'lead.replied', { leadId: lead.id, contactId, activityId: newestInboundCreated, source: 'lemlist' }, { aggregateType: 'lead', aggregateId: lead.id });
    ctx.report.repliesEmitted++;
  }
}

// ---------------------------------------------------------------- the run

function emptyReport(dryRun: boolean): SyncReport {
  return {
    dryRun,
    startedAt: new Date().toISOString(),
    finishedAt: null,
    campaigns: [],
    contactsSynced: 0,
    contactsCreated: 0,
    contactsMatched: 0,
    organizationsCreated: 0,
    leadsCreated: 0,
    leadsUpdated: 0,
    activitiesCreated: 0,
    activitiesExisting: 0,
    threadsPulled: 0,
    threadItems: 0,
    mismatches: [],
    repliesEmitted: 0,
    errors: [],
    requests: 0,
  };
}

async function saveCursor(stream: string, cursor: Record<string, unknown>, error: string | null): Promise<void> {
  await sql`
    insert into sync_cursors (connector, account, stream, cursor, last_success_at, last_error, last_error_at)
    values (${CONNECTOR}, ${ACCOUNT}, ${stream}, ${sql.json(cursor as never)}, ${error ? null : new Date()}, ${error}, ${error ? new Date() : null})
    on conflict (connector, account, stream) do update
      set cursor = excluded.cursor,
          last_success_at = coalesce(excluded.last_success_at, sync_cursors.last_success_at),
          last_error = excluded.last_error,
          last_error_at = coalesce(excluded.last_error_at, sync_cursors.last_error_at)`;
}

export async function syncLemlist(opts: SyncOptions = {}): Promise<SyncReport> {
  const dryRun = Boolean(opts.dryRun);
  const log = opts.log ?? (() => {});
  const report = emptyReport(dryRun);
  const startRequests = requestStats.requests;
  const userRows = await sql<{ id: string; email: string }[]>`select id, lower(email) as email from users where is_active`;
  const users = new Map(userRows.map((u) => [u.email, u.id]));
  const ctx: Ctx = { users, defaultOwner: users.get('raka@astra.local') ?? null, report, dryRun };

  let fatal: string | null = null;
  try {
    const all = await lemlist.campaigns();
    const campaigns = opts.campaignId ? all.filter((c) => c._id === opts.campaignId) : all.filter((c) => c.status === 'running');
    if (opts.campaignId && !campaigns.length) throw new Error(`Campaign ${opts.campaignId} not found in lemlist`);
    log(`${campaigns.length} campaign(s): ${campaigns.map((c) => `${c._id} (${c.status})`).join(', ')}`);
    const done = new Set<string>();
    const limit = opts.limit ?? Infinity;

    for (const campaign of campaigns) {
      if (report.contactsSynced >= limit) break;
      const exportRows = await lemlist.campaignLeadsExport(campaign._id);
      const byLead = new Map(exportRows.map((r) => [r._id, r]));
      const accepts = await lemlist.acceptEvents(campaign._id);
      // Earliest acceptance per contact, newest contacts first.
      const firstAccept = new Map<string, LemlistActivity>();
      for (const a of accepts) {
        if (!a.contactId) continue;
        const prev = firstAccept.get(a.contactId);
        if (!prev || a.createdAt < prev.createdAt) firstAccept.set(a.contactId, a);
      }
      const queue: ContactInput[] = [...firstAccept.values()]
        .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
        .map((a) => ({ cid: a.contactId as string, leadId: a.leadId ?? null, campaign, exp: a.leadId ? byLead.get(a.leadId) : undefined, accept: a }));
      if (opts.allLeads) {
        const ids = await lemlist.campaignLeadIds(campaign._id);
        for (const l of ids) {
          if (l.contactId && !firstAccept.has(l.contactId)) queue.push({ cid: l.contactId, leadId: l._id, campaign, exp: byLead.get(l._id), accept: null });
        }
      }
      // Positive control: the accept events must add up to lemlist's own counter.
      const stats = await lemlist.campaignStats(campaign._id).catch(() => null);
      const statsAccepted = typeof stats?.invitationAccepted === 'number' ? stats.invitationAccepted : null;
      const entry = { id: campaign._id, name: campaign.name, leads: exportRows.length, accepts: firstAccept.size, statsAccepted, synced: 0 };
      if (statsAccepted !== null && statsAccepted !== firstAccept.size) {
        report.mismatches.push({ contactId: campaign._id, problem: `${firstAccept.size} accepted contacts from events, campaign stats say ${statsAccepted}` });
      }
      report.campaigns.push(entry);
      log(`${campaign.name}: ${exportRows.length} leads, ${firstAccept.size} accepted (stats say ${statsAccepted ?? 'unknown'}), ${queue.length} to sync`);

      for (const input of queue) {
        if (report.contactsSynced >= limit) break;
        if (done.has(input.cid)) continue;
        done.add(input.cid);
        try {
          const rec = await lemlist.contact(input.cid).catch(() => null);
          const thread = await lemlist.thread(input.cid);
          report.threadsPulled++;
          report.threadItems += thread.items.length;
          await tx(
            async (t) => {
              await writeContact(t, input, rec, thread, ctx);
              if (dryRun) throw new DryRunRollback(null);
            },
            { source: 'sync' },
          ).catch((e) => {
            if (!(e instanceof DryRunRollback)) throw e;
          });
          report.contactsSynced++;
          entry.synced++;
          if (report.contactsSynced % 10 === 0) log(`  ${report.contactsSynced} contacts synced`);
        } catch (err) {
          report.errors.push({ contactId: input.cid, error: err instanceof Error ? err.message : String(err) });
        }
      }
      if (!dryRun) {
        await saveCursor(`campaign:${campaign._id}`, { name: campaign.name, status: campaign.status, leads: entry.leads, accepts: entry.accepts, stats_accepted: entry.statsAccepted, synced_last_run: entry.synced }, null);
      }
    }
  } catch (err) {
    fatal = err instanceof Error ? err.message : String(err);
    report.errors.push({ contactId: '', error: fatal });
  }
  report.finishedAt = new Date().toISOString();
  report.requests = requestStats.requests - startRequests;

  if (!dryRun) {
    const [{ threads }] = await sql<{ threads: number }[]>`
      select count(*)::int as threads from leads where custom ? 'lemlist_thread_total' and deleted_at is null`;
    await saveCursor(
      'threads',
      {
        last_run: report,
        threads_in_crm: threads,
        mismatches: report.mismatches,
      },
      fatal ?? (report.errors.length ? `${report.errors.length} contact(s) failed, first: ${report.errors[0].error}` : null),
    );
  }
  return report;
}

/** What /settings/integrations shows. */
export async function lemlistStatus() {
  const rows = await sql<{ stream: string; cursor: Record<string, unknown>; last_success_at: Date | null; last_error: string | null; last_error_at: Date | null; updated_at: Date }[]>`
    select stream, cursor, last_success_at, last_error, last_error_at, updated_at
      from sync_cursors where connector = ${CONNECTOR} and account = ${ACCOUNT} order by stream`;
  const [counts] = await sql<{ contacts: number; leads: number; activities: number; orgs: number }[]>`
    select (select count(*)::int from external_ids where system = 'lemlist_contact') as contacts,
           (select count(*)::int from leads where source = 'lemlist' and deleted_at is null) as leads,
           (select count(*)::int from activities where source = 'lemlist' and deleted_at is null) as activities,
           (select count(*)::int from organizations where source = 'lemlist' and deleted_at is null) as orgs`;
  return { streams: rows, counts };
}
