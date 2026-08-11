import { describe, expect, it } from 'vitest';
import {
  classifySequenceStep,
  decideAcceptanceOwnership,
  filterTasksForLead,
  taskBlocksAutomation,
  verifyOwnershipTransfer,
  type PendingManualTask,
  type SequenceStep,
} from './sequence.js';
import { REASON_CODES } from '../domain/reason-codes.js';

const step = (overrides: Partial<SequenceStep> = {}): SequenceStep => ({
  id: 'stp_1',
  position: 1,
  type: 'linkedinMessage',
  channel: 'linkedin',
  content: '',
  completed: false,
  conditional: false,
  ...overrides,
});

const task = (overrides: Partial<PendingManualTask> = {}): PendingManualTask => ({
  id: 'tsk_1',
  type: 'call',
  leadId: 'lea_1',
  contactId: 'con_1',
  campaignId: 'cam_1',
  description: 'Call them',
  dueAt: null,
  ...overrides,
});

describe('sequence step classification', () => {
  it('classifies an introduction as substantive', () => {
    expect(
      classifySequenceStep(
        step({
          content:
            'Thanks for connecting. I noticed your booking page hides the price until the last step and had an idea.',
        }),
      ),
    ).toBe('SUBSTANTIVE_INITIAL_MESSAGE');
  });

  it('classifies a bump as a reminder', () => {
    expect(classifySequenceStep(step({ content: 'Just following up on my last message.' }))).toBe(
      'REMINDER_OR_BUMP',
    );
    expect(classifySequenceStep(step({ content: 'Have you seen this?' }))).toBe('REMINDER_OR_BUMP');
  });

  it('classifies waits and manual tasks as non-message steps', () => {
    expect(classifySequenceStep(step({ type: 'wait', content: '' }))).toBe('NON_MESSAGE_STEP');
    expect(classifySequenceStep(step({ type: 'manualTask', content: 'ring them' }))).toBe(
      'NON_MESSAGE_STEP',
    );
  });

  it('returns UNKNOWN when the step body is not available', () => {
    expect(classifySequenceStep(step({ content: '' }))).toBe('UNKNOWN');
  });

  it('treats a message that both bumps and introduces as substantive', () => {
    expect(
      classifySequenceStep(
        step({ content: 'Just following up. We help agencies turn their site into a booking engine.' }),
      ),
    ).toBe('SUBSTANTIVE_INITIAL_MESSAGE');
  });
});

describe('acceptance ownership decision', () => {
  const substantive = step({
    id: 'stp_intro',
    content: 'Thanks for connecting. I noticed your site and had an idea.',
  });
  const bump = step({ id: 'stp_bump', position: 2, content: 'Just following up on my last note.' });

  it('leaves the conversation to the sequence when a substantive first message is planned', () => {
    const decision = decideAcceptanceOwnership({
      upcomingSteps: [substantive, bump],
      stepClasses: new Map(),
      branchingUnresolved: false,
      pendingTasks: [],
    });
    expect(decision.kind).toBe('LEAVE_TO_SEQUENCE');
    expect(decision.reasonCodes).toContain(REASON_CODES.SUBSTANTIVE_STEP_PLANNED);
  });

  it('acquires ownership when only reminders remain', () => {
    const decision = decideAcceptanceOwnership({
      upcomingSteps: [bump],
      stepClasses: new Map(),
      branchingUnresolved: false,
      pendingTasks: [],
    });
    expect(decision.kind).toBe('ACQUIRE_OWNERSHIP');
  });

  it('acquires ownership when nothing is scheduled at all', () => {
    const decision = decideAcceptanceOwnership({
      upcomingSteps: [],
      stepClasses: new Map(),
      branchingUnresolved: false,
      pendingTasks: [],
    });
    expect(decision.kind).toBe('ACQUIRE_OWNERSHIP');
  });

  it('requires review when branching cannot be resolved', () => {
    const decision = decideAcceptanceOwnership({
      upcomingSteps: [bump],
      stepClasses: new Map(),
      branchingUnresolved: true,
      pendingTasks: [],
    });
    expect(decision.kind).toBe('REVIEW_REQUIRED');
    expect(decision.reasonCodes).toContain(REASON_CODES.SEQUENCE_BRANCH_UNRESOLVABLE);
  });

  it('requires review when a step cannot be classified', () => {
    const decision = decideAcceptanceOwnership({
      upcomingSteps: [step({ id: 'stp_opaque', content: '' })],
      stepClasses: new Map(),
      branchingUnresolved: false,
      pendingTasks: [],
    });
    expect(decision.kind).toBe('REVIEW_REQUIRED');
  });

  it('requires review when a manual call task is pending', () => {
    const decision = decideAcceptanceOwnership({
      upcomingSteps: [bump],
      stepClasses: new Map(),
      branchingUnresolved: false,
      pendingTasks: [task()],
    });
    expect(decision.kind).toBe('REVIEW_REQUIRED');
    expect(decision.reasonCodes).toContain(REASON_CODES.PENDING_MANUAL_TASK);
  });

  it('prefers the stable step id over the positional index', () => {
    const classes = new Map([['stp_bump', 'SUBSTANTIVE_INITIAL_MESSAGE' as const]]);
    const decision = decideAcceptanceOwnership({
      upcomingSteps: [bump],
      stepClasses: classes,
      branchingUnresolved: false,
      pendingTasks: [],
    });
    expect(decision.kind).toBe('LEAVE_TO_SEQUENCE');
  });

  it('falls back to a positional key when the step has no id', () => {
    const classes = new Map([['pos:2', 'SUBSTANTIVE_INITIAL_MESSAGE' as const]]);
    const decision = decideAcceptanceOwnership({
      upcomingSteps: [step({ id: null, position: 2, content: 'ambiguous' })],
      stepClasses: classes,
      branchingUnresolved: false,
      pendingTasks: [],
    });
    expect(decision.kind).toBe('LEAVE_TO_SEQUENCE');
  });
});

describe('ownership transfer verification', () => {
  it('transfers ownership only when the pause is observed', () => {
    const result = verifyOwnershipTransfer({
      pauseCallSucceeded: true,
      refetchedIsPaused: true,
      conversationUnchanged: true,
    });
    expect(result).toEqual({ ok: true, owner: 'ASTRA_AGENT' });
  });

  it('refuses when the pause call failed', () => {
    const result = verifyOwnershipTransfer({
      pauseCallSucceeded: false,
      refetchedIsPaused: null,
      conversationUnchanged: true,
    });
    expect(result.ok).toBe(false);
    expect(result.ok === false && result.reasonCode).toBe(REASON_CODES.PAUSE_FAILED);
  });

  it('refuses when the pause succeeded but could not be verified', () => {
    const result = verifyOwnershipTransfer({
      pauseCallSucceeded: true,
      refetchedIsPaused: null,
      conversationUnchanged: true,
    });
    expect(result.ok === false && result.reasonCode).toBe(REASON_CODES.PAUSE_UNVERIFIED);
  });

  it('refuses when the lead still reports as running', () => {
    const result = verifyOwnershipTransfer({
      pauseCallSucceeded: true,
      refetchedIsPaused: false,
      conversationUnchanged: true,
    });
    expect(result.ok === false && result.reasonCode).toBe(REASON_CODES.PAUSE_UNVERIFIED);
  });

  it('refuses when a message arrived during the transfer', () => {
    const result = verifyOwnershipTransfer({
      pauseCallSucceeded: true,
      refetchedIsPaused: true,
      conversationUnchanged: false,
    });
    expect(result.ok === false && result.reasonCode).toBe(REASON_CODES.CONVERSATION_CHANGED);
  });
});

describe('manual task handling', () => {
  it('treats calls, notes and unknown task types as blocking', () => {
    expect(taskBlocksAutomation(task({ type: 'call' }))).toBe(true);
    expect(taskBlocksAutomation(task({ type: 'custom' }))).toBe(true);
    expect(taskBlocksAutomation(task({ type: 'somethingNew' }))).toBe(true);
  });

  it('does not treat a profile visit as blocking', () => {
    expect(taskBlocksAutomation(task({ type: 'linkedinVisit' }))).toBe(false);
  });

  it('filters a team-wide task list down to this lead', () => {
    const tasks = [
      task({ id: 'a', leadId: 'lea_1' }),
      task({ id: 'b', leadId: 'lea_other', contactId: 'con_other', campaignId: 'cam_other' }),
    ];
    const filtered = filterTasksForLead(tasks, { leadId: 'lea_1', contactId: 'con_1' });
    expect(filtered.map((entry) => entry.id)).toEqual(['a']);
  });

  it('keeps a task that carries no identifiers at all rather than assuming it is unrelated', () => {
    const tasks = [task({ id: 'c', leadId: null, contactId: null, campaignId: null })];
    expect(filterTasksForLead(tasks, { leadId: 'lea_1' })).toHaveLength(1);
  });
});
