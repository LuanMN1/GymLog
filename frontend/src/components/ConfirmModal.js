import React from 'react';
import { useLanguage } from '../App';
import './Form.css';

const ConfirmModal = ({ title, message, onConfirm, onCancel, confirmText, cancelText }) => {
  const { t } = useLanguage();

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content confirm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="close-btn" onClick={onCancel}>×</button>
        </div>
        
        <div className="modal-body">
          <p>{message}</p>
        </div>

        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={onCancel}>
            {cancelText || t('forms.cancel')}
          </button>
          <button type="button" className="btn-primary btn-danger" onClick={onConfirm}>
            {confirmText || t('common.confirm')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;

