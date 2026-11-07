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
 *   contact-name      \
 *   contact-email      > one check on all three, /api/dupes?type=person&name=&email=&linkedin=
 *   contact-linkedin  /   (Raka's rule, lib/dedupe.ts: name first, then LinkedIn, then email)
 * Give every name field contact-name, their values join in field order.
 * An organization match shows the amber box with "Open existing record". A contact
 * check lists every person the rule pairs with, their LinkedIn and emails, and why.
 * Saving is blocked only for a confirmed duplicate or a taken email or LinkedIn
 * profile; a name match to review is a warning. The action should also check
 * (lib/dupes.ts) and return { ok: false, duplicate } because the unique index is
 * the truth. On { ok: true, href } the dialog navigates there.
 */
import { startTransition, useActionState, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { initialActionState, type ActionState, type DupeMatch } from '@/lib/forms';
import type { PersonDupeResponse } from '@/lib/dedupe';
import type { Option } from '@/lib/options';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input, Field } from '../ui/Input';
import { Select } from '../ui/Select';
import { Textarea } from '../ui/Textarea';

export type DupeCheck = 'org-domain' | 'contact-name' | 'contact-email' | 'contact-linkedin';

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

const DUPE_URL = {
  'org-domain': (v: string) => `/api/dupes?type=org&domain=${encodeURIComponent(v)}`,
};

const isPersonCheck = (k: DupeCheck | undefined) => k === 'contact-name' || k === 'contact-email' || k === 'contact-linkedin';

/** The person check: name, email and LinkedIn together, read from the form each time. */
function usePersonCheck(fields: CreateField[], formRef: React.RefObject<HTMLFormElement | null>) {
  const [result, setResult] = useState<PersonDupeResponse | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const seq = useRef(0);
  const enabled = fields.some((f) => isPersonCheck(f.dupeCheck));

  const check = (delay = 350) => {
    if (!enabled) return;
    clearTimeout(timer.current);
    timer.current = setTimeout(async () => {
      const form = formRef.current;
      if (!form) return;
      const value = (name: string) => {
        const el = form.elements.namedItem(name);
        return el && 'value' in el ? String(el.value).trim() : '';
      };
      const of = (kind: DupeCheck) => fields.filter((f) => f.dupeCheck === kind).map((f) => value(f.name)).filter(Boolean);
      const name = of('contact-name').join(' ');
      const email = of('contact-email')[0] ?? '';
      const linkedin = of('contact-linkedin')[0] ?? '';
      if (!name && !email && !linkedin) {
        setResult(null);
        return;
      }
      const n = ++seq.current;
      try {
        const q = new URLSearchParams({ type: 'person', name, email, linkedin });
        const res = await fetch(`/api/dupes?${q}`, { headers: { accept: 'application/json' } });
        if (!res.ok) return;
        const data = (await res.json()) as PersonDupeResponse;
        if (seq.current === n) setResult(data);
      } catch {
        /* the server action checks again, a failed hint is fine */
      }
    }, delay);
  };
  const reset = () => setResult(null);
  return { person: result, checkPerson: check, resetPerson: reset };
}

const TONE: Record<string, string> = { linkedin: 'red', email: 'red', review: 'amber', distinct: 'grey' };

function PersonMatches({ data, onClose }: { data: PersonDupeResponse; onClose: () => void }) {
  const shown = data.candidates;
  if (!shown.length) return null;
  const real = shown.filter((c) => c.verdict.confidence !== 'distinct');
  const title = data.block
    ? 'This person is already in the CRM'
    : real.length
      ? `${real.length === 1 ? 'Someone' : `${real.length} people`} with this name ${real.length === 1 ? 'is' : 'are'} already in the CRM`
      : 'Someone with this name is already in the CRM, a different person';
  return (
    <div className="dupe" role="status">
      <div className="dupe-title">{title}</div>
      <div className="dupe-body">
        {data.block
          ? 'Open the existing record instead. A contact confirmed by LinkedIn or email, or an email or LinkedIn profile already in use, cannot be saved twice.'
          : 'Check them before you save. A name alone never merges people, add a LinkedIn URL or an email to confirm.'}
      </div>
      <ul className="dupe-people">
        {shown.map((c) => (
          <li key={c.id} className="dupe-person">
            <div className="row" style={{ gap: 8, flexWrap: 'wrap' }}>
              <Link href={c.href} className="strong" onClick={onClose}>
                {c.name}
              </Link>
              <span className={`badge badge-${TONE[c.verdict.confidence]}`}>{c.label}</span>
            </div>
            <div className="small secondary">{c.verdict.reason}.</div>
            <div className="small muted">
              {[c.role, c.added].filter(Boolean).join(', ')}
              <br />
              LinkedIn {c.linkedin ?? 'none'}, email {c.emails.length ? c.emails.join(', ') : 'none'}
            </div>
          </li>
        ))}
      </ul>
      {data.block ? (
        <div className="row">
          <Link
            href={(shown.find((c) => c.verdict.confidence === 'linkedin' || c.verdict.confidence === 'email' || c.holdsIdentifier) ?? shown[0]).href}
            className="btn btn-primary btn-sm"
            onClick={onClose}
          >
            Open existing record
          </Link>
          <Button size="sm" onClick={onClose}>
            Cancel
          </Button>
        </div>
      ) : null}
    </div>
  );
}

function useDupeCheck() {
  const [results, setResults] = useState<Record<string, DupeResponse | null>>({});
  const timers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});
  const seq = useRef<Record<string, number>>({});

  const check = (field: string, kind: keyof typeof DUPE_URL, value: string, delay = 350) => {
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
  const formRef = useRef<HTMLFormElement>(null);
  const { person, checkPerson, resetPerson } = usePersonCheck(fields, formRef);
  const [handled, setHandled] = useState<ActionState | null>(null);

  useEffect(() => {
    if (!state.ok || state === handled) return;
    setHandled(state);
    reset();
    resetPerson();
    if (onCreated) onCreated(state);
    else if (state.href) router.push(state.href);
    onClose();
  }, [state, handled, onCreated, onClose, router, reset, resetPerson]);

  const liveMatch = Object.values(results).find((r) => r?.match)?.match ?? null;
  const personShown = Boolean(person?.candidates.length);
  const personBlocks = Boolean(person?.block);
  // The server's answer shows when the live person list does not already say it.
  const serverMatch = !state.ok && !(personBlocks && state.duplicate?.type === 'contact') ? state.duplicate ?? null : null;
  const match: DupeMatch | null = liveMatch ?? serverMatch;
  const matchRule = Object.values(results).find((r) => r?.match)?.rule ?? (personShown ? person?.rule : undefined);

  return (
    <Modal open={open} onClose={onClose} title={title}>
      <form
        ref={formRef}
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
            const personNote =
              f.dupeCheck === 'contact-email' ? person?.notes.email : f.dupeCheck === 'contact-linkedin' ? person?.notes.linkedin : undefined;
            const flagged = Boolean(r?.match) || Boolean(err) || (isPersonCheck(f.dupeCheck) && personBlocks);
            const onValue =
              f.dupeCheck === 'org-domain'
                ? (v: string, delay?: number) => check(f.name, 'org-domain', v, delay)
                : isPersonCheck(f.dupeCheck)
                  ? (_v: string, delay?: number) => checkPerson(delay)
                  : undefined;
            return (
              <Field
                key={f.name}
                label={f.label}
                htmlFor={id}
                required={f.required}
                error={err}
                hint={r?.note ?? personNote ?? f.hint}
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

        {person && personShown ? <PersonMatches data={person} onClose={onClose} /> : null}
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
        {(match || personShown) && matchRule ? <div className="dupe-rule">{matchRule}</div> : null}

        {!state.ok && state.error && !match ? <div className="form-error">{state.error}</div> : null}

        <div className="form-actions">
          <Button onClick={onClose} disabled={pending}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" pending={pending} pendingText="Saving" disabled={Boolean(liveMatch) || personBlocks}>
            {submitLabel}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
