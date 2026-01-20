import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ImageCropper from './ImageCropper';
import LanguageSelector from './LanguageSelector';
import './LoginScreen.css';

const LoginScreen = ({ onLogin, onGuestMode, onBack, initialMode = 'login', t, language, changeLanguage }) => {
  const [isLogin, setIsLogin] = useState(() => initialMode !== 'register');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsLogin(initialMode !== 'register');
    setError('');
  }, [initialMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        // Login
        const response = await axios.post('/api/auth/login', {
          email,
          password
        }, {
          withCredentials: true
        });
        
        if (response.data.user) {
          onLogin(response.data.user);
        }
      } else {
        // Register
        if (password !== confirmPassword) {
          setError(t('auth.passwordsDoNotMatch'));
          setLoading(false);
          return;
        }

        const response = await axios.post('/api/auth/register', {
          email,
          password,
          username: username.trim() || null,
          avatar: avatar
        }, {
          withCredentials: true
        });
        
        if (response.data.user) {
          onLogin(response.data.user);
        }
      }
    } catch (err) {
      setError(err.response?.data?.error || t('auth.error'));
    } finally {
      setLoading(false);
    }
  };

  const handleGuestMode = async () => {
    try {
      await onGuestMode?.();
    } catch (err) {
      setError(err?.message || err.response?.data?.error || t('auth.error'));
    }
  };

  return (
    <div className="login-screen">
      <div className="login-container">
        <div className="login-topbar">
          <button
            type="button"
            onClick={onBack || (() => {})}
            className="login-back-btn"
          >
            ← {language === 'en' ? 'Back' : 'Voltar'}
          </button>
          {language && changeLanguage && (
            <LanguageSelector language={language} onChange={changeLanguage} t={t} />
          )}
        </div>

        <div className="login-header">
          <img src={require('../assets/logo.png')} alt={t('app.title')} className="login-logo" />
          <h1>{t('app.title')}</h1>
          <p className="login-subtitle">{t('auth.subtitle')}</p>
        </div>

        <div className="login-tabs">
          <button
            className={`tab-button ${isLogin ? 'active' : ''}`}
            onClick={() => {
              setIsLogin(true);
              setError('');
              setEmail('');
              setPassword('');
              setConfirmPassword('');
            }}
          >
            {t('auth.login')}
          </button>
          <button
            className={`tab-button ${!isLogin ? 'active' : ''}`}
            onClick={() => {
              setIsLogin(false);
              setError('');
              setEmail('');
              setPassword('');
              setConfirmPassword('');
              setUsername('');
              setAvatar(null);
              setAvatarPreview(null);
            }}
          >
            {t('auth.register')}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="username">{t('auth.username')}</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={t('auth.usernamePlaceholder')}
              />
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="email">{t('auth.email')}</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder={t('auth.emailPlaceholder')}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">{t('auth.password')}</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder={t('auth.passwordPlaceholder')}
              minLength={isLogin ? 1 : 6}
            />
          </div>

          {!isLogin && (
            <>
              <div className="form-group">
                <label htmlFor="confirmPassword">{t('auth.confirmPassword')}</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder={t('auth.confirmPasswordPlaceholder')}
                  minLength={6}
                />
              </div>
              <div className="form-group">
                <label>{t('auth.profilePicture')}</label>
                <div className="avatar-upload-section">
                  {avatarPreview ? (
                    <div className="avatar-preview-container">
                      <img src={avatarPreview} alt="Preview" className="avatar-preview" />
                      <button
                        type="button"
                        className="btn-change-avatar"
                        onClick={() => {
                          setAvatarPreview(null);
                          setAvatar(null);
                          setSelectedImage(null);
                        }}
                      >
                        {t('auth.changePhoto')}
                      </button>
                    </div>
                  ) : (
                    <>
                      <input
                        type="file"
                        id="avatar-upload"
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
                      <label htmlFor="avatar-upload" className="btn-upload-avatar">
                        {t('auth.uploadPhoto')}
                      </label>
                    </>
                  )}
                </div>
              </div>
            </>
          )}

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? t('auth.loading') : (isLogin ? t('auth.login') : t('auth.register'))}
          </button>
        </form>

        <div className="guest-section">
          <div className="divider">
            <span>{t('auth.or')}</span>
          </div>
          <button onClick={handleGuestMode} className="guest-button">
            {t('auth.guestMode')}
          </button>
          <p className="guest-description">{t('auth.guestDescription')}</p>
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
    </div>
  );
};

export default LoginScreen;

