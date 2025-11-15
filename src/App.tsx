import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage.tsx';
import OnboardingPage from './pages/OnboardingPage.tsx';
import DashboardPage from './pages/DashboardPage.tsx';
import QuizPage from './pages/QuizPage.tsx';
import LearningPage from './pages/LearningPage.tsx';
import LanguageSelector from './components/LanguageSelector.tsx';

function App() {
  return (
    <div className="App">
      <LanguageSelector />
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
