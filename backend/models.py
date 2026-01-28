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

# ========== GAMIFICAÇÃO ==========

class UserProgress(db.Model):
    __tablename__ = 'user_progress'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False, unique=True)
    xp = db.Column(db.Integer, default=0)  # Experiência total
    level = db.Column(db.Integer, default=1)  # Nível atual
    total_points = db.Column(db.Integer, default=0)  # Pontos totais acumulados
    current_streak = db.Column(db.Integer, default=0)  # Sequência atual de treinos
    longest_streak = db.Column(db.Integer, default=0)  # Maior sequência já alcançada
    last_workout_date = db.Column(db.DateTime, nullable=True)  # Data do último treino
    total_workouts = db.Column(db.Integer, default=0)  # Total de treinos realizados
    updated_at = db.Column(db.DateTime, nullable=False, default=db.func.now(), onupdate=db.func.now())
    
    user = db.relationship('User')
    
    def __repr__(self):
        return f'<UserProgress {self.user_id} - Level {self.level}>'

class Challenge(db.Model):
    __tablename__ = 'challenges'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    challenge_type = db.Column(db.String(50), nullable=False)  # 'workout_count', 'streak', 'pr', 'exercise_specific', 'weight_total', 'volume'
    period_type = db.Column(db.String(20), default='cumulative')  # 'daily', 'weekly', 'monthly', 'cumulative'
    target_value = db.Column(db.Integer, nullable=False)  # Valor alvo (ex: 10 treinos, 7 dias de streak)
    xp_reward = db.Column(db.Integer, default=100)  # XP ganho ao completar
    points_reward = db.Column(db.Integer, default=50)  # Pontos ganhos
    difficulty = db.Column(db.String(20), default='medium')  # 'easy', 'medium', 'hard', 'expert'
    exercise_id = db.Column(db.Integer, db.ForeignKey('exercises.id'), nullable=True)  # Para desafios específicos de exercício
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.now())
    
    exercise = db.relationship('Exercise')
    
    def __repr__(self):
        return f'<Challenge {self.name}>'

class UserChallenge(db.Model):
    __tablename__ = 'user_challenges'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    challenge_id = db.Column(db.Integer, db.ForeignKey('challenges.id'), nullable=False)
    progress = db.Column(db.Integer, default=0)  # Progresso atual
    target_value = db.Column(db.Integer, nullable=False)  # Valor alvo (pode ser diferente do challenge padrão)
    is_completed = db.Column(db.Boolean, default=False)
    completed_at = db.Column(db.DateTime, nullable=True)
    started_at = db.Column(db.DateTime, nullable=False, default=db.func.now())
    
    user = db.relationship('User')
    challenge = db.relationship('Challenge')
    
    def __repr__(self):
        return f'<UserChallenge {self.user_id} - {self.challenge_id}>'

class ChallengeAbandon(db.Model):
    """Registo de desistência num período (diário/semanal/mensal) para não recriar UserChallenge."""
    __tablename__ = 'challenge_abandons'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    challenge_id = db.Column(db.Integer, db.ForeignKey('challenges.id'), nullable=False)
    period_type = db.Column(db.String(20), nullable=False)  # 'daily', 'weekly', 'monthly'
    period_start = db.Column(db.Date, nullable=False)  # início do período (data, 2ª feira ou dia 1)

    def __repr__(self):
        return f'<ChallengeAbandon {self.user_id} - {self.challenge_id} {self.period_type}>'

class Achievement(db.Model):
    __tablename__ = 'achievements'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    icon = db.Column(db.String(50), default='🏆')  # Emoji ou nome do ícone
    category = db.Column(db.String(50), default='general')  # 'streak', 'workout', 'pr', 'milestone', 'special'
    requirement_type = db.Column(db.String(50), nullable=False)  # 'workout_count', 'streak', 'pr_count', 'level', 'total_xp'
    requirement_value = db.Column(db.Integer, nullable=False)
    xp_reward = db.Column(db.Integer, default=200)
    points_reward = db.Column(db.Integer, default=100)
    rarity = db.Column(db.String(20), default='common')  # 'common', 'rare', 'epic', 'legendary'
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.now())
    
    def __repr__(self):
        return f'<Achievement {self.name}>'

class UserAchievement(db.Model):
    __tablename__ = 'user_achievements'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    achievement_id = db.Column(db.Integer, db.ForeignKey('achievements.id'), nullable=False)
    unlocked_at = db.Column(db.DateTime, nullable=False, default=db.func.now())
    
    user = db.relationship('User')
    achievement = db.relationship('Achievement')
    
    # Unique constraint para evitar duplicatas
    __table_args__ = (db.UniqueConstraint('user_id', 'achievement_id', name='unique_user_achievement'),)
    
    def __repr__(self):
        return f'<UserAchievement {self.user_id} - {self.achievement_id}>'