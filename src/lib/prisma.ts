import { PrismaClient } from "@prisma/client";
import { env } from "../core/config/env";

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

function createPrismaClient(): PrismaClient | null {
  if (!env.DATABASE_URL) {
    return null;
  }

  return new PrismaClient({
    log: env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });
}

export const prisma = (globalForPrisma.prisma ?? createPrismaClient()) as PrismaClient;

if (env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
