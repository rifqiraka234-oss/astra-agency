/**
 * lib/options.ts, the enum values the schema allows, with their UI labels.
 * Use these for selects and badges so wording stays the same everywhere.
 *
 *   import { TASK_TYPES, labelOf } from '@/lib/options';
 *   labelOf(TASK_TYPES, 'meeting_prep')  -> 'Meeting prep'
 *   toneOf(DEAL_STATE_TONES, 'won')      -> 'green'
 */

export type Option = { value: string; label: string };
export type Tone = 'grey' | 'blue' | 'amber' | 'green' | 'red';

const o = (value: string, label: string): Option => ({ value, label });

export function labelOf(options: readonly Option[], value: string | null | undefined): string {
  if (!value) return '';
  return options.find((x) => x.value === value)?.label ?? value;
}

export function toneOf(tones: Record<string, Tone>, value: string | null | undefined): Tone {
  return (value && tones[value]) || 'grey';
}

export const INDUSTRIES: Option[] = [
  'Accounting', 'Architecture', 'Automotive', 'Construction', 'Consulting', 'Creative and design', 'Education',
  'Energy', 'Financial services', 'Food and beverage', 'Healthcare', 'Hospitality', 'Legal', 'Logistics',
  'Manufacturing', 'Marketing and media', 'Nonprofit', 'Professional services', 'Real estate', 'Retail',
  'Software and technology', 'Sports and leisure', 'Travel', 'Other',
].map((x) => o(x, x));

export const EMPLOYEE_BANDS: Option[] = [o('1-10', '1 to 10'), o('11-50', '11 to 50'), o('51-200', '51 to 200'), o('201-500', '201 to 500'), o('501+', '501 or more')];

export const LIFECYCLE_STAGES: Option[] = [o('lead', 'Lead'), o('opportunity', 'Opportunity'), o('customer', 'Customer'), o('former', 'Former customer')];
export const LIFECYCLE_TONES: Record<string, Tone> = { lead: 'grey', opportunity: 'blue', customer: 'green', former: 'grey' };

export const RELATIONSHIP_STATUSES: Option[] = [
  o('prospect', 'Prospect'), o('onboarding', 'Onboarding'), o('active', 'Active'), o('retainer', 'Retainer'),
  o('dormant', 'Dormant'), o('churned', 'Churned'), o('former', 'Former'),
];

export const ORG_TYPES: Option[] = [o('prospect', 'Prospect'), o('customer', 'Customer'), o('partner', 'Partner'), o('reseller', 'Reseller'), o('vendor', 'Vendor'), o('other', 'Other')];

export const HEALTH: Option[] = [o('on_track', 'On track'), o('at_risk', 'At risk'), o('off_track', 'Off track')];
export const HEALTH_TONES: Record<string, Tone> = { on_track: 'green', at_risk: 'amber', off_track: 'red' };

export const CONTACT_RELATIONSHIPS: Option[] = [
  o('owner', 'Owner'), o('founder', 'Founder'), o('employee', 'Employee'), o('advisor', 'Advisor'),
  o('former_owner', 'Former owner'), o('contractor', 'Contractor'), o('other', 'Other'),
];

export const BUYING_ROLES: Option[] = [
  o('decision_maker', 'Decision maker'), o('champion', 'Champion'), o('billing_contact', 'Billing contact'),
  o('influencer', 'Influencer'), o('user', 'User'), o('signer', 'Signer'), o('other', 'Other'),
];

export const LAWFUL_BASES: Option[] = [o('legitimate_interest', 'Legitimate interest, B2B'), o('consent', 'Consent'), o('contract', 'Contract'), o('none', 'None recorded')];

export const LEAD_LABELS: Option[] = [o('hot', 'Hot'), o('warm', 'Warm'), o('cold', 'Cold')];

export const RESEARCH_STATUSES: Option[] = [
  o('unresearched', 'Unresearched'), o('researching', 'Researching'), o('drafted', 'Drafted'),
  o('awaiting_approval', 'Awaiting approval'), o('sent', 'Sent'),
];
export const RESEARCH_TONES: Record<string, Tone> = { unresearched: 'grey', researching: 'grey', drafted: 'blue', awaiting_approval: 'amber', sent: 'green' };

export const DISQUALIFY_REASONS: Option[] = [
  o('no_strong_angle', 'No strong angle'), o('blocked_needs_info', 'Blocked, needs info'), o('do_not_contact', 'Do not contact'),
  o('not_icp', 'Not a fit'), o('former_owner', 'Former owner'), o('wrong_company', 'Wrong company'),
];

export const LOST_REASONS: Option[] = [
  o('cheaper', 'Went with someone cheaper'), o('not_now', 'Not now'), o('in_house', 'Built it in house'),
  o('no_budget', 'No budget'), o('no_response', 'Went quiet'), o('other', 'Other'),
];

export const DEAL_TYPES: Option[] = [o('new_business', 'New business'), o('upsell', 'Upsell'), o('renewal', 'Renewal'), o('expansion', 'Expansion')];
export const FORECAST_CATEGORIES: Option[] = [o('pipeline', 'Pipeline'), o('best_case', 'Best case'), o('commit', 'Commit'), o('closed', 'Closed'), o('omitted', 'Omitted')];
export const PRICING_MODELS: Option[] = [o('fixed', 'Fixed price'), o('retainer', 'Retainer'), o('hourly', 'Hourly')];
export const PRIORITIES: Option[] = [o('low', 'Low'), o('medium', 'Medium'), o('high', 'High')];
export const TICKET_PRIORITIES: Option[] = [...PRIORITIES, o('urgent', 'Urgent')];
export const PRIORITY_TONES: Record<string, Tone> = { low: 'grey', medium: 'blue', high: 'amber', urgent: 'red' };

/** Stage state tones for badges. */
export const STAGE_STATE_TONES: Record<string, Tone> = { open: 'blue', won: 'green', lost: 'red', closed: 'grey' };

export const TASK_TYPES: Option[] = [
  o('todo', 'To do'), o('call', 'Call'), o('email', 'Email'), o('linkedin', 'LinkedIn'), o('meeting', 'Meeting'),
  o('meeting_prep', 'Meeting prep'), o('approval', 'Approval'), o('ticket', 'Ticket'), o('invoice', 'Invoice'),
  o('checkin', 'Check in'), o('renewal', 'Renewal'), o('research', 'Research'), o('send_artifact', 'Send artifact'),
];
export const TASK_STATUSES: Option[] = [o('not_started', 'Not started'), o('in_progress', 'In progress'), o('waiting', 'Waiting'), o('completed', 'Completed'), o('cancelled', 'Cancelled')];

export const ACTIVITY_KINDS: Option[] = [
  o('email', 'Email'), o('linkedin_message', 'LinkedIn message'), o('linkedin_invite', 'LinkedIn invite'),
  o('linkedin_accept', 'LinkedIn accept'), o('call', 'Call'), o('meeting', 'Meeting'), o('note', 'Note'),
  o('stage_change', 'Stage change'), o('artifact_sent', 'Artifact sent'), o('ticket', 'Ticket'), o('task', 'Task'),
  o('invoice', 'Invoice'), o('system', 'Change'),
];

export const MEETING_OUTCOMES: Option[] = [o('scheduled', 'Scheduled'), o('completed', 'Completed'), o('rescheduled', 'Rescheduled'), o('no_show', 'No show'), o('canceled', 'Canceled')];

export const OUTBOUND_STATUSES: Option[] = [o('draft', 'Draft'), o('awaiting_approval', 'Awaiting approval'), o('approved', 'Approved'), o('sent', 'Sent'), o('rejected', 'Rejected')];
export const OUTBOUND_TONES: Record<string, Tone> = { draft: 'grey', awaiting_approval: 'amber', approved: 'blue', sent: 'green', rejected: 'red' };

export const PROJECT_KINDS: Option[] = [o('prototype', 'Prototype'), o('delivery', 'Delivery'), o('retainer', 'Retainer')];
export const PROJECT_STATUSES: Option[] = [o('active', 'Active'), o('on_hold', 'On hold'), o('cancelled', 'Cancelled'), o('completed', 'Completed')];

export const TICKET_SOURCES: Option[] = [o('portal', 'Portal'), o('email', 'Email'), o('manual', 'Manual'), o('phone', 'Phone')];

export const INVOICE_STATES: Option[] = [o('draft', 'Draft'), o('open', 'Open'), o('paid', 'Paid'), o('late', 'Late'), o('void', 'Void')];
export const INVOICE_TONES: Record<string, Tone> = { draft: 'grey', open: 'blue', paid: 'green', late: 'red', void: 'grey' };
export const VAT_TREATMENTS: Option[] = [o('nl_21', 'NL 21%'), o('reverse_charge', 'Reverse charge'), o('export', 'Export, outside the EU'), o('outside_scope', 'Outside scope')];
export const VAT_RATES: Record<string, number> = { nl_21: 21, reverse_charge: 0, export: 0, outside_scope: 0 };
