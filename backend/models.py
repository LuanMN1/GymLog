from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Exercise(db.Model):
    __tablename__ = 'exercises'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(50), default='Other')
    description = db.Column(db.Text)
    
    def __repr__(self):
        return f'<Exercise {self.name}>'

class Workout(db.Model):
    __tablename__ = 'workouts'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    date = db.Column(db.DateTime, nullable=False, default=db.func.now())
    
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
    notes = db.Column(db.Text)
    
    workout = db.relationship('Workout', back_populates='exercises')
    exercise = db.relationship('Exercise')
    
    def __repr__(self):
        return f'<WorkoutExercise {self.exercise_id} - {self.workout_id}>'

class PR(db.Model):
    __tablename__ = 'prs'
    
    id = db.Column(db.Integer, primary_key=True)
    exercise_id = db.Column(db.Integer, db.ForeignKey('exercises.id'), nullable=False)
    weight = db.Column(db.Float, nullable=False)
    reps = db.Column(db.Integer, default=1)
    date = db.Column(db.DateTime, nullable=False, default=db.func.now())
    notes = db.Column(db.Text)
    
    exercise = db.relationship('Exercise')
    
    def __repr__(self):
        return f'<PR {self.exercise_id} - {self.weight}kg>'

class Routine(db.Model):
    __tablename__ = 'routines'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.now())
    
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

