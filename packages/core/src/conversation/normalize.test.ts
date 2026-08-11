import { describe, expect, it } from 'vitest';
import { normalizeConversation } from './normalize.js';
import { buildModelContext, findPrototypeOffer, detectExternalContext } from './context.js';
import type { RawActivity } from './types.js';

const base = (overrides: Partial<RawActivity> & { id: string; createdAt: string }): RawActivity => ({
  channel: 'linkedin',
  ...overrides,
});

describe('conversation normalization', () => {
  it('orders by timestamp with a stable tie-breaker', () => {
    const conversation = normalizeConversation(
      [
        base({ id: 'b', createdAt: '2026-08-10T10:00:00Z', text: 'second', isFromLead: true }),
        base({ id: 'a', createdAt: '2026-08-10T10:00:00Z', text: 'first', isFromLead: true }),
        base({ id: 'c', createdAt: '2026-08-10T09:00:00Z', text: 'earliest', isFromLead: false }),
      ],
      { contactId: 'con_1' },
    );
    expect(conversation.messages.map((message) => message.externalId)).toEqual(['c', 'a', 'b']);
  });

  it('does not treat quoted email history as a new message', () => {
    const conversation = normalizeConversation(
      [
        base({
          id: 'e1',
          channel: 'email',
          createdAt: '2026-08-10T10:00:00Z',
          isFromLead: true,
          subject: 'Re: quick idea',
          text: 'Sure, send it over.\n\nOn Mon, 10 Aug 2026, Raka wrote:\n> Shall I send the sketch?\n> Raka',
        }),
      ],
      { contactId: 'con_1' },
    );
    const message = conversation.messages[0];
    expect(message?.bodyText).toBe('Sure, send it over.');
    expect(message?.hadQuotedHistory).toBe(true);
  });

  it('strips scripts and tracking pixels out of the model text', () => {
    const conversation = normalizeConversation(
      [
        base({
          id: 'e1',
          channel: 'email',
          createdAt: '2026-08-10T10:00:00Z',
          isFromLead: true,
          html: '<p>Hi there</p><script>alert(1)</script><img src="https://track.example/open.gif" width="1" height="1">',
        }),
      ],
      { contactId: 'con_1' },
    );
    expect(conversation.messages[0]?.bodyText).toBe('Hi there');
    expect(conversation.messages[0]?.bodyHtmlSanitized).not.toContain('script');
  });

  it('groups three rapid prospect fragments into one turn', () => {
    const conversation = normalizeConversation(
      [
        base({ id: 'm1', createdAt: '2026-08-10T10:00:00Z', isFromLead: true, text: 'hey' }),
        base({ id: 'm2', createdAt: '2026-08-10T10:00:30Z', isFromLead: true, text: 'sorry' }),
        base({ id: 'm3', createdAt: '2026-08-10T10:01:00Z', isFromLead: true, text: 'yes send it' }),
      ],
      { contactId: 'con_1' },
    );
    expect(conversation.turns).toHaveLength(1);
    expect(conversation.turns[0]?.text).toBe('hey\nsorry\nyes send it');
    expect(conversation.latestInboundMessageId).toBe('m3');
  });

  it('starts a new turn when the gap exceeds the grouping window', () => {
    const conversation = normalizeConversation(
      [
        base({ id: 'm1', createdAt: '2026-08-10T10:00:00Z', isFromLead: true, text: 'hey' }),
        base({ id: 'm2', createdAt: '2026-08-10T10:30:00Z', isFromLead: true, text: 'still there?' }),
      ],
      { contactId: 'con_1' },
    );
    expect(conversation.turns).toHaveLength(2);
  });

  it('marks direction uncertain when nothing identifies the sender', () => {
    const conversation = normalizeConversation(
      [base({ id: 'm1', createdAt: '2026-08-10T10:00:00Z', text: 'ambiguous', type: 'unknownThing' })],
      { contactId: 'con_1' },
    );
    expect(conversation.hasUncertainDirection).toBe(true);
  });

  it('resolves direction from known own addresses when Lemlist does not say', () => {
    const conversation = normalizeConversation(
      [
        base({
          id: 'm1',
          channel: 'email',
          createdAt: '2026-08-10T10:00:00Z',
          type: 'unknownThing',
          sender: 'Raka <raka@astra.agency>',
          text: 'ours',
        }),
      ],
      { contactId: 'con_1', ownAddresses: ['raka@astra.agency'] },
    );
    expect(conversation.messages[0]?.direction).toBe('OUTBOUND');
    expect(conversation.hasUncertainDirection).toBe(false);
  });

  it('never drops attachments silently', () => {
    const conversation = normalizeConversation(
      [
        base({
          id: 'm1',
          channel: 'email',
          createdAt: '2026-08-10T10:00:00Z',
          isFromLead: true,
          text: 'see attached',
          attachments: [{ name: 'brief.pdf', size: 1024, contentType: 'application/pdf' }],
        }),
      ],
      { contactId: 'con_1' },
    );
    expect(conversation.attachmentsPresent).toBe(true);
    expect(conversation.messages[0]?.attachments[0]?.name).toBe('brief.pdf');
  });

  it('deduplicates a repeated activity id', () => {
    const activity = base({ id: 'm1', createdAt: '2026-08-10T10:00:00Z', isFromLead: true, text: 'hi' });
    const conversation = normalizeConversation([activity, activity], { contactId: 'con_1' });
    expect(conversation.messages).toHaveLength(1);
  });

  it('produces the same hash for the same conversation and a different one after a new message', () => {
    const first = normalizeConversation(
      [base({ id: 'm1', createdAt: '2026-08-10T10:00:00Z', isFromLead: true, text: 'hi' })],
      { contactId: 'con_1' },
    );
    const second = normalizeConversation(
      [
        base({ id: 'm1', createdAt: '2026-08-10T10:00:00Z', isFromLead: true, text: 'hi' }),
        base({ id: 'm2', createdAt: '2026-08-10T10:10:00Z', isFromLead: true, text: 'and one more' }),
      ],
      { contactId: 'con_1' },
    );
    expect(first.conversationHash).not.toBe(second.conversationHash);
  });

  it('records the exact inbound email activity id for threading', () => {
    const conversation = normalizeConversation(
      [
        base({ id: 'e1', channel: 'email', createdAt: '2026-08-10T09:00:00Z', isFromLead: false, text: 'out' }),
        base({ id: 'e2', channel: 'email', createdAt: '2026-08-10T10:00:00Z', isFromLead: true, text: 'in' }),
      ],
      { contactId: 'con_1' },
    );
    expect(conversation.latestInboundEmailActivityId).toBe('e2');
  });
});

describe('model context assembly', () => {
  const longConversation = () =>
    normalizeConversation(
      Array.from({ length: 40 }, (_, index) =>
        base({
          id: `m${index}`,
          createdAt: new Date(Date.UTC(2026, 7, 1, 9, index * 30)).toISOString(),
          isFromLead: index % 2 === 1,
          text: `${'filler '.repeat(400)}message ${index}`,
        }),
      ),
      { contactId: 'con_1' },
    );

  it('does not truncate a conversation that fits', () => {
    const conversation = normalizeConversation(
      [base({ id: 'm1', createdAt: '2026-08-10T10:00:00Z', isFromLead: true, text: 'short' })],
      { contactId: 'con_1' },
    );
    expect(buildModelContext(conversation).truncated).toBe(false);
  });

  it('marks truncation and records which turns were dropped', () => {
    const context = buildModelContext(longConversation(), { maxChars: 20_000 });
    expect(context.truncated).toBe(true);
    expect(context.omittedTurnIndices.length).toBeGreaterThan(0);
    expect(context.omittedSummary).toMatch(/omitted for length/);
  });

  it('keeps the first outreach turn and the most recent turns when truncating', () => {
    const conversation = longConversation();
    const context = buildModelContext(conversation, { maxChars: 20_000 });
    const lastTurnIndex = (conversation.turns.at(-1)?.turnIndex ?? 0);
    expect(context.omittedTurnIndices).not.toContain(0);
    expect(context.omittedTurnIndices).not.toContain(lastTurnIndex);
  });
});

describe('signal detection', () => {
  it('finds a prior prototype offer in our own outbound message', () => {
    const conversation = normalizeConversation(
      [
        base({ id: 'm1', createdAt: '2026-08-10T09:00:00Z', isFromLead: false, text: 'Want me to send it?' }),
        base({ id: 'm2', createdAt: '2026-08-10T10:00:00Z', isFromLead: true, text: 'yes please' }),
      ],
      { contactId: 'con_1' },
    );
    expect(findPrototypeOffer(conversation)?.messageId).toBe('m1');
  });

  it('returns null when no prototype was ever offered', () => {
    const conversation = normalizeConversation(
      [
        base({ id: 'm1', createdAt: '2026-08-10T09:00:00Z', isFromLead: false, text: 'Thanks for connecting.' }),
        base({ id: 'm2', createdAt: '2026-08-10T10:00:00Z', isFromLead: true, text: 'yes' }),
      ],
      { contactId: 'con_1' },
    );
    expect(findPrototypeOffer(conversation)).toBeNull();
  });

  it('detects references to context the system cannot see', () => {
    expect(detectExternalContext('As discussed on our call last week, please send it to Josh.')).not.toHaveLength(0);
    expect(detectExternalContext('Sounds good, send it over.')).toHaveLength(0);
  });
});
