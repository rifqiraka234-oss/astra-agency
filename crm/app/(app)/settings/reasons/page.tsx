/**
 * /settings/reasons, the two managed reason lists: why a lead is disqualified and
 * why a deal is lost. Add, rename, reorder and archive. Disqualifying a lead or
 * losing a deal needs one of the active reasons, everywhere in the app.
 */
import Link from 'next/link';
import { sql } from '@/lib/db';
import { REASON_TYPE_LABELS } from '@/lib/reasons';
import { listReasonRows, REASON_TYPES, type ReasonRow } from '@/lib/settings/reasons';
import { PanelHeader } from '@/components/settings/PanelHeader';
import { ActionButton } from '@/components/settings/ActionButton';
import { AddReasonForm, RenameReasonButton } from '@/components/settings/ReasonControls';
import { Badge } from '@/components/ui/Badge';
import { archiveReasonAction, moveReasonAction } from './actions';
import s from '@/components/settings/settings.module.css';

export const metadata = { title: 'Reasons, Settings' };

const LIST_NOTES: Record<string, { item: string; records: string; href: (key: string) => string }> = {
  lead_disqualify: { item: 'Disqualify reason', records: 'leads', href: (key) => `/leads?state=closed&reason=${key}` },
  deal_lost: { item: 'Lost reason', records: 'deals', href: (key) => `/deals?state=lost&reason=${key}` },
};

export default async function ReasonsSettingsPage() {
  const rows = await listReasonRows(sql);
  return (
    <>
      <PanelHeader
        title="Reasons"
        sub="Disqualifying a lead or losing a deal needs one of these, on the board, the record page and the stage path. Renaming keeps every record on its reason. Archived reasons stay on the records that have them."
      />
      {REASON_TYPES.map((type) => (
        <ReasonList key={type} type={type} rows={rows.filter((r) => r.object_type === type)} />
      ))}
    </>
  );
}

function ReasonList({ type, rows }: { type: string; rows: ReasonRow[] }) {
  const meta = LIST_NOTES[type];
  const live = rows.filter((r) => !r.is_archived);
  const archived = rows.filter((r) => r.is_archived);
  const title = REASON_TYPE_LABELS[type as keyof typeof REASON_TYPE_LABELS];
  return (
    <section aria-label={title} className="card">
      <div className="card-head">
        <h3 className="card-title" style={{ fontSize: 15 }}>
          {title}
        </h3>
        <span className="card-sub">
          {live.length} active{archived.length ? `, ${archived.length} archived` : ''}
        </span>
      </div>
      <div className="table-wrap">
        <table className={`table ${s.wide}`}>
          <thead>
            <tr>
              <th scope="col">{meta.item}</th>
              <th scope="col" className="num">
                In use
              </th>
              <th scope="col">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {live.map((r, i) => (
              <tr key={r.id}>
                <td>
                  <div className="stack-sm" style={{ gap: 2 }}>
                    <span className="strong">{r.label}</span>
                    <span className="small muted mono">{r.key}</span>
                  </div>
                </td>
                <td className="num">
                  {r.in_use ? <Link href={meta.href(r.key)}>{r.in_use}</Link> : <span className="muted">0</span>}
                </td>
                <td>
                  <div className="row" style={{ flexWrap: 'nowrap', gap: 4, justifyContent: 'flex-end' }}>
                    <ActionButton action={moveReasonAction} fields={{ id: r.id, dir: 'up' }} size="xs" variant="ghost" label={`Move ${r.label} up`} disabled={i === 0} showMessage={false}>
                      Up
                    </ActionButton>
                    <ActionButton action={moveReasonAction} fields={{ id: r.id, dir: 'down' }} size="xs" variant="ghost" label={`Move ${r.label} down`} disabled={i === live.length - 1} showMessage={false}>
                      Down
                    </ActionButton>
                    <RenameReasonButton reason={{ id: r.id, label: r.label }} />
                    <ActionButton
                      action={archiveReasonAction}
                      fields={{ id: r.id, archived: 'true' }}
                      size="xs"
                      variant="danger"
                      label={`Archive ${r.label}`}
                      confirm={r.in_use ? `${r.in_use} ${meta.records} keep ${r.label}. It stops being offered for new ones. Archive it?` : undefined}
                      showMessage={false}
                    >
                      Archive
                    </ActionButton>
                  </div>
                </td>
              </tr>
            ))}
            {archived.map((r) => (
              <tr key={r.id} className="is-muted">
                <td>
                  <div className="stack-sm" style={{ gap: 2 }}>
                    <span>
                      {r.label} <Badge>Archived</Badge>
                    </span>
                    <span className="small muted mono">{r.key}</span>
                  </div>
                </td>
                <td className="num">{r.in_use ? <Link href={meta.href(r.key)}>{r.in_use}</Link> : <span className="muted">0</span>}</td>
                <td>
                  <div className="row" style={{ justifyContent: 'flex-end' }}>
                    <ActionButton action={archiveReasonAction} fields={{ id: r.id, archived: 'false' }} size="xs" label={`Restore ${r.label}`} showMessage={false}>
                      Restore
                    </ActionButton>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddReasonForm objectType={type} listName={meta.item} />
    </section>
  );
}
