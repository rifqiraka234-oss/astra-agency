'use client';
/** Header search over organizations, contacts and deals via /api/search. Arrow keys and Enter work. */
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type Result = { type: 'organization' | 'contact' | 'deal'; id: string; title: string; subtitle: string; href: string };

const GROUPS: { type: Result['type']; label: string }[] = [
  { type: 'organization', label: 'Organizations' },
  { type: 'contact', label: 'Contacts' },
  { type: 'deal', label: 'Deals' },
];

export function GlobalSearch() {
  const router = useRouter();
  const [q, setQ] = useState('');
  const [results, setResults] = useState<Result[] | null>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const wrap = useRef<HTMLDivElement>(null);
  const seq = useRef(0);

  useEffect(() => {
    const term = q.trim();
    if (term.length < 2) {
      setResults(null);
      return;
    }
    const n = ++seq.current;
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(term)}`, { headers: { accept: 'application/json' } });
        if (!res.ok) return;
        const data = (await res.json()) as { results: Result[] };
        if (n === seq.current) {
          setResults(data.results);
          setActive(-1);
        }
      } catch {
        /* ignore, the next keystroke retries */
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [q]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const flat = GROUPS.flatMap((g) => (results ?? []).filter((r) => r.type === g.type));
  const go = (r: Result) => {
    setOpen(false);
    setQ('');
    router.push(r.href);
  };

  return (
    <div className="app-search" ref={wrap}>
      <label htmlFor="global-search" className="sr-only">
        Search records
      </label>
      <input
        id="global-search"
        type="search"
        className="input"
        placeholder="Search organizations, contacts, deals, emails"
        autoComplete="off"
        value={q}
        role="combobox"
        aria-expanded={open && results !== null}
        aria-controls="global-search-results"
        onChange={(e) => {
          setQ(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === 'Escape') setOpen(false);
          if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActive((a) => Math.min(a + 1, flat.length - 1));
          }
          if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActive((a) => Math.max(a - 1, 0));
          }
          if (e.key === 'Enter' && flat.length) {
            e.preventDefault();
            go(flat[Math.max(active, 0)]);
          }
        }}
      />
      {open && results !== null ? (
        <div id="global-search-results" className="search-results" role="listbox">
          {flat.length === 0 ? <div className="search-empty">Nothing matches {q.trim()}</div> : null}
          {GROUPS.map((g) => {
            const items = flat.filter((r) => r.type === g.type);
            if (!items.length) return null;
            return (
              <div key={g.type}>
                <div className="search-group">{g.label}</div>
                {items.map((r) => (
                  <Link
                    key={r.id}
                    href={r.href}
                    className="search-item"
                    role="option"
                    aria-selected={flat.indexOf(r) === active}
                    onClick={() => {
                      setOpen(false);
                      setQ('');
                    }}
                  >
                    <span>{r.title}</span>
                    {r.subtitle ? <span className="search-item-sub">{r.subtitle}</span> : null}
                  </Link>
                ))}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
