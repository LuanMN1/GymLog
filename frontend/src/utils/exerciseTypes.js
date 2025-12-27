// List of exercises that use time/duration instead of weight and reps
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
export const isTimeBasedExercise = (exerciseName) => {
  return timeBasedExercises.includes(exerciseName);
};

