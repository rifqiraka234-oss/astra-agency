'use client';
/**
 * Agent A. A small card that lists values with primary, remove and an add form:
 * organization domains, contact emails, contact phones.
 *
 *   <ListEditor title="Domains" items={[{ id, label: 'dekade.nl', primary: true }]}
 *     hidden={{ organizationId }} idName="domainId"
 *     addAction={addDomainAction} removeAction={removeDomainAction} primaryAction={setPrimaryDomainAction}
 *     input={{ name: 'domain', label: 'Add a domain', placeholder: 'dekade.com' }} />
 */
import { startTransition, useActionState, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { initialActionState, type ActionState } from '@/lib/forms';
import type { Option } from '@/lib/options';
import { Badge } from '@/components/ui/Badge';
import styles from './orgs.module.css';

type Action = (prev: ActionState, fd: FormData) => Promise<ActionState>;

export type ListItem = { id: string; label: string; primary: boolean; tags?: string[]; mono?: boolean; href?: string };

function RowButton({ action, fields, label, className, confirmText }: { action: Action; fields: Record<string, string>; label: string; className: string; confirmText?: string }) {
  const [state, run, pending] = useActionState(action, initialActionState);
  return (
    <>
      <button
        type="button"
        className={className}
        disabled={pending}
        onClick={() => {
          if (confirmText && !window.confirm(confirmText)) return;
          const fd = new FormData();
          for (const [k, v] of Object.entries(fields)) fd.set(k, v);
          startTransition(() => run(fd));
        }}
      >
        {pending ? 'Saving' : label}
      </button>
      {!state.ok && state.error ? <span className={styles.inlineError}>{state.error}</span> : null}
    </>
  );
}

export function ListEditor({
  title,
  items,
  hidden,
  idName,
  addAction,
  removeAction,
  primaryAction,
  input,
  typeSelect,
  emptyText,
  note,
  canEdit = true,
  primaryLabel = 'Primary',
}: {
  title: string;
  items: ListItem[];
  hidden: Record<string, string>;
  idName: string;
  addAction: Action;
  removeAction: Action;
  primaryAction: Action;
  input: { name: string; label: string; placeholder?: string; type?: string; inputMode?: 'email' | 'tel' | 'url' | 'text' };
  typeSelect?: { name: string; label: string; options: Option[]; defaultValue: string };
  emptyText: string;
  note?: ReactNode;
  canEdit?: boolean;
  primaryLabel?: string;
}) {
  const [state, add, pending] = useActionState(addAction, initialActionState);
  const [formKey, setFormKey] = useState(0);
  const [seen, setSeen] = useState(state);
  if (state !== seen) {
    setSeen(state);
    if (state.ok) setFormKey((k) => k + 1);
  }
  const error = !state.ok ? state.fieldErrors?.[input.name] ?? state.error : undefined;
  const inputId = `add-${input.name}`;

  return (
    <section className={styles.panel} aria-label={title}>
      <div className={styles.panelHead}>
        <h2 className="section-label">{title}</h2>
      </div>
      {items.length === 0 ? <div className="muted text-13">{emptyText}</div> : null}
      <div>
        {items.map((item) => (
          <div key={item.id} className={styles.itemRow}>
            <div className={styles.itemMain}>
              {item.href ? (
                <a href={item.href} className={item.mono ? 'mono' : undefined}>
                  {item.label}
                </a>
              ) : (
                <span className={item.mono ? 'mono' : undefined}>{item.label}</span>
              )}
              {item.primary ? <Badge tone="blue">{primaryLabel}</Badge> : null}
              {item.tags?.map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </div>
            {canEdit ? (
              <div className={styles.itemActions}>
                {!item.primary ? (
                  <RowButton action={primaryAction} fields={{ ...hidden, [idName]: item.id }} label="Make primary" className={styles.linkBtn} />
                ) : null}
                <RowButton
                  action={removeAction}
                  fields={{ ...hidden, [idName]: item.id }}
                  label="Remove"
                  className={styles.dangerLink}
                  confirmText={`Remove ${item.label}?`}
                />
              </div>
            ) : null}
          </div>
        ))}
      </div>
      {canEdit ? (
        <form
          key={formKey}
          className={styles.inlineForm}
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            startTransition(() => add(fd));
          }}
          noValidate
        >
          {Object.entries(hidden).map(([k, v]) => (
            <input key={k} type="hidden" name={k} value={v} />
          ))}
          <label htmlFor={inputId} className="sr-only">
            {input.label}
          </label>
          <input
            id={inputId}
            name={input.name}
            className={`input ${styles.grow}`}
            type={input.type ?? 'text'}
            inputMode={input.inputMode}
            placeholder={input.placeholder ?? input.label}
            autoComplete="off"
            aria-invalid={error ? true : undefined}
          />
          {typeSelect ? (
            <>
              <label htmlFor={`${inputId}-type`} className="sr-only">
                {typeSelect.label}
              </label>
              <select id={`${inputId}-type`} name={typeSelect.name} className="select" defaultValue={typeSelect.defaultValue} style={{ width: 'auto' }}>
                {typeSelect.options.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </>
          ) : null}
          <button type="submit" className="btn btn-secondary" disabled={pending}>
            {pending ? 'Adding' : 'Add'}
          </button>
          {error ? (
            <span className={styles.inlineError} role="alert">
              {error}
              {state.duplicate ? (
                <>
                  {' '}
                  <Link href={state.duplicate.href}>Open {state.duplicate.name}</Link>
                </>
              ) : null}
            </span>
          ) : null}
          {state.ok && state.message ? <span className={styles.inlineOk}>{state.message}</span> : null}
        </form>
      ) : null}
      {note ? <div className={styles.panelNote}>{note}</div> : null}
    </section>
  );
}
