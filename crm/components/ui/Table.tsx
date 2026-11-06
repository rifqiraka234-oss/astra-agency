/**
 * A data table with link based sorting, so it works in server components.
 *
 *   <Table
 *     columns={[
 *       { key: 'name', label: 'Name', sortable: true, render: (o) => <Link className="cell-link" href={`/organizations/${o.id}`}>{o.name}</Link> },
 *       { key: 'open_value', label: 'Open value', num: true, render: (o) => formatMoney(o.open_value) },
 *     ]}
 *     rows={orgs}
 *     rowKey={(o) => o.id}
 *     sort={{ key: sp.sort ?? 'name', dir: sp.dir === 'desc' ? 'desc' : 'asc' }}
 *     sortHref={sortHrefFor('/organizations', sp)}
 *     empty={<EmptyState title="No organizations yet" />}
 *   />
 *
 * Classes: table-wrap, table, num (right aligned mono), is-muted (grey row), sort-link, cell-link.
 */
import Link from 'next/link';
import type { ReactNode } from 'react';

export type SortDir = 'asc' | 'desc';

export type Column<T> = {
  key: string;
  label: ReactNode;
  sortable?: boolean;
  /** Right aligned, Geist Mono. */
  num?: boolean;
  width?: string | number;
  render?: (row: T, index: number) => ReactNode;
};

export type TableProps<T> = {
  columns: Column<T>[];
  rows: T[];
  rowKey: (row: T, index: number) => string;
  sort?: { key: string; dir: SortDir };
  sortHref?: (key: string, dir: SortDir) => string;
  empty?: ReactNode;
  minWidth?: number;
  caption?: ReactNode;
  rowClassName?: (row: T) => string | undefined;
};

/** Builds sortHref for a list page from its path and current search params (other params are kept). */
export function sortHrefFor(path: string, params: Record<string, string | string[] | undefined> = {}) {
  return (key: string, dir: SortDir) => {
    const q = new URLSearchParams();
    for (const [k, v] of Object.entries(params)) {
      if (v === undefined || k === 'sort' || k === 'dir' || k === 'page') continue;
      for (const item of Array.isArray(v) ? v : [v]) q.append(k, item);
    }
    q.set('sort', key);
    q.set('dir', dir);
    return `${path}?${q.toString()}`;
  };
}

export function Table<T>({ columns, rows, rowKey, sort, sortHref, empty, minWidth = 640, caption, rowClassName }: TableProps<T>) {
  if (rows.length === 0 && empty) return <>{empty}</>;
  return (
    <div className="table-wrap">
      <table className="table" style={{ minWidth }}>
        {caption ? <caption className="sr-only">{caption}</caption> : null}
        <thead>
          <tr>
            {columns.map((c) => {
              const active = sort?.key === c.key;
              const nextDir: SortDir = active && sort?.dir === 'asc' ? 'desc' : 'asc';
              return (
                <th
                  key={c.key}
                  scope="col"
                  className={c.num ? 'num' : undefined}
                  style={c.width ? { width: c.width } : undefined}
                  aria-sort={active ? (sort?.dir === 'asc' ? 'ascending' : 'descending') : undefined}
                >
                  {c.sortable && sortHref ? (
                    <Link className="sort-link" href={sortHref(c.key, nextDir)} aria-current={active ? 'true' : undefined}>
                      {c.label}
                      <span aria-hidden="true">{active ? (sort?.dir === 'asc' ? '↑' : '↓') : ''}</span>
                    </Link>
                  ) : (
                    c.label
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={rowKey(row, i)} className={rowClassName?.(row)}>
              {columns.map((c) => (
                <td key={c.key} className={c.num ? 'num' : undefined}>
                  {c.render ? c.render(row, i) : String((row as Record<string, unknown>)[c.key] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
