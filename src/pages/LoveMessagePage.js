import { useEffect, useState } from 'react';
import FloatingHearts from '../components/FloatingHearts';
import '../styles/LoveMessagePage.css';

const surpriseMessages = [
  'Ти моя найкраща пригода, яку я хочу проживати щодня',
  'Дякую, що робиш мій світ теплішим і яскравішим',
  'Тільки поруч з тобою я можу бути собою',
  'Твоє "так" сьогодні - мій улюблений звук',
  'Моє серце - твоє',
  'Очі сині - душа стине',
  'Кожна мить з тобою - маленьке свято любові',
  'Я закохуюся в тебе знову і знову',
  'Обожнюю твої сніданки',
  'Ти мій спокій і водночас моє найбільше щастя',
  'Поруч з тобою навіть звичайні дні стають особливими',
  'Ти моя найтепліша думка перед сном',
  'Хочу тримати тебе за руку ще дуже багато років',
  'Ти моя самка. І крапка.',
  'Мені подобається наше "ми"',
  'Твоя усмішка - мій улюблений антистрес',
  'З тобою я відчуваю себе вдома',
  'Ти робиш мене кращим',
  'Люблю тебе тихо, голосно і між рядками',
  'Навіть мовчати з тобою - кайф',
  'Ти моє натхнення щодня',
  'Я вдячний долі за тебе',
  'Хочу зустрічати з тобою всі світанки',
  'Ти моя найсолодша булочка',
  'Я тебе люблю навіть коли ти крадеш мою ковдру',
  'Ти офіційно мій улюблений краш',
  'Я б поділився з тобою навіть останнім шматочком піци… майже',
  'Ти мій персональний генератор щастя',
  'Якщо любити тебе - це робота(без зарплати), я готовий працювати без вихідних',
  'Ти моя залежність, і я не хочу лікуватися',
  'З тобою я готовий дивитися навіть те, що ти вибереш',
  'Я тебе люблю більше, ніж поспати… а це серйозно',
  'Ти мій улюблений спойлер хорошого настрою',
  'Поруч з тобою мій внутрішній дорослий бере відпустку',
  'Ти + Я = дуже класна команда',
  'Я готовий терпіти твої серіали, бо люблю тебе',
  'Ти мій головний баг, який я не хочу фіксити',
  'З тобою навіть понеділок не такий страшний',
  'Ти моя найкраща інвестиція в щастя',
  'Я планую любити тебе довше, ніж працює моя батарея',
  'Я буду поруч. Навіть коли ти бурчиш',
  'Ти вкрала моє серце. Повертати не треба',
  'Ти моя особиста катастрофа, без якої я не хочу жити',

];
const confettiHues = [342, 354, 8, 22, 38];

const randomBetween = (min, max) => Math.random() * (max - min) + min;

const createConfetti = (count = 44) =>
  Array.from({ length: count }, (_, id) => ({
    id,
    left: `${randomBetween(0, 100)}%`,
    hue: Math.round(confettiHues[id % confettiHues.length] + randomBetween(-7, 7)),
    duration: `${randomBetween(1.4, 2.9)}s`,
    delay: `${randomBetween(0, 0.35)}s`,
    xShift: `${randomBetween(-80, 80)}px`,
    spin: `${randomBetween(-240, 240)}deg`,
  }));

const formatElapsedTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours} год ${minutes.toString().padStart(2, '0')} хв ${secs
      .toString()
      .padStart(2, '0')} с`;
  }

  if (minutes > 0) {
    return `${minutes} хв ${secs.toString().padStart(2, '0')} с`;
  }

  return `${secs} с`;
};

function LoveMessagePage({ onRestart }) {
  const [secondsTogether, setSecondsTogether] = useState(0);
  const [isSurpriseVisible, setIsSurpriseVisible] = useState(false);
  const [surpriseId, setSurpriseId] = useState(0);
  const [surpriseText, setSurpriseText] = useState(surpriseMessages[0]);
  const [confetti, setConfetti] = useState(() => createConfetti(44));

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSecondsTogether((current) => current + 1);
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const handleSurprise = () => {
    const randomMessage = surpriseMessages[Math.floor(Math.random() * surpriseMessages.length)];

    setSurpriseText(randomMessage);
    setIsSurpriseVisible(true);
    setConfetti(createConfetti(44));
    setSurpriseId((current) => current + 1);
  };

  return (
    <section className="love-message-page">
      <FloatingHearts count={28} />

      <main className="message-card">
        <p className="message-kicker">Ти сказала "Так"</p>
        <h2 className="message-title">З Днем святого Валентина, моє кохання ❤️</h2>
        <p className="message-text">
          Нехай кожен день (не тільки 14 лютого) поруч буде наповнений турботою, ніжністю та щирими посмішками
        </p>

        <p className="love-counter">
          Наш романтичний відлік триває: <strong>{formatElapsedTime(secondsTogether)}</strong>
        </p>

        <div className="message-actions">
          <button type="button" className="surprise-button" onClick={handleSurprise}>
            Натисни для сюрпризу
          </button>
          <button type="button" className="restart-button" onClick={onRestart}>
            Ще раз
          </button>
        </div>

        {isSurpriseVisible ? (
          <div className="surprise-box" key={surpriseId}>
            <p className="surprise-text">{surpriseText}</p>

            <div className="confetti-layer" aria-hidden="true">
              {confetti.map((piece) => (
                <span
                  key={piece.id}
                  className="confetti-piece"
                  style={{
                    left: piece.left,
                    '--hue': piece.hue,
                    '--duration': piece.duration,
                    '--delay': piece.delay,
                    '--x-shift': piece.xShift,
                    '--spin': piece.spin,
                  }}
                />
              ))}
            </div>
          </div>
        ) : null}
      </main>
    </section>
  );
}

export default LoveMessagePage;
