from flask import Flask, jsonify, request, session
from flask_cors import CORS
from functools import wraps
from models import (db, Exercise, Workout, WorkoutExercise, WorkoutSet, PR, Routine, RoutineExercise, User,
                    UserProgress, Challenge, UserChallenge, ChallengeAbandon, Achievement, UserAchievement)
from datetime import datetime, timedelta
import os
from urllib.parse import urlparse, parse_qs, urlencode, urlunparse
from sqlalchemy import inspect, text
from default_exercises import DEFAULT_EXERCISES

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

# Configure session settings for Vercel (serverless)
# Sessions need to work across different serverless function instances
app.config['SESSION_COOKIE_SECURE'] = True  # HTTPS only
app.config['SESSION_COOKIE_HTTPONLY'] = True  # Prevent XSS
app.config['SESSION_COOKIE_SAMESITE'] = 'None'  # Allow cross-origin (Vercel frontend/backend)
app.config['PERMANENT_SESSION_LIFETIME'] = 86400  # 24 hours

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
     allow_headers=['Content-Type', 'Authorization', 'X-User-ID', 'X-Is-Guest'],
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

            # Lightweight migration: add new columns if missing
            try:
                inspector = inspect(db.engine)
                
                # Migrate exercises table
                try:
                    cols = {c["name"] for c in inspector.get_columns("exercises")}
                    if "tutorial_image" not in cols:
                        db.session.execute(text("ALTER TABLE exercises ADD COLUMN tutorial_image TEXT"))
                        db.session.commit()
                        print("Added missing column: exercises.tutorial_image")
                except Exception as e:
                    print(f"Warning: could not ensure exercises.tutorial_image column exists: {e}")
                    db.session.rollback()
                
                # Migrate challenges table - add period_type column
                try:
                    if inspector.has_table("challenges"):
                        cols = {c["name"] for c in inspector.get_columns("challenges")}
                        if "period_type" not in cols:
                            db.session.execute(text("ALTER TABLE challenges ADD COLUMN period_type VARCHAR(20) DEFAULT 'cumulative'"))
                            db.session.commit()
                            print("Added missing column: challenges.period_type")
                except Exception as e:
                    print(f"Warning: could not ensure challenges.period_type column exists: {e}")
                    db.session.rollback()
            except Exception as e:
                # Don't fail startup if migration cannot run (e.g., permissions)
                print(f"Warning: could not run migrations: {e}")
                db.session.rollback()
            
            # Initialize exercises if database is empty
            try:
                exercise_count = Exercise.query.count()
                if exercise_count == 0:
                    for ex_data in DEFAULT_EXERCISES:
                        exercise = Exercise(**ex_data)
                        db.session.add(exercise)
                    
                    db.session.commit()
                    print(f"Initialized {len(DEFAULT_EXERCISES)} exercises in database")
                else:
                    print(f"Exercises already exist ({exercise_count} exercises)")

                    # Backfill tutorial_image for existing exercises (if missing)
                    try:
                        updated = 0
                        for ex_data in DEFAULT_EXERCISES:
                            ex = Exercise.query.filter_by(name=ex_data["name"]).first()
                            if ex and (not getattr(ex, "tutorial_image", None)) and ex_data.get("tutorial_image"):
                                ex.tutorial_image = ex_data["tutorial_image"]
                                updated += 1
                        if updated:
                            db.session.commit()
                            print(f"Backfilled tutorial_image for {updated} exercises")
                    except Exception as e:
                        print(f"Warning: could not backfill tutorial_image: {e}")
                        db.session.rollback()
            except Exception as e:
                print(f"Error initializing exercises: {e}")
                db.session.rollback()
            
            # Initialize gamification (challenges and achievements) if they don't exist
            try:
                from models import Challenge, Achievement
                try:
                    challenge_count = Challenge.query.count()
                except Exception:
                    challenge_count = 0
                if challenge_count == 0:
                    print("No challenges found. Running init_gamification_data...")
                    try:
                        from init_gamification import init_gamification_data
                        init_gamification_data()
                        print("Challenges and achievements initialized.")
                    except Exception as ge:
                        print(f"Could not run init_gamification: {ge}")
                        import traceback
                        traceback.print_exc()
                else:
                    achievement_count = Achievement.query.count()
                    print(f"Challenges already exist ({challenge_count}), achievements ({achievement_count})")
                # Desativar desafios que não incentivam descanso (6/7 dias na semana, 30 dias no mês)
                for name in ('Seis Dias na Semana', 'Semana Completa', 'Mês Máximo'):
                    c = Challenge.query.filter_by(name=name).first()
                    if c and c.is_active:
                        c.is_active = False
                db.session.commit()
            except Exception as e:
                print(f"Note: Gamification init: {e}")
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
    # Try to get from session first
    user_id = session.get('user_id')
    
    # Fallback: try to get from header (for serverless environments like Vercel)
    if not user_id:
        auth_header = request.headers.get('X-User-ID')
        if auth_header:
            try:
                user_id = int(auth_header)
            except (ValueError, TypeError):
                pass
    
    if user_id:
        return User.query.get(user_id)
    return None

# Decorator to require login
def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        # Check session first
        user_id = session.get('user_id')
        is_guest = session.get('is_guest', False)
        
        # Fallback: check header (for serverless environments where sessions may not persist)
        if not user_id and not is_guest:
            auth_header = request.headers.get('X-User-ID')
            if auth_header:
                try:
                    user_id = int(auth_header)
                    # Set in session for this request
                    session['user_id'] = user_id
                    session['is_guest'] = False
                except (ValueError, TypeError):
                    pass
        
        # Check guest header as fallback
        if not user_id and not is_guest:
            is_guest_header = request.headers.get('X-Is-Guest')
            if is_guest_header and is_guest_header.lower() == 'true':
                is_guest = True
                session['is_guest'] = True
        
        if not user_id and not is_guest:
            return jsonify({'error': 'Unauthorized', 'message': 'Please login or use guest mode'}), 401
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
    
    session.permanent = True
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
    
    session.permanent = True
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
    session.permanent = True
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
    ensure_database_initialized()
    if Exercise.query.count() > 0:
        return jsonify({'message': 'Exercises already exist', 'count': Exercise.query.count()}), 200
    
    for ex_data in DEFAULT_EXERCISES:
        exercise = Exercise(**ex_data)
        db.session.add(exercise)
    
    db.session.commit()
    return jsonify({'message': f'Initialized {len(DEFAULT_EXERCISES)} exercises successfully', 'count': len(DEFAULT_EXERCISES)}), 201

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
                for ex_data in DEFAULT_EXERCISES:
                    exercise = Exercise(**ex_data)
                    db.session.add(exercise)
                
                db.session.commit()
                print(f"Initialized {len(DEFAULT_EXERCISES)} exercises")
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
                'description': e.description,
                'tutorial_image': getattr(e, 'tutorial_image', None)
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
        description=data.get('description', ''),
        tutorial_image=data.get('tutorial_image') or data.get('tutorialImage')
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
    
    # Atualizar gamificação
    gamification_result = None
    if user:
        try:
            progress, completed_challenges, unlocked_achievements = update_gamification_on_workout(user.id, data)
            gamification_result = {
                'progress': {
                    'xp': progress.xp,
                    'level': progress.level,
                    'current_streak': progress.current_streak
                },
                'completed_challenges': completed_challenges,
                'unlocked_achievements': unlocked_achievements
            }
        except Exception as e:
            print(f"Error updating gamification: {e}")
            import traceback
            traceback.print_exc()
    
    response = {'id': workout.id, 'message': 'Workout created successfully'}
    if gamification_result:
        response['gamification'] = gamification_result
    
    return jsonify(response), 201

@app.route('/api/workouts/<int:workout_id>', methods=['DELETE'])
@login_required
def delete_workout(workout_id):
    workout = Workout.query.get_or_404(workout_id)
    db.session.delete(workout)
    db.session.commit()
    return jsonify({'message': 'Workout deleted successfully'})

@app.route('/api/workouts/<int:workout_id>/exercises/<int:exercise_id>/sets', methods=['PUT'])
@login_required
def update_workout_sets(workout_id, exercise_id):
    """Update workout sets for a specific exercise in a workout"""
    workout = Workout.query.get_or_404(workout_id)
    
    # Find the workout exercise
    workout_exercise = WorkoutExercise.query.filter_by(
        workout_id=workout_id,
        exercise_id=exercise_id
    ).first()
    
    if not workout_exercise:
        return jsonify({'error': 'Workout exercise not found'}), 404
    
    data = request.json
    workout_sets_data = data.get('workout_sets', [])
    
    # Delete existing sets
    WorkoutSet.query.filter_by(workout_exercise_id=workout_exercise.id).delete()
    
    # Create new sets
    for set_data in workout_sets_data:
        workout_set = WorkoutSet(
            workout_exercise_id=workout_exercise.id,
            set_number=set_data.get('set_number', 0),
            reps=set_data.get('reps', 0),
            weight=set_data.get('weight', 0),
            duration=set_data.get('duration', 0)
        )
        db.session.add(workout_set)
    
    # Update workout exercise summary (optional - can recalculate from sets)
    if 'sets' in data:
        workout_exercise.sets = data.get('sets', len(workout_sets_data))
    if 'reps' in data:
        workout_exercise.reps = data.get('reps', 0)
    if 'weight' in data:
        workout_exercise.weight = data.get('weight', 0)
    if 'duration' in data:
        workout_exercise.duration = data.get('duration', 0)
    
    db.session.commit()
    return jsonify({'message': 'Workout sets updated successfully'})

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

# ========== GAMIFICAÇÃO ==========

def get_or_create_user_progress(user_id):
    """Obtém ou cria o progresso do usuário (XP e pontos começam em 0)"""
    progress = UserProgress.query.filter_by(user_id=user_id).first()
    if not progress:
        progress = UserProgress(user_id=user_id, xp=0, total_points=0, level=1)
        db.session.add(progress)
        db.session.commit()
    return progress

def calculate_xp_for_level(level):
    """Calcula XP necessário para um nível"""
    # Fórmula: 100 * level^1.5 (exponencial)
    return int(100 * (level ** 1.5))

def add_xp(user_id, xp_amount):
    """Adiciona XP ao usuário e atualiza nível se necessário"""
    progress = get_or_create_user_progress(user_id)
    progress.xp += xp_amount
    progress.total_points += xp_amount
    
    # Verificar se subiu de nível
    while True:
        xp_needed = calculate_xp_for_level(progress.level + 1)
        if progress.xp >= xp_needed:
            progress.level += 1
        else:
            break
    
    db.session.commit()
    return progress

def update_streak(user_id, workout_date):
    """Atualiza a sequência de treinos do usuário"""
    progress = get_or_create_user_progress(user_id)
    workout_date_only = workout_date.date() if hasattr(workout_date, 'date') else workout_date
    
    if progress.last_workout_date:
        last_date = progress.last_workout_date.date() if hasattr(progress.last_workout_date, 'date') else progress.last_workout_date
        from datetime import timedelta
        
        # Se treinou hoje ou ontem, mantém/continua a sequência
        if workout_date_only == last_date:
            # Mesmo dia, não atualiza streak
            return progress
        elif workout_date_only == last_date + timedelta(days=1):
            # Dia seguinte, continua a sequência
            progress.current_streak += 1
        else:
            # Quebrou a sequência
            if progress.current_streak > progress.longest_streak:
                progress.longest_streak = progress.current_streak
            progress.current_streak = 1
    else:
        # Primeiro treino
        progress.current_streak = 1
    
    progress.last_workout_date = workout_date
    progress.total_workouts += 1
    db.session.commit()
    return progress

def check_challenges(user_id, workout_data=None):
    """Verifica e atualiza desafios do usuário"""
    from datetime import datetime, timedelta
    
    user_challenges = UserChallenge.query.filter_by(
        user_id=user_id,
        is_completed=False
    ).all()
    
    progress = get_or_create_user_progress(user_id)
    completed_challenges = []
    
    # Para desafios periódicos, precisamos verificar o período atual
    today = datetime.utcnow().date()
    week_start = today - timedelta(days=today.weekday())  # Segunda-feira da semana
    month_start = today.replace(day=1)  # Primeiro dia do mês
    
    for user_challenge in user_challenges:
        challenge = user_challenge.challenge
        updated = False
        current_progress = 0
        
        # Verificar se o desafio precisa resetar (períodos diários, semanais, mensais)
        if challenge.period_type in ['daily', 'weekly', 'monthly']:
            # Verificar se o período mudou desde que o desafio foi iniciado ou completado
            period_start = None
            if challenge.period_type == 'daily':
                period_start = today
            elif challenge.period_type == 'weekly':
                period_start = week_start
            elif challenge.period_type == 'monthly':
                period_start = month_start
            
            # Se o período mudou, resetar o progresso e reiniciar o desafio
            if user_challenge.started_at:
                started_date = user_challenge.started_at.date() if hasattr(user_challenge.started_at, 'date') else user_challenge.started_at
                should_reset = False
                
                if challenge.period_type == 'daily' and started_date < today:
                    should_reset = True
                elif challenge.period_type == 'weekly':
                    started_week = started_date - timedelta(days=started_date.weekday())
                    if started_week < week_start:
                        should_reset = True
                elif challenge.period_type == 'monthly':
                    started_month = started_date.replace(day=1)
                    if started_month < month_start:
                        should_reset = True
                
                if should_reset:
                    # Resetar desafio periódico para novo período
                    user_challenge.progress = 0
                    user_challenge.is_completed = False
                    user_challenge.completed_at = None
                    user_challenge.started_at = datetime.utcnow()
        
        if challenge.challenge_type == 'workout_count':
            if challenge.period_type == 'cumulative':
                # Desafio cumulativo: usa total de treinos
                current_progress = progress.total_workouts
            elif challenge.period_type == 'daily':
                # Contar treinos de hoje
                today_start = datetime.combine(today, datetime.min.time())
                today_end = datetime.combine(today, datetime.max.time())
                workout_count = Workout.query.filter_by(user_id=user_id).filter(
                    Workout.date >= today_start,
                    Workout.date <= today_end
                ).count()
                current_progress = workout_count
            elif challenge.period_type == 'weekly':
                # Contar dias únicos da semana (não número de treinos)
                week_start_dt = datetime.combine(week_start, datetime.min.time())
                week_end_dt = datetime.combine(week_start + timedelta(days=6), datetime.max.time())
                # Buscar todos os treinos da semana e contar dias únicos
                workouts = Workout.query.filter_by(user_id=user_id).filter(
                    Workout.date >= week_start_dt,
                    Workout.date <= week_end_dt
                ).all()
                # Extrair datas únicas
                unique_dates = set()
                for workout in workouts:
                    workout_date = workout.date.date() if hasattr(workout.date, 'date') else workout.date
                    unique_dates.add(workout_date)
                current_progress = len(unique_dates)
            elif challenge.period_type == 'monthly':
                # Contar dias únicos do mês (não número de treinos)
                month_start_dt = datetime.combine(month_start, datetime.min.time())
                # Calcular último dia do mês
                if month_start.month == 12:
                    next_month = month_start.replace(year=month_start.year + 1, month=1, day=1)
                else:
                    next_month = month_start.replace(month=month_start.month + 1, day=1)
                month_end_date = next_month - timedelta(days=1)
                month_end_dt = datetime.combine(month_end_date, datetime.max.time())
                # Buscar todos os treinos do mês e contar dias únicos
                workouts = Workout.query.filter_by(user_id=user_id).filter(
                    Workout.date >= month_start_dt,
                    Workout.date <= month_end_dt
                ).all()
                # Extrair datas únicas
                unique_dates = set()
                for workout in workouts:
                    workout_date = workout.date.date() if hasattr(workout.date, 'date') else workout.date
                    unique_dates.add(workout_date)
                current_progress = len(unique_dates)
            
            user_challenge.progress = current_progress
            updated = True
        elif challenge.challenge_type == 'streak':
            user_challenge.progress = progress.current_streak
            updated = True
        elif challenge.challenge_type == 'pr' and workout_data:
            # Verificar se bateu PR (será verificado quando PR for criado)
            pass
        elif challenge.challenge_type == 'exercise_specific' and workout_data:
            # Contar exercícios específicos no treino
            exercise_id = challenge.exercise_id
            if exercise_id:
                count = sum(1 for ex in workout_data.get('exercises', []) 
                          if ex.get('exercise_id') == exercise_id)
                user_challenge.progress += count
                updated = True
        
        if updated and user_challenge.progress >= user_challenge.target_value:
            user_challenge.is_completed = True
            user_challenge.completed_at = datetime.utcnow()
            add_xp(user_id, challenge.xp_reward)
            progress.total_points += challenge.points_reward
            completed_challenges.append({
                'id': challenge.id,
                'name': challenge.name,
                'xp_reward': challenge.xp_reward,
                'points_reward': challenge.points_reward
            })
    
    db.session.commit()
    return completed_challenges

def check_achievements(user_id):
    """Verifica e desbloqueia conquistas"""
    progress = get_or_create_user_progress(user_id)
    unlocked_achievements = []
    
    # Buscar todas as conquistas ativas
    achievements = Achievement.query.filter_by(is_active=True).all()
    
    for achievement in achievements:
        # Verificar se já desbloqueou
        if UserAchievement.query.filter_by(
            user_id=user_id,
            achievement_id=achievement.id
        ).first():
            continue
        
        # Verificar requisitos
        unlocked = False
        if achievement.requirement_type == 'workout_count':
            unlocked = progress.total_workouts >= achievement.requirement_value
        elif achievement.requirement_type == 'streak':
            unlocked = progress.current_streak >= achievement.requirement_value
        elif achievement.requirement_type == 'level':
            unlocked = progress.level >= achievement.requirement_value
        elif achievement.requirement_type == 'total_xp':
            unlocked = progress.xp >= achievement.requirement_value
        
        if unlocked:
            user_achievement = UserAchievement(
                user_id=user_id,
                achievement_id=achievement.id
            )
            db.session.add(user_achievement)
            add_xp(user_id, achievement.xp_reward)
            progress.total_points += achievement.points_reward
            unlocked_achievements.append({
                'id': achievement.id,
                'name': achievement.name,
                'description': achievement.description,
                'icon': achievement.icon,
                'xp_reward': achievement.xp_reward,
                'points_reward': achievement.points_reward,
                'rarity': achievement.rarity
            })
    
    db.session.commit()
    return unlocked_achievements

# Endpoints de Gamificação

@app.route('/api/gamification/progress', methods=['GET'])
@login_required
def get_progress():
    """Retorna o progresso do usuário (XP, nível, streak, etc.)"""
    user = get_current_user()
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    progress = get_or_create_user_progress(user.id)
    xp_for_next_level = calculate_xp_for_level(progress.level + 1)
    # Nível 1 começa em 0 XP; níveis seguintes começam no limite do nível anterior
    xp_current_level = 0 if progress.level <= 1 else calculate_xp_for_level(progress.level)
    xp_progress = max(0, progress.xp - xp_current_level)
    xp_needed = xp_for_next_level - xp_current_level
    
    return jsonify({
        'xp': progress.xp,
        'level': progress.level,
        'total_points': progress.total_points,
        'current_streak': progress.current_streak,
        'longest_streak': progress.longest_streak,
        'total_workouts': progress.total_workouts,
        'xp_progress': xp_progress,
        'xp_needed': xp_needed,
        'xp_for_next_level': xp_for_next_level
    })

@app.route('/api/gamification/challenges', methods=['GET'])
@login_required
def get_challenges():
    """Retorna todos os desafios disponíveis"""
    from datetime import datetime, timedelta
    
    challenges = Challenge.query.filter_by(is_active=True).all()
    user = get_current_user()
    
    if not user:
        return jsonify({'error': 'User not found'}), 401
    
    # Debug: verificar quantos desafios periódicos existem
    periodic_challenges = [c for c in challenges if c.period_type in ['daily', 'weekly', 'monthly']]
    print(f"DEBUG: Total challenges: {len(challenges)}, Periodic: {len(periodic_challenges)}")
    print(f"DEBUG: Daily: {len([c for c in challenges if c.period_type == 'daily'])}, Weekly: {len([c for c in challenges if c.period_type == 'weekly'])}, Monthly: {len([c for c in challenges if c.period_type == 'monthly'])}")
    
    # Para desafios periódicos, iniciar automaticamente se não existirem
    today = datetime.utcnow().date()
    week_start = today - timedelta(days=today.weekday())
    month_start = today.replace(day=1)
    
    result = []
    for challenge in challenges:
        # Para desafios periódicos, sempre verificar/criar para o período atual
        user_challenge = None
        
        if challenge.period_type in ['daily', 'weekly', 'monthly']:
            # Buscar UserChallenge existente
            existing = UserChallenge.query.filter_by(
                user_id=user.id,
                challenge_id=challenge.id
            ).first()
            
            # Se existe, verificar se é do período atual
            if existing:
                started_date = existing.started_at.date() if hasattr(existing.started_at, 'date') else existing.started_at
                is_current_period = False
                
                if challenge.period_type == 'daily':
                    is_current_period = (started_date == today)
                elif challenge.period_type == 'weekly':
                    started_week = started_date - timedelta(days=started_date.weekday())
                    is_current_period = (started_week == week_start)
                elif challenge.period_type == 'monthly':
                    started_month = started_date.replace(day=1)
                    is_current_period = (started_month == month_start)
                
                if is_current_period:
                    user_challenge = existing
                else:
                    # Período mudou: criar novo para o período atual, salvo se o usuário desistiu deste período
                    period_start = today if challenge.period_type == 'daily' else (week_start if challenge.period_type == 'weekly' else month_start)
                    if not ChallengeAbandon.query.filter_by(user_id=user.id, challenge_id=challenge.id, period_type=challenge.period_type, period_start=period_start).first():
                        user_challenge = UserChallenge(
                            user_id=user.id,
                            challenge_id=challenge.id,
                            target_value=challenge.target_value,
                            progress=0,
                            started_at=datetime.utcnow()
                        )
                        db.session.add(user_challenge)
                        db.session.flush()
            else:
                # Não existe: criar novo, salvo se o usuário desistiu deste período
                period_start = today if challenge.period_type == 'daily' else (week_start if challenge.period_type == 'weekly' else month_start)
                if not ChallengeAbandon.query.filter_by(user_id=user.id, challenge_id=challenge.id, period_type=challenge.period_type, period_start=period_start).first():
                    user_challenge = UserChallenge(
                        user_id=user.id,
                        challenge_id=challenge.id,
                        target_value=challenge.target_value,
                        progress=0,
                        started_at=datetime.utcnow()
                    )
                    db.session.add(user_challenge)
                    db.session.flush()
        else:
            # Desafio cumulativo: buscar normalmente
            user_challenge = UserChallenge.query.filter_by(
                user_id=user.id,
                challenge_id=challenge.id
            ).first()
        
        # Atualizar progresso para desafios periódicos
        if user_challenge and challenge.period_type in ['daily', 'weekly', 'monthly']:
            # Calcular progresso atual do período
            if challenge.challenge_type == 'workout_count':
                from datetime import datetime as dt
                if challenge.period_type == 'daily':
                    today_start = dt.combine(today, dt.min.time())
                    today_end = dt.combine(today, dt.max.time())
                    workout_count = Workout.query.filter_by(user_id=user.id).filter(
                        Workout.date >= today_start,
                        Workout.date <= today_end
                    ).count()
                    user_challenge.progress = workout_count
                elif challenge.period_type == 'weekly':
                    # Contar dias únicos da semana
                    week_start_dt = dt.combine(week_start, dt.min.time())
                    week_end_dt = dt.combine(week_start + timedelta(days=6), dt.max.time())
                    workouts = Workout.query.filter_by(user_id=user.id).filter(
                        Workout.date >= week_start_dt,
                        Workout.date <= week_end_dt
                    ).all()
                    unique_dates = set()
                    for workout in workouts:
                        workout_date = workout.date.date() if hasattr(workout.date, 'date') else workout.date
                        unique_dates.add(workout_date)
                    user_challenge.progress = len(unique_dates)
                elif challenge.period_type == 'monthly':
                    # Contar dias únicos do mês
                    month_start_dt = dt.combine(month_start, dt.min.time())
                    if month_start.month == 12:
                        next_month = month_start.replace(year=month_start.year + 1, month=1, day=1)
                    else:
                        next_month = month_start.replace(month=month_start.month + 1, day=1)
                    month_end_date = next_month - timedelta(days=1)
                    month_end_dt = dt.combine(month_end_date, dt.max.time())
                    workouts = Workout.query.filter_by(user_id=user.id).filter(
                        Workout.date >= month_start_dt,
                        Workout.date <= month_end_dt
                    ).all()
                    unique_dates = set()
                    for workout in workouts:
                        workout_date = workout.date.date() if hasattr(workout.date, 'date') else workout.date
                        unique_dates.add(workout_date)
                    user_challenge.progress = len(unique_dates)
        
        result.append({
            'id': challenge.id,
            'name': challenge.name,
            'description': challenge.description,
            'type': challenge.challenge_type,
            'period_type': challenge.period_type or 'cumulative',
            'target_value': challenge.target_value,
            'xp_reward': challenge.xp_reward,
            'points_reward': challenge.points_reward,
            'difficulty': challenge.difficulty,
            'exercise_id': challenge.exercise_id,
            'is_started': user_challenge is not None,
            'progress': user_challenge.progress if user_challenge else 0,
            'is_completed': user_challenge.is_completed if user_challenge else False
        })
    
    # Ordenar por dificuldade: Easy → Medium → Hard → Expert
    diff_order = {'easy': 0, 'medium': 1, 'hard': 2, 'expert': 3}
    result.sort(key=lambda c: diff_order.get(c.get('difficulty'), 99))
    
    db.session.commit()
    return jsonify(result)

@app.route('/api/gamification/challenges/active', methods=['GET'])
@login_required
def get_active_challenges():
    """Retorna desafios ativos do usuário"""
    user = get_current_user()
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    user_challenges = UserChallenge.query.filter_by(
        user_id=user.id,
        is_completed=False
    ).all()
    
    result = []
    for uc in user_challenges:
        challenge = uc.challenge
        result.append({
            'id': challenge.id,
            'name': challenge.name,
            'description': challenge.description,
            'type': challenge.challenge_type,
            'period_type': challenge.period_type or 'cumulative',
            'target_value': uc.target_value,
            'progress': uc.progress,
            'xp_reward': challenge.xp_reward,
            'points_reward': challenge.points_reward,
            'difficulty': challenge.difficulty,
            'started_at': uc.started_at.isoformat() if uc.started_at else None
        })
    
    return jsonify(result)

@app.route('/api/gamification/challenges/<int:challenge_id>/start', methods=['POST'])
@login_required
def start_challenge(challenge_id):
    """Inicia um desafio para o usuário"""
    user = get_current_user()
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    challenge = Challenge.query.get_or_404(challenge_id)
    
    # Verificar se já iniciou
    existing = UserChallenge.query.filter_by(
        user_id=user.id,
        challenge_id=challenge_id
    ).first()
    
    if existing:
        if existing.is_completed:
            return jsonify({'error': 'Challenge already completed'}), 400
        return jsonify({'message': 'Challenge already started', 'user_challenge_id': existing.id})
    
    user_challenge = UserChallenge(
        user_id=user.id,
        challenge_id=challenge_id,
        target_value=challenge.target_value,
        progress=0
    )
    db.session.add(user_challenge)
    db.session.commit()
    
    return jsonify({
        'message': 'Challenge started',
        'user_challenge_id': user_challenge.id
    }), 201

@app.route('/api/gamification/challenges/<int:challenge_id>/abandon', methods=['POST'])
@login_required
def abandon_challenge(challenge_id):
    """Desiste do desafio em progresso: remove o UserChallenge e o desafio volta para disponíveis."""
    user = get_current_user()
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    challenge = Challenge.query.get_or_404(challenge_id)
    to_delete = UserChallenge.query.filter_by(
        user_id=user.id,
        challenge_id=challenge_id,
        is_completed=False
    ).all()
    if not to_delete:
        return jsonify({'error': 'No active challenge to abandon'}), 400
    
    # Para desafios periódicos: registar desistência do período para não recriar ao buscar
    if challenge.period_type in ('daily', 'weekly', 'monthly'):
        uc = to_delete[0]
        started_date = uc.started_at.date() if hasattr(uc.started_at, 'date') else uc.started_at
        if challenge.period_type == 'daily':
            period_start = started_date
        elif challenge.period_type == 'weekly':
            period_start = started_date - timedelta(days=started_date.weekday())
        else:
            period_start = started_date.replace(day=1)
        db.session.add(ChallengeAbandon(
            user_id=user.id, challenge_id=challenge_id,
            period_type=challenge.period_type, period_start=period_start
        ))
    
    for uc in to_delete:
        db.session.delete(uc)
    db.session.commit()
    return jsonify({'message': 'Challenge abandoned'}), 200

@app.route('/api/gamification/achievements', methods=['GET'])
@login_required
def get_achievements():
    """Retorna conquistas do usuário"""
    user = get_current_user()
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    user_achievements = UserAchievement.query.filter_by(user_id=user.id).all()
    
    result = []
    for ua in user_achievements:
        achievement = ua.achievement
        result.append({
            'id': achievement.id,
            'name': achievement.name,
            'description': achievement.description,
            'icon': achievement.icon,
            'category': achievement.category,
            'rarity': achievement.rarity,
            'unlocked_at': ua.unlocked_at.isoformat() if ua.unlocked_at else None
        })
    
    return jsonify(result)

@app.route('/api/gamification/achievements/all', methods=['GET'])
@login_required
def get_all_achievements():
    """Retorna todas as conquistas disponíveis com status do usuário"""
    user = get_current_user()
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    achievements = Achievement.query.filter_by(is_active=True).all()
    user_achievement_ids = {ua.achievement_id for ua in UserAchievement.query.filter_by(user_id=user.id).all()}
    
    result = []
    for achievement in achievements:
        result.append({
            'id': achievement.id,
            'name': achievement.name,
            'description': achievement.description,
            'icon': achievement.icon,
            'category': achievement.category,
            'rarity': achievement.rarity,
            'requirement_type': achievement.requirement_type,
            'requirement_value': achievement.requirement_value,
            'xp_reward': achievement.xp_reward,
            'points_reward': achievement.points_reward,
            'is_unlocked': achievement.id in user_achievement_ids
        })
    
    return jsonify(result)

# Integração com criação de treinos
# Modificar o endpoint de criação de treino para atualizar gamificação
def update_gamification_on_workout(user_id, workout_data):
    """Atualiza gamificação quando um treino é criado"""
    if not user_id:
        return None, []
    
    # Adicionar XP base por treino
    progress = add_xp(user_id, 50)  # 50 XP por treino
    
    # Atualizar streak
    workout_date = datetime.fromisoformat(workout_data['date']) if isinstance(workout_data['date'], str) else workout_data['date']
    update_streak(user_id, workout_date)
    
    # Verificar desafios
    completed_challenges = check_challenges(user_id, workout_data)
    
    # Verificar conquistas
    unlocked_achievements = check_achievements(user_id)
    
    return progress, completed_challenges, unlocked_achievements

# Modificar endpoint de criação de treino para incluir gamificação
# (Vamos fazer isso depois, primeiro vamos testar os endpoints)

if __name__ == '__main__':
    app.run(debug=True, port=5000)

