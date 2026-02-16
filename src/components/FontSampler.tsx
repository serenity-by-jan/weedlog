import './FontSampler.css';

import logo01 from '../assets/logo-line-01.svg';
import logo02 from '../assets/logo-line-02.svg';
import logo03 from '../assets/logo-line-03.svg';
import logo04 from '../assets/logo-line-04.svg';
import logo05 from '../assets/logo-line-05.svg';
import logo06 from '../assets/logo-line-06.svg';
import logo07 from '../assets/logo-line-07.svg';
import logo08 from '../assets/logo-line-08.svg';
import logo09 from '../assets/logo-line-09.svg';
import logo10 from '../assets/logo-line-10.svg';
import logo11 from '../assets/logo-line-11.svg';
import logo12 from '../assets/logo-line-12.svg';

const LOGOS = [
  { src: logo01, label: '01 — Classic five-finger' },
  { src: logo02, label: '02 — Tilted casual' },
  { src: logo03, label: '03 — Three-finger minimal' },
  { src: logo04, label: '04 — Dot tips' },
  { src: logo05, label: '05 — Curvy organic' },
  { src: logo06, label: '06 — Asymmetric playful' },
  { src: logo07, label: '07 — Wide spread fan' },
  { src: logo08, label: '08 — Curl tips' },
  { src: logo09, label: '09 — Circle badge' },
  { src: logo10, label: '10 — Pinwheel dynamic' },
  { src: logo11, label: '11 — Stacked chevrons' },
  { src: logo12, label: '12 — Rounded splat' },
];

/*
 * Current token audit:
 *   --color-primary:         #016630  (dark green — used for button bg, accents)
 *   --color-primary-invert:  #dcfce7  (minty white — text on primary bg)
 *   --color-hover:           #008236  (brighter green — hover state)
 *   --color-pressed:         #0d542b  (deeper green — active/pressed)
 *   --color-focus:           #7bf1a8  (bright mint — focus rings)
 *   --color-border:          rgba(255,255,255,0.1) — assumes dark bg!
 *   --color-landing-bg:      #052e16  (very dark green — page background)
 *   --color-landing-text:    #dcfce7  (minty white — body text)
 *
 * Problems with current selections:
 *   1. Everything assumes dark background — border is white-alpha, text is light
 *   2. No neutral grays for secondary text, disabled states, subtle borders
 *   3. No error/warning/success semantics
 *   4. No surface/card color distinct from page bg
 *   5. hover (#008236) is BRIGHTER than primary (#016630) — unusual for dark themes
 *   6. No concept of text hierarchy (primary text vs secondary vs muted)
 */

interface ThemeColors {
  name: string;
  description: string;
  bg: string;
  surface: string;
  surfaceBorder: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  primary: string;
  primaryText: string;
  primaryHover: string;
  primaryPressed: string;
  focus: string;
  error: string;
  success: string;
  warning: string;
}

const THEMES: ThemeColors[] = [
  {
    name: 'Current (dark green)',
    description: 'What we have now — dark green bg, light text. Issues: no surface distinction, no semantic colors, border assumes dark bg.',
    bg: '#052e16',
    surface: '#0a3d1f',
    surfaceBorder: 'rgba(255,255,255,0.1)',
    textPrimary: '#dcfce7',
    textSecondary: '#a7d5b8',
    textMuted: '#6b9e7e',
    primary: '#016630',
    primaryText: '#dcfce7',
    primaryHover: '#008236',
    primaryPressed: '#0d542b',
    focus: '#7bf1a8',
    error: '#f87171',
    success: '#4ade80',
    warning: '#fbbf24',
  },
  {
    name: 'Light — warm white',
    description: 'Off-white bg, green accents. Feels spacious and modern. The obvious "right" default for a consumer app.',
    bg: '#fafaf8',
    surface: '#ffffff',
    surfaceBorder: '#e4e4e0',
    textPrimary: '#1a1a1a',
    textSecondary: '#525250',
    textMuted: '#a1a19e',
    primary: '#16a34a',
    primaryText: '#ffffff',
    primaryHover: '#15803d',
    primaryPressed: '#166534',
    focus: '#22c55e',
    error: '#dc2626',
    success: '#16a34a',
    warning: '#d97706',
  },
  {
    name: 'Light — cool white',
    description: 'Pure white with a slightly cooler tone. Crisper, more tech-y. Green pops more against neutral.',
    bg: '#f8fafb',
    surface: '#ffffff',
    surfaceBorder: '#e2e5e8',
    textPrimary: '#111827',
    textSecondary: '#4b5563',
    textMuted: '#9ca3af',
    primary: '#059669',
    primaryText: '#ffffff',
    primaryHover: '#047857',
    primaryPressed: '#065f46',
    focus: '#34d399',
    error: '#ef4444',
    success: '#10b981',
    warning: '#f59e0b',
  },
  {
    name: 'Dark mode — near-black green',
    description: 'Your dark mode idea. Near-black with a green undertone. Premium, immersive.',
    bg: '#0c1a12',
    surface: '#132a1a',
    surfaceBorder: 'rgba(255,255,255,0.08)',
    textPrimary: '#e8f5e9',
    textSecondary: '#a5c9af',
    textMuted: '#5e8a6b',
    primary: '#22c55e',
    primaryText: '#0c1a12',
    primaryHover: '#16a34a',
    primaryPressed: '#15803d',
    focus: '#4ade80',
    error: '#f87171',
    success: '#4ade80',
    warning: '#fbbf24',
  },
];

function UIComponentDemo({ theme }: { theme: ThemeColors }) {
  const cardStyle = {
    background: theme.surface,
    border: `2px solid ${theme.surfaceBorder}`,
    borderRadius: '8px',
    padding: '16px',
  };

  return (
    <div
      className="theme-demo"
      style={{ background: theme.bg, color: theme.textPrimary }}
    >
      <div className="theme-demo-header">
        <h3 style={{ margin: 0 }}>{theme.name}</h3>
        <p style={{ color: theme.textSecondary, fontSize: '13px', margin: '4px 0 0' }}>
          {theme.description}
        </p>
      </div>

      <div className="theme-demo-grid">
        {/* Buttons */}
        <div style={cardStyle}>
          <div className="demo-label" style={{ color: theme.textMuted }}>Buttons</div>
          <div className="demo-button-row">
            <button
              className="demo-btn"
              style={{ background: theme.primary, color: theme.primaryText, border: 'none' }}
            >
              Log Session
            </button>
            <button
              className="demo-btn"
              style={{ background: theme.primaryHover, color: theme.primaryText, border: 'none' }}
            >
              Hover
            </button>
            <button
              className="demo-btn"
              style={{ background: theme.primaryPressed, color: theme.primaryText, border: 'none' }}
            >
              Pressed
            </button>
            <button
              className="demo-btn"
              style={{ background: 'transparent', color: theme.primary, border: `2px solid ${theme.primary}` }}
            >
              Secondary
            </button>
          </div>
        </div>

        {/* Text hierarchy */}
        <div style={cardStyle}>
          <div className="demo-label" style={{ color: theme.textMuted }}>Text hierarchy</div>
          <div style={{ color: theme.textPrimary, fontWeight: 700, fontSize: '18px' }}>
            Blue Dream — Sativa-dominant hybrid
          </div>
          <div style={{ color: theme.textSecondary, fontSize: '14px', marginTop: '4px' }}>
            THC 24.3% · CBD 0.1% · Myrcene, Pinene, Caryophyllene
          </div>
          <div style={{ color: theme.textMuted, fontSize: '13px', marginTop: '4px' }}>
            Last logged 3 days ago · 4 sessions total
          </div>
        </div>

        {/* Input */}
        <div style={cardStyle}>
          <div className="demo-label" style={{ color: theme.textMuted }}>Form inputs</div>
          <div
            className="demo-input"
            style={{
              border: `2px solid ${theme.surfaceBorder}`,
              color: theme.textPrimary,
              background: theme.bg,
            }}
          >
            Search strains...
          </div>
          <div
            className="demo-input"
            style={{
              border: `2px solid ${theme.primary}`,
              color: theme.textPrimary,
              background: theme.bg,
              outline: `3px solid ${theme.focus}`,
              outlineOffset: '2px',
            }}
          >
            Focused input
          </div>
        </div>

        {/* Semantic colors */}
        <div style={cardStyle}>
          <div className="demo-label" style={{ color: theme.textMuted }}>Semantic states</div>
          <div className="demo-badge-row">
            <span className="demo-badge" style={{ background: theme.success + '22', color: theme.success, border: `1px solid ${theme.success}44` }}>
              Logged
            </span>
            <span className="demo-badge" style={{ background: theme.warning + '22', color: theme.warning, border: `1px solid ${theme.warning}44` }}>
              Pending review
            </span>
            <span className="demo-badge" style={{ background: theme.error + '22', color: theme.error, border: `1px solid ${theme.error}44` }}>
              Expired COA
            </span>
          </div>
        </div>

        {/* Card example */}
        <div style={{ ...cardStyle, gridColumn: '1 / -1' }}>
          <div className="demo-label" style={{ color: theme.textMuted }}>Strain card</div>
          <div
            className="demo-strain-card"
            style={{
              background: theme.bg,
              border: `2px solid ${theme.surfaceBorder}`,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '16px' }}>OG Kush</div>
                <div style={{ color: theme.textSecondary, fontSize: '13px' }}>Indica · Earthy, Pine, Woody</div>
              </div>
              <span className="demo-badge" style={{ background: theme.primary, color: theme.primaryText }}>
                92% match
              </span>
            </div>
            <div style={{ display: 'flex', gap: '16px', marginTop: '12px', fontSize: '13px' }}>
              <div>
                <div style={{ color: theme.textMuted, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px' }}>THC</div>
                <div style={{ fontWeight: 700 }}>23.1%</div>
              </div>
              <div>
                <div style={{ color: theme.textMuted, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px' }}>CBD</div>
                <div style={{ fontWeight: 700 }}>0.3%</div>
              </div>
              <div>
                <div style={{ color: theme.textMuted, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px' }}>Top terpene</div>
                <div style={{ fontWeight: 700 }}>Myrcene</div>
              </div>
              <div>
                <div style={{ color: theme.textMuted, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px' }}>Sessions</div>
                <div style={{ fontWeight: 700 }}>12</div>
              </div>
            </div>
          </div>
        </div>

        {/* Focus ring demo */}
        <div style={cardStyle}>
          <div className="demo-label" style={{ color: theme.textMuted }}>Focus ring</div>
          <button
            className="demo-btn"
            style={{
              background: theme.primary,
              color: theme.primaryText,
              border: 'none',
              outline: `3px solid ${theme.focus}`,
              outlineOffset: '3px',
            }}
          >
            Focused button
          </button>
        </div>

        {/* Nav / tab bar feel */}
        <div style={cardStyle}>
          <div className="demo-label" style={{ color: theme.textMuted }}>Navigation</div>
          <div className="demo-nav" style={{ borderBottom: `2px solid ${theme.surfaceBorder}` }}>
            <span style={{ color: theme.primary, borderBottom: `2px solid ${theme.primary}`, paddingBottom: '8px' }}>
              Journal
            </span>
            <span style={{ color: theme.textSecondary, paddingBottom: '8px' }}>Strains</span>
            <span style={{ color: theme.textSecondary, paddingBottom: '8px' }}>Friends</span>
            <span style={{ color: theme.textMuted, paddingBottom: '8px' }}>Settings</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FontSampler() {
  return (
    <div className="sampler">
      <h1>Weedlog Design Explorer</h1>

      {/* ---- Logos ---- */}
      <h2>Logo Explorations — Bold Line Style</h2>
      <p className="section-note">
        All uniform stroke weight, no fills. Looking for quirky + recognizable.
      </p>
      <div className="icon-gallery">
        {LOGOS.map((logo) => (
          <div className="icon-card" key={logo.label}>
            <img src={logo.src} alt={logo.label} />
            <span className="icon-label">{logo.label}</span>
          </div>
        ))}
      </div>

      {/* ---- Font locked in ---- */}
      <h2>Chosen Font — Bricolage Grotesque</h2>
      <div className="font-showcase">
        <div className="font-showcase-hero">Weedlog</div>
        <div className="font-showcase-sub">Keep track of your favorite buds with your buds.</div>
        <div className="font-showcase-body">
          A social cannabis tracking app that puts transparency first.
          Every strain, every session, every effect — logged, cited, and shared.
          Built for newcomers and connoisseurs alike.
        </div>
        <div className="font-showcase-ui">
          <span className="font-showcase-btn">Log Session</span>
          <span className="font-showcase-btn-outline">View Strain</span>
          <span className="font-showcase-label">THC 24.3%</span>
          <span className="font-showcase-data">3.5g · Hybrid · Blue Dream</span>
        </div>
        <div className="font-showcase-weights">
          <span style={{ fontWeight: 200 }}>200 Light</span>
          <span style={{ fontWeight: 400 }}>400 Regular</span>
          <span style={{ fontWeight: 600 }}>600 Semi</span>
          <span style={{ fontWeight: 700 }}>700 Bold</span>
          <span style={{ fontWeight: 800 }}>800 Extra</span>
        </div>
      </div>

      {/* ---- Color audit ---- */}
      <h2>Color Audit — Theme Role Comparisons</h2>
      <p className="section-note">
        Each theme shows the same UI components so you can compare how color choices
        affect feel. Current tokens are shown first, then alternatives.
      </p>
      {THEMES.map((theme) => (
        <UIComponentDemo key={theme.name} theme={theme} />
      ))}
    </div>
  );
}
