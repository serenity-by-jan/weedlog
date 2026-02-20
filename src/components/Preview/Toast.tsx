import { useState, useEffect } from 'react';
import './Toast.css';
import OrganicCloud from '../OrganicCloud';

export default function ToastDemo() {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('Logged.');

  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => setVisible(false), 3000);
    return () => clearTimeout(timer);
  }, [visible]);

  const messages = ['Logged.', 'Session saved.', 'Strain added.', 'Nice sesh!'];

  function showToast() {
    setMessage(messages[Math.floor(Math.random() * messages.length)]);
    setVisible(true);
  }

  return (
    <div className="pv-toast-demo">
      <button className="pv-toast-trigger" onClick={showToast}>
        Show toast
      </button>

      {visible && (
        <div className="pv-toast" role="status" aria-live="polite">
          <div className="pv-toast-content">
            <svg className="pv-toast-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
              <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="pv-toast-message">{message}</span>
          </div>
          <OrganicCloud count={14} mode="dark" size="sm" trigger="always" />
          <button
            className="pv-toast-dismiss"
            onClick={() => setVisible(false)}
            aria-label="Dismiss notification"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
