import { describe, expect, it } from 'vitest';
import { approvalBindingKey, evaluateApproval, type ApprovalBinding } from './binding.js';
import { REASON_CODES } from '../domain/reason-codes.js';
import { contentHash } from '../text/hash.js';

const NOW = new Date('2026-08-11T10:00:00Z');

const binding = (overrides: Partial<ApprovalBinding> = {}): ApprovalBinding => ({
  operatorEmail: 'operator@example.test',
  actionType: 'SEND_PROTOTYPE_LINK',
  conversationId: 'cnv_1',
  contactId: 'con_1',
  sourceLatestInboundMessageId: 'act_5',
  conversationHash: 'hash_conversation',
  replyContentHash: contentHash('Here you go: https://acme-prototype-by-astra.netlify.app'),
  prototypeVersionId: 'ver_1',
  prototypeContentHash: 'hash_prototype',
  prototypeDeployHash: 'hash_deploy',
  policyVersion: '2026-08-11.1',
  promptVersion: 'reply-drafting@1.0.0',
  expiresAt: new Date('2026-08-14T10:00:00Z'),
  ...overrides,
});

const snapshot = (overrides = {}) => ({
  conversationHash: 'hash_conversation',
  latestInboundMessageId: 'act_5',
  replyContentHash: contentHash('Here you go: https://acme-prototype-by-astra.netlify.app'),
  prototypeVersionId: 'ver_1',
  prototypeContentHash: 'hash_prototype',
  prototypeDeployHash: 'hash_deploy',
  ...overrides,
});

describe('approval binding', () => {
  it('accepts an approval whose bound state still matches', () => {
    expect(evaluateApproval(binding(), 'APPROVED', snapshot(), NOW)).toEqual({ usable: true });
  });

  it('refuses an approval that has not been granted', () => {
    for (const status of ['PENDING', 'REJECTED', 'REVISION_REQUESTED', 'SUPERSEDED'] as const) {
      const result = evaluateApproval(binding(), status, snapshot(), NOW);
      expect(result.usable, status).toBe(false);
    }
  });

  it('goes stale when a new inbound message arrives', () => {
    const result = evaluateApproval(
      binding(),
      'APPROVED',
      snapshot({ latestInboundMessageId: 'act_6' }),
      NOW,
    );
    expect(result.usable).toBe(false);
    expect(result.usable === false && result.status).toBe('STALE');
    expect(result.usable === false && result.reasonCode).toBe(REASON_CODES.STALE_INBOUND_MESSAGE_ID);
  });

  it('goes stale when the conversation hash changes', () => {
    const result = evaluateApproval(
      binding(),
      'APPROVED',
      snapshot({ conversationHash: 'different' }),
      NOW,
    );
    expect(result.usable === false && result.reasonCode).toBe(REASON_CODES.STALE_CONVERSATION_HASH);
  });

  it('goes stale when the reply text is edited after approval', () => {
    const result = evaluateApproval(
      binding(),
      'APPROVED',
      snapshot({ replyContentHash: contentHash('Here you go, slightly different wording.') }),
      NOW,
    );
    expect(result.usable === false && result.reasonCode).toBe(REASON_CODES.APPROVAL_HASH_MISMATCH);
  });

  it('goes stale when the prototype is rebuilt', () => {
    const result = evaluateApproval(
      binding(),
      'APPROVED',
      snapshot({ prototypeVersionId: 'ver_2', prototypeContentHash: 'hash_prototype_2' }),
      NOW,
    );
    expect(result.usable === false && result.status).toBe('STALE');
  });

  it('goes stale when the prototype is redeployed to a new URL', () => {
    const result = evaluateApproval(
      binding(),
      'APPROVED',
      snapshot({ prototypeDeployHash: 'hash_deploy_2' }),
      NOW,
    );
    expect(result.usable === false && result.status).toBe('STALE');
  });

  it('expires on its own deadline', () => {
    const result = evaluateApproval(
      binding(),
      'APPROVED',
      snapshot(),
      new Date('2026-08-14T10:00:01Z'),
    );
    expect(result.usable === false && result.reasonCode).toBe(REASON_CODES.APPROVAL_EXPIRED);
  });

  it('ignores prototype hashes for a plain message approval', () => {
    const result = evaluateApproval(
      binding({ actionType: 'SEND_MESSAGE' }),
      'APPROVED',
      snapshot({ prototypeDeployHash: 'anything-else' }),
      NOW,
    );
    expect(result.usable).toBe(true);
  });

  it('produces a different binding key for a different prototype version', () => {
    expect(approvalBindingKey(binding())).not.toBe(
      approvalBindingKey(binding({ prototypeVersionId: 'ver_2' })),
    );
  });

  it('produces a stable binding key for identical inputs', () => {
    expect(approvalBindingKey(binding())).toBe(approvalBindingKey(binding()));
  });
});
