import { User } from '@prisma/client';

export const DefaultUserInDB: User = {
  createdAt: new Date(),
  updatedAt: new Date(),
  id: 1,
  userId: 'some-user-id',
  name: 'Maik',
  lastName: 'Glez',
  email: 'maik@seistreinta.com',
};
