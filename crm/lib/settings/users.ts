/**
 * lib/settings/users.ts, the people who can sign in (server only).
 *
 *   const { id, password } = await tx((t) => inviteUser(t, { name, email, role, teamId }), { userId });
 *   // show password once, it is never stored or shown again
 *   await tx((t) => setRole(t, actorId, userId, 'sales'), { userId: actorId });
 *   await tx((t) => setActive(t, actorId, userId, false), { userId: actorId });
 *
 * There is always at least one active admin, and nobody demotes or
 * deactivates themselves.
 */
import { randomBytes } from 'node:crypto';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import type { Db, Tx } from '@/lib/db';
import { normEmail } from '@/lib/normalize';
import type { Role } from '@/lib/permissions';
import { SettingsError } from './errors';

export type UserRow = {
  id: string;
  name: string;
  email: string;
  role: Role;
  is_active: boolean;
  initials: string | null;
  avatar_bg: string | null;
  avatar_fg: string | null;
  last_login_at: Date | null;
  created_at: Date;
  team_id: string | null;
  team_name: string | null;
};

export async function listUsers(db: Db): Promise<UserRow[]> {
  return db<UserRow[]>`
    select u.id, u.name, u.email, u.role, u.is_active, u.initials, u.avatar_bg, u.avatar_fg, u.last_login_at, u.created_at,
           (select tm.team_id from team_members tm join teams tt on tt.id = tm.team_id where tm.user_id = u.id order by tt.name limit 1) as team_id,
           (select string_agg(tt.name, ', ' order by tt.name) from team_members tm join teams tt on tt.id = tm.team_id where tm.user_id = u.id) as team_name
      from users u
     order by u.is_active desc, u.name`;
}

export async function listTeams(db: Db) {
  return db<{ id: string; name: string }[]>`select id, name from teams order by name`;
}

/** 14 characters, letters and digits without look alikes. */
export function tempPassword(): string {
  const alphabet = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const bytes = randomBytes(14);
  return Array.from(bytes, (b) => alphabet[b % alphabet.length]).join('');
}

const ROLES = ['admin', 'sales', 'account_manager'] as const;

const inviteSchema = z.object({
  name: z.string({ message: 'Give their name' }).trim().min(1, 'Give their name').max(100),
  email: z.string({ message: 'Give their email' }).trim().min(1, 'Give their email'),
  role: z.enum(ROLES, { message: 'Pick a role' }),
  teamId: z.string().uuid().nullable().optional(),
});
export type InviteInput = z.input<typeof inviteSchema>;

function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? '') + (parts.length > 1 ? parts[parts.length - 1][0] : parts[0]?.[1] ?? '')).toUpperCase();
}

export async function inviteUser(t: Tx, raw: InviteInput): Promise<{ id: string; password: string }> {
  const parsed = inviteSchema.safeParse(raw);
  if (!parsed.success) {
    const fe: Record<string, string> = {};
    for (const i of parsed.error.issues) fe[String(i.path[0] ?? '_')] ??= i.message;
    throw new SettingsError('Check the highlighted fields', fe);
  }
  const v = parsed.data;
  const email = normEmail(v.email);
  if (!email) throw new SettingsError('Check the highlighted fields', { email: 'Enter an email address' });
  const [taken] = await t<{ name: string }[]>`select name from users where lower(trim(email)) = ${email}`;
  if (taken) throw new SettingsError(`${email} already belongs to ${taken.name}`, { email: 'Already a user' });
  const password = tempPassword();
  const hash = await bcrypt.hash(password, 10);
  const [u] = await t<{ id: string }[]>`
    insert into users (email, name, initials, role, password_hash, is_active)
    values (${email}, ${v.name}, ${initialsOf(v.name)}, ${v.role}, ${hash}, true)
    returning id`;
  if (v.teamId) await t`insert into team_members (team_id, user_id) values (${v.teamId}, ${u.id}) on conflict do nothing`;
  return { id: u.id, password };
}

/** A new temporary password, shown once. */
export async function resetPassword(t: Tx, userId: string): Promise<string> {
  const password = tempPassword();
  const hash = await bcrypt.hash(password, 10);
  const res = await t`update users set password_hash = ${hash} where id = ${userId}`;
  if (!res.count) throw new SettingsError('That user no longer exists');
  return password;
}

async function otherActiveAdmins(t: Tx, userId: string): Promise<number> {
  const [r] = await t<{ n: number }[]>`select count(*)::int as n from users where role = 'admin' and is_active and id <> ${userId}`;
  return r.n;
}

export async function setRole(t: Tx, actorId: string, userId: string, role: Role): Promise<void> {
  if (!ROLES.includes(role as (typeof ROLES)[number])) throw new SettingsError('Pick a role');
  const [u] = await t<{ role: Role; is_active: boolean }[]>`select role, is_active from users where id = ${userId} for update`;
  if (!u) throw new SettingsError('That user no longer exists');
  if (u.role === role) return;
  if (userId === actorId) throw new SettingsError("You can't change your own role, ask another admin");
  if (u.role === 'admin' && u.is_active && (await otherActiveAdmins(t, userId)) === 0) throw new SettingsError('Keep at least one active admin');
  await t`update users set role = ${role} where id = ${userId}`;
}

export async function setActive(t: Tx, actorId: string, userId: string, active: boolean): Promise<void> {
  const [u] = await t<{ role: Role; is_active: boolean }[]>`select role, is_active from users where id = ${userId} for update`;
  if (!u) throw new SettingsError('That user no longer exists');
  if (u.is_active === active) return;
  if (!active && userId === actorId) throw new SettingsError("You can't deactivate yourself");
  if (!active && u.role === 'admin' && (await otherActiveAdmins(t, userId)) === 0) throw new SettingsError('Keep at least one active admin');
  await t`update users set is_active = ${active} where id = ${userId}`;
}

/** Put a user in one team, or none. */
export async function setTeam(t: Tx, userId: string, teamId: string | null): Promise<void> {
  await t`delete from team_members where user_id = ${userId} and (${teamId}::uuid is null or team_id <> ${teamId})`;
  if (teamId) await t`insert into team_members (team_id, user_id) values (${teamId}, ${userId}) on conflict do nothing`;
}
