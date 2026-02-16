import { useState, useRef, useEffect } from 'react';
import './Onboarding.css';

const METHODS = [
  'smoking',
  'vaping',
  'dabbing',
  'eating',
  'drinking',
  'otherwise enjoying',
] as const;

type Method = (typeof METHODS)[number];

function LogoIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 200 200"
      fill="none"
      aria-hidden="true"
      className="onboarding-logo-icon"
    >
      <g
        stroke="currentColor"
        strokeWidth="18"
        strokeLinecap="round"
        transform="rotate(-15, 100, 100)"
      >
        <line x1="100" y1="100" x2="100" y2="35" />
        <line x1="100" y1="100" x2="162" y2="55" />
        <line x1="100" y1="100" x2="138" y2="135" />
        <line x1="100" y1="100" x2="62" y2="135" />
        <line x1="100" y1="100" x2="38" y2="55" />
        <line x1="100" y1="100" x2="100" y2="168" />
      </g>
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="onboarding-chevron">
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Onboarding() {
  const [method, setMethod] = useState<Method>('smoking');
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

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') setOpen(false);
  }

  return (
    <div className="onboarding">
      <header className="onboarding-topbar">
        <div className="onboarding-logo">
          <LogoIcon />
          <span className="onboarding-logo-text">Weedlog</span>
        </div>
        <button className="onboarding-help" aria-label="Help">?</button>
      </header>

      <main className="onboarding-content">
        <div className="onboarding-heading">
          <h1 className="onboarding-title">Welcome!</h1>
          <p className="onboarding-subtitle">It's about to get lit.</p>
        </div>

        <p className="onboarding-description">
          Let's get started by creating a strain. These keep track of what you're{' '}
          <span className="onboarding-method-wrap">
            <button
              ref={triggerRef}
              className="onboarding-method-trigger"
              onClick={() => setOpen(o => !o)}
              onKeyDown={handleKeyDown}
              aria-expanded={open}
              aria-haspopup="listbox"
            >
              <span className="onboarding-method-text">{method}.</span>
              <ChevronDown />
            </button>
            {open && (
              <ul
                ref={dropdownRef}
                className="onboarding-dropdown"
                role="listbox"
                aria-label="Consumption method"
                onKeyDown={handleKeyDown}
              >
                {METHODS.map(m => (
                  <li key={m} role="option" aria-selected={m === method}>
                    <button
                      className="onboarding-dropdown-option"
                      onClick={() => { setMethod(m); setOpen(false); }}
                    >
                      {m}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </span>
        </p>

        <div className="onboarding-actions">
          <button className="onboarding-cta">
            Create my first strain
            <ArrowRight />
          </button>
          <button className="onboarding-skip">Skip for now</button>
        </div>
      </main>
    </div>
  );
}
