import { createHash, timingSafeEqual } from 'node:crypto';

/**
 * Canonical hashing.
 *
 * Approvals, freshness checks and idempotency keys all compare hashes, so the
 * canonical form has to be insensitive to things that do not change meaning
 * (trailing whitespace, CRLF, non-normalized Unicode) and sensitive to
 * everything that does.
 */

export function canonicalizeText(text: string): string {
  return text
    .normalize('NFC')
    .replace(/\r\n?/g, '\n')
    .split('\n')
    .map((line) => line.replace(/[ \t]+$/g, ''))
    .join('\n')
    .trim();
}

export function sha256Hex(input: string): string {
  return createHash('sha256').update(input, 'utf8').digest('hex');
}

/** Hash of the canonical form of a message body. */
export function contentHash(text: string): string {
  return sha256Hex(canonicalizeText(text));
}

/**
 * A stable fingerprint of an entire conversation. Any new, edited or removed
 * message changes this, which is what makes a pending approval go stale.
 */
export function conversationHash(
  messages: ReadonlyArray<{
    readonly externalId: string;
    readonly occurredAt: Date | string;
    readonly direction: string;
    readonly bodyText: string;
  }>,
): string {
  const canonical = messages
    .map((message) => {
      const occurredAt =
        message.occurredAt instanceof Date
          ? message.occurredAt.toISOString()
          : new Date(message.occurredAt).toISOString();
      return [
        message.externalId,
        occurredAt,
        message.direction,
        contentHash(message.bodyText),
      ].join('');
    })
    .join('');
  return sha256Hex(canonical);
}

/** Stable hash of arbitrary structured data, with key order normalized. */
export function structuralHash(value: unknown): string {
  return sha256Hex(stableStringify(value));
}

export function stableStringify(value: unknown): string {
  if (value === null || typeof value !== 'object') return JSON.stringify(value) ?? 'null';
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(',')}]`;
  const entries = Object.entries(value as Record<string, unknown>)
    .filter(([, v]) => v !== undefined)
    .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
    .map(([key, v]) => `${JSON.stringify(key)}:${stableStringify(v)}`);
  return `{${entries.join(',')}}`;
}

/**
 * Constant-time string comparison for secrets. Length is compared through the
 * digest so the comparison itself does not leak the secret's length.
 */
export function secureCompare(a: string, b: string): boolean {
  const digestA = createHash('sha256').update(a, 'utf8').digest();
  const digestB = createHash('sha256').update(b, 'utf8').digest();
  return timingSafeEqual(digestA, digestB);
}

/**
 * Idempotency key for an outbound action. Deriving it from the exact content
 * means a retry of the same decision collapses, while a changed message is
 * correctly treated as a different send.
 */
export function outboundIdempotencyKey(input: {
  readonly contactId: string;
  readonly latestInboundActivityId: string | null;
  readonly actionType: string;
  readonly contentHash: string;
}): string {
  return sha256Hex(
    [
      input.contactId,
      input.latestInboundActivityId ?? 'none',
      input.actionType,
      input.contentHash,
    ].join(''),
  );
}
