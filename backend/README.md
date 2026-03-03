# Finance API - GraphQL

API GraphQL para gerenciamento de finanças pessoais.

## 🚀 Tecnologias

- **TypeScript** - Linguagem principal
- **GraphQL** - API query language
- **Apollo Server** - Servidor GraphQL
- **Prisma** - ORM para banco de dados
- **SQLite** - Banco de dados
- **JWT** - Autenticação
- **bcryptjs** - Hash de senhas

## 📋 Pré-requisitos

- Node.js (v18 ou superior)
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório
2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:

Copie o arquivo `.env.example` para `.env` e preencha as variáveis:

```bash
cp .env.example .env
```

Edite o arquivo `.env`:

```env
JWT_SECRET=your-super-secret-jwt-key
DATABASE_URL="file:./dev.db"
PORT=4000
```

4. Execute as migrações do Prisma:

```bash
npm run prisma:migrate
```

5. Gere o Prisma Client:

```bash
npm run prisma:generate
```

## 🎮 Executando o projeto

### Desenvolvimento

```bash
npm run dev
```

O servidor estará disponível em `http://localhost:4000`

### Produção

```bash
npm run build
npm start
```

## 📊 Prisma Studio

Para visualizar e editar dados no banco:

```bash
npm run prisma:studio
```

## 🔐 Autenticação

A API usa JWT para autenticação. Após fazer login ou registro, você receberá um token que deve ser incluído no header das requisições:

```
Authorization: Bearer {seu-token-aqui}
```

## 📝 Operações GraphQL

### Mutations

#### Registro de usuário

```graphql
mutation Register {
  register(
    input: {
      email: "usuario@example.com"
      password: "senha123"
      name: "Nome do Usuário"
    }
  ) {
    token
    user {
      id
      email
      name
    }
  }
}
```

#### Login

```graphql
mutation Login {
  login(input: { email: "usuario@example.com", password: "senha123" }) {
    token
    user {
      id
      email
      name
    }
  }
}
```

#### Criar categoria

```graphql
mutation CreateCategory {
  createCategory(input: { name: "Alimentação", color: "#FF6B6B" }) {
    id
    name
    color
  }
}
```

#### Atualizar categoria

```graphql
mutation UpdateCategory {
  updateCategory(
    id: "category-id"
    input: { name: "Novo Nome", color: "#4ECDC4" }
  ) {
    id
    name
    color
  }
}
```

#### Deletar categoria

```graphql
mutation DeleteCategory {
  deleteCategory(id: "category-id") {
    id
    name
  }
}
```

#### Criar transação

```graphql
mutation CreateTransaction {
  createTransaction(
    input: {
      description: "Compras do mês"
      amount: 250.50
      type: "expense"
      categoryId: "category-id"
    }
  ) {
    id
    description
    amount
    type
    category {
      name
    }
  }
}
```

### Queries

#### Buscar usuário autenticado

```graphql
query Me {
  me {
    id
    email
    name
  }
}
```

#### Listar categorias

```graphql
query Categories {
  categories {
    id
    name
    color
    createdAt
  }
}
```

#### Buscar categoria específica

```graphql
query Category {
  category(id: "category-id") {
    id
    name
    color
  }
}
```

#### Listar transações

```graphql
query Transactions {
  transactions {
    id
    description
    amount
    type
    date
    category {
      name
      color
    }
  }
}
```

## 🛡️ Funcionalidades de Segurança

- ✅ Autenticação JWT
- ✅ Hash de senhas com bcrypt
- ✅ Isolamento de dados por usuário
- ✅ Validação de permissões em todas as operações
- ✅ CORS habilitado

## 📁 Estrutura do Projeto

```
backend/
├── prisma/
│   └── schema.prisma      # Schema do banco de dados
├── src/
│   ├── resolvers/         # Resolvers GraphQL
│   │   ├── auth.ts
│   │   ├── category.ts
│   │   ├── transaction.ts
│   │   └── index.ts
│   ├── schema/
│   │   └── typeDefs.ts    # Schema GraphQL
│   ├── utils/             # Utilitários
│   │   ├── jwt.ts
│   │   └── password.ts
│   ├── context.ts         # Contexto GraphQL
│   └── index.ts           # Servidor principal
├── .env.example
├── package.json
└── tsconfig.json
```

## ✅ Checklist de Funcionalidades

- [x] O usuário pode criar uma conta e fazer login
- [x] O usuário pode ver e gerenciar apenas as transações e categorias criadas por ele
- [x] Deve ser possível criar uma categoria
- [x] Deve ser possível deletar uma categoria
- [x] Deve ser possível editar uma categoria
- [x] Deve ser possível listar todas as categorias
- [x] CORS habilitado
- [x] Variáveis de ambiente documentadas no .env.example

## 🤝 Contribuindo

Sinta-se à vontade para contribuir com melhorias!

## 📄 Licença

ISC
