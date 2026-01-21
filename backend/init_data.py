"""
Script to populate database with sample data
Run: python init_data.py
"""

from app import app
from models import db, Exercise, Workout, WorkoutExercise, PR
from datetime import datetime, timedelta
from default_exercises import DEFAULT_EXERCISES

def init_data():
    with app.app_context():
        # Create tables if they don't exist
        db.create_all()
        
        # Only initialize if exercises don't exist
        from models import Exercise
        if Exercise.query.count() > 0:
            print(f"Exercises already exist ({Exercise.query.count()} exercises). Skipping initialization.")
            return
        
        # Create sample exercises
        exercises_data = DEFAULT_EXERCISES
        
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
        
        # No sample PRs - user will add their own
        
        print("Sample data created successfully!")
        print(f"   - {len(exercises)} exercises")
        print(f"   - {len(workouts_data)} workouts")
        print("   - 0 PRs (user will add their own)")

if __name__ == '__main__':
    init_data()

