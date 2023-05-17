// import { extendType, stringArg, nonNull, arg, nullable } from 'nexus'
// import { isAuthenticated } from './permissions'
// import { example } from '../application/businessCases/example'

// export const mutations = extendType({
//   type: 'Mutation',
//   definition(mutation) {
//     mutation.nullable.field('example', {
//       type: 'String',
//       args: {
//         token: nonNull(stringArg()),
//       },
//       authorize: (_root, _args, ctx) => isAuthenticated(ctx), // TODO: Add permissions in method isAuthorized
//       async resolve(_root, args, ctx) {
//         try {
//           const { prisma, user } = ctx
//           const response = await example({ prisma })
//           return response
//         } catch (e) {
//           return e
//         }
//       },
//     })
//   },
// })

import { extendType, stringArg, nonNull, arg, nullable } from 'nexus'
import { createEvent } from '../application/businessCases/createEvent'

export const mutations = extendType({
  type: 'Mutation',
  definition(mutation) {
    mutation.nullable.field('createEvent', {
      type: 'Event',
      args: {
        title: nonNull(stringArg()),
        description: nullable(stringArg()),
        start_time: nonNull(arg({ type: 'DateTime' })),
        end_time: nonNull(arg({ type: 'DateTime' })),
        location: nullable(stringArg()),
      },
      async resolve(_root, args, ctx) {
        try {
          const { prisma } = ctx
          const { title, description, start_time, end_time, location } = args
          const response = await createEvent({
            prisma,
            title,
            description,
            start_time,
            end_time,
            location,
          })
          return response
        } catch (e) {
          return e
        }
      },
    })
  },
})
