"""
Script to populate database with default challenges and achievements
Run: python init_gamification.py
"""

from models import db, Challenge, Achievement
from sqlalchemy import inspect, text

def init_gamification_data():
    """Initialize gamification data without creating new app context (for use within existing context)"""
    # Create tables if they don't exist
    db.create_all()
    
    # Migração: adicionar coluna period_type se não existir
    try:
        inspector = inspect(db.engine)
        if inspector.has_table("challenges"):
            cols = {c["name"] for c in inspector.get_columns("challenges")}
            if "period_type" not in cols:
                db.session.execute(text("ALTER TABLE challenges ADD COLUMN period_type VARCHAR(20) DEFAULT 'cumulative'"))
                db.session.commit()
                print("Added missing column: challenges.period_type")
    except Exception as e:
        print(f"Warning: could not ensure challenges.period_type column exists: {e}")
        db.session.rollback()
    
    # Criar desafios organizados por período
    # Sempre criar todos os desafios, verificando se já existem pelo nome
    challenges_data = [
            # ========== DESAFIOS DIÁRIOS ==========
            {
                'name': 'Treino do Dia',
                'description': 'Complete 1 treino hoje',
                'challenge_type': 'workout_count',
                'period_type': 'daily',
                'target_value': 1,
                'xp_reward': 100,
                'points_reward': 50,
                'difficulty': 'easy'
            },
            {
                'name': 'Dia Ativo',
                'description': 'Complete 1 treino hoje com pelo menos 3 exercícios diferentes',
                'challenge_type': 'workout_count',
                'period_type': 'daily',
                'target_value': 1,
                'xp_reward': 150,
                'points_reward': 75,
                'difficulty': 'easy'
            },
            {
                'name': 'Dia de Variedade',
                'description': 'Complete 1 treino hoje com exercícios de pelo menos 2 grupos musculares diferentes',
                'challenge_type': 'workout_count',
                'period_type': 'daily',
                'target_value': 1,
                'xp_reward': 200,
                'points_reward': 100,
                'difficulty': 'easy'
            },
            
            # ========== DESAFIOS SEMANAIS ==========
            {
                'name': 'Três Dias na Semana',
                'description': 'Treine ao menos 3 dias diferentes esta semana',
                'challenge_type': 'workout_count',
                'period_type': 'weekly',
                'target_value': 3,
                'xp_reward': 300,
                'points_reward': 150,
                'difficulty': 'easy'
            },
            {
                'name': 'Quatro Dias na Semana',
                'description': 'Treine ao menos 4 dias diferentes esta semana',
                'challenge_type': 'workout_count',
                'period_type': 'weekly',
                'target_value': 4,
                'xp_reward': 400,
                'points_reward': 200,
                'difficulty': 'easy'
            },
            {
                'name': 'Cinco Dias na Semana',
                'description': 'Treine ao menos 5 dias diferentes esta semana (lembre-se de descansar!)',
                'challenge_type': 'workout_count',
                'period_type': 'weekly',
                'target_value': 5,
                'xp_reward': 600,
                'points_reward': 300,
                'difficulty': 'hard'
            },
            
            # ========== DESAFIOS MENSAIS ==========
            {
                'name': 'Mês Iniciante',
                'description': 'Treine ao menos 8 dias diferentes este mês',
                'challenge_type': 'workout_count',
                'period_type': 'monthly',
                'target_value': 8,
                'xp_reward': 500,
                'points_reward': 250,
                'difficulty': 'easy'
            },
            {
                'name': 'Mês Consistente',
                'description': 'Treine ao menos 12 dias diferentes este mês',
                'challenge_type': 'workout_count',
                'period_type': 'monthly',
                'target_value': 12,
                'xp_reward': 800,
                'points_reward': 400,
                'difficulty': 'easy'
            },
            {
                'name': 'Mês Dedicado',
                'description': 'Treine ao menos 16 dias diferentes este mês',
                'challenge_type': 'workout_count',
                'period_type': 'monthly',
                'target_value': 16,
                'xp_reward': 1200,
                'points_reward': 600,
                'difficulty': 'medium'
            },
            {
                'name': 'Mês de Ferro',
                'description': 'Treine ao menos 20 dias diferentes este mês',
                'challenge_type': 'workout_count',
                'period_type': 'monthly',
                'target_value': 20,
                'xp_reward': 2000,
                'points_reward': 1000,
                'difficulty': 'hard'
            },
            {
                'name': 'Mês Intenso',
                'description': 'Treine ao menos 18 dias diferentes este mês (descanso é essencial!)',
                'challenge_type': 'workout_count',
                'period_type': 'monthly',
                'target_value': 18,
                'xp_reward': 2500,
                'points_reward': 1250,
                'difficulty': 'medium'
            },
            
            # ========== DESAFIOS CUMULATIVOS (Quantidade Total) ==========
            {
                'name': 'Primeiro Passo',
                'description': 'Complete seu primeiro treino',
                'challenge_type': 'workout_count',
                'period_type': 'cumulative',
                'target_value': 1,
                'xp_reward': 100,
                'points_reward': 50,
                'difficulty': 'easy'
            },
            {
                'name': 'Começando Bem',
                'description': 'Complete 5 treinos no total',
                'challenge_type': 'workout_count',
                'period_type': 'cumulative',
                'target_value': 5,
                'xp_reward': 250,
                'points_reward': 125,
                'difficulty': 'easy'
            },
            {
                'name': 'Primeira Semana',
                'description': 'Complete 10 treinos no total',
                'challenge_type': 'workout_count',
                'period_type': 'cumulative',
                'target_value': 10,
                'xp_reward': 500,
                'points_reward': 250,
                'difficulty': 'easy'
            },
            {
                'name': 'Maratonista',
                'description': 'Complete 30 treinos no total',
                'challenge_type': 'workout_count',
                'period_type': 'cumulative',
                'target_value': 30,
                'xp_reward': 2000,
                'points_reward': 1000,
                'difficulty': 'medium'
            },
            {
                'name': 'Veterano',
                'description': 'Complete 50 treinos no total',
                'challenge_type': 'workout_count',
                'period_type': 'cumulative',
                'target_value': 50,
                'xp_reward': 5000,
                'points_reward': 2500,
                'difficulty': 'hard'
            },
            {
                'name': 'Centenário',
                'description': 'Complete 100 treinos no total',
                'challenge_type': 'workout_count',
                'period_type': 'cumulative',
                'target_value': 100,
                'xp_reward': 10000,
                'points_reward': 5000,
                'difficulty': 'hard'
            },
            {
                'name': 'Lenda do Treino',
                'description': 'Complete 200 treinos no total',
                'challenge_type': 'workout_count',
                'period_type': 'cumulative',
                'target_value': 200,
                'xp_reward': 20000,
                'points_reward': 10000,
                'difficulty': 'expert'
            },
            {
                'name': 'Mestre Absoluto',
                'description': 'Complete 500 treinos no total',
                'challenge_type': 'workout_count',
                'period_type': 'cumulative',
                'target_value': 500,
                'xp_reward': 50000,
                'points_reward': 25000,
                'difficulty': 'expert'
            },
            
            # ========== DESAFIOS DE SEQUÊNCIA (STREAKS) ==========
            {
                'name': 'Fogo Inicial',
                'description': 'Mantenha uma sequência de 2 dias treinando',
                'challenge_type': 'streak',
                'period_type': 'cumulative',
                'target_value': 2,
                'xp_reward': 150,
                'points_reward': 75,
                'difficulty': 'easy'
            },
            {
                'name': 'Três Dias Seguidos',
                'description': 'Mantenha uma sequência de 3 dias treinando',
                'challenge_type': 'streak',
                'period_type': 'cumulative',
                'target_value': 3,
                'xp_reward': 200,
                'points_reward': 100,
                'difficulty': 'easy'
            },
            {
                'name': 'Semana Consistente',
                'description': 'Mantenha uma sequência de 5 dias treinando (com descanso entre treinos)',
                'challenge_type': 'streak',
                'period_type': 'cumulative',
                'target_value': 5,
                'xp_reward': 800,
                'points_reward': 400,
                'difficulty': 'medium'
            },
            {
                'name': 'Duas Semanas Dedicadas',
                'description': 'Mantenha uma sequência de 10 dias treinando (lembre-se de descansar!)',
                'challenge_type': 'streak',
                'period_type': 'cumulative',
                'target_value': 10,
                'xp_reward': 2000,
                'points_reward': 1000,
                'difficulty': 'hard'
            },
            {
                'name': 'Mês de Dedicação',
                'description': 'Mantenha uma sequência de 20 dias treinando (descanso é fundamental!)',
                'challenge_type': 'streak',
                'period_type': 'cumulative',
                'target_value': 20,
                'xp_reward': 4000,
                'points_reward': 2000,
                'difficulty': 'expert'
            },
            
            # ========== DESAFIOS DE PROGRESSO ==========
            {
                'name': 'Primeiro Recorde',
                'description': 'Registre seu primeiro PR (Personal Record)',
                'challenge_type': 'pr',
                'period_type': 'cumulative',
                'target_value': 1,
                'xp_reward': 300,
                'points_reward': 150,
                'difficulty': 'easy'
            },
            {
                'name': 'Quebrando Limites',
                'description': 'Registre 5 PRs diferentes',
                'challenge_type': 'pr',
                'period_type': 'cumulative',
                'target_value': 5,
                'xp_reward': 1000,
                'points_reward': 500,
                'difficulty': 'medium'
            },
            {
                'name': 'Mestre dos Recordes',
                'description': 'Registre 10 PRs diferentes',
                'challenge_type': 'pr',
                'period_type': 'cumulative',
                'target_value': 10,
                'xp_reward': 2500,
                'points_reward': 1250,
                'difficulty': 'hard'
            },
            {
                'name': 'Lenda dos PRs',
                'description': 'Registre 25 PRs diferentes',
                'challenge_type': 'pr',
                'period_type': 'cumulative',
                'target_value': 25,
                'xp_reward': 8000,
                'points_reward': 4000,
                'difficulty': 'expert'
            }
    ]
    
    created_count = 0
    skipped_count = 0
    for challenge_data in challenges_data:
        # Verificar se já existe um desafio com o mesmo nome
        existing = Challenge.query.filter_by(name=challenge_data['name']).first()
        if existing:
            # Atualizar period_type se não tiver
            if not existing.period_type and challenge_data.get('period_type'):
                existing.period_type = challenge_data['period_type']
                db.session.commit()
            # Corrigir dificuldade de Mês de Ferro (20 dias=hard) e Mês Intenso (18 dias=medium)
            if existing.name in ('Mês de Ferro', 'Mês Intenso') and existing.difficulty != challenge_data.get('difficulty'):
                existing.difficulty = challenge_data['difficulty']
            skipped_count += 1
        else:
            challenge = Challenge(**challenge_data)
            db.session.add(challenge)
            created_count += 1
    
    db.session.commit()
    print(f"Created {created_count} new challenges, skipped {skipped_count} existing challenges")
    
    # Verificar se já existem conquistas
    if Achievement.query.count() > 0:
        print(f"Achievements already exist ({Achievement.query.count()} achievements). Skipping initialization.")
    else:
        # Criar conquistas padrão
        achievements_data = [
            {
                'name': 'Iniciante',
                'description': 'Complete seu primeiro treino',
                'icon': '🎯',
                'category': 'milestone',
                'requirement_type': 'workout_count',
                'requirement_value': 1,
                'xp_reward': 150,
                'points_reward': 75,
                'rarity': 'common'
            },
            {
                'name': 'Dedicação',
                'description': 'Complete 10 treinos',
                'icon': '💪',
                'category': 'workout',
                'requirement_type': 'workout_count',
                'requirement_value': 10,
                'xp_reward': 500,
                'points_reward': 250,
                'rarity': 'common'
            },
            {
                'name': 'Consistência',
                'description': 'Complete 50 treinos',
                'icon': '🔥',
                'category': 'workout',
                'requirement_type': 'workout_count',
                'requirement_value': 50,
                'xp_reward': 2500,
                'points_reward': 1250,
                'rarity': 'rare'
            },
            {
                'name': 'Lenda',
                'description': 'Complete 200 treinos',
                'icon': '👑',
                'category': 'workout',
                'requirement_type': 'workout_count',
                'requirement_value': 200,
                'xp_reward': 15000,
                'points_reward': 7500,
                'rarity': 'legendary'
            },
            {
                'name': 'Fogo Rápido',
                'description': 'Mantenha uma sequência de 3 dias',
                'icon': '⚡',
                'category': 'streak',
                'requirement_type': 'streak',
                'requirement_value': 3,
                'xp_reward': 300,
                'points_reward': 150,
                'rarity': 'common'
            },
            {
                'name': 'Chama Eterna',
                'description': 'Mantenha uma sequência de 7 dias',
                'icon': '🔥',
                'category': 'streak',
                'requirement_type': 'streak',
                'requirement_value': 7,
                'xp_reward': 1000,
                'points_reward': 500,
                'rarity': 'rare'
            },
            {
                'name': 'Invencível',
                'description': 'Mantenha uma sequência de 30 dias',
                'icon': '🏆',
                'category': 'streak',
                'requirement_type': 'streak',
                'requirement_value': 30,
                'xp_reward': 8000,
                'points_reward': 4000,
                'rarity': 'epic'
            },
            {
                'name': 'Nível 5',
                'description': 'Alcance o nível 5',
                'icon': '⭐',
                'category': 'milestone',
                'requirement_type': 'level',
                'requirement_value': 5,
                'xp_reward': 1000,
                'points_reward': 500,
                'rarity': 'common'
            },
            {
                'name': 'Nível 10',
                'description': 'Alcance o nível 10',
                'icon': '🌟',
                'category': 'milestone',
                'requirement_type': 'level',
                'requirement_value': 10,
                'xp_reward': 3000,
                'points_reward': 1500,
                'rarity': 'rare'
            },
            {
                'name': 'Mestre',
                'description': 'Alcance o nível 20',
                'icon': '💎',
                'category': 'milestone',
                'requirement_type': 'level',
                'requirement_value': 20,
                'xp_reward': 10000,
                'points_reward': 5000,
                'rarity': 'epic'
            },
            {
                'name': 'Lendário',
                'description': 'Alcance o nível 50',
                'icon': '👑',
                'category': 'milestone',
                'requirement_type': 'level',
                'requirement_value': 50,
                'xp_reward': 50000,
                'points_reward': 25000,
                'rarity': 'legendary'
            }
        ]
        
        for achievement_data in achievements_data:
            achievement = Achievement(**achievement_data)
            db.session.add(achievement)
        
        db.session.commit()
        print(f"Created {len(achievements_data)} achievements")
    
    # Desativar desafios que não incentivam descanso (6/7 dias na semana, 30 dias no mês)
    HARMFUL_CHALLENGE_NAMES = ['Seis Dias na Semana', 'Semana Completa', 'Mês Máximo']
    deactivated = 0
    for name in HARMFUL_CHALLENGE_NAMES:
        c = Challenge.query.filter_by(name=name).first()
        if c and c.is_active:
            c.is_active = False
            deactivated += 1
    if deactivated:
        db.session.commit()
        print(f"Deactivated {deactivated} challenges that don't encourage rest: {HARMFUL_CHALLENGE_NAMES}")
    
    print("\nGamification data initialized successfully!")

def init_gamification():
    """Wrapper function that creates app context (for standalone script execution)"""
    from app import app
    with app.app_context():
        init_gamification_data()

if __name__ == '__main__':
    init_gamification()
