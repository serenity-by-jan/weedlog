import './StrainCard.css';
import { mockStrains, type Strain, type StrainType } from './mockData';

const TYPE_STYLES: Record<StrainType, { fill: string; onFill: string; text: string }> = {
  sativa: {
    fill: 'var(--weedlog-color-strain-sativa-fill)',
    onFill: 'var(--weedlog-color-strain-sativa-on-fill)',
    text: 'var(--weedlog-color-strain-sativa-text)',
  },
  indica: {
    fill: 'var(--weedlog-color-strain-indica-fill)',
    onFill: 'var(--weedlog-color-strain-indica-on-fill)',
    text: 'var(--weedlog-color-strain-indica-text)',
  },
  hybrid: {
    fill: 'var(--weedlog-color-strain-hybrid-fill)',
    onFill: 'var(--weedlog-color-strain-hybrid-on-fill)',
    text: 'var(--weedlog-color-strain-hybrid-text)',
  },
};

function Card({ strain }: { strain: Strain }) {
  const colors = TYPE_STYLES[strain.type];

  return (
    <article className="pv-sc-card" style={{ borderLeftColor: colors.text }}>
      <div className="pv-sc-header">
        <h3 className="pv-sc-name">{strain.name}</h3>
        <span
          className="pv-sc-type-pill"
          style={{ background: colors.fill, color: colors.onFill }}
        >
          {strain.type}
        </span>
      </div>
      <p className="pv-sc-desc">{strain.description}</p>
      <div className="pv-sc-stats">
        <span className="pv-sc-stat">
          <span className="pv-sc-stat-label">THC</span>
          <span className="pv-sc-stat-value">{strain.thc}%</span>
        </span>
        <span className="pv-sc-stat">
          <span className="pv-sc-stat-label">CBD</span>
          <span className="pv-sc-stat-value">{strain.cbd}%</span>
        </span>
      </div>
      <div className="pv-sc-flavors">
        {strain.flavors.map((f) => (
          <span key={f} className="pv-sc-flavor">{f}</span>
        ))}
      </div>
    </article>
  );
}

export default function StrainCardDemo() {
  return (
    <div className="pv-sc-grid">
      {mockStrains.map((s) => (
        <Card key={s.id} strain={s} />
      ))}
    </div>
  );
}
