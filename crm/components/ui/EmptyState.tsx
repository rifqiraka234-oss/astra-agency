/** <EmptyState title="No deals yet" body="Qualify a lead to start one." action={<ButtonLink .../>} />. Class: empty. */
import type { ReactNode } from 'react';

export function EmptyState({ title, body, action }: { title: ReactNode; body?: ReactNode; action?: ReactNode }) {
  return (
    <div className="empty">
      <div className="empty-title">{title}</div>
      {body ? <div className="empty-body">{body}</div> : null}
      {action ? <div style={{ marginTop: 6 }}>{action}</div> : null}
    </div>
  );
}
