import { useEffect, useRef, useState } from 'react';
import './FontSampler.css';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface TypographyStyle {
  name: string;
  description: string;
  fontFamily: string;
  fontSize: string;
  fontWeight: number;
  lineHeight: number;
  letterSpacing: string;
}

const typographyStyles: TypographyStyle[] = [
  { name: 'display-lg', description: 'Hero headlines', fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '48px', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.025em' },
  { name: 'display', description: 'Page-level display text', fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '36px', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.025em' },
  { name: 'heading-lg', description: 'Primary heading (h1)', fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '30px', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.025em' },
  { name: 'heading', description: 'Section heading (h2)', fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '24px', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.025em' },
  { name: 'heading-sm', description: 'Sub-heading (h3)', fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '20px', fontWeight: 600, lineHeight: 1.2, letterSpacing: '-0.025em' },
  { name: 'body-lg', description: 'Large body, card descriptions', fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '18px', fontWeight: 400, lineHeight: 1.5, letterSpacing: '0em' },
  { name: 'body', description: 'Default body text', fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '16px', fontWeight: 400, lineHeight: 1.5, letterSpacing: '0em' },
  { name: 'body-sm', description: 'Compact body text', fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '14px', fontWeight: 400, lineHeight: 1.5, letterSpacing: '0em' },
  { name: 'emphasis-lg', description: 'Key data, strong callouts at large body scale', fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '18px', fontWeight: 600, lineHeight: 1.5, letterSpacing: '0em' },
  { name: 'emphasis', description: 'Inline importance, key values', fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '16px', fontWeight: 600, lineHeight: 1.5, letterSpacing: '0em' },
  { name: 'emphasis-sm', description: 'Small emphasized text', fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '14px', fontWeight: 600, lineHeight: 1.5, letterSpacing: '0em' },
  { name: 'label', description: 'Buttons, nav items, form labels', fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '14px', fontWeight: 600, lineHeight: 1.2, letterSpacing: '0em' },
  { name: 'label-sm', description: 'Badges, tags, small interactive text', fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '12px', fontWeight: 600, lineHeight: 1.2, letterSpacing: '0em' },
  { name: 'caption', description: 'Helper text, timestamps, metadata', fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '12px', fontWeight: 400, lineHeight: 1.5, letterSpacing: '0em' },
  { name: 'overline', description: 'Section dividers, category labels (uppercase intent)', fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '12px', fontWeight: 600, lineHeight: 1.2, letterSpacing: '0.05em' },
  { name: 'code', description: 'Inline code, data values, monospace', fontFamily: "'SF Mono', 'Fira Code', 'Fira Mono', monospace", fontSize: '14px', fontWeight: 400, lineHeight: 1.5, letterSpacing: '0em' },
];

interface ColorToken { name: string; value: string; }
interface TokenRow { name: string; value: string; description?: string; }

const sections = [
  { id: 'typography', label: 'Typography' },
  { id: 'colors', label: 'Colors' },
  { id: 'spacing', label: 'Spacing' },
  { id: 'radius', label: 'Radius' },
  { id: 'borders', label: 'Borders' },
  { id: 'shadows', label: 'Shadows' },
  { id: 'containers', label: 'Containers' },
  { id: 'transitions', label: 'Transitions' },
  { id: 'z-index', label: 'Z-Index' },
];

/* ------------------------------------------------------------------ */
/*  Token extraction helpers                                           */
/* ------------------------------------------------------------------ */

function getTokensByPrefix(prefix: string): TokenRow[] {
  const style = getComputedStyle(document.documentElement);
  const tokens: TokenRow[] = [];

  for (const sheet of document.styleSheets) {
    try {
      for (const rule of sheet.cssRules) {
        if (rule instanceof CSSStyleRule && rule.selectorText === ':root') {
          for (let i = 0; i < rule.style.length; i++) {
            const prop = rule.style[i];
            if (!prop.startsWith(`--${prefix}`)) continue;
            // skip typography composites (they expand to individual props)
            if (prefix !== 'weedlog-typography-' && prop.startsWith('--weedlog-typography-')) continue;
            tokens.push({ name: prop, value: style.getPropertyValue(prop).trim() });
          }
        }
      }
    } catch { /* skip cross-origin */ }
  }
  return tokens;
}

function getColorTokensGrouped(): Record<string, ColorToken[]> {
  const style = getComputedStyle(document.documentElement);
  const groups: Record<string, ColorToken[]> = {};
  const groupOrder = ['bg', 'surface', 'text', 'brand', 'border', 'interactive', 'semantic', 'overlay'];

  for (const sheet of document.styleSheets) {
    try {
      for (const rule of sheet.cssRules) {
        if (rule instanceof CSSStyleRule && rule.selectorText === ':root') {
          for (let i = 0; i < rule.style.length; i++) {
            const prop = rule.style[i];
            if (!prop.startsWith('--weedlog-color-')) continue;
            const value = style.getPropertyValue(prop).trim();
            const parts = prop.slice(16).split('-'); // after --weedlog-color-
            const group = parts[0];
            if (!groups[group]) groups[group] = [];
            groups[group].push({ name: prop, value });
          }
        }
      }
    } catch { /* skip cross-origin */ }
  }

  // Sort by defined order
  const sorted: Record<string, ColorToken[]> = {};
  for (const g of groupOrder) {
    if (groups[g]) sorted[g] = groups[g];
  }
  return sorted;
}

/* ------------------------------------------------------------------ */
/*  Section components                                                 */
/* ------------------------------------------------------------------ */

function TypographySection() {
  return (
    <section id="typography" className="dr-section">
      <h2 className="dr-section-title">Typography</h2>
      <p className="dr-section-desc">
        16 composite typography styles — each bundles font family, size, weight, line height, and letter spacing.
      </p>
      <div className="dr-type-specimens">
        {typographyStyles.map((t) => (
          <div key={t.name} className="dr-type-specimen">
            <div className="dr-type-specimen-header">
              <span className="dr-type-name">{t.name}</span>
              <span className="dr-type-desc">{t.description}</span>
            </div>
            <div className="dr-type-props">
              <span>{t.fontSize}</span>
              <span>/</span>
              <span>{t.lineHeight}</span>
              <span className="dr-type-prop-sep">·</span>
              <span>w{t.fontWeight}</span>
              <span className="dr-type-prop-sep">·</span>
              <span>{t.letterSpacing === '0em' ? '0' : t.letterSpacing}</span>
            </div>
            <p
              className="dr-type-sample"
              style={{
                fontFamily: t.fontFamily,
                fontSize: t.fontSize,
                fontWeight: t.fontWeight,
                lineHeight: t.lineHeight,
                letterSpacing: t.letterSpacing,
              }}
            >
              The quick brown fox jumps over the lazy dog
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ColorsSection() {
  const groups = getColorTokensGrouped();

  return (
    <section id="colors" className="dr-section">
      <h2 className="dr-section-title">Colors</h2>
      <p className="dr-section-desc">All color tokens grouped by role.</p>
      {Object.entries(groups).map(([group, tokens]) => (
        <div key={group} className="dr-color-group">
          <h3 className="dr-color-group-title">{group}</h3>
          <div className="dr-color-swatches">
            {tokens.map((t) => (
              <div key={t.name} className="dr-color-swatch">
                <span className="dr-color-chip" style={{ background: t.value }} />
                <span className="dr-color-name">{t.name.slice(2)}</span>
                <span className="dr-color-value">{t.value}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

function SpacingSection() {
  const tokens = getTokensByPrefix('weedlog-spacing-');
  return (
    <section id="spacing" className="dr-section">
      <h2 className="dr-section-title">Spacing</h2>
      <p className="dr-section-desc">Spacing scale used for padding, margins, and gaps.</p>
      <div className="dr-spacing-list">
        {tokens.map((t) => (
          <div key={t.name} className="dr-spacing-row">
            <span className="dr-spacing-label">{t.name.slice(2)}</span>
            <span className="dr-spacing-value">{t.value}</span>
            <span className="dr-spacing-bar" style={{ width: t.value }} />
          </div>
        ))}
      </div>
    </section>
  );
}

function RadiusSection() {
  const tokens = getTokensByPrefix('weedlog-radius-');
  return (
    <section id="radius" className="dr-section">
      <h2 className="dr-section-title">Radius</h2>
      <p className="dr-section-desc">Border radius values for rounding corners.</p>
      <div className="dr-radius-list">
        {tokens.map((t) => (
          <div key={t.name} className="dr-radius-row">
            <span className="dr-radius-box" style={{ borderRadius: t.value }} />
            <span className="dr-radius-label">{t.name.slice(2)}</span>
            <span className="dr-radius-value">{t.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function BordersSection() {
  const tokens = getTokensByPrefix('weedlog-border-width-');
  return (
    <section id="borders" className="dr-section">
      <h2 className="dr-section-title">Borders</h2>
      <p className="dr-section-desc">Border width tokens.</p>
      <div className="dr-borders-list">
        {tokens.map((t) => (
          <div key={t.name} className="dr-border-row">
            <span className="dr-border-line" style={{ borderBottomWidth: t.value }} />
            <span className="dr-border-label">{t.name.slice(2)}</span>
            <span className="dr-border-value">{t.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function ShadowsSection() {
  const tokens = getTokensByPrefix('weedlog-shadow-');
  return (
    <section id="shadows" className="dr-section">
      <h2 className="dr-section-title">Shadows</h2>
      <p className="dr-section-desc">Elevation levels for cards, dropdowns, and modals.</p>
      <div className="dr-shadows-list">
        {tokens.map((t) => (
          <div key={t.name} className="dr-shadow-card" style={{ boxShadow: t.value }}>
            <span className="dr-shadow-label">{t.name.slice(2)}</span>
            <span className="dr-shadow-value">{t.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function ContainersSection() {
  const tokens = getTokensByPrefix('weedlog-container-');
  const maxVal = 1200; // xl container
  return (
    <section id="containers" className="dr-section">
      <h2 className="dr-section-title">Containers</h2>
      <p className="dr-section-desc">Max-width values for layout containers.</p>
      <div className="dr-container-list">
        {tokens.map((t) => {
          const px = parseInt(t.value, 10);
          const pct = (px / maxVal) * 100;
          return (
            <div key={t.name} className="dr-container-row">
              <span className="dr-container-label">{t.name.slice(2)}</span>
              <span className="dr-container-value">{t.value}</span>
              <span className="dr-container-bar" style={{ width: `${pct}%` }} />
            </div>
          );
        })}
      </div>
    </section>
  );
}

function TransitionsSection() {
  const tokens = getTokensByPrefix('weedlog-transition-');
  return (
    <section id="transitions" className="dr-section">
      <h2 className="dr-section-title">Transitions</h2>
      <p className="dr-section-desc">Hover over each box to see the transition speed in action.</p>
      <div className="dr-transition-list">
        {tokens.map((t) => (
          <div
            key={t.name}
            className="dr-transition-box"
            style={{ transition: `background-color ${t.value}, transform ${t.value}` }}
          >
            <span className="dr-transition-label">{t.name.slice(2)}</span>
            <span className="dr-transition-value">{t.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function ZIndexSection() {
  const tokens = getTokensByPrefix('weedlog-z-');
  return (
    <section id="z-index" className="dr-section">
      <h2 className="dr-section-title">Z-Index</h2>
      <p className="dr-section-desc">Stacking order for layered UI elements.</p>
      <div className="dr-z-list">
        {tokens.map((t) => (
          <div key={t.name} className="dr-z-pill">
            <span className="dr-z-value">{t.value}</span>
            <span className="dr-z-label">{t.name.slice(12)}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Navigation                                                         */
/* ------------------------------------------------------------------ */

function SideNav({ activeId }: { activeId: string }) {
  return (
    <nav className="dr-nav" aria-label="Design reference sections">
      <div className="dr-nav-logo" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="28" height="28">
          <g fill="none" stroke="currentColor" strokeWidth="18" strokeLinecap="round" transform="rotate(-15, 100, 100)">
            <line x1="100" y1="100" x2="100" y2="35"/>
            <line x1="100" y1="100" x2="162" y2="55"/>
            <line x1="100" y1="100" x2="138" y2="135"/>
            <line x1="100" y1="100" x2="62" y2="135"/>
            <line x1="100" y1="100" x2="38" y2="55"/>
            <line x1="100" y1="100" x2="100" y2="168"/>
          </g>
        </svg>
      </div>
      {sections.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className={`dr-nav-item ${activeId === s.id ? 'dr-nav-item--active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          {s.label}
        </a>
      ))}
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function FontSampler() {
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
    <div className="dr-layout">
      <SideNav activeId={activeId} />
      <main className="dr-main">
        <header className="dr-header">
          <h1 className="dr-title">Design Reference</h1>
          <p className="dr-subtitle">Weedlog design tokens and typography system</p>
        </header>

        <TypographySection />
        <ColorsSection />
        <SpacingSection />
        <RadiusSection />
        <BordersSection />
        <ShadowsSection />
        <ContainersSection />
        <TransitionsSection />
        <ZIndexSection />
      </main>
    </div>
  );
}
