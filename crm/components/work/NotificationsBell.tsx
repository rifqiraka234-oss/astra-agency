/**
 * The header bell (agent C). A server component: it turns due reminders into
 * notifications (idempotent, no worker needed) and hands the list to the menu.
 *   <NotificationsBell userId={user.id} />     mounted in app/(app)/layout.tsx
 */
import { listNotifications, materialiseReminders } from '@/lib/work/reminders';
import { formatAgo } from '@/lib/format';
import { NotificationsMenu } from './NotificationsMenu';

export async function NotificationsBell({ userId }: { userId: string }) {
  let data: Awaited<ReturnType<typeof listNotifications>> = { items: [], unread: 0 };
  try {
    await materialiseReminders();
    data = await listNotifications(userId);
  } catch (err) {
    // The bell must never take the whole page down.
    console.error('notifications bell', err);
  }
  const now = new Date();
  return (
    <NotificationsMenu
      unread={data.unread}
      items={data.items.map((n) => ({ id: n.id, title: n.title, body: n.body, url: n.url, read: !!n.readAt, when: formatAgo(n.createdAt, now) }))}
    />
  );
}
