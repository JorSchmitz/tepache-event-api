import { extendType, stringArg, nonNull, arg, nullable } from 'nexus';
import { isAuthenticated } from './permissions';
import { example } from '../application/businessCases/example';

export const mutations = extendType({
  type: 'Mutation',
  definition(mutation) {
    mutation.nullable.field('example', {
      type: 'String',
      args: {
        token: nonNull(stringArg()),
      },
      authorize: (_root, _args, ctx) => isAuthenticated(ctx), // TODO: Add permissions in method isAuthorized
      async resolve(_root, args, ctx) {
        try {
          const { prisma, user } = ctx;
          const response = await example({ prisma });
          return response;
        } catch (e) {
          return e;
        }
      }
    });
  },
});
