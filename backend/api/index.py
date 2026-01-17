# Handler para Vercel serverless functions
# Este arquivo é o ponto de entrada para todas as requisições do backend no Vercel

import sys
import os

# Adiciona o diretório pai ao path para importar o app
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
if parent_dir not in sys.path:
    sys.path.insert(0, parent_dir)

# Garante que as variáveis de ambiente estejam configuradas
os.environ.setdefault('PYTHONUNBUFFERED', '1')

# Importa o app Flask
# O Vercel detecta automaticamente apps WSGI (Flask, Django, etc.)
from app import app

# Exporta o app diretamente - o Vercel detecta automaticamente
# Não precisa de wrapper ou função handler para Flask
