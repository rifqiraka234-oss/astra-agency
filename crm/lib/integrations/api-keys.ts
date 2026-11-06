/**
 * lib/integrations/api-keys.ts, scoped API keys for the team's own tools (agent E).
 *
 *   const { key, id } = await createApiKey(t, { name: 'claude-routines', scopes: ['read', 'leads:write'] }, user.id);
 *   // show `key` once, only its sha256 is stored
 *   const found = await verifyApiKey(rawKeyFromHeader);   // null when unknown, revoked or expired
 *
 * V1 has no public API routes yet, verifyApiKey is the seam for them.
 */
import crypto from 'node:crypto';
import { sql, type Db, type Tx } from '../db';

export const API_SCOPES = [
  { value: 'read', label: 'Read everything' },
  { value: 'leads:write', label: 'Write leads' },
  { value: 'tasks:write', label: 'Write tasks' },
  { value: 'contacts:write', label: 'Write contacts and organizations' },
] as const;

export type ApiScope = (typeof API_SCOPES)[number]['value'];

export function hashKey(raw: string): string {
  return crypto.createHash('sha256').update(raw).digest('hex');
}

export function newRawKey(): string {
  return `ast_${crypto.randomBytes(24).toString('hex')}`;
}

export async function createApiKey(t: Tx, input: { name: string; scopes: string[] }, userId: string): Promise<{ id: string; key: string; prefix: string }> {
  const valid = new Set<string>(API_SCOPES.map((s) => s.value));
  const scopes = [...new Set(input.scopes)].filter((s) => valid.has(s));
  if (!scopes.length) throw new Error('Pick at least one scope');
  const key = newRawKey();
  const prefix = key.slice(0, 8);
  const [row] = await t<{ id: string }[]>`
    insert into api_keys (name, key_prefix, key_hash, scopes, created_by)
    values (${input.name.trim()}, ${prefix}, ${hashKey(key)}, ${scopes}, ${userId})
    returning id`;
  return { id: row.id, key, prefix };
}

export async function revokeApiKey(t: Tx, id: string): Promise<boolean> {
  const rows = await t`update api_keys set revoked_at = now() where id = ${id} and revoked_at is null returning id`;
  return rows.length > 0;
}

export type ApiKeyRow = {
  id: string; name: string; key_prefix: string; scopes: string[]; created_at: Date; last_used_at: Date | null;
  revoked_at: Date | null; expires_at: Date | null; created_by_name: string | null;
};

export async function listApiKeys(db: Db = sql): Promise<ApiKeyRow[]> {
  return db<ApiKeyRow[]>`
    select k.id, k.name, k.key_prefix, k.scopes, k.created_at, k.last_used_at, k.revoked_at, k.expires_at, u.name as created_by_name
      from api_keys k left join users u on u.id = k.created_by
     order by k.revoked_at is not null, k.created_at desc`;
}

/** The key's id and scopes when it is live, and its last use is stamped. */
export async function verifyApiKey(raw: string | null | undefined, db: Db = sql): Promise<{ id: string; scopes: string[] } | null> {
  if (!raw || !raw.startsWith('ast_')) return null;
  const [row] = await db<{ id: string; scopes: string[] }[]>`
    update api_keys set last_used_at = now()
     where key_hash = ${hashKey(raw)} and revoked_at is null and (expires_at is null or expires_at > now())
    returning id, scopes`;
  return row ?? null;
}
