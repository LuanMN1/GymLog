import React from 'react';
import { useLanguage } from '../App';
import { getTranslatedExerciseName } from '../i18n/exerciseTranslations';
import { isTimeBasedExercise } from '../utils/exerciseTypes';
import './PresetRoutineModal.css';

const PresetRoutineModal = ({ routine, onClose, onAdd, exercises }) => {
  const { t, language } = useLanguage();

  const handleAdd = async () => {
    // Mapear os exercícios da rotina pré-montada para os IDs dos exercícios disponíveis
    const routineExercises = routine.exercises.map(ex => {
      const exercise = exercises.find(e => e.name === ex.name);
      if (!exercise) {
        console.warn(`Exercise ${ex.name} not found in available exercises`);
        return null;
      }
      return {
        exercise_id: exercise.id,
        sets: ex.sets,
        reps: ex.reps,
        order: routine.exercises.indexOf(ex),
        notes: language === 'en' ? (ex.notes || ex.notesPt || '') : (ex.notesPt || ex.notes || '')
      };
    }).filter(ex => ex !== null);

    if (routineExercises.length === 0) {
      alert(t('presetRoutines.noExercisesFound'));
      return;
    }

    const routineData = {
      name: language === 'en' ? routine.name : routine.namePt,
      description: language === 'en' ? routine.descriptionEn : routine.description,
      preset_id: routine.id,  // Salva o ID da rotina pré-montada
      exercises: routineExercises
    };

    onAdd(routineData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content preset-routine-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{language === 'en' ? routine.name : routine.namePt}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="preset-routine-content">
          <div className="routine-info">
            <div className="info-item">
              <span className="info-label">{t('presetRoutines.difficulty')}:</span>
              <span className="info-value">{language === 'en' ? routine.difficulty : routine.difficultyPt}</span>
            </div>
            <div className="info-item">
              <span className="info-label">{t('presetRoutines.duration')}:</span>
              <span className="info-value">{language === 'en' ? routine.durationEn : routine.duration}</span>
            </div>
          </div>

          <div className="routine-description">
            <p>{language === 'en' ? routine.descriptionEn : routine.description}</p>
          </div>

          <div className="routine-exercises-list">
            <h3>{t('presetRoutines.exercises')} ({routine.exercises.length})</h3>
            <div className="exercises-container">
              {routine.exercises.map((ex, idx) => {
                const isTimeBased = isTimeBasedExercise(ex.name);
                const exerciseExists = exercises.some(e => e.name === ex.name);
                
                return (
                  <div 
                    key={idx} 
                    className={`exercise-item-preset ${!exerciseExists ? 'missing' : ''}`}
                  >
                    <div className="exercise-number-preset">{idx + 1}</div>
                    <div className="exercise-details-preset">
                      <strong>{getTranslatedExerciseName(ex.name, language)}</strong>
                      <div className="exercise-sets-reps">
                        {isTimeBased ? (
                          <span>{ex.sets} {t('common.sets')} x {ex.reps || ex.sets * 30} {t('common.seconds')}</span>
                        ) : (
                          <span>{ex.sets} {t('common.sets')} x {ex.reps} {t('common.reps')}</span>
                        )}
                      </div>
                      {(() => {
                        // Determina qual nota mostrar baseado no idioma
                        const displayNote = language === 'en' 
                          ? (ex.notes || '') 
                          : (ex.notesPt || ex.notes || '');
                        
                        return displayNote ? (
                          <p className="exercise-notes-preset">{displayNote}</p>
                        ) : null;
                      })()}
                      {!exerciseExists && (
                        <p className="exercise-warning">{t('presetRoutines.exerciseNotAvailable')}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn-secondary" onClick={onClose}>
            {t('forms.cancel')}
          </button>
          <button className="btn-primary" onClick={handleAdd}>
            ➕ {t('presetRoutines.addToMyRoutines')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PresetRoutineModal;

