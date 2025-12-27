import React from 'react';
import { useLanguage } from '../App';
import { getTranslatedExerciseName } from '../i18n/exerciseTranslations';
import { isTimeBasedExercise } from '../utils/exerciseTypes';
import { presetRoutines } from '../data/presetRoutines';
import './StartRoutineModal.css';

const StartRoutineModal = ({ routine, onClose, onStart }) => {
  const { t, language } = useLanguage();

  if (!routine) return null;

  // Função para obter nome e descrição traduzidos
  const getTranslatedRoutine = (routine) => {
    if (routine.preset_id) {
      const presetRoutine = presetRoutines.find(pr => pr.id === routine.preset_id);
      if (presetRoutine) {
        return {
          name: language === 'en' ? presetRoutine.name : presetRoutine.namePt,
          description: language === 'en' ? presetRoutine.descriptionEn : presetRoutine.description
        };
      }
    }
    return {
      name: routine.name,
      description: routine.description
    };
  };

  const translatedRoutine = getTranslatedRoutine(routine);

  return (
    <div className="start-routine-overlay" onClick={onClose}>
      <div className="start-routine-modal" onClick={(e) => e.stopPropagation()}>
        <div className="start-routine-header">
          <h2>{translatedRoutine.name}</h2>
          <button className="start-routine-close-btn" onClick={onClose}>×</button>
        </div>

        <div className="start-routine-body">
          {translatedRoutine.description && (
            <p className="start-routine-description">{translatedRoutine.description}</p>
          )}

          <div className="start-routine-exercises-preview">
            <h3>{t('routines.exercises')} ({routine.exercises.length})</h3>
            <div className="start-routine-exercises-list">
              {routine.exercises.map((ex, idx) => (
                <div key={idx} className="start-routine-exercise-item">
                  <strong>{idx + 1}. {getTranslatedExerciseName(ex.name, language)}</strong>
                  {isTimeBasedExercise(ex.name) ? (
                    <span>{ex.sets}{t('common.sets')} x {ex.reps}{t('common.seconds')}</span>
                  ) : (
                    <span>{ex.sets}{t('common.sets')} x {ex.reps}{t('common.reps')}</span>
                  )}
                  {ex.notes && <p className="start-routine-exercise-notes">{ex.notes}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="start-routine-footer">
          <button className="start-routine-btn-secondary" onClick={onClose}>
            {t('forms.cancel')}
          </button>
          <button className="start-routine-btn-primary" onClick={onStart}>
            {t('routines.registerRoutine')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartRoutineModal;

