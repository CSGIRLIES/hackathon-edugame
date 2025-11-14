import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock authentication
    if (isLogin) {
      // Simulate login
      const mockUser = {
        id: '1',
        name: 'User',
        animalType: 'cat',
        animalName: 'Fluffy',
        animalColor: 'blue',
        xp: 10,
        level: 'baby' as const,
      };
      setUser(mockUser);
      navigate('/dashboard');
    } else {
      // First signup, go to onboarding
      navigate('/onboarding');
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>CSGIRLIES - Educational App</h1>
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Need to sign up?' : 'Already have an account?'}
      </button>
    </div>
  );
};

export default AuthPage;
