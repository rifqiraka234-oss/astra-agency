'use client';
/**
 * A one button form for a server action with fixed inputs (archive, move up,
 * revert). Shows the action's error or message next to the button.
 *   <ActionButton action={archiveFieldAction} fields={{ id, archived: 'true' }} confirm="Archive this field?">Archive</ActionButton>
 */
import { useActionState, type ReactNode } from 'react';
import { Button, type ButtonSize, type ButtonVariant } from '@/components/ui/Button';
import { initialActionState, type ActionState } from '@/lib/forms';

export function ActionButton({
  action,
  fields,
  children,
  variant = 'secondary',
  size = 'sm',
  confirm,
  pendingText,
  label,
  showMessage = true,
  disabled,
}: {
  action: (prev: ActionState, fd: FormData) => Promise<ActionState>;
  fields: Record<string, string>;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  confirm?: string;
  pendingText?: string;
  /** Accessible name when the button shows only an arrow. */
  label?: string;
  showMessage?: boolean;
  disabled?: boolean;
}) {
  const [state, run, pending] = useActionState(action, initialActionState);
  return (
    <form
      action={run}
      onSubmit={(e) => {
        if (confirm && !window.confirm(confirm)) e.preventDefault();
      }}
      style={{ display: 'inline-flex', flexWrap: 'wrap', alignItems: 'center', gap: 6 }}
    >
      {Object.entries(fields).map(([k, v]) => (
        <input key={k} type="hidden" name={k} value={v} />
      ))}
      <Button type="submit" variant={variant} size={size} pending={pending} pendingText={pendingText} aria-label={label} disabled={disabled}>
        {children}
      </Button>
      {state.error ? (
        <span role="alert" className="small danger">
          {state.error}
        </span>
      ) : showMessage && state.ok && state.message ? (
        <span role="status" className="small success">
          {state.message}
        </span>
      ) : null}
    </form>
  );
}
