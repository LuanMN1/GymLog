import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAchievementTranslation } from '../i18n/gamificationData';
import './Achievements.css';

const Achievements = ({ user, t, language }) => {
  const [achievements, setAchievements] = useState([]);
  const [userAchievements, setUserAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'unlocked', 'locked'

  useEffect(() => {
    if (user) {
      fetchAchievements();
    }
  }, [user]);

  const fetchAchievements = async () => {
    try {
      const [allResponse, userResponse] = await Promise.all([
        axios.get('/api/gamification/achievements/all'),
        axios.get('/api/gamification/achievements')
      ]);
      setAchievements(allResponse.data);
      setUserAchievements(userResponse.data.map(a => a.id));
    } catch (error) {
      console.error('Error fetching achievements:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common':
        return '#6b7280';
      case 'rare':
        return '#3b82f6';
      case 'epic':
        return '#8b5cf6';
      case 'legendary':
        return '#f59e0b';
      default:
        return '#6b7280';
    }
  };

  const getRarityGradient = (rarity) => {
    switch (rarity) {
      case 'common':
        return 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)';
      case 'rare':
        return 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)';
      case 'epic':
        return 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)';
      case 'legendary':
        return 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)';
      default:
        return 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)';
    }
  };

  if (!user || loading) {
    return null;
  }

  const filteredAchievements = achievements.filter(achievement => {
    const isUnlocked = userAchievements.includes(achievement.id);
    if (filter === 'unlocked') return isUnlocked;
    if (filter === 'locked') return !isUnlocked;
    return true;
  });

  const unlockedCount = userAchievements.length;
  const totalCount = achievements.length;

  return (
    <div className="achievements-container">
      <div className="achievements-header">
        <div>
          <h2>{t('gamification.achievements.title')}</h2>
          <p className="achievements-subtitle">
            {unlockedCount} / {totalCount} {t('gamification.achievements.unlocked')}
          </p>
        </div>
        <div className="achievements-filters">
          <button
            className={`filter-button ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            {t('gamification.achievements.all')}
          </button>
          <button
            className={`filter-button ${filter === 'unlocked' ? 'active' : ''}`}
            onClick={() => setFilter('unlocked')}
          >
            {t('gamification.achievements.unlocked')}
          </button>
          <button
            className={`filter-button ${filter === 'locked' ? 'active' : ''}`}
            onClick={() => setFilter('locked')}
          >
            {t('gamification.achievements.locked')}
          </button>
        </div>
      </div>

      <div className="achievements-grid">
        {filteredAchievements.length === 0 ? (
          <div className="empty-state">
            <p>{t('gamification.achievements.noAchievements')}</p>
          </div>
        ) : (
          filteredAchievements.map((achievement) => {
            const isUnlocked = userAchievements.includes(achievement.id);
            const tr = getAchievementTranslation(achievement.name, achievement.description, language || 'en');
            return (
              <div
                key={achievement.id}
                className={`achievement-card ${isUnlocked ? 'unlocked' : 'locked'}`}
                style={{
                  '--rarity-color': getRarityColor(achievement.rarity),
                  '--rarity-gradient': getRarityGradient(achievement.rarity)
                }}
              >
                <div className="achievement-icon-container">
                  <div
                    className="achievement-icon"
                    style={{
                      background: isUnlocked ? getRarityGradient(achievement.rarity) : 'rgba(0, 0, 0, 0.3)',
                      filter: isUnlocked ? 'none' : 'grayscale(100%) brightness(0.5)'
                    }}
                  >
                    <span className="icon-emoji">{achievement.icon}</span>
                  </div>
                  {isUnlocked && (
                    <div className="unlocked-badge">✓</div>
                  )}
                </div>
                <div className="achievement-content">
                  <h3 className="achievement-name">{tr.name}</h3>
                  <p className="achievement-description">{tr.description}</p>
                  <div className="achievement-meta">
                    <div className="rarity-badge" style={{ backgroundColor: getRarityColor(achievement.rarity) }}>
                      {t(`gamification.achievements.rarity.${achievement.rarity}`)}
                    </div>
                    {isUnlocked && (
                      <div className="achievement-rewards">
                        <span className="reward-text">
                          +{achievement.xp_reward} XP • +{achievement.points_reward} {t('gamification.achievements.points')}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Achievements;
