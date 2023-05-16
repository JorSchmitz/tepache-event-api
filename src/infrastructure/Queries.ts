import { queryType } from 'nexus';
import { me } from '../application/queries/me';
import { isAuthenticated } from './permissions';

export const queries = queryType({
  definition(query) {
    query.nullable.field('me', {
      type: 'User',
      args: {},
      authorize: (_root, _args, ctx) =>
        isAuthenticated(ctx),
      async resolve(_root, _args, ctx) {
        try {
          const { user } = ctx;
          const response = await me({ user });
          return response;
        } catch (e) {
          return e;
        }
      },
    });
  },
});
