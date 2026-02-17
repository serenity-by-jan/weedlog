import { useState } from 'react';
import './ExpandableSection.css';
import { mockStrains, mockSessions } from './mockData';

interface AccordionItemProps {
  title: string;
  preview: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function AccordionItem({ title, preview, children, defaultOpen = false }: AccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={`pv-es-item ${open ? 'pv-es-item--open' : ''}`}>
      <button
        className="pv-es-header"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <div className="pv-es-header-text">
          <span className="pv-es-title">{title}</span>
          {!open && <span className="pv-es-preview">{preview}</span>}
        </div>
        <svg
          className="pv-es-chevron"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div className="pv-es-body" role="region" hidden={!open}>
        {children}
      </div>
    </div>
  );
}

export default function ExpandableSectionDemo() {
  return (
    <div className="pv-es-list">
      <AccordionItem
        title="Strain Details"
        preview={`${mockStrains[0].name} — ${mockStrains[0].type}`}
        defaultOpen
      >
        <p className="pv-es-content-text">{mockStrains[0].description}</p>
        <div className="pv-es-content-meta">
          <span>THC: {mockStrains[0].thc}%</span>
          <span>CBD: {mockStrains[0].cbd}%</span>
          <span>Type: {mockStrains[0].type}</span>
        </div>
      </AccordionItem>

      <AccordionItem
        title="Recent Sessions"
        preview={`${mockSessions.length} sessions logged`}
      >
        <ul className="pv-es-session-list">
          {mockSessions.map((s) => {
            const strain = mockStrains.find((st) => st.id === s.strainId);
            return (
              <li key={s.id} className="pv-es-session">
                <span className="pv-es-session-name">{strain?.name ?? 'Unknown'}</span>
                <span className="pv-es-session-rating">{s.rating}/10</span>
                <span className="pv-es-session-date">{s.date}</span>
              </li>
            );
          })}
        </ul>
      </AccordionItem>

      <AccordionItem
        title="Terpene Profile"
        preview={mockStrains[0].terpenes.slice(0, 3).map((t) => t.name).join(', ')}
      >
        <div className="pv-es-terpene-list">
          {mockStrains[0].terpenes.map((t) => (
            <div key={t.name} className="pv-es-terpene-row">
              <span className="pv-es-terpene-name">{t.name}</span>
              <span className="pv-es-terpene-bar-bg">
                <span
                  className="pv-es-terpene-bar"
                  style={{ width: `${(t.percentage / 0.5) * 100}%` }}
                />
              </span>
              <span className="pv-es-terpene-val">{t.percentage}%</span>
            </div>
          ))}
        </div>
      </AccordionItem>
    </div>
  );
}
