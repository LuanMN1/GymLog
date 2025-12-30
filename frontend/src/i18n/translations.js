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
      progress: "Progress",
      history: "History",
      presetRoutines: "Preset Routines"
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
      cancel: "Cancel",
      saving: "Saving...",
      update: "Update",
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
      saveError: "Failed to save workout. Please try again."
    },
    common: {
      sets: "sets",
      reps: "reps",
      weight: "kg",
      seconds: "sec",
      delete: "Delete",
      confirm: "Confirm"
    },
    progress: {
      title: "Progress Charts and Statistics",
      stats: {
        totalWorkouts: "Total Workouts",
        totalVolume: "Total Volume (kg)",
        totalPRs: "Total PRs",
        avgVolume: "Avg Volume/Workout"
      },
      charts: {
        volumeOverTime: "Volume Over Time",
        workoutsPerWeek: "Workouts Per Week",
        topExercises: "Top Exercises",
        volume: "Volume (kg)",
        workouts: "Workouts",
        timesPerformed: "Times Performed",
        noData: "No data available yet. Start recording workouts to see your progress!"
      }
    },
    history: {
      title: "Workout History",
      empty: "No workouts registered yet.",
      noResults: "No workouts found for this filter.",
      exercises: "Exercises",
      date: "Date",
      delete: "Delete",
      confirmDelete: "Are you sure you want to delete this workout?",
      deleteError: "Error deleting workout",
      deleteSuccess: "Workout deleted successfully",
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
        noSets: "No sets recorded for this exercise."
      }
    },
    presetRoutines: {
      title: "Preset Routines",
      empty: "No preset routines available.",
      difficulty: "Difficulty",
      duration: "Duration",
      exercises: "Exercises",
      addToMyRoutines: "Add to My Routines",
      viewDetails: "View Details",
      noExercisesFound: "No exercises found. Please create exercises first.",
      exerciseNotAvailable: "This exercise is not available in your exercise list.",
      addSuccess: "Routine added successfully!",
      addError: "Error adding routine."
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
      progress: "Progresso",
      history: "Histórico",
      presetRoutines: "Rotinas Prontas"
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
      delete: "Deletar",
      confirm: "Confirmar"
    },
    forms: {
      create: "Criar",
      update: "Atualizar",
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
      delete: "Deletar",
      confirm: "Confirmar"
    },
    progress: {
      title: "Gráficos e Estatísticas de Progresso",
      stats: {
        totalWorkouts: "Total de Treinos",
        totalVolume: "Volume Total (kg)",
        totalPRs: "Total de PRs",
        avgVolume: "Volume Médio/Treino"
      },
      charts: {
        volumeOverTime: "Volume ao Longo do Tempo",
        workoutsPerWeek: "Treinos por Semana",
        topExercises: "Exercícios Mais Realizados",
        volume: "Volume (kg)",
        workouts: "Treinos",
        timesPerformed: "Vezes Realizados",
        noData: "Ainda não há dados disponíveis. Comece a registrar treinos para ver seu progresso!"
      }
    },
    history: {
      title: "Histórico de Treinos",
      empty: "Nenhum treino registrado ainda.",
      noResults: "Nenhum treino encontrado para este filtro.",
      exercises: "Exercícios",
      date: "Data",
      delete: "Excluir",
      confirmDelete: "Tem certeza que deseja excluir este treino?",
      deleteError: "Erro ao excluir treino",
      deleteSuccess: "Treino excluído com sucesso",
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
        noSets: "Nenhuma série registrada para este exercício."
      }
    },
    presetRoutines: {
      title: "Rotinas Prontas",
      empty: "Nenhuma rotina pronta disponível.",
      difficulty: "Dificuldade",
      duration: "Duração",
      exercises: "Exercícios",
      addToMyRoutines: "Adicionar às Minhas Rotinas",
      viewDetails: "Ver Detalhes",
      noExercisesFound: "Nenhum exercício encontrado. Por favor, crie exercícios primeiro.",
      exerciseNotAvailable: "Este exercício não está disponível na sua lista de exercícios.",
      addSuccess: "Rotina adicionada com sucesso!",
      addError: "Erro ao adicionar rotina."
    },
    exerciseDetail: {
      category: "Categoria",
      description: "Descrição",
      targetMuscles: "Músculos Trabalhados",
      tutorial: "Tutorial do Exercício",
      howTo: "Como Realizar",
      imageUnavailable: "Imagem do tutorial não disponível",
      close: "Fechar"
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
      progress: "Progresso",
      history: "Histórico",
      presetRoutines: "Rotinas Prontas"
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
      delete: "Deletar",
      confirm: "Confirmar"
    },
    forms: {
      create: "Criar",
      update: "Atualizar",
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
      delete: "Deletar",
      confirm: "Confirmar"
    },
    progress: {
      title: "Gráficos e Estatísticas de Progresso",
      stats: {
        totalWorkouts: "Total de Treinos",
        totalVolume: "Volume Total (kg)",
        totalPRs: "Total de PRs",
        avgVolume: "Volume Médio/Treino"
      },
      charts: {
        volumeOverTime: "Volume ao Longo do Tempo",
        workoutsPerWeek: "Treinos por Semana",
        topExercises: "Exercícios Mais Realizados",
        volume: "Volume (kg)",
        workouts: "Treinos",
        timesPerformed: "Vezes Realizados",
        noData: "Ainda não há dados disponíveis. Comece a registar treinos para ver o seu progresso!"
      }
    },
    history: {
      title: "Histórico de Treinos",
      empty: "Ainda não há treinos registados.",
      noResults: "Não há treinos para este filtro.",
      exercises: "Exercícios",
      date: "Data",
      delete: "Eliminar",
      confirmDelete: "Tem a certeza que deseja eliminar este treino?",
      deleteError: "Erro ao eliminar treino",
      deleteSuccess: "Treino eliminado com sucesso",
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
        noSets: "Nenhuma série registrada para este exercício."
      }
    },
    presetRoutines: {
      title: "Rotinas Prontas",
      empty: "Ainda não há rotinas prontas disponíveis.",
      difficulty: "Dificuldade",
      duration: "Duração",
      exercises: "Exercícios",
      addToMyRoutines: "Adicionar às Minhas Rotinas",
      viewDetails: "Ver Detalhes",
      noExercisesFound: "Nenhum exercício encontrado. Por favor, crie exercícios primeiro.",
      exerciseNotAvailable: "Este exercício não está disponível na sua lista de exercícios.",
      addSuccess: "Rotina adicionada com sucesso!",
      addError: "Erro ao adicionar rotina."
    },
    exerciseDetail: {
      category: "Categoria",
      description: "Descrição",
      targetMuscles: "Músculos Trabalhados",
      tutorial: "Tutorial do Exercício",
      howTo: "Como Realizar",
      imageUnavailable: "Imagem do tutorial não disponível",
      close: "Fechar"
    }
  }
};

