import { me } from '../../src/application/queries/me';
import { DefaultUserFromAuth0 } from '../mocks/payloads/users';
import { BaseAuthenticatedInput } from '../mocks/inputs/base';

describe('Query me must: ', () => {
  test('return a user instance if it exists', async () => {
    await expect(me(BaseAuthenticatedInput)).resolves.toEqual(DefaultUserFromAuth0);
  });
});
