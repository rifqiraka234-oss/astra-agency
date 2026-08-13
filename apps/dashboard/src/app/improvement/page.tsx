import { requireSession } from '@/lib/auth';
import { loadLessons, loadRepeatedSignatures } from '@/lib/unified-queries';

export const dynamic = 'force-dynamic';

/**
 * The Improvement Center.
 *
 * The single rule this page enforces in its own copy: nothing is described as
 * something the system "learned" until it is actually active in production.
 * Everything else is a candidate, and the label comes from
 * `describeLessonStatus` rather than from whoever wrote the JSX, so the two
 * cannot disagree.
 */
export default async function ImprovementPage() {
  await requireSession();
  const [lessons, signatures] = await Promise.all([loadLessons(), loadRepeatedSignatures()]);

  const active = lessons.filter((l) => l.state === 'ACTIVE_PRODUCTION');
  const awaiting = lessons.filter((l) => l.state === 'AWAITING_APPROVAL');
  const inProgress = lessons.filter(
    (l) => !['ACTIVE_PRODUCTION', 'AWAITING_APPROVAL', 'REJECTED', 'SUPERSEDED'].includes(l.state),
  );
  const closed = lessons.filter((l) => l.state === 'REJECTED' || l.state === 'SUPERSEDED');

  return (
    <>
      <h1 style={{ fontSize: 20 }}>Improvement</h1>

      <section className="panel">
        <h2>Repeated failure signatures</h2>
        <p className="muted">
          A signature seen more than once is the strongest signal here: something already observed
          has now cost us twice.
        </p>
        {signatures.length === 0 ? (
          <p className="muted">No repeats recorded.</p>
        ) : (
          signatures.map((s) => (
            <div className="row" key={s.signature}>
              <div className="grow">
                <code>{s.signature}</code>
              </div>
              {/* The number is retrospectives that flagged this as a repeat, not
                  total occurrences: a signature reaches this list only after it
                  has already been seen at least once before. */}
              <span className="tag">
                flagged in {s.occurrences} {s.occurrences === 1 ? 'retrospective' : 'retrospectives'}
              </span>
            </div>
          ))
        )}
      </section>

      <LessonSection
        title="Waiting for your decision"
        empty="Nothing is waiting on you."
        lessons={awaiting}
      />
      <LessonSection
        title="Active in production"
        empty="No learned behavior is active."
        lessons={active}
      />
      <LessonSection
        title="Gathering evidence or under evaluation"
        empty="No candidates in progress."
        lessons={inProgress}
      />
      <LessonSection
        title="Rejected and superseded"
        empty="Nothing closed yet."
        lessons={closed}
        note="Kept so the same idea is not rediscovered and re-proposed."
      />
    </>
  );
}

function LessonSection({
  title,
  empty,
  lessons,
  note,
}: {
  title: string;
  empty: string;
  lessons: Awaited<ReturnType<typeof loadLessons>>;
  note?: string;
}) {
  return (
    <section className="panel">
      <h2>
        {title} ({lessons.length})
      </h2>
      {note ? <p className="muted">{note}</p> : null}
      {lessons.length === 0 ? (
        <p className="muted">{empty}</p>
      ) : (
        lessons.map((lesson) => (
          <div className="row" key={lesson.id}>
            <div className="grow">
              <strong>{lesson.title}</strong>
              <div className="muted">{lesson.reusableRule}</div>
              <div className="muted">
                {/* The label is derived, never written by hand, so an
                    unevaluated candidate cannot be presented as a fact. */}
                {lesson.statusLabel} · scope {lesson.scope}
                {lesson.scopeId === null ? '' : ` (${lesson.scopeId})`} · {lesson.evidenceRunCount}{' '}
                supporting {lesson.evidenceRunCount === 1 ? 'run' : 'runs'}
                {lesson.counterexampleSearchPerformed
                  ? ''
                  : ' · no counterexample search, cannot be promoted'}
              </div>
            </div>
            <span className="tag">class {lesson.authorityClass}</span>
            <span className="tag">{lesson.riskClass} risk</span>
            <span className="tag">{lesson.state}</span>
          </div>
        ))
      )}
    </section>
  );
}
