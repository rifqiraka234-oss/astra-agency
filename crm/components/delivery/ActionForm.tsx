'use client';
/**
 * A small form bound to a server action that returns ActionState. Shows the
 * error inline, keeps typed values when it fails and clears itself on success.
 * Used by agent F's record pages (milestones, time, lines, replies, state buttons).
 *
 *   <ActionForm action={addMilestone} hidden={{ projectId }} submitLabel="Add milestone" className="form-grid">
 *     <Field label="Name" htmlFor="m-name"><Input id="m-name" name="name" /></Field>
 *   </ActionForm>
 *
 *   // a single button
 *   <ActionForm action={setInvoiceStateAction} hidden={{ id, to: 'void' }} submitLabel="Void" variant="danger" confirm="Void this invoice?" inline />
 */
import { startTransition, useActionState, useEffect, useRef, useState, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { initialActionState, type ActionState } from '@/lib/forms';
import { Button, type ButtonSize, type ButtonVariant } from '@/components/ui/Button';

type Action = (prev: ActionState, fd: FormData) => Promise<ActionState>;

export function ActionForm({
  action,
  hidden,
  children,
  submitLabel,
  pendingText = 'Saving',
  variant = 'primary',
  size = 'sm',
  className,
  inline,
  confirm,
  resetOnSuccess = true,
  footer,
  id,
  ariaLabel,
}: {
  action: Action;
  hidden?: Record<string, string | null | undefined>;
  children?: ReactNode;
  submitLabel: ReactNode;
  pendingText?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  /** Button only, laid out in a row. */
  inline?: boolean;
  /** Ask before submitting. */
  confirm?: string;
  resetOnSuccess?: boolean;
  /** Extra content next to the submit button. */
  footer?: ReactNode;
  id?: string;
  ariaLabel?: string;
}) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(action, initialActionState);
  const formRef = useRef<HTMLFormElement>(null);
  const [handled, setHandled] = useState<ActionState | null>(null);

  useEffect(() => {
    if (!state.ok || state === handled) return;
    setHandled(state);
    if (resetOnSuccess) formRef.current?.reset();
    if (state.href) router.push(state.href);
  }, [state, handled, resetOnSuccess, router]);

  const submit = (
    <Button type="submit" variant={variant} size={size} pending={pending} pendingText={pendingText}>
      {submitLabel}
    </Button>
  );
  const error = !state.ok && state.error ? (
    <div className="form-error" role="alert">
      {state.error}
    </div>
  ) : null;

  return (
    <form
      id={id}
      ref={formRef}
      aria-label={ariaLabel}
      className={inline ? 'f-inline-form' : className}
      onSubmit={(e) => {
        e.preventDefault();
        if (confirm && !window.confirm(confirm)) return;
        const fd = new FormData(e.currentTarget);
        startTransition(() => formAction(fd));
      }}
    >
      {Object.entries(hidden ?? {}).map(([k, v]) => (v === null || v === undefined ? null : <input key={k} type="hidden" name={k} value={v} />))}
      {inline ? (
        <>
          {children}
          {submit}
          {error}
        </>
      ) : (
        <>
          {children}
          {error}
          {state.ok && state.message ? (
            <div className="form-note" role="status">
              {state.message}
            </div>
          ) : null}
          <div className="form-actions f-form-actions">
            {footer}
            {submit}
          </div>
        </>
      )}
    </form>
  );
}
