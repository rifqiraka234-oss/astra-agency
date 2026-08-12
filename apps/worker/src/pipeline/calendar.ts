import {
  describeSlotsForMessage,
  generateSlots,
  isAvailabilityFresh,
  structuralHash,
  type ClaudeDecision,
  type ControllerAction,
  type ConversationState,
  type decideControllerAction,
} from '@astra/core';
import {
  activeReservations,
  getPool,
  recordAvailabilityQuery,
  recordCalendarEvent,
  recordOwnershipChange,
  releaseReservation,
  reserveSlot,
  type ConversationRow,
} from '@astra/db';
import type { AppContext } from '../context.js';
import type { ConversationContext } from './fetch-context.js';
import { executeSend } from './send.js';
import { notifyOperator } from './notify.js';
import { safeTransition } from './process-conversation.js';
import { METRIC_NAMES, increment } from '../metrics.js';

/**
 * Live calendar workflow.
 *
 * Availability is never cached and never inferred. A slot may be offered only
 * when a live free/busy query succeeded seconds ago and an internal
 * reservation is held for it; a slot may be booked only when a *second* live
 * query still shows it free. If the calendar cannot be reached, the
 * conversation goes to a human rather than falling back to a guess: an empty
 * busy list looks exactly like total availability.
 */

export interface CalendarWorkflowInput {
  readonly action: Extract<ControllerAction, 'PROPOSE_CALENDAR_SLOTS' | 'BOOK_SELECTED_SLOT'>;
  readonly conversationRow: ConversationRow;
  readonly fetched: ConversationContext;
  readonly decision: ClaudeDecision;
  readonly policy: ReturnType<typeof decideControllerAction>;
  readonly decisionId: string;
  readonly promptVersion: string;
  readonly input: {
    readonly contactId: string;
    readonly lemlistContactId: string;
    readonly correlationId: string;
  };
}

export interface CalendarWorkflowResult {
  readonly action: ControllerAction | 'SKIPPED_LOCKED' | 'SUPPRESSED';
  readonly state: ConversationState;
  readonly detail: string;
}

export async function runCalendarWorkflow(
  context: AppContext,
  args: CalendarWorkflowInput,
): Promise<CalendarWorkflowResult> {
  return args.action === 'PROPOSE_CALENDAR_SLOTS'
    ? proposeSlots(context, args)
    : bookSelectedSlot(context, args);
}

async function proposeSlots(
  context: AppContext,
  args: CalendarWorkflowInput,
): Promise<CalendarWorkflowResult> {
  const pool = getPool();
  const { conversationRow, fetched, input } = args;

  const windowStart = new Date();
  const windowEnd = new Date(
    windowStart.getTime() + context.config.MEETING_SEARCH_BUSINESS_DAYS_MAX * 24 * 3600 * 1000,
  );

  const freeBusy = await context.calendar.getFreeBusy({
    calendarEmail: context.config.CALENDAR_ACCOUNT_EMAIL,
    windowStart,
    windowEnd,
  });

  await recordAvailabilityQuery(pool, {
    conversationId: conversationRow.id,
    provider: context.calendar.name,
    windowStart,
    windowEnd,
    succeeded: freeBusy.ok,
    resultHash: freeBusy.ok ? structuralHash(freeBusy.busy) : null,
    busyBlocks: freeBusy.ok ? freeBusy.busy : [],
    errorDetail: freeBusy.ok ? null : freeBusy.error,
  });
  increment(METRIC_NAMES.calendarQueries, { outcome: freeBusy.ok ? 'ok' : 'failed' });

  if (!freeBusy.ok) {
    // No fallback to cached availability. A calendar we cannot read is a
    // calendar we cannot make promises about.
    await handoff(
      context,
      args,
      'CALENDAR_QUERY_FAILED',
      `The calendar could not be read (${freeBusy.error}), so no times were offered.`,
    );
    return {
      action: 'HANDOFF',
      state: 'HUMAN_REVIEW_REQUIRED',
      detail: 'Live availability was unavailable.',
    };
  }

  const reservations = await activeReservations(pool, new Date(), conversationRow.id);

  const generated = generateSlots({
    now: new Date(),
    config: context.scheduling,
    busy: freeBusy.busy,
    reservations,
    durationMinutes: context.config.MEETING_DURATION_MINUTES,
    bufferMinutes: context.config.MEETING_BUFFER_MINUTES,
    minNoticeHours: context.config.MEETING_MIN_NOTICE_HOURS,
    searchBusinessDays: context.config.MEETING_SEARCH_BUSINESS_DAYS,
  });

  let slots = generated.slots;
  if (slots.length === 0) {
    // Widen once before giving up, as the spec permits.
    slots = generateSlots({
      now: new Date(),
      config: context.scheduling,
      busy: freeBusy.busy,
      reservations,
      durationMinutes: context.config.MEETING_DURATION_MINUTES,
      bufferMinutes: context.config.MEETING_BUFFER_MINUTES,
      minNoticeHours: context.config.MEETING_MIN_NOTICE_HOURS,
      searchBusinessDays: context.config.MEETING_SEARCH_BUSINESS_DAYS_MAX,
    }).slots;
  }

  if (slots.length === 0) {
    await handoff(context, args, 'NO_SLOTS_AVAILABLE', 'No slot in the search horizon satisfies the working hours, exclusions, buffers and notice period.');
    return { action: 'HANDOFF', state: 'HUMAN_REVIEW_REQUIRED', detail: 'No availability.' };
  }

  // Hold the offered slots so they cannot be offered to anyone else. A
  // reservation is internal only: no placeholder event is written to the
  // operator's real calendar merely because a slot was mentioned.
  const heldIds: string[] = [];
  const expiresAt = new Date(Date.now() + context.config.SLOT_RESERVATION_HOURS * 3600 * 1000);
  for (const slot of slots) {
    const held = await reserveSlot(pool, {
      conversationId: conversationRow.id,
      availabilityQueryId: null,
      start: slot.start,
      end: slot.end,
      expiresAt,
    });
    if ('id' in held) heldIds.push(held.id);
  }

  if (heldIds.length === 0) {
    await handoff(context, args, 'SLOT_RESERVED_ELSEWHERE', 'Every candidate slot is already reserved for another conversation.');
    return { action: 'HANDOFF', state: 'HUMAN_REVIEW_REQUIRED', detail: 'All slots reserved elsewhere.' };
  }

  const rendered = describeSlotsForMessage(slots.slice(0, heldIds.length), {
    operatorTimeZone: context.scheduling.timezone,
    // Only set when the prospect actually stated their zone. Inferring it
    // from a company address and presenting it as fact is forbidden.
    prospectTimeZone: null,
  });

  const needsEmail =
    fetched.conversation.channel === 'linkedin' &&
    !fetched.conversation.participants.some((participant) => participant.includes('@'));

  const messageText = buildSlotMessage(rendered, needsEmail);

  if (!isAvailabilityFresh(freeBusy.queriedAt, new Date(), context.config.CALENDAR_FRESHNESS_SECONDS)) {
    // Composing took too long. Rather than send times we can no longer vouch
    // for, release the holds and let the next run try again.
    for (const id of heldIds) await releaseReservation(pool, id);
    await handoff(context, args, 'CALENDAR_DATA_STALE', 'Availability went stale while the message was being composed.');
    return { action: 'HANDOFF', state: 'HUMAN_REVIEW_REQUIRED', detail: 'Availability went stale.' };
  }

  const outcome = await executeSend(context, {
    conversationId: conversationRow.id,
    lemlistContactId: input.lemlistContactId,
    channel: fetched.conversation.channel === 'email' ? 'email' : 'linkedin',
    text: messageText,
    lowRiskCase: 'CALENDAR_SLOT_PROPOSAL',
    maxWords: 120,
    allowUrls: false,
    allowedUrls: [],
    recentOutboundTexts: [],
    supportedClaimTerms: [],
    expectedConversationHash: fetched.conversation.conversationHash,
    expectedLatestInboundMessageId: fetched.conversation.latestInboundMessageId,
    ownAddresses: fetched.ownAddresses,
    leadId: fetched.lead?.id ?? null,
    sendUserId: context.config.LEMLIST_SEND_USER_ID || null,
    sendUserEmail: fetched.ownAddresses[0] ?? null,
    sendUserMailboxId: null,
    replyToActivityId: fetched.conversation.latestInboundEmailActivityId,
    decisionId: args.decisionId,
    isApprovedSend: false,
    correlationId: input.correlationId,
  });

  if (outcome.status !== 'SENT' && outcome.status !== 'DUPLICATE') {
    for (const id of heldIds) await releaseReservation(pool, id);
    await handoff(context, args, 'MODE_DISALLOWS_SEND', `The slot proposal was not sent (${outcome.status}).`);
    return { action: 'HANDOFF', state: 'HUMAN_REVIEW_REQUIRED', detail: `Proposal ${outcome.status}.` };
  }

  await safeTransition(
    context,
    { ...conversationRow, state: 'ANALYZING' },
    'CALENDAR_OPTIONS_PROPOSED',
    'ALLOWED_LOW_RISK_CASE',
    input.correlationId,
    `Offered ${heldIds.length} slot(s) from a live query.`,
  );

  return {
    action: 'PROPOSE_CALENDAR_SLOTS',
    state: 'CALENDAR_OPTIONS_PROPOSED',
    detail: `Offered ${heldIds.length} slots.`,
  };
}

async function bookSelectedSlot(
  context: AppContext,
  args: CalendarWorkflowInput,
): Promise<CalendarWorkflowResult> {
  const pool = getPool();
  const { conversationRow, fetched, input } = args;

  if (!context.config.canWriteCalendar) {
    await handoff(context, args, 'LIVE_CALENDAR_FLAG_OFF', 'Calendar writes are disabled, so the meeting was not booked.');
    return { action: 'HANDOFF', state: 'HUMAN_REVIEW_REQUIRED', detail: 'Calendar writes disabled.' };
  }

  const held = await pool.query<{ id: string; slot_start: Date; slot_end: Date }>(
    `SELECT id, slot_start, slot_end FROM slot_reservations
     WHERE conversation_id = $1 AND status = 'HELD' AND expires_at > now()
     ORDER BY slot_start LIMIT 1`,
    [conversationRow.id],
  );
  const reservation = held.rows[0];

  if (!reservation) {
    await handoff(context, args, 'AMBIGUOUS_SLOT_SELECTION', 'No live reservation matches the selection, so the exact time is ambiguous.');
    return { action: 'HANDOFF', state: 'HUMAN_REVIEW_REQUIRED', detail: 'No matching reservation.' };
  }

  const attendeeEmail = fetched.conversation.participants.find((p) => p.includes('@'));
  if (!attendeeEmail) {
    await handoff(context, args, 'MISSING_ATTENDEE_EMAIL', 'No usable email address is known for the prospect, so no invitation can be sent.');
    return { action: 'HANDOFF', state: 'HUMAN_REVIEW_REQUIRED', detail: 'No attendee email.' };
  }

  // Requery immediately before writing. The gap between proposing and booking
  // is exactly where a slot gets taken.
  const recheck = await context.calendar.getFreeBusy({
    calendarEmail: context.config.CALENDAR_ACCOUNT_EMAIL,
    windowStart: new Date(reservation.slot_start.getTime() - 3600_000),
    windowEnd: new Date(reservation.slot_end.getTime() + 3600_000),
  });
  increment(METRIC_NAMES.calendarQueries, { outcome: recheck.ok ? 'ok' : 'failed' });

  if (!recheck.ok) {
    await handoff(context, args, 'CALENDAR_QUERY_FAILED', 'The calendar could not be rechecked, so nothing was booked and nothing was confirmed.');
    return { action: 'HANDOFF', state: 'HUMAN_REVIEW_REQUIRED', detail: 'Recheck failed.' };
  }

  const conflict = recheck.busy.some(
    (block) => reservation.slot_start < block.end && reservation.slot_end > block.start,
  );
  if (conflict) {
    // Do not claim it is booked. Release and go back to offering options.
    await releaseReservation(pool, reservation.id);
    await safeTransition(
      context,
      { ...conversationRow, state: 'ANALYZING' },
      'MEETING_BOOKING_PENDING',
      'SLOT_NO_LONGER_FREE',
      input.correlationId,
    );
    await safeTransition(
      context,
      { ...conversationRow, state: 'MEETING_BOOKING_PENDING' },
      'CALENDAR_OPTIONS_PROPOSED',
      'SLOT_NO_LONGER_FREE',
      input.correlationId,
      'The chosen slot was taken before booking, so fresh options are needed.',
    );
    return {
      action: 'PROPOSE_CALENDAR_SLOTS',
      state: 'CALENDAR_OPTIONS_PROPOSED',
      detail: 'The chosen slot was no longer free.',
    };
  }

  const company = fetched.campaignName ?? 'your company';
  let created;
  try {
    created = await context.calendar.createEvent({
      calendarEmail: context.config.CALENDAR_ACCOUNT_EMAIL,
      title: `Astra Agency x ${company} intro`,
      // Neutral description. Private research notes never travel to the
      // prospect's calendar.
      description: 'Short intro call arranged over LinkedIn.',
      start: reservation.slot_start,
      end: reservation.slot_end,
      timeZone: context.scheduling.timezone,
      attendeeEmail,
      requestId: `astra-${conversationRow.id}-${reservation.id}`,
      addConferencing: true,
    });
  } catch (error) {
    await handoff(context, args, 'EVENT_CREATION_FAILED', 'The calendar event could not be created, so no confirmation was sent.');
    context.logger.error('event creation failed', { error });
    return { action: 'HANDOFF', state: 'HUMAN_REVIEW_REQUIRED', detail: 'Event creation failed.' };
  }

  const stored = await recordCalendarEvent(pool, {
    conversationId: conversationRow.id,
    slotReservationId: reservation.id,
    provider: context.calendar.name,
    providerEventId: created.providerEventId,
    eventWebUrl: created.eventWebUrl,
    title: `Astra Agency x ${company} intro`,
    startsAt: reservation.slot_start,
    endsAt: reservation.slot_end,
    attendeeEmail,
  });
  increment(METRIC_NAMES.calendarBookings, { created: String(stored.created) });

  await pool.query(`UPDATE slot_reservations SET status = 'CONSUMED' WHERE id = $1`, [
    reservation.id,
  ]);

  // Only now may a confirmation be sent. "Booked" must never precede the
  // booking.
  await executeSend(context, {
    conversationId: conversationRow.id,
    lemlistContactId: input.lemlistContactId,
    channel: fetched.conversation.channel === 'email' ? 'email' : 'linkedin',
    text: `That works, thanks. I have sent the invite to ${attendeeEmail}. Speak soon.`,
    lowRiskCase: 'BOOK_SELECTED_SLOT',
    maxWords: 80,
    allowUrls: false,
    allowedUrls: [],
    recentOutboundTexts: [],
    supportedClaimTerms: [],
    expectedConversationHash: fetched.conversation.conversationHash,
    expectedLatestInboundMessageId: fetched.conversation.latestInboundMessageId,
    ownAddresses: fetched.ownAddresses,
    leadId: fetched.lead?.id ?? null,
    sendUserId: context.config.LEMLIST_SEND_USER_ID || null,
    sendUserEmail: fetched.ownAddresses[0] ?? null,
    sendUserMailboxId: null,
    replyToActivityId: fetched.conversation.latestInboundEmailActivityId,
    decisionId: args.decisionId,
    isApprovedSend: false,
    correlationId: input.correlationId,
  });

  await safeTransition(context, { ...conversationRow, state: 'ANALYZING' }, 'MEETING_BOOKING_PENDING', 'ALLOWED_LOW_RISK_CASE', input.correlationId);
  await safeTransition(context, { ...conversationRow, state: 'MEETING_BOOKING_PENDING' }, 'MEETING_SCHEDULED', 'ALLOWED_LOW_RISK_CASE', input.correlationId);

  // A meeting ends automation. The operator decides afterwards whether it ever
  // resumes; until they do, the conversation stays human owned.
  await recordOwnershipChange(pool, {
    conversationId: conversationRow.id,
    previousOwner: conversationRow.owner,
    nextOwner: 'HUMAN',
    actor: 'controller',
    reasonCode: 'MEETING_ALREADY_REFERENCED',
    detail: 'A meeting exists, so the conversation is human owned until the operator decides otherwise.',
    correlationId: input.correlationId,
  });

  await notifyOperator(context, {
    conversationId: conversationRow.id,
    kind: 'MEETING_BOOKED',
    subject: 'Meeting booked',
    body: `A meeting was booked for ${reservation.slot_start.toISOString()} with ${attendeeEmail}. Automation has stopped. The dashboard is asking whether to keep this conversation human owned, resume low-risk automation after the meeting, or exclude it permanently.`,
    dedupeKey: `meeting:${stored.id}`,
  });

  return { action: 'BOOK_SELECTED_SLOT', state: 'MEETING_SCHEDULED', detail: 'Meeting booked.' };
}

function buildSlotMessage(rendered: readonly string[], needsEmail: boolean): string {
  const options = rendered.map((line) => line).join(', or ');
  const ask = needsEmail
    ? ' Which suits you, and what is the best email for the invite?'
    : ' Which suits you?';
  return `Happy to find a time. I have ${options}.${ask}`;
}

async function handoff(
  context: AppContext,
  args: CalendarWorkflowInput,
  reasonCode: string,
  detail: string,
): Promise<void> {
  increment(METRIC_NAMES.handoffs, { reason: reasonCode });
  await safeTransition(
    context,
    { ...args.conversationRow, state: 'ANALYZING' },
    'HUMAN_REVIEW_REQUIRED',
    reasonCode,
    args.input.correlationId,
    detail,
  );
  await notifyOperator(context, {
    conversationId: args.conversationRow.id,
    kind: 'HUMAN_HANDOFF',
    subject: 'Scheduling needs you',
    body: detail,
    dedupeKey: `calendar:${args.conversationRow.id}:${reasonCode}`,
  });
}
