# Financy - Sistema de Controle Financeiro

Sistema completo de gestão financeira pessoal desenvolvido com React e GraphQL.

## 🚀 Tecnologias

### Backend

- **Apollo Server** - Servidor GraphQL
- **Prisma ORM** - ORM para banco de dados
- **SQLite** - Banco de dados
- **TypeScript** - Linguagem
- **JWT** - Autenticação
- **bcryptjs** - Criptografia de senhas

### Frontend

- **React 19** - Biblioteca UI
- **TanStack Router** - Roteamento
- **TanStack Query** - Gerenciamento de estado assíncrono
- **GraphQL Request** - Cliente GraphQL
- **Tailwind CSS** - Estilização
- **Lucide React** - Ícones
- **date-fns** - Manipulação de datas
- **Vite** - Build tool

## 📋 Pré-requisitos

- **Node.js** versão 18 ou superior
- **npm** ou **yarn**

## 🔧 Instalação

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd final-project-rocketseat
```

### 2. Configurar o Backend

```bash
# Navegar para a pasta do backend
cd backend

# Instalar dependências
npm install

# Executar as migrations do banco de dados
npm run prisma:migrate

# Gerar os tipos do Prisma
npm run prisma:generate

# Compilar o projeto
npm run build
```

### 3. Configurar o Frontend

```bash
# Voltar para a raiz e ir para o frontend
cd ../frontend

# Instalar dependências
npm install
```

## ▶️ Executar o Projeto

### Iniciar o Backend

```bash
# Na pasta backend
cd backend

# Modo desenvolvimento
npm run dev

# O servidor estará rodando em http://localhost:3333
```

### Iniciar o Frontend

```bash
# Na pasta frontend (em outro terminal)
cd frontend

# Modo desenvolvimento
npm run dev

# O aplicativo estará rodando em http://localhost:5173
```

## 📁 Estrutura do Projeto

```
final-project-rocketseat/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma          # Schema do banco de dados
│   │   └── migrations/            # Migrations do Prisma
│   ├── src/
│   │   ├── index.ts              # Servidor Apollo + Resolvers GraphQL
│   │   └── lib/
│   │       ├── auth.ts           # Funções de autenticação JWT
│   │       └── prisma.ts         # Cliente Prisma
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/           # Componentes React
    │   ├── pages/               # Páginas da aplicação
    │   ├── hooks/               # Hooks customizados
    │   ├── lib/                 # Utilitários e configurações
    │   └── utils/               # Funções auxiliares
    └── package.json
```

## 🎯 Funcionalidades

- ✅ Autenticação de usuários (Login/Registro)
- ✅ Gerenciamento de perfil
- ✅ Dashboard com estatísticas financeiras
- ✅ Criação e edição de transações (receitas e despesas)
- ✅ Gerenciamento de categorias personalizadas
- ✅ Filtros e busca de transações
- ✅ Visualização de transações recentes
- ✅ Estatísticas por categoria

## 🛠️ Scripts Disponíveis

### Backend

```bash
npm run dev              # Executa em modo desenvolvimento
npm run build           # Compila o projeto
npm run start           # Executa a versão compilada
npm run prisma:migrate  # Executa migrations do banco
npm run prisma:generate # Gera tipos do Prisma
npm run prisma:studio   # Abre interface visual do banco
```

### Frontend

```bash
npm run dev      # Executa em modo desenvolvimento
npm run build    # Compila para produção
npm run preview  # Preview da build de produção
npm run lint     # Executa linter
npm run format   # Formata código
npm run check    # Verifica e corrige código
```

## 🔐 Variáveis de Ambiente

O backend utiliza variáveis de ambiente para configuração. Crie um arquivo `.env` na pasta `backend/` (se necessário):

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="seu-secret-jwt-aqui"
```

## 📝 Licença

Este projeto foi desenvolvido como projeto final do curso Rocketseat.
