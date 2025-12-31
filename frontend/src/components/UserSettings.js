import React, { useState } from 'react';
import axios from 'axios';
import ImageCropper from './ImageCropper';
import ConfirmModal from './ConfirmModal';
import './UserSettings.css';

const iconUser = require('../assets/icons/icon-user.png');
const iconLock = require('../assets/icons/icon-lock.png');
const iconSettings = require('../assets/icons/icon-settings.png');
const iconClose = require('../assets/icons/icon-close.png');

const UserSettings = ({ user, onClose, onLogout, t, onUserUpdate }) => {
  const [activeTab, setActiveTab] = useState('account');
  const [username, setUsername] = useState(user?.username || '');
  const [avatar, setAvatar] = useState(user?.avatar || null);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || null);
  const [showCropper, setShowCropper] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleSaveProfile = async () => {
    setLoading(true);
    setMessage('');
    try {
      const response = await axios.put('/api/auth/profile', {
        username: username.trim() || null,
        avatar: avatar
      }, {
        withCredentials: true
      });
      
      if (response.data.user && onUserUpdate) {
        onUserUpdate(response.data.user);
      }
      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error updating profile. Please try again.');
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setDeleting(true);
    try {
      await axios.delete('/api/auth/account', {
        withCredentials: true
      });
      // Logout and redirect
      onLogout();
      setShowDeleteConfirm(false);
    } catch (error) {
      setMessage('Error deleting account. Please try again.');
      console.error('Error deleting account:', error);
      setShowDeleteConfirm(false);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="user-settings-overlay" onClick={onClose}>
      <div className="user-settings-modal" onClick={(e) => e.stopPropagation()}>
        <div className="settings-header">
          <h2>{t('userSettings.title')}</h2>
          <button className="settings-close" onClick={onClose}>
            <img src={iconClose} alt="Close" />
          </button>
        </div>

        <div className="settings-content">
          <div className="settings-sidebar">
            <button
              className={`settings-tab ${activeTab === 'account' ? 'active' : ''}`}
              onClick={() => setActiveTab('account')}
            >
              <img src={iconUser} alt="Account" className="tab-icon" />
              <span>{t('userSettings.account')}</span>
            </button>
            <button
              className={`settings-tab ${activeTab === 'security' ? 'active' : ''}`}
              onClick={() => setActiveTab('security')}
            >
              <img src={iconLock} alt="Security" className="tab-icon" />
              <span>{t('userSettings.security')}</span>
            </button>
            <button
              className={`settings-tab ${activeTab === 'preferences' ? 'active' : ''}`}
              onClick={() => setActiveTab('preferences')}
            >
              <img src={iconSettings} alt="Preferences" className="tab-icon" />
              <span>{t('userSettings.preferences')}</span>
            </button>
          </div>

          <div className="settings-main">
            {activeTab === 'account' && (
              <div className="settings-section">
                <h3>{t('userSettings.accountInfo')}</h3>
                <div className="settings-field">
                  <label>{t('userSettings.email')}</label>
                  <div className="settings-value">{user?.email || '-'}</div>
                </div>
                <div className="settings-field">
                  <label>{t('auth.username')}</label>
                  <input
                    type="text"
                    className="settings-input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder={t('auth.usernamePlaceholder')}
                  />
                </div>
                <div className="settings-field">
                  <label>{t('auth.profilePicture')}</label>
                  <div className="avatar-upload-section">
                    {avatarPreview ? (
                      <div className="avatar-preview-container">
                        <img src={avatarPreview} alt="Profile" className="avatar-preview" />
                        <button
                          type="button"
                          className="btn-change-avatar"
                          onClick={() => {
                            document.getElementById('avatar-upload-settings').click();
                          }}
                        >
                          {t('auth.changePhoto')}
                        </button>
                      </div>
                    ) : (
                      <>
                        <input
                          type="file"
                          id="avatar-upload-settings"
                          accept="image/*"
                          style={{ display: 'none' }}
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setSelectedImage(reader.result);
                                setShowCropper(true);
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                        <label htmlFor="avatar-upload-settings" className="btn-upload-avatar">
                          {t('auth.uploadPhoto')}
                        </label>
                      </>
                    )}
                  </div>
                </div>
                <div className="settings-field">
                  <label>{t('userSettings.memberSince')}</label>
                  <div className="settings-value">
                    {user?.created_at ? new Date(user.created_at).toLocaleDateString() : '-'}
                  </div>
                </div>
                {message && (
                  <div className={`settings-message ${message.includes('success') ? 'success' : 'error'}`}>
                    {message}
                  </div>
                )}
                <button
                  className="settings-button"
                  onClick={handleSaveProfile}
                  disabled={loading}
                >
                  {loading ? t('auth.loading') : t('userSettings.saveChanges')}
                </button>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="settings-section">
                <h3>{t('userSettings.changePassword')}</h3>
                <p className="settings-note">{t('userSettings.passwordNote')}</p>
                <div className="settings-field">
                  <label>{t('userSettings.currentPassword')}</label>
                  <input type="password" className="settings-input" disabled />
                </div>
                <div className="settings-field">
                  <label>{t('userSettings.newPassword')}</label>
                  <input type="password" className="settings-input" disabled />
                </div>
                <div className="settings-field">
                  <label>{t('userSettings.confirmNewPassword')}</label>
                  <input type="password" className="settings-input" disabled />
                </div>
                <button className="settings-button" disabled>
                  {t('userSettings.updatePassword')}
                </button>
              </div>
            )}

            {activeTab === 'preferences' && (
              <div className="settings-section">
                <h3>{t('userSettings.preferences')}</h3>
                <p className="settings-note">{t('userSettings.preferencesNote')}</p>
                <div className="settings-field">
                  <label>{t('userSettings.language')}</label>
                  <div className="settings-value">{t('userSettings.languageNote')}</div>
                </div>
              </div>
            )}

            <div className="settings-footer">
              <button className="settings-button-danger" onClick={onLogout}>
                {t('auth.logout')}
              </button>
              <button 
                className="settings-button-danger settings-button-delete" 
                onClick={() => setShowDeleteConfirm(true)}
                disabled={deleting}
              >
                {deleting ? t('auth.loading') : t('userSettings.deleteAccount')}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {showCropper && selectedImage && (
        <ImageCropper
          imageSrc={selectedImage}
          onCropComplete={(croppedImage) => {
            setAvatar(croppedImage);
            setAvatarPreview(croppedImage);
            setShowCropper(false);
            setSelectedImage(null);
          }}
          onCancel={() => {
            setShowCropper(false);
            setSelectedImage(null);
          }}
        />
      )}
      
      {showDeleteConfirm && (
        <ConfirmModal
          title={t('userSettings.deleteAccountTitle')}
          message={t('userSettings.deleteAccountMessage')}
          onConfirm={handleDeleteAccount}
          onCancel={() => setShowDeleteConfirm(false)}
          confirmText={t('userSettings.deleteAccountConfirm')}
          cancelText={t('forms.cancel')}
        />
      )}
    </div>
  );
};

export default UserSettings;


