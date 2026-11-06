import Link from 'next/link';
import { sql } from '@/lib/db';
import { formatDateTime } from '@/lib/format';
import { auditDiff, auditPage, auditTables } from '@/lib/settings/audit';
import { recordHref, type RecordType } from '@/lib/routes';
import { PanelHeader } from '@/components/settings/PanelHeader';
import { Badge } from '@/components/ui/Badge';
import { Button, ButtonLink } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import s from '@/components/settings/settings.module.css';

export const metadata = { title: 'Audit log, Settings' };

const RECORD_TABLES: Record<string, RecordType> = {
  organizations: 'organization',
  contacts: 'contact',
  leads: 'lead',
  deals: 'deal',
  projects: 'project',
  tickets: 'ticket',
  invoices: 'invoice',
  tasks: 'task',
};

const ACTION_TONE = { insert: 'green', update: 'blue', delete: 'red' } as const;
const ACTION_LABEL = { insert: 'Created', update: 'Changed', delete: 'Deleted' } as const;

function show(v: unknown): string {
  if (v === null || v === undefined || v === '') return '';
  const text = typeof v === 'string' ? v : JSON.stringify(v);
  return text.length > 300 ? `${text.slice(0, 300)}...` : text;
}

type SP = { table?: string; record?: string; user?: string; action?: string; source?: string; before?: string };

export default async function AuditPage({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const clean = (v?: string) => (v && v.trim() ? v.trim() : null);
  const filters = {
    table: clean(sp.table),
    recordId: clean(sp.record),
    actorUserId: clean(sp.user),
    action: ['insert', 'update', 'delete'].includes(sp.action ?? '') ? sp.action! : null,
    source: clean(sp.source),
  };
  const [page, tables, users] = await Promise.all([
    auditPage(sql, { ...filters, before: clean(sp.before), limit: 50 }),
    auditTables(sql),
    sql<{ id: string; name: string }[]>`select id, name from users order by name`,
  ]);
  const qs = (extra: Record<string, string | null>) => {
    const p = new URLSearchParams();
    const all = { table: filters.table, record: filters.recordId, user: filters.actorUserId, action: filters.action, source: filters.source, ...extra };
    for (const [k, v] of Object.entries(all)) if (v) p.set(k, v);
    const q = p.toString();
    return q ? `/settings/audit?${q}` : '/settings/audit';
  };

  return (
    <>
      <PanelHeader title="Audit log" sub="Every write to a record is logged by the database with who made it, what it was before and what it became. Nobody can edit or delete these rows." />

      <form method="get" action="/settings/audit" className="card card-pad">
        <div className="form-grid" style={{ alignItems: 'flex-end' }}>
          <div className="field">
            <label className="field-label" htmlFor="a-table">
              Table
            </label>
            <Select id="a-table" name="table" defaultValue={filters.table ?? ''} placeholder="All tables" options={tables.map((t) => ({ value: t, label: t }))} />
          </div>
          <div className="field">
            <label className="field-label" htmlFor="a-record">
              Record id
            </label>
            <input id="a-record" name="record" className="input mono" defaultValue={filters.recordId ?? ''} placeholder="Paste a record id" autoComplete="off" />
          </div>
          <div className="field">
            <label className="field-label" htmlFor="a-user">
              Who
            </label>
            <Select id="a-user" name="user" defaultValue={filters.actorUserId ?? ''} placeholder="Anyone" options={users.map((u) => ({ value: u.id, label: u.name }))} />
          </div>
          <div className="field">
            <label className="field-label" htmlFor="a-action">
              Change
            </label>
            <Select
              id="a-action"
              name="action"
              defaultValue={filters.action ?? ''}
              placeholder="Any change"
              options={[
                { value: 'insert', label: 'Created' },
                { value: 'update', label: 'Changed' },
                { value: 'delete', label: 'Deleted' },
              ]}
            />
          </div>
          <div className="row" style={{ flex: '0 0 auto' }}>
            <Button type="submit" variant="primary">
              Filter
            </Button>
            <ButtonLink href="/settings/audit" variant="ghost">
              Clear
            </ButtonLink>
          </div>
        </div>
      </form>

      <div className="card">
        {page.rows.length === 0 ? (
          <div className={s.listRow}>
            <span className="small muted">No changes match these filters.</span>
          </div>
        ) : null}
        {page.rows.map((e) => {
          const diff = auditDiff(e);
          const type = RECORD_TABLES[e.table_name];
          const recordLink = type && e.record_id && e.action !== 'delete' ? recordHref(type, e.record_id) : null;
          const who = e.actor_name ?? (e.actor_source ? `System, ${e.actor_source}` : 'System');
          return (
            <div key={e.id} className={s.listRow} style={{ alignItems: 'flex-start' }}>
              <div className={s.listMain} style={{ flexBasis: '100%' }}>
                <div className="row" style={{ gap: 8 }}>
                  <Badge tone={ACTION_TONE[e.action]}>{ACTION_LABEL[e.action]}</Badge>
                  <Link href={qs({ table: e.table_name, before: null })} className="strong" style={{ color: 'var(--ink)' }}>
                    {e.table_name}
                  </Link>
                  {e.record_id ? (
                    <Link href={qs({ record: e.record_id, before: null })} className={s.key} title="Show every change to this record">
                      {e.record_id.length > 12 ? `${e.record_id.slice(0, 8)}` : e.record_id}
                    </Link>
                  ) : null}
                  {recordLink ? (
                    <Link href={recordLink} className="small">
                      Open record
                    </Link>
                  ) : null}
                </div>
                <div className={s.listMeta} style={{ marginTop: 2 }}>
                  {formatDateTime(e.occurred_at)}, {who}
                  {e.actor_name && e.actor_source && e.actor_source !== 'ui' ? `, through ${e.actor_source}` : ''}
                </div>
                {diff.length ? (
                  <div className={s.diff} style={{ marginTop: 8 }}>
                    <span className={s.diffHead}>Field</span>
                    <span className={s.diffHead}>Before</span>
                    <span className={s.diffHead}>After</span>
                    {diff.slice(0, 30).map((d) => (
                      <div key={d.field} style={{ display: 'contents' }}>
                        <span className={s.diffKey}>{d.field}</span>
                        <span className={show(d.old) ? s.diffOld : s.diffEmpty}>{show(d.old) || (e.action === 'insert' ? '' : 'empty')}</span>
                        <span className={show(d.new) ? s.diffNew : s.diffEmpty}>{show(d.new) || (e.action === 'delete' ? '' : 'empty')}</span>
                      </div>
                    ))}
                  </div>
                ) : null}
                {diff.length > 30 ? <div className="small muted">{diff.length - 30} more fields not shown</div> : null}
              </div>
            </div>
          );
        })}
      </div>

      <div className="row-between">
        {sp.before ? <ButtonLink href={qs({ before: null })} variant="secondary" size="sm">Newest</ButtonLink> : <span />}
        {page.nextBefore ? (
          <ButtonLink href={qs({ before: page.nextBefore })} variant="secondary" size="sm">
            Older
          </ButtonLink>
        ) : null}
      </div>
    </>
  );
}
