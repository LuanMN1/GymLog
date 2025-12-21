import React, { useState, useEffect, createContext, useContext } from 'react';
import './App.css';
import axios from 'axios';
import { translations } from './i18n/translations';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('gymlog-language') || 'en';
  });

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('gymlog-language', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

function App() {
  const { t, language, changeLanguage } = useLanguage();
  const [exercises, setExercises] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [prs, setPRs] = useState([]);
  const [activeTab, setActiveTab] = useState('exercises');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [exRes, workoutsRes, prsRes] = await Promise.all([
        axios.get('/api/exercises'),
        axios.get('/api/workouts'),
        axios.get('/api/prs')
      ]);
      setExercises(exRes.data);
      setWorkouts(workoutsRes.data);
      setPRs(prsRes.data);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      ...(language === 'en' ? {} : { locale: language === 'pt-BR' ? 'pt-BR' : 'pt-PT' })
    };
    return date.toLocaleDateString(language === 'en' ? 'en-US' : (language === 'pt-BR' ? 'pt-BR' : 'pt-PT'), options);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <div>
            <h1>💪 {t('app.title')}</h1>
            <p>{t('app.subtitle')}</p>
          </div>
          <div className="language-switcher">
            <button 
              className={language === 'en' ? 'active' : ''}
              onClick={() => changeLanguage('en')}
              title="English"
            >
              🇬🇧 EN
            </button>
            <button 
              className={language === 'pt-BR' ? 'active' : ''}
              onClick={() => changeLanguage('pt-BR')}
              title="Português Brasil"
            >
              🇧🇷 PT-BR
            </button>
            <button 
              className={language === 'pt-PT' ? 'active' : ''}
              onClick={() => changeLanguage('pt-PT')}
              title="Português Portugal"
            >
              🇵🇹 PT-PT
            </button>
          </div>
        </div>
      </header>

      <nav className="tabs">
        <button 
          className={activeTab === 'exercises' ? 'active' : ''}
          onClick={() => setActiveTab('exercises')}
        >
          {t('nav.exercises')}
        </button>
        <button 
          className={activeTab === 'workouts' ? 'active' : ''}
          onClick={() => setActiveTab('workouts')}
        >
          {t('nav.workouts')}
        </button>
        <button 
          className={activeTab === 'prs' ? 'active' : ''}
          onClick={() => setActiveTab('prs')}
        >
          {t('nav.prs')}
        </button>
      </nav>

      <main className="content">
        {activeTab === 'exercises' && (
          <div className="section">
            <h2>{t('exercises.title')}</h2>
            {exercises.length === 0 ? (
              <p>{t('exercises.empty')}</p>
            ) : (
              <div className="grid">
                {exercises.map(ex => (
                  <div key={ex.id} className="card">
                    <h3>{ex.name}</h3>
                    <p className="categoria">{t('exercises.category')}: {ex.category}</p>
                    {ex.description && <p>{ex.description}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'workouts' && (
          <div className="section">
            <h2>{t('workouts.title')}</h2>
            {workouts.length === 0 ? (
              <p>{t('workouts.empty')}</p>
            ) : (
              <div className="treinos-list">
                {workouts.map(workout => (
                  <div key={workout.id} className="treino-card">
                    <h3>{workout.name}</h3>
                    <p className="data">{formatDate(workout.date)}</p>
                    <div className="exercicios-treino">
                      {workout.exercises.map((ex, idx) => (
                        <div key={idx} className="exercicio-item">
                          <strong>{ex.name}</strong>
                          <span>{ex.sets}{t('common.sets')} x {ex.reps}{t('common.reps')} - {ex.weight}{t('common.weight')}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'prs' && (
          <div className="section">
            <h2>{t('prs.title')}</h2>
            {prs.length === 0 ? (
              <p>{t('prs.empty')}</p>
            ) : (
              <div className="grid">
                {prs.map(pr => (
                  <div key={pr.id} className="card pr-card">
                    <h3>{pr.exercise_name}</h3>
                    <p className="pr-value">{pr.weight}{t('common.weight')} x {pr.reps} {t('prs.reps')}</p>
                    <p className="data">{formatDate(pr.date)}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

function AppWithProvider() {
  return (
    <LanguageProvider>
      <App />
    </LanguageProvider>
  );
}

export default AppWithProvider;

