import React, { useState } from 'react';
import { useLanguage } from '../App';
import axios from 'axios';
import './Form.css';

const ExerciseForm = ({ onClose, onSuccess }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    category: 'Other',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const categories = ['Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core', 'Cardio', 'Other'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.name.trim()) {
      setError(t('forms.validation.nameRequired'));
      return;
    }

    setLoading(true);
    try {
      await axios.post('/api/exercises', formData);
      onSuccess();
      onClose();
    } catch (err) {
      setError(t('forms.error.createFailed'));
      console.error('Error creating exercise:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{t('forms.exercise.title')}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="name">{t('forms.exercise.name')} *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder={t('forms.exercise.namePlaceholder')}
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">{t('forms.exercise.category')}</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">{t('forms.exercise.description')}</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder={t('forms.exercise.descriptionPlaceholder')}
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

export default ExerciseForm;

