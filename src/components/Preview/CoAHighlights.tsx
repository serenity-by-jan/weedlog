import './CoAHighlights.css';
import { mockStrains, TERPENE_NAMES } from './mockData';

function RadarChart({ terpenes }: { terpenes: { name: string; percentage: number }[] }) {
  const size = 200;
  const center = size / 2;
  const radius = 80;
  const levels = 4;
  const points = TERPENE_NAMES.length;

  function getPoint(index: number, value: number): { x: number; y: number } {
    const angle = (Math.PI * 2 * index) / points - Math.PI / 2;
    const r = (value / 0.5) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  }

  const terpeneMap = new Map(terpenes.map((t) => [t.name, t.percentage]));
  const dataPoints = TERPENE_NAMES.map((name, i) => {
    const val = terpeneMap.get(name) ?? 0;
    return getPoint(i, val);
  });
  const polygon = dataPoints.map((p) => `${p.x},${p.y}`).join(' ');

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className="pv-coa-radar"
      role="img"
      aria-label="Terpene profile radar chart"
    >
      {/* Grid rings */}
      {Array.from({ length: levels }, (_, i) => {
        const r = (radius * (i + 1)) / levels;
        const ringPoints = TERPENE_NAMES.map((_, j) => {
          const angle = (Math.PI * 2 * j) / points - Math.PI / 2;
          return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
        }).join(' ');
        return <polygon key={i} points={ringPoints} className="pv-coa-grid-ring" />;
      })}

      {/* Axis lines */}
      {TERPENE_NAMES.map((_, i) => {
        const p = getPoint(i, 0.5);
        return <line key={i} x1={center} y1={center} x2={p.x} y2={p.y} className="pv-coa-axis" />;
      })}

      {/* Data polygon */}
      <polygon points={polygon} className="pv-coa-data" />

      {/* Data dots */}
      {dataPoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="3" className="pv-coa-dot" />
      ))}

      {/* Labels */}
      {TERPENE_NAMES.map((name, i) => {
        const labelPoint = getPoint(i, 0.62);
        return (
          <text
            key={name}
            x={labelPoint.x}
            y={labelPoint.y}
            className="pv-coa-label"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {name.slice(0, 4)}
          </text>
        );
      })}
    </svg>
  );
}

export default function CoAHighlightsDemo() {
  const strain = mockStrains[0];

  return (
    <div className="pv-coa-demo">
      <div className="pv-coa-stats">
        <div className="pv-coa-stat-card">
          <span className="pv-coa-stat-label">THC</span>
          <span className="pv-coa-stat-value">{strain.thc}%</span>
          <span className="pv-coa-stat-bar-bg">
            <span className="pv-coa-stat-bar" style={{ width: `${(strain.thc / 35) * 100}%` }} />
          </span>
        </div>
        <div className="pv-coa-stat-card">
          <span className="pv-coa-stat-label">CBD</span>
          <span className="pv-coa-stat-value">{strain.cbd}%</span>
          <span className="pv-coa-stat-bar-bg">
            <span className="pv-coa-stat-bar pv-coa-stat-bar--cbd" style={{ width: `${(strain.cbd / 5) * 100}%` }} />
          </span>
        </div>
      </div>

      <div className="pv-coa-chart-area">
        <h4 className="pv-coa-chart-title">Terpene Profile — {strain.name}</h4>
        <RadarChart terpenes={strain.terpenes} />
        <div className="pv-coa-terpene-legend">
          {strain.terpenes.map((t) => (
            <div key={t.name} className="pv-coa-legend-item">
              <span className="pv-coa-legend-dot" />
              <span className="pv-coa-legend-name">{t.name}</span>
              <span className="pv-coa-legend-val">{t.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
