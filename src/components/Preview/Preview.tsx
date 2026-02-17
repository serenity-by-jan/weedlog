import { useEffect, useRef, useState } from 'react';
import './animations.css';
import './Preview.css';
import ConsumptionIcons from './ConsumptionIcons';
import StrainCard from './StrainCard';
import InlineSelectors from './InlineSelectors';
import ReactionChips from './ReactionChips';
import RatingSlider from './RatingSlider';
import SessionLogger from './SessionLogger';
import ExpandableSection from './ExpandableSection';
import Toast from './Toast';
import BurnDown from './BurnDown';
import StrainLineage from './StrainLineage';
import AliasDisplay from './AliasDisplay';
import CoAHighlights from './CoAHighlights';
import SocialElements from './SocialElements';
import NavEnhancement from './NavEnhancement';
import EmptyStates from './EmptyStates';
import FlavorWheel from './FlavorWheel';
import WispVariations from './WispVariations';

const sections = [
  { id: 'consumption-icons', label: 'Consumption Icons' },
  { id: 'strain-card', label: 'Strain Card' },
  { id: 'inline-selectors', label: 'Inline Selectors' },
  { id: 'reaction-chips', label: 'Reaction Chips' },
  { id: 'rating-slider', label: 'Rating Slider' },
  { id: 'session-logger', label: 'Session Logger' },
  { id: 'expandable-section', label: 'Expandable Section' },
  { id: 'toast', label: 'Toast' },
  { id: 'burn-down', label: 'Burn Down' },
  { id: 'strain-lineage', label: 'Strain Lineage' },
  { id: 'alias-display', label: 'Alias Display' },
  { id: 'coa-highlights', label: 'CoA Highlights' },
  { id: 'social-elements', label: 'Social Elements' },
  { id: 'nav-enhancement', label: 'Nav Enhancement' },
  { id: 'empty-states', label: 'Empty States' },
  { id: 'flavor-wheel', label: 'Flavor Wheel' },
  { id: 'wisp-variations', label: 'Wisp Variations (Testing)' },
];

function SideNav({ activeId }: { activeId: string }) {
  return (
    <nav className="pv-nav" aria-label="Preview sections">
      <div className="pv-nav-logo" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="28" height="28">
          <g fill="none" stroke="currentColor" strokeWidth="18" strokeLinecap="round" transform="rotate(-15, 100, 100)">
            <line x1="100" y1="100" x2="100" y2="35" />
            <line x1="100" y1="100" x2="162" y2="55" />
            <line x1="100" y1="100" x2="138" y2="135" />
            <line x1="100" y1="100" x2="62" y2="135" />
            <line x1="100" y1="100" x2="38" y2="55" />
            <line x1="100" y1="100" x2="100" y2="168" />
          </g>
        </svg>
      </div>
      {sections.map((s) => (
        <button
          key={s.id}
          className={`pv-nav-item ${activeId === s.id ? 'pv-nav-item--active' : ''}`}
          onClick={() => {
            document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          {s.label}
        </button>
      ))}
    </nav>
  );
}

export default function Preview() {
  const [activeId, setActiveId] = useState(sections[0].id);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-20% 0px -60% 0px' }
    );

    for (const s of sections) {
      const el = document.getElementById(s.id);
      if (el) observerRef.current.observe(el);
    }

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className="pv-layout">
      <SideNav activeId={activeId} />
      <main className="pv-main">
        <header className="pv-header">
          <h1 className="pv-title">Component Preview</h1>
          <p className="pv-subtitle">Interactive prototypes for Weedlog features</p>
        </header>

        <section id="consumption-icons" className="pv-section">
          <h2 className="pv-section-title">Consumption Icons</h2>
          <p className="pv-section-desc">SVG icon set for consumption methods — smoke, vape, dab, edible, drink, and topical.</p>
          <div className="pv-demo-area">
            <ConsumptionIcons />
          </div>
        </section>

        <section id="strain-card" className="pv-section">
          <h2 className="pv-section-title">Strain Card</h2>
          <p className="pv-section-desc">Compact strain cards with type-colored edges and key info at a glance.</p>
          <div className="pv-demo-area">
            <StrainCard />
          </div>
        </section>

        <section id="inline-selectors" className="pv-section">
          <h2 className="pv-section-title">Inline Selectors</h2>
          <p className="pv-section-desc">Inline dropdowns embedded in prose text plus an inline slider for ratings.</p>
          <div className="pv-demo-area">
            <InlineSelectors />
          </div>
        </section>

        <section id="reaction-chips" className="pv-section">
          <h2 className="pv-section-title">Reaction Chips</h2>
          <p className="pv-section-desc">Toggleable experiential tag pills for logging how a strain made you feel.</p>
          <div className="pv-demo-area">
            <ReactionChips />
          </div>
        </section>

        <section id="rating-slider" className="pv-section">
          <h2 className="pv-section-title">Rating Slider</h2>
          <p className="pv-section-desc">1–10 slider with friend comparison dots and labels.</p>
          <div className="pv-demo-area">
            <RatingSlider />
          </div>
        </section>

        <section id="session-logger" className="pv-section">
          <h2 className="pv-section-title">Session Logger</h2>
          <p className="pv-section-desc">Conversational data entry form combining inline selectors and reaction chips.</p>
          <div className="pv-demo-area">
            <SessionLogger />
          </div>
        </section>

        <section id="expandable-section" className="pv-section">
          <h2 className="pv-section-title">Expandable Section</h2>
          <p className="pv-section-desc">Accordion containers with preview summaries that expand to show full content.</p>
          <div className="pv-demo-area">
            <ExpandableSection />
          </div>
        </section>

        <section id="toast" className="pv-section">
          <h2 className="pv-section-title">Toast</h2>
          <p className="pv-section-desc">"Logged." snackbar notification with a smoke wisp animation.</p>
          <div className="pv-demo-area">
            <Toast />
          </div>
        </section>

        <section id="burn-down" className="pv-section">
          <h2 className="pv-section-title">Burn Down</h2>
          <p className="pv-section-desc">Joint/blunt progress indicator showing how much is left.</p>
          <div className="pv-demo-area">
            <BurnDown />
          </div>
        </section>

        <section id="strain-lineage" className="pv-section">
          <h2 className="pv-section-title">Strain Lineage</h2>
          <p className="pv-section-desc">Family tree visualization showing parent strains.</p>
          <div className="pv-demo-area">
            <StrainLineage />
          </div>
        </section>

        <section id="alias-display" className="pv-section">
          <h2 className="pv-section-title">Alias Display</h2>
          <p className="pv-section-desc">Alternative names with copy-to-clipboard functionality.</p>
          <div className="pv-demo-area">
            <AliasDisplay />
          </div>
        </section>

        <section id="coa-highlights" className="pv-section">
          <h2 className="pv-section-title">CoA Highlights</h2>
          <p className="pv-section-desc">THC/CBD stats and terpene radar chart from Certificate of Analysis data.</p>
          <div className="pv-demo-area">
            <CoAHighlights />
          </div>
        </section>

        <section id="social-elements" className="pv-section">
          <h2 className="pv-section-title">Social Elements</h2>
          <p className="pv-section-desc">Sharing card, status indicators, and shared list UI.</p>
          <div className="pv-demo-area">
            <SocialElements />
          </div>
        </section>

        <section id="nav-enhancement" className="pv-section">
          <h2 className="pv-section-title">Nav Enhancement</h2>
          <p className="pv-section-desc">Long-press back button with history dropdown menu.</p>
          <div className="pv-demo-area">
            <NavEnhancement />
          </div>
        </section>

        <section id="empty-states" className="pv-section">
          <h2 className="pv-section-title">Empty States</h2>
          <p className="pv-section-desc">Inviting empty state illustrations with calls to action.</p>
          <div className="pv-demo-area">
            <EmptyStates />
          </div>
        </section>

        <section id="flavor-wheel" className="pv-section">
          <h2 className="pv-section-title">Flavor Wheel</h2>
          <p className="pv-section-desc">Interactive aroma/flavor tagging wheel for selecting flavor profiles.</p>
          <div className="pv-demo-area">
            <FlavorWheel />
          </div>
        </section>

        <section id="wisp-variations" className="pv-section">
          <h2 className="pv-section-title">Wisp Variations (Testing)</h2>
          <p className="pv-section-desc">Testing different animation approaches for more organic, less "perfect" smoke effects. Hover over each demo to see the animation.</p>
          <div className="pv-demo-area">
            <WispVariations />
          </div>
        </section>
      </main>
    </div>
  );
}
