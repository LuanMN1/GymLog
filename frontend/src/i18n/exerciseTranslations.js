// Exercise name translations
export const exerciseTranslations = {
  en: {
    'Bench Press': 'Bench Press',
    'Incline Bench Press': 'Incline Bench Press',
    'Decline Bench Press': 'Decline Bench Press',
    'Tricep Pushdown': 'Tricep Pushdown',
    'Tricep Kickback': 'Tricep Kickback',
    'Overhead Tricep Extension': 'Overhead Tricep Extension',
    'French Press': 'French Press',
    'Deadlift': 'Deadlift',
    'Low Row': 'Low Row',
    'Cable Row': 'Cable Row',
    'High Row': 'High Row',
    'Barbell Curl': 'Barbell Curl',
    'Scott Curl': 'Scott Curl',
    'Hammer Curl': 'Hammer Curl',
    '45 Degree Curl': '45 Degree Curl',
    'Squat': 'Squat',
    'Leg Press': 'Leg Press',
    'Leg Extension': 'Leg Extension',
    'Leg Curl': 'Leg Curl',
    'Calf Raise': 'Calf Raise',
    'Smith Machine Squat': 'Smith Machine Squat',
    'Overhead Press': 'Overhead Press'
  },
  'pt-BR': {
    'Bench Press': 'Supino Reto',
    'Incline Bench Press': 'Supino Inclinado',
    'Decline Bench Press': 'Supino Declinado',
    'Tricep Pushdown': 'Tríceps Pulley',
    'Tricep Kickback': 'Tríceps Coice',
    'Overhead Tricep Extension': 'Tríceps Testa',
    'French Press': 'Tríceps Francês',
    'Deadlift': 'Levantamento Terra',
    'Low Row': 'Remada Baixa',
    'Cable Row': 'Remada Cavalinho',
    'High Row': 'Remada Alta',
    'Barbell Curl': 'Rosca Direta',
    'Scott Curl': 'Rosca Scott',
    'Hammer Curl': 'Rosca Martelo',
    '45 Degree Curl': 'Rosca 45°',
    'Squat': 'Agachamento',
    'Leg Press': 'Leg Press',
    'Leg Extension': 'Extensora',
    'Leg Curl': 'Flexora',
    'Calf Raise': 'Panturrilha',
    'Smith Machine Squat': 'Agachamento no Smith',
    'Overhead Press': 'Desenvolvimento'
  },
  'pt-PT': {
    'Bench Press': 'Supino Reto',
    'Incline Bench Press': 'Supino Inclinado',
    'Decline Bench Press': 'Supino Declinado',
    'Tricep Pushdown': 'Tríceps Pulley',
    'Tricep Kickback': 'Tríceps Coice',
    'Overhead Tricep Extension': 'Tríceps Testa',
    'French Press': 'Tríceps Francês',
    'Deadlift': 'Peso Morto',
    'Low Row': 'Remada Baixa',
    'Cable Row': 'Remada Cavalinho',
    'High Row': 'Remada Alta',
    'Barbell Curl': 'Rosca Direta',
    'Scott Curl': 'Rosca Scott',
    'Hammer Curl': 'Rosca Martelo',
    '45 Degree Curl': 'Rosca 45°',
    'Squat': 'Agachamento',
    'Leg Press': 'Leg Press',
    'Leg Extension': 'Extensora',
    'Leg Curl': 'Flexora',
    'Calf Raise': 'Panturrilha',
    'Smith Machine Squat': 'Agachamento no Smith',
    'Overhead Press': 'Desenvolvimento'
  }
};

// Helper function to get translated exercise name
export const getTranslatedExerciseName = (exerciseName, language) => {
  return exerciseTranslations[language]?.[exerciseName] || exerciseName;
};

