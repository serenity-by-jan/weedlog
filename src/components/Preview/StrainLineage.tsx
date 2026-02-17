import './StrainLineage.css';
import { mockStrains } from './mockData';

export default function StrainLineageDemo() {
  return (
    <div className="pv-lin-demo">
      {mockStrains.filter((s) => s.parents).map((s) => (
        <div key={s.id} className="pv-lin-tree">
          <div className="pv-lin-parents">
            {s.parents!.map((parent, i) => (
              <div key={i} className="pv-lin-node pv-lin-node--parent">
                <span className="pv-lin-node-name">{parent}</span>
              </div>
            ))}
          </div>

          <div className="pv-lin-connector" aria-hidden="true">
            <svg viewBox="0 0 200 40" className="pv-lin-svg">
              <line x1="50" y1="0" x2="50" y2="20" className="pv-lin-line" />
              <line x1="150" y1="0" x2="150" y2="20" className="pv-lin-line" />
              <line x1="50" y1="20" x2="150" y2="20" className="pv-lin-line" />
              <line x1="100" y1="20" x2="100" y2="40" className="pv-lin-line" />
            </svg>
          </div>

          <div className="pv-lin-node pv-lin-node--child">
            <span className="pv-lin-node-name">{s.name}</span>
            <span className="pv-lin-node-type">{s.type}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
