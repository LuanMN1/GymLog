from flask import Flask, jsonify, request
from flask_cors import CORS
from models import db, Exercise, Workout, WorkoutExercise, WorkoutSet, PR, Routine, RoutineExercise
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///gymlog.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

CORS(app)
db.init_app(app)

# Create tables
with app.app_context():
    db.create_all()

# Exercise Routes
@app.route('/api/exercises', methods=['GET'])
def list_exercises():
    exercises = Exercise.query.all()
    return jsonify([{
        'id': e.id,
        'name': e.name,
        'category': e.category,
        'description': e.description
    } for e in exercises])

@app.route('/api/exercises', methods=['POST'])
def create_exercise():
    data = request.json
    exercise = Exercise(
        name=data['name'],
        category=data.get('category', 'Other'),
        description=data.get('description', '')
    )
    db.session.add(exercise)
    db.session.commit()
    return jsonify({'id': exercise.id, 'message': 'Exercise created successfully'}), 201

# Workout Routes
@app.route('/api/workouts', methods=['GET'])
def list_workouts():
    workouts = Workout.query.order_by(Workout.date.desc()).all()
    return jsonify([{
        'id': w.id,
        'name': w.name,
        'date': w.date.isoformat(),
        'preset_id': w.preset_id,
        'exercises': [{
            'id': we.exercise.id,
            'name': we.exercise.name,
            'sets': we.sets,
            'reps': we.reps,
            'weight': we.weight,
            'duration': we.duration,
            'notes': we.notes,
            'workout_sets': [{
                'set_number': ws.set_number,
                'reps': ws.reps,
                'weight': ws.weight,
                'duration': ws.duration
            } for ws in we.workout_sets]
        } for we in w.exercises]
    } for w in workouts])

@app.route('/api/workouts', methods=['POST'])
def create_workout():
    data = request.json
    workout = Workout(
        name=data['name'],
        date=datetime.fromisoformat(data['date']),
        preset_id=data.get('preset_id')
    )
    db.session.add(workout)
    
    for ex_data in data.get('exercises', []):
        workout_exercise = WorkoutExercise(
            workout=workout,
            exercise_id=ex_data['exercise_id'],
            sets=ex_data.get('sets', 0),
            reps=ex_data.get('reps', 0),
            weight=ex_data.get('weight', 0),
            duration=ex_data.get('duration', 0),
            notes=ex_data.get('notes', '')
        )
        db.session.add(workout_exercise)
        db.session.flush()  # Para obter o ID do workout_exercise
        
        # Salvar cada série individualmente
        if 'workout_sets' in ex_data and ex_data['workout_sets']:
            for set_data in ex_data['workout_sets']:
                workout_set = WorkoutSet(
                    workout_exercise_id=workout_exercise.id,
                    set_number=set_data.get('set_number', 0),
                    reps=set_data.get('reps', 0),
                    weight=set_data.get('weight', 0),
                    duration=set_data.get('duration', 0)
                )
                db.session.add(workout_set)
    
    db.session.commit()
    return jsonify({'id': workout.id, 'message': 'Workout created successfully'}), 201

@app.route('/api/workouts/<int:workout_id>', methods=['DELETE'])
def delete_workout(workout_id):
    workout = Workout.query.get_or_404(workout_id)
    db.session.delete(workout)
    db.session.commit()
    return jsonify({'message': 'Workout deleted successfully'})

# PR Routes
@app.route('/api/prs', methods=['GET'])
def list_prs():
    prs = PR.query.order_by(PR.date.desc()).all()
    return jsonify([{
        'id': p.id,
        'exercise_id': p.exercise_id,
        'exercise_name': p.exercise.name,
        'weight': p.weight,
        'reps': p.reps,
        'duration': p.duration,
        'date': p.date.isoformat(),
        'notes': p.notes
    } for p in prs])

@app.route('/api/prs', methods=['POST'])
def create_pr():
    data = request.json
    pr = PR(
        exercise_id=data['exercise_id'],
        weight=data.get('weight', 0),
        reps=data.get('reps', 1),
        duration=data.get('duration', 0),
        date=datetime.fromisoformat(data.get('date', datetime.now().isoformat())),
        notes=data.get('notes', '')
    )
    db.session.add(pr)
    db.session.commit()
    return jsonify({'id': pr.id, 'message': 'PR registered successfully'}), 201

@app.route('/api/prs/<int:pr_id>', methods=['GET'])
def get_pr(pr_id):
    pr = PR.query.get_or_404(pr_id)
    return jsonify({
        'id': pr.id,
        'exercise_id': pr.exercise_id,
        'exercise_name': pr.exercise.name,
        'weight': pr.weight,
        'reps': pr.reps,
        'duration': pr.duration,
        'date': pr.date.isoformat(),
        'notes': pr.notes
    })

@app.route('/api/prs/<int:pr_id>', methods=['PUT'])
def update_pr(pr_id):
    pr = PR.query.get_or_404(pr_id)
    data = request.json
    
    pr.exercise_id = data.get('exercise_id', pr.exercise_id)
    pr.weight = data.get('weight', pr.weight)
    pr.reps = data.get('reps', pr.reps)
    pr.duration = data.get('duration', pr.duration)
    pr.date = datetime.fromisoformat(data.get('date', pr.date.isoformat()))
    pr.notes = data.get('notes', pr.notes)
    
    db.session.commit()
    return jsonify({'message': 'PR updated successfully'})

@app.route('/api/prs/<int:pr_id>', methods=['DELETE'])
def delete_pr(pr_id):
    pr = PR.query.get_or_404(pr_id)
    db.session.delete(pr)
    db.session.commit()
    return jsonify({'message': 'PR deleted successfully'})

@app.route('/api/prs/exercise/<int:exercise_id>', methods=['GET'])
def prs_by_exercise(exercise_id):
    prs = PR.query.filter_by(exercise_id=exercise_id).order_by(PR.date.desc()).all()
    return jsonify([{
        'id': p.id,
        'weight': p.weight,
        'reps': p.reps,
        'duration': p.duration,
        'date': p.date.isoformat(),
        'notes': p.notes
    } for p in prs])

# Routine Routes
@app.route('/api/routines', methods=['GET'])
def list_routines():
    routines = Routine.query.order_by(Routine.created_at.desc()).all()
    return jsonify([{
        'id': r.id,
        'name': r.name,
        'description': r.description,
        'preset_id': r.preset_id,
        'created_at': r.created_at.isoformat(),
        'exercises': [{
            'id': re.exercise.id,
            'name': re.exercise.name,
            'sets': re.sets,
            'reps': re.reps,
            'order': re.order,
            'notes': re.notes
        } for re in r.exercises]
    } for r in routines])

@app.route('/api/routines', methods=['POST'])
def create_routine():
    data = request.json
    routine = Routine(
        name=data['name'],
        description=data.get('description', ''),
        preset_id=data.get('preset_id', None)
    )
    db.session.add(routine)
    
    for idx, ex_data in enumerate(data.get('exercises', [])):
        routine_exercise = RoutineExercise(
            routine=routine,
            exercise_id=ex_data['exercise_id'],
            sets=ex_data.get('sets', 0),
            reps=ex_data.get('reps', 0),
            order=ex_data.get('order', idx),
            notes=ex_data.get('notes', '')
        )
        db.session.add(routine_exercise)
    
    db.session.commit()
    return jsonify({'id': routine.id, 'message': 'Routine created successfully'}), 201

@app.route('/api/routines/<int:routine_id>', methods=['GET'])
def get_routine(routine_id):
    routine = Routine.query.get_or_404(routine_id)
    return jsonify({
        'id': routine.id,
        'name': routine.name,
        'description': routine.description,
        'preset_id': routine.preset_id,
        'created_at': routine.created_at.isoformat(),
        'exercises': [{
            'id': re.exercise.id,
            'name': re.exercise.name,
            'sets': re.sets,
            'reps': re.reps,
            'order': re.order,
            'notes': re.notes
        } for re in routine.exercises]
    })

@app.route('/api/routines/<int:routine_id>', methods=['PUT'])
def update_routine(routine_id):
    routine = Routine.query.get_or_404(routine_id)
    data = request.json
    
    routine.name = data.get('name', routine.name)
    routine.description = data.get('description', routine.description)
    # Não atualiza preset_id ao editar, mantém o original
    
    # Remove existing exercises
    RoutineExercise.query.filter_by(routine_id=routine_id).delete()
    
    # Add new exercises
    for idx, ex_data in enumerate(data.get('exercises', [])):
        routine_exercise = RoutineExercise(
            routine=routine,
            exercise_id=ex_data['exercise_id'],
            sets=ex_data.get('sets', 0),
            reps=ex_data.get('reps', 0),
            order=ex_data.get('order', idx),
            notes=ex_data.get('notes', '')
        )
        db.session.add(routine_exercise)
    
    db.session.commit()
    return jsonify({'message': 'Routine updated successfully'})

@app.route('/api/routines/<int:routine_id>', methods=['DELETE'])
def delete_routine(routine_id):
    routine = Routine.query.get_or_404(routine_id)
    db.session.delete(routine)
    db.session.commit()
    return jsonify({'message': 'Routine deleted successfully'})

if __name__ == '__main__':
    app.run(debug=True, port=5000)

