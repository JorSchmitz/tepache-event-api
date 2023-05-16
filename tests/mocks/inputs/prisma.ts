import { PrismaClient } from '../../../src/infrastructure/modules/Prisma';

export const MockedPrisma = jest.mocked(PrismaClient.prisma, true);
