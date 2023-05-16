import { PrismaClient } from "@prisma/client";
import { Link } from "../../model/link/Link";
import { LinkRepository } from "../../infrastructure/repositories/LinkRepository";

type BaseInput = {
  prisma: PrismaClient,
};

export const links = async ({ prisma }: BaseInput): Promise<Link[]> => {
  const linkRepository = new LinkRepository(prisma);
  const links = await linkRepository.getLinks();
  return links;
};
