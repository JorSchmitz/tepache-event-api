import { objectType } from 'nexus'

export const event = objectType({
  name: 'Event',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.dateTime('createdAt')
    t.nonNull.dateTime('updatedAt')
    t.nonNull.string('title')
    t.nullable.string('description')
    t.nonNull.dateTime('start_time')
    t.nonNull.dateTime('end_time')
    t.nullable.string('location')
  },
})
