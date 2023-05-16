import { UserFactory } from '../../../src/infrastructure/factories/UserFactory';
import { MockedPrisma } from './prisma';

export const BaseInput = {
  prisma: MockedPrisma,
};

export const BaseAuthenticatedInput = {
  prisma: MockedPrisma,
  user: UserFactory.createFromAuth0({
    userId: 'some-user-id',
    name: 'Maik',
    email: 'maik@seistreinta.com',
    roles: [],
    scopes: [],
  }),
};
