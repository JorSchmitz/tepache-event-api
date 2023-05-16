import { Link as PrismaLink } from '@prisma/client';
import { Link } from '../../model/link/Link';
import { v4 } from 'uuid';
import { User } from '../../model/user/User';

export class LinkFactory {
  static createFromPrisma(data: PrismaLink): Link {
    return new Link({
      uuid: '',
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      description: data.description,
      url: data.url,
    });
  }


  static createWithMinimalInputs(data: {
    description: string;
    url: string;
  }): Link {
    return new Link({
      uuid: v4(),
      createdAt: new Date(),
      updatedAt: new Date(),
      description: data.description,
      url: data.url,
    });
  }

  static createWithUser(data: {
    description: string;
    url: string;
    user: User;
  }): Link {
    return new Link({
      uuid: v4(),
      createdAt: new Date(),
      updatedAt: new Date(),
      description: data.description,
      url: data.url,
    });
  }
}
