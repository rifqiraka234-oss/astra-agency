import Link from 'next/link';
import { sql } from '@/lib/db';
import { formatPercent } from '@/lib/format';
import type { FieldType } from '@/lib/fields';
import { gateCandidates } from '@/lib/settings/core-fields';
import { listAllPipelines, pipelineDetail } from '@/lib/settings/pipelines';
import { stateLabel } from '@/lib/settings/pipeline-options';
import { PanelHeader } from '@/components/settings/PanelHeader';
import { ActionButton } from '@/components/settings/ActionButton';
import { AddRequiredForm, AddStageForm, ArchiveStageButton, StageEditButton } from '@/components/settings/StageControls';
import { EmptyState } from '@/components/ui/EmptyState';
import { moveStageAction, removeRequiredAction, restoreStageAction } from './actions';
import s from '@/components/settings/settings.module.css';

export const metadata = { title: 'Pipelines, Settings' };

const OBJECT_NAMES: Record<string, string> = { lead: 'leads', deal: 'deals', project: 'projects', ticket: 'tickets' };

export default async function PipelinesSettingsPage({ searchParams }: { searchParams: Promise<{ p?: string }> }) {
  const sp = await searchParams;
  const pipelines = await listAllPipelines(sql);
  const current = pipelines.find((p) => p.key === sp.p) ?? pipelines.find((p) => p.key === 'sales') ?? pipelines[0];
  if (!current) {
    return (
      <>
        <PanelHeader title="Pipelines and stages" />
        <EmptyState title="No pipelines yet" body="Run the migrations to seed the pipelines." />
      </>
    );
  }
  const detail = (await pipelineDetail(sql, current.id))!;
  const customs = await sql<{ internal_name: string; label: string; field_type: FieldType; options: { value: string; label: string }[] | null }[]>`
    select internal_name, label, field_type, options from field_definitions
     where object_type = ${current.object_type} and archived_at is null order by position`;
  const candidates = gateCandidates(current.object_type, customs);
  const live = detail.stages.filter((x) => !x.archived_at);
  const archived = detail.stages.filter((x) => x.archived_at);
  const others = (id: string) => live.filter((x) => x.id !== id).map((x) => ({ id: x.id, name: x.name }));

  return (
    <>
      <PanelHeader title="Pipelines and stages" sub="Stages set the probability. Required fields stop a move until they are filled." />

      <div role="group" aria-label="Pipeline" className={s.objects}>
        {pipelines.map((p) => (
          <Link key={p.id} href={`/settings/pipelines?p=${p.key}`} className="pill" aria-current={p.id === current.id ? 'true' : undefined} scroll={false} style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}>
            {p.name}
          </Link>
        ))}
      </div>
      {current.description ? <p className="small muted" style={{ margin: 0 }}>{current.description}. Holds {OBJECT_NAMES[current.object_type]}.</p> : null}

      <div className={`card table-wrap ${s.tableCard}`}>
        <table className={`table ${s.wide}`}>
          <thead>
            <tr>
              <th scope="col">Stage, {current.name.toLowerCase()}</th>
              <th scope="col">Probability</th>
              <th scope="col">Required to enter</th>
              <th scope="col">Rotting after</th>
              <th scope="col">Type</th>
              <th scope="col" className="num">Records</th>
              <th scope="col">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {live.map((st, i) => {
              const required = st.required.map((r) => r.field_key);
              return (
                <tr key={st.id}>
                  <td className={s.stageName}>{st.name}</td>
                  <td className="mono">{st.probability === null ? '' : formatPercent(st.probability)}</td>
                  <td>
                    <div className="stack-sm">
                      <div className={s.reqChips}>
                        {st.required.map((r) => (
                          <span key={r.id} className={s.reqChip}>
                            {r.label}
                            <ActionButton action={removeRequiredAction} fields={{ id: r.id }} size="xs" variant="ghost" label={`Stop requiring ${r.label} for ${st.name}`} showMessage={false}>
                              ×
                            </ActionButton>
                          </span>
                        ))}
                      </div>
                      <AddRequiredForm stageId={st.id} stageName={st.name} candidates={candidates.filter((c) => !required.includes(c.key))} />
                    </div>
                  </td>
                  <td>{st.rot_days ? `${st.rot_days} ${st.rot_days === 1 ? 'day' : 'days'}` : ''}</td>
                  <td>{stateLabel(st.state)}</td>
                  <td className="num">{st.records}</td>
                  <td>
                    <div className="row" style={{ flexWrap: 'nowrap', gap: 4 }}>
                      <ActionButton action={moveStageAction} fields={{ id: st.id, dir: 'up' }} size="xs" variant="ghost" label={`Move ${st.name} up`} disabled={i === 0} showMessage={false}>
                        Up
                      </ActionButton>
                      <ActionButton action={moveStageAction} fields={{ id: st.id, dir: 'down' }} size="xs" variant="ghost" label={`Move ${st.name} down`} disabled={i === live.length - 1} showMessage={false}>
                        Down
                      </ActionButton>
                      <StageEditButton stage={st} objectType={current.object_type} />
                      <ArchiveStageButton stage={st} others={others(st.id)} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {archived.length ? (
        <div className="card">
          <div className="card-head">
            <h3 className="card-title" style={{ fontSize: 15 }}>
              Archived stages
            </h3>
          </div>
          {archived.map((st) => (
            <div key={st.id} className={s.listRow}>
              <div className={s.listMain}>
                <div className={s.listTitle}>{st.name}</div>
                <div className={s.listMeta}>{stateLabel(st.state)}, hidden from the board, history kept</div>
              </div>
              <ActionButton action={restoreStageAction} fields={{ id: st.id }}>
                Restore
              </ActionButton>
            </div>
          ))}
        </div>
      ) : null}

      <AddStageForm pipelineId={current.id} objectType={current.object_type} />

      <div className="card card-pad text-13 secondary" style={{ lineHeight: 1.5 }}>
        Skipping stages is allowed, moving back needs a reason and is logged. Required fields can be core fields or custom fields of {OBJECT_NAMES[current.object_type]}, add new ones under Fields.
        {current.object_type === 'lead' || current.object_type === 'deal' ? (
          <>
            {' '}
            A lost stage always asks for a {current.object_type === 'lead' ? 'disqualify' : 'lost'} reason, the list is under <Link href="/settings/reasons">Reasons</Link>.
          </>
        ) : null}
      </div>
    </>
  );
}
