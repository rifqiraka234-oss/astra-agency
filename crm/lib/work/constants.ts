/**
 * lib/work/constants.ts, client safe options for the task form (agent C). No database imports.
 */
import type { RecordType } from '../routes';

export type LinkType = Exclude<RecordType, 'task'>;

export const LINK_TYPES: { value: LinkType; label: string }[] = [
  { value: 'organization', label: 'Organization' },
  { value: 'contact', label: 'Contact' },
  { value: 'lead', label: 'Lead' },
  { value: 'deal', label: 'Deal' },
  { value: 'project', label: 'Project' },
  { value: 'ticket', label: 'Ticket' },
  { value: 'invoice', label: 'Invoice' },
];

/** The five repeat options of the task form. value is the RRULE body. */
export const REPEAT_OPTIONS: { value: string; label: string }[] = [
  { value: '', label: 'Does not repeat' },
  { value: 'FREQ=WEEKLY', label: 'Every week' },
  { value: 'FREQ=MONTHLY', label: 'Every month' },
  { value: 'FREQ=MONTHLY;INTERVAL=3;BYDAY=1MO', label: 'Every quarter, first Monday' },
  { value: 'FREQ=YEARLY', label: 'Every year' },
];

/** Reminder offsets in minutes before the due time. '' means no reminder. */
export const REMINDER_OPTIONS: { value: string; label: string }[] = [
  { value: '', label: 'No reminder' },
  { value: '0', label: 'At the due time' },
  { value: '60', label: '1 hour before' },
  { value: '1440', label: '1 day before' },
  { value: '10080', label: '1 week before' },
];

export type RecordHit = { type: LinkType; id: string; label: string; sub: string };

/** Label for a picked link pill, 'Organization · Brouwerij De Kade'. Labels that already say their type stay as they are. */
export function linkPillLabel(type: LinkType, label: string): string {
  const name = LINK_TYPES.find((l) => l.value === type)?.label ?? type;
  return label.startsWith(`${name} `) ? label : `${name} · ${label}`;
}
