// Rotinas pré-montadas disponíveis para os usuários
export const presetRoutines = [
  {
    id: 'push-pull-legs-push',
    name: 'Push Pull Legs - Push Day',
    namePt: 'Empurrar Puxar Pernas - Dia de Empurrar',
    description: 'Dia 1: Empurrar - Peito, ombros e tríceps. Parte da divisão Push Pull Legs.',
    descriptionEn: 'Day 1: Push - Chest, shoulders, and triceps. Part of Push Pull Legs split.',
    goal: 'hypertrophy',
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
    goal: 'hypertrophy',
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
    goal: 'hypertrophy',
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
    goal: 'hypertrophy',
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
    goal: 'hypertrophy',
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
    goal: 'hypertrophy',
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
    goal: 'hypertrophy',
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
    goal: 'hypertrophy',
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
    goal: 'hypertrophy',
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
    goal: 'hypertrophy',
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
    goal: 'definition',
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
  },
  {
    id: 'upper-hypertrophy',
    name: 'Upper Body - Hypertrophy',
    namePt: 'Superior - Hipertrofia',
    description: 'Treino de superiores com foco em volume e boa técnica. Peito, costas, ombros e braços.',
    descriptionEn: 'Upper body workout focused on volume and good form. Chest, back, shoulders and arms.',
    goal: 'hypertrophy',
    difficulty: 'Intermediate',
    difficultyPt: 'Intermediário',
    duration: '1 dia',
    durationEn: '1 day',
    exercises: [
      { name: 'Bench Press', sets: 4, reps: 8, notes: '', notesPt: '' },
      { name: 'Incline Bench Press', sets: 3, reps: 10, notes: '', notesPt: '' },
      { name: 'Low Row', sets: 4, reps: 10, notes: '', notesPt: '' },
      { name: 'High Row', sets: 3, reps: 12, notes: '', notesPt: '' },
      { name: 'Overhead Press', sets: 3, reps: 10, notes: '', notesPt: '' },
      { name: 'Lateral Raise', sets: 3, reps: 15, notes: '', notesPt: '' },
      { name: 'Barbell Curl', sets: 3, reps: 12, notes: '', notesPt: '' },
      { name: 'Tricep Pushdown', sets: 3, reps: 12, notes: '', notesPt: '' }
    ]
  },
  {
    id: 'lower-hypertrophy-core',
    name: 'Lower Body + Core - Hypertrophy',
    namePt: 'Inferior + Core - Hipertrofia',
    description: 'Treino de pernas com foco em hipertrofia + finalização de core.',
    descriptionEn: 'Leg workout focused on hypertrophy + core finisher.',
    goal: 'hypertrophy',
    difficulty: 'Intermediate',
    difficultyPt: 'Intermediário',
    duration: '1 dia',
    durationEn: '1 day',
    exercises: [
      { name: 'Squat', sets: 4, reps: 8, notes: '', notesPt: '' },
      { name: 'Leg Press', sets: 3, reps: 12, notes: '', notesPt: '' },
      { name: 'Leg Extension', sets: 3, reps: 12, notes: '', notesPt: '' },
      { name: 'Leg Curl', sets: 3, reps: 12, notes: '', notesPt: '' },
      { name: 'Calf Raise', sets: 4, reps: 15, notes: '', notesPt: '' },
      { name: 'Plank', sets: 3, reps: 60, notes: 'Seconds', notesPt: 'Segundos' }
    ]
  },
  {
    id: 'arms-hypertrophy',
    name: 'Arms + Forearms - Hypertrophy',
    namePt: 'Braços + Antebraço - Hipertrofia',
    description: 'Foco em braços (bíceps e tríceps) com volume e antebraço no final.',
    descriptionEn: 'Arms focused workout (biceps and triceps) with forearms at the end.',
    goal: 'hypertrophy',
    difficulty: 'Intermediate',
    difficultyPt: 'Intermediário',
    duration: '1 dia',
    durationEn: '1 day',
    exercises: [
      { name: 'Barbell Curl', sets: 3, reps: 10, notes: '', notesPt: '' },
      { name: 'Hammer Curl', sets: 3, reps: 12, notes: '', notesPt: '' },
      { name: 'Scott Curl', sets: 3, reps: 10, notes: '', notesPt: '' },
      { name: 'Tricep Pushdown', sets: 3, reps: 12, notes: '', notesPt: '' },
      { name: 'Overhead Tricep Extension', sets: 3, reps: 10, notes: '', notesPt: '' },
      { name: 'French Press', sets: 3, reps: 10, notes: '', notesPt: '' },
      { name: 'Wrist Curl', sets: 3, reps: 15, notes: '', notesPt: '' },
      { name: 'Reverse Wrist Curl', sets: 3, reps: 15, notes: '', notesPt: '' }
    ]
  },
  {
    id: 'strength-full-body-5x5',
    name: 'Full Body - Strength (5x5)',
    namePt: 'Corpo Inteiro - Força (5x5)',
    description: 'Treino de força com foco em básicos e progressão. Ideal para construir carga.',
    descriptionEn: 'Strength workout focused on compounds and progression. Great for building strength.',
    goal: 'strength',
    difficulty: 'Intermediate',
    difficultyPt: 'Intermediário',
    duration: '4 semanas',
    durationEn: '4 weeks',
    exercises: [
      { name: 'Squat', sets: 5, reps: 5, notes: '', notesPt: '' },
      { name: 'Bench Press', sets: 5, reps: 5, notes: '', notesPt: '' },
      { name: 'Deadlift', sets: 3, reps: 5, notes: 'Heavy', notesPt: 'Pesado' },
      { name: 'Overhead Press', sets: 5, reps: 5, notes: '', notesPt: '' },
      { name: 'Low Row', sets: 5, reps: 5, notes: '', notesPt: '' }
    ]
  },
  {
    id: 'strength-upper',
    name: 'Upper Body - Strength',
    namePt: 'Superior - Força',
    description: 'Treino de força para membros superiores com básicos + acessórios essenciais.',
    descriptionEn: 'Upper body strength day with compounds + key accessories.',
    goal: 'strength',
    difficulty: 'Intermediate',
    difficultyPt: 'Intermediário',
    duration: '1 dia',
    durationEn: '1 day',
    exercises: [
      { name: 'Bench Press', sets: 5, reps: 5, notes: '', notesPt: '' },
      { name: 'Overhead Press', sets: 5, reps: 5, notes: '', notesPt: '' },
      { name: 'Low Row', sets: 4, reps: 6, notes: '', notesPt: '' },
      { name: 'Barbell Curl', sets: 3, reps: 6, notes: '', notesPt: '' },
      { name: 'Tricep Pushdown', sets: 3, reps: 6, notes: '', notesPt: '' }
    ]
  },
  {
    id: 'strength-lower',
    name: 'Lower Body - Strength',
    namePt: 'Inferior - Força',
    description: 'Treino de força para pernas com foco em agachamento e terra.',
    descriptionEn: 'Lower body strength day focused on squat and deadlift.',
    goal: 'strength',
    difficulty: 'Intermediate',
    difficultyPt: 'Intermediário',
    duration: '1 dia',
    durationEn: '1 day',
    exercises: [
      { name: 'Squat', sets: 5, reps: 5, notes: '', notesPt: '' },
      { name: 'Deadlift', sets: 3, reps: 5, notes: 'Heavy', notesPt: 'Pesado' },
      { name: 'Leg Press', sets: 4, reps: 6, notes: '', notesPt: '' },
      { name: 'Calf Raise', sets: 4, reps: 10, notes: '', notesPt: '' },
      { name: 'Plank', sets: 3, reps: 60, notes: 'Seconds', notesPt: 'Segundos' }
    ]
  },
  {
    id: 'definition-full-body-metabolic',
    name: 'Full Body - Definition (Metabolic)',
    namePt: 'Corpo Inteiro - Definição (Metabólico)',
    description: 'Treino com foco em intensidade e densidade: menos descanso, mais ritmo.',
    descriptionEn: 'Definition-focused workout: higher density and intensity with shorter rests.',
    goal: 'definition',
    difficulty: 'Beginner',
    difficultyPt: 'Iniciante',
    duration: '1 dia',
    durationEn: '1 day',
    exercises: [
      { name: 'Squat', sets: 3, reps: 12, notes: '', notesPt: '' },
      { name: 'Overhead Press', sets: 3, reps: 12, notes: '', notesPt: '' },
      { name: 'Low Row', sets: 3, reps: 12, notes: '', notesPt: '' },
      { name: 'Mountain Climbers', sets: 3, reps: 30, notes: 'Each leg', notesPt: 'Cada perna' },
      { name: 'Russian Twist', sets: 3, reps: 20, notes: 'Each side', notesPt: 'Cada lado' },
      { name: 'Plank', sets: 3, reps: 60, notes: 'Seconds', notesPt: 'Segundos' }
    ]
  },
  {
    id: 'definition-core-conditioning',
    name: 'Core + Conditioning - Definition',
    namePt: 'Core + Condicionamento - Definição',
    description: 'Treino de core com foco em resistência e condicionamento.',
    descriptionEn: 'Core workout focused on endurance and conditioning.',
    goal: 'definition',
    difficulty: 'Beginner',
    difficultyPt: 'Iniciante',
    duration: '1 dia',
    durationEn: '1 day',
    exercises: [
      { name: 'Plank', sets: 3, reps: 60, notes: 'Seconds', notesPt: 'Segundos' },
      { name: 'Mountain Climbers', sets: 3, reps: 30, notes: 'Each leg', notesPt: 'Cada perna' },
      { name: 'Leg Raises', sets: 3, reps: 45, notes: 'Seconds', notesPt: 'Segundos' },
      { name: 'Crunches', sets: 3, reps: 45, notes: 'Seconds', notesPt: 'Segundos' },
      { name: 'Ab Wheel', sets: 3, reps: 45, notes: 'Seconds', notesPt: 'Segundos' }
    ]
  },
  {
    id: 'definition-upper',
    name: 'Upper Body - Definition',
    namePt: 'Superior - Definição',
    description: 'Treino de superiores com volume moderado e finalização metabólica.',
    descriptionEn: 'Upper body workout with moderate volume and metabolic finisher.',
    goal: 'definition',
    difficulty: 'Intermediate',
    difficultyPt: 'Intermediário',
    duration: '1 dia',
    durationEn: '1 day',
    exercises: [
      { name: 'Incline Bench Press', sets: 3, reps: 12, notes: '', notesPt: '' },
      { name: 'High Row', sets: 3, reps: 15, notes: '', notesPt: '' },
      { name: 'Lateral Raise', sets: 3, reps: 15, notes: '', notesPt: '' },
      { name: 'Tricep Pushdown', sets: 3, reps: 15, notes: '', notesPt: '' },
      { name: 'Hammer Curl', sets: 3, reps: 15, notes: '', notesPt: '' },
      { name: 'Farmer\'s Walk', sets: 3, reps: 60, notes: 'Seconds', notesPt: 'Segundos' }
    ]
  }
];

