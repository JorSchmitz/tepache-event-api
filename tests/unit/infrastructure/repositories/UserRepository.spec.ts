import { UserRepository } from '../../../../src/infrastructure/repositories/UserRepository';
import { DefaultUserFromPrisma } from '../../../mocks/payloads/users';
import { MockedPrisma } from '../../../mocks/inputs/prisma';
import { UserFactory } from '../../../../src/infrastructure/factories/UserFactory';
import { DefaultUserInDB } from '../../../mocks/db/users';

describe('User repository getUserByUserId must:', () => {
  test('return null if the user does not exists', async () => {
    expect.assertions(2);

    MockedPrisma.user.findFirst = jest.fn().mockReturnValueOnce(Promise.resolve(null));
    
    const userId = 'some-user-id';
    const userRepo = new UserRepository(MockedPrisma);
    const user = await userRepo.getUserByUserId(userId);

    expect(MockedPrisma.user.findFirst).toHaveBeenCalledWith({ where: { userId } });
    expect(user).toBe(null);
  });

  test('return an user instance if it exists', async () => {
    expect.assertions(3);

    const UserFactoryCreateFromPrismaFn = jest.spyOn(UserFactory, 'createFromPrisma');
    MockedPrisma.user.findFirst = jest.fn().mockReturnValueOnce(Promise.resolve(DefaultUserInDB));
    
    const userId = 'some-user-id';
    const userRepo = new UserRepository(MockedPrisma);
    const user = await userRepo.getUserByUserId(userId);

    expect(MockedPrisma.user.findFirst).toHaveBeenCalledWith({ where: { userId } });
    expect(UserFactoryCreateFromPrismaFn).toHaveBeenCalledWith(DefaultUserInDB);
    expect(user).toStrictEqual(DefaultUserFromPrisma);
  });
});


describe('User repository create must:', () => {
  test('create an user in db', async () => {
    expect.assertions(3);

    const UserFactoryCreateFromPrismaFn = jest.spyOn(UserFactory, 'createFromPrisma');
    MockedPrisma.user.create = jest.fn().mockReturnValueOnce(Promise.resolve(DefaultUserInDB));
    
    const userToCreate = UserFactory.createFromMinimalInputs(DefaultUserInDB);
    const userRepo = new UserRepository(MockedPrisma);
    const user = await userRepo.create(userToCreate);

    expect(MockedPrisma.user.create).toHaveBeenCalled();
    expect(UserFactoryCreateFromPrismaFn).toHaveBeenCalledWith(DefaultUserInDB);
    expect(user).toStrictEqual(DefaultUserFromPrisma);
  });
});