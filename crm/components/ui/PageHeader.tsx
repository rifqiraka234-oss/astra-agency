/**
 * <PageHeader eyebrow="Friday 6 November" title="Your day" subtitle="..." actions={<ButtonLink ...>} />
 * Classes: page-header, page-eyebrow, page-title, page-subtitle, page-actions.
 */
import type { ReactNode } from 'react';

export function PageHeader({ title, eyebrow, subtitle, actions }: { title: ReactNode; eyebrow?: ReactNode; subtitle?: ReactNode; actions?: ReactNode }) {
  return (
    <div className="page-header">
      <div className="page-header-text">
        {eyebrow ? <div className="page-eyebrow">{eyebrow}</div> : null}
        <h1 className="page-title">{title}</h1>
        {subtitle ? <div className="page-subtitle">{subtitle}</div> : null}
      </div>
      {actions ? <div className="page-actions">{actions}</div> : null}
    </div>
  );
}
