import { useState } from 'react';
import './AliasDisplay.css';
import { mockStrains } from './mockData';

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard API may not be available in all contexts
    }
  }

  return (
    <button
      className="pv-ad-copy"
      onClick={handleCopy}
      aria-label={`Copy "${text}" to clipboard`}
    >
      <div className="pv-ad-wisps" aria-hidden="true">
        <span className="pv-ad-wisp" />
        <span className="pv-ad-wisp" />
        <span className="pv-ad-wisp" />
        <span className="pv-ad-wisp" />
        <span className="pv-ad-wisp" />
      </div>
      {copied ? (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 8l3 3 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <rect x="5" y="5" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M3 11V3h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      <span className="pv-ad-copy-label">{copied ? 'Copied!' : 'Copy'}</span>
    </button>
  );
}

export default function AliasDisplayDemo() {
  return (
    <div className="pv-ad-list">
      {mockStrains.map((s) => (
        <div key={s.id} className="pv-ad-strain">
          <span className="pv-ad-name">{s.name}</span>
          <div className="pv-ad-aliases">
            {s.aliases.map((alias) => (
              <div key={alias} className="pv-ad-alias">
                <span className="pv-ad-alias-text">{alias}</span>
                <CopyButton text={alias} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
