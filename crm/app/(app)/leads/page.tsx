/**
 * /leads, every lead with filters (stage, research status, disqualify reason,
 * owner, source, search), sortable columns and CSV export. ?dates=1 adds an
 * "Entered <stage>" column per stage. ?new=1 opens the create form.
 */
import Link from 'next/link';
import { requireUser } from '@/lib/auth';
import { can } from '@/lib/permissions';
import { formatDate, formatDateTime, formatDays, formatMoney } from '@/lib/format';
import { RESEARCH_STATUSES, RESEARCH_TONES, labelOf, toneOf } from '@/lib/options';
import { listReasons } from '@/lib/reasons';
import { stageColumns, stageDatesFor } from '@/lib/sales/stage-times';
import { leadFilterOptions, listLeads, listUsers, openStagesOf, type LeadListRow } from '@/lib/sales/queries';
import { Avatar, Badge, Button, ButtonLink, EmptyState, Field, Input, PageHeader, Select, Table, sortHrefFor } from '@/components/ui';
import { CreateLeadDialog } from '@/components/sales/CreateForms';
import styles from '@/components/sales/sales.module.css';

export const dynamic = 'force-dynamic';

type SP = Record<string, string | string[] | undefined>;
const one = (v: string | string[] | undefined) => (typeof v === 'string' && v ? v : undefined);

export default async function LeadsPage({ searchParams }: { searchParams: Promise<SP> }) {
  const user = await requireUser();
  const sp = await searchParams;
  const f = {
    stage: one(sp.stage),
    research: one(sp.research),
    reason: one(sp.reason),
    owner: one(sp.owner),
    source: one(sp.source),
    q: one(sp.q),
    state: one(sp.state) ?? (one(sp.stage) || one(sp.reason) ? 'all' : 'open'),
    sort: one(sp.sort) ?? 'accepted',
    dir: one(sp.dir) ?? 'desc',
  };
  const showDates = one(sp.dates) === '1';
  const [{ rows, total }, opts, users, reasons, stageCols] = await Promise.all([
    listLeads(f),
    leadFilterOptions(),
    listUsers(),
    listReasons('lead_disqualify', { includeArchived: true }),
    showDates ? stageColumns('lead') : Promise.resolve([]),
  ]);
  const dates = showDates ? await stageDatesFor('lead', rows.map((r) => r.id)) : new Map();
  const canExport = can(user, 'export', 'lead');
  const { new: _new, ...rest } = sp;
  const qs = new URLSearchParams(Object.entries(rest).flatMap(([k, v]) => (typeof v === 'string' ? [[k, v]] : []))).toString();
  const closeHref = `/leads${qs ? `?${qs}` : ''}`;
  const datesParams = new URLSearchParams(qs);
  if (showDates) datesParams.delete('dates');
  else datesParams.set('dates', '1');
  const datesHref = `/leads${datesParams.toString() ? `?${datesParams.toString()}` : ''}`;

  return (
    <div className="page page-wide">
      <PageHeader
        title="Leads"
        subtitle={`${total} ${total === 1 ? 'lead' : 'leads'}${total >= 500 ? ', showing the first 500' : ''}. From LinkedIn accept to a qualified deal.`}
        actions={
          <>
            <ButtonLink href="/pipelines?p=lead">Board</ButtonLink>
            <ButtonLink href={datesHref}>
              {showDates ? 'Hide stage dates' : 'Show stage dates'}
            </ButtonLink>
            {canExport ? <ButtonLink href={`/leads/export${qs ? `?${qs}` : ''}`}>Export CSV</ButtonLink> : null}
            {can(user, 'create', 'lead') ? (
              <ButtonLink href={`/leads?${new URLSearchParams({ ...Object.fromEntries(new URLSearchParams(qs)), new: '1' }).toString()}`} variant="primary">
                New lead
              </ButtonLink>
            ) : null}
          </>
        }
      />

      <form method="get" action="/leads" className={styles.filters} aria-label="Filter leads">
        <Field label="Search" htmlFor="lf-q">
          <Input id="lf-q" name="q" type="search" defaultValue={f.q} placeholder="Name, organization, campaign" />
        </Field>
        <Field label="Stage" htmlFor="lf-stage">
          <Select id="lf-stage" name="stage" options={opts.stages.map((s) => ({ value: s.id, label: s.name }))} placeholder="Any stage" defaultValue={f.stage ?? ''} />
        </Field>
        <Field label="Open or closed" htmlFor="lf-state">
          <Select
            id="lf-state"
            name="state"
            options={[
              { value: 'open', label: 'Open leads' },
              { value: 'closed', label: 'Qualified or disqualified' },
              { value: 'all', label: 'All leads' },
            ]}
            defaultValue={f.state}
          />
        </Field>
        <Field label="Research" htmlFor="lf-research">
          <Select id="lf-research" name="research" options={RESEARCH_STATUSES} placeholder="Any status" defaultValue={f.research ?? ''} />
        </Field>
        <Field label="Disqualify reason" htmlFor="lf-reason">
          <Select
            id="lf-reason"
            name="reason"
            options={[...reasons.map((r) => ({ value: r.key, label: r.is_archived ? `${r.label}, archived` : r.label })), { value: 'none', label: 'No reason recorded' }]}
            placeholder="Any reason"
            defaultValue={f.reason ?? ''}
          />
        </Field>
        <Field label="Owner" htmlFor="lf-owner">
          <Select
            id="lf-owner"
            name="owner"
            options={[...users.map((u) => ({ value: u.id, label: u.name })), { value: 'none', label: 'Unassigned' }]}
            placeholder="Anyone"
            defaultValue={f.owner ?? ''}
          />
        </Field>
        <Field label="Source" htmlFor="lf-source">
          <Select id="lf-source" name="source" options={opts.sources.map((s) => ({ value: s, label: s }))} placeholder="Any source" defaultValue={f.source ?? ''} />
        </Field>
        <input type="hidden" name="sort" value={f.sort} />
        <input type="hidden" name="dir" value={f.dir} />
        {showDates ? <input type="hidden" name="dates" value="1" /> : null}
        <div className="row" style={{ gap: 8 }}>
          <Button type="submit" variant="primary">
            Apply
          </Button>
          <ButtonLink href="/leads" variant="ghost">
            Clear
          </ButtonLink>
        </div>
      </form>

      <Table<LeadListRow>
        caption="Leads"
        minWidth={showDates ? 1100 + stageCols.length * 130 : 1100}
        rows={rows}
        rowKey={(r) => r.id}
        sort={{ key: f.sort, dir: f.dir === 'asc' ? 'asc' : 'desc' }}
        sortHref={sortHrefFor('/leads', rest)}
        rowClassName={(r) => (r.stage_state !== 'open' ? 'is-muted' : undefined)}
        empty={
          <div className="card">
            <EmptyState title="No leads match" body="Clear the filters, or add a lead with New lead." />
          </div>
        }
        columns={[
          {
            key: 'name',
            label: 'Lead',
            sortable: true,
            render: (r) => (
              <div className="stack-sm" style={{ gap: 2 }}>
                <Link className="cell-link" href={`/leads/${r.id}`}>
                  {r.title}
                </Link>
                {r.job_title ? <span className="small muted">{r.job_title}</span> : null}
              </div>
            ),
          },
          {
            key: 'organization',
            label: 'Organization',
            sortable: true,
            render: (r) => (r.organization_id ? <Link href={`/organizations/${r.organization_id}`}>{r.org_name}</Link> : <span className="muted">None</span>),
          },
          {
            key: 'stage',
            label: 'Stage',
            sortable: true,
            render: (r) => (
              <div className="stack-sm" style={{ gap: 2 }}>
                <span>{r.stage_name}</span>
                {r.is_rotting ? <span className="small danger">Stalled</span> : null}
              </div>
            ),
          },
          {
            key: 'research',
            label: 'Research',
            sortable: true,
            render: (r) => <Badge tone={toneOf(RESEARCH_TONES, r.research_status)}>{labelOf(RESEARCH_STATUSES, r.research_status)}</Badge>,
          },
          {
            key: 'owner',
            label: 'Owner',
            sortable: true,
            render: (r) =>
              r.owner_name ? (
                <span className={styles.ownerCell}>
                  <Avatar name={r.owner_name} initials={r.owner_initials} bg={r.owner_bg} fg="#15171A" size="xs" />
                  {r.owner_name.split(' ')[0]}
                </span>
              ) : (
                <span className="muted">Unassigned</span>
              ),
          },
          { key: 'source', label: 'Source', sortable: true, render: (r) => [r.source, r.campaign].filter(Boolean).join(', ') },
          { key: 'accepted', label: 'Accepted', sortable: true, render: (r) => (r.linkedin_accepted_at ? formatDate(r.linkedin_accepted_at) : '') },
          { key: 'days', label: 'In stage', sortable: true, num: true, render: (r) => formatDays(r.days_in_stage) },
          { key: 'worth', label: 'Worth', sortable: true, num: true, render: (r) => formatMoney(r.angle_worth_eur) },
          {
            key: 'reason',
            label: 'Disqualify reason',
            sortable: true,
            render: (r) =>
              r.stage_state === 'lost' ? (
                <div className="stack-sm" style={{ gap: 2 }}>
                  <span>{r.disqualify_reason_label ?? (r.disqualify_reason ? r.disqualify_reason : <span className="muted">Not recorded</span>)}</span>
                  {r.disqualify_note ? <span className="small muted">{r.disqualify_note.length > 80 ? `${r.disqualify_note.slice(0, 80)}...` : r.disqualify_note}</span> : null}
                </div>
              ) : null,
          },
          ...stageCols.map((c) => ({
            key: `entered_${c.id}`,
            label: `Entered ${c.label}`,
            render: (r: LeadListRow) => {
              const d = dates.get(r.id)?.get(c.id)?.entered;
              return d ? <span className="nowrap">{formatDateTime(d)}</span> : <span className="muted">None</span>;
            },
          })),
        ]}
      />

      <CreateLeadDialog
        key={sp.new === '1' ? 'open' : 'closed'}
        open={sp.new === '1' && can(user, 'create', 'lead')}
        closeHref={closeHref}
        stages={await openStagesOf('lead')}
        users={users.map((u) => ({ id: u.id, name: u.name }))}
        currentUserId={user.id}
      />
    </div>
  );
}

