import { exportCounts, EXPORT_OBJECTS } from '@/lib/data/export';
import { PanelHeader } from '@/components/settings/PanelHeader';
import { ButtonLink } from '@/components/ui/Button';
import s from '@/components/settings/settings.module.css';

export const metadata = { title: 'Export, Settings' };

export default async function ExportPage() {
  const counts = await exportCounts();
  return (
    <>
      <PanelHeader
        title="Export"
        sub="Download any object as CSV, custom fields included. Every file has a CRM id column, so an edited copy can go back in through Import to update records."
        actions={<ButtonLink href="/settings/import" variant="secondary">Back to import</ButtonLink>}
      />
      <div className="card">
        {EXPORT_OBJECTS.map((o) => (
          <div key={o.value} className={s.listRow}>
            <div className={s.listMain}>
              <div className={s.listTitle}>{o.label}</div>
              <div className={s.listMeta}>
                <span className="mono">{counts[o.value]}</span> {counts[o.value] === 1 ? 'record' : 'records'}, deleted ones left out
              </div>
            </div>
            <a className="btn btn-secondary btn-sm" href={`/settings/export/${o.value}`} download>
              Download CSV
            </a>
          </div>
        ))}
        <div className="card-foot">Exports hold real lead data. Keep the files out of shared folders and never commit them. Each download is written to the audit log.</div>
      </div>
    </>
  );
}
