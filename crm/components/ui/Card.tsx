/**
 * <Card>
 *   <CardHead title="Waiting for your go" sub="Nothing sends without it" actions={<a href="/approvals">All</a>} />
 *   <CardBody>...</CardBody>
 * </Card>
 * Classes: card, card-head, card-title, card-sub, card-body, card-row, card-foot.
 */
import type { HTMLAttributes, ReactNode } from 'react';

export function Card({ className, children, as = 'section', ...rest }: HTMLAttributes<HTMLElement> & { as?: 'section' | 'div' | 'article' }) {
  const Tag = as;
  return (
    <Tag className={['card', className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </Tag>
  );
}

export function CardHead({ title, sub, actions, id, level = 2 }: { title: ReactNode; sub?: ReactNode; actions?: ReactNode; id?: string; level?: 2 | 3 }) {
  const H = level === 2 ? 'h2' : 'h3';
  return (
    <div className="card-head">
      <div className="stack-sm" style={{ gap: 2 }}>
        <H id={id} className="card-title">
          {title}
        </H>
        {sub ? <span className="card-sub">{sub}</span> : null}
      </div>
      {actions ? <div className="row">{actions}</div> : null}
    </div>
  );
}

export function CardBody({ className, children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={['card-body', className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </div>
  );
}

export function CardFoot({ children }: { children: ReactNode }) {
  return <div className="card-foot">{children}</div>;
}
