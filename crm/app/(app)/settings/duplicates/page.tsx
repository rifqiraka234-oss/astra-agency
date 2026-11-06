import Link from 'next/link';
import { sql } from '@/lib/db';
import { formatDateTime } from '@/lib/format';
import { scanDuplicates } from '@/lib/data/dupes-scan';
import { listMerges } from '@/lib/data/merge';
import { PanelHeader } from '@/components/settings/PanelHeader';
import { ActionButton } from '@/components/settings/ActionButton';
import { MergeButton } from '@/components/settings/MergeDialog';
import { ButtonLink } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { rejectPairAction, undoMergeAction } from './actions';
import s from '@/components/settings/settings.module.css';

export const metadata = { title: 'Duplicates, Settings' };

const RULES = [
  { n: 'Contacts, exact', d: 'Email, ignoring case and spaces. LinkedIn URL, cleaned to the profile slug. A match blocks creating a second record.' },
  { n: 'Organizations, exact', d: 'Every domain they own, without https, www or path. Subdomains roll up to the main domain. Free mail like gmail.com never matches.' },
  { n: 'Fuzzy, for review', d: 'Same name and city, or a similar name with the same phone or at the same organization. These never merge on their own.' },
];

export default async function DuplicatesPage() {
  const [pairs, merges] = await Promise.all([scanDuplicates(sql), listMerges(sql)]);
  const href = (type: string, id: string) => (type === 'organization' ? `/organizations/${id}` : `/contacts/${id}`);

  return (
    <>
      <PanelHeader
        title="Duplicates"
        sub="Exact rules block duplicates on create. Fuzzy matches land here for a person to decide."
        actions={
          <ButtonLink href={`/settings/duplicates?scan=${Date.now()}`} variant="primary">
            Run a scan
          </ButtonLink>
        }
      />

      <div className={s.rules}>
        {RULES.map((r) => (
          <div key={r.n} className={s.rule}>
            <h3 className={s.ruleTitle}>{r.n}</h3>
            <div className={s.ruleBody}>{r.d}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-head">
          <h3 className="card-title" style={{ fontSize: 15 }}>
            Possible duplicates to review
          </h3>
          <span className="card-sub">
            Scanned {formatDateTime(new Date())}, {pairs.length} {pairs.length === 1 ? 'pair' : 'pairs'}
          </span>
        </div>
        {pairs.length === 0 ? (
          <div className={s.pair}>
            <span className="small muted">Nothing to review. Pairs marked Not the same stay hidden.</span>
          </div>
        ) : null}
        {pairs.map((p) => (
          <div key={p.key} className={s.pair}>
            {[p.a, p.b].map((x) => (
              <div key={x.id} className={s.pairSide}>
                <Link href={href(p.type, x.id)} className="strong" style={{ color: 'var(--ink)' }}>
                  {x.name}
                </Link>
                <div className="small muted">{x.sub}</div>
              </div>
            ))}
            <span className={s.why}>{p.why}</span>
            <div className="row" style={{ gap: 8 }}>
              <MergeButton type={p.type} a={p.a} b={p.b} />
              <ActionButton action={rejectPairAction} fields={{ type: p.type, a: p.a.id, b: p.b.id }}>
                Not the same
              </ActionButton>
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-head">
          <h3 className="card-title" style={{ fontSize: 15 }}>
            Merge history
          </h3>
        </div>
        {merges.length === 0 ? (
          <div className={s.listRow}>
            <span className="small muted">No merges yet.</span>
          </div>
        ) : null}
        {merges.map((m) => (
          <div key={m.id} className={s.listRow}>
            <div className={s.listMain}>
              <div className={s.listTitle}>
                {m.loser_name} into{' '}
                <Link href={href(m.object_type, m.winner_id)}>{m.winner_name ?? 'a deleted record'}</Link>
              </div>
              <div className={s.listMeta}>
                {m.object_type === 'organization' ? 'Organizations' : 'Contacts'}, {formatDateTime(m.merged_at)}, {m.merged_by_name ?? 'system'}, {m.moved_count}{' '}
                {m.moved_count === 1 ? 'link' : 'links'} moved
              </div>
            </div>
            {m.undone_at ? (
              <Badge tone="grey">Undone {formatDateTime(m.undone_at)}</Badge>
            ) : (
              <ActionButton
                action={undoMergeAction}
                fields={{ id: m.id }}
                confirm={`Undo the merge of ${m.loser_name}? It comes back as its own record with its emails, links and values.`}
                pendingText="Undoing"
              >
                Undo merge
              </ActionButton>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
