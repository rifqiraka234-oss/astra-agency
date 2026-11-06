/**
 * The title block of a settings panel: title, one line on what it does, and
 * the panel's main action.
 *   <PanelHeader title="Fields" sub="..." actions={<NewFieldButton />} />
 */
import type { ReactNode } from 'react';
import s from './settings.module.css';

export function PanelHeader({ title, sub, actions }: { title: ReactNode; sub?: ReactNode; actions?: ReactNode }) {
  return (
    <div className={s.head}>
      <div className={s.headText}>
        <h2 className={s.headTitle}>{title}</h2>
        {sub ? <div className={s.headSub}>{sub}</div> : null}
      </div>
      {actions ? <div className={s.headActions}>{actions}</div> : null}
    </div>
  );
}
