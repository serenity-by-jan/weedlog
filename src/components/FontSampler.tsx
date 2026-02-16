import './FontSampler.css';

interface TokenRow {
  name: string;
  value: string;
}

function getTokenRows(): Record<string, TokenRow[]> {
  const style = getComputedStyle(document.documentElement);
  const groups: Record<string, TokenRow[]> = {};

  for (const sheet of document.styleSheets) {
    try {
      for (const rule of sheet.cssRules) {
        if (rule instanceof CSSStyleRule && rule.selectorText === ':root') {
          for (let i = 0; i < rule.style.length; i++) {
            const prop = rule.style[i];
            if (!prop.startsWith('--')) continue;
            const value = style.getPropertyValue(prop).trim();
            // Group: first 2 segments for color-*, first 1 for everything else
            const stripped = prop.slice(2);
            const isColor = stripped.startsWith('color-');
            const parts = stripped.split('-');
            const group = parts.slice(0, isColor ? 2 : 1).join('-');
            if (!groups[group]) groups[group] = [];
            groups[group].push({ name: prop, value });
          }
        }
      }
    } catch {
      // skip cross-origin
    }
  }
  return groups;
}

function Preview({ name, value }: { name: string; value: string }) {
  const isColor = value.startsWith('#') || value.startsWith('rgb');
  const isSize = /^\d/.test(value) && (value.endsWith('px') || value.endsWith('em') || value.endsWith('%'));
  const isNumeric = /^[\d.]+$/.test(value);
  const isShadow = name.includes('shadow');
  const isRadius = name.includes('radius');
  const isBorderWidth = name.includes('border-width');
  const isTransition = name.includes('transition');
  const isFont = name.includes('font-family') || name.includes('font-weight');
  const isLetterSpacing = name.includes('letter-spacing');
  const isLineHeight = name.includes('line-height');
  const isFontSize = name.includes('font-size');
  const isSpacing = name.includes('spacing');
  const isZ = name.startsWith('--z-');
  const isContainer = name.includes('container');

  if (isColor) {
    return <span className="preview-color" style={{ background: value }} />;
  }
  if (isShadow) {
    return <span className="preview-shadow" style={{ boxShadow: value }} />;
  }
  if (isRadius) {
    return <span className="preview-radius" style={{ borderRadius: value }} />;
  }
  if (isBorderWidth) {
    return <span className="preview-border-width" style={{ borderWidth: value }} />;
  }
  if (isFontSize) {
    return <span className="preview-font-size" style={{ fontSize: value, height: value }}>Ag</span>;
  }
  if (isLineHeight) {
    return <span className="preview-line-height" style={{ lineHeight: value }}>A<br/>g</span>;
  }
  if (isLetterSpacing) {
    return <span className="preview-letter-spacing" style={{ letterSpacing: value }}>ABC</span>;
  }
  if (isFont) {
    const style = name.includes('weight')
      ? { fontWeight: value as unknown as number }
      : { fontFamily: value };
    return <span className="preview-font" style={style}>Ag</span>;
  }
  if (isSpacing || isContainer) {
    return <span className="preview-bar" style={{ width: `min(${value}, 100%)` }} />;
  }
  if (isTransition) {
    return <span className="preview-pill">transition</span>;
  }
  if (isZ || isNumeric) {
    return <span className="preview-pill">{value}</span>;
  }
  if (isSize) {
    return <span className="preview-bar" style={{ width: `min(${value}, 100%)` }} />;
  }
  return <span className="preview-pill">{value}</span>;
}

function TokenTable({ tokens }: { tokens: TokenRow[] }) {
  return (
    <div className="token-rows">
      {tokens.map((t) => (
        <div className="token-row" key={t.name}>
          <span className="token-preview-cell">
            <Preview name={t.name} value={t.value} />
          </span>
          <span className="token-name">{t.name}</span>
          <span className="token-value">{t.value}</span>
        </div>
      ))}
    </div>
  );
}

function TokenReference() {
  const groups = getTokenRows();
  const order = [
    'color-bg', 'color-surface', 'color-text', 'color-brand',
    'color-border', 'color-interactive', 'color-semantic', 'color-overlay',
    'spacing', 'font', 'radius', 'border', 'shadow', 'container',
    'focus', 'transition', 'z',
  ];
  const sorted = order.filter((g) => groups[g]);
  const remaining = Object.keys(groups).filter((g) => !order.includes(g));

  return (
    <div className="token-reference">
      {[...sorted, ...remaining].map((group) => (
        <div key={group} className="token-group">
          <h3>{group}</h3>
          <TokenTable tokens={groups[group]} />
        </div>
      ))}
    </div>
  );
}

export default function FontSampler() {
  return (
    <div className="sampler">
      <h1>Weedlog Design Reference</h1>

      <h2>Design Tokens</h2>
      <TokenReference />
    </div>
  );
}
