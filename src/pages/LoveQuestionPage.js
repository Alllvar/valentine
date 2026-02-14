import { useState } from 'react';
import EscapeButton from '../components/EscapeButton';
import FloatingHearts from '../components/FloatingHearts';
import '../styles/LoveQuestionPage.css';

function LoveQuestionPage({ onAccept }) {
  const [teaseText, setTeaseText] = useState('Натисни "Так" і зроби цей день особливим ❤️');

  return (
    <section className="love-question-page">
      <FloatingHearts count={22} />

      <main className="question-card">
        <p className="question-kicker">14 лютого</p>
        <h1 className="question-title">Міла, кохана моя, чи будеш ти моєю валентинкою?</h1>
        <p className="question-subtitle">
          Обіцяю багато обнімашок, романтІк та теплих моментів тільки для нас двох
        </p>

        <button type="button" className="yes-button" onClick={onAccept}>
          ❤️ Так
        </button>

        <p className="tease-text" aria-live="polite">
          {teaseText}
        </p>
      </main>

      <EscapeButton onMessageChange={setTeaseText} />
    </section>
  );
}

export default LoveQuestionPage;
