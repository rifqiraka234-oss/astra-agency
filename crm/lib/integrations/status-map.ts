/**
 * lib/integrations/status-map.ts, the queue status of state/silent_accepted_queue.jsonl
 * to a lead stage, research status and disqualify reason. Pure, tested in tests/e.
 *
 * The queue grew more than a hundred status values over time. They are mapped by
 * ordered patterns, first match wins, so a new status lands somewhere sensible
 * and the dry run prints exactly where each one went.
 *
 * disqualify_reason only has six values. Closed threads that fit none of them
 * (went quiet after the last message, said no, not now) are Disqualified with no
 * reason and carry custom.close_reason instead.
 */

export type LeadStageKey = 'new' | 'researching' | 'attempting' | 'connected' | 'qualified' | 'disqualified';
export type ResearchStatus = 'unresearched' | 'researching' | 'drafted' | 'awaiting_approval' | 'sent';
export type DisqualifyReason = 'no_strong_angle' | 'blocked_needs_info' | 'do_not_contact' | 'not_icp' | 'former_owner' | 'wrong_company';
export type CloseReason = 'no_response' | 'not_interested' | 'declined' | 'not_now' | 'closed_warm';

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
  { name: 'closed, not interested', test: /^CLOSED_(NOT_INTERESTED|DECLINED|SOFT_DECLINE$)|^DECLINED_(CLOSED|ANSWERED)/, map: { ...d(null), closeReason: 'declined' } },
  { name: 'closed, not now', test: /^CLOSED_(NOT_NOW|LOST_REVISIT)/, map: { ...d(null), closeReason: 'not_now' } },
  { name: 'closed, warm', test: /^CLOSED_(WARM|SOFT_DECLINE_WARM|CONGRATULATED|CORRECTED)/, map: { ...d(null), closeReason: 'closed_warm' } },
  { name: 'closed, went quiet', test: /^CLOSED|^LEFT_ALONE/, map: { ...d(null), closeReason: 'no_response' } },
  {
    name: 'replied',
    test: /REPL|SAID_YES|PROTOTYPE|DELIVER|CHAT_ONLY|RELATIONSHIP|LIKED|CALL_BEING|HOLD_RAKA_CALL|HOLD_CO_FOUNDER|HOLD_REBUILD|PARKED|RAKA_HANDLING|RAKA_TO_DECIDE|DECLINED/,
    map: { stage: 'connected', researchStatus: 'sent', disqualifyReason: null },
  },
  {
    name: 'sent, waiting',
    test: /^SENT|NUDGE|BUMP|CORRECTION|CLOSER|CLOSE_DRAFTED|DRAFTED_CLOSE|FINAL_CLOSE|ALREADY_MESSAGED/,
    map: { stage: 'attempting', researchStatus: 'sent', disqualifyReason: null },
  },
  { name: 'drafted', test: /^DRAFTED|HOLD_WEAK|STALLED|SEND_FAILED|^HOLD/, map: { stage: 'researching', researchStatus: 'drafted', disqualifyReason: null } },
  { name: 'researching', test: /RESEARCH_QUEUED|NEEDS_RECHECK|RESEARCH/, map: { stage: 'researching', researchStatus: 'researching', disqualifyReason: null } },
  { name: 'not started', test: /UNRESEARCHED|THREAD_VERIFIED_CLEAN/, map: { stage: 'new', researchStatus: 'unresearched', disqualifyReason: null } },
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
