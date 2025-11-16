import React from 'react';
import { useTranslation } from 'react-i18next';
import { useUser } from '../contexts/UserContext.tsx';

const StreaksWidget: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useUser();

  if (!user) return null;

  const getStreakEmoji = (streak: number) => {
    if (streak === 0) return '💧'; // Droplet for restart
    if (streak < 3) return '💦'; // Sweat drops for small hydrated streaks
    if (streak < 7) return '💦💦'; // Two sweat drops
    if (streak < 14) return '🌊'; // Wave for well-hydrated streaks
    if (streak < 30) return '🔵'; // Blue heart for epic hydrated streaks
    return '💙'; // Blue heart for legendary hydrated streaks
  };

  const getStreakMessage = (streak: number) => {
    if (streak === 0) return t('streaks.restart');
    if (streak === 1) return t('streaks.oneDay');
    if (streak < 7) return t('streaks.keepGoing');
    if (streak < 14) return t('streaks.onFire');
    if (streak < 30) return t('streaks.epic');
    return t('streaks.legendary');
  };

  const getNextStreakMilestone = (streak: number) => {
    if (streak < 1) return 1;
    if (streak < 3) return 3;
    if (streak < 7) return 7;
    if (streak < 14) return 14;
    if (streak < 30) return 30;
    return streak; // au-delà de 30, on considère la barre remplie
  };

  const isPersonalRecord = user.currentStreak === user.maxStreak && user.currentStreak > 0;
  const nextMilestone = getNextStreakMilestone(user.currentStreak);
  const streakProgress = nextMilestone > 0
    ? Math.min(100, Math.round((user.currentStreak / nextMilestone) * 100))
    : 0;

  return (
    <section className="card">
      <div className="card-header">
        <h2 className="card-title">
          💧 {t('streaks.title')}
          {isPersonalRecord && <span className="streak-record">🏆</span>}
        </h2>
        <p className="card-subtitle">
          {t('streaks.subtitle')}
        </p>
      </div>

      <div className="streak-content">
        <div className="streak-main">
          <div className="streak-flames">
            {getStreakEmoji(user.currentStreak)}
          </div>
          <div className="streak-number">
            {user.currentStreak}
          </div>
          <div className="streak-label">
            {t('streaks.days')}
          </div>

          {/* Milestone progress bar inside the streak droplet */}
          {nextMilestone > 0 && (
            <div style={{ marginTop: '0.75rem', width: '100%' }}>
              <div style={{ fontSize: '0.75rem', marginBottom: '0.25rem', opacity: 0.8 }}>
                {user.currentStreak >= nextMilestone
                  ? t('streaks.milestoneReached', { days: nextMilestone })
                  : t('streaks.nextMilestone', { current: user.currentStreak, target: nextMilestone })}
              </div>
              <div className="progress-track">
                <div
                  className="progress-bar"
                  style={{ width: `${streakProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {user.currentStreak > 0 && (
          <div className="streak-info">
            <div className="streak-message">
              {getStreakMessage(user.currentStreak)}
            </div>
            {user.maxStreak > 0 && (
              <div className="streak-max">
                {t('streaks.personalBest')}: {user.maxStreak} {t('streaks.days')}
              </div>
            )}
          </div>
        )}

        {user.currentStreak === 0 && (
          <div className="streak-encouragement">
            {t('streaks.getStarted')}
          </div>
        )}
      </div>
    </section>
  );
};

export default StreaksWidget;
