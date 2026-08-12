import { decryptSecret, encryptSecret, loadEncryptionKey } from './crypto.js';
import { getPool, query, queryOne, type Sql } from './client.js';

/**
 * Integration credential storage.
 *
 * OAuth refresh tokens are the most dangerous thing this system holds: one of
 * them is standing access to the operator's calendar. They are encrypted at
 * the application layer before they reach Postgres, with a key that lives in
 * the environment, so a database dump alone is not enough to use them.
 *
 * Credentials are read on demand rather than at startup. That is what makes
 * "reconnect the calendar" take effect immediately instead of after a
 * redeploy, and it means a disconnected provider starts failing its queries
 * straight away, which the controller turns into a handoff.
 */

export type IntegrationProvider =
  | 'LEMLIST'
  | 'ANTHROPIC'
  | 'NETLIFY'
  | 'GOOGLE_CALENDAR'
  | 'MICROSOFT_CALENDAR'
  | 'RESEND';

export type ConnectionStatus = 'CONNECTED' | 'DISCONNECTED' | 'EXPIRED' | 'ERROR';

export interface StoredCredentials {
  readonly refreshToken: string;
  readonly [key: string]: string;
}

export interface ConnectionRow {
  readonly provider: IntegrationProvider;
  readonly accountIdentifier: string | null;
  readonly status: ConnectionStatus;
  readonly scopes: readonly string[];
  readonly lastVerifiedAt: Date | null;
  readonly lastError: string | null;
}

function key(): Buffer {
  const raw = process.env['ENCRYPTION_KEY'];
  if (!raw) throw new Error('ENCRYPTION_KEY is not set, so credentials cannot be stored or read');
  return loadEncryptionKey(raw);
}

export async function saveIntegrationCredentials(
  sql: Sql,
  input: {
    provider: IntegrationProvider;
    accountIdentifier: string;
    credentials: StoredCredentials;
    scopes: readonly string[];
  },
): Promise<void> {
  const ciphertext = encryptSecret(JSON.stringify(input.credentials), key());

  await query(
    sql,
    `INSERT INTO integration_connections
       (provider, account_identifier, status, encrypted_credentials, scopes, last_verified_at, last_error)
     VALUES ($1, $2, 'CONNECTED', $3, $4, now(), NULL)
     ON CONFLICT (provider, coalesce(account_identifier, '')) DO UPDATE SET
       status                = 'CONNECTED',
       encrypted_credentials = excluded.encrypted_credentials,
       scopes                = excluded.scopes,
       last_verified_at      = now(),
       last_error            = NULL,
       updated_at            = now()`,
    [input.provider, input.accountIdentifier, ciphertext, input.scopes],
  );
}

/**
 * Returns null rather than throwing when the provider is not connected. A
 * missing credential is an ordinary, expected state that has to fail the
 * query rather than crash the job.
 */
export async function loadIntegrationCredentials(
  sql: Sql,
  provider: IntegrationProvider,
  accountIdentifier: string,
): Promise<StoredCredentials | null> {
  const row = await queryOne<{ encrypted_credentials: string | null; status: ConnectionStatus }>(
    sql,
    `SELECT encrypted_credentials, status FROM integration_connections
     WHERE provider = $1 AND coalesce(account_identifier, '') = $2`,
    [provider, accountIdentifier],
  );

  if (!row?.encrypted_credentials || row.status === 'DISCONNECTED') return null;

  try {
    return JSON.parse(decryptSecret(row.encrypted_credentials, key())) as StoredCredentials;
  } catch {
    // Ciphertext we cannot decrypt means the key rotated without the stored
    // credentials being re-encrypted. Report it as an error state rather than
    // letting a decryption failure surface as a confusing auth failure later.
    await markConnectionStatus(sql, provider, accountIdentifier, {
      status: 'ERROR',
      error: 'stored credentials could not be decrypted with the current ENCRYPTION_KEY',
    });
    return null;
  }
}

export async function markConnectionStatus(
  sql: Sql,
  provider: IntegrationProvider,
  accountIdentifier: string,
  input: { status: ConnectionStatus; error?: string | null },
): Promise<void> {
  await query(
    sql,
    `UPDATE integration_connections
     SET status = $3, last_error = $4, updated_at = now(),
         last_verified_at = CASE WHEN $3 = 'CONNECTED' THEN now() ELSE last_verified_at END
     WHERE provider = $1 AND coalesce(account_identifier, '') = $2`,
    [provider, accountIdentifier, input.status, input.error ?? null],
  );
}

/** Disconnect wipes the ciphertext rather than only flipping a flag. */
export async function disconnectIntegration(
  sql: Sql,
  provider: IntegrationProvider,
  accountIdentifier: string,
): Promise<void> {
  await query(
    sql,
    `UPDATE integration_connections
     SET status = 'DISCONNECTED', encrypted_credentials = NULL, scopes = '{}',
         last_error = NULL, updated_at = now()
     WHERE provider = $1 AND coalesce(account_identifier, '') = $2`,
    [provider, accountIdentifier],
  );
}

export async function listConnections(sql: Sql = getPool()): Promise<ConnectionRow[]> {
  const rows = await query<{
    provider: IntegrationProvider;
    account_identifier: string | null;
    status: ConnectionStatus;
    scopes: string[];
    last_verified_at: Date | null;
    last_error: string | null;
  }>(
    sql,
    `SELECT provider, account_identifier, status, scopes, last_verified_at, last_error
     FROM integration_connections ORDER BY provider`,
  );

  return rows.map((row) => ({
    provider: row.provider,
    accountIdentifier: row.account_identifier,
    status: row.status,
    scopes: row.scopes ?? [],
    lastVerifiedAt: row.last_verified_at,
    lastError: row.last_error,
  }));
}

/**
 * A loader suitable for handing to a calendar provider. Reading through this
 * on every token refresh is what lets a reconnect take effect without a
 * restart.
 */
export function refreshTokenLoader(
  provider: IntegrationProvider,
  accountIdentifier: string,
): () => Promise<string | null> {
  return async () => {
    const credentials = await loadIntegrationCredentials(getPool(), provider, accountIdentifier);
    return credentials?.refreshToken ?? null;
  };
}
