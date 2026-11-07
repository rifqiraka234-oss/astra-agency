'use client';
/** Editing controls on /settings/reasons: add a reason to a list, rename one. */
import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Field, Input } from '@/components/ui/Input';
import { addReasonAction, renameReasonAction } from '@/app/(app)/settings/reasons/actions';
import { useSettingsForm } from './useSettingsForm';

export function AddReasonForm({ objectType, listName }: { objectType: string; listName: string }) {
  const [key, setKey] = useState(0);
  const { state, onSubmit, pending } = useSettingsForm(addReasonAction, { onOk: () => setKey((k) => k + 1) });
  const id = `add-reason-${objectType}`;
  return (
    <form key={key} onSubmit={onSubmit} className="row" style={{ gap: 8, alignItems: 'flex-end', flexWrap: 'wrap', padding: '12px 16px' }}>
      <input type="hidden" name="object_type" value={objectType} />
      <Field label={`New ${listName.toLowerCase()}`} htmlFor={id} error={state.fieldErrors?.label}>
        <Input id={id} name="label" maxLength={80} placeholder="For example Picked a freelancer" invalid={Boolean(state.fieldErrors?.label)} style={{ minWidth: 260 }} />
      </Field>
      <Button type="submit" variant="primary" pending={pending} pendingText="Adding">
        Add reason
      </Button>
      {state.error && !state.fieldErrors?.label ? (
        <span role="alert" className="small danger">
          {state.error}
        </span>
      ) : null}
      {state.ok && state.message ? (
        <span role="status" className="small success">
          {state.message}
        </span>
      ) : null}
    </form>
  );
}

export function RenameReasonButton({ reason }: { reason: { id: string; label: string } }) {
  const [open, setOpen] = useState(false);
  const { state, onSubmit, pending, setState } = useSettingsForm(renameReasonAction, { onOk: () => setOpen(false) });
  const close = () => {
    setOpen(false);
    setState({ ok: false });
  };
  return (
    <>
      <Button size="xs" onClick={() => setOpen(true)} aria-label={`Rename ${reason.label}`}>
        Rename
      </Button>
      <Modal
        open={open}
        onClose={close}
        title={`Rename ${reason.label}`}
        footer={
          <>
            <Button onClick={close}>Cancel</Button>
            <Button type="submit" form={`reason-${reason.id}`} variant="primary" pending={pending} pendingText="Saving">
              Save name
            </Button>
          </>
        }
      >
        <form id={`reason-${reason.id}`} onSubmit={onSubmit} className="stack">
          {state.error && !state.fieldErrors?.label ? <div className="form-error" role="alert">{state.error}</div> : null}
          <input type="hidden" name="id" value={reason.id} />
          <Field label="Name" htmlFor={`rn-${reason.id}`} required error={state.fieldErrors?.label} hint="Records keep this reason, only the name they show changes">
            <Input id={`rn-${reason.id}`} name="label" defaultValue={reason.label} maxLength={80} invalid={Boolean(state.fieldErrors?.label)} />
          </Field>
        </form>
      </Modal>
    </>
  );
}
