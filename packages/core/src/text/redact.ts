/**
 * Central redaction.
 *
 * Every log line, notification body and audit payload passes through here.
 * The rule is that a secret should be unrecoverable from a log even if the
 * whole log is leaked, so we replace rather than truncate.
 */

const REDACTED = '[REDACTED]';

/** Object keys whose values are never safe to log, matched case-insensitively. */
const SENSITIVE_KEY_PATTERN =
  /(secret|token|api[_-]?key|password|passwd|authorization|auth|credential|cookie|session|refresh|access[_-]?key|private[_-]?key|signature|encryption[_-]?key)/i;

/** Value shapes that are secrets regardless of the key they arrived under. */
const VALUE_PATTERNS: ReadonlyArray<{ readonly pattern: RegExp; readonly replacement: string }> = [
  // Authorization headers in raw request/response dumps.
  { pattern: /\b(bearer|basic)\s+[A-Za-z0-9._~+/=-]{8,}/gi, replacement: `$1 ${REDACTED}` },
  // Anthropic keys.
  { pattern: /\bsk-ant-[A-Za-z0-9_-]{10,}/g, replacement: REDACTED },
  // Resend keys.
  { pattern: /\bre_[A-Za-z0-9_-]{16,}/g, replacement: REDACTED },
  // Netlify personal access tokens (64 hex chars).
  { pattern: /\bnfp_[A-Za-z0-9]{16,}/g, replacement: REDACTED },
  // Google OAuth client secrets and refresh tokens.
  { pattern: /\b(GOCSPX-[A-Za-z0-9_-]{10,}|1\/\/[A-Za-z0-9._-]{20,})/g, replacement: REDACTED },
  // JSON Web Tokens.
  { pattern: /\beyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}/g, replacement: REDACTED },
];

/** Extra literal secrets registered at boot (webhook secret, API keys). */
const registeredSecrets = new Set<string>();

/**
 * Register a literal secret value so it is scrubbed wherever it appears, even
 * inside an unexpected field. Values shorter than 8 characters are ignored:
 * redacting a short string would corrupt unrelated log text.
 */
export function registerSecret(value: string | undefined | null): void {
  if (typeof value === 'string' && value.trim().length >= 8) {
    registeredSecrets.add(value.trim());
  }
}

export function clearRegisteredSecretsForTests(): void {
  registeredSecrets.clear();
}

export function redactString(input: string): string {
  let output = input;
  for (const secret of registeredSecrets) {
    if (output.includes(secret)) {
      output = output.split(secret).join(REDACTED);
    }
  }
  for (const { pattern, replacement } of VALUE_PATTERNS) {
    output = output.replace(pattern, replacement);
  }
  return output;
}

/**
 * Deep-redact an arbitrary value. Cyclic structures are tolerated because
 * error objects and HTTP clients routinely contain them.
 */
export function redact<T>(value: T, seen = new WeakSet<object>()): unknown {
  if (typeof value === 'string') return redactString(value);
  if (value === null || value === undefined) return value;
  if (typeof value !== 'object') return value;

  if (seen.has(value as object)) return '[CIRCULAR]';
  seen.add(value as object);

  if (value instanceof Error) {
    return {
      name: value.name,
      message: redactString(value.message),
      stack: value.stack ? redactString(value.stack) : undefined,
    };
  }
  if (value instanceof Date) return value.toISOString();
  if (Array.isArray(value)) return value.map((item) => redact(item, seen));

  const output: Record<string, unknown> = {};
  for (const [key, item] of Object.entries(value as Record<string, unknown>)) {
    output[key] = SENSITIVE_KEY_PATTERN.test(key) ? REDACTED : redact(item, seen);
  }
  return output;
}

/**
 * Raw inbound email HTML is never logged in full: it is large, it is attacker
 * controlled, and it frequently contains personal data we have no reason to
 * duplicate into a log store.
 */
export function summarizeHtmlForLog(html: string): string {
  return `[html ${html.length} bytes, sha-prefix ${simpleFingerprint(html)}]`;
}

function simpleFingerprint(input: string): string {
  let hash = 0;
  for (let index = 0; index < input.length; index += 1) {
    hash = (hash * 31 + input.charCodeAt(index)) | 0;
  }
  return (hash >>> 0).toString(16).padStart(8, '0');
}
