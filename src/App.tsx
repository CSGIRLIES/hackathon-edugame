import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import OnboardingPage from './pages/OnboardingPage';
import DashboardPage from './pages/DashboardPage';
import QuizPage from './pages/QuizPage';
import LearningPage from './pages/LearningPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/learning" element={<LearningPage />} />
      </Routes>
    </div>
  );
}

export default App;
