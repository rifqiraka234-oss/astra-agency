/**
 * /settings shell: the left sub navigation from the Settings design and the
 * panel. Admins only (assertCan manage settings), everyone else gets a short
 * explanation instead of the panel. Agent E's automations and integrations
 * pages render inside this layout too.
 */
import { settingsAccess } from '@/lib/settings/guard';
import { SettingsNav } from '@/components/settings/SettingsNav';
import { EmptyState } from '@/components/ui/EmptyState';
import { ButtonLink } from '@/components/ui/Button';
import s from '@/components/settings/settings.module.css';

export const dynamic = 'force-dynamic';

export default async function SettingsLayout({ children }: { children: React.ReactNode }) {
  const { allowed } = await settingsAccess();
  if (!allowed) {
    return (
      <div className="page">
        <h1 className="page-title">Settings</h1>
        <div className="card card-pad">
          <EmptyState
            title="Settings are for admins"
            body="Fields, pipelines, users, imports and the audit log can only be changed by an admin. Ask an admin if something needs to change."
            action={<ButtonLink href="/" variant="secondary">Back to your day</ButtonLink>}
          />
        </div>
      </div>
    );
  }
  return (
    <div className={s.layout}>
      <div className={s.side}>
        <h1 className={s.sideTitle}>Settings</h1>
        <SettingsNav />
      </div>
      <div className={s.panel}>{children}</div>
    </div>
  );
}
