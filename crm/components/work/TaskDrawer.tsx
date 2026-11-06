'use client';
/**
 * The task create and edit drawer (agent C), the form of the Tasks design.
 * Open state lives in the URL (/tasks?new=1, /tasks?task=<id>), so the header New
 * menu, record pages and notifications can all open it.
 *   <TaskDrawer open task={detail | null} people={[{ id, label }]} defaultOwner={user.id} closeHref="/tasks?owner=me" />
 */
import { useActionState, useEffect, useRef, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Drawer, Field, Input, Select, Textarea } from '@/components/ui';
import { initialActionState } from '@/lib/forms';
import { PRIORITIES, TASK_TYPES } from '@/lib/options';
import { LINK_TYPES, REMINDER_OPTIONS, REPEAT_OPTIONS, linkPillLabel, type LinkType, type RecordHit } from '@/lib/work/constants';
import type { TaskDetail } from '@/lib/work/tasks';
import { saveTaskAction, searchLinksAction } from '@/app/(app)/tasks/actions';
import './work.css';

type Picked = { type: LinkType; id: string; label: string };

function LinkPicker({ value, onChange }: { value: Picked[]; onChange: (v: Picked[]) => void }) {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<LinkType>('organization');
  const [q, setQ] = useState('');
  const [hits, setHits] = useState<RecordHit[]>([]);
  const [loading, setLoading] = useState(false);
  const seq = useRef(0);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const n = ++seq.current;
    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const res = await searchLinksAction(type, q);
        if (n === seq.current) setHits(res);
      } finally {
        if (n === seq.current) setLoading(false);
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [open, type, q]);

  const add = (h: RecordHit) => {
    if (!value.some((v) => v.type === h.type && v.id === h.id)) onChange([...value, { type: h.type, id: h.id, label: linkPillLabel(h.type, h.label) }]);
    setQ('');
    input.current?.focus();
  };

  return (
    <div className="field">
      <span className="field-label" id="wk-links-label">
        Linked to
      </span>
      <div className="wk-pills" aria-labelledby="wk-links-label">
        {value.map((v) => (
          <span key={`${v.type}:${v.id}`} className="wk-pick">
            <span title={v.label}>{v.label}</span>
            <input type="hidden" name="link" value={`${v.type}:${v.id}`} />
            <button type="button" aria-label={`Remove ${v.label}`} onClick={() => onChange(value.filter((x) => !(x.type === v.type && x.id === v.id)))}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </span>
        ))}
        {!open ? (
          <button type="button" className="wk-add-link" onClick={() => setOpen(true)}>
            {value.length ? 'Link another record' : 'Link a record'}
          </button>
        ) : null}
      </div>
      {open ? (
        <div className="wk-picker">
          <div className="wk-picker-row">
            <Select aria-label="Record type" options={LINK_TYPES} value={type} onChange={(e) => setType(e.target.value as LinkType)} />
            <Input
              ref={input}
              aria-label="Search records"
              placeholder="Search by name"
              value={q}
              autoFocus
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  if (hits[0]) add(hits[0]);
                }
                if (e.key === 'Escape') {
                  e.stopPropagation();
                  setOpen(false);
                }
              }}
            />
          </div>
          <div className="wk-hits" role="listbox" aria-label="Matching records" aria-busy={loading}>
            {hits.map((h) => (
              <button key={h.id} type="button" role="option" aria-selected={false} className="wk-hit" onClick={() => add(h)}>
                <span>{h.label}</span>
                {h.sub ? <span className="wk-hit-sub">{h.sub}</span> : null}
              </button>
            ))}
            {!loading && hits.length === 0 ? <div className="wk-hit-sub" style={{ padding: 8 }}>No matches</div> : null}
          </div>
          <div className="row-between">
            <span className="wk-hit-sub">Organizations, contacts, leads, deals, projects, tickets and invoices</span>
            <Button size="sm" variant="ghost" onClick={() => setOpen(false)}>
              Done
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function TaskDrawer({
  open,
  task,
  people,
  defaultOwner,
  closeHref,
}: {
  open: boolean;
  task: TaskDetail | null;
  people: { id: string; label: string }[];
  defaultOwner: string | null;
  closeHref: string;
}) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [state, action, pending] = useActionState(saveTaskAction, initialActionState);
  const [, startTransition] = useTransition();
  const [links, setLinks] = useState<Picked[]>(task?.links ?? []);
  const [repeat, setRepeat] = useState(task?.recurrenceRule ?? '');
  // The state object at submit time. Close only once a newer, successful state arrives.
  const submittedFrom = useRef<typeof state | null>(null);

  // Opening the drawer on a different task (or a fresh new one) resets the links and hides old errors.
  const key = task?.id ?? 'new';
  const [shown, setShown] = useState({ key: `${open}:${key}`, stale: state as typeof state | null });
  if (shown.key !== `${open}:${key}`) {
    setShown({ key: `${open}:${key}`, stale: state });
    setLinks(task?.links ?? []);
    setRepeat(task?.recurrenceRule ?? '');
  }
  const fresh = state !== shown.stale;
  const errors = fresh ? state.fieldErrors ?? {} : {};

  const close = () => router.replace(closeHref, { scroll: false });

  useEffect(() => {
    if (submittedFrom.current && state !== submittedFrom.current && state.ok) {
      submittedFrom.current = null;
      router.replace(closeHref, { scroll: false });
    }
  }, [state, closeHref, router]);

  const repeatOptions = REPEAT_OPTIONS.some((o) => o.value === repeat) || !repeat
    ? REPEAT_OPTIONS
    : [...REPEAT_OPTIONS, { value: repeat, label: 'Keep the current repeat' }];
  const reminder = task ? task.remindBeforeMinutes : '';
  const reminderOptions = REMINDER_OPTIONS.some((o) => o.value === reminder)
    ? REMINDER_OPTIONS
    : [...REMINDER_OPTIONS, { value: reminder, label: `${reminder} minutes before` }];
  const ownerOptions = [...people.map((p) => ({ value: p.id, label: p.label })), { value: 'queue', label: 'Unassigned queue' }];

  return (
    <Drawer
      open={open}
      onClose={close}
      title={task ? 'Edit task' : 'New task'}
      footer={
        <>
          <Button onClick={close}>Cancel</Button>
          <Button variant="accent" type="submit" form="wk-task-form" pending={pending} pendingText="Saving">
            Save task
          </Button>
        </>
      }
    >
      <form
        key={key}
        id="wk-task-form"
        ref={formRef}
        className="wk-form"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          submittedFrom.current = state;
          startTransition(() => action(fd));
        }}
      >
        {task ? <input type="hidden" name="id" value={task.id} /> : null}
        {fresh && state.error && !state.ok ? (
          <div className="form-error" role="alert">
            {state.error}
          </div>
        ) : null}
        <Field label="Title" htmlFor="wk-title" error={errors.title} required>
          <Input id="wk-title" name="title" defaultValue={task?.title ?? ''} invalid={!!errors.title} autoFocus={!task} maxLength={300} />
        </Field>
        <div className="wk-form-row">
          <Field label="Type" htmlFor="wk-type" error={errors.type}>
            <Select id="wk-type" name="type" options={TASK_TYPES} defaultValue={task?.type ?? 'todo'} />
          </Field>
          <Field label="Owner" htmlFor="wk-owner" error={errors.ownerUserId}>
            <Select id="wk-owner" name="owner" options={ownerOptions} defaultValue={task ? task.ownerUserId ?? 'queue' : defaultOwner ?? 'queue'} />
          </Field>
        </div>
        <div className="wk-form-row">
          <Field label="Due date" htmlFor="wk-due" error={errors.dueDate}>
            <Input id="wk-due" name="due_date" type="date" defaultValue={task?.dueDate ?? ''} invalid={!!errors.dueDate} />
          </Field>
          <Field label="Time" htmlFor="wk-time" error={errors.dueTime} hint="Leave empty for all day">
            <Input id="wk-time" name="due_time" type="time" defaultValue={task?.dueTime ?? ''} invalid={!!errors.dueTime} />
          </Field>
        </div>
        <div className="wk-form-row">
          <Field label="Priority" htmlFor="wk-priority" error={errors.priority}>
            <Select id="wk-priority" name="priority" options={PRIORITIES} defaultValue={task?.priority ?? 'medium'} />
          </Field>
          <Field label="Repeat" htmlFor="wk-repeat" error={errors.recurrenceRule}>
            <Select id="wk-repeat" name="repeat" options={repeatOptions} value={repeat} onChange={(e) => setRepeat(e.target.value)} />
          </Field>
        </div>
        <Field label="Reminder" htmlFor="wk-remind" error={errors.remindBeforeMinutes} hint="Shows in the bell for the owner">
          <Select id="wk-remind" name="remind" options={reminderOptions} defaultValue={reminder} />
        </Field>
        <LinkPicker value={links} onChange={setLinks} />
        {errors.links ? <span className="field-error">{errors.links}</span> : null}
        <Field label="Notes" htmlFor="wk-body" error={errors.body}>
          <Textarea id="wk-body" name="body" rows={3} defaultValue={task?.body ?? ''} />
        </Field>
        <p className="wk-form-note" style={{ margin: 0 }}>
          {repeat
            ? 'The next one is created when this one is done.'
            : 'Overdue is worked out from the due date, so nothing needs updating by hand.'}
        </p>
      </form>
    </Drawer>
  );
}
