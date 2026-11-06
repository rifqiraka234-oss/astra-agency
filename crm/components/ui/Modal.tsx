'use client';
/**
 * <Modal open={open} onClose={() => setOpen(false)} title="New organization" footer={<Button>Save</Button>}>...</Modal>
 * Escape and the backdrop close it. wide gives 720px. Classes: overlay modal-overlay, modal, modal-head, modal-title.
 */
import { useEffect, useId, useRef, type ReactNode } from 'react';
import { Icon } from './Icon';

export function Modal({ open, onClose, title, children, footer, wide }: { open: boolean; onClose: () => void; title: ReactNode; children: ReactNode; footer?: ReactNode; wide?: boolean }) {
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const first = ref.current?.querySelector<HTMLElement>('input, select, textarea, button:not([aria-label="Close"])');
    first?.focus();
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="overlay modal-overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div ref={ref} role="dialog" aria-modal="true" aria-labelledby={id} className={['modal', wide ? 'modal-wide' : ''].join(' ')}>
        <div className="modal-head">
          <h2 id={id} className="modal-title">
            {title}
          </h2>
          <button type="button" className="icon-btn" aria-label="Close" onClick={onClose}>
            <Icon name="close" size={16} strokeWidth={2} />
          </button>
        </div>
        {children}
        {footer ? <div className="form-actions">{footer}</div> : null}
      </div>
    </div>
  );
}
