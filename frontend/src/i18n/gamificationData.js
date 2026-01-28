/**
 * Traduções de desafios e conquistas.
 * A chave é o name em pt-BR retornado pelo backend.
 * Fallback: se não houver entrada, usa name/description do backend.
 */

const challengeTranslations = {
  'Treino do Dia': {
    en: { name: 'Workout of the Day', description: 'Complete 1 workout today' },
    'pt-BR': { name: 'Treino do Dia', description: 'Complete 1 treino hoje' },
    'pt-PT': { name: 'Treino do Dia', description: 'Complete 1 treino hoje' }
  },
  'Dia Ativo': {
    en: { name: 'Active Day', description: 'Complete 1 workout today with at least 3 different exercises' },
    'pt-BR': { name: 'Dia Ativo', description: 'Complete 1 treino hoje com pelo menos 3 exercícios diferentes' },
    'pt-PT': { name: 'Dia Ativo', description: 'Complete 1 treino hoje com pelo menos 3 exercícios diferentes' }
  },
  'Dia de Variedade': {
    en: { name: 'Variety Day', description: 'Complete 1 workout today with exercises from at least 2 different muscle groups' },
    'pt-BR': { name: 'Dia de Variedade', description: 'Complete 1 treino hoje com exercícios de pelo menos 2 grupos musculares diferentes' },
    'pt-PT': { name: 'Dia de Variedade', description: 'Complete 1 treino hoje com exercícios de pelo menos 2 grupos musculares diferentes' }
  },
  'Três Dias na Semana': {
    en: { name: 'Three Days This Week', description: 'Work out on at least 3 different days this week' },
    'pt-BR': { name: 'Três Dias na Semana', description: 'Treine ao menos 3 dias diferentes esta semana' },
    'pt-PT': { name: 'Três Dias na Semana', description: 'Treine em pelo menos 3 dias diferentes esta semana' }
  },
  'Quatro Dias na Semana': {
    en: { name: 'Four Days This Week', description: 'Work out on at least 4 different days this week' },
    'pt-BR': { name: 'Quatro Dias na Semana', description: 'Treine ao menos 4 dias diferentes esta semana' },
    'pt-PT': { name: 'Quatro Dias na Semana', description: 'Treine em pelo menos 4 dias diferentes esta semana' }
  },
  'Cinco Dias na Semana': {
    en: { name: 'Five Days This Week', description: 'Work out on at least 5 different days this week (remember to rest!)' },
    'pt-BR': { name: 'Cinco Dias na Semana', description: 'Treine ao menos 5 dias diferentes esta semana (lembre-se de descansar!)' },
    'pt-PT': { name: 'Cinco Dias na Semana', description: 'Treine em pelo menos 5 dias diferentes esta semana (lembre-se de descansar!)' }
  },
  'Mês Iniciante': {
    en: { name: 'Beginner Month', description: 'Work out on at least 8 different days this month' },
    'pt-BR': { name: 'Mês Iniciante', description: 'Treine ao menos 8 dias diferentes este mês' },
    'pt-PT': { name: 'Mês Iniciante', description: 'Treine em pelo menos 8 dias diferentes este mês' }
  },
  'Mês Consistente': {
    en: { name: 'Consistent Month', description: 'Work out on at least 12 different days this month' },
    'pt-BR': { name: 'Mês Consistente', description: 'Treine ao menos 12 dias diferentes este mês' },
    'pt-PT': { name: 'Mês Consistente', description: 'Treine em pelo menos 12 dias diferentes este mês' }
  },
  'Mês Dedicado': {
    en: { name: 'Dedicated Month', description: 'Work out on at least 16 different days this month' },
    'pt-BR': { name: 'Mês Dedicado', description: 'Treine ao menos 16 dias diferentes este mês' },
    'pt-PT': { name: 'Mês Dedicado', description: 'Treine em pelo menos 16 dias diferentes este mês' }
  },
  'Mês de Ferro': {
    en: { name: 'Iron Month', description: 'Work out on at least 20 different days this month' },
    'pt-BR': { name: 'Mês de Ferro', description: 'Treine ao menos 20 dias diferentes este mês' },
    'pt-PT': { name: 'Mês de Ferro', description: 'Treine em pelo menos 20 dias diferentes este mês' }
  },
  'Mês Intenso': {
    en: { name: 'Intense Month', description: 'Work out on at least 18 different days this month (rest is essential!)' },
    'pt-BR': { name: 'Mês Intenso', description: 'Treine ao menos 18 dias diferentes este mês (descanso é essencial!)' },
    'pt-PT': { name: 'Mês Intenso', description: 'Treine em pelo menos 18 dias diferentes este mês (o descanso é essencial!)' }
  },
  'Primeiro Passo': {
    en: { name: 'First Step', description: 'Complete your first workout' },
    'pt-BR': { name: 'Primeiro Passo', description: 'Complete seu primeiro treino' },
    'pt-PT': { name: 'Primeiro Passo', description: 'Complete o seu primeiro treino' }
  },
  'Começando Bem': {
    en: { name: 'Off to a Good Start', description: 'Complete 5 workouts in total' },
    'pt-BR': { name: 'Começando Bem', description: 'Complete 5 treinos no total' },
    'pt-PT': { name: 'Começando Bem', description: 'Complete 5 treinos no total' }
  },
  'Primeira Semana': {
    en: { name: 'First Week', description: 'Complete 10 workouts in total' },
    'pt-BR': { name: 'Primeira Semana', description: 'Complete 10 treinos no total' },
    'pt-PT': { name: 'Primeira Semana', description: 'Complete 10 treinos no total' }
  },
  'Semana de Ferro': {
    en: { name: 'Iron Week', description: 'Complete 7 workouts' },
    'pt-BR': { name: 'Semana de Ferro', description: 'Complete 7 treinos' },
    'pt-PT': { name: 'Semana de Ferro', description: 'Complete 7 treinos' }
  },
  'Duas Semanas Fortes': {
    en: { name: 'Two Strong Weeks', description: 'Complete 10 workouts' },
    'pt-BR': { name: 'Duas Semanas Fortes', description: 'Complete 10 treinos' },
    'pt-PT': { name: 'Duas Semanas Fortes', description: 'Complete 10 treinos' }
  },
  'Mês Completo': {
    en: { name: 'Full Month', description: 'Complete 15 workouts' },
    'pt-BR': { name: 'Mês Completo', description: 'Complete 15 treinos' },
    'pt-PT': { name: 'Mês Completo', description: 'Complete 15 treinos' }
  },
  'Maratonista': {
    en: { name: 'Marathoner', description: 'Complete 30 workouts in total' },
    'pt-BR': { name: 'Maratonista', description: 'Complete 30 treinos no total' },
    'pt-PT': { name: 'Maratonista', description: 'Complete 30 treinos no total' }
  },
  'Veterano': {
    en: { name: 'Veteran', description: 'Complete 50 workouts in total' },
    'pt-BR': { name: 'Veterano', description: 'Complete 50 treinos no total' },
    'pt-PT': { name: 'Veterano', description: 'Complete 50 treinos no total' }
  },
  'Centenário': {
    en: { name: 'Centurion', description: 'Complete 100 workouts in total' },
    'pt-BR': { name: 'Centenário', description: 'Complete 100 treinos no total' },
    'pt-PT': { name: 'Centenário', description: 'Complete 100 treinos no total' }
  },
  'Lenda do Treino': {
    en: { name: 'Workout Legend', description: 'Complete 200 workouts in total' },
    'pt-BR': { name: 'Lenda do Treino', description: 'Complete 200 treinos no total' },
    'pt-PT': { name: 'Lenda do Treino', description: 'Complete 200 treinos no total' }
  },
  'Mestre Absoluto': {
    en: { name: 'Absolute Master', description: 'Complete 500 workouts in total' },
    'pt-BR': { name: 'Mestre Absoluto', description: 'Complete 500 treinos no total' },
    'pt-PT': { name: 'Mestre Absoluto', description: 'Complete 500 treinos no total' }
  },
  'Fogo Inicial': {
    en: { name: 'Initial Fire', description: 'Maintain a 2-day workout streak' },
    'pt-BR': { name: 'Fogo Inicial', description: 'Mantenha uma sequência de 2 dias treinando' },
    'pt-PT': { name: 'Fogo Inicial', description: 'Mantenha uma sequência de 2 dias a treinar' }
  },
  'Três Dias Seguidos': {
    en: { name: 'Three Days in a Row', description: 'Maintain a 3-day workout streak' },
    'pt-BR': { name: 'Três Dias Seguidos', description: 'Mantenha uma sequência de 3 dias treinando' },
    'pt-PT': { name: 'Três Dias Seguidos', description: 'Mantenha uma sequência de 3 dias a treinar' }
  },
  'Semana Consistente': {
    en: { name: 'Consistent Week', description: 'Maintain a 5-day workout streak (with rest between workouts)' },
    'pt-BR': { name: 'Semana Consistente', description: 'Mantenha uma sequência de 5 dias treinando (com descanso entre treinos)' },
    'pt-PT': { name: 'Semana Consistente', description: 'Mantenha uma sequência de 5 dias a treinar (com descanso entre treinos)' }
  },
  'Duas Semanas Dedicadas': {
    en: { name: 'Two Dedicated Weeks', description: 'Maintain a 10-day workout streak (remember to rest!)' },
    'pt-BR': { name: 'Duas Semanas Dedicadas', description: 'Mantenha uma sequência de 10 dias treinando (lembre-se de descansar!)' },
    'pt-PT': { name: 'Duas Semanas Dedicadas', description: 'Mantenha uma sequência de 10 dias a treinar (lembre-se de descansar!)' }
  },
  'Mês de Dedicação': {
    en: { name: 'Month of Dedication', description: 'Maintain a 20-day workout streak (rest is fundamental!)' },
    'pt-BR': { name: 'Mês de Dedicação', description: 'Mantenha uma sequência de 20 dias treinando (descanso é fundamental!)' },
    'pt-PT': { name: 'Mês de Dedicação', description: 'Mantenha uma sequência de 20 dias a treinar (o descanso é fundamental!)' }
  },
  'Primeiro Recorde': {
    en: { name: 'First Record', description: 'Log your first PR (Personal Record)' },
    'pt-BR': { name: 'Primeiro Recorde', description: 'Registre seu primeiro PR (Personal Record)' },
    'pt-PT': { name: 'Primeiro Recorde', description: 'Registe o seu primeiro PR (Recorde Pessoal)' }
  },
  'Quebrando Limites': {
    en: { name: 'Breaking Limits', description: 'Log 5 different PRs' },
    'pt-BR': { name: 'Quebrando Limites', description: 'Registre 5 PRs diferentes' },
    'pt-PT': { name: 'Quebrando Limites', description: 'Registe 5 PRs diferentes' }
  },
  'Mestre dos Recordes': {
    en: { name: 'Master of Records', description: 'Log 10 different PRs' },
    'pt-BR': { name: 'Mestre dos Recordes', description: 'Registre 10 PRs diferentes' },
    'pt-PT': { name: 'Mestre dos Recordes', description: 'Registe 10 PRs diferentes' }
  },
  'Lenda dos PRs': {
    en: { name: 'PR Legend', description: 'Log 25 different PRs' },
    'pt-BR': { name: 'Lenda dos PRs', description: 'Registre 25 PRs diferentes' },
    'pt-PT': { name: 'Lenda dos PRs', description: 'Registe 25 PRs diferentes' }
  }
};

const achievementTranslations = {
  'Iniciante': {
    en: { name: 'Beginner', description: 'Complete your first workout' },
    'pt-BR': { name: 'Iniciante', description: 'Complete seu primeiro treino' },
    'pt-PT': { name: 'Iniciante', description: 'Complete o seu primeiro treino' }
  },
  'Dedicação': {
    en: { name: 'Dedication', description: 'Complete 10 workouts' },
    'pt-BR': { name: 'Dedicação', description: 'Complete 10 treinos' },
    'pt-PT': { name: 'Dedicação', description: 'Complete 10 treinos' }
  },
  'Consistência': {
    en: { name: 'Consistency', description: 'Complete 50 workouts' },
    'pt-BR': { name: 'Consistência', description: 'Complete 50 treinos' },
    'pt-PT': { name: 'Consistência', description: 'Complete 50 treinos' }
  },
  'Lenda': {
    en: { name: 'Legend', description: 'Complete 200 workouts' },
    'pt-BR': { name: 'Lenda', description: 'Complete 200 treinos' },
    'pt-PT': { name: 'Lenda', description: 'Complete 200 treinos' }
  },
  'Fogo Rápido': {
    en: { name: 'Quick Fire', description: 'Maintain a 3-day streak' },
    'pt-BR': { name: 'Fogo Rápido', description: 'Mantenha uma sequência de 3 dias' },
    'pt-PT': { name: 'Fogo Rápido', description: 'Mantenha uma sequência de 3 dias' }
  },
  'Chama Eterna': {
    en: { name: 'Eternal Flame', description: 'Maintain a 7-day streak' },
    'pt-BR': { name: 'Chama Eterna', description: 'Mantenha uma sequência de 7 dias' },
    'pt-PT': { name: 'Chama Eterna', description: 'Mantenha uma sequência de 7 dias' }
  },
  'Invencível': {
    en: { name: 'Invincible', description: 'Maintain a 30-day streak' },
    'pt-BR': { name: 'Invencível', description: 'Mantenha uma sequência de 30 dias' },
    'pt-PT': { name: 'Invencível', description: 'Mantenha uma sequência de 30 dias' }
  },
  'Nível 5': {
    en: { name: 'Level 5', description: 'Reach level 5' },
    'pt-BR': { name: 'Nível 5', description: 'Alcance o nível 5' },
    'pt-PT': { name: 'Nível 5', description: 'Atinga o nível 5' }
  },
  'Nível 10': {
    en: { name: 'Level 10', description: 'Reach level 10' },
    'pt-BR': { name: 'Nível 10', description: 'Alcance o nível 10' },
    'pt-PT': { name: 'Nível 10', description: 'Atinga o nível 10' }
  },
  'Mestre': {
    en: { name: 'Master', description: 'Reach level 20' },
    'pt-BR': { name: 'Mestre', description: 'Alcance o nível 20' },
    'pt-PT': { name: 'Mestre', description: 'Atinga o nível 20' }
  },
  'Lendário': {
    en: { name: 'Legendary', description: 'Reach level 50' },
    'pt-BR': { name: 'Lendário', description: 'Alcance o nível 50' },
    'pt-PT': { name: 'Lendário', description: 'Atinga o nível 50' }
  }
};

/**
 * Obtém name e description traduzidos do desafio.
 * @param {string} namePtBr - name retornado pela API (em pt-BR)
 * @param {string} descriptionPtBr - description retornada pela API (fallback)
 * @param {string} language - 'en' | 'pt-BR' | 'pt-PT'
 */
export function getChallengeTranslation(namePtBr, descriptionPtBr, language) {
  const key = namePtBr && namePtBr.trim();
  const tr = key && challengeTranslations[key]?.[language];
  return tr
    ? { name: tr.name, description: tr.description }
    : { name: namePtBr || '', description: descriptionPtBr || '' };
}

/**
 * Obtém name e description traduzidos da conquista.
 */
export function getAchievementTranslation(namePtBr, descriptionPtBr, language) {
  const key = namePtBr && namePtBr.trim();
  const tr = key && achievementTranslations[key]?.[language];
  return tr
    ? { name: tr.name, description: tr.description }
    : { name: namePtBr || '', description: descriptionPtBr || '' };
}
