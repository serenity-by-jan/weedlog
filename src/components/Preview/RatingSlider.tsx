import { useState } from 'react';
import './RatingSlider.css';
import { mockSessions, mockStrains } from './mockData';

export default function RatingSliderDemo() {
  const session = mockSessions[0];
  const strain = mockStrains.find((s) => s.id === session.strainId);
  const [rating, setRating] = useState(session.rating);

  return (
    <div className="pv-rs-demo">
      <div className="pv-rs-header">
        <span className="pv-rs-strain">{strain?.name ?? 'Unknown'}</span>
        <span className="pv-rs-current">{rating}/10</span>
      </div>

      <div className="pv-rs-track-container">
        <input
          type="range"
          min={1}
          max={10}
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="pv-rs-input"
          aria-label={`Rate ${strain?.name ?? 'strain'}`}
        />
        <div className="pv-rs-ticks" aria-hidden="true">
          {Array.from({ length: 10 }, (_, i) => (
            <span key={i} className="pv-rs-tick">{i + 1}</span>
          ))}
        </div>

        <div className="pv-rs-friends" aria-label="Friend ratings">
          {session.friendRatings.map((f) => (
            <div
              key={f.name}
              className="pv-rs-friend-dot"
              style={{ left: `${((f.rating - 1) / 9) * 100}%` }}
              title={`${f.name}: ${f.rating}/10`}
              aria-label={`${f.name} rated ${f.rating} out of 10`}
            >
              <span className="pv-rs-friend-avatar">{f.name[0]}</span>
              <span className="pv-rs-friend-tooltip">{f.name}: {f.rating}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
