# Como Adicionar GIFs de Exercícios

## Opções para Obter GIFs:

### 1. Anatomia Fitness (Recomendado)
- Site: https://anatomyfitness.site/
- Mais de 1.018 GIFs de exercícios em alta resolução
- Organizados por grupos musculares
- Basta baixar e hospedar localmente ou usar URLs diretas

### 2. GIPHY
- Site: https://giphy.com
- Pesquise por nome do exercício (ex: "bench press", "squat")
- Copie a URL direta do GIF
- Formato: `https://media.giphy.com/media/[ID]/giphy.gif`

### 3. Treino em GIF
- Site: https://treinogif.com.br/
- Biblioteca de GIFs de exercícios em português
- Organizados por grupos musculares

### 4. Hospedar Localmente
1. Baixe os GIFs dos sites acima
2. Coloque na pasta `frontend/public/exercises/`
3. Use o caminho: `/exercises/nome-do-exercicio.gif`

## Como Atualizar as URLs:

Edite o arquivo `frontend/src/i18n/exerciseData.js` e substitua as URLs placeholder:

```javascript
'Bench Press': {
  muscleGroups: ['Pectoralis Major', 'Anterior Deltoids', 'Triceps'],
  tutorialImage: 'https://sua-url-aqui.com/bench-press.gif', // Substitua aqui
  instructions: [...]
}
```

## Estrutura de Pastas Recomendada:

```
frontend/
  public/
    exercises/
      bench-press.gif
      squat.gif
      deadlift.gif
      ...
```

Então use: `tutorialImage: '/exercises/bench-press.gif'`

