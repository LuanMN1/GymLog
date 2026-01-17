"""
Script para inicializar o banco de dados Supabase/PostgreSQL
Execute este script uma vez após configurar a conexão com o Supabase
"""
import os
import sys
from app import app
from models import db, Exercise

def init_supabase():
    """Inicializa o banco de dados Supabase com as tabelas e dados padrão"""
    try:
        with app.app_context():
            print("Conectando ao banco de dados...")
            
            # Testa a conexão
            db.engine.connect()
            print("✓ Conexão com banco de dados estabelecida com sucesso!")
            
            # Cria todas as tabelas
            print("\nCriando tabelas...")
            db.create_all()
            print("✓ Tabelas criadas com sucesso!")
            
            # Verifica se já existem exercícios
            exercise_count = Exercise.query.count()
            if exercise_count > 0:
                print(f"\n✓ Exercícios já existem no banco ({exercise_count} exercícios)")
                print("Pulando inicialização de exercícios.")
                return
            
            # Inicializa exercícios padrão
            print("\nInicializando exercícios padrão...")
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
            print(f"✓ {len(exercises_data)} exercícios inicializados com sucesso!")
            
            print("\n" + "="*50)
            print("✓ Inicialização do banco de dados concluída!")
            print("="*50)
            
    except Exception as e:
        print(f"\n✗ Erro ao inicializar banco de dados: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)

if __name__ == '__main__':
    # Verifica se DATABASE_URL está configurado
    if not os.environ.get('DATABASE_URL'):
        print("⚠ AVISO: DATABASE_URL não está configurado!")
        print("Configure a variável de ambiente DATABASE_URL com a URL de conexão do Supabase")
        print("\nExemplo:")
        print("export DATABASE_URL='postgresql://user:password@host:port/database?sslmode=require'")
        sys.exit(1)
    
    init_supabase()

