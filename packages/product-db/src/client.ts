import dotenv from 'dotenv';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { fileURLToPath } from 'node:url';

dotenv.config({
  path: fileURLToPath(new URL('../.env', import.meta.url)),
  override: true,
});

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
