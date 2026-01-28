import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getChallengeTranslation } from '../i18n/gamificationData';
import ConfirmModal from './ConfirmModal';
import './Challenges.css';

const ChallengeCard = ({ challenge, getDifficultyColor, getDifficultyIcon, getPeriodBadge, startChallenge, t, language }) => {
  const periodBadge = getPeriodBadge(challenge.period_type || 'cumulative');
  const tr = getChallengeTranslation(challenge.name, challenge.description, language || 'en');
  
  return (
    <div className={`challenge-card ${challenge.is_completed ? 'completed' : ''}`}>
      <div className="challenge-content">
        <div className="challenge-header">
          <div className="challenge-title-section">
            <h3>{tr.name}</h3>
            <div className="badges-row">
              <div
                className="period-badge"
                style={{ backgroundColor: periodBadge.color }}
              >
                <span>{periodBadge.icon}</span>
                <span>{periodBadge.label}</span>
              </div>
              <div
                className="difficulty-badge"
                style={{ borderColor: getDifficultyColor(challenge.difficulty) }}
              >
                <span>{getDifficultyIcon(challenge.difficulty)}</span>
                <span>{t(`gamification.challenges.difficulty.${challenge.difficulty}`)}</span>
              </div>
            </div>
          </div>
          {challenge.is_completed && (
            <div className="completed-badge">✓ {t('gamification.challenges.completed')}</div>
          )}
        </div>
        <p className="challenge-description">{tr.description}</p>
        <div className="challenge-rewards">
          <div className="reward-item">
            <span className="reward-icon">⭐</span>
            <span>{challenge.xp_reward} XP</span>
          </div>
          <div className="reward-item">
            <span className="reward-icon">🏆</span>
            <span>{challenge.points_reward} {t('gamification.challenges.points')}</span>
          </div>
        </div>
      </div>
      {!challenge.is_started && !challenge.is_completed && !['daily', 'weekly', 'monthly'].includes(challenge.period_type || '') && (
        <button
          className="start-challenge-button"
          onClick={() => startChallenge(challenge.id)}
        >
          {t('gamification.challenges.start')}
        </button>
      )}
    </div>
  );
};

const Challenges = ({ user, t, language, onChallengeComplete }) => {
  const [challenges, setChallenges] = useState([]);
  const [activeChallenges, setActiveChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('available'); // 'available', 'active', or 'history'
  const [difficultyFilter, setDifficultyFilter] = useState('all'); // 'all', 'easy', 'medium', 'hard', 'expert'
  const [periodFilter, setPeriodFilter] = useState('all'); // 'all', 'daily', 'weekly', 'monthly'
  const [challengeToAbandon, setChallengeToAbandon] = useState(null);
  const [showAbandonConfirm, setShowAbandonConfirm] = useState(false);

  useEffect(() => {
    if (user) {
      fetchChallenges();
      fetchActiveChallenges();
    }
  }, [user]);

  const fetchChallenges = async () => {
    try {
      const response = await axios.get('/api/gamification/challenges');
      console.log('Challenges fetched:', response.data.length, 'challenges');
      console.log('All challenges:', response.data);
      console.log('Period breakdown:', {
        daily: response.data.filter(c => c.period_type === 'daily').length,
        weekly: response.data.filter(c => c.period_type === 'weekly').length,
        monthly: response.data.filter(c => c.period_type === 'monthly').length,
        cumulative: response.data.filter(c => !c.period_type || c.period_type === 'cumulative').length
      });
      console.log('Challenge status breakdown:', {
        started: response.data.filter(c => c.is_started).length,
        completed: response.data.filter(c => c.is_completed).length,
        not_started: response.data.filter(c => !c.is_started).length,
        not_completed: response.data.filter(c => !c.is_completed).length
      });
      setChallenges(response.data);
    } catch (error) {
      console.error('Error fetching challenges:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchActiveChallenges = async () => {
    try {
      const response = await axios.get('/api/gamification/challenges/active');
      setActiveChallenges(response.data);
    } catch (error) {
      console.error('Error fetching active challenges:', error);
    }
  };

  const startChallenge = async (challengeId) => {
    try {
      await axios.post(`/api/gamification/challenges/${challengeId}/start`);
      fetchChallenges();
      fetchActiveChallenges();
    } catch (error) {
      console.error('Error starting challenge:', error);
      alert(t('gamification.challenges.startError'));
    }
  };

  const abandonChallenge = async (challengeId) => {
    try {
      await axios.post(`/api/gamification/challenges/${challengeId}/abandon`);
      fetchChallenges();
      fetchActiveChallenges();
    } catch (error) {
      console.error('Error abandoning challenge:', error);
      alert(t('gamification.challenges.abandonError'));
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return '#10b981';
      case 'medium':
        return '#f59e0b';
      case 'hard':
        return '#ef4444';
      case 'expert':
        return '#8b5cf6';
      default:
        return '#6b7280';
    }
  };

  const getDifficultyIcon = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return '🟢';
      case 'medium':
        return '🟡';
      case 'hard':
        return '🔴';
      case 'expert':
        return '💜';
      default:
        return '⚪';
    }
  };

  const getPeriodBadge = (periodType) => {
    switch (periodType) {
      case 'daily':
        return { icon: '📅', label: t('gamification.challenges.period.daily'), color: '#3b82f6' };
      case 'weekly':
        return { icon: '📆', label: t('gamification.challenges.period.weekly'), color: '#8b5cf6' };
      case 'monthly':
        return { icon: '🗓️', label: t('gamification.challenges.period.monthly'), color: '#ec4899' };
      case 'cumulative':
        return { icon: '🏆', label: t('gamification.challenges.period.cumulative'), color: '#f59e0b' };
      default:
        return { icon: '📌', label: '', color: '#6b7280' };
    }
  };

  if (!user || loading) {
    return null;
  }

  // Para desafios periódicos, sempre mostrar em "available" mesmo se iniciados
  // Para desafios cumulativos, mostrar apenas se não foram iniciados
  const availableChallenges = challenges.filter(c => {
    const isPeriodic = c.period_type && ['daily', 'weekly', 'monthly'].includes(c.period_type);
    if (isPeriodic) {
      // Desafios periódicos sempre aparecem em "available" se não completados
      return !c.is_completed;
    }
    // Desafios cumulativos aparecem apenas se não foram iniciados e não foram completados
    return !c.is_started && !c.is_completed;
  });
  
  const inProgressChallenges = challenges.filter(c => {
    const isPeriodic = c.period_type && ['daily', 'weekly', 'monthly'].includes(c.period_type);
    if (isPeriodic) {
      // Desafios periódicos também aparecem em "in progress" se iniciados e não completados
      return c.is_started && !c.is_completed;
    }
    // Desafios cumulativos seguem lógica normal
    return c.is_started && !c.is_completed;
  });
  
  const completedChallenges = challenges.filter(c => c.is_completed);
  
  // Filtrar por dificuldade
  const filterByDifficulty = (challengeList) => {
    if (difficultyFilter === 'all') {
      return challengeList;
    }
    return challengeList.filter(c => c.difficulty === difficultyFilter);
  };

  // Filtrar por período
  const filterByPeriod = (challengeList) => {
    if (periodFilter === 'all') {
      return challengeList;
    }
    return challengeList.filter(c => (c.period_type || 'cumulative') === periodFilter);
  };

  // Ordenar por dificuldade: Easy → Medium → Hard → Expert
  const DIFFICULTY_ORDER = { easy: 0, medium: 1, hard: 2, expert: 3 };
  const sortByDifficulty = (list) => [...list].sort((a, b) =>
    (DIFFICULTY_ORDER[a.difficulty] ?? 99) - (DIFFICULTY_ORDER[b.difficulty] ?? 99)
  );

  // Aplicar filtros e ordenar por dificuldade
  const filteredAvailable = sortByDifficulty(filterByPeriod(filterByDifficulty(availableChallenges)));
  const filteredActive = sortByDifficulty(filterByPeriod(filterByDifficulty(inProgressChallenges)));
  const filteredCompleted = sortByDifficulty(filterByPeriod(filterByDifficulty(completedChallenges)));
  
  console.log('Total challenges from API:', challenges.length);
  console.log('Available challenges:', availableChallenges.length, availableChallenges);
  console.log('In progress challenges:', inProgressChallenges.length, inProgressChallenges);
  console.log('Period filter:', periodFilter);
  console.log('Difficulty filter:', difficultyFilter);
  console.log('Filtered available:', filteredAvailable.length, filteredAvailable);
  console.log('Filtered active:', filteredActive.length, filteredActive);

  return (
    <div className="challenges-container">
      <div className="challenges-header">
        <h2>{t('gamification.challenges.title')}</h2>
        <div className="challenges-tabs">
          <button
            className={`tab-button ${activeTab === 'available' ? 'active' : ''}`}
            onClick={() => setActiveTab('available')}
          >
            {t('gamification.challenges.available')} ({filteredAvailable.length})
          </button>
          <button
            className={`tab-button ${activeTab === 'active' ? 'active' : ''}`}
            onClick={() => setActiveTab('active')}
          >
            {t('gamification.challenges.inProgress')} ({filteredActive.length})
          </button>
          <button
            className={`tab-button ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            {t('gamification.challenges.history')} ({filteredCompleted.length})
          </button>
        </div>
        
        {/* Filtros de Período */}
        <div className="period-filters">
          <button
            className={`period-filter-btn ${periodFilter === 'all' ? 'active' : ''}`}
            onClick={() => setPeriodFilter('all')}
          >
            {t('gamification.challenges.filterAll')}
          </button>
          <button
            className={`period-filter-btn ${periodFilter === 'daily' ? 'active' : ''}`}
            onClick={() => setPeriodFilter('daily')}
          >
            📅 {t('gamification.challenges.period.daily')}
          </button>
          <button
            className={`period-filter-btn ${periodFilter === 'weekly' ? 'active' : ''}`}
            onClick={() => setPeriodFilter('weekly')}
          >
            📆 {t('gamification.challenges.period.weekly')}
          </button>
          <button
            className={`period-filter-btn ${periodFilter === 'monthly' ? 'active' : ''}`}
            onClick={() => setPeriodFilter('monthly')}
          >
            🗓️ {t('gamification.challenges.period.monthly')}
          </button>
        </div>
        
        {/* Filtros de Dificuldade */}
        <div className="difficulty-filters">
          <span className="filter-label">{t('gamification.challenges.filterByDifficulty')}:</span>
          <button
            className={`difficulty-filter-btn ${difficultyFilter === 'all' ? 'active' : ''}`}
            onClick={() => setDifficultyFilter('all')}
          >
            {t('gamification.challenges.filterAll')}
          </button>
          <button
            className={`difficulty-filter-btn ${difficultyFilter === 'easy' ? 'active' : ''}`}
            onClick={() => setDifficultyFilter('easy')}
            style={{ borderColor: '#10b981' }}
          >
            🟢 {t('gamification.challenges.difficulty.easy')}
          </button>
          <button
            className={`difficulty-filter-btn ${difficultyFilter === 'medium' ? 'active' : ''}`}
            onClick={() => setDifficultyFilter('medium')}
            style={{ borderColor: '#f59e0b' }}
          >
            🟡 {t('gamification.challenges.difficulty.medium')}
          </button>
          <button
            className={`difficulty-filter-btn ${difficultyFilter === 'hard' ? 'active' : ''}`}
            onClick={() => setDifficultyFilter('hard')}
            style={{ borderColor: '#ef4444' }}
          >
            🔴 {t('gamification.challenges.difficulty.hard')}
          </button>
          <button
            className={`difficulty-filter-btn ${difficultyFilter === 'expert' ? 'active' : ''}`}
            onClick={() => setDifficultyFilter('expert')}
            style={{ borderColor: '#8b5cf6' }}
          >
            💜 {t('gamification.challenges.difficulty.expert')}
          </button>
        </div>
      </div>

      <div className="challenges-list">
        {activeTab === 'available' ? (
          filteredAvailable.length === 0 ? (
            <div className="empty-state">
              <p>{t('gamification.challenges.noAvailable')}</p>
            </div>
          ) : (
            <div className="challenges-grid">
              {filteredAvailable.map((challenge) => (
                <ChallengeCard
                  key={challenge.id}
                  challenge={challenge}
                  getDifficultyColor={getDifficultyColor}
                  getDifficultyIcon={getDifficultyIcon}
                  getPeriodBadge={getPeriodBadge}
                  startChallenge={startChallenge}
                  t={t}
                  language={language}
                />
              ))}
            </div>
          )
        ) : activeTab === 'active' ? (
          filteredActive.length === 0 ? (
            <div className="empty-state">
              <p>{t('gamification.challenges.noActive')}</p>
            </div>
          ) : (
            <div className="challenges-grid">
              {filteredActive.map((challenge) => {
                const progressPercentage = (challenge.progress / challenge.target_value) * 100;
                const periodBadge = getPeriodBadge(challenge.period_type || 'cumulative');
                const tr = getChallengeTranslation(challenge.name, challenge.description, language || 'en');
                return (
                  <div key={challenge.id} className="challenge-card active">
                    <div className="challenge-header">
                      <div className="challenge-title-section">
                        <h3>{tr.name}</h3>
                        <div className="badges-row">
                          <div
                            className="period-badge"
                            style={{ backgroundColor: periodBadge.color }}
                          >
                            <span>{periodBadge.icon}</span>
                            <span>{periodBadge.label}</span>
                          </div>
                          <div
                            className="difficulty-badge"
                            style={{ borderColor: getDifficultyColor(challenge.difficulty) }}
                          >
                            <span>{getDifficultyIcon(challenge.difficulty)}</span>
                            <span>{t(`gamification.challenges.difficulty.${challenge.difficulty}`)}</span>
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="abandon-challenge-btn"
                        onClick={(e) => { e.stopPropagation(); setChallengeToAbandon(challenge); setShowAbandonConfirm(true); }}
                        aria-label={t('gamification.challenges.abandonTitle')}
                        title={t('gamification.challenges.abandonTitle')}
                      >
                        ×
                      </button>
                    </div>
                    <p className="challenge-description">{tr.description}</p>
                    <div className="challenge-progress">
                      <div className="progress-info">
                        <span>{challenge.progress} / {challenge.target_value}</span>
                        <span>{Math.round(progressPercentage)}%</span>
                      </div>
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{
                            width: `${progressPercentage}%`,
                            backgroundColor: getDifficultyColor(challenge.difficulty)
                          }}
                        />
                      </div>
                    </div>
                    <div className="challenge-rewards">
                      <div className="reward-item">
                        <span className="reward-icon">⭐</span>
                        <span>{challenge.xp_reward} XP</span>
                      </div>
                      <div className="reward-item">
                        <span className="reward-icon">🏆</span>
                        <span>{challenge.points_reward} {t('gamification.challenges.points')}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )
        ) : (
          filteredCompleted.length === 0 ? (
            <div className="empty-state">
              <p>{t('gamification.challenges.noCompleted')}</p>
            </div>
          ) : (
            <div className="challenges-grid">
              {filteredCompleted.map((challenge) => (
                <ChallengeCard
                  key={challenge.id}
                  challenge={challenge}
                  getDifficultyColor={getDifficultyColor}
                  getDifficultyIcon={getDifficultyIcon}
                  getPeriodBadge={getPeriodBadge}
                  startChallenge={startChallenge}
                  t={t}
                  language={language}
                />
              ))}
            </div>
          )
        )}
      </div>

      {showAbandonConfirm && challengeToAbandon && (
        <ConfirmModal
          title={t('gamification.challenges.abandonTitle')}
          message={t('gamification.challenges.abandonMessage')}
          confirmText={t('gamification.challenges.abandonConfirm')}
          cancelText={t('forms.cancel')}
          onConfirm={async () => {
            await abandonChallenge(challengeToAbandon.id);
            setShowAbandonConfirm(false);
            setChallengeToAbandon(null);
            setActiveTab('available');
          }}
          onCancel={() => {
            setShowAbandonConfirm(false);
            setChallengeToAbandon(null);
          }}
        />
      )}
    </div>
  );
};

export default Challenges;
