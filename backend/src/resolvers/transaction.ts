import { Context, requireAuth } from "../context";

export const transactionResolvers = {
  Query: {
    transactions: async (_: any, __: any, context: Context) => {
      const userId = requireAuth(context);

      return context.prisma.transaction.findMany({
        where: { userId },
        include: { category: true },
        orderBy: { date: "desc" },
      });
    },

    transaction: async (_: any, { id }: any, context: Context) => {
      const userId = requireAuth(context);

      const transaction = await context.prisma.transaction.findFirst({
        where: {
          id,
          userId,
        },
        include: { category: true },
      });

      if (!transaction) {
        throw new Error("Transaction not found");
      }

      return transaction;
    },
  },

  Mutation: {
    createTransaction: async (_: any, { input }: any, context: Context) => {
      const userId = requireAuth(context);
      const { description, amount, type, date, categoryId } = input;

      // Validate transaction type
      if (type !== "income" && type !== "expense") {
        throw new Error(
          'Transaction type must be either "income" or "expense"',
        );
      }

      // Check if category exists and belongs to user
      const category = await context.prisma.category.findFirst({
        where: {
          id: categoryId,
          userId,
        },
      });

      if (!category) {
        throw new Error("Category not found");
      }

      return context.prisma.transaction.create({
        data: {
          description,
          amount,
          type,
          date: date ? new Date(date) : new Date(),
          userId,
          categoryId,
        },
        include: { category: true },
      });
    },

    updateTransaction: async (_: any, { id, input }: any, context: Context) => {
      const userId = requireAuth(context);
      const { description, amount, type, date, categoryId } = input;

      // Check if transaction exists and belongs to user
      const transaction = await context.prisma.transaction.findFirst({
        where: {
          id,
          userId,
        },
      });

      if (!transaction) {
        throw new Error("Transaction not found");
      }

      // Validate transaction type if provided
      if (type && type !== "income" && type !== "expense") {
        throw new Error(
          'Transaction type must be either "income" or "expense"',
        );
      }

      // If categoryId is provided, check if it exists and belongs to user
      if (categoryId) {
        const category = await context.prisma.category.findFirst({
          where: {
            id: categoryId,
            userId,
          },
        });

        if (!category) {
          throw new Error("Category not found");
        }
      }

      return context.prisma.transaction.update({
        where: { id },
        data: {
          ...(description && { description }),
          ...(amount !== undefined && { amount }),
          ...(type && { type }),
          ...(date && { date: new Date(date) }),
          ...(categoryId && { categoryId }),
        },
        include: { category: true },
      });
    },

    deleteTransaction: async (_: any, { id }: any, context: Context) => {
      const userId = requireAuth(context);

      // Check if transaction exists and belongs to user
      const transaction = await context.prisma.transaction.findFirst({
        where: {
          id,
          userId,
        },
      });

      if (!transaction) {
        throw new Error("Transaction not found");
      }

      return context.prisma.transaction.delete({
        where: { id },
        include: { category: true },
      });
    },
  },
};
