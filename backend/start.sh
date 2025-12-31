#!/bin/bash
# Script to initialize database and start the application

# Initialize exercises if database is empty
python init_data.py

# Start the application with gunicorn
exec gunicorn app:app

