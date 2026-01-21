// Exercise detailed information including tutorial images and muscle groups
// Using reliable CDN sources - URLs can be replaced with actual exercise GIFs
// For now using placeholder service - replace with actual GIF URLs from GIPHY, ExRx, or local files
export const exerciseData = {
  'Bench Press': {
    description: {
      en: 'A compound chest exercise performed with a barbell on a flat bench, targeting the chest, shoulders, and triceps.',
      'pt-BR': 'Exercício composto de peito feito com barra no banco reto, trabalhando peitoral, ombros e tríceps.',
      'pt-PT': 'Exercício composto de peito feito com barra no banco reto, trabalhando peito, ombros e tríceps.'
    },
    muscleGroups: {
      en: ['Pectoralis Major', 'Anterior Deltoids', 'Triceps'],
      'pt-BR': ['Peitoral maior', 'Deltoide anterior', 'Tríceps'],
      'pt-PT': ['Peitoral maior', 'Deltoide anterior', 'Tríceps']
    },
    // Replace with actual GIF URL: https://giphy.com/search/bench-press or use local file
    instructions: {
      en: [
        'Lie flat on the bench with feet firmly on the ground',
        'Grip the bar slightly wider than shoulder-width',
        'Lower the bar to your chest with control',
        'Press the bar up explosively until arms are fully extended'
      ],
      'pt-BR': [
        'Deite no banco com os pés firmes no chão',
        'Segure a barra um pouco mais aberto que a largura dos ombros',
        'Desça a barra até o peito com controle',
        'Empurre a barra para cima até estender totalmente os braços'
      ],
      'pt-PT': [
        'Deite no banco com os pés bem assentes no chão',
        'Segure a barra um pouco mais aberto do que a largura dos ombros',
        'Desça a barra até ao peito com controlo',
        'Empurre a barra para cima até estender totalmente os braços'
      ]
    }
  },
  'Incline Bench Press': {
    description: {
      en: 'A bench press variation using an incline bench to emphasize the upper chest.',
      'pt-BR': 'Variação do supino no banco inclinado para dar ênfase ao peitoral superior.',
      'pt-PT': 'Variação do supino no banco inclinado para dar ênfase ao peito superior.'
    },
    muscleGroups: {
      en: ['Upper Pectorals', 'Anterior Deltoids', 'Triceps'],
      'pt-BR': ['Peitoral superior', 'Deltoide anterior', 'Tríceps'],
      'pt-PT': ['Peitoral superior', 'Deltoide anterior', 'Tríceps']
    },
    instructions: {
      en: [
        'Set bench to 30-45 degree incline',
        'Lie back with feet flat on the floor',
        'Lower bar to upper chest',
        'Press up and slightly forward'
      ],
      'pt-BR': [
        'Ajuste o banco para 30–45° de inclinação',
        'Deite com os pés apoiados no chão',
        'Desça a barra até a parte alta do peito',
        'Empurre para cima e levemente para frente'
      ],
      'pt-PT': [
        'Ajuste o banco para 30–45° de inclinação',
        'Deite com os pés apoiados no chão',
        'Desça a barra até à parte superior do peito',
        'Empurre para cima e ligeiramente para a frente'
      ]
    }
  },
  'Decline Bench Press': {
    description: {
      en: 'A bench press variation on a decline bench to emphasize the lower chest.',
      'pt-BR': 'Variação do supino no banco declinado para dar ênfase ao peitoral inferior.',
      'pt-PT': 'Variação do supino no banco declinado para dar ênfase ao peito inferior.'
    },
    muscleGroups: {
      en: ['Lower Pectorals', 'Anterior Deltoids', 'Triceps'],
      'pt-BR': ['Peitoral inferior', 'Deltoide anterior', 'Tríceps'],
      'pt-PT': ['Peitoral inferior', 'Deltoide anterior', 'Tríceps']
    },
    instructions: {
      en: [
        'Secure yourself on the decline bench',
        'Grip bar at shoulder width',
        'Lower to lower chest',
        'Press up with full extension'
      ],
      'pt-BR': [
        'Prenda-se com segurança no banco declinado',
        'Segure a barra na largura dos ombros',
        'Desça a barra até a parte baixa do peito',
        'Empurre para cima estendendo totalmente os braços'
      ],
      'pt-PT': [
        'Prenda-se com segurança no banco declinado',
        'Segure a barra à largura dos ombros',
        'Desça a barra até à parte inferior do peito',
        'Empurre para cima estendendo totalmente os braços'
      ]
    }
  },
  'Tricep Pushdown': {
    description: {
      en: 'A cable isolation exercise for the triceps, performed by extending the elbows downwards.',
      'pt-BR': 'Exercício de isolamento no cabo para tríceps, estendendo os cotovelos para baixo.',
      'pt-PT': 'Exercício de isolamento na polia para tríceps, estendendo os cotovelos para baixo.'
    },
    muscleGroups: {
      en: ['Triceps', 'Anterior Deltoids'],
      'pt-BR': ['Tríceps', 'Deltoide anterior'],
      'pt-PT': ['Tríceps', 'Deltoide anterior']
    },
    instructions: {
      en: [
        'Stand with feet shoulder-width apart',
        'Keep elbows close to your body',
        'Push the bar down until arms are fully extended',
        'Slowly return to starting position'
      ],
      'pt-BR': [
        'Fique em pé com os pés na largura dos ombros',
        'Mantenha os cotovelos próximos ao corpo',
        'Empurre a barra para baixo até estender os braços',
        'Volte devagar à posição inicial'
      ],
      'pt-PT': [
        'Fique de pé com os pés à largura dos ombros',
        'Mantenha os cotovelos junto ao corpo',
        'Empurre a barra para baixo até estender os braços',
        'Volte lentamente à posição inicial'
      ]
    }
  },
  'Tricep Kickback': {
    description: {
      en: 'A triceps isolation exercise performed by extending the arm backward while keeping the upper arm fixed.',
      'pt-BR': 'Exercício de isolamento para tríceps, estendendo o braço para trás com o braço de cima fixo.',
      'pt-PT': 'Exercício de isolamento para tríceps, estendendo o braço para trás mantendo o braço superior fixo.'
    },
    muscleGroups: {
      en: ['Triceps'],
      'pt-BR': ['Tríceps'],
      'pt-PT': ['Tríceps']
    },
    instructions: {
      en: [
        'Bend forward with one knee on bench',
        'Keep upper arm parallel to floor',
        'Extend arm backward until fully straight',
        'Squeeze tricep at the top'
      ],
      'pt-BR': [
        'Incline o tronco e apoie um joelho no banco (se necessário)',
        'Mantenha o braço de cima paralelo ao chão',
        'Estenda o antebraço para trás até ficar reto',
        'Contraia o tríceps no final do movimento'
      ],
      'pt-PT': [
        'Incline o tronco e apoie um joelho no banco (se necessário)',
        'Mantenha o braço superior paralelo ao chão',
        'Estenda o antebraço para trás até ficar totalmente estendido',
        'Contraia o tríceps no final do movimento'
      ]
    }
  },
  'Overhead Tricep Extension': {
    description: {
      en: 'An overhead triceps extension that targets the long head of the triceps by flexing and extending the elbows.',
      'pt-BR': 'Extensão de tríceps acima da cabeça, enfatizando a cabeça longa do tríceps.',
      'pt-PT': 'Extensão de tríceps acima da cabeça, com ênfase na cabeça longa do tríceps.'
    },
    muscleGroups: {
      en: ['Triceps', 'Anterior Deltoids'],
      'pt-BR': ['Tríceps', 'Deltoide anterior'],
      'pt-PT': ['Tríceps', 'Deltoide anterior']
    },
    instructions: {
      en: [
        'Hold weight overhead with both hands',
        'Keep elbows close to head',
        'Lower weight behind head',
        'Extend arms back to starting position'
      ],
      'pt-BR': [
        'Segure o peso acima da cabeça com as duas mãos',
        'Mantenha os cotovelos próximos à cabeça',
        'Desça o peso atrás da cabeça com controle',
        'Estenda os cotovelos voltando à posição inicial'
      ],
      'pt-PT': [
        'Segure o peso acima da cabeça com as duas mãos',
        'Mantenha os cotovelos junto à cabeça',
        'Desça o peso atrás da cabeça com controlo',
        'Estenda os cotovelos voltando à posição inicial'
      ]
    }
  },
  'French Press': {
    description: {
      en: 'A triceps extension variation typically performed lying down, lowering the bar toward the forehead.',
      'pt-BR': 'Variação de extensão de tríceps (geralmente deitado), levando a barra em direção à testa.',
      'pt-PT': 'Variação de extensão de tríceps (geralmente deitado), levando a barra em direção à testa.'
    },
    muscleGroups: {
      en: ['Triceps'],
      'pt-BR': ['Tríceps'],
      'pt-PT': ['Tríceps']
    },
    instructions: {
      en: [
        'Lie on bench holding barbell overhead',
        'Keep upper arms stationary',
        'Lower bar to forehead',
        'Extend arms back up'
      ],
      'pt-BR': [
        'Deite no banco segurando a barra acima do peito',
        'Mantenha os braços (parte de cima) parados',
        'Dobre os cotovelos trazendo a barra em direção à testa',
        'Estenda os cotovelos voltando para cima'
      ],
      'pt-PT': [
        'Deite no banco segurando a barra acima do peito',
        'Mantenha os braços superiores estáveis',
        'Dobre os cotovelos trazendo a barra em direção à testa',
        'Estenda os cotovelos voltando para cima'
      ]
    }
  },
  'Deadlift': {
    description: {
      en: 'A full-body hinge movement that builds strength in the posterior chain using a barbell lifted from the floor.',
      'pt-BR': 'Movimento de “hinge” (levantamento do chão) que trabalha o corpo todo e fortalece a cadeia posterior.',
      'pt-PT': 'Movimento de “hinge” que trabalha o corpo todo e fortalece a cadeia posterior.'
    },
    muscleGroups: {
      en: ['Erector Spinae', 'Glutes', 'Hamstrings', 'Lats', 'Traps'],
      'pt-BR': ['Eretores da espinha', 'Glúteos', 'Isquiotibiais', 'Dorsais', 'Trapézio'],
      'pt-PT': ['Eretores da espinha', 'Glúteos', 'Isquiotibiais', 'Dorsais', 'Trapézio']
    },
    instructions: {
      en: [
        'Stand with feet hip-width apart',
        'Bend at hips and knees to grip bar',
        'Keep back straight and chest up',
        'Drive through heels to stand up'
      ],
      'pt-BR': [
        'Fique com os pés na largura do quadril',
        'Dobre quadril e joelhos para pegar a barra',
        'Mantenha as costas retas e o peito aberto',
        'Empurre o chão com os calcanhares para levantar'
      ],
      'pt-PT': [
        'Fique com os pés à largura da anca',
        'Dobre a anca e os joelhos para agarrar a barra',
        'Mantenha as costas direitas e o peito aberto',
        'Empurre o chão com os calcanhares para levantar'
      ]
    }
  },
  'Low Row': {
    description: {
      en: 'A rowing movement that targets the back by pulling a handle toward the torso, usually on a cable machine.',
      'pt-BR': 'Remada que trabalha as costas puxando o cabo em direção ao tronco (geralmente na polia).',
      'pt-PT': 'Remada que trabalha as costas puxando o cabo em direção ao tronco (normalmente na polia).'
    },
    muscleGroups: {
      en: ['Lats', 'Rhomboids', 'Middle Traps', 'Rear Deltoids'],
      'pt-BR': ['Dorsais', 'Romboides', 'Trapézio médio', 'Deltoide posterior'],
      'pt-PT': ['Dorsais', 'Romboides', 'Trapézio médio', 'Deltoide posterior']
    },
    instructions: {
      en: [
        'Sit with feet on platform',
        'Pull handle to lower abdomen',
        'Squeeze shoulder blades together',
        'Control the return'
      ],
      'pt-BR': [
        'Sente com os pés na plataforma',
        'Puxe a pegada até a parte baixa do abdômen',
        'Aproxime as escápulas (contraia as costas)',
        'Volte com controle'
      ],
      'pt-PT': [
        'Sente-se com os pés na plataforma',
        'Puxe a pega até à parte inferior do abdómen',
        'Aproxime as omoplatas (contraia as costas)',
        'Volte com controlo'
      ]
    }
  },
  'T-Bar Row': {
    description: {
      en: 'A rowing exercise using a T-bar or machine, emphasizing the mid-back and lats.',
      'pt-BR': 'Remada no cavalinho/máquina, com ênfase no meio das costas e dorsais.',
      'pt-PT': 'Remada no “cavalinho”/máquina, com ênfase no meio das costas e dorsais.'
    },
    muscleGroups: {
      en: ['Lats', 'Rhomboids', 'Middle Traps', 'Biceps'],
      'pt-BR': ['Dorsais', 'Romboides', 'Trapézio médio', 'Bíceps'],
      'pt-PT': ['Dorsais', 'Romboides', 'Trapézio médio', 'Bíceps']
    },
    instructions: {
      en: [
        'Sit with knees slightly bent',
        'Pull cable to torso',
        'Squeeze back muscles',
        'Return with control'
      ],
      'pt-BR': [
        'Posicione-se com os joelhos levemente flexionados',
        'Puxe a pegada em direção ao tronco',
        'Contraia as costas no final do movimento',
        'Retorne com controle'
      ],
      'pt-PT': [
        'Posicione-se com os joelhos ligeiramente fletidos',
        'Puxe a pega em direção ao tronco',
        'Contraia as costas no final do movimento',
        'Retorne com controlo'
      ]
    }
  },
  'High Row': {
    description: {
      en: 'A rowing variation pulling toward the upper chest to target the upper back.',
      'pt-BR': 'Variação de remada puxando para a parte alta do peito, focando a parte superior das costas.',
      'pt-PT': 'Variação de remada puxando para a parte superior do peito, focando a parte superior das costas.'
    },
    muscleGroups: {
      en: ['Upper Traps', 'Rear Deltoids', 'Rhomboids'],
      'pt-BR': ['Trapézio superior', 'Deltoide posterior', 'Romboides'],
      'pt-PT': ['Trapézio superior', 'Deltoide posterior', 'Romboides']
    },
    instructions: {
      en: [
        'Pull cable to upper chest level',
        'Keep elbows high',
        'Squeeze upper back',
        'Return slowly'
      ],
      'pt-BR': [
        'Puxe a pegada até a altura do peito alto',
        'Mantenha os cotovelos altos',
        'Contraia a parte superior das costas',
        'Retorne lentamente'
      ],
      'pt-PT': [
        'Puxe a pega até à altura do peito superior',
        'Mantenha os cotovelos altos',
        'Contraia a parte superior das costas',
        'Retorne lentamente'
      ]
    }
  },
  'Barbell Curl': {
    description: {
      en: 'A classic biceps exercise performed with a barbell by flexing the elbows.',
      'pt-BR': 'Exercício clássico de bíceps com barra, realizando a flexão dos cotovelos.',
      'pt-PT': 'Exercício clássico de bíceps com barra, realizando a flexão dos cotovelos.'
    },
    muscleGroups: {
      en: ['Biceps', 'Brachialis'],
      'pt-BR': ['Bíceps', 'Braquial'],
      'pt-PT': ['Bíceps', 'Braquial']
    },
    instructions: {
      en: [
        'Stand with feet shoulder-width apart',
        'Keep elbows close to body',
        'Curl bar to shoulders',
        'Lower with control'
      ],
      'pt-BR': [
        'Fique em pé com os pés na largura dos ombros',
        'Mantenha os cotovelos próximos ao corpo',
        'Faça a rosca levando a barra até perto dos ombros',
        'Desça com controle'
      ],
      'pt-PT': [
        'Fique de pé com os pés à largura dos ombros',
        'Mantenha os cotovelos junto ao corpo',
        'Faça a rosca levando a barra até perto dos ombros',
        'Desça com controlo'
      ]
    }
  },
  'Scott Curl': {
    description: {
      en: 'A biceps curl variation performed on a preacher bench to reduce cheating and isolate the biceps.',
      'pt-BR': 'Variação de rosca no banco Scott para isolar mais o bíceps e reduzir roubo.',
      'pt-PT': 'Variação de rosca no banco Scott para isolar mais o bíceps e reduzir balanço.'
    },
    muscleGroups: {
      en: ['Biceps'],
      'pt-BR': ['Bíceps'],
      'pt-PT': ['Bíceps']
    },
    instructions: {
      en: [
        'Rest arms on preacher bench',
        'Curl weight up',
        'Squeeze biceps at top',
        'Lower slowly'
      ],
      'pt-BR': [
        'Apoie os braços no banco Scott',
        'Flexione os cotovelos levantando o peso',
        'Contraia o bíceps no topo',
        'Desça lentamente'
      ],
      'pt-PT': [
        'Apoie os braços no banco Scott',
        'Fleta os cotovelos levantando o peso',
        'Contraia o bíceps no topo',
        'Desça lentamente'
      ]
    }
  },
  'Hammer Curl': {
    description: {
      en: 'A dumbbell curl with a neutral grip that emphasizes the brachialis and forearms.',
      'pt-BR': 'Rosca com halteres em pegada neutra, enfatizando braquial e antebraços.',
      'pt-PT': 'Rosca com halteres em pega neutra, enfatizando braquial e antebraços.'
    },
    muscleGroups: {
      en: ['Brachialis', 'Biceps', 'Forearms'],
      'pt-BR': ['Braquial', 'Bíceps', 'Antebraços'],
      'pt-PT': ['Braquial', 'Bíceps', 'Antebraços']
    },
    instructions: {
      en: [
        'Hold dumbbells with neutral grip',
        'Keep elbows stationary',
        'Curl weights up',
        'Lower with control'
      ],
      'pt-BR': [
        'Segure os halteres em pegada neutra (palmas voltadas uma para a outra)',
        'Mantenha os cotovelos estáveis',
        'Flexione os cotovelos elevando os halteres',
        'Desça com controle'
      ],
      'pt-PT': [
        'Segure os halteres em pega neutra (palmas voltadas uma para a outra)',
        'Mantenha os cotovelos estáveis',
        'Fleta os cotovelos elevando os halteres',
        'Desça com controlo'
      ]
    }
  },
  '45 Degree Curl': {
    description: {
      en: 'An incline dumbbell curl performed on a 45° bench to increase biceps stretch.',
      'pt-BR': 'Rosca inclinada no banco a 45° para aumentar o alongamento do bíceps.',
      'pt-PT': 'Rosca inclinada no banco a 45° para aumentar o alongamento do bíceps.'
    },
    muscleGroups: {
      en: ['Biceps', 'Brachialis'],
      'pt-BR': ['Bíceps', 'Braquial'],
      'pt-PT': ['Bíceps', 'Braquial']
    },
    instructions: {
      en: [
        'Set bench to 45 degrees',
        'Rest back against bench',
        'Curl weights up',
        'Lower slowly'
      ],
      'pt-BR': [
        'Ajuste o banco para 45°',
        'Apoie as costas no banco',
        'Faça a rosca elevando os halteres',
        'Desça lentamente'
      ],
      'pt-PT': [
        'Ajuste o banco para 45°',
        'Apoie as costas no banco',
        'Faça a rosca elevando os halteres',
        'Desça lentamente'
      ]
    }
  },
  'Squat': {
    description: {
      en: 'A fundamental lower-body movement that strengthens legs and glutes by squatting down and standing up under load.',
      'pt-BR': 'Movimento fundamental de membros inferiores que fortalece pernas e glúteos ao agachar e levantar com carga.',
      'pt-PT': 'Movimento fundamental de membros inferiores que fortalece pernas e glúteos ao agachar e levantar com carga.'
    },
    muscleGroups: {
      en: ['Quadriceps', 'Glutes', 'Hamstrings', 'Calves'],
      'pt-BR': ['Quadríceps', 'Glúteos', 'Isquiotibiais', 'Panturrilhas'],
      'pt-PT': ['Quadríceps', 'Glúteos', 'Isquiotibiais', 'Gémeos']
    },
    instructions: {
      en: [
        'Stand with feet shoulder-width apart',
        'Lower body by bending knees and hips',
        'Go down until thighs parallel to floor',
        'Drive through heels to stand up'
      ],
      'pt-BR': [
        'Fique em pé com os pés na largura dos ombros',
        'Desça flexionando joelhos e quadril',
        'Desça até as coxas ficarem paralelas ao chão (ou conforme sua mobilidade)',
        'Empurre o chão com os calcanhares para subir'
      ],
      'pt-PT': [
        'Fique de pé com os pés à largura dos ombros',
        'Desça fletindo joelhos e anca',
        'Desça até as coxas ficarem paralelas ao chão (ou conforme a sua mobilidade)',
        'Empurre o chão com os calcanhares para subir'
      ]
    }
  },
  'Leg Press': {
    description: {
      en: 'A machine-based leg exercise where you press a platform away using the legs.',
      'pt-BR': 'Exercício de máquina onde você empurra a plataforma com as pernas.',
      'pt-PT': 'Exercício em máquina onde empurra a plataforma com as pernas.'
    },
    muscleGroups: {
      en: ['Quadriceps', 'Glutes', 'Hamstrings'],
      'pt-BR': ['Quadríceps', 'Glúteos', 'Isquiotibiais'],
      'pt-PT': ['Quadríceps', 'Glúteos', 'Isquiotibiais']
    },
    instructions: {
      en: [
        'Sit with back against pad',
        'Place feet on platform',
        'Lower weight by bending knees',
        'Press back up to starting position'
      ],
      'pt-BR': [
        'Sente com as costas apoiadas no encosto',
        'Posicione os pés na plataforma',
        'Desça o peso flexionando os joelhos com controle',
        'Empurre de volta até próximo da extensão (sem travar totalmente)'
      ],
      'pt-PT': [
        'Sente-se com as costas apoiadas no encosto',
        'Coloque os pés na plataforma',
        'Desça o peso fletindo os joelhos com controlo',
        'Empurre de volta até perto da extensão (sem bloquear totalmente)'
      ]
    }
  },
  'Leg Extension': {
    description: {
      en: 'A machine isolation exercise targeting the quadriceps by extending the knees.',
      'pt-BR': 'Exercício de isolamento na máquina para quadríceps, estendendo os joelhos.',
      'pt-PT': 'Exercício de isolamento em máquina para quadríceps, estendendo os joelhos.'
    },
    muscleGroups: {
      en: ['Quadriceps'],
      'pt-BR': ['Quadríceps'],
      'pt-PT': ['Quadríceps']
    },
    instructions: {
      en: [
        'Sit with back against pad',
        'Place ankles under pads',
        'Extend legs until straight',
        'Lower with control'
      ],
      'pt-BR': [
        'Sente com as costas apoiadas no encosto',
        'Posicione as canelas/tornozelos sob as almofadas',
        'Estenda os joelhos até elevar a carga',
        'Desça com controle'
      ],
      'pt-PT': [
        'Sente-se com as costas apoiadas no encosto',
        'Coloque as canelas/tornozelos sob as almofadas',
        'Estenda os joelhos até elevar a carga',
        'Desça com controlo'
      ]
    }
  },
  'Leg Curl': {
    description: {
      en: 'A hamstring-focused machine exercise performed by flexing the knees against resistance.',
      'pt-BR': 'Exercício na máquina para posteriores (isquiotibiais), flexionando os joelhos contra resistência.',
      'pt-PT': 'Exercício em máquina para isquiotibiais, fletindo os joelhos contra resistência.'
    },
    muscleGroups: {
      en: ['Hamstrings', 'Calves'],
      'pt-BR': ['Isquiotibiais', 'Panturrilhas'],
      'pt-PT': ['Isquiotibiais', 'Gémeos']
    },
    instructions: {
      en: [
        'Lie face down on machine',
        'Place heels under pads',
        'Curl legs up',
        'Lower slowly'
      ],
      'pt-BR': [
        'Posicione-se na máquina (conforme o modelo: deitado/sentado)',
        'Apoie os calcanhares sob as almofadas',
        'Flexione os joelhos trazendo a carga',
        'Retorne lentamente'
      ],
      'pt-PT': [
        'Posicione-se na máquina (conforme o modelo: deitado/sentado)',
        'Apoie os calcanhares sob as almofadas',
        'Fleta os joelhos trazendo a carga',
        'Retorne lentamente'
      ]
    }
  },
  'Calf Raise': {
    description: {
      en: 'A calf exercise performed by raising and lowering the heels to train the lower legs.',
      'pt-BR': 'Exercício de panturrilha elevando e abaixando os calcanhares para trabalhar a parte inferior da perna.',
      'pt-PT': 'Exercício de gémeos elevando e baixando os calcanhares para trabalhar a parte inferior da perna.'
    },
    muscleGroups: {
      en: ['Gastrocnemius', 'Soleus'],
      'pt-BR': ['Gastrocnêmio', 'Sóleo'],
      'pt-PT': ['Gastrocnémio', 'Sóleo']
    },
    instructions: {
      en: [
        'Stand on platform with balls of feet',
        'Lower heels below platform',
        'Raise up on toes',
        'Lower with control'
      ],
      'pt-BR': [
        'Fique na plataforma apoiando a parte da frente do pé',
        'Desça os calcanhares abaixo do nível da plataforma',
        'Suba na ponta dos pés contraindo a panturrilha',
        'Desça com controle'
      ],
      'pt-PT': [
        'Fique na plataforma apoiando a parte da frente do pé',
        'Desça os calcanhares abaixo do nível da plataforma',
        'Suba na ponta dos pés contraindo os gémeos',
        'Desça com controlo'
      ]
    }
  },
  'Smith Machine Squat': {
    description: {
      en: 'A squat performed on a Smith machine for guided bar path and stability.',
      'pt-BR': 'Agachamento no Smith, com trajetória guiada da barra e mais estabilidade.',
      'pt-PT': 'Agachamento no Smith, com trajetória guiada da barra e maior estabilidade.'
    },
    muscleGroups: {
      en: ['Quadriceps', 'Glutes', 'Hamstrings'],
      'pt-BR': ['Quadríceps', 'Glúteos', 'Isquiotibiais'],
      'pt-PT': ['Quadríceps', 'Glúteos', 'Isquiotibiais']
    },
    instructions: {
      en: [
        'Position bar on shoulders',
        'Unrack bar by rotating',
        'Squat down with control',
        'Press up and rerack'
      ],
      'pt-BR': [
        'Posicione a barra sobre os ombros',
        'Destrave a barra girando para liberar',
        'Agache com controle',
        'Suba e trave novamente ao final'
      ],
      'pt-PT': [
        'Posicione a barra sobre os ombros',
        'Destrave a barra rodando para libertar',
        'Agache com controlo',
        'Suba e volte a travar no final'
      ]
    }
  },
  'Overhead Press': {
    description: {
      en: 'A pressing movement that targets the shoulders by pressing weight overhead.',
      'pt-BR': 'Movimento de empurrar acima da cabeça, focando ombros e tríceps.',
      'pt-PT': 'Movimento de press acima da cabeça, focando ombros e tríceps.'
    },
    muscleGroups: {
      en: ['Anterior Deltoids', 'Lateral Deltoids', 'Triceps', 'Upper Traps'],
      'pt-BR': ['Deltoide anterior', 'Deltoide lateral', 'Tríceps', 'Trapézio superior'],
      'pt-PT': ['Deltoide anterior', 'Deltoide lateral', 'Tríceps', 'Trapézio superior']
    },
    instructions: {
      en: [
        'Stand with feet shoulder-width apart',
        'Hold bar at shoulder level',
        'Press bar overhead',
        'Lower with control'
      ],
      'pt-BR': [
        'Fique em pé com os pés na largura dos ombros',
        'Segure a barra na altura dos ombros',
        'Empurre a barra acima da cabeça',
        'Desça com controle'
      ],
      'pt-PT': [
        'Fique de pé com os pés à largura dos ombros',
        'Segure a barra à altura dos ombros',
        'Empurre a barra acima da cabeça',
        'Desça com controlo'
      ]
    }
  },
  'Lateral Raise': {
    description: {
      en: 'An isolation shoulder exercise that raises the arms to the sides to target the lateral deltoids.',
      'pt-BR': 'Exercício de isolamento de ombro que eleva os braços para o lado, focando o deltoide lateral.',
      'pt-PT': 'Exercício de isolamento do ombro que eleva os braços para o lado, focando o deltoide lateral.'
    },
    muscleGroups: {
      en: ['Lateral Deltoids'],
      'pt-BR': ['Deltoide lateral'],
      'pt-PT': ['Deltoide lateral']
    },
    instructions: {
      en: [
        'Stand holding dumbbells at sides',
        'Raise arms to shoulder height',
        'Keep slight bend in elbows',
        'Lower with control'
      ],
      'pt-BR': [
        'Fique em pé segurando os halteres ao lado do corpo',
        'Eleve os braços até a altura dos ombros',
        'Mantenha uma leve flexão nos cotovelos',
        'Desça com controle'
      ],
      'pt-PT': [
        'Fique de pé segurando os halteres ao lado do corpo',
        'Eleve os braços até à altura dos ombros',
        'Mantenha uma ligeira flexão nos cotovelos',
        'Desça com controlo'
      ]
    }
  },
  'Front Raise': {
    description: {
      en: 'An isolation exercise that raises the arms forward to target the front deltoids.',
      'pt-BR': 'Exercício de isolamento que eleva os braços à frente do corpo, focando o deltoide anterior.',
      'pt-PT': 'Exercício de isolamento que eleva os braços à frente do corpo, focando o deltoide anterior.'
    },
    muscleGroups: {
      en: ['Anterior Deltoids'],
      'pt-BR': ['Deltoide anterior'],
      'pt-PT': ['Deltoide anterior']
    },
    instructions: {
      en: [
        'Stand holding dumbbells in front',
        'Raise arms forward to shoulder height',
        'Keep arms straight',
        'Lower slowly'
      ],
      'pt-BR': [
        'Fique em pé segurando os halteres à frente do corpo',
        'Eleve os braços à frente até a altura dos ombros',
        'Mantenha os braços quase estendidos (sem travar)',
        'Desça lentamente'
      ],
      'pt-PT': [
        'Fique de pé segurando os halteres à frente do corpo',
        'Eleve os braços à frente até à altura dos ombros',
        'Mantenha os braços quase estendidos (sem bloquear)',
        'Desça lentamente'
      ]
    }
  },
  'Rear Delt Fly': {
    description: {
      en: 'A rear-shoulder movement where the arms open out to the sides to target the rear deltoids and upper back.',
      'pt-BR': 'Movimento para deltoide posterior, abrindo os braços para o lado e contraindo a parte de trás do ombro.',
      'pt-PT': 'Movimento para deltoide posterior, abrindo os braços para o lado e contraindo a parte de trás do ombro.'
    },
    muscleGroups: {
      en: ['Rear Deltoids', 'Rhomboids'],
      'pt-BR': ['Deltoide posterior', 'Romboides'],
      'pt-PT': ['Deltoide posterior', 'Romboides']
    },
    instructions: {
      en: [
        'Bend forward with slight knee bend',
        'Raise arms out to sides',
        'Squeeze rear delts',
        'Lower with control'
      ],
      'pt-BR': [
        'Incline o tronco com leve flexão dos joelhos',
        'Abra os braços para os lados',
        'Contraia o deltoide posterior no topo',
        'Desça com controle'
      ],
      'pt-PT': [
        'Incline o tronco com ligeira flexão dos joelhos',
        'Abra os braços para os lados',
        'Contraia o deltoide posterior no topo',
        'Desça com controlo'
      ]
    }
  },
  'Arnold Press': {
    description: {
      en: 'A shoulder press variation that includes rotation, targeting multiple heads of the deltoids.',
      'pt-BR': 'Variação do desenvolvimento com rotação, trabalhando várias porções do deltoide.',
      'pt-PT': 'Variação do desenvolvimento com rotação, trabalhando várias porções do deltoide.'
    },
    muscleGroups: {
      en: ['Anterior Deltoids', 'Lateral Deltoids', 'Triceps'],
      'pt-BR': ['Deltoide anterior', 'Deltoide lateral', 'Tríceps'],
      'pt-PT': ['Deltoide anterior', 'Deltoide lateral', 'Tríceps']
    },
    instructions: {
      en: [
        'Start with palms facing you',
        'Rotate and press up',
        'Rotate back on the way down',
        'Repeat motion'
      ],
      'pt-BR': [
        'Comece com as palmas voltadas para você',
        'Gire os punhos e empurre para cima',
        'Gire de volta ao descer',
        'Repita o movimento'
      ],
      'pt-PT': [
        'Comece com as palmas voltadas para si',
        'Rode os punhos e empurre para cima',
        'Rode de volta ao descer',
        'Repita o movimento'
      ]
    }
  },
  'Wrist Curl': {
    description: {
      en: 'A forearm exercise that strengthens wrist flexors by curling the wrist upward.',
      'pt-BR': 'Exercício de antebraço que fortalece os flexores do punho ao “enrolar” o punho para cima.',
      'pt-PT': 'Exercício de antebraço que fortalece os flexores do punho ao fletir o punho para cima.'
    },
    muscleGroups: {
      en: ['Forearm Flexors'],
      'pt-BR': ['Flexores do antebraço'],
      'pt-PT': ['Flexores do antebraço']
    },
    instructions: {
      en: [
        'Sit with forearms on bench',
        'Curl wrists up',
        'Squeeze at top',
        'Lower slowly'
      ],
      'pt-BR': [
        'Sente e apoie os antebraços em um banco',
        'Flexione os punhos para cima',
        'Contraia no topo',
        'Desça lentamente'
      ],
      'pt-PT': [
        'Sente-se e apoie os antebraços num banco',
        'Fleta os punhos para cima',
        'Contraia no topo',
        'Desça lentamente'
      ]
    }
  },
  'Reverse Wrist Curl': {
    description: {
      en: 'A forearm exercise targeting wrist extensors using a reverse grip.',
      'pt-BR': 'Exercício de antebraço para extensores do punho, usando pegada inversa.',
      'pt-PT': 'Exercício de antebraço para extensores do punho, usando pega inversa.'
    },
    muscleGroups: {
      en: ['Forearm Extensors'],
      'pt-BR': ['Extensores do antebraço'],
      'pt-PT': ['Extensores do antebraço']
    },
    instructions: {
      en: [
        'Sit with forearms on bench',
        'Curl wrists up (reverse grip)',
        'Squeeze at top',
        'Lower slowly'
      ],
      'pt-BR': [
        'Sente e apoie os antebraços em um banco',
        'Eleve os punhos para cima (pegada inversa)',
        'Contraia no topo',
        'Desça lentamente'
      ],
      'pt-PT': [
        'Sente-se e apoie os antebraços num banco',
        'Eleve os punhos para cima (pega inversa)',
        'Contraia no topo',
        'Desça lentamente'
      ]
    }
  },
  'Farmer\'s Walk': {
    description: {
      en: 'A loaded carry exercise where you walk while holding heavy weights, training grip and core stability.',
      'pt-BR': 'Exercício de “carry” carregando pesos enquanto caminha, fortalecendo pegada, trapézio e core.',
      'pt-PT': 'Exercício de “carry” carregando pesos enquanto caminha, fortalecendo pega, trapézio e core.'
    },
    muscleGroups: {
      en: ['Forearms', 'Traps', 'Core'],
      'pt-BR': ['Antebraços', 'Trapézio', 'Core'],
      'pt-PT': ['Antebraços', 'Trapézio', 'Core']
    },
    instructions: {
      en: [
        'Pick up heavy weights',
        'Walk forward with good posture',
        'Keep core tight',
        'Walk for distance or time'
      ],
      'pt-BR': [
        'Pegue pesos pesados (halteres/kettlebells)',
        'Caminhe mantendo boa postura',
        'Mantenha o core contraído',
        'Caminhe por distância ou tempo'
      ],
      'pt-PT': [
        'Pegue pesos pesados (halteres/kettlebells)',
        'Caminhe mantendo boa postura',
        'Mantenha o core contraído',
        'Caminhe por distância ou tempo'
      ]
    }
  },
  'Crunches': {
    description: {
      en: 'A core exercise focusing on the abdominals by curling the upper body toward the knees.',
      'pt-BR': 'Exercício de abdômen que eleva o tronco em direção aos joelhos com controle.',
      'pt-PT': 'Exercício de abdómen que eleva o tronco em direção aos joelhos com controlo.'
    },
    muscleGroups: {
      en: ['Rectus Abdominis', 'Obliques'],
      'pt-BR': ['Reto abdominal', 'Oblíquos'],
      'pt-PT': ['Reto abdominal', 'Oblíquos']
    },
    instructions: {
      en: [
        'Lie on back with knees bent',
        'Place hands behind head',
        'Curl upper body toward knees',
        'Lower with control'
      ],
      'pt-BR': [
        'Deite de barriga para cima com os joelhos flexionados',
        'Coloque as mãos atrás da cabeça (sem puxar o pescoço)',
        'Eleve o tronco em direção aos joelhos',
        'Desça com controle'
      ],
      'pt-PT': [
        'Deite de barriga para cima com os joelhos fletidos',
        'Coloque as mãos atrás da cabeça (sem puxar o pescoço)',
        'Eleve o tronco em direção aos joelhos',
        'Desça com controlo'
      ]
    }
  },
  'Leg Raises': {
    description: {
      en: 'A core exercise targeting the lower abdominals by raising and lowering straight legs.',
      'pt-BR': 'Exercício de core que foca abdômen inferior, elevando e baixando as pernas estendidas.',
      'pt-PT': 'Exercício de core que foca abdómen inferior, elevando e baixando as pernas estendidas.'
    },
    muscleGroups: {
      en: ['Lower Abs', 'Hip Flexors'],
      'pt-BR': ['Abdômen inferior', 'Flexores do quadril'],
      'pt-PT': ['Abdómen inferior', 'Flexores da anca']
    },
    instructions: {
      en: [
        'Lie on back with hands at sides',
        'Raise legs straight up',
        'Lower legs slowly',
        'Keep lower back pressed to floor'
      ],
      'pt-BR': [
        'Deite de barriga para cima com as mãos ao lado do corpo',
        'Eleve as pernas estendidas',
        'Desça as pernas lentamente',
        'Mantenha a lombar encostada no chão'
      ],
      'pt-PT': [
        'Deite de barriga para cima com as mãos ao lado do corpo',
        'Eleve as pernas estendidas',
        'Baixe as pernas lentamente',
        'Mantenha a lombar encostada ao chão'
      ]
    }
  },
  'Plank': {
    description: {
      en: 'An isometric core exercise where you hold a straight-body position supported on forearms and toes.',
      'pt-BR': 'Exercício isométrico de core mantendo o corpo alinhado, apoiado nos antebraços e pés.',
      'pt-PT': 'Exercício isométrico de core mantendo o corpo alinhado, apoiado nos antebraços e pés.'
    },
    muscleGroups: {
      en: ['Core', 'Shoulders', 'Glutes'],
      'pt-BR': ['Core', 'Ombros', 'Glúteos'],
      'pt-PT': ['Core', 'Ombros', 'Glúteos']
    },
    instructions: {
      en: [
        'Start in push-up position',
        'Hold body straight',
        'Keep core tight',
        'Hold for time'
      ],
      'pt-BR': [
        'Comece na posição de prancha (como flexão, apoiado nos antebraços)',
        'Mantenha o corpo reto e alinhado',
        'Contraia o core o tempo todo',
        'Segure pelo tempo proposto'
      ],
      'pt-PT': [
        'Comece na posição de prancha (como flexão, apoiado nos antebraços)',
        'Mantenha o corpo direito e alinhado',
        'Contraia o core o tempo todo',
        'Segure pelo tempo proposto'
      ]
    }
  },
  'Russian Twist': {
    description: {
      en: 'A rotational core exercise performed seated, twisting the torso side to side.',
      'pt-BR': 'Exercício rotacional de core feito sentado, girando o tronco de um lado para o outro.',
      'pt-PT': 'Exercício rotacional de core feito sentado, rodando o tronco de um lado para o outro.'
    },
    muscleGroups: {
      en: ['Obliques', 'Core'],
      'pt-BR': ['Oblíquos', 'Core'],
      'pt-PT': ['Oblíquos', 'Core']
    },
    instructions: {
      en: [
        'Sit with knees bent and lean back',
        'Rotate torso side to side',
        'Keep core engaged',
        'Add weight for difficulty'
      ],
      'pt-BR': [
        'Sente com os joelhos flexionados e incline levemente o tronco para trás',
        'Gire o tronco de um lado para o outro',
        'Mantenha o core contraído',
        'Use carga para aumentar a dificuldade (opcional)'
      ],
      'pt-PT': [
        'Sente-se com os joelhos fletidos e incline ligeiramente o tronco para trás',
        'Rode o tronco de um lado para o outro',
        'Mantenha o core contraído',
        'Use carga para aumentar a dificuldade (opcional)'
      ]
    }
  },
  'Mountain Climbers': {
    description: {
      en: 'A dynamic core and cardio exercise performed in a plank while alternating knees toward the chest.',
      'pt-BR': 'Exercício dinâmico de core e cardio na posição de prancha, alternando joelhos em direção ao peito.',
      'pt-PT': 'Exercício dinâmico de core e cardio na posição de prancha, alternando joelhos em direção ao peito.'
    },
    muscleGroups: {
      en: ['Core', 'Shoulders', 'Cardio'],
      'pt-BR': ['Core', 'Ombros', 'Cardio'],
      'pt-PT': ['Core', 'Ombros', 'Cardio']
    },
    instructions: {
      en: [
        'Start in plank position',
        'Alternate bringing knees to chest',
        'Keep core tight',
        'Maintain steady pace'
      ],
      'pt-BR': [
        'Comece na posição de prancha',
        'Alterne levando os joelhos em direção ao peito',
        'Mantenha o core contraído',
        'Sustente um ritmo constante'
      ],
      'pt-PT': [
        'Comece na posição de prancha',
        'Alterne levando os joelhos em direção ao peito',
        'Mantenha o core contraído',
        'Mantenha um ritmo constante'
      ]
    }
  },
  'Ab Wheel': {
    description: {
      en: 'A challenging core exercise using an ab wheel to roll forward and back while maintaining trunk stability.',
      'pt-BR': 'Exercício avançado de core com roda abdominal, rolando para frente e voltando mantendo o tronco estável.',
      'pt-PT': 'Exercício avançado de core com roda abdominal, rolando para a frente e voltando mantendo o tronco estável.'
    },
    muscleGroups: {
      en: ['Core', 'Shoulders', 'Lats'],
      'pt-BR': ['Core', 'Ombros', 'Dorsais'],
      'pt-PT': ['Core', 'Ombros', 'Dorsais']
    },
    instructions: {
      en: [
        'Kneel holding ab wheel',
        'Roll forward keeping core tight',
        'Go as far as you can control',
        'Roll back to starting position'
      ],
      'pt-BR': [
        'Ajoelhe segurando a roda abdominal',
        'Role para frente mantendo o core contraído',
        'Vá até onde conseguir controlar sem “quebrar” a lombar',
        'Volte rolando à posição inicial'
      ],
      'pt-PT': [
        'Ajoelhe segurando a roda abdominal',
        'Role para a frente mantendo o core contraído',
        'Vá até onde conseguir controlar sem “quebrar” a lombar',
        'Volte rolando à posição inicial'
      ]
    }
  }
};
