/**
 * lib/orgs/display.ts (agent A), small wording helpers for the organization
 * and contact pages. Pure.
 */
import { BUYING_ROLES, CONTACT_RELATIONSHIPS, labelOf } from '../options';
import { formatDate, formatMinutes, formatRelativeDay, todayKey, dayKey } from '../format';
import type { Tone } from '../options';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** '2025-03-31' -> 'Mar 2025' */
export function monthYear(key: string | null | undefined): string {
  if (!key) return '';
  const [y, m] = key.split('-').map(Number);
  return `${MONTHS[m - 1]} ${y}`;
}

/** 91 -> 'every quarter', 30 -> 'every month', 10 -> 'every 10 days'. */
export function cadenceText(days: number | null | undefined): string {
  if (!days) return '';
  if (days >= 89 && days <= 92) return 'every quarter';
  if (days >= 28 && days <= 31) return 'every month';
  if (days >= 364 && days <= 366) return 'every year';
  if (days >= 180 && days <= 183) return 'every half year';
  if (days === 7) return 'every week';
  if (days === 14) return 'every two weeks';
  return `every ${days} days`;
}

/** Org avatar initials, one rule for the whole app (lib/format.ts). */
export { orgInitials } from '../format';

/** "Decision maker" or "Owner" for a current role, "Former owner, until Mar 2025" for an ended one. */
export function roleText(r: { relationship: string; buying_roles: string[]; is_current: boolean; end_date: string | null }): string {
  const rel = labelOf(CONTACT_RELATIONSHIPS, r.relationship);
  if (!r.is_current) {
    const what = r.relationship === 'former_owner' ? 'Former owner' : `Former ${rel.toLowerCase()}`;
    return r.end_date ? `${what}, until ${monthYear(r.end_date)}` : what;
  }
  const roles = r.buying_roles.map((b) => labelOf(BUYING_ROLES, b));
  if (!roles.length) return rel;
  return [roles[0], ...roles.slice(1).map((x) => x.toLowerCase())].join(', ');
}

/** Short status for a ticket row and the rail. SLA timing proper lives on the ticket page (agent F). */
export function ticketStatus(t: { stage_state: string; first_replied_at: Date | null; closed_at: Date | null; opened_at: Date; priority: string; first_reply_minutes: number | null }): { text: string; tone: Tone } {
  if (t.closed_at || t.stage_state !== 'open') return { text: t.closed_at ? `Closed ${formatDate(t.closed_at)}` : 'Closed', tone: 'grey' };
  if (!t.first_replied_at) {
    const urgent = t.priority === 'high' || t.priority === 'urgent';
    const target = t.first_reply_minutes ? `, target ${formatMinutes(t.first_reply_minutes)}` : '';
    return { text: `Waiting for a first reply${target}`, tone: urgent ? 'red' : 'amber' };
  }
  return { text: `Replied ${formatDate(t.first_replied_at)}`, tone: 'grey' };
}

/** "Review scope due today" with a tone: overdue red, today amber. */
export function nextStepStatus(title: string | null, due: Date | null, allDay: boolean | null): { text: string; tone: Tone } {
  if (!title) return { text: 'No next step', tone: 'red' };
  if (!due) return { text: title, tone: 'grey' };
  const key = dayKey(due) ?? '';
  const today = todayKey();
  const when = formatRelativeDay(due, { time: !allDay });
  const lower = when.startsWith('Today') || when.startsWith('Tomorrow') || when.startsWith('Yesterday') ? when.charAt(0).toLowerCase() + when.slice(1) : when;
  if (key < today) return { text: `${title}, overdue since ${lower}`, tone: 'red' };
  return { text: `${title} due ${lower}`, tone: key === today ? 'amber' : 'grey' };
}
