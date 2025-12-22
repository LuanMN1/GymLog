import React, { useState } from 'react';
import { useLanguage } from '../App';
import axios from 'axios';
import { getTranslatedExerciseName } from '../i18n/exerciseTranslations';
import './Form.css';

const PRForm = ({ onClose, onSuccess, exercises }) => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    exercise_id: exercises[0]?.id || 0,
    weight: 0,
    reps: 1,
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.exercise_id) {
      setError(t('forms.validation.exerciseRequired'));
      return;
    }

    if (formData.weight <= 0) {
      setError(t('forms.validation.weightRequired'));
      return;
    }

    setLoading(true);
    try {
      const prData = {
        ...formData,
        date: new Date(formData.date).toISOString()
      };
      await axios.post('/api/prs', prData);
      onSuccess();
      onClose();
    } catch (err) {
      setError(t('forms.error.createFailed'));
      console.error('Error creating PR:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const value = e.target.type === 'number' 
      ? (e.target.name === 'weight' ? parseFloat(e.target.value) || 0 : parseInt(e.target.value) || 0)
      : e.target.value;
    
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{t('forms.pr.title')}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="pr-exercise">{t('forms.pr.exercise')} *</label>
            <select
              id="pr-exercise"
              name="exercise_id"
              value={formData.exercise_id}
              onChange={handleChange}
              required
            >
              <option value="">{t('forms.pr.selectExercise')}</option>
              {exercises.map(exercise => (
                <option key={exercise.id} value={exercise.id}>
                  {getTranslatedExerciseName(exercise.name, language)}
                </option>
              ))}
            </select>
          </div>

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
              {loading ? t('forms.saving') : t('forms.create')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PRForm;

