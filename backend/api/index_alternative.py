# Handler alternativo para Vercel - use este se o index.py não funcionar
# Renomeie este arquivo para index.py se necessário

from flask import Flask
import sys
import os

# Adiciona o diretório pai ao path
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
if parent_dir not in sys.path:
    sys.path.insert(0, parent_dir)

# Importa o app
from app import app

# Para Vercel, exportamos o app Flask diretamente
# O Vercel detecta automaticamente apps WSGI
handler = app


