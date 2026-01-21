import React from 'react';
import { useLanguage } from '../App';
import { getTranslatedExerciseName } from '../i18n/exerciseTranslations';
import { exerciseData } from '../i18n/exerciseData';
import './ExerciseDetailModal.css';

const ExerciseDetailModal = ({ exercise, onClose }) => {
  const { t, language } = useLanguage();
  
  if (!exercise) return null;

  const exerciseInfo = exerciseData[exercise.name] || {};
  const localizedDescription =
    exerciseInfo?.description?.[language] ||
    exerciseInfo?.description?.en ||
    exercise?.description ||
    '';

  const localizedInstructions = Array.isArray(exerciseInfo?.instructions)
    ? exerciseInfo.instructions
    : exerciseInfo?.instructions?.[language] ||
      exerciseInfo?.instructions?.en ||
      [];

  // Try to get image, with fallback
  const tutorialImage =
    exercise?.tutorial_image ||
    exercise?.tutorialImage ||
    exerciseInfo?.tutorialImage ||
    exerciseInfo?.image ||
    null;
  const localizedMuscleGroups = Array.isArray(exerciseInfo?.muscleGroups)
    ? exerciseInfo.muscleGroups
    : exerciseInfo?.muscleGroups?.[language] ||
      exerciseInfo?.muscleGroups?.en ||
      [];
  
  // Log for debugging
  if (tutorialImage) {
    console.log(`Loading image for ${exercise.name}:`, tutorialImage);
  }

  const getCategoryTranslation = (category) => {
    const categoryMap = {
      'Chest': t('filters.chest'),
      'Back': t('filters.back'),
      'Biceps': t('filters.biceps'),
      'Triceps': t('filters.triceps'),
      'Legs': t('filters.legs'),
      'Shoulders': t('filters.shoulders'),
      'Forearms': t('filters.forearms'),
      'Core': t('filters.core')
    };
    return categoryMap[category] || category;
  };

  return (
    <div className="modal-overlay exercise-detail-overlay" onClick={onClose}>
      <div className="exercise-detail-modal" onClick={(e) => e.stopPropagation()}>
        <div className="exercise-detail-header">
          <h2>{getTranslatedExerciseName(exercise.name, language)}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="exercise-detail-content">
          <div className="exercise-info-section">
            <div className="info-row">
              <span className="info-label">{t('exerciseDetail.category')}:</span>
              <span className="info-value">{getCategoryTranslation(exercise.category)}</span>
            </div>
            
            {localizedDescription && (
              <div className="info-row full-width">
                <span className="info-label">{t('exerciseDetail.description')}:</span>
                <p className="info-description">{localizedDescription}</p>
              </div>
            )}

            {localizedMuscleGroups.length > 0 && (
              <div className="info-row full-width">
                <span className="info-label">{t('exerciseDetail.targetMuscles')}:</span>
                <div className="muscle-groups">
                  {localizedMuscleGroups.map((muscle, idx) => (
                    <span key={idx} className="muscle-tag">{muscle}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {tutorialImage && (
            <div className="exercise-tutorial-section">
              <h3>{t('exerciseDetail.tutorial')}</h3>
              <div className="tutorial-image-container">
                <img 
                  src={tutorialImage} 
                  alt={t('exerciseDetail.tutorial')}
                  className="tutorial-image"
                  loading="lazy"
                  crossOrigin="anonymous"
                  onError={(e) => {
                    console.error('Failed to load image:', tutorialImage);
                    e.target.style.display = 'none';
                    const placeholder = e.target.nextElementSibling;
                    if (placeholder) {
                      placeholder.style.display = 'flex';
                    }
                  }}
                />
                <div className="tutorial-placeholder" style={{ display: 'none' }}>
                  <img src={require('../assets/icons/icon-workout.png')} alt="Workout" className="placeholder-icon" />
                  <p>{t('exerciseDetail.imageUnavailable')}</p>
                </div>
              </div>
              {Array.isArray(localizedInstructions) && localizedInstructions.length > 0 && (
                <div className="instructions">
                  <h4>{t('exerciseDetail.howTo')}</h4>
                  <ol>
                    {localizedInstructions.map((instruction, idx) => (
                      <li key={idx}>{instruction}</li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          )}

          {!tutorialImage && (
            <div className="exercise-tutorial-section">
              <h3>{t('exerciseDetail.tutorial')}</h3>
              <div className="tutorial-placeholder">
                <img src={require('../assets/icons/icon-workout.png')} alt="Workout" className="placeholder-icon" />
                <p>{t('exerciseDetail.imageUnavailable')}</p>
              </div>
            </div>
          )}
        </div>

        <div className="exercise-detail-footer">
          <button className="btn-primary" onClick={onClose}>
            {t('exerciseDetail.close')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExerciseDetailModal;

