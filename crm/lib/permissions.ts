/**
 * lib/permissions.ts, the role grid from the Settings design (Users and roles).
 * Pure, safe in client code. Enforced in every server action; the UI also uses
 * it to hide buttons.
 *
 *   import { can, assertCan } from '@/lib/permissions';
 *   if (!can(user, 'edit', 'deal', deal)) return { ok: false, error: "You can't edit this deal" };
 *   assertCan(user, 'delete', 'organization');            // throws ForbiddenError
 *
 * Roles: admin, sales, account_manager. Scopes: all, team, own, none.
 *   own   the record's owner_user_id (or account_manager_user_id, or a task's
 *         owner) is the user, or the record has no owner yet
 *   team  own, or the owner is in one of the user's teams (user.teamMemberIds)
 * Called without a record, can() answers "could this user do it to some record",
 * so own and team count as yes. Pass the record for the real check.
 * Invoices are special for account managers: they can edit drafts only.
 */

export type Role = 'admin' | 'sales' | 'account_manager';
export type Scope = 'all' | 'team' | 'own' | 'none';
export type Action = 'view' | 'create' | 'edit' | 'delete' | 'approve' | 'export' | 'import' | 'merge' | 'manage';
export type ObjectType =
  | 'organization'
  | 'contact'
  | 'lead'
  | 'deal'
  | 'project'
  | 'ticket'
  | 'invoice'
  | 'task'
  | 'activity'
  | 'outbound_message'
  | 'settings'
  | 'user'
  | 'audit';

/** The minimum a permission check needs. CurrentUser from lib/auth.ts fits. */
export type PermUser = {
  id: string;
  role: Role;
  /** Ids of every user who shares a team with this user (themselves included). */
  teamMemberIds?: string[];
};

/** The record fields a check looks at. Pass the row as it came from the database. */
export type PermRecord = {
  owner_user_id?: string | null;
  account_manager_user_id?: string | null;
  created_by?: string | null;
  created_by_user_id?: string | null;
  state?: string | null; // invoices
  [key: string]: unknown;
};

type Grid = Record<ObjectType, Partial<Record<Action, Scope>>>;

const RECORDS: ObjectType[] = ['organization', 'contact', 'lead', 'deal', 'project', 'ticket', 'invoice', 'task', 'activity', 'outbound_message'];

function base(view: Scope, create: Scope, edit: Scope, del: Scope): Partial<Record<Action, Scope>> {
  return { view, create, edit, delete: del, merge: del };
}

const ADMIN: Grid = Object.fromEntries(
  [...RECORDS, 'settings', 'user', 'audit'].map((o) => [
    o,
    { view: 'all', create: 'all', edit: 'all', delete: 'all', approve: 'all', export: 'all', import: 'all', merge: 'all', manage: 'all' },
  ]),
) as Grid;

const SALES: Grid = {
  organization: base('all', 'all', 'all', 'none'),
  contact: base('all', 'all', 'all', 'none'),
  lead: base('all', 'all', 'own', 'none'),
  deal: base('all', 'all', 'own', 'none'),
  project: base('all', 'none', 'own', 'none'),
  ticket: base('all', 'all', 'own', 'none'),
  invoice: base('all', 'none', 'none', 'none'),
  task: base('all', 'all', 'own', 'none'),
  activity: base('all', 'all', 'own', 'none'),
  outbound_message: { ...base('all', 'all', 'own', 'none'), approve: 'own' },
  settings: { view: 'none' },
  user: { view: 'all' },
  audit: { view: 'none' },
};

const ACCOUNT_MANAGER: Grid = {
  organization: base('all', 'all', 'all', 'none'),
  contact: base('all', 'all', 'all', 'none'),
  lead: base('all', 'all', 'team', 'none'),
  deal: base('all', 'all', 'team', 'none'),
  project: base('all', 'all', 'team', 'none'),
  ticket: base('all', 'all', 'all', 'none'),
  invoice: base('all', 'all', 'all', 'none'), // drafts only, see can()
  task: base('all', 'all', 'own', 'none'),
  activity: base('all', 'all', 'own', 'none'),
  outbound_message: { ...base('all', 'all', 'own', 'none'), approve: 'own' },
  settings: { view: 'none' },
  user: { view: 'all' },
  audit: { view: 'none' },
};

export const ROLE_GRID: Record<Role, Grid> = { admin: ADMIN, sales: SALES, account_manager: ACCOUNT_MANAGER };

export const ROLE_LABELS: Record<Role, string> = { admin: 'Admin', sales: 'Sales', account_manager: 'Account manager' };

/** The rows of the "What each role can do" table on /settings/users, worded as the design. */
export const PERMISSION_TABLE: { permission: string; admin: string; sales: string; account_manager: string; client: string }[] = [
  { permission: 'View organizations and contacts', admin: 'All', sales: 'All', account_manager: 'All', client: 'Own organization only' },
  { permission: 'Edit deals', admin: 'All', sales: 'Own', account_manager: 'Team', client: 'None' },
  { permission: 'Delete records', admin: 'All', sales: 'None', account_manager: 'None', client: 'None' },
  { permission: 'Approve and send messages', admin: 'Yes', sales: 'Own', account_manager: 'Own', client: 'No' },
  { permission: 'Invoices', admin: 'All', sales: 'View', account_manager: 'Edit drafts', client: 'View own' },
  { permission: 'Export', admin: 'Yes', sales: 'No', account_manager: 'No', client: 'No' },
  { permission: 'Settings, fields, automations', admin: 'Yes', sales: 'No', account_manager: 'No', client: 'No' },
];

/** The scope a role has for an action on an object type. Unknown combinations are none. */
export function scopeFor(user: Pick<PermUser, 'role'> | null | undefined, action: Action, objectType: ObjectType): Scope {
  if (!user) return 'none';
  const grid = ROLE_GRID[user.role];
  if (!grid) return 'none';
  const entry = grid[objectType];
  if (!entry) return 'none';
  return entry[action] ?? 'none';
}

function ownerIds(record: PermRecord): string[] {
  return [record.owner_user_id, record.account_manager_user_id].filter(
    (x): x is string => typeof x === 'string' && x.length > 0,
  );
}

function isOwn(user: PermUser, record: PermRecord): boolean {
  const owners = ownerIds(record);
  // Unassigned records count as own (HubSpot's "unassigned" toggle), so nobody is locked out of the queue.
  if (owners.length === 0) return true;
  return owners.includes(user.id);
}

function isTeam(user: PermUser, record: PermRecord): boolean {
  if (isOwn(user, record)) return true;
  const team = new Set(user.teamMemberIds ?? [user.id]);
  return ownerIds(record).some((id) => team.has(id));
}

/** Can this user do this action on this object type (and record, when given)? */
export function can(user: PermUser | null | undefined, action: Action, objectType: ObjectType, record?: PermRecord | null): boolean {
  if (!user) return false;
  const scope = scopeFor(user, action, objectType);
  if (scope === 'none') return false;
  // Account managers edit draft invoices only. Sales only view them.
  if (objectType === 'invoice' && user.role === 'account_manager' && (action === 'edit' || action === 'delete')) {
    if (record && record.state && record.state !== 'draft') return false;
  }
  if (scope === 'all' || !record) return true;
  if (scope === 'own') return isOwn(user, record);
  return isTeam(user, record);
}

export class ForbiddenError extends Error {
  status = 403;
  constructor(message = "You don't have permission to do that") {
    super(message);
    this.name = 'ForbiddenError';
  }
}

/** Throws ForbiddenError when can() says no. */
export function assertCan(user: PermUser | null | undefined, action: Action, objectType: ObjectType, record?: PermRecord | null): void {
  if (!can(user, action, objectType, record)) throw new ForbiddenError();
}

/** True for admins. Settings pages, user admin, export, import, merge and the audit log. */
export function isAdmin(user: Pick<PermUser, 'role'> | null | undefined): boolean {
  return user?.role === 'admin';
}
