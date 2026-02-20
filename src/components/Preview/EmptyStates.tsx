import './EmptyStates.css';
import OrganicCloud from '../OrganicCloud';

function LeafIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true" className="pv-empty-icon">
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" transform="rotate(-15, 24, 24)">
        <line x1="24" y1="24" x2="24" y2="8" />
        <line x1="24" y1="24" x2="37" y2="13" />
        <line x1="24" y1="24" x2="33" y2="31" />
        <line x1="24" y1="24" x2="15" y2="31" />
        <line x1="24" y1="24" x2="11" y2="13" />
        <line x1="24" y1="24" x2="24" y2="40" />
      </g>
    </svg>
  );
}

interface EmptyStateProps {
  title: string;
  description: string;
  cta: string;
}

function EmptyState({ title, description, cta }: EmptyStateProps) {
  return (
    <div className="pv-empty-card">
      <LeafIcon />
      <h4 className="pv-empty-title">{title}</h4>
      <p className="pv-empty-desc">{description}</p>
      <button className="pv-empty-cta">
        <OrganicCloud size="sm" mode="dark" trigger="hover" count={18} />
        {cta}
      </button>
    </div>
  );
}

export default function EmptyStatesDemo() {
  return (
    <div className="pv-empty-grid">
      <EmptyState
        title="No strains yet"
        description="Start building your collection by adding your first strain."
        cta="Add a strain"
      />
      <EmptyState
        title="No sessions logged"
        description="Log your first session to start tracking your experiences."
        cta="Log a session"
      />
      <EmptyState
        title="No friends added"
        description="Add friends to share strains and compare notes."
        cta="Find friends"
      />
    </div>
  );
}
