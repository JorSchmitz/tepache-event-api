import { iRepository } from '../iRepository';
import { iUserRepository } from '../../model/user/iUserRepository';
import { User } from '../../model/user/User';
import { UserFactory } from '../factories/UserFactory';

export class UserRepository implements iUserRepository {
  private readonly client: iRepository;

  constructor(client: iRepository) {
    this.client = client;
  }

  async getUserByUserId(userId: string): Promise<User | null> {
    const user = await this.client.user.findFirst({
      where: { userId },
    });
    if (!user) return null;
    return UserFactory.createFromPrisma(user);
  }

  async create(user: User): Promise<User> {
    const newUser = await this.client.user.create({
      data: {
        userId: user.snapshot.userId,
        email: user.snapshot.email,
        name: user.snapshot.name,
        lastName: user.snapshot.lastName,
      },
    });
    return UserFactory.createFromPrisma(newUser);
  }

}
