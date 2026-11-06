'use client';
/** The bell button and its dropdown (agent C). See NotificationsBell for the data. */
import Link from 'next/link';
import { useEffect, useOptimistic, useRef, useState, useTransition } from 'react';
import { markAllNotificationsReadAction, markNotificationReadAction } from '@/lib/work/notification-actions';
import './work.css';

export type BellItem = { id: string; title: string; body: string | null; url: string | null; read: boolean; when: string };

export function NotificationsMenu({ items, unread }: { items: BellItem[]; unread: number }) {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const [, startTransition] = useTransition();
  const [readIds, markLocal] = useOptimistic<Set<string> | 'all', string | 'all'>(new Set(), (state, id) =>
    id === 'all' || state === 'all' ? 'all' : new Set([...state, id]),
  );
  const isRead = (n: BellItem) => n.read || readIds === 'all' || readIds.has(n.id);
  const count = readIds === 'all' ? 0 : Math.max(0, unread - items.filter((n) => !n.read && readIds.has(n.id)).length);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const read = (id: string) =>
    startTransition(async () => {
      markLocal(id);
      await markNotificationReadAction(id);
    });
  const readAll = () =>
    startTransition(async () => {
      markLocal('all');
      await markAllNotificationsReadAction();
    });

  return (
    <div className="menu-wrap" ref={wrap}>
      <button
        type="button"
        className="wk-bell"
        aria-label={count ? `Notifications, ${count} unread` : 'Notifications'}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((o) => !o)}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 8 3 8H3s3-1 3-8M10 20a2 2 0 0 0 4 0" />
        </svg>
        {count ? <span className="wk-bell-count">{count > 99 ? '99+' : count}</span> : null}
      </button>
      {open ? (
        <div className="menu wk-bell-menu" role="dialog" aria-label="Notifications">
          <div className="wk-bell-head">
            <span>Notifications</span>
            {count ? (
              <button type="button" className="btn btn-ghost btn-xs" onClick={readAll}>
                Mark all read
              </button>
            ) : null}
          </div>
          {items.length === 0 ? <div className="wk-empty-note">Nothing yet. Task reminders show up here when they fall due.</div> : null}
          {items.map((n) => {
            const done = isRead(n);
            const inner = (
              <>
                <span className="wk-note-title">{n.title}</span>
                <span className="wk-note-sub">{[n.body, n.when].filter(Boolean).join(', ')}</span>
              </>
            );
            return (
              <div key={n.id} className={`wk-note${done ? ' is-read' : ''}`}>
                <span className="wk-note-dot" aria-hidden="true" />
                {n.url ? (
                  <Link
                    href={n.url}
                    className="wk-note-main"
                    onClick={() => {
                      if (!done) read(n.id);
                      setOpen(false);
                    }}
                  >
                    {inner}
                  </Link>
                ) : (
                  <div className="wk-note-main">{inner}</div>
                )}
                {!done ? (
                  <button type="button" className="btn btn-ghost btn-xs" onClick={() => read(n.id)} aria-label={`Mark ${n.title} as read`}>
                    Read
                  </button>
                ) : null}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
