import React, { useState, useEffect } from 'react';
import { useLanguage } from '../App';
import { getTranslatedExerciseName } from '../i18n/exerciseTranslations';
import { isTimeBasedExercise } from '../utils/exerciseTypes';
import './EditWorkoutSetsModal.css';

const EditWorkoutSetsModal = ({ exercise, workoutSets, workoutId, onClose, onSave }) => {
  const { t, language } = useLanguage();
  const [editedSets, setEditedSets] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    // Initialize with current sets
    if (workoutSets && workoutSets.length > 0) {
      setEditedSets(workoutSets.map(set => ({ ...set })));
    } else {
      // If no sets, create one empty set
      setEditedSets([{
        set_number: 1,
        reps: 0,
        weight: 0,
        duration: 0
      }]);
    }
  }, [workoutSets]);
  
  if (!exercise) return null;

  const isTimeBased = isTimeBasedExercise(exercise.name);

  const formatTime = (seconds) => {
    if (seconds < 60) {
      return `${seconds}s`;
    }
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return secs > 0 ? `${minutes}m ${secs}s` : `${minutes}m`;
  };

  const handleSetChange = (index, field, value) => {
    const newSets = [...editedSets];
    if (field === 'duration') {
      // Convert time string to seconds
      const parts = value.split(':');
      if (parts.length === 2) {
        const minutes = parseInt(parts[0]) || 0;
        const seconds = parseInt(parts[1]) || 0;
        newSets[index][field] = minutes * 60 + seconds;
      } else {
        newSets[index][field] = parseInt(value) || 0;
      }
    } else {
      newSets[index][field] = field === 'set_number' || field === 'reps' 
        ? parseInt(value) || 0 
        : parseFloat(value) || 0;
    }
    setEditedSets(newSets);
  };

  const addSet = () => {
    const newSetNumber = editedSets.length > 0 
      ? Math.max(...editedSets.map(s => s.set_number)) + 1 
      : 1;
    setEditedSets([...editedSets, {
      set_number: newSetNumber,
      reps: 0,
      weight: 0,
      duration: 0
    }]);
  };

  const removeSet = (index) => {
    if (editedSets.length > 1) {
      const newSets = editedSets.filter((_, i) => i !== index);
      // Renumber sets
      newSets.forEach((set, i) => {
        set.set_number = i + 1;
      });
      setEditedSets(newSets);
    }
  };

  const formatTimeInput = (seconds) => {
    if (seconds === 0) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Calculate summary values
      const totalSets = editedSets.length;
      const avgReps = editedSets.reduce((sum, s) => sum + (s.reps || 0), 0) / totalSets;
      const avgWeight = editedSets.reduce((sum, s) => sum + (s.weight || 0), 0) / totalSets;
      const totalDuration = editedSets.reduce((sum, s) => sum + (s.duration || 0), 0);

      await onSave(workoutId, exercise.id, {
        workout_sets: editedSets,
        sets: totalSets,
        reps: Math.round(avgReps),
        weight: avgWeight,
        duration: totalDuration
      });
      
      onClose();
    } catch (error) {
      console.error('Error saving sets:', error);
      alert(t('history.sets.saveError') || 'Erro ao salvar séries');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay edit-workout-sets-overlay" onClick={onClose}>
      <div className="edit-workout-sets-modal" onClick={(e) => e.stopPropagation()}>
        <div className="edit-workout-sets-header">
          <h2>{getTranslatedExerciseName(exercise.name, language)}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="edit-workout-sets-content">
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
              <span className="set-actions-header"></span>
            </div>
            {editedSets.map((set, index) => (
              <div key={index} className={`set-item ${isTimeBased ? 'time-based' : ''}`}>
                <span className="set-number">{set.set_number}</span>
                {isTimeBased ? (
                  <input
                    type="text"
                    className="set-input set-duration-input"
                    value={formatTimeInput(set.duration || 0)}
                    onChange={(e) => handleSetChange(index, 'duration', e.target.value)}
                    placeholder="0:00"
                  />
                ) : (
                  <>
                    <input
                      type="number"
                      className="set-input set-reps-input"
                      value={set.reps || 0}
                      onChange={(e) => handleSetChange(index, 'reps', e.target.value)}
                      min="0"
                    />
                    <input
                      type="number"
                      className="set-input set-weight-input"
                      value={set.weight || 0}
                      onChange={(e) => handleSetChange(index, 'weight', e.target.value)}
                      min="0"
                      step="0.5"
                    />
                  </>
                )}
                <button
                  className="btn-remove-set"
                  onClick={() => removeSet(index)}
                  disabled={editedSets.length === 1}
                  title={t('history.sets.removeSet')}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          
          <button className="btn-add-set" onClick={addSet}>
            + {t('history.sets.addSet')}
          </button>
        </div>

        <div className="edit-workout-sets-footer">
          <button className="btn-cancel" onClick={onClose} disabled={loading}>
            {t('forms.cancel')}
          </button>
          <button className="btn-save" onClick={handleSave} disabled={loading}>
            {loading ? t('common.saving') || 'Salvando...' : t('forms.save')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditWorkoutSetsModal;

