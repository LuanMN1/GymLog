export const translations = {
  en: {
    app: {
      title: "GymLog",
      subtitle: "Workout Tracking System"
    },
    nav: {
      exercises: "Exercises",
      workouts: "Workouts",
      prs: "Personal Records",
      routines: "My Workout",
      history: "History",
      presetRoutines: "Preset Routines",
      gamification: "Challenges & Achievements"
    },
    exercises: {
      title: "Registered Exercises",
      empty: "No exercises registered yet.",
      category: "Category",
      noResults: "No exercises found for this filter."
    },
    filters: {
      all: "All",
      upper: "Upper Body",
      lower: "Lower Body",
      chest: "Chest",
      back: "Back",
      biceps: "Biceps",
      triceps: "Triceps",
      legs: "Legs",
      shoulders: "Shoulders",
      forearms: "Forearms",
      core: "Core/Abdomen"
    },
    pagination: {
      previous: "Previous",
      next: "Next",
      page: "Page",
      of: "of"
    },
    workouts: {
      title: "Registered Workouts",
      empty: "No workouts registered yet.",
      needExercises: "Create at least one exercise first"
    },
    prs: {
      title: "Personal Records (PRs)",
      empty: "No PRs registered yet.",
      reps: "reps",
      needExercises: "Create at least one exercise first",
      edit: "Edit",
      delete: "Delete",
      confirmDelete: "Are you sure you want to delete this PR?",
      deleteError: "Failed to delete PR"
    },
    exerciseDetail: {
      category: "Category",
      description: "Description",
      targetMuscles: "Target Muscles",
      tutorial: "Exercise Tutorial",
      howTo: "How to Perform",
      imageUnavailable: "Tutorial image not available",
      close: "Close"
    },
    forms: {
      create: "Create",
      update: "Update",
      save: "Save",
      cancel: "Cancel",
      saving: "Saving...",
      validation: {
        nameRequired: "Name is required",
        exerciseRequired: "Please select an exercise",
        weightRequired: "Weight must be greater than 0",
        durationRequired: "Duration must be greater than 0",
        atLeastOneExercise: "Add at least one exercise to the workout"
      },
      error: {
        createFailed: "Failed to create. Please try again."
      },
      confirmClose: {
        title: "Close without saving?",
        message: "You have unsaved changes. Are you sure you want to close?",
        confirm: "Yes, close",
        cancel: "Cancel"
      },
      exercise: {
        title: "Create Exercise",
        name: "Exercise Name",
        namePlaceholder: "e.g., Bench Press",
        category: "Category",
        description: "Description",
        descriptionPlaceholder: "Optional description..."
      },
      workout: {
        title: "Create Workout",
        name: "Workout Name",
        namePlaceholder: "e.g., Push Day",
        date: "Date",
        exercises: "Exercises",
        addExercise: "Add Exercise",
        exercise: "Exercise",
        exerciseSelect: "Select Exercise",
        selectExercise: "Choose an exercise...",
        sets: "Sets",
        reps: "Reps",
        weight: "Weight",
        notes: "Notes",
        notesPlaceholder: "Optional notes...",
        noExercises: "Click 'Add Exercise' to start building your workout"
      },
      pr: {
        title: "Register Personal Record",
        editTitle: "Edit Personal Record",
        exercise: "Exercise",
        selectExercise: "Choose an exercise...",
        weight: "Weight",
        reps: "Repetitions",
        minutes: "Minutes",
        seconds: "Seconds",
        date: "Date",
        notes: "Notes",
        notesPlaceholder: "Optional notes about this PR...",
        timeBased: "Time-based exercise",
        weightBased: "Weight-based exercise"
      },
      routine: {
        title: "Create Routine",
        editTitle: "Edit Routine",
        name: "Routine Name",
        namePlaceholder: "e.g., Push Day Routine",
        description: "Description",
        descriptionPlaceholder: "Optional description...",
        exercises: "Exercises",
        addExercise: "Add Exercise",
        exerciseSelect: "Select Exercise",
        selectExercise: "Choose an exercise...",
        sets: "Sets",
        reps: "Reps",
        notes: "Notes",
        notesPlaceholder: "Optional notes...",
        noExercises: "Click 'Add Exercise' to start building your routine",
        moveUp: "Move Up",
        moveDown: "Move Down"
      }
    },
    routines: {
      title: "My Workout Routines",
      empty: "No routines created yet.",
      needExercises: "Create at least one exercise first",
      created: "Created",
      edit: "Edit",
      delete: "Delete",
      confirmDelete: "Are you sure you want to delete this routine?",
      confirmDeleteTitle: "Delete Routine",
      confirmDeleteMessage: "Are you sure you want to delete this routine? This action cannot be undone.",
      deleteConfirm: "Yes, Delete",
      deleteSuccess: "Routine deleted successfully!",
      deleteError: "Failed to delete routine",
      exercises: "Exercises",
      showExercises: "Show Exercises",
      hideExercises: "Hide Exercises",
      startRoutine: "Start Routine",
      registerRoutine: "Register Routine",
      exercise: "Exercise",
      of: "of",
      sets: "Sets",
      addSet: "Add Set",
      removeSet: "Remove Set",
      noSets: "No sets added yet. Click 'Add Set' to start recording.",
      duration: "Duration",
      timeBased: "Time-based exercise",
      weightBased: "Weight-based exercise",
      previous: "Previous",
      next: "Next",
      finishWorkout: "Finish Workout",
      saveError: "Failed to save workout. Please try again.",
      confirmDeleteTitle: "Delete Routine",
      confirmDeleteMessage: "Are you sure you want to delete this routine? This action cannot be undone.",
      deleteConfirm: "Yes, Delete",
      deleteSuccess: "Routine deleted successfully!"
    },
    common: {
      sets: "sets",
      reps: "reps",
      weight: "kg",
      seconds: "sec",
      loading: "Loading...",
      delete: "Delete",
      confirm: "Confirm",
      success: "Success",
      ok: "OK"
    },
    history: {
      title: "Workout History",
      empty: "No workouts registered yet.",
      noResults: "No workouts found for this filter.",
      exercises: "Exercises",
      date: "Date",
      delete: "Delete",
      confirmDelete: "Are you sure you want to delete this workout?",
      confirmDeleteTitle: "Delete Workout",
      confirmDeleteMessage: "Are you sure you want to delete this workout? This action cannot be undone.",
      deleteConfirm: "Yes, Delete",
      deleteError: "Error deleting workout",
      deleteSuccess: "Workout deleted successfully!",
      stats: {
        total: "Total Workouts",
        thisWeek: "This Week",
        thisMonth: "This Month",
        totalExercises: "Total Exercises"
      },
      filters: {
        all: "All",
        week: "This Week",
        month: "This Month",
        selectMonth: "Select Month"
      },
      sets: {
        setNumber: "Set",
        reps: "Reps",
        weight: "Weight",
        duration: "Duration",
        viewDetails: "View Sets",
        editSets: "Edit Sets",
        addSet: "Add Set",
        removeSet: "Remove Set",
        noSets: "No sets recorded for this exercise.",
        updateSuccess: "Sets updated successfully!",
        saveError: "Error saving sets."
      }
    },
    presetRoutines: {
      title: "Preset Routines",
      empty: "No preset routines available.",
      noResults: "No preset routines found for this filter.",
      difficulty: "Difficulty",
      duration: "Duration",
      exercises: "Exercises",
      addToMyRoutines: "Add to My Routines",
      viewDetails: "View Details",
      noExercisesFound: "No exercises found. Please create exercises first.",
      exerciseNotAvailable: "This exercise is not available in your exercise list.",
      addSuccess: "Routine added to My Workout successfully!",
      addError: "Error adding routine.",
      filters: {
        all: "All",
        specific: "Specific",
        title: "Filter by goal",
        goal: "Goal",
        change: "Change goal",
        goals: {
          hypertrophy: "Hypertrophy",
          strength: "Strength",
          definition: "Definition"
        }
      }
    },
    auth: {
      subtitle: "Track your workouts and progress",
      login: "Login",
      register: "Register",
      email: "Email",
      emailPlaceholder: "Enter your email",
      password: "Password",
      passwordPlaceholder: "Enter your password",
      confirmPassword: "Confirm Password",
      confirmPasswordPlaceholder: "Confirm your password",
      username: "Username",
      usernamePlaceholder: "Enter your username (optional)",
      profilePicture: "Profile Picture",
      uploadPhoto: "Upload Photo",
      changePhoto: "Change Photo",
      passwordsDoNotMatch: "Passwords do not match",
      error: "An error occurred. Please try again.",
      loading: "Loading...",
      or: "OR",
      guestMode: "Try as Guest",
      guestDescription: "Explore the app without creating an account. Perfect for recruiters and portfolio reviewers.",
      logout: "Logout"
    },
    landing: {
      signIn: "Sign In",
      hero: {
        title: "ELEVATE YOUR WORKOUT GAME",
        subtitle: "Track your progress. Break your records. Build your best physique.",
        description: "Built by fitness enthusiasts, based on what actually works for tracking workouts and achieving goals.",
        cta: "Start for free"
      },
      features: {
        title: "POWERFUL FEATURES BACKED BY REAL DATA",
        subtitle: "We combine exercise tracking, progress monitoring, and smart routines to help you achieve your fitness goals.",
        tracking: {
          title: "COMPREHENSIVE TRACKING",
          description: "Track every exercise, set, rep, and weight with detailed workout history and statistics."
        },
        prs: {
          title: "PERSONAL RECORDS",
          description: "Monitor your personal records and celebrate every milestone in your fitness journey."
        },
        routines: {
          title: "CUSTOM ROUTINES",
          description: "Create and save your favorite workout routines for quick access anytime."
        },
        stats: {
          title: "DETAILED STATS",
          description: "Visualize your progress with charts and graphs showing your workout history and trends."
        },
        multilang: {
          title: "MULTI-LANGUAGE",
          description: "Available in English, Portuguese (BR), and Portuguese (PT). Full exercise name translations."
        },
        preset: {
          title: "PRESET ROUTINES",
          description: "Choose from a library of pre-built routines designed by fitness experts."
        }
      },
      howItWorks: {
        title: "YOUR FITNESS PLAN IN 3 SIMPLE STEPS",
        subtitle: "No fitness degree required. Just sign up and start tracking!",
        step1: {
          title: "CREATE YOUR ACCOUNT",
          description: "Sign up in less than a minute and start tracking your workouts immediately."
        },
        step2: {
          title: "TRACK YOUR WORKOUTS",
          description: "Log your exercises, sets, reps, and weights. Monitor your progress in real-time."
        },
        step3: {
          title: "ANALYZE AND IMPROVE",
          description: "Follow your progress, break records, and optimize your training based on data."
        }
      },
      data: {
        title: "SMARTER TRAINING BACKED BY REAL DATA",
        subtitle: "We combine exercise tracking, progress monitoring, and smart routines to calculate your success likelihood then turn it into actionable insights.",
        consistency: "CONSISTENCY",
        factor1: {
          title: "TRACKING",
          description: "Monitor every session"
        },
        factor2: {
          title: "PROGRESS",
          description: "See your improvement"
        },
        factor3: {
          title: "ROUTINES",
          description: "Structured workouts"
        },
        factor4: {
          title: "RECORDS",
          description: "Break your limits"
        },
        cta: "TURN INSIGHTS INTO ACTION"
      },
      form: {
        title: "GET STARTED TODAY",
        subtitle: "Join thousands of fitness enthusiasts tracking their progress"
      },
      footer: {
        text: "Built by fitness enthusiasts, for fitness enthusiasts. Start your journey today."
      }
    },
    userMenu: {
      settings: "Settings"
    },
    userSettings: {
      title: "User Settings",
      account: "Account",
      security: "Security",
      preferences: "Preferences",
      accountInfo: "Account Information",
      email: "Email",
      memberSince: "Member Since",
      changePassword: "Change Password",
      passwordNote: "Password change functionality will be available in a future update.",
      currentPassword: "Current Password",
      newPassword: "New Password",
      confirmNewPassword: "Confirm New Password",
      updatePassword: "Update Password",
      preferencesNote: "Language preferences can be changed using the language switcher in the header.",
      language: "Language",
      languageNote: "Use the language switcher in the header to change language.",
      saveChanges: "Save Changes",
      deleteAccount: "Delete Account",
      deleteAccountTitle: "Delete Account",
      deleteAccountMessage: "Are you sure you want to delete your account? This action cannot be undone. All your data (workouts, PRs, routines) will be permanently deleted.",
      deleteAccountConfirm: "Yes, Delete Account"
    },
    gamification: {
      progress: {
        title: "Your Progress",
        level: "Level",
        xp: "Experience Points",
        nextLevel: "Next Level",
        currentStreak: "Current Streak",
        longestStreak: "Longest Streak",
        totalWorkouts: "Total Workouts",
        totalPoints: "Total Points",
        days: "days"
      },
      challenges: {
        title: "Challenges",
        available: "Available",
        inProgress: "In Progress",
        history: "History",
        noAvailable: "No challenges available",
        noActive: "No active challenges",
        noCompleted: "No completed challenges",
        start: "Start Challenge",
        completed: "Completed",
        points: "Points",
        startError: "Error starting challenge",
        difficulty: {
          easy: "Easy",
          medium: "Medium",
          hard: "Hard",
          expert: "Expert"
        },
        period: {
          daily: "Daily",
          weekly: "Weekly",
          monthly: "Monthly",
          cumulative: "Cumulative Challenges"
        },
        filterByDifficulty: "Filter by Difficulty",
        filterByPeriod: "Filter by Period",
        filterAll: "All",
        abandonTitle: "Give up on challenge?",
        abandonMessage: "Your progress will be lost and the challenge will return to Available. Are you sure?",
        abandonConfirm: "Yes, give up",
        abandonError: "Error abandoning challenge"
      },
      achievements: {
        title: "Achievements",
        unlocked: "Unlocked",
        all: "All",
        locked: "Locked",
        noAchievements: "No achievements found",
        points: "Points",
        rarity: {
          common: "Common",
          rare: "Rare",
          epic: "Epic",
          legendary: "Legendary"
        }
      },
      loginRequired: "Please log in to view your gamification progress, challenges, and achievements."
    }
  },
  'pt-BR': {
    app: {
      title: "GymLog",
      subtitle: "Sistema de Registro de Treinos"
    },
    nav: {
      exercises: "Exercícios",
      workouts: "Treinos",
      prs: "Recordes Pessoais",
      routines: "Minha Rotina",
      history: "Histórico",
      presetRoutines: "Rotinas Prontas",
      gamification: "Desafios e Conquistas"
    },
    exercises: {
      title: "Exercícios Cadastrados",
      empty: "Nenhum exercício cadastrado ainda.",
      category: "Categoria",
      noResults: "Nenhum exercício encontrado para este filtro."
    },
    filters: {
      all: "Todos",
      upper: "Superiores",
      lower: "Inferiores",
      chest: "Peito",
      back: "Costas",
      biceps: "Bíceps",
      triceps: "Tríceps",
      legs: "Pernas",
      shoulders: "Ombros",
      forearms: "Antebraços",
      core: "Abdômen"
    },
    pagination: {
      previous: "Anterior",
      next: "Próxima",
      page: "Página",
      of: "de"
    },
    workouts: {
      title: "Treinos Registrados",
      empty: "Nenhum treino registrado ainda.",
      needExercises: "Crie pelo menos um exercício primeiro"
    },
    prs: {
      title: "Recordes Pessoais (PRs)",
      empty: "Nenhum PR registrado ainda.",
      reps: "reps",
      needExercises: "Crie pelo menos um exercício primeiro",
      edit: "Editar",
      delete: "Deletar",
      confirmDelete: "Tem certeza que deseja deletar este PR?",
      deleteError: "Erro ao deletar PR"
    },
    common: {
      sets: "séries",
      reps: "repetições",
      weight: "kg",
      seconds: "seg",
      loading: "Carregando...",
      delete: "Deletar",
      confirm: "Confirmar"
    },
    forms: {
      create: "Criar",
      update: "Atualizar",
      save: "Salvar",
      cancel: "Cancelar",
      saving: "Salvando...",
      validation: {
        nameRequired: "Nome é obrigatório",
        exerciseRequired: "Por favor, selecione um exercício",
        weightRequired: "O peso deve ser maior que 0",
        durationRequired: "A duração deve ser maior que 0",
        atLeastOneExercise: "Adicione pelo menos um exercício ao treino"
      },
      error: {
        createFailed: "Falha ao criar. Tente novamente."
      },
      confirmClose: {
        title: "Fechar sem salvar?",
        message: "Você tem alterações não salvas. Tem certeza que deseja fechar?",
        confirm: "Sim, fechar",
        cancel: "Cancelar"
      },
      exercise: {
        title: "Criar Exercício",
        name: "Nome do Exercício",
        namePlaceholder: "ex: Supino Reto",
        category: "Categoria",
        description: "Descrição",
        descriptionPlaceholder: "Descrição opcional..."
      },
      workout: {
        title: "Criar Treino",
        name: "Nome do Treino",
        namePlaceholder: "ex: Treino de Peito",
        date: "Data",
        exercises: "Exercícios",
        addExercise: "Adicionar Exercício",
        exercise: "Exercício",
        exerciseSelect: "Selecionar Exercício",
        selectExercise: "Escolha um exercício...",
        sets: "Séries",
        reps: "Repetições",
        weight: "Peso",
        notes: "Observações",
        notesPlaceholder: "Observações opcionais...",
        noExercises: "Clique em 'Adicionar Exercício' para começar"
      },
      pr: {
        title: "Registrar Recorde Pessoal",
        editTitle: "Editar Recorde Pessoal",
        exercise: "Exercício",
        selectExercise: "Escolha um exercício...",
        weight: "Peso",
        reps: "Repetições",
        minutes: "Minutos",
        seconds: "Segundos",
        date: "Data",
        notes: "Observações",
        notesPlaceholder: "Observações opcionais sobre este PR...",
        timeBased: "Exercício baseado em tempo",
        weightBased: "Exercício com peso"
      },
      routine: {
        title: "Criar Rotina",
        editTitle: "Editar Rotina",
        name: "Nome da Rotina",
        namePlaceholder: "ex: Rotina de Peito",
        description: "Descrição",
        descriptionPlaceholder: "Descrição opcional...",
        exercises: "Exercícios",
        addExercise: "Adicionar Exercício",
        exerciseSelect: "Selecionar Exercício",
        selectExercise: "Escolha um exercício...",
        sets: "Séries",
        reps: "Repetições",
        notes: "Observações",
        notesPlaceholder: "Observações opcionais...",
        noExercises: "Clique em 'Adicionar Exercício' para começar",
        moveUp: "Mover Para Cima",
        moveDown: "Mover Para Baixo"
      }
    },
    routines: {
      title: "Minhas Rotinas de Treino",
      empty: "Nenhuma rotina criada ainda.",
      needExercises: "Crie pelo menos um exercício primeiro",
      created: "Criada em",
      edit: "Editar",
      delete: "Excluir",
      confirmDelete: "Tem certeza que deseja excluir esta rotina?",
      confirmDeleteTitle: "Excluir Rotina",
      confirmDeleteMessage: "Tem certeza que deseja excluir esta rotina? Esta ação não pode ser desfeita.",
      deleteConfirm: "Sim, Excluir",
      deleteSuccess: "Rotina excluída com sucesso!",
      deleteError: "Falha ao excluir rotina",
      exercises: "Exercícios",
      showExercises: "Mostrar Exercícios",
      hideExercises: "Ocultar Exercícios",
      startRoutine: "Iniciar Rotina",
      registerRoutine: "Registrar Rotina",
      exercise: "Exercício",
      of: "de",
      sets: "Séries",
      addSet: "Adicionar Série",
      removeSet: "Remover Série",
      noSets: "Nenhuma série adicionada ainda. Clique em 'Adicionar Série' para começar.",
      duration: "Duração",
      timeBased: "Exercício por tempo",
      weightBased: "Exercício com peso",
      previous: "Anterior",
      next: "Próximo",
      finishWorkout: "Finalizar Treino",
      saveError: "Falha ao salvar treino. Tente novamente."
    },
    common: {
      sets: "séries",
      reps: "repetições",
      weight: "kg",
      seconds: "seg",
      loading: "Carregando...",
      delete: "Deletar",
      confirm: "Confirmar"
    },
    history: {
      title: "Histórico de Treinos",
      empty: "Nenhum treino registrado ainda.",
      noResults: "Nenhum treino encontrado para este filtro.",
      exercises: "Exercícios",
      date: "Data",
      delete: "Excluir",
      confirmDelete: "Tem certeza que deseja excluir este treino?",
      confirmDeleteTitle: "Excluir Treino",
      confirmDeleteMessage: "Tem certeza que deseja excluir este treino? Esta ação não pode ser desfeita.",
      deleteConfirm: "Sim, Excluir",
      deleteError: "Erro ao excluir treino",
      deleteSuccess: "Treino excluído com sucesso!",
      stats: {
        total: "Total de Treinos",
        thisWeek: "Esta Semana",
        thisMonth: "Este Mês",
        totalExercises: "Total de Exercícios"
      },
      filters: {
        all: "Todos",
        week: "Esta Semana",
        month: "Este Mês",
        selectMonth: "Selecionar Mês"
      },
      sets: {
        setNumber: "Série",
        reps: "Reps",
        weight: "Carga",
        duration: "Duração",
        viewDetails: "Ver Séries",
        editSets: "Editar Séries",
        addSet: "Adicionar Série",
        removeSet: "Remover Série",
        noSets: "Nenhuma série registrada para este exercício.",
        updateSuccess: "Séries atualizadas com sucesso!",
        saveError: "Erro ao salvar séries."
      }
    },
    presetRoutines: {
      title: "Rotinas Prontas",
      empty: "Nenhuma rotina pronta disponível.",
      noResults: "Nenhuma rotina encontrada para este filtro.",
      difficulty: "Dificuldade",
      duration: "Duração",
      exercises: "Exercícios",
      addToMyRoutines: "Adicionar às Minhas Rotinas",
      viewDetails: "Ver Detalhes",
      noExercisesFound: "Nenhum exercício encontrado. Por favor, crie exercícios primeiro.",
      exerciseNotAvailable: "Este exercício não está disponível na sua lista de exercícios.",
      addSuccess: "Rotina adicionada à Minha Rotina com sucesso!",
      addError: "Erro ao adicionar rotina.",
      filters: {
        all: "Todos",
        specific: "Específico",
        title: "Filtrar por objetivo",
        goal: "Objetivo",
        change: "Alterar objetivo",
        goals: {
          hypertrophy: "Hipertrofia",
          strength: "Força",
          definition: "Definição"
        }
      }
    },
    exerciseDetail: {
      category: "Categoria",
      description: "Descrição",
      targetMuscles: "Músculos Trabalhados",
      tutorial: "Tutorial do Exercício",
      howTo: "Como Realizar",
      imageUnavailable: "Imagem do tutorial não disponível",
      close: "Fechar"
    },
    auth: {
      subtitle: "Acompanhe seus treinos e progresso",
      login: "Entrar",
      register: "Registrar",
      email: "Email",
      emailPlaceholder: "Digite seu email",
      password: "Senha",
      passwordPlaceholder: "Digite sua senha",
      confirmPassword: "Confirmar Senha",
      confirmPasswordPlaceholder: "Confirme sua senha",
      username: "Nome de Usuário",
      usernamePlaceholder: "Digite seu nome de usuário (opcional)",
      profilePicture: "Foto de Perfil",
      uploadPhoto: "Enviar Foto",
      changePhoto: "Alterar Foto",
      passwordsDoNotMatch: "As senhas não coincidem",
      error: "Ocorreu um erro. Tente novamente.",
      loading: "Carregando...",
      or: "OU",
      guestMode: "Experimentar como Convidado",
      guestDescription: "Explore o aplicativo sem criar uma conta. Perfeito para recrutadores e revisores de portfólio.",
      logout: "Sair"
    },
    landing: {
      signIn: "Entrar",
      hero: {
        title: "ELEVE SEU NÍVEL DE TREINO",
        subtitle: "Acompanhe seu progresso. Quebre seus recordes. Construa seu melhor físico.",
        description: "Criado por entusiastas do fitness, baseado no que realmente funciona para acompanhar treinos e alcançar objetivos.",
        cta: "Comece grátis"
      },
      features: {
        title: "RECURSOS PODEROSOS BASEADOS EM DADOS REAIS",
        subtitle: "Combinamos acompanhamento de exercícios, monitoramento de progresso e rotinas inteligentes para ajudá-lo a alcançar seus objetivos de fitness.",
        tracking: {
          title: "ACOMPANHAMENTO COMPLETO",
          description: "Acompanhe cada exercício, série, repetição e peso com histórico detalhado de treinos e estatísticas."
        },
        prs: {
          title: "RECORDES PESSOAIS",
          description: "Monitore seus recordes pessoais e celebre cada marco em sua jornada fitness."
        },
        routines: {
          title: "ROTINAS PERSONALIZADAS",
          description: "Crie e salve suas rotinas de treino favoritas para acesso rápido a qualquer momento."
        },
        stats: {
          title: "ESTATÍSTICAS DETALHADAS",
          description: "Visualize seu progresso com gráficos mostrando seu histórico de treinos e tendências."
        },
        multilang: {
          title: "MULTI-IDIOMA",
          description: "Disponível em Inglês, Português (BR) e Português (PT). Traduções completas de nomes de exercícios."
        },
        preset: {
          title: "ROTINAS PRONTAS",
          description: "Escolha entre uma biblioteca de rotinas pré-criadas projetadas por especialistas em fitness."
        }
      },
      howItWorks: {
        title: "SEU PLANO DE FITNESS EM 3 PASSOS SIMPLES",
        subtitle: "Sem diploma de educação física necessário. Apenas cadastre-se e comece a acompanhar!",
        step1: {
          title: "CRIE SUA CONTA",
          description: "Cadastre-se em menos de um minuto e comece a acompanhar seus treinos imediatamente."
        },
        step2: {
          title: "ACOMPANHE SEUS TREINOS",
          description: "Registre seus exercícios, séries, repetições e pesos. Monitore seu progresso em tempo real."
        },
        step3: {
          title: "ANALISE E MELHORE",
          description: "Acompanhe seu progresso, quebre recordes e otimize seu treino com base em dados."
        }
      },
      data: {
        title: "TREINO MAIS INTELIGENTE BASEADO EM DADOS REAIS",
        subtitle: "Combinamos acompanhamento de exercícios, monitoramento de progresso e rotinas inteligentes para calcular sua probabilidade de sucesso e transformá-la em insights acionáveis.",
        consistency: "CONSISTÊNCIA",
        factor1: {
          title: "ACOMPANHAMENTO",
          description: "Monitore cada sessão"
        },
        factor2: {
          title: "PROGRESSO",
          description: "Veja sua melhoria"
        },
        factor3: {
          title: "ROTINAS",
          description: "Treinos estruturados"
        },
        factor4: {
          title: "RECORDES",
          description: "Quebre seus limites"
        },
        cta: "TRANSFORME INSIGHTS EM AÇÃO"
      },
      form: {
        title: "COMECE HOJE",
        subtitle: "Junte-se a milhares de entusiastas do fitness acompanhando seu progresso"
      },
      footer: {
        text: "Criado por entusiastas do fitness, para entusiastas do fitness. Comece sua jornada hoje."
      }
    },
    userMenu: {
      settings: "Configurações"
    },
    userSettings: {
      title: "Configurações do Usuário",
      account: "Conta",
      security: "Segurança",
      preferences: "Preferências",
      accountInfo: "Informações da Conta",
      email: "Email",
      memberSince: "Membro desde",
      changePassword: "Alterar Senha",
      passwordNote: "A funcionalidade de alteração de senha estará disponível em uma atualização futura.",
      currentPassword: "Senha Atual",
      newPassword: "Nova Senha",
      confirmNewPassword: "Confirmar Nova Senha",
      updatePassword: "Atualizar Senha",
      preferencesNote: "As preferências de idioma podem ser alteradas usando o seletor de idioma no cabeçalho.",
      language: "Idioma",
      languageNote: "Use o seletor de idioma no cabeçalho para alterar o idioma.",
      saveChanges: "Salvar Alterações",
      deleteAccount: "Excluir Conta",
      deleteAccountTitle: "Excluir Conta",
      deleteAccountMessage: "Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita. Todos os seus dados (treinos, PRs, rotinas) serão permanentemente excluídos.",
      deleteAccountConfirm: "Sim, Excluir Conta"
    },
    gamification: {
      progress: {
        title: "Seu Progresso",
        level: "Nível",
        xp: "Pontos de Experiência",
        nextLevel: "Próximo Nível",
        currentStreak: "Sequência Atual",
        longestStreak: "Maior Sequência",
        totalWorkouts: "Total de Treinos",
        totalPoints: "Pontos Totais",
        days: "dias"
      },
      challenges: {
        title: "Desafios",
        available: "Disponíveis",
        inProgress: "Em Progresso",
        history: "Histórico",
        noAvailable: "Nenhum desafio disponível",
        noActive: "Nenhum desafio ativo",
        noCompleted: "Nenhum desafio completado",
        start: "Iniciar Desafio",
        completed: "Concluído",
        points: "Pontos",
        startError: "Erro ao iniciar desafio",
        difficulty: {
          easy: "Fácil",
          medium: "Médio",
          hard: "Difícil",
          expert: "Expert"
        },
        period: {
          daily: "Diário",
          weekly: "Semanal",
          monthly: "Mensal",
          cumulative: "Desafios Cumulativos"
        },
        filterByDifficulty: "Filtrar por Dificuldade",
        filterByPeriod: "Filtrar por Período",
        filterAll: "Geral",
        abandonTitle: "Desistir do desafio?",
        abandonMessage: "Seu progresso será perdido e o desafio voltará para Disponíveis. Tem certeza?",
        abandonConfirm: "Sim, desistir",
        abandonError: "Erro ao desistir do desafio"
      },
      achievements: {
        title: "Conquistas",
        unlocked: "Desbloqueadas",
        all: "Todas",
        locked: "Bloqueadas",
        noAchievements: "Nenhuma conquista encontrada",
        points: "Pontos",
        rarity: {
          common: "Comum",
          rare: "Raro",
          epic: "Épico",
          legendary: "Lendário"
        }
      },
      loginRequired: "Por favor, faça login para ver seu progresso, desafios e conquistas."
    }
  },
  'pt-PT': {
    app: {
      title: "GymLog",
      subtitle: "Sistema de Registo de Treinos"
    },
    nav: {
      exercises: "Exercícios",
      workouts: "Treinos",
      prs: "Recordes Pessoais",
      routines: "Minha Rotina",
      history: "Histórico",
      presetRoutines: "Rotinas Prontas",
      gamification: "Desafios e Conquistas"
    },
    exercises: {
      title: "Exercícios Registados",
      empty: "Ainda não há exercícios registados.",
      category: "Categoria",
      noResults: "Não há exercícios para este filtro."
    },
    filters: {
      all: "Todos",
      upper: "Superiores",
      lower: "Inferiores",
      chest: "Peito",
      back: "Costas",
      biceps: "Bíceps",
      triceps: "Tríceps",
      legs: "Pernas",
      shoulders: "Ombros",
      forearms: "Antebraços",
      core: "Abdômen"
    },
    pagination: {
      previous: "Anterior",
      next: "Próxima",
      page: "Página",
      of: "de"
    },
    workouts: {
      title: "Treinos Registados",
      empty: "Ainda não há treinos registados.",
      needExercises: "Crie pelo menos um exercício primeiro"
    },
    prs: {
      title: "Recordes Pessoais (PRs)",
      empty: "Ainda não há PRs registados.",
      reps: "reps",
      needExercises: "Crie pelo menos um exercício primeiro",
      edit: "Editar",
      delete: "Eliminar",
      confirmDelete: "Tem a certeza que deseja eliminar este PR?",
      deleteError: "Erro ao eliminar PR"
    },
    common: {
      sets: "séries",
      reps: "repetições",
      weight: "kg",
      seconds: "seg",
      loading: "A carregar...",
      delete: "Deletar",
      confirm: "Confirmar"
    },
    forms: {
      create: "Criar",
      update: "Atualizar",
      save: "Guardar",
      cancel: "Cancelar",
      saving: "A guardar...",
      validation: {
        nameRequired: "Nome é obrigatório",
        exerciseRequired: "Por favor, selecione um exercício",
        weightRequired: "O peso deve ser maior que 0",
        durationRequired: "A duração deve ser maior que 0",
        atLeastOneExercise: "Adicione pelo menos um exercício ao treino"
      },
      error: {
        createFailed: "Falha ao criar. Tente novamente."
      },
      confirmClose: {
        title: "Fechar sem salvar?",
        message: "Você tem alterações não salvas. Tem certeza que deseja fechar?",
        confirm: "Sim, fechar",
        cancel: "Cancelar"
      },
      exercise: {
        title: "Criar Exercício",
        name: "Nome do Exercício",
        namePlaceholder: "ex: Supino Reto",
        category: "Categoria",
        description: "Descrição",
        descriptionPlaceholder: "Descrição opcional..."
      },
      workout: {
        title: "Criar Treino",
        name: "Nome do Treino",
        namePlaceholder: "ex: Treino de Peito",
        date: "Data",
        exercises: "Exercícios",
        addExercise: "Adicionar Exercício",
        exercise: "Exercício",
        exerciseSelect: "Selecionar Exercício",
        selectExercise: "Escolha um exercício...",
        sets: "Séries",
        reps: "Repetições",
        weight: "Peso",
        notes: "Observações",
        notesPlaceholder: "Observações opcionais...",
        noExercises: "Clique em 'Adicionar Exercício' para começar"
      },
      pr: {
        title: "Registar Recorde Pessoal",
        editTitle: "Editar Recorde Pessoal",
        exercise: "Exercício",
        selectExercise: "Escolha um exercício...",
        weight: "Peso",
        reps: "Repetições",
        minutes: "Minutos",
        seconds: "Segundos",
        date: "Data",
        notes: "Observações",
        notesPlaceholder: "Observações opcionais sobre este PR...",
        timeBased: "Exercício baseado em tempo",
        weightBased: "Exercício com peso"
      },
      routine: {
        title: "Criar Rotina",
        editTitle: "Editar Rotina",
        name: "Nome da Rotina",
        namePlaceholder: "ex: Rotina de Peito",
        description: "Descrição",
        descriptionPlaceholder: "Descrição opcional...",
        exercises: "Exercícios",
        addExercise: "Adicionar Exercício",
        exerciseSelect: "Selecionar Exercício",
        selectExercise: "Escolha um exercício...",
        sets: "Séries",
        reps: "Repetições",
        notes: "Observações",
        notesPlaceholder: "Observações opcionais...",
        noExercises: "Clique em 'Adicionar Exercício' para começar",
        moveUp: "Mover Para Cima",
        moveDown: "Mover Para Baixo"
      }
    },
    routines: {
      title: "As Minhas Rotinas de Treino",
      empty: "Ainda não há rotinas criadas.",
      needExercises: "Crie pelo menos um exercício primeiro",
      created: "Criada em",
      edit: "Editar",
      delete: "Eliminar",
      confirmDelete: "Tem a certeza que deseja eliminar esta rotina?",
      confirmDeleteTitle: "Eliminar Rotina",
      confirmDeleteMessage: "Tem a certeza que deseja eliminar esta rotina? Esta ação não pode ser desfeita.",
      deleteConfirm: "Sim, Eliminar",
      deleteSuccess: "Rotina eliminada com sucesso!",
      deleteError: "Falha ao eliminar rotina",
      exercises: "Exercícios",
      showExercises: "Mostrar Exercícios",
      hideExercises: "Ocultar Exercícios",
      startRoutine: "Iniciar Rotina",
      registerRoutine: "Registrar Rotina",
      exercise: "Exercício",
      of: "de",
      sets: "Séries",
      addSet: "Adicionar Série",
      removeSet: "Remover Série",
      noSets: "Ainda não há séries adicionadas. Clique em 'Adicionar Série' para começar.",
      duration: "Duração",
      timeBased: "Exercício por tempo",
      weightBased: "Exercício com peso",
      previous: "Anterior",
      next: "Próximo",
      finishWorkout: "Finalizar Treino",
      saveError: "Falha ao guardar treino. Tente novamente."
    },
    common: {
      sets: "séries",
      reps: "repetições",
      weight: "kg",
      seconds: "seg",
      loading: "A carregar...",
      delete: "Deletar",
      confirm: "Confirmar",
      success: "Sucesso",
      ok: "OK"
    },
    history: {
      title: "Histórico de Treinos",
      empty: "Ainda não há treinos registados.",
      noResults: "Não há treinos para este filtro.",
      exercises: "Exercícios",
      date: "Data",
      delete: "Eliminar",
      confirmDelete: "Tem a certeza que deseja eliminar este treino?",
      confirmDeleteTitle: "Eliminar Treino",
      confirmDeleteMessage: "Tem a certeza que deseja eliminar este treino? Esta ação não pode ser desfeita.",
      deleteConfirm: "Sim, Eliminar",
      deleteError: "Erro ao eliminar treino",
      deleteSuccess: "Treino eliminado com sucesso!",
      stats: {
        total: "Total de Treinos",
        thisWeek: "Esta Semana",
        thisMonth: "Este Mês",
        totalExercises: "Total de Exercícios"
      },
      filters: {
        all: "Todos",
        week: "Esta Semana",
        month: "Este Mês",
        selectMonth: "Selecionar Mês"
      },
      sets: {
        setNumber: "Série",
        reps: "Reps",
        weight: "Carga",
        duration: "Duração",
        viewDetails: "Ver Séries",
        editSets: "Editar Séries",
        addSet: "Adicionar Série",
        removeSet: "Remover Série",
        noSets: "Nenhuma série registrada para este exercício.",
        updateSuccess: "Séries atualizadas com sucesso!",
        saveError: "Erro ao salvar séries."
      }
    },
    presetRoutines: {
      title: "Rotinas Prontas",
      empty: "Ainda não há rotinas prontas disponíveis.",
      noResults: "Não há rotinas para este filtro.",
      difficulty: "Dificuldade",
      duration: "Duração",
      exercises: "Exercícios",
      addToMyRoutines: "Adicionar às Minhas Rotinas",
      viewDetails: "Ver Detalhes",
      noExercisesFound: "Nenhum exercício encontrado. Por favor, crie exercícios primeiro.",
      exerciseNotAvailable: "Este exercício não está disponível na sua lista de exercícios.",
      addSuccess: "Rotina adicionada à Minha Rotina com sucesso!",
      addError: "Erro ao adicionar rotina.",
      filters: {
        all: "Todos",
        specific: "Específico",
        title: "Filtrar por objetivo",
        goal: "Objetivo",
        change: "Alterar objetivo",
        goals: {
          hypertrophy: "Hipertrofia",
          strength: "Força",
          definition: "Definição"
        }
      }
    },
    exerciseDetail: {
      category: "Categoria",
      description: "Descrição",
      targetMuscles: "Músculos Trabalhados",
      tutorial: "Tutorial do Exercício",
      howTo: "Como Realizar",
      imageUnavailable: "Imagem do tutorial não disponível",
      close: "Fechar"
    },
    auth: {
      subtitle: "Acompanhe os seus treinos e progresso",
      login: "Iniciar Sessão",
      register: "Registar",
      email: "Email",
      emailPlaceholder: "Digite o seu email",
      password: "Palavra-passe",
      passwordPlaceholder: "Digite a sua palavra-passe",
      confirmPassword: "Confirmar Palavra-passe",
      confirmPasswordPlaceholder: "Confirme a sua palavra-passe",
      username: "Nome de Utilizador",
      usernamePlaceholder: "Digite o seu nome de utilizador (opcional)",
      profilePicture: "Foto de Perfil",
      uploadPhoto: "Carregar Foto",
      changePhoto: "Alterar Foto",
      passwordsDoNotMatch: "As palavras-passe não coincidem",
      error: "Ocorreu um erro. Tente novamente.",
      loading: "A carregar...",
      or: "OU",
      guestMode: "Experimentar como Convidado",
      guestDescription: "Explore a aplicação sem criar uma conta. Perfeito para recrutadores e revisores de portfólio.",
      logout: "Terminar Sessão"
    },
    landing: {
      signIn: "Iniciar Sessão",
      hero: {
        title: "ELEVE O SEU NÍVEL DE TREINO",
        subtitle: "Acompanhe o seu progresso. Quebre os seus recordes. Construa o seu melhor físico.",
        description: "Criado por entusiastas do fitness, baseado no que realmente funciona para acompanhar treinos e alcançar objetivos.",
        cta: "Comece grátis"
      },
      features: {
        title: "RECURSOS PODEROSOS BASEADOS EM DADOS REAIS",
        subtitle: "Combinamos acompanhamento de exercícios, monitoramento de progresso e rotinas inteligentes para ajudá-lo a alcançar os seus objetivos de fitness.",
        tracking: {
          title: "ACOMPANHAMENTO COMPLETO",
          description: "Acompanhe cada exercício, série, repetição e peso com histórico detalhado de treinos e estatísticas."
        },
        prs: {
          title: "RECORDES PESSOAIS",
          description: "Monitore os seus recordes pessoais e celebre cada marco na sua jornada fitness."
        },
        routines: {
          title: "ROTINAS PERSONALIZADAS",
          description: "Crie e guarde as suas rotinas de treino favoritas para acesso rápido a qualquer momento."
        },
        stats: {
          title: "ESTATÍSTICAS DETALHADAS",
          description: "Visualize o seu progresso com gráficos mostrando o seu histórico de treinos e tendências."
        },
        multilang: {
          title: "MULTI-IDIOMA",
          description: "Disponível em Inglês, Português (BR) e Português (PT). Traduções completas de nomes de exercícios."
        },
        preset: {
          title: "ROTINAS PRONTAS",
          description: "Escolha entre uma biblioteca de rotinas pré-criadas projetadas por especialistas em fitness."
        }
      },
      howItWorks: {
        title: "O SEU PLANO DE FITNESS EM 3 PASSOS SIMPLES",
        subtitle: "Sem diploma de educação física necessário. Apenas registe-se e comece a acompanhar!",
        step1: {
          title: "CRIE A SUA CONTA",
          description: "Registe-se em menos de um minuto e comece a acompanhar os seus treinos imediatamente."
        },
        step2: {
          title: "ACOMPANHE OS SEUS TREINOS",
          description: "Registe os seus exercícios, séries, repetições e pesos. Monitore o seu progresso em tempo real."
        },
        step3: {
          title: "ANALISE E MELHORE",
          description: "Acompanhe o seu progresso, quebre recordes e otimize o seu treino com base em dados."
        }
      },
      data: {
        title: "TREINO MAIS INTELIGENTE BASEADO EM DADOS REAIS",
        subtitle: "Combinamos acompanhamento de exercícios, monitoramento de progresso e rotinas inteligentes para calcular a sua probabilidade de sucesso e transformá-la em insights acionáveis.",
        consistency: "CONSISTÊNCIA",
        factor1: {
          title: "ACOMPANHAMENTO",
          description: "Monitore cada sessão"
        },
        factor2: {
          title: "PROGRESSO",
          description: "Veja a sua melhoria"
        },
        factor3: {
          title: "ROTINAS",
          description: "Treinos estruturados"
        },
        factor4: {
          title: "RECORDES",
          description: "Quebre os seus limites"
        },
        cta: "TRANSFORME INSIGHTS EM AÇÃO"
      },
      form: {
        title: "COMECE HOJE",
        subtitle: "Junte-se a milhares de entusiastas do fitness acompanhando o seu progresso"
      },
      footer: {
        text: "Criado por entusiastas do fitness, para entusiastas do fitness. Comece a sua jornada hoje."
      }
    },
    userMenu: {
      settings: "Definições"
    },
    userSettings: {
      title: "Definições do Utilizador",
      account: "Conta",
      security: "Segurança",
      preferences: "Preferências",
      accountInfo: "Informações da Conta",
      email: "Email",
      memberSince: "Membro desde",
      changePassword: "Alterar Palavra-passe",
      passwordNote: "A funcionalidade de alteração de palavra-passe estará disponível numa atualização futura.",
      currentPassword: "Palavra-passe Atual",
      newPassword: "Nova Palavra-passe",
      confirmNewPassword: "Confirmar Nova Palavra-passe",
      updatePassword: "Atualizar Palavra-passe",
      preferencesNote: "As preferências de idioma podem ser alteradas usando o seletor de idioma no cabeçalho.",
      language: "Idioma",
      languageNote: "Use o seletor de idioma no cabeçalho para alterar o idioma.",
      saveChanges: "Guardar Alterações",
      deleteAccount: "Eliminar Conta",
      deleteAccountTitle: "Eliminar Conta",
      deleteAccountMessage: "Tem a certeza que deseja eliminar a sua conta? Esta ação não pode ser desfeita. Todos os seus dados (treinos, PRs, rotinas) serão permanentemente eliminados.",
      deleteAccountConfirm: "Sim, Eliminar Conta"
    },
    gamification: {
      progress: {
        title: "O Seu Progresso",
        level: "Nível",
        xp: "Pontos de Experiência",
        nextLevel: "Próximo Nível",
        currentStreak: "Sequência Atual",
        longestStreak: "Maior Sequência",
        totalWorkouts: "Total de Treinos",
        totalPoints: "Pontos Totais",
        days: "dias"
      },
      challenges: {
        title: "Desafios",
        available: "Disponíveis",
        inProgress: "Em Progresso",
        history: "Histórico",
        noAvailable: "Nenhum desafio disponível",
        noActive: "Nenhum desafio ativo",
        noCompleted: "Nenhum desafio completado",
        start: "Iniciar Desafio",
        completed: "Concluído",
        points: "Pontos",
        startError: "Erro ao iniciar desafio",
        difficulty: {
          easy: "Fácil",
          medium: "Médio",
          hard: "Difícil",
          expert: "Perito"
        },
        period: {
          daily: "Diário",
          weekly: "Semanal",
          monthly: "Mensal",
          cumulative: "Desafios Cumulativos"
        },
        filterByDifficulty: "Filtrar por Dificuldade",
        filterByPeriod: "Filtrar por Período",
        filterAll: "Todos",
        abandonTitle: "Desistir do desafio?",
        abandonMessage: "O seu progresso será perdido e o desafio voltará para Disponíveis. Tem a certeza?",
        abandonConfirm: "Sim, desistir",
        abandonError: "Erro ao desistir do desafio"
      },
      achievements: {
        title: "Conquistas",
        unlocked: "Desbloqueadas",
        all: "Todas",
        locked: "Bloqueadas",
        noAchievements: "Nenhuma conquista encontrada",
        points: "Pontos",
        rarity: {
          common: "Comum",
          rare: "Raro",
          epic: "Épico",
          legendary: "Lendário"
        }
      },
      loginRequired: "Por favor, faça login para ver o seu progresso, desafios e conquistas."
    }
  }
};

