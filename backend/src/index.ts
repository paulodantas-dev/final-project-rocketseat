import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { prisma } from "./lib/prisma";
import {
  hashPassword,
  comparePassword,
  generateToken,
  verifyToken,
} from "./lib/auth";

interface Context {
  userId: string | null;
}

interface SignupArgs {
  email: string;
  password: string;
  name: string;
}

interface LoginArgs {
  email: string;
  password: string;
}

interface CreateCategoryArgs {
  title: string;
  description?: string;
  color: string;
  icon: string;
}

interface UpdateCategoryArgs {
  id: string;
  title?: string;
  description?: string;
  color?: string;
  icon?: string;
}

interface DeleteCategoryArgs {
  id: string;
}

type TransactionKind = "INCOME" | "EXPENSE";

interface CreateTransactionArgs {
  description: string;
  amount: number;
  type: TransactionKind;
  date: string;
  categoryId: string;
}

interface CategoryParent {
  userId: string;
}

interface TransactionParent {
  userId: string;
  categoryId: string;
}

const typeDefs = `#graphql
  scalar DateTime

  type User {
    id: ID!
    email: String!
    name: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Category {
    id: ID!
    title: String!
    description: String
    color: String!
    icon: String!
    user: User!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  enum TransactionType {
    INCOME
    EXPENSE
  }

  type Transaction {
    id: ID!
    description: String!
    amount: Float!
    type: TransactionType!
    date: DateTime!
    category: Category!
    user: User!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    categories: [Category]
    transactions: [Transaction]
    me: User
  }

  type Mutation {
    signup(email: String!, password: String!, name: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    createCategory(title: String!, description: String, color: String!, icon: String!): Category!
    updateCategory(id: String!, title: String, description: String, color: String, icon: String): Category!
    deleteCategory(id: String!): Boolean!
    createTransaction(description: String!, amount: Float!, type: TransactionType!, date: DateTime!, categoryId: String!): Transaction!
  }
`;

const resolvers = {
  Category: {
    user: async (parent: CategoryParent) => {
      return prisma.user.findUnique({
        where: { id: parent.userId },
      });
    },
  },
  Transaction: {
    user: async (parent: TransactionParent) => {
      return prisma.user.findUnique({
        where: { id: parent.userId },
      });
    },
    category: async (parent: TransactionParent) => {
      return prisma.category.findUnique({
        where: { id: parent.categoryId },
      });
    },
  },
  Query: {
    categories: async (_parent: unknown, _args: unknown, context: Context) => {
      if (!context.userId) {
        throw new Error("Not authenticated");
      }
      return prisma.category.findMany({
        where: { userId: context.userId },
        orderBy: { createdAt: "desc" },
      });
    },
    transactions: async (
      _parent: unknown,
      _args: unknown,
      context: Context,
    ) => {
      if (!context.userId) {
        throw new Error("Not authenticated");
      }

      return prisma.transaction.findMany({
        where: { userId: context.userId },
        orderBy: { date: "desc" },
      });
    },
    me: async (_parent: unknown, _args: unknown, context: Context) => {
      if (!context.userId) {
        throw new Error("Not authenticated");
      }
      return prisma.user.findUnique({
        where: { id: context.userId },
      });
    },
  },
  Mutation: {
    signup: async (_parent: unknown, args: SignupArgs) => {
      const existingUser = await prisma.user.findUnique({
        where: { email: args.email },
      });

      if (existingUser) {
        throw new Error("Email already exists");
      }

      const hashedPassword = await hashPassword(args.password);
      const user = await prisma.user.create({
        data: {
          email: args.email,
          password: hashedPassword,
          name: args.name,
        },
      });

      const token = generateToken(user.id);
      return { token, user };
    },
    login: async (_parent: unknown, args: LoginArgs) => {
      const user = await prisma.user.findUnique({
        where: { email: args.email },
      });

      if (!user) {
        throw new Error("User not found");
      }

      const passwordMatch = await comparePassword(args.password, user.password);

      if (!passwordMatch) {
        throw new Error("Invalid password");
      }

      const token = generateToken(user.id);
      return { token, user };
    },
    createCategory: async (
      _parent: unknown,
      args: CreateCategoryArgs,
      context: Context,
    ) => {
      if (!context.userId) {
        throw new Error("Not authenticated");
      }

      return prisma.category.create({
        data: {
          title: args.title,
          description: args.description,
          color: args.color,
          icon: args.icon,
          userId: context.userId,
        },
      });
    },
    updateCategory: async (
      _parent: unknown,
      args: UpdateCategoryArgs,
      context: Context,
    ) => {
      if (!context.userId) {
        throw new Error("Not authenticated");
      }

      const category = await prisma.category.findUnique({
        where: { id: args.id },
      });

      if (!category) {
        throw new Error("Category not found");
      }

      if (category.userId !== context.userId) {
        throw new Error("You are not authorized to update this category");
      }

      return prisma.category.update({
        where: { id: args.id },
        data: {
          title: args.title,
          description: args.description,
          color: args.color,
          icon: args.icon,
        },
      });
    },
    deleteCategory: async (
      _parent: unknown,
      args: DeleteCategoryArgs,
      context: Context,
    ) => {
      if (!context.userId) {
        throw new Error("Not authenticated");
      }

      const category = await prisma.category.findUnique({
        where: { id: args.id },
      });

      if (!category) {
        throw new Error("Category not found");
      }

      if (category.userId !== context.userId) {
        throw new Error("You are not authorized to delete this category");
      }

      await prisma.category.delete({
        where: { id: args.id },
      });

      return true;
    },
    createTransaction: async (
      _parent: unknown,
      args: CreateTransactionArgs,
      context: Context,
    ) => {
      if (!context.userId) {
        throw new Error("Not authenticated");
      }

      const category = await prisma.category.findUnique({
        where: { id: args.categoryId },
      });

      if (!category) {
        throw new Error("Category not found");
      }

      if (category.userId !== context.userId) {
        throw new Error("You are not authorized to use this category");
      }

      const parsedDate = new Date(args.date);

      if (Number.isNaN(parsedDate.getTime())) {
        throw new Error("Invalid date");
      }

      return prisma.transaction.create({
        data: {
          description: args.description,
          amount: args.amount,
          type: args.type,
          date: parsedDate,
          categoryId: args.categoryId,
          userId: context.userId,
        },
      });
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 3333 },
  context: async ({ req }) => {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.replace("Bearer ", "");
    const decoded = verifyToken(token);

    return {
      userId: decoded?.userId || null,
    };
  },
});

console.log(`🚀  Server ready at: ${url}`);
