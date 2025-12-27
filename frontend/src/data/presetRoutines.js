// Rotinas pré-montadas disponíveis para os usuários
export const presetRoutines = [
  {
    id: 'push-pull-legs-push',
    name: 'Push Pull Legs - Push Day',
    namePt: 'Empurrar Puxar Pernas - Dia de Empurrar',
    description: 'Dia 1: Empurrar - Peito, ombros e tríceps. Parte da divisão Push Pull Legs.',
    descriptionEn: 'Day 1: Push - Chest, shoulders, and triceps. Part of Push Pull Legs split.',
    difficulty: 'Intermediate',
    difficultyPt: 'Intermediário',
    duration: '1 dia',
    durationEn: '1 day',
    exercises: [
      {
        name: 'Bench Press',
        sets: 4,
        reps: 8,
        notes: 'Warm-up: 1 light set',
        notesPt: 'Aquecimento: 1 série leve'
      },
      {
        name: 'Incline Bench Press',
        sets: 3,
        reps: 10,
        notes: ''
      },
      {
        name: 'Overhead Press',
        sets: 3,
        reps: 8,
        notes: ''
      },
      {
        name: 'Lateral Raise',
        sets: 3,
        reps: 12,
        notes: ''
      },
      {
        name: 'Tricep Pushdown',
        sets: 3,
        reps: 12,
        notes: ''
      },
      {
        name: 'Overhead Tricep Extension',
        sets: 3,
        reps: 10,
        notes: ''
      }
    ]
  },
  {
    id: 'push-pull-legs-pull',
    name: 'Push Pull Legs - Pull Day',
    namePt: 'Empurrar Puxar Pernas - Dia de Puxar',
    description: 'Dia 2: Puxar - Costas e bíceps. Parte da divisão Push Pull Legs.',
    descriptionEn: 'Day 2: Pull - Back and biceps. Part of Push Pull Legs split.',
    difficulty: 'Intermediate',
    difficultyPt: 'Intermediário',
    duration: '1 dia',
    durationEn: '1 day',
    exercises: [
      {
        name: 'Deadlift',
        sets: 4,
        reps: 6,
        notes: 'Heavy',
        notesPt: 'Pesado'
      },
      {
        name: 'Low Row',
        sets: 3,
        reps: 10,
        notes: ''
      },
      {
        name: 'T-Bar Row',
        sets: 3,
        reps: 10,
        notes: ''
      },
      {
        name: 'High Row',
        sets: 3,
        reps: 12,
        notes: ''
      },
      {
        name: 'Barbell Curl',
        sets: 3,
        reps: 12,
        notes: ''
      },
      {
        name: 'Hammer Curl',
        sets: 3,
        reps: 12,
        notes: ''
      },
      {
        name: 'Scott Curl',
        sets: 3,
        reps: 10,
        notes: ''
      }
    ]
  },
  {
    id: 'push-pull-legs-legs',
    name: 'Push Pull Legs - Legs Day',
    namePt: 'Empurrar Puxar Pernas - Dia de Pernas',
    description: 'Dia 3: Pernas - Quadríceps, posterior, glúteos e panturrilhas. Parte da divisão Push Pull Legs.',
    descriptionEn: 'Day 3: Legs - Quadriceps, hamstrings, glutes, and calves. Part of Push Pull Legs split.',
    difficulty: 'Intermediate',
    difficultyPt: 'Intermediário',
    duration: '1 dia',
    durationEn: '1 day',
    exercises: [
      {
        name: 'Squat',
        sets: 4,
        reps: 8,
        notes: ''
      },
      {
        name: 'Leg Press',
        sets: 3,
        reps: 12,
        notes: ''
      },
      {
        name: 'Leg Extension',
        sets: 3,
        reps: 12,
        notes: ''
      },
      {
        name: 'Leg Curl',
        sets: 3,
        reps: 12,
        notes: ''
      },
      {
        name: 'Calf Raise',
        sets: 4,
        reps: 15,
        notes: ''
      }
    ]
  },
  {
    id: 'upper-lower-upper',
    name: 'Upper Lower Split - Upper Body',
    namePt: 'Divisão Superior/Inferior - Superior',
    description: 'Dia 1 e 3: Membros superiores - Peito, costas, ombros, braços. Parte da divisão Upper Lower.',
    descriptionEn: 'Day 1 & 3: Upper body - Chest, back, shoulders, arms. Part of Upper Lower split.',
    difficulty: 'Beginner',
    difficultyPt: 'Iniciante',
    duration: '1 dia',
    durationEn: '1 day',
    exercises: [
      {
        name: 'Bench Press',
        sets: 3,
        reps: 10,
        notes: ''
      },
      {
        name: 'Low Row',
        sets: 3,
        reps: 10,
        notes: ''
      },
      {
        name: 'Overhead Press',
        sets: 3,
        reps: 10,
        notes: ''
      },
      {
        name: 'Barbell Curl',
        sets: 3,
        reps: 12,
        notes: ''
      },
      {
        name: 'Tricep Pushdown',
        sets: 3,
        reps: 12,
        notes: ''
      }
    ]
  },
  {
    id: 'upper-lower-lower',
    name: 'Upper Lower Split - Lower Body',
    namePt: 'Divisão Superior/Inferior - Inferior',
    description: 'Dia 2 e 4: Membros inferiores - Pernas completas. Parte da divisão Upper Lower.',
    descriptionEn: 'Day 2 & 4: Lower body - Complete legs. Part of Upper Lower split.',
    difficulty: 'Beginner',
    difficultyPt: 'Iniciante',
    duration: '1 dia',
    durationEn: '1 day',
    exercises: [
      {
        name: 'Squat',
        sets: 4,
        reps: 8,
        notes: ''
      },
      {
        name: 'Leg Press',
        sets: 3,
        reps: 12,
        notes: ''
      },
      {
        name: 'Leg Extension',
        sets: 3,
        reps: 12,
        notes: ''
      },
      {
        name: 'Leg Curl',
        sets: 3,
        reps: 12,
        notes: ''
      },
      {
        name: 'Calf Raise',
        sets: 4,
        reps: 15,
        notes: ''
      },
      {
        name: 'Plank',
        sets: 3,
        reps: 60,
        notes: 'Seconds',
        notesPt: 'Segundos'
      }
    ]
  },
  {
    id: 'full-body',
    name: 'Full Body',
    namePt: 'Corpo Inteiro',
    description: 'Treino completo para todo o corpo em uma única sessão. Ideal para iniciantes ou treinos 3x por semana.',
    descriptionEn: 'Complete full body workout in one session. Ideal for beginners or 3x per week training.',
    difficulty: 'Beginner',
    difficultyPt: 'Iniciante',
    duration: '4 semanas',
    durationEn: '4 weeks',
    exercises: [
      {
        name: 'Squat',
        sets: 3,
        reps: 10,
        notes: ''
      },
      {
        name: 'Bench Press',
        sets: 3,
        reps: 10,
        notes: ''
      },
      {
        name: 'Deadlift',
        sets: 3,
        reps: 8,
        notes: 'Watch your form!',
        notesPt: 'Cuidado com a forma!'
      },
      {
        name: 'Overhead Press',
        sets: 3,
        reps: 10,
        notes: ''
      },
      {
        name: 'Low Row',
        sets: 3,
        reps: 10,
        notes: ''
      },
      {
        name: 'Plank',
        sets: 3,
        reps: 60,
        notes: 'Seconds',
        notesPt: 'Segundos'
      }
    ]
  },
  {
    id: 'chest-triceps',
    name: 'Chest & Triceps',
    namePt: 'Peito e Tríceps',
    description: 'Foco em desenvolvimento de peito e tríceps. Ideal para dias de empurrar.',
    descriptionEn: 'Focus on chest and triceps development. Ideal for push days.',
    difficulty: 'Intermediate',
    difficultyPt: 'Intermediário',
    duration: '1 dia',
    durationEn: '1 day',
    exercises: [
      {
        name: 'Bench Press',
        sets: 4,
        reps: 8,
        notes: ''
      },
      {
        name: 'Incline Bench Press',
        sets: 3,
        reps: 10,
        notes: ''
      },
      {
        name: 'Decline Bench Press',
        sets: 3,
        reps: 10,
        notes: ''
      },
      {
        name: 'Tricep Pushdown',
        sets: 3,
        reps: 12,
        notes: ''
      },
      {
        name: 'Overhead Tricep Extension',
        sets: 3,
        reps: 12,
        notes: ''
      },
      {
        name: 'French Press',
        sets: 3,
        reps: 10,
        notes: ''
      }
    ]
  },
  {
    id: 'back-biceps',
    name: 'Back & Biceps',
    namePt: 'Costas e Bíceps',
    description: 'Treino focado em desenvolvimento de costas e bíceps. Ideal para dias de puxar.',
    descriptionEn: 'Focused workout on back and biceps development. Ideal for pull days.',
    difficulty: 'Intermediate',
    difficultyPt: 'Intermediário',
    duration: '1 dia',
    durationEn: '1 day',
    exercises: [
      {
        name: 'Deadlift',
        sets: 4,
        reps: 6,
        notes: 'Heavy',
        notesPt: 'Pesado'
      },
      {
        name: 'Low Row',
        sets: 3,
        reps: 10,
        notes: ''
      },
      {
        name: 'T-Bar Row',
        sets: 3,
        reps: 10,
        notes: ''
      },
      {
        name: 'High Row',
        sets: 3,
        reps: 12,
        notes: ''
      },
      {
        name: 'Barbell Curl',
        sets: 3,
        reps: 12,
        notes: ''
      },
      {
        name: 'Hammer Curl',
        sets: 3,
        reps: 12,
        notes: ''
      },
      {
        name: 'Scott Curl',
        sets: 3,
        reps: 10,
        notes: ''
      }
    ]
  },
  {
    id: 'legs',
    name: 'Legs Day',
    namePt: 'Dia de Pernas',
    description: 'Treino completo para desenvolvimento de pernas: quadríceps, posterior, glúteos e panturrilhas.',
    descriptionEn: 'Complete leg workout: quadriceps, hamstrings, glutes, and calves.',
    difficulty: 'Intermediate',
    difficultyPt: 'Intermediário',
    duration: '1 dia',
    durationEn: '1 day',
    exercises: [
      {
        name: 'Squat',
        sets: 4,
        reps: 8,
        notes: ''
      },
      {
        name: 'Leg Press',
        sets: 3,
        reps: 12,
        notes: ''
      },
      {
        name: 'Leg Extension',
        sets: 3,
        reps: 12,
        notes: ''
      },
      {
        name: 'Leg Curl',
        sets: 3,
        reps: 12,
        notes: ''
      },
      {
        name: 'Calf Raise',
        sets: 4,
        reps: 15,
        notes: ''
      }
    ]
  },
  {
    id: 'shoulders-arms',
    name: 'Shoulders & Arms',
    namePt: 'Ombros e Braços',
    description: 'Treino focado em ombros, bíceps e tríceps para desenvolvimento completo dos braços.',
    descriptionEn: 'Focused workout on shoulders, biceps, and triceps for complete arm development.',
    difficulty: 'Intermediate',
    difficultyPt: 'Intermediário',
    duration: '1 dia',
    durationEn: '1 day',
    exercises: [
      {
        name: 'Overhead Press',
        sets: 4,
        reps: 8,
        notes: ''
      },
      {
        name: 'Lateral Raise',
        sets: 3,
        reps: 12,
        notes: ''
      },
      {
        name: 'Front Raise',
        sets: 3,
        reps: 12,
        notes: ''
      },
      {
        name: 'Rear Delt Fly',
        sets: 3,
        reps: 12,
        notes: ''
      },
      {
        name: 'Barbell Curl',
        sets: 3,
        reps: 12,
        notes: ''
      },
      {
        name: 'Tricep Pushdown',
        sets: 3,
        reps: 12,
        notes: ''
      }
    ]
  },
  {
    id: 'core-focused',
    name: 'Core Focus',
    namePt: 'Foco em Core',
    description: 'Treino específico para fortalecimento do core e abdômen.',
    descriptionEn: 'Specific workout for core and abdominal strengthening.',
    difficulty: 'Beginner',
    difficultyPt: 'Iniciante',
    duration: '1 dia',
    durationEn: '1 day',
    exercises: [
      {
        name: 'Plank',
        sets: 3,
        reps: 60,
        notes: 'Seconds',
        notesPt: 'Segundos'
      },
      {
        name: 'Crunches',
        sets: 3,
        reps: 20,
        notes: ''
      },
      {
        name: 'Leg Raises',
        sets: 3,
        reps: 15,
        notes: ''
      },
      {
        name: 'Russian Twist',
        sets: 3,
        reps: 20,
        notes: 'Each side',
        notesPt: 'Cada lado'
      },
      {
        name: 'Mountain Climbers',
        sets: 3,
        reps: 30,
        notes: 'Each leg',
        notesPt: 'Cada perna'
      }
    ]
  }
];

