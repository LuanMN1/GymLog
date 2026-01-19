import React, { useState } from 'react';
import axios from 'axios';
import ImageCropper from './ImageCropper';
import LanguageSelector from './LanguageSelector';
import './LandingPage.css';

const LandingPage = ({ onLogin, onGuestMode, t, language, changeLanguage }) => {
  const [isLogin, setIsLogin] = useState(true);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
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
      await axios.post('/api/auth/guest', {}, {
        withCredentials: true
      });
      onGuestMode();
    } catch (err) {
      setError(err.response?.data?.error || t('auth.error'));
    }
  };

  const scrollToForm = () => {
    setTimeout(() => {
      const formSection = document.getElementById('login-form-section');
      if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <div className="landing-page">
      {/* Header */}
      <header className="landing-header">
        <div className="landing-header-content">
          <div className="landing-logo-container">
            <img src={require('../assets/logo.png')} alt={t('app.title')} className="landing-logo" />
            <span className="landing-logo-text">{t('app.title')}</span>
          </div>
          <div className="landing-header-actions">
            <LanguageSelector language={language} onChange={changeLanguage} t={t} />
            <button onClick={scrollToForm} className="landing-signin-btn">
              {t('landing.signIn')}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="landing-hero">
        <div className="landing-hero-content">
          <div className="landing-hero-text">
            <h1 className="landing-hero-title">
              {t('landing.hero.title')}
            </h1>
            <p className="landing-hero-subtitle">
              {t('landing.hero.subtitle')}
            </p>
            <p className="landing-hero-description">
              {t('landing.hero.description')}
            </p>
            <button onClick={scrollToForm} className="landing-cta-primary">
              {t('landing.hero.cta')} →
            </button>
          </div>
          <div className="landing-hero-visual">
            <div className="landing-stats-circle">
              <div className="landing-stats-value">95%</div>
              <div className="landing-stats-label">{t('landing.hero.successRate')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="landing-features">
        <div className="landing-section-container">
          <h2 className="landing-section-title">
            {t('landing.features.title')}
          </h2>
          <p className="landing-section-subtitle">
            {t('landing.features.subtitle')}
          </p>
          <div className="landing-features-grid">
            <div className="landing-feature-card">
              <div className="landing-feature-icon">📊</div>
              <h3 className="landing-feature-title">{t('landing.features.tracking.title')}</h3>
              <p className="landing-feature-description">{t('landing.features.tracking.description')}</p>
            </div>
            <div className="landing-feature-card">
              <div className="landing-feature-icon">🎯</div>
              <h3 className="landing-feature-title">{t('landing.features.prs.title')}</h3>
              <p className="landing-feature-description">{t('landing.features.prs.description')}</p>
            </div>
            <div className="landing-feature-card">
              <div className="landing-feature-icon">💪</div>
              <h3 className="landing-feature-title">{t('landing.features.routines.title')}</h3>
              <p className="landing-feature-description">{t('landing.features.routines.description')}</p>
            </div>
            <div className="landing-feature-card">
              <div className="landing-feature-icon">📈</div>
              <h3 className="landing-feature-title">{t('landing.features.stats.title')}</h3>
              <p className="landing-feature-description">{t('landing.features.stats.description')}</p>
            </div>
            <div className="landing-feature-card">
              <div className="landing-feature-icon">🌍</div>
              <h3 className="landing-feature-title">{t('landing.features.multilang.title')}</h3>
              <p className="landing-feature-description">{t('landing.features.multilang.description')}</p>
            </div>
            <div className="landing-feature-card">
              <div className="landing-feature-icon">📚</div>
              <h3 className="landing-feature-title">{t('landing.features.preset.title')}</h3>
              <p className="landing-feature-description">{t('landing.features.preset.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="landing-how-it-works">
        <div className="landing-section-container">
          <h2 className="landing-section-title">
            {t('landing.howItWorks.title')}
          </h2>
          <p className="landing-section-subtitle">
            {t('landing.howItWorks.subtitle')}
          </p>
          <div className="landing-steps">
            <div className="landing-step-card">
              <div className="landing-step-number">1</div>
              <div className="landing-step-icon">📝</div>
              <h3 className="landing-step-title">{t('landing.howItWorks.step1.title')}</h3>
              <p className="landing-step-description">{t('landing.howItWorks.step1.description')}</p>
            </div>
            <div className="landing-step-card">
              <div className="landing-step-number">2</div>
              <div className="landing-step-icon">🏋️</div>
              <h3 className="landing-step-title">{t('landing.howItWorks.step2.title')}</h3>
              <p className="landing-step-description">{t('landing.howItWorks.step2.description')}</p>
            </div>
            <div className="landing-step-card">
              <div className="landing-step-number">3</div>
              <div className="landing-step-icon">📊</div>
              <h3 className="landing-step-title">{t('landing.howItWorks.step3.title')}</h3>
              <p className="landing-step-description">{t('landing.howItWorks.step3.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Data-Driven Section */}
      <section className="landing-data-driven">
        <div className="landing-section-container">
          <h2 className="landing-section-title">
            {t('landing.data.title')}
          </h2>
          <p className="landing-section-subtitle">
            {t('landing.data.subtitle')}
          </p>
          <div className="landing-metrics">
            <div className="landing-metric-box">
              <div className="landing-metric-gauge">
                <div className="landing-metric-value">88%</div>
                <div className="landing-metric-label">{t('landing.data.consistency')}</div>
              </div>
            </div>
            <div className="landing-metric-factors">
              <div className="landing-metric-factor">
                <div className="landing-metric-factor-icon">🎯</div>
                <div className="landing-metric-factor-content">
                  <h4>{t('landing.data.factor1.title')}</h4>
                  <p>{t('landing.data.factor1.description')}</p>
                </div>
              </div>
              <div className="landing-metric-factor">
                <div className="landing-metric-factor-icon">📈</div>
                <div className="landing-metric-factor-content">
                  <h4>{t('landing.data.factor2.title')}</h4>
                  <p>{t('landing.data.factor2.description')}</p>
                </div>
              </div>
              <div className="landing-metric-factor">
                <div className="landing-metric-factor-icon">📅</div>
                <div className="landing-metric-factor-content">
                  <h4>{t('landing.data.factor3.title')}</h4>
                  <p>{t('landing.data.factor3.description')}</p>
                </div>
              </div>
              <div className="landing-metric-factor">
                <div className="landing-metric-factor-icon">💪</div>
                <div className="landing-metric-factor-content">
                  <h4>{t('landing.data.factor4.title')}</h4>
                  <p>{t('landing.data.factor4.description')}</p>
                </div>
              </div>
            </div>
          </div>
          <button onClick={scrollToForm} className="landing-cta-secondary">
            {t('landing.data.cta')}
          </button>
        </div>
      </section>

      {/* Login/Register Form Section */}
      <section id="login-form-section" className="landing-form-section">
        <div className="landing-form-container">
          <h2 className="landing-form-title">
            {t('landing.form.title')}
          </h2>
          <p className="landing-form-subtitle">
            {t('landing.form.subtitle')}
          </p>

          <div className="landing-form-tabs">
            <button
              className={`landing-tab-button ${isLogin ? 'active' : ''}`}
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
              className={`landing-tab-button ${!isLogin ? 'active' : ''}`}
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

          <form onSubmit={handleSubmit} className="landing-form">
            {!isLogin && (
              <div className="landing-form-group">
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
            
            <div className="landing-form-group">
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

            <div className="landing-form-group">
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
                <div className="landing-form-group">
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
                <div className="landing-form-group">
                  <label>{t('auth.profilePicture')}</label>
                  <div className="landing-avatar-upload-section">
                    {avatarPreview ? (
                      <div className="landing-avatar-preview-container">
                        <img src={avatarPreview} alt="Preview" className="landing-avatar-preview" />
                        <button
                          type="button"
                          className="landing-btn-change-avatar"
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
                        <label htmlFor="avatar-upload" className="landing-btn-upload-avatar">
                          {t('auth.uploadPhoto')}
                        </label>
                      </>
                    )}
                  </div>
                </div>
              </>
            )}

            {error && <div className="landing-error-message">{error}</div>}

            <button type="submit" className="landing-submit-button" disabled={loading}>
              {loading ? t('auth.loading') : (isLogin ? t('auth.login') : t('auth.register'))}
            </button>
          </form>

          <div className="landing-guest-section">
            <div className="landing-divider">
              <span>{t('auth.or')}</span>
            </div>
            <button onClick={handleGuestMode} className="landing-guest-button">
              {t('auth.guestMode')}
            </button>
            <p className="landing-guest-description">{t('auth.guestDescription')}</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="landing-footer-content">
          <div className="landing-footer-logo">
            <img src={require('../assets/logo.png')} alt={t('app.title')} className="landing-footer-logo-img" />
            <span>{t('app.title')}</span>
          </div>
          <p className="landing-footer-text">{t('landing.footer.text')}</p>
        </div>
      </footer>

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

export default LandingPage;
