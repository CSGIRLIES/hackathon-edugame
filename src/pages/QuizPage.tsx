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

  // Mock question generation based on topic
  const generateQuestions = (topic: string): Question[] => {
    return [
      {
        question: `What is a key concept in ${topic}?`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correct: 0,
      },
      {
        question: `How does ${topic} work?`,
        options: ['Explain 1', 'Explain 2', 'Explain 3', 'Explain 4'],
        correct: 1,
      },
      {
        question: `Why is ${topic} important?`,
        options: ['Reason 1', 'Reason 2', 'Reason 3', 'Reason 4'],
        correct: 2,
      },
    ];
  };

  const handleStartQuiz = () => {
    if (topic) {
      setQuestions(generateQuestions(topic));
      setStarted(true);
    }
  };

  const handleAnswer = (index: number) => {
    if (index === questions[currentQuestion].correct) {
      setScore(score + 20);
    }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Finish quiz
      updateXP(score); // Assuming score is total XP
      alert(`Quiz finished! You earned ${score} XP.`);
      navigate('/dashboard');
    }
  };

  if (!started) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h1>Quiz Time!</h1>
        <p>What do you want to learn today?</p>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter topic or describe your course"
          required
        />
        <button onClick={handleStartQuiz} disabled={!topic}>
          Start Quiz
        </button>
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h2>Question {currentQuestion + 1} of {questions.length}</h2>
      <p>{questions[currentQuestion].question}</p>
      {questions[currentQuestion].options.map((option, index) => (
        <div key={index}>
          <button onClick={() => handleAnswer(index)}>{option}</button>
        </div>
      ))}
      <p>Score: {score}</p>
    </div>
  );
};

export default QuizPage;
