/**
 * lib/settings/action.ts, the wrapper every /settings server action uses:
 * admin check, one transaction with the actor for the audit log, friendly
 * errors, revalidatePath.
 *
 *   'use server';
 *   export async function archiveField(_p: ActionState, fd: FormData) {
 *     return settingsAction((t, user) => setFieldArchived(t, str(fd, 'id')!, true), { paths: ['/settings/fields'], message: 'Field archived' });
 *   }
 */
import 'server-only';
import { revalidatePath } from 'next/cache';
import { tx, isUniqueViolation, type Tx } from '@/lib/db';
import type { CurrentUser } from '@/lib/auth';
import { fail, type ActionState } from '@/lib/forms';
import { ForbiddenError } from '@/lib/permissions';
import { NO_SETTINGS_ACCESS, settingsUser } from './guard';
import { SettingsError } from './errors';

export async function settingsAction<T>(
  fn: (t: Tx, user: CurrentUser) => Promise<T>,
  opts: { paths?: string[]; source?: string; message?: string | ((result: T) => string) } = {},
): Promise<ActionState> {
  const user = await settingsUser();
  if (!user) return fail(NO_SETTINGS_ACCESS);
  try {
    const result = await tx((t) => fn(t, user), { userId: user.id, source: opts.source ?? 'ui' });
    for (const p of opts.paths ?? []) revalidatePath(p);
    const message = typeof opts.message === 'function' ? opts.message(result) : opts.message;
    return { ok: true, message, data: result as unknown, id: typeof result === 'string' ? result : undefined };
  } catch (err) {
    if (err instanceof SettingsError) return fail(err.message, err.fieldErrors, { data: err.details });
    if (err instanceof ForbiddenError) return fail(err.message);
    if (isUniqueViolation(err)) return fail('That value is already used by another record, nothing was changed');
    console.error('[settings action]', err);
    return fail('Something went wrong, nothing was changed');
  }
}
