import { useState } from 'react';
import './SessionLogger.css';
import OrganicCloud from '../OrganicCloud';
import { mockStrains, CONSUMPTION_METHODS, METHOD_LABELS, REACTIONS, type ConsumptionMethod } from './mockData';

export default function SessionLoggerDemo() {
  const [strain, setStrain] = useState(mockStrains[0].id);
  const [method, setMethod] = useState<ConsumptionMethod>('smoke');
  const [rating, setRating] = useState(7);
  const [reactions, setReactions] = useState<Set<string>>(new Set());
  const [note, setNote] = useState('');
  const [logged, setLogged] = useState(false);

  function toggleReaction(r: string) {
    setReactions((prev) => {
      const next = new Set(prev);
      if (next.has(r)) next.delete(r);
      else next.add(r);
      return next;
    });
  }

  function handleLog() {
    setLogged(true);
    setTimeout(() => setLogged(false), 2000);
  }

  const selectedStrain = mockStrains.find((s) => s.id === strain);

  return (
    <div className="pv-sl-form">
      <div className="pv-sl-step">
        <span className="pv-sl-step-num">1</span>
        <div className="pv-sl-step-content">
          <label className="pv-sl-label" htmlFor="sl-strain">What strain?</label>
          <select
            id="sl-strain"
            className="pv-sl-select"
            value={strain}
            onChange={(e) => setStrain(e.target.value)}
          >
            {mockStrains.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="pv-sl-step">
        <span className="pv-sl-step-num">2</span>
        <div className="pv-sl-step-content">
          <span className="pv-sl-label">How?</span>
          <div className="pv-sl-methods" role="radiogroup" aria-label="Consumption method">
            {CONSUMPTION_METHODS.map((m) => (
              <button
                key={m}
                className={`pv-sl-method ${method === m ? 'pv-sl-method--active' : ''}`}
                role="radio"
                aria-checked={method === m}
                onClick={() => setMethod(m)}
              >
                <OrganicCloud size="sm" mode={method === m ? 'dark' : 'light'} trigger="hover" count={15} />
                {METHOD_LABELS[m]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="pv-sl-step">
        <span className="pv-sl-step-num">3</span>
        <div className="pv-sl-step-content">
          <label className="pv-sl-label" htmlFor="sl-rating">
            How was it? <strong className="pv-sl-rating-display">{rating}/10</strong>
          </label>
          <input
            id="sl-rating"
            type="range"
            min={1}
            max={10}
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="pv-sl-range"
          />
        </div>
      </div>

      <div className="pv-sl-step">
        <span className="pv-sl-step-num">4</span>
        <div className="pv-sl-step-content">
          <span className="pv-sl-label">How did it make you feel?</span>
          <div className="pv-sl-reactions" role="group" aria-label="Reactions">
            {REACTIONS.map((r) => (
              <button
                key={r}
                className={`pv-sl-reaction ${reactions.has(r) ? 'pv-sl-reaction--active' : ''}`}
                aria-pressed={reactions.has(r)}
                onClick={() => toggleReaction(r)}
              >
                <OrganicCloud size="sm" mode="light" trigger="hover" count={15} />
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="pv-sl-step">
        <span className="pv-sl-step-num">5</span>
        <div className="pv-sl-step-content">
          <label className="pv-sl-label" htmlFor="sl-note">Any notes?</label>
          <textarea
            id="sl-note"
            className="pv-sl-textarea"
            placeholder="Optional — jot down what made this session memorable..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
          />
        </div>
      </div>

      <div className="pv-sl-footer">
        <button className="pv-sl-submit" onClick={handleLog}>
          <OrganicCloud size="sm" mode="dark" trigger="hover" count={18} />
          Log {selectedStrain?.name ?? 'session'}
        </button>
        {logged && <span className="pv-sl-logged" role="status">Logged!</span>}
      </div>
    </div>
  );
}
