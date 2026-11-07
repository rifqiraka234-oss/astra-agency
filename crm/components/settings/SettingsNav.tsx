'use client';
/** The left sub navigation of /settings, from the Settings design. Active item follows the URL. */
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import s from './settings.module.css';

export const SETTINGS_SECTIONS = [
  { href: '/settings/fields', label: 'Fields', sub: 'Custom fields per object' },
  { href: '/settings/pipelines', label: 'Pipelines and stages', sub: 'Probability, required fields' },
  { href: '/settings/reasons', label: 'Reasons', sub: 'Why leads and deals close' },
  { href: '/settings/automations', label: 'Automations', sub: 'Triggers, conditions, actions' },
  { href: '/settings/users', label: 'Users and roles', sub: 'Who sees and edits what' },
  { href: '/settings/integrations', label: 'Integrations and API', sub: 'lemlist, Gmail, Moneybird' },
  { href: '/settings/import', label: 'Import and export', sub: 'CSV, with undo', also: ['/settings/export'] },
  { href: '/settings/duplicates', label: 'Duplicates', sub: 'Rules and merge history' },
  { href: '/settings/audit', label: 'Audit log', sub: 'Every change, who made it' },
] as const;

export function SettingsNav() {
  const pathname = usePathname() ?? '';
  return (
    <nav aria-label="Settings" style={{ display: 'contents' }}>
      {SETTINGS_SECTIONS.map((x) => {
        const paths: readonly string[] = [x.href, ...('also' in x ? x.also : [])];
        const active = paths.some((p) => pathname === p || pathname.startsWith(`${p}/`));
        return (
          <Link key={x.href} href={x.href} className={s.navItem} aria-current={active ? 'page' : undefined}>
            <span className={s.navLabel}>{x.label}</span>
            <span className={s.navSub}>{x.sub}</span>
          </Link>
        );
      })}
    </nav>
  );
}
