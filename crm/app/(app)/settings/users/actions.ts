'use server';
/** Server actions for /settings/users. Admin only through settingsAction. */
import { settingsAction } from '@/lib/settings/action';
import { inviteUser, resetPassword, setActive, setRole, setTeam } from '@/lib/settings/users';
import { fail, str, type ActionState } from '@/lib/forms';
import type { Role } from '@/lib/permissions';
import { logSecurityEvent } from '@/lib/audit';

const PATHS = ['/settings/users'];

/** Returns data { password } once. It is never stored in clear text or shown again. */
export async function inviteUserAction(_p: ActionState, fd: FormData): Promise<ActionState> {
  return settingsAction(
    async (t, user) => {
      const res = await inviteUser(t, { name: str(fd, 'name') ?? '', email: str(fd, 'email') ?? '', role: (str(fd, 'role') ?? '') as Role, teamId: str(fd, 'team_id') });
      await logSecurityEvent(t, 'user_invited', { userId: res.id }, user.id);
      return res;
    },
    { paths: PATHS, message: 'User added' },
  );
}

export async function resetPasswordAction(_p: ActionState, fd: FormData): Promise<ActionState> {
  const id = str(fd, 'id');
  if (!id) return fail('Pick a user');
  return settingsAction(
    async (t, user) => {
      const password = await resetPassword(t, id);
      await logSecurityEvent(t, 'password_reset', { userId: id }, user.id);
      return { id, password };
    },
    { paths: PATHS, message: 'New temporary password made' },
  );
}

export async function updateUserAction(_p: ActionState, fd: FormData): Promise<ActionState> {
  const id = str(fd, 'id');
  if (!id) return fail('Pick a user');
  const role = str(fd, 'role') as Role | null;
  const team = str(fd, 'team_id');
  return settingsAction(
    async (t, user) => {
      if (role) await setRole(t, user.id, id, role);
      await setTeam(t, id, team);
    },
    { paths: PATHS, message: 'Saved' },
  );
}

export async function setActiveAction(_p: ActionState, fd: FormData): Promise<ActionState> {
  const id = str(fd, 'id');
  if (!id) return fail('Pick a user');
  const active = str(fd, 'active') === 'true';
  return settingsAction((t, user) => setActive(t, user.id, id, active), { paths: PATHS, message: active ? 'User active again' : 'User deactivated, signed out on their next click' });
}
