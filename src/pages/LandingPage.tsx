import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Animal from '../components/Animal.tsx';

const LandingPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleGetStarted = () => {
    navigate('/auth');
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode');
  };

  return (
    <div className={`landing-page ${isDarkMode ? 'dark-mode' : ''}`}>
      {/* Header */}
      <div className="landing-header">
        <img
          className="landing-logo"
          src={`/pawfriend_${isDarkMode ? 'night' : 'day'}.png`}
          alt="Pawfriend Logo"
          style={{ height: '2.5rem', width: 'auto' }}
        />
        <button
          type="button"
          onClick={toggleDarkMode}
          className="landing-btn landing-btn-secondary"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </div>

      {/* Main Content */}
      <main className="landing-main">
        <section className="landing-hero">
          <div className="landing-hero-text">
            <h1 className="landing-hero-title">Adopt your cozy study buddy</h1>
            <p className="landing-hero-subtitle">
              A magical fox or a cute puppy that grows with your XP and streaks, turning
              revisions into a kawaii adventure.
            </p>
            <div className="landing-hero-actions">
              <button
                type="button"
                onClick={handleGetStarted}
                className="landing-btn landing-btn-primary"
              >
                🌟 Get Started 🌟
              </button>
              <button
                type="button"
                className="landing-btn landing-btn-secondary"
              >
                Learn More →
              </button>
            </div>
          </div>

          <div className="landing-animal-wrapper">
            <div className="landing-animal-card">
              <Animal type="af" color="#ffb3d9" level="baby" context="dashboard" />
              <div className="landing-floating-icon landing-floating-icon--top-right">💖</div>
              <div className="landing-floating-icon landing-floating-icon--bottom-left">✨</div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="landing-features">
          <h2 className="landing-section-title">Why Choose Pawfriend?</h2>
          <div className="landing-features-grid">
            <div className="landing-feature-card">
              <h3>🍃 Personalized Learning</h3>
              <p>AI-powered quizzes and study guides tailored just for you.</p>
            </div>
            <div className="landing-feature-card">
              <h3>🐾 Adorable Companions</h3>
              <p>Watch your virtual pet grow and evolve with your progress.</p>
            </div>
            <div className="landing-feature-card">
              <h3>🌈 Gamified Experience</h3>
              <p>Earn XP, streaks, and rewards while making learning fun.</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="landing-cta">
          <h2>Ready to Start Your Learning Adventure?</h2>
          <p>Join thousands of students who've made studying fun and rewarding.</p>
          <button
            type="button"
            onClick={handleGetStarted}
            className="landing-btn landing-btn-primary"
          >
            Join Now - It's Free! 🎉
          </button>
        </section>
      </main>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="landing-footer-icons">
          <span>🌟</span>
          <span>📚</span>
          <span>🐶</span>
          <span>🦊</span>
        </div>
        <p className="landing-footer-text">© 2024 Pawfriend - Making Learning Magical</p>
      </footer>
    </div>
  );
};

export default LandingPage;
