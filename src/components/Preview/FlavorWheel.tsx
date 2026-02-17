import { useState } from 'react';
import './FlavorWheel.css';
import { FLAVORS } from './mockData';

export default function FlavorWheelDemo() {
  const [selected, setSelected] = useState<Set<string>>(new Set(['Citrus', 'Pine']));
  const size = 280;
  const center = size / 2;
  const innerRadius = 50;
  const outerRadius = 120;

  function toggle(flavor: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(flavor)) next.delete(flavor);
      else next.add(flavor);
      return next;
    });
  }

  return (
    <div className="pv-fw-demo">
      <div className="pv-fw-chart-wrap">
        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="pv-fw-svg"
          role="group"
          aria-label="Flavor wheel — select flavors"
        >
          {FLAVORS.map((flavor, i) => {
            const angleStart = (Math.PI * 2 * i) / FLAVORS.length - Math.PI / 2;
            const angleEnd = (Math.PI * 2 * (i + 1)) / FLAVORS.length - Math.PI / 2;
            const isActive = selected.has(flavor);

            const x1o = center + outerRadius * Math.cos(angleStart);
            const y1o = center + outerRadius * Math.sin(angleStart);
            const x2o = center + outerRadius * Math.cos(angleEnd);
            const y2o = center + outerRadius * Math.sin(angleEnd);
            const x1i = center + innerRadius * Math.cos(angleStart);
            const y1i = center + innerRadius * Math.sin(angleStart);
            const x2i = center + innerRadius * Math.cos(angleEnd);
            const y2i = center + innerRadius * Math.sin(angleEnd);

            const path = [
              `M ${x1i} ${y1i}`,
              `L ${x1o} ${y1o}`,
              `A ${outerRadius} ${outerRadius} 0 0 1 ${x2o} ${y2o}`,
              `L ${x2i} ${y2i}`,
              `A ${innerRadius} ${innerRadius} 0 0 0 ${x1i} ${y1i}`,
              'Z',
            ].join(' ');

            const labelAngle = (angleStart + angleEnd) / 2;
            const labelR = (innerRadius + outerRadius) / 2;
            const lx = center + labelR * Math.cos(labelAngle);
            const ly = center + labelR * Math.sin(labelAngle);
            const rotation = (labelAngle * 180) / Math.PI;
            const flipLabel = rotation > 90 || rotation < -90;

            return (
              <g key={flavor}>
                <path
                  d={path}
                  className={`pv-fw-segment ${isActive ? 'pv-fw-segment--active' : ''}`}
                  onClick={() => toggle(flavor)}
                  role="checkbox"
                  aria-checked={isActive}
                  aria-label={flavor}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggle(flavor);
                    }
                  }}
                />
                <text
                  x={lx}
                  y={ly}
                  className="pv-fw-label"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  transform={`rotate(${flipLabel ? rotation + 180 : rotation}, ${lx}, ${ly})`}
                  style={{ pointerEvents: 'none' }}
                >
                  {flavor}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {selected.size > 0 && (
        <div className="pv-fw-selected">
          <span className="pv-fw-selected-label">Selected flavors:</span>
          <div className="pv-fw-selected-list">
            {Array.from(selected).map((f) => (
              <button
                key={f}
                className="pv-fw-selected-chip"
                onClick={() => toggle(f)}
                aria-label={`Remove ${f}`}
              >
                <div className="pv-fw-wisps" aria-hidden="true">
                  <span className="pv-fw-wisp" />
                  <span className="pv-fw-wisp" />
                  <span className="pv-fw-wisp" />
                  <span className="pv-fw-wisp" />
                  <span className="pv-fw-wisp" />
                </div>
                {f}
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                  <path d="M2 2l6 6M8 2l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
