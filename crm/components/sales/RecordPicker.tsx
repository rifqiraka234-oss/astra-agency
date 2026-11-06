'use client';
/**
 * Search and pick an organization or a contact (uses /api/search), or create
 * a new one by name. Posts hidden inputs for a server action:
 *   organization  organization_id, or new_organization
 *   contact       contact_id, or new_contact_first and new_contact_last
 *
 *   <RecordPicker type="organization" label="Organization" />
 *   <RecordPicker type="contact" label="Contact" allowCreate onPick={(p) => ...} />
 */
import { useEffect, useId, useRef, useState } from 'react';
import { Field, Input } from '@/components/ui';
import styles from './sales.module.css';

export type Picked = { id: string | null; title: string; subtitle?: string; isNew?: boolean };

type Result = { type: string; id: string; title: string; subtitle: string };

export function RecordPicker({
  type,
  label,
  allowCreate = true,
  initial = null,
  error,
  hint,
  onPick,
  inputName,
}: {
  type: 'organization' | 'contact';
  label: string;
  allowCreate?: boolean;
  initial?: Picked | null;
  error?: string;
  hint?: string;
  onPick?: (p: Picked | null) => void;
  /** Override the hidden id input name (default organization_id / contact_id). */
  inputName?: string;
}) {
  const uid = useId();
  const [picked, setPicked] = useState<Picked | null>(initial);
  const [q, setQ] = useState('');
  const [results, setResults] = useState<Result[]>([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const term = q.trim();
    if (term.length < 2) {
      setResults([]);
      return;
    }
    const ctrl = new AbortController();
    setLoading(true);
    const t = setTimeout(() => {
      fetch(`/api/search?q=${encodeURIComponent(term)}`, { signal: ctrl.signal })
        .then((r) => (r.ok ? r.json() : { results: [] }))
        .then((d: { results: Result[] }) => {
          setResults((d.results ?? []).filter((r) => r.type === type));
          setActive(0);
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    }, 200);
    return () => {
      clearTimeout(t);
      ctrl.abort();
    };
  }, [q, type]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const term = q.trim();
  const options: (Result | { type: 'new'; id: ''; title: string; subtitle: string })[] = [
    ...results,
    ...(allowCreate && term.length >= 2 && !results.some((r) => r.title.toLowerCase() === term.toLowerCase())
      ? [{ type: 'new' as const, id: '' as const, title: `Create ${type === 'organization' ? 'organization' : 'contact'} "${term}"`, subtitle: 'Only the name, fill in the rest on its page' }]
      : []),
  ];

  const choose = (o: (typeof options)[number]) => {
    const p: Picked = o.type === 'new' ? { id: null, title: term, isNew: true } : { id: o.id, title: o.title, subtitle: o.subtitle };
    setPicked(p);
    setOpen(false);
    setQ('');
    onPick?.(p);
  };

  const clear = () => {
    setPicked(null);
    onPick?.(null);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const idName = inputName ?? (type === 'organization' ? 'organization_id' : 'contact_id');
  const [first, ...rest] = (picked?.isNew ? picked.title : '').split(/\s+/);
  const listId = `${uid}-list`;

  return (
    <Field label={label} htmlFor={`${uid}-input`} error={error} hint={hint}>
      <div className={styles.picker} ref={wrap}>
        {picked ? (
          <div className={styles.pickerChosen}>
            <span>
              {picked.isNew ? <span className="muted">New </span> : null}
              <span className="strong">{picked.title}</span>
              {picked.subtitle ? <span className="muted small">, {picked.subtitle}</span> : null}
            </span>
            <button type="button" className={styles.iconBtn} onClick={clear} aria-label={`Change ${label.toLowerCase()}`}>
              Change
            </button>
            {picked.isNew ? (
              type === 'organization' ? (
                <input type="hidden" name="new_organization" value={picked.title} />
              ) : (
                <>
                  <input type="hidden" name="new_contact_first" value={first} />
                  <input type="hidden" name="new_contact_last" value={rest.join(' ')} />
                </>
              )
            ) : (
              <input type="hidden" name={idName} value={picked.id ?? ''} />
            )}
          </div>
        ) : (
          <>
            <Input
              ref={inputRef}
              id={`${uid}-input`}
              role="combobox"
              aria-expanded={open && options.length > 0}
              aria-controls={listId}
              aria-autocomplete="list"
              autoComplete="off"
              invalid={Boolean(error)}
              placeholder={type === 'organization' ? 'Search organizations by name or domain' : 'Search contacts by name or email'}
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setOpen(true);
              }}
              onFocus={() => setOpen(true)}
              onKeyDown={(e) => {
                if (e.key === 'ArrowDown') {
                  e.preventDefault();
                  setActive((a) => Math.min(a + 1, options.length - 1));
                } else if (e.key === 'ArrowUp') {
                  e.preventDefault();
                  setActive((a) => Math.max(a - 1, 0));
                } else if (e.key === 'Enter' && open && options[active]) {
                  e.preventDefault();
                  choose(options[active]);
                } else if (e.key === 'Escape') {
                  setOpen(false);
                }
              }}
            />
            {open && term.length >= 2 ? (
              <ul id={listId} role="listbox" className={styles.pickerList}>
                {options.length === 0 ? (
                  <li className={styles.pickerOption} aria-disabled="true">
                    <span className="muted small">{loading ? 'Searching' : 'Nothing found'}</span>
                  </li>
                ) : (
                  options.map((o, i) => (
                    <li
                      key={`${o.type}-${o.id}-${i}`}
                      role="option"
                      aria-selected={i === active}
                      className={styles.pickerOption}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        choose(o);
                      }}
                      onMouseEnter={() => setActive(i)}
                    >
                      <span className="strong text-13">{o.title}</span>
                      {o.subtitle ? <span className="muted small">{o.subtitle}</span> : null}
                    </li>
                  ))
                )}
              </ul>
            ) : null}
          </>
        )}
      </div>
    </Field>
  );
}
