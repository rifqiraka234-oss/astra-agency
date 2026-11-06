/**
 * The white record header from the Organization and Deal designs.
 *   <RecordHeader
 *     breadcrumb={[{ label: 'Organizations', href: '/organizations' }, { label: org.name }]}
 *     title={org.name}
 *     avatar={{ name: org.name, initials: 'DK', bg: '#1F3A2E', fg: '#F2E6C9' }}
 *     badges={[{ label: 'Customer', tone: 'green', strong: true }, { label: 'dekade.nl' }]}
 *     sample={isSample}
 *     actions={<><Button>Log activity</Button><Button variant="primary">Write email</Button></>}
 *     tabs={<Tabs items={...} active={tab} />}
 *   />
 * Then render the body in <div className="record-body"> with record-left, record-main, record-right.
 */
import Link from 'next/link';
import type { ReactNode } from 'react';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import type { Tone } from '@/lib/options';

export type Crumb = { label: string; href?: string };
export type HeaderBadge = { label: string; tone?: Tone; strong?: boolean };

export function RecordHeader({
  breadcrumb,
  title,
  avatar,
  badges = [],
  sample,
  actions,
  tabs,
  subtitle,
}: {
  breadcrumb?: Crumb[];
  title: ReactNode;
  avatar?: { name: string; initials?: string; bg?: string | null; fg?: string | null };
  badges?: HeaderBadge[];
  sample?: boolean;
  actions?: ReactNode;
  tabs?: ReactNode;
  subtitle?: ReactNode;
}) {
  return (
    <header className={['record-header', tabs ? '' : 'no-tabs'].filter(Boolean).join(' ')}>
      {breadcrumb?.length ? (
        <nav aria-label="Breadcrumb" className="breadcrumb">
          {breadcrumb.map((c, i) => (
            <span key={i}>
              {i > 0 ? ' / ' : ''}
              {c.href ? <Link href={c.href}>{c.label}</Link> : c.label}
            </span>
          ))}
        </nav>
      ) : null}
      <div className="record-title-row">
        <div className="record-identity">
          {avatar ? <Avatar name={avatar.name} initials={avatar.initials} bg={avatar.bg} fg={avatar.fg} shape="square" /> : null}
          <div className="stack-sm" style={{ gap: 6, minWidth: 0 }}>
            <h1 className="record-title">{title}</h1>
            {subtitle ? <div className="muted text-13">{subtitle}</div> : null}
            {badges.length || sample ? (
              <div className="record-badges">
                {badges.map((b, i) => (
                  <Badge key={i} tone={b.tone ?? 'grey'} size="lg" className={b.strong ? 'strong' : undefined}>
                    {b.label}
                  </Badge>
                ))}
                {sample ? (
                  <Badge tone="amber" size="lg">
                    Sample data
                  </Badge>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
        {actions ? <div className="page-actions">{actions}</div> : null}
      </div>
      {tabs}
    </header>
  );
}
