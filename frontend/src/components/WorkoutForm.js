import React, { useState, useEffect } from 'react';
import { useLanguage } from '../App';
import axios from 'axios';
import { getTranslatedExerciseName } from '../i18n/exerciseTranslations';
import './Form.css';

const WorkoutForm = ({ onClose, onSuccess, exercises: availableExercises }) => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    date: new Date().toISOString().split('T')[0],
    exercises: []
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
        weight: 0,
        notes: ''
      }]
    });
  };

  const removeExercise = (index) => {
    setFormData({
      ...formData,
      exercises: formData.exercises.filter((_, i) => i !== index)
    });
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
      const workoutData = {
        ...formData,
        date: new Date(formData.date).toISOString()
      };
      await axios.post('/api/workouts', workoutData);
      onSuccess();
      onClose();
    } catch (err) {
      setError(t('forms.error.createFailed'));
      console.error('Error creating workout:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{t('forms.workout.title')}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="workout-name">{t('forms.workout.name')} *</label>
            <input
              type="text"
              id="workout-name"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              placeholder={t('forms.workout.namePlaceholder')}
            />
          </div>

          <div className="form-group">
            <label htmlFor="workout-date">{t('forms.workout.date')}</label>
            <input
              type="date"
              id="workout-date"
              name="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </div>

          <div className="exercises-section">
            <div className="section-header">
              <h3>{t('forms.workout.exercises')}</h3>
              <button type="button" className="btn-add" onClick={addExercise}>
                + {t('forms.workout.addExercise')}
              </button>
            </div>

            {formData.exercises.map((ex, index) => (
              <div key={index} className="exercise-item-form">
                <div className="exercise-item-header">
                  <span>{t('forms.workout.exercise')} {index + 1}</span>
                  <button type="button" className="btn-remove" onClick={() => removeExercise(index)}>
                    ×
                  </button>
                </div>
                
                <div className="exercise-fields">
                  <div className="form-group">
                    <label>{t('forms.workout.exerciseSelect')}</label>
                    <select
                      value={ex.exercise_id}
                      onChange={(e) => updateExercise(index, 'exercise_id', parseInt(e.target.value))}
                      required
                    >
                      <option value="">{t('forms.workout.selectExercise')}</option>
                      {availableExercises.map(exercise => (
                        <option key={exercise.id} value={exercise.id}>
                          {getTranslatedExerciseName(exercise.name, language)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>{t('forms.workout.sets')}</label>
                      <input
                        type="number"
                        min="0"
                        value={ex.sets}
                        onChange={(e) => updateExercise(index, 'sets', parseInt(e.target.value) || 0)}
                      />
                    </div>

                    <div className="form-group">
                      <label>{t('forms.workout.reps')}</label>
                      <input
                        type="number"
                        min="0"
                        value={ex.reps}
                        onChange={(e) => updateExercise(index, 'reps', parseInt(e.target.value) || 0)}
                      />
                    </div>

                    <div className="form-group">
                      <label>{t('forms.workout.weight')} (kg)</label>
                      <input
                        type="number"
                        min="0"
                        step="0.5"
                        value={ex.weight}
                        onChange={(e) => updateExercise(index, 'weight', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>{t('forms.workout.notes')}</label>
                    <input
                      type="text"
                      value={ex.notes}
                      onChange={(e) => updateExercise(index, 'notes', e.target.value)}
                      placeholder={t('forms.workout.notesPlaceholder')}
                    />
                  </div>
                </div>
              </div>
            ))}

            {formData.exercises.length === 0 && (
              <p className="empty-message">{t('forms.workout.noExercises')}</p>
            )}
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              {t('forms.cancel')}
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? t('forms.saving') : t('forms.create')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WorkoutForm;

