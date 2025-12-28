// List of exercises that use time/duration instead of weight and reps
// These are the English names as stored in the database
export const timeBasedExercises = [
  'Plank',
  'Mountain Climbers',
  'Russian Twist',
  'Leg Raises',
  'Crunches',
  'Ab Wheel',
  'Farmer\'s Walk'
];

// Check if an exercise uses time instead of weight/reps
// Works with both English names (from DB) and translated names
export const isTimeBasedExercise = (exerciseName) => {
  if (!exerciseName) return false;
  
  // Direct match with English names (as stored in DB)
  if (timeBasedExercises.includes(exerciseName)) {
    return true;
  }
  
  // Check common translated names (case-insensitive)
  const nameLower = exerciseName.toLowerCase();
  const timeBasedNames = [
    'plank', 'prancha',
    'mountain climbers', 'escalador', 'escaladores',
    'russian twist', 'torção russa',
    'leg raises', 'elevação de pernas', 'elevação de perna',
    'crunches', 'abdominais', 'abdominal',
    'ab wheel', 'roda abdominal',
    'farmer\'s walk', 'caminhada do fazendeiro', 'farmer walk'
  ];
  
  return timeBasedNames.some(name => nameLower.includes(name) || name.includes(nameLower));
};



