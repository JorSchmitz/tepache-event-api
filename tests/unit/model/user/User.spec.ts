import { DefaultUserFromPrisma } from '../../../mocks/payloads/users';

describe('User model must: ', () => {
  test('return full name of the user', async () => {
    expect.assertions(2);
    const getFullNameFn = jest.spyOn(DefaultUserFromPrisma, 'getFullName');
    const usersFullName = DefaultUserFromPrisma.getFullName();

    expect(getFullNameFn).toHaveBeenCalled();
    expect(usersFullName).toBe('Maik Glez');
  });
});
