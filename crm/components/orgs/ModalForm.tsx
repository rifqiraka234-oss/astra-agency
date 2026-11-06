'use client';
/**
 * Agent A. A Modal with a form posting to a server action, keeping typed values
 * when the action fails and closing on success.
 *
 *   <ModalForm open={open} onClose={close} title="Log activity" action={logActivityAction}
 *     hidden={{ organizationId }} submitLabel="Log it">
 *     {(state) => <Field label="Title" error={state.fieldErrors?.title}>...</Field>}
 *   </ModalForm>
 */
import { startTransition, useActionState, useEffect, useState, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { initialActionState, type ActionState } from '@/lib/forms';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

type Action = (prev: ActionState, fd: FormData) => Promise<ActionState>;

export function ModalForm({
  open,
  onClose,
  title,
  action,
  hidden,
  submitLabel,
  children,
  wide,
  onDone,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  action: Action;
  hidden?: Record<string, string>;
  submitLabel: string;
  children: (state: ActionState) => ReactNode;
  wide?: boolean;
  onDone?: (state: ActionState) => void;
}) {
  const router = useRouter();
  const [state, run, pending] = useActionState(action, initialActionState);
  const [handled, setHandled] = useState<ActionState>(state);
  useEffect(() => {
    if (state === handled || !state.ok) return;
    setHandled(state);
    onDone?.(state);
    router.refresh();
    onClose();
  }, [state, handled, onClose, onDone, router]);

  return (
    <Modal open={open} onClose={onClose} title={title} wide={wide}>
      <form
        className="stack"
        style={{ gap: 14 }}
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          startTransition(() => run(fd));
        }}
      >
        {Object.entries(hidden ?? {}).map(([k, v]) => (
          <input key={k} type="hidden" name={k} value={v} />
        ))}
        {children(state)}
        {!state.ok && state.error && !state.duplicate ? <div className="form-error">{state.error}</div> : null}
        {!state.ok && state.duplicate ? (
          <div className="dupe" role="status">
            <div className="dupe-title">{state.duplicate.title}</div>
            <div className="dupe-body">{state.duplicate.body}</div>
            <div className="row">
              <a href={state.duplicate.href} className="btn btn-primary btn-sm">
                Open existing record
              </a>
            </div>
          </div>
        ) : null}
        <div className="form-actions">
          <Button onClick={onClose} disabled={pending}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" pending={pending} pendingText="Saving">
            {submitLabel}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
