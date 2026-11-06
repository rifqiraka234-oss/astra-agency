'use server';
/**
 * Bell actions (agent C). A user only ever marks their own notifications.
 *   markNotificationReadAction(id)   one
 *   markAllNotificationsReadAction() all unread
 */
import { revalidatePath } from 'next/cache';
import { requireUser } from '@/lib/auth';
import { sql } from '@/lib/db';
import { markRead } from './reminders';

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function markNotificationReadAction(id: string): Promise<{ ok: boolean }> {
  const user = await requireUser();
  if (!UUID.test(id)) return { ok: false };
  await markRead(sql, user.id, id);
  revalidatePath('/', 'layout');
  return { ok: true };
}

export async function markAllNotificationsReadAction(): Promise<{ ok: boolean; count: number }> {
  const user = await requireUser();
  const count = await markRead(sql, user.id, null);
  revalidatePath('/', 'layout');
  return { ok: true, count };
}
