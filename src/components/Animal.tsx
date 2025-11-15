import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface AnimalProps {
  type: string;
  color: string;
  level: 'baby' | 'adolescent' | 'adult' | string;
  xp?: number;
  context?: 'dashboard' | 'learning' | 'break' | 'quiz';
}

const Animal: React.FC<AnimalProps> = ({ type, color, level, xp = 0, context = 'dashboard' }) => {
  const { t } = useTranslation();
  const [messageIndex, setMessageIndex] = useState(0);

  const messages = useMemo(() => {
    switch (context) {
      case 'learning':
        return t('animal.contextLearning', { returnObjects: true }) as string[];
      case 'break':
        return t('animal.contextBreak', { returnObjects: true }) as string[];
      case 'quiz':
        return t('animal.contextQuiz', { returnObjects: true }) as string[];
      case 'dashboard':
      default:
        return t('animal.contextDashboard', { returnObjects: true }) as string[];
    }
  }, [context, t]);

  useEffect(() => {
    // cycle messages every 12 seconds like a soft talking pet
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 12000);
    return () => clearInterval(interval);
  }, [messages.length]);

  useEffect(() => {
    // reset when context changes
    setMessageIndex(0);
  }, [context]);

  const emoji = useMemo(() => {
    if (type === 'cat') return '🐱';
    if (type === 'dragon') return '🐉';
    if (type === 'otter') return '🦦';
    if (type === 'penguin') return '🐧';
    return '✨';
  }, [type]);

  const orbLevelClass =
    level === 'baby'
      ? 'animal-orb animal-orb--baby animal-orb-glow-baby'
      : level === 'adolescent'
      ? 'animal-orb animal-orb--adolescent animal-orb-glow-adolescent'
      : 'animal-orb animal-orb--adult animal-orb-glow-adult';

  const currentMessage = messages[messageIndex];

  const xpHint = xp < 20 ? "On est encore bébé, on prend nos marques." : xp < 60 ? "On grandit bien, continue comme ça !" : "Wow, niveau adulte ! On devient une légende.";

  const orbStyle: React.CSSProperties = {
    background: `radial-gradient(circle at 30% 20%, rgba(255,255,255,0.8), transparent 55%),
      radial-gradient(circle at 80% 90%, ${color}, transparent 55%),
      rgba(15, 23, 42, 0.98)` as string,
  };

  return (
    <div className="animal-container">
      <div className="animal-name">Compagnon • {level}</div>
      <div className="animal-orb-wrapper">
        <div className={orbLevelClass} style={orbStyle}>
          <span className="animal-face-bounce" aria-label={type} role="img">
            {emoji}
          </span>
        </div>
        <div className="animal-message">
          <div className="animal-message-label">Message de ton compagnon</div>
          <div className="animal-message-text">
            <div>{currentMessage}</div>
            <div style={{ marginTop: '0.35rem', fontSize: '0.75rem', opacity: 0.75 }}>{xpHint}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Animal;
