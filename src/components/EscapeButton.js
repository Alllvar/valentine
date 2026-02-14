import { useCallback, useEffect, useRef, useState } from 'react';
import '../styles/EscapeButton.css';

const defaultMessages = [
  'Точно ні?',
  'Подумай ще трішки',
  'Я буду сумувати...',
  'Може все ж таки так?',
  'Серце підказує інше ❤️',
];

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

function EscapeButton({ onMessageChange, messages = defaultMessages }) {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isReady, setIsReady] = useState(false);

  const placeInViewport = useCallback((xRatio, yRatio) => {
    const button = buttonRef.current;

    if (!button) {
      return;
    }

    const marginX = 16;
    const marginTop = 90;
    const marginBottom = 16;
    const bounds = button.getBoundingClientRect();

    const maxX = window.innerWidth - bounds.width - marginX;
    const maxY = window.innerHeight - bounds.height - marginBottom;

    const x = clamp(window.innerWidth * xRatio, marginX, maxX);
    const y = clamp(window.innerHeight * yRatio, marginTop, maxY);

    setPosition({ x, y });
    setIsReady(true);
  }, []);

  const runAway = useCallback(() => {
    const button = buttonRef.current;

    if (!button) {
      return;
    }

    const marginX = 16;
    const marginTop = 90;
    const marginBottom = 16;
    const bounds = button.getBoundingClientRect();

    const maxX = Math.max(marginX, window.innerWidth - bounds.width - marginX);
    const maxY = Math.max(marginTop, window.innerHeight - bounds.height - marginBottom);

    setPosition({
      x: randomInt(marginX, maxX),
      y: randomInt(marginTop, maxY),
    });

    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    onMessageChange?.(randomMessage);
  }, [messages, onMessageChange]);

  useEffect(() => {
    placeInViewport(0.65, 0.62);

    const handleResize = () => {
      placeInViewport(0.65, 0.62);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [placeInViewport]);

  return (
    <button
      ref={buttonRef}
      type="button"
      className={`escape-button ${isReady ? 'is-ready' : ''}`}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      onMouseEnter={runAway}
      onFocus={runAway}
      onTouchStart={runAway}
      onClick={runAway}
    >
      Ні
    </button>
  );
}

export default EscapeButton;
