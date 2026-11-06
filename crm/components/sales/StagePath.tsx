'use client';
/**
 * The clickable stage path of the Deal design, with the gate panel inline under
 * it: required fields of the target stage (current values filled in), a reason
 * when moving back, and what automation will do on Won. Leads use the same path;
 * Qualified opens the qualify dialog and Disqualified the disqualify dialog.
 *
 *   <StagePath objectType="deal" recordId={deal.id} currentStageId={deal.stage_id} stages={pathStages} users={users} />
 */
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { RequiredField } from '@/lib/stages';
import { moveStageAction } from '@/app/(app)/pipelines/actions';
import { GateForm } from './GateDialog';
import { DisqualifyDialog, QualifyDialog, type FirstStage, type QualifyLead } from './LeadDialogs';
import type { GateUser } from './GateFields';
import styles from './sales.module.css';

export type PathStage = {
  id: string;
  name: string;
  state: 'open' | 'won' | 'lost' | 'closed';
  position: number;
  sub: string;
  fields: RequiredField[];
  needsReason: boolean;
  effects: string[];
};

export function StagePath({
  objectType,
  recordId,
  currentStageId,
  stages,
  users,
  canEdit,
  lead,
  firstSalesStage,
}: {
  objectType: 'deal' | 'lead';
  recordId: string;
  currentStageId: string;
  stages: PathStage[];
  users: GateUser[];
  canEdit: boolean;
  lead?: QualifyLead & { converted: boolean };
  firstSalesStage?: FirstStage | null;
}) {
  const router = useRouter();
  const [target, setTarget] = useState<string | null>(null);
  const [dialog, setDialog] = useState<'qualify' | 'disqualify' | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const current = stages.find((s) => s.id === currentStageId);
  const curPos = current?.position ?? -1;
  const t = stages.find((s) => s.id === target) ?? null;

  const pick = (s: PathStage) => {
    if (!canEdit || s.id === currentStageId) return;
    setNotice(null);
    if (objectType === 'lead' && s.state === 'won') {
      if (lead?.converted) {
        setNotice('This lead is already qualified, its deal is linked on the right.');
        return;
      }
      setDialog('qualify');
      return;
    }
    if (objectType === 'lead' && s.state === 'lost') {
      setDialog('disqualify');
      return;
    }
    setTarget(s.id);
  };

  return (
    <div className={styles.pathWrap}>
      <ol aria-label="Stages" className={styles.path}>
        {stages.map((s) => {
          const isCur = s.id === currentStageId;
          const passed = !isCur && s.state === 'open' && s.position < curPos && current?.state === 'open';
          const cls = [
            styles.step,
            passed ? styles.stepPassed : '',
            isCur ? styles.stepCurrent : '',
            isCur && s.state === 'won' ? styles.stepWon : '',
            isCur && s.state === 'lost' ? styles.stepLost : '',
            target === s.id ? styles.stepTarget : '',
          ].join(' ');
          return (
            <li key={s.id} className={styles.pathItem}>
              <button
                type="button"
                className={cls}
                aria-current={isCur ? 'step' : undefined}
                aria-pressed={target === s.id ? true : undefined}
                disabled={!canEdit && !isCur}
                onClick={() => pick(s)}
              >
                <span className={styles.stepName}>{s.name}</span>
                <span className={styles.stepSub}>
                  {s.sub}
                  {passed ? ' · done' : ''}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
      {notice ? <div className="form-note">{notice}</div> : null}
      {t ? (
        <GateForm
          key={t.id}
          title={t.needsReason ? `Move back to ${t.name}?` : t.fields.length ? `To enter ${t.name}, fill these in` : `Move to ${t.name}?`}
          hint={t.needsReason ? 'Moving back is allowed and gets logged with your reason' : 'Required fields are set per stage in Settings'}
          fields={t.needsReason && current?.state === 'open' ? [] : t.fields}
          missing={[]}
          needsReason={t.needsReason}
          effects={t.effects}
          effectsLead={t.state === 'won' ? 'On save, the automations do this' : undefined}
          cta={t.state === 'lost' ? 'Mark as lost' : t.state === 'won' ? 'Mark as won' : `Move to ${t.name}`}
          ctaVariant={t.state === 'lost' ? 'danger' : 'accent'}
          users={users}
          onCancel={() => setTarget(null)}
          onSubmit={(values, reason) => moveStageAction({ objectType, recordId, toStageId: t.id, values, reason, source: 'record' })}
          onDone={() => {
            setTarget(null);
            router.refresh();
          }}
        />
      ) : null}
      {objectType === 'lead' && lead ? (
        <>
          <QualifyDialog
            open={dialog === 'qualify'}
            lead={lead}
            firstStage={firstSalesStage ?? null}
            users={users}
            onClose={() => setDialog(null)}
            onDone={(res) => {
              setNotice(res.ok ? res.message ?? 'Qualified' : null);
              if (res.ok && res.href) router.push(res.href);
              else router.refresh();
            }}
          />
          <DisqualifyDialog
            open={dialog === 'disqualify'}
            lead={{ id: lead.id, title: lead.title }}
            onClose={() => setDialog(null)}
            onDone={(res) => {
              setNotice(res.ok ? res.message ?? 'Disqualified' : null);
              router.refresh();
            }}
          />
        </>
      ) : null}
    </div>
  );
}
