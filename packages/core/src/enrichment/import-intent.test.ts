import { describe, expect, it } from 'vitest';
import {
  IllegalImportTransitionError,
  assertImportTransition,
  columnMappingHash,
  describePolicyBlock,
  importIdempotencyKey,
  isConfirmationValid,
  mayRetryImport,
  verifyRenderedFields,
  type ConfirmationGate,
  type ImportIntentInput,
} from './import-intent.js';

const intent: ImportIntentInput = {
  profileId: 'new-businesses',
  campaignId: 'cam_Co5CJXrpPFf5MRAfD',
  contactIds: ['c1', 'c2'],
  messageVersionHashes: ['h1', 'h2'],
  columnMapping: { connectionMessage: 'connectionMessage', firstMessage: 'firstMessage' },
};

describe('import ordering', () => {
  it('never allows a write before the audit row exists', () => {
    // There is no edge from PENDING straight to IN_FLIGHT.
    expect(() => {
      assertImportTransition('PENDING', 'IN_FLIGHT');
    }).toThrow(IllegalImportTransitionError);
  });

  it('walks the legal path from persistence to reconciliation', () => {
    expect(() => {
      assertImportTransition('PENDING', 'ALLOWED');
      assertImportTransition('ALLOWED', 'IN_FLIGHT');
      assertImportTransition('IN_FLIGHT', 'SUCCEEDED');
    }).not.toThrow();
  });

  it('rejects a closed-gate intent without ever attempting a write', () => {
    expect(() => {
      assertImportTransition('PENDING', 'REJECTED');
    }).not.toThrow();
    expect(() => {
      assertImportTransition('REJECTED', 'IN_FLIGHT');
    }).toThrow(IllegalImportTransitionError);
  });
});

describe('timeouts are not failures', () => {
  it('refuses to retry an unreconciled import', () => {
    expect(mayRetryImport('UNKNOWN_REQUIRES_RECONCILIATION')).toBe(false);
    expect(mayRetryImport('FAILED')).toBe(true);
    expect(mayRetryImport('SUCCEEDED')).toBe(false);
  });

  it('lets reconciliation resolve the unknown state either way', () => {
    expect(() => {
      assertImportTransition('UNKNOWN_REQUIRES_RECONCILIATION', 'SUCCEEDED');
    }).not.toThrow();
    expect(() => {
      assertImportTransition('UNKNOWN_REQUIRES_RECONCILIATION', 'FAILED');
    }).not.toThrow();
  });
});

describe('idempotency key', () => {
  it('is order independent across contacts and message hashes', () => {
    const reordered: ImportIntentInput = {
      ...intent,
      contactIds: ['c2', 'c1'],
      messageVersionHashes: ['h2', 'h1'],
    };

    expect(importIdempotencyKey(intent)).toBe(importIdempotencyKey(reordered));
  });

  it('changes when the message text changes, so revised copy is a new write', () => {
    const revised: ImportIntentInput = { ...intent, messageVersionHashes: ['h1', 'h3'] };

    expect(importIdempotencyKey(intent)).not.toBe(importIdempotencyKey(revised));
  });

  it('changes when the column mapping changes', () => {
    const remapped: ImportIntentInput = {
      ...intent,
      columnMapping: { connectionMessage: 'connection_message', firstMessage: 'firstMessage' },
    };

    expect(importIdempotencyKey(intent)).not.toBe(importIdempotencyKey(remapped));
  });
});

describe('post-import field rendering', () => {
  it('catches a custom field that imported as a literal placeholder', () => {
    const result = verifyRenderedFields([
      { contactId: 'c1', variableName: 'connectionMessage', renderedValue: '{{connectionMessage}}' },
    ]);

    expect(result.ok).toBe(false);
    expect(result.failures[0]?.reason).toContain('unresolved placeholder');
  });

  it('catches an empty custom field', () => {
    const result = verifyRenderedFields([
      { contactId: 'c1', variableName: 'firstMessage', renderedValue: '   ' },
    ]);

    expect(result.ok).toBe(false);
  });

  it('passes when the fields hold real text', () => {
    const result = verifyRenderedFields([
      {
        contactId: 'c1',
        variableName: 'firstMessage',
        renderedValue: 'Saw the site is a placeholder. Want a sketch?',
      },
    ]);

    expect(result.ok).toBe(true);
  });
});

describe('persistent confirmation gates', () => {
  const mappingHash = columnMappingHash(intent.columnMapping);
  const gate: ConfirmationGate = {
    gateKey: 'FIELD_MAPPING_VERIFIED',
    scope: 'CAMPAIGN',
    scopeId: intent.campaignId,
    confirmedAt: '2026-08-12T10:00:00.000Z',
    confirmedBy: 'operator',
    evidence: 'Verified two leads render real text in Lemlist.',
    subjectHash: mappingHash,
    providerVersion: 'lemlist-v1',
    invalidatedAt: null,
  };

  it('does not ask again once a valid confirmation exists', () => {
    expect(isConfirmationValid(gate, mappingHash, 'lemlist-v1')).toEqual({
      valid: true,
      reasonCode: null,
    });
  });

  it('asks again when the column mapping changes', () => {
    const changed = columnMappingHash({ connectionMessage: 'connection_message' });

    expect(isConfirmationValid(gate, changed, 'lemlist-v1').valid).toBe(false);
    expect(isConfirmationValid(gate, changed, 'lemlist-v1').reasonCode).toBe(
      'CONFIRMATION_SUBJECT_CHANGED',
    );
  });

  it('asks again when the provider version changes', () => {
    expect(isConfirmationValid(gate, mappingHash, 'lemlist-v2').reasonCode).toBe(
      'CONFIRMATION_PROVIDER_CHANGED',
    );
  });

  it('treats a missing gate as unconfirmed rather than as permission', () => {
    expect(isConfirmationValid(null, mappingHash, 'lemlist-v1')).toEqual({
      valid: false,
      reasonCode: 'CONFIRMATION_NEVER_GIVEN',
    });
  });
});

describe('provider policy blocks', () => {
  it('surfaces the block and never offers a substitute operation', () => {
    const block = describePolicyBlock('import_leads_to_campaign', 'blocked by safety classifier');

    expect(block.reasonCode).toBe('IMPORT_BLOCKED_BY_PROVIDER_POLICY');
    expect(block.maySubstituteOperation).toBe(false);
    expect(block.mayRetrySameCall).toBe(true);
    expect(block.operatorMessage).toContain('rather than routing around it');
  });
});
