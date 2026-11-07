import Link from 'next/link';
import { sql } from '@/lib/db';
import { formatDateTime } from '@/lib/format';
import { scanDuplicates, type DupePair } from '@/lib/data/dupes-scan';
import { CONFIDENCE_LABELS, type MatchConfidence } from '@/lib/dedupe';
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
  {
    n: 'Contacts, name first',
    d: 'Names compare without case, accents, punctuation, titles like Dr or Mr and letters like PhD, MBA or Jr. Andy Tidd Fbcs is Andy Tidd. First and last name are never swapped.',
  },
  {
    n: 'Then LinkedIn, then email',
    d: 'The same name and the same LinkedIn profile is the same person. Different profiles are different people. With no LinkedIn on one side, the same email confirms it.',
  },
  {
    n: 'For review',
    d: 'The same name with nothing to confirm it, or the same LinkedIn or email under another name. Organizations with the same name and city. These never merge on their own.',
  },
  { n: 'Hard guard', d: 'One email, one LinkedIn profile and one domain belong to one record. Creating a second is blocked, whatever the name.' },
];

const GROUPS: { confidence: MatchConfidence; short: string; sub: string }[] = [
  { confidence: 'linkedin', short: 'confirmed by LinkedIn', sub: 'Same name and the same LinkedIn profile. Safe to merge.' },
  { confidence: 'email', short: 'confirmed by email', sub: 'Same name and the same email, LinkedIn missing on one side. Safe to merge.' },
  { confidence: 'review', short: 'to review', sub: 'Possible duplicates. Open both and decide.' },
];

export default async function DuplicatesPage() {
  const [pairs, merges] = await Promise.all([scanDuplicates(sql), listMerges(sql)]);
  const href = (type: string, id: string) => (type === 'organization' ? `/organizations/${id}` : `/contacts/${id}`);

  return (
    <>
      <PanelHeader
        title="Duplicates"
        sub="Contacts match on name first, then LinkedIn, then email. Confirmed pairs come first, the rest wait for a person to decide."
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
            Duplicates found
          </h3>
          <span className="card-sub">
            Scanned {formatDateTime(new Date())}, {pairs.length} {pairs.length === 1 ? 'pair' : 'pairs'}
            {GROUPS.map((g) => `, ${pairs.filter((p) => p.confidence === g.confidence).length} ${g.short}`).join('')}
          </span>
        </div>
        {pairs.length === 0 ? (
          <div className={s.pair}>
            <span className="small muted">Nothing to review. Pairs marked Not the same stay hidden.</span>
          </div>
        ) : null}
      </div>

      {GROUPS.map((g) => {
        const group = pairs.filter((p) => p.confidence === g.confidence);
        if (!group.length) return null;
        return (
          <div key={g.confidence} className="card">
            <div className="card-head">
              <h3 className="card-title" style={{ fontSize: 15 }}>
                {CONFIDENCE_LABELS[g.confidence]}
              </h3>
              <span className="card-sub">
                {group.length} {group.length === 1 ? 'pair' : 'pairs'}. {g.sub}
              </span>
            </div>
            {group.map((p) => (
              <PairRow key={p.key} p={p} href={href} />
            ))}
          </div>
        );
      })}

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

function PairRow({ p, href }: { p: DupePair; href: (type: string, id: string) => string }) {
  return (
    <div className={s.pair}>
      {[p.a, p.b].map((x) => (
        <div key={x.id} className={s.pairSide}>
          <Link href={href(p.type, x.id)} className="strong" style={{ color: 'var(--ink)' }}>
            {x.name}
          </Link>
          <div className="small muted" style={{ overflowWrap: 'anywhere' }}>
            {x.sub}
          </div>
        </div>
      ))}
      <span className={s.why}>
        {p.type === 'organization' ? 'Organization. ' : ''}
        {p.why}
      </span>
      <div className="row" style={{ gap: 8 }}>
        <MergeButton type={p.type} a={p.a} b={p.b} />
        <ActionButton action={rejectPairAction} fields={{ type: p.type, a: p.a.id, b: p.b.id }}>
          Not the same
        </ActionButton>
      </div>
    </div>
  );
}
