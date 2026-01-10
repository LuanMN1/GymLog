# 🚀 Guia Rápido - Deploy Completo no Vercel com Supabase

Este guia mostra como fazer deploy do **frontend** e **backend** no Vercel, usando **Supabase** como banco de dados.

## 📋 Pré-requisitos

- Conta no [Vercel](https://vercel.com) (gratuita)
- Conta no [Supabase](https://supabase.com) (gratuita)
- Repositório Git (GitHub, GitLab ou Bitbucket) com seu código

---

## 🗄️ PASSO 1: Criar Banco de Dados no Supabase

1. Acesse [supabase.com](https://supabase.com) e crie uma conta (pode usar GitHub)

2. Clique em **"New Project"**

3. **Preencha os campos:**
   - **Project name**: `gymlog` ou `gymlogdb` (ou qualquer nome)
   - **Database password**: 
     - ⚠️ **IMPORTANTE:** Clique em "Generate a password" ou use o botão "Copy" para copiar a senha gerada
     - ⚠️ **ANOTE ESSA SENHA!** Você vai precisar dela para a Connection String
   - **Region**: Escolha a mais próxima (ex: "South America - São Paulo" ou deixe "Americas")
   - **Security Options**: Deixe `Data API + Connection String` (já vem selecionado)
   - **Advanced Configuration**: Deixe `Postgres` (já vem selecionado)

4. Clique em **"Create new project"** ou **"Save"** e aguarde (1-2 minutos para criar o projeto)

5. Quando o projeto estiver pronto (status verde), siga para pegar a URL de conexão:

   **📍 Passo a passo detalhado:**
   
   ⚠️ **A Connection String pode estar em diferentes lugares dependendo da versão do Supabase!**
   
   **TENTE ESTES CAMINHOS (nesta ordem):**
   
   **⚠️ ATENÇÃO:** A URL que você vê em "API Settings" (ex: `https://xxxxx.supabase.co`) **NÃO é a DATABASE_URL!**
   Essa é a URL da API REST. Você precisa da **Connection String** do PostgreSQL!
   
   **Opção 1 - Project Settings → Database (RECOMENDADO):**
   a) No menu lateral, role até o final e clique em **"Project Settings"** ⚙️
   b) No submenu que abrir, clique em **"Database"**
   c) Na página, procure por **"Connection string"** ou role até encontrar uma seção assim
   d) Procure por abas: **"URI"**, "JDBC", "Golang", etc.
   e) Clique na aba **"URI"** (não "JDBC", não "Connection pooling")
   f) Você verá uma string começando com `postgresql://` ou `postgres://` - essa é a que você precisa!
   
   **Opção 2 - Montar manualmente (se não encontrar):**
   Se você não encontrar a Connection String, pode montá-la manualmente. Precisamos:
   - O host do banco (geralmente `db.xxxxx.supabase.co` ou similar)
   - A senha que você criou quando fez o projeto
   - Formato: `postgresql://postgres:SUA_SENHA@db.xxxxx.supabase.co:5432/postgres`
   
   **Opção 2 - Project Settings → Database:**
   a) No menu lateral, role até o final e clique em **"Project Settings"** ⚙️
   b) No submenu, clique em **"Database"**
   c) Procure por **"Connection string"**, **"Connection info"**, ou **"Connection pooling"**
   d) Se encontrar, clique na aba **"URI"** e copie a string
   
   **Opção 3 - SQL Editor:**
   a) No menu lateral, clique em **"SQL Editor"**
   b) Às vezes a Connection String aparece no topo ou em uma barra lateral
   
   **Opção 4 - Project Overview:**
   a) Clique em **"Project Overview"** no menu lateral
   b) Procure por cards ou seções com **"Connection string"** ou **"Database URL"**
   
   e) Você verá algo como:
      ```
      postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-sa-east-1.pooler.supabase.com:6543/postgres
      ```
      **OU**
      ```
      postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
      ```

6. **⚠️ IMPORTANTE - Substituir a senha:**
   
   - A string que você vê tem `[YOUR-PASSWORD]` como placeholder
   - Você precisa substituir `[YOUR-PASSWORD]` pela **senha real** que você criou quando fez o projeto
   - Se não lembra a senha: vá em **Settings → Database → Database Password** e redefina
   
   **Exemplo:**
   - String do Supabase: `postgresql://postgres:[YOUR-PASSWORD]@db.abc123.supabase.co:5432/postgres`
   - Sua senha: `MinhaSenha123!`
   - String final (DATABASE_URL): `postgresql://postgres:MinhaSenha123!@db.abc123.supabase.co:5432/postgres`

7. **📋 Copie a string completa** com a senha substituída - essa será sua `DATABASE_URL`!

   **💡 Dica:** Cole em um arquivo de texto temporário para não perder, você vai precisar colar ela no Vercel.

---

## 🔧 PASSO 2: Deploy do Backend no Vercel

1. Acesse [vercel.com/dashboard](https://vercel.com/dashboard)

2. Clique em **"Add New..."** → **"Project"**

3. **Importe seu repositório Git** (GitHub/GitLab/Bitbucket)

4. **Configurações do Projeto:**
   - **Project Name**: `gymlog-backend` (ou qualquer nome)
   - ⚠️ **Root Directory**: Selecione `backend` (IMPORTANTE!)
   - **Framework Preset**: Deixe "Other" ou "Vercel"
   - **Build Command**: Deixe vazio
   - **Output Directory**: Deixe vazio
   - **Install Command**: `pip install -r requirements.txt`

5. **Variáveis de Ambiente** - Clique em "Environment Variables" e adicione:

   | Nome | Valor |
   |------|-------|
   | `DATABASE_URL` | A string que você copiou do Supabase (com a senha substituída) |
   | `SECRET_KEY` | Gere uma chave secreta (veja abaixo) |
   | `FRONTEND_URL` | Deixe vazio por enquanto (vamos preencher depois) |
   | `PYTHONUNBUFFERED` | `1` |
   | `VERCEL` | `1` |

   **Como gerar SECRET_KEY:**
   ```bash
   python -c "import secrets; print(secrets.token_hex(32))"
   ```
   
   Ou use este gerador online: https://randomkeygen.com/

6. Clique em **"Deploy"**

7. ⏳ Aguarde o deploy finalizar (2-3 minutos)

8. ✅ Você receberá uma URL como: `https://gymlog-backend.vercel.app`
   
   **ANOTE ESSA URL!** Você vai precisar dela no próximo passo.

9. **Teste se funcionou:**
   - Acesse: `https://sua-url-backend.vercel.app/api/health`
   - Deve retornar: `{"status": "ok", "exercises_count": 0}`
   - Se retornar erro, verifique os logs do deploy no Vercel Dashboard

---

## 🌐 PASSO 3: Deploy do Frontend no Vercel

1. No Vercel Dashboard, clique em **"Add New..."** → **"Project"** novamente

2. **Importe o mesmo repositório Git**

3. **Configurações do Projeto:**
   - **Project Name**: `gymlog-frontend` (ou qualquer nome)
   - ⚠️ **Root Directory**: Selecione `frontend` (IMPORTANTE!)
   - **Framework Preset**: Deve detectar "Create React App" automaticamente
   - **Build Command**: `npm run build` (já vem preenchido)
   - **Output Directory**: `build` (já vem preenchido)

4. **Variáveis de Ambiente** - Adicione:

   | Nome | Valor |
   |------|-------|
   | `REACT_APP_API_URL` | A URL do backend que você anotou (ex: `https://gymlog-backend.vercel.app`) |

   ⚠️ **IMPORTANTE**: Não coloque barra (`/`) no final da URL!

5. Clique em **"Deploy"**

6. ⏳ Aguarde o deploy finalizar (2-3 minutos)

7. ✅ Você receberá uma URL como: `https://gymlog-frontend.vercel.app`
   
   **ANOTE ESSA URL!**

---

## 🔗 PASSO 4: Conectar Frontend e Backend

1. Volte ao projeto do **backend** no Vercel Dashboard

2. Vá em **Settings** → **Environment Variables**

3. Encontre a variável `FRONTEND_URL` e atualize o valor com a URL do frontend:
   ```
   https://gymlog-frontend.vercel.app
   ```

4. Clique em **"Save"**

5. ⚠️ **IMPORTANTE**: Vá em **Deployments**, encontre o último deploy, clique nos **três pontinhos (⋮)** e selecione **"Redeploy"**
   
   Isso é necessário para aplicar a nova variável de ambiente!

---

## ✅ PASSO 5: Testar Tudo

1. Acesse a URL do frontend: `https://gymlog-frontend.vercel.app`

2. Abra o Console do navegador (F12 → Console)

3. Tente fazer login ou usar qualquer funcionalidade

4. Verifique se não há erros de CORS ou conexão

5. **Inicializar os exercícios no banco de dados:**
   
   **⚠️ IMPORTANTE:** Os exercícios são inicializados automaticamente quando você acessa a rota `/api/exercises` pela primeira vez. Você não precisa rodar `python init_data.py` manualmente no Vercel!
   
   **Opção 1 - Automática (Recomendado):**
   - Acesse: `https://sua-url-backend.vercel.app/api/exercises`
   - Isso inicializa os exercícios automaticamente se o banco estiver vazio
   - A resposta deve mostrar uma lista de exercícios
   
   **Opção 2 - Manual (se necessário):**
   - Faça uma requisição POST para: `https://sua-url-backend.vercel.app/api/init-exercises`
   - Use o Postman, Insomnia, ou curl:
     ```bash
     curl -X POST https://sua-url-backend.vercel.app/api/init-exercises
     ```
   - Isso força a inicialização dos exercícios manualmente
   
   **Opção 3 - Verificar status:**
   - Acesse: `https://sua-url-backend.vercel.app/api/health`
   - Verifique o campo `exercises_count` - se for maior que 0, os exercícios já estão inicializados

---

## 🎉 Pronto!

Seu projeto está deployado e funcionando! 🚀

### Resumo das URLs:

- **Frontend**: `https://gymlog-frontend.vercel.app`
- **Backend**: `https://gymlog-backend.vercel.app`
- **Banco de Dados**: Supabase (externo)

### Para futuras atualizações:

1. Faça commit e push das mudanças para o Git
2. O Vercel detecta automaticamente e faz novo deploy
3. Ou faça deploy manual: Deployments → Redeploy

---

## 🔧 Solução de Problemas

### Backend não conecta ao banco
- ✅ Verifique se a `DATABASE_URL` está correta
- ✅ Certifique-se de que substituiu `[YOUR-PASSWORD]` pela senha real
- ✅ Teste a conexão no Supabase Dashboard

### Erro de CORS
- ✅ Verifique se atualizou `FRONTEND_URL` no backend
- ✅ Certifique-se de ter feito redeploy do backend após atualizar a variável

### Frontend não encontra o backend
- ✅ Verifique se `REACT_APP_API_URL` está correta (sem barra no final)
- ✅ Faça um novo deploy do frontend após atualizar variáveis

### Banco vazio / Exercícios não inicializados
- ✅ A inicialização é **automática** quando você acessa `/api/exercises` pela primeira vez
- ✅ Se não funcionou automaticamente, force a inicialização:
   - Faça POST para: `https://sua-url-backend.vercel.app/api/init-exercises`
   - Ou acesse: `https://sua-url-backend.vercel.app/api/exercises` (GET)
- ✅ Verifique se a `DATABASE_URL` está correta e o banco está acessível
- ✅ Verifique os logs do Vercel para erros de conexão com o banco

---

## 🔍 Como Funciona a Inicialização Automática dos Exercícios

O projeto está configurado para **inicializar automaticamente** os dados dos exercícios. Isso significa que:

1. **Não é necessário rodar `python init_data.py` manualmente no Vercel** - essa inicialização é feita automaticamente pelo código.

2. **Quando acontece a inicialização:**
   - Ao primeiro acesso à rota `/api/exercises` (GET)
   - No startup do servidor (se possível)
   - Ao chamar a rota `/api/init-exercises` (POST) manualmente

3. **O que é inicializado:**
   - ✅ Tabelas do banco de dados (criadas automaticamente)
   - ✅ 32 exercícios pré-definidos (Chest, Triceps, Back, Biceps, Legs, Shoulders, Forearms, Core)

4. **Verificar se foi inicializado:**
   ```bash
   # Verificar status
   curl https://sua-url-backend.vercel.app/api/health
   
   # Ou acessar no navegador
   https://sua-url-backend.vercel.app/api/health
   ```
   Se `exercises_count` for maior que 0, está tudo certo!

5. **Nota sobre `init_data.py`:**
   - O arquivo `init_data.py` é útil para **desenvolvimento local** com dados de exemplo
   - No Vercel, a inicialização é feita automaticamente pelo `app.py`
   - Se precisar inicializar manualmente, use a rota `/api/init-exercises`

---

## 📚 Links Úteis

- [Vercel Dashboard](https://vercel.com/dashboard)
- [Supabase Dashboard](https://app.supabase.com)
- [Documentação Vercel](https://vercel.com/docs)
- [Documentação Supabase](https://supabase.com/docs)
- [Documentação Flask](https://flask.palletsprojects.com/)


