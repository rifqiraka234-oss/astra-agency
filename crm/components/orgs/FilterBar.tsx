'use client';
/**
 * Agent A. The search and filter row above a list. A plain GET form, so it
 * works without JavaScript; selects submit on change. Keeps sort and dir.
 *
 *   <FilterBar path="/organizations" values={sp} searchPlaceholder="Name or domain"
 *     filters={[{ name: 'owner', label: 'Owner', options: users }]} />
 */
import Link from 'next/link';
import type { Option } from '@/lib/options';
import styles from './orgs.module.css';

export type FilterDef = { name: string; label: string; options: Option[]; allLabel?: string };

export function FilterBar({
  path,
  values,
  filters,
  searchPlaceholder,
  searchLabel = 'Search',
  keep = [],
}: {
  path: string;
  values: Record<string, string | undefined>;
  filters: FilterDef[];
  searchPlaceholder: string;
  searchLabel?: string;
  /** Other params to carry through a search, besides sort and dir. */
  keep?: string[];
}) {
  const active = Boolean(values.q) || filters.some((f) => values[f.name]) || keep.some((k) => values[k]);
  return (
    <form method="get" action={path} className={styles.filters} role="search">
      {['sort', 'dir', ...keep].map((k) => (values[k] ? <input key={k} type="hidden" name={k} value={values[k]} /> : null))}
      <label className={`${styles.search} ${styles.filter}`}>
        {searchLabel}
        <input className="input" type="search" name="q" defaultValue={values.q ?? ''} placeholder={searchPlaceholder} />
      </label>
      {filters.map((f) => (
        <label key={f.name} className={styles.filter}>
          {f.label}
          <select
            className="select"
            name={f.name}
            defaultValue={values[f.name] ?? ''}
            onChange={(e) => e.currentTarget.form?.requestSubmit()}
          >
            <option value="">{f.allLabel ?? 'All'}</option>
            {f.options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      ))}
      <div className={styles.filtersActions}>
        <button type="submit" className="btn btn-secondary">
          Search
        </button>
        {active ? (
          <Link href={path} className="btn btn-ghost">
            Clear
          </Link>
        ) : null}
      </div>
    </form>
  );
}
