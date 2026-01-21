"""
Dados padrão de exercícios (seed).

- Mantém o "tutorial_image" aqui para que os GIFs fiquem no backend (DB),
  e não hardcoded no frontend.
"""

DEFAULT_EXERCISES = [
    # Chest
    {
        "name": "Bench Press",
        "category": "Chest",
        "description": "Chest development exercise",
        "tutorial_image": "https://media1.tenor.com/m/0hoNLcggDG0AAAAC/bench-press.gif",
    },
    {
        "name": "Incline Bench Press",
        "category": "Chest",
        "description": "Upper chest development",
        "tutorial_image": "https://media1.tenor.com/m/mXQJeQyJCi4AAAAC/bench-press-regular-bench-press.gif",
    },
    {
        "name": "Decline Bench Press",
        "category": "Chest",
        "description": "Lower chest development",
        "tutorial_image": "https://www.strengthlog.com/wp-content/uploads/2023/02/dumbbell-decline-chest-press.gif",
    },
    # Triceps
    {
        "name": "Tricep Pushdown",
        "category": "Triceps",
        "description": "Tricep extension",
        "tutorial_image": "https://media1.tenor.com/m/g0EulFQO22wAAAAC/rope-push-down.gif",
    },
    {
        "name": "Tricep Kickback",
        "category": "Triceps",
        "description": "Tricep isolation exercise",
        "tutorial_image": "https://media1.tenor.com/m/UchKCbffFNEAAAAC/kick-back.gif",
    },
    {
        "name": "Overhead Tricep Extension",
        "category": "Triceps",
        "description": "Tricep extension overhead",
        "tutorial_image": "https://media1.tenor.com/m/eFIlLX5kg3AAAAAC/working-out-sheamus.gif",
    },
    {
        "name": "French Press",
        "category": "Triceps",
        "description": "Tricep isolation with barbell",
        "tutorial_image": "https://hips.hearstapps.com/hmg-prod/images/workouts/2017/10/ezbarfrenchpress-1509458149.gif",
    },
    # Back
    {
        "name": "Deadlift",
        "category": "Back",
        "description": "Complete back and posterior exercise",
        "tutorial_image": "https://images.squarespace-cdn.com/content/v1/592be33120099e2f4b14a4d0/1507083963350-N5XEAIB45JO3H2JKN47C/MICHAEL-CUNICO_HERO_DEADLIFT+%281%29.gif",
    },
    {
        "name": "Low Row",
        "category": "Back",
        "description": "Mid-back development with low cable",
        "tutorial_image": "https://www.strengthlog.com/wp-content/uploads/2020/03/cable-row-seated-narrow-grip.gif",
    },
    {
        "name": "T-Bar Row",
        "category": "Back",
        "description": "Back width development",
        "tutorial_image": "https://www.strengthlog.com/wp-content/uploads/2020/04/t-bar-row-machine.gif",
    },
    {
        "name": "High Row",
        "category": "Back",
        "description": "Upper back development",
        "tutorial_image": "https://cdn.jefit.com/assets/img/exercises/gifs/819.gif",
    },
    # Biceps
    {
        "name": "Barbell Curl",
        "category": "Biceps",
        "description": "Bicep isolation",
        "tutorial_image": "https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/12/Barbell-biceps-curl.gif?resize=600%2C600&ssl=1",
    },
    {
        "name": "Scott Curl",
        "category": "Biceps",
        "description": "Bicep isolation on preacher bench",
        "tutorial_image": "https://cdn.fisiculturismo.com.br/monthly_2018_01/flexao-de-cotovelo-no-banco-scott-animacao.gif.c39fc6e27d046f9aca73db65376afd49.gif",
    },
    {
        "name": "Hammer Curl",
        "category": "Biceps",
        "description": "Brachialis and bicep development",
        "tutorial_image": "https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/02/Hammer-curl.gif?fit=600%2C600&ssl=1",
    },
    {
        "name": "45 Degree Curl",
        "category": "Biceps",
        "description": "Bicep curl at 45 degree angle",
        "tutorial_image": "https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/10/Incline-Dumbbell-Curl.gif?resize=600%2C600&ssl=1",
    },
    # Legs
    {
        "name": "Squat",
        "category": "Legs",
        "description": "Fundamental leg exercise",
        "tutorial_image": "https://images.squarespace-cdn.com/content/v1/54f9e84de4b0d13f30bba4cb/1530743652042-8AW6T0MPM6Q0JYEV6AO9/image-asset.gif",
    },
    {
        "name": "Leg Press",
        "category": "Legs",
        "description": "Quadriceps development",
        "tutorial_image": "https://www.mundoboaforma.com.br/wp-content/uploads/2020/12/legpress-45-animacao.gif",
    },
    {
        "name": "Leg Extension",
        "category": "Legs",
        "description": "Quadriceps isolation",
        "tutorial_image": "https://www.strengthlog.com/wp-content/uploads/2020/03/leg-extension-seated.gif",
    },
    {
        "name": "Leg Curl",
        "category": "Legs",
        "description": "Hamstring isolation",
        "tutorial_image": "https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/03/leg-curl-seated.gif?fit=600%2C600&ssl=1",
    },
    {
        "name": "Calf Raise",
        "category": "Legs",
        "description": "Calf development",
        "tutorial_image": "https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/03/calf-raise-standing.gif?fit=600%2C600&ssl=1",
    },
    {
        "name": "Smith Machine Squat",
        "category": "Legs",
        "description": "Squat with guided bar",
        "tutorial_image": "https://www.strengthlog.com/wp-content/uploads/2020/04/smith-machine-squat.gif",
    },
    # Shoulders
    {
        "name": "Overhead Press",
        "category": "Shoulders",
        "description": "Shoulder development with barbell",
        "tutorial_image": "https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/11/Seated-dumbbell-shoulder-press.gif?fit=600,600&ssl=1",
    },
    {
        "name": "Lateral Raise",
        "category": "Shoulders",
        "description": "Lateral deltoid isolation",
        "tutorial_image": "https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/12/Dumbbell-Lateral-Raise.gif?fit=600%2C600&ssl=1",
    },
    {
        "name": "Front Raise",
        "category": "Shoulders",
        "description": "Front deltoid development",
        "tutorial_image": "https://www.strengthlog.com/wp-content/uploads/2020/03/Dumbbell-Front-Raise.gif",
    },
    {
        "name": "Rear Delt Fly",
        "category": "Shoulders",
        "description": "Rear deltoid isolation",
        "tutorial_image": "https://media.tenor.com/HTvjufujuJAAAAAM/rear-raise-rear.gif",
    },
    {
        "name": "Arnold Press",
        "category": "Shoulders",
        "description": "Complete shoulder development",
        "tutorial_image": "https://media2.giphy.com/media/v1.Y2lkPTZjMDliOTUyam01ZWEydWt3b29zOXkyaWxxMzJ4ZTV6anp6MTRtdHk2ZHh3MjNkaCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/jtVqKOyQqglvJ9itlo/giphy.gif",
    },
    # Forearms
    {
        "name": "Wrist Curl",
        "category": "Forearms",
        "description": "Forearm flexor development",
        "tutorial_image": "https://www.strengthlog.com/wp-content/uploads/2021/01/Dumbbell-Wrist-Curl.gif",
    },
    {
        "name": "Reverse Wrist Curl",
        "category": "Forearms",
        "description": "Forearm extensor development",
        "tutorial_image": "https://cdn.jefit.com/assets/img/exercises/gifs/1093.gif",
    },
    {
        "name": "Farmer's Walk",
        "category": "Forearms",
        "description": "Grip strength and forearm endurance",
        "tutorial_image": "https://media3.giphy.com/media/v1.Y2lkPTZjMDliOTUydGcycDhvd3B2Z3N4Z3dhMnA0Z2ljYnp4Ymd4ODZyc29ua3A0OThzZiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3oKIPz1pK2Mg42bUk0/source.gif",
    },
    # Core/Abdomen
    {
        "name": "Crunches",
        "category": "Core",
        "description": "Upper abdominals",
        "tutorial_image": "https://www.strengthlog.com/wp-content/uploads/2023/01/Crunch.gif",
    },
    {
        "name": "Leg Raises",
        "category": "Core",
        "description": "Lower abdominals",
        "tutorial_image": "https://cdn.jefit.com/assets/img/exercises/gifs/44.gif",
    },
    {
        "name": "Plank",
        "category": "Core",
        "description": "Core stability and endurance",
        "tutorial_image": "https://cdn.jefit.com/assets/img/exercises/gifs/631.gif",
    },
    {
        "name": "Russian Twist",
        "category": "Core",
        "description": "Oblique development",
        "tutorial_image": "https://benchmarkphysio.com.au/wp-content/uploads/2025/04/Russian-twist-exercise.gif",
    },
    {
        "name": "Mountain Climbers",
        "category": "Core",
        "description": "Full core workout",
        "tutorial_image": "https://i0.wp.com/post.healthline.com/wp-content/uploads/2022/01/400x400_9_Best_Bodyweight_Shoulder_Exercises_for_Every_Body_Mountain_Climbers-1.gif?h=840",
    },
    {
        "name": "Ab Wheel",
        "category": "Core",
        "description": "Advanced core strength",
        "tutorial_image": "https://cdn.shopify.com/s/files/1/0493/0899/1655/files/ABS_WHEEL_480x480.gif?v=1607820611",
    },
]

