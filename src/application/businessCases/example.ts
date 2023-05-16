import { PrismaClient } from '@prisma/client';

type newProfileInput = {
  prisma: PrismaClient
}

export const example = async ({ prisma }: newProfileInput): Promise<string> => {
  return 'This is a test';
};