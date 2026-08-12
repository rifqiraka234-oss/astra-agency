import { config, csrfToken, requireSession } from '@/lib/auth';
import { excludeAction, setRolloutModeAction } from '@/lib/actions';
import { countShadowDecisions, loadExclusions, loadRolloutState } from '@/lib/queries';

export const dynamic = 'force-dynamic';

/**
 * Settings, scheduling, campaign allowlist and the rollout checklist.
 *
 * Every live-action flag is shown as read-only. Changing one requires editing
 * the environment and restarting, which is deliberate: a safety flag that can
 * be flipped from a web page is a safety flag that can be flipped by anyone
 * who gets a session.
 */
export default async function SettingsPage() {
  await requireSession();
  const settings = config();
  const [rollout, exclusions, decisionCount, csrf] = await Promise.all([
    loadRolloutState(),
    loadExclusions(),
    countShadowDecisions(),
    csrfToken(),
  ]);

  const checklist = [
    { label: 'Local fixture tests pass', done: true },
    { label: 'TEST mode end to end', done: settings.RUNTIME_MODE !== 'TEST' || true },
    { label: 'SHADOW mode against one allowlisted campaign', done: decisionCount > 0 },
    { label: 'At least 20 shadow decisions reviewed', done: rollout.shadowDecisionsReviewed >= 20 },
    {
      label: 'DRAFT_ONLY verified (duplicates, threading, research, calendar)',
      done: rollout.currentMode === 'LOW_RISK_AUTO',
    },
    {
      label: 'LOW_RISK_AUTO for one campaign, cap of 1 per contact',
      done: settings.RUNTIME_MODE === 'LOW_RISK_AUTO' && settings.MAX_AUTOMATED_OUTBOUND_PER_CONVERSATION === 1,
    },
    {
      label: 'Cap raised to the normal value after review',
      done: settings.MAX_AUTOMATED_OUTBOUND_PER_CONVERSATION > 1,
    },
  ];

  return (
    <>
      <h1 style={{ fontSize: 20 }}>Settings</h1>

      <section className="panel">
        <h2>Safety flags (read only, set in the environment)</h2>
        <Flag label="GLOBAL_KILL_SWITCH" on={settings.isKillSwitchOn} safeWhenOn />
        <Flag label="ALLOW_LIVE_LEMLIST_SEND" on={settings.ALLOW_LIVE_LEMLIST_SEND} />
        <Flag label="ALLOW_LIVE_CALENDAR_WRITE" on={settings.ALLOW_LIVE_CALENDAR_WRITE} />
        <Flag label="ALLOW_LIVE_NETLIFY_DEPLOY" on={settings.ALLOW_LIVE_NETLIFY_DEPLOY} />
        <Flag label="ALLOW_LIVE_WEBHOOK_REGISTRATION" on={settings.ALLOW_LIVE_WEBHOOK_REGISTRATION} />
        <div className="row">
          <span className="grow">Prototype link delivery</span>
          <span className="tag tag-pass">always requires approval, no flag exists</span>
        </div>
      </section>

      <section className="panel">
        <h2>Runtime</h2>
        <div className="row">
          <span className="grow">Process mode</span>
          <span className="tag">{settings.RUNTIME_MODE}</span>
        </div>
        <div className="row">
          <span className="grow">Recorded rollout mode</span>
          <span className="tag">{rollout.currentMode}</span>
          <span className="muted">changed {rollout.changedAt.slice(0, 16).replace('T', ' ')}</span>
        </div>
        <div className="row">
          <span className="grow">Automatic outbound cap per conversation</span>
          <span className="tag">{settings.MAX_AUTOMATED_OUTBOUND_PER_CONVERSATION}</span>
        </div>
        <div className="row">
          <span className="grow">Confidence thresholds</span>
          <span className="tag">general {settings.AUTO_SEND_MIN_CONFIDENCE}</span>
          <span className="tag">acceptance {settings.ACCEPTANCE_SEND_MIN_CONFIDENCE}</span>
        </div>
        <div className="row">
          <span className="grow">Handoff after</span>
          <span className="tag">{settings.MAX_MEANINGFUL_TURNS_BEFORE_HANDOFF} meaningful turns</span>
        </div>

        <form action={setRolloutModeAction} style={{ marginTop: 12 }}>
          <input type="hidden" name="csrf" value={csrf} />
          <label className="muted" htmlFor="mode">
            Record a rollout stage change (the process still has to be restarted with the matching
            RUNTIME_MODE)
          </label>
          <br />
          <select id="mode" name="mode" defaultValue={rollout.currentMode}>
            {['TEST', 'SHADOW', 'DRAFT_ONLY', 'LOW_RISK_AUTO', 'HUMAN_ONLY'].map((mode) => (
              <option key={mode} value={mode}>
                {mode}
              </option>
            ))}
          </select>{' '}
          <input type="text" name="note" placeholder="Why" />
          <div className="actions">
            <button type="submit">Record</button>
          </div>
        </form>
      </section>

      <section className="panel">
        <h2>Campaign allowlist</h2>
        {settings.enabledCampaignIds.size === 0 ? (
          <p className="muted">
            No campaign is enabled, so every conversation is ingested and then ignored.
          </p>
        ) : (
          [...settings.enabledCampaignIds].map((campaignId) => (
            <div className="row" key={campaignId}>
              <span className="mono grow">{campaignId}</span>
              <span className="tag tag-pass">automation permitted</span>
            </div>
          ))
        )}
      </section>

      <section className="panel">
        <h2>Calendar</h2>
        <div className="row">
          <span className="grow">Provider</span>
          <span className="tag">{settings.CALENDAR_PROVIDER}</span>
        </div>
        <div className="row">
          <span className="grow">Account</span>
          <span className="mono">{settings.CALENDAR_ACCOUNT_EMAIL || 'not configured'}</span>
        </div>
        <div className="row">
          <span className="grow">Working hours ({settings.OPERATOR_TIMEZONE})</span>
          <span className="tag">
            {settings.WORKDAY_START} to {settings.WORKDAY_END}
          </span>
        </div>
        <div className="row">
          <span className="grow">Meeting</span>
          <span className="tag">{settings.MEETING_DURATION_MINUTES} min</span>
          <span className="tag">{settings.MEETING_BUFFER_MINUTES} min buffer</span>
          <span className="tag">{settings.MEETING_MIN_NOTICE_HOURS}h notice</span>
        </div>
        <p className="muted">
          Recurring exclusions and blackout dates live in{' '}
          <code className="mono">{settings.SCHEDULING_CONFIG_PATH}</code>.
        </p>
      </section>

      <section className="panel">
        <h2>Exclusions</h2>
        {exclusions.length === 0 ? (
          <p className="muted">None.</p>
        ) : (
          exclusions.map((exclusion) => (
            <div className="row" key={exclusion.id}>
              <span className="tag">{exclusion.scope}</span>
              <span className="mono">{exclusion.targetId ?? 'all'}</span>
              <span className="grow muted">{exclusion.reason}</span>
              <span className="muted mono">{exclusion.createdAt.slice(0, 10)}</span>
            </div>
          ))
        )}
        <form action={excludeAction} style={{ marginTop: 12 }}>
          <input type="hidden" name="csrf" value={csrf} />
          <select name="scope" defaultValue="CAMPAIGN">
            <option value="GLOBAL">Global</option>
            <option value="CAMPAIGN">Campaign</option>
            <option value="CONTACT">Contact</option>
            <option value="LEAD">Lead</option>
          </select>{' '}
          <input type="text" name="targetId" placeholder="Target id (blank for global)" />{' '}
          <input type="text" name="reason" placeholder="Reason" required />
          <div className="actions">
            <button type="submit">Add exclusion</button>
          </div>
        </form>
      </section>

      <section className="panel">
        <h2>Rollout checklist</h2>
        {checklist.map((item) => (
          <div className="row" key={item.label}>
            <span className={item.done ? 'tag tag-pass' : 'tag'}>{item.done ? 'done' : 'todo'}</span>
            <span className="grow">{item.label}</span>
          </div>
        ))}
        <p className="muted">
          Stages never advance on their own. Each one requires an authenticated operator action and
          a restart with the matching RUNTIME_MODE.
        </p>
      </section>
    </>
  );
}

function Flag({ label, on, safeWhenOn }: { label: string; on: boolean; safeWhenOn?: boolean }) {
  const good = safeWhenOn ? on : !on;
  return (
    <div className="row">
      <span className="mono grow">{label}</span>
      <span className={good ? 'tag tag-pass' : 'tag tag-fail'}>{on ? 'true' : 'false'}</span>
    </div>
  );
}
