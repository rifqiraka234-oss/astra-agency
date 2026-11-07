/**
 * lib/integrations/status-map.ts, the queue status of state/silent_accepted_queue.jsonl
 * to a lead stage, research status and disqualify reason. Pure, tested in tests/e.
 *
 * The queue grew more than a hundred status values over time. They are mapped by
 * ordered patterns, first match wins, so a new status lands somewhere sensible
 * and the dry run prints exactly where each one went.
 *
 * disqualify_reason is a key of the managed reason list (reason_options,
 * lib/reasons.ts). Closed threads carry custom.close_reason as before, and their
 * disqualify reason follows from it (CLOSE_TO_DISQUALIFY): no_response is No reply,
 * declined is Declined, closed_warm is Went quiet after replying, not_now is Not now.
 */

export type LeadStageKey = 'new' | 'researching' | 'attempting' | 'connected' | 'qualified' | 'disqualified';
export type ResearchStatus = 'unresearched' | 'researching' | 'drafted' | 'awaiting_approval' | 'sent';
export type DisqualifyReason =
  | 'no_strong_angle' | 'blocked_needs_info' | 'do_not_contact' | 'not_icp' | 'former_owner' | 'wrong_company'
  | 'no_reply' | 'went_quiet' | 'declined' | 'not_now';
export type CloseReason = 'no_response' | 'not_interested' | 'declined' | 'not_now' | 'closed_warm';

/** The disqualify reason a closed thread's close reason stands for. Also used by the backfill. */
export const CLOSE_TO_DISQUALIFY: Record<CloseReason, DisqualifyReason> = {
  no_response: 'no_reply',
  not_interested: 'declined',
  declined: 'declined',
  closed_warm: 'went_quiet',
  not_now: 'not_now',
};

export type StatusMapping = {
  stage: LeadStageKey;
  researchStatus: ResearchStatus;
  disqualifyReason: DisqualifyReason | null;
  closeReason: CloseReason | null;
  /** Which rule matched, for the dry run table. */
  rule: string;
};

type Rule = { name: string; test: RegExp; map: Omit<StatusMapping, 'rule' | 'closeReason'> & { closeReason?: CloseReason | null } };

const d = (reason: DisqualifyReason | null, researchStatus: ResearchStatus = 'sent') => ({ stage: 'disqualified' as const, researchStatus, disqualifyReason: reason });

/** Ordered, first match wins. */
const RULES: Rule[] = [
  { name: 'do not contact', test: /DO_NOT_CONTACT|NO_FURTHER_CONTACT/, map: d('do_not_contact') },
  { name: 'not a fit', test: /NOT_ICP|NOT_A_LEAD/, map: d('not_icp', 'researching') },
  { name: 'wrong company', test: /WRONG_COMPANY/, map: d('wrong_company') },
  { name: 'former owner', test: /FORMER_OWNER/, map: d('former_owner', 'researching') },
  { name: 'no strong angle', test: /^NO_STRONG_ANGLE/, map: d('no_strong_angle', 'researching') },
  { name: 'blocked', test: /BLOCKED|^NOT_CONNECTED/, map: d('blocked_needs_info', 'researching') },
  { name: 'meeting or proposal', test: /MEETING|PROPOSAL|LIVE_DEAL|CALL_HELD/, map: { stage: 'qualified', researchStatus: 'sent', disqualifyReason: null } },
  { name: 'Raka handling offline', test: /RAKA_HANDLING_OFFLINE/, map: { stage: 'connected', researchStatus: 'sent', disqualifyReason: null } },
  { name: 'closed, not interested', test: /^CLOSED_(NOT_INTERESTED|DECLINED|SOFT_DECLINE$)|^DECLINED_(CLOSED|ANSWERED)/, map: { ...d('declined'), closeReason: 'declined' } },
  { name: 'closed, not now', test: /^CLOSED_(NOT_NOW|LOST_REVISIT)/, map: { ...d('not_now'), closeReason: 'not_now' } },
  { name: 'closed, warm', test: /^CLOSED_(WARM|SOFT_DECLINE_WARM|CONGRATULATED|CORRECTED)/, map: { ...d('went_quiet'), closeReason: 'closed_warm' } },
  { name: 'closed, went quiet', test: /^CLOSED|^LEFT_ALONE/, map: { ...d('no_reply'), closeReason: 'no_response' } },
  {
    name: 'replied',
    test: /REPL|SAID_YES|PROTOTYPE|DELIVER|CHAT_ONLY|RELATIONSHIP|LIKED|CALL_BEING|HOLD_RAKA_CALL|HOLD_CO_FOUNDER|HOLD_REBUILD|PARKED|RAKA_HANDLING|RAKA_TO_DECIDE|DECLINED/,
    map: { stage: 'connected', researchStatus: 'sent', disqualifyReason: null },
  },
  {
    name: 'sent, waiting',
    test: /^SENT|NUDGE|BUMP|CORRECTION|CLOSER|CLOSE_DRAFTED|DRAFTED_CLOSE|FINAL_CLOSE|ALREADY_MESSAGED|STALLED/,
    map: { stage: 'attempting', researchStatus: 'sent', disqualifyReason: null },
  },
  { name: 'drafted', test: /^DRAFTED|HOLD_WEAK|SEND_FAILED|^HOLD/, map: { stage: 'researching', researchStatus: 'drafted', disqualifyReason: null } },
  { name: 'not started', test: /UNRESEARCHED|THREAD_VERIFIED_CLEAN/, map: { stage: 'new', researchStatus: 'unresearched', disqualifyReason: null } },
  { name: 'researching', test: /RESEARCH_QUEUED|NEEDS_RECHECK|RESEARCH/, map: { stage: 'researching', researchStatus: 'researching', disqualifyReason: null } },
];

const FALLBACK: StatusMapping = { stage: 'new', researchStatus: 'unresearched', disqualifyReason: null, closeReason: null, rule: 'unmapped, left in New' };

export function mapQueueStatus(status: string | null | undefined): StatusMapping {
  const s = (status ?? '').trim().toUpperCase();
  if (!s) return { ...FALLBACK, rule: 'no status, left in New' };
  for (const r of RULES) {
    if (r.test.test(s)) return { closeReason: null, ...r.map, rule: r.name };
  }
  return FALLBACK;
}

/**
 * The research status never claims less than the row proves: a row with a
 * recorded send is 'sent', a row with an opener text is at least 'drafted'.
 */
export function researchStatusFor(row: Record<string, unknown>, mapped: StatusMapping): ResearchStatus {
  if (row.openerSentAt || row.sentActivityId || row.sentAt) return 'sent';
  if (row.openerText && (mapped.researchStatus === 'unresearched' || mapped.researchStatus === 'researching')) return 'drafted';
  return mapped.researchStatus;
}
