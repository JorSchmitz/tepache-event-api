import { PrismaClient as PrismaClientModule } from '@prisma/client';

export class PrismaClient {
  static prisma = new PrismaClientModule();
}
