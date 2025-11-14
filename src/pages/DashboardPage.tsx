import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import Animal from '../components/Animal';

const DashboardPage: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  if (!user) {
    navigate('/');
    return null;
  }

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Welcome, {user.name}!</h1>
      <p>Your companion: {user.animalName}</p>
      <Animal type={user.animalType} color={user.animalColor} level={user.level} />
      <p>XP: {user.xp}</p>
      <p>Level: {user.level}</p>
      <div>
        <button onClick={() => navigate('/quiz')}>
          Take Quiz
        </button>
        <button onClick={() => navigate('/learning')}>
          Start Learning
        </button>
        <button>
          Pomodoro (In Learning)
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;
