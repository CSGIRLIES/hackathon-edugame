import React, { useEffect, useState } from 'react';

const SOUND_CONSENT_KEY = 'csGirliesSoundConsent';

const SoundConsentBanner: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(SOUND_CONSENT_KEY);
      if (!stored) {
        // Only show banner if no preference stored yet
        setVisible(true);
      }
    } catch {
      // If localStorage is not available, fail silently
      setVisible(true);
    }
  }, []);

  const handleEnable = () => {
    try {
      localStorage.setItem(SOUND_CONSENT_KEY, 'enabled');
    } catch {
      // ignore storage errors
    }
    // This click counts as a user interaction, which allows
    // our audio calls (notification / completion) to play
    setVisible(false);
  };

  const handleDismiss = () => {
    try {
      localStorage.setItem(SOUND_CONSENT_KEY, 'dismissed');
    } catch {
      // ignore storage errors
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '16px',
        right: '16px',
        zIndex: 2000,
        maxWidth: '320px',
        background: 'rgba(15, 23, 42, 0.96)',
        color: 'white',
        padding: '12px 14px',
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(15, 23, 42, 0.5)',
        fontSize: '0.85rem',
      }}
    >
      <div style={{ marginBottom: '8px', fontWeight: 600 }}>
        Activer les sons ?
      </div>
      <div style={{ marginBottom: '10px', opacity: 0.9 }}>
        Ton compagnon peut jouer de petits sons discrets pour les messages et la fin des sessions. Tu peux changer cela plus tard dans les paramètres du navigateur.
      </div>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
        <button
          type="button"
          onClick={handleDismiss}
          style={{
            border: 'none',
            background: 'transparent',
            color: '#e5e7eb',
            fontSize: '0.8rem',
            cursor: 'pointer',
          }}
        >
          Plus tard
        </button>
        <button
          type="button"
          onClick={handleEnable}
          style={{
            border: 'none',
            background: '#38bdf8',
            color: '#0f172a',
            fontWeight: 600,
            fontSize: '0.8rem',
            padding: '6px 10px',
            borderRadius: '999px',
            cursor: 'pointer',
          }}
        >
          Activer les sons
        </button>
      </div>
    </div>
  );
};

export default SoundConsentBanner;
