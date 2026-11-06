import Link from 'next/link';
import { sql } from '@/lib/db';
import { formatDate, formatDateTime } from '@/lib/format';
import { listImportJobs } from '@/lib/data/import';
import { IMPORT_OBJECTS, type CustomTargetDef, type ImportObject } from '@/lib/data/import-fields';
import { PanelHeader } from '@/components/settings/PanelHeader';
import { ImportWizard } from '@/components/settings/ImportWizard';
import { ActionButton } from '@/components/settings/ActionButton';
import { ButtonLink } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { revertImportAction } from './actions';
import s from '@/components/settings/settings.module.css';

export const metadata = { title: 'Import and export, Settings' };

const ENTITY: Record<ImportObject, string> = { contacts: 'contact', organizations: 'organization', deals: 'deal' };

export default async function ImportPage() {
  const [jobs, defs] = await Promise.all([
    listImportJobs(sql),
    sql<(CustomTargetDef & { object_type: string })[]>`
      select object_type, internal_name, label, field_type from field_definitions
       where archived_at is null and object_type in ('contact', 'organization', 'deal') order by position`,
  ]);
  const customDefs = Object.fromEntries(
    (Object.keys(ENTITY) as ImportObject[]).map((o) => [o, defs.filter((d) => d.object_type === ENTITY[o]).map(({ internal_name, label, field_type }) => ({ internal_name, label, field_type }))]),
  ) as Record<ImportObject, CustomTargetDef[]>;

  return (
    <>
      <PanelHeader
        title="Import and export"
        sub="Map columns, preview what changes, import. Any import can be reverted."
        actions={<ButtonLink href="/settings/export" variant="secondary">Export CSV</ButtonLink>}
      />
      <div className={s.split}>
        <div className={s.splitMain}>
          <ImportWizard customDefs={customDefs} />
        </div>
        <div className={`card ${s.splitSide}`}>
          <div className="card-head">
            <h3 className="card-title" style={{ fontSize: 15 }}>
              Import history
            </h3>
          </div>
          {jobs.length === 0 ? <div className={s.listRow}><span className="small muted">No imports yet.</span></div> : null}
          {jobs.map((j) => {
            const c = j.counts ?? {};
            const label = IMPORT_OBJECTS.find((o) => o.value === j.object_type)?.label ?? j.object_type;
            let meta: string;
            if (j.status === 'reverted') meta = `Reverted ${j.reverted_at ? formatDate(j.reverted_at) : ''}${j.reverted_by_name ? ` by ${j.reverted_by_name}` : ''}, every change undone`;
            else if (j.status === 'completed') meta = `${formatDate(j.created_at)}, ${j.created_by_name ?? 'system'}, ${c.created ?? 0} created, ${c.updated ?? 0} updated${c.skipped ? `, ${c.skipped} skipped` : ''}`;
            else meta = `${formatDateTime(j.created_at)}, ${j.status}`;
            return (
              <div key={j.id} className={s.listRow}>
                <div className={s.listMain}>
                  <div className={s.listTitle}>{j.file_name}</div>
                  <div className={s.listMeta}>
                    {label}. {meta}
                  </div>
                  {c.skipped && j.status !== 'reverted' ? (
                    <Link className="small" href={`/settings/import/${j.id}/errors`} prefetch={false}>
                      Download skipped rows
                    </Link>
                  ) : null}
                </div>
                {j.status === 'completed' ? (
                  <ActionButton
                    action={revertImportAction}
                    fields={{ id: j.id }}
                    confirm={`Revert ${j.file_name}? Records it created are removed and every value it changed goes back. Values people edited since are kept.`}
                    pendingText="Reverting"
                  >
                    Revert
                  </ActionButton>
                ) : j.status === 'reverted' ? (
                  <Badge tone="grey">Reverted</Badge>
                ) : null}
              </div>
            );
          })}
          <div className="card-foot">Revert removes what an import created and puts back every value it changed. Export works for every object as CSV.</div>
        </div>
      </div>
    </>
  );
}
