"""
Script to populate database with sample data
Run: python init_data.py
"""

from app import app
from models import db, Exercise, Workout, WorkoutExercise, PR
from datetime import datetime, timedelta

def init_data():
    with app.app_context():
        # Clear existing data
        db.drop_all()
        db.create_all()
        
        # Create sample exercises
        exercises_data = [
            # Chest
            {'name': 'Bench Press', 'category': 'Chest', 'description': 'Chest development exercise'},
            {'name': 'Incline Bench Press', 'category': 'Chest', 'description': 'Upper chest development'},
            {'name': 'Decline Bench Press', 'category': 'Chest', 'description': 'Lower chest development'},
            
            # Triceps
            {'name': 'Tricep Pushdown', 'category': 'Triceps', 'description': 'Tricep extension'},
            {'name': 'Tricep Kickback', 'category': 'Triceps', 'description': 'Tricep isolation exercise'},
            {'name': 'Overhead Tricep Extension', 'category': 'Triceps', 'description': 'Tricep extension overhead'},
            {'name': 'French Press', 'category': 'Triceps', 'description': 'Tricep isolation with barbell'},
            
            # Back
            {'name': 'Deadlift', 'category': 'Back', 'description': 'Complete back and posterior exercise'},
            {'name': 'Low Row', 'category': 'Back', 'description': 'Mid-back development with low cable'},
            {'name': 'T-Bar Row', 'category': 'Back', 'description': 'Back width development'},
            {'name': 'High Row', 'category': 'Back', 'description': 'Upper back development'},
            
            # Biceps
            {'name': 'Barbell Curl', 'category': 'Biceps', 'description': 'Bicep isolation'},
            {'name': 'Scott Curl', 'category': 'Biceps', 'description': 'Bicep isolation on preacher bench'},
            {'name': 'Hammer Curl', 'category': 'Biceps', 'description': 'Brachialis and bicep development'},
            {'name': '45 Degree Curl', 'category': 'Biceps', 'description': 'Bicep curl at 45 degree angle'},
            
            # Legs
            {'name': 'Squat', 'category': 'Legs', 'description': 'Fundamental leg exercise'},
            {'name': 'Leg Press', 'category': 'Legs', 'description': 'Quadriceps development'},
            {'name': 'Leg Extension', 'category': 'Legs', 'description': 'Quadriceps isolation'},
            {'name': 'Leg Curl', 'category': 'Legs', 'description': 'Hamstring isolation'},
            {'name': 'Calf Raise', 'category': 'Legs', 'description': 'Calf development'},
            {'name': 'Smith Machine Squat', 'category': 'Legs', 'description': 'Squat with guided bar'},
            
            # Shoulders
            {'name': 'Overhead Press', 'category': 'Shoulders', 'description': 'Shoulder development with barbell'},
            {'name': 'Lateral Raise', 'category': 'Shoulders', 'description': 'Lateral deltoid isolation'},
            {'name': 'Front Raise', 'category': 'Shoulders', 'description': 'Front deltoid development'},
            {'name': 'Rear Delt Fly', 'category': 'Shoulders', 'description': 'Rear deltoid isolation'},
            {'name': 'Arnold Press', 'category': 'Shoulders', 'description': 'Complete shoulder development'},
            
            # Forearms
            {'name': 'Wrist Curl', 'category': 'Forearms', 'description': 'Forearm flexor development'},
            {'name': 'Reverse Wrist Curl', 'category': 'Forearms', 'description': 'Forearm extensor development'},
            {'name': 'Farmer\'s Walk', 'category': 'Forearms', 'description': 'Grip strength and forearm endurance'},
            
            # Core/Abdomen
            {'name': 'Crunches', 'category': 'Core', 'description': 'Upper abdominals'},
            {'name': 'Leg Raises', 'category': 'Core', 'description': 'Lower abdominals'},
            {'name': 'Plank', 'category': 'Core', 'description': 'Core stability and endurance'},
            {'name': 'Russian Twist', 'category': 'Core', 'description': 'Oblique development'},
            {'name': 'Mountain Climbers', 'category': 'Core', 'description': 'Full core workout'},
            {'name': 'Ab Wheel', 'category': 'Core', 'description': 'Advanced core strength'},
        ]
        
        exercises = []
        for ex_data in exercises_data:
            exercise = Exercise(**ex_data)
            db.session.add(exercise)
            exercises.append(exercise)
        
        db.session.commit()
        
        # Create sample workouts
        today = datetime.now()
        workouts_data = [
            {
                'name': 'Workout A - Chest & Triceps',
                'date': today - timedelta(days=2),
                'exercises': [
                    {'exercise_id': exercises[0].id, 'sets': 4, 'reps': 8, 'weight': 80},
                    {'exercise_id': exercises[5].id, 'sets': 3, 'reps': 12, 'weight': 30},
                ]
            },
            {
                'name': 'Workout B - Legs',
                'date': today - timedelta(days=1),
                'exercises': [
                    {'exercise_id': exercises[1].id, 'sets': 5, 'reps': 5, 'weight': 120},
                ]
            },
            {
                'name': 'Workout C - Back & Biceps',
                'date': today,
                'exercises': [
                    {'exercise_id': exercises[2].id, 'sets': 4, 'reps': 6, 'weight': 150},
                    {'exercise_id': exercises[4].id, 'sets': 3, 'reps': 10, 'weight': 20},
                ]
            }
        ]
        
        for workout_data in workouts_data:
            workout = Workout(
                name=workout_data['name'],
                date=workout_data['date']
            )
            db.session.add(workout)
            
            for ex_data in workout_data['exercises']:
                workout_exercise = WorkoutExercise(
                    workout=workout,
                    exercise_id=ex_data['exercise_id'],
                    sets=ex_data['sets'],
                    reps=ex_data['reps'],
                    weight=ex_data['weight']
                )
                db.session.add(workout_exercise)
        
        db.session.commit()
        
        # Create sample PRs
        prs_data = [
            {'exercise_id': exercises[0].id, 'weight': 85, 'reps': 8, 'date': today - timedelta(days=5)},
            {'exercise_id': exercises[1].id, 'weight': 125, 'reps': 5, 'date': today - timedelta(days=3)},
            {'exercise_id': exercises[2].id, 'weight': 155, 'reps': 6, 'date': today - timedelta(days=1)},
        ]
        
        for pr_data in prs_data:
            pr = PR(**pr_data)
            db.session.add(pr)
        
        db.session.commit()
        
        print("Sample data created successfully!")
        print(f"   - {len(exercises)} exercises")
        print(f"   - {len(workouts_data)} workouts")
        print(f"   - {len(prs_data)} PRs")

if __name__ == '__main__':
    init_data()

