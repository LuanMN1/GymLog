# Handler para Vercel serverless functions
# Este arquivo é o ponto de entrada para todas as requisições do backend no Vercel

import sys
import os

# Adiciona o diretório pai ao path para importar o app
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
sys.path.insert(0, parent_dir)

# Garante que as variáveis de ambiente estejam configuradas
os.environ.setdefault('PYTHONUNBUFFERED', '1')

try:
    from app import app
    
    # Exporta o app Flask como handler para Vercel
    # O Vercel Python runtime usa o app WSGI diretamente
    handler = app
    
except Exception as e:
    # Se houver erro no import, criamos um handler que retorna erro
    from flask import Flask
    error_app = Flask(__name__)
    
    @error_app.route('/', defaults={'path': ''})
    @error_app.route('/<path:path>')
    def error_handler(path):
        return {
            'error': 'Failed to initialize application',
            'message': str(e)
        }, 500
    
    handler = error_app

