import { useState, useRef, useEffect } from 'react';
import './InlineSelectors.css';
import { mockStrains, CONSUMPTION_METHODS, METHOD_LABELS } from './mockData';

function InlineDropdown({
  value,
  options,
  onChange,
  label,
}: {
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
  label: string;
}) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      if (
        !triggerRef.current?.contains(e.target as Node) &&
        !dropdownRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const selectedLabel = options.find((o) => o.value === value)?.label ?? value;

  return (
    <span className="pv-is-dropdown-wrap">
      <button
        ref={triggerRef}
        className="pv-is-trigger"
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => { if (e.key === 'Escape') setOpen(false); }}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={label}
      >
        <span className="pv-is-trigger-text">{selectedLabel}</span>
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="pv-is-chevron">
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <ul
          ref={dropdownRef}
          className="pv-is-dropdown"
          role="listbox"
          aria-label={label}
          onKeyDown={(e) => { if (e.key === 'Escape') setOpen(false); }}
        >
          {options.map((o) => (
            <li key={o.value} role="option" aria-selected={o.value === value}>
              <button
                className="pv-is-option"
                onClick={() => { onChange(o.value); setOpen(false); }}
              >
                {o.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </span>
  );
}

function InlineSlider({
  value,
  onChange,
  min,
  max,
  label,
}: {
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  label: string;
}) {
  return (
    <span className="pv-is-slider-wrap">
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="pv-is-slider"
        aria-label={label}
      />
      <span className="pv-is-slider-value">{value}</span>
    </span>
  );
}

export default function InlineSelectorsDemo() {
  const [strain, setStrain] = useState(mockStrains[0].id);
  const [method, setMethod] = useState('smoke');
  const [rating, setRating] = useState(7);

  const strainOptions = mockStrains.map((s) => ({ value: s.id, label: s.name }));
  const methodOptions = CONSUMPTION_METHODS.map((m) => ({ value: m, label: METHOD_LABELS[m] }));

  return (
    <div className="pv-is-demo">
      <p className="pv-is-prose">
        I was{' '}
        <InlineDropdown
          value={method}
          options={methodOptions}
          onChange={setMethod}
          label="Consumption method"
        />{' '}
        some{' '}
        <InlineDropdown
          value={strain}
          options={strainOptions}
          onChange={setStrain}
          label="Strain"
        />{' '}
        and I'd give it a{' '}
        <InlineSlider
          value={rating}
          onChange={setRating}
          min={1}
          max={10}
          label="Rating"
        />{' '}
        out of 10.
      </p>
    </div>
  );
}
