import React from 'react';
import { useLanguage } from '../App';
import './Form.css';

const ConfirmModal = ({ title, message, onConfirm, onCancel, confirmText, cancelText, isSuccess = false }) => {
  const { t } = useLanguage();

  const handleOverlayClick = () => {
    if (onCancel) {
      onCancel();
    } else if (onConfirm) {
      onConfirm();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content confirm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          {onCancel && (
            <button className="close-btn" onClick={onCancel}>×</button>
          )}
        </div>
        
        <div className="modal-body">
          <p>{message}</p>
        </div>

        <div className="form-actions">
          {cancelText && (
            <button type="button" className="btn-secondary" onClick={onCancel}>
              {cancelText}
            </button>
          )}
          <button 
            type="button" 
            className={isSuccess ? "btn-primary" : "btn-primary btn-danger"} 
            onClick={onConfirm}
          >
            {confirmText || t('common.confirm')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;

