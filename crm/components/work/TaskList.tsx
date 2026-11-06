'use client';
/**
 * Task rows with the tick box (agent C). Ticking is optimistic: the row strikes
 * through at once, the server action completes it (and creates the next repeat).
 *   <TaskList variant="home" groups={[{ key: 'day', items }]} />          the Main design list
 *   <TaskList variant="tasks" groups={[{ key: 'overdue', name: 'Overdue', red: true, items }]} />
 * Items are plain data built on the server, see toTaskView in lib/work/view.ts.
 */
import Link from 'next/link';
import { useOptimistic, useState, useTransition } from 'react';
import { toggleTaskAction } from '@/app/(app)/tasks/actions';
import type { TaskView } from '@/lib/work/view';
import './work.css';

export type TaskGroup = { key: string; name?: string; red?: boolean; items: TaskView[]; empty?: string };

function Check({ item, done, onToggle }: { item: TaskView; done: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      className="wk-check"
      aria-pressed={done}
      aria-label={done ? `Mark ${item.title} as not done` : `Mark ${item.title} as done`}
      disabled={!item.canToggle}
      title={item.canToggle ? undefined : 'Only the owner or an admin can tick this off'}
      onClick={onToggle}
    >
      {done ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m5 12 5 5 9-10" />
        </svg>
      ) : null}
    </button>
  );
}

export function TaskList({ groups, variant }: { groups: TaskGroup[]; variant: 'home' | 'tasks' }) {
  const [, startTransition] = useTransition();
  const [notice, setNotice] = useState<{ text: string; error?: boolean } | null>(null);
  const [optimistic, setOptimistic] = useOptimistic<Record<string, boolean>, { id: string; done: boolean }>({}, (state, a) => ({
    ...state,
    [a.id]: a.done,
  }));

  const toggle = (item: TaskView) => {
    const next = !(optimistic[item.id] ?? item.done);
    setNotice(null);
    startTransition(async () => {
      setOptimistic({ id: item.id, done: next });
      const res = await toggleTaskAction(item.id, next);
      if (!res.ok) setNotice({ text: res.error ?? "That didn't save, try again", error: true });
      else if (res.message) setNotice({ text: res.message });
    });
  };

  const row = (item: TaskView) => {
    const done = optimistic[item.id] ?? item.done;
    const title = item.editHref ? (
      <Link href={item.editHref} className="wk-task-title" scroll={false}>
        {item.title}
      </Link>
    ) : (
      <span className="wk-task-title">{item.title}</span>
    );
    if (variant === 'home') {
      return (
        <div key={item.id} className={`wk-task${done ? ' wk-done' : ''}`}>
          <Check item={item} done={done} onToggle={() => toggle(item)} />
          <div className="wk-task-main">
            {title}
            <div className="wk-task-meta">
              <span className="wk-type">{item.typeLabel}</span>
              {item.links.length ? (
                <a href={item.links[0].href}>{item.links.map((l) => l.label).join(', ')}</a>
              ) : null}
              {item.repeat ? <span>Repeats {item.repeat}</span> : null}
            </div>
          </div>
          <div className="wk-task-side">
            <span className={`wk-due${item.overdue ? ' wk-due-red' : ''}`}>{item.dueLabel}</span>
            <span className="wk-priority">{item.priorityLabel}</span>
          </div>
        </div>
      );
    }
    return (
      <div key={item.id} className={`wk-trow${done ? ' wk-done' : ''}`}>
        <Check item={item} done={done} onToggle={() => toggle(item)} />
        <div className="wk-task-main">
          {title}
          {item.links.length || item.repeat ? (
            <div className="wk-task-meta">
              {item.links.map((l) => (
                <a key={`${l.type}:${l.id}`} href={l.href} className="wk-link-chip">
                  {l.label}
                </a>
              ))}
              {item.repeat ? <span>Repeats {item.repeat}</span> : null}
            </div>
          ) : null}
        </div>
        <span className="wk-trow-type">{item.typeLabel}</span>
        <span className="wk-owner" style={{ background: item.ownerBg }} aria-label={`Owner ${item.ownerName}`} title={item.ownerName}>
          {item.ownerInitials}
        </span>
        <span className={`wk-due${item.overdue ? ' wk-due-red' : ''}`}>{item.dueLabel}</span>
        <span className="wk-priority">{item.priorityLabel}</span>
      </div>
    );
  };

  const toast = notice ? (
    <div className={`wk-toast${notice.error ? ' wk-toast-error' : ''}`} role={notice.error ? 'alert' : 'status'}>
      {notice.text}
    </div>
  ) : null;

  if (variant === 'home') {
    const items = groups.flatMap((g) => g.items);
    return (
      <div>
        {toast ? <div style={{ padding: '12px 20px 0' }}>{toast}</div> : null}
        {items.length ? items.map(row) : <div className="wk-empty-note">{groups[0]?.empty ?? 'Nothing due today.'}</div>}
      </div>
    );
  }

  return (
    <>
      {toast}
      {groups
        .filter((g) => g.items.length > 0)
        .map((g) => (
          <section key={g.key} aria-label={g.name} className={`card wk-group${g.red ? ' wk-group-red' : ''}`}>
            <div className="wk-group-head">
              <h2 className="wk-group-title">{g.name}</h2>
              <span className="wk-group-count">{g.items.length}</span>
            </div>
            {g.items.map(row)}
          </section>
        ))}
    </>
  );
}
