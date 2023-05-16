import { iRepository } from '../iRepository';
import { Link } from '../../model/link/Link';
import { LinkFactory } from '../factories/LinkFactory';

export class LinkRepository{
  private readonly client: iRepository;

  constructor(client: iRepository) {
    this.client = client;
  }

  async getLinks(): Promise<Link[]> {
    const links = await this.client.link.findMany();
    return links.map(link => LinkFactory.createFromPrisma(link));
  }

  async create(link: Link): Promise<Link> {
    const linkCreated = await this.client.link.create({
      data: {
        description: link.snapshot.description,
        url: link.snapshot.url,
      }
    });
    return LinkFactory.createFromPrisma(linkCreated);
  }

}
