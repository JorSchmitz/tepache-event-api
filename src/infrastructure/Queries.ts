import { queryType } from 'nexus';
import { me } from '../application/queries/me';
import { isAuthenticated } from './permissions';
import { links } from '../application/queries/links';

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

    query.list.nonNull.field('links', {
      type: 'Link',
      args: {},
      async resolve(_root, _args, ctx) {
        try {
          const { prisma } = ctx;
          const response = await links({ prisma });
          return response;
        } catch (e) {
          return e;
        }
      },
    });

  },
});
