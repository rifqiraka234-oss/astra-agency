/**
 * Agent A. The white table card used by the record tabs (title, action,
 * grey note underneath), and the open tasks table both record pages show.
 */
import Link from 'next/link';
import type { ReactNode } from 'react';
import type { TaskListItem } from '@/lib/tasks';
import { formatDue } from '@/lib/format';
import { labelOf, TASK_TYPES } from '@/lib/options';
import { Table, type Column } from '@/components/ui/Table';
import { EmptyState } from '@/components/ui/EmptyState';
import styles from './orgs.module.css';

export function TabCard({ title, action, note, children }: { title: string; action?: ReactNode; note?: ReactNode; children: ReactNode }) {
  return (
    <div className={`card ${styles.tabCard}`}>
      <div className={styles.tabHead}>
        <h2 className={styles.tabTitle}>{title}</h2>
        {action}
      </div>
      {children}
      {note ? <div className={styles.tabNote}>{note}</div> : null}
    </div>
  );
}

export function TasksTable({ tasks, skipType = 'organization' }: { tasks: TaskListItem[]; skipType?: 'organization' | 'contact' }) {
  const columns: Column<TaskListItem>[] = [
    { key: 'title', label: 'Task', render: (t) => <Link className="cell-link" href={`/tasks?task=${t.id}`}>{t.title}</Link> },
    { key: 'type', label: 'Type', render: (t) => labelOf(TASK_TYPES, t.type) },
    {
      key: 'due',
      label: 'Due',
      render: (t) => (
        <span className={t.isOverdue ? 'danger' : undefined}>
          {formatDue(t.dueAt, t.allDay)}
          {t.repeat ? <span className={styles.cellSub}>Repeats {t.repeat}</span> : null}
        </span>
      ),
    },
    { key: 'owner', label: 'Owner', render: (t) => t.ownerName ?? <span className="muted">Unassigned</span> },
    {
      key: 'links',
      label: 'Also on',
      render: (t) =>
        t.links
          .filter((l) => l.type !== skipType)
          .map((l, i) => (
            <span key={l.id}>
              {i > 0 ? ', ' : ''}
              <Link href={l.href}>{l.label}</Link>
            </span>
          )),
    },
  ];
  return (
    <TabCard title="Open tasks" note="Use New task in the header to add one. Completed tasks drop off this list.">
      <Table columns={columns} rows={tasks} rowKey={(t) => t.id} caption="Open tasks" empty={<EmptyState title="No open tasks" />} />
    </TabCard>
  );
}
