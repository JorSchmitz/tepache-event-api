import { nonNull, queryType, stringArg } from 'nexus'
import { me } from '../application/queries/me'
import { isAuthenticated } from './permissions'
import { event, events } from '../application/queries/events'

export const queries = queryType({
  definition(query) {
    query.nullable.field('me', {
      type: 'User',
      args: {},
      authorize: (_root, _args, ctx) => isAuthenticated(ctx),
      async resolve(_root, _args, ctx) {
        try {
          const { user } = ctx
          const response = await me({ user })
          return response
        } catch (e) {
          return e
        }
      },
    })

    query.list.nonNull.field('events', {
      type: 'Event',
      args: {},
      async resolve(_root, _args, ctx) {
        try {
          const { prisma } = ctx
          const response = await events({ prisma })
          return response
        } catch (e) {
          return e
        }
      },
    })

    query.nullable.field('event', {
      type: 'Event',
      args: {
        id: nonNull(stringArg()),
      },
      async resolve(_root, _args, ctx) {
        try {
          const { prisma } = ctx
          const { id } = _args
          const response = await event({ prisma, id })
          return response
        } catch (e) {
          return e
        }
      },
    })
  },
})
