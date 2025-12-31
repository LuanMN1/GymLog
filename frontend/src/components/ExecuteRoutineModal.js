import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLanguage } from '../App';
import { getTranslatedExerciseName } from '../i18n/exerciseTranslations';
import { isTimeBasedExercise } from '../utils/exerciseTypes';
import { presetRoutines } from '../data/presetRoutines';
import ConfirmModal from './ConfirmModal';
import './Form.css';
import './ExecuteRoutineModal.css';

const ExecuteRoutineModal = ({ routine, onClose, onComplete }) => {
  const { t, language } = useLanguage();
  
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
  
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [workoutData, setWorkoutData] = useState({
    name: translatedRoutine.name,
    date: new Date().toISOString(),
    exercises: routine.exercises.map(ex => ({
      exercise_id: ex.id,
      sets: [],
      notes: ''
    }))
  });
  const [isSaving, setIsSaving] = useState(false);
  const [showConfirmClose, setShowConfirmClose] = useState(false);

  // Atualiza o nome do workout quando o idioma mudar
  useEffect(() => {
    const updated = getTranslatedRoutine(routine);
    setWorkoutData(prev => ({
      ...prev,
      name: updated.name
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  // Verifica se há dados preenchidos
  const hasData = () => {
    return workoutData.exercises.some(ex => 
      ex.sets.length > 0 || ex.notes.trim() !== ''
    );
  };

  const handleCloseClick = () => {
    if (hasData()) {
      setShowConfirmClose(true);
    } else {
      onClose();
    }
  };

  const handleConfirmClose = () => {
    setShowConfirmClose(false);
    onClose();
  };

  if (!routine || routine.exercises.length === 0) return null;

  const currentExercise = routine.exercises[currentExerciseIndex];
  const isTimeBased = isTimeBasedExercise(currentExercise.name);
  const currentSets = workoutData.exercises[currentExerciseIndex].sets;

  const addSet = () => {
    const newSets = [...currentSets];
    newSets.push({
      weight: 0,
      reps: 0,
      duration: 0
    });
    const newWorkoutData = { ...workoutData };
    newWorkoutData.exercises[currentExerciseIndex].sets = newSets;
    setWorkoutData(newWorkoutData);
  };

  const updateSet = (setIndex, field, value) => {
    const newSets = [...currentSets];
    newSets[setIndex] = {
      ...newSets[setIndex],
      [field]: parseFloat(value) || 0
    };
    const newWorkoutData = { ...workoutData };
    newWorkoutData.exercises[currentExerciseIndex].sets = newSets;
    setWorkoutData(newWorkoutData);
  };

  const removeSet = (setIndex) => {
    const newSets = currentSets.filter((_, idx) => idx !== setIndex);
    const newWorkoutData = { ...workoutData };
    newWorkoutData.exercises[currentExerciseIndex].sets = newSets;
    setWorkoutData(newWorkoutData);
  };

  const nextExercise = () => {
    if (currentExerciseIndex < routine.exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    }
  };

  const previousExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1);
    }
  };

  const formatTime = (seconds) => {
    if (seconds < 60) {
      return `${seconds}s`;
    }
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return secs > 0 ? `${minutes}m ${secs}s` : `${minutes}m`;
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Format workout data for API
      const formattedData = {
        name: workoutData.name,
        date: workoutData.date,
        preset_id: routine.preset_id || null,
        exercises: workoutData.exercises.map(ex => {
          const sets = ex.sets.length;
          const firstSet = ex.sets[0] || {};
          
          const exerciseName = routine.exercises.find(e => e.id === ex.exercise_id)?.name || '';
          const isTimeBased = isTimeBasedExercise(exerciseName);
          
          // Calcular médias para compatibilidade
          let avgReps = 0;
          let avgWeight = 0;
          let avgDuration = 0;
          
          if (isTimeBased) {
            const totalDuration = ex.sets.reduce((sum, set) => sum + (set.duration || 0), 0);
            avgDuration = sets > 0 ? Math.round(totalDuration / sets) : 0;
            avgReps = avgDuration; // Para compatibilidade
          } else {
            avgWeight = sets > 0 
              ? ex.sets.reduce((sum, set) => sum + (set.weight || 0), 0) / sets 
              : 0;
            avgReps = sets > 0
              ? Math.round(ex.sets.reduce((sum, set) => sum + (set.reps || 0), 0) / sets)
              : 0;
          }
          
          // Preparar dados de cada série individualmente
          const workout_sets = ex.sets.map((set, index) => ({
            set_number: index + 1,
            reps: set.reps || 0,
            weight: set.weight || 0,
            duration: set.duration || 0
          }));
          
          return {
            exercise_id: ex.exercise_id,
            sets: sets,
            reps: avgReps,
            weight: avgWeight,
            duration: avgDuration,
            notes: ex.notes,
            workout_sets: workout_sets
          };
        })
      };

      await axios.post('/api/workouts', formattedData);
      onComplete();
      onClose();
    } catch (error) {
      console.error('Error saving workout:', error);
      alert(t('routines.saveError'));
    } finally {
      setIsSaving(false);
    }
  };

  const progress = ((currentExerciseIndex + 1) / routine.exercises.length) * 100;

  return (
    <>
      <div className="execute-routine-overlay">
        <div className="execute-routine-modal" onClick={(e) => e.stopPropagation()}>
        <div className="execute-routine-header">
          <h2>{translatedRoutine.name}</h2>
          <button className="execute-routine-close-btn" onClick={handleCloseClick}>×</button>
        </div>

        <div className="execute-routine-progress">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="progress-text">
            {t('routines.exercise')} {currentExerciseIndex + 1} {t('routines.of')} {routine.exercises.length}
          </p>
        </div>

        <div className="modal-body">
          <div className="current-exercise-header">
            <h3>{getTranslatedExerciseName(currentExercise.name, language)}</h3>
            {isTimeBased ? (
              <p className="exercise-type">{t('routines.timeBased')}</p>
            ) : (
              <p className="exercise-type">{t('routines.weightBased')}</p>
            )}
          </div>

          <div className="sets-section">
            <div className="sets-header">
              <h4>{t('routines.sets')}</h4>
              <button className="btn-add-set" onClick={addSet}>
                + {t('routines.addSet')}
              </button>
            </div>

            {currentSets.length === 0 ? (
              <p className="empty-sets">{t('routines.noSets')}</p>
            ) : (
              <div className="sets-list">
                {currentSets.map((set, setIndex) => (
                  <div key={setIndex} className="set-item">
                    <div className="set-number">{setIndex + 1}</div>
                    <div className="set-fields">
                      {isTimeBased ? (
                        <div className="field-group">
                          <label>{t('routines.duration')} (segundos)</label>
                          <input
                            type="number"
                            min="0"
                            value={set.duration || ''}
                            onChange={(e) => updateSet(setIndex, 'duration', e.target.value)}
                            placeholder="0"
                          />
                          {set.duration > 0 && (
                            <span className="time-display">{formatTime(set.duration)}</span>
                          )}
                        </div>
                      ) : (
                        <>
                          <div className="field-group">
                            <label>{t('common.weight')} (kg)</label>
                            <input
                              type="number"
                              min="0"
                              step="0.5"
                              value={set.weight || ''}
                              onChange={(e) => updateSet(setIndex, 'weight', e.target.value)}
                              placeholder="0"
                            />
                          </div>
                          <div className="field-group">
                            <label>{t('common.reps')}</label>
                            <input
                              type="number"
                              min="0"
                              value={set.reps || ''}
                              onChange={(e) => updateSet(setIndex, 'reps', e.target.value)}
                              placeholder="0"
                            />
                          </div>
                        </>
                      )}
                    </div>
                    <button 
                      className="btn-remove-set"
                      onClick={() => removeSet(setIndex)}
                      title={t('routines.removeSet')}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="modal-footer">
          <div className="navigation-buttons">
            <button 
              className="btn-secondary"
              onClick={previousExercise}
              disabled={currentExerciseIndex === 0}
            >
              ← {t('routines.previous')}
            </button>
            {currentExerciseIndex === routine.exercises.length - 1 ? (
              <button 
                className="btn-primary"
                onClick={handleSave}
                disabled={isSaving}
              >
                {isSaving ? t('forms.saving') : t('routines.finishWorkout')}
              </button>
            ) : (
              <button 
                className="btn-primary"
                onClick={nextExercise}
              >
                {t('routines.next')} →
              </button>
            )}
          </div>
        </div>
      </div>
      </div>

      {showConfirmClose && (
        <ConfirmModal
          title={t('forms.confirmClose.title')}
          message={t('forms.confirmClose.message')}
          onConfirm={handleConfirmClose}
          onCancel={() => setShowConfirmClose(false)}
          confirmText={t('forms.confirmClose.confirm')}
          cancelText={t('forms.confirmClose.cancel')}
        />
      )}
    </>
  );
};

export default ExecuteRoutineModal;

