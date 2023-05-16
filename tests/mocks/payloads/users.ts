import { DefaultUserInDB } from '../db/users';
import { UserFactory } from '../../../src/infrastructure/factories/UserFactory';

export const DefaultUserFromPrisma = UserFactory.createFromPrisma(DefaultUserInDB);

export const DefaultUserFromAuth0 = UserFactory.createFromAuth0(DefaultUserInDB);
