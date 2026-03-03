export const typeDefs = `#graphql
  type User {
    id: ID!
    email: String!
    name: String!
    createdAt: String!
  }

  type Category {
    id: ID!
    name: String!
    color: String
    createdAt: String!
    updatedAt: String!
  }

  type Transaction {
    id: ID!
    description: String!
    amount: Float!
    type: String!
    date: String!
    category: Category!
    createdAt: String!
    updatedAt: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  input RegisterInput {
    email: String!
    password: String!
    name: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input CreateCategoryInput {
    name: String!
    color: String
  }

  input UpdateCategoryInput {
    name: String
    color: String
  }

  input CreateTransactionInput {
    description: String!
    amount: Float!
    type: String!
    date: String
    categoryId: ID!
  }

  input UpdateTransactionInput {
    description: String
    amount: Float
    type: String
    date: String
    categoryId: ID
  }

  type Query {
    me: User
    categories: [Category!]!
    category(id: ID!): Category
    transactions: [Transaction!]!
    transaction(id: ID!): Transaction
  }

  type Mutation {
    register(input: RegisterInput!): AuthPayload!
    login(input: LoginInput!): AuthPayload!
    
    createCategory(input: CreateCategoryInput!): Category!
    updateCategory(id: ID!, input: UpdateCategoryInput!): Category!
    deleteCategory(id: ID!): Category!
    
    createTransaction(input: CreateTransactionInput!): Transaction!
    updateTransaction(id: ID!, input: UpdateTransactionInput!): Transaction!
    deleteTransaction(id: ID!): Transaction!
  }
`;
