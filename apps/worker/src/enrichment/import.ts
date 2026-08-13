import {
  assertImportTransition,
  columnMappingHash,
  describePolicyBlock,
  importIdempotencyKey,
  isConfirmationValid,
  verifyRenderedFields,
  type ConfirmationGate,
  type PipelineProfile,
} from '@astra/core';
import {
  createImportIntent,
  findConfirmationGate,
  recordFieldVerification,
  recordImportResult,
  setImportIntentStatus,
  type Sql,
} from '@astra/db';
import {
  ExternalWriteBlockedError,
  type ImportLeadsRow,
  type LemlistClient,
} from '@astra/integrations';
import type { Logger } from '../logger.js';

/**
 * The import stage (specification section 7.7).
 *
 * Read this in order, because the order is the point:
 *
 *   1. the decision and the message version are already persisted upstream;
 *   2. an import intent row is written, which is the only way to obtain the id
 *      the provider call needs;
 *   3. the guard is asked;
 *   4. only then does Lemlist hear about any of it;
 *   5. the response is reconciled, including the case where we do not know.
 *
 * A crash at any point leaves a row saying exactly how far we got. The 2026-08-11
 * failure — leads live in a campaign with no local record — is unreachable from
 * here because step 4 requires an id that only step 2 can produce.
 */

export const FIELD_MAPPING_GATE = 'FIELD_MAPPING_VERIFIED';

export interface ImportCandidate {
  readonly sourceContactId: string;
  readonly lemlistContactId: string;
  readonly messageVersionId: string;
  readonly messageContentHash: string;
  readonly connectionMessage: string;
  readonly firstMessage: string;
  readonly email: string | null;
  readonly linkedinUrl: string | null;
  readonly firstName: string | null;
  readonly lastName: string | null;
  readonly companyName: string | null;
}

export interface ImportStageInput {
  readonly sql: Sql;
  readonly lemlist: LemlistClient;
  readonly logger: Logger;
  readonly profile: PipelineProfile;
  readonly candidates: readonly ImportCandidate[];
  readonly providerVersion: string;
  /** Config-derived: whether a live import is permitted at all right now. */
  readonly liveImportAllowed: boolean;
}

export interface ImportStageResult {
  readonly attempted: boolean;
  readonly imported: number;
  readonly intentIds: readonly string[];
  readonly status:
    | 'SUCCEEDED'
    | 'FAILED'
    | 'UNKNOWN_REQUIRES_RECONCILIATION'
    | 'REJECTED'
    | 'BLOCKED'
    | 'AWAITING_CONFIRMATION';
  readonly reasonCodes: readonly string[];
  readonly operatorMessage: string | null;
}

export async function runImportStage(input: ImportStageInput): Promise<ImportStageResult> {
  if (input.candidates.length === 0) {
    return {
      attempted: false,
      imported: 0,
      intentIds: [],
      status: 'REJECTED',
      reasonCodes: ['IMPORT_NO_CANDIDATES'],
      operatorMessage: null,
    };
  }

  const campaignId = input.profile.import.destinationCampaignId;
  const mapping = input.profile.import.columnMapping;
  const mappingHash = columnMappingHash(mapping);

  const idempotencyKey = importIdempotencyKey({
    profileId: input.profile.profileId,
    campaignId,
    contactIds: input.candidates.map((c) => c.lemlistContactId),
    messageVersionHashes: input.candidates.map((c) => c.messageContentHash),
    columnMapping: mapping,
  });

  // Step 2: the audit row, before anything else can happen.
  const intentIds: string[] = [];
  for (const candidate of input.candidates) {
    const { intent } = await createImportIntent(input.sql, {
      sourceContactId: candidate.sourceContactId,
      messageVersionId: candidate.messageVersionId,
      campaignId,
      idempotencyKey: `${idempotencyKey}:${candidate.lemlistContactId}`,
    });
    intentIds.push(intent.id);
  }

  const setAll = async (
    from: Parameters<typeof assertImportTransition>[0],
    to: Parameters<typeof assertImportTransition>[1],
    detail: string | null,
  ): Promise<void> => {
    assertImportTransition(from, to);
    for (const id of intentIds) await setImportIntentStatus(input.sql, id, to, detail);
  };

  // The one-time field-mapping confirmation. It lives in the database with its
  // evidence, so a fresh container does not ask Raka again, and a changed
  // mapping invalidates it without anyone having to remember to.
  const gateRow = await findConfirmationGate(input.sql, FIELD_MAPPING_GATE, 'CAMPAIGN', campaignId);
  const gate: ConfirmationGate | null =
    gateRow === null
      ? null
      : {
          gateKey: gateRow.gate_key,
          scope: gateRow.scope,
          scopeId: gateRow.scope_id,
          confirmedAt: gateRow.confirmed_at?.toISOString() ?? null,
          confirmedBy: null,
          evidence: null,
          subjectHash: gateRow.subject_hash ?? '',
          providerVersion: gateRow.provider_version ?? '',
          invalidatedAt: gateRow.invalidated_at?.toISOString() ?? null,
        };
  const confirmation = isConfirmationValid(gate, mappingHash, input.providerVersion);

  if (!input.liveImportAllowed) {
    await setAll('PENDING', 'REJECTED', 'live import gate is closed');
    return {
      attempted: false,
      imported: 0,
      intentIds,
      status: 'REJECTED',
      reasonCodes: ['LIVE_IMPORT_GATE_CLOSED'],
      operatorMessage: null,
    };
  }

  assertImportTransition('PENDING', 'ALLOWED');
  for (const id of intentIds) await setImportIntentStatus(input.sql, id, 'ALLOWED', null);

  const rows: ImportLeadsRow[] = input.candidates.map((c) => ({
    ...(c.email === null ? {} : { email: c.email }),
    ...(c.linkedinUrl === null ? {} : { linkedinUrl: c.linkedinUrl }),
    ...(c.firstName === null ? {} : { firstName: c.firstName }),
    ...(c.lastName === null ? {} : { lastName: c.lastName }),
    ...(c.companyName === null ? {} : { companyName: c.companyName }),
    variables: { connectionMessage: c.connectionMessage, firstMessage: c.firstMessage },
  }));

  await setAll('ALLOWED', 'IN_FLIGHT', null);

  let response;
  try {
    response = await input.lemlist.importLeadsToCampaign({
      campaignId,
      rows,
      columnMapping: mapping,
      idempotencyKey,
    });
  } catch (error) {
    if (error instanceof ExternalWriteBlockedError) {
      await setAll('IN_FLIGHT', 'FAILED', error.message);
      return {
        attempted: true,
        imported: 0,
        intentIds,
        status: 'FAILED',
        reasonCodes: [error.reasonCode],
        operatorMessage: null,
      };
    }
    // We do not know whether Lemlist processed this. Retrying blindly is how
    // duplicates get created, so it stays unreconciled until we ask.
    const detail = error instanceof Error ? error.message : 'unknown transport failure';
    await setAll('IN_FLIGHT', 'UNKNOWN_REQUIRES_RECONCILIATION', detail);
    input.logger.warn('import_unreconciled', { campaignId, detail });
    return {
      attempted: true,
      imported: 0,
      intentIds,
      status: 'UNKNOWN_REQUIRES_RECONCILIATION',
      reasonCodes: ['IMPORT_UNRECONCILED'],
      operatorMessage:
        'The import did not return a definite answer. Query Lemlist for what landed before retrying.',
    };
  }

  if (response.policyBlocked !== undefined) {
    const block = describePolicyBlock('importLeadsToCampaign', response.policyBlocked);
    for (const id of intentIds) {
      await setImportIntentStatus(input.sql, id, 'BLOCKED', block.reasonCode);
    }
    return {
      attempted: true,
      imported: 0,
      intentIds,
      status: 'BLOCKED',
      reasonCodes: [block.reasonCode],
      operatorMessage: block.operatorMessage,
    };
  }

  for (const [index, intentId] of intentIds.entries()) {
    const resultId = await recordImportResult(input.sql, {
      importIntentId: intentId,
      providerResponse: { imported: response.imported },
      providerLeadId: response.leadIds[index] ?? null,
      errorDetail: null,
    });

    // Step 7: a 200 does not prove the custom variables resolved.
    const candidate = input.candidates[index];
    const verification =
      candidate === undefined
        ? { ok: false, failures: [{ contactId: 'unknown', reason: 'candidate missing' }] }
        : verifyRenderedFields([
            {
              contactId: candidate.lemlistContactId,
              variableName: 'connectionMessage',
              renderedValue: candidate.connectionMessage,
            },
            {
              contactId: candidate.lemlistContactId,
              variableName: 'firstMessage',
              renderedValue: candidate.firstMessage,
            },
          ]);
    await recordFieldVerification(input.sql, resultId, verification.ok, verification);
  }

  await setAll('IN_FLIGHT', 'SUCCEEDED', null);

  return {
    attempted: true,
    imported: response.imported,
    intentIds,
    status: 'SUCCEEDED',
    reasonCodes: confirmation.valid ? [] : [confirmation.reasonCode ?? 'CONFIRMATION_PENDING'],
    operatorMessage: confirmation.valid
      ? null
      : 'This is the first import under this field mapping. Confirm in Lemlist that ' +
        'connectionMessage and firstMessage render as real text on a couple of leads, ' +
        'then record the confirmation so future runs do not ask again.',
  };
}
