import React from 'react';
import LanguageSelector from './LanguageSelector';
import './LandingPage.css';

const LandingPage = ({ onNavigateToLogin, onGuestMode, t, language, changeLanguage }) => {
  const goToLogin = (mode) => {
    if (onNavigateToLogin) onNavigateToLogin(mode);
  };

  return (
    <div className="landing-page">
      {/* Header */}
      <header className="landing-header">
        <div className="landing-header-content">
          <div className="landing-logo-container">
            <img src={require('../assets/logo.png')} alt={t('app.title')} className="landing-logo" />
          </div>
          <div className="landing-header-actions">
            <LanguageSelector language={language} onChange={changeLanguage} t={t} />
            <button onClick={() => goToLogin('login')} className="landing-signin-btn">
              {t('auth.login')}
            </button>
            <button onClick={() => goToLogin('register')} className="landing-signin-btn">
              {t('auth.register')}
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
            <button onClick={() => goToLogin('register')} className="landing-cta-primary">
              {t('landing.hero.cta')} →
            </button>
          </div>
          <div className="landing-hero-visual">
            <div className="landing-stats-circle">
              <div className="landing-stats-value">95%</div>
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
          <button onClick={() => goToLogin('register')} className="landing-cta-secondary">
            {t('landing.data.cta')}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="landing-footer-content">
          <div className="landing-footer-logo">
            <img src={require('../assets/logo.png')} alt={t('app.title')} className="landing-footer-logo-img" />
          </div>
          <p className="landing-footer-text">{t('landing.footer.text')}</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
