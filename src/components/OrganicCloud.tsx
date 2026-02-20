import './OrganicCloud.css';

interface OrganicCloudProps {
  /** Number of wisps to render */
  count?: number;
  /** 'light' = brand green + gray (on light backgrounds)
   *  'dark'  = white + light-gray (on dark/inverse backgrounds) */
  mode?: 'light' | 'dark';
  /** 'sm' = for toasts, buttons (8px base width)
   *  'md' = for cards, demo boxes (12px base width) */
  size?: 'sm' | 'md';
  /** 'hover' = wisps appear on .pressable:hover (for interactive elements)
   *  'always' = wisps always animate (for transient UI like toasts) */
  trigger?: 'hover' | 'always';
}

function spreadWisps(count: number): Array<{ left: string; delay: string }> {
  const result: Array<{ left: string; delay: string }> = [];
  for (let i = 0; i < count; i++) {
    const baseLeft = (i / count) * 90 + 5;
    const jitter = (((i * 7 + 13) % 11) - 5) * 1.2;
    const left = Math.max(2, Math.min(97, baseLeft + jitter));
    const delay = ((i * 17 + 3) % count) * (400 / count);
    result.push({
      left: `${left.toFixed(1)}%`,
      delay: `${Math.round(delay)}ms`,
    });
  }
  return result;
}

export default function OrganicCloud({
  count = 20,
  mode = 'light',
  size = 'md',
  trigger = 'hover',
}: OrganicCloudProps) {
  const wisps = spreadWisps(count);

  const containerClass = [
    'organic-cloud',
    `organic-cloud--${size}`,
    trigger === 'always' ? 'organic-cloud--always' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClass} aria-hidden="true">
      {wisps.map((w, i) => {
        const colorClass =
          mode === 'dark'
            ? i % 3 === 1
              ? 'organic-cloud-wisp--light-gray'
              : 'organic-cloud-wisp--white'
            : i % 2 === 0
              ? 'organic-cloud-wisp--green'
              : 'organic-cloud-wisp--gray';

        const animClass = `organic-cloud-wisp--anim-${(i % 5) + 1}`;

        return (
          <span
            key={i}
            className={`organic-cloud-wisp ${colorClass} ${animClass}`}
            style={{ left: w.left, animationDelay: w.delay }}
          />
        );
      })}
    </div>
  );
}
