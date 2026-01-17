# Handler para Vercel serverless functions
# Este arquivo é o ponto de entrada para todas as requisições do backend no Vercel

import sys
import os
import traceback

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
    # Para a nova versão do Vercel, exportamos o app diretamente
    handler = app
    
except Exception as e:
    # Se houver erro no import, criamos um handler que retorna erro detalhado
    from flask import Flask, jsonify
    
    error_app = Flask(__name__)
    error_message = str(e)
    error_traceback = traceback.format_exc()
    
    # Log do erro para debug
    print("=" * 50)
    print("ERROR: Failed to import app")
    print("=" * 50)
    print(f"Error: {error_message}")
    print(f"Traceback:\n{error_traceback}")
    print("=" * 50)
    
    @error_app.route('/', defaults={'path': ''})
    @error_app.route('/<path:path>')
    def error_handler(path):
        return jsonify({
            'error': 'Failed to initialize application',
            'message': error_message,
            'hint': 'Check Vercel logs for full traceback. Common issues: missing DATABASE_URL, import errors, or missing dependencies.'
        }), 500
    
    handler = error_app

