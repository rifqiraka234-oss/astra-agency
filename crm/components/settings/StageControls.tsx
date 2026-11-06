'use client';
/** Editing controls on /settings/pipelines: edit a stage, archive it (moving its records), add a stage, add a required field. */
import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Field, Input, Checkbox } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import type { GateCandidate } from '@/lib/settings/core-fields';
import { STAGE_STATES } from '@/lib/settings/pipeline-options';
import { addRequiredAction, addStageAction, archiveStageAction, updateStageAction } from '@/app/(app)/settings/pipelines/actions';
import { useSettingsForm } from './useSettingsForm';

type Stage = { id: string; name: string; probability: number | null; state: string; rot_days: number | null; pauses_sla: boolean; records: number };

function StageFields({ stage, objectType, errors, idPrefix }: { stage?: Stage; objectType: string; errors: Record<string, string>; idPrefix: string }) {
  return (
    <div className="form-grid">
      <Field label="Name" htmlFor={`${idPrefix}-name`} required error={errors.name}>
        <Input id={`${idPrefix}-name`} name="name" defaultValue={stage?.name ?? ''} maxLength={60} invalid={!!errors.name} />
      </Field>
      <Field label="Type" htmlFor={`${idPrefix}-state`} error={errors.state}>
        <Select id={`${idPrefix}-state`} name="state" defaultValue={stage?.state ?? 'open'} options={STAGE_STATES} />
      </Field>
      <Field label="Probability" htmlFor={`${idPrefix}-prob`} error={errors.probability} hint={objectType === 'deal' ? 'Percent, drives the weighted amount' : 'Leave empty unless it means something here'}>
        <Input id={`${idPrefix}-prob`} name="probability" type="number" min={0} max={100} step={1} defaultValue={stage?.probability ?? ''} className="mono" invalid={!!errors.probability} />
      </Field>
      <Field label="Rotting after" htmlFor={`${idPrefix}-rot`} error={errors.rot_days} hint="Days in the stage before the card turns red, empty for never">
        <Input id={`${idPrefix}-rot`} name="rot_days" type="number" min={1} max={365} step={1} defaultValue={stage?.rot_days ?? ''} className="mono" invalid={!!errors.rot_days} />
      </Field>
      {objectType === 'ticket' ? (
        <div className="field field-full">
          <Checkbox name="pauses_sla" label="Pauses the SLA clock" defaultChecked={stage?.pauses_sla ?? false} />
        </div>
      ) : null}
    </div>
  );
}

export function StageEditButton({ stage, objectType }: { stage: Stage; objectType: string }) {
  const [open, setOpen] = useState(false);
  const { state, onSubmit, pending, setState } = useSettingsForm(updateStageAction, { onOk: () => setOpen(false) });
  const close = () => {
    setOpen(false);
    setState({ ok: false });
  };
  return (
    <>
      <Button size="xs" onClick={() => setOpen(true)} aria-label={`Edit ${stage.name}`}>
        Edit
      </Button>
      <Modal
        open={open}
        onClose={close}
        title={`Edit ${stage.name}`}
        footer={
          <>
            <Button onClick={close}>Cancel</Button>
            <Button type="submit" form={`stage-${stage.id}`} variant="primary" pending={pending} pendingText="Saving">
              Save stage
            </Button>
          </>
        }
      >
        <form id={`stage-${stage.id}`} onSubmit={onSubmit} className="stack">
          {state.error ? <div className="form-error" role="alert">{state.error}</div> : null}
          <input type="hidden" name="id" value={stage.id} />
          <StageFields stage={stage} objectType={objectType} errors={state.fieldErrors ?? {}} idPrefix={`st-${stage.id}`} />
        </form>
      </Modal>
    </>
  );
}

export function ArchiveStageButton({ stage, others }: { stage: Stage; others: { id: string; name: string }[] }) {
  const [open, setOpen] = useState(false);
  const { state, onSubmit, pending, setState } = useSettingsForm(archiveStageAction, { onOk: () => setOpen(false) });
  const close = () => {
    setOpen(false);
    setState({ ok: false });
  };
  return (
    <>
      <Button size="xs" variant="danger" onClick={() => setOpen(true)} aria-label={`Archive ${stage.name}`}>
        Archive
      </Button>
      <Modal
        open={open}
        onClose={close}
        title={`Archive ${stage.name}`}
        footer={
          <>
            <Button onClick={close}>Cancel</Button>
            <Button type="submit" form={`archive-${stage.id}`} variant="danger" pending={pending} pendingText="Archiving">
              {stage.records ? 'Move and archive' : 'Archive stage'}
            </Button>
          </>
        }
      >
        <form id={`archive-${stage.id}`} onSubmit={onSubmit} className="stack">
          {state.error ? <div className="form-error" role="alert">{state.error}</div> : null}
          <input type="hidden" name="id" value={stage.id} />
          {stage.records ? (
            <>
              <p style={{ margin: 0 }}>
                {stage.records} {stage.records === 1 ? 'record is' : 'records are'} in this stage. They move first, through the normal stage rules, then the stage is archived.
              </p>
              <Field label="Move them to" htmlFor={`mv-${stage.id}`} error={state.fieldErrors?.moveToStageId}>
                <Select id={`mv-${stage.id}`} name="move_to" options={others.map((o) => ({ value: o.id, label: o.name }))} />
              </Field>
            </>
          ) : (
            <p style={{ margin: 0 }}>Nothing is in this stage. It disappears from the board, its history stays, and you can restore it later.</p>
          )}
        </form>
      </Modal>
    </>
  );
}

export function AddStageForm({ pipelineId, objectType }: { pipelineId: string; objectType: string }) {
  const [key, setKey] = useState(0);
  const { state, onSubmit, pending } = useSettingsForm(addStageAction, { onOk: () => setKey((k) => k + 1) });
  return (
    <form key={key} onSubmit={onSubmit} className="card card-pad stack">
      <h3 className="card-title" style={{ fontSize: 15 }}>
        Add a stage
      </h3>
      {state.error ? <div className="form-error" role="alert">{state.error}</div> : null}
      {state.ok && state.message ? <div className="small success" role="status">{state.message}</div> : null}
      <input type="hidden" name="pipeline_id" value={pipelineId} />
      <StageFields objectType={objectType} errors={state.fieldErrors ?? {}} idPrefix="new-stage" />
      <div className="form-actions">
        <Button type="submit" variant="primary" pending={pending} pendingText="Adding">
          Add stage
        </Button>
      </div>
      <p className="small muted" style={{ margin: 0 }}>Open stages go in before the closing ones. Use Up and Down to place it.</p>
    </form>
  );
}

export function AddRequiredForm({ stageId, stageName, candidates }: { stageId: string; stageName: string; candidates: GateCandidate[] }) {
  const { state, onSubmit, pending } = useSettingsForm(addRequiredAction);
  if (!candidates.length) return null;
  return (
    <form onSubmit={onSubmit} className="row" style={{ gap: 6, flexWrap: 'nowrap' }}>
      <input type="hidden" name="stage_id" value={stageId} />
      <label htmlFor={`req-${stageId}`} className="sr-only">
        Field required to enter {stageName}
      </label>
      <select id={`req-${stageId}`} name="field_key" className="select" style={{ minHeight: 32, fontSize: 13, padding: '0 30px 0 8px', maxWidth: 170 }} defaultValue="">
        <option value="" disabled>
          Require a field
        </option>
        {candidates.map((c) => (
          <option key={c.key} value={c.key}>
            {c.label}
            {c.custom ? ', custom' : ''}
          </option>
        ))}
      </select>
      <Button type="submit" size="xs" pending={pending} pendingText="Adding">
        Add
      </Button>
      {state.error ? (
        <span role="alert" className="small danger">
          {state.error}
        </span>
      ) : null}
    </form>
  );
}
