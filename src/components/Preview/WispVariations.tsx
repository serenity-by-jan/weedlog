import './WispVariations.css';

export default function WispVariationsDemo() {
  return (
    <div className="pv-wv-container">
      <div className="pv-wv-grid">
        <div className="pv-wv-variation">
          <div className="pv-wv-demo pv-wv-organic-cloud-demo">
            <div className="pv-wv-wisps" aria-hidden="true">
              {Array.from({ length: 53 }).map((_, i) => (
                <span key={i} className="pv-wv-wisp" />
              ))}
            </div>
          </div>
          <h4 className="pv-wv-title">Organic Cloud</h4>
          <p className="pv-wv-desc">
            53 wisps, 12–24px wide, 24–64px tall, blur 2.5px, extended fade.
          </p>
        </div>
      </div>
    </div>
  );
}
