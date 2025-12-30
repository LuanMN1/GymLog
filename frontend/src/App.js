import React, { useState, useEffect, createContext, useContext } from 'react';
import './App.css';
import axios from 'axios';
import { translations } from './i18n/translations';
import { getTranslatedExerciseName } from './i18n/exerciseTranslations';
import { isTimeBasedExercise } from './utils/exerciseTypes';
import ExerciseForm from './components/ExerciseForm';
import PRForm from './components/PRForm';
import RoutineForm from './components/RoutineForm';
import ExerciseDetailModal from './components/ExerciseDetailModal';
import StartRoutineModal from './components/StartRoutineModal';
import ExecuteRoutineModal from './components/ExecuteRoutineModal';
import PresetRoutineModal from './components/PresetRoutineModal';
import WorkoutSetsModal from './components/WorkoutSetsModal';
import ConfirmModal from './components/ConfirmModal';
import { presetRoutines } from './data/presetRoutines';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

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
  const [workouts, setWorkouts] = useState([]);
  const [activeTab, setActiveTab] = useState('exercises');
  const [showExerciseForm, setShowExerciseForm] = useState(false);
  const [showPRForm, setShowPRForm] = useState(false);
  const [editingPR, setEditingPR] = useState(null);
  const [showRoutineForm, setShowRoutineForm] = useState(false);
  const [editingRoutine, setEditingRoutine] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [selectedRoutine, setSelectedRoutine] = useState(null);
  const [showStartRoutineModal, setShowStartRoutineModal] = useState(false);
  const [showExecuteRoutineModal, setShowExecuteRoutineModal] = useState(false);
  const [selectedPresetRoutine, setSelectedPresetRoutine] = useState(null);
  const [showWorkoutSetsModal, setShowWorkoutSetsModal] = useState(false);
  const [selectedWorkoutExercise, setSelectedWorkoutExercise] = useState(null);
  const [expandedRoutines, setExpandedRoutines] = useState(new Set());
  const [exerciseFilter, setExerciseFilter] = useState('all');
  const [historyFilter, setHistoryFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showConfirmDeletePR, setShowConfirmDeletePR] = useState(false);
  const [prToDelete, setPrToDelete] = useState(null);
  const [historyPage, setHistoryPage] = useState(1);
  const itemsPerPage = 6; // 2 linhas x 3 colunas (3 em cima, 3 embaixo)
  const historyItemsPerPage = 3; // Máximo 3 treinos por página no histórico

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [exRes, prsRes, routinesRes, workoutsRes] = await Promise.all([
        axios.get('/api/exercises'),
        axios.get('/api/prs'),
        axios.get('/api/routines'),
        axios.get('/api/workouts')
      ]);
      setExercises(exRes.data);
      setPRs(prsRes.data);
      setRoutines(routinesRes.data);
      setWorkouts(workoutsRes.data);
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

  // Função para obter nome e descrição traduzidos de uma rotina
  const getTranslatedRoutine = (routine) => {
    if (routine.preset_id) {
      const presetRoutine = presetRoutines.find(pr => pr.id === routine.preset_id);
      if (presetRoutine) {
        return {
          name: language === 'en' ? presetRoutine.name : presetRoutine.namePt,
          description: language === 'en' ? presetRoutine.descriptionEn : presetRoutine.description
        };
      }
    }
    // Se não for rotina pré-montada, retorna os valores originais
    return {
      name: routine.name,
      description: routine.description
    };
  };

  // Memoizar rotinas traduzidas para garantir atualização quando o idioma mudar
  const translatedRoutines = React.useMemo(() => {
    return routines.map(routine => ({
      ...routine,
      translated: getTranslatedRoutine(routine)
    }));
  }, [routines, language]);

  // Função para obter nome traduzido de um workout
  const getTranslatedWorkout = (workout) => {
    // Se tiver preset_id, usa diretamente
    if (workout.preset_id) {
      const presetRoutine = presetRoutines.find(pr => pr.id === workout.preset_id);
      if (presetRoutine) {
        return language === 'en' ? presetRoutine.name : presetRoutine.namePt;
      }
    }
    
    // Tenta fazer match do nome do workout com rotinas pré-montadas
    // Remove prefixos como "Workout A -", "Workout B -", "Workout C -", etc.
    const workoutNameClean = workout.name.replace(/^Workout\s+[A-Z]\s*-\s*/i, '').trim();
    
    // Procura por correspondência exata ou parcial no nome
    const matchingPreset = presetRoutines.find(pr => {
      const presetNameEn = pr.name.toLowerCase();
      const presetNamePt = pr.namePt.toLowerCase();
      const workoutNameLower = workoutNameClean.toLowerCase();
      
      // Verifica se o nome do workout contém o nome da rotina ou vice-versa
      return presetNameEn === workoutNameLower || 
             presetNamePt === workoutNameLower ||
             workoutNameLower.includes(presetNameEn) ||
             workoutNameLower.includes(presetNamePt) ||
             presetNameEn.includes(workoutNameLower) ||
             presetNamePt.includes(workoutNameLower);
    });
    
    if (matchingPreset) {
      return language === 'en' ? matchingPreset.name : matchingPreset.namePt;
    }
    
    // Se não encontrar correspondência, retorna o nome original
    return workout.name;
  };

  const getCategoryTranslation = (category) => {
    const categoryMap = {
      'Chest': t('filters.chest'),
      'Back': t('filters.back'),
      'Biceps': t('filters.biceps'),
      'Triceps': t('filters.triceps'),
      'Legs': t('filters.legs'),
      'Shoulders': t('filters.shoulders'),
      'Forearms': t('filters.forearms'),
      'Core': t('filters.core')
    };
    return categoryMap[category] || category;
  };

  // Função para traduzir observações de exercícios
  const getTranslatedExerciseNote = (note, exerciseName, presetId = null) => {
    if (!note || note.trim() === '') return note;

    // Mapeamento de traduções comuns
    const noteTranslations = {
      'Heavy': language === 'en' ? 'Heavy' : 'Pesado',
      'Pesado': language === 'en' ? 'Heavy' : 'Pesado',
      'Seconds': language === 'en' ? 'Seconds' : 'Segundos',
      'Segundos': language === 'en' ? 'Seconds' : 'Segundos',
      'Watch your form!': language === 'en' ? 'Watch your form!' : 'Cuidado com a forma!',
      'Cuidado com a forma!': language === 'en' ? 'Watch your form!' : 'Cuidado com a forma!',
      'Each side': language === 'en' ? 'Each side' : 'Cada lado',
      'Cada lado': language === 'en' ? 'Each side' : 'Cada lado',
      'Each leg': language === 'en' ? 'Each leg' : 'Cada perna',
      'Cada perna': language === 'en' ? 'Each leg' : 'Cada perna',
      'Warm-up: 1 light set': language === 'en' ? 'Warm-up: 1 light set' : 'Aquecimento: 1 série leve',
      'Aquecimento: 1 série leve': language === 'en' ? 'Warm-up: 1 light set' : 'Aquecimento: 1 série leve'
    };

    // Verifica se há tradução direta
    if (noteTranslations[note]) {
      return noteTranslations[note];
    }

    // Se tiver preset_id, busca primeiro na rotina pré-montada específica
    if (presetId) {
      const presetRoutine = presetRoutines.find(pr => pr.id === presetId);
      if (presetRoutine) {
        for (const ex of presetRoutine.exercises) {
          if (ex.name === exerciseName) {
            // Verifica se a observação atual corresponde à versão em inglês ou português
            if (ex.notes === note && ex.notesPt) {
              return language === 'en' ? ex.notes : ex.notesPt;
            }
            if (ex.notesPt === note && ex.notes) {
              return language === 'en' ? ex.notes : ex.notesPt;
            }
          }
        }
      }
    }

    // Se não tiver preset_id ou não encontrar, busca em todas as rotinas pré-montadas
    for (const presetRoutine of presetRoutines) {
      for (const ex of presetRoutine.exercises) {
        if (ex.name === exerciseName) {
          // Verifica se a observação atual corresponde à versão em inglês ou português
          if (ex.notes === note && ex.notesPt) {
            return language === 'en' ? ex.notes : ex.notesPt;
          }
          if (ex.notesPt === note && ex.notes) {
            return language === 'en' ? ex.notes : ex.notesPt;
          }
        }
      }
    }

    // Se não encontrar tradução, retorna a observação original
    return note;
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

  const getFilteredWorkouts = () => {
    let filtered = workouts;
    
    if (historyFilter === 'all') {
      filtered = workouts;
    } else if (historyFilter === 'week') {
      // Últimos 7 dias
      const now = new Date();
      const weekAgo = new Date(now);
      weekAgo.setDate(weekAgo.getDate() - 7);
      filtered = workouts.filter(workout => {
        const workoutDate = new Date(workout.date);
        return workoutDate >= weekAgo;
      });
    } else if (historyFilter === 'month') {
      // Últimos 30 dias
      const now = new Date();
      const monthAgo = new Date(now);
      monthAgo.setDate(monthAgo.getDate() - 30);
      filtered = workouts.filter(workout => {
        const workoutDate = new Date(workout.date);
        return workoutDate >= monthAgo;
      });
    }
    
    return filtered;
  };

  const getPaginatedWorkouts = () => {
    const filtered = getFilteredWorkouts();
    const startIndex = (historyPage - 1) * historyItemsPerPage;
    const endIndex = startIndex + historyItemsPerPage;
    return filtered.slice(startIndex, endIndex);
  };

  const getHistoryTotalPages = () => {
    const filtered = getFilteredWorkouts();
    return Math.ceil(filtered.length / historyItemsPerPage);
  };

  const handleHistoryFilterChange = (filter) => {
    setHistoryFilter(filter);
    setHistoryPage(1); // Reset to first page when filter changes
  };

  const getHistoryStats = () => {
    const now = new Date();
    const weekAgo = new Date(now);
    weekAgo.setDate(weekAgo.getDate() - 7);
    const monthAgo = new Date(now);
    monthAgo.setDate(monthAgo.getDate() - 30);
    
    const thisWeek = workouts.filter(w => new Date(w.date) >= weekAgo).length;
    const thisMonth = workouts.filter(w => new Date(w.date) >= monthAgo).length;
    const totalExercises = workouts.reduce((sum, w) => sum + w.exercises.length, 0);
    
    return {
      total: workouts.length,
      thisWeek,
      thisMonth,
      totalExercises
    };
  };

  // Funções para preparar dados de progresso
  const getWorkoutVolumeData = () => {
    if (!workouts || workouts.length === 0) return [];
    
    const sortedWorkouts = [...workouts].sort((a, b) => new Date(a.date) - new Date(b.date));
    const volumeByDate = {};
    
    sortedWorkouts.forEach(workout => {
      if (!workout.date || !workout.exercises) return;
      
      // Normalizar data para agrupar por dia (sem hora)
      const workoutDate = new Date(workout.date);
      workoutDate.setHours(0, 0, 0, 0);
      const dateKey = workoutDate.getTime();
      const dateLabel = workoutDate.toLocaleDateString(language === 'en' ? 'en-US' : (language === 'pt-BR' ? 'pt-BR' : 'pt-PT'), { month: 'short', day: 'numeric' });
      
      let totalVolume = 0;
      
      workout.exercises.forEach(ex => {
        if (!ex) return;
        
        const isTimeBased = isTimeBasedExercise(ex.name);
        
        // Se tiver workout_sets, usar eles (dados mais precisos)
        if (ex.workout_sets && ex.workout_sets.length > 0) {
          ex.workout_sets.forEach(set => {
            if (set && !isTimeBased && set.weight && set.reps && set.weight > 0 && set.reps > 0) {
              totalVolume += parseFloat(set.weight) * parseInt(set.reps);
            }
          });
        } else {
          // Fallback: usar dados do WorkoutExercise (para treinos antigos ou sem séries individuais)
          if (!isTimeBased && ex.weight && ex.reps && ex.sets) {
            const weight = parseFloat(ex.weight) || 0;
            const reps = parseInt(ex.reps) || 0;
            const sets = parseInt(ex.sets) || 0;
            if (weight > 0 && reps > 0 && sets > 0) {
              totalVolume += weight * reps * sets;
            }
          }
        }
      });
      
      if (totalVolume > 0) {
        if (volumeByDate[dateKey]) {
          volumeByDate[dateKey].volume += totalVolume;
        } else {
          volumeByDate[dateKey] = { date: dateLabel, volume: totalVolume, timestamp: dateKey };
        }
      }
    });
    
    return Object.values(volumeByDate)
      .sort((a, b) => a.timestamp - b.timestamp)
      .map(({ date, volume }) => ({
        date,
        volume: Math.round(volume)
      }));
  };

  const getPRProgressData = () => {
    const sortedPRs = [...prs].sort((a, b) => new Date(a.date) - new Date(b.date));
    const prByExercise = {};
    
    sortedPRs.forEach(pr => {
      const exerciseName = getTranslatedExerciseName(pr.exercise_name, language);
      if (!prByExercise[exerciseName]) {
        prByExercise[exerciseName] = [];
      }
      
      const exercise = exercises.find(ex => ex.id === pr.exercise_id);
      const isTimeBased = exercise ? isTimeBasedExercise(exercise.name) : false;
      
      prByExercise[exerciseName].push({
        date: new Date(pr.date).toLocaleDateString(language === 'en' ? 'en-US' : (language === 'pt-BR' ? 'pt-BR' : 'pt-PT'), { month: 'short', day: 'numeric' }),
        value: isTimeBased && pr.duration ? pr.duration : pr.weight,
        reps: pr.reps,
        isTimeBased
      });
    });
    
    return prByExercise;
  };

  const getWorkoutsPerWeekData = () => {
    const workoutsByWeek = {};
    
    workouts.forEach(workout => {
      const date = new Date(workout.date);
      const weekStart = new Date(date);
      weekStart.setDate(date.getDate() - date.getDay());
      weekStart.setHours(0, 0, 0, 0);
      const weekKey = weekStart.getTime(); // Usar timestamp para ordenação
      const weekLabel = weekStart.toLocaleDateString(language === 'en' ? 'en-US' : (language === 'pt-BR' ? 'pt-BR' : 'pt-PT'), { month: 'short', day: 'numeric' });
      
      if (workoutsByWeek[weekKey]) {
        workoutsByWeek[weekKey].count++;
      } else {
        workoutsByWeek[weekKey] = { week: weekLabel, count: 1, timestamp: weekKey };
      }
    });
    
    return Object.values(workoutsByWeek)
      .sort((a, b) => a.timestamp - b.timestamp)
      .slice(-12) // Últimas 12 semanas
      .map(({ week, count }) => ({ week, count }));
  };

  const getTopExercisesData = () => {
    const exerciseCounts = {};
    
    workouts.forEach(workout => {
      workout.exercises.forEach(ex => {
        const exerciseName = getTranslatedExerciseName(ex.name, language);
        if (exerciseCounts[exerciseName]) {
          exerciseCounts[exerciseName]++;
        } else {
          exerciseCounts[exerciseName] = 1;
        }
      });
    });
    
    return Object.entries(exerciseCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10); // Top 10 exercícios
  };

  const getProgressStats = () => {
    const now = new Date();
    const weekAgo = new Date(now);
    weekAgo.setDate(weekAgo.getDate() - 7);
    const monthAgo = new Date(now);
    monthAgo.setDate(monthAgo.getDate() - 30);
    
    const recentWorkouts = workouts.filter(w => w && w.date && new Date(w.date) >= monthAgo);
    let totalVolume = 0;
    let totalSets = 0;
    
    recentWorkouts.forEach(workout => {
      if (!workout.exercises) return;
      
      workout.exercises.forEach(ex => {
        if (!ex) return;
        
        const isTimeBased = isTimeBasedExercise(ex.name);
        
        // Se tiver workout_sets, usar eles (dados mais precisos)
        if (ex.workout_sets && ex.workout_sets.length > 0) {
          ex.workout_sets.forEach(set => {
            if (set && !isTimeBased && set.weight && set.reps) {
              const weight = parseFloat(set.weight) || 0;
              const reps = parseInt(set.reps) || 0;
              if (weight > 0 && reps > 0) {
                totalVolume += weight * reps;
                totalSets++;
              }
            }
          });
        } else {
          // Fallback: usar dados do WorkoutExercise (para treinos antigos ou sem séries individuais)
          if (!isTimeBased && ex.weight && ex.reps && ex.sets) {
            const weight = parseFloat(ex.weight) || 0;
            const reps = parseInt(ex.reps) || 0;
            const sets = parseInt(ex.sets) || 0;
            if (weight > 0 && reps > 0 && sets > 0) {
              totalVolume += weight * reps * sets;
              totalSets += sets;
            }
          }
        }
      });
    });
    
    const avgVolumePerWorkout = recentWorkouts.length > 0 ? Math.round(totalVolume / recentWorkouts.length) : 0;
    const totalPRs = prs ? prs.length : 0;
    const recentPRs = prs ? prs.filter(pr => pr && pr.date && new Date(pr.date) >= monthAgo).length : 0;
    
    return {
      totalWorkouts: workouts ? workouts.length : 0,
      recentWorkouts: recentWorkouts.length,
      totalVolume: Math.round(totalVolume),
      avgVolumePerWorkout,
      totalSets,
      totalPRs,
      recentPRs
    };
  };

  const handleDeleteWorkout = async (workoutId) => {
    if (window.confirm(t('history.confirmDelete'))) {
      try {
        await axios.delete(`/api/workouts/${workoutId}`);
        loadData();
        alert(t('history.deleteSuccess'));
      } catch (error) {
        console.error('Error deleting workout:', error);
        alert(t('history.deleteError'));
      }
    }
  };

  const handleAddPresetRoutine = async (routineData) => {
    try {
      await axios.post('/api/routines', routineData);
      loadData();
      setSelectedPresetRoutine(null);
      alert(t('presetRoutines.addSuccess'));
    } catch (error) {
      console.error('Error adding preset routine:', error);
      alert(t('presetRoutines.addError'));
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <div className="logo-container">
            <img src={require('./assets/logo.png')} alt={t('app.title')} className="app-logo" />
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
          className={activeTab === 'presetRoutines' ? 'active' : ''}
          onClick={() => setActiveTab('presetRoutines')}
        >
          {t('nav.presetRoutines')}
        </button>
        <div className="tab-separator"></div>
        <button 
          className={activeTab === 'routines' ? 'active' : ''}
          onClick={() => setActiveTab('routines')}
        >
          {t('nav.routines')}
        </button>
        <button 
          className={activeTab === 'prs' ? 'active' : ''}
          onClick={() => setActiveTab('prs')}
        >
          {t('nav.prs')}
        </button>
        <button 
          className={activeTab === 'progress' ? 'active' : ''}
          onClick={() => setActiveTab('progress')}
        >
          {t('nav.progress')}
        </button>
        <button 
          className={activeTab === 'history' ? 'active' : ''}
          onClick={() => setActiveTab('history')}
        >
          {t('nav.history')}
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
                          <p className="categoria">{t('exercises.category')}: {getCategoryTranslation(ex.category)}</p>
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
                onClick={() => {
                  setEditingPR(null);
                  setShowPRForm(true);
                }}
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
                {prs.map(pr => {
                  const exercise = exercises.find(ex => ex.id === pr.exercise_id);
                  const isTimeBased = exercise ? isTimeBasedExercise(exercise.name) : false;
                  const formatDuration = (seconds) => {
                    if (seconds < 60) {
                      return `${seconds}${t('common.seconds')}`;
                    }
                    const minutes = Math.floor(seconds / 60);
                    const secs = seconds % 60;
                    return secs > 0 ? `${minutes}m ${secs}${t('common.seconds')}` : `${minutes}m`;
                  };
                  
                  return (
                    <div key={pr.id} className="card pr-card">
                      <div className="pr-card-header">
                        <div>
                          <h3>{getTranslatedExerciseName(pr.exercise_name, language)}</h3>
                          {isTimeBased && pr.duration > 0 ? (
                            <p className="pr-value">{formatDuration(pr.duration)}</p>
                          ) : (
                            <p className="pr-value">{pr.weight}{t('common.weight')} x {pr.reps} {t('prs.reps')}</p>
                          )}
                          <p className="data">{formatDate(pr.date)}</p>
                        </div>
                        <div className="pr-card-actions">
                          <button 
                            className="btn-edit"
                            onClick={() => {
                              setEditingPR(pr);
                              setShowPRForm(true);
                            }}
                            title={t('prs.edit')}
                          >
                            ✏️
                          </button>
                          <button 
                            className="btn-delete"
                            onClick={() => {
                              setPrToDelete(pr);
                              setShowConfirmDeletePR(true);
                            }}
                            title={t('prs.delete')}
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
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
                {translatedRoutines.map(({ translated, ...routine }) => (
                    <div key={routine.id} className="routine-card">
                    <div className="routine-header">
                      <div>
                        <h3>{translated.name}</h3>
                        {translated.description && <p className="routine-description">{translated.description}</p>}
                        <p className="data">{t('routines.created')}: {formatDate(routine.created_at)}</p>
                      </div>
                      <div className="routine-actions">
                        <button 
                          className="btn-start"
                          onClick={() => {
                            setSelectedRoutine(routine);
                            setShowStartRoutineModal(true);
                          }}
                          title={t('routines.registerRoutine')}
                        >
                          ▶️ {t('routines.registerRoutine')}
                        </button>
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
                      <div className="routine-exercises-header">
                        <h4>{t('routines.exercises')} ({routine.exercises.length})</h4>
                        <button
                          className="btn-toggle-exercises"
                          onClick={() => {
                            const newExpanded = new Set(expandedRoutines);
                            if (newExpanded.has(routine.id)) {
                              newExpanded.delete(routine.id);
                            } else {
                              newExpanded.add(routine.id);
                            }
                            setExpandedRoutines(newExpanded);
                          }}
                          title={expandedRoutines.has(routine.id) ? t('routines.hideExercises') : t('routines.showExercises')}
                        >
                          {expandedRoutines.has(routine.id) ? '▼' : '▶'}
                        </button>
                      </div>
                      {expandedRoutines.has(routine.id) && (
                        <div className="exercicios-treino">
                          {routine.exercises.map((ex, idx) => (
                            <div key={idx} className="exercicio-item">
                              <strong>{idx + 1}. {getTranslatedExerciseName(ex.name, language)}</strong>
                              <span>{ex.sets}{t('common.sets')} x {ex.reps}{t('common.reps')}</span>
                              {ex.notes && <p className="exercise-notes">{getTranslatedExerciseNote(ex.notes, ex.name)}</p>}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="section">
            <div className="section-header">
              <h2>{t('progress.title')}</h2>
            </div>
            
            <div className="progress-stats-grid">
              <div className="stat-card">
                <div className="stat-icon">💪</div>
                <div className="stat-content">
                  <div className="stat-value">{getProgressStats().totalWorkouts}</div>
                  <div className="stat-label">{t('progress.stats.totalWorkouts')}</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📊</div>
                <div className="stat-content">
                  <div className="stat-value">{getProgressStats().totalVolume.toLocaleString()}</div>
                  <div className="stat-label">{t('progress.stats.totalVolume')}</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🏆</div>
                <div className="stat-content">
                  <div className="stat-value">{getProgressStats().totalPRs}</div>
                  <div className="stat-label">{t('progress.stats.totalPRs')}</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📈</div>
                <div className="stat-content">
                  <div className="stat-value">{getProgressStats().avgVolumePerWorkout.toLocaleString()}</div>
                  <div className="stat-label">{t('progress.stats.avgVolume')}</div>
                </div>
              </div>
            </div>

            <div className="charts-container">
              <div className="chart-card">
                <h3>{t('progress.charts.volumeOverTime')}</h3>
                {getWorkoutVolumeData().length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={getWorkoutVolumeData()}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#3b82f6" opacity={0.3} />
                      <XAxis 
                        dataKey="date" 
                        stroke="#60a5fa"
                        style={{ fontSize: '12px' }}
                      />
                      <YAxis 
                        stroke="#60a5fa"
                        style={{ fontSize: '12px' }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1a1a1a', 
                          border: '1px solid #3b82f6',
                          borderRadius: '8px',
                          color: '#60a5fa'
                        }}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="volume" 
                        stroke="#3b82f6" 
                        strokeWidth={3}
                        dot={{ fill: '#60a5fa', r: 4 }}
                        name={t('progress.charts.volume')}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="empty-chart">{t('progress.charts.noData')}</p>
                )}
              </div>

              <div className="chart-card">
                <h3>{t('progress.charts.workoutsPerWeek')}</h3>
                {getWorkoutsPerWeekData().length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={getWorkoutsPerWeekData()}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#3b82f6" opacity={0.3} />
                      <XAxis 
                        dataKey="week" 
                        stroke="#60a5fa"
                        style={{ fontSize: '12px' }}
                      />
                      <YAxis 
                        stroke="#60a5fa"
                        style={{ fontSize: '12px' }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1a1a1a', 
                          border: '1px solid #3b82f6',
                          borderRadius: '8px',
                          color: '#60a5fa'
                        }}
                      />
                      <Legend />
                      <Bar 
                        dataKey="count" 
                        fill="#3b82f6"
                        name={t('progress.charts.workouts')}
                        radius={[8, 8, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="empty-chart">{t('progress.charts.noData')}</p>
                )}
              </div>

              <div className="chart-card">
                <h3>{t('progress.charts.topExercises')}</h3>
                {getTopExercisesData().length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={getTopExercisesData()} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#3b82f6" opacity={0.3} />
                      <XAxis 
                        type="number"
                        stroke="#60a5fa"
                        style={{ fontSize: '12px' }}
                      />
                      <YAxis 
                        type="category"
                        dataKey="name" 
                        stroke="#60a5fa"
                        style={{ fontSize: '12px' }}
                        width={150}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1a1a1a', 
                          border: '1px solid #3b82f6',
                          borderRadius: '8px',
                          color: '#60a5fa'
                        }}
                      />
                      <Legend />
                      <Bar 
                        dataKey="count" 
                        fill="#60a5fa"
                        name={t('progress.charts.timesPerformed')}
                        radius={[0, 8, 8, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="empty-chart">{t('progress.charts.noData')}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="section">
            <div className="section-header">
              <h2>{t('history.title')}</h2>
            </div>
            
            {workouts.length > 0 && (
              <>
                <div className="history-stats">
                  <div className="stat-card">
                    <div className="stat-icon">📊</div>
                    <div className="stat-content">
                      <div className="stat-value">{getHistoryStats().total}</div>
                      <div className="stat-label">{t('history.stats.total')}</div>
                    </div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon">📅</div>
                    <div className="stat-content">
                      <div className="stat-value">{getHistoryStats().thisWeek}</div>
                      <div className="stat-label">{t('history.stats.thisWeek')}</div>
                    </div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon">📆</div>
                    <div className="stat-content">
                      <div className="stat-value">{getHistoryStats().thisMonth}</div>
                      <div className="stat-label">{t('history.stats.thisMonth')}</div>
                    </div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon">💪</div>
                    <div className="stat-content">
                      <div className="stat-value">{getHistoryStats().totalExercises}</div>
                      <div className="stat-label">{t('history.stats.totalExercises')}</div>
                    </div>
                  </div>
                </div>

                <div className="filters-container history-filters">
                  <button
                    className={`filter-btn ${historyFilter === 'all' ? 'active' : ''}`}
                    onClick={() => handleHistoryFilterChange('all')}
                  >
                    {t('history.filters.all')}
                  </button>
                  <button
                    className={`filter-btn ${historyFilter === 'week' ? 'active' : ''}`}
                    onClick={() => handleHistoryFilterChange('week')}
                  >
                    {t('history.filters.week')}
                  </button>
                  <button
                    className={`filter-btn ${historyFilter === 'month' ? 'active' : ''}`}
                    onClick={() => handleHistoryFilterChange('month')}
                  >
                    {t('history.filters.month')}
                  </button>
                </div>
              </>
            )}

            {workouts.length === 0 ? (
              <p className="empty-message">{t('history.empty')}</p>
            ) : getFilteredWorkouts().length === 0 ? (
              <p className="empty-message">{t('history.noResults')}</p>
            ) : (
              <>
                <div className="workouts-list">
                  {getPaginatedWorkouts().map(workout => (
                  <div key={workout.id} className="workout-card">
                    <div className="workout-header">
                      <div>
                        <h3>{getTranslatedWorkout(workout)}</h3>
                        <p className="workout-date">{formatDate(workout.date)}</p>
                      </div>
                      <div className="workout-actions">
                        <button 
                          className="btn-delete-workout"
                          onClick={() => handleDeleteWorkout(workout.id)}
                          title={t('history.delete')}
                        >
                          🗑️ {t('history.delete')}
                        </button>
                      </div>
                    </div>
                    <div className="workout-exercises">
                      <h4>{t('history.exercises')} ({workout.exercises.length})</h4>
                      <div className="exercicios-treino">
                        {workout.exercises.map((ex, idx) => {
                          const isTimeBased = isTimeBasedExercise(ex.name);
                          const hasSets = ex.workout_sets && ex.workout_sets.length > 0;
                          return (
                            <div key={idx} className="exercicio-item">
                              <div className="exercise-item-header">
                                <strong>{idx + 1}. {getTranslatedExerciseName(ex.name, language)}</strong>
                                {hasSets && (
                                  <button
                                    className="btn-view-sets"
                                    onClick={() => {
                                      setSelectedWorkoutExercise({
                                        exercise: { id: ex.id, name: ex.name },
                                        workoutSets: ex.workout_sets
                                      });
                                      setShowWorkoutSetsModal(true);
                                    }}
                                    title={t('history.sets.viewDetails')}
                                  >
                                    📊 {t('history.sets.viewDetails')}
                                  </button>
                                )}
                              </div>
                              {isTimeBased ? (
                                <span>
                                  {ex.sets}{t('common.sets')} x {ex.duration || ex.reps}{t('common.seconds')}
                                </span>
                              ) : (
                                <span>
                                  {ex.sets}{t('common.sets')} x {ex.reps}{t('common.reps')} @ {ex.weight}{t('common.weight')}
                                </span>
                              )}
                              {ex.notes && <p className="exercise-notes">{getTranslatedExerciseNote(ex.notes, ex.name, workout.preset_id)}</p>}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  ))}
                </div>
                
                {getHistoryTotalPages() > 1 && (
                  <div className="pagination">
                    <button
                      className="pagination-btn"
                      onClick={() => setHistoryPage(prev => Math.max(1, prev - 1))}
                      disabled={historyPage === 1}
                    >
                      {t('pagination.previous')}
                    </button>
                    
                    <div className="pagination-info">
                      {t('pagination.page')} {historyPage} {t('pagination.of')} {getHistoryTotalPages()}
                    </div>
                    
                    <button
                      className="pagination-btn"
                      onClick={() => setHistoryPage(prev => Math.min(getHistoryTotalPages(), prev + 1))}
                      disabled={historyPage === getHistoryTotalPages()}
                    >
                      {t('pagination.next')}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {activeTab === 'presetRoutines' && (
          <div className="section">
            <div className="section-header">
              <h2>{t('presetRoutines.title')}</h2>
            </div>
            {presetRoutines.length === 0 ? (
              <p className="empty-message">{t('presetRoutines.empty')}</p>
            ) : (
              <div className="grid">
                {presetRoutines.map(routine => (
                  <div 
                    key={routine.id} 
                    className="card preset-routine-card"
                    onClick={() => setSelectedPresetRoutine(routine)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="preset-routine-header">
                      <h3>{language === 'en' ? routine.name : routine.namePt}</h3>
                      <div className="preset-routine-badges">
                        <span className="badge difficulty">{language === 'en' ? routine.difficulty : routine.difficultyPt}</span>
                        <span className="badge duration">{language === 'en' ? routine.durationEn : routine.duration}</span>
                      </div>
                    </div>
                    <p className="preset-routine-description">
                      {language === 'en' ? routine.descriptionEn : routine.description}
                    </p>
                    <div className="preset-routine-footer">
                      <span className="exercise-count">
                        💪 {routine.exercises.length} {t('presetRoutines.exercises')}
                      </span>
                      <span className="view-details">{t('presetRoutines.viewDetails')} →</span>
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
          onClose={() => {
            setShowPRForm(false);
            setEditingPR(null);
          }}
          onSuccess={loadData}
          exercises={exercises}
          editingPR={editingPR}
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

      {showStartRoutineModal && selectedRoutine && (
        <StartRoutineModal
          routine={selectedRoutine}
          onClose={() => {
            setShowStartRoutineModal(false);
            setSelectedRoutine(null);
          }}
          onStart={() => {
            setShowStartRoutineModal(false);
            setShowExecuteRoutineModal(true);
          }}
        />
      )}

      {showExecuteRoutineModal && selectedRoutine && (
        <ExecuteRoutineModal
          routine={selectedRoutine}
          onClose={() => {
            setShowExecuteRoutineModal(false);
            setSelectedRoutine(null);
          }}
          onComplete={() => {
            loadData();
          }}
        />
      )}

      {selectedPresetRoutine && (
        <PresetRoutineModal
          routine={selectedPresetRoutine}
          exercises={exercises}
          onClose={() => setSelectedPresetRoutine(null)}
          onAdd={handleAddPresetRoutine}
        />
      )}

      {showWorkoutSetsModal && selectedWorkoutExercise && (
        <WorkoutSetsModal
          exercise={selectedWorkoutExercise.exercise}
          workoutSets={selectedWorkoutExercise.workoutSets}
          onClose={() => {
            setShowWorkoutSetsModal(false);
            setSelectedWorkoutExercise(null);
          }}
        />
      )}

      {showConfirmDeletePR && prToDelete && (
        <ConfirmModal
          title={t('prs.delete')}
          message={t('prs.confirmDelete')}
          onConfirm={async () => {
            try {
              await axios.delete(`/api/prs/${prToDelete.id}`);
              loadData();
              setShowConfirmDeletePR(false);
              setPrToDelete(null);
            } catch (error) {
              console.error('Error deleting PR:', error);
              alert(t('prs.deleteError'));
            }
          }}
          onCancel={() => {
            setShowConfirmDeletePR(false);
            setPrToDelete(null);
          }}
          confirmText={t('common.delete')}
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

