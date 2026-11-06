/**
 * The signed in app shell: dark sidebar, white header with search, the New
 * menu, the Sample data badge and the user menu. Every page under app/(app)
 * renders inside <div className="app-content">. Pages start with
 * <div className="page"> (or a RecordHeader plus <div className="record-body">).
 */
import { requireUser } from '@/lib/auth';
import { sql } from '@/lib/db';
import { formatAgo } from '@/lib/format';
import { ROLE_LABELS } from '@/lib/permissions';
import { Sidebar, type SyncLine } from '@/components/shell/Sidebar';
import { GlobalSearch } from '@/components/shell/GlobalSearch';
import { NewMenu } from '@/components/shell/NewMenu';
import { UserMenu } from '@/components/shell/UserMenu';
import { NotificationsBell } from '@/components/work/NotificationsBell';

export const dynamic = 'force-dynamic';

async function shellData(userId: string, isAdmin: boolean) {
  const [[tasks], [approvals], lemlist] = await Promise.all([
    sql<{ n: number }[]>`
      select count(*)::int as n from v_open_tasks where owner_user_id = ${userId} and bucket in ('overdue', 'today')`,
    sql<{ n: number }[]>`
      select count(*)::int as n from outbound_messages
       where status = 'awaiting_approval' and (${isAdmin} or owner_user_id = ${userId} or owner_user_id is null)`,
    sql<{ last_success_at: Date | null; last_error_at: Date | null; last_error: string | null }[]>`
      select max(last_success_at) as last_success_at, max(last_error_at) as last_error_at,
             (array_agg(last_error order by last_error_at desc nulls last))[1] as last_error
        from sync_cursors where connector = 'lemlist'`,
  ]);
  const l = lemlist[0];
  let lemlistLine: SyncLine;
  if (l?.last_error_at && (!l.last_success_at || l.last_error_at > l.last_success_at)) {
    lemlistLine = { label: `lemlist sync failed ${formatAgo(l.last_error_at)}`, state: 'error' };
  } else if (l?.last_success_at) {
    const stale = Date.now() - new Date(l.last_success_at).getTime() > 2 * 60 * 60 * 1000;
    lemlistLine = { label: `lemlist synced ${formatAgo(l.last_success_at)}`, state: stale ? 'warn' : 'ok' };
  } else {
    lemlistLine = { label: 'lemlist not synced yet', state: 'off' };
  }
  return {
    taskCount: tasks?.n ?? 0,
    approvalCount: approvals?.n ?? 0,
    sync: [lemlistLine, { label: 'Gmail not connected', state: 'off' }, { label: 'Moneybird not connected', state: 'off' }] as SyncLine[],
  };
}

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser();
  const data = await shellData(user.id, user.role === 'admin');
  const sample = process.env.SAMPLE_DATA === 'true';
  return (
    <div className="app">
      <Sidebar taskCount={data.taskCount} approvalCount={data.approvalCount} sync={data.sync} />
      <main className="app-main">
        <header className="app-header">
          <GlobalSearch />
          {sample ? <span className="sample-badge">Sample data</span> : null}
          <NotificationsBell userId={user.id} />
          <NewMenu />
          <UserMenu name={user.name} initials={user.initials} bg={user.avatarBg} fg={user.avatarFg} roleLabel={ROLE_LABELS[user.role]} />
        </header>
        <div className="app-content">{children}</div>
      </main>
    </div>
  );
}
