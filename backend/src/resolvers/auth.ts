import { Context, requireAuth } from "../context";
import { hashPassword, comparePassword } from "../utils/password";
import { generateToken } from "../utils/jwt";

export const authResolvers = {
  Query: {
    me: async (_: any, __: any, context: Context) => {
      const userId = requireAuth(context);

      return context.prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          name: true,
          createdAt: true,
        },
      });
    },
  },

  Mutation: {
    register: async (_: any, { input }: any, context: Context) => {
      const { email, password, name } = input;

      // Check if user already exists
      const existingUser = await context.prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        throw new Error("User already exists with this email");
      }

      // Hash password
      const hashedPassword = await hashPassword(password);

      // Create user
      const user = await context.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
        },
        select: {
          id: true,
          email: true,
          name: true,
          createdAt: true,
        },
      });

      // Generate token
      const token = generateToken({ userId: user.id, email: user.email });

      return {
        token,
        user,
      };
    },

    login: async (_: any, { input }: any, context: Context) => {
      const { email, password } = input;

      // Find user
      const user = await context.prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new Error("Invalid email or password");
      }

      // Verify password
      const isValid = await comparePassword(password, user.password);

      if (!isValid) {
        throw new Error("Invalid email or password");
      }

      // Generate token
      const token = generateToken({ userId: user.id, email: user.email });

      return {
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          createdAt: user.createdAt,
        },
      };
    },
  },
};
