/**
 * lib/auth.ts, who is signed in. Server only.
 *
 *   // server component or server action
 *   const user = await requireUser();          // redirects to /login when signed out
 *   if (!can(user, 'edit', 'deal', deal)) ...
 *   await tx(async (t) => { ... }, { userId: user.id });
 *
 *   // route handler, no redirect
 *   const user = await getCurrentUser();
 *   if (!user) return Response.json({ error: 'Sign in first' }, { status: 401 });
 *
 *   await signIn(email, password)   // { ok: true, user } or { ok: false, error }, sets the cookie
 *   await signOut()                 // clears the cookie
 *
 * The cookie holds a signed JWT (lib/session.ts). Every request re-reads the user
 * from the database, so a deactivated user is out on their next click.
 */
import 'server-only';
import { cache } from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs';
import { sql } from './db';
import { logSecurityEvent } from './audit';
import { SESSION_COOKIE, SESSION_MAX_AGE, signSession, verifySession, type SessionPayload } from './session';
import type { Role } from './permissions';

export type CurrentUser = {
  id: string;
  email: string;
  name: string;
  role: Role;
  initials: string;
  avatarBg: string;
  avatarFg: string;
  teamIds: string[];
  /** Everyone who shares a team with this user, themselves included. permissions.ts uses it for team scope. */
  teamMemberIds: string[];
};

/** The verified cookie payload, or null. Cheap, no database. */
export async function getSession(): Promise<SessionPayload | null> {
  const store = await cookies();
  return verifySession(store.get(SESSION_COOKIE)?.value);
}

/** The signed in, active user, or null. Cached for the request. */
export const getCurrentUser = cache(async (): Promise<CurrentUser | null> => {
  const session = await getSession();
  if (!session) return null;
  const [row] = await sql<
    { id: string; email: string; name: string; role: Role; initials: string | null; avatar_bg: string | null; avatar_fg: string | null; team_ids: string[]; team_member_ids: string[] }[]
  >`
    select u.id, u.email, u.name, u.role, u.initials, u.avatar_bg, u.avatar_fg,
           coalesce((select array_agg(tm.team_id) from team_members tm where tm.user_id = u.id), '{}') as team_ids,
           coalesce((select array_agg(distinct tm2.user_id) from team_members tm
                       join team_members tm2 on tm2.team_id = tm.team_id where tm.user_id = u.id), array[u.id]) as team_member_ids
      from users u
     where u.id = ${session.sub} and u.is_active`;
  if (!row) return null;
  return {
    id: row.id,
    email: row.email,
    name: row.name,
    role: row.role,
    initials: row.initials ?? row.name.slice(0, 2).toUpperCase(),
    avatarBg: row.avatar_bg ?? '#E8EEFD',
    avatarFg: row.avatar_fg ?? '#1E40AF',
    teamIds: row.team_ids,
    teamMemberIds: row.team_member_ids.includes(row.id) ? row.team_member_ids : [...row.team_member_ids, row.id],
  };
});

/** The signed in user. Redirects to /login when there is none. */
export async function requireUser(): Promise<CurrentUser> {
  const user = await getCurrentUser();
  if (!user) redirect('/login');
  return user;
}

export type SignInResult = { ok: true; user: { id: string; name: string } } | { ok: false; error: string };

/** Check the password, set the session cookie. */
export async function signIn(email: string, password: string): Promise<SignInResult> {
  const clean = email.trim().toLowerCase();
  const [user] = await sql<{ id: string; email: string; name: string; role: Role; password_hash: string | null; is_active: boolean }[]>`
    select id, email, name, role, password_hash, is_active from users where lower(trim(email)) = ${clean}`;
  const ok = Boolean(user && user.is_active && user.password_hash && (await bcrypt.compare(password, user.password_hash)));
  if (!user || !ok) {
    await logSecurityEvent(sql, 'sign_in_failed', { email: clean }, user?.id ?? null);
    return { ok: false, error: "That email and password don't match" };
  }
  const token = await signSession({ sub: user.id, email: user.email, name: user.name, role: user.role });
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  });
  await sql`update users set last_login_at = now() where id = ${user.id}`;
  await logSecurityEvent(sql, 'sign_in', { email: user.email }, user.id);
  return { ok: true, user: { id: user.id, name: user.name } };
}

/** Clear the session cookie. */
export async function signOut(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

/** bcrypt hash for a new password (user invites, seed). */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}
