import { useState, useRef, useEffect } from 'react';
import './NavEnhancement.css';
import OrganicCloud from '../OrganicCloud';

const HISTORY = [
  { label: 'Blue Dream', path: '/strain/blue-dream' },
  { label: 'Session Log', path: '/sessions' },
  { label: 'My Strains', path: '/strains' },
  { label: 'Home', path: '/' },
];

export default function NavEnhancementDemo() {
  const [showHistory, setShowHistory] = useState(false);
  const [currentPage, setCurrentPage] = useState('Blue Dream');
  const longPressTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showHistory) return;
    function handleClickOutside(e: MouseEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) {
        setShowHistory(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showHistory]);

  function handlePointerDown() {
    longPressTimer.current = setTimeout(() => {
      setShowHistory(true);
    }, 500);
  }

  function handlePointerUp() {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
  }

  function handleClick() {
    if (!showHistory) {
      // Short press = normal back
      setCurrentPage('Session Log');
    }
  }

  return (
    <div className="pv-ne-demo">
      <div className="pv-ne-navbar">
        <div className="pv-ne-back-wrap" ref={wrapRef}>
          <button
            className="pv-ne-back-btn"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            onClick={handleClick}
            aria-label="Go back (long press for history)"
            aria-haspopup={showHistory ? 'true' : undefined}
            aria-expanded={showHistory}
          >
            <OrganicCloud size="sm" mode="light" trigger="hover" count={15} />
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M13 4l-6 6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {showHistory && (
            <ul
              className="pv-ne-history"
              role="menu"
              aria-label="Navigation history"
              onKeyDown={(e) => { if (e.key === 'Escape') setShowHistory(false); }}
            >
              {HISTORY.map((item) => (
                <li key={item.path} role="menuitem">
                  <button
                    className="pv-ne-history-item"
                    onClick={() => {
                      setCurrentPage(item.label);
                      setShowHistory(false);
                    }}
                  >
                    <OrganicCloud size="sm" mode="light" trigger="hover" count={18} />
                    {item.label}
                    <span className="pv-ne-history-path">{item.path}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <span className="pv-ne-page-title">{currentPage}</span>

        <span className="pv-ne-spacer" />
      </div>

      <p className="pv-ne-hint">
        Click the back arrow for normal navigation. Long-press to reveal history.
      </p>
    </div>
  );
}
