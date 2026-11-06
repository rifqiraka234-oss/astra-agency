'use client';
/**
 * The grey segmented control (whose day, lead or sales pipeline, owner filter).
 *   <Segmented label="Whose day" items={[{ value: 'raka', label: 'Raka', href: '/?who=raka' }, ...]} value={who} />
 *   <Segmented label="Owner" items={owners} value={owner} onChange={setOwner} />
 * Classes: seg, seg-item.
 */
import Link from 'next/link';

export type SegmentedItem = { value: string; label: string; href?: string };

export function Segmented({ items, value, onChange, label }: { items: SegmentedItem[]; value: string; onChange?: (v: string) => void; label: string }) {
  return (
    <div role="group" aria-label={label} className="seg">
      {items.map((it) =>
        it.href ? (
          <Link key={it.value} href={it.href} className="seg-item" aria-current={it.value === value ? 'true' : undefined} scroll={false}>
            {it.label}
          </Link>
        ) : (
          <button key={it.value} type="button" className="seg-item" aria-pressed={it.value === value} onClick={() => onChange?.(it.value)}>
            {it.label}
          </button>
        ),
      )}
    </div>
  );
}
