# Como fazer deploy do backend no Render

## Passo a passo:

### 1. Acesse o Render
- Vá para: https://render.com
- Faça login com GitHub (mesma conta do Vercel)

### 2. Criar novo Web Service
- Clique em "New +" → "Web Service"
- Conecte seu repositório GitHub: `LuanMN1/GymLog`

### 3. Configurar o serviço:
- **Name**: `gymlog-backend` (ou qualquer nome)
- **Region**: Escolha mais próxima (ex: São Paulo se tiver)
- **Branch**: `main`
- **Root Directory**: `backend`
- **Runtime**: `Python 3`
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `gunicorn app:app`

### 4. Environment Variables (Variáveis de Ambiente):
Adicione estas variáveis:
- `SECRET_KEY`: Gere uma chave aleatória (pode usar: https://randomkeygen.com/)
- `FRONTEND_URL`: A URL do seu frontend no Vercel (ex: `https://gym-log-xxxxx.vercel.app`)
- `FLASK_ENV`: `production`

### 5. Deploy!
- Clique em "Create Web Service"
- Aguarde o deploy (pode levar alguns minutos)

### 6. Depois do deploy:
- Render vai te dar uma URL tipo: `https://gymlog-backend.onrender.com`
- **Copie essa URL!**

### 7. Voltar ao Vercel:
- Vá nas configurações do seu projeto no Vercel
- Settings → Environment Variables
- Adicione: `REACT_APP_API_URL` = `https://sua-url-do-render.com`
- Faça um novo deploy no Vercel

Pronto! Seu site estará funcionando! 🎉

