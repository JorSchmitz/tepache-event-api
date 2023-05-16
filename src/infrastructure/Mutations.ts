import { extendType, stringArg, nonNull, arg, nullable } from 'nexus';
import { isAuthenticated } from './permissions';
import { createLink } from '../application/businessCases/createLink';

export const mutations = extendType({
  type: 'Mutation',
  definition(mutation) {
    mutation.nullable.field('createLink', {
      type: 'Link',
      args: {
        description: nonNull(stringArg()),
        url: nonNull(stringArg()),
      },
      async resolve(_root, args, ctx) {
        try {
          const { prisma } = ctx;
          const { description, url } = args;
          const response = await createLink({ prisma, description, url });
          return response;
        } catch (e) {
          return e;
        }
      }
    });
  },
});
