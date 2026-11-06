'use client';
/**
 * The generic create form in a modal, with a live duplicate check (Main design).
 *
 *   <CreateDialog
 *     open={open} onClose={() => setOpen(false)}
 *     title="New organization"
 *     action={createOrganization}                 // server action returning ActionState (lib/forms.ts)
 *     fields={[
 *       { name: 'name', label: 'Name', required: true },
 *       { name: 'website', label: 'Website or domain', dupeCheck: 'org-domain', placeholder: 'dekade.nl' },
 *       { name: 'industry', label: 'Industry', type: 'select', options: INDUSTRIES },
 *     ]}
 *     hidden={{ organizationId }}                  // optional extra inputs
 *     submitLabel="Create organization"
 *   />
 *
 * dupeCheck calls /api/dupes as you type (debounced) and on blur:
 *   org-domain        /api/dupes?type=org&domain=
 *   contact-email     /api/dupes?type=contact&email=
 *   contact-linkedin  /api/dupes?type=contact&linkedin=
 * A match shows the amber box with "Open existing record". The action should
 * also check (lib/dupes.ts) and return { ok: false, duplicate } because the
 * unique index is the truth. On { ok: true, href } the dialog navigates there.
 */
import { startTransition, useActionState, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { initialActionState, type ActionState, type DupeMatch } from '@/lib/forms';
import type { Option } from '@/lib/options';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input, Field } from '../ui/Input';
import { Select } from '../ui/Select';
import { Textarea } from '../ui/Textarea';

export type DupeCheck = 'org-domain' | 'contact-email' | 'contact-linkedin';

export type CreateField = {
  name: string;
  label: string;
  type?: 'text' | 'email' | 'url' | 'tel' | 'number' | 'date' | 'datetime-local' | 'textarea' | 'select';
  required?: boolean;
  placeholder?: string;
  hint?: string;
  options?: Option[];
  defaultValue?: string;
  dupeCheck?: DupeCheck;
  /** half puts two fields side by side on wide screens. */
  width?: 'full' | 'half';
};

type DupeResponse = { normalised: string | null; freeMail?: boolean; match: DupeMatch | null; rule: string; note?: string };

const DUPE_URL: Record<DupeCheck, (v: string) => string> = {
  'org-domain': (v) => `/api/dupes?type=org&domain=${encodeURIComponent(v)}`,
  'contact-email': (v) => `/api/dupes?type=contact&email=${encodeURIComponent(v)}`,
  'contact-linkedin': (v) => `/api/dupes?type=contact&linkedin=${encodeURIComponent(v)}`,
};

function useDupeCheck() {
  const [results, setResults] = useState<Record<string, DupeResponse | null>>({});
  const timers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});
  const seq = useRef<Record<string, number>>({});

  const check = (field: string, kind: DupeCheck, value: string, delay = 350) => {
    clearTimeout(timers.current[field]);
    const v = value.trim();
    if (!v) {
      setResults((r) => ({ ...r, [field]: null }));
      return;
    }
    timers.current[field] = setTimeout(async () => {
      const n = (seq.current[field] = (seq.current[field] ?? 0) + 1);
      try {
        const res = await fetch(DUPE_URL[kind](v), { headers: { accept: 'application/json' } });
        if (!res.ok) return;
        const data = (await res.json()) as DupeResponse;
        if (seq.current[field] === n) setResults((r) => ({ ...r, [field]: data }));
      } catch {
        /* the server action checks again, a failed hint is fine */
      }
    }, delay);
  };
  const reset = () => setResults({});
  return { results, check, reset };
}

export function CreateDialog({
  open,
  onClose,
  title,
  fields,
  action,
  hidden,
  submitLabel = 'Create',
  intro,
  onCreated,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  fields: CreateField[];
  action: (prev: ActionState, fd: FormData) => Promise<ActionState>;
  hidden?: Record<string, string>;
  submitLabel?: string;
  intro?: React.ReactNode;
  /** Called on success instead of navigating to state.href. */
  onCreated?: (state: ActionState) => void;
}) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(action, initialActionState);
  const { results, check, reset } = useDupeCheck();
  const [handled, setHandled] = useState<ActionState | null>(null);

  useEffect(() => {
    if (!state.ok || state === handled) return;
    setHandled(state);
    reset();
    if (onCreated) onCreated(state);
    else if (state.href) router.push(state.href);
    onClose();
  }, [state, handled, onCreated, onClose, router, reset]);

  const liveMatch = Object.values(results).find((r) => r?.match)?.match ?? null;
  const match: DupeMatch | null = liveMatch ?? (!state.ok ? state.duplicate ?? null : null);
  const matchRule = Object.values(results).find((r) => r?.match)?.rule;

  return (
    <Modal open={open} onClose={onClose} title={title}>
      <form
        action={formAction}
        onSubmit={(e) => {
          // No automatic form reset, a failed save keeps what was typed.
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          startTransition(() => formAction(fd));
        }}
        className="stack"
        style={{ gap: 14 }}
        noValidate
      >
        {intro}
        {Object.entries(hidden ?? {}).map(([k, v]) => (
          <input key={k} type="hidden" name={k} value={v} />
        ))}
        <div className="form-grid">
          {fields.map((f) => {
            const id = `create-${f.name}`;
            const r = results[f.name];
            const err = state.ok ? undefined : state.fieldErrors?.[f.name];
            const flagged = Boolean(r?.match) || Boolean(err);
            const onValue = f.dupeCheck ? (v: string, delay?: number) => check(f.name, f.dupeCheck!, v, delay) : undefined;
            return (
              <Field
                key={f.name}
                label={f.label}
                htmlFor={id}
                required={f.required}
                error={err}
                hint={r?.note ?? f.hint}
                className={f.width === 'half' ? undefined : 'field-full'}
              >
                {f.type === 'textarea' ? (
                  <Textarea id={id} name={f.name} rows={3} placeholder={f.placeholder} defaultValue={f.defaultValue} invalid={flagged} />
                ) : f.type === 'select' ? (
                  <Select id={id} name={f.name} options={f.options ?? []} placeholder={f.placeholder ?? 'Not set'} defaultValue={f.defaultValue ?? ''} invalid={flagged} />
                ) : (
                  <Input
                    id={id}
                    name={f.name}
                    type={f.type === 'url' ? 'text' : f.type ?? 'text'}
                    inputMode={f.type === 'url' ? 'url' : undefined}
                    placeholder={f.placeholder}
                    defaultValue={f.defaultValue}
                    required={f.required}
                    invalid={flagged}
                    autoComplete="off"
                    onChange={onValue ? (e) => onValue(e.currentTarget.value) : undefined}
                    onBlur={onValue ? (e) => onValue(e.currentTarget.value, 0) : undefined}
                  />
                )}
              </Field>
            );
          })}
        </div>

        {match ? (
          <div className="dupe" role="status">
            <div className="dupe-title">{match.title}</div>
            <div className="dupe-body">{match.body}</div>
            <div className="row">
              <Link href={match.href} className="btn btn-primary btn-sm" onClick={onClose}>
                Open existing record
              </Link>
              <Button size="sm" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </div>
        ) : null}
        {match && matchRule ? <div className="dupe-rule">{matchRule}</div> : null}

        {!state.ok && state.error && !match ? <div className="form-error">{state.error}</div> : null}

        <div className="form-actions">
          <Button onClick={onClose} disabled={pending}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" pending={pending} pendingText="Saving" disabled={Boolean(liveMatch)}>
            {submitLabel}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
