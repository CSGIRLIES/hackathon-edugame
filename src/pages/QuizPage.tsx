import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext.tsx';

interface Question {
  question: string;
  options: string[];
  correct: number;
}

const QuizPage: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [started, setStarted] = useState(false);
  const { updateXP } = useUser();
  const navigate = useNavigate();

  const generateQuestions = (topicText: string): Question[] => {
    return [
      {
        question: `Quel est l'objectif principal de ${topicText} ?`,
        options: ['Comprendre', 'Mémoriser', 'Réciter', 'Copier'],
        correct: 0,
      },
      {
        question: `Dans ${topicText}, qu'est-ce qui t'embête le plus ?`,
        options: ['Les définitions', 'Les exercices', 'Les exemples', 'Rien du tout'],
        correct: 1,
      },
      {
        question: `Comment pourrais-tu vérifier que tu as bien compris ${topicText} ?`,
        options: ["Expliquer à quelqu'un", 'Relire en boucle', 'Tout surligner', 'Abandonner'],
        correct: 0,
      },
    ];
  };

  const handleStartQuiz = () => {
    if (topic.trim()) {
      setQuestions(generateQuestions(topic.trim()));
      setStarted(true);
      setScore(0);
      setCurrentQuestion(0);
    }
  };

  const handleAnswer = (index: number) => {
    const isCorrect = index === questions[currentQuestion].correct;
    if (isCorrect) {
      setScore((prev) => prev + 20);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      const finalScore = isCorrect ? score + 20 : score;
      updateXP(finalScore);
      alert(`Quiz terminé ! Tu as gagné ${finalScore} XP pour ton compagnon ✨`);
      navigate('/dashboard');
    }
  };

  if (!started) {
    return (
      <div className="page">
        <header className="page-header">
          <h1 className="page-title">Mini quiz de révision ✨</h1>
          <p className="page-subtitle">
            Décris ton cours ou ton sujet. Ton compagnon génère des questions pour vérifier si tu as bien compris.
          </p>
        </header>

        <main>
          <section className="card quiz-card">
            <div className="card-header">
              <h2 className="card-title">De quoi veux-tu parler aujourd'hui ?</h2>
              <p className="card-subtitle">
                Tu peux écrire un chapitre, un thème ("fractions", "révolution française"...) ou copier un bout de ton cours.
              </p>
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="topic">
                Ton sujet
              </label>
              <textarea
                id="topic"
                className="textarea"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Ex : Les équations du 1er degré, ou copier/colle un paragraphe de ton cours"
                required
              />
            </div>

            <div className="btn-row" style={{ marginTop: '1.25rem' }}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleStartQuiz}
                disabled={!topic.trim()}
              >
                Générer des questions
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate('/dashboard')}
              >
                Retour au tableau de bord
              </button>
            </div>
          </section>
        </main>
      </div>
    );
  }

  const current = questions[currentQuestion];

  return (
    <div className="page">
      <header className="page-header">
        <h1 className="page-title">Quiz sur : {topic}</h1>
        <p className="page-subtitle">
          Réponds aux questions pour prouver à ton compagnon que tu as bien travaillé.
        </p>
      </header>

      <main>
        <section className="card quiz-card">
          <div className="card-header">
            <h2 className="card-title">
              Question {currentQuestion + 1} / {questions.length}
            </h2>
            <p className="card-subtitle">Score actuel : {score} XP potentiels</p>
          </div>

          <p>{current.question}</p>

          <div className="quiz-options">
            {current.options.map((option, index) => (
              <button
                key={index}
                type="button"
                className="btn quiz-option-btn"
                onClick={() => handleAnswer(index)}
              >
                {option}
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default QuizPage;
