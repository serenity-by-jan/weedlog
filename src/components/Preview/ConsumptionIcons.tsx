import React, { useState } from 'react';
import './ConsumptionIcons.css';
import { CONSUMPTION_METHODS, METHOD_LABELS, type ConsumptionMethod } from './mockData';

function SmokeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="15" width="18" height="4" rx="1" />
      <path d="M7 15v-2a2 2 0 0 1 2-2h0a2 2 0 0 0 2-2V7" />
      <path d="M12 15v-2a2 2 0 0 1 2-2h0a2 2 0 0 0 2-2V7" />
    </svg>
  );
}

function VapeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="3" width="6" height="18" rx="2" />
      <line x1="12" y1="7" x2="12" y2="7.01" />
      <circle cx="12" cy="15" r="2" />
    </svg>
  );
}

function DabIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 21c-4 0-7-2-7-5s3-5 7-5 7 2 7 5-3 5-7 5z" />
      <path d="M12 11V3" />
      <path d="M9 6l3-3 3 3" />
    </svg>
  );
}

function EdibleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="14" r="7" />
      <path d="M12 7V4" />
      <path d="M9 8c1-2 3-3 5-2" />
    </svg>
  );
}

function DrinkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 2l-1 18h10L16 2H8z" />
      <path d="M7 8h10" />
      <line x1="12" y1="12" x2="12" y2="16" />
    </svg>
  );
}

function TopicalIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10 3h4v4a2 2 0 0 1-2 2h0a2 2 0 0 1-2-2V3z" />
      <rect x="8" y="9" width="8" height="12" rx="2" />
      <line x1="12" y1="13" x2="12" y2="17" />
    </svg>
  );
}

const ICON_COMPONENTS: Record<ConsumptionMethod, () => React.JSX.Element> = {
  smoke: SmokeIcon,
  vape: VapeIcon,
  dab: DabIcon,
  edible: EdibleIcon,
  drink: DrinkIcon,
  topical: TopicalIcon,
};

export default function ConsumptionIconsDemo() {
  const [selected, setSelected] = useState<ConsumptionMethod | null>(null);

  return (
    <div className="pv-ci-grid" role="radiogroup" aria-label="Consumption methods">
      {CONSUMPTION_METHODS.map((method) => {
        const isSelected = selected === method;
        const Icon = ICON_COMPONENTS[method];
        return (
          <button
            key={method}
            className={`pv-ci-item ${isSelected ? 'pv-ci-item--selected' : ''}`}
            role="radio"
            aria-checked={isSelected}
            onClick={() => setSelected(isSelected ? null : method)}
          >
            <div className="pv-ci-wisps" aria-hidden="true">
              <span className="pv-ci-wisp" />
              <span className="pv-ci-wisp" />
              <span className="pv-ci-wisp" />
              <span className="pv-ci-wisp" />
              <span className="pv-ci-wisp" />
            </div>
            <span className="pv-ci-icon">
              <Icon />
            </span>
            <span className="pv-ci-label">{METHOD_LABELS[method]}</span>
          </button>
        );
      })}
    </div>
  );
}
