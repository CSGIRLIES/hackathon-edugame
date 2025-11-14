import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext.tsx';
import Animal from '../components/Animal.tsx';

const LearningPage: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [usePomodoro, setUsePomodoro] = useState(true);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isWorking, setIsWorking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const { user, updateXP } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    let timer: number;
    if (isWorking && !isPaused && timeLeft > 0) {
      timer = window.setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (isWorking && timeLeft === 0) {
      const xpGained = 25; // 25 minutes = 25 XP
      updateXP(xpGained);
      alert(`Bravo ! Tu as terminé un focus de 25 min. ${xpGained} XP pour ${user.animalName} ✨`);
      navigate('/quiz');
    }
    return () => window.clearTimeout(timer);
  }, [timeLeft, isWorking, isPaused, updateXP, navigate, user]);

  const handleStart = () => {
    if (topic.trim()) {
      setIsWorking(true);
      setIsPaused(false);
      setTimeLeft(25 * 60);
      alert(
        `Plan d'apprentissage pour ${topic}:\n1. Relire le cours calmement\n2. Faire 2-3 exercices\n3. Noter ce que tu dois revoir au prochain cycle`
      );
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!user) {
    navigate('/');
    return null;
  }

  const progress = (1 - timeLeft / (25 * 60)) * 100;

  return (
    <div className="page">
      <header className="page-header">
        <h1 className="page-title">Session d'apprentissage</h1>
        <p className="page-subtitle">
          On se concentre ensemble pendant 25 minutes, puis ton compagnon te propose un quiz pour vérifier que tout est bien assimilé.
        </p>
      </header>

      <main className="layout-grid">
        <section className="card learning-card">
          <div className="card-header">
            <h2 className="card-title">Prépare ta session</h2>
            <p className="card-subtitle">
              Décris ce que tu vas réviser. Le quiz de fin utilisera ce contexte.
            </p>
          </div>

          {!isWorking && (
            <>
              <div className="input-group">
                <label className="input-label" htmlFor="topic">
                  Ton cours / chapitre
                </label>
                <textarea
                  id="topic"
                  className="textarea"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Ex : Chapitre sur les fonctions affines, ou copier un extrait de ton cours"
                  required
                />
              </div>

              <div className="input-group">
                <label className="input-label">Mode</label>
                <label className="helper-text">
                  <input
                    type="checkbox"
                    checked={usePomodoro}
                    onChange={() => setUsePomodoro(!usePomodoro)}
                    style={{ marginRight: 8 }}
                  />
                  Utiliser le mode pomodoro (25 min focus / 5 min pause)
                </label>
              </div>

              <div className="btn-row" style={{ marginTop: '1.25rem' }}>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleStart}
                  disabled={!topic.trim()}
                >
                  Lancer la session
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => navigate('/dashboard')}
                >
                  Retour au tableau de bord
                </button>
              </div>
            </>
          )}

          {isWorking && (
            <>
              <div className="card-header" style={{ marginBottom: '1rem' }}>
                <h2 className="card-title">En plein focus sur : {topic}</h2>
                <p className="card-subtitle">
                  Quand le temps est écoulé, tu passes automatiquement sur un quiz.
                </p>
              </div>

              <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
                <div className="timer-display">{formatTime(timeLeft)}</div>
                <div className="progress-track" style={{ marginTop: '0.75rem' }}>
                  <div className="progress-bar" style={{ width: `${progress}%` }} />
                </div>
              </div>

              <div className="btn-row">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsPaused((p) => !p)}
                >
                  {isPaused ? 'Reprendre' : 'Mettre en pause'}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setIsWorking(false);
                    setIsPaused(false);
                    setTimeLeft(25 * 60);
                  }}
                >
                  Terminer sans quiz
                </button>
              </div>
            </>
          )}
        </section>

        <section className="card">
          <div className="card-header">
            <h2 className="card-title">Ton compagnon te regarde travailler</h2>
            <p className="card-subtitle">
              {user.animalName} observe ta progression et t'encourage pendant toute la session.
            </p>
          </div>

          <Animal
            type={user.animalType}
            color={user.animalColor}
            level={user.level}
            xp={user.xp}
            context={isWorking ? 'learning' : 'break'}
          />
        </section>
      </main>
    </div>
  );
};

export default LearningPage;
