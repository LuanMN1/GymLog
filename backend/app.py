from flask import Flask, jsonify, request, session
from flask_cors import CORS
from functools import wraps
from models import db, Exercise, Workout, WorkoutExercise, WorkoutSet, PR, Routine, RoutineExercise, User
from datetime import datetime
import os
from urllib.parse import urlparse, parse_qs, urlencode, urlunparse

# Carrega variáveis de ambiente de arquivo .env se existir
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass  # python-dotenv não é obrigatório, mas recomendado para desenvolvimento

app = Flask(__name__)

# Configure database URL for Supabase/PostgreSQL
def get_database_url():
    database_url = os.environ.get('DATABASE_URL', 'sqlite:///gymlog.db')
    
    # Se for SQLite, retorna direto
    if database_url.startswith('sqlite'):
        return database_url
    
    # Para PostgreSQL/Supabase, normaliza a URL
    # Supabase pode usar 'postgres://' mas SQLAlchemy precisa de 'postgresql://'
    if database_url.startswith('postgres://'):
        database_url = database_url.replace('postgres://', 'postgresql://', 1)
    
    # Parse da URL para adicionar parâmetros SSL se necessário
    parsed = urlparse(database_url)
    query_params = parse_qs(parsed.query)
    
    # Adiciona SSL mode se não estiver presente (necessário para Supabase)
    if 'sslmode' not in query_params:
        query_params['sslmode'] = ['require']
    
    # Reconstrói a URL com os parâmetros
    new_query = urlencode(query_params, doseq=True)
    new_parsed = parsed._replace(query=new_query)
    database_url = urlunparse(new_parsed)
    
    return database_url

database_url = get_database_url()
app.config['SQLALCHEMY_DATABASE_URI'] = database_url
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Configurações de engine para PostgreSQL (Supabase)
if 'postgresql' in database_url:
    app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {
        'pool_pre_ping': True,  # Verifica conexões antes de usar
        'pool_recycle': 300,     # Recicla conexões após 5 minutos
        'connect_args': {
            'connect_timeout': 10
        }
    }
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'your-secret-key-change-in-production')

# Configure CORS to allow requests from Vercel frontend
frontend_url = os.environ.get('FRONTEND_URL', '')
cors_origins = ['http://localhost:3000']

# Add Vercel URL if provided
if frontend_url:
    cors_origins.append(frontend_url)

# Allow all Vercel domains (for preview deployments)
CORS(app, 
     supports_credentials=True, 
     origins=cors_origins,
     allow_headers=['Content-Type', 'Authorization'],
     methods=['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'])
db.init_app(app)

# Create tables and initialize exercises
def initialize_database():
    """Initialize database tables and default data"""
    try:
        with app.app_context():
            # Create all tables
            db.create_all()
            print("Database tables created successfully")
            
            # Initialize exercises if database is empty
            try:
                exercise_count = Exercise.query.count()
                if exercise_count == 0:
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
                    
                    for ex_data in exercises_data:
                        exercise = Exercise(**ex_data)
                        db.session.add(exercise)
                    
                    db.session.commit()
                    print(f"Initialized {len(exercises_data)} exercises in database")
                else:
                    print(f"Exercises already exist ({exercise_count} exercises)")
            except Exception as e:
                print(f"Error initializing exercises: {e}")
                db.session.rollback()
    except Exception as e:
        print(f"Error initializing database: {e}")
        import traceback
        traceback.print_exc()

# Initialize database lazily (only when needed, not on import)
# This prevents errors in serverless environments like Vercel
_db_initialized = False

def ensure_database_initialized():
    """Ensure database is initialized, but only once"""
    global _db_initialized
    if not _db_initialized:
        try:
            initialize_database()
            _db_initialized = True
        except Exception as e:
            print(f"Warning: Database initialization failed: {e}")
            import traceback
            traceback.print_exc()
            # Don't fail completely, let it try again on next request

# Initialize database on first request
@app.before_request
def before_request():
    """Initialize database before first request"""
    try:
        ensure_database_initialized()
    except Exception as e:
        # Don't fail the request if initialization fails
        # It will be retried on next request
        print(f"Warning: Database initialization in before_request failed: {e}")

# Helper function to get current user
def get_current_user():
    user_id = session.get('user_id')
    if user_id:
        return User.query.get(user_id)
    return None

# Decorator to require login
def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session and not session.get('is_guest'):
            return jsonify({'error': 'Unauthorized'}), 401
        return f(*args, **kwargs)
    return decorated_function

# Auth Routes
@app.route('/api/auth/register', methods=['POST'])
def register():
    data = request.json
    email = data.get('email', '').strip().lower()
    password = data.get('password', '')
    
    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400
    
    if len(password) < 6:
        return jsonify({'error': 'Password must be at least 6 characters'}), 400
    
    if User.query.filter_by(email=email).first():
        return jsonify({'error': 'Email already registered'}), 400
    
    username = data.get('username', '').strip()
    avatar = data.get('avatar', None)  # Base64 encoded image
    
    user = User(email=email, username=username if username else None, avatar=avatar)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()
    
    session['user_id'] = user.id
    session['is_guest'] = False
    
    return jsonify({
        'message': 'Registration successful',
        'user': {
            'id': user.id,
            'email': user.email,
            'username': user.username,
            'avatar': user.avatar
        }
    }), 201

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email', '').strip().lower()
    password = data.get('password', '')
    
    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400
    
    user = User.query.filter_by(email=email).first()
    
    if not user or not user.check_password(password):
        return jsonify({'error': 'Invalid email or password'}), 401
    
    session['user_id'] = user.id
    session['is_guest'] = False
    
    return jsonify({
        'message': 'Login successful',
        'user': {
            'id': user.id,
            'email': user.email,
            'username': user.username,
            'avatar': user.avatar
        }
    })

@app.route('/api/auth/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)
    session.pop('is_guest', None)
    return jsonify({'message': 'Logout successful'})

@app.route('/api/auth/me', methods=['GET'])
def get_current_user_info():
    user = get_current_user()
    is_guest = session.get('is_guest', False)
    if user:
        return jsonify({
            'id': user.id,
            'email': user.email,
            'username': user.username,
            'avatar': user.avatar,
            'is_guest': is_guest,
            'created_at': user.created_at.isoformat()
        })
    return jsonify({'is_guest': is_guest})

@app.route('/api/auth/guest', methods=['POST'])
def guest_login():
    session['is_guest'] = True
    session.pop('user_id', None)
    return jsonify({'message': 'Guest mode activated'})

@app.route('/api/auth/profile', methods=['PUT'])
@login_required
def update_profile():
    user = get_current_user()
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401
    
    data = request.json
    if 'username' in data:
        user.username = data['username'].strip() if data['username'] else None
    if 'avatar' in data:
        user.avatar = data['avatar']  # Base64 encoded image
    
    db.session.commit()
    
    return jsonify({
        'message': 'Profile updated successfully',
        'user': {
            'id': user.id,
            'email': user.email,
            'username': user.username,
            'avatar': user.avatar
        }
    })

@app.route('/api/auth/account', methods=['DELETE'])
@login_required
def delete_account():
    user = get_current_user()
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401
    
    # Delete all user data (cascade will handle related records)
    # First, delete workouts, PRs, and routines
    Workout.query.filter_by(user_id=user.id).delete()
    PR.query.filter_by(user_id=user.id).delete()
    Routine.query.filter_by(user_id=user.id).delete()
    
    # Then delete the user
    db.session.delete(user)
    db.session.commit()
    
    # Clear session
    session.pop('user_id', None)
    session.pop('is_guest', None)
    
    return jsonify({'message': 'Account deleted successfully'})

# Health check route
@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint - verifies backend is running"""
    try:
        # Try to get exercise count, but don't fail if database isn't ready
        try:
            exercises_count = Exercise.query.count()
        except Exception as db_error:
            # Database might not be initialized yet
            exercises_count = None
            print(f"Database not ready yet: {db_error}")
        
        return jsonify({
            'status': 'ok',
            'exercises_count': exercises_count,
            'message': 'Backend is running'
        })
    except Exception as e:
        # If something else fails, still return a response
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

# Initialize exercises route (can be called manually if needed)
@app.route('/api/init-exercises', methods=['POST'])
def init_exercises():
    if Exercise.query.count() > 0:
        return jsonify({'message': 'Exercises already exist', 'count': Exercise.query.count()}), 200
    
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
    
    for ex_data in exercises_data:
        exercise = Exercise(**ex_data)
        db.session.add(exercise)
    
    db.session.commit()
    return jsonify({'message': f'Initialized {len(exercises_data)} exercises successfully', 'count': len(exercises_data)}), 201

# Exercise Routes
@app.route('/api/exercises', methods=['GET'])
def list_exercises():
    try:
        # Ensure database is initialized first
        ensure_database_initialized()
        
        # Check if exercises exist, if not, initialize them
        try:
            exercise_count = Exercise.query.count()
        except Exception as db_error:
            # Database might not be ready yet
            print(f"Error querying exercises: {db_error}")
            return jsonify({
                'error': 'Database connection error',
                'message': str(db_error),
                'hint': 'Check DATABASE_URL and ensure database is accessible'
            }), 500
        
        if exercise_count == 0:
            # Initialize exercises
            try:
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
                
                for ex_data in exercises_data:
                    exercise = Exercise(**ex_data)
                    db.session.add(exercise)
                
                db.session.commit()
                print(f"Initialized {len(exercises_data)} exercises")
            except Exception as init_error:
                print(f"Error initializing exercises: {init_error}")
                db.session.rollback()
                # Continue anyway, try to return existing exercises
        
        # Get all exercises
        try:
            exercises = Exercise.query.all()
            return jsonify([{
                'id': e.id,
                'name': e.name,
                'category': e.category,
                'description': e.description
            } for e in exercises])
        except Exception as query_error:
            print(f"Error querying exercises: {query_error}")
            return jsonify({
                'error': 'Database query error',
                'message': str(query_error),
                'hint': 'Check DATABASE_URL and database connection'
            }), 500
    except Exception as e:
        print(f"Error in list_exercises: {e}")
        import traceback
        traceback.print_exc()
        return jsonify({
            'error': 'Internal server error',
            'message': str(e)
        }), 500

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
@login_required
def list_workouts():
    user = get_current_user()
    if session.get('is_guest'):
        workouts = Workout.query.filter_by(user_id=None).order_by(Workout.date.desc()).all()
    elif user:
        workouts = Workout.query.filter_by(user_id=user.id).order_by(Workout.date.desc()).all()
    else:
        return jsonify({'error': 'Unauthorized'}), 401
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
@login_required
def create_workout():
    data = request.json
    user = get_current_user()
    workout = Workout(
        name=data['name'],
        date=datetime.fromisoformat(data['date']),
        preset_id=data.get('preset_id'),
        user_id=user.id if user else None
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
@login_required
def list_prs():
    user = get_current_user()
    if session.get('is_guest'):
        prs = PR.query.filter_by(user_id=None).order_by(PR.date.desc()).all()
    elif user:
        prs = PR.query.filter_by(user_id=user.id).order_by(PR.date.desc()).all()
    else:
        return jsonify({'error': 'Unauthorized'}), 401
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
@login_required
def create_pr():
    data = request.json
    user = get_current_user()
    pr = PR(
        exercise_id=data['exercise_id'],
        weight=data.get('weight', 0),
        reps=data.get('reps', 1),
        duration=data.get('duration', 0),
        date=datetime.fromisoformat(data.get('date', datetime.now().isoformat())),
        notes=data.get('notes', ''),
        user_id=user.id if user else None
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
@login_required
def list_routines():
    user = get_current_user()
    if session.get('is_guest'):
        routines = Routine.query.filter_by(user_id=None).order_by(Routine.created_at.desc()).all()
    elif user:
        routines = Routine.query.filter_by(user_id=user.id).order_by(Routine.created_at.desc()).all()
    else:
        return jsonify({'error': 'Unauthorized'}), 401
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
@login_required
def create_routine():
    data = request.json
    user = get_current_user()
    routine = Routine(
        name=data['name'],
        description=data.get('description', ''),
        preset_id=data.get('preset_id', None),
        user_id=user.id if user else None
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

