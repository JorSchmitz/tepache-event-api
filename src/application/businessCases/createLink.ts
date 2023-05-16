import { PrismaClient } from '@prisma/client';
import { LinkRepository } from '../../infrastructure/repositories/LinkRepository';
import { LinkFactory } from '../../infrastructure/factories/LinkFactory';
import { Link } from '../../model/link/Link';

type newProfileInput = {
  prisma: PrismaClient
  url: string
  description: string
}

export const createLink = async ({ prisma, url, description }: newProfileInput): Promise<Link> => {
  const linkRepository = new LinkRepository(prisma);

  const link = LinkFactory.createWithMinimalInputs({ url, description })
  const linkcreated = await linkRepository.create(link);
  
  return linkcreated;
};