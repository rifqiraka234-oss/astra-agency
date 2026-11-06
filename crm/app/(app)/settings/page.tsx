import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';

const SECTIONS = [
  { href: '/settings/fields', label: 'Fields', sub: 'Custom fields per object' },
  { href: '/settings/pipelines', label: 'Pipelines and stages', sub: 'Probability, required fields' },
  { href: '/settings/automations', label: 'Automations', sub: 'Triggers, conditions, actions' },
  { href: '/settings/users', label: 'Users and roles', sub: 'Who sees and edits what' },
  { href: '/settings/integrations', label: 'Integrations', sub: 'lemlist sync status' },
  { href: '/settings/import', label: 'Import and export', sub: 'CSV with undo' },
  { href: '/settings/duplicates', label: 'Duplicates', sub: 'Rules and merge history' },
  { href: '/settings/audit', label: 'Audit log', sub: 'Every change, who made it' },
];

export default function SettingsPage() {
  return (
    <div className="page">
      <PageHeader title="Settings" subtitle="Built by agent D" />
      <div className="card">
        {SECTIONS.map((s) => (
          <Link key={s.href} href={s.href} className="card-row" style={{ flexDirection: 'column', gap: 2, color: 'var(--ink)' }}>
            <span style={{ fontWeight: 500 }}>{s.label}</span>
            <span className="small muted">{s.sub}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
