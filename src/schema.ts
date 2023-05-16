import { makeSchema, fieldAuthorizePlugin } from 'nexus';
import * as types from './infrastructure/types';
import { queries } from './infrastructure/Queries';
import { mutations } from './infrastructure/Mutations';
import { inputs } from './infrastructure/Inputs';
import { scalars } from './infrastructure/Scalars';
import { AuthError } from './infrastructure/permissions/errors';
import { InvalidTokenError } from './model/accessToken/InvalidTokenError';

export const schema = makeSchema({
  types: [types, queries, mutations, inputs, scalars],
  plugins: [
    fieldAuthorizePlugin({
      formatError({ error, ctx }) {
        if (ctx.isAuthenticatedError) {
          throw new InvalidTokenError('Invalid token', {
            component: 'Authorize',
            input: { error: error.message },
          });
        }
        throw new AuthError('Wrong permissions', {
          component: 'Authorize',
          input: { error: error.message },
        });
      }
    }),
  ],
  outputs: {
    schema: __dirname + '/../schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
});