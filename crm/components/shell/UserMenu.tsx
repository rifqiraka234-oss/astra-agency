'use client';
/** The avatar in the header, with the user's name, role and Sign out. */
import { useEffect, useRef, useState } from 'react';
import { signOutAction } from '@/app/(app)/_actions/session';
import { Icon } from '../ui/Icon';

export function UserMenu({ name, initials, bg, fg, roleLabel }: { name: string; initials: string; bg: string; fg: string; roleLabel: string }) {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);
  return (
    <div className="menu-wrap" ref={wrap}>
      <button
        type="button"
        className="avatar"
        style={{ background: bg, color: fg }}
        aria-label={`Signed in as ${name}`}
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((o) => !o)}
      >
        {initials}
      </button>
      {open ? (
        <div className="menu" role="menu" style={{ top: 46 }}>
          <div style={{ padding: '8px 12px 10px' }}>
            <div style={{ fontWeight: 600 }}>{name}</div>
            <div className="small muted">{roleLabel}</div>
          </div>
          <div className="menu-sep" />
          <form action={signOutAction}>
            <button type="submit" role="menuitem" className="menu-item" style={{ width: '100%' }}>
              Sign out
              <Icon name="logout" size={16} />
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
}
