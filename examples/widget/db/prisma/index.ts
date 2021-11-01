import { PrismaClient } from "@prisma/client";

// Prevent multiple instances of Prisma Client in development
declare const global: typeof globalThis & { prisma?: PrismaClient };

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV === "development") global.prisma = prisma;

export default prisma;
