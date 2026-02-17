import { useState } from 'react';
import './SocialElements.css';
import { mockStrains, mockSessions } from './mockData';

function ShareCard() {
  const strain = mockStrains[0];
  const [shared, setShared] = useState(false);

  return (
    <div className="pv-soc-share-card">
      <div className="pv-soc-share-header">
        <span className="pv-soc-share-title">Share this strain</span>
      </div>
      <div className="pv-soc-share-preview">
        <span className="pv-soc-share-strain">{strain.name}</span>
        <span className="pv-soc-share-type">{strain.type}</span>
        <span className="pv-soc-share-thc">THC {strain.thc}%</span>
      </div>
      <button
        className={`pv-soc-share-btn ${shared ? 'pv-soc-share-btn--shared' : ''}`}
        onClick={() => setShared((s) => !s)}
      >
        {shared ? 'Shared!' : 'Share with friends'}
      </button>
    </div>
  );
}

function StatusIndicator() {
  const statuses = [
    { label: 'Currently enjoying', strain: 'Blue Dream', active: true },
    { label: 'Last session', strain: 'Sour Diesel', active: false },
  ];

  return (
    <div className="pv-soc-statuses">
      {statuses.map((s) => (
        <div key={s.label} className={`pv-soc-status ${s.active ? 'pv-soc-status--active' : ''}`}>
          <span className={`pv-soc-status-dot ${s.active ? 'pv-soc-status-dot--active' : ''}`} />
          <div className="pv-soc-status-text">
            <span className="pv-soc-status-label">{s.label}</span>
            <span className="pv-soc-status-strain">{s.strain}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function SharedList() {
  const friends = [
    { name: 'Alex', avatar: 'A', strain: 'Blue Dream' },
    { name: 'Jordan', avatar: 'J', strain: 'Sour Diesel' },
    { name: 'Sam', avatar: 'S', strain: 'Granddaddy Purple' },
  ];

  return (
    <div className="pv-soc-shared-list">
      <h4 className="pv-soc-list-title">Friends' recent sessions</h4>
      <div className="pv-soc-friends">
        {friends.map((f) => (
          <div key={f.name} className="pv-soc-friend">
            <span className="pv-soc-avatar">{f.avatar}</span>
            <div className="pv-soc-friend-info">
              <span className="pv-soc-friend-name">{f.name}</span>
              <span className="pv-soc-friend-strain">{f.strain}</span>
            </div>
            <span className="pv-soc-friend-time">
              {mockSessions[0].date}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SocialElementsDemo() {
  return (
    <div className="pv-soc-demo">
      <ShareCard />
      <StatusIndicator />
      <SharedList />
    </div>
  );
}
