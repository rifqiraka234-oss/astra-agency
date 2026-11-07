/**
 * The Stage timeline panel on /leads/[id] and /deals/[id]: every stage of the
 * pipeline in order with when the record entered and left it, the time spent
 * (every visit summed) and who moved it in. Server component.
 *
 *   <StageTimeline rows={await stageTimeline('deal', deal.id, stages, deal.stage_id)} />
 */
import { formatDateTime } from '@/lib/format';
import { formatDuration, type StageTimelineRow } from '@/lib/sales/stage-times';
import styles from './sales.module.css';

export function StageTimeline({ rows, id = 'stl-h' }: { rows: StageTimelineRow[]; id?: string }) {
  const rebuilt = rows.some((r) => r.fromHistory);
  return (
    <section aria-labelledby={id} className={styles.panel}>
      <div className={styles.panelHead}>
        <h2 id={id} className={styles.panelTitle}>
          Stage timeline
        </h2>
        <span className="small muted">Time spent adds up every visit</span>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table className={styles.lines} style={{ minWidth: 640 }}>
          <thead>
            <tr>
              <th scope="col">Stage</th>
              <th scope="col">Entered</th>
              <th scope="col">Exited</th>
              <th scope="col">Time spent</th>
              <th scope="col">Moved by</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const quiet = r.status === 'skipped' || r.status === 'not_reached';
              const cls = [quiet ? styles.stageSkipped : '', r.status === 'current' ? styles.stageCurrent : ''].join(' ');
              return (
                <tr key={r.stageId} className={cls} aria-current={r.status === 'current' ? 'step' : undefined}>
                  <td>
                    {r.name}
                    {r.status === 'current' ? <span className={styles.stageTag}>Current</span> : null}
                    {r.archived ? <span className={styles.stageTag}>Archived stage</span> : null}
                    {r.timesEntered > 1 ? <div className={styles.lineNote}>Entered {r.timesEntered} times</div> : null}
                  </td>
                  {quiet ? (
                    <td colSpan={4}>{r.status === 'skipped' ? (rebuilt ? 'Skipped, or no date recorded' : 'Skipped') : 'Not reached'}</td>
                  ) : (
                    <>
                      <td className="nowrap">{r.firstEnteredAt ? formatDateTime(r.firstEnteredAt) : 'No date recorded'}</td>
                      <td className="nowrap">{r.status === 'current' ? 'Still here' : r.lastExitedAt ? formatDateTime(r.lastExitedAt) : 'No date recorded'}</td>
                      <td>{r.status === 'current' ? `${formatDuration(r.totalSeconds)} so far` : r.lastExitedAt || r.totalSeconds ? formatDuration(r.totalSeconds) : ''}</td>
                      <td>{r.movedBy ?? ''}</td>
                    </>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {rebuilt ? (
        <p className="small muted" style={{ margin: '0 16px 14px' }}>
          Dates from before the import are rebuilt from what was stored, like the LinkedIn accept, the opener and the status change. A stage with no stored date has none.
        </p>
      ) : null}
    </section>
  );
}
