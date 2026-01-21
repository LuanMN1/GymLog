"""
Script para inicializar o banco de dados Supabase/PostgreSQL
Execute este script uma vez após configurar a conexão com o Supabase
"""
import os
import sys
from app import app
from models import db, Exercise
from default_exercises import DEFAULT_EXERCISES

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
            exercises_data = DEFAULT_EXERCISES
            
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


