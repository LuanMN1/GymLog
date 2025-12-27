import React from 'react';
import { useLanguage } from '../App';
import { getTranslatedExerciseName } from '../i18n/exerciseTranslations';
import { isTimeBasedExercise } from '../utils/exerciseTypes';
import './WorkoutSetsModal.css';

const WorkoutSetsModal = ({ exercise, workoutSets, onClose }) => {
  const { t, language } = useLanguage();
  
  if (!exercise || !workoutSets) return null;

  const isTimeBased = isTimeBasedExercise(exercise.name);
  const hasSets = workoutSets && workoutSets.length > 0;

  const formatTime = (seconds) => {
    if (seconds < 60) {
      return `${seconds}s`;
    }
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return secs > 0 ? `${minutes}m ${secs}s` : `${minutes}m`;
  };

  return (
    <div className="modal-overlay workout-sets-overlay" onClick={onClose}>
      <div className="workout-sets-modal" onClick={(e) => e.stopPropagation()}>
        <div className="workout-sets-header">
          <h2>{getTranslatedExerciseName(exercise.name, language)}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="workout-sets-content">
          {hasSets ? (
            <div className="sets-list">
              <div className={`sets-header ${isTimeBased ? 'time-based' : ''}`}>
                <span className="set-number-header">{t('history.sets.setNumber')}</span>
                {isTimeBased ? (
                  <span className="set-duration-header">{t('history.sets.duration')}</span>
                ) : (
                  <>
                    <span className="set-reps-header">{t('history.sets.reps')}</span>
                    <span className="set-weight-header">{t('history.sets.weight')}</span>
                  </>
                )}
              </div>
              {workoutSets.map((set, index) => (
                <div key={index} className={`set-item ${isTimeBased ? 'time-based' : ''}`}>
                  <span className="set-number">{set.set_number}</span>
                  {isTimeBased ? (
                    <span className="set-duration">{formatTime(set.duration || 0)}</span>
                  ) : (
                    <>
                      <span className="set-reps">{set.reps || 0}</span>
                      <span className="set-weight">{set.weight || 0} {t('common.weight')}</span>
                    </>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="no-sets-message">{t('history.sets.noSets')}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkoutSetsModal;

