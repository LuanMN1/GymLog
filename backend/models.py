from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(255), nullable=False)
    username = db.Column(db.String(100), nullable=True)
    avatar = db.Column(db.Text, nullable=True)  # Base64 encoded image
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.now())
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    def __repr__(self):
        return f'<User {self.email}>'

class Exercise(db.Model):
    __tablename__ = 'exercises'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(50), default='Other')
    description = db.Column(db.Text)
    tutorial_image = db.Column(db.Text, nullable=True)
    
    def __repr__(self):
        return f'<Exercise {self.name}>'

class Workout(db.Model):
    __tablename__ = 'workouts'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    date = db.Column(db.DateTime, nullable=False, default=db.func.now())
    preset_id = db.Column(db.String(100), nullable=True)  # ID da rotina pré-montada, se aplicável
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)  # NULL para modo guest
    
    exercises = db.relationship('WorkoutExercise', back_populates='workout', cascade='all, delete-orphan')
    
    def __repr__(self):
        return f'<Workout {self.name} - {self.date}>'

class WorkoutExercise(db.Model):
    __tablename__ = 'workout_exercises'
    
    id = db.Column(db.Integer, primary_key=True)
    workout_id = db.Column(db.Integer, db.ForeignKey('workouts.id'), nullable=False)
    exercise_id = db.Column(db.Integer, db.ForeignKey('exercises.id'), nullable=False)
    sets = db.Column(db.Integer, default=0)
    reps = db.Column(db.Integer, default=0)
    weight = db.Column(db.Float, default=0)
    duration = db.Column(db.Integer, default=0)  # Duration in seconds for time-based exercises
    notes = db.Column(db.Text)
    
    workout = db.relationship('Workout', back_populates='exercises')
    exercise = db.relationship('Exercise')
    workout_sets = db.relationship('WorkoutSet', back_populates='workout_exercise', cascade='all, delete-orphan', order_by='WorkoutSet.set_number')
    
    def __repr__(self):
        return f'<WorkoutExercise {self.exercise_id} - {self.workout_id}>'

class WorkoutSet(db.Model):
    __tablename__ = 'workout_sets'
    
    id = db.Column(db.Integer, primary_key=True)
    workout_exercise_id = db.Column(db.Integer, db.ForeignKey('workout_exercises.id'), nullable=False)
    set_number = db.Column(db.Integer, nullable=False)  # Número da série (1, 2, 3, etc.)
    reps = db.Column(db.Integer, default=0)
    weight = db.Column(db.Float, default=0)
    duration = db.Column(db.Integer, default=0)  # Duration in seconds for time-based exercises
    
    workout_exercise = db.relationship('WorkoutExercise', back_populates='workout_sets')
    
    def __repr__(self):
        return f'<WorkoutSet {self.set_number} - {self.workout_exercise_id}>'

class PR(db.Model):
    __tablename__ = 'prs'
    
    id = db.Column(db.Integer, primary_key=True)
    exercise_id = db.Column(db.Integer, db.ForeignKey('exercises.id'), nullable=False)
    weight = db.Column(db.Float, default=0)  # Changed to allow 0 for time-based exercises
    reps = db.Column(db.Integer, default=1)
    duration = db.Column(db.Integer, default=0)  # Duration in seconds for time-based exercises
    date = db.Column(db.DateTime, nullable=False, default=db.func.now())
    notes = db.Column(db.Text)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)  # NULL para modo guest
    
    exercise = db.relationship('Exercise')
    
    def __repr__(self):
        return f'<PR {self.exercise_id} - {self.weight}kg>'

class Routine(db.Model):
    __tablename__ = 'routines'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    preset_id = db.Column(db.String(100), nullable=True)  # ID da rotina pré-montada, se aplicável
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.now())
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)  # NULL para modo guest
    
    exercises = db.relationship('RoutineExercise', back_populates='routine', cascade='all, delete-orphan', order_by='RoutineExercise.order')
    
    def __repr__(self):
        return f'<Routine {self.name}>'

class RoutineExercise(db.Model):
    __tablename__ = 'routine_exercises'
    
    id = db.Column(db.Integer, primary_key=True)
    routine_id = db.Column(db.Integer, db.ForeignKey('routines.id'), nullable=False)
    exercise_id = db.Column(db.Integer, db.ForeignKey('exercises.id'), nullable=False)
    sets = db.Column(db.Integer, default=0)
    reps = db.Column(db.Integer, default=0)
    order = db.Column(db.Integer, default=0)
    notes = db.Column(db.Text)
    
    routine = db.relationship('Routine', back_populates='exercises')
    exercise = db.relationship('Exercise')
    
    def __repr__(self):
        return f'<RoutineExercise {self.exercise_id} - {self.routine_id}>'

