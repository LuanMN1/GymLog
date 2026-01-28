# Setup Guide - GymLog

## Prerequisites

- Python 3.8 or higher
- Node.js 16 or higher
- npm or yarn

## Installation Steps

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# Windows PowerShell:
.\venv\Scripts\Activate.ps1
# Windows CMD:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Install dependencies
python -m pip install -r requirements.txt

# (Optional) Populate database with sample data
python init_data.py

# Start the server
python app.py
```

The backend will run on: `http://localhost:5000`

### 2. Frontend Setup

Open a **new terminal** (keep the backend running):

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# (Optional) Create .env file if you encounter webpack dev server errors
# Create a file named .env in the frontend directory with:
# SKIP_PREFLIGHT_CHECK=true
# DANGEROUSLY_DISABLE_HOST_CHECK=true

# Start the application
npm start
```

The frontend will run on: `http://localhost:3000`

## Project Structure

```
GymLog/
├── backend/
│   ├── app.py              # Main Flask application
│   ├── models.py           # Database models
│   ├── init_data.py    # Script to populate sample data
│   ├── requirements.txt   # Python dependencies
│   └── gymlog.db          # SQLite database (created automatically)
│
└── frontend/
    ├── src/
    │   ├── App.js          # Main component
    │   ├── App.css         # Styles
    │   ├── index.js        # Entry point
    │   ├── setupProxy.js   # API proxy configuration
    │   └── i18n/
    │       └── translations.js  # Translation files
    └── package.json        # Node dependencies
```

## API Endpoints

### Exercises
- `GET /api/exercises` - List all exercises
- `POST /api/exercises` - Create new exercise

### Workouts
- `GET /api/workouts` - List all workouts
- `POST /api/workouts` - Create new workout

### Personal Records
- `GET /api/prs` - List all PRs
- `POST /api/prs` - Register new PR
- `GET /api/prs/exercise/<id>` - PRs for specific exercise

## Language Support

The application supports three languages:
- **English (en)** - Default
- **Portuguese - Brazil (pt-BR)**
- **Portuguese - Portugal (pt-PT)**

The language can be changed using the language switcher in the application header. The selected language is saved in localStorage.

## Deploy no Vercel (frontend e backend em projetos separados)

1. **Backend**: faça deploy da pasta `backend/` como projeto Vercel (ou Railway/Render). Anote a URL (ex: `https://gymlog-api.vercel.app`).

2. **Frontend**: no projeto Vercel do frontend, em **Settings → Environment Variables**:
   - Nome: `REACT_APP_API_URL`
   - Valor: a URL do backend (ex: `https://gymlog-api.vercel.app`)
   - Importante: faça um novo **Redeploy** após salvar a variável para que o build use o valor.

3. **Base de dados**: use PostgreSQL (ex: Supabase) em produção. Defina `DATABASE_URL` nas variáveis do projeto do **backend**.

4. **Exercícios e desafios**: na primeira requisição ao backend, exercícios e desafios são criados automaticamente se a base estiver vazia.

## Troubleshooting

### Python not found
- Make sure Python is installed and added to PATH
- Use `python -m pip` instead of just `pip`

### Port 5000 already in use
- Change the port in `backend/app.py`:
  ```python
  app.run(debug=True, port=5001)
  ```

### CORS errors
- Make sure Flask-CORS is installed
- Check that the backend is running on port 5000

### Module not found errors
- Make sure all dependencies are installed
- Check that you're in the correct directory
- Verify virtual environment is activated

### Webpack Dev Server errors
- The `.env` file is automatically created with necessary configurations
- If you encounter "allowedHosts" errors, make sure the `.env` file exists in the `frontend/` directory
- The `setupProxy.js` file handles API proxying automatically

## Next Steps

This is **Part 1** of the project. Future parts will include:

- ✅ Basic structure and data visualization
- ✅ Multi-language support
- 🔄 Forms for creating exercises, workouts, and PRs
- 🔄 Edit and delete functionality
- 🔄 Progress charts and statistics
- 🔄 Filters and search
- 🔄 User authentication

