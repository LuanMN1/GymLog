#!/usr/bin/env python3
"""
Startup script that initializes database and starts the application
"""
import subprocess
import sys
import os

# Change to backend directory if not already there
if os.path.basename(os.getcwd()) != 'backend':
    if os.path.exists('backend'):
        os.chdir('backend')

# Run init_data.py to initialize exercises
print("Initializing database...")
try:
    from init_data import init_data
    init_data()
    print("Database initialization complete!")
except Exception as e:
    print(f"Warning: Database initialization had an issue: {e}")
    print("Continuing anyway...")

# Start gunicorn
print("Starting application...")
os.execvp('gunicorn', ['gunicorn', 'app:app'])

