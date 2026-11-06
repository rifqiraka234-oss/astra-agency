'use client';
/**
 * List filters as a GET form. Selects submit on change, so the URL holds the
 * filter and server components read it. Works without JavaScript through the
 * Apply button.
 *
 *   <FilterBar path="/projects" params={sp} filters={[{ name: 'health', label: 'Health', options: HEALTH }]} />
 */
import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import type { Option } from '@/lib/options';

export type FilterDef = { name: string; label: string; options: Option[]; all?: string };

export function FilterBar({
  path,
  params,
  filters,
  keep = [],
}: {
  path: string;
  params: Record<string, string | string[] | undefined>;
  filters: FilterDef[];
  /** Other params to carry over, for example sort, dir, view. */
  keep?: string[];
}) {
  const router = useRouter();
  const ref = useRef<HTMLFormElement>(null);
  const value = (k: string) => {
    const v = params[k];
    return Array.isArray(v) ? v[0] ?? '' : v ?? '';
  };
  const go = () => {
    const form = ref.current;
    if (!form) return;
    const q = new URLSearchParams();
    for (const [k, v] of new FormData(form).entries()) if (String(v)) q.set(k, String(v));
    const qs = q.toString();
    router.push(qs ? `${path}?${qs}` : path);
  };
  const active = filters.some((f) => value(f.name));
  return (
    <form ref={ref} method="get" action={path} className="f-filters" aria-label="Filters" onSubmit={(e) => (e.preventDefault(), go())}>
      {keep.map((k) => (value(k) ? <input key={k} type="hidden" name={k} value={value(k)} /> : null))}
      {filters.map((f) => (
        <label key={f.name} className="f-filter">
          <span className="sr-only">{f.label}</span>
          <select name={f.name} className="select" defaultValue={value(f.name)} onChange={go} aria-label={f.label}>
            <option value="">{f.all ?? `Any ${f.label.toLowerCase()}`}</option>
            {f.options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      ))}
      <noscript>
        <button type="submit" className="btn btn-secondary btn-sm">
          Apply
        </button>
      </noscript>
      {active ? (
        <a className="btn btn-ghost btn-sm" href={path}>
          Clear filters
        </a>
      ) : null}
    </form>
  );
}
