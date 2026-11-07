/**
 * /pipelines, the board (Pipeline design). ?p=<pipeline key> picks the
 * pipeline (lead, sales, existing), ?owner=<user id> filters the cards.
 */
import { requireUser } from '@/lib/auth';
import { can } from '@/lib/permissions';
import { boardData, listUsers, salesPipelines, stagesOf } from '@/lib/sales/queries';
import { listReasons, reasonSelectOptions } from '@/lib/reasons';
import { ButtonLink, EmptyState, PageHeader, Segmented } from '@/components/ui';
import { Board } from '@/components/sales/Board';
import styles from '@/components/sales/sales.module.css';

export const dynamic = 'force-dynamic';

const SUBTITLES: Record<string, string> = {
  lead: 'From LinkedIn accept to a qualified deal. Synced from lemlist, every thread pulled per contact.',
  sales: 'New business. Stage sets the probability, every move is logged with its date.',
  existing: 'Upsell, renewal and expansion for customers. Stage sets the probability.',
};

export default async function PipelinesPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const user = await requireUser();
  const sp = await searchParams;
  const p = typeof sp.p === 'string' ? sp.p : 'sales';
  const owner = typeof sp.owner === 'string' ? sp.owner : 'all';
  const [data, pipelines, users] = await Promise.all([boardData({ pipelineKey: p, owner }), salesPipelines(), listUsers()]);
  if (!data) {
    return (
      <div className="page">
        <PageHeader title="Pipelines" />
        <EmptyState title="No pipelines yet" body="Add a lead or deal pipeline in Settings." />
      </div>
    );
  }
  const salesPipe = pipelines.find((x) => x.key === 'sales') ?? pipelines.find((x) => x.object_type === 'deal');
  const firstSales = data.objectType === 'lead' && salesPipe ? (await stagesOf(salesPipe.id)).find((s) => s.state === 'open') ?? null : null;
  const disqualifyReasons = data.objectType === 'lead' ? reasonSelectOptions(await listReasons('lead_disqualify')) : [];
  const key = data.pipeline.key;
  const ownerHref = (o: string) => `/pipelines?p=${key}${o === 'all' ? '' : `&owner=${o}`}`;
  const canEdit = can(user, 'edit', data.objectType);

  return (
    <div className="page page-wide">
      <PageHeader
        title={data.pipeline.name}
        subtitle={SUBTITLES[key] ?? (data.objectType === 'lead' ? 'Leads by stage' : 'Deals by stage. Stage sets the probability.')}
        actions={
          <div className={styles.toolbar}>
            <Segmented
              label="Pipeline"
              value={key}
              items={pipelines.map((x) => ({ value: x.key, label: x.name, href: `/pipelines?p=${x.key}${owner !== 'all' ? `&owner=${owner}` : ''}` }))}
            />
            <Segmented
              label="Owner"
              value={owner}
              items={[{ value: 'all', label: 'Everyone', href: ownerHref('all') }, ...users.map((u) => ({ value: u.id, label: u.first_name, href: ownerHref(u.id) }))]}
            />
            <ButtonLink href={data.objectType === 'lead' ? '/leads?new=1' : `/deals?new=1&pipeline=${key}`} variant="primary">
              {data.objectType === 'lead' ? 'New lead' : 'New deal'}
            </ButtonLink>
          </div>
        }
      />
      <div className={styles.totals}>
        {data.totals.map((m) => (
          <div key={m.label} className={styles.total}>
            <div className={styles.totalLabel}>{m.label}</div>
            <div className={[styles.totalValue, m.mono ? 'mono' : ''].join(' ')}>{m.value}</div>
          </div>
        ))}
      </div>
      <Board
        data={{ objectType: data.objectType, columns: data.columns, closedStages: data.closedStages, cards: data.cards, closed: data.closed }}
        users={users.map((u) => ({ id: u.id, name: u.name }))}
        firstSalesStage={firstSales ? { name: firstSales.name, required: firstSales.required } : null}
        canEdit={canEdit}
        disqualifyReasons={disqualifyReasons}
      />
    </div>
  );
}
