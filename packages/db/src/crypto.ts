import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto';

/**
 * Application-layer authenticated encryption for integration credentials.
 *
 * OAuth refresh tokens are the most dangerous thing this system stores: one of
 * them is standing access to the operator's calendar. They are encrypted
 * before they reach Postgres with a key that lives outside the database, so a
 * database dump alone is not enough to use them.
 */

const ALGORITHM = 'aes-256-gcm';
const IV_BYTES = 12;
const TAG_BYTES = 16;
const VERSION = 'v1';

export class EncryptionKeyError extends Error {}

export function loadEncryptionKey(base64Key: string): Buffer {
  let key: Buffer;
  try {
    key = Buffer.from(base64Key, 'base64');
  } catch {
    throw new EncryptionKeyError('ENCRYPTION_KEY is not valid base64');
  }
  if (key.length < 32) {
    throw new EncryptionKeyError(
      `ENCRYPTION_KEY must decode to at least 32 bytes, got ${key.length}`,
    );
  }
  return key.subarray(0, 32);
}

/**
 * Returns `v1.<iv>.<tag>.<ciphertext>`, all base64url. The version prefix is
 * what makes key rotation possible without guessing at the stored format.
 */
export function encryptSecret(plaintext: string, key: Buffer): string {
  const iv = randomBytes(IV_BYTES);
  const cipher = createCipheriv(ALGORITHM, key, iv);
  const ciphertext = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return [VERSION, b64(iv), b64(tag), b64(ciphertext)].join('.');
}

export function decryptSecret(payload: string, key: Buffer): string {
  const parts = payload.split('.');
  if (parts.length !== 4 || parts[0] !== VERSION) {
    throw new EncryptionKeyError('Unrecognized ciphertext format');
  }
  const iv = unb64(parts[1] ?? '');
  const tag = unb64(parts[2] ?? '');
  const ciphertext = unb64(parts[3] ?? '');
  if (iv.length !== IV_BYTES || tag.length !== TAG_BYTES) {
    throw new EncryptionKeyError('Ciphertext has an invalid IV or authentication tag length');
  }
  const decipher = createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(tag);
  // A tampered payload throws here rather than returning corrupted plaintext.
  return Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString('utf8');
}

function b64(buffer: Buffer): string {
  return buffer.toString('base64url');
}

function unb64(value: string): Buffer {
  return Buffer.from(value, 'base64url');
}
