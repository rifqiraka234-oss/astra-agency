/**
 * /settings/integrations (agent E). lemlist status from sync_cursors with a
 * button for a small read only sync, the V2 connectors shown as not connected,
 * and scoped API keys. Layout and admin check come from agent D's settings layout.
 */
import { lemlistStatus } from '@/lib/integrations/lemlist-sync';
import { API_SCOPES, listApiKeys } from '@/lib/integrations/api-keys';
import { formatAgo, formatDateTime } from '@/lib/format';
import { PanelHeader } from '@/components/settings/PanelHeader';
import { ActionButton } from '@/components/settings/ActionButton';
import { Badge } from '@/components/ui/Badge';
import { runLemlistSyncAction, revokeApiKeyAction } from './actions';
import { ApiKeyForm } from './ApiKeyForm';

export const metadata = { title: 'Integrations and API, Settings' };
export const dynamic = 'force-dynamic';

type LastRun = {
  contactsSynced?: number;
  threadsPulled?: number;
  threadItems?: number;
  activitiesCreated?: number;
  repliesEmitted?: number;
  requests?: number;
  errors?: { contactId: string; error: string }[];
  campaigns?: { id: string; name: string; leads: number; accepts: number; statsAccepted: number | null; synced: number }[];
};

const n = (v: number | undefined | null) => (v ?? 0).toLocaleString('en-GB');

const V2 = [
  { name: 'Gmail', what: 'Two way email sync per inbox, sending from the CRM after approval. Emails match contacts by address.' },
  { name: 'Google Calendar', what: 'Meetings with known contacts logged with their outcome, booking links create the meeting and the task.' },
  { name: 'Moneybird', what: 'Draft invoices go across, Moneybird numbers and sends them, paid and late status comes back.' },
  { name: 'Outgoing webhooks', what: 'Signed events with retries when a deal changes stage, a ticket opens or an invoice is paid.' },
];

export default async function IntegrationsPage() {
  const [{ streams, counts }, keys] = await Promise.all([lemlistStatus(), listApiKeys()]);
  const threads = streams.find((s) => s.stream === 'threads');
  const lastRun = (threads?.cursor?.last_run ?? null) as LastRun | null;
  const mismatches = (threads?.cursor?.mismatches ?? []) as { contactId: string; problem: string }[];
  const campaigns = streams.filter((s) => s.stream.startsWith('campaign:'));
  const lastSuccess = threads?.last_success_at ?? null;
  const failing = Boolean(threads?.last_error);
  const state = !threads ? { label: 'Not synced yet', tone: 'grey' as const } : failing ? { label: 'Last run had errors', tone: 'amber' as const } : { label: 'Connected, read only', tone: 'green' as const };
  const live = keys.filter((k) => !k.revoked_at);

  return (
    <>
      <PanelHeader title="Integrations and API" sub="Connected services and API keys. lemlist is read only in V1, nothing here sends a message." />

      <div className="row" style={{ flexWrap: 'wrap', gap: 14, alignItems: 'stretch' }}>
        <section className="card card-pad stack" style={{ flex: '2 1 420px', minWidth: 0, gap: 10 }} aria-labelledby="lemlist-title">
          <div className="row-between" style={{ gap: 8, flexWrap: 'wrap' }}>
            <h3 id="lemlist-title" className="card-title" style={{ fontSize: 15 }}>
              lemlist
            </h3>
            <Badge tone={state.tone}>{state.label}</Badge>
          </div>
          <div className="small secondary" style={{ lineHeight: 1.5 }}>
            Running campaigns are pulled one accepted contact at a time. Each contact gets a full thread pull, every page, and the stored count is checked against
            the count lemlist reports. A new reply moves the lead and asks the owner to answer.
          </div>
          <div className="row" style={{ flexWrap: 'wrap', gap: 10 }}>
            <div className="stat" style={{ flex: '1 1 120px' }}>
              <div className="stat-label">Last full sync</div>
              <div className="stat-value mono" style={{ fontSize: 18 }}>{lastSuccess ? formatAgo(lastSuccess) : 'Never'}</div>
              <div className="stat-sub">{lastSuccess ? formatDateTime(lastSuccess) : 'Run it below or with npm run sync:lemlist'}</div>
            </div>
            <div className="stat" style={{ flex: '1 1 120px' }}>
              <div className="stat-label">Contacts linked</div>
              <div className="stat-value mono" style={{ fontSize: 18 }}>{n(counts.contacts)}</div>
              <div className="stat-sub">{n(counts.leads)} lemlist leads in the CRM</div>
            </div>
            <div className="stat" style={{ flex: '1 1 120px' }}>
              <div className="stat-label">Messages and events</div>
              <div className="stat-value mono" style={{ fontSize: 18 }}>{n(counts.activities)}</div>
              <div className="stat-sub">on the timelines</div>
            </div>
            <div className="stat" style={{ flex: '1 1 120px' }}>
              <div className="stat-label">Thread mismatches</div>
              <div className={`stat-value mono ${mismatches.length ? 'danger' : ''}`} style={{ fontSize: 18 }}>
                {n(mismatches.length)}
              </div>
              <div className="stat-sub">in the last run</div>
            </div>
          </div>
          {lastRun ? (
            <div className="small muted">
              Last run {n(lastRun.contactsSynced)} contacts, {n(lastRun.threadsPulled)} threads with {n(lastRun.threadItems)} items, {n(lastRun.activitiesCreated)} new activities,{' '}
              {n(lastRun.repliesEmitted)} new replies, {n(lastRun.requests)} read requests
              {lastRun.errors?.length ? `, ${lastRun.errors.length} failed` : ''}.
            </div>
          ) : null}
          {threads?.last_error ? <div className="small warning">{threads.last_error}</div> : null}
          {mismatches.length ? (
            <ul className="small" style={{ margin: 0, paddingLeft: 18 }}>
              {mismatches.slice(0, 10).map((m) => (
                <li key={m.contactId}>
                  <span className="mono">{m.contactId}</span> {m.problem}
                </li>
              ))}
            </ul>
          ) : null}
          {campaigns.length ? (
            <div className="table-wrap">
              <table className="table" style={{ minWidth: 480 }}>
                <thead>
                  <tr>
                    <th scope="col">Campaign</th>
                    <th scope="col" className="num">Leads</th>
                    <th scope="col" className="num">Accepted</th>
                    <th scope="col" className="num">Synced last run</th>
                    <th scope="col">Checked</th>
                  </tr>
                </thead>
                <tbody>
                  {campaigns.map((c) => {
                    const cur = c.cursor as { name?: string; leads?: number; accepts?: number; stats_accepted?: number | null; synced_last_run?: number };
                    const off = cur.stats_accepted !== null && cur.stats_accepted !== undefined && cur.stats_accepted !== cur.accepts;
                    return (
                      <tr key={c.stream}>
                        <td className="small">{cur.name ?? c.stream}</td>
                        <td className="num">{n(cur.leads)}</td>
                        <td className={`num ${off ? 'danger' : ''}`} title={off ? `lemlist stats say ${cur.stats_accepted}` : undefined}>
                          {n(cur.accepts)}
                        </td>
                        <td className="num">{n(cur.synced_last_run)}</td>
                        <td className="small muted">{c.last_success_at ? formatAgo(c.last_success_at) : 'Not yet'}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : null}
          <div className="row" style={{ gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
            <ActionButton action={runLemlistSyncAction} fields={{}} variant="primary" size="md" pendingText="Syncing, this takes a minute">
              Run sync now
            </ActionButton>
            <span className="small muted">Pulls up to 25 contacts. The full run is npm run sync:lemlist.</span>
          </div>
        </section>

        <div className="stack" style={{ flex: '1 1 280px', minWidth: 0, gap: 14 }}>
          {V2.map((c) => (
            <section key={c.name} className="card card-pad stack" style={{ gap: 6 }} aria-label={c.name}>
              <div className="row-between" style={{ gap: 8 }}>
                <h3 className="card-title" style={{ fontSize: 15 }}>
                  {c.name}
                </h3>
                <Badge tone="grey">V2, not connected</Badge>
              </div>
              <div className="small secondary" style={{ lineHeight: 1.5 }}>
                {c.what}
              </div>
            </section>
          ))}
        </div>
      </div>

      <section className="card" aria-labelledby="keys-title">
        <div className="card-head">
          <div className="stack-sm" style={{ gap: 2 }}>
            <h3 id="keys-title" className="card-title" style={{ fontSize: 15 }}>
              API keys
            </h3>
            <span className="card-sub">
              {live.length} active. Scoped keys for your own tools, for example the Claude routines. The key is shown once, only a fingerprint is stored.
            </span>
          </div>
        </div>
        {keys.length ? (
          <div className="table-wrap">
            <table className="table" style={{ minWidth: 640 }}>
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Key</th>
                  <th scope="col">Scopes</th>
                  <th scope="col">Created</th>
                  <th scope="col">Last used</th>
                  <th scope="col">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {keys.map((k) => (
                  <tr key={k.id} className={k.revoked_at ? 'is-muted' : undefined}>
                    <td>{k.name}</td>
                    <td className="mono small">{k.key_prefix}...</td>
                    <td className="small">{k.scopes.map((sc) => API_SCOPES.find((x) => x.value === sc)?.label ?? sc).join(', ')}</td>
                    <td className="small">
                      {formatDateTime(k.created_at)}
                      {k.created_by_name ? `, ${k.created_by_name}` : ''}
                    </td>
                    <td className="small">{k.last_used_at ? formatAgo(k.last_used_at) : 'Never'}</td>
                    <td>
                      {k.revoked_at ? (
                        <Badge tone="grey">Revoked</Badge>
                      ) : (
                        <ActionButton action={revokeApiKeyAction} fields={{ id: k.id }} variant="danger" confirm={`Revoke ${k.name}? Anything using it stops working.`}>
                          Revoke
                        </ActionButton>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
        <div className="card-pad" style={{ borderTop: keys.length ? '1px solid var(--divider-soft)' : undefined }}>
          <ApiKeyForm scopes={API_SCOPES.map((s) => ({ value: s.value, label: s.label }))} />
        </div>
      </section>
    </>
  );
}
