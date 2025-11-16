import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Animal from '../components/Animal.tsx';

const LandingPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/auth');
  };

  const handleScrollToFeatures = () => {
    document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="landing-page">
      {/* Header */}
      <header className="landing-header">
        <div className="landing-logo">✨ Paw ✨</div>
        <nav>
              <button
                onClick={handleGetStarted}
                className="landing-btn landing-btn-primary"
              >
                � Start Your Adventure �
              </button>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="landing-main">
        <section className="landing-hero">
          {/* Text Content */}
          <div className="landing-hero-text">
            <h1 className="landing-hero-title">
              Adopt Your
              <br />
              Magical Study
              <br />
              Companion! 🏡✨
            </h1>
            <p className="landing-hero-subtitle">
              Welcome to your personal learning island! Choose between a fantastic fox or a
              cute puppy companion who will grow with you, celebrate your achievements, and
              make studying fun. 🌈📚
            </p>
            <div className="landing-hero-actions">
              <button
                onClick={handleGetStarted}
                className="landing-btn landing-btn-primary"
              >
                � Start Your Adventure �
              </button>
              <button
                type="button"
                onClick={handleScrollToFeatures}
                className="landing-btn landing-btn-secondary"
              >
                📖 Learn More 📖
              </button>
            </div>
          </div>

          {/* Cute Animal Preview */}
          <div className="landing-animal-wrapper">
            <div className="landing-animal-card">
              <Animal type="af" color="#ffb3d9" level="baby" context="dashboard" />
            </div>
            {/* Floating elements */}
            <div className="landing-floating-icon landing-floating-icon--top-right">
              ✨
            </div>
            <div className="landing-floating-icon landing-floating-icon--bottom-left">
              🌸
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="landing-features">
          <h2 className="landing-section-title">
            🏝️ Your Personal Learning Island Features 🏝️
          </h2>

          <div className="landing-features-grid">
            {/* Feature Card 1 */}
            <div className="landing-feature-card">
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🧠</div>
              <h3>AI-Powered Learning</h3>
              <p>
                Smart quizzes that adapt to your level. Study sessions with real-time guidance
                from your companion.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="landing-feature-card">
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📊</div>
              <h3>Progress Tracking</h3>
              <p>
                Watch your companion grow as you earn XP. Detailed analytics on your learning
                journey.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="landing-feature-card">
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎯</div>
              <h3>Gamified Experience</h3>
              <p>
                Level up your companion, unlock achievements, and celebrate each milestone
                together!
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="landing-cta">
          <h2>
            Ready to Start Your Learning Journey? 🌟
          </h2>
          <p>
            Join thousands of learners who have already adopted their magical study companions!
          </p>
          <button
            onClick={handleGetStarted}
            className="landing-btn landing-btn-primary"
          >
            🚀 Create Your Account 🚀
          </button>
        </section>
      </main>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="landing-footer-icons">
          <span>📚</span>
          <span>🎮</span>
          <span>✨</span>
          <span>🏝️</span>
          <span>🎀</span>
        </div>
        <p className="landing-footer-text">
          Made with ❤️ for passionate learners everywhere
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
