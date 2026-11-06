'use client';
/**
 * Record tabs with the orange underline (Organization design).
 * Link tabs (server friendly, state in the URL):
 *   <Tabs items={[{ id: 'timeline', label: 'Timeline', count: 10, href: '?tab=timeline' }, ...]} active={tab} />
 * Client tabs:
 *   <Tabs items={[{ id: 'a', label: 'A' }]} active={tab} onSelect={setTab} />
 * Classes: tabs, tab, tab-count.
 */
import Link from 'next/link';

export type TabItem = { id: string; label: string; count?: number | string; href?: string };

export function Tabs({ items, active, onSelect, label = 'Record sections' }: { items: TabItem[]; active: string; onSelect?: (id: string) => void; label?: string }) {
  return (
    <div role="tablist" aria-label={label} className="tabs">
      {items.map((t) => {
        const selected = t.id === active;
        const content = (
          <>
            {t.label}
            {t.count !== undefined ? <span className="tab-count">{t.count}</span> : null}
          </>
        );
        return t.href ? (
          <Link key={t.id} role="tab" aria-selected={selected} className="tab" href={t.href} scroll={false}>
            {content}
          </Link>
        ) : (
          <button key={t.id} type="button" role="tab" aria-selected={selected} className="tab" onClick={() => onSelect?.(t.id)}>
            {content}
          </button>
        );
      })}
    </div>
  );
}
