# GymLog - Workout Tracking System

A fullstack application for managing gym workouts, tracking personal records (PRs), and monitoring fitness progress.

## Technologies

- **Frontend**: React with i18n support (English, Portuguese BR, Portuguese PT)
- **Backend**: Python (Flask)
- **Database**: SQLite

## Features

- ✅ Exercise management with filters and pagination
- ✅ Personal Records (PR) tracking
- ✅ Workout routines (My Workout) - reusable workout templates
- ✅ Multi-language support (EN, PT-BR, PT-PT)
- ✅ Exercise name translations
- ✅ Forms for creating exercises, PRs, and routines
- ✅ Edit and delete routines

## Project Structure

```
GymLog/
├── backend/          # Python Flask API
├── frontend/         # React application
└── README.md
```

## Installation

### Prerequisites

- Python 3.8 or higher
- Node.js 16 or higher
- npm or yarn

### Backend Setup

```bash
cd backend
python -m venv venv

# Windows:
.\venv\Scripts\Activate.ps1
# Linux/Mac:
source venv/bin/activate

python -m pip install -r requirements.txt
python init_data.py  # Optional: populate with sample data
python app.py
```

Backend will run on: `http://localhost:5000`

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

**Note**: The `setupProxy.js` file is already configured for API proxying. If you encounter webpack dev server errors, create a `.env` file in the frontend directory with:
```
SKIP_PREFLIGHT_CHECK=true
DANGEROUSLY_DISABLE_HOST_CHECK=true
```

Frontend will run on: `http://localhost:3000`

## API Endpoints

### Exercises
- `GET /api/exercises` - List all exercises
- `POST /api/exercises` - Create new exercise

### Routines
- `GET /api/routines` - List all routines
- `POST /api/routines` - Create new routine
- `GET /api/routines/<id>` - Get specific routine
- `PUT /api/routines/<id>` - Update routine
- `DELETE /api/routines/<id>` - Delete routine

### Personal Records
- `GET /api/prs` - List all PRs
- `POST /api/prs` - Register new PR
- `GET /api/prs/exercise/<id>` - PRs for specific exercise

## Language Support

The application supports three languages:
- English (en)
- Portuguese - Brazil (pt-BR)
- Portuguese - Portugal (pt-PT)

Language can be changed via the language switcher in the application header.

## Development Roadmap

- ✅ Basic structure and data visualization
- ✅ Multi-language support (EN, PT-BR, PT-PT)
- ✅ Forms for creating exercises, PRs, and routines
- ✅ Exercise filters (by category and muscle group)
- ✅ Pagination for exercises (6 items per page - 3x3 grid)
- ✅ Exercise name translations
- ✅ Workout routines (My Workout) with exercise management
- ✅ Edit and delete routines
- ✅ Exercise detail modal with GIFs and muscle groups
- ✅ Additional exercises (Shoulders, Forearms, Core/Abdomen)
- ✅ Black/Blue color scheme
- ✅ Clickable exercise cards with detailed information
- 🔄 Edit and delete exercises and PRs
- 🔄 Progress charts and statistics
- 🔄 Search functionality
- 🔄 User authentication

