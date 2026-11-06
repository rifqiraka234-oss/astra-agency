/**
 * /settings/automations (agent E). The rules on the left with their state and
 * run counts, the picked rule on the right as When / If / Then steps like the
 * Settings design, with its on and off switch and the run history underneath.
 * The layout and the admin check come from agent D's settings layout.
 */
import Link from 'next/link';
import { listRules, ruleRuns, runSummary, triggerText, workerBacklog, type RunItem } from '@/lib/automations/queries';
import { formatAgo, formatDateTime } from '@/lib/format';
import { recordHref, type RecordType } from '@/lib/routes';
import { PanelHeader } from '@/components/settings/PanelHeader';
import { ActionButton } from '@/components/settings/ActionButton';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/EmptyState';
import { runRuleNowAction, setRuleEnabledAction } from './actions';
import a from './automations.module.css';

export const metadata = { title: 'Automations, Settings' };
export const dynamic = 'force-dynamic';

const DOT: Record<string, string> = { When: a.dotWhen, If: a.dotIf, Then: a.dotThen, Wait: a.dotWait };
const STATUS_TONE = { success: 'green', skipped: 'grey', failed: 'red' } as const;
const STATUS_LABEL = { success: 'Done', skipped: 'Nothing to do', failed: 'Failed' } as const;
const RECORD_TYPES = new Set<string>(['organization', 'contact', 'lead', 'deal', 'project', 'ticket', 'invoice', 'task']);

function changeHref(entity: string, id: string | null | undefined): string | null {
  if (!id) return null;
  if (entity === 'outbound_message') return '/approvals';
  return RECORD_TYPES.has(entity) ? recordHref(entity as RecordType, id) : null;
}

function triggerCell(run: RunItem): string {
  if (run.event_id) return `${run.event_type ?? 'Event'} ${run.event_id}${run.event_attempts && run.event_attempts > 1 ? `, try ${run.event_attempts}` : ''}`;
  if (run.run_key?.startsWith('manual:')) return 'Run by hand';
  return run.run_key ? `Schedule ${run.run_key}` : 'Schedule';
}

export default async function AutomationsPage({ searchParams }: { searchParams: Promise<{ rule?: string }> }) {
  const sp = await searchParams;
  const [rules, backlog] = await Promise.all([listRules(), workerBacklog()]);
  const current = rules.find((r) => r.key === sp.rule) ?? rules[0] ?? null;
  const runs = current ? await ruleRuns(current.id) : [];

  return (
    <>
      <PanelHeader
        title="Automations"
        sub="When something happens, check a condition, then act. The worker runs them and logs every run with what it changed."
      />

      {backlog.pending > 0 ? (
        <div className="card card-pad small" role="status">
          {backlog.pending} {backlog.pending === 1 ? 'event is' : 'events are'} waiting for the worker
          {backlog.oldest ? `, the oldest from ${formatAgo(backlog.oldest)}` : ''}
          {backlog.failing ? `. ${backlog.failing} failed and will be retried` : ''}. Start it with <span className="mono">npm run worker</span>.
        </div>
      ) : null}

      {!current ? (
        <div className="card card-pad">
          <EmptyState title="No automations yet" body="The built in rules arrive with the database migrations." />
        </div>
      ) : (
        <div className="row" style={{ alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
          <nav className={`card ${a.list}`} aria-label="Automations">
            {rules.map((r) => (
              <Link key={r.id} href={`/settings/automations?rule=${r.key}`} className={a.item} aria-current={r.id === current.id ? 'true' : undefined}>
                <span className={a.itemTop}>
                  <span className={a.itemName}>{r.name}</span>
                  <Badge tone={r.is_enabled ? 'green' : 'grey'}>{r.is_enabled ? 'On' : 'Off'}</Badge>
                </span>
                <span className={a.itemMeta}>{runSummary(r)}</span>
              </Link>
            ))}
          </nav>

          <section className={`card ${a.detail}`} aria-labelledby="rule-title">
            <div className={a.detailHead}>
              <div>
                <h3 id="rule-title" className={a.detailTitle}>
                  {current.name}
                </h3>
                <div className={a.detailSub}>
                  {triggerText(current)}. {current.description}
                </div>
              </div>
              <div className="row" style={{ gap: 8, flexWrap: 'wrap' }}>
                {current.trigger_type === 'schedule' && current.is_enabled ? (
                  <ActionButton action={runRuleNowAction} fields={{ key: current.key }} pendingText="Running">
                    Run now
                  </ActionButton>
                ) : null}
                <ActionButton
                  action={setRuleEnabledAction}
                  fields={{ id: current.id, enabled: current.is_enabled ? 'false' : 'true' }}
                  variant={current.is_enabled ? 'secondary' : 'primary'}
                  confirm={current.is_enabled ? `Turn off ${current.name}? Nothing it would do happens while it is off.` : undefined}
                >
                  {current.is_enabled ? 'Turn off' : 'Turn on'}
                </ActionButton>
              </div>
            </div>

            <ol className={a.steps} style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {current.steps.map(([kind, text], i) => (
                <li key={i} className={a.step}>
                  <div className={a.rail} aria-hidden="true">
                    <span className={`${a.dot} ${DOT[kind] ?? a.dotThen}`}>{i + 1}</span>
                    <span className={a.line} />
                  </div>
                  <div className={a.stepBody}>
                    <div className={a.stepKind}>{kind}</div>
                    <div className={a.stepText}>{text}</div>
                  </div>
                </li>
              ))}
            </ol>
            <div className={a.foot}>Every run is logged with what it changed. Anything that sends a message stops at the approval queue.</div>
          </section>
        </div>
      )}

      {current ? (
        <div className="card">
          <div className="card-head">
            <h3 className="card-title" style={{ fontSize: 15 }}>
              Run history
            </h3>
            <span className="card-sub">
              {current.runs_total} {current.runs_total === 1 ? 'run' : 'runs'} that did something
              {current.last_run_at ? `, last ${formatAgo(current.last_run_at)}` : ''}
            </span>
          </div>
          {runs.length === 0 ? (
            <div className="card-pad">
              <EmptyState title="No runs yet" body={current.trigger_type === 'event' ? 'It runs the next time its event happens and the worker picks it up.' : 'It runs on its schedule while the worker is running.'} />
            </div>
          ) : (
            <div className="table-wrap">
              <table className="table" style={{ minWidth: 640 }}>
                <thead>
                  <tr>
                    <th scope="col">When</th>
                    <th scope="col">Trigger</th>
                    <th scope="col">Result</th>
                    <th scope="col">What changed</th>
                  </tr>
                </thead>
                <tbody>
                  {runs.map((run) => (
                    <tr key={run.id}>
                      <td className={`small ${a.when}`}>{formatDateTime(run.started_at)}</td>
                      <td className="small mono">{triggerCell(run)}</td>
                      <td>
                        <Badge tone={STATUS_TONE[run.status]}>{STATUS_LABEL[run.status]}</Badge>
                      </td>
                      <td>
                        {run.error ? <div className="small danger">{run.error}</div> : null}
                        {run.changes.length ? (
                          <ul className={a.changes}>
                            {run.changes.map((c, i) => {
                              const href = changeHref(c.entity, c.id);
                              return <li key={i}>{href ? <Link href={href}>{c.label}</Link> : <span className={c.action === 'note' || c.action === 'kept' ? 'muted' : undefined}>{c.label}</span>}</li>;
                            })}
                          </ul>
                        ) : !run.error ? (
                          <span className="small muted">No changes</span>
                        ) : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : null}
    </>
  );
}
