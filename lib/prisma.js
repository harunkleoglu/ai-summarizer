import { PrismaClient } from "@prisma/client";

// This is a workaround to prevent the Prisma Client from being instantiated multiple times in development mode.
if (!globalThis.prisma) {
  globalThis.prisma = new PrismaClient();
}
const prisma = globalThis.prisma;

export default prisma;
