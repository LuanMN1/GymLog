import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GamificationProgress.css';

const GamificationProgress = ({ user, t }) => {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProgress();
    }
  }, [user]);

  const fetchProgress = async () => {
    try {
      const response = await axios.get('/api/gamification/progress');
      setProgress(response.data);
    } catch (error) {
      console.error('Error fetching progress:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user || loading || !progress) {
    return null;
  }

  const progressPercentage = progress.xp_needed > 0 
    ? (progress.xp_progress / progress.xp_needed) * 100 
    : 100;

  return (
    <div className="gamification-progress">
      <div className="progress-card">
        <div className="progress-header">
          <h3>{t('gamification.progress.title')}</h3>
          <div className="level-badge">
            <span className="level-label">{t('gamification.progress.level')}</span>
            <span className="level-value">{progress.level}</span>
          </div>
        </div>

        <div className="xp-section">
          <div className="xp-info">
            <span className="xp-label">{t('gamification.progress.xp')}</span>
            <span className="xp-value">{progress.xp.toLocaleString()}</span>
          </div>
          <div className="xp-progress-bar">
            <div 
              className="xp-progress-fill" 
              style={{ width: `${progressPercentage}%` }}
            >
              <span className="xp-progress-text">
                {progress.xp_progress} / {progress.xp_needed} XP
              </span>
            </div>
          </div>
          <div className="xp-next-level">
            {t('gamification.progress.nextLevel')}: {progress.xp_for_next_level.toLocaleString()} XP
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-icon">🔥</div>
            <div className="stat-content">
              <div className="stat-label">{t('gamification.progress.currentStreak')}</div>
              <div className="stat-value">{progress.current_streak} {t('gamification.progress.days')}</div>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">⭐</div>
            <div className="stat-content">
              <div className="stat-label">{t('gamification.progress.longestStreak')}</div>
              <div className="stat-value">{progress.longest_streak} {t('gamification.progress.days')}</div>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">💪</div>
            <div className="stat-content">
              <div className="stat-label">{t('gamification.progress.totalWorkouts')}</div>
              <div className="stat-value">{progress.total_workouts}</div>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">🏆</div>
            <div className="stat-content">
              <div className="stat-label">{t('gamification.progress.totalPoints')}</div>
              <div className="stat-value">{progress.total_points.toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamificationProgress;
