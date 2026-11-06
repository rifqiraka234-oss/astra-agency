/**
 * lib/settings/guard.ts, who may use /settings. Admins only (the role grid says
 * "Settings, fields, automations" is admin only).
 *
 *   // server action
 *   const user = await settingsUser();
 *   if (!user) return fail(NO_SETTINGS_ACCESS);
 *
 *   // layout or page
 *   const access = await settingsAccess(); // { user, allowed }
 */
import 'server-only';
import { requireUser, type CurrentUser } from '@/lib/auth';
import { assertCan, ForbiddenError } from '@/lib/permissions';

export const NO_SETTINGS_ACCESS = 'Only admins can change settings';

/** The signed in user and whether they may open settings. Redirects to /login when signed out. */
export async function settingsAccess(): Promise<{ user: CurrentUser; allowed: boolean }> {
  const user = await requireUser();
  try {
    assertCan(user, 'manage', 'settings');
    return { user, allowed: true };
  } catch (err) {
    if (err instanceof ForbiddenError) return { user, allowed: false };
    throw err;
  }
}

/** The signed in admin, or null when the user may not manage settings. For server actions. */
export async function settingsUser(): Promise<CurrentUser | null> {
  const { user, allowed } = await settingsAccess();
  return allowed ? user : null;
}
