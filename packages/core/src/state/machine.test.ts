import { describe, expect, it } from 'vitest';
import { CONVERSATION_STATES } from '../domain/enums.js';
import { REASON_CODES } from '../domain/reason-codes.js';
import { IllegalStateTransitionError, canTransition, isTerminal, transition } from './machine.js';

const request = (from: (typeof CONVERSATION_STATES)[number], to: (typeof CONVERSATION_STATES)[number]) => ({
  conversationId: 'cnv_1',
  from,
  to,
  actor: 'controller',
  reasonCode: REASON_CODES.ALLOWED_LOW_RISK_CASE,
  sourceMessageId: 'act_1',
  correlationId: 'cor_1',
});

describe('conversation state machine', () => {
  it('allows the happy path from a new event to an automatic send', () => {
    expect(canTransition('NEW_EVENT', 'DEBOUNCING')).toBe(true);
    expect(canTransition('DEBOUNCING', 'FETCHING_CONTEXT')).toBe(true);
    expect(canTransition('FETCHING_CONTEXT', 'ANALYZING')).toBe(true);
    expect(canTransition('ANALYZING', 'LOW_RISK_ELIGIBLE')).toBe(true);
    expect(canTransition('LOW_RISK_ELIGIBLE', 'COMPLETED_NO_ACTION')).toBe(true);
  });

  it('lets a debouncing window extend itself when another message arrives', () => {
    expect(canTransition('DEBOUNCING', 'DEBOUNCING')).toBe(true);
  });

  it('throws on an illegal transition rather than silently allowing it', () => {
    expect(() => transition(request('NEW_EVENT', 'MEETING_SCHEDULED'))).toThrow(
      IllegalStateTransitionError,
    );
  });

  it('never allows a jump straight from analysis to a scheduled meeting', () => {
    expect(canTransition('ANALYZING', 'MEETING_SCHEDULED')).toBe(false);
  });

  it('treats suppression and dead letter as terminal', () => {
    expect(isTerminal('SUPPRESSED')).toBe(true);
    expect(isTerminal('DEAD_LETTER')).toBe(true);
    for (const state of CONVERSATION_STATES) {
      if (state === 'SUPPRESSED' || state === 'DEAD_LETTER') continue;
      expect(isTerminal(state), state).toBe(false);
    }
  });

  it('lets a sequence-owned conversation re-enter the pipeline on a later reply', () => {
    expect(canTransition('SEQUENCE_OWNED', 'DEBOUNCING')).toBe(true);
  });

  it('only lets a scheduled meeting move to human ownership or review', () => {
    expect(canTransition('MEETING_SCHEDULED', 'HUMAN_OWNED')).toBe(true);
    expect(canTransition('MEETING_SCHEDULED', 'LOW_RISK_ELIGIBLE')).toBe(false);
    expect(canTransition('MEETING_SCHEDULED', 'ANALYZING')).toBe(false);
  });

  it('lets a stale approval fall back into debouncing for reanalysis', () => {
    expect(canTransition('AWAITING_PROTOTYPE_APPROVAL', 'DEBOUNCING')).toBe(true);
    expect(canTransition('AWAITING_MESSAGE_APPROVAL', 'DEBOUNCING')).toBe(true);
  });

  it('records the full audit tuple for a legal transition', () => {
    const now = new Date('2026-08-11T10:00:00Z');
    const record = transition(request('ANALYZING', 'HUMAN_REVIEW_REQUIRED'), now);
    expect(record).toMatchObject({
      conversationId: 'cnv_1',
      from: 'ANALYZING',
      to: 'HUMAN_REVIEW_REQUIRED',
      actor: 'controller',
      sourceMessageId: 'act_1',
      correlationId: 'cor_1',
      occurredAt: now,
    });
  });

  it('allows nothing out of a terminal state', () => {
    for (const state of CONVERSATION_STATES) {
      expect(canTransition('SUPPRESSED', state), `SUPPRESSED -> ${state}`).toBe(false);
      expect(canTransition('DEAD_LETTER', state), `DEAD_LETTER -> ${state}`).toBe(false);
    }
  });
});
