/**
 * lib/integrations/jsonl-import.ts, the one off move of the old JSONL state
 * files into the CRM (agent E). scripts/import-jsonl.ts runs it.
 *
 *   state/silent_accepted_queue.jsonl  latest row per lemlist contactId (else leadId) wins.
 *     A lead per person in the Lead pipeline, its stage, research status and
 *     disqualify reason from lib/integrations/status-map.ts, the research text
 *     as a note, the claims list in leads.custom.claims. Rows with neither id
 *     are reported, never guessed.
 *   state/prototypes.jsonl  an artifact_sent activity on the contact and lead,
 *     auto linked to the organization's open deals.
 *   state/meetings.jsonl    a meeting activity plus a meetings row.
 *
 * Idempotent: leads carry external_ids system 'jsonl', activities source 'jsonl'
 * with a stable external id, contacts are matched on their lemlist contactId
 * (external_ids lemlist_contact, shared with the lemlist sync), then LinkedIn.
 * A lead a person has moved by hand in the CRM keeps its stage.
 */
import fs from 'node:fs';
import crypto from 'node:crypto';
import { sql, tx, type Tx } from '../db';
import { logActivity } from '../activities';
import { normDomain, normLinkedin, isFreeMail } from '../normalize';
import { mapQueueStatus, researchStatusFor, type StatusMapping } from './status-map';

type Row = Record<string, unknown>;

export type ImportOptions = { dryRun?: boolean; stateDir: string; log?: (m: string) => void };

export type ImportReport = {
  dryRun: boolean;
  queue: {
    rows: number;
    withoutId: number;
    withoutIdSamples: number[];
    people: number;
    mapping: { status: string; stage: string; researchStatus: string; disqualifyReason: string | null; closeReason: string | null; rule: string; count: number }[];
    stageCounts: Record<string, number>;
    leadsCreated: number;
    leadsUpdated: number;
    leadsKeptUserStage: number;
    contactsCreated: number;
    contactsMatched: number;
    leadsWithoutContact: number;
    organizationsCreated: number;
    notesCreated: number;
    suppressed: number;
  };
  prototypes: { rows: number; distinct: number; created: number; existing: number; unlinked: number };
  meetings: { rows: number; distinct: number; created: number; existing: number; unlinked: number };
  errors: { file: string; key: string; error: string }[];
};

class Rollback extends Error {}

function readJsonl(file: string): Row[] {
  if (!fs.existsSync(file)) return [];
  const out: Row[] = [];
  for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
    if (!line.trim()) continue;
    try {
      out.push(JSON.parse(line));
    } catch {
      /* a broken line is skipped, the counts show it */
    }
  }
  return out;
}

const s = (v: unknown): string | null => (typeof v === 'string' && v.trim() ? v.trim() : null);

/** Lenient date reader for the hand written timestamps in the state files. */
export function parseLooseDate(v: unknown): Date | null {
  const str = s(v);
  if (!str) return null;
  const direct = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(str) ? Date.parse(str) : NaN;
  if (!Number.isNaN(direct)) return new Date(direct);
  const m = str.match(/(\d{4}-\d{2}-\d{2})(?:[ T~]+~?(\d{1,2})[.:](\d{2}))?/);
  if (!m) return null;
  if (m[2]) return new Date(`${m[1]}T${m[2].padStart(2, '0')}:${m[3]}:00Z`);
  return new Date(`${m[1]}T12:00:00Z`);
}

/** 'EUR 6,000+' -> '6000.00'. */
export function parseWorth(v: unknown): string | null {
  const str = s(v);
  if (!str) return null;
  const m = str.replace(/[,\s]/g, '').match(/(\d+(?:\.\d+)?)/);
  if (!m) return null;
  return Number(m[1]).toFixed(2);
}

function hash(text: string): string {
  return crypto.createHash('sha1').update(text).digest('hex').slice(0, 12);
}

/** Latest row per person. A leadId seen with a contactId elsewhere resolves to that contactId. */
export function latestPerPerson(rows: Row[]): { latest: Map<string, Row>; withoutId: number[] } {
  const leadToContact = new Map<string, string>();
  for (const r of rows) {
    const c = s(r.contactId);
    const l = s(r.leadId);
    if (c && l) leadToContact.set(l, c);
  }
  const latest = new Map<string, Row>();
  const withoutId: number[] = [];
  rows.forEach((r, i) => {
    const c = s(r.contactId);
    const l = s(r.leadId);
    const key = c ?? (l ? leadToContact.get(l) ?? l : null);
    if (!key) {
      withoutId.push(i + 1);
      return;
    }
    // Carry forward fields a later row left out (the file is append only, later rows are often partial).
    const prev = latest.get(key);
    latest.set(key, prev ? { ...prev, ...Object.fromEntries(Object.entries(r).filter(([, v]) => v !== null && v !== undefined)), status: r.status } : r);
  });
  return { latest, withoutId };
}

type Ids = { defaultOwner: string | null; stageIds: Map<string, string>; leadPipelineId: string };

async function loadIds(): Promise<Ids> {
  const [raka] = await sql<{ id: string }[]>`select id from users where lower(email) = 'raka@astra.local'`;
  const stages = await sql<{ key: string; id: string; pipeline_id: string }[]>`
    select s.key, s.id, s.pipeline_id from pipeline_stages s join pipelines p on p.id = s.pipeline_id where p.key = 'lead'`;
  return { defaultOwner: raka?.id ?? null, stageIds: new Map(stages.map((x) => [x.key, x.id])), leadPipelineId: stages[0].pipeline_id };
}

async function findContactByLemlist(t: Tx, cid: string | null): Promise<string | null> {
  if (!cid) return null;
  const [r] = await t<{ entity_id: string }[]>`
    select entity_id from external_ids where system = 'lemlist_contact' and external_id = ${cid} and entity_type = 'contact'`;
  return r?.entity_id ?? null;
}

async function upsertOrg(t: Tx, row: Row, ids: Ids, report: ImportReport): Promise<string | null> {
  const domain = normDomain(s(row.companyDomain) ?? s(row.domain) ?? s(row.website) ?? '');
  const name = s(row.companyName);
  if (domain && !isFreeMail(domain)) {
    const [hit] = await t<{ organization_id: string }[]>`select organization_id from organization_domains where domain_normalised = ${domain}`;
    if (hit) return hit.organization_id;
    const [org] = await t<{ id: string }[]>`
      insert into organizations (name, owner_user_id, source, custom) values (${name ?? domain}, ${ids.defaultOwner}, 'import', '{"imported_from":"jsonl"}')
      returning id`;
    await t`insert into organization_domains (organization_id, domain_normalised, is_primary) values (${org.id}, ${domain}, true)`;
    report.queue.organizationsCreated++;
    return org.id;
  }
  if (!name) return null;
  const [byName] = await t<{ id: string }[]>`select id from organizations where lower(name) = lower(${name}) and deleted_at is null order by created_at limit 1`;
  if (byName) return byName.id;
  const [org] = await t<{ id: string }[]>`
    insert into organizations (name, owner_user_id, source, custom) values (${name}, ${ids.defaultOwner}, 'import', '{"imported_from":"jsonl","no_domain":true}')
    returning id`;
  report.queue.organizationsCreated++;
  return org.id;
}

async function upsertContact(t: Tx, key: string, row: Row, orgId: string | null, ids: Ids, report: ImportReport): Promise<string | null> {
  const cid = s(row.contactId);
  const linkedin = normLinkedin(s(row.linkedinUrl));
  let id = await findContactByLemlist(t, cid);
  if (!id) {
    // A person with no lemlist contactId and no LinkedIn URL: the contact of the lead an earlier run made.
    const [prev] = await t<{ contact_id: string | null }[]>`
      select l.contact_id from external_ids x join leads l on l.id = x.entity_id
       where x.system = 'jsonl' and x.external_id = ${`queue:${key}`} and x.entity_type = 'lead'`;
    id = prev?.contact_id ?? null;
  }
  if (!id && linkedin) {
    const [hit] = await t<{ id: string }[]>`select id from contacts where linkedin_url_normalised = ${linkedin} and deleted_at is null`;
    id = hit?.id ?? null;
  }
  if (id) {
    report.queue.contactsMatched++;
    await t`
      update contacts set job_title = coalesce(job_title, ${s(row.jobTitle)}), primary_org_id = coalesce(primary_org_id, ${orgId}),
             linkedin_url = coalesce(linkedin_url, ${s(row.linkedinUrl)}), linkedin_url_normalised = coalesce(linkedin_url_normalised, ${linkedin})
       where id = ${id}`;
  } else {
    const name = s(row.name);
    if (!name) return null; // never invent a person
    const [first, ...rest] = name.split(/\s+/);
    const [c] = await t<{ id: string }[]>`
      insert into contacts (first_name, last_name, job_title, linkedin_url, linkedin_url_normalised, primary_org_id, owner_user_id, source, custom)
      values (${first}, ${rest.join(' ') || null}, ${s(row.jobTitle)}, ${s(row.linkedinUrl)}, ${linkedin}, ${orgId}, ${ids.defaultOwner}, 'import',
              '{"imported_from":"jsonl"}')
      returning id`;
    id = c.id;
    report.queue.contactsCreated++;
  }
  if (cid) {
    await t`insert into external_ids (entity_type, entity_id, system, external_id) values ('contact', ${id}, 'lemlist_contact', ${cid}) on conflict do nothing`;
  }
  if (orgId) {
    const [role] = await t<{ id: string }[]>`select id from contact_org_roles where contact_id = ${id} and organization_id = ${orgId} and is_current`;
    if (!role) {
      const [primary] = await t<{ id: string }[]>`select id from contact_org_roles where contact_id = ${id} and is_primary and is_current`;
      await t`
        insert into contact_org_roles (contact_id, organization_id, title, is_primary, is_current)
        values (${id}, ${orgId}, ${s(row.jobTitle)}, ${!primary}, true)`;
    }
  }
  return id;
}

async function importQueueEntry(t: Tx, key: string, row: Row, mapped: StatusMapping, ids: Ids, report: ImportReport): Promise<void> {
  const orgId = await upsertOrg(t, row, ids, report);
  const contactId = await upsertContact(t, key, row, orgId, ids, report);
  if (!contactId) report.queue.leadsWithoutContact++;
  const cid = s(row.contactId);

  let leadId: string | null = null;
  const [byExt] = await t<{ entity_id: string }[]>`
    select entity_id from external_ids where system = 'jsonl' and external_id = ${`queue:${key}`} and entity_type = 'lead'`;
  leadId = byExt?.entity_id ?? null;
  if (!leadId) {
    const [hit] = await t<{ id: string }[]>`
      select id from leads where pipeline_id = ${ids.leadPipelineId} and deleted_at is null
         and ((${contactId}::uuid is not null and contact_id = ${contactId}) or (${cid}::text is not null and custom ->> 'lemlist_contact_id' = ${cid}))
       order by created_at desc limit 1`;
    leadId = hit?.id ?? null;
  }

  const stageId = ids.stageIds.get(mapped.stage)!;
  const research = researchStatusFor(row, mapped);
  const acceptedAt = parseLooseDate(row.acceptedAt) ?? parseLooseDate(row.acceptedDate);
  const openerAt = parseLooseDate(row.openerSentAt) ?? parseLooseDate(row.sentAt);
  const claims = Array.isArray(row.claims) ? row.claims : null;
  const custom: Record<string, unknown> = {
    imported_from: 'jsonl',
    queue_status: s(row.status),
    queue_key: key,
    lemlist_contact_id: cid,
    lemlist_lead_id: s(row.leadId),
    lemlist_campaign_id: s(row.campaignId),
    company_name: s(row.companyName),
    close_reason: mapped.closeReason,
  };
  if (claims) custom.claims = claims;
  const clean = Object.fromEntries(Object.entries(custom).filter(([, v]) => v !== null && v !== undefined));
  const now = new Date();

  if (leadId) {
    const [cur] = await t<{ stage_id: string; user_moved: boolean }[]>`
      select l.stage_id,
             exists (select 1 from stage_transitions st where st.object_type = 'lead' and st.record_id = l.id and st.actor_type in ('user', 'automation')) as user_moved
        from leads l where l.id = ${leadId}`;
    const keepStage = cur.user_moved;
    if (keepStage) report.queue.leadsKeptUserStage++;
    await t`
      update leads set
        contact_id = coalesce(contact_id, ${contactId}),
        organization_id = coalesce(organization_id, ${orgId}),
        angle = coalesce(${s(row.angle) ?? s(row.angleUsed)}, angle),
        angle_worth_eur = coalesce(${parseWorth(row.worth)}, angle_worth_eur),
        linkedin_accepted_at = coalesce(linkedin_accepted_at, ${acceptedAt}),
        opener_sent_at = coalesce(opener_sent_at, ${openerAt}),
        custom = custom || ${t.json(clean as never)}
      where id = ${leadId}`;
    if (!keepStage) {
      await t`update leads set research_status = ${research}, disqualify_reason = ${mapped.disqualifyReason} where id = ${leadId}`;
    }
    if (!keepStage && cur.stage_id !== stageId) {
      await t`
        update leads set stage_id = ${stageId},
          qualified_at = ${mapped.stage === 'qualified' ? now : null},
          disqualified_at = ${mapped.stage === 'disqualified' ? now : null}
        where id = ${leadId}`;
      await t`
        insert into stage_transitions (object_type, record_id, pipeline_id, from_stage_id, to_stage_id, actor_type, source, reason)
        values ('lead', ${leadId}, ${ids.leadPipelineId}, ${cur.stage_id}, ${stageId}, 'import', 'jsonl', ${`Queue status ${s(row.status)}`})`;
    }
    report.queue.leadsUpdated++;
  } else {
    const [l] = await t<{ id: string }[]>`
      insert into leads (name, contact_id, organization_id, pipeline_id, stage_id, owner_user_id, source, research_status,
                         disqualify_reason, angle, angle_worth_eur, linkedin_accepted_at, opener_sent_at,
                         qualified_at, disqualified_at, custom)
      values (${contactId ? null : s(row.name) ?? s(row.companyName) ?? key}, ${contactId}, ${orgId}, ${ids.leadPipelineId}, ${stageId},
              ${ids.defaultOwner}, 'import', ${research}, ${mapped.disqualifyReason}, ${s(row.angle) ?? s(row.angleUsed)},
              ${parseWorth(row.worth)}, ${acceptedAt}, ${openerAt},
              ${mapped.stage === 'qualified' ? now : null}, ${mapped.stage === 'disqualified' ? now : null},
              ${t.json(clean as never)})
      returning id`;
    leadId = l.id;
    await t`
      insert into stage_transitions (object_type, record_id, pipeline_id, to_stage_id, actor_type, source, reason)
      values ('lead', ${leadId}, ${ids.leadPipelineId}, ${stageId}, 'import', 'jsonl', ${`Queue status ${s(row.status)}`})`;
    report.queue.leadsCreated++;
  }
  await t`
    insert into external_ids (entity_type, entity_id, system, external_id, synced_at)
    values ('lead', ${leadId}, 'jsonl', ${`queue:${key}`}, now())
    on conflict do nothing`;

  if (mapped.disqualifyReason === 'do_not_contact' && contactId) {
    await t`update contacts set do_not_contact = true where id = ${contactId}`;
    const res = await t`
      insert into suppression_list (kind, value, contact_id, reason)
      values ('contact', ${contactId}, ${contactId}, ${`Queue status ${s(row.status)}`})
      on conflict do nothing returning id`;
    if (res.length) report.queue.suppressed++;
  }

  const research_text = s(row.research);
  if (research_text) {
    const res = await logActivity(
      {
        kind: 'note',
        title: `Research note, queue status ${s(row.status) ?? 'none'}`,
        body: research_text,
        occurredAt: parseLooseDate(row.updatedAt) ?? parseLooseDate(row.date) ?? parseLooseDate(row.researchedAt) ?? new Date(),
        source: 'jsonl',
        externalId: `queue:${key}:${hash(research_text)}`,
        meta: { tags: ['Imported research'], queue_status: s(row.status), claims: claims ? claims.length : 0 },
        links: [...(contactId ? [{ contactId, isPrimary: true }] : []), { leadId }, ...(orgId && !contactId ? [{ organizationId: orgId }] : [])],
      },
      t,
    );
    if (res.created) report.queue.notesCreated++;
  }
}

async function linksFor(t: Tx, cid: string | null): Promise<{ contactId: string | null; leadId: string | null }> {
  const contactId = await findContactByLemlist(t, cid);
  let leadId: string | null = null;
  if (cid) {
    const [l] = await t<{ entity_id: string }[]>`
      select entity_id from external_ids where system = 'jsonl' and external_id = ${`queue:${cid}`} and entity_type = 'lead'`;
    leadId = l?.entity_id ?? null;
  }
  if (!leadId && contactId) {
    const [l] = await t<{ id: string }[]>`select id from leads where contact_id = ${contactId} and deleted_at is null order by created_at desc limit 1`;
    leadId = l?.id ?? null;
  }
  return { contactId, leadId };
}

function prototypeKey(row: Row): string {
  return `prototype:${s(row.contactId)}:${s(row.date)}:${row.angleNumber ?? ''}:${s(row.netlifyUrl) ?? s(row.deckUrl) ?? ''}`;
}

function meetingKey(row: Row): string {
  return `meeting:${s(row.calendarEventId) ?? `${s(row.contactId)}:${s(row.meetingDateTime)}`}`;
}

/** The files are append only, a later row for the same prototype or meeting updates it. Merge, latest wins. */
export function latestBy(rows: Row[], keyOf: (r: Row) => string): Row[] {
  const m = new Map<string, Row>();
  for (const r of rows) {
    const k = keyOf(r);
    const prev = m.get(k);
    m.set(k, prev ? { ...prev, ...Object.fromEntries(Object.entries(r).filter(([, v]) => v !== null && v !== undefined)) } : r);
  }
  return [...m.values()];
}

async function importPrototype(t: Tx, row: Row, report: ImportReport): Promise<void> {
  const cid = s(row.contactId);
  const { contactId, leadId } = await linksFor(t, cid);
  if (!contactId && !leadId) {
    report.prototypes.unlinked++;
    return;
  }
  const sentAt = parseLooseDate(row.sentAt);
  const outcome = s(row.outcome);
  const url = s(row.netlifyUrl);
  const company = s(row.companyName) ?? 'the lead';
  const extId = prototypeKey(row);
  const body = [s(row.promisedConcept), url ? `Link ${url}` : null, s(row.planUrl) ? `Plan ${s(row.planUrl)}` : null, outcome ? `Outcome ${outcome.replace(/_/g, ' ')}` : null, s(row.note)]
    .filter(Boolean)
    .join('\n');
  const res = await logActivity(
    {
      kind: 'artifact_sent',
      direction: sentAt ? 'outbound' : 'internal',
      occurredAt: sentAt ?? parseLooseDate(row.date) ?? new Date(),
      title: sentAt ? `Prototype sent to ${company}` : `Prototype for ${company}, not sent`,
      body: body || null,
      source: 'jsonl',
      externalId: extId,
      meta: { tags: ['Prototype', ...(outcome ? [outcome.replace(/_/g, ' ')] : [])], outcome, url, angle_number: row.angleNumber ?? null },
      links: [...(contactId ? [{ contactId, isPrimary: true }] : []), ...(leadId ? [{ leadId }] : [])],
    },
    t,
  );
  if (res.created) report.prototypes.created++;
  else report.prototypes.existing++;
  if (leadId && outcome) {
    await t`update leads set custom = custom || ${t.json({ prototype_outcome: outcome, prototype_url: url } as never)} where id = ${leadId}`;
  }
}

async function importMeeting(t: Tx, row: Row, report: ImportReport): Promise<void> {
  const cid = s(row.contactId);
  const { contactId, leadId } = await linksFor(t, cid);
  if (!contactId && !leadId) {
    report.meetings.unlinked++;
    return;
  }
  const startsAt = parseLooseDate(row.meetingDateTime);
  const company = s(row.companyName) ?? 'the lead';
  const extId = meetingKey(row);
  const body = [s(row.angleUsed) ? `Angle ${s(row.angleUsed)}` : null, s(row.nextStep) ? `Next step ${s(row.nextStep)}` : null, s(row.note)].filter(Boolean).join('\n');
  const res = await logActivity(
    {
      kind: 'meeting',
      direction: 'internal',
      occurredAt: startsAt ?? parseLooseDate(row.date) ?? new Date(),
      title: `Meeting with ${company}`,
      body: body || null,
      source: 'jsonl',
      externalId: extId,
      meta: { tags: ['Meeting'], outcome: s(row.outcome) },
      links: [...(contactId ? [{ contactId, isPrimary: true }] : []), ...(leadId ? [{ leadId }] : [])],
    },
    t,
  );
  if (res.created) report.meetings.created++;
  else report.meetings.existing++;
  const outcome = s(row.outcome) === 'held' ? 'completed' : 'scheduled';
  await t`
    insert into meetings (activity_id, meeting_type, outcome, starts_at, location, calendar_event_id, brief_path)
    values (${res.id}, 'discovery', ${outcome}, ${startsAt}, ${s(row.meetUrl) ?? s(row.meetLink)}, ${s(row.calendarEventId)},
            ${s(row.briefFilePath)})
    on conflict (activity_id) do nothing`;
}

export async function importJsonl(opts: ImportOptions): Promise<ImportReport> {
  const dryRun = Boolean(opts.dryRun);
  const log = opts.log ?? (() => {});
  const report: ImportReport = {
    dryRun,
    queue: {
      rows: 0, withoutId: 0, withoutIdSamples: [], people: 0, mapping: [], stageCounts: {}, leadsCreated: 0, leadsUpdated: 0,
      leadsKeptUserStage: 0, contactsCreated: 0, contactsMatched: 0, leadsWithoutContact: 0, organizationsCreated: 0, notesCreated: 0, suppressed: 0,
    },
    prototypes: { rows: 0, distinct: 0, created: 0, existing: 0, unlinked: 0 },
    meetings: { rows: 0, distinct: 0, created: 0, existing: 0, unlinked: 0 },
    errors: [],
  };
  const ids = await loadIds();

  // Queue.
  const queueRows = readJsonl(`${opts.stateDir}/silent_accepted_queue.jsonl`);
  report.queue.rows = queueRows.length;
  const { latest, withoutId } = latestPerPerson(queueRows);
  report.queue.withoutId = withoutId.length;
  report.queue.withoutIdSamples = withoutId.slice(0, 20);
  report.queue.people = latest.size;
  const mapCount = new Map<string, { m: StatusMapping; count: number }>();
  for (const row of latest.values()) {
    const status = s(row.status) ?? '(none)';
    const m = mapQueueStatus(status);
    const e = mapCount.get(status) ?? { m, count: 0 };
    e.count++;
    mapCount.set(status, e);
    report.queue.stageCounts[m.stage] = (report.queue.stageCounts[m.stage] ?? 0) + 1;
  }
  report.queue.mapping = [...mapCount.entries()]
    .map(([status, { m, count }]) => ({ status, stage: m.stage, researchStatus: m.researchStatus, disqualifyReason: m.disqualifyReason, closeReason: m.closeReason, rule: m.rule, count }))
    .sort((a, b) => b.count - a.count || a.status.localeCompare(b.status));

  const runOne = async (file: string, key: string, fn: (t: Tx) => Promise<void>) => {
    try {
      await tx(
        async (t) => {
          await fn(t);
          if (dryRun) throw new Rollback();
        },
        { source: 'import' },
      );
    } catch (err) {
      if (err instanceof Rollback) return;
      report.errors.push({ file, key, error: err instanceof Error ? err.message : String(err) });
    }
  };

  // In a dry run every entry rolls back, so later files cannot see the leads. Run the
  // whole import in one rolled back transaction instead, so the counts are real.
  if (dryRun) {
    try {
      await tx(
        async (t) => {
          for (const [key, row] of latest) {
            await t.savepoint((sp) => importQueueEntry(sp as unknown as Tx, key, row, mapQueueStatus(s(row.status)), ids, report)).catch((err) =>
              report.errors.push({ file: 'queue', key, error: err instanceof Error ? err.message : String(err) }),
            );
          }
          const protosRaw = readJsonl(`${opts.stateDir}/prototypes.jsonl`);
          const protos = latestBy(protosRaw, prototypeKey);
          report.prototypes.rows = protosRaw.length;
          report.prototypes.distinct = protos.length;
          for (const row of protos) {
            await t.savepoint((sp) => importPrototype(sp as unknown as Tx, row, report)).catch((err) =>
              report.errors.push({ file: 'prototypes', key: s(row.contactId) ?? '', error: err instanceof Error ? err.message : String(err) }),
            );
          }
          const meetsRaw = readJsonl(`${opts.stateDir}/meetings.jsonl`);
          const meets = latestBy(meetsRaw, meetingKey);
          report.meetings.rows = meetsRaw.length;
          report.meetings.distinct = meets.length;
          for (const row of meets) {
            await t.savepoint((sp) => importMeeting(sp as unknown as Tx, row, report)).catch((err) =>
              report.errors.push({ file: 'meetings', key: s(row.contactId) ?? '', error: err instanceof Error ? err.message : String(err) }),
            );
          }
          throw new Rollback();
        },
        { source: 'import' },
      );
    } catch (err) {
      if (!(err instanceof Rollback)) throw err;
    }
    return report;
  }

  let n = 0;
  for (const [key, row] of latest) {
    await runOne('queue', key, (t) => importQueueEntry(t, key, row, mapQueueStatus(s(row.status)), ids, report));
    if (++n % 100 === 0) log(`  queue ${n} of ${latest.size}`);
  }
  const protosRaw = readJsonl(`${opts.stateDir}/prototypes.jsonl`);
  const protos = latestBy(protosRaw, prototypeKey);
  report.prototypes.rows = protosRaw.length;
  report.prototypes.distinct = protos.length;
  for (const row of protos) await runOne('prototypes', s(row.contactId) ?? '', (t) => importPrototype(t, row, report));
  const meetsRaw = readJsonl(`${opts.stateDir}/meetings.jsonl`);
  const meets = latestBy(meetsRaw, meetingKey);
  report.meetings.rows = meetsRaw.length;
  report.meetings.distinct = meets.length;
  for (const row of meets) await runOne('meetings', s(row.contactId) ?? '', (t) => importMeeting(t, row, report));
  return report;
}
