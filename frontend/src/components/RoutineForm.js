import React, { useState } from 'react';
import { useLanguage } from '../App';
import axios from 'axios';
import { getTranslatedExerciseName } from '../i18n/exerciseTranslations';
import './Form.css';

const RoutineForm = ({ onClose, onSuccess, routine = null, exercises: availableExercises }) => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: routine?.name || '',
    description: routine?.description || '',
    exercises: routine?.exercises?.map((ex, idx) => ({
      exercise_id: ex.id || ex.exercise_id,
      sets: ex.sets || 0,
      reps: ex.reps || 0,
      order: idx,
      notes: ex.notes || ''
    })) || []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const addExercise = () => {
    setFormData({
      ...formData,
      exercises: [...formData.exercises, {
        exercise_id: availableExercises[0]?.id || 0,
        sets: 0,
        reps: 0,
        order: formData.exercises.length,
        notes: ''
      }]
    });
  };

  const removeExercise = (index) => {
    const updated = formData.exercises.filter((_, i) => i !== index).map((ex, idx) => ({
      ...ex,
      order: idx
    }));
    setFormData({ ...formData, exercises: updated });
  };

  const moveExercise = (index, direction) => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === formData.exercises.length - 1)) {
      return;
    }
    
    const updated = [...formData.exercises];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    updated.forEach((ex, idx) => { ex.order = idx; });
    
    setFormData({ ...formData, exercises: updated });
  };

  const updateExercise = (index, field, value) => {
    const updated = [...formData.exercises];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, exercises: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.name.trim()) {
      setError(t('forms.validation.nameRequired'));
      return;
    }

    if (formData.exercises.length === 0) {
      setError(t('forms.validation.atLeastOneExercise'));
      return;
    }

    setLoading(true);
    try {
      if (routine) {
        await axios.put(`/api/routines/${routine.id}`, formData);
      } else {
        await axios.post('/api/routines', formData);
      }
      onSuccess();
      onClose();
    } catch (err) {
      setError(t('forms.error.createFailed'));
      console.error('Error saving routine:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{routine ? t('forms.routine.editTitle') : t('forms.routine.title')}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="routine-name">{t('forms.routine.name')} *</label>
            <input
              type="text"
              id="routine-name"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              placeholder={t('forms.routine.namePlaceholder')}
            />
          </div>

          <div className="form-group">
            <label htmlFor="routine-description">{t('forms.routine.description')}</label>
            <textarea
              id="routine-description"
              name="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows="3"
              placeholder={t('forms.routine.descriptionPlaceholder')}
            />
          </div>

          <div className="exercises-section">
            <div className="section-header">
              <h3>{t('forms.routine.exercises')}</h3>
              <button type="button" className="btn-add" onClick={addExercise}>
                + {t('forms.routine.addExercise')}
              </button>
            </div>

            {formData.exercises.map((ex, index) => (
              <div key={index} className="exercise-item-form">
                <div className="exercise-item-header">
                  <div className="exercise-order-controls">
                    <button 
                      type="button" 
                      className="btn-order" 
                      onClick={() => moveExercise(index, 'up')}
                      disabled={index === 0}
                      title={t('forms.routine.moveUp')}
                    >
                      ↑
                    </button>
                    <span className="exercise-number">{index + 1}</span>
                    <button 
                      type="button" 
                      className="btn-order" 
                      onClick={() => moveExercise(index, 'down')}
                      disabled={index === formData.exercises.length - 1}
                      title={t('forms.routine.moveDown')}
                    >
                      ↓
                    </button>
                  </div>
                  <button type="button" className="btn-remove" onClick={() => removeExercise(index)}>
                    ×
                  </button>
                </div>
                
                <div className="exercise-fields">
                  <div className="form-group">
                    <label>{t('forms.routine.exerciseSelect')}</label>
                    <select
                      value={ex.exercise_id}
                      onChange={(e) => updateExercise(index, 'exercise_id', parseInt(e.target.value))}
                      required
                    >
                      <option value="">{t('forms.routine.selectExercise')}</option>
                      {availableExercises.map(exercise => (
                        <option key={exercise.id} value={exercise.id}>
                          {getTranslatedExerciseName(exercise.name, language)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>{t('forms.routine.sets')}</label>
                      <input
                        type="number"
                        min="0"
                        value={ex.sets}
                        onChange={(e) => updateExercise(index, 'sets', parseInt(e.target.value) || 0)}
                      />
                    </div>

                    <div className="form-group">
                      <label>{t('forms.routine.reps')}</label>
                      <input
                        type="number"
                        min="0"
                        value={ex.reps}
                        onChange={(e) => updateExercise(index, 'reps', parseInt(e.target.value) || 0)}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>{t('forms.routine.notes')}</label>
                    <input
                      type="text"
                      value={ex.notes}
                      onChange={(e) => updateExercise(index, 'notes', e.target.value)}
                      placeholder={t('forms.routine.notesPlaceholder')}
                    />
                  </div>
                </div>
              </div>
            ))}

            {formData.exercises.length === 0 && (
              <p className="empty-message">{t('forms.routine.noExercises')}</p>
            )}
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              {t('forms.cancel')}
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? t('forms.saving') : (routine ? t('forms.update') : t('forms.create'))}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoutineForm;

