import { useState } from 'react';
import LoveQuestionPage from './pages/LoveQuestionPage';
import LoveMessagePage from './pages/LoveMessagePage';
import './styles/App.css';

function App() {
  const [isAccepted, setIsAccepted] = useState(false);

  return (
    <div className="app-shell">
      {isAccepted ? (
        <LoveMessagePage onRestart={() => setIsAccepted(false)} />
      ) : (
        <LoveQuestionPage onAccept={() => setIsAccepted(true)} />
      )}
    </div>
  );
}

export default App;
