import { Context, requireAuth } from "../context";

export const categoryResolvers = {
  Query: {
    categories: async (_: any, __: any, context: Context) => {
      const userId = requireAuth(context);

      return context.prisma.category.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
      });
    },

    category: async (_: any, { id }: any, context: Context) => {
      const userId = requireAuth(context);

      const category = await context.prisma.category.findFirst({
        where: {
          id,
          userId,
        },
      });

      if (!category) {
        throw new Error("Category not found");
      }

      return category;
    },
  },

  Mutation: {
    createCategory: async (_: any, { input }: any, context: Context) => {
      const userId = requireAuth(context);
      const { name, color } = input;

      // Check if category with same name already exists for this user
      const existingCategory = await context.prisma.category.findFirst({
        where: {
          userId,
          name,
        },
      });

      if (existingCategory) {
        throw new Error("Category with this name already exists");
      }

      return context.prisma.category.create({
        data: {
          name,
          color,
          userId,
        },
      });
    },

    updateCategory: async (_: any, { id, input }: any, context: Context) => {
      const userId = requireAuth(context);
      const { name, color } = input;

      // Check if category exists and belongs to user
      const category = await context.prisma.category.findFirst({
        where: {
          id,
          userId,
        },
      });

      if (!category) {
        throw new Error("Category not found");
      }

      // If name is being changed, check if another category with that name exists
      if (name && name !== category.name) {
        const existingCategory = await context.prisma.category.findFirst({
          where: {
            userId,
            name,
            id: { not: id },
          },
        });

        if (existingCategory) {
          throw new Error("Category with this name already exists");
        }
      }

      return context.prisma.category.update({
        where: { id },
        data: {
          ...(name && { name }),
          ...(color !== undefined && { color }),
        },
      });
    },

    deleteCategory: async (_: any, { id }: any, context: Context) => {
      const userId = requireAuth(context);

      // Check if category exists and belongs to user
      const category = await context.prisma.category.findFirst({
        where: {
          id,
          userId,
        },
      });

      if (!category) {
        throw new Error("Category not found");
      }

      return context.prisma.category.delete({
        where: { id },
      });
    },
  },
};
