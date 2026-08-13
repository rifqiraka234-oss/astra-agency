import { requireSession } from '@/lib/auth';
import { loadCapabilities, loadEnrichmentRuns, loadTier2View } from '@/lib/unified-queries';

export const dynamic = 'force-dynamic';

/**
 * The enrichment view.
 *
 * Three things, in the order they matter to a human: what is waiting for a
 * go/no go, what the last runs actually did, and which provider capabilities
 * are known to be missing. The last one exists so a documented gap stops being
 * rediscovered every few days.
 */
export default async function EnrichmentPage() {
  await requireSession();
  const [tier2, runs, capabilities] = await Promise.all([
    loadTier2View(),
    loadEnrichmentRuns(),
    loadCapabilities(),
  ]);

  return (
    <>
      <h1 style={{ fontSize: 20 }}>Enrichment</h1>

      <section className="panel">
        <h2>Tier 2 queue ({tier2.rows.length})</h2>
        <p className="muted">
          {tier2.counts.manualReview} manual review, {tier2.counts.doNotUse} do not use,{' '}
          {tier2.counts.lowConfidenceInclude} confident include awaiting import.
        </p>
        {tier2.rows.length === 0 ? (
          <p className="muted">Nothing waiting.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Company</th>
                  <th>Outcome</th>
                  <th>Reasons</th>
                  <th>Connection message</th>
                  <th>First message</th>
                </tr>
              </thead>
              <tbody>
                {tier2.rows.map((row) => (
                  <tr key={row.decision_id}>
                    <td>{[row.first_name, row.last_name].filter(Boolean).join(' ') || '—'}</td>
                    <td>{row.company_name ?? '—'}</td>
                    <td>
                      <span className="tag">{row.eligibility}</span>
                    </td>
                    <td className="muted">{row.reason_codes.join(', ')}</td>
                    {/* A queued MANUAL_REVIEW or DO_NOT_USE row has no drafted
                        message, and showing an empty cell is the honest
                        representation of that. */}
                    <td>{row.connection_message ?? <span className="muted">not drafted</span>}</td>
                    <td>{row.first_message ?? <span className="muted">not drafted</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="panel">
        <h2>Recent runs</h2>
        {runs.length === 0 ? (
          <p className="muted">No runs yet.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <th>Started</th>
                  <th>Processed</th>
                  <th>Include</th>
                  <th>Manual</th>
                  <th>Exclude</th>
                  <th>Imported</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {runs.map((run) => (
                  <tr key={run.runId}>
                    <td className="muted">{run.startedAt.replace('T', ' ').slice(0, 16)}</td>
                    <td>{run.processed}</td>
                    <td>{run.includeCount}</td>
                    <td>{run.manualReviewCount}</td>
                    <td>{run.excludeCount}</td>
                    <td>{run.importedCount}</td>
                    <td>
                      {run.halted ? (
                        <span className="tag">halted: {run.haltReason}</span>
                      ) : run.completedAt === null ? (
                        <span className="tag">running</span>
                      ) : (
                        <span className="tag">done</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="panel">
        <h2>Provider capabilities</h2>
        <p className="muted">
          A missing field is a documented limit, not an error. It is listed here so it is not
          rediscovered on a fourth day.
        </p>
        {capabilities.length === 0 ? (
          <p className="muted">Nothing probed yet.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <th>Operation</th>
                  <th>Auth</th>
                  <th>Runtime</th>
                  <th>Reachability</th>
                  <th>Missing fields</th>
                  <th>Last verified</th>
                </tr>
              </thead>
              <tbody>
                {capabilities.map((cap) => (
                  <tr key={cap.operation}>
                    <td>
                      <code>{cap.operation}</code>
                    </td>
                    <td>{cap.auth}</td>
                    <td>{cap.enablement}</td>
                    <td>{cap.reachability}</td>
                    <td className="muted">{cap.missingFields.join(', ') || 'none'}</td>
                    <td className="muted">
                      {cap.lastVerifiedAt?.replace('T', ' ').slice(0, 16) ?? 'never'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}
