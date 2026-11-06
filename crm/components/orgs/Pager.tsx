/**
 * Agent A. "Showing 1 to 50 of 127" with Previous and Next links that keep the
 * other search params.
 */
import Link from 'next/link';
import styles from './orgs.module.css';

export function Pager({
  path,
  params,
  page,
  pageSize,
  total,
  noun,
}: {
  path: string;
  params: Record<string, string | undefined>;
  page: number;
  pageSize: number;
  total: number;
  noun: [string, string];
}) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const href = (p: number) => {
    const q = new URLSearchParams();
    for (const [k, v] of Object.entries(params)) if (v && k !== 'page') q.set(k, v);
    if (p > 1) q.set('page', String(p));
    const s = q.toString();
    return s ? `${path}?${s}` : path;
  };
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(total, page * pageSize);
  return (
    <div className={styles.listFoot}>
      <span>
        {total === 0 ? (
          `No ${noun[1]}`
        ) : (
          <>
            Showing <span className="mono">{from}</span> to <span className="mono">{to}</span> of <span className="mono">{total}</span>{' '}
            {total === 1 ? noun[0] : noun[1]}
          </>
        )}
      </span>
      {pages > 1 ? (
        <nav aria-label="Pages" className={styles.pagerLinks}>
          {page > 1 ? (
            <Link className="btn btn-secondary btn-sm" href={href(page - 1)}>
              Previous
            </Link>
          ) : (
            <span className="btn btn-secondary btn-sm" aria-disabled="true" style={{ opacity: 0.5 }}>
              Previous
            </span>
          )}
          {page < pages ? (
            <Link className="btn btn-secondary btn-sm" href={href(page + 1)}>
              Next
            </Link>
          ) : (
            <span className="btn btn-secondary btn-sm" aria-disabled="true" style={{ opacity: 0.5 }}>
              Next
            </span>
          )}
        </nav>
      ) : null}
    </div>
  );
}
