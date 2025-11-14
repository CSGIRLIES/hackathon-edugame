import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext.tsx';

const LearningPage: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [usePomodoro, setUsePomodoro] = useState(true);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isWorking, setIsWorking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const { updateXP } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    let timer: number;
    if (isWorking && !isPaused && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0) {
      // After work time, give XP and quiz
      const xpGained = 25; // 25 minutes = 25 XP
      updateXP(xpGained);
      // Quiz would happen here, but for now navigate to quiz
      navigate('/quiz'); // Pass topic somehow
    }
    return () => clearTimeout(timer);
  }, [timeLeft, isWorking, isPaused, updateXP, navigate]);

  const handleStart = () => {
    if (topic.trim()) {
      setIsWorking(true);
      setIsPaused(false);
      // Suggest plan: mock
      alert(`Learning plan for ${topic}: Step 1: Read. Step 2: Practice. Step 3: Review.`);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Learning Session</h1>
      {!isWorking && (
        <>
          <p>Describe your course/subject:</p>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter topic or course context"
            required
          />
          <div>
            <label>
              <input
                type="checkbox"
                checked={usePomodoro}
                onChange={() => setUsePomodoro(!usePomodoro)}
              />
              Use Pomodoro (25min work, 5min pause)
            </label>
          </div>
          <button onClick={handleStart}>Start Learning</button>
        </>
      )}
      {isWorking && (
        <>
          <h2>Working on: {topic}</h2>
          <p>Time left: {formatTime(timeLeft)}</p>
          <button onClick={() => setIsPaused(!isPaused)}>
            {isPaused ? 'Resume' : 'Pause'}
          </button>
          <button onClick={() => navigate('/dashboard')}>End Session</button>
        </>
      )}
    </div>
  );
};

export default LearningPage;
