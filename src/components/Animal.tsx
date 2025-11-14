import React, { useEffect, useMemo, useState } from 'react';

interface AnimalProps {
  type: string;
  color: string;
  level: 'baby' | 'adolescent' | 'adult' | string;
  xp?: number;
  context?: 'dashboard' | 'learning' | 'break' | 'quiz';
}

const dashboardMessages = [
  "Je suis prêt·e à apprendre avec toi ✨",
  "On continue notre aventure magique aujourd'hui ?",
  "Chaque petite session = un pas vers ton super pouvoir préféré.",
  "Si tu veux, on se fait un mini-quiz après ta révision !",
];

const learningMessages = [
  "Chut… mode focus activé. On va tout déchirer 💫",
  "Je retiens le cours avec toi, tu n'es pas seul·e !",
  "Pense à respirer, relire, et surligner l'essentiel.",
  "Ton cerveau est en train de se muscler très fort là 🧠✨",
];

const breakMessages = [
  "Stretch break ! Étire les bras, roule les épaules 🌈",
  "Mini danse ? Mini marche ? On bouge un peu le corps !",
  "Bois un verre d'eau et reviens, je t'attends 💧",
];

const quizMessages = [
  "Ne panique pas, on réfléchit ensemble 🧩",
  "Lis bien chaque proposition, tu gères.",
  "Même si tu te trompes, on apprend quelque chose.",
  "Let’s go, montre-moi ce que tu sais déjà !",
];

function pickMessages(context?: AnimalProps['context']) {
  switch (context) {
    case 'learning':
      return learningMessages;
    case 'break':
      return breakMessages;
    case 'quiz':
      return quizMessages;
    case 'dashboard':
    default:
      return dashboardMessages;
  }
}

const Animal: React.FC<AnimalProps> = ({ type, color, level, xp = 0, context = 'dashboard' }) => {
  const [messageIndex, setMessageIndex] = useState(0);

  const messages = useMemo(() => pickMessages(context), [context]);

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
