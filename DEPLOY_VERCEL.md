# Guia Completo de Deploy no Vercel - GymLog

Este guia fornece instruções passo a passo para fazer o deploy do GymLog (frontend e backend) no Vercel usando Supabase como banco de dados.

> 💡 **Dica**: Para um guia mais rápido e direto, consulte o arquivo `GUIA_RAPIDO_VERCEL.md`

## 📋 Pré-requisitos

- Conta no [Vercel](https://vercel.com) (pode criar com GitHub/GitLab/Bitbucket)
- Conta no [GitHub](https://github.com), [GitLab](https://gitlab.com) ou [Bitbucket](https://bitbucket.org)
- Projeto já configurado localmente
- Banco de dados PostgreSQL (recomendado para produção no Vercel)

**Nota Importante**: O Vercel funciona melhor com PostgreSQL para produção. SQLite pode funcionar, mas não é recomendado para produção no Vercel.

## 🗄️ Configuração do Banco de Dados

### Opção 1: Usar PostgreSQL no Vercel (Recomendado)

**Recomendação: Supabase** (mais fácil e com bom plano gratuito)

1. **Criando banco no Supabase (Recomendado):**
   
   a. Acesse [Supabase](https://supabase.com) e crie uma conta (gratuita)
   
   b. Clique em "New Project"
   
   c. Preencha:
      - **Name**: `gymlog` (ou qualquer nome)
      - **Database Password**: Escolha uma senha forte e **anote ela!**
      - **Region**: Escolha a mais próxima de você
   
   d. Aguarde a criação do projeto (pode levar 1-2 minutos)
   
   e. No projeto, vá em **Settings** → **Database**
   
   f. Role até "Connection string" e copie a **URI Connection string**
   
   g. A string será algo como:
      ```
      postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
      ```
   
   h. **Substitua `[YOUR-PASSWORD]` pela senha que você criou**
   
   i. Esta será sua `DATABASE_URL` para o Vercel

2. **Alternativa: Neon (Também excelente):**
   
   a. Acesse [Neon](https://neon.tech) e crie uma conta (gratuita)
   
   b. Clique em "Create a project"
   
   c. Escolha um nome e região
   
   d. Após criar, vá em "Connection Details"
   
   e. Copie a "Connection string" completa
   
   f. Esta será sua `DATABASE_URL` para o Vercel

3. **Alternativa: Via Vercel (Integração Nativa):**
   
   a. No Vercel Dashboard, vá em "Storage"
   
   b. Escolha "Neon" ou "Supabase" (se disponível)
   
   c. Siga as instruções para criar o banco diretamente no Vercel
   
   d. A `DATABASE_URL` será configurada automaticamente

**Importante:** Anote a Connection String completa, você precisará dela como `DATABASE_URL` no Vercel!

### Opção 2: SQLite (Apenas para testes - Não recomendado para produção)

O SQLite pode funcionar, mas tem limitações no ambiente serverless do Vercel.

## 🚀 Passo a Passo - Deploy do Backend

### 1. Preparar o Repositório

Certifique-se de que seu código está em um repositório Git (GitHub, GitLab ou Bitbucket).

### 2. Fazer Deploy do Backend no Vercel

1. Acesse [Vercel Dashboard](https://vercel.com/dashboard)

2. Clique em **"Add New..."** → **"Project"**

3. Importe o repositório do seu projeto

4. **Configurações do Projeto Backend:**
   - **Project Name**: `gymlog-backend` (ou o nome que preferir)
   - **Root Directory**: Selecione `backend`
   - **Framework Preset**: Deixe como "Other" ou "Vercel"
   - **Build Command**: Deixe vazio (não é necessário para Python)
   - **Output Directory**: Deixe vazio
   - **Install Command**: `pip install -r requirements.txt`

5. **Variáveis de Ambiente - Adicione as seguintes:**

   ```
   DATABASE_URL=postgresql://user:password@host:port/database
   SECRET_KEY=sua-chave-secreta-aqui-gere-uma-chave-aleatoria
   FRONTEND_URL=https://seu-frontend.vercel.app
   PYTHONUNBUFFERED=1
   VERCEL=1
   ```

   **Nota**: A variável `VERCEL=1` ajuda o código a detectar que está rodando no Vercel e ajustar configurações automaticamente (como cookies seguros).

   **Como gerar uma SECRET_KEY:**
   ```bash
   python -c "import secrets; print(secrets.token_hex(32))"
   ```

   **Exemplo de DATABASE_URL para PostgreSQL:**
   ```
   postgresql://usuario:senha@host.dominio.com:5432/nome_do_banco
   ```

6. Clique em **"Deploy"**

7. Aguarde o deploy finalizar. Você receberá uma URL como: `https://gymlog-backend.vercel.app`

8. **Anote a URL do backend!** Você precisará dela para configurar o frontend.

### 3. Testar o Backend

Após o deploy, teste se o backend está funcionando:

```bash
curl https://sua-url-backend.vercel.app/api/health
```

Deve retornar algo como:
```json
{"status": "ok", "exercises_count": 0}
```

## 🌐 Passo a Passo - Deploy do Frontend

### 1. Atualizar Configuração do Frontend

O arquivo `frontend/src/config.js` já está configurado para usar variáveis de ambiente. Não é necessário alterar código.

### 2. Fazer Deploy do Frontend no Vercel

1. No Vercel Dashboard, clique em **"Add New..."** → **"Project"** novamente

2. Importe o mesmo repositório (ou crie um projeto separado)

3. **Configurações do Projeto Frontend:**
   - **Project Name**: `gymlog-frontend` (ou o nome que preferir)
   - **Root Directory**: Selecione `frontend`
   - **Framework Preset**: "Create React App" (deve detectar automaticamente)
   - **Build Command**: `npm run build` (já vem preenchido)
   - **Output Directory**: `build` (já vem preenchido)
   - **Install Command**: `npm install` (já vem preenchido)

4. **Variáveis de Ambiente - Adicione:**

   ```
   REACT_APP_API_URL=https://sua-url-backend.vercel.app
   ```

   **Importante**: Substitua `https://sua-url-backend.vercel.app` pela URL real do seu backend que você anotou anteriormente.

5. Clique em **"Deploy"**

6. Aguarde o deploy finalizar. Você receberá uma URL como: `https://gymlog-frontend.vercel.app`

### 3. Atualizar Variável de Ambiente do Backend

Após o frontend ser deployado:

1. Volte ao projeto do backend no Vercel Dashboard

2. Vá em **Settings** → **Environment Variables**

3. Atualize a variável `FRONTEND_URL` com a URL do frontend:

   ```
   FRONTEND_URL=https://sua-url-frontend.vercel.app
   ```

4. Clique em **"Save"**

5. **Importante**: Vá em **Deployments**, clique nos três pontinhos do último deploy e selecione **"Redeploy"** para aplicar as novas variáveis de ambiente.

## ✅ Verificações Finais

### 1. Testar Comunicação Frontend ↔ Backend

1. Acesse a URL do frontend
2. Abra o console do navegador (F12)
3. Tente fazer login ou usar qualquer funcionalidade
4. Verifique se não há erros de CORS ou conexão

### 2. Verificar Logs

Se houver problemas:

- **Backend**: Vercel Dashboard → Seu projeto backend → Deployments → Clique no deploy → Logs
- **Frontend**: Vercel Dashboard → Seu projeto frontend → Deployments → Clique no deploy → Logs

### 3. Testar Funcionalidades

Teste as principais funcionalidades:
- ✅ Login/Registro
- ✅ Listar exercícios
- ✅ Criar rotinas
- ✅ Criar treinos
- ✅ Registrar PRs

## 🔧 Solução de Problemas Comuns

### Erro: "CORS policy"

**Solução**: 
- Verifique se a variável `FRONTEND_URL` no backend está correta
- Certifique-se de que fez redeploy do backend após atualizar a variável

### Erro: "Database connection failed"

**Solução**:
- Verifique se a `DATABASE_URL` está correta
- Teste a conexão do banco de dados externamente
- Certifique-se de que o banco permite conexões externas (whitelist de IPs)

### Erro: "Module not found" no backend

**Solução**:
- Verifique se o `requirements.txt` está atualizado
- Certifique-se de que está usando o diretório `backend` como root no Vercel

### Frontend não encontra o backend

**Solução**:
- Verifique se `REACT_APP_API_URL` está configurada corretamente no frontend
- Certifique-se de que a URL do backend termina sem barra (`/`) no final
- Faça um novo build após atualizar as variáveis de ambiente

### Banco de dados vazio

**Solução**:
- O backend inicializa os exercícios automaticamente na primeira requisição
- Acesse: `https://sua-url-backend.vercel.app/api/exercises` para forçar a inicialização
- Ou faça uma requisição POST para `https://sua-url-backend.vercel.app/api/init-exercises`

## 📝 Estrutura de Arquivos Criados

Os seguintes arquivos foram criados/modificados para o deploy no Vercel:

```
backend/
├── api/
│   └── index.py          # Handler serverless para Vercel
├── vercel.json           # Configuração do Vercel para backend
└── requirements.txt      # Atualizado com psycopg2-binary

frontend/
└── vercel.json           # Configuração do Vercel para frontend
```

## 🔄 Atualizações Futuras

Para atualizar o projeto após fazer mudanças:

1. Faça commit e push das mudanças para o repositório Git
2. O Vercel detecta automaticamente e faz um novo deploy
3. Você pode também fazer deploy manual: Vercel Dashboard → Deployments → "Redeploy"

## 📚 Recursos Úteis

- [Documentação Vercel](https://vercel.com/docs)
- [Vercel Python Runtime](https://vercel.com/docs/concepts/functions/serverless-functions/runtimes/python)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [PostgreSQL no Vercel](https://vercel.com/docs/storage/vercel-postgres)

## 🎉 Pronto!

Seu projeto GymLog está agora deployado no Vercel! 🚀

Se encontrar algum problema, verifique os logs no Vercel Dashboard e consulte a seção de "Solução de Problemas" acima.

