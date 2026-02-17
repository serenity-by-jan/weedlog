import './WispVariations.css';

export default function WispVariationsDemo() {
  return (
    <div className="pv-wv-container">
      <div className="pv-wv-intro">
        <p>
          <strong>Organic Cloud Effect:</strong> The official Weedlog wisp animation. Organic, soft smoke-like wisps
          drift upward with gradient opacity fade (100% at top → 0% at bottom of each wisp). Blur edges soften the
          appearance. Wisps travel full section height, reaching 0 opacity at 80% ascent. Mix of brand green and gray
          with varied widths, heights, and animation speeds create a natural, organic smoke cloud effect.
        </p>
      </div>

      <div className="pv-wv-grid">
        <div className="pv-wv-variation">
          <div className="pv-wv-demo pv-wv-organic-cloud-demo">
            <div className="pv-wv-wisps" aria-hidden="true">
              {Array.from({ length: 23 }).map((_, i) => (
                <span key={i} className="pv-wv-wisp" />
              ))}
            </div>
          </div>
          <h4 className="pv-wv-title">Organic Cloud (Official)</h4>
          <p className="pv-wv-desc">
            The definitive Weedlog wisp effect. 23 wisps with varied widths (1.1x–1.6x), heights (spacing-2 to spacing-6),
            soft blur edges (0.8px), gradient opacity per wisp, and slower animation (2.2s–4.3s). Perfect for temporary
            UI elements, buttons, and interactive components.
          </p>
        </div>
      </div>

      <div className="pv-wv-notes">
        <h3>Organic Cloud Characteristics</h3>
        <ul>
          <li><strong>Wisps:</strong> 23 per element for dense, organic cloud</li>
          <li><strong>Thickness:</strong> 1.1x–1.6x base width (thicker, more prominent)</li>
          <li><strong>Heights:</strong> Varied (spacing-2 to spacing-6) for natural dispersion</li>
          <li><strong>Blur:</strong> 0.8px soft filter blur for atmospheric appearance</li>
          <li><strong>Gradient:</strong> Each wisp gradients from 100% opacity at top to 0% at bottom (50% midpoint)</li>
          <li><strong>Animation:</strong> Durations 2.2s–4.3s, slower rise for contemplative effect</li>
          <li><strong>Colors:</strong> Brand green + gray with flexible theming</li>
          <li><strong>Reusable:</strong> Available as <code>OrganicCloud.css</code> for application across the app</li>
        </ul>
      </div>
    </div>
  );
}
