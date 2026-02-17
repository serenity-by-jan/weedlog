import { useState } from 'react';
import './BurnDown.css';

export default function BurnDownDemo() {
  const [progress, setProgress] = useState(35);

  return (
    <div className="pv-bd-demo">
      <div className="pv-bd-label-row">
        <span className="pv-bd-label">Session Progress</span>
        <span className="pv-bd-pct">{progress}%</span>
      </div>

      <div className="pv-bd-joint" role="img" aria-label={`Joint progress: ${progress}% consumed`}>
        <svg viewBox="0 0 300 40" className="pv-bd-svg" aria-hidden="true">
          {/* Filter */}
          <rect x="0" y="10" width="40" height="20" rx="3" className="pv-bd-filter" />
          {/* Unburnt paper */}
          <rect x="40" y="12" width="220" height="16" rx="2" className="pv-bd-paper" />
          {/* Burnt portion */}
          <rect
            x="40"
            y="12"
            width={Math.min((progress / 100) * 220, 220)}
            height="16"
            rx="2"
            className="pv-bd-burnt"
          />
          {/* Cherry / ember */}
          {progress > 0 && progress < 100 && (
            <circle
              cx={40 + (progress / 100) * 220}
              cy="20"
              r="5"
              className="pv-bd-cherry"
            />
          )}
          {/* Ash tip */}
          <rect x="260" y="14" width="30" height="12" rx="2" className="pv-bd-tip" />
        </svg>
      </div>

      <div className="pv-bd-controls">
        <input
          type="range"
          min={0}
          max={100}
          value={progress}
          onChange={(e) => setProgress(Number(e.target.value))}
          className="pv-bd-slider"
          aria-label="Burn progress"
        />
        <div className="pv-bd-presets">
          {[0, 25, 50, 75, 100].map((v) => (
            <button
              key={v}
              className={`pv-bd-preset ${progress === v ? 'pv-bd-preset--active' : ''}`}
              onClick={() => setProgress(v)}
            >
              <div className="pv-bd-wisps" aria-hidden="true">
                <span className="pv-bd-wisp" />
                <span className="pv-bd-wisp" />
                <span className="pv-bd-wisp" />
                <span className="pv-bd-wisp" />
                <span className="pv-bd-wisp" />
              </div>
              {v}%
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
