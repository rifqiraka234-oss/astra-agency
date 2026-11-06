/**
 * /deals, every deal with filters (open, won, lost, pipeline, stage, owner,
 * search), sortable columns, a totals row and CSV export. ?new=1 opens the
 * create form.
 */
import Link from 'next/link';
import { requireUser } from '@/lib/auth';
import { can } from '@/lib/permissions';
import { formatDate, formatDays, formatMoney } from '@/lib/format';
import { LOST_REASONS, labelOf } from '@/lib/options';
import { dealStageOptions, listDeals, listUsers, salesPipelines, stagesOf, type DealListRow } from '@/lib/sales/queries';
import { Avatar, Button, ButtonLink, EmptyState, Field, Input, PageHeader, Select, sortHrefFor } from '@/components/ui';
import { CreateDealDialog, type DealStageOption } from '@/components/sales/CreateForms';
import styles from '@/components/sales/sales.module.css';

export const dynamic = 'force-dynamic';

type SP = Record<string, string | string[] | undefined>;
const one = (v: string | string[] | undefined) => (typeof v === 'string' && v ? v : undefined);

const COLUMNS: { key: string; label: string; num?: boolean }[] = [
  { key: 'name', label: 'Deal' },
  { key: 'organization', label: 'Organization' },
  { key: 'stage', label: 'Stage' },
  { key: 'amount', label: 'Amount', num: true },
  { key: 'probability', label: 'Probability', num: true },
  { key: 'weighted', label: 'Weighted', num: true },
  { key: 'close', label: 'Close' },
  { key: 'owner', label: 'Owner' },
  { key: 'days', label: 'In stage', num: true },
];

export default async function DealsPage({ searchParams }: { searchParams: Promise<SP> }) {
  const user = await requireUser();
  const sp = await searchParams;
  const f = {
    pipeline: one(sp.pipeline),
    stage: one(sp.stage),
    state: one(sp.state) ?? 'open',
    owner: one(sp.owner),
    q: one(sp.q),
    sort: one(sp.sort) ?? 'close',
    dir: one(sp.dir) ?? 'asc',
  };
  const [{ rows, totals }, stageOpts, users, pipelines] = await Promise.all([listDeals(f), dealStageOptions(), listUsers(), salesPipelines()]);
  const canExport = can(user, 'export', 'deal');
  const canCreate = can(user, 'create', 'deal');
  const { new: _new, ...rest } = sp;
  const qs = new URLSearchParams(Object.entries(rest).flatMap(([k, v]) => (typeof v === 'string' ? [[k, v]] : []))).toString();
  const closeHref = `/deals${qs ? `?${qs}` : ''}`;
  const sortHref = sortHrefFor('/deals', rest);
  const dir = f.dir === 'desc' ? 'desc' : 'asc';

  let createStages: DealStageOption[] = [];
  if (sp.new === '1' && canCreate) {
    const dealPipes = pipelines.filter((p) => p.object_type === 'deal');
    const all = await Promise.all(dealPipes.map((p) => stagesOf(p.id)));
    createStages = all.flat().filter((s) => s.state === 'open').map((s) => ({ id: s.id, name: s.name, pipeline_key: s.pipeline_key, pipeline_name: s.pipeline_name, required: s.required }));
  }

  const money = (v: string | null, cur = 'EUR') => (v ? formatMoney(v, cur) : '');

  return (
    <div className="page page-wide">
      <PageHeader
        title="Deals"
        subtitle={`${totals.count} ${totals.count === 1 ? 'deal' : 'deals'}${totals.count >= 500 ? ', showing the first 500' : ''}. Weighted value is amount times the stage probability.`}
        actions={
          <>
            <ButtonLink href="/pipelines?p=sales">Board</ButtonLink>
            {canExport ? <ButtonLink href={`/deals/export${qs ? `?${qs}` : ''}`}>Export CSV</ButtonLink> : null}
            {canCreate ? (
              <ButtonLink href={`/deals?${new URLSearchParams({ ...Object.fromEntries(new URLSearchParams(qs)), new: '1' }).toString()}`} variant="primary">
                New deal
              </ButtonLink>
            ) : null}
          </>
        }
      />

      <form method="get" action="/deals" className={styles.filters} aria-label="Filter deals">
        <Field label="Search" htmlFor="df-q">
          <Input id="df-q" name="q" type="search" defaultValue={f.q} placeholder="Deal or organization" />
        </Field>
        <Field label="Status" htmlFor="df-state">
          <Select
            id="df-state"
            name="state"
            defaultValue={f.state}
            options={[
              { value: 'open', label: 'Open' },
              { value: 'won', label: 'Won' },
              { value: 'lost', label: 'Lost' },
              { value: 'all', label: 'All deals' },
            ]}
          />
        </Field>
        <Field label="Pipeline" htmlFor="df-pipeline">
          <Select
            id="df-pipeline"
            name="pipeline"
            options={pipelines.filter((p) => p.object_type === 'deal').map((p) => ({ value: p.key, label: p.name }))}
            placeholder="Any pipeline"
            defaultValue={f.pipeline ?? ''}
          />
        </Field>
        <Field label="Stage" htmlFor="df-stage">
          <Select id="df-stage" name="stage" options={stageOpts.map((s) => ({ value: s.id, label: `${s.pipeline_name}, ${s.name}` }))} placeholder="Any stage" defaultValue={f.stage ?? ''} />
        </Field>
        <Field label="Owner" htmlFor="df-owner">
          <Select
            id="df-owner"
            name="owner"
            options={[...users.map((u) => ({ value: u.id, label: u.name })), { value: 'none', label: 'Unassigned' }]}
            placeholder="Anyone"
            defaultValue={f.owner ?? ''}
          />
        </Field>
        <input type="hidden" name="sort" value={f.sort} />
        <input type="hidden" name="dir" value={f.dir} />
        <div className="row" style={{ gap: 8 }}>
          <Button type="submit" variant="primary">
            Apply
          </Button>
          <ButtonLink href="/deals" variant="ghost">
            Clear
          </ButtonLink>
        </div>
      </form>

      {rows.length === 0 ? (
        <div className="card">
          <EmptyState title="No deals match" body="Clear the filters, qualify a lead, or add a deal with New deal." />
        </div>
      ) : (
        <div className="table-wrap">
          <table className="table" style={{ minWidth: 1040 }}>
            <caption className="sr-only">Deals</caption>
            <thead>
              <tr>
                {COLUMNS.map((c) => {
                  const active = f.sort === c.key;
                  const next = active && dir === 'asc' ? 'desc' : 'asc';
                  return (
                    <th key={c.key} scope="col" className={c.num ? 'num' : undefined} aria-sort={active ? (dir === 'asc' ? 'ascending' : 'descending') : undefined}>
                      <Link className="sort-link" href={sortHref(c.key, next)} aria-current={active ? 'true' : undefined}>
                        {c.label}
                        <span aria-hidden="true">{active ? (dir === 'asc' ? '↑' : '↓') : ''}</span>
                      </Link>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {rows.map((r: DealListRow) => (
                <tr key={r.id} className={r.stage_state !== 'open' ? 'is-muted' : undefined}>
                  <td>
                    <div className="stack-sm" style={{ gap: 2 }}>
                      <Link className="cell-link" href={`/deals/${r.id}`}>
                        {r.name}
                      </Link>
                      {r.next_step ? <span className="small muted">{r.next_step}</span> : r.stage_state === 'open' && !r.has_open_task ? <span className="small danger">No next task</span> : null}
                    </div>
                  </td>
                  <td>{r.organization_id ? <Link href={`/organizations/${r.organization_id}`}>{r.org_name}</Link> : <span className="muted">None</span>}</td>
                  <td>
                    <div className="stack-sm" style={{ gap: 2 }}>
                      <span>{r.stage_name}</span>
                      {pipelines.filter((p) => p.object_type === 'deal').length > 1 ? <span className="small muted">{r.pipeline_name}</span> : null}
                      {r.stage_state === 'lost' && r.lost_reason ? <span className="small muted">{labelOf(LOST_REASONS, r.lost_reason)}</span> : null}
                      {r.is_rotting ? <span className="small danger">Rotting</span> : null}
                    </div>
                  </td>
                  <td className="num">{money(r.amount, r.currency)}</td>
                  <td className="num">{r.probability}%</td>
                  <td className="num">{money(r.weighted_amount, r.currency)}</td>
                  <td>{r.close_date ? formatDate(r.close_date) : ''}</td>
                  <td>
                    {r.owner_name ? (
                      <span className={styles.ownerCell}>
                        <Avatar name={r.owner_name} initials={r.owner_initials} bg={r.owner_bg} fg="#15171A" size="xs" />
                        {r.owner_name.split(' ')[0]}
                      </span>
                    ) : (
                      <span className="muted">Unassigned</span>
                    )}
                  </td>
                  <td className="num">{formatDays(r.days_in_stage)}</td>
                </tr>
              ))}
              <tr className={styles.totalsRow}>
                <td colSpan={3}>
                  Total, {totals.count} {totals.count === 1 ? 'deal' : 'deals'}
                </td>
                <td className="num">{formatMoney(totals.amount)}</td>
                <td />
                <td className="num">{formatMoney(totals.weighted, 'EUR', 0)}</td>
                <td colSpan={3} />
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {canCreate ? (
        <CreateDealDialog
          key={sp.new === '1' ? 'open' : 'closed'}
          open={sp.new === '1'}
          closeHref={closeHref}
          stages={createStages}
          users={users.map((u) => ({ id: u.id, name: u.name }))}
          currentUserId={user.id}
          defaultPipeline={f.pipeline ?? one(sp.pipeline)}
        />
      ) : null}
    </div>
  );
}
