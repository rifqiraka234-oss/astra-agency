'use client';
/**
 * The record timeline from the Organization design: an optional note composer,
 * kind filter chips, and the activity cards with their two letter badges.
 *
 *   const items = await getTimeline('organization', org.id);   // lib/activities.ts, server side
 *   <Timeline
 *     items={items}
 *     composer={{ action: addNote, hidden: { organizationId: org.id }, placeholder: 'Add a note, mention @Luna or @Josh' }}
 *   />
 *
 * The composer posts "body" plus the hidden values to your server action, which
 * should call logActivity({ kind: 'note', ... }) and revalidatePath.
 */
import { useActionState, useMemo, useState } from 'react';
import type { TimelineGroup, TimelineItem } from '@/lib/activities';
import { initialActionState, type ActionState } from '@/lib/forms';
import { formatDateTime, formatRelativeDay, todayKey, dayKey } from '@/lib/format';
import { Button } from '../ui/Button';
import { EmptyState } from '../ui/EmptyState';

type Action = (prev: ActionState, fd: FormData) => Promise<ActionState>;

export const TIMELINE_BADGES: Record<TimelineGroup, { label: string; bg: string; fg: string }> = {
  email: { label: 'EM', bg: '#E8EEFD', fg: '#1E40AF' },
  linkedin: { label: 'IN', bg: '#E3EEF7', fg: '#0B4F82' },
  meeting: { label: 'MT', bg: '#E7F5EC', fg: '#166534' },
  ticket: { label: 'TK', bg: '#FDECEC', fg: '#B91C1C' },
  system: { label: 'ST', bg: '#F1F1EC', fg: '#3A3E45' },
  note: { label: 'NT', bg: '#FDF3E1', fg: '#92400E' },
  call: { label: 'CL', bg: '#E8EEFD', fg: '#1E40AF' },
  task: { label: 'TS', bg: '#F1F1EC', fg: '#3A3E45' },
};

const DEFAULT_FILTERS: { id: TimelineGroup | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'email', label: 'Email' },
  { id: 'linkedin', label: 'LinkedIn' },
  { id: 'meeting', label: 'Meetings' },
  { id: 'ticket', label: 'Tickets' },
  { id: 'system', label: 'Changes' },
];

function when(iso: string): string {
  return dayKey(iso) === todayKey() ? formatRelativeDay(iso, { time: true }) : formatDateTime(iso);
}

export function Timeline({
  items,
  composer,
  filters = DEFAULT_FILTERS,
  emptyText = 'Nothing on the timeline yet',
}: {
  items: TimelineItem[];
  composer?: { action: Action; hidden?: Record<string, string>; placeholder?: string };
  filters?: { id: TimelineGroup | 'all'; label: string }[];
  emptyText?: string;
}) {
  const [filter, setFilter] = useState<TimelineGroup | 'all'>('all');
  const [state, formAction, pending] = useActionState(composer?.action ?? (async () => initialActionState), initialActionState);
  const [formKey, setFormKey] = useState(0);
  const [lastState, setLastState] = useState(state);
  if (state !== lastState) {
    setLastState(state);
    if (state.ok) setFormKey((k) => k + 1);
  }

  const allFilters = useMemo(() => {
    const hasNotes = items.some((i) => i.group === 'note');
    return hasNotes && !filters.some((f) => f.id === 'note') ? [...filters, { id: 'note' as const, label: 'Notes' }] : filters;
  }, [items, filters]);
  const shown = filter === 'all' ? items : items.filter((i) => i.group === filter);

  const chips = (
    <div role="group" aria-label="Filter timeline" className="chips">
      {allFilters.map((f) => (
        <button key={f.id} type="button" className="chip" aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>
          {f.label}
        </button>
      ))}
    </div>
  );

  return (
    <div className="stack" style={{ gap: 14 }}>
      {composer ? (
        <form key={formKey} action={formAction} className="tl-composer">
          {Object.entries(composer.hidden ?? {}).map(([k, v]) => (
            <input key={k} type="hidden" name={k} value={v} />
          ))}
          <label htmlFor="tl-note" className="sr-only">
            Add a note
          </label>
          <textarea
            id="tl-note"
            name="body"
            rows={2}
            required
            className="textarea"
            placeholder={composer.placeholder ?? 'Add a note, mention @Luna or @Josh, link it to a deal or project'}
          />
          {state.error && !state.ok ? <div className="form-error">{state.error}</div> : null}
          <div className="row-between" style={{ gap: 8 }}>
            {chips}
            <Button variant="primary" size="sm" type="submit" pending={pending} pendingText="Saving">
              Save note
            </Button>
          </div>
        </form>
      ) : (
        chips
      )}
      {shown.length === 0 ? (
        <div className="card">
          <EmptyState title={filter === 'all' ? emptyText : 'Nothing of this kind yet'} />
        </div>
      ) : (
        <ol className="tl-list">
          {shown.map((e) => {
            const b = TIMELINE_BADGES[e.group];
            return (
              <li key={e.id} className="tl-item">
                <span className="tl-badge" style={{ background: b.bg, color: b.fg }} aria-hidden="true">
                  {b.label}
                </span>
                <div className="tl-content">
                  <div className="row-between" style={{ gap: 8, alignItems: 'flex-start' }}>
                    <div className="tl-title">{e.title}</div>
                    <time className="tl-when" dateTime={e.occurredAt}>
                      {when(e.occurredAt)}
                    </time>
                  </div>
                  {e.body ? <div className="tl-body">{e.body}</div> : null}
                  {e.tags.length ? (
                    <div className="tl-tags">
                      {e.tags.map((t, i) => (
                        <span key={i} className="tl-tag">
                          {t}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}
