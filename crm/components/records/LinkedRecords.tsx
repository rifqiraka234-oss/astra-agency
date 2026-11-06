/**
 * Right rail cards from the Organization design.
 *
 *   <LinkedRecords title="People here" items={[{ title: 'Eva Jansen', sub: 'Owner · decision maker', href, avatar: { name: 'Eva Jansen' } }]} />
 *   <LinkedRecords title="Open deal" href={`/deals/${d.id}`} items={[{ title: 'Taproom booking app', meta: '€14,500 · Proposal sent', status: { text: 'Follow up due today', tone: 'amber' } }]} />
 *   <LinkedRecords title="Project" items={[{ title: 'Website rebuild', sub: 'Build stage · 31 of 40 hours · due 20 Nov', progress: 78 }]} />
 *
 * With `href` the whole card is a link (single record cards). Classes: rail-card, rail-item, rail-entry.
 */
import Link from 'next/link';
import type { ReactNode } from 'react';
import { Avatar } from '../ui/Avatar';
import type { Tone } from '@/lib/options';

export type LinkedItem = {
  title: ReactNode;
  sub?: ReactNode;
  href?: string;
  /** Shown in Geist Mono under the title, for amounts. */
  meta?: ReactNode;
  status?: { text: ReactNode; tone?: Tone };
  avatar?: { name: string; initials?: string; bg?: string | null; fg?: string | null };
  /** 0 to 100, a green bar. */
  progress?: number;
};

const TONE_COLOR: Record<Tone, string> = {
  grey: 'var(--text-muted)',
  blue: 'var(--link)',
  amber: 'var(--warning)',
  green: 'var(--success)',
  red: 'var(--danger)',
};

function Entry({ item, linkable }: { item: LinkedItem; linkable: boolean }) {
  const body = item.avatar ? (
    <>
      <Avatar name={item.avatar.name} initials={item.avatar.initials} bg={item.avatar.bg} fg={item.avatar.fg} size="sm" />
      <div style={{ minWidth: 0 }}>
        <div className="rail-item-title">{item.title}</div>
        {item.sub ? <div className="rail-item-sub">{item.sub}</div> : null}
      </div>
    </>
  ) : (
    <>
      <span className="rail-item-title">{item.title}</span>
      {item.meta ? <span className="rail-item-meta">{item.meta}</span> : null}
      {item.sub ? <span className="text-13 secondary">{item.sub}</span> : null}
      {item.status ? (
        <span className="rail-status" style={{ color: TONE_COLOR[item.status.tone ?? 'grey'], fontWeight: item.status.tone === 'red' ? 500 : 400 }}>
          {item.status.text}
        </span>
      ) : null}
      {typeof item.progress === 'number' ? (
        <div className="progress" aria-label={`${Math.round(item.progress)} percent`}>
          <span style={{ width: `${Math.max(0, Math.min(100, item.progress))}%` }} />
        </div>
      ) : null}
    </>
  );
  const cls = item.avatar ? 'rail-item' : 'rail-entry';
  if (item.href && linkable) {
    return (
      <Link href={item.href} className={cls}>
        {body}
      </Link>
    );
  }
  return <div className={cls}>{body}</div>;
}

export function LinkedRecords({
  title,
  items,
  href,
  empty,
  action,
}: {
  title: string;
  items: LinkedItem[];
  /** Makes the whole card one link. */
  href?: string;
  empty?: ReactNode;
  action?: ReactNode;
}) {
  const content = (
    <>
      <div className="row-between" style={{ gap: 8 }}>
        <h2 className="section-label">{title}</h2>
        {action}
      </div>
      {items.length === 0 ? <div className="muted text-13">{empty ?? 'Nothing linked yet'}</div> : null}
      {items.map((item, i) => (
        <Entry key={i} item={item} linkable={!href} />
      ))}
    </>
  );
  return href ? (
    <Link href={href} className="rail-card">
      {content}
    </Link>
  ) : (
    <section className="rail-card">{content}</section>
  );
}
