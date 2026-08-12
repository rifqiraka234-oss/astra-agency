/**
 * Safe import transaction (specification section 7.7).
 *
 * The historical failure was ordering: a batch was imported into Lemlist and
 * the audit trail was written afterwards, so a crash between the two left rows
 * live in a campaign with no local record that they existed. The rule here is
 * absolute and expressed as a state machine rather than a convention, because
 * a convention is what failed.
 *
 *   PENDING -> ALLOWED -> IN_FLIGHT -> SUCCEEDED
 *                                   -> FAILED
 *                                   -> UNKNOWN_REQUIRES_RECONCILIATION
 *   PENDING -> REJECTED   (gate closed, never attempted)
 *
 * `UNKNOWN_REQUIRES_RECONCILIATION` exists because a timed-out import is not a
 * failed import. Retrying one blindly is how duplicates get created; the only
 * correct next step is to query Lemlist for what actually landed.
 */

import { contentHash } from '../text/hash.js';

export const IMPORT_STATUSES = [
  'PENDING',
  'ALLOWED',
  'IN_FLIGHT',
  'SUCCEEDED',
  'FAILED',
  'UNKNOWN_REQUIRES_RECONCILIATION',
  'REJECTED',
] as const;
export type ImportStatus = (typeof IMPORT_STATUSES)[number];

const IMPORT_TRANSITIONS: Readonly<Record<ImportStatus, readonly ImportStatus[]>> = {
  PENDING: ['ALLOWED', 'REJECTED'],
  ALLOWED: ['IN_FLIGHT', 'REJECTED'],
  IN_FLIGHT: ['SUCCEEDED', 'FAILED', 'UNKNOWN_REQUIRES_RECONCILIATION'],
  // Reconciliation is the only path out of the unknown state, and it may
  // resolve either way once the provider has actually been asked.
  UNKNOWN_REQUIRES_RECONCILIATION: ['SUCCEEDED', 'FAILED'],
  SUCCEEDED: [],
  FAILED: [],
  REJECTED: [],
};

export class IllegalImportTransitionError extends Error {
  constructor(
    readonly from: ImportStatus,
    readonly to: ImportStatus,
  ) {
    super(`Illegal import transition ${from} -> ${to}`);
    this.name = 'IllegalImportTransitionError';
  }
}

export function assertImportTransition(from: ImportStatus, to: ImportStatus): void {
  if (!IMPORT_TRANSITIONS[from].includes(to)) {
    throw new IllegalImportTransitionError(from, to);
  }
}

export function isImportTerminal(status: ImportStatus): boolean {
  return IMPORT_TRANSITIONS[status].length === 0;
}

/** A retry is only ever safe from a genuinely failed attempt. */
export function mayRetryImport(status: ImportStatus): boolean {
  return status === 'FAILED';
}

export interface ImportIntentInput {
  readonly profileId: string;
  readonly campaignId: string;
  /** Stable contact IDs in the batch, order-independent. */
  readonly contactIds: readonly string[];
  /** Hash of the exact message versions being imported. */
  readonly messageVersionHashes: readonly string[];
  readonly columnMapping: Readonly<Record<string, string>>;
}

/**
 * The idempotency key covers the campaign, the exact contacts and the exact
 * message text. Re-importing the same contacts with revised copy is a
 * different operation and gets a different key, which is correct: it is a new
 * write, not a duplicate of the old one.
 */
export function importIdempotencyKey(input: ImportIntentInput): string {
  const canonical = [
    input.profileId,
    input.campaignId,
    [...input.contactIds].sort().join(','),
    [...input.messageVersionHashes].sort().join(','),
    Object.entries(input.columnMapping)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => `${k}=${v}`)
      .join(','),
  ].join('|');
  return contentHash(canonical);
}

export interface FieldRenderVerification {
  readonly contactId: string;
  readonly variableName: string;
  readonly renderedValue: string;
}

export interface FieldRenderResult {
  readonly ok: boolean;
  readonly failures: readonly { readonly contactId: string; readonly reason: string }[];
}

/**
 * Post-import verification (section 7.7 step 7). A successful API response
 * does not prove the custom variables resolved: a header/variable-name
 * mismatch imports happily and leaves `{{connectionMessage}}` sitting in the
 * lead record as literal text.
 */
export function verifyRenderedFields(
  verifications: readonly FieldRenderVerification[],
): FieldRenderResult {
  const failures: { contactId: string; reason: string }[] = [];
  for (const v of verifications) {
    const value = v.renderedValue.trim();
    if (value.length === 0) {
      failures.push({ contactId: v.contactId, reason: `${v.variableName} is empty` });
      continue;
    }
    if (/\{\{[^}]*\}\}/.test(value)) {
      failures.push({
        contactId: v.contactId,
        reason: `${v.variableName} still contains an unresolved placeholder`,
      });
    }
  }
  return { ok: failures.length === 0, failures };
}

// --- persistent confirmation gates ------------------------------------------

/**
 * A one-time confirmation, such as "the field mapping renders correctly", is
 * durable configuration with evidence attached, not a fact that lives in a chat
 * transcript. It is invalidated automatically when the thing it confirmed
 * changes, which is why the mapping hash and provider version are part of it.
 */
export interface ConfirmationGate {
  readonly gateKey: string;
  readonly scope: string;
  readonly scopeId: string | null;
  readonly confirmedAt: string | null;
  readonly confirmedBy: string | null;
  readonly evidence: string | null;
  /** Hash of whatever the confirmation was about. */
  readonly subjectHash: string;
  readonly providerVersion: string;
  readonly invalidatedAt: string | null;
}

export function isConfirmationValid(
  gate: ConfirmationGate | null,
  currentSubjectHash: string,
  currentProviderVersion: string,
): { readonly valid: boolean; readonly reasonCode: string | null } {
  if (gate === null) return { valid: false, reasonCode: 'CONFIRMATION_NEVER_GIVEN' };
  if (gate.invalidatedAt !== null) return { valid: false, reasonCode: 'CONFIRMATION_INVALIDATED' };
  if (gate.confirmedAt === null) return { valid: false, reasonCode: 'CONFIRMATION_PENDING' };
  if (gate.subjectHash !== currentSubjectHash) {
    return { valid: false, reasonCode: 'CONFIRMATION_SUBJECT_CHANGED' };
  }
  if (gate.providerVersion !== currentProviderVersion) {
    return { valid: false, reasonCode: 'CONFIRMATION_PROVIDER_CHANGED' };
  }
  return { valid: true, reasonCode: null };
}

export function columnMappingHash(mapping: Readonly<Record<string, string>>): string {
  return contentHash(
    Object.entries(mapping)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => `${k}=${v}`)
      .join('\n'),
  );
}

// --- policy blocks -----------------------------------------------------------

/**
 * When a platform safety classifier blocks the authorized import operation, the
 * block is surfaced and the run stops that branch. Renaming the operation or
 * routing through a different endpoint to get the same effect is prohibited:
 * that is circumventing a safeguard, not working around a bug.
 */
export function describePolicyBlock(operation: string, providerMessage: string): {
  readonly reasonCode: string;
  readonly operatorMessage: string;
  readonly mayRetrySameCall: boolean;
  readonly maySubstituteOperation: false;
} {
  return {
    reasonCode: 'IMPORT_BLOCKED_BY_PROVIDER_POLICY',
    operatorMessage:
      `The authorized operation ${operation} was blocked by the provider's safety classifier: ` +
      `${providerMessage}. The run stopped this branch rather than routing around it.`,
    mayRetrySameCall: true,
    maySubstituteOperation: false,
  };
}
