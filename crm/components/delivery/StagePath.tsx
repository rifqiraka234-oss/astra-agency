'use client';
/**
 * The stage path from the Deal design, for projects and tickets. Click a stage,
 * confirm in the panel underneath (moving back or reopening asks for a reason),
 * and the server action calls moveStage.
 *
 *   <StagePath
 *     label="Project stage"
 *     stages={[{ id, name: 'Kickoff', sub: '4 days' }, ...]}
 *     currentId={project.stage_id}
 *     action={moveProjectStage}               // (prev, fd) with recordId, toStageId, reason
 *     recordId={project.id}
 *     canEdit={canEdit}
 *   />
 */
import { startTransition, useActionState, useEffect, useState } from 'react';
import { initialActionState, type ActionState } from '@/lib/forms';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export type PathStage = { id: string; name: string; sub?: string; state: 'open' | 'won' | 'lost' | 'closed'; position: number; hint?: string };

type Action = (prev: ActionState, fd: FormData) => Promise<ActionState>;

export function StagePath({
  label,
  stages,
  currentId,
  action,
  recordId,
  canEdit,
}: {
  label: string;
  stages: PathStage[];
  currentId: string | null;
  action: Action;
  recordId: string;
  canEdit: boolean;
}) {
  const [target, setTarget] = useState<string | null>(null);
  const [state, formAction, pending] = useActionState(action, initialActionState);
  const [handled, setHandled] = useState<ActionState | null>(null);

  useEffect(() => {
    if (state.ok && state !== handled) {
      setHandled(state);
      setTarget(null);
    }
  }, [state, handled]);

  const current = stages.find((s) => s.id === currentId) ?? null;
  const currentIndex = current ? stages.indexOf(current) : -1;
  const to = stages.find((s) => s.id === target) ?? null;
  const reopening = Boolean(current && current.state !== 'open' && to && to.state === 'open');
  const backwards = Boolean(to && current && (reopening || (to.state === 'open' && to.position < current.position)));

  return (
    <div className="stack-sm f-stage-wrap">
      <ol aria-label={label} className="f-stage-path">
        {stages.map((s, i) => {
          const isCurrent = s.id === currentId;
          const passed = currentIndex >= 0 && i < currentIndex && current?.state === 'open';
          const cls = ['f-stage', isCurrent ? 'is-current' : '', passed ? 'is-passed' : '', target === s.id ? 'is-target' : '', isCurrent && s.state === 'closed' ? 'is-closed' : '']
            .filter(Boolean)
            .join(' ');
          return (
            <li key={s.id}>
              <button
                type="button"
                className={cls}
                aria-current={isCurrent ? 'step' : undefined}
                disabled={!canEdit || isCurrent}
                onClick={() => setTarget(s.id)}
              >
                <span className="f-stage-name">{s.name}</span>
                <span className="f-stage-sub">{isCurrent ? s.sub ?? 'Current' : passed ? 'Done' : s.hint ?? ''}</span>
              </button>
            </li>
          );
        })}
      </ol>
      {to ? (
        <form
          className="f-gate"
          role="dialog"
          aria-label={backwards ? `Move back to ${to.name}` : `Move to ${to.name}`}
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            startTransition(() => formAction(fd));
          }}
        >
          <input type="hidden" name="recordId" value={recordId} />
          <input type="hidden" name="toStageId" value={to.id} />
          <div className="row-between" style={{ gap: 8, alignItems: 'baseline' }}>
            <h2 className="f-gate-title">{backwards ? `${reopening ? 'Reopen in' : 'Move back to'} ${to.name}?` : `Move to ${to.name}?`}</h2>
            {backwards ? <span className="muted small">Moving back is logged with your reason</span> : null}
          </div>
          {backwards ? (
            <div className="field">
              <label htmlFor="stage-reason" className="field-label field-required">
                Reason
              </label>
              <Input id="stage-reason" name="reason" required placeholder="Why it moves back" autoFocus />
            </div>
          ) : null}
          {!state.ok && state.error ? (
            <div className="form-error" role="alert">
              {state.error}
            </div>
          ) : null}
          <div className="row" style={{ gap: 8 }}>
            <Button type="submit" variant="accent" pending={pending} pendingText="Moving">
              {`Move to ${to.name}`}
            </Button>
            <Button onClick={() => setTarget(null)} disabled={pending}>
              Cancel
            </Button>
          </div>
        </form>
      ) : null}
    </div>
  );
}
