import { useState } from 'react';
import './ReactionChips.css';
import { REACTIONS } from './mockData';

export default function ReactionChipsDemo() {
  const [selected, setSelected] = useState<Set<string>>(new Set(['Relaxed', 'Happy']));

  function toggle(reaction: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(reaction)) {
        next.delete(reaction);
      } else {
        next.add(reaction);
      }
      return next;
    });
  }

  return (
    <div>
      <div className="pv-rc-chips" role="group" aria-label="How did it make you feel?">
        {REACTIONS.map((r) => {
          const isActive = selected.has(r);
          return (
            <button
              key={r}
              className={`pv-rc-chip ${isActive ? 'pv-rc-chip--active' : ''}`}
              onClick={() => toggle(r)}
              aria-pressed={isActive}
            >
              <div className="pv-rc-wisps" aria-hidden="true">
                <span className="pv-rc-wisp" />
                <span className="pv-rc-wisp" />
                <span className="pv-rc-wisp" />
                <span className="pv-rc-wisp" />
                <span className="pv-rc-wisp" />
              </div>
              {r}
            </button>
          );
        })}
      </div>
      {selected.size > 0 && (
        <p className="pv-rc-summary">
          Selected: {Array.from(selected).join(', ')}
        </p>
      )}
    </div>
  );
}
