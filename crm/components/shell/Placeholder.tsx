/** Temporary page body until the owning agent replaces the route. */
import { PageHeader } from '../ui/PageHeader';

export function Placeholder({ title, agent, subtitle }: { title: string; agent: string; subtitle?: string }) {
  return (
    <div className="page">
      <PageHeader title={title} subtitle={subtitle} />
      <div className="card card-pad">
        <p className="muted" style={{ margin: 0 }}>
          Built by agent {agent}
        </p>
      </div>
    </div>
  );
}
