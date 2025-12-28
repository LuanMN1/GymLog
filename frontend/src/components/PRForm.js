import React, { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '../App';
import axios from 'axios';
import { getTranslatedExerciseName } from '../i18n/exerciseTranslations';
import { isTimeBasedExercise } from '../utils/exerciseTypes';
import './Form.css';

const PRForm = ({ onClose, onSuccess, exercises, editingPR = null }) => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    exercise_id: editingPR ? editingPR.exercise_id : '',
    weight: editingPR ? editingPR.weight : 0,
    reps: editingPR ? editingPR.reps : 1,
    duration: editingPR ? editingPR.duration : 0, // Duration in seconds
    date: editingPR ? new Date(editingPR.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    notes: editingPR ? (editingPR.notes || '') : ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Get selected exercise to check if it's time-based
  const selectedExercise = useMemo(() => {
    if (!formData.exercise_id) return null;
    // Ensure we compare numbers correctly - select returns string
    const exerciseId = typeof formData.exercise_id === 'string' ? parseInt(formData.exercise_id) : formData.exercise_id;
    const exercise = exercises.find(ex => ex.id === exerciseId);
    return exercise;
  }, [formData.exercise_id, exercises]);

  const isTimeBased = useMemo(() => {
    if (!selectedExercise) return false;
    return isTimeBasedExercise(selectedExercise.name);
  }, [selectedExercise]);

  // Update form when editingPR changes
  useEffect(() => {
    if (editingPR) {
      setFormData({
        exercise_id: editingPR.exercise_id,
        weight: editingPR.weight || 0,
        reps: editingPR.reps || 1,
        duration: editingPR.duration || 0,
        date: new Date(editingPR.date).toISOString().split('T')[0],
        notes: editingPR.notes || ''
      });
    } else {
      setFormData({
        exercise_id: '',
        weight: 0,
        reps: 1,
        duration: 0,
        date: new Date().toISOString().split('T')[0],
        notes: ''
      });
    }
  }, [editingPR]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Ensure exercise_id is a number and valid
    const exerciseId = formData.exercise_id 
      ? (typeof formData.exercise_id === 'string' ? parseInt(formData.exercise_id) : formData.exercise_id)
      : null;
    
    if (!exerciseId || isNaN(exerciseId)) {
      setError(t('forms.validation.exerciseRequired'));
      return;
    }

    // Validation based on exercise type
    if (isTimeBased) {
      if (!formData.duration || formData.duration <= 0) {
        setError(t('forms.validation.durationRequired'));
        return;
      }
    } else {
      if (!formData.weight || formData.weight <= 0) {
        setError(t('forms.validation.weightRequired'));
        return;
      }
    }

    setLoading(true);
    try {
      const prData = {
        exercise_id: exerciseId,
        weight: isTimeBased ? 0 : (formData.weight || 0),
        reps: isTimeBased ? 1 : (formData.reps || 1),
        duration: isTimeBased ? formData.duration : 0,
        date: new Date(formData.date).toISOString(),
        notes: formData.notes || ''
      };
      
      if (editingPR) {
        await axios.put(`/api/prs/${editingPR.id}`, prData);
      } else {
        await axios.post('/api/prs', prData);
      }
      onSuccess();
      onClose();
    } catch (err) {
      setError(t('forms.error.createFailed'));
      console.error('Error creating PR:', err);
      if (err.response) {
        console.error('Response data:', err.response.data);
        setError(err.response.data?.message || t('forms.error.createFailed'));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    let value;
    
    if (name === 'exercise_id') {
      // Convert to number for exercise_id
      value = e.target.value ? parseInt(e.target.value) : '';
    } else if (e.target.type === 'number') {
      value = name === 'weight' ? parseFloat(e.target.value) || 0 : parseInt(e.target.value) || 0;
    } else {
      value = e.target.value;
    }
    
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle time input (minutes and seconds)
  const handleTimeChange = (field, value) => {
    const numValue = parseInt(value) || 0;
    let totalSeconds = formData.duration;
    
    if (field === 'minutes') {
      const seconds = formData.duration % 60;
      totalSeconds = numValue * 60 + seconds;
    } else if (field === 'seconds') {
      const minutes = Math.floor(formData.duration / 60);
      totalSeconds = minutes * 60 + numValue;
    }
    
    setFormData({
      ...formData,
      duration: Math.max(0, totalSeconds)
    });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return { minutes: mins, seconds: secs };
  };

  const timeDisplay = formatTime(formData.duration);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{editingPR ? t('forms.pr.editTitle') : t('forms.pr.title')}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="pr-exercise">{t('forms.pr.exercise')} *</label>
            <select
              id="pr-exercise"
              name="exercise_id"
              value={formData.exercise_id || ''}
              onChange={handleChange}
              required
            >
              <option value="">{t('forms.pr.selectExercise')}</option>
              {exercises.map(exercise => (
                <option key={exercise.id} value={String(exercise.id)}>
                  {getTranslatedExerciseName(exercise.name, language)}
                </option>
              ))}
            </select>
          </div>

          {isTimeBased ? (
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="pr-minutes">{t('forms.pr.minutes')} *</label>
                <input
                  type="number"
                  id="pr-minutes"
                  name="minutes"
                  value={timeDisplay.minutes}
                  onChange={(e) => handleTimeChange('minutes', e.target.value)}
                  min="0"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="pr-seconds">{t('forms.pr.seconds')} *</label>
                <input
                  type="number"
                  id="pr-seconds"
                  name="seconds"
                  value={timeDisplay.seconds}
                  onChange={(e) => handleTimeChange('seconds', e.target.value)}
                  min="0"
                  max="59"
                  required
                />
              </div>
            </div>
          ) : (
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="pr-weight">{t('forms.pr.weight')} (kg) *</label>
                <input
                  type="number"
                  id="pr-weight"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  min="0"
                  step="0.5"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="pr-reps">{t('forms.pr.reps')}</label>
                <input
                  type="number"
                  id="pr-reps"
                  name="reps"
                  value={formData.reps}
                  onChange={handleChange}
                  min="1"
                  required
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="pr-date">{t('forms.pr.date')}</label>
            <input
              type="date"
              id="pr-date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="pr-notes">{t('forms.pr.notes')}</label>
            <textarea
              id="pr-notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="3"
              placeholder={t('forms.pr.notesPlaceholder')}
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              {t('forms.cancel')}
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? t('forms.saving') : (editingPR ? t('forms.update') : t('forms.create'))}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PRForm;
