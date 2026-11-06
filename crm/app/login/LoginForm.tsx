'use client';
import { startTransition, useActionState } from 'react';
import { loginAction } from './actions';
import { initialActionState } from '@/lib/forms';
import { Button } from '@/components/ui/Button';
import { Field, Input } from '@/components/ui/Input';

export function LoginForm({ next }: { next?: string }) {
  const [state, action, pending] = useActionState(loginAction, initialActionState);
  return (
    <form
      action={action}
      onSubmit={(e) => {
        // Submit without React's automatic form reset, so a wrong password keeps the email.
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        startTransition(() => action(fd));
      }}
      className="stack"
      style={{ gap: 14 }}
      noValidate
    >
      {next ? <input type="hidden" name="next" value={next} /> : null}
      <Field label="Email" htmlFor="email" error={state.fieldErrors?.email}>
        <Input id="email" name="email" type="email" autoComplete="username" autoFocus required invalid={Boolean(state.fieldErrors?.email)} />
      </Field>
      <Field label="Password" htmlFor="password" error={state.fieldErrors?.password}>
        <Input id="password" name="password" type="password" autoComplete="current-password" required invalid={Boolean(state.fieldErrors?.password)} />
      </Field>
      {state.error && !state.fieldErrors ? (
        <div className="form-error" role="alert">
          {state.error}
        </div>
      ) : null}
      <Button variant="primary" type="submit" block pending={pending} pendingText="Signing in">
        Sign in
      </Button>
    </form>
  );
}
