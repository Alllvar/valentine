import { useMemo } from 'react';
import '../styles/FloatingHearts.css';

const randomBetween = (min, max) => Math.random() * (max - min) + min;

function FloatingHearts({ count = 20 }) {
  const hearts = useMemo(
    () =>
      Array.from({ length: count }, (_, id) => ({
        id,
        left: randomBetween(0, 100),
        size: randomBetween(14, 34),
        duration: randomBetween(8, 18),
        delay: randomBetween(0, 12),
        drift: randomBetween(-30, 30),
        opacity: randomBetween(0.28, 0.85),
      })),
    [count]
  );

  return (
    <div className="floating-hearts" aria-hidden="true">
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="floating-heart"
          style={{
            left: `${heart.left}%`,
            '--size': `${heart.size}px`,
            '--duration': `${heart.duration}s`,
            '--delay': `${heart.delay}s`,
            '--drift': `${heart.drift}px`,
            '--opacity': heart.opacity,
          }}
        >
          ❤
        </span>
      ))}
    </div>
  );
}

export default FloatingHearts;
