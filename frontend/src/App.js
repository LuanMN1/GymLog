import React, { useState, useEffect, createContext, useContext } from 'react';
import './App.css';
import axios from 'axios';
import { translations } from './i18n/translations';
import { getTranslatedExerciseName } from './i18n/exerciseTranslations';
import ExerciseForm from './components/ExerciseForm';
import PRForm from './components/PRForm';
import RoutineForm from './components/RoutineForm';
import ExerciseDetailModal from './components/ExerciseDetailModal';

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
  const [prs, setPRs] = useState([]);
  const [routines, setRoutines] = useState([]);
  const [activeTab, setActiveTab] = useState('exercises');
  const [showExerciseForm, setShowExerciseForm] = useState(false);
  const [showPRForm, setShowPRForm] = useState(false);
  const [showRoutineForm, setShowRoutineForm] = useState(false);
  const [editingRoutine, setEditingRoutine] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [exerciseFilter, setExerciseFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // 2 linhas x 3 colunas (3 em cima, 3 embaixo)

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [exRes, prsRes, routinesRes] = await Promise.all([
        axios.get('/api/exercises'),
        axios.get('/api/prs'),
        axios.get('/api/routines')
      ]);
      setExercises(exRes.data);
      setPRs(prsRes.data);
      setRoutines(routinesRes.data);
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

  const getFilteredExercises = () => {
    let filtered = [];
    
    if (exerciseFilter === 'all') {
      filtered = exercises;
    } else if (exerciseFilter === 'upper') {
      filtered = exercises.filter(ex => 
        ['Chest', 'Back', 'Biceps', 'Triceps', 'Shoulders', 'Forearms'].includes(ex.category)
      );
    } else if (exerciseFilter === 'lower') {
      filtered = exercises.filter(ex => 
        ['Legs', 'Core'].includes(ex.category)
      );
    } else {
      filtered = exercises.filter(ex => ex.category === exerciseFilter);
    }
    
    return filtered;
  };

  const getPaginatedExercises = () => {
    const filtered = getFilteredExercises();
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filtered.slice(startIndex, endIndex);
  };

  const getTotalPages = () => {
    const filtered = getFilteredExercises();
    return Math.ceil(filtered.length / itemsPerPage);
  };

  const handleFilterChange = (filter) => {
    setExerciseFilter(filter);
    setCurrentPage(1); // Reset to first page when filter changes
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
          className={activeTab === 'prs' ? 'active' : ''}
          onClick={() => setActiveTab('prs')}
        >
          {t('nav.prs')}
        </button>
        <button 
          className={activeTab === 'routines' ? 'active' : ''}
          onClick={() => setActiveTab('routines')}
        >
          {t('nav.routines')}
        </button>
      </nav>

      <main className="content">
        {activeTab === 'exercises' && (
          <div className="section">
            <div className="section-header-with-button">
              <h2>{t('exercises.title')}</h2>
              <button className="btn-create" onClick={() => setShowExerciseForm(true)}>
                + {t('forms.exercise.title')}
              </button>
            </div>
            
            {exercises.length > 0 && (
              <div className="filters">
                <button 
                  className={`filter-btn ${exerciseFilter === 'all' ? 'active' : ''}`}
                  onClick={() => handleFilterChange('all')}
                >
                  {t('filters.all')}
                </button>
                <button 
                  className={`filter-btn ${exerciseFilter === 'upper' ? 'active' : ''}`}
                  onClick={() => handleFilterChange('upper')}
                >
                  {t('filters.upper')}
                </button>
                <button 
                  className={`filter-btn ${exerciseFilter === 'lower' ? 'active' : ''}`}
                  onClick={() => handleFilterChange('lower')}
                >
                  {t('filters.lower')}
                </button>
                <button 
                  className={`filter-btn ${exerciseFilter === 'Chest' ? 'active' : ''}`}
                  onClick={() => handleFilterChange('Chest')}
                >
                  {t('filters.chest')}
                </button>
                <button 
                  className={`filter-btn ${exerciseFilter === 'Back' ? 'active' : ''}`}
                  onClick={() => handleFilterChange('Back')}
                >
                  {t('filters.back')}
                </button>
                <button 
                  className={`filter-btn ${exerciseFilter === 'Biceps' ? 'active' : ''}`}
                  onClick={() => handleFilterChange('Biceps')}
                >
                  {t('filters.biceps')}
                </button>
                <button 
                  className={`filter-btn ${exerciseFilter === 'Triceps' ? 'active' : ''}`}
                  onClick={() => handleFilterChange('Triceps')}
                >
                  {t('filters.triceps')}
                </button>
                <button 
                  className={`filter-btn ${exerciseFilter === 'Legs' ? 'active' : ''}`}
                  onClick={() => handleFilterChange('Legs')}
                >
                  {t('filters.legs')}
                </button>
                <button 
                  className={`filter-btn ${exerciseFilter === 'Shoulders' ? 'active' : ''}`}
                  onClick={() => handleFilterChange('Shoulders')}
                >
                  {t('filters.shoulders')}
                </button>
                <button 
                  className={`filter-btn ${exerciseFilter === 'Forearms' ? 'active' : ''}`}
                  onClick={() => handleFilterChange('Forearms')}
                >
                  {t('filters.forearms')}
                </button>
                <button 
                  className={`filter-btn ${exerciseFilter === 'Core' ? 'active' : ''}`}
                  onClick={() => handleFilterChange('Core')}
                >
                  {t('filters.core')}
                </button>
              </div>
            )}
            
            {exercises.length === 0 ? (
              <p className="empty-message">{t('exercises.empty')}</p>
            ) : (
              <>
                {getFilteredExercises().length === 0 ? (
                  <p className="empty-message">{t('exercises.noResults')}</p>
                ) : (
                  <>
                    <div className="grid">
                      {getPaginatedExercises().map(ex => (
                        <div 
                          key={ex.id} 
                          className="card exercise-card"
                          onClick={() => setSelectedExercise(ex)}
                          style={{ cursor: 'pointer' }}
                        >
                          <h3>{getTranslatedExerciseName(ex.name, language)}</h3>
                          <p className="categoria">{t('exercises.category')}: {ex.category}</p>
                          {ex.description && <p>{ex.description}</p>}
                        </div>
                      ))}
                    </div>
                    
                    {getTotalPages() > 1 && (
                      <div className="pagination">
                        <button
                          className="pagination-btn"
                          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                          disabled={currentPage === 1}
                        >
                          {t('pagination.previous')}
                        </button>
                        
                        <div className="pagination-info">
                          {t('pagination.page')} {currentPage} {t('pagination.of')} {getTotalPages()}
                        </div>
                        
                        <button
                          className="pagination-btn"
                          onClick={() => setCurrentPage(prev => Math.min(getTotalPages(), prev + 1))}
                          disabled={currentPage === getTotalPages()}
                        >
                          {t('pagination.next')}
                        </button>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        )}

        {activeTab === 'prs' && (
          <div className="section">
            <div className="section-header-with-button">
              <h2>{t('prs.title')}</h2>
              <button 
                className="btn-create" 
                onClick={() => setShowPRForm(true)}
                disabled={exercises.length === 0}
                title={exercises.length === 0 ? t('prs.needExercises') : ''}
              >
                + {t('forms.pr.title')}
              </button>
            </div>
            {prs.length === 0 ? (
              <p className="empty-message">{t('prs.empty')}</p>
            ) : (
              <div className="grid">
                {prs.map(pr => (
                  <div key={pr.id} className="card pr-card">
                    <h3>{getTranslatedExerciseName(pr.exercise_name, language)}</h3>
                    <p className="pr-value">{pr.weight}{t('common.weight')} x {pr.reps} {t('prs.reps')}</p>
                    <p className="data">{formatDate(pr.date)}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'routines' && (
          <div className="section">
            <div className="section-header-with-button">
              <h2>{t('routines.title')}</h2>
              <button 
                className="btn-create" 
                onClick={() => {
                  setEditingRoutine(null);
                  setShowRoutineForm(true);
                }}
                disabled={exercises.length === 0}
                title={exercises.length === 0 ? t('routines.needExercises') : ''}
              >
                + {t('forms.routine.title')}
              </button>
            </div>
            {routines.length === 0 ? (
              <p className="empty-message">{t('routines.empty')}</p>
            ) : (
              <div className="routines-list">
                {routines.map(routine => (
                  <div key={routine.id} className="routine-card">
                    <div className="routine-header">
                      <div>
                        <h3>{routine.name}</h3>
                        {routine.description && <p className="routine-description">{routine.description}</p>}
                        <p className="data">{t('routines.created')}: {formatDate(routine.created_at)}</p>
                      </div>
                      <div className="routine-actions">
                        <button 
                          className="btn-edit"
                          onClick={() => {
                            setEditingRoutine(routine);
                            setShowRoutineForm(true);
                          }}
                          title={t('routines.edit')}
                        >
                          ✏️
                        </button>
                        <button 
                          className="btn-delete"
                          onClick={async () => {
                            if (window.confirm(t('routines.confirmDelete'))) {
                              try {
                                await axios.delete(`/api/routines/${routine.id}`);
                                loadData();
                              } catch (error) {
                                console.error('Error deleting routine:', error);
                                alert(t('routines.deleteError'));
                              }
                            }
                          }}
                          title={t('routines.delete')}
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                    <div className="routine-exercises">
                      <h4>{t('routines.exercises')} ({routine.exercises.length})</h4>
                      <div className="exercicios-treino">
                        {routine.exercises.map((ex, idx) => (
                          <div key={idx} className="exercicio-item">
                            <strong>{idx + 1}. {getTranslatedExerciseName(ex.name, language)}</strong>
                            <span>{ex.sets}{t('common.sets')} x {ex.reps}{t('common.reps')}</span>
                            {ex.notes && <p className="exercise-notes">{ex.notes}</p>}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {showExerciseForm && (
        <ExerciseForm
          onClose={() => setShowExerciseForm(false)}
          onSuccess={loadData}
        />
      )}

      {showPRForm && (
        <PRForm
          onClose={() => setShowPRForm(false)}
          onSuccess={loadData}
          exercises={exercises}
        />
      )}

      {showRoutineForm && (
        <RoutineForm
          onClose={() => {
            setShowRoutineForm(false);
            setEditingRoutine(null);
          }}
          onSuccess={loadData}
          exercises={exercises}
          routine={editingRoutine}
        />
      )}

      {selectedExercise && (
        <ExerciseDetailModal
          exercise={selectedExercise}
          onClose={() => setSelectedExercise(null)}
        />
      )}
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

