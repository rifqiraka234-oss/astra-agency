'use client';
/**
 * The dark sidebar from the design files. Active link follows the URL.
 * Counts and sync lines come from app/(app)/layout.tsx.
 */
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '../ui/Icon';

export type SyncLine = { label: string; state: 'ok' | 'warn' | 'error' | 'off' };

type NavItem = { href: string; label: string; icon: string; count?: number };

function isActive(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);
}

export function Sidebar({ taskCount, approvalCount, sync }: { taskCount: number; approvalCount: number; sync: SyncLine[] }) {
  const pathname = usePathname() ?? '/';
  const sections: { label: string; items: NavItem[] }[] = [
    {
      label: 'Work',
      items: [
        { href: '/', label: 'Home', icon: 'home' },
        { href: '/tasks', label: 'Tasks', icon: 'tasks', count: taskCount },
        { href: '/pipelines', label: 'Pipelines', icon: 'pipelines' },
        { href: '/approvals', label: 'Approvals', icon: 'approvals', count: approvalCount },
      ],
    },
    {
      label: 'Records',
      items: [
        { href: '/organizations', label: 'Organizations', icon: 'organizations' },
        { href: '/contacts', label: 'Contacts', icon: 'contacts' },
        { href: '/leads', label: 'Leads', icon: 'leads' },
        { href: '/deals', label: 'Deals', icon: 'deals' },
        { href: '/projects', label: 'Projects', icon: 'projects' },
        { href: '/tickets', label: 'Tickets', icon: 'tickets' },
        { href: '/invoices', label: 'Invoices', icon: 'invoices' },
      ],
    },
    { label: 'Admin', items: [{ href: '/settings', label: 'Settings', icon: 'settings' }] },
  ];

  return (
    <nav aria-label="Main" className="sidebar">
      <Link href="/" className="sidebar-brand">
        <span className="brand-mark" aria-hidden="true">
          A
        </span>
        <span className="brand-name">Astra CRM</span>
      </Link>
      {sections.map((s) => (
        <div key={s.label} className="nav-section">
          <div className="nav-label">{s.label}</div>
          {s.items.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link" aria-current={isActive(pathname, item.href) ? 'page' : undefined}>
              <Icon name={item.icon} />
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.count ? (
                <span className="nav-count" aria-label={`${item.count} open`}>
                  {item.count}
                </span>
              ) : null}
            </Link>
          ))}
        </div>
      ))}
      <div className="sidebar-footer">
        {sync.map((line) => (
          <div key={line.label} className="sync-line">
            <span className={`sync-dot ${line.state}`} aria-hidden="true" />
            {line.label}
          </div>
        ))}
      </div>
    </nav>
  );
}
