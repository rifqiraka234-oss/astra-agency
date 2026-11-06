'use client';
/**
 * A panel from the right (task create and edit).
 *   <Drawer open={open} onClose={close} title="New task" footer={<><Button onClick={close}>Cancel</Button><Button variant="primary" type="submit" form="task-form">Save</Button></>}>
 *     <form id="task-form" action={action}>...</form>
 *   </Drawer>
 * Classes: overlay drawer-overlay, drawer, drawer-head, drawer-body, drawer-foot.
 */
import { useEffect, useId, type ReactNode } from 'react';
import { Icon } from './Icon';

export function Drawer({ open, onClose, title, children, footer }: { open: boolean; onClose: () => void; title: ReactNode; children: ReactNode; footer?: ReactNode }) {
  const id = useId();
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="overlay drawer-overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <aside role="dialog" aria-modal="true" aria-labelledby={id} className="drawer">
        <div className="drawer-head">
          <h2 id={id} className="modal-title">
            {title}
          </h2>
          <button type="button" className="icon-btn" aria-label="Close" onClick={onClose}>
            <Icon name="close" size={16} strokeWidth={2} />
          </button>
        </div>
        <div className="drawer-body">{children}</div>
        {footer ? <div className="drawer-foot">{footer}</div> : null}
      </aside>
    </div>
  );
}
