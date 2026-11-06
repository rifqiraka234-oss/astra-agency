/**
 * lib/work/view.ts, turns task rows into the plain data the task lists render (agent C). Pure.
 *   toTaskView(item, { bucket, canToggle, editHref, now })
 *   bucketGroups(buckets, done, opts)   the five sections of the Tasks design
 */
import { formatDay, formatDue, formatRelativeDay, formatTime } from '../format';
import { labelOf, PRIORITIES, TASK_TYPES } from '../options';
import type { TaskBuckets, TaskListItem } from '../tasks';

export type TaskView = {
  id: string;
  title: string;
  typeLabel: string;
  priorityLabel: string;
  links: { type: string; id: string; label: string; href: string }[];
  repeat: string;
  dueLabel: string;
  overdue: boolean;
  done: boolean;
  ownerInitials: string;
  ownerBg: string;
  ownerName: string;
  canToggle: boolean;
  editHref: string | null;
};

export type ViewOpts = {
  now?: Date;
  /** How the due date reads. 'home' is "Today 14:00", 'today' is "14:00", 'date' is "Wed 4 Nov". */
  dueStyle?: 'home' | 'today' | 'date';
  canToggle: (item: TaskListItem) => boolean;
  editHref?: (item: TaskListItem) => string | null;
};

export function dueLabel(item: Pick<TaskListItem, 'dueAt' | 'allDay'>, style: ViewOpts['dueStyle'] = 'home', now: Date = new Date()): string {
  if (!item.dueAt) return 'No date';
  if (style === 'today') return item.allDay ? 'Today' : formatTime(item.dueAt);
  if (style === 'date') return formatRelativeDay(item.dueAt, { now });
  return formatDue(item.dueAt, item.allDay, now);
}

export function toTaskView(item: TaskListItem, opts: ViewOpts & { done?: boolean }): TaskView {
  return {
    id: item.id,
    title: item.title,
    typeLabel: labelOf(TASK_TYPES, item.type),
    priorityLabel: labelOf(PRIORITIES, item.priority),
    links: item.links,
    repeat: item.repeat,
    dueLabel: dueLabel(item, opts.dueStyle, opts.now),
    overdue: !opts.done && item.bucket === 'overdue',
    done: opts.done ?? item.status === 'completed',
    ownerInitials: item.ownerInitials ?? (item.ownerUserId ? '?' : '?'),
    ownerBg: item.ownerAvatarBg ?? '#ECECE7',
    ownerName: item.ownerName ?? 'Unassigned',
    canToggle: opts.canToggle(item),
    editHref: opts.editHref ? opts.editHref(item) : null,
  };
}

export type ViewGroup = { key: string; name: string; red?: boolean; items: TaskView[] };

/** Overdue, Today, This week and next, Later, Done in the last 14 days. */
export function bucketGroups(b: TaskBuckets, done: TaskListItem[], opts: ViewOpts): ViewGroup[] {
  const now = opts.now ?? new Date();
  return [
    { key: 'overdue', name: 'Overdue', red: true, items: b.overdue.map((i) => toTaskView(i, { ...opts, dueStyle: 'date' })) },
    { key: 'today', name: `Today, ${formatDay(now, now)}`, items: b.today.map((i) => toTaskView(i, { ...opts, dueStyle: 'today' })) },
    { key: 'week', name: 'This week and next', items: b.week.map((i) => toTaskView(i, { ...opts, dueStyle: 'date' })) },
    { key: 'later', name: 'Later', items: b.later.map((i) => toTaskView(i, { ...opts, dueStyle: 'date' })) },
    { key: 'done', name: 'Done, last 14 days', items: done.map((i) => toTaskView(i, { ...opts, dueStyle: 'date', done: true })) },
  ];
}
