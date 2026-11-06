'use client';
/** Create an API key. The key comes back once, in the action result, and is shown here until the page reloads. */
import { useActionState } from 'react';
import { Button } from '@/components/ui/Button';
import { initialActionState } from '@/lib/forms';
import { createApiKeyAction } from './actions';
import s from '@/components/settings/settings.module.css';

export function ApiKeyForm({ scopes }: { scopes: { value: string; label: string }[] }) {
  const [state, run, pending] = useActionState(createApiKeyAction, initialActionState);
  const created = state.ok ? (state.data as { key?: string; prefix?: string } | undefined) : undefined;
  return (
    <div className="stack" style={{ gap: 12 }}>
      <form action={run} className="stack" style={{ gap: 12 }}>
        <div className="field">
          <label className="field-label" htmlFor="key-name">
            Name
          </label>
          <input id="key-name" name="name" className="input" placeholder="claude-routines" maxLength={60} required aria-invalid={Boolean(state.fieldErrors?.name)} />
          {state.fieldErrors?.name ? <div className="field-error">{state.fieldErrors.name}</div> : <div className="field-hint">What uses it, so you know what breaks if you revoke it</div>}
        </div>
        <fieldset className="field" style={{ border: 0, padding: 0, margin: 0 }}>
          <legend className="field-label">Scopes</legend>
          <div className="row" style={{ flexWrap: 'wrap', gap: 14 }}>
            {scopes.map((sc) => (
              <label key={sc.value} className="checkbox" style={{ minHeight: 44, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <input type="checkbox" name="scopes" value={sc.value} defaultChecked={sc.value === 'read'} />
                {sc.label}
              </label>
            ))}
          </div>
          {state.fieldErrors?.scopes ? <div className="field-error">{state.fieldErrors.scopes}</div> : null}
        </fieldset>
        <div className="row" style={{ gap: 10, flexWrap: 'wrap' }}>
          <Button type="submit" variant="primary" pending={pending} pendingText="Creating">
            Create key
          </Button>
          {state.error && !state.fieldErrors ? (
            <span role="alert" className="small danger">
              {state.error}
            </span>
          ) : null}
        </div>
      </form>
      {created?.key ? (
        <div className="stack" style={{ gap: 6 }} role="status">
          <div className="small strong">{state.message}</div>
          <div className={s.secret}>{created.key}</div>
          <div className="small muted">Only a fingerprint is stored. If it gets lost, revoke it and make a new one.</div>
        </div>
      ) : null}
    </div>
  );
}
