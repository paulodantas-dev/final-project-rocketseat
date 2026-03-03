import { PrismaClient } from "@prisma/client";
import { verifyToken } from "./utils/jwt";

const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
  userId?: string;
}

export const createContext = async ({ req }: any): Promise<Context> => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return { prisma };
  }

  try {
    const payload = verifyToken(token);
    return {
      prisma,
      userId: payload.userId,
    };
  } catch (error) {
    return { prisma };
  }
};

export const requireAuth = (context: Context): string => {
  if (!context.userId) {
    throw new Error("Not authenticated");
  }
  return context.userId;
};

export { prisma };
