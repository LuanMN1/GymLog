// Exercise detailed information including tutorial images and muscle groups
// Using reliable CDN sources - URLs can be replaced with actual exercise GIFs
// For now using placeholder service - replace with actual GIF URLs from GIPHY, ExRx, or local files
export const exerciseData = {
  'Bench Press': {
    muscleGroups: ['Pectoralis Major', 'Anterior Deltoids', 'Triceps'],
    // Replace with actual GIF URL: https://giphy.com/search/bench-press or use local file
    tutorialImage: 'https://media1.tenor.com/m/0hoNLcggDG0AAAAC/bench-press.gif', // Replace with actual URL
    instructions: [
      'Lie flat on the bench with feet firmly on the ground',
      'Grip the bar slightly wider than shoulder-width',
      'Lower the bar to your chest with control',
      'Press the bar up explosively until arms are fully extended'
    ]
  },
  'Incline Bench Press': {
    muscleGroups: ['Upper Pectorals', 'Anterior Deltoids', 'Triceps'],
    tutorialImage: 'https://media1.tenor.com/m/mXQJeQyJCi4AAAAC/bench-press-regular-bench-press.gif', // Replace with actual URL
    instructions: [
      'Set bench to 30-45 degree incline',
      'Lie back with feet flat on the floor',
      'Lower bar to upper chest',
      'Press up and slightly forward'
    ]
  },
  'Decline Bench Press': {
    muscleGroups: ['Lower Pectorals', 'Anterior Deltoids', 'Triceps'],
    tutorialImage: 'https://www.strengthlog.com/wp-content/uploads/2023/02/dumbbell-decline-chest-press.gif', // Replace with actual URL
    instructions: [
      'Secure yourself on the decline bench',
      'Grip bar at shoulder width',
      'Lower to lower chest',
      'Press up with full extension'
    ]
  },
  'Tricep Pushdown': {
    muscleGroups: ['Triceps', 'Anterior Deltoids'],
    tutorialImage: 'https://media1.tenor.com/m/g0EulFQO22wAAAAC/rope-push-down.gif', // Replace with actual URL
    instructions: [
      'Stand with feet shoulder-width apart',
      'Keep elbows close to your body',
      'Push the bar down until arms are fully extended',
      'Slowly return to starting position'
    ]
  },
  'Tricep Kickback': {
    muscleGroups: ['Triceps'],
    tutorialImage: 'https://media1.tenor.com/m/UchKCbffFNEAAAAC/kick-back.gif', // Replace with actual URL
    instructions: [
      'Bend forward with one knee on bench',
      'Keep upper arm parallel to floor',
      'Extend arm backward until fully straight',
      'Squeeze tricep at the top'
    ]
  },
  'Overhead Tricep Extension': {
    muscleGroups: ['Triceps', 'Anterior Deltoids'],
    tutorialImage: 'https://media1.tenor.com/m/eFIlLX5kg3AAAAAC/working-out-sheamus.gif', // Replace with actual URL
    instructions: [
      'Hold weight overhead with both hands',
      'Keep elbows close to head',
      'Lower weight behind head',
      'Extend arms back to starting position'
    ]
  },
  'French Press': {
    muscleGroups: ['Triceps'],
    tutorialImage: 'https://hips.hearstapps.com/hmg-prod/images/workouts/2017/10/ezbarfrenchpress-1509458149.gif', // Replace with actual URL
    instructions: [
      'Lie on bench holding barbell overhead',
      'Keep upper arms stationary',
      'Lower bar to forehead',
      'Extend arms back up'
    ]
  },
  'Deadlift': {
    muscleGroups: ['Erector Spinae', 'Glutes', 'Hamstrings', 'Lats', 'Traps'],
    tutorialImage: 'https://images.squarespace-cdn.com/content/v1/592be33120099e2f4b14a4d0/1507083963350-N5XEAIB45JO3H2JKN47C/MICHAEL-CUNICO_HERO_DEADLIFT+%281%29.gif', // Replace with actual URL
    instructions: [
      'Stand with feet hip-width apart',
      'Bend at hips and knees to grip bar',
      'Keep back straight and chest up',
      'Drive through heels to stand up'
    ]
  },
  'Low Row': {
    muscleGroups: ['Lats', 'Rhomboids', 'Middle Traps', 'Rear Deltoids'],
    tutorialImage: 'https://www.strengthlog.com/wp-content/uploads/2020/03/cable-row-seated-narrow-grip.gif', // Replace with actual URL
    instructions: [
      'Sit with feet on platform',
      'Pull handle to lower abdomen',
      'Squeeze shoulder blades together',
      'Control the return'
    ]
  },
  'T-Bar Row': {
    muscleGroups: ['Lats', 'Rhomboids', 'Middle Traps', 'Biceps'],
    tutorialImage: 'https://www.strengthlog.com/wp-content/uploads/2020/04/t-bar-row-machine.gif', // Replace with actual URL
    instructions: [
      'Sit with knees slightly bent',
      'Pull cable to torso',
      'Squeeze back muscles',
      'Return with control'
    ]
  },
  'High Row': {
    muscleGroups: ['Upper Traps', 'Rear Deltoids', 'Rhomboids'],
    tutorialImage: 'https://cdn.jefit.com/assets/img/exercises/gifs/819.gif', // Replace with actual URL
    instructions: [
      'Pull cable to upper chest level',
      'Keep elbows high',
      'Squeeze upper back',
      'Return slowly'
    ]
  },
  'Barbell Curl': {
    muscleGroups: ['Biceps', 'Brachialis'],
    tutorialImage: 'https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/12/Barbell-biceps-curl.gif?resize=600%2C600&ssl=1', // Replace with actual URL
    instructions: [
      'Stand with feet shoulder-width apart',
      'Keep elbows close to body',
      'Curl bar to shoulders',
      'Lower with control'
    ]
  },
  'Scott Curl': {
    muscleGroups: ['Biceps'],
    tutorialImage: 'https://cdn.fisiculturismo.com.br/monthly_2018_01/flexao-de-cotovelo-no-banco-scott-animacao.gif.c39fc6e27d046f9aca73db65376afd49.gif', // Replace with actual URL
    instructions: [
      'Rest arms on preacher bench',
      'Curl weight up',
      'Squeeze biceps at top',
      'Lower slowly'
    ]
  },
  'Hammer Curl': {
    muscleGroups: ['Brachialis', 'Biceps', 'Forearms'],
    tutorialImage: 'https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/02/Hammer-curl.gif?fit=600%2C600&ssl=1', // Replace with actual URL
    instructions: [
      'Hold dumbbells with neutral grip',
      'Keep elbows stationary',
      'Curl weights up',
      'Lower with control'
    ]
  },
  '45 Degree Curl': {
    muscleGroups: ['Biceps', 'Brachialis'],
    tutorialImage: 'https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/10/Incline-Dumbbell-Curl.gif?resize=600%2C600&ssl=1', // Replace with actual URL
    instructions: [
      'Set bench to 45 degrees',
      'Rest back against bench',
      'Curl weights up',
      'Lower slowly'
    ]
  },
  'Squat': {
    muscleGroups: ['Quadriceps', 'Glutes', 'Hamstrings', 'Calves'],
    tutorialImage: 'https://images.squarespace-cdn.com/content/v1/54f9e84de4b0d13f30bba4cb/1530743652042-8AW6T0MPM6Q0JYEV6AO9/image-asset.gif', // Replace with actual URL
    instructions: [
      'Stand with feet shoulder-width apart',
      'Lower body by bending knees and hips',
      'Go down until thighs parallel to floor',
      'Drive through heels to stand up'
    ]
  },
  'Leg Press': {
    muscleGroups: ['Quadriceps', 'Glutes', 'Hamstrings'],
    tutorialImage: 'https://www.mundoboaforma.com.br/wp-content/uploads/2020/12/legpress-45-animacao.gif', // Replace with actual URL
    instructions: [
      'Sit with back against pad',
      'Place feet on platform',
      'Lower weight by bending knees',
      'Press back up to starting position'
    ]
  },
  'Leg Extension': {
    muscleGroups: ['Quadriceps'],
    tutorialImage: 'https://www.strengthlog.com/wp-content/uploads/2020/03/leg-extension-seated.gif', // Replace with actual URL
    instructions: [
      'Sit with back against pad',
      'Place ankles under pads',
      'Extend legs until straight',
      'Lower with control'
    ]
  },
  'Leg Curl': {
    muscleGroups: ['Hamstrings', 'Calves'],
    tutorialImage: 'https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/03/leg-curl-seated.gif?fit=600%2C600&ssl=1', // Replace with actual URL
    instructions: [
      'Lie face down on machine',
      'Place heels under pads',
      'Curl legs up',
      'Lower slowly'
    ]
  },
  'Calf Raise': {
    muscleGroups: ['Gastrocnemius', 'Soleus'],
    tutorialImage: 'https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/03/calf-raise-standing.gif?fit=600%2C600&ssl=1', // Replace with actual URL
    instructions: [
      'Stand on platform with balls of feet',
      'Lower heels below platform',
      'Raise up on toes',
      'Lower with control'
    ]
  },
  'Smith Machine Squat': {
    muscleGroups: ['Quadriceps', 'Glutes', 'Hamstrings'],
    tutorialImage: 'https://www.strengthlog.com/wp-content/uploads/2020/04/smith-machine-squat.gif', // Replace with actual URL
    instructions: [
      'Position bar on shoulders',
      'Unrack bar by rotating',
      'Squat down with control',
      'Press up and rerack'
    ]
  },
  'Overhead Press': {
    muscleGroups: ['Anterior Deltoids', 'Lateral Deltoids', 'Triceps', 'Upper Traps'],
    tutorialImage: 'https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/11/Seated-dumbbell-shoulder-press.gif?fit=600,600&ssl=1', // Replace with actual URL
    instructions: [
      'Stand with feet shoulder-width apart',
      'Hold bar at shoulder level',
      'Press bar overhead',
      'Lower with control'
    ]
  },
  'Lateral Raise': {
    muscleGroups: ['Lateral Deltoids'],
    tutorialImage: 'https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/12/Dumbbell-Lateral-Raise.gif?fit=600%2C600&ssl=1', // Replace with actual URL
    instructions: [
      'Stand holding dumbbells at sides',
      'Raise arms to shoulder height',
      'Keep slight bend in elbows',
      'Lower with control'
    ]
  },
  'Front Raise': {
    muscleGroups: ['Anterior Deltoids'],
    tutorialImage: 'https://www.strengthlog.com/wp-content/uploads/2020/03/Dumbbell-Front-Raise.gif', // Replace with actual URL
    instructions: [
      'Stand holding dumbbells in front',
      'Raise arms forward to shoulder height',
      'Keep arms straight',
      'Lower slowly'
    ]
  },
  'Rear Delt Fly': {
    muscleGroups: ['Rear Deltoids', 'Rhomboids'],
    tutorialImage: 'https://media.tenor.com/HTvjufujuJAAAAAM/rear-raise-rear.gif', // Replace with actual URL
    instructions: [
      'Bend forward with slight knee bend',
      'Raise arms out to sides',
      'Squeeze rear delts',
      'Lower with control'
    ]
  },
  'Arnold Press': {
    muscleGroups: ['Anterior Deltoids', 'Lateral Deltoids', 'Triceps'],
    tutorialImage: 'https://media2.giphy.com/media/v1.Y2lkPTZjMDliOTUyam01ZWEydWt3b29zOXkyaWxxMzJ4ZTV6anp6MTRtdHk2ZHh3MjNkaCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/jtVqKOyQqglvJ9itlo/giphy.gif', // Replace with actual URL
    instructions: [
      'Start with palms facing you',
      'Rotate and press up',
      'Rotate back on the way down',
      'Repeat motion'
    ]
  },
  'Wrist Curl': {
    muscleGroups: ['Forearm Flexors'],
    tutorialImage: 'https://www.strengthlog.com/wp-content/uploads/2021/01/Dumbbell-Wrist-Curl.gif', // Replace with actual URL
    instructions: [
      'Sit with forearms on bench',
      'Curl wrists up',
      'Squeeze at top',
      'Lower slowly'
    ]
  },
  'Reverse Wrist Curl': {
    muscleGroups: ['Forearm Extensors'],
    tutorialImage: 'https://cdn.jefit.com/assets/img/exercises/gifs/1093.gif', // Replace with actual URL
    instructions: [
      'Sit with forearms on bench',
      'Curl wrists up (reverse grip)',
      'Squeeze at top',
      'Lower slowly'
    ]
  },
  'Farmer\'s Walk': {
    muscleGroups: ['Forearms', 'Traps', 'Core'],
    tutorialImage: 'https://media3.giphy.com/media/v1.Y2lkPTZjMDliOTUydGcycDhvd3B2Z3N4Z3dhMnA0Z2ljYnp4Ymd4ODZyc29ua3A0OThzZiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3oKIPz1pK2Mg42bUk0/source.gif', // Replace with actual URL
    instructions: [
      'Pick up heavy weights',
      'Walk forward with good posture',
      'Keep core tight',
      'Walk for distance or time'
    ]
  },
  'Crunches': {
    muscleGroups: ['Rectus Abdominis', 'Obliques'],
    tutorialImage: 'https://www.strengthlog.com/wp-content/uploads/2023/01/Crunch.gif', // Replace with actual URL
    instructions: [
      'Lie on back with knees bent',
      'Place hands behind head',
      'Curl upper body toward knees',
      'Lower with control'
    ]
  },
  'Leg Raises': {
    muscleGroups: ['Lower Abs', 'Hip Flexors'],
    tutorialImage: 'https://cdn.jefit.com/assets/img/exercises/gifs/44.gif', // Replace with actual URL
    instructions: [
      'Lie on back with hands at sides',
      'Raise legs straight up',
      'Lower legs slowly',
      'Keep lower back pressed to floor'
    ]
  },
  'Plank': {
    muscleGroups: ['Core', 'Shoulders', 'Glutes'],
    tutorialImage: 'https://cdn.jefit.com/assets/img/exercises/gifs/631.gif', // Replace with actual URL
    instructions: [
      'Start in push-up position',
      'Hold body straight',
      'Keep core tight',
      'Hold for time'
    ]
  },
  'Russian Twist': {
    muscleGroups: ['Obliques', 'Core'],
    tutorialImage: 'https://benchmarkphysio.com.au/wp-content/uploads/2025/04/Russian-twist-exercise.gif', // Replace with actual URL
    instructions: [
      'Sit with knees bent and lean back',
      'Rotate torso side to side',
      'Keep core engaged',
      'Add weight for difficulty'
    ]
  },
  'Mountain Climbers': {
    muscleGroups: ['Core', 'Shoulders', 'Cardio'],
    tutorialImage: 'https://i0.wp.com/post.healthline.com/wp-content/uploads/2022/01/400x400_9_Best_Bodyweight_Shoulder_Exercises_for_Every_Body_Mountain_Climbers-1.gif?h=840', // Replace with actual URL
    instructions: [
      'Start in plank position',
      'Alternate bringing knees to chest',
      'Keep core tight',
      'Maintain steady pace'
    ]
  },
  'Ab Wheel': {
    muscleGroups: ['Core', 'Shoulders', 'Lats'],
    tutorialImage: 'https://cdn.shopify.com/s/files/1/0493/0899/1655/files/ABS_WHEEL_480x480.gif?v=1607820611', // Replace with actual URL
    instructions: [
      'Kneel holding ab wheel',
      'Roll forward keeping core tight',
      'Go as far as you can control',
      'Roll back to starting position'
    ]
  }
};
